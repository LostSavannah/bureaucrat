import requests
import json
import base64

port = 19760
BASE_URL:str = f"http://localhost:{port}"

def request(url:str, method:str = "get", data:str = ""):
    full_url = f"{BASE_URL}{url}"
    action = requests.get
    if method == "post":
        action = requests.post
    elif method == "delete":
        action = requests.delete
    return action(full_url, data=data).text

def get_lists():
    return json.loads(request("/queues/"))

def dequeue(name:str):
    return request(f"/queues/{name}")

def enqueue(name:str, content:str):
    return request(f"/queues/{name}", method="post", data=content)

def delete_queue(name):
    return request(f"/queues/{name}", method="delete")