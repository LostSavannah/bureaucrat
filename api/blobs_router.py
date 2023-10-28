from fastapi import APIRouter, Request
from fastapi.responses import FileResponse
from fastapi.exceptions import HTTPException
import os

from core.storage import Storage, index

import base64

STORAGE_ROOT = os.environ.get("BUREAUCRAT_BLOBS_ROOT")

storage = Storage(STORAGE_ROOT)

router = APIRouter()

@router.get("/download:{full_path:path}")
async def download(full_path:str):
    plain_files = await storage.get_files()
    if full_path in plain_files:
        filename:str = full_path.split("/")[-1]
        return FileResponse(plain_files[full_path], filename=filename)
    else:
        raise HTTPException(404, f"Blob '{full_path}' not found")
    

@router.get("/raw:{full_path:path}")
async def download(full_path:str):
    plain_files = await storage.get_files()
    if full_path in plain_files:
        with open(plain_files[full_path], 'rb') as fi:
            return base64.b64encode(fi.read()).decode()
    else:
        raise HTTPException(404, f"Blob '{full_path}' not found")

@router.get("/{full_path:path}")
async def read_file(full_path:str):
    filenames = [i.split("/") for i in (await storage.get_files())]
    path = [i for i in full_path.split("/") if len(i) > 0]
    return {
        "result": {
            "index": index(path, filenames)
        }
    }

@router.post("/{full_path:path}")
async def write_file(full_path:str, request:Request):
    content:bytes = base64.b64decode(await request.body())
    path = "/".join([i for i in full_path.split("/") if len(i) > 0])
    await storage.write_file(path, content)
    return {
        "result": path
    }

@router.delete("/{full_path:path}")
async def read_file(full_path:str):
    await storage.delete_file(full_path)
    return {
        "result": "Ok"
    }