from datetime import time, timedelta
from flask import Flask, abort, g

def create_permission(
	id: int, name: str, duration: timedelta, finish: time
) -> dict:
	resource = {
		'name': name,
		'duration': duration and int(duration.total_seconds()),
		'finish': finish \
			and (finish.hour * 60 + finish.minute) * 60 + finish.second
	}
	if id != None: resource['id'] = id
	return resource

def unpack_permission(resource: dict):
	for key in ('id', 'name', 'duration', 'finish'):
		yield resource.get(key)

def validate_permission(resource: dict, partial: bool = False):
	assert (
		type(resource['name']) == str
	) if 'name' in resource else partial
	assert (
		type(resource['duration']) == int
	) if 'duration' in resource else partial or 'finish' in resource
	assert (
		type(resource['finish']) == int and resource['finish'] < 86400
	) if 'finish' in resource else partial or 'duration' in resource

def permissions(app: Flask):

	@app.route('/api/permissions/')
	def get_permissions():
		db = g.db.cursor()
		db.execute("""
			SELECT id, name, duration, finish FROM permissions
		""")
		result = db.fetchall()
		db.close()

		return [create_permission(id, name, duration, finish)
			for (id, name, duration, finish) in result]

	@app.route('/api/permissions/<int:id>')
	def get_permission(id: int):
		db = g.db.cursor()
		db.execute("""
			SELECT name, duration, finish FROM permissions WHERE id = %s
		""", (id,))
		result = db.fetchone()
		db.close()

		if not result:
			abort(404)
		name, duration, finish = result
		return create_permission(id, name, duration, finish)