from fastapi import APIRouter, Request
from fastapi.exceptions import HTTPException
from core.tree import Tree, get_forests, get_trees, Node
import os
import json

ROOT = os.environ.get("BUREAUCRAT_TREES_ROOT")

trees:dict[str, dict[str, Tree]] = {
    forest:{
        tree:Tree(ROOT, forest, tree) 
        for tree 
        in get_trees(ROOT, forest)
    } 
    for forest 
    in get_forests(ROOT)
}

router = APIRouter()

@router.get("/")
async def list_forests():
    return {
        "result": get_forests(ROOT)
    }

@router.get("/{forest}")
async def list_trees(forest:str):
    if forest not in get_forests(ROOT):
        raise HTTPException(404, f"forest '{forest}' not found")
    return{
        "result": get_trees(ROOT, forest)
    }

@router.get("/{forest}/{tree}/index:{fullpath:path}")
async def get_tree(forest:str, tree:str, fullpath:str):
    if forest not in get_forests(ROOT):
        raise HTTPException(404, f"forest '{forest}' not found")
    if tree not in get_trees(ROOT, forest):
        raise HTTPException(404, f"tree '{tree}' not found in '{forest}'")
    node:Node = None
    try:
        path = fullpath.split("/")
        node = trees[forest][tree].node(path)
    except Exception as e:
        raise HTTPException(400, str(e))
    if isinstance(node, str):
        return {
            "result":{
                "kind": "string",
                "value": node,
                "name": path[-1],
                "path": fullpath
            }
        }
    else:
        return{
            "result":{
                "kind": "list" if isinstance(node, list) else "dictionary",
                "value": [str(i) for i in node] if isinstance(node, dict) else [i for i in range(len(node))],
                "name": path[-1],
                "path": fullpath
            }
        }

@router.get("/{forest}/{tree}/{fullpath:path}")
async def get_tree(forest:str, tree:str, fullpath:str):
    if forest not in get_forests(ROOT):
        raise HTTPException(404, f"forest '{forest}' not found")
    if tree not in get_trees(ROOT, forest):
        raise HTTPException(404, f"tree '{tree}' not found in '{forest}'")
    try:
        path = fullpath.split("/")
        return{
            "result": trees[forest][tree].node(path)
        }
    except Exception as e:
        raise HTTPException(400, str(e))

    
@router.post("/{forest}/{tree}/{fullpath:path}")
async def get_tree(forest:str, tree:str, fullpath:str, request:Request):
    content:str = (await request.body()).decode()
    node:Node = None
    try:
        node = json.loads(content)
    except:
        raise HTTPException(400, "Invalid json body")
    if forest not in trees:
        trees[forest] = dict()
    if tree not in trees[forest]:
        trees[forest][tree] = Tree(ROOT, forest, tree)
    path = fullpath.split("/")
    trees[forest][tree].node(path, item=node)
    return{
        "result": fullpath
    }

@router.delete("/{forest}/{tree}/{fullpath:path}")
async def remove_tree(forest:str, tree:str, fullpath:str):
    if forest not in trees:
        trees[forest] = dict()
    if tree not in trees[forest]:
        trees[forest][tree] = Tree(ROOT, forest, tree)
    path = fullpath.split("/")
    trees[forest][tree].remove_node(path)
    return {
        "result": "Ok"
    }