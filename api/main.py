import asyncio
from core.common import Storage

async def main():
    filename:str = "/folder/folder2/manchurria"
    s = Storage("D:\\projects\\projects\\bureaucrat\\sandbox\\files")
    await s.write_file(filename, "contenido".encode())
    await s.write_file(filename+'mm', "contenido".encode())
    await s.write_file(filename+'m2m', "contenido".encode())
    print(await s.read_file(filename))
    await s.delete_file(filename)

asyncio.run(main())