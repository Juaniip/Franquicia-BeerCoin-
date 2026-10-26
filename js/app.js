/* ============================================================
   BEERCOIN — APP
   Estado, render y eventos. Las animaciones las delega a
   BC.motion (js/motion.js); los datos salen de js/data.js.
   ============================================================ */
(function(BC){
  "use strict";

  var ICONS = BC.ICONS;
  var motion = BC.motion;

  var state = {
    selectedModel: null,
    selectedFeatures: BC.FIXED_FEATURES.slice(),
    benefitIndex: 0
  };

  function $(id){ return document.getElementById(id); }
  function isFixed(f){ return BC.FIXED_FEATURES.indexOf(f) !== -1; }
  function isSelected(f){ return state.selectedFeatures.indexOf(f) !== -1; }

  // ---------- bloqueo de scroll mientras hay un overlay abierto ----------
  var openOverlays = 0;
  function lockScroll(){ openOverlays++; document.body.classList.add('no-scroll'); }
  function unlockScroll(){ openOverlays = Math.max(0, openOverlays - 1); if (!openOverlays) document.body.classList.remove('no-scroll'); }

  // ============================ HERO ============================
  function initHero(){
    $('btn-invest').addEventListener('click', function(){
      $('builder-section').scrollIntoView({ behavior: motion.reduced ? 'auto' : 'smooth' });
    });
    motion.heroIntro();
  }

  // ========================= INFO BLOCKS =========================
  function initInfoBlocks(){
    var section = $('info-blocks');
    BC.BENEFITS.forEach(function(b, i){
      var block = document.createElement('div');
      block.className = 'info-block' + (i % 2 === 1 ? ' right' : '');
      var media = b.image ? '<img src="'+b.image+'" alt="'+b.title+'" loading="lazy">' : '<span>RENDER</span>';
      block.innerHTML =
        '<div class="info-media">'+media+'</div>'+
        '<div class="info-text"><h2>'+b.title+'</h2><p>'+b.desc+'</p></div>';
      section.appendChild(block);
      motion.revealInfoBlock(block);
    });
  }

  // =========================== BUILDER ===========================
  // Se renderiza una sola vez; después solo se cambian clases, así las
  // animaciones no se cortan por recrear el DOM.
  var modelCards = {};
  var btnGenerate;

  function initModels(){
    var list = $('model-list');
    BC.MODELS.forEach(function(m){
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'model-card';
      card.setAttribute('aria-pressed', 'false');
      card.innerHTML =
        '<span class="icon">'+ICONS[m.icon]+'</span>'+
        '<span class="name">'+m.name+'</span>';
      card.addEventListener('click', function(){ selectModel(m); });
      modelCards[m.id] = card;
      list.appendChild(card);
    });
  }

  function selectModel(m){
    var prev = state.selectedModel && modelCards[state.selectedModel.id];
    var card = modelCards[m.id];
    if (prev) { prev.classList.remove('active'); prev.setAttribute('aria-pressed', 'false'); }
    card.classList.add('active');
    card.setAttribute('aria-pressed', 'true');
    var wasReady = !!state.selectedModel;
    state.selectedModel = m;
    motion.selectModel(card, prev);
    if (!wasReady) setGenerateReady(true);
  }

  function initFeatures(){
    var grid = $('features-grid');
    BC.FEATURES.forEach(function(f){
      var fixed = isFixed(f);
      var item = document.createElement('div');
      item.className = 'feature-item' + (isSelected(f) ? ' selected' : '') + (fixed ? ' fixed' : '');
      item.setAttribute('role', 'checkbox');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-checked', String(isSelected(f)));
      if (fixed) item.setAttribute('aria-disabled', 'true');
      item.innerHTML =
        '<span class="label"><span class="name">'+f+'</span>'+(fixed ? '<span class="badge">INCLUIDO</span>' : '')+'</span>'+
        '<span class="check">'+(fixed ? ICONS.lock : (isSelected(f) ? ICONS.checkSmall : ''))+'</span>';
      function toggle(){ toggleFeature(f, item); }
      item.addEventListener('click', toggle);
      item.addEventListener('keydown', function(e){
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
      });
      grid.appendChild(item);
    });
  }

  function toggleFeature(f, item){
    if (isFixed(f)) { motion.denyFeature(item); return; }
    var idx = state.selectedFeatures.indexOf(f);
    var selected = idx === -1;
    if (selected) state.selectedFeatures.push(f);
    else state.selectedFeatures.splice(idx, 1);
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-checked', String(selected));
    item.querySelector('.check').innerHTML = selected ? ICONS.checkSmall : '';
    motion.toggleFeature(item, selected);
  }

  function setGenerateReady(ready){
    btnGenerate.classList.toggle('active', ready);
    btnGenerate.setAttribute('aria-disabled', String(!ready));
    motion.generateReady(btnGenerate, ready);
  }

  function initBuilder(){
    btnGenerate = $('btn-generate');
    initModels();
    initFeatures();
    setGenerateReady(false);
    btnGenerate.addEventListener('click', function(){
      if (state.selectedModel) openBenefits();
    });
    motion.revealBuilder($('builder-section'));
  }

  // ===================== SECUENCIA DE BENEFICIOS =====================
  var benefitOverlay, benefitSeq, slides, finalSlide;
  var benefitsOpen = false;
  var transitioning = false;

  function initBenefits(){
    benefitOverlay = $('benefit-overlay');
    benefitSeq = $('benefit-seq');

    var html = '';
    BC.BENEFITS.forEach(function(b, i){
      html +=
        '<div class="benefit-slide" data-index="'+i+'">'+
          '<div class="glow"></div>'+
          ICONS.sparkles+
          '<h3>'+b.title+'</h3>'+
          '<p>'+b.desc+'</p>'+
          '<button type="button" class="btn-next" data-next>Siguiente '+ICONS.chevron+'</button>'+
          '<div class="progress-track"><div class="progress-fill" data-fill></div></div>'+
        '</div>';
    });
    html +=
      '<div class="benefit-final">'+
        '<h3>¡LISTO PARA EL ÉXITO!</h3>'+
        '<button type="button" class="btn-configure" id="btn-configure">CONFIGURAR MI MODELO</button>'+
      '</div>';
    benefitSeq.innerHTML = html;

    slides = benefitSeq.querySelectorAll('.benefit-slide');
    finalSlide = benefitSeq.querySelector('.benefit-final');

    Array.prototype.forEach.call(benefitSeq.querySelectorAll('[data-next]'), function(btn){
      btn.addEventListener('click', advanceBenefit);
    });
    $('btn-configure').addEventListener('click', function(){
      closeBenefits(openPreview);
    });
    // Saltear: va directo a la pantalla final.
    $('benefit-close').addEventListener('click', function(){
      if (state.benefitIndex < BC.BENEFITS.length) goToBenefit(BC.BENEFITS.length);
      else closeBenefits();
    });
  }

  function currentSlide(){
    return state.benefitIndex < BC.BENEFITS.length ? slides[state.benefitIndex] : finalSlide;
  }

  function showBenefit(i){
    state.benefitIndex = i;
    if (i >= BC.BENEFITS.length){
      finalSlide.classList.add('active');
      motion.enterFinal(finalSlide);
      return;
    }
    slides[i].classList.add('active');
    motion.enterBenefit(slides[i], BC.BENEFIT_DURATION, advanceBenefit);
  }

  function goToBenefit(i){
    if (transitioning || !benefitsOpen) return;
    transitioning = true;
    var leaving = currentSlide();
    motion.leaveBenefit(leaving, function(){
      leaving.classList.remove('active');
      transitioning = false;
      if (benefitsOpen) showBenefit(i);
    });
  }

  function advanceBenefit(){ goToBenefit(state.benefitIndex + 1); }

  function openBenefits(){
    benefitsOpen = true;
    transitioning = false;
    Array.prototype.forEach.call(slides, function(s){ s.classList.remove('active'); });
    finalSlide.classList.remove('active');
    lockScroll();
    motion.showOverlay(benefitOverlay);
    showBenefit(0);
  }

  function closeBenefits(then){
    if (!benefitsOpen) return;
    benefitsOpen = false;
    motion.stopProgress();
    motion.stopFinal();
    motion.hideOverlay(benefitOverlay, function(){
      currentSlide().classList.remove('active');
      unlockScroll();
      if (then) then();
    });
  }

  // ============================ PREVIEW ============================
  var previewOverlay, previewOpen = false;

  function initPreview(){
    previewOverlay = $('preview-overlay');
    $('preview-close').addEventListener('click', closePreview);
    $('btn-whatsapp').addEventListener('click', sendWhatsapp);
  }

  function openPreview(){
    var m = state.selectedModel;
    $('preview-media').innerHTML = m.image
      ? '<img src="'+m.image+'" alt="'+m.name+'">'
      : '<div>RENDER NO DISPONIBLE</div>';

    var list = $('preview-features');
    list.innerHTML = '';
    state.selectedFeatures.forEach(function(f){
      var el = document.createElement('div');
      el.className = 'preview-feature';
      el.innerHTML = '<span style="color:var(--pink); display:flex;">'+(isFixed(f) ? ICONS.lock : ICONS.checkSmall)+'</span>'+f;
      list.appendChild(el);
    });

    previewOpen = true;
    previewOverlay.scrollTop = 0;
    lockScroll();
    motion.showOverlay(previewOverlay);
    motion.enterPreview(previewOverlay);
  }

  function closePreview(){
    if (!previewOpen) return;
    previewOpen = false;
    motion.stopPreview();
    motion.hideOverlay(previewOverlay, unlockScroll);
  }

  function sendWhatsapp(){
    var included = state.selectedFeatures.filter(isFixed);
    var extras = state.selectedFeatures.filter(function(f){ return !isFixed(f); });
    var text = "Hola Beercoin! Estoy interesado en adquirir la franquicia. He configurado mi modelo:\n\n" +
      "*Modelo:* " + state.selectedModel.name + "\n" +
      "*Incluido:* " + included.join(', ') + "\n" +
      "*Adicionales:* " + (extras.join(', ') || 'Ninguno') + ".\n\n" +
      "Quiero avanzar con la cotización.";
    var url = "https://wa.me/" + BC.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
  }

  // ============================ TECLADO ============================
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape') return;
    if (benefitsOpen) closeBenefits();
    else if (previewOpen) closePreview();
  });

  // ============================= INIT =============================
  initHero();
  initInfoBlocks();
  initBuilder();
  initBenefits();
  initPreview();

})(window.BeerCoin = window.BeerCoin || {});
