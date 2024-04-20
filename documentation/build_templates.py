from typing import Any
from jinja2 import Template
import json

manifest_location:str = 'templates/manifest.txt'
data_location:str = 'documentation.json'

def get_content(location:str):
    with open(location, 'r') as fi:
        return fi.read()

def fill_template(template_location:str, data:dict[str, Any]):
    return Template(get_content(template_location)).render(data)

data = json.loads(get_content(data_location))

files = {i.split(":")[0].strip():i.split(":")[1].strip() for i in get_content(manifest_location).split('\n')}

for f in files:
    with open(files[f], 'w') as fo:
        fo.write(fill_template(f, data))