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

// The original courses are in Virginia; Myrtle Beach (SC) and more Virginia courses come from courses.js.
for(const k in COURSES)COURSES[k].state=COURSES[k].state||'VA';
Object.assign(COURSES,window.EXTRA_COURSES||{});
const STATE_NAMES={MD:'Maryland',NC:'North Carolina',SC:'South Carolina',VA:'Virginia'};
const PICK_STATES=['VA','MD','NC','SC'];
for(const k in COURSES)COURSES[k].access=COURSES[k].access||'Public';

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

const fromRow=(r)=>({id:r.id,uid:r.user_id,course:r.course,tee:r.tee,rating:r.rating==null?null:+r.rating,slope:r.slope,date:r.date,nine:r.nine,holes:r.holes||[],n:r.n,par:r.par,parPlayed:r.par_played,score:r.score,putts:r.putts,per:r.per||{},t5:r.t5,ch:r.ch,ags:r.ags,diff:r.diff==null?null:+r.diff,complete:r.complete,net:r.net,holesPlayed:r.holes_played,at:Date.parse(r.created_at)||0,pending:!!r._pending,enteredBy:r.entered_by||null,scorecards:r.scorecards||[],games:r.games||null});
function toRow(d,t,index,extra){
 return{id:d.id,user_id:S.me,course:d.course,tee:d.tee||null,rating:+d.rating||null,slope:+d.slope||null,date:d.date,nine:d.nine||null,holes:d.holes,
  n:t.n,par:t.par,par_played:t.parPlayed,score:t.score,putts:t.putts,per:t.per,t5:t.t5,ch:t.ch,ags:t.ags,diff:t.diff,complete:t.complete,net:t.net,holes_played:t.holesPlayed,index_at_post:index,...(extra||{})};
}

/* ---------- state ---------- */
const DKEY='tiger5-draft-v2',OLDKEY='tiger5-rounds-v1',IMPKEY='tiger5-imported-v1',OUTKEY='tiger5-outbox',CACHEKEY='tiger5-cache',INVKEY='tiger5-invite';
const S={status:'loading',me:null,email:'',profiles:{},friendships:[],rounds:{},view:'feed',arg:null,busy:false,confirm:null,editName:false,nsel:'18',authStep:'signin',authEmail:'',offline:false,invite:null,trips:[],tripMembers:{},bets:{},tripsOk:true,tripSel:[],betKind:'putts',betScoring:'total',tripTabs:{},board:[],boardPicks:{},boardOk:true,bbOpts:2,settling:null,expenses:{},exSplit:null,exPaidBy:null,receiptView:null,likes:{},comments:{},attests:{},venmo:{},photoView:null,courseKey:'sr',picking:false,cstate:'VA',cfilter:'all',csearch:'',statesLoaded:{},statesLoading:{}};
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
  const {data:prof,error:e1}=await sb.from('profiles').select('id,handle,friend_code,avatar_url').eq('id',S.me).maybeSingle();if(e1)throw e1;
  if(!prof){S.status='setup';return render()}
  const profiles={[S.me]:prof};
  const {data:fr,error:e2}=await sb.from('friendships').select('*');if(e2)throw e2;
  S.friendships=fr||[];
  const others=[...new Set(S.friendships.map(other))];
  if(others.length){const {data:ps,error}=await sb.from('profiles').select('id,handle,avatar_url').in('id',others);if(error)throw error;(ps||[]).forEach(p=>profiles[p.id]=p)}
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
  try{const {data:pm,error:pe}=await sb.from('payments').select('*').order('created_at',{ascending:false}).limit(1000);if(!pe)S.payments=pm||[]}catch(e){}
  // People You May Know (friends of friends). Their names and photos join the profiles list so av() works.
  try{const {data:sg,error:se}=await sb.rpc('suggested_friends');if(!se){S.suggest=sg||[];S.suggest.forEach(p=>{if(!S.profiles[p.id])S.profiles[p.id]={id:p.id,handle:p.handle,avatar_url:p.avatar_url}})}}catch(e){}
  try{const {data:vp,error:ve}=await sb.from('profile_private').select('id,venmo');if(!ve){S.venmo={};(vp||[]).forEach(v=>{if(v.venmo)S.venmo[v.id]=v.venmo})}}catch(e){}
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
  // Tee times and live scores (optional: older databases won't have them).
  S.teeTimes={};S.live={};
  if(tripIds.length){
   const tt=await sb.from('tee_times').select('*').in('trip_id',tripIds);
   if(!tt.error)(tt.data||[]).forEach(x=>(S.teeTimes[x.trip_id]=S.teeTimes[x.trip_id]||[]).push(x));
   const lv=await sb.from('live_scores').select('*').in('trip_id',tripIds);
   if(!lv.error)(lv.data||[]).forEach(x=>(S.live[x.trip_id]=S.live[x.trip_id]||[]).push(x));
  }
  const exBy={};expenses.forEach(e=>(exBy[e.trip_id]=exBy[e.trip_id]||[]).push({...e,amount:+e.amount}));
  S.expenses=exBy;
  const members={};(tm||[]).forEach(x=>(members[x.trip_id]=members[x.trip_id]||[]).push(x.user_id));
  const betsBy={};bets.forEach(b=>(betsBy[b.trip_id]=betsBy[b.trip_id]||[]).push(b));
  S.trips=trips.sort((x,y)=>y.start_date.localeCompare(x.start_date));S.tripMembers=members;S.bets=betsBy;S.tripsOk=true;
  const mates=[...new Set(Object.values(members).flat())].filter(u=>!friendsAndMe.includes(u));
  const missing=mates.filter(u=>!profiles[u]);
  if(missing.length){const {data:ps}=await sb.from('profiles').select('id,handle,avatar_url').in('id',missing);(ps||[]).forEach(p=>profiles[p.id]=p)}
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
  if(need.length){const {data}=await sb.from('profiles').select('id,handle,avatar_url').in('id',need);(data||[]).forEach(p=>S.profiles[p.id]=p)}
 }catch(e){console.error(e)}
}
// Loads Betting Board bets the viewer can see, with everyone's picks.
// Like trips, a missing board.sql leaves the rest of the app working.
async function loadBoard(profiles){
 try{
  const {data:bs,error}=await sb.from('board_bets').select('*').order('created_at',{ascending:false}).limit(200);if(error)throw error;
  const ids=(bs||[]).map(b=>b.id);let picks=[];
  if(ids.length){const r=await sb.from('board_picks').select('bet_id,user_id,option,amount').in('bet_id',ids);if(r.error)throw r.error;picks=r.data||[]}
  const by={};picks.forEach(p=>(by[p.bet_id]=by[p.bet_id]||[]).push(p));
  S.board=bs||[];S.boardPicks=by;S.boardOk=true;
  const need=[...new Set([...S.board.map(b=>b.created_by),...picks.map(p=>p.user_id)])].filter(u=>!profiles[u]);
  if(need.length){const {data:ps}=await sb.from('profiles').select('id,handle,avatar_url').in('id',need);(ps||[]).forEach(p=>profiles[p.id]=p)}
 }catch(e){
  console.error(e);
  if(e&&(e.code==='42P01'||e.code==='PGRST205'||/does not exist|schema cache/i.test(e.message||'')))S.boardOk=false;
  else throw e;
 }
}
function addPendingLocal(){
 // Rounds waiting to post (yours, and friends' you scored) show on the right player's card.
 LS.get(OUTKEY,[]).forEach(row=>{const u=row.user_id||S.me,list=S.rounds[u]=S.rounds[u]||[];if(!list.some(r=>r.id===row.id))list.unshift(fromRow({...row,created_at:new Date().toISOString(),_pending:true}))});
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
 if(posted){toast(posted===1?'Round posted':posted+' rounds posted');await loadAll()}
 return posted;
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
 if(key===lastKey)document.querySelectorAll('#app input:not([type=file]):not([type=hidden]),#app select').forEach(e=>{if(e.id)keep[e.id]=e.value});
 const focus=document.activeElement&&document.activeElement.id;
 let html;
 if(S.status==='auth')html=authView();
 else if(S.status==='setup')html=setupView();
 else if(S.view==='play')html=playHtml();
 else if(S.status==='loading')html=header('Welcome back')+`<div class="empty"><b>Loading your group…</b>Rounds and friends appear here in a moment.</div>`;
 else if(S.status!=='ready')html=header('Can’t connect')+offlineView();
 else if(S.view==='friends')html=friendsView();
 else if(S.view==='board')html=boardView();
 else if(S.view==='leaders')html=leadersView();
 else if(S.view==='settings')html=settingsView();
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
// Bottom bar icons (simple line drawings that follow the text color).
const ico=(d)=>`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const TAB_ICONS={
 feed:ico('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/>'),
 play:ico('<path d="M7 21V3l11 4.5L7 12"/><ellipse cx="10" cy="21" rx="6" ry="1.5"/>'),
 trips:ico('<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'),
 board:ico('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M12 8.5v7M14.2 10.2c-.4-.8-1.2-1.2-2.2-1.2-1.3 0-2.2.7-2.2 1.6 0 2.2 4.6 1 4.6 3.2 0 .9-1 1.7-2.4 1.7-1.1 0-2-.5-2.4-1.3"/>'),
 leaders:ico('<path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5v1.5A3.5 3.5 0 0 0 8.5 11M16 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 13v4M8.5 20h7M10 17h4"/>'),
 friends:ico('<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="16.5" cy="9.5" r="2.6"/><path d="M16 14.2c2.4.2 4 1.8 4.5 4.3"/>'),
 me:ico('<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5c.8-4 3.8-6.2 7.5-6.2s6.7 2.2 7.5 6.2"/>')
};
function renderTabs(){
 const hide=S.status==='auth'||S.status==='setup';
 const ready=S.status==='ready';
 const badges={friends:ready?incoming().length:0,board:ready?S.board.filter(needsMyPick).length:0};
 const cur=S.view==='settings'||S.view==='player'&&(S.arg||S.me)===S.me?'me':(S.view==='trip'||S.view==='newtrip')?'trips':S.view==='newbet'?'board':(S.view==='round'||S.view==='player')?'':S.view;
 const t=[['feed','Feed'],['play',draft?'Round':'Play'],['trips','Trips'],['board','Board'],['leaders','Leaders'],['friends','Friends'],['me','Me']];
 $('#tabs').innerHTML=hide?'':`<div>${t.map(([k,l])=>`<button data-nav="${k}" ${cur===k?'aria-current="page"':''}><span class="ti">${TAB_ICONS[k]}</span><span class="tl">${l}</span>${badges[k]?`<span class="badge">${badges[k]}</span>`:''}</button>`).join('')}</div>`;
}
// Sandie logo: the splash screen's emblem (gold ring, flag, ball in the bunker).
const LOGO=`<svg class="logo" viewBox="0 0 168 168" aria-hidden="true"><circle cx="84" cy="84" r="80" fill="none" stroke="#E3B04B" stroke-width="6"/><g transform="translate(32 24)"><line x1="34" y1="10" x2="34" y2="104" stroke="#F3EAD3" stroke-width="5" stroke-linecap="round"/><path d="M36 12 L92 28 L36 46 Z" fill="#E3B04B"/><path d="M8 104 C 14 92, 40 90, 60 94 C 76 97, 94 94, 98 102 C 102 112, 80 116, 54 116 C 28 116, 4 114, 8 104 Z" fill="#E2CF9F"/><circle cx="66" cy="98" r="9" fill="#F3EAD3"/></g></svg>`;
// Every page starts with the brand bar (logo, wordmark, your index), then the page title.
// action: optional button shown at the right of the page title (e.g. the Settings gear).
function header(title,eyebrow,action){
 const ready=S.status==='ready',sub=[eyebrow&&eyebrow!=='Sandie'?eyebrow:'',S.offline&&ready?'Offline':''].filter(Boolean).join(' · ');
 return `<header class="brandbar"><button class="brand" data-nav="feed" aria-label="Sandie, go to Feed">${LOGO}<span class="wm">Sandie<em>.</em></span></button>${ready?`<button class="idx" data-nav="me" aria-label="Your handicap index"><b>${fmtIdx(myIndex())}</b><span>Index</span></button>`:''}</header>
 <div class="ptitle"><div style="min-width:0">${sub?`<span class="eyebrow">${esc(sub)}</span>`:''}<h1>${esc(title)}</h1></div>${action||''}</div>`;
}
// Avatar circle: the player's photo if they've added one, otherwise colored initials.
// Only photos from this app's own avatars bucket are shown.
const AVATAR_PREFIX=(CFG.supabaseUrl||'')+'/storage/v1/object/public/avatars/';
const photoOf=(id)=>{const u=S.profiles[id]&&S.profiles[id].avatar_url;return u&&u.startsWith(AVATAR_PREFIX)?u:null};
const av=(id,cls='')=>{const u=photoOf(id);return u?`<img class="av ${cls}" src="${esc(u)}" alt="" loading="lazy" decoding="async">`
 :`<span class="av ${cls}" style="background:${avColor(id)}" aria-hidden="true">${esc(initials(handle(id)))}</span>`};
// Small photo circle next to a name in tables and lists.
const withPic=(id,label)=>`<span class="npic">${av(id,'xs')}<span>${esc(label)}</span></span>`;

function offlineView(){
 const msg=!configured?'This copy isn’t connected to a database yet. Add your Supabase details to config.js (see README.md).'
  :!window.supabase?'You’re offline and the app hasn’t been opened online on this phone yet. Connect once to sign in.'
  :'Your scores didn’t load. Check your connection and reload.';
 return `<div class="card note"><p style="margin:0">${msg}</p></div><button class="primary wide" data-nav="play">Keep score anyway</button>`;
}
function authView(){
 const up=S.authStep==='signup';
 return `${header(up?'Create Account':'Sign In','Sandie')}
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
 return `${header('Welcome','Sandie')}
 <div class="card"><label for="handle">Your name in the app</label><input id="handle" maxlength="30" autocomplete="nickname" placeholder="e.g. Alec C.">
 <p class="hint">This is how friends will see you.</p>
 <button class="primary wide" style="margin-top:14px" data-act="join" ${S.busy?'disabled':''}>Continue</button></div>`;
}

