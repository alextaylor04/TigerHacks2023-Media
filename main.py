from flask import Flask
import json

app = Flask(__name__)

x =  '{"name":"John", "age":30, "city":"New York"}'

y = json.loads(x)

@app.route('/')
def test():
    return y 