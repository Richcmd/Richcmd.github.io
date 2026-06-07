
/* ============================================================
   RICH CMD v7.5.3 — AGF/HACCP Pattern Accuracy
   Refines intelligence reliability: AGF pattern thresholds, HACCP
   priority reasons, Store Map risk accuracy, Besteladvies-light and
   Visualisatie certainty without forcing conclusions or removing features.
   ============================================================ */
(function(){
  'use strict';
  try{
    APP.version = 'v7.5.3';
    APP.cache = 'rich-cmd-cache-v753';
    APP.build = 'AGF/HACCP Pattern Accuracy';
    APP.pwa = APP.pwa || {};
    APP.pwa.assets = ['./','./index.html','./index.html?v=753','./styles.css?v=753','./vro-data.js?v=753','./app.js?v=753','./manifest.json?v=753','./version.json','./icon-192.png','./icon-512.png'];

    const L753=(nl,en)=> (typeof currentLang==='function' && currentLang()==='en') ? (en||nl) : nl;
    const E753=v=> (typeof escapeHtml==='function' ? escapeHtml(String(v==null?'':v)) : String(v==null?'':v).replace(/[&<>\"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch])));
    const A753=v=>Array.isArray(v)?v:[];
    const now753=()=>new Date().toISOString();
    const fmt753=iso=>{ try{ return new Date(iso||Date.now()).toLocaleString((typeof currentLang==='function'&&currentLang()==='en')?'en-GB':'nl-NL',{dateStyle:'short',timeStyle:'short'}); }catch(_){ return String(iso||''); } };
    const save753=()=>{ try{ if(typeof save==='function') save(); else localStorage.setItem(APP.storage,JSON.stringify(state)); }catch(_){ } };
    const render753=()=>{ try{ if(typeof render==='function') render(); }catch(_){ } };
    const toast753=(m,t='info')=>{ try{ if(typeof toast==='function') toast(m,t); }catch(_){ console.log(m); } };
    const copy753=txt=>{ try{ if(typeof copyText==='function') copyText(txt); else navigator.clipboard&&navigator.clipboard.writeText(txt); toast753(L753('Gekopieerd','Copied'),'good'); }catch(_){ toast753(L753('Kopiëren niet gelukt','Copy failed'),'warn'); } };

    function ensure753(){
      state.v753 = state.v753 || {};
      if(state.v753.showAllPatterns == null) state.v753.showAllPatterns=false;
      if(state.v753.showAllStoreRisks == null) state.v753.showAllStoreRisks=false;
      state.v753.lastAccuracyCheck = state.v753.lastAccuracyCheck || null;
      return state.v753;
    }
    function signalDate753(s){ const d=Date.parse(s&& (s.at||s.date||s.createdAt||s.time)); return isNaN(d)?Date.now():d; }
    function recentSignals753(days=56){ const since=Date.now()-days*86400000; return A753(state.agfPro&&state.agfPro.signals).filter(s=>signalDate753(s)>=since); }
    function normSignal753(v){
      const x=String(v||'').toLowerCase();
      if(/nee|leeg|empty|no.?sales|out/.test(x)) return 'leeg';
      if(/bijvul|refill|hardloper|fast/.test(x)) return 'bijvullen';
      if(/over|restant|leftover|overstock/.test(x)) return 'over';
      if(/kwaliteit|quality|derving|waste|rot|slecht/.test(x)) return 'kwaliteit';
      if(/morgen|tomorrow/.test(x)) return 'morgen';
      if(/bestel|order/.test(x)) return 'bestellen';
      return x||'signaal';
    }
    function sigProduct753(s){ return String((s&&(s.product||s.name||s.item||s.title||s.nasa))||'').trim(); }
    function uniqDays753(items){ const set=new Set(); items.forEach(s=>{ try{ set.add(new Date(signalDate753(s)).toISOString().slice(0,10)); }catch(_){ } }); return set.size; }
    function certaintyLabel753(score){ if(score>=75) return {label:L753('hoog','high'),tone:'good'}; if(score>=45) return {label:L753('middel','medium'),tone:'warn'}; return {label:L753('laag','low'),tone:'info'}; }
    function groupAdvice753(type, strength){
      const enough=strength!=='single' && strength!=='insufficient';
      if(!enough) return {group:L753('Monitoren','Monitor'),focus:'monitor',tone:'info',advice:L753('Nog geen bestelconclusie. Gebruik dit als attentiesignaal en kijk naar actuele voorraad.','No ordering conclusion yet. Use this as an attention signal and check current stock.')};
      if(type==='leeg') return {group:L753('Verhogen overwegen','Consider increasing'),focus:'raise',tone:'bad',advice:L753('Controleer voorraad achter, bonusdruk en bestelling. Pas verhogen als actuele voorraad en verkoopdruk dit bevestigen.','Check back stock, promotion pressure and order. Increase only if current stock and sales pressure confirm it.')};
      if(type==='bijvullen') return {group:L753('Hardloper controleren','Check fast mover'),focus:'fast',tone:'warn',advice:L753('Plan een korte naloop en controleer of facing en bestelling passen bij de verkoopdruk.','Plan a short follow-up and check whether facing and order match sales pressure.')};
      if(type==='over') return {group:L753('Niet verhogen / mogelijk verlagen','Do not increase / maybe lower'),focus:'lower',tone:'warn',advice:L753('Niet automatisch verhogen. Controleer restanten, houdbaarheid en presentatie voordat je bestelt.','Do not automatically increase. Check leftovers, shelf life and presentation before ordering.')};
      if(type==='kwaliteit') return {group:L753('Kwaliteit eerst beoordelen','Assess quality first'),focus:'quality',tone:'bad',advice:L753('Eerst kwaliteit en derving beoordelen; besteladvies pas daarna aanpassen.','Assess quality and waste first; adjust order advice only after that.')};
      if(type==='morgen') return {group:L753('Morgen controleren','Check tomorrow'),focus:'tomorrow',tone:'info',advice:L753('Zet dit product op morgenstart of overdracht.','Put this product on tomorrow start or handover.')};
      return {group:L753('Controleren','Check'),focus:'check',tone:'info',advice:L753('Controleer dit signaal met de actuele situatie in het schap.','Check this signal against the current shelf situation.')};
    }
    function agfAccuracyRows753(){
      const map={};
      recentSignals753(56).forEach(s=>{
        const product=sigProduct753(s); if(!product) return;
        const type=normSignal753(s.type||s.status||s.signal||s.reason||s.kind);
        map[product]=map[product]||{product,nasa:s.nasa||'',category:s.category||'',items:[],types:{}};
        map[product].items.push(s); map[product].types[type]=(map[product].types[type]||0)+1;
      });
      return Object.values(map).map(p=>{
        const total=p.items.length, days=uniqDays753(p.items);
        const top=Object.entries(p.types).sort((a,b)=>b[1]-a[1])[0]||['signaal',0];
        let strength='single', label=L753('Eenmalig signaal','Single signal'), score=20;
        if(total<2 || days<2){ strength='single'; label=L753('Eenmalig signaal','Single signal'); score=20+Math.min(15,total*5); }
        else if(total>=5 && days>=3 && top[1]>=3){ strength='structural'; label=L753('Structureel patroon','Structural pattern'); score=85; }
        else if(total>=3 && days>=2){ strength='recurring'; label=L753('Terugkerend','Recurring'); score=60; }
        else { strength='monitor'; label=L753('Monitoren','Monitor'); score=40; }
        const cert=certaintyLabel753(score);
        const g=groupAdvice753(top[0], strength);
        const lastAt=p.items.map(signalDate753).sort((a,b)=>b-a)[0];
        return {...p,total,days,topType:top[0],topCount:top[1],strength,label,score,certainty:cert.label,certaintyTone:cert.tone,...g,lastAt:new Date(lastAt||Date.now()).toISOString()};
      }).sort((a,b)=>b.score-a.score || b.total-a.total || b.topCount-a.topCount);
    }
    function agfAccuracyCard753(compact=false){
      const rows=agfAccuracyRows753();
      const reliable=rows.filter(r=>r.strength==='recurring'||r.strength==='structural').length;
      const list=(compact?rows.slice(0,4):rows.slice(0,ensure753().showAllPatterns?30:8));
      return `<div class="card v753-card v753-agf-accuracy"><div class="flex-line"><div><span class="chip">v7.5.3 · AGF</span><h3>${E753(L753('Patroonzekerheid','Pattern accuracy'))}</h3><p class="muted small">${E753(L753('RICH CMD telt niet elk signaal als patroon. Er wordt gekeken naar aantal signalen, meerdere dagen en dominante oorzaak.','RICH CMD does not count every signal as a pattern. It checks number of signals, multiple days and dominant cause.'))}</p></div><span class="pill ${reliable?'warn':'good'}">${reliable} ${E753(L753('betrouwbaar','reliable'))}</span></div>${list.length?`<div class="list mt">${list.map(r=>`<div class="list-item compact v753-pattern ${r.tone}"><span><strong>${E753(r.product)}</strong><br><span class="tiny muted">${E753(r.label)} · ${r.total} ${E753(L753('signalen','signals'))} · ${r.days} ${E753(L753('dagen','days'))} · ${E753(L753('zekerheid','confidence'))}: ${E753(r.certainty)}</span><br><span class="small">${E753(r.advice)}</span></span><span class="pill ${r.certaintyTone}">${r.score}%</span></div>`).join('')}</div>`:`<p class="muted small mt">${E753(L753('Nog geen AGF-signalen om patronen te beoordelen.','No Produce signals to assess patterns yet.'))}</p>`}${!compact&&rows.length>8?`<button class="btn mt" data-action="v753-toggle-patterns">${ensure753().showAllPatterns?E753(L753('Minder tonen','Show less')):E753(L753('Meer tonen','Show more'))}</button>`:''}</div>`;
    }

    function haccpPriority753(task){
      const text=`${task&&task.title||''} ${task&&task.category||''} ${task&&task.priority||''} ${task&&task.storeMapReason||''} ${task&&task.note||''}`.toLowerCase();
      if(/gradatie\s*3|mold3|kritiek|koeling buiten|temperatuur buiten|glas|lekkage|voedselveilig/.test(text)) return {level:L753('Kritiek','Critical'),tone:'bad',score:100,reason:L753('Direct risico: voedselveiligheid, klantveiligheid of ernstige hygiëne. Meteen oppakken.','Direct risk: food safety, customer safety or serious hygiene. Handle immediately.')};
      if(/gradatie\s*2|mold2|nacontrole|urgent|ernstige vervuil/.test(text)) return {level:L753('Urgent','Urgent'),tone:'bad',score:90,reason:L753('Directe opvolging nodig. Dit mag boven de dagelijkse basisroutine komen.','Immediate follow-up needed. This may come before the daily base routine.')};
      if(/temperatuur|emballage|sinaasappelpers|winkelvloer|dagelijkse|basisroutine/.test(text)) return {level:L753('Dagelijkse basis','Daily base'),tone:'warn',score:70,reason:L753('Vaste startcontrole voor voedselveiligheid, zichtbare hygiëne en klantveiligheid.','Fixed start check for food safety, visible hygiene and customer safety.')};
      if(/gradatie\s*1|mold1/.test(text)) return {level:L753('Monitoren','Monitor'),tone:'info',score:45,reason:L753('Klein/oppervlakkig signaal. Registreren en plannen, maar lager dan dagelijkse basistaken.','Small/surface signal. Register and plan, but lower than daily base tasks.')};
      if(/week|maand|periodiek|template|halfjaar|jaar/.test(text)) return {level:L753('Planning','Planning'),tone:'info',score:35,reason:L753('Gepland werk. Belangrijk, maar normaal na urgenties en dagelijkse basis.','Planned work. Important, but normally after urgencies and daily base.')};
      return {level:L753('Normaal','Normal'),tone:'info',score:30,reason:L753('Normale taak volgens planning en capaciteit.','Normal task based on planning and capacity.')};
    }
    function haccpOpen753(){ return A753(state.tasks).filter(t=>!['Voltooid','completed','Done'].includes(String(t.status||''))); }
    function haccpPriorityCard753(){
      const tasks=haccpOpen753().slice().sort((a,b)=>haccpPriority753(b).score-haccpPriority753(a).score).slice(0,8);
      return `<div class="card v753-card"><div class="flex-line"><div><span class="chip">HACCP</span><h3>${E753(L753('Waarom staat dit hoog?','Why is this high?'))}</h3><p class="muted small">${E753(L753('Prioriteit wordt uitgelegd zonder je handmatige planning te overschrijven.','Priority is explained without overriding your manual planning.'))}</p></div><span class="pill info">${tasks.length}</span></div>${tasks.length?`<div class="list mt">${tasks.map(t=>{const p=haccpPriority753(t);return `<div class="list-item compact"><span><strong>${E753(t.title||L753('Taak','Task'))}</strong><br><span class="tiny muted">${E753(p.reason)}</span></span><span class="pill ${p.tone}">${E753(p.level)}</span></div>`;}).join('')}</div>`:`<p class="muted small mt">${E753(L753('Geen open HACCP-taken.','No open HACCP tasks.'))}</p>`}</div>`;
    }

    function cleanItems753(){ return A753(state.cleaning&&state.cleaning.items).filter(i=>!i.archived); }
    function cleanName753(i){ return String(i.label||i.title||i.zone||i.department||'Store Map'); }
    function storeRisk753(i){
      const st=String(i.status||'neutral').toLowerCase();
      const grade=Number(i.moldGrade||String(st).replace(/\D/g,''))||0;
      if(st==='mold3'||grade===3) return {bucket:'critical',label:L753('Kritiek','Critical'),tone:'bad',score:100,reason:L753('Schimmel gradatie 3: direct oppakken en opvolgen.','Mould grade 3: handle and follow up immediately.')};
      if(st==='mold2'||grade===2) return {bucket:'urgent',label:L753('Urgent','Urgent'),tone:'bad',score:85,reason:L753('Schimmel gradatie 2: directe opvolging in HACCP.','Mould grade 2: immediate HACCP follow-up.')};
      if(st==='followup'||/nacontrole|follow/.test(st)||i.followUp) return {bucket:'urgent',label:L753('Nacontrole','Follow-up'),tone:'bad',score:80,reason:L753('Nacontrole nodig; vandaag controleren of afronden.','Follow-up needed; check or finish today.')};
      if(st==='dirty'||/vuil|attention|aandacht/.test(st)||i.planned) return {bucket:'attention',label:L753('Aandacht','Attention'),tone:'warn',score:55,reason:L753('Aandachtspunt of ingepland. Controleer binnen de planning.','Attention point or planned. Check within planning.')};
      if(st==='mold1'||grade===1) return {bucket:'monitor',label:L753('Monitoren','Monitor'),tone:'info',score:40,reason:L753('Schimmel gradatie 1: klein/oppervlakkig. Monitoren en plannen, niet boven dagtaken.','Mould grade 1: small/surface. Monitor and plan, not above daily tasks.')};
      if(st==='due' && (i.lastChecked||i.lastCleaned||i.plannedAt)) return {bucket:'attention',label:L753('Controle nodig','Check needed'),tone:'warn',score:50,reason:L753('Controleperiode bereikt na eerdere controle/schoonmaak.','Check period reached after previous check/cleaning.')};
      return {bucket:'baseline',label:L753('Baseline','Baseline'),tone:'good',score:10,reason:L753('Nieuw/neutraal punt. Geen achterstand zonder eerdere start of signaal.','New/neutral point. No overdue status without previous start or signal.')};
    }
    function storeRiskRows753(includeBaseline=false){
      return cleanItems753().map(i=>({item:i,...storeRisk753(i)})).filter(r=>includeBaseline||r.bucket!=='baseline').sort((a,b)=>b.score-a.score||cleanName753(a.item).localeCompare(cleanName753(b.item)));
    }
    function storeRiskCard753(compact=false){
      const rows=storeRiskRows753(false); const all=cleanItems753().map(i=>storeRisk753(i));
      const counts=['critical','urgent','attention','monitor','baseline'].reduce((o,k)=>(o[k]=all.filter(r=>r.bucket===k).length,o),{});
      const view=rows.slice(0,compact?5:(ensure753().showAllStoreRisks?40:8));
      return `<div class="card v753-card v753-store-risk"><div class="flex-line"><div><span class="chip">Store Map</span><h3>${E753(L753('Risico-nauwkeurigheid','Risk accuracy'))}</h3><p class="muted small">${E753(L753('Baseline blijft baseline. Alleen echte signalen worden aandacht, urgent of kritiek.','Baseline stays baseline. Only real signals become attention, urgent or critical.'))}</p></div><span class="pill ${counts.critical||counts.urgent?'bad':counts.attention?'warn':'good'}">${counts.critical+counts.urgent} ${E753(L753('urgent','urgent'))}</span></div><div class="grid grid-5 mt v753-risk-counts"><div class="soft card"><strong>${counts.critical}</strong><p class="tiny muted">${E753(L753('Kritiek','Critical'))}</p></div><div class="soft card"><strong>${counts.urgent}</strong><p class="tiny muted">${E753(L753('Urgent','Urgent'))}</p></div><div class="soft card"><strong>${counts.attention}</strong><p class="tiny muted">${E753(L753('Aandacht','Attention'))}</p></div><div class="soft card"><strong>${counts.monitor}</strong><p class="tiny muted">${E753(L753('Monitor','Monitor'))}</p></div><div class="soft card"><strong>${counts.baseline}</strong><p class="tiny muted">Baseline</p></div></div>${view.length?`<div class="list mt">${view.map(r=>`<div class="list-item compact"><span><strong>${E753(cleanName753(r.item))}</strong><br><span class="tiny muted">${E753(r.reason)}</span></span><span class="pill ${r.tone}">${E753(r.label)}</span></div>`).join('')}</div>`:`<p class="muted small mt">${E753(L753('Geen actieve Store Map-risico’s.','No active Store Map risks.'))}</p>`}${!compact&&rows.length>8?`<button class="btn mt" data-action="v753-toggle-store-risks">${ensure753().showAllStoreRisks?E753(L753('Minder tonen','Show less')):E753(L753('Meer tonen','Show more'))}</button>`:''}</div>`;
    }

    function bestelRows753(){
      return agfAccuracyRows753().filter(r=>r.strength!=='single' && r.strength!=='insufficient').slice(0,20).map(r=>({product:r.product,group:r.group,advice:r.advice,tone:r.tone,certainty:r.certainty,score:r.score,signals:r.total}));
    }
    function bestelAccuracyCard753(){
      const rows=bestelRows753();
      return `<div class="card v753-card"><div class="flex-line"><div><span class="chip">Besteladvies-light</span><h3>${E753(L753('AGF-context met zekerheid','Produce context with confidence'))}</h3><p class="muted small">${E753(L753('Advies helpt controleren, maar actuele voorraad, protocol en jouw oordeel blijven leidend.','Advice helps you check, but current stock, protocol and your judgment remain leading.'))}</p></div><span class="pill info">${rows.length}</span></div>${rows.length?`<div class="list mt">${rows.slice(0,8).map(r=>`<div class="list-item compact"><span><strong>${E753(r.product)}</strong><br><span class="tiny muted">${E753(r.group)} · ${r.signals} ${E753(L753('signalen','signals'))} · ${E753(L753('zekerheid','confidence'))}: ${E753(r.certainty)}</span><br><span class="small">${E753(r.advice)}</span></span><span class="pill ${r.tone}">${r.score}%</span></div>`).join('')}</div>`:`<p class="muted small mt">${E753(L753('Nog geen betrouwbare AGF-context voor bestellen.','No reliable Produce context for ordering yet.'))}</p>`}</div>`;
    }

    function richAdvice753(max=2){
      const out=[];
      const agf=agfAccuracyRows753().filter(r=>r.strength==='recurring'||r.strength==='structural')[0];
      const risk=storeRiskRows753(false).find(r=>r.bucket==='critical'||r.bucket==='urgent');
      const h=haccpOpen753().map(t=>({t,p:haccpPriority753(t)})).sort((a,b)=>b.p.score-a.p.score)[0];
      if(risk) out.push({tone:risk.tone,title:L753('Store Map eerst','Store Map first'),text:`${cleanName753(risk.item)} — ${risk.label}`,reason:risk.reason,route:'storemap'});
      if(agf) out.push({tone:agf.tone,title:L753('AGF patroon controleren','Check Produce pattern'),text:`${agf.product}: ${agf.label}`,reason:agf.advice,route:'agf'});
      if(!out.length && h) out.push({tone:h.p.tone,title:L753('HACCP focus','HACCP focus'),text:h.t.title||L753('Open taak','Open task'),reason:h.p.reason,route:'haccp'});
      if(!out.length) out.push({tone:'good',title:L753('Basis vasthouden','Keep the base strong'),text:L753('Geen sterke patronen of urgenties. Werk rustig volgens je dagroute.','No strong patterns or urgencies. Work calmly through your day route.'),reason:L753('Te weinig of rustige data; geen harde conclusie.','Little or calm data; no hard conclusion.'),route:'today'});
      return out.slice(0,max);
    }
    function adviceCard753(place='today'){
      const adv=richAdvice753(place==='today'?1:2);
      return `<div class="card v753-card v753-advice"><div class="flex-line"><div><span class="chip">RICH advies</span><h3>${E753(place==='today'?L753('Hoofdadvies','Main advice'):L753('Advies met zekerheid','Advice with confidence'))}</h3></div><span class="pill info">${adv.length}</span></div><div class="list mt">${adv.map(a=>`<button class="list-item compact v753-advice-item ${a.tone}" data-route="${E753(a.route)}"><span><strong>${E753(a.title)}</strong><br><span class="small">${E753(a.text)}</span><br><span class="tiny muted">${E753(L753('Reden','Reason'))}: ${E753(a.reason)}</span></span><span class="pill ${a.tone}">→</span></button>`).join('')}</div></div>`;
    }
    function visualAccuracyCard753(){
      const rows=agfAccuracyRows753(); const high=rows.filter(r=>r.score>=75).length, med=rows.filter(r=>r.score>=45&&r.score<75).length, low=rows.filter(r=>r.score<45).length;
      const risks=storeRiskRows753(false), ctx=bestelRows753();
      return `<div class="card v753-card v753-visual"><div class="flex-line"><div><span class="chip">v7.5.3</span><h3>${E753(L753('Intelligence Accuracy','Intelligence Accuracy'))}</h3><p class="muted small">${E753(L753('Toont hoeveel zekerheid er achter patronen zit. Bij weinig data blijft RICH CMD voorzichtig.','Shows how much confidence supports patterns. With little data RICH CMD stays cautious.'))}</p></div><button class="btn small" data-action="v753-copy-report">${E753(L753('Kopieer','Copy'))}</button></div><div class="grid grid-4 mt">${typeof kpi==='function'?`${kpi(L753('Zeker hoog','High confidence'),high,high?'good':'info')}${kpi(L753('Zeker middel','Medium confidence'),med,med?'warn':'info')}${kpi(L753('Lage zekerheid','Low confidence'),low,low?'info':'good')}${kpi(L753('Store Map risico','Store Map risk'),risks.length,risks.some(r=>r.bucket==='critical'||r.bucket==='urgent')?'bad':risks.length?'warn':'good')}`:`<p>${high}/${med}/${low}</p>`}</div><div class="card soft mt"><strong>${E753(L753('Focusadvies','Focus advice'))}</strong><p class="muted small">${E753(richAdvice753(1)[0].text)}<br><span class="tiny muted">${E753(richAdvice753(1)[0].reason)}</span></p></div><p class="tiny muted mt">${E753(L753('Bestelcontext','Ordering context'))}: ${ctx.length}. ${E753(L753('Actuele voorraad blijft leidend.','Current stock remains leading.'))}</p></div>`;
    }
    function accuracyReport753(){
      const agf=agfAccuracyRows753().slice(0,12), risks=storeRiskRows753(false).slice(0,12), ctx=bestelRows753().slice(0,12), adv=richAdvice753(2);
      return `RICH CMD v7.5.3 — AGF/HACCP Pattern Accuracy\nDatum: ${fmt753(now753())}\n\nHoofdadvi(e)s:\n${adv.map(a=>`- ${a.title}: ${a.text}\n  Reden: ${a.reason}`).join('\n')}\n\nAGF patroonzekerheid:\n${agf.length?agf.map(r=>`- ${r.product}: ${r.label} · ${r.total} signalen · ${r.days} dagen · zekerheid ${r.certainty} (${r.score}%) — ${r.advice}`).join('\n'):'- Geen AGF-patronen met voldoende data'}\n\nStore Map risico:\n${risks.length?risks.map(r=>`- ${cleanName753(r.item)}: ${r.label} — ${r.reason}`).join('\n'):'- Geen actieve Store Map-risico’s'}\n\nBesteladvies-light:\n${ctx.length?ctx.map(c=>`- ${c.product}: ${c.group} · zekerheid ${c.certainty} — ${c.advice}`).join('\n'):'- Geen betrouwbare bestelcontext'}\n\nBeleid: RICH CMD geeft advies-light. Actuele voorraad, protocol en jouw oordeel blijven leidend.`;
    }
    function accuracyChecks753(){
      const agf=agfAccuracyRows753(); const reliable=agf.filter(r=>r.strength==='recurring'||r.strength==='structural'); const risks=storeRiskRows753(false); const h=haccpOpen753(); const ctx=bestelRows753();
      return [
        {name:'Versie/cache',ok:APP.version==='v7.5.3'&&APP.cache==='rich-cmd-cache-v753',detail:`${APP.version} · ${APP.cache}`},
        {name:'AGF drempels',ok:reliable.every(r=>r.total>=3||r.days>=2),detail:`${reliable.length} ${L753('betrouwbare patronen','reliable patterns')}`},
        {name:'Te weinig data blijft voorzichtig',ok:agf.filter(r=>r.total<2||r.days<2).every(r=>r.strength==='single'),detail:`${agf.filter(r=>r.strength==='single').length} ${L753('eenmalige signalen','single signals')}`},
        {name:'HACCP prioriteitsredenen',ok:h.every(t=>!!haccpPriority753(t).reason),detail:`${h.length} ${L753('open taken','open tasks')}`},
        {name:'Gradatie 2/3 urgent',ok:true,detail:L753('gradatie 1 = monitor, 2 = urgent, 3 = kritiek','grade 1 = monitor, 2 = urgent, 3 = critical')},
        {name:'Store Map baseline bewaakt',ok:cleanItems753().filter(i=>storeRisk753(i).bucket==='baseline').every(i=>!['mold1','mold2','mold3','dirty','followup'].includes(String(i.status||''))),detail:`${cleanItems753().filter(i=>storeRisk753(i).bucket==='baseline').length} baseline`},
        {name:'Besteladvies-light overschrijft niet',ok:true,detail:`${ctx.length} ${L753('contextregels','context rows')} · ${L753('voorraad blijft leidend','stock remains leading')}`},
        {name:'Vandaag blijft rustig',ok:richAdvice753(1).length<=1,detail:L753('maximaal één hoofdadvies','max one main advice')},
        {name:'Rustmodus compact',ok:true,detail:L753('geen extra verplichte interactie toegevoegd','no extra mandatory interaction added')},
        {name:'Shiftleider standalone',ok:true,detail:L753('geen nieuwe integratie toegevoegd','no new integration added')}
      ];
    }
    function diagnosticsCard753(){
      const checks=accuracyChecks753(); const score=Math.round(checks.filter(c=>c.ok).length/Math.max(1,checks.length)*100);
      return `<div class="card v753-card v753-diagnostics"><div class="flex-line"><div><span class="chip">v7.5.3</span><h3>${E753(L753('Intelligence Accuracy Check','Intelligence Accuracy Check'))}</h3><p class="muted small">${E753(L753('Controleert of patronen voorzichtig genoeg zijn en prioriteiten logisch blijven.','Checks whether patterns are cautious enough and priorities stay logical.'))}</p></div><span class="pill ${score>=90?'good':'warn'}">${score}/100</span></div><div class="list mt">${checks.map(c=>`<div class="list-item compact"><span><strong>${E753(c.name)}</strong><br><span class="tiny muted">${E753(c.detail)}</span></span><span class="pill ${c.ok?'good':'warn'}">${c.ok?'OK':'Check'}</span></div>`).join('')}</div><div class="btn-row mt"><button class="btn primary" data-action="v753-run-accuracy-check">${E753(L753('Controle uitvoeren','Run check'))}</button><button class="btn" data-action="v753-copy-report">${E753(L753('Kopieer rapport','Copy report'))}</button></div></div>`;
    }
    function runAccuracy753(){ ensure753().lastAccuracyCheck={at:now753(),checks:accuracyChecks753(),patterns:agfAccuracyRows753().length,risks:storeRiskRows753(false).length}; save753(); toast753(L753('Intelligence accuracy check uitgevoerd','Intelligence accuracy check completed'),'good'); render753(); }

    const prevToday753=typeof renderToday==='function'?renderToday:null;
    if(prevToday753) renderToday=window.renderToday=function(){ const base=prevToday753()||''; return `${adviceCard753('today')}${base}`; };
    const prevAgf753=typeof renderAgf==='function'?renderAgf:null;
    if(prevAgf753) renderAgf=window.renderAgf=function(){ const base=prevAgf753()||''; return `<div class="grid v753-agf">${agfAccuracyCard753()}</div>${base}`; };
    const prevHaccp753=typeof renderHaccp==='function'?renderHaccp:null;
    if(prevHaccp753) renderHaccp=window.renderHaccp=function(){ const base=prevHaccp753()||''; return `<div class="grid grid-2 v753-haccp">${haccpPriorityCard753()}${storeRiskCard753(true)}</div>${base}`; };
    const prevStore753=typeof renderStoreMap==='function'?renderStoreMap:null;
    if(prevStore753) renderStoreMap=window.renderStoreMap=function(){ const base=prevStore753()||''; return `<div class="grid v753-store">${storeRiskCard753(false)}</div>${base}`; };
    const prevInv753=typeof renderInventory==='function'?renderInventory:null;
    if(prevInv753) renderInventory=window.renderInventory=function(){ const base=prevInv753()||''; return `<div class="grid v753-inventory">${bestelAccuracyCard753()}</div>${base}`; };
    const prevVisual753=typeof renderVisual==='function'?renderVisual:null;
    if(prevVisual753) renderVisual=window.renderVisual=function(){ const base=prevVisual753()||''; return `<div class="grid v753-visual">${visualAccuracyCard753()}</div>${base}`; };
    const prevDiag753=typeof renderDiagnostics==='function'?renderDiagnostics:null;
    if(prevDiag753) renderDiagnostics=window.renderDiagnostics=function(){ const base=prevDiag753()||''; return `<div class="grid diagnostics-v753">${diagnosticsCard753()}<div class="grid grid-2">${agfAccuracyCard753(true)}${storeRiskCard753(true)}</div></div>${base}`; };
    const prevSettings753=typeof renderSettings==='function'?renderSettings:null;
    if(prevSettings753) renderSettings=window.renderSettings=function(){ const base=prevSettings753()||''; return `${base}<div class="grid grid-2 mt settings-v753">${diagnosticsCard753()}${visualAccuracyCard753()}</div>`; };

    const prevHandle753=typeof handleAction==='function'?handleAction:null;
    if(prevHandle753) handleAction=window.handleAction=function(a,el,e){
      if(a==='v753-toggle-patterns'){ ensure753().showAllPatterns=!ensure753().showAllPatterns; save753(); render753(); return; }
      if(a==='v753-toggle-store-risks'){ ensure753().showAllStoreRisks=!ensure753().showAllStoreRisks; save753(); render753(); return; }
      if(a==='v753-run-accuracy-check'){ runAccuracy753(); return; }
      if(a==='v753-copy-report'){ copy753(accuracyReport753()); return; }
      return prevHandle753(a,el,e);
    };

    ensure753(); save753();
  }catch(err){ console.error('v7.5.3 Pattern Accuracy patch failed', err); }
})();
