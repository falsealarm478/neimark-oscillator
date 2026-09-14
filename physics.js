/* Exact event-driven Neimark oscillator. Works both offline and in Node tests. */
(function(root){
  'use strict';
  const PI=Math.PI;
  function transition(v,delta,a,h){const before=-Math.exp(PI*delta)*v;return {before,after:before>a?before-h:before,hit:before>a&&h>0};}
  class Oscillator{
    constructor({delta=.055,a=1,h=1,v0=.42}={}){
      if(![delta,a,h,v0].every(Number.isFinite)||delta<0||a<=0||h<0)throw new RangeError('Invalid parameters');
      Object.assign(this,{delta,a,h,v0,t:0,x:0,v:v0,n:0,hits:0,base:v0});
      this.points=[{t:0,x:0,v:v0}];this.events=[];
    }
    sample(t){const s=t-this.n*PI,e=Math.exp(this.delta*s);return {t,x:this.base*e*Math.sin(s),v:this.base*e*(Math.cos(s)+this.delta*Math.sin(s))};}
    advance(dt){
      if(!Number.isFinite(dt)||dt<0)throw new RangeError('Invalid time step');
      const target=this.t+dt;
      while(this.t<target-1e-12){
        if(this.base===0){this.t=target;this.x=0;this.v=0;this.points.push({t:target,x:0,v:0});break;}
        const next=(this.n+1)*PI, end=Math.min(target,next,this.t+.025);
        const p=this.sample(end); this.points.push(p);Object.assign(this,p);
        if(Math.abs(end-next)<1e-10){
          const prev=this.base, result=transition(prev,this.delta,this.a,this.h);
          this.x=0;this.v=result.after;this.base=result.after;this.n++;
          if(result.hit)this.hits++;
          this.events.push({n:this.n,t:next,prev,...result});
          this.points[this.points.length-1]={t:next,x:0,v:result.before};
          this.points.push({t:next,x:0,v:result.after,jump:result.hit});
        }
        if(Math.max(Math.abs(this.x),Math.abs(this.v))>1e4)throw new RangeError('Движение вышло за диапазон |x|, |v| ≤ 10 000. Увеличьте h, уменьшите δ или начните заново.');
      }
      this.points=this.points.filter(p=>p.t>=this.t-24*PI);
      if(this.events.length>2000)this.events.splice(0,this.events.length-2000);
      return this;
    }
  }
  const api={Oscillator,transition};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.Neimark=api;
})(typeof window!=='undefined'?window:globalThis);
