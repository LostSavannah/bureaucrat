from fastapi import APIRouter, Request
from core.sqlite_tables import SqliteTables
import os

TABLES_ROOT = os.environ.get("BUREAUCRAT_TABLES_DATABASE")

tables = SqliteTables(TABLES_ROOT)

router = APIRouter()

@router.get("/")
async def get_tables(database:str = 'main'):
    return [t["name"] for t in tables.list_tables(database)]

@router.get("/{table}")
async def get_table_rows(table:str, database:str = 'main', page_number:int = 0, page_size:int = 10):
    query: str = f"SELECT * FROM {table} LIMIT {page_size} OFFSET {page_number*page_size};"
    return tables.execute_query(query, database)

@router.post("/")
async def execute_query(request:Request, database:str = 'main'):
    query:str = (await request.body()).decode()
    return tables.execute_query(query, database)