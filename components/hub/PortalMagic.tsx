"use client";
import {useEffect,useRef} from 'react';
const vertex="attribute vec2 position;varying vec2 uv;void main(){uv=position;gl_Position=vec4(position,0.,1.);}";
const fragment="precision mediump float;\n varying vec2 uv;uniform float time;uniform vec3 tint;\n float hash(float x){return fract(sin(x*127.1)*43758.5453);}\n void main(){\n float r=length(uv);float a=atan(uv.y,uv.x);float t=time;\n float wave=sin(a*9.+t*.9)*sin(a*5.-t*.7)*.009+sin(a*19.-t*1.4)*.003;\n float edge=.747+wave;\n float d=abs(r-edge);\n float energy=.65+.35*sin(a*3.-t*1.5);\n float ring=exp(-d*180.)*1.1+exp(-d*38.)*.26;\n float filaments=exp(-abs(r-(edge+.018*sin(a*12.+t)))*230.)*.42;\n float outer=exp(-abs(r-(.81+.004*sin(a*21.-t)))*420.)*.22;\n float sparks=0.;\n for(int i=0;i<40;i++){\n float n=float(i);float angle=n*2.39996+t*(.045+hash(n+4.)*.09);\n float radius=.78+hash(n+2.)*.15;\n vec2 pos=vec2(cos(angle),sin(angle))*radius;\n float twinkle=.35+.65*pow(.5+.5*sin(t*1.7+n),3.);\n sparks+=exp(-length(uv-pos)*(230.+hash(n)*190.))*twinkle;\n }\n float light=(ring+filaments)*energy+outer+sparks;\n float alpha=clamp(light,0.,.95);\n vec3 color=mix(tint,vec3(1.,.88,.59),clamp(ring*.48+sparks,0.,1.));\n gl_FragColor=vec4(color*(1.+ring*.22),alpha);\n }";
export default function PortalMagic({color,paused}:{color:string;paused:boolean}){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const state=useRef({color,paused});
 useEffect(()=>{state.current={color,paused}},[color,paused]);
 useEffect(()=>{
  const canvas=canvasRef.current!;const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false});if(!gl)return;
  const shader=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null}return s};
  const v=shader(gl.VERTEX_SHADER,vertex),f=shader(gl.FRAGMENT_SHADER,fragment);if(!v||!f){if(v)gl.deleteShader(v);if(f)gl.deleteShader(f);return}
  const program=gl.createProgram()!;gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);gl.deleteShader(v);gl.deleteShader(f);return}
  gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const time=gl.getUniformLocation(program,'time'),tint=gl.getUniformLocation(program,'tint');let last=0,elapsed=0,frame=0,visible=true;let current=[.57,.85,.73];let lastColor='';
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});observer.observe(canvas);
  function render(now:number){if(!gl)return;frame=requestAnimationFrame(render);const delta=Math.min((now-last)/1000,.05);last=now;if(document.hidden||!visible)return;const {color,paused}=state.current;const size=Math.round(canvas.clientWidth*Math.min(devicePixelRatio,1.5));if(paused&&lastColor===color&&canvas.width===size)return;if(!paused)elapsed+=delta;if(canvas.width!==size){canvas.width=canvas.height=size;gl.viewport(0,0,size,size)}const target=color.match(/[a-f\d]{2}/gi)!.map(x=>parseInt(x,16)/255);current=current.map((c,i)=>paused?target[i]:c+(target[i]-c)*.05);gl.uniform1f(time,elapsed);gl.uniform3fv(tint,current);gl.drawArrays(gl.TRIANGLES,0,6);lastColor=color}
  frame=requestAnimationFrame(render);return()=>{cancelAnimationFrame(frame);observer.disconnect();gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(v);gl.deleteShader(f)};
 },[]);
 return <canvas ref={canvasRef} id="magic" aria-hidden="true"/>;
}
