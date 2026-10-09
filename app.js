'use strict';

/* ---------- Tiger 5 rules and courses ---------- */
const RULES=[
 {k:'r1',n:'No 6s on par-5s',t:(h)=>h.par===5&&h.score>=6},
 {k:'r2',n:'No doubles',t:(h)=>h.score>=h.par+2},
 {k:'r3',n:'No 3-putts',t:(h)=>h.putts>=3},
 {k:'r4',n:'No bogeys with scoring clubs',t:(h)=>h.sc&&h.score>h.par},
 {k:'r5',n:'No missed easy up-and-downs',t:(h)=>h.ud}
];
const T=(info,yds)=>({info,yds});
const COURSES={
sr:{name:'South Riding Golf Club',par:[5,4,5,4,3,4,3,4,4,5,3,4,4,3,5,4,4,4],si:[6,16,14,2,8,12,10,18,4,15,13,3,1,11,7,9,17,5],tees:{
 Championship:T('7,148 yds · 74.9/140',[593,397,546,431,232,406,206,345,474,523,199,404,426,206,569,404,354,433]),
 Tournament:T('6,473 yds · 71.9/133',[542,373,501,392,195,366,188,328,404,494,153,370,375,189,524,376,308,395]),
 Medal:T('6,070 yds · 70.0/128',[542,373,460,346,153,366,142,328,371,444,153,370,375,141,524,327,308,347]),
 Club:T('5,720 yds · 68.3/126',[503,363,460,346,153,322,142,282,371,444,129,329,332,141,472,327,257,347])}},
wc:{name:'Whiskey Creek Golf Club',par:[4,4,3,5,4,4,3,4,5,4,3,4,4,4,3,5,4,5],si:[5,13,9,1,3,11,17,7,15,8,14,2,6,10,12,16,4,18],tees:{
 Black:T('7,001 yds · 74.6/138',[406,390,196,558,402,344,157,391,545,387,198,445,416,427,222,545,425,547]),
 Blue:T('6,525 yds · 72.3/136',[381,363,169,532,371,323,134,359,509,364,173,413,398,411,191,516,402,516]),
 White:T('5,979 yds · 69.3/129',[328,321,137,486,360,297,108,319,478,323,141,397,383,382,166,482,387,484])}},
bm:{name:'Blue Mash Golf Course',par:[4,4,4,3,5,3,4,4,5,4,3,5,3,4,4,4,3,5],si:[3,9,1,13,7,17,11,15,5,14,16,8,18,12,10,2,4,6],tees:{
 Gold:T('6,885 yds · 73.0/134',[449,452,478,206,580,160,392,310,548,398,217,500,177,378,423,463,192,562]),
 Blue:T('6,502 yds · 71.2/126',[424,428,453,190,533,143,386,283,522,367,204,476,160,360,400,445,177,551]),
 'Blue/White':T('6,294 yds',[389,401,426,172,533,143,386,283,500,367,189,476,160,360,400,430,158,521])}},
wm:{name:'Worthington Manor Golf Club',par:[4,4,4,4,5,3,4,3,5,4,4,4,5,4,3,4,3,5],si:[7,3,1,9,15,13,17,11,5,14,18,2,10,16,12,6,4,8],tees:{
 Black:T('7,034 yds · 74.7/145',[414,395,437,430,533,198,372,175,556,379,359,459,555,361,193,470,223,525]),
 Blue:T('6,525 yds · 72.4/137',[384,358,411,401,503,171,339,169,536,346,332,423,522,340,170,430,188,502]),
 White:T('6,058 yds · 70.0/132',[366,326,396,378,485,145,309,155,513,326,302,381,481,318,136,398,161,482]),
 Red:T('5,206 yds · 70.1/127',[334,285,329,341,450,126,206,147,428,296,225,346,421,280,111,345,124,412])}},
wf:{name:'Westfields Golf Club',par:[4,4,3,5,4,4,3,4,4,4,5,3,4,4,5,4,3,4],si:[13,11,5,7,9,3,17,1,15,12,8,14,10,18,4,6,16,2],tees:{
 'Boom Boom':T('6,897 yds · 73.4/141',[408,416,223,570,448,473,180,467,390,412,525,194,365,285,554,384,160,443]),
 Blue:T('6,496 yds · 71.6/137',[388,394,197,541,420,459,157,441,368,388,507,171,349,264,530,354,146,422]),
 White:T('6,034 yds · 69.5/132',[356,361,155,520,379,433,141,406,345,368,468,160,337,250,501,329,126,399]),
 'White/Green':T('5,724 yds · 68.1/128',[356,361,155,520,331,392,128,382,345,368,468,145,308,250,465,291,126,333])}},
rf:{name:'Raspberry Falls Golf & Hunt Club',par:[4,4,4,5,3,4,3,4,5,4,5,4,3,4,3,4,4,5],si:[9,5,3,11,13,15,17,1,7,2,6,12,16,4,14,10,18,8],tees:{
 Black:T('7,165 yds',[383,428,480,538,202,334,189,441,531,460,594,433,184,439,213,413,369,534]),
 Raspberry:T('4,878 yds',[232,302,376,408,99,212,130,259,393,286,445,289,110,290,126,268,251,402])}},
hc:{name:'Herndon Centennial Golf Course',par:[4,4,5,4,3,4,3,4,4,4,4,4,4,3,5,3,5,4],si:[1,9,7,13,15,5,11,3,17,12,2,8,6,18,14,16,10,4],tees:{
 Black:T('6,197 yds · 69.7/126',[407,361,509,360,173,368,172,355,310,343,402,410,386,136,482,133,485,405]),
 Blue:T('5,774 yds · 68.1/122',[387,347,466,303,157,355,149,335,297,326,361,376,375,111,463,118,478,370])}},
rn:{name:'Reston National Golf Course',par:[4,5,3,4,5,3,4,4,4,4,3,4,4,4,5,3,4,4],si:[14,18,16,8,10,12,4,2,6,1,17,7,3,11,13,5,9,15],tees:{
 Gold:T('6,880 yds · 73.0/131',[394,536,183,422,522,208,416,396,408,462,172,426,443,377,527,202,414,372])}}
};

/* ---------- helpers ---------- */
const $=(s)=>document.querySelector(s);
const esc=(s)=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rel=(n)=>n===0?'E':(n>0?'+'+n:''+n);
const fmtIdx=(v)=>v==null?'—':(v<0?'+'+(-v).toFixed(1):v.toFixed(1));
const fmtDiff=(v)=>v==null?'—':v.toFixed(1);
const played=(h)=>h.score!=null;
const fails=(h)=>played(h)?RULES.filter(r=>r.t(h)):[];
const isoDate=(d)=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>isoDate(new Date());
const fmtDate=(s)=>{if(!s)return'';const [y,m,d]=s.split('-').map(Number);const dt=new Date(y,m-1,d);return dt.toLocaleDateString(undefined,{month:'short',day:'numeric',...(y!==new Date().getFullYear()?{year:'numeric'}:{})})};
const newId=()=>(crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16)}));
const AVC=['#2e6b45','#8a5a1f','#3d5a80','#7a3b52','#5b6b2e','#2f6f73','#6b4c9a','#a0442c'];
const avColor=(id)=>{let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))>>>0;return AVC[h%AVC.length]};
const initials=(n)=>(n||'?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();
const teeRS=(c,t)=>{const m=((COURSES[c]&&COURSES[c].tees[t]&&COURSES[c].tees[t].info)||'').match(/([\d.]+)\/(\d+)/);return m?{r:m[1],s:m[2]}:{r:'',s:''}};
const teeOpts=(c)=>Object.entries(COURSES[c].tees).map(([k,v])=>`<option value="${esc(k)}">${esc(k)} · ${esc(v.info)}</option>`).join('');
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- handicap (World Handicap System) ---------- */
const TABLE={3:[1,-2],4:[1,-1],5:[1,0],6:[2,-1],7:[2,0],8:[2,0],9:[3,0],10:[3,0],11:[3,0],12:[4,0],13:[4,0],14:[4,0],15:[5,0],16:[5,0],17:[6,0],18:[6,0],19:[7,0],20:[8,0]};
function hcp(rounds){
 const rs=(rounds||[]).filter(r=>typeof r.diff==='number').sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.at||0)-(a.at||0)).slice(0,20);
 const t=TABLE[rs.length];
 if(!t)return{index:null,rs,used:new Set(),need:3-rs.length};
 const low=[...rs].sort((a,b)=>a.diff-b.diff).slice(0,t[0]);
 const v=low.reduce((a,r)=>a+r.diff,0)/t[0]+t[1];
 return{index:Math.min(54,Math.round(v*10)/10),rs,used:new Set(low.map(r=>r.id)),take:t[0]};
}
function courseHcp(index,n,rating,slope,par){
 if(index==null||!rating||!slope)return null;
 return n===9?Math.round((index/2)*slope/113+(rating/2-par)):Math.round(index*slope/113+(rating-par));
}
function calc(r,index){
 const hs=r.holes,n=hs.length,ph=hs.filter(played);
 const par=hs.reduce((a,h)=>a+h.par,0),score=ph.reduce((a,h)=>a+h.score,0),parPlayed=ph.reduce((a,h)=>a+h.par,0);
 // Putts are optional: a round only has a putts total when every scored hole has putts entered.
 const putts=ph.length&&ph.every(h=>h.putts!=null)?ph.reduce((a,h)=>a+h.putts,0):null;
 const per={};RULES.forEach(x=>per[x.k]=ph.filter(h=>x.t(h)).length);
 const t5=Object.values(per).reduce((a,b)=>a+b,0);
 const rating=+r.rating,slope=+r.slope;
 const okRS=rating>=25&&rating<=85&&slope>=55&&slope<=155;
 const ch=okRS?courseHcp(index,n,rating,slope,par):null;
 const order=hs.map((h,i)=>({i,si:h.si||i+1})).sort((a,b)=>a.si-b.si);
 const rank={};order.forEach((o,k)=>rank[o.i]=k+1);
 const strokes=(i)=>{if(ch==null)return 0;if(ch>=0)return Math.floor(ch/n)+(rank[i]<=ch%n?1:0);return rank[i]>n+ch?-1:0};
 let ags=0;hs.forEach((h,i)=>{if(played(h))ags+=Math.min(h.score,h.par+(ch==null?5:2+strokes(i)))});
 const complete=ph.length===n;
 let diff=null;
 if(complete&&okRS){
  diff=(113/slope)*(ags-(n===9?rating/2:rating));
  if(n===9)diff=index==null?diff*2:diff+(0.52*index+1.2);
  diff=Math.round(diff*10)/10;
 }
 return{n,par,parPlayed,score,putts,per,t5,ch,ags,diff,complete,net:ch==null?null:score-ch,holesPlayed:ph.length};
}

/* ---------- Supabase ---------- */
const CFG=window.TIGER5_CONFIG||{};
const configured=!!(CFG.supabaseUrl&&CFG.supabaseAnonKey&&!/YOUR-/.test(CFG.supabaseUrl+CFG.supabaseAnonKey));
const sb=configured&&window.supabase?window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}}):null;

const fromRow=(r)=>({id:r.id,uid:r.user_id,course:r.course,tee:r.tee,rating:r.rating==null?null:+r.rating,slope:r.slope,date:r.date,nine:r.nine,holes:r.holes||[],n:r.n,par:r.par,parPlayed:r.par_played,score:r.score,putts:r.putts,per:r.per||{},t5:r.t5,ch:r.ch,ags:r.ags,diff:r.diff==null?null:+r.diff,complete:r.complete,net:r.net,holesPlayed:r.holes_played,at:Date.parse(r.created_at)||0,pending:!!r._pending});
function toRow(d,t,index,extra){
 return{id:d.id,user_id:S.me,course:d.course,tee:d.tee||null,rating:+d.rating||null,slope:+d.slope||null,date:d.date,nine:d.nine||null,holes:d.holes,
  n:t.n,par:t.par,par_played:t.parPlayed,score:t.score,putts:t.putts,per:t.per,t5:t.t5,ch:t.ch,ags:t.ags,diff:t.diff,complete:t.complete,net:t.net,holes_played:t.holesPlayed,index_at_post:index,...(extra||{})};
}

/* ---------- state ---------- */
const DKEY='tiger5-draft-v2',OLDKEY='tiger5-rounds-v1',IMPKEY='tiger5-imported-v1',OUTKEY='tiger5-outbox',CACHEKEY='tiger5-cache',INVKEY='tiger5-invite';
const S={status:'loading',me:null,email:'',profiles:{},friendships:[],rounds:{},view:'feed',arg:null,busy:false,confirm:null,editName:false,nsel:'18',authStep:'signin',authEmail:'',offline:false,invite:null,trips:[],tripMembers:{},bets:{},tripsOk:true,tripSel:[],betKind:'putts',betScoring:'total',tripTabs:{},board:[],boardPicks:{},boardOk:true,bbOpts:2,settling:null,expenses:{},exSplit:null,exPaidBy:null,receiptView:null,likes:{},comments:{},attests:{}};
let draft=LS.get(DKEY,null),hidx=0,playView=draft&&draft.holes?'hole':'start',lastKey='';
if(draft&&!draft.holes)draft=null;
const saveDraft=()=>LS.set(DKEY,draft);
const oldRounds=()=>LS.get(IMPKEY,null)?[]:LS.get(OLDKEY,[]);

const me=()=>S.profiles[S.me]||{};
const handle=(id)=>(S.profiles[id]&&S.profiles[id].handle)||'Golfer';
const other=(f)=>f.requester===S.me?f.addressee:f.requester;
const friendIds=()=>S.friendships.filter(f=>f.status==='accepted').map(other);
const incoming=()=>S.friendships.filter(f=>f.status==='pending'&&f.addressee===S.me).map(f=>f.requester);
const outgoing=()=>S.friendships.filter(f=>f.status==='pending'&&f.requester===S.me).map(f=>f.addressee);
const isFriend=(id)=>friendIds().includes(id);
const myIndex=()=>hcp(S.rounds[S.me]).index;

let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,3500)}
const isNetErr=(e)=>!navigator.onLine||(e&&(e instanceof TypeError||/fetch|network/i.test(e.message||'')));
function fail(e,what){console.error(e);toast(isNetErr(e)?'You’re offline. Try again when you have signal.':(what||'That didn’t save.')+' '+(e&&e.message?e.message:''))}

/* ---------- loading ---------- */
function cacheSave(){LS.set(CACHEKEY,{me:S.me,profiles:S.profiles,friendships:S.friendships,rounds:S.rounds,trips:S.trips,tripMembers:S.tripMembers,bets:S.bets,board:S.board,boardPicks:S.boardPicks,expenses:S.expenses,likes:S.likes,comments:S.comments,attests:S.attests})}
function cacheLoad(){const c=LS.get(CACHEKEY,null);if(!c||c.me!==S.me)return false;S.profiles=c.profiles||{};S.friendships=c.friendships||[];S.rounds=c.rounds||{};S.trips=c.trips||[];S.tripMembers=c.tripMembers||{};S.bets=c.bets||{};S.board=c.board||[];S.boardPicks=c.boardPicks||{};S.expenses=c.expenses||{};S.likes=c.likes||{};S.comments=c.comments||{};S.attests=c.attests||{};return true}

