from flask import Flask, render_template
import ai_generated_output

app = Flask(__name__, template_folder='templates')

@app.route('/')
def render():
    return render_template("index.html")

songs = ['bad blood', 'life is a highway', 'never gonna give you up']
print(ai_generated_output.convert_to_prompt(songs))





