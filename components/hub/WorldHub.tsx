"use client";

import {useEffect, useRef, useState, type CSSProperties, type MouseEvent, type FormEvent} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, useRouter} from '@/i18n/navigation';
import {assetUrl} from '@/lib/cdn';
import PortalMagic from './PortalMagic';
import './WorldHub.css';

const paths = [
  {key:'parent',href:'/parents',image:'parent.webp',color:'#91d9b9'},
  {key:'artifact',href:'/artifacts',image:'artifacts_portal.webp',color:'#e4bc74'},
  {key:'teacher',href:'/teachers',image:'guild_portal.webp',color:'#b9a5ef'},
  {key:'investor',href:'/investors',image:'tower_dream_stone.webp',color:'#84c5ef'},
  {key:'campaign',href:'/kampania',image:'campaign.webp',color:'#efa571'},
] as const;
const languages = [['pl','Polski'],['en','English'],['de','Deutsch'],['fr','Français'],['es','Español'],['it','Italiano'],['ja','日本語'],['da','Dansk'],['nl','Nederlands'],['pt','Português']];
const shops = {
  pl:{name:'Amazon.pl',url:'https://www.amazon.pl/dp/B0HKMZ9J9W',edition:'editionPl',cover:'pl',label:'poland'},
  de:{name:'Amazon.de',url:'https://www.amazon.de/dp/B0HKMPGCXX',edition:'editionDe',cover:'de',label:'germany'},
  gb:{name:'Amazon.co.uk',url:'https://www.amazon.co.uk/dp/B0HKN33GT2',edition:'editionEn',cover:'en',label:'uk'},
} as const;

