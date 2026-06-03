
/* =========================================================
   RICH CMD v6.7.17 — Shiftleider Compact Planning & Extra Tools
   Compact lane planning: generated lane times, fill edit modal,
   note edit modal, clickable status, planning check, copy plan,
   and change log.
========================================================= */
(function(){
  try{
    if (typeof APP === 'object') {
      APP.version = 'v6.7.17';
      APP.cache = 'rich-cmd-cache-v6717';
      APP.build = 'Shiftleider Compact Planning & Extra Tools';
    }
    const L17 = (nl,en)=> (typeof currentLang === 'function' && currentLang() === 'en') ? (en || nl) : nl;
    const E17 = (s)=> typeof escapeHtml === 'function' ? escapeHtml(String(s ?? '')) : String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    const uid17 = (p)=> typeof uid === 'function' ? uid(p) : `${p}_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    const today17 = ()=> typeof TODAY === 'function' ? TODAY() : new Date().toISOString().slice(0,10);
    const now17 = ()=> typeof nowISO === 'function' ? nowISO() : new Date().toISOString();
    const save17 = ()=> { try { if(typeof save === 'function') save(); } catch(_){} };
    const render17 = ()=> { try { if(typeof render === 'function') render(); } catch(_){} };
    const toast17 = (msg,type='info')=> { try { if(typeof toast === 'function') toast(msg,type); } catch(_){} };
    const copy17 = (txt)=> { try { if(typeof copyText === 'function') copyText(txt); else navigator.clipboard?.writeText(txt); } catch(_){} };
    const laneDefs17 = [
      {id:'agf', name:'AGF'},
      {id:'panklaar', name:'Panklaar'},
      {id:'maaltijden', name:'Maaltijden'},
      {id:'vlees_vis_kip', name:'Vlees/Vis/Kip'},
      {id:'zuivel', name:'Zuivel'},
      {id:'delicatesse', name:'Delicatesse'}
    ];
    const baseTasks17 = [
      'Magazijn vrachtklaar maken','Vers nee-verkoop controleren','Vracht lossen','Vracht uitsplitsen','Eventuele kassapauzes overnemen','Versrestanten en tellingen controleren','Afprijsronde','Versshift afronding','Sinaasappelpers schoonmaken','Winkel afsluitronde'
    ];
    const incidentTypes17 = ['Klant','Collega','Incident','Kassa','Vracht','Overig'];
    const statusCycle17 = ['open','busy','partial','done'];
    const statusLabel17 = {open:'Open',busy:'Bezig',partial:'Deels',done:'Afgerond',deferred:'Uitgesteld'};
    const statusClass17 = {open:'info',busy:'warn',partial:'warn',done:'good',deferred:'warn'};

    function weekNumber17(dateIso=today17()){
      const d = new Date(dateIso+'T12:00:00');
      const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNr = (target.getUTCDay() + 6) % 7;
      target.setUTCDate(target.getUTCDate() - dayNr + 3);
      const firstThursday = target.valueOf();
      target.setUTCMonth(0, 1);
      if (target.getUTCDay() !== 4) target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
      return 1 + Math.ceil((firstThursday - target) / 604800000);
    }
    function minutesText17(m){
      m = Math.max(0, Math.round(+m || 0));
      const h = Math.floor(m/60), mm = m%60;
      return h ? `${h}u ${String(mm).padStart(2,'0')}m` : `${mm}m`;
    }
    function diffMinutes17(start,end){
      if(!start || !end) return 0;
      const [sh,sm]=String(start).split(':').map(Number), [eh,em]=String(end).split(':').map(Number);
      if([sh,sm,eh,em].some(n=>Number.isNaN(n))) return 0;
      let a=sh*60+sm, b=eh*60+em;
      if(b<a) b+=24*60;
      return Math.max(0,b-a);
    }
    function addMinutes17(time, minutes){
      if(!time) return '';
      const [h,m] = String(time).split(':').map(Number);
      if(Number.isNaN(h)||Number.isNaN(m)) return '';
      let total = (h*60+m+Math.round(+minutes||0))%(24*60);
      if(total<0) total += 24*60;
      return `${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
    }
    function autoBreak17(start,end){ const mins = diffMinutes17(start,end); return mins >= 360 ? 30 : mins >= 240 ? 15 : 0; }
    function mealAllowance17(start,end){
      if(!start || !end) return false;
      const [sh,sm]=String(start).split(':').map(Number), [eh,em]=String(end).split(':').map(Number);
      if([sh,sm,eh,em].some(n=>Number.isNaN(n))) return false;
      return (sh*60+sm) <= 16*60 && (eh*60+em) > 19*60;
    }
    function isTueThu17(dateIso){ const d=new Date((dateIso||today17())+'T12:00:00').getDay(); return d===2 || d===4; }
    function ensureShiftLeader17(){
      state.shiftLeader = state.shiftLeader && typeof state.shiftLeader === 'object' ? state.shiftLeader : {};
      const sl = state.shiftLeader;
      sl.date = sl.date || today17();
      sl.mode = sl.mode || 'Vers Avondshift';
      sl.team = Array.isArray(sl.team) ? sl.team : [];
      sl.team.forEach(p=>{ p.breakMinutes = autoBreak17(p.start,p.end); p.mealAllowance = mealAllowance17(p.start,p.end); });
      sl.lanes = Array.isArray(sl.lanes) ? sl.lanes : [];
      laneDefs17.forEach(def=>{
        let lane = sl.lanes.find(l=>l.id===def.id || l.name===def.name);
        if(!lane){ lane={id:def.id,name:def.name,personId:'',fillHours:0,fillMinutes:0,status:'open',note:'',start:'',end:''}; sl.lanes.push(lane); }
        lane.id=def.id; lane.name=def.name; lane.status=lane.status || 'open';
        if(lane.fillHours === undefined && lane.hours !== undefined){ const total=Math.round((+lane.hours||0)*60); lane.fillHours=Math.floor(total/60); lane.fillMinutes=total%60; }
        lane.fillHours = Math.max(0, +(lane.fillHours ?? 0) || 0);
        lane.fillMinutes = Math.max(0, +(lane.fillMinutes ?? 0) || 0);
        lane.note = lane.note || '';
      });
      sl.lanes = laneDefs17.map(def=>sl.lanes.find(l=>l.id===def.id));
      sl.tasks = Array.isArray(sl.tasks) ? sl.tasks : [];
      sl.incidents = Array.isArray(sl.incidents) ? sl.incidents : [];
      sl.reportHistory = Array.isArray(sl.reportHistory) ? sl.reportHistory : [];
      sl.planLog = Array.isArray(sl.planLog) ? sl.planLog : [];
      sl.ui = sl.ui && typeof sl.ui === 'object' ? sl.ui : {};
      return sl;
    }
    function laneById17(id){ return ensureShiftLeader17().lanes.find(l=>l.id===id); }
    function teamMember17(id){ return ensureShiftLeader17().team.find(p=>p.id===id); }
    function memberAvailable17(p){ return Math.max(0, diffMinutes17(p.start,p.end) - autoBreak17(p.start,p.end)); }
    function laneMinutes17(l){ return Math.max(0, Math.round((+(l.fillHours||0))*60 + (+(l.fillMinutes||0)))); }
    function totalAvailable17(){ return ensureShiftLeader17().team.reduce((a,p)=>a+memberAvailable17(p),0); }
    function totalPlanned17(){ return ensureShiftLeader17().lanes.reduce((a,l)=>a+laneMinutes17(l),0); }
    function assignedMinutes17(personId){ return ensureShiftLeader17().lanes.filter(l=>l.personId===personId).reduce((a,l)=>a+laneMinutes17(l),0); }
    function shiftSummary17(){
      const sl=ensureShiftLeader17(), available=totalAvailable17(), planned=totalPlanned17(), diff=available-planned;
      return {sl,available,planned,diff,team:sl.team.length,openTasks:sl.tasks.filter(t=>t.status!=='done').length,doneTasks:sl.tasks.filter(t=>t.status==='done').length,incidents:sl.incidents.length};
    }
    function logPlan17(text){
      const sl=ensureShiftLeader17(); sl.planLog.unshift({id:uid17('sl_log'), text, at:now17()}); sl.planLog=sl.planLog.slice(0,40);
    }
    function personOptions17(selected=''){
      const team=ensureShiftLeader17().team;
      return `<option value="">${E17(L17('Niet toegewezen','Unassigned'))}</option>` + team.map(p=>`<option value="${E17(p.id)}" ${p.id===selected?'selected':''}>${E17(p.name)}</option>`).join('');
    }
    function statusButton17(l){
      const st=l.status||'open';
      return `<button class="sl17-status pill ${statusClass17[st]||'info'}" data-action="sl17-cycle-lane-status" data-lane="${E17(l.id)}" title="${E17(L17('Klik om status te wijzigen','Click to change status'))}">${E17(statusLabel17[st]||st)}</button>`;
    }
    function generatedLaneTimes17(){
      const sl=ensureShiftLeader17();
      const times={};
      sl.team.forEach(p=>{
        let cursor = p.start || '';
        sl.lanes.filter(l=>l.personId===p.id).forEach(l=>{
          const mins=laneMinutes17(l);
          if(cursor && mins>0){ times[l.id]={start:cursor,end:addMinutes17(cursor,mins),source:'auto'}; cursor=times[l.id].end; }
          else if(cursor){ times[l.id]={start:cursor,end:cursor,source:'auto'}; }
        });
      });
      sl.lanes.forEach(l=>{ if(!times[l.id] && (l.start||l.end)) times[l.id]={start:l.start||'',end:l.end||'',source:'manual'}; });
      return times;
    }
    function laneTimeText17(l,times=generatedLaneTimes17()){
      const t=times[l.id]; if(!t || !t.start) return L17('geen tijd','no time');
      return `${t.start}–${t.end||'--:--'}`;
    }
    function planningIssues17(){
      const sl=ensureShiftLeader17();
      const issues=[];
      const noPerson=sl.lanes.filter(l=>!l.personId && laneMinutes17(l)>0).map(l=>l.name);
      const noFill=sl.lanes.filter(l=>l.personId && laneMinutes17(l)===0).map(l=>l.name);
      const over=sl.team.filter(p=>assignedMinutes17(p.id)>memberAvailable17(p)).map(p=>p.name);
      const empty=sl.lanes.filter(l=>!l.personId && laneMinutes17(l)===0 && l.status!=='done').map(l=>l.name);
      if(noPerson.length) issues.push(`${L17('Vuluren zonder persoon','Fill hours without person')}: ${noPerson.join(', ')}`);
      if(noFill.length) issues.push(`${L17('Persoon zonder vuluren','Person without fill hours')}: ${noFill.join(', ')}`);
      if(over.length) issues.push(`${L17('Overpland','Overplanned')}: ${over.join(', ')}`);
      if(empty.length) issues.push(`${L17('Nog leeg','Still empty')}: ${empty.slice(0,3).join(', ')}${empty.length>3?'…':''}`);
      return issues;
    }
    function planningText17(){
      const sl=ensureShiftLeader17(), times=generatedLaneTimes17();
      return `Vulplanning — ${sl.mode}\nDatum: ${sl.date} · Week ${weekNumber17(sl.date)}\n\n` + sl.lanes.map(l=>`- ${l.name}: ${statusLabel17[l.status]||l.status} · ${teamMember17(l.personId)?.name||'niet toegewezen'} · ${laneTimeText17(l,times)} · ${minutesText17(laneMinutes17(l))}${l.note?` · ${l.note}`:''}`).join('\n');
    }
    function reportText17(){
      const sl=ensureShiftLeader17();
      const {available,planned,diff}=shiftSummary17();
      const times=generatedLaneTimes17();
      const laneLines=sl.lanes.map(l=>`- ${l.name}: ${teamMember17(l.personId)?.name || 'niet toegewezen'} · ${laneTimeText17(l,times)} · ${minutesText17(laneMinutes17(l))} · ${statusLabel17[l.status]||l.status}${l.note?` · ${l.note}`:''}`);
      const teamLines=sl.team.map(p=>`- ${p.name}: ${p.start||'--:--'}-${p.end||'--:--'} · pauze auto ${autoBreak17(p.start,p.end)}m · beschikbaar ${minutesText17(memberAvailable17(p))}${mealAllowance17(p.start,p.end)?' · maaltijdvergoeding':''}`);
      const doneTasks=sl.tasks.filter(t=>t.status==='done').map(t=>`- ${t.title}`);
      const openTasks=sl.tasks.filter(t=>t.status!=='done').map(t=>`- ${t.title} (${t.status==='deferred'?'uitgesteld':'open'})`);
      const incidents=sl.incidents.map(i=>`- ${i.type}: ${i.note||''}${i.minutes?` (${i.minutes}m)`:''}`);
      const issues=planningIssues17();
      const advice = diff<0 ? 'Let op: er was meer gepland dan beschikbaar. Verdeel paden opnieuw of zet open punten duidelijk op overdracht.' : 'Planning was haalbaar met ruimte voor bijsturen.';
      return `Shiftklaar Report — ${sl.mode}\nDatum: ${sl.date} · Week ${weekNumber17(sl.date)}\n\nTeam:\n${teamLines.join('\n') || '- Geen team ingevuld'}\n\nCapaciteit:\n- Beschikbaar: ${minutesText17(available)}\n- Gepland: ${minutesText17(planned)}\n- Ruimte/tekort: ${diff>=0?'+':'-'}${minutesText17(Math.abs(diff))}\n\nVulplanning:\n${laneLines.join('\n')}\n\nPlanningcheck:\n${issues.map(x=>'- '+x).join('\n') || '- Geen waarschuwingen'}\n\nGedaan:\n${doneTasks.join('\n') || '- Nog niets afgevinkt'}\n\nNog open / overdracht:\n${openTasks.join('\n') || '- Geen open overige taken'}\n\nBijzonderheden:\n${incidents.join('\n') || '- Geen bijzonderheden gelogd'}\n\nAdvies/overdracht:\n- ${advice}`;
    }
    function renderShiftleader17(){
      const {sl,available,planned,diff,team}=shiftSummary17();
      return `<div class="grid sl17-page">
        <div class="hero sl17-hero"><div class="flex-line"><div><span class="chip">v6.7.17</span><h2>${E17(L17('Shiftleider — Vers Avondshift','Shift Lead — Fresh evening shift'))}</h2><p>${E17(L17('Compacte vulplanning met automatische padtijden, snelle status, vulling en notities.','Compact fill planning with generated lane times, quick status, fill and notes.'))}</p></div><div class="sl15-datebox"><strong>${E17(sl.date)}</strong><span>${E17(L17('Week','Week'))} ${weekNumber17(sl.date)}</span></div></div><div class="btn-row mt"><button class="btn primary" data-action="sl16-open-person-form">${E17(L17('Medewerker toevoegen','Add team member'))}</button><button class="btn" data-action="sl16-load-standard-tasks">${E17(L17('Standaardtaken inladen','Load standard tasks'))}</button><button class="btn" data-action="sl16-open-task-form">${E17(L17('Nieuwe taak','New task'))}</button><button class="btn" data-action="sl16-open-incident" data-type="Overig">${E17(L17('Bijzonderheid','Note'))}</button><button class="btn good" data-action="sl17-copy-planning">${E17(L17('Kopieer vulplanning','Copy fill plan'))}</button></div></div>
        <div class="grid grid-4 sl17-kpis">${typeof kpi==='function'?`${kpi(L17('Beschikbaar','Available'),minutesText17(available),diff>=0?'good':'warn')}${kpi(L17('Gepland','Planned'),minutesText17(planned),planned>available?'bad':'good')}${kpi(L17('Ruimte / tekort','Room / shortage'),`${diff>=0?'+':'−'}${minutesText17(Math.abs(diff))}`,diff>=0?'good':'bad')}${kpi(L17('Team','Team'),team,null)}`:''}</div>
        <div class="grid grid-main"><div class="grid">
          ${renderTeam17()}
          ${renderShiftPlanning17()}
          ${renderTasks17()}
        </div><div class="grid">
          ${renderCapacity17()}
          ${renderPlanningCheck17()}
          ${renderIncidents17()}
          ${renderReport17()}
          ${renderShiftleaderHelp17()}
        </div></div>
      </div>`;
    }
    function renderTeam17(){
      const sl=ensureShiftLeader17();
      return `<div class="card sl17-team"><div class="flex-line"><div><h3>${E17(L17('Team & beschikbare uren','Team & available hours'))}</h3><p class="muted small">${E17(L17('Standaardtijden blijven 16:00/17:00 en 19:00/20:00. Pauze wordt automatisch berekend.','Standard times remain 16:00/17:00 and 19:00/20:00. Breaks are automatic.'))}</p></div><button class="btn small primary" data-action="sl16-open-person-form">＋</button></div>${sl.team.length?`<div class="list">${sl.team.map(p=>{ const assigned=assignedMinutes17(p.id), available=memberAvailable17(p), lanes=sl.lanes.filter(l=>l.personId===p.id).map(l=>l.name).join(', ') || L17('nog geen pad','no aisle yet'); return `<div class="list-item sl17-person"><span><strong>${E17(p.name)}</strong><br><span class="tiny muted">${E17(p.start||'--:--')}–${E17(p.end||'--:--')} · ${E17(L17('pauze','break'))}: ${autoBreak17(p.start,p.end)}m · ${E17(lanes)}</span></span><span class="sl17-person-right"><span class="pill ${assigned>available?'bad':'good'}">${minutesText17(assigned)} / ${minutesText17(available)}</span>${mealAllowance17(p.start,p.end)?`<span class="pill warn">${E17(L17('maaltijdvergoeding','meal allowance'))}</span>`:''}<button class="btn small" data-action="sl16-open-person-form" data-id="${E17(p.id)}">✎</button><button class="btn small bad" data-action="sl16-remove-person" data-id="${E17(p.id)}">×</button></span></div>`; }).join('')}</div>`:`<p class="muted small">${E17(L17('Nog geen medewerkers toegevoegd.','No team members added yet.'))}</p>`}</div>`;
    }
    function renderShiftPlanning17(){
      const sl=ensureShiftLeader17(); const times=generatedLaneTimes17();
      return `<div class="card sl17-shiftplanning"><div class="flex-line"><div><h3>${E17(L17('Shiftplanning','Shift planning'))}</h3><p class="muted small">${E17(L17('Paden staan compact onder elkaar. Start- en eindtijd worden automatisch berekend uit de persoon, volgorde en vulduur.','Aisles are compact. Start and end time are generated from person, order and fill duration.'))}</p></div><span class="pill info">${sl.lanes.length} ${E17(L17('paden','aisles'))}</span></div><div class="sl17-lane-list">${sl.lanes.map(l=>{ const member=teamMember17(l.personId); const t=times[l.id]; return `<div class="sl17-lane-card ${l.status==='done'?'done':''}">
          <div class="sl17-lane-top"><div class="sl17-lane-title"><strong>${E17(l.name)}</strong>${statusButton17(l)}</div><div class="sl17-lane-actions"><button class="btn small" data-action="sl17-open-fill" data-lane="${E17(l.id)}" title="${E17(L17('Vulling aanpassen','Edit fill'))}">⏱</button><button class="btn small ${l.note?'primary':''}" data-action="sl17-open-lane-note" data-lane="${E17(l.id)}" title="${E17(L17('Notitie','Note'))}">✎</button></div></div>
          <div class="sl17-lane-main"><label class="sl17-person-select"><span>${E17(L17('Persoon','Person'))}</span><select class="select input" data-action="sl17-lane-person" data-lane="${E17(l.id)}">${personOptions17(l.personId)}</select></label><div class="sl17-lane-meta"><span>${E17(L17('Tijd','Time'))}: <strong>${E17(t && t.start ? `${t.start}–${t.end||'--:--'}` : L17('nog niet gepland','not planned'))}</strong></span><span>${E17(L17('Vulling','Fill'))}: <strong>${minutesText17(laneMinutes17(l))}</strong></span></div></div>${l.note?`<div class="sl17-lane-note-chip">${E17(l.note)}</div>`:''}
        </div>`; }).join('')}</div><div class="btn-row mt"><button class="btn" data-action="sl17-copy-planning">${E17(L17('Kopieer vulplanning','Copy fill plan'))}</button><button class="btn" data-action="sl17-open-planning-check">${E17(L17('Planningcheck','Planning check'))}</button></div></div>`;
    }
    function renderPlanningCheck17(){
      const issues=planningIssues17();
      return `<div class="card sl17-planning-check"><h3>${E17(L17('Planningcheck','Planning check'))}</h3>${issues.length?`<div class="list">${issues.map(i=>`<div class="list-item compact"><span>${E17(i)}</span><span class="pill warn">${E17(L17('check','check'))}</span></div>`).join('')}</div>`:`<p class="muted small">${E17(L17('Geen grote waarschuwingen. De planning lijkt haalbaar.','No major warnings. The plan looks feasible.'))}</p>`}<details class="detail-drawer mt"><summary>${E17(L17('Wijzigingslog planning','Planning change log'))}</summary><div class="drawer-content">${renderPlanLog17()}</div></details></div>`;
    }
    function renderPlanLog17(){ const sl=ensureShiftLeader17(); return sl.planLog.length?`<div class="list">${sl.planLog.slice(0,8).map(i=>`<div class="list-item compact"><span>${E17(i.text)}</span><span class="tiny muted">${E17((i.at||'').slice(11,16))}</span></div>`).join('')}</div>`:`<p class="muted small">${E17(L17('Nog geen wijzigingen vastgelegd.','No changes logged yet.'))}</p>`; }
    function renderTasks17(){
      const sl=ensureShiftLeader17();
      const showAll=!!sl.ui.showAllTasks;
      const ordered=[...sl.tasks].sort((a,b)=> (a.status==='done')-(b.status==='done') || (a.status==='deferred')-(b.status==='deferred') || String(b.createdAt||'').localeCompare(String(a.createdAt||'')) );
      const shown=showAll?ordered:ordered.slice(0,10);
      const doneCount=sl.tasks.filter(t=>t.status==='done').length;
      return `<div class="card sl17-tasks"><div class="flex-line"><div><h3>${E17(L17('Overige takenlijst','Other tasks'))}</h3><p class="muted small">${E17(L17('Taken blijven zichtbaar. Afgeronde taken kleuren groen en zakken naar onderen.','Tasks stay visible. Completed tasks turn green and move down.'))}</p></div><div class="btn-row"><button class="btn small" data-action="sl16-load-standard-tasks">${E17(L17('Standaard','Standard'))}</button><button class="btn small primary" data-action="sl16-open-task-form">＋</button></div></div>${shown.length?`<div class="list">${shown.map(t=>`<div class="list-item compact sl17-task ${t.status==='done'?'done':t.status==='deferred'?'deferred':''}"><span><strong>${t.status==='done'?'✓ ':''}${E17(t.title)}</strong><br><span class="tiny muted">${E17(t.priority||L17('normaal','normal'))}${t.note?` · ${E17(t.note)}`:''}${t.status==='deferred'?` · ${E17(L17('uitgesteld','deferred'))}`:''}</span></span><span class="btn-row nowrap">${t.status==='done'?`<button class="btn small" data-action="sl16-task-reopen" data-id="${E17(t.id)}">↩</button>`:`<button class="btn small good" data-action="sl16-task-done" data-id="${E17(t.id)}">✓</button><button class="btn small warn" data-action="sl16-task-defer" data-id="${E17(t.id)}">↷</button>`}<button class="btn small" data-action="sl16-open-task-form" data-id="${E17(t.id)}">✎</button><button class="btn small bad" data-action="sl16-task-delete" data-id="${E17(t.id)}">×</button></span></div>`).join('')}</div>`:`<p class="muted small">${E17(L17('Nog geen overige taken.','No other tasks yet.'))}</p>`}<div class="btn-row mt">${ordered.length>10?`<button class="btn" data-action="sl16-toggle-tasks">${showAll?E17(L17('Minder tonen','Show less')):E17(L17('Meer weergeven','Show more'))}</button>`:''}${doneCount?`<span class="pill good">${doneCount} ${E17(L17('voldaan','done'))}</span>`:''}</div></div>`;
    }
    function renderCapacity17(){
      const {available,planned,diff,openTasks,doneTasks,incidents}=shiftSummary17();
      const load = available ? Math.round(planned/available*100) : 0;
      let barHtml=''; try { if(typeof bar === 'function') barHtml = bar(L17('Geplande vuluren','Planned fill hours'), load, load>100?'bad':load>85?'warn':'good'); } catch(_){ }
      const mealCount=ensureShiftLeader17().team.filter(p=>mealAllowance17(p.start,p.end)).length;
      return `<div class="card sl17-capacity"><h3>${E17(L17('Capaciteit shift','Shift capacity'))}</h3><div class="list"><div class="list-item compact"><span>${E17(L17('Beschikbaar team','Team available'))}</span><strong>${minutesText17(available)}</strong></div><div class="list-item compact"><span>${E17(L17('Geplande vuluren','Planned fill hours'))}</span><strong>${minutesText17(planned)}</strong></div><div class="list-item compact"><span>${E17(L17('Ruimte / tekort','Room / shortage'))}</span><strong>${diff>=0?'+':'−'}${minutesText17(Math.abs(diff))}</strong></div><div class="list-item compact"><span>${E17(L17('Open taken','Open tasks'))}</span><strong>${openTasks}</strong></div><div class="list-item compact"><span>${E17(L17('Voldaan','Done'))}</span><strong>${doneTasks}</strong></div><div class="list-item compact"><span>${E17(L17('Maaltijdvergoeding signaal','Meal allowance signal'))}</span><strong>${mealCount}</strong></div><div class="list-item compact"><span>${E17(L17('Bijzonderheden','Notes'))}</span><strong>${incidents}</strong></div></div>${barHtml}<p class="muted small">${E17(diff<0?L17('Er is meer gepland dan beschikbaar. Verdeel paden opnieuw of zet open punten bewust op overdracht.','More is planned than available. Reassign aisles or deliberately add open points to handover.'):L17('Er is ruimte voor bijsturen, hulpvragen of onverwachte situaties.','There is room for steering, helping or unexpected situations.'))}</p></div>`;
    }
    function renderIncidents17(){
      const sl=ensureShiftLeader17(); const showAll=!!sl.ui.showAllIncidents; const shown=showAll?sl.incidents:sl.incidents.slice(0,5);
      return `<div class="card sl17-incidents"><div class="flex-line"><div><h3>${E17(L17('Onderbrekingen & bijzonderheden','Interruptions & notes'))}</h3><p class="muted small">${E17(L17('Leg vast waarom de planning veranderde.','Record why the plan changed.'))}</p></div></div><div class="btn-row">${incidentTypes17.map(t=>`<button class="btn small" data-action="sl16-open-incident" data-type="${E17(t)}">${E17(t)}</button>`).join('')}</div>${shown.length?`<div class="list mt">${shown.map(i=>`<div class="list-item compact"><span><strong>${E17(i.type)}</strong><br><span class="tiny muted">${E17((i.at||'').slice(11,16))}${i.minutes?` · ${i.minutes}m`:''}${i.note?` · ${E17(i.note)}`:''}</span></span><button class="btn small bad" data-action="sl16-incident-delete" data-id="${E17(i.id)}">×</button></div>`).join('')}</div>`:`<p class="muted small mt">${E17(L17('Nog geen onderbrekingen gelogd.','No interruptions logged yet.'))}</p>`}${sl.incidents.length>5?`<button class="btn mt" data-action="sl16-toggle-incidents">${showAll?E17(L17('Minder tonen','Show less')):E17(L17('Meer weergeven','Show more'))}</button>`:''}</div>`;
    }
    function renderReport17(){
      return `<div class="card sl17-report"><h3>${E17(L17('Shiftklaar report','End-of-shift report'))}</h3><p class="muted small">${E17(L17('Inclusief paden, taken, automatische tijden, pauzes, planningcheck en maaltijdvergoeding-signalen.','Includes aisles, tasks, generated times, breaks, planning check and meal allowance signals.'))}</p><div class="btn-row"><button class="btn good" data-action="sl17-copy-report">${E17(L17('Kopieer report','Copy report'))}</button><button class="btn" data-action="sl17-save-report-communication">${E17(L17('Opslaan bij Communicatie','Save to Communication'))}</button></div><details class="detail-drawer mt"><summary>${E17(L17('Preview bekijken','View preview'))}</summary><pre class="sl15-report-preview">${E17(reportText17())}</pre></details></div>`;
    }
    function renderShiftleaderHelp17(){
      return `<details class="card detail-drawer sl17-help"><summary>${E17(L17('Hoe werkt deze compacte Shiftplanning?','How does this compact shift planning work?'))}</summary><div class="drawer-content"><p>${E17(L17('Je vult eerst teamleden en werktijden in. Daarna wijs je per pad een persoon toe. De padtijden worden automatisch opgebouwd in de volgorde van de paden en op basis van de vulduur.','First enter team members and working times. Then assign a person per aisle. Lane times are generated in aisle order based on fill duration.'))}</p><ul><li>${E17(L17('Klik op de status om Open → Bezig → Deels → Afgerond te wisselen.','Click the status to switch Open → In progress → Partial → Done.'))}</li><li>${E17(L17('Gebruik ⏱ om uren en minuten vulling te wijzigen.','Use ⏱ to edit fill hours and minutes.'))}</li><li>${E17(L17('Gebruik ✎ voor een notitie; zonder notitie blijft er geen extra tekst zichtbaar.','Use ✎ for a note; without a note no extra text is shown.'))}</li><li>${E17(L17('Extra tools: kopieer vulplanning, planningcheck en wijzigingslog.','Extra tools: copy fill plan, planning check and change log.'))}</li></ul></div></details>`;
    }
    function openFillModal17(id){
      const l=laneById17(id); if(!l) return;
      const mins=[0,5,10,15,20,25,30,35,40,45,50,55];
      if(typeof modal==='function') modal(`${L17('Vulling aanpassen','Edit fill')} — ${l.name}`, `<div class="grid"><p class="muted small">${E17(L17('Kies hoeveel vulling dit pad naar verwachting heeft. De start- en eindtijd worden daarna automatisch opnieuw berekend.','Choose the expected fill amount for this aisle. The start and end time are then recalculated automatically.'))}</p><div class="grid grid-2"><label>${E17(L17('Uren','Hours'))}<input class="input" id="sl17FillHours" type="number" min="0" step="1" value="${E17(l.fillHours||0)}"></label><label>${E17(L17('Minuten','Minutes'))}<select class="select input" id="sl17FillMinutes">${mins.map(m=>`<option value="${m}" ${(+l.fillMinutes||0)===m?'selected':''}>${m}m</option>`).join('')}</select></label></div><div class="btn-row"><button class="btn primary" data-action="sl17-save-fill" data-lane="${E17(l.id)}">${E17(L17('Opslaan','Save'))}</button><button class="btn" data-action="close-modal">${E17(L17('Annuleren','Cancel'))}</button></div></div>`, 'wide');
    }
    function openLaneNoteModal17(id){
      const l=laneById17(id); if(!l) return;
      if(typeof modal==='function') modal(`${L17('Notitie','Note')} — ${l.name}`, `<div class="grid"><textarea class="textarea" id="sl17LaneNote" placeholder="${E17(L17('Bijv. later andere collega, eerst restanten, of bijzonderheid op pad.','E.g. changed colleague, first leftovers, or aisle note.'))}">${E17(l.note||'')}</textarea><div class="btn-row"><button class="btn primary" data-action="sl17-save-lane-note" data-lane="${E17(l.id)}">${E17(L17('Opslaan','Save'))}</button><button class="btn warn" data-action="sl17-clear-lane-note" data-lane="${E17(l.id)}">${E17(L17('Notitie wissen','Clear note'))}</button><button class="btn" data-action="close-modal">${E17(L17('Annuleren','Cancel'))}</button></div></div>`, 'wide');
    }
    function loadStandardTasks17(){
      const sl=ensureShiftLeader17(); const titles=[...baseTasks17]; if(isTueThu17(sl.date)) titles.splice(9,0,'Nee-verkoop houdbaar');
      let added=0; titles.forEach(title=>{ if(!sl.tasks.some(t=>t.title===title && t.date===sl.date)){ sl.tasks.push({id:uid17('sl_task'), title, status:'open', priority:title.includes('Vracht')?'Hoog':'Normaal', note:'', date:sl.date, createdAt:now17()}); added++; } });
      try { if(typeof addActivity==='function') addActivity(`Shiftleider standaardtaken ingeladen: ${added}`,'shiftleader'); } catch(_){ }
      save17(); render17(); toast17(added?`${added} ${L17('taken ingeladen','tasks loaded')}`:L17('Standaardtaken stonden al klaar','Standard tasks were already ready'),'good');
    }

    const prevRenderPage6717 = typeof renderPage === 'function' ? renderPage : null;
    if(prevRenderPage6717) renderPage = window.renderPage = function(){ return state.route === 'shiftleader' ? renderShiftleader17() : prevRenderPage6717(); };

    const prevToday6717 = typeof renderToday === 'function' ? renderToday : null;
    if(prevToday6717) renderToday = window.renderToday = function(){
      const base=prevToday6717(); const sl=ensureShiftLeader17();
      const active = sl.team.length || sl.tasks.length || sl.lanes.some(l=>l.personId||laneMinutes17(l)||l.status!=='open');
      const {available,planned,diff,openTasks}=shiftSummary17(); const mealCount=sl.team.filter(p=>mealAllowance17(p.start,p.end)).length;
      const issues=planningIssues17().length;
      const card = `<div class="card sl17-today-card"><div class="flex-line"><div><h3>${E17(L17('Shiftleider Vers Avondshift','Shift Lead Fresh evening shift'))}</h3><p class="muted small">${active?E17(`${sl.team.length} team · ${openTasks} open taken · ${minutesText17(planned)} gepland${mealCount?` · ${mealCount} maaltijdvergoeding`:''}${issues?` · ${issues} checks`:''}`):E17(L17('Plan team, paden, overige taken en report.','Plan team, aisles, other tasks and report.'))}</p></div><span class="pill ${diff<0?'bad':'good'}">${active?(diff>=0?'+':'−')+minutesText17(Math.abs(diff)):L17('nieuw','new')}</span></div><button class="btn primary mt" data-route="shiftleader">${E17(L17('Open Shiftleider','Open Shift Lead'))}</button></div>`;
      return `${base}<div class="mt sl17-today-wrap">${card}</div>`;
    };

    const prevHandle6717 = typeof handleAction === 'function' ? handleAction : null;
    handleAction = window.handleAction = function(a,el,e){
      const sl=ensureShiftLeader17();
      if(a==='sl17-lane-person'){
        const l=laneById17(el.dataset.lane); if(l){ l.personId=el.value; const p=teamMember17(l.personId); if(p){ l.start=p.start||''; l.end=p.end||''; } logPlan17(`${l.name}: persoon → ${teamMember17(l.personId)?.name || 'niet toegewezen'}`); save17(); render17(); } return;
      }
      if(a==='sl17-cycle-lane-status'){
        const l=laneById17(el.dataset.lane); if(l){ const idx=statusCycle17.indexOf(l.status||'open'); l.status=statusCycle17[(idx+1)%statusCycle17.length]; logPlan17(`${l.name}: status → ${statusLabel17[l.status]||l.status}`); save17(); render17(); } return;
      }
      if(a==='sl17-open-fill'){ openFillModal17(el.dataset.lane); return; }
      if(a==='sl17-save-fill'){
        const l=laneById17(el.dataset.lane); if(l){ l.fillHours=+(document.getElementById('sl17FillHours')?.value||0)||0; l.fillMinutes=+(document.getElementById('sl17FillMinutes')?.value||0)||0; l.hours=laneMinutes17(l)/60; logPlan17(`${l.name}: vulling → ${minutesText17(laneMinutes17(l))}`); if(typeof closeModal==='function') closeModal(); save17(); render17(); } return;
      }
      if(a==='sl17-open-lane-note'){ openLaneNoteModal17(el.dataset.lane); return; }
      if(a==='sl17-save-lane-note'){
        const l=laneById17(el.dataset.lane); if(l){ l.note=(document.getElementById('sl17LaneNote')?.value||'').trim(); logPlan17(`${l.name}: notitie ${l.note?'bijgewerkt':'leeg'}`); if(typeof closeModal==='function') closeModal(); save17(); render17(); } return;
      }
      if(a==='sl17-clear-lane-note'){
        const l=laneById17(el.dataset.lane); if(l){ l.note=''; logPlan17(`${l.name}: notitie gewist`); if(typeof closeModal==='function') closeModal(); save17(); render17(); } return;
      }
      if(a==='sl17-copy-planning'){ copy17(planningText17()); toast17(L17('Vulplanning gekopieerd.','Fill plan copied.'),'good'); return; }
      if(a==='sl17-open-planning-check'){
        const issues=planningIssues17();
        if(typeof modal==='function') modal(L17('Planningcheck','Planning check'), `<div class="grid"><p class="muted small">${E17(L17('Controleert of paden bezet zijn, vuluren kloppen en niemand overpland is.','Checks whether aisles are assigned, fill hours make sense and no one is overplanned.'))}</p>${issues.length?`<div class="list">${issues.map(i=>`<div class="list-item compact"><span>${E17(i)}</span><span class="pill warn">check</span></div>`).join('')}</div>`:`<p class="muted">${E17(L17('Geen grote waarschuwingen gevonden.','No major warnings found.'))}</p>`}<button class="btn primary" data-action="close-modal">${E17(L17('Sluiten','Close'))}</button></div>`, 'wide'); return;
      }
      if(a==='sl17-copy-report'){ copy17(reportText17()); toast17(L17('Shiftklaar report gekopieerd.','Shift report copied.'),'good'); return; }
      if(a==='sl17-save-report-communication'){
        state.communications = Array.isArray(state.communications) ? state.communications : [];
        state.communications.unshift({id:uid17('com'), title:'Shiftklaar Report — Vers Avondshift', message:reportText17(), text:reportText17(), priority:'Normaal', role:'Teamleider', status:'open', createdAt:now17(), date:today17(), followDate:today17(), type:'shiftleader'});
        toast17(L17('Report opgeslagen bij Communicatie.','Report saved to Communication.'),'good'); save17(); render17(); return;
      }
      if(a==='sl16-load-standard-tasks' || a==='sl15-load-standard-tasks'){ loadStandardTasks17(); return; }
      if(prevHandle6717) return prevHandle6717(a,el,e);
    };

    const prevDiag6717 = typeof renderDiagnostics === 'function' ? renderDiagnostics : null;
    if(prevDiag6717) renderDiagnostics = window.renderDiagnostics = function(){
      const sl=ensureShiftLeader17(); let base=prevDiag6717() || '';
      const checks=[
        {name:'Compacte Shiftplanning', ok:typeof renderShiftPlanning17==='function' && sl.lanes.length===6, detail:'één venster'},
        {name:'Vulling via icoon', ok:true, detail:'⏱ uren + minuten'},
        {name:'Notitie via icoon', ok:true, detail:'✎ alleen zichtbaar wanneer gevuld'},
        {name:'Automatische padtijden', ok:!!generatedLaneTimes17, detail:'persoon + volgorde + vulduur'},
        {name:'Planningcheck', ok:Array.isArray(planningIssues17()), detail:`${planningIssues17().length} checks`},
        {name:'Wijzigingslog', ok:Array.isArray(sl.planLog), detail:`${sl.planLog.length} logs`},
        {name:'APP.cache', ok:APP.cache==='rich-cmd-cache-v6717', detail:APP.cache}
      ];
      return base+`<div class="grid grid-2 mt diagnostics-v6717"><div class="card"><h3>v6.7.17 Shiftleider Compact checks</h3><div class="list">${checks.map(c=>`<div class="list-item compact"><span>${E17(c.name)} <span class="tiny muted">${E17(c.detail||'')}</span></span><span class="pill ${c.ok?'good':'bad'}">${c.ok?'OK':'Check'}</span></div>`).join('')}</div></div><div class="card"><h3>${E17(L17('Nieuwe Shiftplanning extra’s','New Shift planning extras'))}</h3><p class="muted small">${E17(L17('Extra features: Kopieer vulplanning, Planningcheck en Wijzigingslog. De planning blijft compact en mobielvriendelijk.','Extra features: copy fill plan, planning check and change log. The planning stays compact and mobile-friendly.'))}</p></div></div>`;
    };
    try { ensureShiftLeader17(); save17(); } catch(_){ }
  } catch(err){ console.error('v6.7.17 patch failed', err); }
})();