async function loadAll(){
 try{
  const {data:prof,error:e1}=await sb.from('profiles').select('id,handle,friend_code').eq('id',S.me).maybeSingle();if(e1)throw e1;
  if(!prof){S.status='setup';return render()}
  const profiles={[S.me]:prof};
  const {data:fr,error:e2}=await sb.from('friendships').select('*');if(e2)throw e2;
  S.friendships=fr||[];
  const others=[...new Set(S.friendships.map(other))];
  if(others.length){const {data:ps,error}=await sb.from('profiles').select('id,handle').in('id',others);if(error)throw error;(ps||[]).forEach(p=>profiles[p.id]=p)}
  const ids=[S.me,...new Set(S.friendships.filter(f=>f.status==='accepted').map(other))];
  const tripMates=await loadTrips(profiles,ids);
  await loadBoard(profiles);
  (S.searchResults||[]).forEach(p=>{if(!profiles[p.id])profiles[p.id]={id:p.id,handle:p.handle}});
  S.profiles=profiles;
  const {data:rs,error:e3}=await sb.from('rounds').select('*').in('user_id',ids).order('date',{ascending:false}).order('created_at',{ascending:false}).limit(1000);if(e3)throw e3;
  const rounds={};ids.forEach(i=>rounds[i]=[]);(rs||[]).forEach(r=>{const x=fromRow(r);(rounds[x.uid]=rounds[x.uid]||[]).push(x)});
  if(tripMates.length&&S.trips.length){
   const from=S.trips.reduce((a,t)=>t.start_date<a?t.start_date:a,'9999'),to=S.trips.reduce((a,t)=>t.end_date>a?t.end_date:a,'0000');
   const {data:tr,error:e4}=await sb.from('rounds').select('*').in('user_id',tripMates).gte('date',from).lte('date',to).limit(1000);
   if(!e4)(tr||[]).forEach(r=>{const x=fromRow(r);(rounds[x.uid]=rounds[x.uid]||[]).push(x)});
  }
  S.rounds=rounds;addPendingLocal();
  await loadSocial(rounds);
  S.status='ready';S.offline=false;cacheSave();
  render();
  flushOutbox();checkInvite();
 }catch(e){
  console.error(e);
  if(cacheLoad()){S.status='ready';S.offline=true;addPendingLocal()}
  else if(S.status==='loading')S.status='error';
  render();
 }
}
// Loads trips, members and bets. Returns trip-mates who aren't friends (their
// trip-dated rounds are fetched separately). If trips.sql hasn't been run yet,
// the rest of the app keeps working and the Trips tab explains what to do.
async function loadTrips(profiles,friendsAndMe){
 try{
  const {data:tm,error:e1}=await sb.from('trip_members').select('trip_id,user_id');if(e1)throw e1;
  const tripIds=[...new Set((tm||[]).map(x=>x.trip_id))];
  let trips=[],bets=[],expenses=[];
  if(tripIds.length){
   const a=await sb.from('trips').select('*').in('id',tripIds);if(a.error)throw a.error;trips=a.data||[];
   const b=await sb.from('bets').select('*').in('trip_id',tripIds).order('created_at');if(b.error)throw b.error;bets=b.data||[];
   const x=await sb.from('expenses').select('*').in('trip_id',tripIds).order('created_at',{ascending:false});
   if(x.error)console.error(x.error);else expenses=x.data||[];
  }
  const exBy={};expenses.forEach(e=>(exBy[e.trip_id]=exBy[e.trip_id]||[]).push({...e,amount:+e.amount}));
  S.expenses=exBy;
  const members={};(tm||[]).forEach(x=>(members[x.trip_id]=members[x.trip_id]||[]).push(x.user_id));
  const betsBy={};bets.forEach(b=>(betsBy[b.trip_id]=betsBy[b.trip_id]||[]).push(b));
  S.trips=trips.sort((x,y)=>y.start_date.localeCompare(x.start_date));S.tripMembers=members;S.bets=betsBy;S.tripsOk=true;
  const mates=[...new Set(Object.values(members).flat())].filter(u=>!friendsAndMe.includes(u));
  const missing=mates.filter(u=>!profiles[u]);
  if(missing.length){const {data:ps}=await sb.from('profiles').select('id,handle').in('id',missing);(ps||[]).forEach(p=>profiles[p.id]=p)}
  return mates;
 }catch(e){
  console.error(e);
  if(e&&(e.code==='42P01'||e.code==='PGRST205'||/does not exist|schema cache/i.test(e.message||'')))S.tripsOk=false;
  else throw e;
  return [];
 }
}
// Likes, comments and attests for every loaded round (fetched 100 rounds at a time).
async function loadSocial(rounds){
 const ids=Object.values(rounds).flat().filter(r=>!r.pending).map(r=>r.id);
 const likes={},comments={},attests={};
 try{
  for(let i=0;i<ids.length;i+=100){
   const chunk=ids.slice(i,i+100);
   const [l,c,a]=await Promise.all([
    sb.from('round_likes').select('round_id,user_id').in('round_id',chunk),
    sb.from('round_comments').select('*').in('round_id',chunk).order('created_at'),
    sb.from('round_attests').select('round_id,user_id').in('round_id',chunk)]);
   for(const x of [l,c,a])if(x.error)throw x.error;
   l.data.forEach(x=>(likes[x.round_id]=likes[x.round_id]||[]).push(x.user_id));
   c.data.forEach(x=>(comments[x.round_id]=comments[x.round_id]||[]).push(x));
   a.data.forEach(x=>(attests[x.round_id]=attests[x.round_id]||[]).push(x.user_id));
  }
  S.likes=likes;S.comments=comments;S.attests=attests;
  const need=[...new Set([...Object.values(likes).flat(),...Object.values(attests).flat(),...Object.values(comments).flat().map(c=>c.user_id)])].filter(u=>!S.profiles[u]);
  if(need.length){const {data}=await sb.from('profiles').select('id,handle').in('id',need);(data||[]).forEach(p=>S.profiles[p.id]=p)}
 }catch(e){console.error(e)}
}
// Loads Betting Board bets the viewer can see, with everyone's picks.
// Like trips, a missing board.sql leaves the rest of the app working.
async function loadBoard(profiles){
 try{
  const {data:bs,error}=await sb.from('board_bets').select('*').order('created_at',{ascending:false}).limit(200);if(error)throw error;
  const ids=(bs||[]).map(b=>b.id);let picks=[];
  if(ids.length){const r=await sb.from('board_picks').select('bet_id,user_id,option').in('bet_id',ids);if(r.error)throw r.error;picks=r.data||[]}
  const by={};picks.forEach(p=>(by[p.bet_id]=by[p.bet_id]||[]).push(p));
  S.board=bs||[];S.boardPicks=by;S.boardOk=true;
  const need=[...new Set([...S.board.map(b=>b.created_by),...picks.map(p=>p.user_id)])].filter(u=>!profiles[u]);
  if(need.length){const {data:ps}=await sb.from('profiles').select('id,handle').in('id',need);(ps||[]).forEach(p=>profiles[p.id]=p)}
 }catch(e){
  console.error(e);
  if(e&&(e.code==='42P01'||e.code==='PGRST205'||/does not exist|schema cache/i.test(e.message||'')))S.boardOk=false;
  else throw e;
 }
}
function addPendingLocal(){
 const mine=S.rounds[S.me]=S.rounds[S.me]||[];
 LS.get(OUTKEY,[]).forEach(row=>{if(!mine.some(r=>r.id===row.id))mine.unshift(fromRow({...row,created_at:new Date().toISOString(),_pending:true}))});
}
let flushing=false;
async function flushOutbox(){
 if(!sb||!S.me||flushing)return;
 let box=LS.get(OUTKEY,[]);if(!box.length)return;
 flushing=true;let posted=0;
 try{
  for(const row of box){
   const {error}=await sb.from('rounds').upsert(row);
   if(error)throw error;
   posted++;box=LS.get(OUTKEY,[]).filter(r=>r.id!==row.id);LS.set(OUTKEY,box);
  }
 }catch(e){if(!isNetErr(e))fail(e,'A saved round didn’t post.')}
 flushing=false;
 if(posted){toast(posted===1?'Round posted':posted+' rounds posted');loadAll()}
}

