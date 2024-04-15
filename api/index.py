from fastapi import FastAPI
import uvicorn
import queues_router
import blobs_router
import tables_router
import trees_router
import templates_router
import workers_router
import listeners_router

import os

from common.http import configure_cors, SPAStaticFiles


api = configure_cors(FastAPI())

api.include_router(queues_router.router, prefix="/queues", tags=["Queues"])
api.include_router(blobs_router.router, prefix="/blobs", tags=["Blobs"])
api.include_router(tables_router.router, prefix="/tables", tags=["Tables"])
api.include_router(trees_router.router, prefix="/trees", tags=["Trees"])
api.include_router(templates_router.router, prefix="/templates", tags=["Templates"])
api.include_router(workers_router.router, prefix="/workers", tags=["Workers"])
api.include_router(listeners_router.router, prefix="/listeners", tags=["Listeners"])

api.mount(
    "/", 
    SPAStaticFiles(directory=os.environ.get("BUREAUCRAT_STATIC_PATH"), html=True), 
    name = "static")

if __name__ == '__main__':
    try:
        uvicorn.run(
            api, 
            host=os.getenv("BUREAUCRAT_API_HOST"), 
            port=int(os.getenv("BUREAUCRAT_API_PORT")))
    except KeyboardInterrupt:
        exit(0)