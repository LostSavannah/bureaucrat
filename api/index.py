from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import queues_router
import blobs_router
import tables_router

api = FastAPI()

api.include_router(queues_router.router, prefix="/queues", tags=["Queues"])
api.include_router(blobs_router.router, prefix="/blobs", tags=["Blobs"])
api.include_router(tables_router.router, prefix="/tables", tags=["Tables"])

api.mount("/", StaticFiles(directory="/bureaucrat/frontend"), name = "static")