/* ---------- invites ---------- */
function captureInvite(){
 const m=location.hash.match(/^#invite-([A-Za-z0-9]{4,12})$/);
 if(m){LS.set(INVKEY,m[1].toUpperCase());history.replaceState(null,'',location.pathname+location.search)}
}
async function checkInvite(){
 const code=LS.get(INVKEY,null);if(!code)return;
 LS.set(INVKEY,null);
 if(code===me().friend_code)return;
 const p=await findPlayer(code);
 if(p&&p.id!==S.me&&!isFriend(p.id)){S.invite=p;S.view='friends';render()}
}
async function findPlayer(code){
 const {data,error}=await sb.rpc('find_player',{code});
 if(error){fail(error,'Couldn’t look up that code.');return null}
 return data&&data[0]||null;
}
const inviteUrl=()=>location.origin+location.pathname+'#invite-'+(me().friend_code||'');

/* ---------- rendering ---------- */
function render(){
 const key=S.status+'|'+S.view+'|'+S.arg+'|'+playView+'|'+S.authStep;
 const keep={};
 if(key===lastKey)document.querySelectorAll('#app input:not([type=file]),#app select').forEach(e=>{if(e.id)keep[e.id]=e.value});
 const focus=document.activeElement&&document.activeElement.id;
 let html;
 if(S.status==='auth')html=authView();
 else if(S.status==='setup')html=setupView();
 else if(S.view==='play')html=playHtml();
 else if(S.status==='loading')html=header('Tiger 5')+`<div class="empty"><b>Loading your group…</b>Rounds and friends appear here in a moment.</div>`;
 else if(S.status!=='ready')html=header('Tiger 5')+offlineView();
 else if(S.view==='friends')html=friendsView();
 else if(S.view==='board')html=boardView();
 else if(S.view==='newbet')html=newBetView();
 else if(S.view==='trips')html=tripsView();
 else if(S.view==='newtrip')html=newTripView();
 else if(S.view==='trip')html=tripView(S.arg);
 else if(S.view==='player')html=playerView(S.arg||S.me);
 else if(S.view==='round')html=roundView(S.arg);
 else html=feedView();
 $('#app').innerHTML=html;
 for(const id in keep){const el=document.getElementById(id);if(el)el.value=keep[id]}
 if(focus&&key===lastKey){const el=document.getElementById(focus);if(el&&el.focus)el.focus()}
 if(key!==lastKey)window.scrollTo(0,0);
 if(S.view==='play'&&playView==='start'&&S.status!=='auth'&&S.status!=='setup')syncStart(key!==lastKey);
 lastKey=key;
 renderTabs();
}
function renderTabs(){
 const hide=S.status==='auth'||S.status==='setup';
 const ready=S.status==='ready';
 const badges={friends:ready?incoming().length:0,board:ready?S.board.filter(needsMyPick).length:0};
 const cur=S.view==='player'&&(S.arg||S.me)===S.me?'me':(S.view==='trip'||S.view==='newtrip')?'trips':S.view==='newbet'?'board':(S.view==='round'||S.view==='player')?'':S.view;
 const t=[['feed','Feed'],['play',draft?'Round':'Play'],['trips','Trips'],['board','Board'],['friends','Friends'],['me','Me']];
 $('#tabs').innerHTML=hide?'':`<div>${t.map(([k,l])=>`<button data-nav="${k}" ${cur===k?'aria-current="page"':''}>${l}${badges[k]?`<span class="badge">${badges[k]}</span>`:''}</button>`).join('')}</div>`;
}
function header(title,eyebrow){
 const ready=S.status==='ready';
 return `<header class="top"><div style="min-width:0"><span class="eyebrow">${esc(eyebrow||'Tiger 5')}${S.offline&&ready?' · offline':''}</span><h1>${esc(title)}</h1></div>${ready?`<button class="idx" data-nav="me" aria-label="Your handicap index"><b>${fmtIdx(myIndex())}</b><span>Index</span></button>`:''}</header>`;
}
const av=(id)=>`<span class="av" style="background:${avColor(id)}" aria-hidden="true">${esc(initials(handle(id)))}</span>`;

function offlineView(){
 const msg=!configured?'This copy isn’t connected to a database yet. Add your Supabase details to config.js (see README.md).'
  :!window.supabase?'You’re offline and the app hasn’t been opened online on this phone yet. Connect once to sign in.'
  :'Your scores didn’t load. Check your connection and reload.';
 return `<div class="card note"><p style="margin:0">${msg}</p></div><button class="primary wide" data-nav="play">Keep score anyway</button>`;
}
function authView(){
 const up=S.authStep==='signup';
 return `${header(up?'Create account':'Sign in','Tiger 5')}
 <div class="card"><p style="margin-top:0">Track your score, your handicap index and the five mistakes that cost you strokes, and see your friends’ rounds.</p>
 <div class="seg" style="margin-bottom:4px"><button data-act="authmode" data-m="signin" aria-pressed="${!up}">Sign in</button><button data-act="authmode" data-m="signup" aria-pressed="${up}">Create account</button></div>
 <label for="email">Email</label><input id="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com" value="${esc(S.authEmail)}">
 <label for="pw">Password</label><input id="pw" type="password" autocomplete="${up?'new-password':'current-password'}" placeholder="${up?'At least 8 characters':''}">
 ${up?`<label for="pw2">Confirm password</label><input id="pw2" type="password" autocomplete="new-password">`:''}
 <button class="primary wide" style="margin-top:14px" data-act="${up?'signup':'signin'}" ${S.busy?'disabled':''}>${S.busy?'One moment…':up?'Create account':'Sign in'}</button>
 ${up?'':`<p class="hint">Forgot your password? Ask whoever invited you to reset your account.</p>`}
 </div>${LS.get(INVKEY,null)?`<p class="sub">You were invited by a friend. ${up?'Create an account':'Sign in'} and we’ll connect you.</p>`:''}`;
}
function setupView(){
 return `${header('Welcome','Tiger 5')}
 <div class="card"><label for="handle">Your name in the app</label><input id="handle" maxlength="30" autocomplete="nickname" placeholder="e.g. Alec C.">
 <p class="hint">This is how friends will see you.</p>
 <button class="primary wide" style="margin-top:14px" data-act="join" ${S.busy?'disabled':''}>Continue</button></div>`;
}

function allFeedRounds(){
 return [S.me,...friendIds()].flatMap(id=>S.rounds[id]||[]).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.at||0)-(a.at||0));
}
// Per-hole extras (beers, GB) added up for a round.
const holeSum=(r,k)=>(r.holes||[]).reduce((a,h)=>a+(+h[k]||0),0);
const extrasTags=(r)=>{const b=holeSum(r,'beer'),g=holeSum(r,'gb');return (b?`<span class="tag gold">🍺 ${b}</span>`:'')+(g?`<span class="tag">💨 GB ${g}</span>`:'')};
// Round rating from Tiger 5 misses. Trophies: 0 → three, 1 → two, 2–3 → one
// (finished rounds only, so a few clean holes don't earn them).
// Poo: 4–7 → one, 8–10 → two, 11+ → three.
const pooCount=(t5)=>t5>=11?3:t5>=8?2:t5>=4?1:0;
const trophyCount=(t5)=>t5===0?3:t5===1?2:t5<=3?1:0;
function rateBadge(r){
 const t5=r.t5;
 if(r.complete&&trophyCount(t5)){const n=trophyCount(t5);return `<span class="tag trophy" role="img" aria-label="Trophy rating ${n} of 3: ${t5} Tiger 5 misses" title="${t5} Tiger 5 miss${t5===1?'':'es'}">${'🏆'.repeat(n)}</span>`}
 const n=pooCount(t5);if(!n)return '';
 return `<span class="tag poo" role="img" aria-label="Poo rating ${n} of 3: ${t5} Tiger 5 misses" title="${t5} Tiger 5 misses">${'💩'.repeat(n)}</span>`;
}
const relDay=(s)=>{const n=Math.round((new Date(today()+'T12:00:00')-new Date(s+'T12:00:00'))/864e5);return n===0?'Today':n===1?'Yesterday':n>1&&n<7?n+' days ago':fmtDate(s)};
const FLAG='<svg class="flag" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 21V3l10 4-10 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="7" cy="21" rx="5" ry="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const namesList=(ids)=>{const n=ids.map(u=>u===S.me?'you':handle(u));return n.length<=2?n.join(' & '):n.slice(0,2).join(', ')+' +'+(n.length-2)};
// Feed card: who/when, course, four stat circles colored good / so-so / rough, badges, then Like · Comment · Attest.
function feedCard(r){
 const mine=r.uid===S.me,ix=hcp(S.rounds[r.uid]).index;
 const likes=S.likes[r.id]||[],coms=S.comments[r.id]||[],att=S.attests[r.id]||[];
 const good='var(--green)',ok='var(--gold)',bad='var(--red)',none='var(--line)';
 const p18=r.putts!=null&&r.holesPlayed?r.putts/r.holesPlayed*18:null;
 const rings=[
  ['Score',r.score,r.complete?rel(r.score-r.parPlayed):r.holesPlayed+' holes',r.diff==null?none:ix==null?ok:r.diff<=ix?good:r.diff<=ix+3?ok:bad],
  ['Putts',r.putts==null?'–':r.putts,r.putts==null?'not tracked':(p18/18).toFixed(1)+'/hole',p18==null?none:p18<=32?good:p18<=36?ok:bad],
  ['Tiger 5',r.t5,'misses',r.t5<=3?good:r.t5<=7?ok:bad],
  ['Diff',fmtDiff(r.diff),r.diff==null?'not rated':'differential',r.diff==null?none:ix==null?ok:r.diff<=ix?good:r.diff<=ix+3?ok:bad]];
 const key=esc(r.uid)+'/'+esc(r.id);
 return `<article class="card fcard">
 <button class="fmain" data-round="${key}" aria-label="Open ${esc(mine?'your':handle(r.uid)+'’s')} round at ${esc(r.course)}">
  <div class="fhead">${av(r.uid)}<div class="mid"><b>${esc(mine?'You':handle(r.uid))}${ix!=null?` <span class="fidx">${fmtIdx(ix)}</span>`:''}</b></div><span class="fwhen">${relDay(r.date)}</span></div>
  <div class="fcourse">${FLAG}<span>${esc(r.course)}</span></div>
  <div class="ftee">${[r.tee?esc(r.tee)+' tees':'',r.n===9?(r.nine==='back'?'Back 9':'Front 9'):''].filter(Boolean).join(' · ')}</div>
  <div class="rings">${rings.map(([l,v,s,c])=>`<div class="ring"><span class="rl">${l}</span><b style="--ring:${c}">${v}</b><small>${s}</small></div>`).join('')}</div>
  <div class="tags">${rateBadge(r)}${extrasTags(r)}${att.length?`<span class="tag">✋ Attested by ${esc(namesList(att))}</span>`:''}${r.pending?'<span class="tag red">Waiting to post</span>':''}</div>
 </button>
 ${r.pending?'':`<div class="factions">
  <button data-like="${esc(r.id)}" aria-pressed="${likes.includes(S.me)}">👍 <span>${likes.length?likes.length+' ':''}Like${likes.length===1||!likes.length?'':'s'}</span></button>
  <button data-comments="${key}">💬 <span>${coms.length?coms.length+' ':''}Comment${coms.length===1||!coms.length?'':'s'}</span></button>
  ${mine?'':`<button data-attest="${esc(r.id)}" aria-pressed="${att.includes(S.me)}">✋ <span>${att.includes(S.me)?'Attested':'Attest'}</span></button>`}
 </div>`}
 </article>`;
}
function roundItem(r,showWho=true){
 if(showWho)return feedCard(r);
 return `<button class="card item" data-round="${esc(r.uid)}/${esc(r.id)}">
  ${showWho?av(r.uid):''}
  <div class="mid"><b>${showWho?esc(r.uid===S.me?'You':handle(r.uid))+' · ':''}${esc(r.course)}</b>
  <span>${fmtDate(r.date)}${r.n===9?' · 9 holes':''}${r.tee?' · '+esc(r.tee):''}</span>
  <div class="tags">${rateBadge(r)}<span class="tag ${r.t5>=Math.round(r.n/2)?'red':''}">Tiger 5 misses ${r.t5}</span>${r.diff!=null?`<span class="tag gold">Diff ${fmtDiff(r.diff)}</span>`:''}${extrasTags(r)}${r.pending?'<span class="tag red">Waiting to post</span>':''}</div></div>
  <div class="score"><b>${r.score}</b><span>${r.complete?rel(r.score-r.parPlayed):r.holesPlayed+' holes'}</span></div></button>`;
}
function feedView(){
 const rs=allFeedRounds().slice(0,80);
 let h=header('Feed');
 const inc=incoming().length;
 if(inc)h+=`<button class="card item note" data-nav="friends"><div class="mid"><b>${inc} friend request${inc>1?'s':''}</b><span>Tap to review</span></div></button>`;
 const waiting=S.board.filter(needsMyPick).length;
 if(waiting)h+=`<button class="card item note" data-nav="board"><div class="mid"><b>${waiting} bet${waiting>1?'s':''} waiting for your pick</b><span>On the Betting Board</span></div><span class="tag gold">Pick</span></button>`;
 S.trips.filter(t=>tripStatus(t)==='live').forEach(t=>h+=`<button class="card item note" data-trip="${esc(t.id)}"><div class="mid"><b>${esc(t.name)}</b><span>Trip happening now · ${(S.bets[t.id]||[]).length} bets</span></div><span class="tag gold">Leaderboards</span></button>`);
 if(draft)h+=`<button class="card item" data-nav="play"><div class="mid"><b>Round in progress</b><span>${esc(draft.course)}</span></div><span class="tag">Resume</span></button>`;
 if(!rs.length)h+=`<div class="card empty"><b>No posted rounds yet</b>Play a round and post it, or add friends to see theirs here.<div class="row" style="margin-top:14px"><button class="primary" data-nav="play">Start a round</button><button data-nav="friends">Add friends</button></div></div>`;
 else h+=rs.map(r=>roundItem(r)).join('');
 return h;
}

// The friend button for any other player: Add, Accept, Requested or Friends.
function friendAction(id,addLabel){
 if(id===S.me)return '';
 if(isFriend(id))return `<span class="tag">Friends</span>`;
 if(outgoing().includes(id))return `<span class="tag gold">Requested</span>`;
 if(incoming().includes(id))return `<button class="primary" data-act="accept" data-id="${esc(id)}">Accept</button>`;
 return `<button class="primary" data-act="add" data-id="${esc(id)}">${addLabel||'Add'}</button>`;
}
function searchResults(){
 const r=S.searchResults;if(!r)return '';
 if(!r.length)return `<p class="hint">No players found. Names need at least 3 letters; emails must be the full address. If they haven’t joined yet, send them your invite link.</p>`;
 return r.map(p=>`<div class="item" style="padding:8px 0;border-top:1px solid var(--line)">${av(p.id)}<div class="mid"><b>${esc(p.handle)}</b></div>${friendAction(p.id)}</div>`).join('');
}
async function searchPlayers(){
 const q=$('#fsearch').value.trim();
 if(!q)return toast('Type a name, email or friend code.');
 if(q.length<3&&!q.includes('@'))return toast('Type at least 3 letters of their name.');
 if(q.toUpperCase()===me().friend_code)return toast('That’s your own code.');
 S.searching=true;render();
 const {data,error}=await sb.rpc('search_players',{q});
 S.searching=false;
 if(error){fail(error,'Search didn’t work.');return render()}
 (data||[]).forEach(p=>{if(!S.profiles[p.id])S.profiles[p.id]={id:p.id,handle:p.handle}});
 S.searchResults=data||[];render();
}
function friendsView(){
 let h=header('Friends');
 const inc=incoming(),out=outgoing(),fr=friendIds();
 if(S.invite)h+=`<div class="card note item">${av(S.invite.id)}<div class="mid"><b>${esc(S.invite.handle)}</b><span>Invited you to be friends</span></div><button class="primary" data-act="addinvite">Add</button><button class="link" data-act="dropinvite">Not now</button></div>`;
 if(inc.length){h+=`<h2>Requests</h2>`;inc.forEach(id=>h+=`<div class="card item">${av(id)}<div class="mid"><b>${esc(handle(id))}</b><span>Wants to share scores with you</span></div><button class="primary" data-act="accept" data-id="${esc(id)}">Accept</button><button class="link" data-act="unfriend" data-id="${esc(id)}">Ignore</button></div>`)}
 h+=`<h2>Find friends</h2><div class="card">
  <label for="fsearch" style="margin-top:0">Search by name, email or friend code</label>
  <div class="row"><input id="fsearch" type="search" maxlength="100" autocapitalize="none" autocomplete="off" placeholder="e.g. Jonathan or jon@example.com"><button style="flex:none" data-act="search" ${S.searching?'disabled':''}>${S.searching?'Searching…':'Search'}</button></div>
  ${searchResults()}</div>`;
 h+=`<h2>Invite friends</h2><div class="card"><p style="margin-top:0">Not using the app yet? Send your invite link. Friends can also search for your code.</p>
  <div class="row"><span class="code">${esc(me().friend_code||'——')}</span><button class="primary" data-act="share">Share invite link</button></div></div>`;
 h+=`<h2>Handicap standings</h2>`;
 const st=[S.me,...fr].map(id=>({id,h:hcp(S.rounds[id]),n:(S.rounds[id]||[]).length})).sort((a,b)=>(a.h.index==null)-(b.h.index==null)||(a.h.index||0)-(b.h.index||0));
 h+=`<div class="card"><table><thead><tr><th>Player</th><th class="n">Rounds</th><th class="n">Index</th></tr></thead><tbody>${st.map((s,i)=>`<tr><td><button class="link plain" style="color:var(--ink);text-decoration:none;font-weight:600" data-player="${esc(s.id)}">${i+1}. ${esc(s.id===S.me?'You':handle(s.id))}</button></td><td class="n" style="font-weight:400">${s.n}</td><td class="n">${fmtIdx(s.h.index)}</td></tr>`).join('')}</tbody></table>${fr.length?'':`<p class="hint">Add friends to compare handicaps.</p>`}</div>`;
 if(fr.length){h+=`<h2>Your friends</h2>`;fr.forEach(id=>{const x=hcp(S.rounds[id]);h+=`<div class="card item"><button class="item plain" data-player="${esc(id)}">${av(id)}<div class="mid"><b>${esc(handle(id))}</b><span>Index ${fmtIdx(x.index)} · ${(S.rounds[id]||[]).length} rounds</span></div></button>${S.confirm==='rm:'+id?`<button data-act="unfriend" data-id="${esc(id)}">Remove</button><button class="link" data-act="cancelc">Keep</button>`:`<button class="link" data-act="ask" data-c="rm:${esc(id)}">Remove</button>`}</div>`})}
 if(out.length){h+=`<h2>Waiting on them</h2>`;out.forEach(id=>h+=`<div class="card item">${av(id)}<div class="mid"><b>${esc(handle(id))}</b><span>Request sent</span></div><button class="link" data-act="unfriend" data-id="${esc(id)}">Cancel</button></div>`)}
 return h;
}

