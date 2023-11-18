import json
import sys
import urllib.request

nuget_source = "https://api.nuget.org/v3/index.json"

def get_request(url):
    with urllib.request.urlopen(url) as response:
        return response.read()

def get_services():
    catalog = json.loads(get_request(nuget_source))
    return [r["@id"] for r in catalog["resources"] if r["@type"] == "SearchQueryService"]

def get_package(name:str):
    ids:list[str] = []
    for service in get_services():
        result = json.loads(get_request(f"{service}?q={name}"))
        ids.extend([i["@id"] for i in result["data"] if i["@id"] not in ids])
    return ids

def get_package_versions(url:str):
    index = json.loads(get_request(url))
    versions:list[str] = []
    for item in index["items"]:
        versions.extend([inner["catalogEntry"]["version"] for inner in item["items"]])
    return versions


script, mode, package, *_ = sys.argv

if candidates:=get_package(package):
    id, *_ = candidates
    *_, last_version = get_package_versions(id)
    major, minor, patch, *rest = last_version.split(".")
    match mode:
        case "major":
            major = str(int(major) + 1)
        case "minor":
            minor = str(int(minor) + 1)
        case "patch":
            patch = str(int(patch) + 1)
    new_version:str = '.'.join([major, minor, patch, *rest])        
    print(new_version)