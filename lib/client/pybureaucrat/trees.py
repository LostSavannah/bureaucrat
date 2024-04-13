from typing import TypeVar, Any
from .base import BaseHttpService, ServiceError

class TreeService(BaseHttpService):
    def __init__(self, baseUrl: str) -> None:
        super().__init__(baseUrl)

    def get_forests(self) -> list[str]:
        return self.get("trees/")

    def get_trees(self, forest:str) -> list[str]:
        return self.get(f"trees/{forest}")

    def index(self, forest:str, tree:str, path:str = "$"):
        return self.get(f"trees/{forest}/{tree}/index:{path}")

    def get_value(self, forest:str, tree:str, path:str = "$"):
        return self.get(f"trees/{forest}/{tree}/{path}")

    def set_value(self, forest:str, tree:str, path:str, value):
        return self.post(f"trees/{forest}/{tree}/{path}", value)

    def remove_value(self, forest:str, tree:str, path:str):
        return self.delete(f"trees/{forest}/{tree}/{path}")