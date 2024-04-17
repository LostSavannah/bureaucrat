import random
import uuid
from .client.pybureaucrat.trees import TreeService

baseUrl = "http://localhost:19970"

service:TreeService = TreeService(baseUrl)

def random_string(size:int = 100):
    data = ''
    for i in range(size):
        data += chr(random.randint(ord('a'), ord('z')))
    return data

async def test_get_forests_returns_list_of_strings():
    assert isinstance(await service.get_forests(), list), 'Forests is not a list of string'
    
async def test_get_tables_of_any_forest_returns_list_of_strings():
    forest = "default"
    for i in range(10):
        await service.set_value(forest, f'forest_{i}', "$/test", str(uuid.uuid4()))
        assert isinstance(await service.get_trees(forest), list), 'Tables is not a list of string'

async def test_value_setted_retrieved_and_deleted_sucessfully():
    forest = "default"
    for i in range(10):
        result = await service.set_value(forest, tree:=f'forest_{i}', path:="$/test", data:=str(uuid.uuid4()))
        assert result == path, 'Set value does not returns path'
        assert await service.get_value(forest, tree, path) == data, 'Value retrieved does not matches previowsly set'
        assert await service.remove_value(forest, tree, path) == "Ok", 'Value not removed sucessfully'
