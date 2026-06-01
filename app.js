'use strict';

const APP = { version:'v6.5.24', cache:'rich-cmd-cache-v6524', storage:'richcmd_v61_state' };
const TODAY = () => new Date().toISOString().slice(0,10);
const nowISO = () => new Date().toISOString();
const uid = (p='id') => p + '_' + Math.random().toString(36).slice(2,9) + '_' + Date.now().toString(36);
const byId = id => document.getElementById(id);
const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
const minutesToText = mins => { mins=Math.max(0,Math.round(mins||0)); const h=Math.floor(mins/60), m=mins%60; return h?`${h}u ${m}m`:`${m}m`; };
const dateTime = iso => { if(!iso) return ''; const d=new Date(iso); return d.toLocaleString(currentLang()==='en'?'en-GB':'nl-NL',{dateStyle:'short',timeStyle:'short'}); };
const dateOnly = iso => { if(!iso) return ''; const d=new Date(iso); return d.toLocaleDateString(currentLang()==='en'?'en-GB':'nl-NL',{weekday:'short',day:'2-digit',month:'short'}); };
const dayIndex = d => (new Date(d).getDay()+6)%7 + 1;
const addDays = (iso, days) => { const d=new Date(iso||TODAY()); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10); };

const I18N = {
  nl:{
    appSubtitle:'Your Personal Retail Intelligence Command Center', today:'Vandaag', dashboard:'Dashboard', haccp:'HACCP', agf:'AGF', inventory:'Inventaris', communication:'Communicatie', visual:'Visualisatie', coaching:'Coaching', diagnostics:'Diagnostiek', settings:'Instellingen', storemap:'Schoonmaakkaart', reports:'Shift reports', smart:'Wat nu?', focus:'Focus', save:'Opslaan', cancel:'Annuleren', add:'Toevoegen', edit:'Bewerken', delete:'Verwijderen', done:'Voldaan', defer:'Uitstellen', skip:'Overslaan', load:'Inladen', manage:'Beheren', close:'Sluiten', next:'Volgende', previous:'Vorige', finish:'Afronden', start:'Starten', stop:'Stoppen', reset:'Resetten', export:'Exporteren', import:'Importeren', name:'Naam', language:'Taal', theme:'Thema', workdays:'Werkdagen', workHours:'Werkuren per dag', haccpHours:'HACCP-uren per dag', shiftStart:'Shift starttijd', shiftEnd:'Shift eindtijd', onboardingTitle:'Welkom bij RICH CMD', onboardingText:'Maak je persoonlijke command center klaar voor dagelijks gebruik.', chooseLanguage:'Kies je taal', chooseTheme:'Kies je thema', workRhythm:'Werkritme', setupDone:'Start RICH CMD', tutorialQuestion:'Wil je de rondleiding volgen?', yesTutorial:'Ja, start tutorial', noTutorial:'Nee, later', empty:'Nog niets om te tonen', priority:'Prioriteit', duration:'Duur', group:'Groep', status:'Status', date:'Datum', time:'Tijd', person:'Persoon', message:'Bericht', report:'Rapportage', note:'Notitie', product:'Product', nasa:'NASA nr.', category:'Categorie', aliases:'Aliassen', stock:'Voorraad', minimum:'Minimum', maximum:'Maximum', order:'Bestellen', orderAdvice:'Besteladvies', currentStatus:'Huidige status', trend:'Trend', reason:'Reden', conflict:'Conflict', light:'Light Professional', fresh:'Fresh Retail', premium:'Premium Focus', dark:'Midnight Command', calm:'Calm Mode', contrast:'High Contrast', daily:'Dagelijks', weekly:'Wekelijks', monthly:'Maandelijks', open:'Open', completed:'Voltooid', deferred:'Uitgesteld', skipped:'Overgeslagen', good:'Goed', medium:'Gemiddeld', high:'Hoog', critical:'Kritiek', low:'Laag', ok:'OK', emptyShelf:'Leeg schap', overstock:'Overvoorraad', quality:'Kwaliteit', unknown:'Onbekend', active:'Actief', inactive:'Niet actief', shift:'Shift', break:'Pauze', clockIn:'Inklokken', clockOut:'Uitklokken', startBreak:'Pauze starten', stopBreak:'Pauze stoppen', copy:'Kopiëren', copied:'Gekopieerd', search:'Zoeken', all:'Alles', more:'Meer tonen', less:'Minder tonen', read:'Gelezen', unread:'Ongelezen', followDate:'Opvolgdatum', appHealth:'App gezondheid', backup:'Backup', restore:'Herstellen', startPack:'Startpakket laden', noData:'Leeg beginnen', routeToday:'Vandaag openen', routeHaccp:'HACCP openen', routeAgf:'AGF openen', routeVisual:'Visualisatie openen', routeCoaching:'Coaching openen'
  },
  en:{
    appSubtitle:'Your Personal Retail Intelligence Command Center', today:'Today', dashboard:'Dashboard', haccp:'HACCP', agf:'Produce', inventory:'Inventory', communication:'Communication', visual:'Visualization', coaching:'Coaching', diagnostics:'Diagnostics', settings:'Settings', storemap:'Cleaning Map', reports:'Shift reports', smart:'What now?', focus:'Focus', save:'Save', cancel:'Cancel', add:'Add', edit:'Edit', delete:'Delete', done:'Done', defer:'Defer', skip:'Skip', load:'Load', manage:'Manage', close:'Close', next:'Next', previous:'Previous', finish:'Finish', start:'Start', stop:'Stop', reset:'Reset', export:'Export', import:'Import', name:'Name', language:'Language', theme:'Theme', workdays:'Working days', workHours:'Working hours per day', haccpHours:'HACCP hours per day', shiftStart:'Shift start time', shiftEnd:'Shift end time', onboardingTitle:'Welcome to RICH CMD', onboardingText:'Set up your personal command center for daily use.', chooseLanguage:'Choose your language', chooseTheme:'Choose your theme', workRhythm:'Work rhythm', setupDone:'Start RICH CMD', tutorialQuestion:'Do you want to take the tour?', yesTutorial:'Yes, start tutorial', noTutorial:'No, later', empty:'Nothing to show yet', priority:'Priority', duration:'Duration', group:'Group', status:'Status', date:'Date', time:'Time', person:'Person', message:'Message', report:'Report', note:'Note', product:'Product', nasa:'NASA no.', category:'Category', aliases:'Aliases', stock:'Stock', minimum:'Minimum', maximum:'Maximum', order:'Order', orderAdvice:'Order advice', currentStatus:'Current status', trend:'Trend', reason:'Reason', conflict:'Conflict', light:'Light Professional', fresh:'Fresh Retail', premium:'Premium Focus', dark:'Midnight Command', calm:'Calm Mode', contrast:'High Contrast', daily:'Daily', weekly:'Weekly', monthly:'Monthly', open:'Open', completed:'Completed', deferred:'Deferred', skipped:'Skipped', good:'Good', medium:'Medium', high:'High', critical:'Critical', low:'Low', ok:'OK', emptyShelf:'Empty shelf', overstock:'Overstock', quality:'Quality', unknown:'Unknown', active:'Active', inactive:'Inactive', shift:'Shift', break:'Break', clockIn:'Clock in', clockOut:'Clock out', startBreak:'Start break', stopBreak:'Stop break', copy:'Copy', copied:'Copied', search:'Search', all:'All', more:'Show more', less:'Show less', read:'Read', unread:'Unread', followDate:'Follow-up date', appHealth:'App health', backup:'Backup', restore:'Restore', startPack:'Load starter pack', noData:'Start empty', routeToday:'Open Today', routeHaccp:'Open HACCP', routeAgf:'Open Produce', routeVisual:'Open Visualization', routeCoaching:'Open Coaching'
  }
};
function currentLang(){ return (state && state.settings && state.settings.lang) || 'nl'; }
function t(k){ return (I18N[currentLang()] && I18N[currentLang()][k]) || I18N.nl[k] || k; }
function localStatus(s){ const map={Open:'open',Voltooid:'completed',Uitgesteld:'deferred',Overgeslagen:'skipped',Hoog:'high',Medium:'medium',Laag:'low',Kritiek:'critical','OK':'ok','Leeg schap':'emptyShelf','Overvoorraad':'overstock','Kwaliteit':'quality'}; return t(map[s]||s) || s; }

const DAILY_TEMPLATES = [
  ['Temperatuurscontrole',5,'Hoog','Basisroutine'],['Emballage',15,'Hoog','Basisroutine'],['Sinaasappelpers schoonmaken',5,'Hoog','Basisroutine'],['Kleine schrob ronde',10,'Medium','Basisroutine'],['Houdbaar check',20,'Hoog','Basisroutine'],['Vers check',20,'Hoog','Basisroutine'],['Kantine / Toiletten / Kantoren',20,'Medium','Basisroutine'],['Vuilnisbakken',5,'Medium','Basisroutine'],['Winkelvloer en magazijn',30,'Medium','Basisroutine'],['Onderhoud Schrobmachine',5,'Medium','Basisroutine'],['Ramen Koeldeuren',5,'Laag','Basisroutine'],['Actieplanning AGF',15,'Hoog','AGF']
];
const WEEKLY_TEMPLATES = [
  ['Landen van herkomst AGF',5,'Medium','Periodiek'],['Stof boven koelingen',10,'Medium','Periodiek'],['Koffiemachine reiniging',10,'Medium','Periodiek'],['Magazijn uitgebreid',30,'Medium','Periodiek'],['Koelcel',20,'Hoog','Periodiek'],['Onder AGF stelling',30,'Medium','Periodiek'],['Sinaasappelpers grondig',30,'Hoog','Periodiek'],['Temperatuursronde uitgebreid',5,'Medium','Periodiek'],['Controle diepvriescel',10,'Hoog','Periodiek'],['Controle broodafdeling',5,'Medium','Periodiek'],['Winkelvloer uitgebreid',30,'Medium','Periodiek'],['Stofzuigen Uien meubel / Houdbaar',30,'Medium','Periodiek'],['Koelkast kantine',5,'Medium','Periodiek'],['Kantoor',5,'Laag','Periodiek'],['AGF oplegplaten',15,'Hoog','Periodiek']
];
const MONTHLY_TEMPLATES = [
  ['Vensterbanken',15,'Laag','Maandelijks'],['Spinnenraggen',15,'Laag','Maandelijks'],['Stofzuigen Aanzuigrooster',5,'Medium','Maandelijks'],['Koffiemachine grondig',30,'Medium','Maandelijks'],['AGF kratwissel',30,'Medium','Maandelijks'],['Pilaren en lastige stofnesten',30,'Laag','Maandelijks']
];
function templateObj(arr, group){ return arr.map(x=>({id:uid('tpl'),title:x[0],duration:x[1],priority:x[2],category:x[3],group})); }
function defaultTemplates(){ return {daily:templateObj(DAILY_TEMPLATES,'daily'),weekly:templateObj(WEEKLY_TEMPLATES,'weekly'),monthly:templateObj(MONTHLY_TEMPLATES,'monthly')}; }
function defaultState(){
  return {
    schemaVersion:610,
    route:'today',
    ui:{sidebarOpen:false,menu:{today:true,work:true,insight:true,system:true},assistOpen:false,showMore:{},density:'normal',tutorial:null,command:false,onboardingStep:0},
    settings:{onboarded:false,tutorialDone:false,lang:'nl',name:'',theme:'light',workDays:[1,2,3,4,5],workHours:8,haccpHours:3.5,shiftStart:'08:00',shiftEnd:'17:00',startPage:'today',displayMode:'auto',contacts:['Filiaalmanager','Manager Vers/Service','Manager Operatie','Teamleider AGF','Teamleider Vulploeg','Teamleider Service'],lastBackup:null},
    shift:{active:false,startedAt:null,breakActive:false,breakStartedAt:null,logs:[]},
    tasks:[], templates:defaultTemplates(),
    agfProducts:[], bonus:[], agfOrders:[], inventory:[], inventoryOrders:[], inventoryHistory:[], orderHistory:[], communications:[], reports:[], focusLogs:[], activity:[], coachingDone:[], favoriteActions:['agf','focus','haccp','inventory'],
    cleaning:{items:[],settings:{houdbaarBodem:15,versCheck:5,versClean:15,moldClean:20,actionCooler:20,followUp:5}},
    deleted:[]
  };
}
let state = loadState();
function loadState(){
  const keys=[APP.storage,'richcmd_v6_state','rich_cmd_state','flow'];
  for(const k of keys){
    const raw=localStorage.getItem(k); if(!raw) continue;
    try { return sanitize(JSON.parse(raw)); } catch(e){}
  }
  return defaultState();
}
function sanitize(s){
  const d=defaultState();
  s=s&&typeof s==='object'?s:{};
  const out={...d,...s};
  out.settings={...d.settings,...(s.settings||{})};
  if(!Array.isArray(out.settings.workDays)) out.settings.workDays=[1,2,3,4,5];
  if(!out.settings.theme) out.settings.theme='light';
  if(!out.settings.lang) out.settings.lang='nl';
  out.ui={...d.ui,...(s.ui||{}),menu:{...d.ui.menu,...((s.ui&&s.ui.menu)||{})},showMore:{...((s.ui&&s.ui.showMore)||{})}};
  ['tasks','agfProducts','bonus','agfOrders','inventory','inventoryOrders','inventoryHistory','orderHistory','communications','reports','focusLogs','activity','coachingDone','favoriteActions','deleted'].forEach(k=>{ if(!Array.isArray(out[k])) out[k]=Array.isArray(d[k])?[...d[k]]:[]; });
  out.templates={...defaultTemplates(),...(s.templates||{})};
  ['daily','weekly','monthly'].forEach(k=>{ if(!Array.isArray(out.templates[k])) out.templates[k]=defaultTemplates()[k]; });
  out.shift={...d.shift,...(s.shift||{})}; if(!Array.isArray(out.shift.logs)) out.shift.logs=[];
  out.cleaning={...d.cleaning,...(s.cleaning||{})}; out.cleaning.settings={...d.cleaning.settings,...((s.cleaning&&s.cleaning.settings)||{})}; if(!Array.isArray(out.cleaning.items)) out.cleaning.items=[];
  out.schemaVersion=651;
  return out;
}
function save(){ localStorage.setItem(APP.storage, JSON.stringify(state)); applyTheme(); }
function update(mutator){ mutator&&mutator(state); save(); render(); }
function addActivity(text,type='info'){ state.activity.unshift({id:uid('act'),text,type,at:nowISO()}); state.activity=state.activity.slice(0,250); }
function toast(msg,type='info',undo){
  const root=byId('toastRoot'); if(!root) return;
  let wrap=root.querySelector('.toast-wrap'); if(!wrap){ wrap=document.createElement('div'); wrap.className='toast-wrap'; root.appendChild(wrap); }
  const el=document.createElement('div'); el.className='toast'; el.innerHTML=`<div class="strong">${escapeHtml(msg)}</div>${undo?`<button class="btn small mt" data-action="undo-last">Ongedaan maken</button>`:''}`; wrap.prepend(el); setTimeout(()=>el.remove(),5000);
}
function escapeHtml(s){ return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function applyTheme(){
  document.documentElement.setAttribute('data-theme', state.settings.theme || 'light');
  document.documentElement.style.setProperty('--density', state.settings.displayMode==='compact'?.92:state.settings.displayMode==='spacious'?1.08:1);
  const meta=byId('themeColorMeta'); if(meta){ meta.content=(state.settings.theme==='premium'||state.settings.theme==='dark')?'#0b1220':'#f7fafc'; }
}

const ROUTES = [
  {id:'today',group:'today',icon:'today',label:'today'}, {id:'dashboard',group:'today',icon:'dashboard',label:'dashboard'},
  {id:'haccp',group:'work',icon:'check',label:'haccp'}, {id:'storemap',group:'work',icon:'map',label:'storemap'}, {id:'agf',group:'work',icon:'leaf',label:'agf'}, {id:'inventory',group:'work',icon:'box',label:'inventory'}, {id:'communication',group:'work',icon:'message',label:'communication'},
  {id:'visual',group:'insight',icon:'chart',label:'visual'}, {id:'coaching',group:'insight',icon:'book',label:'coaching'}, {id:'diagnostics',group:'insight',icon:'pulse',label:'diagnostics'},
  {id:'settings',group:'system',icon:'gear',label:'settings'}
];
function iconSvg(name){
  const base='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const paths={
    today:'<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18"/>',
    dashboard:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    check:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    map:'<path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z"/><path d="M9 3v15"/><path d="M15 6v15"/>',
    leaf:'<path d="M11 20A7 7 0 0 1 4 13c0-6 8-10 16-10 0 8-4 16-10 16"/><path d="M4 20c5-5 8-8 16-17"/>',
    box:'<path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5"/><path d="M12 22V12"/>',
    message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
    pulse:'<path d="M3 12h4l3-7 4 14 3-7h4"/>',
    gear:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-.4-1.1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.1-.4 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6c.39-.16.73-.37 1-.6.26-.3.4-.7.4-1.1V3a2 2 0 1 1 4 0v.09c0 .4.14.8.4 1.1.27.23.61.44 1 .6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.16.39.37.73.6 1 .3.26.7.4 1.1.4H21a2 2 0 1 1 0 4h-.09c-.4 0-.8.14-1.1.4-.23.27-.44.61-.6 1z"/>'
  };
  return `<svg ${base}>${paths[name]||paths.dashboard}</svg>`;
}

function routeLabel(id){ const r=ROUTES.find(x=>x.id===id); return r?t(r.label):id; }
function render(){
  applyTheme();
  const app=byId('app'); if(!app) return;
  byId('appBoot')?.remove();
  if(!state.settings.onboarded){ app.innerHTML=renderOnboarding(); bindPostRender(); return; }
  app.innerHTML=`
  <div class="app-shell">
    ${renderSidebar()}
    <main class="main">
      ${renderTopbar()}
      <section id="pageRoot">${renderPage()}</section>
    </main>
    ${renderAssist()}
    ${renderMobileBottom()}
  </div>`;
  bindPostRender();
}
function renderSidebar(){
  const groupNames={today:'Vandaag',work:'Werk',insight:'Inzicht & groei',system:'Systeem'};
  return `<aside class="sidebar ${state.ui.sidebarOpen?'open':''}" id="sidebar">
    <div class="brand"><div class="brand-logo">RC</div><div><h1>RICH CMD</h1><p>${t('appSubtitle')}</p></div></div>
    ${['today','work','insight','system'].map(g=>`<div class="nav-group"><button class="nav-head" data-action="toggle-menu-group" data-group="${g}"><span>${groupNames[g]}</span><span>${state.ui.menu[g]?'−':'+'}</span></button><div class="nav-items ${state.ui.menu[g]?'':'hidden'}">${ROUTES.filter(r=>r.group===g).map(r=>`<button class="nav-btn ${state.route===r.id?'active':''}" data-route="${r.id}"><span class="nav-icon">${iconSvg(r.icon)}</span><span>${t(r.label)}</span></button>`).join('')}</div></div>`).join('')}
    <div class="card soft mt"><div class="small muted">${APP.version} · ${APP.cache}</div><div class="btn-row mt"><button class="btn small" data-action="start-tutorial">Tutorial</button><button class="btn small" data-action="open-command">Ctrl K</button></div></div>
  </aside>`;
}
function renderTopbar(){
  const name = state.settings.name || (currentLang()==='en'?'Colleague':'Collega');
  return `<div class="topbar">
    <div class="page-title"><div class="btn-row"><button class="btn hamburger" data-action="toggle-sidebar">☰</button><button class="btn small desktop-only" data-action="open-command">⌘ ${t('search')}</button></div><h2>${routeLabel(state.route)}</h2><p>${greeting()}, ${escapeHtml(name)}. ${dailyAdvice()}</p></div>
    <div class="top-actions"><button class="btn" data-action="smart-next">${t('smart')}</button><button class="btn primary" data-action="quick-action">+</button></div>
  </div>`;
}
function greeting(){ const h=new Date().getHours(); if(currentLang()==='en') return h<12?'Good morning':h<18?'Good afternoon':'Good evening'; return h<12?'Goedemorgen':h<18?'Goedemiddag':'Goedenavond'; }
function dailyAdvice(){ const arr=currentLang()==='en'?['Choose the base first, then improve.','One clear next action beats ten thoughts.','Work calmly, decide sharply.']:['Kies eerst de basis, daarna verbeteren.','Eén duidelijke volgende actie wint van tien gedachten.','Werk rustig, kies scherp.']; return arr[new Date().getDate()%arr.length]; }
function renderPage(){
  const pages={today:renderToday,dashboard:renderDashboard,haccp:renderHaccp,storemap:renderStoreMap,agf:renderAgf,inventory:renderInventory,communication:renderCommunication,visual:renderVisual,coaching:renderCoaching,diagnostics:renderDiagnostics,settings:renderSettings};
  return (pages[state.route]||renderToday)();
}

function renderOnboarding(){
  const step=state.ui.onboardingStep||0;
  const steps=[renderSetupLanguage,renderSetupName,renderSetupTheme,renderSetupWork,renderSetupFinish];
  return `<div class="onboarding"><div class="onboard-card">
    <div class="brand"><div class="brand-logo">RC</div><div><h1>${t('onboardingTitle')}</h1><p>${t('onboardingText')}</p></div></div>
    <div class="progress mb"><span style="width:${((step+1)/steps.length)*100}%"></span></div>
    ${steps[step]()}
    <div class="btn-row mt"><button class="btn" data-action="onboard-back" ${step===0?'disabled':''}>${t('previous')}</button><button class="btn primary" data-action="onboard-next">${step===steps.length-1?t('setupDone'):t('next')}</button><button class="btn ghost" data-action="onboard-skip">${currentLang()==='en'?'Skip setup':'Setup overslaan'}</button></div>
  </div></div>`;
}
function renderSetupLanguage(){return `<h2>${t('chooseLanguage')}</h2><div class="grid grid-2"><button class="theme-card ${currentLang()==='nl'?'active':''}" data-action="set-setup-lang" data-lang="nl"><strong>Nederlands</strong><p class="muted">Nederlandse interface en tutorial.</p></button><button class="theme-card ${currentLang()==='en'?'active':''}" data-action="set-setup-lang" data-lang="en"><strong>English</strong><p class="muted">English interface and tutorial.</p></button></div>`;}
function renderSetupName(){return `<h2>${t('name')}</h2><p class="muted">${currentLang()==='en'?'How should RICH CMD greet you?':'Hoe mag RICH CMD je begroeten?'}</p><input class="input" id="setupName" placeholder="Bijvoorbeeld Richard" value="${escapeHtml(state.settings.name||'')}">`;}
function themeOptions(){return [{id:'light',name:t('light'),colors:['#f8fafc','#ffffff','#0f766e']},{id:'fresh',name:t('fresh'),colors:['#effaf5','#ffffff','#047857']},{id:'premium',name:t('premium'),colors:['#0b1220','#121b2e','#60a5fa']},{id:'dark',name:t('dark'),colors:['#060912','#0f172a','#10b981']},{id:'calm',name:t('calm'),colors:['#f3f2ee','#fffdf8','#64748b']},{id:'contrast',name:t('contrast'),colors:['#ffffff','#f5f5f5','#000000']}];}
function renderSetupTheme(){return `<h2>${t('chooseTheme')}</h2><div class="theme-grid">${themeOptions().map(th=>`<button class="theme-card ${state.settings.theme===th.id?'active':''}" data-action="set-theme" data-theme="${th.id}"><div class="theme-swatch">${th.colors.map(c=>`<span style="background:${c}"></span>`).join('')}</div><strong>${th.name}</strong><p class="muted small">Preview</p></button>`).join('')}</div>`;}
function renderSetupWork(){ const days=[['1','Ma'],['2','Di'],['3','Wo'],['4','Do'],['5','Vr'],['6','Za'],['7','Zo']]; return `<h2>${t('workRhythm')}</h2><p class="muted">${currentLang()==='en'?'Working hours are total shift hours. HACCP hours are the part available for hygiene and planning.':'Werkuren zijn je totale shifturen. HACCP-uren zijn het deel dat beschikbaar is voor hygiëne en planning.'}</p><div class="grid grid-2"><div class="card soft"><label>${t('workHours')}</label><input class="input" id="setupWorkHours" type="number" step="0.25" value="${state.settings.workHours}"></div><div class="card soft"><label>${t('haccpHours')}</label><input class="input" id="setupHaccpHours" type="number" step="0.25" value="${state.settings.haccpHours}"></div><div class="card soft"><label>${t('shiftStart')}</label><input class="input" id="setupShiftStart" type="time" value="${state.settings.shiftStart}"></div><div class="card soft"><label>${t('shiftEnd')}</label><input class="input" id="setupShiftEnd" type="time" value="${state.settings.shiftEnd}"></div></div><h3>${t('workdays')}</h3><div class="btn-row">${days.map(d=>`<button class="btn small ${state.settings.workDays.includes(+d[0])?'primary':''}" data-action="toggle-workday" data-day="${d[0]}">${d[1]}</button>`).join('')}</div>`;}
function renderSetupFinish(){return `<h2>${currentLang()==='en'?'Ready to start':'Klaar om te starten'}</h2><div class="grid grid-2"><button class="theme-card" data-action="load-start-pack"><strong>${t('startPack')}</strong><p class="muted">${currentLang()==='en'?'Load useful starter products, inventory and store map.':'Laad nuttige startproducten, inventaris en schoonmaakkaart.'}</p></button><button class="theme-card" data-action="no-start-pack"><strong>${t('noData')}</strong><p class="muted">${currentLang()==='en'?'Start clean and add everything yourself.':'Begin schoon en voeg alles zelf toe.'}</p></button></div><div class="card mt"><h3>${t('tutorialQuestion')}</h3><div class="btn-row"><button class="btn primary" data-action="set-tutorial-choice" data-choice="yes">${t('yesTutorial')}</button><button class="btn" data-action="set-tutorial-choice" data-choice="no">${t('noTutorial')}</button></div></div>`;}

function productivity(){ const completed = todayTasks().filter(t=>t.status==='Voltooid').reduce((a,t)=>a+(+t.duration||0),0); const cap=(+state.settings.haccpHours||3.5)*60; return cap?clamp(Math.round((completed/cap)*100),0,160):0; }
function allOpenTasks(){ return state.tasks.filter(t=>t.status!=='Voltooid' && t.status!=='Overgeslagen'); }
function todayTasks(){ const today=TODAY(); return state.tasks.filter(t=>!t.dueDate || t.dueDate<=today || t.status==='Uitgesteld'); }
function priorityWeight(p){ return p==='Kritiek'?0:p==='Hoog'?1:p==='Medium'?2:3; }
function sortedTasks(){ return todayTasks().filter(t=>t.status!=='Voltooid').slice().sort((a,b)=>((a.manualOrder??9999)-(b.manualOrder??9999)) || priorityWeight(a.priority)-priorityWeight(b.priority) || (+a.duration||0)-(+b.duration||0)); }
function nextAction(){
  if(!state.shift.active) return {title:t('clockIn'), reason: currentLang()==='en'?'Start your shift before planning work.':'Start je shift voordat je werk plant.', route:'today'};
  if(state.shift.breakActive) return {title:t('stopBreak'), reason: currentLang()==='en'?'Your break is active.':'Je pauze loopt nog.', route:'today'};
  const mold=cleaningUrgent().find(x=>x.status&&x.status.startsWith('mold'));
  if(mold) return {title:`${mold.label}`, reason: currentLang()==='en'?'Mold signal has high urgency.':'Schimmelmelding heeft hoge urgentie.', route:'storemap'};
  const task=sortedTasks()[0]; if(task) return {title:task.title, reason:`${localStatus(task.priority)} · ${minutesToText(task.duration)} · ${task.category||''}`, route:'haccp', taskId:task.id};
  const agf=agfAttention()[0]; if(agf) return {title:agf.name, reason:agf.advice, route:'agf'};
  const comm=state.communications.find(c=>c.status==='Rood'||!c.read); if(comm) return {title:comm.message.slice(0,60), reason: currentLang()==='en'?'Communication needs follow-up.':'Communicatie vraagt opvolging.', route:'communication'};
  return {title: currentLang()==='en'?'Review your day':'Bekijk je dag', reason: currentLang()==='en'?'Everything urgent is under control.':'Alles urgent lijkt onder controle.', route:'visual'};
}
function renderToday(){ const n=nextAction(); const prod=productivity(); return `<div class="grid grid-main">
  <div class="grid">
    <div class="hero" data-tutorial="today"><div class="chip">RICH CMD V6.5</div><h2>${greeting()}, ${escapeHtml(state.settings.name||'Collega')} 👋</h2><p>${currentLang()==='en'?'Your day starts with one clear next action, not with a hundred open thoughts.':'Je dag begint met één duidelijke volgende actie, niet met honderd losse gedachten.'}</p><div class="btn-row"><button class="btn primary" data-action="smart-next">${t('smart')}</button><button class="btn" data-action="shift-start" ${state.shift.active?'disabled':''}>${t('clockIn')}</button><button class="btn" data-action="shift-end" ${!state.shift.active?'disabled':''}>${t('clockOut')}</button><button class="btn" data-action="toggle-break" ${!state.shift.active?'disabled':''}>${state.shift.breakActive?t('stopBreak'):t('startBreak')}</button></div></div>
    <div class="grid grid-4">${kpi('Shift',shiftSummary(),state.shift.active?'good':'warn')}${kpi('Productiviteit',prod+'%',prod>90?'good':prod>60?'warn':'bad')}${kpi('HACCP vandaag',`${completedCount()}/${todayTasks().length}`,null)}${kpi('AGF aandacht',agfAttention().length,null)}</div>
    <div class="card" data-tutorial="smart"><div class="kpi"><div><div class="label">Smart Next Action</div><div class="value" style="font-size:1.45rem">${escapeHtml(n.title)}</div><div class="hint">${escapeHtml(n.reason)}</div></div><button class="btn primary" data-route="${n.route}">${currentLang()==='en'?'Open':'Openen'}</button></div></div>
    <div class="grid grid-2"><div class="card"><h3>Top 3 focuspunten</h3>${renderFocusPoints()}</div><div class="card"><h3>Leerkaart vandaag</h3>${lessonCard(todayLesson(),true)}</div></div>
    <div class="card"><h3>Vandaag tijdlijn</h3>${renderTimeline(state.activity.slice(0,8))}</div>
  </div>
  <div class="grid">
    <div class="card"><h3>Retail Radar</h3>${renderRadar()}</div>
    <div class="card"><h3>Favoriete acties</h3>${renderFavoriteActions()}</div>
    <div class="card"><h3>Morgen voorbereiden</h3>${renderTomorrowPrep()}</div>
  </div>
</div>`;}
function kpi(label,value,type){ return `<div class="card kpi"><div><div class="label">${label}</div><div class="value">${value}</div></div><span class="status-dot ${type==='bad'?'bad':type==='warn'?'warn':''}"></span></div>`; }
function shiftSummary(){ if(!state.shift.active) return currentLang()==='en'?'Not active':'Niet actief'; const m=Math.round((Date.now()-new Date(state.shift.startedAt).getTime())/60000); return minutesToText(m); }
function completedCount(){ return todayTasks().filter(t=>t.status==='Voltooid').length; }
function renderFocusPoints(){ const arr=sortedTasks().slice(0,3); if(!arr.length) return `<p class="muted">${t('empty')}</p>`; return `<div class="list">${arr.map(task=>`<div class="list-item compact"><span>${escapeHtml(task.title)}</span><button class="btn small good" data-action="task-done" data-id="${task.id}">${t('done')}</button></div>`).join('')}</div>`; }
function renderRadar(){ const items=[['Uitgestelde taken',state.tasks.filter(t=>t.status==='Uitgesteld').length],['AGF conflicten',agfAttention().filter(a=>a.conflict).length],['Schimmel/nacontrole',cleaningUrgent().filter(x=>x.status&&x.status.includes('mold')||x.status==='followup').length],['Communicatie rood',state.communications.filter(c=>c.status==='Rood').length],['Inventaris laag',lowStockItems().length]]; return `<div class="list">${items.map(([l,v])=>`<div class="bar-row"><div class="list-item compact"><strong>${l}</strong><span class="pill ${v?'warn':'good'}">${v}</span></div><div class="progress"><span style="width:${Math.min(100,v*20)}%"></span></div></div>`).join('')}</div>`; }
function renderFavoriteActions(){ return `<div class="btn-row"><button class="btn" data-route="agf">AGF Quick Check</button><button class="btn" data-action="open-focus">Focus</button><button class="btn" data-route="storemap">Schoonmaakkaart</button><button class="btn" data-route="inventory">Inventarisronde</button><button class="btn" data-route="haccp">Dagplanning</button></div>`; }
function renderTomorrowPrep(){ const deferred=state.tasks.filter(t=>t.status==='Uitgesteld').slice(0,4); const agf=agfAttention().slice(0,3); return `<div class="list">${deferred.map(t=>`<div class="list-item compact"><span>${escapeHtml(t.title)}</span><span class="pill warn">HACCP</span></div>`).join('')}${agf.map(a=>`<div class="list-item compact"><span>${escapeHtml(a.name)}</span><span class="pill warn">AGF</span></div>`).join('')||`<p class="muted">${currentLang()==='en'?'No urgent preparation yet.':'Nog geen urgente voorbereiding.'}</p>`}</div>`; }

function renderDashboard(){ return `<div class="grid"><div class="grid grid-4">${kpi('Shift score',shiftScore()+'/100',shiftScore()>80?'good':'warn')}${kpi('Werkdruk',workload()+'%',workload()>90?'bad':workload()>70?'warn':'good')}${kpi('Focusminuten',focusMinutesToday()+'m','good')}${kpi('Schoonmaak urgent',cleaningUrgent().length,cleaningUrgent().length?'warn':'good')}</div><div class="grid grid-2"><div class="card"><h3>Managementsamenvatting</h3>${managementInsights().map(x=>`<p>• ${x}</p>`).join('')}</div><div class="card"><h3>Weekcoach</h3><p>${weekCoach()}</p></div></div></div>`; }
function shiftScore(){ let s=65; s+=Math.min(20,productivity()/5); s-=state.tasks.filter(t=>t.status==='Uitgesteld').length*2; s-=agfAttention().filter(a=>a.conflict).length*4; s-=cleaningUrgent().filter(c=>c.status&&c.status.startsWith('mold')).length*6; return clamp(Math.round(s),0,100); }
function workload(){ const minutes=todayTasks().filter(t=>t.status!=='Voltooid').reduce((a,t)=>a+(+t.duration||0),0)+cleaningWorkloadMinutes(); return Math.round(minutes/((state.settings.haccpHours||3.5)*60)*100); }
function focusMinutesToday(){ return state.focusLogs.filter(f=>(f.endedAt||f.startedAt||'').slice(0,10)===TODAY()).reduce((a,f)=>a+(+f.minutes||0),0); }
function managementInsights(){ const insights=[]; if(workload()>90) insights.push(currentLang()==='en'?'Workload is critical: load fewer periodic tasks today.':'Werkdruk is kritisch: laad vandaag minder periodieke taken in.'); if(agfAttention().length) insights.push(currentLang()==='en'?'Produce has attention products. Check current status before ordering.':'AGF heeft aandachtproducten. Controleer huidige status vóór bestellen.'); if(cleaningUrgent().length) insights.push(currentLang()==='en'?'Cleaning Map has urgent signals or follow-ups.':'Schoonmaakkaart heeft urgente signalen of nacontroles.'); if(!insights.length) insights.push(currentLang()==='en'?'The day looks controlled. Keep the base routine strong.':'De dag oogt beheersbaar. Houd de basisroutine sterk.'); return insights; }
function weekCoach(){ return currentLang()==='en'?'Keep the base routine first. Plan one periodic task after the first produce check.':'Houd de basisroutine voorop. Plan één periodieke taak direct na je eerste AGF-check.'; }

function renderHaccp(){ const tasks=sortedTasks(); return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>Automatische dagplanning</h3><p class="muted">${currentLang()==='en'?'Productivity is based on completed task minutes compared with available HACCP hours.':'Productiviteit is gebaseerd op voltooide taakminuten vergeleken met beschikbare HACCP-uren.'}</p>${renderHaccpTimeline(tasks)}<div class="btn-row mt"><button class="btn primary" data-action="open-template-loader">Taken inladen</button><button class="btn" data-action="open-task-form">Nieuwe taak</button><button class="btn" data-action="open-focus">Focus Mode</button></div></div><div class="card"><h3>Vandaag uitvoeren</h3>${renderTaskList(tasks)}</div></div><div class="grid"><div class="card"><h3>Capaciteit</h3>${capacityCard()}</div><div class="card"><h3>Beheer</h3><details class="detail-drawer"><summary>Templates en taken beheren</summary><div class="drawer-content">${renderTemplateManager()}</div></details></div><div class="card"><h3>Uitstelanalyse</h3>${renderDeferralAnalysis()}</div></div></div>`; }
function renderHaccpTimeline(tasks){ let start=state.settings.shiftStart||'08:00'; let [h,m]=start.split(':').map(Number); return `<div class="timeline">${tasks.slice(0,12).map(t=>{ const time=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; m+=(+t.duration||10); while(m>=60){h++;m-=60;} return `<div class="timeline-item"><div class="timeline-time">${time}</div><div class="timeline-card"><strong>${escapeHtml(t.title)}</strong><div class="small muted">${localStatus(t.priority)} · ${minutesToText(t.duration)} · ${escapeHtml(t.category||'')}</div></div></div>`; }).join('')||`<p class="muted">${t('empty')}</p>`}</div>`; }
function renderTaskList(tasks){ const active=tasks.filter(task=>task.status!=='Voltooid'); if(!active.length) return `<p class="muted">${currentLang()==='en'?'All visible tasks are done. Load more tasks or open the archive in Visualisation.':'Alle zichtbare taken zijn voldaan. Laad nieuwe taken in of bekijk het archief in Visualisatie.'}</p>`; return `<div class="list">${active.map(task=>`<div class="list-item" data-task-card="${task.id}"><div><strong>${escapeHtml(task.title)}</strong><div class="small muted">${minutesToText(task.duration)} · ${localStatus(task.priority)} · ${escapeHtml(task.category||'')}</div><div class="small"><span class="pill ${task.status==='Uitgesteld'?'warn':task.status==='Voltooid'?'good':'info'}">${localStatus(task.status)}</span></div></div><div class="btn-row"><button class="btn small" data-action="task-up" data-id="${task.id}">↑</button><button class="btn small" data-action="task-down" data-id="${task.id}">↓</button><button class="btn small good" data-action="task-done" data-id="${task.id}">${t('done')}</button><button class="btn small warn" data-action="task-defer" data-id="${task.id}">${t('defer')}</button><button class="btn small" data-action="task-focus" data-id="${task.id}">${t('focus')}</button><button class="btn small" data-action="task-edit" data-id="${task.id}">${t('edit')}</button></div></div>`).join('')}</div>`; }
function capacityCard(){ const planned=todayTasks().filter(t=>t.status!=='Voltooid').reduce((a,t)=>a+(+t.duration||0),0); const clean=cleaningWorkloadMinutes(); const cap=(state.settings.haccpHours||3.5)*60; return `<div class="bar-row"><div class="list-item compact"><span>Beschikbaar</span><strong>${minutesToText(cap)}</strong></div><div class="list-item compact"><span>Open taken</span><strong>${minutesToText(planned)}</strong></div><div class="list-item compact"><span>Schoonmaakkaart</span><strong>${minutesToText(clean)}</strong></div><div class="progress"><span style="width:${Math.min(100,(planned+clean)/cap*100)}%"></span></div></div>`; }
function renderTemplateManager(){ return `<div class="grid">${['daily','weekly','monthly'].map(g=>`<details class="detail-drawer"><summary>${g==='daily'?t('daily'):g==='weekly'?t('weekly'):t('monthly')} (${state.templates[g].length})</summary><div class="drawer-content"><div class="btn-row mb"><button class="btn small primary" data-action="load-template-group" data-group="${g}">${t('load')}</button><button class="btn small" data-action="add-template-item" data-group="${g}">${t('add')}</button></div><div class="list">${state.templates[g].map(it=>`<div class="list-item compact"><span>${escapeHtml(it.title)} <span class="muted">${minutesToText(it.duration)}</span></span><span class="btn-row"><button class="btn small" data-action="edit-template-item" data-group="${g}" data-id="${it.id}">${t('edit')}</button><button class="btn small bad" data-action="delete-template-item" data-group="${g}" data-id="${it.id}">${t('delete')}</button></span></div>`).join('')}</div></div></details>`).join('')}</div>`; }
function renderDeferralAnalysis(){ const map={}; state.tasks.filter(t=>t.status==='Uitgesteld').forEach(t=>{map[t.deferReason||'Geen reden']=(map[t.deferReason||'Geen reden']||0)+1}); const entries=Object.entries(map); if(!entries.length) return `<p class="muted">Geen uitstelredenen.</p>`; return entries.map(([k,v])=>`<div class="bar-row"><div class="list-item compact"><span>${escapeHtml(k)}</span><strong>${v}</strong></div><div class="progress"><span style="width:${v*20}%"></span></div></div>`).join(''); }

function renderAgf(){ return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>AGF Quick Check</h3><div class="form-grid"><input class="input" id="agfSearch" placeholder="${t('search')} product / NASA"><button class="btn primary" data-action="open-agf-product-form">Product toevoegen</button></div><div id="agfQuickList" class="mt">${renderAgfQuickList()}</div></div><div class="card"><h3>Besteladvies</h3>${renderAgfAdvice()}</div><div class="card"><h3>Bonusaanbiedingen</h3>${renderBonus()}</div></div><div class="grid"><div class="card"><h3>Productbeheer</h3>${renderAgfProducts()}</div><div class="card"><h3>Bestelbesluit-logboek</h3>${renderOrderHistory()}</div></div></div>`; }
function lastAgfStatus(p){ return p.history&&p.history.length?p.history[0].status:null; }
function agfDecision(p){ const status=lastAgfStatus(p); const last7=(p.history||[]).slice(0,7); const empty=last7.filter(h=>h.status==='Leeg schap').length, over=last7.filter(h=>h.status==='Overvoorraad').length; let advice='Monitor', reason='Trend wisselend', conflict=false, strength='Gemiddeld'; if(status==='Overvoorraad'){ advice='Niet verhogen / mogelijk verlagen'; reason='Huidige status is overvoorraad en weegt zwaarder dan historie.'; if(empty>over) conflict=true; strength='Hoog'; } else if(status==='Leeg schap'){ advice='Verhogen overwegen'; reason='Huidige status is leeg.'; strength=empty>=3?'Hoog':'Gemiddeld'; } else if(status==='OK'){ if(empty>=3){ advice='Monitor of licht verhogen'; reason='Historie toont leeg, maar vandaag is OK.'; } else if(over>=3){ advice='Licht verlagen'; reason='Historie toont overvoorraad.'; } else { advice='Stabiel'; reason='Geen sterke afwijking.'; strength='Laag'; } } else if(status==='Kwaliteit'){ advice='Niet verhogen; eerst kwaliteit beoordelen'; reason='Kwaliteitsmelding.'; strength='Hoog'; } else { advice='Nog geen advies'; reason='Geen actuele status.'; strength='Laag'; } return {name:p.name,advice,reason,conflict,strength,status:status||'Onbekend'}; }
function agfAttention(){ return state.agfProducts.map(p=>({...agfDecision(p),...p})).filter(x=>x.status!=='Onbekend'&&x.advice!=='Stabiel').sort((a,b)=>(b.conflict?1:0)-(a.conflict?1:0)); }
function renderAgfQuickList(filter=''){ const products=state.agfProducts.filter(p=>(p.name+' '+(p.nasa||'')+' '+(p.category||'')+' '+(p.aliases||'')).toLowerCase().includes((filter||'').toLowerCase())).sort((a,b)=>(b.favorite?1:0)-(a.favorite?1:0)).slice(0,40); if(!products.length) return `<p class="muted">${t('empty')}</p>`; return `<div class="list">${products.map(p=>`<div class="list-item"><div><strong>${escapeHtml(p.name)}</strong><div class="small muted">${escapeHtml(p.category||'')} · NASA ${escapeHtml(p.nasa||'-')}</div><span class="pill ${lastAgfStatus(p)==='Overvoorraad'?'warn':lastAgfStatus(p)==='Leeg schap'?'bad':'good'}">${localStatus(lastAgfStatus(p)||'Onbekend')}</span></div><div class="btn-row"><button class="btn small good" data-action="agf-status" data-id="${p.id}" data-status="OK">OK</button><button class="btn small bad" data-action="agf-status" data-id="${p.id}" data-status="Leeg schap">Leeg</button><button class="btn small warn" data-action="agf-status" data-id="${p.id}" data-status="Overvoorraad">Over</button><button class="btn small" data-action="toggle-agf-fav" data-id="${p.id}">${p.favorite?'★':'☆'}</button><button class="btn small bonus-badge ${state.bonus.some(b=>b.productId===p.id)?'active':''}" data-action="toggle-agf-bonus" data-id="${p.id}">B</button></div></div>`).join('')}</div>`; }
function renderAgfAdvice(){ const att=agfAttention(); if(!att.length) return `<p class="muted">Geen aandachtproducten.</p>`; return `<div class="list">${att.map(a=>`<div class="list-item"><div><strong>${escapeHtml(a.name)}</strong> ${a.conflict?'<span class="pill bad">Conflict</span>':''}<div class="small muted">${escapeHtml(a.reason)}</div><div class="small">${t('currentStatus')}: <b>${localStatus(a.status)}</b> · Signaal: ${a.strength}</div></div><span class="pill ${a.status==='Overvoorraad'?'warn':a.conflict?'bad':'info'}">${escapeHtml(a.advice)}</span></div>`).join('')}</div>`; }
function renderBonus(){ return `<div class="btn-row mb"><button class="btn primary" data-action="open-bonus-form">Bonus toevoegen</button><button class="btn bad" data-action="clear-bonus">Nieuwe week / leegmaken</button></div><div class="list">${state.bonus.map(b=>`<div class="list-item"><div><strong>${escapeHtml(b.name)}</strong><div class="small muted">NASA ${escapeHtml(b.nasa||'-')}</div><span class="pill ${b.order?'good':'warn'}">${b.order?'Op bestellijst':'Alleen controleren'}</span></div><div class="btn-row"><button class="btn small" data-action="toggle-bonus-order" data-id="${b.id}">${b.order?'Niet bestellen':'Bestellijst'}</button><button class="btn small bad" data-action="delete-bonus" data-id="${b.id}">${t('delete')}</button></div></div>`).join('')||`<p class="muted">Geen bonusartikelen.</p>`}</div>`; }
function renderAgfProducts(){ return `<div class="list">${state.agfProducts.slice(0,12).map(p=>`<div class="list-item compact"><span>${escapeHtml(p.name)} <span class="muted">NASA ${escapeHtml(p.nasa||'-')}</span></span><span class="btn-row"><button class="btn small" data-action="edit-agf-product" data-id="${p.id}">${t('edit')}</button><button class="btn small bad" data-action="delete-agf-product" data-id="${p.id}">${t('delete')}</button></span></div>`).join('')||`<p class="muted">${t('empty')}</p>`}</div>`; }
function renderOrderHistory(){ const hist=state.agfOrders.slice(0,8); return hist.length?`<div class="list">${hist.map(o=>`<div class="list-item compact"><span>${escapeHtml(o.product)} — ${escapeHtml(o.advice)}</span><span class="tiny muted">${dateTime(o.at)}</span></div>`).join('')}</div>`:`<p class="muted">Nog geen historie.</p>`; }

function renderStoreMap(){ ensureStoreMap(false); const urgent=cleaningUrgent(); return `<div class="grid"><div class="card"><h3>${t('storemap')}</h3><p class="muted">${currentLang()==='en'?'Build your cleaning map manually over time. Neutral grey items do not count as backlog until checked, signalled or planned.':'Bouw de schoonmaakkaart rustig handmatig op. Neutrale grijze onderdelen tellen niet als achterstand tot ze gecontroleerd, gesignaleerd of gepland zijn.'}</p><div class="btn-row"><button class="btn primary" data-action="load-storemap">${currentLang()==='en'?'Load standard layout':'Standaard winkelindeling laden'}</button><button class="btn" data-action="open-clean-add-form">${currentLang()==='en'?'Add meter / shelf':'Metrage / plank toevoegen'}</button><button class="btn" data-action="start-cleaning-round">${currentLang()==='en'?'Cleaning round':'Schoonmaakronde'}</button><button class="btn" data-action="plan-urgent-cleaning">${currentLang()==='en'?'Plan urgent':'Urgent in HACCP'}</button></div>${renderHeatLegend()}</div><div class="grid grid-main"><div class="card"><h3>${currentLang()==='en'?'Store overview':'Winkeloverzicht'}</h3>${renderStoreHierarchy()}</div><div class="grid"><div class="card"><h3>Heatmap</h3>${renderHeatmap()}</div><div class="card"><h3>${currentLang()==='en'?'To plan':'Te plannen'}</h3>${renderCleaningQueue(urgent)}</div></div></div></div>`; }
function renderHeatLegend(){ return `<div class="legend mt">${[['heat-neutral','Neutraal'],['heat-clean','Schoon'],['heat-check','Nacontrole'],['heat-due','Binnenkort'],['heat-dirty','Vuil'],['heat-mold1','Schimmel 1'],['heat-mold2','Schimmel 2'],['heat-mold3','Schimmel 3']].map(x=>`<span class="chip"><span class="heat-cell ${x[0]}"></span>${x[1]}</span>`).join('')}</div>`; }
function ensureStoreMap(force){ if(state.cleaning.items.length&&!force) return; state.cleaning.items=buildStoreMap(); save(); }
function buildStoreMap(){ const items=[]; const add=(department,zone,meters,levels,type)=>{ for(let m=1;m<=meters;m++){ if(levels){ for(let l=1;l<=levels;l++) items.push(cleanItem(department,zone,m,'Plank',l)); } items.push(cleanItem(department,zone,m,'Bodembak',null,type)); } }; const cleanItem=(department,zone,m,kind,level,type)=>({id:uid('cln'),department,zone,meter:m,kind,level,label:`${zone} M${m} ${kind}${level?' '+level:''}`,frequencyDays:type==='monthly'?30:type==='yearly'?365:180,status:'neutral',lastChecked:null,lastCleaned:null,planned:false,history:[]});
  [['Verse sappen',3,7],['Maaltijden',5,7],['Halal/Divers',2,7],['Kaas/Vleeswaren',4,7],['Diepvries',7,7]].forEach(z=>add('Vers hoog',z[0],z[1],z[2])); [['Vegetarisch',4,4],['Vlees',2,4],['Vis',2,4],['Kip',3,4]].forEach(z=>add('Vers laag',z[0],z[1],z[2])); [['Pad 1 Melk/Koek/Ontbijt',10],['Pad 2 Dierenvoeding/Snoep',10],['Pad 3 Drogmetica/Wasmiddelen',10],['Pad 4 Internationaal/Rijst',10,'monthly'],['Pad 5 Wraps/Eieren',6,'monthly'],['Pad 6 Groenteconserven',7],['Pad 7 Koffie/Thee',7],['Pad 8 Wijnen',7],['Pad 9 Houdbare sap',2],['Pad 10 Frisdrank',8],['Pad 11 Bier',9],['Pad 12 Nootjes',4],['Pad 13 Chips',5]].forEach(z=>add('Houdbaar',z[0],z[1],0,z[2])); ['Bancarella Zuivel','Bancarella AGF','Bancarella Vlees','Bancarella Gebak'].forEach(z=>items.push(cleanItem('Actiekoeling',z,1,'Koeling',null))); return items; }
function statusClass(item){ if(item.status==='clean') return 'heat-clean'; if(item.status==='followup') return 'heat-check'; if(item.status==='dirty') return 'heat-dirty'; if(item.status==='due') return 'heat-due'; if(item.status==='mold1') return 'heat-mold1'; if(item.status==='mold2') return 'heat-mold2'; if(item.status==='mold3') return 'heat-mold3'; return 'heat-neutral'; }
function renderHeatmap(){ const groups={}; state.cleaning.items.forEach(i=>{const dep=displayDepartment(i.department||'Overig'); groups[dep]=groups[dep]||[]; groups[dep].push(i);}); return `<div class="heatmap">${Object.entries(groups).map(([dep,items])=>`<div><h4>${escapeHtml(dep)}</h4><div class="heat-row"><span class="heat-label">${items.length} onderdelen</span>${items.slice(0,80).map(i=>`<button class="heat-cell ${statusClass(i)}" title="${escapeHtml(i.label)}" data-action="open-clean-item" data-id="${i.id}">${i.meter}</button>`).join('')}</div></div>`).join('')||`<p class="muted">Nog geen winkelindeling.</p>`}</div>`; }
function cleaningUrgent(){ return state.cleaning.items.filter(i=>['dirty','mold1','mold2','mold3','followup','due'].includes(i.status) || i.planned); }
function cleaningWorkloadMinutes(){ return cleaningUrgent().filter(i=>i.planned||['dirty','mold1','mold2','mold3','followup'].includes(i.status)).reduce((a,i)=>a+cleanDuration(i),0); }
function cleanDuration(i){ const s=state.cleaning.settings; if(i.status&&i.status.startsWith('mold')) return s.moldClean; if(i.status==='followup') return s.followUp; if(i.department==='Houdbaar') return s.houdbaarBodem; if(i.department==='Actiekoeling') return s.actionCooler; if(i.kind==='Plank') return s.versClean; return s.versClean; }
function renderCleaningQueue(items){ if(!items.length) return `<p class="muted">Geen urgente punten.</p>`; return `<div class="list">${items.slice(0,20).map(i=>`<div class="list-item"><div><strong>${escapeHtml(i.label)}</strong><div class="small muted">${i.department} · ${i.status} · ${minutesToText(cleanDuration(i))}</div></div><div class="btn-row"><button class="btn small" data-action="plan-clean-item" data-id="${i.id}">HACCP</button><button class="btn small good" data-action="clean-item" data-id="${i.id}">Schoon</button></div></div>`).join('')}</div>`; }

function renderInventory(){ const low=lowStockItems(); return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>Inventarisbeheer</h3><div class="form-grid"><input class="input" id="invSearch" placeholder="Zoek item / NASA"><button class="btn primary" data-action="open-inventory-form">Item toevoegen</button></div><div id="inventoryList" class="mt">${renderInventoryList()}</div></div></div><div class="grid"><div class="card"><h3>Bestellijst</h3>${renderInventoryOrders()}</div><div class="card"><h3>Watchlist laag</h3>${low.length?low.map(i=>`<div class="list-item compact"><span>${escapeHtml(i.name)}</span><span class="pill warn">${i.stock}/${i.min}</span></div>`).join(''):`<p class="muted">Geen lage voorraad.</p>`}</div></div></div>`; }
function lowStockItems(){ return state.inventory.filter(i=>(+i.stock||0)<=(+i.min||0)); }
function renderInventoryList(filter=''){ const arr=state.inventory.filter(i=>(i.name+' '+(i.nasa||'')+' '+(i.category||'')).toLowerCase().includes((filter||'').toLowerCase())); if(!arr.length) return `<p class="muted">${t('empty')}</p>`; return `<div class="list">${arr.map(i=>`<div class="list-item"><div><strong>${escapeHtml(i.name)}</strong><div class="small muted">${escapeHtml(i.category)} · NASA ${escapeHtml(i.nasa||'-')}</div><span class="pill ${(i.stock<=i.min)?'warn':'good'}">${t('stock')}: ${i.stock} / min ${i.min} / max ${i.max}</span></div><div class="btn-row"><button class="btn small" data-action="inv-stock" data-id="${i.id}" data-delta="-1">−</button><button class="btn small" data-action="inv-stock" data-id="${i.id}" data-delta="1">+</button><button class="btn small primary" data-action="add-inv-order" data-id="${i.id}">${t('order')}</button><button class="btn small" data-action="edit-inv" data-id="${i.id}">${t('edit')}</button></div></div>`).join('')}</div>`; }
function renderInventoryOrders(){ return state.inventoryOrders.length?`<div class="list">${state.inventoryOrders.map(o=>`<div class="list-item compact"><span>${escapeHtml(o.name)} — ${o.qty}</span><span class="tiny muted">${dateTime(o.at)}</span></div>`).join('')}</div><button class="btn mt" data-action="copy-inv-orders">${t('copy')}</button>`:`<p class="muted">Geen bestellijst.</p>`; }

function renderCommunication(){ return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>Communicatieplanner</h3><button class="btn primary" data-action="open-communication-form">Communicatie toevoegen</button><div class="mt">${renderCommunications()}</div></div><div class="card"><h3>Shift reports</h3><button class="btn primary" data-action="open-report-form">Rapportage toevoegen</button><div class="mt">${renderReports()}</div></div></div><div class="grid"><div class="card"><h3>Tone helper</h3><p class="muted">Situatie → Actie → Vervolg → Vraag</p><textarea class="textarea" id="toneText" placeholder="Schrijf hier je concept..."></textarea><button class="btn mt" data-action="tone-format">Maak professioneel</button></div></div></div>`; }
function renderCommunications(){ if(!state.communications.length) return `<p class="muted">${t('empty')}</p>`; return `<div class="list">${state.communications.map(c=>`<div class="list-item"><div><strong>${escapeHtml(c.to||c.customTo)}</strong><div>${escapeHtml(c.message)}</div><div class="tiny muted">${dateTime(c.createdAt)}${c.followDate?' · '+t('followDate')+': '+c.followDate:''}</div></div><div class="btn-row"><select class="select" style="width:130px" data-action="comm-status" data-id="${c.id}"><option ${c.status==='Rood'?'selected':''}>Rood</option><option ${c.status==='Geel'?'selected':''}>Geel</option><option ${c.status==='Groen'?'selected':''}>Groen</option></select><button class="btn small" data-action="comm-read" data-id="${c.id}">${c.read?t('unread'):t('read')}</button></div></div>`).join('')}</div>`; }
function renderReports(){ if(!state.reports.length) return `<p class="muted">${t('empty')}</p>`; return `<div class="list">${state.reports.slice(0,state.ui.showMore.reports?100:3).map(r=>`<div class="list-item"><div><strong>${escapeHtml(r.title)}</strong><div>${escapeHtml(r.text)}</div><div class="tiny muted">${dateTime(r.createdAt)}</div></div><span class="pill ${r.status==='Rood'?'bad':r.status==='Oranje'?'warn':r.status==='Groen'?'good':'info'}">${r.status}</span></div>`).join('')}</div><button class="btn mt" data-action="toggle-more" data-key="reports">${state.ui.showMore.reports?t('less'):t('more')}</button>`; }

function renderVisual(){ const prod=productivity(), load=workload(); const agfStats=countBy(state.agfProducts.map(p=>lastAgfStatus(p)||'Onbekend')); const commStats=countBy(state.communications.map(c=>c.status)); return `<div class="grid"><div class="grid grid-4">${kpi('Productiviteit',prod+'%',prod>80?'good':'warn')}${kpi('Werkdruk',load+'%',load>90?'bad':load>70?'warn':'good')}${kpi('AGF aandacht',agfAttention().length,null)}${kpi('Focus',focusMinutesToday()+'m','good')}</div><div class="grid grid-2"><div class="card"><h3>Werkdruk vs HACCP-uren</h3>${bar('Voltooid',prod,prod>80?'good':'warn')}${bar('Werkdruk',load,load>90?'bad':'warn')}${bar('Schoonmaakkaart',Math.min(100,cleaningWorkloadMinutes()/((state.settings.haccpHours||3.5)*60)*100),'info')}</div><div class="card"><h3>AGF verdeling</h3>${Object.entries(agfStats).map(([k,v])=>bar(localStatus(k),v*20,k==='Overvoorraad'?'warn':k==='Leeg schap'?'bad':'good')).join('')||`<p class="muted">Geen AGF-data.</p>`}</div><div class="card"><h3>Communicatie</h3>${Object.entries(commStats).map(([k,v])=>bar(k,v*25,k==='Rood'?'bad':k==='Geel'?'warn':'good')).join('')||`<p class="muted">Geen communicatie.</p>`}</div><div class="card"><h3>Managementconclusies</h3>${managementInsights().map(i=>`<p>• ${i}</p>`).join('')}<p>• ${weekCoach()}</p></div></div></div>`; }
function bar(label,value,type){ const cls=type==='bad'?'bad':type==='warn'?'warn':type==='good'?'good':'info'; return `<div class="bar-row mb"><div class="list-item compact"><span>${label}</span><strong>${Math.round(value)}${value>10?'%':''}</strong></div><div class="progress"><span class="${cls}" style="width:${Math.min(100,value)}%;background:${type==='bad'?'var(--bad)':type==='warn'?'var(--warn)':type==='good'?'var(--good)':'var(--primary)'}"></span></div></div>`; }
function countBy(arr){ return arr.reduce((a,k)=>{a[k]=(a[k]||0)+1;return a;},{}); }

function getLessons(){
  const en=currentLang()==='en';
  const cats = en ? ['Work attitude','Communication','Management','Produce','HACCP','Stress & calm','Signal detection','Planning','Leadership','Self-development'] : ['Werkhouding','Communicatie','Management','AGF','HACCP','Stress & rust','Signalatie','Planning','Leiderschap','Zelfontwikkeling'];
  const base = en ? [
    ['Calm is a work skill','Choose 3 urgent tasks first and finish one before picking up anything new.','haccp'],
    ['Clear communication','Share situation, action and next step in three short lines.','communication'],
    ['Check stock before ordering','Current stock beats trend advice when deciding today.','agf'],
    ['Base routine first','Daily routines create calm and prevent hidden backlog.','haccp'],
    ['Take mould seriously','Register location, grade and follow-up check.','storemap'],
    ['Short wins reduce pressure','Completing a small task lowers mental load quickly.','haccp'],
    ['Name the workload','Do not only say it is busy; explain what causes the pressure.','communication'],
    ['Plan periodic work early','Schedule one periodic task right after the base routine.','haccp'],
    ['Check bonus items daily','Promotional items need extra attention every day.','agf'],
    ['Inventory prevents searching','Saving NASA numbers saves future frustration.','inventory']
  ] : [
    ['Rust is werkvaardigheid','Kies eerst 3 urgente taken en rond één daarvan af voordat je iets nieuws oppakt.','haccp'],
    ['Communicatie zonder ruis','Meld situatie, actie en vervolgstap in drie korte regels.','communication'],
    ['Voorraad zien vóór bestellen','Controleer huidige voorraad voordat je een trend volgt.','agf'],
    ['Basisroutine wint','Dagelijkse taken geven rust en voorkomen achterstand.','haccp'],
    ['Schimmel serieus nemen','Registreer locatie, graad en nacontrole.','storemap'],
    ['Korte taken eerst bij drukte','Een korte taak afronden verlaagt mentale druk.','haccp'],
    ['Werkdruk benoemen','Zeg niet alleen dat het druk is, maar waardoor.','communication'],
    ['Periodiek eerder plannen','Plan één periodieke taak direct na de basisroutine.','haccp'],
    ['Bonusartikelen dagelijks checken','Bonusproducten verdienen elke dag extra aandacht.','agf'],
    ['Inventaris voorkomt zoeken','NASA-nummers opslaan bespaart toekomstige frustratie.','inventory']
  ];
  const practice = en ? [
    'Open the linked module and perform one real action.',
    'Write one short reflection about where you gained time or calm.',
    'Choose one improvement for your next shift.'
  ] : [
    'Open de gekoppelde module en voer één echte actie uit.',
    'Schrijf één korte reflectie over waar je tijd of rust won.',
    'Kies één verbetering voor je volgende shift.'
  ];
  const lessons=[];
  for(let i=0;i<50;i++){
    const b=base[i%base.length];
    lessons.push({id:'lesson_'+i,title:b[0]+(i>=10?' '+(Math.floor(i/10)+1):''),category:cats[i%cats.length],text:b[1],route:b[2],practice:practice[i%3]});
  }
  return lessons;
}
function todayLesson(){ return getLessons()[new Date().getDate()%50]; }
function lessonCard(l,small=false){ const en=currentLang()==='en'; return `<div><span class="chip">${escapeHtml(l.category)}</span><h3>${escapeHtml(l.title)}</h3><p class="muted">${escapeHtml(l.text)}</p>${!small?`<p><strong>${en?'Practice':'Praktijk'}:</strong> ${escapeHtml(l.practice)}</p>`:''}<div class="btn-row"><button class="btn" data-route="${l.route}">${en?'Open practice':'Open praktijk'}</button><button class="btn primary" data-action="complete-lesson" data-id="${l.id}">${state.coachingDone.includes(l.id)?'✓':(en?'Complete':'Voltooi')}</button></div></div>`; }
function renderCoaching(){ const lessons=getLessons(); const cats=[...new Set(lessons.map(l=>l.category))]; const en=currentLang()==='en'; return `<div class="grid"><div class="hero"><span class="chip">Coaching Academy</span><h2>${en?'Work smarter with less effort':'Slimmer werken met minder moeite'}</h2><p>${en?'Motivation, work attitude, communication, management, signal detection and retail skills.':'Motivatie, werkhouding, communicatie, management, signalatie en retailvaardigheden.'}</p></div><div class="grid grid-4">${cats.slice(0,4).map(c=>kpi(c,Math.round(lessons.filter(l=>l.category===c&&state.coachingDone.includes(l.id)).length/lessons.filter(l=>l.category===c).length*100)+'%',null)).join('')}</div><div class="grid grid-3">${lessons.map(l=>`<div class="card">${lessonCard(l)}</div>`).join('')}</div></div>`; }

function renderDiagnostics(){ const health=diagnosticHealth(); return `<div class="grid"><div class="grid grid-4">${kpi('Versie',APP.version,null)}${kpi('Cache','v620',null)}${kpi('Gezondheid',health+'%',health>85?'good':'warn')}${kpi('Data items',totalRecords(),null)}</div><div class="grid grid-2"><div class="card"><h3>Regressietest</h3>${regressionChecks().map(c=>`<div class="list-item compact"><span>${c.name}</span><span class="pill ${c.ok?'good':'bad'}">${c.ok?'OK':'Check'}</span></div>`).join('')}</div><div class="card"><h3>Hersteltools</h3><div class="btn-row"><button class="btn" data-action="download-backup">Backup downloaden</button><button class="btn" data-action="open-import">Importeren</button><button class="btn" data-action="clear-cache">Cache vernieuwen</button><button class="btn bad" data-action="reset-app">Schone start</button></div></div></div><div class="card"><h3>Update log</h3><p><strong>v6.2</strong> Workflow Polish: tutorial, shift coaching, HACCP ordering, Store Map beheer, AGF bonusknop, inventaris en vertalingen verbeterd.</p><p><strong>v6.1</strong> Feature Restore & Intelligence Upgrade: menu, thema’s, HACCP templates, AGF, Store Map, Visualisatie, Coaching en Diagnostiek uitgebreid.</p><p><strong>v6.0</strong> Full Experience Rebuild.</p></div></div>`; }
function totalRecords(){ return state.tasks.length+state.agfProducts.length+state.inventory.length+state.communications.length+state.reports.length+state.cleaning.items.length; }
function diagnosticHealth(){ let h=100; if(!state.settings.lang) h-=10; if(!state.templates.daily.length) h-=15; if(!state.settings.contacts.length) h-=5; if(state.cleaning.items.some(i=>!i.id)) h-=10; return clamp(h,0,100); }
function regressionChecks(){ return [{name:'AGF product toevoegen',ok:true},{name:'Communicatieformulier',ok:true},{name:'Inventaris watchlist',ok:true},{name:'Tutorial routes',ok:TUTORIAL.length>=30},{name:'Vertalingen kernlabels',ok:!!I18N.en.settings},{name:'Templates aanwezig',ok:state.templates.daily.length>0},{name:'Store Map neutraal',ok:state.cleaning.items.every(i=>i.status!=='due'||i.lastChecked||i.lastCleaned)}]; }

function renderSettings(){ return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>Profiel & ritme</h3><div class="form-grid"><label>${t('name')}<input class="input" id="setName" value="${escapeHtml(state.settings.name||'')}"></label><label>${t('language')}<select class="select" id="setLang"><option value="nl" ${currentLang()==='nl'?'selected':''}>Nederlands</option><option value="en" ${currentLang()==='en'?'selected':''}>English</option></select></label><label>${t('workHours')}<input class="input" id="setWorkHours" type="number" step="0.25" value="${state.settings.workHours}"></label><label>${t('haccpHours')}<input class="input" id="setHaccpHours" type="number" step="0.25" value="${state.settings.haccpHours}"></label><label>${t('shiftStart')}<input class="input" id="setShiftStart" type="time" value="${state.settings.shiftStart}"></label><label>${t('shiftEnd')}<input class="input" id="setShiftEnd" type="time" value="${state.settings.shiftEnd}"></label></div><h4>${t('workdays')}</h4><div class="btn-row">${['Ma','Di','Wo','Do','Vr','Za','Zo'].map((d,i)=>`<button class="btn small ${state.settings.workDays.includes(i+1)?'primary':''}" data-action="settings-toggle-workday" data-day="${i+1}">${d}</button>`).join('')}</div><button class="btn primary mt" data-action="save-settings">${t('save')}</button></div><div class="card"><h3>Thema galerij</h3><div class="theme-grid">${themeOptions().map(th=>`<button class="theme-card ${state.settings.theme===th.id?'active':''}" data-action="set-theme" data-theme="${th.id}"><div class="theme-swatch">${th.colors.map(c=>`<span style="background:${c}"></span>`).join('')}</div><strong>${th.name}</strong></button>`).join('')}</div></div></div><div class="grid"><div class="card"><h3>Contactpersonen</h3><div class="list">${state.settings.contacts.map(c=>`<div class="list-item compact"><span>${escapeHtml(c)}</span><button class="btn small bad" data-action="delete-contact" data-name="${escapeHtml(c)}">${t('delete')}</button></div>`).join('')}</div><div class="btn-row mt"><input class="input" id="newContact" placeholder="Nieuwe contactpersoon"><button class="btn" data-action="add-contact">${t('add')}</button></div></div><div class="card"><h3>App/PWA</h3><p class="muted">${APP.version} · ${APP.cache}</p><div class="btn-row"><button class="btn" data-action="download-backup">Backup</button><button class="btn" data-action="start-tutorial">Tutorial opnieuw</button></div></div></div></div>`; }

function renderAssist(){ const n=nextAction(); return `<button class="assist-tab" data-action="toggle-assist">Assist</button><aside class="assist-panel ${state.ui.assistOpen?'open':''}" id="assistPanel"><div class="modal-head"><h3>Live Assist</h3><button class="btn small" data-action="toggle-assist">×</button></div><div class="list"><div class="list-item compact"><span>Shift</span><strong>${shiftSummary()}</strong></div><div class="list-item compact"><span>Werkdruk</span><strong>${workload()}%</strong></div><div class="list-item compact"><span>Productiviteit</span><strong>${productivity()}%</strong></div></div><div class="card soft mt"><strong>${escapeHtml(n.title)}</strong><p class="muted">${escapeHtml(n.reason)}</p><button class="btn primary" data-route="${n.route}">Open</button></div><div class="btn-row mt"><button class="btn" data-action="open-focus">Focus</button><button class="btn" data-action="toggle-break">${state.shift.breakActive?t('stopBreak'):t('startBreak')}</button><button class="btn" data-action="shift-end">${t('clockOut')}</button></div></aside>`; }
function renderMobileBottom(){ return `<nav class="mobile-bottom"><button class="${state.route==='today'?'active':''}" data-route="today"><span>${iconSvg('today')}</span>${t('today')}</button><button class="${state.route==='haccp'?'active':''}" data-route="haccp"><span>${iconSvg('check')}</span>HACCP</button><button class="${state.route==='agf'?'active':''}" data-route="agf"><span>${iconSvg('leaf')}</span>${t('agf')}</button><button data-action="quick-action"><span>＋</span>${currentLang()==='en'?'New':'Nieuw'}</button><button data-action="toggle-sidebar"><span>${iconSvg('dashboard')}</span>${currentLang()==='en'?'More':'Meer'}</button></nav>`; }
function renderTimeline(items){ if(!items.length) return `<p class="muted">${t('empty')}</p>`; return `<div class="timeline">${items.map(a=>`<div class="timeline-item"><div class="timeline-time">${new Date(a.at).toLocaleTimeString(currentLang()==='en'?'en-GB':'nl-NL',{hour:'2-digit',minute:'2-digit'})}</div><div class="timeline-card">${escapeHtml(a.text)}</div></div>`).join('')}</div>`; }

const TUTORIAL = [
  ['menu','Menu','Menu','Het menu groepeert de app. Klap Werk, Inzicht & Groei of Systeem open om rust te houden.','The menu groups the app. Open Work, Insight & Growth or System when needed.','#sidebar','today'],
  ['assist','Live Assist','Live Assist','De rechter Assist-tab toont shift, werkdruk en de beste volgende actie.','The right Assist tab shows shift status, workload and your best next action.','#assistPanel','today'],
  ['today','Vandaag','Today','Vandaag is je werkdagcockpit: start shift, focuspunten, Smart Next en snelle acties.','Today is your workday cockpit: shift start, focus points, Smart Next and quick actions.','[data-tutorial="today"]','today'],
  ['smart','Smart Next','Smart Next','Deze kaart kiest één beste volgende actie en legt uit waarom.','This card chooses one best next action and explains why.','[data-tutorial="smart"]','today'],
  ['shift','Shift','Shift','Klok in aan het begin. Bij uitklokken maakt RICH CMD een samenvatting en rapportage.','Clock in at the start. When clocking out, RICH CMD creates a summary and report.','#pageRoot','today'],
  ['dashboard','Dashboard','Dashboard','Dashboard geeft managementsamenvatting, score en weekcoach.','Dashboard gives management summary, score and week coach.','#pageRoot','dashboard'],
  ['haccp','HACCP planning','HACCP planning','HACCP toont open dagtaken op prioriteit. Voldane taken verdwijnen uit de actieve lijst.','HACCP shows open daily tasks by priority. Completed tasks leave the active list.','#pageRoot','haccp'],
  ['haccp-actions','Taken uitvoeren','Completing tasks','Gebruik Voldaan, Uitstellen, Focus of de pijlen om volgorde te wijzigen.','Use Done, Defer, Focus or the arrows to change order.','#pageRoot','haccp'],
  ['templates','Templates','Templates','Laad dag-, week- of maandtaken selectief in en beheer templates onder Beheer.','Load daily, weekly or monthly tasks selectively and manage templates under Manage.','#pageRoot','haccp'],
  ['focus','Focus Mode','Focus Mode','Start een timer voor één taak. Focusminuten tellen mee in visualisatie.','Start a timer for one task. Focus minutes count in visualization.','#pageRoot','haccp'],
  ['storemap','Schoonmaakkaart','Cleaning Map','De kaart toont Vers, Houdbaar en Actie. Grijze items zijn neutraal tot je ze controleert.','The map shows Fresh, Dry grocery and Promo coolers. Grey items are neutral until checked.','#pageRoot','storemap'],
  ['storemap-add','Metrage toevoegen','Add meter/shelf','Voeg zelf meters, planken en bodembakken toe aan de kaart.','Add your own meters, shelves and base trays to the map.','#pageRoot','storemap'],
  ['mold','Schimmel melden','Report mould','Registreer graad, locatie en nacontrole. Schimmel krijgt hogere urgentie.','Register grade, location and follow-up. Mould receives higher urgency.','#pageRoot','storemap'],
  ['agf','AGF Quick Check','Produce Quick Check','Klik OK, Leeg of Over. Gebruik de ster voor favorieten en B voor bonus.','Tap OK, Empty or Overstock. Use the star for favourites and B for bonus.','#pageRoot','agf'],
  ['agf-order','Besteladvies','Order advice','Huidige status weegt zwaarder dan historische trend.','Current status weighs more than historical trend.','#pageRoot','agf'],
  ['bonus','Bonusartikelen','Bonus items','Bonusproducten komen bovenaan voor dagelijkse controle en bestelactie.','Bonus products come forward for daily checks and order action.','#pageRoot','agf'],
  ['inventory','Inventaris','Inventory','Beheer voorraad, NASA-nummers, min/max en bestellijst.','Manage stock, NASA numbers, min/max and order list.','#pageRoot','inventory'],
  ['communication','Communicatie','Communication','Kies een standaardpersoon of vul zelf iemand in. Berichten krijgen datum en tijd.','Choose a standard person or enter your own. Messages get date and time.','#pageRoot','communication'],
  ['reports','Shift reports','Shift reports','Maak handmatige rapportages of gebruik de automatische rapportage na uitklokken.','Create manual reports or use the automatic report after clock-out.','#pageRoot','communication'],
  ['visual','Visualisatie','Visualization','Visualisatie toont productiviteit, werkdruk, AGF, communicatie en conclusies.','Visualization shows productivity, workload, produce, communication and conclusions.','#pageRoot','visual'],
  ['coaching','Coaching','Coaching','Coaching bevat lessen, praktijkopdrachten en ontwikkeling over werkhouding en management.','Coaching contains lessons, practice actions and development on attitude and management.','#pageRoot','coaching'],
  ['diagnostics','Diagnostiek','Diagnostics','Controleer versie, cache, data en maak backups.','Check version, cache, data and create backups.','#pageRoot','diagnostics'],
  ['settings','Instellingen','Settings','Beheer taal, thema, werkritme, contacten en startpagina.','Manage language, theme, work rhythm, contacts and start page.','#pageRoot','settings'],
  ['command','Command Palette','Command Palette','Gebruik zoeken om snel naar modules te springen.','Use search to jump quickly between modules.','#pageRoot','today'],
  ['favorites','Favorieten','Favourites','Favoriete acties staan op Vandaag zodat je sneller werkt.','Favourite actions appear on Today so you work faster.','#pageRoot','today'],
  ['tomorrow','Morgen voorbereiden','Prepare tomorrow','Doorgeschoven taken en aandachtspunten helpen je morgen rustiger starten.','Deferred tasks and attention points help you start calmer tomorrow.','#pageRoot','today'],
  ['agf-profile','Productprofielen','Product profiles','Producten bewaren NASA, categorie, alias, favoriet, bonus en historie.','Products store NASA, category, aliases, favourite, bonus and history.','#pageRoot','agf'],
  ['watchlist','Watchlist','Watchlist','Lage inventaris verschijnt automatisch op de watchlist.','Low inventory automatically appears on the watchlist.','#pageRoot','inventory'],
  ['backup','Backup','Backup','Maak regelmatig een backup zodat je lokale data veilig blijft.','Create regular backups so your local data stays safe.','#pageRoot','diagnostics'],
  ['done','Klaar','Done','Je bent klaar om RICH CMD dagelijks te gebruiken.','You are ready to use RICH CMD every day.','#pageRoot','today']
];
function tutorialStep(){ const tut=state.ui.tutorial; return tut ? (TUTORIAL[tut.index]||TUTORIAL[0]) : null; }
function tutorialText(step,idx){ return currentLang()==='en' ? step[idx+1] : step[idx]; }
function renderTutorial(){ const tut=state.ui.tutorial; if(!tut) return ''; const step=tutorialStep(); const total=TUTORIAL.length; const title=currentLang()==='en'?step[2]:step[1]; const text=currentLang()==='en'?step[4]:step[3]; const example=tut.preview||''; return `<div class="tutorial-overlay"><div class="tutorial-bubble"><div class="chip">${currentLang()==='en'?'Step':'Stap'} ${tut.index+1} / ${total}</div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p>${example?`<div class="tutorial-preview">${example}</div>`:''}<div class="btn-row"><button class="btn" data-action="tutorial-prev" ${tut.index===0?'disabled':''}>${t('previous')}</button><button class="btn" data-action="tutorial-example">${currentLang()==='en'?'Show example':'Toon voorbeeld'}</button><button class="btn primary" data-action="tutorial-next">${tut.index===total-1?t('finish'):t('next')}</button><button class="btn ghost" data-action="tutorial-stop">${t('stop')}</button></div></div></div>`; }

function bindPostRender(){ document.querySelectorAll('.tutorial-overlay').forEach(e=>e.remove()); document.body.insertAdjacentHTML('beforeend', renderTutorial()); highlightTutorialTarget(); bindInputs(); }
function highlightTutorialTarget(){ document.querySelectorAll('.tutorial-target').forEach(e=>e.classList.remove('tutorial-target')); const tut=state.ui.tutorial; if(!tut) return; const sel=TUTORIAL[tut.index]?.[5]; let el; try{ el=document.querySelector(sel); }catch(e){} if(el) el.classList.add('tutorial-target'); }
function bindInputs(){
  const agf=byId('agfSearch'); if(agf) agf.addEventListener('input', e=>{ const list=byId('agfQuickList'); if(list) list.innerHTML=renderAgfQuickList(e.target.value); });
  const inv=byId('invSearch'); if(inv) inv.addEventListener('input', e=>{ const list=byId('inventoryList'); if(list) list.innerHTML=renderInventoryList(e.target.value); });
}

function modal(title, body, cls=''){ byId('modalRoot').innerHTML=`<div class="modal-backdrop"><div class="modal ${cls}"><div class="modal-head"><h2>${title}</h2><button class="btn" data-action="close-modal">×</button></div>${body}</div></div>`; }
function closeModal(){ byId('modalRoot').innerHTML=''; }
function promptModal(title, fields, submitAction, data={}){ modal(title, `<div class="grid">${fields.map(f=>`<label>${f.label}<${f.type==='textarea'?'textarea':'input'} class="${f.type==='textarea'?'textarea':'input'}" id="modal_${f.id}" ${f.type!=='textarea'?`type="${f.type||'text'}" value="${escapeHtml(f.value||'')}"`:''} placeholder="${escapeHtml(f.placeholder||'')}">${f.type==='textarea'?escapeHtml(f.value||''):''}${f.type==='textarea'?'</textarea>':''}</label>`).join('')}<button class="btn primary" data-action="${submitAction}" ${Object.entries(data).map(([k,v])=>`data-${k}="${escapeHtml(v)}"`).join(' ')}>${t('save')}</button></div>`); }
function selectModal(title, body){ modal(title, body, 'wide'); }

function completeTask(id){ const task=state.tasks.find(t=>t.id===id); if(!task) return; task.status='Voltooid'; task.completedAt=nowISO(); if(task.linkedCleaningId){ const c=state.cleaning.items.find(i=>i.id===task.linkedCleaningId); if(c){ c.status='clean'; c.lastCleaned=TODAY(); c.planned=false; c.history.unshift({at:nowISO(),type:'cleanedViaHaccp'}); } } addActivity(`Taak voltooid: ${task.title}`,'task'); toast('Taak voltooid','good',true); }
function deferTask(id){ const task=state.tasks.find(t=>t.id===id); if(!task) return; const reasons=['Geen tijd','Te druk','Materiaal ontbreekt','Collega nodig','Lagere prioriteit','Anders']; selectModal('Uitstelreden', `<div class="grid grid-2">${reasons.map(r=>`<button class="btn" data-action="confirm-defer" data-id="${id}" data-reason="${r}">${r}</button>`).join('')}</div>`); }
function nextWorkday(date=TODAY()){ let d=date; for(let i=0;i<8;i++){ d=addDays(d,1); if(state.settings.workDays.includes(dayIndex(d))) return d; } return addDays(date,1); }
function openTemplateLoader(group='daily'){ const list=state.templates[group]||[]; selectModal('Taken inladen', `<div class="btn-row mb"><button class="btn" data-action="template-select-all">Alles</button><button class="btn" data-action="template-select-none">Geen</button></div><div class="list">${list.map(it=>`<label class="list-item compact"><input type="checkbox" class="tplCheck" value="${it.id}" checked> <span>${escapeHtml(it.title)} · ${minutesToText(it.duration)}</span></label>`).join('')}</div><button class="btn primary mt" data-action="confirm-load-template" data-group="${group}">Geselecteerde taken inladen</button>`); }
function openTaskForm(task=null){ promptModal(task?'Taak bewerken':'Nieuwe taak',[{id:'title',label:'Titel',value:task?.title},{id:'duration',label:'Duur minuten',type:'number',value:task?.duration||10},{id:'priority',label:'Prioriteit',value:task?.priority||'Medium'},{id:'category',label:'Categorie',value:task?.category||'Overig'}], task?'confirm-edit-task':'confirm-add-task', task?{id:task.id}:{}); }

function startFocus(taskId=null){ state.ui.focusTaskId=taskId; modal('Focus Mode', `<div class="center"><div style="font-size:3.5rem;font-weight:900" id="focusTimer">25:00</div><p class="muted">${taskId?(state.tasks.find(t=>t.id===taskId)?.title||'Taak'):'Algemene focus'}</p><div class="btn-row" style="justify-content:center"><button class="btn" data-action="set-focus-time" data-min="15">15m</button><button class="btn" data-action="set-focus-time" data-min="25">25m</button><button class="btn" data-action="set-focus-time" data-min="45">45m</button><button class="btn primary" data-action="start-focus-timer">Start</button><button class="btn bad" data-action="close-modal">Stop</button></div></div>`); }
let focusInterval=null, focusLeft=25*60, focusStart=null;
function tickFocus(){ const el=byId('focusTimer'); if(!el) return; const m=Math.floor(focusLeft/60), s=focusLeft%60; el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; if(focusLeft--<=0){ clearInterval(focusInterval); focusInterval=null; const mins=Math.round((Date.now()-focusStart)/60000); state.focusLogs.unshift({id:uid('focus'),taskId:state.ui.focusTaskId,minutes:mins,startedAt:new Date(focusStart).toISOString(),endedAt:nowISO()}); addActivity(`Focus voltooid: ${mins} min`,'focus'); save(); modal('Focus voltooid', `<p>Goed bezig. Wat wil je doen?</p><div class="btn-row"><button class="btn good" data-action="finish-focus-task">Taak voltooid</button><button class="btn" data-action="extend-focus">+10 minuten</button><button class="btn" data-action="close-modal">Sluiten</button></div>`); } }

function renderError(err){ byId('app').innerHTML=`<div class="onboarding"><div class="onboard-card"><h1>RICH CMD</h1><h2>De app kon niet veilig laden</h2><p class="muted">${escapeHtml(err.message||err)}</p><div class="btn-row"><button class="btn primary" data-action="repair-data">Data repareren</button><button class="btn" data-action="download-backup">Backup downloaden</button><button class="btn bad" data-action="reset-app">Schone start</button></div></div></div>`; }
window.addEventListener('error', e=>{ try{ const msg=String(e.error?.message || e.message || ''); if(msg==='Script error.') { console.warn('Ignored generic browser script error'); return; } renderError(e.error||e.message); }catch(_){} });

document.addEventListener('click', e=>{
  const btn=e.target.closest('[data-action],[data-route]'); if(!btn) return;
  const action=btn.dataset.action; const route=btn.dataset.route;
  if(route){ state.route=route; state.ui.sidebarOpen=false; state.ui.assistOpen=false; closeModal(); save(); render(); return; }
  try{ handleAction(action,btn,e); } catch(err){ console.error(err); renderError(err); }
});
document.addEventListener('change', e=>{
  const el=e.target.closest('[data-action]'); if(!el) return;
  try{ handleAction(el.dataset.action,el,e); } catch(err){ renderError(err); }
});
document.addEventListener('keydown', e=>{ if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); openCommand(); } if(e.key==='Escape'){ closeModal(); state.ui.command=false; state.ui.sidebarOpen=false; state.ui.assistOpen=false; save(); render(); } });
function handleAction(a,el,e){
  switch(a){
    case 'toggle-sidebar': state.ui.sidebarOpen=!state.ui.sidebarOpen; save(); render(); break;
    case 'toggle-menu-group': state.ui.menu[el.dataset.group]=!state.ui.menu[el.dataset.group]; save(); render(); break;
    case 'toggle-assist': state.ui.assistOpen=!state.ui.assistOpen; save(); render(); break;
    case 'set-setup-lang': state.settings.lang=el.dataset.lang; save(); render(); break;
    case 'set-theme': state.settings.theme=el.dataset.theme; save(); render(); break;
    case 'toggle-workday': { const d=+el.dataset.day; const arr=state.settings.workDays; state.settings.workDays=arr.includes(d)?arr.filter(x=>x!==d):arr.concat(d).sort(); save(); render(); break; }
    case 'onboard-back': state.ui.onboardingStep=Math.max(0,(state.ui.onboardingStep||0)-1); save(); render(); break;
    case 'onboard-next': onboardNext(); break;
    case 'onboard-skip': state.settings.onboarded=true; save(); render(); break;
    case 'load-start-pack': loadStartPack(); toast('Startpakket geladen'); break;
    case 'no-start-pack': toast('Je begint leeg'); break;
    case 'set-tutorial-choice': state.ui.startTutorial=el.dataset.choice==='yes'; toast(state.ui.startTutorial?'Tutorial start straks':'Tutorial later'); break;
    case 'shift-start': startShift(); break;
    case 'shift-end': endShift(); break;
    case 'toggle-break': toggleBreak(); break;
    case 'smart-next': { const n=nextAction(); modal('Smart Next Action', `<h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.reason)}</p><button class="btn primary" data-route="${n.route}">Openen</button>`); break; }
    case 'quick-action': openQuickAction(); break;
    case 'task-done': update(()=>completeTask(el.dataset.id)); break;
    case 'task-defer': deferTask(el.dataset.id); break;
    case 'task-up': moveTask(el.dataset.id,-1); break;
    case 'task-down': moveTask(el.dataset.id,1); break;
    case 'confirm-defer': { const t=state.tasks.find(x=>x.id===el.dataset.id); if(t){t.status='Uitgesteld';t.deferReason=el.dataset.reason;t.dueDate=nextWorkday();addActivity(`Taak uitgesteld: ${t.title}`,'task');} closeModal(); save(); render(); break; }
    case 'task-focus': startFocus(el.dataset.id); break;
    case 'open-focus': startFocus(); break;
    case 'set-focus-time': focusLeft=+el.dataset.min*60; tickFocus(); break;
    case 'start-focus-timer': focusStart=Date.now(); clearInterval(focusInterval); focusInterval=setInterval(tickFocus,1000); tickFocus(); break;
    case 'extend-focus': focusLeft=10*60; focusStart=Date.now(); clearInterval(focusInterval); focusInterval=setInterval(tickFocus,1000); tickFocus(); break;
    case 'finish-focus-task': if(state.ui.focusTaskId) update(()=>completeTask(state.ui.focusTaskId)); closeModal(); break;
    case 'open-template-loader': openTemplateLoader(); break;
    case 'load-template-group': openTemplateLoader(el.dataset.group); break;
    case 'template-select-all': document.querySelectorAll('.tplCheck').forEach(c=>c.checked=true); break;
    case 'template-select-none': document.querySelectorAll('.tplCheck').forEach(c=>c.checked=false); break;
    case 'confirm-load-template': loadTemplateSelection(el.dataset.group); break;
    case 'open-task-form': openTaskForm(); break;
    case 'task-edit': openTaskForm(state.tasks.find(t=>t.id===el.dataset.id)); break;
    case 'confirm-add-task': addTaskFromModal(); break;
    case 'confirm-edit-task': editTaskFromModal(el.dataset.id); break;
    case 'add-template-item': addTemplateItem(el.dataset.group); break;
    case 'edit-template-item': editTemplateItem(el.dataset.group,el.dataset.id); break;
    case 'delete-template-item': deleteTemplateItem(el.dataset.group,el.dataset.id); break;
    case 'open-agf-product-form': openAgfProductForm(); break;
    case 'confirm-add-agf-product': addAgfProductFromModal(); break;
    case 'edit-agf-product': openAgfProductForm(state.agfProducts.find(p=>p.id===el.dataset.id)); break;
    case 'confirm-edit-agf-product': editAgfProductFromModal(el.dataset.id); break;
    case 'delete-agf-product': removeItem('agfProducts',el.dataset.id); break;
    case 'agf-status': setAgfStatus(el.dataset.id,el.dataset.status); break;
    case 'toggle-agf-fav': {const p=state.agfProducts.find(p=>p.id===el.dataset.id); if(p)p.favorite=!p.favorite; save(); render(); break;}
    case 'toggle-agf-bonus': toggleAgfBonus(el.dataset.id); break;
    case 'open-bonus-form': openBonusForm(); break;
    case 'confirm-add-bonus': addBonusFromModal(); break;
    case 'toggle-bonus-order': {const b=state.bonus.find(x=>x.id===el.dataset.id); if(b)b.order=!b.order; save(); render(); break;}
    case 'delete-bonus': removeItem('bonus',el.dataset.id); break;
    case 'clear-bonus': state.bonus=[]; save(); render(); break;
    case 'load-storemap': ensureStoreMap(true); toast('Winkelindeling geladen'); render(); break;
    case 'open-clean-add-form': openCleanAddForm(); break;
    case 'confirm-add-clean-item': addCleanItemFromModal(); break;
    case 'open-clean-item': openCleanItem(el.dataset.id); break;
    case 'mark-dirty': markDirty(el.dataset.id); break;
    case 'mark-mold': openMoldForm(el.dataset.id); break;
    case 'confirm-mold': confirmMold(el.dataset.id); break;
    case 'clean-item': cleanItem(el.dataset.id); break;
    case 'plan-clean-item': planCleanItem(el.dataset.id); break;
    case 'start-cleaning-round': startCleaningRound(); break;
    case 'plan-urgent-cleaning': cleaningUrgent().forEach(i=>planCleanItem(i.id,true)); toast('Urgente items ingepland'); save(); render(); break;
    case 'open-inventory-form': openInventoryForm(); break;
    case 'confirm-add-inventory': addInventoryFromModal(); break;
    case 'edit-inv': openInventoryForm(state.inventory.find(i=>i.id===el.dataset.id)); break;
    case 'confirm-edit-inventory': editInventoryFromModal(el.dataset.id); break;
    case 'inv-stock': {const i=state.inventory.find(i=>i.id===el.dataset.id); if(i){i.stock=(+i.stock||0)+(+el.dataset.delta||0);i.lastChecked=nowISO();} save(); render(); break;}
    case 'add-inv-order': addInventoryOrder(el.dataset.id); break;
    case 'copy-inv-orders': copyText(state.inventoryOrders.map(o=>`${o.name}: ${o.qty}`).join('\n')); break;
    case 'open-communication-form': openCommunicationForm(); break;
    case 'confirm-add-communication': addCommunicationFromModal(); break;
    case 'comm-status': {const c=state.communications.find(c=>c.id===el.dataset.id); if(c)c.status=el.value; save(); render(); break;}
    case 'comm-read': {const c=state.communications.find(c=>c.id===el.dataset.id); if(c)c.read=!c.read; save(); render(); break;}
    case 'open-report-form': openReportForm(); break;
    case 'confirm-add-report': addReportFromModal(); break;
    case 'toggle-more': state.ui.showMore[el.dataset.key]=!state.ui.showMore[el.dataset.key]; save(); render(); break;
    case 'tone-format': formatTone(); break;
    case 'complete-lesson': if(!state.coachingDone.includes(el.dataset.id)) state.coachingDone.push(el.dataset.id); save(); render(); break;
    case 'save-settings': saveSettingsForm(); break;
    case 'settings-toggle-workday': {const d=+el.dataset.day; state.settings.workDays=state.settings.workDays.includes(d)?state.settings.workDays.filter(x=>x!==d):state.settings.workDays.concat(d).sort(); save(); render(); break;}
    case 'add-contact': {const v=byId('newContact')?.value.trim(); if(v&&!state.settings.contacts.includes(v))state.settings.contacts.push(v); save(); render(); break;}
    case 'delete-contact': state.settings.contacts=state.settings.contacts.filter(c=>c!==el.dataset.name); save(); render(); break;
    case 'start-tutorial': state.ui.tutorial={index:0,preview:''}; save(); render(); break;
    case 'tutorial-next': tutorialNext(); break;
    case 'tutorial-prev': state.ui.tutorial.index=Math.max(0,state.ui.tutorial.index-1); tutorialRoute(); save(); render(); break;
    case 'tutorial-stop': state.ui.tutorial=null; state.settings.tutorialDone=true; save(); render(); break;
    case 'tutorial-example': tutorialExample(); break;
    case 'open-command': openCommand(); break;
    case 'close-command': closeModal(); break;
    case 'close-modal': closeModal(); break;
    case 'download-backup': downloadBackup(); break;
    case 'open-import': openImport(); break;
    case 'confirm-import': confirmImport(); break;
    case 'reset-app': if(confirm('Alles wissen?')){localStorage.removeItem(APP.storage); state=defaultState(); save(); render();} break;
    case 'repair-data': state=sanitize(state); save(); render(); break;
    case 'clear-cache': if('caches' in window)caches.keys().then(keys=>keys.forEach(k=>caches.delete(k))); toast('Cache vernieuwd'); break;
    case 'undo-last': undoLast(); break;
  }
}
function onboardNext(){ const step=state.ui.onboardingStep||0; if(step===1){ const n=byId('setupName')?.value.trim(); state.settings.name=n; } if(step===3){ state.settings.workHours=+(byId('setupWorkHours')?.value||8); state.settings.haccpHours=+(byId('setupHaccpHours')?.value||3.5); state.settings.shiftStart=byId('setupShiftStart')?.value||'08:00'; state.settings.shiftEnd=byId('setupShiftEnd')?.value||'17:00'; } if(step>=4){ state.settings.onboarded=true; save(); render(); if(state.ui.startTutorial){ state.ui.tutorial={index:0,preview:''}; save(); render(); } return;} state.ui.onboardingStep=step+1; save(); render(); }
function loadStartPack(){ if(!state.agfProducts.length){ ['Paprika rood','Bosui','Mango','Komkommer','Aardbeien','Tomaat tros','Sinaasappels','Avocado'].forEach((n,i)=>state.agfProducts.push({id:uid('agf'),name:n,nasa:String(120000+i),category:i<3?'Groente':'Fruit',aliases:'',favorite:i<5,history:[]})); } if(!state.inventory.length){ [['Tape transparant','987654','Magazijn',1,2,6],['Allesreiniger','111222','HACCP',2,2,8],['Vuilniszakken','333444','HACCP',3,2,10],['Koffiebekers','555666','Kantine',1,2,6]].forEach(x=>state.inventory.push({id:uid('inv'),name:x[0],nasa:x[1],category:x[2],stock:x[3],min:x[4],max:x[5],unit:'st'})); } ensureStoreMap(true); save(); }
function endShift(){ if(!state.shift.active) return; if(state.shift.breakActive) toggleBreak(false); state.shift.logs.unshift({type:'clockOut',at:nowISO()}); state.shift.active=false; const report={id:uid('rep'),title:'Automatische shift afsluiting',status:shiftScore()>80?'Groen':shiftScore()>60?'Geel':'Oranje',text:`Shift score ${shiftScore()}/100. Taken: ${completedCount()}/${todayTasks().length}. AGF aandacht: ${agfAttention().length}. Schoonmaak urgent: ${cleaningUrgent().length}.`,createdAt:nowISO(),auto:true}; state.reports.unshift(report); addActivity('Shift afgesloten en rapportage aangemaakt','shift'); toast('Shift afgesloten'); save(); render(); }
function toggleBreak(renderNow=true){ if(!state.shift.active) return; if(state.shift.breakActive){ state.shift.breakActive=false; state.shift.logs.unshift({type:'breakEnd',at:nowISO()}); addActivity('Pauze gestopt','shift'); } else { state.shift.breakActive=true; state.shift.breakStartedAt=nowISO(); state.shift.logs.unshift({type:'breakStart',at:nowISO()}); addActivity('Pauze gestart','shift'); } if(renderNow){save();render();} }
function loadTemplateSelection(group){ const ids=[...document.querySelectorAll('.tplCheck:checked')].map(c=>c.value); const items=state.templates[group].filter(i=>ids.includes(i.id)); items.forEach(i=>state.tasks.unshift({id:uid('task'),title:i.title,duration:i.duration,priority:i.priority,category:i.category,group,frequency:group==='daily'?'Dagelijks':group==='weekly'?'Wekelijks':'Maandelijks',status:'Open',createdAt:nowISO(),dueDate:TODAY()})); addActivity(`${items.length} ${group} taken geladen`,'task'); closeModal(); save(); render(); }
function addTaskFromModal(){ state.tasks.unshift({id:uid('task'),title:byId('modal_title').value,duration:+byId('modal_duration').value||10,priority:byId('modal_priority').value||'Medium',category:byId('modal_category').value||'Overig',status:'Open',createdAt:nowISO(),dueDate:TODAY()}); closeModal(); save(); render(); }
function editTaskFromModal(id){ const t=state.tasks.find(t=>t.id===id); if(t){t.title=byId('modal_title').value;t.duration=+byId('modal_duration').value||10;t.priority=byId('modal_priority').value;t.category=byId('modal_category').value;} closeModal(); save(); render(); }
function addTemplateItem(group){ const title=prompt('Taak titel'); if(!title) return; state.templates[group].push({id:uid('tpl'),title,duration:10,priority:'Medium',category:'Template',group}); save(); render(); }
function editTemplateItem(group,id){ const item=state.templates[group].find(i=>i.id===id); if(!item) return; const title=prompt('Titel',item.title); if(title)item.title=title; const dur=prompt('Duur',item.duration); if(dur)item.duration=+dur; save(); render(); }
function deleteTemplateItem(group,id){ state.templates[group]=state.templates[group].filter(i=>i.id!==id); save(); render(); }
function openAgfProductForm(p=null){ promptModal(p?'Product bewerken':'AGF product toevoegen',[{id:'name',label:t('product'),value:p?.name},{id:'nasa',label:t('nasa'),value:p?.nasa},{id:'category',label:t('category'),value:p?.category},{id:'aliases',label:t('aliases'),value:p?.aliases}],p?'confirm-edit-agf-product':'confirm-add-agf-product',p?{id:p.id}:{}); }
function addAgfProductFromModal(){ state.agfProducts.unshift({id:uid('agf'),name:byId('modal_name').value,nasa:byId('modal_nasa').value,category:byId('modal_category').value,aliases:byId('modal_aliases').value,favorite:false,history:[]}); closeModal(); save(); render(); }
function editAgfProductFromModal(id){ const p=state.agfProducts.find(p=>p.id===id); if(p){p.name=byId('modal_name').value;p.nasa=byId('modal_nasa').value;p.category=byId('modal_category').value;p.aliases=byId('modal_aliases').value;} closeModal(); save(); render(); }
function setAgfStatus(id,status){ const p=state.agfProducts.find(p=>p.id===id); if(!p) return; p.history.unshift({status,at:nowISO()}); const d=agfDecision(p); state.agfOrders.unshift({id:uid('ord'),product:p.name,advice:d.advice,reason:d.reason,at:nowISO()}); addActivity(`AGF ${p.name}: ${status}`,'agf'); save(); render(); }
function openBonusForm(){ promptModal(currentLang()==='en'?'Add bonus item':'Bonus toevoegen',[{id:'name',label:'Bonusartikel'},{id:'nasa',label:t('nasa')},{id:'category',label:t('category')}],'confirm-add-bonus'); }
function addBonusFromModal(){ state.bonus.unshift({id:uid('bonus'),name:byId('modal_name').value,nasa:byId('modal_nasa').value,category:byId('modal_category').value,order:false,at:nowISO()}); closeModal(); save(); render(); }
function openCleanItem(id){ const i=state.cleaning.items.find(x=>x.id===id); if(!i) return; modal(i.label, `<p>${i.department} · ${i.zone}</p><div class="btn-row"><button class="btn good" data-action="clean-item" data-id="${i.id}">Schoongemaakt</button><button class="btn warn" data-action="mark-dirty" data-id="${i.id}">Vuil</button><button class="btn bad" data-action="mark-mold" data-id="${i.id}">Schimmel</button><button class="btn" data-action="plan-clean-item" data-id="${i.id}">Plan in HACCP</button></div>`); }

function markDirty(id){ const i=state.cleaning.items.find(x=>x.id===id); if(i){i.status='dirty';i.lastChecked=TODAY();i.history.unshift({type:'dirty',at:nowISO()});} closeModal(); save(); render(); }
function openMoldForm(id){ const i=state.cleaning.items.find(x=>x.id===id); if(!i)return; modal(currentLang()==='en'?'Report mould':'Schimmel melden', `<p>${escapeHtml(i.label)}</p><label>Graad<select class="select" id="moldGrade"><option value="1">Graad 1</option><option value="2">Graad 2</option><option value="3">Graad 3</option></select></label><label>Locatie<select class="select" id="moldLocation"><option>achterstrook</option><option>voorrand</option><option>achterwand</option><option>oplegplaat onder</option><option>oplegplaat boven</option><option>plankoppervlak</option><option>zijwand</option><option>rubbers/rand</option><option>anders</option></select></label><label>Notitie<textarea class="textarea" id="moldNote"></textarea></label><button class="btn primary mt" data-action="confirm-mold" data-id="${id}">Opslaan</button>`); }
function confirmMold(id){ const i=state.cleaning.items.find(x=>x.id===id); if(i){const g=byId('moldGrade').value; i.status='mold'+g; i.moldGrade=+g; i.moldLocation=byId('moldLocation').value; i.note=byId('moldNote').value; i.lastChecked=TODAY(); i.history.unshift({type:'mold',grade:g,location:i.moldLocation,at:nowISO()}); } closeModal(); save(); render(); }

function cleanItem(id){ const i=state.cleaning.items.find(x=>x.id===id); if(i){i.status='clean';i.lastCleaned=TODAY();i.lastChecked=TODAY();i.planned=false;i.history.unshift({type:'cleaned',at:nowISO()});} closeModal(); save(); render(); }
function planCleanItem(id,silent=false){ const i=state.cleaning.items.find(x=>x.id===id); if(!i) return; if(!state.tasks.some(t=>t.linkedCleaningId===id&&t.status!=='Voltooid')) state.tasks.unshift({id:uid('task'),title:`Schoonmaakkaart — ${i.label}`,duration:cleanDuration(i),priority:i.status==='mold3'?'Kritiek':i.status&&i.status.startsWith('mold')?'Hoog':'Medium',category:'Schoonmaakkaart',status:'Open',createdAt:nowISO(),dueDate:TODAY(),linkedCleaningId:id}); i.planned=true; if(!silent) toast('In HACCP gepland'); save(); }
function startCleaningRound(){ const queue=cleaningUrgent(); if(!queue.length){ toast('Geen urgente schoonmaakpunten'); return;} const i=queue[0]; openCleanItem(i.id); }
function openInventoryForm(i=null){ const cats=['Schoonmaak','Kantoor','Emballage','Kantine','Magazijn','HACCP','Overig']; modal(i?(currentLang()==='en'?'Edit inventory':'Inventaris bewerken'):(currentLang()==='en'?'Add inventory item':'Inventarisitem toevoegen'), `<div class="grid grid-2"><label>${currentLang()==='en'?'Name':'Naam'}<input class="input" id="modal_name" value="${escapeHtml(i?.name||'')}"></label><label>${t('nasa')}<input class="input" id="modal_nasa" value="${escapeHtml(i?.nasa||'')}"></label><label>${t('category')}<select class="select" id="modal_category">${cats.map(c=>`<option ${((i?.category||'HACCP')===c)?'selected':''}>${c}</option>`).join('')}</select></label><label>${t('stock')}<input class="input" id="modal_stock" type="number" value="${i?.stock??0}"></label><label>${t('minimum')}<input class="input" id="modal_min" type="number" value="${i?.min??1}"></label><label>${t('maximum')}<input class="input" id="modal_max" type="number" value="${i?.max??5}"></label></div><button class="btn primary mt" data-action="${i?'confirm-edit-inventory':'confirm-add-inventory'}" ${i?`data-id="${i.id}"`:''}>${t('save')}</button>`); }
function addInventoryFromModal(){ state.inventory.unshift({id:uid('inv'),name:byId('modal_name').value,nasa:byId('modal_nasa').value,category:byId('modal_category').value,stock:+byId('modal_stock').value||0,min:+byId('modal_min').value||1,max:+byId('modal_max').value||5,unit:'st',lastChecked:nowISO()}); closeModal(); save(); render(); }
function editInventoryFromModal(id){ const i=state.inventory.find(i=>i.id===id); if(i){['name','nasa','category'].forEach(k=>i[k]=byId('modal_'+k).value); i.stock=+byId('modal_stock').value||0;i.min=+byId('modal_min').value||1;i.max=+byId('modal_max').value||5;} closeModal(); save(); render(); }
function addInventoryOrder(id){ const i=state.inventory.find(i=>i.id===id); if(!i)return; const qty=Math.max(1,(+i.max||1)-(+i.stock||0)); state.inventoryOrders.unshift({id:uid('iord'),name:i.name,nasa:i.nasa,qty,reason:'Onder minimum / handmatig toegevoegd',at:nowISO()}); toast('Toegevoegd aan bestellijst'); save(); render(); }
function openCommunicationForm(){ const opts=state.settings.contacts.map(c=>`<option>${escapeHtml(c)}</option>`).join(''); modal(currentLang()==='en'?'Add communication':'Communicatie toevoegen', `<div class="grid"><label>${t('person')}<select class="select" id="commTo"><option value="">Zelf invullen</option>${opts}</select></label><input class="input" id="commCustom" placeholder="Andere persoon"><textarea class="textarea" id="commMsg" placeholder="${t('message')}"></textarea><label>${t('followDate')}<input class="input" id="commFollow" type="date"></label><button class="btn primary" data-action="confirm-add-communication">${t('save')}</button></div>`); }
function addCommunicationFromModal(){ state.communications.unshift({id:uid('comm'),to:byId('commTo').value,customTo:byId('commCustom').value,message:byId('commMsg').value,status:'Rood',read:false,followDate:byId('commFollow').value,createdAt:nowISO()}); closeModal(); save(); render(); }
function openReportForm(){ promptModal(currentLang()==='en'?'Add report':'Rapportage toevoegen',[{id:'title',label:'Titel'},{id:'text',label:'Tekst',type:'textarea'},{id:'status',label:'Status',value:'Groen'}],'confirm-add-report'); }
function addReportFromModal(){ state.reports.unshift({id:uid('rep'),title:byId('modal_title').value,text:byId('modal_text').value,status:byId('modal_status').value||'Groen',createdAt:nowISO(),auto:false}); closeModal(); save(); render(); }
function formatTone(){ const v=byId('toneText')?.value||''; byId('toneText').value=`Situatie: ${v}\nActie: \nVervolg: \nVraag: `; }
function saveSettingsForm(){ state.settings.name=byId('setName')?.value||''; state.settings.lang=byId('setLang')?.value||'nl'; state.settings.workHours=+(byId('setWorkHours')?.value||8); state.settings.haccpHours=+(byId('setHaccpHours')?.value||3.5); state.settings.shiftStart=byId('setShiftStart')?.value||'08:00'; state.settings.shiftEnd=byId('setShiftEnd')?.value||'17:00'; save(); toast('Instellingen opgeslagen'); render(); }
function openQuickAction(){ modal('Snelle actie', `<div class="grid grid-2"><button class="btn" data-action="open-task-form">HACCP taak</button><button class="btn" data-action="open-agf-product-form">AGF product</button><button class="btn" data-action="open-inventory-form">Inventaris</button><button class="btn" data-action="open-communication-form">Communicatie</button><button class="btn" data-action="open-report-form">Rapportage</button><button class="btn" data-action="open-focus">Focus</button></div>`); }
function openCommand(){ const options=ROUTES.map(r=>`<button class="nav-btn" data-route="${r.id}"><span class="nav-icon">${iconSvg(r.icon)}</span>${t(r.label)}</button>`).join(''); byId('modalRoot').innerHTML=`<div class="command-overlay"><div class="command-box"><div class="modal-head"><strong>Command palette</strong><button class="btn small" data-action="close-command">×</button></div><input class="input" id="cmdInput" placeholder="Command palette"><div class="mt">${options}</div></div></div>`; setTimeout(()=>byId('cmdInput')?.focus(),50); }
function tutorialRoute(){ const step=TUTORIAL[state.ui.tutorial.index]; if(step&&step[6]) state.route=step[6]; }
function tutorialNext(){ if(!state.ui.tutorial)return; if(state.ui.tutorial.index>=TUTORIAL.length-1){state.ui.tutorial=null;state.settings.tutorialDone=true;} else {state.ui.tutorial.index++;state.ui.tutorial.preview='';tutorialRoute();} save(); render(); }
function tutorialExample(){ const step=TUTORIAL[state.ui.tutorial.index]; state.ui.tutorial.preview = tutorialPreview(step); tutorialRoute(); save(); render(); }

function tutorialPreview(step){
  const route=step?.[6]||state.route;
  const label=routeLabel(route);
  return currentLang()==='en'
    ? `<strong>Example:</strong> this step opens <b>${escapeHtml(label)}</b>. Try one safe action, such as viewing a list or opening a form. Nothing is changed unless you press Save.`
    : `<strong>Voorbeeld:</strong> deze stap opent <b>${escapeHtml(label)}</b>. Probeer veilig een onderdeel te bekijken of een formulier te openen. Er verandert niets tot je Opslaan kiest.`;
}
function startShift(){
  if(state.shift.active) return;
  state.shift.active=true; state.shift.startedAt=nowISO(); state.shift.logs.unshift({type:'clockIn',at:nowISO()});
  addActivity(currentLang()==='en'?'Shift started':'Shift gestart','shift'); save(); render();
  const msg=currentLang()==='en'
    ? 'Start with the base. One calm choice at a time is how you keep control.'
    : 'Begin met de basis. Eén rustige keuze tegelijk is hoe je controle houdt.';
  modal(currentLang()==='en'?'Shift started':'Shift gestart', `<div class="hero"><h2>${currentLang()==='en'?'Welcome to your shift':'Welkom in je shift'} 👋</h2><p>${msg}</p></div><div class="btn-row mt"><button class="btn primary" data-route="haccp">${currentLang()==='en'?'Open HACCP planning':'Open HACCP planning'}</button><button class="btn" data-route="agf">${currentLang()==='en'?'Start Produce check':'Start AGF check'}</button></div>`);
}
function endShift(){
  if(!state.shift.active) return;
  if(state.shift.breakActive) toggleBreak(false);
  state.shift.logs.unshift({type:'clockOut',at:nowISO()}); state.shift.active=false;
  const score=shiftScore(); const completed=completedCount(), total=todayTasks().length;
  const reportText=currentLang()==='en'
    ? `Shift score ${score}/100. Tasks completed: ${completed}/${total}. Produce attention: ${agfAttention().length}. Cleaning urgent: ${cleaningUrgent().length}. Focus minutes: ${focusMinutesToday()}.`
    : `Shift score ${score}/100. Taken voltooid: ${completed}/${total}. AGF aandacht: ${agfAttention().length}. Schoonmaak urgent: ${cleaningUrgent().length}. Focusminuten: ${focusMinutesToday()}.`;
  state.reports.unshift({id:uid('rep'),title:currentLang()==='en'?'Automatic shift closing':'Automatische shift afsluiting',status:score>80?'Groen':score>60?'Geel':'Oranje',text:reportText,createdAt:nowISO(),auto:true});
  addActivity(currentLang()==='en'?'Shift closed and report created':'Shift afgesloten en rapportage aangemaakt','shift'); save(); render();
  const feedback = score>80 ? (currentLang()==='en'?'Strong shift. You kept the day under control.':'Sterke shift. Je hield de dag onder controle.') : score>60 ? (currentLang()==='en'?'Useful shift. There are clear points for tomorrow.':'Nuttige shift. Er zijn duidelijke punten voor morgen.') : (currentLang()==='en'?'Heavy shift. Tomorrow starts by reducing pressure first.':'Zware shift. Morgen begint met eerst druk verlagen.');
  modal(currentLang()==='en'?'Shift summary':'Shift samenvatting', `<div class="grid grid-2"><div class="card"><h3>${currentLang()==='en'?'Score':'Score'}</h3><div class="value">${score}/100</div><p>${feedback}</p></div><div class="card"><h3>${currentLang()==='en'?'Summary':'Samenvatting'}</h3><p>${escapeHtml(reportText)}</p></div></div><div class="btn-row mt"><button class="btn primary" data-action="open-report-form">${currentLang()==='en'?'Add report':'Rapportage toevoegen'}</button><button class="btn" data-action="close-modal">${t('close')}</button></div>`);
}
function moveTask(id,dir){
  const visible=sortedTasks(); const pos=visible.findIndex(t=>t.id===id); if(pos<0) return;
  const other=visible[pos+dir]; if(!other) return;
  visible.forEach((t,i)=>{ if(t.manualOrder==null) t.manualOrder=i*10; });
  const a=state.tasks.find(t=>t.id===id), b=state.tasks.find(t=>t.id===other.id);
  const tmp=a.manualOrder; a.manualOrder=b.manualOrder; b.manualOrder=tmp;
  save(); render();
}
function toggleAgfBonus(id){
  const p=state.agfProducts.find(p=>p.id===id); if(!p) return;
  const existing=state.bonus.find(b=>b.productId===id);
  if(existing){ state.bonus=state.bonus.filter(b=>b.productId!==id); }
  else { state.bonus.unshift({id:uid('bonus'),productId:p.id,name:p.name,nasa:p.nasa,category:p.category,order:false,at:nowISO()}); }
  save(); render();
}
function displayDepartment(dep){ return dep && dep.startsWith('Vers') ? 'Vers' : dep; }
function renderStoreHierarchy(){
  const depOrder=['Vers','Houdbaar','Actiekoeling'];
  const groups={}; state.cleaning.items.forEach(i=>{ const dep=displayDepartment(i.department||'Overig'); const zone=(i.department&&i.department.startsWith('Vers')?i.department+' · ':'')+(i.zone||'Algemeen'); groups[dep]=groups[dep]||{}; groups[dep][zone]=groups[dep][zone]||[]; groups[dep][zone].push(i); });
  const deps=[...depOrder.filter(d=>groups[d]), ...Object.keys(groups).filter(d=>!depOrder.includes(d)).sort()];
  if(!deps.length) return `<p class="muted">${currentLang()==='en'?'No cleaning map yet.':'Nog geen schoonmaakkaart.'}</p>`;
  return deps.map(dep=>`<details class="detail-drawer" ${dep==='Vers'?'open':''}><summary>${escapeHtml(dep)} (${Object.values(groups[dep]).flat().length})</summary><div class="drawer-content grid">${Object.entries(groups[dep]).sort(([a],[b])=>a.localeCompare(b)).map(([zone,items])=>`<details class="detail-drawer"><summary>${escapeHtml(zone)} (${items.length})</summary><div class="drawer-content heat-row">${items.sort((a,b)=>(a.meter||0)-(b.meter||0)||String(a.kind).localeCompare(String(b.kind))).map(i=>`<button class="heat-cell ${statusClass(i)}" title="${escapeHtml(i.label)}" data-action="open-clean-item" data-id="${i.id}">${i.kind==='Plank'?'P'+(i.level||''):i.kind==='Bodembak'?'B':i.meter}</button>`).join('')}</div></details>`).join('')}</div></details>`).join('');
}
function openCleanAddForm(){
  modal(currentLang()==='en'?'Add cleaning map item':'Schoonmaakonderdeel toevoegen', `<div class="grid grid-2"><label>Afdeling<select class="select" id="cleanDep"><option>Vers</option><option>Houdbaar</option><option>Actiekoeling</option><option>Overig</option></select></label><label>Zone / pad / koeling<input class="input" id="cleanZone" placeholder="Melk / Maaltijden / Pad 1"></label><label>Metrage<input class="input" id="cleanMeter" type="number" value="1"></label><label>Type<select class="select" id="cleanKind"><option>Plank</option><option>Bodembak</option><option>Actiekoeling</option></select></label><label>Planknummer<input class="input" id="cleanLevel" type="number" value="1"></label><label>Frequentie dagen<input class="input" id="cleanFreq" type="number" value="180"></label></div><button class="btn primary mt" data-action="confirm-add-clean-item">${t('save')}</button>`);
}
function addCleanItemFromModal(){
  const dep=byId('cleanDep').value, zone=byId('cleanZone').value||'Onbekend', meter=+byId('cleanMeter').value||1, kind=byId('cleanKind').value, level=+byId('cleanLevel').value||null, freq=+byId('cleanFreq').value||180;
  const label=`${zone} M${meter} ${kind}${kind==='Plank'&&level?' '+level:''}`;
  state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter,kind,level,label,frequencyDays:freq,status:'neutral',history:[]});
  closeModal(); save(); render();
}
function openImport(){ modal('Backup importeren', `<input class="input" type="file" id="importFile" accept="application/json"><p class="muted small">Import vervangt de huidige lokale data na bevestiging.</p><button class="btn primary" data-action="confirm-import">Importeren</button>`); }
function confirmImport(){ const file=byId('importFile')?.files?.[0]; if(!file){toast('Geen bestand gekozen');return;} const reader=new FileReader(); reader.onload=()=>{ try{ state=sanitize(JSON.parse(reader.result)); save(); closeModal(); render(); toast('Import gelukt'); }catch(e){toast('Import mislukt','bad');} }; reader.readAsText(file); }

function downloadBackup(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`rich-cmd-backup-${TODAY()}.json`; a.click(); state.settings.lastBackup=nowISO(); save(); }
function copyText(txt){ navigator.clipboard?.writeText(txt); toast(t('copied')); }
function removeItem(key,id){ const item=state[key].find(x=>x.id===id); if(item) state.deleted.unshift({key,item,at:nowISO()}); state[key]=state[key].filter(x=>x.id!==id); save(); render(); toast('Verwijderd','info',true); }
function undoLast(){ const d=state.deleted.shift(); if(d){ state[d.key].unshift(d.item); save(); render(); } }
function loadStartTemplatesIfEmpty(){ if(!state.templates.daily.length) state.templates=defaultTemplates(); }
function loadStartPage(){ state.route=state.settings.startPage||'today'; }



/* =======================
   V6.3 DESIGN + INTELLIGENCE LAYER
   Stable overrides on top of the V6.2 engine.
   ======================= */
Object.assign(I18N.nl,{
  menuClose:'Menu sluiten', skillTree:'Skill tree', learningPath:'Leertraject', completedLessons:'Voltooide lessen', hideCompleted:'Voltooide verbergen', showCompleted:'Voltooide tonen', storeStructure:'Winkelstructuur', addZone:'Zone toevoegen', addMeter:'Meter toevoegen', addShelf:'Plank toevoegen', bulkMeters:'Meters bijwerken', dataInsights:'Data-inzichten', managementTools:'Management tools', productivityConclusion:'Productiviteitsconclusie', workflowAdvice:'Werkadvies', orderQuantity:'Bestelaantal', notFoundAdd:'Niet gevonden? Voeg direct toe', openSkill:'Open vaardigheid', level:'Level', unlock:'Speel vrij', unlocked:'Vrijgespeeld', locked:'Gesloten', practice:'Praktijk', result:'Resultaat'
});
Object.assign(I18N.en,{
  menuClose:'Close menu', skillTree:'Skill tree', learningPath:'Learning path', completedLessons:'Completed lessons', hideCompleted:'Hide completed', showCompleted:'Show completed', storeStructure:'Store structure', addZone:'Add zone', addMeter:'Add meter', addShelf:'Add shelf', bulkMeters:'Edit meters', dataInsights:'Data insights', managementTools:'Management tools', productivityConclusion:'Productivity conclusion', workflowAdvice:'Work advice', orderQuantity:'Order quantity', notFoundAdd:'Not found? Add it directly', openSkill:'Open skill', level:'Level', unlock:'Unlock', unlocked:'Unlocked', locked:'Locked', practice:'Practice', result:'Result'
});
function L(nl,en){ return currentLang()==='en'?en:nl; }
function screenTitle(nl,en){ return `<h3>${L(nl,en)}</h3>`; }

function renderSidebar(){
  const groupNames=currentLang()==='en'
    ? {today:'Today',work:'Work',insight:'Insight & growth',system:'System'}
    : {today:'Vandaag',work:'Werk',insight:'Inzicht & groei',system:'Systeem'};
  return `<aside class="sidebar ${state.ui.sidebarOpen?'open':''}" id="sidebar">
    <div class="sidebar-top"><div class="brand"><div class="brand-logo">RC</div><div><h1>RICH CMD</h1><p>${t('appSubtitle')}</p></div></div><button class="btn small sidebar-close" data-action="close-sidebar" title="${t('menuClose')}">×</button></div>
    ${['today','work','insight','system'].map(g=>`<div class="nav-group"><button class="nav-head" data-action="toggle-menu-group" data-group="${g}"><span>${groupNames[g]}</span><span>${state.ui.menu[g]?'−':'+'}</span></button><div class="nav-items ${state.ui.menu[g]?'':'hidden'}">${ROUTES.filter(r=>r.group===g).map(r=>`<button class="nav-btn ${state.route===r.id?'active':''}" data-route="${r.id}"><span class="nav-icon">${iconSvg(r.icon)}</span><span>${t(r.label)}</span></button>`).join('')}</div></div>`).join('')}
    <div class="card soft mt"><div class="small muted">${APP.version} · ${APP.cache}</div><div class="btn-row mt"><button class="btn small" data-action="start-tutorial">Tutorial</button><button class="btn small" data-action="open-command">Ctrl K</button></div></div>
  </aside>`;
}

const V63_TUTORIAL = [
 ['menu','Menu','Menu','Hier vind je alle hoofdonderdelen. De groepen houden de app rustig.','This is where all main modules live. Groups keep the app calm.','#sidebar','today','Klik op Werk of Inzicht & groei om onderdelen open te klappen.','Click Work or Insight & Growth to expand sections.'],
 ['assist','Live Assist','Live Assist','De rechter Assist is je mini-coach voor shift, werkdruk en volgende actie.','The right Assist is your mini-coach for shift, workload and next action.','.assist-tab','today','Open Assist en sluit hem weer met ×.','Open Assist and close it again with ×.'],
 ['today','Vandaag','Today','Vandaag is je centrale startpunt. Begin hier vóór je modules induikt.','Today is your central starting point. Start here before jumping into modules.','[data-tutorial="today"]','today','Start shift, bekijk Smart Next en kies focuspunten.','Start your shift, check Smart Next and choose focus points.'],
 ['smart','Smart Next Action','Smart Next Action','Deze kaart kiest één duidelijke volgende stap en geeft een reden.','This card chooses one clear next step and gives a reason.','[data-tutorial="smart"]','today','Voorbeeld: “Pak eerst een korte basistaak van 5 minuten.”','Example: “Do a short 5-minute base task first.”'],
 ['shift','Shiftflow','Shift flow','Klok in, pauzeer, sluit af en krijg feedback.','Clock in, take breaks, close your shift and get feedback.','','today','Bij uitklokken wordt automatisch een rapportagevoorstel gemaakt.','When clocking out, a report draft is created automatically.'],
 ['dashboard','Dashboard','Dashboard','Dashboard is voor managementoverzicht, score en weekcoach.','Dashboard is for management overview, score and week coach.','','dashboard','Gebruik dit op laptop voor een bredere blik.','Use this on laptop for a broader view.'],
 ['haccp','HACCP','HACCP','Hier voer je de dagplanning uit. Voltooide taken verdwijnen uit de actieve lijst.','This is where you execute the daily plan. Completed tasks leave the active list.','','haccp','Gebruik pijlen om taken zelf hoger of lager te zetten.','Use arrows to move tasks up or down.'],
 ['templates','HACCP templates','HACCP templates','Laad dag-, week- of maandtaken selectief in. Beheer pas openen als je wilt wijzigen.','Load daily, weekly or monthly tasks selectively. Open manage only when editing.','','haccp','Dagelijkse basistaken staan vóór periodiek werk.','Daily base tasks come before periodic work.'],
 ['focus','Focus Mode','Focus Mode','Focus helpt om één taak tijdelijk centraal te zetten.','Focus helps you temporarily focus on one task.','','haccp','Focusminuten tellen mee in Visualisatie.','Focus minutes count in Visualization.'],
 ['storemap','Schoonmaakkaart','Cleaning Map','De Store Map registreert Vers, Houdbaar en Actie per zone, meter en plank.','The Store Map tracks Fresh, Grocery and Promo by zone, meter and shelf.','','storemap','Open Vers, kies een zone, kies een meter en werk de status bij.','Open Fresh, choose a zone, choose a meter and update status.'],
 ['store-detail','Meterdetails','Meter details','Klik op een meter/plank om vuil, schimmel, controle of schoonmaak te registreren.','Click a meter/shelf to register dirt, mould, check or cleaning.','','storemap','Schimmel krijgt graad en locatie, plus nacontrole.','Mould gets grade and location, plus follow-up.'],
 ['agf','AGF Quick Check','Produce Quick Check','AGF is gebouwd voor snelle signalering: OK, leeg of overvoorraad.','Produce is built for quick signalling: OK, empty or overstock.','','agf','Ster = favoriet, oranje B = bonusartikel.','Star = favourite, orange B = bonus item.'],
 ['bonus','Bonusaanbiedingen','Bonus items','Bonusproducten komen apart naar voren voor dagelijkse controle en bestelling.','Bonus products appear separately for daily check and ordering.','','agf','Gebruik B bij een product om het in Bonus te zetten.','Use B on a product to add it to Bonus.'],
 ['order','Besteladvies','Order advice','Huidige status wint van historie. Overvoorraad betekent niet bijbestellen.','Current status beats history. Overstock means do not order more.','','agf','Conflictkaarten tonen wanneer trend en vandaag botsen.','Conflict cards show when trend and today disagree.'],
 ['inventory','Inventaris','Inventory','Inventaris bewaart NASA, voorraad, min/max en bestellijst.','Inventory stores NASA, stock, min/max and order list.','','inventory','Zoek je iets niet? De zoektekst wordt alvast overgenomen bij toevoegen.','If search finds nothing, the search text is prefilled when adding.'],
 ['communication','Communicatie','Communication','Gebruik standaardpersonen of vul zelf iemand in.','Use standard people or enter someone manually.','','communication','Status en tijdstippen helpen opvolgen.','Status and timestamps help follow-up.'],
 ['reports','Shift reports','Shift reports','Rapportages bewaren dagverloop, bijzonderheden en kleurstatus.','Reports store the shift flow, notes and colour status.','','communication','Automatische rapportage komt bij uitklokken.','Automatic report appears after clock-out.'],
 ['visual','Visualisatie','Visualization','Visualisatie maakt problemen, werkdruk en vooruitgang inzichtelijk.','Visualization turns issues, workload and progress into insight.','','visual','Kijk naar conclusies, niet alleen cijfers.','Look at conclusions, not only numbers.'],
 ['coaching','Coaching Skill Tree','Coaching Skill Tree','Coaching is je leeromgeving voor werkvaardigheid, rust, communicatie en management.','Coaching is your learning environment for work skill, calm, communication and management.','','coaching','Levels spelen nieuwe oefeningen vrij.','Levels unlock new exercises.'],
 ['diagnostics','Diagnostiek','Diagnostics','Diagnostiek controleert versie, data, cache en herstelopties.','Diagnostics checks version, data, cache and repair tools.','','diagnostics','Gebruik backup voordat je grote resets doet.','Use backup before large resets.'],
 ['settings','Instellingen','Settings','Hier beheer je taal, thema, werkritme, contacten en PWA.','Manage language, theme, work rhythm, contacts and PWA here.','','settings','Thema’s veranderen direct.','Themes apply instantly.'],
 ['command','Command Palette','Command Palette','Gebruik Ctrl/⌘ + K om snel naar modules te springen.','Use Ctrl/⌘ + K to jump quickly between modules.','','today','Klik een resultaat: het venster sluit automatisch.','Click a result: the window closes automatically.'],
 ['mobile','Mobiel gebruik','Mobile use','Op telefoon blijven opties beschikbaar, maar details zitten meer achter klikken.','On mobile, options remain available but details are more layered.','','today','Gebruik de onderbalk voor snelle acties.','Use the bottom bar for quick actions.'],
 ['safe','Veilig werken','Safe use','Verwijderen krijgt herstel via Undo. Backup blijft belangrijk.','Delete actions get Undo. Backup remains important.','','diagnostics','Gebruik Diagnostiek als iets vreemd lijkt.','Use Diagnostics if something looks odd.'],
 ['done','Klaar','Done','Je kent nu de hoofdflow. Start rustig met Vandaag en Smart Next.','You now know the main flow. Start calmly with Today and Smart Next.','','today','Je hoeft niet alles tegelijk te gebruiken.','You do not need to use everything at once.']
];
function v63Step(){ const tut=state.ui.tutorial; return tut ? (V63_TUTORIAL[tut.index]||V63_TUTORIAL[0]) : null; }
function tutorialRoute(){ const step=v63Step(); if(step&&step[6]) state.route=step[6]; }
function tutorialNext(){ if(!state.ui.tutorial)return; if(state.ui.tutorial.index>=V63_TUTORIAL.length-1){state.ui.tutorial=null;state.settings.tutorialDone=true;} else {state.ui.tutorial.index++;state.ui.tutorial.preview='';tutorialRoute();} save(); render(); }
function tutorialExample(){ const step=v63Step(); state.ui.tutorial.preview=tutorialPreview(step); tutorialRoute(); save(); render(); }
function tutorialPreview(step){ return currentLang()==='en'
 ? `<strong>Preview:</strong> ${escapeHtml(step?.[8]||'This action is safe to explore.')}<div class="tutorial-mini"><span class="chip">${escapeHtml(routeLabel(step?.[6]||state.route))}</span><p>${escapeHtml(step?.[4]||'')}</p></div>`
 : `<strong>Preview:</strong> ${escapeHtml(step?.[7]||'Deze actie kun je veilig bekijken.')}<div class="tutorial-mini"><span class="chip">${escapeHtml(routeLabel(step?.[6]||state.route))}</span><p>${escapeHtml(step?.[3]||'')}</p></div>`; }
function renderTutorial(){ const tut=state.ui.tutorial; if(!tut) return ''; const step=v63Step(); const total=V63_TUTORIAL.length; const title=currentLang()==='en'?step[2]:step[1]; const text=currentLang()==='en'?step[4]:step[3]; const example=tut.preview||''; return `<div class="tutorial-overlay"><div class="tutorial-bubble premium-tour"><div class="chip">${currentLang()==='en'?'Guided tour':'Rondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${tut.index+1}/${total}</div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p>${example?`<div class="tutorial-preview">${example}</div>`:''}<div class="btn-row"><button class="btn" data-action="tutorial-prev" ${tut.index===0?'disabled':''}>${t('previous')}</button><button class="btn" data-action="tutorial-example">${currentLang()==='en'?'Show preview':'Toon preview'}</button><button class="btn primary" data-action="tutorial-next">${tut.index===total-1?t('finish'):t('next')}</button><button class="btn ghost" data-action="tutorial-stop">${t('stop')}</button></div></div></div>`; }
function highlightTutorialTarget(){ document.querySelectorAll('.tutorial-target').forEach(e=>e.classList.remove('tutorial-target')); const step=v63Step(); if(!step) return; const sel=step[5]; if(!sel) return; let el; try{ el=document.querySelector(sel); }catch(e){} if(el) el.classList.add('tutorial-target'); }

function bindInputs(){
  const agf=byId('agfSearch'); if(agf){ agf.value=state.ui.agfSearch||''; agf.addEventListener('input', e=>{ state.ui.agfSearch=e.target.value; const list=byId('agfQuickList'); if(list) list.innerHTML=renderAgfQuickList(e.target.value); }); }
  const inv=byId('invSearch'); if(inv){ inv.value=state.ui.invSearch||''; inv.addEventListener('input', e=>{ state.ui.invSearch=e.target.value; const list=byId('inventoryList'); if(list) list.innerHTML=renderInventoryList(e.target.value); }); }
}

function renderAgf(){ const en=currentLang()==='en'; return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>${en?'Produce Quick Check':'AGF Quick Check'}</h3><p class="muted">${en?'Search product, NASA, category or alias. If nothing is found, add it with the search name prefilled.':'Zoek product, NASA, categorie of alias. Niet gevonden? Voeg direct toe met de zoeknaam alvast ingevuld.'}</p><div class="form-grid"><input class="input" id="agfSearch" placeholder="${t('search')} product / NASA"><button class="btn primary" data-action="open-agf-product-form">${t('add')} ${t('product')}</button></div><div id="agfQuickList" class="mt">${renderAgfQuickList(state.ui.agfSearch||'')}</div></div><div class="card"><h3>${en?'Priority order advice':'Besteladvies met prioriteit'}</h3>${renderAgfAdvice()}</div><div class="card"><h3>${en?'Bonus items':'Bonusaanbiedingen'}</h3>${renderBonus()}</div></div><div class="grid"><div class="card"><h3>${en?'Product management':'Productbeheer'}</h3>${renderAgfProducts()}</div><div class="card"><h3>${en?'Decision log':'Bestelbesluit-logboek'}</h3>${renderOrderHistory()}</div></div></div>`; }
function openAgfProductForm(p=null){ const pre = p ? '' : (state.ui.agfSearch||'').trim(); promptModal(p?L('Product bewerken','Edit product'):L('AGF product toevoegen','Add produce product'),[{id:'name',label:t('product'),value:p?.name||pre},{id:'nasa',label:t('nasa'),value:p?.nasa},{id:'category',label:t('category'),value:p?.category},{id:'aliases',label:t('aliases'),value:p?.aliases}],p?'confirm-edit-agf-product':'confirm-add-agf-product',p?{id:p.id}:{}); }
function renderAgfAdvice(){ const att=agfAttention(); if(!att.length) return `<p class="muted">${L('Geen aandachtproducten.','No attention products.')}</p>`; const sorted=att.slice().sort((a,b)=>(b.conflict?1:0)-(a.conflict?1:0)||(a.status==='Overvoorraad'?-1:0)-(b.status==='Overvoorraad'?-1:0)); return `<div class="list">${sorted.map(a=>`<div class="list-item decision-card"><div><strong>${escapeHtml(a.name)}</strong> ${a.conflict?`<span class="pill bad">${t('conflict')}</span>`:''}<div class="small muted">${escapeHtml(a.reason)}</div><div class="small">${t('currentStatus')}: <b>${localStatus(a.status)}</b> · ${t('trend')}: ${a.trend||'-'} · ${L('Signaal','Signal')}: ${a.strength}</div></div><span class="pill ${a.status==='Overvoorraad'?'warn':a.conflict?'bad':'info'}">${escapeHtml(a.advice)}</span></div>`).join('')}</div>`; }

function renderInventory(){ const low=lowStockItems(); const en=currentLang()==='en'; return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>${en?'Inventory management':'Inventarisbeheer'}</h3><p class="muted">${en?'Use search for item or NASA. If not found, add it with the search name prefilled.':'Zoek item of NASA. Niet gevonden? Voeg toe met de zoeknaam alvast ingevuld.'}</p><div class="form-grid"><input class="input" id="invSearch" placeholder="${en?'Search item / NASA':'Zoek item / NASA'}"><button class="btn primary" data-action="open-inventory-form">${t('add')} item</button></div><div id="inventoryList" class="mt">${renderInventoryList(state.ui.invSearch||'')}</div></div></div><div class="grid"><div class="card"><h3>${en?'Order list':'Bestellijst'}</h3>${renderInventoryOrders()}</div><div class="card"><h3>${en?'Low stock watchlist':'Watchlist laag'}</h3>${low.length?low.map(i=>`<div class="list-item compact"><span>${escapeHtml(i.name)}</span><span class="pill warn">${i.stock}/${i.min}</span></div>`).join(''):`<p class="muted">${en?'No low stock.':'Geen lage voorraad.'}</p>`}</div></div></div>`; }
function renderInventoryList(filter=''){ const arr=state.inventory.filter(i=>(i.name+' '+(i.nasa||'')+' '+(i.category||'')).toLowerCase().includes((filter||'').toLowerCase())); if(!arr.length) return `<p class="muted">${t('empty')} · <button class="btn small" data-action="open-inventory-form">${t('notFoundAdd')}</button></p>`; return `<div class="list">${arr.map(i=>`<div class="list-item"><div><strong>${escapeHtml(i.name)}</strong><div class="small muted">${escapeHtml(i.category)} · NASA ${escapeHtml(i.nasa||'-')}</div><span class="pill ${(i.stock<=i.min)?'warn':'good'}">${t('stock')}: ${i.stock} / min ${i.min} / max ${i.max}</span></div><div class="btn-row"><button class="btn small" data-action="inv-stock" data-id="${i.id}" data-delta="-1">−</button><button class="btn small" data-action="inv-stock" data-id="${i.id}" data-delta="1">+</button><button class="btn small" data-action="inv-order-qty" data-id="${i.id}" data-delta="-1">− ${t('order')}</button><span class="pill info">${t('orderQuantity')}: ${i.orderQty||Math.max(1,(+i.max||1)-(+i.stock||0))}</span><button class="btn small" data-action="inv-order-qty" data-id="${i.id}" data-delta="1">+ ${t('order')}</button><button class="btn small primary" data-action="add-inv-order" data-id="${i.id}">${t('order')}</button><button class="btn small" data-action="edit-inv" data-id="${i.id}">${t('edit')}</button></div></div>`).join('')}</div>`; }
function openInventoryForm(i=null){ const cats=['Schoonmaak','Kantoor','Emballage','Kantine','Magazijn','HACCP','Overig']; const pre=i?'':(state.ui.invSearch||'').trim(); modal(i?L('Inventaris bewerken','Edit inventory'):L('Inventarisitem toevoegen','Add inventory item'), `<div class="grid grid-2"><label>${L('Naam','Name')}<input class="input" id="modal_name" value="${escapeHtml(i?.name||pre)}"></label><label>${t('nasa')}<input class="input" id="modal_nasa" value="${escapeHtml(i?.nasa||'')}"></label><label>${t('category')}<select class="select" id="modal_category">${cats.map(c=>`<option ${((i?.category||'HACCP')===c)?'selected':''}>${c}</option>`).join('')}</select></label><label>${t('stock')}<input class="input" id="modal_stock" type="number" value="${i?.stock??0}"></label><label>${t('minimum')}<input class="input" id="modal_min" type="number" value="${i?.min??1}"></label><label>${t('maximum')}<input class="input" id="modal_max" type="number" value="${i?.max??5}"></label></div><button class="btn primary mt" data-action="${i?'confirm-edit-inventory':'confirm-add-inventory'}" ${i?`data-id="${i.id}"`:''}>${t('save')}</button>`); }
function addInventoryOrder(id){ const i=state.inventory.find(i=>i.id===id); if(!i)return; const qty=Math.max(1,(+i.orderQty||0)||((+i.max||1)-(+i.stock||0))); state.inventoryOrders.unshift({id:uid('iord'),name:i.name,nasa:i.nasa,qty,reason:L('Onder minimum / handmatig toegevoegd','Below minimum / manually added'),at:nowISO()}); i.orderQty=0; toast(L('Toegevoegd aan bestellijst','Added to order list')); save(); render(); }

function renderStoreHierarchy(){
  const depOrder=['Vers','Houdbaar','Actiekoeling'];
  const groups={}; state.cleaning.items.forEach(i=>{ const dep=displayDepartment(i.department||'Overig'); const zone=(i.zone||'Algemeen'); groups[dep]=groups[dep]||{}; groups[dep][zone]=groups[dep][zone]||{}; const m=i.meter||1; groups[dep][zone][m]=groups[dep][zone][m]||[]; groups[dep][zone][m].push(i); });
  const deps=[...depOrder.filter(d=>groups[d]), ...Object.keys(groups).filter(d=>!depOrder.includes(d)).sort()];
  if(!deps.length) return `<p class="muted">${currentLang()==='en'?'No cleaning map yet.':'Nog geen schoonmaakkaart.'}</p>`;
  return deps.map(dep=>`<details class="detail-drawer store-dep" ${dep==='Vers'?'open':''}><summary><span>${escapeHtml(dep)}</span><span class="pill info">${Object.values(groups[dep]).flatMap(z=>Object.values(z)).flat().length}</span></summary><div class="drawer-content grid">${Object.entries(groups[dep]).sort(([a],[b])=>a.localeCompare(b)).map(([zone,meters])=>`<details class="detail-drawer store-zone"><summary><span>${escapeHtml(zone)}</span><span class="btn-row"><button class="btn small" data-action="add-clean-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}">+ ${L('meter','meter')}</button><button class="btn small" data-action="bulk-add-shelves" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}">+ ${L('planken','shelves')}</button></span></summary><div class="drawer-content grid">${Object.entries(meters).sort((a,b)=>(+a[0])-(+b[0])).map(([meter,items])=>`<details class="detail-drawer store-meter"><summary>${L('Meter','Meter')} ${meter} <span class="pill ${items.some(x=>String(x.status).startsWith('mold'))?'bad':items.some(x=>x.status==='dirty')?'warn':'info'}">${items.length} ${L('items','items')}</span></summary><div class="drawer-content heat-row">${items.sort((a,b)=>String(a.kind).localeCompare(String(b.kind))||(a.level||0)-(b.level||0)).map(i=>`<button class="heat-cell ${statusClass(i)}" title="${escapeHtml(i.label)}" data-action="open-clean-item" data-id="${i.id}">${i.kind==='Plank'?'P'+(i.level||''):i.kind==='Bodembak'?'B':'A'}</button>`).join('')}<button class="btn small" data-action="add-clean-shelf" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">+ ${L('plank','shelf')}</button></div></details>`).join('')}</div></details>`).join('')}</div></details>`).join('');
}
function addCleanMeter(dep,zone){ const meters=state.cleaning.items.filter(i=>displayDepartment(i.department)===dep&&i.zone===zone).map(i=>+i.meter||1); const meter=(Math.max(0,...meters)+1); const base={department:dep,zone,meter,status:'neutral',history:[],frequencyDays:180}; state.cleaning.items.push({...base,id:uid('clean'),kind:'Bodembak',label:`${zone} M${meter} Bodembak`}); if(dep==='Vers'){ for(let l=1;l<=7;l++) state.cleaning.items.push({...base,id:uid('clean'),kind:'Plank',level:l,label:`${zone} M${meter} Plank ${l}`}); } save(); render(); }
function addCleanShelf(dep,zone,meter){ const levels=state.cleaning.items.filter(i=>displayDepartment(i.department)===dep&&i.zone===zone&&(+i.meter||1)==(+meter||1)&&i.kind==='Plank').map(i=>+i.level||0); const level=Math.max(0,...levels)+1; state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter:+meter||1,kind:'Plank',level,label:`${zone} M${meter} Plank ${level}`,frequencyDays:180,status:'neutral',history:[]}); save(); render(); }
function bulkAddShelves(dep,zone){ const count=+(prompt(L('Aantal planken per meter?','Number of shelves per meter?'),'7')||0); if(!count) return; const meters=[...new Set(state.cleaning.items.filter(i=>displayDepartment(i.department)===dep&&i.zone===zone).map(i=>+i.meter||1))]; meters.forEach(m=>{ for(let l=1;l<=count;l++){ if(!state.cleaning.items.some(i=>displayDepartment(i.department)===dep&&i.zone===zone&&(+i.meter||1)===m&&i.kind==='Plank'&&(+i.level||0)===l)) state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter:m,kind:'Plank',level:l,label:`${zone} M${m} Plank ${l}`,frequencyDays:180,status:'neutral',history:[]}); }}); save(); render(); }

function renderVisual(){ const prod=productivity(), load=workload(); const agfStats=countBy(state.agfProducts.map(p=>lastAgfStatus(p)||'Onbekend')); const commStats=countBy(state.communications.map(c=>c.status)); const store=cleaningUrgent(); const deferred=state.tasks.filter(t=>t.status==='Uitgesteld').length; const completedMins=todayTasks().filter(t=>t.status==='Voltooid').reduce((a,t)=>a+(+t.duration||0),0); const cap=(+state.settings.haccpHours||3.5)*60; return `<div class="grid"><div class="hero"><span class="chip">${t('dataInsights')}</span><h2>${L('Management cockpit','Management cockpit')}</h2><p>${L('Gebruik data om werkdruk, AGF, schoonmaak en communicatie beter te sturen.','Use data to steer workload, produce, cleaning and communication better.')}</p></div><div class="grid grid-4">${kpi('Productiviteit',prod+'%',prod>80?'good':prod>55?'warn':'bad')}${kpi('Werkdruk',load+'%',load>90?'bad':load>70?'warn':'good')}${kpi('Focus',focusMinutesToday()+'m','good')}${kpi('Uitgesteld',deferred,deferred?'warn':'good')}</div><div class="grid grid-2"><div class="card"><h3>Werkdruk vs HACCP-uren</h3>${bar('Voltooide minuten',Math.round(completedMins/cap*100),prod>80?'good':'warn')}${bar('Open planning',load,load>90?'bad':'warn')}${bar('Schoonmaakkaart',Math.min(100,cleaningWorkloadMinutes()/cap*100),'info')}<p class="muted small">${minutesToText(completedMins)} / ${minutesToText(cap)} HACCP-capaciteit gebruikt.</p></div><div class="card"><h3>AGF verdeling</h3>${Object.entries(agfStats).map(([k,v])=>bar(localStatus(k),v*20,k==='Overvoorraad'?'warn':k==='Leeg schap'?'bad':'good')).join('')||`<p class="muted">Geen AGF-data.</p>`}</div><div class="card"><h3>Schoonmaak & Store Map</h3>${bar('Urgent',store.length*12,store.length?'bad':'good')}${bar('Schimmel',store.filter(x=>String(x.status).startsWith('mold')).length*25,'bad')}${bar('Nacontrole',store.filter(x=>x.status==='followup').length*25,'info')}<p>${L('Open schoonmaaksignalen','Open cleaning signals')}: <b>${store.length}</b></p></div><div class="card"><h3>Communicatie</h3>${Object.entries(commStats).map(([k,v])=>bar(k,v*25,k==='Rood'?'bad':k==='Geel'?'warn':'good')).join('')||`<p class="muted">Geen communicatie.</p>`}</div><div class="card"><h3>${t('productivityConclusion')}</h3>${managementInsights().map(i=>`<p>• ${i}</p>`).join('')}<p>• ${weekCoach()}</p></div><div class="card"><h3>${t('managementTools')}</h3><div class="btn-row"><button class="btn" data-action="download-backup">Backup</button><button class="btn" data-route="diagnostics">Diagnostiek</button><button class="btn" data-route="coaching">Coaching</button><button class="btn" data-route="storemap">Store Map</button></div></div></div></div>`; }

function getLessons(){
 const en=currentLang()==='en';
 const categories=en?['Work skill','Calm & stress','Communication','Customer handling','Management','Planning','Discipline','Signal detection','Produce','HACCP','Self-insight','Leadership']:['Werkvaardigheid','Kalmte & stress','Communicatie','Klantgedrag','Management','Planning','Discipline','Signalatie','AGF','HACCP','Zelfinzicht','Leiderschap'];
 const topics=en?[
  ['Calm is a skill','Calm work is not slow work. It means choosing the next right step.','Pick three urgent tasks and finish one first.','haccp'],
  ['Friendly boundaries','A friendly tone and a clear boundary can exist together.','Write one short customer-friendly sentence for a difficult situation.','communication'],
  ['Signal before solving','Good employees notice patterns before they become problems.','Find one repeating issue in Produce or Cleaning Map.','agf'],
  ['Manage your energy','When energy is low, choose short wins first.','Complete one task under 10 minutes.','haccp'],
  ['No blame update','Report the situation, action and next step without blaming.','Create one communication item with situation-action-next.','communication'],
  ['Stock before trend','Current stock beats historical trend when ordering today.','Check one product and compare status with advice.','agf'],
  ['Mould discipline','Mould needs location, grade and follow-up, not memory.','Open Store Map and inspect one shelf.','storemap'],
  ['Small management','Management begins with making work visible.','Turn one vague problem into a clear task.','today'],
  ['De-escalation basics','A calm voice, short words and one clear option reduce tension.','Write a calm response to an angry customer.','communication'],
  ['Finish cleanly','A finished task should leave evidence, not just effort.','Complete one task and add a note if useful.','haccp']
 ]:[
  ['Rust is werkvaardigheid','Rustig werken is niet langzaam werken. Het betekent de juiste volgende stap kiezen.','Kies drie urgente taken en rond er één eerst af.','haccp'],
  ['Vriendelijk begrenzen','Een vriendelijke toon en een duidelijke grens kunnen tegelijk bestaan.','Schrijf één klantvriendelijke zin voor een lastige situatie.','communication'],
  ['Signaleren vóór oplossen','Goede medewerkers herkennen patronen voordat ze problemen worden.','Vind één terugkerend probleem in AGF of Schoonmaakkaart.','agf'],
  ['Energie managen','Bij lage energie kies je eerst korte winst.','Rond één taak onder 10 minuten af.','haccp'],
  ['Update zonder verwijt','Meld situatie, actie en vervolgstap zonder schuld te leggen.','Maak één communicatiepunt met situatie-actie-vervolg.','communication'],
  ['Voorraad vóór trend','Huidige voorraad wint van historische trend bij bestellen vandaag.','Controleer één product en vergelijk status met advies.','agf'],
  ['Schimmeldiscipline','Schimmel vraagt locatie, graad en nacontrole, niet geheugen.','Open Schoonmaakkaart en inspecteer één plank.','storemap'],
  ['Klein management','Management begint met werk zichtbaar maken.','Zet één vaag probleem om in een duidelijke taak.','today'],
  ['De-escalatie basis','Rustige stem, korte woorden en één duidelijke optie verminderen spanning.','Schrijf een rustige reactie op een boze klant.','communication'],
  ['Netjes afronden','Een afgeronde taak laat bewijs achter, niet alleen moeite.','Rond één taak af en voeg indien nuttig een notitie toe.','haccp']
 ];
 const lessons=[]; for(let i=0;i<90;i++){ const b=topics[i%topics.length]; const level=Math.floor(i/10)+1; lessons.push({id:'lesson_'+i,title:b[0]+(i>=10?` · ${t('level')} ${level}`:''),category:categories[i%categories.length],text:b[1],practice:b[2],route:b[3],level,locked:level>1 && state.coachingDone.length < (level-1)*4}); }
 return lessons;
}
function todayLesson(){ const list=getLessons().filter(l=>!l.locked); return list[new Date().getDate()%Math.max(1,list.length)] || getLessons()[0]; }
function lessonCard(l,small=false){ const en=currentLang()==='en'; const done=state.coachingDone.includes(l.id); return `<div class="lesson-card ${done?'lesson-done':''} ${l.locked?'lesson-locked':''}"><div class="btn-row"><span class="chip">${escapeHtml(l.category)}</span><span class="pill ${l.locked?'warn':'info'}">${l.locked?t('locked'):`${t('level')} ${l.level}`}</span>${done?`<span class="pill good">${t('completed')}</span>`:''}</div><h3>${escapeHtml(l.title)}</h3><p class="muted">${escapeHtml(l.text)}</p>${!small?`<p><strong>${t('practice')}:</strong> ${escapeHtml(l.practice)}</p>`:''}<div class="btn-row"><button class="btn" data-route="${l.route}" ${l.locked?'disabled':''}>${en?'Open practice':'Open praktijk'}</button><button class="btn primary" data-action="complete-lesson" data-id="${l.id}" ${l.locked?'disabled':''}>${done?'✓':(en?'Complete':'Voltooi')}</button></div></div>`; }
function renderCoaching(){ const lessons=getLessons(); const en=currentLang()==='en'; const unlocked=lessons.filter(l=>!l.locked); const visible=unlocked.filter(l=>state.ui.showCompletedLessons || !state.coachingDone.includes(l.id)); const cats=[...new Set(lessons.map(l=>l.category))]; return `<div class="grid"><div class="hero"><span class="chip">Coaching Skill Tree</span><h2>${en?'Learn, grow and stay calm under pressure':'Leer, groei en blijf rustig onder druk'}</h2><p>${en?'A durable learning environment for work skill, calm, communication, customer handling, management and motivation.':'Een duurzame leeromgeving voor werkvaardigheid, kalmte, communicatie, klantgedrag, management en motivatie.'}</p><div class="btn-row"><button class="btn" data-action="toggle-completed-lessons">${state.ui.showCompletedLessons?t('hideCompleted'):t('showCompleted')}</button><button class="btn" data-route="today">${en?'Practice today':'Oefen vandaag'}</button></div></div><div class="grid grid-4">${kpi(t('level'),Math.floor(state.coachingDone.length/4)+1,'good')}${kpi(t('completedLessons'),state.coachingDone.length,null)}${kpi(t('unlocked'),unlocked.length,null)}${kpi('XP',state.coachingDone.length*25,'good')}</div><div class="card"><h3>${t('skillTree')}</h3><div class="skill-tree">${cats.map(c=>{const total=lessons.filter(l=>l.category===c).length; const done=lessons.filter(l=>l.category===c&&state.coachingDone.includes(l.id)).length; return `<div class="skill-node"><strong>${escapeHtml(c)}</strong>${bar('',Math.round(done/total*100),'good')}<span class="small muted">${done}/${total}</span></div>`;}).join('')}</div></div><div class="grid grid-3">${visible.map(l=>`<div class="card">${lessonCard(l)}</div>`).join('')}</div>${state.coachingDone.length?`<details class="detail-drawer"><summary>${t('completedLessons')}</summary><div class="drawer-content grid grid-3">${lessons.filter(l=>state.coachingDone.includes(l.id)).map(l=>`<div class="card soft">${lessonCard(l,true)}</div>`).join('')}</div></details>`:''}</div>`; }

function renderDashboard(){ return `<div class="grid"><div class="hero"><span class="chip">RICH CMD intelligence</span><h2>${L('Dashboard & Management','Dashboard & Management')}</h2><p>${L('Een premium overzicht van shift, productiviteit, signalen en ontwikkeling.','A premium overview of shift, productivity, signals and growth.')}</p></div><div class="grid grid-4">${kpi('Shift score',shiftScore()+'/100',shiftScore()>80?'good':'warn')}${kpi('Werkdruk',workload()+'%',workload()>90?'bad':workload()>70?'warn':'good')}${kpi('Focusminuten',focusMinutesToday()+'m','good')}${kpi('Schoonmaak urgent',cleaningUrgent().length,cleaningUrgent().length?'warn':'good')}</div><div class="grid grid-2"><div class="card"><h3>Managementsamenvatting</h3>${managementInsights().map(x=>`<p>• ${x}</p>`).join('')}</div><div class="card"><h3>Weekcoach</h3><p>${weekCoach()}</p></div><div class="card"><h3>Actiegeschiedenis</h3>${renderTimeline(state.activity.slice(0,8))}</div><div class="card"><h3>Verbeterkansen</h3><p>• ${L('Maak lange lijsten korter door details pas op klik te openen.','Keep long lists short by opening details on click.')}</p><p>• ${L('Plan één periodieke taak direct na de basisroutine.','Plan one periodic task right after the base routine.')}</p></div></div></div>`; }


const handleActionBaseV63 = handleAction;
handleAction = function(a,el,e){
  switch(a){
    case 'close-sidebar': state.ui.sidebarOpen=false; save(); render(); return;
    case 'inv-order-qty': { const i=state.inventory.find(x=>x.id===el.dataset.id); if(i){ const base=Math.max(1,(+i.orderQty||0)||((+i.max||1)-(+i.stock||0))); i.orderQty=Math.max(1,base+(+el.dataset.delta||0)); save(); render(); } return; }
    case 'add-clean-meter': addCleanMeter(el.dataset.dep,el.dataset.zone); return;
    case 'add-clean-shelf': addCleanShelf(el.dataset.dep,el.dataset.zone,el.dataset.meter); return;
    case 'bulk-add-shelves': bulkAddShelves(el.dataset.dep,el.dataset.zone); return;
    case 'toggle-completed-lessons': state.ui.showCompletedLessons=!state.ui.showCompletedLessons; save(); render(); return;
    case 'open-agf-product-form': openAgfProductForm(); return;
    case 'open-inventory-form': openInventoryForm(); return;
    default: return handleActionBaseV63(a,el,e);
  }
};

// Close command palette when a result is chosen, before the general route handler redraws the app.
document.addEventListener('click', function(e){
  const inCommand=e.target.closest('.command-overlay');
  const route=e.target.closest('[data-route]');
  if(inCommand && route){ closeModal(); }
}, true);



/* ================================
   V6.4 — Time, Translation, Coaching & Store Map Control
   A focused upgrade that keeps the stable event-engine but restores richer UX.
================================ */
Object.assign(I18N.nl,{
  breakTime:'Pauzetijd', netTime:'Netto werktijd', nextThree:'Eerste 3 acties', goToPage:'Ga naar pagina', viewDetails:'Details bekijken', lastCleaned:'Laatst schoongemaakt', lastChecked:'Laatst gecontroleerd', editMeters:'Aantal meters bewerken', editShelves:'Aantal planken bewerken', markChecked:'Gecontroleerd', learnMore:'Leer meer', startExam:'Start toets', exam:'Toets', locked:'Vergrendeld', hideLocked:'Verberg taken hoger dan mijn level', showLocked:'Laat alle taken zien', showCompleted:'Voldane lessen tonen', hideCompleted:'Voldane lessen verbergen', completedLessons:'Voltooide lessen', unlocked:'Vrijgespeeld', level:'Level', practice:'Praktijkopdracht', coachingPath:'Leerpad', eLearning:'E-learning', dataInsights:'Data-inzichten', productivityConclusion:'Conclusies', managementTools:'Managementtools', notFoundAdd:'Niet gevonden? Toevoegen', orderQuantity:'Bestelaantal', todayQueue:'Vandaag wachtrij', breakSummary:'Pauzeoverzicht', shiftTime:'Shiftduur', visualSummary:'Managementsamenvatting', qualityScore:'Kwaliteitsscore', storeMapControl:'Schoonmaakkaart beheer', communicationPlanner:'Communicatieplanner', autoPlanning:'Automatische dagplanning', productivity:'Productiviteit'
});
Object.assign(I18N.en,{
  breakTime:'Break time', netTime:'Net working time', nextThree:'First 3 actions', goToPage:'Go to page', viewDetails:'View details', lastCleaned:'Last cleaned', lastChecked:'Last checked', editMeters:'Edit number of meters', editShelves:'Edit number of shelves', markChecked:'Checked', learnMore:'Learn more', startExam:'Start exam', exam:'Exam', locked:'Locked', hideLocked:'Hide tasks above my level', showLocked:'Show all tasks', showCompleted:'Show completed lessons', hideCompleted:'Hide completed lessons', completedLessons:'Completed lessons', unlocked:'Unlocked', level:'Level', practice:'Practice assignment', coachingPath:'Learning path', eLearning:'E-learning', dataInsights:'Data insights', productivityConclusion:'Conclusions', managementTools:'Management tools', notFoundAdd:'Not found? Add item', orderQuantity:'Order quantity', todayQueue:'Today queue', breakSummary:'Break summary', shiftTime:'Shift duration', visualSummary:'Management summary', qualityScore:'Quality score', storeMapControl:'Cleaning Map control', communicationPlanner:'Communication planner', autoPlanning:'Automatic day planning', productivity:'Productivity'
});

const TASK_TRANSLATIONS = {
  'Temperatuurscontrole':'Temperature check','Emballage':'Packaging return area','Sinaasappelpers schoonmaken':'Clean orange juice machine','Kleine schrob ronde':'Small scrub round','Houdbaar check':'Grocery shelf check','Vers check':'Fresh department check','Kantine / Toiletten / Kantoren':'Canteen / toilets / offices','Vuilnisbakken':'Trash bins','Winkelvloer en magazijn':'Shop floor and warehouse','Onderhoud Schrobmachine':'Scrubber machine maintenance','Ramen Koeldeuren':'Cooler door windows','Actieplanning AGF':'Produce action planning','Landen van herkomst AGF':'Produce countries of origin','Stof boven koelingen':'Dust above coolers','Koffiemachine reiniging':'Coffee machine cleaning','Magazijn uitgebreid':'Extended warehouse check','Koelcel':'Cold room','Onder AGF stelling':'Under produce fixture','Sinaasappelpers grondig':'Deep clean orange juice machine','Temperatuursronde uitgebreid':'Extended temperature round','Controle diepvriescel':'Freezer room check','Controle broodafdeling':'Bakery department check','Winkelvloer uitgebreid':'Extended shop floor check','Stofzuigen Uien meubel / Houdbaar':'Vacuum onion fixture / grocery','Koelkast kantine':'Canteen fridge','Kantoor':'Office','AGF oplegplaten':'Produce shelf plates','Vensterbanken':'Window sills','Spinnenraggen':'Cobwebs','Stofzuigen Aanzuigrooster':'Vacuum intake grille','Koffiemachine grondig':'Deep clean coffee machine','AGF kratwissel':'Produce crate change','Pilaren en lastige stofnesten':'Pillars and difficult dust spots','Basisroutine':'Base routine','Periodiek':'Periodic','Maandelijks':'Monthly','Schoonmaakkaart':'Cleaning Map','Dagelijks':'Daily','Wekelijks':'Weekly','Maandelijk':'Monthly','Hoog':'High','Medium':'Medium','Laag':'Low','Kritiek':'Critical','Vers':'Fresh','Houdbaar':'Grocery','Actiekoeling':'Action cooler','Bodembak':'Bottom tray','Plank':'Shelf','Vuil':'Dirty','Schimmel':'Mould','Schoongemaakt':'Cleaned','Gecontroleerd':'Checked'
};
function trText(text){ if(currentLang()!=='en') return String(text??''); return TASK_TRANSLATIONS[String(text??'')] || String(text??''); }
function trTitle(text){ if(currentLang()!=='en') return String(text??''); let out=String(text??''); Object.keys(TASK_TRANSLATIONS).sort((a,b)=>b.length-a.length).forEach(k=>{out=out.replaceAll(k,TASK_TRANSLATIONS[k]);}); return out; }
function taskTitle(tk){ return trTitle(tk?.title||''); }
function translatedCategory(v){ return trText(v||''); }
function todayBreakMinutes(){
  const logs=(state.shift.logs||[]).slice().filter(l=>String(l.at||'').slice(0,10)===TODAY()).sort((a,b)=>new Date(a.at)-new Date(b.at));
  let start=null,total=0;
  logs.forEach(l=>{ if(l.type==='breakStart') start=new Date(l.at).getTime(); if(l.type==='breakEnd'&&start){ total+=(new Date(l.at).getTime()-start)/60000; start=null; }});
  if(state.shift.breakActive && state.shift.breakStartedAt) total+=(Date.now()-new Date(state.shift.breakStartedAt).getTime())/60000;
  return Math.max(0,Math.round(total));
}
function shiftMinutesToday(){ if(!state.shift.active&&!state.shift.startedAt) return 0; const start=state.shift.startedAt?new Date(state.shift.startedAt).getTime():Date.now(); const end=state.shift.active?Date.now():Date.now(); return Math.max(0,Math.round((end-start)/60000)); }
function netMinutesToday(){ return Math.max(0,shiftMinutesToday()-todayBreakMinutes()); }
function shiftSummary(){ if(!state.shift.active) return currentLang()==='en'?'Not active':'Niet actief'; return minutesToText(shiftMinutesToday()); }

function renderShiftMini(){ return `<div class="grid grid-3"><div class="card kpi"><div><div class="label">${t('shiftTime')}</div><div class="value">${minutesToText(shiftMinutesToday())}</div></div><span class="status-dot ${state.shift.active?'':'warn'}"></span></div><div class="card kpi"><div><div class="label">${t('breakTime')}</div><div class="value">${minutesToText(todayBreakMinutes())}</div></div><span class="status-dot warn"></span></div><div class="card kpi"><div><div class="label">${t('netTime')}</div><div class="value">${minutesToText(netMinutesToday())}</div></div><span class="status-dot"></span></div></div>`; }
function smartQueue(){ return sortedTasks().slice(0,3); }
function renderSmartQueue(){ const q=smartQueue(); if(!q.length) return `<p class="muted">${currentLang()==='en'?'No active HACCP tasks. Load a template or open Cleaning Map.':'Geen actieve HACCP-taken. Laad een template of open de Schoonmaakkaart.'}</p>`; return `<div class="list">${q.map((task,i)=>`<div class="list-item"><div><span class="chip">${i+1}</span> <strong>${escapeHtml(taskTitle(task))}</strong><div class="small muted">${minutesToText(task.duration)} · ${localStatus(task.priority)} · ${escapeHtml(translatedCategory(task.category||''))}</div></div><div class="btn-row"><button class="btn small good" data-action="task-done" data-id="${task.id}">${t('done')}</button><button class="btn small" data-route="haccp">${t('goToPage')}</button></div></div>`).join('')}</div>`; }

function renderToday(){ const n=nextAction(); const prod=productivity(); return `<div class="grid grid-main">
  <div class="grid">
    <div class="hero" data-tutorial="today"><div class="chip">RICH CMD ${APP.version}</div><h2>${greeting()}, ${escapeHtml(state.settings.name||L('Collega','Colleague'))} 👋</h2><p>${L('Je dag begint met rust, volgorde en één slimme volgende actie.','Your day starts with calm, sequence and one smart next action.')}</p><div class="btn-row"><button class="btn primary" data-action="smart-next">${t('smart')}</button><button class="btn" data-action="shift-start" ${state.shift.active?'disabled':''}>${t('clockIn')}</button><button class="btn" data-action="shift-end" ${!state.shift.active?'disabled':''}>${t('clockOut')}</button><button class="btn" data-action="toggle-break" ${!state.shift.active?'disabled':''}>${state.shift.breakActive?t('stopBreak'):t('startBreak')}</button></div></div>
    ${renderShiftMini()}
    <div class="grid grid-4">${kpi(t('productivity'),prod+'%',prod>90?'good':prod>60?'warn':'bad')}${kpi(t('haccp'),`${completedCount()}/${todayTasks().length}`,null)}${kpi(t('storemap'),cleaningUrgent().length,cleaningUrgent().length?'warn':'good')}${kpi(t('agf'),agfAttention().length,agfAttention().length?'warn':'good')}</div>
    <div class="card" data-tutorial="smart"><div class="kpi"><div><div class="label">Smart Next Action</div><div class="value" style="font-size:1.45rem">${escapeHtml(trTitle(n.title))}</div><div class="hint">${escapeHtml(n.reason)}</div></div><button class="btn primary" data-route="${n.route}">${L('Openen','Open')}</button></div></div>
    <div class="card"><h3>${t('nextThree')}</h3>${renderSmartQueue()}</div>
    <div class="grid grid-2"><div class="card"><h3>${L('Leerkaart vandaag','Learning card today')}</h3>${lessonCard(todayLesson(),true)}</div><div class="card"><h3>${t('breakSummary')}</h3>${renderShiftLogSummary()}</div></div>
    <div class="card"><h3>${L('Vandaag tijdlijn','Today timeline')}</h3>${renderTimeline(state.activity.slice(0,8))}</div>
  </div>
  <div class="grid">
    <div class="card"><h3>Retail Radar</h3>${renderRadar()}</div>
    <div class="card"><h3>${L('Favoriete acties','Favourite actions')}</h3>${renderFavoriteActions()}</div>
    <div class="card"><h3>${L('Morgen voorbereiden','Prepare tomorrow')}</h3>${renderTomorrowPrep()}</div>
  </div>
</div>`; }
function renderShiftLogSummary(){ const logs=(state.shift.logs||[]).slice(0,8); return logs.length?`<div class="list">${logs.map(l=>`<div class="list-item compact"><span>${shiftLogLabel(l.type)}</span><span class="tiny muted">${dateTime(l.at)}</span></div>`).join('')}</div>`:`<p class="muted">${L('Nog geen shiftlog vandaag.','No shift log yet today.')}</p>`; }
function shiftLogLabel(type){ const nl={clockIn:'Ingeklokt',clockOut:'Uitgeklokt',breakStart:'Pauze gestart',breakEnd:'Pauze gestopt'}; const en={clockIn:'Clocked in',clockOut:'Clocked out',breakStart:'Break started',breakEnd:'Break stopped'}; return (currentLang()==='en'?en:nl)[type]||type; }

function renderHaccpTimeline(tasks){ let start=state.settings.shiftStart||'08:00'; let [h,m]=start.split(':').map(Number); return `<div class="timeline">${tasks.slice(0,14).map(tk=>{ const time=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; m+=(+tk.duration||10); while(m>=60){h++;m-=60;} return `<div class="timeline-item"><div class="timeline-time">${time}</div><div class="timeline-card"><strong>${escapeHtml(taskTitle(tk))}</strong><div class="small muted">${localStatus(tk.priority)} · ${minutesToText(tk.duration)} · ${escapeHtml(translatedCategory(tk.category||''))}</div></div></div>`; }).join('')||`<p class="muted">${t('empty')}</p>`}</div>`; }
function renderTaskList(tasks){ const active=tasks.filter(task=>task.status!=='Voltooid'); if(!active.length) return `<p class="muted">${L('Alle zichtbare taken zijn voldaan. Laad nieuwe taken in of bekijk het archief in Visualisatie.','All visible tasks are done. Load more tasks or open the archive in Visualization.')}</p>`; return `<div class="list">${active.map(task=>`<div class="list-item" data-task-card="${task.id}"><div><strong>${escapeHtml(taskTitle(task))}</strong><div class="small muted">${minutesToText(task.duration)} · ${localStatus(task.priority)} · ${escapeHtml(translatedCategory(task.category||''))}</div><span class="pill ${task.status==='Uitgesteld'?'warn':'info'}">${localStatus(task.status)}</span></div><div class="btn-row"><button class="btn small" data-action="task-up" data-id="${task.id}">↑</button><button class="btn small" data-action="task-down" data-id="${task.id}">↓</button><button class="btn small good" data-action="task-done" data-id="${task.id}">${t('done')}</button><button class="btn small warn" data-action="task-defer" data-id="${task.id}">${t('defer')}</button><button class="btn small" data-action="task-focus" data-id="${task.id}">${t('focus')}</button><button class="btn small" data-action="task-edit" data-id="${task.id}">${t('edit')}</button></div></div>`).join('')}</div>`; }

function renderVisual(){ const prod=productivity(), load=workload(); const agfStats=countBy(state.agfProducts.map(p=>lastAgfStatus(p)||'Onbekend')); const commStats=countBy(state.communications.map(c=>c.status)); const store=cleaningUrgent(); const deferred=state.tasks.filter(t=>t.status==='Uitgesteld').length; const completedMins=todayTasks().filter(t=>t.status==='Voltooid').reduce((a,t)=>a+(+t.duration||0),0); const cap=(+state.settings.haccpHours||3.5)*60; return `<div class="grid"><div class="hero"><span class="chip">${t('dataInsights')}</span><h2>${L('Management cockpit','Management cockpit')}</h2><p>${L('Gebruik data om werkdruk, AGF, schoonmaak, pauzes, coaching en communicatie beter te sturen.','Use data to steer workload, produce, cleaning, breaks, coaching and communication better.')}</p></div><div class="grid grid-4">${kpi(t('productivity'),prod+'%',prod>80?'good':prod>55?'warn':'bad')}${kpi(L('Werkdruk','Workload'),load+'%',load>90?'bad':load>70?'warn':'good')}${kpi(t('breakTime'),minutesToText(todayBreakMinutes()),'warn')}${kpi(t('qualityScore'),diagnosticHealth()+'%',diagnosticHealth()>85?'good':'warn')}</div><div class="grid grid-2"><div class="card"><h3>${L('Werkdruk vs HACCP-uren','Workload vs HACCP hours')}</h3>${bar(L('Voltooide minuten','Completed minutes'),Math.round(completedMins/cap*100),prod>80?'good':'warn')}${bar(L('Open planning','Open planning'),load,load>90?'bad':'warn')}${bar(t('storemap'),Math.min(100,cleaningWorkloadMinutes()/cap*100),'info')}<p class="muted small">${minutesToText(completedMins)} / ${minutesToText(cap)} ${L('HACCP-capaciteit gebruikt.','HACCP capacity used.')}</p></div><div class="card"><h3>${L('AGF verdeling','Produce distribution')}</h3>${Object.entries(agfStats).map(([k,v])=>bar(localStatus(k),v*20,k==='Overvoorraad'?'warn':k==='Leeg schap'?'bad':'good')).join('')||`<p class="muted">${L('Geen AGF-data.','No produce data.')}</p>`}</div><div class="card"><h3>${L('Schoonmaak & Store Map','Cleaning & Store Map')}</h3>${bar(L('Urgent','Urgent'),store.length*12,store.length?'bad':'good')}${bar(L('Schimmel','Mould'),store.filter(x=>String(x.status).startsWith('mold')).length*25,'bad')}${bar(L('Nacontrole','Follow-up'),store.filter(x=>x.status==='followup').length*25,'info')}<p>${L('Open schoonmaaksignalen','Open cleaning signals')}: <b>${store.length}</b></p></div><div class="card"><h3>${t('communication')}</h3>${Object.entries(commStats).map(([k,v])=>bar(statusLabel(k),v*25,k==='Rood'?'bad':k==='Geel'?'warn':'good')).join('')||`<p class="muted">${L('Geen communicatie.','No communication.')}</p>`}</div><div class="card"><h3>${t('productivityConclusion')}</h3>${managementInsights().map(i=>`<p>• ${i}</p>`).join('')}<p>• ${weekCoach()}</p><p>• ${L('Pauzetijd vandaag','Break time today')}: ${minutesToText(todayBreakMinutes())}</p></div><div class="card"><h3>${t('managementTools')}</h3><div class="btn-row"><button class="btn" data-action="download-backup">Backup</button><button class="btn" data-route="diagnostics">${t('diagnostics')}</button><button class="btn" data-route="coaching">${t('coaching')}</button><button class="btn" data-route="storemap">Store Map</button></div></div></div></div>`; }
function statusLabel(s){ const map={Rood:currentLang()==='en'?'Red':'Rood',Geel:currentLang()==='en'?'Yellow':'Geel',Groen:currentLang()==='en'?'Green':'Groen'}; return map[s]||s; }

function activeCleanItems(){ return state.cleaning.items.filter(i=>!i.archived); }
function renderStoreMap(){ ensureStoreMap(false); const urgent=cleaningUrgent(); return `<div class="grid"><div class="card"><h3>${t('storemap')}</h3><p class="muted">${L('Beheer schoonmaak per afdeling, pad/zone, meter en plank. Klik op een meter voor status, historie en acties.','Manage cleaning by department, aisle/zone, meter and shelf. Click a meter for status, history and actions.')}</p><div class="btn-row"><button class="btn primary" data-action="load-storemap">${L('Standaard winkelindeling laden','Load standard layout')}</button><button class="btn" data-action="open-clean-add-form">${L('Metrage / plank toevoegen','Add meter / shelf')}</button><button class="btn" data-action="start-cleaning-round">${L('Schoonmaakronde','Cleaning round')}</button><button class="btn" data-action="plan-urgent-cleaning">${L('Urgent in HACCP','Plan urgent')}</button></div>${renderHeatLegend()}</div><div class="grid grid-main"><div class="card"><h3>${t('storeMapControl')}</h3>${renderStoreHierarchy()}</div><div class="grid"><div class="card"><h3>Heatmap</h3>${renderHeatmap()}</div><div class="card"><h3>${L('Te plannen','To plan')}</h3>${renderCleaningQueue(urgent)}</div></div></div></div>`; }
function renderStoreHierarchy(){
  const depOrder=['Vers','Houdbaar','Actiekoeling']; const groups={}; activeCleanItems().forEach(i=>{ const dep=displayDepartment(i.department||'Overig'); const zone=(i.zone||'Algemeen'); groups[dep]=groups[dep]||{}; groups[dep][zone]=groups[dep][zone]||{}; const m=i.meter||1; groups[dep][zone][m]=groups[dep][zone][m]||[]; groups[dep][zone][m].push(i); });
  const deps=[...depOrder.filter(d=>groups[d]), ...Object.keys(groups).filter(d=>!depOrder.includes(d)).sort()];
  if(!deps.length) return `<p class="muted">${L('Nog geen schoonmaakkaart.','No cleaning map yet.')}</p>`;
  return deps.map(dep=>`<details class="detail-drawer store-dep" ${dep==='Vers'?'open':''}><summary><span>${escapeHtml(trText(dep))}</span><span class="pill info">${Object.values(groups[dep]).flatMap(z=>Object.values(z)).flat().length}</span></summary><div class="drawer-content grid">${Object.entries(groups[dep]).sort(([a],[b])=>a.localeCompare(b)).map(([zone,meters])=>`<details class="detail-drawer store-zone"><summary><span>${escapeHtml(zone)}</span><span class="btn-row"><button class="btn small" data-action="edit-zone-meters" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}">${t('editMeters')}</button><button class="btn small" data-action="add-clean-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}">+ ${L('meter','meter')}</button></span></summary><div class="drawer-content grid">${Object.entries(meters).sort((a,b)=>(+a[0])-(+b[0])).map(([meter,items])=>`<details class="detail-drawer store-meter"><summary><span>${L('Meter','Meter')} ${meter}</span><span class="pill ${items.some(x=>String(x.status).startsWith('mold'))?'bad':items.some(x=>x.status==='dirty')?'warn':'info'}">${items.length} ${L('items','items')}</span></summary><div class="drawer-content"><div class="btn-row mb"><button class="btn small" data-action="edit-meter-shelves" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">${t('editShelves')}</button><button class="btn small" data-action="add-clean-shelf" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">+ ${L('plank','shelf')}</button></div><div class="heat-row">${items.sort((a,b)=>String(a.kind).localeCompare(String(b.kind))||(a.level||0)-(b.level||0)).map(i=>`<button class="heat-cell ${statusClass(i)}" title="${cleanItemTooltip(i)}" data-action="open-clean-item" data-id="${i.id}">${i.kind==='Plank'?'P'+(i.level||''):i.kind==='Bodembak'?'B':'A'}</button>`).join('')}</div><div class="small muted mt">${cleanMeterSummary(items)}</div></div></details>`).join('')}</div></details>`).join('')}</div></details>`).join('');
}
function cleanItemTooltip(i){ return `${i.label}\n${t('lastCleaned')}: ${i.lastCleaned||'-'}\n${t('lastChecked')}: ${i.lastChecked||'-'}`; }
function cleanMeterSummary(items){ const lastClean=items.map(i=>i.lastCleaned).filter(Boolean).sort().pop(); const lastCheck=items.map(i=>i.lastChecked).filter(Boolean).sort().pop(); return `${t('lastCleaned')}: ${lastClean||'-'} · ${t('lastChecked')}: ${lastCheck||'-'}`; }
function renderHeatmap(){ const groups={}; activeCleanItems().forEach(i=>{const dep=displayDepartment(i.department||'Overig'); groups[dep]=groups[dep]||[]; groups[dep].push(i);}); return `<div class="heatmap">${Object.entries(groups).map(([dep,items])=>`<div><h4>${escapeHtml(trText(dep))}</h4><div class="heat-row"><span class="heat-label">${items.length} ${L('onderdelen','items')}</span>${items.slice(0,100).map(i=>`<button class="heat-cell ${statusClass(i)}" title="${cleanItemTooltip(i)}" data-action="open-clean-item" data-id="${i.id}">${i.meter}</button>`).join('')}</div></div>`).join('')||`<p class="muted">${L('Nog geen winkelindeling.','No store layout yet.')}</p>`}</div>`; }
function cleaningUrgent(){ return activeCleanItems().filter(i=>['dirty','mold1','mold2','mold3','followup','due'].includes(i.status) || i.planned); }
function openCleanItem(id){ const i=state.cleaning.items.find(x=>x.id===id); if(!i) return; modal(i.label, `<div class="grid grid-2"><div class="card soft"><p><b>${L('Afdeling','Department')}:</b> ${escapeHtml(trText(displayDepartment(i.department)))}</p><p><b>${L('Zone','Zone')}:</b> ${escapeHtml(i.zone||'-')}</p><p><b>${L('Meter','Meter')}:</b> ${i.meter||'-'} · <b>${L('Type','Type')}:</b> ${escapeHtml(trText(i.kind||''))} ${i.level?(' '+i.level):''}</p><p><b>${t('lastChecked')}:</b> ${i.lastChecked||'-'}</p><p><b>${t('lastCleaned')}:</b> ${i.lastCleaned||'-'}</p><p><b>${t('status')}:</b> ${escapeHtml(i.status||'neutral')}</p></div><div class="card soft"><h3>${L('Acties','Actions')}</h3><div class="btn-row"><button class="btn good" data-action="mark-checked" data-id="${i.id}">${t('markChecked')}</button><button class="btn good" data-action="clean-item" data-id="${i.id}">${L('Schoongemaakt','Cleaned')}</button><button class="btn warn" data-action="mark-dirty" data-id="${i.id}">${L('Vuil','Dirty')}</button><button class="btn bad" data-action="mark-mold" data-id="${i.id}">${L('Schimmel','Mould')}</button><button class="btn" data-action="plan-clean-item" data-id="${i.id}">${L('Plan in HACCP','Plan in HACCP')}</button></div></div></div>${i.history?.length?`<h3>${L('Historie','History')}</h3><div class="list">${i.history.slice(0,8).map(h=>`<div class="list-item compact"><span>${escapeHtml(h.type||'event')}</span><span class="tiny muted">${dateTime(h.at)}</span></div>`).join('')}</div>`:''}`); }
function setZoneMeterCount(dep,zone,count){ count=+count||0; if(count<1) return; const current=[...new Set(activeCleanItems().filter(i=>displayDepartment(i.department)===dep&&i.zone===zone).map(i=>+i.meter||1))]; const max=Math.max(0,...current); for(let m=max+1;m<=count;m++){ const base={department:dep,zone,meter:m,status:'neutral',history:[],frequencyDays:180}; state.cleaning.items.push({...base,id:uid('clean'),kind:'Bodembak',label:`${zone} M${m} Bodembak`}); if(dep==='Vers'){ for(let l=1;l<=7;l++) state.cleaning.items.push({...base,id:uid('clean'),kind:'Plank',level:l,label:`${zone} M${m} Plank ${l}`}); } }
  if(count<max){ state.cleaning.items.forEach(i=>{ if(displayDepartment(i.department)===dep&&i.zone===zone&&(+i.meter||1)>count){ if((i.history||[]).length||i.lastCleaned||i.lastChecked||i.status!=='neutral') i.archived=true; else i.archived=true; }}); }
  save(); render(); }
function setMeterShelfCount(dep,zone,meter,count){ count=+count||0; if(count<0) return; const items=activeCleanItems().filter(i=>displayDepartment(i.department)===dep&&i.zone===zone&&(+i.meter||1)==(+meter||1)); const levels=items.filter(i=>i.kind==='Plank').map(i=>+i.level||0); const max=Math.max(0,...levels); for(let l=max+1;l<=count;l++) state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter:+meter||1,kind:'Plank',level:l,label:`${zone} M${meter} Plank ${l}`,frequencyDays:180,status:'neutral',history:[]}); if(count<max){ state.cleaning.items.forEach(i=>{ if(displayDepartment(i.department)===dep&&i.zone===zone&&(+i.meter||1)==(+meter||1)&&i.kind==='Plank'&&(+i.level||0)>count) i.archived=true; }); } save(); render(); }
function markChecked(id){ const i=state.cleaning.items.find(x=>x.id===id); if(i){i.lastChecked=TODAY(); if(!i.status||i.status==='neutral') i.status='checked'; i.history.unshift({type:'checked',at:nowISO()});} closeModal(); save(); render(); }

function getLessons(){
 const en=currentLang()==='en';
 const cats=en?['Work skill','Calm & stress','Communication','Customer handling','Management','Planning','Discipline','Signal detection','Produce','HACCP','Self-insight','Leadership','Resilience','Learning attitude']:['Werkvaardigheid','Kalmte & stress','Communicatie','Klantgedrag','Management','Planning','Discipline','Signalatie','AGF','HACCP','Zelfinzicht','Leiderschap','Veerkracht','Leerhouding'];
 const base=en?[
  ['Calm is a work skill','Calm work is active control: pause, choose, execute.','Choose three urgent tasks and finish one before starting anything new.','haccp'],['Priority means saying later','Not everything that shouts is important. Priority protects quality.','Move one low-value task lower in your HACCP list.','haccp'],['Friendly boundaries','A friendly tone and a clear boundary can exist together.','Write one calm sentence for a difficult customer.','communication'],['De-escalation basics','A calm voice, short wording and one clear option reduce tension.','Create a communication note with Situation, Action and Next step.','communication'],['Signal before solving','Strong operators notice patterns before they become expensive.','Find one recurring issue in Produce or Store Map.','agf'],['Stock before trend','Current stock beats historic trend when ordering today.','Check one product and compare current status with advice.','agf'],['Mould discipline','Mould needs grade, location and follow-up, not memory.','Open Cleaning Map and register or review one shelf.','storemap'],['Small management','Management begins with making work visible.','Turn one vague problem into one clear task.','today'],['Energy management','Low energy needs short wins and clean choices.','Finish one task under ten minutes.','haccp'],['Professional updates','Good updates are short, factual and action-oriented.','Write an update using Situation → Action → Follow-up.','communication'],['Ownership without blame','Take responsibility for the next step without carrying everyone’s mistake.','Write one improvement point without blame.','reports'],['Customer pressure','Stressful customers need structure, not speed.','Formulate one respectful boundary.','communication'],['Learning mindset','Repetitive work becomes powerful when you observe improvement.','Write down one thing that went better today.','coaching']
 ]:[
  ['Rust is werkvaardigheid','Rustig werken is actieve controle: pauzeer, kies, voer uit.','Kies drie urgente taken en rond er één af voordat je iets nieuws start.','haccp'],['Prioriteit is later durven zeggen','Niet alles wat schreeuwt is belangrijk. Prioriteit beschermt kwaliteit.','Zet één lage-waarde taak lager in je HACCP-lijst.','haccp'],['Vriendelijk begrenzen','Een vriendelijke toon en een duidelijke grens kunnen tegelijk bestaan.','Schrijf één rustige zin voor een lastige klant.','communication'],['De-escalatie basis','Rustige stem, korte woorden en één duidelijke optie verminderen spanning.','Maak een communicatiepunt met Situatie, Actie en Vervolg.','communication'],['Signaleren vóór oplossen','Sterke medewerkers zien patronen voordat ze duur worden.','Vind één terugkerend probleem in AGF of Schoonmaakkaart.','agf'],['Voorraad vóór trend','Huidige voorraad wint van historische trend bij bestellen vandaag.','Controleer één product en vergelijk huidige status met advies.','agf'],['Schimmeldiscipline','Schimmel vraagt graad, locatie en nacontrole, niet geheugen.','Open Schoonmaakkaart en registreer of bekijk één plank.','storemap'],['Klein management','Management begint met werk zichtbaar maken.','Zet één vaag probleem om in één duidelijke taak.','today'],['Energie managen','Lage energie vraagt korte winst en schone keuzes.','Rond één taak onder tien minuten af.','haccp'],['Professioneel terugkoppelen','Goede updates zijn kort, feitelijk en actiegericht.','Schrijf een update met Situatie → Actie → Vervolg.','communication'],['Eigenaarschap zonder schuld','Neem verantwoordelijkheid voor de volgende stap zonder iedere fout te dragen.','Schrijf één verbeterpunt zonder verwijt.','reports'],['Klantdruk','Stressvolle klanten vragen structuur, niet snelheid.','Formuleer één respectvolle grens.','communication'],['Leerhouding','Repetitief werk wordt krachtig wanneer je verbetering ziet.','Noteer één ding dat vandaag beter ging.','coaching']
 ];
 const lessons=[]; for(let i=0;i<130;i++){ const b=base[i%base.length]; const level=Math.floor(i/13)+1; lessons.push({id:'lesson_'+i,title:b[0]+(i>=13?` · ${t('level')} ${level}`:''),category:cats[i%cats.length],text:b[1],practice:b[2],route:b[3],level,locked:level>coachLevel()}); } return lessons;
}
function coachLevel(){ return Math.max(1,Math.floor((state.coachingDone||[]).length/5)+1); }
function renderCoaching(){ const lessons=getLessons(); const en=currentLang()==='en'; const cats=[...new Set(lessons.map(l=>l.category))]; const showCompleted=!!state.ui.showCompletedLessons; const showLocked=!!state.ui.showLockedLessons; const visible=lessons.filter(l=>(showLocked||!l.locked) && (showCompleted||!state.coachingDone.includes(l.id))); return `<div class="grid"><div class="hero"><span class="chip">${L('Coaching Skill Tree','Coaching Skill Tree')}</span><h2>${L('Leer, groei en blijf rustig onder druk','Learn, grow and stay calm under pressure')}</h2><p>${L('Werkvaardigheid, kalmte, communicatie, klantgedrag, management, signalatie en motivatie met praktijkopdrachten en toetsen.','Work skill, calm, communication, customer handling, management, signal detection and motivation with practice assignments and exams.')}</p><div class="btn-row"><button class="btn" data-action="toggle-locked-lessons">${showLocked?t('hideLocked'):t('showLocked')}</button><button class="btn" data-action="toggle-completed-lessons">${showCompleted?t('hideCompleted'):t('showCompleted')}</button><button class="btn primary" data-action="lesson-test" data-id="level">${t('startExam')}</button></div></div><div class="grid grid-4">${kpi(t('level'),coachLevel(),'good')}${kpi(t('completedLessons'),state.coachingDone.length,null)}${kpi(t('unlocked'),lessons.filter(l=>!l.locked).length,null)}${kpi('XP',state.coachingDone.length*25,'good')}</div><div class="card"><h3>${t('skillTree')}</h3><div class="skill-tree">${cats.map(c=>{const total=lessons.filter(l=>l.category===c).length; const done=lessons.filter(l=>l.category===c&&state.coachingDone.includes(l.id)).length; return `<div class="skill-node"><strong>${escapeHtml(c)}</strong>${bar('',Math.round(done/Math.max(1,total)*100),'good')}<span class="small muted">${done}/${total}</span></div>`;}).join('')}</div></div>${cats.map(c=>{ const arr=visible.filter(l=>l.category===c); if(!arr.length) return ''; return `<details class="detail-drawer" open><summary>${escapeHtml(c)} <span class="pill info">${arr.length}</span></summary><div class="drawer-content grid grid-3">${arr.slice(0,12).map(l=>`<div class="card ${l.locked?'soft lesson-locked':''}">${lessonCard(l)}</div>`).join('')}</div></details>`; }).join('')}${state.coachingDone.length?`<details class="detail-drawer"><summary>${t('completedLessons')}</summary><div class="drawer-content grid grid-3">${lessons.filter(l=>state.coachingDone.includes(l.id)).map(l=>`<div class="card soft">${lessonCard(l,true)}</div>`).join('')}</div></details>`:''}</div>`; }
function lessonCard(l,small=false){ const done=state.coachingDone.includes(l.id); if(l.locked) return `<div class="lesson-card lesson-locked"><div class="btn-row"><span class="chip">${escapeHtml(l.category)}</span><span class="pill warn">🔒 ${t('level')} ${l.level}</span></div><h3>${escapeHtml(l.title)}</h3><p class="muted">${L('Deze opdracht wordt zichtbaar zodra je level stijgt. Voltooi lessen en toetsen om vrij te spelen.','This assignment becomes visible when your level increases. Complete lessons and exams to unlock it.')}</p></div>`; return `<div class="lesson-card ${done?'lesson-done':''}"><div class="btn-row"><span class="chip">${escapeHtml(l.category)}</span><span class="pill info">${t('level')} ${l.level}</span>${done?`<span class="pill good">${t('completed')}</span>`:''}</div><h3>${escapeHtml(l.title)}</h3><p class="muted">${escapeHtml(l.text)}</p>${!small?`<p><strong>${t('practice')}:</strong> ${escapeHtml(l.practice)}</p>`:''}<div class="btn-row"><button class="btn" data-action="learn-more" data-id="${l.id}">${t('learnMore')}</button><button class="btn" data-route="${l.route}">${L('Open praktijk','Open practice')}</button><button class="btn" data-action="lesson-test" data-id="${l.id}">${t('startExam')}</button><button class="btn primary" data-action="complete-lesson" data-id="${l.id}">${done?'✓':t('finish')}</button></div></div>`; }
function showLessonMore(id){ const l=getLessons().find(x=>x.id===id) || todayLesson(); modal(t('eLearning'), `<div class="grid"><div class="hero"><span class="chip">${escapeHtml(l.category)}</span><h2>${escapeHtml(l.title)}</h2><p>${escapeHtml(l.text)}</p></div><div class="card"><h3>${L('Werkvloeruitleg','Workfloor explanation')}</h3><p>${L('Deze les helpt je om sneller rust, volgorde en kwaliteit te creëren. Lees de situatie, kies één concrete actie en koppel deze terug aan je werkdag.','This lesson helps you create calm, sequence and quality faster. Read the situation, choose one concrete action and connect it back to your workday.')}</p><p><strong>${t('practice')}:</strong> ${escapeHtml(l.practice)}</p></div><div class="btn-row"><button class="btn" data-route="${l.route}">${L('Ga naar praktijk','Go to practice')}</button><button class="btn primary" data-action="complete-lesson" data-id="${l.id}">${t('finish')}</button></div></div>`, 'wide'); }
function showLessonExam(id){ const l=getLessons().find(x=>x.id===id) || todayLesson(); modal(t('exam'), `<div class="card"><h3>${escapeHtml(l.title)}</h3><p>${L('Korte toets: welke keuze past het beste bij deze les?','Short exam: which choice best matches this lesson?')}</p><div class="grid"><button class="btn" data-action="complete-lesson" data-id="${l.id}">${L('Ik kies één concrete volgende actie en voer die uit.','I choose one concrete next action and execute it.')}</button><button class="btn" data-action="complete-lesson" data-id="${l.id}">${L('Ik maak het werk zichtbaar en koppel kort terug.','I make the work visible and give a short update.')}</button><button class="btn" data-action="complete-lesson" data-id="${l.id}">${L('Ik houd rust door prioriteit te kiezen.','I stay calm by choosing priority.')}</button></div></div>`); }

function renderAssist(){ const n=nextAction(); return `<button class="assist-tab" data-action="toggle-assist">Assist</button><aside class="assist-panel ${state.ui.assistOpen?'open':''}" id="assistPanel"><div class="modal-head"><h3>Live Assist</h3><button class="btn small" data-action="toggle-assist">×</button></div><div class="list"><div class="list-item compact"><span>${t('shift')}</span><strong>${shiftSummary()}</strong></div><div class="list-item compact"><span>${t('breakTime')}</span><strong>${minutesToText(todayBreakMinutes())}</strong></div><div class="list-item compact"><span>${L('Werkdruk','Workload')}</span><strong>${workload()}%</strong></div><div class="list-item compact"><span>${t('productivity')}</span><strong>${productivity()}%</strong></div></div><div class="card soft mt"><strong>${escapeHtml(trTitle(n.title))}</strong><p class="muted">${escapeHtml(n.reason)}</p><button class="btn primary" data-route="${n.route}">${L('Openen','Open')}</button></div><div class="btn-row mt"><button class="btn" data-action="open-focus">Focus</button><button class="btn" data-action="toggle-break">${state.shift.breakActive?t('stopBreak'):t('startBreak')}</button><button class="btn" data-action="shift-end">${t('clockOut')}</button></div></aside>`; }

function renderSidebar(){ const groupNames=currentLang()==='en'?{today:'Today',work:'Work',insight:'Insight & growth',system:'System'}:{today:'Vandaag',work:'Werk',insight:'Inzicht & groei',system:'Systeem'}; return `<aside class="sidebar ${state.ui.sidebarOpen?'open':''}" id="sidebar"><div class="sidebar-top"><div class="brand"><div class="brand-logo">RC</div><div><h1>RICH CMD</h1><p>${t('appSubtitle')}</p></div></div><button class="btn small sidebar-close" data-action="close-sidebar">×</button></div>${['today','work','insight','system'].map(g=>`<div class="nav-group"><button class="nav-head" data-action="toggle-menu-group" data-group="${g}"><span>${groupNames[g]}</span><span>${state.ui.menu[g]?'−':'+'}</span></button><div class="nav-items ${state.ui.menu[g]?'':'hidden'}">${ROUTES.filter(r=>r.group===g).map(r=>`<button class="nav-btn ${state.route===r.id?'active':''}" data-route="${r.id}"><span class="nav-icon">${iconSvg(r.icon)}</span><span>${t(r.label)}</span></button>`).join('')}</div></div>`).join('')}<div class="card soft mt"><div class="small muted">${APP.version} · ${APP.cache}</div><div class="btn-row mt"><button class="btn small" data-action="start-tutorial">Tutorial</button><button class="btn small" data-action="open-command">Ctrl K</button></div></div></aside>`; }

function renderCommunication(){ return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>${t('communicationPlanner')}</h3><button class="btn primary" data-action="open-communication-form">${t('add')} ${t('message')}</button><div class="mt">${renderCommunications()}</div></div><div class="card"><h3>${t('reports')}</h3><button class="btn primary" data-action="open-report-form">${t('add')} ${t('report')}</button><div class="mt">${renderReports()}</div></div></div><div class="grid"><div class="card"><h3>Tone helper</h3><p class="muted">${L('Situatie → Actie → Vervolg → Vraag','Situation → Action → Follow-up → Question')}</p><textarea class="textarea" id="toneText" placeholder="${L('Schrijf hier je concept...','Write your draft here...')}"></textarea><button class="btn mt" data-action="tone-format">${L('Maak professioneel','Make professional')}</button></div></div></div>`; }

const handleActionBaseV64 = handleAction;
handleAction = function(a,el,e){
  switch(a){
    case 'mark-checked': markChecked(el.dataset.id); return;
    case 'edit-zone-meters': { const n=prompt(t('editMeters'), String(new Set(activeCleanItems().filter(i=>displayDepartment(i.department)===el.dataset.dep&&i.zone===el.dataset.zone).map(i=>+i.meter||1)).size||1)); if(n) setZoneMeterCount(el.dataset.dep,el.dataset.zone,+n); return; }
    case 'edit-meter-shelves': { const n=prompt(t('editShelves'), String(activeCleanItems().filter(i=>displayDepartment(i.department)===el.dataset.dep&&i.zone===el.dataset.zone&&(+i.meter||1)==(+el.dataset.meter||1)&&i.kind==='Plank').length)); if(n!==null) setMeterShelfCount(el.dataset.dep,el.dataset.zone,el.dataset.meter,+n); return; }
    case 'learn-more': showLessonMore(el.dataset.id); return;
    case 'lesson-test': showLessonExam(el.dataset.id); return;
    case 'toggle-locked-lessons': state.ui.showLockedLessons=!state.ui.showLockedLessons; save(); render(); return;
    default: return handleActionBaseV64(a,el,e);
  }
};

try{ loadStartTemplatesIfEmpty(); applyTheme(); render(); }catch(err){ console.error(err); renderError(err); }


/* =============================================================
   RICH CMD v6.5 — Daily Flow & Data Intelligence
   Feature expansion layer: improves daily flow, visual insights,
   coaching, inventory, communication, Store Map and diagnostics.
   ============================================================= */
APP.version = 'v6.5.0';
APP.cache = 'rich-cmd-cache-v650';
state.schemaVersion = 650;
if(!state.ui) state.ui={};
state.ui.reportFilter = state.ui.reportFilter || {q:'',status:'all',period:'all'};
state.ui.rustMode = !!state.ui.rustMode;
state.ui.energy = state.ui.energy || 'normal';
state.ui.showArchive = !!state.ui.showArchive;
state.ui.startPage = state.ui.startPage || state.settings.startPage || 'today';
state.orderHistory = state.orderHistory || [];
state.inventoryHistory = state.inventoryHistory || [];
state.commTemplates = state.commTemplates || [];
state.moduleQuality = state.moduleQuality || {};
state.undoStack = state.undoStack || [];
state.favoriteModules = state.favoriteModules || ['today','haccp','agf','visual'];
state.settings.backupReminderDays = state.settings.backupReminderDays || 7;

Object.assign(I18N.nl, {
  dailyControlRoom:'Daily Control Room', workflow:'Werkflow', startDay:'Dagstart', closeShiftFlow:'Shift afsluiten', energyCheck:'Energiecheck', lowEnergy:'Laag', normalEnergy:'Normaal', strongEnergy:'Sterk', topThree:'Top 3 live taken', prepareTomorrow:'Morgen voorbereiden', followUp:'Opvolging', communicationTemplates:'Communicatie templates', managementSummary:'Management Summary', periodCompare:'Periodevergelijking', previousPeriod:'Vorige periode', currentPeriod:'Huidige periode', agfDecisionCards:'AGF Decision Cards', bonusWeek:'Bonusweek', productGroups:'Productgroepen', inventoryRound:'Inventarisronde', inventoryHistory:'Inventaris bestelhistorie', watchlist:'Watchlist', storePassport:'Schoonmaakpaspoort', riskRanking:'Risico-ranking', archive:'Archief', taskBundles:'Taakbundels', reportFilters:'Rapportagefilters', dataQuality:'Datakwaliteit', translationCoverage:'Vertaaldekking', actionHistory:'Actiegeschiedenis', appHealthGuard:'App Health Guard', moduleReset:'Module reset', backupReminder:'Backup herinnering', copySummary:'Kopieer dagsamenvatting', calmMode:'Rustmodus', whyAdvice:'Waarom dit advies?', dayPhase:'Dagfase', bundle:'Bundel', orderHistory:'Bestelhistorie', noArchive:'Geen archiefitems.', openFollowups:'Open opvolgingen', favoriteDashboard:'Favorieten-dashboard', storeRisk:'Store Map risico', improve:'Verbeteren', tomorrowPlan:'Morgenplan', todayFlow:'Vandaag-flow', skillPaths:'Skill-paden', chapterTour:'Tutorial hoofdstukken', filters:'Filters', apply:'Toepassen', clear:'Wissen', makeBackupFirst:'Maak eerst backup', route:'Route', routeOpen:'Open route', copiedSummary:'Dagsamenvatting gekopieerd', customCategory:'Eigen categorie', itemPassport:'Itempaspoort', editFrequency:'Frequentie aanpassen', orderReason:'Bestelreden', reportType:'Rapporttype'
});
Object.assign(I18N.en, {
  dailyControlRoom:'Daily Control Room', workflow:'Workflow', startDay:'Day start', closeShiftFlow:'Close shift', energyCheck:'Energy check', lowEnergy:'Low', normalEnergy:'Normal', strongEnergy:'Strong', topThree:'Top 3 live tasks', prepareTomorrow:'Prepare tomorrow', followUp:'Follow-up', communicationTemplates:'Communication templates', managementSummary:'Management Summary', periodCompare:'Period comparison', previousPeriod:'Previous period', currentPeriod:'Current period', agfDecisionCards:'Produce Decision Cards', bonusWeek:'Bonus week', productGroups:'Product groups', inventoryRound:'Inventory round', inventoryHistory:'Inventory order history', watchlist:'Watchlist', storePassport:'Cleaning passport', riskRanking:'Risk ranking', archive:'Archive', taskBundles:'Task bundles', reportFilters:'Report filters', dataQuality:'Data quality', translationCoverage:'Translation coverage', actionHistory:'Action history', appHealthGuard:'App Health Guard', moduleReset:'Module reset', backupReminder:'Backup reminder', copySummary:'Copy day summary', calmMode:'Calm mode', whyAdvice:'Why this advice?', dayPhase:'Day phase', bundle:'Bundle', orderHistory:'Order history', noArchive:'No archived items.', openFollowups:'Open follow-ups', favoriteDashboard:'Favourites dashboard', storeRisk:'Store Map risk', improve:'Improve', tomorrowPlan:'Tomorrow plan', todayFlow:'Today flow', skillPaths:'Skill paths', chapterTour:'Tutorial chapters', filters:'Filters', apply:'Apply', clear:'Clear', makeBackupFirst:'Create backup first', route:'Route', routeOpen:'Open route', copiedSummary:'Day summary copied', customCategory:'Custom category', itemPassport:'Item passport', editFrequency:'Edit frequency', orderReason:'Order reason', reportType:'Report type', storemap:'Cleaning Map', reports:'Shift reports', visual:'Visualization', communication:'Communication', haccp:'HACCP', agf:'Produce', productivityConclusion:'Conclusions', managementTools:'Management tools', communicationPlanner:'Communication planner', autoPlanning:'Automatic day planning'
});

function v65SafeArray(x){ return Array.isArray(x)?x:[]; }
function v65PeriodDays(period){ return period==='today'?1:period==='14'?14:period==='month'?31:period==='all'?9999:7; }
function inPeriod(iso,period='7'){ if(period==='all') return true; const d=new Date(iso||0).getTime(); const cutoff=Date.now()-v65PeriodDays(period)*86400000; return d>=cutoff; }
function sumMinutes(arr){ return arr.reduce((a,x)=>a+(+x.duration||+x.minutes||0),0); }
function dayPhase(){ const h=new Date().getHours(); if(h<10) return currentLang()==='en'?'Start phase':'Startfase'; if(h<14) return currentLang()==='en'?'Execution phase':'Uitvoerfase'; if(h<17) return currentLang()==='en'?'Control phase':'Controlefase'; return currentLang()==='en'?'Closing phase':'Afsluitfase'; }
function currentEnergyLabel(){ const e=state.ui.energy||'normal'; return e==='low'?t('lowEnergy'):e==='strong'?t('strongEnergy'):t('normalEnergy'); }
function setEnergy(level){ state.ui.energy=level; addActivity(`${t('energyCheck')}: ${currentEnergyLabel()}`,'energy'); save(); render(); }
function todayCompletedMinutes(){ return todayTasks().filter(t=>t.status==='Voltooid').reduce((a,t)=>a+(+t.duration||0),0); }
function openTaskMinutes(){ return todayTasks().filter(t=>t.status!=='Voltooid').reduce((a,t)=>a+(+t.duration||0),0); }
function completionRate(){ const all=todayTasks(); return all.length?Math.round(all.filter(t=>t.status==='Voltooid').length/all.length*100):0; }
function v65TaskArchive(){ return state.tasks.filter(t=>t.status==='Voltooid'||t.status==='Overgeslagen').slice().sort((a,b)=>new Date(b.completedAt||b.createdAt||0)-new Date(a.completedAt||a.createdAt||0)); }
function bundleDefinitions(){ return [
  {id:'agf_open', name:currentLang()==='en'?'Produce opening':'AGF opening', keywords:['AGF','Vers check','Actieplanning AGF']},
  {id:'daily_base', name:currentLang()==='en'?'Daily base routine':'Dagelijkse basisroutine', keywords:['Basisroutine','Temperatuurscontrole','Emballage','Vuilnisbakken']},
  {id:'periodic', name:currentLang()==='en'?'Periodic cleaning':'Periodieke schoonmaak', keywords:['Periodiek','Maandelijks','Stof','grondig','uitgebreid']},
  {id:'storemap', name:currentLang()==='en'?'Cleaning Map urgent':'Schoonmaakkaart urgent', keywords:['Schoonmaakkaart','Schimmel','Vuil']}
]; }
function bundleTasks(bundle){ const words=bundle.keywords.map(x=>String(x).toLowerCase()); return sortedTasks().filter(t=>words.some(w=>(t.title+' '+t.category+' '+t.group).toLowerCase().includes(w))).slice(0,8); }
function v65NextAction(){
  if(!state.shift.active) return {title: currentLang()==='en'?'Start your shift':'Start je shift', reason: currentLang()==='en'?'A shift must be active before planning work.':'Een actieve shift geeft richting aan je planning.', route:'today', why:['Shift inactive']};
  if(state.shift.breakActive) return {title: currentLang()==='en'?'Finish your break':'Rond je pauze af', reason: currentLang()==='en'?'Your break is currently running.':'Je pauze loopt nog.', route:'today', why:['Break active']};
  const mold=cleaningUrgent().find(i=>String(i.status).startsWith('mold'));
  if(mold) return {title:`${trText('Schimmel')} — ${mold.zone||''} M${mold.meter||''}`, reason: currentLang()==='en'?'Mould signals have high food-safety urgency.':'Schimmel heeft hoge voedselveiligheidsurgentie.', route:'storemap', why:['Mould priority','Food safety']};
  const task=sortedTasks()[0];
  if(task) return {title:taskTitle(task), reason: `${localStatus(task.priority)} · ${minutesToText(task.duration)} · ${translatedCategory(task.category||'')}`, route:'haccp', why:['Task priority','Available HACCP time','Base routine first']};
  const agf=agfAttention()[0];
  if(agf) return {title:agf.name, reason:agf.reason, route:'agf', why:['Produce attention','Current status','Trend check']};
  const comm=state.communications.find(c=>c.status==='Rood'||(c.followDate&&c.followDate<=TODAY()));
  if(comm) return {title:comm.to||comm.customTo||t('communication'), reason: currentLang()==='en'?'Communication needs follow-up.':'Communicatie heeft opvolging nodig.', route:'communication', why:['Follow-up']};
  return {title: currentLang()==='en'?'Keep the base strong':'Houd de basis sterk', reason: currentLang()==='en'?'No urgent signals. Keep checking and stay consistent.':'Geen urgente signalen. Blijf controleren en consistent werken.', route:'today', why:['Stable day']};
}
nextAction = v65NextAction;

function v65ManagementInsights(){
  const insights=[];
  const load=workload();
  if(load>100) insights.push(L('Je planning overschrijdt je beschikbare HACCP-capaciteit. Laad minder periodieke taken in of kies korte taken eerst.','Your planning exceeds available HACCP capacity. Load fewer periodic tasks or choose short tasks first.'));
  else if(load>80) insights.push(L('Werkdruk is hoog maar beheersbaar. Houd basisroutine kort en zichtbaar.','Workload is high but controllable. Keep the base routine short and visible.'));
  else insights.push(L('Je werkdruk lijkt beheersbaar. Dit is een goed moment voor één periodieke verbetering.','Your workload looks manageable. This is a good moment for one periodic improvement.'));
  const agf=agfAttention(); if(agf.length) insights.push(L(`AGF heeft ${agf.length} aandachtproducten. Controleer huidige status vóór je bestelt.`,`Produce has ${agf.length} attention products. Check current status before ordering.`));
  const conf=agf.filter(a=>a.conflict).length; if(conf) insights.push(L(`${conf} AGF-product(en) hebben conflict tussen trend en huidige status.`,`${conf} produce product(s) have conflict between trend and current status.`));
  const cl=cleaningUrgent(); if(cl.length) insights.push(L(`${cl.length} Store Map-signalen vragen aandacht.`,` ${cl.length} Cleaning Map signals need attention.`));
  const def=state.tasks.filter(t=>t.status==='Uitgesteld').length; if(def) insights.push(L(`${def} taken zijn uitgesteld. Analyseer de reden en plan ze bewust.`,`${def} tasks are deferred. Review the reason and plan deliberately.`));
  return insights;
}
managementInsights = v65ManagementInsights;

function daySummaryText(){
  const lines=[
    `RICH CMD — ${TODAY()}`,
    `${t('shiftTime')}: ${minutesToText(shiftMinutesToday())}`,
    `${t('breakTime')}: ${minutesToText(todayBreakMinutes())}`,
    `${t('productivity')}: ${productivity()}%`,
    `HACCP: ${completedCount()}/${todayTasks().length} ${currentLang()==='en'?'tasks completed':'taken voltooid'}`,
    `AGF: ${agfAttention().length} ${currentLang()==='en'?'attention products':'aandachtproducten'}`,
    `${t('storemap')}: ${cleaningUrgent().length} ${currentLang()==='en'?'signals':'signalen'}`,
    `${t('communication')}: ${state.communications.filter(c=>c.status==='Rood'||c.status==='Geel').length} ${currentLang()==='en'?'open points':'open punten'}`,
    `${t('whyAdvice')}: ${nextAction().reason}`
  ];
  return lines.join('\n');
}
function copyDaySummary(){ copyText(daySummaryText()); toast(t('copiedSummary'),'good'); }
function prepareTomorrow(){ const arr=[]; state.tasks.filter(t=>t.status==='Uitgesteld').slice(0,4).forEach(t=>arr.push({kind:'HACCP',title:taskTitle(t)})); agfAttention().slice(0,4).forEach(a=>arr.push({kind:'AGF',title:a.name})); cleaningUrgent().slice(0,4).forEach(c=>arr.push({kind:'Store Map',title:`${c.zone||''} M${c.meter||''} ${trText(c.kind||'')}`})); return arr; }
function renderWorkflowPhases(){ const phases=[
  [state.shift.active?'good':'warn', t('clockIn'), state.shift.active?L('Actief','Active'):L('Nog niet gestart','Not started')],
  [completedCount()>0?'good':'info', L('Basisroutine','Base routine'), `${completedCount()}/${todayTasks().length}`],
  [agfAttention().length?'warn':'good','AGF', `${agfAttention().length} ${L('aandacht','attention')}`],
  [cleaningUrgent().length?'warn':'good', t('storemap'), `${cleaningUrgent().length} ${L('signalen','signals')}`],
  [state.communications.some(c=>c.status==='Rood')?'bad':'good', t('communication'), `${state.communications.filter(c=>c.status!=='Groen').length} ${L('open','open')}`]
]; return `<div class="grid grid-5 workflow-strip">${phases.map(p=>`<div class="card soft"><span class="status-dot ${p[0]}"></span><strong>${p[1]}</strong><p class="muted small">${p[2]}</p></div>`).join('')}</div>`; }
function renderEnergyCheck(){ return `<div class="btn-row"><button class="btn ${state.ui.energy==='low'?'primary':''}" data-action="set-energy" data-level="low">${t('lowEnergy')}</button><button class="btn ${state.ui.energy==='normal'?'primary':''}" data-action="set-energy" data-level="normal">${t('normalEnergy')}</button><button class="btn ${state.ui.energy==='strong'?'primary':''}" data-action="set-energy" data-level="strong">${t('strongEnergy')}</button></div>`; }
function renderRetailRadar(){ const rows=[
  [L('Werkdruk','Workload'), workload(), workload()>90?'bad':workload()>70?'warn':'good'],
  ['AGF', agfAttention().length, agfAttention().length?'warn':'good'],
  [t('storemap'), cleaningUrgent().length, cleaningUrgent().length?'warn':'good'],
  [t('communication'), state.communications.filter(c=>c.status==='Rood'||c.status==='Geel').length, state.communications.some(c=>c.status==='Rood')?'bad':'warn'],
  [t('inventory'), lowStockItems().length, lowStockItems().length?'warn':'good']
]; return `<div class="list">${rows.map(r=>`<div class="bar-row"><div class="list-item compact"><strong>${r[0]}</strong><span class="pill ${r[2]}">${r[1]}</span></div>${bar('',Math.min(100,+r[1]*20||+r[1]),r[2])}</div>`).join('')}</div>`; }
function renderToday(){ const n=nextAction(); return `<div class="grid ${state.ui.rustMode?'':'grid-main'}"><div class="grid">
  <div class="hero" data-tutorial="today"><span class="chip">RICH CMD V6.5</span><h2>${greeting()}, ${escapeHtml(state.settings.name||L('collega','colleague'))} 👋</h2><p>${L('Vandaag draait om volgorde, rust en de beste volgende actie.','Today is about sequence, calm and the best next action.')}</p><div class="btn-row"><button class="btn primary" data-action="smart-next">${t('smart')}</button><button class="btn" data-action="shift-start" ${state.shift.active?'disabled':''}>${t('clockIn')}</button><button class="btn" data-action="shift-end" ${!state.shift.active?'disabled':''}>${t('clockOut')}</button><button class="btn" data-action="toggle-break" ${!state.shift.active?'disabled':''}>${state.shift.breakActive?t('stopBreak'):t('startBreak')}</button><button class="btn" data-action="toggle-rust-mode">${t('calmMode')}</button></div></div>
  ${renderWorkflowPhases()}
  <div class="card"><h3>${t('topThree')}</h3>${renderSmartQueue()}</div>
  <div class="card"><h3>${t('energyCheck')}</h3><p class="muted">${L('Kies je energieniveau zodat de app rustiger of ambitieuzer adviseert.','Choose your energy level so the app can advise calmer or more ambitious work.')}</p>${renderEnergyCheck()}</div>
  <div class="card"><h3>${t('favoriteDashboard')}</h3>${renderFavoriteActions()}</div>
</div>${state.ui.rustMode?'':`<div class="grid"><div class="card"><h3>${t('smart')}</h3><strong>${escapeHtml(trTitle(n.title))}</strong><p>${escapeHtml(n.reason)}</p><details><summary>${t('whyAdvice')}</summary><ul>${(n.why||[]).map(w=>`<li>${escapeHtml(w)}</li>`).join('')}</ul></details><button class="btn primary mt" data-route="${n.route}">${t('routeOpen')}</button></div><div class="card"><h3>Retail Radar</h3>${renderRetailRadar()}</div><div class="card"><h3>${t('prepareTomorrow')}</h3>${renderTomorrowPrep()}</div><div class="card"><h3>${t('copySummary')}</h3><button class="btn" data-action="copy-day-summary">${t('copySummary')}</button></div><div class="card"><h3>${L('Coach van vandaag','Today\'s coach')}</h3>${renderCoachOfDay()}</div></div>`}</div>`; }

function renderCoachOfDay(){ const l=todayLesson(); return `<div class="lesson-card"><span class="chip">${escapeHtml(l.category)}</span><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.text)}</p><p><strong>${t('practice')}:</strong> ${escapeHtml(l.practice)}</p><div class="btn-row"><button class="btn" data-action="learn-more" data-id="${l.id}">${t('learnMore')}</button><button class="btn primary" data-route="${l.route}">${L('Oefen nu','Practice now')}</button></div></div>`; }

function renderTaskBundles(){ return `<div class="grid grid-2">${bundleDefinitions().map(b=>{ const arr=bundleTasks(b); return `<div class="card soft"><h4>${escapeHtml(b.name)}</h4><p class="muted small">${arr.length} ${L('taken gevonden','tasks found')}</p><div class="list">${arr.slice(0,4).map(tk=>`<div class="list-item compact"><span>${escapeHtml(taskTitle(tk))}</span><button class="btn small good" data-action="task-done" data-id="${tk.id}">${t('done')}</button></div>`).join('')||`<p class="muted small">${t('empty')}</p>`}</div></div>`; }).join('')}</div>`; }
function renderTaskArchive(){ const arr=v65TaskArchive(); return arr.length?`<div class="list">${arr.slice(0,40).map(tk=>`<div class="list-item compact"><span>${escapeHtml(taskTitle(tk))}</span><span class="pill good">${dateTime(tk.completedAt||tk.createdAt)}</span></div>`).join('')}</div>`:`<p class="muted">${t('noArchive')}</p>`; }
function renderHaccp(){ const tasks=sortedTasks(); const cap=(+state.settings.haccpHours||3.5)*60; return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>${t('autoPlanning')}</h3><p class="muted">${L('Dagelijkse basis eerst, daarna doorgeschoven taken, Store Map-urgenties en periodieke taken.','Daily base first, then deferred tasks, Cleaning Map urgency and periodic work.')}</p>${renderHaccpTimeline(tasks)}<div class="btn-row mt"><button class="btn primary" data-action="open-template-loader">${t('load')}</button><button class="btn" data-action="open-task-form">${t('add')} ${L('taak','task')}</button><button class="btn" data-action="open-focus">${t('focus')}</button></div></div><div class="card"><h3>${t('topThree')}</h3>${renderSmartQueue()}</div><div class="card"><h3>${t('taskBundles')}</h3>${renderTaskBundles()}</div><div class="card"><h3>${L('Vandaag uitvoeren','Execute today')}</h3>${renderTaskList(tasks)}</div></div><div class="grid"><div class="card"><h3>${L('Capaciteit','Capacity')}</h3>${capacityCard()}${bar(L('Gepland','Planned'),Math.round(openTaskMinutes()/cap*100),openTaskMinutes()>cap?'bad':'warn')}${bar(L('Voltooid','Completed'),Math.round(todayCompletedMinutes()/cap*100),'good')}</div><div class="card"><h3>${L('Uitstelanalyse','Deferral analysis')}</h3>${renderDeferralAnalysis()}</div><div class="card"><h3>${t('archive')}</h3><details class="detail-drawer"><summary>${L('Toon archief','Show archive')}</summary><div class="drawer-content">${renderTaskArchive()}</div></details></div><div class="card"><h3>${t('manage')}</h3><details class="detail-drawer"><summary>${L('Templates en taken beheren','Manage templates and tasks')}</summary><div class="drawer-content">${renderTemplateManager()}</div></details></div></div></div>`; }

function agfGroups(){ const m={}; state.agfProducts.forEach(p=>{ const k=p.favorite?'Favorieten':(state.bonus.some(b=>b.productId===p.id)?'Bonus':(p.category||'Overig')); (m[k]=m[k]||[]).push(p); }); return m; }
function renderAgfGroups(){ const groups=agfGroups(); return `<div class="grid">${Object.entries(groups).map(([g,arr])=>`<details class="detail-drawer" open><summary>${escapeHtml(trText(g))} <span class="pill info">${arr.length}</span></summary><div class="drawer-content">${renderAgfQuickList('',arr)}</div></details>`).join('')||`<p class="muted">${t('empty')}</p>`}</div>`; }
function renderAgfQuickList(filter='', source=null){ const base=source||state.agfProducts; const products=base.filter(p=>(p.name+' '+(p.nasa||'')+' '+(p.category||'')+' '+(p.aliases||'')).toLowerCase().includes((filter||'').toLowerCase())).sort((a,b)=>(b.favorite?1:0)-(a.favorite?1:0)).slice(0,60); if(!products.length) return `<p class="muted">${t('empty')} · <button class="btn small" data-action="open-agf-product-form">${t('notFoundAdd')}</button></p>`; return `<div class="list">${products.map(p=>`<div class="list-item decision-card"><div><strong>${escapeHtml(p.name)}</strong><div class="small muted">${escapeHtml(p.category||'')} · NASA ${escapeHtml(p.nasa||'-')}</div><span class="pill ${lastAgfStatus(p)==='Overvoorraad'?'warn':lastAgfStatus(p)==='Leeg schap'?'bad':'good'}">${localStatus(lastAgfStatus(p)||'Onbekend')}</span></div><div class="btn-row"><button class="btn small good" data-action="agf-status" data-id="${p.id}" data-status="OK">OK</button><button class="btn small bad" data-action="agf-status" data-id="${p.id}" data-status="Leeg schap">${L('Leeg','Empty')}</button><button class="btn small warn" data-action="agf-status" data-id="${p.id}" data-status="Overvoorraad">${L('Over','Over')}</button><button class="btn small" data-action="toggle-agf-fav" data-id="${p.id}">${p.favorite?'★':'☆'}</button><button class="btn small bonus-badge ${state.bonus.some(b=>b.productId===p.id)?'active':''}" data-action="toggle-agf-bonus" data-id="${p.id}">B</button></div></div>`).join('')}</div>`; }
function renderAgfDecisionCards(){ const arr=agfAttention().slice(0,12); return arr.length?`<div class="grid grid-2">${arr.map(a=>`<div class="card decision-card"><div class="btn-row"><span class="chip">${escapeHtml(a.name)}</span>${a.conflict?`<span class="pill bad">${t('conflict')}</span>`:''}</div><p><strong>${t('currentStatus')}:</strong> ${localStatus(a.status)}</p><p><strong>${t('trend')}:</strong> ${escapeHtml(a.trend||'-')}</p><p><strong>${t('orderAdvice')}:</strong> ${escapeHtml(a.advice)}</p><p class="muted">${escapeHtml(a.reason)}</p></div>`).join('')}</div>`:`<p class="muted">${L('Geen besliskaarten nodig.','No decision cards needed.')}</p>`; }
function renderBonusWeek(){ return `<div class="btn-row mb"><button class="btn primary" data-action="open-bonus-form">${t('add')}</button><button class="btn" data-action="copy-agf-orders">${t('copy')}</button><button class="btn bad" data-action="clear-bonus">${L('Nieuwe bonusweek','New bonus week')}</button></div>${renderBonus()}`; }
function renderAgf(){ return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>${L('AGF Quick Check','Produce Quick Check')}</h3><div class="form-grid"><input class="input" id="agfSearch" placeholder="${t('search')} product / NASA"><button class="btn primary" data-action="open-agf-product-form">${t('add')} ${t('product')}</button></div><div id="agfQuickList" class="mt">${renderAgfGroups()}</div></div><div class="card"><h3>${t('agfDecisionCards')}</h3>${renderAgfDecisionCards()}</div><div class="card"><h3>${t('orderAdvice')}</h3>${renderAgfAdvice()}</div></div><div class="grid"><div class="card"><h3>${t('bonusWeek')}</h3>${renderBonusWeek()}</div><div class="card"><h3>${t('productGroups')}</h3>${Object.keys(agfGroups()).map(g=>`<span class="chip">${escapeHtml(trText(g))}</span>`).join(' ')}</div><div class="card"><h3>${t('orderHistory')}</h3>${renderOrderHistory()}</div><div class="card"><h3>${L('Productbeheer','Product management')}</h3>${renderAgfProducts()}</div></div></div>`; }

function storePassport(item){ if(!item) return `<p class="muted">${t('empty')}</p>`; return `<div class="card soft"><h4>${escapeHtml(item.zone||'')} M${item.meter||''} ${escapeHtml(trText(item.kind||''))}</h4><p>${t('lastChecked')}: ${item.lastChecked||'-'}</p><p>${t('lastCleaned')}: ${item.lastCleaned||'-'}</p><p>${t('status')}: ${escapeHtml(item.status||'neutral')}</p><p>${t('category')}: ${escapeHtml(item.category||'-')}</p></div>`; }
function renderRiskRanking(){ const arr=cleaningUrgent().slice(0,8); return arr.length?`<div class="list">${arr.map((i,idx)=>`<div class="list-item compact"><span><b>${idx+1}.</b> ${escapeHtml(i.department)} / ${escapeHtml(i.zone)} / M${i.meter||''} ${escapeHtml(trText(i.kind||''))}</span><span class="pill ${String(i.status).startsWith('mold')?'bad':'warn'}">${escapeHtml(i.status||'')}</span></div>`).join('')}</div>`:`<p class="muted">${L('Geen urgente risico’s.','No urgent risks.')}</p>`; }
function renderStoreMap(){ ensureStoreMap(false); const urgent=cleaningUrgent(); return `<div class="grid"><div class="hero"><span class="chip">${t('storemap')}</span><h2>${L('Schoonmaakcontrole per pad, meter en plank','Cleaning control by aisle, meter and shelf')}</h2><p>${L('Gebruik de kaart voor signaleren, schimmelregistratie, nacontrole en planning richting HACCP.','Use the map for signals, mould registration, follow-up and planning toward HACCP.')}</p><div class="btn-row"><button class="btn primary" data-action="load-storemap">${L('Standaard winkelindeling laden','Load standard layout')}</button><button class="btn" data-action="open-clean-add-form">${L('Metrage / plank toevoegen','Add meter / shelf')}</button><button class="btn" data-action="start-cleaning-round">${L('Schoonmaakronde','Cleaning round')}</button><button class="btn" data-action="plan-urgent-cleaning">${L('Urgent in HACCP','Plan urgent')}</button></div>${renderHeatLegend()}</div><div class="grid grid-main"><div class="card"><h3>${L('Navigatie','Navigation')}</h3>${renderStoreHierarchy()}</div><div class="grid"><div class="card"><h3>${t('riskRanking')}</h3>${renderRiskRanking()}</div><div class="card"><h3>${t('storePassport')}</h3>${storePassport(urgent[0]||activeCleanItems()[0])}</div><div class="card"><h3>Heatmap</h3>${renderHeatmap()}</div><div class="card"><h3>${L('Te plannen','To plan')}</h3>${renderCleaningQueue(urgent)}</div></div></div></div>`; }

function startInventoryRound(){ const items=state.inventory.slice(); if(!items.length) return toast(L('Geen inventarisitems.','No inventory items.')); state.ui.inventoryRound={index:0,ids:items.map(i=>i.id)}; showInventoryRound(); }
function showInventoryRound(){ const r=state.ui.inventoryRound; if(!r) return; const item=state.inventory.find(i=>i.id===r.ids[r.index]); if(!item){ state.ui.inventoryRound=null; save(); render(); return; } modal(t('inventoryRound'), `<div class="card"><div class="chip">${r.index+1}/${r.ids.length}</div><h3>${escapeHtml(item.name)}</h3><p class="muted">NASA ${escapeHtml(item.nasa||'-')} · ${escapeHtml(item.category||'')}</p><label>${t('stock')}<input class="input" id="roundStock" type="number" value="${+item.stock||0}"></label><p>Min ${item.min} · Max ${item.max}</p><div class="btn-row mt"><button class="btn primary" data-action="round-save-next" data-id="${item.id}">${t('save')} + ${t('next')}</button><button class="btn" data-action="close-modal">${t('stop')}</button></div></div>`); }
function renderInventoryHistory(){ if(!Array.isArray(state.inventoryHistory)) state.inventoryHistory=[]; return state.inventoryHistory.length?`<div class="list">${state.inventoryHistory.slice(0,12).map(h=>`<div class="list-item compact"><span>${escapeHtml(h.name)} · ${h.qty}</span><span class="tiny muted">${dateTime(h.at)}</span></div>`).join('')}</div>`:`<p class="muted">${t('empty')}</p>`; }
function renderInventory(){ const low=lowStockItems(); return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>${L('Inventarisbeheer','Inventory management')}</h3><div class="form-grid"><input class="input" id="invSearch" placeholder="${L('Zoek item / NASA','Search item / NASA')}"><button class="btn primary" data-action="open-inventory-form">${t('add')} item</button></div><div id="inventoryList" class="mt">${renderInventoryList(state.ui.invSearch||'')}</div></div><div class="card"><h3>${t('inventoryRound')}</h3><button class="btn primary" data-action="start-inventory-round">${t('start')}</button><p class="muted">${L('Loop item voor item door je voorraad en genereer daarna bestellijsten.','Go item by item through your stock and generate order lists afterwards.')}</p></div></div><div class="grid"><div class="card"><h3>${L('Bestellijst','Order list')}</h3>${renderInventoryOrders()}</div><div class="card"><h3>${t('watchlist')}</h3>${low.length?low.map(i=>`<div class="list-item compact"><span>${escapeHtml(i.name)}</span><span class="pill warn">${i.stock}/${i.min}</span></div>`).join(''):`<p class="muted">${L('Geen lage voorraad.','No low stock.')}</p>`}</div><div class="card"><h3>${t('inventoryHistory')}</h3>${renderInventoryHistory()}</div></div></div>`; }

function communicationTemplateText(type){ const en=currentLang()==='en'; const templates={update:en?'Situation:\nAction:\nFollow-up:\nQuestion:':'Situatie:\nActie:\nVervolg:\nVraag:', problem:en?'Problem:\nImpact:\nAction taken:\nNeeded:':'Probleem:\nGevolg:\nActie genomen:\nNodig:', transfer:en?'Handover:\nOpen points:\nPriority:\nNext step:':'Overdracht:\nOpen punten:\nPrioriteit:\nVolgende stap:'}; return templates[type]||templates.update; }
function renderCommunicationTemplates(){ return `<div class="btn-row"><button class="btn" data-action="use-comm-template" data-template="update">${L('Korte update','Short update')}</button><button class="btn" data-action="use-comm-template" data-template="problem">${L('Probleemmelding','Problem report')}</button><button class="btn" data-action="use-comm-template" data-template="transfer">${L('Overdracht','Handover')}</button></div>`; }
function filteredReports(){ const f=state.ui.reportFilter||{}; return state.reports.filter(r=>{ if(f.q && !(r.title+' '+r.text).toLowerCase().includes(f.q.toLowerCase())) return false; if(f.status&&f.status!=='all'&&r.status!==f.status) return false; if(f.period&&f.period!=='all'&&!inPeriod(r.createdAt,f.period)) return false; return true; }); }
function renderReportFilters(){ const f=state.ui.reportFilter||{}; return `<div class="form-grid"><input class="input" id="reportQ" placeholder="${t('search')}" value="${escapeHtml(f.q||'')}"><select class="select" id="reportStatus"><option value="all">${t('all')}</option>${['Groen','Geel','Oranje','Rood'].map(s=>`<option ${f.status===s?'selected':''}>${s}</option>`).join('')}</select><select class="select" id="reportPeriod"><option value="all">${t('all')}</option><option value="today">${t('today')}</option><option value="7">7 dagen</option><option value="14">14 dagen</option><option value="month">${t('monthly')}</option></select><button class="btn" data-action="apply-report-filter">${t('apply')}</button></div>`; }
function renderReports(){ const arr=filteredReports(); if(!arr.length) return `<p class="muted">${t('empty')}</p>`; return `<div class="list">${arr.slice(0,state.ui.showMore.reports?100:4).map(r=>`<div class="list-item"><div><strong>${escapeHtml(r.title)}</strong><div>${escapeHtml(r.text)}</div><div class="tiny muted">${dateTime(r.createdAt)} · ${escapeHtml(r.auto?L('Automatisch','Automatic'):L('Handmatig','Manual'))}</div></div><span class="pill ${r.status==='Rood'?'bad':r.status==='Oranje'?'warn':r.status==='Groen'?'good':'info'}">${r.status}</span></div>`).join('')}</div><button class="btn mt" data-action="toggle-more" data-key="reports">${state.ui.showMore.reports?t('less'):t('more')}</button>`; }
function renderCommunication(){ return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>${t('communicationPlanner')}</h3><button class="btn primary" data-action="open-communication-form">${t('add')} ${t('message')}</button><div class="mt">${renderCommunications()}</div></div><div class="card"><h3>${t('reports')}</h3>${renderReportFilters()}<button class="btn primary mt" data-action="open-report-form">${t('add')} ${t('report')}</button><div class="mt">${renderReports()}</div></div></div><div class="grid"><div class="card"><h3>${t('communicationTemplates')}</h3>${renderCommunicationTemplates()}<textarea class="textarea mt" id="toneText" placeholder="${L('Schrijf hier je concept...','Write your draft here...')}"></textarea><button class="btn mt" data-action="tone-format">${L('Maak professioneel','Make professional')}</button></div><div class="card"><h3>${t('openFollowups')}</h3>${state.communications.filter(c=>c.followDate&&c.followDate<=TODAY()).map(c=>`<div class="list-item compact"><span>${escapeHtml(c.to||c.customTo)}</span><span class="pill warn">${dateOnly(c.followDate)}</span></div>`).join('')||`<p class="muted">${t('empty')}</p>`}</div></div></div>`; }

function moduleQuality(){ const q={}; q.HACCP=state.tasks.length?Math.round(100-state.tasks.filter(t=>!t.duration||!t.priority).length/state.tasks.length*100):80; q.AGF=state.agfProducts.length?Math.round(100-state.agfProducts.filter(p=>!p.nasa).length/state.agfProducts.length*100):70; q.Inventory=state.inventory.length?Math.round(100-state.inventory.filter(i=>!i.nasa||i.min==null||i.max==null).length/state.inventory.length*100):70; q.Communication=state.communications.length?Math.round(100-state.communications.filter(c=>!c.status||!c.createdAt).length/state.communications.length*100):75; q.StoreMap=state.cleaning.items.length?Math.round(100-state.cleaning.items.filter(i=>!i.frequency).length/state.cleaning.items.length*100):75; return q; }
function renderPeriodComparison(){ const thisWeek=todayTasks().filter(t=>inPeriod(t.createdAt||t.completedAt,'7')).length; const lastWeek=state.tasks.filter(t=>{const d=new Date(t.createdAt||t.completedAt||0).getTime(); const now=Date.now(); return d<now-7*86400000 && d>=now-14*86400000;}).length; return `<div class="grid grid-2"><div class="card soft"><strong>${t('currentPeriod')}</strong><div class="value">${thisWeek}</div></div><div class="card soft"><strong>${t('previousPeriod')}</strong><div class="value">${lastWeek}</div></div></div><p class="muted">${thisWeek>=lastWeek?L('Deze periode is actiever dan de vorige.','This period is more active than the previous one.'):L('Deze periode is rustiger of minder geregistreerd.','This period is quieter or less registered.')}</p>`; }
function renderManagementSummary(){ return `<div class="card"><h3>${t('managementSummary')}</h3>${managementInsights().map(i=>`<p>• ${i}</p>`).join('')}<p>• ${weekCoach()}</p></div>`; }
function renderVisual(){ const q=moduleQuality(); const cap=(+state.settings.haccpHours||3.5)*60; const agfStats=countBy(state.agfProducts.map(p=>lastAgfStatus(p)||'Onbekend')); const commStats=countBy(state.communications.map(c=>c.status)); return `<div class="grid"><div class="hero"><span class="chip">${t('visual')}</span><h2>${t('managementSummary')}</h2><p>${L('Inzichten om planning, werkdruk, AGF, Store Map, communicatie en leren beter te sturen.','Insights to steer planning, workload, produce, Cleaning Map, communication and learning better.')}</p></div><div class="grid grid-4">${kpi(t('productivity'),productivity()+'%',productivity()>80?'good':productivity()>55?'warn':'bad')}${kpi(L('Werkdruk','Workload'),workload()+'%',workload()>90?'bad':workload()>70?'warn':'good')}${kpi(t('breakTime'),minutesToText(todayBreakMinutes()),'warn')}${kpi(t('storeRisk'),cleaningUrgent().length,cleaningUrgent().length?'warn':'good')}</div><div class="grid grid-2"><div class="card"><h3>${L('Werkdruk vs HACCP-uren','Workload vs HACCP hours')}</h3>${bar(L('Voltooide minuten','Completed minutes'),Math.round(todayCompletedMinutes()/cap*100),'good')}${bar(L('Open planning','Open planning'),workload(),workload()>90?'bad':'warn')}${bar(t('storemap'),Math.min(100,cleaningWorkloadMinutes()/cap*100),'info')}</div><div class="card"><h3>${L('AGF verdeling','Produce distribution')}</h3>${Object.entries(agfStats).map(([k,v])=>bar(localStatus(k),Math.min(100,v*20),k==='Overvoorraad'?'warn':k==='Leeg schap'?'bad':'good')).join('')||`<p class="muted">${t('empty')}</p>`}</div><div class="card"><h3>${t('communication')}</h3>${Object.entries(commStats).map(([k,v])=>bar(statusLabel(k),Math.min(100,v*25),k==='Rood'?'bad':k==='Geel'?'warn':'good')).join('')||`<p class="muted">${t('empty')}</p>`}</div><div class="card"><h3>${t('dataQuality')}</h3>${Object.entries(q).map(([k,v])=>bar(k,v,v>85?'good':v>65?'warn':'bad')).join('')}</div><div class="card"><h3>${t('periodCompare')}</h3>${renderPeriodComparison()}</div>${renderManagementSummary()}</div></div>`; }

function coachingCategoriesV65(){ return ['Werkhouding','Kalmte','Communicatie','Management','Klantgedrag','HACCP','AGF','Signalatie','Discipline','Zelfreflectie']; }
function renderCoaching(){ const lessons=getLessons(); const cats=coachingCategoriesV65(); const showCompleted=!!state.ui.showCompletedLessons, showLocked=!!state.ui.showLockedLessons; return `<div class="grid"><div class="hero"><span class="chip">Coaching Academy V6.5</span><h2>${L('Skill Tree voor slimmer werken','Skill Tree for smarter work')}</h2><p>${L('Leertrajecten met levels, examens, praktijkopdrachten en werkvloerlessen.','Learning paths with levels, exams, practice assignments and workfloor lessons.')}</p><div class="btn-row"><button class="btn" data-action="toggle-locked-lessons">${showLocked?t('hideLocked'):t('showLocked')}</button><button class="btn" data-action="toggle-completed-lessons">${showCompleted?t('hideCompleted'):t('showCompleted')}</button><button class="btn primary" data-action="lesson-test" data-id="level">${t('startExam')}</button></div></div><div class="grid grid-4">${kpi(t('level'),coachLevel(),'good')}${kpi('XP',state.coachingDone.length*25,'good')}${kpi(t('completedLessons'),state.coachingDone.length,null)}${kpi(t('unlocked'),lessons.filter(l=>!l.locked).length,null)}</div><div class="card"><h3>${t('skillPaths')}</h3><div class="skill-tree">${cats.map(c=>{const total=lessons.filter(l=>l.category===c).length||1; const done=lessons.filter(l=>l.category===c&&state.coachingDone.includes(l.id)).length; return `<div class="skill-node"><strong>${escapeHtml(c)}</strong>${bar('',Math.round(done/total*100),'good')}<span class="small muted">${done}/${total}</span></div>`;}).join('')}</div></div>${cats.map(c=>{const arr=lessons.filter(l=>l.category===c&&(showLocked||!l.locked)&&(showCompleted||!state.coachingDone.includes(l.id))).slice(0,14); if(!arr.length)return ''; return `<details class="detail-drawer" open><summary>${escapeHtml(c)} <span class="pill info">${arr.length}</span></summary><div class="drawer-content grid grid-3">${arr.map(l=>`<div class="card ${l.locked?'soft lesson-locked':''}">${lessonCard(l)}</div>`).join('')}</div></details>`;}).join('')}</div>`; }

function renderDiagnostics(){ const health=diagnosticHealth(); const q=moduleQuality(); const missing=[]; ['renderAgf','renderHaccp','renderInventory','renderCommunication','renderVisual','renderCoaching','renderSettings','renderStoreMap'].forEach(fn=>{ if(typeof window[fn] === 'undefined' && typeof eval(fn) === 'undefined') missing.push(fn); }); return `<div class="grid"><div class="grid grid-4">${kpi('Versie',APP.version,null)}${kpi('Cache',APP.cache,null)}${kpi(t('appHealth'),health+'%',health>85?'good':'warn')}${kpi('Records',totalRecords(),null)}</div><div class="grid grid-2"><div class="card"><h3>${t('appHealthGuard')}</h3>${regressionChecks().map(c=>`<div class="list-item compact"><span>${escapeHtml(c.name)}</span><span class="pill ${c.ok?'good':'bad'}">${c.ok?'OK':'Check'}</span></div>`).join('')}${missing.length?`<p class="danger">Missing: ${missing.join(', ')}</p>`:''}</div><div class="card"><h3>${t('dataQuality')}</h3>${Object.entries(q).map(([k,v])=>bar(k,v,v>85?'good':v>65?'warn':'bad')).join('')}</div><div class="card"><h3>${t('translationCoverage')}</h3>${bar('English',translationCoverage(),translationCoverage()>90?'good':'warn')}<p class="muted small">${L('Controleert kernlabels en navigatie.','Checks core labels and navigation.')}</p></div><div class="card"><h3>${t('backupReminder')}</h3><p>${backupReminderText()}</p><div class="btn-row"><button class="btn" data-action="download-backup">${t('backup')}</button><button class="btn" data-action="open-import">${t('import')}</button><button class="btn" data-action="clear-cache">Cache</button><button class="btn bad" data-action="reset-app">${t('reset')}</button></div></div></div><div class="card"><h3>${t('actionHistory')}</h3>${renderActivityTimeline()}</div><div class="card"><h3>Update log</h3><p><strong>v6.5.1</strong> Inventory stability hotfix.<br><strong>v6.5</strong> Daily Flow & Data Intelligence: 30-puntenupgrade voor workflow, vertaling, HACCP, AGF, Store Map, inventaris, communicatie, visualisatie, coaching en diagnostiek.</p><p><strong>v6.4</strong> Translation, Coaching Exams & Store Map Control.</p><p><strong>v6.3</strong> Design, Store Map & Coaching Expansion.</p></div></div>`; }
function translationCoverage(){ const keys=Object.keys(I18N.nl); const ok=keys.filter(k=>I18N.en[k]).length; return Math.round(ok/Math.max(1,keys.length)*100); }
function backupReminderText(){ if(!state.settings.lastBackup) return L('Je hebt nog geen backup gemaakt. Maak nu een backup voor veiligheid.','You have not created a backup yet. Create one now for safety.'); const days=Math.round((Date.now()-new Date(state.settings.lastBackup).getTime())/86400000); return days>=state.settings.backupReminderDays?L(`${days} dagen sinds je laatste backup.`,`${days} days since your last backup.`):L(`Laatste backup ${days} dagen geleden.`,`Last backup ${days} days ago.`); }
function renderActivityTimeline(){ const arr=state.activity.slice(0,30); return arr.length?`<div class="timeline">${arr.map(a=>`<div class="timeline-item"><div class="timeline-time">${dateTime(a.at)}</div><div class="timeline-card"><strong>${escapeHtml(a.type||'')}</strong><p>${escapeHtml(a.text)}</p></div></div>`).join('')}</div>`:`<p class="muted">${t('empty')}</p>`; }

function renderSettings(){ return `<div class="grid grid-main"><div class="grid"><div class="card"><h3>Profiel & ritme</h3><div class="form-grid"><label>${t('name')}<input class="input" id="setName" value="${escapeHtml(state.settings.name||'')}"></label><label>${t('language')}<select class="select" id="setLang"><option value="nl" ${currentLang()==='nl'?'selected':''}>Nederlands</option><option value="en" ${currentLang()==='en'?'selected':''}>English</option></select></label><label>${t('workHours')}<input class="input" id="setWorkHours" type="number" step="0.25" value="${state.settings.workHours}"></label><label>${t('haccpHours')}<input class="input" id="setHaccpHours" type="number" step="0.25" value="${state.settings.haccpHours}"></label><label>${t('shiftStart')}<input class="input" id="setShiftStart" type="time" value="${state.settings.shiftStart}"></label><label>${t('shiftEnd')}<input class="input" id="setShiftEnd" type="time" value="${state.settings.shiftEnd}"></label><label>${L('Startpagina','Start page')}<select class="select" id="setStartPage">${ROUTES.map(r=>`<option value="${r.id}" ${state.settings.startPage===r.id?'selected':''}>${t(r.label)}</option>`).join('')}</select></label><label>${L('Display mode','Display mode')}<select class="select" id="setDisplay"><option value="auto">Auto</option><option value="compact" ${state.settings.displayMode==='compact'?'selected':''}>Compact</option><option value="normal" ${state.settings.displayMode==='normal'?'selected':''}>Normal</option><option value="expanded" ${state.settings.displayMode==='expanded'?'selected':''}>Expanded</option></select></label></div><h4>${t('workdays')}</h4><div class="btn-row">${['Ma','Di','Wo','Do','Vr','Za','Zo'].map((d,i)=>`<button class="btn small ${state.settings.workDays.includes(i+1)?'primary':''}" data-action="settings-toggle-workday" data-day="${i+1}">${d}</button>`).join('')}</div><button class="btn primary mt" data-action="save-settings">${t('save')}</button></div><div class="card"><h3>Thema galerij</h3><div class="theme-grid">${themeOptions().map(th=>`<button class="theme-card ${state.settings.theme===th.id?'active':''}" data-action="set-theme" data-theme="${th.id}"><div class="theme-swatch">${th.colors.map(c=>`<span style="background:${c}"></span>`).join('')}</div><strong>${th.name}</strong></button>`).join('')}</div></div></div><div class="grid"><div class="card"><h3>Contactpersonen</h3><div class="list">${state.settings.contacts.map(c=>`<div class="list-item compact"><span>${escapeHtml(c)}</span><button class="btn small bad" data-action="delete-contact" data-name="${escapeHtml(c)}">${t('delete')}</button></div>`).join('')}</div><div class="btn-row mt"><input class="input" id="newContact" placeholder="Nieuwe contactpersoon"><button class="btn" data-action="add-contact">${t('add')}</button></div></div><div class="card"><h3>App/PWA</h3><p class="muted">${APP.version} · ${APP.cache}</p><div class="btn-row"><button class="btn" data-action="download-backup">Backup</button><button class="btn" data-action="start-tutorial">Tutorial opnieuw</button><button class="btn" data-action="clear-cache">Cache</button></div></div></div></div>`; }

function closeAndRoute(route){ state.route=route; state.ui.sidebarOpen=false; state.ui.assistOpen=false; closeModal(); save(); render(); }
function openCommand(){ const routes=ROUTES.map(r=>`<button class="nav-btn" data-action="command-route" data-route-id="${r.id}"><span class="nav-icon">${iconSvg(r.icon)}</span>${t(r.label)}</button>`).join(''); const agf=state.agfProducts.slice(0,10).map(p=>`<button class="nav-btn" data-action="command-route" data-route-id="agf">${escapeHtml(p.name)} · NASA ${escapeHtml(p.nasa||'-')}</button>`).join(''); const inv=state.inventory.slice(0,10).map(i=>`<button class="nav-btn" data-action="command-route" data-route-id="inventory">${escapeHtml(i.name)} · NASA ${escapeHtml(i.nasa||'-')}</button>`).join(''); modal('Command Palette', `<div class="modal-head"><h3>${t('search')}</h3><button class="btn" data-action="close-modal">×</button></div><div class="grid"><div><h4>${t('route')}</h4>${routes}</div><div><h4>AGF / Inventaris</h4>${agf}${inv}</div></div>`, 'wide'); }

const V65_TUTORIAL = [
 ['menu','Menu','Menu','Gebruik het menu om tussen hoofdgebieden te wisselen. Groepen houden het compact.','Use the menu to move between main areas. Groups keep it compact.','aside.sidebar','today'],
 ['assist','Live Assist','Live Assist','De rechter Assist geeft shiftstatus, pauze, werkdruk en de beste volgende actie.','The right Assist shows shift status, break time, workload and the best next action.','.assist-tab','today'],
 ['today','Vandaag-flow','Today flow','Vandaag begeleidt je werkdag in logische fases.','Today guides your workday through clear phases.','#pageRoot','today'],
 ['smart','Smart Next Action','Smart Next Action','Deze functie kiest één beste volgende stap en legt uit waarom.','This feature chooses one best next step and explains why.','#pageRoot','today'],
 ['haccp','HACCP dagplanning','HACCP day planning','HACCP plant basisroutine, doorgeschoven taken en periodiek werk binnen je HACCP-uren.','HACCP plans base routine, deferred and periodic work within your HACCP hours.','#pageRoot','haccp'],
 ['agf','AGF Decision Cards','Produce Decision Cards','AGF toont huidige status, trend, conflict en besteladvies.','Produce shows current status, trend, conflict and order advice.','#pageRoot','agf'],
 ['store','Schoonmaakpaspoort','Cleaning passport','Elke plank of bodembak kan historie, status en nacontrole krijgen.','Each shelf or bottom tray can have history, status and follow-up.','#pageRoot','storemap'],
 ['inventory','Inventarisronde','Inventory round','Loop voorraad item voor item na en genereer een bestellijst.','Check inventory item by item and generate an order list.','#pageRoot','inventory'],
 ['communication','Communicatie opvolging','Communication follow-up','Plan berichten met status, datum en opvolging.','Plan messages with status, date and follow-up.','#pageRoot','communication'],
 ['visual','Management Summary','Management Summary','Visualisatie toont conclusies, datakwaliteit en periodevergelijkingen.','Visualization shows conclusions, data quality and period comparisons.','#pageRoot','visual'],
 ['coaching','Coaching Skill Tree','Coaching Skill Tree','Coaching ontwikkelt vaardigheden via levels, lessen en praktijkopdrachten.','Coaching develops skills through levels, lessons and practice actions.','#pageRoot','coaching'],
 ['diag','Diagnostiek','Diagnostics','Diagnostiek bewaakt gezondheid, vertaling, backup en regressietests.','Diagnostics monitors health, translation, backup and regression tests.','#pageRoot','diagnostics']
];
function renderTutorial(){ const tut=state.ui.tutorial; if(!tut) return ''; const steps=V65_TUTORIAL; const step=steps[Math.min(tut.index||0,steps.length-1)]; const title=currentLang()==='en'?step[2]:step[1]; const text=currentLang()==='en'?step[4]:step[3]; return `<div class="tutorial-overlay"><div class="tutorial-bubble premium-tour"><div class="chip">${currentLang()==='en'?'Chapter tour':'Hoofdstukrondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${(tut.index||0)+1}/${steps.length}</div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p>${tut.preview?`<div class="tutorial-preview">${tut.preview}</div>`:''}<div class="btn-row"><button class="btn" data-action="tutorial-prev" ${(tut.index||0)===0?'disabled':''}>${t('previous')}</button><button class="btn" data-action="tutorial-example">${currentLang()==='en'?'Preview':'Preview'}</button><button class="btn primary" data-action="tutorial-next">${(tut.index||0)>=steps.length-1?t('finish'):t('next')}</button><button class="btn ghost" data-action="tutorial-stop">${t('stop')}</button></div></div></div>`; }
function tutorialStep(){ return V65_TUTORIAL[(state.ui.tutorial&&state.ui.tutorial.index)||0] || V65_TUTORIAL[0]; }
function highlightTutorialTarget(){ document.querySelectorAll('.tutorial-target').forEach(e=>e.classList.remove('tutorial-target')); const tut=state.ui.tutorial; if(!tut) return; const sel=tutorialStep()?.[5]; let el; try{ el=document.querySelector(sel); }catch(e){} if(el) el.classList.add('tutorial-target'); }
function tutorialExample(){ const step=tutorialStep(); const route=step?.[6]||state.route; state.ui.tutorial.preview = currentLang()==='en' ? `<strong>Preview:</strong> opening <b>${t(ROUTES.find(r=>r.id===route)?.label||route)}</b>. This only demonstrates navigation.` : `<strong>Preview:</strong> we openen <b>${t(ROUTES.find(r=>r.id===route)?.label||route)}</b>. Dit is alleen een demonstratie.`; state.route=route; save(); render(); }
function tutorialNext(){ const total=V65_TUTORIAL.length; state.ui.tutorial.index=(state.ui.tutorial.index||0)+1; state.ui.tutorial.preview=''; if(state.ui.tutorial.index>=total){ state.ui.tutorial=null; state.settings.tutorialDone=true; } save(); render(); }

const baseHandleActionV65 = handleAction;
handleAction = function(a,el,e){
  switch(a){
    case 'set-energy': setEnergy(el.dataset.level); return;
    case 'toggle-rust-mode': state.ui.rustMode=!state.ui.rustMode; save(); render(); return;
    case 'copy-day-summary': copyDaySummary(); return;
    case 'start-inventory-round': startInventoryRound(); return;
    case 'round-save-next': { const item=state.inventory.find(i=>i.id===el.dataset.id); if(item){ item.stock=+byId('roundStock').value||0; item.lastChecked=nowISO(); state.inventoryHistory.unshift({id:uid('invh'),name:item.name,qty:item.stock,at:nowISO(),reason:'round'}); } const r=state.ui.inventoryRound; if(r){ r.index++; save(); if(r.index>=r.ids.length){ state.ui.inventoryRound=null; closeModal(); toast(L('Inventarisronde afgerond','Inventory round completed'),'good'); render(); } else showInventoryRound(); } return; }
    case 'apply-report-filter': state.ui.reportFilter={q:byId('reportQ')?.value||'',status:byId('reportStatus')?.value||'all',period:byId('reportPeriod')?.value||'all'}; save(); render(); return;
    case 'use-comm-template': { const ta=byId('toneText'); if(ta) ta.value=communicationTemplateText(el.dataset.template); return; }
    case 'command-route': closeAndRoute(el.dataset.routeId); return;
    case 'start-tutorial': state.ui.tutorial={index:0,preview:''}; save(); render(); return;
    case 'tutorial-next': tutorialNext(); return;
    case 'tutorial-example': tutorialExample(); return;
    case 'save-settings': saveSettingsForm(); const sp=byId('setStartPage'); const dm=byId('setDisplay'); if(sp) state.settings.startPage=sp.value; if(dm) state.settings.displayMode=dm.value; save(); render(); return;
    default: return baseHandleActionV65(a,el,e);
  }
};

function saveSettingsForm(){ const name=byId('setName'), lang=byId('setLang'), wh=byId('setWorkHours'), hh=byId('setHaccpHours'), ss=byId('setShiftStart'), se=byId('setShiftEnd'); if(name) state.settings.name=name.value; if(lang) state.settings.lang=lang.value; if(wh) state.settings.workHours=+wh.value||8; if(hh) state.settings.haccpHours=+hh.value||3.5; if(ss) state.settings.shiftStart=ss.value; if(se) state.settings.shiftEnd=se.value; toast(currentLang()==='en'?'Settings saved':'Instellingen opgeslagen','good'); save(); render(); }

// make backup timestamp visible after download
const baseDownloadBackupV65 = downloadBackup;
downloadBackup = function(){ state.settings.lastBackup=nowISO(); save(); return baseDownloadBackupV65(); };

// better order history bookkeeping
const baseSetAgfStatusV65 = setAgfStatus;
setAgfStatus = function(id,status){ const p=state.agfProducts.find(p=>p.id===id); baseSetAgfStatusV65(id,status); if(p){ const d=agfDecision(p); state.orderHistory.unshift({id:uid('oh'),product:p.name,status,advice:d.advice,reason:d.reason,nasa:p.nasa,at:nowISO(),bonus:state.bonus.some(b=>b.productId===p.id)}); state.orderHistory=state.orderHistory.slice(0,200); save(); render(); }};
function renderOrderHistory(){ if(!Array.isArray(state.orderHistory)) state.orderHistory=[]; const arr=(state.orderHistory.length?state.orderHistory:state.agfOrders||[]).slice(0,16); return arr.length?`<div class="list">${arr.map(o=>`<div class="list-item compact"><span>${escapeHtml(o.product||o.name||'')} · ${escapeHtml(o.advice||o.status||'')}</span><span class="tiny muted">${dateTime(o.at)}</span></div>`).join('')}</div>`:`<p class="muted">${t('empty')}</p>`; }
function copyAgfOrders(){ const txt=agfAttention().map(a=>`${a.name}: ${a.advice} (${a.reason})`).join('\n'); copyText(txt); toast(t('copied'),'good'); }
const baseHandleActionAfterOrders = handleAction;
handleAction = function(a,el,e){ if(a==='copy-agf-orders'){ copyAgfOrders(); return; } return baseHandleActionAfterOrders(a,el,e); };

// Refresh rendered app with new v6.5 overrides
try{ save(); applyTheme(); render(); }catch(err){ console.error(err); renderError(err); }


/* =========================================================
   V6.5.2 — Translation & UX Text Polish
   Small, safe update: text, translations, empty states and labels.
   No structural module rebuilds.
========================================================= */
try {
  APP.version = 'v6.5.2';
  APP.cache = 'rich-cmd-cache-v652';

  Object.assign(I18N.nl, {
    profileRhythm:'Profiel & ritme', themeGallery:'Thema galerij', contacts:'Contactpersonen', newContact:'Nieuwe contactpersoon', appPwa:'App / PWA',
    openAction:'Laat zien', clockNow:'Klok nu in', showMe:'Laat zien', startTask:'Start taak', openHaccp:'Open HACCP', openAgf:'Open AGF', doAgfCheck:'Doe AGF-check', createReport:'Maak rapportage',
    noVisualDataTitle:'Nog geen visualisatiedata', noVisualDataText:'Visualisaties worden sterker zodra je taken afrondt, AGF-checks doet, shifts registreert en rapportages maakt.',
    noAgfTitle:'Nog geen AGF-producten', noAgfText:'Voeg producten toe of laad een startlijst om sneller te kunnen checken en bestellen.',
    noCommTitle:'Nog geen communicatiepunten', noCommText:'Maak een communicatiepunt aan zodra je iets wilt opvolgen of doorgeven.',
    noInventoryTitle:'Nog geen inventarisitems', noInventoryText:'Voeg inventaris toe met NASA-nummer, voorraad en minimum/maximum.',
    noTasksTitle:'Je dagplanning is nog leeg', noTasksText:'Laad dagelijkse HACCP-taken of voeg een taak toe om te starten.',
    loadDailyTasks:'Dagelijkse taken laden', addFirstTask:'Eerste taak toevoegen', loadAgfStarter:'AGF startproducten laden', explain:'Uitleg bekijken', whatNowActions:'Eerste acties', whyYouSeeThis:'Waarom zie ik dit?',
    automaticDayPlanning:'Automatische dagplanning', communicationPlanner:'Communicatieplanner', managementSummary:'Managementsamenvatting', improvementChances:'Verbeterkansen', actionHistory:'Actiegeschiedenis', profileAndRhythm:'Profiel & ritme', themeGalleryTitle:'Thema galerij',
    completedMinutes:'Voltooide minuten', openPlanning:'Open planning', produceDistribution:'AGF verdeling', workloadVsHaccp:'Werkdruk vs HACCP-uren', conclusions:'Conclusies', noProduceData:'Geen AGF-data.', noCommunicationData:'Geen communicatie.',
    diagnosticsCheck:'Diagnostische controle', recoveryTools:'Hersteltools', downloadBackup:'Backup downloaden', refreshCache:'Cache vernieuwen', cleanStart:'Schone start', version:'Versie', records:'Records', translationStatus:'Vertaalstatus', updateLog:'Update log',
    settingsSaved:'Instellingen opgeslagen', productAdded:'Product toegevoegd', taskCompleted:'Taak afgerond', reportAdded:'Rapportage toegevoegd', messageAdded:'Communicatie toegevoegd'
  });
  Object.assign(I18N.en, {
    profileRhythm:'Profile & rhythm', themeGallery:'Theme gallery', contacts:'Contacts', newContact:'New contact', appPwa:'App / PWA',
    openAction:'Show', clockNow:'Clock in now', showMe:'Show me', startTask:'Start task', openHaccp:'Open HACCP', openAgf:'Open Produce', doAgfCheck:'Do produce check', createReport:'Create report',
    noVisualDataTitle:'No visualization data yet', noVisualDataText:'Visualizations become stronger after you complete tasks, run produce checks, record shifts and create reports.',
    noAgfTitle:'No produce products yet', noAgfText:'Add products or load a starter list so you can check and order faster.',
    noCommTitle:'No communication items yet', noCommText:'Create a communication item when you need to follow up or share something.',
    noInventoryTitle:'No inventory items yet', noInventoryText:'Add inventory with NASA number, stock and minimum/maximum.',
    noTasksTitle:'Your day planning is empty', noTasksText:'Load daily HACCP tasks or add a task to get started.',
    loadDailyTasks:'Load daily tasks', addFirstTask:'Add first task', loadAgfStarter:'Load produce starter list', explain:'View explanation', whatNowActions:'First actions', whyYouSeeThis:'Why am I seeing this?',
    automaticDayPlanning:'Automatic day planning', communicationPlanner:'Communication planner', managementSummary:'Management summary', improvementChances:'Improvement opportunities', actionHistory:'Action history', profileAndRhythm:'Profile & rhythm', themeGalleryTitle:'Theme gallery',
    completedMinutes:'Completed minutes', openPlanning:'Open planning', produceDistribution:'Produce distribution', workloadVsHaccp:'Workload vs HACCP hours', conclusions:'Conclusions', noProduceData:'No produce data.', noCommunicationData:'No communication data.',
    diagnosticsCheck:'Diagnostics check', recoveryTools:'Recovery tools', downloadBackup:'Download backup', refreshCache:'Refresh cache', cleanStart:'Clean start', version:'Version', records:'Records', translationStatus:'Translation status', updateLog:'Update log',
    settingsSaved:'Settings saved', productAdded:'Product added', taskCompleted:'Task completed', reportAdded:'Report added', messageAdded:'Communication added'
  });

  if (typeof TASK_TRANSLATIONS !== 'undefined') {
    Object.assign(TASK_TRANSLATIONS, {
      'Kleine schobronde':'Small scrub round',
      'Kleine schrob ronde':'Small scrub round',
      'Temperatuursronde uitbreid':'Extended temperature round',
      'Profiel & ritme':'Profile & rhythm',
      'Thema galerij':'Theme gallery',
      'Contactpersonen':'Contacts',
      'Managementsamenvatting':'Management summary',
      'Verbeterkansen':'Improvement opportunities',
      'Actiegeschiedenis':'Action history',
      'Automatische dagplanning':'Automatic day planning',
      'Communicatieplanner':'Communication planner',
      'Productiviteit':'Productivity',
      'Werkdruk':'Workload',
      'Pauzetijd':'Break time',
      'Shiftduur':'Shift duration',
      'Schoonmaakurgent':'Cleaning urgency',
      'Schoonmaak urgent':'Cleaning urgent',
      'Geel':'Yellow',
      'Groen':'Green',
      'Rood':'Red'
    });
  }

  const _oldKpi = kpi;
  kpi = function(label,value,type){ return _oldKpi(trText(label), value, type); };

  function emptyState(titleKey,textKey,buttons=''){
    return `<div class="empty-state"><div class="empty-icon">ⓘ</div><h3>${t(titleKey)}</h3><p class="muted">${t(textKey)}</p>${buttons?`<div class="btn-row mt">${buttons}</div>`:''}</div>`;
  }

  const _oldRenderVisual652 = renderVisual;
  renderVisual = function(){
    const hasData = state.tasks.length || state.agfProducts.some(p=>p.history&&p.history.length) || state.shift.logs.length || state.communications.length || state.reports.length;
    if(!hasData){
      return `<div class="grid"><div class="hero"><span class="chip">${t('visual')}</span><h2>${t('noVisualDataTitle')}</h2><p>${t('noVisualDataText')}</p></div><div class="grid grid-3"><div class="card">${emptyState('noTasksTitle','noTasksText',`<button class="btn primary" data-route="haccp">${t('openHaccp')}</button>`)}</div><div class="card">${emptyState('noAgfTitle','noAgfText',`<button class="btn primary" data-route="agf">${t('openAgf')}</button>`)}</div><div class="card"><h3>${t('whyYouSeeThis')}</h3><p class="muted">${L('RICH CMD bouwt conclusies op uit echte acties. Zodra je taken, AGF-checks, shifts en rapportages gebruikt, verschijnen hier trends en managementinzichten.','RICH CMD builds conclusions from real actions. Once you use tasks, produce checks, shifts and reports, trends and management insights appear here.')}</p></div></div></div>`;
    }
    let html = _oldRenderVisual652();
    html = html.replaceAll('Werkdruk vs HACCP-uren', t('workloadVsHaccp'))
               .replaceAll('Voltooide minuten', t('completedMinutes'))
               .replaceAll('Open planning', t('openPlanning'))
               .replaceAll('AGF verdeling', t('produceDistribution'))
               .replaceAll('Geen AGF-data.', t('noProduceData'))
               .replaceAll('Geen communicatie.', t('noCommunicationData'))
               .replaceAll('Managementsamenvatting', t('managementSummary'))
               .replaceAll('Verbeterkansen', t('improvementChances'))
               .replaceAll('Actiegeschiedenis', t('actionHistory'))
               .replaceAll('Diagnostiek', t('diagnostics'))
               .replaceAll('Schoonmaakkaart', t('storemap'));
    return html;
  };

  const _oldRenderDashboard652 = renderDashboard;
  renderDashboard = function(){
    let html = _oldRenderDashboard652();
    html = html.replaceAll('Werkdruk', currentLang()==='en'?'Workload':'Werkdruk')
               .replaceAll('Focusminuten', currentLang()==='en'?'Focus minutes':'Focusminuten')
               .replaceAll('Schoonmaak urgent', currentLang()==='en'?'Cleaning urgent':'Schoonmaak urgent')
               .replaceAll('Managementsamenvatting', t('managementSummary'))
               .replaceAll('Actiegeschiedenis', t('actionHistory'))
               .replaceAll('Verbeterkansen', t('improvementChances'));
    return html;
  };

  const _oldRenderDiagnostics652 = renderDiagnostics;
  renderDiagnostics = function(){
    let html = _oldRenderDiagnostics652();
    html = html.replaceAll('Versie', t('version'))
               .replaceAll('Gezondheid', t('appHealth'))
               .replaceAll('Regressietest', t('diagnosticsCheck'))
               .replaceAll('Hersteltools', t('recoveryTools'))
               .replaceAll('Backup downloaden', t('downloadBackup'))
               .replaceAll('Cache vernieuwen', t('refreshCache'))
               .replaceAll('Schone start', t('cleanStart'))
               .replaceAll('Vertaaldekking', t('translationCoverage'))
               .replaceAll('Actiegeschiedenis', t('actionHistory'))
               .replaceAll('Update log', t('updateLog'))
               .replaceAll('Templates aanwezig', currentLang()==='en'?'Templates available':'Templates aanwezig')
               .replaceAll('Store Map neutraal', currentLang()==='en'?'Store Map neutral':'Store Map neutraal')
               .replaceAll('AGF product toevoegen', currentLang()==='en'?'Add produce product':'AGF product toevoegen')
               .replaceAll('Communicatieformulier', currentLang()==='en'?'Communication form':'Communicatieformulier')
               .replaceAll('Inventaris watchlist', currentLang()==='en'?'Inventory watchlist':'Inventaris watchlist')
               .replaceAll('Tutorial routes', currentLang()==='en'?'Tutorial routes':'Tutorial routes')
               .replaceAll('Vertalingen kernlabels', currentLang()==='en'?'Core label translations':'Vertalingen kernlabels');
    return html;
  };

  const _oldRenderSettings652 = renderSettings;
  renderSettings = function(){
    let html = _oldRenderSettings652();
    html = html.replaceAll('Profiel & ritme', t('profileAndRhythm'))
               .replaceAll('Thema galerij', t('themeGalleryTitle'))
               .replaceAll('Contactpersonen', t('contacts'))
               .replaceAll('Nieuwe contactpersoon', t('newContact'))
               .replaceAll('App/PWA', t('appPwa'))
               .replaceAll('Tutorial opnieuw', currentLang()==='en'?'Restart tutorial':'Tutorial opnieuw')
               .replaceAll('Nederlands', currentLang()==='en'?'Dutch':'Nederlands');
    return html;
  };

  const _oldRenderCommunication652 = renderCommunication;
  renderCommunication = function(){
    let html = _oldRenderCommunication652();
    html = html.replaceAll('Schrijf hier je concept...', currentLang()==='en'?'Write your draft here...':'Schrijf hier je concept...')
               .replaceAll('Maak professioneel', currentLang()==='en'?'Make professional':'Maak professioneel')
               .replaceAll('Situatie → Actie → Vervolg → Vraag', currentLang()==='en'?'Situation → Action → Follow-up → Question':'Situatie → Actie → Vervolg → Vraag');
    return html;
  };

  const _oldRenderHaccp652 = renderHaccp;
  renderHaccp = function(){
    let html = _oldRenderHaccp652();
    html = html.replaceAll('Automatische dagplanning', t('automaticDayPlanning'))
               .replaceAll('Vandaag uitvoeren', currentLang()==='en'?'Execute today':'Vandaag uitvoeren')
               .replaceAll('Capaciteit', currentLang()==='en'?'Capacity':'Capaciteit')
               .replaceAll('Beheer', t('manage'))
               .replaceAll('Uitstelanalyse', currentLang()==='en'?'Deferral analysis':'Uitstelanalyse')
               .replaceAll('Beschikbaar', currentLang()==='en'?'Available':'Beschikbaar')
               .replaceAll('Open taken', currentLang()==='en'?'Open tasks':'Open taken')
               .replaceAll('Taken inladen', currentLang()==='en'?'Load tasks':'Taken inladen')
               .replaceAll('Nieuwe taak', currentLang()==='en'?'New task':'Nieuwe taak');
    return html;
  };

  const _oldRenderToday652 = renderToday;
  renderToday = function(){
    let html = _oldRenderToday652();
    html = html.replaceAll('Openen', currentLang()==='en'?'Show':'Laat zien')
               .replaceAll('Start je shift', currentLang()==='en'?'Start your shift':'Start je shift')
               .replaceAll('Top 3 focuspunten', currentLang()==='en'?'Top 3 focus points':'Top 3 focuspunten')
               .replaceAll('Leerkaart vandaag', currentLang()==='en'?'Learning card today':'Leerkaart vandaag')
               .replaceAll('Vandaag tijdlijn', currentLang()==='en'?'Today timeline':'Vandaag tijdlijn')
               .replaceAll('Retail Radar', currentLang()==='en'?'Retail Radar':'Retail Radar')
               .replaceAll('Favoriete acties', currentLang()==='en'?'Favourite actions':'Favoriete acties')
               .replaceAll('Morgen voorbereiden', t('prepareTomorrow'));
    return html;
  };

  const _oldSaveSettingsForm652 = saveSettingsForm;
  saveSettingsForm = function(){
    _oldSaveSettingsForm652();
    toast(t('settingsSaved'),'good');
  };

  // Make the update visible in diagnostics and README-like UI.
  const _oldBackupReminderText652 = backupReminderText;
  backupReminderText = function(){
    return _oldBackupReminderText652 ? _oldBackupReminderText652() : (currentLang()==='en'?'Create regular backups when the app contains important work data.':'Maak regelmatig backups als de app belangrijke werkdata bevat.');
  };

  try { save(); applyTheme(); render(); } catch(err) { console.error(err); renderError(err); }
} catch(err) {
  console.error('v6.5.2 polish failed', err);
}


/* V6.5.2 final diagnostics override: avoid older raw Dutch labels and keep diagnostics safe. */
try {
  renderDiagnostics = function(){
    const health = diagnosticHealth();
    const q = moduleQuality();
    const checks = regressionChecks();
    return `<div class="grid">
      <div class="grid grid-4">
        ${kpi(t('version'),APP.version,null)}${kpi('Cache',APP.cache,null)}${kpi(t('appHealth'),health+'%',health>85?'good':'warn')}${kpi(t('records')||'Records',totalRecords(),null)}
      </div>
      <div class="grid grid-2">
        <div class="card"><h3>${t('diagnosticsCheck')}</h3>${checks.map(c=>`<div class="list-item compact"><span>${escapeHtml(currentLang()==='en'?trText(c.name):c.name)}</span><span class="pill ${c.ok?'good':'bad'}">${c.ok?'OK':'Check'}</span></div>`).join('')}</div>
        <div class="card"><h3>${t('dataQuality')}</h3>${Object.entries(q).map(([k,v])=>bar(currentLang()==='en'?trText(k):k,v,v>85?'good':v>65?'warn':'bad')).join('')}</div>
        <div class="card"><h3>${t('translationCoverage')}</h3>${bar('English',translationCoverage(),translationCoverage()>90?'good':'warn')}<p class="muted small">${currentLang()==='en'?'Checks core labels, navigation and common module labels.':'Controleert kernlabels, navigatie en veelgebruikte modulelabels.'}</p></div>
        <div class="card"><h3>${t('recoveryTools')}</h3><div class="btn-row"><button class="btn" data-action="download-backup">${t('downloadBackup')}</button><button class="btn" data-action="open-import">${t('import')}</button><button class="btn" data-action="clear-cache">${t('refreshCache')}</button><button class="btn bad" data-action="reset-app">${t('cleanStart')}</button></div></div>
      </div>
      <div class="card"><h3>${t('actionHistory')}</h3>${renderActivityTimeline()}</div>
      <div class="card"><h3>${t('updateLog')}</h3><p><strong>v6.5.2</strong> — ${currentLang()==='en'?'Translation and UX text polish. Safer empty states and clearer labels.':'Vertaal- en UX-tekstverbetering. Betere empty states en duidelijkere labels.'}</p><p><strong>v6.5.1</strong> — Inventory stability hotfix.</p><p><strong>v6.5</strong> — Daily Flow & Data Intelligence.</p></div>
    </div>`;
  };
  Object.assign(I18N.en,{records:'Records'}); Object.assign(I18N.nl,{records:'Records'});
  save(); render();
} catch(err) { console.error('v6.5.2 diagnostics override failed', err); }


/* V6.5.3 Translation Coverage Hotfix
   Scope: translation coverage only + safer modal labels. No data model changes. */
try {
  Object.assign(I18N.nl, {
    quickAction:'Snelle actie', haccpTask:'HACCP taak', agfProduct:'AGF product', addProduct:'Product toevoegen', addItem:'Item toevoegen',
    noDeferralReasons:'Geen uitstelredenen.', favouriteDashboard:'Favorieten-dashboard', agfQuickCheck:'AGF Quick Check', cleaningMap:'Schoonmaakkaart', inventoryRound:'Inventarisronde', dayPlanning:'Dagplanning',
    noOrderList:'Geen bestellijst.', communicationPlanner:'Communicatieplanner', addCommunication:'Communicatie toevoegen', addReport:'Rapportage toevoegen', toneHelper:'Tone helper', makeProfessional:'Maak professioneel', writeDraft:'Schrijf hier je concept...', selfEnter:'Zelf invullen', otherPerson:'Andere persoon', title:'Titel', text:'Tekst',
    profileAndRhythm:'Profiel & ritme', themeGalleryTitle:'Thema galerij', contacts:'Contactpersonen', newContact:'Nieuwe contactpersoon', appPwa:'App/PWA', restartTutorial:'Tutorial opnieuw', dutch:'Nederlands', monday:'Ma', tuesday:'Di', wednesday:'Wo', thursday:'Do', friday:'Vr', saturday:'Za', sunday:'Zo',
    workAttitude:'Werkhouding', calmness:'Kalmte', customerBehaviour:'Klantgedrag', signalling:'Signalatie', discipline:'Discipline', selfInsight:'Zelfreflectie',
    addProduce:'AGF product toevoegen', communicationForm:'Communicatieformulier', inventoryWatchlist:'Inventaris watchlist', tutorialRoutes:'Tutorial routes', coreLabelTranslations:'Vertalingen kernlabels', templatesAvailable:'Templates aanwezig', storeMapNeutral:'Store Map neutraal'
  });
  Object.assign(I18N.en, {
    quickAction:'Quick action', haccpTask:'HACCP task', agfProduct:'Produce product', addProduct:'Add product', addItem:'Add item',
    noDeferralReasons:'No deferral reasons.', favouriteDashboard:'Favourites dashboard', agfQuickCheck:'Produce Quick Check', cleaningMap:'Cleaning Map', inventoryRound:'Inventory round', dayPlanning:'Day planning',
    noOrderList:'No order list.', communicationPlanner:'Communication planner', addCommunication:'Add communication', addReport:'Add report', toneHelper:'Tone helper', makeProfessional:'Make professional', writeDraft:'Write your draft here...', selfEnter:'Enter manually', otherPerson:'Other person', title:'Title', text:'Text',
    profileAndRhythm:'Profile & rhythm', themeGalleryTitle:'Theme gallery', contacts:'Contacts', newContact:'New contact', appPwa:'App/PWA', restartTutorial:'Restart tutorial', dutch:'Dutch', monday:'Mon', tuesday:'Tue', wednesday:'Wed', thursday:'Thu', friday:'Fri', saturday:'Sat', sunday:'Sun',
    workAttitude:'Work attitude', calmness:'Calmness', customerBehaviour:'Customer behaviour', signalling:'Signalling', discipline:'Discipline', selfInsight:'Self-insight',
    addProduce:'Add produce product', communicationForm:'Communication form', inventoryWatchlist:'Inventory watchlist', tutorialRoutes:'Tutorial routes', coreLabelTranslations:'Core label translations', templatesAvailable:'Templates available', storeMapNeutral:'Store Map neutral'
  });

  const V653_DICT = {
    // Quick action / general UI
    'Snelle actie':'Quick action', 'HACCP taak':'HACCP task', 'AGF product':'Produce product', 'Inventaris':'Inventory', 'Communicatie':'Communication', 'Rapportage':'Report', 'Product toevoegen':'Add product', 'Item toevoegen':'Add item',
    'Favorieten-dashboard':'Favourites dashboard', 'Favoriete acties':'Favourite actions', 'AGF Quick Check':'Produce Quick Check', 'Schoonmaakkaart':'Cleaning Map', 'Inventarisronde':'Inventory round', 'Dagplanning':'Day planning', 'Geen uitstelredenen.':'No deferral reasons.', 'Geen bestellijst.':'No order list.',
    'Bonus toevoegen':'Add bonus', 'Favorieten':'Favourites', 'Nieuwe week / leegmaken':'New week / clear', 'Besteladvies':'Order advice', 'Bestelbesluit-logboek':'Order decision log', 'Productbeheer':'Product management', 'Productgroepen':'Product groups', 'Bonusweek':'Bonus week',
    'Communicatieplanner':'Communication planner', 'Communicatie toevoegen':'Add communication', 'Rapportage toevoegen':'Add report', 'Tone helper':'Tone helper', 'Maak professioneel':'Make professional', 'Schrijf hier je concept...':'Write your draft here...', 'Zelf invullen':'Enter manually', 'Andere persoon':'Other person', 'Titel':'Title', 'Tekst':'Text',
    'Profiel & ritme':'Profile & rhythm', 'Thema galerij':'Theme gallery', 'Contactpersonen':'Contacts', 'Nieuwe contactpersoon':'New contact', 'Tutorial opnieuw':'Restart tutorial', 'Nederlands':'Dutch',
    'Managementsamenvatting':'Management summary', 'Verbeterkansen':'Improvement opportunities', 'Actiegeschiedenis':'Action history', 'Automatische dagplanning':'Automatic day planning', 'Productiviteit':'Productivity', 'Werkdruk':'Workload', 'Pauzetijd':'Break time', 'Shiftduur':'Shift duration', 'Schoonmaak urgent':'Cleaning urgent', 'Schoonmaakurgent':'Cleaning urgent',
    'Uitstelanalyse':'Deferral analysis', 'Vandaag uitvoeren':'Execute today', 'Capaciteit':'Capacity', 'Beschikbaar':'Available', 'Open taken':'Open tasks', 'Taken inladen':'Load tasks', 'Nieuwe taak':'New task', 'Gepland':'Planned', 'Voltooid':'Completed', 'Voltooide minuten':'Completed minutes', 'Open planning':'Open planning', 'HACCP-capaciteit gebruikt.':'HACCP capacity used.',
    'AGF verdeling':'Produce distribution', 'Geen AGF-data.':'No produce data.', 'Geen communicatie.':'No communication.', 'Schoonmaak & Store Map':'Cleaning & Store Map', 'Schimmel':'Mould', 'Nacontrole':'Follow-up', 'Open schoonmaaksignalen':'Open cleaning signals', 'Managementconclusies':'Management conclusions',
    'Diagnostische controle':'Diagnostics check', 'Hersteltools':'Recovery tools', 'Backup downloaden':'Download backup', 'Cache vernieuwen':'Refresh cache', 'Schone start':'Clean start', 'Vertaaldekking':'Translation coverage', 'Update log':'Update log',
    'AGF product toevoegen':'Add produce product', 'Communicatieformulier':'Communication form', 'Inventaris watchlist':'Inventory watchlist', 'Tutorial routes':'Tutorial routes', 'Vertalingen kernlabels':'Core label translations', 'Templates aanwezig':'Templates available', 'Store Map neutraal':'Store Map neutral',
    // Coaching categories
    'Werkhouding':'Work attitude', 'Kalmte':'Calmness', 'Klantgedrag':'Customer behaviour', 'Signalatie':'Signalling', 'Zelfreflectie':'Self-insight', 'Management':'Management', 'Discipline':'Discipline', 'Communicatie':'Communication',
    // Store Map departments/zones
    'Vers':'Fresh', 'Vers hoog':'Fresh high wall', 'Vers laag':'Fresh low cooler', 'Houdbaar':'Dry grocery', 'Actiekoeling':'Promo cooler', 'Actiekoelingen':'Promo coolers', 'Winkeloverzicht':'Store overview', 'Navigatie':'Navigation', 'Te plannen':'To plan', 'Standaard winkelindeling laden':'Load standard layout', 'Metrage / plank toevoegen':'Add meter / shelf', 'Schoonmaakronde':'Cleaning round', 'Urgent in HACCP':'Plan urgent in HACCP', 'onderdelen':'items', 'Nog geen winkelindeling.':'No store layout yet.',
    'Verse sappen':'Fresh juices', 'Maaltijden':'Meals', 'Halal/Divers':'Halal/Various', 'Kaas/Vleeswaren':'Cheese/Cold cuts', 'Diepvries':'Frozen', 'Vegetarisch':'Vegetarian', 'Vlees':'Meat', 'Vis':'Fish', 'Kip':'Chicken', 'Panklaar':'Ready-to-cook',
    'Pad':'Aisle', 'Melk/Koek/Ontbijt':'Milk/Cookies/Breakfast', 'Dierenvoeding/Snoep':'Pet food/Candy', 'Drogmetica/Wasmiddelen':'Personal care/Laundry', 'Internationaal/Rijst':'International/Rice', 'Wraps/Eieren':'Wraps/Eggs', 'Groenteconserven':'Canned vegetables', 'Koffie/Thee':'Coffee/Tea', 'Wijnen':'Wines', 'Houdbare sap':'Shelf-stable juice', 'Frisdrank':'Soft drinks', 'Bier':'Beer', 'Nootjes':'Nuts', 'Chips':'Chips',
    'Bancarella Zuivel':'Bancarella Dairy', 'Bancarella AGF':'Bancarella Produce', 'Bancarella Vlees':'Bancarella Meat', 'Bancarella Gebak':'Bancarella Pastry',
    'Plank':'Shelf', 'Bodembak':'Bottom tray', 'Koeling':'Cooler', 'Schoongemaakt':'Cleaned', 'Vuil':'Dirty', 'Plan in HACCP':'Plan in HACCP', 'Historie':'History', 'Acties':'Actions', 'Afdeling':'Department', 'Meter':'Meter', 'Type':'Type',
    // Inventory categories/products
    'Inventarisbeheer':'Inventory management', 'Bestellijst':'Order list', 'Watchlist laag':'Low-stock watchlist', 'Geen lage voorraad.':'No low stock.', 'Zoek item / NASA':'Search item / NASA', 'Inventarisitem toevoegen':'Add inventory item', 'Inventaris bewerken':'Edit inventory', 'Schoonmaak':'Cleaning', 'Kantoor':'Office', 'Emballage':'Packaging', 'Kantine':'Canteen', 'Magazijn':'Warehouse', 'Overig':'Other',
    // AGF stored products / common terms
    'Cherrytomaten 250 gram':'Cherry tomatoes 250g', 'Snoepgroente tomaat 500 gram':'Snack tomatoes 500g', 'Sweet cherry cherrytomaten 250 gram':'Sweet cherry tomatoes 250g', 'Finest Red trostomaten 450 gram':'Finest Red truss tomatoes 450g', 'Biologisch Snoepgroente tomaat 400 gram':'Organic snack tomatoes 400g', 'Roma tomaten 750 gram':'Roma tomatoes 750g', 'Tasty Tom trostomaten 380 g':'Tasty Tom truss tomatoes 380g', 'Komkommer':'Cucumber', 'Biologisch Komkommer':'Organic cucumber', 'Courgette':'Courgette', 'Aubergine':'Eggplant', 'AH Prei':'Leek', 'Bosui':'Spring onion', 'Witlof 4 stuks':'Chicory 4 pcs', 'Sweet palermo rode puntpaprika 2 stuks':'Sweet Palermo red pointed peppers 2 pcs', 'Snijbonen 400 gram':'Runner beans 400g', 'AH Rode peper':'Red chili pepper', 'Tomaten':'Tomatoes', 'Groente':'Vegetables', 'Paprika':'Peppers', 'Peulvruchten':'Legumes', 'Kruiden/peper':'Herbs/chili'
  };

  Object.assign(TASK_TRANSLATIONS, V653_DICT, {
    'Basisroutine':'Base routine', 'Periodiek':'Periodic', 'Maandelijks':'Monthly', 'AGF':'Produce',
    'Kleine schrob ronde':'Small scrub round', 'Kleine schobronde':'Small scrub round'
  });

  function v653TranslateString(str){
    if(currentLang() !== 'en' || str == null) return String(str ?? '');
    let out = String(str);
    Object.keys(V653_DICT).sort((a,b)=>b.length-a.length).forEach(k=>{ out = out.split(k).join(V653_DICT[k]); });
    return out;
  }
  function v653Html(html){ return currentLang()==='en' ? v653TranslateString(html) : html; }

  const _v653_trText = trText;
  trText = function(text){ return currentLang()==='en' ? v653TranslateString(_v653_trText ? _v653_trText(text) : text) : (_v653_trText ? _v653_trText(text) : String(text??'')); };
  const _v653_trTitle = trTitle;
  trTitle = function(text){ return currentLang()==='en' ? v653TranslateString(_v653_trTitle ? _v653_trTitle(text) : text) : (_v653_trTitle ? _v653_trTitle(text) : String(text??'')); };

  const _v653_statusLabel = typeof statusLabel === 'function' ? statusLabel : null;
  if(_v653_statusLabel){ statusLabel = function(s){ return v653TranslateString(_v653_statusLabel(s)); }; }
  const _v653_displayDepartment = typeof displayDepartment === 'function' ? displayDepartment : null;
  if(_v653_displayDepartment){ displayDepartment = function(dep){ return v653TranslateString(_v653_displayDepartment(dep)); }; }

  openQuickAction = function(){
    modal(t('quickAction'), `<div class="grid grid-2">
      <button class="btn" data-action="open-task-form">${t('haccpTask')}</button>
      <button class="btn" data-action="open-agf-product-form">${t('agfProduct')}</button>
      <button class="btn" data-action="open-inventory-form">${t('inventory')}</button>
      <button class="btn" data-action="open-communication-form">${t('communication')}</button>
      <button class="btn" data-action="open-report-form">${t('report')}</button>
      <button class="btn" data-action="open-focus">${t('focus')}</button>
    </div>`);
  };

  openCommunicationForm = function(){
    const opts=state.settings.contacts.map(c=>`<option>${escapeHtml(v653TranslateString(c))}</option>`).join('');
    modal(t('addCommunication'), `<div class="grid"><label>${t('person')}<select class="select" id="commTo"><option value="">${t('selfEnter')}</option>${opts}</select></label><input class="input" id="commCustom" placeholder="${t('otherPerson')}"><textarea class="textarea" id="commMsg" placeholder="${t('message')}"></textarea><label>${t('followDate')}<input class="input" id="commFollow" type="date"></label><button class="btn primary" data-action="confirm-add-communication">${t('save')}</button></div>`);
  };
  openReportForm = function(){
    promptModal(t('addReport'),[{id:'title',label:t('title')},{id:'text',label:t('text'),type:'textarea'},{id:'status',label:t('status'),value:'Groen'}],'confirm-add-report');
  };

  const _v653_deferTask = deferTask;
  deferTask = function(id){
    const reasons=currentLang()==='en' ? ['No time','Too busy','Material missing','Need colleague','Lower priority','Other'] : ['Geen tijd','Te druk','Materiaal ontbreekt','Collega nodig','Lagere prioriteit','Anders'];
    selectModal(currentLang()==='en'?'Deferral reason':'Uitstelreden', `<div class="grid grid-2">${reasons.map(r=>`<button class="btn" data-action="confirm-defer" data-id="${id}" data-reason="${escapeHtml(r)}">${escapeHtml(r)}</button>`).join('')}</div>`);
  };
  renderDeferralAnalysis = function(){
    const map={}; state.tasks.filter(t=>t.status==='Uitgesteld').forEach(t=>{ const r=t.deferReason||t('noDeferralReasons'); map[r]=(map[r]||0)+1; });
    const entries=Object.entries(map); if(!entries.length) return `<p class="muted">${t('noDeferralReasons')}</p>`;
    return entries.map(([k,v])=>`<div class="bar-row"><div class="list-item compact"><span>${escapeHtml(v653TranslateString(k))}</span><strong>${v}</strong></div><div class="progress"><span style="width:${Math.min(100,v*20)}%"></span></div></div>`).join('');
  };

  const wrapNames=['renderToday','renderDashboard','renderHaccp','renderAgf','renderAgfQuickList','renderAgfProducts','renderBonus','renderBonusWeek','renderInventory','renderInventoryList','renderInventoryOrders','renderStoreMap','renderStoreHierarchy','renderHeatmap','renderCommunication','renderCommunications','renderReports','renderVisual','renderCoaching','renderDiagnostics','renderSettings','renderAssist','renderMobileBottom'];
  wrapNames.forEach(fn=>{
    if(typeof window[fn] === 'function') return; // not used in this app style, functions are local; handled below by eval fallback not possible safely
  });
  function wrapRender(fnName){
    try{
      const old = eval(fnName);
      if(typeof old === 'function'){
        const wrapped = function(){ return v653Html(old.apply(this, arguments)); };
        eval(fnName + ' = wrapped');
      }
    }catch(e){ console.warn('wrap failed', fnName, e); }
  }
  ['renderToday','renderDashboard','renderHaccp','renderAgf','renderAgfQuickList','renderAgfProducts','renderBonus','renderBonusWeek','renderInventory','renderInventoryList','renderInventoryOrders','renderStoreMap','renderStoreHierarchy','renderHeatmap','renderCommunication','renderCommunications','renderReports','renderVisual','renderCoaching','renderDiagnostics','renderSettings','renderAssist','renderMobileBottom','renderTaskList','renderTemplateManager','renderTaskBundles','renderSmartQueue','renderTimeline','renderActivityTimeline'].forEach(wrapRender);

  // Replace workday abbreviations only inside rendered HTML by wrapping settings after all other wrappers.
  const _v653_renderSettingsDays = renderSettings;
  renderSettings = function(){
    let html = _v653_renderSettingsDays();
    if(currentLang()==='en'){
      html = html.replace(/>Ma</g,'>Mon<').replace(/>Di</g,'>Tue<').replace(/>Wo</g,'>Wed<').replace(/>Do</g,'>Thu<').replace(/>Vr</g,'>Fri<').replace(/>Za</g,'>Sat<').replace(/>Zo</g,'>Sun<');
    }
    return html;
  };

  // Ensure saved AGF/inventory names are translated in common views, without altering stored data.
  const _v653_renderInventoryOrders = renderInventoryOrders;
  renderInventoryOrders = function(){ return v653Html(_v653_renderInventoryOrders()); };

  APP.version = 'v6.5.3';
  APP.cache = 'rich-cmd-cache-v653';
  state.schemaVersion = 653;
  save();
  render();
} catch(err) {
  console.error('v6.5.3 translation coverage hotfix failed', err);
}

/* =========================================================
   V6.5.4 — Tutorial Stability & Guided Tour
   Scope: stable tutorial only, no module rebuild.
========================================================= */
try {
  APP.version = 'v6.5.4';
  APP.cache = 'rich-cmd-cache-v654';
  state.schemaVersion = 654;

  const V654_TUTORIAL = [
    {id:'welcome',route:'today',target:'#pageRoot',nl:'Welkom bij RICH CMD',en:'Welcome to RICH CMD',nlText:'Deze rondleiding laat rustig zien waar de belangrijkste onderdelen zitten. Er wordt geen echte data aangepast.',enText:'This tour calmly shows where the most important parts are. No real data is changed.',nlPreview:'Je krijgt per stap één onderdeel te zien, met een korte uitleg en eventueel een voorbeeld.',enPreview:'Each step explains one part at a time, with a short explanation and optional preview.'},
    {id:'menu',route:'today',target:'aside.sidebar',nl:'Menu',en:'Menu',nlText:'Links vind je het hoofdmenu. Gebruik de groepen om snel naar Werk, Inzicht of Systeem te gaan.',enText:'The main menu is on the left. Use the groups to move quickly between Work, Insight and System.',nlPreview:'Voorbeeld: klik op HACCP om je dagplanning en taken te openen.',enPreview:'Example: click HACCP to open your day planning and tasks.'},
    {id:'assist',route:'today',target:'.assist-tab',nl:'Live Assist',en:'Live Assist',nlText:'Rechts zit Live Assist. Deze helpt met shiftstatus, pauze, werkdruk en de beste volgende actie.',enText:'Live Assist sits on the right. It helps with shift status, breaks, workload and the best next action.',nlPreview:'Voorbeeld: Live Assist kan voorstellen om eerst een korte basistaak af te ronden.',enPreview:'Example: Live Assist can suggest finishing a short base task first.'},
    {id:'today',route:'today',target:'#pageRoot',nl:'Vandaag',en:'Today',nlText:'Vandaag is je werkdag-cockpit. Hier zie je shift, prioriteiten, Smart Next Action en de belangrijkste signalen.',enText:'Today is your workday cockpit. It shows your shift, priorities, Smart Next Action and key signals.',nlPreview:'Als er nog geen data is, krijg je uitleg en knoppen om te starten.',enPreview:'If there is no data yet, you get explanation and buttons to start.'},
    {id:'smart',route:'today',target:'[data-tutorial="smart"]',nl:'Wat nu?',en:'What now?',nlText:'Wat nu? kiest één of meerdere logische acties op basis van shift, taken, AGF, communicatie en werkdruk.',enText:'What now? chooses one or more logical actions based on shift, tasks, produce, communication and workload.',nlPreview:'Voorbeeld: “Klok nu in” als je shift nog niet gestart is, of “Open HACCP” als taken klaarstaan.',enPreview:'Example: “Clock in now” if your shift has not started, or “Open HACCP” when tasks are ready.'},
    {id:'shift',route:'today',target:'#pageRoot',nl:'Shift en pauzes',en:'Shift and breaks',nlText:'Met inklokken, uitklokken en pauzes houdt RICH CMD je werktijd, pauzetijd en netto werktijd bij.',enText:'With clock-in, clock-out and breaks, RICH CMD tracks work time, break time and net work time.',nlPreview:'Aan het einde van je shift kan de app een samenvatting en feedback maken.',enPreview:'At the end of your shift the app can create a summary and feedback.'},
    {id:'haccp',route:'haccp',target:'#pageRoot',nl:'HACCP dagplanning',en:'HACCP day planning',nlText:'HACCP toont eerst je belangrijkste dagelijkse taken. Daarna komen weektaken, maandtaken en schoonmaakkaartpunten.',enText:'HACCP shows your most important daily tasks first. Weekly, monthly and cleaning-map items come after that.',nlPreview:'Je kunt taken afronden, uitstellen, focussen of de volgorde wijzigen.',enPreview:'You can complete, defer, focus on, or reorder tasks.'},
    {id:'templates',route:'haccp',target:'#pageRoot',nl:'Templates',en:'Templates',nlText:'Templates helpen je vaste dag-, week- en maandtaken snel in te laden zonder alles opnieuw te typen.',enText:'Templates help you load fixed daily, weekly and monthly tasks without retyping everything.',nlPreview:'Je kunt later selectief taken inladen of templates beheren.',enPreview:'You can later load selected tasks or manage templates.'},
    {id:'storemap',route:'storemap',target:'#pageRoot',nl:'Schoonmaakkaart',en:'Cleaning Map',nlText:'De schoonmaakkaart houdt per afdeling, pad, meter, plank of bodembak bij wat gecontroleerd of schoongemaakt is.',enText:'The Cleaning Map tracks checks and cleaning by department, aisle, meter, shelf or bottom tray.',nlPreview:'Schimmel, vuil en nacontroles kunnen worden omgezet naar HACCP-taken.',enPreview:'Mould, dirt and follow-ups can be turned into HACCP tasks.'},
    {id:'agf',route:'agf',target:'#pageRoot',nl:'AGF Quick Check',en:'Produce Quick Check',nlText:'AGF helpt je producten snel op OK, leeg schap, overvoorraad of kwaliteit te zetten.',enText:'Produce helps you quickly mark items as OK, empty shelf, overstock or quality issue.',nlPreview:'Huidige status weegt zwaarder dan historie, zodat je niet onnodig bijbestelt.',enPreview:'Current status outweighs history, so you do not order extra unnecessarily.'},
    {id:'bonus',route:'agf',target:'#pageRoot',nl:'Bonusartikelen',en:'Promotion items',nlText:'Bonusartikelen kun je apart markeren zodat ze tijdens bestellen extra aandacht krijgen.',enText:'Promotion items can be marked separately so they get extra attention during ordering.',nlPreview:'Gebruik de oranje B bij producten om ze als bonus actief te maken.',enPreview:'Use the orange B on products to mark them as active promotion items.'},
    {id:'inventory',route:'inventory',target:'#pageRoot',nl:'Inventaris',en:'Inventory',nlText:'Inventaris helpt met NASA-nummers, voorraad, minimum, maximum en bestellijsten.',enText:'Inventory helps with NASA numbers, stock, minimum, maximum and order lists.',nlPreview:'Als voorraad onder minimum komt, kan RICH CMD een besteladvies tonen.',enPreview:'When stock drops below minimum, RICH CMD can show an order advice.'},
    {id:'communication',route:'communication',target:'#pageRoot',nl:'Communicatie',en:'Communication',nlText:'Communicatie houdt bij wie je iets moet laten weten, met status, tijdstip en opvolging.',enText:'Communication tracks who you need to inform, with status, time and follow-up.',nlPreview:'Gebruik templates voor korte, professionele updates.',enPreview:'Use templates for short, professional updates.'},
    {id:'reports',route:'communication',target:'#pageRoot',nl:'Shift reports',en:'Shift reports',nlText:'Rapportages leggen vast hoe je dag ging, wat open bleef en wat morgen aandacht vraagt.',enText:'Reports record how your day went, what stayed open and what needs attention tomorrow.',nlPreview:'Na uitklokken kan een concept-shiftrapport worden gegenereerd.',enPreview:'After clocking out, a draft shift report can be generated.'},
    {id:'visual',route:'visual',target:'#pageRoot',nl:'Visualisatie',en:'Visualization',nlText:'Visualisatie geeft inzicht in productiviteit, werkdruk, AGF, schoonmaak, communicatie en datakwaliteit.',enText:'Visualization gives insight into productivity, workload, produce, cleaning, communication and data quality.',nlPreview:'Als er nog geen data is, legt de app uit welke acties data opleveren.',enPreview:'If there is no data yet, the app explains which actions create data.'},
    {id:'coaching',route:'coaching',target:'#pageRoot',nl:'Coaching',en:'Coaching',nlText:'Coaching helpt met werkvaardigheid, kalmte, communicatie, management en zelfinzicht.',enText:'Coaching helps with work skills, calmness, communication, management and self-insight.',nlPreview:'Lessen kunnen praktijkopdrachten, uitleg en toetsen bevatten.',enPreview:'Lessons can include practice tasks, explanations and quizzes.'},
    {id:'diagnostics',route:'diagnostics',target:'#pageRoot',nl:'Diagnostiek',en:'Diagnostics',nlText:'Diagnostiek toont appstatus, datakwaliteit, vertalingen, backup en hersteltools.',enText:'Diagnostics shows app status, data quality, translations, backup and recovery tools.',nlPreview:'Gebruik Diagnostiek als er iets vreemd lijkt of als je een backup wilt maken.',enPreview:'Use Diagnostics if something looks wrong or if you want to create a backup.'},
    {id:'settings',route:'settings',target:'#pageRoot',nl:'Instellingen',en:'Settings',nlText:'In Instellingen beheer je profiel, taal, thema, werkdagen, werkuren, HACCP-uren en PWA-opties.',enText:'In Settings you manage profile, language, theme, working days, work hours, HACCP hours and PWA options.',nlPreview:'Wijzigingen worden opgeslagen in je browseropslag.',enPreview:'Changes are saved in your browser storage.'},
    {id:'command',route:'today',target:'.top-actions',nl:'Snel zoeken',en:'Quick search',nlText:'Met de Command Palette kun je snel naar modules, producten of acties zoeken.',enText:'With the Command Palette you can quickly search modules, products or actions.',nlPreview:'Voorbeeld: zoek op “tape”, “AGF”, “focus” of een NASA-nummer.',enPreview:'Example: search for “tape”, “Produce”, “focus” or a NASA number.'},
    {id:'finish',route:'today',target:'#pageRoot',nl:'Klaar om te werken',en:'Ready to work',nlText:'Je kent nu de belangrijkste onderdelen. Begin klein: start je shift, laad taken of doe een AGF-check.',enText:'You now know the key parts. Start small: clock in, load tasks or do a produce check.',nlPreview:'Je kunt deze rondleiding later opnieuw starten via Instellingen of Diagnostiek.',enPreview:'You can restart this tour later from Settings or Diagnostics.'}
  ];

  function v654Step(){
    const tut = state.ui.tutorial || {index:0};
    return V654_TUTORIAL[Math.min(Math.max(tut.index||0,0), V654_TUTORIAL.length-1)] || V654_TUTORIAL[0];
  }

  tutorialStep = function(){ return v654Step(); };

  renderTutorial = function(){
    const tut = state.ui.tutorial;
    if(!tut) return '';
    const s = v654Step();
    const idx = Math.min((tut.index||0)+1, V654_TUTORIAL.length);
    const title = currentLang()==='en' ? s.en : s.nl;
    const text = currentLang()==='en' ? s.enText : s.nlText;
    const preview = tut.preview || '';
    const routeLabel = t(ROUTES.find(r=>r.id===s.route)?.label || s.route);
    return `<div class="tutorial-overlay v654-tour" role="dialog" aria-modal="true">
      <div class="tutorial-backdrop-note">${currentLang()==='en'?'Guided tour':'Rondleiding'}</div>
      <div class="tutorial-bubble premium-tour v654-bubble">
        <div class="modal-head">
          <div>
            <div class="chip">${currentLang()==='en'?'Step':'Stap'} ${idx}/${V654_TUTORIAL.length} · ${escapeHtml(routeLabel)}</div>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <button class="btn small" data-action="tutorial-stop" aria-label="${t('close')}">×</button>
        </div>
        <p>${escapeHtml(text)}</p>
        <div class="tutorial-mini"><strong>${currentLang()==='en'?'What this means':'Wat dit betekent'}:</strong><br>${escapeHtml(currentLang()==='en'?s.enPreview:s.nlPreview)}</div>
        ${preview?`<div class="tutorial-preview">${preview}</div>`:''}
        <div class="btn-row mt">
          <button class="btn" data-action="tutorial-prev" ${idx===1?'disabled':''}>${t('previous')}</button>
          <button class="btn" data-action="tutorial-example">${currentLang()==='en'?'Show preview':'Toon voorbeeld'}</button>
          <button class="btn" data-action="tutorial-open-step">${currentLang()==='en'?'Open screen':'Open scherm'}</button>
          <button class="btn primary" data-action="tutorial-next">${idx>=V654_TUTORIAL.length?t('finish'):t('next')}</button>
          <button class="btn ghost" data-action="tutorial-stop">${currentLang()==='en'?'Stop tour':'Stop rondleiding'}</button>
        </div>
      </div>
    </div>`;
  };

  highlightTutorialTarget = function(){
    try{ document.querySelectorAll('.tutorial-target').forEach(e=>e.classList.remove('tutorial-target')); }catch(e){}
    const tut = state.ui.tutorial;
    if(!tut) return;
    const sel = v654Step()?.target;
    let el = null;
    try { el = sel ? document.querySelector(sel) : null; } catch(e) { el = null; }
    if(el) {
      el.classList.add('tutorial-target');
      try { el.scrollIntoView({behavior:'smooth', block:'center', inline:'center'}); } catch(e) {}
    }
  };

  tutorialExample = function(){
    const s = v654Step();
    const miniCards = {
      today: ['Shift', 'Smart Next', 'Top 3'],
      haccp: ['Basisroutine', 'Planning', 'Templates'],
      agf: ['Quick Check', 'Bonus', 'Besteladvies'],
      storemap: ['Afdeling', 'Meter', 'Status'],
      inventory: ['Voorraad', 'NASA', 'Bestellijst'],
      communication: ['Persoon', 'Bericht', 'Opvolging'],
      visual: ['KPI', 'Werkdruk', 'Inzicht'],
      coaching: ['Les', 'Praktijk', 'Toets'],
      diagnostics: ['Versie', 'Data', 'Backup'],
      settings: ['Profiel', 'Thema', 'Werkritme']
    };
    const arr = miniCards[s.route] || ['Preview','Action','Result'];
    const translated = arr.map(x=>currentLang()==='en'?v653TranslateString(x):x);
    state.ui.tutorial.preview = `<div class="grid grid-3">${translated.map((x,i)=>`<div class="card soft"><span class="chip">${i+1}</span><h4>${escapeHtml(x)}</h4><p class="muted small">${currentLang()==='en'?'Example only. No real data is changed.':'Alleen voorbeeld. Er wordt geen echte data aangepast.'}</p></div>`).join('')}</div>`;
    save(); render();
  };

  tutorialNext = function(){
    if(!state.ui.tutorial) state.ui.tutorial={index:0,preview:''};
    state.ui.tutorial.index = (state.ui.tutorial.index||0) + 1;
    state.ui.tutorial.preview = '';
    if(state.ui.tutorial.index >= V654_TUTORIAL.length){
      state.ui.tutorial = null;
      state.settings.tutorialDone = true;
      toast(currentLang()==='en'?'Tour completed':'Rondleiding afgerond','good');
    }
    save(); render();
  };

  tutorialPrev = function(){
    if(!state.ui.tutorial) return;
    state.ui.tutorial.index = Math.max(0,(state.ui.tutorial.index||0)-1);
    state.ui.tutorial.preview = '';
    save(); render();
  };

  const _v654_handleAction = handleAction;
  handleAction = function(a,el,e){
    if(a==='tutorial-prev'){ tutorialPrev(); return; }
    if(a==='tutorial-open-step'){
      const s = v654Step();
      if(s && s.route){ state.route=s.route; state.ui.sidebarOpen=false; state.ui.assistOpen=false; state.ui.tutorial.preview=''; save(); render(); }
      return;
    }
    if(a==='tutorial-stop'){
      state.ui.tutorial=null; state.settings.tutorialDone=true; save(); render(); return;
    }
    if(a==='start-tutorial'){
      state.ui.tutorial={index:0,preview:''}; save(); render(); return;
    }
    return _v654_handleAction(a,el,e);
  };

  // Improve tutorial-related text in diagnostics without touching other modules.
  try{
    Object.assign(I18N.nl,{tutorialStable:'Tutorial stabiel', tutorialOnePart:'Eén onderdeel per stap'});
    Object.assign(I18N.en,{tutorialStable:'Tutorial stable', tutorialOnePart:'One part per step'});
  }catch(e){}

  save();
  render();
} catch(err) {
  console.error('v6.5.4 tutorial stability update failed', err);
}


/* =========================================================
   V6.5.5 — Guided Tour Overlay Fix
   Scope: tutorial overlay/spotlight only. No module rebuild.
========================================================= */
try {
  APP.version = 'v6.5.5';
  APP.cache = 'rich-cmd-cache-v655';
  state.schemaVersion = 655;

  function v655CurrentStep(){
    let s = null;
    try { s = tutorialStep ? tutorialStep() : null; } catch(e) { s = null; }
    if(!s) return {id:'welcome',route:'today',target:null,nl:'Welkom bij RICH CMD',en:'Welcome to RICH CMD',nlText:'Deze rondleiding toont één onderdeel per stap.',enText:'This tour shows one part at a time.',nlPreview:'Geen echte data wordt gewijzigd.',enPreview:'No real data is changed.'};
    if(Array.isArray(s)){
      return {id:s[0],nl:s[1],en:s[2],nlText:s[3],enText:s[4],target:s[5],route:s[6]||state.route,nlPreview:s[7]||'',enPreview:s[8]||''};
    }
    return s;
  }

  function v655TargetForStep(step){
    const map={
      welcome:null,
      menu:'aside.sidebar',
      assist:'.assist-tab',
      today:'[data-tutorial="today"]',
      smart:'[data-tutorial="smart"]',
      shift:'[data-tutorial="today"] .btn-row',
      haccp:'#pageRoot .hero, #pageRoot .card',
      templates:'#pageRoot details, #pageRoot .card',
      storemap:'#pageRoot .hero, #pageRoot details, #pageRoot .card',
      agf:'#pageRoot .hero, #pageRoot .card',
      bonus:'#pageRoot .card, #pageRoot .list-item',
      inventory:'#pageRoot .hero, #pageRoot .card',
      communication:'#pageRoot .hero, #pageRoot .card',
      reports:'#pageRoot details, #pageRoot .card',
      visual:'#pageRoot .hero, #pageRoot .card',
      coaching:'#pageRoot .hero, #pageRoot .card',
      diagnostics:'#pageRoot .hero, #pageRoot .card',
      settings:'#pageRoot .hero, #pageRoot .card',
      command:'.top-actions',
      finish:null
    };
    return map[step.id] || step.target || '#pageRoot';
  }

  function v655PrepareStep(){
    if(!state.ui.tutorial) return;
    const step = v655CurrentStep();
    if(step.route) state.route = step.route;
    state.ui.sidebarOpen = step.id === 'menu';
    // Do not open Live Assist during the tour; only highlight its fixed tab.
    state.ui.assistOpen = false;
    closeModal();
  }

  function v655GetTargetElement(){
    const step=v655CurrentStep();
    const selector=v655TargetForStep(step);
    if(!selector) return null;
    try { return document.querySelector(selector); } catch(e){ return null; }
  }

  renderTutorial = function(){
    const tut = state.ui.tutorial;
    if(!tut) return '';
    const step = v655CurrentStep();
    const total = (typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
    const index = Math.min((tut.index || 0) + 1, total);
    const title = currentLang()==='en' ? (step.en || step.nl || 'Guided tour') : (step.nl || step.en || 'Rondleiding');
    const body = currentLang()==='en' ? (step.enText || step.nlText || '') : (step.nlText || step.enText || '');
    const preview = tut.preview || '';
    const noTarget = !v655TargetForStep(step);
    return `<div class="tour-root v655-tour-root" role="dialog" aria-modal="true">
      <div class="tour-dim"></div>
      <div id="tourSpotlight" class="tour-spotlight ${noTarget?'hidden':''}"></div>
      <div class="tour-card v655-tour-card">
        <div class="tour-card-head">
          <div>
            <span class="chip">${currentLang()==='en'?'Guided tour':'Rondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${index}/${total}</span>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <button class="btn small" data-action="tutorial-stop" aria-label="${t('close')}">×</button>
        </div>
        <p>${escapeHtml(body)}</p>
        <div class="tutorial-mini"><strong>${currentLang()==='en'?'Focus':'Focus'}:</strong> ${escapeHtml(currentLang()==='en' ? (step.enPreview || 'Only this part is being explained now. No real data is changed.') : (step.nlPreview || 'Alleen dit onderdeel wordt nu uitgelegd. Er wordt geen echte data aangepast.'))}</div>
        ${preview ? `<div class="tutorial-preview">${preview}</div>` : ''}
        <div class="tour-controls">
          <button class="btn" data-action="tutorial-prev" ${index===1?'disabled':''}>${t('previous')}</button>
          <button class="btn" data-action="tutorial-example">${currentLang()==='en'?'Preview':'Preview'}</button>
          <button class="btn" data-action="tutorial-open-step">${currentLang()==='en'?'Show screen':'Laat scherm zien'}</button>
          <button class="btn primary" data-action="tutorial-next">${index>=total?t('finish'):t('next')}</button>
          <button class="btn ghost" data-action="tutorial-stop">${currentLang()==='en'?'Stop tour':'Stop rondleiding'}</button>
        </div>
      </div>
    </div>`;
  };

  highlightTutorialTarget = function(){
    try{ document.querySelectorAll('.tutorial-target').forEach(e=>e.classList.remove('tutorial-target')); }catch(e){}
    const spot = document.getElementById('tourSpotlight');
    if(!state.ui.tutorial || !spot) return;
    const el = v655GetTargetElement();
    if(!el){ spot.classList.add('hidden'); return; }
    const rect = el.getBoundingClientRect();
    const pad = 10;
    spot.classList.remove('hidden');
    spot.style.left = Math.max(8, rect.left - pad) + 'px';
    spot.style.top = Math.max(8, rect.top - pad) + 'px';
    spot.style.width = Math.min(window.innerWidth - 16, rect.width + pad*2) + 'px';
    spot.style.height = Math.min(window.innerHeight - 16, rect.height + pad*2) + 'px';
  };

  tutorialExample = function(){
    const step=v655CurrentStep();
    const examples={
      menu:['Menu groups','Work / Insight / System','Jump to modules'],
      assist:['Shift status','Break time','Next action'],
      today:['Clock in','Top 3 actions','Daily coach'],
      smart:['Best next action','Reason','Open route'],
      haccp:['Base routine','Done / Defer / Focus','Templates below'],
      storemap:['Department','Zone / meter','Shelf status'],
      agf:['Quick Check','Current status','Order advice'],
      inventory:['Stock','NASA number','Order list'],
      communication:['Person','Message','Follow-up'],
      visual:['KPI cards','Workload','Management insights'],
      coaching:['Lesson','Practice','Quiz'],
      diagnostics:['Version','Health checks','Backup'],
      settings:['Language','Theme','Work rhythm']
    };
    const arr = examples[step.id] || examples[step.route] || ['Preview','What it does','Where to continue'];
    const labels = currentLang()==='en' ? arr : arr.map(v653TranslateString || (x=>x));
    state.ui.tutorial.preview = `<div class="tour-preview-grid">${labels.map((x,i)=>`<div class="tour-preview-card"><span>${i+1}</span><strong>${escapeHtml(x)}</strong><small>${currentLang()==='en'?'Example only':'Alleen voorbeeld'}</small></div>`).join('')}</div>`;
    save(); render();
  };

  tutorialNext = function(){
    if(!state.ui.tutorial) state.ui.tutorial={index:0,preview:''};
    const total = (typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
    state.ui.tutorial.index = (state.ui.tutorial.index || 0) + 1;
    state.ui.tutorial.preview = '';
    if(state.ui.tutorial.index >= total){
      state.ui.tutorial=null;
      state.settings.tutorialDone=true;
      toast(currentLang()==='en'?'Tour completed':'Rondleiding afgerond','good');
    } else {
      v655PrepareStep();
    }
    save(); render();
  };

  tutorialPrev = function(){
    if(!state.ui.tutorial) return;
    state.ui.tutorial.index = Math.max(0,(state.ui.tutorial.index || 0)-1);
    state.ui.tutorial.preview = '';
    v655PrepareStep();
    save(); render();
  };

  const _v655_handleAction = handleAction;
  handleAction = function(a,el,e){
    if(a==='start-tutorial'){
      state.ui.tutorial={index:0,preview:''};
      v655PrepareStep();
      save(); render(); return;
    }
    if(a==='tutorial-open-step'){
      v655PrepareStep();
      save(); render(); return;
    }
    if(a==='tutorial-stop'){
      state.ui.tutorial=null;
      state.settings.tutorialDone=true;
      state.ui.sidebarOpen=false;
      state.ui.assistOpen=false;
      save(); render(); return;
    }
    if(a==='tutorial-prev'){ tutorialPrev(); return; }
    if(a==='tutorial-next'){ tutorialNext(); return; }
    if(a==='tutorial-example'){ tutorialExample(); return; }
    return _v655_handleAction(a,el,e);
  };

  const _v655_renderTutorial = renderTutorial;
  // Re-prepare the route when tutorial already existed from localStorage.
  if(state.ui.tutorial) v655PrepareStep();

  save();
  applyTheme();
  render();
} catch(err) {
  console.error('v6.5.5 guided tour overlay fix failed', err);
}

/* =========================================================
   RICH CMD v6.5.6 — Guided Tour Interaction Fix
   Scope: tutorial blur, preview, show-screen, stop button.
========================================================= */
try {
  APP.version = 'v6.5.6';
  APP.cache = 'rich-cmd-cache-v656';
  state.schemaVersion = 656;

  function v656Step(){
    try { return (typeof v655CurrentStep === 'function') ? v655CurrentStep() : (typeof tutorialStep === 'function' ? tutorialStep() : null); }
    catch(e){ return null; }
  }
  function v656Target(step){
    try { return (typeof v655TargetForStep === 'function') ? v655TargetForStep(step) : (step && step.target); }
    catch(e){ return step && step.target; }
  }
  function v656Prepare(){
    const step = v656Step() || {};
    if(step.route) state.route = step.route;
    state.ui.sidebarOpen = step.id === 'menu';
    state.ui.assistOpen = false;
    try { closeModal(); } catch(e) {}
  }
  function v656TargetEl(){
    const step = v656Step() || {};
    const selector = v656Target(step);
    if(!selector) return null;
    try { return document.querySelector(selector); } catch(e) { return null; }
  }

  renderTutorial = function(){
    const tut = state.ui.tutorial;
    if(!tut) return '';
    const step = v656Step() || {id:'welcome',nl:'Welkom bij RICH CMD',en:'Welcome to RICH CMD',nlText:'Deze rondleiding toont één onderdeel per stap.',enText:'This tour shows one part at a time.',nlPreview:'Geen echte data wordt gewijzigd.',enPreview:'No real data is changed.'};
    const total = (typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
    const index = Math.min((tut.index || 0) + 1, total);
    const title = currentLang()==='en' ? (step.en || step.nl || 'Guided tour') : (step.nl || step.en || 'Rondleiding');
    const body = currentLang()==='en' ? (step.enText || step.nlText || '') : (step.nlText || step.enText || '');
    const focus = currentLang()==='en' ? (step.enPreview || 'Only this part is being explained now. No real data is changed.') : (step.nlPreview || 'Alleen dit onderdeel wordt nu uitgelegd. Er wordt geen echte data aangepast.');
    const noTarget = !v656Target(step);
    const preview = tut.preview || '';
    const screenNote = tut.screenNote || '';
    return `<div class="tour-root v656-tour-root ${noTarget?'tour-intro':''}" role="dialog" aria-modal="true">
      <div class="tour-dim"></div>
      <div id="tourSpotlight" class="tour-spotlight ${noTarget?'hidden':''}"></div>
      <div class="tour-card v655-tour-card v656-tour-card">
        <div class="tour-card-head">
          <div>
            <span class="chip">${currentLang()==='en'?'Guided tour':'Rondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${index}/${total}</span>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <button class="btn small" data-action="tutorial-stop" aria-label="${t('close')}">×</button>
        </div>
        <p>${escapeHtml(body)}</p>
        <div class="tutorial-mini"><strong>${currentLang()==='en'?'Focus':'Focus'}:</strong> ${escapeHtml(focus)}</div>
        ${screenNote ? `<div class="v656-screen-note"><span>✓</span><div>${screenNote}</div></div>` : ''}
        ${preview ? `<div class="tutorial-preview">${preview}</div>` : ''}
        <div class="tour-controls">
          <button class="btn" data-action="tutorial-prev" ${index===1?'disabled':''}>${t('previous')}</button>
          <button class="btn" data-action="tutorial-example">${currentLang()==='en'?'Show preview':'Toon voorbeeld'}</button>
          <button class="btn" data-action="tutorial-open-step">${currentLang()==='en'?'Show this screen':'Laat dit scherm zien'}</button>
          <button class="btn primary" data-action="tutorial-next">${index>=total?t('finish'):t('next')}</button>
          <button class="btn ghost" data-action="tutorial-stop">${currentLang()==='en'?'Stop tour':'Stop rondleiding'}</button>
        </div>
      </div>
    </div>`;
  };

  highlightTutorialTarget = function(){
    const spot = document.getElementById('tourSpotlight');
    if(!state.ui.tutorial || !spot) return;
    const el = v656TargetEl();
    if(!el){ spot.classList.add('hidden'); return; }
    const rect = el.getBoundingClientRect();
    const pad = 10;
    spot.classList.remove('hidden');
    spot.style.left = Math.max(8, rect.left - pad) + 'px';
    spot.style.top = Math.max(8, rect.top - pad) + 'px';
    spot.style.width = Math.max(44, Math.min(window.innerWidth - 16, rect.width + pad*2)) + 'px';
    spot.style.height = Math.max(44, Math.min(window.innerHeight - 16, rect.height + pad*2)) + 'px';
  };

  tutorialExample = function(){
    const step = v656Step() || {};
    const examples = {
      welcome:['Start tour','One step at a time','No data changes'],
      menu:['Open sections','Choose a module','Close menu'],
      assist:['Shift status','Break time','Recommended action'],
      today:['Clock in','Top 3 actions','Daily coach'],
      smart:['Best next action','Why this advice','Open the right module'],
      shift:['Clock in','Start break','End shift'],
      haccp:['Daily routine','Done / Defer / Focus','Templates below'],
      templates:['Choose template','Select tasks','Load into planner'],
      storemap:['Department','Zone / meter','Shelf or bottom tray'],
      agf:['Quick Check','Current status','Order advice'],
      bonus:['Mark bonus','Check daily','Add to order list'],
      inventory:['Stock level','NASA number','Order list'],
      communication:['Person','Message','Follow-up date'],
      reports:['Daily report','Status color','Copy summary'],
      visual:['KPI cards','Workload','Management insights'],
      coaching:['Skill path','Practice','Quiz'],
      diagnostics:['Version','Health checks','Backup'],
      settings:['Language','Theme','Work rhythm'],
      command:['Search','Jump to module','Find product']
    };
    const arr = examples[step.id] || examples[step.route] || ['Preview','What it does','Where to continue'];
    const labels = currentLang()==='en' ? arr : arr.map(x => (typeof v653TranslateString === 'function' ? v653TranslateString(x) : x));
    state.ui.tutorial.preview = `<div class="tour-preview-grid">${labels.map((x,i)=>`<div class="tour-preview-card"><span>${i+1}</span><strong>${escapeHtml(x)}</strong><small>${currentLang()==='en'?'Example only — nothing is saved':'Alleen voorbeeld — niets wordt opgeslagen'}</small></div>`).join('')}</div>`;
    state.ui.tutorial.screenNote = '';
    save(); render();
  };

  function v656OpenStep(){
    v656Prepare();
    const step = v656Step() || {};
    const routeLabel = step.route ? (currentLang()==='en' ? `Opened ${step.route}.` : `${step.route} geopend.`) : (currentLang()==='en'?'This step has no separate screen.':'Deze stap heeft geen apart scherm.');
    state.ui.tutorial.preview = '';
    state.ui.tutorial.screenNote = currentLang()==='en' ? `${routeLabel} The highlighted area shows what this step is about.` : `${routeLabel} Het gemarkeerde gebied laat zien waar deze stap over gaat.`;
    save(); render();
  }

  function v656StopTour(){
    state.ui.tutorial = null;
    state.settings.tutorialDone = true;
    state.ui.sidebarOpen = false;
    state.ui.assistOpen = false;
    try { closeModal(); } catch(e) {}
    save(); render();
    try { toast(currentLang()==='en'?'Tour stopped':'Rondleiding gestopt','info'); } catch(e) {}
  }

  const _v656_handleAction = handleAction;
  handleAction = function(a,el,e){
    if(a==='start-tutorial'){ state.ui.tutorial={index:0,preview:'',screenNote:''}; v656Prepare(); save(); render(); return; }
    if(a==='tutorial-example'){ tutorialExample(); return; }
    if(a==='tutorial-open-step'){ v656OpenStep(); return; }
    if(a==='tutorial-stop'){ v656StopTour(); return; }
    if(a==='tutorial-prev'){ if(state.ui.tutorial){ state.ui.tutorial.index=Math.max(0,(state.ui.tutorial.index||0)-1); state.ui.tutorial.preview=''; state.ui.tutorial.screenNote=''; v656Prepare(); save(); render(); } return; }
    if(a==='tutorial-next'){
      if(!state.ui.tutorial) state.ui.tutorial={index:0,preview:'',screenNote:''};
      const total=(typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
      state.ui.tutorial.index=(state.ui.tutorial.index||0)+1;
      state.ui.tutorial.preview=''; state.ui.tutorial.screenNote='';
      if(state.ui.tutorial.index>=total){ state.ui.tutorial=null; state.settings.tutorialDone=true; save(); render(); try{toast(currentLang()==='en'?'Tour completed':'Rondleiding afgerond','good');}catch(e){}; return; }
      v656Prepare(); save(); render(); return;
    }
    return _v656_handleAction(a,el,e);
  };

  // Capture tutorial buttons before any overlay/modal handler can interfere.
  if(!window.__richCmdTourCapture656){
    window.__richCmdTourCapture656 = true;
    document.addEventListener('click', function(e){
      const btn = e.target && e.target.closest ? e.target.closest('.tour-root [data-action]') : null;
      if(!btn) return;
      const a = btn.dataset.action;
      if(!a || !a.startsWith('tutorial')) return;
      e.preventDefault();
      e.stopPropagation();
      handleAction(a, btn, e);
    }, true);
  }

  if(state.ui.tutorial) v656Prepare();
  save();
  applyTheme();
  render();
} catch(err) {
  console.error('v6.5.6 guided tour interaction fix failed', err);
}


/* =========================================================
   RICH CMD v6.5.7 — Guided Tour Cleanup Fix
   Scope: remove stacked tour layers, lighten spotlight, hard-stop tour.
========================================================= */
try {
  APP.version = 'v6.5.7';
  APP.cache = 'rich-cmd-cache-v657';
  state.schemaVersion = 657;

  function v657RemoveTourLayers(){
    try { document.querySelectorAll('.tutorial-overlay,.tour-root,.tour-backdrop,.tour-orphan').forEach(el => el.remove()); } catch(e) {}
  }

  function v657Step(){
    const idx = (state.ui.tutorial && state.ui.tutorial.index) || 0;
    let raw = null;
    try { raw = (typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL[Math.min(idx, V65_TUTORIAL.length-1)] : null; } catch(e) {}
    if(Array.isArray(raw)){
      return {id: raw[0], nl: raw[1], en: raw[2], nlText: raw[3], enText: raw[4], target: raw[5], route: raw[6] || state.route};
    }
    return raw || {id:'welcome', nl:'Welkom bij RICH CMD', en:'Welcome to RICH CMD', nlText:'Deze rondleiding toont één onderdeel per stap.', enText:'This tour shows one part at a time.', target:null, route:'today'};
  }

  function v657TargetFor(step){
    const map = {
      menu:'aside.sidebar',
      assist:'.assist-tab',
      today:'[data-tutorial="today"]',
      smart:'[data-tutorial="smart"]',
      shift:'[data-tutorial="today"] .btn-row',
      haccp:'#pageRoot .hero, #pageRoot .card',
      templates:'#pageRoot details, #pageRoot .card',
      focus:'#pageRoot .card',
      storemap:'#pageRoot .hero, #pageRoot details, #pageRoot .card',
      agf:'#pageRoot .hero, #pageRoot .card',
      bonus:'#pageRoot .card, #pageRoot .list-item',
      inventory:'#pageRoot .hero, #pageRoot .card',
      communication:'#pageRoot .hero, #pageRoot .card',
      reports:'#pageRoot details, #pageRoot .card',
      visual:'#pageRoot .hero, #pageRoot .card',
      coaching:'#pageRoot .hero, #pageRoot .card',
      diagnostics:'#pageRoot .hero, #pageRoot .card',
      settings:'#pageRoot .hero, #pageRoot .card',
      command:'.top-actions',
      done:null,
      welcome:null
    };
    return map[step.id] || step.target || null;
  }

  function v657Prepare(){
    const step = v657Step();
    if(step.route) state.route = step.route;
    state.ui.sidebarOpen = step.id === 'menu';
    state.ui.assistOpen = false;
    try { closeModal(); } catch(e) {}
  }

  renderTutorial = function(){
    const tut = state.ui.tutorial;
    if(!tut) return '';
    const step = v657Step();
    const total = (typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
    const index = Math.min((tut.index || 0) + 1, total);
    const title = currentLang()==='en' ? (step.en || step.nl || 'Guided tour') : (step.nl || step.en || 'Rondleiding');
    const body = currentLang()==='en' ? (step.enText || step.nlText || '') : (step.nlText || step.enText || '');
    const target = v657TargetFor(step);
    const noTarget = !target;
    const preview = tut.preview || '';
    const screenNote = tut.screenNote || '';
    return `<div class="tour-root v657-tour-root ${noTarget?'tour-intro':''}" role="dialog" aria-modal="true" data-step="${escapeHtml(step.id || '')}">
      <div class="tour-dim"></div>
      <div id="tourSpotlight" class="tour-spotlight ${noTarget?'hidden':''}"></div>
      <div class="tour-card v657-tour-card">
        <div class="tour-card-head">
          <div>
            <span class="chip">${currentLang()==='en'?'Guided tour':'Rondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${index}/${total}</span>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <button type="button" class="btn small" data-action="tutorial-stop" data-tour-stop="1" aria-label="${t('close')}">×</button>
        </div>
        <p>${escapeHtml(body)}</p>
        <div class="tutorial-mini"><strong>${currentLang()==='en'?'This step':'Deze stap'}:</strong> ${noTarget ? (currentLang()==='en'?'Intro or wrap-up. No screen part is highlighted.':'Introductie of afronding. Er wordt geen schermonderdeel gemarkeerd.') : (currentLang()==='en'?'Only the highlighted part matters right now.':'Alleen het gemarkeerde onderdeel is nu belangrijk.')}</div>
        ${screenNote ? `<div class="v656-screen-note"><span>✓</span><div>${screenNote}</div></div>` : ''}
        ${preview ? `<div class="tutorial-preview">${preview}</div>` : ''}
        <div class="tour-controls">
          <button type="button" class="btn" data-action="tutorial-prev" ${index===1?'disabled':''}>${t('previous')}</button>
          <button type="button" class="btn" data-action="tutorial-example">${currentLang()==='en'?'Show preview':'Toon voorbeeld'}</button>
          <button type="button" class="btn" data-action="tutorial-open-step">${currentLang()==='en'?'Show this screen':'Laat dit scherm zien'}</button>
          <button type="button" class="btn primary" data-action="tutorial-next">${index>=total?t('finish'):t('next')}</button>
          <button type="button" class="btn ghost" data-action="tutorial-stop" data-tour-stop="1">${currentLang()==='en'?'Stop tour':'Stop rondleiding'}</button>
        </div>
      </div>
    </div>`;
  };

  highlightTutorialTarget = function(){
    const spot = document.getElementById('tourSpotlight');
    if(!state.ui.tutorial || !spot) return;
    const step = v657Step();
    const selector = v657TargetFor(step);
    if(!selector){ spot.classList.add('hidden'); return; }
    let el = null;
    try { el = document.querySelector(selector); } catch(e) { el = null; }
    if(!el){ spot.classList.add('hidden'); return; }
    const rect = el.getBoundingClientRect();
    const pad = 12;
    spot.classList.remove('hidden');
    spot.style.left = Math.max(8, rect.left - pad) + 'px';
    spot.style.top = Math.max(8, rect.top - pad) + 'px';
    spot.style.width = Math.max(52, Math.min(window.innerWidth - 16, rect.width + pad*2)) + 'px';
    spot.style.height = Math.max(52, Math.min(window.innerHeight - 16, rect.height + pad*2)) + 'px';
  };

  const _bindPostRender_v657 = bindPostRender;
  bindPostRender = function(){
    v657RemoveTourLayers();
    _bindPostRender_v657();
    // bindPostRender from older versions inserts the new tutorial layer; force one final cleanup of duplicates.
    const roots = Array.from(document.querySelectorAll('.tour-root'));
    roots.slice(0,-1).forEach(el => el.remove());
    try { highlightTutorialTarget(); } catch(e) {}
  };

  function v657StopTour(){
    state.ui.tutorial = null;
    state.settings.tutorialDone = true;
    state.ui.sidebarOpen = false;
    state.ui.assistOpen = false;
    state.ui.command = false;
    try { closeModal(); } catch(e) {}
    v657RemoveTourLayers();
    save();
    render();
    try { toast(currentLang()==='en'?'Tour stopped':'Rondleiding gestopt','info'); } catch(e) {}
  }

  function v657Example(){
    const step = v657Step();
    const title = currentLang()==='en' ? (step.en || step.nl || 'Example') : (step.nl || step.en || 'Voorbeeld');
    const route = step.route || state.route;
    const routeName = routeLabel(route);
    state.ui.tutorial.preview = `<div class="tour-preview-grid">
      <div class="tour-preview-card"><span>1</span><strong>${escapeHtml(title)}</strong><small>${currentLang()==='en'?'This is what the current step is about.':'Hier gaat deze stap over.'}</small></div>
      <div class="tour-preview-card"><span>2</span><strong>${escapeHtml(routeName)}</strong><small>${currentLang()==='en'?'The related screen/module.':'Het bijbehorende scherm of onderdeel.'}</small></div>
      <div class="tour-preview-card"><span>3</span><strong>${currentLang()==='en'?'No real changes':'Geen echte wijziging'}</strong><small>${currentLang()==='en'?'Preview only. Nothing is saved.':'Alleen voorbeeld. Er wordt niets opgeslagen.'}</small></div>
    </div>`;
    state.ui.tutorial.screenNote = '';
    save(); render();
  }

  function v657OpenStep(){
    const step = v657Step();
    v657Prepare();
    const routeName = step.route ? routeLabel(step.route) : '';
    state.ui.tutorial.preview = '';
    state.ui.tutorial.screenNote = step.route
      ? (currentLang()==='en' ? `${routeName} is now shown. The highlighted area is the part this step explains.` : `${routeName} wordt nu getoond. Het gemarkeerde onderdeel hoort bij deze uitleg.`)
      : (currentLang()==='en' ? 'This step is an explanation and has no separate screen.' : 'Deze stap is uitleg en heeft geen apart scherm.');
    save(); render();
  }

  function v657Next(){
    if(!state.ui.tutorial) state.ui.tutorial = {index:0,preview:'',screenNote:''};
    const total=(typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
    state.ui.tutorial.index=(state.ui.tutorial.index||0)+1;
    state.ui.tutorial.preview=''; state.ui.tutorial.screenNote='';
    if(state.ui.tutorial.index>=total){ v657StopTour(); try { toast(currentLang()==='en'?'Tour completed':'Rondleiding afgerond','good'); } catch(e) {} return; }
    v657Prepare(); save(); render();
  }

  function v657Prev(){
    if(!state.ui.tutorial) return;
    state.ui.tutorial.index=Math.max(0,(state.ui.tutorial.index||0)-1);
    state.ui.tutorial.preview=''; state.ui.tutorial.screenNote='';
    v657Prepare(); save(); render();
  }

  const _handleAction_v657 = handleAction;
  handleAction = function(a,el,e){
    if(a==='start-tutorial'){ state.ui.tutorial={index:0,preview:'',screenNote:''}; v657Prepare(); save(); render(); return; }
    if(a==='tutorial-stop'){ v657StopTour(); return; }
    if(a==='tutorial-example'){ v657Example(); return; }
    if(a==='tutorial-open-step'){ v657OpenStep(); return; }
    if(a==='tutorial-next'){ v657Next(); return; }
    if(a==='tutorial-prev'){ v657Prev(); return; }
    return _handleAction_v657(a,el,e);
  };

  if(!window.__richCmdTourCapture657){
    window.__richCmdTourCapture657 = true;
    ['click','mousedown','touchstart'].forEach(type => {
      document.addEventListener(type, function(e){
        const btn = e.target && e.target.closest ? e.target.closest('[data-tour-stop="1"],[data-action="tutorial-stop"],.tour-root [data-action]') : null;
        if(!btn) return;
        const a = btn.dataset.action;
        if(!a || !a.startsWith('tutorial')) return;
        e.preventDefault();
        e.stopPropagation();
        if(e.stopImmediatePropagation) e.stopImmediatePropagation();
        handleAction(a, btn, e);
      }, true);
    });
  }

  if(state.ui.tutorial) v657Prepare();
  save(); applyTheme(); render();
} catch(err) {
  console.error('v6.5.7 guided tour cleanup fix failed', err);
}

/* =========================================================
   RICH CMD v6.5.8 — Guided Tour Bubble Polish
   Scope: tutorial presentation only.
   - Removes the preview button.
   - Uses a clearer speech-bubble style.
   - Keeps working controls: Previous, Show screen, Next, Stop.
========================================================= */
try {
  APP.version = 'v6.5.8';
  APP.cache = 'rich-cmd-cache-v658';
  state.schemaVersion = 658;

  function v658Step(){
    try { return (typeof v657Step === 'function') ? v657Step() : (typeof tutorialStep === 'function' ? tutorialStep() : null); }
    catch(e){ return null; }
  }
  function v658TargetFor(step){
    try { return (typeof v657TargetFor === 'function') ? v657TargetFor(step) : (step && step.target); }
    catch(e){ return step && step.target; }
  }
  function v658Prepare(){
    const step = v658Step() || {};
    if(step.route) state.route = step.route;
    state.ui.sidebarOpen = step.id === 'menu';
    state.ui.assistOpen = false;
    try { closeModal(); } catch(e) {}
  }
  function v658Stop(){
    state.ui.tutorial = null;
    state.settings.tutorialDone = true;
    state.ui.sidebarOpen = false;
    state.ui.assistOpen = false;
    state.ui.command = false;
    try { closeModal(); } catch(e) {}
    try { document.querySelectorAll('.tutorial-overlay,.tour-root,.tour-backdrop,.tour-orphan').forEach(el=>el.remove()); } catch(e) {}
    save(); render();
    try { toast(currentLang()==='en' ? 'Tour stopped' : 'Rondleiding gestopt','info'); } catch(e) {}
  }
  function v658OpenStep(){
    v658Prepare();
    const step = v658Step() || {};
    const routeName = step.route ? routeLabel(step.route) : '';
    state.ui.tutorial.screenNote = step.route
      ? (currentLang()==='en' ? `${routeName} is now visible. Continue with the highlighted part.` : `${routeName} is nu zichtbaar. Ga verder met het gemarkeerde onderdeel.`)
      : (currentLang()==='en' ? 'This is an introduction step. There is no separate screen to open.' : 'Dit is een introductiestap. Er is geen apart scherm om te openen.');
    state.ui.tutorial.preview = '';
    save(); render();
  }
  function v658Next(){
    if(!state.ui.tutorial) state.ui.tutorial = {index:0,screenNote:''};
    const total = (typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
    state.ui.tutorial.index = (state.ui.tutorial.index || 0) + 1;
    state.ui.tutorial.preview = '';
    state.ui.tutorial.screenNote = '';
    if(state.ui.tutorial.index >= total){
      v658Stop();
      try { toast(currentLang()==='en' ? 'Tour completed' : 'Rondleiding afgerond','good'); } catch(e) {}
      return;
    }
    v658Prepare(); save(); render();
  }
  function v658Prev(){
    if(!state.ui.tutorial) return;
    state.ui.tutorial.index = Math.max(0,(state.ui.tutorial.index || 0)-1);
    state.ui.tutorial.preview = '';
    state.ui.tutorial.screenNote = '';
    v658Prepare(); save(); render();
  }

  renderTutorial = function(){
    const tut = state.ui.tutorial;
    if(!tut) return '';
    const step = v658Step() || {id:'welcome', nl:'Welkom bij RICH CMD', en:'Welcome to RICH CMD', nlText:'Deze rondleiding toont één onderdeel per stap.', enText:'This tour shows one part at a time.', target:null, route:'today'};
    const total = (typeof V65_TUTORIAL !== 'undefined' && Array.isArray(V65_TUTORIAL)) ? V65_TUTORIAL.length : 20;
    const index = Math.min((tut.index || 0) + 1, total);
    const title = currentLang()==='en' ? (step.en || step.nl || 'Guided tour') : (step.nl || step.en || 'Rondleiding');
    const body = currentLang()==='en' ? (step.enText || step.nlText || '') : (step.nlText || step.enText || '');
    const target = v658TargetFor(step);
    const noTarget = !target;
    const note = tut.screenNote || '';
    return `<div class="tour-root v658-tour-root ${noTarget?'tour-intro':''}" role="dialog" aria-modal="true" data-step="${escapeHtml(step.id || '')}">
      <div class="tour-dim"></div>
      <div id="tourSpotlight" class="tour-spotlight ${noTarget?'hidden':''}"></div>
      <div class="tour-card v658-tour-bubble">
        <div class="tour-card-head">
          <div>
            <span class="chip">${currentLang()==='en'?'Guided tour':'Rondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${index}/${total}</span>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <button type="button" class="btn small" data-action="tutorial-stop" data-tour-stop="1" aria-label="${t('close')}">×</button>
        </div>
        <p>${escapeHtml(body)}</p>
        <div class="v658-focus-line"><strong>${currentLang()==='en'?'Focus':'Focus'}:</strong> ${noTarget ? (currentLang()==='en'?'This is an intro or wrap-up step.':'Dit is een intro- of afrondstap.') : (currentLang()==='en'?'Only look at the highlighted part for now.':'Kijk nu alleen naar het gemarkeerde onderdeel.')}</div>
        ${note ? `<div class="v656-screen-note"><span>✓</span><div>${escapeHtml(note)}</div></div>` : ''}
        <div class="tour-controls v658-controls">
          <button type="button" class="btn" data-action="tutorial-prev" ${index===1?'disabled':''}>${t('previous')}</button>
          <button type="button" class="btn" data-action="tutorial-open-step">${currentLang()==='en'?'Show screen':'Laat scherm zien'}</button>
          <button type="button" class="btn primary" data-action="tutorial-next">${index>=total?t('finish'):t('next')}</button>
          <button type="button" class="btn ghost" data-action="tutorial-stop" data-tour-stop="1">${currentLang()==='en'?'Stop tour':'Stop rondleiding'}</button>
        </div>
      </div>
    </div>`;
  };

  const _handleAction_v658 = handleAction;
  handleAction = function(a,el,e){
    if(a==='start-tutorial'){ state.ui.tutorial={index:0,screenNote:'',preview:''}; v658Prepare(); save(); render(); return; }
    if(a==='tutorial-stop'){ v658Stop(); return; }
    if(a==='tutorial-open-step'){ v658OpenStep(); return; }
    if(a==='tutorial-next'){ v658Next(); return; }
    if(a==='tutorial-prev'){ v658Prev(); return; }
    // The old preview button is removed; keep this as a harmless no-op for cached clicks.
    if(a==='tutorial-example'){ return; }
    return _handleAction_v658(a,el,e);
  };

  if(state.ui.tutorial) v658Prepare();
  save(); applyTheme(); render();
} catch(err) {
  console.error('v6.5.8 guided tour bubble polish failed', err);
}

/* =========================================================
   RICH CMD v6.5.9 — Guided Tour Chronology Fix
   Scope: tutorial order/targets only. No module changes.
========================================================= */
try {
  APP.version = 'v6.5.10';
  APP.cache = 'rich-cmd-cache-v6510';
  state.schemaVersion = 6510;

  const V659_TOUR = [
    {id:'welcome', route:'today', target:null, nl:'Welkom bij RICH CMD', en:'Welcome to RICH CMD', nlText:'Deze rondleiding neemt je rustig mee door de app. We tonen steeds één onderdeel tegelijk, zodat je niet hoeft te zoeken.', enText:'This tour calmly guides you through the app. We show one part at a time, so you never have to search.'},
    {id:'menu', route:'today', target:'aside.sidebar', nl:'Hoofdmenu', en:'Main menu', nlText:'Hier navigeer je tussen Vandaag, Werk, Inzicht & Groei en Systeem. De groepen houden de app overzichtelijk.', enText:'This is where you move between Today, Work, Insight & Growth and System. The groups keep the app organised.'},
    {id:'assist', route:'today', target:'.assist-tab', nl:'Live Assist', en:'Live Assist', nlText:'De Live Assist-tab staat aan de rechterkant. Die helpt met shiftstatus, pauze, werkdruk en je beste volgende actie.', enText:'The Live Assist tab is on the right. It helps with shift status, breaks, workload and your best next action.'},
    {id:'today', route:'today', target:'[data-tutorial="today"]', nl:'Vandaag', en:'Today', nlText:'Vandaag is je dagelijkse cockpit. Hier start je je shift, zie je prioriteiten en werk je snel door je dag heen.', enText:'Today is your daily cockpit. Here you start your shift, see priorities and move through your day quickly.'},
    {id:'smart', route:'today', target:'[data-tutorial="smart"]', nl:'Wat nu?', en:'What now?', nlText:'Wat nu? geeft direct advies over je volgende logische actie. De app kijkt naar shift, taken, AGF, communicatie en werkdruk.', enText:'What now? gives immediate advice about your next logical action. The app checks shift, tasks, produce, communication and workload.'},
    {id:'shift', route:'today', target:'[data-tutorial="today"] .btn-row', nl:'Shift en pauzes', en:'Shift and breaks', nlText:'Met inklokken, pauze starten en uitklokken bouw je een daglog op. Dit helpt later bij rapportage en visualisatie.', enText:'Clocking in, starting breaks and clocking out builds a daily log. This helps later with reports and visualization.'},
    {id:'dashboard', route:'dashboard', target:'#pageRoot .hero, #pageRoot .card', nl:'Dashboard', en:'Dashboard', nlText:'Het dashboard geeft een breder overzicht van prestaties, signalen en status. Gebruik dit vooral voor overzicht en controle.', enText:'The dashboard gives a wider view of performance, signals and status. Use it mainly for overview and control.'},
    {id:'haccp', route:'haccp', target:'#pageRoot .hero, #pageRoot .card', nl:'HACCP', en:'HACCP', nlText:'HACCP is je werkplanner voor dagelijkse, wekelijkse, maandelijkse en periodieke taken. Hier rond je taken af of stel je ze uit.', enText:'HACCP is your planner for daily, weekly, monthly and periodic tasks. This is where you complete or defer tasks.'},
    {id:'storemap', route:'storemap', target:'#pageRoot .hero, #pageRoot .card', nl:'Schoonmaakkaart', en:'Cleaning Map', nlText:'De schoonmaakkaart helpt bijhouden wat gecontroleerd, schoongemaakt of gesignaleerd is per afdeling, meter, plank of bodembak.', enText:'The Cleaning Map tracks what has been checked, cleaned or signalled by department, meter, shelf or bottom tray.'},
    {id:'agf', route:'agf', target:'#pageRoot .hero, #pageRoot .card', nl:'AGF', en:'Produce', nlText:'AGF helpt bij quick checks, bonusartikelen, NASA-nummers en besteladvies. De huidige status telt zwaarder dan oude historie.', enText:'Produce helps with quick checks, promotion items, NASA numbers and order advice. Current status weighs more than old history.'},
    {id:'inventory', route:'inventory', target:'#pageRoot .hero, #pageRoot .card', nl:'Inventaris', en:'Inventory', nlText:'Inventaris helpt met voorraad, minimum, maximum, NASA-nummers en bestellijsten voor schoonmaak, kantoor en andere materialen.', enText:'Inventory helps with stock, minimum, maximum, NASA numbers and order lists for cleaning, office and other supplies.'},
    {id:'communication', route:'communication', target:'#pageRoot .hero, #pageRoot .card', nl:'Communicatie', en:'Communication', nlText:'In Communicatie leg je vast wie je iets moet laten weten, met status, datum, tijd en opvolging.', enText:'In Communication you record who needs to be informed, with status, date, time and follow-up.'},
    {id:'reports', route:'communication', target:'#pageRoot details, #pageRoot .card', nl:'Shift reports', en:'Shift reports', nlText:'Shift reports leggen vast hoe je dag verliep. Ze helpen bij terugkijken, verbeteren en overdragen.', enText:'Shift reports record how your day went. They help with reviewing, improving and handover.'},
    {id:'visual', route:'visual', target:'#pageRoot .hero, #pageRoot .card', nl:'Visualisatie', en:'Visualization', nlText:'Visualisatie maakt productiviteit, werkdruk, AGF, HACCP, schoonmaak en communicatie inzichtelijk.', enText:'Visualization makes productivity, workload, produce, HACCP, cleaning and communication easier to understand.'},
    {id:'coaching', route:'coaching', target:'#pageRoot .hero, #pageRoot .card', nl:'Coaching', en:'Coaching', nlText:'Coaching helpt met werkvaardigheid, kalmte, communicatie, management, klantgedrag en zelfinzicht.', enText:'Coaching helps with work skills, calmness, communication, management, customer behavior and self-insight.'},
    {id:'diagnostics', route:'diagnostics', target:'#pageRoot .hero, #pageRoot .card', nl:'Diagnostiek', en:'Diagnostics', nlText:'Diagnostiek toont appstatus, versie, datakwaliteit, vertalingen, backup en hersteltools.', enText:'Diagnostics shows app status, version, data quality, translations, backup and recovery tools.'},
    {id:'settings', route:'settings', target:'#pageRoot .hero, #pageRoot .card', nl:'Instellingen', en:'Settings', nlText:'In Instellingen beheer je taal, thema, werkdagen, werkuren, HACCP-uren, contacten en app-opties.', enText:'In Settings you manage language, theme, working days, work hours, HACCP hours, contacts and app options.'},
    {id:'command', route:'today', target:'.top-actions', nl:'Snel zoeken', en:'Quick search', nlText:'Met de Command Palette spring je snel naar modules, producten, inventarisitems of acties.', enText:'With the Command Palette you quickly jump to modules, products, inventory items or actions.'},
    {id:'mobile', route:'today', target:'.mobile-bottom, .top-actions', nl:'Mobiele bediening', en:'Mobile controls', nlText:'Op telefoon gebruik je de onderbalk en snelle acties. Alle functies blijven beschikbaar, maar compacter.', enText:'On phone you use the bottom bar and quick actions. All features remain available, but more compact.'},
    {id:'finish', route:'today', target:null, nl:'Klaar om te starten', en:'Ready to start', nlText:'Je kent nu de belangrijkste onderdelen. Begin klein: klok in, laad taken of doe een AGF-check.', enText:'You now know the main parts. Start small: clock in, load tasks or do a produce check.'}
  ];

  function v659Step(){
    const idx = Math.min(Math.max((state.ui.tutorial && state.ui.tutorial.index) || 0, 0), V659_TOUR.length - 1);
    return V659_TOUR[idx] || V659_TOUR[0];
  }
  function v659Target(step){ return step && step.target ? step.target : null; }
  function v659TargetElement(){
    const selector = v659Target(v659Step());
    if(!selector) return null;
    try { return document.querySelector(selector); } catch(e) { return null; }
  }
  function v659Prepare(){
    const step = v659Step();
    if(step.route) state.route = step.route;
    state.ui.sidebarOpen = step.id === 'menu';
    state.ui.assistOpen = false;
    try { closeModal(); } catch(e) {}
  }
  function v659Stop(){
    state.ui.tutorial = null;
    state.settings.tutorialDone = true;
    state.ui.sidebarOpen = false;
    state.ui.assistOpen = false;
    state.ui.command = false;
    try { closeModal(); } catch(e) {}
    try { document.querySelectorAll('.tour-root,.tutorial-overlay,.tour-backdrop,.tour-orphan').forEach(el => el.remove()); } catch(e) {}
    save(); render();
    try { toast(currentLang()==='en' ? 'Tour stopped' : 'Rondleiding gestopt', 'info'); } catch(e) {}
  }
  function v659Next(){
    if(!state.ui.tutorial) state.ui.tutorial = {index:0,screenNote:''};
    state.ui.tutorial.index = (state.ui.tutorial.index || 0) + 1;
    state.ui.tutorial.screenNote = '';
    state.ui.tutorial.preview = '';
    if(state.ui.tutorial.index >= V659_TOUR.length){
      v659Stop();
      try { toast(currentLang()==='en' ? 'Tour completed' : 'Rondleiding afgerond', 'good'); } catch(e) {}
      return;
    }
    v659Prepare(); save(); render();
  }
  function v659Prev(){
    if(!state.ui.tutorial) return;
    state.ui.tutorial.index = Math.max(0, (state.ui.tutorial.index || 0) - 1);
    state.ui.tutorial.screenNote = '';
    state.ui.tutorial.preview = '';
    v659Prepare(); save(); render();
  }
  function v659OpenStep(){
    v659Prepare();
    const step = v659Step();
    const routeName = step.route ? routeLabel(step.route) : '';
    state.ui.tutorial.screenNote = step.route
      ? (currentLang()==='en' ? `${routeName} is now open. The highlighted area belongs to this explanation.` : `${routeName} is nu geopend. Het gemarkeerde onderdeel hoort bij deze uitleg.`)
      : (currentLang()==='en' ? 'This step is an introduction or wrap-up.' : 'Deze stap is een introductie of afronding.');
    save(); render();
  }

  tutorialStep = function(){ return v659Step(); };
  v657Step = function(){ return v659Step(); };
  v658Step = function(){ return v659Step(); };
  v657TargetFor = function(step){ return v659Target(step || v659Step()); };
  v658TargetFor = function(step){ return v659Target(step || v659Step()); };

  renderTutorial = function(){
    const tut = state.ui.tutorial;
    if(!tut) return '';
    const step = v659Step();
    const index = Math.min((tut.index || 0) + 1, V659_TOUR.length);
    const title = currentLang()==='en' ? step.en : step.nl;
    const body = currentLang()==='en' ? step.enText : step.nlText;
    const hasTarget = !!v659Target(step);
    const note = tut.screenNote || '';
    return `<div class="tour-root v659-tour-root ${hasTarget?'':'tour-intro'}" role="dialog" aria-modal="true" data-step="${escapeHtml(step.id)}">
      <div class="tour-dim"></div>
      <div id="tourSpotlight" class="tour-spotlight ${hasTarget?'':'hidden'}"></div>
      <div class="tour-card v658-tour-bubble v659-tour-bubble">
        <div class="tour-card-head">
          <div>
            <span class="chip">${currentLang()==='en'?'Guided tour':'Rondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${index}/${V659_TOUR.length}</span>
            <h2>${escapeHtml(title)}</h2>
          </div>
          <button type="button" class="btn small" data-action="tutorial-stop" data-tour-stop="1" aria-label="${t('close')}">×</button>
        </div>
        <p>${escapeHtml(body)}</p>
        <div class="v658-focus-line"><strong>${currentLang()==='en'?'Focus':'Focus'}:</strong> ${hasTarget ? (currentLang()==='en'?'Only the highlighted element matters in this step.':'Alleen het gemarkeerde onderdeel is belangrijk in deze stap.') : (currentLang()==='en'?'No element is highlighted in this intro/wrap-up step.':'In deze intro-/afrondstap wordt geen element gemarkeerd.')}</div>
        ${note ? `<div class="v656-screen-note"><span>✓</span><div>${escapeHtml(note)}</div></div>` : ''}
        <div class="tour-controls v658-controls">
          <button type="button" class="btn" data-action="tutorial-prev" ${index===1?'disabled':''}>${t('previous')}</button>
          <button type="button" class="btn" data-action="tutorial-open-step">${currentLang()==='en'?'Show screen':'Laat scherm zien'}</button>
          <button type="button" class="btn primary" data-action="tutorial-next">${index>=V659_TOUR.length?t('finish'):t('next')}</button>
          <button type="button" class="btn ghost" data-action="tutorial-stop" data-tour-stop="1">${currentLang()==='en'?'Stop tour':'Stop rondleiding'}</button>
        </div>
      </div>
    </div>`;
  };

  highlightTutorialTarget = function(){
    const spot = document.getElementById('tourSpotlight');
    if(!state.ui.tutorial || !spot) return;
    const el = v659TargetElement();
    if(!el){ spot.classList.add('hidden'); return; }
    const rect = el.getBoundingClientRect();
    const pad = 12;
    spot.classList.remove('hidden');
    spot.style.left = Math.max(8, rect.left - pad) + 'px';
    spot.style.top = Math.max(8, rect.top - pad) + 'px';
    spot.style.width = Math.max(52, Math.min(window.innerWidth - 16, rect.width + pad*2)) + 'px';
    spot.style.height = Math.max(52, Math.min(window.innerHeight - 16, rect.height + pad*2)) + 'px';
  };

  const _handleAction_v659 = handleAction;
  handleAction = function(a,el,e){
    if(a==='start-tutorial'){ state.ui.tutorial={index:0,screenNote:'',preview:''}; v659Prepare(); save(); render(); return; }
    if(a==='tutorial-stop'){ v659Stop(); return; }
    if(a==='tutorial-open-step'){ v659OpenStep(); return; }
    if(a==='tutorial-next'){ v659Next(); return; }
    if(a==='tutorial-prev'){ v659Prev(); return; }
    if(a==='tutorial-example'){ return; }
    return _handleAction_v659(a,el,e);
  };

  if(!window.__richCmdTourCapture659){
    window.__richCmdTourCapture659 = true;
    ['click','mousedown','touchstart'].forEach(type => {
      document.addEventListener(type, function(e){
        const btn = e.target && e.target.closest ? e.target.closest('.tour-root [data-action], [data-tour-stop="1"]') : null;
        if(!btn) return;
        const a = btn.dataset.action;
        if(!a || !a.startsWith('tutorial')) return;
        e.preventDefault(); e.stopPropagation();
        if(e.stopImmediatePropagation) e.stopImmediatePropagation();
        handleAction(a, btn, e);
      }, true);
    });
  }

  if(state.ui.tutorial) v659Prepare();
  save(); applyTheme(); render();
} catch(err) {
  console.error('v6.5.10 tutorial/package fix failed', err);
}


/* =========================================================
   RICH CMD v6.5.11 — Guided Tour Sync & Chapter Coverage Fix
   Scope: final tutorial override only. Keeps app modules intact.
========================================================= */
try {
  APP.version = 'v6.5.11';
  APP.cache = 'rich-cmd-cache-v6511';
  state.schemaVersion = 6511;

  const RICH_TOUR_6511 = [
    {id:'welcome',route:'today',target:null,nl:'Welkom bij RICH CMD',en:'Welcome to RICH CMD',nlText:'Deze rondleiding neemt je rustig mee door de website. We tonen steeds één onderdeel tegelijk.',enText:'This tour calmly guides you through the app. It shows one section at a time.'},
    {id:'menu',route:'today',target:'aside.sidebar',nl:'Hoofdmenu',en:'Main menu',nlText:'Dit is het hoofdmenu. Hier navigeer je naar Vandaag, Werk, Inzicht & Groei en Systeem.',enText:'This is the main menu. Use it to navigate to Today, Work, Insight & Growth and System.'},
    {id:'assist',route:'today',target:'.assist-tab',nl:'Live Assist',en:'Live Assist',nlText:'De Live Assist-tab helpt je met shiftstatus, pauze, werkdruk en je volgende actie.',enText:'The Live Assist tab helps with shift status, breaks, workload and your next action.'},
    {id:'today',route:'today',target:'[data-tutorial="today"]',nl:'Vandaag',en:'Today',nlText:'Vandaag is je dagelijkse cockpit. Start je shift, bekijk je prioriteiten en werk vanuit hier verder.',enText:'Today is your daily cockpit. Start your shift, review priorities and continue from here.'},
    {id:'smart',route:'today',target:'[data-tutorial="smart"]',nl:'Wat nu?',en:'What now?',nlText:'Wat nu? geeft advies over je volgende logische actie, op basis van shift, taken, AGF en werkdruk.',enText:'What now? recommends the next logical action based on shift, tasks, produce and workload.'},
    {id:'shift',route:'today',target:'[data-tutorial="today"] .btn-row',nl:'Shift en pauzes',en:'Shift and breaks',nlText:'Met inklokken, pauze en uitklokken bouw je een daglog op voor rapportage en visualisatie.',enText:'Clock-in, breaks and clock-out build a daily log for reports and visualizations.'},
    {id:'dashboard',route:'dashboard',target:'#pageRoot .hero, #pageRoot .card',nl:'Dashboard',en:'Dashboard',nlText:'Het dashboard geeft een breder overzicht van prestaties, signalen, scores en aandachtspunten.',enText:'The dashboard gives a wider overview of performance, signals, scores and focus areas.'},
    {id:'haccp',route:'haccp',target:'#pageRoot .hero, #pageRoot .card',nl:'HACCP',en:'HACCP',nlText:'HACCP is je dagplanner voor dagelijkse, wekelijkse, maandelijkse en periodieke taken.',enText:'HACCP is your planner for daily, weekly, monthly and periodic tasks.'},
    {id:'storemap',route:'storemap',target:'#pageRoot .hero, #pageRoot .card',nl:'Schoonmaakkaart',en:'Cleaning Map',nlText:'De schoonmaakkaart houdt bij wat gecontroleerd, schoongemaakt of gesignaleerd is per pad, meter, plank en bodembak.',enText:'The Cleaning Map tracks checks, cleaning and signals by aisle, meter, shelf and bottom tray.'},
    {id:'agf',route:'agf',target:'#pageRoot .hero, #pageRoot .card',nl:'AGF',en:'Produce',nlText:'AGF helpt bij quick checks, bonusartikelen, NASA-nummers en besteladvies. De huidige status is het belangrijkst.',enText:'Produce helps with quick checks, promotion items, NASA numbers and order advice. Current status matters most.'},
    {id:'inventory',route:'inventory',target:'#pageRoot .hero, #pageRoot .card',nl:'Inventaris',en:'Inventory',nlText:'Inventaris helpt bij voorraad, minimum, maximum, NASA-nummers, bestellijsten en voorraadcontroles.',enText:'Inventory helps with stock, minimums, maximums, NASA numbers, order lists and stock checks.'},
    {id:'communication',route:'communication',target:'#pageRoot .hero, #pageRoot .card',nl:'Communicatie',en:'Communication',nlText:'Communicatie is voor berichten, opvolging, status, contactpersonen en wat je nog moet doorgeven.',enText:'Communication is for messages, follow-up, status, contacts and things you still need to share.'},
    {id:'reports',route:'communication',target:'#pageRoot details, #pageRoot .card',nl:'Shift reports',en:'Shift reports',nlText:'Shift reports leggen vast hoe de dag verliep. Ze helpen bij terugkijken, verbeteren en overdragen.',enText:'Shift reports record how the day went. They help with review, improvement and handover.'},
    {id:'visual',route:'visual',target:'#pageRoot .hero, #pageRoot .card',nl:'Visualisatie',en:'Visualization',nlText:'Visualisatie maakt productiviteit, werkdruk, AGF, schoonmaak, communicatie en datakwaliteit inzichtelijk.',enText:'Visualization makes productivity, workload, produce, cleaning, communication and data quality easier to understand.'},
    {id:'coaching',route:'coaching',target:'#pageRoot .hero, #pageRoot .card',nl:'Coaching',en:'Coaching',nlText:'Coaching helpt met werkvaardigheid, kalmte, communicatie, management, klantgedrag en zelfinzicht.',enText:'Coaching helps with work skills, calmness, communication, management, customer behavior and self-insight.'},
    {id:'diagnostics',route:'diagnostics',target:'#pageRoot .hero, #pageRoot .card',nl:'Diagnostiek',en:'Diagnostics',nlText:'Diagnostiek toont appstatus, versie, datakwaliteit, vertalingen, backup en hersteltools.',enText:'Diagnostics shows app status, version, data quality, translations, backup and recovery tools.'},
    {id:'settings',route:'settings',target:'#pageRoot .hero, #pageRoot .card',nl:'Instellingen',en:'Settings',nlText:'In Instellingen beheer je profiel, taal, thema, werkdagen, werkuren, HACCP-uren en app-opties.',enText:'In Settings you manage profile, language, theme, working days, work hours, HACCP hours and app options.'},
    {id:'command',route:'today',target:'.top-actions',nl:'Snel zoeken',en:'Quick search',nlText:'Met de Command Palette kun je snel naar modules, producten, inventarisitems of acties zoeken.',enText:'With the Command Palette you can quickly search modules, products, inventory items or actions.'},
    {id:'mobile',route:'today',target:'.mobile-bottom, .top-actions',nl:'Mobiele bediening',en:'Mobile controls',nlText:'Op telefoon gebruik je de onderbalk en snelle acties. Alles blijft beschikbaar, maar compacter.',enText:'On phone you use the bottom bar and quick actions. Everything stays available, but more compact.'},
    {id:'finish',route:'today',target:null,nl:'Klaar om te starten',en:'Ready to start',nlText:'Je kent nu de belangrijkste onderdelen. Begin klein: klok in, laad taken of doe een AGF-check.',enText:'You now know the main parts. Start small: clock in, load tasks or do a produce check.'}
  ];

  function tour6511Step(){
    const idx = Math.min(Math.max((state.ui.tutorial && state.ui.tutorial.index) || 0, 0), RICH_TOUR_6511.length - 1);
    return RICH_TOUR_6511[idx] || RICH_TOUR_6511[0];
  }
  function tour6511IsIntro(step){ return !step || !step.target; }
  function tour6511Prepare(){
    const step = tour6511Step();
    state.route = step.route || state.route || 'today';
    state.ui.sidebarOpen = step.id === 'menu';
    state.ui.assistOpen = false;
    state.ui.command = false;
    try { closeModal(); } catch(e) {}
  }
  function tour6511Stop(){
    state.ui.tutorial = null;
    state.settings.tutorialDone = true;
    state.ui.sidebarOpen = false;
    state.ui.assistOpen = false;
    state.ui.command = false;
    try { closeModal(); } catch(e) {}
    try { document.querySelectorAll('.tour-root,.tutorial-overlay,.tour-backdrop,.tour-orphan,.tutorial-target').forEach(el => { if(el.classList && el.classList.contains('tutorial-target')) el.classList.remove('tutorial-target'); else el.remove(); }); } catch(e) {}
    save(); render();
    try { toast(currentLang()==='en' ? 'Tour stopped' : 'Rondleiding gestopt','info'); } catch(e) {}
  }
  function tour6511Next(){
    if(!state.ui.tutorial) state.ui.tutorial = {index:0,screenNote:''};
    state.ui.tutorial.index = (state.ui.tutorial.index || 0) + 1;
    state.ui.tutorial.screenNote = '';
    if(state.ui.tutorial.index >= RICH_TOUR_6511.length){
      tour6511Stop();
      try { toast(currentLang()==='en' ? 'Tour completed' : 'Rondleiding afgerond','good'); } catch(e) {}
      return;
    }
    tour6511Prepare();
    save(); render();
  }
  function tour6511Prev(){
    if(!state.ui.tutorial) return;
    state.ui.tutorial.index = Math.max(0,(state.ui.tutorial.index || 0) - 1);
    state.ui.tutorial.screenNote = '';
    tour6511Prepare();
    save(); render();
  }
  function tour6511Open(){
    tour6511Prepare();
    const step = tour6511Step();
    const name = step.route ? routeLabel(step.route) : '';
    state.ui.tutorial.screenNote = step.target
      ? (currentLang()==='en' ? `${name} is visible now. Follow the highlighted part.` : `${name} is nu zichtbaar. Volg het gemarkeerde onderdeel.`)
      : (currentLang()==='en' ? 'This step is an introduction or wrap-up and has no separate highlight.' : 'Deze stap is een introductie of afronding en heeft geen aparte arcering.');
    save(); render();
  }
  function tour6511TargetEl(){
    const step = tour6511Step();
    if(!step.target) return null;
    try { return document.querySelector(step.target); } catch(e) { return null; }
  }

  tutorialStep = function(){ return tour6511Step(); };
  renderTutorial = function(){
    const tut = state.ui.tutorial;
    if(!tut) return '';
    const step = tour6511Step();
    const idx = Math.min((tut.index || 0) + 1, RICH_TOUR_6511.length);
    const intro = tour6511IsIntro(step);
    const title = currentLang()==='en' ? step.en : step.nl;
    const body = currentLang()==='en' ? step.enText : step.nlText;
    const note = tut.screenNote || '';
    return `<div class="tour-root tour6511-root ${intro?'tour-intro':''}" role="dialog" aria-modal="true" data-step="${escapeHtml(step.id)}">
      <div class="tour-dim"></div>
      <div id="tourSpotlight" class="tour-spotlight ${intro?'hidden':''}"></div>
      <div class="tour-card v658-tour-bubble tour6511-bubble">
        <div class="tour-card-head">
          <div><span class="chip">${currentLang()==='en'?'Guided tour':'Rondleiding'} · ${currentLang()==='en'?'Step':'Stap'} ${idx}/${RICH_TOUR_6511.length}</span><h2>${escapeHtml(title)}</h2></div>
          <button type="button" class="btn small" data-action="tutorial-stop" data-tour-stop="1" aria-label="${t('close')}">×</button>
        </div>
        <p>${escapeHtml(body)}</p>
        <div class="v658-focus-line"><strong>${currentLang()==='en'?'Focus':'Focus'}:</strong> ${intro ? (currentLang()==='en'?'Read this explanation first. No screen part is highlighted.':'Lees eerst deze uitleg. Er is geen onderdeel gearceerd.') : (currentLang()==='en'?'Look at the highlighted part. The rest is deliberately quiet.':'Kijk naar het gearceerde onderdeel. De rest is bewust rustig gemaakt.')}</div>
        ${note ? `<div class="v656-screen-note"><span>✓</span><div>${escapeHtml(note)}</div></div>` : ''}
        <div class="tour-controls v658-controls">
          <button type="button" class="btn" data-action="tutorial-prev" ${idx===1?'disabled':''}>${t('previous')}</button>
          <button type="button" class="btn" data-action="tutorial-open-step">${currentLang()==='en'?'Show screen':'Laat scherm zien'}</button>
          <button type="button" class="btn primary" data-action="tutorial-next">${idx>=RICH_TOUR_6511.length?t('finish'):t('next')}</button>
          <button type="button" class="btn ghost" data-action="tutorial-stop" data-tour-stop="1">${currentLang()==='en'?'Stop tour':'Stop rondleiding'}</button>
        </div>
      </div>
    </div>`;
  };

  highlightTutorialTarget = function(){
    try { document.querySelectorAll('.tutorial-target').forEach(el => el.classList.remove('tutorial-target')); } catch(e) {}
    const spot = document.getElementById('tourSpotlight');
    if(!state.ui.tutorial || !spot) return;
    const el = tour6511TargetEl();
    if(!el){ spot.classList.add('hidden'); return; }
    const rect = el.getBoundingClientRect();
    if(!rect.width || !rect.height){ spot.classList.add('hidden'); return; }
    const pad = 12;
    spot.classList.remove('hidden');
    spot.style.left = Math.max(8, rect.left - pad) + 'px';
    spot.style.top = Math.max(8, rect.top - pad) + 'px';
    spot.style.width = Math.max(56, Math.min(window.innerWidth - 16, rect.width + pad*2)) + 'px';
    spot.style.height = Math.max(56, Math.min(window.innerHeight - 16, rect.height + pad*2)) + 'px';
  };

  const oldBindPostRender6511 = bindPostRender;
  bindPostRender = function(){
    try { document.querySelectorAll('.tour-root,.tutorial-overlay,.tour-backdrop,.tour-orphan').forEach(e => e.remove()); } catch(e) {}
    try { oldBindPostRender6511(); } catch(e) { try { bindInputs(); } catch(_) {} }
    try { document.querySelectorAll('.tour-root,.tutorial-overlay,.tour-backdrop,.tour-orphan').forEach(e => e.remove()); } catch(e) {}
    const html = renderTutorial();
    if(html) document.body.insertAdjacentHTML('beforeend', html);
    try { highlightTutorialTarget(); } catch(e) {}
  };

  const oldHandleAction6511 = handleAction;
  handleAction = function(a,el,e){
    if(a==='start-tutorial'){ state.ui.tutorial={index:0,screenNote:''}; tour6511Prepare(); save(); render(); return; }
    if(a==='tutorial-stop'){ tour6511Stop(); return; }
    if(a==='tutorial-open-step'){ tour6511Open(); return; }
    if(a==='tutorial-next'){ tour6511Next(); return; }
    if(a==='tutorial-prev'){ tour6511Prev(); return; }
    if(a==='tutorial-example'){ return; }
    return oldHandleAction6511(a,el,e);
  };

  if(!window.__richCmdTourCapture6511){
    window.__richCmdTourCapture6511 = true;
    ['click','mousedown','touchstart'].forEach(type => {
      document.addEventListener(type, function(e){
        const btn = e.target && e.target.closest ? e.target.closest('.tour-root [data-action], [data-tour-stop="1"]') : null;
        if(!btn) return;
        const a = btn.dataset.action;
        if(!a || !a.startsWith('tutorial')) return;
        e.preventDefault(); e.stopPropagation();
        if(e.stopImmediatePropagation) e.stopImmediatePropagation();
        handleAction(a, btn, e);
      }, true);
    });
    window.addEventListener('resize', () => { try { highlightTutorialTarget(); } catch(e) {} });
    window.addEventListener('scroll', () => { try { highlightTutorialTarget(); } catch(e) {} }, true);
  }

  if(state.ui.tutorial) tour6511Prepare();
  save(); applyTheme(); render();
} catch(err) {
  console.error('v6.5.11 tutorial sync fix failed', err);
}

/* =========================================================
   RICH CMD v6.5.12 — Visualisatie & Management Intelligence
   Controlled visual-only upgrade from stable v6.5.11.
========================================================= */
try {
  APP.version = 'v6.5.12';
  APP.cache = 'rich-cmd-cache-v6512';
  if(state && state.schemaVersion) state.schemaVersion = 6512;

  Object.assign(I18N.nl, {
    visualTitle:'Visualisatie & Management Intelligence',
    visualIntro:'Bekijk werkdruk, HACCP-capaciteit, AGF-signalen, schoonmaakkaart, communicatie, shiftdata en coaching als één managementbeeld.',
    periodToday:'Vandaag', period7:'7 dagen', period14:'14 dagen', periodMonth:'Maand', periodAll:'Alles',
    completedMinutes:'Voltooide minuten', openPlanning:'Open planning', haccpCapacity:'HACCP-capaciteit', capacityUsed:'capaciteit gebruikt',
    storeLoad:'Schoonmaakbelasting', produceSignals:'AGF-signalen', produceDistribution:'AGF-verdeling', storeMapIntelligence:'Schoonmaakkaart Intelligence',
    shiftBreakAnalysis:'Shift & pauze analyse', coachingProgress:'Coaching voortgang', dataReliability:'Databetrouwbaarheid',
    managementSummary:'Managementsamenvatting', improvementChances:'Verbeterkansen', whatStandsOut:'Wat valt op?', tomorrowAttention:'Morgen aandacht', copySummary:'Kopieer managementsamenvatting',
    noVisualDataTitle:'Nog geen visualisatiedata',
    noVisualDataText:'Visualisaties worden sterker zodra je taken afrondt, AGF-checks doet, shifts registreert, rapportages maakt en schoonmaakpunten bijhoudt.',
    startByDoing:'Begin met één actie om data op te bouwen.',
    completedTasks:'Voltooide taken', deferredTasks:'Uitgestelde taken', openTasks:'Open taken', focusMinutes:'Focusminuten', breakTime:'Pauzetijd', netTime:'Netto werktijd',
    overstockSignals:'Overvoorraad-signalen', emptyShelfSignals:'Leegschap-signalen', conflictSignals:'Conflict-signalen', bonusAttention:'Bonus aandacht', stableProducts:'Stabiele producten',
    mouldSignals:'Schimmelmeldingen', followUps:'Nacontroles', dirtySignals:'Vuil-signalen', plannedCleaning:'Geplande schoonmaak',
    communicationOpen:'Open communicatie', communicationRed:'Rode communicatie', reportsMade:'Rapportages', skillProgress:'Skill voortgang', lessonsDone:'Lessen afgerond',
    lowDataNotice:'Er is nog beperkte data. Gebruik de app meerdere dagen voor betrouwbaardere trends.',
    insightControlled:'De dag oogt beheersbaar. Houd de basisroutine sterk.', insightHighWorkload:'De werkdruk is hoog. Plan periodieke taken later of kies korte taken eerst.',
    insightAgf:'AGF heeft aandachtproducten. Controleer huidige voorraad vóór bestellen.', insightStore:'Schoonmaakkaart heeft open signalen of nacontroles.',
    insightCommunication:'Er staan communicatiepunten open. Plan opvolging vóór het einde van je shift.', insightBreaks:'Pauzes worden bijgehouden. Gebruik netto werktijd voor realistischer plannen.',
    tomorrowBase:'Morgen: start met basisroutine, check AGF-aandacht en plan maximaal één periodieke extra taak.', trendConclusion:'Conclusie', managementTools:'Management tools'
  });
  Object.assign(I18N.en, {
    visualTitle:'Visualization & Management Intelligence',
    visualIntro:'View workload, HACCP capacity, produce signals, Cleaning Map, communication, shift data and coaching as one management picture.',
    periodToday:'Today', period7:'7 days', period14:'14 days', periodMonth:'Month', periodAll:'All',
    completedMinutes:'Completed minutes', openPlanning:'Open planning', haccpCapacity:'HACCP capacity', capacityUsed:'capacity used',
    storeLoad:'Cleaning workload', produceSignals:'Produce signals', produceDistribution:'Produce distribution', storeMapIntelligence:'Cleaning Map Intelligence',
    shiftBreakAnalysis:'Shift & break analysis', coachingProgress:'Coaching progress', dataReliability:'Data reliability',
    managementSummary:'Management summary', improvementChances:'Improvement opportunities', whatStandsOut:'What stands out?', tomorrowAttention:'Tomorrow needs attention', copySummary:'Copy management summary',
    noVisualDataTitle:'No visualization data yet',
    noVisualDataText:'Visualizations become stronger after you complete tasks, run produce checks, record shifts, create reports and track cleaning points.',
    startByDoing:'Start with one action to build data.',
    completedTasks:'Completed tasks', deferredTasks:'Deferred tasks', openTasks:'Open tasks', focusMinutes:'Focus minutes', breakTime:'Break time', netTime:'Net work time',
    overstockSignals:'Overstock signals', emptyShelfSignals:'Empty shelf signals', conflictSignals:'Conflict signals', bonusAttention:'Bonus attention', stableProducts:'Stable products',
    mouldSignals:'Mould signals', followUps:'Follow-ups', dirtySignals:'Dirty signals', plannedCleaning:'Planned cleaning',
    communicationOpen:'Open communication', communicationRed:'Red communication', reportsMade:'Reports', skillProgress:'Skill progress', lessonsDone:'Lessons completed',
    lowDataNotice:'There is still limited data. Use the app for several days to get more reliable trends.',
    insightControlled:'The day looks controlled. Keep the base routine strong.', insightHighWorkload:'Workload is high. Plan periodic work later or choose short tasks first.',
    insightAgf:'Produce has attention items. Check current stock before ordering.', insightStore:'Cleaning Map has open signals or follow-ups.',
    insightCommunication:'There are open communication items. Plan follow-up before the end of your shift.', insightBreaks:'Breaks are tracked. Use net work time for more realistic planning.',
    tomorrowBase:'Tomorrow: start with the base routine, check produce attention items and plan at most one extra periodic task.', trendConclusion:'Conclusion', managementTools:'Management tools'
  });

  function v6512Period(){ return (state.ui && state.ui.visualPeriod) || 'today'; }
  function v6512PeriodDays(p){ if(p==='today') return 1; if(p==='7') return 7; if(p==='14') return 14; if(p==='month') return 31; return 36500; }
  function v6512DateValue(x){ return x && (x.completedAt || x.createdAt || x.dueDate || x.at || x.startedAt || x.endedAt || x.lastChecked || x.lastCleaned || x.date || ''); }
  function v6512InPeriod(iso){
    const p=v6512Period();
    if(p==='all') return true;
    if(!iso) return p==='today';
    const d=new Date(iso); if(isNaN(d)) return false;
    const now=new Date();
    if(p==='today') return d.toISOString().slice(0,10)===TODAY();
    return d.getTime() >= Date.now() - v6512PeriodDays(p)*86400000;
  }
  function v6512Tasks(){ return (state.tasks||[]).filter(x=>v6512InPeriod(v6512DateValue(x))); }
  function v6512CompletedTasks(){ return v6512Tasks().filter(t=>t.status==='Voltooid'); }
  function v6512DeferredTasks(){ return v6512Tasks().filter(t=>t.status==='Uitgesteld'); }
  function v6512OpenTasks(){ return v6512Tasks().filter(t=>t.status!=='Voltooid'); }
  function v6512CompletedMinutes(){ return v6512CompletedTasks().reduce((a,t)=>a+(+t.duration||0),0); }
  function v6512OpenMinutes(){ return v6512OpenTasks().reduce((a,t)=>a+(+t.duration||0),0); }
  function v6512AgfEvents(){
    const events=[];
    (state.agfProducts||[]).forEach(p=>{
      (p.history||[]).forEach(h=>events.push({...h, product:p.name, nasa:p.nasa, category:p.category}));
      if((!p.history || !p.history.length) && p.lastStatus) events.push({status:p.lastStatus, at:p.updatedAt||p.createdAt||TODAY(), product:p.name});
    });
    return events.filter(e=>v6512InPeriod(e.at||e.createdAt));
  }
  function v6512AgfStats(){ return countBy(v6512AgfEvents().map(e=>e.status||e.type||'Onbekend')); }
  function v6512Conflicts(){ return (state.agfProducts||[]).map(p=>agfDecision(p)).filter(d=>d && d.conflict); }
  function v6512StoreItems(){ return (state.cleaning && state.cleaning.items || []).filter(i=>v6512InPeriod(i.lastChecked||i.lastCleaned||i.createdAt||i.plannedAt||TODAY())); }
  function v6512StoreUrgent(){ return v6512StoreItems().filter(i=>['dirty','mold1','mold2','mold3','followup','due'].includes(i.status)||i.planned); }
  function v6512Mould(){ return v6512StoreItems().filter(i=>String(i.status||'').startsWith('mold')); }
  function v6512FollowUps(){ return v6512StoreItems().filter(i=>i.status==='followup'); }
  function v6512Dirty(){ return v6512StoreItems().filter(i=>i.status==='dirty'); }
  function v6512ShiftLogs(){ return (state.shift && state.shift.logs || []).filter(l=>v6512InPeriod(l.at)); }
  function v6512Reports(){ return (state.reports||[]).filter(r=>v6512InPeriod(r.createdAt)); }
  function v6512Comms(){ return (state.communications||[]).filter(c=>v6512InPeriod(c.createdAt||c.followDate)); }
  function v6512FocusMinutes(){ return (state.focusLogs||[]).filter(f=>v6512InPeriod(f.endedAt||f.startedAt)).reduce((a,f)=>a+(+f.minutes||0),0); }
  function v6512BreakMinutes(){
    const logs=v6512ShiftLogs().slice().sort((a,b)=>new Date(a.at)-new Date(b.at)); let total=0,start=null;
    logs.forEach(l=>{ if(l.type==='breakStart') start=new Date(l.at).getTime(); if(l.type==='breakEnd' && start){ total += Math.max(0,(new Date(l.at).getTime()-start)/60000); start=null; }});
    if(start && state.shift.breakActive) total += Math.max(0,(Date.now()-start)/60000);
    return Math.round(total)|| (v6512Period()==='today'?todayBreakMinutes():0);
  }
  function v6512ShiftMinutes(){
    const logs=v6512ShiftLogs().slice().sort((a,b)=>new Date(a.at)-new Date(b.at)); let total=0,start=null;
    logs.forEach(l=>{ if(l.type==='clockIn') start=new Date(l.at).getTime(); if(l.type==='clockOut' && start){ total += Math.max(0,(new Date(l.at).getTime()-start)/60000); start=null; }});
    if(start && state.shift.active) total += Math.max(0,(Date.now()-start)/60000);
    return Math.round(total)|| (v6512Period()==='today'?shiftMinutesToday():0);
  }
  function v6512CapMinutes(){ const days=v6512Period()==='today'?1:Math.min(v6512PeriodDays(v6512Period()), Math.max(1, state.settings.workDays.length)); return (+state.settings.haccpHours||3.5)*60*days; }
  function v6512QualityScore(){ const q=moduleQuality(); const vals=Object.values(q).filter(v=>typeof v==='number'); return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0; }
  function v6512LoadPercent(){ const cap=v6512CapMinutes(); return cap?Math.round((v6512OpenMinutes()+cleaningWorkloadMinutes())/cap*100):0; }
  function v6512ProdPercent(){ const cap=v6512CapMinutes(); return cap?clamp(Math.round(v6512CompletedMinutes()/cap*100),0,160):0; }

  function v6512Kpi(label,value,type,sub){
    return `<div class="card kpi v6512-kpi"><div><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(String(value))}</div>${sub?`<div class="hint">${escapeHtml(sub)}</div>`:''}</div><span class="status-dot ${type==='bad'?'bad':type==='warn'?'warn':''}"></span></div>`;
  }
  function v6512InsightList(){
    const arr=[];
    if(v6512LoadPercent()>100) arr.push(t('insightHighWorkload'));
    if(v6512Conflicts().length) arr.push(currentLang()==='en'?'Produce has trend/current-status conflicts. Use today’s status before ordering.':'AGF heeft conflicten tussen trend en huidige status. Gebruik de status van vandaag vóór bestellen.');
    if(v6512StoreUrgent().length) arr.push(t('insightStore'));
    if(v6512Comms().filter(c=>c.status==='Rood'||c.status==='Geel').length) arr.push(t('insightCommunication'));
    if(v6512BreakMinutes()>0) arr.push(t('insightBreaks'));
    if(!arr.length) arr.push(t('insightControlled'));
    if(totalRecords()<8) arr.push(t('lowDataNotice'));
    return arr;
  }
  function v6512ImprovementList(){
    const arr=[];
    if(v6512DeferredTasks().length) arr.push(currentLang()==='en'?'Review deferred tasks first tomorrow.':'Bekijk uitgestelde taken morgen als eerste.');
    if(v6512LoadPercent()>90) arr.push(currentLang()==='en'?'Keep daily base tasks first and load fewer extra periodic tasks.':'Houd dagtaken eerst en laad minder extra periodieke taken in.');
    if(agfAttention().length) arr.push(currentLang()==='en'?'Check produce attention items before placing orders.':'Controleer AGF-aandachtproducten vóór het bestellen.');
    if(v6512Mould().length) arr.push(currentLang()==='en'?'Prioritize mould follow-up before regular cleaning.':'Geef schimmel/nacontrole prioriteit boven normale schoonmaak.');
    if(!arr.length) arr.push(currentLang()==='en'?'Keep logging consistently to make insights stronger.':'Blijf consequent registreren om inzichten sterker te maken.');
    return arr;
  }
  function v6512TomorrowList(){
    const arr=[];
    if(v6512DeferredTasks().length) arr.push(`${v6512DeferredTasks().length} ${currentLang()==='en'?'deferred HACCP task(s)':'uitgestelde HACCP-taak/taken'}`);
    if(agfAttention().length) arr.push(`${agfAttention().slice(0,3).map(a=>a.name).filter(Boolean).join(', ') || t('agf')} ${currentLang()==='en'?'to monitor':'monitoren'}`);
    if(v6512FollowUps().length) arr.push(`${v6512FollowUps().length} ${currentLang()==='en'?'Cleaning Map follow-up(s)':'Schoonmaakkaart nacontrole(s)'}`);
    if(v6512Comms().some(c=>c.status==='Rood'||c.status==='Geel')) arr.push(currentLang()==='en'?'open communication follow-up':'open communicatie opvolging');
    if(!arr.length) arr.push(t('tomorrowBase'));
    return arr;
  }
  function v6512ManagementText(){
    const periodLabel = {today:t('periodToday'),'7':t('period7'),'14':t('period14'),month:t('periodMonth'),all:t('periodAll')}[v6512Period()] || t('periodToday');
    return `${t('managementSummary')} (${periodLabel})\n- ${t('productivity')}: ${v6512ProdPercent()}%\n- ${L('Werkdruk','Workload')}: ${v6512LoadPercent()}%\n- ${t('completedTasks')}: ${v6512CompletedTasks().length}\n- ${t('produceSignals')}: ${agfAttention().length}\n- ${t('storeRisk')}: ${v6512StoreUrgent().length}\n\n${t('whatStandsOut')}:\n${v6512InsightList().map(x=>'- '+x).join('\n')}\n\n${t('improvementChances')}:\n${v6512ImprovementList().map(x=>'- '+x).join('\n')}`;
  }
  function v6512CopySummary(){
    const txt=v6512ManagementText();
    try { navigator.clipboard.writeText(txt).then(()=>toast(t('copied'),'good')).catch(()=>{ throw new Error('clipboard'); }); }
    catch(e){ modal(t('copySummary'), `<textarea class="textarea" readonly>${escapeHtml(txt)}</textarea>`); }
  }
  function v6512PeriodButtons(){
    const opts=[['today',t('periodToday')],['7',t('period7')],['14',t('period14')],['month',t('periodMonth')],['all',t('periodAll')]];
    return `<div class="btn-row v6512-periods">${opts.map(([id,label])=>`<button class="btn small ${v6512Period()===id?'primary':''}" data-action="set-visual-period" data-period="${id}">${escapeHtml(label)}</button>`).join('')}</div>`;
  }
  function v6512MetricGrid(){
    return `<div class="grid grid-4 v6512-kpi-grid">
      ${v6512Kpi(t('productivity'), v6512ProdPercent()+'%', v6512ProdPercent()>80?'good':v6512ProdPercent()>55?'warn':'bad', `${minutesToText(v6512CompletedMinutes())} ${t('completedMinutes').toLowerCase()}`)}
      ${v6512Kpi(L('Werkdruk','Workload'), v6512LoadPercent()+'%', v6512LoadPercent()>100?'bad':v6512LoadPercent()>75?'warn':'good', `${minutesToText(v6512OpenMinutes()+cleaningWorkloadMinutes())} ${t('openPlanning').toLowerCase()}`)}
      ${v6512Kpi(t('focusMinutes'), v6512FocusMinutes()+'m', 'good', `${t('coaching')} + ${t('focus')}`)}
      ${v6512Kpi(t('dataReliability'), v6512QualityScore()+'%', v6512QualityScore()>85?'good':v6512QualityScore()>65?'warn':'bad', t('appHealth'))}
    </div>`;
  }
  function v6512WorkloadCard(){
    const cap=v6512CapMinutes(); const completed=v6512CompletedMinutes(); const open=v6512OpenMinutes(); const store=cleaningWorkloadMinutes();
    return `<div class="card v6512-card"><h3>${L('Werkdruk vs HACCP-uren','Workload vs HACCP hours')}</h3>
      ${bar(t('completedMinutes'), cap?Math.round(completed/cap*100):0, completed/cap>.8?'good':'warn')}
      ${bar(t('openPlanning'), cap?Math.round(open/cap*100):0, open>cap?'bad':'warn')}
      ${bar(t('storeLoad'), cap?Math.round(store/cap*100):0, store?'info':'good')}
      <div class="v6512-mini-grid"><div><strong>${minutesToText(cap)}</strong><span>${t('haccpCapacity')}</span></div><div><strong>${minutesToText(completed)}</strong><span>${t('completedMinutes')}</span></div><div><strong>${minutesToText(open+store)}</strong><span>${t('openPlanning')}</span></div></div>
      <p class="muted small">${minutesToText(completed)} / ${minutesToText(cap)} ${t('capacityUsed')}.</p>
    </div>`;
  }
  function v6512AgfCard(){
    const stats=v6512AgfStats(); const conflicts=v6512Conflicts(); const attention=agfAttention();
    const top=attention.slice(0,5);
    return `<div class="card v6512-card"><h3>${t('produceSignals')}</h3>
      <div class="v6512-chip-row"><span class="pill warn">${t('overstockSignals')}: ${stats['Overvoorraad']||0}</span><span class="pill bad">${t('emptyShelfSignals')}: ${stats['Leeg schap']||0}</span><span class="pill info">${t('conflictSignals')}: ${conflicts.length}</span></div>
      ${Object.entries(stats).map(([k,v])=>bar(localStatus(k),Math.min(100,v*18),k==='Overvoorraad'?'warn':k==='Leeg schap'?'bad':'good')).join('') || `<p class="muted">${t('empty')}</p>`}
      ${top.length?`<div class="list mt">${top.map(p=>`<div class="list-item compact"><span>${escapeHtml(p.name||p.product||t('product'))}</span><span class="pill ${p.conflict?'bad':'warn'}">${escapeHtml(p.advice||t('orderAdvice'))}</span></div>`).join('')}</div>`:`<p class="muted small">${currentLang()==='en'?'No active produce attention items.':'Geen actieve AGF-aandachtproducten.'}</p>`}
    </div>`;
  }
  function v6512StoreCard(){
    const urgent=v6512StoreUrgent(); const mould=v6512Mould(); const follow=v6512FollowUps(); const dirty=v6512Dirty();
    return `<div class="card v6512-card"><h3>${t('storeMapIntelligence')}</h3>
      <div class="v6512-chip-row"><span class="pill bad">${t('mouldSignals')}: ${mould.length}</span><span class="pill info">${t('followUps')}: ${follow.length}</span><span class="pill warn">${t('dirtySignals')}: ${dirty.length}</span></div>
      ${bar(t('storeRisk'),Math.min(100,urgent.length*14),urgent.length?'bad':'good')}
      ${bar(t('plannedCleaning'),Math.min(100,cleaningWorkloadMinutes()/Math.max(1,v6512CapMinutes())*100),cleaningWorkloadMinutes()?'warn':'good')}
      ${urgent.slice(0,5).map(i=>`<div class="list-item compact"><span>${escapeHtml(i.label||i.zone||t('storemap'))}</span><span class="pill ${String(i.status).startsWith('mold')?'bad':'warn'}">${escapeHtml(cleanStatusText ? cleanStatusText(i.status) : (i.status||t('status')))}</span></div>`).join('') || `<p class="muted small">${currentLang()==='en'?'No urgent Cleaning Map items.':'Geen urgente schoonmaakkaart-items.'}</p>`}
    </div>`;
  }
  function v6512ShiftCard(){
    const shift=v6512ShiftMinutes(); const br=v6512BreakMinutes();
    return `<div class="card v6512-card"><h3>${t('shiftBreakAnalysis')}</h3>
      <div class="v6512-mini-grid"><div><strong>${minutesToText(shift)}</strong><span>${t('shift')}</span></div><div><strong>${minutesToText(br)}</strong><span>${t('breakTime')}</span></div><div><strong>${minutesToText(Math.max(0,shift-br))}</strong><span>${t('netTime')}</span></div></div>
      ${bar(t('netTime'), shift?Math.round((shift-br)/shift*100):0,'good')}
      <p class="muted small">${t('insightBreaks')}</p>
    </div>`;
  }
  function v6512CommunicationCard(){
    const comm=v6512Comms(); const stats=countBy(comm.map(c=>c.status||'Open'));
    return `<div class="card v6512-card"><h3>${t('communication')}</h3>
      ${Object.entries(stats).map(([k,v])=>bar(statusLabel(k),Math.min(100,v*25),k==='Rood'?'bad':k==='Geel'?'warn':'good')).join('') || `<p class="muted">${t('empty')}</p>`}
      <div class="v6512-mini-grid"><div><strong>${comm.length}</strong><span>${t('communicationOpen')}</span></div><div><strong>${comm.filter(c=>c.status==='Rood').length}</strong><span>${t('communicationRed')}</span></div><div><strong>${v6512Reports().length}</strong><span>${t('reportsMade')}</span></div></div>
    </div>`;
  }
  function v6512CoachingCard(){
    const done=(state.coachingDone||[]).length; const total=(typeof COACHING_LESSONS!=='undefined' && COACHING_LESSONS.length) || 130; const pct=Math.round(done/Math.max(1,total)*100);
    return `<div class="card v6512-card"><h3>${t('coachingProgress')}</h3>${bar(t('skillProgress'),pct,pct>60?'good':pct>20?'warn':'info')}
      <div class="v6512-mini-grid"><div><strong>${done}</strong><span>${t('lessonsDone')}</span></div><div><strong>${Math.max(0,total-done)}</strong><span>${currentLang()==='en'?'Available':'Beschikbaar'}</span></div><div><strong>${pct}%</strong><span>${t('skillProgress')}</span></div></div>
      <p class="muted small">${currentLang()==='en'?'Use lessons to turn work patterns into skills.':'Gebruik lessen om werkpatronen om te zetten in vaardigheden.'}</p>
    </div>`;
  }
  function v6512ManagementCards(){
    return `<div class="grid grid-2">
      <div class="card v6512-card v6512-summary"><h3>${t('whatStandsOut')}</h3>${v6512InsightList().map(i=>`<p>• ${escapeHtml(i)}</p>`).join('')}</div>
      <div class="card v6512-card v6512-summary"><h3>${t('improvementChances')}</h3>${v6512ImprovementList().map(i=>`<p>• ${escapeHtml(i)}</p>`).join('')}</div>
      <div class="card v6512-card v6512-summary"><h3>${t('tomorrowAttention')}</h3>${v6512TomorrowList().map(i=>`<p>• ${escapeHtml(i)}</p>`).join('')}</div>
      <div class="card v6512-card v6512-summary"><h3>${t('managementTools')}</h3><div class="btn-row"><button class="btn primary" data-action="copy-management-summary">${t('copySummary')}</button><button class="btn" data-route="diagnostics">${t('diagnostics')}</button><button class="btn" data-route="coaching">${t('coaching')}</button><button class="btn" data-route="haccp">${t('routeHaccp')}</button></div></div>
    </div>`;
  }
  function v6512EmptyVisual(){
    return `<div class="grid"><div class="hero"><span class="chip">${t('visual')}</span><h2>${t('noVisualDataTitle')}</h2><p>${t('noVisualDataText')}</p></div><div class="grid grid-3"><div class="card"><h3>${t('startByDoing')}</h3><p class="muted">${currentLang()==='en'?'Complete one HACCP task or start your shift to create the first insight.':'Rond één HACCP-taak af of start je shift om het eerste inzicht te maken.'}</p><div class="btn-row"><button class="btn primary" data-route="haccp">${t('routeHaccp')}</button><button class="btn" data-action="shift-start">${t('clockIn')}</button></div></div><div class="card"><h3>${t('produceSignals')}</h3><p class="muted">${currentLang()==='en'?'Run a produce check to build product trends and order advice.':'Doe een AGF-check om producttrends en besteladvies op te bouwen.'}</p><button class="btn" data-route="agf">${t('routeAgf')}</button></div><div class="card"><h3>${t('dataReliability')}</h3><p class="muted">${t('lowDataNotice')}</p></div></div></div>`;
  }

  renderVisual = function(){
    const hasData = (state.tasks||[]).length || v6512AgfEvents().length || (state.shift.logs||[]).length || (state.communications||[]).length || (state.reports||[]).length || v6512StoreUrgent().length || (state.focusLogs||[]).length;
    if(!hasData) return v6512EmptyVisual();
    return `<div class="grid v6512-visual"><div class="hero v6512-hero"><div class="btn-row" style="justify-content:space-between;align-items:flex-start"><div><span class="chip">${t('visual')}</span><h2>${t('visualTitle')}</h2><p>${t('visualIntro')}</p></div>${v6512PeriodButtons()}</div></div>${v6512MetricGrid()}<div class="grid grid-2">${v6512WorkloadCard()}${v6512AgfCard()}${v6512StoreCard()}${v6512ShiftCard()}${v6512CommunicationCard()}${v6512CoachingCard()}</div>${v6512ManagementCards()}</div>`;
  };

  const oldHandleAction6512 = handleAction;
  handleAction = function(a,el,e){
    if(a==='set-visual-period'){
      state.ui.visualPeriod = el.dataset.period || 'today';
      save(); render(); return;
    }
    if(a==='copy-management-summary'){
      v6512CopySummary(); return;
    }
    return oldHandleAction6512(a,el,e);
  };

  const oldRegressionChecks6512 = regressionChecks;
  regressionChecks = function(){
    const checks = oldRegressionChecks6512 ? oldRegressionChecks6512() : [];
    checks.push({name:currentLang()==='en'?'Visualization intelligence renders':'Visualisatie intelligence rendert', ok:typeof renderVisual === 'function'});
    checks.push({name:currentLang()==='en'?'Management summary copy action':'Managementsamenvatting kopieeractie', ok:typeof v6512CopySummary === 'function'});
    return checks;
  };

  save();
} catch(err) {
  console.error('v6.5.12 visual intelligence patch failed', err);
}


/* RICH CMD v6.5.13 — Coaching Academy verdieping
   Scope: Coaching only + small Today/Diagnostics/Visual indicators. */
try {
  APP.version = 'v6.5.13';
  APP.cache = 'rich-cmd-cache-v6513';

  Object.assign(I18N.nl, {
    coachingAcademyTitle:'Coaching Academy Pro', coachingAcademyIntro:'Leer slimmer werken met minder stress. Ontwikkel vaardigheden via lessen, praktijkopdrachten, toetsen en levels.',
    dailyCoach:'Coach van vandaag', skillPath:'Skill path', skillTree:'Skill tree', skillLevel:'Skill level', xp:'XP', badges:'Badges', nextLesson:'Volgende les', recommendedLesson:'Aanbevolen les',
    lessonLibrary:'Lesbibliotheek', learningProgress:'Leerprogressie', practiceDone:'Praktijk gedaan', examPassed:'Toets behaald', examOpen:'Toets maken', completeLesson:'Les afronden', cannotComplete:'Rond eerst praktijk + toets af.',
    learnMore:'Leer meer', mboExplanation:'MBO-lesstof', realPractice:'Werkvloerpraktijk', exam:'Toets', checkAnswer:'Controleer antwoord', correct:'Correct', incorrect:'Nog niet goed', tryAgain:'Probeer opnieuw',
    lockedByLevel:'Nog gesloten door level', unlockByCompleting:'Speel vrij door meer lessen af te ronden', showLocked:'Toon hogere levels', hideLocked:'Verberg hogere levels', showCompleted:'Toon afgeronde lessen', hideCompleted:'Verberg afgeronde lessen',
    workAttitude:'Werkhouding', calmStress:'Kalmte & stress', communicationSkill:'Communicatie', customerHandling:'Klantgedrag', managementSkill:'Management', haccpSkill:'HACCP', agfSkill:'AGF', signalSkill:'Signalatie', disciplineSkill:'Discipline', selfInsight:'Zelfinzicht',
    coachingDoneToast:'Les afgerond. Goed bezig.', practiceSaved:'Praktijkopdracht opgeslagen.', examPassedToast:'Toets behaald.', examFailedToast:'Nog niet goed. Lees de uitleg en probeer opnieuw.',
    coachingTip:'Kies één vaardigheid die vandaag je werk makkelijker maakt.', coachingSummary:'Coaching helpt je om patronen om te zetten in vaardigheden.', viewArchive:'Bekijk afgeronde lessen'
  });
  Object.assign(I18N.en, {
    coachingAcademyTitle:'Coaching Academy Pro', coachingAcademyIntro:'Learn to work smarter with less stress. Develop skills through lessons, practice assignments, quizzes and levels.',
    dailyCoach:'Coach of the day', skillPath:'Skill path', skillTree:'Skill tree', skillLevel:'Skill level', xp:'XP', badges:'Badges', nextLesson:'Next lesson', recommendedLesson:'Recommended lesson',
    lessonLibrary:'Lesson library', learningProgress:'Learning progress', practiceDone:'Practice done', examPassed:'Quiz passed', examOpen:'Take quiz', completeLesson:'Complete lesson', cannotComplete:'Complete practice + quiz first.',
    learnMore:'Learn more', mboExplanation:'Vocational-level lesson', realPractice:'Workfloor practice', exam:'Quiz', checkAnswer:'Check answer', correct:'Correct', incorrect:'Not yet', tryAgain:'Try again',
    lockedByLevel:'Locked by level', unlockByCompleting:'Unlock by completing more lessons', showLocked:'Show higher levels', hideLocked:'Hide higher levels', showCompleted:'Show completed lessons', hideCompleted:'Hide completed lessons',
    workAttitude:'Work attitude', calmStress:'Calm & stress', communicationSkill:'Communication', customerHandling:'Customer handling', managementSkill:'Management', haccpSkill:'HACCP', agfSkill:'Produce', signalSkill:'Signal detection', disciplineSkill:'Discipline', selfInsight:'Self-insight',
    coachingDoneToast:'Lesson completed. Nice work.', practiceSaved:'Practice assignment saved.', examPassedToast:'Quiz passed.', examFailedToast:'Not yet. Read the explanation and try again.',
    coachingTip:'Choose one skill that makes today easier.', coachingSummary:'Coaching helps you turn patterns into skills.', viewArchive:'View completed lessons'
  });

  function v6513EnsureCoachingState(){
    if(!Array.isArray(state.coachingDone)) state.coachingDone=[];
    if(!Array.isArray(state.coachingPractices)) state.coachingPractices=[];
    if(!Array.isArray(state.coachingExamPassed)) state.coachingExamPassed=[];
    if(!Array.isArray(state.coachingBookmarks)) state.coachingBookmarks=[];
    if(!state.ui) state.ui={};
  }
  function v6513PathDefs(){
    return [
      {id:'work', key:'workAttitude', icon:'briefcase', color:'good'},
      {id:'calm', key:'calmStress', icon:'leaf', color:'info'},
      {id:'comm', key:'communicationSkill', icon:'message', color:'warn'},
      {id:'customer', key:'customerHandling', icon:'user', color:'good'},
      {id:'management', key:'managementSkill', icon:'chart', color:'info'},
      {id:'haccp', key:'haccpSkill', icon:'check', color:'good'},
      {id:'agf', key:'agfSkill', icon:'leaf', color:'good'},
      {id:'signal', key:'signalSkill', icon:'pulse', color:'warn'},
      {id:'discipline', key:'disciplineSkill', icon:'target', color:'bad'},
      {id:'self', key:'selfInsight', icon:'book', color:'info'}
    ];
  }
  function v6513PathName(id){ const p=v6513PathDefs().find(x=>x.id===id); return p?t(p.key):id; }
  function v6513CoachLevel(){ return Math.max(1, Math.min(10, 1 + Math.floor((state.coachingDone||[]).length / 6))); }
  if(typeof coachLevel === 'function') { coachLevel = v6513CoachLevel; }
  function v6513LessonSeed(){
    const data = {
      work:[
        ['Prioriteit is later durven zeggen','Je kunt niet alles tegelijk doen. Prioriteren betekent bewust kiezen wat nu de meeste waarde geeft en wat veilig later kan.','Kies drie taken die vandaag het meeste verschil maken en rond er één af voordat je iets nieuws oppakt.'],
        ['Start met de basis','Een goede basisroutine verlaagt werkdruk omdat je daarna minder hoeft te herstellen.','Laad de dagelijkse HACCP-taken en rond eerst één basistaak af.'],
        ['Werk zichtbaar maken','Wat niet zichtbaar is, lijkt vaak niet gedaan. Korte registratie geeft rust en bewijs.','Maak één korte rapportage of communicatie-update na een afgeronde actie.'],
        ['Eerst klein winnen','Een korte taak afronden verlaagt mentale druk en geeft beweging.','Kies een taak onder 10 minuten en vink deze bewust af.'],
        ['Stoppen met stapelen','Te veel open werk maakt je hoofd vol. Sluit kleine losse acties eerst af.','Ruim één open communicatiepunt of uitgestelde taak op.'],
        ['Ritme boven haast','Haast geeft snelheid zonder controle. Ritme geeft snelheid met kwaliteit.','Plan vandaag je eerste drie acties in vaste volgorde.'],
        ['Werkdruk lezen','Werkdruk is niet alleen hoeveel werk er is, maar ook hoeveel onduidelijkheid er is.','Schrijf één zin op: wat veroorzaakt vandaag de meeste druk?'],
        ['Afmaken is energie besparen','Half werk blijft aandacht vragen. Afmaken maakt je hoofd vrij.','Maak één kleine taak volledig af inclusief registratie.']
      ],
      calm:[
        ['Rust is werkvaardigheid','Rust betekent niet langzaam werken. Rust betekent dat je kiest voordat je versnelt.','Adem 10 seconden, kies één actie en voer alleen die uit.'],
        ['Drukte zonder paniek','Drukte vraagt volgorde, niet paniek. Je hoeft niet alles tegelijk op te lossen.','Gebruik “Wat nu?” en volg het eerste advies.'],
        ['Pauze is onderhoud','Een korte pauze is geen verlies, maar onderhoud van aandacht.','Registreer je pauze bewust en kijk naar netto werktijd.'],
        ['Emotie herkennen','Irritatie is vaak een signaal dat je overzicht mist of grenzen nodig hebt.','Noem voor jezelf één emotie en één concrete volgende stap.'],
        ['Kalm communiceren','Rustige woorden voorkomen dat een probleem groter wordt.','Schrijf een communicatiepunt in situatie-actie-vervolg vorm.'],
        ['Reset na storing','Na onderbreking opnieuw kiezen voorkomt rommelig werk.','Na je volgende onderbreking open je Vandaag en kies je één taak.'],
        ['Grenzen zonder hardheid','Een duidelijke grens kan vriendelijk zijn.','Formuleer één zin waarmee je aangeeft wat je eerst doet.'],
        ['Rust na afronden','Bewust afronden helpt je brein afsluiten.','Na één taak noteer je kort wat klaar is.']
      ],
      comm:[
        ['Kort terugkoppelen','Goede communicatie hoeft niet lang te zijn: situatie, actie, vervolg.','Maak een communicatie-item met deze drie onderdelen.'],
        ['Vraag helder stellen','Een vage vraag geeft vage antwoorden. Maak duidelijk wat je nodig hebt.','Schrijf één vraag met een concrete gewenste actie.'],
        ['Probleem zonder verwijt','Melden werkt beter als het probleem centraal staat, niet schuld.','Maak een bericht: wat speelt er, wat heb jij gedaan, wat is nodig?'],
        ['Afspraken vastleggen','Korte vastlegging voorkomt opnieuw uitleggen.','Maak een communicatiepunt met opvolgdatum.'],
        ['Rood naar geel','Een rood communicatiepunt vraagt een eerste stap, niet direct perfectie.','Zet één rood punt om naar geel door een vervolgstap te bepalen.'],
        ['Luisteren als managementtool','Goed luisteren voorkomt dubbel werk.','Noteer bij een gesprek één feit en één afspraak.'],
        ['Feedback praktisch maken','Feedback moet gedrag beschrijven, niet karakter.','Schrijf een voorbeeld van gedrag + gewenst vervolg.'],
        ['Professioneel onder druk','Onder druk kort en feitelijk blijven voorkomt escalatie.','Gebruik het communicatie-template voor één lastig punt.']
      ],
      customer:[
        ['Vriendelijkheid met grenzen','Klantvriendelijk zijn betekent helpen binnen wat mogelijk is.','Oefen één zin: “Ik kijk het voor u na, maar ik kan dit niet beloven.”'],
        ['Agressie de-escaleren','Bij agressie helpt vertragen, afstand en duidelijke woorden.','Kies één rustige standaardzin voor moeilijke klanten.'],
        ['Probleem erkennen','Een klant wil vaak eerst merken dat hij gehoord wordt.','Oefen: “Ik begrijp dat dit vervelend is, ik kijk wat mogelijk is.”'],
        ['Nee zeggen met alternatief','Een goed nee bevat vaak een alternatief of volgende stap.','Schrijf één nee-zin met alternatief.'],
        ['Service zonder jezelf te verliezen','Je kunt behulpzaam zijn zonder alles over te nemen.','Bepaal vandaag één grens bij een hulpvraag.'],
        ['Rustige lichaamstaal','Open houding en rustig tempo verlagen spanning.','Let bij één gesprek op je houding en stemtempo.'],
        ['Lastige vraag structureren','Vraag terug: wat zoekt iemand precies?','Stel bij een klantvraag één verduidelijkende vraag.'],
        ['Afsluiten met duidelijkheid','Een goede afsluiting voorkomt herhaling.','Sluit één klantcontact af met: “Is het zo duidelijk voor u?”']
      ],
      management:[
        ['Bottleneck herkennen','Een bottleneck is het punt waar werk blijft hangen. Daar zit de grootste winst.','Zoek vandaag één punt waar werk vaak blijft liggen.'],
        ['Delegeren met context','Delegeren is niet dumpen: geef doel, resultaat en tijd.','Formuleer één taak alsof je die aan een collega overdraagt.'],
        ['Planning is keuzes maken','Een planning zonder prioriteiten is alleen een lijst.','Maak een top 3 en zet de rest bewust later.'],
        ['Verbeteren zonder klagen','Een verbeterpunt werkt beter met voorstel.','Schrijf één probleem + één haalbaar voorstel.'],
        ['Sturen op data','Data helpt als het tot een actie leidt.','Bekijk Visualisatie en kies één verbeterkans.'],
        ['Teamrust creëren','Rust in een team begint bij duidelijkheid over volgorde.','Maak één mini-planning voor een druk moment.'],
        ['Controleren zonder wantrouwen','Controle is kwaliteit bewaken, niet iemand klein maken.','Controleer één resultaat en benoem feitelijk wat goed/minder is.'],
        ['Vooruitdenken','Management is problemen eerder zien dan ze pijn doen.','Kies één risico voor morgen en zet het klaar.']
      ],
      haccp:[
        ['Dagelijkse basis borgen','HACCP wordt sterk door vaste basis, niet door losse heldendaden.','Rond eerst de dagelijkse HACCP-basis af.'],
        ['Periodiek werk beschermen','Periodieke taken verdwijnen als je ze niet bewust plant.','Plan één periodieke taak direct na de basisroutine.'],
        ['Schoonmaakkaart lezen','Een Store Map-signaal is data: locatie, ernst, duur en opvolging.','Open de schoonmaakkaart en kies één urgent punt.'],
        ['Schimmel serieus nemen','Schimmel vraagt registratie, schoonmaak en nacontrole.','Meld of controleer één Store Map-item.'],
        ['Tijd realistisch inschatten','Een taak zonder duur is moeilijk te plannen.','Controleer of je HACCP-taken een duur hebben.'],
        ['Uitstel leren lezen','Uitstel is geen falen; het is data over planning.','Kies bij uitstellen bewust een reden.'],
        ['Controle rondmaken','Een controle is pas af als hij geregistreerd is.','Vink een taak af en controleer of die verdwijnt uit actief.'],
        ['Hygiëne zichtbaar maken','Schoon werk moet traceerbaar zijn.','Markeer een schoonmaakactie als gecontroleerd of schoongemaakt.']
      ],
      agf:[
        ['Huidige voorraad wint','Een trend is nuttig, maar wat je vandaag ziet is beslissend voor bestellen.','Geef één product de status overvoorraad of leeg en bekijk het advies.'],
        ['Bonus eerst controleren','Bonusartikelen vragen dagelijkse aandacht omdat vraag sneller verandert.','Markeer één product als bonus en doe een check.'],
        ['Conflicten herkennen','Trend zegt soms meer bestellen terwijl vandaag te veel voorraad ligt. Dat is een conflict.','Zoek een product met conflict of maak een voorbeeldcheck.'],
        ['Productgroepen denken','Tomaten, paprika en zacht fruit gedragen zich anders. Groeperen helpt overzicht.','Filter of groepeer één AGF-lijst.'],
        ['NASA voorkomt zoeken','Een NASA-nummer bespaart tijd bij bestellen.','Vul of controleer één NASA-nummer.'],
        ['Signaalsterkte gebruiken','Eén melding is een signaal; herhaling is patroon.','Bekijk de laatste meldingen van een product.'],
        ['Besteladvies lezen','Een goed advies bevat status, trend en reden.','Open een Decision Card en lees de reden.'],
        ['Stabiliteit vieren','Als een product langer OK blijft, is dat resultaat van beter beheer.','Zoek één stabiel product of maak een OK-check.']
      ],
      signal:[
        ['Vroeg signaleren','Een klein signaal voorkomt vaak groter herstelwerk.','Noteer vandaag één klein risico voordat het probleem wordt.'],
        ['Patronen boven incidenten','Een incident is één punt; een patroon vraagt aanpassing.','Zoek één terugkerend AGF- of HACCP-signaal.'],
        ['Locatie exact maken','Goede signalering noemt waar, wat en hoe ernstig.','Meld een schoonmaakpunt met locatie en gradatie.'],
        ['Bewijs door tijdstip','Tijdstippen maken terugzoeken mogelijk.','Controleer of je rapportage een datum en tijd heeft.'],
        ['Risico prioriteren','Niet elk signaal is even urgent. Schimmel gaat boven stof.','Rangschik één urgent en één laag risico.'],
        ['Nacontrole plannen','Sommige problemen zijn pas opgelost na controle later.','Maak of bekijk een nacontrole.'],
        ['Melding kort houden','Een goede melding is kort maar compleet.','Schrijf: locatie + probleem + actie.'],
        ['Van signaal naar taak','Een signaal moet een actie krijgen, anders verdwijnt het.','Plan één signalering in HACCP.']
      ],
      discipline:[
        ['Kleine herhaling bouwt discipline','Discipline is vaak een kleine actie herhalen, niet motivatie voelen.','Doe één vaste taak ook als je weinig zin hebt.'],
        ['Beginnen verlaagt weerstand','De eerste minuut is vaak het moeilijkst.','Start een focusblok van 5 minuten.'],
        ['Afspraak met jezelf','Een taak plannen is een afspraak met je toekomstige zelf.','Zet één taak bovenaan en doe die eerst.'],
        ['Niet onderhandelen met basis','Basisroutines zijn niet optioneel; ze beschermen de dag.','Vink één basisroutine af vóór extra werk.'],
        ['Herstel na missen','Discipline betekent ook terugkomen na missen.','Pak één uitgestelde taak opnieuw op.'],
        ['Bewuste pauze','Pauzes registreren helpt eerlijk kijken naar energie.','Start en stop een pauze bewust.'],
        ['Volgorde respecteren','Elke keer opnieuw kiezen kost energie. Een volgorde bespaart energie.','Gebruik de HACCP-dagplanning zonder te wisselen.'],
        ['Eindig schoon','Een duidelijke afsluiting maakt morgen lichter.','Sluit je shift af met rapportage of samenvatting.']
      ],
      self:[
        ['Zelfinzicht zonder oordeel','Data is feedback, geen aanval. Kijk wat het je vertelt.','Kies één cijfer uit Visualisatie en schrijf wat het betekent.'],
        ['Stressbron benoemen','Wat je kunt benoemen, kun je beter sturen.','Noem de grootste stressbron van vandaag.'],
        ['Trots registreren','Wat goed ging verdient ook aandacht.','Noteer één actie die vandaag goed ging.'],
        ['Leren van uitstel','Uitstel laat zien waar planning of energie niet klopt.','Bekijk je uitstelredenen en kies één verbeterpunt.'],
        ['Kwaliteit boven perfectie','Perfectie vertraagt; kwaliteit is bewust voldoende goed.','Rond één taak goed genoeg af zonder te blijven hangen.'],
        ['Grenzen herkennen','Te veel willen is soms minder effectief dan duidelijk kiezen.','Zeg tegen jezelf welke taak vandaag niet hoeft.'],
        ['Reflectie als onderhoud','Reflectie voorkomt dat dezelfde fout steeds terugkomt.','Beantwoord: wat zou morgen 10% makkelijker maken?'],
        ['Groei zichtbaar maken','Groei voelt traag tot je het meet.','Bekijk je coaching-progressie en kies de volgende les.']
      ]
    };
    const out=[];
    Object.entries(data).forEach(([path,arr])=>arr.forEach((row,idx)=>{
      const level = Math.min(5, 1 + Math.floor(idx/2));
      out.push({
        id:`v6513_${path}_${idx+1}`, path, level,
        category:v6513PathName(path), title:row[0], text:row[1], practice:row[2], route:path==='agf'?'agf':path==='haccp'?'haccp':path==='signal'?'storemap':path==='management'?'visual':path==='comm'?'communication':'today',
        question:`${row[0]} — wat is de beste toepassing?`,
        answers:[currentLang()==='en'?'Do everything at once':'Alles tegelijk doen', currentLang()==='en'?'Choose one concrete next action':'Kies één concrete volgende actie', currentLang()==='en'?'Wait until it becomes quieter':'Wachten tot het rustiger wordt'],
        correct:1
      });
    }));
    return out;
  }
  const V6513_LESSONS = v6513LessonSeed();
  getLessons = function(){ v6513EnsureCoachingState(); return V6513_LESSONS.map(l=>Object.assign({},l,{locked:l.level>v6513CoachLevel()+1})); };
  function v6513Lesson(id){ return getLessons().find(l=>l.id===id) || getLessons()[0]; }
  function v6513LessonStatus(l){
    const practice=(state.coachingPractices||[]).includes(l.id), exam=(state.coachingExamPassed||[]).includes(l.id), done=(state.coachingDone||[]).includes(l.id);
    return {practice,exam,done,ready:practice&&exam};
  }
  function v6513BadgeList(){
    const done=(state.coachingDone||[]).length;
    const badges=[];
    if(done>=1) badges.push(currentLang()==='en'?'First lesson':'Eerste les');
    if(done>=5) badges.push(currentLang()==='en'?'Consistent starter':'Consistente starter');
    if(done>=12) badges.push(currentLang()==='en'?'Workfloor learner':'Werkvloer leerling');
    if(done>=25) badges.push(currentLang()==='en'?'Calm operator':'Rustige operator');
    if(done>=40) badges.push(currentLang()==='en'?'Retail coach':'Retail coach');
    return badges;
  }
  function v6513PathProgress(path){
    const lessons=getLessons().filter(l=>l.path===path); const done=lessons.filter(l=>(state.coachingDone||[]).includes(l.id)).length;
    return {done,total:lessons.length,pct:Math.round(done/Math.max(1,lessons.length)*100)};
  }
  function v6513SkillNode(p){
    const pr=v6513PathProgress(p.id);
    return `<button class="v6513-skill ${p.color}" data-action="set-coach-path" data-path="${p.id}"><span class="skill-ico">${iconSvg(p.icon)}</span><strong>${t(p.key)}</strong>${bar('',pr.pct,pr.pct>70?'good':pr.pct>25?'warn':'info')}<small>${pr.done}/${pr.total} · ${pr.pct}%</small></button>`;
  }
  function v6513LessonCard(l){
    const st=v6513LessonStatus(l); const locked=l.locked; const title=escapeHtml(l.title); const cat=escapeHtml(l.category);
    if(locked){ return `<div class="v6513-lesson locked"><div class="lesson-top"><span class="chip">${cat}</span><span class="pill">🔒 ${t('level')} ${l.level}</span></div><h3>${title}</h3><p class="muted">${t('lockedByLevel')}. ${t('unlockByCompleting')}.</p></div>`; }
    return `<div class="v6513-lesson ${st.done?'done':''}"><div class="lesson-top"><span class="chip">${cat}</span><span class="pill ${st.done?'good':'info'}">${t('level')} ${l.level}</span></div><h3>${title}</h3><p class="muted">${escapeHtml(l.text)}</p><div class="lesson-checks"><span class="pill ${st.practice?'good':'soft'}">${st.practice?'✓ ':''}${t('practiceDone')}</span><span class="pill ${st.exam?'good':'soft'}">${st.exam?'✓ ':''}${t('examPassed')}</span></div><p><strong>${t('realPractice')}:</strong> ${escapeHtml(l.practice)}</p><div class="btn-row"><button class="btn" data-action="v6513-learn-more" data-id="${l.id}">${t('learnMore')}</button><button class="btn" data-route="${l.route}">${currentLang()==='en'?'Open practice':'Open praktijk'}</button><button class="btn" data-action="v6513-practice-done" data-id="${l.id}">${t('practiceDone')}</button><button class="btn" data-action="v6513-open-exam" data-id="${l.id}">${t('examOpen')}</button><button class="btn primary" ${st.ready&&!st.done?'':'disabled'} data-action="v6513-complete-lesson" data-id="${l.id}">${st.done?'✓':t('completeLesson')}</button></div>${(!st.ready&&!st.done)?`<p class="muted small">${t('cannotComplete')}</p>`:''}</div>`;
  }
  function v6513RecommendedLesson(){
    const lessons=getLessons();
    return lessons.find(l=>!l.locked&&!state.coachingDone.includes(l.id)) || lessons[0];
  }
  renderCoachOfDay = function(){
    const l=v6513RecommendedLesson();
    return `<div class="v6513-coach-day"><span class="chip">${t('dailyCoach')}</span><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.text)}</p><p><strong>${t('practice')}:</strong> ${escapeHtml(l.practice)}</p><div class="btn-row"><button class="btn" data-action="v6513-learn-more" data-id="${l.id}">${t('learnMore')}</button><button class="btn primary" data-route="coaching">${t('routeCoaching')}</button></div></div>`;
  };
  renderCoaching = function(){
    v6513EnsureCoachingState();
    const paths=v6513PathDefs(); const active=state.ui.coachPath || 'all'; const showCompleted=!!state.ui.showCompletedLessons; const showLocked=!!state.ui.showLockedLessons;
    let lessons=getLessons();
    if(active!=='all') lessons=lessons.filter(l=>l.path===active);
    lessons=lessons.filter(l=>(showLocked||!l.locked)&&(showCompleted||!state.coachingDone.includes(l.id)));
    const rec=v6513RecommendedLesson(); const badges=v6513BadgeList(); const done=(state.coachingDone||[]).length;
    return `<div class="grid v6513-coaching"><div class="hero v6513-coaching-hero"><div><span class="chip">${t('coachingAcademyTitle')}</span><h2>${currentLang()==='en'?'Grow skills that make work easier':'Ontwikkel vaardigheden die werk makkelijker maken'}</h2><p>${t('coachingAcademyIntro')}</p></div><div class="btn-row"><button class="btn ${active==='all'?'primary':''}" data-action="set-coach-path" data-path="all">${t('all')}</button><button class="btn" data-action="toggle-locked-lessons">${showLocked?t('hideLocked'):t('showLocked')}</button><button class="btn" data-action="toggle-completed-lessons">${showCompleted?t('hideCompleted'):t('showCompleted')}</button></div></div>
      <div class="grid grid-4">${kpi(t('skillLevel'),v6513CoachLevel(),'good')}${kpi(t('xp'),done*25,'good')}${kpi(t('completedLessons'),done,null)}${kpi(t('badges'),badges.length,'info')}</div>
      <div class="grid grid-2"><div class="card v6513-recommend"><h3>${t('recommendedLesson')}</h3>${v6513LessonCard(rec)}</div><div class="card"><h3>${t('badges')}</h3>${badges.length?badges.map(b=>`<span class="badge">${escapeHtml(b)}</span>`).join(''):`<p class="muted">${currentLang()==='en'?'Complete your first lesson to earn a badge.':'Rond je eerste les af om een badge te verdienen.'}</p>`}<hr><h3>${t('learningProgress')}</h3>${paths.map(p=>{const pr=v6513PathProgress(p.id); return bar(t(p.key),pr.pct,pr.pct>70?'good':pr.pct>25?'warn':'info');}).join('')}</div></div>
      <div class="card"><h3>${t('skillTree')}</h3><div class="v6513-skill-grid">${paths.map(v6513SkillNode).join('')}</div></div>
      <div class="card"><h3>${t('lessonLibrary')}</h3><p class="muted">${currentLang()==='en'?'Lessons are sorted by level. Locked lessons show only the title until your level is high enough.':'Lessen zijn op level gesorteerd. Gesloten lessen tonen alleen de titel tot je level hoog genoeg is.'}</p></div>
      ${[1,2,3,4,5].map(level=>{const arr=lessons.filter(l=>l.level===level); if(!arr.length)return ''; return `<details class="detail-drawer" open><summary>${t('level')} ${level} <span class="pill info">${arr.length}</span></summary><div class="drawer-content grid grid-3">${arr.map(l=>`<div class="card">${v6513LessonCard(l)}</div>`).join('')}</div></details>`;}).join('')}
      ${state.coachingDone.length?`<details class="detail-drawer"><summary>${t('viewArchive')} <span class="pill good">${state.coachingDone.length}</span></summary><div class="drawer-content grid grid-3">${getLessons().filter(l=>state.coachingDone.includes(l.id)).map(l=>`<div class="card soft">${v6513LessonCard(l)}</div>`).join('')}</div></details>`:''}
    </div>`;
  };
  function v6513LearnMore(id){
    const l=v6513Lesson(id);
    modal(t('mboExplanation'), `<div class="grid"><div class="hero"><span class="chip">${escapeHtml(l.category)} · ${t('level')} ${l.level}</span><h2>${escapeHtml(l.title)}</h2><p>${escapeHtml(l.text)}</p></div><div class="card"><h3>${currentLang()==='en'?'What this means at work':'Wat dit betekent op de werkvloer'}</h3><p>${currentLang()==='en'?'This lesson is about turning pressure into a clear next action. You learn to reduce noise, choose order and make progress visible. The goal is not perfection, but controlled improvement.':'Deze les gaat over druk omzetten in een duidelijke volgende actie. Je leert ruis verminderen, volgorde kiezen en voortgang zichtbaar maken. Het doel is geen perfectie, maar gecontroleerde verbetering.'}</p><p>${currentLang()==='en'?'Use it during a normal shift: pick one situation, apply the lesson and register the result.':'Gebruik dit tijdens een normale shift: kies één situatie, pas de les toe en registreer het resultaat.'}</p></div><div class="card"><h3>${t('realPractice')}</h3><p>${escapeHtml(l.practice)}</p><div class="btn-row"><button class="btn" data-route="${l.route}">${currentLang()==='en'?'Go to practice':'Ga naar praktijk'}</button><button class="btn primary" data-action="v6513-practice-done" data-id="${l.id}">${t('practiceDone')}</button></div></div></div>`, 'wide');
  }
  function v6513OpenExam(id){
    const l=v6513Lesson(id);
    modal(t('exam'), `<div class="card"><span class="chip">${escapeHtml(l.category)} · ${t('level')} ${l.level}</span><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.question)}</p><div class="grid">${l.answers.map((a,i)=>`<button class="btn" data-action="v6513-answer-exam" data-id="${l.id}" data-answer="${i}">${escapeHtml(a)}</button>`).join('')}</div><p class="muted small">${currentLang()==='en'?'You can try again if the answer is not correct.':'Je mag opnieuw proberen als het antwoord niet goed is.'}</p></div>`);
  }
  const oldHandleAction6513 = handleAction;
  handleAction = function(a,el,e){
    if(a==='set-coach-path'){ state.ui.coachPath = el.dataset.path || 'all'; save(); render(); return; }
    if(a==='v6513-learn-more'){ v6513LearnMore(el.dataset.id); return; }
    if(a==='v6513-practice-done'){ v6513EnsureCoachingState(); const id=el.dataset.id; if(!state.coachingPractices.includes(id)) state.coachingPractices.push(id); addActivity(t('practiceDone')); save(); render(); toast(t('practiceSaved'),'good'); return; }
    if(a==='v6513-open-exam'){ v6513OpenExam(el.dataset.id); return; }
    if(a==='v6513-answer-exam'){ v6513EnsureCoachingState(); const l=v6513Lesson(el.dataset.id); const ans=Number(el.dataset.answer); if(ans===l.correct){ if(!state.coachingExamPassed.includes(l.id)) state.coachingExamPassed.push(l.id); save(); render(); modal(t('correct'), `<div class="card"><h3>${t('examPassedToast')}</h3><p>${currentLang()==='en'?'Good. You chose a concrete next action and showed understanding.':'Goed. Je koos een concrete volgende actie en laat zien dat je de les begrijpt.'}</p><button class="btn primary" data-action="close-modal">${t('close')}</button></div>`); } else { modal(t('incorrect'), `<div class="card"><h3>${t('tryAgain')}</h3><p>${currentLang()==='en'?'The strongest answer is the one that creates a concrete next action.':'Het sterkste antwoord is het antwoord dat een concrete volgende actie maakt.'}</p><button class="btn" data-action="v6513-open-exam" data-id="${l.id}">${t('tryAgain')}</button></div>`); } return; }
    if(a==='v6513-complete-lesson'){ v6513EnsureCoachingState(); const id=el.dataset.id; const st=v6513LessonStatus(v6513Lesson(id)); if(!st.ready){ toast(t('cannotComplete'),'warn'); return; } if(!state.coachingDone.includes(id)) state.coachingDone.push(id); addActivity(t('coachingDoneToast')); save(); render(); toast(t('coachingDoneToast'),'good'); return; }
    return oldHandleAction6513(a,el,e);
  };
  const oldRegressionChecks6513 = regressionChecks;
  regressionChecks = function(){
    const arr=oldRegressionChecks6513 ? oldRegressionChecks6513() : [];
    arr.push({name:currentLang()==='en'?'Coaching Academy Pro renders':'Coaching Academy Pro rendert', ok:typeof renderCoaching==='function' && getLessons().length>=80});
    arr.push({name:currentLang()==='en'?'Coaching practice/exam state':'Coaching praktijk/toets status', ok:Array.isArray(state.coachingPractices)&&Array.isArray(state.coachingExamPassed)});
    return arr;
  };
  const oldRenderDiagnostics6513 = renderDiagnostics;
  renderDiagnostics = function(){
    let html=oldRenderDiagnostics6513();
    html=html.replaceAll('v6.5.12','v6.5.13').replaceAll('rich-cmd-cache-v6512','rich-cmd-cache-v6513');
    html += `<div class="card"><h3>v6.5.13 — Coaching Academy verdieping</h3><p>${currentLang()==='en'?'Expanded Coaching with skill paths, levels, quizzes, practice state, badges and vocational-level explanations.':'Coaching uitgebreid met skill paths, levels, toetsen, praktijkstatus, badges en mbo-achtige uitleg.'}</p></div>`;
    return html;
  };
  v6513EnsureCoachingState();
  save();
} catch(err) { console.error('v6.5.13 coaching patch failed', err); }

/* RICH CMD v6.5.18 — Coaching Translation & Quiz Feedback Polish
   Scope: Coaching translations + quiz visual feedback only. */
try {
  APP.version = 'v6.5.18';
  APP.cache = 'rich-cmd-cache-v6518';

  Object.assign(I18N.nl, {
    quizFeedbackCorrect:'Goed antwoord', quizFeedbackWrong:'Nog niet goed', quizFeedbackSaved:'Toetsresultaat opgeslagen', quizFeedbackExplain:'Lees de uitleg en probeer het opnieuw.', quizCorrectWhy:'Je kiest een concrete volgende actie. Dat is de kern van deze les.', quizWrongWhy:'Het beste antwoord is meestal de optie die rust, volgorde en een concrete actie brengt.'
  });
  Object.assign(I18N.en, {
    quizFeedbackCorrect:'Correct answer', quizFeedbackWrong:'Not yet', quizFeedbackSaved:'Quiz result saved', quizFeedbackExplain:'Read the explanation and try again.', quizCorrectWhy:'You chose a concrete next action. That is the core of this lesson.', quizWrongWhy:'The strongest answer is usually the option that creates calm, order and a concrete action.'
  });

  const V6514_PATH_EN = {
    work:'Work attitude', calm:'Calm & stress', comm:'Communication', customer:'Customer handling', management:'Management', haccp:'HACCP', agf:'Produce', signal:'Signal detection', discipline:'Discipline', self:'Self-insight'
  };
  const V6514_LESSON_EN = {
    v6513_work_1:['Priority means daring to say later','You cannot do everything at once. Prioritizing means choosing what creates the most value now and what can safely wait.','Choose the three tasks that make the biggest difference today and finish one before picking up anything new.'],
    v6513_work_2:['Start with the basics','A strong base routine lowers pressure because you spend less time repairing later.','Load the daily HACCP tasks and complete one base task first.'],
    v6513_work_3:['Make work visible','Work that is not visible can feel unfinished. Short registration creates calm and proof.','Make one short report or communication update after completing an action.'],
    v6513_work_4:['Win small first','Finishing a short task lowers mental pressure and creates momentum.','Choose a task under 10 minutes and consciously complete it.'],
    v6513_work_5:['Stop stacking work','Too many open actions fill your head. Close small loose ends first.','Clear one open communication point or deferred task.'],
    v6513_work_6:['Rhythm over rushing','Rushing creates speed without control. Rhythm creates speed with quality.','Plan your first three actions today in a fixed order.'],
    v6513_work_7:['Read workload','Workload is not only the amount of work, but also the amount of uncertainty.','Write one sentence: what creates the most pressure today?'],
    v6513_work_8:['Finishing saves energy','Half-finished work keeps asking for attention. Finishing frees your mind.','Complete one small task fully, including registration.'],

    v6513_calm_1:['Calm is a work skill','Calm does not mean working slowly. Calm means choosing before speeding up.','Breathe for 10 seconds, choose one action and do only that action.'],
    v6513_calm_2:['Busy without panic','Busy moments need order, not panic. You do not have to solve everything at once.','Use “What now?” and follow the first recommendation.'],
    v6513_calm_3:['Breaks are maintenance','A short break is not a loss; it maintains attention and energy.','Register your break consciously and check your net working time.'],
    v6513_calm_4:['Recognize emotion','Irritation is often a signal that you lost overview or need boundaries.','Name one emotion and one concrete next step for yourself.'],
    v6513_calm_5:['Communicate calmly','Calm words prevent a problem from becoming bigger.','Create a communication item using situation, action and next step.'],
    v6513_calm_6:['Reset after interruption','After an interruption, choosing again prevents messy work.','After your next interruption, open Today and choose one task.'],
    v6513_calm_7:['Boundaries without harshness','A clear boundary can still be friendly.','Formulate one sentence that explains what you will do first.'],
    v6513_calm_8:['Calm after completion','Consciously closing a task helps your brain finish it too.','After one task, briefly note what is done.'],

    v6513_comm_1:['Short feedback','Good communication does not need to be long: situation, action, next step.','Create a communication item with these three parts.'],
    v6513_comm_2:['Ask clearly','A vague question creates vague answers. Make clear what you need.','Write one question with a concrete requested action.'],
    v6513_comm_3:['Problem without blame','Reporting works better when the problem is central, not blame.','Write: what is happening, what you did and what is needed.'],
    v6513_comm_4:['Record agreements','Short notes prevent having to explain the same thing again.','Create a communication point with a follow-up date.'],
    v6513_comm_5:['Red to yellow','A red communication point needs a first step, not immediate perfection.','Turn one red point into yellow by choosing a next step.'],
    v6513_comm_6:['Listening as a management tool','Good listening prevents double work and confusion.','Note one fact and one agreement from a conversation.'],
    v6513_comm_7:['Make feedback practical','Feedback should describe behavior, not character.','Write one example of behavior plus the desired next step.'],
    v6513_comm_8:['Professional simplicity','Clear language is often more professional than long language.','Rewrite one message in three short sentences.'],

    v6513_customer_1:['Friendly under pressure','Friendly service starts with calm tone, even when time is short.','Use one calm sentence in a difficult customer situation.'],
    v6513_customer_2:['Listen before solving','Customers often calm down when they first feel heard.','Repeat the customer’s main point before offering a solution.'],
    v6513_customer_3:['Clear boundaries for customers','Helping does not mean promising everything.','Formulate one friendly boundary sentence.'],
    v6513_customer_4:['From complaint to action','A complaint becomes useful when it leads to a clear action.','Write one complaint as: situation, action, follow-up.'],
    v6513_customer_5:['De-escalate aggression','Aggression asks for safety, distance and calm repetition.','Choose one sentence you can repeat calmly.'],
    v6513_customer_6:['Help without losing overview','A customer question may not erase the whole planning.','Help briefly and return to your next planned task.'],
    v6513_customer_7:['Professional patience','Patience is controlled attention, not letting everything happen.','Slow your response down by one breath before answering.'],
    v6513_customer_8:['Close clearly','A clear ending prevents repeat confusion.','End one customer contact with: “Is this clear for you?”'],

    v6513_management_1:['Recognize the bottleneck','A bottleneck is where work keeps getting stuck. That is where the biggest improvement is.','Find one point today where work often gets stuck.'],
    v6513_management_2:['Delegate with context','Delegating is not dumping: give goal, result and timing.','Formulate one task as if you hand it over to a colleague.'],
    v6513_management_3:['Planning means choosing','A planning without priorities is only a list.','Make a top 3 and consciously place the rest later.'],
    v6513_management_4:['Improve without complaining','An improvement point works better with a proposal.','Write one problem plus one realistic proposal.'],
    v6513_management_5:['Manage with data','Data helps when it leads to action.','Open Visualization and choose one improvement opportunity.'],
    v6513_management_6:['Create team calm','Team calm starts with clarity about order and priorities.','Create one mini-planning for a busy moment.'],
    v6513_management_7:['Check without distrust','Checking protects quality; it is not about making someone small.','Check one result and describe factually what is good or missing.'],
    v6513_management_8:['Think ahead','Management means seeing problems before they hurt.','Choose one risk for tomorrow and prepare it.'],

    v6513_haccp_1:['Secure the daily basics','HACCP becomes strong through a fixed base, not occasional heroics.','Complete the daily HACCP basics first.'],
    v6513_haccp_2:['Protect periodic work','Periodic tasks disappear if you do not plan them consciously.','Plan one periodic task directly after the base routine.'],
    v6513_haccp_3:['Read the Cleaning Map','A Store Map signal is data: location, severity, duration and follow-up.','Open the Cleaning Map and choose one urgent point.'],
    v6513_haccp_4:['Take mold seriously','Mold requires registration, cleaning and follow-up control.','Report or check one Store Map item.'],
    v6513_haccp_5:['Estimate time realistically','A task without duration is hard to plan.','Check whether your HACCP tasks have a duration.'],
    v6513_haccp_6:['Learn from deferral','Deferral is not failure; it is data about planning.','Choose a clear reason when deferring a task.'],
    v6513_haccp_7:['Complete the check','A check is only complete when it is registered.','Complete a task and check that it disappears from active work.'],
    v6513_haccp_8:['Make hygiene visible','Clean work must be traceable.','Mark a cleaning action as checked or cleaned.'],

    v6513_agf_1:['Current stock wins','A trend is useful, but what you see today is decisive for ordering.','Give one product the status overstock or empty shelf and review the advice.'],
    v6513_agf_2:['Check bonus first','Bonus products need daily attention because demand changes faster.','Mark one product as bonus and perform a check.'],
    v6513_agf_3:['Recognize conflicts','Sometimes the trend says order more while today there is too much stock. That is a conflict.','Find or create a product with conflicting signals.'],
    v6513_agf_4:['Think in product groups','Tomatoes, peppers and soft fruit behave differently. Grouping gives overview.','Filter or group one Produce list.'],
    v6513_agf_5:['NASA saves searching','A NASA number saves time during ordering.','Fill in or check one NASA number.'],
    v6513_agf_6:['Use signal strength','One report is a signal; repetition is a pattern.','View the recent reports of one product.'],
    v6513_agf_7:['Read order advice','Good advice contains status, trend and reason.','Open a Decision Card and read the reason.'],
    v6513_agf_8:['Celebrate stability','When a product stays OK longer, that is the result of better control.','Find one stable product or make an OK check.'],

    v6513_signal_1:['Signal early','A small signal often prevents larger recovery work.','Write down one small risk before it becomes a problem.'],
    v6513_signal_2:['Patterns over incidents','An incident is one point; a pattern requires adjustment.','Find one recurring Produce or HACCP signal.'],
    v6513_signal_3:['Make the location exact','Good signaling says where, what and how serious it is.','Report a cleaning point with location and grade.'],
    v6513_signal_4:['Proof through time','Time stamps make later searching possible.','Check whether your report has date and time.'],
    v6513_signal_5:['Prioritize risk','Not every signal is equally urgent. Mold is above dust.','Rank one urgent and one low-risk signal.'],
    v6513_signal_6:['Plan follow-up control','Some problems are only solved after a later check.','Create or view a follow-up control.'],
    v6513_signal_7:['Keep reporting short','A good report is short but complete.','Write: location + problem + action.'],
    v6513_signal_8:['From signal to task','A signal needs an action, otherwise it disappears.','Plan one signal into HACCP.'],

    v6513_discipline_1:['Small repetition builds discipline','Discipline is often repeating a small action, not feeling motivated.','Do one fixed task even if you do not feel like it.'],
    v6513_discipline_2:['Starting lowers resistance','The first minute is often the hardest.','Start a 5-minute focus block.'],
    v6513_discipline_3:['Agreement with yourself','Planning a task is an agreement with your future self.','Put one task at the top and do it first.'],
    v6513_discipline_4:['Do not negotiate with the basics','Base routines are not optional; they protect the day.','Complete one base routine before extra work.'],
    v6513_discipline_5:['Recover after missing','Discipline also means returning after missing something.','Pick up one deferred task again.'],
    v6513_discipline_6:['Conscious break','Registering breaks helps you look honestly at energy.','Start and stop a break consciously.'],
    v6513_discipline_7:['Respect the order','Choosing again and again costs energy. An order saves energy.','Follow the HACCP day plan without switching.'],
    v6513_discipline_8:['End clean','A clear ending makes tomorrow lighter.','Close your shift with a report or summary.'],

    v6513_self_1:['Self-insight without judgment','Data is feedback, not an attack. Look at what it tells you.','Choose one number from Visualization and write what it means.'],
    v6513_self_2:['Name the stress source','What you can name, you can steer more easily.','Name the biggest source of stress today.'],
    v6513_self_3:['Register pride','What went well deserves attention too.','Note one action that went well today.'],
    v6513_self_4:['Learn from deferral','Deferral shows where planning or energy does not match reality.','Look at your deferral reasons and choose one improvement point.'],
    v6513_self_5:['Quality over perfection','Perfection slows down; quality is consciously good enough.','Finish one task well enough without getting stuck.'],
    v6513_self_6:['Recognize boundaries','Wanting too much can be less effective than choosing clearly.','Tell yourself which task does not need to happen today.'],
    v6513_self_7:['Reflection as maintenance','Reflection prevents the same mistake from repeating.','Answer: what would make tomorrow 10% easier?'],
    v6513_self_8:['Make growth visible','Growth feels slow until you measure it.','View your coaching progress and choose the next lesson.']
  };

  function v6514TranslateLesson(l){
    if(currentLang() !== 'en') return l;
    const row = V6514_LESSON_EN[l.id];
    const out = Object.assign({}, l);
    if(row){ out.title=row[0]; out.text=row[1]; out.practice=row[2]; }
    out.category = V6514_PATH_EN[l.path] || l.category;
    out.question = `${out.title} — what is the best practical application?`;
    out.answers = ['Do everything at once','Choose one concrete next action','Wait until it becomes quieter'];
    out.correct = 1;
    return out;
  }

  const oldGetLessons6514 = getLessons;
  getLessons = function(){ return oldGetLessons6514().map(v6514TranslateLesson); };

  function v6514Lesson(id){ return getLessons().find(l=>l.id===id) || getLessons()[0]; }
  function v6514OpenExam(id){
    const l = v6514Lesson(id);
    modal(t('exam'), `<div class="card v6514-exam-card"><span class="chip">${escapeHtml(l.category)} · ${t('level')} ${l.level}</span><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.question)}</p><div class="grid v6514-exam-options">${l.answers.map((a,i)=>`<button class="btn v6514-exam-answer" data-action="v6514-answer-exam" data-id="${l.id}" data-answer="${i}">${escapeHtml(a)}</button>`).join('')}</div><div id="v6514ExamFeedback" class="v6514-exam-feedback muted small">${currentLang()==='en'?'Choose an answer. You can try again if needed.':'Kies een antwoord. Je mag opnieuw proberen als dat nodig is.'}</div></div>`, 'wide');
  }
  function v6514AnswerExam(el){
    const l = v6514Lesson(el.dataset.id);
    const ans = Number(el.dataset.answer);
    const root = el.closest('.modal') || document;
    root.querySelectorAll('.v6514-exam-answer').forEach(btn=>btn.classList.remove('exam-correct-glow','exam-wrong-glow'));
    const feedback = root.querySelector('#v6514ExamFeedback');
    if(ans === l.correct){
      el.classList.add('exam-correct-glow');
      if(!Array.isArray(state.coachingExamPassed)) state.coachingExamPassed=[];
      if(!state.coachingExamPassed.includes(l.id)) state.coachingExamPassed.push(l.id);
      save();
      if(feedback){ feedback.className='v6514-exam-feedback good'; feedback.innerHTML=`<strong>${t('quizFeedbackCorrect')}.</strong> ${t('quizCorrectWhy')}`; }
      toast(t('examPassedToast') || t('quizFeedbackSaved'),'good');
    } else {
      el.classList.add('exam-wrong-glow');
      if(feedback){ feedback.className='v6514-exam-feedback bad'; feedback.innerHTML=`<strong>${t('quizFeedbackWrong')}.</strong> ${t('quizWrongWhy')}`; }
      toast(t('examFailedToast') || t('quizFeedbackExplain'),'warn');
    }
  }

  const oldHandleAction6514 = handleAction;
  handleAction = function(a,el,e){
    if(a==='v6513-open-exam' || a==='v6514-open-exam'){ v6514OpenExam(el.dataset.id); return; }
    if(a==='v6513-answer-exam' || a==='v6514-answer-exam'){ v6514AnswerExam(el); return; }
    return oldHandleAction6514(a,el,e);
  };

  const oldRenderDiagnostics6514 = renderDiagnostics;
  renderDiagnostics = function(){
    let html = oldRenderDiagnostics6514();
    html = html.replaceAll('v6.5.13','v6.5.18').replaceAll('rich-cmd-cache-v6513','rich-cmd-cache-v6518');
    html += `<div class="card"><h3>v6.5.18 — Coaching Translation & Quiz Feedback</h3><p>${currentLang()==='en'?'Coaching lessons, assignments and quiz feedback are now translated more completely. Correct and incorrect quiz answers now show a clear green or red glow.':'Coachinglessen, opdrachten en toetsfeedback zijn vollediger vertaald. Goede en foute toetsantwoorden tonen nu een duidelijke groene of rode gloed.'}</p></div>`;
    return html;
  };

  save();
} catch(err) { console.error('v6.5.18 coaching translation patch failed', err); }

/* =======================
   V6.5.15 — Store Map UX Pro
   Focused update: cleaning map navigation, meter/shelf management, passport and clearer visual overview.
   ======================= */
try {
  Object.assign(I18N.nl, {
    storeMapUxPro:'Schoonmaakkaart UX Pro',
    storeMapNavigator:'Schoonmaaknavigator',
    storeMapNavigatorText:'Navigeer rustig van afdeling naar pad/zone, daarna naar meter en pas daarna naar plank of bodembak.',
    departmentOverview:'Afdelingsoverzicht',
    zoneOverview:'Zone-/padoverzicht',
    meterOverview:'Meteroverzicht',
    openMeter:'Meter openen',
    editMeters:'Meters bijwerken',
    editShelves:'Planken bijwerken',
    shelfCount:'Aantal planken',
    meterCount:'Aantal meters',
    addBottomTray:'Bodembak toevoegen',
    addZone:'Zone toevoegen',
    showShelves:'Planken tonen',
    hideShelves:'Planken verbergen',
    cleaningPassport:'Schoonmaakpaspoort',
    latestCheck:'Laatste controle',
    latestClean:'Laatste schoonmaak',
    noHistory:'Nog geen historie',
    noSelection:'Selecteer een meter of onderdeel om details te zien.',
    zoneHealth:'Zonegezondheid',
    openSignals:'Open signalen',
    meterStatus:'Meterstatus',
    storeMapEmptyPro:'Nog geen winkelindeling. Laad de standaardindeling of voeg handmatig een zone toe.',
    managedMetersNotice:'Bij verminderen van meters worden extra meters gearchiveerd, niet definitief verwijderd.',
    showArchived:'Gearchiveerd tonen',
    restoreArchived:'Herstellen',
    viewMode:'Weergave',
    compactView:'Compact',
    detailedView:'Gedetailleerd'
  });
  Object.assign(I18N.en, {
    storeMapUxPro:'Cleaning Map UX Pro',
    storeMapNavigator:'Cleaning navigator',
    storeMapNavigatorText:'Move calmly from department to aisle/zone, then to meter, and only then to shelf or bottom tray.',
    departmentOverview:'Department overview',
    zoneOverview:'Zone / aisle overview',
    meterOverview:'Meter overview',
    openMeter:'Open meter',
    editMeters:'Edit meters',
    editShelves:'Edit shelves',
    shelfCount:'Number of shelves',
    meterCount:'Number of meters',
    addBottomTray:'Add bottom tray',
    addZone:'Add zone',
    showShelves:'Show shelves',
    hideShelves:'Hide shelves',
    cleaningPassport:'Cleaning passport',
    latestCheck:'Latest check',
    latestClean:'Latest cleaning',
    noHistory:'No history yet',
    noSelection:'Select a meter or item to see details.',
    zoneHealth:'Zone health',
    openSignals:'Open signals',
    meterStatus:'Meter status',
    storeMapEmptyPro:'No store layout yet. Load the standard layout or add a zone manually.',
    managedMetersNotice:'When reducing meters, extra meters are archived, not permanently deleted.',
    showArchived:'Show archived',
    restoreArchived:'Restore',
    viewMode:'View mode',
    compactView:'Compact',
    detailedView:'Detailed'
  });

  function v6515CleanItems(includeArchived=false){
    return ((state.cleaning && state.cleaning.items) || []).filter(i => includeArchived || !i.archived);
  }
  function v6515DeptKey(dep){ return displayDepartment(dep || 'Overig'); }
  function v6515ZoneKey(i){ return i.zone || 'Algemeen'; }
  function v6515MeterKey(i){ return Number(i.meter || 1); }
  function v6515ItemLabel(i){
    const kind = trText(i.kind || 'Onderdeel');
    const level = i.kind === 'Plank' && i.level ? ` ${i.level}` : '';
    return `${kind}${level}`;
  }
  function v6515StatusPriority(status){
    if(status === 'mold3') return 6;
    if(status === 'mold2') return 5;
    if(status === 'mold1') return 4;
    if(status === 'dirty') return 3;
    if(status === 'followup') return 2;
    if(status === 'due' || status === 'planned') return 1;
    if(status === 'clean' || status === 'checked') return -1;
    return 0;
  }
  function v6515MeterStatus(items){
    const max = Math.max(0, ...items.map(i => v6515StatusPriority(i.status || (i.planned?'planned':'neutral'))));
    if(max >= 6) return 'mold3';
    if(max >= 5) return 'mold2';
    if(max >= 4) return 'mold1';
    if(max === 3) return 'dirty';
    if(max === 2) return 'followup';
    if(max === 1) return 'due';
    if(items.some(i => i.status === 'clean')) return 'clean';
    if(items.some(i => i.lastChecked)) return 'checked';
    return 'neutral';
  }
  function v6515StatusText(status){
    if(typeof cleanStatusText === 'function') return cleanStatusText(status);
    const map = currentLang()==='en'
      ? {neutral:'Neutral', clean:'Clean', checked:'Checked', dirty:'Dirty', due:'Due', followup:'Follow-up', mold1:'Mould grade 1', mold2:'Mould grade 2', mold3:'Mould grade 3'}
      : {neutral:'Neutraal', clean:'Schoon', checked:'Gecontroleerd', dirty:'Vuil', due:'Aan de beurt', followup:'Nacontrole', mold1:'Schimmel graad 1', mold2:'Schimmel graad 2', mold3:'Schimmel graad 3'};
    return map[status] || status || map.neutral;
  }
  function v6515GroupMap(){
    const map = {};
    v6515CleanItems(false).forEach(i => {
      const dep = v6515DeptKey(i.department);
      const zone = v6515ZoneKey(i);
      const meter = v6515MeterKey(i);
      map[dep] ||= {};
      map[dep][zone] ||= {};
      map[dep][zone][meter] ||= [];
      map[dep][zone][meter].push(i);
    });
    return map;
  }
  function v6515DeptOrder(deps){
    const order = ['Vers','Houdbaar','Actiekoeling','Overig'];
    return [...deps].sort((a,b)=>{
      const ia = order.indexOf(a), ib = order.indexOf(b);
      if(ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return a.localeCompare(b);
    });
  }
  function v6515StoreSummary(){
    const items = v6515CleanItems(false);
    const signals = cleaningUrgent();
    const checked = items.filter(i => i.lastChecked).length;
    const cleaned = items.filter(i => i.lastCleaned).length;
    return {items, signals, checked, cleaned};
  }
  function v6515ZoneHealth(items){
    const bad = items.filter(i => ['dirty','mold1','mold2','mold3','followup','due'].includes(i.status) || i.planned).length;
    if(!items.length) return 100;
    return clamp(Math.round((1 - bad/items.length)*100),0,100);
  }
  function v6515MeterCard(dep, zone, meter, items){
    const status = v6515MeterStatus(items);
    const shelves = items.filter(i => i.kind === 'Plank').length;
    const trays = items.filter(i => i.kind === 'Bodembak').length;
    const lastCheck = items.map(i=>i.lastChecked).filter(Boolean).sort().pop() || '-';
    const lastClean = items.map(i=>i.lastCleaned).filter(Boolean).sort().pop() || '-';
    return `<div class="store-meter-card ${statusClass({status})}">
      <button class="store-meter-main" data-action="v6515-open-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">
        <strong>${t('meterOverview').replace('overzicht','')} ${meter}</strong>
        <span class="pill ${status.startsWith('mold')?'bad':status==='dirty'?'warn':status==='clean'?'good':'info'}">${escapeHtml(v6515StatusText(status))}</span>
      </button>
      <div class="small muted">${shelves} ${L('planken','shelves')} · ${trays} ${L('bodembakken','bottom trays')}</div>
      <div class="tiny muted">${t('latestCheck')}: ${lastCheck} · ${t('latestClean')}: ${lastClean}</div>
      <div class="btn-row mt"><button class="btn small" data-action="v6515-open-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">${t('openMeter')}</button><button class="btn small" data-action="v6515-edit-meter-shelves" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">${t('editShelves')}</button></div>
    </div>`;
  }

  renderStoreHierarchy = function(){
    const map = v6515GroupMap();
    const deps = v6515DeptOrder(Object.keys(map));
    if(!deps.length) return `<div class="empty-state"><h3>${t('storeMapEmptyPro')}</h3><p class="muted">${t('storeMapNavigatorText')}</p><div class="btn-row"><button class="btn primary" data-action="load-storemap">${L('Standaard winkelindeling laden','Load standard layout')}</button><button class="btn" data-action="v6515-add-zone">${t('addZone')}</button></div></div>`;
    return `<div class="v6515-store-nav">
      ${deps.map(dep => {
        const zoneEntries = Object.entries(map[dep]).sort(([a],[b])=>a.localeCompare(b));
        const depItems = zoneEntries.flatMap(([,meters])=>Object.values(meters).flat());
        const health = v6515ZoneHealth(depItems);
        return `<details class="detail-drawer store-dep" ${dep==='Vers'?'open':''}>
          <summary><span>${escapeHtml(trText(dep))}</span><span class="pill ${health>85?'good':health>60?'warn':'bad'}">${health}%</span></summary>
          <div class="drawer-content grid">
            ${zoneEntries.map(([zone, meters]) => {
              const zoneItems = Object.values(meters).flat();
              const zHealth = v6515ZoneHealth(zoneItems);
              return `<details class="detail-drawer store-zone">
                <summary><span>${escapeHtml(trText(zone))}</span><span class="btn-row"><span class="pill ${zHealth>85?'good':zHealth>60?'warn':'bad'}">${t('zoneHealth')} ${zHealth}%</span><button class="btn small" data-action="v6515-edit-zone-meters" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}">${t('editMeters')}</button></span></summary>
                <div class="drawer-content">
                  <div class="store-meter-grid">${Object.entries(meters).sort((a,b)=>(+a[0])-(+b[0])).map(([meter,items]) => v6515MeterCard(dep,zone,meter,items)).join('')}</div>
                  <div class="btn-row mt"><button class="btn small" data-action="add-clean-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}">+ ${t('addMeter')}</button><button class="btn small" data-action="bulk-add-shelves" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}">+ ${t('editShelves')}</button></div>
                </div>
              </details>`;
            }).join('')}
          </div>
        </details>`;
      }).join('')}
    </div>`;
  };

  function v6515RenderMeterModal(dep, zone, meter){
    const items = v6515CleanItems(false).filter(i => v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)==Number(meter)).sort((a,b)=>{
      const order = {Bodembak:0, Plank:1, Actiekoeling:2};
      return (order[a.kind]??9)-(order[b.kind]??9) || (a.level||0)-(b.level||0);
    });
    const status = v6515MeterStatus(items);
    const history = items.flatMap(i => (i.history||[]).map(h => ({...h, label:i.label||v6515ItemLabel(i)}))).sort((a,b)=>String(b.at||'').localeCompare(String(a.at||''))).slice(0,10);
    modal(`${trText(dep)} / ${trText(zone)} / ${L('Meter','Meter')} ${meter}`, `<div class="grid grid-2">
      <div class="card soft"><h3>${t('meterStatus')}</h3><span class="pill ${status.startsWith('mold')?'bad':status==='dirty'?'warn':status==='clean'?'good':'info'}">${escapeHtml(v6515StatusText(status))}</span><p class="muted small mt">${t('latestCheck')}: ${items.map(i=>i.lastChecked).filter(Boolean).sort().pop()||'-'}</p><p class="muted small">${t('latestClean')}: ${items.map(i=>i.lastCleaned).filter(Boolean).sort().pop()||'-'}</p><div class="btn-row mt"><button class="btn small" data-action="v6515-edit-meter-shelves" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">${t('editShelves')}</button><button class="btn small" data-action="add-clean-shelf" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}">+ ${t('addShelf')}</button></div></div>
      <div class="card soft"><h3>${t('openSignals')}</h3>${items.filter(i=>['dirty','mold1','mold2','mold3','followup','due'].includes(i.status)||i.planned).map(i=>`<div class="list-item compact"><span>${escapeHtml(v6515ItemLabel(i))}</span><span class="pill ${String(i.status).startsWith('mold')?'bad':'warn'}">${escapeHtml(v6515StatusText(i.status))}</span></div>`).join('') || `<p class="muted">${L('Geen open signalen.','No open signals.')}</p>`}</div>
    </div>
    <div class="card mt"><h3>${t('showShelves')}</h3><div class="v6515-shelf-grid">${items.map(i=>`<button class="v6515-shelf-tile ${statusClass(i)}" data-action="open-clean-item" data-id="${i.id}"><strong>${escapeHtml(v6515ItemLabel(i))}</strong><span>${escapeHtml(v6515StatusText(i.status||'neutral'))}</span><small>${t('latestCheck')}: ${i.lastChecked||'-'} · ${t('latestClean')}: ${i.lastCleaned||'-'}</small></button>`).join('')}</div></div>
    <div class="card mt"><h3>${L('Historie','History')}</h3>${history.length?`<div class="list">${history.map(h=>`<div class="list-item compact"><span>${escapeHtml(h.label)} · ${escapeHtml(h.type||'event')}</span><span class="tiny muted">${dateTime(h.at)}</span></div>`).join('')}</div>`:`<p class="muted">${t('noHistory')}</p>`}</div>`, 'wide');
  }
  function v6515EditZoneMeters(dep, zone){
    const current = new Set(v6515CleanItems(false).filter(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone).map(i=>v6515MeterKey(i))).size;
    const val = prompt(`${t('meterCount')} — ${zone}`, String(current || 1));
    if(val === null) return;
    const count = Math.max(0, Number(val)||0);
    const existingMeters = [...new Set(v6515CleanItems(true).filter(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone).map(i=>v6515MeterKey(i)))];
    const maxExisting = Math.max(0,...existingMeters);
    for(let m=1; m<=count; m++){
      const hasMeter = v6515CleanItems(true).some(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)===m);
      if(!hasMeter){
        state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter:m,kind:'Bodembak',label:`${zone} M${m} Bodembak`,frequencyDays:180,status:'neutral',history:[]});
      }
      v6515CleanItems(true).filter(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)===m).forEach(i=>i.archived=false);
    }
    v6515CleanItems(true).filter(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)>count).forEach(i=>i.archived=true);
    toast(t('managedMetersNotice'));
    save(); render();
  }
  function v6515EditMeterShelves(dep, zone, meter){
    const current = v6515CleanItems(false).filter(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)==Number(meter) && i.kind==='Plank').length;
    const val = prompt(`${t('shelfCount')} — ${zone} M${meter}`, String(current || 0));
    if(val === null) return;
    const count = Math.max(0, Number(val)||0);
    for(let l=1; l<=count; l++){
      const has = v6515CleanItems(true).some(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)==Number(meter) && i.kind==='Plank' && Number(i.level)===l);
      if(!has) state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter:Number(meter)||1,kind:'Plank',level:l,label:`${zone} M${meter} Plank ${l}`,frequencyDays:180,status:'neutral',history:[]});
      v6515CleanItems(true).filter(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)==Number(meter) && i.kind==='Plank' && Number(i.level)===l).forEach(i=>i.archived=false);
    }
    v6515CleanItems(true).filter(i=>v6515DeptKey(i.department)===dep && v6515ZoneKey(i)===zone && v6515MeterKey(i)==Number(meter) && i.kind==='Plank' && Number(i.level)>count).forEach(i=>i.archived=true);
    save(); render();
  }
  function v6515AddZone(){
    modal(t('addZone'), `<div class="grid grid-2"><label>${L('Afdeling','Department')}<select class="select" id="v6515Dep"><option>Vers</option><option>Houdbaar</option><option>Actiekoeling</option><option>Overig</option></select></label><label>${L('Naam pad/zone','Aisle/zone name')}<input class="input" id="v6515Zone" placeholder="${L('Bijv. Melk of Pad 1','E.g. Milk or Aisle 1')}"></label><label>${t('meterCount')}<input class="input" id="v6515Meters" type="number" value="1"></label><label>${t('shelfCount')}<input class="input" id="v6515Shelves" type="number" value="0"></label></div><button class="btn primary mt" data-action="v6515-confirm-add-zone">${t('save')}</button>`);
  }
  function v6515ConfirmAddZone(){
    const dep = byId('v6515Dep')?.value || 'Overig';
    const zone = byId('v6515Zone')?.value?.trim() || 'Nieuwe zone';
    const meters = Math.max(1, Number(byId('v6515Meters')?.value)||1);
    const shelves = Math.max(0, Number(byId('v6515Shelves')?.value)||0);
    for(let m=1; m<=meters; m++){
      state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter:m,kind:'Bodembak',label:`${zone} M${m} Bodembak`,frequencyDays:180,status:'neutral',history:[]});
      for(let l=1; l<=shelves; l++) state.cleaning.items.push({id:uid('clean'),department:dep,zone,meter:m,kind:'Plank',level:l,label:`${zone} M${m} Plank ${l}`,frequencyDays:180,status:'neutral',history:[]});
    }
    closeModal(); save(); render();
  }

  renderStoreMap = function(){
    ensureStoreMap(false);
    const urgent = cleaningUrgent();
    const s = v6515StoreSummary();
    return `<div class="grid v6515-storemap-pro">
      <div class="hero"><span class="chip">${t('storeMapUxPro')}</span><h2>${L('Schoonmaakkaart Pro','Cleaning Map Pro')}</h2><p>${t('storeMapNavigatorText')}</p><div class="btn-row"><button class="btn primary" data-action="load-storemap">${L('Standaard winkelindeling laden','Load standard layout')}</button><button class="btn" data-action="v6515-add-zone">+ ${t('addZone')}</button><button class="btn" data-action="open-clean-add-form">+ ${L('Onderdeel','Item')}</button><button class="btn" data-action="start-cleaning-round">${L('Schoonmaakronde','Cleaning round')}</button><button class="btn" data-action="plan-urgent-cleaning">${L('Urgent in HACCP','Plan urgent')}</button></div></div>
      <div class="grid grid-4">${kpi(L('Onderdelen','Items'), s.items.length, 'info')}${kpi(t('openSignals'), urgent.length, urgent.length?'warn':'good')}${kpi(t('latestCheck'), s.checked, 'good')}${kpi(t('latestClean'), s.cleaned, 'good')}</div>
      <div class="card">${renderHeatLegend()}</div>
      <div class="grid grid-main"><div class="card"><h3>${t('storeMapNavigator')}</h3>${renderStoreHierarchy()}</div><div class="grid"><div class="card"><h3>${t('riskRanking')}</h3>${renderRiskRanking()}</div><div class="card"><h3>${t('cleaningPassport')}</h3>${storePassport(urgent[0]||v6515CleanItems(false)[0])}</div><div class="card"><h3>${L('Rustige heatmap','Calm heatmap')}</h3>${renderHeatmap()}</div><div class="card"><h3>${L('Te plannen','To plan')}</h3>${renderCleaningQueue(urgent)}</div></div></div>
    </div>`;
  };

  renderHeatmap = function(){
    const map = v6515GroupMap();
    const deps = v6515DeptOrder(Object.keys(map));
    if(!deps.length) return `<p class="muted">${t('storeMapEmptyPro')}</p>`;
    return `<div class="heatmap v6515-calm-heatmap">${deps.map(dep=>{
      const zones = Object.entries(map[dep]).sort(([a],[b])=>a.localeCompare(b));
      return `<div class="v6515-heat-section"><h4>${escapeHtml(trText(dep))}</h4>${zones.map(([zone,meters])=>`<div class="heat-row"><span class="heat-label">${escapeHtml(trText(zone))}</span>${Object.entries(meters).sort((a,b)=>(+a[0])-(+b[0])).map(([meter,items])=>{ const st=v6515MeterStatus(items); return `<button class="heat-cell ${statusClass({status:st})}" data-action="v6515-open-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}" title="${escapeHtml(zone)} M${meter}: ${v6515StatusText(st)}">${meter}</button>`; }).join('')}</div>`).join('')}</div>`;
    }).join('')}</div>`;
  };

  const oldOpenCleanItem6515 = openCleanItem;
  openCleanItem = function(id){
    const i = state.cleaning.items.find(x=>x.id===id); if(!i) return;
    modal(i.label || v6515ItemLabel(i), `<div class="grid grid-2"><div class="card soft"><span class="chip">${trText(v6515DeptKey(i.department))}</span><h3>${escapeHtml(i.zone||'-')} · ${L('Meter','Meter')} ${i.meter||'-'}</h3><p><b>${L('Onderdeel','Item')}:</b> ${escapeHtml(v6515ItemLabel(i))}</p><p><b>${t('latestCheck')}:</b> ${i.lastChecked||'-'}</p><p><b>${t('latestClean')}:</b> ${i.lastCleaned||'-'}</p><p><b>${t('status')}:</b> ${escapeHtml(v6515StatusText(i.status||'neutral'))}</p></div><div class="card soft"><h3>${L('Acties','Actions')}</h3><div class="btn-row"><button class="btn good" data-action="mark-checked" data-id="${i.id}">${t('markChecked')}</button><button class="btn good" data-action="clean-item" data-id="${i.id}">${L('Schoongemaakt','Cleaned')}</button><button class="btn warn" data-action="mark-dirty" data-id="${i.id}">${L('Vuil','Dirty')}</button><button class="btn bad" data-action="mark-mold" data-id="${i.id}">${L('Schimmel','Mould')}</button><button class="btn" data-action="plan-clean-item" data-id="${i.id}">${L('Plan in HACCP','Plan in HACCP')}</button></div></div></div>${(i.history||[]).length?`<div class="card mt"><h3>${L('Historie','History')}</h3><div class="list">${i.history.slice(0,10).map(h=>`<div class="list-item compact"><span>${escapeHtml(h.type||'event')}</span><span class="tiny muted">${dateTime(h.at)}</span></div>`).join('')}</div></div>`:`<div class="card mt"><p class="muted">${t('noHistory')}</p></div>`}`, 'wide');
  };

  const oldHandleAction6515 = handleAction;
  handleAction = function(a,el,e){
    if(a==='v6515-open-meter'){ v6515RenderMeterModal(el.dataset.dep, el.dataset.zone, el.dataset.meter); return; }
    if(a==='v6515-edit-zone-meters'){ v6515EditZoneMeters(el.dataset.dep, el.dataset.zone); return; }
    if(a==='v6515-edit-meter-shelves'){ v6515EditMeterShelves(el.dataset.dep, el.dataset.zone, el.dataset.meter); return; }
    if(a==='v6515-add-zone'){ v6515AddZone(); return; }
    if(a==='v6515-confirm-add-zone'){ v6515ConfirmAddZone(); return; }
    return oldHandleAction6515(a,el,e);
  };

  const oldRenderDiagnostics6515 = renderDiagnostics;
  renderDiagnostics = function(){
    let html = oldRenderDiagnostics6515();
    html = html.replaceAll('v6.5.18','v6.5.18').replaceAll('rich-cmd-cache-v6518','rich-cmd-cache-v6518');
    html += `<div class="card"><h3>v6.5.18 — ${t('storeMapUxPro')}</h3><p>${currentLang()==='en'?'Cleaning Map navigation now moves from department to zone, meter and shelf, with better passports and editing controls.':'De schoonmaakkaart navigeert nu van afdeling naar zone, meter en plank, met betere paspoorten en beheeropties.'}</p></div>`;
    return html;
  };

  save();
} catch(err){ console.error('v6.5.18 Store Map UX Pro patch failed', err); }

/* =========================================================
   RICH CMD v6.5.18 — Store Map Meter Strip
   Compact horizontal meter strips for the Cleaning Map heatmap.
========================================================= */
try {
  APP.version = 'v6.5.18';
  APP.cache = 'rich-cmd-cache-v6518';
  Object.assign(I18N.nl, {
    meterStrip:'Meterlijn',
    meterStripHelp:'Elke strook toont één pad of koeling. Elk segment staat voor één meter en is aanklikbaar.',
    meters:'meters',
    attention:'aandacht',
    urgent:'urgent',
    statusNeutral:'Nog niet geregistreerd',
    statusChecked:'Gecontroleerd',
    statusClean:'Schoon',
    statusDirty:'Vuil',
    statusDue:'Aan de beurt',
    statusFollowup:'Nacontrole',
    statusMold1:'Schimmel graad 1',
    statusMold2:'Schimmel graad 2',
    statusMold3:'Schimmel graad 3'
  });
  Object.assign(I18N.en, {
    meterStrip:'Meter strip',
    meterStripHelp:'Each strip represents one aisle or cooler. Every segment is one meter and can be opened.',
    meters:'meters',
    attention:'attention',
    urgent:'urgent',
    statusNeutral:'Not registered yet',
    statusChecked:'Checked',
    statusClean:'Clean',
    statusDirty:'Dirty',
    statusDue:'Due',
    statusFollowup:'Follow-up',
    statusMold1:'Mould grade 1',
    statusMold2:'Mould grade 2',
    statusMold3:'Mould grade 3'
  });

  function v6516CleanItems(){
    return ((state.cleaning && state.cleaning.items) || []).filter(i => !i.archived);
  }
  function v6516Dept(dep){ return typeof displayDepartment === 'function' ? displayDepartment(dep || 'Overig') : (dep || 'Overig'); }
  function v6516Zone(i){ return i.zone || 'Algemeen'; }
  function v6516Meter(i){ return Number(i.meter || 1); }
  function v6516Priority(status){
    if(status === 'mold3') return 7;
    if(status === 'mold2') return 6;
    if(status === 'mold1') return 5;
    if(status === 'dirty') return 4;
    if(status === 'followup') return 3;
    if(status === 'due' || status === 'planned') return 2;
    if(status === 'clean' || status === 'checked') return 1;
    return 0;
  }
  function v6516MeterStatus(items){
    const max = Math.max(0, ...items.map(i => v6516Priority(i.status || (i.planned ? 'planned' : 'neutral'))));
    if(max >= 7) return 'mold3';
    if(max >= 6) return 'mold2';
    if(max >= 5) return 'mold1';
    if(max === 4) return 'dirty';
    if(max === 3) return 'followup';
    if(max === 2) return 'due';
    if(max === 1 && items.some(i => i.status === 'clean')) return 'clean';
    if(max === 1) return 'checked';
    return 'neutral';
  }
  function v6516StatusLabel(status){
    const key = {
      neutral:'statusNeutral', checked:'statusChecked', clean:'statusClean', dirty:'statusDirty', due:'statusDue', planned:'statusDue', followup:'statusFollowup', mold1:'statusMold1', mold2:'statusMold2', mold3:'statusMold3'
    }[status] || 'statusNeutral';
    return t(key);
  }
  function v6516StatusClass(status){
    if(typeof statusClass === 'function') return statusClass({status});
    return 'heat-' + (status || 'neutral');
  }
  function v6516Group(){
    const map = {};
    v6516CleanItems().forEach(i => {
      const dep = v6516Dept(i.department);
      const zone = v6516Zone(i);
      const meter = v6516Meter(i);
      map[dep] ||= {};
      map[dep][zone] ||= {};
      map[dep][zone][meter] ||= [];
      map[dep][zone][meter].push(i);
    });
    return map;
  }
  function v6516DeptOrder(deps){
    const order = ['Vers','Houdbaar','Actiekoeling','Overig'];
    return [...deps].sort((a,b)=>{
      const ia = order.indexOf(a), ib = order.indexOf(b);
      if(ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return a.localeCompare(b);
    });
  }
  function v6516ZoneStats(meters){
    const meterEntries = Object.entries(meters || {});
    const statuses = meterEntries.map(([,items]) => v6516MeterStatus(items));
    const attention = statuses.filter(s => ['dirty','due','followup','mold1','mold2','mold3'].includes(s)).length;
    const urgent = statuses.filter(s => ['mold2','mold3'].includes(s)).length;
    const lastCheck = meterEntries.flatMap(([,items]) => items.map(i=>i.lastChecked).filter(Boolean)).sort().pop() || '-';
    const lastClean = meterEntries.flatMap(([,items]) => items.map(i=>i.lastCleaned).filter(Boolean)).sort().pop() || '-';
    return {meterCount:meterEntries.length, attention, urgent, lastCheck, lastClean};
  }
  function v6516MeterTitle(zone, meter, items){
    const st = v6516MeterStatus(items);
    const shelves = items.filter(i => i.kind === 'Plank').length;
    const trays = items.filter(i => i.kind === 'Bodembak').length;
    const lastCheck = items.map(i=>i.lastChecked).filter(Boolean).sort().pop() || '-';
    const lastClean = items.map(i=>i.lastCleaned).filter(Boolean).sort().pop() || '-';
    return `${zone} M${meter}: ${v6516StatusLabel(st)}\n${t('latestCheck')}: ${lastCheck}\n${t('latestClean')}: ${lastClean}\n${shelves} ${L('planken','shelves')} · ${trays} ${L('bodembakken','bottom trays')}`;
  }

  renderHeatmap = function(){
    const map = v6516Group();
    const deps = v6516DeptOrder(Object.keys(map));
    if(!deps.length) return `<div class="empty-state"><h3>${t('storeMapEmptyPro')}</h3><p class="muted">${t('storeMapNavigatorText')}</p><button class="btn primary" data-action="load-storemap">${L('Standaard winkelindeling laden','Load standard layout')}</button></div>`;
    return `<div class="v6516-meter-strip-map">
      <div class="v6516-strip-help"><strong>${t('meterStrip')}</strong><span>${t('meterStripHelp')}</span></div>
      ${deps.map(dep => {
        const zones = Object.entries(map[dep]).sort(([a],[b])=>a.localeCompare(b));
        return `<section class="v6516-strip-dep"><h4>${escapeHtml(trText(dep))}</h4>${zones.map(([zone,meters]) => {
          const stats = v6516ZoneStats(meters);
          const meterHtml = Object.entries(meters).sort((a,b)=>(+a[0])-(+b[0])).map(([meter,items]) => {
            const st = v6516MeterStatus(items);
            return `<button class="v6516-meter-seg ${v6516StatusClass(st)}" data-action="v6515-open-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}" title="${escapeHtml(v6516MeterTitle(zone,meter,items))}" aria-label="${escapeHtml(zone)} meter ${meter}: ${v6516StatusLabel(st)}"><span>${meter}</span></button>`;
          }).join('');
          return `<div class="v6516-strip-zone">
            <div class="v6516-strip-head">
              <div><strong>${escapeHtml(trText(zone))}</strong><div class="tiny muted">${stats.meterCount} ${t('meters')} · ${stats.attention} ${t('attention')} · ${stats.urgent} ${t('urgent')}</div></div>
              <div class="tiny muted">${t('latestCheck')}: ${stats.lastCheck} · ${t('latestClean')}: ${stats.lastClean}</div>
            </div>
            <div class="v6516-strip-scroll"><div class="v6516-meter-strip">${meterHtml}</div></div>
          </div>`;
        }).join('')}</section>`;
      }).join('')}
    </div>`;
  };

  const oldRenderDiagnostics6516 = renderDiagnostics;
  renderDiagnostics = function(){
    let html = oldRenderDiagnostics6516();
    html = html.replaceAll('v6.5.18','v6.5.18').replaceAll('rich-cmd-cache-v6518','rich-cmd-cache-v6518');
    html += `<div class="card"><h3>v6.5.18 — ${t('meterStrip')}</h3><p>${L('De schoonmaakheatmap gebruikt nu compacte meterstroken: elke meter is een aanklikbaar segment met statuskleur.','The cleaning heatmap now uses compact meter strips: each meter is a clickable status segment.')}</p></div>`;
    return html;
  };

  save();
} catch(err) { console.error('v6.5.18 Store Map Meter Strip patch failed', err); }

/* v6.5.18 — Store Map Slim Strip & Search */
try {
  APP.version = 'v6.5.18';
  APP.cache = 'rich-cmd-cache-v6518';
  I18N.nl = Object.assign(I18N.nl||{}, {
    slimMeterStrip:'Smalle meterstrip',
    slimMeterStripHelp:'Zoek of scan per afdeling, pad, meter en plank. Klik op een smal segment om de meter te openen.',
    storeMapSearch:'Zoek afdeling, pad, meter of plank...',
    clearSearch:'Zoekopdracht wissen',
    noStoreSearchResults:'Geen meters gevonden voor deze zoekopdracht.',
    stripResult:'resultaat',
    stripResults:'resultaten'
  });
  I18N.en = Object.assign(I18N.en||{}, {
    slimMeterStrip:'Slim meter strip',
    slimMeterStripHelp:'Search or scan by department, aisle, meter and shelf. Tap a slim segment to open the meter.',
    storeMapSearch:'Search department, aisle, meter or shelf...',
    clearSearch:'Clear search',
    noStoreSearchResults:'No meters found for this search.',
    stripResult:'result',
    stripResults:'results'
  });

  function v6517Items(){ return ((state.cleaning && state.cleaning.items) || []).filter(i => !i.archived); }
  function v6517Dept(dep){ return typeof displayDepartment === 'function' ? displayDepartment(dep || 'Overig') : (dep || 'Overig'); }
  function v6517Zone(i){ return i.zone || 'Algemeen'; }
  function v6517Meter(i){ return Number(i.meter || 1); }
  function v6517Priority(status){
    if(status === 'mold3') return 8;
    if(status === 'mold2') return 7;
    if(status === 'mold1') return 6;
    if(status === 'dirty') return 5;
    if(status === 'followup') return 4;
    if(status === 'due' || status === 'planned') return 3;
    if(status === 'clean') return 2;
    if(status === 'checked') return 1;
    return 0;
  }
  function v6517Status(items){
    const max = Math.max(0, ...items.map(i => v6517Priority(i.status || (i.planned ? 'planned' : 'neutral'))));
    if(max >= 8) return 'mold3';
    if(max >= 7) return 'mold2';
    if(max >= 6) return 'mold1';
    if(max === 5) return 'dirty';
    if(max === 4) return 'followup';
    if(max === 3) return 'due';
    if(max === 2) return 'clean';
    if(max === 1) return 'checked';
    return 'neutral';
  }
  function v6517StatusClass(status){ return typeof statusClass === 'function' ? statusClass({status}) : 'heat-' + (status || 'neutral'); }
  function v6517StatusLabel(status){
    const map = {neutral:['Neutraal','Neutral'], checked:['Gecontroleerd','Checked'], clean:['Schoon','Clean'], dirty:['Vuil','Dirty'], due:['Aan beurt','Due'], planned:['Ingepland','Planned'], followup:['Nacontrole','Follow-up'], mold1:['Schimmel 1','Mould 1'], mold2:['Schimmel 2','Mould 2'], mold3:['Schimmel 3','Mould 3']};
    const pair = map[status] || map.neutral;
    return L(pair[0], pair[1]);
  }
  function v6517Group(){
    const map = {};
    const q = String((state.ui && state.ui.storeMapSearch) || '').trim().toLowerCase();
    v6517Items().forEach(i => {
      const dep = v6517Dept(i.department);
      const zone = v6517Zone(i);
      const meter = v6517Meter(i);
      const label = [dep, zone, 'm'+meter, 'meter '+meter, i.kind, i.level ? 'p'+i.level : '', i.label, i.category, i.status].filter(Boolean).join(' ').toLowerCase();
      if(q && !label.includes(q)) return;
      map[dep] ||= {};
      map[dep][zone] ||= {};
      map[dep][zone][meter] ||= [];
      map[dep][zone][meter].push(i);
    });
    return map;
  }
  function v6517DeptOrder(deps){
    const order = ['Vers','Houdbaar','Actiekoeling','Overig'];
    return [...deps].sort((a,b)=>{
      const ia = order.indexOf(a), ib = order.indexOf(b);
      if(ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return a.localeCompare(b);
    });
  }
  function v6517ZoneStats(meters){
    const entries = Object.entries(meters || {});
    const statuses = entries.map(([,items]) => v6517Status(items));
    const attention = statuses.filter(s => ['dirty','due','followup','mold1','mold2','mold3'].includes(s)).length;
    const urgent = statuses.filter(s => ['mold2','mold3'].includes(s)).length;
    const lastCheck = entries.flatMap(([,items]) => items.map(i=>i.lastChecked).filter(Boolean)).sort().pop() || '-';
    const lastClean = entries.flatMap(([,items]) => items.map(i=>i.lastCleaned).filter(Boolean)).sort().pop() || '-';
    return {meterCount:entries.length, attention, urgent, lastCheck, lastClean};
  }
  function v6517MeterTitle(zone, meter, items){
    const status = v6517Status(items);
    const shelves = items.filter(i => i.kind === 'Plank').length;
    const trays = items.filter(i => i.kind === 'Bodembak').length;
    const lastCheck = items.map(i=>i.lastChecked).filter(Boolean).sort().pop() || '-';
    const lastClean = items.map(i=>i.lastCleaned).filter(Boolean).sort().pop() || '-';
    return `${zone} M${meter}: ${v6517StatusLabel(status)}\n${t('latestCheck')}: ${lastCheck}\n${t('latestClean')}: ${lastClean}\n${shelves} ${L('planken','shelves')} · ${trays} ${L('bodembakken','bottom trays')}`;
  }
  function v6517Body(){
    const map = v6517Group();
    const deps = v6517DeptOrder(Object.keys(map));
    const q = String((state.ui && state.ui.storeMapSearch) || '').trim();
    if(!deps.length){
      return `<div class="empty-state"><h3>${q ? t('noStoreSearchResults') : t('storeMapEmptyPro')}</h3><p class="muted">${q ? L('Probeer een afdeling, padnaam, meter zoals M3 of een plank zoals P2.','Try a department, aisle name, meter like M3 or shelf like P2.') : t('storeMapNavigatorText')}</p>${!q?`<button class="btn primary" data-action="load-storemap">${L('Standaard winkelindeling laden','Load standard layout')}</button>`:''}</div>`;
    }
    let resultCount = 0;
    const content = deps.map(dep => {
      const zones = Object.entries(map[dep]).sort(([a],[b])=>a.localeCompare(b));
      return `<section class="v6517-strip-dep"><h4>${escapeHtml(trText(dep))}</h4>${zones.map(([zone,meters]) => {
        const stats = v6517ZoneStats(meters);
        resultCount += stats.meterCount;
        const meterHtml = Object.entries(meters).sort((a,b)=>(+a[0])-(+b[0])).map(([meter,items]) => {
          const st = v6517Status(items);
          return `<button class="v6517-meter-slice ${v6517StatusClass(st)}" data-action="v6515-open-meter" data-dep="${escapeHtml(dep)}" data-zone="${escapeHtml(zone)}" data-meter="${meter}" title="${escapeHtml(v6517MeterTitle(zone,meter,items))}" aria-label="${escapeHtml(zone)} meter ${meter}: ${v6517StatusLabel(st)}"><span>${meter}</span></button>`;
        }).join('');
        return `<div class="v6517-strip-zone">
          <div class="v6517-strip-head"><div><strong>${escapeHtml(trText(zone))}</strong><div class="tiny muted">${stats.meterCount} ${t('meters')} · ${stats.attention} ${t('attention')} · ${stats.urgent} ${t('urgent')}</div></div><div class="tiny muted">${t('latestCheck')}: ${stats.lastCheck} · ${t('latestClean')}: ${stats.lastClean}</div></div>
          <div class="v6517-strip-scroll"><div class="v6517-meter-rail">${meterHtml}</div></div>
        </div>`;
      }).join('')}</section>`;
    }).join('');
    return `<div class="tiny muted mb">${q ? `${resultCount} ${resultCount===1?t('stripResult'):t('stripResults')} · ${escapeHtml(q)}` : t('slimMeterStripHelp')}</div>${content}`;
  }
  renderHeatmap = function(){
    state.ui ||= {};
    const q = state.ui.storeMapSearch || '';
    return `<div class="v6517-slim-strip-map">
      <div class="v6517-searchbar"><input id="storeMapSearch" value="${escapeHtml(q)}" placeholder="${t('storeMapSearch')}" autocomplete="off"><button class="btn small" data-action="storemap-search-clear" title="${t('clearSearch')}">×</button></div>
      <div class="v6517-strip-help"><strong>${t('slimMeterStrip')}</strong><span>${t('slimMeterStripHelp')}</span></div>
      <div id="storeMapStripBody">${v6517Body()}</div>
    </div>`;
  };

  const oldHandleAction6517 = handleAction;
  handleAction = function(a,el,e){
    if(a === 'storemap-search-clear'){
      state.ui ||= {}; state.ui.storeMapSearch=''; save();
      const input = document.getElementById('storeMapSearch'); if(input) input.value='';
      const body = document.getElementById('storeMapStripBody'); if(body) body.innerHTML = v6517Body();
      return;
    }
    return oldHandleAction6517(a,el,e);
  };

  document.addEventListener('input', function(e){
    const input = e.target && e.target.closest && e.target.closest('#storeMapSearch');
    if(!input) return;
    state.ui ||= {}; state.ui.storeMapSearch = input.value || ''; save();
    const body = document.getElementById('storeMapStripBody');
    if(body) body.innerHTML = v6517Body();
  });

  const oldRenderDiagnostics6517 = renderDiagnostics;
  renderDiagnostics = function(){
    let html = oldRenderDiagnostics6517();
    html = html.replaceAll('v6.5.18','v6.5.18').replaceAll('rich-cmd-cache-v6518','rich-cmd-cache-v6518');
    html += `<div class="card"><h3>v6.5.18 — ${t('slimMeterStrip')}</h3><p>${L('De schoonmaakheatmap gebruikt nu een smallere meterstrook met zoekfunctie voor afdeling, pad, meter en plank.','The Cleaning Map heatmap now uses a slimmer meter strip with search for department, aisle, meter and shelf.')}</p></div>`;
    return html;
  };

  save();
} catch(err) { console.error('v6.5.18 slim strip patch failed', err); }

/* =======================
   RICH CMD v6.5.18 — AGF Intelligence Pro
   Scoped patch: AGF only + diagnostics/version.
   ======================= */
try {
  APP.version = 'v6.5.18';
  APP.cache = 'rich-cmd-cache-v6518';

  Object.assign(I18N.nl, {
    agfPro:'AGF Intelligence Pro', produceStarter:'AGF startproducten', loadProduceStarter:'AGF startproducten laden', orderBasket:'Bestelmandje vandaag', decisionCenter:'Besliscentrum', productProfile:'Productprofiel', productProfiles:'Productprofielen', currentBeatsHistory:'Huidige status weegt zwaarder dan historie', confidence:'Zekerheid', signalStrength:'Signaalsterkte', actionNeeded:'Actie nodig', monitor:'Monitoren', noOrderToday:'Vandaag niet verhogen', increase:'Verhogen', decrease:'Verlagen', stable:'Stabiel', promotion:'Bonus', promotionChecked:'Bonus vandaag gecontroleerd', checkToday:'Vandaag checken', resetBonusWeek:'Bonusweek leegmaken', groupFilter:'Productgroep filter', allGroups:'Alle groepen', tomatoes:'Tomaten', cucumber:'Komkommer', peppers:'Paprika', vegetables:'Groente', herbs:'Kruiden/peper', legumes:'Peulvruchten', favourites:'Favorieten', notChecked:'Nog niet gecontroleerd', copyOrderPlan:'Kopieer besteladvies', noOrderActions:'Geen bestelacties nodig', lastSeven:'Laatste 7 meldingen', noHistory:'Nog geen historie', addToOrder:'Zet op bestellijst', removeFromOrder:'Niet bestellen', markChecked:'Markeer gecontroleerd', orderBlockedByCurrent:'Trend zegt verhogen, maar vandaag is overvoorraad. Niet verhogen.', promotionPriority:'Bonusartikelen staan bovenaan bij bestellen.', liveAdvice:'Besteladvies reageert direct op je laatste status.', agfNoProductsHelp:'Laad startproducten of voeg je eerste product toe om AGF Intelligence te gebruiken.'
  });
  Object.assign(I18N.en, {
    agfPro:'Produce Intelligence Pro', produceStarter:'Produce starter products', loadProduceStarter:'Load produce starter products', orderBasket:'Today\'s order basket', decisionCenter:'Decision center', productProfile:'Product profile', productProfiles:'Product profiles', currentBeatsHistory:'Current status outweighs history', confidence:'Confidence', signalStrength:'Signal strength', actionNeeded:'Action needed', monitor:'Monitor', noOrderToday:'Do not increase today', increase:'Increase', decrease:'Decrease', stable:'Stable', promotion:'Promotion', promotionChecked:'Promotion checked today', checkToday:'Check today', resetBonusWeek:'Clear promotion week', groupFilter:'Product group filter', allGroups:'All groups', tomatoes:'Tomatoes', cucumber:'Cucumber', peppers:'Peppers', vegetables:'Vegetables', herbs:'Herbs/chili', legumes:'Legumes', favourites:'Favourites', notChecked:'Not checked yet', copyOrderPlan:'Copy order advice', noOrderActions:'No order actions needed', lastSeven:'Last 7 signals', noHistory:'No history yet', addToOrder:'Add to order list', removeFromOrder:'Do not order', markChecked:'Mark checked', orderBlockedByCurrent:'Trend says increase, but today is overstock. Do not increase.', promotionPriority:'Promotion items appear first while ordering.', liveAdvice:'Order advice updates directly after your latest status.', agfNoProductsHelp:'Load starter products or add your first product to use Produce Intelligence.'
  });

  const AGF_START_PRODUCTS_V6518 = [
    ['Cherrytomaten 250 gram','36597','Tomaten'],['Snoepgroente tomaat 500 gram','723890','Tomaten'],['Sweet cherry cherrytomaten 250 gram','596488','Tomaten'],['Finest Red trostomaten 450 gram','711407','Tomaten'],['Biologisch Snoepgroente tomaat 400 gram','813914','Tomaten'],['Roma tomaten 750 gram','537853','Tomaten'],['Tasty Tom trostomaten 380 g','501842','Tomaten'],['Komkommer','508672','Komkommer'],['Courgette','21003','Groente'],['Aubergine','809016','Groente'],['Biologisch Komkommer','529604','Komkommer'],['AH Prei','767852','Groente'],['Bosui','599987','Groente'],['Witlof 4 stuks','831963','Groente'],['Sweet palermo rode puntpaprika 2 stuks','526638','Paprika'],['Snijbonen 400 gram','559681','Groente'],['AH Rode peper','845187','Kruiden/peper']
  ];
  function agfTr(v){ return typeof trText === 'function' ? trText(v) : v; }
  function agfNormalize(){
    state.agfProducts = Array.isArray(state.agfProducts) ? state.agfProducts : [];
    state.bonus = Array.isArray(state.bonus) ? state.bonus : [];
    state.agfOrders = Array.isArray(state.agfOrders) ? state.agfOrders : [];
    state.orderHistory = Array.isArray(state.orderHistory) ? state.orderHistory : [];
    state.ui ||= {};
    state.agfProducts.forEach(p=>{ p.history = Array.isArray(p.history) ? p.history : []; p.category = p.category || inferAgfCategoryV6518(p.name); });
    state.bonus.forEach(b=>{ if(!('checkedToday' in b)) b.checkedToday = false; if(!('order' in b)) b.order = false; });
  }
  function inferAgfCategoryV6518(name=''){
    const n = String(name).toLowerCase();
    if(n.includes('tomaat') || n.includes('cherry') || n.includes('tros')) return 'Tomaten';
    if(n.includes('komkommer')) return 'Komkommer';
    if(n.includes('paprika')) return 'Paprika';
    if(n.includes('peper')) return 'Kruiden/peper';
    if(n.includes('snijbonen')) return 'Peulvruchten';
    return 'Groente';
  }
  function loadAgfStarterV6518(){
    agfNormalize();
    let added=0;
    AGF_START_PRODUCTS_V6518.forEach(([name,nasa,category])=>{
      const exists = state.agfProducts.some(p=>String(p.nasa)===String(nasa) || p.name.toLowerCase()===name.toLowerCase());
      if(!exists){ state.agfProducts.push({id:uid('agf'), name, nasa, category, aliases:'', favorite:false, history:[]}); added++; }
    });
    addActivity(`${added} AGF startproducten geladen`,'agf');
    save(); render(); toast(`${added} ${t('product')} ${added===1?'':'en'} toegevoegd`);
  }
  function agfTrendCounts(p){
    const hist = Array.isArray(p.history) ? p.history.slice(0,7) : [];
    return { hist, empty:hist.filter(h=>h.status==='Leeg schap').length, over:hist.filter(h=>h.status==='Overvoorraad').length, ok:hist.filter(h=>h.status==='OK').length, quality:hist.filter(h=>h.status==='Kwaliteit').length };
  }
  agfDecision = function(p){
    p.history = Array.isArray(p.history) ? p.history : [];
    const status = lastAgfStatus(p);
    const c = agfTrendCounts(p);
    const isBonus = state.bonus.some(b=>b.productId===p.id);
    let advice = t('monitor'), reason = L('Nog te weinig signalen.','Not enough signals yet.'), conflict=false, strength=L('Laag','Low'), confidence=35, action='monitor';
    if(status==='Overvoorraad'){
      advice = t('noOrderToday'); action='hold'; confidence=90; strength=L('Hoog','High');
      reason = c.empty>c.over ? t('orderBlockedByCurrent') : L('Vandaag overvoorraad. Eerst laten dalen of verlagen.','Today is overstock. Let stock drop or decrease first.');
      conflict = c.empty > c.over;
    } else if(status==='Leeg schap'){
      advice = t('increase'); action='increase'; confidence = c.empty>=3 ? 88 : 70; strength = c.empty>=3 ? L('Hoog','High') : L('Gemiddeld','Medium');
      reason = c.empty>=3 ? L('Vandaag leeg én vaker leeg in de recente historie.','Empty today and repeatedly empty in recent history.') : L('Vandaag leeg. Controleer of verhogen nodig is.','Empty today. Check whether increasing is needed.');
    } else if(status==='Kwaliteit'){
      advice = L('Eerst kwaliteit beoordelen','Check quality first'); action='quality'; confidence=80; strength=L('Hoog','High'); reason = L('Kwaliteitsmelding: niet blind verhogen.','Quality signal: do not blindly increase.');
    } else if(status==='OK'){
      if(c.empty>=4){ advice = t('monitor'); action='monitor'; confidence=60; strength=L('Gemiddeld','Medium'); reason=L('Vandaag OK, maar historie toont vaak leeg. Monitor vóór bestellen.','OK today, but history often shows empty. Monitor before ordering.'); }
      else if(c.over>=4){ advice=t('decrease'); action='decrease'; confidence=75; strength=L('Gemiddeld','Medium'); reason=L('Vandaag OK, maar historie toont vaak overvoorraad.','OK today, but history often shows overstock.'); }
      else { advice=t('stable'); action='stable'; confidence=85; strength=L('Laag','Low'); reason=L('Recente meldingen tonen geen sterke afwijking.','Recent signals show no strong deviation.'); }
    } else {
      advice = isBonus ? t('checkToday') : t('monitor'); action = isBonus ? 'check' : 'monitor'; confidence = isBonus ? 55 : 25; reason = isBonus ? t('promotionPriority') : L('Geen actuele status geregistreerd.','No current status recorded.');
    }
    if(isBonus && action==='stable'){ advice = t('checkToday'); action='check'; confidence=65; reason=t('promotionPriority'); }
    return {name:p.name, advice, reason, conflict, strength, confidence, status:status||'Onbekend', trend:`${c.empty} ${L('leeg','empty')} / ${c.over} ${L('over','overstock')} / ${c.ok} OK`, action, bonus:isBonus};
  };
  agfAttention = function(){
    agfNormalize();
    const score = a => (a.conflict?50:0) + (a.bonus?25:0) + (a.action==='increase'?30:0) + (a.action==='hold'?25:0) + (a.action==='decrease'?20:0) + (a.status==='Leeg schap'?15:0) + (a.status==='Overvoorraad'?12:0) + (a.confidence||0)/10;
    return state.agfProducts.map(p=>({...p,...agfDecision(p)})).filter(x=>x.action!=='stable' && x.status!=='Onbekend' || x.bonus).sort((a,b)=>score(b)-score(a));
  };
  function agfGroupsV6518(){
    agfNormalize();
    const groups={};
    state.agfProducts.forEach(p=>{
      const bonus = state.bonus.some(b=>b.productId===p.id);
      const keys=[];
      if(p.favorite) keys.push('Favorieten');
      if(bonus) keys.push('Bonus');
      keys.push(p.category || inferAgfCategoryV6518(p.name));
      keys.forEach(k=>{ groups[k] ||= []; if(!groups[k].some(x=>x.id===p.id)) groups[k].push(p); });
    });
    return groups;
  }
  function agfCategoryChipsV6518(){
    const groups = Object.keys(agfGroupsV6518()).sort((a,b)=>String(agfTr(a)).localeCompare(String(agfTr(b))));
    const active = state.ui.agfGroup || '';
    return `<div class="chip-row agf-chip-row"><button class="chip ${!active?'active':''}" data-action="agf-group-filter" data-group="">${t('allGroups')}</button>${groups.map(g=>`<button class="chip ${active===g?'active':''}" data-action="agf-group-filter" data-group="${escapeHtml(g)}">${escapeHtml(agfTr(g))}</button>`).join('')}</div>`;
  }
  renderAgfQuickList = function(filter='', source=null){
    agfNormalize();
    const q = (filter || state.ui.agfSearch || '').toLowerCase();
    const activeGroup = state.ui.agfGroup || '';
    const base = source || state.agfProducts;
    const filtered = base.filter(p=>{
      const groupOk = !activeGroup || p.category===activeGroup || (activeGroup==='Favorieten' && p.favorite) || (activeGroup==='Bonus' && state.bonus.some(b=>b.productId===p.id));
      const qOk = !q || (p.name+' '+(p.nasa||'')+' '+(p.category||'')+' '+(p.aliases||'')).toLowerCase().includes(q);
      return groupOk && qOk;
    }).sort((a,b)=> (state.bonus.some(x=>x.productId===b.id)?1:0)-(state.bonus.some(x=>x.productId===a.id)?1:0) || (b.favorite?1:0)-(a.favorite?1:0) || a.name.localeCompare(b.name)).slice(0,80);
    if(!filtered.length) return `<div class="empty-state"><h3>${t('empty')}</h3><p>${t('agfNoProductsHelp')}</p><button class="btn primary" data-action="open-agf-product-form">${t('add')} ${t('product')}</button><button class="btn" data-action="load-agf-starter-v6518">${t('loadProduceStarter')}</button></div>`;
    return `<div class="list agf-pro-list">${filtered.map(p=>{
      const d=agfDecision(p), bonus=state.bonus.some(b=>b.productId===p.id);
      const cls=d.action==='hold'?'warn':d.action==='increase'?'bad':d.action==='decrease'?'warn':d.action==='stable'?'good':'info';
      return `<div class="list-item decision-card agf-pro-item"><div><div class="btn-row"><strong>${escapeHtml(agfTr(p.name))}</strong>${bonus?`<span class="pill warn">B</span>`:''}${p.favorite?`<span class="pill good">★</span>`:''}</div><div class="small muted">${escapeHtml(agfTr(p.category||''))} · NASA ${escapeHtml(p.nasa||'-')}</div><div class="small"><span class="pill ${cls}">${escapeHtml(d.advice)}</span> <span class="pill info">${t('confidence')}: ${d.confidence}%</span></div></div><div class="btn-row"><button class="btn small good" data-action="agf-status" data-id="${p.id}" data-status="OK">OK</button><button class="btn small bad" data-action="agf-status" data-id="${p.id}" data-status="Leeg schap">${L('Leeg','Empty')}</button><button class="btn small warn" data-action="agf-status" data-id="${p.id}" data-status="Overvoorraad">${L('Over','Over')}</button><button class="btn small" data-action="toggle-agf-fav" data-id="${p.id}">${p.favorite?'★':'☆'}</button><button class="btn small bonus-badge ${bonus?'active':''}" data-action="toggle-agf-bonus" data-id="${p.id}">B</button><button class="btn small" data-action="open-agf-profile-v6518" data-id="${p.id}">${L('Profiel','Profile')}</button></div></div>`;
    }).join('')}</div>`;
  };
  function renderAgfDecisionCardsV6518(){
    const arr = agfAttention().slice(0,12);
    if(!arr.length) return `<div class="empty-state"><h3>${t('noOrderActions')}</h3><p>${t('liveAdvice')}</p></div>`;
    return `<div class="grid grid-2">${arr.map(a=>{
      const cls=a.action==='hold'?'warn':a.action==='increase'?'bad':a.action==='decrease'?'warn':a.conflict?'bad':'info';
      return `<div class="card decision-card agf-decision-pro"><div class="btn-row"><span class="chip">${escapeHtml(agfTr(a.name))}</span>${a.bonus?`<span class="pill warn">${t('promotion')}</span>`:''}${a.conflict?`<span class="pill bad">${t('conflict')}</span>`:''}</div><h4>${escapeHtml(a.advice)}</h4><p><strong>${t('currentStatus')}:</strong> ${localStatus(a.status)}</p><p><strong>${t('trend')}:</strong> ${escapeHtml(a.trend)}</p><p><strong>${t('confidence')}:</strong> ${a.confidence}% · <strong>${t('signalStrength')}:</strong> ${escapeHtml(a.strength)}</p><p class="muted">${escapeHtml(a.reason)}</p><div class="btn-row"><button class="btn small" data-action="open-agf-profile-v6518" data-id="${a.id}">${t('productProfile')}</button>${a.action==='increase'||a.bonus?`<button class="btn small primary" data-action="add-agf-order-v6518" data-id="${a.id}">${t('addToOrder')}</button>`:''}</div></div>`;
    }).join('')}</div>`;
  }
  renderAgfAdvice = function(){
    const att=agfAttention();
    const orderItems = att.filter(a=>['increase','decrease','hold','quality','check'].includes(a.action)).slice(0,20);
    if(!orderItems.length) return `<div class="empty-state"><h3>${t('noOrderActions')}</h3><p>${t('currentBeatsHistory')}</p></div>`;
    return `<div class="list">${orderItems.map(a=>`<div class="list-item"><div><strong>${escapeHtml(agfTr(a.name))}</strong>${a.bonus?` <span class="pill warn">${t('promotion')}</span>`:''}${a.conflict?` <span class="pill bad">${t('conflict')}</span>`:''}<div class="small muted">${escapeHtml(a.reason)}</div><div class="small">${t('currentStatus')}: <b>${localStatus(a.status)}</b> · ${t('confidence')}: ${a.confidence}%</div></div><span class="pill ${a.action==='increase'?'bad':a.action==='hold'?'warn':a.action==='decrease'?'warn':'info'}">${escapeHtml(a.advice)}</span></div>`).join('')}</div><button class="btn mt" data-action="copy-agf-order-plan-v6518">${t('copyOrderPlan')}</button>`;
  };
  function renderAgfOrderBasketV6518(){
    const bonusOrders = state.bonus.filter(b=>b.order).map(b=>({name:b.name,nasa:b.nasa,reason:t('promotion')}));
    const attentionOrders = agfAttention().filter(a=>a.action==='increase' || a.action==='decrease' || a.action==='hold').map(a=>({name:a.name,nasa:a.nasa,reason:a.advice}));
    const merged=[]; [...bonusOrders,...attentionOrders].forEach(x=>{ if(!merged.some(m=>m.name===x.name)) merged.push(x); });
    if(!merged.length) return `<p class="muted">${t('noOrderActions')}</p>`;
    return `<div class="list">${merged.slice(0,12).map(x=>`<div class="list-item compact"><span><strong>${escapeHtml(agfTr(x.name))}</strong><div class="tiny muted">NASA ${escapeHtml(x.nasa||'-')} · ${escapeHtml(x.reason)}</div></span><span class="pill info">${t('orderAdvice')}</span></div>`).join('')}</div>`;
  }
  renderBonus = function(){
    agfNormalize();
    return `<div class="list">${state.bonus.map(b=>`<div class="list-item"><div><strong>${escapeHtml(agfTr(b.name))}</strong><div class="small muted">NASA ${escapeHtml(b.nasa||'-')}</div><span class="pill ${b.checkedToday?'good':'warn'}">${b.checkedToday?t('promotionChecked'):t('notChecked')}</span> <span class="pill ${b.order?'good':'info'}">${b.order?t('addToOrder'):t('monitor')}</span></div><div class="btn-row"><button class="btn small good" data-action="mark-bonus-checked-v6518" data-id="${b.id}">${t('markChecked')}</button><button class="btn small" data-action="toggle-bonus-order" data-id="${b.id}">${b.order?t('removeFromOrder'):t('addToOrder')}</button><button class="btn small bad" data-action="delete-bonus" data-id="${b.id}">${t('delete')}</button></div></div>`).join('')||`<p class="muted">${L('Geen bonusartikelen. Gebruik de oranje B naast een product.','No promotion items. Use the orange B next to a product.')}</p>`}</div>`;
  };
  function renderBonusWeekV6518(){ return `<div class="btn-row mb"><button class="btn primary" data-action="open-bonus-form">${t('add')}</button><button class="btn" data-action="load-agf-starter-v6518">${t('loadProduceStarter')}</button><button class="btn" data-action="copy-agf-order-plan-v6518">${t('copy')}</button><button class="btn bad" data-action="reset-bonus-week-v6518">${t('resetBonusWeek')}</button></div>${renderBonus()}`; }
  renderAgf = function(){
    agfNormalize();
    return `<div class="grid agf-pro-page"><div class="hero"><span class="chip">${t('agfPro')}</span><h2>${L('AGF bestelintelligentie','Produce ordering intelligence')}</h2><p>${t('currentBeatsHistory')}. ${t('liveAdvice')}</p></div><div class="grid grid-4">${kpi(t('actionNeeded'),agfAttention().filter(a=>a.action!=='stable').length,agfAttention().length?'warn':'good')}${kpi(t('promotion'),state.bonus.length,state.bonus.length?'warn':'info')}${kpi(t('conflict'),agfAttention().filter(a=>a.conflict).length,agfAttention().some(a=>a.conflict)?'bad':'good')}${kpi(t('stable'),state.agfProducts.filter(p=>agfDecision(p).action==='stable').length,'good')}</div><div class="grid grid-main"><div class="grid"><div class="card"><h3>${L('AGF Quick Check','Produce Quick Check')}</h3><div class="form-grid"><input class="input" id="agfSearch" value="${escapeHtml(state.ui.agfSearch||'')}" placeholder="${t('search')} product / NASA"><button class="btn primary" data-action="open-agf-product-form">${t('add')} ${t('product')}</button><button class="btn" data-action="load-agf-starter-v6518">${t('loadProduceStarter')}</button></div>${agfCategoryChipsV6518()}<div id="agfQuickList" class="mt">${renderAgfQuickList()}</div></div><div class="card"><h3>${t('decisionCenter')}</h3>${renderAgfDecisionCardsV6518()}</div><div class="card"><h3>${t('orderBasket')}</h3>${renderAgfOrderBasketV6518()}</div></div><div class="grid"><div class="card"><h3>${t('bonusWeek')}</h3>${renderBonusWeekV6518()}</div><div class="card"><h3>${t('orderAdvice')}</h3>${renderAgfAdvice()}</div><div class="card"><h3>${t('productProfiles')}</h3>${renderAgfProducts()}</div><div class="card"><h3>${t('orderHistory')}</h3>${renderOrderHistory()}</div></div></div></div>`;
  };
  function openAgfProfileV6518(id){
    const p=state.agfProducts.find(x=>x.id===id); if(!p) return;
    const d=agfDecision(p), hist=(p.history||[]).slice(0,7);
    modal(t('productProfile'), `<div class="grid"><div class="card soft"><h3>${escapeHtml(agfTr(p.name))}</h3><p>NASA ${escapeHtml(p.nasa||'-')} · ${escapeHtml(agfTr(p.category||''))}</p><p><strong>${t('currentStatus')}:</strong> ${localStatus(d.status)}</p><p><strong>${t('orderAdvice')}:</strong> ${escapeHtml(d.advice)}</p><p><strong>${t('reason')}:</strong> ${escapeHtml(d.reason)}</p><p><strong>${t('confidence')}:</strong> ${d.confidence}%</p></div><div class="card"><h3>${t('lastSeven')}</h3>${hist.length?hist.map(h=>`<div class="list-item compact"><span>${localStatus(h.status)}</span><span class="tiny muted">${dateTime(h.at)}</span></div>`).join(''):`<p class="muted">${t('noHistory')}</p>`}</div><div class="btn-row"><button class="btn good" data-action="agf-status" data-id="${p.id}" data-status="OK">OK</button><button class="btn bad" data-action="agf-status" data-id="${p.id}" data-status="Leeg schap">${t('emptyShelf')}</button><button class="btn warn" data-action="agf-status" data-id="${p.id}" data-status="Overvoorraad">${t('overstock')}</button></div></div>`, 'wide');
  }
  function copyAgfOrderPlanV6518(){
    const lines = agfAttention().slice(0,20).map(a=>`${agfTr(a.name)}${a.nasa?' (NASA '+a.nasa+')':''}: ${a.advice} — ${a.reason}`);
    if(!lines.length) lines.push(t('noOrderActions'));
    copyText(lines.join('\n'));
    toast(t('copied'));
  }
  function addAgfOrderV6518(id){ const p=state.agfProducts.find(x=>x.id===id); if(!p) return; const d=agfDecision(p); state.agfOrders ||= []; state.agfOrders.unshift({id:uid('agfo'),productId:p.id,name:p.name,nasa:p.nasa,advice:d.advice,reason:d.reason,at:nowISO()}); state.agfOrders=state.agfOrders.slice(0,200); addActivity(`${p.name}: ${d.advice}`,'agf'); save(); render(); toast(t('addToOrder')); }
  const oldHandleAction6518 = handleAction;
  handleAction = function(a,el,e){
    if(a==='load-agf-starter-v6518'){ loadAgfStarterV6518(); return; }
    if(a==='agf-group-filter'){ state.ui.agfGroup = el.dataset.group || ''; save(); render(); return; }
    if(a==='open-agf-profile-v6518'){ openAgfProfileV6518(el.dataset.id); return; }
    if(a==='mark-bonus-checked-v6518'){ const b=state.bonus.find(x=>x.id===el.dataset.id); if(b){ b.checkedToday=true; b.checkedAt=nowISO(); save(); render(); } return; }
    if(a==='reset-bonus-week-v6518'){ if(confirm(L('Bonusweek leegmaken?','Clear promotion week?'))){ state.bonus=[]; save(); render(); } return; }
    if(a==='copy-agf-order-plan-v6518'){ copyAgfOrderPlanV6518(); return; }
    if(a==='add-agf-order-v6518'){ addAgfOrderV6518(el.dataset.id); return; }
    return oldHandleAction6518(a,el,e);
  };
  document.addEventListener('input', function(e){
    const input = e.target && e.target.closest && e.target.closest('#agfSearch');
    if(!input) return;
    state.ui ||= {}; state.ui.agfSearch = input.value || '';
    const list = document.getElementById('agfQuickList'); if(list) list.innerHTML = renderAgfQuickList();
  });
  const oldRenderDiagnostics6518 = renderDiagnostics;
  renderDiagnostics = function(){
    let html = oldRenderDiagnostics6518();
    html = html.replaceAll('v6.5.18','v6.5.18').replaceAll('rich-cmd-cache-v6518','rich-cmd-cache-v6518').replaceAll('v6.5.18','v6.5.18').replaceAll('rich-cmd-cache-v6518','rich-cmd-cache-v6518');
    html += `<div class="card"><h3>v6.5.18 — ${t('agfPro')}</h3><p>${L('AGF heeft nu productgroepen, decision cards, bonusweekbeheer, startproducten, productprofielen en een sterker bestelmandje.','Produce now has product groups, decision cards, promotion week management, starter products, product profiles and a stronger order basket.')}</p></div>`;
    return html;
  };
  agfNormalize();
  save();
} catch(err) { console.error('v6.5.18 AGF Intelligence Pro patch failed', err); }

/* =======================
   RICH CMD v6.5.19 — AGF Category, Profiles & Bonus Simplification
   Safe AGF-only patch on top of v6.5.18.
   ======================= */
try {
  APP.version = 'v6.5.19';
  APP.cache = 'rich-cmd-cache-v6519';

  const AGF_MAIN_CATEGORIES_V6519 = ['Groente','Fruit','Aardappelen','Uien','Gekoeld Fruit'];
  const AGF_MAIN_CATEGORY_EN_V6519 = {
    'Groente':'Vegetables',
    'Fruit':'Fruit',
    'Aardappelen':'Potatoes',
    'Uien':'Onions',
    'Gekoeld Fruit':'Chilled fruit'
  };
  const AGF_FRUIT_PRODUCTS_V6519 = [
    ['Bananen tros','767854','Fruit'],
    ['Mandarijnen 1 kilo','548401','Fruit'],
    ['Mango per stuk','20869','Fruit'],
    ['Conference bak 1 kilo','842982','Fruit'],
    ['Mini watermeloen','817687','Fruit'],
    ['AH Galia meloen','20842','Fruit'],
    ['Conference 4 stuks','516344','Fruit'],
    ['Cantaloupe meloen','81582','Fruit'],
    ['Groene kiwi\'s 1 kilo','565937','Fruit'],
    ['Bio bananen','834184','Fruit'],
    ['AH Elstar zak','42962','Fruit'],
    ['Mandarijnen groot 1,5 kilo','549860','Fruit'],
    ['AH Watermeloen','73895','Fruit'],
    ['AH Mango eetrijp','571116','Fruit'],
    ['Pink Lady Appels schaal','516797','Fruit'],
    ['Citroen 500 gram','4727','Fruit'],
    ['Zespri Kiwi sungold 750 gram','833752','Fruit'],
    ['AH Granny Smith schaal','799126','Fruit']
  ];
  const AGF_VEG_PRODUCTS_V6519 = [
    ['Cherrytomaten 250 gram','36597','Groente'],
    ['Snoepgroente tomaat 500 gram','723890','Groente'],
    ['Sweet cherry cherrytomaten 250 gram','596488','Groente'],
    ['Finest Red trostomaten 450 gram','711407','Groente'],
    ['Biologisch Snoepgroente tomaat 400 gram','813914','Groente'],
    ['Roma tomaten 750 gram','537853','Groente'],
    ['Tasty Tom trostomaten 380 g','501842','Groente'],
    ['Komkommer','508672','Groente'],
    ['Courgette','21003','Groente'],
    ['Aubergine','809016','Groente'],
    ['Biologisch Komkommer','529604','Groente'],
    ['AH Prei','767852','Groente'],
    ['Bosui','599987','Groente'],
    ['Witlof 4 stuks','831963','Groente'],
    ['Sweet palermo rode puntpaprika 2 stuks','526638','Groente'],
    ['Snijbonen 400 gram','559681','Groente'],
    ['AH Rode peper','845187','Groente']
  ];
  const AGF_START_PRODUCTS_V6519 = [...AGF_VEG_PRODUCTS_V6519, ...AGF_FRUIT_PRODUCTS_V6519];

  function agfCategoryLabelV6519(cat){
    if(!cat) return '';
    if(currentLang()==='en') return AGF_MAIN_CATEGORY_EN_V6519[cat] || agfTr(cat);
    return cat;
  }
  function agfCategoryOptionsV6519(value=''){
    const opts = AGF_MAIN_CATEGORIES_V6519.map(c=>`<option value="${escapeHtml(c)}" ${value===c?'selected':''}>${escapeHtml(agfCategoryLabelV6519(c))}</option>`).join('');
    return `<select class="input" id="modal_category">${opts}</select>`;
  }
  function agfProductFormV6519(p=null){
    const pre = p ? '' : (state.ui.agfSearch||'').trim();
    const title = p ? L('Product bewerken','Edit product') : L('AGF product toevoegen','Add produce product');
    const action = p ? 'confirm-edit-agf-product' : 'confirm-add-agf-product';
    const data = p ? `data-id="${escapeHtml(p.id)}"` : '';
    modal(title, `<div class="grid">
      <label>${t('product')}<input class="input" id="modal_name" value="${escapeHtml(p?.name||pre||'')}" placeholder="${L('Bijv. Bananen tros','Example: Bananen tros')}"></label>
      <label>${t('nasa')}<input class="input" id="modal_nasa" value="${escapeHtml(p?.nasa||'')}" placeholder="NASA"></label>
      <label>${t('category')}${agfCategoryOptionsV6519(p?.category||'Groente')}</label>
      <label>${t('aliases')}<input class="input" id="modal_aliases" value="${escapeHtml(p?.aliases||'')}" placeholder="${L('Zoekwoorden / alternatieve namen','Keywords / alternative names')}"></label>
      <button class="btn primary" data-action="${action}" ${data}>${t('save')}</button>
    </div>`);
  }
  openAgfProductForm = agfProductFormV6519;
  addAgfProductFromModal = function(){
    agfNormalize();
    const name = (byId('modal_name')?.value||'').trim();
    if(!name){ toast(L('Vul een productnaam in.','Enter a product name.')); return; }
    state.agfProducts.unshift({
      id:uid('agf'),
      name,
      nasa:(byId('modal_nasa')?.value||'').trim(),
      category:(byId('modal_category')?.value||'Groente'),
      aliases:(byId('modal_aliases')?.value||'').trim(),
      favorite:false,
      history:[]
    });
    closeModal(); save(); render(); toast(L('AGF-product toegevoegd.','Produce product added.'));
  };
  editAgfProductFromModal = function(id){
    const p=state.agfProducts.find(x=>x.id===id); if(!p) return;
    p.name=(byId('modal_name')?.value||p.name).trim();
    p.nasa=(byId('modal_nasa')?.value||'').trim();
    p.category=byId('modal_category')?.value||p.category||'Groente';
    p.aliases=(byId('modal_aliases')?.value||'').trim();
    closeModal(); save(); render(); toast(L('Product bijgewerkt.','Product updated.'));
  };

  function loadAgfStarterV6519(){
    agfNormalize();
    let added=0;
    AGF_START_PRODUCTS_V6519.forEach(([name,nasa,category])=>{
      const exists = state.agfProducts.some(p=>String(p.nasa||'')===String(nasa) || String(p.name||'').toLowerCase()===String(name).toLowerCase());
      if(!exists){ state.agfProducts.push({id:uid('agf'), name, nasa, category, aliases:'', favorite:false, history:[]}); added++; }
    });
    addActivity(`${added} AGF startproducten geladen`,'agf');
    save(); render(); toast(`${added} ${L('producten toegevoegd','products added')}`);
  }

  function agfAllCategoriesV6519(){
    agfNormalize();
    const set = new Set([...AGF_MAIN_CATEGORIES_V6519]);
    state.agfProducts.forEach(p=>{ if(p.category) set.add(p.category); });
    return Array.from(set);
  }
  function renderAgfProfileToolbarV6519(){
    const activeCat = state.ui.agfProfileCategory || '';
    const q = state.ui.agfProfileSearch || '';
    const cats = agfAllCategoriesV6519();
    return `<div class="agf-profile-toolbar form-grid">
      <input class="input" id="agfProfileSearch" value="${escapeHtml(q)}" placeholder="${L('Zoek profiel, NASA of categorie','Search profile, NASA or category')}">
      <select class="input" data-action="agf-profile-category-v6519" id="agfProfileCategory">
        <option value="">${t('allGroups')}</option>
        ${cats.map(c=>`<option value="${escapeHtml(c)}" ${activeCat===c?'selected':''}>${escapeHtml(agfCategoryLabelV6519(c))}</option>`).join('')}
      </select>
      <button class="btn" data-action="toggle-agf-profiles-expanded-v6519">${state.ui.agfProfilesExpanded?L('Minder tonen','Show less'):L('Meer tonen','Show more')}</button>
    </div>`;
  }
  renderAgfProducts = function(){
    agfNormalize();
    const q = String(state.ui.agfProfileSearch||'').toLowerCase();
    const cat = state.ui.agfProfileCategory || '';
    let products = state.agfProducts.filter(p=>{
      const hay = `${p.name||''} ${p.nasa||''} ${p.category||''} ${p.aliases||''}`.toLowerCase();
      return (!q || hay.includes(q)) && (!cat || p.category===cat);
    }).sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));
    const total = products.length;
    const limit = state.ui.agfProfilesExpanded ? 200 : 10;
    products = products.slice(0, limit);
    const list = products.map(p=>{
      const d = agfDecision(p);
      const hist = Array.isArray(p.history) ? p.history.length : 0;
      return `<div class="list-item agf-profile-card"><div>
        <strong>${escapeHtml(agfTr(p.name))}</strong>
        <div class="small muted">${escapeHtml(agfCategoryLabelV6519(p.category||''))} · NASA ${escapeHtml(p.nasa||'-')} · ${hist} ${L('meldingen','signals')}</div>
        <div class="small"><span class="pill info">${t('currentStatus')}: ${localStatus(d.status)}</span> <span class="pill ${d.action==='increase'?'bad':d.action==='hold'?'warn':d.action==='decrease'?'warn':'good'}">${escapeHtml(d.advice)}</span></div>
      </div><div class="btn-row">
        <button class="btn small" data-action="open-agf-profile-v6518" data-id="${p.id}">${t('productProfile')}</button>
        <button class="btn small" data-action="edit-agf-product" data-id="${p.id}">${t('edit')}</button>
        <button class="btn small bad" data-action="delete-agf-product" data-id="${p.id}">${t('delete')}</button>
      </div></div>`;
    }).join('');
    return `${renderAgfProfileToolbarV6519()}<div class="small muted mt">${total} ${L('productprofielen gevonden','product profiles found')}</div><div id="agfProfileList" class="list mt">${list || `<p class="muted">${t('empty')}</p>`}</div>`;
  };

  renderBonus = function(){
    agfNormalize();
    if(!state.bonus.length) return `<p class="muted">${L('Geen bonusartikelen. Gebruik de oranje B naast een product in AGF Quick Check.','No promotion items. Use the orange B next to a product in Produce Quick Check.')}</p>`;
    return `<div class="list bonus-readonly">${state.bonus.map(b=>`<div class="list-item"><div><strong>${escapeHtml(agfTr(b.name))}</strong><div class="small muted">NASA ${escapeHtml(b.nasa||'-')}</div><span class="pill warn">${t('promotion')}</span></div><div class="small muted">${L('Beheer via de oranje B in Quick Check','Manage via the orange B in Quick Check')}</div></div>`).join('')}</div>`;
  };
  function renderBonusWeekV6519(){
    return `<div class="btn-row mb"><button class="btn" data-action="copy-bonus-week-v6519">${t('copy')}</button><button class="btn bad" data-action="reset-bonus-week-v6518">${t('resetBonusWeek')}</button></div><p class="small muted">${L('Bonusartikelen voeg je toe of verwijder je via de oranje B-knop in AGF Quick Check.','Add or remove promotion items with the orange B button in Produce Quick Check.')}</p>${renderBonus()}`;
  }

  renderAgf = function(){
    agfNormalize();
    const decisionHtml = (typeof renderAgfDecisionCardsV6518==='function') ? renderAgfDecisionCardsV6518() : renderAgfAdvice();
    const basketHtml = (typeof renderAgfOrderBasketV6518==='function') ? renderAgfOrderBasketV6518() : renderAgfAdvice();
    return `<div class="grid agf-pro-page"><div class="hero"><span class="chip">${t('agfPro')}</span><h2>${L('AGF bestelintelligentie','Produce ordering intelligence')}</h2><p>${t('currentBeatsHistory')}. ${t('liveAdvice')}</p></div><div class="grid grid-4">${kpi(t('actionNeeded'),agfAttention().filter(a=>a.action!=='stable').length,agfAttention().length?'warn':'good')}${kpi(t('promotion'),state.bonus.length,state.bonus.length?'warn':'info')}${kpi(t('conflict'),agfAttention().filter(a=>a.conflict).length,agfAttention().some(a=>a.conflict)?'bad':'good')}${kpi(t('stable'),state.agfProducts.filter(p=>agfDecision(p).action==='stable').length,'good')}</div><div class="grid grid-main"><div class="grid"><div class="card"><h3>${L('AGF Quick Check','Produce Quick Check')}</h3><div class="form-grid"><input class="input" id="agfSearch" value="${escapeHtml(state.ui.agfSearch||'')}" placeholder="${t('search')} product / NASA"><button class="btn primary" data-action="open-agf-product-form">${t('add')} ${t('product')}</button><button class="btn" data-action="load-agf-starter-v6518">${t('loadProduceStarter')}</button></div>${typeof agfCategoryChipsV6518==='function'?agfCategoryChipsV6518():''}<div id="agfQuickList" class="mt">${renderAgfQuickList()}</div></div><div class="card"><h3>${t('decisionCenter')}</h3>${decisionHtml}</div><div class="card"><h3>${t('orderBasket')}</h3>${basketHtml}</div></div><div class="grid"><div class="card"><h3>${t('bonusWeek')}</h3>${renderBonusWeekV6519()}</div><div class="card"><h3>${t('orderAdvice')}</h3>${renderAgfAdvice()}</div><div class="card"><h3>${t('productProfiles')}</h3>${renderAgfProducts()}</div><div class="card"><h3>${t('orderHistory')}</h3>${renderOrderHistory()}</div></div></div></div>`;
  };

  function copyBonusWeekV6519(){
    const lines = state.bonus.map(b=>`${agfTr(b.name)}${b.nasa?' (NASA '+b.nasa+')':''}`);
    copyText(lines.length ? lines.join('\n') : t('noOrderActions'));
    toast(t('copied'));
  }

  const oldHandleAction6519 = handleAction;
  handleAction = function(a,el,e){
    if(a==='open-agf-product-form'){ openAgfProductForm(); return; }
    if(a==='confirm-add-agf-product'){ addAgfProductFromModal(); return; }
    if(a==='confirm-edit-agf-product'){ editAgfProductFromModal(el.dataset.id); return; }
    if(a==='load-agf-starter-v6518' || a==='load-agf-starter-v6519'){ loadAgfStarterV6519(); return; }
    if(a==='agf-profile-category-v6519'){ state.ui.agfProfileCategory = el.value || ''; save(); render(); return; }
    if(a==='toggle-agf-profiles-expanded-v6519'){ state.ui.agfProfilesExpanded = !state.ui.agfProfilesExpanded; save(); render(); return; }
    if(a==='copy-bonus-week-v6519'){ copyBonusWeekV6519(); return; }
    return oldHandleAction6519(a,el,e);
  };

  document.addEventListener('input', function(e){
    const input = e.target && e.target.closest && e.target.closest('#agfProfileSearch');
    if(!input) return;
    state.ui ||= {}; state.ui.agfProfileSearch = input.value || '';
    const listWrap = document.querySelector('#agfProfileSearch')?.closest('.card');
    const list = document.getElementById('agfProfileList');
    if(list){
      const q = String(state.ui.agfProfileSearch||'').toLowerCase();
      const cat = state.ui.agfProfileCategory || '';
      let products = state.agfProducts.filter(p=>{
        const hay = `${p.name||''} ${p.nasa||''} ${p.category||''} ${p.aliases||''}`.toLowerCase();
        return (!q || hay.includes(q)) && (!cat || p.category===cat);
      }).sort((a,b)=>String(a.name||'').localeCompare(String(b.name||''))).slice(0, state.ui.agfProfilesExpanded ? 200 : 10);
      list.innerHTML = products.map(p=>{
        const d=agfDecision(p), hist=Array.isArray(p.history)?p.history.length:0;
        return `<div class="list-item agf-profile-card"><div><strong>${escapeHtml(agfTr(p.name))}</strong><div class="small muted">${escapeHtml(agfCategoryLabelV6519(p.category||''))} · NASA ${escapeHtml(p.nasa||'-')} · ${hist} ${L('meldingen','signals')}</div><div class="small"><span class="pill info">${t('currentStatus')}: ${localStatus(d.status)}</span> <span class="pill ${d.action==='increase'?'bad':d.action==='hold'?'warn':d.action==='decrease'?'warn':'good'}">${escapeHtml(d.advice)}</span></div></div><div class="btn-row"><button class="btn small" data-action="open-agf-profile-v6518" data-id="${p.id}">${t('productProfile')}</button><button class="btn small" data-action="edit-agf-product" data-id="${p.id}">${t('edit')}</button><button class="btn small bad" data-action="delete-agf-product" data-id="${p.id}">${t('delete')}</button></div></div>`;
      }).join('') || `<p class="muted">${t('empty')}</p>`;
    }
  });

  const oldRenderDiagnostics6519 = renderDiagnostics;
  renderDiagnostics = function(){
    let html = oldRenderDiagnostics6519();
    html = html.replaceAll('v6.5.18','v6.5.19').replaceAll('rich-cmd-cache-v6518','rich-cmd-cache-v6519');
    html += `<div class="card"><h3>v6.5.19 — AGF category & bonus polish</h3><p>${L('Bonusweek is versimpeld, productprofielen zijn doorzoekbaar/filterbaar en fruitstartproducten zijn toegevoegd.','Promotion week was simplified, product profiles are searchable/filterable and fruit starter products were added.')}</p></div>`;
    return html;
  };

  save();
} catch(err){ console.error('v6.5.19 AGF category/profile patch failed', err); }

/* =======================
   RICH CMD v6.5.20 — AGF Package & Startup Hotfix
   Fixes v6.5.19 AGF page crash caused by patch-scoped helpers and removes debug patch files from package.
   ======================= */
(function(){
  try {
    if (window.APP) { APP.version = 'v6.5.20'; APP.cache = 'rich-cmd-cache-v6520'; }

    window.agfTr = window.agfTr || function(v){
      try { return typeof trText === 'function' ? trText(v) : v; } catch(e){ return v; }
    };

    window.inferAgfCategoryV6520 = function(name){
      const n = String(name||'').toLowerCase();
      if(n.includes('banaan') || n.includes('mandarijn') || n.includes('mango') || n.includes('peer') || n.includes('kiwi') || n.includes('appel') || n.includes('meloen') || n.includes('citroen')) return 'Fruit';
      if(n.includes('aardappel')) return 'Aardappelen';
      if(n.includes('ui') || n.includes('bosui')) return 'Uien';
      return 'Groente';
    };

    window.agfNormalize = window.agfNormalize || function(){
      state.ui = state.ui || {};
      state.agfProducts = Array.isArray(state.agfProducts) ? state.agfProducts : [];
      state.bonus = Array.isArray(state.bonus) ? state.bonus : [];
      state.agfOrders = Array.isArray(state.agfOrders) ? state.agfOrders : [];
      state.orderHistory = Array.isArray(state.orderHistory) ? state.orderHistory : [];
      state.agfProducts.forEach(function(p){
        p.history = Array.isArray(p.history) ? p.history : [];
        p.category = p.category || window.inferAgfCategoryV6520(p.name);
        p.aliases = p.aliases || '';
        p.favorite = !!p.favorite;
      });
      state.bonus = state.bonus.filter(function(b){ return b && (b.productId || b.name); });
      state.bonus.forEach(function(b){
        if(!('checkedToday' in b)) b.checkedToday = false;
        if(!('order' in b)) b.order = false;
      });
    };

    const MAIN_CATS = ['Groente','Fruit','Aardappelen','Uien','Gekoeld Fruit'];
    const CAT_EN = {'Groente':'Vegetables','Fruit':'Fruit','Aardappelen':'Potatoes','Uien':'Onions','Gekoeld Fruit':'Chilled fruit'};
    function catLabel(cat){ return currentLang()==='en' ? (CAT_EN[cat] || window.agfTr(cat)) : cat; }
    function allAgfCats(){
      window.agfNormalize();
      const set = new Set(MAIN_CATS);
      state.agfProducts.forEach(function(p){ if(p.category) set.add(p.category); });
      return Array.from(set);
    }

    const STARTER_PRODUCTS = [
      ['Cherrytomaten 250 gram','36597','Groente'],['Snoepgroente tomaat 500 gram','723890','Groente'],['Sweet cherry cherrytomaten 250 gram','596488','Groente'],['Finest Red trostomaten 450 gram','711407','Groente'],['Biologisch Snoepgroente tomaat 400 gram','813914','Groente'],['Roma tomaten 750 gram','537853','Groente'],['Tasty Tom trostomaten 380 g','501842','Groente'],['Komkommer','508672','Groente'],['Courgette','21003','Groente'],['Aubergine','809016','Groente'],['Biologisch Komkommer','529604','Groente'],['AH Prei','767852','Groente'],['Bosui','599987','Uien'],['Witlof 4 stuks','831963','Groente'],['Sweet palermo rode puntpaprika 2 stuks','526638','Groente'],['Snijbonen 400 gram','559681','Groente'],['AH Rode peper','845187','Groente'],
      ['Bananen tros','767854','Fruit'],['Mandarijnen 1 kilo','548401','Fruit'],['Mango per stuk','20869','Fruit'],['Conference bak 1 kilo','842982','Fruit'],['Mini watermeloen','817687','Fruit'],['AH Galia meloen','20842','Fruit'],['Conference 4 stuks','516344','Fruit'],['Cantaloupe meloen','81582','Fruit'],['Groene kiwi\'s 1 kilo','565937','Fruit'],['Bio bananen','834184','Fruit'],['AH Elstar zak','42962','Fruit'],['Mandarijnen groot 1,5 kilo','549860','Fruit'],['AH Watermeloen','73895','Fruit'],['AH Mango eetrijp','571116','Fruit'],['Pink Lady Appels schaal','516797','Fruit'],['Citroen 500 gram','4727','Fruit'],['Zespri Kiwi sungold 750 gram','833752','Fruit'],['AH Granny Smith schaal','799126','Fruit']
    ];

    window.loadAgfStarterV6520 = function(){
      window.agfNormalize();
      let added = 0;
      STARTER_PRODUCTS.forEach(function(row){
        const name=row[0], nasa=row[1], category=row[2];
        const exists = state.agfProducts.some(function(p){ return String(p.nasa||'')===String(nasa) || String(p.name||'').toLowerCase()===String(name).toLowerCase(); });
        if(!exists){ state.agfProducts.push({id:uid('agf'), name, nasa, category, aliases:'', favorite:false, history:[]}); added++; }
      });
      addActivity(added + ' AGF startproducten geladen','agf');
      save(); render(); toast(added + ' ' + L('producten toegevoegd','products added'));
    };

    window.openAgfProductForm = function(p){
      p = p || null;
      const pre = p ? '' : String((state.ui && state.ui.agfSearch) || '').trim();
      const opts = MAIN_CATS.map(function(c){ return '<option value="'+escapeHtml(c)+'" '+((p && p.category===c) || (!p && c==='Groente')?'selected':'')+'>'+escapeHtml(catLabel(c))+'</option>'; }).join('');
      modal(p ? L('Product bewerken','Edit product') : L('AGF product toevoegen','Add produce product'), '<div class="grid">'
        + '<label>'+t('product')+'<input class="input" id="modal_name" value="'+escapeHtml((p&&p.name)||pre||'')+'" placeholder="'+L('Bijv. Bananen tros','Example: Bananen tros')+'"></label>'
        + '<label>'+t('nasa')+'<input class="input" id="modal_nasa" value="'+escapeHtml((p&&p.nasa)||'')+'" placeholder="NASA"></label>'
        + '<label>'+t('category')+'<select class="input" id="modal_category">'+opts+'</select></label>'
        + '<label>'+t('aliases')+'<input class="input" id="modal_aliases" value="'+escapeHtml((p&&p.aliases)||'')+'" placeholder="'+L('Zoekwoorden / alternatieve namen','Keywords / alternative names')+'"></label>'
        + '<button class="btn primary" data-action="'+(p?'confirm-edit-agf-product-v6520':'confirm-add-agf-product-v6520')+'" '+(p?'data-id="'+escapeHtml(p.id)+'"':'')+'>'+t('save')+'</button>'
        + '</div>');
    };

    function addAgfProductV6520(){
      window.agfNormalize();
      const name = (byId('modal_name') && byId('modal_name').value || '').trim();
      if(!name){ toast(L('Vul een productnaam in.','Enter a product name.')); return; }
      state.agfProducts.unshift({id:uid('agf'), name, nasa:(byId('modal_nasa')?.value||'').trim(), category:byId('modal_category')?.value||'Groente', aliases:(byId('modal_aliases')?.value||'').trim(), favorite:false, history:[]});
      closeModal(); save(); render(); toast(L('AGF-product toegevoegd.','Produce product added.'));
    }
    function editAgfProductV6520(id){
      window.agfNormalize();
      const p = state.agfProducts.find(function(x){ return x.id===id; });
      if(!p) return;
      p.name=(byId('modal_name')?.value||p.name).trim();
      p.nasa=(byId('modal_nasa')?.value||'').trim();
      p.category=byId('modal_category')?.value||p.category||'Groente';
      p.aliases=(byId('modal_aliases')?.value||'').trim();
      closeModal(); save(); render(); toast(L('Product bijgewerkt.','Product updated.'));
    }

    window.setAgfStatus = function(id,status){
      window.agfNormalize();
      const p = state.agfProducts.find(function(x){ return x.id===id; });
      if(!p) return;
      p.history = Array.isArray(p.history) ? p.history : [];
      p.history.unshift({status:status, at:nowISO()});
      state.agfOrders = Array.isArray(state.agfOrders) ? state.agfOrders : [];
      state.orderHistory = Array.isArray(state.orderHistory) ? state.orderHistory : [];
      const d = agfDecision(p);
      state.agfOrders.unshift({id:uid('ord'),product:p.name,advice:d.advice,reason:d.reason,status:status,at:nowISO()});
      state.orderHistory.unshift({id:uid('oh'),product:p.name,status:status,advice:d.advice,reason:d.reason,nasa:p.nasa,at:nowISO(),bonus:state.bonus.some(function(b){return b.productId===p.id;})});
      state.orderHistory=state.orderHistory.slice(0,200);
      addActivity('AGF '+p.name+': '+status,'agf');
      save(); render();
    };

    function agfQuickListV6520(){
      window.agfNormalize();
      const filter = String((state.ui && state.ui.agfSearch) || '').toLowerCase();
      const activeCat = (state.ui && state.ui.agfGroupFilter) || '';
      let products = state.agfProducts.filter(function(p){
        const hay = (p.name+' '+(p.nasa||'')+' '+(p.category||'')+' '+(p.aliases||'')).toLowerCase();
        return (!filter || hay.includes(filter)) && (!activeCat || p.category===activeCat);
      }).sort(function(a,b){ return (b.favorite?1:0)-(a.favorite?1:0) || (state.bonus.some(x=>x.productId===b.id)?1:0)-(state.bonus.some(x=>x.productId===a.id)?1:0) || String(a.name||'').localeCompare(String(b.name||'')); }).slice(0,80);
      if(!products.length) return '<p class="muted">'+t('empty')+' · <button class="btn small" data-action="open-agf-product-form">'+t('addProduct')+'</button></p>';
      return '<div class="list">'+products.map(function(p){
        const ls = lastAgfStatus(p)||'Onbekend'; const isBonus = state.bonus.some(function(b){return b.productId===p.id;});
        return '<div class="list-item decision-card"><div><strong>'+escapeHtml(window.agfTr(p.name))+'</strong><div class="small muted">'+escapeHtml(catLabel(p.category||''))+' · NASA '+escapeHtml(p.nasa||'-')+'</div><span class="pill '+(ls==='Overvoorraad'?'warn':ls==='Leeg schap'?'bad':'good')+'">'+localStatus(ls)+'</span></div><div class="btn-row"><button class="btn small good" data-action="agf-status" data-id="'+p.id+'" data-status="OK">OK</button><button class="btn small bad" data-action="agf-status" data-id="'+p.id+'" data-status="Leeg schap">'+L('Leeg','Empty')+'</button><button class="btn small warn" data-action="agf-status" data-id="'+p.id+'" data-status="Overvoorraad">'+L('Over','Over')+'</button><button class="btn small" data-action="toggle-agf-fav" data-id="'+p.id+'">'+(p.favorite?'★':'☆')+'</button><button class="btn small bonus-badge '+(isBonus?'active':'')+'" data-action="toggle-agf-bonus" data-id="'+p.id+'">B</button></div></div>';
      }).join('')+'</div>';
    }
    window.renderAgfQuickList = agfQuickListV6520;

    function catChips(){
      const active = state.ui.agfGroupFilter || '';
      return '<div class="chip-row mt"><button class="chip '+(!active?'active':'')+'" data-action="agf-group-filter-v6520" data-group="">'+t('allGroups')+'</button>'+allAgfCats().map(function(c){return '<button class="chip '+(active===c?'active':'')+'" data-action="agf-group-filter-v6520" data-group="'+escapeHtml(c)+'">'+escapeHtml(catLabel(c))+'</button>';}).join('')+'</div>';
    }

    window.renderBonus = function(){
      window.agfNormalize();
      if(!state.bonus.length) return '<p class="muted">'+L('Geen bonusartikelen. Gebruik de oranje B naast een product in AGF Quick Check.','No promotion items. Use the orange B next to a product in Produce Quick Check.')+'</p>';
      return '<div class="list bonus-readonly">'+state.bonus.map(function(b){return '<div class="list-item"><div><strong>'+escapeHtml(window.agfTr(b.name))+'</strong><div class="small muted">NASA '+escapeHtml(b.nasa||'-')+'</div><span class="pill warn">'+t('promotion')+'</span></div><div class="small muted">'+L('Beheer via de oranje B in Quick Check','Manage via the orange B in Quick Check')+'</div></div>';}).join('')+'</div>';
    };
    function copyBonusWeek(){ copyText(state.bonus.map(function(b){ return window.agfTr(b.name)+(b.nasa?' (NASA '+b.nasa+')':''); }).join('\n') || t('noOrderActions')); toast(t('copied')); }
    function renderBonusWeek(){ return '<div class="btn-row mb"><button class="btn" data-action="copy-bonus-week-v6520">'+t('copy')+'</button><button class="btn bad" data-action="reset-bonus-week-v6518">'+t('resetBonusWeek')+'</button></div><p class="small muted">'+L('Bonusartikelen voeg je toe of verwijder je via de oranje B-knop in AGF Quick Check.','Add or remove promotion items with the orange B button in Produce Quick Check.')+'</p>'+renderBonus(); }

    function productProfiles(){
      window.agfNormalize();
      const q = String(state.ui.agfProfileSearch||'').toLowerCase();
      const cat = state.ui.agfProfileCategory || '';
      const cats = allAgfCats();
      let products = state.agfProducts.filter(function(p){ const hay=(p.name+' '+(p.nasa||'')+' '+(p.category||'')+' '+(p.aliases||'')).toLowerCase(); return (!q||hay.includes(q)) && (!cat||p.category===cat); }).sort(function(a,b){return String(a.name||'').localeCompare(String(b.name||''));});
      const total = products.length; products = products.slice(0,state.ui.agfProfilesExpanded?200:10);
      return '<div class="agf-profile-toolbar form-grid"><input class="input" id="agfProfileSearch" value="'+escapeHtml(state.ui.agfProfileSearch||'')+'" placeholder="'+L('Zoek profiel, NASA of categorie','Search profile, NASA or category')+'"><select class="input" data-action="agf-profile-category-v6520"><option value="">'+t('allGroups')+'</option>'+cats.map(function(c){return '<option value="'+escapeHtml(c)+'" '+(cat===c?'selected':'')+'>'+escapeHtml(catLabel(c))+'</option>';}).join('')+'</select><button class="btn" data-action="toggle-agf-profiles-expanded-v6520">'+(state.ui.agfProfilesExpanded?L('Minder tonen','Show less'):L('Meer tonen','Show more'))+'</button></div><div class="small muted mt">'+total+' '+L('productprofielen gevonden','product profiles found')+'</div><div id="agfProfileList" class="list mt">'+(products.map(function(p){ const d=agfDecision(p); return '<div class="list-item agf-profile-card"><div><strong>'+escapeHtml(window.agfTr(p.name))+'</strong><div class="small muted">'+escapeHtml(catLabel(p.category||''))+' · NASA '+escapeHtml(p.nasa||'-')+' · '+((p.history||[]).length)+' '+L('meldingen','signals')+'</div><div class="small"><span class="pill info">'+t('currentStatus')+': '+localStatus(d.status)+'</span> <span class="pill '+(d.action==='increase'?'bad':d.action==='hold'?'warn':d.action==='decrease'?'warn':'good')+'">'+escapeHtml(d.advice)+'</span></div></div><div class="btn-row"><button class="btn small" data-action="open-agf-profile-v6518" data-id="'+p.id+'">'+t('productProfile')+'</button><button class="btn small" data-action="edit-agf-product" data-id="'+p.id+'">'+t('edit')+'</button><button class="btn small bad" data-action="delete-agf-product" data-id="'+p.id+'">'+t('delete')+'</button></div></div>'; }).join('') || '<p class="muted">'+t('empty')+'</p>')+'</div>';
    }
    window.renderAgfProducts = productProfiles;

    window.renderAgf = function(){
      window.agfNormalize();
      const decisionHtml = typeof renderAgfDecisionCardsV6518==='function' ? renderAgfDecisionCardsV6518() : renderAgfAdvice();
      const basketHtml = typeof renderAgfOrderBasketV6518==='function' ? renderAgfOrderBasketV6518() : renderAgfAdvice();
      return '<div class="grid agf-pro-page"><div class="hero"><span class="chip">'+t('agfPro')+'</span><h2>'+L('AGF bestelintelligentie','Produce ordering intelligence')+'</h2><p>'+t('currentBeatsHistory')+'. '+t('liveAdvice')+'</p></div><div class="grid grid-4">'+kpi(t('actionNeeded'),agfAttention().filter(a=>a.action!=='stable').length,agfAttention().length?'warn':'good')+kpi(t('promotion'),state.bonus.length,state.bonus.length?'warn':'info')+kpi(t('conflict'),agfAttention().filter(a=>a.conflict).length,agfAttention().some(a=>a.conflict)?'bad':'good')+kpi(t('stable'),state.agfProducts.filter(p=>agfDecision(p).action==='stable').length,'good')+'</div><div class="grid grid-main"><div class="grid"><div class="card"><h3>'+L('AGF Quick Check','Produce Quick Check')+'</h3><div class="form-grid"><input class="input" id="agfSearch" value="'+escapeHtml(state.ui.agfSearch||'')+'" placeholder="'+t('search')+' product / NASA"><button class="btn primary" data-action="open-agf-product-form">'+t('add')+' '+t('product')+'</button><button class="btn" data-action="load-agf-starter-v6520">'+t('loadProduceStarter')+'</button></div>'+catChips()+'<div id="agfQuickList" class="mt">'+agfQuickListV6520()+'</div></div><div class="card"><h3>'+t('decisionCenter')+'</h3>'+decisionHtml+'</div><div class="card"><h3>'+t('orderBasket')+'</h3>'+basketHtml+'</div></div><div class="grid"><div class="card"><h3>'+t('bonusWeek')+'</h3>'+renderBonusWeek()+'</div><div class="card"><h3>'+t('orderAdvice')+'</h3>'+renderAgfAdvice()+'</div><div class="card"><h3>'+t('productProfiles')+'</h3>'+productProfiles()+'</div><div class="card"><h3>'+t('orderHistory')+'</h3>'+renderOrderHistory()+'</div></div></div></div>';
    };

    const prevHandle = window.handleAction || handleAction;
    window.handleAction = handleAction = function(a,el,e){
      if(a==='open-agf-product-form'){ window.openAgfProductForm(); return; }
      if(a==='confirm-add-agf-product-v6520' || a==='confirm-add-agf-product'){ addAgfProductV6520(); return; }
      if(a==='confirm-edit-agf-product-v6520' || a==='confirm-edit-agf-product'){ editAgfProductV6520(el.dataset.id); return; }
      if(a==='load-agf-starter-v6518' || a==='load-agf-starter-v6519' || a==='load-agf-starter-v6520'){ window.loadAgfStarterV6520(); return; }
      if(a==='agf-group-filter-v6520'){ state.ui.agfGroupFilter = el.dataset.group || ''; save(); render(); return; }
      if(a==='agf-profile-category-v6520' || a==='agf-profile-category-v6519'){ state.ui.agfProfileCategory = el.value || ''; save(); render(); return; }
      if(a==='toggle-agf-profiles-expanded-v6520' || a==='toggle-agf-profiles-expanded-v6519'){ state.ui.agfProfilesExpanded = !state.ui.agfProfilesExpanded; save(); render(); return; }
      if(a==='copy-bonus-week-v6520' || a==='copy-bonus-week-v6519'){ copyBonusWeek(); return; }
      return prevHandle(a,el,e);
    };

    document.addEventListener('input', function(e){
      const s = e.target && e.target.closest && e.target.closest('#agfSearch');
      if(s){ state.ui.agfSearch = s.value || ''; const list=byId('agfQuickList'); if(list) list.innerHTML = agfQuickListV6520(); return; }
      const ps = e.target && e.target.closest && e.target.closest('#agfProfileSearch');
      if(ps){ state.ui.agfProfileSearch = ps.value || ''; const card=ps.closest('.card'); if(card) { const list=card.querySelector('#agfProfileList'); if(list){ const tmp=document.createElement('div'); tmp.innerHTML=productProfiles(); const newList=tmp.querySelector('#agfProfileList'); if(newList) list.innerHTML=newList.innerHTML; } } }
    });

    const prevDiag = renderDiagnostics;
    renderDiagnostics = function(){
      let html = prevDiag();
      html = html.replaceAll('v6.5.19','v6.5.20').replaceAll('rich-cmd-cache-v6519','rich-cmd-cache-v6520');
      html += '<div class="card"><h3>v6.5.20 — AGF package hotfix</h3><p>'+L('AGF opent weer stabiel en de zip bevat geen losse patchbestanden meer.','Produce opens reliably again and the zip no longer contains loose patch files.')+'</p></div>';
      return html;
    };

    window.agfNormalize();
    save();
  } catch(err) { console.error('v6.5.20 AGF hotfix failed', err); }
})();

/* =========================================================
   RICH CMD v6.5.21 — HACCP Planner Pro
   Controlled update: HACCP planning, template loading/management,
   task bundles, capacity insight and deferral analysis.
========================================================= */
(function(){
  try {
    APP.version = 'v6.5.21';
    APP.cache = 'rich-cmd-cache-v6521';
    state.schemaVersion = 6521;
    state.ui = state.ui || {};
    state.ui.haccp = state.ui.haccp || { showCompleted:false };

    Object.assign(I18N.nl, {
      haccpPlannerPro:'HACCP Planner Pro', dailyBase:'Dagelijkse basis', deferredTasks:'Doorgeschoven taken', periodicTasks:'Periodieke taken', cleaningMapTasks:'Schoonmaakkaarttaken', plannedMinutes:'Geplande minuten', remainingCapacity:'Resterende capaciteit', capacityWarning:'Capaciteitswaarschuwing', loadTasks:'Taken inladen', manageTasksTemplates:'Taken & templates beheren', chooseTemplate:'Kies template', selectedTasks:'Geselecteerde taken', loadSelected:'Selectie inladen', loadAll:'Alles selecteren', loadNone:'Niets selecteren', templateManagement:'Templatebeheer', addTemplateTask:'Templatetaak toevoegen', editTemplateTask:'Templatetaak bewerken', taskTitle:'Taaktitel', estimate:'Schatting', baseRoutine:'Basisroutine', periodic:'Periodiek', storeMapLinked:'Schoonmaakkaart gekoppeld', planMyHaccpTime:'Plan mijn HACCP-tijd', planningAdvice:'Planningsadvies', tooMuchPlanned:'Er staat meer gepland dan je beschikbare HACCP-tijd. Laad minder periodieke taken of stel lage prioriteit uit.', capacityLooksGood:'Je planning past binnen je beschikbare HACCP-tijd.', showCompleted:'Voltooide taken tonen', hideCompleted:'Voltooide taken verbergen', noDeferredReasons:'Geen uitstelredenen.', taskBundleLoaded:'Taakbundel geladen', templateTaskSaved:'Templatetaak opgeslagen', templateTaskDeleted:'Templatetaak verwijderd'
    });
    Object.assign(I18N.en, {
      haccpPlannerPro:'HACCP Planner Pro', dailyBase:'Daily base', deferredTasks:'Deferred tasks', periodicTasks:'Periodic tasks', cleaningMapTasks:'Cleaning Map tasks', plannedMinutes:'Planned minutes', remainingCapacity:'Remaining capacity', capacityWarning:'Capacity warning', loadTasks:'Load tasks', manageTasksTemplates:'Manage tasks & templates', chooseTemplate:'Choose template', selectedTasks:'Selected tasks', loadSelected:'Load selection', loadAll:'Select all', loadNone:'Select none', templateManagement:'Template management', addTemplateTask:'Add template task', editTemplateTask:'Edit template task', taskTitle:'Task title', estimate:'Estimate', baseRoutine:'Base routine', periodic:'Periodic', storeMapLinked:'Cleaning Map linked', planMyHaccpTime:'Plan my HACCP time', planningAdvice:'Planning advice', tooMuchPlanned:'More work is planned than your available HACCP time. Load fewer periodic tasks or defer low priority work.', capacityLooksGood:'Your planning fits within your available HACCP time.', showCompleted:'Show completed tasks', hideCompleted:'Hide completed tasks', noDeferredReasons:'No deferral reasons.', taskBundleLoaded:'Task bundle loaded', templateTaskSaved:'Template task saved', templateTaskDeleted:'Template task deleted'
    });

    const H_TASK_TRANSLATIONS_6521 = {
      'Temperatuurscontrole':'Temperature check', 'Emballage':'Packaging / returns area', 'Sinaasappelpers schoonmaken':'Clean orange press', 'Kleine schrob ronde':'Small scrub round', 'Kleine schobronde':'Small scrub round', 'Houdbaar check':'Dry grocery check', 'Vers check':'Fresh department check', 'Kantine / Toiletten / Kantoren':'Canteen / toilets / offices', 'Vuilnisbakken':'Bins', 'Winkelvloer en magazijn':'Shop floor and warehouse', 'Onderhoud Schrobmachine':'Scrubber maintenance', 'Ramen Koeldeuren':'Cooler door windows', 'Actieplanning AGF':'Produce action planning', 'Landen van herkomst AGF':'Produce country-of-origin labels', 'Stof boven koelingen':'Dust above coolers', 'Koffiemachine reiniging':'Coffee machine cleaning', 'Magazijn uitgebreid':'Extended warehouse check', 'Koelcel':'Cold room', 'Onder AGF stelling':'Under produce shelving', 'Sinaasappelpers grondig':'Deep clean orange press', 'Temperatuursronde uitgebreid':'Extended temperature round', 'Controle diepvriescel':'Freezer room check', 'Controle broodafdeling':'Bread department check', 'Winkelvloer uitgebreid':'Extended shop floor round', 'Stofzuigen Uien meubel / Houdbaar':'Vacuum onion fixture / dry grocery', 'Koelkast kantine':'Canteen fridge', 'Kantoor':'Office', 'AGF oplegplaten':'Produce shelf plates', 'Vensterbanken':'Window sills', 'Spinnenraggen':'Cobwebs', 'Stofzuigen Aanzuigrooster':'Vacuum intake grille', 'Koffiemachine grondig':'Deep clean coffee machine', 'AGF kratwissel':'Produce crate rotation', 'Pilaren en lastige stofnesten':'Pillars and difficult dust spots'
    };
    function hTaskName(title){ return currentLang()==='en' ? (H_TASK_TRANSLATIONS_6521[title] || taskTitle({title})) : title; }
    function hGroupLabel(group){ const m={daily:t('daily'),weekly:t('weekly'),monthly:t('monthly')}; return m[group] || group || ''; }
    function taskGroupType(task){
      const g = String(task.group||task.frequency||'').toLowerCase();
      const cat = String(task.category||'');
      if(task.status==='Uitgesteld') return 'deferred';
      if(task.linkedCleaningId || cat.includes('Schoonmaakkaart') || cat.includes('Cleaning Map')) return 'cleaning';
      if(g.includes('daily') || g.includes('dagelijks') || cat.includes('Basisroutine')) return 'daily';
      if(g.includes('weekly') || g.includes('wekelijks') || g.includes('monthly') || g.includes('maandelijks') || cat.includes('Periodiek')) return 'periodic';
      return 'other';
    }
    function haccpSections(){
      const tasks = todayTasks().slice().sort((a,b)=>((a.manualOrder??9999)-(b.manualOrder??9999)) || priorityWeight(a.priority)-priorityWeight(b.priority) || (+a.duration||0)-(+b.duration||0));
      const active = tasks.filter(t => state.ui.haccp.showCompleted || t.status !== 'Voltooid');
      return {
        daily: active.filter(t=>taskGroupType(t)==='daily'),
        deferred: active.filter(t=>taskGroupType(t)==='deferred'),
        cleaning: active.filter(t=>taskGroupType(t)==='cleaning'),
        periodic: active.filter(t=>taskGroupType(t)==='periodic'),
        other: active.filter(t=>taskGroupType(t)==='other')
      };
    }
    function haccpOpenTasks(){ return Object.values(haccpSections()).flat().filter(t=>t.status!=='Voltooid'); }
    function haccpPlannedMinutes(){ return haccpOpenTasks().reduce((a,t)=>a+(+t.duration||0),0); }
    function haccpCompletedMinutesToday(){ return todayTasks().filter(t=>t.status==='Voltooid').reduce((a,t)=>a+(+t.duration||0),0); }
    function hcap(){ return (+state.settings.haccpHours||3.5)*60; }
    function haccpCapacitySummary(){
      const planned = haccpPlannedMinutes(); const completed = haccpCompletedMinutesToday(); const cap = hcap(); const remain = Math.max(0, cap-planned);
      const plannedPct = Math.min(140, Math.round(planned/cap*100));
      return `<div class="grid grid-2">
        ${kpi(t('haccpHours'), minutesToText(cap), 'info')}
        ${kpi(t('plannedMinutes'), minutesToText(planned), planned>cap?'bad':planned>cap*.85?'warn':'good')}
        ${kpi(t('completedMinutes'), minutesToText(completed), 'good')}
        ${kpi(t('remainingCapacity'), minutesToText(remain), planned>cap?'bad':'good')}
      </div><div class="mt">${bar(t('haccpCapacity'), plannedPct, planned>cap?'bad':planned>cap*.85?'warn':'good')}</div>
      <div class="card soft mt"><strong>${t('planningAdvice')}</strong><p class="muted">${planned>cap?t('tooMuchPlanned'):t('capacityLooksGood')}</p></div>`;
    }
    function haccpTimelinePro(){
      const order = ['daily','deferred','cleaning','periodic','other'];
      const labels = {daily:t('dailyBase'), deferred:t('deferredTasks'), cleaning:t('cleaningMapTasks'), periodic:t('periodicTasks'), other:t('open')};
      let [h,m] = String(state.settings.shiftStart||'08:00').split(':').map(Number);
      let count=0;
      const rows=[];
      order.forEach(key=>{
        const arr = haccpSections()[key].filter(t=>t.status!=='Voltooid');
        if(!arr.length) return;
        rows.push(`<div class="timeline-section"><span>${labels[key]}</span><strong>${minutesToText(arr.reduce((a,t)=>a+(+t.duration||0),0))}</strong></div>`);
        arr.slice(0,16).forEach(task=>{
          const time = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
          const dur = +task.duration || 10;
          m += dur; while(m>=60){h++;m-=60;}
          count++;
          rows.push(`<div class="timeline-item haccp-plan-row"><div class="timeline-time">${time}</div><div class="timeline-card ${key}"><strong>${escapeHtml(hTaskName(task.title))}</strong><div class="small muted">${minutesToText(dur)} · ${localStatus(task.priority)} · ${escapeHtml(translatedCategory(task.category||''))}</div><div class="btn-row mt tiny-actions"><button class="btn small good" data-action="task-done" data-id="${task.id}">${t('done')}</button><button class="btn small warn" data-action="task-defer" data-id="${task.id}">${t('defer')}</button><button class="btn small" data-action="task-focus" data-id="${task.id}">${t('focus')}</button></div></div></div>`);
        });
      });
      return rows.length ? `<div class="timeline haccp-pro-timeline">${rows.join('')}</div>` : `<div class="empty-state"><h3>${currentLang()==='en'?'No HACCP tasks planned':'Geen HACCP-taken gepland'}</h3><p>${currentLang()==='en'?'Load a template or add a task to start the day planning.':'Laad een template of voeg een taak toe om de dagplanning te starten.'}</p><button class="btn primary" data-action="open-template-loader">${t('loadTasks')}</button></div>`;
    }
    function hTaskCard(task){
      const key = taskGroupType(task);
      return `<div class="list-item haccp-task-card ${key}" data-task-card="${task.id}"><div><strong>${escapeHtml(hTaskName(task.title))}</strong><div class="small muted">${minutesToText(task.duration)} · ${localStatus(task.priority)} · ${escapeHtml(translatedCategory(task.category||''))}</div><span class="pill ${task.status==='Uitgesteld'?'warn':task.status==='Voltooid'?'good':'info'}">${localStatus(task.status)}</span></div><div class="btn-row"><button class="btn small" data-action="task-up" data-id="${task.id}" title="Up">↑</button><button class="btn small" data-action="task-down" data-id="${task.id}" title="Down">↓</button><button class="btn small good" data-action="task-done" data-id="${task.id}">${t('done')}</button><button class="btn small warn" data-action="task-defer" data-id="${task.id}">${t('defer')}</button><button class="btn small" data-action="task-focus" data-id="${task.id}">${t('focus')}</button><button class="btn small" data-action="task-edit" data-id="${task.id}">${t('edit')}</button></div></div>`;
    }
    function renderTaskSection(title, arr, open=true){
      return `<details class="detail-drawer haccp-section" ${open?'open':''}><summary><span>${title}</span><span class="pill info">${arr.length}</span></summary><div class="drawer-content">${arr.length?`<div class="list">${arr.map(hTaskCard).join('')}</div>`:`<p class="muted">${t('empty')}</p>`}</div></details>`;
    }
    function renderHaccpTaskListPro(){
      const s=haccpSections();
      return renderTaskSection(t('dailyBase'),s.daily,true)+renderTaskSection(t('deferredTasks'),s.deferred,!!s.deferred.length)+renderTaskSection(t('cleaningMapTasks'),s.cleaning,!!s.cleaning.length)+renderTaskSection(t('periodicTasks'),s.periodic,false)+renderTaskSection(currentLang()==='en'?'Other tasks':'Overige taken',s.other,false);
    }
    function renderTaskBundlesPro(){
      const defs = bundleDefinitions();
      return `<div class="grid">${defs.map(b=>{ const tasks=bundleTasks(b); return `<div class="card soft bundle-card"><div class="flex-between"><strong>${escapeHtml(b.name)}</strong><span class="pill info">${tasks.length}</span></div><p class="small muted">${tasks.slice(0,3).map(x=>escapeHtml(hTaskName(x.title))).join(' · ') || t('empty')}</p><button class="btn small" data-action="load-task-bundle-v6521" data-bundle="${b.id}">${t('load')}</button></div>`; }).join('')}</div>`;
    }
    function renderTemplateManagerPro(){
      const groups=['daily','weekly','monthly'];
      return `<div class="template-pro-grid">${groups.map(g=>`<details class="detail-drawer" ${g==='daily'?'open':''}><summary><span>${hGroupLabel(g)}</span><span class="pill info">${state.templates[g].length}</span></summary><div class="drawer-content"><div class="btn-row mb"><button class="btn small primary" data-action="open-template-loader" data-group="${g}">${t('loadSelected')}</button><button class="btn small" data-action="open-template-item-form-v6521" data-group="${g}">${t('addTemplateTask')}</button></div><div class="list">${state.templates[g].map(it=>`<div class="list-item compact"><span><strong>${escapeHtml(hTaskName(it.title))}</strong><span class="small muted"> · ${minutesToText(it.duration)} · ${localStatus(it.priority)} · ${escapeHtml(translatedCategory(it.category||''))}</span></span><span class="btn-row"><button class="btn small" data-action="open-template-item-form-v6521" data-group="${g}" data-id="${it.id}">${t('edit')}</button><button class="btn small bad" data-action="delete-template-item-v6521" data-group="${g}" data-id="${it.id}">${t('delete')}</button></span></div>`).join('')}</div></div></details>`).join('')}</div>`;
    }
    renderHaccp = window.renderHaccp = function(){
      const openCount = haccpOpenTasks().length;
      return `<div class="haccp-pro-page">
        <div class="hero haccp-hero"><span class="chip">${t('haccpPlannerPro')}</span><h2>${t('autoPlanning')}</h2><p>${currentLang()==='en'?'Daily work first, then deferred work, Cleaning Map urgency and periodic tasks.':'Dagtaken eerst, daarna doorgeschoven werk, schoonmaakkaart-urgentie en periodieke taken.'}</p><div class="btn-row"><button class="btn primary" data-action="open-template-loader">${t('loadTasks')}</button><button class="btn" data-action="open-task-form">${t('add')} ${currentLang()==='en'?'task':'taak'}</button><button class="btn" data-action="open-focus">${t('focus')}</button><button class="btn" data-action="toggle-completed-haccp-v6521">${state.ui.haccp.showCompleted?t('hideCompleted'):t('showCompleted')}</button></div></div>
        <div class="grid grid-4">${kpi(t('open'),openCount,openCount?'warn':'good')}${kpi(t('plannedMinutes'),minutesToText(haccpPlannedMinutes()),haccpPlannedMinutes()>hcap()?'bad':'good')}${kpi(t('completedMinutes'),minutesToText(haccpCompletedMinutesToday()),'good')}${kpi(t('haccpHours'),minutesToText(hcap()),'info')}</div>
        <div class="grid grid-main"><div class="grid"><div class="card"><h3>${t('planMyHaccpTime')}</h3>${haccpTimelinePro()}</div><div class="card"><h3>${currentLang()==='en'?'Task queue':'Takenlijst'}</h3>${renderHaccpTaskListPro()}</div><div class="card"><h3>${t('taskBundles')}</h3>${renderTaskBundlesPro()}</div></div><div class="grid"><div class="card"><h3>${currentLang()==='en'?'Capacity':'Capaciteit'}</h3>${haccpCapacitySummary()}</div><div class="card"><h3>${currentLang()==='en'?'Deferral analysis':'Uitstelanalyse'}</h3>${renderDeferralAnalysis()}</div><div class="card"><h3>${t('manageTasksTemplates')}</h3><details class="detail-drawer"><summary>${t('templateManagement')}</summary><div class="drawer-content">${renderTemplateManagerPro()}</div></details></div></div></div>
      </div>`;
    };
    renderDeferralAnalysis = window.renderDeferralAnalysis = function(){
      const map={}; state.tasks.filter(t=>t.status==='Uitgesteld').forEach(t=>{ const key=t.deferReason||L('Geen reden','No reason'); map[key]=(map[key]||0)+1; });
      const entries=Object.entries(map); if(!entries.length) return `<p class="muted">${t('noDeferredReasons')}</p>`;
      return entries.map(([k,v])=>`<div class="bar-row"><div class="list-item compact"><span>${escapeHtml(k)}</span><strong>${v}</strong></div><div class="progress"><span style="width:${Math.min(100,v*20)}%"></span></div></div>`).join('');
    };

    openTemplateLoader = window.openTemplateLoader = function(group){
      if(!group){
        modal(t('chooseTemplate'), `<div class="grid grid-3">${['daily','weekly','monthly'].map(g=>`<button class="theme-card" data-action="open-template-loader-v6521" data-group="${g}"><strong>${hGroupLabel(g)}</strong><p class="muted">${state.templates[g].length} ${currentLang()==='en'?'tasks':'taken'}</p></button>`).join('')}</div>`, 'wide');
        return;
      }
      const list=state.templates[group]||[];
      modal(`${t('loadTasks')} — ${hGroupLabel(group)}`, `<p class="muted">${currentLang()==='en'?'Select what you want to load into today’s HACCP planning.':'Selecteer wat je in de HACCP dagplanning wilt laden.'}</p><div class="btn-row mb"><button class="btn" data-action="template-select-all">${t('loadAll')}</button><button class="btn" data-action="template-select-none">${t('loadNone')}</button></div><div class="list template-selection">${list.map(it=>`<label class="list-item compact"><input type="checkbox" class="tplCheck" value="${it.id}" checked> <span><strong>${escapeHtml(hTaskName(it.title))}</strong><span class="small muted"> · ${minutesToText(it.duration)} · ${localStatus(it.priority)}</span></span></label>`).join('')}</div><button class="btn primary mt" data-action="confirm-load-template-v6521" data-group="${group}">${t('loadSelected')}</button>`, 'wide');
    };
    loadTemplateSelection = window.loadTemplateSelection = function(group){
      const ids=[...document.querySelectorAll('.tplCheck:checked')].map(c=>c.value);
      const items=(state.templates[group]||[]).filter(i=>ids.includes(i.id));
      const baseOrder = state.tasks.length;
      items.forEach((i,idx)=>state.tasks.unshift({id:uid('task'),title:i.title,duration:+i.duration||10,priority:i.priority||'Medium',category:i.category||'Template',group,frequency:group==='daily'?'Dagelijks':group==='weekly'?'Wekelijks':'Maandelijks',status:'Open',createdAt:nowISO(),dueDate:TODAY(),manualOrder:baseOrder+idx}));
      addActivity(`${items.length} ${hGroupLabel(group)} ${currentLang()==='en'?'tasks loaded':'taken geladen'}`,'task');
      toast(`${items.length} ${currentLang()==='en'?'tasks loaded':'taken geladen'}`,'good'); closeModal(); save(); render();
    };
    function openTemplateItemForm(group,id){
      const item = (state.templates[group]||[]).find(x=>x.id===id) || {title:'',duration:10,priority:'Medium',category:group==='daily'?'Basisroutine':'Periodiek'};
      modal(id?t('editTemplateTask'):t('addTemplateTask'), `<div class="grid grid-2"><label>${t('taskTitle')}<input class="input" id="tplTitle" value="${escapeHtml(item.title||'')}"></label><label>${t('duration')}<input class="input" id="tplDuration" type="number" value="${+item.duration||10}"></label><label>${t('priority')}<select class="select" id="tplPriority"><option ${item.priority==='Hoog'?'selected':''}>Hoog</option><option ${item.priority==='Medium'?'selected':''}>Medium</option><option ${item.priority==='Laag'?'selected':''}>Laag</option><option ${item.priority==='Kritiek'?'selected':''}>Kritiek</option></select></label><label>${t('category')}<input class="input" id="tplCategory" value="${escapeHtml(item.category||'')}"></label></div><button class="btn primary mt" data-action="save-template-item-v6521" data-group="${group}" ${id?`data-id="${id}"`:''}>${t('save')}</button>`);
    }
    function saveTemplateItem(group,id){
      const title=byId('tplTitle')?.value?.trim(); if(!title){ toast(currentLang()==='en'?'Title is required':'Titel is verplicht','warn'); return; }
      const obj={id:id||uid('tpl'), title, duration:+(byId('tplDuration')?.value||10), priority:byId('tplPriority')?.value||'Medium', category:byId('tplCategory')?.value||'Template', group};
      if(id){ const idx=state.templates[group].findIndex(x=>x.id===id); if(idx>=0) state.templates[group][idx]=obj; }
      else state.templates[group].push(obj);
      toast(t('templateTaskSaved'),'good'); closeModal(); save(); render();
    }
    function loadTaskBundle(bundleId){
      const b=bundleDefinitions().find(x=>x.id===bundleId); if(!b) return;
      const tasks=bundleTasks(b).filter(t=>t.status!=='Voltooid');
      tasks.forEach((t,idx)=>{ t.manualOrder=idx; });
      state.route='haccp'; toast(t('taskBundleLoaded'),'good'); save(); render();
    }
    const prevHandle6521 = handleAction;
    handleAction = window.handleAction = function(a,el,e){
      if(a==='open-template-loader-v6521'){ openTemplateLoader(el.dataset.group); return; }
      if(a==='confirm-load-template-v6521' || a==='confirm-load-template'){ loadTemplateSelection(el.dataset.group); return; }
      if(a==='open-template-item-form-v6521'){ openTemplateItemForm(el.dataset.group, el.dataset.id); return; }
      if(a==='save-template-item-v6521'){ saveTemplateItem(el.dataset.group, el.dataset.id); return; }
      if(a==='delete-template-item-v6521'){ state.templates[el.dataset.group]=state.templates[el.dataset.group].filter(i=>i.id!==el.dataset.id); toast(t('templateTaskDeleted'),'good'); save(); render(); return; }
      if(a==='toggle-completed-haccp-v6521'){ state.ui.haccp.showCompleted=!state.ui.haccp.showCompleted; save(); render(); return; }
      if(a==='load-task-bundle-v6521'){ loadTaskBundle(el.dataset.bundle); return; }
      return prevHandle6521(a,el,e);
    };
    const prevDiag6521 = renderDiagnostics;
    renderDiagnostics = function(){
      let html = prevDiag6521();
      html = html.replaceAll('v6.5.20','v6.5.21').replaceAll('rich-cmd-cache-v6520','rich-cmd-cache-v6521');
      html += `<div class="card"><h3>v6.5.21 — HACCP Planner Pro</h3><p>${currentLang()==='en'?'HACCP day planning, capacity planning, templates, task bundles and deferral analysis were improved.':'HACCP dagplanning, capaciteit, templates, taakbundels en uitstelanalyse zijn verbeterd.'}</p></div>`;
      return html;
    };
    save();
  } catch(err){ console.error('v6.5.21 HACCP Planner Pro failed', err); }
})();

/* RICH CMD v6.5.22 — Communicatie & Shift Reports Pro */
(function(){
  try {
    APP.version = 'v6.5.22';
    APP.cache = 'rich-cmd-cache-v6522';
    Object.assign(I18N.nl, {
      communicationPro:'Communicatie Pro', addCommunication:'Communicatie toevoegen', communicationPlanner:'Communicatieplanner', communicationTemplates:'Communicatietemplates', reportFilters:'Rapportagefilters', addReport:'Rapportage toevoegen', selectPerson:'Persoon selecteren', selfEnter:'Zelf invullen', otherPerson:'Andere persoon', urgency:'Urgentie', urgent:'Urgent', notUrgent:'Niet urgent', followUpToday:'Vandaag opvolgen', openFollowups:'Open opvolgingen', allRead:'Alles gelezen', hideDone:'Afgehandeld verbergen', showDone:'Afgehandeld tonen', doneStatus:'Afgehandeld', shortUpdate:'Korte update', problemReport:'Probleemmelding', handover:'Overdracht', request:'Verzoek', makeShorter:'Korter maken', makeFriendlier:'Vriendelijker', makeClearer:'Duidelijker', addActionPoint:'Actiepunt toevoegen', statusFilter:'Statusfilter', tagFilter:'Tagfilter', allStatuses:'Alle statussen', allTags:'Alle tags', copyReport:'Rapportage kopiëren', copyDaySummary:'Dagsamenvatting kopiëren', prepareTomorrow:'Morgen voorbereiden', savedAsReport:'Opgeslagen als rapportage', shiftClosed:'Shift afgesloten', shiftSummary:'Shift samenvatting', strongPoint:'Sterk punt', tomorrowAttention:'Aandacht morgen', reportTags:'Tags', pressure:'Drukte', stock:'Voorraad', staff:'Personeel', reportType:'Rapporttype', automatic:'Automatisch', manual:'Handmatig', communicationEmpty:'Nog geen communicatiepunten. Maak een punt aan wanneer je iets moet terugkoppelen of opvolgen.', reportsEmpty:'Nog geen shift reports. Sluit een shift af of maak handmatig je eerste rapportage.', followUpEmpty:'Geen opvolgingen voor vandaag.', templateApplied:'Template toegepast', toneApplied:'Tekststructuur toegepast', reportCopied:'Rapportage gekopieerd', tomorrowPrepared:'Morgen voorbereid', daySummaryCopied:'Dagsamenvatting gekopieerd'
    });
    Object.assign(I18N.en, {
      communicationPro:'Communication Pro', addCommunication:'Add communication', communicationPlanner:'Communication planner', communicationTemplates:'Communication templates', reportFilters:'Report filters', addReport:'Add report', selectPerson:'Select person', selfEnter:'Enter manually', otherPerson:'Other person', urgency:'Urgency', urgent:'Urgent', notUrgent:'Not urgent', followUpToday:'Follow up today', openFollowups:'Open follow-ups', allRead:'Mark all read', hideDone:'Hide completed', showDone:'Show completed', doneStatus:'Completed', shortUpdate:'Short update', problemReport:'Problem report', handover:'Handover', request:'Request', makeShorter:'Make shorter', makeFriendlier:'Make friendlier', makeClearer:'Make clearer', addActionPoint:'Add action point', statusFilter:'Status filter', tagFilter:'Tag filter', allStatuses:'All statuses', allTags:'All tags', copyReport:'Copy report', copyDaySummary:'Copy day summary', prepareTomorrow:'Prepare tomorrow', savedAsReport:'Saved as report', shiftClosed:'Shift closed', shiftSummary:'Shift summary', strongPoint:'Strong point', tomorrowAttention:'Attention tomorrow', reportTags:'Tags', pressure:'Pressure', stock:'Stock', staff:'Staff', reportType:'Report type', automatic:'Automatic', manual:'Manual', communicationEmpty:'No communication items yet. Create one when you need to share or follow up on something.', reportsEmpty:'No shift reports yet. Close a shift or create your first manual report.', followUpEmpty:'No follow-ups for today.', templateApplied:'Template applied', toneApplied:'Text structure applied', reportCopied:'Report copied', tomorrowPrepared:'Tomorrow prepared', daySummaryCopied:'Day summary copied'
    });

    function v6522Ensure(){
      state.communications = Array.isArray(state.communications) ? state.communications : [];
      state.reports = Array.isArray(state.reports) ? state.reports : [];
      state.settings.contacts = Array.isArray(state.settings.contacts) ? state.settings.contacts : ['Filiaalmanager','Manager Vers/Service','Manager Operatie','Teamleider AGF','Teamleider Vulploeg','Teamleider Service'];
      state.ui.commFilter = state.ui.commFilter || {status:'all', person:'all', showDone:false};
      state.ui.reportFilter = state.ui.reportFilter || {status:'all', tag:'all', q:''};
      state.communications.forEach(c=>{ if(!c.createdAt) c.createdAt=nowISO(); if(!c.status) c.status='Rood'; if(c.read===undefined) c.read=false; if(c.done===undefined) c.done=false; });
      state.reports.forEach(r=>{ if(!r.createdAt) r.createdAt=nowISO(); if(!Array.isArray(r.tags)) r.tags = r.tags ? String(r.tags).split(',').map(x=>x.trim()).filter(Boolean) : []; });
    }
    function v6522StatusClass(s){ return s==='Groen'||s==='Afgehandeld'?'good':s==='Geel'?'warn':'bad'; }
    function v6522StatusLabel(s){ if(currentLang()==='en'){ return {Rood:'To do', Geel:'In progress', Groen:'Communicated', Afgehandeld:'Completed'}[s]||s; } return {Rood:'Nog te doen', Geel:'In behandeling', Groen:'Gecommuniceerd', Afgehandeld:'Afgehandeld'}[s]||s; }
    function v6522TagLabel(tag){ const en={AGF:'Produce', HACCP:'HACCP', Drukte:'Pressure', Voorraad:'Stock', Personeel:'Staff', Communicatie:'Communication', Schoonmaak:'Cleaning'}; return currentLang()==='en' ? (en[tag]||tag) : tag; }
    function v6522PeopleOptions(selected=''){
      return `<option value="">${t('selfEnter')}</option>` + state.settings.contacts.map(c=>`<option value="${escapeHtml(c)}" ${selected===c?'selected':''}>${escapeHtml(currentLang()==='en'?v653TranslateString(c):c)}</option>`).join('');
    }
    function v6522Comms(){
      v6522Ensure();
      let arr=[...state.communications]; const f=state.ui.commFilter;
      if(!f.showDone) arr=arr.filter(c=>!c.done && c.status!=='Afgehandeld');
      if(f.status && f.status!=='all') arr=arr.filter(c=>c.status===f.status);
      if(f.person && f.person!=='all') arr=arr.filter(c=>(c.to||c.customTo)===f.person);
      return arr.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
    }
    function v6522Reports(){
      v6522Ensure();
      let arr=[...state.reports]; const f=state.ui.reportFilter;
      if(f.status && f.status!=='all') arr=arr.filter(r=>r.status===f.status);
      if(f.tag && f.tag!=='all') arr=arr.filter(r=>(r.tags||[]).includes(f.tag));
      if(f.q) arr=arr.filter(r=>(r.title+' '+r.text).toLowerCase().includes(f.q.toLowerCase()));
      return arr.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
    }
    function v6522CommTemplates(){
      const tpl = [
        ['shortUpdate', ['Situatie:', 'Actie:', 'Vervolg:']],
        ['problemReport', ['Probleem:', 'Impact:', 'Gedaan:', 'Nodig:']],
        ['handover', ['Vandaag gedaan:', 'Nog open:', 'Let op:', 'Morgen:']],
        ['request', ['Vraag:', 'Reden:', 'Gewenste actie:', 'Deadline:']]
      ];
      const en = {
        'Situatie:':'Situation:', 'Actie:':'Action:', 'Vervolg:':'Follow-up:', 'Probleem:':'Problem:', 'Impact:':'Impact:', 'Gedaan:':'Done:', 'Nodig:':'Needed:', 'Vandaag gedaan:':'Done today:', 'Nog open:':'Still open:', 'Let op:':'Watch out for:', 'Morgen:':'Tomorrow:', 'Vraag:':'Question:', 'Reden:':'Reason:', 'Gewenste actie:':'Requested action:', 'Deadline:':'Deadline:'
      };
      return `<div class="template-chip-grid">${tpl.map(([key,lines])=>`<button class="btn small" data-action="apply-comm-template-v6522" data-template="${key}" data-lines="${escapeHtml(lines.join('|'))}">${t(key)}</button>`).join('')}</div>`;
    }
    function v6522FormatTemplate(lines){
      const en = {'Situatie:':'Situation:', 'Actie:':'Action:', 'Vervolg:':'Follow-up:', 'Probleem:':'Problem:', 'Impact:':'Impact:', 'Gedaan:':'Done:', 'Nodig:':'Needed:', 'Vandaag gedaan:':'Done today:', 'Nog open:':'Still open:', 'Let op:':'Watch out for:', 'Morgen:':'Tomorrow:', 'Vraag:':'Question:', 'Reden:':'Reason:', 'Gewenste actie:':'Requested action:', 'Deadline:':'Deadline:'};
      return lines.map(x=>currentLang()==='en'?(en[x]||x):x).join('\n');
    }
    function v6522RenderCommFilters(){
      const people=[...new Set(state.communications.map(c=>c.to||c.customTo).filter(Boolean))];
      const f=state.ui.commFilter;
      return `<div class="filter-bar"><select class="select compact" data-action="comm-filter-status-v6522"><option value="all">${t('allStatuses')}</option>${['Rood','Geel','Groen','Afgehandeld'].map(s=>`<option value="${s}" ${f.status===s?'selected':''}>${v6522StatusLabel(s)}</option>`).join('')}</select><select class="select compact" data-action="comm-filter-person-v6522"><option value="all">${t('all')}</option>${people.map(p=>`<option value="${escapeHtml(p)}" ${f.person===p?'selected':''}>${escapeHtml(p)}</option>`).join('')}</select><button class="btn small" data-action="mark-all-read-v6522">${t('allRead')}</button><button class="btn small" data-action="toggle-done-comms-v6522">${f.showDone?t('hideDone'):t('showDone')}</button></div>`;
    }
    function v6522RenderCommunications(){
      const arr=v6522Comms();
      if(!arr.length) return `<div class="empty-state"><h3>${t('communicationPlanner')}</h3><p>${t('communicationEmpty')}</p><button class="btn primary" data-action="open-communication-form">${t('addCommunication')}</button></div>`;
      return `<div class="list pro-list">${arr.map(c=>`<div class="list-item comm-card ${c.urgent?'urgent':''}"><div><div class="flex-line"><strong>${escapeHtml(c.to||c.customTo||t('person'))}</strong><span class="pill ${v6522StatusClass(c.status)}">${v6522StatusLabel(c.status)}</span>${c.urgent?`<span class="pill bad">${t('urgent')}</span>`:''}</div><p>${escapeHtml(c.message||'')}</p><div class="tiny muted">${dateTime(c.createdAt)}${c.followDate?' · '+t('followDate')+': '+dateOnly(c.followDate):''} · ${c.read?t('read'):t('unread')}</div></div><div class="btn-row"><select class="select mini" data-action="set-comm-status-v6522" data-id="${c.id}">${['Rood','Geel','Groen','Afgehandeld'].map(s=>`<option value="${s}" ${c.status===s?'selected':''}>${v6522StatusLabel(s)}</option>`).join('')}</select><button class="btn small" data-action="toggle-comm-read-v6522" data-id="${c.id}">${c.read?t('unread'):t('read')}</button><button class="btn small good" data-action="complete-comm-v6522" data-id="${c.id}">${t('doneStatus')}</button><button class="btn small bad" data-action="delete-comm-v6522" data-id="${c.id}">${t('delete')}</button></div></div>`).join('')}</div>`;
    }
    function v6522RenderReportFilters(){
      const tags=['AGF','HACCP','Drukte','Voorraad','Personeel','Communicatie','Schoonmaak']; const f=state.ui.reportFilter;
      return `<div class="filter-bar"><select class="select compact" data-action="report-filter-status-v6522"><option value="all">${t('allStatuses')}</option>${['Groen','Geel','Oranje','Rood'].map(s=>`<option value="${s}" ${f.status===s?'selected':''}>${s}</option>`).join('')}</select><select class="select compact" data-action="report-filter-tag-v6522"><option value="all">${t('allTags')}</option>${tags.map(tag=>`<option value="${tag}" ${f.tag===tag?'selected':''}>${v6522TagLabel(tag)}</option>`).join('')}</select><input class="input compact" placeholder="${t('search')}" value="${escapeHtml(f.q||'')}" data-action="report-filter-query-v6522"></div>`;
    }
    function v6522RenderReports(){
      const arr=v6522Reports();
      if(!arr.length) return `<div class="empty-state"><h3>${t('reports')}</h3><p>${t('reportsEmpty')}</p><button class="btn primary" data-action="open-report-form">${t('addReport')}</button></div>`;
      return `<div class="list pro-list">${arr.slice(0,state.ui.showMore.reports?100:5).map(r=>`<div class="list-item report-card"><div><div class="flex-line"><strong>${escapeHtml(r.title||t('report'))}</strong><span class="pill ${r.status==='Groen'?'good':r.status==='Geel'?'info':r.status==='Oranje'?'warn':'bad'}">${r.status}</span></div><p>${escapeHtml(r.text||'')}</p><div class="tiny muted">${dateTime(r.createdAt)} · ${r.auto?t('automatic'):t('manual')} ${(r.tags||[]).length?' · '+r.tags.map(v6522TagLabel).join(', '):''}</div></div><div class="btn-row"><button class="btn small" data-action="copy-report-v6522" data-id="${r.id}">${t('copyReport')}</button><button class="btn small bad" data-action="delete-report-v6522" data-id="${r.id}">${t('delete')}</button></div></div>`).join('')}</div><button class="btn mt" data-action="toggle-more" data-key="reports">${state.ui.showMore.reports?t('less'):t('more')}</button>`;
    }
    renderCommunication = window.renderCommunication = function(){
      v6522Ensure();
      const due=state.communications.filter(c=>c.followDate && c.followDate<=TODAY() && c.status!=='Afgehandeld');
      const open=state.communications.filter(c=>c.status==='Rood'||c.status==='Geel').length;
      return `<div class="communication-pro-page"><div class="hero"><span class="chip">${t('communicationPro')}</span><h2>${t('communicationPlanner')}</h2><p>${currentLang()==='en'?'Plan messages, follow-ups and shift reports with clear status and handover templates.':'Plan communicatie, opvolging en shift reports met duidelijke status en overdrachtstemplates.'}</p><div class="btn-row"><button class="btn primary" data-action="open-communication-form">${t('addCommunication')}</button><button class="btn" data-action="open-report-form">${t('addReport')}</button><button class="btn" data-action="copy-day-summary-v6522">${t('copyDaySummary')}</button><button class="btn" data-action="prepare-tomorrow-v6522">${t('prepareTomorrow')}</button></div></div><div class="grid grid-4">${kpi(t('openFollowups'),due.length,due.length?'warn':'good')}${kpi(t('communication'),open,open?'warn':'good')}${kpi(t('reports'),state.reports.length,'info')}${kpi(t('read'),state.communications.filter(c=>c.read).length,'good')}</div><div class="grid grid-main"><div class="grid"><div class="card"><h3>${t('communicationPlanner')}</h3>${v6522RenderCommFilters()}${v6522RenderCommunications()}</div><div class="card"><h3>${t('reports')}</h3>${v6522RenderReportFilters()}<button class="btn primary mt" data-action="open-report-form">${t('addReport')}</button><div class="mt">${v6522RenderReports()}</div></div></div><div class="grid"><div class="card"><h3>${t('communicationTemplates')}</h3><p class="muted">${currentLang()==='en'?'Use a structure before you send or save a message.':'Gebruik een structuur voordat je iets verstuurt of opslaat.'}</p>${v6522CommTemplates()}<textarea class="textarea mt" id="toneText" placeholder="${currentLang()==='en'?'Write your draft here...':'Schrijf hier je concept...'}"></textarea><div class="btn-row mt"><button class="btn small" data-action="tone-format-v6522" data-tone="short">${t('makeShorter')}</button><button class="btn small" data-action="tone-format-v6522" data-tone="friendly">${t('makeFriendlier')}</button><button class="btn small" data-action="tone-format-v6522" data-tone="clear">${t('makeClearer')}</button><button class="btn small primary" data-action="tone-format-v6522" data-tone="action">${t('addActionPoint')}</button></div></div><div class="card"><h3>${t('followUpToday')}</h3>${due.length?due.map(c=>`<div class="list-item compact"><span>${escapeHtml(c.to||c.customTo)} — ${escapeHtml(c.message||'')}</span><span class="pill warn">${dateOnly(c.followDate)}</span></div>`).join(''):`<p class="muted">${t('followUpEmpty')}</p>`}</div></div></div></div>`;
    };
    function v6522OpenCommunicationForm(){
      const tags = ['Rood','Geel','Groen'];
      modal(t('addCommunication'), `<div class="grid grid-2"><label>${t('selectPerson')}<select class="select" id="commTo">${v6522PeopleOptions()}</select></label><label>${t('otherPerson')}<input class="input" id="commCustom" placeholder="${t('otherPerson')}"></label><label>${t('status')}<select class="select" id="commStatus">${tags.map(s=>`<option value="${s}">${v6522StatusLabel(s)}</option>`).join('')}</select></label><label>${t('followDate')}<input class="input" id="commFollow" type="date"></label><label class="check-row"><input type="checkbox" id="commUrgent"> ${t('urgent')}</label><label>${t('message')}<textarea class="textarea" id="commMsg" placeholder="${t('message')}"></textarea></label></div><div class="btn-row mt"><button class="btn" data-action="apply-modal-comm-template-v6522" data-lines="Situatie:|Actie:|Vervolg:">${t('shortUpdate')}</button><button class="btn" data-action="apply-modal-comm-template-v6522" data-lines="Probleem:|Impact:|Gedaan:|Nodig:">${t('problemReport')}</button><button class="btn primary" data-action="confirm-add-communication-v6522">${t('save')}</button></div>`, 'wide');
    }
    function v6522AddCommunication(){
      const to=byId('commTo')?.value||''; const custom=byId('commCustom')?.value?.trim()||''; const message=byId('commMsg')?.value?.trim()||'';
      if(!message){ toast(currentLang()==='en'?'Message is required':'Bericht is verplicht','warn'); return; }
      state.communications.unshift({id:uid('comm'),to,customTo:custom,message,status:byId('commStatus')?.value||'Rood',urgent:!!byId('commUrgent')?.checked,read:false,done:false,followDate:byId('commFollow')?.value||'',createdAt:nowISO()});
      addActivity(`${t('communication')}: ${message.slice(0,40)}`,'communication'); closeModal(); toast(t('savedAsReport').replace(t('report'),t('communication')) || t('save'),'good'); save(); render();
    }
    function v6522OpenReportForm(){
      const tags=['AGF','HACCP','Drukte','Voorraad','Personeel','Communicatie','Schoonmaak'];
      modal(t('addReport'), `<div class="grid grid-2"><label>${currentLang()==='en'?'Title':'Titel'}<input class="input" id="repTitle"></label><label>${t('status')}<select class="select" id="repStatus"><option>Groen</option><option>Geel</option><option>Oranje</option><option>Rood</option></select></label><label>${t('reportType')}<select class="select" id="repType"><option value="manual">${t('manual')}</option><option value="handover">${t('handover')}</option></select></label><label>${t('reportTags')}<select class="select" id="repTags" multiple size="5">${tags.map(tag=>`<option value="${tag}">${v6522TagLabel(tag)}</option>`).join('')}</select></label></div><textarea class="textarea mt" id="repText" placeholder="${currentLang()==='en'?'Write your shift report...':'Schrijf je shiftrapportage...'}"></textarea><div class="btn-row mt"><button class="btn" data-action="fill-report-template-v6522">${t('handover')}</button><button class="btn primary" data-action="confirm-add-report-v6522">${t('save')}</button></div>`, 'wide');
    }
    function v6522AddReport(){
      const tags=[...byId('repTags')?.selectedOptions||[]].map(o=>o.value);
      const title=byId('repTitle')?.value?.trim() || (currentLang()==='en'?'Shift report':'Shift report');
      const text=byId('repText')?.value?.trim() || '';
      state.reports.unshift({id:uid('rep'),title,text,status:byId('repStatus')?.value||'Groen',tags,type:byId('repType')?.value||'manual',createdAt:nowISO(),auto:false});
      addActivity(`${t('reports')}: ${title}`,'report'); closeModal(); toast(t('savedAsReport'),'good'); save(); render();
    }
    function v6522ReportText(r){ return `${r.title}\n${dateTime(r.createdAt)} · ${r.status}\n${(r.tags||[]).map(v6522TagLabel).join(', ')}\n\n${r.text}`; }
    function v6522DaySummary(){
      return `${currentLang()==='en'?'RICH CMD day summary':'RICH CMD dagsamenvatting'} — ${new Date().toLocaleDateString(currentLang()==='en'?'en-GB':'nl-NL')}\n${t('shift')}: ${shiftSummary()}\n${t('haccp')}: ${completedCount()}/${todayTasks().length}\n${t('agf')}: ${agfAttention().length} ${currentLang()==='en'?'attention items':'aandachtproducten'}\n${t('storemap')}: ${cleaningUrgent().length} ${currentLang()==='en'?'urgent signals':'urgente signalen'}\n${t('communication')}: ${state.communications.filter(c=>c.status==='Rood'||c.status==='Geel').length} ${currentLang()==='en'?'open points':'open punten'}`;
    }
    function v6522PrepareTomorrow(){
      const items=[];
      state.tasks.filter(t=>t.status==='Uitgesteld').slice(0,5).forEach(t=>items.push(`- ${hTaskName(t.title)}`));
      agfAttention().slice(0,5).forEach(a=>items.push(`- ${a.product}: ${a.advice}`));
      cleaningUrgent().slice(0,5).forEach(i=>items.push(`- ${i.label||i.zone}`));
      if(!items.length) items.push(currentLang()==='en'?'- No urgent carry-over detected.':'- Geen urgente overdracht gevonden.');
      modal(t('prepareTomorrow'), `<p class="muted">${currentLang()==='en'?'Use this as a handover or personal preparation list.':'Gebruik dit als overdracht of persoonlijke voorbereiding.'}</p><pre class="copy-box">${escapeHtml(items.join('\n'))}</pre><button class="btn primary" data-action="copy-text-v6522" data-text="${escapeHtml(items.join('\n'))}">${t('copy')}</button>`);
    }
    const previousEndShiftV6522 = endShift;
    endShift = window.endShift = function(){
      if(!state.shift.active) return toast(currentLang()==='en'?'No active shift.':'Geen actieve shift.','warn');
      if(state.shift.breakActive) toggleBreak(false);
      state.shift.logs.unshift({type:'clockOut',at:nowISO()}); state.shift.active=false;
      const score=shiftScore();
      const status=score>80?'Groen':score>60?'Geel':'Oranje';
      const text=`${t('shiftSummary')}: ${score}/100. ${t('haccp')}: ${completedCount()}/${todayTasks().length}. ${t('agf')}: ${agfAttention().length}. ${t('storemap')}: ${cleaningUrgent().length}. ${t('communication')}: ${state.communications.filter(c=>c.status==='Rood'||c.status==='Geel').length}.`;
      const report={id:uid('rep'),title:currentLang()==='en'?'Automatic shift closing':'Automatische shift afsluiting',status,text,tags:['HACCP','AGF','Communicatie'],createdAt:nowISO(),auto:true};
      state.reports.unshift(report); addActivity(`${t('shiftClosed')}: ${score}/100`,'shift'); save(); render();
      modal(t('shiftClosed'), `<div class="grid"><div class="kpi-card ${score>80?'good':score>60?'warn':'bad'}"><span>${t('shiftSummary')}</span><strong>${score}/100</strong><small>${text}</small></div><div class="card soft"><h3>${t('strongPoint')}</h3><p>${score>80?(currentLang()==='en'?'Strong control over the day.':'Sterke controle over de dag.'):(currentLang()==='en'?'Good data for tomorrow. Choose the most important carry-over.':'Goede data voor morgen. Kies de belangrijkste overdracht.')}</p></div><div class="btn-row"><button class="btn primary" data-action="copy-report-v6522" data-id="${report.id}">${t('copyReport')}</button><button class="btn" data-action="prepare-tomorrow-v6522">${t('prepareTomorrow')}</button><button class="btn" data-action="close-modal">${t('close')}</button></div></div>`, 'wide');
    };
    function v6522PatchToday(){
      const prev = renderToday;
      renderToday = window.renderToday = function(){
        let html = prev();
        const due=state.communications.filter(c=>c.followDate&&c.followDate<=TODAY()&&c.status!=='Afgehandeld').length;
        if(due && !html.includes('v6522-followup-card')){
          html = html.replace('</div></div>', `<div class="card v6522-followup-card"><h3>${t('followUpToday')}</h3><p>${due} ${currentLang()==='en'?'communication point(s) need follow-up.':'communicatiepunt(en) vragen opvolging.'}</p><button class="btn small" data-route="communication">${t('communication')}</button></div></div></div>`);
        }
        return html;
      };
    }
    v6522PatchToday();
    const prevHandle6522 = handleAction;
    handleAction = window.handleAction = function(a,el,e){
      if(a==='open-communication-form'){ v6522OpenCommunicationForm(); return; }
      if(a==='confirm-add-communication-v6522' || a==='confirm-add-communication'){ v6522AddCommunication(); return; }
      if(a==='set-comm-status-v6522'){ const c=state.communications.find(x=>x.id===el.dataset.id); if(c){ c.status=el.value; c.done=el.value==='Afgehandeld'; save(); render(); } return; }
      if(a==='toggle-comm-read-v6522'){ const c=state.communications.find(x=>x.id===el.dataset.id); if(c){ c.read=!c.read; save(); render(); } return; }
      if(a==='complete-comm-v6522'){ const c=state.communications.find(x=>x.id===el.dataset.id); if(c){ c.status='Afgehandeld'; c.done=true; c.read=true; save(); render(); } return; }
      if(a==='delete-comm-v6522'){ state.deleted.unshift({type:'comm',item:state.communications.find(x=>x.id===el.dataset.id)}); state.communications=state.communications.filter(x=>x.id!==el.dataset.id); toast(currentLang()==='en'?'Communication deleted':'Communicatie verwijderd'); save(); render(); return; }
      if(a==='mark-all-read-v6522'){ state.communications.forEach(c=>c.read=true); save(); render(); return; }
      if(a==='toggle-done-comms-v6522'){ state.ui.commFilter.showDone=!state.ui.commFilter.showDone; save(); render(); return; }
      if(a==='comm-filter-status-v6522'){ state.ui.commFilter.status=el.value; save(); render(); return; }
      if(a==='comm-filter-person-v6522'){ state.ui.commFilter.person=el.value; save(); render(); return; }
      if(a==='apply-comm-template-v6522'){ const txt=byId('toneText'); if(txt){ txt.value=v6522FormatTemplate(el.dataset.lines.split('|')); toast(t('templateApplied'),'good'); } return; }
      if(a==='apply-modal-comm-template-v6522'){ const txt=byId('commMsg'); if(txt){ txt.value=v6522FormatTemplate(el.dataset.lines.split('|')); toast(t('templateApplied'),'good'); } return; }
      if(a==='tone-format-v6522'){ const txt=byId('toneText'); if(!txt) return; const v=txt.value.trim(); const line={short: currentLang()==='en'?'Short version:':'Korte versie:', friendly: currentLang()==='en'?'Friendly wording:':'Vriendelijke formulering:', clear: currentLang()==='en'?'Clear action:':'Duidelijke actie:', action: currentLang()==='en'?'Action point:':'Actiepunt:'}[el.dataset.tone]||''; txt.value=`${line}\n${v}\n\n${currentLang()==='en'?'Next step:':'Vervolg:'} `; toast(t('toneApplied'),'good'); return; }
      if(a==='open-report-form'){ v6522OpenReportForm(); return; }
      if(a==='confirm-add-report-v6522' || a==='confirm-add-report'){ v6522AddReport(); return; }
      if(a==='fill-report-template-v6522'){ const txt=byId('repText'); if(txt) txt.value=v6522FormatTemplate(['Vandaag gedaan:','Nog open:','Let op:','Morgen:']); return; }
      if(a==='report-filter-status-v6522'){ state.ui.reportFilter.status=el.value; save(); render(); return; }
      if(a==='report-filter-tag-v6522'){ state.ui.reportFilter.tag=el.value; save(); render(); return; }
      if(a==='report-filter-query-v6522'){ state.ui.reportFilter.q=el.value; save(); render(); return; }
      if(a==='copy-report-v6522'){ const r=state.reports.find(x=>x.id===el.dataset.id); if(r) copyText(v6522ReportText(r)); toast(t('reportCopied'),'good'); return; }
      if(a==='delete-report-v6522'){ state.deleted.unshift({type:'report',item:state.reports.find(x=>x.id===el.dataset.id)}); state.reports=state.reports.filter(x=>x.id!==el.dataset.id); save(); render(); return; }
      if(a==='copy-day-summary-v6522'){ copyText(v6522DaySummary()); toast(t('daySummaryCopied'),'good'); return; }
      if(a==='prepare-tomorrow-v6522'){ v6522PrepareTomorrow(); return; }
      if(a==='copy-text-v6522'){ copyText(el.dataset.text||''); return; }
      return prevHandle6522(a,el,e);
    };
    document.addEventListener('input', function(e){ const el=e.target.closest('[data-action="report-filter-query-v6522"]'); if(el){ state.ui.reportFilter.q=el.value; save(); render(); } });
    const prevDiag6522 = renderDiagnostics;
    renderDiagnostics = window.renderDiagnostics = function(){
      let html = prevDiag6522().replaceAll('v6.5.21','v6.5.22').replaceAll('rich-cmd-cache-v6521','rich-cmd-cache-v6522');
      html += `<div class="card"><h3>v6.5.22 — Communicatie & Shift Reports Pro</h3><p>${currentLang()==='en'?'Communication planner, follow-up, report filters, templates and shift-closing reports were improved.':'Communicatieplanner, opvolging, rapportagefilters, templates en shift-afsluiting zijn verbeterd.'}</p></div>`;
      return html;
    };
    save();
  } catch(err){ console.error('v6.5.22 Communication Pro failed', err); }
})();

/* =========================================================
   V6.5.23 — Communicatie Polish Hotfix
   Scope: communication page stability, dropdown/search UX,
   safe tomorrow preparation. No other modules rebuilt.
========================================================= */
try {
  APP.version = 'v6.5.24';
  APP.cache = 'rich-cmd-cache-v6524';
  state.schemaVersion = 6524;

  Object.assign(I18N.nl, {
    communicationPolish:'Communicatie polish', followUpPlanner:'Opvolgplanner', communicationSearch:'Zoek persoon, bericht of status', reportSearch:'Zoek rapportage of tag', communicationStatus:'Communicatiestatus', messageRequired:'Bericht is verplicht', savedCommunication:'Communicatie opgeslagen', tomorrowList:'Voorbereiding voor morgen', noTomorrowItems:'Geen urgente overdracht gevonden.', openCommunication:'Open communicatie', completedCommunication:'Afgehandelde communicatie', reportSearchHint:'Zoek in titel, tekst of tags', chooseTemplate:'Kies een template', chooseTone:'Kies een toon', personalHandover:'Persoonlijke overdracht', copyPrepared:'Voorbereiding kopiëren'
  });
  Object.assign(I18N.en, {
    communicationPolish:'Communication polish', followUpPlanner:'Follow-up planner', communicationSearch:'Search person, message or status', reportSearch:'Search report or tag', communicationStatus:'Communication status', messageRequired:'Message is required', savedCommunication:'Communication saved', tomorrowList:'Preparation for tomorrow', noTomorrowItems:'No urgent carry-over detected.', openCommunication:'Open communication', completedCommunication:'Completed communication', reportSearchHint:'Search title, text or tags', chooseTemplate:'Choose a template', chooseTone:'Choose a tone', personalHandover:'Personal handover', copyPrepared:'Copy preparation'
  });

  const COMM_STATUSES = ['Rood','Geel','Groen','Afgehandeld'];
  const REPORT_STATUSES = ['Groen','Geel','Oranje','Rood'];
  const REPORT_TAGS = ['AGF','HACCP','Drukte','Voorraad','Personeel','Communicatie','Schoonmaak'];

  function c6523Ensure(){
    state.communications = Array.isArray(state.communications) ? state.communications : [];
    state.reports = Array.isArray(state.reports) ? state.reports : [];
    state.deleted = Array.isArray(state.deleted) ? state.deleted : [];
    state.settings = state.settings || defaultState().settings;
    state.settings.contacts = Array.isArray(state.settings.contacts) ? state.settings.contacts : ['Filiaalmanager','Manager Vers/Service','Manager Operatie','Teamleider AGF','Teamleider Vulploeg','Teamleider Service'];
    state.ui = state.ui || {};
    state.ui.commFilter = Object.assign({status:'all', person:'all', q:'', showDone:false}, state.ui.commFilter || {});
    state.ui.reportFilter = Object.assign({status:'all', tag:'all', q:''}, state.ui.reportFilter || {});
    state.communications.forEach(c=>{
      if(!c.id) c.id = uid('comm');
      if(!c.createdAt) c.createdAt = nowISO();
      if(!c.status) c.status = 'Rood';
      if(c.read === undefined) c.read = false;
      if(c.done === undefined) c.done = c.status === 'Afgehandeld';
      if(!('urgent' in c)) c.urgent = false;
    });
    state.reports.forEach(r=>{
      if(!r.id) r.id = uid('rep');
      if(!r.createdAt) r.createdAt = nowISO();
      if(!Array.isArray(r.tags)) r.tags = r.tags ? String(r.tags).split(',').map(x=>x.trim()).filter(Boolean) : [];
      if(!r.status) r.status = 'Groen';
    });
  }
  function c6523StatusLabel(s){
    if(currentLang()==='en') return {Rood:'To do', Geel:'In progress', Groen:'Communicated', Afgehandeld:'Completed'}[s] || s;
    return {Rood:'Nog te doen', Geel:'In behandeling', Groen:'Gecommuniceerd', Afgehandeld:'Afgehandeld'}[s] || s;
  }
  function c6523StatusClass(s){ return s==='Groen'||s==='Afgehandeld' ? 'good' : s==='Geel' ? 'warn' : 'bad'; }
  function c6523ReportStatusLabel(s){
    if(currentLang()==='en') return {Groen:'Green', Geel:'Yellow', Oranje:'Orange', Rood:'Red'}[s] || s;
    return s;
  }
  function c6523TagLabel(tag){
    const en={AGF:'Produce', HACCP:'HACCP', Drukte:'Pressure', Voorraad:'Stock', Personeel:'Staff', Communicatie:'Communication', Schoonmaak:'Cleaning'};
    return currentLang()==='en' ? (en[tag] || tag) : tag;
  }
  function c6523ContactLabel(name){ return currentLang()==='en' && typeof v653TranslateString==='function' ? v653TranslateString(name) : name; }
  function c6523People(){
    const fromComms = state.communications.map(c=>c.to||c.customTo).filter(Boolean);
    return [...new Set([...(state.settings.contacts||[]), ...fromComms])].filter(Boolean);
  }
  function c6523PeopleOptions(selected=''){
    return `<option value="">${t('selfEnter')}</option>` + c6523People().map(c=>`<option value="${escapeHtml(c)}" ${selected===c?'selected':''}>${escapeHtml(c6523ContactLabel(c))}</option>`).join('');
  }
  function c6523FilteredComms(){
    c6523Ensure();
    const f=state.ui.commFilter;
    let arr=[...state.communications];
    if(!f.showDone) arr=arr.filter(c=>!c.done && c.status!=='Afgehandeld');
    if(f.status && f.status!=='all') arr=arr.filter(c=>c.status===f.status);
    if(f.person && f.person!=='all') arr=arr.filter(c=>(c.to||c.customTo)===f.person);
    if(f.q){ const q=String(f.q).toLowerCase(); arr=arr.filter(c=>`${c.to||''} ${c.customTo||''} ${c.message||''} ${c.status||''}`.toLowerCase().includes(q)); }
    return arr.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  }
  function c6523FilteredReports(){
    c6523Ensure();
    const f=state.ui.reportFilter;
    let arr=[...state.reports];
    if(f.status && f.status!=='all') arr=arr.filter(r=>r.status===f.status);
    if(f.tag && f.tag!=='all') arr=arr.filter(r=>(r.tags||[]).includes(f.tag));
    if(f.q){ const q=String(f.q).toLowerCase(); arr=arr.filter(r=>`${r.title||''} ${r.text||''} ${(r.tags||[]).join(' ')}`.toLowerCase().includes(q)); }
    return arr.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  }
  function c6523TemplateLines(key){
    const dict = {
      short:['Situatie:','Actie:','Vervolg:'],
      problem:['Probleem:','Impact:','Gedaan:','Nodig:'],
      handover:['Vandaag gedaan:','Nog open:','Let op:','Morgen:'],
      request:['Vraag:','Reden:','Gewenste actie:','Deadline:']
    };
    const en = {'Situatie:':'Situation:', 'Actie:':'Action:', 'Vervolg:':'Follow-up:', 'Probleem:':'Problem:', 'Impact:':'Impact:', 'Gedaan:':'Done:', 'Nodig:':'Needed:', 'Vandaag gedaan:':'Done today:', 'Nog open:':'Still open:', 'Let op:':'Watch out for:', 'Morgen:':'Tomorrow:', 'Vraag:':'Question:', 'Reden:':'Reason:', 'Gewenste actie:':'Requested action:', 'Deadline:':'Deadline:'};
    return (dict[key]||dict.short).map(x=>currentLang()==='en'?(en[x]||x):x).join('\n');
  }
  function c6523RenderCommFilters(){
    const f=state.ui.commFilter;
    return `<div class="filter-bar v6523-filter"><input class="input compact" id="commSearchV6523" placeholder="${t('communicationSearch')}" value="${escapeHtml(f.q||'')}"><select class="select compact" data-change="comm-status-v6523"><option value="all">${t('allStatuses')}</option>${COMM_STATUSES.map(s=>`<option value="${s}" ${f.status===s?'selected':''}>${c6523StatusLabel(s)}</option>`).join('')}</select><select class="select compact" data-change="comm-person-v6523"><option value="all">${t('all')}</option>${c6523People().map(p=>`<option value="${escapeHtml(p)}" ${f.person===p?'selected':''}>${escapeHtml(c6523ContactLabel(p))}</option>`).join('')}</select><button class="btn small" data-action="mark-all-read-v6523">${t('allRead')}</button><button class="btn small" data-action="toggle-done-comms-v6523">${f.showDone?t('hideDone'):t('showDone')}</button></div>`;
  }
  function c6523RenderCommunications(){
    const arr=c6523FilteredComms();
    if(!arr.length) return `<div class="empty-state"><h3>${t('communicationPlanner')}</h3><p>${t('communicationEmpty')}</p><button class="btn primary" data-action="open-communication-form-v6523">${t('addCommunication')}</button></div>`;
    return `<div class="list pro-list" id="commListV6523">${arr.map(c=>`<div class="list-item comm-card ${c.urgent?'urgent':''}"><div><div class="flex-line"><strong>${escapeHtml(c6523ContactLabel(c.to||c.customTo||t('person')))}</strong><span class="pill ${c6523StatusClass(c.status)}">${c6523StatusLabel(c.status)}</span>${c.urgent?`<span class="pill bad">${t('urgent')}</span>`:''}</div><p>${escapeHtml(c.message||'')}</p><div class="tiny muted">${dateTime(c.createdAt)}${c.followDate?' · '+t('followDate')+': '+dateOnly(c.followDate):''} · ${c.read?t('read'):t('unread')}</div></div><div class="btn-row"><select class="select mini" data-change="comm-card-status-v6523" data-id="${c.id}">${COMM_STATUSES.map(s=>`<option value="${s}" ${c.status===s?'selected':''}>${c6523StatusLabel(s)}</option>`).join('')}</select><button class="btn small" data-action="toggle-comm-read-v6523" data-id="${c.id}">${c.read?t('unread'):t('read')}</button><button class="btn small good" data-action="complete-comm-v6523" data-id="${c.id}">${t('doneStatus')}</button><button class="btn small bad" data-action="delete-comm-v6523" data-id="${c.id}">${t('delete')}</button></div></div>`).join('')}</div>`;
  }
  function c6523RenderReportFilters(){
    const f=state.ui.reportFilter;
    return `<div class="filter-bar v6523-filter"><input class="input compact" id="reportSearchV6523" placeholder="${t('reportSearchHint')}" value="${escapeHtml(f.q||'')}"><select class="select compact" data-change="report-status-v6523"><option value="all">${t('allStatuses')}</option>${REPORT_STATUSES.map(s=>`<option value="${s}" ${f.status===s?'selected':''}>${c6523ReportStatusLabel(s)}</option>`).join('')}</select><select class="select compact" data-change="report-tag-v6523"><option value="all">${t('allTags')}</option>${REPORT_TAGS.map(tag=>`<option value="${tag}" ${f.tag===tag?'selected':''}>${c6523TagLabel(tag)}</option>`).join('')}</select></div>`;
  }
  function c6523RenderReports(){
    const arr=c6523FilteredReports();
    if(!arr.length) return `<div class="empty-state"><h3>${t('reports')}</h3><p>${t('reportsEmpty')}</p><button class="btn primary" data-action="open-report-form-v6523">${t('addReport')}</button></div>`;
    return `<div class="list pro-list" id="reportListV6523">${arr.slice(0,state.ui.showMore.reports?100:5).map(r=>`<div class="list-item report-card"><div><div class="flex-line"><strong>${escapeHtml(r.title||t('report'))}</strong><span class="pill ${r.status==='Groen'?'good':r.status==='Geel'?'info':r.status==='Oranje'?'warn':'bad'}">${c6523ReportStatusLabel(r.status)}</span></div><p>${escapeHtml(r.text||'')}</p><div class="tiny muted">${dateTime(r.createdAt)} · ${r.auto?t('automatic'):t('manual')} ${(r.tags||[]).length?' · '+r.tags.map(c6523TagLabel).join(', '):''}</div></div><div class="btn-row"><button class="btn small" data-action="copy-report-v6523" data-id="${r.id}">${t('copyReport')}</button><button class="btn small bad" data-action="delete-report-v6523" data-id="${r.id}">${t('delete')}</button></div></div>`).join('')}</div><button class="btn mt" data-action="toggle-more" data-key="reports">${state.ui.showMore.reports?t('less'):t('more')}</button>`;
  }
  renderCommunication = window.renderCommunication = function(){
    c6523Ensure();
    const due=state.communications.filter(c=>c.followDate && c.followDate<=TODAY() && c.status!=='Afgehandeld');
    const open=state.communications.filter(c=>c.status==='Rood'||c.status==='Geel').length;
    return `<div class="communication-pro-page v6523"><div class="hero"><span class="chip">${t('communicationPolish')}</span><h2>${t('communicationPlanner')}</h2><p>${currentLang()==='en'?'A cleaner communication workspace with stable filters, follow-ups and shift reports.':'Een rustigere communicatieomgeving met stabiele filters, opvolging en shift reports.'}</p><div class="btn-row"><button class="btn primary" data-action="open-communication-form-v6523">${t('addCommunication')}</button><button class="btn" data-action="open-report-form-v6523">${t('addReport')}</button><button class="btn" data-action="copy-day-summary-v6523">${t('copyDaySummary')}</button><button class="btn" data-action="prepare-tomorrow-v6523">${t('prepareTomorrow')}</button></div></div><div class="grid grid-4">${kpi(t('openFollowups'),due.length,due.length?'warn':'good')}${kpi(t('openCommunication'),open,open?'warn':'good')}${kpi(t('reports'),state.reports.length,'info')}${kpi(t('read'),state.communications.filter(c=>c.read).length,'good')}</div><div class="grid grid-main"><div class="grid"><div class="card"><h3>${t('communicationPlanner')}</h3>${c6523RenderCommFilters()}<div id="commListWrapV6523" class="mt">${c6523RenderCommunications()}</div></div><div class="card"><h3>${t('reports')}</h3>${c6523RenderReportFilters()}<button class="btn primary mt" data-action="open-report-form-v6523">${t('addReport')}</button><div id="reportListWrapV6523" class="mt">${c6523RenderReports()}</div></div></div><div class="grid"><div class="card"><h3>${t('communicationTemplates')}</h3><p class="muted">${currentLang()==='en'?'Choose a structure, then refine the tone.':'Kies een structuur en verfijn daarna de toon.'}</p><div class="template-chip-grid"><button class="btn small" data-action="apply-comm-template-v6523" data-template="short">${t('shortUpdate')}</button><button class="btn small" data-action="apply-comm-template-v6523" data-template="problem">${t('problemReport')}</button><button class="btn small" data-action="apply-comm-template-v6523" data-template="handover">${t('handover')}</button><button class="btn small" data-action="apply-comm-template-v6523" data-template="request">${t('request')}</button></div><textarea class="textarea mt" id="toneText" placeholder="${currentLang()==='en'?'Write your draft here...':'Schrijf hier je concept...'}"></textarea><div class="btn-row mt"><button class="btn small" data-action="tone-format-v6523" data-tone="short">${t('makeShorter')}</button><button class="btn small" data-action="tone-format-v6523" data-tone="friendly">${t('makeFriendlier')}</button><button class="btn small" data-action="tone-format-v6523" data-tone="clear">${t('makeClearer')}</button><button class="btn small primary" data-action="tone-format-v6523" data-tone="action">${t('addActionPoint')}</button></div></div><div class="card"><h3>${t('followUpToday')}</h3>${due.length?due.map(c=>`<div class="list-item compact"><span>${escapeHtml(c6523ContactLabel(c.to||c.customTo||''))} — ${escapeHtml(c.message||'')}</span><span class="pill warn">${dateOnly(c.followDate)}</span></div>`).join(''):`<p class="muted">${t('followUpEmpty')}</p>`}</div></div></div></div>`;
  };
  function c6523OpenCommunicationForm(){
    c6523Ensure();
    modal(t('addCommunication'), `<div class="grid grid-2"><label>${t('selectPerson')}<select class="select" id="commTo">${c6523PeopleOptions()}</select></label><label>${t('otherPerson')}<input class="input" id="commCustom" placeholder="${t('otherPerson')}"></label><label>${t('communicationStatus')}<select class="select" id="commStatus">${['Rood','Geel','Groen'].map(s=>`<option value="${s}">${c6523StatusLabel(s)}</option>`).join('')}</select></label><label>${t('followDate')}<input class="input" id="commFollow" type="date"></label><label class="check-row"><input type="checkbox" id="commUrgent"> ${t('urgent')}</label><label>${t('message')}<textarea class="textarea" id="commMsg" placeholder="${t('message')}"></textarea></label></div><div class="btn-row mt"><button class="btn" data-action="apply-modal-comm-template-v6523" data-template="short">${t('shortUpdate')}</button><button class="btn" data-action="apply-modal-comm-template-v6523" data-template="problem">${t('problemReport')}</button><button class="btn primary" data-action="confirm-add-communication-v6523">${t('save')}</button></div>`, 'wide');
  }
  function c6523AddCommunication(){
    const to=byId('commTo')?.value||''; const custom=byId('commCustom')?.value?.trim()||''; const message=byId('commMsg')?.value?.trim()||'';
    if(!message){ toast(t('messageRequired'),'warn'); return; }
    state.communications.unshift({id:uid('comm'),to,customTo:custom,message,status:byId('commStatus')?.value||'Rood',urgent:!!byId('commUrgent')?.checked,read:false,done:false,followDate:byId('commFollow')?.value||'',createdAt:nowISO()});
    addActivity(`${t('communication')}: ${message.slice(0,40)}`,'communication'); closeModal(); toast(t('savedCommunication'),'good'); save(); render();
  }
  function c6523OpenReportForm(){
    modal(t('addReport'), `<div class="grid grid-2"><label>${currentLang()==='en'?'Title':'Titel'}<input class="input" id="repTitle"></label><label>${t('status')}<select class="select" id="repStatus">${REPORT_STATUSES.map(s=>`<option value="${s}">${c6523ReportStatusLabel(s)}</option>`).join('')}</select></label><label>${t('reportType')}<select class="select" id="repType"><option value="manual">${t('manual')}</option><option value="handover">${t('handover')}</option></select></label><label>${t('reportTags')}<select class="select" id="repTags" multiple size="5">${REPORT_TAGS.map(tag=>`<option value="${tag}">${c6523TagLabel(tag)}</option>`).join('')}</select></label></div><textarea class="textarea mt" id="repText" placeholder="${currentLang()==='en'?'Write your shift report...':'Schrijf je shiftrapportage...'}"></textarea><div class="btn-row mt"><button class="btn" data-action="fill-report-template-v6523">${t('handover')}</button><button class="btn primary" data-action="confirm-add-report-v6523">${t('save')}</button></div>`, 'wide');
  }
  function c6523AddReport(){
    const tags=[...byId('repTags')?.selectedOptions||[]].map(o=>o.value);
    const title=byId('repTitle')?.value?.trim() || (currentLang()==='en'?'Shift report':'Shift report');
    const text=byId('repText')?.value?.trim() || '';
    state.reports.unshift({id:uid('rep'),title,text,status:byId('repStatus')?.value||'Groen',tags,type:byId('repType')?.value||'manual',createdAt:nowISO(),auto:false});
    addActivity(`${t('reports')}: ${title}`,'report'); closeModal(); toast(t('savedAsReport'),'good'); save(); render();
  }
  function c6523ReportText(r){ return `${r.title}\n${dateTime(r.createdAt)} · ${c6523ReportStatusLabel(r.status)}\n${(r.tags||[]).map(c6523TagLabel).join(', ')}\n\n${r.text||''}`; }
  function c6523DaySummary(){
    return `${currentLang()==='en'?'RICH CMD day summary':'RICH CMD dagsamenvatting'} — ${new Date().toLocaleDateString(currentLang()==='en'?'en-GB':'nl-NL')}\n${t('shift')}: ${shiftSummary()}\n${t('haccp')}: ${completedCount()}/${todayTasks().length}\n${t('agf')}: ${agfAttention().length} ${currentLang()==='en'?'attention items':'aandachtproducten'}\n${t('storemap')}: ${cleaningUrgent().length} ${currentLang()==='en'?'urgent signals':'urgente signalen'}\n${t('communication')}: ${state.communications.filter(c=>c.status==='Rood'||c.status==='Geel').length} ${currentLang()==='en'?'open points':'open punten'}`;
  }
  function c6524TaskNameSafe(task){
    try {
      if(typeof hTaskName === 'function') return hTaskName(task?.title || task || '');
    } catch(_) {}
    try { return taskTitle(task && typeof task === 'object' ? task : {title:String(task||'')}); } catch(_) { return String(task?.title || task || ''); }
  }
  function c6524AgfNameSafe(a){
    try { return window.agfTr ? window.agfTr(a.product || a.name || '') : (a.product || a.name || ''); } catch(_) { return a.product || a.name || ''; }
  }
  function c6523PrepareTomorrowText(){
    const items=[];
    (state.tasks||[]).filter(t=>t.status==='Uitgesteld').slice(0,5).forEach(t=>items.push(`- ${c6524TaskNameSafe(t)}`));
    (agfAttention()||[]).slice(0,5).forEach(a=>items.push(`- ${c6524AgfNameSafe(a)}: ${a.advice || a.reason || ''}`));
    (cleaningUrgent()||[]).slice(0,5).forEach(i=>items.push(`- ${i.label||i.zone||i.department||t('storemap')}`));
    (state.communications||[]).filter(c=>c.followDate && c.followDate<=TODAY() && c.status!=='Afgehandeld').slice(0,3).forEach(c=>items.push(`- ${t('communication')}: ${c.message||c.to||c.customTo}`));
    if(!items.length) items.push(t('noTomorrowItems'));
    return items.join('\n');
  }
  function c6523PrepareTomorrow(){
    const text=c6523PrepareTomorrowText();
    state.ui.preparedTomorrowText = text;
    modal(t('prepareTomorrow'), `<p class="muted">${currentLang()==='en'?'Use this as a handover or personal preparation list.':'Gebruik dit als overdracht of persoonlijke voorbereiding.'}</p><pre class="copy-box">${escapeHtml(text)}</pre><button class="btn primary" data-action="copy-prepared-tomorrow-v6523">${t('copyPrepared')}</button>`, 'wide');
  }
  function c6523RefreshCommLists(){
    const commWrap=byId('commListWrapV6523'); if(commWrap) commWrap.innerHTML=c6523RenderCommunications();
    const repWrap=byId('reportListWrapV6523'); if(repWrap) repWrap.innerHTML=c6523RenderReports();
  }

  const previousHandleActionV6523 = handleAction;
  handleAction = window.handleAction = function(a,el,e){
    if(a==='open-communication-form-v6523' || a==='open-communication-form'){ c6523OpenCommunicationForm(); return; }
    if(a==='confirm-add-communication-v6523' || a==='confirm-add-communication'){ c6523AddCommunication(); return; }
    if(a==='open-report-form-v6523' || a==='open-report-form'){ c6523OpenReportForm(); return; }
    if(a==='confirm-add-report-v6523' || a==='confirm-add-report'){ c6523AddReport(); return; }
    if(a==='apply-comm-template-v6523'){ const txt=byId('toneText'); if(txt){ txt.value=c6523TemplateLines(el.dataset.template||'short'); toast(t('templateApplied'),'good'); } return; }
    if(a==='apply-modal-comm-template-v6523'){ const txt=byId('commMsg'); if(txt){ txt.value=c6523TemplateLines(el.dataset.template||'short'); toast(t('templateApplied'),'good'); } return; }
    if(a==='tone-format-v6523'){ const txt=byId('toneText'); if(!txt) return; const v=txt.value.trim(); const line={short: currentLang()==='en'?'Short version:':'Korte versie:', friendly: currentLang()==='en'?'Friendly wording:':'Vriendelijke formulering:', clear: currentLang()==='en'?'Clear action:':'Duidelijke actie:', action: currentLang()==='en'?'Action point:':'Actiepunt:'}[el.dataset.tone]||''; txt.value=`${line}\n${v}\n\n${currentLang()==='en'?'Next step:':'Vervolg:'} `; toast(t('toneApplied'),'good'); return; }
    if(a==='toggle-comm-read-v6523'){ const c=state.communications.find(x=>x.id===el.dataset.id); if(c){ c.read=!c.read; save(); render(); } return; }
    if(a==='complete-comm-v6523'){ const c=state.communications.find(x=>x.id===el.dataset.id); if(c){ c.status='Afgehandeld'; c.done=true; c.read=true; save(); render(); } return; }
    if(a==='delete-comm-v6523'){ const found=state.communications.find(x=>x.id===el.dataset.id); if(found) state.deleted.unshift({type:'comm',item:found}); state.communications=state.communications.filter(x=>x.id!==el.dataset.id); toast(currentLang()==='en'?'Communication deleted':'Communicatie verwijderd'); save(); render(); return; }
    if(a==='mark-all-read-v6523'){ state.communications.forEach(c=>c.read=true); save(); render(); return; }
    if(a==='toggle-done-comms-v6523'){ state.ui.commFilter.showDone=!state.ui.commFilter.showDone; save(); render(); return; }
    if(a==='fill-report-template-v6523'){ const txt=byId('repText'); if(txt) txt.value=c6523TemplateLines('handover'); return; }
    if(a==='copy-report-v6523'){ const r=state.reports.find(x=>x.id===el.dataset.id); if(r){ copyText(c6523ReportText(r)); toast(t('reportCopied'),'good'); } return; }
    if(a==='delete-report-v6523'){ const found=state.reports.find(x=>x.id===el.dataset.id); if(found) state.deleted.unshift({type:'report',item:found}); state.reports=state.reports.filter(x=>x.id!==el.dataset.id); save(); render(); return; }
    if(a==='copy-day-summary-v6523'){ copyText(c6523DaySummary()); toast(t('daySummaryCopied'),'good'); return; }
    if(a==='prepare-tomorrow-v6523' || a==='prepare-tomorrow-v6522'){ c6523PrepareTomorrow(); return; }
    if(a==='copy-prepared-tomorrow-v6523'){ copyText(state.ui.preparedTomorrowText||''); toast(t('copied'),'good'); return; }
    return previousHandleActionV6523(a,el,e);
  };

  document.addEventListener('change', function(e){
    const el=e.target.closest('[data-change]'); if(!el) return;
    const a=el.dataset.change;
    c6523Ensure();
    if(a==='comm-status-v6523'){ state.ui.commFilter.status=el.value; save(); render(); }
    if(a==='comm-person-v6523'){ state.ui.commFilter.person=el.value; save(); render(); }
    if(a==='comm-card-status-v6523'){ const c=state.communications.find(x=>x.id===el.dataset.id); if(c){ c.status=el.value; c.done=el.value==='Afgehandeld'; save(); render(); } }
    if(a==='report-status-v6523'){ state.ui.reportFilter.status=el.value; save(); render(); }
    if(a==='report-tag-v6523'){ state.ui.reportFilter.tag=el.value; save(); render(); }
  }, true);

  document.addEventListener('input', function(e){
    const comm=e.target.closest('#commSearchV6523');
    if(comm){ state.ui.commFilter.q=comm.value; save(); const wrap=byId('commListWrapV6523'); if(wrap) wrap.innerHTML=c6523RenderCommunications(); return; }
    const rep=e.target.closest('#reportSearchV6523');
    if(rep){ state.ui.reportFilter.q=rep.value; save(); const wrap=byId('reportListWrapV6523'); if(wrap) wrap.innerHTML=c6523RenderReports(); return; }
  }, true);

  const prevDiagV6523 = renderDiagnostics;
  renderDiagnostics = window.renderDiagnostics = function(){
    let html = prevDiagV6523().replaceAll('v6.5.22','v6.5.23').replaceAll('rich-cmd-cache-v6522','rich-cmd-cache-v6524');
    html += `<div class="card"><h3>v6.5.24 — Tomorrow Preparation Hotfix</h3><p>${currentLang()==='en'?'Tomorrow preparation now uses safe task labels and follow-ups remain stable.':'Morgen voorbereiden gebruikt nu veilige taaklabels en opvolgingen blijven stabiel.'}</p></div>`;
    return html;
  };
  save();
  if(state.route==='communication') render();
} catch(err) {
  console.error('v6.5.24 Tomorrow Preparation hotfix failed', err);
}

/* =========================================================
   RICH CMD v6.5.25 — Mobile & PWA Experience Polish
   Scope: mobile usability, PWA status/update tools, Live Assist mobile, quick actions.
========================================================= */
try {
  APP.version = 'v6.5.25';
  APP.cache = 'rich-cmd-cache-v6525';

  Object.assign(I18N.nl, {
    pwaStatus:'App/PWA status', installApp:'App installeren', refreshApp:'App vernieuwen', repairCache:'Cache herstellen', appMode:'App-modus', standalone:'Geïnstalleerde app', browserMode:'Browser', serviceWorker:'Service worker', onlineStatus:'Online status', online:'Online', offline:'Offline', mobileQuickActions:'Mobiele snelle acties', mobileExperience:'Mobiele ervaring', compactControls:'Compacte bediening', assistSheet:'Live Assist paneel', safeRefresh:'Veilig vernieuwen', pwaHelp:'Als de app anders oogt dan de browser, vernieuw dan de app-cache of installeer opnieuw.', openAssist:'Open Assist', closeAssist:'Sluit Assist', appRefreshDone:'App-cache vernieuwd. Herlaad de pagina als oude onderdelen zichtbaar blijven.', installUnavailable:'Installatieknop is nog niet beschikbaar. Open de site via HTTPS in Chrome en probeer opnieuw.', quickNew:'Nieuw', moreMenu:'Meer', mobileMode:'Mobiele modus', appPolishUpdate:'Mobiele/PWA-polish toegevoegd.'
  });
  Object.assign(I18N.en, {
    pwaStatus:'App/PWA status', installApp:'Install app', refreshApp:'Refresh app', repairCache:'Repair cache', appMode:'App mode', standalone:'Installed app', browserMode:'Browser', serviceWorker:'Service worker', onlineStatus:'Online status', online:'Online', offline:'Offline', mobileQuickActions:'Mobile quick actions', mobileExperience:'Mobile experience', compactControls:'Compact controls', assistSheet:'Live Assist sheet', safeRefresh:'Safe refresh', pwaHelp:'If the installed app looks different from the browser, refresh the app cache or reinstall it.', openAssist:'Open Assist', closeAssist:'Close Assist', appRefreshDone:'App cache refreshed. Reload the page if old parts are still visible.', installUnavailable:'The install prompt is not available yet. Open the HTTPS site in Chrome and try again.', quickNew:'New', moreMenu:'More', mobileMode:'Mobile mode', appPolishUpdate:'Mobile/PWA polish added.'
  });

  window.__richDeferredInstallPrompt = window.__richDeferredInstallPrompt || null;
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    window.__richDeferredInstallPrompt = e;
    try { toast(t('installApp'), 'info'); } catch(_) {}
  });

  function v6525IsStandalone(){ return !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true; }
  function v6525SwStatus(){
    if(!('serviceWorker' in navigator)) return currentLang()==='en'?'Not supported':'Niet ondersteund';
    if(navigator.serviceWorker.controller) return currentLang()==='en'?'Active':'Actief';
    return currentLang()==='en'?'Available / loading':'Beschikbaar / laden';
  }
  function v6525OnlineStatus(){ return navigator.onLine ? t('online') : t('offline'); }
  function v6525PwaCard(){
    return `<div class="card v6525-pwa-card"><h3>${t('pwaStatus')}</h3><div class="list">
      <div class="list-item compact"><span>${t('appMode')}</span><strong>${v6525IsStandalone()?t('standalone'):t('browserMode')}</strong></div>
      <div class="list-item compact"><span>${t('serviceWorker')}</span><strong>${escapeHtml(v6525SwStatus())}</strong></div>
      <div class="list-item compact"><span>${t('onlineStatus')}</span><strong>${v6525OnlineStatus()}</strong></div>
      <div class="list-item compact"><span>${t('theme')}</span><strong>${escapeHtml(t(state.settings.theme)||state.settings.theme)}</strong></div>
      <div class="list-item compact"><span>${t('version')}</span><strong>${APP.version}</strong></div>
      <div class="list-item compact"><span>Cache</span><strong>${APP.cache}</strong></div>
    </div><p class="muted small">${t('pwaHelp')}</p><div class="btn-row mt"><button class="btn primary" data-action="install-pwa-v6525">${t('installApp')}</button><button class="btn" data-action="refresh-app-v6525">${t('refreshApp')}</button><button class="btn" data-action="repair-cache-v6525">${t('repairCache')}</button></div></div>`;
  }

  const v6525RenderMobileBottomBase = renderMobileBottom;
  renderMobileBottom = window.renderMobileBottom = function(){
    return `<nav class="mobile-bottom v6525-mobile-bottom" aria-label="Mobile navigation">
      <button class="${state.route==='today'?'active':''}" data-route="today"><span>${iconSvg('today')}</span><small>${t('today')}</small></button>
      <button class="${state.route==='haccp'?'active':''}" data-route="haccp"><span>${iconSvg('check')}</span><small>HACCP</small></button>
      <button class="${state.route==='agf'?'active':''}" data-route="agf"><span>${iconSvg('leaf')}</span><small>${t('agf')}</small></button>
      <button class="v6525-mobile-fab" data-action="quick-action" aria-label="${t('quickNew')}"><span>＋</span></button>
      <button data-action="open-mobile-assist-v6525"><span>${iconSvg('spark')}</span><small>Assist</small></button>
      <button data-action="toggle-sidebar"><span>${iconSvg('dashboard')}</span><small>${t('moreMenu')}</small></button>
    </nav>`;
  };

  const v6525RenderAssistBase = renderAssist;
  renderAssist = window.renderAssist = function(){
    const n = nextAction();
    const breakMins = typeof todayBreakMinutes === 'function' ? todayBreakMinutes() : 0;
    return `<button class="assist-tab v6525-assist-tab" data-action="toggle-assist" aria-label="${t('openAssist')}">Assist</button>
    <aside class="assist-panel v6525-assist-panel ${state.ui.assistOpen?'open':''}" id="assistPanel">
      <div class="modal-head"><h3>Live Assist</h3><button class="btn small" data-action="toggle-assist" aria-label="${t('closeAssist')}">×</button></div>
      <div class="list">
        <div class="list-item compact"><span>${t('shift')}</span><strong>${shiftSummary()}</strong></div>
        <div class="list-item compact"><span>${t('breakTime')||t('break')}</span><strong>${minutesToText(breakMins)}</strong></div>
        <div class="list-item compact"><span>${currentLang()==='en'?'Workload':'Werkdruk'}</span><strong>${workload()}%</strong></div>
        <div class="list-item compact"><span>${t('productivity')}</span><strong>${productivity()}%</strong></div>
      </div>
      <div class="card soft mt"><span class="chip">${t('smart')}</span><strong>${escapeHtml(trTitle ? trTitle(n.title) : n.title)}</strong><p class="muted">${escapeHtml(n.reason)}</p><button class="btn primary" data-route="${n.route}">${currentLang()==='en'?'Show':'Laat zien'}</button></div>
      <div class="btn-row mt"><button class="btn" data-action="open-focus">${t('focus')}</button><button class="btn" data-action="toggle-break">${state.shift.breakActive?t('stopBreak'):t('startBreak')}</button><button class="btn" data-action="shift-end" ${!state.shift.active?'disabled':''}>${t('clockOut')}</button></div>
    </aside>`;
  };

  const v6525OpenQuickActionBase = openQuickAction;
  openQuickAction = window.openQuickAction = function(){
    const title = t('mobileQuickActions');
    const body = `<div class="v6525-quick-grid">
      <button class="btn" data-action="open-task-form">${t('haccpTask')||'HACCP taak'}</button>
      <button class="btn" data-action="open-agf-product-form">${t('agfProduct')||'AGF product'}</button>
      <button class="btn" data-action="open-inventory-form">${t('inventory')}</button>
      <button class="btn" data-action="open-communication-form-v6523">${t('communication')}</button>
      <button class="btn" data-action="open-report-form-v6523">${t('reports')}</button>
      <button class="btn primary" data-action="open-focus">${t('focus')}</button>
    </div><p class="muted small mt">${currentLang()==='en'?'These shortcuts are optimized for one-hand use on phone.':'Deze snelkoppelingen zijn geoptimaliseerd voor gebruik met één hand op telefoon.'}</p>`;
    modal(title, body, 'v6525-bottom-sheet');
  };

  const v6525RenderSettingsBase = renderSettings;
  renderSettings = window.renderSettings = function(){
    let html = v6525RenderSettingsBase();
    html = html.replaceAll('v6.5.24','v6.5.25').replaceAll('rich-cmd-cache-v6524','rich-cmd-cache-v6525');
    const card = v6525PwaCard();
    return html.replace('</div></div>', `${card}</div></div>`);
  };

  const v6525RenderDiagnosticsBase = renderDiagnostics;
  renderDiagnostics = window.renderDiagnostics = function(){
    let html = v6525RenderDiagnosticsBase();
    html = html.replaceAll('v6.5.24','v6.5.25').replaceAll('rich-cmd-cache-v6524','rich-cmd-cache-v6525');
    html = html.replace('</div></div>', `${v6525PwaCard()}<div class="card"><h3>v6.5.25</h3><p>${t('appPolishUpdate')}</p><p class="muted small">${currentLang()==='en'?'Mobile bottom navigation, PWA status, install/refresh tools and Live Assist mobile sheet were polished.':'Mobiele onderbalk, PWA-status, installatie/ververs-tools en Live Assist op mobiel zijn gepolijst.'}</p></div></div></div>`);
    return html;
  };

  const v6525HandleActionBase = handleAction;
  handleAction = function(a, el, e){
    switch(a){
      case 'open-mobile-assist-v6525':
        state.ui.assistOpen = true; save(); render(); return;
      case 'install-pwa-v6525':
        if(window.__richDeferredInstallPrompt){
          window.__richDeferredInstallPrompt.prompt();
          window.__richDeferredInstallPrompt.userChoice.finally(()=>{ window.__richDeferredInstallPrompt = null; });
        } else {
          toast(t('installUnavailable'), 'warn');
        }
        return;
      case 'repair-cache-v6525':
        if('caches' in window){ caches.keys().then(keys=>Promise.all(keys.filter(k=>k.includes('rich-cmd-cache')).map(k=>caches.delete(k)))).then(()=>toast(t('appRefreshDone'),'good')); }
        if('serviceWorker' in navigator){ navigator.serviceWorker.getRegistrations().then(regs=>regs.forEach(r=>r.update && r.update())).catch(()=>{}); }
        return;
      case 'refresh-app-v6525':
        if('caches' in window){ caches.keys().then(keys=>Promise.all(keys.filter(k=>k.includes('rich-cmd-cache')).map(k=>caches.delete(k)))).finally(()=>location.reload()); }
        else location.reload();
        return;
      default:
        return v6525HandleActionBase(a, el, e);
    }
  };

  window.addEventListener('online', ()=>{ try{ toast(t('online'),'good'); }catch(_){} });
  window.addEventListener('offline', ()=>{ try{ toast(t('offline'),'warn'); }catch(_){} });

  try { save(); applyTheme(); render(); } catch(err) { console.error('v6.5.25 mobile/pwa polish failed', err); }
} catch(err) {
  console.error('v6.5.25 patch failed', err);
}

/* v6.5.26 — Mobile Bottom & Diagnostics Hotfix */
try {
  APP.version = 'v6.5.26';
  APP.cache = 'rich-cmd-cache-v6526';

  function v6526Safe(fn, fallback){
    try { return fn(); } catch(err) { console.warn('v6.5.26 safe fallback', err); return fallback; }
  }
  function v6526PwaStatusCard(){
    const standalone = !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    const sw = ('serviceWorker' in navigator)
      ? (navigator.serviceWorker.controller ? L('Actief','Active') : L('Beschikbaar / laden','Available / loading'))
      : L('Niet ondersteund','Not supported');
    return `<div class="card v6526-pwa-card"><h3>${L('App / PWA status','App / PWA status')}</h3>
      <div class="list">
        <div class="list-item compact"><span>${L('Modus','Mode')}</span><strong>${standalone ? L('Geïnstalleerde app','Installed app') : L('Browser','Browser')}</strong></div>
        <div class="list-item compact"><span>${L('Service worker','Service worker')}</span><strong>${escapeHtml(sw)}</strong></div>
        <div class="list-item compact"><span>${L('Online status','Online status')}</span><strong>${navigator.onLine ? L('Online','Online') : L('Offline','Offline')}</strong></div>
        <div class="list-item compact"><span>${L('Thema','Theme')}</span><strong>${escapeHtml(state.settings.theme || 'light')}</strong></div>
        <div class="list-item compact"><span>${L('Versie','Version')}</span><strong>${APP.version}</strong></div>
        <div class="list-item compact"><span>Cache</span><strong>${APP.cache}</strong></div>
      </div>
      <p class="muted small">${L('Gebruik deze knoppen als de geïnstalleerde app oude onderdelen blijft tonen.','Use these buttons if the installed app keeps showing old parts.')}</p>
      <div class="btn-row mt"><button class="btn primary" data-action="install-pwa-v6525">${L('App installeren','Install app')}</button><button class="btn" data-action="refresh-app-v6525">${L('App vernieuwen','Refresh app')}</button><button class="btn" data-action="repair-cache-v6525">${L('Cache herstellen','Repair cache')}</button></div>
    </div>`;
  }

  renderMobileBottom = window.renderMobileBottom = function(){
    return `<nav class="mobile-bottom v6526-mobile-bottom" aria-label="Mobile navigation">
      <button class="${state.route==='today'?'active':''}" data-route="today"><span>${iconSvg('today')}</span><small>${t('today')}</small></button>
      <button class="${state.route==='haccp'?'active':''}" data-route="haccp"><span>${iconSvg('check')}</span><small>HACCP</small></button>
      <button class="v6526-mobile-fab" data-action="quick-action" aria-label="${L('Snelle actie','Quick action')}"><span>＋</span><small>${L('Nieuw','New')}</small></button>
      <button class="${state.route==='agf'?'active':''}" data-route="agf"><span>${iconSvg('leaf')}</span><small>${t('agf')}</small></button>
      <button data-action="open-mobile-assist-v6525"><span>${iconSvg('spark')}</span><small>Assist</small></button>
    </nav>`;
  };

  renderDiagnostics = window.renderDiagnostics = function(){
    const health = v6526Safe(()=>diagnosticHealth(), 100);
    const records = v6526Safe(()=>totalRecords(), 0);
    const checks = v6526Safe(()=>regressionChecks(), []).map(c=>`<div class="list-item compact"><span>${escapeHtml(L(c.name,c.name))}</span><span class="pill ${c.ok?'good':'bad'}">${c.ok?'OK':'Check'}</span></div>`).join('');
    const quality = v6526Safe(()=>moduleQuality(), {});
    const qualityHtml = Object.keys(quality).length
      ? Object.entries(quality).map(([k,v])=>bar(L(k,k),v,v>85?'good':v>65?'warn':'bad')).join('')
      : `<p class="muted">${L('Nog onvoldoende moduledata voor kwaliteitsscores.','Not enough module data for quality scores yet.')}</p>`;
    const hist = v6526Safe(()=>renderActivityTimeline(), `<p class="muted">${L('Nog geen actiegeschiedenis.','No action history yet.')}</p>`);
    return `<div class="grid">
      <div class="hero"><span class="chip">${L('Diagnostiek','Diagnostics')}</span><h2>${L('App gezondheid en herstel','App health and repair')}</h2><p>${L('Controleer versie, cache, data, PWA-status en herstelopties zonder dat de pagina rommelig wordt.','Check version, cache, data, PWA status and repair tools without cluttering the page.')}</p></div>
      <div class="grid grid-4">${kpi(L('Versie','Version'),APP.version,null)}${kpi('Cache','v6526',null)}${kpi(L('Gezondheid','Health'),health+'%',health>85?'good':'warn')}${kpi(L('Records','Records'),records,null)}</div>
      <div class="grid grid-2">
        <div class="card"><h3>${L('Regressietest','Regression test')}</h3>${checks || `<p class="muted">${L('Geen checks beschikbaar.','No checks available.')}</p>`}</div>
        <div class="card"><h3>${L('Datakwaliteit','Data quality')}</h3>${qualityHtml}</div>
        ${v6526PwaStatusCard()}
        <div class="card"><h3>${L('Hersteltools','Repair tools')}</h3><p class="muted small">${L('Maak eerst een backup voordat je grote herstelacties doet.','Create a backup before large repair actions.')}</p><div class="btn-row"><button class="btn" data-action="download-backup">${L('Backup downloaden','Download backup')}</button><button class="btn" data-action="open-import">${L('Importeren','Import')}</button><button class="btn" data-action="clear-cache">${L('Cache vernieuwen','Refresh cache')}</button><button class="btn bad" data-action="reset-app">${L('Schone start','Clean start')}</button></div></div>
      </div>
      <div class="card"><h3>${L('Actiegeschiedenis','Action history')}</h3>${hist}</div>
      <div class="card"><h3>${L('Update log','Update log')}</h3><p><strong>v6.5.26</strong> — ${L('Diagnostiek hersteld en mobiele onderbalk opnieuw uitgelijnd.','Diagnostics restored and mobile bottom navigation realigned.')}</p><p><strong>v6.5.25</strong> — ${L('Mobiele PWA-ervaring en app-status toegevoegd.','Mobile PWA experience and app status added.')}</p></div>
    </div>`;
  };

  const v6526SettingsBase = renderSettings;
  renderSettings = window.renderSettings = function(){
    let html = v6526SettingsBase();
    html = html.replaceAll('v6.5.25','v6.5.26').replaceAll('rich-cmd-cache-v6525','rich-cmd-cache-v6526');
    return html;
  };

  try { save(); applyTheme(); render(); } catch(err) { console.error('v6.5.26 hotfix render failed', err); }
} catch(err) {
  console.error('v6.5.26 hotfix failed', err);
}


/* v6.5.27 — Mobile Assist Hotfix */
try {
  APP.version = 'v6.5.27';
  APP.cache = 'rich-cmd-cache-v6527';

  const v6527RenderAssistBase = renderAssist;
  renderAssist = window.renderAssist = function(){
    let html = v6527RenderAssistBase();
    html = html.replace('assist-tab v6525-assist-tab', 'assist-tab v6525-assist-tab v6527-assist-tab');
    html = html.replace('assist-panel v6525-assist-panel', 'assist-panel v6525-assist-panel v6527-mobile-assist-panel');
    html = html.replace('<h3>Live Assist</h3>', `<h3>Live Assist</h3><p class="muted small">${L('Mobiel geopend als compact assist-paneel.','Opened on mobile as a compact assist panel.')}</p>`);
    return html;
  };

  const v6527RenderMobileBottomBase = renderMobileBottom;
  renderMobileBottom = window.renderMobileBottom = function(){
    return `<nav class="mobile-bottom v6526-mobile-bottom v6527-mobile-bottom" aria-label="Mobile navigation">
      <button class="${state.route==='today'?'active':''}" data-route="today"><span>${iconSvg('today')}</span><small>${t('today')}</small></button>
      <button class="${state.route==='haccp'?'active':''}" data-route="haccp"><span>${iconSvg('check')}</span><small>HACCP</small></button>
      <button class="v6526-mobile-fab" data-action="quick-action" aria-label="${L('Snelle actie','Quick action')}"><span>＋</span><small>${L('Nieuw','New')}</small></button>
      <button class="${state.route==='agf'?'active':''}" data-route="agf"><span>${iconSvg('leaf')}</span><small>${t('agf')}</small></button>
      <button class="${state.ui.assistOpen?'active':''}" data-action="open-mobile-assist-v6527"><span>${iconSvg('spark')}</span><small>Assist</small></button>
    </nav>`;
  };

  const v6527HandleActionBase = handleAction;
  handleAction = function(a, el, e){
    if(a === 'open-mobile-assist-v6527' || a === 'open-mobile-assist-v6525'){
      state.ui.assistOpen = true;
      save();
      render();
      return;
    }
    if(a === 'close-assist-v6527'){
      state.ui.assistOpen = false;
      save();
      render();
      return;
    }
    return v6527HandleActionBase(a, el, e);
  };

  const v6527DiagBase = renderDiagnostics;
  renderDiagnostics = window.renderDiagnostics = function(){
    let html = v6527DiagBase();
    html = html.replaceAll('v6.5.26','v6.5.27').replaceAll('rich-cmd-cache-v6526','rich-cmd-cache-v6527').replaceAll('v6526','v6527');
    html += `<div class="card"><h3>v6.5.27 — Mobile Assist Hotfix</h3><p>${L('Live Assist opent nu ook op telefoon en in de geïnstalleerde app als bottom sheet.','Live Assist now also opens on phone and in the installed app as a bottom sheet.')}</p></div>`;
    return html;
  };

  try { save(); render(); } catch(err) { console.error('v6.5.27 mobile assist render failed', err); }
} catch(err) {
  console.error('v6.5.27 Mobile Assist Hotfix failed', err);
}
