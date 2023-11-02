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
    <script>
        function node(tag, attributes, content){
            const e = document.createElement(tag);
            attributes = attributes ?? {};
            Object.keys(attributes).forEach(key => e.setAttribute(key, attributes[key]));
            if(content){
                content.forEach(child => {
                    if(typeof child === "string"){
                        e.appendChild(document.createTextNode(content));
                    }else{
                        e.appendChild(child);
                    }
                });
            }
            return e;
        }

        const methods = {
            "GET": "https://img.shields.io/badge/-GET-blue.svg",
            "POST": "https://img.shields.io/badge/-POST-green.svg",
            "DELETE": "https://img.shields.io/badge/-DELETE-red.svg"
        }

        function apiMethods(element, endpoints){
            document.querySelector(element).append(node(
                "table", 
                {"class": "table table-dark"}, 
                [
                    node(
                        "thead", 
                        {}, 
                        [
                            node(
                                "tr", 
                                {},
                                [
                                    node(
                                        "th", 
                                        {"scope": "col"},
                                        ["Method"]
                                    ),
                                    node(
                                        "th", 
                                        {"scope": "col"},
                                        ["Path"]
                                    ),
                                    node(
                                        "th", 
                                        {"scope": "col"},
                                        ["Description"]
                                    )
                                ]
                            )
                        ]
                    ),
                    node(
                        "tbody", 
                        {}, 
                        endpoints?.map(e => node(
                            "tr", {}, [
                                node("td", {}, [node("img", {"src": methods[e.method]})]),
                                node("td", {}, [e.path]),
                                node("td", {}, [e.description])
                            ]
                        ))??[]
                    )
                ]
            ));
        }
    </script>
</head>
<body class="bg-dark text-light vh-100">
    <header class="bg-primary p-4">
        <h3>Bureaucrat</h3>
        <h6>Credential-less queues, blobs, sqlite3 tables and trees</h6>
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
                            <h4>Download from github</h4>
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
                        <div class="p-2">
                        A lightweight experimental credential-less service with queues, tables, 
                        blobs and trees built on top of <a href="https://fastapi.tiangolo.com/">FastApi</a>
                        </div>
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
                Bureacrat uses a very straightfoward in-memory queue paradigm. 
                Any queue gets created when needed (when any queue or dequeue 
                operation is requested in a queue). Futhermore every queue can 
                be deleted on demand.
                </div>
                <div class="p-2" id="queuesTable"></div>
            </div>
       </div> 
    </div>
    
    <div class="container p-2">
        <div class="row">
            <div class="col-12">
                <div class="p-2">
                    <h2>Blobs</h2>
                </div>
                <div class="p-2">
                The blob service consists in a simple plain storage. 
                The name given to any blob is purely logic. The physical 
                location for every blob is set by the <strong>BUREAUCRAT_BLOBS_ROOT</strong> 
                environment variable, which should point to an existing writable folder.
                </div>
                <div class="p-2" id="blobsTable"></div>
            </div>
       </div> 
    </div>
    
    <div class="container p-2">
        <div class="row">
            <div class="col-12">
                <div class="p-2">
                    <h2>Tables</h2>
                </div>
                <div class="p-2">
                This service is just a backend for sqlite3 databases. 
                The root path for every database is set by the <strong>BUREAUCRAT_TABLES_DATABASE</strong> 
                environment variable, which should point to an existing writable folder.
                </div>
                <div class="p-2" id="tablesTable"></div>
            </div>
       </div> 
    </div>
    
    <div class="container p-2">
        <div class="row">
            <div class="col-12">
                <div class="p-2">
                    <h2>Trees</h2>
                </div>
                <div class="p-2">
                The trees service is just a bunch of folders with some json files. 
                Folders are called <strong>forests</strong> and json files are called 
                <strong>trees</strong>. You can freely navigate and update any tree 
                inside any forest. The physical location for the root of every forest 
                is set in the <strong>BUREAUCRAT_TREES_ROOT</strong> environment variable, which 
                should point to an existing writable folder.
                </div>
                <div class="p-2" id="treesTable"></div>
            </div>
       </div> 
    </div>
    <footer>

    </footer>
</body>
<script>
apiMethods("#queuesTable", [
    {
        method: "GET", 
        path: "/queues/", 
        description: "Some"
    },
    {
        method: "GET", 
        path: "/queues/{name}", 
        description: "Dequeues from the {name} queue"
    },
    {
        method: "POST", 
        path: "/queues/{name}", 
        description: "Enqueues in the {name} queue"
    },
    {
        method: "DELETE", 
        path: "/queues/{name}", 
        description: "Deletes the {name} queue"
    },
]);

apiMethods("#blobsTable", [
    {method: "GET", path: "/blobs/{full_path}", 
        description: "Get the index of the logic {full_path} location"
    },
    {method: "GET", path: "/blobs/download:{full_path}", 
        description: "Downloads the blob in the logic {full_path} location"
    },
    {method: "GET", path: "/blobs/raw:{full_path}", 
        description: "Gets the content of the blob in the logic {full_path} location as a base64 string"
    },
    {method: "POST", path: "/blobs/{full_path}", 
        description: "Writes a file in the logic {full_path} location"
    },
    {method: "DELETE", path: "/blobs/{full_path}", 
        description: "Deletes the file in the logic {full_path} location"
    },
]);

apiMethods("#tablesTable", [
    {method: "GET", path: "/tables/", 
        description: "List every database"
    },
    {method: "GET", path: "/tables/{database}", 
        description: "List every table in the {database}"
    },
    {method: "POST", path: "/tables/{database}", 
        description: "Executes in the {database} the query sent in the body and returns the result"
    },
    {method: "DELETE", path: "/tables/{database}/{table}", 
        description: "Retrieves every record in the {table} in the {database}"
    },
]);


apiMethods("#treesTable", [
    {method: "GET", path: "/trees/", 
        description: "List every available forest"
    },
    {method: "GET", path: "/trees/{forest}", 
        description: "Lists every available tree in the {forest}"
    },
    {method: "GET", path: "/trees/{forest}/{tree}/index:{path}", 
        description: "Gets the index for the node located in the {path} inside the {tree} belonging to the specified {forest}"
    },
    {method: "GET", path: "/trees/{forest}/{tree}/{path}", 
        description: "Gets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}"
    },
    {method: "POST", path: "/trees/{forest}/{tree}/{path}", 
        description: "ESets the content of the node located in the {path} inside the {tree} belonging to the specified {forest}"
    }
]);

</script>
</html>