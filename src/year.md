---
layout: layouts/base.njk
lang: en
pagination:
  data: links.years
  size: 1
  alias: year
permalink: "/{{ year }}/"
---

{style="--ta:center;" --fx: 100%; --m: auto; --w:40%;"}

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfMifUY94SFYhPoAj7lclgyAV8GKyMhyLhwlKXITGw5hjDnv8RkzRH4uEqGClZWrlGpbolys6ActlB6DSTD3W1wiRHNWzvDlrIRbv71QyA7LCFIdQP1dNutBi0bv57wewZrvR0WBg?key=eoHe1ZHreIyKj-2w9LPwhw){style="--w:4rem"}
===

{style="--ta:center;" --fx: 100%; --m: auto; --w:40%;"}

🌍 Freedom From Poverty Foundation: 
===================================

Creating pathways to a brighter future! ✨

{% assign linksData = links.years[year][lang] %}

{% for section in linksData %}
  {% if section.section and section.links %}
    
    {% if section.section == "Social Media" or section.section == "2 - Social Media" or section.section == "Médias Sociaux" %}
{style="--ta:center;" --fx: 100%; --m: auto; --w:40%;"}
# {% for link in section.links %}[<i class="{{ link.icon }}"></i>]({{ link.url }}){style="--m:2rem"} {% endfor %}
    {% else %}

{% for link in section.links %}
[{{ link.title }}]({{ link.url }})

{% endfor %}
    {% endif %}
  {% endif %}
{% endfor %}
