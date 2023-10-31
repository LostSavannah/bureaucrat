# Bureaucrat

A lightweight experimental credential-less service with queues, tables, blobs and trees (dictionaries being reserved for the near future) built on top of [FastApi](https://fastapi.tiangolo.com/).

## Admin site

In the hosting machine you can access the admin site in this location: [http://localhost:19760/](http://localhost:19760/)

## Queues

Bureacrat uses a very straightfoward in-memory queue paradigm. Any queue gets created when needed (when any queue or dequeue operation is requested in a queue). Futhermore every queue can be deleted on demand.

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/queues/|Get all queues|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/queues/{name}|Dequeues from the {name} queue|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/queues/{name}|Enqueues in the {name} queue|
|![DELETE](https://img.shields.io/badge/-DELETE-red.svg)|/queues/{name}|Deletes the {name} queue|

## Blobs

The blob service consists in a simple plain storage. The name given to any blob is purely logic. The physical location for every blob is set by the **BUREAUCRAT_BLOBS_ROOT** environment variable, which should point to an existing writable folder.

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/blobs/{full_path}|Get the index of the logic {full_path} location|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/blobs/download:{full_path}|Downloads the blob in the logic {full_path} location|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/blobs/raw:{full_path}|Gets the content of the blob in the logic {full_path} location as a base64 string|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/blobs/{full_path}|Writes a file in the logic {full_path} location|
|![DELETE](https://img.shields.io/badge/-DELETE-red.svg)|/blobs/{full_path}|Deletes the file in the logic {full_path} location|

> File content is sent in base64.

## Tables

This service is just a backend for sqlite3 databases. The root path for every database is set by the **BUREAUCRAT_TABLES_DATABASE** environment variable, which should point to an existing writable folder.

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/|List every database|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/{database}|List every table in the {database}|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/tables/{database}|Executes in the {database} the query sent in the body and returns the result|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/{database}/{table}|Retrieves every record in the {table} in the {database}|

> Results are delivered in json format. When using the _**get table rows**_ endpoint, the pagination is controlled by the query parameters _**page_number**_ and _**page_size**_, which by default are set to 0 and 10 respectively.

## Trees

The trees service is just a bunch of folders with some json files. Folders are called _**forests**_ and json files are called _**trees**_. You can freely navigate and update any tree inside any forest. The physical location for the root of every forest is set in the **BUREAUCRAT_TREES_ROOT** environment variable, which should point to an existing writable folder.

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/|Lists every available forest|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/{forest}|Lists every available tree in the {forest}|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/{forest}/{tree}/index:{path}|Gets the index for the node located in the {path} inside the {tree} belonging to the specified {forest}|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/{forest}/{tree}/{path}|Gets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/trees/{forest}/{tree}/{path}|Sets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}|