export default function WorldHub(){
 const t=useTranslations('hub'),c=useTranslations('hub.experience'),footer=useTranslations('footer');
 const locale=useLocale(),router=useRouter();
 const [active,setActive]=useState(0),[paused,setPaused]=useState(true),[sky,setSky]=useState('day');
 const [entering,setEntering]=useState(false),[origin,setOrigin]=useState({x:0,y:0});
 const [country,setCountry]=useState<keyof typeof shops>(locale==='de'?'de':locale==='en'?'gb':'pl');
 const [busy,setBusy]=useState(false),[status,setStatus]=useState(''),[success,setSuccess]=useState(false);
 const portal=useRef<HTMLDivElement>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null),locked=useRef(false);
 const scene=paths[active],shop=shops[country];
 useEffect(()=>{
  const mq=matchMedia('(prefers-reduced-motion: reduce)');setPaused(mq.matches);
  const motion=()=>setPaused(mq.matches);mq.addEventListener('change',motion);
  const update=()=>{const h=new Date().getHours();setSky(h>=5&&h<9?'dawn':h>=9&&h<17?'day':h>=17&&h<20?'dusk':h>=20&&h<22?'evening':'night')};update();const clock=setInterval(update,60000);
  const restore=()=>{locked.current=false;setEntering(false);if(timer.current)clearTimeout(timer.current)};
  window.addEventListener('pageshow',restore);
  return()=>{mq.removeEventListener('change',motion);clearInterval(clock);if(timer.current)clearTimeout(timer.current);window.removeEventListener('pageshow',restore)};
 },[]);
 function choose(index:number){if(!locked.current)setActive(index)}
 function enter(event:MouseEvent<HTMLAnchorElement>,index:number){
  if(event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
  if(locked.current){event.preventDefault();return}
  choose(index);
  if(paused||!matchMedia('(min-width:701px) and (hover:hover) and (pointer:fine)').matches)return;
  event.preventDefault();locked.current=true;
  const rect=portal.current!.getBoundingClientRect();setOrigin({x:rect.left+rect.width/2,y:rect.top+rect.height/2});setEntering(true);
  // Preserve native navigation and locale-cookie handling after the brief transition.
  const destination=event.currentTarget.href;
  timer.current=setTimeout(()=>window.location.assign(destination),760);
 }
 async function signup(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy)return;const form=event.currentTarget,values=new FormData(form);setBusy(true);setStatus('');setSuccess(false);
  const early=values.get('early')==='on';
  try{
   const response=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:String(values.get('email')??'').trim(),hp:values.get('website'),locale,earlyList:early,consent:values.get('consent')==='on'})});
   if(!response.ok){setStatus(c(response.status===429?'rate':'error'));return}
   const data=await response.json();if(data.success!==true){setStatus(c('error'));return}
   setSuccess(true);setStatus(c(early?'successBoth':'success'));form.reset();
  }catch{setStatus(c('error'))}finally{setBusy(false)}
 }
 return <div className={`eduria-hub${paused?' paused':''}${entering?' entering':''}`} data-sky={sky} style={{'--accent':scene.color,'--portal-x':`${origin.x}px`,'--portal-y':`${origin.y}px`} as CSSProperties}>
  <div className="passage-light" aria-hidden="true"/><div className="space" aria-hidden="true"/>
  <div className="shell">
   <header><Link className="brand" href="/" onClick={event=>{event.preventDefault();if(locked.current)return;setActive(0);window.scrollTo({top:0,behavior:paused?'instant':'smooth'})}}>EDURIA</Link><div className="header-right"><div className="social-slot" aria-hidden="true"/><label className="sr" htmlFor="hub-language">{c('language')}</label><select id="hub-language" value={locale} onChange={event=>router.replace('/',{locale:event.target.value})}>{languages.map(([code,name])=><option key={code} value={code}>{name}</option>)}</select></div></header>
   <main>
    <section className="hero" aria-labelledby="hub-heading"><div className="intro">
     <h1 id="hub-heading">{t('titleBefore')}{t('titleAccent')}{t('titleAfter')}<br/><em>{t('titleLine2')}</em></h1>
     <div className="path-label">{t('eyebrow')}</div>
     <nav className="choices" aria-label={t('eyebrow')}>{paths.map((path,index)=><Link key={path.key} className="choice" href={path.href} data-active={active===index} onPointerEnter={event=>{if(event.pointerType==='mouse')choose(index)}} onFocus={()=>choose(index)} onClick={event=>enter(event,index)}><span className="choice-title">{t(`portals.${path.key}.name`)}</span><span className="choice-description">{c(`pathDescriptions.${path.key}`)}</span></Link>)}</nav>
    </div>
    <div className="portal-column"><img className="portal-sanctuary" src="/hub/portal-sanctuary.png" alt="" aria-hidden="true"/>
     <div className="cloud-sea" aria-hidden="true"><span className="cloud-layer cloud-far"/><span className="cloud-layer cloud-near"/><span className="cloud-layer cloud-mist"/></div>
     <div className="portal" ref={portal} onPointerMove={event=>{if(paused||event.pointerType!=='mouse')return;const r=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--px',`${((event.clientX-r.left)/r.width-.5)*12}px`);event.currentTarget.style.setProperty('--py',`${((event.clientY-r.top)/r.height-.5)*12}px`)}} onPointerLeave={event=>{event.currentTarget.style.setProperty('--px','0px');event.currentTarget.style.setProperty('--py','0px')}}>
      <div className="halo"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/>
      <div className="aperture">{paths.map((path,index)=><img key={path.key} src={assetUrl(`/images/${path.image}`)} alt="" className={`scene${index===active?' active':''}`} fetchPriority={index===0?'high':'auto'}/>)}</div>
      <PortalMagic color={scene.color} paused={paused}/>
     </div><div className="portal-caption"><span className="live-dot"/><span>{t(`portals.${scene.key}.tag`)}</span><span className="caption-rule"/><button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{c(paused?'play':'pause')}</button></div>
    </div></section>
    <section className="action-grid">
     <article className="product"><div className="book-wrap"><img className="book" src={assetUrl(`/images/cover_auralis_${shop.cover}.webp`)} alt={c('productTitle')}/></div><div className="product-copy"><div className="eyebrow">{c('productEyebrow')}</div><h2>{c('productTitle')}</h2><p>{c('productLead')}</p><div className="buy-row"><label className="sr" htmlFor="hub-country">{c('country')}</label><select id="hub-country" value={country} onChange={event=>setCountry(event.target.value as keyof typeof shops)}>{Object.entries(shops).map(([key,value])=><option key={key} value={key}>{c(value.label)}</option>)}</select><a id="buy" href={shop.url} target="_blank" rel="noopener noreferrer">{shop.name} <span aria-hidden="true">↗</span></a></div><p className="small">{c(shop.edition)} · {shop.name}</p></div></article>
     <article className="newsletter"><div className="eyebrow">{c('newsEyebrow')}</div>{!success && <><h2>{c('newsTitle')}</h2><p>{c('newsLead')}</p></>}
      <div role="status" aria-live="polite">{success && <div className="newsletter-success"><h3>{status}</h3><button type="button" onClick={()=>{setSuccess(false);setStatus('')}}>{c('addAnother')} <span aria-hidden="true">↗</span></button></div>}</div>
      {!success && <form onSubmit={signup}><input className="sr" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
       <label className="sr" htmlFor="hub-email">{c('email')}</label><div className="email-row"><input id="hub-email" name="email" type="email" autoComplete="email" placeholder={c('email')} required disabled={busy}/><button disabled={busy} type="submit">{c(busy?'loading':'submit')} <span aria-hidden="true">→</span></button></div>
       <label className="check"><input name="early" type="checkbox" disabled={busy}/><span>{c('early')}</span></label>
       <label className="check"><input name="consent" type="checkbox" required disabled={busy} onInvalid={event=>event.currentTarget.setCustomValidity(c('consentRequired'))} onChange={event=>event.currentTarget.setCustomValidity('')}/><span>{c('consent')} <Link href="/privacy">{footer('privacy')}</Link></span></label>
       <p className={`small status${success?' success':''}`} role="status">{status}</p>
      </form>}
     </article>
    </section>
    <section className="mobile-paths" aria-label={t('eyebrow')}><div className="eyebrow">{t('eyebrow')}</div><div id="mobile-cards">{paths.map(path=><Link className="mobile-card" href={path.href} key={path.key}><img src={assetUrl(`/images/${path.image}`)} alt="" loading="lazy"/><h3>{t(`portals.${path.key}.name`)}</h3><p>{c(`pathDescriptions.${path.key}`)}</p><span>{t(`portals.${path.key}.cta`)} →</span></Link>)}</div></section>
   </main>
   <footer><span className="footer-brand">EDURIA · HARVORIA &amp; BEYOND</span><span>© 2026 Radosław Kamysz</span><nav><Link href="/privacy">{footer('privacy')}</Link><Link href="/parents#dolacz">{footer('contact')}</Link></nav></footer>
  </div>
 </div>;
}