function allFeedRounds(){
 return [S.me,...friendIds()].flatMap(id=>S.rounds[id]||[]).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.at||0)-(a.at||0));
}
// Per-hole extras (beers, rips; stored as "gb") added up for a round.
const holeSum=(r,k)=>(r.holes||[]).reduce((a,h)=>a+(+h[k]||0),0);
const extrasTags=(r)=>{const b=holeSum(r,'beer'),sh=holeSum(r,'shot'),g=holeSum(r,'gb'),c=holeSum(r,'club'),m=holeSum(r,'mush');return (b?`<span class="tag gold">🍺 ${b}</span>`:'')+(sh?`<span class="tag gold" title="Shotguns">💥 ${sh}</span>`:'')+(g?`<span class="tag">💨 ${g}</span>`:'')+(c?`<span class="tag red" title="Thrown clubs">🪃 ${c}</span>`:'')+(m?`<span class="tag" title="Mushrooms">🍄 ${m}</span>`:'')};
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
 <button class="fhead" data-player="${esc(r.uid)}" aria-label="View ${esc(mine?'your':handle(r.uid)+'’s')} profile">${av(r.uid)}<div class="mid"><b>${esc(mine?'You':handle(r.uid))}${ix!=null?` <span class="fidx">${fmtIdx(ix)}</span>`:''}</b></div><span class="fwhen">${relDay(r.date)}</span></button>
 <button class="fmain" data-round="${key}" aria-label="Open ${esc(mine?'your':handle(r.uid)+'’s')} round at ${esc(r.course)}">
  <div class="fcourse">${FLAG}<span>${esc(r.course)}</span></div>
  <div class="ftee">${[r.tee?esc(r.tee)+' tees':'',r.n===9?(r.nine==='back'?'Back 9':'Front 9'):''].filter(Boolean).join(' · ')}</div>
  <div class="rings">${rings.map(([l,v,s,c])=>`<div class="ring"><span class="rl">${l}</span><b style="--ring:${c}">${v}</b><small>${s}</small></div>`).join('')}</div>
  <div class="tags">${rateBadge(r)}${extrasTags(r)}${att.length?`<span class="tag">✋ Attested by ${esc(namesList(att))}</span>`:''}${r.enteredBy&&r.enteredBy!==r.uid?`<span class="tag">✍️ Scored by ${esc(r.enteredBy===S.me?'you':handle(r.enteredBy))}</span>`:''}${r.pending?'<span class="tag red">Waiting to post</span>':''}</div>
 </button>
 ${r.pending?'':`<div class="factions">
  <button data-like="${esc(r.id)}" aria-pressed="${likes.includes(S.me)}">👍 <span>${likes.length?likes.length+' ':''}Like${likes.length===1||!likes.length?'':'s'}</span></button>
  <button data-comments="${key}">💬 <span>${coms.length?coms.length+' ':''}Comment${coms.length===1||!coms.length?'':'s'}</span></button>
  ${mine?'':`<button data-attest="${esc(r.id)}" aria-pressed="${att.includes(S.me)}">✋ <span>${att.includes(S.me)?'Attested':'Attest'}</span></button>`}
 </div>
 <div class="fcomments">
  ${coms.length>3?`<button class="link" data-comments="${key}">View all ${coms.length} comments</button>`:''}
  ${coms.slice(-3).map(c=>`<p><button class="link plain namelink" data-player="${esc(c.user_id)}">${esc(c.user_id===S.me?'You':handle(c.user_id))}</button> ${esc(c.body)}</p>`).join('')}
  <div class="row"><input id="fc-${esc(r.id)}" maxlength="500" placeholder="Add a comment…" autocomplete="off" aria-label="Comment on this round"><button style="flex:none" data-act="postcomment" data-id="${esc(r.id)}" data-input="fc-${esc(r.id)}">Post</button></div>
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
/* ---------- settings ---------- */
const APP_VERSION='v46';
const GEAR=`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.86a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.26.6.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z"/></svg>`;
// Settings: grouped like a phone's settings app. Profile, Payments, Account, About.
function settingsView(){
 const photo=photoOf(S.me),venmo=(S.venmo||{})[S.me]||'';
 let h=header('Settings','',`<button class="link" data-nav="me">Done</button>`);
 h+=`<div class="setgroup"><div class="sethead">Profile</div>
  <div class="setprof">${photo?`<button class="plain photobtn" data-viewphoto="${esc(S.me)}" aria-label="View your photo full size">${av(S.me,'lg')}</button>`:av(S.me,'lg')}
   <div style="min-width:0"><b class="pname">${esc(me().handle||'')}</b><span class="hint" style="margin:0">Friend code ${esc(me().friend_code||'')}</span></div></div>
  <div class="setrow"><span class="setlab">Profile Photo</span><div class="setctl">
   <label class="setbtn" for="avfile">${S.busy==='photo'?'Uploading…':photo?'Change':'Add Photo'}</label><input id="avfile" type="file" accept="image/*" hidden>
   ${photo?(S.confirm==='rmphoto'?`<button class="setbtn red" data-act="rmphoto">Remove</button><button class="setbtn" data-act="cancelc">Keep</button>`:`<button class="setbtn red-t" data-act="ask" data-c="rmphoto">Remove</button>`):''}</div></div>
  <div class="setrow col"><label class="setlab" for="newname">Display Name</label>
   <div class="row"><input id="newname" maxlength="30" autocomplete="nickname" value="${esc(me().handle||'')}"><button class="setbtn" style="flex:none" data-act="savename">Save</button></div>
   <p class="hint" style="margin:6px 0 0">How friends see you in feeds, trips and leaderboards.</p></div>
 </div>`;
 h+=`<div class="setgroup"><div class="sethead">Payments</div>
  <div class="setrow col"><label class="setlab" for="venmo">Venmo Username</label>
   <div class="row"><span class="setat">@</span><input id="venmo" maxlength="30" autocapitalize="none" autocomplete="off" placeholder="your-venmo" value="${esc(venmo)}"><button class="setbtn" style="flex:none" data-act="savevenmo">Save</button></div>
   <p class="hint" style="margin:6px 0 0">Only your friends can see this. It shows on your profile and next to what people owe you.</p></div>
 </div>`;
 h+=notifSettings();
 h+=`<div class="setgroup"><div class="sethead">Account</div>
  <div class="setrow"><span class="setlab">Signed In As</span><span class="setval">${esc(S.email||'—')}</span></div>
  ${S.confirm==='signout'?`<div class="setrow"><span class="setlab">Sign out of Sandie on this phone?</span><div class="setctl"><button class="setbtn red" data-act="signout">Sign Out</button><button class="setbtn" data-act="cancelc">Cancel</button></div></div>`
   :`<button class="setrow setlink red-t" data-act="ask" data-c="signout"><span class="setlab">Sign Out</span><span aria-hidden="true">›</span></button>`}
 </div>`;
 h+=`<div class="setgroup"><div class="sethead">About</div>
  <div class="setrow"><span class="setlab">App</span><span class="setval">Sandie · ${esc(APP_VERSION)}</span></div>
  <a class="setrow setlink" href="https://opengolfapi.org/attribution" target="_blank" rel="noopener"><span class="setlab">Course Data</span><span class="setval">OpenGolfAPI ›</span></a>
 </div>`;
 if(S.photoView===S.me&&photo)h+=`<div class="overlay photo-ov" role="dialog" aria-label="Profile photo"><div class="row" style="flex:none"><b style="color:#fff">You</b><button data-act="closephoto" style="flex:none">Close</button></div><img src="${esc(photo)}" alt="Your profile photo"></div>`;
 return h;
}

/* ---------- push notifications ---------- */
// Categories match push_prefs.off in the database (supabase/push.sql).
const PUSH_CATS=[
 ['friends','Friend Requests','Requests and accepts'],
 ['social','Likes & Comments','Likes, comments and attests on your rounds'],
 ['rounds','Rounds Posted for You','When a friend scores your round'],
 ['board','Betting Board','New bets from friends, wins and losses'],
 ['money','Money','Trip settle-ups and “you owe me” reminders'],
 ['titles','Leaderboard Titles','When you win or lose a title'],
 ['trips','Trip Tee Times','Added to a group, tee time changes, and a reminder the night before'],
];
const isIOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const pushCapable=()=>location.protocol==='https:'&&'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window&&!!CFG.vapidPublicKey;
function pushStatus(){
 if(!pushCapable())return isIOS&&!standalone()?'install':'unsupported';
 if(Notification.permission==='denied')return 'denied';
 return S.pushOn?'on':'off';
}
const b64Bytes=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');return Uint8Array.from(atob(s+'==='.slice((s.length+3)%4)),c=>c.charCodeAt(0))};
const subArgs=sub=>{const j=sub.toJSON();return{endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth}};
// Keeps this phone's registration current (push services rotate them) and loads your settings.
async function pushSync(){
 if(!pushCapable()||!sb||!S.me)return;
 try{
  const reg=await navigator.serviceWorker.ready,sub=await reg.pushManager.getSubscription();
  S.pushOn=!!sub&&Notification.permission==='granted';
  if(S.pushOn){const {error}=await sb.rpc('save_push_subscription',subArgs(sub));if(error)console.error(error)}
  const {data}=await sb.from('push_prefs').select('off').eq('user_id',S.me).maybeSingle();
  S.pushOff=data&&data.off||[];
  if(S.view==='settings')render();
 }catch(e){console.error(e)}
}
async function pushOn(){
 if(S.busy)return;
 S.busy='push';render();
 try{
  const perm=await Notification.requestPermission();
  if(perm!=='granted'){S.busy=false;render();return toast(perm==='denied'?'Notifications are blocked. Allow them for Sandie in your phone’s Settings.':'Notifications weren’t turned on.')}
  const reg=await navigator.serviceWorker.ready;
  const sub=await reg.pushManager.getSubscription()||await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64Bytes(CFG.vapidPublicKey)});
  const {error}=await sb.rpc('save_push_subscription',subArgs(sub));if(error)throw error;
  S.pushOn=true;toast('Notifications on');
 }catch(e){fail(e,'Couldn’t turn on notifications.')}
 S.busy=false;render();
}
// quiet: used on sign-out so the next person on this phone doesn't get your notifications.
async function pushOff(quiet){
 try{
  const reg=pushCapable()&&await navigator.serviceWorker.getRegistration(),sub=reg&&await reg.pushManager.getSubscription();
  if(sub){await sb.from('push_subscriptions').delete().eq('endpoint',sub.endpoint);await sub.unsubscribe()}
  S.pushOn=false;
  if(!quiet){toast('Notifications off on this phone');render()}
 }catch(e){if(!quiet)fail(e,'Couldn’t turn off notifications.')}
}
async function pushCat(k){
 const off=new Set(S.pushOff||[]);off.has(k)?off.delete(k):off.add(k);
 S.pushOff=[...off];render();
 const {error}=await sb.from('push_prefs').upsert({user_id:S.me,off:S.pushOff});
 if(error)fail(error,'Couldn’t save that setting.');
}
function notifSettings(){
 const st=pushStatus(),note=(t,p)=>`<div class="setrow col"><span class="setlab">${t}</span><p class="hint" style="margin:0">${p}</p></div>`;
 let h=`<div class="setgroup"><div class="sethead">Notifications</div>`;
 if(st==='install')h+=note('Add Sandie to Your Home Screen First','On iPhone, notifications only work in the home-screen app. In Safari, tap Share, then Add to Home Screen, and open Sandie from there.');
 else if(st==='unsupported')h+=note('Not Available Here','This browser can’t show notifications. Use Sandie from your iPhone home screen, or Chrome on Android.');
 else if(st==='denied')h+=note('Notifications Are Blocked','Allow notifications for Sandie in your phone’s Settings, then come back here.');
 else{
  h+=`<div class="setrow"><span class="setlab">Notifications on This Phone</span><div class="setctl">${st==='on'?`<button class="setbtn" data-act="pushoff">Turn Off</button>`
   :`<button class="setbtn go" data-act="pushon" ${S.busy==='push'?'disabled':''}>${S.busy==='push'?'Turning On…':'Turn On'}</button>`}</div></div>`;
  if(st==='on')h+=PUSH_CATS.map(([k,l,n])=>{const on=!(S.pushOff||[]).includes(k);
   return `<button class="setrow setlink" role="switch" aria-checked="${on}" data-pushcat="${k}"><span class="setlab">${l}<small>${n}</small></span><span class="switch" aria-hidden="true"></span></button>`}).join('');
  else h+=`<div class="setrow col"><p class="hint" style="margin:0">Get a buzz for friend requests, comments, bets, settle-ups and Leaderboard titles.</p></div>`;
 }
 return h+`</div>`;
}
// Opening a notification: ?go=view&id=… on a cold start, or a message from the service worker.
function openLink(href){
 let q;try{q=new URL(href,location.href).searchParams}catch(e){return}
 const v=q.get('go'),id=q.get('id')||undefined;
 if(!v||!VIEWS.includes(v))return;
 if(v==='round'){const u=Object.keys(S.rounds).find(x=>(S.rounds[x]||[]).some(r=>r.id===id));return u?go('round',u+'/'+id):go('feed')}
 go(v,id);
}
// Messages only the app can work out (who owes whom, who took a title) go through push_outbox.
async function sendSettleUp(id){
 const t=S.trips.find(x=>x.id===id);if(!t)return;
 // Net bets and receipts together, so each pair of players gets one number.
 const pair={},lines={},add=(u,l)=>(lines[u]=lines[u]||[]).push(l);
 [...settleBets(t).pays,...settleReceipts(t).pays].forEach(p=>{const [a,b]=[p.from,p.to].sort(),k=a+'|'+b;pair[k]=(pair[k]||0)+(p.from===a?p.amt:-p.amt)});
 for(const k in pair){
  const [a,b]=k.split('|'),v=Math.round(pair[k]*100)/100;if(Math.abs(v)<0.01)continue;
  const [from,to,amt]=v>0?[a,b,v]:[b,a,-v];
  add(from,{u:to,amt,dir:'owe'});add(to,{u:from,amt,dir:'owed'});
 }
 const rows=Object.entries(lines).filter(([u])=>u!==S.me).map(([u,l])=>({recipient:u,kind:'owe',trip_id:t.id,lines:l.slice(0,12)}));
 if(!rows.length)return;
 const {error}=await sb.from('push_outbox').insert(rows);
 if(error)console.error(error);else toast('Settle-up sent to '+rows.length+' player'+(rows.length===1?'':'s'));
}
async function nudge(u,amt,trip,ledger){
 const row={recipient:u,kind:'nudge',amount:amt};if(trip)row.trip_id=trip;else if(ledger==='board'||ledger==='games')row.ledger=ledger;
 const {error}=await sb.from('push_outbox').insert(row);
 if(error)return /already reminded/i.test(error.message||'')?toast('You already reminded '+handle(u)+' today.'):fail(error,'Couldn’t send the reminder.');
 toast('Reminder sent to '+handle(u));
}
// After you post, friends who gained or lost a Leaderboard title hear about it.
async function announceTitles(before){
 const after=titleHolders(),rows=[],mine=[];
 for(const k in after){
  const was=(before[k]||{who:[]}).who,now=after[k].who,gained=now.filter(u=>!was.includes(u));
  if(!gained.length)continue;
  gained.forEach(u=>u===S.me?mine.push(after[k].c):rows.push({recipient:u,kind:'title',title_k:k}));
  was.filter(u=>!now.includes(u)&&u!==S.me).forEach(u=>rows.push({recipient:u,kind:'title',title_k:k,lost:true,other:gained[0]}));
 }
 if(mine.length)setTimeout(()=>toast(mine.map(c=>c.emo+' You’re the new '+c.title).join(' · ')),1500);
 if(rows.length){const {error}=await sb.from('push_outbox').insert(rows);if(error)console.error(error)}
}

/* ---------- leaderboard ---------- */
// Titles: whoever leads a Leaderboard category (you and your friends, all time) earns that
// category's title (LB_CATS title/emo). Ties share it. Count categories need at least 1;
// "lowest wins" categories need at least two players with a value, so there's competition.
// titleHolders: {categoryKey: {c, best, who:[uids]}} for you and your friends.
function titleHolders(){
 const group=[S.me,...friendIds()],out={};if(group.length<2)return out;
 LB_CATS.filter(c=>c.title).forEach(c=>{
  const vals=group.map(x=>{const all=S.rounds[x]||[];return [x,c.val(all,all)]}).filter(([,v])=>v!=null&&(c.low||v>0));
  if(!vals.length||(c.low&&vals.length<2))return;
  const best=c.low?Math.min(...vals.map(v=>v[1])):Math.max(...vals.map(v=>v[1]));
  out[c.k]={c,best,who:vals.filter(v=>v[1]===best).map(v=>v[0])};
 });
 return out;
}
function leaderTitles(u){
 if(![S.me,...friendIds()].includes(u))return [];
 return Object.values(titleHolders()).filter(x=>x.who.includes(u)).map(x=>({...x.c,value:x.best}));
}
// Every category ranks you and your friends over the chosen period.
// low:true means the smallest number leads. Values of null mean "not enough rounds".
const LB_PERIODS=[['all','All Time'],['year','This Year'],['30','Last 30 Days']];
const per18=(rs,f)=>{const h=rs.reduce((a,r)=>a+r.n,0);return h?Math.round(rs.reduce((a,r)=>a+f(r),0)/h*18*10)/10:null};
const LB_CATS=[
 {k:'hcp',label:'Handicap Index',title:'Low Man',emo:'🎯',low:true,fmt:fmtIdx,val:(rs,all)=>hcp(all).index,note:'Current index from the last 20 rated rounds (ignores the period filter).'},
 {k:'avg',label:'Avg Score',title:'Steady Eddie',emo:'📉',low:true,val:rs=>{const f=rs.filter(r=>r.complete&&r.n===18);return f.length?Math.round(f.reduce((a,r)=>a+r.score,0)/f.length*10)/10:null},note:'Average of finished 18-hole rounds.'},
 {k:'best',label:'Best Round',title:'Course Record',emo:'🔥',low:true,val:rs=>{const f=rs.filter(r=>r.complete&&r.n===18);return f.length?Math.min(...f.map(r=>r.score)):null},note:'Lowest finished 18-hole score.'},
 {k:'t5',label:'Tiger 5 Misses',title:'Tiger Tamer',emo:'🐯',low:true,fmt:v=>v.toFixed(1),val:rs=>per18(rs.filter(r=>r.complete),r=>r.t5),note:'Tiger 5 misses per 18 holes.'},
 {k:'putts',label:'Putts',title:'Flat Stick',emo:'🪄',low:true,fmt:v=>v.toFixed(1),val:rs=>per18(rs.filter(r=>r.complete&&r.putts!=null),r=>r.putts),note:'Putts per 18 holes (rounds with putts on every hole).'},
 {k:'birdies',label:'Birdies',title:'Birdie Machine',emo:'🐦',val:rs=>rs.reduce((a,r)=>a+(r.holes||[]).filter(h=>played(h)&&h.score<h.par).length,0),note:'Birdies or better, total.'},
 {k:'rounds',label:'Rounds Played',title:'Grinder',emo:'🗓️',val:rs=>rs.length,note:'Rounds posted.'},
 {k:'trophy',label:'🏆 Trophy Rounds',title:'Trophy Hunter',emo:'🏆',val:rs=>rs.filter(r=>r.complete&&r.t5<=3).length,note:'Finished rounds with 3 or fewer Tiger 5 misses.'},
 {k:'poo',label:'💩 Poo Rounds',title:'Poo Lord',emo:'💩',shame:true,val:rs=>rs.filter(r=>r.t5>=4).length,note:'Rounds with 4 or more Tiger 5 misses. Wall of shame.'},
 {k:'beer',label:'🍺 Beers',title:'Beer Boss',emo:'🍺',val:rs=>rs.reduce((a,r)=>a+holeSum(r,'beer'),0),note:'Beers logged on the course.'},
 {k:'shot',label:'💥 Shotguns',title:'Shotgun Sheriff',emo:'💥',val:rs=>rs.reduce((a,r)=>a+holeSum(r,'shot'),0),note:'Beers shotgunned. Counted inside the beer total too.'},
 {k:'gb',label:'💨 Rips',title:'Geeb God',emo:'💨',val:rs=>rs.reduce((a,r)=>a+holeSum(r,'gb'),0),note:'Rips logged on the course.'},
 {k:'club',label:'🪃 Thrown Clubs',title:'Club Chucker',emo:'🪃',shame:true,val:rs=>rs.reduce((a,r)=>a+holeSum(r,'club'),0),note:'Clubs thrown. Wall of shame.'},
 {k:'mush',label:'🍄 Mushrooms',title:'Mush Man',emo:'🍄',val:rs=>rs.reduce((a,r)=>a+holeSum(r,'mush'),0),note:'Mushrooms logged on the course.'},
];
function leadersView(){
 let h=header('Leaderboard');
 const per=S.lbPeriod||'all',cat=LB_CATS.find(c=>c.k===S.lbCat)||LB_CATS[0];
 const from=per==='year'?new Date().getFullYear()+'-01-01':per==='30'?isoDate(new Date(Date.now()-30*864e5)):'0000';
 h+=`<div class="ttabs" role="tablist" aria-label="Period">${LB_PERIODS.map(([k,l])=>`<button role="tab" data-lbper="${k}" aria-selected="${per===k}">${l}</button>`).join('')}</div>`;
 h+=`<div class="lbcats" role="tablist" aria-label="Category">${LB_CATS.map(c=>`<button role="tab" data-lbcat="${c.k}" aria-selected="${c===cat}">${c.label}</button>`).join('')}</div>`;
 const rows=[S.me,...friendIds()].map(u=>{const all=S.rounds[u]||[],rs=all.filter(r=>r.date>=from);return{u,v:cat.val(rs,all)}});
 const ranked=rows.filter(r=>r.v!=null).sort((a,b)=>cat.low?a.v-b.v:b.v-a.v),none=rows.filter(r=>r.v==null);
 const fmt=cat.fmt||(v=>String(v)),medal=['🥇','🥈','🥉'];
 let rank=0,prev=null;
 h+=`<div class="card"><div class="bet-head"><b>${esc(cat.label)}</b><span class="hint" style="margin:0">${esc(LB_PERIODS.find(p=>p[0]===per)[1])}</span></div><p class="hint" style="margin:2px 0 8px">${esc(cat.note)}</p>`;
 if(!ranked.length)h+=`<p class="hint" style="margin:0 0 4px">Nobody qualifies yet for this period.</p>`;
 h+=`<table class="lbtable"><tbody>${ranked.map((r,i)=>{if(r.v!==prev){rank=i+1;prev=r.v}return `<tr class="${r.u===S.me?'mine':''}"><td class="lbrank">${rank<=3&&(cat.low||r.v>0)?medal[rank-1]:rank}</td><td><button class="plain namelink" data-player="${esc(r.u)}">${withPic(r.u,r.u===S.me?'You':handle(r.u))}</button></td><td class="n">${esc(fmt(r.v))}</td></tr>`}).join('')}${none.map(r=>`<tr><td class="lbrank">–</td><td style="color:var(--mute)">${withPic(r.u,r.u===S.me?'You':handle(r.u))}</td><td class="n" style="color:var(--mute);font-weight:400">—</td></tr>`).join('')}</tbody></table>`;
 h+=`</div>`;
 if(!friendIds().length)h+=`<p class="sub">Add friends to see how you stack up.</p>`;
 return h;
}
function feedView(){
 const rs=allFeedRounds().slice(0,80);
 let h=header('Feed');
 const inc=incoming().length;
 if(inc)h+=`<button class="card item note" data-nav="friends"><div class="mid"><b>${inc} friend request${inc>1?'s':''}</b><span>Tap to review</span></div></button>`;
 const waiting=S.board.filter(needsMyPick).length;
 if(waiting)h+=`<button class="card item note" data-nav="board"><div class="mid"><b>${waiting} bet${waiting>1?'s':''} waiting for your pick</b><span>On the Betting Board</span></div><span class="tag gold">Pick</span></button>`;
 S.trips.filter(t=>tripStatus(t)==='live').forEach(t=>h+=`<button class="card item note" data-trip="${esc(t.id)}"><div class="mid"><b>${esc(t.name)}</b><span>Trip happening now · ${(S.bets[t.id]||[]).length} bets</span></div><span class="tag gold">Leaderboards</span></button>`);
 if(draft)h+=`<button class="card item" data-nav="play"><div class="mid"><b>Round in Progress</b><span>${esc(draft.course)}</span></div><span class="tag">Resume</span></button>`;
 if(!rs.length)h+=`<div class="card empty"><b>No Posted Rounds Yet</b>Play a round and post it, or add friends to see theirs here.<div class="row" style="margin-top:14px"><button class="primary" data-nav="play">Start a round</button><button data-nav="friends">Add friends</button></div></div>`;
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
 h+=mayKnow();
 h+=`<h2>Find Friends</h2><div class="card">
  <label for="fsearch" style="margin-top:0">Search by name, email or friend code</label>
  <div class="row"><input id="fsearch" type="search" maxlength="100" autocapitalize="none" autocomplete="off" placeholder="e.g. Jonathan or jon@example.com"><button style="flex:none" data-act="search" ${S.searching?'disabled':''}>${S.searching?'Searching…':'Search'}</button></div>
  ${searchResults()}</div>`;
 h+=`<h2>Invite Friends</h2><div class="card"><p style="margin-top:0">Not using the app yet? Send your invite link. Friends can also search for your code.</p>
  <div class="row"><span class="code">${esc(me().friend_code||'——')}</span><button class="primary" data-act="share">Share Invite Link</button></div></div>`;
 h+=`<h2>Handicap Standings</h2>`;
 const st=[S.me,...fr].map(id=>({id,h:hcp(S.rounds[id]),n:(S.rounds[id]||[]).length})).sort((a,b)=>(a.h.index==null)-(b.h.index==null)||(a.h.index||0)-(b.h.index||0));
 h+=`<div class="card"><table><thead><tr><th>Player</th><th class="n">Rounds</th><th class="n">Index</th></tr></thead><tbody>${st.map((s,i)=>`<tr><td><button class="link plain" style="color:var(--ink);text-decoration:none;font-weight:600" data-player="${esc(s.id)}">${i+1}. ${withPic(s.id,s.id===S.me?'You':handle(s.id))}</button></td><td class="n" style="font-weight:400">${s.n}</td><td class="n">${fmtIdx(s.h.index)}</td></tr>`).join('')}</tbody></table>${fr.length?'':`<p class="hint">Add friends to compare handicaps.</p>`}</div>`;
 if(fr.length){h+=`<h2>Your Friends</h2>`;fr.forEach(id=>{const x=hcp(S.rounds[id]);h+=`<div class="card item"><button class="item plain" data-player="${esc(id)}">${av(id)}<div class="mid"><b>${esc(handle(id))}</b><span>Index ${fmtIdx(x.index)} · ${(S.rounds[id]||[]).length} rounds</span></div></button>${S.confirm==='rm:'+id?`<button data-act="unfriend" data-id="${esc(id)}">Remove</button><button class="link" data-act="cancelc">Keep</button>`:`<button class="link" data-act="ask" data-c="rm:${esc(id)}">Remove</button>`}</div>`})}
 if(out.length){h+=`<h2>Waiting on Them</h2>`;out.forEach(id=>h+=`<div class="card item">${av(id)}<div class="mid"><b>${esc(handle(id))}</b><span>Request sent</span></div><button class="link" data-act="unfriend" data-id="${esc(id)}">Cancel</button></div>`)}
 return h;
}

