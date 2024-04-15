from fastapi import APIRouter, Body, Request
from sse_starlette.sse import EventSourceResponse
from typing import Annotated
from boxedfactory.core.common.shared import WorkerBase, WorkerStatus
from core.workers.hot_swap import HotSwapManager
from typing import Any
import uuid
import json
import asyncio

import os

def initialize_modules_loading():
    pass

modules_location = os.environ.get("BUREAUCRAT_WORKERS_ROOT")
package = os.environ.get("BUREAUCRAT_WORKERS_PACKAGE")

manager:HotSwapManager = HotSwapManager(modules_location, package)

router = APIRouter()

def get_status_string(status:WorkerStatus):
    match status:
        case WorkerStatus.Stopped:
            return "Stoped"

def get_worker_status(worker:WorkerBase):
    state = worker.get_state()
    return {
        "status": int(state["status"]),
        "logs": [l.__dict__ for l in state["logs"]],
        "step": {
            "current": state["current"],
            "steps": state["steps"],
            "step": state["step"]
        },
        "meta": {**state["meta"]}
    }

@router.get("/")
def get_all_workers_types():
    return manager.get_types()

@router.put("/{module_path:path}")
async def update_module(module_path:str, request:Request):
    content = (await request.body()).decode()
    manager.create_module(module_path, content)

@router.get("/{kind}")
def get_all_workers_of_kind(kind:str):
    return manager.get_worker_ids(kind)

@router.post("/{kind}/create")
def create_worker(kind:str):
    return {
        "id": manager.create(kind)
    }

@router.get("/{kind}/statistics")
def get_all_workers_of_kind(kind:str):
    workers_ids = manager.get_worker_ids(kind)
    workers: list[WorkerBase] = [
        manager.get_worker(kind, id) for id in
        workers_ids
    ]
    states = [w.get_state() for w in workers]
    status = [s["status"] for s in states]
    return {
        "kind": kind,
        "workers": workers_ids,
        "count": len(workers),
        "active": len([w for w in status if w == WorkerStatus.Active]),
        "paused": len([w for w in status if w == WorkerStatus.Paused]),
        "stopped": len([w for w in status if w == WorkerStatus.Stopped])
    }

@router.post("/{kind}/{id}/recycle")
def recycle_worker(kind:str, id:str):
    manager.recycle(kind, id)
    return get_worker_status(manager.get_worker(kind, id))

@router.post("/{kind}/{id}/{command}")
def start_worker(
    kind:str, 
    id:str, 
    command:str, 
    params: Annotated[dict, Body()]):
    worker = manager.get_worker(kind, id)
    getattr(worker, command)(**params)
    return get_worker_status(worker)

@router.get("/{kind}/{id}")
def get_worker(kind:str, id:str):
    return get_worker_status(manager.get_worker(kind, id))

def create_event(event:str, data:Any, retry:float = 1):
    return {
        "event": event,
        "id": str(uuid.uuid4()),
        "retry": retry,
        "data": data
    }

@router.get("/{kind}/{id}/stream/{latency:float}")
async def get_worker_stream(kind:str, id:str, latency:float, request:Request):
    
    olds = {
        "status": None,
        "logs": None,
        "meta": None,
        "step": None
    }
    async def event():
        while True:
            if await request.is_disconnected():
                break
            try:
                data = get_worker_status(manager.get_worker(kind, id))
                for k in olds:
                    current = json.dumps(data[k])
                    if current != olds[k]:
                        olds[k] = current
                        yield create_event(f"update-{k}", current)
            except Exception as e:
                yield create_event(
                    "error", 
                    str(e)
                    )
            await asyncio.sleep(latency)
    return EventSourceResponse(event())


@router.delete("/{kind}/{id}")
def delete_worker(kind:str, id:str):
    return {
        "id": manager.remove(kind, id)
    }
