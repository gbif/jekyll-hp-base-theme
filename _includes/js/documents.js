
{% assign counter = 0 %}
{% assign content =  site.pages | concat: site.documents %}

var documents = [
  {% for page in content %}
    {% assign ext = page.path | split: "." | last %}
    {% if ext == 'md' or ext == 'asciidoc' %}
      {
        "id": {{ counter }},
        "url": "{{ site.url }}{{ page.url }}",
        "collection": "{{page.collection}}",
        "title": "{{ page.title }}",
        "date": "{{ page.date | date: "%Y/%m/%d" }}",
        "excerpt": "{{ page.excerpt | strip_html | truncatewords: 20 | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}",
        "body": "{{ page.date | date: "%Y/%m/%d" }} - {{ page.content | replace: '"', ' ' | strip_html | strip_newlines }}"{% assign counter = counter | plus: 1 %}
      },
    {% endif %}
  {% endfor %}
];
