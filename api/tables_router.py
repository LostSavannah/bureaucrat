from fastapi import APIRouter, Request
from core.sqlite_tables import SqliteTables
import os

TABLES_ROOT = os.environ.get("BUREAUCRAT_TABLES_DATABASE")

tables = SqliteTables(TABLES_ROOT)

router = APIRouter()

@router.get("/")
async def get_databases():
    return {
        "result": tables.get_databases()
    }

@router.get("/{database}")
async def get_tables(database:str = 'main'):
    result = [t["name"] for t in tables.list_tables(database)]
    return {
        "result": result
    }

@router.get("/{database}/{table}")
async def get_table_rows(table:str, database:str = 'main', page_number:int = 0, page_size:int = 10):
    query: str = f"SELECT * FROM {table} LIMIT {page_size} OFFSET {page_number*page_size};"
    result = tables.execute_query(query, database)
    return {
        "result": result
    }

@router.post("/{database}")
async def execute_query(request:Request, database:str = 'main'):
    query:str = (await request.body()).decode()
    result = tables.execute_query(query, database)
    return {
        "result": result
    }