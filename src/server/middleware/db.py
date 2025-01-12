from flask import Flask, g
from psycopg2 import connect

def db(app: Flask, **connect_params):
	connection = connect(**connect_params)

	@app.before_request
	def set_connection():
		g.db = connection

	@app.teardown_request
	def commit(_):
		g.db.commit()