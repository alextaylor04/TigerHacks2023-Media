# Music Unmasked

**What does your playlist actually say?** Log in with Spotify, pick a playlist, and Music
Unmasked reads it back to you: the words its lyrics repeat most, and a three-word mood for the
whole playlist. The original idea went one step further and painted that mood as an image.

Built at TigerHacks 2023 (November 2023), a university hackathon.

## How it works

- **Spotify** (`spotipy`) lists your playlists with their cover art and track counts, and pulls
  the tracks of the one you choose.
- **Lyrics** come from Genius (`lyricsgenius`). The app counts every word across the playlist,
  drops filler words (listed in `excluded_words`), and shows the fifty most frequent.
- **The mood** is the playlist's song titles sent to GPT-3.5 with a request for three words that
  capture the whole set. `ai_generated_output.py` also has the step that turns those words into
  a 512x512 image with OpenAI's image API.
- **The web app** is Flask with server-side sessions and plain HTML, CSS and JavaScript pages:
  login, choose a playlist, lyrics, and mood.

## Run it

```
pip install -r requirements.txt
python main.py
```

It needs your own credentials, none of which are in the repository: a Spotify app's client id
and secret in `spotipy.env`, an OpenAI key in a file named `OPENAPI_KEY`, and a Genius token in
a file named `LYRICS_API_TOKEN`. All three are gitignored.

## Status

A finished hackathon project, revisited in 2026-08 with a login page, image serving and a
rework of the mood and lyrics pages; the last commit is marked work in progress. What does not
work yet is in [KNOWN_ISSUES.md](KNOWN_ISSUES.md).