function diffChart(x){
 const rs=[...x.rs].reverse();if(!rs.length)return'';
 const W=320,H=110,pad=18,bw=(W-pad)/20;
 const vals=rs.map(r=>r.diff),hi=Math.max(...vals,1),lo=Math.min(0,...vals);
 const y=(v)=>8+(H-26)*(1-(v-lo)/(hi-lo||1));
 let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Last ${rs.length} score differentials, oldest to newest">`;
 s+=`<line x1="${pad}" x2="${W}" y1="${y(lo)}" y2="${y(lo)}" stroke="var(--line)"/><text x="0" y="${y(hi)+4}" font-size="10" fill="var(--mute)">${hi.toFixed(0)}</text><text x="0" y="${y(lo)+4}" font-size="10" fill="var(--mute)">${lo.toFixed(0)}</text>`;
 if(x.index!=null)s+=`<line x1="${pad}" x2="${W}" y1="${y(x.index)}" y2="${y(x.index)}" stroke="var(--gold)" stroke-dasharray="4 3"/>`;
 rs.forEach((r,i)=>{const used=x.used.has(r.id),top=y(Math.max(r.diff,lo)),base=y(lo);s+=`<rect x="${pad+i*bw+2}" y="${Math.min(top,base-2)}" width="${bw-4}" height="${Math.max(2,base-top)}" rx="2" fill="${used?'var(--green)':'var(--line)'}"/>`});
 return s+`<text x="${pad}" y="${H-2}" font-size="10" fill="var(--mute)">oldest</text><text x="${W}" y="${H-2}" font-size="10" fill="var(--mute)" text-anchor="end">newest</text></svg>`;
}
function playerView(id){
 const mineView=id===S.me;
 if(!mineView&&!isFriend(id))return header(handle(id),'Player')+`<div class="card empty"><b>Scores are shared between friends</b>Add ${esc(handle(id))} as a friend to see all their rounds.<div style="margin-top:14px">${friendAction(id,'Add friend')}</div></div>`;
 const rounds=S.rounds[id]||[],x=hcp(rounds);
 let h=header(mineView?'Your card':handle(id),mineView?'Tiger 5':'Friend');
 if(mineView){
  h+=S.editName?`<div class="card"><label for="newname">Your name in the app</label><input id="newname" maxlength="30" value="${esc(me().handle||'')}"><div class="row" style="margin-top:10px"><button class="primary" data-act="savename">Save</button><button data-act="cancelname">Cancel</button></div></div>`
   :`<p class="sub">Playing as <b>${esc(me().handle||'')}</b> · <button class="link" data-act="editname">Change name</button> · <button class="link" data-act="signout">Sign out</button></p>`;
 }
 const complete=rounds.filter(r=>r.complete),holes=complete.reduce((a,r)=>a+r.n,0);
 const t5per18=holes?complete.reduce((a,r)=>a+r.t5,0)/holes*18:null;
 const f18=complete.filter(r=>r.n===18);
 h+=`<div class="card big"><div><b>${fmtIdx(x.index)}</b><span>Handicap index</span></div><div><b>${f18.length?Math.round(f18.reduce((a,r)=>a+r.score,0)/f18.length):'—'}</b><span>Avg 18-hole score</span></div><div><b>${t5per18==null?'—':t5per18.toFixed(1)}</b><span>Tiger 5 misses per 18</span></div></div>`;
 if(x.index==null)h+=`<p class="sub">${x.rs.length?`${x.need} more rated round${x.need>1?'s':''} until ${mineView?'your':'their'} index is set.`:'Post 3 complete rounds with a course rating and slope to get an index.'}</p>`;
 if(x.rs.length)h+=`<div class="card"><b>Last ${x.rs.length} differentials</b>${diffChart(x)}<p class="hint" style="margin-top:4px">${x.index!=null?`Green bars are the ${x.take} lowest; they set the index (dashed line).`:'Differentials so far.'}</p></div>`;
 if(holes){
  h+=`<h2>Where the strokes go</h2><div class="card"><table>`;
  RULES.forEach(r=>{const c=complete.reduce((a,z)=>a+((z.per&&z.per[r.k])||0),0)/holes*18;h+=`<tr><td>${r.n}<div class="bar"><i style="width:${Math.min(100,c/3*100)}%"></i></div></td><td class="n">${c.toFixed(1)}</td></tr>`});
  h+=`</table><p class="hint">Average misses per 18 holes.</p></div>`;
 }
 if(mineView){const old=oldRounds();if(old.length)h+=`<div class="card note"><b>${old.length} round${old.length>1?'s':''} saved on this phone</b><p style="margin:4px 0 10px">These are from the old version of the app. Post them to your card so they count.</p><button class="primary" data-act="import" ${S.busy?'disabled':''}>Post ${old.length} round${old.length>1?'s':''}</button></div>`}
 h+=`<h2>Rounds</h2>`;
 h+=rounds.length?rounds.map(r=>roundItem(r,false)).join(''):`<div class="card empty"><b>No rounds yet</b>${mineView?'Tap Play to start your first one.':'Nothing posted yet.'}</div>`;
 return h;
}

function roundView(key){
 const [u,rid]=(key||'').split('/');
 const r=(S.rounds[u]||[]).find(z=>z.id===rid);
 if(!r)return header('Round')+`<div class="card empty"><b>Round not found</b>It may have been deleted.</div>`;
 const mine=u===S.me,x=hcp(S.rounds[u]);
 let h=header(r.course,(mine?'You':handle(u))+' · '+fmtDate(r.date));
 h+=`<p class="sub">${r.tee?esc(r.tee)+' tees · ':''}${r.rating?`${r.rating}/${r.slope}`:'No rating'}${r.n===9?' · 9 holes':''}${x.used.has(r.id)?' · <span class="tag">Counts toward index</span>':''}</p>`;
 h+=`<div class="card big"><div><b>${r.score}</b><span>${r.complete?rel(r.score-r.parPlayed)+' to par':r.holesPlayed+' holes'}</span></div><div><b>${r.net!=null?r.net:'—'}</b><span>Net${r.ch!=null?` (CH ${r.ch})`:''}</span></div><div><b>${fmtDiff(r.diff)}</b><span>Differential</span></div><div><b>${r.t5}</b><span>Tiger 5</span></div></div>`;
 const hs=r.holes||[],start=r.nine==='back'?10:1;
 const rows=(from,to)=>{const sl=hs.slice(from,to);if(!sl.length)return'';const sum=(f)=>sl.reduce((a,h)=>a+(f(h)||0),0);
  return `<div class="scroll" style="margin-bottom:8px"><table class="sc"><tr><th>Hole</th>${sl.map((_,i)=>`<th>${start+from+i}</th>`).join('')}<th>Tot</th></tr>
  <tr><td>Par</td>${sl.map(h=>`<td>${h.par}</td>`).join('')}<td>${sum(h=>h.par)}</td></tr>
  <tr><td>Score</td>${sl.map(h=>`<td class="${fails(h).length?'miss':played(h)&&h.score<h.par?'u':''}">${played(h)?h.score:'–'}</td>`).join('')}<td><b>${sum(h=>h.score)}</b></td></tr>
  <tr><td>Putts</td>${sl.map(h=>`<td>${played(h)&&h.putts!=null?h.putts:'–'}</td>`).join('')}<td>${sl.some(h=>played(h)&&h.putts!=null)?sum(h=>played(h)?h.putts:0):'–'}</td></tr>
  ${holeSum(r,'beer')?`<tr><td>Beers</td>${sl.map(h=>`<td>${h.beer||''}</td>`).join('')}<td>${sum(h=>h.beer)}</td></tr>`:''}
  ${holeSum(r,'gb')?`<tr><td>GB 💨</td>${sl.map(h=>`<td>${h.gb||''}</td>`).join('')}<td>${sum(h=>h.gb)}</td></tr>`:''}</table></div>`};
 h+=`<div class="card">${rows(0,9)}${rows(9,18)}<p class="hint" style="margin:0">Red holes broke a Tiger 5 rule. Green holes were under par.</p></div>`;
 h+=`<h2>Tiger 5</h2><div class="card"><table>`;
 RULES.forEach(q=>{const c=(r.per&&r.per[q.k])||0;h+=`<tr><td>${q.n}<div class="bar"><i style="width:${r.holesPlayed?Math.min(100,c/r.holesPlayed*300):0}%"></i></div></td><td class="n">${c}</td></tr>`});
 h+=`</table></div>`;
 if(!r.pending){
  const likes=S.likes[r.id]||[],att=S.attests[r.id]||[],coms=S.comments[r.id]||[];
  h+=`<div class="factions" style="margin:4px 0 10px">
   <button data-like="${esc(r.id)}" aria-pressed="${likes.includes(S.me)}">👍 <span>${likes.includes(S.me)?'Liked':'Like'}</span></button>
   ${mine?'':`<button data-attest="${esc(r.id)}" aria-pressed="${att.includes(S.me)}">✋ <span>${att.includes(S.me)?'Attested':'Attest score'}</span></button>`}
  </div>`;
  if(likes.length||att.length)h+=`<p class="hint" style="margin:0 0 10px">${likes.length?'👍 Liked by '+esc(namesList(likes)):''}${likes.length&&att.length?' · ':''}${att.length?'✋ Attested by '+esc(namesList(att)):''}</p>`;
  if(!att.length&&!mine)h+=`<p class="hint" style="margin:-4px 0 10px">Played with ${esc(handle(u))}? Attest to vouch for the score.</p>`;
  h+=`<h2 id="comments">Comments${coms.length?' ('+coms.length+')':''}</h2><div class="card">`;
  h+=coms.length?coms.map(c=>`<div class="comment">${av(c.user_id)}<div class="mid"><b>${esc(c.user_id===S.me?'You':handle(c.user_id))}</b> <span class="hint" style="margin:0">${relDay(c.created_at.slice(0,10))}</span><p>${esc(c.body)}</p></div>${c.user_id===S.me||mine?`<button class="link" data-delcomment="${esc(c.id)}" data-rid="${esc(r.id)}" aria-label="Delete comment">Delete</button>`:''}</div>`).join(''):`<p class="hint" style="margin:0 0 6px">No comments yet. Say something nice. Or don’t.</p>`;
  h+=`<div class="row" style="margin-top:8px"><input id="cbody" maxlength="500" placeholder="Add a comment…" autocomplete="off"><button class="primary" style="flex:none" data-act="postcomment" data-id="${esc(r.id)}" ${S.busy?'disabled':''}>Post</button></div></div>`;
 }
 if(mine&&!r.pending)h+=S.confirm==='del'?`<div class="card note"><p style="margin-top:0">Delete this round for good? It also comes off your handicap.</p><div class="row"><button class="danger" data-act="delround" data-id="${esc(r.id)}">Delete round</button><button data-act="cancelc">Keep it</button></div></div>`:`<button class="wide" data-act="ask" data-c="del">Delete round</button>`;
 return h;
}

/* ---------- trips and side bets ---------- */
// Bets are settled from finished rounds posted inside the trip's dates.
// "low" means the lowest value wins. Money is only tracked, never moved.
const BET_KINDS={
 putts:{label:'Fewest putts',low:true,val:r=>r.putts},
 gross:{label:'Lowest total score',low:true,val:r=>r.score},
 net:{label:'Lowest net score',low:true,val:r=>r.net},
 t5:{label:'Fewest Tiger 5 misses',low:true,val:r=>r.t5},
 birdies:{label:'Most birdies',low:false,val:r=>(r.holes||[]).filter(h=>played(h)&&h.score<h.par).length},
 three_putts:{label:'Fewest 3-putts',low:true,val:r=>(r.holes||[]).filter(h=>played(h)&&h.putts>=3).length},
 best_round:{label:'Best single round',low:true,single:true},
 custom:{label:'Custom bet (pick the winner)',manual:true}
};
const fmtMoney=(n)=>{const v=Math.round(Math.abs(n)*100)/100;return '$'+(v%1?v.toFixed(2):v.toFixed(0))};
const fmtRange=(t)=>t.start_date===t.end_date?fmtDate(t.start_date):fmtDate(t.start_date)+' – '+fmtDate(t.end_date);
const tripStatus=(t)=>{if(t.ended_at)return 'done';const d=today();return d<t.start_date?'upcoming':d>t.end_date?'done':'live'};
const tripRounds=(t,uid)=>(S.rounds[uid]||[]).filter(r=>r.complete&&r.date>=t.start_date&&r.date<=t.end_date);
const curTrip=()=>S.trips.find(x=>x.id===S.arg);

function betStandings(t,bet){
 const k=BET_KINDS[bet.kind]||BET_KINDS.custom,mem=S.tripMembers[t.id]||[];
 const rows=mem.map(uid=>{
  let rs=tripRounds(t,uid);
  if(k.single){const f=rs.filter(r=>r.n===18);return{uid,n:f.length,v:f.length?Math.min(...f.map(r=>r.score)):null}}
  if(bet.kind==='net')rs=rs.filter(r=>r.net!=null);
  // Rounds without putts on every hole can't count toward putting bets.
  if(bet.kind==='putts'||bet.kind==='three_putts')rs=rs.filter(r=>(r.holes||[]).filter(played).every(h=>h.putts!=null));
  if(!rs.length)return{uid,n:0,v:null};
  const sum=rs.reduce((a,r)=>a+(k.val(r)||0),0),holes=rs.reduce((a,r)=>a+r.n,0);
  return{uid,n:rs.length,v:bet.scoring==='avg'?Math.round(sum/holes*18*10)/10:sum};
 });
 const ranked=rows.filter(r=>r.v!=null).sort((a,b)=>k.low?a.v-b.v:b.v-a.v);
 const best=ranked.length?ranked[0].v:null;
 return{ranked,none:rows.filter(r=>r.v==null),leaders:best==null?[]:ranked.filter(r=>r.v===best).map(r=>r.uid),
  uneven:!k.single&&bet.scoring==='total'&&new Set(ranked.map(r=>r.n)).size>1};
}
function betWinners(t,bet){
 const mem=S.tripMembers[t.id]||[];
 return bet.kind==='custom'?(bet.winners||[]).filter(u=>mem.includes(u)):betStandings(t,bet).leaders;
}
// Every player puts the stake into each bet's pot; winners split the pot.
// Returns each player's net and the fewest payments that square everyone up.
// Splits an amount into cents as evenly as possible (the first people absorb any leftover cent).
function splitCents(amount,people){
 const cents=Math.round(amount*100),base=Math.floor(cents/people.length),extra=cents-base*people.length,out={};
 people.forEach((u,i)=>out[u]=(base+(i<extra?1:0))/100);
 return out;
}
// What each player spent and owes on shared expenses. Only current trip players count.
function expenseTotals(t){
 const mem=S.tripMembers[t.id]||[],paid={},share={};mem.forEach(u=>{paid[u]=0;share[u]=0});
 (S.expenses[t.id]||[]).forEach(e=>{
  const split=(e.split_among||[]).filter(u=>mem.includes(u));if(!split.length||!mem.includes(e.paid_by))return;
  paid[e.paid_by]+=e.amount;
  const s=splitCents(e.amount,split);for(const u in s)share[u]+=s[u];
 });
 return{paid,share};
}
// Bets and receipts settle separately: each returns everyone's net and the
// fewest payments that square that ledger.
function settleBets(t){
 const mem=S.tripMembers[t.id]||[],net={};mem.forEach(u=>net[u]=0);
 (S.bets[t.id]||[]).forEach(b=>{
  const w=betWinners(t,b),stake=+b.stake||0;if(!w.length||!stake)return;
  mem.forEach(u=>net[u]-=stake);
  const share=stake*mem.length/w.length;w.forEach(u=>net[u]+=share);
 });
 return{net,pays:fewestPayments(net)};
}
function settleReceipts(t){
 const mem=S.tripMembers[t.id]||[],ex=expenseTotals(t),net={};
 mem.forEach(u=>net[u]=Math.round((ex.paid[u]-ex.share[u])*100)/100);
 return{net,pays:fewestPayments(net)};
}
function fewestPayments(net){
 const cred=[],debt=[];
 for(const u in net){const v=Math.round(net[u]*100)/100;if(v>0)cred.push({u,v});else if(v<0)debt.push({u,v:-v})}
 cred.sort((a,b)=>b.v-a.v);debt.sort((a,b)=>b.v-a.v);
 const pays=[];let i=0,j=0;
 while(i<debt.length&&j<cred.length){
  const x=Math.min(debt[i].v,cred[j].v);
  if(x>=0.01)pays.push({from:debt[i].u,to:cred[j].u,amt:Math.round(x*100)/100});
  debt[i].v-=x;cred[j].v-=x;if(debt[i].v<0.005)i++;if(cred[j].v<0.005)j++;
 }
 return pays;
}

