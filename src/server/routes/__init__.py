from flask import Flask, send_file
from .stat import stat

def routes(app: Flask):
	stat(app)