'use strict';
let activeView='title';
function showView(id){
  if(!['title','laboratory','theory','authors','exit'].includes(id))return;
  setPlaying(false);
  if(id==='exit')stopped=true;
  activeView=id;
  document.querySelectorAll('.view').forEach(view=>view.hidden=view.id!==id);
  document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-current',button.dataset.view===id?'page':'false'));
  window.scrollTo(0,0);
  const heading=document.querySelector('#'+id+' h1');heading.tabIndex=-1;heading.focus({preventScroll:true});
  if(id==='laboratory')requestAnimationFrame(draw);
}
document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>showView(button.dataset.view));
document.querySelector('.brand').onclick=e=>{e.preventDefault();showView('title');};
const fullButton=document.getElementById('fullscreen');
fullButton.onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{alert(t('Полноэкранный режим недоступен. Используйте полноэкранный режим браузера.'));}};
function fullLabel(){fullButton.textContent=t(document.fullscreenElement?'Обычный экран':'На весь экран');}
document.addEventListener('fullscreenchange',fullLabel);document.addEventListener('languagechange',fullLabel);

const projectorButton=document.getElementById('projector');
projectorButton.onclick=()=>{document.body.classList.toggle('projector-mode');document.body.classList.remove('settings-open');showView('laboratory');projectorLabel();};
document.getElementById('settingsPanel').onclick=()=>document.body.classList.toggle('settings-open');
function projectorLabel(){projectorButton.textContent=t(document.body.classList.contains('projector-mode')?'Обычный вид':'Показ на проекторе');}
document.addEventListener('languagechange',projectorLabel);
