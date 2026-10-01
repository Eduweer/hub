'use strict';
const paths=[
 {name:'Dla rodziców',title:'Wspólna przygoda zaczyna się tutaj.',description:'Poznaj świat, w którym opowieści i zadania pomagają dziecku rozwijać umiejętności. Zobacz, od czego możecie zacząć.',image:'parent.webp',href:'/parents',color:'#91d9b9',caption:'BRAMA RODZICÓW',cta:'Poznaj Edurię dla rodziców'},
 {name:'Artefakty',title:'Małe zadania. Prawdziwe odkrycia.',description:'Poznaj zeszyty prowadzone przez Strażników. Każdy to osobna przygoda i nowe umiejętności do odkrycia.',image:'artifacts_portal.webp',href:'/artifacts',color:'#e4bc74',caption:'PRÓBY STRAŻNIKÓW',cta:'Odkryj Artefakty'},
 {name:'Dla nauczycieli',title:'Wasza klasa. Wasza historia.',description:'Odkryj wizję szkolnych gildii, wspólnych wyzwań i nauki przez przygodę. Pomóż nam tworzyć Edurię dla szkół.',image:'guild_portal.webp',href:'/teachers',color:'#b9a5ef',caption:'SZKOLNE GILDIE',cta:'Poznaj Edurię dla szkół'},
 {name:'Dla inwestorów',title:'Jeden świat. Wiele możliwości.',description:'Poznaj koncepcję ekosystemu łączącego książki, zeszyty, aplikację i grę oraz kierunek rozwoju projektu.',image:'tower_dream_stone.webp',href:'/investors',color:'#84c5ef',caption:'PRZYSZŁOŚĆ EDURII',cta:'Poznaj projekt'},
 {name:'Kickstarter',title:'Pomóż otworzyć kolejny rozdział.',description:'Poznaj plany kampanii i dowiedz się, jak możesz wesprzeć rozwój świata Edurii.',image:'campaign.webp',href:'/kampania',color:'#efa571',caption:'WSPÓLNIE TWORZYMY ŚWIAT',cta:'Poznaj plany kampanii'}
];
const $=s=>document.querySelector(s),root=document.documentElement;
let navigating=false, navigationTimer;
let active=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
let targetColor=[.57,.85,.73],currentColor=[...targetColor];
const scenes=$('#scenes'),choices=$('.choices');
paths.forEach((p,i)=>{
 const img=document.createElement('img');img.src='/images/'+p.image;img.alt='';img.className='scene';scenes.append(img);
 const button=document.createElement('a');button.href=p.href;button.className='choice';button.textContent=p.name;button.dataset.active='false';button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')select(i)});button.addEventListener('focus',()=>select(i));button.addEventListener('click',e=>enterPath(e,i));choices.append(button);
 const card=document.createElement('a');card.className='mobile-card';card.href=p.href;const picture=document.createElement('img');picture.src=img.src;picture.alt='';picture.loading='lazy';const title=document.createElement('h3');title.textContent=p.name;const copy=document.createElement('p');copy.textContent=p.description;const cta=document.createElement('span');cta.textContent='Odkryj więcej →';card.append(picture,title,copy,cta);$('#mobile-cards').append(card);
});
function select(i){if(navigating)return;active=i;const p=paths[i];root.style.setProperty('--accent',p.color);targetColor=p.color.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255);document.querySelectorAll('.scene').forEach((el,n)=>el.classList.toggle('active',n===i));document.querySelectorAll('.choice').forEach((el,n)=>el.dataset.active=String(n===i));$('#path-title').textContent=p.title;$('#path-description').textContent=p.description;$('#path-index').textContent=`0${i+1} / 05`;$('#caption').textContent=p.caption;updateLink();}
function updateLink(){const locale=$('#language').value;document.querySelectorAll('.choice').forEach((el,i)=>el.href='https://eduria.io'+('/'+locale)+paths[i].href);document.querySelectorAll('.mobile-card').forEach((el,i)=>el.href='https://eduria.io'+('/'+locale)+paths[i].href);}
function enterPath(event,index){
 if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 if(navigating){event.preventDefault();return;}
 select(index);
 if(paused||!matchMedia('(min-width: 701px) and (hover: hover) and (pointer: fine)').matches)return;
 event.preventDefault();
 navigating=true;
 const destination=event.currentTarget.href;
 const bounds=$('#portal').getBoundingClientRect();
 root.style.setProperty('--portal-x',`${bounds.left+bounds.width/2}px`);
 root.style.setProperty('--portal-y',`${bounds.top+bounds.height/2}px`);
 root.classList.add('entering');
 navigationTimer=setTimeout(()=>window.location.assign(destination),760);
}
window.addEventListener('pageshow',()=>{clearTimeout(navigationTimer);navigating=false;root.classList.remove('entering')});
$('#language').addEventListener('change',()=>{updateLink();$('#form-note').textContent='Podgląd układu jest po polsku. Wybrany język będzie użyty przy wejściu do działu.'});
$('#reset').addEventListener('click',()=>{select(0);window.scrollTo({top:0,behavior:paused?'instant':'smooth'})});
$('#portal').addEventListener('pointermove',e=>{if(paused||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*12+'px');e.currentTarget.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*12+'px')});
$('#portal').addEventListener('pointerleave',()=>{$('#portal').style.setProperty('--px','0px');$('#portal').style.setProperty('--py','0px')});
function motionUI(){root.classList.toggle('paused',paused);$('#motion').setAttribute('aria-pressed',String(paused));$('#motion').textContent=paused?'Włącz animację':'Wstrzymaj animację'}
$('#motion').addEventListener('click',()=>{paused=!paused;motionUI()});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{paused=e.matches;motionUI()});motionUI();
const shops={pl:{name:'Amazon.pl',id:'B0HKMZ9J9W',language:'polskie'},de:{name:'Amazon.de',id:'B0HKMPGCXX',language:'niemieckie'},gb:{name:'Amazon.co.uk',id:'B0HKN33GT2',language:'angielskie'}};
$('#country').addEventListener('change',()=>{const shop=shops[$('#country').value];$('#buy').firstChild.textContent=shop.name+' ';$('#buy').href='https://www.'+shop.name.toLowerCase()+'/dp/'+shop.id;$('.book').src='/images/cover_auralis_'+({pl:'pl',de:'de',gb:'en'}[$('#country').value])+'.webp';$('#shop-note').textContent='Wydanie '+shop.language+' · zakup w '+shop.name;});
$('#newsletter').addEventListener('submit',e=>{e.preventDefault();$('#form-note').textContent=$('#early').checked?'Podgląd: zapis do newslettera i grupy przedpremierowej. Dane nie zostały wysłane.':'Podgląd: zapis do newslettera. Dane nie zostały wysłane.';$('#form-note').classList.add('success');$('#portal').animate([{filter:'brightness(1)'},{filter:'brightness(1.35)'},{filter:'brightness(1)'}],{duration:paused?0:1000});});
select(0);
// Procedural WebGL light ring; the illustration stays in the DOM for accessibility and fallback.
const canvas=$('#magic'),gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false});
if(gl){
 const vertex='attribute vec2 position;varying vec2 uv;void main(){uv=position;gl_Position=vec4(position,0.,1.);}';
 const fragment=`precision mediump float;
 varying vec2 uv;uniform float time;uniform vec3 tint;
 float hash(float x){return fract(sin(x*127.1)*43758.5453);}
 void main(){
 float r=length(uv);float a=atan(uv.y,uv.x);float t=time;
 float wave=sin(a*9.+t*.9)*sin(a*5.-t*.7)*.009+sin(a*19.-t*1.4)*.003;
 float edge=.747+wave;
 float d=abs(r-edge);
 float energy=.65+.35*sin(a*3.-t*1.5);
 float ring=exp(-d*180.)*1.1+exp(-d*38.)*.26;
 float filaments=exp(-abs(r-(edge+.018*sin(a*12.+t)))*230.)*.42;
 float outer=exp(-abs(r-(.81+.004*sin(a*21.-t)))*420.)*.22;
 float sparks=0.;
 for(int i=0;i<40;i++){
 float n=float(i);float angle=n*2.39996+t*(.045+hash(n+4.)*.09);
 float radius=.78+hash(n+2.)*.15;
 vec2 pos=vec2(cos(angle),sin(angle))*radius;
 float twinkle=.35+.65*pow(.5+.5*sin(t*1.7+n),3.);
 sparks+=exp(-length(uv-pos)*(230.+hash(n)*190.))*twinkle;
 }
 float light=(ring+filaments)*energy+outer+sparks;
 float alpha=clamp(light,0.,.95);
 vec3 color=mix(tint,vec3(1.,.88,.59),clamp(ring*.48+sparks,0.,1.));
 gl_FragColor=vec4(color*(1.+ring*.22),alpha);
 }`;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null}return s}
 const v=shader(gl.VERTEX_SHADER,vertex),f=shader(gl.FRAGMENT_SHADER,fragment);
 if(v&&f){const program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);
 if(gl.getProgramParameter(program,gl.LINK_STATUS)){
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);const time=gl.getUniformLocation(program,'time'),tint=gl.getUniformLocation(program,'tint');
 let last=0,elapsed=0,frame=0,visible=true;
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});observer.observe(canvas);
 function render(now){frame=requestAnimationFrame(render);const delta=Math.min((now-last)/1000,.05);last=now;if(document.hidden||!visible)return;if(!paused)elapsed+=delta;const size=Math.round(canvas.clientWidth*Math.min(devicePixelRatio,1.5));if(canvas.width!==size){canvas.width=canvas.height=size;gl.viewport(0,0,size,size)}currentColor=currentColor.map((c,i)=>paused?targetColor[i]:c+(targetColor[i]-c)*.05);gl.uniform1f(time,elapsed);gl.uniform3fv(tint,currentColor);gl.drawArrays(gl.TRIANGLES,0,6)}frame=requestAnimationFrame(render);window.addEventListener('pagehide',event=>{if(event.persisted)return;cancelAnimationFrame(frame);observer.disconnect();gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(v);gl.deleteShader(f)},{once:true});
 }}
}

// Local time changes only the quiet sky palette, never the portal effects.
function updateSky(){
 const hour=new Date().getHours();
 document.documentElement.dataset.sky=hour>=6&&hour<10?'dawn':hour>=10&&hour<17?'day':hour>=17&&hour<21?'dusk':'night';
}
updateSky();setInterval(updateSky,60000);
