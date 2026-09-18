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

{% if year == "2026" or year == 2026 %}
<!-- 27th Annual Gala poster carousel: one block per poster so the
     gallery works with no JavaScript (all posters visible). The script
     below progressively enhances it into an auto-rotating slideshow. -->
<div class="gala-carousel" id="gala-carousel">
  <div class="gala-slides">
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-01.jpg" alt="27th Annual Gala poster 1 of 12 — 14 November 2026, La Châteaubriand" loading="eager"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-02.jpg" alt="27th Annual Gala poster 2 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-03.jpg" alt="27th Annual Gala poster 3 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-04.jpg" alt="27th Annual Gala poster 4 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-05.jpg" alt="27th Annual Gala poster 5 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-06.jpg" alt="27th Annual Gala poster 6 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-07.jpg" alt="27th Annual Gala poster 7 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-08.jpg" alt="27th Annual Gala poster 8 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-09.jpg" alt="27th Annual Gala poster 9 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-10.jpg" alt="27th Annual Gala poster 10 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-11.jpg" alt="27th Annual Gala poster 11 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
    <figure class="gala-slide"><img src="/public/uploads/2026/gala-12.jpg" alt="27th Annual Gala poster 12 of 12 — 14 November 2026, La Châteaubriand" loading="lazy"></figure>
  </div>
  <button class="gala-prev" type="button" aria-label="Previous poster">&#10094;</button>
  <button class="gala-next" type="button" aria-label="Next poster">&#10095;</button>
  <div class="gala-dots" role="tablist" aria-label="Choose poster"></div>
</div>

<style>
  .gala-carousel {
    position: relative;
    max-width: 34rem;
    margin: 1.5rem auto;
  }
  .gala-slides {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    border-radius: 0.75rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    scrollbar-width: none;
  }
  .gala-slides::-webkit-scrollbar { display: none; }
  .gala-slide {
    flex: 0 0 100%;
    scroll-snap-align: center;
    margin: 0;
  }
  .gala-slide img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }
  .gala-prev, .gala-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.55);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    line-height: 1;
  }
  .gala-prev { left: 0.5rem; }
  .gala-next { right: 0.5rem; }
  .gala-prev:hover, .gala-next:hover { background: rgba(0,0,0,0.8); }
  .gala-dots {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }
  .gala-dots button {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    border: none;
    background: #ccc;
    cursor: pointer;
    padding: 0;
  }
  .gala-dots button[aria-selected="true"] { background: var(--primary, #b00); }
</style>

<script>
  (function () {
    var root = document.getElementById('gala-carousel');
    if (!root) return;
    var track = root.querySelector('.gala-slides');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.gala-slide'));
    var dotsBox = root.querySelector('.gala-dots');
    var index = 0;
    var timer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Show poster ' + (i + 1) + ' of ' + slides.length);
      dot.addEventListener('click', function () { go(i); restart(); });
      dotsBox.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsBox.children);

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[index].offsetLeft - track.offsetLeft, behavior: 'smooth' });
      dots.forEach(function (d, j) { d.setAttribute('aria-selected', j === index ? 'true' : 'false'); });
    }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 5000);
    }

    root.querySelector('.gala-prev').addEventListener('click', function () { go(index - 1); restart(); });
    root.querySelector('.gala-next').addEventListener('click', function () { go(index + 1); restart(); });
    track.addEventListener('scroll', function () {
      var w = track.clientWidth || 1;
      var i = Math.round(track.scrollLeft / w);
      if (i !== index) {
        index = Math.max(0, Math.min(slides.length - 1, i));
        dots.forEach(function (d, j) { d.setAttribute('aria-selected', j === index ? 'true' : 'false'); });
      }
    }, { passive: true });
    root.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    root.addEventListener('mouseleave', restart);
    var touchX = null;
    track.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
      touchX = null;
    }, { passive: true });

    go(0);
    restart();
  })();
</script>
{% endif %}

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
