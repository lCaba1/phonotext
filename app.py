from flask import Flask, render_template
import json
import services.cxx as cxx

app = Flask(__name__)

@app.route("/")
def home():

    return render_template("index.html", data=cxx.read_out_json())

if __name__ == "__main__":
    app.run(debug=True) 
