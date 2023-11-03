<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Bureaucrat</title>
    <link 
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
      crossorigin="anonymous">
    <script 
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
      crossorigin="anonymous"></script>
</head>
<body class="bg-dark text-light vh-100">
    <header class="bg-primary p-4">
        <h3>Bureaucrat</h3>
        <h6>simple queues, blobs, tables and trees</h6>
    </header>
    <div class="container p-2">
       <div class="row">
        <div class="col-12">
            <div class="d-flex flex-row justify-content-center align-items-center p-4">
                <div class="d-flex flex-column align-items-center">
                    <div class="p-2">
                        Bureaucrat is a credential-less service with queues, blobs, tables and trees.
                    </div>
                    <div class="p-2">
                        <a 
                            href="https://hub.docker.com/r/coderookieerick/bureaucrat" 
                            class="m-2 btn btn-primary"> <br/>
                            <h4>View in dockerhub</h4>
                        </a> 
                        <a 
                            href="https://github.com/LostSavannah/bureaucrat" 
                            class="m-2 btn btn-primary"> <br/>
                            <h4>View in github</h4>
                        </a> 
                        
                    </div>
                </div>
            </div>
        </div>
       </div> 
    </div>
    <div class="container p-2">
        <div class="row">
            <div class="col-12">
                <div class="d-flex flex-row justify-content-center align-items-center p-4">
                    <div class="d-flex flex-column align-items-center">
                        
                        <div class="p-2"> A lightweight experimental credential-less service with queues, tables, blobs and trees built on top of <a href="https://fastapi.tiangolo.com/">FastApi</a> </div>
                        
                    </div>
                </div>
            </div>
       </div> 
    </div>
    <div class="container p-2">
        <div class="row">
            <div class="col-12">
                <div class="p-2">
                    <h2>Queues</h2>
                </div>
                <div class="p-2">
                    Bureacrat uses a very straightfoward in-memory queue paradigm. Any queue gets created when needed (when any queue or dequeue operation is requested in a queue). Futhermore every queue can be deleted on demand.
                </div>
                
                <div class="p-2" id="queuesTable">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Method</th>
                                <th scope="col">Path</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/queues/</td>
                                <td>Lists every queue</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/queues/{name}</td>
                                <td>Dequeues from the {name} queue</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-POST-green.svg"/></td>
                                <td>/queues/{name}</td>
                                <td>Enqueues in the {name} queue</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-DELETE-red.svg"/></td>
                                <td>/queues/{name}</td>
                                <td>Deletes the {name} queue</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div class="p-2">
                    <h2>Blobs</h2>
                </div>
                <div class="p-2">
                    The blob service consists in a simple plain storage. The name given to any blob is purely logic. The physical location for every blob is set by the <strong>BUREAUCRAT_BLOBS_ROOT</strong> environment variable, which should point to an existing writable folder.
                </div>
                
                <div class="p-2" id="queuesTable">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Method</th>
                                <th scope="col">Path</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/blobs/{full_path}</td>
                                <td>Get the index of the logic {full_path} location</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/blobs/download:{full_path}</td>
                                <td>Downloads the blob in the logic {full_path} location</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/blobs/raw:{full_path}</td>
                                <td>Gets the content of the blob in the logic {full_path} location as a base64 string</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-POST-green.svg"/></td>
                                <td>/blobs/{full_path}</td>
                                <td>Writes a file in the logic {full_path} location</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-DELETE-red.svg"/></td>
                                <td>/blobs/{full_path}</td>
                                <td>Deletes the file in the logic {full_path} location</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div class="p-2">
                    <h2>Tables</h2>
                </div>
                <div class="p-2">
                    This service is just a backend for sqlite3 databases. The root path for every database is set by the <strong>BUREAUCRAT_TABLES_DATABASE</strong> environment variable, which should point to an existing writable folder.
                </div>
                
                <div class="p-2" id="queuesTable">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Method</th>
                                <th scope="col">Path</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/tables/</td>
                                <td>List every database</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/tables/{database}</td>
                                <td>List every table in the {database}</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-POST-green.svg"/></td>
                                <td>/tables/{database}</td>
                                <td>Executes in the {database} the query sent in the body and returns the result</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/tables/{database}/{table}</td>
                                <td>Retrieves every record in the {table} in the {database}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div class="p-2">
                    <h2>Trees</h2>
                </div>
                <div class="p-2">
                    The trees service is just a bunch of folders with some json files. Folders are called <strong>forests</strong> and json files are called <strong>trees</strong>. You can freely navigate and update any tree inside any forest. The physical location for the root of every forest is set in the <strong>BUREAUCRAT_TREES_ROOT</strong> environment variable, which should point to an existing writable folder.
                </div>
                
                <div class="p-2" id="queuesTable">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Method</th>
                                <th scope="col">Path</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/trees/</td>
                                <td>List every available forest</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/trees/{forest}</td>
                                <td>Lists every available tree in the {forest}</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/trees/{forest}/{tree}/index:{path}</td>
                                <td>Gets the index for the node located in the {path} inside the {tree} belonging to the specified {forest}</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-GET-blue.svg"/></td>
                                <td>/trees/{forest}/{tree}/{path}</td>
                                <td>Gets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}</td>
                            </tr>
                            <tr>
                                <td><img src="https://img.shields.io/badge/-POST-green.svg"/></td>
                                <td>/trees/{forest}/{tree}/{path}</td>
                                <td>Sets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                
            </div>
       </div> 
    </div>
    <footer>

    </footer>
</body>
</html>