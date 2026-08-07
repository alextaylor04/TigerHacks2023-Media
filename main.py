from flask import Flask, render_template, session, request, redirect, send_file
from flask_session import Session
from flask_cors import CORS
from dotenv import load_dotenv
import os
import cached_playlist_data
import spotipy
import urllib.request
from PIL import Image
import base64
import io

load_dotenv('spotipy.env', override=True)

app = Flask(__name__, template_folder='templates', static_url_path='/static')
CORS(app)
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
Session(app)

class SpotifyCache:
    spotify = None
    def __init__(self, spotify):
        SpotifyCache.spotify = spotify
class PlaylistIndexCache:
    index = None
    def __init__(self, index_var):
        PlaylistIndexCache.index = index_var
@app.route('/image/<filename>', methods=['GET'])
def serve_image(filename):
    return send_file(f'images/{filename}', mimetype='image/png')

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
        return render_template('login.html', link=auth_url) #f'<h2><a href="{auth_url}">Sign in</a></h2>'

    # Step 3. Signed in, display data

    spotify = spotipy.Spotify(auth_manager=auth_manager)
    SpotifyCache(spotify)
    cached_playlist_data.spotify_api.playlist_cover_images(spotify)
    return render_template('index1.html',  username=spotify.me()["display_name"], playlist_names=cached_playlist_data.spotify_api.playlist_names(spotify), 
                           playlist_num_tracks=cached_playlist_data.spotify_api.num_songs_in_playlists(spotify), playlist_cover_images=cached_playlist_data.spotify_api.playlist_cover_images(spotify))

@app.route('/lyrics')
def lyrics():
    cached_playlist_data.CachedPlaylistData.cache_top_50_lyrics(SpotifyCache.spotify, PlaylistIndexCache.index)
    return render_template('lyrics.html', top_50_lyrics=cached_playlist_data.CachedPlaylistData.top_50_lyrics)
@app.route('/playlistmood')
def mood():
    cached_playlist_data.CachedPlaylistData.cache_open_ai_theme(SpotifyCache.spotify, PlaylistIndexCache.index)
    # cached_playlist_data.CachedPlaylistData.cache_open_ai_images()

    mood_str = cached_playlist_data.CachedPlaylistData.open_ai_theme
    mood_str = mood_str.replace(".","")
    mood_str = mood_str.replace(",","")

    
    # for i in range():
    # urllib.request.urlretrieve(cached_playlist_data.CachedPlaylistData.open_ai_images["data"][0]["url"], "images/img" + str(0) + ".png")
    return render_template('mood.html', moods=mood_str.split(" "))

@app.route('/choosecontent')
def choose_content():
    return render_template('choose.html')

@app.route('/process', methods=['POST']) 
def process(): 
    data = request.form.get('data') 
    # process the data using Python code 
    result = int(data)
    print(result)
    PlaylistIndexCache(result)
    return str(result) 



if __name__ == '__main__':
    app.debug = True
    app.run()







