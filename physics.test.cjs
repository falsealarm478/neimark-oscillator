const assert=require('node:assert/strict');
const {Oscillator,transition}=require('./physics.js');
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
// Half-period event map, including both signs and velocity reversals.
for(const p of [{delta:.055,a:1,h:1,v0:.42},{delta:.1,a:.5,h:1.6,v0:-.8},{delta:0,a:1,h:0,v0:1},{delta:.02,a:1,h:.8,v0:.65}]){
 const s=new Oscillator(p);let expected=p.v0;
 for(let i=0;i<100;i++){expected=transition(expected,p.delta,p.a,p.h).after;s.advance(Math.PI);near(s.x,0);near(s.v,expected);near(s.t,(i+1)*Math.PI);assert.equal(s.n,i+1);}
}
// Strict threshold: equality must not trigger an impact.
assert.deepEqual(transition(-1,0,1,.5),{before:1,after:1,hit:false});
assert.equal(transition(-1.001,0,1,.5).hit,true);
// Free motion analytic solution at an arbitrary time.
const free=new Oscillator({delta:.07,a:1,h:0,v0:.4});free.advance(1.234);
near(free.x,.4*Math.exp(.07*1.234)*Math.sin(1.234));
near(free.v,.4*Math.exp(.07*1.234)*(Math.cos(1.234)+.07*Math.sin(1.234)));
// Result independent of animation frame subdivisions.
const a=new Oscillator(),b=new Oscillator();a.advance(30);for(let i=0;i<3000;i++)b.advance(.01);near(a.x,b.x,1e-8);near(a.v,b.v,1e-8);assert.equal(a.n,b.n);assert.equal(a.hits,b.hits);
// Stationary point and exact stop after a kick do not generate fictitious crossings.
const zero=new Oscillator({v0:0});zero.advance(100);assert.equal(zero.n,0);assert.equal(zero.v,0);
const stopped=new Oscillator({delta:0,a:.5,h:1,v0:-1});stopped.advance(4*Math.PI);assert.equal(stopped.n,1);assert.equal(stopped.v,0);
// Jump samples share the exact event time and x=0.
const hit=new Oscillator({delta:0,a:.5,h:.8,v0:-1});hit.advance(Math.PI);const [before,after]=hit.points.slice(-2);near(before.t,after.t);near(before.v-after.v,.8);assert.equal(after.jump,true);
assert.throws(()=>new Oscillator({delta:-1}),RangeError);
assert.throws(()=>a.advance(-1),RangeError);
console.log('Physics checks passed: exact flow, 400 map transitions, threshold, reversal, stationarity, frame independence, impulses.');
