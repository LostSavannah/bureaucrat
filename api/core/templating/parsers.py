from xhtml2pdf import pisa
from docx import Document
from htmldocx import HtmlToDocx
from io import BytesIO

def create_raw_parser(content_type:str = 'text/plain'):
    def parser(content:bytes) -> tuple[str, bytes]:
        return content_type, content
    return parser

def create_xhtml2pdf_parser(encoding:str = "utf-8"):
    def xhtml2pdf_parser(content:bytes) -> tuple[str, bytes]:
        with BytesIO() as b:
            pisa.CreatePDF(content.decode(encoding), dest=b)
            return 'application/pdf', b.getvalue()
    return xhtml2pdf_parser
    
html_content_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
def create_docx_parser(encoding:str = "utf-8"):
    def htmldocx_parser(content:bytes) -> tuple[str, bytes]:
        document = Document()
        parser = HtmlToDocx()
        parser.add_html_to_document(content.decode(encoding), document)
        b = BytesIO()
        document.save(b)
        return html_content_type, b.getvalue()
    return htmldocx_parser