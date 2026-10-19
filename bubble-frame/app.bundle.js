(()=>{var J0=Object.defineProperty;var K0=(s,t)=>{for(var e in t)J0(s,e,{get:t[e],enumerable:!0})};function ss(s,t,e){return Math.min(t,Math.max(s,e))}function Mn(s,t,e,n,i,r){return{x0:Math.min(s,t),x1:Math.max(s,t),y0:Math.min(e,n),y1:Math.max(e,n),z0:Math.min(i,r),z1:Math.max(i,r)}}function j0(s,t,e,n,i,r,o){let a=[];for(let l=0;l<5;l++){let c=o*l/5,h=o*(l+1)/5,d=r+c,u=r+h+.08,f=s>0?t-h:-(t-h),p=s>0?e:-e;a.push(Mn(f,p,n,i,d,u))}return a}function Q0(s){let t=Math.round(Number(s));return Number.isFinite(t)?ss(0,2,t):1}function t_(s){return Math.max(0,s.x1-s.x0)*Math.max(0,s.y1-s.y0)*Math.max(0,s.z1-s.z0)}function e_(s,t,e,n,i,r){let o=ss(2.6,5.2,Number(s.standThickness)||4),a=3.8,l=.7,c=a+l,h=o+l,d=t-.25;(!(d<t-.08)||d<.22)&&(d=Math.max(.18,t*.62));let u=a+3.4,f=7.5,p=.4,_=8,g=ss(40,90,i*.38),m=-i/2,v=-n/2+h/2+1.6,b=n/2-h/2-3,y=Math.min(b,-n/2+Math.max(h*3.2,n*.46)),S=[8,12,18].map(B=>{let nt=g*Math.tan(B*Math.PI/180);return ss(v,y,m+nt+o/2)}),A=h+1.6;for(let B=1;B<S.length;B++)S[B]<S[B-1]+A&&(S[B]=S[B-1]+A);if(S[S.length-1]>y+1e-6){let B=Math.max(A*.5,y-v);S=[0,1,2].map(nt=>v+B*nt/2)}for(let B=1;B<S.length;B++)S[B]<S[B-1]+.9&&(S[B]=S[B-1]+.9);let x=Q0(s.standHole),T=S.map((B,nt)=>{let Y=B-o/2-m,tt=Math.atan(Math.max(.4,Y)/g);return{index:nt,y:B,s:Y,angleRad:tt,angleDeg:tt*180/Math.PI,active:nt===x}}),P=T[x],I=Math.max(7,r-u/2-1.5),N=ss(9,I,e*.2),z=[-N,N],L=[];for(let B of T)for(let nt of z)L.push({x:nt,y:B.y,row:B.index,active:B.active,w:c,h,box:Mn(nt-c/2,nt+c/2,B.y-h/2,B.y+h/2,-.5,t+.45)});let O=[Mn(-N-u/2,N+u/2,0,f,0,o)];for(let B of z)O.push(Mn(B-u/2,B+u/2,f-p,g-_,0,o)),O.push(Mn(B-a/2,B+a/2,g-_-p,g+d,0,o));let W=0;for(let B of O)W+=t_(B);return W-=2*u*p*o,W-=2*a*p*o,{cut:s.standEnabled!==!1,holeIndex:x,sheetT:o,pegW:a,pegLen:d,legW:u,legReach:g,footH:f,halfSpan:N,holeW:c,holeH:h,rows:T,holes:L,boxes:O,yHole:P.y,angleRad:P.angleRad,angleDeg:P.angleDeg,volume:Math.max(0,W)}}function rp(s){if(!s)return[];let t=s.yHole-s.sheetT/2;return s.boxes.map(e=>Mn(e.x0,e.x1,t+e.z0,t+e.z1,e.y0-s.legReach,e.y1-s.legReach))}function n_(s,t,e){let n=1.8,i=2,r=2.2,o=.45;if(e>0){let c=Math.max(1.4,e-o);c<n+.32+i&&(i=Math.min(2,Math.max(1.05,c*.4)),n=Math.max(.8,c-.32-i))}i=Math.min(i,Math.max(.32+1.05,Math.min(2,i)));let a=ss(3.4,5.2,3.3+Math.min(Math.max(t,0),18)*.08);a<i&&(a=i);let l=(c,h)=>c+.32+h<=s+1e-6;if(l(r,a)||(a=Math.max(i,s-r-.32)),l(r,a)||(r=Math.max(1,s-.32-a)),!l(r,a)){let c=Math.max(.8,s-.32);r=Math.min(2.2,Math.max(.85,c*.34)),a=Math.max(.9,c-r),i=Math.min(i,a)}return i=Math.min(i,a),{wall:r,lip:i,tongueW:a,tongueT:n}}function op(s){let t=Math.max(8,Number(s.outerW)||0),e=Math.max(8,Number(s.outerH)||0),n=Math.max(0,Number(s.border)||0),i=ss(.4,8,Number(s.plateT)||1.2),r=Math.max(0,Number(s.cornerRadius)||0),o=Math.max(0,Number(s.beadRadius)||0),a=Math.max(0,Number(s.coverHeight)||0),l=o>0?Math.max(.7,o*(1-Math.SQRT1_2)+.45):.75;l=Math.min(l,Math.max(.45,Math.min(t,e)*.5-8));let c=o>0?2*o:n,h=Math.max(.8,c-l),d=n_(h,n,a),{wall:u,lip:f,tongueW:p,tongueT:_}=d,g=o>0?0:Math.max(0,r-l),m=t/2-l,v=m-u,b=v-.32,y=m*2,w=e-2*l,S=Math.max(6,w/2-g),A=Math.max(7,Math.min(12,S*.08)),x=Math.max(2.3+.32+1.1,Math.min(10,S*.08));S*2-A-x<12&&(A=3.5,x=2.3+.7);let T=-S+x,P=Math.max(T+8,S-A),I=i+.42,N=I,z=I+_,L=z+.32,O=T-.32,W=Math.max(-S+.4,O-2.3),B=-S,nt=S,Y=[];for(let pt of[-1,1]){let $t=b-p,Jt=b;Y.push(Mn(pt>0?$t:-Jt,pt>0?Jt:-$t,T,P,0,_))}let tt=[-1,1].map(pt=>{let $t=Mn(pt>0?v:-m,pt>0?m:-v,B,nt,i-.55,L+.35),Jt=Mn(pt>0?b-p+.15:-m,pt>0?m:-(b-p+.15),W,O,i-.55,z-.06);return{side:pt,wall:$t,stop:Jt,lips:j0(pt,v,m,B,nt,L,f)}}),it=[];for(let pt of tt){let $t={...pt.wall};pt.side>0?$t.x0=Math.max($t.x0,v-.02):$t.x1=Math.min($t.x1,-(v-.02));let Jt=L-I;it.push(Mn($t.x0,$t.x1,$t.y0,$t.y1,0,Jt+.04));for(let jt of pt.lips){let J=jt.z0-I,et=jt.z1-I;et>_+.05&&it.push(Mn(jt.x0,jt.x1,jt.y0,jt.y1,Math.max(_+.32*.5,J),et+.05))}it.push(Mn(pt.stop.x0,pt.stop.x1,pt.stop.y0,pt.stop.y1,0,_+.1))}let Lt=e_(s,i,y,w,e,v);return{clearance:.32,photoGap:.42,tongueT:_,tongueW:p,fuse:2.05,lip:f,wall:u,hide:l,frameBackZ:I,tongueZ0:N,tongueZ1:z,lipZ0:L,lipZ1:L+f,xTip:b,xWallIn:v,xWallOut:m,y0:T,y1:P,stopY0:W,stopY1:O,plate:{w:y,h:w,t:i},plateCorner:g,slab:Mn(-y/2,y/2,-w/2,w/2,0,i),tongues:Y,rails:tt,relief:it,pegStand:Lt,border:n,outerW:t,outerH:e}}function ap(s,t=6){let e=s.plate.w/2,n=s.plate.h/2,i=Math.min(Math.max(0,s.plateCorner||0),e-.4,n-.4);if(i<.15)return[[-e,-n],[e,-n],[e,n],[-e,n]];let r=[],o=[{cx:e-i,cy:-n+i,a0:-Math.PI/2,a1:0},{cx:e-i,cy:n-i,a0:0,a1:Math.PI/2},{cx:-e+i,cy:n-i,a0:Math.PI/2,a1:Math.PI},{cx:-e+i,cy:-n+i,a0:Math.PI,a1:3*Math.PI/2}];for(let a of o)for(let l=0;l<=t;l++){let c=a.a0+(a.a1-a.a0)*l/t;r.push([a.cx+i*Math.cos(c),a.cy+i*Math.sin(c)])}return r}var hp="6 \xB7 Oct 19, 2026";var Rn=25.4,i_=1.24,Nu=[{id:"4x6",name:"4 \xD7 6 in",w:4*Rn,h:6*Rn},{id:"5x7",name:"5 \xD7 7 in",w:5*Rn,h:7*Rn},{id:"8x10",name:"8 \xD7 10 in",w:8*Rn,h:10*Rn},{id:"wallet",name:"Wallet 2.5 \xD7 3.5 in",w:2.5*Rn,h:3.5*Rn}];function Uu(s,t,e,n){return{w:s+2*(e-n),h:t+2*(e-n)}}function Ys(s,t,e){let n=t-e;if(!(n>1e-6)){let i=Math.max(t*.15,1);return Math.max(2,1+Math.round(s/i))}return Math.max(2,1+Math.round(s/n))}function Jl(s,t,e){return e<=1?t:t-s/(e-1)}function jl(s,t){return t==="in"?s/Rn:s}function Fu(s,t){return t==="in"?s*Rn:s}function up(){let s=4*Rn,t=6*Rn,e=20,n=5,i=5,r=e/2,o=Uu(s,t,r,n),a=Ys(o.w,e,i),l=Ys(o.h,e,i);return{units:"in",photoW:s,photoH:t,ballDiameter:e,imageOverlap:n,targetBallOverlap:i,countTop:a,countBottom:a,countLeft:l,countRight:l,linkH:!0,linkV:!0,webThickness:.8,plateThickness:1.2,segments:32,disabled:[],hangHoles:!0,hangHoleCount:2,hangHoleDiameter:5,hangInsetTop:12,hangInsetSide:18,standEnabled:!0,standHole:1,standThickness:4,outerCornerRadius:1.5,alternate:!0,colorA:"#292524",colorB:"#b45309"}}function lp(s,t){let e=String(s||"").trim();return/^#[0-9a-fA-F]{6}$/.test(e)?e.toLowerCase():/^[0-9a-fA-F]{6}$/.test(e)?`#${e.toLowerCase()}`:t}function Bn(s){let t={...s};t.photoW=Math.max(8,Number(s.photoW)||0),t.photoH=Math.max(8,Number(s.photoH)||0),t.ballDiameter=Math.min(80,Math.max(4,Number(s.ballDiameter)||0));let e=Math.min(t.ballDiameter,Math.min(t.photoW,t.photoH)/2-.5);t.imageOverlap=Math.min(Math.max(0,Number(s.imageOverlap)||0),Math.max(0,e)),t.webThickness=Math.min(5,Math.max(0,Number(s.webThickness)||0)),t.plateThickness=Math.min(8,Math.max(.4,Number(s.plateThickness)||0)),t.segments=Math.min(96,Math.max(12,Math.round(Number(s.segments)||32))),t.hangHoles=s.hangHoles!==!1,t.hangHoleCount=Number(s.hangHoleCount)>=2?2:1,t.hangHoleDiameter=Math.min(16,Math.max(2.5,Number(s.hangHoleDiameter)||5));let i=t.hangHoleDiameter/2+2.5;t.hangInsetTop=Math.min(t.photoH/2-i,Math.max(i,Number(s.hangInsetTop)||12)),t.hangInsetSide=Math.min(t.photoW/2-i,Math.max(i,Number(s.hangInsetSide)||18)),t.standEnabled=s.standEnabled!==!1;let r=Math.round(Number(s.standHole));t.standHole=Number.isFinite(r)?Math.min(2,Math.max(0,r)):1,t.standThickness=Math.min(10,Math.max(2.4,Number(s.standThickness)||4));for(let a of["countTop","countBottom","countLeft","countRight"])t[a]=Math.min(40,Math.max(2,Math.round(Number(s[a])||2)));t.linkH&&(t.countBottom=t.countTop),t.linkV&&(t.countRight=t.countLeft),t.disabled=Array.isArray(s.disabled)?[...s.disabled]:[];let o=Math.min(t.ballDiameter,Math.min(t.photoW,t.photoH)/2);return t.outerCornerRadius=Math.min(o,Math.max(0,Number(s.outerCornerRadius)||0)),t.alternate=s.alternate!==!1,t.colorA=lp(s.colorA,"#292524"),t.colorB=lp(s.colorB,"#b45309"),t}function mi(s){let t=Bn(s),e=t.ballDiameter/2,n=Uu(t.photoW,t.photoH,e,t.imageOverlap),i=Ys(n.w,t.ballDiameter,t.targetBallOverlap),r=Ys(n.h,t.ballDiameter,t.targetBallOverlap);return t.countTop=i,t.countBottom=t.linkH?i:Ys(n.w,t.ballDiameter,t.targetBallOverlap),t.countLeft=r,t.countRight=t.linkV?r:Ys(n.h,t.ballDiameter,t.targetBallOverlap),t.linkH&&(t.countBottom=t.countTop),t.linkV&&(t.countRight=t.countLeft),Ou(t)}function Ql(s){let t=Bn(s),e=ni(t),n=[e.overlap.top,e.overlap.bottom,e.overlap.left,e.overlap.right];return t.targetBallOverlap=n.reduce((i,r)=>i+r,0)/n.length,t}function Ou(s){let t=new Set(ni({...s,disabled:[]}).beads.map(e=>e.id));return{...s,disabled:(s.disabled||[]).filter(e=>t.has(e))}}function Kl(s,t,e){return s+(t-s)*e}function ni(s){let t=Bn(s),e=t.ballDiameter/2,n=t.imageOverlap,i=Uu(t.photoW,t.photoH,e,n),r=-i.w/2,o=i.w/2,a=-i.h/2,l=i.h/2,c=new Set(t.disabled),h=[],d=new Set,u=(x,T,P,I,N)=>{d.has(x)||(d.add(x),h.push({id:x,x:T,y:P,side:I,role:N,enabled:!c.has(x)}))};u("corner-tl",r,l,"corner","corner"),u("corner-tr",o,l,"corner","corner"),u("corner-bl",r,a,"corner","corner"),u("corner-br",o,a,"corner","corner");let f=t.countTop,p=t.countBottom,_=t.countLeft,g=t.countRight;for(let x=1;x<f-1;x++)u(`top-${x}`,Kl(r,o,x/(f-1)),l,"top","edge");for(let x=1;x<p-1;x++)u(`bottom-${x}`,Kl(r,o,x/(p-1)),a,"bottom","edge");for(let x=1;x<_-1;x++)u(`left-${x}`,r,Kl(a,l,x/(_-1)),"left","edge");for(let x=1;x<g-1;x++)u(`right-${x}`,o,Kl(a,l,x/(g-1)),"right","edge");let m={top:Jl(i.w,t.ballDiameter,f),bottom:Jl(i.w,t.ballDiameter,p),left:Jl(i.h,t.ballDiameter,_),right:Jl(i.h,t.ballDiameter,g)},v=h.filter(x=>x.enabled),b=h.length,y=[];Object.values(m).some(x=>x<-.05)&&y.push("Some beads do not touch \u2014 increase overlap or add circles so the frame stays one piece."),n<=.05&&y.push("Image overlap is ~0, so the beads barely cover the photo edge."),(t.photoW-2*n<=2||t.photoH-2*n<=2)&&y.push("Image overlap is so large the window is almost closed."),v.length<4&&y.push("Too many beads are turned off \u2014 the frame may fall apart."),t.outerCornerRadius>e*.85&&y.push("Large outer corner radius may cut deeply into the corner beads.");let w=new Map(h.map(x=>[x.id,x])),S=[],A=x=>{let T=w.get(x);T&&S.push(T)};A("corner-tl");for(let x=1;x<t.countTop-1;x++)A(`top-${x}`);A("corner-tr");for(let x=t.countRight-2;x>=1;x--)A(`right-${x}`);A("corner-br");for(let x=t.countBottom-2;x>=1;x--)A(`bottom-${x}`);A("corner-bl");for(let x=1;x<t.countLeft-1;x++)A(`left-${x}`);return S.forEach((x,T)=>{x.pathIndex=T,x.colorIndex=t.alternate?T%2:0}),{params:t,beads:h,enabled:v,radius:e,center:i,overlap:m,outer:{w:i.w+2*e,h:i.h+2*e},opening:{w:t.photoW-2*n,h:t.photoH-2*n},photo:{w:t.photoW,h:t.photoH},uniqueTotal:b,enabledCount:v.length,outerCornerRadius:t.outerCornerRadius,warnings:y,path:S}}function dp(s,t,e,n=10){let i=s/2,r=t/2,o=Math.min(Math.max(0,e),i,r);if(o<1e-6)return cp([[-i,-r],[i,-r],[i,r],[-i,r]]);let a=[],l=[{cx:i-o,cy:r-o,a0:0,a1:Math.PI/2},{cx:-i+o,cy:r-o,a0:Math.PI/2,a1:Math.PI},{cx:-i+o,cy:-r+o,a0:Math.PI,a1:3*Math.PI/2},{cx:i-o,cy:-r+o,a0:3*Math.PI/2,a1:2*Math.PI}];for(let c of l)for(let h=0;h<=n;h++){let d=h/n,u=c.a0+(c.a1-c.a0)*d;a.push([c.cx+o*Math.cos(u),c.cy+o*Math.sin(u)])}return cp(a)}function fp(s,t){let e=s.radius,n=s.enabledCount,i=n*(2/3)*Math.PI*e*e*e,r=t>0?n*Math.PI*e*e*t*.12:0;return i+r}function Zs(s){return s/1e3*i_}function pp(s,t,e){let n=jl(s,e),i=jl(t,e),r=e==="in"?2:1,o=a=>a.toFixed(r).replace(/\.0+$/,"").replace(/(\.\d*?)0+$/,"$1");return`${o(n)}x${o(i)}${e}`}function mp(s,t){let e=Bn(s),n=new Set(e.disabled);return n.has(t)?n.delete(t):n.add(t),e.disabled=[...n],e}function ii(s){let t=Bn(s);if(!t.hangHoles)return[];let e=t.hangHoleDiameter/2,n=t.photoH/2-t.hangInsetTop;if(t.hangHoleCount<=1)return[{x:0,y:n,r:e}];let i=t.photoW/2-t.hangInsetSide;return[{x:-i,y:n,r:e},{x:i,y:n,r:e}]}function s_(s){let t=0;for(let e=0;e<s.length;e++){let n=s[e],i=s[(e+1)%s.length];t+=n[0]*i[1]-i[0]*n[1]}return t/2}function cp(s){return s_(s)>=0?s:s.slice().reverse()}function si(s){let t=s.params,e=(s.outer.w-s.photo.w)/2;return op({outerW:s.outer.w,outerH:s.outer.h,border:e,beadRadius:s.radius,coverHeight:s.radius,plateT:t.plateThickness,cornerRadius:t.outerCornerRadius,standThickness:t.standThickness,standEnabled:t.standEnabled,standHole:t.standHole})}function gp(s){let t=Bn({...s,standEnabled:!0});return si(ni(t)).pegStand.rows}function _p(s){let t=Bn(s);return t.standEnabled?si(ni(t)).pegStand.volume:0}var Eu={};K0(Eu,{ACESFilmicToneMapping:()=>ru,AddEquation:()=>es,AddOperation:()=>ef,AdditiveAnimationBlendMode:()=>gu,AdditiveBlending:()=>Kh,AgXToneMapping:()=>au,AlphaFormat:()=>pu,AlwaysCompare:()=>mf,AlwaysDepth:()=>Oo,AlwaysStencilFunc:()=>cf,AmbientLight:()=>Us,AnimationAction:()=>$a,AnimationClip:()=>Ki,AnimationLoader:()=>uh,AnimationMixer:()=>Eh,AnimationObjectGroup:()=>bh,AnimationUtils:()=>hh,ArcCurve:()=>la,ArrayCamera:()=>Xa,ArrowHelper:()=>qh,AttachedBindMode:()=>Gc,Audio:()=>Ya,AudioAnalyser:()=>Sh,AudioContext:()=>Jr,AudioListener:()=>vh,AudioLoader:()=>xh,AxesHelper:()=>Yh,BackSide:()=>en,BasicDepthPacking:()=>af,BasicShadowMap:()=>Pm,BatchedMesh:()=>Qo,BezierInterpolant:()=>Na,Bone:()=>Rr,BooleanKeyframeTrack:()=>hi,Box2:()=>Ja,Box3:()=>Be,Box3Helper:()=>Wh,BoxGeometry:()=>li,BoxHelper:()=>Gh,BufferAttribute:()=>pe,BufferGeometry:()=>Kt,BufferGeometryLoader:()=>Ga,ByteType:()=>hu,Cache:()=>Wn,Camera:()=>Ns,CameraHelper:()=>Hh,CanvasTexture:()=>ah,CapsuleGeometry:()=>sa,CatmullRomCurve3:()=>ca,CineonToneMapping:()=>su,CircleGeometry:()=>ra,ClampToEdgeWrapping:()=>an,Clock:()=>Ih,Color:()=>Tt,ColorKeyframeTrack:()=>Xr,ColorManagement:()=>se,Compatibility:()=>xg,CompressedArrayTexture:()=>rh,CompressedCubeTexture:()=>oh,CompressedTexture:()=>Ts,CompressedTextureLoader:()=>dh,ConeGeometry:()=>Dr,ConstantAlphaFactor:()=>jd,ConstantColorFactor:()=>Jd,Controls:()=>Kr,CubeCamera:()=>Wa,CubeDepthTexture:()=>ia,CubeReflectionMapping:()=>Kn,CubeRefractionMapping:()=>Li,CubeTexture:()=>$i,CubeTextureLoader:()=>fh,CubeUVReflectionMapping:()=>zs,CubicBezierCurve:()=>Nr,CubicBezierCurve3:()=>ha,CubicInterpolant:()=>La,CullFaceBack:()=>Jh,CullFaceFront:()=>Nd,CullFaceFrontBack:()=>Rm,CullFaceNone:()=>Dd,Curve:()=>xn,CurvePath:()=>da,CustomBlending:()=>Fd,CustomToneMapping:()=>ou,CylinderGeometry:()=>Lr,Cylindrical:()=>Lh,Data3DTexture:()=>Ms,DataArrayTexture:()=>vs,DataTexture:()=>ln,DataTextureLoader:()=>ph,DataUtils:()=>Zc,DecrementStencilOp:()=>$m,DecrementWrapStencilOp:()=>Km,DefaultLoadingManager:()=>Mf,DepthFormat:()=>Xn,DepthStencilFormat:()=>Di,DepthTexture:()=>wi,DetachedBindMode:()=>nf,DirectionalLight:()=>ts,DirectionalLightHelper:()=>Vh,DiscreteInterpolant:()=>Da,DodecahedronGeometry:()=>oa,DoubleSide:()=>Ze,DstAlphaFactor:()=>Xd,DstColorFactor:()=>Yd,DynamicCopyUsage:()=>dg,DynamicDrawUsage:()=>og,DynamicReadUsage:()=>cg,EdgesGeometry:()=>aa,EllipseCurve:()=>As,EqualCompare:()=>df,EqualDepth:()=>zo,EqualStencilFunc:()=>eg,EquirectangularReflectionMapping:()=>to,EquirectangularRefractionMapping:()=>eo,Euler:()=>Dn,EventDispatcher:()=>gn,ExternalTexture:()=>Ir,ExtrudeGeometry:()=>Rs,FileLoader:()=>Nn,Float16BufferAttribute:()=>th,Float32BufferAttribute:()=>Rt,FloatType:()=>Qe,Fog:()=>qo,FogExp2:()=>Xo,FramebufferTexture:()=>sh,FrontSide:()=>Ii,Frustum:()=>ai,FrustumArray:()=>jo,GLBufferAttribute:()=>Rh,GLSL1:()=>pg,GLSL3:()=>_u,GreaterCompare:()=>ff,GreaterDepth:()=>Vo,GreaterEqualCompare:()=>Fl,GreaterEqualDepth:()=>ko,GreaterEqualStencilFunc:()=>rg,GreaterStencilFunc:()=>ig,GridHelper:()=>zh,Group:()=>Xe,HTMLTexture:()=>lh,HalfFloatType:()=>Fn,HemisphereLight:()=>Fa,HemisphereLightHelper:()=>Bh,IcosahedronGeometry:()=>ga,ImageBitmapLoader:()=>_h,ImageLoader:()=>ji,ImageUtils:()=>Wo,IncrementStencilOp:()=>Zm,IncrementWrapStencilOp:()=>Jm,InstancedBufferAttribute:()=>Ei,InstancedBufferGeometry:()=>Ha,InstancedInterleavedBuffer:()=>Ch,InstancedMesh:()=>Ko,Int16BufferAttribute:()=>jc,Int32BufferAttribute:()=>Qc,Int8BufferAttribute:()=>$c,IntType:()=>ja,InterleavedBuffer:()=>ws,InterleavedBufferAttribute:()=>Zi,Interpolant:()=>Ci,InterpolateBezier:()=>Wc,InterpolateDiscrete:()=>yr,InterpolateLinear:()=>Go,InterpolateSmooth:()=>Po,InterpolationSamplingMode:()=>_g,InterpolationSamplingType:()=>gg,InvertStencilOp:()=>jm,KeepStencilOp:()=>Io,KeyframeTrack:()=>hn,LOD:()=>Zo,LatheGeometry:()=>_a,Layers:()=>Ss,LessCompare:()=>uf,LessDepth:()=>Bo,LessEqualCompare:()=>Ul,LessEqualDepth:()=>xs,LessEqualStencilFunc:()=>ng,LessStencilFunc:()=>tg,Light:()=>$n,LightProbe:()=>ka,LightShadow:()=>Ds,Line:()=>Yn,Line3:()=>Nh,LineBasicMaterial:()=>We,LineCurve:()=>Ur,LineCurve3:()=>ua,LineDashedMaterial:()=>Ia,LineLoop:()=>ta,LineSegments:()=>wn,LinearFilter:()=>be,LinearInterpolant:()=>Wr,LinearMipMapLinearFilter:()=>Um,LinearMipMapNearestFilter:()=>Nm,LinearMipmapLinearFilter:()=>jn,LinearMipmapNearestFilter:()=>no,LinearSRGBColorSpace:()=>Mr,LinearToneMapping:()=>nu,LinearTransfer:()=>Sr,Loader:()=>Ye,LoaderUtils:()=>$r,LoadingManager:()=>Yr,LoopOnce:()=>sf,LoopPingPong:()=>of,LoopRepeat:()=>rf,MOUSE:()=>Ri,Material:()=>Oe,MaterialBlending:()=>Im,MaterialLoader:()=>Va,MathUtils:()=>xu,Matrix2:()=>Dh,Matrix3:()=>Zt,Matrix4:()=>Yt,MaxEquation:()=>kd,Mesh:()=>ge,MeshBasicMaterial:()=>_n,MeshDepthMaterial:()=>Hr,MeshDistanceMaterial:()=>Gr,MeshLambertMaterial:()=>Ra,MeshMatcapMaterial:()=>Pa,MeshNormalMaterial:()=>Ca,MeshPhongMaterial:()=>Ta,MeshPhysicalMaterial:()=>wa,MeshStandardMaterial:()=>Tn,MeshToonMaterial:()=>Aa,MinEquation:()=>zd,MirroredRepeatWrapping:()=>xr,MixOperation:()=>tf,MultiplyBlending:()=>Qh,MultiplyOperation:()=>Qr,NearestFilter:()=>Pe,NearestMipMapLinearFilter:()=>Dm,NearestMipMapNearestFilter:()=>Lm,NearestMipmapLinearFilter:()=>ks,NearestMipmapNearestFilter:()=>cu,NeutralToneMapping:()=>lu,NeverCompare:()=>hf,NeverDepth:()=>Fo,NeverStencilFunc:()=>Qm,NoBlending:()=>Jn,NoColorSpace:()=>fi,NoNormalPacking:()=>Gm,NoToneMapping:()=>Un,NormalAnimationBlendMode:()=>Nl,NormalBlending:()=>Bs,NormalGAPacking:()=>Xm,NormalRGPacking:()=>Wm,NotEqualCompare:()=>pf,NotEqualDepth:()=>Ho,NotEqualStencilFunc:()=>sg,NumberKeyframeTrack:()=>Is,Object3D:()=>le,ObjectLoader:()=>gh,ObjectSpaceNormalMap:()=>lf,OctahedronGeometry:()=>kr,OneFactor:()=>Hd,OneMinusConstantAlphaFactor:()=>Qd,OneMinusConstantColorFactor:()=>Kd,OneMinusDstAlphaFactor:()=>qd,OneMinusDstColorFactor:()=>Zd,OneMinusSrcAlphaFactor:()=>eu,OneMinusSrcColorFactor:()=>Wd,OrthographicCamera:()=>Qi,PCFShadowMap:()=>jr,PCFSoftShadowMap:()=>Ud,PMREMGenerator:()=>Vl,Path:()=>Zn,PerspectiveCamera:()=>Re,Plane:()=>pn,PlaneGeometry:()=>Ai,PlaneHelper:()=>Xh,PointLight:()=>Ba,PointLightHelper:()=>Oh,Points:()=>ea,PointsMaterial:()=>Pr,PolarGridHelper:()=>kh,PolyhedronGeometry:()=>Ti,PositionalAudio:()=>Mh,PropertyBinding:()=>fe,PropertyMixer:()=>Za,QuadraticBezierCurve:()=>Fr,QuadraticBezierCurve3:()=>Or,Quaternion:()=>De,QuaternionKeyframeTrack:()=>Ls,QuaternionLinearInterpolant:()=>Ua,R11_EAC_Format:()=>ul,RED_GREEN_RGTC2_Format:()=>co,RED_RGTC1_Format:()=>Il,REVISION:()=>Ld,RG11_EAC_Format:()=>lo,RGBADepthPacking:()=>km,RGBAFormat:()=>tn,RGBAIntegerFormat:()=>il,RGBA_ASTC_10x10_Format:()=>wl,RGBA_ASTC_10x5_Format:()=>Sl,RGBA_ASTC_10x6_Format:()=>bl,RGBA_ASTC_10x8_Format:()=>El,RGBA_ASTC_12x10_Format:()=>Tl,RGBA_ASTC_12x12_Format:()=>Al,RGBA_ASTC_4x4_Format:()=>pl,RGBA_ASTC_5x4_Format:()=>ml,RGBA_ASTC_5x5_Format:()=>gl,RGBA_ASTC_6x5_Format:()=>_l,RGBA_ASTC_6x6_Format:()=>xl,RGBA_ASTC_8x5_Format:()=>yl,RGBA_ASTC_8x6_Format:()=>vl,RGBA_ASTC_8x8_Format:()=>Ml,RGBA_BPTC_Format:()=>Cl,RGBA_ETC2_EAC_Format:()=>hl,RGBA_PVRTC_2BPPV1_Format:()=>al,RGBA_PVRTC_4BPPV1_Format:()=>ol,RGBA_S3TC_DXT1_Format:()=>ro,RGBA_S3TC_DXT3_Format:()=>oo,RGBA_S3TC_DXT5_Format:()=>ao,RGBDepthPacking:()=>Vm,RGBFormat:()=>mu,RGBIntegerFormat:()=>Fm,RGB_BPTC_SIGNED_Format:()=>Rl,RGB_BPTC_UNSIGNED_Format:()=>Pl,RGB_ETC1_Format:()=>ll,RGB_ETC2_Format:()=>cl,RGB_PVRTC_2BPPV1_Format:()=>rl,RGB_PVRTC_4BPPV1_Format:()=>sl,RGB_S3TC_DXT1_Format:()=>so,RGDepthPacking:()=>Hm,RGFormat:()=>Ni,RGIntegerFormat:()=>nl,RawShaderMaterial:()=>Vr,Ray:()=>qn,Raycaster:()=>Ph,RectAreaLight:()=>za,RedFormat:()=>el,RedIntegerFormat:()=>io,ReinhardToneMapping:()=>iu,RenderObjectRefreshType:()=>yg,RenderTarget:()=>wr,RenderTarget3D:()=>wh,RepeatWrapping:()=>_r,ReplaceStencilOp:()=>Ym,ReverseSubtractEquation:()=>Bd,RingGeometry:()=>Ps,SIGNED_R11_EAC_Format:()=>dl,SIGNED_RED_GREEN_RGTC2_Format:()=>Dl,SIGNED_RED_RGTC1_Format:()=>Ll,SIGNED_RG11_EAC_Format:()=>fl,SRGBColorSpace:()=>Ge,SRGBTransfer:()=>ce,Scene:()=>Es,ShaderChunk:()=>ne,ShaderLib:()=>Qn,ShaderMaterial:()=>cn,ShadowMaterial:()=>Ea,Shape:()=>ci,ShapeGeometry:()=>xa,ShapePath:()=>Zh,ShapeUtils:()=>Ln,ShortType:()=>uu,Skeleton:()=>Jo,SkeletonHelper:()=>Fh,SkinnedMesh:()=>$o,Source:()=>Xc,Sphere:()=>Fe,SphereGeometry:()=>Ji,Spherical:()=>Fs,SphericalHarmonics3:()=>Zr,SplineCurve:()=>Br,SpotLight:()=>Oa,SpotLightHelper:()=>Uh,Sprite:()=>Yo,SpriteMaterial:()=>Cr,SrcAlphaFactor:()=>tu,SrcAlphaSaturateFactor:()=>$d,SrcColorFactor:()=>Gd,StaticCopyUsage:()=>ug,StaticDrawUsage:()=>Ol,StaticReadUsage:()=>lg,StereoCamera:()=>yh,StreamCopyUsage:()=>fg,StreamDrawUsage:()=>ag,StreamReadUsage:()=>hg,StringKeyframeTrack:()=>ui,SubtractEquation:()=>Od,SubtractiveBlending:()=>jh,TOUCH:()=>Pi,TangentSpaceNormalMap:()=>di,TetrahedronGeometry:()=>ya,Texture:()=>Te,TextureLoader:()=>mh,TextureSource:()=>In,TextureUtils:()=>$h,Timer:()=>qa,TimestampQuery:()=>mg,TorusGeometry:()=>va,TorusKnotGeometry:()=>Ma,Triangle:()=>Gn,TriangleFanDrawMode:()=>zm,TriangleStripDrawMode:()=>Bm,TrianglesDrawMode:()=>Om,TubeGeometry:()=>Sa,UVMapping:()=>Ka,Uint16BufferAttribute:()=>Tr,Uint32BufferAttribute:()=>Ar,Uint8BufferAttribute:()=>Jc,Uint8ClampedBufferAttribute:()=>Kc,Uniform:()=>Th,UniformsGroup:()=>Ah,UniformsLib:()=>bt,UniformsUtils:()=>vf,UnsignedByteType:()=>un,UnsignedInt101111Type:()=>fu,UnsignedInt248Type:()=>Hs,UnsignedInt5999Type:()=>du,UnsignedIntType:()=>An,UnsignedShort4444Type:()=>Qa,UnsignedShort5551Type:()=>tl,UnsignedShortType:()=>Vs,VSMShadowMap:()=>Os,Vector2:()=>ot,Vector3:()=>C,Vector4:()=>me,VectorKeyframeTrack:()=>qr,VideoFrameTexture:()=>ih,VideoTexture:()=>na,WebGL3DRenderTarget:()=>Yc,WebGLArrayRenderTarget:()=>qc,WebGLCoordinateSystem:()=>mn,WebGLCubeRenderTarget:()=>Hl,WebGLRenderTarget:()=>qe,WebGLRenderer:()=>Gl,WebGLUtils:()=>c0,WebGPUCoordinateSystem:()=>qi,WebXRController:()=>bs,WireframeGeometry:()=>ba,WrapAroundEnding:()=>vr,ZeroCurvatureEnding:()=>Wi,ZeroFactor:()=>Vd,ZeroSlopeEnding:()=>Xi,ZeroStencilOp:()=>qm,createCanvasElement:()=>gf,error:()=>Ot,getConsoleFunction:()=>Sg,log:()=>Er,setConsoleFunction:()=>Mg,warn:()=>_t,warnOnce:()=>oi});var Ld="186",Ri={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Dd=0,Jh=1,Nd=2,Rm=3,Pm=0,jr=1,Ud=2,Os=3,Ii=0,en=1,Ze=2,Jn=0,Bs=1,Kh=2,jh=3,Qh=4,Fd=5,Im=6,es=100,Od=101,Bd=102,zd=103,kd=104,Vd=200,Hd=201,Gd=202,Wd=203,tu=204,eu=205,Xd=206,qd=207,Yd=208,Zd=209,$d=210,Jd=211,Kd=212,jd=213,Qd=214,Fo=0,Oo=1,Bo=2,xs=3,zo=4,ko=5,Vo=6,Ho=7,Qr=0,tf=1,ef=2,Un=0,nu=1,iu=2,su=3,ru=4,ou=5,au=6,lu=7,Gc="attached",nf="detached",Ka=300,Kn=301,Li=302,to=303,eo=304,zs=306,_r=1e3,an=1001,xr=1002,Pe=1003,cu=1004,Lm=1004,ks=1005,Dm=1005,be=1006,no=1007,Nm=1007,jn=1008,Um=1008,un=1009,hu=1010,uu=1011,Vs=1012,ja=1013,An=1014,Qe=1015,Fn=1016,Qa=1017,tl=1018,Hs=1020,du=35902,fu=35899,pu=1021,mu=1022,tn=1023,Xn=1026,Di=1027,el=1028,io=1029,Ni=1030,nl=1031,Fm=1032,il=1033,so=33776,ro=33777,oo=33778,ao=33779,sl=35840,rl=35841,ol=35842,al=35843,ll=36196,cl=37492,hl=37496,ul=37488,dl=37489,lo=37490,fl=37491,pl=37808,ml=37809,gl=37810,_l=37811,xl=37812,yl=37813,vl=37814,Ml=37815,Sl=37816,bl=37817,El=37818,wl=37819,Tl=37820,Al=37821,Cl=36492,Rl=36494,Pl=36495,Il=36283,Ll=36284,co=36285,Dl=36286,sf=2200,rf=2201,of=2202,yr=2300,Go=2301,Po=2302,Wc=2303,Wi=2400,Xi=2401,vr=2402,Nl=2500,gu=2501,Om=0,Bm=1,zm=2,af=3200,km=3201,Vm=3202,Hm=3203,di=0,lf=1,fi="",Ge="srgb",Mr="srgb-linear",Sr="linear",ce="srgb",Gm="",Wm="rg",Xm="ga",qm=0,Io=7680,Ym=7681,Zm=7682,$m=7683,Jm=34055,Km=34056,jm=5386,Qm=512,tg=513,eg=514,ng=515,ig=516,sg=517,rg=518,cf=519,hf=512,uf=513,df=514,Ul=515,ff=516,pf=517,Fl=518,mf=519,Ol=35044,og=35048,ag=35040,lg=35045,cg=35049,hg=35041,ug=35046,dg=35050,fg=35042,pg="100",_u="300 es",mn=2e3,qi=2001,mg={COMPUTE:"compute",RENDER:"render"},gg={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},_g={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},xg={TEXTURE_COMPARE:"depthTextureCompare"},yg={NONE:0,SHARED:1,FULL:2};function r_(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}var o_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function mr(s,t){return new o_[s](t)}function vg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function br(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function gf(){let s=br("canvas");return s.style.display="block",s}var xp={},Yi=null;function Mg(s){Yi=s}function Sg(){return Yi}function Er(...s){let t="THREE."+s.shift();Yi?Yi("log",t,...s):console.log(t,...s)}function bg(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function _t(...s){s=bg(s);let t="THREE."+s.shift();if(Yi)Yi("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Ot(...s){s=bg(s);let t="THREE."+s.shift();if(Yi)Yi("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function oi(...s){let t=s.join(" ");t in xp||(xp[t]=!0,_t(...s))}function Eg(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var wg={[Fo]:Oo,[Bo]:Vo,[zo]:Ho,[xs]:ko,[Oo]:Fo,[Vo]:Bo,[Ho]:zo,[ko]:xs},gn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yp=1234567,_s=Math.PI/180,ys=180/Math.PI;function En(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[s&255]+Je[s>>8&255]+Je[s>>16&255]+Je[s>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function Xt(s,t,e){return Math.max(t,Math.min(e,s))}function _f(s,t){return(s%t+t)%t}function a_(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function l_(s,t,e){return s!==t?(e-s)/(t-s):0}function Lo(s,t,e){return(1-e)*s+e*t}function c_(s,t,e,n){return Lo(s,t,1-Math.exp(-e*n))}function h_(s,t=1){return t-Math.abs(_f(s,t*2)-t)}function u_(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function d_(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function f_(s,t){return s+Math.floor(Math.random()*(t-s+1))}function p_(s,t){return s+Math.random()*(t-s)}function m_(s){return s*(.5-Math.random())}function g_(s){s!==void 0&&(yp=s);let t=yp+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function __(s){return s*_s}function x_(s){return s*ys}function y_(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function v_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function M_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function S_(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:_t("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function on(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ee(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var xu={DEG2RAD:_s,RAD2DEG:ys,generateUUID:En,clamp:Xt,euclideanModulo:_f,mapLinear:a_,inverseLerp:l_,lerp:Lo,damp:c_,pingpong:h_,smoothstep:u_,smootherstep:d_,randInt:f_,randFloat:p_,randFloatSpread:m_,seededRandom:g_,degToRad:__,radToDeg:x_,isPowerOfTwo:y_,ceilPowerOfTwo:v_,floorPowerOfTwo:M_,setQuaternionFromProperEuler:S_,normalize:ee,denormalize:on},ot=class s{static{s.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},De=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(d!==_||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*_;g<0&&(u=-u,f=-f,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){let v=Math.acos(g),b=Math.sin(v);m=Math.sin(m*v)/b,a=Math.sin(a*v)/b,l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a}else{l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a;let v=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=v,c*=v,h*=v,d*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*d+l*f-c*u,t[e+1]=l*p+h*u+c*d-a*f,t[e+2]=c*p+h*f+a*u-l*d,t[e+3]=h*p-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:_t("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class s{static{s.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Bu.copy(this).projectOnVector(t),this.sub(Bu)}reflect(t){return this.sub(Bu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Bu=new C,vp=new De,Zt=class s{static{s.prototype.isMatrix3=!0}constructor(t,e,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],v=i[1],b=i[4],y=i[7],w=i[2],S=i[5],A=i[8];return r[0]=o*_+a*v+l*w,r[3]=o*g+a*b+l*S,r[6]=o*m+a*y+l*A,r[1]=c*_+h*v+d*w,r[4]=c*g+h*b+d*S,r[7]=c*m+h*y+d*A,r[2]=u*_+f*v+p*w,r[5]=u*g+f*b+p*S,r[8]=u*m+f*y+p*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return oi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zu.makeScale(t,e)),this}rotate(t){return oi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zu.makeRotation(-t)),this}translate(t,e){return oi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},zu=new Zt,Mp=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sp=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function b_(){let s={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ce&&(i.r=bi(i.r),i.g=bi(i.g),i.b=bi(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ce&&(i.r=gr(i.r),i.g=gr(i.g),i.b=gr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fi?Sr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return oi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return oi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Mr]:{primaries:t,whitePoint:n,transfer:Sr,toXYZ:Mp,fromXYZ:Sp,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ge},outputColorSpaceConfig:{drawingBufferColorSpace:Ge}},[Ge]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:Mp,fromXYZ:Sp,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ge}}}),s}var se=b_();function bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function gr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var $s,Wo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{$s===void 0&&($s=br("canvas")),$s.width=t.width,$s.height=t.height;let i=$s.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=$s}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=br("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=bi(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bi(e[n]/255)*255):e[n]=bi(e[n]);return{data:e,width:t.width,height:t.height}}else return _t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},E_=0,In=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:E_++}),this.uuid=En(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ku(i[o].image)):r.push(ku(i[o]))}else r=ku(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function ku(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Wo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(_t("Texture: Unable to serialize Texture."),{})}var Xc=class extends In{constructor(t=null){oi('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(t),this.isSource=!0}},w_=0,Vu=new C,Te=class s extends gn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=an,i=an,r=be,o=jn,a=tn,l=un,c=s.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w_++}),this.uuid=En(),this.name="",this.source=new In(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vu).x}get height(){return this.source.getSize(Vu).y}get depth(){return this.source.getSize(Vu).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){_t(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){_t(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ka)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _r:t.x=t.x-Math.floor(t.x);break;case an:t.x=t.x<0?0:1;break;case xr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _r:t.y=t.y-Math.floor(t.y);break;case an:t.y=t.y<0?0:1;break;case xr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=Ka;Te.DEFAULT_ANISOTROPY=1;var me=class s{static{s.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,y=(f+1)/2,w=(m+1)/2,S=(h+u)/4,A=(d+_)/4,x=(p+g)/4;return b>y&&b>w?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=S/n,r=A/n):y>w?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=S/i,r=x/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=A/r,i=x/r),this.set(n,i,r,e),this}let v=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},wr=class extends gn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:be,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},r=new Te(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:be,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new In(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qe=class extends wr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},vs=class extends Te{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},qc=class extends qe{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new vs(null,t,e,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Ms=class extends Te{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}},Yc=class extends qe{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Ms(null,t,e,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Yt=class s{static{s.prototype.isMatrix4=!0}constructor(t,e,n,i,r,o,a,l,c,h,d,u,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,f,p,_,g)}set(t,e,n,i,r,o,a,l,c,h,d,u,f,p,_,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Js.setFromMatrixColumn(t,0).length(),r=1/Js.setFromMatrixColumn(t,1).length(),o=1/Js.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u+_*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=p*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=p*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+p,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(T_,t,A_)}lookAt(t,e,n){let i=this.elements;return Sn.subVectors(t,e),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Bi.crossVectors(n,Sn),Bi.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Bi.crossVectors(n,Sn)),Bi.normalize(),tc.crossVectors(Sn,Bi),i[0]=Bi.x,i[4]=tc.x,i[8]=Sn.x,i[1]=Bi.y,i[5]=tc.y,i[9]=Sn.y,i[2]=Bi.z,i[6]=tc.z,i[10]=Sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],b=n[7],y=n[11],w=n[15],S=i[0],A=i[4],x=i[8],T=i[12],P=i[1],I=i[5],N=i[9],z=i[13],L=i[2],O=i[6],W=i[10],B=i[14],nt=i[3],Y=i[7],tt=i[11],it=i[15];return r[0]=o*S+a*P+l*L+c*nt,r[4]=o*A+a*I+l*O+c*Y,r[8]=o*x+a*N+l*W+c*tt,r[12]=o*T+a*z+l*B+c*it,r[1]=h*S+d*P+u*L+f*nt,r[5]=h*A+d*I+u*O+f*Y,r[9]=h*x+d*N+u*W+f*tt,r[13]=h*T+d*z+u*B+f*it,r[2]=p*S+_*P+g*L+m*nt,r[6]=p*A+_*I+g*O+m*Y,r[10]=p*x+_*N+g*W+m*tt,r[14]=p*T+_*z+g*B+m*it,r[3]=v*S+b*P+y*L+w*nt,r[7]=v*A+b*I+y*O+w*Y,r[11]=v*x+b*N+y*W+w*tt,r[15]=v*T+b*z+y*B+w*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],_=t[7],g=t[11],m=t[15],v=l*f-c*u,b=a*f-c*d,y=a*u-l*d,w=o*f-c*h,S=o*u-l*h,A=o*d-a*h;return e*(_*v-g*b+m*y)-n*(p*v-g*w+m*S)+i*(p*b-_*w+m*A)-r*(p*y-_*S+g*A)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],_=t[13],g=t[14],m=t[15],v=e*a-n*o,b=e*l-i*o,y=e*c-r*o,w=n*l-i*a,S=n*c-r*a,A=i*c-r*l,x=h*_-d*p,T=h*g-u*p,P=h*m-f*p,I=d*g-u*_,N=d*m-f*_,z=u*m-f*g,L=v*z-b*N+y*I+w*P-S*T+A*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/L;return t[0]=(a*z-l*N+c*I)*O,t[1]=(i*N-n*z-r*I)*O,t[2]=(_*A-g*S+m*w)*O,t[3]=(u*S-d*A-f*w)*O,t[4]=(l*P-o*z-c*T)*O,t[5]=(e*z-i*P+r*T)*O,t[6]=(g*y-p*A-m*b)*O,t[7]=(h*A-u*y+f*b)*O,t[8]=(o*N-a*P+c*x)*O,t[9]=(n*P-e*N-r*x)*O,t[10]=(p*S-_*y+m*v)*O,t[11]=(d*y-h*S-f*v)*O,t[12]=(a*T-o*I-l*x)*O,t[13]=(e*I-n*T+i*x)*O,t[14]=(_*b-p*w-g*v)*O,t[15]=(h*w-d*b+u*v)*O,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,p=r*d,_=o*h,g=o*d,m=a*d,v=l*c,b=l*h,y=l*d,w=n.x,S=n.y,A=n.z;return i[0]=(1-(_+m))*w,i[1]=(f+y)*w,i[2]=(p-b)*w,i[3]=0,i[4]=(f-y)*S,i[5]=(1-(u+m))*S,i[6]=(g+v)*S,i[7]=0,i[8]=(p+b)*A,i[9]=(g-v)*A,i[10]=(1-(u+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Js.set(i[0],i[1],i[2]).length(),a=Js.set(i[4],i[5],i[6]).length(),l=Js.set(i[8],i[9],i[10]).length();r<0&&(o=-o),zn.copy(this);let c=1/o,h=1/a,d=1/l;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=d,zn.elements[9]*=d,zn.elements[10]*=d,e.setFromRotationMatrix(zn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,i,r,o,a=mn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===mn)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===qi)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=mn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===mn)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===qi)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Js=new C,zn=new Yt,T_=new C(0,0,0),A_=new C(1,1,1),Bi=new C,tc=new C,Sn=new C,bp=new Yt,Ep=new De,Dn=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:_t("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return bp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ep.setFromEuler(this),this.setFromQuaternion(Ep,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Dn.DEFAULT_ORDER="XYZ";var Ss=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},C_=0,wp=new C,Ks=new De,gi=new Yt,ec=new C,go=new C,R_=new C,P_=new De,Tp=new C(1,0,0),Ap=new C(0,1,0),Cp=new C(0,0,1),Rp={type:"added"},I_={type:"removed"},js={type:"childadded",child:null},Hu={type:"childremoved",child:null},le=class s extends gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:C_++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new C,e=new Dn,n=new De,i=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Yt},normalMatrix:{value:new Zt}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.multiply(Ks),this}rotateOnWorldAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.premultiply(Ks),this}rotateX(t){return this.rotateOnAxis(Tp,t)}rotateY(t){return this.rotateOnAxis(Ap,t)}rotateZ(t){return this.rotateOnAxis(Cp,t)}translateOnAxis(t,e){return wp.copy(t).applyQuaternion(this.quaternion),this.position.add(wp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Tp,t)}translateY(t){return this.translateOnAxis(Ap,t)}translateZ(t){return this.translateOnAxis(Cp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ec.copy(t):ec.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(go,ec,this.up):gi.lookAt(ec,go,this.up),this.quaternion.setFromRotationMatrix(gi),i&&(gi.extractRotation(i.matrixWorld),Ks.setFromRotationMatrix(gi),this.quaternion.premultiply(Ks.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rp),js.child=t,this.dispatchEvent(js),js.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(I_),Hu.child=t,this.dispatchEvent(Hu),Hu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rp),js.child=t,this.dispatchEvent(js),js.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,t,R_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,P_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};le.DEFAULT_UP=new C(0,1,0);le.DEFAULT_MATRIX_AUTO_UPDATE=!0;le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xe=class extends le{constructor(){super(),this.isGroup=!0,this.type="Group"}},L_={type:"move"},bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(L_)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Tg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},nc={h:0,s:0,l:0};function Gu(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Tt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=se.workingColorSpace){if(t=_f(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Gu(o,r,t+1/3),this.g=Gu(o,r,t),this.b=Gu(o,r,t-1/3)}return se.colorSpaceToWorking(this,i),this}setStyle(t,e=Ge){function n(r){r!==void 0&&parseFloat(r)<1&&_t("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:_t("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);_t("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){let n=Tg[t.toLowerCase()];return n!==void 0?this.setHex(n,e):_t("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bi(t.r),this.g=bi(t.g),this.b=bi(t.b),this}copyLinearToSRGB(t){return this.r=gr(t.r),this.g=gr(t.g),this.b=gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return se.workingToColorSpace(Ke.copy(this),t),Math.round(Xt(Ke.r*255,0,255))*65536+Math.round(Xt(Ke.g*255,0,255))*256+Math.round(Xt(Ke.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(Ke.copy(this),e);let n=Ke.r,i=Ke.g,r=Ke.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=Ge){se.workingToColorSpace(Ke.copy(this),t);let e=Ke.r,n=Ke.g,i=Ke.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(zi),this.setHSL(zi.h+t,zi.s+e,zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zi),t.getHSL(nc);let n=Lo(zi.h,nc.h,e),i=Lo(zi.s,nc.s,e),r=Lo(zi.l,nc.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ke=new Tt;Tt.NAMES=Tg;var Xo=class s{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Tt(t),this.density=e}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},qo=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Tt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Es=class extends le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},kn=new C,_i=new C,Wu=new C,xi=new C,Qs=new C,tr=new C,Pp=new C,Xu=new C,qu=new C,Yu=new C,Zu=new me,$u=new me,Ju=new me,Gn=class s{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),kn.subVectors(t,e),i.cross(kn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){kn.subVectors(i,e),_i.subVectors(n,e),Wu.subVectors(t,e);let o=kn.dot(kn),a=kn.dot(_i),l=kn.dot(Wu),c=_i.dot(_i),h=_i.dot(Wu),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,xi.x),l.addScaledVector(o,xi.y),l.addScaledVector(a,xi.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Zu.setScalar(0),$u.setScalar(0),Ju.setScalar(0),Zu.fromBufferAttribute(t,e),$u.fromBufferAttribute(t,n),Ju.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Zu,r.x),o.addScaledVector($u,r.y),o.addScaledVector(Ju,r.z),o}static isFrontFacing(t,e,n,i){return kn.subVectors(n,e),_i.subVectors(t,e),kn.cross(_i).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),kn.cross(_i).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Qs.subVectors(i,n),tr.subVectors(r,n),Xu.subVectors(t,n);let l=Qs.dot(Xu),c=tr.dot(Xu);if(l<=0&&c<=0)return e.copy(n);qu.subVectors(t,i);let h=Qs.dot(qu),d=tr.dot(qu);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Qs,o);Yu.subVectors(t,r);let f=Qs.dot(Yu),p=tr.dot(Yu);if(p>=0&&f<=p)return e.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(tr,a);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return Pp.subVectors(r,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(Pp,a);let m=1/(g+_+u);return o=_*m,a=u*m,e.copy(n).addScaledVector(Qs,o).addScaledVector(tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Be=class{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ic.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ic.copy(n.boundingBox)),ic.applyMatrix4(t.matrixWorld),this.union(ic)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_o),sc.subVectors(this.max,_o),er.subVectors(t.a,_o),nr.subVectors(t.b,_o),ir.subVectors(t.c,_o),ki.subVectors(nr,er),Vi.subVectors(ir,nr),rs.subVectors(er,ir);let e=[0,-ki.z,ki.y,0,-Vi.z,Vi.y,0,-rs.z,rs.y,ki.z,0,-ki.x,Vi.z,0,-Vi.x,rs.z,0,-rs.x,-ki.y,ki.x,0,-Vi.y,Vi.x,0,-rs.y,rs.x,0];return!Ku(e,er,nr,ir,sc)||(e=[1,0,0,0,1,0,0,0,1],!Ku(e,er,nr,ir,sc))?!1:(rc.crossVectors(ki,Vi),e=[rc.x,rc.y,rc.z],Ku(e,er,nr,ir,sc))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},yi=[new C,new C,new C,new C,new C,new C,new C,new C],Vn=new C,ic=new Be,er=new C,nr=new C,ir=new C,ki=new C,Vi=new C,rs=new C,_o=new C,sc=new C,rc=new C,os=new C;function Ku(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){os.fromArray(s,r);let a=i.x*Math.abs(os.x)+i.y*Math.abs(os.y)+i.z*Math.abs(os.z),l=t.dot(os),c=e.dot(os),h=n.dot(os);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Si=D_();function D_(){let s=new ArrayBuffer(4),t=new Float32Array(s),e=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function fn(s){Math.abs(s)>65504&&_t("DataUtils.toHalfFloat(): Value out of range."),s=Xt(s,-65504,65504),Si.floatView[0]=s;let t=Si.uint32View[0],e=t>>23&511;return Si.baseTable[e]+((t&8388607)>>Si.shiftTable[e])}function Co(s){let t=s>>10;return Si.uint32View[0]=Si.mantissaTable[Si.offsetTable[t]+(s&1023)]+Si.exponentTable[t],Si.floatView[0]}var Zc=class{static toHalfFloat(t){return fn(t)}static fromHalfFloat(t){return Co(t)}},Ue=new C,oc=new ot,N_=0,pe=class extends gn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:N_++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ol,this.updateRanges=[],this.gpuType=Qe,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)oc.fromBufferAttribute(this,e),oc.applyMatrix3(t),this.setXY(e,oc.x,oc.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=on(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=on(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=on(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=on(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=on(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array),r=ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}},$c=class extends pe{constructor(t,e,n){super(new Int8Array(t),e,n)}},Jc=class extends pe{constructor(t,e,n){super(new Uint8Array(t),e,n)}},Kc=class extends pe{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}},jc=class extends pe{constructor(t,e,n){super(new Int16Array(t),e,n)}},Tr=class extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}},Qc=class extends pe{constructor(t,e,n){super(new Int32Array(t),e,n)}},Ar=class extends pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}},th=class extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=Co(this.array[t*this.itemSize]);return this.normalized&&(e=on(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=fn(e),this}getY(t){let e=Co(this.array[t*this.itemSize+1]);return this.normalized&&(e=on(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=fn(e),this}getZ(t){let e=Co(this.array[t*this.itemSize+2]);return this.normalized&&(e=on(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=fn(e),this}getW(t){let e=Co(this.array[t*this.itemSize+3]);return this.normalized&&(e=on(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=fn(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=fn(e),this.array[t+1]=fn(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array)),this.array[t+0]=fn(e),this.array[t+1]=fn(n),this.array[t+2]=fn(i),this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array),r=ee(r,this.array)),this.array[t+0]=fn(e),this.array[t+1]=fn(n),this.array[t+2]=fn(i),this.array[t+3]=fn(r),this}},Rt=class extends pe{constructor(t,e,n){super(new Float32Array(t),e,n)}},U_=new Be,xo=new C,ju=new C,Fe=class{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):U_.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xo.subVectors(t,this.center);let e=xo.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(xo,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ju.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xo.copy(t.center).add(ju)),this.expandByPoint(xo.copy(t.center).sub(ju))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},F_=0,Pn=new Yt,Qu=new le,sr=new C,bn=new Be,yo=new Be,He=new C,Kt=class s extends gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(r_(t)?Ar:Tr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Pn.makeRotationFromQuaternion(t),this.applyMatrix4(Pn),this}rotateX(t){return Pn.makeRotationX(t),this.applyMatrix4(Pn),this}rotateY(t){return Pn.makeRotationY(t),this.applyMatrix4(Pn),this}rotateZ(t){return Pn.makeRotationZ(t),this.applyMatrix4(Pn),this}translate(t,e,n){return Pn.makeTranslation(t,e,n),this.applyMatrix4(Pn),this}scale(t,e,n){return Pn.makeScale(t,e,n),this.applyMatrix4(Pn),this}lookAt(t){return Qu.lookAt(t),Qu.updateMatrix(),this.applyMatrix4(Qu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Rt(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&_t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Be);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fe);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];yo.setFromBufferAttribute(a),this.morphTargetsRelative?(He.addVectors(bn.min,yo.min),bn.expandByPoint(He),He.addVectors(bn.max,yo.max),bn.expandByPoint(He)):(bn.expandByPoint(yo.min),bn.expandByPoint(yo.max))}bn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)He.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(He));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)He.fromBufferAttribute(a,c),l&&(sr.fromBufferAttribute(t,c),He.add(sr)),i=Math.max(i,n.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new pe(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let x=0;x<n.count;x++)a[x]=new C,l[x]=new C;let c=new C,h=new C,d=new C,u=new ot,f=new ot,p=new ot,_=new C,g=new C;function m(x,T,P){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,P),u.fromBufferAttribute(r,x),f.fromBufferAttribute(r,T),p.fromBufferAttribute(r,P),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(I),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(I),a[x].add(_),a[T].add(_),a[P].add(_),l[x].add(g),l[T].add(g),l[P].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let x=0,T=v.length;x<T;++x){let P=v[x],I=P.start,N=P.count;for(let z=I,L=I+N;z<L;z+=3)m(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let b=new C,y=new C,w=new C,S=new C;function A(x){w.fromBufferAttribute(i,x),S.copy(w);let T=a[x];b.copy(T),b.sub(w.multiplyScalar(w.dot(T))).normalize(),y.crossVectors(S,T);let I=y.dot(l[x])<0?-1:1;o.setXYZW(x,b.x,b.y,b.z,I)}for(let x=0,T=v.length;x<T;++x){let P=v[x],I=P.start,N=P.count;for(let z=I,L=I+N;z<L;z+=3)A(t.getX(z+0)),A(t.getX(z+1)),A(t.getX(z+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,d=new C;if(t)for(let u=0,f=t.count;u<f;u+=3){let p=t.getX(u+0),_=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new pe(u,h,d)}if(this.index===null)return _t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ws=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ol,this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},rn=new C,Zi=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix4(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyNormalMatrix(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.transformDirection(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=on(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=on(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=on(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=on(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=on(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array),r=ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Er("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Er("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},td=new C,O_=new C,B_=new Zt,pn=class{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=td.subVectors(n,e).cross(O_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(td),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||B_.getNormalMatrix(t),i=this.coplanarPoint(td).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},z_=0,Oe=class extends gn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=En(),this.name="",this.type="Material",this.blending=Bs,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tu,this.blendDst=eu,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Io,this.stencilZFail=Io,this.stencilZPass=Io,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){_t(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){_t(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Tt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new pn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ot().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Cr=class extends Oe{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},rr,vo=new C,or=new C,ar=new C,lr=new ot,Mo=new ot,Ag=new Yt,ac=new C,So=new C,lc=new C,Ip=new ot,ed=new ot,Lp=new ot,Yo=class extends le{constructor(t=new Cr){if(super(),this.isSprite=!0,this.type="Sprite",rr===void 0){rr=new Kt;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ws(e,5);rr.setIndex([0,1,2,0,2,3]),rr.setAttribute("position",new Zi(n,3,0,!1)),rr.setAttribute("uv",new Zi(n,2,3,!1))}this.geometry=rr,this.material=t,this.center=new ot(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Ot('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),or.setFromMatrixScale(this.matrixWorld),Ag.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ar.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&or.multiplyScalar(-ar.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;cc(ac.set(-.5,-.5,0),ar,o,or,i,r),cc(So.set(.5,-.5,0),ar,o,or,i,r),cc(lc.set(.5,.5,0),ar,o,or,i,r),Ip.set(0,0),ed.set(1,0),Lp.set(1,1);let a=t.ray.intersectTriangle(ac,So,lc,!1,vo);if(a===null&&(cc(So.set(-.5,.5,0),ar,o,or,i,r),ed.set(0,1),a=t.ray.intersectTriangle(ac,lc,So,!1,vo),a===null))return;let l=t.ray.origin.distanceTo(vo);l<t.near||l>t.far||e.push({distance:l,point:vo.clone(),uv:Gn.getInterpolation(vo,ac,So,lc,Ip,ed,Lp,new ot),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function cc(s,t,e,n,i,r){lr.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Mo.x=r*lr.x-i*lr.y,Mo.y=i*lr.x+r*lr.y):Mo.copy(lr),s.copy(t),s.x+=Mo.x,s.y+=Mo.y,s.applyMatrix4(Ag)}var hc=new C,Dp=new C,Zo=class extends le{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);let e=t.levels;for(let n=0,i=e.length;n<i;n++){let r=e[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);let i=this.levels,r;for(r=0;r<i.length&&!(e<i[r].distance);r++);return i.splice(r,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){let e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){let i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){let e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let r=e[n].distance;if(e[n].object.visible&&(r-=r*e[n].hysteresis),t<r)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){hc.setFromMatrixPosition(this.matrixWorld);let i=t.ray.origin.distanceTo(hc);this.getObjectForDistance(i).raycast(t,e)}}update(t){let e=this.levels;if(e.length>1){hc.setFromMatrixPosition(t.matrixWorld),Dp.setFromMatrixPosition(this.matrixWorld);let n=hc.distanceTo(Dp)/t.zoom;e[0].object.visible=!0;let i,r;for(i=1,r=e.length;i<r;i++){let o=e[i].distance;if(e[i].object.visible&&(o-=o*e[i].hysteresis),n>=o)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)e[i].object.visible=!1}}toJSON(t){let e=super.toJSON(t);e.object.autoUpdate=this.autoUpdate,e.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let o=n[i];e.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return e}},vi=new C,nd=new C,uc=new C,dc=new C,qn=class{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,e),vi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){nd.copy(t).add(e).multiplyScalar(.5),uc.copy(e).sub(t).normalize(),dc.copy(this.origin).sub(nd);let r=t.distanceTo(e)*.5,o=-this.direction.dot(uc),a=dc.dot(this.direction),l=-dc.dot(uc),c=dc.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(nd).addScaledVector(uc,u),f}intersectSphere(t,e){if(t.radius<0)return null;vi.subVectors(t.center,this.origin);let n=vi.dot(this.direction),i=vi.dot(vi)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,e,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,p=e.x-o.x,_=e.y-o.y,g=e.z-o.z,m=n.x-o.x,v=n.y-o.y,b=n.z-o.z,y=Math.abs(l),w=Math.abs(c),S=Math.abs(h),A,x,T,P,I,N,z,L,O,W,B,nt;if(y>=w&&y>=S?(T=l,N=d,O=p,nt=m,l>=0?(A=c,x=h,P=u,I=f,z=_,L=g,W=v,B=b):(A=h,x=c,P=f,I=u,z=g,L=_,W=b,B=v)):w>=S?(T=c,N=u,O=_,nt=v,c>=0?(A=h,x=l,P=f,I=d,z=g,L=p,W=b,B=m):(A=l,x=h,P=d,I=f,z=p,L=g,W=m,B=b)):(T=h,N=f,O=g,nt=b,h>=0?(A=l,x=c,P=d,I=u,z=p,L=_,W=m,B=v):(A=c,x=l,P=u,I=d,z=_,L=p,W=v,B=m)),T===0)return null;let Y=A/T,tt=x/T,it=1/T,Lt=P-Y*N,pt=I-tt*N,$t=z-Y*O,Jt=L-tt*O,jt=W-Y*nt,J=B-tt*nt,et=jt*Jt-J*$t,xt=Lt*J-pt*jt,Q=$t*pt-Jt*Lt;if(i){if(et<0||xt<0||Q<0)return null}else if((et<0||xt<0||Q<0)&&(et>0||xt>0||Q>0))return null;let $=et+xt+Q;if($===0)return null;let ut=it*(et*N+xt*O+Q*nt);return($>0?ut<0:ut>0)?null:this.at(ut/$,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_n=class extends Oe{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Qr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Np=new Yt,as=new qn,fc=new Fe,Up=new C,pc=new C,mc=new C,gc=new C,id=new C,_c=new C,Fp=new C,xc=new C,ge=class extends le{constructor(t=new Kt,e=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){_c.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(id.fromBufferAttribute(d,t),o?_c.addScaledVector(id,h):_c.addScaledVector(id.sub(e),h))}e.add(_c)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fc.copy(n.boundingSphere),fc.applyMatrix4(r),as.copy(t.ray).recast(t.near),!(fc.containsPoint(as.origin)===!1&&(as.intersectSphere(fc,Up)===null||as.origin.distanceToSquared(Up)>(t.far-t.near)**2))&&(Np.copy(r).invert(),as.copy(t.ray).applyMatrix4(Np),!(n.boundingBox!==null&&as.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,as)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,w=b;y<w;y+=3){let S=a.getX(y),A=a.getX(y+1),x=a.getX(y+2);i=yc(this,m,t,n,c,h,d,S,A,x),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let v=a.getX(g),b=a.getX(g+1),y=a.getX(g+2);i=yc(this,o,t,n,c,h,d,v,b,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,w=b;y<w;y+=3){let S=y,A=y+1,x=y+2;i=yc(this,m,t,n,c,h,d,S,A,x),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let v=g,b=g+1,y=g+2;i=yc(this,o,t,n,c,h,d,v,b,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}};function k_(s,t,e,n,i,r,o,a){let l;if(t.side===en?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Ii,a),l===null)return null;xc.copy(a),xc.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(xc);return c<e.near||c>e.far?null:{distance:c,point:xc.clone(),object:s}}function yc(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,pc),s.getVertexPosition(l,mc),s.getVertexPosition(c,gc);let h=k_(s,t,e,n,pc,mc,gc,Fp);if(h){let d=new C;Gn.getBarycoord(Fp,pc,mc,gc,d),i&&(h.uv=Gn.getInterpolatedAttribute(i,a,l,c,d,new ot)),r&&(h.uv1=Gn.getInterpolatedAttribute(r,a,l,c,d,new ot)),o&&(h.normal=Gn.getInterpolatedAttribute(o,a,l,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new C,materialIndex:0};Gn.getNormal(pc,mc,gc,u.normal),h.face=u,h.barycoord=d}return h}var bo=new me,Op=new me,Bp=new me,V_=new me,zp=new Yt,vc=new C,sd=new Fe,kp=new Yt,rd=new qn,$o=class extends ge{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Gc,this.bindMatrix=new Yt,this.bindMatrixInverse=new Yt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Be),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,vc),this.boundingBox.expandByPoint(vc)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Fe),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,vc),this.boundingSphere.expandByPoint(vc)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sd.copy(this.boundingSphere),sd.applyMatrix4(i),t.ray.intersectsSphere(sd)!==!1&&(kp.copy(i).invert(),rd.copy(t.ray).applyMatrix4(kp),!(this.boundingBox!==null&&rd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,rd)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new me,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Gc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===nf?this.bindMatrixInverse.copy(this.bindMatrix).invert():_t("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;Op.fromBufferAttribute(i.attributes.skinIndex,t),Bp.fromBufferAttribute(i.attributes.skinWeight,t),e.isVector4?(bo.copy(e),e.set(0,0,0,0)):(bo.set(...e,1),e.set(0,0,0)),bo.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Bp.getComponent(r);if(o!==0){let a=Op.getComponent(r);zp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(V_.copy(bo).applyMatrix4(zp),o)}}return e.isVector4&&(e.w=bo.w),e.applyMatrix4(this.bindMatrixInverse)}},Rr=class extends le{constructor(){super(),this.isBone=!0,this.type="Bone"}},ln=class extends Te{constructor(t=null,e=1,n=1,i,r,o,a,l,c=Pe,h=Pe,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vp=new Yt,H_=new Yt,Jo=class s{constructor(t=[],e=[]){this.uuid=En(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){_t("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Yt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Yt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:H_;Vp.multiplyMatrices(a,e[r]),Vp.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new ln(e,t,t,tn,Qe);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let r=t.bones[n],o=e[r];o===void 0&&(_t("Skeleton: No bone found with UUID:",r),o=new Rr),this.bones.push(o),this.boneInverses.push(new Yt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){let o=e[i];t.bones.push(o.uuid);let a=n[i];t.boneInverses.push(a.toArray())}return t}},Ei=class extends pe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},cr=new Yt,Hp=new Yt,Mc=[],Gp=new Be,G_=new Yt,Eo=new ge,wo=new Fe,Ko=class extends ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ei(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,G_)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Be),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,cr),Gp.copy(t.boundingBox).applyMatrix4(cr),this.boundingBox.union(Gp)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fe),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,cr),wo.copy(t.boundingSphere).applyMatrix4(cr),this.boundingSphere.union(wo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Eo.geometry=this.geometry,Eo.material=this.material,Eo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wo.copy(this.boundingSphere),wo.applyMatrix4(n),t.ray.intersectsSphere(wo)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,cr),Hp.multiplyMatrices(n,cr),Eo.matrixWorld=Hp,Eo.raycast(t,Mc);for(let o=0,a=Mc.length;o<a;o++){let l=Mc[o];l.instanceId=r,l.object=this,e.push(l)}Mc.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ei(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ln(new Float32Array(i*this.count),i,this.count,el,Qe));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ls=new Fe,W_=new ot(.5,.5),Sc=new C,ai=class{constructor(t=new pn,e=new pn,n=new pn,i=new pn,r=new pn,o=new pn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],v=r[12],b=r[13],y=r[14],w=r[15];if(i[0].setComponents(c-o,f-h,m-p,w-v).normalize(),i[1].setComponents(c+o,f+h,m+p,w+v).normalize(),i[2].setComponents(c+a,f+d,m+_,w+b).normalize(),i[3].setComponents(c-a,f-d,m-_,w-b).normalize(),n)i[4].setComponents(l,u,g,y).normalize(),i[5].setComponents(c-l,f-u,m-g,w-y).normalize();else if(i[4].setComponents(c-l,f-u,m-g,w-y).normalize(),e===mn)i[5].setComponents(c+l,f+u,m+g,w+y).normalize();else if(e===qi)i[5].setComponents(l,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(t){ls.center.set(0,0,0);let e=W_.distanceTo(t.center);return ls.radius=.7071067811865476+e,ls.applyMatrix4(t.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Sc.x=i.normal.x>0?t.max.x:t.min.x,Sc.y=i.normal.y>0?t.max.y:t.min.y,Sc.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Sc)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wp=new Yt,jo=class s{constructor(){this.coordinateSystem=mn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];Wp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new ai),n[i].setFromProjectionMatrix(Wp,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new ai),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};function od(s,t){return s-t}function X_(s,t){return s.z-t.z}function q_(s,t){return t.z-s.z}var vd=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){let r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];o.push(a),this.index++,a.start=t,a.count=e,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}},dn=new Yt,Y_=new Tt(1,1,1),Z_=new ai,$_=new jo,bc=new Be,cs=new Fe,To=new C,Xp=new C,J_=new C,ad=new vd,je=new ge,Ec=[];function K_(s,t,e=0){let n=t.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==t.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)t.setComponent(r+e,o,s.getComponent(r,o))}else t.array.set(s.array,e*n);t.needsUpdate=!0}function hs(s,t){if(s.constructor!==t.constructor){let e=Math.min(s.length,t.length);for(let n=0;n<e;n++)t[n]=s[n]}else{let e=Math.min(s.length,t.length);t.set(new s.constructor(s.buffer,0,e))}}var Qo=class extends ge{constructor(t,e,n=e*2,i){super(new Kt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4),n=new ln(e,t,t,tn,Qe);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Uint32Array(t*t),n=new ln(e,t,t,io,An);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Float32Array(t*t*4).fill(1),n=new ln(e,t,t,tn,Qe);n.colorSpace=se.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){let e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in t.attributes){let o=t.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,h=new a.constructor(n*l),d=new pe(h,l,c);e.setAttribute(r,d)}if(t.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new pe(r,1))}this._geometryInitialized=!0}}_validateGeometry(t){let e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in e.attributes){if(!t.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=t.getAttribute(n),r=e.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){let e=this._instanceInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){let e=this._geometryInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Be);let t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;let r=e[n].geometryIndex;this.getMatrixAt(n,dn),this.getBoundingBoxAt(r,bc).applyMatrix4(dn),t.union(bc)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fe);let t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;let r=e[n].geometryIndex;this.getMatrixAt(n,dn),this.getBoundingSphereAt(r,cs).applyMatrix4(dn),t.union(cs)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:t},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(od),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;dn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let o=this._colorsTexture;return o&&(Y_.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;let o=t.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(od),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=e.getIndex(),a=this._geometryInfo[t];if(i&&o.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(let h in n.attributes){let d=e.getAttribute(h),u=n.getAttribute(h);K_(d,u,l);let f=d.itemSize;for(let p=d.count,_=c;p<_;p++){let g=l+p;for(let m=0;m<f;m++)u.setComponent(g,m,0)}u.needsUpdate=!0,u.addUpdateRange(l*f,c*f)}if(i){let h=a.indexStart,d=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let u=0;u<o.count;u++)r.setX(h+u,l+o.getX(u));for(let u=o.count,f=d;u<f;u++)r.setX(h+u,l);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,e.boundingSphere!==null&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){let e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===t&&this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){return this.validateInstanceId(t),this._instanceInfo[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this}optimize(){let t=0,e=0,n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){let l=i[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==e){let{indexStart:h,vertexStart:d,reservedIndexCount:u}=c,f=r.index,p=f.array,_=t-d;for(let g=h;g<h+u;g++)p[g]=p[g]+_;f.array.copyWithin(e,h,h+u),f.addUpdateRange(e,u),f.needsUpdate=!0,c.indexStart=e}e+=c.reservedIndexCount}if(c.vertexStart!==t){let{vertexStart:h,reservedVertexCount:d}=c,u=r.attributes;for(let f in u){let p=u[f],{array:_,itemSize:g}=p;_.copyWithin(t*g,h*g,(h+d)*g),p.addUpdateRange(t*g,d*g),p.needsUpdate=!0}c.vertexStart=t}t+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=e,this._nextVertexStart=t,this._visibilityChanged=!0,this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){let r=new Be,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;o&&(h=o.getX(h)),r.expandByPoint(To.fromBufferAttribute(a,h))}i.boundingBox=r}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){let r=new Fe;this.getBoundingBoxAt(t,bc),bc.getCenter(r.center);let o=n.index,a=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let d=c;o&&(d=o.getX(d)),To.fromBufferAttribute(a,d),l=Math.max(l,r.center.distanceToSquared(To))}r.radius=Math.sqrt(l),i.boundingSphere=r}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t);let n=this._matricesTexture,i=this._matricesTexture.image.data;return e.toArray(i,t*16),n.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this._matricesTexture.image.data,t*16)}setColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null&&this._initColorsTexture(),e.toArray(this._colorsTexture.image.data,t*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null?e.isVector4?e.set(1,1,1,1):e.setRGB(1,1,1):e.fromArray(this._colorsTexture.image.data,t*4)}setVisibleAt(t,e){return this.validateInstanceId(t),this._instanceInfo[t].visible===e?this:(this._instanceInfo[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){return this.validateInstanceId(t),this._instanceInfo[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this._instanceInfo[t].geometryIndex=e,this._visibilityChanged=!0,this}getGeometryIdAt(t){return this.validateInstanceId(t),this._instanceInfo[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t);let n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){let e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(od);e[e.length-1]===n.length-1;)n.pop(),e.pop();if(t<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);let i=new Int32Array(t),r=new Int32Array(t);hs(this._multiDrawCounts,i),hs(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=t;let o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),hs(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),hs(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),hs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){let n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Kt,this._initializeGeometry(r));let o=this.geometry;r.index&&hs(r.index.array,o.index.array);for(let a in r.attributes)hs(r.attributes[a].array,o.attributes[a].array)}raycast(t,e){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;je.material=this.material,je.geometry.index=o.index,je.geometry.attributes=o.attributes,je.geometry.boundingBox===null&&(je.geometry.boundingBox=new Be),je.geometry.boundingSphere===null&&(je.geometry.boundingSphere=new Fe);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;let c=n[a].geometryIndex,h=i[c];je.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,je.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,je.geometry.boundingBox),this.getBoundingSphereAt(c,je.geometry.boundingSphere),je.raycast(t,Ec);for(let d=0,u=Ec.length;d<u;d++){let f=Ec[d];f.object=this,f.batchId=a,e.push(f)}Ec.length=0}je.material=null,je.geometry.index=null,je.geometry.attributes={},je.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._availableInstanceIds=t._availableInstanceIds.slice(),this._availableGeometryIds=t._availableGeometryIds.slice(),this._nextIndexStart=t._nextIndexStart,this._nextVertexStart=t._nextVertexStart,this._geometryCount=t._geometryCount,this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._multiDrawBytesPerElement=t._multiDrawBytesPerElement,this._indirectTexture=t._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(t,e,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,a=i.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?$_:Z_;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(dn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(dn,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){dn.copy(this.matrixWorld).invert(),To.setFromMatrixPosition(n.matrixWorld).applyMatrix4(dn),Xp.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(dn);for(let y=0,w=c.length;y<w;y++)if(c[y].visible&&c[y].active){let S=c[y].geometryIndex;this.getMatrixAt(y,dn),this.getBoundingSphereAt(S,cs).applyMatrix4(dn);let A=!1;if(f&&(A=!g.intersectsSphere(cs)),!A){let x=u[S],T=J_.subVectors(cs.center,To).dot(Xp);ad.push(x.start,x.count,T,y)}}let v=ad.list,b=this.customSort;b===null?v.sort(r.transparent?q_:X_):b.call(this,v,n);for(let y=0,w=v.length;y<w;y++){let S=v[y];h[m]=S.start*a*l,d[m]=S.count*l,_[m]=S.index,m++}ad.reset()}else for(let v=0,b=c.length;v<b;v++)if(c[v].visible&&c[v].active){let y=c[v].geometryIndex,w=!1;if(f&&(this.getMatrixAt(v,dn),this.getBoundingSphereAt(y,cs).applyMatrix4(dn),w=!g.intersectsSphere(cs)),!w){let S=u[y];h[m]=S.start*a*l,d[m]=S.count*l,_[m]=v,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._multiDrawBytesPerElement=a,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,r,o){this.onBeforeRender(t,null,i,r,o)}},We=class extends Oe{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},eh=new C,nh=new C,qp=new Yt,Ao=new qn,wc=new Fe,ld=new C,Yp=new C,Yn=class extends le{constructor(t=new Kt,e=new We){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)eh.fromBufferAttribute(e,i-1),nh.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=eh.distanceTo(nh);t.setAttribute("lineDistance",new Rt(n,1))}else _t("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wc.copy(n.boundingSphere),wc.applyMatrix4(i),wc.radius+=r,t.ray.intersectsSphere(wc)===!1)return;qp.copy(i).invert(),Ao.copy(t.ray).applyMatrix4(qp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=h.getX(_),v=h.getX(_+1),b=Tc(this,t,Ao,l,m,v,_);b&&e.push(b)}if(this.isLineLoop){let _=h.getX(p-1),g=h.getX(f),m=Tc(this,t,Ao,l,_,g,p-1);m&&e.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=Tc(this,t,Ao,l,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){let _=Tc(this,t,Ao,l,p-1,f,p-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Tc(s,t,e,n,i,r,o){let a=s.geometry.attributes.position;if(eh.fromBufferAttribute(a,i),nh.fromBufferAttribute(a,r),e.distanceSqToSegment(eh,nh,ld,Yp)>n)return;ld.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(ld);if(!(c<t.near||c>t.far))return{distance:c,point:Yp.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Zp=new C,$p=new C,wn=class extends Yn{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Zp.fromBufferAttribute(e,i),$p.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Zp.distanceTo($p);t.setAttribute("lineDistance",new Rt(n,1))}else _t("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ta=class extends Yn{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Pr=class extends Oe{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Jp=new Yt,Md=new qn,Ac=new Fe,Cc=new C,ea=class extends le{constructor(t=new Kt,e=new Pr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ac.copy(n.boundingSphere),Ac.applyMatrix4(i),Ac.radius+=r,t.ray.intersectsSphere(Ac)===!1)return;Jp.copy(i).invert(),Md.copy(t.ray).applyMatrix4(Jp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=u,_=f;p<_;p++){let g=c.getX(p);Cc.fromBufferAttribute(d,g),Kp(Cc,g,l,i,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,_=f;p<_;p++)Cc.fromBufferAttribute(d,p),Kp(Cc,p,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Kp(s,t,e,n,i,r,o){let a=Md.distanceSqToPoint(s);if(a<e){let l=new C;Md.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var na=class extends Te{constructor(t,e,n,i,r=be,o=be,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function d(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=t.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in t&&(this._requestVideoFrameCallbackId=t.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){let t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},ih=class extends na{constructor(t,e,n,i,r,o,a,l){super({},t,e,n,i,r,o,a,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(t){this.image=t,this.needsUpdate=!0}},sh=class extends Te{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=Pe,this.minFilter=Pe,this.generateMipmaps=!1,this.needsUpdate=!0}},Ts=class extends Te{constructor(t,e,n,i,r,o,a,l,c,h,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}},rh=class extends Ts{constructor(t,e,n,i,r,o){super(t,e,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=an,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},oh=class extends Ts{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,Kn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}},$i=class extends Te{constructor(t=[],e=Kn,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ah=class extends Te{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},lh=class extends Te{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=t?t.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let t=this.image?this.image.parentNode:null;t!==null&&"onpaint"in t&&(t.onpaint=null),super.dispose()}},wi=class extends Te{constructor(t,e,n=An,i,r,o,a=Pe,l=Pe,c,h=Xn,d=1){if(h!==Xn&&h!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new In(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ia=class extends wi{constructor(t,e=An,n=Kn,i,r,o=Pe,a=Pe,l,c=Xn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ir=class extends Te{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},li=class s extends Kt{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(d,2));function p(_,g,m,v,b,y,w,S,A,x,T){let P=y/A,I=w/x,N=y/2,z=w/2,L=S/2,O=A+1,W=x+1,B=0,nt=0,Y=new C;for(let tt=0;tt<W;tt++){let it=tt*I-z;for(let Lt=0;Lt<O;Lt++){let pt=Lt*P-N;Y[_]=pt*v,Y[g]=it*b,Y[m]=L,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[g]=0,Y[m]=S>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(Lt/A),d.push(1-tt/x),B+=1}}for(let tt=0;tt<x;tt++)for(let it=0;it<A;it++){let Lt=u+it+O*tt,pt=u+it+O*(tt+1),$t=u+(it+1)+O*(tt+1),Jt=u+(it+1)+O*tt;l.push(Lt,pt,Jt),l.push(pt,$t,Jt),nt+=6}a.addGroup(f,nt,T),f+=nt,u+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},sa=class s extends Kt{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,p=n*2+r,_=i+1,g=new C,m=new C;for(let v=0;v<=p;v++){let b=0,y=0,w=0,S=0;if(v<=n){let T=v/n,P=T*Math.PI/2;y=-h-t*Math.cos(P),w=t*Math.sin(P),S=-t*Math.cos(P),b=T*d}else if(v<=n+r){let T=(v-n)/r;y=-h+T*e,w=t,S=0,b=d+T*u}else{let T=(v-n-r)/n,P=T*Math.PI/2;y=h+t*Math.sin(P),w=t*Math.cos(P),S=t*Math.sin(P),b=d+u+T*d}let A=Math.max(0,Math.min(1,b/f)),x=0;v===0?x=.5/i:v===p&&(x=-.5/i);for(let T=0;T<=i;T++){let P=T/i,I=P*Math.PI*2,N=Math.sin(I),z=Math.cos(I);m.x=-w*z,m.y=y,m.z=w*N,a.push(m.x,m.y,m.z),g.set(-w*z,S,w*N),g.normalize(),l.push(g.x,g.y,g.z),c.push(P+x,A)}if(v>0){let T=(v-1)*_;for(let P=0;P<i;P++){let I=T+P,N=T+P+1,z=v*_+P,L=v*_+P+1;o.push(I,N,z),o.push(N,L,z)}}}this.setIndex(o),this.setAttribute("position",new Rt(a,3)),this.setAttribute("normal",new Rt(l,3)),this.setAttribute("uv",new Rt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},ra=class s extends Kt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new C,h=new ot;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(a,3)),this.setAttribute("uv",new Rt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Lr=class s extends Kt{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,_=[],g=n/2,m=0;v(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Rt(d,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(f,2));function v(){let y=new C,w=new C,S=0,A=(e-t)/n;for(let x=0;x<=r;x++){let T=[],P=x/r,I=P*(e-t)+t;for(let N=0;N<=i;N++){let z=N/i,L=z*l+a,O=Math.sin(L),W=Math.cos(L);w.x=I*O,w.y=-P*n+g,w.z=I*W,d.push(w.x,w.y,w.z),y.set(O,A,W).normalize(),u.push(y.x,y.y,y.z),f.push(z,1-P),T.push(p++)}_.push(T)}for(let x=0;x<i;x++)for(let T=0;T<r;T++){let P=_[T][x],I=_[T+1][x],N=_[T+1][x+1],z=_[T][x+1];(t>0||T!==0)&&(h.push(P,I,z),S+=3),(e>0||T!==r-1)&&(h.push(I,N,z),S+=3)}c.addGroup(m,S,0),m+=S}function b(y){let w=p,S=new ot,A=new C,x=0,T=y===!0?t:e,P=y===!0?1:-1;for(let N=1;N<=i;N++)d.push(0,g*P,0),u.push(0,P,0),f.push(.5,.5),p++;let I=p;for(let N=0;N<=i;N++){let L=N/i*l+a,O=Math.cos(L),W=Math.sin(L);A.x=T*W,A.y=g*P,A.z=T*O,d.push(A.x,A.y,A.z),u.push(0,P,0),S.x=O*.5+.5,S.y=W*.5*P+.5,f.push(S.x,S.y),p++}for(let N=0;N<i;N++){let z=w+N,L=I+N;y===!0?h.push(L,L+1,z):h.push(L+1,L,z),x+=3}c.addGroup(m,x,y===!0?1:2),m+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Dr=class s extends Lr{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ti=class s extends Kt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Rt(r,3)),this.setAttribute("normal",new Rt(r.slice(),3)),this.setAttribute("uv",new Rt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let b=new C,y=new C,w=new C;for(let S=0;S<e.length;S+=3)f(e[S+0],b),f(e[S+1],y),f(e[S+2],w),l(b,y,w,v)}function l(v,b,y,w){let S=w+1,A=[];for(let x=0;x<=S;x++){A[x]=[];let T=v.clone().lerp(y,x/S),P=b.clone().lerp(y,x/S),I=S-x;for(let N=0;N<=I;N++)N===0&&x===S?A[x][N]=T:A[x][N]=T.clone().lerp(P,N/I)}for(let x=0;x<S;x++)for(let T=0;T<2*(S-x)-1;T++){let P=Math.floor(T/2);T%2===0?(u(A[x][P+1]),u(A[x+1][P]),u(A[x][P])):(u(A[x][P+1]),u(A[x+1][P+1]),u(A[x+1][P]))}}function c(v){let b=new C;for(let y=0;y<r.length;y+=3)b.x=r[y+0],b.y=r[y+1],b.z=r[y+2],b.normalize().multiplyScalar(v),r[y+0]=b.x,r[y+1]=b.y,r[y+2]=b.z}function h(){let v=new C;for(let b=0;b<r.length;b+=3){v.x=r[b+0],v.y=r[b+1],v.z=r[b+2];let y=g(v)/2/Math.PI+.5,w=m(v)/Math.PI+.5;o.push(y,1-w)}p(),d()}function d(){for(let v=0;v<o.length;v+=6){let b=o[v+0],y=o[v+2],w=o[v+4],S=Math.max(b,y,w),A=Math.min(b,y,w);S>.9&&A<.1&&(b<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),w<.2&&(o[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,b){let y=v*3;b.x=t[y+0],b.y=t[y+1],b.z=t[y+2]}function p(){let v=new C,b=new C,y=new C,w=new C,S=new ot,A=new ot,x=new ot;for(let T=0,P=0;T<r.length;T+=9,P+=6){v.set(r[T+0],r[T+1],r[T+2]),b.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),S.set(o[P+0],o[P+1]),A.set(o[P+2],o[P+3]),x.set(o[P+4],o[P+5]),w.copy(v).add(b).add(y).divideScalar(3);let I=g(w);_(S,P+0,v,I),_(A,P+2,b,I),_(x,P+4,y,I)}}function _(v,b,y,w){w<0&&v.x===1&&(o[b]=v.x-1),y.x===0&&y.z===0&&(o[b]=w/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}},oa=class s extends Ti{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},Rc=new C,Pc=new C,cd=new C,Ic=new Gn,aa=class extends Kt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(_s*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:g,c:m}=Ic;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Ic.getNormal(cd),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){let b=(v+1)%3,y=d[v],w=d[b],S=Ic[h[v]],A=Ic[h[b]],x=`${y}_${w}`,T=`${w}_${y}`;T in u&&u[T]?(cd.dot(u[T].normal)<=r&&(f.push(S.x,S.y,S.z),f.push(A.x,A.y,A.z)),u[T]=null):x in u||(u[x]={index0:c[v],index1:c[b],normal:cd.clone()})}}for(let p in u)if(u[p]){let{index0:_,index1:g}=u[p];Rc.fromBufferAttribute(a,_),Pc.fromBufferAttribute(a,g),f.push(Rc.x,Rc.y,Rc.z),f.push(Pc.x,Pc.y,Pc.z)}this.setAttribute("position",new Rt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){_t("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new ot:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new C,i=[],r=[],o=[],a=new C,l=new Yt;for(let f=0;f<=t;f++){let p=f/t;i[f]=this.getTangentAt(p,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Xt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Xt(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},As=class extends xn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ot){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},la=class extends As{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function xf(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var jp=new C,Qp=new C,hd=new xf,ud=new xf,dd=new xf,ca=class extends xn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new C){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Qp.subVectors(i[0],i[1]).add(i[0]),c=Qp);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(jp.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=jp),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),hd.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,g),ud.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,g),dd.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(hd.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),ud.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),dd.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(hd.calc(l),ud.calc(l),dd.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new C().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function tm(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function j_(s,t){let e=1-s;return e*e*t}function Q_(s,t){return 2*(1-s)*s*t}function tx(s,t){return s*s*t}function Do(s,t,e,n){return j_(s,t)+Q_(s,e)+tx(s,n)}function ex(s,t){let e=1-s;return e*e*e*t}function nx(s,t){let e=1-s;return 3*e*e*s*t}function ix(s,t){return 3*(1-s)*s*s*t}function sx(s,t){return s*s*s*t}function No(s,t,e,n,i){return ex(s,t)+nx(s,e)+ix(s,n)+sx(s,i)}var Nr=class extends xn{constructor(t=new ot,e=new ot,n=new ot,i=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ot){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(No(t,i.x,r.x,o.x,a.x),No(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ha=class extends xn{constructor(t=new C,e=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new C){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(No(t,i.x,r.x,o.x,a.x),No(t,i.y,r.y,o.y,a.y),No(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ur=class extends xn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ua=class extends xn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fr=class extends xn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Do(t,i.x,r.x,o.x),Do(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Or=class extends xn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Do(t,i.x,r.x,o.x),Do(t,i.y,r.y,o.y),Do(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Br=class extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(tm(a,l.x,c.x,h.x,d.x),tm(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ot().fromArray(i))}return this}},ch=Object.freeze({__proto__:null,ArcCurve:la,CatmullRomCurve3:ca,CubicBezierCurve:Nr,CubicBezierCurve3:ha,EllipseCurve:As,LineCurve:Ur,LineCurve3:ua,QuadraticBezierCurve:Fr,QuadraticBezierCurve3:Or,SplineCurve:Br}),da=class extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ch[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new ch[i.type]().fromJSON(i))}return this}},Zn=class extends da{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ur(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Fr(this.currentPoint.clone(),new ot(t,e),new ot(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new Nr(this.currentPoint.clone(),new ot(t,e),new ot(n,i),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Br(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){let c=new As(t,e,n,i,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ci=class extends Zn{constructor(t){super(t),this.uuid=En(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Zn().fromJSON(i))}return this}};function rx(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Cg(s,0,i,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=hx(s,t,r,e)),s.length>80*e){a=s[0],l=s[1];let h=a,d=l;for(let u=e;u<i;u+=e){let f=s[u],p=s[u+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return fa(r,o,e,a,l,c,0),o}function Cg(s,t,e,n,i){let r;if(i===Mx(s,t,e,n)>0)for(let o=t;o<e;o+=n)r=em(o/n|0,s[o],s[o+1],r);else for(let o=e-n;o>=t;o-=n)r=em(o/n|0,s[o],s[o+1],r);return r&&zr(r,r.next)&&(ma(r),r=r.next),r}function Cs(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(zr(e,e.next)||Ae(e.prev,e,e.next)===0)){if(ma(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fa(s,t,e,n,i,r,o){if(!s)return;!o&&r&&mx(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?ax(s,n,i,r):ox(s)){t.push(l.i,s.i,c.i),ma(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=lx(Cs(s),t),fa(s,t,e,n,i,r,2)):o===2&&cx(s,t,e,n,i,r):fa(Cs(s),t,e,n,i,r,1);break}}}function ox(s){let t=s.prev,e=s,n=s.next;if(Ae(t,e,n)>=0)return!1;let i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(i,r,o),d=Math.min(a,l,c),u=Math.max(i,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&Ro(i,a,r,l,o,c,p.x,p.y)&&Ae(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function ax(s,t,e,n){let i=s.prev,r=s,o=s.next;if(Ae(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,l,c),p=Math.min(h,d,u),_=Math.max(a,l,c),g=Math.max(h,d,u),m=Sd(f,p,t,e,n),v=Sd(_,g,t,e,n),b=s.prevZ,y=s.nextZ;for(;b&&b.z>=m&&y&&y.z<=v;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&Ro(a,h,l,d,c,u,b.x,b.y)&&Ae(b.prev,b,b.next)>=0||(b=b.prevZ,y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Ro(a,h,l,d,c,u,y.x,y.y)&&Ae(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&Ro(a,h,l,d,c,u,b.x,b.y)&&Ae(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;y&&y.z<=v;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Ro(a,h,l,d,c,u,y.x,y.y)&&Ae(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function lx(s,t){let e=s;do{let n=e.prev,i=e.next.next;!zr(n,i)&&Pg(n,e,e.next,i)&&pa(n,i)&&pa(i,n)&&(t.push(n.i,e.i,i.i),ma(e),ma(e.next),e=s=i),e=e.next}while(e!==s);return Cs(e)}function cx(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&xx(o,a)){let l=Ig(o,a);o=Cs(o,o.next),l=Cs(l,l.next),fa(o,t,e,n,i,r,0),fa(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function hx(s,t,e,n){let i=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=Cg(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(_x(c))}i.sort(ux);for(let r=0;r<i.length;r++)e=dx(i[r],e);return e}function ux(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function dx(s,t){let e=fx(s,t);if(!e)return t;let n=Ig(e,s);return Cs(n,n.next),Cs(e,e.next)}function fx(s,t){let e=t,n=s.x,i=s.y,r=-1/0,o;if(zr(s,e))return e;do{if(zr(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Rg(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);pa(e,s)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&px(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function px(s,t){return Ae(s.prev,s,t.prev)<0&&Ae(t.next,s,s.next)<0}function mx(s,t,e,n){let i=s;do i.z===0&&(i.z=Sd(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,gx(i)}function gx(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,e*=2}while(t>1);return s}function Sd(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function _x(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Rg(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function Ro(s,t,e,n,i,r,o,a){return!(s===o&&t===a)&&Rg(s,t,e,n,i,r,o,a)}function xx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!yx(s,t)&&(pa(s,t)&&pa(t,s)&&vx(s,t)&&(Ae(s.prev,s,t.prev)||Ae(s,t.prev,t))||zr(s,t)&&Ae(s.prev,s,s.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function zr(s,t){return s.x===t.x&&s.y===t.y}function Pg(s,t,e,n){let i=Dc(Ae(s,t,e)),r=Dc(Ae(s,t,n)),o=Dc(Ae(e,n,s)),a=Dc(Ae(e,n,t));return!!(i!==r&&o!==a||i===0&&Lc(s,e,t)||r===0&&Lc(s,n,t)||o===0&&Lc(e,s,n)||a===0&&Lc(e,t,n))}function Lc(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Dc(s){return s>0?1:s<0?-1:0}function yx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Pg(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function pa(s,t){return Ae(s.prev,s,s.next)<0?Ae(s,t,s.next)>=0&&Ae(s,s.prev,t)>=0:Ae(s,t,s.prev)<0||Ae(s,s.next,t)<0}function vx(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Ig(s,t){let e=bd(s.i,s.x,s.y),n=bd(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function em(s,t,e,n){let i=bd(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ma(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function bd(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Mx(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Ed=class{static triangulate(t,e,n=2){return rx(t,e,n)}},Ln=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];nm(t),im(n,t);let o=t.length;e.forEach(nm);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,im(n,e[l]);let a=Ed.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function nm(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function im(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var Rs=class s extends Kt{constructor(t=new ci([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Rt(i,3)),this.setAttribute("uv",new Rt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Sx,b,y=!1,w,S,A,x;if(m){b=m.getSpacedPoints(h),y=!0,u=!1;let Z=m.isCatmullRomCurve3?m.closed:!1;w=m.computeFrenetFrames(h,Z),S=new C,A=new C,x=new C}u||(g=0,f=0,p=0,_=0);let T=a.extractPoints(c),P=T.shape,I=T.holes;if(!Ln.isClockWise(P)){P=P.reverse();for(let Z=0,st=I.length;Z<st;Z++){let ht=I[Z];Ln.isClockWise(ht)&&(I[Z]=ht.reverse())}}function z(Z){let ht=10000000000000001e-36,dt=Z[0];for(let mt=1;mt<=Z.length;mt++){let Bt=mt%Z.length,kt=Z[Bt],qt=kt.x-dt.x,Qt=kt.y-dt.y,D=qt*qt+Qt*Qt,he=Math.max(Math.abs(kt.x),Math.abs(kt.y),Math.abs(dt.x),Math.abs(dt.y)),re=ht*he*he;if(D<=re){Z.splice(Bt,1),mt--;continue}dt=kt}}z(P),I.forEach(z);let L=I.length,O=P;for(let Z=0;Z<L;Z++){let st=I[Z];P=P.concat(st)}function W(Z,st,ht){return st||Ot("ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(st,ht)}let B=P.length;function nt(Z,st,ht){let dt,mt,Bt,kt=Z.x-st.x,qt=Z.y-st.y,Qt=ht.x-Z.x,D=ht.y-Z.y,he=kt*kt+qt*qt,re=kt*D-qt*Qt;if(Math.abs(re)>Number.EPSILON){let R=Math.sqrt(he),M=Math.sqrt(Qt*Qt+D*D),k=st.x-qt/R,G=st.y+kt/R,K=ht.x-D/M,ft=ht.y+Qt/M,gt=((K-k)*D-(ft-G)*Qt)/(kt*D-qt*Qt);dt=k+kt*gt-Z.x,mt=G+qt*gt-Z.y;let j=dt*dt+mt*mt;if(j<=2)return new ot(dt,mt);Bt=Math.sqrt(j/2)}else{let R=!1;kt>Number.EPSILON?Qt>Number.EPSILON&&(R=!0):kt<-Number.EPSILON?Qt<-Number.EPSILON&&(R=!0):Math.sign(qt)===Math.sign(D)&&(R=!0),R?(dt=-qt,mt=kt,Bt=Math.sqrt(he)):(dt=kt,mt=qt,Bt=Math.sqrt(he/2))}return new ot(dt/Bt,mt/Bt)}let Y=[];for(let Z=0,st=O.length,ht=st-1,dt=Z+1;Z<st;Z++,ht++,dt++)ht===st&&(ht=0),dt===st&&(dt=0),Y[Z]=nt(O[Z],O[ht],O[dt]);let tt=[],it,Lt=Y.concat();for(let Z=0,st=L;Z<st;Z++){let ht=I[Z];it=[];for(let dt=0,mt=ht.length,Bt=mt-1,kt=dt+1;dt<mt;dt++,Bt++,kt++)Bt===mt&&(Bt=0),kt===mt&&(kt=0),it[dt]=nt(ht[dt],ht[Bt],ht[kt]);tt.push(it),Lt=Lt.concat(it)}let pt;if(g===0)pt=Ln.triangulateShape(O,I);else{let Z=[],st=[];for(let ht=0;ht<g;ht++){let dt=ht/g,mt=f*Math.cos(dt*Math.PI/2),Bt=p*Math.sin(dt*Math.PI/2)+_;for(let kt=0,qt=O.length;kt<qt;kt++){let Qt=W(O[kt],Y[kt],Bt);xt(Qt.x,Qt.y,-mt),dt===0&&Z.push(Qt)}for(let kt=0,qt=L;kt<qt;kt++){let Qt=I[kt];it=tt[kt];let D=[];for(let he=0,re=Qt.length;he<re;he++){let R=W(Qt[he],it[he],Bt);xt(R.x,R.y,-mt),dt===0&&D.push(R)}dt===0&&st.push(D)}}pt=Ln.triangulateShape(Z,st)}let $t=pt.length,Jt=p+_;for(let Z=0;Z<B;Z++){let st=u?W(P[Z],Lt[Z],Jt):P[Z];y?(A.copy(w.normals[0]).multiplyScalar(st.x),S.copy(w.binormals[0]).multiplyScalar(st.y),x.copy(b[0]).add(A).add(S),xt(x.x,x.y,x.z)):xt(st.x,st.y,0)}for(let Z=1;Z<=h;Z++)for(let st=0;st<B;st++){let ht=u?W(P[st],Lt[st],Jt):P[st];y?(A.copy(w.normals[Z]).multiplyScalar(ht.x),S.copy(w.binormals[Z]).multiplyScalar(ht.y),x.copy(b[Z]).add(A).add(S),xt(x.x,x.y,x.z)):xt(ht.x,ht.y,d/h*Z)}for(let Z=g-1;Z>=0;Z--){let st=Z/g,ht=f*Math.cos(st*Math.PI/2),dt=p*Math.sin(st*Math.PI/2)+_;for(let mt=0,Bt=O.length;mt<Bt;mt++){let kt=W(O[mt],Y[mt],dt);xt(kt.x,kt.y,d+ht)}for(let mt=0,Bt=I.length;mt<Bt;mt++){let kt=I[mt];it=tt[mt];for(let qt=0,Qt=kt.length;qt<Qt;qt++){let D=W(kt[qt],it[qt],dt);y?xt(D.x,D.y+b[h-1].y,b[h-1].x+ht):xt(D.x,D.y,d+ht)}}}jt(),J();function jt(){let Z=i.length/3;if(u){let st=0,ht=B*st;for(let dt=0;dt<$t;dt++){let mt=pt[dt];Q(mt[2]+ht,mt[1]+ht,mt[0]+ht)}st=h+g*2,ht=B*st;for(let dt=0;dt<$t;dt++){let mt=pt[dt];Q(mt[0]+ht,mt[1]+ht,mt[2]+ht)}}else{for(let st=0;st<$t;st++){let ht=pt[st];Q(ht[2],ht[1],ht[0])}for(let st=0;st<$t;st++){let ht=pt[st];Q(ht[0]+B*h,ht[1]+B*h,ht[2]+B*h)}}n.addGroup(Z,i.length/3-Z,0)}function J(){let Z=i.length/3,st=0;et(O,st),st+=O.length;for(let ht=0,dt=I.length;ht<dt;ht++){let mt=I[ht];et(mt,st),st+=mt.length}n.addGroup(Z,i.length/3-Z,1)}function et(Z,st){let ht=Z.length;for(;--ht>=0;){let dt=ht,mt=ht-1;mt<0&&(mt=Z.length-1);for(let Bt=0,kt=h+g*2;Bt<kt;Bt++){let qt=B*Bt,Qt=B*(Bt+1),D=st+dt+qt,he=st+mt+qt,re=st+mt+Qt,R=st+dt+Qt;$(D,he,re,R)}}}function xt(Z,st,ht){l.push(Z),l.push(st),l.push(ht)}function Q(Z,st,ht){ut(Z),ut(st),ut(ht);let dt=i.length/3,mt=v.generateTopUV(n,i,dt-3,dt-2,dt-1);Ut(mt[0]),Ut(mt[1]),Ut(mt[2])}function $(Z,st,ht,dt){ut(Z),ut(st),ut(dt),ut(st),ut(ht),ut(dt);let mt=i.length/3,Bt=v.generateSideWallUV(n,i,mt-6,mt-3,mt-2,mt-1);Ut(Bt[0]),Ut(Bt[1]),Ut(Bt[3]),Ut(Bt[1]),Ut(Bt[2]),Ut(Bt[3])}function ut(Z){i.push(l[Z*3+0]),i.push(l[Z*3+1]),i.push(l[Z*3+2])}function Ut(Z){r.push(Z.x),r.push(Z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return bx(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ch[i.type]().fromJSON(i)),new s(n,t.options)}},Sx={generateTopUV:function(s,t,e,n,i){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new ot(r,o),new ot(a,l),new ot(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],p=t[i*3+2],_=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ot(o,1-l),new ot(c,1-d),new ot(u,1-p),new ot(_,1-m)]:[new ot(a,1-l),new ot(h,1-d),new ot(f,1-p),new ot(g,1-m)]}};function bx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ga=class s extends Ti{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},_a=class s extends Kt{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Xt(i,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,d=new C,u=new ot,f=new C,p=new C,_=new C,g=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=e;v++){let b=n+v*h*i,y=Math.sin(b),w=Math.cos(b);for(let S=0;S<=t.length-1;S++){d.x=t[S].x*y,d.y=t[S].y,d.z=t[S].x*w,o.push(d.x,d.y,d.z),u.x=v/e,u.y=S/(t.length-1),a.push(u.x,u.y);let A=l[3*S+0]*y,x=l[3*S+1],T=l[3*S+0]*w;c.push(A,x,T)}}for(let v=0;v<e;v++)for(let b=0;b<t.length-1;b++){let y=b+v*t.length,w=y,S=y+t.length,A=y+t.length+1,x=y+1;r.push(w,S,x),r.push(A,x,S)}this.setIndex(r),this.setAttribute("position",new Rt(o,3)),this.setAttribute("uv",new Rt(a,2)),this.setAttribute("normal",new Rt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},kr=class s extends Ti{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},Ai=class s extends Kt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let v=m*u-o;for(let b=0;b<c;b++){let y=b*d-r;p.push(y,-v,0),_.push(0,0,1),g.push(b/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){let b=v+c*m,y=v+c*(m+1),w=v+1+c*(m+1),S=v+1+c*m;f.push(b,y,S),f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new Rt(p,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Ps=class s extends Kt{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],d=t,u=(e-t)/i,f=new C,p=new ot;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let m=r+g/n*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}d+=u}for(let _=0;_<i;_++){let g=_*(n+1);for(let m=0;m<n;m++){let v=m+g,b=v,y=v+n+1,w=v+n+2,S=v+1;a.push(b,y,S),a.push(y,w,S)}}this.setIndex(a),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},xa=class s extends Kt{constructor(t=new ci([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Rt(i,3)),this.setAttribute("normal",new Rt(r,3)),this.setAttribute("uv",new Rt(o,2));function c(h){let d=i.length/3,u=h.extractPoints(e),f=u.shape,p=u.holes;Ln.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let v=p[g];Ln.isClockWise(v)===!0&&(p[g]=v.reverse())}let _=Ln.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){let v=f[g];i.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){let v=_[g],b=v[0]+d,y=v[1]+d,w=v[2]+d;n.push(b,y,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Ex(e,t)}static fromJSON(t,e){let n=[];for(let i=0,r=t.shapes.length;i<r;i++){let o=e[t.shapes[i]];n.push(o)}return new s(n,t.curveSegments)}};function Ex(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){let i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}var Ji=class s extends Kt{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new C,u=new C,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){let v=[],b=m/n,y=o+b*a,w=t*Math.cos(y),S=Math.sqrt(t*t-w*w),A=0;m===0&&o===0?A=.5/e:m===n&&l===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){let T=x/e,P=i+T*r;d.x=-S*Math.cos(P),d.y=w,d.z=S*Math.sin(P),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(T+A,1-b),v.push(c++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){let b=h[m][v+1],y=h[m][v],w=h[m+1][v],S=h[m+1][v+1];(m!==0||o>0)&&f.push(b,y,S),(m!==n-1||l<Math.PI)&&f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new Rt(p,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ya=class s extends Ti{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},va=class s extends Kt{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],d=[],u=new C,f=new C,p=new C;for(let _=0;_<=n;_++){let g=o+_/n*a;for(let m=0;m<=i;m++){let v=m/i*r;f.x=(t+e*Math.cos(g))*Math.cos(v),f.y=(t+e*Math.cos(g))*Math.sin(v),f.z=e*Math.sin(g),c.push(f.x,f.y,f.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/i),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){let m=(i+1)*_+g-1,v=(i+1)*(_-1)+g-1,b=(i+1)*(_-1)+g,y=(i+1)*_+g;l.push(m,v,y),l.push(v,b,y)}this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Ma=class s extends Kt{constructor(t=1,e=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);let a=[],l=[],c=[],h=[],d=new C,u=new C,f=new C,p=new C,_=new C,g=new C,m=new C;for(let b=0;b<=n;++b){let y=b/n*r*Math.PI*2;v(y,r,o,t,f),v(y+.01,r,o,t,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let w=0;w<=i;++w){let S=w/i*Math.PI*2,A=-e*Math.cos(S),x=e*Math.sin(S);d.x=f.x+(A*m.x+x*_.x),d.y=f.y+(A*m.y+x*_.y),d.z=f.z+(A*m.z+x*_.z),l.push(d.x,d.y,d.z),u.subVectors(d,f).normalize(),c.push(u.x,u.y,u.z),h.push(b/n),h.push(w/i)}}for(let b=1;b<=n;b++)for(let y=1;y<=i;y++){let w=(i+1)*(b-1)+(y-1),S=(i+1)*b+(y-1),A=(i+1)*b+y,x=(i+1)*(b-1)+y;a.push(w,S,x),a.push(S,A,x)}this.setIndex(a),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(h,2));function v(b,y,w,S,A){let x=Math.cos(b),T=Math.sin(b),P=w/y*b,I=Math.cos(P);A.x=S*(2+I)*.5*x,A.y=S*(2+I)*T*.5,A.z=S*Math.sin(P)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}},Sa=class s extends Kt{constructor(t=new Or(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new C,l=new C,c=new ot,h=new C,d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Rt(d,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(f,2));function _(){for(let b=0;b<e;b++)g(b);g(r===!1?e:0),v(),m()}function g(b){h=t.getPointAt(b/e,h);let y=o.normals[b],w=o.binormals[b];for(let S=0;S<=i;S++){let A=S/i*Math.PI*2,x=Math.sin(A),T=-Math.cos(A);l.x=T*y.x+x*w.x,l.y=T*y.y+x*w.y,l.z=T*y.z+x*w.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function m(){for(let b=1;b<=e;b++)for(let y=1;y<=i;y++){let w=(i+1)*(b-1)+(y-1),S=(i+1)*b+(y-1),A=(i+1)*b+y,x=(i+1)*(b-1)+y;p.push(w,S,x),p.push(S,A,x)}}function v(){for(let b=0;b<=e;b++)for(let y=0;y<=i;y++)c.x=b/e,c.y=y/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new s(new ch[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},ba=class extends Kt{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],n=new Set,i=new C,r=new C;if(t.index!==null){let o=t.attributes.position,a=t.index,l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start,f=d.count;for(let p=u,_=u+f;p<_;p+=3)for(let g=0;g<3;g++){let m=a.getX(p+g),v=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),r.fromBufferAttribute(o,v),sm(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}}else{let o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){let h=3*a+c,d=3*a+(c+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,d),sm(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Rt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};function sm(s,t,e){let n=`${s.x},${s.y},${s.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${s.x},${s.y},${s.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}var rm=Object.freeze({__proto__:null,BoxGeometry:li,CapsuleGeometry:sa,CircleGeometry:ra,ConeGeometry:Dr,CylinderGeometry:Lr,DodecahedronGeometry:oa,EdgesGeometry:aa,ExtrudeGeometry:Rs,IcosahedronGeometry:ga,LatheGeometry:_a,OctahedronGeometry:kr,PlaneGeometry:Ai,PolyhedronGeometry:Ti,RingGeometry:Ps,ShapeGeometry:xa,SphereGeometry:Ji,TetrahedronGeometry:ya,TorusGeometry:va,TorusKnotGeometry:Ma,TubeGeometry:Sa,WireframeGeometry:ba}),Ea=class extends Oe{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Tt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function Gs(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(om(i))i.isRenderTargetTexture?(_t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(om(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function nn(s){let t={};for(let e=0;e<s.length;e++){let n=Gs(s[e]);for(let i in n)t[i]=n[i]}return t}function om(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function wx(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function yf(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var vf={clone:Gs,merge:nn},Tx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ax=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,cn=class extends Oe{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tx,this.fragmentShader=Ax,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gs(t.uniforms),this.uniformsGroups=wx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new Tt().setHex(i.value);break;case"v2":this.uniforms[n].value=new ot().fromArray(i.value);break;case"v3":this.uniforms[n].value=new C().fromArray(i.value);break;case"v4":this.uniforms[n].value=new me().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Zt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Yt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Vr=class extends cn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Tn=class extends Oe{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=di,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},wa=class extends Tn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Tt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Tt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Tt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},Ta=class extends Oe{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Tt(16777215),this.specular=new Tt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=di,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Qr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Aa=class extends Oe{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Tt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=di,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ca=class extends Oe{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=di,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}},Ra=class extends Oe{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=di,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Qr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Hr=class extends Oe{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=af,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Gr=class extends Oe{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Pa=class extends Oe{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Tt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=di,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ia=class extends We{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function Hn(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Uo(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function Lg(s){function t(i,r){return s[i]-s[r]}let e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function wd(s,t,e){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let l=0;l!==t;++l)i[o++]=s[a+l]}return i}function Dg(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=s[i++];while(r!==void 0)}function Cx(s,t,e,n,i=30){let r=s.clone();r.name=t;let o=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),d=[],u=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*i;if(!(p<e||p>=n)){d.push(c.times[f]);for(let _=0;_<h;++_)u.push(c.values[f*h+_])}}d.length!==0&&(c.times=Hn(d,c.times.constructor),c.values=Hn(u,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function Rx(s,t=0,e=s,n=30){n<=0&&(n=30);let i=e.tracks.length,r=t/n;for(let o=0;o<i;++o){let a=e.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;let c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0,d=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);let p=a.times.length-1,_;if(r<=a.times[0]){let m=h,v=d-h;_=a.values.slice(m,v)}else if(r>=a.times[p]){let m=p*d+h,v=m+d-h;_=a.values.slice(m,v)}else{let m=a.createInterpolant(),v=h,b=d-h;m.evaluate(r),_=m.resultBuffer.slice(v,b)}l==="quaternion"&&new De().fromArray(_).normalize().conjugate().toArray(_);let g=c.times.length;for(let m=0;m<g;++m){let v=m*f+u;if(l==="quaternion")De.multiplyQuaternionsFlat(c.values,v,_,0,c.values,v);else{let b=f-u*2;for(let y=0;y<b;++y)c.values[v+y]-=_[y]}}}return s.blendMode=gu,s}var hh=class{static convertArray(t,e){return Hn(t,e)}static isTypedArray(t){return vg(t)}static hasTangents(t){return Uo(t)}static getKeyframeOrder(t){return Lg(t)}static sortedArray(t,e,n){return wd(t,e,n)}static flattenJSON(t,e,n,i){Dg(t,e,n,i)}static subclip(t,e,n,i,r=30){return Cx(t,e,n,i,r)}static makeClipAdditive(t,e=0,n=t,i=30){return Rx(t,e,n,i)}},Ci=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},La=class extends Ci{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wi,endingEnd:Wi}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xi:r=t,a=2*e-n;break;case vr:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Xi:o=t,l=2*n-e;break;case vr:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,v=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,b=(-1-f)*g+(1.5+f)*_+.5*p,y=f*g-f*_;for(let w=0;w!==a;++w)r[w]=m*o[h+w]+v*o[c+w]+b*o[l+w]+y*o[d+w];return r}},Wr=class extends Ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Da=class extends Ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Na=class extends Ci{interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-e)/(i-e),_=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*_+o[l+g]*p;return r}let u=a*2,f=t-1;for(let p=0;p!==a;++p){let _=o[c+p],g=o[l+p],m=f*u+p*2,v=d[m],b=d[m+1],y=t*u+p*2,w=h[y],S=h[y+1],A=Ix(n,e,v,w,i);r[p]=Ng(A,_,b,S,g)}return r}};function Ng(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function Px(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function Ix(s,t,e,n,i){let r=(s-t)/(i-t);for(let o=0;o<8;o++){let a=Ng(r,t,e,n,i)-s;if(Math.abs(a)<1e-10)break;let l=Px(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var hn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Hn(e,this.TimeBufferType),this.values=Hn(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Hn(t.times,Array),values:Hn(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Uo(t.settings)&&(n.settings={inTangents:Hn(t.settings.inTangents,Array),outTangents:Hn(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Da(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Wr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new La(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Na(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case yr:e=this.InterpolantFactoryMethodDiscrete;break;case Go:e=this.InterpolantFactoryMethodLinear;break;case Po:e=this.InterpolantFactoryMethodSmooth;break;case Wc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return _t("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return yr;case this.InterpolantFactoryMethodLinear:return Go;case this.InterpolantFactoryMethodSmooth:return Po;case this.InterpolantFactoryMethodBezier:return Wc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Uo(this.settings)&&(am(this.settings.inTangents,t),am(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Ot("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Ot("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&vg(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){Ot("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Po,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=e[d+p];if(_!==e[u+p]||_!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Uo(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function am(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}hn.prototype.ValueTypeName="";hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=Go;var hi=class extends hn{constructor(t,e,n){super(t,e,n)}};hi.prototype.ValueTypeName="bool";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=yr;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}};Xr.prototype.ValueTypeName="color";var Is=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}};Is.prototype.ValueTypeName="number";var Ua=class extends Ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)De.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ls=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Ua(this.times,this.values,this.getValueSize(),t)}};Ls.prototype.ValueTypeName="quaternion";Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var ui=class extends hn{constructor(t,e,n){super(t,e,n)}};ui.prototype.ValueTypeName="string";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=yr;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var qr=class extends hn{constructor(t,e,n,i){super(t,e,n,i)}};qr.prototype.ValueTypeName="vector";var Ki=class{constructor(t="",e=-1,n=[],i=Nl){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=En(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(Dx(n[o]).scale(i));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(hn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=Lg(l);l=wd(l,1,h),c=wd(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Is(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=i[d];u||(i[d]=u=[]),u.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};function Lx(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Is;case"vector":case"vector2":case"vector3":case"vector4":return qr;case"color":return Xr;case"quaternion":return Ls;case"bool":case"boolean":return hi;case"string":return ui}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Dx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=Lx(s.type);if(s.times===void 0){let n=[],i=[];Dg(s.keys,n,i,"value"),s.times=n,s.values=i}let e;return t.parse!==void 0?e=t.parse(s):e=new t(s.name,s.times,s.values,s.interpolation),Uo(s.settings)&&(e.settings={inTangents:Hn(s.settings.inTangents,Float32Array),outTangents:Hn(s.settings.outTangents,Float32Array)}),e}var Wn={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(lm(s)||(this.files[s]=t))},get:function(s){if(this.enabled!==!1&&!lm(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function lm(s){try{let t=s.slice(s.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Yr=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Mf=new Yr,Ye=class{constructor(t){this.manager=t!==void 0?t:Mf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ye.DEFAULT_MATERIAL_NAME="__DEFAULT";var Mi={},Td=class extends Error{constructor(t,e){super(t),this.response=e}},Nn=class extends Ye{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=Wn.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(Mi[t]!==void 0){Mi[t].push({onLoad:e,onProgress:n,onError:i});return}Mi[t]=[],Mi[t].push({onLoad:e,onProgress:n,onError:i});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&_t("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Mi[t],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0,_=0,g=new ReadableStream({start(m){v();function v(){d.read().then(({done:b,value:y})=>{if(b)m.close();else{_+=y.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let S=0,A=h.length;S<A;S++){let x=h[S];x.onProgress&&x.onProgress(w)}m.enqueue(y),v()}},b=>{m.error(b)})}}});return new Response(g)}else throw new Td(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Wn.add(`file:${t}`,c);let h=Mi[t];delete Mi[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Mi[t];if(h===void 0)throw this.manager.itemError(t),c;delete Mi[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},uh=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=this,o=new Nn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(l){i?i(l):Ot(l),r.manager.itemError(t)}},n,i)}parse(t){let e=[];for(let n=0;n<t.length;n++){let i=Ki.parse(t[n]);e.push(i)}return e}},dh=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=this,o=[],a=new Ts,l=new Nn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(d){l.load(t[d],function(u){let f=r.parse(u,!0);o[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=be),a.image=o,a.format=f.format,a.needsUpdate=!0,e&&e(a))},n,i)}if(Array.isArray(t))for(let d=0,u=t.length;d<u;++d)h(d);else l.load(t,function(d){let u=r.parse(d,!0);if(u.isCubemap){let f=u.mipmaps.length/u.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<u.mipmapCount;_++)o[p].mipmaps.push(u.mipmaps[p*u.mipmapCount+_]),o[p].format=u.format,o[p].width=u.width,o[p].height=u.height}a.image=o}else a.image.width=u.width,a.image.height=u.height,a.mipmaps=u.mipmaps;u.mipmapCount===1&&(a.minFilter=be),a.format=u.format,a.needsUpdate=!0,e&&e(a)},n,i);return a}},hr=new WeakMap,ji=class extends Ye{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Wn.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let d=hr.get(o);d===void 0&&(d=[],hr.set(o,d)),d.push({onLoad:e,onError:i})}return o}let a=br("img");function l(){h(),e&&e(this);let d=hr.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}hr.delete(this),r.manager.itemEnd(t)}function c(d){h(),i&&i(d),Wn.remove(`image:${t}`);let u=hr.get(this)||[];for(let f=0;f<u.length;f++){let p=u[f];p.onError&&p.onError(d)}hr.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Wn.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}},fh=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=new $i;r.colorSpace=Ge;let o=new ji(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(t[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,e&&e(r))},void 0,i)}for(let c=0;c<t.length;++c)l(c);return r}},ph=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=this,o=new ln,a=new Nn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,function(l){let c;try{c=r.parse(l)}catch(h){i!==void 0?i(h):Ot(h);return}r._applyTexData(o,c),e&&e(o,c)},n,i),o}createDataTexture(t){let e=new ln;return this._applyTexData(e,this.parse(t)),e}_applyTexData(t,e){e.image!==void 0?t.image=e.image:e.data!==void 0&&(t.image.width=e.width,t.image.height=e.height,t.image.data=e.data),t.wrapS=e.wrapS!==void 0?e.wrapS:an,t.wrapT=e.wrapT!==void 0?e.wrapT:an,t.magFilter=e.magFilter!==void 0?e.magFilter:be,t.minFilter=e.minFilter!==void 0?e.minFilter:be,t.anisotropy=e.anisotropy!==void 0?e.anisotropy:1,e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.mipmaps!==void 0&&(t.mipmaps=e.mipmaps,t.minFilter=jn),e.mipmapCount===1&&(t.minFilter=be),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),t.needsUpdate=!0}},mh=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=new Te,o=new ji(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}},$n=class extends le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Fa=class extends $n{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Tt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},fd=new Yt,cm=new C,hm=new C,Ds=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new Yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ai,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;cm.setFromMatrixPosition(t.matrixWorld),e.position.copy(cm),hm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hm),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){fd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(fd,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===qi||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(fd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Nc=new C,Uc=new De,ri=new C,Ns=class extends le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Nc,Uc,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nc,Uc,ri.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Nc,Uc,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Nc,Uc,ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Hi=new C,um=new ot,dm=new ot,Re=class extends Ns{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ys*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(_s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(_s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z)}getViewSize(t,e){return this.getViewBounds(t,um,dm),e.subVectors(dm,um)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(_s*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ad=class extends Ds{constructor(){super(new Re(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=ys*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},Oa=class extends $n{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.target=new le,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ad}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},Cd=class extends Ds{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0}},Ba=class extends $n{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Cd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Qi=class extends Ns{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Rd=class extends Ds{constructor(){super(new Qi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ts=class extends $n{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.target=new le,this.shadow=new Rd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Us=class extends $n{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}},za=class extends $n{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){let e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}},Zr=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new C)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){let n=t.x,i=t.y,r=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.282095),e.addScaledVector(o[1],.488603*i),e.addScaledVector(o[2],.488603*r),e.addScaledVector(o[3],.488603*n),e.addScaledVector(o[4],1.092548*(n*i)),e.addScaledVector(o[5],1.092548*(i*r)),e.addScaledVector(o[6],.315392*(3*r*r-1)),e.addScaledVector(o[7],1.092548*(n*r)),e.addScaledVector(o[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){let n=t.x,i=t.y,r=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.886227),e.addScaledVector(o[1],2*.511664*i),e.addScaledVector(o[2],2*.511664*r),e.addScaledVector(o[3],2*.511664*n),e.addScaledVector(o[4],2*.429043*n*i),e.addScaledVector(o[5],2*.429043*i*r),e.addScaledVector(o[6],.743125*r*r-.247708),e.addScaledVector(o[7],2*.429043*n*r),e.addScaledVector(o[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){let n=t.x,i=t.y,r=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*r,e[3]=.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*r,e[6]=.315392*(3*r*r-1),e[7]=1.092548*n*r,e[8]=.546274*(n*n-i*i)}},ka=class extends $n{constructor(t=new Zr,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}toJSON(t){let e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}},fm={},Va=class s extends Ye{constructor(t){super(t),this.textures={}}load(t,e,n,i){let r=this,o=new Nn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(l){i?i(l):Ot(l),r.manager.itemError(t)}},n,i)}parse(t){let e=this.createMaterialFromType(t.type);return e.fromJSON(t,this.textures),e}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return s.createMaterialFromType(t)}static createMaterialFromType(t){let n={ShadowMaterial:Ea,SpriteMaterial:Cr,RawShaderMaterial:Vr,ShaderMaterial:cn,PointsMaterial:Pr,MeshPhysicalMaterial:wa,MeshStandardMaterial:Tn,MeshPhongMaterial:Ta,MeshToonMaterial:Aa,MeshNormalMaterial:Ca,MeshLambertMaterial:Ra,MeshDepthMaterial:Hr,MeshDistanceMaterial:Gr,MeshBasicMaterial:_n,MeshMatcapMaterial:Pa,LineDashedMaterial:Ia,LineBasicMaterial:We,Material:Oe,...fm}[t],i;return n===void 0?(oi(`MaterialLoader: Unknown material type "${t}". Use .registerMaterial() before starting the deserialization process.`),i=new Oe):i=new n,i}static registerMaterial(t,e){fm[t]=e}},$r=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Ha=class extends Kt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}},Ga=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=this,o=new Nn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(l){i?i(l):Ot(l),r.manager.itemError(t)}},n,i)}parse(t){let e={},n={};function i(f,p){if(e[p]!==void 0)return e[p];let g=f.interleavedBuffers[p],m=r(f,g.buffer),v=mr(g.type,m),b=new ws(v,g.stride);return b.uuid=g.uuid,g.usage!==void 0&&b.setUsage(g.usage),e[p]=b,b}function r(f,p){if(n[p]!==void 0)return n[p];let g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}let o=t.isInstancedBufferGeometry?new Ha:new Kt,a=t.data.index;if(a!==void 0){let f=mr(a.type,a.array);o.setIndex(new pe(f,1))}let l=t.data.attributes;for(let f in l){let p=l[f],_;if(p.isInterleavedBufferAttribute){let g=i(t.data,p.data);_=new Zi(g,p.itemSize,p.offset,p.normalized)}else{let g=mr(p.type,p.array),m=p.isInstancedBufferAttribute?Ei:pe;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),p.gpuType!==void 0&&(_.gpuType=p.gpuType),o.setAttribute(f,_)}let c=t.data.morphAttributes;if(c)for(let f in c){let p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){let v=p[g],b;if(v.isInterleavedBufferAttribute){let y=i(t.data,v.data);b=new Zi(y,v.itemSize,v.offset,v.normalized)}else{let y=mr(v.type,v.array);b=new pe(y,v.itemSize,v.normalized)}v.name!==void 0&&(b.name=v.name),v.usage!==void 0&&b.setUsage(v.usage),v.gpuType!==void 0&&(b.gpuType=v.gpuType),_.push(b)}o.morphAttributes[f]=_}t.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);let d=t.data.groups||t.data.drawcalls||t.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){let _=d[f];o.addGroup(_.start,_.count,_.materialIndex)}let u=t.data.boundingSphere;return u!==void 0&&(o.boundingSphere=new Fe().fromJSON(u)),t.name&&(o.name=t.name),t.userData&&(o.userData=t.userData),o}},pd={},gh=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=this,o=this.path===""?$r.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||o;let a=new Nn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),Ot("ObjectLoader: Can't parse "+t+".",d.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+t)),Ot("ObjectLoader: Can't load "+t);return}r.parse(c,e)},n,i)}async loadAsync(t,e){let n=this,i=this.path===""?$r.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;let r=new Nn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let o=await r.loadAsync(t,e),a;try{a=JSON.parse(o)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+t+". "+c.message)}let l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(a)}parse(t,e){let n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),r=this.parseGeometries(t.geometries,i),o=this.parseImages(t.images,function(){e!==void 0&&e(c)}),a=this.parseTextures(t.textures,o),l=this.parseMaterials(t.materials,a),c=this.parseObject(t.object,r,l,a,n),h=this.parseSkeletons(t.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),e!==void 0){let d=!1;for(let u in o)if(o[u].data instanceof HTMLImageElement){d=!0;break}d===!1&&e(c)}return c}async parseAsync(t){let e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),r=await this.parseImagesAsync(t.images),o=this.parseTextures(t.textures,r),a=this.parseMaterials(t.materials,o),l=this.parseObject(t.object,i,a,o,e),c=this.parseSkeletons(t.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(t,e){pd[t]=e}parseShapes(t){let e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){let r=new ci().fromJSON(t[n]);e[r.uuid]=r}return e}parseSkeletons(t,e){let n={},i={};if(e.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),t!==void 0)for(let r=0,o=t.length;r<o;r++){let a=new Jo().fromJSON(t[r],i);n[a.uuid]=a}return n}parseGeometries(t,e){let n={};if(t!==void 0){let i=new Ga;for(let r=0,o=t.length;r<o;r++){let a,l=t[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in rm?a=rm[l.type].fromJSON(l,e):l.type in pd?a=pd[l.type].fromJSON(l,e):_t(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(t,e){let n={},i={};if(t!==void 0){let r=new Va;r.setTextures(e);for(let o=0,a=t.length;o<a;o++){let l=t[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(t){let e={};if(t!==void 0)for(let n=0;n<t.length;n++){let i=t[n],r=Ki.parse(i);e[r.uuid]=r}return e}parseImages(t,e){let n=this,i={},r;function o(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:mr(l.type,l.data),width:l.width,height:l.height}:null}if(t!==void 0&&t.length>0){let l=new Yr(e);r=new ji(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=t.length;c<h;c++){let d=t[c],u=d.url;if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new ln(m.data,m.width,m.height)))}i[d.uuid]=new In(f)}else{let f=a(d.url);i[d.uuid]=new In(f)}}}return i}async parseImagesAsync(t){let e=this,n={},i;async function r(o){if(typeof o=="string"){let a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:e.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:mr(o.type,o.data),width:o.width,height:o.height}:null}if(t!==void 0&&t.length>0){i=new ji(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=t.length;o<a;o++){let l=t[o],c=l.url;if(Array.isArray(c)){let h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new ln(p.data,p.width,p.height)))}n[l.uuid]=new In(h)}else{let h=await r(l.url);n[l.uuid]=new In(h)}}}return n}parseTextures(t,e){function n(r,o){return typeof r=="number"?r:(_t("ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}let i={};if(t!==void 0)for(let r=0,o=t.length;r<o;r++){let a=t[r];a.image===void 0&&_t('ObjectLoader: No "image" specified for',a.uuid),e[a.image]===void 0&&_t("ObjectLoader: Undefined image",a.image);let l=e[a.image],c=l.data,h;Array.isArray(c)?(h=new $i,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new ln:h=new Te,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,Nx)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],pm),h.wrapT=n(a.wrap[1],pm)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,mm)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,mm)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.normalized!==void 0&&(h.normalized=a.normalized),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(t,e,n,i,r){let o;function a(u){return e[u]===void 0&&_t("ObjectLoader: Undefined geometry",u),e[u]}function l(u){if(u!==void 0){if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p];n[g]===void 0&&_t("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[u]===void 0&&_t("ObjectLoader: Undefined material",u),n[u]}}function c(u){return i[u]===void 0&&_t("ObjectLoader: Undefined texture",u),i[u]}let h,d;switch(t.type){case"Scene":o=new Es,t.background!==void 0&&(Number.isInteger(t.background)?o.background=new Tt(t.background):o.background=c(t.background)),t.environment!==void 0&&(o.environment=c(t.environment)),t.fog!==void 0&&(t.fog.type==="Fog"?o.fog=new qo(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(o.fog=new Xo(t.fog.color,t.fog.density)),t.fog.name!==""&&(o.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&(o.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(o.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&o.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":o=new Re(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(o.focus=t.focus),t.zoom!==void 0&&(o.zoom=t.zoom),t.filmGauge!==void 0&&(o.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(o.filmOffset=t.filmOffset),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"OrthographicCamera":o=new Qi(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(o.zoom=t.zoom),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"AmbientLight":o=new Us(t.color,t.intensity);break;case"DirectionalLight":o=new ts(t.color,t.intensity),o.target=t.target||"";break;case"PointLight":o=new Ba(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":o=new za(t.color,t.intensity,t.width,t.height);break;case"SpotLight":o=new Oa(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),o.target=t.target||"";break;case"HemisphereLight":o=new Fa(t.color,t.groundColor,t.intensity);break;case"LightProbe":let u=new Zr().fromArray(t.sh);o=new ka(u,t.intensity);break;case"SkinnedMesh":h=a(t.geometry),d=l(t.material),o=new $o(h,d),t.bindMode!==void 0&&(o.bindMode=t.bindMode),t.bindMatrix!==void 0&&o.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(o.skeleton=t.skeleton);break;case"Mesh":h=a(t.geometry),d=l(t.material),o=new ge(h,d);break;case"InstancedMesh":h=a(t.geometry),d=l(t.material);let f=t.count,p=t.instanceMatrix,_=t.instanceColor;o=new Ko(h,d,f),o.instanceMatrix=new Ei(new Float32Array(p.array),16),_!==void 0&&(o.instanceColor=new Ei(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":h=a(t.geometry),d=l(t.material),o=new Qo(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,d),o.geometry=h,o.perObjectFrustumCulled=t.perObjectFrustumCulled,o.sortObjects=t.sortObjects,o._drawRanges=t.drawRanges,o._reservedRanges=t.reservedRanges,o._geometryInfo=t.geometryInfo.map(g=>{let m=null,v=null;return g.boundingBox!==void 0&&(m=new Be().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(v=new Fe().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:v}}),o._instanceInfo=t.instanceInfo,o._availableInstanceIds=t._availableInstanceIds,o._availableGeometryIds=t._availableGeometryIds,o._nextIndexStart=t.nextIndexStart,o._nextVertexStart=t.nextVertexStart,o._geometryCount=t.geometryCount,o._maxInstanceCount=t.maxInstanceCount,o._maxVertexCount=t.maxVertexCount,o._maxIndexCount=t.maxIndexCount,o._geometryInitialized=t.geometryInitialized,o._matricesTexture=c(t.matricesTexture.uuid),o._indirectTexture=c(t.indirectTexture.uuid),t.colorsTexture!==void 0&&(o._colorsTexture=c(t.colorsTexture.uuid)),t.boundingSphere!==void 0&&(o.boundingSphere=new Fe().fromJSON(t.boundingSphere)),t.boundingBox!==void 0&&(o.boundingBox=new Be().fromJSON(t.boundingBox));break;case"LOD":o=new Zo;break;case"Line":o=new Yn(a(t.geometry),l(t.material));break;case"LineLoop":o=new ta(a(t.geometry),l(t.material));break;case"LineSegments":o=new wn(a(t.geometry),l(t.material));break;case"PointCloud":case"Points":o=new ea(a(t.geometry),l(t.material));break;case"Sprite":o=new Yo(l(t.material));break;case"Group":o=new Xe;break;case"Bone":o=new Rr;break;default:o=new le}if(o.uuid=t.uuid,t.name!==void 0&&(o.name=t.name),t.matrix!==void 0?(o.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=t.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(t.position!==void 0&&o.position.fromArray(t.position),t.rotation!==void 0&&o.rotation.fromArray(t.rotation),t.quaternion!==void 0&&o.quaternion.fromArray(t.quaternion),t.scale!==void 0&&o.scale.fromArray(t.scale)),t.up!==void 0&&o.up.fromArray(t.up),t.pivot!==void 0&&(o.pivot=new C().fromArray(t.pivot)),t.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),t.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=t.morphTargetInfluences.slice()),t.castShadow!==void 0&&(o.castShadow=t.castShadow),t.receiveShadow!==void 0&&(o.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(o.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(o.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(o.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(o.shadow.radius=t.shadow.radius),t.shadow.blurSamples!==void 0&&(o.shadow.blurSamples=t.shadow.blurSamples),t.shadow.focus!==void 0&&(o.shadow.focus=t.shadow.focus),t.shadow.aspect!==void 0&&(o.shadow.aspect=t.shadow.aspect),t.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(o.visible=t.visible),t.frustumCulled!==void 0&&(o.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(o.renderOrder=t.renderOrder),t.static!==void 0&&(o.static=t.static),t.userData!==void 0&&(o.userData=t.userData),t.layers!==void 0&&(o.layers.mask=t.layers),t.children!==void 0){let u=t.children;for(let f=0;f<u.length;f++)o.add(this.parseObject(u[f],e,n,i,r))}if(t.animations!==void 0){let u=t.animations;for(let f=0;f<u.length;f++){let p=u[f];o.animations.push(r[p])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(o.autoUpdate=t.autoUpdate);let u=t.levels;for(let f=0;f<u.length;f++){let p=u[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=e[n.skeleton];i===void 0?_t("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){let n=e.target,i=t.getObjectByProperty("uuid",n);i!==void 0?e.target=i:e.target=new le}})}},Nx={UVMapping:Ka,CubeReflectionMapping:Kn,CubeRefractionMapping:Li,EquirectangularReflectionMapping:to,EquirectangularRefractionMapping:eo,CubeUVReflectionMapping:zs},pm={RepeatWrapping:_r,ClampToEdgeWrapping:an,MirroredRepeatWrapping:xr},mm={NearestFilter:Pe,NearestMipmapNearestFilter:cu,NearestMipmapLinearFilter:ks,LinearFilter:be,LinearMipmapNearestFilter:no,LinearMipmapLinearFilter:jn},md=new WeakMap,_h=class extends Ye{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&_t("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&_t("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Wn.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(c=>{md.has(o)===!0?(i&&i(md.get(o)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(c),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Wn.add(`image-bitmap:${t}`,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){i&&i(c),md.set(l,c),Wn.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});Wn.add(`image-bitmap:${t}`,l),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Fc,Jr=class{static getContext(){return Fc===void 0&&(Fc=new(window.AudioContext||window.webkitAudioContext)),Fc}static setContext(t){Fc=t}},xh=class extends Ye{constructor(t){super(t)}load(t,e,n,i){let r=this,o=new Nn(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(l){try{let c=l.slice(0),h=Jr.getContext(),d=t+"#decode";r.manager.itemStart(d),h.decodeAudioData(c,function(u){e(u),r.manager.itemEnd(d)}).catch(function(u){a(u),r.manager.itemEnd(d)})}catch(c){a(c)}},n,i);function a(l){i?i(l):Ot(l),r.manager.itemError(t)}}},gm=new Yt,_m=new Yt,us=new Yt,yh=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Re,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Re,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){let e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,us.copy(t.projectionMatrix);let i=e.eyeSep/2,r=i*e.near/e.focus,o=e.near*Math.tan(_s*e.fov*.5)/e.zoom,a,l;_m.elements[12]=-i,gm.elements[12]=i,a=-o*e.aspect+r,l=o*e.aspect+r,us.elements[0]=2*e.near/(l-a),us.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(us),a=-o*e.aspect-r,l=o*e.aspect-r,us.elements[0]=2*e.near/(l-a),us.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(us)}this.cameraL.matrix.copy(t.matrixWorld).multiply(_m),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(t.matrixWorld).multiply(gm),this.cameraR.matrixWorldNeedsUpdate=!0}},ur=-90,dr=1,Wa=class extends le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Re(ur,dr,t,e);i.layers=this.layers,this.add(i);let r=new Re(ur,dr,t,e);r.layers=this.layers,this.add(r);let o=new Re(ur,dr,t,e);o.layers=this.layers,this.add(o);let a=new Re(ur,dr,t,e);a.layers=this.layers,this.add(a);let l=new Re(ur,dr,t,e);l.layers=this.layers,this.add(l);let c=new Re(ur,dr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===qi)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Xa=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},qa=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Ux.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Ux(){this._document.hidden===!1&&this.reset()}var ds=new C,gd=new De,Fx=new C,fs=new C,ps=new C,vh=class extends le{constructor(){super(),this.type="AudioListener",this.context=Jr.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new qa}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t),this._timer.update();let e=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(ds,gd,Fx),fs.set(0,0,-1).applyQuaternion(gd),ps.set(0,1,0).applyQuaternion(gd),e.positionX){let n=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(ds.x,n),e.positionY.linearRampToValueAtTime(ds.y,n),e.positionZ.linearRampToValueAtTime(ds.z,n),e.forwardX.linearRampToValueAtTime(fs.x,n),e.forwardY.linearRampToValueAtTime(fs.y,n),e.forwardZ.linearRampToValueAtTime(fs.z,n),e.upX.linearRampToValueAtTime(ps.x,n),e.upY.linearRampToValueAtTime(ps.y,n),e.upZ.linearRampToValueAtTime(ps.z,n)}else e.setPosition(ds.x,ds.y,ds.z),e.setOrientation(fs.x,fs.y,fs.z,ps.x,ps.y,ps.z)}},Ya=class extends le{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){_t("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){_t("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;let e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){_t("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){_t("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){_t("Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(_t("Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){_t("Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}copy(t,e){return super.copy(t,e),t.sourceType!=="buffer"?(_t("Audio: Audio source type cannot be copied."),this):(this.autoplay=t.autoplay,this.buffer=t.buffer,this.detune=t.detune,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.offset=t.offset,this.duration=t.duration,this.playbackRate=t.playbackRate,this.hasPlaybackControl=t.hasPlaybackControl,this.sourceType=t.sourceType,this.filters=t.filters.slice(),this)}clone(t){return new this.constructor(this.listener).copy(this,t)}},ms=new C,xm=new De,Ox=new C,gs=new C,Mh=class extends Ya{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(ms,xm,Ox),gs.set(0,0,1).applyQuaternion(xm);let e=this.panner;if(e.positionX){let n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(ms.x,n),e.positionY.linearRampToValueAtTime(ms.y,n),e.positionZ.linearRampToValueAtTime(ms.z,n),e.orientationX.linearRampToValueAtTime(gs.x,n),e.orientationY.linearRampToValueAtTime(gs.y,n),e.orientationZ.linearRampToValueAtTime(gs.z,n)}else e.setPosition(ms.x,ms.y,ms.z),e.setOrientation(gs.x,gs.y,gs.z)}},Sh=class{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0,e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}},Za=class{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,o;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){let n=this.buffer,i=this.valueSize,r=t*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=e}else{o+=e;let a=e/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){let e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){let e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-r,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,i);break}}saveOriginalState(){let t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,o=i;r!==o;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){let t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){De.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){let o=this._workIndex*r;De.multiplyQuaternionsFlat(t,o,t,e,t,n),De.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let l=e+a;t[l]=t[l]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,r){for(let o=0;o!==r;++o){let a=e+o;t[a]=t[a]+t[n+o]*i}}},Sf="\\[\\]\\.:\\/",Bx=new RegExp("["+Sf+"]","g"),bf="[^"+Sf+"]",zx="[^"+Sf.replace("\\.","")+"]",kx=/((?:WC+[\/:])*)/.source.replace("WC",bf),Vx=/(WCOD+)?/.source.replace("WCOD",zx),Hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bf),Gx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bf),Wx=new RegExp("^"+kx+Vx+Hx+Gx+"$"),Xx=["material","materials","bones","map"],Pd=class{constructor(t,e,n){let i=n||fe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},fe=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Bx,"")}static parseTrackName(t){let e=Wx.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Xx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){_t("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;Ot("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fe.Composite=Pd;fe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};fe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};fe.prototype.GetterByBindingType=[fe.prototype._getValue_direct,fe.prototype._getValue_array,fe.prototype._getValue_arrayElement,fe.prototype._getValue_toArray];fe.prototype.SetterByBindingTypeAndVersioning=[[fe.prototype._setValue_direct,fe.prototype._setValue_direct_setNeedsUpdate,fe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_array,fe.prototype._setValue_array_setNeedsUpdate,fe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_arrayElement,fe.prototype._setValue_arrayElement_setNeedsUpdate,fe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_fromArray,fe.prototype._setValue_fromArray_setNeedsUpdate,fe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var bh=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=En(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){let t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length,a,l=t.length,c=this.nCachedObjects_;for(let h=0,d=arguments.length;h!==d;++h){let u=arguments[h],f=u.uuid,p=e[f];if(p===void 0){p=l++,e[f]=p,t.push(u);for(let _=0,g=o;_!==g;++_)r[_].push(new fe(u,n[_],i[_]))}else if(p<c){a=t[p];let _=--c,g=t[_];e[g.uuid]=p,t[p]=g,e[f]=_,t[_]=u;for(let m=0,v=o;m!==v;++m){let b=r[m],y=b[_],w=b[p];b[p]=y,w===void 0&&(w=new fe(u,n[m],i[m])),b[_]=w}}else t[p]!==a&&Ot("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){let l=arguments[o],c=l.uuid,h=e[c];if(h!==void 0&&h>=r){let d=r++,u=t[d];e[u.uuid]=h,t[h]=u,e[c]=d,t[d]=l;for(let f=0,p=i;f!==p;++f){let _=n[f],g=_[d],m=_[h];_[h]=g,_[d]=m}}}this.nCachedObjects_=r}uncache(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,o=t.length;for(let a=0,l=arguments.length;a!==l;++a){let c=arguments[a],h=c.uuid,d=e[h];if(d!==void 0)if(delete e[h],d<r){let u=--r,f=t[u],p=--o,_=t[p];d!==u&&(e[f.uuid]=d),t[d]=f,u!==p&&(e[_.uuid]=u),t[u]=_,t.pop();for(let g=0,m=i;g!==m;++g){let v=n[g],b=v[u],y=v[p];v[d]=b,v[u]=y,v.pop()}}else{let u=--o,f=t[u];d!==u&&(e[f.uuid]=d),t[d]=f,t.pop();for(let p=0,_=i;p!==_;++p){let g=n[p];g[d]=g[u],g.pop()}}}this.nCachedObjects_=r}subscribe_(t,e){let n=this._bindingsIndicesByPath,i=n[t],r=this._bindings;if(i!==void 0)return r[i];let o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,d=new Array(c);i=r.length,n[t]=i,o.push(t),a.push(e),r.push(d);for(let u=h,f=l.length;u!==f;++u){let p=l[u];d[u]=new fe(p,t,e)}return d}unsubscribe_(t){let e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){let i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=i[a];e[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}},$a=class{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;let r=e.tracks,o=r.length,a=new Array(o),l={endingStart:Wi,endingEnd:Wi};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=rf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){let i=this._clip.duration,r=t._clip.duration,o=r/i,a=i/r;t._restoreTimeScale=t.timeScale,this._restoreTimeScale=this.timeScale,t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){let t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){let t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}let r=this._startTime;if(r!==null){let l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);let o=this._updateTime(e),a=this._updateWeight(t);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case gu:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Nl:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(e===0?this.paused=!0:(this._restoreTimeScale!==null&&(e=this._restoreTimeScale),this.timeScale=e),this.stopWarping())}}return this._effectiveTimeScale=e,e}_updateTime(t){let e=this._clip.duration,n=this.loop,i=this.time+t,r=this._loopCount,o=n===of;if(t===0)return r===-1?i:o&&(r&1)===1?e-i:i;if(n===sf){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){let a=Math.floor(i/e);i-=e*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){let c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=i;if(o&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){let i=this._interpolantSettings;n?(i.endingStart=Xi,i.endingEnd=Xi):(t?i.endingStart=this.zeroSlopeAtStart?Xi:Wi:i.endingStart=vr,e?i.endingEnd=this.zeroSlopeAtEnd?Xi:Wi:i.endingEnd=vr)}_scheduleFading(t,e,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=e,a[1]=r+t,l[1]=n,this}},qx=new Float32Array(1),Eh=class extends gn{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(t,e){let n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){let u=i[d],f=u.name,p=h[f];if(p!==void 0)++p.referenceCount,o[d]=p;else{if(p=o[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=e&&e._propertyBindings[d].binding.parsedPath;p=new Za(fe.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[d]=p}a[d].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){let n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){let e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){let i=this._actions,r=this._actionsByClip,o=r[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=o;else{let a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){let e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;let r=t._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;let d=a.actionByRoot,u=(t._localRoot||this._root).uuid;delete d[u],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){let e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){let e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){let e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){let e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){let e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){let t=this._controlInterpolants,e=this._nActiveControlInterpolants++,n=t[e];return n===void 0&&(n=new Wr(new Float32Array(2),new Float32Array(2),1,qx),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){let e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){let i=e||this._root,r=i.uuid,o=typeof t=="string"?Ki.findByName(i,t):t,a=o!==null?o.uuid:t,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Nl),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new $a(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(t,e){let n=e||this._root,i=n.uuid,r=typeof t=="string"?Ki.findByName(n,t):t,o=r?r.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;let e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){let e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,d=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,e[h]=d,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){let e=t.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){let n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},wh=class extends wr{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isRenderTarget3D=!0,this.depth=n;for(let r=0;r<this.textures.length;r++){let o=new Ms(null,t,e,n);o.isRenderTargetTexture=!0,o.renderTarget=this,this.textures[r]=o}this._setTextureOptions(i)}},Th=class s{constructor(t){this.value=t}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},Yx=0,Ah=class extends gn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Yx++}),this.name="",this.usage=Ol,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){let e=this.uniforms.indexOf(t);return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(t){this.name=t.name,this.usage=t.usage;let e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){let r=Array.isArray(e[n])?e[n]:[e[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}},Ch=class extends ws{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){let e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){let e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}},Rh=class{constructor(t,e,n,i,r,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=o,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}},ym=new Yt,Ph=class{constructor(t,e,n=0,i=1/0){this.ray=new qn(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ss,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ot("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ym.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ym),this}intersectObject(t,e=!0,n=[]){return Id(t,this,n,e),n.sort(vm),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Id(t[i],this,n,e);return n.sort(vm),n}};function vm(s,t){return s.distance-t.distance}function Id(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Id(r[o],t,e,!0)}}var Ih=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,_t("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},Fs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Lh=class{constructor(t=1,e=0,n=0){this.radius=t,this.theta=e,this.y=n}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}},Dh=class s{static{s.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}},Mm=new ot,Ja=class{constructor(t=new ot(1/0,1/0),e=new ot(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Mm.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mm).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Sm=new C,Oc=new C,fr=new C,pr=new C,_d=new C,Zx=new C,$x=new C,Nh=class{constructor(t=new C,e=new C){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Sm.subVectors(t,this.start),Oc.subVectors(this.end,this.start);let n=Oc.dot(Oc);if(n===0)return 0;let r=Oc.dot(Sm)/n;return e&&(r=Xt(r,0,1)),r}closestPointToPoint(t,e,n){let i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(t,e=Zx,n=$x){let i=10000000000000001e-32,r,o,a=this.start,l=t.start,c=this.end,h=t.end;fr.subVectors(c,a),pr.subVectors(h,l),_d.subVectors(a,l);let d=fr.dot(fr),u=pr.dot(pr),f=pr.dot(_d);if(d<=i&&u<=i)return e.copy(a),n.copy(l),e.sub(n),e.dot(e);if(d<=i)r=0,o=f/u,o=Xt(o,0,1);else{let p=fr.dot(_d);if(u<=i)o=0,r=Xt(-p/d,0,1);else{let _=fr.dot(pr),g=d*u-_*_;g!==0?r=Xt((_*f-p*u)/g,0,1):r=0,o=(_*r+f)/u,o<0?(o=0,r=Xt(-p/d,0,1)):o>1&&(o=1,r=Xt((_-p)/d,0,1))}}return e.copy(a).addScaledVector(fr,r),n.copy(l).addScaledVector(pr,o),e.distanceToSquared(n)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},bm=new C,Uh=class extends le{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";let n=new Kt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){let c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Rt(i,3));let r=new We({fog:!1,toneMapped:!1});this.cone=new wn(n,r),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),bm.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(bm),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},Gi=new C,Bc=new Yt,xd=new Yt,Fh=class extends wn{constructor(t){let e=Ug(t),n=new Kt,i=[],r=[];for(let c=0;c<e.length;c++){let h=e[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new Rt(i,3)),n.setAttribute("color",new Rt(r,3));let o=new We({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1;let a=new Tt(255),l=new Tt(65280);this.setColors(a,l)}updateMatrixWorld(t){let e=this.bones,n=this.geometry,i=n.getAttribute("position");xd.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<e.length;r++){let a=e[r];a.parent&&a.parent.isBone&&(Bc.multiplyMatrices(xd,a.matrixWorld),Gi.setFromMatrixPosition(Bc),i.setXYZ(o,Gi.x,Gi.y,Gi.z),Bc.multiplyMatrices(xd,a.parent.matrixWorld),Gi.setFromMatrixPosition(Bc),i.setXYZ(o+1,Gi.x,Gi.y,Gi.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}setColors(t,e){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,t.r,t.g,t.b),i.setXYZ(r+1,e.r,e.g,e.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Ug(s){let t=[];s.isBone===!0&&t.push(s);for(let e=0;e<s.children.length;e++)t.push(...Ug(s.children[e]));return t}var Oh=class extends ge{constructor(t,e,n){let i=new Ji(e,4,2),r=new _n({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},Jx=new C,Em=new Tt,wm=new Tt,Bh=class extends le{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new kr(e);i.rotateY(Math.PI*.5),this.material=new _n({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new pe(o,3)),this.add(new ge(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let e=t.geometry.getAttribute("color");Em.copy(this.light.color),wm.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){let r=n<i/2?Em:wm;e.setXYZ(n,r.r,r.g,r.b)}e.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),t.lookAt(Jx.setFromMatrixPosition(this.light.matrixWorld).negate())}},zh=class extends wn{constructor(t=10,e=10,n=4473924,i=8947848){n=new Tt(n),i=new Tt(i);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let u=0,f=0,p=-a;u<=e;u++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let _=u===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new Kt;h.setAttribute("position",new Rt(l,3)),h.setAttribute("color",new Rt(c,3));let d=new We({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},kh=class extends wn{constructor(t=10,e=16,n=8,i=64,r=4473924,o=8947848){r=new Tt(r),o=new Tt(o);let a=[],l=[];if(e>1)for(let d=0;d<e;d++){let u=d/e*(Math.PI*2),f=Math.sin(u)*t,p=Math.cos(u)*t;a.push(0,0,0),a.push(f,0,p);let _=d&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let d=0;d<n;d++){let u=d&1?r:o,f=t-t/n*d;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),l.push(u.r,u.g,u.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),l.push(u.r,u.g,u.b)}}let c=new Kt;c.setAttribute("position",new Rt(a,3)),c.setAttribute("color",new Rt(l,3));let h=new We({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Tm=new C,zc=new C,Am=new C,Vh=class extends le{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let i=new Kt;i.setAttribute("position",new Rt([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));let r=new We({fog:!1,toneMapped:!1});this.lightPlane=new Yn(i,r),this.add(this.lightPlane),i=new Kt,i.setAttribute("position",new Rt([0,0,0,0,0,1],3)),this.targetLine=new Yn(i,r),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Tm.setFromMatrixPosition(this.light.matrixWorld),zc.setFromMatrixPosition(this.light.target.matrixWorld),Am.subVectors(zc,Tm),this.lightPlane.lookAt(zc),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(zc),this.targetLine.scale.z=Am.length()}},kc=new C,Ce=new Ns,Hh=class extends wn{constructor(t){let e=new Kt,n=new We({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){i.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}e.setAttribute("position",new Rt(i,3)),e.setAttribute("color",new Rt(r,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();let c=new Tt(16755200),h=new Tt(16711680),d=new Tt(43775),u=new Tt(16777215),f=new Tt(3355443);this.setColors(c,h,d,u,f)}setColors(t,e,n,i,r){let a=this.geometry.getAttribute("color");return a.setXYZ(0,t.r,t.g,t.b),a.setXYZ(1,t.r,t.g,t.b),a.setXYZ(2,t.r,t.g,t.b),a.setXYZ(3,t.r,t.g,t.b),a.setXYZ(4,t.r,t.g,t.b),a.setXYZ(5,t.r,t.g,t.b),a.setXYZ(6,t.r,t.g,t.b),a.setXYZ(7,t.r,t.g,t.b),a.setXYZ(8,t.r,t.g,t.b),a.setXYZ(9,t.r,t.g,t.b),a.setXYZ(10,t.r,t.g,t.b),a.setXYZ(11,t.r,t.g,t.b),a.setXYZ(12,t.r,t.g,t.b),a.setXYZ(13,t.r,t.g,t.b),a.setXYZ(14,t.r,t.g,t.b),a.setXYZ(15,t.r,t.g,t.b),a.setXYZ(16,t.r,t.g,t.b),a.setXYZ(17,t.r,t.g,t.b),a.setXYZ(18,t.r,t.g,t.b),a.setXYZ(19,t.r,t.g,t.b),a.setXYZ(20,t.r,t.g,t.b),a.setXYZ(21,t.r,t.g,t.b),a.setXYZ(22,t.r,t.g,t.b),a.setXYZ(23,t.r,t.g,t.b),a.setXYZ(24,e.r,e.g,e.b),a.setXYZ(25,e.r,e.g,e.b),a.setXYZ(26,e.r,e.g,e.b),a.setXYZ(27,e.r,e.g,e.b),a.setXYZ(28,e.r,e.g,e.b),a.setXYZ(29,e.r,e.g,e.b),a.setXYZ(30,e.r,e.g,e.b),a.setXYZ(31,e.r,e.g,e.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0,this}update(){let t=this.geometry,e=this.pointMap,n=1,i=1,r,o;if(Ce.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,o=0;else if(this.camera.coordinateSystem===mn)r=-1,o=1;else if(this.camera.coordinateSystem===qi)r=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Le("c",e,t,Ce,0,0,r),Le("t",e,t,Ce,0,0,o),Le("n1",e,t,Ce,-n,-i,r),Le("n2",e,t,Ce,n,-i,r),Le("n3",e,t,Ce,-n,i,r),Le("n4",e,t,Ce,n,i,r),Le("f1",e,t,Ce,-n,-i,o),Le("f2",e,t,Ce,n,-i,o),Le("f3",e,t,Ce,-n,i,o),Le("f4",e,t,Ce,n,i,o),Le("u1",e,t,Ce,n*.7,i*1.1,r),Le("u2",e,t,Ce,-n*.7,i*1.1,r),Le("u3",e,t,Ce,0,i*2,r),Le("cf1",e,t,Ce,-n,0,o),Le("cf2",e,t,Ce,n,0,o),Le("cf3",e,t,Ce,0,-i,o),Le("cf4",e,t,Ce,0,i,o),Le("cn1",e,t,Ce,-n,0,r),Le("cn2",e,t,Ce,n,0,r),Le("cn3",e,t,Ce,0,-i,r),Le("cn4",e,t,Ce,0,i,r),t.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Le(s,t,e,n,i,r,o){kc.set(i,r,o).unproject(n);let a=t[s];if(a!==void 0){let l=e.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],kc.x,kc.y,kc.z)}}var Vc=new Be,Gh=class extends wn{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new Kt;r.setIndex(new pe(n,1)),r.setAttribute("position",new pe(i,3)),super(r,new We({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Vc.setFromObject(this.object),Vc.isEmpty())return;let t=Vc.min,e=Vc.max,n=this.geometry.attributes.position,i=n.array;i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=t.x,i[4]=e.y,i[5]=e.z,i[6]=t.x,i[7]=t.y,i[8]=e.z,i[9]=e.x,i[10]=t.y,i[11]=e.z,i[12]=e.x,i[13]=e.y,i[14]=t.z,i[15]=t.x,i[16]=e.y,i[17]=t.z,i[18]=t.x,i[19]=t.y,i[20]=t.z,i[21]=e.x,i[22]=t.y,i[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Wh=class extends wn{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new Kt;r.setIndex(new pe(n,1)),r.setAttribute("position",new Rt(i,3)),super(r,new We({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){let e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Xh=class extends Yn{constructor(t,e=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new Kt;o.setAttribute("position",new Rt(r,3)),o.computeBoundingSphere(),super(o,new We({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;let a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Kt;l.setAttribute("position",new Rt(a,3)),l.computeBoundingSphere(),this.add(new ge(l,new _n({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},Cm=new C,Hc,yd,qh=class extends le{constructor(t=new C(0,0,1),e=new C(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Hc===void 0&&(Hc=new Kt,Hc.setAttribute("position",new Rt([0,0,0,0,1,0],3)),yd=new Dr(.5,1,5,1),yd.translate(0,-.5,0)),this.position.copy(e),this.line=new Yn(Hc,new We({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ge(yd,new _n({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,r,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Cm.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Cm,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},Yh=class extends wn{constructor(t=1){let e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Kt;i.setAttribute("position",new Rt(e,3)),i.setAttribute("color",new Rt(n,3));let r=new We({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(t,e,n){let i=new Tt,r=this.geometry.attributes.color.array;return i.set(t),i.toArray(r,0),i.toArray(r,3),i.set(e),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Zh=class{constructor(){this.type="ShapePath",this.color=new Tt,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(t,e){return this.currentPath=new Zn,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,r,o){return this.currentPath.bezierCurveTo(t,e,n,i,r,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(){function t(l,c){let h=!1,d=c.length;for(let u=0,f=d-1;u<d;f=u++){let p=c[u],_=c[f];p.y>l.y!=_.y>l.y&&l.x<(_.x-p.x)*(l.y-p.y)/(_.y-p.y)+p.x&&(h=!h)}return h}function e(l,c){let h=c.getCenter(new ot);if(t(h,l))return h;let d=h.y,u=[],f=l.length;for(let p=0;p<f;p++){let _=l[p],g=l[(p+1)%f];if(_.y>d!=g.y>d){let m=_.x+(d-_.y)*(g.x-_.x)/(g.y-_.y);u.push(m)}}return u.length>1&&(u.sort((p,_)=>p-_),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(_t('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=Ln.area(c);if(h===0)continue;let d=new Ja;for(let u=0;u<c.length;u++)d.expandByPoint(c[u]);r.push({subPath:l,points:c,boundingBox:d,interiorPoint:e(c,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let d=l-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsBox(c.boundingBox)&&t(c.interiorPoint,u.points)){c.container=u.exclude?u.container:u,h=u.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new ci;c.curves=l.subPath.curves,o.push(c),a.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=a.get(l.container);if(!c)continue;let h=new Zn;h.curves=l.subPath.curves,c.holes.push(h)}return o}},Kr=class extends gn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Kx(s,t){let e=s.image&&s.image.width?s.image.width/s.image.height:1;return e>t?(s.repeat.x=1,s.repeat.y=e/t,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=t/e,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function jx(s,t){let e=s.image&&s.image.width?s.image.width/s.image.height:1;return e>t?(s.repeat.x=t/e,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=e/t,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function Qx(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function yu(s,t,e,n){let i=ty(n);switch(e){case pu:return s*t;case el:return s*t/i.components*i.byteLength;case io:return s*t/i.components*i.byteLength;case Ni:return s*t*2/i.components*i.byteLength;case nl:return s*t*2/i.components*i.byteLength;case mu:return s*t*3/i.components*i.byteLength;case tn:return s*t*4/i.components*i.byteLength;case il:return s*t*4/i.components*i.byteLength;case so:case ro:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case oo:case ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case rl:case al:return Math.max(s,16)*Math.max(t,8)/4;case sl:case ol:return Math.max(s,8)*Math.max(t,8)/2;case ll:case cl:case ul:case dl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case hl:case lo:case fl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case pl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ml:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case gl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case _l:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case xl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case yl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case vl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Sl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case bl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case El:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case wl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Tl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Al:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Cl:case Rl:case Pl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Il:case Ll:return Math.ceil(s/4)*Math.ceil(t/4)*8;case co:case Dl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ty(s){switch(s){case un:case hu:return{byteLength:1,components:1};case Vs:case uu:case Fn:return{byteLength:2,components:1};case Qa:case tl:return{byteLength:2,components:4};case An:case ja:case Qe:return{byteLength:4,components:1};case du:case fu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var $h=class{static contain(t,e){return Kx(t,e)}static cover(t,e){return jx(t,e)}static fill(t){return Qx(t)}static getByteLength(t,e,n,i){return yu(t,e,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?_t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function i0(){let s=null,t=!1,e=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function ey(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var ny=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ry=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ay=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ly=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,uy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,py=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,my=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_y=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,xy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,My=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,by=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ey=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,wy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ty=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ay=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Cy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ry=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Py=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ly="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ny=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Uy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Oy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,By=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ky=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Zy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,$y=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ky=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ev=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,iv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sv=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,rv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ov=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,av=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_v=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,yv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ev=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Av=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Iv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Lv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ov=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,zv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$v=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,eM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,dM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_M=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,MM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,EM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,AM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,IM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,UM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ne={alphahash_fragment:ny,alphahash_pars_fragment:iy,alphamap_fragment:sy,alphamap_pars_fragment:ry,alphatest_fragment:oy,alphatest_pars_fragment:ay,aomap_fragment:ly,aomap_pars_fragment:cy,batching_pars_vertex:hy,batching_vertex:uy,begin_vertex:dy,beginnormal_vertex:fy,bsdfs:py,iridescence_fragment:my,bumpmap_pars_fragment:gy,clipping_planes_fragment:_y,clipping_planes_pars_fragment:xy,clipping_planes_pars_vertex:yy,clipping_planes_vertex:vy,color_fragment:My,color_pars_fragment:Sy,color_pars_vertex:by,color_vertex:Ey,common:wy,cube_uv_reflection_fragment:Ty,defaultnormal_vertex:Ay,displacementmap_pars_vertex:Cy,displacementmap_vertex:Ry,emissivemap_fragment:Py,emissivemap_pars_fragment:Iy,colorspace_fragment:Ly,colorspace_pars_fragment:Dy,envmap_fragment:Ny,envmap_common_pars_fragment:Uy,envmap_pars_fragment:Fy,envmap_pars_vertex:Oy,envmap_physical_pars_fragment:Zy,envmap_vertex:By,fog_vertex:zy,fog_pars_vertex:ky,fog_fragment:Vy,fog_pars_fragment:Hy,gradientmap_pars_fragment:Gy,lightmap_pars_fragment:Wy,lights_lambert_fragment:Xy,lights_lambert_pars_fragment:qy,lights_pars_begin:Yy,lights_toon_fragment:$y,lights_toon_pars_fragment:Jy,lights_phong_fragment:Ky,lights_phong_pars_fragment:jy,lights_physical_fragment:Qy,lights_physical_pars_fragment:tv,lights_fragment_begin:ev,lights_fragment_maps:nv,lights_fragment_end:iv,lightprobes_pars_fragment:sv,logdepthbuf_fragment:rv,logdepthbuf_pars_fragment:ov,logdepthbuf_pars_vertex:av,logdepthbuf_vertex:lv,map_fragment:cv,map_pars_fragment:hv,map_particle_fragment:uv,map_particle_pars_fragment:dv,metalnessmap_fragment:fv,metalnessmap_pars_fragment:pv,morphinstance_vertex:mv,morphcolor_vertex:gv,morphnormal_vertex:_v,morphtarget_pars_vertex:xv,morphtarget_vertex:yv,normal_fragment_begin:vv,normal_fragment_maps:Mv,normal_pars_fragment:Sv,normal_pars_vertex:bv,normal_vertex:Ev,normalmap_pars_fragment:wv,clearcoat_normal_fragment_begin:Tv,clearcoat_normal_fragment_maps:Av,clearcoat_pars_fragment:Cv,iridescence_pars_fragment:Rv,opaque_fragment:Pv,packing:Iv,premultiplied_alpha_fragment:Lv,project_vertex:Dv,dithering_fragment:Nv,dithering_pars_fragment:Uv,roughnessmap_fragment:Fv,roughnessmap_pars_fragment:Ov,shadowmap_pars_fragment:Bv,shadowmap_pars_vertex:zv,shadowmap_vertex:kv,shadowmask_pars_fragment:Vv,skinbase_vertex:Hv,skinning_pars_vertex:Gv,skinning_vertex:Wv,skinnormal_vertex:Xv,specularmap_fragment:qv,specularmap_pars_fragment:Yv,tonemapping_fragment:Zv,tonemapping_pars_fragment:$v,transmission_fragment:Jv,transmission_pars_fragment:Kv,uv_pars_fragment:jv,uv_pars_vertex:Qv,uv_vertex:tM,worldpos_vertex:eM,background_vert:nM,background_frag:iM,backgroundCube_vert:sM,backgroundCube_frag:rM,cube_vert:oM,cube_frag:aM,depth_vert:lM,depth_frag:cM,distance_vert:hM,distance_frag:uM,equirect_vert:dM,equirect_frag:fM,linedashed_vert:pM,linedashed_frag:mM,meshbasic_vert:gM,meshbasic_frag:_M,meshlambert_vert:xM,meshlambert_frag:yM,meshmatcap_vert:vM,meshmatcap_frag:MM,meshnormal_vert:SM,meshnormal_frag:bM,meshphong_vert:EM,meshphong_frag:wM,meshphysical_vert:TM,meshphysical_frag:AM,meshtoon_vert:CM,meshtoon_frag:RM,points_vert:PM,points_frag:IM,shadow_vert:LM,shadow_frag:DM,sprite_vert:NM,sprite_frag:UM},bt={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Qn={basic:{uniforms:nn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:nn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Tt(0)},envMapIntensity:{value:1}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:nn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:nn([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:nn([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new Tt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:nn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:nn([bt.points,bt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:nn([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:nn([bt.common,bt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:nn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:nn([bt.sprite,bt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distance:{uniforms:nn([bt.common,bt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distance_vert,fragmentShader:ne.distance_frag},shadow:{uniforms:nn([bt.lights,bt.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};Qn.physical={uniforms:nn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};var vu={r:0,b:0,g:0},FM=new Yt,s0=new Zt;s0.set(-1,0,0,0,1,0,0,0,1);function OM(s,t,e,n,i,r){let o=new Tt(0),a=i===!0?0:1,l,c,h=null,d=0,u=null;function f(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){let y=v.backgroundBlurriness>0;b=t.get(b,y)}return b}function p(v){let b=!1,y=f(v);y===null?g(o,a):y&&y.isColor&&(g(y,1),b=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(v,b){let y=f(b);y&&(y.isCubeTexture||y.mapping===zs)?(c===void 0&&(c=new ge(new li(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Gs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(FM.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(s0),c.material.toneMapped=se.getTransfer(y.colorSpace)!==ce,(h!==y||d!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ge(new Ai(2,2),new cn({name:"BackgroundMaterial",uniforms:Gs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=se.getTransfer(y.colorSpace)!==ce,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,b){v.getRGB(vu,yf(s)),e.buffers.color.setClear(vu.r,vu.g,vu.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,b=1){o.set(v),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,g(o,a)},render:p,addToRenderList:_,dispose:m}}function BM(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(I,N,z,L,O){let W=!1,B=d(I,L,z,N);r!==B&&(r=B,c(r.object)),W=f(I,L,z,O),W&&p(I,L,z,O),O!==null&&t.update(O,s.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,y(I,N,z,L),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return s.createVertexArray()}function c(I){return s.bindVertexArray(I)}function h(I){return s.deleteVertexArray(I)}function d(I,N,z,L){let O=L.wireframe===!0,W=n[N.id];W===void 0&&(W={},n[N.id]=W);let B=I.isInstancedMesh===!0?I.id:0,nt=W[B];nt===void 0&&(nt={},W[B]=nt);let Y=nt[z.id];Y===void 0&&(Y={},nt[z.id]=Y);let tt=Y[O];return tt===void 0&&(tt=u(l()),Y[O]=tt),tt}function u(I){let N=[],z=[],L=[];for(let O=0;O<e;O++)N[O]=0,z[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:z,attributeDivisors:L,object:I,attributes:{},index:null}}function f(I,N,z,L){let O=r.attributes,W=N.attributes,B=0,nt=z.getAttributes();for(let Y in nt)if(nt[Y].location>=0){let it=O[Y],Lt=W[Y];if(Lt===void 0&&(Y==="instanceMatrix"&&I.instanceMatrix&&(Lt=I.instanceMatrix),Y==="instanceColor"&&I.instanceColor&&(Lt=I.instanceColor)),it===void 0||it.attribute!==Lt||Lt&&it.data!==Lt.data)return!0;B++}return r.attributesNum!==B||r.index!==L}function p(I,N,z,L){let O={},W=N.attributes,B=0,nt=z.getAttributes();for(let Y in nt)if(nt[Y].location>=0){let it=W[Y];it===void 0&&(Y==="instanceMatrix"&&I.instanceMatrix&&(it=I.instanceMatrix),Y==="instanceColor"&&I.instanceColor&&(it=I.instanceColor));let Lt={};Lt.attribute=it,it&&it.data&&(Lt.data=it.data),O[Y]=Lt,B++}r.attributes=O,r.attributesNum=B,r.index=L}function _(){let I=r.newAttributes;for(let N=0,z=I.length;N<z;N++)I[N]=0}function g(I){m(I,0)}function m(I,N){let z=r.newAttributes,L=r.enabledAttributes,O=r.attributeDivisors;z[I]=1,L[I]===0&&(s.enableVertexAttribArray(I),L[I]=1),O[I]!==N&&(s.vertexAttribDivisor(I,N),O[I]=N)}function v(){let I=r.newAttributes,N=r.enabledAttributes;for(let z=0,L=N.length;z<L;z++)N[z]!==I[z]&&(s.disableVertexAttribArray(z),N[z]=0)}function b(I,N,z,L,O,W,B){B===!0?s.vertexAttribIPointer(I,N,z,O,W):s.vertexAttribPointer(I,N,z,L,O,W)}function y(I,N,z,L){_();let O=L.attributes,W=z.getAttributes(),B=N.defaultAttributeValues;for(let nt in W){let Y=W[nt];if(Y.location>=0){let tt=O[nt];if(tt===void 0&&(nt==="instanceMatrix"&&I.instanceMatrix&&(tt=I.instanceMatrix),nt==="instanceColor"&&I.instanceColor&&(tt=I.instanceColor)),tt!==void 0){let it=tt.normalized,Lt=tt.itemSize,pt=t.get(tt);if(pt===void 0)continue;let $t=pt.buffer,Jt=pt.type,jt=pt.bytesPerElement,J=Jt===s.INT||Jt===s.UNSIGNED_INT||tt.gpuType===ja;if(tt.isInterleavedBufferAttribute){let et=tt.data,xt=et.stride,Q=tt.offset;if(et.isInstancedInterleavedBuffer){for(let $=0;$<Y.locationSize;$++)m(Y.location+$,et.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let $=0;$<Y.locationSize;$++)g(Y.location+$);s.bindBuffer(s.ARRAY_BUFFER,$t);for(let $=0;$<Y.locationSize;$++)b(Y.location+$,Lt/Y.locationSize,Jt,it,xt*jt,(Q+Lt/Y.locationSize*$)*jt,J)}else{if(tt.isInstancedBufferAttribute){for(let et=0;et<Y.locationSize;et++)m(Y.location+et,tt.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let et=0;et<Y.locationSize;et++)g(Y.location+et);s.bindBuffer(s.ARRAY_BUFFER,$t);for(let et=0;et<Y.locationSize;et++)b(Y.location+et,Lt/Y.locationSize,Jt,it,Lt*jt,Lt/Y.locationSize*et*jt,J)}}else if(B!==void 0){let it=B[nt];if(it!==void 0)switch(it.length){case 2:s.vertexAttrib2fv(Y.location,it);break;case 3:s.vertexAttrib3fv(Y.location,it);break;case 4:s.vertexAttrib4fv(Y.location,it);break;default:s.vertexAttrib1fv(Y.location,it)}}}}v()}function w(){T();for(let I in n){let N=n[I];for(let z in N){let L=N[z];for(let O in L){let W=L[O];for(let B in W)h(W[B].object),delete W[B];delete L[O]}}delete n[I]}}function S(I){if(n[I.id]===void 0)return;let N=n[I.id];for(let z in N){let L=N[z];for(let O in L){let W=L[O];for(let B in W)h(W[B].object),delete W[B];delete L[O]}}delete n[I.id]}function A(I){for(let N in n){let z=n[N];for(let L in z){let O=z[L];if(O[I.id]===void 0)continue;let W=O[I.id];for(let B in W)h(W[B].object),delete W[B];delete O[I.id]}}}function x(I){for(let N in n){let z=n[N],L=I.isInstancedMesh===!0?I.id:0,O=z[L];if(O!==void 0){for(let W in O){let B=O[W];for(let nt in B)h(B[nt].object),delete B[nt];delete O[W]}delete z[L],Object.keys(z).length===0&&delete n[N]}}}function T(){P(),o=!0,r!==i&&(r=i,c(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function zM(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function kM(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==tn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let x=A===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==un&&A!==Qe&&!x&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(_t("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&_t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:y,maxSamples:w,samples:S}}function VM(s){let t=this,e=null,n=0,i=!1,r=!1,o=new pn,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let v=r?0:n,b=v*4,y=m.clippingState||null;l.value=y,y=h(p,u,b,f);for(let w=0;w!==b;++w)y[w]=e[w];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,y=f;b!==_;++b,y+=4)o.copy(d[b]).applyMatrix4(v,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}var uo=4,HM=6,GM=20,WM=256,Bl=new Qi,Fg=new Tt,Ef=null,wf=0,Tf=0,Af=!1,XM=new C,Ws=new C,Vl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=XM}=r;Ef=this._renderer.getRenderTarget(),wf=this._renderer.getActiveCubeFace(),Tf=this._renderer.getActiveMipmapLevel(),Af=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ef,wf,Tf),this._renderer.xr.enabled=Af,t.scissorTest=!1,ho(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Kn||t.mapping===Li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ef=this._renderer.getRenderTarget(),wf=this._renderer.getActiveCubeFace(),Tf=this._renderer.getActiveMipmapLevel(),Af=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:be,minFilter:be,generateMipmaps:!1,type:Fn,format:tn,colorSpace:Mr,depthBuffer:!1},i=Og(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Og(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=qM(r)),this._blurMaterial=ZM(r,t,e),this._ggxMaterial=YM(r,t,e)}return i}_compileMaterial(t){let e=new ge(new Kt,t);this._renderer.compile(e,Bl)}_sceneToCubeUV(t,e,n,i,r){let l=new Re(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Fg),d.toneMapping=Un,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ge(new li,new _n({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,m=!0):(g.color.copy(Fg),m=!0);for(let b=0;b<6;b++){let y=b%3;y===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):y===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let w=this._cubeSize;ho(i,y*w,b>2?w:0,w,w),d.setRenderTarget(i),m&&d.render(_,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=v}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Kn||t.mapping===Li;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=zg()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bg());let r=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;ho(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Bl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-uo?n-p+uo:0),m=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=p-e,ho(r,g,m,3*_,2*_),i.setRenderTarget(r),i.render(a,Bl),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,ho(t,g,m,3*_,2*_),i.setRenderTarget(t),i.render(a,Bl)}_blur(t,e,n,i){let r=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,i,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[i];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-uo?i-this._lodMax+uo:0),u=4*(this._cubeSize-h);ho(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(l,Bl)}};function qM(s){let t=[],e=[],n=s,i=s-uo+1+HM;for(let r=0;r<i;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let m=0;m<d;m++){let v=m%3*2/3-1,b=m>2?0:-1,y=[v,b,0,v+2/3,b,0,v+2/3,b+1,0,v,b,0,v+2/3,b+1,0,v,b+1,0];p.set(y,f*u*m);for(let w=0;w<u;w++){let S=h[w*2]*2-1,A=h[w*2+1]*2-1;m===0?Ws.set(1,A,S):m===1?Ws.set(-S,1,-A):m===2?Ws.set(-S,A,1):m===3?Ws.set(-1,A,-S):m===4?Ws.set(-S,-1,A):Ws.set(S,A,-1),Ws.toArray(_,(m*u+w)*f)}}let g=new Kt;g.setAttribute("position",new pe(p,f)),g.setAttribute("outputDirection",new pe(_,f)),e.push(new ge(g,null)),n>uo&&n--}return{lodMeshes:e,sizeLods:t}}function Og(s,t,e){let n=new qe(s,t,e);return n.texture.mapping=zs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ho(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function YM(s,t,e){return new cn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:WM,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Su(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function ZM(s,t,e){return new cn({name:"SphericalGaussianBlur",defines:{SAMPLES:GM,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Su(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Bg(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function zg(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Su(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Hl=class extends qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new $i(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new li(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Jn});r.uniforms.tEquirect.value=e;let o=new ge(i,r),a=e.minFilter;return e.minFilter===jn&&(e.minFilter=be),new Wa(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}};function $M(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===to||f===eo)if(t.has(u)){let p=t.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new Hl(p.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,p=f===to||f===eo,_=f===Kn||f===Li;if(p||_){let g=e.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Vl(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let v=u.image;return p&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new Vl(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===to?u.mapping=Kn:f===eo&&(u.mapping=Li),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function JM(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&oi("WebGLRenderer: "+n+" extension not supported."),i}}}function KM(s,t,e,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,_=0;if(p===void 0)return;if(f!==null){let v=f.array;_=f.version;for(let b=0,y=v.length;b<y;b+=3){let w=v[b+0],S=v[b+1],A=v[b+2];u.push(w,S,S,A,A,w)}}else{let v=p.array;_=p.version;for(let b=0,y=v.length/3-1;b<y;b+=3){let w=b+0,S=b+1,A=b+2;u.push(w,S,S,A,A,w)}}let g=new(p.count>=65535?Ar:Tr)(u,1);g.version=_;let m=r.get(d);m&&t.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function jM(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*o),e.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g];e.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function QM(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:Ot("WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function tS(s,t,e){let n=new WeakMap,i=new me;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let T=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let y=a.attributes.position.count*b,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let S=new Float32Array(y*w*4*d),A=new vs(S,y,w,d);A.type=Qe,A.needsUpdate=!0;let x=b*4;for(let P=0;P<d;P++){let I=g[P],N=m[P],z=v[P],L=y*w*4*P;for(let O=0;O<I.count;O++){let W=O*x;f===!0&&(i.fromBufferAttribute(I,O),S[L+W+0]=i.x,S[L+W+1]=i.y,S[L+W+2]=i.z,S[L+W+3]=0),p===!0&&(i.fromBufferAttribute(N,O),S[L+W+4]=i.x,S[L+W+5]=i.y,S[L+W+6]=i.z,S[L+W+7]=0),_===!0&&(i.fromBufferAttribute(z,O),S[L+W+8]=i.x,S[L+W+9]=i.y,S[L+W+10]=i.z,S[L+W+11]=z.itemSize===4?i.w:1)}}u={count:d,texture:A,size:new ot(y,w)},n.set(a,u),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function eS(s,t,e,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var nS={[nu]:"LINEAR_TONE_MAPPING",[iu]:"REINHARD_TONE_MAPPING",[su]:"CINEON_TONE_MAPPING",[ru]:"ACES_FILMIC_TONE_MAPPING",[au]:"AGX_TONE_MAPPING",[lu]:"NEUTRAL_TONE_MAPPING",[ou]:"CUSTOM_TONE_MAPPING"};function iS(s,t,e,n,i,r){let o=new qe(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Kt;c.setAttribute("position",new Rt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Rt([0,2,0,0,2,0],2));let h=new Vr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ge(c,h),u=new Qi(-1,1,1,-1,0,1),f=null,p=null,_=!1,g,m=null,v=[],b=!1;this.setSize=function(y,w){o.setSize(y,w),a!==null&&a.setSize(y,w),l!==null&&l.setSize(y,w);for(let S=0;S<v.length;S++){let A=v[S];A.setSize&&A.setSize(y,w)}},this.setEffects=function(y){v=y,b=v.length>0&&v[0].isRenderPass===!0;let w=o.width,S=o.height;v.length>0&&a===null&&(a=new qe(w,S,{type:Fn,depthBuffer:!1,stencilBuffer:!1}),l=new qe(w,S,{type:Fn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<v.length;A++){let x=v[A];x.setSize&&x.setSize(w,S)}},this.begin=function(y,w){if(_||y.toneMapping===Un&&v.length===0)return!1;if(m=w,w!==null){let S=w.width,A=w.height;(o.width!==S||o.height!==A)&&this.setSize(S,A)}return b===!1&&y.setRenderTarget(o),g=y.toneMapping,y.toneMapping=Un,!0},this.hasRenderPass=function(){return b},this.end=function(y,w){y.toneMapping=g,_=!0;let S=o,A=a;for(let x=0;x<v.length;x++){let T=v[x];T.enabled!==!1&&(T.render(y,A,S,w),T.needsSwap!==!1&&(S=A,A=A===a?l:a))}if(f!==y.outputColorSpace||p!==y.toneMapping){f=y.outputColorSpace,p=y.toneMapping,h.defines={},se.getTransfer(f)===ce&&(h.defines.SRGB_TRANSFER="");let x=nS[p];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(m),y.render(d,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var r0=new Te,Pf=new wi(1,1),o0=new vs,a0=new Ms,l0=new $i,kg=[],Vg=[],Hg=new Float32Array(16),Gg=new Float32Array(9),Wg=new Float32Array(4);function po(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=kg[i];if(r===void 0&&(r=new Float32Array(i),kg[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function ze(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ke(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function bu(s,t){let e=Vg[t];e===void 0&&(e=new Int32Array(t),Vg[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function sS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function rS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2fv(this.addr,t),ke(e,t)}}function oS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;s.uniform3fv(this.addr,t),ke(e,t)}}function aS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4fv(this.addr,t),ke(e,t)}}function lS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Wg.set(n),s.uniformMatrix2fv(this.addr,!1,Wg),ke(e,n)}}function cS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Gg.set(n),s.uniformMatrix3fv(this.addr,!1,Gg),ke(e,n)}}function hS(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(ze(e,n))return;Hg.set(n),s.uniformMatrix4fv(this.addr,!1,Hg),ke(e,n)}}function uS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function dS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2iv(this.addr,t),ke(e,t)}}function fS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;s.uniform3iv(this.addr,t),ke(e,t)}}function pS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4iv(this.addr,t),ke(e,t)}}function mS(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function gS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;s.uniform2uiv(this.addr,t),ke(e,t)}}function _S(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;s.uniform3uiv(this.addr,t),ke(e,t)}}function xS(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;s.uniform4uiv(this.addr,t),ke(e,t)}}function yS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Pf.compareFunction=e.isReversedDepthBuffer()?Fl:Ul,r=Pf):r=r0,e.setTexture2D(t||r,i)}function vS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||a0,i)}function MS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||l0,i)}function SS(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||o0,i)}function bS(s){switch(s){case 5126:return sS;case 35664:return rS;case 35665:return oS;case 35666:return aS;case 35674:return lS;case 35675:return cS;case 35676:return hS;case 5124:case 35670:return uS;case 35667:case 35671:return dS;case 35668:case 35672:return fS;case 35669:case 35673:return pS;case 5125:return mS;case 36294:return gS;case 36295:return _S;case 36296:return xS;case 35678:case 36198:case 36298:case 36306:case 35682:return yS;case 35679:case 36299:case 36307:return vS;case 35680:case 36300:case 36308:case 36293:return MS;case 36289:case 36303:case 36311:case 36292:return SS}}function ES(s,t){s.uniform1fv(this.addr,t)}function wS(s,t){let e=po(t,this.size,2);s.uniform2fv(this.addr,e)}function TS(s,t){let e=po(t,this.size,3);s.uniform3fv(this.addr,e)}function AS(s,t){let e=po(t,this.size,4);s.uniform4fv(this.addr,e)}function CS(s,t){let e=po(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function RS(s,t){let e=po(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function PS(s,t){let e=po(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function IS(s,t){s.uniform1iv(this.addr,t)}function LS(s,t){s.uniform2iv(this.addr,t)}function DS(s,t){s.uniform3iv(this.addr,t)}function NS(s,t){s.uniform4iv(this.addr,t)}function US(s,t){s.uniform1uiv(this.addr,t)}function FS(s,t){s.uniform2uiv(this.addr,t)}function OS(s,t){s.uniform3uiv(this.addr,t)}function BS(s,t){s.uniform4uiv(this.addr,t)}function zS(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=Pf:o=r0;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||o,r[a])}function kS(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||a0,r[o])}function VS(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||l0,r[o])}function HS(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);ze(n,r)||(s.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||o0,r[o])}function GS(s){switch(s){case 5126:return ES;case 35664:return wS;case 35665:return TS;case 35666:return AS;case 35674:return CS;case 35675:return RS;case 35676:return PS;case 5124:case 35670:return IS;case 35667:case 35671:return LS;case 35668:case 35672:return DS;case 35669:case 35673:return NS;case 5125:return US;case 36294:return FS;case 36295:return OS;case 36296:return BS;case 35678:case 36198:case 36298:case 36306:case 35682:return zS;case 35679:case 36299:case 36307:return kS;case 35680:case 36300:case 36308:case 36293:return VS;case 36289:case 36303:case 36311:case 36292:return HS}}var If=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=bS(e.type)}},Lf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=GS(e.type)}},Df=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},Cf=/(\w+)(\])?(\[|\.)?/g;function Xg(s,t){s.seq.push(t),s.map[t.id]=t}function WS(s,t,e){let n=s.name,i=n.length;for(Cf.lastIndex=0;;){let r=Cf.exec(n),o=Cf.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Xg(e,c===void 0?new If(a,s,t):new Lf(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Df(a),Xg(e,d)),e=d}}}var fo=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);WS(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function qg(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var XS=37297,qS=0;function YS(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Yg=new Zt;function ZS(s){se._getMatrix(Yg,se.workingColorSpace,s);let t=`mat3( ${Yg.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(s)){case Sr:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return _t("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Zg(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+YS(s.getShaderSource(t),a)}else return r}function $S(s,t){let e=ZS(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var JS={[nu]:"Linear",[iu]:"Reinhard",[su]:"Cineon",[ru]:"ACESFilmic",[au]:"AgX",[lu]:"Neutral",[ou]:"Custom"};function KS(s,t){let e=JS[t];return e===void 0?(_t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Mu=new C;function jS(){se.getLuminanceCoefficients(Mu);let s=Mu.x.toFixed(4),t=Mu.y.toFixed(4),e=Mu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function QS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kl).join(`
`)}function tb(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function eb(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function kl(s){return s!==""}function $g(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jg(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var nb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nf(s){return s.replace(nb,sb)}var ib=new Map;function sb(s,t){let e=ne[t];if(e===void 0){let n=ib.get(t);if(n!==void 0)e=ne[n],_t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Nf(e)}var rb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kg(s){return s.replace(rb,ob)}function ob(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jg(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var ab={[jr]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function lb(s){return ab[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var cb={[Kn]:"ENVMAP_TYPE_CUBE",[Li]:"ENVMAP_TYPE_CUBE",[zs]:"ENVMAP_TYPE_CUBE_UV"};function hb(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":cb[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var ub={[Li]:"ENVMAP_MODE_REFRACTION"};function db(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":ub[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var fb={[Qr]:"ENVMAP_BLENDING_MULTIPLY",[tf]:"ENVMAP_BLENDING_MIX",[ef]:"ENVMAP_BLENDING_ADD"};function pb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":fb[s.combine]||"ENVMAP_BLENDING_NONE"}function mb(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function gb(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=lb(e),c=hb(e),h=db(e),d=pb(e),u=mb(e),f=QS(e),p=tb(r),_=i.createProgram(),g,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(kl).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(kl).join(`
`),m.length>0&&(m+=`
`)):(g=[jg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kl).join(`
`),m=[jg(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Un?"#define TONE_MAPPING":"",e.toneMapping!==Un?ne.tonemapping_pars_fragment:"",e.toneMapping!==Un?KS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,$S("linearToOutputTexel",e.outputColorSpace),jS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(kl).join(`
`)),o=Nf(o),o=$g(o,e),o=Jg(o,e),a=Nf(a),a=$g(a,e),a=Jg(a,e),o=Kg(o),a=Kg(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===_u?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_u?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=v+g+o,y=v+m+a,w=qg(i,i.VERTEX_SHADER,b),S=qg(i,i.FRAGMENT_SHADER,y);i.attachShader(_,w),i.attachShader(_,S),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(I){if(s.debug.checkShaderErrors){let N=i.getProgramInfoLog(_)||"",z=i.getShaderInfoLog(w)||"",L=i.getShaderInfoLog(S)||"",O=N.trim(),W=z.trim(),B=L.trim(),nt=!0,Y=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(nt=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,w,S);else{let tt=Zg(i,w,"vertex"),it=Zg(i,S,"fragment");Ot("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+tt+`
`+it)}else O!==""?_t("WebGLProgram: Program Info Log:",O):(W===""||B==="")&&(Y=!1);Y&&(I.diagnostics={runnable:nt,programLog:O,vertexShader:{log:W,prefix:g},fragmentShader:{log:B,prefix:m}})}i.deleteShader(w),i.deleteShader(S),x=new fo(i,_),T=eb(i,_)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(_,XS)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=qS++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=S,this}var _b=0,Uf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ff(t),e.set(t,n)),n}},Ff=class{constructor(t){this.id=_b++,this.code=t,this.usedTimes=0}};function xb(s){return s===Ni||s===lo||s===co}function yb(s,t,e,n,i,r){let o=new Ss,a=new Uf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,T,P,I,N,z){let L=I.fog,O=N.geometry,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,nt=t.get(x.envMap||W,B),Y=nt&&nt.mapping===zs?nt.image.height:null,tt=f[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&_t("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let it=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Lt=it!==void 0?it.length:0,pt=0;O.morphAttributes.position!==void 0&&(pt=1),O.morphAttributes.normal!==void 0&&(pt=2),O.morphAttributes.color!==void 0&&(pt=3);let $t,Jt,jt,J;if(tt){let Me=Qn[tt];$t=Me.vertexShader,Jt=Me.fragmentShader}else{$t=x.vertexShader,Jt=x.fragmentShader;let Me=a.getVertexShaderStage(x),ue=a.getFragmentShaderStage(x);a.update(x,Me,ue),jt=Me.id,J=ue.id}let et=s.getRenderTarget(),xt=s.state.buffers.depth.getReversed(),Q=N.isInstancedMesh===!0,$=N.isBatchedMesh===!0,ut=!!x.map,Ut=!!x.matcap,Z=!!nt,st=!!x.aoMap,ht=!!x.lightMap,dt=!!x.bumpMap&&x.wireframe===!1,mt=!!x.normalMap,Bt=!!x.displacementMap,kt=!!x.emissiveMap,qt=!!x.metalnessMap,Qt=!!x.roughnessMap,D=x.anisotropy>0,he=x.clearcoat>0,re=x.dispersion>0,R=x.retroreflectivity>0,M=x.iridescence>0,k=x.sheen>0,G=x.transmission>0,K=D&&!!x.anisotropyMap,ft=he&&!!x.clearcoatMap,gt=he&&!!x.clearcoatNormalMap,j=he&&!!x.clearcoatRoughnessMap,at=M&&!!x.iridescenceMap,yt=M&&!!x.iridescenceThicknessMap,Vt=k&&!!x.sheenColorMap,Et=k&&!!x.sheenRoughnessMap,vt=!!x.specularMap,Ht=!!x.specularColorMap,Wt=!!x.specularIntensityMap,te=G&&!!x.transmissionMap,F=G&&!!x.thicknessMap,Mt=!!x.gradientMap,rt=!!x.alphaMap,St=x.alphaTest>0,Ct=!!x.alphaHash,ct=!!x.extensions,Gt=Un;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Gt=s.toneMapping);let Ft={shaderID:tt,shaderType:x.type,shaderName:x.name,vertexShader:$t,fragmentShader:Jt,defines:x.defines,customVertexShaderID:jt,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:$,batchingColor:$&&N._colorsTexture!==null,instancing:Q,instancingColor:Q&&N.instanceColor!==null,instancingMorph:Q&&N.morphTexture!==null,outputColorSpace:et===null?s.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ut,matcap:Ut,envMap:Z,envMapMode:Z&&nt.mapping,envMapCubeUVHeight:Y,aoMap:st,lightMap:ht,bumpMap:dt,normalMap:mt,displacementMap:Bt,emissiveMap:kt,normalMapObjectSpace:mt&&x.normalMapType===lf,normalMapTangentSpace:mt&&x.normalMapType===di,packedNormalMap:mt&&x.normalMapType===di&&xb(x.normalMap.format),metalnessMap:qt,roughnessMap:Qt,anisotropy:D,anisotropyMap:K,clearcoat:he,clearcoatMap:ft,clearcoatNormalMap:gt,clearcoatRoughnessMap:j,dispersion:re,retroreflection:R,iridescence:M,iridescenceMap:at,iridescenceThicknessMap:yt,sheen:k,sheenColorMap:Vt,sheenRoughnessMap:Et,specularMap:vt,specularColorMap:Ht,specularIntensityMap:Wt,transmission:G,transmissionMap:te,thicknessMap:F,gradientMap:Mt,opaque:x.transparent===!1&&x.blending===Bs&&x.alphaToCoverage===!1,alphaMap:rt,alphaTest:St,alphaHash:Ct,combine:x.combine,mapUv:ut&&p(x.map.channel),aoMapUv:st&&p(x.aoMap.channel),lightMapUv:ht&&p(x.lightMap.channel),bumpMapUv:dt&&p(x.bumpMap.channel),normalMapUv:mt&&p(x.normalMap.channel),displacementMapUv:Bt&&p(x.displacementMap.channel),emissiveMapUv:kt&&p(x.emissiveMap.channel),metalnessMapUv:qt&&p(x.metalnessMap.channel),roughnessMapUv:Qt&&p(x.roughnessMap.channel),anisotropyMapUv:K&&p(x.anisotropyMap.channel),clearcoatMapUv:ft&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:gt&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:at&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Et&&p(x.sheenRoughnessMap.channel),specularMapUv:vt&&p(x.specularMap.channel),specularColorMapUv:Ht&&p(x.specularColorMap.channel),specularIntensityMapUv:Wt&&p(x.specularIntensityMap.channel),transmissionMapUv:te&&p(x.transmissionMap.channel),thicknessMapUv:F&&p(x.thicknessMap.channel),alphaMapUv:rt&&p(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(mt||D),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(ut||rt),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&mt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:pt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Gt,decodeVideoTexture:ut&&x.map.isVideoTexture===!0&&se.getTransfer(x.map.colorSpace)===ce,decodeVideoTextureEmissive:kt&&x.emissiveMap.isVideoTexture===!0&&se.getTransfer(x.emissiveMap.colorSpace)===ce,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ze,flipSided:x.side===en,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ct&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&x.extensions.multiDraw===!0||$)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ft.vertexUv1s=l.has(1),Ft.vertexUv2s=l.has(2),Ft.vertexUv3s=l.has(3),l.clear(),Ft}function g(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)T.push(P),T.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(m(T,x),v(T,x),T.push(s.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function m(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function v(x,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function b(x){let T=f[x.type],P;if(T){let I=Qn[T];P=vf.clone(I.uniforms)}else P=x.uniforms;return P}function y(x,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new gb(s,T,x,i),c.push(P),h.set(T,P)),P}function w(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function A(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:y,releaseProgram:w,releaseShaderCache:S,programs:c,dispose:A}}function vb(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Mb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Qg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function t0(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,_,g,m){let v=s[t];return v===void 0?(v={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},s[t]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=p,v.materialVariant=o(u),v.groupOrder=_,v.renderOrder=u.renderOrder,v.z=g,v.group=m),t++,v}function l(u,f,p,_,g,m,v){v.reversedDepth===!0&&(g=-g);let b=a(u,f,p,_,g,m);p.transmission>0?n.push(b):p.transparent===!0?i.push(b):e.push(b)}function c(u,f,p,_,g,m){let v=a(u,f,p,_,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):e.unshift(v)}function h(u,f){e.length>1&&e.sort(u||Mb),n.length>1&&n.sort(f||Qg),i.length>1&&i.sort(f||Qg)}function d(){for(let u=t,f=s.length;u<f;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function Sb(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new t0,s.set(n,[o])):i>=r.length?(o=new t0,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function bb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new C,color:new Tt};break;case"SpotLight":e={position:new C,direction:new C,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":e={color:new Tt,position:new C,halfWidth:new C,halfHeight:new C};break}return s[t.id]=e,e}}}function Eb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var wb=0;function Tb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ab(s){let t=new bb,e=Eb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let i=new C,r=new Yt,o=new Yt;function a(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,b=0,y=0,w=0,S=0,A=0,x=0,T=0,P=0;c.sort(Tb);for(let N=0,z=c.length;N<z;N++){let L=c[N],O=L.color,W=L.intensity,B=L.distance,nt=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ni?nt=L.shadow.map.texture:nt=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*W,d+=O.g*W,u+=O.b*W;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],W);P++}else if(L.isSunLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let tt=L.shadow,it=e.get(L);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[p]=it,n.sunShadowMap[p]=nt;let Lt=tt.getViewportCount();for(let pt=0;pt<Lt;pt++)n.sunShadowMatrix[_+pt]=tt.getMatrix(pt),n.sunShadowCascade[_+pt]=tt._cascadeData[pt];_+=Lt,p++}n.sun[f]=Y,f++}else if(L.isDirectionalLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let tt=L.shadow,it=e.get(L);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,n.directionalShadow[g]=it,n.directionalShadowMap[g]=nt,n.directionalShadowMatrix[g]=L.shadow.matrix,w++}n.directional[g]=Y,g++}else if(L.isSpotLight){let Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(O).multiplyScalar(W),Y.distance=B,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[v]=Y;let tt=L.shadow;if(L.map&&(n.spotLightMap[x]=L.map,x++,tt.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[v]=tt.matrix,L.castShadow){let it=e.get(L);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,n.spotShadow[v]=it,n.spotShadowMap[v]=nt,A++}v++}else if(L.isRectAreaLight){let Y=t.get(L);Y.color.copy(O).multiplyScalar(W),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[b]=Y,b++}else if(L.isPointLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){let tt=L.shadow,it=e.get(L);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,it.shadowCameraNear=tt.camera.near,it.shadowCameraFar=tt.camera.far,n.pointShadow[m]=it,n.pointShadowMap[m]=nt,n.pointShadowMatrix[m]=L.shadow.matrix,S++}n.point[m]=Y,m++}else if(L.isHemisphereLight){let Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(W),Y.groundColor.copy(L.groundColor).multiplyScalar(W),n.hemi[y]=Y,y++}}b>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=bt.LTC_FLOAT_1,n.rectAreaLTC2=bt.LTC_FLOAT_2):(n.rectAreaLTC1=bt.LTC_HALF_1,n.rectAreaLTC2=bt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let I=n.hash;(I.sunLength!==f||I.directionalLength!==g||I.pointLength!==m||I.spotLength!==v||I.rectAreaLength!==b||I.hemiLength!==y||I.numSunShadows!==p||I.numDirectionalShadows!==w||I.numPointShadows!==S||I.numSpotShadows!==A||I.numSpotMaps!==x||I.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=g,n.spot.length=v,n.rectArea.length=b,n.point.length=m,n.hemi.length=y,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,I.sunLength=f,I.directionalLength=g,I.pointLength=m,I.spotLength=v,I.rectAreaLength=b,I.hemiLength=y,I.numSunShadows=p,I.numDirectionalShadows=w,I.numPointShadows=S,I.numSpotShadows=A,I.numSpotMaps=x,I.numLightProbes=P,n.version=wb++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,g=0,m=h.matrixWorldInverse;for(let v=0,b=c.length;v<b;v++){let y=c[v];if(y.isSunLight){let w=n.sun[d];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(m),d++}else if(y.isDirectionalLight){let w=n.directional[u];w.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),u++}else if(y.isSpotLight){let w=n.spot[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let w=n.rectArea[_];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){let w=n.point[f];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let w=n.hemi[g];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function e0(s){let t=new Ab(s),e=[],n=[],i=[];function r(u){d.camera=u,e.length=0,n.length=0,i.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){i.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Cb(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new e0(s),t.set(i,[a])):r>=o.length?(a=new e0(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Rb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ib=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Lb=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],n0=new Yt,zl=new C,Rf=new C;function Db(s,t,e){let n=new ai,i=new ot,r=new ot,o=new me,a=new Hr,l=new Gr,c={},h=e.maxTextureSize,d={[Ii]:en,[en]:Ii,[Ze]:Ze},u=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Rb,fragmentShader:Pb}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new Kt;p.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ge(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jr;let m=this.type;this.render=function(S,A,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Ud&&(_t("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=jr);let T=s.getRenderTarget(),P=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),N=s.state;N.setBlending(Jn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let z=m!==this.type;z&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=S.length;L<O;L++){let W=S[L],B=W.shadow;if(B===void 0){_t("WebGLShadowMap:",W,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);let nt=B.getFrameExtents();i.multiply(nt),r.copy(B.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/nt.x),i.x=r.x*nt.x,B.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/nt.y),i.y=r.y*nt.y,B.mapSize.y=r.y));let Y=s.state.buffers.depth.getReversed();if(B.camera._reversedDepth=Y,B.map===null||z===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Os){if(W.isPointLight){_t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new qe(i.x,i.y,{format:Ni,type:Fn,minFilter:be,magFilter:be,generateMipmaps:!1}),B.map.texture.name=W.name+".shadowMap",B.map.depthTexture=new wi(i.x,i.y,Qe),B.map.depthTexture.name=W.name+".shadowMapDepth",B.map.depthTexture.format=Xn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Pe,B.map.depthTexture.magFilter=Pe}else W.isPointLight?(B.map=new Hl(i.x),B.map.depthTexture=new ia(i.x,An)):(B.map=new qe(i.x,i.y),B.map.depthTexture=new wi(i.x,i.y,An)),B.map.depthTexture.name=W.name+".shadowMap",B.map.depthTexture.format=Xn,this.type===jr?(B.map.depthTexture.compareFunction=Y?Fl:Ul,B.map.depthTexture.minFilter=be,B.map.depthTexture.magFilter=be):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Pe,B.map.depthTexture.magFilter=Pe);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==i.x||B.map.height!==i.y)&&B.map.setSize(i.x,i.y);let tt=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();W.isPointLight!==!0&&B.updateMatrices(W,x);for(let it=0;it<tt;it++){let Lt=B.getCamera(it);if(W.isPointLight){let pt=B.camera,$t=B.matrix,Jt=W.distance||pt.far;Jt!==pt.far&&(pt.far=Jt,pt.updateProjectionMatrix()),zl.setFromMatrixPosition(W.matrixWorld),pt.position.copy(zl),Rf.copy(pt.position),Rf.add(Ib[it]),pt.up.copy(Lb[it]),pt.lookAt(Rf),pt.updateMatrixWorld(),$t.makeTranslation(-zl.x,-zl.y,-zl.z),n0.multiplyMatrices(pt.projectionMatrix,pt.matrixWorldInverse),B._frustum.setFromProjectionMatrix(n0,pt.coordinateSystem,pt.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)s.setRenderTarget(B.map,it),s.clear();else{it===0&&(s.setRenderTarget(B.map),s.clear());let pt=B.getViewport(it);o.set(r.x*pt.x,r.y*pt.y,r.x*pt.z,r.y*pt.w),N.viewport(o)}n=B.getFrustum(it),y(A,x,Lt,W,this.type)}B.isPointLightShadow!==!0&&this.type===Os&&v(B,x),B.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(T,P,I)};function v(S,A){let x=t.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new qe(i.x,i.y,{format:Ni,type:Fn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(A,null,x,u,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(A,null,x,f,_,null)}function b(S,A,x,T){let P=null,I=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)P=I;else if(P=x.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=P.uuid,z=A.uuid,L=c[N];L===void 0&&(L={},c[N]=L);let O=L[z];O===void 0&&(O=P.clone(),L[z]=O,A.addEventListener("dispose",w)),P=O}if(P.visible=A.visible,P.wireframe=A.wireframe,T===Os?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:d[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let N=s.properties.get(P);N.light=x}return P}function y(S,A,x,T,P){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===Os)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let z=t.update(S),L=S.material;if(Array.isArray(L)){let O=z.groups;for(let W=0,B=O.length;W<B;W++){let nt=O[W],Y=L[nt.materialIndex];if(Y&&Y.visible){let tt=b(S,Y,T,P);S.onBeforeShadow(s,S,A,x,z,tt,nt),s.renderBufferDirect(x,null,z,tt,S,nt),S.onAfterShadow(s,S,A,x,z,tt,nt)}}}else if(L.visible){let O=b(S,L,T,P);S.onBeforeShadow(s,S,A,x,z,O,null),s.renderBufferDirect(x,null,z,O,S,null),S.onAfterShadow(s,S,A,x,z,O,null)}}let N=S.children;for(let z=0,L=N.length;z<L;z++)y(N[z],A,x,T,P)}function w(S){S.target.removeEventListener("dispose",w);for(let x in c){let T=c[x],P=S.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function Nb(s,t){function e(){let F=!1,Mt=new me,rt=null,St=new me(0,0,0,0);return{setMask:function(Ct){rt!==Ct&&!F&&(s.colorMask(Ct,Ct,Ct,Ct),rt=Ct)},setLocked:function(Ct){F=Ct},setClear:function(Ct,ct,Gt,Ft,Me){Me===!0&&(Ct*=Ft,ct*=Ft,Gt*=Ft),Mt.set(Ct,ct,Gt,Ft),St.equals(Mt)===!1&&(s.clearColor(Ct,ct,Gt,Ft),St.copy(Mt))},reset:function(){F=!1,rt=null,St.set(-1,0,0,0)}}}function n(){let F=!1,Mt=!1,rt=null,St=null,Ct=null;return{setReversed:function(ct){if(Mt!==ct){let Gt=t.get("EXT_clip_control");ct?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT),Mt=ct;let Ft=Ct;Ct=null,this.setClear(Ft)}},getReversed:function(){return Mt},setTest:function(ct){ct?et(s.DEPTH_TEST):xt(s.DEPTH_TEST)},setMask:function(ct){rt!==ct&&!F&&(s.depthMask(ct),rt=ct)},setFunc:function(ct){if(Mt&&(ct=wg[ct]),St!==ct){switch(ct){case Fo:s.depthFunc(s.NEVER);break;case Oo:s.depthFunc(s.ALWAYS);break;case Bo:s.depthFunc(s.LESS);break;case xs:s.depthFunc(s.LEQUAL);break;case zo:s.depthFunc(s.EQUAL);break;case ko:s.depthFunc(s.GEQUAL);break;case Vo:s.depthFunc(s.GREATER);break;case Ho:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}St=ct}},setLocked:function(ct){F=ct},setClear:function(ct){Ct!==ct&&(Ct=ct,Mt&&(ct=1-ct),s.clearDepth(ct))},reset:function(){F=!1,rt=null,St=null,Ct=null,Mt=!1}}}function i(){let F=!1,Mt=null,rt=null,St=null,Ct=null,ct=null,Gt=null,Ft=null,Me=null;return{setTest:function(ue){F||(ue?et(s.STENCIL_TEST):xt(s.STENCIL_TEST))},setMask:function(ue){Mt!==ue&&!F&&(s.stencilMask(ue),Mt=ue)},setFunc:function(ue,On,ti){(rt!==ue||St!==On||Ct!==ti)&&(s.stencilFunc(ue,On,ti),rt=ue,St=On,Ct=ti)},setOp:function(ue,On,ti){(ct!==ue||Gt!==On||Ft!==ti)&&(s.stencilOp(ue,On,ti),ct=ue,Gt=On,Ft=ti)},setLocked:function(ue){F=ue},setClear:function(ue){Me!==ue&&(s.clearStencil(ue),Me=ue)},reset:function(){F=!1,Mt=null,rt=null,St=null,Ct=null,ct=null,Gt=null,Ft=null,Me=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,b=null,y=null,w=null,S=null,A=null,x=new Tt(0,0,0),T=0,P=!1,I=null,N=null,z=null,L=null,O=null,W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,nt=0,Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),B=nt>=1):Y.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),B=nt>=2);let tt=null,it={},Lt=s.getParameter(s.SCISSOR_BOX),pt=s.getParameter(s.VIEWPORT),$t=new me().fromArray(Lt),Jt=new me().fromArray(pt);function jt(F,Mt,rt,St){let Ct=new Uint8Array(4),ct=s.createTexture();s.bindTexture(F,ct),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Gt=0;Gt<rt;Gt++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(Mt,0,s.RGBA,1,1,St,0,s.RGBA,s.UNSIGNED_BYTE,Ct):s.texImage2D(Mt+Gt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ct);return ct}let J={};J[s.TEXTURE_2D]=jt(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=jt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=jt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=jt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),et(s.DEPTH_TEST),o.setFunc(xs),dt(!1),mt(Jh),et(s.CULL_FACE),st(Jn);function et(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function xt(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Q(F,Mt){return u[F]!==Mt?(s.bindFramebuffer(F,Mt),u[F]=Mt,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=Mt),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=Mt),!0):!1}function $(F,Mt){let rt=p,St=!1;if(F){rt=f.get(Mt),rt===void 0&&(rt=[],f.set(Mt,rt));let Ct=F.textures;if(rt.length!==Ct.length||rt[0]!==s.COLOR_ATTACHMENT0){for(let ct=0,Gt=Ct.length;ct<Gt;ct++)rt[ct]=s.COLOR_ATTACHMENT0+ct;rt.length=Ct.length,St=!0}}else rt[0]!==s.BACK&&(rt[0]=s.BACK,St=!0);St&&s.drawBuffers(rt)}function ut(F){return _!==F?(s.useProgram(F),_=F,!0):!1}let Ut={[es]:s.FUNC_ADD,[Od]:s.FUNC_SUBTRACT,[Bd]:s.FUNC_REVERSE_SUBTRACT};Ut[zd]=s.MIN,Ut[kd]=s.MAX;let Z={[Vd]:s.ZERO,[Hd]:s.ONE,[Gd]:s.SRC_COLOR,[tu]:s.SRC_ALPHA,[$d]:s.SRC_ALPHA_SATURATE,[Yd]:s.DST_COLOR,[Xd]:s.DST_ALPHA,[Wd]:s.ONE_MINUS_SRC_COLOR,[eu]:s.ONE_MINUS_SRC_ALPHA,[Zd]:s.ONE_MINUS_DST_COLOR,[qd]:s.ONE_MINUS_DST_ALPHA,[Jd]:s.CONSTANT_COLOR,[Kd]:s.ONE_MINUS_CONSTANT_COLOR,[jd]:s.CONSTANT_ALPHA,[Qd]:s.ONE_MINUS_CONSTANT_ALPHA};function st(F,Mt,rt,St,Ct,ct,Gt,Ft,Me,ue){if(F===Jn){g===!0&&(xt(s.BLEND),g=!1);return}if(g===!1&&(et(s.BLEND),g=!0),F!==Fd){if(F!==m||ue!==P){if((v!==es||w!==es)&&(s.blendEquation(s.FUNC_ADD),v=es,w=es),ue)switch(F){case Bs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Kh:s.blendFunc(s.ONE,s.ONE);break;case jh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Qh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ot("WebGLState: Invalid blending: ",F);break}else switch(F){case Bs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Kh:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case jh:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qh:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",F);break}b=null,y=null,S=null,A=null,x.set(0,0,0),T=0,m=F,P=ue}return}Ct=Ct||Mt,ct=ct||rt,Gt=Gt||St,(Mt!==v||Ct!==w)&&(s.blendEquationSeparate(Ut[Mt],Ut[Ct]),v=Mt,w=Ct),(rt!==b||St!==y||ct!==S||Gt!==A)&&(s.blendFuncSeparate(Z[rt],Z[St],Z[ct],Z[Gt]),b=rt,y=St,S=ct,A=Gt),(Ft.equals(x)===!1||Me!==T)&&(s.blendColor(Ft.r,Ft.g,Ft.b,Me),x.copy(Ft),T=Me),m=F,P=!1}function ht(F,Mt){F.side===Ze?xt(s.CULL_FACE):et(s.CULL_FACE);let rt=F.side===en;Mt&&(rt=!rt),dt(rt),F.blending===Bs&&F.transparent===!1?st(Jn):st(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let St=F.stencilWrite;a.setTest(St),St&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),kt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?et(s.SAMPLE_ALPHA_TO_COVERAGE):xt(s.SAMPLE_ALPHA_TO_COVERAGE)}function dt(F){I!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),I=F)}function mt(F){F!==Dd?(et(s.CULL_FACE),F!==N&&(F===Jh?s.cullFace(s.BACK):F===Nd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):xt(s.CULL_FACE),N=F}function Bt(F){F!==z&&(B&&s.lineWidth(F),z=F)}function kt(F,Mt,rt){F?(et(s.POLYGON_OFFSET_FILL),(L!==Mt||O!==rt)&&(L=Mt,O=rt,o.getReversed()&&(Mt=-Mt),s.polygonOffset(Mt,rt))):xt(s.POLYGON_OFFSET_FILL)}function qt(F){F?et(s.SCISSOR_TEST):xt(s.SCISSOR_TEST)}function Qt(F){F===void 0&&(F=s.TEXTURE0+W-1),tt!==F&&(s.activeTexture(F),tt=F)}function D(F,Mt,rt){rt===void 0&&(tt===null?rt=s.TEXTURE0+W-1:rt=tt);let St=it[rt];St===void 0&&(St={type:void 0,texture:void 0},it[rt]=St),(St.type!==F||St.texture!==Mt)&&(tt!==rt&&(s.activeTexture(rt),tt=rt),s.bindTexture(F,Mt||J[F]),St.type=F,St.texture=Mt)}function he(){let F=it[tt];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function re(){try{s.compressedTexImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function M(){try{s.texSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function k(){try{s.texSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function G(){try{s.compressedTexSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function K(){try{s.compressedTexSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function ft(){try{s.texStorage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function gt(){try{s.texStorage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function j(){try{s.texImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function at(){try{s.texImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function yt(F){return d[F]!==void 0?d[F]:s.getParameter(F)}function Vt(F,Mt){d[F]!==Mt&&(s.pixelStorei(F,Mt),d[F]=Mt)}function Et(F){$t.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),$t.copy(F))}function vt(F){Jt.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),Jt.copy(F))}function Ht(F,Mt){let rt=c.get(Mt);rt===void 0&&(rt=new WeakMap,c.set(Mt,rt));let St=rt.get(F);St===void 0&&(St=s.getUniformBlockIndex(Mt,F.name),rt.set(F,St))}function Wt(F,Mt){let St=c.get(Mt).get(F);l.get(Mt)!==St&&(s.uniformBlockBinding(Mt,St,F.__bindingPointIndex),l.set(Mt,St))}function te(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},tt=null,it={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,b=null,y=null,w=null,S=null,A=null,x=new Tt(0,0,0),T=0,P=!1,I=null,N=null,z=null,L=null,O=null,$t.set(0,0,s.canvas.width,s.canvas.height),Jt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:et,disable:xt,bindFramebuffer:Q,drawBuffers:$,useProgram:ut,setBlending:st,setMaterial:ht,setFlipSided:dt,setCullFace:mt,setLineWidth:Bt,setPolygonOffset:kt,setScissorTest:qt,activeTexture:Qt,bindTexture:D,unbindTexture:he,compressedTexImage2D:re,compressedTexImage3D:R,texImage2D:j,texImage3D:at,pixelStorei:Vt,getParameter:yt,updateUBOMapping:Ht,uniformBlockBinding:Wt,texStorage2D:ft,texStorage3D:gt,texSubImage2D:M,texSubImage3D:k,compressedTexSubImage2D:G,compressedTexSubImage3D:K,scissor:Et,viewport:vt,reset:te}}function Ub(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,M){return p?new OffscreenCanvas(R,M):br("canvas")}function g(R,M,k){let G=1,K=re(R);if((K.width>k||K.height>k)&&(G=k/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ft=Math.floor(G*K.width),gt=Math.floor(G*K.height);u===void 0&&(u=_(ft,gt));let j=M?_(ft,gt):u;return j.width=ft,j.height=gt,j.getContext("2d").drawImage(R,0,0,ft,gt),_t("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ft+"x"+gt+")."),j}else return"data"in R&&_t("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function m(R){return R.generateMipmaps}function v(R){s.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(R,M,k,G,K,ft=!1){if(R!==null){if(s[R]!==void 0)return s[R];_t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let gt;G&&(gt=t.get("EXT_texture_norm16"),gt||_t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=M;if(M===s.RED&&(k===s.FLOAT&&(j=s.R32F),k===s.HALF_FLOAT&&(j=s.R16F),k===s.UNSIGNED_BYTE&&(j=s.R8),k===s.UNSIGNED_SHORT&&gt&&(j=gt.R16_EXT),k===s.SHORT&&gt&&(j=gt.R16_SNORM_EXT)),M===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.R8UI),k===s.UNSIGNED_SHORT&&(j=s.R16UI),k===s.UNSIGNED_INT&&(j=s.R32UI),k===s.BYTE&&(j=s.R8I),k===s.SHORT&&(j=s.R16I),k===s.INT&&(j=s.R32I)),M===s.RG&&(k===s.FLOAT&&(j=s.RG32F),k===s.HALF_FLOAT&&(j=s.RG16F),k===s.UNSIGNED_BYTE&&(j=s.RG8),k===s.UNSIGNED_SHORT&&gt&&(j=gt.RG16_EXT),k===s.SHORT&&gt&&(j=gt.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.RG8UI),k===s.UNSIGNED_SHORT&&(j=s.RG16UI),k===s.UNSIGNED_INT&&(j=s.RG32UI),k===s.BYTE&&(j=s.RG8I),k===s.SHORT&&(j=s.RG16I),k===s.INT&&(j=s.RG32I)),M===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.RGB8UI),k===s.UNSIGNED_SHORT&&(j=s.RGB16UI),k===s.UNSIGNED_INT&&(j=s.RGB32UI),k===s.BYTE&&(j=s.RGB8I),k===s.SHORT&&(j=s.RGB16I),k===s.INT&&(j=s.RGB32I)),M===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),k===s.UNSIGNED_INT&&(j=s.RGBA32UI),k===s.BYTE&&(j=s.RGBA8I),k===s.SHORT&&(j=s.RGBA16I),k===s.INT&&(j=s.RGBA32I)),M===s.RGB&&(k===s.UNSIGNED_SHORT&&gt&&(j=gt.RGB16_EXT),k===s.SHORT&&gt&&(j=gt.RGB16_SNORM_EXT),k===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&(j=s.R11F_G11F_B10F)),M===s.RGBA){let at=ft?Sr:se.getTransfer(K);k===s.FLOAT&&(j=s.RGBA32F),k===s.HALF_FLOAT&&(j=s.RGBA16F),k===s.UNSIGNED_BYTE&&(j=at===ce?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT&&gt&&(j=gt.RGBA16_EXT),k===s.SHORT&&gt&&(j=gt.RGBA16_SNORM_EXT),k===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function w(R,M){let k;return R?M===null||M===An||M===Hs?k=s.DEPTH24_STENCIL8:M===Qe?k=s.DEPTH32F_STENCIL8:M===Vs&&(k=s.DEPTH24_STENCIL8,_t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===An||M===Hs?k=s.DEPTH_COMPONENT24:M===Qe?k=s.DEPTH_COMPONENT32F:M===Vs&&(k=s.DEPTH_COMPONENT16),k}function S(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Pe&&R.minFilter!==be?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function A(R){let M=R.target;M.removeEventListener("dispose",A),T(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&d.delete(M)}function x(R){let M=R.target;M.removeEventListener("dispose",x),I(M)}function T(R){let M=n.get(R);if(M.__webglInit===void 0)return;let k=R.source,G=f.get(k);if(G){let K=G[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&P(R),Object.keys(G).length===0&&f.delete(k)}n.remove(R)}function P(R){let M=n.get(R);s.deleteTexture(M.__webglTexture);let k=R.source,G=f.get(k);delete G[M.__cacheKey],o.memory.textures--}function I(R){let M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(M.__webglFramebuffer[G]))for(let K=0;K<M.__webglFramebuffer[G].length;K++)s.deleteFramebuffer(M.__webglFramebuffer[G][K]);else s.deleteFramebuffer(M.__webglFramebuffer[G]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[G])}else{if(Array.isArray(M.__webglFramebuffer))for(let G=0;G<M.__webglFramebuffer.length;G++)s.deleteFramebuffer(M.__webglFramebuffer[G]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let G=0;G<M.__webglColorRenderbuffer.length;G++)M.__webglColorRenderbuffer[G]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[G]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let k=R.textures;for(let G=0,K=k.length;G<K;G++){let ft=n.get(k[G]);ft.__webglTexture&&(s.deleteTexture(ft.__webglTexture),o.memory.textures--),n.remove(k[G])}n.remove(R)}let N=0;function z(){N=0}function L(){return N}function O(R){N=R}function W(){let R=N;return R>=i.maxTextures&&_t("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),N+=1,R}function B(R){let M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function nt(R,M){let k=n.get(R);if(R.isVideoTexture&&D(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){let G=R.image;if(G===null)_t("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)_t("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(k,R,M);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+M)}function Y(R,M){let k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){xt(k,R,M);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+M)}function tt(R,M){let k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){xt(k,R,M);return}e.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+M)}function it(R,M){let k=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){Q(k,R,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+M)}let Lt={[_r]:s.REPEAT,[an]:s.CLAMP_TO_EDGE,[xr]:s.MIRRORED_REPEAT},pt={[Pe]:s.NEAREST,[cu]:s.NEAREST_MIPMAP_NEAREST,[ks]:s.NEAREST_MIPMAP_LINEAR,[be]:s.LINEAR,[no]:s.LINEAR_MIPMAP_NEAREST,[jn]:s.LINEAR_MIPMAP_LINEAR},$t={[hf]:s.NEVER,[mf]:s.ALWAYS,[uf]:s.LESS,[Ul]:s.LEQUAL,[df]:s.EQUAL,[Fl]:s.GEQUAL,[ff]:s.GREATER,[pf]:s.NOTEQUAL};function Jt(R,M){if(M.type===Qe&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===be||M.magFilter===no||M.magFilter===ks||M.magFilter===jn||M.minFilter===be||M.minFilter===no||M.minFilter===ks||M.minFilter===jn)&&_t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,Lt[M.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,Lt[M.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,Lt[M.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,pt[M.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,pt[M.minFilter]),M.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,$t[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Pe||M.minFilter!==ks&&M.minFilter!==jn||M.type===Qe&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function jt(R,M){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",A));let G=M.source,K=f.get(G);K===void 0&&(K={},f.set(G,K));let ft=B(M);if(ft!==R.__cacheKey){K[ft]===void 0&&(K[ft]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,k=!0),K[ft].usedTimes++;let gt=K[R.__cacheKey];gt!==void 0&&(K[R.__cacheKey].usedTimes--,gt.usedTimes===0&&P(M)),R.__cacheKey=ft,R.__webglTexture=K[ft].texture}return k}function J(R,M,k){return Math.floor(Math.floor(R/k)/M)}function et(R,M,k,G){let ft=R.updateRanges;if(ft.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,k,G,M.data);else{ft.sort((Vt,Et)=>Vt.start-Et.start);let gt=0;for(let Vt=1;Vt<ft.length;Vt++){let Et=ft[gt],vt=ft[Vt],Ht=Et.start+Et.count,Wt=J(vt.start,M.width,4),te=J(Et.start,M.width,4);vt.start<=Ht+1&&Wt===te&&J(vt.start+vt.count-1,M.width,4)===Wt?Et.count=Math.max(Et.count,vt.start+vt.count-Et.start):(++gt,ft[gt]=vt)}ft.length=gt+1;let j=e.getParameter(s.UNPACK_ROW_LENGTH),at=e.getParameter(s.UNPACK_SKIP_PIXELS),yt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Vt=0,Et=ft.length;Vt<Et;Vt++){let vt=ft[Vt],Ht=Math.floor(vt.start/4),Wt=Math.ceil(vt.count/4),te=Ht%M.width,F=Math.floor(Ht/M.width),Mt=Wt,rt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,te),e.pixelStorei(s.UNPACK_SKIP_ROWS,F),e.texSubImage2D(s.TEXTURE_2D,0,te,F,Mt,rt,k,G,M.data)}R.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,j),e.pixelStorei(s.UNPACK_SKIP_PIXELS,at),e.pixelStorei(s.UNPACK_SKIP_ROWS,yt)}}function xt(R,M,k){let G=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(G=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(G=s.TEXTURE_3D);let K=jt(R,M),ft=M.source;e.bindTexture(G,R.__webglTexture,s.TEXTURE0+k);let gt=n.get(ft);if(ft.version!==gt.__version||K===!0){if(e.activeTexture(s.TEXTURE0+k),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let rt=se.getPrimaries(se.workingColorSpace),St=M.colorSpace===fi?null:se.getPrimaries(M.colorSpace),Ct=M.colorSpace===fi||rt===St?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct)}e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let at=g(M.image,!1,i.maxTextureSize);at=he(M,at);let yt=r.convert(M.format,M.colorSpace),Vt=r.convert(M.type),Et=y(M.internalFormat,yt,Vt,M.normalized,M.colorSpace,M.isVideoTexture);Jt(G,M);let vt,Ht=M.mipmaps,Wt=M.isVideoTexture!==!0,te=gt.__version===void 0||K===!0,F=ft.dataReady,Mt=S(M,at);if(M.isDepthTexture)Et=w(M.format===Di,M.type),te&&(Wt?e.texStorage2D(s.TEXTURE_2D,1,Et,at.width,at.height):e.texImage2D(s.TEXTURE_2D,0,Et,at.width,at.height,0,yt,Vt,null));else if(M.isDataTexture)if(Ht.length>0){Wt&&te&&e.texStorage2D(s.TEXTURE_2D,Mt,Et,Ht[0].width,Ht[0].height);for(let rt=0,St=Ht.length;rt<St;rt++)vt=Ht[rt],Wt?F&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,vt.width,vt.height,yt,Vt,vt.data):e.texImage2D(s.TEXTURE_2D,rt,Et,vt.width,vt.height,0,yt,Vt,vt.data);M.generateMipmaps=!1}else Wt?(te&&e.texStorage2D(s.TEXTURE_2D,Mt,Et,at.width,at.height),F&&et(M,at,yt,Vt)):e.texImage2D(s.TEXTURE_2D,0,Et,at.width,at.height,0,yt,Vt,at.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Wt&&te&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Mt,Et,Ht[0].width,Ht[0].height,at.depth);for(let rt=0,St=Ht.length;rt<St;rt++)if(vt=Ht[rt],M.format!==tn)if(yt!==null)if(Wt){if(F)if(M.layerUpdates.size>0){let Ct=yu(vt.width,vt.height,M.format,M.type);for(let ct of M.layerUpdates){let Gt=vt.data.subarray(ct*Ct/vt.data.BYTES_PER_ELEMENT,(ct+1)*Ct/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,ct,vt.width,vt.height,1,yt,Gt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,0,vt.width,vt.height,at.depth,yt,vt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,rt,Et,vt.width,vt.height,at.depth,0,vt.data,0,0);else _t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?F&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,0,vt.width,vt.height,at.depth,yt,Vt,vt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,rt,Et,vt.width,vt.height,at.depth,0,yt,Vt,vt.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Wt&&te&&e.texStorage2D(s.TEXTURE_2D,Mt,Et,Ht[0].width,Ht[0].height);for(let rt=0,St=Ht.length;rt<St;rt++)vt=Ht[rt],M.format!==tn?yt!==null?Wt?F&&e.compressedTexSubImage2D(s.TEXTURE_2D,rt,0,0,vt.width,vt.height,yt,vt.data):e.compressedTexImage2D(s.TEXTURE_2D,rt,Et,vt.width,vt.height,0,vt.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?F&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,vt.width,vt.height,yt,Vt,vt.data):e.texImage2D(s.TEXTURE_2D,rt,Et,vt.width,vt.height,0,yt,Vt,vt.data)}else if(M.isDataArrayTexture)if(Wt){if(te&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Mt,Et,at.width,at.height,at.depth),F)if(M.layerUpdates.size>0){let rt=yu(at.width,at.height,M.format,M.type);for(let St of M.layerUpdates){let Ct=at.data.subarray(St*rt/at.data.BYTES_PER_ELEMENT,(St+1)*rt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,St,at.width,at.height,1,yt,Vt,Ct)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,yt,Vt,at.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Et,at.width,at.height,at.depth,0,yt,Vt,at.data);else if(M.isData3DTexture)Wt?(te&&e.texStorage3D(s.TEXTURE_3D,Mt,Et,at.width,at.height,at.depth),F&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,yt,Vt,at.data)):e.texImage3D(s.TEXTURE_3D,0,Et,at.width,at.height,at.depth,0,yt,Vt,at.data);else if(M.isFramebufferTexture){if(te)if(Wt)e.texStorage2D(s.TEXTURE_2D,Mt,Et,at.width,at.height);else{let rt=at.width,St=at.height;for(let Ct=0;Ct<Mt;Ct++)e.texImage2D(s.TEXTURE_2D,Ct,Et,rt,St,0,yt,Vt,null),rt>>=1,St>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let rt=s.canvas;if(rt.hasAttribute("layoutsubtree")||rt.setAttribute("layoutsubtree","true"),at.parentNode!==rt){rt.appendChild(at),d.add(M),rt.onpaint=St=>{let Ct=St.changedElements;for(let ct of d)Ct.includes(ct.image)&&(ct.needsUpdate=!0)},rt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,at);else{let Ct=s.RGBA,ct=s.RGBA,Gt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ct,ct,Gt,at)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ht.length>0){if(Wt&&te){let rt=re(Ht[0]);e.texStorage2D(s.TEXTURE_2D,Mt,Et,rt.width,rt.height)}for(let rt=0,St=Ht.length;rt<St;rt++)vt=Ht[rt],Wt?F&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,yt,Vt,vt):e.texImage2D(s.TEXTURE_2D,rt,Et,yt,Vt,vt);M.generateMipmaps=!1}else if(Wt){if(te){let rt=re(at);e.texStorage2D(s.TEXTURE_2D,Mt,Et,rt.width,rt.height)}F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,yt,Vt,at)}else e.texImage2D(s.TEXTURE_2D,0,Et,yt,Vt,at);m(M)&&v(G),gt.__version=ft.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Q(R,M,k){if(M.image.length!==6)return;let G=jt(R,M),K=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+k);let ft=n.get(K);if(K.version!==ft.__version||G===!0){e.activeTexture(s.TEXTURE0+k);let gt=se.getPrimaries(se.workingColorSpace),j=M.colorSpace===fi?null:se.getPrimaries(M.colorSpace),at=M.colorSpace===fi||gt===j?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);let yt=M.isCompressedTexture||M.image[0].isCompressedTexture,Vt=M.image[0]&&M.image[0].isDataTexture,Et=[];for(let ct=0;ct<6;ct++)!yt&&!Vt?Et[ct]=g(M.image[ct],!0,i.maxCubemapSize):Et[ct]=Vt?M.image[ct].image:M.image[ct],Et[ct]=he(M,Et[ct]);let vt=Et[0],Ht=r.convert(M.format,M.colorSpace),Wt=r.convert(M.type),te=y(M.internalFormat,Ht,Wt,M.normalized,M.colorSpace),F=M.isVideoTexture!==!0,Mt=ft.__version===void 0||G===!0,rt=K.dataReady,St=S(M,vt);Jt(s.TEXTURE_CUBE_MAP,M);let Ct;if(yt){F&&Mt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,St,te,vt.width,vt.height);for(let ct=0;ct<6;ct++){Ct=Et[ct].mipmaps;for(let Gt=0;Gt<Ct.length;Gt++){let Ft=Ct[Gt];M.format!==tn?Ht!==null?F?rt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt,0,0,Ft.width,Ft.height,Ht,Ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt,te,Ft.width,Ft.height,0,Ft.data):_t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt,0,0,Ft.width,Ft.height,Ht,Wt,Ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt,te,Ft.width,Ft.height,0,Ht,Wt,Ft.data)}}}else{if(Ct=M.mipmaps,F&&Mt){Ct.length>0&&St++;let ct=re(Et[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,St,te,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(Vt){F?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Et[ct].width,Et[ct].height,Ht,Wt,Et[ct].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,te,Et[ct].width,Et[ct].height,0,Ht,Wt,Et[ct].data);for(let Gt=0;Gt<Ct.length;Gt++){let Me=Ct[Gt].image[ct].image;F?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt+1,0,0,Me.width,Me.height,Ht,Wt,Me.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt+1,te,Me.width,Me.height,0,Ht,Wt,Me.data)}}else{F?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Ht,Wt,Et[ct]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,te,Ht,Wt,Et[ct]);for(let Gt=0;Gt<Ct.length;Gt++){let Ft=Ct[Gt];F?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt+1,0,0,Ht,Wt,Ft.image[ct]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Gt+1,te,Ht,Wt,Ft.image[ct])}}}m(M)&&v(s.TEXTURE_CUBE_MAP),ft.__version=K.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function $(R,M,k,G,K,ft){let gt=r.convert(k.format,k.colorSpace),j=r.convert(k.type),at=y(k.internalFormat,gt,j,k.normalized,k.colorSpace),yt=n.get(M),Vt=n.get(k);if(Vt.__renderTarget=M,!yt.__hasExternalTextures){let Et=Math.max(1,M.width>>ft),vt=Math.max(1,M.height>>ft);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?e.texImage3D(K,ft,at,Et,vt,M.depth,0,gt,j,null):e.texImage2D(K,ft,at,Et,vt,0,gt,j,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),Qt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,G,K,Vt.__webglTexture,0,qt(M)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,G,K,Vt.__webglTexture,ft),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ut(R,M,k){if(s.bindRenderbuffer(s.RENDERBUFFER,R),M.depthBuffer){let G=M.depthTexture,K=G&&G.isDepthTexture?G.type:null,ft=w(M.stencilBuffer,K),gt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Qt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qt(M),ft,M.width,M.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,qt(M),ft,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ft,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,gt,s.RENDERBUFFER,R)}else{let G=M.textures;for(let K=0;K<G.length;K++){let ft=G[K],gt=r.convert(ft.format,ft.colorSpace),j=r.convert(ft.type),at=y(ft.internalFormat,gt,j,ft.normalized,ft.colorSpace);Qt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qt(M),at,M.width,M.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,qt(M),at,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,at,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ut(R,M,k){let G=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(M.depthTexture);if(K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),G){if(K.__webglInit===void 0&&(K.__webglInit=!0,M.depthTexture.addEventListener("dispose",A)),K.__webglTexture===void 0){K.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Jt(s.TEXTURE_CUBE_MAP,M.depthTexture);let yt=r.convert(M.depthTexture.format),Vt=r.convert(M.depthTexture.type),Et;M.depthTexture.format===Xn?Et=s.DEPTH_COMPONENT24:M.depthTexture.format===Di&&(Et=s.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,Et,M.width,M.height,0,yt,Vt,null)}}else nt(M.depthTexture,0);let ft=K.__webglTexture,gt=qt(M),j=G?s.TEXTURE_CUBE_MAP_POSITIVE_X+k:s.TEXTURE_2D,at=M.depthTexture.format===Di?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Xn)Qt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,at,j,ft,0,gt):s.framebufferTexture2D(s.FRAMEBUFFER,at,j,ft,0);else if(M.depthTexture.format===Di)Qt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,at,j,ft,0,gt):s.framebufferTexture2D(s.FRAMEBUFFER,at,j,ft,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Z(R){let M=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){let G=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),G){let K=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),M.__depthDisposeCallback=K}M.__boundDepthTexture=G}if(R.depthTexture&&!M.__autoAllocateDepthBuffer)if(k)for(let G=0;G<6;G++)Ut(M.__webglFramebuffer[G],R,G);else{let G=R.texture.mipmaps;G&&G.length>0?Ut(M.__webglFramebuffer[0],R,0):Ut(M.__webglFramebuffer,R,0)}else if(k){M.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[G]),M.__webglDepthbuffer[G]===void 0)M.__webglDepthbuffer[G]=s.createRenderbuffer(),ut(M.__webglDepthbuffer[G],R,!1);else{let K=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ft=M.__webglDepthbuffer[G];s.bindRenderbuffer(s.RENDERBUFFER,ft),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,ft)}}else{let G=R.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ut(M.__webglDepthbuffer,R,!1);else{let K=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ft=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ft),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,ft)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function st(R,M,k){let G=n.get(R);M!==void 0&&$(G.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Z(R)}function ht(R){let M=R.texture,k=n.get(R),G=n.get(M);R.addEventListener("dispose",x);let K=R.textures,ft=R.isWebGLCubeRenderTarget===!0,gt=K.length>1;if(gt||(G.__webglTexture===void 0&&(G.__webglTexture=s.createTexture()),G.__version=M.version,o.memory.textures++),ft){k.__webglFramebuffer=[];for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[j]=[];for(let at=0;at<M.mipmaps.length;at++)k.__webglFramebuffer[j][at]=s.createFramebuffer()}else k.__webglFramebuffer[j]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let j=0;j<M.mipmaps.length;j++)k.__webglFramebuffer[j]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(gt)for(let j=0,at=K.length;j<at;j++){let yt=n.get(K[j]);yt.__webglTexture===void 0&&(yt.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&Qt(R)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let j=0;j<K.length;j++){let at=K[j];k.__webglColorRenderbuffer[j]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[j]);let yt=r.convert(at.format,at.colorSpace),Vt=r.convert(at.type),Et=y(at.internalFormat,yt,Vt,at.normalized,at.colorSpace,R.isXRRenderTarget===!0),vt=qt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,Et,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+j,s.RENDERBUFFER,k.__webglColorRenderbuffer[j])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),ut(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ft){e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture),Jt(s.TEXTURE_CUBE_MAP,M);for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0)for(let at=0;at<M.mipmaps.length;at++)$(k.__webglFramebuffer[j][at],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,at);else $(k.__webglFramebuffer[j],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(M)&&v(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let j=0,at=K.length;j<at;j++){let yt=K[j],Vt=n.get(yt),Et=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Et=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Et,Vt.__webglTexture),Jt(Et,yt),$(k.__webglFramebuffer,R,yt,s.COLOR_ATTACHMENT0+j,Et,0),m(yt)&&v(Et)}e.unbindTexture()}else{let j=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(j=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(j,G.__webglTexture),Jt(j,M),M.mipmaps&&M.mipmaps.length>0)for(let at=0;at<M.mipmaps.length;at++)$(k.__webglFramebuffer[at],R,M,s.COLOR_ATTACHMENT0,j,at);else $(k.__webglFramebuffer,R,M,s.COLOR_ATTACHMENT0,j,0);m(M)&&v(j),e.unbindTexture()}R.depthBuffer&&Z(R)}function dt(R){let M=R.textures;for(let k=0,G=M.length;k<G;k++){let K=M[k];if(m(K)){let ft=b(R),gt=n.get(K).__webglTexture;e.bindTexture(ft,gt),v(ft),e.unbindTexture()}}}let mt=[],Bt=[];function kt(R){if(R.samples>0){if(Qt(R)===!1){let M=R.textures,k=R.width,G=R.height,K=s.COLOR_BUFFER_BIT,ft=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=n.get(R),j=M.length>1;if(j)for(let yt=0;yt<M.length;yt++)e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);let at=R.texture.mipmaps;at&&at.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let yt=0;yt<M.length;yt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),j){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,gt.__webglColorRenderbuffer[yt]);let Vt=n.get(M[yt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Vt,0)}s.blitFramebuffer(0,0,k,G,0,0,k,G,K,s.NEAREST),l===!0&&(mt.length=0,Bt.length=0,mt.push(s.COLOR_ATTACHMENT0+yt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(mt.push(ft),Bt.push(ft),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Bt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,mt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),j)for(let yt=0;yt<M.length;yt++){e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,gt.__webglColorRenderbuffer[yt]);let Vt=n.get(M[yt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,Vt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let M=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function qt(R){return Math.min(i.maxSamples,R.samples)}function Qt(R){let M=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function D(R){let M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function he(R,M){let k=R.colorSpace,G=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==Mr&&k!==fi&&(se.getTransfer(k)===ce?(G!==tn||K!==un)&&_t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",k)),M}function re(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=z,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=nt,this.setTexture2DArray=Y,this.setTexture3D=tt,this.setTextureCube=it,this.rebindTextures=st,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function c0(s,t){function e(n,i=fi){let r,o=se.getTransfer(i);if(n===un)return s.UNSIGNED_BYTE;if(n===Qa)return s.UNSIGNED_SHORT_4_4_4_4;if(n===tl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===du)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===fu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===hu)return s.BYTE;if(n===uu)return s.SHORT;if(n===Vs)return s.UNSIGNED_SHORT;if(n===ja)return s.INT;if(n===An)return s.UNSIGNED_INT;if(n===Qe)return s.FLOAT;if(n===Fn)return s.HALF_FLOAT;if(n===pu)return s.ALPHA;if(n===mu)return s.RGB;if(n===tn)return s.RGBA;if(n===Xn)return s.DEPTH_COMPONENT;if(n===Di)return s.DEPTH_STENCIL;if(n===el)return s.RED;if(n===io)return s.RED_INTEGER;if(n===Ni)return s.RG;if(n===nl)return s.RG_INTEGER;if(n===il)return s.RGBA_INTEGER;if(n===so||n===ro||n===oo||n===ao)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===so)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===so)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sl||n===rl||n===ol||n===al)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===al)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ll||n===cl||n===hl||n===ul||n===dl||n===lo||n===fl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ll||n===cl)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===hl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ul)return r.COMPRESSED_R11_EAC;if(n===dl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===lo)return r.COMPRESSED_RG11_EAC;if(n===fl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===pl||n===ml||n===gl||n===_l||n===xl||n===yl||n===vl||n===Ml||n===Sl||n===bl||n===El||n===wl||n===Tl||n===Al)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ml)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_l)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ml)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===El)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Tl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Al)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cl||n===Rl||n===Pl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Cl)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Il||n===Ll||n===co||n===Dl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Il)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===co)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Fb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ob=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Of=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ir(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new cn({vertexShader:Fb,fragmentShader:Ob,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new Ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bf=class extends gn{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",g=new Of,m={},v=e.getContextAttributes(),b=null,y=null,w=[],S=[],A=new ot,x=null,T=null,P=new Re;P.viewport=new me;let I=new Re;I.viewport=new me;let N=[P,I],z=new Xa,L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=w[J];return et===void 0&&(et=new bs,w[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=w[J];return et===void 0&&(et=new bs,w[J]=et),et.getGripSpace()},this.getHand=function(J){let et=w[J];return et===void 0&&(et=new bs,w[J]=et),et.getHandSpace()};function W(J){let et=S.indexOf(J.inputSource);if(et===-1)return;let xt=w[et];xt!==void 0&&(xt.update(J.inputSource,J.frame,c||o),xt.dispatchEvent({type:J.type,data:J.inputSource}))}function B(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",B),i.removeEventListener("inputsourceschange",nt);for(let J=0;J<w.length;J++){let et=S[J];et!==null&&(S[J]=null,w[J].disconnect(et))}L=null,O=null,g.reset();for(let J in m)delete m[J];if(t.setRenderTarget(b),f=null,u=null,d=null,i=null,y=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),T!==null){let J=T.camera;J.fov=T.fov,J.zoom=T.zoom,J.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&_t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&_t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(b=t.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",B),i.addEventListener("inputsourceschange",nt),v.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Q=null,$=null;v.depth&&($=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=v.stencil?Di:Xn,Q=v.stencil?Hs:An);let ut={colorFormat:e.RGBA8,depthFormat:$,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(ut),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new qe(u.textureWidth,u.textureHeight,{format:tn,type:un,depthTexture:new wi(u.textureWidth,u.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,xt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new qe(f.framebufferWidth,f.framebufferHeight,{format:tn,type:un,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),jt.setContext(i),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function nt(J){for(let et=0;et<J.removed.length;et++){let xt=J.removed[et],Q=S.indexOf(xt);Q>=0&&(S[Q]=null,w[Q].disconnect(xt))}for(let et=0;et<J.added.length;et++){let xt=J.added[et],Q=S.indexOf(xt);if(Q===-1){for(let ut=0;ut<w.length;ut++)if(ut>=S.length){S.push(xt),Q=ut;break}else if(S[ut]===null){S[ut]=xt,Q=ut;break}if(Q===-1)break}let $=w[Q];$&&$.connect(xt)}}let Y=new C,tt=new C;function it(J,et,xt){Y.setFromMatrixPosition(et.matrixWorld),tt.setFromMatrixPosition(xt.matrixWorld);let Q=Y.distanceTo(tt),$=et.projectionMatrix.elements,ut=xt.projectionMatrix.elements,Ut=$[14]/($[10]-1),Z=$[14]/($[10]+1),st=($[9]+1)/$[5],ht=($[9]-1)/$[5],dt=($[8]-1)/$[0],mt=(ut[8]+1)/ut[0],Bt=Ut*dt,kt=Ut*mt,qt=Q/(-dt+mt),Qt=qt*-dt;if(et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Qt),J.translateZ(qt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),$[10]===-1)J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let D=Ut+qt,he=Z+qt,re=Bt-Qt,R=kt+(Q-Qt),M=st*Z/he*D,k=ht*Z/he*D;J.projectionMatrix.makePerspective(re,R,M,k,D,he),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Lt(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let et=J.near,xt=J.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),z.near=I.near=P.near=et,z.far=I.far=P.far=xt,(L!==z.near||O!==z.far)&&(i.updateRenderState({depthNear:z.near,depthFar:z.far}),L=z.near,O=z.far),z.layers.mask=J.layers.mask|6,P.layers.mask=z.layers.mask&-5,I.layers.mask=z.layers.mask&-3;let Q=J.parent,$=z.cameras;Lt(z,Q);for(let ut=0;ut<$.length;ut++)Lt($[ut],Q);$.length===2?it(z,P,I):z.projectionMatrix.copy(P.projectionMatrix),T===null&&J.isPerspectiveCamera&&(T={camera:J,fov:J.fov,zoom:J.zoom}),pt(J,z,Q)};function pt(J,et,xt){xt===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(xt.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ys*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(z)},this.getCameraTexture=function(J){return m[J]};let $t=null;function Jt(J,et){if(h=et.getViewerPose(c||o),p=et,h!==null){let xt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Q=!1;xt.length!==z.cameras.length&&(z.cameras.length=0,Q=!0);for(let Z=0;Z<xt.length;Z++){let st=xt[Z],ht=null;if(f!==null)ht=f.getViewport(st);else{let mt=d.getViewSubImage(u,st);ht=mt.viewport,Z===0&&(t.setRenderTargetTextures(y,mt.colorTexture,mt.depthStencilTexture),t.setRenderTarget(y))}let dt=N[Z];dt===void 0&&(dt=new Re,dt.layers.enable(Z),dt.viewport=new me,N[Z]=dt),dt.matrix.fromArray(st.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(st.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(ht.x,ht.y,ht.width,ht.height),Z===0&&(z.matrix.copy(dt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Q===!0&&z.cameras.push(dt)}let $=i.enabledFeatures;if($&&$.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let Z=d.getDepthInformation(xt[0]);Z&&Z.isValid&&Z.texture&&g.init(Z,i.renderState)}if($&&$.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let Z=0;Z<xt.length;Z++){let st=xt[Z].camera;if(st){let ht=m[st];ht||(ht=new Ir,m[st]=ht);let dt=d.getCameraImage(st);ht.sourceTexture=dt}}}}for(let xt=0;xt<w.length;xt++){let Q=S[xt],$=w[xt];Q!==null&&$!==void 0&&$.update(Q,et,c||o)}$t&&$t(J,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}let jt=new i0;jt.setAnimationLoop(Jt),this.setAnimationLoop=function(J){$t=J},this.dispose=function(){}}},Bb=new Yt,h0=new Zt;h0.set(-1,0,0,0,1,0,0,0,1);function zb(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,yf(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,b,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,v,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===en&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===en&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let v=t.get(m),b=v.envMap,y=v.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(Bb.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(h0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let v=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function kb(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){let S=w.program;n.uniformBlockBinding(y,S)}function c(y,w){let S=i[y.id];S===void 0&&(g(y),S=h(y),i[y.id]=S,y.addEventListener("dispose",v));let A=w.program;n.updateUBOMapping(y,A);let x=t.render.frame;r[y.id]!==x&&(u(y),r[y.id]=x)}function h(y){let w=d();y.__bindingPointIndex=w;let S=s.createBuffer(),A=y.__size,x=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,A,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,S),S}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let w=i[y.id],S=y.uniforms,A=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let x=0,T=S.length;x<T;x++){let P=S[x];if(Array.isArray(P))for(let I=0,N=P.length;I<N;I++)f(P[I],x,I,A);else f(P,x,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,w,S,A){if(_(y,w,S,A)===!0){let x=y.__offset,T=y.value;if(Array.isArray(T)){let P=0;for(let I=0;I<T.length;I++){let N=T[I],z=m(N);p(N,y.__data,P),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,y.__data)}}function p(y,w,S){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,S)}function _(y,w,S,A){let x=y.value,T=w+"_"+S;if(A[T]===void 0)return typeof x=="number"||typeof x=="boolean"?A[T]=x:ArrayBuffer.isView(x)?A[T]=x.slice():A[T]=x.clone(),!0;{let P=A[T];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return A[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function g(y){let w=y.uniforms,S=0,A=16;for(let T=0,P=w.length;T<P;T++){let I=Array.isArray(w[T])?w[T]:[w[T]];for(let N=0,z=I.length;N<z;N++){let L=I[N],O=Array.isArray(L.value)?L.value:[L.value];for(let W=0,B=O.length;W<B;W++){let nt=O[W],Y=m(nt),tt=S%A,it=tt%Y.boundary,Lt=tt+it;S+=it,Lt!==0&&A-Lt<Y.storage&&(S+=A-Lt),L.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=S,S+=Y.storage}}}let x=S%A;return x>0&&(S+=A-x),y.__size=S,y.__cache={},this}function m(y){let w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?_t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):_t("WebGLRenderer: Unsupported uniform value type.",y),w}function v(y){let w=y.target;w.removeEventListener("dispose",v);let S=o.indexOf(w.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function b(){for(let y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:b}}var Vb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pi=null;function Hb(){return pi===null&&(pi=new ln(Vb,16,16,Ni,Fn),pi.name="DFG_LUT",pi.minFilter=be,pi.magFilter=be,pi.wrapS=an,pi.wrapT=an,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}var Gl=class{constructor(t={}){let{canvas:e=gf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=un}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,g=new Set([il,nl,io]),m=new Set([un,An,Vs,Hs,Qa,tl]),v=new Uint32Array(4),b=new Int32Array(4),y=new C,w=null,S=null,A=[],x=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,I=!1,N=null,z=null,L=null,O=null;this._outputColorSpace=Ge;let W=0,B=0,nt=null,Y=-1,tt=null,it=new me,Lt=new me,pt=null,$t=new Tt(0),Jt=0,jt=e.width,J=e.height,et=1,xt=null,Q=null,$=new me(0,0,jt,J),ut=new me(0,0,jt,J),Ut=!1,Z=new ai,st=!1,ht=!1,dt=new Yt,mt=new C,Bt=new me,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qt=!1;function Qt(){return nt===null?et:1}let D=n;function he(E,U){return e.getContext(E,U)}let re,R,M,k,G,K,ft,gt,j,at,yt,Vt,Et,vt,Ht,Wt,te,F,Mt,rt,St,Ct,ct;try{let E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Me,!1),e.addEventListener("webglcontextrestored",ue,!1),e.addEventListener("webglcontextcreationerror",On,!1),D===null){let U="webgl2";if(D=he(U,E),D===null)throw he(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Gt()}catch(E){throw e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",On,!1),Ot("WebGLRenderer: "+E.message),E}function Gt(){re=new JM(D),re.init(),St=new c0(D,re),R=new kM(D,re,t,St),M=new Nb(D,re),R.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),z=D.createFramebuffer(),L=D.createFramebuffer(),O=D.createFramebuffer(),k=new QM(D),G=new vb,K=new Ub(D,re,M,G,R,St,k),ft=new $M(P),gt=new ey(D),Ct=new BM(D,gt),j=new KM(D,gt,k,Ct),at=new eS(D,j,gt,Ct,k),F=new tS(D,R,K),Ht=new VM(G),yt=new yb(P,ft,re,R,Ct,Ht),Vt=new zb(P,G),Et=new Sb,vt=new Cb(re),te=new OM(P,ft,M,at,p,l),Wt=new Db(P,at,R),ct=new kb(D,k,R,M),Mt=new zM(D,re,k),rt=new jM(D,re,k),k.programs=yt.programs,P.capabilities=R,P.extensions=re,P.properties=G,P.renderLists=Et,P.shadowMap=Wt,P.state=M,P.info=k}_!==un&&(T=new iS(_,e.width,e.height,a,i,r));let Ft=new Bf(P,D);this.xr=Ft,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let E=re.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=re.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(E){E!==void 0&&(et=E,this.setSize(jt,J,!1))},this.getSize=function(E){return E.set(jt,J)},this.setSize=function(E,U,q=!0){if(Ft.isPresenting){_t("WebGLRenderer: Can't change size while VR device is presenting.");return}jt=E,J=U,e.width=Math.floor(E*et),e.height=Math.floor(U*et),q===!0&&(e.style.width=E+"px",e.style.height=U+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(jt*et,J*et).floor()},this.setDrawingBufferSize=function(E,U,q){jt=E,J=U,et=q,e.width=Math.floor(E*q),e.height=Math.floor(U*q),this.setViewport(0,0,E,U)},this.setEffects=function(E){if(_===un){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let U=0;U<E.length;U++)if(E[U].isOutputPass===!0){_t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(it)},this.getViewport=function(E){return E.copy($)},this.setViewport=function(E,U,q,V){E.isVector4?$.set(E.x,E.y,E.z,E.w):$.set(E,U,q,V),M.viewport(it.copy($).multiplyScalar(et).round())},this.getScissor=function(E){return E.copy(ut)},this.setScissor=function(E,U,q,V){E.isVector4?ut.set(E.x,E.y,E.z,E.w):ut.set(E,U,q,V),M.scissor(Lt.copy(ut).multiplyScalar(et).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(E){M.setScissorTest(Ut=E)},this.setOpaqueSort=function(E){xt=E},this.setTransparentSort=function(E){Q=E},this.getClearColor=function(E){return E.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,q=!0){let V=0;if(E){let H=!1;if(nt!==null){let At=nt.texture.format;H=g.has(At)}if(H){let At=nt.texture.type,It=m.has(At),wt=te.getClearColor(),Dt=te.getClearAlpha(),zt=wt.r,ie=wt.g,oe=wt.b;It?(v[0]=zt,v[1]=ie,v[2]=oe,v[3]=Dt,D.clearBufferuiv(D.COLOR,0,v)):(b[0]=zt,b[1]=ie,b[2]=oe,b[3]=Dt,D.clearBufferiv(D.COLOR,0,b))}else V|=D.COLOR_BUFFER_BIT}U&&(V|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),N=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",On,!1),te.dispose(),Et.dispose(),vt.dispose(),G.dispose(),ft.dispose(),at.dispose(),Ct.dispose(),ct.dispose(),yt.dispose(),Ft.dispose(),Ft.removeEventListener("sessionstart",Jf),Ft.removeEventListener("sessionend",Kf),is.stop()};function Me(E){E.preventDefault(),Er("WebGLRenderer: Context Lost."),I=!0}function ue(){Er("WebGLRenderer: Context Restored."),I=!1;let E=k.autoReset,U=Wt.enabled,q=Wt.autoUpdate,V=Wt.needsUpdate,H=Wt.type;Gt(),k.autoReset=E,Wt.enabled=U,Wt.autoUpdate=q,Wt.needsUpdate=V,Wt.type=H}function On(E){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ti(E){let U=E.target;U.removeEventListener("dispose",ti),G0(U)}function G0(E){W0(E),G.remove(E)}function W0(E){let U=G.get(E).programs;U!==void 0&&(U.forEach(function(q){yt.releaseProgram(q)}),E.isShaderMaterial&&yt.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,q,V,H,At){U===null&&(U=kt);let It=H.isMesh&&H.matrixWorld.determinantAffine()<0,wt=Y0(E,U,q,V,H);M.setMaterial(V,It);let Dt=q.index,zt=1;if(V.wireframe===!0){if(Dt=j.getWireframeAttribute(q),Dt===void 0)return;zt=2}let ie=q.drawRange,oe=q.attributes.position,Nt=ie.start*zt,de=(ie.start+ie.count)*zt;At!==null&&(Nt=Math.max(Nt,At.start*zt),de=Math.min(de,(At.start+At.count)*zt)),Dt!==null?(Nt=Math.max(Nt,0),de=Math.min(de,Dt.count)):oe!=null&&(Nt=Math.max(Nt,0),de=Math.min(de,oe.count));let Ne=de-Nt;if(Ne<0||Ne===1/0)return;Ct.setup(H,V,wt,q,Dt);let Ee,ve=Mt;if(Dt!==null&&(Ee=gt.get(Dt),ve=rt,ve.setIndex(Ee)),H.isMesh)V.wireframe===!0?(M.setLineWidth(V.wireframeLinewidth*Qt()),ve.setMode(D.LINES)):ve.setMode(D.TRIANGLES);else if(H.isLine){let $e=V.linewidth;$e===void 0&&($e=1),M.setLineWidth($e*Qt()),H.isLineSegments?ve.setMode(D.LINES):H.isLineLoop?ve.setMode(D.LINE_LOOP):ve.setMode(D.LINE_STRIP)}else H.isPoints?ve.setMode(D.POINTS):H.isSprite&&ve.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(re.get("WEBGL_multi_draw"))ve.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let $e=H._multiDrawStarts,Pt=H._multiDrawCounts,sn=H._multiDrawCount,ae=Dt?gt.get(Dt).bytesPerElement:1,Cn=G.get(V).currentProgram.getUniforms();for(let ei=0;ei<sn;ei++)Cn.setValue(D,"_gl_DrawID",ei),ve.render($e[ei]/ae,Pt[ei])}else if(H.isInstancedMesh)ve.renderInstances(Nt,Ne,H.count);else if(q.isInstancedBufferGeometry){let $e=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Pt=Math.min(q.instanceCount,$e);ve.renderInstances(Nt,Ne,Pt)}else ve.render(Nt,Ne)};function $f(E,U,q,V){N!==null&&E.isNodeMaterial&&N.setObject(V,E),st===!0&&Ht.setState(E,q,!1),E.transparent===!0&&E.side===Ze&&E.forceSinglePass===!1?(E.side=en,E.needsUpdate=!0,$l(E,U,V),E.side=Ii,E.needsUpdate=!0,$l(E,U,V),E.side=Ze):$l(E,U,V)}this.compile=function(E,U,q=null){q===null&&(q=E),N!==null&&N.renderStart(E,U,q),S=vt.get(q),S.init(U),x.push(S),q.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),E!==q&&E.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),ht=this.localClippingEnabled,st=Ht.init(this.clippingPlanes,ht),st===!0&&Ht.setGlobalState(this.clippingPlanes,U),N!==null&&Wt.render(S.state.shadowsArray,q,U);let V=new Set;return E.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let At=H.material;if(At)if(Array.isArray(At))for(let It=0;It<At.length;It++){let wt=At[It];$f(wt,q,U,H),V.add(wt)}else $f(At,q,U,H),V.add(At)}),S=x.pop(),N!==null&&N.renderEnd(),V},this.compileAsync=function(E,U,q=null){let V=this.compile(E,U,q);return new Promise(H=>{function At(){if(V.forEach(function(It){let Dt=G.get(It).currentProgram;(Dt===void 0||Dt.isReady())&&V.delete(It)}),V.size===0){H(E);return}setTimeout(At,10)}re.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let Lu=null;function X0(E){Lu&&Lu(E)}function Jf(){is.stop()}function Kf(){is.start()}let is=new i0;is.setAnimationLoop(X0),typeof self<"u"&&is.setContext(self),this.setAnimationLoop=function(E){Lu=E,Ft.setAnimationLoop(E),E===null?is.stop():is.start()},Ft.addEventListener("sessionstart",Jf),Ft.addEventListener("sessionend",Kf),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;N!==null&&N.renderStart(E,U);let q=Ft.enabled===!0&&Ft.isPresenting===!0,V=T!==null&&(nt===null||q)&&T.begin(P,nt);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ft.enabled===!0&&Ft.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ft.cameraAutoUpdate===!0&&Ft.updateCamera(U),U=Ft.getCamera()),E.isScene===!0&&E.onBeforeRender(P,E,U,nt),S=vt.get(E,x.length),S.init(U),S.state.textureUnits=K.getTextureUnits(),x.push(S),dt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Z.setFromProjectionMatrix(dt,mn,U.reversedDepth),ht=this.localClippingEnabled,st=Ht.init(this.clippingPlanes,ht),w=Et.get(E,A.length),w.init(),A.push(w),Ft.enabled===!0&&Ft.isPresenting===!0){let It=P.xr.getDepthSensingMesh();It!==null&&Du(It,U,-1/0,P.sortObjects)}Du(E,U,0,P.sortObjects),w.finish(),N!==null&&N.updateLights(S.state.lightsArray),P.sortObjects===!0&&w.sort(xt,Q),qt=Ft.enabled===!1||Ft.isPresenting===!1||Ft.hasDepthSensing()===!1,qt&&te.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&Ht.beginShadows();let H=S.state.shadowsArray;if(Wt.render(H,E,U),st===!0&&Ht.endShadows(),(V&&T.hasRenderPass())===!1){let It=w.opaque,wt=w.transmissive;if(S.setupLights(),U.isArrayCamera){let Dt=U.cameras;if(wt.length>0)for(let zt=0,ie=Dt.length;zt<ie;zt++){let oe=Dt[zt];Qf(It,wt,E,oe)}qt&&te.render(E);for(let zt=0,ie=Dt.length;zt<ie;zt++){let oe=Dt[zt];jf(w,E,oe,oe.viewport)}}else wt.length>0&&Qf(It,wt,E,U),qt&&te.render(E),jf(w,E,U)}nt!==null&&B===0&&(K.updateMultisampleRenderTarget(nt),K.updateRenderTargetMipmap(nt)),V&&T.end(P),E.isScene===!0&&E.onAfterRender(P,E,U),Ct.resetDefaultState(),Y=-1,tt=null,x.pop(),x.length>0?(S=x[x.length-1],K.setTextureUnits(S.state.textureUnits),st===!0&&Ht.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,N!==null&&N.renderEnd()};function Du(E,U,q,V){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(Z)){V&&Bt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(dt);let It=at.update(E),wt=E.material;wt.visible&&w.push(E,It,wt,q,Bt.z,null,U)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(Z))){let It=at.update(E),wt=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Bt.copy(E.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Bt.copy(It.boundingSphere.center)),Bt.applyMatrix4(E.matrixWorld).applyMatrix4(dt)),Array.isArray(wt)){let Dt=It.groups;for(let zt=0,ie=Dt.length;zt<ie;zt++){let oe=Dt[zt],Nt=wt[oe.materialIndex];Nt&&Nt.visible&&w.push(E,It,Nt,q,Bt.z,oe,U)}}else wt.visible&&w.push(E,It,wt,q,Bt.z,null,U)}}let At=E.children;for(let It=0,wt=At.length;It<wt;It++)Du(At[It],U,q,V)}function jf(E,U,q,V){let{opaque:H,transmissive:At,transparent:It}=E;S.setupLightsView(q),st===!0&&Ht.setGlobalState(P.clippingPlanes,q),V&&M.viewport(it.copy(V)),H.length>0&&Zl(H,U,q),At.length>0&&Zl(At,U,q),It.length>0&&Zl(It,U,q),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Qf(E,U,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[V.id]===void 0){let Nt=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[V.id]=new qe(1,1,{generateMipmaps:!0,type:Nt?Fn:un,minFilter:jn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:se.workingColorSpace})}let At=S.state.transmissionRenderTarget[V.id],It=V.viewport||it;At.setSize(It.z*P.transmissionResolutionScale,It.w*P.transmissionResolutionScale);let wt=P.getRenderTarget(),Dt=P.getActiveCubeFace(),zt=P.getActiveMipmapLevel();P.setRenderTarget(At),P.getClearColor($t),Jt=P.getClearAlpha(),Jt<1&&P.setClearColor(16777215,.5),P.clear(),qt&&te.render(q);let ie=P.toneMapping;P.toneMapping=Un;let oe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),S.setupLightsView(V),st===!0&&Ht.setGlobalState(P.clippingPlanes,V),Zl(E,q,V),K.updateMultisampleRenderTarget(At),K.updateRenderTargetMipmap(At),re.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let de=0,Ne=U.length;de<Ne;de++){let Ee=U[de],{object:ve,geometry:$e,material:Pt,group:sn}=Ee;if(Pt.side===Ze&&ve.layers.test(V.layers)){let ae=Pt.side;Pt.side=en,Pt.needsUpdate=!0,tp(ve,q,V,$e,Pt,sn),Pt.side=ae,Pt.needsUpdate=!0,Nt=!0}}Nt===!0&&(K.updateMultisampleRenderTarget(At),K.updateRenderTargetMipmap(At))}P.setRenderTarget(wt,Dt,zt),P.setClearColor($t,Jt),oe!==void 0&&(V.viewport=oe),P.toneMapping=ie}function Zl(E,U,q){let V=U.isScene===!0?U.overrideMaterial:null;for(let H=0,At=E.length;H<At;H++){let It=E[H],{object:wt,geometry:Dt,group:zt}=It,ie=It.material;ie.allowOverride===!0&&V!==null&&(ie=V),wt.layers.test(q.layers)&&tp(wt,U,q,Dt,ie,zt)}}function tp(E,U,q,V,H,At){N!==null&&H.isNodeMaterial&&N.setObject(E,H),E.onBeforeRender(P,U,q,V,H,At),E.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),H.onBeforeRender(P,U,q,V,E,At),H.transparent===!0&&H.side===Ze&&H.forceSinglePass===!1?(H.side=en,H.needsUpdate=!0,P.renderBufferDirect(q,U,V,H,E,At),H.side=Ii,H.needsUpdate=!0,P.renderBufferDirect(q,U,V,H,E,At),H.side=Ze):P.renderBufferDirect(q,U,V,H,E,At),E.onAfterRender(P,U,q,V,H,At)}function $l(E,U,q){U.isScene!==!0&&(U=kt);let V=G.get(E),H=S.state.lights,At=S.state.shadowsArray,It=H.state.version,wt=yt.getParameters(E,H.state,At,U,q,S.state.lightProbeGridArray),Dt=yt.getProgramCacheKey(wt),zt=V.programs;V.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?U.environment:null,V.fog=U.fog;let ie=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;V.envMap=ft.get(E.envMap||V.environment,ie),V.envMapRotation=V.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,zt===void 0&&(E.addEventListener("dispose",ti),zt=new Map,V.programs=zt);let oe=zt.get(Dt);if(oe!==void 0){if(V.currentProgram===oe&&V.lightsStateVersion===It)return np(E,wt),oe}else wt.uniforms=yt.getUniforms(E),N!==null&&E.isNodeMaterial&&N.build(E,q,wt),E.onBeforeCompile(wt,P),oe=yt.acquireProgram(wt,Dt),zt.set(Dt,oe),V.uniforms=wt.uniforms;let Nt=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Nt.clippingPlanes=Ht.uniform),np(E,wt),V.needsLights=$0(E),V.lightsStateVersion=It,V.needsLights&&(Nt.ambientLightColor.value=H.state.ambient,Nt.lightProbe.value=H.state.probe,Nt.sunLights.value=H.state.sun,Nt.sunLightShadows.value=H.state.sunShadow,Nt.directionalLights.value=H.state.directional,Nt.directionalLightShadows.value=H.state.directionalShadow,Nt.spotLights.value=H.state.spot,Nt.spotLightShadows.value=H.state.spotShadow,Nt.rectAreaLights.value=H.state.rectArea,Nt.ltc_1.value=H.state.rectAreaLTC1,Nt.ltc_2.value=H.state.rectAreaLTC2,Nt.pointLights.value=H.state.point,Nt.pointLightShadows.value=H.state.pointShadow,Nt.hemisphereLights.value=H.state.hemi,Nt.sunShadowMatrix.value=H.state.sunShadowMatrix,Nt.sunShadowCascade.value=H.state.sunShadowCascade,Nt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Nt.spotLightMatrix.value=H.state.spotLightMatrix,Nt.spotLightMap.value=H.state.spotLightMap,Nt.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=S.state.lightProbeGridArray.length>0,V.currentProgram=oe,V.uniformsList=null,oe}function ep(E){if(E.uniformsList===null){let U=E.currentProgram.getUniforms();E.uniformsList=fo.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function np(E,U){let q=G.get(E);q.outputColorSpace=U.outputColorSpace,q.batching=U.batching,q.batchingColor=U.batchingColor,q.instancing=U.instancing,q.instancingColor=U.instancingColor,q.instancingMorph=U.instancingMorph,q.skinning=U.skinning,q.morphTargets=U.morphTargets,q.morphNormals=U.morphNormals,q.morphColors=U.morphColors,q.morphTargetsCount=U.morphTargetsCount,q.numClippingPlanes=U.numClippingPlanes,q.numIntersection=U.numClipIntersection,q.vertexAlphas=U.vertexAlphas,q.vertexTangents=U.vertexTangents,q.toneMapping=U.toneMapping}function q0(E,U){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let q=0,V=E.length;q<V;q++){let H=E[q];if(H.texture!==null&&H.boundingBox.containsPoint(y))return H}return null}function Y0(E,U,q,V,H){U.isScene!==!0&&(U=kt),K.resetTextureUnits();let At=U.fog,It=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?U.environment:null,wt=nt===null?P.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:se.workingColorSpace,Dt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,zt=ft.get(V.envMap||It,Dt),ie=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,oe=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Nt=!!q.morphAttributes.position,de=!!q.morphAttributes.normal,Ne=!!q.morphAttributes.color,Ee=Un;V.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Ee=P.toneMapping);let ve=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,$e=ve!==void 0?ve.length:0,Pt=G.get(V),sn=S.state.lights;if(st===!0&&(ht===!0||E!==tt)){let Se=E===tt&&V.id===Y;Ht.setState(V,E,Se)}let ae=!1;V.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==sn.state.version||Pt.outputColorSpace!==wt||H.isBatchedMesh&&Pt.batching===!1||!H.isBatchedMesh&&Pt.batching===!0||H.isBatchedMesh&&Pt.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Pt.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Pt.instancing===!1||!H.isInstancedMesh&&Pt.instancing===!0||H.isSkinnedMesh&&Pt.skinning===!1||!H.isSkinnedMesh&&Pt.skinning===!0||H.isInstancedMesh&&Pt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Pt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Pt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Pt.instancingMorph===!1&&H.morphTexture!==null||Pt.envMap!==zt||V.fog===!0&&Pt.fog!==At||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Ht.numPlanes||Pt.numIntersection!==Ht.numIntersection)||Pt.vertexAlphas!==ie||Pt.vertexTangents!==oe||Pt.morphTargets!==Nt||Pt.morphNormals!==de||Pt.morphColors!==Ne||Pt.toneMapping!==Ee||Pt.morphTargetsCount!==$e||!!Pt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ae=!0):(ae=!0,Pt.__version=V.version);let Cn=Pt.currentProgram;ae===!0&&(Cn=$l(V,U,H),N&&V.isNodeMaterial&&N.onUpdateProgram(V,Cn,Pt));let ei=!1,Ui=!1,Xs=!1,ye=Cn.getUniforms(),Ie=Pt.uniforms;if(M.useProgram(Cn.program)&&(ei=!0,Ui=!0,Xs=!0),V.id!==Y&&(Y=V.id,Ui=!0),Pt.needsLights){let Se=q0(S.state.lightProbeGridArray,H);Pt.lightProbeGrid!==Se&&(Pt.lightProbeGrid=Se,Ui=!0)}if(ei||tt!==E){M.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ye.setValue(D,"projectionMatrix",E.projectionMatrix),ye.setValue(D,"viewMatrix",E.matrixWorldInverse);let Oi=ye.map.cameraPosition;Oi!==void 0&&Oi.setValue(D,mt.setFromMatrixPosition(E.matrixWorld)),R.logarithmicDepthBuffer&&ye.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ye.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),tt!==E&&(tt=E,Ui=!0,Xs=!0)}if(Pt.needsLights&&(sn.state.sunShadowMap.length>0&&ye.setValue(D,"sunShadowMap",sn.state.sunShadowMap,K),sn.state.directionalShadowMap.length>0&&ye.setValue(D,"directionalShadowMap",sn.state.directionalShadowMap,K),sn.state.spotShadowMap.length>0&&ye.setValue(D,"spotShadowMap",sn.state.spotShadowMap,K),sn.state.pointShadowMap.length>0&&ye.setValue(D,"pointShadowMap",sn.state.pointShadowMap,K)),H.isSkinnedMesh){ye.setOptional(D,H,"bindMatrix"),ye.setOptional(D,H,"bindMatrixInverse");let Se=H.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),ye.setValue(D,"boneTexture",Se.boneTexture,K))}H.isBatchedMesh&&(ye.setOptional(D,H,"batchingTexture"),ye.setValue(D,"batchingTexture",H._matricesTexture,K),ye.setOptional(D,H,"batchingIdTexture"),ye.setValue(D,"batchingIdTexture",H._indirectTexture,K),ye.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&ye.setValue(D,"batchingColorTexture",H._colorsTexture,K));let Fi=q.morphAttributes;if((Fi.position!==void 0||Fi.normal!==void 0||Fi.color!==void 0)&&F.update(H,q,Cn),(Ui||Pt.receiveShadow!==H.receiveShadow)&&(Pt.receiveShadow=H.receiveShadow,ye.setValue(D,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&U.environment!==null&&(Ie.envMapIntensity.value=U.environmentIntensity),Ie.dfgLUT!==void 0&&(Ie.dfgLUT.value=Hb()),Ui){if(ye.setValue(D,"toneMappingExposure",P.toneMappingExposure),Pt.needsLights&&Z0(Ie,Xs),At&&V.fog===!0&&Vt.refreshFogUniforms(Ie,At),Vt.refreshMaterialUniforms(Ie,V,et,J,S.state.transmissionRenderTarget[E.id]),Pt.needsLights&&Pt.lightProbeGrid){let Se=Pt.lightProbeGrid;Ie.probesSH.value=Se.texture,Ie.probesMin.value.copy(Se.boundingBox.min),Ie.probesMax.value.copy(Se.boundingBox.max),Ie.probesResolution.value.copy(Se.resolution)}fo.upload(D,ep(Pt),Ie,K)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(fo.upload(D,ep(Pt),Ie,K),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ye.setValue(D,"center",H.center),ye.setValue(D,"modelViewMatrix",H.modelViewMatrix),ye.setValue(D,"normalMatrix",H.normalMatrix),ye.setValue(D,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){let Se=V.uniformsGroups;for(let Oi=0,qs=Se.length;Oi<qs;Oi++){let sp=Se[Oi];ct.update(sp,Cn),ct.bind(sp,Cn)}}return Cn}function Z0(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.sunLights.needsUpdate=U,E.sunLightShadows.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function $0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(E,U,q){let V=G.get(E);V.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),G.get(E.texture).__webglTexture=U,G.get(E.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){let q=G.get(E);q.__webglFramebuffer=U,q.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,q=0){nt=E,W=U,B=q;let V=null,H=!1,At=!1;if(E){let wt=G.get(E);if(wt.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(D.FRAMEBUFFER,wt.__webglFramebuffer),it.copy(E.viewport),Lt.copy(E.scissor),pt=E.scissorTest,M.viewport(it),M.scissor(Lt),M.setScissorTest(pt),Y=-1;return}else if(wt.__webglFramebuffer===void 0)K.setupRenderTarget(E);else if(wt.__hasExternalTextures)K.rebindTextures(E,G.get(E.texture).__webglTexture,G.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let ie=E.depthTexture;if(wt.__boundDepthTexture!==ie){if(ie!==null&&G.has(ie)&&(E.width!==ie.image.width||E.height!==ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(E)}}let Dt=E.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(At=!0);let zt=G.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(zt[U])?V=zt[U][q]:V=zt[U],H=!0):E.samples>0&&K.useMultisampledRTT(E)===!1?V=G.get(E).__webglMultisampledFramebuffer:Array.isArray(zt)?V=zt[q]:V=zt,it.copy(E.viewport),Lt.copy(E.scissor),pt=E.scissorTest}else it.copy($).multiplyScalar(et).floor(),Lt.copy(ut).multiplyScalar(et).floor(),pt=Ut;if(q!==0&&(V=z),M.bindFramebuffer(D.FRAMEBUFFER,V)&&M.drawBuffers(E,V),M.viewport(it),M.scissor(Lt),M.setScissorTest(pt),H){let wt=G.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,wt.__webglTexture,q)}else if(At){let wt=U;for(let Dt=0;Dt<E.textures.length;Dt++){let zt=G.get(E.textures[Dt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Dt,zt.__webglTexture,q,wt)}}else if(E!==null&&q!==0){let wt=G.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,wt.__webglTexture,q)}Y=-1};function ip(E){let U=G.get(E);return(U.__readFormat!==E.format||U.__readType!==E.type)&&(U.__readFormat=E.format,U.__readType=E.type,U.__formatReadable=R.textureFormatReadable(E.format),U.__typeReadable=R.textureTypeReadable(E.type)),U}this.readRenderTargetPixels=function(E,U,q,V,H,At,It,wt=0){if(!(E&&E.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=G.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt){M.bindFramebuffer(D.FRAMEBUFFER,Dt);try{let zt=E.textures[wt],ie=zt.format,oe=zt.type;E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+wt);let Nt=ip(zt);if(Nt.__formatReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Nt.__typeReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-V&&q>=0&&q<=E.height-H&&D.readPixels(U,q,V,H,St.convert(ie),St.convert(oe),At)}finally{let zt=nt!==null?G.get(nt).__webglFramebuffer:null;M.bindFramebuffer(D.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(E,U,q,V,H,At,It,wt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=G.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt)if(U>=0&&U<=E.width-V&&q>=0&&q<=E.height-H){M.bindFramebuffer(D.FRAMEBUFFER,Dt);let zt=E.textures[wt],ie=zt.format,oe=zt.type;E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+wt);let Nt=ip(zt);if(Nt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Nt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let de=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,de),D.bufferData(D.PIXEL_PACK_BUFFER,At.byteLength,D.STREAM_READ),D.readPixels(U,q,V,H,St.convert(ie),St.convert(oe),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Ne=nt!==null?G.get(nt).__webglFramebuffer:null;M.bindFramebuffer(D.FRAMEBUFFER,Ne);let Ee=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Eg(D,Ee,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,de),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,At),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(de),D.deleteSync(Ee),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,q=0){let V=Math.pow(2,-q),H=Math.floor(E.image.width*V),At=Math.floor(E.image.height*V),It=U!==null?U.x:0,wt=U!==null?U.y:0;K.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,It,wt,H,At),M.unbindTexture()},this.copyTextureToTexture=function(E,U,q=null,V=null,H=0,At=0){let It,wt,Dt,zt,ie,oe,Nt,de,Ne,Ee=E.isCompressedTexture?E.mipmaps[At]:E.image;if(q!==null)It=q.max.x-q.min.x,wt=q.max.y-q.min.y,Dt=q.isBox3?q.max.z-q.min.z:1,zt=q.min.x,ie=q.min.y,oe=q.isBox3?q.min.z:0;else{let Ie=Math.pow(2,-H);It=Math.floor(Ee.width*Ie),wt=Math.floor(Ee.height*Ie),E.isDataArrayTexture?Dt=Ee.depth:E.isData3DTexture?Dt=Math.floor(Ee.depth*Ie):Dt=1,zt=0,ie=0,oe=0}V!==null?(Nt=V.x,de=V.y,Ne=V.z):(Nt=0,de=0,Ne=0);let ve=St.convert(U.format),$e=St.convert(U.type),Pt;U.isData3DTexture?(K.setTexture3D(U,0),Pt=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(K.setTexture2DArray(U,0),Pt=D.TEXTURE_2D_ARRAY):(K.setTexture2D(U,0),Pt=D.TEXTURE_2D),M.activeTexture(D.TEXTURE0),M.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),M.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),M.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);let sn=M.getParameter(D.UNPACK_ROW_LENGTH),ae=M.getParameter(D.UNPACK_IMAGE_HEIGHT),Cn=M.getParameter(D.UNPACK_SKIP_PIXELS),ei=M.getParameter(D.UNPACK_SKIP_ROWS),Ui=M.getParameter(D.UNPACK_SKIP_IMAGES);M.pixelStorei(D.UNPACK_ROW_LENGTH,Ee.width),M.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ee.height),M.pixelStorei(D.UNPACK_SKIP_PIXELS,zt),M.pixelStorei(D.UNPACK_SKIP_ROWS,ie),M.pixelStorei(D.UNPACK_SKIP_IMAGES,oe);let Xs=E.isDataArrayTexture||E.isData3DTexture,ye=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){let Ie=G.get(E),Fi=G.get(U),Se=G.get(Ie.__renderTarget),Oi=G.get(Fi.__renderTarget);M.bindFramebuffer(D.READ_FRAMEBUFFER,Se.__webglFramebuffer),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,Oi.__webglFramebuffer);for(let qs=0;qs<Dt;qs++)Xs&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,G.get(E).__webglTexture,H,oe+qs),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,G.get(U).__webglTexture,At,Ne+qs)),D.blitFramebuffer(zt,ie,It,wt,Nt,de,It,wt,D.DEPTH_BUFFER_BIT,D.NEAREST);M.bindFramebuffer(D.READ_FRAMEBUFFER,null),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||E.isRenderTargetTexture||G.has(E)){let Ie=G.get(E),Fi=G.get(U);M.bindFramebuffer(D.READ_FRAMEBUFFER,L),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,O);for(let Se=0;Se<Dt;Se++)Xs?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ie.__webglTexture,H,oe+Se):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ie.__webglTexture,H),ye?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Fi.__webglTexture,At,Ne+Se):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Fi.__webglTexture,At),H!==0?D.blitFramebuffer(zt,ie,It,wt,Nt,de,It,wt,D.COLOR_BUFFER_BIT,D.NEAREST):ye?D.copyTexSubImage3D(Pt,At,Nt,de,Ne+Se,zt,ie,It,wt):D.copyTexSubImage2D(Pt,At,Nt,de,zt,ie,It,wt);M.bindFramebuffer(D.READ_FRAMEBUFFER,null),M.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ye?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Pt,At,Nt,de,Ne,It,wt,Dt,ve,$e,Ee.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Pt,At,Nt,de,Ne,It,wt,Dt,ve,Ee.data):D.texSubImage3D(Pt,At,Nt,de,Ne,It,wt,Dt,ve,$e,Ee):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,At,Nt,de,It,wt,ve,$e,Ee.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,At,Nt,de,Ee.width,Ee.height,ve,Ee.data):D.texSubImage2D(D.TEXTURE_2D,At,Nt,de,It,wt,ve,$e,Ee);M.pixelStorei(D.UNPACK_ROW_LENGTH,sn),M.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ae),M.pixelStorei(D.UNPACK_SKIP_PIXELS,Cn),M.pixelStorei(D.UNPACK_SKIP_ROWS,ei),M.pixelStorei(D.UNPACK_SKIP_IMAGES,Ui),At===0&&U.generateMipmaps&&D.generateMipmap(Pt),M.unbindTexture()},this.initRenderTarget=function(E){G.get(E).__webglFramebuffer===void 0&&K.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?K.setTextureCube(E,0):E.isData3DTexture?K.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?K.setTexture2DArray(E,0):K.setTexture2D(E,0),M.unbindTexture()},this.resetState=function(){W=0,B=0,nt=null,M.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}};var u0={type:"change"},kf={type:"start"},f0={type:"end"},wu=new qn,d0=new pn,Gb=Math.cos(70*xu.DEG2RAD),Ve=new C,yn=2*Math.PI,_e={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},zf=1e-6,Tu=class extends Kr{constructor(t,e=null){super(t,e),this.state=_e.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ri.ROTATE,MIDDLE:Ri.DOLLY,RIGHT:Ri.PAN},this.touches={ONE:Pi.ROTATE,TWO:Pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new De,this._lastTargetPosition=new C,this._quat=new De().setFromUnitVectors(t.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Fs,this._sphericalDelta=new Fs,this._scale=1,this._panOffset=new C,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new C,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xb.bind(this),this._onPointerDown=Wb.bind(this),this._onPointerUp=qb.bind(this),this._onContextMenu=Qb.bind(this),this._onMouseWheel=$b.bind(this),this._onKeyDown=Jb.bind(this),this._onTouchStart=Kb.bind(this),this._onTouchMove=jb.bind(this),this._onMouseDown=Yb.bind(this),this._onMouseMove=Zb.bind(this),this._interceptControlDown=tE.bind(this),this._interceptControlUp=eE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=_e.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(u0),this.update(),this.state=_e.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ve.copy(e).sub(this.target),Ve.applyQuaternion(this._quat),this._spherical.setFromVector3(Ve),this.autoRotate&&this.state===_e.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=yn:n>Math.PI&&(n-=yn),i<-Math.PI?i+=yn:i>Math.PI&&(i-=yn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ve.setFromSpherical(this._spherical),Ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ve.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new C(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(wu.origin.copy(this.object.position),wu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wu.direction))<Gb?this.object.lookAt(this.target):(d0.setFromNormalAndCoplanarPoint(this.object.up,this.target),wu.intersectPlane(d0,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>zf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>zf||this._lastTargetPosition.distanceToSquared(this.target)>zf?(this.dispatchEvent(u0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?yn/60*this.autoRotateSpeed*t:yn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ve.setFromMatrixColumn(e,0),Ve.multiplyScalar(-t),this._panOffset.add(Ve)}_panUp(t,e){this.screenSpacePanning===!0?Ve.setFromMatrixColumn(e,1):(Ve.setFromMatrixColumn(e,0),Ve.crossVectors(this.object.up,Ve)),Ve.multiplyScalar(t),this._panOffset.add(Ve)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Ve.copy(i).sub(this.target);let r=Ve.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/e.clientHeight),this._rotateUp(yn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/e.clientHeight),this._rotateUp(yn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Wb(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Xb(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function qb(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(f0),this.state=_e.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Yb(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ri.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=_e.DOLLY;break;case Ri.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=_e.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=_e.ROTATE}break;case Ri.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=_e.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=_e.PAN}break;default:this.state=_e.NONE}this.state!==_e.NONE&&this.dispatchEvent(kf)}function Zb(s){switch(this.state){case _e.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case _e.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case _e.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function $b(s){this.enabled===!1||this.enableZoom===!1||this.state!==_e.NONE||(s.preventDefault(),this.dispatchEvent(kf),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(f0))}function Jb(s){this.enabled!==!1&&this._handleKeyDown(s)}function Kb(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Pi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=_e.TOUCH_ROTATE;break;case Pi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=_e.TOUCH_PAN;break;default:this.state=_e.NONE}break;case 2:switch(this.touches.TWO){case Pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=_e.TOUCH_DOLLY_PAN;break;case Pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=_e.TOUCH_DOLLY_ROTATE;break;default:this.state=_e.NONE}break;default:this.state=_e.NONE}this.state!==_e.NONE&&this.dispatchEvent(kf)}function jb(s){switch(this._trackPointer(s),this.state){case _e.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case _e.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case _e.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case _e.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=_e.NONE}}function Qb(s){this.enabled!==!1&&s.preventDefault()}function tE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function eE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Au(s){if(!s)return"z";let t=Math.abs(s.x)||0,e=Math.abs(s.y)||0,n=Math.abs(s.z)||0;return t>=e&&t>=n?"x":e>=n?"y":"z"}function nE(s,t){let e=t.x-s.x,n=t.y-s.y,i=t.z-s.z;return Math.hypot(e,n,i)}function p0(s){let t=Math.abs(Number(s)||0);return t<3?Math.max(.35,t*.45):t<8?Math.max(.8,t*.22):Math.min(8,Math.max(2.4,t*.12))}function Vf(s,t,e,n=0){return s.x>=t[0]-n&&s.x<=e[0]+n&&s.y>=t[1]-n&&s.y<=e[1]+n&&s.z>=t[2]-n&&s.z<=e[2]+n}function iE(s,t,e){if(!s.parts||!s.parts.length)return!0;if(s.pair){let n=[t.partId,e.partId];return n[0]===s.parts[0]&&n[1]===s.parts[1]||n[0]===s.parts[1]&&n[1]===s.parts[0]}return s.parts.includes(t.partId)&&s.parts.includes(e.partId)}function m0(s,t,e){let n=nE(s.point,t.point),i=[];for(let r of e||[]){if(!iE(r,s,t)||r.when&&!r.when(s,t,n))continue;if(r.kind==="chord"){let f=r.tol??p0(r.value);Math.abs(n-Number(r.value))<=f&&i.push(r);continue}if(!r.axis)continue;let o=s.point[r.axis],a=t.point[r.axis],l=Math.min(o,a),c=Math.max(o,a),h=Math.min(r.end0,r.end1),d=Math.max(r.end0,r.end1),u=r.tol??p0(d-h);Math.abs(l-h)<=u&&Math.abs(c-d)<=u&&i.push(r)}return{distance:n,hits:i}}function Hf(s){let t=[];for(let e of s||[])for(let n of e.params||[])t.includes(n)||t.push(n);return t}function g0(s){if(!s?.length)return{title:"Between the two clicks",detail:"No slider sets this distance.",params:[]};let t=Hf(s),e=s.map(n=>{let i=Number(n.named);return Number.isFinite(i)?`${n.title} (${i.toFixed(1)} mm)`:n.title});return{title:s.map(n=>n.title).join(" \xB7 "),detail:t.length?e.join(" \xB7 "):`${e.join(" \xB7 ")}. No slider sets this distance.`,params:t}}var Cu={assembled:{cover:!0,back:!0,stand:!0,photo:!0},side:{cover:!0,back:!0,stand:!0,photo:!0},cover:{cover:!0,back:!1,stand:!1,photo:!0},back:{cover:!1,back:!0,stand:!0,photo:!1}};function sE(s,t=0){return{min:[s.x0-t,s.y0-t,s.z0-t],max:[s.x1+t,s.y1+t,s.z1+t]}}function rE(s){let t=Math.abs(Number(s)||0);if(!(t<8))return Math.min(4,Math.max(1.6,t*.012))}function vn(s,t,e,n,i,r={}){let o=Math.abs(n-e);return{title:s,axis:t,end0:e,end1:n,named:o,params:i,tol:r.tol??rE(o),...r}}function _0(s){let t=Math.max(1,Number(s)||0)*.38,e=t<40||t>90,n=Math.min(90,Math.max(40,t));return{raw:t,capped:e,leg:n}}function oE(s,t){if(!t?.length)return null;let e=null,n=1/0;for(let i of t){let r=Math.hypot(s.x-i.x,s.y-i.y),o=i.r+1.4;r<=o&&r<n&&s.z<i.r+4&&(e=i,n=r)}return e}function aE(s,t){for(let e of t.rails||[]){let n=[e.wall,e.stop,...e.lips||[]];for(let i of n)if(Vf(s,[i.x0,i.y0,i.z0],[i.x1,i.y1,i.z1],.75))return i}return null}function x0(s,t){let e=t.frameBackZ;for(let n of t.tongues||[]){let i=[n.x0,n.y0,e+n.z0],r=[n.x1,n.y1,e+n.z1];if(Vf(s,i,r,.6))return{min:i,max:r}}return null}function lE(s){let t=s.plate;return{min:[-t.w/2,-t.h/2,0],max:[t.w/2,t.h/2,t.t]}}function y0(s,t){let e=s.point,n=Au(s.normal),{clip:i,photo:r,widthParams:o,heightParams:a}=t,l=t.holes||[];if(s.partId==="photo"){let c=Math.abs(Math.abs(e.x)-r.w/2)<3,h=Math.abs(Math.abs(e.y)-r.h/2)<3,d=[];return(c||!h)&&d.push(t.photoWKey||"photoW"),(h||!c)&&d.push(t.photoHKey||"photoH"),{title:"Photo",detail:"Preview only. Width and height size this rectangle. The gap under the cover is fixed.",params:[...new Set(d)],box:{min:[-r.w/2,-r.h/2,e.z-.2],max:[r.w/2,r.h/2,e.z+.2]}}}if(s.partId==="stand"){let c=i.pegStand,h=_0(i.outerH),d=["standHoles"],u="Stand",f="Lean uses the Slight / Medium / More buttons, which move the peg row.";n==="y"?(u="Stand sheet",f=`Sheet is ${c.sheetT.toFixed(1)} mm thick. No slider sets that thickness. ${f}`):n==="z"?(u="Stand leg",h.capped?f=`Leg length is capped at ${h.leg.toFixed(1)} mm (40\u201390 mm), so frame size is not changing it. ${f}`:(f=`Leg length follows the frame height (${h.leg.toFixed(1)} mm). ${f}`,d.push(...a))):(u="Stand width",f=`Leg spacing follows the back width (${(c.halfSpan*2).toFixed(1)} mm across). ${f}`,d.push(...o));let p=c.yHole-c.sheetT/2;return{title:u,detail:f,params:d,box:{min:[-c.halfSpan-c.legW/2,p,-c.legReach],max:[c.halfSpan+c.legW/2,p+c.sheetT,c.pegLen]}}}if(s.partId==="back"){let c=oE(e,l);if(c){let u=["hangHoleDiameter","hangInsetTop","hangHoles"];return l.length>1&&u.push("hangInsetSide",t.photoWKey||"photoW"),u.push(t.photoHKey||"photoH"),{title:"Hang hole",detail:"Hole in the back plate. From-top and from-side insets place it.",params:u,box:{min:[c.x-c.r,c.y-c.r,-.2],max:[c.x+c.r,c.y+c.r,i.plate.t+.4]}}}let h=aE(e,i);if(h)return{title:"Slide rail",detail:"The rail follows the border. Tongue and lip sizes are not separate sliders.",params:[...o,...a,"plateThickness"],box:sE(h,0)};let d=lE(i);return n==="z"?{title:"Back plate",detail:"Plate thickness.",params:["plateThickness"],box:d}:n==="x"?{title:"Back width",detail:"The plate sits just inside the cover.",params:o,box:d}:{title:"Back height",detail:"The plate sits just inside the cover.",params:a,box:d}}return null}function v0(s){let{clip:t,photo:e,outer:n,opening:i,widthParams:r,heightParams:o}=s,a=s.photoWKey||"photoW",l=s.photoHKey||"photoH",c=[vn("Outer width","x",-n.w/2,n.w/2,r,{parts:["cover","back"]}),vn("Outer height","y",-n.h/2,n.h/2,o,{parts:["cover","back"]}),vn("Photo width","x",-e.w/2,e.w/2,[a],{parts:["photo"]}),vn("Photo height","y",-e.h/2,e.h/2,[l],{parts:["photo"]}),vn("Opening width","x",-i.w/2,i.w/2,s.openingWidthParams||r,{parts:["cover"]}),vn("Opening height","y",-i.h/2,i.h/2,s.openingHeightParams||o,{parts:["cover"]}),vn("Back width","x",-t.plate.w/2,t.plate.w/2,r,{parts:["back"]}),vn("Back height","y",-t.plate.h/2,t.plate.h/2,o,{parts:["back"]}),vn("Back thickness","z",0,t.plate.t,["plateThickness"],{parts:["back"]})],h=s.holes||[];if(h.length===2){let u=Math.abs(h[0].x);c.push(vn("Hang hole spacing","x",-u,u,[a,"hangInsetSide"],{parts:["back"]}))}if(h.length){let u=h[0].y;c.push(vn("Hang hole from top of photo","y",u,e.h/2,[l,"hangInsetTop"],{parts:["back","photo"],pair:!0})),c.push({title:"Hang hole diameter",kind:"chord",value:h[0].r*2,named:h[0].r*2,params:["hangHoleDiameter"],parts:["back"]})}let d=t.pegStand;if(d?.cut){let u=_0(t.outerH);c.push(vn("Stand leg","z",-d.legReach,0,u.capped?[]:o,{parts:["stand"],note:u.capped?`Leg length is capped at ${u.leg.toFixed(1)} mm (40\u201390 mm). No slider changes it at this size.`:"",when:(p,_)=>Math.abs(p.point.x-_.point.x)<d.legW&&Math.abs(p.point.y-_.point.y)<d.sheetT+2})),c.push(vn("Leg spacing","x",-d.halfSpan,d.halfSpan,r,{parts:["stand"],when:(p,_)=>Math.abs(p.point.z-_.point.z)<12}));let f=d.yHole-d.sheetT/2;c.push(vn("Stand sheet","y",f,f+d.sheetT,[],{parts:["stand"],note:`Stand sheet is ${d.sheetT.toFixed(1)} mm thick. No slider sets it.`,when:(p,_)=>Math.abs(p.point.x-_.point.x)<10&&Math.abs(p.point.z-_.point.z)<10}))}return c}function M0(s,t,e){let{hits:n}=m0(s,t,e),i=g0(n);if(!n.length)return i;let r=Hf(n),o=n.map(a=>a.note).find(Boolean);return o&&!r.length&&(i.detail=o),i}function cE(s,t){let e=new Ji(s,t,Math.max(8,Math.round(t/2)),0,Math.PI*2,0,Math.PI/2);return e.rotateX(Math.PI/2),e}var Ru=class{constructor({canvas3d:t,canvas2d:e,onToggle:n}){this.canvas3d=t,this.canvas2d=e,this.onToggle=n,this.photoImage=null,this.layout=null,this.params=null,this.hoverId=null,this.renderer=new Gl({canvas:t,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=Ge,this.scene=new Es,this.scene.background=new Tt(15327700),this.camera=new Re(32,1,1,4e3),this.camera.position.set(40,25,300),this.controls=new Tu(this.camera,t),this.controls.enableDamping=!0,this.controls.target.set(0,0,6),this.group=new Xe,this.scene.add(this.group),this.scene.add(new Us(16777215,.7));let i=new ts(16777215,1.05);i.position.set(60,-40,220),this.scene.add(i);let r=new ts(16777215,.45);r.position.set(-120,90,40),this.scene.add(r),this.beadMatA=new Tn({color:2696484,roughness:.32,metalness:.12,side:Ze}),this.beadMatB=new Tn({color:11817737,roughness:.32,metalness:.12,side:Ze}),this.ghostMat=new Tn({color:7893356,roughness:.4,transparent:!0,opacity:.28,depthWrite:!1,side:Ze}),this.plateMat=new Tn({color:14078929,roughness:.7,metalness:.05}),this.standMat=new Tn({color:4472892,roughness:.55,metalness:.04}),this.holeMat=new _n({color:4472892,side:Ze}),this.slotMat=new Tn({color:5722958,roughness:.7,metalness:.04}),this.photoMat=new _n({color:16119284,side:Ze}),this.beadMeshes=[],this.photoMesh=null,this.plateMesh=null,this.partView="assembled",this._userShow={...Cu.assembled},this._v=new C,this._n=new C,this.tempGeoms=[],this.geomCache=new Map,this.running=!0,this._loop=this._loop.bind(this),requestAnimationFrame(this._loop),e.addEventListener("pointerdown",o=>this._on2dPointer(o)),e.addEventListener("pointermove",o=>this._on2dMove(o)),e.addEventListener("pointerleave",()=>{this.hoverId=null,this._draw2d()}),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t.parentElement||t)}setPhotoImage(t){if(this.photoImage=t,this.photoMat.map&&(this.photoMat.map.dispose(),this.photoMat.map=null),t){let e=new Te(t);e.colorSpace=Ge,e.needsUpdate=!0,this.photoMat.map=e,this.photoMat.color.set(16777215)}else this.photoMat.color.set(16119284);this.photoMat.needsUpdate=!0,this._draw2d()}update(t){return this.params=t,this.layout=ni(t),this._rebuild3d(),this._draw2d(),this.layout}setPartView(t){return this.partView=t==="cover"||t==="back"||t==="side"?t:"assembled",this.setShown(Cu[this.partView]||Cu.assembled),this._applyPose(),this.fit(),{...this._userShow}}setShown(t){this._userShow={...this._userShow,...t||{}},this._applyShown()}_applyShown(){if(!this.coverGroup)return;let t=this._userShow;this.coverGroup.visible=t.cover!==!1,this.photoGroup.visible=t.photo!==!1,this.backGroup.visible=t.back!==!1,this.standGroup.visible=t.stand!==!1&&!!this._clip?.pegStand?.cut}toContent(t){if(!t?.point||!this.content)return t;this.group.updateMatrixWorld(!0),this._v.set(t.point.x,t.point.y,t.point.z),this.content.worldToLocal(this._v);let e={x:this._v.x,y:this._v.y,z:this._v.z},n=t.normal;if(t.normal){this._n.set(t.normal.x,t.normal.y,t.normal.z);let i=new Zt().getNormalMatrix(this.content.matrixWorld).invert();this._n.applyMatrix3(i).normalize(),n={x:this._n.x,y:this._n.y,z:this._n.z}}return{...t,point:e,normal:n}}worldBox(t){if(!t?.min||!t?.max||!this.content)return t;this.group.updateMatrixWorld(!0);let e=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],[i,r,o]=t.min,[a,l,c]=t.max;for(let h of[i,a])for(let d of[r,l])for(let u of[o,c])this._v.set(h,d,u),this.content.localToWorld(this._v),e[0]=Math.min(e[0],this._v.x),e[1]=Math.min(e[1],this._v.y),e[2]=Math.min(e[2],this._v.z),n[0]=Math.max(n[0],this._v.x),n[1]=Math.max(n[1],this._v.y),n[2]=Math.max(n[2],this._v.z);return{min:e,max:n}}toWorld(t,e,n){return this.group.updateMatrixWorld(!0),this._v.set(t,e,n),this.content.localToWorld(this._v),{x:this._v.x,y:this._v.y,z:this._v.z}}_applyPose(){if(!this.pose||!this.layout)return;let e=(this.partView==="assembled"||this.partView==="side")&&this._clip?.pegStand?.cut?this._clip.pegStand.angleRad:0,n=-this.layout.outer.h/2;this.content.position.y=-n,this.pose.position.y=n,this.pose.rotation.x=-e}resize(){let t=this.canvas3d,e=t.parentElement||t,n=Math.max(1,e.clientWidth),i=Math.max(1,e.clientHeight);this.renderer.setSize(n,i,!1),this.camera.aspect=n/i,this.camera.updateProjectionMatrix(),this._draw2d()}fit(){if(!this.layout)return;let t=Math.max(this.layout.outer.w,this.layout.outer.h,40),e=t*1.85,n=this._clip?.pegStand?.legReach||t*.3;this.camera.up.set(0,1,0),this.partView==="side"?(this.camera.position.set(e*.78,t*.04,-e*.7),this.controls.target.set(0,-t*.02,-n*.22)):this.partView==="back"?(this.camera.position.set(e*.14,-e*.02,-e),this.controls.target.set(0,0,-n*.18)):(this.camera.position.set(0,0,e),this.controls.target.set(0,0,this.partView==="cover"?this.layout.radius*.2:0)),this.controls.update()}dispose(){this.running=!1,this.ro.disconnect(),this.controls.dispose(),this.renderer.dispose();for(let t of this.geomCache.values())t.dispose();for(let t of this.tempGeoms)t.dispose()}_trackGeom(t){return this.tempGeoms.push(t),t}_clearTemps(){for(let t of this.tempGeoms)t.dispose();this.tempGeoms=[]}_hemiGeom(t,e){let n=`${t.toFixed(3)}:${e}`;return this.geomCache.has(n)||this.geomCache.set(n,cE(t,e)),this.geomCache.get(n)}_addBox(t,e,n){let i=e.x1-e.x0,r=e.y1-e.y0,o=e.z1-e.z0;if(i<1e-4||r<1e-4||o<1e-4)return;let a=new ge(this._trackGeom(new li(i,r,o)),n);a.position.set((e.x0+e.x1)/2,(e.y0+e.y1)/2,(e.z0+e.z1)/2),t.add(a)}_rebuild3d(){let t=this.layout;for(;this.group.children.length;)this.group.remove(this.group.children[0]);this._clearTemps(),this.beadMeshes=[];let e=si(t);this._clip=e,this.pose=new Xe,this.content=new Xe,this.pose.add(this.content),this.group.add(this.pose),this.coverGroup=new Xe,this.coverGroup.position.z=e.frameBackZ,this.backGroup=new Xe,this.standGroup=new Xe,this.photoGroup=new Xe,this.content.add(this.backGroup),this.content.add(this.standGroup),this.content.add(this.photoGroup),this.content.add(this.coverGroup);let n=Math.min(28,Math.max(16,Math.round(t.params.segments/2))),i=this._hemiGeom(t.radius,n);this.beadMatA.color.set(t.params.colorA||"#292524"),this.beadMatB.color.set(t.params.colorB||"#b45309");for(let o of t.beads){let a=o.enabled?o.colorIndex===1?this.beadMatB:this.beadMatA:this.ghostMat,l=new ge(i,a);l.position.set(o.x,o.y,0),l.userData.id=o.id,this.coverGroup.add(l),this.beadMeshes.push(l)}for(let o of e.tongues)this._addBox(this.coverGroup,o,this.slotMat);this.plateMesh=new ge(this._plateGeom(t,e),this.plateMat),this.backGroup.add(this.plateMesh);for(let o of e.rails){this._addBox(this.backGroup,o.wall,this.slotMat),this._addBox(this.backGroup,o.stop,this.slotMat);for(let a of o.lips)this._addBox(this.backGroup,a,this.slotMat)}if(e.pegStand?.cut)for(let o of rp(e.pegStand))this._addBox(this.standGroup,o,this.standMat);let r=this._trackGeom(new Ai(t.photo.w,t.photo.h));this.photoMesh=new ge(r,this.photoMat),this.photoMesh.position.set(0,0,e.frameBackZ-e.photoGap*.45),this.photoGroup.add(this.photoMesh);for(let o of ii(t.params)){let a=new ge(this._trackGeom(new Ps(Math.max(1.2,o.r*.45),o.r,28)),this.holeMat);a.position.set(o.x,o.y,e.plate.t+.05),this.backGroup.add(a)}this._applyShown(),this._applyPose()}_plateGeom(t,e){let n=e.plate.t,i=ii(t.params),r=ap(e),o=new ci;o.moveTo(r[0][0],r[0][1]);for(let l=1;l<r.length;l++)o.lineTo(r[l][0],r[l][1]);o.closePath();for(let l of i){let c=new Zn;c.absarc(l.x,l.y,l.r,0,Math.PI*2,!1),o.holes.push(c)}if(e.pegStand?.cut)for(let l of e.pegStand.holes){let c=new Zn,h=l.x-l.w/2,d=l.x+l.w/2,u=l.y-l.h/2,f=l.y+l.h/2;c.moveTo(h,u),c.lineTo(d,u),c.lineTo(d,f),c.lineTo(h,f),c.closePath(),o.holes.push(c)}let a=new Rs(o,{depth:n,bevelEnabled:!1,curveSegments:20});return this._trackGeom(a)}_loop(){this.running&&(this.controls.update(),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this._loop))}_worldFrom2d(t){let n=this.canvas2d.getBoundingClientRect(),i=t.clientX-n.left,r=t.clientY-n.top,o=this._map2d();return{x:(i-o.ox)/o.scale,y:-(r-o.oy)/o.scale}}_map2d(){let t=this.canvas2d,e=Math.min(window.devicePixelRatio||1,2),n=t.clientWidth||1,i=t.clientHeight||1,r=n,o=i;(t.width!==Math.round(n*e)||t.height!==Math.round(i*e))&&(t.width=Math.round(n*e),t.height=Math.round(i*e));let a=this.layout,l=16,c=a?a.outer.w:100,h=a?a.outer.h:100;return{scale:Math.min((r-l*2)/c,(o-l*2)/h),ox:r/2,oy:o/2,w:r,h:o,dpr:e}}_on2dMove(t){if(!this.layout)return;let e=this._worldFrom2d(t);this.hoverId=this._hitBead(e),this.canvas2d.style.cursor=this.hoverId?"pointer":"default",this._draw2d()}_on2dPointer(t){if(!this.layout)return;let e=this._worldFrom2d(t),n=this._hitBead(e);n&&(t.preventDefault(),this.onToggle(n))}_hitBead(t){let e=this.layout.radius,n=null,i=e*1.15;for(let r of this.layout.beads){let o=Math.hypot(r.x-t.x,r.y-t.y);o<=i&&(i=o,n=r.id)}return n}_draw2d(){let e=this.canvas2d.getContext("2d"),n=this._map2d();if(e.setTransform(n.dpr,0,0,n.dpr,0,0),e.clearRect(0,0,n.w,n.h),e.fillStyle="#f4efe6",e.fillRect(0,0,n.w,n.h),!this.layout)return;let i=f=>n.ox+f*n.scale,r=f=>n.oy-f*n.scale,{photo:o,opening:a,radius:l,beads:c,params:h}=this.layout;e.save(),e.fillStyle="#d6d3d1",e.fillRect(i(-o.w/2)-4,r(o.h/2)-4,o.w*n.scale+8,o.h*n.scale+8),e.fillStyle="#fff",e.fillRect(i(-o.w/2),r(o.h/2),o.w*n.scale,o.h*n.scale),this.photoImage?e.drawImage(this.photoImage,i(-o.w/2),r(o.h/2),o.w*n.scale,o.h*n.scale):(e.strokeStyle="#a8a29e",e.setLineDash([4,4]),e.strokeRect(i(-o.w/2),r(o.h/2),o.w*n.scale,o.h*n.scale),e.setLineDash([]),e.fillStyle="#a8a29e",e.font="12px system-ui, sans-serif",e.textAlign="center",e.fillText("photo",i(0),r(0))),e.beginPath(),e.rect(i(-a.w/2),r(a.h/2),a.w*n.scale,a.h*n.scale),e.strokeStyle="rgba(124, 45, 18, 0.55)",e.lineWidth=1,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]);for(let f of c){let p=f.id===this.hoverId;if(e.beginPath(),e.arc(i(f.x),r(f.y),l*n.scale,0,Math.PI*2),f.enabled){let _=f.colorIndex===1?h.colorB:h.colorA;e.fillStyle=p?"#44403c":_||"#292524",e.fill(),e.strokeStyle="rgba(255,255,255,0.18)",e.lineWidth=1,e.stroke()}else e.fillStyle="rgba(120, 113, 108, 0.16)",e.fill(),e.setLineDash([3,3]),e.strokeStyle=p?"#44403c":"#a8a29e",e.lineWidth=1.5,e.stroke(),e.setLineDash([])}let d=ii(h);for(let f of d){let p=Math.max(f.r*n.scale,5);e.beginPath(),e.arc(i(f.x),r(f.y),p,0,Math.PI*2),e.fillStyle="#f5f5f4",e.fill(),e.strokeStyle="#44403c",e.lineWidth=2,e.stroke(),e.beginPath(),e.arc(i(f.x),r(f.y),p*.4,0,Math.PI*2),e.fillStyle="#a8a29e",e.fill()}let u=dp(this.layout.outer.w,this.layout.outer.h,h.outerCornerRadius,12);e.beginPath(),e.moveTo(i(u[0][0]),r(u[0][1]));for(let f=1;f<u.length;f++)e.lineTo(i(u[f][0]),r(u[f][1]));e.closePath(),e.strokeStyle="rgba(124, 45, 18, 0.35)",e.lineWidth=1.25,e.stroke(),e.fillStyle="#78716c",e.font="11px system-ui, sans-serif",e.textAlign="left",e.fillText(`click a circle to ${this.hoverId?"toggle":"add / remove"}`,10,n.h-10),e.restore()}};function Xl(s,t,e){let n=t.x1-t.x0,i=t.y1-t.y0,r=t.z1-t.z0;if(n<1e-4||i<1e-4||r<1e-4)return null;let o=s.cube([n,i,r],!0).translate((t.x0+t.x1)/2,(t.y0+t.y1)/2,(t.z0+t.z1)/2);return e.push(o),o}function Wl(s,t,e,n){let i=Xl(s,e,n);if(!i)return t;let r=t.add(i);return n.push(r),r}function hE(s,t,e,n){let i=Xl(s,e,n);if(!i)return t;let r=t.subtract(i);return n.push(r),r}function uE(s,t,e,n){let i=Math.min(e.plateCorner||0,e.plate.w/2-.5,e.plate.h/2-.5);if(i<.2)return t;let r=e.plate.t+6,o=e.plate.w/2,a=e.plate.h/2,l=t;for(let[c,h]of[[1,1],[-1,1],[1,-1],[-1,-1]]){let d=c*o,u=h*a,f=d-c*i,p=u-h*i,_=s.cube([i+.6,i+.6,r],!0).translate(d-c*i/2,u-h*i/2,r/2-1);n.push(_);let g=s.cylinder(r+2,i,i,40,!0).translate(f,p,r/2-1);n.push(g);let m=_.intersect(g);n.push(m);let v=_.subtract(m);n.push(v),l=l.subtract(v),n.push(l)}return l}function S0(s,t,e,n){let i=t,r=(e.relief||[]).map(o=>Xl(s,o,n)).filter(Boolean);if(r.length){let o=r.length===1?r[0]:s.union(r);o!==r[0]&&n.push(o),i=i.subtract(o),n.push(i)}for(let o of e.tongues)i=Wl(s,i,o,n);return i}function b0(s,t,e,n){let i=Xl(s,t.slab,n);i=uE(s,i,t,n);for(let r of t.rails){i=Wl(s,i,r.wall,n);for(let o of r.lips)i=Wl(s,i,o,n);i=Wl(s,i,r.stop,n)}if(t.pegStand&&t.pegStand.cut)for(let r of t.pegStand.holes)i=hE(s,i,r.box,n);if(e&&e.length){let r=e.map(a=>{let l=s.cylinder(t.plate.t+4,a.r,a.r,36,!0).translate(a.x,a.y,t.plate.t/2);return n.push(l),l}),o=r.length===1?r[0]:s.union(r);o!==r[0]&&n.push(o),i=i.subtract(o),n.push(i)}return i}function E0(s,t,e){let n=t.pegStand;if(!n||!n.cut)return null;let i=null;for(let r of n.boxes)i=i?Wl(s,i,r,e):Xl(s,r,e);return i}var w0="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js",dE="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm",Gf=null;async function Wf(){return Gf||(Gf=import(typeof window<"u"?w0:"manifold-3d").catch(()=>import(w0)).then(t=>(t.default||t)(typeof window<"u"?{locateFile:i=>i.endsWith(".wasm")?dE:i}:{})).then(t=>(t.setup(),t))),Gf}function Xf(s){for(let t of s)if(t&&typeof t.delete=="function")try{t.delete()}catch{}}function fE(s,t,e,n,i,r,o){let a=i;if(a<.05)return t;let l=Math.max(r,.5)+2,c=t,h=[[1,1],[-1,1],[1,-1],[-1,-1]];for(let[d,u]of h){let f=d*e/2,p=u*n/2,_=f-d*a,g=p-u*a,m=s.cube([a,a,l],!0).translate(f-d*a/2,p-u*a/2,l/2-1);o.push(m);let v=s.cylinder(l+2,a,a,48,!0).translate(_,g,l/2-1);o.push(v);let b=m.intersect(v);o.push(b);let y=m.subtract(b);o.push(y),c=c.subtract(y),o.push(c)}return c}async function T0(s){let t=ni(s),e=t.enabled;if(e.length===0)throw new Error("No beads to export \u2014 turn some circles back on.");let n=await Wf(),{Manifold:i,CrossSection:r,setCircularSegments:o}=n,a=t.params.segments,l=t.radius,c=t.params.webThickness;o(a);let h=[];try{let d=i.sphere(l,a);h.push(d);let u=d.trimByPlane([0,0,1],0);h.push(u);let f=e.map(S=>{let A=u.translate(S.x,S.y,0);return h.push(A),A});if(c>.001){let S=e.map(T=>{let P=r.circle(l,a).translate(T.x,T.y);return h.push(P),P}),A=S.length===1?S[0]:r.union(S);A!==S[0]&&h.push(A);let x=A.extrude(c);h.push(x),f.push(x)}let p=f.length===1?f[0]:i.union(f);p!==f[0]&&h.push(p);let _=l*2+c,g=fE(i,p,t.outer.w,t.outer.h,t.params.outerCornerRadius,_,h);g!==p&&h.push(g);let m=S0(i,g,si(t),h);m!==g&&h.push(m);let v=m.status?m.status():"NoError";if(v&&v!=="NoError")throw new Error(`Manifold error: ${v}`);let b=m.getMesh(),y=m.volume();return{stl:qf(b,"bubble-frame"),volume:y,layout:t}}finally{Xf(h)}}async function A0(s){let t=ni(s),e=si(t),n=ii(t.params),i=await Wf(),{Manifold:r}=i,o=[];try{let a=b0(r,e,n,o),l=a.status?a.status():"NoError";if(l&&l!=="NoError")throw new Error(`Back plate manifold error: ${l}`);let c=a.getMesh(),h=a.volume();return{stl:qf(c,"bubble-frame-back"),volume:h}}finally{Xf(o)}}async function C0(s){let t=Bn(s);if(!t.standEnabled)throw new Error("Stand is turned off.");let e=si(ni(t)),n=await Wf(),{Manifold:i}=n,r=[];try{let o=E0(i,e,r),a=o.status?o.status():"NoError";if(a&&a!=="NoError")throw new Error(`Stand manifold error: ${a}`);let l=o.getMesh(),c=o.volume();return{stl:qf(l,"bubble-frame-stand"),volume:c}}finally{Xf(r)}}function qf(s,t="mesh"){let{vertProperties:e,triVerts:n,numProp:i}=s,r=i||3,o=n.length/3,a=new Uint8Array(80),l=`bubble-frame ${t}`.slice(0,79);for(let u=0;u<l.length;u++)a[u]=l.charCodeAt(u);let c=new ArrayBuffer(84+o*50),h=new DataView(c);new Uint8Array(c,0,80).set(a),h.setUint32(80,o,!0);let d=84;for(let u=0;u<o;u++){let f=n[u*3]*r,p=n[u*3+1]*r,_=n[u*3+2]*r,g=e[f],m=e[f+1],v=e[f+2],b=e[p],y=e[p+1],w=e[p+2],S=e[_],A=e[_+1],x=e[_+2],T=b-g,P=y-m,I=w-v,N=S-g,z=A-m,L=x-v,O=P*L-I*z,W=I*N-T*L,B=T*z-P*N,nt=Math.hypot(O,W,B)||1;O/=nt,W/=nt,B/=nt,h.setFloat32(d,O,!0),h.setFloat32(d+4,W,!0),h.setFloat32(d+8,B,!0),h.setFloat32(d+12,g,!0),h.setFloat32(d+16,m,!0),h.setFloat32(d+20,v,!0),h.setFloat32(d+24,b,!0),h.setFloat32(d+28,y,!0),h.setFloat32(d+32,w,!0),h.setFloat32(d+36,S,!0),h.setFloat32(d+40,A,!0),h.setFloat32(d+44,x,!0),h.setUint16(d+48,0,!0),d+=50}return c}function Yf(s){return s.byteLength<84?0:new DataView(s).getUint32(80,!0)}var R0="undo-history-style",pE=`
.history-bar {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  padding: 8px 0;
  background: var(--panel, var(--card, #f7f4ef));
  border-bottom: 1px solid var(--line, #ddd6cc);
}
.history-bar button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 6px 14px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 999px;
  background: #fff;
  color: var(--ink, #1c1917);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 650;
  cursor: pointer;
  touch-action: manipulation;
}
.history-bar button:disabled { opacity: 0.4; cursor: default; }
.history-bar .history-hint {
  margin-left: auto;
  color: var(--muted, #78716c);
  font-size: 0.72rem;
  white-space: nowrap;
}
@media (hover: none) { .history-bar .history-hint { display: none; } }
`,mE=new Set(["text","number","search","email","url","tel","password"]);function gE(s){return s?s.isContentEditable||s.tagName==="TEXTAREA"?!0:s.tagName==="INPUT"&&mE.has(s.type):!1}function _E({read:s,apply:t,limit:e=100,onChange:n=()=>{}}){let i=()=>JSON.stringify(s()),r=[i()],o=0,a={get canUndo(){return o>0},get canRedo(){return o<r.length-1},commit(){let c=i();return c===r[o]?!1:(r=r.slice(0,o+1),r.push(c),r.length>e&&r.shift(),o=r.length-1,n(a),!0)},undo(){return a.canUndo?(l(o-1),!0):!1},redo(){return a.canRedo?(l(o+1),!0):!1},clear(){r=[i()],o=0,n(a)}};function l(c){o=c,t(JSON.parse(r[o])),r[o]=i(),n(a)}return a}function P0({panel:s,before:t,read:e,apply:n,limit:i}={}){if(!document.getElementById(R0)){let p=document.createElement("style");p.id=R0,p.textContent=pE,document.head.appendChild(p)}let r=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent),o=document.createElement("div");o.className="history-bar",o.setAttribute("role","toolbar"),o.setAttribute("aria-label","Undo history"),o.innerHTML=`
    <button type="button" data-history="undo" title="Undo (${r?"\u2318Z":"Ctrl+Z"})">\u21B6 Undo</button>
    <button type="button" data-history="redo" title="Redo (${r?"\u21E7\u2318Z":"Ctrl+Shift+Z"})">\u21B7 Redo</button>
    <span class="history-hint">${r?"\u2318Z \xB7 \u21E7\u2318Z":"Ctrl+Z \xB7 Ctrl+Shift+Z"}</span>
  `;let a=o.querySelector('[data-history="undo"]'),l=o.querySelector('[data-history="redo"]'),c=s||document.body,h=t||c.querySelector(".settings-group")||c.firstElementChild;h&&h.parentElement?h.parentElement.insertBefore(o,h):c.prepend(o);let d=()=>{let p=o.parentElement;for(;p&&p!==document.body&&!/(auto|scroll)/.test(getComputedStyle(p).overflowY);)p=p.parentElement;let _=p&&p!==document.body&&parseFloat(getComputedStyle(p).paddingTop)||0;o.style.top=`${-_}px`};d(),window.addEventListener("resize",d);let u=p=>{a.disabled=!p.canUndo,l.disabled=!p.canRedo},f=_E({read:e,limit:i,onChange:u,apply(p){let _=document.activeElement;_&&_!==document.body&&c.contains(_)&&_.blur&&_.blur(),n(p)}});return u(f),a.addEventListener("click",()=>f.undo()),l.addEventListener("click",()=>f.redo()),document.addEventListener("change",()=>f.commit()),document.addEventListener("click",p=>{p.target instanceof Element&&p.target.closest(".history-bar")||f.commit()}),document.addEventListener("keydown",p=>{if(!(p.metaKey||p.ctrlKey)||p.altKey)return;let _=p.key.toLowerCase(),g=_==="z"&&!p.shiftKey,m=_==="z"&&p.shiftKey||_==="y"&&p.ctrlKey&&!p.metaKey;!g&&!m||gE(p.target)||(p.preventDefault(),g?f.undo():f.redo())}),f}var I0="model-pick-style",xE=`
.mp-block {
  margin: 0 0 12px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.45);
  overflow: hidden;
}
.mp-block > summary {
  cursor: pointer;
  padding: 10px 12px;
  font-weight: 700;
  list-style: none;
}
.mp-block > summary::-webkit-details-marker { display: none; }
.mp-body { padding: 0 12px 12px; }
.mp-note {
  margin: 0 0 8px;
  color: var(--muted, #78716c);
  font-size: 0.8rem;
  line-height: 1.4;
}
.mp-toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.mp-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 6px 12px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 999px;
  background: #fff;
  color: var(--ink, #1c1917);
  font-size: 0.85rem;
  font-weight: 650;
  cursor: pointer;
  touch-action: manipulation;
}
.mp-toggle input {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--accent-2, #0f766e);
}
.mp-card {
  position: absolute;
  z-index: 4;
  left: 12px;
  right: 12px;
  bottom: 12px;
  max-width: 320px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 251, 245, 0.96);
  color: var(--ink, #1c1917);
  box-shadow: 0 8px 24px rgba(28, 25, 23, 0.16);
  border: 1px solid #e7d7b8;
}
.mp-card[hidden] { display: none !important; }
.mp-card-title {
  margin: 0;
  font-weight: 750;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}
.mp-card-sub { margin: 2px 0 0; font-size: 0.82rem; font-weight: 650; }
.mp-card-detail { margin: 4px 0 8px; font-size: 0.78rem; color: var(--muted, #57534e); line-height: 1.35; }
.mp-clear {
  min-height: 44px;
  padding: 8px 14px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 999px;
  background: #fff;
  color: var(--ink, #1c1917);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
.mp-tag {
  position: absolute;
  z-index: 4;
  transform: translate(-50%, -130%);
  padding: 2px 6px;
  border-radius: 999px;
  background: #9a3412;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 750;
  pointer-events: none;
}
.mp-tag[hidden] { display: none !important; }
.row.mp-hot {
  background: #fef3c7;
  outline: 2px solid #d97706;
  border-radius: 10px;
  padding: 4px 6px;
}
`;function yE(){if(document.getElementById(I0))return;let s=document.createElement("style");s.id=I0,s.textContent=xE,document.head.appendChild(s)}function vE(s){let t=s;for(;t;){if(t.userData&&t.userData.mpHit)return t.userData.mpHit;t=t.parent}return null}function L0({THREE:s,panel:t,canvas:e,camera:n,scene:i,getParts:r,inspect:o,measure:a,onVisible:l,toggleHost:c=null,insertBefore:h=null}){yE();let d={},u=new s.Raycaster,f=new s.Vector2,p=new s.Vector3,_=[],g=e.parentElement||e;getComputedStyle(g).position==="static"&&(g.style.position="relative");let m=document.createElement("div");m.className="mp-card",m.hidden=!0,m.innerHTML=`
    <p class="mp-card-title"></p>
    <p class="mp-card-sub"></p>
    <p class="mp-card-detail"></p>
    <button type="button" class="mp-clear">Clear pick</button>
  `;let v=m.querySelector(".mp-card-title"),b=m.querySelector(".mp-card-sub"),y=m.querySelector(".mp-card-detail");g.appendChild(m);let w=document.createElement("div"),S=document.createElement("div");w.className="mp-tag",S.className="mp-tag",w.textContent="A",S.textContent="B",w.hidden=!0,S.hidden=!0,g.appendChild(w),g.appendChild(S);let A=c;if(A){let Q=document.createElement("p");Q.className="mp-note",Q.textContent="Show or hide each part. Preview only \u2014 downloads still export every part.";let $=document.createElement("div");$.className="mp-toggles",c.prepend($),c.insertBefore(Q,$),A=$}else{let Q=document.createElement("details");Q.className="mp-block",Q.open=!0,Q.innerHTML=`
      <summary>Show</summary>
      <div class="mp-body">
        <p class="mp-note">Preview only. Hiding a part does not change the STL download.</p>
        <div class="mp-toggles"></div>
        <p class="mp-note">Click one spot for the sliders that change it. Click a second spot for the distance between them.</p>
      </div>
    `;let $=h||t.querySelector(":scope > .settings-group, :scope > .mp-block")||t.firstElementChild;$&&$.parentElement===t?t.insertBefore(Q,$):t.prepend(Q),A=Q.querySelector(".mp-toggles")}let x=new s.SphereGeometry(1.35,16,12),T=new s.MeshBasicMaterial({color:10105874,depthTest:!1}),P=new s.Mesh(x,T),I=new s.Mesh(x,T.clone());I.material.color.setHex(11817737),P.visible=!1,I.visible=!1,P.raycast=()=>{},I.raycast=()=>{},P.renderOrder=20,I.renderOrder=20;let N=new s.BufferGeometry().setFromPoints([new s.Vector3,new s.Vector3]),z=new s.Line(N,new s.LineBasicMaterial({color:10105874,depthTest:!1}));z.visible=!1,z.raycast=()=>{},z.renderOrder=19;let L=new s.Box3,O=new s.Box3Helper(L,11817737);O.visible=!1,O.raycast=()=>{},O.material.depthTest=!1,i.add(P,I,z,O);function W(){return r()||[]}function B(){let Q=W(),$=new Set;for(let ut of Q)$.add(ut.id),d[ut.id]===void 0&&(d[ut.id]=ut.visible!==!1);A.innerHTML="";for(let ut of Q){let Ut=document.createElement("label");Ut.className="mp-toggle";let Z=document.createElement("input");Z.type="checkbox",Z.checked=d[ut.id]!==!1,Z.dataset.show=ut.id;let st=document.createElement("span");st.textContent=ut.preview?`${ut.label} (preview)`:ut.label,Ut.append(Z,st),Z.addEventListener("change",()=>{d[ut.id]=Z.checked,nt()}),A.appendChild(Ut)}for(let ut of Object.keys(d))$.has(ut)||delete d[ut]}function nt(){for(let Q of W()){let $=d[Q.id]!==!1;for(let ut of Q.objects||[])ut.object&&(ut.object.visible=$)}l?.({...d})}function Y(){for(let Q of W())for(let $ of Q.objects||[])$.object&&($.object.userData.mpHit=$.hit||Q.id)}function tt(Q){t.querySelectorAll(".mp-hot").forEach(ut=>ut.classList.remove("mp-hot"));let $=[];for(let ut of Q||[]){let Z=t.querySelector(`#${CSS.escape(ut)}`)?.closest(".row, .field, label.check, .color-card");if(!Z||Z.hidden||Z.closest("[hidden]"))continue;Z.classList.add("mp-hot");let st=Z.closest("details");st&&!st.classList.contains("mp-block")&&(st.open=!0),$.push(Z)}$[0]&&$[0].scrollIntoView({block:"nearest"})}function it(Q){let $=Q?.box;if(!$?.min||!$?.max){O.visible=!1;return}L.min.set($.min[0],$.min[1],$.min[2]),L.max.set($.max[0],$.max[1],$.max[2]),O.visible=!0}function Lt(Q,$,ut){if(Q.hidden=!ut||!$,!$)return;p.set($.x,$.y,$.z).project(n);let Ut=e.getBoundingClientRect(),Z=g.getBoundingClientRect(),st=(p.x*.5+.5)*Ut.width+(Ut.left-Z.left),ht=(-p.y*.5+.5)*Ut.height+(Ut.top-Z.top);Q.style.left=`${st}px`,Q.style.top=`${ht}px`,Q.hidden=p.z<-1||p.z>1}function pt(Q){let $=o(Q)||{};m.hidden=!1,v.textContent=$.title||"Spot",b.textContent="One click";let ut=$.params||[];y.textContent=[$.detail||(ut.length?"Highlighted sliders change this spot.":"No slider sets this spot."),"Click a second spot to measure the distance."].join(" "),tt(ut),it($),P.position.set(Q.point.x,Q.point.y,Q.point.z),P.visible=!0,I.visible=!1,z.visible=!1,S.hidden=!0}function $t(Q,$){let ut=Math.hypot($.point.x-Q.point.x,$.point.y-Q.point.y,$.point.z-Q.point.z),Ut=a(Q,$)||{},Z=Ut.params||[];m.hidden=!1,v.textContent=`${ut.toFixed(1)} mm`,b.textContent=Ut.title||"Point A to point B",y.textContent=Ut.detail||(Z.length?"Highlighted sliders change this distance.":"No slider sets this distance."),tt(Z),it(null),P.position.set(Q.point.x,Q.point.y,Q.point.z),I.position.set($.point.x,$.point.y,$.point.z),P.visible=!0,I.visible=!0;let st=N.getAttribute("position");st.setXYZ(0,Q.point.x,Q.point.y,Q.point.z),st.setXYZ(1,$.point.x,$.point.y,$.point.z),st.needsUpdate=!0,N.computeBoundingSphere(),z.visible=!0}function Jt(){_.length&&(_.length===1?pt(_[0]):$t(_[0],_[1]))}function jt(){_.length=0,m.hidden=!0,P.visible=!1,I.visible=!1,z.visible=!1,O.visible=!1,w.hidden=!0,S.hidden=!0,tt([])}function J(Q,$){let ut=e.getBoundingClientRect();if(!ut.width||!ut.height)return;f.x=(Q-ut.left)/ut.width*2-1,f.y=-(($-ut.top)/ut.height)*2+1,u.setFromCamera(f,n),Y();let Ut=[];for(let Bt of W())if(d[Bt.id]!==!1)for(let kt of Bt.objects||[])kt.object&&kt.object.visible&&Ut.push(kt.object);let st=u.intersectObjects(Ut,!0).find(Bt=>Bt.object&&Bt.face);if(!st)return;let ht={x:st.point.x,y:st.point.y,z:st.point.z},dt=null;if(st.face){p.copy(st.face.normal);let Bt=new s.Matrix3().getNormalMatrix(st.object.matrixWorld);p.applyMatrix3(Bt).normalize(),dt={x:p.x,y:p.y,z:p.z}}let mt={point:ht,normal:dt,partId:vE(st.object),object:st.object};_.length>=2&&(_.length=0),_.push(mt),Jt()}let et=null;e.addEventListener("pointerdown",Q=>{Q.button!==0||Q.isPrimary===!1||(et={x:Q.clientX,y:Q.clientY,id:Q.pointerId})}),window.addEventListener("pointerup",Q=>{if(!et||Q.pointerId!==et.id)return;let $=Q.clientX-et.x,ut=Q.clientY-et.y;if(et=null,$*$+ut*ut>64)return;let Ut=e.getBoundingClientRect();Q.clientX<Ut.left||Q.clientX>Ut.right||Q.clientY<Ut.top||Q.clientY>Ut.bottom||J(Q.clientX,Q.clientY)}),m.querySelector(".mp-clear").addEventListener("click",Q=>{Q.preventDefault(),jt()}),window.addEventListener("keydown",Q=>{Q.key==="Escape"&&!(Q.target instanceof HTMLInputElement)&&jt()});function xt(){Lt(w,_[0]?.point,_.length>=1),Lt(S,_[1]?.point,_.length>=2),requestAnimationFrame(xt)}return requestAnimationFrame(xt),B(),requestAnimationFrame(()=>{let Q=t.querySelector(":scope > .history-bar"),$=t.querySelector(":scope > .mp-block");Q&&$&&$.parentElement===t&&Q.after($)}),{sync(){B()},refresh(){Jt()},clear:jt,visibility(){return{...d}},setVisible(Q,{silent:$=!1}={}){for(let[ut,Ut]of Object.entries(Q||{}))d[ut]=!!Ut;if(B(),$)for(let ut of W()){let Ut=d[ut.id]!==!1;for(let Z of ut.objects||[])Z.object&&(Z.object.visible=Ut)}else nt()},clickClient(Q,$){J(Q,$)},project(Q,$,ut){p.set(Q,$,ut).project(n);let Ut=e.getBoundingClientRect();return{x:Ut.left+(p.x*.5+.5)*Ut.width,y:Ut.top+(-p.y*.5+.5)*Ut.height,behind:p.z<-1||p.z>1}}}}var D0=["photoW","ballDiameter","imageOverlap"],N0=["photoH","ballDiameter","imageOverlap"];function U0(s){return{clip:si(s),photo:s.photo,outer:s.outer,opening:s.opening,widthParams:D0,heightParams:N0,openingWidthParams:["photoW","imageOverlap"],openingHeightParams:["photoH","imageOverlap"],holes:ii(s.params)}}function F0(s,t,e){let n=e.frameBackZ-.5,i=e.frameBackZ+t.radius+.8;if(s.z<n||s.z>i)return null;let r=null,o=t.radius+.9;for(let a of t.beads){let l=Math.hypot(a.x-s.x,a.y-s.y);l<o&&(o=l,r=a)}return r}function ME(s,t,e){let n=s.point,i=x0(n,e),r=F0(n,t,e);if(i&&n.z<=e.frameBackZ+e.tongueT+.45&&(!r||n.z<e.frameBackZ+t.radius*.35))return{title:"Slide tongue",detail:"Tongue size follows the border. No slider sets the tongue thickness.",params:[...D0,...N0],box:i};if(!r)return{title:"Cover",detail:"No slider sets this spot.",params:[],box:null};let a=Au(s.normal),l=r.role==="corner",c=["ballDiameter"];(a==="x"||l)&&c.push("photoW"),(a==="y"||l)&&c.push("photoH"),a!=="z"&&c.push("imageOverlap"),!l&&(r.side==="top"||r.side==="bottom"||r.side==="left"||r.side==="right")&&c.push("ballOverlap"),l&&c.push("outerCornerRadius");let h=t.radius;return{title:l?"Corner bead":r.side==="top"||r.side==="bottom"||r.side==="left"||r.side==="right"?`${r.side[0].toUpperCase()}${r.side.slice(1)} bead`:"Bead",detail:a==="z"?"Dome height is the ball radius.":"Bead size, and where this side of the frame sits.",params:[...new Set(c)],box:{min:[r.x-h,r.y-h,e.frameBackZ],max:[r.x+h,r.y+h,e.frameBackZ+h]}}}function O0(s,t){if(!s?.point||!t)return{title:"Spot",detail:"No slider sets this spot.",params:[]};let e=U0(t);return s.partId==="cover"?ME(s,t,e.clip):y0(s,e)||{title:"Frame",detail:"No slider sets this spot.",params:[]}}function B0(s,t,e){if(!s?.point||!t?.point||!e)return{title:"Between the two clicks",detail:"No slider sets this distance.",params:[]};let n=U0(e),i=n.clip,r=v0(n);return r.push({title:"Ball diameter",kind:"chord",value:e.radius*2,named:e.radius*2,params:["ballDiameter"],parts:["cover"],when:(o,a)=>e.beads.some(l=>{let c=Math.hypot(o.point.x-l.x,o.point.y-l.y),h=Math.hypot(a.point.x-l.x,a.point.y-l.y);return c<=e.radius+1&&h<=e.radius+1})}),r.push({title:"Bead dome",axis:"z",end0:i.frameBackZ,end1:i.frameBackZ+e.radius,named:e.radius,params:["ballDiameter"],parts:["cover"],tol:Math.max(.8,e.radius*.2),when:(o,a)=>{let l=F0(o.point,e,i);return l?Math.hypot(a.point.x-l.x,a.point.y-l.y)<=e.radius+1:!1}}),M0(s,t,r)}var z0="slider-numbers-style",SE=`
.num-field {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  justify-self: end;
}
.num-field .num-input {
  width: 5.2em;
  padding: 4px 6px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 8px;
  background: #fff;
  color: var(--ink, #1c1917);
  font: inherit;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  text-align: right;
}
.num-field .num-input:focus {
  outline: 2px solid var(--accent-2, var(--accent, #0f766e));
  outline-offset: 1px;
}
.num-field .num-unit,
.num-field output {
  color: var(--muted, #78716c);
  font-size: 0.85rem;
}
`,Pu=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");function bE(s){let t=String(s);if(!t||t==="any")return 3;let e=t.indexOf(".");return e<0?0:t.length-e-1}function EE(s){let t=/^\s*(-?\d+(?:\.\d+)?)\s*(.*?)\s*$/.exec(s||"");return t?{numeric:!0,unit:t[2]}:{numeric:!1,unit:null}}function wE(s){let t=s.parentElement,e=t.querySelector("output"),n=t.querySelector(`label[for="${s.id}"]`)||t.querySelector("label"),i=document.createElement("span");i.className="num-field";let r=document.createElement("input");r.type="number",r.className="num-input",r.inputMode="decimal",r.step="any",s.id&&(r.id=`${s.id}-num`),n&&r.setAttribute("aria-label",n.textContent.trim());let o=document.createElement("span");o.className="num-unit",i.append(r,o),e?(e.replaceWith(i),i.append(e)):s.before(i);let a=s.dataset.unit??null,l=()=>{let h=EE(e?.textContent);h.numeric&&a==null&&(a=h.unit),o.textContent=a??"",e&&(e.hidden=h.numeric||!e.textContent.trim())},c=()=>{if(r.min=s.min,r.max=s.max,document.activeElement===r)return;let h=Number(Pu.get.call(s));r.value=Number.isFinite(h)?String(Number(h.toFixed(bE(s.step)))):""};return Object.defineProperty(s,"value",{configurable:!0,get(){return Pu.get.call(this)},set(h){Pu.set.call(this,h),c()}}),s.addEventListener("input",c),r.addEventListener("change",()=>{let h=parseFloat(r.value);if(!Number.isFinite(h)){c();return}let d=s.min===""?-1/0:Number(s.min),u=s.max===""?1/0:Number(s.max);Pu.set.call(s,String(Math.min(u,Math.max(d,h)))),r.blur(),c(),s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0}))}),r.addEventListener("keydown",h=>{h.key==="Enter"&&r.blur()}),e&&new MutationObserver(l).observe(e,{childList:!0,characterData:!0,subtree:!0}),l(),c(),r}function k0(s=document){if(!document.getElementById(z0)){let e=document.createElement("style");e.id=z0,e.textContent=SE,document.head.appendChild(e)}let t=[];for(let e of s.querySelectorAll('input[type="range"]'))e.dataset.noNumber!=null||e.dataset.numberPaired!=null||e.parentElement?.querySelector('input[type="number"]')||(e.dataset.numberPaired="",t.push(wE(e)));return t}var ql={},lt=s=>document.getElementById(s),X=up(),Yl=null,we;function V0(s,t){let e=jl(s,t);return t==="in"?e.toFixed(3).replace(/0+$/,"").replace(/\.$/,""):e.toFixed(1)}function mo(s){return`${s.toFixed(1)} mm`}function TE(){let s=document.activeElement,t=s===lt("outerCornerRadiusRange")||s===lt("outerCornerRadius");lt("units").value=X.units,lt("photoW").value=V0(X.photoW,X.units),lt("photoH").value=V0(X.photoH,X.units),lt("unitW").textContent=X.units,lt("unitH").textContent=X.units,lt("ballDiameter").value=X.ballDiameter.toFixed(1),lt("ballDiameterRange").value=X.ballDiameter,lt("imageOverlap").value=X.imageOverlap.toFixed(1);let e=Math.min(X.ballDiameter,Math.min(X.photoW,X.photoH)/2-.5);lt("imageOverlapRange").max=String(Math.max(1,e).toFixed(1)),lt("imageOverlapRange").value=X.imageOverlap,lt("ballOverlap").value=X.targetBallOverlap.toFixed(1),lt("ballOverlapRange").min=String((-.4*X.ballDiameter).toFixed(1)),lt("ballOverlapRange").max=String((.75*X.ballDiameter).toFixed(1)),lt("ballOverlapRange").value=X.targetBallOverlap,lt("webThickness").value=X.webThickness.toFixed(1),lt("plateThickness").value=X.plateThickness.toFixed(1),lt("hangHoles").checked=X.hangHoles,lt("hangFields").hidden=!X.hangHoles,lt("hangHoleDiameter").value=X.hangHoleDiameter.toFixed(1),lt("hangInsetTop").value=X.hangInsetTop.toFixed(1),lt("hangInsetSide").value=X.hangInsetSide.toFixed(1),lt("hangSideRow").hidden=X.hangHoleCount<2;for(let o of document.querySelectorAll("[data-holes]"))o.classList.toggle("active",Number(o.dataset.holes)===X.hangHoleCount);lt("standEnabled").checked=X.standEnabled,lt("standFields").hidden=!X.standEnabled;let n=["Slight","Medium","More"],i=gp(X);for(let o of document.querySelectorAll("[data-stand]")){let a=Number(o.dataset.stand);o.classList.toggle("active",a===X.standHole);let l=i[a];l&&(o.textContent=`${n[a]} ${Math.round(l.angleDeg)}\xB0`)}lt("dlStand").hidden=!X.standEnabled,lt("segments").value=X.segments,lt("alternate").checked=X.alternate!==!1,s!==lt("colorA")&&(lt("colorA").value=X.colorA),s!==lt("colorB")&&(lt("colorB").value=X.colorB),lt("countTop").textContent=X.countTop,lt("countBottom").textContent=X.countBottom,lt("countLeft").textContent=X.countLeft,lt("countRight").textContent=X.countRight,lt("linkH").checked=X.linkH,lt("linkV").checked=X.linkV,lt("bottomRow").hidden=X.linkH,lt("rightRow").hidden=X.linkV;for(let o of document.querySelectorAll("[data-preset]")){let a=Nu.find(c=>c.id===o.dataset.preset),l=a&&Math.abs(a.w-X.photoW)<.05&&Math.abs(a.h-X.photoH)<.05;o.classList.toggle("active",!!l)}t||(lt("outerCornerRadius").value=X.outerCornerRadius.toFixed(1),lt("outerCornerRadiusRange").value=X.outerCornerRadius);let r=Math.min(X.ballDiameter,Math.min(X.photoW,X.photoH)/2);lt("outerCornerRadiusRange").max=String(Math.max(0,r).toFixed(1))}function AE(s){let t=Zs(fp(s,X.webThickness)),e=ii(X).reduce((r,o)=>r+Math.PI*o.r*o.r,0),n=Zs((X.photoW*X.photoH-e)*X.plateThickness),i=X.standEnabled?Zs(_p(X)):0;lt("readout").innerHTML=`
    <div><b>${s.enabledCount}</b> beads \xB7 outer <b>${mo(s.outer.w)} \xD7 ${mo(s.outer.h)}</b></div>
    <div>Window ~ <b>${mo(s.opening.w)} \xD7 ${mo(s.opening.h)}</b> (scalloped)</div>
    <div>Bead overlap T/B <b>${mo(s.overlap.top)}</b> \xB7 L/R <b>${mo(s.overlap.left)}</b></div>
    <div>Est. PLA \xB7 frame ~ <b>${t.toFixed(1)} g</b> \xB7 back plate ~ <b>${n.toFixed(1)} g</b>${X.standEnabled?` \xB7 stand ~ <b>${i.toFixed(1)} g</b>`:""}</div>
  `,lt("warnings").innerHTML=s.warnings.map(r=>`<div class="warn">${r}</div>`).join(""),lt("restore").hidden=X.disabled.length===0}function xe(s={}){X=Ou(Bn(X)),TE();let t=we.update(X);return AE(t),Yl&&Yl.refresh(),s.fit&&we.fit(),t}function CE(s){return s?.box?{...s,box:we.worldBox(s.box)}:s}function H0(s){let t=o=>s?.[o]!==!1,e=t("cover")&&t("back")&&t("stand")&&t("photo"),n=t("cover")&&!t("back")&&!t("stand")&&t("photo"),i=!t("cover")&&t("back")&&t("stand")&&!t("photo"),r=null;e?r=we.partView==="side"?"side":"assembled":n?r="cover":i&&(r="back"),document.querySelectorAll("[data-part]").forEach(o=>{o.classList.toggle("active",r!=null&&o.getAttribute("data-part")===r)})}function ns(s){return Number(lt(s).value)}function RE(){lt("units").addEventListener("change",()=>{X.units=lt("units").value,xe()}),lt("photoW").addEventListener("change",()=>{X.photoW=Fu(ns("photoW"),X.units),X=mi(X),xe({fit:!0})}),lt("photoH").addEventListener("change",()=>{X.photoH=Fu(ns("photoH"),X.units),X=mi(X),xe({fit:!0})}),lt("rotate").addEventListener("click",()=>{let e=X.photoW;X.photoW=X.photoH,X.photoH=e,X=mi(X),xe({fit:!0})});for(let e of document.querySelectorAll("[data-preset]"))e.addEventListener("click",()=>{let n=Nu.find(i=>i.id===e.dataset.preset);n&&(X.photoW=n.w,X.photoH=n.h,X.units="in",X=mi(X),xe({fit:!0}))});let s=(e,n,i,r)=>{let o=()=>{X[i]=Number(lt(e).value),lt(n).value=X[i],r&&(X=mi(X)),xe()};lt(e).addEventListener("input",o),lt(n).addEventListener("change",()=>{X[i]=Number(lt(n).value),r&&(X=mi(X)),xe()})};s("ballDiameterRange","ballDiameter","ballDiameter",!0),s("imageOverlapRange","imageOverlap","imageOverlap",!0),s("outerCornerRadiusRange","outerCornerRadius","outerCornerRadius",!1),lt("ballOverlapRange").addEventListener("input",()=>{X.targetBallOverlap=Number(lt("ballOverlapRange").value),X=mi(X),xe()}),lt("ballOverlap").addEventListener("change",()=>{X.targetBallOverlap=Number(lt("ballOverlap").value),X=mi(X),xe()}),lt("webThickness").addEventListener("change",()=>{X.webThickness=ns("webThickness"),xe()}),lt("plateThickness").addEventListener("change",()=>{X.plateThickness=ns("plateThickness"),xe()}),lt("hangHoles").addEventListener("change",()=>{X.hangHoles=lt("hangHoles").checked,xe()});for(let e of document.querySelectorAll("[data-holes]"))e.addEventListener("click",()=>{X.hangHoleCount=Number(e.dataset.holes),xe()});lt("hangHoleDiameter").addEventListener("change",()=>{X.hangHoleDiameter=ns("hangHoleDiameter"),xe()}),lt("hangInsetTop").addEventListener("change",()=>{X.hangInsetTop=ns("hangInsetTop"),xe()}),lt("hangInsetSide").addEventListener("change",()=>{X.hangInsetSide=ns("hangInsetSide"),xe()}),lt("standEnabled").addEventListener("change",()=>{X.standEnabled=lt("standEnabled").checked,xe({fit:!0})});for(let e of document.querySelectorAll("[data-stand]"))e.addEventListener("click",()=>{X.standHole=Number(e.dataset.stand),xe({fit:we.partView==="side"})});lt("segments").addEventListener("change",()=>{X.segments=ns("segments"),xe()}),lt("alternate").addEventListener("change",()=>{X.alternate=lt("alternate").checked,xe()}),lt("colorA").addEventListener("input",()=>{X.colorA=lt("colorA").value,xe()}),lt("colorB").addEventListener("input",()=>{X.colorB=lt("colorB").value,xe()}),lt("linkH").addEventListener("change",()=>{X.linkH=lt("linkH").checked,X.linkH&&(X.countBottom=X.countTop),X=Ql(X),xe()}),lt("linkV").addEventListener("change",()=>{X.linkV=lt("linkV").checked,X.linkV&&(X.countRight=X.countLeft),X=Ql(X),xe()});let t=(e,n)=>{X[e]+=n,e==="countTop"&&X.linkH&&(X.countBottom=X.countTop),e==="countBottom"&&X.linkH&&(X.countTop=X.countBottom),e==="countLeft"&&X.linkV&&(X.countRight=X.countLeft),e==="countRight"&&X.linkV&&(X.countLeft=X.countRight),X=Ql(X),xe()};lt("topMinus").addEventListener("click",()=>t("countTop",-1)),lt("topPlus").addEventListener("click",()=>t("countTop",1)),lt("bottomMinus").addEventListener("click",()=>t("countBottom",-1)),lt("bottomPlus").addEventListener("click",()=>t("countBottom",1)),lt("leftMinus").addEventListener("click",()=>t("countLeft",-1)),lt("leftPlus").addEventListener("click",()=>t("countLeft",1)),lt("rightMinus").addEventListener("click",()=>t("countRight",-1)),lt("rightPlus").addEventListener("click",()=>t("countRight",1)),lt("restore").addEventListener("click",()=>{X.disabled=[],xe()}),lt("resetView").addEventListener("click",()=>we.fit()),lt("photoFile").addEventListener("change",async e=>{let n=e.target.files&&e.target.files[0];if(!n){we.setPhotoImage(null);return}let i=new Image;i.onload=()=>we.setPhotoImage(i),i.src=URL.createObjectURL(n)}),lt("dlFrame").addEventListener("click",()=>Iu("frame")),lt("dlPlate").addEventListener("click",()=>Iu("plate")),lt("dlStand").addEventListener("click",()=>Iu("stand")),lt("dlBoth").addEventListener("click",()=>Iu("all"))}function Zf(s,t,e){ql[s]&&URL.revokeObjectURL(ql[s].url);let n=new Blob([e],{type:"model/stl"}),i=URL.createObjectURL(n);ql[s]={url:i,name:t};let r=document.createElement("a");r.href=i,r.download=t,document.body.appendChild(r),r.click(),r.remove(),PE()}function PE(){let s=lt("exportLinks");if(!s)return;let e=[["frame","Frame"],["plate","Back plate"],["stand","Stand"]].filter(([n])=>ql[n]).map(([n,i])=>{let r=ql[n];return`<a class="export-link" href="${r.url}" download="${r.name}">${i} STL</a>`});s.hidden=e.length===0,s.innerHTML=e.length?`<div class="export-links-label">Latest exports \u2014 tap to download again</div>${e.join("")}`:""}async function Iu(s){let t=pp(X.photoW,X.photoH,X.units),e=lt("status"),n=[lt("dlFrame"),lt("dlPlate"),lt("dlStand"),lt("dlBoth")];n.forEach(i=>i.disabled=!0);try{let i=[];if(s==="plate"||s==="all"||s==="both"){e.textContent="Writing back plate\u2026";let r=await A0(X);Zf("plate",`bubble-frame-${t}-back.stl`,r.stl),i.push(`plate ${Yf(r.stl).toLocaleString()} tris`)}if((s==="stand"||s==="all")&&X.standEnabled){e.textContent="Building stand\u2026";let r=await C0(X);Zf("stand",`bubble-frame-${t}-stand.stl`,r.stl),i.push(`stand ${Zs(r.volume).toFixed(1)} g`)}if(s==="frame"||s==="all"||s==="both"){e.textContent="Unioning beads (first run loads the CAD kernel)\u2026";let{stl:r,volume:o,layout:a}=await T0(X),l=Yf(r);Zf("frame",`bubble-frame-${t}-frame.stl`,r),i.push(`frame ${l.toLocaleString()} tris \xB7 ${Zs(o).toFixed(1)} g \xB7 ${a.enabledCount} beads`)}e.textContent=i.length?i.join(" \xB7 "):"Done."}catch(i){console.error(i),e.textContent=i.message||String(i)}finally{n.forEach(i=>i.disabled=!1)}}function IE(){we=new Ru({canvas3d:lt("view3d"),canvas2d:lt("view2d"),onToggle:e=>{X=mp(X,e),xe()}});let s=lt("app-version");s&&(s.textContent=`Bubble frame v${hp}`),RE(),xe({fit:!0}),k0(document.querySelector(".panel"));let t=document.querySelector(".panel");Yl=L0({THREE:Eu,panel:t,canvas:lt("view3d"),camera:we.camera,scene:we.scene,getParts:()=>[{id:"cover",label:"Cover",objects:[{object:we.coverGroup,hit:"cover"}]},{id:"back",label:"Back",objects:[{object:we.backGroup,hit:"back"}]},{id:"stand",label:"Stand",objects:[{object:we.standGroup,hit:"stand"}]},{id:"photo",label:"Photo",preview:!0,objects:[{object:we.photoGroup,hit:"photo"}]}],inspect:e=>CE(O0(we.toContent(e),we.layout)),measure:(e,n)=>B0(we.toContent(e),we.toContent(n),we.layout),onVisible:e=>{we.setShown(e),H0(e)}}),window.__framePick=Yl,window.__framePreview=we,document.querySelectorAll("[data-part]").forEach(e=>{e.addEventListener("click",()=>{let n=we.setPartView(e.getAttribute("data-part"));Yl.setVisible(n,{silent:!0}),H0(n)})}),P0({panel:document.querySelector(".panel"),before:document.getElementById("viewSettings"),read:()=>X,apply:e=>{X=e,xe()}}),we.resize(),window.addEventListener("resize",()=>we.resize())}try{IE()}catch(s){console.error(s);let t=document.getElementById("status");t&&(t.textContent=s.message||String(s))}})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
