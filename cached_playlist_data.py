import spotify_api
class CachedPlaylistData:
    top_50_lyrics = None
    open_ai_theme = None
    open_ai_images = None  

    def cache_top_50_lyrics(spotify_var, playlist_num):
        CachedPlaylistData.top_50_lyrics = spotify_api.common_lyrics_in_song(spotify_var, spotify_var.me()["display_name"], spotify_api.playlist_id_from_index(spotify_var, playlist_num))
    def cache_open_ai_theme(spotify_var, playlist_num):
              CachedPlaylistData.open_ai_theme = spotify_api.open_ai_theme_req(spotify_var, spotify_var.me()["display_name"], spotify_api.playlist_id_from_index(spotify_var, playlist_num))
    def cache_open_ai_images():
             CachedPlaylistData.open_ai_images = spotify_api.ai_generated_output.playlist_img(CachedPlaylistData.open_ai_theme)