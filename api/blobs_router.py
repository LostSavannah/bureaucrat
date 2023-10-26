from fastapi import APIRouter, Request
from fastapi.responses import Response
import os

from core.storage import Storage, index

import base64

STORAGE_ROOT = os.environ.get("BUREAUCRAT_BLOBS_ROOT")

storage = Storage(STORAGE_ROOT)

router = APIRouter()

#@router.get("/")
async def get_files():
    return {
        "result": await storage.get_files()
    }

@router.get("/{full_path:path}")
async def read_file(full_path:str):
    plain_files = [i for i in (await storage.get_files())]
    content:str = None
    if full_path in plain_files:
        content = base64.b64encode(await storage.read_file(full_path)).decode() 
    filenames = [i.split("/") for i in plain_files]
    path = [i for i in full_path.split("/") if len(i) > 0]
    return {
        "result": {
            "content": content,
            "index": index(path, filenames)
        }
    }

@router.post("/{full_path:path}")
async def write_file(full_path:str, request:Request):
    content:bytes = base64.b64decode(await request.body())
    await storage.write_file(full_path, content)
    return {
        "result": full_path
    }

@router.delete("/{full_path:path}")
async def read_file(full_path:str):
    await storage.delete_file(full_path)
    return {
        "result": "Ok"
    }