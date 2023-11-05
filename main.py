from flask import Flask, render_template, session, request, redirect
from flask_session import Session
from dotenv import load_dotenv
import os
import cached_playlist_data
import spotipy

load_dotenv('spotipy.env', override=True)

app = Flask(__name__, template_folder='templates', static_url_path='/static')
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)

@app.route('/')
def index():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-read-currently-playing playlist-modify-private',
                                              cache_handler=cache_handler,
                                               show_dialog=True)
    if request.args.get("code"):
        # Step 2. Being redirected from Spotify auth page
        auth_manager.get_access_token(request.args.get("code"))
        return redirect('/')

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        # Step 1. Display sign in link when no token
        auth_url = auth_manager.get_authorize_url()
        return f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 3. Signed in, display data
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    cached_playlist_data.CachedPlaylistData(spotify, 0)
    cached_playlist_data.spotify_api.playlist_cover_images(spotify)
    return render_template('index1.html',  username=spotify.me()["display_name"], playlist_names=cached_playlist_data.spotify_api.playlist_names(spotify), 
                           playlist_num_tracks=cached_playlist_data.spotify_api.num_songs_in_playlists(spotify), playlist_cover_images=cached_playlist_data.spotify_api.playlist_cover_images(spotify))

@app.route('/lyrics')
def lyrics():
    return render_template('lyrics.html')
@app.route('/playlistmood')
def mood():
    return render_template('mood.html')

@app.route('/process', methods=['POST']) 
def process(): 
    data = request.form.get('data') 
    # process the data using Python code 
    result = int(data)
    print(result)
    cached_playlist_data.CachedPlaylistData(None, result)

    print(cached_playlist_data.CachedPlaylistData.top_50_lyrics)
    return str(result) 



if __name__ == '__main__':
    app.debug = True
    app.run()







