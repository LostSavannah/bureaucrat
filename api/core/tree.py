from typing import Union
import re
import json
import os

Node = dict[str, Union['Node', list['Node'], str]]

def is_number(data:str) -> bool:
    if re.match('^[\d]+$', data):
        return True
    return False

def split_path(path:list[str]) -> tuple[Union[str, int], list[str]]:
    current, *result_path = path
    return (current if not is_number(current) else int(current)), result_path

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

    def get_node(self, path:list[str], root:Node = None, current_path:str = "$"):
        root = root or self.root
        if len(path) == 0:
            return root
        current, path = split_path(path)
        if current == "$":
            return self.get_node(path, root, current_path)
        if isinstance(current, int):
            return self.get_list_node(current, path, root, current_path)
        else:
            return self.get_dict_node(current, path, root, current_path)

    def get_list_node(self, current:int, path:list[str], root:Node, current_path:str):
        if not isinstance(root, list):
            raise Exception(f"Node {current_path} is not a list")
        elif len(root) < current:
            raise Exception(f"Index {current} not in node {current_path}")
        else:
            return self.get_node(path, root[current], '/'.join([current_path, str(current)]))
        
    def get_dict_node(self, current:str, path:list[str], root:Node, current_path:str):
        if not isinstance(root, dict):
            raise Exception(f"Node {current_path} is not a dict")
        elif not current in root:
            raise Exception(f"Index {current} not in node {current_path}")
        else:
            return self.get_node(path, root[current], '/'.join([current_path, str(current)]))

    def set_node(self, path:list[str], item:Node, root:Node = None, current_path:str = '$'):
        root = root or self.root
        if len(path) == 0:
            return
        current, path = split_path(path)
        if current == "$":
            return self.set_node(path, item, root, current_path)
        if isinstance(current, int):
            if not isinstance(root, list):
                raise Exception(f"Node {current_path} is not a list")
            while len(root) <= current:
                root.append(None)
            if root[current] == None:
                root[current] = ([] if is_number(path[0]) else dict())
        elif isinstance(current, str):
            if not isinstance(root, dict):
                raise Exception(f"Node {current_path} is not a dict")
            if current not in root and len(path) > 0:
                root[current] = ([] if is_number(path[0]) else dict())
        if len(path) == 0:
            root[current] = item
            self.save()
            return
        return self.set_node(path, item, root[current], '/'.join([current_path, str(current)])) 
        
    def node(self, path:list[str], root:Node = None, item:Node = None, current_path:str = '$'):
        if root == None:
            root = self.root
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
            elif item is not None:
                if len(path) == 0:
                    if len(root) <= current:
                        root.append(item)
                    else:
                        root[current] = item
                else:
                    return self.node(path, root[current], item, '/'.join([current_path, str(current)]))
            elif len(root) < current:
                raise Exception(f"Index {current} not in node {current_path}")
            else:
                return self.node(path, root[current], item, '/'.join([current_path, str(current)]))
        else:
            if not isinstance(root, dict):
                raise Exception(f"Node {current_path} is not a dictionary")
            elif item is not None:
                if len(path) == 0:
                    root[current] = item
                    print(f"set in {current_path}")
                else:
                    return self.node(path, root[current], item, '/'.join([current_path, str(current)]))
            elif not current in root:
                raise Exception(f"Index {current} not in node {current_path}")
            else:
                return self.node(path, root[current], item, '/'.join([current_path, str(current)]))
        self.save()

    def remove_node(self, path:list[str], root:Node = None, current_path:str = '$'):
        if root == None:
            root = self.root        
        current:Union[str, int]
        current, *path = path
        if current == '$':
            return self.remove_node(path, root, '/'.join([current_path, str(current)]))
        if re.match('^[\d]+$', current):
            current = int(current)
        if len(path) == 0:
            del root[current]
            self.save()
            return
        if isinstance(current, int):
            if not isinstance(root, list):
                raise Exception(f"Node {current_path} is not a list")
            elif len(root) < current:
                raise Exception(f"Index {current} not in node {current_path}")
            else:
                self.remove_node(path, root[current], '/'.join([current_path, str(current)]))
                return
        else:
            if not isinstance(root, dict):
                raise Exception(f"Node {current_path} is not a dictionary")
            elif not current in root:
                raise Exception(f"Index {current} not in node {current_path}")
            else:
                self.remove_node(path, root[current], '/'.join([current_path, str(current)]))
                return


def get_forests(root:str):
    return [i for i in os.listdir(root) if os.path.isdir(os.sep.join([root, i]))]

def get_trees(root:str, forest:str):
    return [i[:-5] for i in os.listdir(os.sep.join([root, forest])) if i.endswith(".json")]
