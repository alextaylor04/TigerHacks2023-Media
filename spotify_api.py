import spotipy
import lyrics
import ai_generated_output


def playlist_names(spotify):
    results = spotify.current_user_playlists(limit=10)["items"]
    common_lyrics_in_song(spotify, spotify.me()["display_name"], results[3]["id"])
    names = [playlist["name"] for playlist in results]

    return names
def playlist_id_from_index(spotify, index):
    results = spotify.current_user_playlists(limit=10)["items"]
    return results[index]["id"]

def num_songs_in_playlists(spotify):
    results = spotify.current_user_playlists(limit=10)["items"]
    num_songs =[playlist["tracks"]["total"] for playlist in results]
    return num_songs
def playlist_cover_images(spotify):
    results = spotify.current_user_playlists(limit=10)["items"]

    images = [spotify.playlist_cover_image(playlist["id"]) for playlist in results]
    return images
def common_lyrics_in_song(spotify, username, playlist_id):
    
    max_searches = spotify.playlist(playlist_id)["tracks"]["total"]
    
    
    search = lyrics.LyricsSearchInstance(max_searches).num_searches
    results = get_tracks_from_playlist(spotify, username, playlist_id)
    if (len(results) <= search):
        return ""

    song_name = results[search]['track']['name']
    artist_name = results[search]['track']['artists'][0]['name']
    
    
    lyrics_str = lyrics.lyrics_string(song_name + ", " + artist_name)
    return lyrics.top_50_occurences(lyrics_str)

def open_ai_theme_req(spotify, username, playlist_id):
    return ai_generated_output.playlist_theme(song_names(spotify, username, playlist_id))

def song_names(spotify, username, playlist_id):
    tracks = get_tracks_from_playlist(spotify, username, playlist_id)
    song_names = []
    for i in range(len(tracks)):
        song_names.append(tracks[i]["track"]["name"])
    return song_names


def get_tracks_from_playlist(spotify, username, playlist_id):
    results = spotify.user_playlist_tracks(username, playlist_id=playlist_id)

    tracks = results['items']
    while results['next']:
        results = spotify.next(results)
        tracks.extend(results['items'])
    return tracks