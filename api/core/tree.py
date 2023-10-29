from typing import Union
import re
import json
import os

Node = dict[str, Union['Node', list['Node'], str]]

class Tree:
    def __init__(self, root:str, forest:str, name:str) -> None:
        self.root_folder:str = root
        self.forest = forest
        self.name = name
        self.root:Node = dict()
        if not os.path.exists(os.sep.join([root, forest])):
            os.makedirs(os.sep.join([root, forest]))
        self.load()

    def filename(self):
        return os.sep.join([self.root_folder, self.forest, f'{self.name}.json'])

    def load(self):
        filename:str = self.filename()
        if os.path.exists(filename):
            with open(filename, 'r') as fi:
                self.root = json.load(fi)

    def save(self):
        filename:str = self.filename()
        with open(filename, 'w') as fo:
            json.dump(self.root, fo)

    def node(self, path:list[str], root:Node = None, item:Node = None, current_path:str = '.'):
        root = root or self.root
        if len(path) == 0:
            return root
        current:Union[str, int]
        current, *path = path
        if current == '$':
            return self.node(path, root, item, current_path)
        if re.match('^[\d]+$', current):
            current = int(current)
        if isinstance(current, int):
            if not isinstance(root, list):
                raise Exception(f"Node {current_path} is not a list")
            if current >= len(root):
                if not item:
                    raise Exception(f"Index {current} not in node {current_path}")
                else:
                    while len(root) <= current:
                        root.append(None)
                    root.append(item)
            elif not item:
                return self.node(path, root[current], item, '/'.join([current_path, str(current)]))
            else:
                root[current] = item
        else:
            if not isinstance(root, dict):
                raise Exception(f"Node {current_path} is not a map")
            if item:
                root[current] = item
            elif not current in root:
                raise Exception(f"Index {current} not in node {current_path}")
            else:
                return self.node(path, root[current], item, '/'.join([current_path, str(current)]))
        self.save()

def get_forests(root:str):
    return [i for i in os.listdir(root) if os.path.isdir(os.sep.join([root, i]))]

def get_trees(root:str, forest:str):
    return [i[:-5] for i in os.listdir(os.sep.join([root, forest])) if i.endswith(".json")]
