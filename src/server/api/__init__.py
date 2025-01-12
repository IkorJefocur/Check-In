from flask import Flask
from .students import students
from .permissions import permissions
from .students_permissions import students_permissions

def api(app: Flask):
	students(app)
	permissions(app)
	students_permissions(app)