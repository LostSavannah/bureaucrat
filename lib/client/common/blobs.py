from typing import TypeVar, Any
from .base import BaseHttpService, ServiceError
from .deserializers import raw_deserializer
import base64

T = TypeVar("T")

class BlobsIndex:
    def __init__(self, source:dict[str,Any]) -> None:
        self.status:int = source["status"]
        self.path:list[str] = source["path"]
        self.files:list[str] = source["files"]
        self.folders:list[str] = source["folders"]

class BlobsService(BaseHttpService):
    def __init__(self, baseUrl: str) -> None:
        super().__init__(baseUrl)

    def index(self, path:str) -> BlobsIndex:
        return BlobsIndex(self.get(f"blobs/{path}")["index"])
    
    def read(self, path:str) -> str:
        b64content:str = self.get(f"blobs/raw:{path}", caster=raw_deserializer)
        return base64.b64decode(b64content).decode()
    
    def write(self, path:str, content:str) -> str:
        b64content =  base64.b64encode(content.encode()).decode()
        return self.post(f"blobs/{path}", b64content)

    def delete_blob(self, path:str) -> bool:
        try:
            self.delete(f"blobs/{path}")
            return True
        except ServiceError as e:
            return False