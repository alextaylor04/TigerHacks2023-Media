from flask import Flask, render_template
import ai_generated_output
import lyrics
import time

app = Flask(__name__, template_folder='templates')

@app.route('/')
def render():
    return render_template("index.html")

start_time = time.time()
lyrics.top_50_occurences("""Just a young gun with a quick fuse
I was uptight, wanna let loose
I was dreaming of bigger things and
Wanna leave my own life behind
Not a "Yes, sir", not a follower
Fit the box, fit the mold, have a seat
In the foyer, take a number
I was lightning before the thunder (thunder)
Thunder, thunder, thun-
Thunder, th-th-thunder, thunder
Thunder, thunder, thun-
Thunder, th-th-thunder, thunder
Thunder, feel the thunder (thun-, thun-)
Lightning then the thunder (th-th-thunder, thunder)
Thunder, feel the thunder (thun-, thun-)
Lightning then the thunder, thunder (th-th-thunder, thunder)
Thunder
Thunder
Kids were laughing in my classes
While I was scheming for the masses
Who do you think you are?
Dreaming 'bout being a big star
They say, "You're basic", they say, "You're easy"
You're always riding in the backseat
Now I'm smiling from the stage while
You were clapping in the nosebleeds
Thunder, thunder, thun-
Thunder, th-th-thunder, thunder
Thunder, thunder, thun-
Thunder, th-th-thunder, thunder
Thunder, feel the thunder (thun-, thun-)
Lightning then the thunder (th-th-thunder, thunder)
Thunder, feel the thunder (thun-, thun-)
Lightning then the thunder, thunder (th-th-thunder, thunder)
Thunder, feel the thunder
Lightning then the thunder, thunder
Thunder, feel the thunder (thun-, thun-)
Lightning then the thunder, thunder (th-th-thunder, thunder)
Thunder, feel the thunder (thun-, thun-)
Lightning then the thunder, thunder (th-th-thunder, thunder)
Thunder, feel the thunder (never give up, never give up)
Lightning then the thunder, thunder (never give up on your dreams)
Thunder, feel the thunder (never give up, never give up)
Lightning then the thunder, thunder (never give up on your dreams)
Thunder, thunder, thun-
Thunder, th-th-thunder, thunder
Thunder, thunder, thun-
Thunder, th-th-thunder, thunder
thunder, thunder, thun-
Thunder, th-th-thunder, thunder
(Whoa-oh-oh) thunder, thunder, thun-
Thunder, th-th-thunder, thunder
""")
print(f'Exeuction time: {time.time() - start_time:.5f}')

songs = ['bad blood', 'life is a highway', 'never gonna give you up']
print(ai_generated_output.convert_to_prompt(songs))





