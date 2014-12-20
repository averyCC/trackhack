import datetime
from flask.ext.mongokit import Document

class User(Document):
    __database__='trackhack'
    __collection__='users'
    structure = {
        'id': basestring,
        'name': basestring,
        'access_token': basestring,
        'date_joined': datetime.datetime
    }
    required_fields = ['name', 'id']
    default_values= {
        'date_joined': datetime.datetime.utcnow
    }

    
            # 'playlists': [basestring], 
        # 'friends': [basestring], 