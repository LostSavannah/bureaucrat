from jinja2 import Template as Jinja2Template
from mako.template import Template as MakoTemplate
import json

def jinja_json_render(content:str, template:str) -> str:
    return Jinja2Template(template).render(json.loads(content))

def mako_json_render(content:str, template:str) -> str:
    return MakoTemplate(template).render(**json.loads(content))

def raw_content(content, _) -> str:
    return content

def raw_template(_, template) -> str:
    return template