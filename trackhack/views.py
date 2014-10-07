from trackhack import app
from flask import render_template

@app.route('/')
def hello():
	#HARDCODED FOR TESTING PURPOSES ONLY!
	#DO NOT HARDCODE WITHOUT ACTUALLY MAKING PLAYLIST THROUGH THE APP PLZ
	playlists = [
		{'title': 'testing2'}, 
		{'title': 'test'}
	]
	return render_template('index.html', 
							playlists=playlists);