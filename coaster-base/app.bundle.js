(()=>{var bu=Object.create;var Hc=Object.defineProperty;var Su=Object.getOwnPropertyDescriptor;var Eu=Object.getOwnPropertyNames;var Tu=Object.getPrototypeOf,wu=Object.prototype.hasOwnProperty;var Qo=(i=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(i,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):i)(function(i){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+i+'" is not supported')});var Au=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Eu(t))!wu.call(i,s)&&s!==e&&Hc(i,s,{get:()=>t[s],enumerable:!(n=Su(t,s))||n.enumerable});return i};var ta=(i,t,e)=>(e=i!=null?bu(Tu(i)):{},Au(t||!i||!i.__esModule?Hc(e,"default",{value:i,enumerable:!0}):e,i));var Gc="4 \xB7 Nov 19, 2026";var Wc="Coaster base";var Vc=28.833284635549546,es=[0,90,180,270],Ru=2.5,fi=Object.freeze({armHeight:26,armWidth:10}),ns=[{key:"armHeight",min:8,max:45,step:.5,unit:"mm"},{key:"armWidth",min:4,max:18,step:.5,unit:"mm"}];function Cu(i,t,e){return Math.min(e,Math.max(t,i))}function Pu(i={}){let t={...fi,...i};for(let e of ns){let n=Number(t[e.key]);Number.isFinite(n)||(n=fi[e.key]),n=Cu(n,e.min,e.max);let s=e.step>=1?0:(String(e.step).split(".")[1]||"").length;t[e.key]=Number(n.toFixed(s))}return t}function ti(i={}){return Pu({...fi,...i})}function In(i={}){let t=ti(i),e=56-t.armWidth;return{p:t,outerR:56,innerR:e,deckT:5,armHalfRad:Vc*Math.PI/180,topFilletR:Ru,totalZ:5+t.armHeight,outerSize:112,gapDeg:360/es.length-2*Vc}}function is(i,t=1){return`${Number(i).toFixed(t)} mm`}function Xc(i){let t=In(i),e=[];return t.innerR<38&&e.push("Very thick arms crowd the lettering. Width above ~14 mm may clip the rim text."),t.p.armHeight>38&&e.push("Tall arms stick up far above the Merry Christmas line \u2014 check your mug height."),t.p.armHeight<12&&e.push("Short arms may not catch drips as well around the rim."),e}var Wn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Xn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pl=0,Ca=1,ml=2;var Cs=1,gl=2,Gi=3,Yn=0,Ne=1,mn=2,gn=0,Wi=1,Pa=2,Ia=3,La=4,xl=5;var ai=100,_l=101,yl=102,vl=103,Ml=104,bl=200,Sl=201,El=202,Tl=203,Da=204,Na=205,wl=206,Al=207,Rl=208,Cl=209,Pl=210,Il=211,Ll=212,Dl=213,Nl=214,fr=0,pr=1,mr=2,Ci=3,gr=4,xr=5,_r=6,yr=7,Ua=0,Ul=1,Fl=2,rn=0,Fa=1,Oa=2,Ba=3,ka=4,za=5,Ha=6,Va=7;var Ga=300,qn=301,ci=302,Wr=303,Xr=304,Ps=306,vr=1e3,fn=1001,Mr=1002,ve=1003,Ol=1004;var Is=1005;var Me=1006,Yr=1007;var Zn=1008;var He=1009,Wa=1010,Xa=1011,Xi=1012,qr=1013,on=1014,an=1015,cn=1016,Zr=1017,$r=1018,Yi=1020,Ya=35902,qa=35899,Za=1021,$a=1022,Ke=1023,pn=1026,$n=1027,Ja=1028,Jr=1029,Jn=1030,Kr=1031;var jr=1033,Ls=33776,Ds=33777,Ns=33778,Us=33779,Qr=35840,to=35841,eo=35842,no=35843,io=36196,so=37492,ro=37496,oo=37488,ao=37489,Fs=37490,co=37491,lo=37808,ho=37809,uo=37810,fo=37811,po=37812,mo=37813,go=37814,xo=37815,_o=37816,yo=37817,vo=37818,Mo=37819,bo=37820,So=37821,Eo=36492,To=36494,wo=36495,Ao=36283,Ro=36284,Os=36285,Co=36286;var hs=2300,br=2301,ur=2302,ba=2303,Sa=2400,Ea=2401,Ta=2402;var Bl=3200;var Po=0,kl=1,An="",Ie="srgb",us="srgb-linear",ds="linear",$t="srgb";var dr=7680;var zl=519,Hl=512,Vl=513,Gl=514,Io=515,Wl=516,Xl=517,Lo=518,Yl=519,ql=35044;var Ka="300 es",nn=2e3,Pi=2001;function Iu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Lu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zl(){let i=fs("canvas");return i.style.display="block",i}var Yc={},Ii=null;function ja(...i){let t="THREE."+i.shift();Ii?Ii("log",t,...i):console.log(t,...i)}function $l(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Rt(...i){i=$l(i);let t="THREE."+i.shift();if(Ii)Ii("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ct(...i){i=$l(i);let t="THREE."+i.shift();if(Ii)Ii("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function oi(...i){let t=i.join(" ");t in Yc||(Yc[t]=!0,Rt(...i))}function Jl(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Kl={[fr]:pr,[mr]:_r,[gr]:yr,[Ci]:xr,[pr]:fr,[_r]:mr,[yr]:gr,[xr]:Ci},sn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qc=1234567,cs=Math.PI/180,Li=180/Math.PI;function qi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ee[i&255]+Ee[i>>8&255]+Ee[i>>16&255]+Ee[i>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[n&255]+Ee[n>>8&255]+Ee[n>>16&255]+Ee[n>>24&255]).toLowerCase()}function Ot(i,t,e){return Math.max(t,Math.min(e,i))}function Qa(i,t){return(i%t+t)%t}function Du(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Nu(i,t,e){return i!==t?(e-i)/(t-i):0}function ls(i,t,e){return(1-e)*i+e*t}function Uu(i,t,e,n){return ls(i,t,1-Math.exp(-e*n))}function Fu(i,t=1){return t-Math.abs(Qa(i,t*2)-t)}function Ou(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Bu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ku(i,t){return i+Math.floor(Math.random()*(t-i+1))}function zu(i,t){return i+Math.random()*(t-i)}function Hu(i){return i*(.5-Math.random())}function Vu(i){i!==void 0&&(qc=i);let t=qc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Gu(i){return i*cs}function Wu(i){return i*Li}function Xu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Yu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Zu(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),d=r((t-n)/2),h=o((t-n)/2),p=r((n-t)/2),x=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*x,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*x,a*l);break;case"ZYZ":i.set(c*x,c*p,a*u,a*l);break;default:Rt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ai(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Pe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var tc={DEG2RAD:cs,RAD2DEG:Li,generateUUID:qi,clamp:Ot,euclideanModulo:Qa,mapLinear:Du,inverseLerp:Nu,lerp:ls,damp:Uu,pingpong:Fu,smoothstep:Ou,smootherstep:Bu,randInt:ku,randFloat:zu,randFloatSpread:Hu,seededRandom:Vu,degToRad:Gu,radToDeg:Wu,isPowerOfTwo:Xu,ceilPowerOfTwo:Yu,floorPowerOfTwo:qu,setQuaternionFromProperEuler:Zu,normalize:Pe,denormalize:Ai},Pt=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ot(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ot(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ye=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],h=r[o+0],p=r[o+1],x=r[o+2],v=r[o+3];if(d!==v||c!==h||l!==p||u!==x){let m=c*h+l*p+u*x+d*v;m<0&&(h=-h,p=-p,x=-x,v=-v,m=-m);let f=1-a;if(m<.9995){let w=Math.acos(m),P=Math.sin(w);f=Math.sin(f*w)/P,a=Math.sin(a*w)/P,c=c*f+h*a,l=l*f+p*a,u=u*f+x*a,d=d*f+v*a}else{c=c*f+h*a,l=l*f+p*a,u=u*f+x*a,d=d*f+v*a;let w=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=w,l*=w,u*=w,d*=w}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],h=r[o+1],p=r[o+2],x=r[o+3];return t[e]=a*x+u*d+c*p-l*h,t[e+1]=c*x+u*h+l*d-a*p,t[e+2]=l*x+u*p+a*h-c*d,t[e+3]=u*x-a*d-c*h-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),h=c(n/2),p=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"YXZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"ZXY":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"ZYX":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"YZX":this._x=h*u*d+l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d-h*p*x;break;case"XZY":this._x=h*u*d-l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d+h*p*x;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],d=e[10],h=n+a+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ot(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this.z=Ot(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this.z=Ot(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ot(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ea.copy(this).projectOnVector(t),this.sub(ea)}reflect(t){return this.sub(ea.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ot(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ea=new F,Zc=new Ye,It=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],x=n[8],v=s[0],m=s[3],f=s[6],w=s[1],P=s[4],M=s[7],S=s[2],T=s[5],R=s[8];return r[0]=o*v+a*w+c*S,r[3]=o*m+a*P+c*T,r[6]=o*f+a*M+c*R,r[1]=l*v+u*w+d*S,r[4]=l*m+u*P+d*T,r[7]=l*f+u*M+d*R,r[2]=h*v+p*w+x*S,r[5]=h*m+p*P+x*T,r[8]=h*f+p*M+x*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=u*o-a*l,h=a*c-u*r,p=l*r-o*c,x=e*d+n*h+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return t[0]=d*v,t[1]=(s*l-u*n)*v,t[2]=(a*n-s*o)*v,t[3]=h*v,t[4]=(u*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=p*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return oi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(na.makeScale(t,e)),this}rotate(t){return oi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(na.makeRotation(-t)),this}translate(t,e){return oi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(na.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},na=new It,$c=new It().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jc=new It().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $u(){let i={enabled:!0,workingColorSpace:us,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===$t&&(s.r=Tn(s.r),s.g=Tn(s.g),s.b=Tn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===$t&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===An?ds:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return oi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return oi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[us]:{primaries:t,whitePoint:n,transfer:ds,toXYZ:$c,fromXYZ:Jc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:$t,toXYZ:$c,fromXYZ:Jc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}var Vt=$u();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ri(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var pi,Sr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{pi===void 0&&(pi=fs("canvas")),pi.width=t.width,pi.height=t.height;let s=pi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=pi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=fs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Tn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Tn(e[n]/255)*255):e[n]=Tn(e[n]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Ju=0,Di=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=qi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ia(s[o].image)):r.push(ia(s[o]))}else r=ia(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var Ku=0,sa=new F,Be=class i extends sn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=fn,s=fn,r=Me,o=Zn,a=Ke,c=He,l=i.DEFAULT_ANISOTROPY,u=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=qi(),this.name="",this.source=new Di(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(sa).x}get height(){return this.source.getSize(sa).y}get depth(){return this.source.getSize(sa).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ga)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vr:t.x=t.x-Math.floor(t.x);break;case fn:t.x=t.x<0?0:1;break;case Mr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vr:t.y=t.y-Math.floor(t.y);break;case fn:t.y=t.y<0?0:1;break;case Mr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Ga;Be.DEFAULT_ANISOTROPY=1;var ae=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],x=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let P=(l+1)/2,M=(p+1)/2,S=(f+1)/2,T=(u+h)/4,R=(d+v)/4,y=(x+m)/4;return P>M&&P>S?P<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(P),s=T/n,r=R/n):M>S?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=y/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=R/r,s=y/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-x)*(m-x)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(m-x)/w,this.y=(d-v)/w,this.z=(h-u)/w,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this.z=Ot(this.z,t.z,e.z),this.w=Ot(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this.z=Ot(this.z,t,e),this.w=Ot(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ot(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Er=class extends sn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Me,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Be(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Me,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Di(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ke=class extends Er{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ps=class extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Tr=class extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var le=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,u,d,h,p,x,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,d,h,p,x,v,m)}set(t,e,n,s,r,o,a,c,l,u,d,h,p,x,v,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=x,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/mi.setFromMatrixColumn(t,0).length(),r=1/mi.setFromMatrixColumn(t,1).length(),o=1/mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=o*u,p=o*d,x=a*u,v=a*d;e[0]=c*u,e[4]=-c*d,e[8]=l,e[1]=p+x*l,e[5]=h-v*l,e[9]=-a*c,e[2]=v-h*l,e[6]=x+p*l,e[10]=o*c}else if(t.order==="YXZ"){let h=c*u,p=c*d,x=l*u,v=l*d;e[0]=h+v*a,e[4]=x*a-p,e[8]=o*l,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=p*a-x,e[6]=v+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*u,p=c*d,x=l*u,v=l*d;e[0]=h-v*a,e[4]=-o*d,e[8]=x+p*a,e[1]=p+x*a,e[5]=o*u,e[9]=v-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*u,p=o*d,x=a*u,v=a*d;e[0]=c*u,e[4]=x*l-p,e[8]=h*l+v,e[1]=c*d,e[5]=v*l+h,e[9]=p*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,p=o*l,x=a*c,v=a*l;e[0]=c*u,e[4]=v-h*d,e[8]=x*d+p,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*d+x,e[10]=h-v*d}else if(t.order==="XZY"){let h=o*c,p=o*l,x=a*c,v=a*l;e[0]=c*u,e[4]=-d,e[8]=l*u,e[1]=h*d+v,e[5]=o*u,e[9]=p*d-x,e[2]=x*d-p,e[6]=a*u,e[10]=v*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ju,t,Qu)}lookAt(t,e,n){let s=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),Ln.crossVectors(n,Ge),Ln.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),Ln.crossVectors(n,Ge)),Ln.normalize(),Ys.crossVectors(Ge,Ln),s[0]=Ln.x,s[4]=Ys.x,s[8]=Ge.x,s[1]=Ln.y,s[5]=Ys.y,s[9]=Ge.y,s[2]=Ln.z,s[6]=Ys.z,s[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],x=n[2],v=n[6],m=n[10],f=n[14],w=n[3],P=n[7],M=n[11],S=n[15],T=s[0],R=s[4],y=s[8],b=s[12],A=s[1],D=s[5],O=s[9],H=s[13],N=s[2],V=s[6],$=s[10],X=s[14],nt=s[3],Y=s[7],Q=s[11],et=s[15];return r[0]=o*T+a*A+c*N+l*nt,r[4]=o*R+a*D+c*V+l*Y,r[8]=o*y+a*O+c*$+l*Q,r[12]=o*b+a*H+c*X+l*et,r[1]=u*T+d*A+h*N+p*nt,r[5]=u*R+d*D+h*V+p*Y,r[9]=u*y+d*O+h*$+p*Q,r[13]=u*b+d*H+h*X+p*et,r[2]=x*T+v*A+m*N+f*nt,r[6]=x*R+v*D+m*V+f*Y,r[10]=x*y+v*O+m*$+f*Q,r[14]=x*b+v*H+m*X+f*et,r[3]=w*T+P*A+M*N+S*nt,r[7]=w*R+P*D+M*V+S*Y,r[11]=w*y+P*O+M*$+S*Q,r[15]=w*b+P*H+M*X+S*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],p=t[14],x=t[3],v=t[7],m=t[11],f=t[15],w=c*p-l*h,P=a*p-l*d,M=a*h-c*d,S=o*p-l*u,T=o*h-c*u,R=o*d-a*u;return e*(v*w-m*P+f*M)-n*(x*w-m*S+f*T)+s*(x*P-v*S+f*R)-r*(x*M-v*T+m*R)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-n*(r*u-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],p=t[11],x=t[12],v=t[13],m=t[14],f=t[15],w=e*a-n*o,P=e*c-s*o,M=e*l-r*o,S=n*c-s*a,T=n*l-r*a,R=s*l-r*c,y=u*v-d*x,b=u*m-h*x,A=u*f-p*x,D=d*m-h*v,O=d*f-p*v,H=h*f-p*m,N=w*H-P*O+M*D+S*A-T*b+R*y;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/N;return t[0]=(a*H-c*O+l*D)*V,t[1]=(s*O-n*H-r*D)*V,t[2]=(v*R-m*T+f*S)*V,t[3]=(h*T-d*R-p*S)*V,t[4]=(c*A-o*H-l*b)*V,t[5]=(e*H-s*A+r*b)*V,t[6]=(m*M-x*R-f*P)*V,t[7]=(u*R-h*M+p*P)*V,t[8]=(o*O-a*A+l*y)*V,t[9]=(n*A-e*O-r*y)*V,t[10]=(x*T-v*M+f*w)*V,t[11]=(d*M-u*T-p*w)*V,t[12]=(a*b-o*D-c*y)*V,t[13]=(e*D-n*b+s*y)*V,t[14]=(v*P-x*S-m*w)*V,t[15]=(u*S-d*P+h*w)*V,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,d=a+a,h=r*l,p=r*u,x=r*d,v=o*u,m=o*d,f=a*d,w=c*l,P=c*u,M=c*d,S=n.x,T=n.y,R=n.z;return s[0]=(1-(v+f))*S,s[1]=(p+M)*S,s[2]=(x-P)*S,s[3]=0,s[4]=(p-M)*T,s[5]=(1-(h+f))*T,s[6]=(m+w)*T,s[7]=0,s[8]=(x+P)*R,s[9]=(m-w)*R,s[10]=(1-(h+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=mi.set(s[0],s[1],s[2]).length(),a=mi.set(s[4],s[5],s[6]).length(),c=mi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Qe.copy(this);let l=1/o,u=1/a,d=1/c;return Qe.elements[0]*=l,Qe.elements[1]*=l,Qe.elements[2]*=l,Qe.elements[4]*=u,Qe.elements[5]*=u,Qe.elements[6]*=u,Qe.elements[8]*=d,Qe.elements[9]*=d,Qe.elements[10]*=d,e.setFromRotationMatrix(Qe),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=nn,c=!1){let l=this.elements,u=2*r/(e-t),d=2*r/(n-s),h=(e+t)/(e-t),p=(n+s)/(n-s),x,v;if(c)x=r/(o-r),v=o*r/(o-r);else if(a===nn)x=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Pi)x=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=nn,c=!1){let l=this.elements,u=2/(e-t),d=2/(n-s),h=-(e+t)/(e-t),p=-(n+s)/(n-s),x,v;if(c)x=1/(o-r),v=o/(o-r);else if(a===nn)x=-2/(o-r),v=-(o+r)/(o-r);else if(a===Pi)x=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},mi=new F,Qe=new le,ju=new F(0,0,0),Qu=new F(1,1,1),Ln=new F,Ys=new F,Ge=new F,Kc=new le,jc=new Ye,wn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ot(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Kc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jc.setFromEuler(this),this.setFromQuaternion(jc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wn.DEFAULT_ORDER="XYZ";var ms=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},td=0,Qc=new F,gi=new Ye,vn=new le,qs=new F,ss=new F,ed=new F,nd=new Ye,tl=new F(1,0,0),el=new F(0,1,0),nl=new F(0,0,1),il={type:"added"},id={type:"removed"},xi={type:"childadded",child:null},ra={type:"childremoved",child:null},Ae=class i extends sn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new wn,n=new Ye,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new It}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return gi.setFromAxisAngle(t,e),this.quaternion.multiply(gi),this}rotateOnWorldAxis(t,e){return gi.setFromAxisAngle(t,e),this.quaternion.premultiply(gi),this}rotateX(t){return this.rotateOnAxis(tl,t)}rotateY(t){return this.rotateOnAxis(el,t)}rotateZ(t){return this.rotateOnAxis(nl,t)}translateOnAxis(t,e){return Qc.copy(t).applyQuaternion(this.quaternion),this.position.add(Qc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tl,t)}translateY(t){return this.translateOnAxis(el,t)}translateZ(t){return this.translateOnAxis(nl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qs.copy(t):qs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(ss,qs,this.up):vn.lookAt(qs,ss,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),gi.setFromRotationMatrix(vn),this.quaternion.premultiply(gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ct("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(il),xi.child=t,this.dispatchEvent(xi),xi.child=null):Ct("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(id),ra.child=t,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(il),xi.child=t,this.dispatchEvent(xi),xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,t,ed),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,nd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),p=o(t.animations),x=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ae.DEFAULT_UP=new F(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ri=class extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}},sd={type:"move"},Ni=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,n),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,x=.005;l.inputState.pinching&&h>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sd)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ri;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},jl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},Zs={h:0,s:0,l:0};function oa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Vt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Vt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Vt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Vt.workingColorSpace){if(t=Qa(t,1),e=Ot(e,0,1),n=Ot(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=oa(o,r,t+1/3),this.g=oa(o,r,t),this.b=oa(o,r,t-1/3)}return Vt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=jl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Tn(t.r),this.g=Tn(t.g),this.b=Tn(t.b),this}copyLinearToSRGB(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return Vt.workingToColorSpace(Te.copy(this),t),Math.round(Ot(Te.r*255,0,255))*65536+Math.round(Ot(Te.g*255,0,255))*256+Math.round(Ot(Te.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Vt.workingColorSpace){Vt.workingToColorSpace(Te.copy(this),e);let n=Te.r,s=Te.g,r=Te.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Vt.workingColorSpace){return Vt.workingToColorSpace(Te.copy(this),e),t.r=Te.r,t.g=Te.g,t.b=Te.b,t}getStyle(t=Ie){Vt.workingToColorSpace(Te.copy(this),t);let e=Te.r,n=Te.g,s=Te.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Dn),this.setHSL(Dn.h+t,Dn.s+e,Dn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Dn),t.getHSL(Zs);let n=ls(Dn.h,Zs.h,e),s=ls(Dn.s,Zs.s,e),r=ls(Dn.l,Zs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Te=new zt;zt.NAMES=jl;var gs=class extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},tn=new F,Mn=new F,aa=new F,bn=new F,_i=new F,yi=new F,sl=new F,ca=new F,la=new F,ha=new F,ua=new ae,da=new ae,fa=new ae,On=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),tn.subVectors(t,e),s.cross(tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){tn.subVectors(s,e),Mn.subVectors(n,e),aa.subVectors(t,e);let o=tn.dot(tn),a=tn.dot(Mn),c=tn.dot(aa),l=Mn.dot(Mn),u=Mn.dot(aa),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,p=(l*c-a*u)*h,x=(o*u-a*c)*h;return r.set(1-p-x,x,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bn.x),c.addScaledVector(o,bn.y),c.addScaledVector(a,bn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return ua.setScalar(0),da.setScalar(0),fa.setScalar(0),ua.fromBufferAttribute(t,e),da.fromBufferAttribute(t,n),fa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ua,r.x),o.addScaledVector(da,r.y),o.addScaledVector(fa,r.z),o}static isFrontFacing(t,e,n,s){return tn.subVectors(n,e),Mn.subVectors(t,e),tn.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),tn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;_i.subVectors(s,n),yi.subVectors(r,n),ca.subVectors(t,n);let c=_i.dot(ca),l=yi.dot(ca);if(c<=0&&l<=0)return e.copy(n);la.subVectors(t,s);let u=_i.dot(la),d=yi.dot(la);if(u>=0&&d<=u)return e.copy(s);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(_i,o);ha.subVectors(t,r);let p=_i.dot(ha),x=yi.dot(ha);if(x>=0&&p<=x)return e.copy(r);let v=p*l-c*x;if(v<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(n).addScaledVector(yi,a);let m=u*x-p*d;if(m<=0&&d-u>=0&&p-x>=0)return sl.subVectors(r,s),a=(d-u)/(d-u+(p-x)),e.copy(s).addScaledVector(sl,a);let f=1/(m+v+h);return o=v*f,a=h*f,e.copy(n).addScaledVector(_i,o).addScaledVector(yi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Bn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(en.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(en.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=en.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,en):en.fromBufferAttribute(r,o),en.applyMatrix4(t.matrixWorld),this.expandByPoint(en);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(t.matrixWorld),this.union($s)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,en),en.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rs),Js.subVectors(this.max,rs),vi.subVectors(t.a,rs),Mi.subVectors(t.b,rs),bi.subVectors(t.c,rs),Nn.subVectors(Mi,vi),Un.subVectors(bi,Mi),ei.subVectors(vi,bi);let e=[0,-Nn.z,Nn.y,0,-Un.z,Un.y,0,-ei.z,ei.y,Nn.z,0,-Nn.x,Un.z,0,-Un.x,ei.z,0,-ei.x,-Nn.y,Nn.x,0,-Un.y,Un.x,0,-ei.y,ei.x,0];return!pa(e,vi,Mi,bi,Js)||(e=[1,0,0,0,1,0,0,0,1],!pa(e,vi,Mi,bi,Js))?!1:(Ks.crossVectors(Nn,Un),e=[Ks.x,Ks.y,Ks.z],pa(e,vi,Mi,bi,Js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,en).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(en).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Sn=[new F,new F,new F,new F,new F,new F,new F,new F],en=new F,$s=new Bn,vi=new F,Mi=new F,bi=new F,Nn=new F,Un=new F,ei=new F,rs=new F,Js=new F,Ks=new F,ni=new F;function pa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ni.fromArray(i,r);let a=s.x*Math.abs(ni.x)+s.y*Math.abs(ni.y)+s.z*Math.abs(ni.z),c=t.dot(ni),l=e.dot(ni),u=n.dot(ni);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var fe=new F,js=new Pt,rd=0,Oe=class extends sn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ql,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix3(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix4(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyNormalMatrix(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.transformDirection(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ai(e,this.array)),e}setX(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ai(e,this.array)),e}setY(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ai(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ai(e,this.array)),e}setW(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array),r=Pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var xs=class extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var _s=class extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Le=class extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},od=new Bn,os=new F,ma=new F,Ui=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):od.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;os.subVectors(t,this.center);let e=os.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(os,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ma.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(os.copy(t.center).add(ma)),this.expandByPoint(os.copy(t.center).sub(ma))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ad=0,Je=new le,ga=new Ae,Si=new F,We=new Bn,as=new Bn,ye=new F,ze=class i extends sn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Iu(t)?_s:xs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new It().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return ga.lookAt(t),ga.updateMatrix(),this.applyMatrix4(ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Le(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ct("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ct('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ct("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];as.setFromBufferAttribute(a),this.morphTargetsRelative?(ye.addVectors(We.min,as.min),We.expandByPoint(ye),ye.addVectors(We.max,as.max),We.expandByPoint(ye)):(We.expandByPoint(as.min),We.expandByPoint(as.max))}We.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ye));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)ye.fromBufferAttribute(a,l),c&&(Si.fromBufferAttribute(t,l),ye.add(Si)),s=Math.max(s,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ct('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ct("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Oe(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let y=0;y<n.count;y++)a[y]=new F,c[y]=new F;let l=new F,u=new F,d=new F,h=new Pt,p=new Pt,x=new Pt,v=new F,m=new F;function f(y,b,A){l.fromBufferAttribute(n,y),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,A),h.fromBufferAttribute(r,y),p.fromBufferAttribute(r,b),x.fromBufferAttribute(r,A),u.sub(l),d.sub(l),p.sub(h),x.sub(h);let D=1/(p.x*x.y-x.x*p.y);isFinite(D)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(D),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(D),a[y].add(v),a[b].add(v),a[A].add(v),c[y].add(m),c[b].add(m),c[A].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let y=0,b=w.length;y<b;++y){let A=w[y],D=A.start,O=A.count;for(let H=D,N=D+O;H<N;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let P=new F,M=new F,S=new F,T=new F;function R(y){S.fromBufferAttribute(s,y),T.copy(S);let b=a[y];P.copy(b),P.sub(S.multiplyScalar(S.dot(b))).normalize(),M.crossVectors(T,b);let D=M.dot(c[y])<0?-1:1;o.setXYZW(y,P.x,P.y,P.z,D)}for(let y=0,b=w.length;y<b;++y){let A=w[y],D=A.start,O=A.count;for(let H=D,N=D+O;H<N;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,u=new F,d=new F;if(t)for(let h=0,p=t.count;h<p;h+=3){let x=t.getX(h+0),v=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,x),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),p=0,x=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?p=c[v]*a.data.stride+a.offset:p=c[v]*u;for(let f=0;f<u;f++)h[x++]=l[p++]}return new Oe(h,u,d)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],p=t(h,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let p=l[d];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],d=r[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var xa=new F,cd=new F,ld=new It,Xe=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=xa.subVectors(n,e).cross(cd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(xa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ld.getNormalMatrix(t),s=this.coplanarPoint(xa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},hd=0,kn=class extends sn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=Wi,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Da,this.blendDst=Na,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=dr,this.stencilZFail=dr,this.stencilZPass=dr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Xe().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Pt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var En=new F,_a=new F,Qs=new F,tr=new F,Fi=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){_a.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),tr.copy(this.origin).sub(_a);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Qs),a=tr.dot(this.direction),c=-tr.dot(Qs),l=tr.lengthSq(),u=Math.abs(1-o*o),d,h,p,x;if(u>0)if(d=o*c-a,h=o*a-c,x=r*u,d>=0)if(h>=-x)if(h<=x){let v=1/u;d*=v,h*=v,p=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;else h<=-x?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+h*(h+2*c)+l):h<=x?(d=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(_a).addScaledVector(Qs,h),p}intersectSphere(t,e){if(t.radius<0)return null;En.subVectors(t.center,this.origin);let n=En.dot(this.direction),s=En.dot(En)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-h.z)*d,c=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,c=(t.min.z-h.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,d=t.x-o.x,h=t.y-o.y,p=t.z-o.z,x=e.x-o.x,v=e.y-o.y,m=e.z-o.z,f=n.x-o.x,w=n.y-o.y,P=n.z-o.z,M=Math.abs(c),S=Math.abs(l),T=Math.abs(u),R,y,b,A,D,O,H,N,V,$,X,nt;if(M>=S&&M>=T?(b=c,O=d,V=x,nt=f,c>=0?(R=l,y=u,A=h,D=p,H=v,N=m,$=w,X=P):(R=u,y=l,A=p,D=h,H=m,N=v,$=P,X=w)):S>=T?(b=l,O=h,V=v,nt=w,l>=0?(R=u,y=c,A=p,D=d,H=m,N=x,$=P,X=f):(R=c,y=u,A=d,D=p,H=x,N=m,$=f,X=P)):(b=u,O=p,V=m,nt=P,u>=0?(R=c,y=l,A=d,D=h,H=x,N=v,$=f,X=w):(R=l,y=c,A=h,D=d,H=v,N=x,$=w,X=f)),b===0)return null;let Y=R/b,Q=y/b,et=1/b,wt=A-Y*O,Et=D-Q*O,te=H-Y*V,Gt=N-Q*V,Yt=$-Y*nt,q=X-Q*nt,j=Yt*Gt-q*te,xt=wt*q-Et*Yt,Lt=te*Et-Gt*wt;if(s){if(j<0||xt<0||Lt<0)return null}else if((j<0||xt<0||Lt<0)&&(j>0||xt>0||Lt>0))return null;let mt=j+xt+Lt;if(mt===0)return null;let Ft=et*(j*O+xt*V+Lt*nt);return(mt>0?Ft<0:Ft>0)?null:this.at(Ft/mt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ys=class extends kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},rl=new le,ii=new Fi,er=new Ui,ol=new F,nr=new F,ir=new F,sr=new F,ya=new F,rr=new F,al=new F,or=new F,De=class extends Ae{constructor(t=new ze,e=new ys){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){rr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],d=r[c];u!==0&&(ya.fromBufferAttribute(d,t),o?rr.addScaledVector(ya,u):rr.addScaledVector(ya.sub(e),u))}e.add(rr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(r),ii.copy(t.ray).recast(t.near),!(er.containsPoint(ii.origin)===!1&&(ii.intersectSphere(er,ol)===null||ii.origin.distanceToSquared(ol)>(t.far-t.near)**2))&&(rl.copy(r).invert(),ii.copy(t.ray).applyMatrix4(rl),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ii)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,v=h.length;x<v;x++){let m=h[x],f=o[m.materialIndex],w=Math.max(m.start,p.start),P=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=w,S=P;M<S;M+=3){let T=a.getX(M),R=a.getX(M+1),y=a.getX(M+2);s=ar(this,f,t,n,l,u,d,T,R,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=x,f=v;m<f;m+=3){let w=a.getX(m),P=a.getX(m+1),M=a.getX(m+2);s=ar(this,o,t,n,l,u,d,w,P,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,v=h.length;x<v;x++){let m=h[x],f=o[m.materialIndex],w=Math.max(m.start,p.start),P=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=w,S=P;M<S;M+=3){let T=M,R=M+1,y=M+2;s=ar(this,f,t,n,l,u,d,T,R,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=x,f=v;m<f;m+=3){let w=m,P=m+1,M=m+2;s=ar(this,o,t,n,l,u,d,w,P,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function ud(i,t,e,n,s,r,o,a){let c;if(t.side===Ne?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Yn,a),c===null)return null;or.copy(a),or.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(or);return l<e.near||l>e.far?null:{distance:l,point:or.clone(),object:i}}function ar(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,nr),i.getVertexPosition(c,ir),i.getVertexPosition(l,sr);let u=ud(i,t,e,n,nr,ir,sr,al);if(u){let d=new F;On.getBarycoord(al,nr,ir,sr,d),s&&(u.uv=On.getInterpolatedAttribute(s,a,c,l,d,new Pt)),r&&(u.uv1=On.getInterpolatedAttribute(r,a,c,l,d,new Pt)),o&&(u.normal=On.getInterpolatedAttribute(o,a,c,l,d,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new F,materialIndex:0};On.getNormal(nr,ir,sr,h.normal),u.face=h,u.barycoord=d}return u}var wr=class extends Be{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ve,u=ve,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var si=new Ui,dd=new Pt(.5,.5),cr=new F,Oi=class{constructor(t=new Xe,e=new Xe,n=new Xe,s=new Xe,r=new Xe,o=new Xe){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=nn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],p=r[7],x=r[8],v=r[9],m=r[10],f=r[11],w=r[12],P=r[13],M=r[14],S=r[15];if(s[0].setComponents(l-o,p-u,f-x,S-w).normalize(),s[1].setComponents(l+o,p+u,f+x,S+w).normalize(),s[2].setComponents(l+a,p+d,f+v,S+P).normalize(),s[3].setComponents(l-a,p-d,f-v,S-P).normalize(),n)s[4].setComponents(c,h,m,M).normalize(),s[5].setComponents(l-c,p-h,f-m,S-M).normalize();else if(s[4].setComponents(l-c,p-h,f-m,S-M).normalize(),e===nn)s[5].setComponents(l+c,p+h,f+m,S+M).normalize();else if(e===Pi)s[5].setComponents(c,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(t){si.center.set(0,0,0);let e=dd.distanceTo(t.center);return si.radius=.7071067811865476+e,si.applyMatrix4(t.matrixWorld),this.intersectsSphere(si)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(cr.x=s.normal.x>0?t.max.x:t.min.x,cr.y=s.normal.y>0?t.max.y:t.min.y,cr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var vs=class extends Be{constructor(t=[],e=qn,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var zn=class extends Be{constructor(t,e,n=on,s,r,o,a=ve,c=ve,l,u=pn,d=1){if(u!==pn&&u!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:d};super(h,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Di(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ar=class extends zn{constructor(t,e=on,n=qn,s,r,o=ve,a=ve,c,l=pn){let u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ms=class extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Bi=class i extends ze{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],d=[],h=0,p=0;x("z","y","x",-1,-1,n,e,t,o,r,0),x("z","y","x",1,-1,n,e,-t,o,r,1),x("x","z","y",1,1,t,n,e,s,o,2),x("x","z","y",1,-1,t,n,-e,s,o,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Le(l,3)),this.setAttribute("normal",new Le(u,3)),this.setAttribute("uv",new Le(d,2));function x(v,m,f,w,P,M,S,T,R,y,b){let A=M/R,D=S/y,O=M/2,H=S/2,N=T/2,V=R+1,$=y+1,X=0,nt=0,Y=new F;for(let Q=0;Q<$;Q++){let et=Q*D-H;for(let wt=0;wt<V;wt++){let Et=wt*A-O;Y[v]=Et*w,Y[m]=et*P,Y[f]=N,l.push(Y.x,Y.y,Y.z),Y[v]=0,Y[m]=0,Y[f]=T>0?1:-1,u.push(Y.x,Y.y,Y.z),d.push(wt/R),d.push(1-Q/y),X+=1}}for(let Q=0;Q<y;Q++)for(let et=0;et<R;et++){let wt=h+et+V*Q,Et=h+et+V*(Q+1),te=h+(et+1)+V*(Q+1),Gt=h+(et+1)+V*Q;c.push(wt,Et,Gt),c.push(Et,te,Gt),nt+=6}a.addGroup(p,nt,b),p+=nt,h+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var bs=class i extends ze{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new F,u=new Pt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){let p=n+d/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,c.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Le(o,3)),this.setAttribute("normal",new Le(a,3)),this.setAttribute("uv",new Le(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}};var Ss=class i extends ze{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=t/a,h=e/c,p=[],x=[],v=[],m=[];for(let f=0;f<u;f++){let w=f*h-o;for(let P=0;P<l;P++){let M=P*d-r;x.push(M,-w,0),v.push(0,0,1),m.push(P/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let w=0;w<a;w++){let P=w+l*f,M=w+l*(f+1),S=w+1+l*(f+1),T=w+1+l*f;p.push(P,M,T),p.push(M,S,T)}this.setIndex(p),this.setAttribute("position",new Le(x,3)),this.setAttribute("normal",new Le(v,3)),this.setAttribute("uv",new Le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function li(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(cl(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(cl(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Re(i){let t={};for(let e=0;e<i.length;e++){let n=li(i[e]);for(let s in n)t[s]=n[s]}return t}function cl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function fd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ec(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Vt.workingColorSpace}var Ql={clone:li,merge:Re},pd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,md=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qe=class extends kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pd,this.fragmentShader=md,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=li(t.uniforms),this.uniformsGroups=fd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new zt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Pt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ae().fromArray(s.value);break;case"m3":this.uniforms[n].value=new It().fromArray(s.value);break;case"m4":this.uniforms[n].value=new le().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Rr=class extends qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ki=class extends kn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Po,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Cr=class extends kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Pr=class extends kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ei(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function va(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Hn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ir=class extends Hn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sa,endingEnd:Sa}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ea:r=t,a=2*e-n;break;case Ta:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ea:o=t,c=2*n-e;break;case Ta:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,x=(n-e)/(s-e),v=x*x,m=v*x,f=-h*m+2*h*v-h*x,w=(1+h)*m+(-1.5-2*h)*v+(-.5+h)*x+1,P=(-1-p)*m+(1.5+p)*v+.5*x,M=p*m-p*v;for(let S=0;S!==a;++S)r[S]=f*o[u+S]+w*o[l+S]+P*o[c+S]+M*o[d+S];return r}},Lr=class extends Hn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(s-e),d=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*d+o[c+h]*u;return r}},Dr=class extends Hn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Nr=class extends Hn{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let x=(n-e)/(s-e),v=1-x;for(let m=0;m!==a;++m)r[m]=o[l+m]*v+o[c+m]*x;return r}let h=a*2,p=t-1;for(let x=0;x!==a;++x){let v=o[l+x],m=o[c+x],f=p*h+x*2,w=d[f],P=d[f+1],M=t*h+x*2,S=u[M],T=u[M+1],R=xd(n,e,w,S,s);r[x]=th(R,v,P,T,m)}return r}};function th(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function gd(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function xd(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=th(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=gd(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var Ze=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ei(e,this.TimeBufferType),this.values=Ei(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ei(t.times,Array),values:Ei(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),va(t.settings)&&(n.settings={inTangents:Ei(t.settings.inTangents,Array),outTangents:Ei(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Dr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Lr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ir(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Nr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case hs:e=this.InterpolantFactoryMethodDiscrete;break;case br:e=this.InterpolantFactoryMethodLinear;break;case ur:e=this.InterpolantFactoryMethodSmooth;break;case ba:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Rt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hs;case this.InterpolantFactoryMethodLinear:return br;case this.InterpolantFactoryMethodSmooth:return ur;case this.InterpolantFactoryMethodBezier:return ba}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;va(this.settings)&&(ll(this.settings.inTangents,t),ll(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ct("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ct("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ct("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Ct("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Lu(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Ct("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ur,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,h=d-n,p=d+n;for(let x=0;x!==n;++x){let v=e[d+x];if(v!==e[h+x]||v!==e[p+x]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,h=o*n;for(let p=0;p!==n;++p)e[h+p]=e[d+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,va(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function ll(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Ze.prototype.ValueTypeName="";Ze.prototype.TimeBufferType=Float32Array;Ze.prototype.ValueBufferType=Float32Array;Ze.prototype.DefaultInterpolation=br;var Vn=class extends Ze{constructor(t,e,n){super(t,e,n)}};Vn.prototype.ValueTypeName="bool";Vn.prototype.ValueBufferType=Array;Vn.prototype.DefaultInterpolation=hs;Vn.prototype.InterpolantFactoryMethodLinear=void 0;Vn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ur=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}};Ur.prototype.ValueTypeName="color";var Fr=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}};Fr.prototype.ValueTypeName="number";var Or=class extends Hn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let u=l+a;l!==u;l+=4)Ye.slerpFlat(r,0,o,l-a,o,l,c);return r}},Es=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Or(this.times,this.values,this.getValueSize(),t)}};Es.prototype.ValueTypeName="quaternion";Es.prototype.InterpolantFactoryMethodSmooth=void 0;var Gn=class extends Ze{constructor(t,e,n){super(t,e,n)}};Gn.prototype.ValueTypeName="string";Gn.prototype.ValueBufferType=Array;Gn.prototype.DefaultInterpolation=hs;Gn.prototype.InterpolantFactoryMethodLinear=void 0;Gn.prototype.InterpolantFactoryMethodSmooth=void 0;var Br=class extends Ze{constructor(t,e,n,s){super(t,e,n,s)}};Br.prototype.ValueTypeName="vector";var kr=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let p=l[d],x=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},eh=new kr,zr=class{constructor(t){this.manager=t!==void 0?t:eh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};zr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ts=class extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},ws=class extends Ts{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Ma=new le,hl=new F,ul=new F,Hr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.mapType=He,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Oi,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;hl.setFromMatrixPosition(t.matrixWorld),e.position.copy(hl),ul.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ul),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ma.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ma,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Pi||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},lr=new F,hr=new Ye,dn=new F,As=class extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(lr,hr,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lr,hr,dn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(lr,hr,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lr,hr,dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fn=new F,dl=new Pt,fl=new Pt,we=class extends As{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Li*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Li*2*Math.atan(Math.tan(cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z)}getViewSize(t,e){return this.getViewBounds(t,dl,fl),e.subVectors(fl,dl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(cs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var zi=class extends As{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},wa=class extends Hr{constructor(){super(new zi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hi=class extends Ts{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new wa}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Ti=-90,wi=1,Vr=class extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new we(Ti,wi,t,e);s.layers=this.layers,this.add(s);let r=new we(Ti,wi,t,e);r.layers=this.layers,this.add(r);let o=new we(Ti,wi,t,e);o.layers=this.layers,this.add(o);let a=new we(Ti,wi,t,e);a.layers=this.layers,this.add(a);let c=new we(Ti,wi,t,e);c.layers=this.layers,this.add(c);let l=new we(Ti,wi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Pi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,p),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Gr=class extends we{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var nc="\\[\\]\\.:\\/",_d=new RegExp("["+nc+"]","g"),ic="[^"+nc+"]",yd="[^"+nc.replace("\\.","")+"]",vd=/((?:WC+[\/:])*)/.source.replace("WC",ic),Md=/(WCOD+)?/.source.replace("WCOD",yd),bd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ic),Sd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ic),Ed=new RegExp("^"+vd+Md+bd+Sd+"$"),Td=["material","materials","bones","map"],Aa=class{constructor(t,e,n){let s=n||re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},re=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(_d,"")}static parseTrackName(t){let e=Ed.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Td.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Ct("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ct("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ct("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ct("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ct("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ct("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Ct("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;Ct("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ct("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ct("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};re.Composite=Aa;re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};re.prototype.GetterByBindingType=[re.prototype._getValue_direct,re.prototype._getValue_array,re.prototype._getValue_arrayElement,re.prototype._getValue_toArray];re.prototype.SetterByBindingTypeAndVersioning=[[re.prototype._setValue_direct,re.prototype._setValue_direct_setNeedsUpdate,re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[re.prototype._setValue_array,re.prototype._setValue_array_setNeedsUpdate,re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[re.prototype._setValue_arrayElement,re.prototype._setValue_arrayElement_setNeedsUpdate,re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[re.prototype._setValue_fromArray,re.prototype._setValue_fromArray_setNeedsUpdate,re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var H3=new Float32Array(1);var Vi=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ot(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ot(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ra=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};var Rs=class extends sn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function sc(i,t,e,n){let s=wd(n);switch(e){case Za:return i*t;case Ja:return i*t/s.components*s.byteLength;case Jr:return i*t/s.components*s.byteLength;case Jn:return i*t*2/s.components*s.byteLength;case Kr:return i*t*2/s.components*s.byteLength;case $a:return i*t*3/s.components*s.byteLength;case Ke:return i*t*4/s.components*s.byteLength;case jr:return i*t*4/s.components*s.byteLength;case Ls:case Ds:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ns:case Us:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case to:case no:return Math.max(i,16)*Math.max(t,8)/4;case Qr:case eo:return Math.max(i,8)*Math.max(t,8)/2;case io:case so:case oo:case ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ro:case Fs:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case uo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case mo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case go:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case xo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case yo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case vo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case bo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case So:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Eo:case To:case wo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ao:case Ro:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Os:case Co:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wd(i){switch(i){case He:case Wa:return{byteLength:1,components:1};case Xi:case Xa:case cn:return{byteLength:2,components:1};case Zr:case $r:return{byteLength:2,components:4};case on:case qr:case an:return{byteLength:4,components:1};case Ya:case qa:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Sh(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Rd(i){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,x)=>p.start-x.start);let h=0;for(let p=1;p<d.length;p++){let x=d[h],v=d[p];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++h,d[h]=v)}d.length=h+1;for(let p=0,x=d.length;p<x;p++){let v=d[p];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Cd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pd=`#ifdef USE_ALPHAHASH
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
#endif`,Id=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ud=`#ifdef USE_AOMAP
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
#endif`,Fd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Od=`#ifdef USE_BATCHING
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
#endif`,Bd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vd=`#ifdef USE_IRIDESCENCE
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
#endif`,Gd=`#ifdef USE_BUMPMAP
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
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,jd=`#define PI 3.141592653589793
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
} // validated`,Qd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,t1=`vec3 transformedNormal = objectNormal;
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
#endif`,e1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,n1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,i1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,s1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,r1="gl_FragColor = linearToOutputTexel( gl_FragColor );",o1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,a1=`#ifdef USE_ENVMAP
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
#endif`,c1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,l1=`#ifdef USE_ENVMAP
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
#endif`,h1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,u1=`#ifdef USE_ENVMAP
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
#endif`,d1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,p1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,m1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g1=`#ifdef USE_GRADIENTMAP
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
}`,x1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,y1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,v1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,M1=`#ifdef USE_ENVMAP
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
#endif`,b1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,S1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,T1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,w1=`PhysicalMaterial material;
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
#endif`,A1=`uniform sampler2D dfgLUT;
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
}`,R1=`
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
#endif`,C1=`#if defined( RE_IndirectDiffuse )
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
#endif`,P1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,L1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,D1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,F1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,O1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,k1=`#if defined( USE_POINTS_UV )
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
#endif`,z1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,H1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,V1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,W1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X1=`#ifdef USE_MORPHTARGETS
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
#endif`,Y1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Z1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,j1=`#ifdef USE_NORMALMAP
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
#endif`,Q1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ef=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,of=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,df=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mf=`float getShadowMask() {
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
}`,gf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xf=`#ifdef USE_SKINNING
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
#endif`,_f=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yf=`#ifdef USE_SKINNING
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
#endif`,vf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ef=`#ifdef USE_TRANSMISSION
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
#endif`,Tf=`#ifdef USE_TRANSMISSION
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
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Pf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,If=`uniform sampler2D t2D;
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
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Df=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`#include <common>
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
}`,Of=`#if DEPTH_PACKING == 3200
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
}`,Bf=`#define DISTANCE
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
}`,kf=`#define DISTANCE
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
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`uniform float scale;
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
}`,Gf=`uniform vec3 diffuse;
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
}`,Wf=`#include <common>
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
}`,Xf=`uniform vec3 diffuse;
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
}`,Yf=`#define LAMBERT
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
}`,qf=`#define LAMBERT
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
}`,Zf=`#define MATCAP
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
}`,$f=`#define MATCAP
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
}`,Jf=`#define NORMAL
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
}`,Kf=`#define NORMAL
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
}`,jf=`#define PHONG
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
}`,Qf=`#define PHONG
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
}`,tp=`#define STANDARD
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
}`,ep=`#define STANDARD
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
}`,np=`#define TOON
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
}`,ip=`#define TOON
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
}`,sp=`uniform float size;
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
}`,rp=`uniform vec3 diffuse;
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
}`,op=`#include <common>
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
}`,ap=`uniform vec3 color;
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
}`,cp=`uniform float rotation;
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
}`,lp=`uniform vec3 diffuse;
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
}`,Ut={alphahash_fragment:Cd,alphahash_pars_fragment:Pd,alphamap_fragment:Id,alphamap_pars_fragment:Ld,alphatest_fragment:Dd,alphatest_pars_fragment:Nd,aomap_fragment:Ud,aomap_pars_fragment:Fd,batching_pars_vertex:Od,batching_vertex:Bd,begin_vertex:kd,beginnormal_vertex:zd,bsdfs:Hd,iridescence_fragment:Vd,bumpmap_pars_fragment:Gd,clipping_planes_fragment:Wd,clipping_planes_pars_fragment:Xd,clipping_planes_pars_vertex:Yd,clipping_planes_vertex:qd,color_fragment:Zd,color_pars_fragment:$d,color_pars_vertex:Jd,color_vertex:Kd,common:jd,cube_uv_reflection_fragment:Qd,defaultnormal_vertex:t1,displacementmap_pars_vertex:e1,displacementmap_vertex:n1,emissivemap_fragment:i1,emissivemap_pars_fragment:s1,colorspace_fragment:r1,colorspace_pars_fragment:o1,envmap_fragment:a1,envmap_common_pars_fragment:c1,envmap_pars_fragment:l1,envmap_pars_vertex:h1,envmap_physical_pars_fragment:M1,envmap_vertex:u1,fog_vertex:d1,fog_pars_vertex:f1,fog_fragment:p1,fog_pars_fragment:m1,gradientmap_pars_fragment:g1,lightmap_pars_fragment:x1,lights_lambert_fragment:_1,lights_lambert_pars_fragment:y1,lights_pars_begin:v1,lights_toon_fragment:b1,lights_toon_pars_fragment:S1,lights_phong_fragment:E1,lights_phong_pars_fragment:T1,lights_physical_fragment:w1,lights_physical_pars_fragment:A1,lights_fragment_begin:R1,lights_fragment_maps:C1,lights_fragment_end:P1,lightprobes_pars_fragment:I1,logdepthbuf_fragment:L1,logdepthbuf_pars_fragment:D1,logdepthbuf_pars_vertex:N1,logdepthbuf_vertex:U1,map_fragment:F1,map_pars_fragment:O1,map_particle_fragment:B1,map_particle_pars_fragment:k1,metalnessmap_fragment:z1,metalnessmap_pars_fragment:H1,morphinstance_vertex:V1,morphcolor_vertex:G1,morphnormal_vertex:W1,morphtarget_pars_vertex:X1,morphtarget_vertex:Y1,normal_fragment_begin:q1,normal_fragment_maps:Z1,normal_pars_fragment:$1,normal_pars_vertex:J1,normal_vertex:K1,normalmap_pars_fragment:j1,clearcoat_normal_fragment_begin:Q1,clearcoat_normal_fragment_maps:tf,clearcoat_pars_fragment:ef,iridescence_pars_fragment:nf,opaque_fragment:sf,packing:rf,premultiplied_alpha_fragment:of,project_vertex:af,dithering_fragment:cf,dithering_pars_fragment:lf,roughnessmap_fragment:hf,roughnessmap_pars_fragment:uf,shadowmap_pars_fragment:df,shadowmap_pars_vertex:ff,shadowmap_vertex:pf,shadowmask_pars_fragment:mf,skinbase_vertex:gf,skinning_pars_vertex:xf,skinning_vertex:_f,skinnormal_vertex:yf,specularmap_fragment:vf,specularmap_pars_fragment:Mf,tonemapping_fragment:bf,tonemapping_pars_fragment:Sf,transmission_fragment:Ef,transmission_pars_fragment:Tf,uv_pars_fragment:wf,uv_pars_vertex:Af,uv_vertex:Rf,worldpos_vertex:Cf,background_vert:Pf,background_frag:If,backgroundCube_vert:Lf,backgroundCube_frag:Df,cube_vert:Nf,cube_frag:Uf,depth_vert:Ff,depth_frag:Of,distance_vert:Bf,distance_frag:kf,equirect_vert:zf,equirect_frag:Hf,linedashed_vert:Vf,linedashed_frag:Gf,meshbasic_vert:Wf,meshbasic_frag:Xf,meshlambert_vert:Yf,meshlambert_frag:qf,meshmatcap_vert:Zf,meshmatcap_frag:$f,meshnormal_vert:Jf,meshnormal_frag:Kf,meshphong_vert:jf,meshphong_frag:Qf,meshphysical_vert:tp,meshphysical_frag:ep,meshtoon_vert:np,meshtoon_frag:ip,points_vert:sp,points_frag:rp,shadow_vert:op,shadow_frag:ap,sprite_vert:cp,sprite_frag:lp},ht={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},_n={basic:{uniforms:Re([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Re([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new zt(0)},envMapIntensity:{value:1}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Re([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Re([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Re([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Re([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Re([ht.points,ht.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Re([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Re([ht.common,ht.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Re([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Re([ht.sprite,ht.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distance:{uniforms:Re([ht.common,ht.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distance_vert,fragmentShader:Ut.distance_frag},shadow:{uniforms:Re([ht.lights,ht.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};_n.physical={uniforms:Re([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};var Do={r:0,b:0,g:0},hp=new le,Eh=new It;Eh.set(-1,0,0,0,1,0,0,0,1);function up(i,t,e,n,s,r){let o=new zt(0),a=s===!0?0:1,c,l,u=null,d=0,h=null;function p(w){let P=w.isScene===!0?w.background:null;if(P&&P.isTexture){let M=w.backgroundBlurriness>0;P=t.get(P,M)}return P}function x(w){let P=!1,M=p(w);M===null?m(o,a):M&&M.isColor&&(m(M,1),P=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||P)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(w,P){let M=p(P);M&&(M.isCubeTexture||M.mapping===Ps)?(l===void 0&&(l=new De(new Bi(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:li(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hp.makeRotationFromEuler(P.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Eh),l.material.toneMapped=Vt.getTransfer(M.colorSpace)!==$t,(u!==M||d!==M.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,d=M.version,h=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new De(new Ss(2,2),new qe({name:"BackgroundMaterial",uniforms:li(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,c.material.toneMapped=Vt.getTransfer(M.colorSpace)!==$t,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,h=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function m(w,P){w.getRGB(Do,ec(i)),e.buffers.color.setClear(Do.r,Do.g,Do.b,P,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,P=1){o.set(w),a=P,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(w){a=w,m(o,a)},render:x,addToRenderList:v,dispose:f}}function dp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(D,O,H,N,V){let $=!1,X=d(D,N,H,O);r!==X&&(r=X,l(r.object)),$=p(D,N,H,V),$&&x(D,N,H,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,M(D,O,H,N),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function d(D,O,H,N){let V=N.wireframe===!0,$=n[O.id];$===void 0&&($={},n[O.id]=$);let X=D.isInstancedMesh===!0?D.id:0,nt=$[X];nt===void 0&&(nt={},$[X]=nt);let Y=nt[H.id];Y===void 0&&(Y={},nt[H.id]=Y);let Q=Y[V];return Q===void 0&&(Q=h(c()),Y[V]=Q),Q}function h(D){let O=[],H=[],N=[];for(let V=0;V<e;V++)O[V]=0,H[V]=0,N[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:N,object:D,attributes:{},index:null}}function p(D,O,H,N){let V=r.attributes,$=O.attributes,X=0,nt=H.getAttributes();for(let Y in nt)if(nt[Y].location>=0){let et=V[Y],wt=$[Y];if(wt===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(wt=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(wt=D.instanceColor)),et===void 0||et.attribute!==wt||wt&&et.data!==wt.data)return!0;X++}return r.attributesNum!==X||r.index!==N}function x(D,O,H,N){let V={},$=O.attributes,X=0,nt=H.getAttributes();for(let Y in nt)if(nt[Y].location>=0){let et=$[Y];et===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(et=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(et=D.instanceColor));let wt={};wt.attribute=et,et&&et.data&&(wt.data=et.data),V[Y]=wt,X++}r.attributes=V,r.attributesNum=X,r.index=N}function v(){let D=r.newAttributes;for(let O=0,H=D.length;O<H;O++)D[O]=0}function m(D){f(D,0)}function f(D,O){let H=r.newAttributes,N=r.enabledAttributes,V=r.attributeDivisors;H[D]=1,N[D]===0&&(i.enableVertexAttribArray(D),N[D]=1),V[D]!==O&&(i.vertexAttribDivisor(D,O),V[D]=O)}function w(){let D=r.newAttributes,O=r.enabledAttributes;for(let H=0,N=O.length;H<N;H++)O[H]!==D[H]&&(i.disableVertexAttribArray(H),O[H]=0)}function P(D,O,H,N,V,$,X){X===!0?i.vertexAttribIPointer(D,O,H,V,$):i.vertexAttribPointer(D,O,H,N,V,$)}function M(D,O,H,N){v();let V=N.attributes,$=H.getAttributes(),X=O.defaultAttributeValues;for(let nt in $){let Y=$[nt];if(Y.location>=0){let Q=V[nt];if(Q===void 0&&(nt==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),nt==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor)),Q!==void 0){let et=Q.normalized,wt=Q.itemSize,Et=t.get(Q);if(Et===void 0)continue;let te=Et.buffer,Gt=Et.type,Yt=Et.bytesPerElement,q=Gt===i.INT||Gt===i.UNSIGNED_INT||Q.gpuType===qr;if(Q.isInterleavedBufferAttribute){let j=Q.data,xt=j.stride,Lt=Q.offset;if(j.isInstancedInterleavedBuffer){for(let mt=0;mt<Y.locationSize;mt++)f(Y.location+mt,j.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let mt=0;mt<Y.locationSize;mt++)m(Y.location+mt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let mt=0;mt<Y.locationSize;mt++)P(Y.location+mt,wt/Y.locationSize,Gt,et,xt*Yt,(Lt+wt/Y.locationSize*mt)*Yt,q)}else{if(Q.isInstancedBufferAttribute){for(let j=0;j<Y.locationSize;j++)f(Y.location+j,Q.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let j=0;j<Y.locationSize;j++)m(Y.location+j);i.bindBuffer(i.ARRAY_BUFFER,te);for(let j=0;j<Y.locationSize;j++)P(Y.location+j,wt/Y.locationSize,Gt,et,wt*Yt,wt/Y.locationSize*j*Yt,q)}}else if(X!==void 0){let et=X[nt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(Y.location,et);break;case 3:i.vertexAttrib3fv(Y.location,et);break;case 4:i.vertexAttrib4fv(Y.location,et);break;default:i.vertexAttrib1fv(Y.location,et)}}}}w()}function S(){b();for(let D in n){let O=n[D];for(let H in O){let N=O[H];for(let V in N){let $=N[V];for(let X in $)u($[X].object),delete $[X];delete N[V]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let O=n[D.id];for(let H in O){let N=O[H];for(let V in N){let $=N[V];for(let X in $)u($[X].object),delete $[X];delete N[V]}}delete n[D.id]}function R(D){for(let O in n){let H=n[O];for(let N in H){let V=H[N];if(V[D.id]===void 0)continue;let $=V[D.id];for(let X in $)u($[X].object),delete $[X];delete V[D.id]}}}function y(D){for(let O in n){let H=n[O],N=D.isInstancedMesh===!0?D.id:0,V=H[N];if(V!==void 0){for(let $ in V){let X=V[$];for(let nt in X)u(X[nt].object),delete X[nt];delete V[$]}delete H[N],Object.keys(H).length===0&&delete n[O]}}}function b(){A(),o=!0,r!==s&&(r=s,l(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:b,resetDefaultState:A,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:w}}function fp(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function pp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Ke&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let y=R===cn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==He&&R!==an&&!y&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(Rt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),P=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:P,maxFragmentUniforms:M,maxSamples:S,samples:T}}function mp(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Xe,a=new It,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||n!==0||s;return s=h,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,p){let x=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||x===null||x.length===0||r&&!m)r?u(null):l();else{let w=r?0:n,P=w*4,M=f.clippingState||null;c.value=M,M=u(x,h,P,p);for(let S=0;S!==P;++S)M[S]=e[S];f.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,p,x){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=c.value,x!==!0||m===null){let f=p+v*4,w=h.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let P=0,M=p;P!==v;++P,M+=4)o.copy(d[P]).applyMatrix4(w,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}var $i=4,gp=6,xp=20,_p=256,Bs=new zi,nh=new zt,rc=null,oc=0,ac=0,cc=!1,yp=new F,hi=new F,Uo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=yp}=r;rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(rc,oc,ac),this._renderer.xr.enabled=cc,t.scissorTest=!1,Zi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qn||t.mapping===ci?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Me,minFilter:Me,generateMipmaps:!1,type:cn,format:Ke,colorSpace:us,depthBuffer:!1},s=ih(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ih(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=vp(r)),this._blurMaterial=bp(r,t,e),this._ggxMaterial=Mp(r,t,e)}return s}_compileMaterial(t){let e=new De(new ze,t);this._renderer.compile(e,Bs)}_sceneToCubeUV(t,e,n,s,r){let c=new we(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(nh),d.toneMapping=rn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new De(new Bi,new ys({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,f=!1,w=t.background;w?w.isColor&&(m.color.copy(w),t.background=null,f=!0):(m.color.copy(nh),f=!0);for(let P=0;P<6;P++){let M=P%3;M===0?(c.up.set(0,l[P],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[P],r.y,r.z)):M===1?(c.up.set(0,0,l[P]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[P],r.z)):(c.up.set(0,l[P],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[P]));let S=this._cubeSize;Zi(s,M*S,P>2?S:0,S,S),d.setRenderTarget(s),f&&d.render(v,c),d.render(t,c)}d.toneMapping=p,d.autoClear=h,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===qn||t.mapping===ci;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=rh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Zi(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Bs)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,p=d*h,{_lodMax:x}=this,v=this._sizeLods[n],m=3*v*(n>x-$i?n-x+$i:0),f=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=x-e,Zi(r,m,f,3*v,2*v),s.setRenderTarget(r),s.render(a,Bs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-n,Zi(t,m,f,3*v,2*v),s.setRenderTarget(t),s.render(a,Bs)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-$i?s-this._lodMax+$i:0),h=4*(this._cubeSize-u);Zi(e,d,h,3*u,2*u),o.setRenderTarget(e),o.render(c,Bs)}};function vp(i){let t=[],e=[],n=i,s=i-$i+1+gp;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,l=1+a,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,p=3,x=new Float32Array(p*h*d),v=new Float32Array(p*h*d);for(let f=0;f<d;f++){let w=f%3*2/3-1,P=f>2?0:-1,M=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];x.set(M,p*h*f);for(let S=0;S<h;S++){let T=u[S*2]*2-1,R=u[S*2+1]*2-1;f===0?hi.set(1,R,T):f===1?hi.set(-T,1,-R):f===2?hi.set(-T,R,1):f===3?hi.set(-1,R,-T):f===4?hi.set(-T,-1,R):hi.set(T,R,-1),hi.toArray(v,(f*h+S)*p)}}let m=new ze;m.setAttribute("position",new Oe(x,p)),m.setAttribute("outputDirection",new Oe(v,p)),e.push(new De(m,null)),n>$i&&n--}return{lodMeshes:e,sizeLods:t}}function ih(i,t,e){let n=new ke(i,t,e);return n.texture.mapping=Ps,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Mp(i,t,e){return new qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_p,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Bo(),fragmentShader:`

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
		`,blending:gn,depthTest:!1,depthWrite:!1})}function bp(i,t,e){return new qe({name:"SphericalGaussianBlur",defines:{SAMPLES:xp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Bo(),fragmentShader:`

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
		`,blending:gn,depthTest:!1,depthWrite:!1})}function sh(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bo(),fragmentShader:`

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
		`,blending:gn,depthTest:!1,depthWrite:!1})}function rh(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gn,depthTest:!1,depthWrite:!1})}function Bo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Fo=class extends ke{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new vs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Bi(5,5,5),r=new qe({name:"CubemapFromEquirect",uniforms:li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:gn});r.uniforms.tEquirect.value=e;let o=new De(s,r),a=e.minFilter;return e.minFilter===Zn&&(e.minFilter=Me),new Vr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function Sp(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?o(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===Wr||p===Xr)if(t.has(h)){let x=t.get(h).texture;return a(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let v=new Fo(x.height);return v.fromEquirectangularTexture(i,h),t.set(h,v),h.addEventListener("dispose",l),a(v.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let p=h.mapping,x=p===Wr||p===Xr,v=p===qn||p===ci;if(x||v){let m=e.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Uo(i)),m=x?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{let w=h.image;return x&&w&&w.height>0||v&&w&&c(w)?(n===null&&(n=new Uo(i)),m=x?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function a(h,p){return p===Wr?h.mapping=qn:p===Xr&&(h.mapping=ci),h}function c(h){let p=0,x=6;for(let v=0;v<x;v++)h[v]!==void 0&&p++;return p===x}function l(h){let p=h.target;p.removeEventListener("dispose",l);let x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Ep(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&oi("WebGLRenderer: "+n+" extension not supported."),s}}}function Tp(i,t,e,n){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let x in h.attributes)t.remove(h.attributes[x]);h.removeEventListener("dispose",o),delete s[h.id];let p=r.get(h);p&&(t.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(d){let h=d.attributes;for(let p in h)t.update(h[p],i.ARRAY_BUFFER)}function l(d){let h=[],p=d.index,x=d.attributes.position,v=0;if(x===void 0)return;if(p!==null){let w=p.array;v=p.version;for(let P=0,M=w.length;P<M;P+=3){let S=w[P+0],T=w[P+1],R=w[P+2];h.push(S,T,T,R,R,S)}}else{let w=x.array;v=x.version;for(let P=0,M=w.length/3-1;P<M;P+=3){let S=P+0,T=P+1,R=P+2;h.push(S,T,T,R,R,S)}}let m=new(x.count>=65535?_s:xs)(h,1);m.version=v;let f=r.get(d);f&&t.remove(f),r.set(d,m)}function u(d){let h=r.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function wp(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,h){i.drawElements(n,h,r,d*o),e.update(h,n,1)}function l(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,d*o,p),e.update(h,n,p))}function u(d,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,p);let v=0;for(let m=0;m<p;m++)v+=h[m];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ap(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Ct("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Rp(i,t,e){let n=new WeakMap,s=new ae;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();let p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],P=0;p===!0&&(P=1),x===!0&&(P=2),v===!0&&(P=3);let M=a.attributes.position.count*P,S=1;M>t.maxTextureSize&&(S=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let T=new Float32Array(M*S*4*d),R=new ps(T,M,S,d);R.type=an,R.needsUpdate=!0;let y=P*4;for(let A=0;A<d;A++){let D=m[A],O=f[A],H=w[A],N=M*S*4*A;for(let V=0;V<D.count;V++){let $=V*y;p===!0&&(s.fromBufferAttribute(D,V),T[N+$+0]=s.x,T[N+$+1]=s.y,T[N+$+2]=s.z,T[N+$+3]=0),x===!0&&(s.fromBufferAttribute(O,V),T[N+$+4]=s.x,T[N+$+5]=s.y,T[N+$+6]=s.z,T[N+$+7]=0),v===!0&&(s.fromBufferAttribute(H,V),T[N+$+8]=s.x,T[N+$+9]=s.y,T[N+$+10]=s.z,T[N+$+11]=H.itemSize===4?s.w:1)}}h={count:d,texture:R,size:new Pt(M,S)},n.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];let x=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Cp(i,t,e,n,s){let r=new WeakMap;function o(l){let u=s.render.frame,d=l.geometry,h=t.get(l,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function a(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var Pp={[Fa]:"LINEAR_TONE_MAPPING",[Oa]:"REINHARD_TONE_MAPPING",[Ba]:"CINEON_TONE_MAPPING",[ka]:"ACES_FILMIC_TONE_MAPPING",[Ha]:"AGX_TONE_MAPPING",[Va]:"NEUTRAL_TONE_MAPPING",[za]:"CUSTOM_TONE_MAPPING"};function Ip(i,t,e,n,s,r){let o=new ke(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new ze;l.setAttribute("position",new Le([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Le([0,2,0,0,2,0],2));let u=new Rr({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new De(l,u),h=new zi(-1,1,1,-1,0,1),p=null,x=null,v=!1,m,f=null,w=[],P=!1;this.setSize=function(M,S){o.setSize(M,S),a!==null&&a.setSize(M,S),c!==null&&c.setSize(M,S);for(let T=0;T<w.length;T++){let R=w[T];R.setSize&&R.setSize(M,S)}},this.setEffects=function(M){w=M,P=w.length>0&&w[0].isRenderPass===!0;let S=o.width,T=o.height;w.length>0&&a===null&&(a=new ke(S,T,{type:cn,depthBuffer:!1,stencilBuffer:!1}),c=new ke(S,T,{type:cn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<w.length;R++){let y=w[R];y.setSize&&y.setSize(S,T)}},this.begin=function(M,S){if(v||M.toneMapping===rn&&w.length===0)return!1;if(f=S,S!==null){let T=S.width,R=S.height;(o.width!==T||o.height!==R)&&this.setSize(T,R)}return P===!1&&M.setRenderTarget(o),m=M.toneMapping,M.toneMapping=rn,!0},this.hasRenderPass=function(){return P},this.end=function(M,S){M.toneMapping=m,v=!0;let T=o,R=a;for(let y=0;y<w.length;y++){let b=w[y];b.enabled!==!1&&(b.render(M,R,T,S),b.needsSwap!==!1&&(T=R,R=R===a?c:a))}if(p!==M.outputColorSpace||x!==M.toneMapping){p=M.outputColorSpace,x=M.toneMapping,u.defines={},Vt.getTransfer(p)===$t&&(u.defines.SRGB_TRANSFER="");let y=Pp[x];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(f),M.render(d,h),f=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Th=new Be,uc=new zn(1,1),wh=new ps,Ah=new Tr,Rh=new vs,oh=[],ah=[],ch=new Float32Array(16),lh=new Float32Array(9),hh=new Float32Array(4);function Ki(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=oh[s];if(r===void 0&&(r=new Float32Array(s),oh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ge(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ko(i,t){let e=ah[t];e===void 0&&(e=new Int32Array(t),ah[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Lp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Dp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2fv(this.addr,t),ge(e,t)}}function Np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;i.uniform3fv(this.addr,t),ge(e,t)}}function Up(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4fv(this.addr,t),ge(e,t)}}function Fp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;hh.set(n),i.uniformMatrix2fv(this.addr,!1,hh),ge(e,n)}}function Op(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;lh.set(n),i.uniformMatrix3fv(this.addr,!1,lh),ge(e,n)}}function Bp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;ch.set(n),i.uniformMatrix4fv(this.addr,!1,ch),ge(e,n)}}function kp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function zp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2iv(this.addr,t),ge(e,t)}}function Hp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3iv(this.addr,t),ge(e,t)}}function Vp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4iv(this.addr,t),ge(e,t)}}function Gp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Wp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2uiv(this.addr,t),ge(e,t)}}function Xp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3uiv(this.addr,t),ge(e,t)}}function Yp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4uiv(this.addr,t),ge(e,t)}}function qp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(uc.compareFunction=e.isReversedDepthBuffer()?Lo:Io,r=uc):r=Th,e.setTexture2D(t||r,s)}function Zp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ah,s)}function $p(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Rh,s)}function Jp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wh,s)}function Kp(i){switch(i){case 5126:return Lp;case 35664:return Dp;case 35665:return Np;case 35666:return Up;case 35674:return Fp;case 35675:return Op;case 35676:return Bp;case 5124:case 35670:return kp;case 35667:case 35671:return zp;case 35668:case 35672:return Hp;case 35669:case 35673:return Vp;case 5125:return Gp;case 36294:return Wp;case 36295:return Xp;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return qp;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return $p;case 36289:case 36303:case 36311:case 36292:return Jp}}function jp(i,t){i.uniform1fv(this.addr,t)}function Qp(i,t){let e=Ki(t,this.size,2);i.uniform2fv(this.addr,e)}function t0(i,t){let e=Ki(t,this.size,3);i.uniform3fv(this.addr,e)}function e0(i,t){let e=Ki(t,this.size,4);i.uniform4fv(this.addr,e)}function n0(i,t){let e=Ki(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function i0(i,t){let e=Ki(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function s0(i,t){let e=Ki(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function r0(i,t){i.uniform1iv(this.addr,t)}function o0(i,t){i.uniform2iv(this.addr,t)}function a0(i,t){i.uniform3iv(this.addr,t)}function c0(i,t){i.uniform4iv(this.addr,t)}function l0(i,t){i.uniform1uiv(this.addr,t)}function h0(i,t){i.uniform2uiv(this.addr,t)}function u0(i,t){i.uniform3uiv(this.addr,t)}function d0(i,t){i.uniform4uiv(this.addr,t)}function f0(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=uc:o=Th;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function p0(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ah,r[o])}function m0(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Rh,r[o])}function g0(i,t,e){let n=this.cache,s=t.length,r=ko(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||wh,r[o])}function x0(i){switch(i){case 5126:return jp;case 35664:return Qp;case 35665:return t0;case 35666:return e0;case 35674:return n0;case 35675:return i0;case 35676:return s0;case 5124:case 35670:return r0;case 35667:case 35671:return o0;case 35668:case 35672:return a0;case 35669:case 35673:return c0;case 5125:return l0;case 36294:return h0;case 36295:return u0;case 36296:return d0;case 35678:case 36198:case 36298:case 36306:case 35682:return f0;case 35679:case 36299:case 36307:return p0;case 35680:case 36300:case 36308:case 36293:return m0;case 36289:case 36303:case 36311:case 36292:return g0}}var dc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Kp(e.type)}},fc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=x0(e.type)}},pc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},lc=/(\w+)(\])?(\[|\.)?/g;function uh(i,t){i.seq.push(t),i.map[t.id]=t}function _0(i,t,e){let n=i.name,s=n.length;for(lc.lastIndex=0;;){let r=lc.exec(n),o=lc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){uh(e,l===void 0?new dc(a,i,t):new fc(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new pc(a),uh(e,d)),e=d}}}var Ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);_0(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function dh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var y0=37297,v0=0;function M0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var fh=new It;function b0(i){Vt._getMatrix(fh,Vt.workingColorSpace,i);let t=`mat3( ${fh.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(i)){case ds:return[t,"LinearTransferOETF"];case $t:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ph(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+M0(i.getShaderSource(t),a)}else return r}function S0(i,t){let e=b0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var E0={[Fa]:"Linear",[Oa]:"Reinhard",[Ba]:"Cineon",[ka]:"ACESFilmic",[Ha]:"AgX",[Va]:"Neutral",[za]:"Custom"};function T0(i,t){let e=E0[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var No=new F;function w0(){Vt.getLuminanceCoefficients(No);let i=No.x.toFixed(4),t=No.y.toFixed(4),e=No.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zs).join(`
`)}function R0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function C0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function zs(i){return i!==""}function mh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var P0=/^[ \t]*#include +<([\w\d./]+)>/gm;function mc(i){return i.replace(P0,L0)}var I0=new Map;function L0(i,t){let e=Ut[t];if(e===void 0){let n=I0.get(t);if(n!==void 0)e=Ut[n],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return mc(e)}var D0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xh(i){return i.replace(D0,N0)}function N0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _h(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var U0={[Cs]:"SHADOWMAP_TYPE_PCF",[Gi]:"SHADOWMAP_TYPE_VSM"};function F0(i){return U0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var O0={[qn]:"ENVMAP_TYPE_CUBE",[ci]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE_UV"};function B0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":O0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var k0={[ci]:"ENVMAP_MODE_REFRACTION"};function z0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":k0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var H0={[Ua]:"ENVMAP_BLENDING_MULTIPLY",[Ul]:"ENVMAP_BLENDING_MIX",[Fl]:"ENVMAP_BLENDING_ADD"};function V0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":H0[i.combine]||"ENVMAP_BLENDING_NONE"}function G0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function W0(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=F0(e),l=B0(e),u=z0(e),d=V0(e),h=G0(e),p=A0(e),x=R0(r),v=s.createProgram(),m,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(zs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(zs).join(`
`),f.length>0&&(f+=`
`)):(m=[_h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zs).join(`
`),f=[_h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==rn?"#define TONE_MAPPING":"",e.toneMapping!==rn?Ut.tonemapping_pars_fragment:"",e.toneMapping!==rn?T0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,S0("linearToOutputTexel",e.outputColorSpace),w0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(zs).join(`
`)),o=mc(o),o=mh(o,e),o=gh(o,e),a=mc(a),a=mh(a,e),a=gh(a,e),o=xh(o),a=xh(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let P=w+m+o,M=w+f+a,S=dh(s,s.VERTEX_SHADER,P),T=dh(s,s.FRAGMENT_SHADER,M);s.attachShader(v,S),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(D){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(S)||"",N=s.getShaderInfoLog(T)||"",V=O.trim(),$=H.trim(),X=N.trim(),nt=!0,Y=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(nt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,S,T);else{let Q=ph(s,S,"vertex"),et=ph(s,T,"fragment");Ct("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+V+`
`+Q+`
`+et)}else V!==""?Rt("WebGLProgram: Program Info Log:",V):($===""||X==="")&&(Y=!1);Y&&(D.diagnostics={runnable:nt,programLog:V,vertexShader:{log:$,prefix:m},fragmentShader:{log:X,prefix:f}})}s.deleteShader(S),s.deleteShader(T),y=new Ji(s,v),b=C0(s,v)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(v,y0)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=T,this}var X0=0,gc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new xc(t),e.set(t,n)),n}},xc=class{constructor(t){this.id=X0++,this.code=t,this.usedTimes=0}};function Y0(i){return i===Jn||i===Fs||i===Os}function q0(i,t,e,n,s,r){let o=new ms,a=new gc,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,b,A,D,O,H){let N=D.fog,V=O.geometry,$=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,nt=t.get(y.envMap||$,X),Y=nt&&nt.mapping===Ps?nt.image.height:null,Q=p[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&Rt("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let et=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,wt=et!==void 0?et.length:0,Et=0;V.morphAttributes.position!==void 0&&(Et=1),V.morphAttributes.normal!==void 0&&(Et=2),V.morphAttributes.color!==void 0&&(Et=3);let te,Gt,Yt,q;if(Q){let ne=_n[Q];te=ne.vertexShader,Gt=ne.fragmentShader}else{te=y.vertexShader,Gt=y.fragmentShader;let ne=a.getVertexShaderStage(y),qt=a.getFragmentShaderStage(y);a.update(y,ne,qt),Yt=ne.id,q=qt.id}let j=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),Lt=O.isInstancedMesh===!0,mt=O.isBatchedMesh===!0,Ft=!!y.map,pe=!!y.matcap,Bt=!!nt,Xt=!!y.aoMap,ee=!!y.lightMap,Ht=!!y.bumpMap&&y.wireframe===!1,oe=!!y.normalMap,_e=!!y.displacementMap,Fe=!!y.emissiveMap,ce=!!y.metalnessMap,ue=!!y.roughnessMap,L=y.anisotropy>0,be=y.clearcoat>0,Jt=y.dispersion>0,E=y.retroreflectivity>0,g=y.iridescence>0,U=y.sheen>0,z=y.transmission>0,W=L&&!!y.anisotropyMap,it=be&&!!y.clearcoatMap,st=be&&!!y.clearcoatNormalMap,Z=be&&!!y.clearcoatRoughnessMap,K=g&&!!y.iridescenceMap,rt=g&&!!y.iridescenceThicknessMap,bt=U&&!!y.sheenColorMap,lt=U&&!!y.sheenRoughnessMap,ot=!!y.specularMap,St=!!y.specularColorMap,At=!!y.specularIntensityMap,Dt=z&&!!y.transmissionMap,I=z&&!!y.thicknessMap,at=!!y.gradientMap,J=!!y.alphaMap,ct=y.alphaTest>0,ft=!!y.alphaHash,tt=!!y.extensions,Tt=rn;y.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Tt=i.toneMapping);let vt={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:te,fragmentShader:Gt,defines:y.defines,customVertexShaderID:Yt,customFragmentShaderID:q,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:mt,batchingColor:mt&&O._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&O.instanceColor!==null,instancingMorph:Lt&&O.morphTexture!==null,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Vt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ft,matcap:pe,envMap:Bt,envMapMode:Bt&&nt.mapping,envMapCubeUVHeight:Y,aoMap:Xt,lightMap:ee,bumpMap:Ht,normalMap:oe,displacementMap:_e,emissiveMap:Fe,normalMapObjectSpace:oe&&y.normalMapType===kl,normalMapTangentSpace:oe&&y.normalMapType===Po,packedNormalMap:oe&&y.normalMapType===Po&&Y0(y.normalMap.format),metalnessMap:ce,roughnessMap:ue,anisotropy:L,anisotropyMap:W,clearcoat:be,clearcoatMap:it,clearcoatNormalMap:st,clearcoatRoughnessMap:Z,dispersion:Jt,retroreflection:E,iridescence:g,iridescenceMap:K,iridescenceThicknessMap:rt,sheen:U,sheenColorMap:bt,sheenRoughnessMap:lt,specularMap:ot,specularColorMap:St,specularIntensityMap:At,transmission:z,transmissionMap:Dt,thicknessMap:I,gradientMap:at,opaque:y.transparent===!1&&y.blending===Wi&&y.alphaToCoverage===!1,alphaMap:J,alphaTest:ct,alphaHash:ft,combine:y.combine,mapUv:Ft&&x(y.map.channel),aoMapUv:Xt&&x(y.aoMap.channel),lightMapUv:ee&&x(y.lightMap.channel),bumpMapUv:Ht&&x(y.bumpMap.channel),normalMapUv:oe&&x(y.normalMap.channel),displacementMapUv:_e&&x(y.displacementMap.channel),emissiveMapUv:Fe&&x(y.emissiveMap.channel),metalnessMapUv:ce&&x(y.metalnessMap.channel),roughnessMapUv:ue&&x(y.roughnessMap.channel),anisotropyMapUv:W&&x(y.anisotropyMap.channel),clearcoatMapUv:it&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:st&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:lt&&x(y.sheenRoughnessMap.channel),specularMapUv:ot&&x(y.specularMap.channel),specularColorMapUv:St&&x(y.specularColorMap.channel),specularIntensityMapUv:At&&x(y.specularIntensityMap.channel),transmissionMapUv:Dt&&x(y.transmissionMap.channel),thicknessMapUv:I&&x(y.thicknessMap.channel),alphaMapUv:J&&x(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(oe||L),vertexNormals:!!V.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!V.attributes.uv&&(Ft||J),fog:!!N,useFog:y.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||V.attributes.normal===void 0&&oe===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xt,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Et,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Tt,decodeVideoTexture:Ft&&y.map.isVideoTexture===!0&&Vt.getTransfer(y.map.colorSpace)===$t,decodeVideoTextureEmissive:Fe&&y.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(y.emissiveMap.colorSpace)===$t,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===mn,flipSided:y.side===Ne,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:tt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&y.extensions.multiDraw===!0||mt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return vt.vertexUv1s=c.has(1),vt.vertexUv2s=c.has(2),vt.vertexUv3s=c.has(3),c.clear(),vt}function m(y){let b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(let A in y.defines)b.push(A),b.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(f(b,y),w(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function f(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numSunLights),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numSunLightShadows),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function w(y,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function P(y){let b=p[y.type],A;if(b){let D=_n[b];A=Ql.clone(D.uniforms)}else A=y.uniforms;return A}function M(y,b){let A=u.get(b);return A!==void 0?++A.usedTimes:(A=new W0(i,b,y,s),l.push(A),u.set(b,A)),A}function S(y){if(--y.usedTimes===0){let b=l.indexOf(y);l[b]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function T(y){a.remove(y)}function R(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:P,acquireProgram:M,releaseProgram:S,releaseShaderCache:T,programs:l,dispose:R}}function Z0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function $0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function yh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function vh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function a(h,p,x,v,m,f){let w=i[t];return w===void 0?(w={id:h.id,object:h,geometry:p,material:x,materialVariant:o(h),groupOrder:v,renderOrder:h.renderOrder,z:m,group:f},i[t]=w):(w.id=h.id,w.object=h,w.geometry=p,w.material=x,w.materialVariant=o(h),w.groupOrder=v,w.renderOrder=h.renderOrder,w.z=m,w.group=f),t++,w}function c(h,p,x,v,m,f,w){w.reversedDepth===!0&&(m=-m);let P=a(h,p,x,v,m,f);x.transmission>0?n.push(P):x.transparent===!0?s.push(P):e.push(P)}function l(h,p,x,v,m,f){let w=a(h,p,x,v,m,f);x.transmission>0?n.unshift(w):x.transparent===!0?s.unshift(w):e.unshift(w)}function u(h,p){e.length>1&&e.sort(h||$0),n.length>1&&n.sort(p||yh),s.length>1&&s.sort(p||yh)}function d(){for(let h=t,p=i.length;h<p;h++){let x=i[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function J0(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new vh,i.set(n,[o])):s>=r.length?(o=new vh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function K0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new F,color:new zt};break;case"SpotLight":e={position:new F,direction:new F,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function j0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Q0=0;function t2(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function e2(i){let t=new K0,e=j0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);let s=new F,r=new le,o=new le;function a(l){let u=0,d=0,h=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let p=0,x=0,v=0,m=0,f=0,w=0,P=0,M=0,S=0,T=0,R=0,y=0,b=0,A=0;l.sort(t2);for(let O=0,H=l.length;O<H;O++){let N=l[O],V=N.color,$=N.intensity,X=N.distance,nt=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Jn?nt=N.shadow.map.texture:nt=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=V.r*$,d+=V.g*$,h+=V.b*$;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],$);A++}else if(N.isSunLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let Q=N.shadow,et=e.get(N);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[x]=et,n.sunShadowMap[x]=nt;let wt=Q.getViewportCount();for(let Et=0;Et<wt;Et++)n.sunShadowMatrix[v+Et]=Q.getMatrix(Et),n.sunShadowCascade[v+Et]=Q._cascadeData[Et];v+=wt,x++}n.sun[p]=Y,p++}else if(N.isDirectionalLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let Q=N.shadow,et=e.get(N);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.directionalShadow[m]=et,n.directionalShadowMap[m]=nt,n.directionalShadowMatrix[m]=N.shadow.matrix,S++}n.directional[m]=Y,m++}else if(N.isSpotLight){let Y=t.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(V).multiplyScalar($),Y.distance=X,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[w]=Y;let Q=N.shadow;if(N.map&&(n.spotLightMap[y]=N.map,y++,Q.updateMatrices(N),N.castShadow&&b++),n.spotLightMatrix[w]=Q.matrix,N.castShadow){let et=e.get(N);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.spotShadow[w]=et,n.spotShadowMap[w]=nt,R++}w++}else if(N.isRectAreaLight){let Y=t.get(N);Y.color.copy(V).multiplyScalar($),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[P]=Y,P++}else if(N.isPointLight){let Y=t.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){let Q=N.shadow,et=e.get(N);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,et.shadowCameraNear=Q.camera.near,et.shadowCameraFar=Q.camera.far,n.pointShadow[f]=et,n.pointShadowMap[f]=nt,n.pointShadowMatrix[f]=N.shadow.matrix,T++}n.point[f]=Y,f++}else if(N.isHemisphereLight){let Y=t.get(N);Y.skyColor.copy(N.color).multiplyScalar($),Y.groundColor.copy(N.groundColor).multiplyScalar($),n.hemi[M]=Y,M++}}P>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let D=n.hash;(D.sunLength!==p||D.directionalLength!==m||D.pointLength!==f||D.spotLength!==w||D.rectAreaLength!==P||D.hemiLength!==M||D.numSunShadows!==x||D.numDirectionalShadows!==S||D.numPointShadows!==T||D.numSpotShadows!==R||D.numSpotMaps!==y||D.numLightProbes!==A)&&(n.sun.length=p,n.directional.length=m,n.spot.length=w,n.rectArea.length=P,n.point.length=f,n.hemi.length=M,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+y-b,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,D.sunLength=p,D.directionalLength=m,D.pointLength=f,D.spotLength=w,D.rectAreaLength=P,D.hemiLength=M,D.numSunShadows=x,D.numDirectionalShadows=S,D.numPointShadows=T,D.numSpotShadows=R,D.numSpotMaps=y,D.numLightProbes=A,n.version=Q0++)}function c(l,u){let d=0,h=0,p=0,x=0,v=0,m=0,f=u.matrixWorldInverse;for(let w=0,P=l.length;w<P;w++){let M=l[w];if(M.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(f),d++}else if(M.isDirectionalLight){let S=n.directional[h];S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),h++}else if(M.isSpotLight){let S=n.spot[x];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),x++}else if(M.isRectAreaLight){let S=n.rectArea[v];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(f),o.identity(),r.copy(M.matrixWorld),r.premultiply(f),o.extractRotation(r),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),v++}else if(M.isPointLight){let S=n.point[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(f),m++}}}return{setup:a,setupView:c,state:n}}function Mh(i){let t=new e2(i),e=[],n=[],s=[];function r(h){d.camera=h,e.length=0,n.length=0,s.length=0}function o(h){e.push(h)}function a(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function n2(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Mh(i),t.set(s,[a])):r>=o.length?(a=new Mh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var i2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s2=`uniform sampler2D shadow_pass;
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
}`,r2=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],o2=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],bh=new le,ks=new F,hc=new F;function a2(i,t,e){let n=new Oi,s=new Pt,r=new Pt,o=new ae,a=new Cr,c=new Pr,l={},u=e.maxTextureSize,d={[Yn]:Ne,[Ne]:Yn,[mn]:mn},h=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:i2,fragmentShader:s2}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let x=new ze;x.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new De(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cs;let f=this.type;this.render=function(T,R,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===gl&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Cs);let b=i.getRenderTarget(),A=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),O=i.state;O.setBlending(gn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let H=f!==this.type;H&&R.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(V=>V.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,V=T.length;N<V;N++){let $=T[N],X=$.shadow;if(X===void 0){Rt("WebGLShadowMap:",$,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let nt=X.getFrameExtents();s.multiply(nt),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/nt.x),s.x=r.x*nt.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/nt.y),s.y=r.y*nt.y,X.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=Y,X.map===null||H===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Gi){if($.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new ke(s.x,s.y,{format:Jn,type:cn,minFilter:Me,magFilter:Me,generateMipmaps:!1}),X.map.texture.name=$.name+".shadowMap",X.map.depthTexture=new zn(s.x,s.y,an),X.map.depthTexture.name=$.name+".shadowMapDepth",X.map.depthTexture.format=pn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ve,X.map.depthTexture.magFilter=ve}else $.isPointLight?(X.map=new Fo(s.x),X.map.depthTexture=new Ar(s.x,on)):(X.map=new ke(s.x,s.y),X.map.depthTexture=new zn(s.x,s.y,on)),X.map.depthTexture.name=$.name+".shadowMap",X.map.depthTexture.format=pn,this.type===Cs?(X.map.depthTexture.compareFunction=Y?Lo:Io,X.map.depthTexture.minFilter=Me,X.map.depthTexture.magFilter=Me):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ve,X.map.depthTexture.magFilter=ve);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);let Q=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();$.isPointLight!==!0&&X.updateMatrices($,y);for(let et=0;et<Q;et++){let wt=X.getCamera(et);if($.isPointLight){let Et=X.camera,te=X.matrix,Gt=$.distance||Et.far;Gt!==Et.far&&(Et.far=Gt,Et.updateProjectionMatrix()),ks.setFromMatrixPosition($.matrixWorld),Et.position.copy(ks),hc.copy(Et.position),hc.add(r2[et]),Et.up.copy(o2[et]),Et.lookAt(hc),Et.updateMatrixWorld(),te.makeTranslation(-ks.x,-ks.y,-ks.z),bh.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),X._frustum.setFromProjectionMatrix(bh,Et.coordinateSystem,Et.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,et),i.clear();else{et===0&&(i.setRenderTarget(X.map),i.clear());let Et=X.getViewport(et);o.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),O.viewport(o)}n=X.getFrustum(et),M(R,y,wt,$,this.type)}X.isPointLightShadow!==!0&&this.type===Gi&&w(X,y),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(b,A,D)};function w(T,R){let y=t.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null?T.mapPass=new ke(s.x,s.y,{format:Jn,type:cn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,y,h,v,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,y,p,v,null)}function P(T,R,y,b){let A=null,D=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)A=D;else if(A=y.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let O=A.uuid,H=R.uuid,N=l[O];N===void 0&&(N={},l[O]=N);let V=N[H];V===void 0&&(V=A.clone(),N[H]=V,R.addEventListener("dispose",S)),A=V}if(A.visible=R.visible,A.wireframe=R.wireframe,b===Gi?A.side=R.shadowSide!==null?R.shadowSide:R.side:A.side=R.shadowSide!==null?R.shadowSide:d[R.side],A.alphaMap=R.alphaMap,A.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,A.map=R.map,A.clipShadows=R.clipShadows,A.clippingPlanes=R.clippingPlanes,A.clipIntersection=R.clipIntersection,A.displacementMap=R.displacementMap,A.displacementScale=R.displacementScale,A.displacementBias=R.displacementBias,A.wireframeLinewidth=R.wireframeLinewidth,A.linewidth=R.linewidth,y.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let O=i.properties.get(A);O.light=y}return A}function M(T,R,y,b,A){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&A===Gi)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);let H=t.update(T),N=T.material;if(Array.isArray(N)){let V=H.groups;for(let $=0,X=V.length;$<X;$++){let nt=V[$],Y=N[nt.materialIndex];if(Y&&Y.visible){let Q=P(T,Y,b,A);T.onBeforeShadow(i,T,R,y,H,Q,nt),i.renderBufferDirect(y,null,H,Q,T,nt),T.onAfterShadow(i,T,R,y,H,Q,nt)}}}else if(N.visible){let V=P(T,N,b,A);T.onBeforeShadow(i,T,R,y,H,V,null),i.renderBufferDirect(y,null,H,V,T,null),T.onAfterShadow(i,T,R,y,H,V,null)}}let O=T.children;for(let H=0,N=O.length;H<N;H++)M(O[H],R,y,b,A)}function S(T){T.target.removeEventListener("dispose",S);for(let y in l){let b=l[y],A=T.target.uuid;A in b&&(b[A].dispose(),delete b[A])}}}function c2(i,t){function e(){let I=!1,at=new ae,J=null,ct=new ae(0,0,0,0);return{setMask:function(ft){J!==ft&&!I&&(i.colorMask(ft,ft,ft,ft),J=ft)},setLocked:function(ft){I=ft},setClear:function(ft,tt,Tt,vt,ne){ne===!0&&(ft*=vt,tt*=vt,Tt*=vt),at.set(ft,tt,Tt,vt),ct.equals(at)===!1&&(i.clearColor(ft,tt,Tt,vt),ct.copy(at))},reset:function(){I=!1,J=null,ct.set(-1,0,0,0)}}}function n(){let I=!1,at=!1,J=null,ct=null,ft=null;return{setReversed:function(tt){if(at!==tt){let Tt=t.get("EXT_clip_control");tt?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),at=tt;let vt=ft;ft=null,this.setClear(vt)}},getReversed:function(){return at},setTest:function(tt){tt?j(i.DEPTH_TEST):xt(i.DEPTH_TEST)},setMask:function(tt){J!==tt&&!I&&(i.depthMask(tt),J=tt)},setFunc:function(tt){if(at&&(tt=Kl[tt]),ct!==tt){switch(tt){case fr:i.depthFunc(i.NEVER);break;case pr:i.depthFunc(i.ALWAYS);break;case mr:i.depthFunc(i.LESS);break;case Ci:i.depthFunc(i.LEQUAL);break;case gr:i.depthFunc(i.EQUAL);break;case xr:i.depthFunc(i.GEQUAL);break;case _r:i.depthFunc(i.GREATER);break;case yr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=tt}},setLocked:function(tt){I=tt},setClear:function(tt){ft!==tt&&(ft=tt,at&&(tt=1-tt),i.clearDepth(tt))},reset:function(){I=!1,J=null,ct=null,ft=null,at=!1}}}function s(){let I=!1,at=null,J=null,ct=null,ft=null,tt=null,Tt=null,vt=null,ne=null;return{setTest:function(qt){I||(qt?j(i.STENCIL_TEST):xt(i.STENCIL_TEST))},setMask:function(qt){at!==qt&&!I&&(i.stencilMask(qt),at=qt)},setFunc:function(qt,je,hn){(J!==qt||ct!==je||ft!==hn)&&(i.stencilFunc(qt,je,hn),J=qt,ct=je,ft=hn)},setOp:function(qt,je,hn){(tt!==qt||Tt!==je||vt!==hn)&&(i.stencilOp(qt,je,hn),tt=qt,Tt=je,vt=hn)},setLocked:function(qt){I=qt},setClear:function(qt){ne!==qt&&(i.clearStencil(qt),ne=qt)},reset:function(){I=!1,at=null,J=null,ct=null,ft=null,tt=null,Tt=null,vt=null,ne=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},d={},h={},p=new WeakMap,x=[],v=null,m=!1,f=null,w=null,P=null,M=null,S=null,T=null,R=null,y=new zt(0,0,0),b=0,A=!1,D=null,O=null,H=null,N=null,V=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,nt=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),X=nt>=1):Y.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),X=nt>=2);let Q=null,et={},wt=i.getParameter(i.SCISSOR_BOX),Et=i.getParameter(i.VIEWPORT),te=new ae().fromArray(wt),Gt=new ae().fromArray(Et);function Yt(I,at,J,ct){let ft=new Uint8Array(4),tt=i.createTexture();i.bindTexture(I,tt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Tt=0;Tt<J;Tt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(at,0,i.RGBA,1,1,ct,0,i.RGBA,i.UNSIGNED_BYTE,ft):i.texImage2D(at+Tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ft);return tt}let q={};q[i.TEXTURE_2D]=Yt(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=Yt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=Yt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=Yt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(i.DEPTH_TEST),o.setFunc(Ci),Ht(!1),oe(Ca),j(i.CULL_FACE),Xt(gn);function j(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function xt(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Lt(I,at){return h[I]!==at?(i.bindFramebuffer(I,at),h[I]=at,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=at),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=at),!0):!1}function mt(I,at){let J=x,ct=!1;if(I){J=p.get(at),J===void 0&&(J=[],p.set(at,J));let ft=I.textures;if(J.length!==ft.length||J[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,Tt=ft.length;tt<Tt;tt++)J[tt]=i.COLOR_ATTACHMENT0+tt;J.length=ft.length,ct=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ct=!0);ct&&i.drawBuffers(J)}function Ft(I){return v!==I?(i.useProgram(I),v=I,!0):!1}let pe={[ai]:i.FUNC_ADD,[_l]:i.FUNC_SUBTRACT,[yl]:i.FUNC_REVERSE_SUBTRACT};pe[vl]=i.MIN,pe[Ml]=i.MAX;let Bt={[bl]:i.ZERO,[Sl]:i.ONE,[El]:i.SRC_COLOR,[Da]:i.SRC_ALPHA,[Pl]:i.SRC_ALPHA_SATURATE,[Rl]:i.DST_COLOR,[wl]:i.DST_ALPHA,[Tl]:i.ONE_MINUS_SRC_COLOR,[Na]:i.ONE_MINUS_SRC_ALPHA,[Cl]:i.ONE_MINUS_DST_COLOR,[Al]:i.ONE_MINUS_DST_ALPHA,[Il]:i.CONSTANT_COLOR,[Ll]:i.ONE_MINUS_CONSTANT_COLOR,[Dl]:i.CONSTANT_ALPHA,[Nl]:i.ONE_MINUS_CONSTANT_ALPHA};function Xt(I,at,J,ct,ft,tt,Tt,vt,ne,qt){if(I===gn){m===!0&&(xt(i.BLEND),m=!1);return}if(m===!1&&(j(i.BLEND),m=!0),I!==xl){if(I!==f||qt!==A){if((w!==ai||S!==ai)&&(i.blendEquation(i.FUNC_ADD),w=ai,S=ai),qt)switch(I){case Wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pa:i.blendFunc(i.ONE,i.ONE);break;case Ia:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case La:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ct("WebGLState: Invalid blending: ",I);break}else switch(I){case Wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ia:Ct("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case La:Ct("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ct("WebGLState: Invalid blending: ",I);break}P=null,M=null,T=null,R=null,y.set(0,0,0),b=0,f=I,A=qt}return}ft=ft||at,tt=tt||J,Tt=Tt||ct,(at!==w||ft!==S)&&(i.blendEquationSeparate(pe[at],pe[ft]),w=at,S=ft),(J!==P||ct!==M||tt!==T||Tt!==R)&&(i.blendFuncSeparate(Bt[J],Bt[ct],Bt[tt],Bt[Tt]),P=J,M=ct,T=tt,R=Tt),(vt.equals(y)===!1||ne!==b)&&(i.blendColor(vt.r,vt.g,vt.b,ne),y.copy(vt),b=ne),f=I,A=!1}function ee(I,at){I.side===mn?xt(i.CULL_FACE):j(i.CULL_FACE);let J=I.side===Ne;at&&(J=!J),Ht(J),I.blending===Wi&&I.transparent===!1?Xt(gn):Xt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);let ct=I.stencilWrite;a.setTest(ct),ct&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Fe(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(I){D!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),D=I)}function oe(I){I!==pl?(j(i.CULL_FACE),I!==O&&(I===Ca?i.cullFace(i.BACK):I===ml?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xt(i.CULL_FACE),O=I}function _e(I){I!==H&&(X&&i.lineWidth(I),H=I)}function Fe(I,at,J){I?(j(i.POLYGON_OFFSET_FILL),(N!==at||V!==J)&&(N=at,V=J,o.getReversed()&&(at=-at),i.polygonOffset(at,J))):xt(i.POLYGON_OFFSET_FILL)}function ce(I){I?j(i.SCISSOR_TEST):xt(i.SCISSOR_TEST)}function ue(I){I===void 0&&(I=i.TEXTURE0+$-1),Q!==I&&(i.activeTexture(I),Q=I)}function L(I,at,J){J===void 0&&(Q===null?J=i.TEXTURE0+$-1:J=Q);let ct=et[J];ct===void 0&&(ct={type:void 0,texture:void 0},et[J]=ct),(ct.type!==I||ct.texture!==at)&&(Q!==J&&(i.activeTexture(J),Q=J),i.bindTexture(I,at||q[I]),ct.type=I,ct.texture=at)}function be(){let I=et[Q];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Jt(){try{i.compressedTexImage2D(...arguments)}catch(I){Ct("WebGLState:",I)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(I){Ct("WebGLState:",I)}}function g(){try{i.texSubImage2D(...arguments)}catch(I){Ct("WebGLState:",I)}}function U(){try{i.texSubImage3D(...arguments)}catch(I){Ct("WebGLState:",I)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Ct("WebGLState:",I)}}function W(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Ct("WebGLState:",I)}}function it(){try{i.texStorage2D(...arguments)}catch(I){Ct("WebGLState:",I)}}function st(){try{i.texStorage3D(...arguments)}catch(I){Ct("WebGLState:",I)}}function Z(){try{i.texImage2D(...arguments)}catch(I){Ct("WebGLState:",I)}}function K(){try{i.texImage3D(...arguments)}catch(I){Ct("WebGLState:",I)}}function rt(I){return d[I]!==void 0?d[I]:i.getParameter(I)}function bt(I,at){d[I]!==at&&(i.pixelStorei(I,at),d[I]=at)}function lt(I){te.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),te.copy(I))}function ot(I){Gt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Gt.copy(I))}function St(I,at){let J=l.get(at);J===void 0&&(J=new WeakMap,l.set(at,J));let ct=J.get(I);ct===void 0&&(ct=i.getUniformBlockIndex(at,I.name),J.set(I,ct))}function At(I,at){let ct=l.get(at).get(I);c.get(at)!==ct&&(i.uniformBlockBinding(at,ct,I.__bindingPointIndex),c.set(at,ct))}function Dt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},Q=null,et={},h={},p=new WeakMap,x=[],v=null,m=!1,f=null,w=null,P=null,M=null,S=null,T=null,R=null,y=new zt(0,0,0),b=0,A=!1,D=null,O=null,H=null,N=null,V=null,te.set(0,0,i.canvas.width,i.canvas.height),Gt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:xt,bindFramebuffer:Lt,drawBuffers:mt,useProgram:Ft,setBlending:Xt,setMaterial:ee,setFlipSided:Ht,setCullFace:oe,setLineWidth:_e,setPolygonOffset:Fe,setScissorTest:ce,activeTexture:ue,bindTexture:L,unbindTexture:be,compressedTexImage2D:Jt,compressedTexImage3D:E,texImage2D:Z,texImage3D:K,pixelStorei:bt,getParameter:rt,updateUBOMapping:St,uniformBlockBinding:At,texStorage2D:it,texStorage3D:st,texSubImage2D:g,texSubImage3D:U,compressedTexSubImage2D:z,compressedTexSubImage3D:W,scissor:lt,viewport:ot,reset:Dt}}function l2(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Pt,u=new WeakMap,d=new Set,h,p=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,g){return x?new OffscreenCanvas(E,g):fs("canvas")}function m(E,g,U){let z=1,W=Jt(E);if((W.width>U||W.height>U)&&(z=U/Math.max(W.width,W.height)),z<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let it=Math.floor(z*W.width),st=Math.floor(z*W.height);h===void 0&&(h=v(it,st));let Z=g?v(it,st):h;return Z.width=it,Z.height=st,Z.getContext("2d").drawImage(E,0,0,it,st),Rt("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+it+"x"+st+")."),Z}else return"data"in E&&Rt("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),E;return E}function f(E){return E.generateMipmaps}function w(E){i.generateMipmap(E)}function P(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(E,g,U,z,W,it=!1){if(E!==null){if(i[E]!==void 0)return i[E];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let st;z&&(st=t.get("EXT_texture_norm16"),st||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=g;if(g===i.RED&&(U===i.FLOAT&&(Z=i.R32F),U===i.HALF_FLOAT&&(Z=i.R16F),U===i.UNSIGNED_BYTE&&(Z=i.R8),U===i.UNSIGNED_SHORT&&st&&(Z=st.R16_EXT),U===i.SHORT&&st&&(Z=st.R16_SNORM_EXT)),g===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.R8UI),U===i.UNSIGNED_SHORT&&(Z=i.R16UI),U===i.UNSIGNED_INT&&(Z=i.R32UI),U===i.BYTE&&(Z=i.R8I),U===i.SHORT&&(Z=i.R16I),U===i.INT&&(Z=i.R32I)),g===i.RG&&(U===i.FLOAT&&(Z=i.RG32F),U===i.HALF_FLOAT&&(Z=i.RG16F),U===i.UNSIGNED_BYTE&&(Z=i.RG8),U===i.UNSIGNED_SHORT&&st&&(Z=st.RG16_EXT),U===i.SHORT&&st&&(Z=st.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RG8UI),U===i.UNSIGNED_SHORT&&(Z=i.RG16UI),U===i.UNSIGNED_INT&&(Z=i.RG32UI),U===i.BYTE&&(Z=i.RG8I),U===i.SHORT&&(Z=i.RG16I),U===i.INT&&(Z=i.RG32I)),g===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),U===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),U===i.UNSIGNED_INT&&(Z=i.RGB32UI),U===i.BYTE&&(Z=i.RGB8I),U===i.SHORT&&(Z=i.RGB16I),U===i.INT&&(Z=i.RGB32I)),g===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),U===i.UNSIGNED_INT&&(Z=i.RGBA32UI),U===i.BYTE&&(Z=i.RGBA8I),U===i.SHORT&&(Z=i.RGBA16I),U===i.INT&&(Z=i.RGBA32I)),g===i.RGB&&(U===i.UNSIGNED_SHORT&&st&&(Z=st.RGB16_EXT),U===i.SHORT&&st&&(Z=st.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),g===i.RGBA){let K=it?ds:Vt.getTransfer(W);U===i.FLOAT&&(Z=i.RGBA32F),U===i.HALF_FLOAT&&(Z=i.RGBA16F),U===i.UNSIGNED_BYTE&&(Z=K===$t?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&st&&(Z=st.RGBA16_EXT),U===i.SHORT&&st&&(Z=st.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function S(E,g){let U;return E?g===null||g===on||g===Yi?U=i.DEPTH24_STENCIL8:g===an?U=i.DEPTH32F_STENCIL8:g===Xi&&(U=i.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===on||g===Yi?U=i.DEPTH_COMPONENT24:g===an?U=i.DEPTH_COMPONENT32F:g===Xi&&(U=i.DEPTH_COMPONENT16),U}function T(E,g){return f(E)===!0||E.isFramebufferTexture&&E.minFilter!==ve&&E.minFilter!==Me?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function R(E){let g=E.target;g.removeEventListener("dispose",R),b(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&d.delete(g)}function y(E){let g=E.target;g.removeEventListener("dispose",y),D(g)}function b(E){let g=n.get(E);if(g.__webglInit===void 0)return;let U=E.source,z=p.get(U);if(z){let W=z[g.__cacheKey];W.usedTimes--,W.usedTimes===0&&A(E),Object.keys(z).length===0&&p.delete(U)}n.remove(E)}function A(E){let g=n.get(E);i.deleteTexture(g.__webglTexture);let U=E.source,z=p.get(U);delete z[g.__cacheKey],o.memory.textures--}function D(E){let g=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(g.__webglFramebuffer[z]))for(let W=0;W<g.__webglFramebuffer[z].length;W++)i.deleteFramebuffer(g.__webglFramebuffer[z][W]);else i.deleteFramebuffer(g.__webglFramebuffer[z]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[z])}else{if(Array.isArray(g.__webglFramebuffer))for(let z=0;z<g.__webglFramebuffer.length;z++)i.deleteFramebuffer(g.__webglFramebuffer[z]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let z=0;z<g.__webglColorRenderbuffer.length;z++)g.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[z]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let U=E.textures;for(let z=0,W=U.length;z<W;z++){let it=n.get(U[z]);it.__webglTexture&&(i.deleteTexture(it.__webglTexture),o.memory.textures--),n.remove(U[z])}n.remove(E)}let O=0;function H(){O=0}function N(){return O}function V(E){O=E}function $(){let E=O;return E>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,E}function X(E){let g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function nt(E,g){let U=n.get(E);if(E.isVideoTexture&&L(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&U.__version!==E.version){let z=E.image;if(z===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(U,E,g);return}}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+g)}function Y(E,g){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){xt(U,E,g);return}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+g)}function Q(E,g){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){xt(U,E,g);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+g)}function et(E,g){let U=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&U.__version!==E.version){Lt(U,E,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+g)}let wt={[vr]:i.REPEAT,[fn]:i.CLAMP_TO_EDGE,[Mr]:i.MIRRORED_REPEAT},Et={[ve]:i.NEAREST,[Ol]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[Me]:i.LINEAR,[Yr]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},te={[Hl]:i.NEVER,[Yl]:i.ALWAYS,[Vl]:i.LESS,[Io]:i.LEQUAL,[Gl]:i.EQUAL,[Lo]:i.GEQUAL,[Wl]:i.GREATER,[Xl]:i.NOTEQUAL};function Gt(E,g){if(g.type===an&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Me||g.magFilter===Yr||g.magFilter===Is||g.magFilter===Zn||g.minFilter===Me||g.minFilter===Yr||g.minFilter===Is||g.minFilter===Zn)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,wt[g.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,wt[g.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,wt[g.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Et[g.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Et[g.minFilter]),g.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,te[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===ve||g.minFilter!==Is&&g.minFilter!==Zn||g.type===an&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Yt(E,g){let U=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",R));let z=g.source,W=p.get(z);W===void 0&&(W={},p.set(z,W));let it=X(g);if(it!==E.__cacheKey){W[it]===void 0&&(W[it]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,U=!0),W[it].usedTimes++;let st=W[E.__cacheKey];st!==void 0&&(W[E.__cacheKey].usedTimes--,st.usedTimes===0&&A(g)),E.__cacheKey=it,E.__webglTexture=W[it].texture}return U}function q(E,g,U){return Math.floor(Math.floor(E/U)/g)}function j(E,g,U,z){let it=E.updateRanges;if(it.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,U,z,g.data);else{it.sort((bt,lt)=>bt.start-lt.start);let st=0;for(let bt=1;bt<it.length;bt++){let lt=it[st],ot=it[bt],St=lt.start+lt.count,At=q(ot.start,g.width,4),Dt=q(lt.start,g.width,4);ot.start<=St+1&&At===Dt&&q(ot.start+ot.count-1,g.width,4)===At?lt.count=Math.max(lt.count,ot.start+ot.count-lt.start):(++st,it[st]=ot)}it.length=st+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),K=e.getParameter(i.UNPACK_SKIP_PIXELS),rt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let bt=0,lt=it.length;bt<lt;bt++){let ot=it[bt],St=Math.floor(ot.start/4),At=Math.ceil(ot.count/4),Dt=St%g.width,I=Math.floor(St/g.width),at=At,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Dt),e.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,Dt,I,at,J,U,z,g.data)}E.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,K),e.pixelStorei(i.UNPACK_SKIP_ROWS,rt)}}function xt(E,g,U){let z=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(z=i.TEXTURE_3D);let W=Yt(E,g),it=g.source;e.bindTexture(z,E.__webglTexture,i.TEXTURE0+U);let st=n.get(it);if(it.version!==st.__version||W===!0){if(e.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let J=Vt.getPrimaries(Vt.workingColorSpace),ct=g.colorSpace===An?null:Vt.getPrimaries(g.colorSpace),ft=g.colorSpace===An||J===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let K=m(g.image,!1,s.maxTextureSize);K=be(g,K);let rt=r.convert(g.format,g.colorSpace),bt=r.convert(g.type),lt=M(g.internalFormat,rt,bt,g.normalized,g.colorSpace,g.isVideoTexture);Gt(z,g);let ot,St=g.mipmaps,At=g.isVideoTexture!==!0,Dt=st.__version===void 0||W===!0,I=it.dataReady,at=T(g,K);if(g.isDepthTexture)lt=S(g.format===$n,g.type),Dt&&(At?e.texStorage2D(i.TEXTURE_2D,1,lt,K.width,K.height):e.texImage2D(i.TEXTURE_2D,0,lt,K.width,K.height,0,rt,bt,null));else if(g.isDataTexture)if(St.length>0){At&&Dt&&e.texStorage2D(i.TEXTURE_2D,at,lt,St[0].width,St[0].height);for(let J=0,ct=St.length;J<ct;J++)ot=St[J],At?I&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ot.width,ot.height,rt,bt,ot.data):e.texImage2D(i.TEXTURE_2D,J,lt,ot.width,ot.height,0,rt,bt,ot.data);g.generateMipmaps=!1}else At?(Dt&&e.texStorage2D(i.TEXTURE_2D,at,lt,K.width,K.height),I&&j(g,K,rt,bt)):e.texImage2D(i.TEXTURE_2D,0,lt,K.width,K.height,0,rt,bt,K.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){At&&Dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,lt,St[0].width,St[0].height,K.depth);for(let J=0,ct=St.length;J<ct;J++)if(ot=St[J],g.format!==Ke)if(rt!==null)if(At){if(I)if(g.layerUpdates.size>0){let ft=sc(ot.width,ot.height,g.format,g.type);for(let tt of g.layerUpdates){let Tt=ot.data.subarray(tt*ft/ot.data.BYTES_PER_ELEMENT,(tt+1)*ft/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,tt,ot.width,ot.height,1,rt,Tt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ot.width,ot.height,K.depth,rt,ot.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,lt,ot.width,ot.height,K.depth,0,ot.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else At?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ot.width,ot.height,K.depth,rt,bt,ot.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,lt,ot.width,ot.height,K.depth,0,rt,bt,ot.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{At&&Dt&&e.texStorage2D(i.TEXTURE_2D,at,lt,St[0].width,St[0].height);for(let J=0,ct=St.length;J<ct;J++)ot=St[J],g.format!==Ke?rt!==null?At?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ot.width,ot.height,rt,ot.data):e.compressedTexImage2D(i.TEXTURE_2D,J,lt,ot.width,ot.height,0,ot.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?I&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ot.width,ot.height,rt,bt,ot.data):e.texImage2D(i.TEXTURE_2D,J,lt,ot.width,ot.height,0,rt,bt,ot.data)}else if(g.isDataArrayTexture)if(At){if(Dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,lt,K.width,K.height,K.depth),I)if(g.layerUpdates.size>0){let J=sc(K.width,K.height,g.format,g.type);for(let ct of g.layerUpdates){let ft=K.data.subarray(ct*J/K.data.BYTES_PER_ELEMENT,(ct+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ct,K.width,K.height,1,rt,bt,ft)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,rt,bt,K.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,lt,K.width,K.height,K.depth,0,rt,bt,K.data);else if(g.isData3DTexture)At?(Dt&&e.texStorage3D(i.TEXTURE_3D,at,lt,K.width,K.height,K.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,rt,bt,K.data)):e.texImage3D(i.TEXTURE_3D,0,lt,K.width,K.height,K.depth,0,rt,bt,K.data);else if(g.isFramebufferTexture){if(Dt)if(At)e.texStorage2D(i.TEXTURE_2D,at,lt,K.width,K.height);else{let J=K.width,ct=K.height;for(let ft=0;ft<at;ft++)e.texImage2D(i.TEXTURE_2D,ft,lt,J,ct,0,rt,bt,null),J>>=1,ct>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),K.parentNode!==J){J.appendChild(K),d.add(g),J.onpaint=ct=>{let ft=ct.changedElements;for(let tt of d)ft.includes(tt.image)&&(tt.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{let ft=i.RGBA,tt=i.RGBA,Tt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ft,tt,Tt,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(St.length>0){if(At&&Dt){let J=Jt(St[0]);e.texStorage2D(i.TEXTURE_2D,at,lt,J.width,J.height)}for(let J=0,ct=St.length;J<ct;J++)ot=St[J],At?I&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,rt,bt,ot):e.texImage2D(i.TEXTURE_2D,J,lt,rt,bt,ot);g.generateMipmaps=!1}else if(At){if(Dt){let J=Jt(K);e.texStorage2D(i.TEXTURE_2D,at,lt,J.width,J.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt,bt,K)}else e.texImage2D(i.TEXTURE_2D,0,lt,rt,bt,K);f(g)&&w(z),st.__version=it.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function Lt(E,g,U){if(g.image.length!==6)return;let z=Yt(E,g),W=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+U);let it=n.get(W);if(W.version!==it.__version||z===!0){e.activeTexture(i.TEXTURE0+U);let st=Vt.getPrimaries(Vt.workingColorSpace),Z=g.colorSpace===An?null:Vt.getPrimaries(g.colorSpace),K=g.colorSpace===An||st===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let rt=g.isCompressedTexture||g.image[0].isCompressedTexture,bt=g.image[0]&&g.image[0].isDataTexture,lt=[];for(let tt=0;tt<6;tt++)!rt&&!bt?lt[tt]=m(g.image[tt],!0,s.maxCubemapSize):lt[tt]=bt?g.image[tt].image:g.image[tt],lt[tt]=be(g,lt[tt]);let ot=lt[0],St=r.convert(g.format,g.colorSpace),At=r.convert(g.type),Dt=M(g.internalFormat,St,At,g.normalized,g.colorSpace),I=g.isVideoTexture!==!0,at=it.__version===void 0||z===!0,J=W.dataReady,ct=T(g,ot);Gt(i.TEXTURE_CUBE_MAP,g);let ft;if(rt){I&&at&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Dt,ot.width,ot.height);for(let tt=0;tt<6;tt++){ft=lt[tt].mipmaps;for(let Tt=0;Tt<ft.length;Tt++){let vt=ft[Tt];g.format!==Ke?St!==null?I?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,0,0,vt.width,vt.height,St,vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,Dt,vt.width,vt.height,0,vt.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,0,0,vt.width,vt.height,St,At,vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,Dt,vt.width,vt.height,0,St,At,vt.data)}}}else{if(ft=g.mipmaps,I&&at){ft.length>0&&ct++;let tt=Jt(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Dt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(bt){I?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,lt[tt].width,lt[tt].height,St,At,lt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Dt,lt[tt].width,lt[tt].height,0,St,At,lt[tt].data);for(let Tt=0;Tt<ft.length;Tt++){let ne=ft[Tt].image[tt].image;I?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,0,0,ne.width,ne.height,St,At,ne.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,Dt,ne.width,ne.height,0,St,At,ne.data)}}else{I?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,St,At,lt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Dt,St,At,lt[tt]);for(let Tt=0;Tt<ft.length;Tt++){let vt=ft[Tt];I?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,0,0,St,At,vt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,Dt,St,At,vt.image[tt])}}}f(g)&&w(i.TEXTURE_CUBE_MAP),it.__version=W.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function mt(E,g,U,z,W,it){let st=r.convert(U.format,U.colorSpace),Z=r.convert(U.type),K=M(U.internalFormat,st,Z,U.normalized,U.colorSpace),rt=n.get(g),bt=n.get(U);if(bt.__renderTarget=g,!rt.__hasExternalTextures){let lt=Math.max(1,g.width>>it),ot=Math.max(1,g.height>>it);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?e.texImage3D(W,it,K,lt,ot,g.depth,0,st,Z,null):e.texImage2D(W,it,K,lt,ot,0,st,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),ue(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,W,bt.__webglTexture,0,ce(g)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,W,bt.__webglTexture,it),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(E,g,U){if(i.bindRenderbuffer(i.RENDERBUFFER,E),g.depthBuffer){let z=g.depthTexture,W=z&&z.isDepthTexture?z.type:null,it=S(g.stencilBuffer,W),st=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ue(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(g),it,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(g),it,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,it,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,E)}else{let z=g.textures;for(let W=0;W<z.length;W++){let it=z[W],st=r.convert(it.format,it.colorSpace),Z=r.convert(it.type),K=M(it.internalFormat,st,Z,it.normalized,it.colorSpace);ue(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(g),K,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(g),K,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,K,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pe(E,g,U){let z=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let W=n.get(g.depthTexture);if(W.__renderTarget=g,(!W.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),z){if(W.__webglInit===void 0&&(W.__webglInit=!0,g.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,g.depthTexture);let rt=r.convert(g.depthTexture.format),bt=r.convert(g.depthTexture.type),lt;g.depthTexture.format===pn?lt=i.DEPTH_COMPONENT24:g.depthTexture.format===$n&&(lt=i.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,lt,g.width,g.height,0,rt,bt,null)}}else nt(g.depthTexture,0);let it=W.__webglTexture,st=ce(g),Z=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,K=g.depthTexture.format===$n?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===pn)ue(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,it,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,it,0);else if(g.depthTexture.format===$n)ue(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,it,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,it,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Bt(E){let g=n.get(E),U=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){let z=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),z){let W=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,z.removeEventListener("dispose",W)};z.addEventListener("dispose",W),g.__depthDisposeCallback=W}g.__boundDepthTexture=z}if(E.depthTexture&&!g.__autoAllocateDepthBuffer)if(U)for(let z=0;z<6;z++)pe(g.__webglFramebuffer[z],E,z);else{let z=E.texture.mipmaps;z&&z.length>0?pe(g.__webglFramebuffer[0],E,0):pe(g.__webglFramebuffer,E,0)}else if(U){g.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[z]),g.__webglDepthbuffer[z]===void 0)g.__webglDepthbuffer[z]=i.createRenderbuffer(),Ft(g.__webglDepthbuffer[z],E,!1);else{let W=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,it)}}else{let z=E.texture.mipmaps;if(z&&z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Ft(g.__webglDepthbuffer,E,!1);else{let W=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,it)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(E,g,U){let z=n.get(E);g!==void 0&&mt(z.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Bt(E)}function ee(E){let g=E.texture,U=n.get(E),z=n.get(g);E.addEventListener("dispose",y);let W=E.textures,it=E.isWebGLCubeRenderTarget===!0,st=W.length>1;if(st||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=g.version,o.memory.textures++),it){U.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer[Z]=[];for(let K=0;K<g.mipmaps.length;K++)U.__webglFramebuffer[Z][K]=i.createFramebuffer()}else U.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer=[];for(let Z=0;Z<g.mipmaps.length;Z++)U.__webglFramebuffer[Z]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(st)for(let Z=0,K=W.length;Z<K;Z++){let rt=n.get(W[Z]);rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&ue(E)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Z=0;Z<W.length;Z++){let K=W[Z];U.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[Z]);let rt=r.convert(K.format,K.colorSpace),bt=r.convert(K.type),lt=M(K.internalFormat,rt,bt,K.normalized,K.colorSpace,E.isXRRenderTarget===!0),ot=ce(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,lt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,U.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),Ft(U.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(it){e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,g);for(let Z=0;Z<6;Z++)if(g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)mt(U.__webglFramebuffer[Z][K],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,K);else mt(U.__webglFramebuffer[Z],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);f(g)&&w(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let Z=0,K=W.length;Z<K;Z++){let rt=W[Z],bt=n.get(rt),lt=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(lt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,bt.__webglTexture),Gt(lt,rt),mt(U.__webglFramebuffer,E,rt,i.COLOR_ATTACHMENT0+Z,lt,0),f(rt)&&w(lt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Z=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,z.__webglTexture),Gt(Z,g),g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)mt(U.__webglFramebuffer[K],E,g,i.COLOR_ATTACHMENT0,Z,K);else mt(U.__webglFramebuffer,E,g,i.COLOR_ATTACHMENT0,Z,0);f(g)&&w(Z),e.unbindTexture()}E.depthBuffer&&Bt(E)}function Ht(E){let g=E.textures;for(let U=0,z=g.length;U<z;U++){let W=g[U];if(f(W)){let it=P(E),st=n.get(W).__webglTexture;e.bindTexture(it,st),w(it),e.unbindTexture()}}}let oe=[],_e=[];function Fe(E){if(E.samples>0){if(ue(E)===!1){let g=E.textures,U=E.width,z=E.height,W=i.COLOR_BUFFER_BIT,it=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=n.get(E),Z=g.length>1;if(Z)for(let rt=0;rt<g.length;rt++)e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer);let K=E.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let rt=0;rt<g.length;rt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let bt=n.get(g[rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,U,z,0,0,U,z,W,i.NEAREST),c===!0&&(oe.length=0,_e.length=0,oe.push(i.COLOR_ATTACHMENT0+rt),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(oe.push(it),_e.push(it),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,oe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let rt=0;rt<g.length;rt++){e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let bt=n.get(g[rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&c){let g=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function ce(E){return Math.min(s.maxSamples,E.samples)}function ue(E){let g=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function L(E){let g=o.render.frame;u.get(E)!==g&&(u.set(E,g),E.update())}function be(E,g){let U=E.colorSpace,z=E.format,W=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||U!==us&&U!==An&&(Vt.getTransfer(U)===$t?(z!==Ke||W!==He)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ct("WebGLTextures: Unsupported texture color space:",U)),g}function Jt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=H,this.getTextureUnits=N,this.setTextureUnits=V,this.setTexture2D=nt,this.setTexture2DArray=Y,this.setTexture3D=Q,this.setTextureCube=et,this.rebindTextures=Xt,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Bt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=ue,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function h2(i,t){function e(n,s=An){let r,o=Vt.getTransfer(s);if(n===He)return i.UNSIGNED_BYTE;if(n===Zr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$r)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ya)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qa)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wa)return i.BYTE;if(n===Xa)return i.SHORT;if(n===Xi)return i.UNSIGNED_SHORT;if(n===qr)return i.INT;if(n===on)return i.UNSIGNED_INT;if(n===an)return i.FLOAT;if(n===cn)return i.HALF_FLOAT;if(n===Za)return i.ALPHA;if(n===$a)return i.RGB;if(n===Ke)return i.RGBA;if(n===pn)return i.DEPTH_COMPONENT;if(n===$n)return i.DEPTH_STENCIL;if(n===Ja)return i.RED;if(n===Jr)return i.RED_INTEGER;if(n===Jn)return i.RG;if(n===Kr)return i.RG_INTEGER;if(n===jr)return i.RGBA_INTEGER;if(n===Ls||n===Ds||n===Ns||n===Us)if(o===$t)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ls)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ls)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qr||n===to||n===eo||n===no)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===to)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===no)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===io||n===so||n===ro||n===oo||n===ao||n===Fs||n===co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===io||n===so)return o===$t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ro)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===oo)return r.COMPRESSED_R11_EAC;if(n===ao)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fs)return r.COMPRESSED_RG11_EAC;if(n===co)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===lo||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===xo||n===_o||n===yo||n===vo||n===Mo||n===bo||n===So)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===lo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ho)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===po)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===go)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_o)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bo)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===So)return o===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Eo||n===To||n===wo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Eo)return o===$t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===To)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ao||n===Ro||n===Os||n===Co)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ao)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ro)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Os)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Co)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var u2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d2=`
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

}`,_c=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ms(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new qe({vertexShader:u2,fragmentShader:d2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new De(new Ss(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yc=class extends sn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,x=null,v=typeof XRWebGLBinding<"u",m=new _c,f={},w=e.getContextAttributes(),P=null,M=null,S=[],T=[],R=new Pt,y=null,b=null,A=new we;A.viewport=new ae;let D=new we;D.viewport=new ae;let O=[A,D],H=new Gr,N=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let j=S[q];return j===void 0&&(j=new Ni,S[q]=j),j.getTargetRaySpace()},this.getControllerGrip=function(q){let j=S[q];return j===void 0&&(j=new Ni,S[q]=j),j.getGripSpace()},this.getHand=function(q){let j=S[q];return j===void 0&&(j=new Ni,S[q]=j),j.getHandSpace()};function $(q){let j=T.indexOf(q.inputSource);if(j===-1)return;let xt=S[j];xt!==void 0&&(xt.update(q.inputSource,q.frame,l||o),xt.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",nt);for(let q=0;q<S.length;q++){let j=T[q];j!==null&&(T[q]=null,S[q].disconnect(j))}N=null,V=null,m.reset();for(let q in f)delete f[q];if(t.setRenderTarget(P),p=null,h=null,d=null,s=null,M=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(R.width,R.height,!1),b!==null){let q=b.camera;q.fov=b.fov,q.zoom=b.zoom,q.updateProjectionMatrix(),b=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(P=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",X),s.addEventListener("inputsourceschange",nt),w.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Lt=null,mt=null;w.depth&&(mt=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=w.stencil?$n:pn,Lt=w.stencil?Yi:on);let Ft={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ft),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new ke(h.textureWidth,h.textureHeight,{format:Ke,type:He,depthTexture:new zn(h.textureWidth,h.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let xt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new ke(p.framebufferWidth,p.framebufferHeight,{format:Ke,type:He,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(q){for(let j=0;j<q.removed.length;j++){let xt=q.removed[j],Lt=T.indexOf(xt);Lt>=0&&(T[Lt]=null,S[Lt].disconnect(xt))}for(let j=0;j<q.added.length;j++){let xt=q.added[j],Lt=T.indexOf(xt);if(Lt===-1){for(let Ft=0;Ft<S.length;Ft++)if(Ft>=T.length){T.push(xt),Lt=Ft;break}else if(T[Ft]===null){T[Ft]=xt,Lt=Ft;break}if(Lt===-1)break}let mt=S[Lt];mt&&mt.connect(xt)}}let Y=new F,Q=new F;function et(q,j,xt){Y.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(xt.matrixWorld);let Lt=Y.distanceTo(Q),mt=j.projectionMatrix.elements,Ft=xt.projectionMatrix.elements,pe=mt[14]/(mt[10]-1),Bt=mt[14]/(mt[10]+1),Xt=(mt[9]+1)/mt[5],ee=(mt[9]-1)/mt[5],Ht=(mt[8]-1)/mt[0],oe=(Ft[8]+1)/Ft[0],_e=pe*Ht,Fe=pe*oe,ce=Lt/(-Ht+oe),ue=ce*-Ht;if(j.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ue),q.translateZ(ce),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),mt[10]===-1)q.projectionMatrix.copy(j.projectionMatrix),q.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let L=pe+ce,be=Bt+ce,Jt=_e-ue,E=Fe+(Lt-ue),g=Xt*Bt/be*L,U=ee*Bt/be*L;q.projectionMatrix.makePerspective(Jt,E,g,U,L,be),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function wt(q,j){j===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(j.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let j=q.near,xt=q.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(xt=m.depthFar)),H.near=D.near=A.near=j,H.far=D.far=A.far=xt,(N!==H.near||V!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),N=H.near,V=H.far),H.layers.mask=q.layers.mask|6,A.layers.mask=H.layers.mask&-5,D.layers.mask=H.layers.mask&-3;let Lt=q.parent,mt=H.cameras;wt(H,Lt);for(let Ft=0;Ft<mt.length;Ft++)wt(mt[Ft],Lt);mt.length===2?et(H,A,D):H.projectionMatrix.copy(A.projectionMatrix),b===null&&q.isPerspectiveCamera&&(b={camera:q,fov:q.fov,zoom:q.zoom}),Et(q,H,Lt)};function Et(q,j,xt){xt===null?q.matrix.copy(j.matrixWorld):(q.matrix.copy(xt.matrixWorld),q.matrix.invert(),q.matrix.multiply(j.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(j.projectionMatrix),q.projectionMatrixInverse.copy(j.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Li*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(q){return f[q]};let te=null;function Gt(q,j){if(u=j.getViewerPose(l||o),x=j,u!==null){let xt=u.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let Lt=!1;xt.length!==H.cameras.length&&(H.cameras.length=0,Lt=!0);for(let Bt=0;Bt<xt.length;Bt++){let Xt=xt[Bt],ee=null;if(p!==null)ee=p.getViewport(Xt);else{let oe=d.getViewSubImage(h,Xt);ee=oe.viewport,Bt===0&&(t.setRenderTargetTextures(M,oe.colorTexture,oe.depthStencilTexture),t.setRenderTarget(M))}let Ht=O[Bt];Ht===void 0&&(Ht=new we,Ht.layers.enable(Bt),Ht.viewport=new ae,O[Bt]=Ht),Ht.matrix.fromArray(Xt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Xt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(ee.x,ee.y,ee.width,ee.height),Bt===0&&(H.matrix.copy(Ht.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Lt===!0&&H.cameras.push(Ht)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let Bt=d.getDepthInformation(xt[0]);Bt&&Bt.isValid&&Bt.texture&&m.init(Bt,s.renderState)}if(mt&&mt.includes("camera-access")&&v){t.state.unbindTexture(),d=n.getBinding();for(let Bt=0;Bt<xt.length;Bt++){let Xt=xt[Bt].camera;if(Xt){let ee=f[Xt];ee||(ee=new Ms,f[Xt]=ee);let Ht=d.getCameraImage(Xt);ee.sourceTexture=Ht}}}}for(let xt=0;xt<S.length;xt++){let Lt=T[xt],mt=S[xt];Lt!==null&&mt!==void 0&&mt.update(Lt,j,l||o)}te&&te(q,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),x=null}let Yt=new Sh;Yt.setAnimationLoop(Gt),this.setAnimationLoop=function(q){te=q},this.dispose=function(){}}},f2=new le,Ch=new It;Ch.set(-1,0,0,0,1,0,0,0,1);function p2(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,ec(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,w,P,M){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),x(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,w,P):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ne&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ne&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let w=t.get(f),P=w.envMap,M=w.envMapRotation;P&&(m.envMap.value=P,m.envMapRotation.value.setFromMatrix4(f2.makeRotationFromEuler(M)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ch),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,w,P){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=P*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ne&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let w=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function m2(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,S){let T=S.program;n.uniformBlockBinding(M,T)}function l(M,S){let T=s[M.id];T===void 0&&(m(M),T=u(M),s[M.id]=T,M.addEventListener("dispose",w));let R=S.program;n.updateUBOMapping(M,R);let y=t.render.frame;r[M.id]!==y&&(h(M),r[M.id]=y)}function u(M){let S=d();M.__bindingPointIndex=S;let T=i.createBuffer(),R=M.__size,y=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,R,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,T),T}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Ct("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let S=s[M.id],T=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let y=0,b=T.length;y<b;y++){let A=T[y];if(Array.isArray(A))for(let D=0,O=A.length;D<O;D++)p(A[D],y,D,R);else p(A,y,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,S,T,R){if(v(M,S,T,R)===!0){let y=M.__offset,b=M.value;if(Array.isArray(b)){let A=0;for(let D=0;D<b.length;D++){let O=b[D],H=f(O);x(O,M.__data,A),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(A+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(b,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,M.__data)}}function x(M,S,T){typeof M=="number"||typeof M=="boolean"?S[0]=M:M.isMatrix3?(S[0]=M.elements[0],S[1]=M.elements[1],S[2]=M.elements[2],S[3]=0,S[4]=M.elements[3],S[5]=M.elements[4],S[6]=M.elements[5],S[7]=0,S[8]=M.elements[6],S[9]=M.elements[7],S[10]=M.elements[8],S[11]=0):ArrayBuffer.isView(M)?S.set(new M.constructor(M.buffer,M.byteOffset,S.length)):M.toArray(S,T)}function v(M,S,T,R){let y=M.value,b=S+"_"+T;if(R[b]===void 0)return typeof y=="number"||typeof y=="boolean"?R[b]=y:ArrayBuffer.isView(y)?R[b]=y.slice():R[b]=y.clone(),!0;{let A=R[b];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return R[b]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(A.equals(y)===!1)return A.copy(y),!0}}return!1}function m(M){let S=M.uniforms,T=0,R=16;for(let b=0,A=S.length;b<A;b++){let D=Array.isArray(S[b])?S[b]:[S[b]];for(let O=0,H=D.length;O<H;O++){let N=D[O],V=Array.isArray(N.value)?N.value:[N.value];for(let $=0,X=V.length;$<X;$++){let nt=V[$],Y=f(nt),Q=T%R,et=Q%Y.boundary,wt=Q+et;T+=et,wt!==0&&R-wt<Y.storage&&(T+=R-wt),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=T,T+=Y.storage}}}let y=T%R;return y>0&&(T+=R-y),M.__size=T,M.__cache={},this}function f(M){let S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(S.boundary=16,S.storage=M.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",M),S}function w(M){let S=M.target;S.removeEventListener("dispose",w);let T=o.indexOf(S.__bindingPointIndex);o.splice(T,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function P(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:P}}var g2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),xn=null;function x2(){return xn===null&&(xn=new wr(g2,16,16,Jn,cn),xn.name="DFG_LUT",xn.minFilter=Me,xn.magFilter=Me,xn.wrapS=fn,xn.wrapT=fn,xn.generateMipmaps=!1,xn.needsUpdate=!0),xn}var Oo=class{constructor(t={}){let{canvas:e=Zl(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=He}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;let v=p,m=new Set([jr,Kr,Jr]),f=new Set([He,on,Xi,Yi,Zr,$r]),w=new Uint32Array(4),P=new Int32Array(4),M=new F,S=null,T=null,R=[],y=[],b=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,D=!1,O=null,H=null,N=null,V=null;this._outputColorSpace=Ie;let $=0,X=0,nt=null,Y=-1,Q=null,et=new ae,wt=new ae,Et=null,te=new zt(0),Gt=0,Yt=e.width,q=e.height,j=1,xt=null,Lt=null,mt=new ae(0,0,Yt,q),Ft=new ae(0,0,Yt,q),pe=!1,Bt=new Oi,Xt=!1,ee=!1,Ht=new le,oe=new F,_e=new ae,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ce=!1;function ue(){return nt===null?j:1}let L=n;function be(_,C){return e.getContext(_,C)}let Jt,E,g,U,z,W,it,st,Z,K,rt,bt,lt,ot,St,At,Dt,I,at,J,ct,ft,tt;try{let _={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ne,!1),e.addEventListener("webglcontextrestored",qt,!1),e.addEventListener("webglcontextcreationerror",je,!1),L===null){let C="webgl2";if(L=be(C,_),L===null)throw be(C)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Tt()}catch(_){throw e.removeEventListener("webglcontextlost",ne,!1),e.removeEventListener("webglcontextrestored",qt,!1),e.removeEventListener("webglcontextcreationerror",je,!1),Ct("WebGLRenderer: "+_.message),_}function Tt(){Jt=new Ep(L),Jt.init(),ct=new h2(L,Jt),E=new pp(L,Jt,t,ct),g=new c2(L,Jt),E.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),H=L.createFramebuffer(),N=L.createFramebuffer(),V=L.createFramebuffer(),U=new Ap(L),z=new Z0,W=new l2(L,Jt,g,z,E,ct,U),it=new Sp(A),st=new Rd(L),ft=new dp(L,st),Z=new Tp(L,st,U,ft),K=new Cp(L,Z,st,ft,U),I=new Rp(L,E,W),St=new mp(z),rt=new q0(A,it,Jt,E,ft,St),bt=new p2(A,z),lt=new J0,ot=new n2(Jt),Dt=new up(A,it,g,K,x,c),At=new a2(A,K,E),tt=new m2(L,U,E,g),at=new fp(L,Jt,U),J=new wp(L,Jt,U),U.programs=rt.programs,A.capabilities=E,A.extensions=Jt,A.properties=z,A.renderLists=lt,A.shadowMap=At,A.state=g,A.info=U}v!==He&&(b=new Ip(v,e.width,e.height,a,s,r));let vt=new yc(A,L);this.xr=vt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let _=Jt.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Jt.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(_){_!==void 0&&(j=_,this.setSize(Yt,q,!1))},this.getSize=function(_){return _.set(Yt,q)},this.setSize=function(_,C,G=!0){if(vt.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}Yt=_,q=C,e.width=Math.floor(_*j),e.height=Math.floor(C*j),G===!0&&(e.style.width=_+"px",e.style.height=C+"px"),b!==null&&b.setSize(e.width,e.height),this.setViewport(0,0,_,C)},this.getDrawingBufferSize=function(_){return _.set(Yt*j,q*j).floor()},this.setDrawingBufferSize=function(_,C,G){Yt=_,q=C,j=G,e.width=Math.floor(_*G),e.height=Math.floor(C*G),this.setViewport(0,0,_,C)},this.setEffects=function(_){if(v===He){Ct("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let C=0;C<_.length;C++)if(_[C].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(et)},this.getViewport=function(_){return _.copy(mt)},this.setViewport=function(_,C,G,B){_.isVector4?mt.set(_.x,_.y,_.z,_.w):mt.set(_,C,G,B),g.viewport(et.copy(mt).multiplyScalar(j).round())},this.getScissor=function(_){return _.copy(Ft)},this.setScissor=function(_,C,G,B){_.isVector4?Ft.set(_.x,_.y,_.z,_.w):Ft.set(_,C,G,B),g.scissor(wt.copy(Ft).multiplyScalar(j).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(_){g.setScissorTest(pe=_)},this.setOpaqueSort=function(_){xt=_},this.setTransparentSort=function(_){Lt=_},this.getClearColor=function(_){return _.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor(...arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha(...arguments)},this.clear=function(_=!0,C=!0,G=!0){let B=0;if(_){let k=!1;if(nt!==null){let dt=nt.texture.format;k=m.has(dt)}if(k){let dt=nt.texture.type,gt=f.has(dt),ut=Dt.getClearColor(),_t=Dt.getClearAlpha(),Mt=ut.r,Nt=ut.g,kt=ut.b;gt?(w[0]=Mt,w[1]=Nt,w[2]=kt,w[3]=_t,L.clearBufferuiv(L.COLOR,0,w)):(P[0]=Mt,P[1]=Nt,P[2]=kt,P[3]=_t,L.clearBufferiv(L.COLOR,0,P))}else B|=L.COLOR_BUFFER_BIT}C&&(B|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(B|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&L.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),O=_},this.dispose=function(){e.removeEventListener("webglcontextlost",ne,!1),e.removeEventListener("webglcontextrestored",qt,!1),e.removeEventListener("webglcontextcreationerror",je,!1),Dt.dispose(),lt.dispose(),ot.dispose(),z.dispose(),it.dispose(),K.dispose(),ft.dispose(),tt.dispose(),rt.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",Lc),vt.removeEventListener("sessionend",Dc),Qn.stop()};function ne(_){_.preventDefault(),ja("WebGLRenderer: Context Lost."),D=!0}function qt(){ja("WebGLRenderer: Context Restored."),D=!1;let _=U.autoReset,C=At.enabled,G=At.autoUpdate,B=At.needsUpdate,k=At.type;Tt(),U.autoReset=_,At.enabled=C,At.autoUpdate=G,At.needsUpdate=B,At.type=k}function je(_){Ct("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function hn(_){let C=_.target;C.removeEventListener("dispose",hn),mu(C)}function mu(_){gu(_),z.remove(_)}function gu(_){let C=z.get(_).programs;C!==void 0&&(C.forEach(function(G){rt.releaseProgram(G)}),_.isShaderMaterial&&rt.releaseShaderCache(_))}this.renderBufferDirect=function(_,C,G,B,k,dt){C===null&&(C=Fe);let gt=k.isMesh&&k.matrixWorld.determinantAffine()<0,ut=yu(_,C,G,B,k);g.setMaterial(B,gt);let _t=G.index,Mt=1;if(B.wireframe===!0){if(_t=Z.getWireframeAttribute(G),_t===void 0)return;Mt=2}let Nt=G.drawRange,kt=G.attributes.position,yt=Nt.start*Mt,Zt=(Nt.start+Nt.count)*Mt;dt!==null&&(yt=Math.max(yt,dt.start*Mt),Zt=Math.min(Zt,(dt.start+dt.count)*Mt)),_t!==null?(yt=Math.max(yt,0),Zt=Math.min(Zt,_t.count)):kt!=null&&(yt=Math.max(yt,0),Zt=Math.min(Zt,kt.count));let de=Zt-yt;if(de<0||de===1/0)return;ft.setup(k,B,ut,G,_t);let se,Qt=at;if(_t!==null&&(se=st.get(_t),Qt=J,Qt.setIndex(se)),k.isMesh)B.wireframe===!0?(g.setLineWidth(B.wireframeLinewidth*ue()),Qt.setMode(L.LINES)):Qt.setMode(L.TRIANGLES);else if(k.isLine){let Se=B.linewidth;Se===void 0&&(Se=1),g.setLineWidth(Se*ue()),k.isLineSegments?Qt.setMode(L.LINES):k.isLineLoop?Qt.setMode(L.LINE_LOOP):Qt.setMode(L.LINE_STRIP)}else k.isPoints?Qt.setMode(L.POINTS):k.isSprite&&Qt.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(Jt.get("WEBGL_multi_draw"))Qt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Se=k._multiDrawStarts,pt=k._multiDrawCounts,Ce=k._multiDrawCount,Wt=_t?st.get(_t).bytesPerElement:1,$e=z.get(B).currentProgram.getUniforms();for(let un=0;un<Ce;un++)$e.setValue(L,"_gl_DrawID",un),Qt.render(Se[un]/Wt,pt[un])}else if(k.isInstancedMesh)Qt.renderInstances(yt,de,k.count);else if(G.isInstancedBufferGeometry){let Se=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,pt=Math.min(G.instanceCount,Se);Qt.renderInstances(yt,de,pt)}else Qt.render(yt,de)};function Ic(_,C,G,B){O!==null&&_.isNodeMaterial&&O.setObject(B,_),Xt===!0&&St.setState(_,G,!1),_.transparent===!0&&_.side===mn&&_.forceSinglePass===!1?(_.side=Ne,_.needsUpdate=!0,Xs(_,C,B),_.side=Yn,_.needsUpdate=!0,Xs(_,C,B),_.side=mn):Xs(_,C,B)}this.compile=function(_,C,G=null){G===null&&(G=_),O!==null&&O.renderStart(_,C,G),T=ot.get(G),T.init(C),y.push(T),G.traverseVisible(function(k){k.isLight&&k.layers.test(C.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),_!==G&&_.traverseVisible(function(k){k.isLight&&k.layers.test(C.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),T.setupLights(),O!==null&&O.updateLights(T.state.lightsArray),ee=this.localClippingEnabled,Xt=St.init(this.clippingPlanes,ee),Xt===!0&&St.setGlobalState(this.clippingPlanes,C),O!==null&&At.render(T.state.shadowsArray,G,C);let B=new Set;return _.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let dt=k.material;if(dt)if(Array.isArray(dt))for(let gt=0;gt<dt.length;gt++){let ut=dt[gt];Ic(ut,G,C,k),B.add(ut)}else Ic(dt,G,C,k),B.add(dt)}),T=y.pop(),O!==null&&O.renderEnd(),B},this.compileAsync=function(_,C,G=null){let B=this.compile(_,C,G);return new Promise(k=>{function dt(){if(B.forEach(function(gt){let _t=z.get(gt).currentProgram;(_t===void 0||_t.isReady())&&B.delete(gt)}),B.size===0){k(_);return}setTimeout(dt,10)}Jt.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Ko=null;function xu(_){Ko&&Ko(_)}function Lc(){Qn.stop()}function Dc(){Qn.start()}let Qn=new Sh;Qn.setAnimationLoop(xu),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(_){Ko=_,vt.setAnimationLoop(_),_===null?Qn.stop():Qn.start()},vt.addEventListener("sessionstart",Lc),vt.addEventListener("sessionend",Dc),this.render=function(_,C){if(C!==void 0&&C.isCamera!==!0){Ct("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;O!==null&&O.renderStart(_,C);let G=vt.enabled===!0&&vt.isPresenting===!0,B=b!==null&&(nt===null||G)&&b.begin(A,nt);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),C.parent===null&&C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(C),C=vt.getCamera()),_.isScene===!0&&_.onBeforeRender(A,_,C,nt),T=ot.get(_,y.length),T.init(C),T.state.textureUnits=W.getTextureUnits(),y.push(T),Ht.multiplyMatrices(C.projectionMatrix,C.matrixWorldInverse),Bt.setFromProjectionMatrix(Ht,nn,C.reversedDepth),ee=this.localClippingEnabled,Xt=St.init(this.clippingPlanes,ee),S=lt.get(_,R.length),S.init(),R.push(S),vt.enabled===!0&&vt.isPresenting===!0){let gt=A.xr.getDepthSensingMesh();gt!==null&&jo(gt,C,-1/0,A.sortObjects)}jo(_,C,0,A.sortObjects),S.finish(),O!==null&&O.updateLights(T.state.lightsArray),A.sortObjects===!0&&S.sort(xt,Lt),ce=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,ce&&Dt.addToRenderList(S,_),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xt===!0&&St.beginShadows();let k=T.state.shadowsArray;if(At.render(k,_,C),Xt===!0&&St.endShadows(),(B&&b.hasRenderPass())===!1){let gt=S.opaque,ut=S.transmissive;if(T.setupLights(),C.isArrayCamera){let _t=C.cameras;if(ut.length>0)for(let Mt=0,Nt=_t.length;Mt<Nt;Mt++){let kt=_t[Mt];Uc(gt,ut,_,kt)}ce&&Dt.render(_);for(let Mt=0,Nt=_t.length;Mt<Nt;Mt++){let kt=_t[Mt];Nc(S,_,kt,kt.viewport)}}else ut.length>0&&Uc(gt,ut,_,C),ce&&Dt.render(_),Nc(S,_,C)}nt!==null&&X===0&&(W.updateMultisampleRenderTarget(nt),W.updateRenderTargetMipmap(nt)),B&&b.end(A),_.isScene===!0&&_.onAfterRender(A,_,C),ft.resetDefaultState(),Y=-1,Q=null,y.pop(),y.length>0?(T=y[y.length-1],W.setTextureUnits(T.state.textureUnits),Xt===!0&&St.setGlobalState(A.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,O!==null&&O.renderEnd()};function jo(_,C,G,B){if(_.visible===!1)return;if(_.layers.test(C.layers)){if(_.isGroup)G=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(C);else if(_.isLightProbeGrid)T.pushLightProbeGrid(_);else if(_.isLight)T.pushLight(_),_.castShadow&&T.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||_.intersectsFrustum(Bt)){B&&_e.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ht);let gt=K.update(_),ut=_.material;ut.visible&&S.push(_,gt,ut,G,_e.z,null,C)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||_.intersectsFrustum(Bt))){let gt=K.update(_),ut=_.material;if(B&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),_e.copy(_.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),_e.copy(gt.boundingSphere.center)),_e.applyMatrix4(_.matrixWorld).applyMatrix4(Ht)),Array.isArray(ut)){let _t=gt.groups;for(let Mt=0,Nt=_t.length;Mt<Nt;Mt++){let kt=_t[Mt],yt=ut[kt.materialIndex];yt&&yt.visible&&S.push(_,gt,yt,G,_e.z,kt,C)}}else ut.visible&&S.push(_,gt,ut,G,_e.z,null,C)}}let dt=_.children;for(let gt=0,ut=dt.length;gt<ut;gt++)jo(dt[gt],C,G,B)}function Nc(_,C,G,B){let{opaque:k,transmissive:dt,transparent:gt}=_;T.setupLightsView(G),Xt===!0&&St.setGlobalState(A.clippingPlanes,G),B&&g.viewport(et.copy(B)),k.length>0&&Ws(k,C,G),dt.length>0&&Ws(dt,C,G),gt.length>0&&Ws(gt,C,G),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Uc(_,C,G,B){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[B.id]===void 0){let yt=Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[B.id]=new ke(1,1,{generateMipmaps:!0,type:yt?cn:He,minFilter:Zn,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Vt.workingColorSpace})}let dt=T.state.transmissionRenderTarget[B.id],gt=B.viewport||et;dt.setSize(gt.z*A.transmissionResolutionScale,gt.w*A.transmissionResolutionScale);let ut=A.getRenderTarget(),_t=A.getActiveCubeFace(),Mt=A.getActiveMipmapLevel();A.setRenderTarget(dt),A.getClearColor(te),Gt=A.getClearAlpha(),Gt<1&&A.setClearColor(16777215,.5),A.clear(),ce&&Dt.render(G);let Nt=A.toneMapping;A.toneMapping=rn;let kt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),T.setupLightsView(B),Xt===!0&&St.setGlobalState(A.clippingPlanes,B),Ws(_,G,B),W.updateMultisampleRenderTarget(dt),W.updateRenderTargetMipmap(dt),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let Zt=0,de=C.length;Zt<de;Zt++){let se=C[Zt],{object:Qt,geometry:Se,material:pt,group:Ce}=se;if(pt.side===mn&&Qt.layers.test(B.layers)){let Wt=pt.side;pt.side=Ne,pt.needsUpdate=!0,Fc(Qt,G,B,Se,pt,Ce),pt.side=Wt,pt.needsUpdate=!0,yt=!0}}yt===!0&&(W.updateMultisampleRenderTarget(dt),W.updateRenderTargetMipmap(dt))}A.setRenderTarget(ut,_t,Mt),A.setClearColor(te,Gt),kt!==void 0&&(B.viewport=kt),A.toneMapping=Nt}function Ws(_,C,G){let B=C.isScene===!0?C.overrideMaterial:null;for(let k=0,dt=_.length;k<dt;k++){let gt=_[k],{object:ut,geometry:_t,group:Mt}=gt,Nt=gt.material;Nt.allowOverride===!0&&B!==null&&(Nt=B),ut.layers.test(G.layers)&&Fc(ut,C,G,_t,Nt,Mt)}}function Fc(_,C,G,B,k,dt){O!==null&&k.isNodeMaterial&&O.setObject(_,k),_.onBeforeRender(A,C,G,B,k,dt),_.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),k.onBeforeRender(A,C,G,B,_,dt),k.transparent===!0&&k.side===mn&&k.forceSinglePass===!1?(k.side=Ne,k.needsUpdate=!0,A.renderBufferDirect(G,C,B,k,_,dt),k.side=Yn,k.needsUpdate=!0,A.renderBufferDirect(G,C,B,k,_,dt),k.side=mn):A.renderBufferDirect(G,C,B,k,_,dt),_.onAfterRender(A,C,G,B,k,dt)}function Xs(_,C,G){C.isScene!==!0&&(C=Fe);let B=z.get(_),k=T.state.lights,dt=T.state.shadowsArray,gt=k.state.version,ut=rt.getParameters(_,k.state,dt,C,G,T.state.lightProbeGridArray),_t=rt.getProgramCacheKey(ut),Mt=B.programs;B.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,B.fog=C.fog;let Nt=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;B.envMap=it.get(_.envMap||B.environment,Nt),B.envMapRotation=B.environment!==null&&_.envMap===null?C.environmentRotation:_.envMapRotation,Mt===void 0&&(_.addEventListener("dispose",hn),Mt=new Map,B.programs=Mt);let kt=Mt.get(_t);if(kt!==void 0){if(B.currentProgram===kt&&B.lightsStateVersion===gt)return Bc(_,ut),kt}else ut.uniforms=rt.getUniforms(_),O!==null&&_.isNodeMaterial&&O.build(_,G,ut),_.onBeforeCompile(ut,A),kt=rt.acquireProgram(ut,_t),Mt.set(_t,kt),B.uniforms=ut.uniforms;let yt=B.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(yt.clippingPlanes=St.uniform),Bc(_,ut),B.needsLights=Mu(_),B.lightsStateVersion=gt,B.needsLights&&(yt.ambientLightColor.value=k.state.ambient,yt.lightProbe.value=k.state.probe,yt.sunLights.value=k.state.sun,yt.sunLightShadows.value=k.state.sunShadow,yt.directionalLights.value=k.state.directional,yt.directionalLightShadows.value=k.state.directionalShadow,yt.spotLights.value=k.state.spot,yt.spotLightShadows.value=k.state.spotShadow,yt.rectAreaLights.value=k.state.rectArea,yt.ltc_1.value=k.state.rectAreaLTC1,yt.ltc_2.value=k.state.rectAreaLTC2,yt.pointLights.value=k.state.point,yt.pointLightShadows.value=k.state.pointShadow,yt.hemisphereLights.value=k.state.hemi,yt.sunShadowMatrix.value=k.state.sunShadowMatrix,yt.sunShadowCascade.value=k.state.sunShadowCascade,yt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,yt.spotLightMatrix.value=k.state.spotLightMatrix,yt.spotLightMap.value=k.state.spotLightMap,yt.pointShadowMatrix.value=k.state.pointShadowMatrix),B.lightProbeGrid=T.state.lightProbeGridArray.length>0,B.currentProgram=kt,B.uniformsList=null,kt}function Oc(_){if(_.uniformsList===null){let C=_.currentProgram.getUniforms();_.uniformsList=Ji.seqWithValue(C.seq,_.uniforms)}return _.uniformsList}function Bc(_,C){let G=z.get(_);G.outputColorSpace=C.outputColorSpace,G.batching=C.batching,G.batchingColor=C.batchingColor,G.instancing=C.instancing,G.instancingColor=C.instancingColor,G.instancingMorph=C.instancingMorph,G.skinning=C.skinning,G.morphTargets=C.morphTargets,G.morphNormals=C.morphNormals,G.morphColors=C.morphColors,G.morphTargetsCount=C.morphTargetsCount,G.numClippingPlanes=C.numClippingPlanes,G.numIntersection=C.numClipIntersection,G.vertexAlphas=C.vertexAlphas,G.vertexTangents=C.vertexTangents,G.toneMapping=C.toneMapping}function _u(_,C){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;M.setFromMatrixPosition(C.matrixWorld);for(let G=0,B=_.length;G<B;G++){let k=_[G];if(k.texture!==null&&k.boundingBox.containsPoint(M))return k}return null}function yu(_,C,G,B,k){C.isScene!==!0&&(C=Fe),W.resetTextureUnits();let dt=C.fog,gt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?C.environment:null,ut=nt===null?A.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Vt.workingColorSpace,_t=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Mt=it.get(B.envMap||gt,_t),Nt=B.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,kt=!!G.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),yt=!!G.morphAttributes.position,Zt=!!G.morphAttributes.normal,de=!!G.morphAttributes.color,se=rn;B.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(se=A.toneMapping);let Qt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Se=Qt!==void 0?Qt.length:0,pt=z.get(B),Ce=T.state.lights;if(Xt===!0&&(ee===!0||_!==Q)){let ie=_===Q&&B.id===Y;St.setState(B,_,ie)}let Wt=!1;B.version===pt.__version?(pt.needsLights&&pt.lightsStateVersion!==Ce.state.version||pt.outputColorSpace!==ut||k.isBatchedMesh&&pt.batching===!1||!k.isBatchedMesh&&pt.batching===!0||k.isBatchedMesh&&pt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&pt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&pt.instancing===!1||!k.isInstancedMesh&&pt.instancing===!0||k.isSkinnedMesh&&pt.skinning===!1||!k.isSkinnedMesh&&pt.skinning===!0||k.isInstancedMesh&&pt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&pt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&pt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&pt.instancingMorph===!1&&k.morphTexture!==null||pt.envMap!==Mt||B.fog===!0&&pt.fog!==dt||pt.numClippingPlanes!==void 0&&(pt.numClippingPlanes!==St.numPlanes||pt.numIntersection!==St.numIntersection)||pt.vertexAlphas!==Nt||pt.vertexTangents!==kt||pt.morphTargets!==yt||pt.morphNormals!==Zt||pt.morphColors!==de||pt.toneMapping!==se||pt.morphTargetsCount!==Se||!!pt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Wt=!0):(Wt=!0,pt.__version=B.version);let $e=pt.currentProgram;Wt===!0&&($e=Xs(B,C,k),O&&B.isNodeMaterial&&O.onUpdateProgram(B,$e,pt));let un=!1,Rn=!1,ui=!1,jt=$e.getUniforms(),he=pt.uniforms;if(g.useProgram($e.program)&&(un=!0,Rn=!0,ui=!0),B.id!==Y&&(Y=B.id,Rn=!0),pt.needsLights){let ie=_u(T.state.lightProbeGridArray,k);pt.lightProbeGrid!==ie&&(pt.lightProbeGrid=ie,Rn=!0)}if(un||Q!==_){g.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),jt.setValue(L,"projectionMatrix",_.projectionMatrix),jt.setValue(L,"viewMatrix",_.matrixWorldInverse);let Pn=jt.map.cameraPosition;Pn!==void 0&&Pn.setValue(L,oe.setFromMatrixPosition(_.matrixWorld)),E.logarithmicDepthBuffer&&jt.setValue(L,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&jt.setValue(L,"isOrthographic",_.isOrthographicCamera===!0),Q!==_&&(Q=_,Rn=!0,ui=!0)}if(pt.needsLights&&(Ce.state.sunShadowMap.length>0&&jt.setValue(L,"sunShadowMap",Ce.state.sunShadowMap,W),Ce.state.directionalShadowMap.length>0&&jt.setValue(L,"directionalShadowMap",Ce.state.directionalShadowMap,W),Ce.state.spotShadowMap.length>0&&jt.setValue(L,"spotShadowMap",Ce.state.spotShadowMap,W),Ce.state.pointShadowMap.length>0&&jt.setValue(L,"pointShadowMap",Ce.state.pointShadowMap,W)),k.isSkinnedMesh){jt.setOptional(L,k,"bindMatrix"),jt.setOptional(L,k,"bindMatrixInverse");let ie=k.skeleton;ie&&(ie.boneTexture===null&&ie.computeBoneTexture(),jt.setValue(L,"boneTexture",ie.boneTexture,W))}k.isBatchedMesh&&(jt.setOptional(L,k,"batchingTexture"),jt.setValue(L,"batchingTexture",k._matricesTexture,W),jt.setOptional(L,k,"batchingIdTexture"),jt.setValue(L,"batchingIdTexture",k._indirectTexture,W),jt.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&jt.setValue(L,"batchingColorTexture",k._colorsTexture,W));let Cn=G.morphAttributes;if((Cn.position!==void 0||Cn.normal!==void 0||Cn.color!==void 0)&&I.update(k,G,$e),(Rn||pt.receiveShadow!==k.receiveShadow)&&(pt.receiveShadow=k.receiveShadow,jt.setValue(L,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&C.environment!==null&&(he.envMapIntensity.value=C.environmentIntensity),he.dfgLUT!==void 0&&(he.dfgLUT.value=x2()),Rn){if(jt.setValue(L,"toneMappingExposure",A.toneMappingExposure),pt.needsLights&&vu(he,ui),dt&&B.fog===!0&&bt.refreshFogUniforms(he,dt),bt.refreshMaterialUniforms(he,B,j,q,T.state.transmissionRenderTarget[_.id]),pt.needsLights&&pt.lightProbeGrid){let ie=pt.lightProbeGrid;he.probesSH.value=ie.texture,he.probesMin.value.copy(ie.boundingBox.min),he.probesMax.value.copy(ie.boundingBox.max),he.probesResolution.value.copy(ie.resolution)}Ji.upload(L,Oc(pt),he,W)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ji.upload(L,Oc(pt),he,W),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&jt.setValue(L,"center",k.center),jt.setValue(L,"modelViewMatrix",k.modelViewMatrix),jt.setValue(L,"normalMatrix",k.normalMatrix),jt.setValue(L,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){let ie=B.uniformsGroups;for(let Pn=0,di=ie.length;Pn<di;Pn++){let zc=ie[Pn];tt.update(zc,$e),tt.bind(zc,$e)}}return $e}function vu(_,C){_.ambientLightColor.needsUpdate=C,_.lightProbe.needsUpdate=C,_.sunLights.needsUpdate=C,_.sunLightShadows.needsUpdate=C,_.directionalLights.needsUpdate=C,_.directionalLightShadows.needsUpdate=C,_.pointLights.needsUpdate=C,_.pointLightShadows.needsUpdate=C,_.spotLights.needsUpdate=C,_.spotLightShadows.needsUpdate=C,_.rectAreaLights.needsUpdate=C,_.hemisphereLights.needsUpdate=C}function Mu(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(_,C,G){let B=z.get(_);B.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),z.get(_.texture).__webglTexture=C,z.get(_.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:G,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,C){let G=z.get(_);G.__webglFramebuffer=C,G.__useDefaultFramebuffer=C===void 0},this.setRenderTarget=function(_,C=0,G=0){nt=_,$=C,X=G;let B=null,k=!1,dt=!1;if(_){let ut=z.get(_);if(ut.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(L.FRAMEBUFFER,ut.__webglFramebuffer),et.copy(_.viewport),wt.copy(_.scissor),Et=_.scissorTest,g.viewport(et),g.scissor(wt),g.setScissorTest(Et),Y=-1;return}else if(ut.__webglFramebuffer===void 0)W.setupRenderTarget(_);else if(ut.__hasExternalTextures)W.rebindTextures(_,z.get(_.texture).__webglTexture,z.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Nt=_.depthTexture;if(ut.__boundDepthTexture!==Nt){if(Nt!==null&&z.has(Nt)&&(_.width!==Nt.image.width||_.height!==Nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(_)}}let _t=_.texture;(_t.isData3DTexture||_t.isDataArrayTexture||_t.isCompressedArrayTexture)&&(dt=!0);let Mt=z.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Mt[C])?B=Mt[C][G]:B=Mt[C],k=!0):_.samples>0&&W.useMultisampledRTT(_)===!1?B=z.get(_).__webglMultisampledFramebuffer:Array.isArray(Mt)?B=Mt[G]:B=Mt,et.copy(_.viewport),wt.copy(_.scissor),Et=_.scissorTest}else et.copy(mt).multiplyScalar(j).floor(),wt.copy(Ft).multiplyScalar(j).floor(),Et=pe;if(G!==0&&(B=H),g.bindFramebuffer(L.FRAMEBUFFER,B)&&g.drawBuffers(_,B),g.viewport(et),g.scissor(wt),g.setScissorTest(Et),k){let ut=z.get(_.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+C,ut.__webglTexture,G)}else if(dt){let ut=C;for(let _t=0;_t<_.textures.length;_t++){let Mt=z.get(_.textures[_t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+_t,Mt.__webglTexture,G,ut)}}else if(_!==null&&G!==0){let ut=z.get(_.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ut.__webglTexture,G)}Y=-1};function kc(_){let C=z.get(_);return(C.__readFormat!==_.format||C.__readType!==_.type)&&(C.__readFormat=_.format,C.__readType=_.type,C.__formatReadable=E.textureFormatReadable(_.format),C.__typeReadable=E.textureTypeReadable(_.type)),C}this.readRenderTargetPixels=function(_,C,G,B,k,dt,gt,ut=0){if(!(_&&_.isWebGLRenderTarget)){Ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=z.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&gt!==void 0&&(_t=_t[gt]),_t){g.bindFramebuffer(L.FRAMEBUFFER,_t);try{let Mt=_.textures[ut],Nt=Mt.format,kt=Mt.type;_.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ut);let yt=kc(Mt);if(yt.__formatReadable===!1){Ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(yt.__typeReadable===!1){Ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}C>=0&&C<=_.width-B&&G>=0&&G<=_.height-k&&L.readPixels(C,G,B,k,ct.convert(Nt),ct.convert(kt),dt)}finally{let Mt=nt!==null?z.get(nt).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(_,C,G,B,k,dt,gt,ut=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=z.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&gt!==void 0&&(_t=_t[gt]),_t)if(C>=0&&C<=_.width-B&&G>=0&&G<=_.height-k){g.bindFramebuffer(L.FRAMEBUFFER,_t);let Mt=_.textures[ut],Nt=Mt.format,kt=Mt.type;_.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ut);let yt=kc(Mt);if(yt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(yt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Zt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Zt),L.bufferData(L.PIXEL_PACK_BUFFER,dt.byteLength,L.STREAM_READ),L.readPixels(C,G,B,k,ct.convert(Nt),ct.convert(kt),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let de=nt!==null?z.get(nt).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,de);let se=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Jl(L,se,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Zt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,dt),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(Zt),L.deleteSync(se),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,C=null,G=0){let B=Math.pow(2,-G),k=Math.floor(_.image.width*B),dt=Math.floor(_.image.height*B),gt=C!==null?C.x:0,ut=C!==null?C.y:0;W.setTexture2D(_,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,gt,ut,k,dt),g.unbindTexture()},this.copyTextureToTexture=function(_,C,G=null,B=null,k=0,dt=0){let gt,ut,_t,Mt,Nt,kt,yt,Zt,de,se=_.isCompressedTexture?_.mipmaps[dt]:_.image;if(G!==null)gt=G.max.x-G.min.x,ut=G.max.y-G.min.y,_t=G.isBox3?G.max.z-G.min.z:1,Mt=G.min.x,Nt=G.min.y,kt=G.isBox3?G.min.z:0;else{let he=Math.pow(2,-k);gt=Math.floor(se.width*he),ut=Math.floor(se.height*he),_.isDataArrayTexture?_t=se.depth:_.isData3DTexture?_t=Math.floor(se.depth*he):_t=1,Mt=0,Nt=0,kt=0}B!==null?(yt=B.x,Zt=B.y,de=B.z):(yt=0,Zt=0,de=0);let Qt=ct.convert(C.format),Se=ct.convert(C.type),pt;C.isData3DTexture?(W.setTexture3D(C,0),pt=L.TEXTURE_3D):C.isDataArrayTexture||C.isCompressedArrayTexture?(W.setTexture2DArray(C,0),pt=L.TEXTURE_2D_ARRAY):(W.setTexture2D(C,0),pt=L.TEXTURE_2D),g.activeTexture(L.TEXTURE0),g.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,C.flipY),g.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),g.pixelStorei(L.UNPACK_ALIGNMENT,C.unpackAlignment);let Ce=g.getParameter(L.UNPACK_ROW_LENGTH),Wt=g.getParameter(L.UNPACK_IMAGE_HEIGHT),$e=g.getParameter(L.UNPACK_SKIP_PIXELS),un=g.getParameter(L.UNPACK_SKIP_ROWS),Rn=g.getParameter(L.UNPACK_SKIP_IMAGES);g.pixelStorei(L.UNPACK_ROW_LENGTH,se.width),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,se.height),g.pixelStorei(L.UNPACK_SKIP_PIXELS,Mt),g.pixelStorei(L.UNPACK_SKIP_ROWS,Nt),g.pixelStorei(L.UNPACK_SKIP_IMAGES,kt);let ui=_.isDataArrayTexture||_.isData3DTexture,jt=C.isDataArrayTexture||C.isData3DTexture;if(_.isDepthTexture){let he=z.get(_),Cn=z.get(C),ie=z.get(he.__renderTarget),Pn=z.get(Cn.__renderTarget);g.bindFramebuffer(L.READ_FRAMEBUFFER,ie.__webglFramebuffer),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let di=0;di<_t;di++)ui&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(_).__webglTexture,k,kt+di),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(C).__webglTexture,dt,de+di)),L.blitFramebuffer(Mt,Nt,gt,ut,yt,Zt,gt,ut,L.DEPTH_BUFFER_BIT,L.NEAREST);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(k!==0||_.isRenderTargetTexture||z.has(_)){let he=z.get(_),Cn=z.get(C);g.bindFramebuffer(L.READ_FRAMEBUFFER,N),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,V);for(let ie=0;ie<_t;ie++)ui?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,he.__webglTexture,k,kt+ie):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,he.__webglTexture,k),jt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Cn.__webglTexture,dt,de+ie):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Cn.__webglTexture,dt),k!==0?L.blitFramebuffer(Mt,Nt,gt,ut,yt,Zt,gt,ut,L.COLOR_BUFFER_BIT,L.NEAREST):jt?L.copyTexSubImage3D(pt,dt,yt,Zt,de+ie,Mt,Nt,gt,ut):L.copyTexSubImage2D(pt,dt,yt,Zt,Mt,Nt,gt,ut);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else jt?_.isDataTexture||_.isData3DTexture?L.texSubImage3D(pt,dt,yt,Zt,de,gt,ut,_t,Qt,Se,se.data):C.isCompressedArrayTexture?L.compressedTexSubImage3D(pt,dt,yt,Zt,de,gt,ut,_t,Qt,se.data):L.texSubImage3D(pt,dt,yt,Zt,de,gt,ut,_t,Qt,Se,se):_.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,dt,yt,Zt,gt,ut,Qt,Se,se.data):_.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,dt,yt,Zt,se.width,se.height,Qt,se.data):L.texSubImage2D(L.TEXTURE_2D,dt,yt,Zt,gt,ut,Qt,Se,se);g.pixelStorei(L.UNPACK_ROW_LENGTH,Ce),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Wt),g.pixelStorei(L.UNPACK_SKIP_PIXELS,$e),g.pixelStorei(L.UNPACK_SKIP_ROWS,un),g.pixelStorei(L.UNPACK_SKIP_IMAGES,Rn),dt===0&&C.generateMipmaps&&L.generateMipmap(pt),g.unbindTexture()},this.initRenderTarget=function(_){z.get(_).__webglFramebuffer===void 0&&W.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?W.setTextureCube(_,0):_.isData3DTexture?W.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?W.setTexture2DArray(_,0):W.setTexture2D(_,0),g.unbindTexture()},this.resetState=function(){$=0,X=0,nt=null,g.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Vt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Vt._getUnpackColorSpace()}};var Ph={type:"change"},Mc={type:"start"},Lh={type:"end"},zo=new Fi,Ih=new Xe,y2=Math.cos(70*tc.DEG2RAD),xe=new F,Ve=2*Math.PI,Kt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},vc=1e-6,Ho=class extends Rs{constructor(t,e=null){super(t,e),this.state=Kt.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wn.ROTATE,MIDDLE:Wn.DOLLY,RIGHT:Wn.PAN},this.touches={ONE:Xn.ROTATE,TWO:Xn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new Ye,this._lastTargetPosition=new F,this._quat=new Ye().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vi,this._sphericalDelta=new Vi,this._scale=1,this._panOffset=new F,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new F,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=M2.bind(this),this._onPointerDown=v2.bind(this),this._onPointerUp=b2.bind(this),this._onContextMenu=C2.bind(this),this._onMouseWheel=T2.bind(this),this._onKeyDown=w2.bind(this),this._onTouchStart=A2.bind(this),this._onTouchMove=R2.bind(this),this._onMouseDown=S2.bind(this),this._onMouseMove=E2.bind(this),this._interceptControlDown=P2.bind(this),this._interceptControlUp=I2.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Kt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ph),this.update(),this.state=Kt.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;xe.copy(e).sub(this.target),xe.applyQuaternion(this._quat),this._spherical.setFromVector3(xe),this.autoRotate&&this.state===Kt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ve:n>Math.PI&&(n-=Ve),s<-Math.PI?s+=Ve:s>Math.PI&&(s-=Ve),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(xe.setFromSpherical(this._spherical),xe.applyQuaternion(this._quatInverse),e.copy(this.target).add(xe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=xe.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=xe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(zo.origin.copy(this.object.position),zo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zo.direction))<y2?this.object.lookAt(this.target):(Ih.setFromNormalAndCoplanarPoint(this.object.up,this.target),zo.intersectPlane(Ih,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>vc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>vc||this._lastTargetPosition.distanceToSquared(this.target)>vc?(this.dispatchEvent(Ph),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ve/60*this.autoRotateSpeed*t:Ve/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){xe.setFromMatrixColumn(e,0),xe.multiplyScalar(-t),this._panOffset.add(xe)}_panUp(t,e){this.screenSpacePanning===!0?xe.setFromMatrixColumn(e,1):(xe.setFromMatrixColumn(e,0),xe.crossVectors(this.object.up,xe)),xe.multiplyScalar(t),this._panOffset.add(xe)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;xe.copy(s).sub(this.target);let r=xe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Pt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function v2(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function M2(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function b2(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Lh),this.state=Kt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function S2(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Wn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Kt.DOLLY;break;case Wn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Kt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Kt.ROTATE}break;case Wn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Kt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Kt.PAN}break;default:this.state=Kt.NONE}this.state!==Kt.NONE&&this.dispatchEvent(Mc)}function E2(i){switch(this.state){case Kt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Kt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Kt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function T2(i){this.enabled===!1||this.enableZoom===!1||this.state!==Kt.NONE||(i.preventDefault(),this.dispatchEvent(Mc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Lh))}function w2(i){this.enabled!==!1&&this._handleKeyDown(i)}function A2(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Xn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Kt.TOUCH_ROTATE;break;case Xn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Kt.TOUCH_PAN;break;default:this.state=Kt.NONE}break;case 2:switch(this.touches.TWO){case Xn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Kt.TOUCH_DOLLY_PAN;break;case Xn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Kt.TOUCH_DOLLY_ROTATE;break;default:this.state=Kt.NONE}break;default:this.state=Kt.NONE}this.state!==Kt.NONE&&this.dispatchEvent(Mc)}function R2(i){switch(this._trackPointer(i),this.state){case Kt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Kt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Kt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Kt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Kt.NONE}}function C2(i){this.enabled!==!1&&i.preventDefault()}function P2(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function I2(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Z2={},Dh="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js",L2="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm",D2="./coaster-core.stl",N2="./coaster-base-v1.stl",bc=null,Sc=null;async function U2(){return bc||(bc=import(typeof window<"u"?Dh:"manifold-3d").catch(()=>import(Dh)).then(t=>(t.default||t)(typeof window<"u"?{locateFile:s=>s.endsWith(".wasm")?L2:s}:{})).then(t=>(t.setup(),t))),bc}function F2(i){for(let t of i)if(t&&typeof t.delete=="function")try{t.delete()}catch{}}function ji(i,t){return i.push(t),t}function O2(i,t){let e=i.status?i.status():"NoError";if(e&&e!=="NoError")throw new Error(`${t} manifold error: ${e}`);return i}function Ec(i){return{vertProperties:Float32Array.from(i.vertProperties),triVerts:Uint32Array.from(i.triVerts),numProp:i.numProp||3}}function Uh(i){let t=new DataView(i),e=t.getUint32(80,!0),n=new Map,s=[],r=[],o=(l,u,d)=>`${l.toFixed(4)},${u.toFixed(4)},${d.toFixed(4)}`,a=(l,u,d)=>{let h=o(l,u,d),p=n.get(h);return p===void 0&&(p=s.length/3,s.push(l,u,d),n.set(h,p)),p},c=84;for(let l=0;l<e;l++){c+=12;let u=a(t.getFloat32(c,!0),t.getFloat32(c+4,!0),t.getFloat32(c+8,!0));c+=12;let d=a(t.getFloat32(c,!0),t.getFloat32(c+4,!0),t.getFloat32(c+8,!0));c+=12;let h=a(t.getFloat32(c,!0),t.getFloat32(c+4,!0),t.getFloat32(c+8,!0));c+=14,r.push(u,d,h)}return{numProp:3,vertProperties:new Float32Array(s),triVerts:new Uint32Array(r)}}async function Fh(i){if(typeof window>"u"){let{readFileSync:e}=await import("node:fs"),{join:n,dirname:s}=await import("node:path"),{fileURLToPath:r}=await import("node:url"),o=s(r(Z2.url));return e(n(o,i.replace(/^\.\//,""))).buffer}let t=await fetch(i);if(!t.ok)throw new Error(`Could not load ${i}`);return t.arrayBuffer()}async function B2(){return Fh(D2)}async function k2(){return Sc||(Sc=B2().then(i=>Ec(Uh(i)))),Sc}function z2(i,t){let e=i.numProp||3,n=i.vertProperties.length/e,s=new Float32Array(i.vertProperties.length+t.vertProperties.length);s.set(i.vertProperties),s.set(t.vertProperties,i.vertProperties.length);let r=new Uint32Array(i.triVerts.length+t.triVerts.length);r.set(i.triVerts);for(let o=0;o<t.triVerts.length;o++)r[i.triVerts.length+o]=t.triVerts[o]+n;return{numProp:e,vertProperties:s,triVerts:r}}function Oh(i){let{vertProperties:t,triVerts:e,numProp:n}=i,s=n||3,r=0;for(let o=0;o<e.length;o+=3){let a=e[o]*s,c=e[o+1]*s,l=e[o+2]*s,u=t[a],d=t[a+1],h=t[a+2],p=t[c],x=t[c+1],v=t[c+2],m=t[l],f=t[l+1],w=t[l+2];r+=u*(x*w-v*f)+p*(f*h-d*w)+m*(d*v-x*h)}return Math.abs(r/6)}function H2(i,t,e,n,s){let r=Math.max(.05,n-e),o=Math.max(10,Math.ceil(s*(r/(Math.PI*2)))),a=[];for(let c=0;c<=o;c++){let l=e+r*c/o;a.push([t*Math.cos(l),t*Math.sin(l)])}for(let c=o;c>=0;c--){let l=e+r*c/o;a.push([i*Math.cos(l),i*Math.sin(l)])}return a}function Nh(i,t,e,n,s){let{Manifold:r,CrossSection:o}=i,a=e*Math.PI/180,c=a-t.armHalfRad,l=a+t.armHalfRad,u=H2(t.innerR,t.outerR,c,l,n),d=ji(s,o.ofPolygons([u],"NonZero")),h=.08,p=t.p.armHeight+h,x=ji(s,d.extrude(p));x=ji(s,x.translate([0,0,t.deckT-h]));let v=t.outerR*Math.cos(a),m=t.outerR*Math.sin(a),f=ji(s,r.sphere(t.topFilletR,n).translate([v,m,t.totalZ-t.topFilletR*.55]));return ji(s,r.hull([x,f]))}function V2(i,t,e,n){let s=In(t),r=Nh(i,s,es[0],n,e);for(let o=1;o<es.length;o++){let a=Nh(i,s,es[o],n,e);r=ji(e,r.add(a)),O2(r,"union arm")}return{solid:r,d:s}}function G2(i){let t=ti(i);return t.armHeight===fi.armHeight&&t.armWidth===fi.armWidth}async function W2(){let i=await Fh(N2);return Ec(Uh(i))}async function Bh(i,{quality:t="preview"}={}){let e=await U2(),n=t==="export"?72:48;typeof e.setCircularSegments=="function"&&e.setCircularSegments(n);let s=[];try{let r=await k2(),{solid:o,d:a}=V2(e,i,s,n),c=Ec(o.getMesh()),l=z2(r,c),u=Oh(l);return{d:a,mesh:l,volume:u,genus:0,tris:l.triVerts.length/3,armTopZ:X2(c)}}finally{F2(s)}}function X2(i){let t=i.vertProperties,e=i.numProp||3,n=0;for(let s=e-1;s<t.length;s+=e)n=Math.max(n,t[s]);return n}async function kh(i,{quality:t="preview"}={}){return Bh(i,{quality:t})}async function Y2(i){if(G2(i)){let t=await W2();return{d:In(i),mesh:t,volume:Oh(t),genus:null,tris:t.triVerts.length/3}}return Bh(i,{quality:"export"})}async function zh(i){let{mesh:t,volume:e,d:n}=await Y2(i);return{stl:q2(t,"coaster-base"),volume:e,mesh:t,d:n}}function q2(i,t="mesh"){let{vertProperties:e,triVerts:n,numProp:s}=i,r=s||3,o=n.length/3,a=new Uint8Array(80),c=`${t}`.slice(0,79);for(let h=0;h<c.length;h++)a[h]=c.charCodeAt(h);let l=new ArrayBuffer(84+o*50),u=new DataView(l);new Uint8Array(l,0,80).set(a),u.setUint32(80,o,!0);let d=84;for(let h=0;h<o;h++){let p=n[h*3]*r,x=n[h*3+1]*r,v=n[h*3+2]*r,m=e[p],f=e[p+1],w=e[p+2],P=e[x],M=e[x+1],S=e[x+2],T=e[v],R=e[v+1],y=e[v+2],b=P-m,A=M-f,D=S-w,O=T-m,H=R-f,N=y-w,V=A*N-D*H,$=D*O-b*N,X=b*H-A*O,nt=Math.hypot(V,$,X)||1;u.setFloat32(d,V/nt,!0),u.setFloat32(d+4,$/nt,!0),u.setFloat32(d+8,X/nt,!0),u.setFloat32(d+12,m,!0),u.setFloat32(d+16,f,!0),u.setFloat32(d+20,w,!0),u.setFloat32(d+24,P,!0),u.setFloat32(d+28,M,!0),u.setFloat32(d+32,S,!0),u.setFloat32(d+36,T,!0),u.setFloat32(d+40,R,!0),u.setFloat32(d+44,y,!0),u.setUint16(d+48,0,!0),d+=50}return l}function Hh(i){let{vertProperties:t,triVerts:e,numProp:n}=i,s=n||3,r=new Float32Array(e.length*3),o=0;for(let a=0;a<e.length;a++){let c=e[a]*s;r[o++]=t[c],r[o++]=t[c+1],r[o++]=t[c+2]}return r}function Vh(i,t){let e=new Blob([t],{type:"model/stl"}),n=URL.createObjectURL(e),s=document.createElement("a");s.href=n,s.download=i,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),1500)}function Gh(i){return i.byteLength<84?0:new DataView(i).getUint32(80,!0)}function $2(i){let t=new ze;return t.setAttribute("position",new Oe(Hh(i),3)),t.computeVertexNormals(),t}var Vo=class{constructor({canvas:t}){this.canvas=t,this.renderer=new Oo({canvas:t,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(15130578,1),this.renderer.outputColorSpace=Ie,this.scene=new gs,this.camera=new we(32,1,.1,4e3),this.camera.up.set(0,0,1),this.camera.position.set(150,-110,150),this.controls=new Ho(this.camera,t),this.controls.enableDamping=!0,this.controls.target.set(0,0,12),this.scene.add(new ws(16775150,13155240,.9));let e=new Hi(16777215,1.45);e.position.set(90,-180,70),this.scene.add(e);let n=new Hi(16770248,.45);n.position.set(-120,60,-80),this.scene.add(n),this.bed=new De(new bs(80,72),new ki({color:14274754,roughness:1})),this.bed.position.z=-.05,this.scene.add(this.bed),this.mat=new ki({color:12880218,roughness:.52,metalness:.02}),this.mesh=new De(new ze,this.mat),this.scene.add(this.mesh),this.fitted=!1,this.view="angle",this.running=!0,this._loop=this._loop.bind(this),requestAnimationFrame(this._loop),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t.parentElement),this.resize()}resize(){let t=this.canvas.clientWidth||1,e=this.canvas.clientHeight||1;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}setView(t){this.view=t;let e={angle:new F(150,-110,150),front:new F(0,-210,80),top:new F(.1,.1,280)};this.camera.position.copy(e[t]||e.angle),this.controls.target.set(0,0,12),this.controls.update()}fit(){this.setView(this.view),this.fitted=!0}update(t){if(!t?.mesh)return;let e=t.d?.totalZ??31,n=$2(t.mesh);this.mesh.geometry.dispose(),this.mesh.geometry=n,this.controls.target.set(0,0,Math.max(8,e*.38)),this.setView(this.view)}_loop(){this.running&&(this.controls.update(),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this._loop))}};var Hs="mathoose-public-playground:print-library";function Wh(){return{favorites:[],activity:[],settings:{}}}function Go(){try{let i=JSON.parse(localStorage.getItem(Hs));return!i||typeof i!="object"?Wh():{favorites:Array.isArray(i.favorites)?i.favorites:[],activity:Array.isArray(i.activity)?i.activity:[],settings:i.settings&&typeof i.settings=="object"?i.settings:{}}}catch{return Wh()}}function Tc(i){try{localStorage.setItem(Hs,JSON.stringify(i))}catch{}}function wc(i){try{return JSON.parse(JSON.stringify(i))}catch{return null}}function Ac(i,t){i.activity.unshift(t),i.activity=i.activity.slice(0,30)}function Xh(){return new URLSearchParams(location.search).get("restore")==="1"?!0:location.hash==="#restore"||location.hash.includes("restore=1")}function Yh(i){let t=Go().settings[i];return t?wc(t):null}function qh(i){let t=Go(),e=t.activity[0];e&&e.id===i&&e.kind==="visit"&&Date.now()-e.at<12e4||(Ac(t,{id:i,kind:"visit",at:Date.now()}),Tc(t))}function Vs(i,t){let e=Go(),n=wc(t);n&&(e.settings[i]=n),Ac(e,{id:i,kind:"save",at:Date.now()}),Tc(e)}function Wo(i,{filename:t,params:e}={}){let n=Go(),s=e==null?null:wc(e);s&&(n.settings[i]=s),Ac(n,{id:i,kind:"export",filename:t||"",at:Date.now()}),Tc(n)}var Zh="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js",J2="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm",$h="test-export-style",K2=12,j2=`
dialog.test-prompt {
  border: 0;
  border-radius: 16px;
  padding: 18px 18px 14px;
  max-width: min(420px, calc(100vw - 32px));
  background: #f7f1e8;
  color: var(--ink, #1c1917);
  box-shadow: 0 18px 50px rgba(40, 30, 20, 0.28);
}
dialog.test-prompt::backdrop { background: rgba(40, 30, 20, 0.35); }
dialog.test-prompt h2 { margin: 0 0 6px; font-size: 1.05rem; }
dialog.test-prompt p { margin: 0 0 12px; color: var(--muted, #78716c); font-size: 0.85rem; line-height: 1.4; }
dialog.test-prompt label { display: grid; gap: 4px; margin: 8px 0; font-size: 0.9rem; }
dialog.test-prompt input {
  width: 100%;
  padding: 8px 8px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 8px;
  background: #fff;
  color: var(--ink, #1c1917);
  font-size: 16px;
}
dialog.test-prompt .actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
dialog.test-prompt .actions .ghost { order: -1; }
dialog.test-prompt button {
  appearance: none;
  border: 0;
  border-radius: 999px;
  padding: 8px 14px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 650;
  cursor: pointer;
  background: var(--accent, #9a3412);
  color: #fff;
  width: auto;
}
dialog.test-prompt button.ghost {
  background: transparent;
  color: var(--ink, #1c1917);
  border: 1px solid var(--line, #ddd6cc);
}
.test-log {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.test-log li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--muted, #78716c);
}
.test-log button {
  appearance: none;
  border: 1px solid var(--line, #ddd6cc);
  background: #fff;
  color: var(--ink, #1c1917);
  border-radius: 999px;
  padding: 4px 10px;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 650;
  cursor: pointer;
  width: auto;
}
#testStatus { margin: 8px 0 0; font-size: 0.85rem; }
#testStatus[data-kind="err"] { color: var(--warn, #9a3412); }
`,Q2={0:"abcedf",1:"bc",2:"abged",3:"abgcd",4:"fgbc",5:"afgcd",6:"afgedc",7:"abc",8:"abcdefg",9:"abfgcd"},jh=3.15,Qh=1.3,tu=1.45,Rc=null;function Cc(i,t=1){let e=Number(i);if(!Number.isFinite(e))return"0";let n=t>=1?0:t>=.1?1:2,s=10**n,r=Math.round(e*s)/s;return n===0?String(r):r.toFixed(n).replace(/(\.\d*?)0+$/,"$1").replace(/\.$/,"")}function t3(i,t){return i.map(e=>Cc(t[e.key],e.step)).join(" ")}function e3(i){return i===" "?Qh:i==="."?tu:jh}function n3(i){let t=0;for(let e of String(i))t+=e3(e);return t}function i3(i,t,e,n){let c=n-.275,l={a:[2.5/2,4.1-.52/2,2.5,.52],b:[2.5-.52/2,4.1*.75,.52,4.1/2],c:[2.5-.52/2,4.1*.25,.52,4.1/2],d:[2.5/2,.52/2,2.5,.52],e:[.52/2,4.1*.25,.52,4.1/2],f:[.52/2,4.1*.75,.52,4.1/2],g:[2.5/2,4.1/2,2.5-.52,.52]};return[...Q2[i]||""].map(u=>{let[d,h,p,x]=l[u];return{size:[p,x,.55],at:[t+d,e+h,c]}})}function eu(){try{let i=JSON.parse(localStorage.getItem(Hs));return!i||typeof i!="object"?{favorites:[],activity:[],settings:{}}:((!i.settings||typeof i.settings!="object")&&(i.settings={}),i)}catch{return{favorites:[],activity:[],settings:{}}}}function Xo(i){return`${i}-tests`}function Jh(i){let t=eu().settings[Xo(i)];return Array.isArray(t)?t:[]}function s3(i,t){let e=eu(),n=Array.isArray(e.settings[Xo(i)])?e.settings[Xo(i)]:[];n.unshift(t),e.settings[Xo(i)]=n.slice(0,K2);try{localStorage.setItem(Hs,JSON.stringify(e))}catch{}}async function r3(){return Rc||(Rc=import(typeof window<"u"?Zh:"manifold-3d").catch(()=>import(Zh)).then(t=>(t.default||t)(typeof window<"u"?{locateFile:s=>s.endsWith(".wasm")?J2:s}:{})).then(t=>(t.setup(),t))),Rc}function o3(i){for(let t of i)if(t&&typeof t.delete=="function")try{t.delete()}catch{}}function Pc(i,t){let e=i.status?i.status():"NoError";if(e&&e!=="NoError")throw new Error(`${t} manifold error: ${e}`);return i}function a3(i){return{vertProperties:Float32Array.from(i.vertProperties),triVerts:Uint32Array.from(i.triVerts),numProp:i.numProp||3}}function Qi(i,t,e,n){return n(i.cube(t,!0).translate(e))}function Yo(i,t,e){return Pc(e(i.add(t)),"union")}function c3(i,t,e,n,s,r,o){let{Manifold:a}=i,c=n,l=null;for(let u of String(e)){if(u===" "){c+=Qh;continue}if(u==="."){let d=Qi(a,[.62,.62,.55],[c+.72,s+.55,r-.275],o);l=l?Yo(l,d,o):d,c+=tu;continue}for(let d of i3(u,c,s,r)){let h=Qi(a,d.size,d.at,o);l=l?Yo(l,h,o):h}c+=jh}return l?Pc(o(t.subtract(l)),"Test marking"):t}function l3(i,t,e,n){let{Manifold:s}=i,r=t,o=r.boundingBox();(o.min[2]<-1e-4||o.min[2]>.001)&&(r=n(r.translate([0,0,-o.min[2]])),o=r.boundingBox());let a=String(e),c=n3(a),l=6.8,u=1.8,d=Math.max(c+2.4,10),h=.75,p=(o.min[0]+o.max[0])/2,x=o.min[1]+h,v=x-l,m=Qi(s,[d,l,u],[p,(v+x)/2,u/2],n),f=Pc(n(r.add(m)),"Test piece");return f=c3(i,f,a,p-c/2,v+1.15,u,n),o=f.boundingBox(),o.min[2]<-1e-4&&(f=n(f.translate([0,0,-o.min[2]]))),f}function h3(i,t="test"){let{vertProperties:e,triVerts:n,numProp:s}=i,r=s||3,o=n.length/3,a=new Uint8Array(80),c=String(t).slice(0,79);for(let h=0;h<c.length;h++)a[h]=c.charCodeAt(h);let l=new ArrayBuffer(84+o*50),u=new DataView(l);new Uint8Array(l,0,80).set(a),u.setUint32(80,o,!0);let d=84;for(let h=0;h<o;h++){let p=n[h*3]*r,x=n[h*3+1]*r,v=n[h*3+2]*r,m=e[p],f=e[p+1],w=e[p+2],P=e[x],M=e[x+1],S=e[x+2],T=e[v],R=e[v+1],y=e[v+2],b=(M-f)*(y-w)-(S-w)*(R-f),A=(S-w)*(T-m)-(P-m)*(y-w),D=(P-m)*(R-f)-(M-f)*(T-m),O=Math.hypot(b,A,D)||1;u.setFloat32(d,b/O,!0),u.setFloat32(d+4,A/O,!0),u.setFloat32(d+8,D/O,!0),u.setFloat32(d+12,m,!0),u.setFloat32(d+16,f,!0),u.setFloat32(d+20,w,!0),u.setFloat32(d+24,P,!0),u.setFloat32(d+28,M,!0),u.setFloat32(d+32,S,!0),u.setFloat32(d+36,T,!0),u.setFloat32(d+40,R,!0),u.setFloat32(d+44,y,!0),u.setUint16(d+48,0,!0),d+=50}return l}function u3(i,t){let e=new Blob([t],{type:"model/stl"}),n=URL.createObjectURL(e),s=document.createElement("a");s.href=n,s.download=i,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),1500)}async function nu({feature:i,label:t,stlName:e}){let n=await r3();typeof n.setCircularSegments=="function"&&n.setCircularSegments(48);let s=[],r=o=>(s.push(o),o);try{let o=i(n,r,s);if(!o)throw new Error("Test piece is empty");let a=l3(n,o,t,r),c=a3(a.getMesh()),l=a.volume();if(!(l>0))throw new Error("Test piece has no volume");return{stl:h3(c,e),mesh:c,volume:l,label:t}}finally{o3(s)}}function d3(){if(document.getElementById($h))return;let i=document.createElement("style");i.id=$h,i.textContent=j2,document.head.appendChild(i)}function f3(i,t){let e=Number(t);return Number.isFinite(e)||(e=Number(i.fallback??i.min??0)),Number.isFinite(i.min)&&(e=Math.max(i.min,e)),Number.isFinite(i.max)&&(e=Math.min(i.max,e)),e}function Kh(i,t){return i.map(e=>{let n=e.unit?` ${e.unit}`:"";return`${e.label} ${Cc(t[e.key],e.step)}${n}`}).join(" \xB7 ")}function p3(i){return String(i).replace(/\s+/g,"-").replace(/\./g,"p")}function m3(i,t){if(!t.length){i.hidden=!0,i.innerHTML="";return}i.hidden=!1,i.innerHTML=t.map((e,n)=>`
        <li>
          <span>${e.summary||e.filename||"test"}</span>
          <button type="button" data-load-test="${n}">Load</button>
        </li>`).join("")}function g3(i,t,e){if(!i||typeof i.showModal!="function")return Promise.resolve(null);for(let n of t){let s=i.querySelector(`[name="${n.key}"]`);s&&(s.value=Cc(e[n.key],n.step))}return i.showModal(),new Promise(n=>{let s=()=>{if(i.removeEventListener("close",s),i.returnValue!=="ok"){n(null);return}let r={};for(let o of t){let a=i.querySelector(`[name="${o.key}"]`);r[o.key]=f3(o,a?.value)}n(r)};i.addEventListener("close",s)})}function iu({appId:i,actions:t,buttonLabel:e="Test export",buttonClass:n="wide",title:s="Test export settings",fields:r,getParams:o,setParams:a,build:c,fileStem:l,labelFor:u}){if(!t||!r?.length)return;d3();let d=document.createElement("button");d.type="button",d.id="dlTest",d.className=n,d.textContent=e,t.appendChild(d);let h=document.createElement("ul");h.className="test-log",h.id="testLog",h.hidden=!0,t.insertAdjacentElement("afterend",h);let p=document.createElement("p");p.id="testStatus",p.className="status",h.insertAdjacentElement("afterend",p);let x=document.createElement("dialog");x.id="testPrompt",x.className="test-prompt";let v=document.createElement("form");v.method="dialog";let m=document.createElement("h2");m.textContent=s;let f=document.createElement("p");f.textContent="These numbers are engraved on the test piece and saved so you can load this export again.",v.append(m,f);for(let b of r){let A=document.createElement("label");A.textContent=b.unit?`${b.label} (${b.unit})`:b.label;let D=document.createElement("input");D.name=b.key,D.type="number",D.inputMode="decimal",b.min!=null&&(D.min=String(b.min)),b.max!=null&&(D.max=String(b.max)),b.step!=null&&(D.step=String(b.step)),A.appendChild(D),v.appendChild(A)}let w=document.createElement("div");w.className="actions";let P=document.createElement("button");P.type="submit",P.value="ok",P.textContent="Export test";let M=document.createElement("button");M.type="submit",M.value="cancel",M.className="ghost",M.textContent="Cancel",w.append(P,M),v.appendChild(w),x.appendChild(v),document.body.appendChild(x);let S=(b,A="")=>{p.textContent=b,p.dataset.kind=A},T=()=>m3(h,Jh(i));async function R(){let b=await g3(x,r,o());if(!b){S("Test export canceled.");return}a({...o(),...b});let A=o(),D=u?u(A):t3(r,A);S("Building test\u2026"),d.disabled=!0;try{let O=await c(A,D),H=`${l}-test-${p3(D)}.stl`;u3(H,O.stl);let N=u?`${Kh(r,A)} \xB7 ${D}`:Kh(r,A);s3(i,{at:Date.now(),filename:H,summary:N,label:D,params:{...A}}),Vs(i,A),Wo(i,{filename:H,params:A}),T(),S(`Test \xB7 ${N} \xB7 engraved on the piece`)}catch(O){console.error(O),S(String(O?.message||O),"err")}finally{d.disabled=!1}}function y(b){let A=Jh(i)[b];A?.params&&(a(A.params),Vs(i,o()),S(`Loaded test ${A.summary||A.label||""}`.trim()))}d.addEventListener("click",()=>R()),h.addEventListener("click",b=>{let A=b.target.closest("[data-load-test]");A&&y(Number(A.getAttribute("data-load-test")))}),T()}var Ig=Object.freeze({slotWidth:11.4,slotLength:32.2,clipThickness:4.2,engagement:8,squareEnd:16});var Fg=Object.freeze({ledDiameter:58.4,ledThickness:7.6,clearance:.6,cordDiameter:8,cordHeight:3.8,cordAngle:0}),Og=Object.freeze([{key:"ledDiameter",min:20,max:80,step:.1,unit:"mm"},{key:"ledThickness",min:2,max:30,step:.1,unit:"mm"},{key:"clearance",min:0,max:2,step:.1,unit:"mm"},{key:"cordDiameter",min:0,max:18,step:.5,unit:"mm"},{key:"cordHeight",min:1,max:24,step:.1,unit:"mm"},{key:"cordAngle",min:0,max:360,step:1,unit:"\xB0"}]),Bg=Object.freeze([{id:"tealight",label:"40 mm tea light",ledDiameter:40,ledThickness:10,cordHeight:5},{id:"puck23",label:"2.3 in puck",ledDiameter:58.4,ledThickness:7.6,cordHeight:3.8},{id:"puck275",label:"2.75 in puck",ledDiameter:70,ledThickness:15,cordHeight:6}]);var zg=Object.freeze({bankL:143,bankW:68,bankH:16,bankR:8,clearXY:.4,clearZ:.35,taper:.4,sleeveLen:72,wall:2.2,wrapStick:7,wrapLane:17,wrapGap:12,wrapFlange:2.2,wrapInset:6,slotOn:0,slotH:9,cordD:3.6,clipOn:1});var Kn=25.4;var Kg=[{id:"4x6",name:"4 \xD7 6 in",w:4*Kn,h:6*Kn},{id:"5x7",name:"5 \xD7 7 in",w:5*Kn,h:7*Kn},{id:"8x10",name:"8 \xD7 10 in",w:8*Kn,h:10*Kn},{id:"wallet",name:"Wallet 2.5 \xD7 3.5 in",w:2.5*Kn,h:3.5*Kn}];var jn=25.4;var t5=[{id:"4x6",name:"4 \xD7 6 in",w:4*jn,h:6*jn},{id:"5x7",name:"5 \xD7 7 in",w:5*jn,h:7*jn},{id:"8x10",name:"8 \xD7 10 in",w:8*jn,h:10*jn},{id:"wallet",name:"Wallet 2.5 \xD7 3.5 in",w:2.5*jn,h:3.5*jn}];var su=[[[11.309,40.129],[11.361,40.147],[11.412,40.169],[11.461,40.193],[11.509,40.22],[11.555,40.25],[11.599,40.282],[11.641,40.318],[11.681,40.356],[11.718,40.396],[11.752,40.439],[11.784,40.484],[11.813,40.531],[11.839,40.579],[11.864,40.628],[11.886,40.679],[11.907,40.729],[11.926,40.781],[11.944,40.833],[11.961,40.885],[11.977,40.938],[11.991,40.991],[12.004,41.044],[12.016,41.098],[12.026,41.152],[12.034,41.206],[12.04,41.261],[12.045,41.316],[12.049,41.371],[12.051,41.426],[12.051,41.481],[12.05,41.535],[12.048,41.59],[12.044,41.645],[12.039,41.7],[12.034,41.755],[12.028,41.809],[12.021,41.864],[12.014,41.918],[12.008,41.973],[12.001,42.028],[11.995,42.082],[11.989,42.137],[11.984,42.192],[11.979,42.246],[11.973,42.301],[11.967,42.356],[11.961,42.41],[11.953,42.465],[11.945,42.519],[11.936,42.573],[11.925,42.627],[11.913,42.681],[11.9,42.734],[11.886,42.787],[11.87,42.84],[11.853,42.892],[11.834,42.944],[11.812,42.994],[11.787,43.043],[11.759,43.09],[11.728,43.135],[11.692,43.177],[11.653,43.216],[11.61,43.25],[11.564,43.28],[11.516,43.306],[11.465,43.329],[11.414,43.348],[11.362,43.365],[11.309,43.379],[11.255,43.392],[11.201,43.403],[11.147,43.413],[11.093,43.422],[11.039,43.43],[10.984,43.438],[10.93,43.447],[10.876,43.455],[10.821,43.464],[10.767,43.473],[10.713,43.482],[10.659,43.492],[10.605,43.502],[10.551,43.512],[10.497,43.522],[10.443,43.532],[10.389,43.541],[10.334,43.55],[10.28,43.559],[10.226,43.566],[10.171,43.573],[10.116,43.579],[10.062,43.584],[10.007,43.588],[9.952,43.592],[9.897,43.595],[9.842,43.599],[9.787,43.602],[9.733,43.606],[9.678,43.61],[9.623,43.615],[9.568,43.621],[9.514,43.627],[9.459,43.634],[9.405,43.64],[9.35,43.647],[9.295,43.653],[9.241,43.659],[9.186,43.664],[9.131,43.668],[9.076,43.671],[9.021,43.673],[8.966,43.675],[8.912,43.676],[8.857,43.677],[8.802,43.678],[8.747,43.678],[8.692,43.679],[8.637,43.679],[8.582,43.679],[8.527,43.679],[8.472,43.679],[8.417,43.679],[8.362,43.679],[8.307,43.679],[8.252,43.679],[8.197,43.679],[8.142,43.679],[8.087,43.679],[8.032,43.679],[7.977,43.679],[7.922,43.679],[7.867,43.679],[7.812,43.679],[7.757,43.679],[7.702,43.679],[7.647,43.679],[7.592,43.679],[7.537,43.679],[7.482,43.679],[7.427,43.679],[7.372,43.679],[7.318,43.679],[7.263,43.679],[7.208,43.679],[7.153,43.679],[7.098,43.678],[7.043,43.678],[6.988,43.677],[6.933,43.676],[6.878,43.673],[6.823,43.67],[6.768,43.665],[6.714,43.657],[6.66,43.645],[6.608,43.629],[6.558,43.605],[6.515,43.572],[6.481,43.529],[6.459,43.478],[6.45,43.424],[6.451,43.37],[6.462,43.316],[6.48,43.264],[6.504,43.214],[6.533,43.168],[6.568,43.126],[6.607,43.087],[6.651,43.053],[6.697,43.024],[6.746,42.999],[6.797,42.978],[6.849,42.961],[6.902,42.946],[6.955,42.933],[7.009,42.921],[7.063,42.911],[7.117,42.902],[7.172,42.893],[7.226,42.886],[7.281,42.879],[7.335,42.874],[7.39,42.869],[7.445,42.865],[7.5,42.862],[7.555,42.86],[7.61,42.859],[7.665,42.857],[7.72,42.857],[7.775,42.856],[7.83,42.856],[7.884,42.855],[7.939,42.855],[7.994,42.854],[8.049,42.853],[8.104,42.851],[8.159,42.848],[8.214,42.844],[8.269,42.838],[8.323,42.829],[8.377,42.817],[8.429,42.801],[8.48,42.78],[8.527,42.752],[8.57,42.718],[8.609,42.679],[8.642,42.635],[8.669,42.588],[8.693,42.538],[8.712,42.487],[8.729,42.434],[8.744,42.381],[8.758,42.328],[8.771,42.275],[8.785,42.221],[8.798,42.168],[8.813,42.115],[8.829,42.063],[8.846,42.011],[8.865,41.959],[8.886,41.908],[8.908,41.858],[8.931,41.808],[8.956,41.759],[8.981,41.71],[9.007,41.662],[9.034,41.614],[9.062,41.566],[9.091,41.519],[9.12,41.472],[9.149,41.426],[9.179,41.38],[9.209,41.334],[9.24,41.288],[9.27,41.243],[9.302,41.197],[9.333,41.152],[9.365,41.107],[9.397,41.063],[9.429,41.018],[9.461,40.974],[9.494,40.93],[9.527,40.885],[9.56,40.841],[9.593,40.798],[9.626,40.754],[9.659,40.71],[9.693,40.667],[9.727,40.624],[9.762,40.581],[9.798,40.54],[9.835,40.499],[9.873,40.459],[9.912,40.421],[9.954,40.385],[9.997,40.35],[10.041,40.318],[10.088,40.289],[10.135,40.262],[10.184,40.237],[10.234,40.214],[10.285,40.193],[10.337,40.175],[10.389,40.157],[10.442,40.142],[10.495,40.128],[10.549,40.115],[10.603,40.104],[10.657,40.095],[10.711,40.087],[10.766,40.081],[10.82,40.076],[10.875,40.073],[10.93,40.072],[10.985,40.073],[11.04,40.076],[11.095,40.082],[11.149,40.09],[11.203,40.1],[11.257,40.113]],[[10.847,41.015],[10.793,41.005],[10.738,40.998],[10.683,40.995],[10.629,40.996],[10.574,41],[10.52,41.009],[10.466,41.021],[10.414,41.038],[10.363,41.058],[10.314,41.082],[10.266,41.109],[10.22,41.138],[10.175,41.17],[10.131,41.202],[10.088,41.237],[10.046,41.272],[10.005,41.309],[9.965,41.346],[9.926,41.385],[9.888,41.424],[9.851,41.465],[9.816,41.507],[9.781,41.55],[9.748,41.593],[9.716,41.638],[9.686,41.684],[9.657,41.73],[9.63,41.778],[9.604,41.827],[9.581,41.876],[9.559,41.926],[9.539,41.978],[9.521,42.029],[9.504,42.081],[9.488,42.134],[9.474,42.187],[9.462,42.24],[9.452,42.294],[9.445,42.349],[9.444,42.404],[9.45,42.458],[9.466,42.51],[9.495,42.557],[9.534,42.595],[9.581,42.624],[9.631,42.645],[9.684,42.659],[9.738,42.67],[9.792,42.677],[9.847,42.682],[9.902,42.685],[9.957,42.686],[10.012,42.687],[10.066,42.687],[10.121,42.686],[10.176,42.685],[10.231,42.683],[10.286,42.679],[10.34,42.675],[10.395,42.67],[10.45,42.665],[10.504,42.658],[10.558,42.652],[10.613,42.644],[10.667,42.637],[10.722,42.63],[10.776,42.622],[10.83,42.614],[10.884,42.605],[10.938,42.595],[10.992,42.583],[11.045,42.568],[11.096,42.55],[11.146,42.527],[11.193,42.5],[11.237,42.467],[11.277,42.429],[11.311,42.386],[11.341,42.34],[11.367,42.292],[11.389,42.241],[11.407,42.19],[11.422,42.137],[11.435,42.084],[11.445,42.03],[11.454,41.976],[11.459,41.921],[11.463,41.866],[11.464,41.811],[11.463,41.757],[11.458,41.702],[11.451,41.648],[11.441,41.594],[11.427,41.541],[11.41,41.489],[11.389,41.438],[11.364,41.389],[11.336,41.342],[11.304,41.297],[11.269,41.255],[11.231,41.216],[11.19,41.179],[11.146,41.146],[11.1,41.116],[11.053,41.089],[11.003,41.066],[10.952,41.046],[10.9,41.029]],[[-.025,38.793],[.029,38.802],[.082,38.816],[.135,38.831],[.187,38.848],[.24,38.864],[.292,38.881],[.345,38.896],[.398,38.911],[.451,38.925],[.504,38.939],[.557,38.952],[.61,38.966],[.664,38.979],[.717,38.993],[.77,39.007],[.823,39.022],[.876,39.036],[.929,39.051],[.981,39.066],[1.034,39.082],[1.087,39.097],[1.14,39.112],[1.193,39.127],[1.245,39.142],[1.298,39.157],[1.351,39.172],[1.404,39.187],[1.456,39.203],[1.509,39.219],[1.561,39.235],[1.614,39.251],[1.666,39.267],[1.719,39.284],[1.771,39.3],[1.824,39.316],[1.876,39.332],[1.929,39.348],[1.981,39.363],[2.034,39.378],[2.087,39.394],[2.14,39.409],[2.193,39.424],[2.245,39.439],[2.298,39.455],[2.351,39.47],[2.403,39.486],[2.455,39.503],[2.508,39.52],[2.56,39.538],[2.611,39.557],[2.662,39.578],[2.711,39.601],[2.76,39.628],[2.806,39.657],[2.85,39.69],[2.89,39.728],[2.925,39.769],[2.955,39.815],[2.978,39.865],[2.994,39.918],[3.003,39.972],[3.006,40.027],[3.005,40.081],[3.001,40.136],[2.995,40.191],[2.989,40.245],[2.984,40.3],[2.981,40.355],[2.979,40.41],[2.979,40.465],[2.98,40.52],[2.981,40.574],[2.983,40.629],[2.983,40.684],[2.983,40.739],[2.98,40.794],[2.976,40.849],[2.97,40.903],[2.961,40.957],[2.95,41.011],[2.937,41.065],[2.922,41.117],[2.904,41.169],[2.884,41.22],[2.862,41.271],[2.839,41.32],[2.813,41.369],[2.786,41.417],[2.757,41.464],[2.727,41.51],[2.697,41.555],[2.665,41.6],[2.632,41.644],[2.599,41.688],[2.565,41.731],[2.53,41.773],[2.495,41.815],[2.458,41.856],[2.421,41.897],[2.383,41.937],[2.344,41.975],[2.305,42.013],[2.264,42.05],[2.222,42.085],[2.179,42.12],[2.136,42.153],[2.091,42.185],[2.045,42.215],[1.999,42.244],[1.951,42.272],[1.903,42.298],[1.854,42.323],[1.804,42.346],[1.753,42.367],[1.702,42.388],[1.651,42.407],[1.599,42.425],[1.547,42.442],[1.494,42.458],[1.441,42.472],[1.388,42.487],[1.335,42.5],[1.282,42.512],[1.228,42.524],[1.174,42.535],[1.12,42.546],[1.066,42.556],[1.012,42.565],[.958,42.573],[.903,42.58],[.849,42.586],[.794,42.592],[.739,42.595],[.685,42.598],[.63,42.6],[.575,42.6],[.52,42.599],[.465,42.597],[.41,42.594],[.356,42.589],[.301,42.582],[.247,42.573],[.193,42.563],[.139,42.551],[.086,42.537],[.034,42.521],[-.018,42.502],[-.069,42.482],[-.119,42.461],[-.169,42.437],[-.218,42.412],[-.266,42.385],[-.313,42.356],[-.358,42.326],[-.403,42.294],[-.446,42.261],[-.488,42.225],[-.528,42.187],[-.566,42.147],[-.6,42.105],[-.632,42.06],[-.661,42.013],[-.686,41.964],[-.707,41.914],[-.725,41.862],[-.74,41.809],[-.751,41.755],[-.76,41.701],[-.767,41.647],[-.772,41.592],[-.775,41.537],[-.778,41.482],[-.779,41.427],[-.78,41.373],[-.781,41.318],[-.781,41.263],[-.781,41.208],[-.781,41.153],[-.78,41.098],[-.779,41.043],[-.778,40.988],[-.775,40.933],[-.772,40.879],[-.768,40.824],[-.763,40.769],[-.757,40.715],[-.749,40.66],[-.741,40.606],[-.73,40.552],[-.719,40.498],[-.706,40.445],[-.692,40.392],[-.678,40.339],[-.662,40.286],[-.645,40.234],[-.627,40.182],[-.609,40.13],[-.591,40.079],[-.572,40.027],[-.553,39.975],[-.535,39.924],[-.517,39.872],[-.5,39.82],[-.484,39.767],[-.47,39.714],[-.458,39.66],[-.449,39.606],[-.442,39.552],[-.437,39.497],[-.434,39.442],[-.432,39.387],[-.429,39.332],[-.426,39.278],[-.421,39.223],[-.413,39.169],[-.402,39.115],[-.387,39.062],[-.368,39.011],[-.343,38.962],[-.313,38.916],[-.276,38.875],[-.234,38.84],[-.186,38.813],[-.134,38.797],[-.08,38.79]],[[.89,40.017],[.835,40.011],[.781,40.006],[.726,40.005],[.671,40.006],[.616,40.011],[.562,40.02],[.509,40.033],[.457,40.051],[.407,40.073],[.359,40.1],[.313,40.13],[.271,40.165],[.23,40.202],[.193,40.242],[.158,40.285],[.127,40.329],[.097,40.376],[.071,40.424],[.046,40.473],[.024,40.523],[.004,40.574],[-.014,40.626],[-.03,40.678],[-.044,40.731],[-.056,40.785],[-.065,40.839],[-.073,40.893],[-.077,40.948],[-.079,41.003],[-.079,41.058],[-.076,41.112],[-.071,41.167],[-.064,41.221],[-.054,41.275],[-.041,41.329],[-.023,41.381],[-.002,41.431],[.024,41.479],[.055,41.525],[.09,41.567],[.129,41.605],[.171,41.641],[.215,41.673],[.261,41.703],[.309,41.73],[.358,41.754],[.409,41.775],[.46,41.794],[.513,41.81],[.566,41.823],[.62,41.834],[.674,41.843],[.728,41.85],[.783,41.855],[.838,41.858],[.893,41.86],[.947,41.861],[1.002,41.861],[1.057,41.859],[1.112,41.856],[1.167,41.852],[1.221,41.846],[1.275,41.839],[1.33,41.83],[1.383,41.819],[1.437,41.806],[1.489,41.792],[1.542,41.774],[1.593,41.755],[1.643,41.734],[1.693,41.71],[1.741,41.684],[1.788,41.656],[1.834,41.625],[1.878,41.592],[1.92,41.558],[1.961,41.521],[2,41.483],[2.038,41.443],[2.074,41.401],[2.108,41.359],[2.141,41.315],[2.172,41.27],[2.202,41.224],[2.231,41.177],[2.258,41.129],[2.283,41.08],[2.306,41.03],[2.326,40.979],[2.343,40.927],[2.355,40.874],[2.363,40.82],[2.364,40.765],[2.358,40.71],[2.345,40.657],[2.325,40.606],[2.298,40.558],[2.265,40.514],[2.228,40.475],[2.186,40.439],[2.142,40.407],[2.095,40.378],[2.047,40.352],[1.997,40.329],[1.946,40.308],[1.895,40.288],[1.843,40.27],[1.791,40.253],[1.739,40.237],[1.686,40.221],[1.633,40.206],[1.581,40.191],[1.528,40.176],[1.475,40.16],[1.423,40.145],[1.37,40.13],[1.317,40.115],[1.264,40.101],[1.211,40.086],[1.158,40.073],[1.105,40.06],[1.051,40.047],[.998,40.036],[.944,40.026]],[[-6.465,38.7],[-6.41,38.708],[-6.356,38.717],[-6.302,38.726],[-6.248,38.736],[-6.193,38.746],[-6.139,38.757],[-6.086,38.768],[-6.032,38.781],[-5.979,38.795],[-5.926,38.81],[-5.873,38.827],[-5.821,38.846],[-5.77,38.865],[-5.719,38.886],[-5.668,38.908],[-5.618,38.93],[-5.568,38.952],[-5.517,38.973],[-5.465,38.992],[-5.412,39.008],[-5.358,39.019],[-5.304,39.024],[-5.249,39.022],[-5.194,39.013],[-5.141,38.999],[-5.089,38.981],[-5.038,38.96],[-4.988,38.938],[-4.938,38.915],[-4.888,38.892],[-4.837,38.87],[-4.786,38.849],[-4.734,38.831],[-4.682,38.814],[-4.628,38.8],[-4.574,38.789],[-4.52,38.781],[-4.465,38.776],[-4.41,38.774],[-4.355,38.776],[-4.3,38.781],[-4.246,38.789],[-4.192,38.801],[-4.139,38.817],[-4.088,38.836],[-4.038,38.859],[-3.99,38.885],[-3.944,38.916],[-3.9,38.95],[-3.86,38.988],[-3.823,39.028],[-3.789,39.071],[-3.758,39.117],[-3.729,39.164],[-3.703,39.212],[-3.679,39.262],[-3.656,39.312],[-3.635,39.363],[-3.615,39.414],[-3.597,39.466],[-3.58,39.519],[-3.564,39.571],[-3.55,39.625],[-3.538,39.678],[-3.527,39.732],[-3.518,39.787],[-3.51,39.841],[-3.502,39.896],[-3.496,39.95],[-3.49,40.005],[-3.484,40.06],[-3.479,40.115],[-3.475,40.17],[-3.472,40.225],[-3.469,40.28],[-3.469,40.335],[-3.47,40.39],[-3.472,40.445],[-3.476,40.5],[-3.481,40.554],[-3.488,40.609],[-3.495,40.664],[-3.503,40.718],[-3.512,40.773],[-3.522,40.827],[-3.532,40.881],[-3.544,40.935],[-3.556,40.988],[-3.57,41.042],[-3.585,41.095],[-3.602,41.147],[-3.622,41.199],[-3.643,41.249],[-3.667,41.299],[-3.694,41.347],[-3.724,41.393],[-3.757,41.437],[-3.793,41.479],[-3.832,41.518],[-3.873,41.555],[-3.916,41.589],[-3.961,41.621],[-4.007,41.65],[-4.055,41.678],[-4.103,41.704],[-4.153,41.728],[-4.203,41.751],[-4.254,41.772],[-4.305,41.791],[-4.358,41.808],[-4.411,41.824],[-4.464,41.838],[-4.517,41.851],[-4.571,41.862],[-4.625,41.873],[-4.679,41.883],[-4.734,41.892],[-4.788,41.901],[-4.842,41.909],[-4.897,41.917],[-4.952,41.924],[-5.006,41.93],[-5.061,41.935],[-5.116,41.939],[-5.171,41.942],[-5.226,41.944],[-5.281,41.946],[-5.336,41.948],[-5.391,41.948],[-5.446,41.949],[-5.501,41.95],[-5.556,41.95],[-5.612,41.951],[-5.667,41.952],[-5.722,41.953],[-5.777,41.954],[-5.832,41.956],[-5.887,41.959],[-5.942,41.963],[-5.997,41.967],[-6.051,41.972],[-6.106,41.978],[-6.161,41.984],[-6.216,41.991],[-6.27,41.998],[-6.325,42.004],[-6.38,42.01],[-6.434,42.015],[-6.489,42.02],[-6.544,42.024],[-6.599,42.028],[-6.654,42.031],[-6.709,42.035],[-6.764,42.038],[-6.819,42.042],[-6.874,42.046],[-6.929,42.051],[-6.984,42.057],[-7.038,42.063],[-7.093,42.07],[-7.148,42.077],[-7.202,42.084],[-7.257,42.091],[-7.311,42.098],[-7.366,42.105],[-7.421,42.111],[-7.476,42.117],[-7.53,42.124],[-7.585,42.131],[-7.639,42.138],[-7.694,42.145],[-7.749,42.153],[-7.803,42.161],[-7.857,42.17],[-7.912,42.179],[-7.966,42.188],[-8.02,42.197],[-8.075,42.206],[-8.129,42.216],[-8.183,42.226],[-8.237,42.236],[-8.291,42.247],[-8.345,42.257],[-8.399,42.268],[-8.453,42.278],[-8.508,42.286],[-8.563,42.292],[-8.618,42.295],[-8.673,42.293],[-8.727,42.283],[-8.778,42.263],[-8.822,42.23],[-8.857,42.188],[-8.882,42.139],[-8.899,42.086],[-8.911,42.033],[-8.919,41.978],[-8.924,41.923],[-8.928,41.868],[-8.93,41.813],[-8.931,41.758],[-8.932,41.703],[-8.933,41.648],[-8.933,41.593],[-8.933,41.538],[-8.933,41.483],[-8.933,41.428],[-8.933,41.373],[-8.932,41.318],[-8.932,41.263],[-8.93,41.208],[-8.929,41.153],[-8.927,41.098],[-8.924,41.043],[-8.92,40.988],[-8.916,40.933],[-8.91,40.878],[-8.904,40.823],[-8.897,40.769],[-8.889,40.714],[-8.881,40.66],[-8.872,40.605],[-8.863,40.551],[-8.854,40.497],[-8.843,40.443],[-8.833,40.389],[-8.821,40.335],[-8.809,40.281],[-8.795,40.228],[-8.78,40.175],[-8.763,40.122],[-8.746,40.07],[-8.726,40.019],[-8.706,39.968],[-8.684,39.917],[-8.66,39.867],[-8.636,39.818],[-8.61,39.769],[-8.583,39.721],[-8.555,39.674],[-8.526,39.627],[-8.496,39.581],[-8.465,39.535],[-8.434,39.49],[-8.401,39.446],[-8.367,39.402],[-8.332,39.36],[-8.297,39.318],[-8.26,39.276],[-8.223,39.236],[-8.184,39.196],[-8.145,39.158],[-8.105,39.12],[-8.064,39.083],[-8.022,39.047],[-7.979,39.013],[-7.935,38.98],[-7.89,38.948],[-7.845,38.917],[-7.798,38.888],[-7.75,38.861],[-7.702,38.835],[-7.653,38.81],[-7.602,38.787],[-7.552,38.766],[-7.5,38.746],[-7.448,38.729],[-7.395,38.713],[-7.342,38.7],[-7.288,38.69],[-7.233,38.681],[-7.178,38.674],[-7.124,38.669],[-7.069,38.666],[-7.014,38.664],[-6.959,38.663],[-6.904,38.663],[-6.848,38.664],[-6.793,38.666],[-6.738,38.67],[-6.684,38.674],[-6.629,38.679],[-6.574,38.685],[-6.519,38.692]],[[-6.683,39.459],[-6.738,39.454],[-6.793,39.453],[-6.848,39.453],[-6.903,39.456],[-6.958,39.461],[-7.012,39.467],[-7.067,39.474],[-7.121,39.483],[-7.175,39.494],[-7.228,39.506],[-7.281,39.521],[-7.333,39.539],[-7.384,39.56],[-7.433,39.585],[-7.48,39.613],[-7.525,39.645],[-7.567,39.68],[-7.608,39.717],[-7.646,39.756],[-7.682,39.798],[-7.716,39.841],[-7.747,39.886],[-7.777,39.932],[-7.805,39.979],[-7.831,40.028],[-7.856,40.077],[-7.879,40.126],[-7.901,40.177],[-7.921,40.228],[-7.94,40.279],[-7.958,40.331],[-7.975,40.384],[-7.992,40.436],[-8.007,40.489],[-8.022,40.542],[-8.036,40.595],[-8.05,40.648],[-8.063,40.701],[-8.076,40.755],[-8.088,40.808],[-8.098,40.862],[-8.107,40.916],[-8.113,40.971],[-8.116,41.026],[-8.114,41.081],[-8.104,41.135],[-8.084,41.186],[-8.052,41.23],[-8.009,41.264],[-7.959,41.286],[-7.905,41.299],[-7.851,41.305],[-7.796,41.307],[-7.741,41.306],[-7.686,41.303],[-7.631,41.299],[-7.577,41.294],[-7.522,41.288],[-7.467,41.283],[-7.413,41.277],[-7.358,41.27],[-7.304,41.263],[-7.249,41.256],[-7.195,41.248],[-7.141,41.24],[-7.086,41.233],[-7.032,41.225],[-6.977,41.217],[-6.923,41.21],[-6.869,41.202],[-6.814,41.194],[-6.76,41.186],[-6.706,41.178],[-6.651,41.169],[-6.597,41.159],[-6.543,41.149],[-6.49,41.137],[-6.436,41.125],[-6.383,41.11],[-6.331,41.092],[-6.281,41.071],[-6.232,41.045],[-6.187,41.015],[-6.145,40.979],[-6.109,40.938],[-6.078,40.893],[-6.052,40.844],[-6.031,40.793],[-6.015,40.741],[-6.002,40.687],[-5.993,40.633],[-5.986,40.579],[-5.982,40.524],[-5.98,40.469],[-5.979,40.414],[-5.98,40.359],[-5.983,40.304],[-5.987,40.25],[-5.994,40.195],[-6.003,40.141],[-6.014,40.087],[-6.027,40.034],[-6.043,39.981],[-6.062,39.93],[-6.084,39.88],[-6.109,39.831],[-6.137,39.783],[-6.168,39.738],[-6.203,39.695],[-6.24,39.655],[-6.281,39.618],[-6.325,39.585],[-6.371,39.556],[-6.42,39.53],[-6.47,39.509],[-6.522,39.491],[-6.575,39.477],[-6.629,39.466]],[[-4.412,39.839],[-4.466,39.83],[-4.52,39.832],[-4.574,39.843],[-4.625,39.861],[-4.675,39.885],[-4.722,39.912],[-4.768,39.942],[-4.811,39.975],[-4.853,40.01],[-4.893,40.047],[-4.932,40.086],[-4.969,40.126],[-5.005,40.167],[-5.039,40.21],[-5.072,40.254],[-5.104,40.298],[-5.135,40.343],[-5.164,40.389],[-5.193,40.436],[-5.221,40.483],[-5.247,40.531],[-5.272,40.579],[-5.296,40.629],[-5.317,40.679],[-5.336,40.73],[-5.351,40.783],[-5.36,40.837],[-5.36,40.891],[-5.349,40.945],[-5.323,40.993],[-5.284,41.031],[-5.237,41.059],[-5.186,41.078],[-5.133,41.091],[-5.079,41.098],[-5.024,41.1],[-4.97,41.099],[-4.915,41.095],[-4.861,41.087],[-4.807,41.077],[-4.754,41.063],[-4.702,41.047],[-4.651,41.027],[-4.602,41.004],[-4.553,40.978],[-4.507,40.949],[-4.463,40.917],[-4.422,40.881],[-4.383,40.842],[-4.347,40.801],[-4.315,40.757],[-4.286,40.711],[-4.26,40.663],[-4.238,40.612],[-4.22,40.561],[-4.205,40.508],[-4.194,40.455],[-4.186,40.401],[-4.181,40.346],[-4.179,40.292],[-4.18,40.237],[-4.185,40.183],[-4.193,40.129],[-4.206,40.075],[-4.224,40.024],[-4.248,39.975],[-4.278,39.929],[-4.316,39.89],[-4.361,39.859]],[[12.078,38.305],[12.112,38.348],[12.135,38.397],[12.148,38.451],[12.152,38.505],[12.147,38.56],[12.135,38.614],[12.118,38.666],[12.095,38.716],[12.069,38.764],[12.04,38.81],[12.007,38.855],[11.972,38.897],[11.935,38.937],[11.895,38.975],[11.854,39.012],[11.811,39.046],[11.767,39.078],[11.721,39.109],[11.674,39.137],[11.627,39.164],[11.578,39.19],[11.529,39.214],[11.479,39.237],[11.428,39.258],[11.378,39.28],[11.327,39.3],[11.276,39.321],[11.225,39.342],[11.174,39.363],[11.124,39.385],[11.073,39.407],[11.023,39.429],[10.974,39.452],[10.924,39.476],[10.875,39.5],[10.826,39.525],[10.777,39.549],[10.728,39.575],[10.679,39.6],[10.631,39.626],[10.582,39.652],[10.534,39.678],[10.486,39.704],[10.437,39.73],[10.389,39.757],[10.341,39.783],[10.293,39.809],[10.244,39.835],[10.196,39.861],[10.148,39.888],[10.1,39.914],[10.052,39.941],[10.004,39.968],[9.956,39.995],[9.908,40.022],[9.86,40.048],[9.812,40.075],[9.764,40.101],[9.715,40.126],[9.666,40.151],[9.617,40.175],[9.567,40.198],[9.516,40.22],[9.466,40.241],[9.415,40.262],[9.364,40.282],[9.313,40.302],[9.262,40.322],[9.21,40.342],[9.159,40.362],[9.108,40.381],[9.057,40.401],[9.005,40.421],[8.954,40.44],[8.902,40.459],[8.851,40.478],[8.799,40.496],[8.747,40.514],[8.695,40.532],[8.643,40.55],[8.591,40.567],[8.539,40.584],[8.487,40.601],[8.434,40.618],[8.382,40.634],[8.33,40.65],[8.277,40.666],[8.224,40.682],[8.171,40.697],[8.119,40.712],[8.066,40.727],[8.013,40.742],[7.96,40.756],[7.907,40.771],[7.854,40.785],[7.801,40.798],[7.747,40.81],[7.693,40.82],[7.639,40.829],[7.584,40.834],[7.529,40.836],[7.474,40.833],[7.42,40.824],[7.367,40.809],[7.317,40.787],[7.271,40.758],[7.229,40.722],[7.191,40.682],[7.158,40.639],[7.128,40.593],[7.101,40.545],[7.076,40.496],[7.053,40.446],[7.031,40.396],[7.009,40.345],[6.988,40.295],[6.967,40.244],[6.947,40.193],[6.926,40.142],[6.906,40.091],[6.885,40.04],[6.865,39.989],[6.844,39.938],[6.824,39.887],[6.803,39.836],[6.783,39.785],[6.762,39.734],[6.742,39.683],[6.721,39.633],[6.7,39.582],[6.679,39.531],[6.659,39.48],[6.638,39.429],[6.617,39.378],[6.597,39.327],[6.578,39.276],[6.56,39.224],[6.543,39.172],[6.529,39.119],[6.518,39.065],[6.509,39.011],[6.505,38.956],[6.504,38.901],[6.507,38.846],[6.514,38.792],[6.526,38.738],[6.542,38.686],[6.562,38.634],[6.586,38.585],[6.613,38.538],[6.644,38.492],[6.679,38.45],[6.717,38.411],[6.76,38.376],[6.807,38.348],[6.86,38.332],[6.914,38.334],[6.964,38.357],[7.006,38.392],[7.041,38.434],[7.072,38.48],[7.1,38.527],[7.127,38.575],[7.153,38.623],[7.178,38.672],[7.203,38.721],[7.229,38.769],[7.254,38.818],[7.278,38.867],[7.303,38.916],[7.326,38.966],[7.35,39.016],[7.372,39.066],[7.394,39.116],[7.416,39.166],[7.438,39.217],[7.46,39.267],[7.483,39.317],[7.506,39.367],[7.53,39.416],[7.556,39.465],[7.582,39.513],[7.611,39.56],[7.641,39.605],[7.675,39.649],[7.713,39.689],[7.754,39.724],[7.801,39.754],[7.851,39.775],[7.904,39.789],[7.959,39.794],[8.014,39.793],[8.068,39.787],[8.122,39.777],[8.176,39.765],[8.229,39.751],[8.282,39.735],[8.334,39.719],[8.386,39.702],[8.439,39.685],[8.491,39.668],[8.543,39.65],[8.595,39.633],[8.647,39.615],[8.698,39.597],[8.75,39.578],[8.802,39.56],[8.853,39.541],[8.905,39.521],[8.956,39.502],[9.007,39.482],[9.058,39.462],[9.11,39.442],[9.161,39.422],[9.212,39.401],[9.263,39.381],[9.314,39.361],[9.365,39.34],[9.416,39.32],[9.466,39.299],[9.517,39.279],[9.568,39.258],[9.619,39.237],[9.67,39.216],[9.721,39.195],[9.771,39.174],[9.822,39.152],[9.872,39.131],[9.923,39.109],[9.973,39.087],[10.023,39.065],[10.074,39.043],[10.124,39.022],[10.175,39],[10.225,38.979],[10.276,38.957],[10.326,38.935],[10.376,38.913],[10.427,38.891],[10.476,38.868],[10.526,38.844],[10.576,38.821],[10.625,38.797],[10.675,38.773],[10.724,38.749],[10.773,38.724],[10.822,38.7],[10.871,38.675],[10.921,38.651],[10.97,38.626],[11.019,38.602],[11.068,38.577],[11.117,38.553],[11.166,38.528],[11.215,38.504],[11.264,38.479],[11.314,38.455],[11.363,38.43],[11.412,38.406],[11.462,38.382],[11.511,38.359],[11.561,38.336],[11.611,38.314],[11.662,38.293],[11.714,38.275],[11.767,38.259],[11.82,38.247],[11.875,38.24],[11.93,38.241],[11.983,38.251],[12.034,38.272]],[[4.323,35.766],[4.369,35.795],[4.41,35.833],[4.444,35.876],[4.473,35.923],[4.498,35.972],[4.519,36.023],[4.537,36.075],[4.552,36.128],[4.565,36.182],[4.576,36.236],[4.584,36.29],[4.59,36.345],[4.594,36.4],[4.596,36.455],[4.594,36.51],[4.591,36.565],[4.584,36.62],[4.575,36.674],[4.564,36.728],[4.551,36.781],[4.536,36.834],[4.519,36.887],[4.5,36.939],[4.48,36.99],[4.458,37.041],[4.435,37.091],[4.411,37.14],[4.385,37.189],[4.358,37.236],[4.328,37.283],[4.297,37.329],[4.264,37.373],[4.229,37.415],[4.192,37.456],[4.153,37.495],[4.113,37.532],[4.07,37.568],[4.027,37.601],[3.982,37.633],[3.936,37.664],[3.889,37.693],[3.842,37.721],[3.793,37.747],[3.745,37.773],[3.696,37.799],[3.647,37.824],[3.598,37.849],[3.55,37.876],[3.502,37.904],[3.456,37.934],[3.412,37.966],[3.37,38.002],[3.331,38.041],[3.295,38.083],[3.264,38.128],[3.235,38.176],[3.21,38.225],[3.188,38.275],[3.167,38.326],[3.147,38.377],[3.127,38.429],[3.106,38.48],[3.084,38.53],[3.061,38.58],[3.035,38.629],[3.006,38.676],[2.974,38.72],[2.938,38.762],[2.897,38.799],[2.85,38.827],[2.797,38.842],[2.743,38.836],[2.696,38.808],[2.658,38.768],[2.629,38.721],[2.604,38.672],[2.583,38.621],[2.562,38.57],[2.541,38.519],[2.518,38.469],[2.492,38.421],[2.462,38.374],[2.427,38.332],[2.386,38.294],[2.341,38.264],[2.291,38.24],[2.238,38.224],[2.184,38.215],[2.129,38.211],[2.074,38.211],[2.019,38.214],[1.964,38.219],[1.909,38.225],[1.855,38.233],[1.8,38.241],[1.746,38.249],[1.691,38.258],[1.637,38.266],[1.582,38.275],[1.528,38.283],[1.473,38.291],[1.419,38.298],[1.364,38.305],[1.309,38.311],[1.255,38.317],[1.2,38.323],[1.145,38.328],[1.09,38.333],[1.035,38.338],[.98,38.344],[.926,38.35],[.871,38.357],[.816,38.364],[.762,38.37],[.707,38.377],[.652,38.382],[.597,38.387],[.542,38.39],[.487,38.391],[.432,38.39],[.377,38.387],[.322,38.38],[.268,38.368],[.216,38.351],[.166,38.328],[.122,38.296],[.084,38.255],[.058,38.207],[.043,38.154],[.04,38.099],[.047,38.045],[.062,37.992],[.085,37.941],[.113,37.894],[.146,37.85],[.184,37.81],[.226,37.774],[.27,37.742],[.318,37.713],[.367,37.689],[.418,37.667],[.47,37.649],[.522,37.633],[.576,37.62],[.63,37.608],[.684,37.598],[.738,37.589],[.793,37.58],[.847,37.572],[.901,37.563],[.956,37.555],[1.01,37.547],[1.065,37.538],[1.119,37.529],[1.174,37.52],[1.228,37.511],[1.282,37.503],[1.337,37.494],[1.391,37.485],[1.445,37.475],[1.5,37.466],[1.554,37.457],[1.608,37.447],[1.662,37.436],[1.716,37.426],[1.77,37.414],[1.824,37.4],[1.876,37.384],[1.928,37.366],[1.979,37.344],[2.027,37.317],[2.072,37.285],[2.113,37.248],[2.148,37.206],[2.178,37.16],[2.202,37.11],[2.221,37.059],[2.236,37.006],[2.248,36.952],[2.258,36.898],[2.268,36.843],[2.277,36.789],[2.287,36.735],[2.299,36.681],[2.312,36.628],[2.329,36.575],[2.349,36.524],[2.372,36.474],[2.4,36.426],[2.431,36.381],[2.467,36.339],[2.507,36.302],[2.553,36.271],[2.604,36.25],[2.658,36.244],[2.712,36.257],[2.758,36.286],[2.797,36.325],[2.829,36.37],[2.857,36.417],[2.881,36.467],[2.903,36.517],[2.924,36.568],[2.944,36.62],[2.964,36.671],[2.985,36.722],[3.007,36.773],[3.03,36.822],[3.056,36.871],[3.086,36.917],[3.12,36.961],[3.159,36.999],[3.204,37.03],[3.255,37.051],[3.31,37.06],[3.365,37.058],[3.419,37.048],[3.471,37.031],[3.521,37.008],[3.57,36.982],[3.616,36.953],[3.661,36.92],[3.703,36.885],[3.744,36.847],[3.781,36.807],[3.815,36.764],[3.845,36.718],[3.871,36.669],[3.891,36.618],[3.905,36.564],[3.913,36.51],[3.916,36.455],[3.916,36.4],[3.915,36.345],[3.914,36.29],[3.914,36.235],[3.918,36.18],[3.927,36.125],[3.94,36.072],[3.958,36.02],[3.981,35.97],[4.008,35.922],[4.04,35.876],[4.076,35.835],[4.117,35.798],[4.163,35.769],[4.215,35.752],[4.27,35.75]],[[-4.618,34.935],[-4.581,34.976],[-4.553,35.023],[-4.533,35.074],[-4.519,35.127],[-4.508,35.181],[-4.501,35.236],[-4.496,35.29],[-4.493,35.345],[-4.491,35.4],[-4.489,35.455],[-4.488,35.51],[-4.488,35.565],[-4.487,35.62],[-4.487,35.675],[-4.486,35.73],[-4.485,35.785],[-4.484,35.84],[-4.483,35.895],[-4.48,35.95],[-4.477,36.005],[-4.472,36.059],[-4.467,36.114],[-4.459,36.169],[-4.451,36.223],[-4.44,36.277],[-4.429,36.331],[-4.417,36.384],[-4.404,36.438],[-4.391,36.491],[-4.379,36.545],[-4.368,36.599],[-4.359,36.653],[-4.351,36.707],[-4.346,36.762],[-4.343,36.817],[-4.343,36.872],[-4.345,36.927],[-4.351,36.981],[-4.36,37.036],[-4.374,37.089],[-4.392,37.141],[-4.415,37.191],[-4.443,37.238],[-4.477,37.281],[-4.515,37.321],[-4.557,37.356],[-4.603,37.387],[-4.651,37.413],[-4.701,37.436],[-4.752,37.456],[-4.805,37.473],[-4.857,37.487],[-4.911,37.5],[-4.965,37.512],[-5.018,37.524],[-5.072,37.535],[-5.126,37.547],[-5.179,37.559],[-5.233,37.571],[-5.286,37.584],[-5.34,37.598],[-5.393,37.612],[-5.446,37.627],[-5.499,37.642],[-5.551,37.657],[-5.604,37.673],[-5.656,37.69],[-5.709,37.706],[-5.761,37.723],[-5.813,37.74],[-5.866,37.757],[-5.918,37.774],[-5.97,37.791],[-6.023,37.808],[-6.075,37.825],[-6.127,37.841],[-6.18,37.857],[-6.233,37.873],[-6.285,37.89],[-6.338,37.906],[-6.39,37.922],[-6.443,37.938],[-6.495,37.954],[-6.548,37.97],[-6.6,37.987],[-6.653,38.003],[-6.706,38.018],[-6.758,38.034],[-6.811,38.048],[-6.865,38.062],[-6.918,38.076],[-6.971,38.089],[-7.025,38.102],[-7.078,38.115],[-7.132,38.127],[-7.185,38.14],[-7.238,38.154],[-7.292,38.167],[-7.345,38.181],[-7.398,38.196],[-7.451,38.211],[-7.503,38.226],[-7.556,38.242],[-7.609,38.258],[-7.661,38.274],[-7.714,38.291],[-7.766,38.307],[-7.819,38.323],[-7.871,38.339],[-7.924,38.354],[-7.977,38.369],[-8.03,38.384],[-8.083,38.397],[-8.137,38.41],[-8.191,38.422],[-8.245,38.432],[-8.299,38.441],[-8.353,38.447],[-8.408,38.45],[-8.463,38.45],[-8.518,38.446],[-8.572,38.435],[-8.624,38.418],[-8.674,38.394],[-8.719,38.363],[-8.759,38.325],[-8.793,38.283],[-8.824,38.237],[-8.85,38.189],[-8.873,38.139],[-8.894,38.088],[-8.913,38.036],[-8.931,37.984],[-8.947,37.932],[-8.962,37.879],[-8.976,37.826],[-8.989,37.772],[-9.001,37.719],[-9.012,37.665],[-9.022,37.611],[-9.032,37.557],[-9.042,37.503],[-9.051,37.448],[-9.06,37.394],[-9.069,37.34],[-9.078,37.286],[-9.087,37.231],[-9.096,37.177],[-9.105,37.123],[-9.116,37.069],[-9.127,37.015],[-9.138,36.962],[-9.15,36.908],[-9.162,36.854],[-9.174,36.8],[-9.184,36.746],[-9.191,36.692],[-9.195,36.637],[-9.194,36.582],[-9.188,36.528],[-9.176,36.474],[-9.158,36.422],[-9.133,36.373],[-9.103,36.328],[-9.066,36.286],[-9.024,36.251],[-8.977,36.223],[-8.926,36.204],[-8.871,36.196],[-8.817,36.2],[-8.764,36.215],[-8.716,36.242],[-8.674,36.277],[-8.638,36.319],[-8.607,36.364],[-8.58,36.412],[-8.557,36.462],[-8.537,36.513],[-8.52,36.565],[-8.504,36.618],[-8.489,36.671],[-8.475,36.724],[-8.46,36.777],[-8.446,36.83],[-8.431,36.883],[-8.414,36.935],[-8.395,36.987],[-8.373,37.037],[-8.347,37.086],[-8.316,37.131],[-8.28,37.172],[-8.238,37.208],[-8.191,37.236],[-8.14,37.258],[-8.087,37.271],[-8.033,37.279],[-7.978,37.281],[-7.923,37.28],[-7.868,37.276],[-7.813,37.27],[-7.759,37.263],[-7.705,37.255],[-7.65,37.245],[-7.596,37.235],[-7.543,37.224],[-7.489,37.211],[-7.436,37.196],[-7.384,37.179],[-7.333,37.158],[-7.284,37.133],[-7.239,37.102],[-7.199,37.064],[-7.167,37.02],[-7.144,36.97],[-7.131,36.916],[-7.124,36.862],[-7.123,36.807],[-7.124,36.752],[-7.128,36.697],[-7.132,36.642],[-7.136,36.587],[-7.139,36.532],[-7.14,36.478],[-7.141,36.423],[-7.139,36.368],[-7.135,36.313],[-7.129,36.258],[-7.122,36.204],[-7.112,36.15],[-7.101,36.096],[-7.087,36.043],[-7.071,35.99],[-7.052,35.938],[-7.029,35.889],[-7.001,35.841],[-6.968,35.797],[-6.928,35.76],[-6.881,35.731],[-6.829,35.715],[-6.774,35.712],[-6.72,35.721],[-6.669,35.742],[-6.623,35.771],[-6.581,35.807],[-6.545,35.848],[-6.513,35.893],[-6.487,35.941],[-6.464,35.992],[-6.446,36.043],[-6.43,36.096],[-6.418,36.15],[-6.407,36.204],[-6.399,36.258],[-6.392,36.312],[-6.385,36.367],[-6.379,36.422],[-6.372,36.476],[-6.363,36.53],[-6.352,36.584],[-6.337,36.637],[-6.317,36.688],[-6.29,36.736],[-6.255,36.779],[-6.213,36.814],[-6.165,36.839],[-6.112,36.856],[-6.058,36.865],[-6.003,36.868],[-5.948,36.866],[-5.894,36.861],[-5.839,36.854],[-5.785,36.843],[-5.732,36.83],[-5.679,36.815],[-5.628,36.796],[-5.578,36.772],[-5.531,36.744],[-5.487,36.711],[-5.448,36.673],[-5.413,36.63],[-5.384,36.583],[-5.36,36.534],[-5.341,36.482],[-5.325,36.429],[-5.313,36.376],[-5.303,36.322],[-5.295,36.267],[-5.289,36.213],[-5.283,36.158],[-5.278,36.103],[-5.274,36.049],[-5.269,35.994],[-5.264,35.939],[-5.259,35.884],[-5.254,35.83],[-5.249,35.775],[-5.245,35.72],[-5.24,35.665],[-5.235,35.611],[-5.229,35.556],[-5.223,35.501],[-5.216,35.447],[-5.207,35.392],[-5.196,35.339],[-5.182,35.286],[-5.164,35.233],[-5.143,35.183],[-5.117,35.134],[-5.087,35.088],[-5.052,35.046],[-5.014,35.006],[-4.972,34.971],[-4.926,34.94],[-4.877,34.915],[-4.826,34.897],[-4.772,34.888],[-4.717,34.89],[-4.664,34.906]],[[9.732,35.055],[9.78,35.082],[9.825,35.112],[9.869,35.146],[9.911,35.181],[9.951,35.219],[9.989,35.258],[10.026,35.299],[10.062,35.341],[10.097,35.383],[10.131,35.426],[10.164,35.469],[10.197,35.514],[10.229,35.559],[10.259,35.604],[10.287,35.651],[10.314,35.699],[10.339,35.748],[10.361,35.798],[10.381,35.85],[10.398,35.902],[10.414,35.954],[10.428,36.007],[10.44,36.061],[10.45,36.115],[10.459,36.169],[10.466,36.224],[10.472,36.278],[10.476,36.333],[10.478,36.388],[10.478,36.443],[10.476,36.498],[10.472,36.552],[10.466,36.607],[10.458,36.661],[10.447,36.715],[10.435,36.769],[10.421,36.822],[10.405,36.874],[10.387,36.926],[10.368,36.978],[10.347,37.028],[10.325,37.079],[10.301,37.128],[10.276,37.177],[10.251,37.226],[10.224,37.273],[10.195,37.321],[10.166,37.367],[10.136,37.413],[10.105,37.458],[10.073,37.503],[10.04,37.547],[10.006,37.59],[9.971,37.632],[9.935,37.673],[9.897,37.714],[9.859,37.753],[9.819,37.791],[9.779,37.828],[9.737,37.864],[9.694,37.898],[9.651,37.931],[9.606,37.963],[9.56,37.993],[9.513,38.022],[9.466,38.05],[9.418,38.077],[9.37,38.103],[9.321,38.128],[9.272,38.153],[9.222,38.176],[9.172,38.198],[9.121,38.219],[9.07,38.239],[9.019,38.258],[8.966,38.276],[8.914,38.292],[8.861,38.306],[8.808,38.319],[8.754,38.331],[8.7,38.342],[8.646,38.351],[8.592,38.359],[8.537,38.366],[8.482,38.37],[8.428,38.372],[8.373,38.372],[8.318,38.37],[8.263,38.366],[8.208,38.36],[8.154,38.353],[8.1,38.344],[8.046,38.335],[7.992,38.324],[7.938,38.312],[7.885,38.3],[7.831,38.287],[7.778,38.273],[7.726,38.258],[7.673,38.241],[7.621,38.224],[7.569,38.205],[7.518,38.185],[7.468,38.163],[7.418,38.14],[7.37,38.114],[7.322,38.087],[7.276,38.057],[7.231,38.026],[7.187,37.993],[7.145,37.958],[7.103,37.922],[7.062,37.885],[7.023,37.847],[6.984,37.808],[6.946,37.768],[6.909,37.728],[6.873,37.686],[6.838,37.644],[6.805,37.601],[6.772,37.556],[6.741,37.511],[6.711,37.465],[6.683,37.418],[6.656,37.37],[6.63,37.321],[6.606,37.272],[6.584,37.222],[6.563,37.171],[6.544,37.12],[6.526,37.068],[6.51,37.015],[6.496,36.962],[6.484,36.909],[6.473,36.855],[6.463,36.801],[6.455,36.747],[6.448,36.692],[6.442,36.637],[6.438,36.583],[6.436,36.528],[6.436,36.473],[6.439,36.418],[6.443,36.363],[6.45,36.309],[6.459,36.255],[6.47,36.201],[6.482,36.147],[6.495,36.094],[6.51,36.041],[6.526,35.989],[6.544,35.937],[6.562,35.885],[6.582,35.834],[6.603,35.783],[6.626,35.733],[6.651,35.684],[6.678,35.636],[6.707,35.59],[6.739,35.545],[6.774,35.503],[6.813,35.464],[6.856,35.43],[6.903,35.402],[6.955,35.383],[7.009,35.379],[7.061,35.395],[7.101,35.432],[7.126,35.481],[7.138,35.534],[7.142,35.589],[7.14,35.644],[7.136,35.699],[7.129,35.753],[7.122,35.808],[7.113,35.862],[7.105,35.916],[7.097,35.97],[7.09,36.025],[7.084,36.079],[7.079,36.134],[7.077,36.189],[7.076,36.244],[7.077,36.299],[7.081,36.354],[7.086,36.408],[7.092,36.463],[7.1,36.517],[7.109,36.571],[7.118,36.625],[7.129,36.679],[7.142,36.733],[7.156,36.786],[7.172,36.838],[7.191,36.89],[7.212,36.94],[7.236,36.99],[7.263,37.038],[7.292,37.085],[7.323,37.13],[7.356,37.173],[7.391,37.216],[7.427,37.257],[7.465,37.297],[7.504,37.336],[7.544,37.373],[7.585,37.41],[7.627,37.445],[7.67,37.479],[7.714,37.512],[7.76,37.542],[7.806,37.571],[7.855,37.597],[7.904,37.621],[7.955,37.642],[8.007,37.658],[8.061,37.67],[8.116,37.676],[8.17,37.675],[8.225,37.666],[8.277,37.649],[8.325,37.623],[8.367,37.588],[8.404,37.547],[8.434,37.501],[8.457,37.452],[8.476,37.4],[8.489,37.347],[8.499,37.293],[8.507,37.239],[8.512,37.184],[8.515,37.129],[8.518,37.074],[8.519,37.019],[8.52,36.964],[8.521,36.91],[8.521,36.855],[8.521,36.8],[8.522,36.745],[8.522,36.69],[8.522,36.635],[8.522,36.58],[8.522,36.525],[8.522,36.47],[8.522,36.415],[8.522,36.36],[8.522,36.306],[8.522,36.251],[8.522,36.196],[8.522,36.141],[8.522,36.086],[8.523,36.031],[8.523,35.976],[8.524,35.921],[8.526,35.866],[8.528,35.811],[8.532,35.757],[8.537,35.702],[8.544,35.648],[8.554,35.593],[8.566,35.54],[8.583,35.488],[8.603,35.436],[8.627,35.387],[8.655,35.34],[8.686,35.295],[8.722,35.253],[8.76,35.214],[8.801,35.177],[8.845,35.144],[8.89,35.114],[8.938,35.086],[8.987,35.062],[9.038,35.041],[9.09,35.023],[9.143,35.008],[9.196,34.996],[9.25,34.987],[9.305,34.98],[9.36,34.977],[9.415,34.977],[9.469,34.98],[9.524,34.987],[9.578,34.998],[9.631,35.013],[9.682,35.032]],[[9.578,35.96],[9.524,35.95],[9.47,35.957],[9.421,35.982],[9.383,36.022],[9.355,36.069],[9.337,36.121],[9.323,36.175],[9.314,36.229],[9.307,36.283],[9.301,36.338],[9.296,36.393],[9.292,36.448],[9.29,36.503],[9.29,36.558],[9.292,36.613],[9.299,36.668],[9.311,36.722],[9.332,36.773],[9.366,36.815],[9.416,36.837],[9.47,36.83],[9.518,36.804],[9.56,36.769],[9.598,36.728],[9.631,36.684],[9.66,36.637],[9.686,36.588],[9.708,36.538],[9.728,36.487],[9.744,36.434],[9.756,36.38],[9.763,36.326],[9.765,36.271],[9.761,36.216],[9.75,36.162],[9.732,36.11],[9.705,36.062],[9.67,36.019],[9.628,35.984]],[[3.003,33.302],[3.033,33.348],[3.055,33.398],[3.072,33.45],[3.086,33.503],[3.1,33.557],[3.114,33.61],[3.129,33.663],[3.147,33.714],[3.17,33.764],[3.198,33.812],[3.233,33.854],[3.275,33.89],[3.322,33.917],[3.374,33.936],[3.428,33.947],[3.482,33.951],[3.537,33.952],[3.592,33.949],[3.647,33.945],[3.702,33.938],[3.756,33.93],[3.81,33.922],[3.864,33.912],[3.919,33.903],[3.973,33.893],[4.027,33.883],[4.081,33.873],[4.135,33.864],[4.189,33.856],[4.244,33.848],[4.298,33.842],[4.353,33.839],[4.408,33.838],[4.463,33.841],[4.517,33.85],[4.57,33.866],[4.618,33.892],[4.657,33.93],[4.68,33.98],[4.684,34.034],[4.674,34.088],[4.652,34.138],[4.624,34.185],[4.59,34.229],[4.552,34.269],[4.511,34.305],[4.468,34.339],[4.422,34.369],[4.374,34.397],[4.326,34.422],[4.276,34.445],[4.225,34.466],[4.174,34.486],[4.122,34.504],[4.07,34.522],[4.017,34.538],[3.965,34.554],[3.912,34.569],[3.859,34.583],[3.805,34.597],[3.752,34.61],[3.699,34.623],[3.645,34.636],[3.592,34.649],[3.539,34.664],[3.486,34.68],[3.434,34.698],[3.383,34.718],[3.334,34.743],[3.288,34.772],[3.245,34.806],[3.206,34.845],[3.173,34.889],[3.146,34.937],[3.123,34.987],[3.104,35.038],[3.088,35.091],[3.073,35.144],[3.06,35.197],[3.047,35.25],[3.033,35.304],[3.019,35.357],[3.003,35.409],[2.986,35.462],[2.967,35.513],[2.945,35.564],[2.92,35.613],[2.891,35.66],[2.859,35.704],[2.82,35.743],[2.776,35.775],[2.725,35.795],[2.67,35.797],[2.618,35.78],[2.574,35.747],[2.539,35.705],[2.511,35.658],[2.489,35.608],[2.471,35.556],[2.456,35.503],[2.443,35.449],[2.431,35.396],[2.418,35.342],[2.404,35.289],[2.387,35.237],[2.365,35.187],[2.337,35.139],[2.301,35.097],[2.258,35.063],[2.21,35.038],[2.157,35.022],[2.103,35.012],[2.048,35.008],[1.993,35.008],[1.939,35.01],[1.884,35.014],[1.829,35.018],[1.774,35.022],[1.719,35.026],[1.664,35.03],[1.61,35.034],[1.555,35.038],[1.5,35.042],[1.445,35.047],[1.391,35.052],[1.336,35.058],[1.281,35.065],[1.227,35.073],[1.173,35.081],[1.118,35.089],[1.064,35.097],[1.01,35.106],[.955,35.115],[.901,35.123],[.847,35.132],[.792,35.141],[.738,35.149],[.684,35.158],[.629,35.165],[.575,35.173],[.52,35.18],[.466,35.187],[.411,35.193],[.357,35.199],[.302,35.205],[.247,35.21],[.193,35.215],[.138,35.22],[.083,35.223],[.028,35.224],[-.027,35.221],[-.081,35.214],[-.134,35.2],[-.184,35.177],[-.228,35.144],[-.261,35.1],[-.281,35.049],[-.29,34.995],[-.287,34.94],[-.276,34.887],[-.257,34.835],[-.232,34.786],[-.202,34.74],[-.167,34.697],[-.129,34.658],[-.087,34.623],[-.042,34.591],[.006,34.563],[.055,34.539],[.106,34.518],[.157,34.5],[.21,34.484],[.263,34.47],[.317,34.458],[.371,34.446],[.425,34.436],[.478,34.425],[.532,34.415],[.586,34.405],[.64,34.394],[.694,34.384],[.748,34.373],[.802,34.362],[.856,34.352],[.91,34.341],[.964,34.33],[1.018,34.319],[1.072,34.308],[1.126,34.297],[1.179,34.286],[1.233,34.275],[1.287,34.263],[1.341,34.252],[1.394,34.24],[1.448,34.227],[1.501,34.215],[1.555,34.203],[1.608,34.19],[1.662,34.178],[1.715,34.165],[1.769,34.152],[1.822,34.138],[1.875,34.124],[1.928,34.108],[1.98,34.09],[2.031,34.07],[2.081,34.047],[2.129,34.021],[2.175,33.991],[2.218,33.956],[2.258,33.919],[2.295,33.878],[2.328,33.834],[2.359,33.789],[2.388,33.742],[2.416,33.695],[2.442,33.647],[2.469,33.599],[2.497,33.551],[2.526,33.504],[2.556,33.459],[2.59,33.415],[2.626,33.374],[2.665,33.335],[2.708,33.301],[2.754,33.272],[2.805,33.25],[2.858,33.239],[2.913,33.242],[2.963,33.264]],[[6.747,31.585],[6.79,31.619],[6.83,31.657],[6.869,31.695],[6.91,31.732],[6.953,31.767],[6.999,31.797],[7.047,31.824],[7.098,31.845],[7.15,31.862],[7.204,31.875],[7.258,31.884],[7.312,31.892],[7.367,31.897],[7.422,31.901],[7.477,31.905],[7.532,31.908],[7.587,31.911],[7.641,31.915],[7.696,31.919],[7.751,31.924],[7.806,31.93],[7.861,31.936],[7.915,31.942],[7.97,31.949],[8.024,31.956],[8.079,31.962],[8.134,31.967],[8.189,31.972],[8.244,31.977],[8.298,31.98],[8.353,31.983],[8.408,31.986],[8.463,31.988],[8.518,31.991],[8.573,31.994],[8.628,31.997],[8.683,32.002],[8.738,32.006],[8.793,32.012],[8.847,32.018],[8.902,32.024],[8.957,32.03],[9.011,32.036],[9.066,32.041],[9.121,32.045],[9.176,32.048],[9.231,32.05],[9.286,32.051],[9.341,32.05],[9.396,32.05],[9.451,32.049],[9.506,32.048],[9.561,32.049],[9.616,32.051],[9.671,32.055],[9.726,32.062],[9.78,32.072],[9.833,32.085],[9.885,32.103],[9.934,32.128],[9.979,32.16],[10.014,32.201],[10.037,32.252],[10.045,32.306],[10.042,32.361],[10.034,32.415],[10.022,32.469],[10.009,32.522],[9.997,32.576],[9.986,32.63],[9.979,32.684],[9.974,32.739],[9.971,32.794],[9.971,32.849],[9.973,32.904],[9.976,32.959],[9.98,33.014],[9.984,33.069],[9.987,33.124],[9.989,33.179],[9.99,33.234],[9.989,33.289],[9.987,33.344],[9.982,33.399],[9.976,33.453],[9.968,33.508],[9.958,33.562],[9.946,33.616],[9.932,33.669],[9.916,33.721],[9.897,33.773],[9.877,33.824],[9.854,33.874],[9.83,33.924],[9.804,33.972],[9.776,34.02],[9.747,34.066],[9.716,34.112],[9.685,34.157],[9.652,34.201],[9.618,34.245],[9.583,34.287],[9.547,34.329],[9.51,34.369],[9.471,34.408],[9.431,34.446],[9.39,34.482],[9.347,34.517],[9.303,34.551],[9.258,34.582],[9.213,34.613],[9.166,34.641],[9.118,34.669],[9.069,34.694],[9.02,34.719],[8.97,34.741],[8.919,34.762],[8.867,34.782],[8.816,34.801],[8.763,34.818],[8.711,34.834],[8.658,34.85],[8.605,34.864],[8.552,34.878],[8.498,34.891],[8.445,34.904],[8.391,34.916],[8.337,34.929],[8.284,34.94],[8.23,34.952],[8.176,34.964],[8.122,34.975],[8.069,34.987],[8.015,34.999],[7.961,35.011],[7.907,35.022],[7.854,35.034],[7.8,35.045],[7.746,35.055],[7.691,35.065],[7.637,35.072],[7.582,35.078],[7.527,35.082],[7.472,35.084],[7.417,35.082],[7.362,35.079],[7.308,35.072],[7.254,35.063],[7.2,35.051],[7.147,35.036],[7.095,35.019],[7.043,35],[6.993,34.978],[6.943,34.954],[6.895,34.927],[6.848,34.899],[6.802,34.868],[6.758,34.836],[6.715,34.801],[6.673,34.765],[6.633,34.728],[6.594,34.689],[6.557,34.648],[6.522,34.606],[6.488,34.562],[6.457,34.517],[6.428,34.47],[6.401,34.422],[6.376,34.373],[6.354,34.323],[6.334,34.272],[6.316,34.22],[6.3,34.167],[6.285,34.114],[6.273,34.06],[6.262,34.006],[6.253,33.952],[6.246,33.898],[6.241,33.843],[6.237,33.788],[6.236,33.733],[6.237,33.678],[6.24,33.623],[6.244,33.568],[6.251,33.513],[6.26,33.459],[6.271,33.405],[6.283,33.352],[6.296,33.298],[6.311,33.245],[6.326,33.192],[6.342,33.14],[6.358,33.087],[6.374,33.034],[6.389,32.981],[6.402,32.928],[6.413,32.874],[6.421,32.82],[6.424,32.765],[6.42,32.71],[6.411,32.655],[6.397,32.602],[6.379,32.55],[6.359,32.499],[6.339,32.448],[6.319,32.397],[6.302,32.344],[6.288,32.291],[6.278,32.237],[6.274,32.182],[6.274,32.127],[6.28,32.073],[6.29,32.019],[6.305,31.966],[6.323,31.914],[6.345,31.863],[6.37,31.814],[6.398,31.767],[6.429,31.721],[6.464,31.678],[6.501,31.638],[6.543,31.603],[6.59,31.574],[6.643,31.558],[6.697,31.562]],[[8.948,32.791],[8.894,32.777],[8.84,32.765],[8.786,32.757],[8.731,32.751],[8.676,32.747],[8.621,32.745],[8.565,32.744],[8.51,32.743],[8.455,32.743],[8.4,32.743],[8.344,32.742],[8.289,32.741],[8.234,32.739],[8.179,32.738],[8.124,32.736],[8.068,32.735],[8.013,32.733],[7.958,32.732],[7.903,32.732],[7.848,32.732],[7.792,32.733],[7.737,32.734],[7.682,32.737],[7.627,32.74],[7.572,32.746],[7.517,32.753],[7.463,32.763],[7.409,32.775],[7.356,32.791],[7.304,32.811],[7.254,32.834],[7.206,32.861],[7.161,32.892],[7.118,32.927],[7.078,32.966],[7.042,33.007],[7.009,33.052],[6.98,33.099],[6.954,33.147],[6.931,33.198],[6.912,33.249],[6.896,33.302],[6.883,33.356],[6.874,33.41],[6.869,33.465],[6.87,33.52],[6.876,33.575],[6.89,33.629],[6.91,33.68],[6.937,33.728],[6.969,33.773],[7.006,33.815],[7.046,33.852],[7.089,33.887],[7.134,33.919],[7.181,33.948],[7.229,33.975],[7.278,34],[7.328,34.023],[7.379,34.045],[7.431,34.064],[7.483,34.082],[7.536,34.099],[7.589,34.114],[7.642,34.128],[7.696,34.141],[7.75,34.152],[7.804,34.163],[7.859,34.172],[7.913,34.179],[7.968,34.185],[8.023,34.189],[8.079,34.191],[8.134,34.191],[8.189,34.189],[8.244,34.185],[8.299,34.18],[8.354,34.172],[8.408,34.163],[8.462,34.152],[8.516,34.139],[8.569,34.125],[8.622,34.108],[8.674,34.09],[8.725,34.069],[8.776,34.047],[8.825,34.022],[8.873,33.994],[8.92,33.965],[8.965,33.933],[9.009,33.9],[9.052,33.865],[9.093,33.829],[9.134,33.791],[9.174,33.753],[9.212,33.713],[9.249,33.672],[9.284,33.63],[9.318,33.586],[9.349,33.54],[9.376,33.492],[9.398,33.441],[9.414,33.388],[9.423,33.334],[9.423,33.279],[9.414,33.224],[9.398,33.172],[9.374,33.122],[9.345,33.075],[9.312,33.031],[9.275,32.99],[9.235,32.952],[9.192,32.917],[9.147,32.885],[9.1,32.857],[9.05,32.831],[9,32.81]],[[-8.103,31.101],[-8.05,31.114],[-7.998,31.132],[-7.948,31.153],[-7.898,31.176],[-7.849,31.201],[-7.8,31.227],[-7.752,31.253],[-7.704,31.28],[-7.656,31.307],[-7.608,31.333],[-7.56,31.36],[-7.512,31.387],[-7.465,31.414],[-7.417,31.442],[-7.369,31.469],[-7.322,31.497],[-7.274,31.524],[-7.227,31.551],[-7.179,31.578],[-7.131,31.605],[-7.083,31.631],[-7.034,31.658],[-6.986,31.684],[-6.938,31.71],[-6.889,31.736],[-6.841,31.762],[-6.793,31.788],[-6.745,31.815],[-6.697,31.841],[-6.649,31.868],[-6.6,31.894],[-6.552,31.921],[-6.504,31.946],[-6.455,31.972],[-6.406,31.996],[-6.357,32.02],[-6.307,32.044],[-6.257,32.067],[-6.207,32.089],[-6.157,32.112],[-6.107,32.134],[-6.057,32.157],[-6.007,32.18],[-5.957,32.203],[-5.907,32.226],[-5.858,32.25],[-5.808,32.273],[-5.758,32.297],[-5.709,32.32],[-5.658,32.342],[-5.608,32.365],[-5.558,32.386],[-5.507,32.406],[-5.455,32.426],[-5.404,32.445],[-5.352,32.462],[-5.3,32.48],[-5.247,32.497],[-5.195,32.513],[-5.143,32.53],[-5.09,32.547],[-5.038,32.564],[-4.987,32.583],[-4.935,32.602],[-4.884,32.623],[-4.834,32.646],[-4.785,32.671],[-4.738,32.698],[-4.692,32.729],[-4.649,32.762],[-4.609,32.8],[-4.573,32.842],[-4.543,32.887],[-4.519,32.937],[-4.503,32.989],[-4.494,33.043],[-4.493,33.098],[-4.498,33.153],[-4.509,33.207],[-4.525,33.259],[-4.544,33.311],[-4.567,33.36],[-4.594,33.408],[-4.624,33.454],[-4.658,33.498],[-4.695,33.538],[-4.736,33.575],[-4.779,33.608],[-4.825,33.638],[-4.873,33.665],[-4.923,33.689],[-4.974,33.709],[-5.025,33.728],[-5.078,33.745],[-5.13,33.761],[-5.183,33.775],[-5.237,33.788],[-5.29,33.801],[-5.343,33.813],[-5.397,33.826],[-5.451,33.838],[-5.504,33.85],[-5.558,33.863],[-5.611,33.875],[-5.664,33.888],[-5.718,33.901],[-5.771,33.914],[-5.824,33.928],[-5.877,33.942],[-5.931,33.955],[-5.984,33.969],[-6.037,33.984],[-6.09,33.998],[-6.143,34.013],[-6.195,34.028],[-6.248,34.043],[-6.301,34.058],[-6.354,34.073],[-6.407,34.088],[-6.46,34.103],[-6.513,34.117],[-6.566,34.131],[-6.619,34.145],[-6.672,34.159],[-6.725,34.173],[-6.778,34.187],[-6.831,34.201],[-6.884,34.215],[-6.937,34.229],[-6.99,34.244],[-7.043,34.259],[-7.096,34.274],[-7.149,34.289],[-7.202,34.304],[-7.255,34.319],[-7.308,34.333],[-7.36,34.348],[-7.413,34.363],[-7.466,34.377],[-7.52,34.391],[-7.573,34.405],[-7.626,34.418],[-7.679,34.432],[-7.732,34.445],[-7.786,34.459],[-7.839,34.472],[-7.892,34.485],[-7.945,34.499],[-7.999,34.512],[-8.052,34.525],[-8.105,34.539],[-8.159,34.552],[-8.212,34.565],[-8.265,34.578],[-8.319,34.591],[-8.372,34.604],[-8.425,34.617],[-8.479,34.63],[-8.532,34.643],[-8.586,34.655],[-8.639,34.667],[-8.693,34.679],[-8.747,34.69],[-8.8,34.701],[-8.854,34.712],[-8.908,34.723],[-8.962,34.733],[-9.016,34.743],[-9.07,34.753],[-9.124,34.761],[-9.179,34.769],[-9.233,34.774],[-9.288,34.778],[-9.343,34.778],[-9.398,34.775],[-9.452,34.765],[-9.504,34.749],[-9.554,34.725],[-9.597,34.692],[-9.633,34.65],[-9.659,34.602],[-9.673,34.549],[-9.677,34.494],[-9.671,34.44],[-9.657,34.387],[-9.636,34.336],[-9.608,34.289],[-9.575,34.245],[-9.538,34.205],[-9.497,34.168],[-9.454,34.134],[-9.408,34.103],[-9.361,34.075],[-9.312,34.05],[-9.263,34.026],[-9.212,34.005],[-9.161,33.985],[-9.109,33.966],[-9.057,33.949],[-9.005,33.934],[-8.952,33.919],[-8.898,33.905],[-8.845,33.893],[-8.791,33.881],[-8.738,33.869],[-8.684,33.858],[-8.63,33.847],[-8.576,33.837],[-8.522,33.827],[-8.468,33.817],[-8.414,33.807],[-8.36,33.796],[-8.307,33.785],[-8.253,33.772],[-8.2,33.758],[-8.148,33.741],[-8.097,33.721],[-8.047,33.698],[-7.999,33.671],[-7.955,33.638],[-7.916,33.6],[-7.881,33.557],[-7.852,33.511],[-7.827,33.462],[-7.807,33.411],[-7.791,33.358],[-7.777,33.305],[-7.765,33.252],[-7.754,33.198],[-7.745,33.144],[-7.736,33.089],[-7.729,33.035],[-7.722,32.981],[-7.717,32.926],[-7.713,32.871],[-7.71,32.816],[-7.708,32.761],[-7.708,32.706],[-7.71,32.652],[-7.713,32.597],[-7.719,32.542],[-7.728,32.488],[-7.739,32.434],[-7.755,32.382],[-7.775,32.33],[-7.799,32.281],[-7.828,32.235],[-7.862,32.191],[-7.898,32.15],[-7.938,32.112],[-7.98,32.077],[-8.023,32.043],[-8.068,32.011],[-8.113,31.979],[-8.158,31.948],[-8.203,31.916],[-8.247,31.884],[-8.291,31.85],[-8.333,31.815],[-8.373,31.778],[-8.41,31.738],[-8.444,31.694],[-8.473,31.648],[-8.495,31.598],[-8.51,31.545],[-8.517,31.49],[-8.516,31.436],[-8.507,31.381],[-8.492,31.329],[-8.469,31.279],[-8.44,31.232],[-8.405,31.19],[-8.364,31.153],[-8.318,31.125],[-8.267,31.105],[-8.213,31.095],[-8.158,31.094]],[[-6.595,32.822],[-6.649,32.828],[-6.7,32.847],[-6.745,32.878],[-6.781,32.919],[-6.806,32.967],[-6.822,33.019],[-6.83,33.073],[-6.83,33.128],[-6.822,33.182],[-6.804,33.233],[-6.776,33.279],[-6.735,33.316],[-6.687,33.34],[-6.633,33.352],[-6.579,33.355],[-6.525,33.352],[-6.47,33.346],[-6.417,33.337],[-6.363,33.326],[-6.31,33.314],[-6.257,33.3],[-6.205,33.283],[-6.155,33.262],[-6.109,33.234],[-6.073,33.193],[-6.062,33.141],[-6.078,33.089],[-6.11,33.045],[-6.15,33.007],[-6.192,32.973],[-6.238,32.943],[-6.285,32.916],[-6.334,32.891],[-6.384,32.869],[-6.435,32.85],[-6.487,32.835],[-6.541,32.825]],[[.568,30.254],[.598,30.3],[.613,30.353],[.617,30.408],[.614,30.463],[.605,30.517],[.593,30.571],[.579,30.624],[.564,30.677],[.549,30.73],[.534,30.783],[.519,30.836],[.506,30.89],[.495,30.944],[.485,30.998],[.477,31.053],[.472,31.107],[.468,31.162],[.466,31.217],[.465,31.272],[.467,31.328],[.47,31.383],[.475,31.437],[.483,31.492],[.492,31.546],[.503,31.6],[.517,31.654],[.534,31.706],[.552,31.758],[.573,31.809],[.597,31.859],[.623,31.907],[.652,31.954],[.684,31.999],[.719,32.042],[.757,32.081],[.8,32.116],[.847,32.145],[.898,32.165],[.952,32.172],[1.007,32.166],[1.058,32.146],[1.104,32.116],[1.144,32.078],[1.179,32.035],[1.209,31.989],[1.235,31.941],[1.258,31.891],[1.278,31.839],[1.296,31.787],[1.313,31.735],[1.329,31.682],[1.345,31.629],[1.36,31.576],[1.375,31.523],[1.39,31.47],[1.405,31.417],[1.421,31.365],[1.438,31.312],[1.455,31.26],[1.472,31.207],[1.49,31.155],[1.509,31.104],[1.529,31.052],[1.551,31.001],[1.573,30.951],[1.597,30.902],[1.623,30.853],[1.65,30.805],[1.68,30.758],[1.711,30.713],[1.745,30.669],[1.78,30.628],[1.819,30.588],[1.859,30.551],[1.903,30.517],[1.949,30.486],[1.997,30.46],[2.048,30.439],[2.101,30.424],[2.155,30.415],[2.21,30.412],[2.265,30.416],[2.319,30.425],[2.372,30.44],[2.424,30.459],[2.474,30.482],[2.523,30.508],[2.57,30.537],[2.615,30.569],[2.658,30.603],[2.699,30.639],[2.738,30.678],[2.774,30.721],[2.806,30.765],[2.834,30.812],[2.859,30.862],[2.88,30.913],[2.898,30.965],[2.913,31.018],[2.926,31.071],[2.938,31.125],[2.948,31.179],[2.957,31.234],[2.965,31.288],[2.971,31.343],[2.976,31.398],[2.98,31.453],[2.982,31.508],[2.981,31.563],[2.979,31.618],[2.975,31.673],[2.97,31.728],[2.963,31.782],[2.954,31.837],[2.944,31.891],[2.933,31.945],[2.92,31.999],[2.906,32.052],[2.89,32.105],[2.873,32.157],[2.852,32.208],[2.83,32.258],[2.804,32.307],[2.776,32.354],[2.745,32.4],[2.713,32.444],[2.677,32.487],[2.64,32.528],[2.602,32.567],[2.562,32.605],[2.521,32.642],[2.478,32.677],[2.435,32.711],[2.392,32.745],[2.347,32.778],[2.303,32.81],[2.258,32.842],[2.213,32.874],[2.167,32.905],[2.122,32.936],[2.076,32.966],[2.029,32.995],[1.982,33.024],[1.934,33.051],[1.885,33.077],[1.835,33.1],[1.785,33.122],[1.733,33.141],[1.681,33.158],[1.628,33.173],[1.574,33.186],[1.52,33.198],[1.466,33.207],[1.411,33.215],[1.357,33.223],[1.302,33.229],[1.247,33.234],[1.192,33.238],[1.137,33.241],[1.082,33.243],[1.027,33.243],[.972,33.241],[.917,33.238],[.862,33.233],[.807,33.226],[.753,33.217],[.699,33.206],[.646,33.192],[.593,33.176],[.541,33.157],[.491,33.136],[.441,33.111],[.394,33.083],[.348,33.053],[.303,33.02],[.261,32.986],[.22,32.949],[.181,32.91],[.144,32.869],[.109,32.826],[.076,32.782],[.045,32.736],[.017,32.689],[-.008,32.64],[-.031,32.59],[-.051,32.539],[-.069,32.486],[-.084,32.434],[-.098,32.38],[-.109,32.326],[-.119,32.272],[-.129,32.218],[-.137,32.163],[-.146,32.109],[-.154,32.054],[-.161,32],[-.168,31.945],[-.175,31.89],[-.181,31.836],[-.185,31.781],[-.189,31.726],[-.191,31.671],[-.192,31.615],[-.19,31.56],[-.188,31.505],[-.184,31.45],[-.178,31.396],[-.171,31.341],[-.162,31.287],[-.153,31.232],[-.142,31.178],[-.13,31.124],[-.118,31.071],[-.105,31.017],[-.091,30.964],[-.077,30.91],[-.062,30.857],[-.047,30.805],[-.029,30.752],[-.011,30.7],[.01,30.649],[.032,30.599],[.057,30.55],[.085,30.502],[.116,30.457],[.149,30.413],[.186,30.371],[.225,30.333],[.267,30.298],[.313,30.266],[.361,30.241],[.413,30.223],[.468,30.216],[.522,30.225]],[[7.689,28.793],[7.74,28.811],[7.791,28.833],[7.84,28.858],[7.889,28.884],[7.936,28.912],[7.983,28.94],[8.029,28.97],[8.075,29],[8.121,29.032],[8.165,29.064],[8.209,29.097],[8.252,29.132],[8.293,29.168],[8.333,29.206],[8.371,29.246],[8.408,29.287],[8.443,29.329],[8.477,29.373],[8.508,29.418],[8.538,29.464],[8.566,29.512],[8.591,29.56],[8.615,29.61],[8.637,29.661],[8.656,29.712],[8.674,29.764],[8.69,29.817],[8.706,29.87],[8.72,29.923],[8.733,29.976],[8.746,30.03],[8.759,30.083],[8.773,30.136],[8.787,30.19],[8.802,30.242],[8.819,30.295],[8.839,30.346],[8.862,30.396],[8.888,30.445],[8.919,30.49],[8.955,30.531],[8.997,30.567],[9.044,30.596],[9.095,30.615],[9.15,30.623],[9.205,30.619],[9.257,30.603],[9.305,30.575],[9.346,30.54],[9.38,30.497],[9.407,30.449],[9.427,30.397],[9.439,30.344],[9.445,30.289],[9.446,30.234],[9.443,30.179],[9.437,30.124],[9.429,30.07],[9.421,30.015],[9.413,29.961],[9.406,29.906],[9.402,29.851],[9.401,29.796],[9.403,29.741],[9.41,29.687],[9.421,29.633],[9.437,29.58],[9.457,29.529],[9.482,29.48],[9.512,29.434],[9.547,29.392],[9.59,29.358],[9.64,29.334],[9.694,29.326],[9.748,29.334],[9.799,29.355],[9.844,29.386],[9.886,29.422],[9.923,29.463],[9.956,29.506],[9.986,29.552],[10.014,29.6],[10.039,29.649],[10.062,29.699],[10.084,29.75],[10.103,29.801],[10.121,29.853],[10.138,29.905],[10.153,29.958],[10.165,30.012],[10.176,30.066],[10.185,30.12],[10.19,30.175],[10.193,30.23],[10.194,30.285],[10.192,30.34],[10.188,30.395],[10.182,30.45],[10.174,30.504],[10.165,30.558],[10.154,30.612],[10.142,30.666],[10.127,30.719],[10.11,30.771],[10.091,30.823],[10.069,30.873],[10.045,30.923],[10.018,30.971],[9.989,31.018],[9.958,31.063],[9.925,31.107],[9.89,31.15],[9.854,31.191],[9.816,31.231],[9.777,31.27],[9.736,31.307],[9.694,31.342],[9.65,31.375],[9.605,31.407],[9.559,31.437],[9.511,31.464],[9.462,31.49],[9.413,31.514],[9.362,31.535],[9.31,31.554],[9.258,31.571],[9.205,31.584],[9.15,31.595],[9.096,31.601],[9.041,31.602],[8.986,31.598],[8.932,31.588],[8.879,31.571],[8.829,31.549],[8.781,31.522],[8.736,31.491],[8.692,31.457],[8.651,31.421],[8.61,31.384],[8.57,31.346],[8.531,31.307],[8.493,31.267],[8.456,31.226],[8.421,31.185],[8.387,31.141],[8.354,31.097],[8.323,31.051],[8.294,31.005],[8.266,30.957],[8.24,30.909],[8.215,30.86],[8.191,30.81],[8.168,30.76],[8.146,30.71],[8.124,30.66],[8.102,30.609],[8.08,30.559],[8.057,30.508],[8.035,30.458],[8.012,30.408],[7.988,30.359],[7.963,30.31],[7.937,30.261],[7.91,30.213],[7.881,30.166],[7.85,30.12],[7.818,30.076],[7.783,30.034],[7.744,29.994],[7.702,29.959],[7.656,29.93],[7.605,29.909],[7.55,29.901],[7.496,29.909],[7.446,29.932],[7.402,29.964],[7.365,30.005],[7.333,30.05],[7.306,30.098],[7.284,30.148],[7.267,30.2],[7.253,30.254],[7.243,30.308],[7.236,30.362],[7.231,30.417],[7.227,30.472],[7.224,30.527],[7.22,30.582],[7.215,30.637],[7.207,30.691],[7.196,30.745],[7.181,30.798],[7.162,30.849],[7.139,30.899],[7.111,30.947],[7.079,30.992],[7.042,31.032],[7,31.068],[6.952,31.094],[6.899,31.109],[6.844,31.108],[6.791,31.093],[6.743,31.066],[6.7,31.032],[6.662,30.993],[6.628,30.949],[6.598,30.903],[6.572,30.855],[6.549,30.805],[6.53,30.753],[6.513,30.701],[6.5,30.647],[6.49,30.593],[6.482,30.539],[6.477,30.484],[6.473,30.429],[6.471,30.374],[6.47,30.319],[6.471,30.264],[6.473,30.209],[6.476,30.154],[6.481,30.099],[6.487,30.044],[6.495,29.99],[6.504,29.936],[6.516,29.882],[6.529,29.829],[6.544,29.776],[6.56,29.723],[6.579,29.671],[6.599,29.62],[6.621,29.569],[6.644,29.52],[6.669,29.471],[6.695,29.422],[6.724,29.375],[6.754,29.329],[6.785,29.284],[6.818,29.24],[6.852,29.197],[6.888,29.155],[6.925,29.114],[6.963,29.074],[7.002,29.035],[7.042,28.997],[7.083,28.961],[7.126,28.926],[7.17,28.894],[7.216,28.863],[7.263,28.835],[7.313,28.811],[7.364,28.792],[7.417,28.777],[7.472,28.768],[7.527,28.765],[7.581,28.769],[7.636,28.778]],[[-8.282,26.765],[-8.232,26.788],[-8.186,26.817],[-8.142,26.85],[-8.1,26.886],[-8.06,26.924],[-8.022,26.964],[-7.985,27.005],[-7.949,27.046],[-7.913,27.088],[-7.878,27.13],[-7.843,27.172],[-7.807,27.214],[-7.772,27.256],[-7.736,27.298],[-7.701,27.34],[-7.666,27.382],[-7.63,27.424],[-7.595,27.467],[-7.56,27.509],[-7.525,27.551],[-7.49,27.594],[-7.455,27.636],[-7.42,27.678],[-7.385,27.721],[-7.349,27.763],[-7.314,27.805],[-7.278,27.847],[-7.243,27.889],[-7.207,27.931],[-7.172,27.973],[-7.136,28.015],[-7.1,28.056],[-7.063,28.097],[-7.025,28.136],[-6.985,28.174],[-6.943,28.21],[-6.898,28.241],[-6.85,28.267],[-6.798,28.284],[-6.743,28.289],[-6.689,28.283],[-6.636,28.267],[-6.586,28.244],[-6.538,28.217],[-6.492,28.188],[-6.446,28.158],[-6.4,28.127],[-6.354,28.097],[-6.308,28.067],[-6.261,28.039],[-6.212,28.013],[-6.164,27.987],[-6.114,27.964],[-6.063,27.943],[-6.012,27.923],[-5.96,27.904],[-5.908,27.888],[-5.855,27.872],[-5.802,27.859],[-5.748,27.846],[-5.694,27.835],[-5.64,27.826],[-5.586,27.818],[-5.531,27.812],[-5.476,27.808],[-5.421,27.805],[-5.366,27.805],[-5.311,27.806],[-5.257,27.81],[-5.202,27.817],[-5.148,27.826],[-5.094,27.838],[-5.042,27.855],[-4.99,27.874],[-4.941,27.898],[-4.893,27.925],[-4.848,27.956],[-4.805,27.991],[-4.765,28.029],[-4.728,28.069],[-4.693,28.112],[-4.661,28.156],[-4.632,28.203],[-4.604,28.25],[-4.579,28.299],[-4.555,28.348],[-4.532,28.399],[-4.511,28.449],[-4.491,28.5],[-4.471,28.552],[-4.452,28.603],[-4.434,28.655],[-4.416,28.707],[-4.398,28.759],[-4.381,28.812],[-4.365,28.864],[-4.348,28.916],[-4.333,28.969],[-4.319,29.022],[-4.305,29.076],[-4.293,29.129],[-4.283,29.183],[-4.275,29.238],[-4.268,29.292],[-4.264,29.347],[-4.262,29.402],[-4.263,29.457],[-4.266,29.512],[-4.271,29.567],[-4.28,29.621],[-4.291,29.675],[-4.305,29.728],[-4.321,29.78],[-4.34,29.832],[-4.36,29.883],[-4.383,29.933],[-4.407,29.982],[-4.433,30.031],[-4.459,30.079],[-4.486,30.127],[-4.514,30.174],[-4.543,30.221],[-4.573,30.267],[-4.604,30.313],[-4.636,30.357],[-4.67,30.4],[-4.707,30.442],[-4.746,30.48],[-4.789,30.514],[-4.836,30.543],[-4.885,30.567],[-4.938,30.584],[-4.991,30.595],[-5.046,30.6],[-5.101,30.602],[-5.156,30.6],[-5.211,30.595],[-5.265,30.589],[-5.32,30.582],[-5.374,30.574],[-5.428,30.565],[-5.483,30.555],[-5.537,30.544],[-5.59,30.533],[-5.644,30.522],[-5.698,30.51],[-5.752,30.498],[-5.805,30.486],[-5.859,30.474],[-5.912,30.462],[-5.966,30.451],[-6.02,30.439],[-6.074,30.428],[-6.128,30.417],[-6.181,30.406],[-6.235,30.395],[-6.289,30.384],[-6.343,30.373],[-6.397,30.362],[-6.451,30.351],[-6.505,30.34],[-6.558,30.328],[-6.612,30.317],[-6.666,30.305],[-6.719,30.293],[-6.773,30.28],[-6.826,30.267],[-6.88,30.254],[-6.933,30.24],[-6.986,30.226],[-7.039,30.211],[-7.092,30.197],[-7.145,30.182],[-7.198,30.168],[-7.251,30.154],[-7.305,30.14],[-7.358,30.127],[-7.411,30.113],[-7.465,30.1],[-7.518,30.087],[-7.572,30.075],[-7.625,30.062],[-7.678,30.048],[-7.732,30.035],[-7.785,30.022],[-7.838,30.008],[-7.892,29.995],[-7.945,29.982],[-7.999,29.97],[-8.052,29.958],[-8.106,29.947],[-8.16,29.937],[-8.214,29.927],[-8.268,29.917],[-8.323,29.907],[-8.377,29.897],[-8.431,29.887],[-8.484,29.876],[-8.538,29.864],[-8.591,29.85],[-8.644,29.834],[-8.695,29.814],[-8.744,29.789],[-8.789,29.757],[-8.827,29.717],[-8.857,29.671],[-8.877,29.62],[-8.888,29.567],[-8.892,29.512],[-8.889,29.457],[-8.881,29.403],[-8.866,29.35],[-8.846,29.299],[-8.82,29.25],[-8.787,29.206],[-8.749,29.167],[-8.705,29.134],[-8.656,29.109],[-8.604,29.091],[-8.55,29.08],[-8.496,29.074],[-8.441,29.074],[-8.386,29.077],[-8.331,29.083],[-8.277,29.091],[-8.222,29.1],[-8.168,29.11],[-8.114,29.119],[-8.06,29.127],[-8.005,29.133],[-7.95,29.137],[-7.895,29.137],[-7.841,29.132],[-7.787,29.119],[-7.737,29.096],[-7.694,29.062],[-7.665,29.016],[-7.651,28.963],[-7.651,28.908],[-7.661,28.854],[-7.677,28.802],[-7.699,28.751],[-7.724,28.703],[-7.752,28.655],[-7.781,28.608],[-7.812,28.563],[-7.843,28.518],[-7.875,28.473],[-7.907,28.428],[-7.939,28.384],[-7.971,28.339],[-8.002,28.293],[-8.033,28.248],[-8.063,28.202],[-8.093,28.156],[-8.123,28.11],[-8.153,28.064],[-8.184,28.018],[-8.215,27.973],[-8.246,27.928],[-8.278,27.883],[-8.311,27.839],[-8.344,27.795],[-8.378,27.752],[-8.413,27.709],[-8.448,27.667],[-8.484,27.625],[-8.519,27.583],[-8.554,27.54],[-8.588,27.497],[-8.621,27.453],[-8.652,27.408],[-8.681,27.361],[-8.706,27.312],[-8.726,27.261],[-8.74,27.208],[-8.748,27.154],[-8.747,27.099],[-8.738,27.045],[-8.721,26.992],[-8.697,26.943],[-8.667,26.897],[-8.632,26.855],[-8.591,26.817],[-8.546,26.786],[-8.497,26.762],[-8.444,26.747],[-8.389,26.743],[-8.335,26.749]],[[-5.61,28.858],[-5.665,28.861],[-5.72,28.869],[-5.774,28.881],[-5.828,28.896],[-5.88,28.915],[-5.931,28.937],[-5.98,28.961],[-6.029,28.988],[-6.076,29.017],[-6.122,29.048],[-6.166,29.082],[-6.207,29.119],[-6.244,29.161],[-6.274,29.207],[-6.294,29.258],[-6.297,29.313],[-6.28,29.366],[-6.247,29.41],[-6.205,29.446],[-6.158,29.475],[-6.108,29.499],[-6.056,29.52],[-6.004,29.537],[-5.951,29.553],[-5.897,29.567],[-5.843,29.579],[-5.789,29.591],[-5.734,29.602],[-5.68,29.611],[-5.625,29.62],[-5.57,29.627],[-5.515,29.631],[-5.459,29.633],[-5.404,29.63],[-5.349,29.621],[-5.296,29.605],[-5.247,29.581],[-5.203,29.546],[-5.168,29.503],[-5.144,29.454],[-5.128,29.401],[-5.122,29.346],[-5.123,29.29],[-5.131,29.236],[-5.145,29.182],[-5.164,29.13],[-5.19,29.081],[-5.221,29.035],[-5.257,28.993],[-5.299,28.957],[-5.345,28.926],[-5.394,28.901],[-5.446,28.882],[-5.5,28.868],[-5.555,28.86]],[[2.68,27],[2.732,27.019],[2.78,27.046],[2.825,27.078],[2.866,27.115],[2.904,27.155],[2.938,27.198],[2.97,27.243],[2.998,27.29],[3.024,27.339],[3.047,27.389],[3.067,27.44],[3.084,27.492],[3.098,27.546],[3.108,27.6],[3.115,27.654],[3.118,27.709],[3.118,27.765],[3.115,27.819],[3.108,27.874],[3.099,27.929],[3.087,27.982],[3.073,28.036],[3.057,28.088],[3.039,28.141],[3.02,28.192],[3,28.243],[2.978,28.294],[2.956,28.345],[2.934,28.395],[2.914,28.446],[2.896,28.499],[2.883,28.552],[2.876,28.607],[2.88,28.661],[2.897,28.714],[2.926,28.76],[2.963,28.801],[3.004,28.838],[3.046,28.873],[3.088,28.91],[3.126,28.95],[3.158,28.994],[3.183,29.043],[3.2,29.096],[3.209,29.15],[3.211,29.205],[3.208,29.26],[3.198,29.314],[3.183,29.367],[3.163,29.419],[3.138,29.467],[3.107,29.513],[3.071,29.554],[3.029,29.59],[2.983,29.62],[2.933,29.643],[2.88,29.659],[2.826,29.669],[2.771,29.674],[2.716,29.674],[2.661,29.671],[2.606,29.666],[2.551,29.66],[2.497,29.652],[2.442,29.644],[2.388,29.636],[2.333,29.628],[2.279,29.619],[2.224,29.611],[2.17,29.604],[2.115,29.596],[2.061,29.588],[2.006,29.58],[1.952,29.571],[1.897,29.562],[1.843,29.553],[1.789,29.543],[1.734,29.534],[1.68,29.524],[1.626,29.514],[1.572,29.504],[1.518,29.494],[1.463,29.485],[1.409,29.476],[1.354,29.469],[1.3,29.462],[1.245,29.457],[1.19,29.453],[1.135,29.45],[1.08,29.449],[1.024,29.449],[.969,29.451],[.914,29.454],[.859,29.459],[.805,29.464],[.75,29.47],[.695,29.477],[.64,29.483],[.586,29.489],[.531,29.494],[.476,29.499],[.421,29.502],[.366,29.503],[.311,29.503],[.256,29.501],[.201,29.496],[.146,29.487],[.093,29.474],[.041,29.455],[-.007,29.429],[-.05,29.395],[-.083,29.35],[-.103,29.299],[-.111,29.245],[-.108,29.19],[-.096,29.136],[-.079,29.084],[-.055,29.034],[-.028,28.986],[.004,28.941],[.039,28.899],[.079,28.861],[.122,28.826],[.168,28.797],[.217,28.772],[.268,28.751],[.321,28.735],[.375,28.723],[.429,28.714],[.484,28.707],[.539,28.703],[.594,28.699],[.649,28.697],[.704,28.696],[.759,28.695],[.814,28.694],[.869,28.694],[.924,28.693],[.979,28.692],[1.035,28.691],[1.09,28.689],[1.145,28.687],[1.2,28.684],[1.255,28.68],[1.309,28.674],[1.364,28.668],[1.419,28.66],[1.473,28.651],[1.527,28.64],[1.581,28.628],[1.634,28.614],[1.687,28.598],[1.739,28.58],[1.79,28.56],[1.841,28.538],[1.89,28.513],[1.938,28.485],[1.984,28.455],[2.027,28.422],[2.069,28.386],[2.108,28.347],[2.145,28.305],[2.178,28.262],[2.208,28.215],[2.235,28.167],[2.257,28.117],[2.276,28.065],[2.291,28.012],[2.301,27.958],[2.309,27.903],[2.312,27.848],[2.313,27.793],[2.312,27.738],[2.309,27.683],[2.305,27.628],[2.3,27.573],[2.297,27.518],[2.294,27.463],[2.294,27.408],[2.297,27.353],[2.303,27.298],[2.314,27.244],[2.331,27.192],[2.354,27.142],[2.385,27.096],[2.422,27.056],[2.467,27.024],[2.517,27.002],[2.571,26.991],[2.626,26.99]],[[8.69,25.064],[8.744,25.074],[8.797,25.089],[8.849,25.107],[8.9,25.127],[8.95,25.15],[8.999,25.175],[9.047,25.202],[9.094,25.23],[9.141,25.26],[9.186,25.292],[9.23,25.324],[9.273,25.358],[9.316,25.393],[9.357,25.43],[9.396,25.468],[9.433,25.509],[9.468,25.551],[9.501,25.596],[9.53,25.642],[9.556,25.691],[9.579,25.741],[9.598,25.792],[9.615,25.845],[9.629,25.898],[9.64,25.952],[9.649,26.006],[9.656,26.061],[9.661,26.115],[9.665,26.17],[9.668,26.225],[9.669,26.28],[9.67,26.335],[9.669,26.39],[9.668,26.445],[9.666,26.5],[9.662,26.555],[9.657,26.61],[9.65,26.664],[9.641,26.719],[9.631,26.773],[9.618,26.826],[9.602,26.879],[9.585,26.931],[9.566,26.983],[9.545,27.033],[9.523,27.084],[9.499,27.133],[9.474,27.182],[9.448,27.231],[9.421,27.279],[9.393,27.326],[9.364,27.373],[9.334,27.419],[9.303,27.465],[9.272,27.51],[9.239,27.554],[9.205,27.597],[9.17,27.64],[9.134,27.681],[9.096,27.721],[9.057,27.76],[9.016,27.797],[8.975,27.833],[8.932,27.867],[8.887,27.899],[8.842,27.93],[8.795,27.959],[8.747,27.986],[8.698,28.012],[8.649,28.036],[8.598,28.058],[8.547,28.079],[8.496,28.098],[8.443,28.115],[8.391,28.13],[8.337,28.144],[8.284,28.156],[8.23,28.166],[8.175,28.174],[8.121,28.181],[8.066,28.186],[8.011,28.19],[7.956,28.193],[7.901,28.195],[7.846,28.195],[7.791,28.195],[7.736,28.195],[7.681,28.193],[7.626,28.19],[7.571,28.187],[7.516,28.182],[7.462,28.176],[7.407,28.169],[7.353,28.16],[7.299,28.15],[7.245,28.138],[7.192,28.126],[7.138,28.111],[7.086,28.096],[7.033,28.078],[6.982,28.06],[6.931,28.039],[6.881,28.017],[6.831,27.992],[6.783,27.966],[6.736,27.938],[6.69,27.907],[6.646,27.874],[6.603,27.839],[6.563,27.802],[6.524,27.763],[6.487,27.723],[6.452,27.68],[6.419,27.636],[6.388,27.591],[6.359,27.544],[6.331,27.497],[6.305,27.448],[6.28,27.399],[6.257,27.349],[6.235,27.299],[6.215,27.247],[6.197,27.196],[6.18,27.143],[6.164,27.091],[6.15,27.037],[6.136,26.984],[6.124,26.93],[6.113,26.876],[6.103,26.822],[6.094,26.768],[6.087,26.714],[6.08,26.659],[6.075,26.604],[6.072,26.549],[6.071,26.494],[6.071,26.439],[6.073,26.384],[6.077,26.329],[6.083,26.275],[6.091,26.22],[6.1,26.166],[6.111,26.112],[6.123,26.059],[6.137,26.005],[6.152,25.953],[6.17,25.9],[6.189,25.849],[6.21,25.798],[6.233,25.748],[6.259,25.7],[6.289,25.654],[6.323,25.61],[6.362,25.572],[6.408,25.541],[6.46,25.527],[6.513,25.54],[6.553,25.577],[6.58,25.625],[6.598,25.677],[6.611,25.73],[6.622,25.784],[6.63,25.839],[6.638,25.893],[6.645,25.948],[6.653,26.002],[6.661,26.057],[6.67,26.111],[6.68,26.165],[6.69,26.219],[6.702,26.273],[6.715,26.326],[6.729,26.379],[6.745,26.432],[6.764,26.484],[6.784,26.535],[6.807,26.585],[6.832,26.634],[6.86,26.681],[6.89,26.727],[6.922,26.772],[6.956,26.815],[6.991,26.857],[7.028,26.899],[7.065,26.939],[7.104,26.978],[7.143,27.017],[7.183,27.054],[7.224,27.091],[7.267,27.126],[7.31,27.16],[7.355,27.191],[7.402,27.22],[7.45,27.246],[7.501,27.268],[7.553,27.285],[7.607,27.294],[7.662,27.296],[7.717,27.288],[7.768,27.27],[7.815,27.24],[7.854,27.202],[7.887,27.158],[7.913,27.11],[7.934,27.059],[7.951,27.007],[7.965,26.953],[7.977,26.9],[7.986,26.845],[7.994,26.791],[8.001,26.736],[8.007,26.682],[8.012,26.627],[8.016,26.572],[8.02,26.517],[8.023,26.462],[8.026,26.407],[8.028,26.352],[8.031,26.297],[8.035,26.242],[8.038,26.188],[8.043,26.133],[8.048,26.078],[8.054,26.023],[8.061,25.969],[8.068,25.914],[8.075,25.86],[8.083,25.805],[8.091,25.751],[8.1,25.696],[8.109,25.642],[8.119,25.588],[8.13,25.534],[8.143,25.481],[8.158,25.428],[8.176,25.376],[8.197,25.325],[8.223,25.277],[8.253,25.231],[8.288,25.188],[8.328,25.15],[8.372,25.118],[8.421,25.092],[8.472,25.073],[8.526,25.061],[8.581,25.056],[8.636,25.057]],[[8.716,25.871],[8.664,25.886],[8.621,25.919],[8.59,25.964],[8.569,26.015],[8.554,26.067],[8.544,26.121],[8.537,26.175],[8.533,26.23],[8.531,26.284],[8.53,26.339],[8.531,26.393],[8.534,26.448],[8.539,26.502],[8.546,26.557],[8.555,26.611],[8.568,26.664],[8.584,26.716],[8.605,26.766],[8.632,26.814],[8.664,26.858],[8.703,26.896],[8.748,26.927],[8.799,26.946],[8.853,26.953],[8.907,26.945],[8.958,26.925],[9.003,26.894],[9.041,26.855],[9.072,26.81],[9.098,26.762],[9.117,26.711],[9.131,26.658],[9.141,26.604],[9.146,26.55],[9.147,26.495],[9.144,26.44],[9.137,26.386],[9.127,26.333],[9.112,26.28],[9.094,26.229],[9.072,26.179],[9.046,26.13],[9.017,26.084],[8.985,26.04],[8.949,25.998],[8.91,25.96],[8.868,25.926],[8.821,25.897],[8.77,25.877]],[[3.383,21.699],[3.422,21.737],[3.453,21.782],[3.477,21.831],[3.496,21.883],[3.512,21.935],[3.527,21.988],[3.54,22.041],[3.552,22.095],[3.565,22.148],[3.578,22.202],[3.593,22.254],[3.61,22.307],[3.631,22.358],[3.655,22.407],[3.684,22.453],[3.719,22.496],[3.758,22.534],[3.802,22.567],[3.85,22.594],[3.9,22.616],[3.952,22.634],[4.005,22.648],[4.059,22.658],[4.113,22.667],[4.168,22.674],[4.222,22.679],[4.277,22.685],[4.332,22.69],[4.386,22.697],[4.44,22.706],[4.494,22.718],[4.546,22.735],[4.595,22.759],[4.638,22.793],[4.671,22.837],[4.69,22.888],[4.696,22.943],[4.692,22.997],[4.682,23.051],[4.666,23.104],[4.646,23.155],[4.622,23.204],[4.593,23.251],[4.56,23.295],[4.523,23.335],[4.482,23.372],[4.437,23.403],[4.389,23.429],[4.338,23.45],[4.285,23.466],[4.232,23.479],[4.178,23.489],[4.124,23.497],[4.069,23.503],[4.015,23.509],[3.96,23.516],[3.906,23.524],[3.852,23.534],[3.799,23.548],[3.747,23.566],[3.697,23.59],[3.651,23.62],[3.61,23.656],[3.574,23.697],[3.544,23.743],[3.519,23.792],[3.497,23.842],[3.478,23.894],[3.462,23.946],[3.447,23.999],[3.433,24.052],[3.419,24.105],[3.405,24.158],[3.39,24.211],[3.373,24.263],[3.354,24.315],[3.332,24.365],[3.306,24.414],[3.276,24.459],[3.24,24.501],[3.198,24.537],[3.152,24.566],[3.102,24.588],[3.049,24.602],[2.994,24.608],[2.939,24.606],[2.885,24.596],[2.833,24.579],[2.784,24.554],[2.741,24.521],[2.704,24.48],[2.676,24.433],[2.655,24.382],[2.642,24.329],[2.634,24.275],[2.631,24.22],[2.63,24.165],[2.631,24.11],[2.631,24.055],[2.631,24],[2.627,23.946],[2.619,23.891],[2.605,23.838],[2.584,23.788],[2.554,23.742],[2.515,23.703],[2.47,23.672],[2.421,23.648],[2.369,23.63],[2.315,23.618],[2.261,23.61],[2.206,23.605],[2.151,23.603],[2.097,23.603],[2.042,23.605],[1.987,23.609],[1.932,23.614],[1.878,23.62],[1.823,23.627],[1.769,23.636],[1.715,23.645],[1.661,23.654],[1.607,23.664],[1.553,23.674],[1.499,23.684],[1.445,23.694],[1.391,23.703],[1.336,23.713],[1.282,23.722],[1.228,23.73],[1.174,23.739],[1.119,23.746],[1.065,23.754],[1.011,23.762],[.956,23.769],[.902,23.777],[.848,23.785],[.793,23.792],[.739,23.799],[.684,23.806],[.63,23.812],[.575,23.817],[.52,23.821],[.465,23.824],[.41,23.825],[.356,23.825],[.301,23.823],[.246,23.818],[.192,23.81],[.138,23.797],[.087,23.779],[.039,23.752],[-.002,23.716],[-.032,23.67],[-.05,23.618],[-.055,23.563],[-.051,23.509],[-.039,23.455],[-.02,23.404],[.005,23.355],[.033,23.308],[.066,23.264],[.103,23.223],[.142,23.185],[.185,23.15],[.229,23.118],[.276,23.088],[.324,23.062],[.373,23.038],[.424,23.017],[.476,22.999],[.529,22.984],[.582,22.971],[.636,22.961],[.69,22.952],[.745,22.946],[.799,22.941],[.854,22.938],[.909,22.935],[.964,22.933],[1.019,22.932],[1.074,22.931],[1.129,22.931],[1.184,22.93],[1.238,22.93],[1.293,22.929],[1.348,22.928],[1.403,22.926],[1.458,22.924],[1.513,22.922],[1.568,22.918],[1.622,22.914],[1.677,22.909],[1.732,22.903],[1.786,22.897],[1.841,22.89],[1.895,22.884],[1.95,22.877],[2.004,22.871],[2.059,22.865],[2.114,22.859],[2.168,22.854],[2.223,22.848],[2.277,22.842],[2.332,22.834],[2.386,22.825],[2.439,22.812],[2.491,22.795],[2.541,22.772],[2.588,22.743],[2.629,22.707],[2.663,22.664],[2.691,22.617],[2.712,22.566],[2.728,22.514],[2.741,22.46],[2.752,22.406],[2.761,22.352],[2.771,22.298],[2.781,22.244],[2.792,22.191],[2.806,22.137],[2.823,22.085],[2.842,22.034],[2.865,21.984],[2.892,21.936],[2.922,21.89],[2.956,21.847],[2.993,21.806],[3.033,21.769],[3.077,21.735],[3.123,21.707],[3.173,21.683],[3.226,21.668],[3.28,21.664],[3.334,21.673]],[[-2.307,19.816],[-2.27,19.857],[-2.243,19.904],[-2.222,19.956],[-2.207,20.008],[-2.194,20.062],[-2.183,20.116],[-2.174,20.17],[-2.165,20.225],[-2.157,20.279],[-2.149,20.334],[-2.141,20.388],[-2.134,20.443],[-2.127,20.497],[-2.121,20.552],[-2.115,20.607],[-2.111,20.662],[-2.107,20.717],[-2.103,20.772],[-2.1,20.827],[-2.097,20.882],[-2.094,20.937],[-2.09,20.992],[-2.086,21.047],[-2.081,21.102],[-2.077,21.157],[-2.071,21.211],[-2.066,21.266],[-2.061,21.321],[-2.055,21.376],[-2.051,21.431],[-2.046,21.486],[-2.042,21.541],[-2.039,21.596],[-2.036,21.651],[-2.033,21.706],[-2.03,21.761],[-2.027,21.816],[-2.025,21.871],[-2.023,21.926],[-2.022,21.981],[-2.02,22.036],[-2.019,22.091],[-2.019,22.146],[-2.018,22.201],[-2.018,22.256],[-2.018,22.312],[-2.018,22.367],[-2.018,22.422],[-2.018,22.477],[-2.018,22.532],[-2.019,22.587],[-2.019,22.642],[-2.021,22.697],[-2.022,22.752],[-2.025,22.807],[-2.028,22.862],[-2.032,22.917],[-2.038,22.972],[-2.044,23.027],[-2.052,23.081],[-2.062,23.136],[-2.073,23.189],[-2.085,23.243],[-2.1,23.296],[-2.116,23.349],[-2.134,23.401],[-2.154,23.452],[-2.177,23.502],[-2.203,23.551],[-2.232,23.598],[-2.264,23.643],[-2.299,23.685],[-2.338,23.724],[-2.38,23.76],[-2.426,23.79],[-2.475,23.815],[-2.527,23.833],[-2.581,23.841],[-2.636,23.838],[-2.689,23.823],[-2.736,23.794],[-2.776,23.756],[-2.807,23.711],[-2.833,23.662],[-2.853,23.611],[-2.869,23.558],[-2.881,23.505],[-2.892,23.451],[-2.9,23.396],[-2.906,23.341],[-2.911,23.286],[-2.915,23.232],[-2.917,23.176],[-2.919,23.121],[-2.921,23.066],[-2.922,23.011],[-2.923,22.956],[-2.924,22.901],[-2.925,22.846],[-2.927,22.791],[-2.929,22.736],[-2.933,22.681],[-2.938,22.626],[-2.946,22.572],[-2.958,22.518],[-2.973,22.465],[-2.995,22.414],[-3.023,22.367],[-3.058,22.325],[-3.1,22.289],[-3.147,22.261],[-3.198,22.24],[-3.251,22.224],[-3.305,22.213],[-3.359,22.205],[-3.414,22.199],[-3.469,22.196],[-3.524,22.193],[-3.579,22.192],[-3.634,22.191],[-3.69,22.19],[-3.745,22.19],[-3.8,22.189],[-3.855,22.189],[-3.91,22.189],[-3.965,22.188],[-4.02,22.188],[-4.075,22.186],[-4.13,22.185],[-4.185,22.183],[-4.24,22.18],[-4.295,22.177],[-4.35,22.172],[-4.405,22.167],[-4.46,22.161],[-4.515,22.155],[-4.569,22.148],[-4.624,22.142],[-4.679,22.135],[-4.734,22.129],[-4.788,22.124],[-4.843,22.12],[-4.898,22.116],[-4.953,22.113],[-5.008,22.111],[-5.063,22.108],[-5.118,22.107],[-5.174,22.105],[-5.229,22.102],[-5.284,22.1],[-5.339,22.096],[-5.394,22.092],[-5.448,22.087],[-5.503,22.082],[-5.558,22.076],[-5.613,22.069],[-5.667,22.062],[-5.722,22.055],[-5.777,22.048],[-5.831,22.041],[-5.886,22.034],[-5.94,22.026],[-5.995,22.018],[-6.049,22.008],[-6.102,21.994],[-6.155,21.976],[-6.204,21.952],[-6.247,21.918],[-6.281,21.875],[-6.303,21.825],[-6.312,21.77],[-6.311,21.715],[-6.302,21.661],[-6.286,21.608],[-6.264,21.558],[-6.238,21.509],[-6.208,21.463],[-6.174,21.42],[-6.137,21.379],[-6.097,21.341],[-6.055,21.306],[-6.01,21.274],[-5.962,21.246],[-5.913,21.221],[-5.862,21.201],[-5.809,21.185],[-5.755,21.173],[-5.701,21.166],[-5.646,21.162],[-5.591,21.162],[-5.536,21.164],[-5.481,21.168],[-5.426,21.174],[-5.371,21.181],[-5.317,21.189],[-5.262,21.197],[-5.208,21.205],[-5.153,21.214],[-5.099,21.222],[-5.045,21.231],[-4.99,21.24],[-4.936,21.248],[-4.881,21.257],[-4.827,21.265],[-4.772,21.272],[-4.718,21.28],[-4.663,21.288],[-4.609,21.295],[-4.554,21.303],[-4.499,21.31],[-4.445,21.318],[-4.39,21.325],[-4.336,21.332],[-4.281,21.339],[-4.226,21.345],[-4.171,21.35],[-4.116,21.354],[-4.061,21.357],[-4.006,21.359],[-3.951,21.36],[-3.896,21.36],[-3.841,21.359],[-3.786,21.358],[-3.731,21.355],[-3.676,21.352],[-3.621,21.347],[-3.566,21.341],[-3.511,21.334],[-3.457,21.327],[-3.402,21.318],[-3.348,21.308],[-3.294,21.297],[-3.241,21.284],[-3.188,21.27],[-3.136,21.252],[-3.085,21.229],[-3.037,21.202],[-2.994,21.168],[-2.957,21.128],[-2.927,21.081],[-2.906,21.031],[-2.891,20.978],[-2.883,20.923],[-2.879,20.868],[-2.879,20.813],[-2.881,20.758],[-2.885,20.703],[-2.889,20.648],[-2.892,20.593],[-2.895,20.538],[-2.897,20.483],[-2.896,20.428],[-2.892,20.373],[-2.885,20.318],[-2.875,20.264],[-2.861,20.211],[-2.844,20.159],[-2.822,20.108],[-2.796,20.06],[-2.766,20.013],[-2.732,19.97],[-2.695,19.929],[-2.655,19.891],[-2.611,19.858],[-2.565,19.828],[-2.516,19.804],[-2.463,19.786],[-2.409,19.78],[-2.355,19.789]],[[2.836,17.96],[2.89,17.972],[2.943,17.986],[2.996,18.002],[3.048,18.02],[3.099,18.041],[3.149,18.064],[3.197,18.09],[3.244,18.12],[3.288,18.152],[3.33,18.187],[3.37,18.226],[3.407,18.266],[3.443,18.308],[3.476,18.352],[3.507,18.397],[3.537,18.444],[3.564,18.491],[3.59,18.54],[3.614,18.589],[3.636,18.64],[3.656,18.691],[3.673,18.744],[3.686,18.797],[3.697,18.851],[3.703,18.906],[3.706,18.961],[3.705,19.016],[3.7,19.07],[3.69,19.125],[3.677,19.178],[3.661,19.231],[3.641,19.282],[3.619,19.332],[3.594,19.381],[3.567,19.429],[3.538,19.476],[3.508,19.522],[3.477,19.568],[3.445,19.613],[3.412,19.657],[3.38,19.701],[3.347,19.746],[3.316,19.791],[3.286,19.837],[3.26,19.886],[3.239,19.936],[3.228,19.99],[3.232,20.045],[3.257,20.093],[3.298,20.131],[3.346,20.157],[3.398,20.175],[3.451,20.187],[3.506,20.196],[3.56,20.202],[3.615,20.206],[3.67,20.209],[3.725,20.211],[3.78,20.212],[3.835,20.212],[3.89,20.213],[3.946,20.213],[4.001,20.213],[4.056,20.213],[4.111,20.213],[4.166,20.213],[4.221,20.213],[4.276,20.213],[4.331,20.213],[4.386,20.213],[4.441,20.214],[4.496,20.214],[4.551,20.214],[4.606,20.214],[4.661,20.215],[4.716,20.217],[4.771,20.218],[4.826,20.221],[4.881,20.225],[4.936,20.231],[4.99,20.24],[5.044,20.251],[5.097,20.266],[5.148,20.286],[5.196,20.313],[5.239,20.347],[5.275,20.389],[5.301,20.437],[5.315,20.49],[5.317,20.545],[5.309,20.599],[5.292,20.652],[5.267,20.701],[5.236,20.746],[5.199,20.787],[5.159,20.824],[5.114,20.857],[5.068,20.886],[5.019,20.911],[4.968,20.933],[4.916,20.952],[4.864,20.968],[4.811,20.982],[4.757,20.993],[4.703,21.003],[4.648,21.011],[4.594,21.018],[4.539,21.023],[4.484,21.027],[4.429,21.03],[4.374,21.033],[4.319,21.035],[4.264,21.037],[4.209,21.039],[4.154,21.042],[4.099,21.044],[4.044,21.048],[3.989,21.052],[3.934,21.057],[3.88,21.062],[3.825,21.068],[3.77,21.075],[3.716,21.082],[3.661,21.088],[3.606,21.094],[3.551,21.1],[3.497,21.104],[3.442,21.108],[3.387,21.111],[3.332,21.114],[3.277,21.115],[3.222,21.117],[3.167,21.118],[3.112,21.118],[3.057,21.119],[3.002,21.119],[2.947,21.119],[2.891,21.119],[2.836,21.119],[2.781,21.119],[2.726,21.119],[2.671,21.119],[2.616,21.119],[2.561,21.119],[2.506,21.119],[2.451,21.119],[2.396,21.119],[2.341,21.12],[2.286,21.12],[2.231,21.121],[2.176,21.122],[2.121,21.124],[2.066,21.126],[2.011,21.129],[1.956,21.132],[1.901,21.137],[1.846,21.142],[1.792,21.148],[1.737,21.154],[1.682,21.161],[1.628,21.167],[1.573,21.174],[1.518,21.18],[1.463,21.185],[1.409,21.189],[1.354,21.192],[1.299,21.195],[1.244,21.197],[1.189,21.198],[1.134,21.199],[1.079,21.199],[1.024,21.198],[.969,21.196],[.914,21.193],[.859,21.189],[.804,21.182],[.75,21.172],[.697,21.157],[.646,21.136],[.6,21.106],[.563,21.066],[.536,21.018],[.523,20.965],[.521,20.91],[.528,20.855],[.542,20.802],[.562,20.751],[.587,20.702],[.616,20.655],[.648,20.611],[.684,20.569],[.723,20.53],[.764,20.494],[.808,20.46],[.854,20.43],[.902,20.404],[.952,20.38],[1.003,20.36],[1.056,20.343],[1.109,20.328],[1.162,20.315],[1.216,20.303],[1.27,20.293],[1.324,20.283],[1.378,20.273],[1.432,20.262],[1.486,20.251],[1.54,20.238],[1.593,20.224],[1.646,20.208],[1.698,20.191],[1.749,20.172],[1.8,20.151],[1.85,20.128],[1.9,20.104],[1.948,20.078],[1.996,20.051],[2.043,20.023],[2.09,19.993],[2.136,19.963],[2.181,19.932],[2.226,19.9],[2.271,19.867],[2.314,19.834],[2.357,19.8],[2.4,19.764],[2.441,19.728],[2.482,19.691],[2.522,19.653],[2.561,19.614],[2.599,19.574],[2.635,19.533],[2.67,19.491],[2.702,19.446],[2.732,19.4],[2.758,19.351],[2.778,19.3],[2.791,19.247],[2.795,19.192],[2.787,19.138],[2.768,19.086],[2.739,19.04],[2.702,18.999],[2.659,18.964],[2.613,18.934],[2.565,18.907],[2.516,18.883],[2.466,18.861],[2.415,18.84],[2.363,18.82],[2.312,18.801],[2.26,18.782],[2.208,18.764],[2.155,18.747],[2.103,18.732],[2.05,18.717],[1.996,18.704],[1.942,18.693],[1.888,18.683],[1.834,18.676],[1.779,18.67],[1.724,18.666],[1.669,18.664],[1.614,18.664],[1.559,18.665],[1.504,18.668],[1.449,18.672],[1.394,18.677],[1.339,18.682],[1.285,18.688],[1.23,18.694],[1.175,18.698],[1.12,18.702],[1.065,18.704],[1.01,18.703],[.955,18.7],[.901,18.692],[.847,18.68],[.795,18.663],[.745,18.639],[.7,18.607],[.662,18.568],[.633,18.521],[.616,18.469],[.61,18.414],[.614,18.36],[.628,18.306],[.649,18.256],[.676,18.208],[.708,18.163],[.745,18.122],[.785,18.084],[.829,18.051],[.875,18.021],[.924,17.996],[.975,17.974],[1.027,17.957],[1.08,17.943],[1.134,17.933],[1.189,17.925],[1.243,17.919],[1.298,17.915],[1.353,17.913],[1.408,17.911],[1.463,17.91],[1.518,17.909],[1.573,17.908],[1.628,17.908],[1.683,17.908],[1.738,17.908],[1.793,17.908],[1.848,17.908],[1.904,17.908],[1.959,17.908],[2.014,17.908],[2.069,17.908],[2.124,17.908],[2.179,17.909],[2.234,17.909],[2.289,17.91],[2.344,17.911],[2.399,17.912],[2.454,17.915],[2.509,17.918],[2.564,17.922],[2.619,17.927],[2.673,17.933],[2.728,17.941],[2.782,17.95]],[[11.695,19.404],[11.739,19.436],[11.776,19.477],[11.805,19.524],[11.823,19.575],[11.831,19.63],[11.829,19.684],[11.82,19.739],[11.803,19.791],[11.781,19.841],[11.753,19.888],[11.72,19.932],[11.683,19.973],[11.643,20.011],[11.6,20.045],[11.555,20.076],[11.507,20.103],[11.457,20.127],[11.407,20.148],[11.355,20.166],[11.302,20.181],[11.249,20.194],[11.195,20.206],[11.141,20.216],[11.087,20.226],[11.032,20.234],[10.978,20.243],[10.924,20.251],[10.869,20.259],[10.815,20.266],[10.76,20.273],[10.706,20.279],[10.651,20.285],[10.596,20.29],[10.541,20.295],[10.487,20.301],[10.432,20.306],[10.377,20.312],[10.323,20.318],[10.268,20.324],[10.214,20.331],[10.159,20.338],[10.104,20.345],[10.05,20.351],[9.995,20.357],[9.941,20.363],[9.886,20.368],[9.831,20.372],[9.776,20.377],[9.721,20.381],[9.667,20.385],[9.612,20.39],[9.557,20.395],[9.502,20.4],[9.448,20.407],[9.393,20.413],[9.339,20.42],[9.284,20.427],[9.23,20.433],[9.175,20.439],[9.12,20.445],[9.065,20.45],[9.011,20.454],[8.956,20.459],[8.901,20.463],[8.846,20.467],[8.792,20.472],[8.737,20.477],[8.682,20.482],[8.627,20.489],[8.573,20.495],[8.518,20.502],[8.464,20.51],[8.409,20.517],[8.355,20.523],[8.3,20.53],[8.246,20.537],[8.191,20.543],[8.136,20.549],[8.082,20.556],[8.027,20.563],[7.973,20.57],[7.918,20.578],[7.864,20.586],[7.81,20.594],[7.755,20.602],[7.701,20.611],[7.647,20.62],[7.592,20.628],[7.538,20.636],[7.484,20.643],[7.429,20.65],[7.374,20.655],[7.319,20.658],[7.264,20.658],[7.21,20.654],[7.156,20.642],[7.105,20.623],[7.059,20.592],[7.025,20.55],[7.005,20.499],[7,20.444],[7.006,20.389],[7.021,20.337],[7.043,20.286],[7.07,20.239],[7.103,20.194],[7.139,20.153],[7.179,20.116],[7.223,20.083],[7.27,20.054],[7.319,20.029],[7.37,20.008],[7.422,19.99],[7.475,19.975],[7.528,19.961],[7.581,19.949],[7.635,19.939],[7.689,19.928],[7.743,19.918],[7.798,19.909],[7.852,19.9],[7.906,19.891],[7.96,19.882],[8.014,19.873],[8.069,19.864],[8.123,19.854],[8.177,19.845],[8.231,19.836],[8.286,19.827],[8.34,19.818],[8.394,19.809],[8.448,19.8],[8.502,19.791],[8.557,19.782],[8.611,19.773],[8.665,19.764],[8.719,19.755],[8.774,19.746],[8.828,19.737],[8.882,19.728],[8.936,19.719],[8.99,19.71],[9.045,19.701],[9.099,19.692],[9.153,19.684],[9.208,19.675],[9.262,19.667],[9.316,19.659],[9.371,19.651],[9.425,19.643],[9.48,19.636],[9.534,19.628],[9.588,19.62],[9.643,19.612],[9.697,19.605],[9.752,19.597],[9.806,19.589],[9.86,19.581],[9.915,19.573],[9.969,19.565],[10.024,19.557],[10.078,19.55],[10.133,19.542],[10.187,19.534],[10.241,19.525],[10.295,19.516],[10.35,19.507],[10.404,19.497],[10.458,19.487],[10.512,19.476],[10.566,19.465],[10.619,19.454],[10.673,19.443],[10.727,19.431],[10.781,19.42],[10.834,19.408],[10.888,19.396],[10.942,19.384],[10.996,19.373],[11.05,19.363],[11.104,19.353],[11.158,19.345],[11.213,19.338],[11.267,19.333],[11.322,19.33],[11.377,19.33],[11.432,19.332],[11.487,19.337],[11.541,19.346],[11.594,19.36],[11.646,19.378]],[[-2.258,17.291],[-2.227,17.336],[-2.21,17.388],[-2.204,17.443],[-2.209,17.497],[-2.222,17.551],[-2.24,17.603],[-2.265,17.652],[-2.294,17.699],[-2.327,17.743],[-2.365,17.783],[-2.406,17.819],[-2.451,17.851],[-2.499,17.878],[-2.549,17.902],[-2.6,17.922],[-2.653,17.939],[-2.706,17.953],[-2.759,17.965],[-2.813,17.976],[-2.868,17.986],[-2.922,17.995],[-2.976,18.003],[-3.031,18.012],[-3.085,18.021],[-3.139,18.03],[-3.194,18.04],[-3.248,18.05],[-3.302,18.062],[-3.355,18.073],[-3.409,18.086],[-3.462,18.101],[-3.515,18.117],[-3.567,18.136],[-3.617,18.158],[-3.665,18.184],[-3.711,18.216],[-3.751,18.253],[-3.784,18.297],[-3.809,18.346],[-3.824,18.399],[-3.829,18.454],[-3.826,18.509],[-3.816,18.563],[-3.8,18.615],[-3.776,18.665],[-3.747,18.711],[-3.71,18.752],[-3.666,18.786],[-3.618,18.812],[-3.566,18.83],[-3.512,18.841],[-3.457,18.846],[-3.402,18.846],[-3.347,18.843],[-3.292,18.838],[-3.238,18.83],[-3.183,18.822],[-3.129,18.813],[-3.075,18.803],[-3.021,18.794],[-2.966,18.785],[-2.912,18.776],[-2.857,18.768],[-2.803,18.761],[-2.748,18.755],[-2.693,18.75],[-2.638,18.747],[-2.583,18.745],[-2.528,18.745],[-2.473,18.748],[-2.418,18.753],[-2.364,18.762],[-2.31,18.776],[-2.259,18.795],[-2.212,18.823],[-2.171,18.861],[-2.143,18.908],[-2.129,18.961],[-2.129,19.016],[-2.14,19.07],[-2.16,19.121],[-2.186,19.169],[-2.219,19.214],[-2.256,19.254],[-2.297,19.291],[-2.341,19.323],[-2.389,19.352],[-2.438,19.377],[-2.488,19.398],[-2.54,19.418],[-2.592,19.434],[-2.645,19.449],[-2.699,19.463],[-2.752,19.475],[-2.806,19.487],[-2.86,19.497],[-2.915,19.507],[-2.969,19.516],[-3.023,19.525],[-3.078,19.533],[-3.132,19.54],[-3.187,19.547],[-3.242,19.553],[-3.296,19.56],[-3.351,19.566],[-3.406,19.573],[-3.46,19.58],[-3.515,19.588],[-3.569,19.596],[-3.624,19.604],[-3.678,19.613],[-3.733,19.622],[-3.787,19.63],[-3.842,19.639],[-3.896,19.648],[-3.95,19.657],[-4.005,19.666],[-4.059,19.675],[-4.113,19.684],[-4.168,19.694],[-4.222,19.703],[-4.276,19.712],[-4.331,19.721],[-4.385,19.73],[-4.439,19.739],[-4.494,19.748],[-4.548,19.757],[-4.602,19.766],[-4.656,19.776],[-4.711,19.785],[-4.765,19.794],[-4.819,19.804],[-4.873,19.815],[-4.927,19.825],[-4.981,19.837],[-5.035,19.849],[-5.089,19.862],[-5.142,19.875],[-5.195,19.889],[-5.249,19.903],[-5.302,19.917],[-5.355,19.931],[-5.408,19.945],[-5.462,19.958],[-5.515,19.971],[-5.569,19.983],[-5.623,19.994],[-5.677,20.003],[-5.732,20.011],[-5.787,20.018],[-5.842,20.021],[-5.897,20.022],[-5.952,20.02],[-6.006,20.013],[-6.06,20],[-6.111,19.979],[-6.155,19.947],[-6.189,19.904],[-6.209,19.853],[-6.213,19.798],[-6.206,19.743],[-6.191,19.691],[-6.169,19.64],[-6.142,19.592],[-6.112,19.546],[-6.078,19.503],[-6.041,19.462],[-6.002,19.423],[-5.96,19.387],[-5.916,19.354],[-5.87,19.324],[-5.822,19.296],[-5.773,19.272],[-5.722,19.25],[-5.67,19.231],[-5.618,19.215],[-5.565,19.2],[-5.511,19.188],[-5.457,19.177],[-5.403,19.168],[-5.348,19.159],[-5.294,19.152],[-5.239,19.144],[-5.185,19.137],[-5.13,19.13],[-5.075,19.121],[-5.021,19.112],[-4.967,19.101],[-4.914,19.089],[-4.861,19.073],[-4.809,19.055],[-4.758,19.033],[-4.71,19.007],[-4.665,18.975],[-4.625,18.937],[-4.591,18.894],[-4.565,18.845],[-4.546,18.794],[-4.536,18.74],[-4.533,18.685],[-4.537,18.63],[-4.55,18.576],[-4.572,18.526],[-4.604,18.481],[-4.645,18.444],[-4.693,18.418],[-4.745,18.401],[-4.8,18.391],[-4.854,18.387],[-4.91,18.387],[-4.965,18.389],[-5.02,18.392],[-5.074,18.397],[-5.129,18.402],[-5.184,18.407],[-5.239,18.413],[-5.294,18.42],[-5.348,18.426],[-5.403,18.433],[-5.458,18.44],[-5.512,18.447],[-5.567,18.453],[-5.622,18.458],[-5.677,18.463],[-5.732,18.466],[-5.787,18.466],[-5.842,18.465],[-5.897,18.46],[-5.951,18.452],[-6.005,18.439],[-6.056,18.42],[-6.104,18.392],[-6.144,18.355],[-6.173,18.308],[-6.187,18.255],[-6.188,18.2],[-6.178,18.146],[-6.161,18.094],[-6.137,18.044],[-6.109,17.997],[-6.076,17.953],[-6.04,17.911],[-6,17.873],[-5.958,17.838],[-5.913,17.806],[-5.866,17.778],[-5.816,17.753],[-5.766,17.732],[-5.714,17.713],[-5.661,17.698],[-5.607,17.684],[-5.554,17.673],[-5.499,17.663],[-5.445,17.653],[-5.391,17.645],[-5.336,17.636],[-5.282,17.627],[-5.228,17.619],[-5.173,17.61],[-5.119,17.601],[-5.065,17.592],[-5.01,17.583],[-4.956,17.574],[-4.901,17.565],[-4.847,17.556],[-4.793,17.547],[-4.738,17.538],[-4.684,17.529],[-4.63,17.52],[-4.575,17.511],[-4.521,17.502],[-4.467,17.492],[-4.413,17.483],[-4.358,17.474],[-4.304,17.464],[-4.25,17.454],[-4.196,17.444],[-4.141,17.434],[-4.087,17.424],[-4.033,17.414],[-3.979,17.403],[-3.925,17.393],[-3.871,17.383],[-3.817,17.373],[-3.763,17.363],[-3.708,17.354],[-3.654,17.344],[-3.6,17.335],[-3.545,17.326],[-3.491,17.317],[-3.437,17.308],[-3.382,17.298],[-3.328,17.289],[-3.274,17.28],[-3.219,17.271],[-3.165,17.262],[-3.111,17.253],[-3.056,17.244],[-3.002,17.236],[-2.948,17.227],[-2.893,17.219],[-2.839,17.211],[-2.784,17.204],[-2.729,17.198],[-2.674,17.194],[-2.619,17.191],[-2.564,17.191],[-2.509,17.193],[-2.454,17.2],[-2.401,17.211],[-2.349,17.229],[-2.3,17.255]],[[-7.229,16.413],[-7.188,16.449],[-7.16,16.496],[-7.148,16.549],[-7.151,16.604],[-7.164,16.657],[-7.185,16.708],[-7.211,16.756],[-7.242,16.802],[-7.275,16.846],[-7.31,16.888],[-7.346,16.93],[-7.383,16.97],[-7.421,17.01],[-7.459,17.05],[-7.497,17.089],[-7.536,17.128],[-7.574,17.168],[-7.612,17.207],[-7.651,17.247],[-7.688,17.287],[-7.726,17.327],[-7.763,17.368],[-7.8,17.409],[-7.836,17.45],[-7.872,17.492],[-7.907,17.533],[-7.943,17.575],[-7.978,17.618],[-8.014,17.66],[-8.049,17.701],[-8.085,17.743],[-8.121,17.785],[-8.157,17.827],[-8.192,17.868],[-8.227,17.911],[-8.261,17.954],[-8.293,17.999],[-8.321,18.046],[-8.344,18.096],[-8.359,18.149],[-8.362,18.204],[-8.352,18.258],[-8.33,18.308],[-8.3,18.354],[-8.265,18.396],[-8.226,18.435],[-8.185,18.471],[-8.142,18.506],[-8.098,18.539],[-8.053,18.571],[-8.008,18.603],[-7.963,18.633],[-7.916,18.663],[-7.87,18.692],[-7.822,18.72],[-7.775,18.747],[-7.726,18.773],[-7.677,18.798],[-7.628,18.822],[-7.578,18.846],[-7.528,18.868],[-7.478,18.892],[-7.429,18.916],[-7.381,18.942],[-7.334,18.972],[-7.291,19.006],[-7.253,19.045],[-7.222,19.09],[-7.199,19.14],[-7.185,19.193],[-7.18,19.248],[-7.184,19.303],[-7.196,19.356],[-7.216,19.408],[-7.243,19.456],[-7.276,19.499],[-7.317,19.536],[-7.363,19.566],[-7.413,19.587],[-7.467,19.6],[-7.522,19.605],[-7.576,19.603],[-7.631,19.597],[-7.685,19.586],[-7.738,19.574],[-7.791,19.559],[-7.844,19.543],[-7.896,19.526],[-7.948,19.508],[-8,19.489],[-8.051,19.469],[-8.102,19.448],[-8.153,19.427],[-8.203,19.404],[-8.252,19.38],[-8.301,19.355],[-8.35,19.33],[-8.398,19.304],[-8.447,19.278],[-8.495,19.251],[-8.543,19.225],[-8.591,19.198],[-8.64,19.172],[-8.688,19.146],[-8.737,19.121],[-8.786,19.095],[-8.835,19.071],[-8.884,19.046],[-8.933,19.022],[-8.983,18.998],[-9.033,18.975],[-9.083,18.953],[-9.134,18.932],[-9.185,18.913],[-9.237,18.895],[-9.29,18.879],[-9.343,18.865],[-9.397,18.854],[-9.451,18.845],[-9.506,18.839],[-9.561,18.835],[-9.616,18.834],[-9.671,18.835],[-9.726,18.837],[-9.78,18.842],[-9.835,18.847],[-9.89,18.854],[-9.944,18.862],[-9.998,18.87],[-10.053,18.879],[-10.107,18.889],[-10.161,18.899],[-10.215,18.91],[-10.268,18.921],[-10.322,18.933],[-10.375,18.946],[-10.429,18.96],[-10.482,18.974],[-10.535,18.987],[-10.589,19.001],[-10.642,19.013],[-10.696,19.025],[-10.749,19.037],[-10.803,19.047],[-10.857,19.057],[-10.912,19.067],[-10.966,19.077],[-11.02,19.087],[-11.074,19.097],[-11.127,19.108],[-11.181,19.12],[-11.235,19.133],[-11.288,19.145],[-11.342,19.158],[-11.395,19.17],[-11.449,19.181],[-11.503,19.191],[-11.558,19.2],[-11.612,19.207],[-11.667,19.212],[-11.722,19.214],[-11.777,19.213],[-11.831,19.207],[-11.885,19.194],[-11.935,19.172],[-11.978,19.139],[-12.011,19.094],[-12.029,19.043],[-12.034,18.988],[-12.028,18.933],[-12.015,18.88],[-11.995,18.829],[-11.971,18.779],[-11.943,18.732],[-11.912,18.687],[-11.878,18.644],[-11.841,18.603],[-11.801,18.565],[-11.759,18.53],[-11.715,18.497],[-11.669,18.467],[-11.621,18.44],[-11.572,18.416],[-11.521,18.394],[-11.47,18.374],[-11.418,18.356],[-11.366,18.339],[-11.313,18.324],[-11.26,18.309],[-11.207,18.296],[-11.153,18.283],[-11.1,18.27],[-11.046,18.258],[-10.993,18.245],[-10.939,18.233],[-10.886,18.221],[-10.832,18.208],[-10.779,18.195],[-10.725,18.181],[-10.672,18.167],[-10.619,18.152],[-10.566,18.138],[-10.513,18.123],[-10.46,18.108],[-10.408,18.093],[-10.355,18.078],[-10.302,18.062],[-10.249,18.047],[-10.197,18.031],[-10.144,18.014],[-10.092,17.997],[-10.04,17.978],[-9.989,17.959],[-9.937,17.939],[-9.887,17.918],[-9.836,17.897],[-9.786,17.874],[-9.736,17.851],[-9.686,17.828],[-9.637,17.804],[-9.588,17.779],[-9.539,17.754],[-9.49,17.728],[-9.442,17.702],[-9.394,17.676],[-9.346,17.649],[-9.298,17.621],[-9.251,17.594],[-9.203,17.566],[-9.156,17.537],[-9.109,17.508],[-9.063,17.479],[-9.017,17.449],[-8.971,17.419],[-8.926,17.388],[-8.881,17.355],[-8.837,17.322],[-8.794,17.288],[-8.752,17.253],[-8.71,17.218],[-8.669,17.181],[-8.628,17.144],[-8.588,17.107],[-8.547,17.07],[-8.507,17.032],[-8.467,16.995],[-8.426,16.958],[-8.385,16.921],[-8.343,16.885],[-8.301,16.85],[-8.259,16.815],[-8.216,16.78],[-8.173,16.747],[-8.129,16.713],[-8.085,16.681],[-8.04,16.649],[-7.994,16.618],[-7.948,16.588],[-7.901,16.56],[-7.853,16.532],[-7.805,16.507],[-7.756,16.483],[-7.705,16.46],[-7.654,16.44],[-7.603,16.421],[-7.55,16.405],[-7.497,16.392],[-7.443,16.382],[-7.388,16.377],[-7.333,16.379],[-7.279,16.39]],[[8.301,16.518],[8.356,16.512],[8.411,16.508],[8.466,16.506],[8.521,16.505],[8.576,16.506],[8.631,16.506],[8.686,16.508],[8.741,16.509],[8.796,16.511],[8.851,16.514],[8.906,16.518],[8.961,16.523],[9.015,16.53],[9.07,16.538],[9.124,16.549],[9.177,16.562],[9.23,16.579],[9.281,16.598],[9.332,16.619],[9.381,16.644],[9.429,16.671],[9.475,16.701],[9.519,16.734],[9.561,16.77],[9.601,16.808],[9.638,16.849],[9.671,16.892],[9.701,16.939],[9.727,16.987],[9.75,17.037],[9.768,17.089],[9.784,17.142],[9.795,17.196],[9.804,17.25],[9.81,17.305],[9.813,17.36],[9.813,17.415],[9.81,17.47],[9.806,17.525],[9.799,17.579],[9.79,17.634],[9.779,17.688],[9.767,17.741],[9.752,17.794],[9.736,17.847],[9.717,17.899],[9.697,17.95],[9.674,18],[9.649,18.049],[9.621,18.097],[9.592,18.143],[9.56,18.188],[9.527,18.232],[9.492,18.274],[9.455,18.315],[9.418,18.355],[9.379,18.394],[9.339,18.432],[9.297,18.469],[9.255,18.504],[9.212,18.538],[9.167,18.57],[9.121,18.6],[9.074,18.628],[9.025,18.655],[8.976,18.679],[8.926,18.702],[8.875,18.722],[8.823,18.742],[8.771,18.759],[8.719,18.776],[8.666,18.791],[8.613,18.806],[8.559,18.819],[8.505,18.831],[8.452,18.842],[8.397,18.852],[8.343,18.861],[8.288,18.868],[8.234,18.873],[8.179,18.876],[8.124,18.878],[8.069,18.877],[8.014,18.873],[7.959,18.867],[7.905,18.857],[7.851,18.844],[7.799,18.827],[7.748,18.806],[7.699,18.781],[7.652,18.753],[7.606,18.722],[7.563,18.689],[7.521,18.653],[7.481,18.615],[7.443,18.575],[7.408,18.533],[7.374,18.489],[7.343,18.443],[7.316,18.396],[7.292,18.346],[7.271,18.295],[7.254,18.243],[7.24,18.19],[7.23,18.136],[7.222,18.081],[7.217,18.026],[7.214,17.971],[7.212,17.916],[7.212,17.861],[7.214,17.806],[7.217,17.751],[7.221,17.697],[7.228,17.642],[7.236,17.588],[7.247,17.534],[7.26,17.48],[7.276,17.427],[7.294,17.375],[7.315,17.324],[7.338,17.275],[7.364,17.226],[7.392,17.178],[7.422,17.132],[7.453,17.087],[7.487,17.043],[7.522,17.001],[7.558,16.96],[7.596,16.92],[7.635,16.881],[7.676,16.844],[7.717,16.807],[7.76,16.773],[7.804,16.739],[7.848,16.707],[7.894,16.677],[7.941,16.648],[7.99,16.622],[8.039,16.597],[8.089,16.575],[8.141,16.556],[8.193,16.54],[8.247,16.527]],[[8.853,17.233],[8.8,17.218],[8.747,17.208],[8.692,17.202],[8.638,17.2],[8.583,17.202],[8.529,17.208],[8.475,17.218],[8.423,17.232],[8.371,17.25],[8.321,17.272],[8.273,17.298],[8.226,17.326],[8.182,17.359],[8.141,17.394],[8.102,17.432],[8.066,17.474],[8.033,17.517],[8.005,17.564],[7.98,17.613],[7.961,17.664],[7.947,17.716],[7.941,17.771],[7.942,17.825],[7.952,17.879],[7.97,17.93],[7.996,17.978],[8.028,18.022],[8.067,18.061],[8.11,18.094],[8.157,18.122],[8.207,18.143],[8.259,18.159],[8.313,18.169],[8.368,18.172],[8.422,18.17],[8.476,18.162],[8.529,18.15],[8.581,18.133],[8.632,18.113],[8.681,18.09],[8.729,18.063],[8.775,18.034],[8.82,18.003],[8.862,17.968],[8.903,17.932],[8.941,17.893],[8.977,17.851],[9.009,17.807],[9.038,17.761],[9.062,17.712],[9.082,17.661],[9.095,17.608],[9.101,17.554],[9.098,17.499],[9.086,17.446],[9.064,17.396],[9.033,17.351],[8.995,17.312],[8.951,17.28],[8.903,17.254]],[[-9.353,14.348],[-9.3,14.364],[-9.249,14.383],[-9.197,14.403],[-9.147,14.426],[-9.098,14.451],[-9.051,14.478],[-9.004,14.508],[-8.959,14.539],[-8.915,14.573],[-8.874,14.609],[-8.834,14.647],[-8.796,14.687],[-8.76,14.729],[-8.727,14.773],[-8.697,14.819],[-8.669,14.866],[-8.644,14.915],[-8.622,14.965],[-8.602,15.017],[-8.586,15.069],[-8.572,15.123],[-8.562,15.177],[-8.555,15.231],[-8.551,15.286],[-8.55,15.341],[-8.552,15.396],[-8.557,15.451],[-8.564,15.506],[-8.574,15.56],[-8.586,15.614],[-8.6,15.667],[-8.617,15.719],[-8.634,15.771],[-8.654,15.823],[-8.675,15.874],[-8.697,15.924],[-8.72,15.974],[-8.745,16.023],[-8.77,16.072],[-8.797,16.12],[-8.824,16.168],[-8.851,16.216],[-8.879,16.263],[-8.908,16.31],[-8.937,16.357],[-8.967,16.403],[-8.998,16.449],[-9.029,16.494],[-9.062,16.538],[-9.096,16.581],[-9.132,16.624],[-9.169,16.664],[-9.207,16.704],[-9.247,16.742],[-9.287,16.779],[-9.329,16.815],[-9.372,16.849],[-9.415,16.883],[-9.459,16.916],[-9.504,16.948],[-9.55,16.979],[-9.596,17.009],[-9.643,17.037],[-9.691,17.064],[-9.74,17.09],[-9.79,17.113],[-9.84,17.136],[-9.891,17.156],[-9.943,17.175],[-9.995,17.193],[-10.047,17.21],[-10.1,17.225],[-10.153,17.24],[-10.207,17.253],[-10.26,17.265],[-10.314,17.276],[-10.368,17.286],[-10.423,17.295],[-10.477,17.302],[-10.532,17.307],[-10.587,17.31],[-10.642,17.311],[-10.697,17.309],[-10.752,17.305],[-10.807,17.299],[-10.861,17.29],[-10.915,17.278],[-10.968,17.263],[-11.02,17.245],[-11.071,17.224],[-11.12,17.201],[-11.169,17.175],[-11.216,17.146],[-11.261,17.115],[-11.304,17.081],[-11.346,17.045],[-11.386,17.006],[-11.423,16.966],[-11.459,16.924],[-11.493,16.881],[-11.524,16.836],[-11.554,16.79],[-11.582,16.742],[-11.608,16.693],[-11.631,16.644],[-11.652,16.593],[-11.67,16.541],[-11.686,16.488],[-11.699,16.435],[-11.71,16.381],[-11.719,16.326],[-11.727,16.272],[-11.732,16.217],[-11.737,16.162],[-11.739,16.107],[-11.74,16.052],[-11.74,15.997],[-11.737,15.942],[-11.731,15.887],[-11.724,15.833],[-11.714,15.779],[-11.701,15.725],[-11.687,15.672],[-11.67,15.62],[-11.651,15.568],[-11.63,15.517],[-11.607,15.467],[-11.582,15.418],[-11.557,15.369],[-11.529,15.322],[-11.501,15.275],[-11.471,15.228],[-11.439,15.183],[-11.407,15.139],[-11.373,15.095],[-11.337,15.053],[-11.301,15.012],[-11.262,14.973],[-11.223,14.934],[-11.182,14.897],[-11.141,14.861],[-11.098,14.827],[-11.055,14.793],[-11.011,14.76],[-10.966,14.728],[-10.92,14.697],[-10.874,14.666],[-10.828,14.637],[-10.78,14.61],[-10.732,14.583],[-10.683,14.558],[-10.634,14.533],[-10.583,14.511],[-10.533,14.489],[-10.482,14.468],[-10.431,14.448],[-10.379,14.43],[-10.327,14.412],[-10.274,14.395],[-10.222,14.379],[-10.169,14.364],[-10.115,14.35],[-10.062,14.338],[-10.008,14.327],[-9.953,14.318],[-9.899,14.311],[-9.844,14.306],[-9.789,14.302],[-9.734,14.301],[-9.679,14.301],[-9.624,14.304],[-9.569,14.308],[-9.515,14.315],[-9.46,14.324],[-9.406,14.335]],[[-9.739,15.109],[-9.794,15.101],[-9.849,15.098],[-9.904,15.101],[-9.959,15.107],[-10.013,15.118],[-10.067,15.131],[-10.119,15.147],[-10.171,15.165],[-10.222,15.186],[-10.273,15.209],[-10.322,15.234],[-10.37,15.261],[-10.417,15.29],[-10.462,15.322],[-10.506,15.355],[-10.548,15.39],[-10.59,15.427],[-10.629,15.465],[-10.667,15.505],[-10.704,15.546],[-10.739,15.589],[-10.771,15.634],[-10.801,15.681],[-10.827,15.729],[-10.849,15.78],[-10.865,15.832],[-10.876,15.887],[-10.878,15.942],[-10.873,15.996],[-10.859,16.05],[-10.836,16.1],[-10.807,16.146],[-10.771,16.188],[-10.73,16.225],[-10.685,16.257],[-10.637,16.284],[-10.586,16.306],[-10.534,16.324],[-10.48,16.337],[-10.426,16.345],[-10.371,16.35],[-10.316,16.35],[-10.261,16.346],[-10.206,16.338],[-10.152,16.326],[-10.099,16.312],[-10.047,16.295],[-9.995,16.275],[-9.944,16.253],[-9.895,16.23],[-9.846,16.204],[-9.798,16.176],[-9.751,16.147],[-9.706,16.116],[-9.661,16.083],[-9.618,16.049],[-9.576,16.013],[-9.536,15.975],[-9.497,15.936],[-9.46,15.896],[-9.425,15.853],[-9.392,15.808],[-9.363,15.761],[-9.339,15.712],[-9.32,15.66],[-9.309,15.606],[-9.306,15.551],[-9.313,15.497],[-9.328,15.444],[-9.351,15.393],[-9.38,15.346],[-9.413,15.303],[-9.451,15.263],[-9.493,15.226],[-9.537,15.194],[-9.584,15.165],[-9.634,15.141],[-9.686,15.122]],[[-5.625,14.187],[-5.571,14.193],[-5.516,14.201],[-5.462,14.211],[-5.409,14.222],[-5.355,14.234],[-5.302,14.247],[-5.248,14.26],[-5.195,14.272],[-5.142,14.285],[-5.088,14.298],[-5.035,14.31],[-4.981,14.322],[-4.928,14.334],[-4.874,14.346],[-4.82,14.357],[-4.767,14.369],[-4.713,14.38],[-4.659,14.391],[-4.605,14.401],[-4.551,14.412],[-4.498,14.423],[-4.444,14.434],[-4.39,14.445],[-4.336,14.456],[-4.283,14.468],[-4.229,14.479],[-4.175,14.491],[-4.122,14.503],[-4.068,14.516],[-4.015,14.528],[-3.962,14.541],[-3.908,14.554],[-3.855,14.567],[-3.802,14.58],[-3.748,14.594],[-3.695,14.607],[-3.642,14.62],[-3.589,14.633],[-3.535,14.647],[-3.482,14.66],[-3.429,14.673],[-3.375,14.686],[-3.322,14.699],[-3.269,14.711],[-3.215,14.724],[-3.162,14.736],[-3.108,14.748],[-3.054,14.76],[-3.001,14.771],[-2.947,14.783],[-2.894,14.795],[-2.84,14.807],[-2.786,14.819],[-2.733,14.832],[-2.68,14.845],[-2.627,14.859],[-2.574,14.874],[-2.522,14.891],[-2.47,14.91],[-2.42,14.931],[-2.371,14.956],[-2.325,14.986],[-2.283,15.022],[-2.249,15.065],[-2.226,15.114],[-2.215,15.168],[-2.216,15.223],[-2.227,15.276],[-2.244,15.329],[-2.267,15.379],[-2.293,15.427],[-2.323,15.473],[-2.356,15.517],[-2.391,15.559],[-2.428,15.599],[-2.468,15.637],[-2.509,15.674],[-2.551,15.708],[-2.595,15.741],[-2.641,15.772],[-2.687,15.802],[-2.733,15.831],[-2.78,15.859],[-2.828,15.887],[-2.875,15.915],[-2.923,15.942],[-2.97,15.97],[-3.018,15.997],[-3.065,16.025],[-3.113,16.052],[-3.16,16.079],[-3.208,16.106],[-3.256,16.133],[-3.305,16.159],[-3.353,16.185],[-3.402,16.21],[-3.45,16.235],[-3.499,16.26],[-3.548,16.285],[-3.597,16.31],[-3.646,16.334],[-3.695,16.359],[-3.744,16.384],[-3.794,16.408],[-3.843,16.432],[-3.892,16.457],[-3.941,16.481],[-3.991,16.505],[-4.04,16.528],[-4.09,16.552],[-4.14,16.575],[-4.19,16.598],[-4.24,16.62],[-4.29,16.643],[-4.34,16.665],[-4.39,16.688],[-4.44,16.711],[-4.489,16.735],[-4.538,16.759],[-4.587,16.784],[-4.636,16.81],[-4.684,16.836],[-4.732,16.862],[-4.78,16.889],[-4.828,16.915],[-4.876,16.942],[-4.925,16.968],[-4.973,16.994],[-5.022,17.019],[-5.07,17.044],[-5.119,17.069],[-5.168,17.094],[-5.218,17.118],[-5.267,17.141],[-5.317,17.164],[-5.368,17.185],[-5.419,17.205],[-5.471,17.222],[-5.524,17.236],[-5.578,17.246],[-5.633,17.25],[-5.688,17.248],[-5.742,17.238],[-5.793,17.219],[-5.84,17.191],[-5.881,17.155],[-5.913,17.11],[-5.934,17.06],[-5.943,17.006],[-5.941,16.951],[-5.928,16.898],[-5.906,16.848],[-5.877,16.801],[-5.843,16.758],[-5.805,16.719],[-5.764,16.682],[-5.721,16.647],[-5.677,16.615],[-5.632,16.584],[-5.586,16.553],[-5.54,16.523],[-5.494,16.493],[-5.448,16.463],[-5.403,16.432],[-5.358,16.4],[-5.315,16.366],[-5.274,16.33],[-5.235,16.291],[-5.2,16.249],[-5.169,16.204],[-5.143,16.156],[-5.121,16.105],[-5.105,16.053],[-5.093,15.999],[-5.084,15.945],[-5.077,15.891],[-5.073,15.836],[-5.071,15.781],[-5.07,15.726],[-5.071,15.671],[-5.073,15.616],[-5.077,15.562],[-5.083,15.507],[-5.091,15.453],[-5.103,15.399],[-5.119,15.347],[-5.139,15.296],[-5.164,15.247],[-5.195,15.202],[-5.231,15.16],[-5.271,15.123],[-5.315,15.09],[-5.361,15.061],[-5.41,15.035],[-5.46,15.013],[-5.511,14.992],[-5.562,14.973],[-5.613,14.953],[-5.665,14.934],[-5.715,14.912],[-5.764,14.888],[-5.812,14.86],[-5.856,14.827],[-5.896,14.79],[-5.93,14.747],[-5.958,14.7],[-5.979,14.649],[-5.994,14.596],[-6.001,14.542],[-6.001,14.487],[-5.994,14.433],[-5.979,14.38],[-5.957,14.33],[-5.926,14.285],[-5.887,14.247],[-5.84,14.218],[-5.789,14.199],[-5.735,14.188],[-5.68,14.185]],[[-4.127,15.356],[-4.182,15.366],[-4.233,15.389],[-4.277,15.423],[-4.31,15.468],[-4.329,15.521],[-4.332,15.577],[-4.318,15.631],[-4.286,15.676],[-4.238,15.704],[-4.183,15.713],[-4.127,15.709],[-4.073,15.695],[-4.021,15.675],[-3.971,15.649],[-3.924,15.618],[-3.882,15.581],[-3.85,15.536],[-3.841,15.481],[-3.867,15.432],[-3.911,15.398],[-3.962,15.376],[-4.016,15.361],[-4.071,15.354]],[[3.087,16.221],[3.141,16.228],[3.196,16.236],[3.251,16.243],[3.305,16.252],[3.36,16.26],[3.414,16.27],[3.468,16.282],[3.521,16.297],[3.573,16.316],[3.622,16.342],[3.665,16.376],[3.699,16.419],[3.721,16.47],[3.728,16.525],[3.722,16.58],[3.706,16.632],[3.682,16.682],[3.652,16.728],[3.616,16.771],[3.577,16.809],[3.534,16.844],[3.488,16.875],[3.44,16.902],[3.39,16.925],[3.338,16.945],[3.286,16.961],[3.232,16.975],[3.178,16.987],[3.124,16.998],[3.07,17.007],[3.015,17.016],[2.961,17.024],[2.906,17.033],[2.851,17.04],[2.797,17.048],[2.742,17.055],[2.687,17.061],[2.632,17.066],[2.577,17.071],[2.522,17.075],[2.467,17.078],[2.412,17.08],[2.356,17.081],[2.301,17.083],[2.246,17.083],[2.191,17.084],[2.136,17.084],[2.08,17.084],[2.025,17.084],[1.97,17.085],[1.915,17.085],[1.859,17.085],[1.804,17.085],[1.749,17.085],[1.694,17.085],[1.639,17.084],[1.583,17.084],[1.528,17.084],[1.473,17.084],[1.418,17.083],[1.362,17.082],[1.307,17.081],[1.252,17.079],[1.197,17.075],[1.142,17.07],[1.087,17.062],[1.033,17.052],[.98,17.036],[.929,17.014],[.883,16.984],[.846,16.944],[.821,16.895],[.81,16.841],[.812,16.786],[.824,16.732],[.842,16.68],[.866,16.63],[.895,16.583],[.927,16.538],[.963,16.496],[1.001,16.456],[1.042,16.419],[1.085,16.385],[1.131,16.353],[1.178,16.325],[1.227,16.299],[1.277,16.277],[1.329,16.257],[1.382,16.24],[1.435,16.226],[1.489,16.215],[1.543,16.206],[1.598,16.198],[1.653,16.193],[1.708,16.188],[1.763,16.185],[1.818,16.183],[1.874,16.182],[1.929,16.181],[1.984,16.18],[2.039,16.179],[2.095,16.179],[2.15,16.179],[2.205,16.179],[2.26,16.179],[2.315,16.179],[2.371,16.179],[2.426,16.18],[2.481,16.18],[2.536,16.181],[2.592,16.182],[2.647,16.183],[2.702,16.185],[2.757,16.188],[2.812,16.192],[2.867,16.196],[2.922,16.201],[2.977,16.207],[3.032,16.214]],[[5.271,15.82],[5.312,15.856],[5.345,15.9],[5.369,15.95],[5.384,16.003],[5.389,16.058],[5.386,16.113],[5.375,16.167],[5.357,16.22],[5.333,16.269],[5.304,16.316],[5.27,16.359],[5.231,16.399],[5.189,16.435],[5.143,16.465],[5.094,16.489],[5.041,16.507],[4.987,16.516],[4.932,16.516],[4.878,16.504],[4.828,16.481],[4.785,16.446],[4.752,16.402],[4.73,16.351],[4.719,16.297],[4.716,16.242],[4.722,16.187],[4.734,16.134],[4.752,16.081],[4.776,16.031],[4.804,15.984],[4.837,15.939],[4.873,15.898],[4.914,15.861],[4.959,15.829],[5.008,15.803],[5.06,15.785],[5.114,15.776],[5.169,15.779],[5.223,15.793]],[[9.165,13.872],[9.215,13.894],[9.264,13.919],[9.311,13.948],[9.356,13.979],[9.399,14.014],[9.439,14.051],[9.477,14.092],[9.512,14.134],[9.543,14.18],[9.57,14.227],[9.594,14.277],[9.614,14.328],[9.63,14.381],[9.642,14.435],[9.65,14.489],[9.656,14.544],[9.659,14.599],[9.659,14.654],[9.658,14.709],[9.654,14.764],[9.647,14.818],[9.638,14.873],[9.627,14.926],[9.614,14.98],[9.597,15.032],[9.579,15.084],[9.558,15.135],[9.535,15.185],[9.511,15.234],[9.485,15.283],[9.457,15.331],[9.429,15.378],[9.399,15.424],[9.368,15.469],[9.336,15.514],[9.303,15.558],[9.27,15.602],[9.235,15.645],[9.2,15.687],[9.163,15.728],[9.126,15.769],[9.088,15.809],[9.05,15.848],[9.011,15.887],[8.971,15.924],[8.93,15.961],[8.888,15.997],[8.846,16.032],[8.802,16.065],[8.757,16.097],[8.711,16.127],[8.663,16.155],[8.615,16.181],[8.565,16.205],[8.515,16.227],[8.464,16.247],[8.412,16.266],[8.36,16.283],[8.307,16.298],[8.253,16.311],[8.2,16.322],[8.145,16.331],[8.091,16.338],[8.036,16.342],[7.981,16.345],[7.926,16.345],[7.871,16.344],[7.816,16.342],[7.761,16.338],[7.706,16.334],[7.651,16.327],[7.597,16.318],[7.543,16.307],[7.49,16.292],[7.439,16.274],[7.389,16.251],[7.341,16.223],[7.297,16.19],[7.256,16.153],[7.22,16.112],[7.188,16.067],[7.16,16.02],[7.136,15.97],[7.115,15.919],[7.098,15.867],[7.084,15.814],[7.073,15.76],[7.064,15.706],[7.057,15.651],[7.053,15.596],[7.05,15.541],[7.049,15.486],[7.049,15.431],[7.051,15.376],[7.054,15.321],[7.059,15.266],[7.065,15.212],[7.073,15.157],[7.084,15.103],[7.096,15.05],[7.11,14.997],[7.126,14.944],[7.145,14.892],[7.166,14.841],[7.188,14.791],[7.214,14.742],[7.241,14.694],[7.27,14.648],[7.301,14.603],[7.334,14.558],[7.368,14.515],[7.404,14.473],[7.44,14.432],[7.478,14.392],[7.516,14.353],[7.556,14.314],[7.596,14.276],[7.636,14.239],[7.678,14.203],[7.72,14.168],[7.764,14.134],[7.808,14.102],[7.853,14.07],[7.899,14.041],[7.947,14.012],[7.994,13.985],[8.043,13.96],[8.093,13.935],[8.143,13.913],[8.194,13.892],[8.246,13.874],[8.298,13.857],[8.351,13.843],[8.405,13.831],[8.459,13.821],[8.514,13.813],[8.568,13.808],[8.623,13.804],[8.678,13.801],[8.733,13.801],[8.788,13.802],[8.843,13.805],[8.898,13.81],[8.953,13.817],[9.007,13.826],[9.06,13.838],[9.113,13.854]],[[8.777,14.451],[8.723,14.443],[8.669,14.44],[8.614,14.442],[8.56,14.448],[8.506,14.458],[8.453,14.471],[8.4,14.486],[8.348,14.502],[8.296,14.521],[8.245,14.541],[8.195,14.562],[8.146,14.586],[8.097,14.611],[8.05,14.639],[8.005,14.67],[7.962,14.703],[7.921,14.74],[7.883,14.779],[7.848,14.822],[7.818,14.867],[7.792,14.915],[7.771,14.966],[7.756,15.018],[7.745,15.072],[7.74,15.126],[7.741,15.181],[7.748,15.235],[7.762,15.288],[7.781,15.339],[7.808,15.387],[7.841,15.431],[7.88,15.469],[7.925,15.5],[7.973,15.526],[8.024,15.545],[8.077,15.558],[8.132,15.566],[8.186,15.569],[8.241,15.569],[8.295,15.565],[8.35,15.557],[8.403,15.547],[8.456,15.534],[8.509,15.518],[8.56,15.5],[8.611,15.479],[8.66,15.455],[8.708,15.428],[8.754,15.398],[8.797,15.366],[8.839,15.33],[8.878,15.291],[8.914,15.25],[8.947,15.207],[8.977,15.161],[9.004,15.114],[9.028,15.064],[9.048,15.013],[9.063,14.961],[9.074,14.907],[9.079,14.853],[9.078,14.798],[9.07,14.744],[9.055,14.691],[9.032,14.642],[9.003,14.595],[8.967,14.554],[8.926,14.518],[8.88,14.489],[8.83,14.467]],[[3.834,12.595],[3.884,12.616],[3.931,12.646],[3.972,12.682],[4.01,12.722],[4.043,12.766],[4.073,12.812],[4.101,12.859],[4.127,12.908],[4.151,12.957],[4.174,13.007],[4.195,13.058],[4.215,13.109],[4.233,13.161],[4.25,13.214],[4.265,13.267],[4.278,13.32],[4.288,13.374],[4.296,13.429],[4.301,13.483],[4.305,13.538],[4.306,13.593],[4.305,13.648],[4.302,13.703],[4.298,13.758],[4.291,13.813],[4.282,13.867],[4.272,13.921],[4.26,13.975],[4.246,14.028],[4.232,14.081],[4.216,14.134],[4.198,14.186],[4.18,14.238],[4.16,14.289],[4.139,14.34],[4.117,14.39],[4.092,14.44],[4.066,14.488],[4.038,14.535],[4.007,14.581],[3.975,14.625],[3.94,14.668],[3.903,14.708],[3.863,14.747],[3.822,14.783],[3.778,14.816],[3.732,14.847],[3.685,14.874],[3.635,14.897],[3.583,14.916],[3.53,14.931],[3.476,14.94],[3.421,14.944],[3.366,14.944],[3.311,14.938],[3.257,14.928],[3.204,14.913],[3.152,14.895],[3.102,14.873],[3.053,14.848],[3.006,14.819],[2.961,14.788],[2.918,14.754],[2.877,14.717],[2.837,14.679],[2.8,14.638],[2.765,14.596],[2.731,14.553],[2.698,14.508],[2.667,14.463],[2.636,14.418],[2.605,14.372],[2.575,14.326],[2.544,14.281],[2.513,14.235],[2.48,14.191],[2.447,14.147],[2.413,14.104],[2.377,14.062],[2.339,14.022],[2.3,13.983],[2.259,13.947],[2.216,13.913],[2.171,13.881],[2.124,13.853],[2.075,13.828],[2.023,13.808],[1.97,13.795],[1.915,13.788],[1.861,13.79],[1.807,13.801],[1.756,13.823],[1.711,13.853],[1.671,13.891],[1.638,13.935],[1.612,13.984],[1.593,14.035],[1.58,14.089],[1.572,14.143],[1.571,14.198],[1.576,14.253],[1.586,14.307],[1.601,14.36],[1.621,14.411],[1.645,14.461],[1.672,14.508],[1.702,14.554],[1.734,14.599],[1.768,14.643],[1.801,14.686],[1.835,14.73],[1.869,14.773],[1.9,14.818],[1.93,14.865],[1.955,14.914],[1.976,14.964],[1.991,15.017],[1.999,15.072],[2,15.127],[1.994,15.181],[1.983,15.235],[1.966,15.288],[1.944,15.338],[1.918,15.386],[1.888,15.432],[1.853,15.475],[1.814,15.514],[1.77,15.547],[1.723,15.575],[1.672,15.596],[1.618,15.609],[1.564,15.615],[1.509,15.614],[1.454,15.607],[1.401,15.595],[1.348,15.578],[1.298,15.557],[1.249,15.532],[1.202,15.503],[1.156,15.472],[1.113,15.438],[1.072,15.401],[1.033,15.362],[.997,15.321],[.963,15.278],[.931,15.233],[.902,15.186],[.875,15.138],[.851,15.089],[.83,15.038],[.81,14.986],[.793,14.934],[.778,14.881],[.765,14.828],[.753,14.774],[.743,14.72],[.736,14.666],[.73,14.611],[.726,14.556],[.725,14.501],[.725,14.446],[.728,14.391],[.733,14.336],[.74,14.282],[.749,14.227],[.759,14.173],[.772,14.12],[.785,14.066],[.8,14.013],[.817,13.961],[.835,13.909],[.855,13.858],[.876,13.807],[.898,13.757],[.923,13.707],[.948,13.658],[.975,13.61],[1.003,13.563],[1.032,13.516],[1.062,13.47],[1.093,13.425],[1.125,13.38],[1.159,13.337],[1.194,13.294],[1.23,13.253],[1.267,13.212],[1.306,13.174],[1.347,13.136],[1.389,13.101],[1.433,13.068],[1.479,13.038],[1.527,13.01],[1.576,12.986],[1.627,12.965],[1.679,12.947],[1.732,12.933],[1.786,12.922],[1.84,12.914],[1.895,12.91],[1.95,12.908],[2.005,12.91],[2.06,12.914],[2.115,12.92],[2.169,12.93],[2.222,12.942],[2.275,12.958],[2.327,12.976],[2.378,12.997],[2.428,13.02],[2.476,13.047],[2.523,13.076],[2.568,13.107],[2.612,13.14],[2.655,13.175],[2.696,13.211],[2.736,13.249],[2.775,13.287],[2.813,13.327],[2.851,13.367],[2.887,13.408],[2.923,13.45],[2.959,13.492],[2.993,13.535],[3.027,13.578],[3.061,13.622],[3.095,13.665],[3.129,13.708],[3.163,13.751],[3.198,13.794],[3.233,13.837],[3.269,13.878],[3.307,13.918],[3.347,13.955],[3.391,13.989],[3.438,14.017],[3.49,14.035],[3.545,14.035],[3.595,14.015],[3.635,13.977],[3.663,13.93],[3.681,13.878],[3.69,13.824],[3.694,13.769],[3.692,13.714],[3.686,13.659],[3.676,13.605],[3.664,13.551],[3.65,13.498],[3.634,13.446],[3.617,13.393],[3.6,13.341],[3.583,13.289],[3.566,13.236],[3.55,13.184],[3.536,13.13],[3.523,13.077],[3.512,13.023],[3.505,12.969],[3.501,12.914],[3.502,12.859],[3.51,12.804],[3.525,12.751],[3.549,12.702],[3.581,12.658],[3.623,12.622],[3.672,12.597],[3.725,12.584],[3.78,12.583]],[[-8.773,10.704],[-8.723,10.727],[-8.679,10.759],[-8.642,10.8],[-8.615,10.848],[-8.599,10.901],[-8.593,10.955],[-8.596,11.01],[-8.608,11.064],[-8.627,11.115],[-8.652,11.164],[-8.683,11.21],[-8.717,11.252],[-8.756,11.292],[-8.797,11.328],[-8.841,11.362],[-8.886,11.393],[-8.933,11.421],[-8.981,11.448],[-9.031,11.472],[-9.081,11.494],[-9.132,11.515],[-9.183,11.535],[-9.235,11.553],[-9.287,11.57],[-9.34,11.587],[-9.392,11.604],[-9.445,11.621],[-9.497,11.638],[-9.549,11.655],[-9.601,11.673],[-9.653,11.692],[-9.704,11.712],[-9.755,11.733],[-9.806,11.755],[-9.855,11.778],[-9.905,11.802],[-9.953,11.828],[-10.002,11.855],[-10.049,11.883],[-10.096,11.911],[-10.142,11.941],[-10.188,11.971],[-10.234,12.002],[-10.279,12.034],[-10.323,12.067],[-10.367,12.1],[-10.41,12.134],[-10.452,12.17],[-10.493,12.207],[-10.532,12.245],[-10.571,12.284],[-10.607,12.326],[-10.641,12.369],[-10.671,12.415],[-10.698,12.463],[-10.719,12.514],[-10.732,12.567],[-10.735,12.622],[-10.726,12.676],[-10.703,12.726],[-10.668,12.768],[-10.624,12.801],[-10.575,12.825],[-10.522,12.842],[-10.468,12.853],[-10.414,12.859],[-10.359,12.861],[-10.304,12.861],[-10.249,12.858],[-10.194,12.854],[-10.139,12.848],[-10.085,12.841],[-10.03,12.833],[-9.976,12.825],[-9.921,12.816],[-9.867,12.808],[-9.813,12.799],[-9.759,12.79],[-9.704,12.781],[-9.65,12.773],[-9.596,12.764],[-9.541,12.755],[-9.487,12.747],[-9.432,12.739],[-9.378,12.731],[-9.323,12.724],[-9.269,12.716],[-9.214,12.709],[-9.16,12.702],[-9.105,12.695],[-9.05,12.689],[-8.996,12.683],[-8.941,12.679],[-8.886,12.677],[-8.831,12.678],[-8.776,12.683],[-8.722,12.694],[-8.67,12.712],[-8.622,12.738],[-8.58,12.774],[-8.548,12.819],[-8.527,12.869],[-8.518,12.923],[-8.518,12.978],[-8.527,13.033],[-8.543,13.085],[-8.564,13.136],[-8.592,13.183],[-8.624,13.228],[-8.661,13.269],[-8.701,13.306],[-8.745,13.339],[-8.791,13.369],[-8.84,13.396],[-8.889,13.419],[-8.94,13.441],[-8.991,13.462],[-9.042,13.481],[-9.094,13.499],[-9.147,13.516],[-9.199,13.533],[-9.251,13.55],[-9.304,13.566],[-9.357,13.581],[-9.41,13.596],[-9.463,13.611],[-9.516,13.626],[-9.569,13.64],[-9.622,13.653],[-9.676,13.667],[-9.729,13.68],[-9.783,13.693],[-9.836,13.706],[-9.89,13.718],[-9.944,13.729],[-9.998,13.74],[-10.052,13.749],[-10.106,13.758],[-10.161,13.765],[-10.215,13.772],[-10.27,13.776],[-10.325,13.78],[-10.38,13.783],[-10.435,13.785],[-10.49,13.785],[-10.545,13.785],[-10.6,13.783],[-10.655,13.78],[-10.71,13.776],[-10.765,13.77],[-10.819,13.763],[-10.873,13.753],[-10.927,13.741],[-10.98,13.726],[-11.032,13.709],[-11.084,13.689],[-11.134,13.666],[-11.182,13.64],[-11.229,13.612],[-11.274,13.58],[-11.317,13.546],[-11.359,13.51],[-11.398,13.471],[-11.435,13.43],[-11.469,13.387],[-11.502,13.343],[-11.532,13.297],[-11.559,13.249],[-11.584,13.2],[-11.607,13.15],[-11.627,13.099],[-11.645,13.047],[-11.66,12.994],[-11.672,12.94],[-11.681,12.886],[-11.687,12.831],[-11.69,12.777],[-11.689,12.722],[-11.685,12.667],[-11.678,12.612],[-11.668,12.558],[-11.656,12.504],[-11.641,12.451],[-11.624,12.399],[-11.606,12.347],[-11.586,12.296],[-11.566,12.245],[-11.544,12.194],[-11.521,12.144],[-11.498,12.094],[-11.474,12.045],[-11.449,11.996],[-11.424,11.947],[-11.399,11.898],[-11.372,11.849],[-11.346,11.801],[-11.318,11.754],[-11.289,11.707],[-11.26,11.66],[-11.23,11.614],[-11.198,11.57],[-11.164,11.526],[-11.129,11.483],[-11.092,11.442],[-11.054,11.404],[-11.013,11.367],[-10.97,11.333],[-10.925,11.301],[-10.878,11.271],[-10.83,11.244],[-10.781,11.219],[-10.732,11.196],[-10.681,11.174],[-10.63,11.153],[-10.579,11.134],[-10.527,11.115],[-10.475,11.098],[-10.422,11.081],[-10.37,11.064],[-10.317,11.048],[-10.265,11.032],[-10.212,11.016],[-10.159,10.999],[-10.107,10.983],[-10.054,10.967],[-10.002,10.95],[-9.949,10.934],[-9.897,10.917],[-9.844,10.901],[-9.791,10.886],[-9.739,10.87],[-9.686,10.855],[-9.633,10.841],[-9.58,10.826],[-9.526,10.812],[-9.473,10.798],[-9.42,10.784],[-9.367,10.771],[-9.313,10.757],[-9.26,10.744],[-9.206,10.731],[-9.153,10.718],[-9.099,10.707],[-9.045,10.697],[-8.99,10.689],[-8.936,10.684],[-8.881,10.684],[-8.826,10.69]],[[-2.327,9.883],[-2.29,9.924],[-2.262,9.971],[-2.242,10.023],[-2.23,10.076],[-2.226,10.131],[-2.228,10.186],[-2.237,10.24],[-2.252,10.293],[-2.273,10.344],[-2.3,10.392],[-2.332,10.437],[-2.368,10.478],[-2.408,10.515],[-2.452,10.549],[-2.498,10.58],[-2.545,10.608],[-2.594,10.633],[-2.643,10.657],[-2.694,10.679],[-2.744,10.7],[-2.796,10.72],[-2.848,10.739],[-2.9,10.756],[-2.952,10.773],[-3.005,10.789],[-3.057,10.804],[-3.111,10.819],[-3.164,10.833],[-3.217,10.847],[-3.27,10.86],[-3.324,10.874],[-3.377,10.888],[-3.43,10.901],[-3.484,10.915],[-3.537,10.928],[-3.59,10.941],[-3.644,10.953],[-3.698,10.964],[-3.752,10.975],[-3.806,10.986],[-3.86,10.996],[-3.914,11.006],[-3.968,11.016],[-4.022,11.027],[-4.076,11.038],[-4.129,11.051],[-4.183,11.064],[-4.235,11.08],[-4.287,11.098],[-4.338,11.119],[-4.386,11.146],[-4.43,11.179],[-4.465,11.221],[-4.483,11.273],[-4.481,11.327],[-4.461,11.379],[-4.431,11.425],[-4.396,11.467],[-4.357,11.505],[-4.316,11.542],[-4.274,11.577],[-4.231,11.612],[-4.187,11.645],[-4.143,11.678],[-4.098,11.71],[-4.054,11.743],[-4.009,11.775],[-3.964,11.806],[-3.919,11.838],[-3.874,11.87],[-3.83,11.902],[-3.785,11.934],[-3.74,11.966],[-3.695,11.998],[-3.651,12.03],[-3.606,12.062],[-3.561,12.094],[-3.517,12.126],[-3.472,12.158],[-3.426,12.189],[-3.381,12.22],[-3.335,12.251],[-3.29,12.282],[-3.244,12.312],[-3.198,12.342],[-3.151,12.372],[-3.105,12.401],[-3.058,12.43],[-3.011,12.459],[-2.964,12.487],[-2.917,12.516],[-2.871,12.546],[-2.825,12.576],[-2.78,12.608],[-2.738,12.643],[-2.698,12.681],[-2.662,12.723],[-2.633,12.77],[-2.613,12.82],[-2.603,12.874],[-2.605,12.929],[-2.618,12.983],[-2.641,13.032],[-2.672,13.078],[-2.71,13.118],[-2.752,13.153],[-2.798,13.183],[-2.847,13.209],[-2.898,13.23],[-2.95,13.248],[-3.003,13.262],[-3.056,13.274],[-3.11,13.284],[-3.165,13.293],[-3.219,13.301],[-3.274,13.308],[-3.328,13.316],[-3.383,13.323],[-3.437,13.331],[-3.492,13.339],[-3.546,13.348],[-3.6,13.356],[-3.655,13.365],[-3.709,13.373],[-3.763,13.382],[-3.818,13.391],[-3.872,13.4],[-3.926,13.408],[-3.981,13.416],[-4.035,13.424],[-4.09,13.432],[-4.144,13.439],[-4.199,13.445],[-4.253,13.451],[-4.308,13.456],[-4.363,13.462],[-4.418,13.467],[-4.472,13.472],[-4.527,13.478],[-4.582,13.484],[-4.637,13.491],[-4.691,13.497],[-4.746,13.504],[-4.8,13.511],[-4.855,13.517],[-4.91,13.523],[-4.964,13.529],[-5.019,13.533],[-5.074,13.537],[-5.129,13.541],[-5.184,13.544],[-5.239,13.547],[-5.294,13.551],[-5.349,13.555],[-5.403,13.559],[-5.458,13.564],[-5.513,13.57],[-5.568,13.576],[-5.622,13.582],[-5.677,13.589],[-5.732,13.594],[-5.786,13.599],[-5.841,13.602],[-5.896,13.603],[-5.951,13.601],[-6.006,13.596],[-6.06,13.586],[-6.113,13.571],[-6.164,13.55],[-6.21,13.52],[-6.249,13.482],[-6.279,13.436],[-6.299,13.385],[-6.309,13.331],[-6.311,13.276],[-6.306,13.221],[-6.296,13.167],[-6.281,13.114],[-6.262,13.062],[-6.24,13.012],[-6.214,12.964],[-6.184,12.918],[-6.15,12.874],[-6.112,12.834],[-6.071,12.798],[-6.026,12.766],[-5.978,12.739],[-5.928,12.717],[-5.875,12.7],[-5.822,12.687],[-5.768,12.679],[-5.713,12.674],[-5.658,12.672],[-5.603,12.673],[-5.548,12.676],[-5.493,12.681],[-5.438,12.686],[-5.384,12.691],[-5.329,12.697],[-5.274,12.701],[-5.219,12.705],[-5.164,12.707],[-5.109,12.708],[-5.054,12.706],[-4.999,12.703],[-4.944,12.697],[-4.89,12.688],[-4.837,12.674],[-4.785,12.656],[-4.737,12.63],[-4.694,12.595],[-4.664,12.55],[-4.653,12.496],[-4.662,12.442],[-4.686,12.393],[-4.719,12.348],[-4.756,12.308],[-4.797,12.271],[-4.84,12.237],[-4.885,12.205],[-4.93,12.174],[-4.976,12.144],[-5.023,12.114],[-5.069,12.086],[-5.116,12.057],[-5.164,12.029],[-5.211,12.001],[-5.259,11.974],[-5.307,11.946],[-5.354,11.919],[-5.402,11.892],[-5.45,11.864],[-5.497,11.837],[-5.545,11.808],[-5.591,11.78],[-5.638,11.75],[-5.683,11.719],[-5.728,11.687],[-5.772,11.654],[-5.815,11.619],[-5.855,11.582],[-5.894,11.543],[-5.93,11.502],[-5.963,11.458],[-5.993,11.411],[-6.017,11.362],[-6.037,11.311],[-6.052,11.258],[-6.061,11.204],[-6.065,11.149],[-6.064,11.094],[-6.059,11.039],[-6.05,10.985],[-6.038,10.931],[-6.022,10.879],[-6.003,10.827],[-5.981,10.777],[-5.955,10.728],[-5.926,10.681],[-5.893,10.637],[-5.857,10.596],[-5.817,10.558],[-5.774,10.523],[-5.729,10.492],[-5.682,10.463],[-5.634,10.437],[-5.584,10.413],[-5.534,10.392],[-5.482,10.372],[-5.43,10.354],[-5.378,10.337],[-5.325,10.321],[-5.272,10.306],[-5.219,10.292],[-5.166,10.278],[-5.113,10.264],[-5.059,10.251],[-5.006,10.238],[-4.952,10.226],[-4.899,10.213],[-4.845,10.201],[-4.791,10.189],[-4.738,10.177],[-4.684,10.165],[-4.631,10.152],[-4.577,10.14],[-4.524,10.127],[-4.47,10.113],[-4.417,10.1],[-4.364,10.086],[-4.31,10.072],[-4.257,10.059],[-4.204,10.045],[-4.15,10.032],[-4.097,10.02],[-4.043,10.007],[-3.989,9.995],[-3.936,9.983],[-3.882,9.971],[-3.828,9.959],[-3.775,9.947],[-3.721,9.935],[-3.667,9.923],[-3.614,9.911],[-3.56,9.9],[-3.506,9.889],[-3.452,9.879],[-3.398,9.869],[-3.343,9.86],[-3.289,9.851],[-3.235,9.843],[-3.18,9.835],[-3.126,9.828],[-3.071,9.82],[-3.017,9.813],[-2.962,9.805],[-2.908,9.798],[-2.853,9.792],[-2.798,9.786],[-2.743,9.783],[-2.688,9.781],[-2.633,9.781],[-2.579,9.785],[-2.524,9.793],[-2.471,9.805],[-2.419,9.824],[-2.37,9.85]],[[10.938,9.99],[10.969,10.035],[10.984,10.088],[10.985,10.143],[10.977,10.197],[10.961,10.25],[10.94,10.3],[10.915,10.349],[10.887,10.396],[10.857,10.443],[10.826,10.488],[10.793,10.532],[10.76,10.576],[10.726,10.619],[10.691,10.662],[10.656,10.704],[10.621,10.746],[10.584,10.787],[10.548,10.828],[10.511,10.868],[10.473,10.908],[10.435,10.948],[10.397,10.988],[10.359,11.027],[10.32,11.066],[10.282,11.106],[10.245,11.146],[10.208,11.186],[10.171,11.228],[10.136,11.269],[10.101,11.312],[10.067,11.355],[10.034,11.399],[10.003,11.444],[9.974,11.491],[9.949,11.54],[9.93,11.591],[9.925,11.646],[9.941,11.698],[9.978,11.737],[10.026,11.763],[10.079,11.781],[10.132,11.792],[10.187,11.8],[10.241,11.806],[10.296,11.81],[10.351,11.813],[10.406,11.816],[10.461,11.818],[10.515,11.821],[10.57,11.825],[10.625,11.83],[10.68,11.836],[10.734,11.844],[10.788,11.854],[10.841,11.867],[10.894,11.883],[10.945,11.904],[10.993,11.93],[11.038,11.961],[11.075,12.001],[11.102,12.049],[11.115,12.102],[11.114,12.157],[11.1,12.21],[11.077,12.26],[11.047,12.306],[11.012,12.348],[10.972,12.386],[10.929,12.42],[10.883,12.449],[10.834,12.474],[10.783,12.495],[10.731,12.511],[10.677,12.524],[10.623,12.534],[10.569,12.541],[10.514,12.546],[10.459,12.55],[10.404,12.552],[10.349,12.554],[10.295,12.556],[10.24,12.557],[10.185,12.558],[10.13,12.56],[10.075,12.562],[10.02,12.565],[9.965,12.568],[9.911,12.572],[9.856,12.578],[9.801,12.584],[9.747,12.591],[9.693,12.6],[9.638,12.609],[9.584,12.618],[9.53,12.628],[9.476,12.639],[9.422,12.649],[9.369,12.661],[9.315,12.672],[9.261,12.684],[9.208,12.696],[9.154,12.708],[9.1,12.72],[9.047,12.732],[8.993,12.743],[8.939,12.754],[8.886,12.765],[8.832,12.776],[8.778,12.786],[8.724,12.796],[8.669,12.805],[8.615,12.814],[8.561,12.823],[8.507,12.831],[8.452,12.84],[8.398,12.848],[8.344,12.855],[8.289,12.862],[8.235,12.868],[8.18,12.873],[8.125,12.878],[8.07,12.882],[8.016,12.886],[7.961,12.891],[7.906,12.895],[7.852,12.901],[7.797,12.907],[7.742,12.913],[7.688,12.921],[7.634,12.929],[7.58,12.938],[7.525,12.948],[7.472,12.959],[7.418,12.97],[7.364,12.981],[7.311,12.994],[7.257,13.007],[7.204,13.02],[7.151,13.035],[7.098,13.049],[7.045,13.064],[6.992,13.079],[6.939,13.093],[6.886,13.106],[6.832,13.118],[6.778,13.127],[6.723,13.132],[6.668,13.131],[6.614,13.122],[6.564,13.102],[6.521,13.068],[6.492,13.022],[6.477,12.969],[6.476,12.914],[6.483,12.86],[6.498,12.807],[6.518,12.756],[6.543,12.707],[6.571,12.659],[6.603,12.615],[6.637,12.572],[6.675,12.532],[6.715,12.494],[6.758,12.46],[6.803,12.428],[6.849,12.399],[6.898,12.373],[6.947,12.349],[6.998,12.328],[7.05,12.309],[7.102,12.292],[7.155,12.277],[7.208,12.264],[7.261,12.251],[7.315,12.24],[7.369,12.229],[7.423,12.219],[7.477,12.209],[7.531,12.199],[7.585,12.189],[7.639,12.179],[7.693,12.168],[7.747,12.158],[7.801,12.147],[7.854,12.135],[7.908,12.123],[7.961,12.11],[8.014,12.095],[8.066,12.079],[8.118,12.06],[8.168,12.036],[8.214,12.007],[8.25,11.966],[8.265,11.914],[8.252,11.861],[8.224,11.813],[8.19,11.77],[8.153,11.73],[8.113,11.692],[8.073,11.654],[8.032,11.618],[7.99,11.583],[7.947,11.548],[7.904,11.514],[7.86,11.481],[7.816,11.448],[7.771,11.417],[7.726,11.386],[7.68,11.355],[7.634,11.325],[7.588,11.296],[7.541,11.266],[7.495,11.237],[7.449,11.207],[7.402,11.178],[7.356,11.148],[7.31,11.119],[7.263,11.089],[7.217,11.06],[7.17,11.031],[7.124,11.002],[7.077,10.973],[7.03,10.943],[6.984,10.914],[6.938,10.884],[6.893,10.853],[6.849,10.82],[6.806,10.786],[6.765,10.749],[6.726,10.71],[6.691,10.668],[6.661,10.622],[6.636,10.573],[6.616,10.522],[6.604,10.468],[6.599,10.414],[6.6,10.359],[6.608,10.305],[6.622,10.252],[6.643,10.201],[6.67,10.153],[6.704,10.11],[6.745,10.074],[6.792,10.046],[6.845,10.03],[6.9,10.026],[6.954,10.032],[7.007,10.044],[7.06,10.062],[7.11,10.083],[7.16,10.106],[7.209,10.13],[7.258,10.156],[7.307,10.181],[7.355,10.208],[7.403,10.235],[7.45,10.262],[7.498,10.289],[7.545,10.317],[7.592,10.345],[7.639,10.374],[7.686,10.403],[7.733,10.432],[7.779,10.462],[7.825,10.492],[7.87,10.523],[7.915,10.555],[7.959,10.587],[8.003,10.62],[8.046,10.654],[8.089,10.688],[8.132,10.723],[8.175,10.757],[8.218,10.792],[8.261,10.826],[8.304,10.86],[8.348,10.893],[8.392,10.926],[8.436,10.959],[8.48,10.991],[8.525,11.023],[8.569,11.055],[8.614,11.087],[8.659,11.119],[8.704,11.151],[8.749,11.181],[8.795,11.211],[8.843,11.239],[8.892,11.264],[8.943,11.284],[8.995,11.3],[9.049,11.308],[9.104,11.309],[9.159,11.301],[9.211,11.286],[9.262,11.265],[9.31,11.238],[9.355,11.207],[9.399,11.173],[9.44,11.137],[9.48,11.1],[9.519,11.061],[9.558,11.022],[9.597,10.984],[9.637,10.945],[9.676,10.908],[9.717,10.87],[9.757,10.833],[9.798,10.797],[9.839,10.76],[9.88,10.723],[9.921,10.687],[9.961,10.649],[10.001,10.612],[10.041,10.573],[10.08,10.535],[10.118,10.495],[10.156,10.455],[10.193,10.415],[10.23,10.374],[10.266,10.333],[10.303,10.292],[10.34,10.252],[10.378,10.212],[10.416,10.173],[10.456,10.135],[10.497,10.098],[10.54,10.064],[10.584,10.032],[10.631,10.003],[10.68,9.978],[10.732,9.959],[10.785,9.947],[10.84,9.946],[10.893,9.96]],[[-3.282,6.089],[-3.237,6.12],[-3.197,6.158],[-3.163,6.201],[-3.136,6.249],[-3.115,6.3],[-3.101,6.353],[-3.094,6.407],[-3.093,6.462],[-3.096,6.517],[-3.104,6.572],[-3.115,6.625],[-3.128,6.679],[-3.144,6.732],[-3.16,6.784],[-3.178,6.836],[-3.196,6.888],[-3.215,6.94],[-3.235,6.991],[-3.255,7.042],[-3.275,7.093],[-3.295,7.145],[-3.316,7.196],[-3.336,7.246],[-3.357,7.297],[-3.379,7.348],[-3.4,7.399],[-3.422,7.449],[-3.443,7.5],[-3.465,7.55],[-3.486,7.601],[-3.507,7.652],[-3.528,7.703],[-3.548,7.754],[-3.567,7.806],[-3.585,7.858],[-3.602,7.91],[-3.617,7.963],[-3.631,8.016],[-3.64,8.07],[-3.646,8.125],[-3.645,8.18],[-3.634,8.234],[-3.611,8.283],[-3.574,8.324],[-3.527,8.352],[-3.475,8.368],[-3.42,8.376],[-3.365,8.377],[-3.31,8.373],[-3.256,8.367],[-3.201,8.358],[-3.147,8.347],[-3.094,8.336],[-3.04,8.323],[-2.986,8.311],[-2.933,8.298],[-2.879,8.286],[-2.826,8.274],[-2.772,8.263],[-2.718,8.252],[-2.664,8.242],[-2.609,8.234],[-2.555,8.228],[-2.5,8.225],[-2.445,8.224],[-2.39,8.227],[-2.335,8.234],[-2.282,8.247],[-2.23,8.265],[-2.181,8.29],[-2.137,8.322],[-2.099,8.362],[-2.068,8.407],[-2.046,8.458],[-2.034,8.511],[-2.03,8.566],[-2.035,8.621],[-2.047,8.674],[-2.066,8.726],[-2.091,8.775],[-2.121,8.821],[-2.156,8.863],[-2.195,8.902],[-2.238,8.936],[-2.283,8.968],[-2.33,8.996],[-2.379,9.021],[-2.429,9.043],[-2.48,9.064],[-2.532,9.084],[-2.584,9.101],[-2.636,9.118],[-2.689,9.134],[-2.742,9.15],[-2.795,9.164],[-2.848,9.178],[-2.901,9.192],[-2.954,9.205],[-3.008,9.218],[-3.062,9.23],[-3.115,9.243],[-3.169,9.255],[-3.222,9.267],[-3.276,9.279],[-3.329,9.292],[-3.383,9.305],[-3.436,9.318],[-3.49,9.332],[-3.543,9.346],[-3.596,9.36],[-3.649,9.373],[-3.703,9.387],[-3.756,9.4],[-3.809,9.413],[-3.863,9.426],[-3.916,9.439],[-3.97,9.452],[-4.023,9.465],[-4.077,9.478],[-4.13,9.491],[-4.183,9.505],[-4.237,9.518],[-4.29,9.531],[-4.344,9.544],[-4.397,9.556],[-4.451,9.567],[-4.505,9.578],[-4.559,9.589],[-4.613,9.599],[-4.667,9.61],[-4.721,9.62],[-4.775,9.631],[-4.829,9.642],[-4.882,9.653],[-4.936,9.665],[-4.99,9.677],[-5.043,9.689],[-5.097,9.701],[-5.151,9.713],[-5.204,9.725],[-5.258,9.737],[-5.312,9.748],[-5.366,9.76],[-5.419,9.771],[-5.473,9.783],[-5.527,9.795],[-5.581,9.807],[-5.634,9.819],[-5.688,9.831],[-5.741,9.843],[-5.795,9.855],[-5.849,9.867],[-5.903,9.878],[-5.957,9.889],[-6.011,9.899],[-6.065,9.908],[-6.12,9.915],[-6.174,9.919],[-6.229,9.919],[-6.284,9.914],[-6.337,9.898],[-6.383,9.869],[-6.415,9.825],[-6.431,9.772],[-6.435,9.717],[-6.43,9.663],[-6.42,9.609],[-6.406,9.556],[-6.388,9.504],[-6.367,9.453],[-6.343,9.403],[-6.315,9.356],[-6.285,9.31],[-6.252,9.266],[-6.216,9.225],[-6.176,9.186],[-6.134,9.151],[-6.089,9.119],[-6.042,9.091],[-5.994,9.065],[-5.944,9.042],[-5.893,9.021],[-5.841,9.003],[-5.789,8.986],[-5.736,8.971],[-5.683,8.956],[-5.629,8.943],[-5.576,8.93],[-5.522,8.917],[-5.469,8.905],[-5.416,8.891],[-5.362,8.878],[-5.309,8.863],[-5.257,8.846],[-5.205,8.828],[-5.154,8.807],[-5.105,8.782],[-5.059,8.752],[-5.019,8.714],[-4.994,8.666],[-4.995,8.612],[-5.02,8.563],[-5.056,8.522],[-5.098,8.487],[-5.143,8.455],[-5.189,8.425],[-5.237,8.397],[-5.284,8.37],[-5.332,8.343],[-5.38,8.316],[-5.428,8.289],[-5.476,8.262],[-5.524,8.235],[-5.571,8.207],[-5.619,8.179],[-5.666,8.151],[-5.713,8.123],[-5.76,8.095],[-5.807,8.066],[-5.854,8.037],[-5.901,8.008],[-5.947,7.979],[-5.994,7.949],[-6.039,7.918],[-6.085,7.887],[-6.13,7.856],[-6.174,7.824],[-6.219,7.791],[-6.263,7.758],[-6.307,7.725],[-6.351,7.693],[-6.395,7.66],[-6.44,7.628],[-6.485,7.597],[-6.531,7.566],[-6.577,7.536],[-6.624,7.507],[-6.671,7.479],[-6.718,7.451],[-6.766,7.423],[-6.813,7.395],[-6.86,7.366],[-6.906,7.336],[-6.95,7.304],[-6.993,7.268],[-7.032,7.23],[-7.067,7.187],[-7.096,7.141],[-7.117,7.09],[-7.131,7.037],[-7.137,6.983],[-7.134,6.928],[-7.125,6.874],[-7.109,6.821],[-7.086,6.771],[-7.059,6.723],[-7.026,6.679],[-6.989,6.639],[-6.946,6.604],[-6.9,6.575],[-6.849,6.553],[-6.796,6.539],[-6.742,6.532],[-6.687,6.531],[-6.632,6.536],[-6.578,6.545],[-6.524,6.558],[-6.471,6.573],[-6.419,6.591],[-6.368,6.61],[-6.317,6.631],[-6.266,6.653],[-6.216,6.675],[-6.166,6.698],[-6.117,6.722],[-6.068,6.747],[-6.019,6.772],[-5.97,6.797],[-5.921,6.823],[-5.873,6.85],[-5.825,6.877],[-5.778,6.905],[-5.731,6.933],[-5.684,6.962],[-5.637,6.991],[-5.591,7.02],[-5.545,7.05],[-5.498,7.08],[-5.452,7.11],[-5.406,7.14],[-5.36,7.17],[-5.314,7.2],[-5.268,7.23],[-5.222,7.26],[-5.175,7.289],[-5.128,7.318],[-5.081,7.347],[-5.034,7.375],[-4.986,7.402],[-4.938,7.428],[-4.889,7.453],[-4.839,7.476],[-4.788,7.497],[-4.736,7.514],[-4.682,7.526],[-4.628,7.533],[-4.573,7.531],[-4.519,7.52],[-4.468,7.499],[-4.422,7.469],[-4.382,7.432],[-4.346,7.39],[-4.316,7.344],[-4.289,7.296],[-4.266,7.246],[-4.244,7.196],[-4.224,7.145],[-4.204,7.093],[-4.185,7.042],[-4.166,6.99],[-4.146,6.939],[-4.127,6.887],[-4.107,6.836],[-4.086,6.785],[-4.065,6.734],[-4.044,6.684],[-4.021,6.633],[-3.998,6.584],[-3.974,6.534],[-3.95,6.485],[-3.923,6.437],[-3.896,6.389],[-3.867,6.342],[-3.836,6.297],[-3.804,6.252],[-3.769,6.21],[-3.731,6.17],[-3.69,6.133],[-3.646,6.101],[-3.598,6.074],[-3.547,6.055],[-3.493,6.043],[-3.438,6.041],[-3.383,6.048],[-3.331,6.064]],[[-10.95,9.138],[-10.909,9.175],[-10.878,9.221],[-10.857,9.272],[-10.847,9.326],[-10.847,9.381],[-10.853,9.436],[-10.867,9.49],[-10.885,9.542],[-10.909,9.592],[-10.936,9.639],[-10.969,9.684],[-11.006,9.725],[-11.049,9.76],[-11.096,9.788],[-11.148,9.806],[-11.203,9.811],[-11.257,9.803],[-11.308,9.782],[-11.353,9.75],[-11.391,9.71],[-11.421,9.663],[-11.442,9.612],[-11.455,9.559],[-11.46,9.504],[-11.457,9.449],[-11.447,9.394],[-11.431,9.341],[-11.409,9.291],[-11.381,9.243],[-11.347,9.2],[-11.308,9.161],[-11.263,9.13],[-11.213,9.106],[-11.16,9.092],[-11.105,9.087],[-11.05,9.094],[-10.997,9.111]]];var r5=33.9/21.4,_3=42,y3=710,o5=y3-_3;var a5=Object.freeze({height:55,hole:5,letterSize:100,letterShift:0,letterH:.8,thickness:2});function v3(){let i=1/0,t=1/0,e=-1/0,n=-1/0;for(let s of su)for(let[r,o]of s)r<i&&(i=r),o<t&&(t=o),r>e&&(e=r),o>n&&(n=o);return{cx:(i+e)/2,cy:(t+n)/2}}var c5=v3();var h5=Object.freeze({clearance:.3,headLength:43,headWidth:23.5,capTopWidth:17.5,capDepth:4,headCornerR:3,bladeRelief:1.5,upperDepth:5.5,puckD:62,floor:2.4,pushHoleD:12,gripRibs:20,ribDepth:1.2,edgeRound:1.5,notchW:14,handleTailD:12.25,handleHeadD:9.75,gripLen:40,gripOD:24,gripClear:.1,gripFlutes:10});var M3={toggle:{style:"toggle",openingW:14,openingH:32},rocker:{style:"rocker",openingW:33.4,openingH:66.8}},d5=Object.freeze({...M3.toggle,depth:9.5,overhang:16,plateT:3.2});var yn=Object.freeze({halfX:39.0870705,halfZ:50,pinX:22.86,pinZ:33.6,crestX:12,crestZ:10,yMin:-3.0112505,yMax:3.0112505}),b3=yn.halfX-yn.pinX,S3=yn.halfZ-yn.pinZ,p5=yn.yMax-yn.yMin,m5=yn.crestX+b3,g5=yn.crestZ+S3,x5=Object.freeze({width:yn.halfX*2,height:yn.halfZ*2,thickness:100});var E3=["plug1","plug2","plug3","plug4","plug5","plug6"],y5=Object.freeze({lipClear:.28,c8HoleD:8.5,usbHoleW:5,usbHoleH:7.6,usbPitch:10,innerWidth:70.8,innerLength:137.8,usbExtra:15,innerHeight:26.6,acExtra:22,wall:2.4,floor:2.2,cornerRadius:4,edgeFillet:1,usbCount:6,lidThickness:2.6,lipDepth:5,lipThick:1.6,beadR:.55,usbZCenter:13,c8ZCenter:13,beadLen:10,beadDrop:3,pocketExtra:.25,keeperW:5.4,keeperH:8,outerCornerAdd:0,lidNickR:5,lidNickDepth:2.2,spacerFit:.25,spacerSpine:1.6,stopH:4,plug1:11,plug2:11,plug3:11,plug4:11,plug5:11,plug6:11}),v5=[{key:"lipClear",min:.15,max:.6,step:.01,unit:"mm"},{key:"c8HoleD",min:5,max:25,absMax:28,step:.1,unit:"mm"},{key:"usbHoleW",min:3,max:12,absMax:14,step:.1,unit:"mm"},{key:"usbHoleH",min:4,max:18,absMax:20,step:.1,unit:"mm"},{key:"usbPitch",min:7,max:18,step:.1,unit:"mm"},{key:"innerWidth",min:50,max:120,step:.2,unit:"mm"},{key:"innerLength",min:110,max:260,step:.2,unit:"mm"},{key:"usbExtra",min:8,max:45,step:.5,unit:"mm"},{key:"innerHeight",min:20,max:50,step:.2,unit:"mm"},{key:"acExtra",min:10,max:55,step:.5,unit:"mm"},{key:"wall",min:1.6,max:4,step:.1,unit:"mm"},{key:"floor",min:1.2,max:4,step:.1,unit:"mm"},{key:"cornerRadius",min:0,max:12,step:.1,unit:"mm"},{key:"edgeFillet",min:0,max:2,step:.1,unit:"mm"},{key:"usbCount",min:1,max:6,step:1,unit:""},{key:"lidThickness",min:1.6,max:4,step:.1,unit:"mm"},{key:"lipDepth",min:3,max:10,step:.1,unit:"mm"},{key:"lipThick",min:1.2,max:2.4,step:.1,unit:"mm"},{key:"beadR",min:.3,max:1,step:.05,unit:"mm"},{key:"spacerFit",min:.1,max:.6,step:.05,unit:"mm"},{key:"stopH",min:0,max:8,step:.5,unit:"mm"},...E3.map(i=>({key:i,min:0,max:40,absMax:45,step:.5,unit:"mm"}))];var b5=Object.freeze({mode:"bag",bagWidth:72,bagHeight:90,bagDepth:34,phoneWidth:71.6,phoneHeight:147.6,phoneDepth:7.8,links:12,linkLength:44});var E5=(()=>{let i=new Uint32Array(256);for(let t=0;t<256;t++){let e=t;for(let n=0;n<8;n++)e=e&1?3988292384^e>>>1:e>>>1;i[t]=e>>>0}return i})();var L5=Object.freeze({rollD:30,rollLen:50,rollClear:.8,endClear:1.5,wall:1.8,floor:1.6,threadPitch:3,threadDepth:.9,threadLen:9,threadClear:.3,capWall:1.8,capTop:2,slotShape:"s",slotW:2.4,slotSweep:12,winD:14,winZ:30,winTeardrop:!0,squareW:6,rimNotches:2,notchW:2,notchD:2.5,tabAngle:100,tabZ:26,tabHole:5,tabRim:2.4,tabT:4,knurlStyle:"ribs",knurlCount:30,knurlDepth:.6});var N5=Object.freeze({ORIG_DEPTH:17.2,ORIG_WIDTH:85,CUT_Y:1,CUT_X:13,WALL:2,OUTER:[89,45.26,97.29],LIP_EXTRA:1.3,BACK_Y:8.5,FLOOR_Z:-2.5,LEAN_DEG:6,HOLE_SPACING:50});var U5=Object.freeze({base:"screw",depth:27,width:85,phoneT:12,phones:2,phoneW:81.5});function T3(i,t,e){return nu({feature:i,label:t,stlName:e})}function ru(i,t){return T3((e,n)=>{let{Manifold:s}=e,r=In(i),o=r.p.armWidth,a=r.p.armHeight,c=r.deckT,l=Qi(s,[18,o+8,c],[9,(o+8)/2,c/2],n),u=Qi(s,[14,o,a],[9,o/2,c+a/2-.15],n);return Yo(l,u,n)},t,"coaster-arm-test")}var ou="undo-history-style",w3=`
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
`,A3=new Set(["text","number","search","email","url","tel","password"]);function R3(i){return i?i.isContentEditable||i.tagName==="TEXTAREA"?!0:i.tagName==="INPUT"&&A3.has(i.type):!1}function C3({read:i,apply:t,limit:e=100,onChange:n=()=>{}}){let s=()=>JSON.stringify(i()),r=[s()],o=0,a={get canUndo(){return o>0},get canRedo(){return o<r.length-1},commit(){let l=s();return l===r[o]?!1:(r=r.slice(0,o+1),r.push(l),r.length>e&&r.shift(),o=r.length-1,n(a),!0)},undo(){return a.canUndo?(c(o-1),!0):!1},redo(){return a.canRedo?(c(o+1),!0):!1},clear(){r=[s()],o=0,n(a)}};function c(l){o=l,t(JSON.parse(r[o])),r[o]=s(),n(a)}return a}function au({panel:i,before:t,read:e,apply:n,limit:s}={}){if(!document.getElementById(ou)){let x=document.createElement("style");x.id=ou,x.textContent=w3,document.head.appendChild(x)}let r=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent),o=document.createElement("div");o.className="history-bar",o.setAttribute("role","toolbar"),o.setAttribute("aria-label","Undo history"),o.innerHTML=`
    <button type="button" data-history="undo" title="Undo (${r?"\u2318Z":"Ctrl+Z"})">\u21B6 Undo</button>
    <button type="button" data-history="redo" title="Redo (${r?"\u21E7\u2318Z":"Ctrl+Shift+Z"})">\u21B7 Redo</button>
    <span class="history-hint">${r?"\u2318Z \xB7 \u21E7\u2318Z":"Ctrl+Z \xB7 Ctrl+Shift+Z"}</span>
  `;let a=o.querySelector('[data-history="undo"]'),c=o.querySelector('[data-history="redo"]'),l=i||document.body,u=t||l.querySelector(".settings-group")||l.firstElementChild;u&&u.parentElement?u.parentElement.insertBefore(o,u):l.prepend(o);let d=()=>{let x=o.parentElement;for(;x&&x!==document.body&&!/(auto|scroll)/.test(getComputedStyle(x).overflowY);)x=x.parentElement;let v=x&&x!==document.body&&parseFloat(getComputedStyle(x).paddingTop)||0;o.style.top=`${-v}px`};d(),window.addEventListener("resize",d);let h=x=>{a.disabled=!x.canUndo,c.disabled=!x.canRedo},p=C3({read:e,limit:s,onChange:h,apply(x){let v=document.activeElement;v&&v!==document.body&&l.contains(v)&&v.blur&&v.blur(),n(x)}});return h(p),a.addEventListener("click",()=>p.undo()),c.addEventListener("click",()=>p.redo()),document.addEventListener("change",()=>p.commit()),document.addEventListener("click",x=>{x.target instanceof Element&&x.target.closest(".history-bar")||p.commit()}),document.addEventListener("keydown",x=>{if(!(x.metaKey||x.ctrlKey)||x.altKey)return;let v=x.key.toLowerCase(),m=v==="z"&&!x.shiftKey,f=v==="z"&&x.shiftKey||v==="y"&&x.ctrlKey&&!x.metaKey;!m&&!f||R3(x.target)||(x.preventDefault(),m?p.undo():p.redo())}),p}var cu="slider-numbers-style",P3=`
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
`,qo=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");function I3(i){let t=String(i);if(!t||t==="any")return 3;let e=t.indexOf(".");return e<0?0:t.length-e-1}function L3(i){let t=/^\s*(-?\d+(?:\.\d+)?)\s*(.*?)\s*$/.exec(i||"");return t?{numeric:!0,unit:t[2]}:{numeric:!1,unit:null}}function D3(i){let t=i.parentElement,e=t.querySelector("output"),n=t.querySelector(`label[for="${i.id}"]`)||t.querySelector("label"),s=document.createElement("span");s.className="num-field";let r=document.createElement("input");r.type="number",r.className="num-input",r.inputMode="decimal",r.step="any",i.id&&(r.id=`${i.id}-num`),n&&r.setAttribute("aria-label",n.textContent.trim());let o=document.createElement("span");o.className="num-unit",s.append(r,o),e?(e.replaceWith(s),s.append(e)):i.before(s);let a=i.dataset.unit??null,c=()=>{let u=L3(e?.textContent);u.numeric&&a==null&&(a=u.unit),o.textContent=a??"",e&&(e.hidden=u.numeric||!e.textContent.trim())},l=()=>{if(r.min=i.min,r.max=i.max,document.activeElement===r)return;let u=Number(qo.get.call(i));r.value=Number.isFinite(u)?String(Number(u.toFixed(I3(i.step)))):""};return Object.defineProperty(i,"value",{configurable:!0,get(){return qo.get.call(this)},set(u){qo.set.call(this,u),l()}}),i.addEventListener("input",l),r.addEventListener("change",()=>{let u=parseFloat(r.value);if(!Number.isFinite(u)){l();return}let d=i.min===""?-1/0:Number(i.min),h=i.max===""?1/0:Number(i.max);qo.set.call(i,String(Math.min(h,Math.max(d,u)))),r.blur(),l(),i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}),r.addEventListener("keydown",u=>{u.key==="Enter"&&r.blur()}),e&&new MutationObserver(c).observe(e,{childList:!0,characterData:!0,subtree:!0}),c(),l(),r}function lu(i=document){if(!document.getElementById(cu)){let e=document.createElement("style");e.id=cu,e.textContent=P3,document.head.appendChild(e)}let t=[];for(let e of i.querySelectorAll('input[type="range"]'))e.dataset.noNumber!=null||e.dataset.numberPaired!=null||e.parentElement?.querySelector('input[type="number"]')||(e.dataset.numberPaired="",t.push(D3(e)));return t}var Gs="coaster-base",ln=i=>document.getElementById(i);function du(){let i=new URLSearchParams(location.search);return i.has("capture")||i.has("shot")}var Ue=ti(!du()&&Xh()?Yh(Gs)||{}:{}),Jo,fu=null,hu=0,uu=0;function U3(i,t){let e=ns.find(s=>s.key===i)?.step??.1,n=e>=1?0:e<.1?2:1;return is(t,n)}function Zo(i){Ue=ti(i);for(let t of ns){let e=ln(t.key),n=ln(`${t.key}-out`);e&&(e.min=String(t.min),e.max=String(t.max),e.step=String(t.step),e.dataset.unit=t.unit,e.value=String(Ue[t.key])),n&&(n.textContent=U3(t.key,Ue[t.key]))}}function ts(i,t=""){let e=ln("status");e&&(e.textContent=i,e.dataset.kind=t)}function pu(i){let t=In(Ue),e=ln("warnings");e&&(e.innerHTML=Xc(Ue).map(r=>`<p class="warn">${r}</p>`).join(""));let n=ln("readout");if(!n)return;let s=i?.volume!=null?(i.volume/1e3*1.24).toFixed(1):"\u2014";n.innerHTML=`
    <b>${t.outerSize.toFixed(0)} \xD7 ${t.outerSize.toFixed(0)} \xD7 ${t.totalZ.toFixed(1)} mm.</b>
    Deck ${is(t.deckT,0)} \xB7 each arm rises ${is(t.p.armHeight)} above it,
    wall ${is(t.p.armWidth)} thick \xB7 ~${s} g PLA
  `}async function F3(){let i=++uu;ts("Updating\u2026");try{let t=await kh(Ue,{quality:"preview"});if(i!==uu)return;fu=t,Jo.update(t),pu(t),ts("Live")}catch(t){console.error(t),ts(String(t.message||t),"err")}}function $o(){pu(fu),window.clearTimeout(hu),hu=window.setTimeout(F3,120)}async function O3(){ts("Building STL\u2026");try{let{stl:i,volume:t}=await zh(Ue),e=`coaster-base-${"v2"}.stl`;Vh(e,i),Vs(Gs,Ue),Wo(Gs,{filename:e,params:Ue}),ts(`STL \xB7 ${Gh(i)} tris \xB7 ~${(t/1e3*1.24).toFixed(1)} g PLA`)}catch(i){console.error(i),ts(String(i.message||i),"err")}}function B3(){Zo(Ue),Jo=new Vo({canvas:ln("view")}),du()||qh(Gs),document.querySelectorAll("[data-view]").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("[data-view]").forEach(n=>{n.classList.toggle("active",n===e)}),Jo.setView(e.getAttribute("data-view"))})}),ln("resetView")?.addEventListener("click",()=>{document.querySelectorAll("[data-view]").forEach(e=>{e.classList.toggle("active",e.getAttribute("data-view")==="angle")}),Jo.setView("angle")});for(let e of ns){let n=ln(e.key);n?.addEventListener("input",()=>{Ue=ti({...Ue,[e.key]:Number(n.value)}),Zo(Ue),$o()})}ln("download")?.addEventListener("click",O3),iu({appId:Gs,actions:ln("download")?.parentElement,buttonLabel:"Arm test",title:"Arm test settings",fields:[{key:"armHeight",label:"Arm height",min:8,max:45,step:.5,unit:"mm"},{key:"armWidth",label:"Arm width",min:4,max:18,step:.5,unit:"mm"}],getParams:()=>Ue,setParams:e=>{Zo(e),$o()},build:(e,n)=>ru(e,n),fileStem:"coaster-arm"});let i=document.querySelector(".panel");lu(i),au({panel:i,read:()=>Ue,apply:e=>{Zo(e),$o()}});let t=ln("app-version");t&&(t.textContent=`${Wc} v${Gc}`),$o()}B3();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
