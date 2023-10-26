from asyncio import Lock
from uuid import uuid4
import os

MANIFEST_FILE_NAME = "__manifest__.txt"
DATA_FOLDER = "data"

class Storage:
    def __init__(self, base_path:str) -> None:
        self.lock = Lock()
        self.base_path = base_path
        if not os.path.exists(self.base_path):
            raise Exception(f"Base path '{base_path}' not exists")
        
        self.data_path = os.sep.join([self.base_path, DATA_FOLDER])
        if not os.path.exists(self.data_path):
            os.mkdir(self.data_path)
        elif not os.path.isdir(self.data_path):
            raise Exception(f"'{self.data_path}' is not a folder")

        self.manifest = os.sep.join([self.base_path, MANIFEST_FILE_NAME])
        if not os.path.exists(self.manifest):
            with open(self.manifest, 'w') as fo:
                fo.write('')
        elif not os.path.isfile(self.manifest):
            raise Exception(f"'{self.manifest}' is not a file")

    async def get_file_path(self, path:str, error_on_not_found:bool = False, remove:bool = False):
        result:str = None
        added:bool = False
        async with self.lock:
            files:dict[str, str] = dict()
            with open(self.manifest, 'r') as fi:
                files = {a[0]:a[1] for a in [i.strip().split("=") for i in fi.readlines()]}
            if not path in files:
                if error_on_not_found:
                    raise Exception(f"File '{path}' not found")
                added = True
                files[path] = os.sep.join([self.data_path, f'{str(uuid4())}'])
            result = files[path]
            if remove or added:
                if remove:
                    del files[path]
                with open(self.manifest, 'w') as fo:
                    fo.writelines([f"{i}={files[i]}\n" for i in files])
            return result

    async def get_files(self) -> dict[str, str]:
        async with self.lock:
            with open(self.manifest, 'r') as fi:
                return {a[0]:a[1] for a in [i.strip().split("=") for i in fi.readlines()]}

    async def write_file(self, path:str, content:bytes):
        file_name:str = await self.get_file_path(path)
        with open(file_name, 'wb') as fo:
            fo.write(content)

    async def read_file(self, path:str) -> bytes:
        file_name:str = await self.get_file_path(path, True)
        with open(file_name, 'rb') as fi:
            return fi.read()
        
    async def delete_file(self, path:str):
        file_name:str = await self.get_file_path(path, True, True)
        os.unlink(file_name)

def index(path:list[str], directories:list[list[str]], previows:list[str] = None):
    print(path)
    previows = previows or []
    if len(path) == 0:
        return {
            "status": 200,
            "path": previows,
            "files": [i[0] for i in directories if len(i) == 1],
            "folders": list(set([i[0] for i in directories if len(i) > 1])),
        }
    current, *path = path
    previows.append(current)
    directories = [d[1:] for d in directories if len(d) > 0 and d[0] == current]
    if len(directories) == 0:
        return {
            "status": 404,
            "path": previows,
            "files": [],
            "folders": []
        }
    return index(path, directories, previows)