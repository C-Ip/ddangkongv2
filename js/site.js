/* Loads, validates, saves and renders the manual's content. Shared by index.html and admin.html. */
(function () {
  var KEY = 'ddangkong-content-v1';
  var D = window.DDANGKONG_DEFAULTS;
  var IMAGES = window.DDANGKONG_IMAGES;
  var BLOOD = 'https://cdn-icons-png.flaticon.com/512/1477/1477227.png';

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function str(v, fallback) { return typeof v === 'string' ? v : fallback; }

  /* Merge untrusted input onto the defaults, keeping only known fields of the right type. */
  function sanitize(inp) {
    inp = inp && typeof inp === 'object' ? inp : {};
    var out = clone(D);
    out.siteTitle = str(inp.siteTitle, out.siteTitle);
    out.navBrand = str(inp.navBrand, out.navBrand);
    out.heroHeading = str(inp.heroHeading, out.heroHeading);
    var src = Array.isArray(inp.sections) ? inp.sections : [];
    out.sections.forEach(function (s) {
      var m = src.filter(function (x) { return x && x.id === s.id; })[0];
      if (!m) return;
      s.nav = str(m.nav, s.nav);
      s.heading = str(m.heading, s.heading);
      if (IMAGES.indexOf(m.image) > -1) s.image = m.image;
      s.blocks.forEach(function (b, i) {
        var mb = Array.isArray(m.blocks) && m.blocks[i];
        if (!mb) return;
        b.title = str(mb.title, b.title);
        if (Array.isArray(mb.items)) {
          b.items = mb.items.filter(function (t) { return typeof t === 'string'; });
        }
        if (b.image && IMAGES.indexOf(mb.image) > -1) b.image = mb.image;
      });
    });
    return out;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return sanitize(JSON.parse(raw));
    } catch (e) { /* storage blocked or bad JSON: fall back to defaults */ }
    return clone(D);
  }
  function save(content) {
    try { localStorage.setItem(KEY, JSON.stringify(content)); return true; }
    catch (e) { return false; }
  }
  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* Escape first, then apply the two supported bits of markup. */
  function fmt(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<span class="large">$1</span>')
      .replace(/\{\{blood\}\}/g,
        '<img src="' + BLOOD + '" alt="picture-of-blood" title="Blood image" class="img-small">');
  }
  function img(file, alt) {
    return '<img src="images/' + esc(file) + '" alt="' + esc(alt || '') +
      '" title="" class="img-large" width="100" height="100" loading="lazy">';
  }

  function render(c) {
    document.title = c.siteTitle;
    document.getElementById('nav-brand').textContent = c.navBrand;
    document.getElementById('hero-heading').textContent = c.heroHeading;

    document.getElementById('nav-links').innerHTML = c.sections.map(function (s) {
      return '<li class="nav-item"><a class="nav-link" href="#' + s.id + '">' + esc(s.nav) + '</a></li>';
    }).join('');

    document.getElementById('sections').innerHTML = c.sections.map(function (s) {
      var h = s.headingTag;
      var html = '<section class="' + s.theme + '-section" id="' + s.id + '">' +
        img(s.image, s.imageAlt) + '<' + h + '>' + esc(s.heading) + '</' + h + '>';
      s.blocks.forEach(function (b) {
        if (b.image) html += img(b.image, b.imageAlt);
        if (b.title) html += '<' + b.tag + '>' + esc(b.title) + '</' + b.tag + '>';
        html += '<ul class="list">' + b.items.map(function (t) {
          return '<li>' + fmt(t) + '</li>';
        }).join('') + '</ul>';
      });
      return html + '</section>';
    }).join('');
  }

  window.DdangkongSite = {
    load: load, save: save, reset: reset, sanitize: sanitize, render: render,
    defaults: function () { return clone(D); }, images: IMAGES
  };
})();
