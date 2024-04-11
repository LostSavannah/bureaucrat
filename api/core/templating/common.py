from typing import Callable

Parser = Callable[[bytes,], tuple[str, bytes]]
Render = Callable[[str, str], str]