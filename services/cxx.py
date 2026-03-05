import subprocess

def run_cxx_app():

    subprocess.run(["./build/app"], cwd="./cxx")



import json

def read_out_json():

    with open("./cxx/res/data/outJson.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    return data
