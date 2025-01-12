import os
import json
from flask import Flask
from .middleware import middleware
from .routes import routes
from .api import api

app = Flask(os.getcwd())

for key in json.loads(open('src/server/env_keys.json').read()):
	app.config[key] = os.getenv(key)

middleware(app)
routes(app)
api(app)