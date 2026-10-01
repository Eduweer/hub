import {test} from 'node:test';
import assert from 'node:assert/strict';
import {subscribeToLists} from '../lib/newsletter-signup.ts';
function fixture(failAt){
 const calls=[];
 return {calls,contacts:{
  create:async email=>{calls.push(['contact',email]);return {error:failAt==='contact'?'failed':null}},
  add:async(email,id)=>{calls.push(['segment',id]);return {error:failAt===id?'failed':null}},
 }};
}
test('ordinary signup joins only the newsletter',async()=>{
 const f=fixture();assert.equal(await subscribeToLists({email:'test@example.com',earlyList:false},{newsletter:'news',early:'early'},f.contacts),'ok');assert.deepEqual(f.calls,[['contact','test@example.com'],['segment','news']]);
});
test('opt-in joins both lists',async()=>{
 const f=fixture();assert.equal(await subscribeToLists({email:'test@example.com',earlyList:true},{newsletter:'news',early:'early'},f.contacts),'ok');assert.deepEqual(f.calls,[['contact','test@example.com'],['segment','news'],['segment','early']]);
});
test('missing requested segment fails before creating a contact',async()=>{
 const f=fixture();assert.equal(await subscribeToLists({email:'test@example.com',earlyList:true},{newsletter:'news'},f.contacts),'configuration');assert.deepEqual(f.calls,[]);
});
test('a failed second segment cannot report successful double signup',async()=>{
 const f=fixture('early');assert.equal(await subscribeToLists({email:'test@example.com',earlyList:true},{newsletter:'news',early:'early'},f.contacts),'segment');
});
test('contact failure stops segment assignment',async()=>{
 const f=fixture('contact');assert.equal(await subscribeToLists({email:'test@example.com',earlyList:true},{newsletter:'news',early:'early'},f.contacts),'contact');assert.equal(f.calls.length,1);
});
