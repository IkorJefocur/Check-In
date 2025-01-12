from flask import Flask, abort, send_file, send_from_directory

def stat(app: Flask):

	@app.route('/')
	def get_index():
		return send_file('dist/client/index.html')

	@app.route('/app/<path:filename>')
	def get_stat(filename: str):
		if filename == 'index.html':
			abort(404)
		return send_from_directory('dist/client', filename)