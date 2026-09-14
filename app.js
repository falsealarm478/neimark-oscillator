/* Rendering is separate from the exact physics in physics.js. No network dependencies. */
'use strict';
const $=id=>document.getElementById(id);
const C={green:'#c1ed83',orange:'#f3ab71',purple:'#b7a2eb',grid:'#2b332b',axis:'#63715e',muted:'#92a08b',bg:'#181c1a'};
let sim,playing=true,last=0,extent=1.6,flash=0;
const presets={base:{delta:.055,a:1,h:1,v0:.42},slow:{delta:.025,a:1,h:.8,v0:.65},spiral:{delta:.065,a:1,h:0,v0:.42}};
function params(){return Object.fromEntries(['delta','a','h','v0'].map(k=>[k,Number($(k).value)]));}
function reset(){sim=new Neimark.Oscillator(params());extent=Math.max(1.5,sim.a*1.4,Math.abs(sim.v0)*1.5);flash=0;$('notice').hidden=true;for(const [k,v] of Object.entries(params()))$(k+'Value').value=v.toFixed(k==='delta'?3:2);$('q').textContent=Math.exp(Math.PI*sim.delta).toFixed(3);draw();}
function setPlaying(value){playing=value;$('play').textContent=playing?'Ⅱ Пауза':'▶ Продолжить';draw();}
function advance(dt){const hits=sim.hits;try{sim.advance(dt);}catch(e){playing=false;$('play').textContent='▶ Продолжить';$('notice').textContent=e.message;$('notice').hidden=false;}if(sim.hits>hits)flash=1;}
for(const k of ['delta','a','h','v0'])$(k).addEventListener('input',()=>{$('preset').value='custom';reset();});
$('preset').addEventListener('change',()=>{const p=presets[$('preset').value];if(p){for(const [k,v] of Object.entries(p))$(k).value=v;reset();}});
$('play').onclick=()=>setPlaying(!playing);
$('reset').onclick=reset;
$('step').onclick=()=>{setPlaying(false);advance(Math.PI);draw();};
for(const k of ['projection','section'])$(k).onchange=()=>draw();
$('help').onclick=()=>$('guide').showModal();
$('closeHelp').onclick=$('understood').onclick=()=>$('guide').close();
$('guide').addEventListener('click',e=>{if(e.target===$('guide')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['INPUT','SELECT','BUTTON','A'].includes(document.activeElement.tagName)&&!$('guide').open){e.preventDefault();setPlaying(!playing);}});
$('export').onclick=()=>{const rows=['n,t,v_n,v_before,v_next,impact',...sim.events.map(e=>[e.n,e.t,e.prev,e.before,e.after,Number(e.hit)].join(','))];const url=URL.createObjectURL(new Blob([rows.join('\r\n')],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='neimark-poincare.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
function canvas(id){const el=$(id),r=el.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=r.width,h=r.height;if(el.width!==Math.round(w*dpr)||el.height!==Math.round(h*dpr)){el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);}const g=el.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);g.font='10px Segoe UI, Arial';g.lineJoin='round';g.lineCap='round';return {g,w,h};}
function line(g,x1,y1,x2,y2,color,width=1,dash=[]){g.beginPath();g.strokeStyle=color;g.lineWidth=width;g.setLineDash(dash);g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.setLineDash([]);}
function dot(g,x,y,color,r=4,glow=false){if(glow){g.shadowColor=color;g.shadowBlur=15;}g.fillStyle=color;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.shadowBlur=0;}
function text(g,s,x,y,color=C.muted,align='left'){g.fillStyle=color;g.textAlign=align;g.fillText(s,x,y);}
function fmt(v){if(Math.abs(v)<1e-9)return '0';return Math.abs(v)>=100?v.toFixed(0):Math.abs(v)>=10?v.toFixed(1):v.toFixed(2).replace(/0$/,'');}
function axes(c,xmin,xmax,ymin,ymax,xlabel,ylabel){
  const {g,w,h}=c,L=49,R=w-24,T=28,B=h-34;
  const X=x=>L+(x-xmin)/(xmax-xmin)*(R-L),Y=y=>B-(y-ymin)/(ymax-ymin)*(B-T);
  for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;line(g,X(x),T,X(x),B,C.grid);line(g,L,Y(y),R,Y(y),C.grid);text(g,fmt(x),X(x),B+18,C.muted,'center');text(g,fmt(y),L-10,Y(y)+3,C.muted,'right');}
  if(xmin<=0&&xmax>=0)line(g,X(0),T,X(0),B,C.axis);
  if(ymin<=0&&ymax>=0)line(g,L,Y(0),R,Y(0),C.axis);
  text(g,xlabel,R+9,B+4,C.muted);text(g,ylabel,L-4,14,C.muted,'right');
  return {...c,X,Y,L,R,T,B};
}
function clip(p,fn){p.g.save();p.g.beginPath();p.g.rect(p.L,p.T,p.R-p.L,p.B-p.T);p.g.clip();fn();p.g.restore();}
function path(p,points,getX,getY,color=C.green){clip(p,()=>{const g=p.g;g.strokeStyle=color;g.lineWidth=1.5;g.beginPath();let first=true;for(const v of points){const x=p.X(getX(v)),y=p.Y(getY(v));if(first||v.jump){g.moveTo(x,y);first=false;}else g.lineTo(x,y);}g.stroke();});}
function arrow(g,x,y,dx,color){if(Math.abs(dx)<2)return;line(g,x,y,x+dx,y,color,1.7);line(g,x+dx,y,x+dx-Math.sign(dx)*6,y-4,color,1.7);line(g,x+dx,y,x+dx-Math.sign(dx)*6,y+4,color,1.7);}
function drawOscillator(){
  const {g,w,h}=canvas('oscillator'),cx=w/2,cy=62,left=32,right=w-32,scale=(right-left)*.36/extent,px=cx+sim.x*scale;
  line(g,left,cy+26,right,cy+26,'#475140',2);
  for(let i=-2;i<=2;i++){const x=cx+i*(right-left)*.18;line(g,x,cy+22,x,cy+30,'#63715e');text(g,fmt(i*extent/2),x,cy+46,C.muted,'center');}
  text(g,'x',right+8,cy+29);line(g,cx,20,cx,cy+29,C.axis,1,[3,4]);text(g,'x = 0',cx,16,C.muted,'center');
  g.fillStyle='#394235';g.fillRect(left,cy-20,6,46);for(let i=0;i<6;i++)line(g,left-7,cy-18+i*8,left,cy-24+i*8,'#5b6853');
  const end=px-16,start=left+6;g.beginPath();g.moveTo(start,cy);g.lineTo(start+10,cy);const len=end-start-20;for(let i=0;i<=22;i++)g.lineTo(start+10+len*i/22,cy+(i===0||i===22?0:(i%2?7:-7)));g.lineTo(end,cy);g.strokeStyle='#84986e';g.lineWidth=1.5;g.stroke();
  const color=flash>.15?C.orange:C.green;g.shadowColor=color;g.shadowBlur=18;g.fillStyle=color;g.beginPath();g.roundRect(px-14,cy-14,28,28,8);g.fill();g.shadowBlur=0;dot(g,px,cy,'#38472c',3);
  arrow(g,px,cy-25,Math.max(-55,Math.min(55,sim.v/extent*55)),color);text(g,'v',px,cy-38,color,'center');
  if(flash>.15){g.globalAlpha=flash;g.strokeStyle=C.orange;g.beginPath();g.arc(cx,cy,22+(1-flash)*28,0,Math.PI*2);g.stroke();g.globalAlpha=1;text(g,'УДАР · −h',cx+38,24,C.orange);}
}
function drawPhase(){
  const p=axes(canvas('phase'),-extent,extent,-extent,extent,'x','v');
  path(p,sim.points,e=>e.x,e=>e.v);
  clip(p,()=>{for(const e of sim.events.filter(e=>e.t>=sim.t-24*Math.PI)){if(e.hit)line(p.g,p.X(0),p.Y(e.before),p.X(0),p.Y(e.after),C.orange,2);if($('section').checked)dot(p.g,p.X(0),p.Y(e.after),C.purple,2.5);}
    line(p.g,p.L,p.Y(sim.a),p.R,p.Y(sim.a),'#a27a5355',1,[4,5]);
    if($('projection').checked)line(p.g,p.X(sim.x),p.Y(sim.v),p.R,p.Y(sim.v),'#c1ed8380',1,[4,4]);
    dot(p.g,p.X(sim.x),p.Y(sim.v),C.green,4.5,true);
  });text(p.g,'a',p.R-3,p.Y(sim.a)-5,C.orange,'right');
}
function drawTimeline(){
  const span=8*Math.PI,min=Math.max(0,sim.t-span*.92),max=min+span;
  const p=axes(canvas('timeline'),min,max,-extent,extent,'t','v');
  clip(p,()=>{line(p.g,p.L,p.Y(sim.a),p.R,p.Y(sim.a),'#a27a5377',1,[4,5]);for(const e of sim.events.filter(e=>e.t>=min)){if(e.hit){line(p.g,p.X(e.t),p.T,p.X(e.t),p.B,'#f3ab711c');line(p.g,p.X(e.t),p.Y(e.before),p.X(e.t),p.Y(e.after),C.orange,2);}}});
  path(p,sim.points.filter(e=>e.t>=min-.03),e=>e.t,e=>e.v);
  clip(p,()=>{if($('projection').checked)line(p.g,p.L,p.Y(sim.v),p.X(sim.t),p.Y(sim.v),'#c1ed8380',1,[4,4]);dot(p.g,p.X(sim.t),p.Y(sim.v),C.green,4.5,true);});text(p.g,'a',p.R-3,p.Y(sim.a)-5,C.orange,'right');
}
function drawMap(){
  const q=Math.exp(Math.PI*sim.delta),r=extent,p=axes(canvas('map'),-r,r,-r,r,'vₙ','vₙ₊₁'),threshold=-sim.a/q;
  clip(p,()=>{
    line(p.g,p.X(-r),p.Y(-r),p.X(r),p.Y(r),'#65705a',1,[4,5]);
    // Separate branches: never draw an artificial vertical connector at the discontinuity.
    if(threshold>-r)line(p.g,p.X(-r),p.Y(q*r-sim.h),p.X(Math.min(threshold,r)),p.Y(-q*Math.min(threshold,r)-sim.h),'#9580c1',1.5);
    if(threshold<r)line(p.g,p.X(Math.max(-r,threshold)),p.Y(-q*Math.max(-r,threshold)),p.X(r),p.Y(-q*r),'#9580c1',1.5);
    if(threshold>=-r&&threshold<=r){line(p.g,p.X(threshold),p.T,p.X(threshold),p.B,'#f3ab7144',1,[3,5]);dot(p.g,p.X(threshold),p.Y(sim.a-sim.h),C.purple,4);dot(p.g,p.X(threshold),p.Y(sim.a-sim.h),C.bg,2.5);dot(p.g,p.X(threshold),p.Y(sim.a),C.purple,3);}
    sim.events.forEach((e,i)=>{p.g.globalAlpha=.22+.68*(i+1)/sim.events.length;dot(p.g,p.X(e.prev),p.Y(e.after),C.purple,3);});p.g.globalAlpha=1;
    const e=sim.events.at(-1);if(e){dot(p.g,p.X(e.prev),p.Y(e.after),C.purple,5,true);p.g.strokeStyle='#ece2ff';p.g.beginPath();p.g.arc(p.X(e.prev),p.Y(e.after),8,0,Math.PI*2);p.g.stroke();}
  });
  text(p.g,'−a/q',p.X(threshold),p.T-9,C.orange,'center');
  if(!sim.events.length)text(p.g,'Точки появятся при пересечении x = 0',(p.L+p.R)/2,(p.T+p.B)/2+30,C.muted,'center');
}
function draw(){if(!sim)return;let peak=Math.max(1,sim.a,Math.abs(sim.v),Math.abs(sim.x));for(const p of sim.points)peak=Math.max(peak,Math.abs(p.x),Math.abs(p.v));for(const e of sim.events)peak=Math.max(peak,Math.abs(e.prev),Math.abs(e.after));extent=Math.max(extent,Math.ceil(peak*1.15*4)/4);drawOscillator();drawPhase();drawTimeline();drawMap();$('time').textContent=sim.t.toFixed(2);$('position').textContent=sim.x.toFixed(3);$('velocity').textContent=sim.v.toFixed(3);$('impacts').textContent=sim.hits;$('samples').textContent=`${sim.n} пересечений · ${sim.events.length} пар`;$('status').textContent=flash>.15?'● УДАР':playing?'● ДВИЖЕНИЕ':'● ПАУЗА';$('status').className='live'+(flash>.15?' impact':'');}
function frame(now){const dt=last?Math.min((now-last)/1000,.05):0;last=now;if(playing&&!document.hidden&&!$('guide').open)advance(dt*Number($('speed').value));flash=Math.max(0,flash-dt*1.8);draw();requestAnimationFrame(frame);}
window.addEventListener('resize',draw);
reset();requestAnimationFrame(frame);
