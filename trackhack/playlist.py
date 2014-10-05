from trackhack import app, mongo
import json
from flask import request, jsonify

@app.route("/loadPlaylist")
def loadPlaylist():
	name = request.args['name']
	playlist  = mongo.playlists.find_one({'name': name})
	return jsonify(playlist = playlist['tracks'])