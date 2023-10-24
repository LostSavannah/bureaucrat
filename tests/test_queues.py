import requests
import json

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

def delete(name):
    return request(f"/queues/{name}", method="delete")

def test_on_enqueue_gets_created():
    queue_name = "test"
    enqueue(queue_name, "data")
    assert queue_name in get_lists()

def test_on_dequeue_gets_created():
    queue_name = "test"
    dequeue(queue_name)
    assert queue_name in get_lists()

def test_on_delete_gets_deleted():
    queue_name = "test"
    delete(queue_name)
    assert queue_name not in get_lists()