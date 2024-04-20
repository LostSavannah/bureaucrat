import time
from threading import Thread
from typing import Callable
import os

def create_hasher(root:str) -> Callable[[str,], str]:
    def get_modify_date(file:str):
        return str(os.stat(os.sep.join([root, file])).st_mtime)
    return get_modify_date

def create_path_observer(
        intervalSeconds: float, 
        files_retriever: Callable[[], list[str]],
        hasher: Callable[[str,],str],
        on_update: Callable[[str,],None],
        on_delete: Callable[[str,],None]) -> Callable:
    can_run = True
    files:dict[str, float] = dict()
    
    def main_event_loop():
        nonlocal can_run
        while can_run:
            old_file_names = set([i for i in files])
            current_file_names = set(files_retriever())
            for file_name in (current_file_names & old_file_names):
                if (new_hash:=hasher(file_name)) != files[file_name]:
                    on_update(file_name)
                    files[file_name] = new_hash
            for deleted_file in (old_file_names - current_file_names):
                on_delete(deleted_file)
                del files[deleted_file]   
            for new_file in (current_file_names - old_file_names):
                on_update(new_file)
                files[new_file] = hasher(new_file) 
            time.sleep(intervalSeconds)

    thread = Thread(target=main_event_loop)

    def stop():
        nonlocal can_run
        can_run = False
        thread.join()
    
    thread.start()
    return stop