function tripsView(){
 let h=header('Trips');
 if(!S.tripsOk)return h+`<div class="card note"><b>Trips need one more database step</b><p style="margin:4px 0 0">Run <b>supabase/trips.sql</b> in the Supabase SQL Editor, then reopen the app.</p></div>`;
 h+=`<button class="primary wide" style="margin-bottom:14px" data-nav="newtrip">Plan a trip</button>`;
 if(!S.trips.length)return h+`<div class="card empty"><b>No trips yet</b>Create a trip, add your friends, and set side bets like fewest putts. Rounds posted during the trip count automatically.</div>`;
 const done=S.trips.filter(t=>tripStatus(t)==='done'),active=S.trips.filter(t=>tripStatus(t)!=='done'),showDone=S.tripsFilter==='done';
 h+=`<div class="ttabs" style="grid-template-columns:1fr 1fr" role="tablist" aria-label="Trips"><button role="tab" data-tfilter="active" aria-selected="${!showDone}">Current trips${active.length?`<span class="cnt">${active.length}</span>`:''}</button><button role="tab" data-tfilter="done" aria-selected="${showDone}">Completed trips${done.length?`<span class="cnt">${done.length}</span>`:''}</button></div>`;
 const list=showDone?done:active;
 if(!list.length)return h+`<div class="card empty"><b>${showDone?'No completed trips yet':'No current trips'}</b>${showDone?'Trips show up here once they’re over or the organizer ends them.':'Plan one above.'}</div>`;
 list.forEach(t=>{
  const st=tripStatus(t),mem=S.tripMembers[t.id]||[],nb=(S.bets[t.id]||[]).length;
  h+=`<button class="card item" data-trip="${esc(t.id)}"><div class="mid"><b>${esc(t.name)}</b><span>${fmtRange(t)} · ${mem.length} player${mem.length===1?'':'s'} · ${nb} bet${nb===1?'':'s'}</span></div><span class="tag ${st==='live'?'gold':''}">${st==='live'?'Happening now':st==='upcoming'?'Upcoming':'Completed'}</span></button>`;
 });
 return h;
}
function newTripView(){
 const fr=friendIds(),end=new Date();end.setDate(end.getDate()+3);
 return header('Plan a trip','Trips')+`<div class="card">
 <label for="tname">Trip name</label><input id="tname" maxlength="60" placeholder="e.g. Myrtle Beach 2026">
 <div class="row"><div><label for="tstart">First day</label><input type="date" id="tstart" value="${today()}"></div><div><label for="tend">Last day</label><input type="date" id="tend" value="${isoDate(end)}"></div></div>
 <label>Who’s going</label>
 ${fr.length?`<div class="pick">${fr.map(id=>`<button data-tsel="${esc(id)}" aria-pressed="${S.tripSel.includes(id)}">${esc(handle(id))}</button>`).join('')}</div><p class="hint">You’re included automatically. Only friends can be added; you can add more later.</p>`
  :`<p class="hint">Add friends on the Friends tab first, then invite them here.</p>`}
 <button class="primary wide" style="margin-top:14px" data-act="createtrip" ${S.busy?'disabled':''}>Create trip</button></div>`;
}
function tripView(id){
 const t=S.trips.find(x=>x.id===id);
 if(!t)return header('Trip','Trips')+`<div class="card empty"><b>Trip not found</b>It may have been deleted, or you were removed from it.</div>`;
 const mem=S.tripMembers[t.id]||[],owner=t.created_by===S.me,st=tripStatus(t),bets=S.bets[t.id]||[];
 const who=(u)=>u===S.me?'You':handle(u);
 let h=header(t.name,fmtRange(t));
 // One section at a time, picked from a row of buttons (remembered per trip).
 const tab=S.tripTabs[t.id]||'bets',exN=(S.expenses[t.id]||[]).length;
 const rs=mem.flatMap(u=>tripRounds(t,u)).sort((a,b)=>b.date.localeCompare(a.date)||(b.at||0)-(a.at||0));
 const tabs=[['bets','Bets',bets.length],['receipts','Receipts',exN],['rounds','Rounds',rs.length],['players','Players',mem.length]];
 // Ending a trip: the organizer can end it early (later rounds stop counting and settle-up is final).
 if(st==='done')h+=`<div class="card note item" style="margin-bottom:12px"><div class="mid"><b>Trip completed</b><span>${t.ended_at?'Ended '+fmtDate(t.end_date)+'. ':''}Bets and settle-ups are final.</span></div>${owner&&t.ended_at?`<button data-act="reopentrip">Reopen</button>`:''}</div>`;
 else if(owner)h+=S.confirm==='endtrip'?`<div class="card note" style="margin-bottom:12px"><p style="margin-top:0">End the trip now? Rounds posted after today won’t count toward bets, and settle-ups become final.</p><div class="row"><button class="danger" data-act="endtrip">End trip</button><button data-act="cancelc">Not yet</button></div></div>`
  :`<button class="wide" style="margin-bottom:12px" data-act="ask" data-c="endtrip">End trip</button>`;
 h+=`<div class="ttabs" role="tablist" aria-label="Trip sections">${tabs.map(([k,l,n])=>`<button role="tab" data-ttab="${k}" aria-selected="${tab===k}">${l}${n?`<span class="cnt">${n}</span>`:''}</button>`).join('')}</div>`;

 if(tab==='bets'){
 if(!bets.length)h+=`<div class="card empty"><b>No bets yet</b>Add one below. Leaderboards fill in from finished rounds posted ${fmtRange(t)}.</div>`;
 bets.forEach(b=>{
  const k=BET_KINDS[b.kind]||BET_KINDS.custom,stake=+b.stake||0;
  h+=`<div class="card"><div class="bet-head"><b>${esc(b.name)}</b><span class="money">${stake?fmtMoney(stake)+' each · '+fmtMoney(stake*mem.length)+' pot':'Bragging rights'}</span></div>`;
  if(k.manual){
   const w=(b.winners||[]).filter(u=>mem.includes(u));
   h+=`<p class="hint" style="margin:4px 0 8px">${w.length?(st==='done'?'Won by ':'Winner: ')+'<b>'+esc(w.map(who).join(' & '))+'</b>':'Tap the winner once it’s decided.'}</p><div class="pick">${mem.map(u=>`<button data-win="${esc(b.id)}" data-u="${esc(u)}" aria-pressed="${w.includes(u)}">${esc(who(u))}</button>`).join('')}</div>`;
  }else{
   const s=betStandings(t,b);
   h+=`<p class="hint" style="margin:4px 0 0">${k.single?'Lowest 18-hole score in a single round':b.scoring==='avg'?'Average per 18 holes':'Total across all trip rounds'}</p>`;
   if(!s.ranked.length)h+=`<p class="hint">No finished trip rounds yet.</p>`;
   else h+=`<table style="margin-top:6px"><tbody>${s.ranked.map(r=>`<tr class="${s.leaders.includes(r.uid)?'lead':''}"><td>${esc(who(r.uid))}</td><td class="n" style="font-weight:400;color:var(--mute)">${r.n} rd${r.n===1?'':'s'}</td><td class="n">${r.v}</td></tr>`).join('')}${s.none.map(r=>`<tr><td style="color:var(--mute)">${esc(who(r.uid))}</td><td></td><td class="n" style="font-weight:400;color:var(--mute)">${b.kind==='net'?'no index':(b.kind==='putts'||b.kind==='three_putts')&&tripRounds(t,r.uid).length?'no putts':'—'}</td></tr>`).join('')}</tbody></table>`;
   if(s.uneven)h+=`<p class="hint">Players have played different numbers of rounds, so totals aren’t a fair comparison yet.</p>`;
   if(s.leaders.length)h+=`<p class="hint">${st==='done'?'Won by':'Leading:'} <b>${esc(s.leaders.map(who).join(' & '))}</b>${s.leaders.length>1&&stake?' (pot split)':''}</p>`;
  }
  h+=S.confirm==='bet:'+b.id?`<div class="row" style="margin-top:10px"><button class="danger" data-act="delbet" data-id="${esc(b.id)}">Delete bet</button><button data-act="cancelc">Keep</button></div>`
   :`<p style="margin:8px 0 0;text-align:right"><button class="link" data-act="ask" data-c="bet:${esc(b.id)}">Delete bet</button></p>`;
  h+=`</div>`;
 });

 const k=BET_KINDS[S.betKind];
 h+=`<div class="card"><b>Add a bet</b>
 <label for="bkind">Bet</label><select id="bkind">${Object.entries(BET_KINDS).map(([v,x])=>`<option value="${v}" ${v===S.betKind?'selected':''}>${x.label}</option>`).join('')}</select>
 ${k.manual?`<label for="bname">What’s the bet?</label><input id="bname" maxlength="60" placeholder="e.g. Longest drive on 18">`:''}
 ${k.single||k.manual?'':`<label>Scoring</label><div class="seg">${[['total','Trip total'],['avg','Average per 18']].map(([v,l])=>`<button data-bs="${v}" aria-pressed="${S.betScoring===v}">${l}</button>`).join('')}</div>`}
 <label for="bstake">Stake per player ($)</label><input id="bstake" inputmode="decimal" placeholder="0 for bragging rights">
 <button class="primary wide" style="margin-top:14px" data-act="addbet" ${S.busy?'disabled':''}>Add bet</button></div>`;
 }

 if(tab==='receipts')h+=expensesSection(t,mem,who);

 // Bets settle up at the bottom of Bets; receipts have their own under Receipts.
 if(tab==='bets'&&bets.some(b=>+b.stake>0))h+=settleCard(t,settleBets(t),st==='done'?'Settle up bets':'Settle up bets if the trip ended now','Bets only. Receipts settle up separately under Receipts.');

 if(tab==='rounds')h+=rs.length?rs.map(r=>roundItem(r)).join(''):`<div class="card empty"><b>No rounds yet</b>Finished rounds posted ${fmtRange(t)} show up here.</div>`;

 if(tab==='players'){
 h+=`<div class="card">`;
 h+=mem.map(u=>`<div class="item" style="padding:6px 0">${av(u)}<div class="mid"><b>${esc(who(u))}</b>${u===t.created_by?'<span>Organizer</span>':''}</div>${friendAction(u,'Add friend')}${owner&&u!==S.me?`<button class="link" data-act="rmmember" data-u="${esc(u)}">Remove</button>`:''}</div>`).join('');
 if(mem.some(u=>u!==S.me&&!isFriend(u)))h+=`<p class="hint">Friends see each other’s rounds all year, not just on this trip.</p>`;
 {
  // Anyone on the trip can add their own friends; only the organizer removes others.
  const add=friendIds().filter(f=>!mem.includes(f)),waiting=outgoing();
  if(add.length)h+=`<label>Add your friends</label><div class="pick">${add.map(f=>`<button data-act="addmember" data-u="${esc(f)}">+ ${esc(handle(f))}</button>`).join('')}</div>`;
  else h+=`<p class="hint">All your friends are on this trip. To add someone else, add them on the Friends tab first; they appear here once they accept.</p>`;
  if(waiting.length)h+=`<p class="hint">Waiting to accept your friend request: ${esc(waiting.map(handle).join(', '))}.</p>`;
 }
 h+=`</div>`;
 h+=owner?(S.confirm==='deltrip'?`<div class="card note"><p style="margin-top:0">Delete this trip and all its bets? Rounds stay on everyone’s cards.</p><div class="row"><button class="danger" data-act="deltrip">Delete trip</button><button data-act="cancelc">Keep it</button></div></div>`:`<button class="wide" data-act="ask" data-c="deltrip">Delete trip</button>`)
  :(S.confirm==='leave'?`<div class="row"><button class="danger" data-act="leavetrip">Leave trip</button><button data-act="cancelc">Stay</button></div>`:`<button class="wide" data-act="ask" data-c="leave">Leave trip</button>`);
 }
 return h;
}

