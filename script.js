// ── NAV SCROLL
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('on',window.scrollY>36),{passive:true});

// ── MENU MOBILE
const hbg=document.getElementById('hbg');
const hico=document.getElementById('hico');
const mm=document.getElementById('mm');
let open=false;

function openMenu(){
  open=true;mm.style.display='flex';
  hico.innerHTML='<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>';
  document.body.style.overflow='hidden';
}
function closeMenu(){
  open=false;mm.style.display='none';
  hico.innerHTML='<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>';
  document.body.style.overflow='';
}
hbg.addEventListener('click',()=>open?closeMenu():openMenu());
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

// ── SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

// ── REVEAL ON SCROLL
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
  });
},{threshold:.05,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv,.rg').forEach(el=>io.observe(el));

// ── FORM MODE (Diagnostic gratuit / Call Audit Express)
// ── FORM SUBMIT (envoi direct par email, sans ouvrir la messagerie)
const leadForm=document.getElementById('leadForm');
const formMsg=document.getElementById('formMsg');
if(leadForm){
leadForm.addEventListener('submit', function(e){
  e.preventDefault();
  const btn=document.getElementById('submitBtn');
  const orig=btn.textContent;
  btn.disabled=true;
  btn.textContent='Envoi en cours...';
  formMsg.style.display='none';

  const data=new FormData(leadForm);
  fetch('https://formsubmit.co/ajax/hello@extremecomms.com', {
    method:'POST',
    headers:{'Accept':'application/json'},
    body:data
  })
  .then(r=>r.json())
  .then(()=>{
    btn.textContent='Message envoyé';
    btn.style.background='#1a7f4f';
    formMsg.textContent='Merci, votre demande a bien été transmise. Nous revenons vers vous rapidement.';
    formMsg.style.display='block';
    leadForm.reset();
    setTimeout(()=>{btn.textContent=orig;btn.style.background='';btn.disabled=false},5000);
  })
  .catch(()=>{
    btn.textContent=orig;
    btn.disabled=false;
    formMsg.textContent='Une erreur est survenue. Vous pouvez nous écrire directement à hello@extremecomms.com.';
    formMsg.style.display='block';
  });
});
}

// ── CALL AUDIT MODAL (formulaire interactif séparé, avec date et heure)
const auditModal=document.getElementById('auditModal');
function openAudit(){
  if(auditModal){auditModal.classList.add('open');document.body.style.overflow='hidden';}
}
function closeAudit(){
  if(auditModal){auditModal.classList.remove('open');document.body.style.overflow='';}
}
if(auditModal){
  auditModal.addEventListener('click', function(e){ if(e.target===auditModal) closeAudit(); });
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeAudit(); });

const auditForm=document.getElementById('auditForm');
const auditMsg=document.getElementById('auditMsg');
if(auditForm){
auditForm.addEventListener('submit', function(e){
  e.preventDefault();
  const btn=document.getElementById('auditSubmitBtn');
  const orig=btn.textContent;
  btn.disabled=true;
  btn.textContent='Envoi en cours...';
  auditMsg.style.display='none';

  const data=new FormData(auditForm);
  fetch('https://formsubmit.co/ajax/hello@extremecomms.com', {
    method:'POST',
    headers:{'Accept':'application/json'},
    body:data
  })
  .then(r=>r.json())
  .then(()=>{
    btn.textContent='Demande envoyée';
    btn.style.background='#1a7f4f';
    auditMsg.textContent='Merci, votre demande de Call Audit a bien été transmise. Nous vous confirmons le créneau par email ou téléphone.';
    auditMsg.style.display='block';
    auditForm.reset();
    setTimeout(()=>{btn.textContent=orig;btn.style.background='';btn.disabled=false;closeAudit();auditMsg.style.display='none'},4000);
  })
  .catch(()=>{
    btn.textContent=orig;
    btn.disabled=false;
    auditMsg.textContent='Une erreur est survenue. Vous pouvez nous écrire directement à hello@extremecomms.com.';
    auditMsg.style.display='block';
  });
});
}

