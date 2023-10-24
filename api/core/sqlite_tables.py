import sqlite3
import os

class SqliteTables:
    def __init__(self, database_file_path:str) -> None:
        self.database_file_path = database_file_path

    def execute_query(self, text:str, database:str = 'main'):
        try:
            database_name = os.sep.join([self.database_file_path, f'{database}.db'])
            with sqlite3.Connection(database_name) as connection:
                cursor:sqlite3.Cursor = connection.execute(text)
                result = [i for i in self.get_dictionary(cursor)]
                cursor.close()
                print(result)
                return result
        except Exception as e:
            print(e)

    def list_tables(self, database:str = 'main'):
        return self.execute_query("SELECT * FROM sqlite_master where type = 'table';", database)

    def get_dictionary(self, cursor:sqlite3.Cursor):
        if cursor.description:
            columns:list[str] = [i[0] for i in cursor.description]
            for row in cursor.fetchall():
                result = dict()
                for index in range(len(row)):
                    result[columns[index]] = row[index]
                yield result