function settleCard(t,sv,title,note){
 const mem=S.tripMembers[t.id]||[],who=(u)=>u===S.me?'You':handle(u);
 const sgn=(v)=>{v=Math.round((v||0)*100)/100;return `<span class="${v>0?'pos':v<0?'neg':''}">${v>0?'+':v<0?'−':''}${fmtMoney(v)}</span>`};
 return `<h2>${esc(title)}</h2><div class="card">`
  +(sv.pays.length?`<table><tbody>${sv.pays.map(p=>`<tr><td>${esc(who(p.from))} pay${p.from===S.me?'':'s'} ${esc(p.to===S.me?'you':handle(p.to))}</td><td class="n">${fmtMoney(p.amt)}</td></tr>`).join('')}</tbody></table>`:`<p style="margin:0">Nobody owes anything yet.</p>`)
  +`<p class="hint">Net: ${mem.map(u=>`${esc(who(u))} ${sgn(sv.net[u])}`).join(' · ')}</p><p class="hint">${esc(note)} The app only keeps track; settle up however your group pays each other.</p></div>`;
}
function expensesSection(t,mem,who){
 const list=S.expenses[t.id]||[],ex=expenseTotals(t),total=list.reduce((a,e)=>a+e.amount,0);
 let h='';
 if(list.length){
  h+=`<div class="card"><div class="bet-head"><b>Trip spending</b><span class="money">${fmtMoney(total)}</span></div><table style="margin-top:6px"><thead><tr><th>Player</th><th class="n">Paid</th><th class="n">Their share</th></tr></thead><tbody>${mem.map(u=>`<tr><td>${esc(who(u))}</td><td class="n" style="font-weight:400">${fmtMoney(ex.paid[u]||0)}</td><td class="n">${fmtMoney(ex.share[u]||0)}</td></tr>`).join('')}</tbody></table></div>`;
  h+=settleCard(t,settleReceipts(t),'Settle up receipts','Receipts only: what each person paid minus their share.');
  h+=`<h2>All receipts</h2>`;
  list.forEach(e=>{
   const split=(e.split_among||[]).filter(u=>mem.includes(u)),canDel=e.created_by===S.me||e.paid_by===S.me||t.created_by===S.me;
   const each=split.length?fmtMoney(e.amount/split.length):'';
   h+=`<div class="card"><div class="bet-head"><b>${esc(e.description)}</b><span class="money">${fmtMoney(e.amount)}</span></div>
   <p class="hint" style="margin:2px 0 0">Paid by ${esc(who(e.paid_by))}${e.spent_on?' · '+fmtDate(e.spent_on):''} · ${split.length===mem.length?'split between everyone':'split between '+esc(split.map(who).join(', '))}${split.length>1?` (about ${each} each)`:''}</p>
   <div class="row" style="margin-top:8px">${e.receipt_path?`<button data-act="viewreceipt" data-path="${esc(e.receipt_path)}">View receipt</button>`:'<span class="hint" style="margin:0">No photo</span>'}${canDel?(S.confirm==='ex:'+e.id?`<button class="danger" data-act="delexpense" data-id="${esc(e.id)}">Delete</button><button data-act="cancelc">Keep</button>`:`<button class="link" style="flex:none" data-act="ask" data-c="ex:${esc(e.id)}">Delete</button>`):''}</div></div>`;
  });
 }
 const paidBy=S.exPaidBy&&mem.includes(S.exPaidBy)?S.exPaidBy:S.me,split=(S.exSplit||mem).filter(u=>mem.includes(u));
 h+=`<div class="card"><b>Add a receipt</b>
 <label for="exdesc">What was it for?</label><input id="exdesc" maxlength="80" placeholder="e.g. Dinner at the clubhouse">
 <div class="row"><div><label for="examt">Total ($)</label><input id="examt" inputmode="decimal" placeholder="0.00"></div><div><label for="exdate">Date</label><input id="exdate" type="date" value="${today()}"></div></div>
 <label>Who paid?</label><div class="pick">${mem.map(u=>`<button data-expaid="${esc(u)}" aria-pressed="${u===paidBy}">${esc(who(u))}</button>`).join('')}</div>
 <label>Split between</label><div class="pick">${mem.map(u=>`<button data-exsplit="${esc(u)}" aria-pressed="${split.includes(u)}">${esc(who(u))}</button>`).join('')}</div>
 <label for="exphoto">Receipt photo (optional)</label><input id="exphoto" type="file" accept="image/*,application/pdf">
 ${S.exFile?`<p class="hint">Attached: ${esc(S.exFile.name)} · <button class="link" data-act="exnofile">Remove</button></p>`:''}
 <button class="primary wide" style="margin-top:14px" data-act="addexpense" ${S.busy?'disabled':''}>${S.busy?'Saving…':'Add receipt'}</button></div>`;
 if(S.receiptView)h+=`<div class="overlay" role="dialog" aria-label="Receipt"><div class="row" style="flex:none"><b style="color:#fff">Receipt</b><button data-act="closereceipt" style="flex:none">Close</button></div>${S.receiptView.pdf?`<p style="color:#fff">This receipt is a PDF.</p><a class="primary" style="display:block;text-align:center;padding:12px;border-radius:10px;background:var(--green);color:var(--on-green)" href="${esc(S.receiptView.url)}" target="_blank" rel="noopener">Open PDF</a>`:`<img src="${esc(S.receiptView.url)}" alt="Receipt photo">`}</div>`;
 return h;
}
// Shrinks photos to at most 1600px (JPEG) so uploads are quick and storage stays small.
async function prepReceipt(file){
 if(file.type==='application/pdf'){if(file.size>5e6)throw new Error('That PDF is over 5 MB.');return{blob:file,type:'application/pdf',ext:'pdf'}}
 try{
  const url=URL.createObjectURL(file);
  const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url});
  const k=Math.min(1,1600/Math.max(img.naturalWidth,img.naturalHeight));
  const c=document.createElement('canvas');c.width=Math.round(img.naturalWidth*k);c.height=Math.round(img.naturalHeight*k);
  c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
  const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',0.8));
  if(blob)return{blob,type:'image/jpeg',ext:'jpg'};
 }catch(e){}
 throw new Error('That file can’t be used. Try a photo (JPEG or PNG) or a PDF.');
}
async function addExpense(){
 const t=curTrip();if(!t)return;
 const mem=S.tripMembers[t.id]||[];
 const desc=$('#exdesc').value.trim(),raw=$('#examt').value.replace(/[$,\s]/g,''),amount=Math.round(+raw*100)/100;
 const split=(S.exSplit||mem).filter(u=>mem.includes(u)),paid=S.exPaidBy&&mem.includes(S.exPaidBy)?S.exPaidBy:S.me;
 if(!desc)return toast('Say what the receipt was for.');
 if(!raw||!(amount>0)||amount>=100000)return toast('Enter the receipt total in dollars.');
 if(!split.length)return toast('Pick at least one person to split it between.');
 S.busy=true;render();
 const id=newId();let path=null;
 try{
  if(S.exFile){
   const up=await prepReceipt(S.exFile);path=t.id+'/'+id+'.'+up.ext;
   const {error}=await sb.storage.from('receipts').upload(path,up.blob,{contentType:up.type,upsert:false});
   if(error)throw error;
  }
  const {error}=await sb.from('expenses').insert({id,trip_id:t.id,description:desc,amount,paid_by:paid,split_among:split,spent_on:$('#exdate').value||null,receipt_path:path,created_by:S.me});
  if(error){if(path)sb.storage.from('receipts').remove([path]);throw error}
 }catch(e){S.busy=false;fail(e,'Couldn’t save the receipt.');return render()}
 S.busy=false;S.exFile=null;S.exSplit=null;S.exPaidBy=null;
 $('#exdesc').value='';$('#examt').value='';
 toast('Receipt added');loadAll();
}
async function createTrip(){
 const name=$('#tname').value.trim(),start=$('#tstart').value,end=$('#tend').value;
 if(!name)return toast('Give the trip a name.');
 if(!start||!end||end<start)return toast('The last day can’t be before the first day.');
 S.busy=true;render();
 const id=newId();
 let {error}=await sb.from('trips').insert({id,name,start_date:start,end_date:end,created_by:S.me});
 if(!error)({error}=await sb.from('trip_members').insert([S.me,...S.tripSel].map(u=>({trip_id:id,user_id:u}))));
 S.busy=false;
 if(error){fail(error,'Couldn’t create the trip.');return render()}
 S.tripSel=[];S.view='trip';S.arg=id;toast('Trip created');await loadAll();
}
async function addBet(){
 const k=BET_KINDS[S.betKind];
 const name=k.manual?$('#bname').value.trim():k.label+(!k.single&&S.betScoring==='avg'?' (avg per 18)':'');
 if(!name)return toast('Describe the bet.');
 const raw=$('#bstake').value.replace(/[$,\s]/g,''),stake=raw?+raw:0;
 if(!(stake>=0)||stake>99999)return toast('Enter the stake in dollars, or 0.');
 S.busy=true;render();
 const {error}=await sb.from('bets').insert({id:newId(),trip_id:S.arg,kind:S.betKind,name,stake,scoring:k.single||k.manual?'total':S.betScoring,created_by:S.me});
 S.busy=false;
 if(error){fail(error,'Couldn’t add the bet.');return render()}
 const n=$('#bname');if(n)n.value='';$('#bstake').value='';
 toast('Bet added');loadAll();
}
// Like / attest toggles: update the screen right away, then save; undo on failure.
async function toggleSocial(table,store,rid,msg){
 const on=(store[rid]||[]).includes(S.me);
 store[rid]=on?(store[rid]||[]).filter(u=>u!==S.me):[...(store[rid]||[]),S.me];render();
 const q=on?sb.from(table).delete().eq('round_id',rid).eq('user_id',S.me):sb.from(table).insert({round_id:rid,user_id:S.me});
 const {error}=await q;
 if(error){store[rid]=on?[...(store[rid]||[]),S.me]:(store[rid]||[]).filter(u=>u!==S.me);fail(error,msg);render()}
}
async function toggleWinner(betId,u){
 const list=S.bets[S.arg]||[],i=list.findIndex(x=>x.id===betId);if(i<0)return;
 const w=new Set(list[i].winners||[]);w.has(u)?w.delete(u):w.add(u);
 list[i]={...list[i],winners:[...w]};render();
 const {error}=await sb.from('bets').update({winners:list[i].winners}).eq('id',betId);
 if(error){fail(error,'Couldn’t save the winner.');loadAll()}
}

/* ---------- betting board ---------- */
// Bets posted to friends for later. Everyone who picked the wrong option pays
// their stake, split evenly among those who picked right. Tracking only.
const needsMyPick=(b)=>b.status==='open'&&b.created_by!==S.me&&!(S.boardPicks[b.id]||[]).some(p=>p.user_id===S.me);
function boardPayout(b){
 if(b.status!=='settled'||b.winning_option==null)return null;
 const picks=S.boardPicks[b.id]||[],stake=+b.stake||0;
 const win=picks.filter(p=>p.option===b.winning_option).map(p=>p.user_id),lose=picks.filter(p=>p.option!==b.winning_option).map(p=>p.user_id);
 const pays=[];
 if(stake&&win.length&&lose.length){const share=Math.round(stake/win.length*100)/100;lose.forEach(l=>win.forEach(w=>pays.push({from:l,to:w,amt:share})))}
 return{win,lose,pays};
}
// What each person owes you (positive) or you owe them (negative), across all settled bets.
function boardBalances(){
 const bal={};
 S.board.forEach(b=>{const p=boardPayout(b);if(!p)return;p.pays.forEach(x=>{
  if(x.from===S.me)bal[x.to]=(bal[x.to]||0)-x.amt;else if(x.to===S.me)bal[x.from]=(bal[x.from]||0)+x.amt;})});
 return Object.entries(bal).map(([u,v])=>[u,Math.round(v*100)/100]).filter(([,v])=>Math.abs(v)>=0.01).sort((a,b)=>b[1]-a[1]);
}
function boardView(){
 let h=header('Betting Board');
 if(!S.boardOk)return h+`<div class="card note"><b>The board needs one more database step</b><p style="margin:4px 0 0">Run <b>supabase/board.sql</b> in the Supabase SQL Editor, then reopen the app.</p></div>`;
 h+=`<button class="primary wide" style="margin-bottom:14px" data-nav="newbet">Post a bet</button>`;
 const bal=boardBalances();
 if(bal.length){
  const net=bal.reduce((a,[,v])=>a+v,0);
  h+=`<div class="card"><div class="bet-head"><b>Your board balance</b><span class="money ${net>0?'pos':net<0?'neg':''}">${net>0?'+':net<0?'−':''}${fmtMoney(net)}</span></div><table style="margin-top:6px"><tbody>${bal.map(([u,v])=>`<tr><td>${v>0?esc(handle(u))+' owes you':'You owe '+esc(handle(u))}</td><td class="n ${v>0?'pos':'neg'}">${fmtMoney(v)}</td></tr>`).join('')}</tbody></table><p class="hint">Totals from every settled bet. Settle up however your group pays each other.</p></div>`;
 }
 if(!S.board.length)return h+`<div class="card empty"><b>Nothing on the board yet</b>Post a bet for later, like “Jon breaks 80 at Whiskey Creek”. Your friends see it and pick a side.</div>`;
 [['open','Taking picks'],['locked','Picks locked, waiting on the result'],['settled','Settled'],['void','Called off']].forEach(([st,label])=>{
  let list=S.board.filter(b=>b.status===st);if(!list.length)return;
  if(st==='open')list=list.sort((a,b)=>needsMyPick(b)-needsMyPick(a));
  if(st==='settled'||st==='void')list=list.slice(0,20);
  h+=`<h2>${label}</h2>`+list.map(boardCard).join('');
 });
 return h;
}
function boardCard(b){
 const picks=S.boardPicks[b.id]||[],mine=picks.find(p=>p.user_id===S.me),owner=b.created_by===S.me,stake=+b.stake||0,open=b.status==='open';
 const who=(u)=>u===S.me?'You':handle(u);
 let h=`<div class="card${needsMyPick(b)?' note':''}"><div class="bet-head"><b>${esc(b.title)}</b><span class="money">${stake?fmtMoney(stake)+' each':'Bragging rights'}</span></div>
 <p class="hint" style="margin:2px 0 6px">Posted by ${esc(who(b.created_by))}${b.settle_by?' · settles by '+fmtDate(b.settle_by):''}${needsMyPick(b)?' · <b>waiting for your pick</b>':''}</p>`;
 if(b.details)h+=`<p style="margin:0 0 6px">${esc(b.details)}</p>`;
 (b.options||[]).forEach((o,i)=>{
  const ps=picks.filter(p=>p.option===i),won=b.status==='settled'&&b.winning_option===i,mineHere=mine&&mine.option===i;
  const action=S.settling===b.id?`<button class="primary" data-act="settlebet" data-id="${esc(b.id)}" data-opt="${i}">Won</button>`
   :open?`<button data-pickbet="${esc(b.id)}" data-opt="${i}" aria-pressed="${!!mineHere}">${mineHere?'Your pick':'Pick'}</button>`:'';
  h+=`<div class="opt${won?' won':''}"><div class="mid"><b>${esc(o)}${won?' ✓':''}</b><span>${ps.length?esc(ps.map(p=>who(p.user_id)).join(', ')):'No picks'}</span></div>${action}</div>`;
 });
 if(open&&mine)h+=`<p style="margin:6px 0 0"><button class="link" data-act="unpick" data-id="${esc(b.id)}">Withdraw my pick</button></p>`;
 const pay=boardPayout(b);
 if(pay)h+=pay.pays.length?`<table style="margin-top:8px"><tbody>${pay.pays.map(x=>`<tr><td>${esc(who(x.from))} pay${x.from===S.me?'':'s'} ${esc(x.to===S.me?'you':handle(x.to))}</td><td class="n">${fmtMoney(x.amt)}</td></tr>`).join('')}</tbody></table>`
  :`<p class="hint">No money changes hands${stake?' (nobody picked the losing side, or nobody picked the winner)':''}.</p>`;
 if(owner){
  const btn=(act,label,cls)=>`<button ${cls?`class="${cls}"`:''} data-act="${act}" data-id="${esc(b.id)}">${label}</button>`;
  let c='';
  if(S.settling===b.id)c=`<p class="hint" style="width:100%;margin:0">Tap <b>Won</b> next to the winning option. Picks close when you do.</p>`+btn('cancelsettle','Cancel');
  else if(S.confirm==='bbdel:'+b.id)c=btn('delboard','Delete for good','danger')+btn('cancelc','Keep');
  else if(open)c=btn('lockbet','Lock picks')+btn('startsettle','Settle')+btn('voidbet','Call off');
  else if(b.status==='locked')c=btn('startsettle','Settle','primary')+btn('reopenbet','Reopen picks')+btn('voidbet','Call off');
  else c=btn('reopenbet',b.status==='settled'?'Undo result':'Reopen')+`<button data-act="ask" data-c="bbdel:${esc(b.id)}">Delete</button>`;
  h+=`<div class="row" style="flex-wrap:wrap;margin-top:10px">${c}</div>`;
 }
 return h+`</div>`;
}
function newBetView(){
 const n=S.bbOpts;
 return header('Post a bet','Betting Board')+`<div class="card">
 <label for="bbtitle" style="margin-top:0">The bet</label><input id="bbtitle" maxlength="80" placeholder="e.g. Jon breaks 80 at Whiskey Creek">
 <label for="bbdetails">Details (optional)</label><input id="bbdetails" maxlength="300" placeholder="Which round, tiebreaks, anything else">
 <label>Options</label>${Array.from({length:n},(_,i)=>`<input id="bbopt${i}" maxlength="40" style="margin-bottom:6px" value="${i===0?'Yes':i===1?'No':''}" placeholder="Option ${i+1}">`).join('')}
 <div class="row">${n<6?'<button data-act="bbmore">+ Add option</button>':''}${n>2?'<button data-act="bbless">Remove last</button>':''}</div>
 <p class="hint">For “who wins” bets, use player names as the options.</p>
 <div class="row"><div><label for="bbstake">Stake per player ($)</label><input id="bbstake" inputmode="decimal" placeholder="0"></div><div><label for="bbdate">Settle by (optional)</label><input id="bbdate" type="date" min="${today()}"></div></div>
 <button class="primary wide" style="margin-top:14px" data-act="postbet" ${S.busy?'disabled':''}>Post to the board</button></div>
 <p class="sub">Your friends see it and pick an option. Once it’s decided, you mark the winner: everyone who picked wrong pays their stake, split evenly among those who picked right. The app only keeps track.</p>`;
}
async function postBoardBet(){
 const title=$('#bbtitle').value.trim(),details=$('#bbdetails').value.trim();
 const options=Array.from({length:S.bbOpts},(_,i)=>$('#bbopt'+i).value.trim()).filter(Boolean);
 if(!title)return toast('Describe the bet.');
 if(options.length<2)return toast('Give at least two options.');
 if(new Set(options.map(o=>o.toLowerCase())).size!==options.length)return toast('Each option needs a different name.');
 const raw=$('#bbstake').value.replace(/[$,\s]/g,''),stake=raw?+raw:0;
 if(!(stake>=0)||stake>99999)return toast('Enter the stake in dollars, or 0.');
 S.busy=true;render();
 const {error}=await sb.from('board_bets').insert({id:newId(),created_by:S.me,title,details:details||null,options,stake,settle_by:$('#bbdate').value||null});
 S.busy=false;
 if(error){fail(error,'Couldn’t post the bet.');return render()}
 S.bbOpts=2;toast('Posted to the board');go('board');loadAll();
}
async function boardUpdate(id,patch,msg){
 const {error}=await sb.from('board_bets').update(patch).eq('id',id);
 if(error)return fail(error,'Couldn’t update the bet.');
 if(msg)toast(msg);loadAll();
}
async function pickBoard(id,opt){
 const list=S.boardPicks[id]=(S.boardPicks[id]||[]).filter(p=>p.user_id!==S.me);
 list.push({bet_id:id,user_id:S.me,option:opt});render();
 const {error}=await sb.from('board_picks').upsert({bet_id:id,user_id:S.me,option:opt});
 if(error){fail(error,'Your pick didn’t save. The bet may have just been locked.');loadAll()}
}

