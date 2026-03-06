from flask import Flask, render_template, request
import json
import services.cxx as cxx

app = Flask(__name__)



@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        user_text = request.form.get("user_text", "")

        with open("./cxx/res/data/in.txt", "w", encoding="utf-8") as f:
            f.write(user_text)

        cxx.run_cxx_app()
    
    return render_template("index.html", data=cxx.read_out_json())



if __name__ == "__main__":
    app.run(debug=True) 
