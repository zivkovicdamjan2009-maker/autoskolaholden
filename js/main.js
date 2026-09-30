/* Auto škola Holden · main.js */
(function(){
'use strict';
function toCss(o){return Object.keys(o).map(function(k){var v=o[k];var p=k.indexOf('Webkit')===0?'-webkit-'+k.slice(6).replace(/[A-Z]/g,function(m){return '-'+m.toLowerCase()}):k.replace(/[A-Z]/g,function(m){return '-'+m.toLowerCase()});if(typeof v==='number'&&!/^(zIndex|opacity|flex)$/.test(k))v=v+'px';return p+':'+v}).join(';')}
function navStyle(mobile,scrolled){return {position:'fixed',top:0,left:0,right:0,zIndex:50,color:'#fff',background:(mobile&&!scrolled)?'rgba(11,12,11,0)':'rgba(11,12,11,.9)',backdropFilter:(mobile&&!scrolled)?'none':'blur(6px)',WebkitBackdropFilter:(mobile&&!scrolled)?'none':'blur(6px)',borderBottom:'1px solid '+(scrolled?'rgba(255,255,255,.12)':(mobile?'transparent':'rgba(255,255,255,.06)')),boxShadow:(mobile&&scrolled)?'0 10px 30px rgba(0,0,0,.25)':'none',transition:'background .5s cubic-bezier(.2,.7,.2,1), border-color .5s ease, box-shadow .5s ease, backdrop-filter .5s ease'}}
function barStyle(on){return {position:'fixed',left:16,right:16,bottom:'calc(16px + env(safe-area-inset-bottom, 0px))',zIndex:55,transform:on?'translateY(0)':'translateY(calc(100% + 40px))',opacity:on?1:0,transition:'transform .55s cubic-bezier(.2,.7,.2,1), opacity .4s ease',pointerEvents:on?'auto':'none'}}
function examStyles(dk,open,i){return {card:{position:'relative',borderRadius:32,width:'100%',minHeight:380,textAlign:'left',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'flex-start',padding:'clamp(28px,3.5vw,44px)',font:'400 16px Poppins',background:dk?'#0b0c0b':'transparent',color:dk?'#fff':'#0b0c0b',border:'1px solid '+(open?(dk?'#f5c518':'#0b0c0b'):(dk?'#0b0c0b':'#b3b7b5')),transition:'border-color .3s, transform .35s cubic-bezier(.2,.7,.2,1)'},
icon:{animation:open?'none':'hpulse 2.6s ease-out '+(i*1.3)+'s infinite',flex:'none',borderRadius:999,width:44,height:44,display:'grid',placeItems:'center',background:open?'#f5c518':'transparent',color:open?'#0b0c0b':'inherit',border:'1px solid '+(open?'#f5c518':(dk?'rgba(255,255,255,.3)':'#b3b7b5')),transform:open?'rotate(45deg)':'none',transition:'transform .35s cubic-bezier(.2,.7,.2,1), background .3s'},
panel:{display:'grid',width:'100%',gridTemplateRows:open?'1fr':'0fr',transition:'grid-template-rows .45s cubic-bezier(.2,.7,.2,1)'}}}
function faqStyles(open){return {icon:{flex:'none',borderRadius:999,width:40,height:40,display:'grid',placeItems:'center',border:'1px solid '+(open?'#0b0c0b':'#b3b7b5'),background:open?'#f5c518':'transparent',transform:open?'rotate(45deg)':'none',transition:'transform .35s cubic-bezier(.2,.7,.2,1), background .3s, border-color .3s'},
panel:{display:'grid',gridTemplateRows:open?'1fr':'0fr',transition:'grid-template-rows .45s cubic-bezier(.2,.7,.2,1)'}}}
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var scrolled = false, menu = false, faq = -1, exam = -1, io = null, plRaf = 0;
var $ = function(s, r){ return (r || document).querySelector(s); };
var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var nav = $('#site-nav'), bar = $('#m-bar'), mMenu = $('#m-menu');
function isMobile(){ return window.innerWidth < 960; }
function applyChrome(){
  if (nav) nav.style.cssText = toCss(navStyle(isMobile(), scrolled));
  if (bar) {
    var on = isMobile() && scrolled && !menu;
    bar.style.cssText = toCss(barStyle(on));
    bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    $$('a', bar).forEach(function(a){ a.tabIndex = on ? 0 : -1; });
  }
}
function setMenu(open){
  menu = open;
  if (mMenu) mMenu.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  $$('[data-act="menu-toggle"]').forEach(function(b){ b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  applyChrome();
}
function renderExams(){
  $$('[data-act="exam"]').forEach(function(btn){
    var i = +btn.getAttribute('data-i'), dk = btn.getAttribute('data-dark') === '1', open = exam === i, st = examStyles(dk, open, i);
    btn.style.cssText = toCss(st.card); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var ic = $('[data-s="icon"]', btn), pn = $('[data-s="panel"]', btn);
    if (ic) ic.style.cssText = toCss(st.icon); if (pn) pn.style.cssText = toCss(st.panel);
  });
}
function renderFaq(){
  $$('[data-act="faq"]').forEach(function(btn){
    var i = +btn.getAttribute('data-i'), open = faq === i, st = faqStyles(open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var ic = $('[data-s="icon"]', btn), pn = btn.parentElement && $('[data-s="panel"]', btn.parentElement);
    if (ic) ic.style.cssText = toCss(st.icon); if (pn) pn.style.cssText = toCss(st.panel);
  });
}
function toTop(){
  var b = reduce ? 'auto' : 'smooth';
  (document.scrollingElement || document.documentElement).scrollTo({ top: 0, behavior: b });
  window.scrollTo({ top: 0, behavior: b });
}
document.addEventListener('click', function(ev){
  var t = ev.target.closest && ev.target.closest('[data-act]'); if (!t) return;
  var a = t.getAttribute('data-act');
  if (a === 'menu-toggle') setMenu(!menu);
  else if (a === 'menu-close') setMenu(false);
  else if (a === 'faq') { var i = +t.getAttribute('data-i'); faq = faq === i ? -1 : i; renderFaq(); }
  else if (a === 'exam') { var j = +t.getAttribute('data-i'); exam = exam === j ? -1 : j; renderExams(); }
  else if (a === 'reset') { var f = $('#lead-form'), s = $('#sent-wrap'); if (f) { f.reset(); f.hidden = false; } if (s) s.hidden = true; }
  else if (a === 'top') { ev.preventDefault(); toTop(); }
});
document.addEventListener('keydown', function(ev){ if (ev.key === 'Escape' && menu) setMenu(false); });
var form = $('#lead-form');
if (form) form.addEventListener('submit', function(ev){
  ev.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  form.hidden = true; var s = $('#sent-wrap'); if (s) s.hidden = false;
});
function count(el){
  var node = Array.prototype.slice.call(el.childNodes).filter(function(n){ return n.nodeType === 3; })[0];
  if (!node) return;
  var to = +el.getAttribute('data-count'), from = to > 1000 ? to - 30 : 0, t0 = performance.now(), dur = 1300;
  (function step(now){ var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    node.nodeValue = String(Math.round(from + (to - from) * e)); if (p < 1) requestAnimationFrame(step); })(t0);
}
function setupReveal(){
  if (reduce || !('IntersectionObserver' in window)) return;
  var ease = 'cubic-bezier(.2,.7,.2,1)', els = $$('[data-reveal]');
  els.forEach(function(el){ var d = +(el.getAttribute('data-delay') || 0);
    el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .9s ' + ease + ' ' + d + 'ms, transform .9s ' + ease + ' ' + d + 'ms'; });
  io = new IntersectionObserver(function(entries){ entries.forEach(function(e){
    if (!e.isIntersecting) return; var el = e.target; io.unobserve(el);
    if (el.hasAttribute('data-count')) { count(el); return; }
    el.style.opacity = '1'; el.style.transform = 'none';
    setTimeout(function(){ el.style.transition = ''; el.style.transform = ''; el.style.opacity = ''; }, 1000 + (+(el.getAttribute('data-delay') || 0)));
  }); }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function(el){ io.observe(el); });
  $$('[data-count]').forEach(function(el){ io.observe(el); });
}
var ticking = false;
function tick(){
  ticking = false;
  var y = window.scrollY, vh = window.innerHeight, s = y > 24;
  if (s !== scrolled) { scrolled = s; applyChrome(); }
  var media = $('#hero-media');
  if (media && !reduce && y < vh * 1.2) media.style.transform = 'translate3d(0,' + (y * 0.07) + 'px,0)';
  var tl = $('#tl'), fill = $('#tl-fill');
  if (tl && fill) {
    var r = tl.getBoundingClientRect(), p = Math.max(0, Math.min(1, (vh * 0.62 - r.top) / r.height)), active = 0;
    fill.style.transform = 'scaleY(' + p + ')';
    $$('[data-step]', tl).forEach(function(st, i){
      var on = st.getBoundingClientRect().top < vh * 0.64; if (on) active = i + 1;
      if (st._on === on) return; st._on = on;
      var num = $('[data-num]', st), body = $('[data-body]', st);
      num.style.background = on ? '#f5c518' : '#d7d9da'; num.style.color = on ? '#0b0c0b' : '#62686a';
      num.style.borderColor = on ? '#0b0c0b' : '#b3b7b5'; body.style.opacity = on ? '1' : '.4';
    });
    var c = $('#tl-counter'); if (c) c.textContent = String(Math.max(1, active)).padStart(2, '0');
  }
}
function onScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', function(){ if (!isMobile() && menu) setMenu(false); applyChrome(); onScroll(); });
function runPreloader(){
  var root = $('#pl-root'), cur = $('#pl-curtain'), inner = $('#pl-inner');
  var done = function(){ setTimeout(function(){ setupReveal(); tick(); }, 30); };
  var hide = function(){ if (root) root.style.display = 'none'; if (cur) cur.style.display = 'none'; document.documentElement.style.overflow = ''; };
  if (!root || reduce) { hide(); done(); return; }
  document.documentElement.style.overflow = 'hidden';
  var cnt = $('#pl-count'), pbar = $('#pl-bar'), t0 = performance.now(), MIN = 1600, MAX = 4000, ease = 'cubic-bezier(.76,0,.24,1)';
  var shown = 0, loaded = document.readyState === 'complete';
  window.addEventListener('load', function(){ loaded = true; }, { once: true });
  function exit(){
    root.style.transition = 'transform 1s ' + ease; root.style.transform = 'translate3d(0,-100%,0)';
    inner.style.transition = 'transform 1s ' + ease + ', opacity .6s ease'; inner.style.transform = 'translate3d(0,-18vh,0)'; inner.style.opacity = '0';
    cur.style.transition = 'transform 1s ' + ease + ' .16s'; cur.style.transform = 'translate3d(0,-100%,0)';
    setTimeout(done, 380); setTimeout(hide, 1300);
  }
  function frame(now){
    var el = now - t0, ready = el > MIN && (loaded || el > MAX);
    var target = ready ? 100 : Math.min(90, (el / MIN) * 90);
    shown += (target - shown) * (ready ? 0.16 : 0.09);
    if (ready && 100 - shown < 0.5) shown = 100;
    cnt.textContent = String(Math.round(shown)).padStart(3, '0');
    pbar.style.transform = 'scaleX(' + (shown / 100) + ')';
    if (shown < 100) plRaf = requestAnimationFrame(frame); else setTimeout(exit, 250);
  }
  plRaf = requestAnimationFrame(frame);
}
var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
applyChrome(); renderExams(); renderFaq(); runPreloader();
})();