// ── FR / EN LANGUAGE SWITCH ──
const I18N = {"nav.services": ["Services", "Services"], "nav.method": ["Méthode", "Method"], "nav.offers": ["Offres", "Offers"], "nav.contact": ["Contact", "Contact"], "nav.audit": ["Call Audit · 49 $", "Call Audit · $49"], "nav.cta": ["Parler de mon projet", "Talk about my project"], "mm.services": ["Services", "Services"], "mm.method": ["Notre méthode", "Our method"], "mm.offers": ["Offres & Tarifs", "Offers & Pricing"], "mm.start": ["Démarrer un projet", "Start a project"], "mm.audit": ["Call Audit · 49 $", "Call Audit · $49"], "mm.cta": ["Parler de mon projet", "Talk about my project"], "mm.diag": ["Diagnostic gratuit", "Free diagnostic"], "hero.kicker": ["Agence de communication sur mesure", "Bespoke communication agency"], "hero.loc": ["Basée à Kinshasa, RDC", "Based in Kinshasa, DRC"], "hero.title": ["Votre idée<br>mérite plus<br>qu'une belle<br><em>communication.</em>", "Your idea<br>deserves more<br>than a nice-<br><em>looking post.</em>"], "hero.sub": ["Nous construisons avec vous une communication pensée pour votre marque, votre marché et vos objectifs. Pas des posts. Des résultats.", "We build communication designed around your brand, your market and your goals. Not posts. Results."], "hero.cta1": ["Parler de mon projet", "Talk about my project"], "hero.cta2": ["Notre approche", "Our approach"], "clients.eyebrow": ["Ils nous ont fait confiance", "Trusted by"], "prob.eyebrow": ["Ce que nous observons", "What we see"], "prob.title": ["Votre communication doit <em>résoudre quelque chose.</em>", "Your communication needs to <em>solve something.</em>"], "prob.lead": ["Une marque peut être belle sans être claire. Une campagne peut être visible sans générer de demandes.", "A brand can be beautiful without being clear. A campaign can be visible without generating demand."], "prob.quote": ["Notre travail commence par comprendre ce qui doit changer.", "Our work starts by understanding what needs to change."], "ap.eyebrow": ["Notre méthode", "Our method"], "ap.title": ["Pas seulement des prestations.<br><em>Un accompagnement.</em>", "Not just services.<br><em>A partnership.</em>"], "ap.lead": ["Nous pouvons intervenir sur une mission précise ou devenir un véritable partenaire de communication.", "We can step in for a specific task or become a true communication partner."], "exp.eyebrow": ["Nos services", "Our services"], "exp.title": ["Ce que nous construisons<br>avec vous.", "What we build<br>with you."], "diag.eyebrow": ["Démarrer", "Get started"], "diag.title": ["Décrivez-nous votre situation.", "Tell us about your situation."], "diag.lead": ["Nous verrons ensemble comment la transformer en plan d'action concret.", "Together, we'll turn it into a concrete action plan."], "cta.eyebrow": ["Votre prochain projet", "Your next project"], "cta.title": ["Vous avez un objectif.<br><em>Construisons la réponse.</em>", "You have a goal.<br><em>Let's build the answer.</em>"], "cta.lead": ["Décrivez-nous votre situation. Nous verrons ensemble comment la transformer en plan d'action.", "Tell us about your situation. Together, we'll turn it into an action plan."], "cta.btn1": ["Décrire mon besoin gratuitement", "Describe my need for free"], "cta.btn2": ["Réserver un Call Audit · 49 $", "Book a Call Audit · $49"], "ft.tag": ["Agence de communication sur mesure : Branding, Contenu, Acquisition, Publicité & Solutions Digitales.", "Bespoke communication agency: Branding, Content, Acquisition, Advertising & Digital Solutions."], "ft.addr": ["Présence physique", "Physical presence"], "ft.h.services": ["Services", "Services"], "ft.s1": ["Branding & Identité", "Branding & Identity"], "ft.s2": ["Contenu & Vidéo", "Content & Video"], "ft.s3": ["Acquisition", "Acquisition"], "ft.s4": ["Publicité Digitale", "Digital Advertising"], "ft.s5": ["Solutions IA", "AI Solutions"], "ft.h.nav": ["Navigation", "Navigation"], "ft.n1": ["Notre méthode", "Our method"], "ft.n2": ["Accompagnements", "Offers"], "ft.n3": ["Diagnostic gratuit", "Free diagnostic"], "ft.n4": ["Call Audit · 49 $", "Call Audit · $49"], "ft.h.contact": ["Contact", "Contact"], "ft.copy": ["© 2025 Extrême Communication · Kinshasa, RDC · Tous droits réservés", "© 2025 Extrême Communication · Kinshasa, DRC · All rights reserved"], "about.eyebrow": ["Qui nous sommes", "Who we are"], "about.title": ["Une agence à taille humaine,<br><em>une méthode exigeante.</em>", "A human-sized agency,<br><em>a demanding method.</em>"], "about.p1": ["Extrême Communication accompagne des marques et des entreprises qui veulent que leur communication serve un objectif précis, pas seulement qu'elle soit belle. Nous pensons chaque projet comme une réponse à une situation réelle, avant de penser aux outils.", "Extrême Communication works with brands and companies who want their communication to serve a clear purpose, not just look good. We approach every project as an answer to a real situation, before thinking about tools."], "about.p2": ["Branding, contenu, acquisition, publicité et solutions digitales : nos expertises se combinent pour construire une communication cohérente, du positionnement jusqu'aux résultats.", "Branding, content, acquisition, advertising and digital solutions: our expertise combines to build coherent communication, from positioning through to results."], "offers.title": ["Trois formes<br>de collaboration.", "Three ways<br>to collaborate."], "explore.about": ["Découvrir l'agence", "Discover the agency"], "explore.expertise": ["Voir nos expertises", "See our expertise"], "explore.offers-eyebrow": ["Accompagnements", "Support plans"], "explore.offers": ["Voir les offres", "See our offers"]};
function setLang(lang){
  document.documentElement.setAttribute('lang', lang);
  const nodes = document.querySelectorAll('[data-i18n],[data-i18n-html]');
  nodes.forEach(el=>{ el.style.transition='opacity .16s ease'; el.style.opacity='0'; });
  setTimeout(()=>{
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(I18N[key]) el.textContent = I18N[key][lang === 'en' ? 1 : 0];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el=>{
      const key = el.getAttribute('data-i18n-html');
      if(I18N[key]) el.innerHTML = I18N[key][lang === 'en' ? 1 : 0];
    });
    nodes.forEach(el=>{ el.style.opacity='1'; });
  }, 160);
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
  try{ localStorage.setItem('ec_lang', lang); }catch(e){}
}
(function(){
  let saved = 'fr';
  try{ saved = localStorage.getItem('ec_lang') || 'fr'; }catch(e){}
  if(saved === 'en') setLang('en');
})();

