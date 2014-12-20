import os
from flask import Flask, render_template
# from pymongo import MongoClient
from flask.ext.mongokit import MongoKit

app = Flask(__name__)
app.config['DEBUG'] = True
import trackhack.secret

########### Import Models #################
import models.User

###########################################
db = MongoKit(app)
db.register([models.User])
# server = 'ds043220.mongolab.com'
# port = 43220
# db_name = 'trackhack'
##connect to database
# conn = MongoClient(server, port)
# mongo = conn[db_name]
# mongo.authenticate(app.config['db_username'], app.config['db_password'])

# import trackhack.playlist
import trackhack.views
