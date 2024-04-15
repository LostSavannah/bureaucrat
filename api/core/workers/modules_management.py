import os
import importlib
import re
from types import ModuleType
import sys


def walk(folder:str, ignore:list[str] = None, path:list[str] = None):
    ignore = ignore or []
    path = path or []
    dirs = os.listdir(os.sep.join([folder, *path]))
    for r in ignore:
        dirs = [i for i in dirs if not re.match(r, i)]
    for d in dirs:
        fullpath = os.sep.join([folder, *path, d])
        if os.path.isfile(fullpath):
            yield os.sep.join([*path, d])
        else:
            for sd in walk(folder, ignore, [*path, d]):
                yield sd

class ModulesManager:
    def __init__(self, folder:str, module:str) -> None:
        self.module = module
        self.folder = folder
        self.modules:dict[str, ModuleType] = dict()
        self.initialize_folder_module()

    def get_module_location(self):
        return os.sep.join([self.folder, self.module])

    def initialize_folder_module(self):
        if self.folder not in sys.path:
            sys.path.append(self.folder)
        module_folder = self.get_module_location()
        if not os.path.exists(module_folder):
            os.makedirs(module_folder, exist_ok=True)
        module_init = os.sep.join([module_folder, "__init__.py"])
        if not os.path.exists(module_init):
            with open(module_init, 'w') as init:
                init.write("#CREATED AUTOMATICALLY")

    def on_module_reloaded(self, module_name:str, module:ModuleType):
        pass

    def reload_module(self, module_name):
        if module_name in self.modules:
            self.modules[module_name] = importlib.reload(self.modules[module_name])
        else:
            self.modules[module_name] = importlib.import_module(module_name)
        self.on_module_reloaded(module_name, self.modules[module_name])

    def reload_modules(self):
        for module_path in self.get_modules_files():
            self.reload_module(self.to_module_name(module_path))

    def get_modules_files(self):
        return walk(self.get_module_location(), ["__init__.py", "__pycache__"])

    def create_module(self, module_name:str, content:str):
        file_name = module_name.replace(".", os.sep) + ".py"
        full_path = os.sep.join([self.get_module_location(), file_name])
        with open(full_path, 'w') as fo:
            fo.write(content)
        #self.reload_module(self.to_module_name(file_name))

    def to_module_name(self, path:str):
        if not path.endswith(".py"):
            raise Exception("Invalid Module")
        return f'{self.module}.{path.replace(os.sep, ".")[:-3]}' 
