from fastapi import APIRouter, Request
from fastapi.responses import Response
from fastapi.exceptions import HTTPException

from asyncio import Lock

router = APIRouter()

queues:dict[str, tuple[list[str], Lock]] = dict()

@router.get("/")
async def get_all_queues():
    global queues
    return {
        "result": [i for i in queues]
    }

@router.get("/{queue_name}")
async def dequeue_from_queue(queue_name:str):
    global queues
    if queue_name not in queues:
        queues[queue_name] = [[], Lock()]
    async with queues[queue_name][1]:
        if len(queues[queue_name][0]) > 0:
            return Response(queues[queue_name][0].pop())
        else:
            return Response(status_code=204)
        
@router.post("/{queue_name}")
async def enqueue_in_queue(queue_name:str, request:Request):
    global queues
    if queue_name not in queues:
        queues[queue_name] = [[], Lock()]
    async with queues[queue_name][1]:
        content:str = (await request.body()).decode()
        queues[queue_name][0].insert(0, content)
        index:int = len(queues[queue_name][0])
        return {
            "result": f"Index:{index}"
        }
    
@router.delete("/{queue_name}")
async def delete_queue(queue_name:str):
    global queues
    if queue_name in queues:
        async with queues[queue_name][1]:
            del queues[queue_name]
        return {
            "result": "Ok"
        }
    raise HTTPException(status_code=404)