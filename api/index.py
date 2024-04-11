from fastapi import FastAPI
import uvicorn
import queues_router
import blobs_router
import tables_router
import trees_router
import templates_router

import os

from common.http import configure_cors, SPAStaticFiles


api = configure_cors(FastAPI())

api.include_router(queues_router.router, prefix="/queues", tags=["Queues"])
api.include_router(blobs_router.router, prefix="/blobs", tags=["Blobs"])
api.include_router(tables_router.router, prefix="/tables", tags=["Tables"])
api.include_router(trees_router.router, prefix="/trees", tags=["Trees"])
api.include_router(templates_router.router, prefix="/templates", tags=["Templates"])

api.mount(
    "/", 
    SPAStaticFiles(directory=os.environ.get("BUREAUCRAT_STATIC_PATH"), html=True), 
    name = "static")

try:
    uvicorn.run(api, host="0.0.0.0", port=19970)
except KeyboardInterrupt:
    exit(0)