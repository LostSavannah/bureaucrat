from fastapi import FastAPI
import queues_router
import blobs_router
import tables_router
import trees_router

from common.http import configure_cors, SPAStaticFiles


api = configure_cors(FastAPI())

api.include_router(queues_router.router, prefix="/queues", tags=["Queues"])
api.include_router(blobs_router.router, prefix="/blobs", tags=["Blobs"])
api.include_router(tables_router.router, prefix="/tables", tags=["Tables"])
api.include_router(trees_router.router, prefix="/trees", tags=["Trees"])

api.mount("/", SPAStaticFiles(directory="/bureaucrat/frontend", html=True), name = "static")

