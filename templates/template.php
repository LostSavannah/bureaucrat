<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>{{ title }}</title>
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
        <h3>{{ title }}</h3>
        <h6>{{ slogan }}</h6>
    </header>
    <div class="container p-2">
       <div class="row">
        <div class="col-12">
            <div class="d-flex flex-row justify-content-center align-items-center p-4">
                <div class="d-flex flex-column align-items-center">
                    <div class="p-2">
                        {{ description }}
                    </div>
                    <div class="p-2">
                        {% for link in links-%}
                        <a 
                            href="{{ link.href }}" 
                            class="m-2 btn btn-primary"> <br/>
                            <h4>{{ link.text }}</h4>
                        </a> 
                        {% endfor %}
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
                        {% for p in html_paragraphs%}
                        <div class="p-2"> {{p}} </div>
                        {% endfor %}
                    </div>
                </div>
            </div>
       </div> 
    </div>
    <div class="container p-2">
        <div class="row">
            <div class="col-12">
                {% for service in services-%}
                <div class="p-2">
                    <h2>{{ service.name }}</h2>
                </div>
                {% for p in service.html_description-%}
                <div class="p-2">
                    {{ p }}
                </div>
                {% endfor %}
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
                            {% for e in service.endpoints-%}
                            <tr>
                                <td><img src="https://img.shields.io/badge/-{{e.method}}"/></td>
                                <td>{{ e.path }}</td>
                                <td>{{ e.description }}</td>
                            </tr>
                            {% endfor %}
                        </tbody>
                    </table>
                </div>
                {% endfor %}
            </div>
       </div> 
    </div>
    <footer>

    </footer>
</body>
</html>