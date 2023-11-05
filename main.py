from flask import Flask, render_template, session, request, redirect
from flask_session import Session
from dotenv import load_dotenv
import os
import ai_generated_output
import lyrics
import time
import spotipy
import sys

load_dotenv('spotipy.env')

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
    playlist_cover_images(spotify)
    return render_template('index1.html',  username=spotify.me()["display_name"], playlist_names=playlist_names(spotify), 
                           playlist_num_tracks=num_songs_in_playlists(spotify), playlist_cover_images=playlist_cover_images(spotify))

def playlist_names(spotify):
    results = spotify.current_user_playlists(limit=10)["items"]
    names = [item["name"] for item in results]
    return names
def num_songs_in_playlists(spotify):
    results = spotify.current_user_playlists(limit=10)["items"]
    num_songs =[]
    for item in results:
        print(item)
        tracks = item["tracks"]["total"]
        num_songs.append(tracks)
    return num_songs
def playlist_cover_images(spotify):
    results = spotify.current_user_playlists(limit=10)["items"]
    images = [spotify.playlist_cover_image(item["id"]) for item in results]
    print(images)
    return images
def common_lyrics_in_playlist(spotify):
    pass

if __name__ == '__main__':
    app.debug = True
    app.run()




#songs = ['bad blood', 'life is a highway', 'never gonna give you up']
#print(ai_generated_output.convert_to_prompt(songs))






