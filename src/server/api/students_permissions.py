from datetime import time, datetime, timedelta
from flask import Flask, abort, g, request

def permission_end(
	start: datetime, duration: timedelta = timedelta(), finish: time = None
) -> datetime:
	if not finish:
		return start + duration

	finish_datetime = start
	if start.time() > finish:
		finish_datetime = finish_datetime.replace(day = finish_datetime.day + 1)
	finish_datetime = finish_datetime.replace(
		hour = finish.hour,
		minute = finish.minute,
		second = finish.second
	)
	return min(start + duration, finish_datetime)

def create_student_permission(
	perm_id: int, student_id: int,
	start: datetime, duration: timedelta | None, finish: time | None
) -> dict:
	return {
		'permissionId': perm_id,
		'studentId': student_id,
		'start': int(start.timestamp()),
		'finish': int(permission_end(start, duration, finish).timestamp())
	}

def unpack_student_permission(resource: dict):
	for key in ('permissionId', 'studentId', 'start', 'finish'):
		yield resource.get(key)

def validate_student_permission(resource: dict, partial: bool = False):
	assert 'permissionId' in resource and type(resource['permissionId']) == int

def students_permissions(app: Flask):

	@app.route('/api/students/permissions/')
	def get_students_permissions():
		db = g.db.cursor()
		db.execute("""
			SELECT s.id, r.start, p.id, p.duration, p.finish
			FROM students AS s
			INNER JOIN students_permissions AS r ON s.id = r.student_id
			INNER JOIN permissions AS p ON r.permission_id = p.id
		""")
		result = db.fetchall()
		db.close()

		return [create_student_permission(
			perm_id, student_id, start, duration, finish
		) for (student_id, start, perm_id, duration, finish) in result]

	@app.route('/api/students/<int:id>/permission')
	def get_student_permission(id: int):
		db = g.db.cursor()
		db.execute("""
			SELECT r.start, p.id, p.duration, p.finish
			FROM students_permissions AS r
			INNER JOIN permissions as p ON r.permission_id = p.id
			WHERE r.student_id = %s
		""", (id,))
		result = db.fetchone()
		db.close()

		if not result:
			abort(404)
		start, perm_id, duration, finish = result
		return create_student_permission(perm_id, id, start, duration, finish)

	@app.route('/api/students/<int:id>/permission', methods=['PUT'])
	def put_student_permission(id: int):
		perm = request.get_json()
		try: validate_student_permission(perm)
		except AssertionError: abort(400)
		perm_id, _, _, _ = unpack_student_permission(perm)

		db = g.db.cursor()
		db.execute("""
			SELECT EXISTS(SELECT 1 FROM students WHERE id = %s)
		""", (id,))
		student_exists, = db.fetchone()
		if not student_exists:
			db.close()
			abort(404)

		db.execute("""
			SELECT duration, finish FROM permissions WHERE id = %s
		""", (perm_id,))
		perm = db.fetchone()
		if not perm:
			db.close()
			abort(404)
		duration, finish = perm

		db.execute("""
			INSERT INTO students_permissions (student_id, permission_id)
			VALUES (%s, %s)
			ON CONFLICT (student_id) DO UPDATE SET
				permission_id = %s,
				start = DEFAULT
			RETURNING start
		""", (id, perm_id, perm_id))
		start, = db.fetchone()
		db.close()

		return create_student_permission(perm_id, id, start, duration, finish)

	@app.route('/api/students/<int:id>/permission', methods=['DELETE'])
	def delete_student_permission(id: int):
		db = g.db.cursor()
		db.execute("""
			DELETE FROM students_permissions AS r
			USING permissions AS p
			WHERE r.student_id = %s AND r.permission_id = p.id
			RETURNING r.start, p.id, p.duration, p.finish
		""", (id,))
		result = db.fetchone()
		db.close()

		if not result:
			abort(404)
		start, perm_id, duration, finish = result
		return create_student_permission(perm_id, id, start, duration, finish)