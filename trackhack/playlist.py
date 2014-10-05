from trackhack import app, mongo
import json
from flask import request, jsonify

@app.route("/loadPlaylist")
def loadPlaylist():
	name = request.args['name']
	playlist  = mongo.playlists.find_one({'name': name})
	return jsonify(playlist = playlist['tracks'])

@app.route("/addTrack", methods=['GET'])
def addTrack():
	import pdb
	pdb.set_trace()
	name = request.args['name']
	tracks = request.args['tracks']

	mongo.playlists.insert({'name': name, 'tracks': json.loads(tracks)})
	return jsonify(success='success')