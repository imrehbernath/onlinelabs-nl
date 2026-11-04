'use client';

import { useEffect, useRef } from 'react';

// Bewegende ring als achtergrond van de homepage-hero.
// Eigen WebGL-shader, geen bibliotheek. Stopt buiten beeld en staat stil bij reduced motion.

const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FS = `precision highp float;
uniform vec2 res;uniform float t;
vec3 c1=vec3(0.216,0.431,0.710);
vec3 c2=vec3(0.435,0.827,0.957);
vec3 c3=vec3(0.560,0.690,0.960);
vec3 c4=vec3(0.720,0.640,0.980);
float base(float a,float ph){
  return 0.40+0.045*sin(a*2.0+t*0.32+ph)+0.030*sin(a*3.0-t*0.41+ph*1.3)+0.015*sin(a*5.0+t*0.55+ph*0.7);
}
vec4 ribbon(float r,float a,float ph,vec3 ca,vec3 cb,float amp){
  vec3 col=vec3(0.);float al=0.;
  float spread=0.06*sin(a*2.0+t*0.27+ph)+0.022*sin(a*5.0-t*0.33);
  float rb=base(a,ph);
  for(int i=0;i<14;i++){
    float f=float(i)/13.0-0.5;
    float d=r-(rb+spread*f);
    float s=exp(-d*d/0.00005);
    float k=0.5+0.5*sin(a+t*0.2+f*2.5+ph);
    col+=mix(ca,cb,k)*s;al+=s;
  }
  float d0=r-rb;float glow=exp(-d0*d0/0.0030)*0.30;
  vec3 gc=mix(ca,cb,0.5+0.5*sin(a*2.0+t*0.2+ph));
  return vec4((col*0.045+gc*glow)*amp,min(al*0.045+glow,1.0)*amp);
}
void main(){
  float m=min(res.x,res.y);
  vec2 uv=(gl_FragCoord.xy-0.5*res)/m;
  float ox=res.x>res.y?0.22*res.x/m:0.0;
  vec2 q=uv-vec2(ox,0.0);
  q.x*=0.9;
  float r=length(q);float a=atan(q.y,q.x);
  vec4 A=ribbon(r,a,0.0,c1,c4,0.65);
  vec4 B=ribbon(r,a+0.9,2.1,c2,c3,0.45);
  float al=clamp(A.a+B.a,0.,0.75);
  vec3 rc=(A.rgb+B.rgb)/max(A.a+B.a,0.0001);
  vec3 bg=vec3(1.0);
  bg=mix(bg,vec3(0.86,0.95,0.99),0.35*exp(-dot(uv-vec2(-0.6,0.4),uv-vec2(-0.6,0.4))*2.5));
  bg=mix(bg,vec3(0.93,0.91,1.0),0.45*exp(-dot(q-vec2(0.1,-0.25),q-vec2(0.1,-0.25))*3.0));
  vec3 o=mix(bg,rc,al);
  float fade=smoothstep(0.0,0.12,gl_FragCoord.y/res.y)*smoothstep(1.0,0.88,gl_FragCoord.y/res.y);
  gl_FragColor=vec4(mix(vec3(1.0),o,fade),1.0);
}`;

export default function HeroRing() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return undefined;
    const gl = cv.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return undefined;
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const v = sh(gl.VERTEX_SHADER, VS);
    const f = sh(gl.FRAGMENT_SHADER, FS);
    if (!v || !f) return undefined;
    const pr = gl.createProgram();
    gl.attachShader(pr, v);
    gl.attachShader(pr, f);
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return undefined;
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const lp = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(lp);
    gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(pr, 'res');
    const uT = gl.getUniformLocation(pr, 't');

    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    let visible = true;
    let raf = 0;
    const t0 = performance.now();

    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.max(1, Math.round(cv.clientWidth * d));
      cv.height = Math.max(1, Math.round(cv.clientHeight * d));
      gl.viewport(0, 0, cv.width, cv.height);
    };
    const draw = (now) => {
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uT, (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now) => {
      draw(now);
      if (visible && !reduced && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw(performance.now());
      else raf = requestAnimationFrame(loop);
    };

    size();
    cv.classList.add('is-on');
    start();

    const onResize = () => { size(); draw(performance.now()); };
    window.addEventListener('resize', onResize);
    const onVis = () => { if (!document.hidden && visible) start(); };
    document.addEventListener('visibilitychange', onVis);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(cv);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={ref} className="ol-heroring" aria-hidden="true" />;
}
