from trackhack import app, db
from facebook import get_user_from_cookie, GraphAPI
from flask import g, redirect, request, url_for, render_template, session

import models.User as User


FB_APP_ID = app.config['facebook']['consumer_key']
FB_APP_SECRET = app.config['facebook']['consumer_secret']

@app.route('/')
def index():
    if not g.user: 
        return render_template('landing.html', app_id = app.config['facebook']['consumer_key'], 
                app_name = 'trackhack')

	playlists = [
		{'title': 'testing2'}, 
		{'title': 'test'}
	]
	return render_template('index.html', 
							playlists=playlists);



@app.route('/logout')
def logout():
    """Log out the user from the application.

    Log out the user from the application by removing them from the
    session.  Note: this does not log the user out of Facebook - this is done
    by the JavaScript SDK.
    """
    session.pop('user', None)
    return redirect(url_for('index'))



@app.before_request
def get_current_user():
    """Set g.user to the currently logged in user.

    Called before each request, get_current_user sets the global g.user
    variable to the currently logged in user.  A currently logged in user is
    determined by seeing if it exists in Flask's session dictionary.

    If it is the first time the user is logging into this application it will
    create the user and insert it into the database.  If the user is not logged
    in, None will be set to g.user.
    """

    # Set the user in the session dictionary as a global g.user and bail out
    # of this function early.
    if session.get('user'):
        g.user = session.get('user')
        return

    # Attempt to get the short term access token for the current user.
    result = get_user_from_cookie(cookies=request.cookies, app_id=FB_APP_ID,
                                  app_secret=FB_APP_SECRET)

    # If there is no result, we assume the user is not logged in.
    if result:
        # Check to see if this user is already in our database.
        user = db.User.find(User.id == result['uid']).first()

        if not user:
            # Not an existing user so get info
            graph = GraphAPI(result['access_token'])
            profile = graph.get_object('me')

            # Create the user and insert it into the database
            user = db.User()
            user.id=str(profile['id']) 
            user.name=profile['name']
            user.access_token=result['access_token']
            user.save()

        elif user.access_token != result['access_token']:
            # If an existing user, update the access token
            user.access_token = result['access_token']

        # Add the user to the current session
        session['user'] = dict(name=user.name, profile_url=user.profile_url,
                               id=user.id, access_token=user.access_token)

    # Commit changes to the database and set the user as a global g.user
    # db.session.commit()
    g.user = session.get('user', None)
