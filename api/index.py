from fastapi import FastAPI
import queues_router
import blobs_router

api = FastAPI()

api.include_router(queues_router.router, prefix="/queues", tags=["Queues"])
api.include_router(blobs_router.router, prefix="/blobs", tags=["Blobs"])