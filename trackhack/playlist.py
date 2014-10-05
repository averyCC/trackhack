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
	name = request.args['name']
	tracks = request.args['tracks']

	mongo.playlists.update({'name': name}, {'tracks': json.loads(tracks)})
	return jsonify(success='success')

@app.route("/addPlaylist", methods=['GET'])
def addPlaylist():
	name = request.args['name']
	mongo.playlists.insert({'name': name})
	return jsonify(success='success')