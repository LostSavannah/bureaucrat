from fastapi import APIRouter, Request
from core.templating.template import Template
from base64 import b64encode
import os

TEMPLATES_DATABASE = os.environ.get("BUREAUCRAT_TEMPLATES_DATABASE")

template = Template(TEMPLATES_DATABASE)

router = APIRouter()

@router.get("/template")
async def get_templates():
    return template.get_templates()

@router.get("/render")
async def get_renders():
    return template.get_renders()

@router.get("/parser")
async def get_parsers():
    return template.get_parsers()
    
@router.get("/template/{id:path}")
async def get_template(id: str):
    return template.get_template(id)

@router.post("/template/{id:path}")
async def set_template(id: str, req: Request):
    content = (await req.body()).decode('utf-8')
    template.set_template(id, content)
    return { "template": id }

@router.delete("/template/{id:path}")
def remove_template(id: str):
    template.delete_template(id)
    return { "template": id }

@router.put("/template/{id:path}")
async def process_template(id: str, req: Request, parser:str, render:str):
    try:
        data = (await req.body()).decode('utf-8')
        content_type, data = template.render(id, render, data, [parser])
        return {
            "contentType": content_type,
            "data": b64encode(data).decode()
        }
    except Exception as e:
        return {
            "contentType": "text/plain",
            "data": b64encode(repr(e).encode()).decode()
        }