// Friends of your friends, most mutual friends first. Hidden ones stay hidden on this phone.
const HIDEKEY='sandie-hide-suggest';
function mayKnow(){
 const hidden=LS.get(HIDEKEY,[]),list=(S.suggest||[]).filter(p=>!hidden.includes(p.id)&&!S.friendships.some(f=>other(f)===p.id)).slice(0,6);
 if(!list.length)return '';
 return `<h2>People You May Know</h2>`+list.map(p=>{
  const names=(p.mutual_ids||[]).filter(isFriend).map(handle),more=p.mutual-names.length;
  const why=`${p.mutual} mutual friend${p.mutual===1?'':'s'}${names.length?' · '+names.join(', ')+(more>0?' +'+more:''):''}`;
  return `<div class="card item">${av(p.id)}<div class="mid"><b>${esc(p.handle)}</b><span>${esc(why)}</span></div><button class="primary" data-act="add" data-id="${esc(p.id)}">Add</button><button class="link" data-act="hidesuggest" data-id="${esc(p.id)}" aria-label="Hide ${esc(p.handle)}">Hide</button></div>`;
 }).join('');
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
 if(!mineView&&!isFriend(id))return header(handle(id),'Player')+`<div class="card empty"><b>Scores Are Shared Between Friends</b>Add ${esc(handle(id))} as a friend to see all their rounds.<div style="margin-top:14px">${friendAction(id,'Add Friend')}</div></div>`;
 const rounds=S.rounds[id]||[],x=hcp(rounds);
 let h=header(mineView?'Your Card':handle(id),mineView?'Sandie':'Friend',mineView?`<button class="gear" data-nav="settings" aria-label="Settings">${GEAR}</button>`:'');
 // Profile photo (tap to see it full size); your photo, name and Venmo are edited in Settings.
 h+=`<div class="phead">${photoOf(id)?`<button class="plain photobtn" data-viewphoto="${esc(id)}" aria-label="View ${esc(mineView?'your':handle(id)+'’s')} photo full size">${av(id,'lg')}</button>`:av(id,'lg')}${mineView?`<div><b class="pname">${esc(me().handle||'')}</b><p class="hint" style="margin:2px 0 0">${rounds.length} rounds posted · Friend code ${esc(me().friend_code||'')}</p>${venmoLink(S.me)?`<p style="margin:6px 0 0">${venmoLink(S.me)}</p>`:''}</div>`:`<div><p class="hint" style="margin:0">${(S.rounds[id]||[]).length} rounds posted</p>${venmoLink(id)?`<p style="margin:6px 0 0">${venmoLink(id)}</p>`:''}</div>`}</div>`;
 const complete=rounds.filter(r=>r.complete),holes=complete.reduce((a,r)=>a+r.n,0);
 const t5per18=holes?complete.reduce((a,r)=>a+r.t5,0)/holes*18:null;
 const f18=complete.filter(r=>r.n===18);
 h+=`<div class="card big"><div><b>${fmtIdx(x.index)}</b><span>Handicap Index</span></div><div><b>${f18.length?Math.round(f18.reduce((a,r)=>a+r.score,0)/f18.length):'—'}</b><span>Avg 18-Hole Score</span></div><div><b>${t5per18==null?'—':t5per18.toFixed(1)}</b><span>Tiger 5 Misses per 18</span></div></div>`;
 // Rating from Tiger 5 misses per 18: under 3 God Tier, 3–5 Goated, above 5 Average.
 // Leaderboard leaders also get title badges (Low Man, Beer Boss, Geeb God and the rest).
 if(t5per18!=null){const v=Math.round(t5per18*10)/10,tier=v<3?0:v<=5?1:2;
  const tiers=[['👑','God Tier','Under 3'],['🐐','Goated','3–5'],['😐','Average','5+']];
  // Title badges for every Leaderboard category the player leads (see leaderTitles).
  // Emoji, tier name and the number on one row; a compact 3-part scale; each title as its own badge.
  h+=`<div class="card rating">
   <div class="rtop"><span class="remo" aria-hidden="true">${tiers[tier][0]}</span>
    <div class="rmid"><span class="rl">Rating</span><b class="rname${tier<2?' pos':''}">${tiers[tier][1]}</b></div>
    <div class="rnum"><b>${v.toFixed(1)}</b><span>Tiger 5 misses<br>per 18</span></div></div>
   <div class="rscale" role="list" aria-label="Rating scale">${tiers.map(([e,l,r],i)=>`<div role="listitem" class="${i===tier?'on':''}"${i===tier?' aria-current="true"':''}><b>${l}</b><span>${r}</span></div>`).join('')}</div>
   ${(()=>{const ts=leaderTitles(id);return ts.length?`<div class="rbadges">${ts.map(c=>{const what=c.label.replace(/^[^A-Za-z]+/,''),tip=`${c.title}: leads ${what} (${(c.fmt||String)(c.value)})`;return `<button class="rbadge${c.shame?' shame':''}" data-badgetip="${esc(tip)}" aria-label="${esc(tip)}"><span aria-hidden="true">${c.emo}</span>${esc(c.title)}</button>`}).join('')}</div>`:''})()}
  </div>`;}
 if(mineView)h+=unsettledCard();
 if(S.photoView===id&&photoOf(id))h+=`<div class="overlay photo-ov" role="dialog" aria-label="Profile photo" data-act="closephoto"><div class="row" style="flex:none"><b style="color:#fff">${esc(mineView?'You':handle(id))}</b><button data-act="closephoto" style="flex:none">Close</button></div><img src="${esc(photoOf(id))}" alt="${esc(handle(id))}"></div>`;
 if(x.index==null)h+=`<p class="sub">${x.rs.length?`${x.need} more rated round${x.need>1?'s':''} until ${mineView?'your':'their'} index is set.`:'Post 3 complete rounds with a course rating and slope to get an index.'}</p>`;
 if(x.rs.length)h+=`<div class="card"><b>Last ${x.rs.length} Differentials</b>${diffChart(x)}<p class="hint" style="margin-top:4px">${x.index!=null?`Green bars are the ${x.take} lowest; they set the index (dashed line).`:'Differentials so far.'}</p></div>`;
 if(holes){
  h+=`<h2>Where the Strokes Go</h2><div class="card"><table>`;
  RULES.forEach(r=>{const c=complete.reduce((a,z)=>a+((z.per&&z.per[r.k])||0),0)/holes*18;h+=`<tr><td>${r.n}<div class="bar"><i style="width:${Math.min(100,c/3*100)}%"></i></div></td><td class="n">${c.toFixed(1)}</td></tr>`});
  h+=`</table><p class="hint">Average misses per 18 holes.</p></div>`;
 }
 if(mineView){const old=oldRounds();if(old.length)h+=`<div class="card note"><b>${old.length} round${old.length>1?'s':''} saved on this phone</b><p style="margin:4px 0 10px">These are from the old version of the app. Post them to your card so they count.</p><button class="primary" data-act="import" ${S.busy?'disabled':''}>Post ${old.length} round${old.length>1?'s':''}</button></div>`}
 h+=`<h2>Rounds</h2>`;
 h+=rounds.length?rounds.map(r=>roundItem(r,false)).join(''):`<div class="card empty"><b>No Rounds Yet</b>${mineView?'Tap Play to start your first one.':'Nothing posted yet.'}</div>`;
 return h;
}

function roundView(key){
 const [u,rid]=(key||'').split('/');
 const r=(S.rounds[u]||[]).find(z=>z.id===rid);
 if(!r)return header('Round')+`<div class="card empty"><b>Round Not Found</b>It may have been deleted.</div>`;
 const mine=u===S.me,x=hcp(S.rounds[u]),scorer=r.enteredBy&&r.enteredBy!==u?r.enteredBy:null;
 let h=header(r.course,(mine?'You':handle(u))+' · '+fmtDate(r.date));
 h+=`<button class="item plain" style="margin:0 0 8px" data-player="${esc(u)}">${av(u)}<div class="mid"><b>${esc(mine?'You':handle(u))}</b><span>View profile${scorer?' · Scored by '+esc(scorer===S.me?'you':handle(scorer)):''}</span></div></button>`;
 h+=`<p class="sub">${r.tee?esc(r.tee)+' tees · ':''}${r.rating?`${r.rating}/${r.slope}`:'No rating'}${r.n===9?' · 9 holes':''}${x.used.has(r.id)?' · <span class="tag">Counts toward index</span>':''}</p>`;
 h+=`<div class="card big"><div><b>${r.score}</b><span>${r.complete?rel(r.score-r.parPlayed)+' to par':r.holesPlayed+' holes'}</span></div><div><b>${r.net!=null?r.net:'—'}</b><span>Net${r.ch!=null?` (CH ${r.ch})`:''}</span></div><div><b>${fmtDiff(r.diff)}</b><span>Differential</span></div><div><b>${r.t5}</b><span>Tiger 5</span></div></div>`;
 const hs=r.holes||[],start=r.nine==='back'?10:1;
 const rows=(from,to)=>{const sl=hs.slice(from,to);if(!sl.length)return'';const sum=(f)=>sl.reduce((a,h)=>a+(f(h)||0),0);
  return `<div class="scroll" style="margin-bottom:8px"><table class="sc"><tr><th>Hole</th>${sl.map((_,i)=>`<th>${start+from+i}</th>`).join('')}<th>Tot</th></tr>
  <tr><td>Par</td>${sl.map(h=>`<td>${h.par}</td>`).join('')}<td>${sum(h=>h.par)}</td></tr>
  <tr><td>Score</td>${sl.map(h=>`<td class="${fails(h).length?'miss':played(h)&&h.score<h.par?'u':''}">${played(h)?h.score:'–'}</td>`).join('')}<td><b>${sum(h=>h.score)}</b></td></tr>
  <tr><td>Putts</td>${sl.map(h=>`<td>${played(h)&&h.putts!=null?h.putts:'–'}</td>`).join('')}<td>${sl.some(h=>played(h)&&h.putts!=null)?sum(h=>played(h)?h.putts:0):'–'}</td></tr>
  ${holeSum(r,'beer')?`<tr><td>Beers</td>${sl.map(h=>`<td>${h.beer||''}</td>`).join('')}<td>${sum(h=>h.beer)}</td></tr>`:''}
  ${holeSum(r,'gb')?`<tr><td>Rips 💨</td>${sl.map(h=>`<td>${h.gb||''}</td>`).join('')}<td>${sum(h=>h.gb)}</td></tr>`:''}
  ${holeSum(r,'shot')?`<tr><td>Shotgun 💥</td>${sl.map(h=>`<td>${h.shot||''}</td>`).join('')}<td>${sum(h=>h.shot)}</td></tr>`:''}
  ${holeSum(r,'club')?`<tr><td>Thrown 🪃</td>${sl.map(h=>`<td>${h.club||''}</td>`).join('')}<td>${sum(h=>h.club)}</td></tr>`:''}
  ${holeSum(r,'mush')?`<tr><td>Mush 🍄</td>${sl.map(h=>`<td>${h.mush||''}</td>`).join('')}<td>${sum(h=>h.mush)}</td></tr>`:''}</table></div>`};
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
  h+=coms.length?coms.map(c=>`<div class="comment">${av(c.user_id)}<div class="mid"><button class="link plain namelink" data-player="${esc(c.user_id)}">${esc(c.user_id===S.me?'You':handle(c.user_id))}</button> <span class="hint" style="margin:0">${relDay(c.created_at.slice(0,10))}</span><p>${esc(c.body)}</p></div>${c.user_id===S.me||mine?`<button class="link" data-delcomment="${esc(c.id)}" data-rid="${esc(r.id)}" aria-label="Delete comment">Delete</button>`:''}</div>`).join(''):`<p class="hint" style="margin:0 0 6px">No comments yet. Say something nice. Or don’t.</p>`;
  h+=`<div class="row" style="margin-top:8px"><input id="cbody" maxlength="500" placeholder="Add a comment…" autocomplete="off"><button class="primary" style="flex:none" data-act="postcomment" data-id="${esc(r.id)}" ${S.busy?'disabled':''}>Post</button></div></div>`;
 }
 // Scorecard photos (front/back) taken when the round was started.
 if((r.scorecards||[]).length)h+=`<h2>Scorecard</h2><div class="row" style="margin-bottom:12px">${r.scorecards.map((p,i)=>`<button data-act="viewscorecard" data-path="${esc(p)}">📷 ${r.scorecards.length>1?(i?'Back':'Front'):'Scorecard'}</button>`).join('')}</div>`;
 if(S.receiptView&&S.receiptView.round===r.id)h+=`<div class="overlay" role="dialog" aria-label="Scorecard photo"><div class="row" style="flex:none"><b style="color:#fff">Scorecard</b><button data-act="closereceipt" style="flex:none">Close</button></div><img src="${esc(S.receiptView.url)}" alt="Scorecard photo"></div>`;
 h+=gamesCard(r.games);
 if((mine||r.enteredBy===S.me)&&!r.pending)h+=S.confirm==='del'?`<div class="card note"><p style="margin-top:0">Delete this round for good? It also comes off ${mine?'your':'their'} handicap.</p><div class="row"><button class="danger" data-act="delround" data-id="${esc(r.id)}">Delete Round</button><button data-act="cancelc">Keep it</button></div></div>`:`<button class="wide" data-act="ask" data-c="del">Delete Round</button>`;
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
// Venmo: a link to someone's Venmo profile (handles are only readable by friends).
const venmoLink=(u,label)=>S.venmo&&S.venmo[u]?`<a class="venmo" href="https://venmo.com/u/${encodeURIComponent(S.venmo[u])}" target="_blank" rel="noopener">${label||'Venmo @'+esc(S.venmo[u])}</a>`:'';
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
function settleBets(t,raw){ // raw: as played, before payments
 const mem=S.tripMembers[t.id]||[],net={};mem.forEach(u=>net[u]=0);
 (S.bets[t.id]||[]).forEach(b=>{
  const w=betWinners(t,b),stake=+b.stake||0;if(!w.length||!stake)return;
  mem.forEach(u=>net[u]-=stake);
  const share=stake*mem.length/w.length;w.forEach(u=>net[u]+=share);
 });
 if(!raw)applyPaid(net,'bets',t.id);
 return{net,pays:fewestPayments(net)};
}
function settleReceipts(t){
 const mem=S.tripMembers[t.id]||[],ex=expenseTotals(t),net={};
 mem.forEach(u=>net[u]=Math.round((ex.paid[u]-ex.share[u])*100)/100);
 applyPaid(net,'receipts',t.id);
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
 h+=`<button class="primary wide" style="margin-bottom:14px" data-nav="newtrip">Plan a Trip</button>`;
 if(!S.trips.length)return h+`<div class="card empty"><b>No Trips Yet</b>Create a trip, add your friends, and set side bets like fewest putts. Rounds posted during the trip count automatically.</div>`;
 const done=S.trips.filter(t=>tripStatus(t)==='done'),active=S.trips.filter(t=>tripStatus(t)!=='done'),showDone=S.tripsFilter==='done';
 h+=`<div class="ttabs" style="grid-template-columns:1fr 1fr" role="tablist" aria-label="Trips"><button role="tab" data-tfilter="active" aria-selected="${!showDone}">Current Trips${active.length?`<span class="cnt">${active.length}</span>`:''}</button><button role="tab" data-tfilter="done" aria-selected="${showDone}">Completed Trips${done.length?`<span class="cnt">${done.length}</span>`:''}</button></div>`;
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
 return header('Plan a Trip','Trips')+`<div class="card">
 <label for="tname">Trip name</label><input id="tname" maxlength="60" placeholder="e.g. Myrtle Beach 2026">
 <div class="row"><div><label for="tstart">First day</label><input type="date" id="tstart" value="${today()}"></div><div><label for="tend">Last day</label><input type="date" id="tend" value="${isoDate(end)}"></div></div>
 <label>Who’s going</label>
 ${fr.length?`<div class="pick">${fr.map(id=>`<button data-tsel="${esc(id)}" aria-pressed="${S.tripSel.includes(id)}">${esc(handle(id))}</button>`).join('')}</div><p class="hint">You’re included automatically. Only friends can be added; you can add more later.</p>`
  :`<p class="hint">Add friends on the Friends tab first, then invite them here.</p>`}
 <button class="primary wide" style="margin-top:14px" data-act="createtrip" ${S.busy?'disabled':''}>Create Trip</button></div>`;
}
function tripView(id){
 const t=S.trips.find(x=>x.id===id);
 if(!t)return header('Trip','Trips')+`<div class="card empty"><b>Trip Not Found</b>It may have been deleted, or you were removed from it.</div>`;
 const mem=S.tripMembers[t.id]||[],owner=t.created_by===S.me,st=tripStatus(t),bets=S.bets[t.id]||[];
 const who=(u)=>u===S.me?'You':handle(u);
 let h=header(t.name,fmtRange(t));
 // One section at a time, picked from a row of buttons (remembered per trip).
 const tab=S.tripTabs[t.id]||(st==='done'?'standings':'tee'),exN=(S.expenses[t.id]||[]).length;
 const rs=mem.flatMap(u=>tripRounds(t,u)).sort((a,b)=>b.date.localeCompare(a.date)||(b.at||0)-(a.at||0));
 const beersTot=mem.reduce((a,u)=>a+allTripRounds(t,u).reduce((x,r)=>x+holeSum(r,'beer'),0),0),gbTot=mem.reduce((a,u)=>a+allTripRounds(t,u).reduce((x,r)=>x+holeSum(r,'gb'),0),0);
 const tabs=[['tee','Tee Times',(S.teeTimes&&S.teeTimes[t.id]||[]).length],['standings','Leaderboard',0],['bets','Bets',bets.length],['receipts','Receipts',exN],['beers','Beers 🍺',beersTot],['gb','Rips 💨',gbTot],['rounds','Rounds',rs.length],['players','Players',mem.length]];
 // Ending a trip: the organizer can end it early (later rounds stop counting and settle-up is final).
 if(st==='done')h+=`<div class="card note item" style="margin-bottom:12px"><div class="mid"><b>Trip Completed</b><span>${t.ended_at?'Ended '+fmtDate(t.end_date)+'. ':''}Bets and settle-ups are final.</span></div>${owner&&t.ended_at?`<button data-act="reopentrip">Reopen</button>`:''}</div>`;
 else if(owner)h+=S.confirm==='endtrip'?`<div class="card note" style="margin-bottom:12px"><p style="margin-top:0">End the trip now? Rounds posted after today won’t count toward bets, and settle-ups become final.</p><div class="row"><button class="danger" data-act="endtrip">End Trip</button><button data-act="cancelc">Not yet</button></div></div>`
  :`<button class="wide" style="margin-bottom:12px" data-act="ask" data-c="endtrip">End Trip</button>`;
 h+=`<div class="ttabs" role="tablist" aria-label="Trip sections">${tabs.map(([k,l,n])=>`<button role="tab" data-ttab="${k}" aria-selected="${tab===k}">${l}${n?`<span class="cnt">${n}</span>`:''}</button>`).join('')}</div>`;

 if(tab==='bets'){
 if(!bets.length)h+=`<div class="card empty"><b>No Bets Yet</b>Add one below. Leaderboards fill in from finished rounds posted ${fmtRange(t)}.</div>`;
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
   else h+=`<table style="margin-top:6px"><tbody>${s.ranked.map(r=>`<tr class="${s.leaders.includes(r.uid)?'lead':''}"><td>${withPic(r.uid,who(r.uid))}</td><td class="n" style="font-weight:400;color:var(--mute)">${r.n} rd${r.n===1?'':'s'}</td><td class="n">${r.v}</td></tr>`).join('')}${s.none.map(r=>`<tr><td style="color:var(--mute)">${withPic(r.uid,who(r.uid))}</td><td></td><td class="n" style="font-weight:400;color:var(--mute)">${b.kind==='net'?'no index':(b.kind==='putts'||b.kind==='three_putts')&&tripRounds(t,r.uid).length?'no putts':'—'}</td></tr>`).join('')}</tbody></table>`;
   if(s.uneven)h+=`<p class="hint">Players have played different numbers of rounds, so totals aren’t a fair comparison yet.</p>`;
   if(s.leaders.length)h+=`<p class="hint">${st==='done'?'Won by':'Leading:'} <b>${esc(s.leaders.map(who).join(' & '))}</b>${s.leaders.length>1&&stake?' (pot split)':''}</p>`;
  }
  h+=S.confirm==='bet:'+b.id?`<div class="row" style="margin-top:10px"><button class="danger" data-act="delbet" data-id="${esc(b.id)}">Delete Bet</button><button data-act="cancelc">Keep</button></div>`
   :`<p style="margin:8px 0 0;text-align:right"><button class="link" data-act="ask" data-c="bet:${esc(b.id)}">Delete Bet</button></p>`;
  h+=`</div>`;
 });

 const k=BET_KINDS[S.betKind];
 h+=`<div class="card"><b>Add a Bet</b>
 <label for="bkind">Bet</label><select id="bkind">${Object.entries(BET_KINDS).map(([v,x])=>`<option value="${v}" ${v===S.betKind?'selected':''}>${x.label}</option>`).join('')}</select>
 ${k.manual?`<label for="bname">What’s the bet?</label><input id="bname" maxlength="60" placeholder="e.g. Longest drive on 18">`:''}
 ${k.single||k.manual?'':`<label>Scoring</label><div class="seg">${[['total','Trip total'],['avg','Average per 18']].map(([v,l])=>`<button data-bs="${v}" aria-pressed="${S.betScoring===v}">${l}</button>`).join('')}</div>`}
 <label for="bstake">Stake per player ($)</label><input id="bstake" inputmode="decimal" placeholder="0 for bragging rights">
 <button class="primary wide" style="margin-top:14px" data-act="addbet" ${S.busy?'disabled':''}>Add Bet</button></div>`;
 }

 if(tab==='tee')h+=teeSheet(t,mem,who);
 if(tab==='standings')h+=tripStandings(t,mem,who);
 if(tab==='receipts')h+=expensesSection(t,mem,who);
 if(tab==='beers')h+=extrasBoard(t,'beer','🍺','beer','beers');
 if(tab==='gb')h+=extrasBoard(t,'gb','💨','rip','rips');

 // Bets settle up at the bottom of Bets; receipts have their own under Receipts.
 if(tab==='bets'&&bets.some(b=>+b.stake>0))h+=settleCard(t,settleBets(t),st==='done'?'Settle Up Bets':'Settle Up Bets (If the Trip Ended Now)','Bets only. Receipts settle up separately under Receipts.','bets');

 if(tab==='rounds')h+=rs.length?rs.map(r=>roundItem(r)).join(''):`<div class="card empty"><b>No Rounds Yet</b>Finished rounds posted ${fmtRange(t)} show up here.</div>`;

 if(tab==='players'){
 h+=`<div class="card">`;
 h+=mem.map(u=>`<div class="item" style="padding:6px 0"><button class="item plain" data-player="${esc(u)}" aria-label="View ${esc(who(u))} profile">${av(u)}<div class="mid"><b>${esc(who(u))}</b>${u===t.created_by?'<span>Organizer</span>':''}</div></button>${friendAction(u,'Add Friend')}${owner&&u!==S.me?`<button class="link" data-act="rmmember" data-u="${esc(u)}">Remove</button>`:''}</div>`).join('');
 if(mem.some(u=>u!==S.me&&!isFriend(u)))h+=`<p class="hint">Friends see each other’s rounds all year, not just on this trip.</p>`;
 {
  // Anyone on the trip can add their own friends; only the organizer removes others.
  const add=friendIds().filter(f=>!mem.includes(f)),waiting=outgoing();
  if(add.length)h+=`<label>Add your friends</label><div class="pick">${add.map(f=>`<button data-act="addmember" data-u="${esc(f)}">+ ${esc(handle(f))}</button>`).join('')}</div>`;
  else h+=`<p class="hint">All your friends are on this trip. To add someone else, add them on the Friends tab first; they appear here once they accept.</p>`;
  if(waiting.length)h+=`<p class="hint">Waiting to accept your friend request: ${esc(waiting.map(handle).join(', '))}.</p>`;
 }
 h+=`</div>`;
 h+=owner?(S.confirm==='deltrip'?`<div class="card note"><p style="margin-top:0">Delete this trip and all its bets? Rounds stay on everyone’s cards.</p><div class="row"><button class="danger" data-act="deltrip">Delete Trip</button><button data-act="cancelc">Keep it</button></div></div>`:`<button class="wide" data-act="ask" data-c="deltrip">Delete Trip</button>`)
  :(S.confirm==='leave'?`<div class="row"><button class="danger" data-act="leavetrip">Leave Trip</button><button data-act="cancelc">Stay</button></div>`:`<button class="wide" data-act="ask" data-c="leave">Leave Trip</button>`);
 }
 return h;
}

