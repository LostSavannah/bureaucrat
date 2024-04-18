import random
from .client.pybureaucrat.tables import TablesService
import pytest

baseUrl = "http://localhost:19970"

service:TablesService = TablesService(baseUrl)

def random_string(size:int = 100):
    data = ''
    for i in range(size):
        data += chr(random.randint(ord('a'), ord('z')))
    return data

@pytest.mark.asyncio
async def test_get_databases_returns_list_of_strings():
    assert isinstance(await service.get_databases(), list), 'Databases is not a list of string'

@pytest.mark.asyncio  
async def test_get_tables_of_any_database_returns_list_of_strings():
    for i in range(100):
        assert isinstance(await service.get_tables(random_string()), list), 'Tables is not a list of string'

@pytest.mark.asyncio
async def test_get_tables_of_any_database_updates_after_table_is_created():
    database_name:str = 'main'
    for i in range(100):
        table_name:str = f'table_{random_string(20)}'
        if table_name not in await service.get_tables(database_name):
            columns_count = random.randint(1, 5)
            columns = {random_string(100):'varchar(128)' for i in range(columns_count)}
            assert await service.create_table(database_name, table_name, **columns)
        await service.drop_table(database_name, table_name)
        assert table_name not in await service.get_tables(database_name)

@pytest.mark.asyncio
async def test_create_non_existing_table_returns_true():
    database_name:str = 'main'
    for i in range(100):
        table_name:str = f'table_{random_string(10)}'
        if table_name in await service.get_tables(database_name):
            continue
        columns_count = random.randint(1, 5)
        columns = {random_string(100):'varchar(128)' for i in range(columns_count)}
        assert await service.create_table(database_name, table_name, **columns)
        assert await service.drop_table(database_name, table_name)

@pytest.mark.asyncio
async def test_create_existing_table_returns_false():
    database_name:str = 'main'
    for i in range(100):
        table_name:str = f'table_{random_string(10)}'
        if table_name in await service.get_tables(database_name):
            continue
        columns_count = random.randint(1, 5)
        columns = {random_string(100):'varchar(128)' for i in range(columns_count)}
        await service.create_table(database_name, table_name, **columns)
        assert not await service.create_table(database_name, table_name, **columns)
        assert await service.drop_table(database_name, table_name)

@pytest.mark.asyncio
async def test_insert_valid_register_returns_true():
    database_name:str = 'main'
    for i in range(100):
        table_name:str = f'table_{random_string(10)}'
        if table_name in await service.get_tables(database_name):
            continue
        is_number_table:bool = random.random() > 0.5
        columns_count = random.randint(1, 5)
        columns = {
            random_string(100):('varchar(128)' if not is_number_table else 'int') 
            for i in range(columns_count)
        }
        await service.create_table(database_name, table_name, **columns)
        register = {
            i:(random_string(10) if not is_number_table else random.randint(1, 100)) 
            for i in columns
            }
        assert await service.insert(database_name, table_name, **register)
        await service.drop_table(database_name, table_name)

@pytest.mark.asyncio
async def test_insert_many_register_returns_all_true():
    database_name:str = 'main'
    for i in range(10):
        table_name:str = f'table_{random_string(10)}'
        if table_name in await service.get_tables(database_name):
            continue
        is_number_table:bool = random.random() > 0.5
        columns_count = random.randint(1, 5)
        columns = {
            random_string(10):('varchar(128)' if not is_number_table else 'int') 
            for i in range(columns_count)
        }
        await service.create_table(database_name, table_name, **columns)
        registers = [{
            c:(random_string(10) if not is_number_table else random.randint(1, 100)) 
            for c in columns
            } for j in range(10)]
        assert all(await service.insert_many(database_name, table_name, registers))
        await service.drop_table(database_name, table_name)

@pytest.mark.asyncio
async def test_get_rows_returns_values():
    database_name:str = 'main'
    for i in range(10):
        table_name:str = f'table_{random_string(10)}'
        if table_name in await service.get_tables(database_name):
            continue
        is_number_table:bool = random.random() > 0.5
        columns_count = random.randint(1, 5)
        columns = {
            random_string(10):('varchar(128)' if not is_number_table else 'int') 
            for i in range(columns_count)
        }
        await service.create_table(database_name, table_name, **columns)
        items = random.randint(50, 100)
        page_size = random.randint(5, 50)
        registers = [{
            c:(random_string(10) if not is_number_table else random.randint(1, 100)) 
            for c in columns
            } for j in range(items)]
        await service.insert_many(database_name, table_name, registers)
        for page in range((items//page_size) + 1):
            expected_size = min(page_size, items - (page*page_size))
            result = await service.get_rows(database_name, table_name, page, page_size)
            assert len(result) == expected_size
        await service.drop_table(database_name, table_name)