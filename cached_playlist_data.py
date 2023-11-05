import spotify_api
class CachedPlaylistData:
    top_50_lyrics = None
    open_ai_theme = None
    open_ai_images = None
    spotify = None
        
    def __init__(self, spotify_var, playlist_num):
        if spotify_var is not None:
            CachedPlaylistData.spotify = spotify_var
            return
        self.spotify = CachedPlaylistData.spotify

        CachedPlaylistData.top_50_lyrics = spotify_api.common_lyrics_in_song(self.spotify, self.spotify.me()["display_name"], spotify_api.playlist_id_from_index(self.spotify, playlist_num))
        CachedPlaylistData.open_ai_theme = spotify_api.open_ai_theme_req(self.spotify, self.spotify.me()["display_name"], spotify_api.playlist_id_from_index(self.spotify, playlist_num))
        CachedPlaylistData.open_ai_images = spotify_api.ai_generated_output.playlist_img(CachedPlaylistData.open_ai_theme)

        self.top_50_lyrics = CachedPlaylistData.top_50_lyrics
        self.theme = CachedPlaylistData.open_ai_theme
        self.images = CachedPlaylistData.open_ai_images