/* ---------- trip tee times ---------- */
// Each tee time is one group (up to 4) at a time and course on a trip day (supabase/teetimes.sql).
const fmtTime=(s)=>{const [h,m]=(s||'').split(':').map(Number);if(isNaN(h))return '';return `${(h%12)||12}:${String(m||0).padStart(2,'0')} ${h<12?'AM':'PM'}`};
const fmtDay=(s)=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})};
const tripDays=(t)=>{const out=[],[y,m,d]=t.start_date.split('-').map(Number),dt=new Date(y,m-1,d);while(isoDate(dt)<=t.end_date&&out.length<31){out.push(isoDate(dt));dt.setDate(dt.getDate()+1)}return out};
const courseKeyByName=(name)=>Object.keys(COURSES).find(k=>COURSES[k].name.toLowerCase()===(name||'').trim().toLowerCase())||null;
function teeSheet(t,mem,who){
 const list=(S.teeTimes[t.id]||[]).slice().sort((a,b)=>(a.day+a.time).localeCompare(b.day+b.time));
 let h=S.teeFormOpen?teeForm(t,mem,who):`<button class="primary wide" style="margin-bottom:6px" data-act="teeopen">+ Add a Tee Time</button>`;
 if(!list.length)h+=`<div class="card empty"><b>No Tee Times Yet</b>Plan each day’s groups ahead of the trip. Everyone you put in a group gets a notification, plus a reminder the night before.</div>`;
 [...new Set(list.map(x=>x.day))].forEach(day=>{
  const n=list.filter(x=>x.day===day).length;
  h+=`<div class="tday"><h2>${esc(fmtDay(day))}${day===today()?' <span class="tnow">Today</span>':''}</h2><span>${n} tee time${n===1?'':'s'}</span></div>`;
  list.filter(x=>x.day===day).forEach(x=>{
   const mine=x.players.includes(S.me),[hm,ap]=fmtTime(x.time).split(' '),first=u=>u===S.me?'You':handle(u).split(' ')[0];
   const meta=[x.tee?x.tee+' tees':'',x.note||''].filter(Boolean).join(' · ');
   h+=`<div class="tcard${mine?' mine':''}">
    <div class="ttime"><b>${esc(hm)}</b><span>${esc(ap)}</span></div>
    <div class="tbody"><b class="tcname">${esc(x.course)}</b>${meta?`<span class="tmeta">${esc(meta)}</span>`:''}
     <div class="tgroup">${x.players.map(u=>`<span class="tchip${u===S.me?' me':''}">${av(u,'xs')}${esc(first(u))}</span>`).join('')}${Array.from({length:4-x.players.length},()=>`<span class="tchip open">Open</span>`).join('')}</div>
     ${mine&&day===today()?`<button class="primary wide tstart" data-act="teestart" data-id="${esc(x.id)}">Start This Round</button>`:''}
     <div class="tlinks"><button class="link" data-act="teeedit" data-id="${esc(x.id)}">Edit</button><button class="link" data-act="teecopy" data-id="${esc(x.id)}">Copy</button>${S.confirm==='tee:'+x.id?`<button class="link red-t" data-act="teedel" data-id="${esc(x.id)}">Confirm Delete</button><button class="link" data-act="cancelc">Keep</button>`:`<button class="link" data-act="ask" data-c="tee:${esc(x.id)}">Delete</button>`}</div>
    </div></div>`;
  });
 });
 return h;
}
function teeForm(t,mem,who){
 if(!S.teeCoursesTried){S.teeCoursesTried=true;PICK_STATES.forEach(st=>{if(!S.statesLoaded[st])loadStateCourses(st)})} // so every course is in the list
 const sel=S.tcSel||[S.me],key=S.tcKey&&COURSES[S.tcKey]?S.tcKey:null,days=tripDays(t),editing=S.teeEdit;
 return `<div class="card" id="teeform"><b>${editing?'Edit Tee Time':'Add a Tee Time'}</b>
  <div class="row"><div><label for="tcday">Day</label><select id="tcday">${days.map(d=>`<option value="${d}" ${d===(S.tcDay||days.find(x=>x>=today())||days[0])?'selected':''}>${esc(fmtDay(d))}</option>`).join('')}</select></div>
   <div><label for="tctime">Time</label><input id="tctime" type="time" step="300"></div></div>
  <label for="tccourse">Course</label><input id="tccourse" list="tccourses" maxlength="80" autocomplete="off" placeholder="Start typing a course"><datalist id="tccourses">${Object.values(COURSES).map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist>
  <label for="tctee">Tees</label>${key?`<select id="tctee"><option value="">Pick later</option>${teeOpts(key)}</select>`:`<input id="tctee" maxlength="40" placeholder="Optional, e.g. Blue">`}
  <label>Group <span class="hint" style="font-weight:400">(up to 4)</span></label><div class="pick">${mem.map(u=>`<button data-tcp="${esc(u)}" aria-pressed="${sel.includes(u)}">${esc(who(u))}</button>`).join('')}</div>
  <label for="tcnote">Note</label><input id="tcnote" maxlength="120" placeholder="Optional, e.g. Carts paid, shotgun start">
  <div class="row" style="margin-top:14px"><button class="primary" data-act="teesave" ${S.busy?'disabled':''}>${editing?'Save Changes':'Add Tee Time'}</button><button data-act="teecancel">Cancel</button></div>
  <p class="hint">Tip: Copy a morning tee time to set up the afternoon round with the same group.</p></div>`;
}
// Put a tee time's details into the form (after render, so they aren't overwritten).
function fillTeeForm(x,copy){
 S.tcSel=[...x.players];S.tcKey=x.course_key&&COURSES[x.course_key]?x.course_key:courseKeyByName(x.course);S.tcDay=x.day;S.teeEdit=copy?null:x.id;S.teeFormOpen=true;render();
 const set=(id,v)=>{const el=$(id);if(el)el.value=v||''};
 set('#tcday',x.day);set('#tctime',copy?'':(x.time||'').slice(0,5));set('#tccourse',x.course);set('#tctee',x.tee);set('#tcnote',x.note);
 const f=$('#teeform');if(f)f.scrollIntoView({block:'start',behavior:'smooth'});
}
async function saveTee(t){
 const course=$('#tccourse').value.trim(),time=$('#tctime').value,day=$('#tcday').value,players=(S.tcSel||[]).filter(u=>(S.tripMembers[t.id]||[]).includes(u)).slice(0,4);
 if(!time)return toast('Pick a tee time.');
 if(!course)return toast('Pick a course.');
 const key=courseKeyByName(course),row={trip_id:t.id,day,time,course,course_key:key,tee:$('#tctee').value.trim()||null,players,note:$('#tcnote').value.trim()||null,reminded_on:null}; // an edit gets a fresh night-before reminder
 S.busy=true;render();
 const {error}=S.teeEdit?await sb.from('tee_times').update(row).eq('id',S.teeEdit):await sb.from('tee_times').insert(row);
 S.busy=false;
 if(error){render();return fail(error,'Couldn’t save the tee time.')}
 toast(S.teeEdit?'Tee time updated':'Tee time added');
 S.teeEdit=null;S.tcSel=null;S.tcKey=null;S.teeFormOpen=false;
 await loadAll();
}
// Start the round for a tee time you're in: course, tees and your friends in the group.
function startTee(x){
 if(draft)return toast('Finish or discard the round you’re playing first.');
 const others=x.players.filter(u=>u!==S.me),notFriends=others.filter(u=>!isFriend(u));
 S.courseKey=x.course_key&&COURSES[x.course_key]?x.course_key:courseKeyByName(x.course)||'';S.withSel=others.filter(isFriend).slice(0,3);S.nsel='18';S.picking=false;
 playView='start';go('play');
 if(!S.courseKey){const c=$('#cname');if(c)c.value=x.course}
 const tee=$('#tee');if(tee&&x.tee&&S.courseKey&&COURSES[S.courseKey].tees[x.tee]){tee.value=x.tee;syncStart(true)}
 if(notFriends.length)toast('To score '+notFriends.map(handle).join(', ')+', add them as friends first.');
}

/* ---------- trip leaderboard ---------- */
// Standings for the trip from finished rounds, plus where everyone on the course stands
// right now (live_scores, updated by whoever's keeping score).
const TRIP_CATS=[
 {k:'topar',label:'To Par',low:true,fmt:rel,val:rs=>rs.length?rs.reduce((a,r)=>a+r.score-r.parPlayed,0):null,note:'Total strokes over par across finished trip rounds.'},
 {k:'net',label:'Net To Par',low:true,fmt:rel,val:rs=>{const f=rs.filter(r=>r.net!=null);return f.length?f.reduce((a,r)=>a+r.net-r.parPlayed,0):null},note:'After handicap strokes, across rounds with a rating and slope.'},
 {k:'avg',label:'Avg 18',low:true,fmt:v=>v.toFixed(1),val:rs=>{const f=rs.filter(r=>r.n===18);return f.length?Math.round(f.reduce((a,r)=>a+r.score,0)/f.length*10)/10:null},note:'Average 18-hole score on the trip.'},
 {k:'money',label:'Money',fmt:v=>(v>0?'+':v<0?'−':'')+fmtMoney(v),money:true,note:'Trip bets as they stand now, plus Skins and Nassau won on trip rounds.'},
 {k:'birdies',label:'Birdies',val:rs=>rs.reduce((a,r)=>a+(r.holes||[]).filter(h=>played(h)&&h.score<h.par).length,0),note:'Birdies or better.'},
 {k:'t5',label:'Tiger 5',low:true,fmt:v=>v.toFixed(1),val:rs=>per18(rs,r=>r.t5),note:'Tiger 5 misses per 18 holes.'},
 {k:'putts',label:'Putts',low:true,fmt:v=>v.toFixed(1),val:rs=>per18(rs.filter(r=>r.putts!=null),r=>r.putts),note:'Putts per 18 holes.'},
 {k:'beer',label:'🍺 Beers',all:true,val:rs=>rs.reduce((a,r)=>a+holeSum(r,'beer'),0),note:'Beers logged on trip rounds.'},
 {k:'gb',label:'💨 Rips',all:true,val:rs=>rs.reduce((a,r)=>a+holeSum(r,'gb'),0),note:'Rips logged on trip rounds.'},
];
function tripMoney(t){
 const mem=S.tripMembers[t.id]||[],out={},bets=settleBets(t,true).net;
 mem.forEach(u=>{out[u]=(bets[u]||0)+allTripRounds(t,u).reduce((a,r)=>a+(r.games&&r.games.done&&r.games.net?(+r.games.net[u]||0):0),0)});
 return out;
}
function tripStandings(t,mem,who){
 let h='';
 const live=(S.live[t.id]||[]).filter(x=>Date.now()-Date.parse(x.updated_at)<8*3600e3).sort((a,b)=>a.to_par-b.to_par||b.thru-a.thru);
 if(live.length)h+=`<h2>On the Course <span class="livedot" aria-hidden="true"></span></h2><div class="card"><table><tbody>${live.map(x=>`<tr><td>${withPic(x.user_id,who(x.user_id))}<span class="dwhere">${esc(x.course)}</span></td><td class="n">${rel(x.to_par)}<span class="dwhere">${x.thru?(x.thru===x.holes?'finishing':'thru '+x.thru):'starting'}</span></td></tr>`).join('')}</tbody></table><p class="hint">Updates as each group enters scores.</p></div>`;
 const cat=TRIP_CATS.find(c=>c.k===S.tripCat)||TRIP_CATS[0],money=cat.money?tripMoney(t):null;
 const rows=mem.map(u=>{const rs=cat.all?allTripRounds(t,u):tripRounds(t,u);return{u,n:tripRounds(t,u).length,v:money?Math.round(money[u]*100)/100:cat.val(rs)}});
 const ranked=rows.filter(r=>r.v!=null).sort((a,b)=>cat.low?a.v-b.v:b.v-a.v),none=rows.filter(r=>r.v==null),fmt=cat.fmt||String,medal=['🥇','🥈','🥉'];
 h+=`<h2>Trip Standings</h2><div class="lbcats" role="tablist" aria-label="Category">${TRIP_CATS.map(c=>`<button role="tab" data-tcat="${c.k}" aria-selected="${c===cat}">${c.label}</button>`).join('')}</div>`;
 let rank=0,prev=null;
 h+=`<div class="card"><p class="hint" style="margin:0 0 8px">${esc(cat.note)}</p>${ranked.length?`<table class="lbtable"><tbody>${ranked.map((r,i)=>{if(r.v!==prev){rank=i+1;prev=r.v}
  return `<tr class="${r.u===S.me?'mine':''}"><td class="lbrank">${rank<=3&&(cat.low||r.v>0)?medal[rank-1]:rank}</td><td><button class="plain namelink" data-player="${esc(r.u)}">${withPic(r.u,who(r.u))}</button><span class="dwhere">${r.n} round${r.n===1?'':'s'}</span></td><td class="n ${money?(r.v>0?'pos':r.v<0?'neg':''):''}">${esc(fmt(r.v))}</td></tr>`}).join('')}${none.map(r=>`<tr><td class="lbrank">–</td><td>${withPic(r.u,who(r.u))}</td><td class="n hint">—</td></tr>`).join('')}</tbody></table>`
  :`<p class="hint" style="margin:0">No finished trip rounds yet.</p>`}</div>`;
 return h;
}
// Keep the trip's live scores current for the round being played (if it's on a trip you're on).
let liveT=0;
async function liveSync(){
 if(!draft||!sb||!S.me||!navigator.onLine)return;
 const t=S.trips.find(x=>!x.ended_at&&draft.date>=x.start_date&&draft.date<=x.end_date&&(S.tripMembers[x.id]||[]).includes(S.me));if(!t)return;
 const mem=S.tripMembers[t.id]||[],n=draft.holes.length;
 const row=(id,uid,holes)=>{const ph=holes.filter(played);return{round_id:id,trip_id:t.id,user_id:uid,entered_by:S.me,course:draft.course.slice(0,80),thru:ph.length,holes:n,to_par:ph.reduce((a,h)=>a+h.score-h.par,0),score:ph.reduce((a,h)=>a+h.score,0),updated_at:new Date().toISOString()}};
 const rows=[row(draft.id,S.me,draft.holes),...(draft.others||[]).filter(o=>mem.includes(o.uid)).map(o=>row(o.id,o.uid,o.holes))];
 try{const {error}=await sb.from('live_scores').upsert(rows);if(error)console.error(error)}catch(e){}
}
function liveSoon(){clearTimeout(liveT);liveT=setTimeout(liveSync,1500)}
async function liveClear(ids){try{if(sb&&ids.length)await sb.from('live_scores').delete().in('round_id',ids)}catch(e){}}

