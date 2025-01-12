from flask import Flask
from .db import db

def middleware(app: Flask):
	db(
		app,
		host=app.config['DB_HOST'],
		port=app.config.get('DB_PORT'),
		dbname=app.config['DB_NAME'],
		user=app.config['DB_USER'],
		password=app.config.get('DB_PASSWORD')
	)