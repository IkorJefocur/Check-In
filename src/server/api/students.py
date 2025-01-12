from flask import Flask, abort, g, request

def create_student(id: int, firstname: str, lastname: str, tel: str) -> dict:
	resource = {
		'firstname': firstname,
		'lastname': lastname,
		'tel': tel
	}
	if id != None: resource['id'] = id
	return resource

def unpack_student(resource: dict):
	for key in ('id', 'firstname', 'lastname', 'tel'):
		yield resource.get(key)

def validate_student(resource: dict, partial: bool = False):
	for (key, length) in (('firstname', 99), ('lastname', 99), ('tel', 21)):
		assert (
			type(resource[key]) == str
			and len(resource[key]) <= length
		) if key in resource else partial
	assert not 'tel' in resource or (
		resource['tel'].isnumeric()
		and len(resource['tel']) >= 8
	)

def students(app: Flask):

	@app.route('/api/students/')
	def get_students():
		db = g.db.cursor()
		db.execute("""
			SELECT id, firstname, lastname, tel FROM students
		""")
		result = db.fetchall()
		db.close()

		return [create_student(id, firstname, lastname, tel)
			for (id, firstname, lastname, tel) in result]

	@app.route('/api/students/<int:id>')
	def get_student(id: int):
		db = g.db.cursor()
		db.execute("""
			SELECT firstname, lastname, tel FROM students WHERE id = %s
		""", (id,))
		result = db.fetchone()
		db.close()

		if not result:
			abort(404)
		firstname, lastname, tel = result
		return create_student(id, firstname, lastname, tel)

	@app.route('/api/students/', methods=['POST'])
	def post_student():
		student = request.get_json()
		try: validate_student(student)
		except AssertionError: abort(400)
		_, firstname, lastname, tel = unpack_student(student)

		db = g.db.cursor()
		db.execute("""
			INSERT INTO students (firstname, lastname, tel) VALUES (%s, %s, %s)
			RETURNING id
		""", (firstname, lastname, tel))
		id, = db.fetchone()
		db.close()

		student['id'] = id
		return student

	@app.route('/api/students/<int:id>', methods=['PATCH'])
	def patch_student(id: int):
		student = request.get_json()
		try: validate_student(student, True)
		except AssertionError: abort(400)
		_, firstname, lastname, tel = unpack_student(student)

		db = g.db.cursor()
		db.execute("""
			UPDATE students SET
				firstname = COALESCE(%s, firstname),
				lastname = COALESCE(%s, lastname),
				tel = COALESCE(%s, tel)
			WHERE id = %s
			RETURNING firstname, lastname, tel
		""", (firstname, lastname, tel, id))
		result = db.fetchone()
		db.close()

		if not result:
			abort(404)
		firstname, lastname, tel = result
		return create_student(id, firstname, lastname, tel)

	@app.route('/api/students/<int:id>', methods=['DELETE'])
	def delete_student(id: int):
		db = g.db.cursor()
		db.execute("""
			DELETE FROM students WHERE id = %s
			RETURNING firstname, lastname, tel
		""", (id,))
		result = db.fetchone()
		db.close()

		if not result:
			abort(404)
		firstname, lastname, tel = result
		return create_student(None, firstname, lastname, tel)