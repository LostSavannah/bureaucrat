from boxedfactory.core.worker_manager import WorkerManager
from .modules_management import ModulesManager, ModuleType, walk
from .observer import create_path_observer, create_hasher
import inspect

class HotSwapManager(ModulesManager, WorkerManager):
    def __init__(self, folder:str, module:str) -> None:
        ModulesManager.__init__(self, folder, module)
        WorkerManager.__init__(self, dict())
        self.stop_observer = create_path_observer(
            1, 
            lambda: list(self.get_modules_files()),
            create_hasher(self.get_module_location()),
            lambda x: self.reload_module(self.to_module_name(x)),
            lambda x: print(f'Module: {x} is a zombie now...')
        )

    def __del__(self):
        self.stop_observer()

    def on_module_reloaded(self, module_name: str, module: ModuleType):
        classes = [cls 
                   for i, cls 
                   in inspect.getmembers(module, inspect.isclass)
                   if cls.__module__ == module.__name__
                   ]
        for cls in classes:
            name:str = f'{module_name}.{cls.__name__}'
            self.factory[name] = cls
            if name not in self.pool:
                self.pool[name] = dict()
        return super().on_module_reloaded(module_name, module)