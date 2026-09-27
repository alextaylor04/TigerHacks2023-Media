# Known issues

## The mood image is not generated

The image step exists (`ai_generated_output.playlist_img`) but is commented out in the
`/playlistmood` route, and `static/mood.js` fills the page's five image slots with placeholder
"no image found" links after a simulated delay. The mood page shows the three GPT words only.

## It needs the pre-1.0 OpenAI client

The code calls `openai.Image.create` and `openai.ChatCompletion.create`, which were removed in
`openai` 1.0. `requirements.txt` pins `openai==0.28.1`; upgrading means porting both calls.

## Single-user state

The chosen Spotify client and playlist index are held in class attributes on the server
(`SpotifyCache`, `PlaylistIndexCache` in `main.py`), so two people using one running instance
would see each other's playlist.
