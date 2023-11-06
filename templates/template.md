{% for badge in badges %}{% for branch in badge.branches %}
[![{{title}}]({{repository}}/actions/workflows/{{badge.action}}.yml/badge.svg?branch={{branch}})]({{repository}}/actions/workflows/{{badge.action.yml}})
{% endfor %}{% endfor %}
# [{{title}}]({{repository}})
{{ slogan }}
{% for p in md_paragraphs-%}
## {{p.title}}
{{ p.text }}
{% endfor %}
{% for service in services-%}
## {{ service.name }}
{% for p in service.html_description-%}
{{ p }} 
{% endfor %}
|method|path|name|
|---|---|---|
{% for e in service.endpoints-%}
|![{{e.type}}](https://img.shields.io/badge/-{{e.method}})|{{e.path}}|{{e.description}}|
{% endfor %}
{% endfor %}