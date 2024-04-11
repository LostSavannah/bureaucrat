import sqlite3
from .common import Parser, Render
from .renders import jinja_json_render, mako_json_render, raw_content, raw_template
from .parsers import create_raw_parser, create_xhtml2pdf_parser, create_docx_parser

class Template:
    def __init__(self, database:str) -> None:
        self.database = database

        self.renders:dict[str,Render] = {
            "content": raw_content,
            "template": raw_template,
            "jinja2": jinja_json_render,
            "mako": mako_json_render
        }

        self.parsers:dict[str,Parser] = {
            "text": create_raw_parser(),
            "html": create_raw_parser("text/html"),
            "docx - htmldocx": create_docx_parser(),
            "pdf - xhtml2pdf": create_xhtml2pdf_parser()
        }


    def get_templates(self) -> list[tuple[str, str]]:
        with sqlite3.Connection(self.database) as db:
            c = db.execute("SELECT id FROM Templates;")
            return [r[0] for r in c.fetchall()]
        
    def get_template(self, id:str) -> str:
        with sqlite3.Connection(self.database) as db:
            c = db.execute(
                "SELECT templateBody FROM Templates WHERE id = ?;", 
                tuple([id])
                )
            return c.fetchone()[0]

    def set_template(self, id:str, content:str):
        with sqlite3.Connection(self.database) as db:
            db.execute("DELETE FROM Templates WHERE id = ?;", tuple([id]))
            db.execute("INSERT INTO Templates VALUES (?, ?);", tuple([id, content]))
            db.commit()

    def delete_template(self, id:str):
        with sqlite3.Connection(self.database) as db:
            db.execute("DELETE FROM Templates WHERE id = ?;", tuple([id]))
            db.commit()

    def get_renders(self):
        return [i for i in self.renders]
    
    def get_parsers(self):
        return [i for i in self.parsers]

    def render(self, template:str, render_name:str, data:str, parsers_names:list[str] = None):
        template_content = self.get_template(template)
        render = self.renders[render_name]
        parsers = [self.parsers[p] for p in (parsers_names or [])]
        
        content_type = "text/plain"
        rendered_data = render(data, template_content)
        bytes_data = rendered_data.encode()
        for parser in parsers:
            content_type, bytes_data = parser(bytes_data)
        return content_type, bytes_data
