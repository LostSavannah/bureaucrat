from fastapi import APIRouter, Request
from fastapi.responses import Response
import os

from core.storage import Storage

import base64

STORAGE_ROOT = os.environ.get("BUREAUCRAT_BLOBS_ROOT")

storage = Storage(STORAGE_ROOT)

router = APIRouter()

@router.get("/{full_path:path}")
async def read_file(full_path:str):
    content:str = base64.b64encode(await storage.read_file(full_path)).decode() 
    return Response(content=content, status_code=200)

@router.post("/{full_path:path}")
async def write_file(full_path:str, request:Request):
    content:bytes = base64.b64decode(await request.body())
    await storage.write_file(full_path, content)
    return Response(status_code=200)

@router.delete("/{full_path:path}")
async def read_file(full_path:str):
    await storage.delete_file(full_path)
    return Response(status_code=200)