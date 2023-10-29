import os
from core.tree import Tree

folder:str = "D:\\tests\\root"
forest:str = "concepts"
tree:str = "human"
tests:str = "concepts\\queries.txt"

with open(os.sep.join([folder, tests]), 'r') as fi:
    for line in fi.readlines():
        raw_path, result = line.strip().split('=')
        path:list[str] = raw_path.split('/')
        print(Tree(folder, forest, tree).node(path) == result)