/* ---------- play ---------- */
function playHtml(){
 if(playView==='start'||!draft)return startView();
 if(playView==='sum')return summaryView();
 return holeView();
}
function startView(){
 const ix=S.status==='ready'?myIndex():null;
 return `${header('New round')}
 <div class="card"><label for="course">Course</label><select id="course">${Object.entries(COURSES).map(([k,c])=>`<option value="${k}">${esc(c.name)}</option>`).join('')}<option value="">Other course</option></select>
 <div id="otherWrap" hidden><label for="cname">Course name</label><input id="cname" maxlength="60" placeholder="Where are you playing?"></div>
 <label for="tee">Tees</label><select id="tee">${teeOpts('sr')}</select>
 <div class="row"><div><label for="rating">Course rating</label><input id="rating" inputmode="decimal" placeholder="e.g. 71.9"></div><div><label for="slope">Slope</label><input id="slope" inputmode="numeric" placeholder="e.g. 133"></div></div>
 <label for="rdate">Date played</label><input type="date" id="rdate" value="${today()}" max="${today()}">
 <label>Holes</label><div class="seg" id="nseg">${[['18','18'],['front','Front 9'],['back','Back 9']].map(([v,l])=>`<button aria-pressed="${S.nsel===v}" data-n="${v}">${l}</button>`).join('')}</div>
 <p class="hint" id="chline"></p>
 <button class="primary wide" style="margin-top:14px" data-act="start">Start round</button></div>
 <p class="sub">Rating and slope are on the scorecard. Without them the round still posts but won’t count toward a handicap.${ix!=null?'':' Your index appears after 3 rated rounds.'}</p>`;
}
function syncStart(fresh){
 const c=$('#course');if(!c)return;
 const k=c.value;$('#otherWrap').hidden=!!k;
 if(!fresh){const t=$('#tee'),keepTee=t.value;t.innerHTML=k?teeOpts(k):'<option value="">n/a</option>';t.disabled=!k;if(k&&COURSES[k].tees[keepTee])t.value=keepTee}
 if(fresh&&k){const rs=teeRS(k,$('#tee').value);$('#rating').value=rs.r;$('#slope').value=rs.s}
 updateCH();
}
function updateCH(){
 const el=$('#chline');if(!el)return;
 const ix=S.status==='ready'?myIndex():null,k=$('#course').value,n=S.nsel;
 const rating=+$('#rating').value,slope=+$('#slope').value;
 let par=n==='18'?72:36;
 if(k){const p=COURSES[k].par;par=(n==='front'?p.slice(0,9):n==='back'?p.slice(9):p).reduce((a,b)=>a+b,0)}
 const ch=courseHcp(ix,n==='18'?18:9,rating,slope,par);
 el.textContent=ch==null?(ix==null?'':'Enter rating and slope to see your strokes.'):`With your ${fmtIdx(ix)} index you get ${ch} stroke${ch===1?'':'s'} from these tees.`;
}
function holeView(){
 const h=draft.holes[hidx],f=fails(h),p=played(h),start=draft.nine==='back'?10:1;
 let s=`${header(draft.course,'Hole '+(start+hidx)+' of '+(start+draft.holes.length-1))}
 <div class="strip" style="grid-template-columns:repeat(${Math.min(9,draft.holes.length)},1fr)">`;
 draft.holes.forEach((x,i)=>s+=`<button data-go="${i}" class="${i===hidx?'cur ':''}${fails(x).length?'bad':played(x)?'done':''}" aria-label="Hole ${start+i}">${start+i}</button>`);
 s+=`</div><div class="card"><div class="hole-head"><b>Hole ${start+hidx}</b><span class="sub" style="margin:0">${rel((p?h.score:h.par)-h.par)} to par</span></div>
 ${h.yds?`<p class="sub" style="margin:4px 0 0">${h.yds} yds from the ${esc(draft.tee)} tees · stroke index ${h.si}</p>`:''}<label>Par</label><div class="seg">${[3,4,5].map(n=>`<button data-par="${n}" aria-pressed="${h.par===n}">${n}</button>`).join('')}</div>
 <label>Strokes</label><div class="stepper"><button data-sc="-1" aria-label="Fewer strokes">−</button><output>${p?h.score:h.par}</output><button data-sc="1" aria-label="More strokes">+</button></div>
 <label>Putts${h.putts==null?` <span class="${S.puttsNag?'neg':'hint'}" style="font-weight:400;font-size:14px">(required to continue)</span>`:''}</label><div class="stepper${S.puttsNag&&h.putts==null?' need':''}"><button data-pt="-1" aria-label="Fewer putts">−</button><output>${h.putts==null?'–':h.putts}</output><button data-pt="1" aria-label="More putts">+</button></div>
 <button class="toggle" data-tg="sc" aria-pressed="${h.sc}"><span>Approach with a scoring club (wedge or short iron)</span><b>${h.sc?'Yes':'No'}</b></button>
 <button class="toggle" data-tg="ud" aria-pressed="${h.ud}"><span>Missed an easy up-and-down</span><b>${h.ud?'Yes':'No'}</b></button>
 <div class="row" style="margin-top:4px;align-items:flex-start">
  <div><label>Beers 🍺</label><div class="stepper sm"><button data-beer="-1" aria-label="One less beer">−</button><output>${h.beer||0}</output><button data-beer="1" aria-label="One more beer">+</button></div></div>
  <div><label>GB 💨</label><div class="stepper sm"><button data-gb="-1" aria-label="One less GB">−</button><output>${h.gb||0}</output><button data-gb="1" aria-label="One more GB">+</button></div></div>
 </div>
 <div class="chips">${p?(f.length?f.map(r=>`<span class="chip">${r.k==='r3'?'You Suck':'Nice Work Idiot'} - ${r.n.replace('No ','')}</span>`).join(''):'<span class="chip ok">Clean hole</span>'):''}</div></div>
 <div class="row"><button data-act="prev" ${hidx===0?'disabled':''}>Previous</button><button class="primary" data-act="next">${hidx===draft.holes.length-1?'Finish round':'Next hole'}</button></div>
 <p style="text-align:center"><button class="link" data-act="tosum">Review round</button></p>`;
 return s;
}
function summaryView(){
 const ix=S.status==='ready'?myIndex():null,t=calc(draft,ix);
 let s=`${header('Round summary',draft.course+' · '+fmtDate(draft.date))}
 <div class="card big"><div><b>${t.score}</b><span>Strokes (${rel(t.score-t.parPlayed)})</span></div><div><b>${t.net!=null?t.net:'—'}</b><span>Net${t.ch!=null?' (CH '+t.ch+')':''}</span></div><div><b>${t.putts==null?'—':t.putts}</b><span>Putts</span></div><div><b>${t.t5}</b><span>Tiger 5 misses</span></div></div>
 ${holeSum(draft,'beer')||holeSum(draft,'gb')?`<div class="tags" style="margin:-2px 0 10px">${extrasTags(draft)}</div>`:''}
 <div class="card"><table>`;
 RULES.forEach(r=>{const c=t.per[r.k];s+=`<tr><td>${r.n}<div class="bar"><i style="width:${t.holesPlayed?Math.min(100,c/t.holesPlayed*300):0}%"></i></div></td><td class="n">${c}</td></tr>`});
 s+=`</table></div>
 <div class="card"><b>Handicap</b><p class="hint" style="margin-top:4px">${t.diff!=null?`Score differential <b>${fmtDiff(t.diff)}</b> (adjusted gross ${t.ags}). It counts toward your index once posted.`:!t.complete?`You’ve scored ${t.holesPlayed} of ${t.n} holes. Unfinished rounds post, but don’t count toward a handicap.`:'No course rating and slope, so this round won’t count toward a handicap.'}</p></div>`;
 s+=S.status==='ready'?`<button class="primary wide" style="margin-bottom:8px" data-act="post" ${S.busy?'disabled':''}>${S.busy?'Posting…':'Post round'}</button>`:`<div class="card note"><p style="margin:0">Sign in to post this round. It stays saved on this phone until you do.</p></div>`;
 s+=`<div class="row"><button data-act="back">Back to holes</button>${S.confirm==='discard'?`<button class="danger" data-act="discard">Yes, discard</button>`:`<button data-act="ask" data-c="discard">Discard round</button>`}</div>`;
 return s;
}

