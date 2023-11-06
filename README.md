
[![Bureaucrat](https://github.com/LostSavannah/bureaucrat/actions/workflows/build.yml/badge.svg?branch=publish)](https://github.com/LostSavannah/bureaucrat/actions/workflows/)

[![Bureaucrat](https://github.com/LostSavannah/bureaucrat/actions/workflows/nocturne_build.yml/badge.svg?branch=main)](https://github.com/LostSavannah/bureaucrat/actions/workflows/)

[![Bureaucrat](https://github.com/LostSavannah/bureaucrat/actions/workflows/site.yml/badge.svg?branch=site)](https://github.com/LostSavannah/bureaucrat/actions/workflows/)

# [Bureaucrat](https://github.com/LostSavannah/bureaucrat)
simple queues, blobs, tables and trees
## Admin site
In the hosting machine you can access the admin site in this location: [http://localhost:19760/](http://localhost:19760/)

## Queues
Bureacrat uses a very straightfoward in-memory queue paradigm. Any queue gets created when needed (when any queue or dequeue operation is requested in a queue). Futhermore every queue can be deleted on demand. 

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/queues/|Lists every queue|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/queues/{name}|Dequeues from the {name} queue|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/queues/{name}|Enqueues in the {name} queue|
|![DELETE](https://img.shields.io/badge/-DELETE-red.svg)|/queues/{name}|Deletes the {name} queue|

## Blobs
The blob service consists in a simple plain storage. The name given to any blob is purely logic. The physical location for every blob is set by the <strong>BUREAUCRAT_BLOBS_ROOT</strong> environment variable, which should point to an existing writable folder. 

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/blobs/{full_path}|Get the index of the logic {full_path} location|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/blobs/download:{full_path}|Downloads the blob in the logic {full_path} location|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/blobs/raw:{full_path}|Gets the content of the blob in the logic {full_path} location as a base64 string|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/blobs/{full_path}|Writes a file in the logic {full_path} location|
|![DELETE](https://img.shields.io/badge/-DELETE-red.svg)|/blobs/{full_path}|Deletes the file in the logic {full_path} location|

## Tables
This service is just a backend for sqlite3 databases. The root path for every database is set by the <strong>BUREAUCRAT_TABLES_DATABASE</strong> environment variable, which should point to an existing writable folder. 

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/|List every database|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/{database}|List every table in the {database}|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/tables/{database}|Executes in the {database} the query sent in the body and returns the result|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/tables/{database}/{table}|Retrieves every record in the {table} in the {database}|

## Trees
The trees service is just a bunch of folders with some json files. Folders are called <strong>forests</strong> and json files are called <strong>trees</strong>. You can freely navigate and update any tree inside any forest. The physical location for the root of every forest is set in the <strong>BUREAUCRAT_TREES_ROOT</strong> environment variable, which should point to an existing writable folder. 

|method|path|name|
|---|---|---|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/|List every available forest|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/{forest}|Lists every available tree in the {forest}|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/{forest}/{tree}/index:{path}|Gets the index for the node located in the {path} inside the {tree} belonging to the specified {forest}|
|![GET](https://img.shields.io/badge/-GET-blue.svg)|/trees/{forest}/{tree}/{path}|Gets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}|
|![POST](https://img.shields.io/badge/-POST-green.svg)|/trees/{forest}/{tree}/{path}|Sets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}|