// Every round posted during the trip, finished or not (for beer and rip totals).
const allTripRounds=(t,uid)=>(S.rounds[uid]||[]).filter(r=>r.date>=t.start_date&&r.date<=t.end_date);
// Trip leaderboard for a per-hole extra (beers or rips): totals per player, most first.
function extrasBoard(t,key,emoji,one,many){
 const mem=S.tripMembers[t.id]||[],who=(u)=>u===S.me?'You':handle(u);
 const rows=mem.map(u=>{const rs=allTripRounds(t,u);return{u,n:rs.length,tot:rs.reduce((a,r)=>a+holeSum(r,key),0)}}).sort((a,b)=>b.tot-a.tot||b.n-a.n);
 const grand=rows.reduce((a,r)=>a+r.tot,0),top=rows.length&&rows[0].tot?rows[0].tot:null;
 let h=`<div class="card big" style="margin-bottom:10px"><div><b>${emoji} ${grand}</b><span>${grand===1?one:many} on the trip</span></div></div>`;
 h+=`<div class="card"><table><thead><tr><th>Player</th><th class="n">Rounds</th><th class="n">Per round</th><th class="n">Total</th></tr></thead><tbody>${rows.map(r=>`<tr class="${top!=null&&r.tot===top?'lead':''}"><td>${withPic(r.u,who(r.u))}</td><td class="n" style="font-weight:400;color:var(--mute)">${r.n}</td><td class="n" style="font-weight:400">${r.n?(r.tot/r.n).toFixed(1):'—'}</td><td class="n">${r.tot}</td></tr>`).join('')}</tbody></table>
 <p class="hint">Counted from the ${emoji} ${many} entered hole by hole on rounds posted ${fmtRange(t)}.</p></div>`;
 return h;
}
function settleCard(t,sv,title,note,ledger){
 const mem=S.tripMembers[t.id]||[],who=(u)=>u===S.me?'You':handle(u);
 const sgn=(v)=>{v=Math.round((v||0)*100)/100;return `<span class="${v>0?'pos':v<0?'neg':''}">${v>0?'+':v<0?'−':''}${fmtMoney(v)}</span>`};
 const c={ledger,trip:t.id,note:t.name+' '+ledger+' (Sandie)'};
 return `<h2>${esc(title)}</h2><div class="card">`
  +(sv.pays.length?`<table><tbody>${sv.pays.map(p=>debtRow(p,c)).join('')}</tbody></table>`:`<p style="margin:0">${ledgerPays(ledger,t.id).some(p=>p.confirmed)?'Everyone’s square. ✓':'Nobody owes anything yet.'}</p>`)
  +paidList(ledger,t.id)
  +`<p class="hint">Still owed: ${mem.map(u=>`${esc(who(u))} ${sgn(sv.net[u])}`).join(' · ')}</p><p class="hint">${esc(note)} Sandie keeps track; mark payments paid here once they’re made.</p></div>`;
}
function expensesSection(t,mem,who){
 const list=S.expenses[t.id]||[],ex=expenseTotals(t),total=list.reduce((a,e)=>a+e.amount,0);
 let h='';
 if(list.length){
  h+=`<div class="card"><div class="bet-head"><b>Trip Spending</b><span class="money">${fmtMoney(total)}</span></div><table style="margin-top:6px"><thead><tr><th>Player</th><th class="n">Paid</th><th class="n">Their share</th></tr></thead><tbody>${mem.map(u=>`<tr><td>${withPic(u,who(u))}</td><td class="n" style="font-weight:400">${fmtMoney(ex.paid[u]||0)}</td><td class="n">${fmtMoney(ex.share[u]||0)}</td></tr>`).join('')}</tbody></table></div>`;
  h+=settleCard(t,settleReceipts(t),'Settle Up Receipts','Receipts only: what each person paid minus their share.','receipts');
  h+=`<h2>All Receipts</h2>`;
  list.forEach(e=>{
   const split=(e.split_among||[]).filter(u=>mem.includes(u)),canDel=e.created_by===S.me||e.paid_by===S.me||t.created_by===S.me;
   const each=split.length?fmtMoney(e.amount/split.length):'';
   h+=`<div class="card"><div class="bet-head"><b>${esc(e.description)}</b><span class="money">${fmtMoney(e.amount)}</span></div>
   <p class="hint" style="margin:2px 0 0">Paid by ${esc(who(e.paid_by))}${e.spent_on?' · '+fmtDate(e.spent_on):''} · ${split.length===mem.length?'split between everyone':'split between '+esc(split.map(who).join(', '))}${split.length>1?` (about ${each} each)`:''}</p>
   <div class="row" style="margin-top:8px">${e.receipt_path?`<button data-act="viewreceipt" data-path="${esc(e.receipt_path)}">View Receipt</button>`:'<span class="hint" style="margin:0">No photo</span>'}${canDel?(S.confirm==='ex:'+e.id?`<button class="danger" data-act="delexpense" data-id="${esc(e.id)}">Delete</button><button data-act="cancelc">Keep</button>`:`<button class="link" style="flex:none" data-act="ask" data-c="ex:${esc(e.id)}">Delete</button>`):''}</div></div>`;
  });
 }
 const paidBy=S.exPaidBy&&mem.includes(S.exPaidBy)?S.exPaidBy:S.me,split=(S.exSplit||mem).filter(u=>mem.includes(u));
 h+=`<div class="card"><b>Add a Receipt</b>
 <label for="exdesc">What was it for?</label><input id="exdesc" maxlength="80" placeholder="e.g. Dinner at the clubhouse">
 <div class="row"><div><label for="examt">Total ($)</label><input id="examt" inputmode="decimal" placeholder="0.00"></div><div><label for="exdate">Date</label><input id="exdate" type="date" value="${today()}"></div></div>
 <label>Who paid?</label><div class="pick">${mem.map(u=>`<button data-expaid="${esc(u)}" aria-pressed="${u===paidBy}">${esc(who(u))}</button>`).join('')}</div>
 <label>Split between</label><div class="pick">${mem.map(u=>`<button data-exsplit="${esc(u)}" aria-pressed="${split.includes(u)}">${esc(who(u))}</button>`).join('')}</div>
 <label for="exphoto">Receipt photo (optional)</label><input id="exphoto" type="file" accept="image/*,application/pdf">
 ${S.exFile?`<p class="hint">Attached: ${esc(S.exFile.name)} · <button class="link" data-act="exnofile">Remove</button></p>`:''}
 <button class="primary wide" style="margin-top:14px" data-act="addexpense" ${S.busy?'disabled':''}>${S.busy?'Saving…':'Add Receipt'}</button></div>`;
 if(S.receiptView)h+=`<div class="overlay" role="dialog" aria-label="Receipt"><div class="row" style="flex:none"><b style="color:#fff">Receipt</b><button data-act="closereceipt" style="flex:none">Close</button></div>${S.receiptView.pdf?`<p style="color:#fff">This receipt is a PDF.</p><a class="primary" style="display:block;text-align:center;padding:12px;border-radius:10px;background:var(--green);color:var(--on-green)" href="${esc(S.receiptView.url)}" target="_blank" rel="noopener">Open PDF</a>`:`<img src="${esc(S.receiptView.url)}" alt="Receipt photo">`}</div>`;
 return h;
}
// Profile photo: crop to a centered square, shrink to 400px JPEG, upload to
// avatars/<your id>/<random>.jpg, save the link, then remove the old file.
async function uploadPhoto(file){
 if(S.busy)return;
 S.busy='photo';render();
 try{
  const url=URL.createObjectURL(file);
  const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error('That file isn’t a photo the app can read. Try a JPEG or PNG.'));i.src=url});
  const side=Math.min(img.naturalWidth,img.naturalHeight),c=document.createElement('canvas');c.width=c.height=400;
  c.getContext('2d').drawImage(img,(img.naturalWidth-side)/2,(img.naturalHeight-side)/2,side,side,0,0,400,400);URL.revokeObjectURL(url);
  const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',0.85));if(!blob)throw new Error('Couldn’t process that photo.');
  const path=S.me+'/'+newId()+'.jpg';
  const up=await sb.storage.from('avatars').upload(path,blob,{contentType:'image/jpeg',upsert:false});if(up.error)throw up.error;
  const pub=sb.storage.from('avatars').getPublicUrl(path).data.publicUrl,old=photoOf(S.me);
  const {error}=await sb.from('profiles').update({avatar_url:pub}).eq('id',S.me);
  if(error){sb.storage.from('avatars').remove([path]);throw error}
  S.profiles[S.me]={...me(),avatar_url:pub};
  if(old)sb.storage.from('avatars').remove([old.slice(AVATAR_PREFIX.length)]).catch(()=>{});
  toast('Photo updated');
 }catch(e){fail(e,'Your photo didn’t upload.')}
 S.busy=false;render();
}
// Scorecard photo (front or back) for a course that isn't in the app: shrunk like
// receipts and uploaded to scorecards/<your id>/ right away, then attached when the round starts.
async function uploadScorecard(side,file){
 if(S.scBusy)return;
 S.scBusy=side;render();
 try{
  const up=await prepReceipt(file);if(up.type==='application/pdf')throw new Error('Use a photo of the scorecard.');
  const path=S.me+'/'+newId()+'-'+side+'.jpg';
  const {error}=await sb.storage.from('scorecards').upload(path,up.blob,{contentType:'image/jpeg',upsert:false});if(error)throw error;
  S.scPaths={...(S.scPaths||{}),[side]:path};toast((side==='front'?'Front':'Back')+' of the scorecard added');
 }catch(e){fail(e,'The scorecard photo didn’t upload.')}
 S.scBusy=null;render();
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
// Everyone bets their own amount. Losers pay what they bet; that money is split
// among the winners in proportion to how much each winner bet (evenly if winners bet $0).
const pickAmt=(p)=>+p.amount||0;
const potOf=(b)=>(S.boardPicks[b.id]||[]).reduce((a,p)=>a+pickAmt(p),0);
function boardPayout(b){
 if(b.status!=='settled'||b.winning_option==null)return null;
 const picks=S.boardPicks[b.id]||[];
 const win=picks.filter(p=>p.option===b.winning_option),lose=picks.filter(p=>p.option!==b.winning_option);
 const W=win.reduce((a,p)=>a+pickAmt(p),0),pays=[];
 if(win.length)lose.forEach(l=>{
  if(!pickAmt(l))return;
  const shares=W?win.map(w=>pickAmt(l)*pickAmt(w)/W):win.map(()=>pickAmt(l)/win.length);
  win.forEach((w,i)=>{const amt=Math.round(shares[i]*100)/100;if(amt>=0.01)pays.push({from:l.user_id,to:w.user_id,amt})});
 });
 return{win:win.map(p=>p.user_id),lose:lose.map(p=>p.user_id),pays};
}
// What each person owes you (positive) or you owe them (negative), across all settled bets.
function boardBalances(){
 const bal={};
 S.board.forEach(b=>{const p=boardPayout(b);if(!p)return;p.pays.forEach(x=>{
  if(x.from===S.me)bal[x.to]=(bal[x.to]||0)-x.amt;else if(x.to===S.me)bal[x.from]=(bal[x.from]||0)+x.amt;})});
 ledgerPays('board').forEach(p=>{if(!p.confirmed)return;if(p.payer===S.me)bal[p.payee]=(bal[p.payee]||0)+ +p.amount;else if(p.payee===S.me)bal[p.payer]=(bal[p.payer]||0)- +p.amount});
 return Object.entries(bal).map(([u,v])=>[u,Math.round(v*100)/100]).filter(([,v])=>Math.abs(v)>=0.01).sort((a,b)=>b[1]-a[1]);
}

/* ---------- settling up ---------- */
// Payments people have marked paid (supabase/payments.sql). Confirmed ones count against
// what's owed in their ledger: a trip's bets or receipts, the Betting Board, or money games.
const ledgerPays=(ledger,trip)=>(S.payments||[]).filter(p=>p.ledger===ledger&&(trip?p.trip_id===trip:!p.trip_id));
function applyPaid(net,ledger,trip){
 ledgerPays(ledger,trip).forEach(p=>{if(p.confirmed&&p.payer in net&&p.payee in net){net[p.payer]+=+p.amount;net[p.payee]-=+p.amount}});
}
// Opens Venmo with the amount and a note already filled in.
const venmoPay=(u,amt,note)=>S.venmo&&S.venmo[u]?`<a class="venmo" href="https://venmo.com/?txn=pay&audience=private&recipients=${encodeURIComponent(S.venmo[u])}&amount=${(Math.round(amt*100)/100).toFixed(2)}&note=${encodeURIComponent(note)}" target="_blank" rel="noopener">Pay on Venmo</a>`:'';
// One "who pays whom" line, with what you can do about it.
function debtRow(p,c){
 const who=u=>u===S.me?'You':handle(u),att=`data-amt="${p.amt}" data-ledger="${c.ledger}"${c.trip?` data-tid="${esc(c.trip)}"`:''}`;
 const claim=(S.payments||[]).find(x=>!x.confirmed&&x.payer===p.from&&x.payee===p.to&&x.ledger===c.ledger&&(c.trip?x.trip_id===c.trip:!x.trip_id));
 let act='';
 if(p.from===S.me)act=claim?`<span class="hint" style="margin:0">You said you paid ${fmtMoney(+claim.amount)}. Waiting for ${esc(handle(p.to))} to confirm.</span><button class="nudge" data-act="undopay" data-id="${esc(claim.id)}">Undo</button>`
  :venmoPay(p.to,p.amt,c.note)+`<button class="nudge" data-act="ipaid" data-u="${esc(p.to)}" ${att}>I Paid</button>`;
 else if(p.to===S.me)act=claim?`<span class="hint" style="margin:0"><b>${esc(handle(p.from))} says they paid ${fmtMoney(+claim.amount)}.</b></span><button class="nudge go" data-act="confirmpay" data-id="${esc(claim.id)}">Confirm</button><button class="nudge" data-act="undopay" data-id="${esc(claim.id)}">Not Yet</button>`
  :`<button class="nudge go" data-act="markpaid" data-u="${esc(p.from)}" ${att}>Mark Paid</button><button class="nudge" data-act="nudge" data-u="${esc(p.from)}" ${att}>Remind</button>`;
 return `<tr><td>${av(p.from,'xs')} ${esc(who(p.from))} pay${p.from===S.me?'':'s'} ${esc(p.to===S.me?'you':handle(p.to))}${c.where?`<span class="dwhere">${esc(c.where)}</span>`:''}${act?`<div class="dact">${act}</div>`:''}</td><td class="n">${fmtMoney(p.amt)}</td></tr>`;
}
// Payments already made in a ledger (newest first), with Undo for whoever can.
function paidList(ledger,trip){
 const list=ledgerPays(ledger,trip).filter(p=>p.confirmed).sort((a,b)=>b.created_at.localeCompare(a.created_at)).slice(0,8);
 if(!list.length)return '';
 const who=u=>u===S.me?'You':handle(u);
 return `<p class="hint" style="margin-bottom:4px"><b>Paid</b></p><ul class="paid">${list.map(p=>`<li>✓ ${esc(who(p.payer))} paid ${esc(p.payee===S.me?'you':handle(p.payee))} ${fmtMoney(+p.amount)} <span class="hint" style="margin:0">${fmtDate((p.confirmed_at||p.created_at).slice(0,10))}</span>${p.payee===S.me||p.created_by===S.me?`<button class="link" data-act="undopay" data-id="${esc(p.id)}">Undo</button>`:''}</li>`).join('')}</ul>`;
}
// Everything you owe or are owed, across finished trips, trip receipts and the Board.
function unsettledCard(){
 const lines=[];
 S.trips.forEach(t=>{if(!(S.tripMembers[t.id]||[]).includes(S.me))return;
  const sets=[['receipts',settleReceipts,'Receipts']];if(tripStatus(t)==='done')sets.unshift(['bets',settleBets,'Bets']);
  sets.forEach(([lg,fn,lab])=>fn(t).pays.forEach(p=>{if(p.from===S.me||p.to===S.me)lines.push([p,{ledger:lg,trip:t.id,note:t.name+' '+lab.toLowerCase()+' (Sandie)',where:t.name+' · '+lab}])}));
 });
 boardBalances().forEach(([u,v])=>lines.push([v>0?{from:u,to:S.me,amt:v}:{from:S.me,to:u,amt:-v},{ledger:'board',note:'Betting Board (Sandie)',where:'Betting Board'}]));
 gameBalances().forEach(([u,v])=>lines.push([v>0?{from:u,to:S.me,amt:v}:{from:S.me,to:u,amt:-v},{ledger:'games',note:'Skins & Nassau (Sandie)',where:'Money Games'}]));
 if(!lines.length)return '';
 const owe=lines.filter(([p])=>p.from===S.me).reduce((a,[p])=>a+p.amt,0),owed=lines.filter(([p])=>p.to===S.me).reduce((a,[p])=>a+p.amt,0);
 return `<h2>Unsettled</h2><div class="card"><div class="bet-head"><b>${[owe?'You owe '+fmtMoney(owe):'',owed?'You’re owed '+fmtMoney(owed):''].filter(Boolean).join(' · ')}</b></div>
  <table style="margin-top:6px"><tbody>${lines.map(([p,c])=>debtRow(p,c)).join('')}</tbody></table></div>`;
}
async function recordPayment(d,received){
 const row={payer:received?d.u:S.me,payee:received?S.me:d.u,amount:+d.amt,ledger:d.ledger,trip_id:d.tid||null,confirmed:received,created_by:S.me};
 if(received)row.confirmed_at=new Date().toISOString();
 const {error}=await sb.from('payments').insert(row);
 if(error)return fail(error,'Couldn’t record that payment.');
 toast(received?'Marked paid. '+handle(d.u)+' gets a notification.':'Sent to '+handle(d.u)+' to confirm.');
 return loadAll();
}
function boardView(){
 let h=header('Betting Board');
 if(!S.boardOk)return h+`<div class="card note"><b>The board needs one more database step</b><p style="margin:4px 0 0">Run <b>supabase/board.sql</b> in the Supabase SQL Editor, then reopen the app.</p></div>`;
 h+=`<button class="primary wide" style="margin-bottom:14px" data-nav="newbet">Post a Bet</button>`;
 const bal=boardBalances();
 if(bal.length){
  const net=bal.reduce((a,[,v])=>a+v,0);
  h+=`<div class="card"><div class="bet-head"><b>Your Board Balance</b><span class="money ${net>0?'pos':net<0?'neg':''}">${net>0?'+':net<0?'−':''}${fmtMoney(net)}</span></div><table style="margin-top:6px"><tbody>${bal.map(([u,v])=>debtRow(v>0?{from:u,to:S.me,amt:v}:{from:S.me,to:u,amt:-v},{ledger:'board',note:'Betting Board (Sandie)'})).join('')}</tbody></table>${paidList('board')}<p class="hint">Totals from every settled bet, minus payments marked paid.</p></div>`;
 }
 if(!S.board.length)return h+`<div class="card empty"><b>Nothing on the Board Yet</b>Post a bet for later, like “Jon breaks 80 at Whiskey Creek”. Your friends see it and pick a side.</div>`;
 [['open','Taking Picks'],['locked','Picks Locked, Waiting on the Result'],['settled','Settled'],['void','Called Off']].forEach(([st,label])=>{
  let list=S.board.filter(b=>b.status===st);if(!list.length)return;
  if(st==='open')list=list.sort((a,b)=>needsMyPick(b)-needsMyPick(a));
  if(st==='settled'||st==='void')list=list.slice(0,20);
  h+=`<h2>${label}</h2>`+list.map(boardCard).join('');
 });
 return h;
}
function boardCard(b){
 const picks=S.boardPicks[b.id]||[],mine=picks.find(p=>p.user_id===S.me),owner=b.created_by===S.me,stake=+b.stake||0,open=b.status==='open',pot=potOf(b);
 const who=(u)=>u===S.me?'You':handle(u);
 let h=`<div class="card${needsMyPick(b)?' note':''}"><div class="bet-head"><b>${esc(b.title)}</b><span class="money">${pot?fmtMoney(pot)+' pot':'No money in yet'}</span></div>
 <p class="hint" style="margin:2px 0 6px">Posted by ${esc(who(b.created_by))}${stake?' · suggested '+fmtMoney(stake):''}${b.settle_by?' · settles by '+fmtDate(b.settle_by):''}${needsMyPick(b)?' · <b>waiting for your pick</b>':''}</p>`;
 if(b.details)h+=`<p style="margin:0 0 6px">${esc(b.details)}</p>`;
 if(open&&S.settling!==b.id){
  // Your amount: typed once, then tap an option to place it (or update it).
  const amtVal=mine?pickAmt(mine):(stake||'');
  h+=`<div class="row" style="margin:4px 0 6px"><label for="bamt-${esc(b.id)}" style="margin:0;flex:none">Your bet $</label><input id="bamt-${esc(b.id)}" inputmode="decimal" value="${amtVal}" placeholder="0" style="max-width:110px">${mine?`<button style="flex:none" data-act="bbamount" data-id="${esc(b.id)}">Update</button>`:''}</div>`;
 }
 (b.options||[]).forEach((o,i)=>{
  const ps=picks.filter(p=>p.option===i),won=b.status==='settled'&&b.winning_option===i,mineHere=mine&&mine.option===i;
  const tot=ps.reduce((a,p)=>a+pickAmt(p),0);
  const action=S.settling===b.id?`<button class="primary" data-act="settlebet" data-id="${esc(b.id)}" data-opt="${i}">Won</button>`
   :open?`<button data-pickbet="${esc(b.id)}" data-opt="${i}" aria-pressed="${!!mineHere}">${mineHere?'Your pick':'Pick'}</button>`:'';
  h+=`<div class="opt${won?' won':''}"><div class="mid"><b>${esc(o)}${won?' ✓':''}${tot?` <span class="money" style="font-size:14px;color:var(--mute)">${fmtMoney(tot)}</span>`:''}</b><span>${ps.length?ps.map(p=>withPic(p.user_id,who(p.user_id)+(pickAmt(p)?' '+fmtMoney(pickAmt(p)):''))).join(' '):'No picks'}</span></div>${action}</div>`;
 });
 if(open&&mine)h+=`<p style="margin:6px 0 0"><button class="link" data-act="unpick" data-id="${esc(b.id)}">Withdraw my pick</button></p>`;
 const pay=boardPayout(b);
 if(pay)h+=pay.pays.length?`<table style="margin-top:8px"><tbody>${pay.pays.map(x=>`<tr><td>${av(x.from,'xs')} ${esc(who(x.from))} pay${x.from===S.me?'':'s'} ${esc(x.to===S.me?'you':handle(x.to))}</td><td class="n">${fmtMoney(x.amt)}</td></tr>`).join('')}</tbody></table>`
  :`<p class="hint">No money changes hands${pot?' (nobody picked the losing side, or nobody picked the winner)':''}.</p>`;
 if(owner){
  const btn=(act,label,cls)=>`<button ${cls?`class="${cls}"`:''} data-act="${act}" data-id="${esc(b.id)}">${label}</button>`;
  let c='';
  if(S.settling===b.id)c=`<p class="hint" style="width:100%;margin:0">Tap <b>Won</b> next to the winning option. Picks close when you do.</p>`+btn('cancelsettle','Cancel');
  else if(S.confirm==='bbdel:'+b.id)c=btn('delboard','Delete for good','danger')+btn('cancelc','Keep');
  else if(open)c=btn('lockbet','Lock Picks')+btn('startsettle','Settle')+btn('voidbet','Call Off');
  else if(b.status==='locked')c=btn('startsettle','Settle','primary')+btn('reopenbet','Reopen Picks')+btn('voidbet','Call Off');
  else c=btn('reopenbet',b.status==='settled'?'Undo Result':'Reopen')+`<button data-act="ask" data-c="bbdel:${esc(b.id)}">Delete</button>`;
  h+=`<div class="row" style="flex-wrap:wrap;margin-top:10px">${c}</div>`;
 }
 return h+`</div>`;
}
function newBetView(){
 const n=S.bbOpts;
 return header('Post a Bet','Betting Board')+`<div class="card">
 <label for="bbtitle" style="margin-top:0">The bet</label><input id="bbtitle" maxlength="80" placeholder="e.g. Jon breaks 80 at Whiskey Creek">
 <label for="bbdetails">Details (optional)</label><input id="bbdetails" maxlength="300" placeholder="Which round, tiebreaks, anything else">
 <label>Options</label>${Array.from({length:n},(_,i)=>`<input id="bbopt${i}" maxlength="40" style="margin-bottom:6px" value="${i===0?'Yes':i===1?'No':''}" placeholder="Option ${i+1}">`).join('')}
 <div class="row">${n<6?'<button data-act="bbmore">+ Add option</button>':''}${n>2?'<button data-act="bbless">Remove last</button>':''}</div>
 <p class="hint">For “who wins” bets, use player names as the options.</p>
 <div class="row"><div><label for="bbstake">Suggested bet ($, optional)</label><input id="bbstake" inputmode="decimal" placeholder="e.g. 20"></div><div><label for="bbdate">Settle by (optional)</label><input id="bbdate" type="date" min="${today()}"></div></div>
 <p class="hint">Everyone picks an option and chooses how much to put on it. The suggested amount is just the starting number.</p>
 <button class="primary wide" style="margin-top:14px" data-act="postbet" ${S.busy?'disabled':''}>Post to the Board</button></div>
 <p class="sub">Once it’s decided, you mark the winner. Everyone who picked wrong pays what they bet, split among those who picked right in proportion to how much each of them bet. The app only keeps track.</p>`;
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
// Places (or moves / re-sizes) your pick using the amount typed on that bet's card.
async function pickBoard(id,opt){
 const el=document.getElementById('bamt-'+id),raw=el?el.value.replace(/[$,\s]/g,''):'',amount=raw?Math.round(+raw*100)/100:0;
 if(!(amount>=0)||amount>=100000)return toast('Enter your bet in dollars, or 0.');
 const list=S.boardPicks[id]=(S.boardPicks[id]||[]).filter(p=>p.user_id!==S.me);
 list.push({bet_id:id,user_id:S.me,option:opt,amount});render();
 const {error}=await sb.from('board_picks').upsert({bet_id:id,user_id:S.me,option:opt,amount});
 if(error){fail(error,'Your pick didn’t save. The bet may have just been locked.');loadAll()}
 else toast(amount?'You put '+fmtMoney(amount)+' on it':'Pick saved');
}

/* ---------- play ---------- */
function playHtml(){
 if(playView==='start'||!draft)return startView();
 if(playView==='sum')return summaryView();
 return holeView();
}
function startView(){
 const ix=S.status==='ready'?myIndex():null;
 return `${header('New Round')}
 <div class="card"><label>Course</label><input type="hidden" id="course" value="${esc(S.courseKey||'')}">
 ${(()=>{const cc=COURSES[S.courseKey];return `<button class="coursebtn" data-act="pickcourse" aria-expanded="${!!S.picking}"><span class="cbtxt">${cc?`<b>${esc(cc.name)}</b><span>${esc([cc.city,STATE_NAMES[cc.state]||cc.state].filter(Boolean).join(', '))}${cc.access==='Private'?' · Private':''}</span>`:`<b>Other course</b><span>Not in the list</span>`}</span><span class="chg">${S.picking?'Close':'Change'}</span></button>`})()}
 ${S.picking?coursePicker():''}
 <div id="otherWrap" hidden><label for="cname">Course name</label><input id="cname" maxlength="60" placeholder="Where are you playing?">
  <label>Scorecard Photos</label>
  <div class="row scrow">${['front','back'].map(side=>`<div><label class="filebtn${S.scPaths&&S.scPaths[side]?' done':''}" for="sc-${side}">${S.scBusy===side?'Uploading…':S.scPaths&&S.scPaths[side]?'✓ '+(side==='front'?'Front':'Back')+' added':'+ '+(side==='front'?'Front':'Back')}</label><input id="sc-${side}" type="file" accept="image/*" hidden></div>`).join('')}</div>
  <p class="hint">Snap the front and back of the scorecard. Your friends can see them on the round.</p></div>
 <label for="tee">Tees</label><select id="tee">${COURSES[S.courseKey]?teeOpts(S.courseKey):'<option value="">n/a</option>'}</select>
 <div class="row"><div><label for="rating">Course rating</label><input id="rating" inputmode="decimal" placeholder="e.g. 71.9"></div><div><label for="slope">Slope</label><input id="slope" inputmode="numeric" placeholder="e.g. 133"></div></div>
 <label for="rdate">Date played</label><input type="date" id="rdate" value="${today()}" max="${today()}">
 <label>Holes</label><div class="seg" id="nseg">${[['18','18'],['front','Front 9'],['back','Back 9']].map(([v,l])=>`<button aria-pressed="${S.nsel===v}" data-n="${v}">${l}</button>`).join('')}</div>
 <p class="hint" id="chline"></p>
 <label>Playing With</label>
 ${friendIds().length?`<div class="pick">${friendIds().map(f=>`<button data-withsel="${esc(f)}" aria-pressed="${(S.withSel||[]).includes(f)}">${withPic(f,handle(f))}</button>`).join('')}</div>
 <p class="hint">Pick up to 3 friends in your group. You’ll enter their scores on each hole and their rounds post to their cards.</p>`:`<p class="hint">Add friends to score your whole group.</p>`}
 ${(S.withSel||[]).length?gamesSetup():''}
 <button class="primary wide" style="margin-top:14px" data-act="start">Start Round</button></div>
 <p class="sub">Rating and slope are on the scorecard. Without them the round still posts but won’t count toward a handicap.${ix!=null?'':' Your index appears after 3 rated rounds.'}</p>`;
}
// Each state's full course list lives in courses/<STATE>.json and loads the first time
// you look at that state (then it's cached for offline use like the rest of the app).
async function loadStateCourses(st){
 if(S.statesLoaded[st]||S.statesLoading[st])return;
 S.statesLoading[st]=true;
 try{
  const res=await fetch('courses/'+st+'.json');if(!res.ok)throw new Error('HTTP '+res.status);
  const data=await res.json();
  for(const k in data)if(!COURSES[k])COURSES[k]=data[k];
  S.statesLoaded[st]=true;
 }catch(e){console.error(e);toast('Couldn’t load '+(STATE_NAMES[st]||st)+' courses. Check your signal and try again.')}
 S.statesLoading[st]=false;render();
}
// Course search: state buttons, a search box (name or city) and All / Public / Private.
function coursePicker(){
 const st=S.cstate||'VA',f=S.cfilter||'all',q=(S.csearch||'').trim().toLowerCase();
 if(!S.statesLoaded[st])loadStateCourses(st);
 const all=Object.entries(COURSES).filter(([k,c])=>c.state===st&&(f==='all'||c.access===(f==='pub'?'Public':'Private'))&&(!q||(c.name+' '+(c.city||'')).toLowerCase().includes(q)))
  .sort((a,b)=>a[1].name.localeCompare(b[1].name)),list=all.slice(0,60);
 return `<div class="cpick">
  <div class="seg">${PICK_STATES.map(s=>`<button data-cstate="${s}" aria-pressed="${s===st}">${s}</button>`).join('')}</div>
  <input id="csearch" type="search" placeholder="Search ${esc(STATE_NAMES[st])} by name or city" value="${esc(S.csearch||'')}" autocomplete="off" aria-label="Search courses">
  <div class="seg sm">${[['all','All'],['pub','Public'],['priv','Private']].map(([v,l])=>`<button data-cfilter="${v}" aria-pressed="${f===v}">${l}</button>`).join('')}</div>
  <div class="clist">${S.statesLoading[st]&&!list.length?'<p class="hint">Loading courses…</p>':list.length?list.map(([k,c])=>`<button data-course="${esc(k)}" class="${k===S.courseKey?'on':''}"><b>${esc(c.name)}</b><span>${esc(c.city||STATE_NAMES[c.state]||'')}${c.access==='Private'?' · Private':''} · ${Object.keys(c.tees).length} tee${Object.keys(c.tees).length===1?'':'s'}</span></button>`).join(''):'<p class="hint">No courses match. Try another spelling, or use Other course below.</p>'}
  ${all.length>list.length?`<p class="hint">Showing ${list.length} of ${all.length}. Type more of the name to narrow it down.</p>`:''}</div>
  <button class="link" data-course="">Course not listed? Use Other course</button>
 </div>`;
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
 s+=`</div>${wolfPicker()}<div class="card"><div class="hole-head"><b>Hole ${start+hidx}</b><span class="sub" style="margin:0">${rel((p?h.score:h.par)-h.par)} to par</span></div>
 ${h.yds?`<p class="sub" style="margin:4px 0 0">${h.yds} yds from the ${esc(draft.tee)} tees · stroke index ${h.si}</p>`:''}<label>Par</label><div class="seg">${[3,4,5].map(n=>`<button data-par="${n}" aria-pressed="${h.par===n}">${n}</button>`).join('')}</div>
 <label>Strokes</label><div class="stepper"><button data-sc="-1" aria-label="Fewer strokes">−</button><output>${p?h.score:h.par}</output><button data-sc="1" aria-label="More strokes">+</button></div>
 <label>Putts${h.putts==null?` <span class="${S.puttsNag?'neg':'hint'}" style="font-weight:400;font-size:14px">(required to continue)</span>`:''}</label><div class="stepper${S.puttsNag&&h.putts==null?' need':''}"><button data-pt="-1" aria-label="Fewer putts">−</button><output>${h.putts==null?'–':h.putts}</output><button data-pt="1" aria-label="More putts">+</button></div>
 <button class="toggle" data-tg="sc" aria-pressed="${h.sc}"><span>Approach with a scoring club (wedge or short iron)</span><b>${h.sc?'Yes':'No'}</b></button>
 <button class="toggle" data-tg="ud" aria-pressed="${h.ud}"><span>Missed an easy up-and-down</span><b>${h.ud?'Yes':'No'}</b></button>
 <div class="row" style="margin-top:4px;align-items:flex-start">
  <div><label>Beers 🍺</label><div class="stepper sm"><button data-beer="-1" aria-label="One less beer">−</button><output>${h.beer||0}</output><button data-beer="1" aria-label="One more beer">+</button></div>
   ${(h.beer||0)>0?`<div class="shotgun"><label>Shotguns 💥</label><div class="stepper xs"><button data-shot="-1" aria-label="One less shotgun">−</button><output>${h.shot||0}</output><button data-shot="1" aria-label="One more shotgun">+</button></div></div>`:''}</div>
  <div><label>Rips 💨</label><div class="stepper sm"><button data-gb="-1" aria-label="One less rip">−</button><output>${h.gb||0}</output><button data-gb="1" aria-label="One more rip">+</button></div></div>
 </div>
 <div class="chips">${p?(f.length?f.map(r=>`<span class="chip">${r.k==='r3'?'You Suck':'Nice Work Idiot'} - ${r.n.replace('No ','')}</span>`).join(''):'<span class="chip ok">Clean hole</span>'):''}</div>
 <div class="sidetrack"><span class="sthead">Side Tracks</span><div class="row" style="align-items:flex-start">
  <div><label>Thrown Club 🪃</label><div class="stepper sm"><button data-club="-1" aria-label="One less thrown club">−</button><output>${h.club||0}</output><button data-club="1" aria-label="One more thrown club">+</button></div></div>
  <div><label>Mushroom 🍄</label><div class="stepper sm"><button data-mush="-1" aria-label="One less mushroom">−</button><output>${h.mush||0}</output><button data-mush="1" aria-label="One more mushroom">+</button></div></div>
 </div></div></div>
 ${(draft.others||[]).map((o,i)=>playerCard(o,i+1)).join('')}
 ${gamesCard(draftGames())}
 <div class="row"><button data-act="prev" ${hidx===0?'disabled':''}>Previous</button><button class="primary" data-act="next">${hidx===draft.holes.length-1?'Finish Round':'Next Hole'}</button></div>
 <p style="text-align:center"><button class="link" data-act="tosum">Review Round</button></p>`;
 return s;
}
// Compact scoring card for a friend in your group (data-p picks which player a button changes).
function playerCard(o,pp){
 const x=o.holes[hidx],pl=played(x),f=fails(x),P=`data-p="${pp}"`;
 const mini=(k,emo,label)=>`<span class="mini"><button data-${k}="-1" ${P} aria-label="One less ${label} for ${esc(handle(o.uid))}">−</button><span>${emo} ${x[k]||0}</span><button data-${k}="1" ${P} aria-label="One more ${label} for ${esc(handle(o.uid))}">+</button></span>`;
 return `<div class="card pcard">
  <div class="phd">${av(o.uid,'xs')}<b>${esc(handle(o.uid))}</b><span class="sub" style="margin:0 0 0 auto">${rel((pl?x.score:x.par)-x.par)} to par</span></div>
  <div class="row" style="align-items:flex-start">
   <div><label>Strokes</label><div class="stepper sm"><button data-sc="-1" ${P} aria-label="Fewer strokes for ${esc(handle(o.uid))}">−</button><output>${pl?x.score:x.par}</output><button data-sc="1" ${P} aria-label="More strokes for ${esc(handle(o.uid))}">+</button></div></div>
   <div><label>Putts</label><div class="stepper sm"><button data-pt="-1" ${P} aria-label="Fewer putts for ${esc(handle(o.uid))}">−</button><output>${x.putts==null?'–':x.putts}</output><button data-pt="1" ${P} aria-label="More putts for ${esc(handle(o.uid))}">+</button></div></div>
  </div>
  <div class="pick" style="margin-top:8px"><button data-tg="sc" ${P} aria-pressed="${!!x.sc}">Scoring club</button><button data-tg="ud" ${P} aria-pressed="${!!x.ud}">Missed up &amp; down</button></div>
  <div class="row" style="margin-top:8px;justify-content:flex-start">${mini('beer','🍺','beer')}${mini('gb','💨','rip')}</div>
  ${(x.beer||0)>0?`<div class="row" style="margin-top:6px;justify-content:flex-start">${mini('shot','💥','shotgun')}</div>`:''}
  <div class="row" style="margin-top:6px;justify-content:flex-start">${mini('club','🪃','thrown club')}${mini('mush','🍄','mushroom')}</div>
  ${pl&&f.length?`<div class="chips" style="min-height:0">${f.map(r=>`<span class="chip">${r.n.replace('No ','')}</span>`).join('')}</div>`:''}
 </div>`;
}
// A friend's holes wrapped like a round so calc() can score them.
const otherRound=(o)=>({rating:draft.rating,slope:draft.slope,holes:o.holes});

/* ---------- money games ---------- */
// Skins and Nassau, scored from the group's card. Net games use course handicaps: Skins
// strokes come off the low player; each Nassau match gives the difference between the two.
// Strokes go on the hardest holes first (stroke index), the same way calc() spreads them.
function strokeAlloc(holes,D){
 const n=holes.length,order=holes.map((h,i)=>({i,si:h.si||i+1})).sort((a,b)=>a.si-b.si),rank={};order.forEach((o,k)=>rank[o.i]=k+1);
 return holes.map((h,i)=>D>0?Math.floor(D/n)+(rank[i]<=D%n?1:0):0);
}
// ps: [{uid, ch, scores:[gross or null per hole]}]; meta: the holes (for stroke index).
// Holes count in order until the first one somebody hasn't scored yet.
function scoreGames(g,ps,meta){
 const n=meta.length,res={v:1,netGame:!!g.net,players:ps.map(p=>p.uid),ch:{},net:{},pays:[],done:false};
 ps.forEach(p=>{res.ch[p.uid]=p.ch;res.net[p.uid]=0});
 let thru=0;while(thru<n&&ps.every(p=>p.scores[thru]!=null))thru++;
 res.thru=thru;res.done=thru===n;
 if(g.skins){
  const low=Math.min(...ps.map(p=>p.ch)),st=ps.map(p=>g.net?strokeAlloc(meta,p.ch-low):meta.map(()=>0));
  let carry=0;const holes=[],won={};ps.forEach(p=>won[p.uid]=0);
  for(let i=0;i<thru;i++){
   const ns=ps.map((p,k)=>p.scores[i]-st[k][i]),best=Math.min(...ns),who=ps.filter((p,k)=>ns[k]===best),val=1+carry;
   if(who.length===1){holes.push({w:who[0].uid,v:val});won[who[0].uid]+=val;carry=0}
   else{holes.push({w:null,v:0});carry=g.skins.carry?val:0}
  }
  // Each skin: every other player pays the winner the stake (times any carried-over skins).
  holes.forEach(h=>{if(h.w)ps.forEach(p=>{if(p.uid!==h.w){res.net[p.uid]-=g.skins.stake*h.v;res.net[h.w]+=g.skins.stake*h.v}})});
  res.skins={stake:g.skins.stake,carry:!!g.skins.carry,holes,won,left:carry,strokes:Object.fromEntries(ps.map(p=>[p.uid,g.net?p.ch-low:0]))};
 }
 if(g.nassau&&n===18){
  const matches=[];
  for(let a=0;a<ps.length;a++)for(let b=a+1;b<ps.length;b++){
   const A=ps[a],B=ps[b],diff=g.net?A.ch-B.ch:0,sa=strokeAlloc(meta,diff),sbb=strokeAlloc(meta,-diff);
   // +1 when A wins the hole, -1 when B does, 0 when halved.
   const r=[];for(let i=0;i<thru;i++){const x=(A.scores[i]-sa[i])-(B.scores[i]-sbb[i]);r.push(x<0?1:x>0?-1:0)}
   // A nine (or the 18). With presses on, a new bet starts on the next hole whenever
   // someone goes 2 down in the newest bet.
   const seg=(from,len,press)=>{const bets=[{s:from,up:0}];for(let i=from;i<from+len&&i<r.length;i++){bets.forEach(bt=>{if(i>=bt.s)bt.up+=r[i]});const last=bets[bets.length-1];if(press&&Math.abs(last.up)>=2&&i<from+len-1)bets.push({s:i+1,up:0})}return{bets,thru:Math.max(0,Math.min(r.length,from+len)-from),len}};
   const m={a:A.uid,b:B.uid,strokes:Math.abs(diff),getter:diff>0?A.uid:diff<0?B.uid:null,front:seg(0,9,g.nassau.press),back:seg(9,9,g.nassau.press),total:seg(0,18,false),amt:0};
   [m.front,m.back,m.total].forEach(sg=>{if(sg.thru===sg.len)sg.bets.forEach(bt=>m.amt+=Math.sign(bt.up)*g.nassau.stake)});
   res.net[A.uid]+=m.amt;res.net[B.uid]-=m.amt;matches.push(m);
  }
  res.nassau={stake:g.nassau.stake,press:!!g.nassau.press,matches};
 }
 // Wolf (3 or 4 players): the Wolf rotates each hole and picks a partner, goes Lone Wolf,
 // or calls Blind Wolf before anyone tees off. Best ball on each side wins the hole.
 // Points: Wolf + partner win 2 each; the other side wins 3 each; Lone Wolf wins 4 or
 // everyone else gets 1; Blind Wolf wins 6 or everyone else gets 2. Halved holes score nothing.
 if(g.wolf&&ps.length>=3&&ps.length<=4){
  const order=(g.wolf.order||[]).filter(u=>ps.some(p=>p.uid===u)),low=Math.min(...ps.map(p=>p.ch));
  const st=Object.fromEntries(ps.map(p=>[p.uid,g.net?strokeAlloc(meta,p.ch-low):meta.map(()=>0)]));
  const pts={},holes=[];ps.forEach(p=>pts[p.uid]=0);
  const best=(us,i)=>Math.min(...us.map(u=>ps.find(p=>p.uid===u).scores[i]-st[u][i]));
  for(let i=0;i<thru;i++){
   const wolf=order[i%order.length],pk=(g.wolf.picks||[])[i];
   if(!pk||!pk.m||(pk.m==='partner'&&!order.includes(pk.p))){holes.push({wolf,open:true});continue}
   const team=pk.m==='partner'?[wolf,pk.p]:[wolf],rest=order.filter(u=>!team.includes(u)),a=best(team,i),b=best(rest,i);
   let win=null;
   if(a<b){win='wolf';if(pk.m==='partner')team.forEach(u=>pts[u]+=2);else pts[wolf]+=pk.m==='blind'?6:4}
   else if(b<a){win='others';rest.forEach(u=>pts[u]+=pk.m==='partner'?3:pk.m==='blind'?2:1)}
   holes.push({wolf,m:pk.m,p:pk.m==='partner'?pk.p:null,win});
  }
  // Every pair settles the difference in their points.
  const tot=Object.values(pts).reduce((x,y)=>x+y,0);
  ps.forEach(p=>res.net[p.uid]+=g.wolf.stake*(ps.length*pts[p.uid]-tot));
  res.wolf={stake:g.wolf.stake,order,holes,pts,next:thru<n?order[thru%order.length]:null};
 }
 for(const u in res.net)res.net[u]=Math.round(res.net[u]*100)/100;
 res.pays=fewestPayments(res.net);
 return res;
}
// The games for the round being played, scored as it stands.
function draftGames(){
 if(!draft||!draft.games||!(draft.others||[]).length)return null;
 const mk=(uid,holes,ix)=>({uid,scores:holes.map(h=>played(h)?h.score:null),ch:calc({rating:draft.rating,slope:draft.slope,holes},ix).ch||0});
 return scoreGames(draft.games,[mk(S.me,draft.holes,myIndex()),...draft.others.map(o=>mk(o.uid,o.holes,hcp(S.rounds[o.uid]).index))],draft.holes);
}
function gamesCard(res){
 if(!res||(!res.skins&&!res.nassau&&!res.wolf))return '';
 const who=u=>u===S.me?'You':handle(u),ups=(sg,a,b)=>{const t=sg.bets[0].up;return (t?`${who(t>0?a:b)} ${Math.abs(t)} up`:'All square')+(sg.thru&&sg.thru<sg.len?` thru ${sg.thru}`:'')+(sg.bets.length>1?` · ${sg.bets.length-1} press${sg.bets.length>2?'es':''}: ${sg.bets.slice(1).map(bt=>bt.up?`${who(bt.up>0?a:b)} ${Math.abs(bt.up)} up`:'AS').join(', ')}`:'')};
 let h=`<div class="card games"><div class="bet-head"><b>Money Games</b><span class="hint" style="margin:0">${res.netGame?'Net':'Gross'}${res.done?'':' · thru '+res.thru}</span></div>`;
 if(res.skins){const sk=res.skins;
  h+=`<p class="gline"><b>Skins</b> ${fmtMoney(sk.stake)} a skin${sk.carry?', carryovers':''}</p><p class="gsub">${res.players.map(u=>`${esc(who(u))} ${sk.won[u]}`).join(' · ')}${sk.left?` · ${sk.left} skin${sk.left===1?'':'s'} ${res.done?'unclaimed':'carrying'}`:''}</p>`;
  if(res.netGame&&Object.values(sk.strokes).some(v=>v>0))h+=`<p class="gsub hint">Strokes: ${res.players.filter(u=>sk.strokes[u]>0).map(u=>`${esc(who(u))} ${sk.strokes[u]}`).join(' · ')}</p>`;
 }
 if(res.nassau){
  h+=`<p class="gline"><b>Nassau</b> ${fmtMoney(res.nassau.stake)} front, back and overall${res.nassau.press?', auto-press at 2 down':''}</p>`;
  res.nassau.matches.forEach(m=>h+=`<div class="gmatch"><b>${esc(who(m.a))} vs ${esc(who(m.b))}</b>${m.getter?`<span class="hint" style="margin:0"> · ${esc(who(m.getter))} get${m.getter===S.me?'':'s'} ${m.strokes}</span>`:''}
   <span>Front: ${esc(ups(m.front,m.a,m.b))}</span><span>Back: ${m.back.thru?esc(ups(m.back,m.a,m.b)):'Not started'}</span><span>Overall: ${esc(ups(m.total,m.a,m.b))}</span></div>`);
 }
 if(res.wolf){const wf=res.wolf,open=wf.holes.map((x,i)=>x.open?i:-1).filter(i=>i>=0),start=draft&&draft.nine==='back'?10:1;
  h+=`<p class="gline"><b>Wolf</b> ${fmtMoney(wf.stake)} a point</p><p class="gsub">${wf.order.map(u=>`${esc(who(u))} ${wf.pts[u]}`).join(' · ')}${wf.next?` · Next Wolf: ${esc(who(wf.next))}`:''}</p>`;
  if(open.length)h+=`<p class="gsub neg">No Wolf pick on hole${open.length===1?'':'s'} ${open.map(i=>i+start).join(', ')}, so ${open.length===1?'it doesn’t':'they don’t'} count yet.</p>`;
 }
 const mine=res.net[S.me];
 h+=res.pays.length?`<p class="gline" style="margin-top:10px"><b>${res.done?'Settle up':'If it ended now'}</b></p><ul class="paid">${res.pays.map(p=>`<li>${esc(who(p.from))} pay${p.from===S.me?'':'s'} ${esc(p.to===S.me?'you':handle(p.to))} <b>${fmtMoney(p.amt)}</b></li>`).join('')}</ul>`
  :`<p class="gsub" style="margin-top:8px">${res.done?'Nobody owes anything.':'All even so far.'}</p>`;
 if(mine!=null&&res.done&&Math.abs(mine)>=0.01)h+=`<p class="hint" style="margin:0">${mine>0?'You won '+fmtMoney(mine):'You lost '+fmtMoney(mine)}. Settle up from Unsettled on your profile.</p>`;
 return h+`</div>`;
}
// What you and each friend owe each other from money games, minus payments marked paid.
function gameBalances(){
 const bal={};
 (S.rounds[S.me]||[]).forEach(r=>{const g=r.games;if(!g||!g.done||!g.pays)return;g.pays.forEach(x=>{
  if(x.from===S.me)bal[x.to]=(bal[x.to]||0)-x.amt;else if(x.to===S.me)bal[x.from]=(bal[x.from]||0)+x.amt})});
 ledgerPays('games').forEach(p=>{if(!p.confirmed)return;if(p.payer===S.me)bal[p.payee]=(bal[p.payee]||0)+ +p.amount;else if(p.payee===S.me)bal[p.payer]=(bal[p.payer]||0)- +p.amount});
 return Object.entries(bal).map(([u,v])=>[u,Math.round(v*100)/100]).filter(([,v])=>Math.abs(v)>=0.01).sort((a,b)=>b[1]-a[1]);
}
// Money Games setup on the New Round screen (remembered for next time).
const GKEY='sandie-games';
const gsel=()=>S.gsel||(S.gsel={skins:false,skinsStake:5,carry:true,nassau:false,nassauStake:10,press:false,wolf:false,wolfStake:1,net:true,...LS.get(GKEY,{})});
// The Wolf picker on each hole: partner, Lone Wolf, or Blind Wolf.
function wolfPicker(){
 const w=draft&&draft.games&&draft.games.wolf;if(!w)return '';
 const order=w.order,wolf=order[hidx%order.length],pk=(w.picks||[])[hidx]||{},who=u=>u===S.me?'You':handle(u);
 return `<div class="card wolfcard"><b>🐺 Wolf: ${esc(who(wolf))}</b>
  <p class="hint" style="margin:4px 0 8px">${wolf===S.me?'You tee off last, then pick a partner or go alone.':esc(handle(wolf))+' tees off last, then picks a partner or goes alone.'}</p>
  <div class="pick">${order.filter(u=>u!==wolf).map(u=>`<button data-wolfp="${esc(u)}" aria-pressed="${pk.m==='partner'&&pk.p===u}">+ ${esc(who(u))}</button>`).join('')}<button data-wolfm="lone" aria-pressed="${pk.m==='lone'}">Lone Wolf</button><button data-wolfm="blind" aria-pressed="${pk.m==='blind'}">Blind Wolf</button></div></div>`;
}
function gamesSetup(){
 const g=gsel(),tog=(k,l)=>`<button class="toggle" data-gtog="${k}" aria-pressed="${!!g[k]}"><span>${l}</span><b>${g[k]?'On':'Off'}</b></button>`;
 const size=(S.withSel||[]).length+1,wolfOk=size>=3&&size<=4,any=g.skins||g.nassau&&S.nsel==='18'||g.wolf&&wolfOk;
 return `<label>Money Games</label>
  ${tog('skins','Skins')}
  ${g.skins?`<div class="row gopts"><div><label for="gskst">$ per skin</label><input id="gskst" inputmode="decimal" value="${esc(g.skinsStake)}"></div><div style="align-self:end">${tog('carry','Carryovers')}</div></div>`:''}
  ${S.nsel==='18'?tog('nassau','Nassau'):`<p class="hint">Nassau needs 18 holes.</p>`}
  ${g.nassau&&S.nsel==='18'?`<div class="row gopts"><div><label for="gnst">$ per bet</label><input id="gnst" inputmode="decimal" value="${esc(g.nassauStake)}"></div><div style="align-self:end">${tog('press','Auto-press at 2 down')}</div></div>`:''}
  ${wolfOk?tog('wolf','Wolf'):`<p class="hint">Wolf needs 3 or 4 players.</p>`}
  ${g.wolf&&wolfOk?`<div class="row gopts"><div><label for="gwst">$ per point</label><input id="gwst" inputmode="decimal" value="${esc(g.wolfStake)}"></div><div></div></div>`:''}
  ${any?`<div class="seg" style="margin-top:8px">${[[true,'Net (handicaps)'],[false,'Gross']].map(([v,l])=>`<button data-gnet="${v}" aria-pressed="${g.net===v}">${l}</button>`).join('')}</div>
  <p class="hint">${g.nassau&&S.nsel==='18'?'Nassau: everyone plays a match against everyone, with a bet on the front 9, back 9 and overall. ':''}${g.wolf&&wolfOk?'Wolf: the Wolf rotates each hole, tees off last and picks a partner or goes alone. Win with a partner: 2 points each; the other side wins: 3 each; Lone Wolf wins 4 or everyone else gets 1 (Blind Wolf: 6 or 2). Everyone settles the point difference. ':''}${g.net?'Net games use each player’s course handicap from these tees.':'Gross: no handicap strokes.'}</p>`:''}`;
}
function summaryView(){
 const ix=S.status==='ready'?myIndex():null,t=calc(draft,ix);
 let s=`${header('Round Summary',draft.course+' · '+fmtDate(draft.date))}
 <div class="card big"><div><b>${t.score}</b><span>Strokes (${rel(t.score-t.parPlayed)})</span></div><div><b>${t.net!=null?t.net:'—'}</b><span>Net${t.ch!=null?' (CH '+t.ch+')':''}</span></div><div><b>${t.putts==null?'—':t.putts}</b><span>Putts</span></div><div><b>${t.t5}</b><span>Tiger 5 Misses</span></div></div>
 ${holeSum(draft,'beer')||holeSum(draft,'gb')?`<div class="tags" style="margin:-2px 0 10px">${extrasTags(draft)}</div>`:''}
 <div class="card"><table>`;
 RULES.forEach(r=>{const c=t.per[r.k];s+=`<tr><td>${r.n}<div class="bar"><i style="width:${t.holesPlayed?Math.min(100,c/t.holesPlayed*300):0}%"></i></div></td><td class="n">${c}</td></tr>`});
 s+=`</table></div>
 <div class="card"><b>Handicap</b><p class="hint" style="margin-top:4px">${t.diff!=null?`Score differential <b>${fmtDiff(t.diff)}</b> (adjusted gross ${t.ags}). It counts toward your index once posted.`:!t.complete?`You’ve scored ${t.holesPlayed} of ${t.n} holes. Unfinished rounds post, but don’t count toward a handicap.`:'No course rating and slope, so this round won’t count toward a handicap.'}</p></div>`;
 if((draft.others||[]).length){
  s+=`<h2>Your Group</h2><div class="card"><table><thead><tr><th>Player</th><th class="n">Score</th><th class="n">Putts</th><th class="n">Tiger 5</th><th class="n">Diff</th></tr></thead><tbody>${draft.others.map(o=>{const x=calc(otherRound(o),hcp(S.rounds[o.uid]).index);return `<tr><td>${withPic(o.uid,handle(o.uid))}</td><td class="n">${x.score} <span style="font-weight:400;color:var(--mute)">${rel(x.score-x.parPlayed)}</span></td><td class="n" style="font-weight:400">${x.putts==null?'—':x.putts}</td><td class="n" style="font-weight:400">${x.t5}</td><td class="n" style="font-weight:400">${fmtDiff(x.diff)}</td></tr>`}).join('')}</tbody></table>
  <p class="hint">Posting adds each friend’s round to their card, marked as scored by you. They can delete it if something’s wrong.</p></div>`;
  s+=gamesCard(draftGames());
 }
 s+=S.status==='ready'?`<button class="primary wide" style="margin-bottom:8px" data-act="post" ${S.busy?'disabled':''}>${S.busy?'Posting…':(draft.others||[]).length?'Post Rounds for Group':'Post Round'}</button>`:`<div class="card note"><p style="margin:0">Sign in to post this round. It stays saved on this phone until you do.</p></div>`;
 s+=`<div class="row"><button data-act="back">Back to Holes</button>${S.confirm==='discard'?`<button class="danger" data-act="discard">Yes, discard</button>`:`<button data-act="ask" data-c="discard">Discard Round</button>`}</div>`;
 return s;
}

/* ---------- actions ---------- */
function go(view,arg){
 if(view!==S.view||arg!==S.arg){S.exSplit=null;S.exPaidBy=null;S.exFile=null}
 S.view=view;S.arg=arg||null;S.confirm=null;S.editName=false;S.settling=null;S.receiptView=null;S.photoView=null;
 rememberPlace();render();
}
// Refreshing keeps you on the same page (and trip section); a fresh launch starts on the Feed.
const VIEWS=['feed','play','trips','trip','newtrip','board','newbet','leaders','settings','friends','player','round'];
function rememberPlace(){try{sessionStorage.setItem('t19-place',JSON.stringify({view:S.view,arg:S.arg,tripTabs:S.tripTabs,tripsFilter:S.tripsFilter||null}))}catch(e){}}
try{
 const p=JSON.parse(sessionStorage.getItem('t19-place')||'null');
 if(p&&VIEWS.includes(p.view)){S.view=p.view;S.arg=typeof p.arg==='string'?p.arg:null;S.tripTabs=p.tripTabs&&typeof p.tripTabs==='object'?p.tripTabs:{};S.tripsFilter=p.tripsFilter||undefined}
}catch(e){}
async function postRound(){
 if(!draft||S.busy)return;
 const ix=myIndex(),t=calc(draft,ix),sc=draft.scorecards||[],titlesBefore=titleHolders();
 // Your round, plus one round per friend you scored (posted to their card, marked as entered by you).
 // Money games: the final result (and who pays whom) is saved on every player's round.
 const games=draftGames();
 const rows=[JSON.parse(JSON.stringify(toRow(draft,t,ix,{scorecards:sc,games})))];
 (draft.others||[]).forEach(o=>{const oix=hcp(S.rounds[o.uid]).index,ot=calc(otherRound(o),oix);
  rows.push(JSON.parse(JSON.stringify(toRow({...draft,id:o.id,holes:o.holes},ot,oix,{user_id:o.uid,entered_by:S.me,scorecards:sc,games}))))});
 const ids=rows.map(r=>r.id);
 LS.set(OUTKEY,[...LS.get(OUTKEY,[]).filter(r=>!ids.includes(r.id)),...rows]);
 rows.forEach(row=>(S.rounds[row.user_id]=S.rounds[row.user_id]||[]).unshift(fromRow({...row,created_at:new Date().toISOString(),_pending:true})));
 clearTimeout(liveT);liveClear(ids); // the round is posting, so it's no longer "on the course"
 draft=null;saveDraft();playView='start';cacheSave();
 go('feed');
 if(!navigator.onLine)return toast('Saved. It posts when you have signal.');
 if(await flushOutbox())announceTitles(titlesBefore);
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
 const url=inviteUrl(),text=`Add me on Sandie so we can see each other's golf scores. My code is ${me().friend_code}.`;
 if(navigator.share){try{await navigator.share({title:'Sandie',text,url});return}catch(e){if(e&&e.name==='AbortError')return}}
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
  const inp=document.getElementById(d.input||'cbody'),body=inp?inp.value.trim():'';if(!body)return toast('Write a comment first.');
  const c={id:newId(),round_id:d.id,user_id:S.me,body,created_at:new Date().toISOString()};
  S.busy=true;render();
  const {error}=await sb.from('round_comments').insert({id:c.id,round_id:c.round_id,user_id:c.user_id,body});
  S.busy=false;
  if(error){fail(error,'Couldn’t post the comment.');return render()}
  (S.comments[d.id]=S.comments[d.id]||[]).push(c);const again=document.getElementById(d.input||'cbody');if(again)again.value='';return render();
 }
 if(d.cstate){S.cstate=d.cstate;return render()}
 if(d.cfilter){S.cfilter=d.cfilter;return render()}
 if('course' in d&&b.closest('.cpick')){
  // Picked a course (or Other course): close the picker and load its tees, rating and slope.
  S.courseKey=d.course;S.picking=false;render();
  const c=$('#course');if(c)c.dispatchEvent(new Event('change',{bubbles:true}));return;
 }
 if(a==='pickcourse'){S.picking=!S.picking;if(S.picking)S.cstate=(COURSES[S.courseKey]&&COURSES[S.courseKey].state)||S.cstate||'VA';return render()}
 if(d.gtog||d.gnet){
  const g=gsel(),num=(id,k)=>{const el=$(id);if(el&&+el.value>0)g[k]=Math.round(+el.value*100)/100};
  num('#gskst','skinsStake');num('#gnst','nassauStake');
  if(d.gtog)g[d.gtog]=!g[d.gtog];else g.net=d.gnet==='true';
  LS.set(GKEY,g);return render();
 }
 if(d.withsel){const s=new Set(S.withSel||[]);if(s.has(d.withsel))s.delete(d.withsel);else{if(s.size>=3)return toast('A group is you plus 3 friends.');s.add(d.withsel)}S.withSel=[...s];return render()}
 if(d.badgetip)return toast(d.badgetip);
 if(d.pushcat)return pushCat(d.pushcat);
 if(a==='pushon')return pushOn();
 if(a==='pushoff')return pushOff();
 if(a==='nudge'){b.disabled=true;await nudge(d.u,+d.amt,d.tid,d.ledger);b.disabled=false;return}
 if(a==='markpaid'||a==='ipaid'){b.disabled=true;return recordPayment(d,a==='markpaid')}
 if(a==='confirmpay'){b.disabled=true;const {error}=await sb.from('payments').update({confirmed:true,confirmed_at:new Date().toISOString()}).eq('id',d.id);if(error)return fail(error,'Couldn’t confirm that payment.');toast('Payment confirmed');return loadAll()}
 if(a==='undopay'){b.disabled=true;const {error}=await sb.from('payments').delete().eq('id',d.id);if(error)return fail(error,'Couldn’t remove that payment.');toast('Payment removed');return loadAll()}
 if(d.lbper){S.lbPeriod=d.lbper;return render()}
 if(d.lbcat){S.lbCat=d.lbcat;return render()}
 if(d.viewphoto){S.photoView=d.viewphoto;return render()}
 if(d.tfilter){S.tripsFilter=d.tfilter;rememberPlace();return render()}
 if(d.ttab){S.tripTabs[S.arg]=d.ttab;rememberPlace();S.confirm=null;S.receiptView=null;S.teeEdit=null;S.teeFormOpen=false;return render()}
 if(d.tcat){S.tripCat=d.tcat;return render()}
 if(d.tcp){const s=new Set(S.tcSel||[S.me]);if(s.has(d.tcp))s.delete(d.tcp);else{if(s.size>=4)return toast('A group is 4 players.');s.add(d.tcp)}S.tcSel=[...s];return render()}
 if(a==='teesave'){const t=curTrip();if(t)saveTee(t);return}
 if(a==='teeopen'){S.teeEdit=null;S.tcSel=null;S.tcKey=null;S.teeFormOpen=true;render();['#tctime','#tccourse','#tctee','#tcnote'].forEach(id=>{const el=$(id);if(el)el.value=''});const f=$('#teeform');if(f)f.scrollIntoView({block:'start',behavior:'smooth'});return}
 if(a==='teecancel'){S.teeEdit=null;S.tcSel=null;S.tcKey=null;S.teeFormOpen=false;return render()}
 if(a==='teeedit'||a==='teecopy'){const t=curTrip(),x=t&&(S.teeTimes[t.id]||[]).find(y=>y.id===d.id);if(x)fillTeeForm(x,a==='teecopy');return}
 if(a==='teedel'){S.confirm=null;const {error}=await sb.from('tee_times').delete().eq('id',d.id);if(error)return fail(error,'Couldn’t delete the tee time.');toast('Tee time deleted');return loadAll()}
 if(a==='teestart'){const t=curTrip(),x=t&&(S.teeTimes[t.id]||[]).find(y=>y.id===d.id);if(x)startTee(x);return}
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
  S.me=data.user.id;S.email=data.user.email||'';S.status='loading';render();pushSync();return loadAll();
 }
 if(a==='join'){
  const v=$('#handle').value.trim();if(!v)return toast('Pick a name your friends will recognize.');
  S.busy=true;render();
  const {error}=await sb.from('profiles').insert({id:S.me,handle:v});
  S.busy=false;if(error){fail(error,'Couldn’t save your name.');return render()}
  S.status='loading';return loadAll();
 }
 if(a==='signout'){await pushOff(true);await sb.auth.signOut();LS.set(CACHEKEY,null);try{sessionStorage.removeItem('t19-place')}catch(e){}location.reload();return}
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
 if(a==='hidesuggest'){LS.set(HIDEKEY,[...LS.get(HIDEKEY,[]),d.id].slice(-200));return render()}
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
 if(a==='rmphoto'){S.confirm=null;
  const old=photoOf(S.me);const {error}=await sb.from('profiles').update({avatar_url:null}).eq('id',S.me);
  if(error)return fail(error,'Couldn’t remove your photo.');
  S.profiles[S.me]={...me(),avatar_url:null};if(old)sb.storage.from('avatars').remove([old.slice(AVATAR_PREFIX.length)]).catch(()=>{});
  toast('Photo removed');return render();
 }
 if(a==='addexpense')return addExpense();
 if(a==='exnofile'){S.exFile=null;return render()}
 if(a==='viewreceipt'){
  const {data,error}=await sb.storage.from('receipts').createSignedUrl(d.path,600);
  if(error)return fail(error,'Couldn’t open the receipt.');
  S.receiptView={url:data.signedUrl,pdf:/\.pdf$/i.test(d.path)};return render();
 }
 if(a==='savevenmo'){
  const v=$('#venmo').value.trim().replace(/^@/,'');
  if(v&&!/^[A-Za-z0-9_-]{5,30}$/.test(v))return toast('Venmo usernames are 5–30 letters, numbers, - or _.');
  const {error}=await sb.from('profile_private').upsert({id:S.me,venmo:v||null});
  if(error)return fail(error,'Couldn’t save your Venmo.');
  S.venmo=S.venmo||{};if(v)S.venmo[S.me]=v;else delete S.venmo[S.me];toast(v?'Venmo saved':'Venmo removed');return render();
 }
 if(a==='closephoto'){S.photoView=null;return render()}
 if(a==='viewscorecard'){
  const {data,error}=await sb.storage.from('scorecards').createSignedUrl(d.path,600);
  if(error)return fail(error,'Couldn’t open the scorecard.');
  const k=(S.arg||'').split('/')[1];S.receiptView={url:data.signedUrl,round:k};return render();
 }
 if(a==='closereceipt'){S.receiptView=null;return render()}
 if(a==='delexpense'){
  S.confirm=null;const e=Object.values(S.expenses).flat().find(x=>x.id===d.id);
  const {error}=await sb.from('expenses').delete().eq('id',d.id);if(error)return fail(error,'Couldn’t delete the receipt.');
  if(e&&e.receipt_path)sb.storage.from('receipts').remove([e.receipt_path]).catch(()=>{});
  toast('Receipt deleted');return loadAll();
 }
 if(a==='bbamount'){const p=(S.boardPicks[d.id]||[]).find(x=>x.user_id===S.me);if(p)return pickBoard(d.id,p.option);return}
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
  toast(a==='endtrip'?'Trip ended':'Trip reopened');await loadAll();
  if(a==='endtrip')sendSettleUp(t.id);
  return;
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
  const blank=()=>Array.from({length:len},(_,j)=>{const i=j+off;return c?{par:c.par[i],yds:c.tees[tee].yds[i],si:c.si[i],score:null,putts:2,sc:false,ud:false,beer:0,gb:0,club:0,mush:0}:{par:4,si:i+1,score:null,putts:2,sc:false,ud:false,beer:0,gb:0,club:0,mush:0}}); // putts start at 2
  // Your round is draft.holes; each friend you're scoring is in draft.others with their own holes.
  draft={id:newId(),course:c?c.name:($('#cname').value.trim()||'My round'),tee:c?tee:'',rating:$('#rating').value.trim(),slope:$('#slope').value.trim(),date:$('#rdate').value||today(),nine:n==='18'?null:n,
   holes:blank(),others:(S.withSel||[]).filter(isFriend).slice(0,3).map(uid=>({uid,id:newId(),holes:blank()})),
   scorecards:c?[]:[S.scPaths&&S.scPaths.front,S.scPaths&&S.scPaths.back].filter(Boolean)};
  // Money games (only with a group). Stakes come from the setup fields.
  const g=gsel(),stake=(id,def)=>{const el=$(id),v=el?Math.round(+el.value*100)/100:def;return v>0&&v<10000?v:def};
  const wolfOk=draft.others.length>=2&&draft.others.length<=3;
  if(draft.others.length&&(g.skins||g.nassau&&n==='18'||g.wolf&&wolfOk)){
   if(g.skins)g.skinsStake=stake('#gskst',g.skinsStake);if(g.nassau)g.nassauStake=stake('#gnst',g.nassauStake);if(g.wolf)g.wolfStake=stake('#gwst',g.wolfStake);LS.set(GKEY,g);
   draft.games={net:!!g.net,skins:g.skins?{stake:g.skinsStake,carry:!!g.carry}:null,nassau:g.nassau&&n==='18'?{stake:g.nassauStake,press:!!g.press}:null,
    wolf:g.wolf&&wolfOk?{stake:g.wolfStake,order:[S.me,...draft.others.map(o=>o.uid)],picks:[]}:null};
  }
  S.withSel=[];S.scPaths=null;hidx=0;playView='hole';saveDraft();return render();
 }
 if(a==='post')return postRound();
 if(a==='discard'){liveClear([draft.id,...(draft.others||[]).map(o=>o.id)]);draft=null;saveDraft();playView='start';S.confirm=null;return render()}
 if(a==='back'){playView='hole';S.confirm=null;return render()}
 if(a==='tosum'){playView='sum';return render()}
 if(!draft)return;
 // Buttons with data-p change a friend's hole; everything else changes yours.
 const pl=d.p?(draft.others||[])[+d.p-1]:null,h=pl?pl.holes[hidx]:draft.holes[hidx];
 const everyone=()=>[draft.holes,...(draft.others||[]).map(o=>o.holes)];
 // Putts are required before moving ahead (going back to earlier holes is fine).
 const needPutts=()=>{if(h.putts!=null)return false;S.puttsNag=true;render();toast('Enter putts for this hole first.');return true};
 if(d.go!=null){if(+d.go>hidx&&needPutts())return;S.puttsNag=false;hidx=+d.go}
 else if(d.par)everyone().forEach(hs=>hs[hidx].par=+d.par); // par is the same for the whole group
 else if(d.sc)h.score=Math.max(1,(h.score==null?h.par:h.score)+ +d.sc);
 else if(d.pt){h.putts=h.putts==null?(+d.pt>0?1:0):Math.max(0,h.putts+ +d.pt);if(h.score==null)h.score=h.par}
 else if(d.tg){h[d.tg]=!h[d.tg];if(h.score==null)h.score=h.par}
 else if(d.beer){h.beer=Math.max(0,(h.beer||0)+ +d.beer);if((h.shot||0)>h.beer)h.shot=h.beer} // a shotgun is a beer
 else if(d.shot){if(+d.shot>0&&(h.shot||0)>=(h.beer||0))return toast('Add the beer first. Every shotgun counts as a beer too.');h.shot=Math.max(0,(h.shot||0)+ +d.shot)}
 else if(d.gb)h.gb=Math.max(0,(h.gb||0)+ +d.gb);
 else if(d.club)h.club=Math.max(0,(h.club||0)+ +d.club);
 else if(d.mush)h.mush=Math.max(0,(h.mush||0)+ +d.mush);
 else if((d.wolfp||d.wolfm)&&draft.games&&draft.games.wolf){ // tap the same choice again to clear it
  const w=draft.games.wolf,cur=(w.picks=w.picks||[])[hidx]||{},nx=d.wolfp?{m:'partner',p:d.wolfp}:{m:d.wolfm};
  w.picks[hidx]=cur.m===nx.m&&cur.p===nx.p?null:nx;
 }
 else if(a==='prev'){S.puttsNag=false;hidx--}
 else if(a==='next'){if(needPutts())return;S.puttsNag=false;everyone().forEach(hs=>{if(hs[hidx].score==null)hs[hidx].score=hs[hidx].par});if(hidx===draft.holes.length-1)playView='sum';else hidx++}
 else return;
 saveDraft();render();liveSoon();
});
document.addEventListener('change',e=>{
 const id=e.target.id;
 if(id==='course'){const v=e.target.value,t=$('#tee');t.innerHTML=v?teeOpts(v):'<option value="">n/a</option>';t.disabled=!v;$('#otherWrap').hidden=!!v;const rs=v?teeRS(v,t.value):{r:'',s:''};$('#rating').value=rs.r;$('#slope').value=rs.s;updateCH()}
 if(id==='bkind'){S.betKind=e.target.value;return render()}
 if(id==='tccourse'){const k=courseKeyByName(e.target.value);if(k!==S.tcKey){S.tcKey=k;const tee=$('#tctee'),v=tee&&tee.value;render();const t2=$('#tctee');if(t2&&v&&(t2.tagName!=='SELECT'||[...t2.options].some(o=>o.value===v)))t2.value=v}return}
 if(id==='tcday'){S.tcDay=e.target.value;return}
 if(id==='sc-front'||id==='sc-back'){const f=e.target.files&&e.target.files[0];if(f)uploadScorecard(id.slice(3),f);return}
 if(id==='avfile'){const f=e.target.files&&e.target.files[0];if(f)uploadPhoto(f);return}
 if(id==='exphoto'){const f=e.target.files&&e.target.files[0];if(f&&f.size>20e6)return toast('That file is too big. Try a smaller photo.');S.exFile=f||null;return render()}
 if(id==='tee'){const rs=teeRS($('#course').value,e.target.value);$('#rating').value=rs.r;$('#slope').value=rs.s;updateCH()}
});
document.addEventListener('input',e=>{if(e.target.id==='rating'||e.target.id==='slope')updateCH();if(e.target.id==='csearch'){S.csearch=e.target.value;render()}});
document.addEventListener('keydown',e=>{
 if(e.key!=='Enter')return;
 const auth=S.authStep==='signup'?'signup':'signin';
 const map={email:auth,pw:auth,pw2:auth,handle:'join',fsearch:'search',newname:'savename',cbody:'postcomment'};
 if(/^fc-/.test(e.target.id)){e.preventDefault();const b=e.target.parentElement.querySelector('[data-act="postcomment"]');if(b)b.click();return}
 const act=map[e.target.id];if(act){e.preventDefault();const b=document.querySelector(`[data-act="${act}"]`);if(b)b.click()}
});

