import os
from flask import Flask, render_template
from pymongo import MongoClient


app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def hello():
	return render_template('index.html');

app.config['db_username'] = "feefles"
app.config['db_password'] = "trackhack2014"

server = 'ds043220.mongolab.com'
port = 43220
db_name = 'trackhack'
##connect to database
conn = MongoClient(server, port)
mongo = conn[db_name]
mongo.authenticate(app.config['db_username'], app.config['db_password'])

import trackhack.users
import trackhack.playlist