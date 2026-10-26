/* ============================================================
   BEERCOIN — ANIMACIONES (anime.js v4)
   Todas las animaciones del sitio viven acá. app.js solo llama
   a BC.motion.* y no sabe cómo se anima nada.

   - Si anime.js no cargó, todo funciona igual pero sin animar.
   - Con "reducir movimiento" activo en el sistema, cada
     animación salta directo a su estado final y no hay loops.
   ============================================================ */
(function(BC){
  "use strict";

  var A = window.anime || null;
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var M = BC.motion = {};

  var EASE_OUT = 'outExpo';
  var EASE_SOFT = 'outQuart';

  // ---------- helpers ----------

  // En modo reducido: duración 0, sin delay, sin loop.
  function tame(params){
    if (!reduced) return params;
    var p = {};
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) p[k] = params[k];
    p.duration = 0; p.delay = 0; p.loop = false; p.alternate = false;
    return p;
  }

  function animate(targets, params){
    if (!A) { if (params && params.onComplete) params.onComplete(); return null; }
    return A.animate(targets, tame(params));
  }

  // Micro-animación que vuelve al estado original: al terminar limpia
  // sus estilos inline para no pisar los :hover del CSS.
  function blip(targets, params){
    params.onComplete = function(anim){ anim.revert(); };
    return animate(targets, params);
  }

  // Loops decorativos: en modo reducido directamente no existen.
  function loop(targets, params){
    if (!A || reduced) return null;
    params.loop = true;
    if (params.alternate === undefined) params.alternate = true;
    return A.animate(targets, params);
  }

  function timeline(params){
    if (!A) return null;
    params = params || {};
    if (reduced) params.defaults = { duration:0, delay:0 };
    return A.createTimeline(params);
  }

  function set(targets, props){ if (A) A.utils.set(targets, props); }

  function stagger(ms, opts){ return A ? A.stagger(reduced ? 0 : ms, opts) : 0; }

  function splitWords(el){ return A ? A.splitText(el, { words:{ wrap:'clip' } }).words : []; }
  function splitChars(el){ return A ? A.splitText(el, { chars:{ wrap:'clip' } }).chars : []; }

  // Ejecuta fn una sola vez cuando el elemento entra al viewport.
  function onceInView(el, fn, enter){
    if (!A) { fn(); return; }
    var done = false;
    A.onScroll({
      target: el,
      enter: enter || 'bottom-=12% top',
      onEnter: function(){ if (done) return; done = true; fn(); }
    });
  }

  M.reduced = reduced;
  M.enabled = !!A;

  // ======================== HERO ========================
  M.heroIntro = function(){
    var hero = document.querySelector('.hero');
    var nav = document.querySelector('.navbar');
    var glow = hero.querySelector('.hero-glow');
    var line1 = hero.querySelector('.line1');
    var coin = hero.querySelector('.line2 img');
    var word = hero.querySelector('.brand-gradient');
    var tagline = hero.querySelector('p');

    // gradiente del "BEERCOIN" corriendo siempre (antes era @keyframes)
    loop(word, { backgroundPosition:['0% 50%','200% 50%'], duration:4000, ease:'linear', alternate:false });

    if (!A) return;

    var chars = splitChars(line1);
    set(nav, { y:'-100%', opacity:0 });
    set(glow, { opacity:0, scale:.6 });
    set(chars, { y:'110%' });
    set(coin, { opacity:0, scale:0, rotate:-200 });
    set(word, { opacity:0, x:'-.35em' });
    set(tagline, { opacity:0, y:16 });

    var tl = timeline({
      defaults:{ ease:EASE_OUT, duration:1100 },
      onComplete: heroIdle
    });
    tl.add(nav,     { y:'0%', opacity:1, duration:900 }, 0)
      .add(glow,    { opacity:1, scale:1, duration:1800, ease:EASE_SOFT }, 0)
      .add(chars,   { y:'0%', delay:stagger(45) }, 150)
      .add(coin,    { opacity:1, scale:1, rotate:0, duration:1300, ease:'outBack(1.4)' }, 420)
      .add(word,    { opacity:1, x:'0em', duration:1000 }, 560)
      .add(tagline, { opacity:1, y:0, duration:1000, ease:EASE_SOFT }, 950);

    function heroIdle(){
      // la moneda flota y el halo respira
      loop(coin, { y:[-6, 6], rotate:[-6, 6], duration:2600, ease:'inOutSine' });
      loop(glow, { scale:[1, 1.08], opacity:[1, .75], duration:3200, ease:'inOutSine' });
    }
  };

  // ===================== INFO BLOCKS =====================
  M.revealInfoBlock = function(block){
    if (!A) return;
    var media = block.querySelector('.info-media');
    var img = media.querySelector('img');
    var title = block.querySelector('h2');
    var text = block.querySelector('p');
    var fromRight = block.classList.contains('right');

    var words = splitWords(title);
    var hidden = fromRight ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
    set(media, { clipPath:hidden });
    if (img) set(img, { scale:1.25 });
    set(words, { y:'110%' });
    set(text, { opacity:0, y:24 });

    onceInView(block, function(){
      var tl = timeline({ defaults:{ ease:EASE_OUT, duration:1200 } });
      tl.add(media, { clipPath:'inset(0% 0% 0% 0%)', duration:1300, ease:'inOutQuart' }, 0);
      if (img) tl.add(img, { scale:1, duration:1800 }, 150);
      tl.add(words, { y:'0%', delay:stagger(70) }, 350)
        .add(text,  { opacity:1, y:0, duration:1000, ease:EASE_SOFT }, 650);
    });
  };

  // ======================= BUILDER =======================
  M.revealBuilder = function(section){
    if (!A) return;
    var title = section.querySelector('h2');
    var cols = section.querySelectorAll('.col-title');
    var cards = section.querySelectorAll('.model-card');
    var features = section.querySelectorAll('.feature-item');
    var generate = section.querySelector('.generate-wrap');

    var words = splitWords(title);
    set(words, { y:'110%' });
    set(cols, { opacity:0, x:-20 });
    set(cards, { opacity:0, x:-40 });
    set(features, { opacity:0, scale:.9 });
    set(generate, { opacity:0, y:30 });

    onceInView(section, function(){
      var tl = timeline({ defaults:{ ease:EASE_OUT, duration:900 } });
      tl.add(words,    { y:'0%', delay:stagger(80) }, 0)
        .add(cols,     { opacity:1, x:0, delay:stagger(120) }, 250)
        .add(cards,    { opacity:1, x:0, delay:stagger(70) }, 350)
        .add(features, { opacity:1, scale:1, delay:stagger(25, { grid:[2, 8], from:'first' }), duration:700 }, 450)
        .add(generate, { opacity:1, y:0 }, 800);
    }, 'bottom-=20% top');
  };

  // Tarjeta de modelo elegida: pulso y el ícono gira.
  M.selectModel = function(card, prev){
    if (prev && prev !== card) blip(prev, { scale:[.98, 1], duration:300, ease:EASE_SOFT });
    blip(card, { scale:[.96, 1.02, 1], duration:550, ease:'outQuad' });
    blip(card.querySelector('.icon'), { rotate:[0, -14, 10, 0], scale:[1, 1.25, 1], duration:650, ease:'inOutSine' });
  };

  // Check de característica: aparece con rebote / desaparece.
  M.toggleFeature = function(item, selected){
    var check = item.querySelector('.check svg');
    if (selected && check) animate(check, { scale:[0, 1], rotate:[-45, 0], duration:500, ease:'outBack(2.2)' });
    blip(item, { scale:[.97, 1], duration:350, ease:EASE_SOFT });
  };

  // Característica fija: "no se puede", se sacude.
  M.denyFeature = function(item){
    blip(item, { x:[0, -7, 7, -5, 5, -2, 0], duration:450, ease:'linear' });
    var lock = item.querySelector('.check svg');
    if (lock) blip(lock, { scale:[1, 1.35, 1], duration:450, ease:'outQuad' });
  };

  // Botón GENERAR: entra en estado activo con un "pop" y la flecha empuja en loop.
  var arrowLoop = null;
  M.generateReady = function(btn, ready){
    var arrow = btn.querySelector('.arrow');
    if (arrowLoop) { arrowLoop.revert(); arrowLoop = null; }
    if (!ready) return;
    blip(btn, { scale:[1, 1.06, 1], duration:600, ease:'outBack(2)' });
    arrowLoop = loop(arrow, { x:[0, 6], duration:700, ease:'inOutSine' });
  };

  // ======================= OVERLAYS =======================
  M.showOverlay = function(el, onDone){
    el.classList.add('show');
    animate(el, { opacity:[0, 1], duration:350, ease:'outQuad', onComplete:onDone });
  };

  M.hideOverlay = function(el, onDone){
    animate(el, {
      opacity:[1, 0], duration:280, ease:'inQuad',
      onComplete:function(){ el.classList.remove('show'); set(el, { opacity:1 }); if (onDone) onDone(); }
    });
  };

  // ================= SECUENCIA DE BENEFICIOS =================
  // slide entra: brillo + sparkle girando, título por palabras, texto y botón.
  // La barra de progreso es una animación de anime.js y al completarse avanza.
  var progressAnim = null;
  var slideSplits = new WeakMap();

  M.stopProgress = function(){
    if (progressAnim) { progressAnim.pause(); progressAnim = null; }
  };

  M.enterBenefit = function(slide, duration, onTimeout){
    M.stopProgress();
    var sparkle = slide.querySelector('.sparkle');
    var glow = slide.querySelector('.glow');
    var title = slide.querySelector('h3');
    var text = slide.querySelector('p');
    var next = slide.querySelector('.btn-next');
    var fill = slide.querySelector('[data-fill]');

    var words = slideSplits.get(slide);
    if (!words) { words = splitWords(title); slideSplits.set(slide, words); }

    var tl = timeline({ defaults:{ ease:EASE_OUT, duration:900 } });
    if (tl) {
      tl.add(glow,    { opacity:[0, 1], scale:[.5, 1], duration:1200, ease:EASE_SOFT }, 0)
        .add(sparkle, { opacity:[0, 1], scale:[0, 1], rotate:[-180, 0], duration:1000, ease:'outBack(1.6)' }, 0)
        .add(words,   { y:['110%', '0%'], delay:stagger(60) }, 150)
        .add(text,    { opacity:[0, 1], y:[20, 0], ease:EASE_SOFT }, 450)
        .add(next,    { opacity:[0, 1], y:[10, 0], duration:600 }, 650);
    }

    set(fill, { scaleX:0 });
    if (!A) { progressAnim = null; return; }
    // Con "reducir movimiento" la barra no se mueve pero el tiempo corre igual.
    progressAnim = A.animate(fill, {
      scaleX:[0, 1], duration:duration, ease:'linear',
      onComplete:function(){ progressAnim = null; onTimeout(); }
    });
  };

  M.leaveBenefit = function(slide, onDone){
    M.stopProgress();
    animate(slide, {
      opacity:[1, 0], y:[0, -24], duration:320, ease:'inQuad',
      onComplete:function(){ set(slide, { opacity:1, y:0 }); onDone(); }
    });
  };

  var finalPulse = null;
  M.enterFinal = function(final){
    var title = final.querySelector('h3');
    var btn = final.querySelector('.btn-configure');
    var tl = timeline({ defaults:{ ease:EASE_OUT, duration:900 } });
    if (tl) {
      tl.add(final, { opacity:[0, 1], scale:[.9, 1], duration:700 }, 0)
        .add(title, { opacity:[0, 1], y:[30, 0], letterSpacing:['.2em', '0em'], duration:1100 }, 100)
        .add(btn,   { opacity:[0, 1], scale:[.6, 1], ease:'outBack(1.8)' }, 450);
    }
    if (finalPulse) finalPulse.revert();
    finalPulse = loop(btn, {
      boxShadow:['0 0 30px rgba(255,0,127,.35)', '0 0 70px rgba(255,0,127,.7)'],
      duration:1100, ease:'inOutSine', delay:1300
    });
  };

  M.stopFinal = function(){ if (finalPulse) { finalPulse.revert(); finalPulse = null; } };

  // ======================== PREVIEW ========================
  var waPulse = null;
  M.enterPreview = function(overlay){
    var title = overlay.querySelector('h2');
    var media = overlay.querySelector('.preview-media');
    var img = media.querySelector('img');
    var items = overlay.querySelectorAll('.preview-feature');
    var wa = overlay.querySelector('.btn-whatsapp');
    var close = overlay.querySelector('.preview-close');

    var tl = timeline({ defaults:{ ease:EASE_OUT, duration:900 } });
    if (tl) {
      tl.add(title, { opacity:[0, 1], y:[-30, 0] }, 0)
        .add(media, { opacity:[0, 1], scale:[.92, 1], clipPath:['inset(12% 12% 12% 12%)', 'inset(0% 0% 0% 0%)'], duration:1100 }, 120);
      if (img) tl.add(img, { scale:[1.2, 1], duration:1600 }, 120);
      tl.add(items, { opacity:[0, 1], x:[-24, 0], delay:stagger(45) }, 380)
        .add(wa,    { opacity:[0, 1], y:[30, 0], ease:'outBack(1.5)' }, 600)
        .add(close, { opacity:[0, 1], duration:700 }, 300);
    }
    if (waPulse) waPulse.revert();
    waPulse = loop(wa, { scale:[1, 1.025], duration:900, ease:'inOutSine', delay:1600 });
  };

  M.stopPreview = function(){ if (waPulse) { waPulse.revert(); waPulse = null; } };

})(window.BeerCoin = window.BeerCoin || {});