/* ---------- start up ---------- */
// The trip leaderboard refreshes every minute while it's open, for live scores.
setInterval(()=>{const t=S.view==='trip'&&curTrip();if(t&&(S.tripTabs[t.id]||'')==='standings'&&document.visibilityState==='visible'&&S.status==='ready'&&!S.busy)loadAll()},60000);
window.addEventListener('online',()=>{if(S.status==='ready'){flushOutbox();if(S.offline)loadAll()}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&S.status==='ready'&&!S.busy)loadAll()});
if('serviceWorker' in navigator&&location.protocol==='https:'){
 // When a new version takes over, reload once so the new code runs right away
 // (skipped on the very first install, when nothing was running before).
 const hadController=!!navigator.serviceWorker.controller;let reloaded=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(hadController&&!reloaded&&!S.busy){reloaded=true;try{sessionStorage.setItem('t19-skip-splash','1')}catch(e){}location.reload()}});
 // A tapped notification while the app is already open.
 navigator.serviceWorker.addEventListener('message',e=>{const u=e.data&&e.data.open;if(typeof u==='string'&&S.status==='ready')loadAll().then(()=>openLink(u))});
 navigator.serviceWorker.register('sw.js').then(reg=>{
  // Installed home-screen apps rarely restart, so look for updates whenever the app is reopened.
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{})});
 }).catch(()=>{});
}

(async()=>{
 captureInvite();
 // Opened from a notification: remember where to go, then tidy the address bar.
 const link=/[?&]go=/.test(location.search)?location.href:null;
 if(link)history.replaceState(null,'',location.pathname+location.hash);
 render();
 if(!sb){S.status='error';return render()}
 sb.auth.onAuthStateChange((ev)=>{if(ev==='SIGNED_OUT'){S.me=null;S.status='auth';render()}});
 const {data:{session}}=await sb.auth.getSession();
 if(!session){S.status='auth';return render()}
 S.me=session.user.id;S.email=session.user.email||'';
 if(cacheLoad()){S.status='ready';addPendingLocal();render()}
 pushSync();
 await loadAll();
 if(link&&S.status==='ready')openLink(link);
})();
