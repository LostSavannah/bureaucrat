from fastapi import APIRouter, Request

from core.sqlite_tables import SqliteTables

TABLES_ROOT = "D:\\projects\\projects\\bureaucrat\\sandbox\\databases\\main.db"

tables = SqliteTables(TABLES_ROOT)

router = APIRouter()

@router.get("/")
async def get_tables():
    return [t["name"] for t in tables.list_tables()]

@router.get("/{table}")
async def get_table_rows(table:str, page_number:int = 0, page_size:int = 10):
    query: str = f"SELECT * FROM {table} LIMIT {page_size} OFFSET {page_number*page_size};"
    return tables.execute_query(query)

@router.post("/")
async def execute_query(request:Request):
    query:str = (await request.body()).decode()
    return tables.execute_query(query)