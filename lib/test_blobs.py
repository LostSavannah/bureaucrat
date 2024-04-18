import uuid
import random
from typing import Iterator
from .client.pybureaucrat.blobs import BlobsService, BlobsIndex
import pytest

baseUrl = "http://localhost:19970"

service:BlobsService = BlobsService(baseUrl)

def walk(dirs:list[str], root:list[str] = None) -> Iterator[BlobsIndex]:
    paths = [i.split('/') for i in dirs]
    root = root or []
    path = [*root]
    files = [i[0] for i in paths if len(i) == 1]
    folders = [*set([i[0] for i in paths if len(i) > 1])]
    yield BlobsIndex(200, path, files, folders)
    for folder in set([i[0] for i in paths if len(i) > 1]):
        folder_dirs = ['/'.join(i[1:]) for i in paths if len(i) > 1 and i[0] == folder]
        for result in walk(folder_dirs, [*root, folder]):
            yield result

def get_random_text(size):
    data = ''
    for i in range(size):
        data += chr(random.randint(ord('a'), ord('z')))
    return data

@pytest.mark.asyncio
async def test_upload_file_content():
    folders = ['root1', 'root2', 'root3']
    branches = ['branch1', 'branch2', 'branch3']
    files = dict()
    for i in range(50):
        path:str = '/'.join([random.choice(folders), random.choice(branches), str(uuid.uuid4())])
        content = get_random_text(1000)
        files[path] = content
        await service.write(path, content)
    for filepath in files:
        assert await service.read(filepath) == files[filepath]
        files[filepath] = get_random_text(10000)
        await service.write(filepath, files[filepath])
        assert await service.read(filepath) == files[filepath]
        assert await service.delete_blob(filepath) == True
        assert await service.read(filepath) is None

@pytest.mark.asyncio
async def test_indexing():
    folders = [f'folder_{uuid.uuid4()}' for i in range(5)]
    folder_quantity = random.randint(50, 100)
    folder_lengths = [random.randint(1, 5) for i in range(folder_quantity)]
    files = [
        '/'.join([*[random.choice(folders) for j in range(s)], str(uuid.uuid4())]) 
        for s in folder_lengths
    ]
    base_folder = f'{uuid.uuid4()}'
    content:str = get_random_text(1000)
    for file in files:
        await service.write('/'.join([base_folder, file]), content)
    for index in walk(files, [base_folder]):
        path:str = '/'.join(index.path or ['.'])
        tindex:BlobsIndex = await service.index(path)
        assert len([i for i in index.files if i not in tindex.files]) == 0
        assert len([i for i in tindex.files if i not in index.files]) == 0
        assert len([i for i in index.folders if i not in tindex.folders]) == 0
        assert len([i for i in tindex.folders if i not in index.folders]) == 0
    for file in files:
        await service.delete_blob(file)