/* ---------- actions ---------- */
function go(view,arg){
 if(view!==S.view||arg!==S.arg){S.exSplit=null;S.exPaidBy=null;S.exFile=null}
 S.view=view;S.arg=arg||null;S.confirm=null;S.editName=false;S.settling=null;S.receiptView=null;render();
}
async function postRound(){
 if(!draft||S.busy)return;
 const ix=myIndex(),t=calc(draft,ix),row=JSON.parse(JSON.stringify(toRow(draft,t,ix)));
 LS.set(OUTKEY,[...LS.get(OUTKEY,[]).filter(r=>r.id!==row.id),row]);
 (S.rounds[S.me]=S.rounds[S.me]||[]).unshift(fromRow({...row,created_at:new Date().toISOString(),_pending:true}));
 draft=null;saveDraft();playView='start';cacheSave();
 go('feed');
 if(!navigator.onLine)return toast('Saved. It posts when you have signal.');
 await flushOutbox();
}
async function importOld(){
 const old=oldRounds();if(!old.length||S.busy)return;
 S.busy=true;render();
 const ix=myIndex();
 const rows=old.map(r=>{
  const key=Object.keys(COURSES).find(k=>COURSES[k].name===r.course);
  const rs=key?teeRS(key,r.tee):{r:'',s:''};
  const d=new Date(r.date);
  const holes=(r.holes||[]).map((h,i)=>({par:h.par,score:h.score,putts:h.putts,sc:!!h.sc,ud:!!h.ud,si:h.si||(key?COURSES[key].si[i]:i+1),yds:h.yds||null}));
  const base={id:newId(),course:r.course||'My round',tee:r.tee||'',rating:rs.r,slope:rs.s,date:isNaN(d)?today():isoDate(d),nine:null,holes};
  return JSON.parse(JSON.stringify(toRow(base,calc(base,ix),ix,{imported:true})));
 });
 const {error}=await sb.from('rounds').insert(rows);
 S.busy=false;
 if(error)return fail(error,'Those rounds didn’t post.'),render();
 LS.set(IMPKEY,1);toast(rows.length+' round'+(rows.length>1?'s':'')+' posted');loadAll();
}
async function addFriend(id){
 if(incoming().includes(id))return accept(id);
 if(isFriend(id)||outgoing().includes(id))return toast('Already connected with '+handle(id));
 const {error}=await sb.from('friendships').insert({requester:S.me,addressee:id});
 if(error)return fail(error,'Request didn’t send.');
 toast('Request sent');loadAll();
}
async function accept(id){
 const {error}=await sb.from('friendships').update({status:'accepted'}).eq('requester',id).eq('addressee',S.me);
 if(error)return fail(error,'Couldn’t accept.');
 toast('You’re now friends with '+handle(id));loadAll();
}
async function unfriend(id){
 S.confirm=null;
 const {error}=await sb.from('friendships').delete().or(`and(requester.eq.${S.me},addressee.eq.${id}),and(requester.eq.${id},addressee.eq.${S.me})`);
 if(error)return fail(error,'Couldn’t update that friendship.');
 loadAll();
}
async function shareInvite(){
 const url=inviteUrl(),text=`Add me on Tiger 5 so we can see each other's golf scores. My code is ${me().friend_code}.`;
 if(navigator.share){try{await navigator.share({title:'Tiger 5',text,url});return}catch(e){if(e&&e.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(text+' '+url);toast('Invite link copied')}catch(e){toast('Your invite link: '+url)}
}

document.addEventListener('click',async e=>{
 const b=e.target.closest('button');if(!b)return;
 const d=b.dataset,a=d.act;
 if(d.nav){if(d.nav==='me')return go('player',S.me);if(d.nav==='play'&&draft&&playView==='start')playView='hole';return go(d.nav)}
 if(d.round)return go('round',d.round);
 if(d.trip)return go('trip',d.trip);
 if(d.tsel){const s=new Set(S.tripSel);s.has(d.tsel)?s.delete(d.tsel):s.add(d.tsel);S.tripSel=[...s];return render()}
 if(d.bs){S.betScoring=d.bs;return render()}
 if(d.win)return toggleWinner(d.win,d.u);
 if(d.pickbet)return pickBoard(d.pickbet,+d.opt);
 if(d.like)return toggleSocial('round_likes',S.likes,d.like,'Couldn’t save your like.');
 if(d.attest)return toggleSocial('round_attests',S.attests,d.attest,'Couldn’t save your attest.');
 if(d.comments){go('round',d.comments);setTimeout(()=>{const c=document.getElementById('comments');if(c)c.scrollIntoView();const i=document.getElementById('cbody');if(i)i.focus({preventScroll:true})},0);return}
 if(d.delcomment){
  S.comments[d.rid]=(S.comments[d.rid]||[]).filter(c=>c.id!==d.delcomment);render();
  const {error}=await sb.from('round_comments').delete().eq('id',d.delcomment);
  if(error){fail(error,'Couldn’t delete the comment.');loadAll()}return;
 }
 if(a==='postcomment'){
  const body=$('#cbody').value.trim();if(!body)return toast('Write a comment first.');
  const c={id:newId(),round_id:d.id,user_id:S.me,body,created_at:new Date().toISOString()};
  S.busy=true;render();
  const {error}=await sb.from('round_comments').insert({id:c.id,round_id:c.round_id,user_id:c.user_id,body});
  S.busy=false;
  if(error){fail(error,'Couldn’t post the comment.');return render()}
  (S.comments[d.id]=S.comments[d.id]||[]).push(c);$('#cbody').value='';return render();
 }
 if(d.tfilter){S.tripsFilter=d.tfilter;return render()}
 if(d.ttab){S.tripTabs[S.arg]=d.ttab;S.confirm=null;S.receiptView=null;return render()}
 if(d.expaid){S.exPaidBy=d.expaid;return render()}
 if(d.exsplit){const t=curTrip(),mem=t?S.tripMembers[t.id]||[]:[];const s=new Set(S.exSplit||mem);s.has(d.exsplit)?s.delete(d.exsplit):s.add(d.exsplit);S.exSplit=mem.filter(u=>s.has(u));return render()}
 if(d.player)return go('player',d.player);
 if(b.parentElement&&b.parentElement.id==='nseg'){S.nsel=d.n;[...b.parentElement.children].forEach(x=>x.setAttribute('aria-pressed',x===b));return updateCH()}

 if(a==='authmode'){S.authEmail=$('#email').value.trim();S.authStep=d.m;return render()}
 if(a==='signin'||a==='signup'){
  const email=$('#email').value.trim(),password=$('#pw').value;
  if(!/^\S+@\S+\.\S+$/.test(email))return toast('Enter your email address.');
  if(a==='signup'){
   if(password.length<8)return toast('Use a password with at least 8 characters.');
   if(password!==$('#pw2').value)return toast('The two passwords don’t match.');
  }else if(!password)return toast('Enter your password.');
  S.authEmail=email;S.busy=true;render();
  const {data,error}=a==='signup'?await sb.auth.signUp({email,password}):await sb.auth.signInWithPassword({email,password});
  S.busy=false;
  if(error){
   const m=error.message||'';
   if(/invalid login/i.test(m))toast('Email or password is wrong. New here? Tap Create account.');
   else if(/already registered/i.test(m)){S.authStep='signin';toast('That email already has an account. Sign in instead.')}
   else fail(error,a==='signup'?'Couldn’t create your account.':'Couldn’t sign in.');
   return render();
  }
  if(!data.session){toast('Account created, but email confirmation is on in Supabase. Turn off “Confirm email”, then sign in.');S.authStep='signin';return render()}
  S.me=data.user.id;S.status='loading';render();return loadAll();
 }
 if(a==='join'){
  const v=$('#handle').value.trim();if(!v)return toast('Pick a name your friends will recognize.');
  S.busy=true;render();
  const {error}=await sb.from('profiles').insert({id:S.me,handle:v});
  S.busy=false;if(error){fail(error,'Couldn’t save your name.');return render()}
  S.status='loading';return loadAll();
 }
 if(a==='signout'){await sb.auth.signOut();LS.set(CACHEKEY,null);location.reload();return}
 if(a==='editname'){S.editName=true;return render()}
 if(a==='cancelname'){S.editName=false;return render()}
 if(a==='savename'){
  const v=$('#newname').value.trim();if(!v)return;
  const {error}=await sb.from('profiles').update({handle:v}).eq('id',S.me);
  if(error)return fail(error,'Name didn’t save.');
  S.editName=false;S.profiles[S.me]={...me(),handle:v};toast('Name saved');return render();
 }
 if(a==='share')return shareInvite();
 if(a==='search')return searchPlayers();
 if(a==='add')return addFriend(d.id);
 if(a==='addinvite'){const p=S.invite;S.invite=null;S.profiles[p.id]={id:p.id,handle:p.handle};return addFriend(p.id)}
 if(a==='dropinvite'){S.invite=null;return render()}
 if(a==='accept')return accept(d.id);
 if(a==='unfriend')return unfriend(d.id);
 if(a==='ask'){S.confirm=d.c;return render()}
 if(a==='cancelc'){S.confirm=null;return render()}
 if(a==='delround'){
  S.confirm=null;
  const {error}=await sb.from('rounds').delete().eq('id',d.id);
  if(error)return fail(error,'Couldn’t delete the round.');
  toast('Round deleted');go('feed');return loadAll();
 }
 if(a==='import')return importOld();
 if(a==='addexpense')return addExpense();
 if(a==='exnofile'){S.exFile=null;return render()}
 if(a==='viewreceipt'){
  const {data,error}=await sb.storage.from('receipts').createSignedUrl(d.path,600);
  if(error)return fail(error,'Couldn’t open the receipt.');
  S.receiptView={url:data.signedUrl,pdf:/\.pdf$/i.test(d.path)};return render();
 }
 if(a==='closereceipt'){S.receiptView=null;return render()}
 if(a==='delexpense'){
  S.confirm=null;const e=Object.values(S.expenses).flat().find(x=>x.id===d.id);
  const {error}=await sb.from('expenses').delete().eq('id',d.id);if(error)return fail(error,'Couldn’t delete the receipt.');
  if(e&&e.receipt_path)sb.storage.from('receipts').remove([e.receipt_path]).catch(()=>{});
  toast('Receipt deleted');return loadAll();
 }
 if(a==='postbet')return postBoardBet();
 if(a==='bbmore'||a==='bbless'){S.bbOpts=Math.max(2,Math.min(6,S.bbOpts+(a==='bbmore'?1:-1)));return render()}
 if(a==='unpick'){S.boardPicks[d.id]=(S.boardPicks[d.id]||[]).filter(p=>p.user_id!==S.me);render();const {error}=await sb.from('board_picks').delete().eq('bet_id',d.id).eq('user_id',S.me);if(error)fail(error,'Couldn’t withdraw your pick.');return loadAll()}
 if(a==='lockbet')return boardUpdate(d.id,{status:'locked'},'Picks locked');
 if(a==='voidbet')return boardUpdate(d.id,{status:'void',winning_option:null,settled_at:null},'Bet called off');
 if(a==='reopenbet'){const b=S.board.find(x=>x.id===d.id);return boardUpdate(d.id,b&&b.status==='settled'?{status:'locked',winning_option:null,settled_at:null}:{status:'open'},b&&b.status==='settled'?'Result undone':'Picks reopened')}
 if(a==='startsettle'){S.settling=d.id;return render()}
 if(a==='cancelsettle'){S.settling=null;return render()}
 if(a==='settlebet'){S.settling=null;return boardUpdate(d.id,{status:'settled',winning_option:+d.opt,settled_at:new Date().toISOString()},'Bet settled')}
 if(a==='delboard'){S.confirm=null;const {error}=await sb.from('board_bets').delete().eq('id',d.id);if(error)return fail(error,'Couldn’t delete the bet.');toast('Bet deleted');return loadAll()}
 if(a==='endtrip'||a==='reopentrip'){
  S.confirm=null;const t=curTrip();if(!t)return;
  // Ending pulls the last day in to today so later rounds stop counting.
  const patch=a==='endtrip'?{ended_at:new Date().toISOString(),end_date:[t.start_date,[t.end_date,today()].sort()[0]].sort()[1]}
   :{ended_at:null,end_date:[t.end_date,today()].sort()[1]}; // reopening runs at least through today
  const {error}=await sb.from('trips').update(patch).eq('id',t.id);
  if(error)return fail(error,a==='endtrip'?'Couldn’t end the trip.':'Couldn’t reopen the trip.');
  toast(a==='endtrip'?'Trip ended':'Trip reopened');return loadAll();
 }
 if(a==='createtrip')return createTrip();
 if(a==='addbet')return addBet();
 if(a==='delbet'){S.confirm=null;const {error}=await sb.from('bets').delete().eq('id',d.id);if(error)return fail(error,'Couldn’t delete the bet.');return loadAll()}
 if(a==='addmember'){const {error}=await sb.from('trip_members').insert({trip_id:S.arg,user_id:d.u});if(error)return fail(error,'Couldn’t add them.');toast(handle(d.u)+' added');return loadAll()}
 if(a==='rmmember'){const {error}=await sb.from('trip_members').delete().eq('trip_id',S.arg).eq('user_id',d.u);if(error)return fail(error,'Couldn’t remove them.');return loadAll()}
 if(a==='deltrip'){S.confirm=null;const {error}=await sb.from('trips').delete().eq('id',S.arg);if(error)return fail(error,'Couldn’t delete the trip.');toast('Trip deleted');go('trips');return loadAll()}
 if(a==='leavetrip'){S.confirm=null;const {error}=await sb.from('trip_members').delete().eq('trip_id',S.arg).eq('user_id',S.me);if(error)return fail(error,'Couldn’t leave the trip.');go('trips');return loadAll()}
 if(a==='start'){
  const k=$('#course').value,c=COURSES[k],n=S.nsel,tee=$('#tee').value;
  const off=n==='back'?9:0,len=n==='18'?18:9;
  draft={id:newId(),course:c?c.name:($('#cname').value.trim()||'My round'),tee:c?tee:'',rating:$('#rating').value.trim(),slope:$('#slope').value.trim(),date:$('#rdate').value||today(),nine:n==='18'?null:n,
   holes:Array.from({length:len},(_,j)=>{const i=j+off;return c?{par:c.par[i],yds:c.tees[tee].yds[i],si:c.si[i],score:null,putts:null,sc:false,ud:false,beer:0,gb:0}:{par:4,si:i+1,score:null,putts:null,sc:false,ud:false,beer:0,gb:0}})};
  hidx=0;playView='hole';saveDraft();return render();
 }
 if(a==='post')return postRound();
 if(a==='discard'){draft=null;saveDraft();playView='start';S.confirm=null;return render()}
 if(a==='back'){playView='hole';S.confirm=null;return render()}
 if(a==='tosum'){playView='sum';return render()}
 if(!draft)return;
 const h=draft.holes[hidx];
 // Putts are required before moving ahead (going back to earlier holes is fine).
 const needPutts=()=>{if(h.putts!=null)return false;S.puttsNag=true;render();toast('Enter putts for this hole first.');return true};
 if(d.go!=null){if(+d.go>hidx&&needPutts())return;S.puttsNag=false;hidx=+d.go}
 else if(d.par)h.par=+d.par;
 else if(d.sc)h.score=Math.max(1,(h.score==null?h.par:h.score)+ +d.sc);
 else if(d.pt){h.putts=h.putts==null?(+d.pt>0?1:0):Math.max(0,h.putts+ +d.pt);if(h.score==null)h.score=h.par}
 else if(d.tg){h[d.tg]=!h[d.tg];if(h.score==null)h.score=h.par}
 else if(d.beer)h.beer=Math.max(0,(h.beer||0)+ +d.beer);
 else if(d.gb)h.gb=Math.max(0,(h.gb||0)+ +d.gb);
 else if(a==='prev'){S.puttsNag=false;hidx--}
 else if(a==='next'){if(needPutts())return;S.puttsNag=false;if(h.score==null)h.score=h.par;if(hidx===draft.holes.length-1)playView='sum';else hidx++}
 else return;
 saveDraft();render();
});
document.addEventListener('change',e=>{
 const id=e.target.id;
 if(id==='course'){const v=e.target.value,t=$('#tee');t.innerHTML=v?teeOpts(v):'<option value="">n/a</option>';t.disabled=!v;$('#otherWrap').hidden=!!v;const rs=v?teeRS(v,t.value):{r:'',s:''};$('#rating').value=rs.r;$('#slope').value=rs.s;updateCH()}
 if(id==='bkind'){S.betKind=e.target.value;return render()}
 if(id==='exphoto'){const f=e.target.files&&e.target.files[0];if(f&&f.size>20e6)return toast('That file is too big. Try a smaller photo.');S.exFile=f||null;return render()}
 if(id==='tee'){const rs=teeRS($('#course').value,e.target.value);$('#rating').value=rs.r;$('#slope').value=rs.s;updateCH()}
});
document.addEventListener('input',e=>{if(e.target.id==='rating'||e.target.id==='slope')updateCH()});
document.addEventListener('keydown',e=>{
 if(e.key!=='Enter')return;
 const auth=S.authStep==='signup'?'signup':'signin';
 const map={email:auth,pw:auth,pw2:auth,handle:'join',fsearch:'search',newname:'savename',cbody:'postcomment'};
 const act=map[e.target.id];if(act){e.preventDefault();const b=document.querySelector(`[data-act="${act}"]`);if(b)b.click()}
});

/* ---------- start up ---------- */
window.addEventListener('online',()=>{if(S.status==='ready'){flushOutbox();if(S.offline)loadAll()}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&S.status==='ready'&&!S.busy)loadAll()});
if('serviceWorker' in navigator&&location.protocol==='https:'){
 // When a new version takes over, reload once so the new code runs right away
 // (skipped on the very first install, when nothing was running before).
 const hadController=!!navigator.serviceWorker.controller;let reloaded=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(hadController&&!reloaded&&!S.busy){reloaded=true;location.reload()}});
 navigator.serviceWorker.register('sw.js').then(reg=>{
  // Installed home-screen apps rarely restart, so look for updates whenever the app is reopened.
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{})});
 }).catch(()=>{});
}

(async()=>{
 captureInvite();
 render();
 if(!sb){S.status='error';return render()}
 sb.auth.onAuthStateChange((ev)=>{if(ev==='SIGNED_OUT'){S.me=null;S.status='auth';render()}});
 const {data:{session}}=await sb.auth.getSession();
 if(!session){S.status='auth';return render()}
 S.me=session.user.id;
 if(cacheLoad()){S.status='ready';addPendingLocal();render()}
 loadAll();
})();
