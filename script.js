// ── Navbar scroll ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));

// ── Hamburger ──
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); }));

// ── Hero Slider ──
const hTrack = document.getElementById('heroTrack');
const hDots  = document.querySelectorAll('#heroDots .hero-dot');
let hIdx = 0, hTotal = 3, hTimer;
function goHero(i){ hIdx=(i+hTotal)%hTotal; hTrack.style.transform=`translateX(-${hIdx*(100/3)}%)`; hDots.forEach((d,j)=>d.classList.toggle('active',j===hIdx)); }
document.getElementById('heroNext').addEventListener('click',()=>{ clearTimeout(hTimer); goHero(hIdx+1); startH(); });
document.getElementById('heroPrev').addEventListener('click',()=>{ clearTimeout(hTimer); goHero(hIdx-1); startH(); });
hDots.forEach((d,i)=>d.addEventListener('click',()=>{ clearTimeout(hTimer); goHero(i); startH(); }));
function startH(){ hTimer=setTimeout(()=>{ goHero(hIdx+1); startH(); },5500); } startH();

// ── File Tabs ──
document.querySelectorAll('.file-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.file-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.files-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ── Testimonials Slider ──
const tTrack = document.getElementById('testiTrack');
const tDotsEl = document.getElementById('testiDots');
const tCards = tTrack.querySelectorAll('.testi-card');
let tIdx = 0, tTimer;
function getVis(){ return window.innerWidth>=1024?3:window.innerWidth>=600?2:1; }
function buildTDots(){
  tDotsEl.innerHTML='';
  const n = tCards.length - getVis() + 1;
  for(let i=0;i<n;i++){
    const d=document.createElement('button'); d.className='t-dot'+(i===0?' active':'');
    d.addEventListener('click',()=>{ clearTimeout(tTimer); goT(i); startT(); });
    tDotsEl.appendChild(d);
  }
}
function goT(i){
  const vis=getVis(); const max=tCards.length-vis;
  tIdx=Math.max(0,Math.min(i,max));
  const gap=24; const cw=(tTrack.parentElement.offsetWidth-gap*(vis-1))/vis;
  tTrack.style.transform=`translateX(-${tIdx*(cw+gap)}px)`;
  document.querySelectorAll('.t-dot').forEach((d,j)=>d.classList.toggle('active',j===tIdx));
}
document.getElementById('testiNext').addEventListener('click',()=>{ clearTimeout(tTimer); goT(tIdx+1); startT(); });
document.getElementById('testiPrev').addEventListener('click',()=>{ clearTimeout(tTimer); goT(tIdx-1); startT(); });
function startT(){ tTimer=setTimeout(()=>{ const vis=getVis(); tIdx>=tCards.length-vis?tIdx=-1:''; goT(tIdx+1); startT(); },4500); }
buildTDots(); startT();
window.addEventListener('resize',()=>{ buildTDots(); goT(0); });

// ── Scroll Reveal ──
const io = new IntersectionObserver(e=>{ e.forEach(x=>{ if(x.isIntersecting) x.target.classList.add('visible'); }); },{threshold:.1});
document.querySelectorAll('.reveal').forEach(r=>io.observe(r));