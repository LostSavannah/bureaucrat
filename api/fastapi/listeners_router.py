import base64
import uuid
from fastapi import APIRouter, Request
import os
import json

from pybureaucrat.bureaucrat_connection import BureaucratConnection
from pybureaucrat.base import ServiceError


host = os.getenv("BUREAUCRAT_API_HOST")
port = os.getenv("BUREAUCRAT_API_PORT")

service = BureaucratConnection(f"http://{host}:{port}")
queues_configuration_path = "$/Configurations/RawRequestsQueue"
router = APIRouter()

@router.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def listen(request:Request):
    try:
        requests_queue:str = service.trees.get_value("default", "default", queues_configuration_path)
    except ServiceError:
        service.trees.set_value("default", "default", queues_configuration_path, requests_queue := "RawRequestsQueue")
    
    id = str(uuid.uuid4())
    data = {
        "id": id,
        "method": request.method,
        "url": str(request.url),
        "base_url": str(request.base_url),
        "path": str(request.path_params['full_path']),
        "query": request.query_params._dict,
        "headers": {i:request.headers[i] for i in request.headers},
        "body": base64.b64encode(await request.body()).decode()
    }
    service.queues.enqueue(requests_queue, json.dumps(data))
    return {
        "id": id
    }
