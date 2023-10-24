# Bureaucrat

A lightweight experimental credential-less service with queues, tables and blobs (trees and dictionaries being reserved for the near future) built on top of [FastApi](https://fastapi.tiangolo.com/).

## Queues

Bureacrat uses a very straightfoward in-memory queue paradigm. Any queue gets created when needed (when any queue or dequeue operation is requested in a queue). Futhermore every queue can be deleted on demand.

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/queues/|Get all queues|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/queues/{name}|Dequeues from the {name} queue|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/queues/{name}|Enqueues in the {name} queue|
|![DELETE](https://img.shields.io/badge/-DELETE-red.svg)|/queues/{name}|Deletes the {name} queue|

## Blobs

The blob service consists in a simple plain storage. The name given to any blob is purely logic. The root path for every blob is set by the **BUREAUCRAT_BLOBS_ROOT** environment variable, which should point to an existing writable folder.

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/blobs/{full_path}|Reads a file in the logic {full_path} location|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/blobs/{full_path}|Writes a file in the logic {full_path} location|
|![DELETE](https://img.shields.io/badge/-DELETE-red.svg)|/blobs/{full_path}|Deletes the file in the logic {full_path} location|

>> File content is sent and received in base64.

## Tables

This service is just a backend for sqlite3 databases. The root path for every database is set by the **BUREAUCRAT_TABLES_DATABASE** environment variable, which should point to an existing writable folder.

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/|List every table|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/tables/|Executes the query sent in the body and returns the result|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/{table}|Retrieves every record in the {table} table|

>> Results are delivered in json format. In every table operation the target database is set to main by default, but it can be customized using the query parameter _**database**_. Futhermore, when using the _**get table rows**_ endpoint, the pagination is controlled by the query parameters _**page_number**_ and _**page_size**_, which are set to 0 and 10 respectively.