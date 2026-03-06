import subprocess

def run_cxx_app():

    subprocess.run(["./build/app"], cwd="./cxx")



import json
import os

def read_out_json():

    path = "./cxx/res/data/outJson.json"

    if not os.path.exists(path):
        return ""

    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    return data
