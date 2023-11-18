import requests
import json

nuget_source = "https://api.nuget.org/v3/index.json"

def get_services():
    catalog = json.loads(requests.get(nuget_source).text)
    return [r["@id"] for r in catalog["resources"] if r["@type"] == "SearchQueryService"]

def get_package(name:str):
    ids:list[str] = []
    for service in get_services():
        result = json.loads(requests.get(f"{service}?q={name}").text)
        ids.extend([i["@id"] for i in result["data"] if i["@id"] not in ids])
    return ids

def get_package_index(url:str):
    return json.loads(requests.get(url).text)


print([get_package("bureaucrat.core")])
