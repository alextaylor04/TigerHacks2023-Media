import openai

API_KEY = 2#open("API_KEY", "r").read() FIXME: CHANGE BACK TO API_KEY
openai.api_key = API_KEY

def playlist_img(themes):
    image_resp = openai.Image.create(prompt=themes, n=4, size="512x512")
    return image_resp

def playlist_theme(song_names):
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role:": "user", "content:": convert_to_prompt(song_names)}
        ]
    )
    return response


def convert_to_prompt(song_names):
    num_songs = len(song_names)
    prompt = f"Using the following {num_songs} songs, reply with only three unique words that encapsulate the combined theme of the songs:"
    for i in range(num_songs):
        prompt += f'\n{i+1}. ' + song_names[i]
    return prompt




