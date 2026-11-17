(function () {
  var S = window.DdangkongSite;
  var content = S.load();
  var dirty = false;
  var formEl = document.getElementById('form');
  var statusEl = document.getElementById('status');

  function status(msg, ok) {
    statusEl.textContent = msg;
    statusEl.className = 'small w-100 ' + (ok === false ? 'status-err' : 'status-ok');
  }
  function touch() { dirty = true; statusEl.textContent = 'Unsaved changes'; statusEl.className = 'small w-100 text-muted'; }

  function el(tag, props, kids) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) { n[k] = props[k]; });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  var uid = 0;
  function field(label, control, help) {
    var id = 'f' + (++uid);
    control.id = id;
    control.classList.add('form-control');
    var wrap = el('div', { className: 'mb-3' }, [el('label', { htmlFor: id, className: 'form-label fw-semibold' }, [label]), control]);
    if (help) wrap.appendChild(el('div', { className: 'form-text' }, [help]));
    return wrap;
  }
  function textInput(value, onChange) {
    var i = el('input', { type: 'text', value: value });
    i.addEventListener('input', function () { onChange(i.value); touch(); });
    return i;
  }
  function imageSelect(value, onChange) {
    var sel = el('select', {}, S.images.map(function (f) { return el('option', { value: f, selected: f === value }, [f]); }));
    var thumb = el('img', { className: 'thumb', src: 'images/' + value, alt: '' });
    sel.addEventListener('change', function () { onChange(sel.value); thumb.src = 'images/' + sel.value; touch(); });
    sel.classList.remove('form-control');
    return { sel: sel, thumb: thumb };
  }

  function build() {
    formEl.innerHTML = '';
    var general = el('details', { className: 'card-section', open: true }, [el('summary', {}, ['General'])]);
    var gb = el('div', { className: 'body' });
    gb.appendChild(field('Browser tab title', textInput(content.siteTitle, function (v) { content.siteTitle = v; })));
    gb.appendChild(field('Nav bar brand (top-left link)', textInput(content.navBrand, function (v) { content.navBrand = v; })));
    gb.appendChild(field('Page heading (under the photo)', textInput(content.heroHeading, function (v) { content.heroHeading = v; })));
    general.appendChild(gb);
    formEl.appendChild(general);

    content.sections.forEach(function (s) {
      var d = el('details', { className: 'card-section' }, [el('summary', {}, [s.heading || s.nav])]);
      var b = el('div', { className: 'body' });
      b.appendChild(field('Nav link label', textInput(s.nav, function (v) { s.nav = v; })));
      b.appendChild(field('Section heading', textInput(s.heading, function (v) { s.heading = v; })));

      var pick = imageSelect(s.image, function (v) { s.image = v; });
      var imgWrap = el('div', { className: 'mb-3' }, [
        el('label', { className: 'form-label fw-semibold d-block' }, ['Section icon']),
        el('div', { className: 'd-flex align-items-center gap-3' }, [pick.thumb, pick.sel])
      ]);
      pick.sel.className = 'form-select';
      b.appendChild(imgWrap);

      s.blocks.forEach(function (blk) {
        var bw = el('div', { className: 'block' });
        if (blk.title || blk.tag !== 'h3' || s.blocks.length > 1) {
          bw.appendChild(field('Sub-heading', textInput(blk.title, function (v) { blk.title = v; })));
        }
        if (blk.image) {
          var p2 = imageSelect(blk.image, function (v) { blk.image = v; });
          p2.sel.className = 'form-select';
          bw.appendChild(el('div', { className: 'mb-3 d-flex align-items-center gap-3' }, [p2.thumb, p2.sel]));
        }
        var ta = el('textarea', { value: blk.items.join('\n') });
        ta.addEventListener('input', function () {
          blk.items = ta.value.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
          touch();
        });
        bw.appendChild(field('List items', ta, 'One item per line. **bold** makes text bold; {{blood}} adds the blood icon.'));
        b.appendChild(bw);
      });
      d.appendChild(b);
      formEl.appendChild(d);
    });
  }

  document.getElementById('save').addEventListener('click', function () {
    if (S.save(content)) { dirty = false; status('Saved. Open the site to see your changes.'); }
    else status('Could not save: this browser is blocking local storage.', false);
  });

  document.getElementById('reset').addEventListener('click', function () {
    if (!confirm('Discard all saved edits and go back to the default content?')) return;
    S.reset(); content = S.load(); dirty = false; build(); status('Reset to defaults.');
  });

  document.getElementById('export').addEventListener('click', function () {
    var text = '/* Exported from admin.html. Replace content.js in the repo with this file to publish. */\n' +
      'window.DDANGKONG_DEFAULTS = ' + JSON.stringify(content, null, 2) + ';\n\n' +
      'window.DDANGKONG_IMAGES = ' + JSON.stringify(S.images, null, 2) + ';\n';
    var a = el('a', { href: URL.createObjectURL(new Blob([text], { type: 'text/javascript' })), download: 'content.js' });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    status('Exported content.js.');
  });

  document.getElementById('import').addEventListener('change', function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var t = String(r.result), a = t.indexOf('{'), z = t.lastIndexOf('};');
        var json = t.slice(a, z > a ? z + 1 : t.lastIndexOf('}') + 1);
        content = S.sanitize(JSON.parse(json));
        build(); touch(); status('Imported. Click "Save changes" to apply it to the site.');
      } catch (err) { status('That file could not be read as Ddangkong content.', false); }
      e.target.value = '';
    };
    r.readAsText(f);
  });

  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
  build();
})();
