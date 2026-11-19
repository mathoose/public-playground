(()=>{var eh="5 \xB7 Nov 19, 2026";var nh="Costco bin lock";var vs=Object.freeze({slotWidth:11.4,slotLength:32.2,clipThickness:4.2,engagement:8,squareEnd:16}),An=[{key:"slotWidth",min:8,max:24,step:.1,unit:"mm"},{key:"slotLength",min:18,max:70,step:.1,unit:"mm"},{key:"clipThickness",min:2.8,max:7,step:.1,unit:"mm"},{key:"engagement",min:3,max:14,step:.1,unit:"mm"},{key:"squareEnd",min:12,max:40,step:.1,unit:"mm"}];function Ci(i,t,e){return Math.min(e,Math.max(t,i))}function m1(i={}){let t={...vs,...i};for(let e of An){let n=Number(t[e.key]);Number.isFinite(n)||(n=vs[e.key]),n=Ci(n,e.min,e.max);let s=e.step>=1?0:(String(e.step).split(".")[1]||"").length;t[e.key]=Number(n.toFixed(s))}return t}function _n(i={}){return m1({...vs,...i})}function rn(i={}){let t=_n(i),e=4,n=t.clipThickness,s=Math.max(5,t.slotWidth-1.4),r=t.slotWidth+2*t.engagement,o=Math.min(s-.7,t.slotWidth-1.1),a=Math.max(2.2,o/2),c=Math.min(2.4,Math.max(0,t.engagement-1.4)),l=r/2-c;l=Math.max(l,a+.45);let h=Math.min(r-.2,l*2),d=Math.max(0,r/2-h/2),u=Math.max(12,o+4.2),f=t.squareEnd+.05<u,m=Math.max(t.squareEnd,u),y=m,g=m,p=Math.min(1.8,s/2-.3,h/2-.3,r/2-.3),T=Math.min(2.4,y/2-.3,g/2-.3),A=Math.min(n-.9,Math.max(1.8,n*.52)),b=n+e+n,M=t.slotLength-r,S=Math.max(0,(t.slotWidth-o)/2);return{p:t,throat:e,thickness:n,hookX:s,hookY:r,neckD:o,neckR:a,shelfY:h/2,coreY:h,rampRun:d,squareRaised:f,minSquare:u,headX:y,headY:g,cornerR:Math.max(.4,p),headR:Math.max(.6,T),tipH:A,totalZ:b,insertGap:M,shift:S,seatLeft:t.engagement-d-S}}function ih(i={}){let t=i.hookY?i:rn(i),e=[];return t.insertGap<.8&&e.push(`Hook is ${t.hookY.toFixed(1)} mm across and the slot is only ${t.p.slotLength.toFixed(1)} mm long, so it cannot drop through. Reduce engagement.`),t.hookX>t.p.slotWidth-.35&&e.push("Hook is too wide for the short side of the slot."),t.p.engagement<5&&e.push("Under 5 mm of engagement is close to the clip that fell out. Deeper stays seated."),t.seatLeft<1.2&&t.insertGap>=.8&&e.push("The flat shelf is short. Add engagement so a shove still lands on the flat, not the ramp."),t.squareRaised&&e.push(`Square end is ${t.headX.toFixed(1)} mm so the pad still covers the neck.`),e}function Rn(i){return`${Number(i).toFixed(1)} mm`}var ti={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bh=0,Fc=1,kh=2;var or=1,zh=2,ls=3,ni=0,Be=1,Qe=2,Sn=0,hs=1,Oc=2,Bc=3,kc=4,Hh=5;var vi=100,Vh=101,Gh=102,Wh=103,Xh=104,Yh=200,qh=201,Zh=202,$h=203,zc=204,Hc=205,Jh=206,Kh=207,jh=208,Qh=209,tu=210,eu=211,nu=212,iu=213,su=214,Kr=0,jr=1,Qr=2,Xi=3,to=4,eo=5,no=6,io=7,Vc=0,ru=1,ou=2,dn=0,Gc=1,Wc=2,Xc=3,Yc=4,qc=5,Zc=6,$c=7;var Jc=300,ii=301,bi=302,ko=303,zo=304,ar=306,so=1e3,vn=1001,ro=1002,Ae=1003,au=1004;var cr=1005;var Re=1006,Ho=1007;var si=1008;var Ge=1009,Kc=1010,jc=1011,us=1012,Vo=1013,fn=1014,pn=1015,mn=1016,Go=1017,Wo=1018,ds=1020,Qc=35902,tl=35899,el=1021,nl=1022,nn=1023,bn=1026,ri=1027,il=1028,Xo=1029,oi=1030,Yo=1031;var qo=1033,lr=33776,hr=33777,ur=33778,dr=33779,Zo=35840,$o=35841,Jo=35842,Ko=35843,jo=36196,Qo=37492,ta=37496,ea=37488,na=37489,fr=37490,ia=37491,sa=37808,ra=37809,oa=37810,aa=37811,ca=37812,la=37813,ha=37814,ua=37815,da=37816,fa=37817,pa=37818,ma=37819,ga=37820,xa=37821,_a=36492,ya=36494,va=36495,ba=36283,Ma=36284,pr=36285,Sa=36286;var Is=2300,oo=2301,$r=2302,Ec=2303,wc=2400,Tc=2401,Ac=2402;var cu=3200;var Ea=0,lu=1,Bn="",qe="srgb",Ls="srgb-linear",Ds="linear",se="srgb";var Jr=7680;var hu=519,uu=512,du=513,fu=514,wa=515,pu=516,mu=517,Ta=518,gu=519,xu=35044;var sl="300 es",ln=2e3,Yi=2001;function g1(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function x1(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ns(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _u(){let i=Ns("canvas");return i.style.display="block",i}var sh={},qi=null;function rl(...i){let t="THREE."+i.shift();qi?qi("log",t,...i):console.log(t,...i)}function yu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Nt(...i){i=yu(i);let t="THREE."+i.shift();if(qi)qi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ot(...i){i=yu(i);let t="THREE."+i.shift();if(qi)qi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function gi(...i){let t=i.join(" ");t in sh||(sh[t]=!0,Nt(...i))}function vu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var bu={[Kr]:jr,[Qr]:no,[to]:io,[Xi]:eo,[jr]:Kr,[no]:Qr,[io]:to,[eo]:Xi},hn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rh=1234567,As=Math.PI/180,Zi=180/Math.PI;function Mi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function ol(i,t){return(i%t+t)%t}function _1(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function y1(i,t,e){return i!==t?(e-i)/(t-i):0}function Rs(i,t,e){return(1-e)*i+e*t}function v1(i,t,e,n){return Rs(i,t,1-Math.exp(-e*n))}function b1(i,t=1){return t-Math.abs(ol(i,t*2)-t)}function M1(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function S1(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function E1(i,t){return i+Math.floor(Math.random()*(t-i+1))}function w1(i,t){return i+Math.random()*(t-i)}function T1(i){return i*(.5-Math.random())}function A1(i){i!==void 0&&(rh=i);let t=rh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function R1(i){return i*As}function C1(i){return i*Zi}function P1(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function I1(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function L1(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function D1(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*d,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*d,a*l);break;case"ZXZ":i.set(c*d,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:Nt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Gi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var al={DEG2RAD:As,RAD2DEG:Zi,generateUUID:Mi,clamp:Xt,euclideanModulo:ol,mapLinear:_1,inverseLerp:y1,lerp:Rs,damp:v1,pingpong:b1,smoothstep:M1,smootherstep:S1,randInt:E1,randFloat:w1,randFloatSpread:T1,seededRandom:A1,degToRad:R1,radToDeg:C1,isPowerOfTwo:P1,ceilPowerOfTwo:I1,floorPowerOfTwo:L1,setQuaternionFromProperEuler:D1,normalize:Fe,denormalize:Gi},ot=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$e=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(d!==y||c!==u||l!==f||h!==m){let g=c*u+l*f+h*m+d*y;g<0&&(u=-u,f=-f,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let T=Math.acos(g),A=Math.sin(T);p=Math.sin(p*T)/A,a=Math.sin(a*T)/A,c=c*p+u*a,l=l*p+f*a,h=h*p+m*a,d=d*p+y*a}else{c=c*p+u*a,l=l*p+f*a,h=h*p+m*a,d=d*p+y*a;let T=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=T,l*=T,h*=T,d*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*d+c*f-l*u,t[e+1]=c*m+h*u+l*d-a*f,t[e+2]=l*m+h*f+a*u-c*d,t[e+3]=h*m-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),u=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"YZX":this._x=u*h*d+l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d-u*f*m;break;case"XZY":this._x=u*h*d-l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d+u*f*m;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(oh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(oh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qa.copy(this).projectOnVector(t),this.sub(Qa)}reflect(t){return this.sub(Qa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qa=new L,oh=new $e,Ht=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],T=s[1],A=s[4],b=s[7],M=s[2],S=s[5],R=s[8];return r[0]=o*y+a*T+c*M,r[3]=o*g+a*A+c*S,r[6]=o*p+a*b+c*R,r[1]=l*y+h*T+d*M,r[4]=l*g+h*A+d*S,r[7]=l*p+h*b+d*R,r[2]=u*y+f*T+m*M,r[5]=u*g+f*A+m*S,r[8]=u*p+f*b+m*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=d*y,t[1]=(s*l-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=u*y,t[4]=(h*e-s*c)*y,t[5]=(s*r-a*e)*y,t[6]=f*y,t[7]=(n*c-l*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tc.makeScale(t,e)),this}rotate(t){return gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tc.makeRotation(-t)),this}translate(t,e){return gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},tc=new Ht,ah=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ch=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function N1(){let i={enabled:!0,workingColorSpace:Ls,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===se&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===se&&(s.r=Wi(s.r),s.g=Wi(s.g),s.b=Wi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?Ds:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return gi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return gi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ls]:{primaries:t,whitePoint:n,transfer:Ds,toXYZ:ah,fromXYZ:ch,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:n,transfer:se,toXYZ:ah,fromXYZ:ch,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),i}var Kt=N1();function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Pi,ao=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Pi===void 0&&(Pi=Ns("canvas")),Pi.width=t.width,Pi.height=t.height;let s=Pi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Pi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ns("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Un(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},U1=0,$i=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:U1++}),this.uuid=Mi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ec(s[o].image)):r.push(ec(s[o]))}else r=ec(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ec(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ao.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}var F1=0,nc=new L,He=class i extends hn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=vn,s=vn,r=Re,o=si,a=nn,c=Ge,l=i.DEFAULT_ANISOTROPY,h=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:F1++}),this.uuid=Mi(),this.name="",this.source=new $i(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(nc).x}get height(){return this.source.getSize(nc).y}get depth(){return this.source.getSize(nc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case so:t.x=t.x-Math.floor(t.x);break;case vn:t.x=t.x<0?0:1;break;case ro:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case so:t.y=t.y-Math.floor(t.y);break;case vn:t.y=t.y<0?0:1;break;case ro:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Jc;He.DEFAULT_ANISOTROPY=1;var me=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(l+1)/2,b=(f+1)/2,M=(p+1)/2,S=(h+u)/4,R=(d+y)/4,_=(m+g)/4;return A>b&&A>M?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=S/n,r=R/n):b>M?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=S/s,r=_/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=R/r,s=_/r),this.set(n,s,r,e),this}let T=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(T)<.001&&(T=1),this.x=(g-m)/T,this.y=(d-y)/T,this.z=(u-h)/T,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},co=class extends hn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Re,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new He(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Re,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new $i(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ve=class extends co{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Us=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var lo=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ue=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,h,d,u,f,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,d,u,f,m,y,g)}set(t,e,n,s,r,o,a,c,l,h,d,u,f,m,y,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),o=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,m=a*h,y=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+m*l,e[5]=u-y*l,e[9]=-a*c,e[2]=y-u*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,f=c*d,m=l*h,y=l*d;e[0]=u+y*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=y+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,f=c*d,m=l*h,y=l*d;e[0]=u-y*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=y-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,f=o*d,m=a*h,y=a*d;e[0]=c*h,e[4]=m*l-f,e[8]=u*l+y,e[1]=c*d,e[5]=y*l+u,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,f=o*l,m=a*c,y=a*l;e[0]=c*h,e[4]=y-u*d,e[8]=m*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+m,e[10]=u-y*d}else if(t.order==="XZY"){let u=o*c,f=o*l,m=a*c,y=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+y,e[5]=o*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*h,e[10]=y*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(O1,t,B1)}lookAt(t,e,n){let s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Gn.crossVectors(n,Xe),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Gn.crossVectors(n,Xe)),Gn.normalize(),Tr.crossVectors(Xe,Gn),s[0]=Gn.x,s[4]=Tr.x,s[8]=Xe.x,s[1]=Gn.y,s[5]=Tr.y,s[9]=Xe.y,s[2]=Gn.z,s[6]=Tr.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],T=n[3],A=n[7],b=n[11],M=n[15],S=s[0],R=s[4],_=s[8],E=s[12],C=s[1],P=s[5],F=s[9],k=s[13],D=s[2],B=s[6],X=s[10],W=s[14],nt=s[3],Y=s[7],j=s[11],et=s[15];return r[0]=o*S+a*C+c*D+l*nt,r[4]=o*R+a*P+c*B+l*Y,r[8]=o*_+a*F+c*X+l*j,r[12]=o*E+a*k+c*W+l*et,r[1]=h*S+d*C+u*D+f*nt,r[5]=h*R+d*P+u*B+f*Y,r[9]=h*_+d*F+u*X+f*j,r[13]=h*E+d*k+u*W+f*et,r[2]=m*S+y*C+g*D+p*nt,r[6]=m*R+y*P+g*B+p*Y,r[10]=m*_+y*F+g*X+p*j,r[14]=m*E+y*k+g*W+p*et,r[3]=T*S+A*C+b*D+M*nt,r[7]=T*R+A*P+b*B+M*Y,r[11]=T*_+A*F+b*X+M*j,r[15]=T*E+A*k+b*W+M*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],y=t[7],g=t[11],p=t[15],T=c*f-l*u,A=a*f-l*d,b=a*u-c*d,M=o*f-l*h,S=o*u-c*h,R=o*d-a*h;return e*(y*T-g*A+p*b)-n*(m*T-g*M+p*S)+s*(m*A-y*M+p*R)-r*(m*b-y*S+g*R)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],y=t[13],g=t[14],p=t[15],T=e*a-n*o,A=e*c-s*o,b=e*l-r*o,M=n*c-s*a,S=n*l-r*a,R=s*l-r*c,_=h*y-d*m,E=h*g-u*m,C=h*p-f*m,P=d*g-u*y,F=d*p-f*y,k=u*p-f*g,D=T*k-A*F+b*P+M*C-S*E+R*_;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/D;return t[0]=(a*k-c*F+l*P)*B,t[1]=(s*F-n*k-r*P)*B,t[2]=(y*R-g*S+p*M)*B,t[3]=(u*S-d*R-f*M)*B,t[4]=(c*C-o*k-l*E)*B,t[5]=(e*k-s*C+r*E)*B,t[6]=(g*b-m*R-p*A)*B,t[7]=(h*R-u*b+f*A)*B,t[8]=(o*F-a*C+l*_)*B,t[9]=(n*C-e*F-r*_)*B,t[10]=(m*S-y*b+p*T)*B,t[11]=(d*b-h*S-f*T)*B,t[12]=(a*E-o*P-c*_)*B,t[13]=(e*P-n*E+s*_)*B,t[14]=(y*A-m*M-g*T)*B,t[15]=(h*M-d*A+u*T)*B,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,m=r*d,y=o*h,g=o*d,p=a*d,T=c*l,A=c*h,b=c*d,M=n.x,S=n.y,R=n.z;return s[0]=(1-(y+p))*M,s[1]=(f+b)*M,s[2]=(m-A)*M,s[3]=0,s[4]=(f-b)*S,s[5]=(1-(u+p))*S,s[6]=(g+T)*S,s[7]=0,s[8]=(m+A)*R,s[9]=(g-T)*R,s[10]=(1-(u+y))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Ii.set(s[0],s[1],s[2]).length(),a=Ii.set(s[4],s[5],s[6]).length(),c=Ii.set(s[8],s[9],s[10]).length();r<0&&(o=-o),on.copy(this);let l=1/o,h=1/a,d=1/c;return on.elements[0]*=l,on.elements[1]*=l,on.elements[2]*=l,on.elements[4]*=h,on.elements[5]*=h,on.elements[6]*=h,on.elements[8]*=d,on.elements[9]*=d,on.elements[10]*=d,e.setFromRotationMatrix(on),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=ln,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),m,y;if(c)m=r/(o-r),y=o*r/(o-r);else if(a===ln)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Yi)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ln,c=!1){let l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),m,y;if(c)m=1/(o-r),y=o/(o-r);else if(a===ln)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===Yi)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ii=new L,on=new ue,O1=new L(0,0,0),B1=new L(1,1,1),Gn=new L,Tr=new L,Xe=new L,lh=new ue,hh=new $e,Fn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return lh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(lh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hh.setFromEuler(this),this.setFromQuaternion(hh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fn.DEFAULT_ORDER="XYZ";var Ji=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},k1=0,uh=new L,Li=new $e,Cn=new ue,Ar=new L,bs=new L,z1=new L,H1=new $e,dh=new L(1,0,0),fh=new L(0,1,0),ph=new L(0,0,1),mh={type:"added"},V1={type:"removed"},Di={type:"childadded",child:null},ic={type:"childremoved",child:null},Ce=class i extends hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:k1++}),this.uuid=Mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new Fn,n=new $e,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new Ht}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ji,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(dh,t)}rotateY(t){return this.rotateOnAxis(fh,t)}rotateZ(t){return this.rotateOnAxis(ph,t)}translateOnAxis(t,e){return uh.copy(t).applyQuaternion(this.quaternion),this.position.add(uh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dh,t)}translateY(t){return this.translateOnAxis(fh,t)}translateZ(t){return this.translateOnAxis(ph,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ar.copy(t):Ar.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(bs,Ar,this.up):Cn.lookAt(Ar,bs,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),Li.setFromRotationMatrix(Cn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mh),Di.child=t,this.dispatchEvent(Di),Di.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(V1),ic.child=t,this.dispatchEvent(ic),ic.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mh),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,t,z1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,H1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ce.DEFAULT_UP=new L(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Nn=class extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},G1={type:"move"},Ki=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let y of t.hand.values()){let g=e.getJointPose(y,n),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&u>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(G1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Nn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function sc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Yt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=ol(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=sc(o,r,t+1/3),this.g=sc(o,r,t),this.b=sc(o,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function n(r){r!==void 0&&parseFloat(r)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){let n=Mu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Wi(t.r),this.g=Wi(t.g),this.b=Wi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return Kt.workingToColorSpace(Le.copy(this),t),Math.round(Xt(Le.r*255,0,255))*65536+Math.round(Xt(Le.g*255,0,255))*256+Math.round(Xt(Le.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Le.copy(this),e);let n=Le.r,s=Le.g,r=Le.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=qe){Kt.workingToColorSpace(Le.copy(this),t);let e=Le.r,n=Le.g,s=Le.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Wn),this.setHSL(Wn.h+t,Wn.s+e,Wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wn),t.getHSL(Rr);let n=Rs(Wn.h,Rr.h,e),s=Rs(Wn.s,Rr.s,e),r=Rs(Wn.l,Rr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Le=new Yt;Yt.NAMES=Mu;var Fs=class extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},an=new L,Pn=new L,rc=new L,In=new L,Ni=new L,Ui=new L,gh=new L,oc=new L,ac=new L,cc=new L,lc=new me,hc=new me,uc=new me,Zn=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),an.subVectors(t,e),s.cross(an);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){an.subVectors(s,e),Pn.subVectors(n,e),rc.subVectors(t,e);let o=an.dot(an),a=an.dot(Pn),c=an.dot(rc),l=Pn.dot(Pn),h=Pn.dot(rc),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-a*h)*u,m=(o*h-a*c)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,In)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,In.x),c.addScaledVector(o,In.y),c.addScaledVector(a,In.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return lc.setScalar(0),hc.setScalar(0),uc.setScalar(0),lc.fromBufferAttribute(t,e),hc.fromBufferAttribute(t,n),uc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(lc,r.x),o.addScaledVector(hc,r.y),o.addScaledVector(uc,r.z),o}static isFrontFacing(t,e,n,s){return an.subVectors(n,e),Pn.subVectors(t,e),an.cross(Pn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),an.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ni.subVectors(s,n),Ui.subVectors(r,n),oc.subVectors(t,n);let c=Ni.dot(oc),l=Ui.dot(oc);if(c<=0&&l<=0)return e.copy(n);ac.subVectors(t,s);let h=Ni.dot(ac),d=Ui.dot(ac);if(h>=0&&d<=h)return e.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ni,o);cc.subVectors(t,r);let f=Ni.dot(cc),m=Ui.dot(cc);if(m>=0&&f<=m)return e.copy(r);let y=f*l-c*m;if(y<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(Ui,a);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return gh.subVectors(r,s),a=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(gh,a);let p=1/(g+y+u);return o=y*p,a=u*p,e.copy(n).addScaledVector(Ni,o).addScaledVector(Ui,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},un=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ms),Pr.subVectors(this.max,Ms),Fi.subVectors(t.a,Ms),Oi.subVectors(t.b,Ms),Bi.subVectors(t.c,Ms),Xn.subVectors(Oi,Fi),Yn.subVectors(Bi,Oi),ui.subVectors(Fi,Bi);let e=[0,-Xn.z,Xn.y,0,-Yn.z,Yn.y,0,-ui.z,ui.y,Xn.z,0,-Xn.x,Yn.z,0,-Yn.x,ui.z,0,-ui.x,-Xn.y,Xn.x,0,-Yn.y,Yn.x,0,-ui.y,ui.x,0];return!dc(e,Fi,Oi,Bi,Pr)||(e=[1,0,0,0,1,0,0,0,1],!dc(e,Fi,Oi,Bi,Pr))?!1:(Ir.crossVectors(Xn,Yn),e=[Ir.x,Ir.y,Ir.z],dc(e,Fi,Oi,Bi,Pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ln=[new L,new L,new L,new L,new L,new L,new L,new L],cn=new L,Cr=new un,Fi=new L,Oi=new L,Bi=new L,Xn=new L,Yn=new L,ui=new L,Ms=new L,Pr=new L,Ir=new L,di=new L;function dc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){di.fromArray(i,r);let a=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),c=t.dot(di),l=e.dot(di),h=n.dot(di);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var ve=new L,Lr=new ot,W1=0,Oe=class extends hn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:W1++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=xu,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Lr.fromBufferAttribute(this,e),Lr.applyMatrix3(t),this.setXY(e,Lr.x,Lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Gi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array),r=Fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Os=class extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Bs=class extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var pe=class extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},X1=new un,Ss=new L,fc=new L,xi=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):X1.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ss.subVectors(t,this.center);let e=Ss.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ss,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ss.copy(t.center).add(fc)),this.expandByPoint(Ss.copy(t.center).sub(fc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Y1=0,en=new ue,pc=new Ce,ki=new L,Ye=new un,Es=new un,Te=new L,be=class i extends hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Y1++}),this.uuid=Mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(g1(t)?Bs:Os)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return pc.lookAt(t),pc.updateMatrix(),this.applyMatrix4(pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pe(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Es.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Ye.min,Es.min),Ye.expandByPoint(Te),Te.addVectors(Ye.max,Es.max),Ye.expandByPoint(Te)):(Ye.expandByPoint(Es.min),Ye.expandByPoint(Es.max))}Ye.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Te.fromBufferAttribute(a,l),c&&(ki.fromBufferAttribute(t,l),Te.add(ki)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Oe(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let _=0;_<n.count;_++)a[_]=new L,c[_]=new L;let l=new L,h=new L,d=new L,u=new ot,f=new ot,m=new ot,y=new L,g=new L;function p(_,E,C){l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,C),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,C),h.sub(l),d.sub(l),f.sub(u),m.sub(u);let P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[_].add(y),a[E].add(y),a[C].add(y),c[_].add(g),c[E].add(g),c[C].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let _=0,E=T.length;_<E;++_){let C=T[_],P=C.start,F=C.count;for(let k=P,D=P+F;k<D;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let A=new L,b=new L,M=new L,S=new L;function R(_){M.fromBufferAttribute(s,_),S.copy(M);let E=a[_];A.copy(E),A.sub(M.multiplyScalar(M.dot(E))).normalize(),b.crossVectors(S,E);let P=b.dot(c[_])<0?-1:1;o.setXYZW(_,A.x,A.y,A.z,P)}for(let _=0,E=T.length;_<E;++_){let C=T[_],P=C.start,F=C.count;for(let k=P,D=P+F;k<D;k+=3)R(t.getX(k+0)),R(t.getX(k+1)),R(t.getX(k+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,d=new L;if(t)for(let u=0,f=t.count;u<f;u+=3){let m=t.getX(u+0),y=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),f=0,m=0;for(let y=0,g=c.length;y<g;y++){a.isInterleavedBufferAttribute?f=c[y]*a.data.stride+a.offset:f=c[y]*h;for(let p=0;p<h;p++)u[m++]=l[f++]}return new Oe(u,h,d)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var mc=new L,q1=new L,Z1=new Ht,Ze=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=mc.subVectors(n,e).cross(q1.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(mc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Z1.getNormalMatrix(t),s=this.coplanarPoint(mc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},$1=0,On=class extends hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$1++}),this.uuid=Mi(),this.name="",this.type="Material",this.blending=hs,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zc,this.blendDst=Hc,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jr,this.stencilZFail=Jr,this.stencilZPass=Jr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Yt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ze().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ot().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Dn=new L,gc=new L,Dr=new L,Nr=new L,$n=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){gc.copy(t).add(e).multiplyScalar(.5),Dr.copy(e).sub(t).normalize(),Nr.copy(this.origin).sub(gc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Dr),a=Nr.dot(this.direction),c=-Nr.dot(Dr),l=Nr.lengthSq(),h=Math.abs(1-o*o),d,u,f,m;if(h>0)if(d=o*c-a,u=o*a-c,m=r*h,d>=0)if(u>=-m)if(u<=m){let y=1/h;d*=y,u*=y,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-m?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=m?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(gc).addScaledVector(Dr,u),f}intersectSphere(t,e){if(t.radius<0)return null;Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,m=e.x-o.x,y=e.y-o.y,g=e.z-o.z,p=n.x-o.x,T=n.y-o.y,A=n.z-o.z,b=Math.abs(c),M=Math.abs(l),S=Math.abs(h),R,_,E,C,P,F,k,D,B,X,W,nt;if(b>=M&&b>=S?(E=c,F=d,B=m,nt=p,c>=0?(R=l,_=h,C=u,P=f,k=y,D=g,X=T,W=A):(R=h,_=l,C=f,P=u,k=g,D=y,X=A,W=T)):M>=S?(E=l,F=u,B=y,nt=T,l>=0?(R=h,_=c,C=f,P=d,k=g,D=m,X=A,W=p):(R=c,_=h,C=d,P=f,k=m,D=g,X=p,W=A)):(E=h,F=f,B=g,nt=A,h>=0?(R=c,_=l,C=d,P=u,k=m,D=y,X=p,W=T):(R=l,_=c,C=u,P=d,k=y,D=m,X=T,W=p)),E===0)return null;let Y=R/E,j=_/E,et=1/E,Ct=C-Y*F,Et=P-j*F,te=k-Y*B,Zt=D-j*B,jt=X-Y*nt,$=W-j*nt,Q=jt*Zt-$*te,xt=Ct*$-Et*jt,Bt=te*Et-Zt*Ct;if(s){if(Q<0||xt<0||Bt<0)return null}else if((Q<0||xt<0||Bt<0)&&(Q>0||xt>0||Bt>0))return null;let bt=Q+xt+Bt;if(bt===0)return null;let kt=et*(Q*F+xt*B+Bt*nt);return(bt>0?kt<0:kt>0)?null:this.at(kt/bt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Mn=class extends On{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},xh=new ue,fi=new $n,Ur=new xi,_h=new L,Fr=new L,Or=new L,Br=new L,xc=new L,kr=new L,yh=new L,zr=new L,Me=class extends Ce{constructor(t=new be,e=new Mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){kr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(xc.fromBufferAttribute(d,t),o?kr.addScaledVector(xc,h):kr.addScaledVector(xc.sub(e),h))}e.add(kr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(Ur.containsPoint(fi.origin)===!1&&(fi.intersectSphere(Ur,_h)===null||fi.origin.distanceToSquared(_h)>(t.far-t.near)**2))&&(xh.copy(r).invert(),fi.copy(t.ray).applyMatrix4(xh),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=o[g.materialIndex],T=Math.max(g.start,f.start),A=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let b=T,M=A;b<M;b+=3){let S=a.getX(b),R=a.getX(b+1),_=a.getX(b+2);s=Hr(this,p,t,n,l,h,d,S,R,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let T=a.getX(g),A=a.getX(g+1),b=a.getX(g+2);s=Hr(this,o,t,n,l,h,d,T,A,b),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=o[g.materialIndex],T=Math.max(g.start,f.start),A=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let b=T,M=A;b<M;b+=3){let S=b,R=b+1,_=b+2;s=Hr(this,p,t,n,l,h,d,S,R,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let T=g,A=g+1,b=g+2;s=Hr(this,o,t,n,l,h,d,T,A,b),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function J1(i,t,e,n,s,r,o,a){let c;if(t.side===Be?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===ni,a),c===null)return null;zr.copy(a),zr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(zr);return l<e.near||l>e.far?null:{distance:l,point:zr.clone(),object:i}}function Hr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Fr),i.getVertexPosition(c,Or),i.getVertexPosition(l,Br);let h=J1(i,t,e,n,Fr,Or,Br,yh);if(h){let d=new L;Zn.getBarycoord(yh,Fr,Or,Br,d),s&&(h.uv=Zn.getInterpolatedAttribute(s,a,c,l,d,new ot)),r&&(h.uv1=Zn.getInterpolatedAttribute(r,a,c,l,d,new ot)),o&&(h.normal=Zn.getInterpolatedAttribute(o,a,c,l,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new L,materialIndex:0};Zn.getNormal(Fr,Or,Br,u.normal),h.face=u,h.barycoord=d}return h}var ho=class extends He{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ae,h=Ae,d,u){super(null,o,a,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var pi=new xi,K1=new ot(.5,.5),Vr=new L,ji=class{constructor(t=new Ze,e=new Ze,n=new Ze,s=new Ze,r=new Ze,o=new Ze){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ln,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],T=r[12],A=r[13],b=r[14],M=r[15];if(s[0].setComponents(l-o,f-h,p-m,M-T).normalize(),s[1].setComponents(l+o,f+h,p+m,M+T).normalize(),s[2].setComponents(l+a,f+d,p+y,M+A).normalize(),s[3].setComponents(l-a,f-d,p-y,M-A).normalize(),n)s[4].setComponents(c,u,g,b).normalize(),s[5].setComponents(l-c,f-u,p-g,M-b).normalize();else if(s[4].setComponents(l-c,f-u,p-g,M-b).normalize(),e===ln)s[5].setComponents(l+c,f+u,p+g,M+b).normalize();else if(e===Yi)s[5].setComponents(c,u,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){pi.center.set(0,0,0);let e=K1.distanceTo(t.center);return pi.radius=.7071067811865476+e,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Vr.x=s.normal.x>0?t.max.x:t.min.x,Vr.y=s.normal.y>0?t.max.y:t.min.y,Vr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ks=class extends On{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},uo=new L,fo=new L,vh=new ue,ws=new $n,Gr=new xi,_c=new L,bh=new L,po=class extends Ce{constructor(t=new be,e=new ks){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)uo.fromBufferAttribute(e,s-1),fo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=uo.distanceTo(fo);t.setAttribute("lineDistance",new pe(n,1))}else Nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(s),Gr.radius+=r,t.ray.intersectsSphere(Gr)===!1)return;vh.copy(s).invert(),ws.copy(t.ray).applyMatrix4(vh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=h.getX(y),T=h.getX(y+1),A=Wr(this,t,ws,c,p,T,y);A&&e.push(A)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=Wr(this,t,ws,c,y,g,m-1);p&&e.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=Wr(this,t,ws,c,y,y+1,y);p&&e.push(p)}if(this.isLineLoop){let y=Wr(this,t,ws,c,m-1,f,m-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Wr(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(uo.fromBufferAttribute(a,s),fo.fromBufferAttribute(a,r),e.distanceSqToSegment(uo,fo,_c,bh)>n)return;_c.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(_c);if(!(l<t.near||l>t.far))return{distance:l,point:bh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Mh=new L,Sh=new L,mo=class extends po{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Mh.fromBufferAttribute(e,s),Sh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Mh.distanceTo(Sh);t.setAttribute("lineDistance",new pe(n,1))}else Nt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var zs=class extends He{constructor(t=[],e=ii,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Jn=class extends He{constructor(t,e,n=fn,s,r,o,a=Ae,c=Ae,l,h=bn,d=1){if(h!==bn&&h!==ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new $i(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},go=class extends Jn{constructor(t,e=fn,n=ii,s,r,o=Ae,a=Ae,c,l=bn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hs=class extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Qi=class i extends be{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(d,2));function m(y,g,p,T,A,b,M,S,R,_,E){let C=b/R,P=M/_,F=b/2,k=M/2,D=S/2,B=R+1,X=_+1,W=0,nt=0,Y=new L;for(let j=0;j<X;j++){let et=j*P-k;for(let Ct=0;Ct<B;Ct++){let Et=Ct*C-F;Y[y]=Et*T,Y[g]=et*A,Y[p]=D,l.push(Y.x,Y.y,Y.z),Y[y]=0,Y[g]=0,Y[p]=S>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(Ct/R),d.push(1-j/_),W+=1}}for(let j=0;j<_;j++)for(let et=0;et<R;et++){let Ct=u+et+B*j,Et=u+et+B*(j+1),te=u+(et+1)+B*(j+1),Zt=u+(et+1)+B*j;c.push(Ct,Et,Zt),c.push(Et,te,Zt),nt+=6}a.addGroup(f,nt,E),f+=nt,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ts=class i extends be{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],m=0,y=[],g=n/2,p=0;T(),o===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(f,2));function T(){let b=new L,M=new L,S=0,R=(e-t)/n;for(let _=0;_<=r;_++){let E=[],C=_/r,P=C*(e-t)+t;for(let F=0;F<=s;F++){let k=F/s,D=k*c+a,B=Math.sin(D),X=Math.cos(D);M.x=P*B,M.y=-C*n+g,M.z=P*X,d.push(M.x,M.y,M.z),b.set(B,R,X).normalize(),u.push(b.x,b.y,b.z),f.push(k,1-C),E.push(m++)}y.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){let C=y[E][_],P=y[E+1][_],F=y[E+1][_+1],k=y[E][_+1];(t>0||E!==0)&&(h.push(C,P,k),S+=3),(e>0||E!==r-1)&&(h.push(P,F,k),S+=3)}l.addGroup(p,S,0),p+=S}function A(b){let M=m,S=new ot,R=new L,_=0,E=b===!0?t:e,C=b===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*C,0),u.push(0,C,0),f.push(.5,.5),m++;let P=m;for(let F=0;F<=s;F++){let D=F/s*c+a,B=Math.cos(D),X=Math.sin(D);R.x=E*X,R.y=g*C,R.z=E*B,d.push(R.x,R.y,R.z),u.push(0,C,0),S.x=B*.5+.5,S.y=X*.5*C+.5,f.push(S.x,S.y),m++}for(let F=0;F<s;F++){let k=M+F,D=P+F;b===!0?h.push(D,D+1,k):h.push(D+1,D,k),_+=3}l.addGroup(p,_,b===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vs=class i extends ts{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Je=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Nt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new L,s=[],r=[],o=[],a=new L,c=new ue;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Xt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Xt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},es=class extends Je{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},xo=class extends es{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function cl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Eh=new L,wh=new L,yc=new cl,vc=new cl,bc=new cl,_o=class extends Je{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(wh.subVectors(s[0],s[1]).add(s[0]),l=wh);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Eh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Eh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),yc.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,m,y,g),vc.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,m,y,g),bc.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(yc.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),vc.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),bc.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(yc.calc(c),vc.calc(c),bc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Th(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function j1(i,t){let e=1-i;return e*e*t}function Q1(i,t){return 2*(1-i)*i*t}function tf(i,t){return i*i*t}function Cs(i,t,e,n){return j1(i,t)+Q1(i,e)+tf(i,n)}function ef(i,t){let e=1-i;return e*e*e*t}function nf(i,t){let e=1-i;return 3*e*e*i*t}function sf(i,t){return 3*(1-i)*i*i*t}function rf(i,t){return i*i*i*t}function Ps(i,t,e,n,s){return ef(i,t)+nf(i,e)+sf(i,n)+rf(i,s)}var Gs=class extends Je{constructor(t=new ot,e=new ot,n=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ot){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,s.x,r.x,o.x,a.x),Ps(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},yo=class extends Je{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ps(t,s.x,r.x,o.x,a.x),Ps(t,s.y,r.y,o.y,a.y),Ps(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ws=class extends Je{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},vo=class extends Je{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xs=class extends Je{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,s.x,r.x,o.x),Cs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},bo=class extends Je{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,s.x,r.x,o.x),Cs(t,s.y,r.y,o.y),Cs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ys=class extends Je{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Th(a,c.x,l.x,h.x,d.x),Th(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ot().fromArray(s))}return this}},Rc=Object.freeze({__proto__:null,ArcCurve:xo,CatmullRomCurve3:_o,CubicBezierCurve:Gs,CubicBezierCurve3:yo,EllipseCurve:es,LineCurve:Ws,LineCurve3:vo,QuadraticBezierCurve:Xs,QuadraticBezierCurve3:bo,SplineCurve:Ys}),Mo=class extends Je{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Rc[s.type]().fromJSON(s))}return this}},_i=class extends Mo{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ws(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Xs(this.currentPoint.clone(),new ot(t,e),new ot(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Gs(this.currentPoint.clone(),new ot(t,e),new ot(n,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Ys(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new es(t,e,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ns=class extends _i{constructor(t){super(t),this.uuid=Mi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new _i().fromJSON(s))}return this}};function of(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Su(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=uf(i,t,r,e)),i.length>80*e){a=i[0],c=i[1];let h=a,d=c;for(let u=e;u<s;u+=e){let f=i[u],m=i[u+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>d&&(d=m)}l=Math.max(h-a,d-c),l=l!==0?32767/l:0}return qs(r,o,e,a,c,l,0),o}function Su(i,t,e,n,s){let r;if(s===Mf(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Ah(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Ah(o/n|0,i[o],i[o+1],r);return r&&is(r,r.next)&&($s(r),r=r.next),r}function yi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(is(e,e.next)||ge(e.prev,e,e.next)===0)){if($s(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function qs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&gf(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?cf(i,n,s,r):af(i)){t.push(c.i,i.i,l.i),$s(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=lf(yi(i),t),qs(i,t,e,n,s,r,2)):o===2&&hf(i,t,e,n,s,r):qs(yi(i),t,e,n,s,r,1);break}}}function af(i){let t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),d=Math.min(a,c,l),u=Math.max(s,r,o),f=Math.max(a,c,l),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Ts(s,a,r,c,o,l,m.x,m.y)&&ge(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function cf(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ge(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,d=r.y,u=o.y,f=Math.min(a,c,l),m=Math.min(h,d,u),y=Math.max(a,c,l),g=Math.max(h,d,u),p=Cc(f,m,t,e,n),T=Cc(y,g,t,e,n),A=i.prevZ,b=i.nextZ;for(;A&&A.z>=p&&b&&b.z<=T;){if(A.x>=f&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==o&&Ts(a,h,c,d,l,u,A.x,A.y)&&ge(A.prev,A,A.next)>=0||(A=A.prevZ,b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==s&&b!==o&&Ts(a,h,c,d,l,u,b.x,b.y)&&ge(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;A&&A.z>=p;){if(A.x>=f&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==o&&Ts(a,h,c,d,l,u,A.x,A.y)&&ge(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;b&&b.z<=T;){if(b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==s&&b!==o&&Ts(a,h,c,d,l,u,b.x,b.y)&&ge(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function lf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!is(n,s)&&wu(n,e,e.next,s)&&Zs(n,s)&&Zs(s,n)&&(t.push(n.i,e.i,s.i),$s(e),$s(e.next),e=i=s),e=e.next}while(e!==i);return yi(e)}function hf(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&yf(o,a)){let c=Tu(o,a);o=yi(o,o.next),c=yi(c,c.next),qs(o,t,e,n,s,r,0),qs(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function uf(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Su(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(_f(l))}s.sort(df);for(let r=0;r<s.length;r++)e=ff(s[r],e);return e}function df(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function ff(i,t){let e=pf(i,t);if(!e)return t;let n=Tu(e,i);return yi(n,n.next),yi(e,e.next)}function pf(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(is(i,e))return e;do{if(is(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Eu(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);Zs(e,i)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&mf(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function mf(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function gf(i,t,e,n){let s=i;do s.z===0&&(s.z=Cc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,xf(s)}function xf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Cc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function _f(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Eu(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Ts(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Eu(i,t,e,n,s,r,o,a)}function yf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!vf(i,t)&&(Zs(i,t)&&Zs(t,i)&&bf(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||is(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function is(i,t){return i.x===t.x&&i.y===t.y}function wu(i,t,e,n){let s=Yr(ge(i,t,e)),r=Yr(ge(i,t,n)),o=Yr(ge(e,n,i)),a=Yr(ge(e,n,t));return!!(s!==r&&o!==a||s===0&&Xr(i,e,t)||r===0&&Xr(i,n,t)||o===0&&Xr(e,i,n)||a===0&&Xr(e,t,n))}function Xr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Yr(i){return i>0?1:i<0?-1:0}function vf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&wu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Zs(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function bf(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Tu(i,t){let e=Pc(i.i,i.x,i.y),n=Pc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ah(i,t,e,n){let s=Pc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function $s(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Pc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Mf(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Ic=class{static triangulate(t,e,n=2){return of(t,e,n)}},mi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Rh(t),Ch(n,t);let o=t.length;e.forEach(Rh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Ch(n,e[c]);let a=Ic.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Rh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ch(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Js=class i extends be{constructor(t=new ns([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new pe(s,3)),this.setAttribute("uv",new pe(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:Sf,A,b=!1,M,S,R,_;if(p){A=p.getSpacedPoints(h),b=!0,u=!1;let tt=p.isCatmullRomCurve3?p.closed:!1;M=p.computeFrenetFrames(h,tt),S=new L,R=new L,_=new L}u||(g=0,f=0,m=0,y=0);let E=a.extractPoints(l),C=E.shape,P=E.holes;if(!mi.isClockWise(C)){C=C.reverse();for(let tt=0,st=P.length;tt<st;tt++){let rt=P[tt];mi.isClockWise(rt)&&(P[tt]=rt.reverse())}}function k(tt){let rt=10000000000000001e-36,at=tt[0];for(let ht=1;ht<=tt.length;ht++){let Ut=ht%tt.length,Dt=tt[Ut],zt=Dt.x-at.x,Vt=Dt.y-at.y,I=zt*zt+Vt*Vt,ee=Math.max(Math.abs(Dt.x),Math.abs(Dt.y),Math.abs(at.x),Math.abs(at.y)),$t=rt*ee*ee;if(I<=$t){tt.splice(Ut,1),ht--;continue}at=Dt}}k(C),P.forEach(k);let D=P.length,B=C;for(let tt=0;tt<D;tt++){let st=P[tt];C=C.concat(st)}function X(tt,st,rt){return st||Ot("ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(st,rt)}let W=C.length;function nt(tt,st,rt){let at,ht,Ut,Dt=tt.x-st.x,zt=tt.y-st.y,Vt=rt.x-tt.x,I=rt.y-tt.y,ee=Dt*Dt+zt*zt,$t=Dt*I-zt*Vt;if(Math.abs($t)>Number.EPSILON){let w=Math.sqrt(ee),x=Math.sqrt(Vt*Vt+I*I),O=st.x-zt/w,V=st.y+Dt/w,q=rt.x-I/x,ct=rt.y+Vt/x,lt=((q-O)*I-(ct-V)*Vt)/(Dt*I-zt*Vt);at=O+Dt*lt-tt.x,ht=V+zt*lt-tt.y;let Z=at*at+ht*ht;if(Z<=2)return new ot(at,ht);Ut=Math.sqrt(Z/2)}else{let w=!1;Dt>Number.EPSILON?Vt>Number.EPSILON&&(w=!0):Dt<-Number.EPSILON?Vt<-Number.EPSILON&&(w=!0):Math.sign(zt)===Math.sign(I)&&(w=!0),w?(at=-zt,ht=Dt,Ut=Math.sqrt(ee)):(at=Dt,ht=zt,Ut=Math.sqrt(ee/2))}return new ot(at/Ut,ht/Ut)}let Y=[];for(let tt=0,st=B.length,rt=st-1,at=tt+1;tt<st;tt++,rt++,at++)rt===st&&(rt=0),at===st&&(at=0),Y[tt]=nt(B[tt],B[rt],B[at]);let j=[],et,Ct=Y.concat();for(let tt=0,st=D;tt<st;tt++){let rt=P[tt];et=[];for(let at=0,ht=rt.length,Ut=ht-1,Dt=at+1;at<ht;at++,Ut++,Dt++)Ut===ht&&(Ut=0),Dt===ht&&(Dt=0),et[at]=nt(rt[at],rt[Ut],rt[Dt]);j.push(et),Ct=Ct.concat(et)}let Et;if(g===0)Et=mi.triangulateShape(B,P);else{let tt=[],st=[];for(let rt=0;rt<g;rt++){let at=rt/g,ht=f*Math.cos(at*Math.PI/2),Ut=m*Math.sin(at*Math.PI/2)+y;for(let Dt=0,zt=B.length;Dt<zt;Dt++){let Vt=X(B[Dt],Y[Dt],Ut);xt(Vt.x,Vt.y,-ht),at===0&&tt.push(Vt)}for(let Dt=0,zt=D;Dt<zt;Dt++){let Vt=P[Dt];et=j[Dt];let I=[];for(let ee=0,$t=Vt.length;ee<$t;ee++){let w=X(Vt[ee],et[ee],Ut);xt(w.x,w.y,-ht),at===0&&I.push(w)}at===0&&st.push(I)}}Et=mi.triangulateShape(tt,st)}let te=Et.length,Zt=m+y;for(let tt=0;tt<W;tt++){let st=u?X(C[tt],Ct[tt],Zt):C[tt];b?(R.copy(M.normals[0]).multiplyScalar(st.x),S.copy(M.binormals[0]).multiplyScalar(st.y),_.copy(A[0]).add(R).add(S),xt(_.x,_.y,_.z)):xt(st.x,st.y,0)}for(let tt=1;tt<=h;tt++)for(let st=0;st<W;st++){let rt=u?X(C[st],Ct[st],Zt):C[st];b?(R.copy(M.normals[tt]).multiplyScalar(rt.x),S.copy(M.binormals[tt]).multiplyScalar(rt.y),_.copy(A[tt]).add(R).add(S),xt(_.x,_.y,_.z)):xt(rt.x,rt.y,d/h*tt)}for(let tt=g-1;tt>=0;tt--){let st=tt/g,rt=f*Math.cos(st*Math.PI/2),at=m*Math.sin(st*Math.PI/2)+y;for(let ht=0,Ut=B.length;ht<Ut;ht++){let Dt=X(B[ht],Y[ht],at);xt(Dt.x,Dt.y,d+rt)}for(let ht=0,Ut=P.length;ht<Ut;ht++){let Dt=P[ht];et=j[ht];for(let zt=0,Vt=Dt.length;zt<Vt;zt++){let I=X(Dt[zt],et[zt],at);b?xt(I.x,I.y+A[h-1].y,A[h-1].x+rt):xt(I.x,I.y,d+rt)}}}jt(),$();function jt(){let tt=s.length/3;if(u){let st=0,rt=W*st;for(let at=0;at<te;at++){let ht=Et[at];Bt(ht[2]+rt,ht[1]+rt,ht[0]+rt)}st=h+g*2,rt=W*st;for(let at=0;at<te;at++){let ht=Et[at];Bt(ht[0]+rt,ht[1]+rt,ht[2]+rt)}}else{for(let st=0;st<te;st++){let rt=Et[st];Bt(rt[2],rt[1],rt[0])}for(let st=0;st<te;st++){let rt=Et[st];Bt(rt[0]+W*h,rt[1]+W*h,rt[2]+W*h)}}n.addGroup(tt,s.length/3-tt,0)}function $(){let tt=s.length/3,st=0;Q(B,st),st+=B.length;for(let rt=0,at=P.length;rt<at;rt++){let ht=P[rt];Q(ht,st),st+=ht.length}n.addGroup(tt,s.length/3-tt,1)}function Q(tt,st){let rt=tt.length;for(;--rt>=0;){let at=rt,ht=rt-1;ht<0&&(ht=tt.length-1);for(let Ut=0,Dt=h+g*2;Ut<Dt;Ut++){let zt=W*Ut,Vt=W*(Ut+1),I=st+at+zt,ee=st+ht+zt,$t=st+ht+Vt,w=st+at+Vt;bt(I,ee,$t,w)}}}function xt(tt,st,rt){c.push(tt),c.push(st),c.push(rt)}function Bt(tt,st,rt){kt(tt),kt(st),kt(rt);let at=s.length/3,ht=T.generateTopUV(n,s,at-3,at-2,at-1);re(ht[0]),re(ht[1]),re(ht[2])}function bt(tt,st,rt,at){kt(tt),kt(st),kt(at),kt(st),kt(rt),kt(at);let ht=s.length/3,Ut=T.generateSideWallUV(n,s,ht-6,ht-3,ht-2,ht-1);re(Ut[0]),re(Ut[1]),re(Ut[3]),re(Ut[1]),re(Ut[2]),re(Ut[3])}function kt(tt){s.push(c[tt*3+0]),s.push(c[tt*3+1]),s.push(c[tt*3+2])}function re(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ef(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Rc[s.type]().fromJSON(s)),new i(n,t.options)}},Sf={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ot(r,o),new ot(a,c),new ot(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],m=t[s*3+2],y=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ot(o,1-c),new ot(l,1-d),new ot(u,1-m),new ot(y,1-p)]:[new ot(a,1-c),new ot(h,1-d),new ot(f,1-m),new ot(g,1-p)]}};function Ef(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ks=class i extends be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=t/a,u=e/c,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let T=p*u-o;for(let A=0;A<l;A++){let b=A*d-r;m.push(b,-T,0),y.push(0,0,1),g.push(A/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<a;T++){let A=T+l*p,b=T+l*(p+1),M=T+1+l*(p+1),S=T+1+l*p;f.push(A,b,S),f.push(b,M,S)}this.setIndex(f),this.setAttribute("position",new pe(m,3)),this.setAttribute("normal",new pe(y,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var js=class i extends be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],d=new L,u=new L,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let T=[],A=p/n,b=o+A*a,M=t*Math.cos(b),S=Math.sqrt(t*t-M*M),R=0;p===0&&o===0?R=.5/e:p===n&&c===Math.PI&&(R=-.5/e);for(let _=0;_<=e;_++){let E=_/e,C=s+E*r;d.x=-S*Math.cos(C),d.y=M,d.z=S*Math.sin(C),m.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),g.push(E+R,1-A),T.push(l++)}h.push(T)}for(let p=0;p<n;p++)for(let T=0;T<e;T++){let A=h[p][T+1],b=h[p][T],M=h[p+1][T],S=h[p+1][T+1];(p!==0||o>0)&&f.push(A,b,S),(p!==n-1||c<Math.PI)&&f.push(b,M,S)}this.setIndex(f),this.setAttribute("position",new pe(m,3)),this.setAttribute("normal",new pe(y,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Si(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Ph(s))s.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Ph(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ne(i){let t={};for(let e=0;e<i.length;e++){let n=Si(i[e]);for(let s in n)t[s]=n[s]}return t}function Ph(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function wf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ll(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var Au={clone:Si,merge:Ne},Tf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ke=class extends On{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tf,this.fragmentShader=Af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Si(t.uniforms),this.uniformsGroups=wf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Yt().setHex(s.value);break;case"v2":this.uniforms[n].value=new ot().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new me().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ht().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},So=class extends Ke{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ss=class extends On{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ea,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Eo=class extends On{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},wo=class extends On{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function zi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Mc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Kn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},To=class extends Kn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wc,endingEnd:wc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Tc:r=t,a=2*e-n;break;case Ac:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Tc:o=t,c=2*n-e;break;case Ac:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),y=m*m,g=y*m,p=-u*g+2*u*y-u*m,T=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*m+1,A=(-1-f)*g+(1.5+f)*y+.5*m,b=f*g-f*y;for(let M=0;M!==a;++M)r[M]=p*o[h+M]+T*o[l+M]+A*o[c+M]+b*o[d+M];return r}},Ao=class extends Kn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}},Ro=class extends Kn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Co=class extends Kn{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-e)/(s-e),y=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*y+o[c+g]*m;return r}let u=a*2,f=t-1;for(let m=0;m!==a;++m){let y=o[l+m],g=o[c+m],p=f*u+m*2,T=d[p],A=d[p+1],b=t*u+m*2,M=h[b],S=h[b+1],R=Cf(n,e,T,M,s);r[m]=Ru(R,y,A,S,g)}return r}};function Ru(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Rf(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Cf(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Ru(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Rf(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var je=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=zi(e,this.TimeBufferType),this.values=zi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:zi(t.times,Array),values:zi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Mc(t.settings)&&(n.settings={inTangents:zi(t.settings.inTangents,Array),outTangents:zi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ro(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ao(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new To(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Co(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Is:e=this.InterpolantFactoryMethodDiscrete;break;case oo:e=this.InterpolantFactoryMethodLinear;break;case $r:e=this.InterpolantFactoryMethodSmooth;break;case Ec:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Nt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Is;case this.InterpolantFactoryMethodLinear:return oo;case this.InterpolantFactoryMethodSmooth:return $r;case this.InterpolantFactoryMethodBezier:return Ec}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Mc(this.settings)&&(Ih(this.settings.inTangents,t),Ih(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ot("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Ot("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&x1(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Ot("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===$r,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let y=e[d+m];if(y!==e[u+m]||y!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Mc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Ih(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}je.prototype.ValueTypeName="";je.prototype.TimeBufferType=Float32Array;je.prototype.ValueBufferType=Float32Array;je.prototype.DefaultInterpolation=oo;var jn=class extends je{constructor(t,e,n){super(t,e,n)}};jn.prototype.ValueTypeName="bool";jn.prototype.ValueBufferType=Array;jn.prototype.DefaultInterpolation=Is;jn.prototype.InterpolantFactoryMethodLinear=void 0;jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Po=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Po.prototype.ValueTypeName="color";var Io=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Io.prototype.ValueTypeName="number";var Lo=class extends Kn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)$e.slerpFlat(r,0,o,l-a,o,l,c);return r}},Qs=class extends je{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Lo(this.times,this.values,this.getValueSize(),t)}};Qs.prototype.ValueTypeName="quaternion";Qs.prototype.InterpolantFactoryMethodSmooth=void 0;var Qn=class extends je{constructor(t,e,n){super(t,e,n)}};Qn.prototype.ValueTypeName="string";Qn.prototype.ValueBufferType=Array;Qn.prototype.DefaultInterpolation=Is;Qn.prototype.InterpolantFactoryMethodLinear=void 0;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Do=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Do.prototype.ValueTypeName="vector";var No=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Cu=new No,Uo=class{constructor(t){this.manager=t!==void 0?t:Cu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Uo.DEFAULT_MATERIAL_NAME="__DEFAULT";var rs=class extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},tr=class extends rs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Sc=new ue,Lh=new L,Dh=new L,Fo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=Ge,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ji,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Lh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lh),Dh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Sc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Sc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Yi||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Sc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},qr=new L,Zr=new $e,yn=new L,er=class extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(qr,Zr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Zr,yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(qr,Zr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Zr,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qn=new L,Nh=new ot,Uh=new ot,De=class extends er{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(As*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(As*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qn.x,qn.y).multiplyScalar(-t/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-t/qn.z)}getViewSize(t,e){return this.getViewBounds(t,Nh,Uh),e.subVectors(Uh,Nh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(As*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var os=class extends er{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Lc=class extends Fo{constructor(){super(new os(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},as=class extends rs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Lc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},nr=class extends rs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Hi=-90,Vi=1,Oo=class extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new De(Hi,Vi,t,e);s.layers=this.layers,this.add(s);let r=new De(Hi,Vi,t,e);r.layers=this.layers,this.add(r);let o=new De(Hi,Vi,t,e);o.layers=this.layers,this.add(o);let a=new De(Hi,Vi,t,e);a.layers=this.layers,this.add(a);let c=new De(Hi,Vi,t,e);c.layers=this.layers,this.add(c);let l=new De(Hi,Vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Yi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Bo=class extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var hl="\\[\\]\\.:\\/",Pf=new RegExp("["+hl+"]","g"),ul="[^"+hl+"]",If="[^"+hl.replace("\\.","")+"]",Lf=/((?:WC+[\/:])*)/.source.replace("WC",ul),Df=/(WCOD+)?/.source.replace("WCOD",If),Nf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ul),Uf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ul),Ff=new RegExp("^"+Lf+Df+Nf+Uf+"$"),Of=["material","materials","bones","map"],Dc=class{constructor(t,e,n){let s=n||fe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},fe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Pf,"")}static parseTrackName(t){let e=Ff.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Of.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Nt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;Ot("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fe.Composite=Dc;fe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};fe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};fe.prototype.GetterByBindingType=[fe.prototype._getValue_direct,fe.prototype._getValue_array,fe.prototype._getValue_arrayElement,fe.prototype._getValue_toArray];fe.prototype.SetterByBindingTypeAndVersioning=[[fe.prototype._setValue_direct,fe.prototype._setValue_direct_setNeedsUpdate,fe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_array,fe.prototype._setValue_array_setNeedsUpdate,fe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_arrayElement,fe.prototype._setValue_arrayElement_setNeedsUpdate,fe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fe.prototype._setValue_fromArray,fe.prototype._setValue_fromArray_setNeedsUpdate,fe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var tg=new Float32Array(1);var Fh=new ue,ir=class{constructor(t,e,n=0,s=1/0){this.ray=new $n(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ji,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ot("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fh),this}intersectObject(t,e=!0,n=[]){return Nc(t,this,n,e),n.sort(Oh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Nc(t[s],this,n,e);return n.sort(Oh),n}};function Oh(i,t){return i.distance-t.distance}function Nc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Nc(r[o],t,e,!0)}}var cs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Uc=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};var sr=class extends mo{constructor(t=10,e=10,n=4473924,s=8947848){n=new Yt(n),s=new Yt(s);let r=e/2,o=t/e,a=t/2,c=[],l=[];for(let u=0,f=0,m=-a;u<=e;u++,m+=o){c.push(-a,0,m,a,0,m),c.push(m,0,-a,m,0,a);let y=u===r?n:s;y.toArray(l,f),f+=3,y.toArray(l,f),f+=3,y.toArray(l,f),f+=3,y.toArray(l,f),f+=3}let h=new be;h.setAttribute("position",new pe(c,3)),h.setAttribute("color",new pe(l,3));let d=new ks({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var rr=class extends hn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function dl(i,t,e,n){let s=Bf(n);switch(e){case el:return i*t;case il:return i*t/s.components*s.byteLength;case Xo:return i*t/s.components*s.byteLength;case oi:return i*t*2/s.components*s.byteLength;case Yo:return i*t*2/s.components*s.byteLength;case nl:return i*t*3/s.components*s.byteLength;case nn:return i*t*4/s.components*s.byteLength;case qo:return i*t*4/s.components*s.byteLength;case lr:case hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ur:case dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $o:case Ko:return Math.max(i,16)*Math.max(t,8)/4;case Zo:case Jo:return Math.max(i,8)*Math.max(t,8)/2;case jo:case Qo:case ea:case na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ta:case fr:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case aa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case la:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ha:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ua:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case da:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ga:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case _a:case ya:case va:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ba:case Ma:return Math.ceil(i/4)*Math.ceil(t/4)*8;case pr:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Bf(i){switch(i){case Ge:case Kc:return{byteLength:1,components:1};case us:case jc:case mn:return{byteLength:2,components:1};case Go:case Wo:return{byteLength:2,components:4};case fn:case Vo:case pn:return{byteLength:4,components:1};case Qc:case tl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ku(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function zf(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let y=d[f];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Hf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vf=`#ifdef USE_ALPHAHASH
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
#endif`,Gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qf=`#ifdef USE_AOMAP
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
#endif`,Zf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$f=`#ifdef USE_BATCHING
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
#endif`,Jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tp=`#ifdef USE_IRIDESCENCE
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
#endif`,ep=`#ifdef USE_BUMPMAP
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
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,hp=`#define PI 3.141592653589793
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
} // validated`,up=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dp=`vec3 transformedNormal = objectNormal;
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
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",_p=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yp=`#ifdef USE_ENVMAP
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
#endif`,vp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,Mp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rp=`#ifdef USE_GRADIENTMAP
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
}`,Cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bp=`PhysicalMaterial material;
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
#endif`,kp=`uniform sampler2D dfgLUT;
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
}`,zp=`
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
#endif`,Hp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kp=`#if defined( USE_POINTS_UV )
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
#endif`,jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,t0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,e0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,n0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,i0=`#ifdef USE_MORPHTARGETS
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
#endif`,s0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,o0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,a0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,h0=`#ifdef USE_NORMALMAP
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
#endif`,u0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,d0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,f0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,p0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,m0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,g0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,x0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,v0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,b0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,M0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,S0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,E0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,w0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,T0=`float getShadowMask() {
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
}`,A0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,R0=`#ifdef USE_SKINNING
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
#endif`,C0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,P0=`#ifdef USE_SKINNING
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
#endif`,I0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,L0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,D0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,N0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,U0=`#ifdef USE_TRANSMISSION
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
#endif`,F0=`#ifdef USE_TRANSMISSION
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
#endif`,O0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,z0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,H0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,V0=`uniform sampler2D t2D;
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
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,W0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,X0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q0=`#include <common>
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
}`,Z0=`#if DEPTH_PACKING == 3200
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
}`,$0=`#define DISTANCE
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
}`,J0=`#define DISTANCE
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
}`,K0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,j0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q0=`uniform float scale;
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
}`,t2=`uniform vec3 diffuse;
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
}`,e2=`#include <common>
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
}`,n2=`uniform vec3 diffuse;
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
}`,i2=`#define LAMBERT
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
}`,s2=`#define LAMBERT
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
}`,r2=`#define MATCAP
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
}`,o2=`#define MATCAP
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
}`,a2=`#define NORMAL
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
}`,c2=`#define NORMAL
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
}`,l2=`#define PHONG
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
}`,h2=`#define PHONG
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
}`,u2=`#define STANDARD
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
}`,d2=`#define STANDARD
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
}`,f2=`#define TOON
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
}`,p2=`#define TOON
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
}`,m2=`uniform float size;
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
}`,g2=`uniform vec3 diffuse;
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
}`,x2=`#include <common>
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
}`,_2=`uniform vec3 color;
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
}`,y2=`uniform float rotation;
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
}`,v2=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:Hf,alphahash_pars_fragment:Vf,alphamap_fragment:Gf,alphamap_pars_fragment:Wf,alphatest_fragment:Xf,alphatest_pars_fragment:Yf,aomap_fragment:qf,aomap_pars_fragment:Zf,batching_pars_vertex:$f,batching_vertex:Jf,begin_vertex:Kf,beginnormal_vertex:jf,bsdfs:Qf,iridescence_fragment:tp,bumpmap_pars_fragment:ep,clipping_planes_fragment:np,clipping_planes_pars_fragment:ip,clipping_planes_pars_vertex:sp,clipping_planes_vertex:rp,color_fragment:op,color_pars_fragment:ap,color_pars_vertex:cp,color_vertex:lp,common:hp,cube_uv_reflection_fragment:up,defaultnormal_vertex:dp,displacementmap_pars_vertex:fp,displacementmap_vertex:pp,emissivemap_fragment:mp,emissivemap_pars_fragment:gp,colorspace_fragment:xp,colorspace_pars_fragment:_p,envmap_fragment:yp,envmap_common_pars_fragment:vp,envmap_pars_fragment:bp,envmap_pars_vertex:Mp,envmap_physical_pars_fragment:Dp,envmap_vertex:Sp,fog_vertex:Ep,fog_pars_vertex:wp,fog_fragment:Tp,fog_pars_fragment:Ap,gradientmap_pars_fragment:Rp,lightmap_pars_fragment:Cp,lights_lambert_fragment:Pp,lights_lambert_pars_fragment:Ip,lights_pars_begin:Lp,lights_toon_fragment:Np,lights_toon_pars_fragment:Up,lights_phong_fragment:Fp,lights_phong_pars_fragment:Op,lights_physical_fragment:Bp,lights_physical_pars_fragment:kp,lights_fragment_begin:zp,lights_fragment_maps:Hp,lights_fragment_end:Vp,lightprobes_pars_fragment:Gp,logdepthbuf_fragment:Wp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:Yp,logdepthbuf_vertex:qp,map_fragment:Zp,map_pars_fragment:$p,map_particle_fragment:Jp,map_particle_pars_fragment:Kp,metalnessmap_fragment:jp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:t0,morphcolor_vertex:e0,morphnormal_vertex:n0,morphtarget_pars_vertex:i0,morphtarget_vertex:s0,normal_fragment_begin:r0,normal_fragment_maps:o0,normal_pars_fragment:a0,normal_pars_vertex:c0,normal_vertex:l0,normalmap_pars_fragment:h0,clearcoat_normal_fragment_begin:u0,clearcoat_normal_fragment_maps:d0,clearcoat_pars_fragment:f0,iridescence_pars_fragment:p0,opaque_fragment:m0,packing:g0,premultiplied_alpha_fragment:x0,project_vertex:_0,dithering_fragment:y0,dithering_pars_fragment:v0,roughnessmap_fragment:b0,roughnessmap_pars_fragment:M0,shadowmap_pars_fragment:S0,shadowmap_pars_vertex:E0,shadowmap_vertex:w0,shadowmask_pars_fragment:T0,skinbase_vertex:A0,skinning_pars_vertex:R0,skinning_vertex:C0,skinnormal_vertex:P0,specularmap_fragment:I0,specularmap_pars_fragment:L0,tonemapping_fragment:D0,tonemapping_pars_fragment:N0,transmission_fragment:U0,transmission_pars_fragment:F0,uv_pars_fragment:O0,uv_pars_vertex:B0,uv_vertex:k0,worldpos_vertex:z0,background_vert:H0,background_frag:V0,backgroundCube_vert:G0,backgroundCube_frag:W0,cube_vert:X0,cube_frag:Y0,depth_vert:q0,depth_frag:Z0,distance_vert:$0,distance_frag:J0,equirect_vert:K0,equirect_frag:j0,linedashed_vert:Q0,linedashed_frag:t2,meshbasic_vert:e2,meshbasic_frag:n2,meshlambert_vert:i2,meshlambert_frag:s2,meshmatcap_vert:r2,meshmatcap_frag:o2,meshnormal_vert:a2,meshnormal_frag:c2,meshphong_vert:l2,meshphong_frag:h2,meshphysical_vert:u2,meshphysical_frag:d2,meshtoon_vert:f2,meshtoon_frag:p2,points_vert:m2,points_frag:g2,shadow_vert:x2,shadow_frag:_2,sprite_vert:y2,sprite_frag:v2},gt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},wn={basic:{uniforms:Ne([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Ne([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Ne([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Ne([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Ne([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Ne([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Ne([gt.points,gt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Ne([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Ne([gt.common,gt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Ne([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Ne([gt.sprite,gt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:Ne([gt.common,gt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:Ne([gt.lights,gt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};wn.physical={uniforms:Ne([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var Aa={r:0,b:0,g:0},b2=new ue,ju=new Ht;ju.set(-1,0,0,0,1,0,0,0,1);function M2(i,t,e,n,s,r){let o=new Yt(0),a=s===!0?0:1,c,l,h=null,d=0,u=null;function f(T){let A=T.isScene===!0?T.background:null;if(A&&A.isTexture){let b=T.backgroundBlurriness>0;A=t.get(A,b)}return A}function m(T){let A=!1,b=f(T);b===null?g(o,a):b&&b.isColor&&(g(b,1),A=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(T,A){let b=f(A);b&&(b.isCubeTexture||b.mapping===ar)?(l===void 0&&(l=new Me(new Qi(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:Si(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(b2.makeRotationFromEuler(A.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ju),l.material.toneMapped=Kt.getTransfer(b.colorSpace)!==se,(h!==b||d!==b.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Me(new Ks(2,2),new Ke({name:"BackgroundMaterial",uniforms:Si(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(b.colorSpace)!==se,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function g(T,A){T.getRGB(Aa,ll(i)),e.buffers.color.setClear(Aa.r,Aa.g,Aa.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,A=1){o.set(T),a=A,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(T){a=T,g(o,a)},render:m,addToRenderList:y,dispose:p}}function S2(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(P,F,k,D,B){let X=!1,W=d(P,D,k,F);r!==W&&(r=W,l(r.object)),X=f(P,D,k,B),X&&m(P,D,k,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,b(P,F,k,D),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,F,k,D){let B=D.wireframe===!0,X=n[F.id];X===void 0&&(X={},n[F.id]=X);let W=P.isInstancedMesh===!0?P.id:0,nt=X[W];nt===void 0&&(nt={},X[W]=nt);let Y=nt[k.id];Y===void 0&&(Y={},nt[k.id]=Y);let j=Y[B];return j===void 0&&(j=u(c()),Y[B]=j),j}function u(P){let F=[],k=[],D=[];for(let B=0;B<e;B++)F[B]=0,k[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:k,attributeDivisors:D,object:P,attributes:{},index:null}}function f(P,F,k,D){let B=r.attributes,X=F.attributes,W=0,nt=k.getAttributes();for(let Y in nt)if(nt[Y].location>=0){let et=B[Y],Ct=X[Y];if(Ct===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(Ct=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(Ct=P.instanceColor)),et===void 0||et.attribute!==Ct||Ct&&et.data!==Ct.data)return!0;W++}return r.attributesNum!==W||r.index!==D}function m(P,F,k,D){let B={},X=F.attributes,W=0,nt=k.getAttributes();for(let Y in nt)if(nt[Y].location>=0){let et=X[Y];et===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(et=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(et=P.instanceColor));let Ct={};Ct.attribute=et,et&&et.data&&(Ct.data=et.data),B[Y]=Ct,W++}r.attributes=B,r.attributesNum=W,r.index=D}function y(){let P=r.newAttributes;for(let F=0,k=P.length;F<k;F++)P[F]=0}function g(P){p(P,0)}function p(P,F){let k=r.newAttributes,D=r.enabledAttributes,B=r.attributeDivisors;k[P]=1,D[P]===0&&(i.enableVertexAttribArray(P),D[P]=1),B[P]!==F&&(i.vertexAttribDivisor(P,F),B[P]=F)}function T(){let P=r.newAttributes,F=r.enabledAttributes;for(let k=0,D=F.length;k<D;k++)F[k]!==P[k]&&(i.disableVertexAttribArray(k),F[k]=0)}function A(P,F,k,D,B,X,W){W===!0?i.vertexAttribIPointer(P,F,k,B,X):i.vertexAttribPointer(P,F,k,D,B,X)}function b(P,F,k,D){y();let B=D.attributes,X=k.getAttributes(),W=F.defaultAttributeValues;for(let nt in X){let Y=X[nt];if(Y.location>=0){let j=B[nt];if(j===void 0&&(nt==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),nt==="instanceColor"&&P.instanceColor&&(j=P.instanceColor)),j!==void 0){let et=j.normalized,Ct=j.itemSize,Et=t.get(j);if(Et===void 0)continue;let te=Et.buffer,Zt=Et.type,jt=Et.bytesPerElement,$=Zt===i.INT||Zt===i.UNSIGNED_INT||j.gpuType===Vo;if(j.isInterleavedBufferAttribute){let Q=j.data,xt=Q.stride,Bt=j.offset;if(Q.isInstancedInterleavedBuffer){for(let bt=0;bt<Y.locationSize;bt++)p(Y.location+bt,Q.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let bt=0;bt<Y.locationSize;bt++)g(Y.location+bt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let bt=0;bt<Y.locationSize;bt++)A(Y.location+bt,Ct/Y.locationSize,Zt,et,xt*jt,(Bt+Ct/Y.locationSize*bt)*jt,$)}else{if(j.isInstancedBufferAttribute){for(let Q=0;Q<Y.locationSize;Q++)p(Y.location+Q,j.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Q=0;Q<Y.locationSize;Q++)g(Y.location+Q);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Q=0;Q<Y.locationSize;Q++)A(Y.location+Q,Ct/Y.locationSize,Zt,et,Ct*jt,Ct/Y.locationSize*Q*jt,$)}}else if(W!==void 0){let et=W[nt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(Y.location,et);break;case 3:i.vertexAttrib3fv(Y.location,et);break;case 4:i.vertexAttrib4fv(Y.location,et);break;default:i.vertexAttrib1fv(Y.location,et)}}}}T()}function M(){E();for(let P in n){let F=n[P];for(let k in F){let D=F[k];for(let B in D){let X=D[B];for(let W in X)h(X[W].object),delete X[W];delete D[B]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let F=n[P.id];for(let k in F){let D=F[k];for(let B in D){let X=D[B];for(let W in X)h(X[W].object),delete X[W];delete D[B]}}delete n[P.id]}function R(P){for(let F in n){let k=n[F];for(let D in k){let B=k[D];if(B[P.id]===void 0)continue;let X=B[P.id];for(let W in X)h(X[W].object),delete X[W];delete B[P.id]}}}function _(P){for(let F in n){let k=n[F],D=P.isInstancedMesh===!0?P.id:0,B=k[D];if(B!==void 0){for(let X in B){let W=B[X];for(let nt in W)h(W[nt].object),delete W[nt];delete B[X]}delete k[D],Object.keys(k).length===0&&delete n[F]}}}function E(){C(),o=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:C,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:g,disableUnusedAttributes:T}}function E2(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function w2(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==nn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let _=R===mn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Ge&&R!==pn&&!_&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Nt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:T,maxVaryings:A,maxFragmentUniforms:b,maxSamples:M,samples:S}}function T2(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Ze,a=new Ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let T=r?0:n,A=T*4,b=p.clippingState||null;c.value=b,b=h(m,u,A,f);for(let M=0;M!==A;++M)b[M]=e[M];p.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=f+y*4,T=u.matrixWorldInverse;a.getNormalMatrix(T),(g===null||g.length<p)&&(g=new Float32Array(p));for(let A=0,b=f;A!==y;++A,b+=4)o.copy(d[A]).applyMatrix4(T,a),o.normal.toArray(g,b),g[b+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}var ps=4,A2=6,R2=20,C2=256,mr=new os,Pu=new Yt,fl=null,pl=0,ml=0,gl=!1,P2=new L,Ei=new L,Ca=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=P2}=r;fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Du(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(fl,pl,ml),this._renderer.xr.enabled=gl,t.scissorTest=!1,fs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ii||t.mapping===bi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Re,minFilter:Re,generateMipmaps:!1,type:mn,format:nn,colorSpace:Ls,depthBuffer:!1},s=Iu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Iu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=I2(r)),this._blurMaterial=D2(r,t,e),this._ggxMaterial=L2(r,t,e)}return s}_compileMaterial(t){let e=new Me(new be,t);this._renderer.compile(e,mr)}_sceneToCubeUV(t,e,n,s,r){let c=new De(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Pu),d.toneMapping=dn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Me(new Qi,new Mn({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,T=t.background;T?T.isColor&&(g.color.copy(T),t.background=null,p=!0):(g.color.copy(Pu),p=!0);for(let A=0;A<6;A++){let b=A%3;b===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):b===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));let M=this._cubeSize;fs(s,b*M,A>2?M:0,M,M),d.setRenderTarget(s),p&&d.render(y,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=T}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ii||t.mapping===bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Du()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;fs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,mr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,f=d*u,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-ps?n-m+ps:0),p=4*(this._cubeSize-y);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=m-e,fs(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(a,mr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,fs(t,g,p,3*y,2*y),s.setRenderTarget(t),s.render(a,mr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-ps?s-this._lodMax+ps:0),u=4*(this._cubeSize-h);fs(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(c,mr)}};function I2(i){let t=[],e=[],n=i,s=i-ps+1+A2;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,f=3,m=new Float32Array(f*u*d),y=new Float32Array(f*u*d);for(let p=0;p<d;p++){let T=p%3*2/3-1,A=p>2?0:-1,b=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];m.set(b,f*u*p);for(let M=0;M<u;M++){let S=h[M*2]*2-1,R=h[M*2+1]*2-1;p===0?Ei.set(1,R,S):p===1?Ei.set(-S,1,-R):p===2?Ei.set(-S,R,1):p===3?Ei.set(-1,R,-S):p===4?Ei.set(-S,-1,R):Ei.set(S,R,-1),Ei.toArray(y,(p*u+M)*f)}}let g=new be;g.setAttribute("position",new Oe(m,f)),g.setAttribute("outputDirection",new Oe(y,f)),e.push(new Me(g,null)),n>ps&&n--}return{lodMeshes:e,sizeLods:t}}function Iu(i,t,e){let n=new Ve(i,t,e);return n.texture.mapping=ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function L2(i,t,e){return new Ke({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:C2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:La(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function D2(i,t,e){return new Ke({name:"SphericalGaussianBlur",defines:{SAMPLES:R2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:La(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Lu(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:La(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Du(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function La(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Pa=class extends Ve{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new zs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Qi(5,5,5),r=new Ke({name:"CubemapFromEquirect",uniforms:Si(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:Sn});r.uniforms.tEquirect.value=e;let o=new Me(s,r),a=e.minFilter;return e.minFilter===si&&(e.minFilter=Re),new Oo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function N2(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===ko||f===zo)if(t.has(u)){let m=t.get(u).texture;return a(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let y=new Pa(m.height);return y.fromEquirectangularTexture(i,u),t.set(u,y),u.addEventListener("dispose",l),a(y.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,m=f===ko||f===zo,y=f===ii||f===bi;if(m||y){let g=e.get(u),p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Ca(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let T=u.image;return m&&T&&T.height>0||y&&T&&c(T)?(n===null&&(n=new Ca(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===ko?u.mapping=ii:f===zo&&(u.mapping=bi),u}function c(u){let f=0,m=6;for(let y=0;y<m;y++)u[y]!==void 0&&f++;return f===m}function l(u){let f=u.target;f.removeEventListener("dispose",l);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function U2(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&gi("WebGLRenderer: "+n+" extension not supported."),s}}}function F2(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,m=d.attributes.position,y=0;if(m===void 0)return;if(f!==null){let T=f.array;y=f.version;for(let A=0,b=T.length;A<b;A+=3){let M=T[A+0],S=T[A+1],R=T[A+2];u.push(M,S,S,R,R,M)}}else{let T=m.array;y=m.version;for(let A=0,b=T.length/3-1;A<b;A+=3){let M=A+0,S=A+1,R=A+2;u.push(M,S,S,R,R,M)}}let g=new(m.count>=65535?Bs:Os)(u,1);g.version=y;let p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function O2(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function l(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let g=0;g<f;g++)y+=u[g];e.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function B2(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Ot("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function k2(i,t,e){let n=new WeakMap,s=new me;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let E=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],A=0;f===!0&&(A=1),m===!0&&(A=2),y===!0&&(A=3);let b=a.attributes.position.count*A,M=1;b>t.maxTextureSize&&(M=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let S=new Float32Array(b*M*4*d),R=new Us(S,b,M,d);R.type=pn,R.needsUpdate=!0;let _=A*4;for(let C=0;C<d;C++){let P=g[C],F=p[C],k=T[C],D=b*M*4*C;for(let B=0;B<P.count;B++){let X=B*_;f===!0&&(s.fromBufferAttribute(P,B),S[D+X+0]=s.x,S[D+X+1]=s.y,S[D+X+2]=s.z,S[D+X+3]=0),m===!0&&(s.fromBufferAttribute(F,B),S[D+X+4]=s.x,S[D+X+5]=s.y,S[D+X+6]=s.z,S[D+X+7]=0),y===!0&&(s.fromBufferAttribute(k,B),S[D+X+8]=s.x,S[D+X+9]=s.y,S[D+X+10]=s.z,S[D+X+11]=k.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new ot(b,M)},n.set(a,u),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function z2(i,t,e,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var H2={[Gc]:"LINEAR_TONE_MAPPING",[Wc]:"REINHARD_TONE_MAPPING",[Xc]:"CINEON_TONE_MAPPING",[Yc]:"ACES_FILMIC_TONE_MAPPING",[Zc]:"AGX_TONE_MAPPING",[$c]:"NEUTRAL_TONE_MAPPING",[qc]:"CUSTOM_TONE_MAPPING"};function V2(i,t,e,n,s,r){let o=new Ve(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new be;l.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new pe([0,2,0,0,2,0],2));let h=new So({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Me(l,h),u=new os(-1,1,1,-1,0,1),f=null,m=null,y=!1,g,p=null,T=[],A=!1;this.setSize=function(b,M){o.setSize(b,M),a!==null&&a.setSize(b,M),c!==null&&c.setSize(b,M);for(let S=0;S<T.length;S++){let R=T[S];R.setSize&&R.setSize(b,M)}},this.setEffects=function(b){T=b,A=T.length>0&&T[0].isRenderPass===!0;let M=o.width,S=o.height;T.length>0&&a===null&&(a=new Ve(M,S,{type:mn,depthBuffer:!1,stencilBuffer:!1}),c=new Ve(M,S,{type:mn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<T.length;R++){let _=T[R];_.setSize&&_.setSize(M,S)}},this.begin=function(b,M){if(y||b.toneMapping===dn&&T.length===0)return!1;if(p=M,M!==null){let S=M.width,R=M.height;(o.width!==S||o.height!==R)&&this.setSize(S,R)}return A===!1&&b.setRenderTarget(o),g=b.toneMapping,b.toneMapping=dn,!0},this.hasRenderPass=function(){return A},this.end=function(b,M){b.toneMapping=g,y=!0;let S=o,R=a;for(let _=0;_<T.length;_++){let E=T[_];E.enabled!==!1&&(E.render(b,R,S,M),E.needsSwap!==!1&&(S=R,R=R===a?c:a))}if(f!==b.outputColorSpace||m!==b.toneMapping){f=b.outputColorSpace,m=b.toneMapping,h.defines={},Kt.getTransfer(f)===se&&(h.defines.SRGB_TRANSFER="");let _=H2[m];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(p),b.render(d,u),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Qu=new He,yl=new Jn(1,1),td=new Us,ed=new lo,nd=new zs,Nu=[],Uu=[],Fu=new Float32Array(16),Ou=new Float32Array(9),Bu=new Float32Array(4);function gs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Nu[s];if(r===void 0&&(r=new Float32Array(s),Nu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Se(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Da(i,t){let e=Uu[t];e===void 0&&(e=new Int32Array(t),Uu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function G2(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function W2(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function X2(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Y2(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function q2(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Bu.set(n),i.uniformMatrix2fv(this.addr,!1,Bu),Ee(e,n)}}function Z2(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Ou.set(n),i.uniformMatrix3fv(this.addr,!1,Ou),Ee(e,n)}}function $2(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Fu.set(n),i.uniformMatrix4fv(this.addr,!1,Fu),Ee(e,n)}}function J2(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function K2(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function j2(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function Q2(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function t3(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function e3(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function n3(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function i3(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function s3(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(yl.compareFunction=e.isReversedDepthBuffer()?Ta:wa,r=yl):r=Qu,e.setTexture2D(t||r,s)}function r3(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ed,s)}function o3(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||nd,s)}function a3(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||td,s)}function c3(i){switch(i){case 5126:return G2;case 35664:return W2;case 35665:return X2;case 35666:return Y2;case 35674:return q2;case 35675:return Z2;case 35676:return $2;case 5124:case 35670:return J2;case 35667:case 35671:return K2;case 35668:case 35672:return j2;case 35669:case 35673:return Q2;case 5125:return t3;case 36294:return e3;case 36295:return n3;case 36296:return i3;case 35678:case 36198:case 36298:case 36306:case 35682:return s3;case 35679:case 36299:case 36307:return r3;case 35680:case 36300:case 36308:case 36293:return o3;case 36289:case 36303:case 36311:case 36292:return a3}}function l3(i,t){i.uniform1fv(this.addr,t)}function h3(i,t){let e=gs(t,this.size,2);i.uniform2fv(this.addr,e)}function u3(i,t){let e=gs(t,this.size,3);i.uniform3fv(this.addr,e)}function d3(i,t){let e=gs(t,this.size,4);i.uniform4fv(this.addr,e)}function f3(i,t){let e=gs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function p3(i,t){let e=gs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function m3(i,t){let e=gs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function g3(i,t){i.uniform1iv(this.addr,t)}function x3(i,t){i.uniform2iv(this.addr,t)}function _3(i,t){i.uniform3iv(this.addr,t)}function y3(i,t){i.uniform4iv(this.addr,t)}function v3(i,t){i.uniform1uiv(this.addr,t)}function b3(i,t){i.uniform2uiv(this.addr,t)}function M3(i,t){i.uniform3uiv(this.addr,t)}function S3(i,t){i.uniform4uiv(this.addr,t)}function E3(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=yl:o=Qu;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function w3(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ed,r[o])}function T3(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||nd,r[o])}function A3(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||td,r[o])}function R3(i){switch(i){case 5126:return l3;case 35664:return h3;case 35665:return u3;case 35666:return d3;case 35674:return f3;case 35675:return p3;case 35676:return m3;case 5124:case 35670:return g3;case 35667:case 35671:return x3;case 35668:case 35672:return _3;case 35669:case 35673:return y3;case 5125:return v3;case 36294:return b3;case 36295:return M3;case 36296:return S3;case 35678:case 36198:case 36298:case 36306:case 35682:return E3;case 35679:case 36299:case 36307:return w3;case 35680:case 36300:case 36308:case 36293:return T3;case 36289:case 36303:case 36311:case 36292:return A3}}var vl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=c3(e.type)}},bl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=R3(e.type)}},Ml=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},xl=/(\w+)(\])?(\[|\.)?/g;function ku(i,t){i.seq.push(t),i.map[t.id]=t}function C3(i,t,e){let n=i.name,s=n.length;for(xl.lastIndex=0;;){let r=xl.exec(n),o=xl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ku(e,l===void 0?new vl(a,i,t):new bl(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Ml(a),ku(e,d)),e=d}}}var ms=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);C3(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function zu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var P3=37297,I3=0;function L3(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Hu=new Ht;function D3(i){Kt._getMatrix(Hu,Kt.workingColorSpace,i);let t=`mat3( ${Hu.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case Ds:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Vu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+L3(i.getShaderSource(t),a)}else return r}function N3(i,t){let e=D3(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var U3={[Gc]:"Linear",[Wc]:"Reinhard",[Xc]:"Cineon",[Yc]:"ACESFilmic",[Zc]:"AgX",[$c]:"Neutral",[qc]:"Custom"};function F3(i,t){let e=U3[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ra=new L;function O3(){Kt.getLuminanceCoefficients(Ra);let i=Ra.x.toFixed(4),t=Ra.y.toFixed(4),e=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function B3(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xr).join(`
`)}function k3(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function z3(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function xr(i){return i!==""}function Gu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var H3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sl(i){return i.replace(H3,G3)}var V3=new Map;function G3(i,t){let e=qt[t];if(e===void 0){let n=V3.get(t);if(n!==void 0)e=qt[n],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Sl(e)}var W3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xu(i){return i.replace(W3,X3)}function X3(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Y3={[or]:"SHADOWMAP_TYPE_PCF",[ls]:"SHADOWMAP_TYPE_VSM"};function q3(i){return Y3[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Z3={[ii]:"ENVMAP_TYPE_CUBE",[bi]:"ENVMAP_TYPE_CUBE",[ar]:"ENVMAP_TYPE_CUBE_UV"};function $3(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Z3[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var J3={[bi]:"ENVMAP_MODE_REFRACTION"};function K3(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":J3[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var j3={[Vc]:"ENVMAP_BLENDING_MULTIPLY",[ru]:"ENVMAP_BLENDING_MIX",[ou]:"ENVMAP_BLENDING_ADD"};function Q3(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":j3[i.combine]||"ENVMAP_BLENDING_NONE"}function tm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function em(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=q3(e),l=$3(e),h=K3(e),d=Q3(e),u=tm(e),f=B3(e),m=k3(r),y=s.createProgram(),g,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(xr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(xr).join(`
`),p.length>0&&(p+=`
`)):(g=[Yu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xr).join(`
`),p=[Yu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==dn?"#define TONE_MAPPING":"",e.toneMapping!==dn?qt.tonemapping_pars_fragment:"",e.toneMapping!==dn?F3("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,N3("linearToOutputTexel",e.outputColorSpace),O3(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xr).join(`
`)),o=Sl(o),o=Gu(o,e),o=Wu(o,e),a=Sl(a),a=Gu(a,e),a=Wu(a,e),o=Xu(o),a=Xu(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=T+g+o,b=T+p+a,M=zu(s,s.VERTEX_SHADER,A),S=zu(s,s.FRAGMENT_SHADER,b);s.attachShader(y,M),s.attachShader(y,S),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(y)||"",k=s.getShaderInfoLog(M)||"",D=s.getShaderInfoLog(S)||"",B=F.trim(),X=k.trim(),W=D.trim(),nt=!0,Y=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(nt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,M,S);else{let j=Vu(s,M,"vertex"),et=Vu(s,S,"fragment");Ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+j+`
`+et)}else B!==""?Nt("WebGLProgram: Program Info Log:",B):(X===""||W==="")&&(Y=!1);Y&&(P.diagnostics={runnable:nt,programLog:B,vertexShader:{log:X,prefix:g},fragmentShader:{log:W,prefix:p}})}s.deleteShader(M),s.deleteShader(S),_=new ms(s,y),E=z3(s,y)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(y,P3)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=I3++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=S,this}var nm=0,El=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new wl(t),e.set(t,n)),n}},wl=class{constructor(t){this.id=nm++,this.code=t,this.usedTimes=0}};function im(i){return i===oi||i===fr||i===pr}function sm(i,t,e,n,s,r){let o=new Ji,a=new El,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return c.add(_),_===0?"uv":`uv${_}`}function y(_,E,C,P,F,k){let D=P.fog,B=F.geometry,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,nt=t.get(_.envMap||X,W),Y=nt&&nt.mapping===ar?nt.image.height:null,j=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Nt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let et=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ct=et!==void 0?et.length:0,Et=0;B.morphAttributes.position!==void 0&&(Et=1),B.morphAttributes.normal!==void 0&&(Et=2),B.morphAttributes.color!==void 0&&(Et=3);let te,Zt,jt,$;if(j){let le=wn[j];te=le.vertexShader,Zt=le.fragmentShader}else{te=_.vertexShader,Zt=_.fragmentShader;let le=a.getVertexShaderStage(_),ne=a.getFragmentShaderStage(_);a.update(_,le,ne),jt=le.id,$=ne.id}let Q=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),Bt=F.isInstancedMesh===!0,bt=F.isBatchedMesh===!0,kt=!!_.map,re=!!_.matcap,tt=!!nt,st=!!_.aoMap,rt=!!_.lightMap,at=!!_.bumpMap&&_.wireframe===!1,ht=!!_.normalMap,Ut=!!_.displacementMap,Dt=!!_.emissiveMap,zt=!!_.metalnessMap,Vt=!!_.roughnessMap,I=_.anisotropy>0,ee=_.clearcoat>0,$t=_.dispersion>0,w=_.retroreflectivity>0,x=_.iridescence>0,O=_.sheen>0,V=_.transmission>0,q=I&&!!_.anisotropyMap,ct=ee&&!!_.clearcoatMap,lt=ee&&!!_.clearcoatNormalMap,Z=ee&&!!_.clearcoatRoughnessMap,K=x&&!!_.iridescenceMap,ut=x&&!!_.iridescenceThicknessMap,Pt=O&&!!_.sheenColorMap,mt=O&&!!_.sheenRoughnessMap,dt=!!_.specularMap,It=!!_.specularColorMap,Ft=!!_.specularIntensityMap,Gt=V&&!!_.transmissionMap,U=V&&!!_.thicknessMap,ft=!!_.gradientMap,J=!!_.alphaMap,pt=_.alphaTest>0,vt=!!_.alphaHash,it=!!_.extensions,Lt=dn;_.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Lt=i.toneMapping);let At={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:te,fragmentShader:Zt,defines:_.defines,customVertexShaderID:jt,customFragmentShaderID:$,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:bt,batchingColor:bt&&F._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&F.instanceColor!==null,instancingMorph:Bt&&F.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:kt,matcap:re,envMap:tt,envMapMode:tt&&nt.mapping,envMapCubeUVHeight:Y,aoMap:st,lightMap:rt,bumpMap:at,normalMap:ht,displacementMap:Ut,emissiveMap:Dt,normalMapObjectSpace:ht&&_.normalMapType===lu,normalMapTangentSpace:ht&&_.normalMapType===Ea,packedNormalMap:ht&&_.normalMapType===Ea&&im(_.normalMap.format),metalnessMap:zt,roughnessMap:Vt,anisotropy:I,anisotropyMap:q,clearcoat:ee,clearcoatMap:ct,clearcoatNormalMap:lt,clearcoatRoughnessMap:Z,dispersion:$t,retroreflection:w,iridescence:x,iridescenceMap:K,iridescenceThicknessMap:ut,sheen:O,sheenColorMap:Pt,sheenRoughnessMap:mt,specularMap:dt,specularColorMap:It,specularIntensityMap:Ft,transmission:V,transmissionMap:Gt,thicknessMap:U,gradientMap:ft,opaque:_.transparent===!1&&_.blending===hs&&_.alphaToCoverage===!1,alphaMap:J,alphaTest:pt,alphaHash:vt,combine:_.combine,mapUv:kt&&m(_.map.channel),aoMapUv:st&&m(_.aoMap.channel),lightMapUv:rt&&m(_.lightMap.channel),bumpMapUv:at&&m(_.bumpMap.channel),normalMapUv:ht&&m(_.normalMap.channel),displacementMapUv:Ut&&m(_.displacementMap.channel),emissiveMapUv:Dt&&m(_.emissiveMap.channel),metalnessMapUv:zt&&m(_.metalnessMap.channel),roughnessMapUv:Vt&&m(_.roughnessMap.channel),anisotropyMapUv:q&&m(_.anisotropyMap.channel),clearcoatMapUv:ct&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:lt&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:mt&&m(_.sheenRoughnessMap.channel),specularMapUv:dt&&m(_.specularMap.channel),specularColorMapUv:It&&m(_.specularColorMap.channel),specularIntensityMapUv:Ft&&m(_.specularIntensityMap.channel),transmissionMapUv:Gt&&m(_.transmissionMap.channel),thicknessMapUv:U&&m(_.thicknessMap.channel),alphaMapUv:J&&m(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ht||I),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(kt||J),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&ht===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xt,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Et,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Lt,decodeVideoTexture:kt&&_.map.isVideoTexture===!0&&Kt.getTransfer(_.map.colorSpace)===se,decodeVideoTextureEmissive:Dt&&_.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(_.emissiveMap.colorSpace)===se,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Qe,flipSided:_.side===Be,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:it&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&_.extensions.multiDraw===!0||bt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return At.vertexUv1s=c.has(1),At.vertexUv2s=c.has(2),At.vertexUv3s=c.has(3),c.clear(),At}function g(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)E.push(C),E.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(p(E,_),T(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function p(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function T(_,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function A(_){let E=f[_.type],C;if(E){let P=wn[E];C=Au.clone(P.uniforms)}else C=_.uniforms;return C}function b(_,E){let C=h.get(E);return C!==void 0?++C.usedTimes:(C=new em(i,E,_,s),l.push(C),h.set(E,C)),C}function M(_){if(--_.usedTimes===0){let E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function S(_){a.remove(_)}function R(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:A,acquireProgram:b,releaseProgram:M,releaseShaderCache:S,programs:l,dispose:R}}function rm(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function om(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function qu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Zu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,m,y,g,p){let T=i[t];return T===void 0?(T={id:u.id,object:u,geometry:f,material:m,materialVariant:o(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:p},i[t]=T):(T.id=u.id,T.object=u,T.geometry=f,T.material=m,T.materialVariant=o(u),T.groupOrder=y,T.renderOrder=u.renderOrder,T.z=g,T.group=p),t++,T}function c(u,f,m,y,g,p,T){T.reversedDepth===!0&&(g=-g);let A=a(u,f,m,y,g,p);m.transmission>0?n.push(A):m.transparent===!0?s.push(A):e.push(A)}function l(u,f,m,y,g,p){let T=a(u,f,m,y,g,p);m.transmission>0?n.unshift(T):m.transparent===!0?s.unshift(T):e.unshift(T)}function h(u,f){e.length>1&&e.sort(u||om),n.length>1&&n.sort(f||qu),s.length>1&&s.sort(f||qu)}function d(){for(let u=t,f=i.length;u<f;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function am(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Zu,i.set(n,[o])):s>=r.length?(o=new Zu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function cm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new Yt};break;case"SpotLight":e={position:new L,direction:new L,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function lm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var hm=0;function um(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function dm(i){let t=new cm,e=lm(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new ue,o=new ue;function a(l){let h=0,d=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,T=0,A=0,b=0,M=0,S=0,R=0,_=0,E=0,C=0;l.sort(um);for(let F=0,k=l.length;F<k;F++){let D=l[F],B=D.color,X=D.intensity,W=D.distance,nt=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===oi?nt=D.shadow.map.texture:nt=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=B.r*X,d+=B.g*X,u+=B.b*X;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],X);C++}else if(D.isSunLight){let Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[m]=et,n.sunShadowMap[m]=nt;let Ct=j.getViewportCount();for(let Et=0;Et<Ct;Et++)n.sunShadowMatrix[y+Et]=j.getMatrix(Et),n.sunShadowCascade[y+Et]=j._cascadeData[Et];y+=Ct,m++}n.sun[f]=Y,f++}else if(D.isDirectionalLight){let Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,n.directionalShadow[g]=et,n.directionalShadowMap[g]=nt,n.directionalShadowMatrix[g]=D.shadow.matrix,M++}n.directional[g]=Y,g++}else if(D.isSpotLight){let Y=t.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(B).multiplyScalar(X),Y.distance=W,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[T]=Y;let j=D.shadow;if(D.map&&(n.spotLightMap[_]=D.map,_++,j.updateMatrices(D),D.castShadow&&E++),n.spotLightMatrix[T]=j.matrix,D.castShadow){let et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,n.spotShadow[T]=et,n.spotShadowMap[T]=nt,R++}T++}else if(D.isRectAreaLight){let Y=t.get(D);Y.color.copy(B).multiplyScalar(X),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[A]=Y,A++}else if(D.isPointLight){let Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){let j=D.shadow,et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,et.shadowCameraNear=j.camera.near,et.shadowCameraFar=j.camera.far,n.pointShadow[p]=et,n.pointShadowMap[p]=nt,n.pointShadowMatrix[p]=D.shadow.matrix,S++}n.point[p]=Y,p++}else if(D.isHemisphereLight){let Y=t.get(D);Y.skyColor.copy(D.color).multiplyScalar(X),Y.groundColor.copy(D.groundColor).multiplyScalar(X),n.hemi[b]=Y,b++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.sunLength!==f||P.directionalLength!==g||P.pointLength!==p||P.spotLength!==T||P.rectAreaLength!==A||P.hemiLength!==b||P.numSunShadows!==m||P.numDirectionalShadows!==M||P.numPointShadows!==S||P.numSpotShadows!==R||P.numSpotMaps!==_||P.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=g,n.spot.length=T,n.rectArea.length=A,n.point.length=p,n.hemi.length=b,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+_-E,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,P.sunLength=f,P.directionalLength=g,P.pointLength=p,P.spotLength=T,P.rectAreaLength=A,P.hemiLength=b,P.numSunShadows=m,P.numDirectionalShadows=M,P.numPointShadows=S,P.numSpotShadows=R,P.numSpotMaps=_,P.numLightProbes=C,n.version=hm++)}function c(l,h){let d=0,u=0,f=0,m=0,y=0,g=0,p=h.matrixWorldInverse;for(let T=0,A=l.length;T<A;T++){let b=l[T];if(b.isSunLight){let M=n.sun[d];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(p),d++}else if(b.isDirectionalLight){let M=n.directional[u];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),u++}else if(b.isSpotLight){let M=n.spot[m];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),m++}else if(b.isRectAreaLight){let M=n.rectArea[y];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),o.identity(),r.copy(b.matrixWorld),r.premultiply(p),o.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),y++}else if(b.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){let M=n.hemi[g];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:n}}function $u(i){let t=new dm(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function fm(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new $u(i),t.set(s,[a])):r>=o.length?(a=new $u(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var pm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mm=`uniform sampler2D shadow_pass;
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
}`,gm=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],xm=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Ju=new ue,gr=new L,_l=new L;function _m(i,t,e){let n=new ji,s=new ot,r=new ot,o=new me,a=new Eo,c=new wo,l={},h=e.maxTextureSize,d={[ni]:Be,[Be]:ni,[Qe]:Qe},u=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:pm,fragmentShader:mm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new be;m.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Me(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=or;let p=this.type;this.render=function(S,R,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===zh&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=or);let E=i.getRenderTarget(),C=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Sn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let k=p!==this.type;k&&R.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(B=>B.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,B=S.length;D<B;D++){let X=S[D],W=X.shadow;if(W===void 0){Nt("WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let nt=W.getFrameExtents();s.multiply(nt),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,W.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=Y,W.map===null||k===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===ls){if(X.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Ve(s.x,s.y,{format:oi,type:mn,minFilter:Re,magFilter:Re,generateMipmaps:!1}),W.map.texture.name=X.name+".shadowMap",W.map.depthTexture=new Jn(s.x,s.y,pn),W.map.depthTexture.name=X.name+".shadowMapDepth",W.map.depthTexture.format=bn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ae,W.map.depthTexture.magFilter=Ae}else X.isPointLight?(W.map=new Pa(s.x),W.map.depthTexture=new go(s.x,fn)):(W.map=new Ve(s.x,s.y),W.map.depthTexture=new Jn(s.x,s.y,fn)),W.map.depthTexture.name=X.name+".shadowMap",W.map.depthTexture.format=bn,this.type===or?(W.map.depthTexture.compareFunction=Y?Ta:wa,W.map.depthTexture.minFilter=Re,W.map.depthTexture.magFilter=Re):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ae,W.map.depthTexture.magFilter=Ae);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let j=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();X.isPointLight!==!0&&W.updateMatrices(X,_);for(let et=0;et<j;et++){let Ct=W.getCamera(et);if(X.isPointLight){let Et=W.camera,te=W.matrix,Zt=X.distance||Et.far;Zt!==Et.far&&(Et.far=Zt,Et.updateProjectionMatrix()),gr.setFromMatrixPosition(X.matrixWorld),Et.position.copy(gr),_l.copy(Et.position),_l.add(gm[et]),Et.up.copy(xm[et]),Et.lookAt(_l),Et.updateMatrixWorld(),te.makeTranslation(-gr.x,-gr.y,-gr.z),Ju.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Ju,Et.coordinateSystem,Et.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,et),i.clear();else{et===0&&(i.setRenderTarget(W.map),i.clear());let Et=W.getViewport(et);o.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),F.viewport(o)}n=W.getFrustum(et),b(R,_,Ct,X,this.type)}W.isPointLightShadow!==!0&&this.type===ls&&T(W,_),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(E,C,P)};function T(S,R){let _=t.update(y);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new Ve(s.x,s.y,{format:oi,type:mn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(R,null,_,u,y,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(R,null,_,f,y,null)}function A(S,R,_,E){let C=null,P=_.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)C=P;else if(C=_.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let F=C.uuid,k=R.uuid,D=l[F];D===void 0&&(D={},l[F]=D);let B=D[k];B===void 0&&(B=C.clone(),D[k]=B,R.addEventListener("dispose",M)),C=B}if(C.visible=R.visible,C.wireframe=R.wireframe,E===ls?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:d[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let F=i.properties.get(C);F.light=_}return C}function b(S,R,_,E,C){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&C===ls)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,S.matrixWorld);let k=t.update(S),D=S.material;if(Array.isArray(D)){let B=k.groups;for(let X=0,W=B.length;X<W;X++){let nt=B[X],Y=D[nt.materialIndex];if(Y&&Y.visible){let j=A(S,Y,E,C);S.onBeforeShadow(i,S,R,_,k,j,nt),i.renderBufferDirect(_,null,k,j,S,nt),S.onAfterShadow(i,S,R,_,k,j,nt)}}}else if(D.visible){let B=A(S,D,E,C);S.onBeforeShadow(i,S,R,_,k,B,null),i.renderBufferDirect(_,null,k,B,S,null),S.onAfterShadow(i,S,R,_,k,B,null)}}let F=S.children;for(let k=0,D=F.length;k<D;k++)b(F[k],R,_,E,C)}function M(S){S.target.removeEventListener("dispose",M);for(let _ in l){let E=l[_],C=S.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function ym(i,t){function e(){let U=!1,ft=new me,J=null,pt=new me(0,0,0,0);return{setMask:function(vt){J!==vt&&!U&&(i.colorMask(vt,vt,vt,vt),J=vt)},setLocked:function(vt){U=vt},setClear:function(vt,it,Lt,At,le){le===!0&&(vt*=At,it*=At,Lt*=At),ft.set(vt,it,Lt,At),pt.equals(ft)===!1&&(i.clearColor(vt,it,Lt,At),pt.copy(ft))},reset:function(){U=!1,J=null,pt.set(-1,0,0,0)}}}function n(){let U=!1,ft=!1,J=null,pt=null,vt=null;return{setReversed:function(it){if(ft!==it){let Lt=t.get("EXT_clip_control");it?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),ft=it;let At=vt;vt=null,this.setClear(At)}},getReversed:function(){return ft},setTest:function(it){it?Q(i.DEPTH_TEST):xt(i.DEPTH_TEST)},setMask:function(it){J!==it&&!U&&(i.depthMask(it),J=it)},setFunc:function(it){if(ft&&(it=bu[it]),pt!==it){switch(it){case Kr:i.depthFunc(i.NEVER);break;case jr:i.depthFunc(i.ALWAYS);break;case Qr:i.depthFunc(i.LESS);break;case Xi:i.depthFunc(i.LEQUAL);break;case to:i.depthFunc(i.EQUAL);break;case eo:i.depthFunc(i.GEQUAL);break;case no:i.depthFunc(i.GREATER);break;case io:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pt=it}},setLocked:function(it){U=it},setClear:function(it){vt!==it&&(vt=it,ft&&(it=1-it),i.clearDepth(it))},reset:function(){U=!1,J=null,pt=null,vt=null,ft=!1}}}function s(){let U=!1,ft=null,J=null,pt=null,vt=null,it=null,Lt=null,At=null,le=null;return{setTest:function(ne){U||(ne?Q(i.STENCIL_TEST):xt(i.STENCIL_TEST))},setMask:function(ne){ft!==ne&&!U&&(i.stencilMask(ne),ft=ne)},setFunc:function(ne,sn,gn){(J!==ne||pt!==sn||vt!==gn)&&(i.stencilFunc(ne,sn,gn),J=ne,pt=sn,vt=gn)},setOp:function(ne,sn,gn){(it!==ne||Lt!==sn||At!==gn)&&(i.stencilOp(ne,sn,gn),it=ne,Lt=sn,At=gn)},setLocked:function(ne){U=ne},setClear:function(ne){le!==ne&&(i.clearStencil(ne),le=ne)},reset:function(){U=!1,ft=null,J=null,pt=null,vt=null,it=null,Lt=null,At=null,le=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,T=null,A=null,b=null,M=null,S=null,R=null,_=new Yt(0,0,0),E=0,C=!1,P=null,F=null,k=null,D=null,B=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,nt=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=nt>=1):Y.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=nt>=2);let j=null,et={},Ct=i.getParameter(i.SCISSOR_BOX),Et=i.getParameter(i.VIEWPORT),te=new me().fromArray(Ct),Zt=new me().fromArray(Et);function jt(U,ft,J,pt){let vt=new Uint8Array(4),it=i.createTexture();i.bindTexture(U,it),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Lt=0;Lt<J;Lt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,pt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+Lt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return it}let $={};$[i.TEXTURE_2D]=jt(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(i.DEPTH_TEST),o.setFunc(Xi),at(!1),ht(Fc),Q(i.CULL_FACE),st(Sn);function Q(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function xt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Bt(U,ft){return u[U]!==ft?(i.bindFramebuffer(U,ft),u[U]=ft,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ft),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function bt(U,ft){let J=m,pt=!1;if(U){J=f.get(ft),J===void 0&&(J=[],f.set(ft,J));let vt=U.textures;if(J.length!==vt.length||J[0]!==i.COLOR_ATTACHMENT0){for(let it=0,Lt=vt.length;it<Lt;it++)J[it]=i.COLOR_ATTACHMENT0+it;J.length=vt.length,pt=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,pt=!0);pt&&i.drawBuffers(J)}function kt(U){return y!==U?(i.useProgram(U),y=U,!0):!1}let re={[vi]:i.FUNC_ADD,[Vh]:i.FUNC_SUBTRACT,[Gh]:i.FUNC_REVERSE_SUBTRACT};re[Wh]=i.MIN,re[Xh]=i.MAX;let tt={[Yh]:i.ZERO,[qh]:i.ONE,[Zh]:i.SRC_COLOR,[zc]:i.SRC_ALPHA,[tu]:i.SRC_ALPHA_SATURATE,[jh]:i.DST_COLOR,[Jh]:i.DST_ALPHA,[$h]:i.ONE_MINUS_SRC_COLOR,[Hc]:i.ONE_MINUS_SRC_ALPHA,[Qh]:i.ONE_MINUS_DST_COLOR,[Kh]:i.ONE_MINUS_DST_ALPHA,[eu]:i.CONSTANT_COLOR,[nu]:i.ONE_MINUS_CONSTANT_COLOR,[iu]:i.CONSTANT_ALPHA,[su]:i.ONE_MINUS_CONSTANT_ALPHA};function st(U,ft,J,pt,vt,it,Lt,At,le,ne){if(U===Sn){g===!0&&(xt(i.BLEND),g=!1);return}if(g===!1&&(Q(i.BLEND),g=!0),U!==Hh){if(U!==p||ne!==C){if((T!==vi||M!==vi)&&(i.blendEquation(i.FUNC_ADD),T=vi,M=vi),ne)switch(U){case hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFunc(i.ONE,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ot("WebGLState: Invalid blending: ",U);break}else switch(U){case hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bc:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kc:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",U);break}A=null,b=null,S=null,R=null,_.set(0,0,0),E=0,p=U,C=ne}return}vt=vt||ft,it=it||J,Lt=Lt||pt,(ft!==T||vt!==M)&&(i.blendEquationSeparate(re[ft],re[vt]),T=ft,M=vt),(J!==A||pt!==b||it!==S||Lt!==R)&&(i.blendFuncSeparate(tt[J],tt[pt],tt[it],tt[Lt]),A=J,b=pt,S=it,R=Lt),(At.equals(_)===!1||le!==E)&&(i.blendColor(At.r,At.g,At.b,le),_.copy(At),E=le),p=U,C=!1}function rt(U,ft){U.side===Qe?xt(i.CULL_FACE):Q(i.CULL_FACE);let J=U.side===Be;ft&&(J=!J),at(J),U.blending===hs&&U.transparent===!1?st(Sn):st(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let pt=U.stencilWrite;a.setTest(pt),pt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function at(U){P!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),P=U)}function ht(U){U!==Bh?(Q(i.CULL_FACE),U!==F&&(U===Fc?i.cullFace(i.BACK):U===kh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xt(i.CULL_FACE),F=U}function Ut(U){U!==k&&(W&&i.lineWidth(U),k=U)}function Dt(U,ft,J){U?(Q(i.POLYGON_OFFSET_FILL),(D!==ft||B!==J)&&(D=ft,B=J,o.getReversed()&&(ft=-ft),i.polygonOffset(ft,J))):xt(i.POLYGON_OFFSET_FILL)}function zt(U){U?Q(i.SCISSOR_TEST):xt(i.SCISSOR_TEST)}function Vt(U){U===void 0&&(U=i.TEXTURE0+X-1),j!==U&&(i.activeTexture(U),j=U)}function I(U,ft,J){J===void 0&&(j===null?J=i.TEXTURE0+X-1:J=j);let pt=et[J];pt===void 0&&(pt={type:void 0,texture:void 0},et[J]=pt),(pt.type!==U||pt.texture!==ft)&&(j!==J&&(i.activeTexture(J),j=J),i.bindTexture(U,ft||$[U]),pt.type=U,pt.texture=ft)}function ee(){let U=et[j];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function $t(){try{i.compressedTexImage2D(...arguments)}catch(U){Ot("WebGLState:",U)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(U){Ot("WebGLState:",U)}}function x(){try{i.texSubImage2D(...arguments)}catch(U){Ot("WebGLState:",U)}}function O(){try{i.texSubImage3D(...arguments)}catch(U){Ot("WebGLState:",U)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Ot("WebGLState:",U)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Ot("WebGLState:",U)}}function ct(){try{i.texStorage2D(...arguments)}catch(U){Ot("WebGLState:",U)}}function lt(){try{i.texStorage3D(...arguments)}catch(U){Ot("WebGLState:",U)}}function Z(){try{i.texImage2D(...arguments)}catch(U){Ot("WebGLState:",U)}}function K(){try{i.texImage3D(...arguments)}catch(U){Ot("WebGLState:",U)}}function ut(U){return d[U]!==void 0?d[U]:i.getParameter(U)}function Pt(U,ft){d[U]!==ft&&(i.pixelStorei(U,ft),d[U]=ft)}function mt(U){te.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),te.copy(U))}function dt(U){Zt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Zt.copy(U))}function It(U,ft){let J=l.get(ft);J===void 0&&(J=new WeakMap,l.set(ft,J));let pt=J.get(U);pt===void 0&&(pt=i.getUniformBlockIndex(ft,U.name),J.set(U,pt))}function Ft(U,ft){let pt=l.get(ft).get(U);c.get(ft)!==pt&&(i.uniformBlockBinding(ft,pt,U.__bindingPointIndex),c.set(ft,pt))}function Gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,et={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,T=null,A=null,b=null,M=null,S=null,R=null,_=new Yt(0,0,0),E=0,C=!1,P=null,F=null,k=null,D=null,B=null,te.set(0,0,i.canvas.width,i.canvas.height),Zt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:xt,bindFramebuffer:Bt,drawBuffers:bt,useProgram:kt,setBlending:st,setMaterial:rt,setFlipSided:at,setCullFace:ht,setLineWidth:Ut,setPolygonOffset:Dt,setScissorTest:zt,activeTexture:Vt,bindTexture:I,unbindTexture:ee,compressedTexImage2D:$t,compressedTexImage3D:w,texImage2D:Z,texImage3D:K,pixelStorei:Pt,getParameter:ut,updateUBOMapping:It,uniformBlockBinding:Ft,texStorage2D:ct,texStorage3D:lt,texSubImage2D:x,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:mt,viewport:dt,reset:Gt}}function vm(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,h=new WeakMap,d=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(w,x){return m?new OffscreenCanvas(w,x):Ns("canvas")}function g(w,x,O){let V=1,q=$t(w);if((q.width>O||q.height>O)&&(V=O/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let ct=Math.floor(V*q.width),lt=Math.floor(V*q.height);u===void 0&&(u=y(ct,lt));let Z=x?y(ct,lt):u;return Z.width=ct,Z.height=lt,Z.getContext("2d").drawImage(w,0,0,ct,lt),Nt("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ct+"x"+lt+")."),Z}else return"data"in w&&Nt("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),w;return w}function p(w){return w.generateMipmaps}function T(w){i.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(w,x,O,V,q,ct=!1){if(w!==null){if(i[w]!==void 0)return i[w];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let lt;V&&(lt=t.get("EXT_texture_norm16"),lt||Nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=x;if(x===i.RED&&(O===i.FLOAT&&(Z=i.R32F),O===i.HALF_FLOAT&&(Z=i.R16F),O===i.UNSIGNED_BYTE&&(Z=i.R8),O===i.UNSIGNED_SHORT&&lt&&(Z=lt.R16_EXT),O===i.SHORT&&lt&&(Z=lt.R16_SNORM_EXT)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.R8UI),O===i.UNSIGNED_SHORT&&(Z=i.R16UI),O===i.UNSIGNED_INT&&(Z=i.R32UI),O===i.BYTE&&(Z=i.R8I),O===i.SHORT&&(Z=i.R16I),O===i.INT&&(Z=i.R32I)),x===i.RG&&(O===i.FLOAT&&(Z=i.RG32F),O===i.HALF_FLOAT&&(Z=i.RG16F),O===i.UNSIGNED_BYTE&&(Z=i.RG8),O===i.UNSIGNED_SHORT&&lt&&(Z=lt.RG16_EXT),O===i.SHORT&&lt&&(Z=lt.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RG8UI),O===i.UNSIGNED_SHORT&&(Z=i.RG16UI),O===i.UNSIGNED_INT&&(Z=i.RG32UI),O===i.BYTE&&(Z=i.RG8I),O===i.SHORT&&(Z=i.RG16I),O===i.INT&&(Z=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),O===i.UNSIGNED_INT&&(Z=i.RGB32UI),O===i.BYTE&&(Z=i.RGB8I),O===i.SHORT&&(Z=i.RGB16I),O===i.INT&&(Z=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),O===i.UNSIGNED_INT&&(Z=i.RGBA32UI),O===i.BYTE&&(Z=i.RGBA8I),O===i.SHORT&&(Z=i.RGBA16I),O===i.INT&&(Z=i.RGBA32I)),x===i.RGB&&(O===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGB16_EXT),O===i.SHORT&&lt&&(Z=lt.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),x===i.RGBA){let K=ct?Ds:Kt.getTransfer(q);O===i.FLOAT&&(Z=i.RGBA32F),O===i.HALF_FLOAT&&(Z=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Z=K===se?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGBA16_EXT),O===i.SHORT&&lt&&(Z=lt.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function M(w,x){let O;return w?x===null||x===fn||x===ds?O=i.DEPTH24_STENCIL8:x===pn?O=i.DEPTH32F_STENCIL8:x===us&&(O=i.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===fn||x===ds?O=i.DEPTH_COMPONENT24:x===pn?O=i.DEPTH_COMPONENT32F:x===us&&(O=i.DEPTH_COMPONENT16),O}function S(w,x){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ae&&w.minFilter!==Re?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function R(w){let x=w.target;x.removeEventListener("dispose",R),E(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function _(w){let x=w.target;x.removeEventListener("dispose",_),P(x)}function E(w){let x=n.get(w);if(x.__webglInit===void 0)return;let O=w.source,V=f.get(O);if(V){let q=V[x.__cacheKey];q.usedTimes--,q.usedTimes===0&&C(w),Object.keys(V).length===0&&f.delete(O)}n.remove(w)}function C(w){let x=n.get(w);i.deleteTexture(x.__webglTexture);let O=w.source,V=f.get(O);delete V[x.__cacheKey],o.memory.textures--}function P(w){let x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let q=0;q<x.__webglFramebuffer[V].length;q++)i.deleteFramebuffer(x.__webglFramebuffer[V][q]);else i.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)i.deleteFramebuffer(x.__webglFramebuffer[V]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=w.textures;for(let V=0,q=O.length;V<q;V++){let ct=n.get(O[V]);ct.__webglTexture&&(i.deleteTexture(ct.__webglTexture),o.memory.textures--),n.remove(O[V])}n.remove(w)}let F=0;function k(){F=0}function D(){return F}function B(w){F=w}function X(){let w=F;return w>=s.maxTextures&&Nt("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,w}function W(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function nt(w,x){let O=n.get(w);if(w.isVideoTexture&&I(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){let V=w.image;if(V===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(O,w,x);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function Y(w,x){let O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){xt(O,w,x);return}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function j(w,x){let O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){xt(O,w,x);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function et(w,x){let O=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&O.__version!==w.version){Bt(O,w,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}let Ct={[so]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[ro]:i.MIRRORED_REPEAT},Et={[Ae]:i.NEAREST,[au]:i.NEAREST_MIPMAP_NEAREST,[cr]:i.NEAREST_MIPMAP_LINEAR,[Re]:i.LINEAR,[Ho]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},te={[uu]:i.NEVER,[gu]:i.ALWAYS,[du]:i.LESS,[wa]:i.LEQUAL,[fu]:i.EQUAL,[Ta]:i.GEQUAL,[pu]:i.GREATER,[mu]:i.NOTEQUAL};function Zt(w,x){if(x.type===pn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Re||x.magFilter===Ho||x.magFilter===cr||x.magFilter===si||x.minFilter===Re||x.minFilter===Ho||x.minFilter===cr||x.minFilter===si)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Ct[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Ct[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Ct[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Et[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Et[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,te[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ae||x.minFilter!==cr&&x.minFilter!==si||x.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function jt(w,x){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",R));let V=x.source,q=f.get(V);q===void 0&&(q={},f.set(V,q));let ct=W(x);if(ct!==w.__cacheKey){q[ct]===void 0&&(q[ct]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),q[ct].usedTimes++;let lt=q[w.__cacheKey];lt!==void 0&&(q[w.__cacheKey].usedTimes--,lt.usedTimes===0&&C(x)),w.__cacheKey=ct,w.__webglTexture=q[ct].texture}return O}function $(w,x,O){return Math.floor(Math.floor(w/O)/x)}function Q(w,x,O,V){let ct=w.updateRanges;if(ct.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,O,V,x.data);else{ct.sort((Pt,mt)=>Pt.start-mt.start);let lt=0;for(let Pt=1;Pt<ct.length;Pt++){let mt=ct[lt],dt=ct[Pt],It=mt.start+mt.count,Ft=$(dt.start,x.width,4),Gt=$(mt.start,x.width,4);dt.start<=It+1&&Ft===Gt&&$(dt.start+dt.count-1,x.width,4)===Ft?mt.count=Math.max(mt.count,dt.start+dt.count-mt.start):(++lt,ct[lt]=dt)}ct.length=lt+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),K=e.getParameter(i.UNPACK_SKIP_PIXELS),ut=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Pt=0,mt=ct.length;Pt<mt;Pt++){let dt=ct[Pt],It=Math.floor(dt.start/4),Ft=Math.ceil(dt.count/4),Gt=It%x.width,U=Math.floor(It/x.width),ft=Ft,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Gt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Gt,U,ft,J,O,V,x.data)}w.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,K),e.pixelStorei(i.UNPACK_SKIP_ROWS,ut)}}function xt(w,x,O){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);let q=jt(w,x),ct=x.source;e.bindTexture(V,w.__webglTexture,i.TEXTURE0+O);let lt=n.get(ct);if(ct.version!==lt.__version||q===!0){if(e.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let J=Kt.getPrimaries(Kt.workingColorSpace),pt=x.colorSpace===Bn?null:Kt.getPrimaries(x.colorSpace),vt=x.colorSpace===Bn||J===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let K=g(x.image,!1,s.maxTextureSize);K=ee(x,K);let ut=r.convert(x.format,x.colorSpace),Pt=r.convert(x.type),mt=b(x.internalFormat,ut,Pt,x.normalized,x.colorSpace,x.isVideoTexture);Zt(V,x);let dt,It=x.mipmaps,Ft=x.isVideoTexture!==!0,Gt=lt.__version===void 0||q===!0,U=ct.dataReady,ft=S(x,K);if(x.isDepthTexture)mt=M(x.format===ri,x.type),Gt&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,mt,K.width,K.height):e.texImage2D(i.TEXTURE_2D,0,mt,K.width,K.height,0,ut,Pt,null));else if(x.isDataTexture)if(It.length>0){Ft&&Gt&&e.texStorage2D(i.TEXTURE_2D,ft,mt,It[0].width,It[0].height);for(let J=0,pt=It.length;J<pt;J++)dt=It[J],Ft?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,dt.width,dt.height,ut,Pt,dt.data):e.texImage2D(i.TEXTURE_2D,J,mt,dt.width,dt.height,0,ut,Pt,dt.data);x.generateMipmaps=!1}else Ft?(Gt&&e.texStorage2D(i.TEXTURE_2D,ft,mt,K.width,K.height),U&&Q(x,K,ut,Pt)):e.texImage2D(i.TEXTURE_2D,0,mt,K.width,K.height,0,ut,Pt,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ft&&Gt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,mt,It[0].width,It[0].height,K.depth);for(let J=0,pt=It.length;J<pt;J++)if(dt=It[J],x.format!==nn)if(ut!==null)if(Ft){if(U)if(x.layerUpdates.size>0){let vt=dl(dt.width,dt.height,x.format,x.type);for(let it of x.layerUpdates){let Lt=dt.data.subarray(it*vt/dt.data.BYTES_PER_ELEMENT,(it+1)*vt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,it,dt.width,dt.height,1,ut,Lt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,ut,dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,mt,dt.width,dt.height,K.depth,0,dt.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,ut,Pt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,mt,dt.width,dt.height,K.depth,0,ut,Pt,dt.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ft&&Gt&&e.texStorage2D(i.TEXTURE_2D,ft,mt,It[0].width,It[0].height);for(let J=0,pt=It.length;J<pt;J++)dt=It[J],x.format!==nn?ut!==null?Ft?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,dt.width,dt.height,ut,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,J,mt,dt.width,dt.height,0,dt.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,dt.width,dt.height,ut,Pt,dt.data):e.texImage2D(i.TEXTURE_2D,J,mt,dt.width,dt.height,0,ut,Pt,dt.data)}else if(x.isDataArrayTexture)if(Ft){if(Gt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,mt,K.width,K.height,K.depth),U)if(x.layerUpdates.size>0){let J=dl(K.width,K.height,x.format,x.type);for(let pt of x.layerUpdates){let vt=K.data.subarray(pt*J/K.data.BYTES_PER_ELEMENT,(pt+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pt,K.width,K.height,1,ut,Pt,vt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ut,Pt,K.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,mt,K.width,K.height,K.depth,0,ut,Pt,K.data);else if(x.isData3DTexture)Ft?(Gt&&e.texStorage3D(i.TEXTURE_3D,ft,mt,K.width,K.height,K.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ut,Pt,K.data)):e.texImage3D(i.TEXTURE_3D,0,mt,K.width,K.height,K.depth,0,ut,Pt,K.data);else if(x.isFramebufferTexture){if(Gt)if(Ft)e.texStorage2D(i.TEXTURE_2D,ft,mt,K.width,K.height);else{let J=K.width,pt=K.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,mt,J,pt,0,ut,Pt,null),J>>=1,pt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),K.parentNode!==J){J.appendChild(K),d.add(x),J.onpaint=pt=>{let vt=pt.changedElements;for(let it of d)vt.includes(it.image)&&(it.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{let vt=i.RGBA,it=i.RGBA,Lt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,it,Lt,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(It.length>0){if(Ft&&Gt){let J=$t(It[0]);e.texStorage2D(i.TEXTURE_2D,ft,mt,J.width,J.height)}for(let J=0,pt=It.length;J<pt;J++)dt=It[J],Ft?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut,Pt,dt):e.texImage2D(i.TEXTURE_2D,J,mt,ut,Pt,dt);x.generateMipmaps=!1}else if(Ft){if(Gt){let J=$t(K);e.texStorage2D(i.TEXTURE_2D,ft,mt,J.width,J.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Pt,K)}else e.texImage2D(i.TEXTURE_2D,0,mt,ut,Pt,K);p(x)&&T(V),lt.__version=ct.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Bt(w,x,O){if(x.image.length!==6)return;let V=jt(w,x),q=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+O);let ct=n.get(q);if(q.version!==ct.__version||V===!0){e.activeTexture(i.TEXTURE0+O);let lt=Kt.getPrimaries(Kt.workingColorSpace),Z=x.colorSpace===Bn?null:Kt.getPrimaries(x.colorSpace),K=x.colorSpace===Bn||lt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let ut=x.isCompressedTexture||x.image[0].isCompressedTexture,Pt=x.image[0]&&x.image[0].isDataTexture,mt=[];for(let it=0;it<6;it++)!ut&&!Pt?mt[it]=g(x.image[it],!0,s.maxCubemapSize):mt[it]=Pt?x.image[it].image:x.image[it],mt[it]=ee(x,mt[it]);let dt=mt[0],It=r.convert(x.format,x.colorSpace),Ft=r.convert(x.type),Gt=b(x.internalFormat,It,Ft,x.normalized,x.colorSpace),U=x.isVideoTexture!==!0,ft=ct.__version===void 0||V===!0,J=q.dataReady,pt=S(x,dt);Zt(i.TEXTURE_CUBE_MAP,x);let vt;if(ut){U&&ft&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Gt,dt.width,dt.height);for(let it=0;it<6;it++){vt=mt[it].mipmaps;for(let Lt=0;Lt<vt.length;Lt++){let At=vt[Lt];x.format!==nn?It!==null?U?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,0,0,At.width,At.height,It,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,Gt,At.width,At.height,0,At.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,0,0,At.width,At.height,It,Ft,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,Gt,At.width,At.height,0,It,Ft,At.data)}}}else{if(vt=x.mipmaps,U&&ft){vt.length>0&&pt++;let it=$t(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Gt,it.width,it.height)}for(let it=0;it<6;it++)if(Pt){U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,mt[it].width,mt[it].height,It,Ft,mt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Gt,mt[it].width,mt[it].height,0,It,Ft,mt[it].data);for(let Lt=0;Lt<vt.length;Lt++){let le=vt[Lt].image[it].image;U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,0,0,le.width,le.height,It,Ft,le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,Gt,le.width,le.height,0,It,Ft,le.data)}}else{U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,It,Ft,mt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Gt,It,Ft,mt[it]);for(let Lt=0;Lt<vt.length;Lt++){let At=vt[Lt];U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,0,0,It,Ft,At.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,Gt,It,Ft,At.image[it])}}}p(x)&&T(i.TEXTURE_CUBE_MAP),ct.__version=q.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function bt(w,x,O,V,q,ct){let lt=r.convert(O.format,O.colorSpace),Z=r.convert(O.type),K=b(O.internalFormat,lt,Z,O.normalized,O.colorSpace),ut=n.get(x),Pt=n.get(O);if(Pt.__renderTarget=x,!ut.__hasExternalTextures){let mt=Math.max(1,x.width>>ct),dt=Math.max(1,x.height>>ct);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,ct,K,mt,dt,x.depth,0,lt,Z,null):e.texImage2D(q,ct,K,mt,dt,0,lt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),Vt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,q,Pt.__webglTexture,0,zt(x)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,q,Pt.__webglTexture,ct),e.bindFramebuffer(i.FRAMEBUFFER,null)}function kt(w,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){let V=x.depthTexture,q=V&&V.isDepthTexture?V.type:null,ct=M(x.stencilBuffer,q),lt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Vt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt(x),ct,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt(x),ct,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ct,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,w)}else{let V=x.textures;for(let q=0;q<V.length;q++){let ct=V[q],lt=r.convert(ct.format,ct.colorSpace),Z=r.convert(ct.type),K=b(ct.internalFormat,lt,Z,ct.normalized,ct.colorSpace);Vt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt(x),K,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt(x),K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function re(w,x,O){let V=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(x.depthTexture);if(q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Zt(i.TEXTURE_CUBE_MAP,x.depthTexture);let ut=r.convert(x.depthTexture.format),Pt=r.convert(x.depthTexture.type),mt;x.depthTexture.format===bn?mt=i.DEPTH_COMPONENT24:x.depthTexture.format===ri&&(mt=i.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,mt,x.width,x.height,0,ut,Pt,null)}}else nt(x.depthTexture,0);let ct=q.__webglTexture,lt=zt(x),Z=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,K=x.depthTexture.format===ri?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===bn)Vt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,ct,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,ct,0);else if(x.depthTexture.format===ri)Vt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,ct,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(w){let x=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){let V=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){let q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),x.__depthDisposeCallback=q}x.__boundDepthTexture=V}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)re(x.__webglFramebuffer[V],w,V);else{let V=w.texture.mipmaps;V&&V.length>0?re(x.__webglFramebuffer[0],w,0):re(x.__webglFramebuffer,w,0)}else if(O){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),kt(x.__webglDepthbuffer[V],w,!1);else{let q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ct)}}else{let V=w.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),kt(x.__webglDepthbuffer,w,!1);else{let q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ct)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(w,x,O){let V=n.get(w);x!==void 0&&bt(V.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&tt(w)}function rt(w){let x=w.texture,O=n.get(w),V=n.get(x);w.addEventListener("dispose",_);let q=w.textures,ct=w.isWebGLCubeRenderTarget===!0,lt=q.length>1;if(lt||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,o.memory.textures++),ct){O.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[Z]=[];for(let K=0;K<x.mipmaps.length;K++)O.__webglFramebuffer[Z][K]=i.createFramebuffer()}else O.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let Z=0;Z<x.mipmaps.length;Z++)O.__webglFramebuffer[Z]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(lt)for(let Z=0,K=q.length;Z<K;Z++){let ut=n.get(q[Z]);ut.__webglTexture===void 0&&(ut.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&Vt(w)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Z=0;Z<q.length;Z++){let K=q[Z];O.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);let ut=r.convert(K.format,K.colorSpace),Pt=r.convert(K.type),mt=b(K.internalFormat,ut,Pt,K.normalized,K.colorSpace,w.isXRRenderTarget===!0),dt=zt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,mt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,O.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),kt(O.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ct){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Zt(i.TEXTURE_CUBE_MAP,x);for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)bt(O.__webglFramebuffer[Z][K],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,K);else bt(O.__webglFramebuffer[Z],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(x)&&T(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Z=0,K=q.length;Z<K;Z++){let ut=q[Z],Pt=n.get(ut),mt=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(mt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,Pt.__webglTexture),Zt(mt,ut),bt(O.__webglFramebuffer,w,ut,i.COLOR_ATTACHMENT0+Z,mt,0),p(ut)&&T(mt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Z=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,V.__webglTexture),Zt(Z,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)bt(O.__webglFramebuffer[K],w,x,i.COLOR_ATTACHMENT0,Z,K);else bt(O.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,Z,0);p(x)&&T(Z),e.unbindTexture()}w.depthBuffer&&tt(w)}function at(w){let x=w.textures;for(let O=0,V=x.length;O<V;O++){let q=x[O];if(p(q)){let ct=A(w),lt=n.get(q).__webglTexture;e.bindTexture(ct,lt),T(ct),e.unbindTexture()}}}let ht=[],Ut=[];function Dt(w){if(w.samples>0){if(Vt(w)===!1){let x=w.textures,O=w.width,V=w.height,q=i.COLOR_BUFFER_BIT,ct=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(w),Z=x.length>1;if(Z)for(let ut=0;ut<x.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);let K=w.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ut=0;ut<x.length;ut++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ut]);let Pt=n.get(x[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pt,0)}i.blitFramebuffer(0,0,O,V,0,0,O,V,q,i.NEAREST),c===!0&&(ht.length=0,Ut.length=0,ht.push(i.COLOR_ATTACHMENT0+ut),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(ht.push(ct),Ut.push(ct),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ut)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ut=0;ut<x.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ut]);let Pt=n.get(x[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,Pt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&c){let x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function zt(w){return Math.min(s.maxSamples,w.samples)}function Vt(w){let x=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function I(w){let x=o.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function ee(w,x){let O=w.colorSpace,V=w.format,q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==Ls&&O!==Bn&&(Kt.getTransfer(O)===se?(V!==nn||q!==Ge)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",O)),x}function $t(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=k,this.getTextureUnits=D,this.setTextureUnits=B,this.setTexture2D=nt,this.setTexture2DArray=Y,this.setTexture3D=j,this.setTextureCube=et,this.rebindTextures=st,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=Vt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function bm(i,t){function e(n,s=Bn){let r,o=Kt.getTransfer(s);if(n===Ge)return i.UNSIGNED_BYTE;if(n===Go)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kc)return i.BYTE;if(n===jc)return i.SHORT;if(n===us)return i.UNSIGNED_SHORT;if(n===Vo)return i.INT;if(n===fn)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===mn)return i.HALF_FLOAT;if(n===el)return i.ALPHA;if(n===nl)return i.RGB;if(n===nn)return i.RGBA;if(n===bn)return i.DEPTH_COMPONENT;if(n===ri)return i.DEPTH_STENCIL;if(n===il)return i.RED;if(n===Xo)return i.RED_INTEGER;if(n===oi)return i.RG;if(n===Yo)return i.RG_INTEGER;if(n===qo)return i.RGBA_INTEGER;if(n===lr||n===hr||n===ur||n===dr)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Zo||n===$o||n===Jo||n===Ko)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Zo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$o)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===jo||n===Qo||n===ta||n===ea||n===na||n===fr||n===ia)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===jo||n===Qo)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ta)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ea)return r.COMPRESSED_R11_EAC;if(n===na)return r.COMPRESSED_SIGNED_R11_EAC;if(n===fr)return r.COMPRESSED_RG11_EAC;if(n===ia)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===sa||n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===xa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ra)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===aa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ca)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===la)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ha)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ua)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===da)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ma)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ga)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_a||n===ya||n===va)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===_a)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ba||n===Ma||n===pr||n===Sa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ma)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Mm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sm=`
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

}`,Tl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Hs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ke({vertexShader:Mm,fragmentShader:Sm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Me(new Ks(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Al=class extends hn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new Tl,p={},T=e.getContextAttributes(),A=null,b=null,M=[],S=[],R=new ot,_=null,E=null,C=new De;C.viewport=new me;let P=new De;P.viewport=new me;let F=[C,P],k=new Bo,D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=M[$];return Q===void 0&&(Q=new Ki,M[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=M[$];return Q===void 0&&(Q=new Ki,M[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=M[$];return Q===void 0&&(Q=new Ki,M[$]=Q),Q.getHandSpace()};function X($){let Q=S.indexOf($.inputSource);if(Q===-1)return;let xt=M[Q];xt!==void 0&&(xt.update($.inputSource,$.frame,l||o),xt.dispatchEvent({type:$.type,data:$.inputSource}))}function W(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",nt);for(let $=0;$<M.length;$++){let Q=S[$];Q!==null&&(S[$]=null,M[$].disconnect(Q))}D=null,B=null,g.reset();for(let $ in p)delete p[$];if(t.setRenderTarget(A),f=null,u=null,d=null,s=null,b=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(R.width,R.height,!1),E!==null){let $=E.camera;$.fov=E.fov,$.zoom=E.zoom,$.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",W),s.addEventListener("inputsourceschange",nt),T.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Bt=null,bt=null;T.depth&&(bt=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=T.stencil?ri:bn,Bt=T.stencil?ds:fn);let kt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(kt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new Ve(u.textureWidth,u.textureHeight,{format:nn,type:Ge,depthTexture:new Jn(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xt={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Ve(f.framebufferWidth,f.framebufferHeight,{format:nn,type:Ge,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),jt.setContext(s),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function nt($){for(let Q=0;Q<$.removed.length;Q++){let xt=$.removed[Q],Bt=S.indexOf(xt);Bt>=0&&(S[Bt]=null,M[Bt].disconnect(xt))}for(let Q=0;Q<$.added.length;Q++){let xt=$.added[Q],Bt=S.indexOf(xt);if(Bt===-1){for(let kt=0;kt<M.length;kt++)if(kt>=S.length){S.push(xt),Bt=kt;break}else if(S[kt]===null){S[kt]=xt,Bt=kt;break}if(Bt===-1)break}let bt=M[Bt];bt&&bt.connect(xt)}}let Y=new L,j=new L;function et($,Q,xt){Y.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(xt.matrixWorld);let Bt=Y.distanceTo(j),bt=Q.projectionMatrix.elements,kt=xt.projectionMatrix.elements,re=bt[14]/(bt[10]-1),tt=bt[14]/(bt[10]+1),st=(bt[9]+1)/bt[5],rt=(bt[9]-1)/bt[5],at=(bt[8]-1)/bt[0],ht=(kt[8]+1)/kt[0],Ut=re*at,Dt=re*ht,zt=Bt/(-at+ht),Vt=zt*-at;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Vt),$.translateZ(zt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),bt[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let I=re+zt,ee=tt+zt,$t=Ut-Vt,w=Dt+(Bt-Vt),x=st*tt/ee*I,O=rt*tt/ee*I;$.projectionMatrix.makePerspective($t,w,x,O,I,ee),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Ct($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let Q=$.near,xt=$.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),k.near=P.near=C.near=Q,k.far=P.far=C.far=xt,(D!==k.near||B!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),D=k.near,B=k.far),k.layers.mask=$.layers.mask|6,C.layers.mask=k.layers.mask&-5,P.layers.mask=k.layers.mask&-3;let Bt=$.parent,bt=k.cameras;Ct(k,Bt);for(let kt=0;kt<bt.length;kt++)Ct(bt[kt],Bt);bt.length===2?et(k,C,P):k.projectionMatrix.copy(C.projectionMatrix),E===null&&$.isPerspectiveCamera&&(E={camera:$,fov:$.fov,zoom:$.zoom}),Et($,k,Bt)};function Et($,Q,xt){xt===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(xt.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Zi*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function($){return p[$]};let te=null;function Zt($,Q){if(h=Q.getViewerPose(l||o),m=Q,h!==null){let xt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let Bt=!1;xt.length!==k.cameras.length&&(k.cameras.length=0,Bt=!0);for(let tt=0;tt<xt.length;tt++){let st=xt[tt],rt=null;if(f!==null)rt=f.getViewport(st);else{let ht=d.getViewSubImage(u,st);rt=ht.viewport,tt===0&&(t.setRenderTargetTextures(b,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(b))}let at=F[tt];at===void 0&&(at=new De,at.layers.enable(tt),at.viewport=new me,F[tt]=at),at.matrix.fromArray(st.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(st.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(rt.x,rt.y,rt.width,rt.height),tt===0&&(k.matrix.copy(at.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Bt===!0&&k.cameras.push(at)}let bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let tt=d.getDepthInformation(xt[0]);tt&&tt.isValid&&tt.texture&&g.init(tt,s.renderState)}if(bt&&bt.includes("camera-access")&&y){t.state.unbindTexture(),d=n.getBinding();for(let tt=0;tt<xt.length;tt++){let st=xt[tt].camera;if(st){let rt=p[st];rt||(rt=new Hs,p[st]=rt);let at=d.getCameraImage(st);rt.sourceTexture=at}}}}for(let xt=0;xt<M.length;xt++){let Bt=S[xt],bt=M[xt];Bt!==null&&bt!==void 0&&bt.update(Bt,Q,l||o)}te&&te($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),m=null}let jt=new Ku;jt.setAnimationLoop(Zt),this.setAnimationLoop=function($){te=$},this.dispose=function(){}}},Em=new ue,id=new Ht;id.set(-1,0,0,0,1,0,0,0,1);function wm(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ll(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,T,A,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,b)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,T,A):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Be&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Be&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let T=t.get(p),A=T.envMap,b=T.envMapRotation;A&&(g.envMap.value=A,g.envMapRotation.value.setFromMatrix4(Em.makeRotationFromEuler(b)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(id),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,T,A){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*T,g.scale.value=A*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,T){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let T=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Tm(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,M){let S=M.program;n.uniformBlockBinding(b,S)}function l(b,M){let S=s[b.id];S===void 0&&(g(b),S=h(b),s[b.id]=S,b.addEventListener("dispose",T));let R=M.program;n.updateUBOMapping(b,R);let _=t.render.frame;r[b.id]!==_&&(u(b),r[b.id]=_)}function h(b){let M=d();b.__bindingPointIndex=M;let S=i.createBuffer(),R=b.__size,_=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){let M=s[b.id],S=b.uniforms,R=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let _=0,E=S.length;_<E;_++){let C=S[_];if(Array.isArray(C))for(let P=0,F=C.length;P<F;P++)f(C[P],_,P,R);else f(C,_,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,M,S,R){if(y(b,M,S,R)===!0){let _=b.__offset,E=b.value;if(Array.isArray(E)){let C=0;for(let P=0;P<E.length;P++){let F=E[P],k=p(F);m(F,b.__data,C),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(C+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(E,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,b.__data)}}function m(b,M,S){typeof b=="number"||typeof b=="boolean"?M[0]=b:b.isMatrix3?(M[0]=b.elements[0],M[1]=b.elements[1],M[2]=b.elements[2],M[3]=0,M[4]=b.elements[3],M[5]=b.elements[4],M[6]=b.elements[5],M[7]=0,M[8]=b.elements[6],M[9]=b.elements[7],M[10]=b.elements[8],M[11]=0):ArrayBuffer.isView(b)?M.set(new b.constructor(b.buffer,b.byteOffset,M.length)):b.toArray(M,S)}function y(b,M,S,R){let _=b.value,E=M+"_"+S;if(R[E]===void 0)return typeof _=="number"||typeof _=="boolean"?R[E]=_:ArrayBuffer.isView(_)?R[E]=_.slice():R[E]=_.clone(),!0;{let C=R[E];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return R[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function g(b){let M=b.uniforms,S=0,R=16;for(let E=0,C=M.length;E<C;E++){let P=Array.isArray(M[E])?M[E]:[M[E]];for(let F=0,k=P.length;F<k;F++){let D=P[F],B=Array.isArray(D.value)?D.value:[D.value];for(let X=0,W=B.length;X<W;X++){let nt=B[X],Y=p(nt),j=S%R,et=j%Y.boundary,Ct=j+et;S+=et,Ct!==0&&R-Ct<Y.storage&&(S+=R-Ct),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=Y.storage}}}let _=S%R;return _>0&&(S+=R-_),b.__size=S,b.__cache={},this}function p(b){let M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(M.boundary=16,M.storage=b.byteLength):Nt("WebGLRenderer: Unsupported uniform value type.",b),M}function T(b){let M=b.target;M.removeEventListener("dispose",T);let S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function A(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:A}}var Am=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),En=null;function Rm(){return En===null&&(En=new ho(Am,16,16,oi,mn),En.name="DFG_LUT",En.minFilter=Re,En.magFilter=Re,En.wrapS=vn,En.wrapT=vn,En.generateMipmaps=!1,En.needsUpdate=!0),En}var Ia=class{constructor(t={}){let{canvas:e=_u(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Ge}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=f,g=new Set([qo,Yo,Xo]),p=new Set([Ge,fn,us,ds,Go,Wo]),T=new Uint32Array(4),A=new Int32Array(4),b=new L,M=null,S=null,R=[],_=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,P=!1,F=null,k=null,D=null,B=null;this._outputColorSpace=qe;let X=0,W=0,nt=null,Y=-1,j=null,et=new me,Ct=new me,Et=null,te=new Yt(0),Zt=0,jt=e.width,$=e.height,Q=1,xt=null,Bt=null,bt=new me(0,0,jt,$),kt=new me(0,0,jt,$),re=!1,tt=new ji,st=!1,rt=!1,at=new ue,ht=new L,Ut=new me,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},zt=!1;function Vt(){return nt===null?Q:1}let I=n;function ee(v,N){return e.getContext(v,N)}let $t,w,x,O,V,q,ct,lt,Z,K,ut,Pt,mt,dt,It,Ft,Gt,U,ft,J,pt,vt,it;try{let v={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",le,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",sn,!1),I===null){let N="webgl2";if(I=ee(N,v),I===null)throw ee(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Lt()}catch(v){throw e.removeEventListener("webglcontextlost",le,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",sn,!1),Ot("WebGLRenderer: "+v.message),v}function Lt(){$t=new U2(I),$t.init(),pt=new bm(I,$t),w=new w2(I,$t,t,pt),x=new ym(I,$t),w.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),k=I.createFramebuffer(),D=I.createFramebuffer(),B=I.createFramebuffer(),O=new B2(I),V=new rm,q=new vm(I,$t,x,V,w,pt,O),ct=new N2(C),lt=new zf(I),vt=new S2(I,lt),Z=new F2(I,lt,O,vt),K=new z2(I,Z,lt,vt,O),U=new k2(I,w,q),It=new T2(V),ut=new sm(C,ct,$t,w,vt,It),Pt=new wm(C,V),mt=new am,dt=new fm($t),Gt=new M2(C,ct,x,K,m,c),Ft=new _m(C,K,w),it=new Tm(I,O,w,x),ft=new E2(I,$t,O),J=new O2(I,$t,O),O.programs=ut.programs,C.capabilities=w,C.extensions=$t,C.properties=V,C.renderLists=mt,C.shadowMap=Ft,C.state=x,C.info=O}y!==Ge&&(E=new V2(y,e.width,e.height,a,s,r));let At=new Al(C,I);this.xr=At,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let v=$t.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=$t.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(v){v!==void 0&&(Q=v,this.setSize(jt,$,!1))},this.getSize=function(v){return v.set(jt,$)},this.setSize=function(v,N,G=!0){if(At.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}jt=v,$=N,e.width=Math.floor(v*Q),e.height=Math.floor(N*Q),G===!0&&(e.style.width=v+"px",e.style.height=N+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,v,N)},this.getDrawingBufferSize=function(v){return v.set(jt*Q,$*Q).floor()},this.setDrawingBufferSize=function(v,N,G){jt=v,$=N,Q=G,e.width=Math.floor(v*G),e.height=Math.floor(N*G),this.setViewport(0,0,v,N)},this.setEffects=function(v){if(y===Ge){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let N=0;N<v.length;N++)if(v[N].isOutputPass===!0){Nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(et)},this.getViewport=function(v){return v.copy(bt)},this.setViewport=function(v,N,G,z){v.isVector4?bt.set(v.x,v.y,v.z,v.w):bt.set(v,N,G,z),x.viewport(et.copy(bt).multiplyScalar(Q).round())},this.getScissor=function(v){return v.copy(kt)},this.setScissor=function(v,N,G,z){v.isVector4?kt.set(v.x,v.y,v.z,v.w):kt.set(v,N,G,z),x.scissor(Ct.copy(kt).multiplyScalar(Q).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(v){x.setScissorTest(re=v)},this.setOpaqueSort=function(v){xt=v},this.setTransparentSort=function(v){Bt=v},this.getClearColor=function(v){return v.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor(...arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha(...arguments)},this.clear=function(v=!0,N=!0,G=!0){let z=0;if(v){let H=!1;if(nt!==null){let yt=nt.texture.format;H=g.has(yt)}if(H){let yt=nt.texture.type,St=p.has(yt),_t=Gt.getClearColor(),wt=Gt.getClearAlpha(),Rt=_t.r,Wt=_t.g,Jt=_t.b;St?(T[0]=Rt,T[1]=Wt,T[2]=Jt,T[3]=wt,I.clearBufferuiv(I.COLOR,0,T)):(A[0]=Rt,A[1]=Wt,A[2]=Jt,A[3]=wt,I.clearBufferiv(I.COLOR,0,A))}else z|=I.COLOR_BUFFER_BIT}N&&(z|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),F=v},this.dispose=function(){e.removeEventListener("webglcontextlost",le,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",sn,!1),Gt.dispose(),mt.dispose(),dt.dispose(),V.dispose(),ct.dispose(),K.dispose(),vt.dispose(),it.dispose(),ut.dispose(),At.dispose(),At.removeEventListener("sessionstart",Yl),At.removeEventListener("sessionend",ql),hi.stop()};function le(v){v.preventDefault(),rl("WebGLRenderer: Context Lost."),P=!0}function ne(){rl("WebGLRenderer: Context Restored."),P=!1;let v=O.autoReset,N=Ft.enabled,G=Ft.autoUpdate,z=Ft.needsUpdate,H=Ft.type;Lt(),O.autoReset=v,Ft.enabled=N,Ft.autoUpdate=G,Ft.needsUpdate=z,Ft.type=H}function sn(v){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function gn(v){let N=v.target;N.removeEventListener("dispose",gn),c1(N)}function c1(v){l1(v),V.remove(v)}function l1(v){let N=V.get(v).programs;N!==void 0&&(N.forEach(function(G){ut.releaseProgram(G)}),v.isShaderMaterial&&ut.releaseShaderCache(v))}this.renderBufferDirect=function(v,N,G,z,H,yt){N===null&&(N=Dt);let St=H.isMesh&&H.matrixWorld.determinantAffine()<0,_t=d1(v,N,G,z,H);x.setMaterial(z,St);let wt=G.index,Rt=1;if(z.wireframe===!0){if(wt=Z.getWireframeAttribute(G),wt===void 0)return;Rt=2}let Wt=G.drawRange,Jt=G.attributes.position,Tt=Wt.start*Rt,ie=(Wt.start+Wt.count)*Rt;yt!==null&&(Tt=Math.max(Tt,yt.start*Rt),ie=Math.min(ie,(yt.start+yt.count)*Rt)),wt!==null?(Tt=Math.max(Tt,0),ie=Math.min(ie,wt.count)):Jt!=null&&(Tt=Math.max(Tt,0),ie=Math.min(ie,Jt.count));let ye=ie-Tt;if(ye<0||ye===1/0)return;vt.setup(H,z,_t,G,wt);let de,ce=ft;if(wt!==null&&(de=lt.get(wt),ce=J,ce.setIndex(de)),H.isMesh)z.wireframe===!0?(x.setLineWidth(z.wireframeLinewidth*Vt()),ce.setMode(I.LINES)):ce.setMode(I.TRIANGLES);else if(H.isLine){let Pe=z.linewidth;Pe===void 0&&(Pe=1),x.setLineWidth(Pe*Vt()),H.isLineSegments?ce.setMode(I.LINES):H.isLineLoop?ce.setMode(I.LINE_LOOP):ce.setMode(I.LINE_STRIP)}else H.isPoints?ce.setMode(I.POINTS):H.isSprite&&ce.setMode(I.TRIANGLES);if(H.isBatchedMesh)if($t.get("WEBGL_multi_draw"))ce.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Pe=H._multiDrawStarts,Mt=H._multiDrawCounts,Ue=H._multiDrawCount,Qt=wt?lt.get(wt).bytesPerElement:1,tn=V.get(z).currentProgram.getUniforms();for(let xn=0;xn<Ue;xn++)tn.setValue(I,"_gl_DrawID",xn),ce.render(Pe[xn]/Qt,Mt[xn])}else if(H.isInstancedMesh)ce.renderInstances(Tt,ye,H.count);else if(G.isInstancedBufferGeometry){let Pe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Mt=Math.min(G.instanceCount,Pe);ce.renderInstances(Tt,ye,Mt)}else ce.render(Tt,ye)};function Xl(v,N,G,z){F!==null&&v.isNodeMaterial&&F.setObject(z,v),st===!0&&It.setState(v,G,!1),v.transparent===!0&&v.side===Qe&&v.forceSinglePass===!1?(v.side=Be,v.needsUpdate=!0,wr(v,N,z),v.side=ni,v.needsUpdate=!0,wr(v,N,z),v.side=Qe):wr(v,N,z)}this.compile=function(v,N,G=null){G===null&&(G=v),F!==null&&F.renderStart(v,N,G),S=dt.get(G),S.init(N),_.push(S),G.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),v!==G&&v.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),S.setupLights(),F!==null&&F.updateLights(S.state.lightsArray),rt=this.localClippingEnabled,st=It.init(this.clippingPlanes,rt),st===!0&&It.setGlobalState(this.clippingPlanes,N),F!==null&&Ft.render(S.state.shadowsArray,G,N);let z=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let yt=H.material;if(yt)if(Array.isArray(yt))for(let St=0;St<yt.length;St++){let _t=yt[St];Xl(_t,G,N,H),z.add(_t)}else Xl(yt,G,N,H),z.add(yt)}),S=_.pop(),F!==null&&F.renderEnd(),z},this.compileAsync=function(v,N,G=null){let z=this.compile(v,N,G);return new Promise(H=>{function yt(){if(z.forEach(function(St){let wt=V.get(St).currentProgram;(wt===void 0||wt.isReady())&&z.delete(St)}),z.size===0){H(v);return}setTimeout(yt,10)}$t.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let Ka=null;function h1(v){Ka&&Ka(v)}function Yl(){hi.stop()}function ql(){hi.start()}let hi=new Ku;hi.setAnimationLoop(h1),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(v){Ka=v,At.setAnimationLoop(v),v===null?hi.stop():hi.start()},At.addEventListener("sessionstart",Yl),At.addEventListener("sessionend",ql),this.render=function(v,N){if(N!==void 0&&N.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(v,N);let G=At.enabled===!0&&At.isPresenting===!0,z=E!==null&&(nt===null||G)&&E.begin(C,nt);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(At.cameraAutoUpdate===!0&&At.updateCamera(N),N=At.getCamera()),v.isScene===!0&&v.onBeforeRender(C,v,N,nt),S=dt.get(v,_.length),S.init(N),S.state.textureUnits=q.getTextureUnits(),_.push(S),at.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),tt.setFromProjectionMatrix(at,ln,N.reversedDepth),rt=this.localClippingEnabled,st=It.init(this.clippingPlanes,rt),M=mt.get(v,R.length),M.init(),R.push(M),At.enabled===!0&&At.isPresenting===!0){let St=C.xr.getDepthSensingMesh();St!==null&&ja(St,N,-1/0,C.sortObjects)}ja(v,N,0,C.sortObjects),M.finish(),F!==null&&F.updateLights(S.state.lightsArray),C.sortObjects===!0&&M.sort(xt,Bt),zt=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,zt&&Gt.addToRenderList(M,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&It.beginShadows();let H=S.state.shadowsArray;if(Ft.render(H,v,N),st===!0&&It.endShadows(),(z&&E.hasRenderPass())===!1){let St=M.opaque,_t=M.transmissive;if(S.setupLights(),N.isArrayCamera){let wt=N.cameras;if(_t.length>0)for(let Rt=0,Wt=wt.length;Rt<Wt;Rt++){let Jt=wt[Rt];$l(St,_t,v,Jt)}zt&&Gt.render(v);for(let Rt=0,Wt=wt.length;Rt<Wt;Rt++){let Jt=wt[Rt];Zl(M,v,Jt,Jt.viewport)}}else _t.length>0&&$l(St,_t,v,N),zt&&Gt.render(v),Zl(M,v,N)}nt!==null&&W===0&&(q.updateMultisampleRenderTarget(nt),q.updateRenderTargetMipmap(nt)),z&&E.end(C),v.isScene===!0&&v.onAfterRender(C,v,N),vt.resetDefaultState(),Y=-1,j=null,_.pop(),_.length>0?(S=_[_.length-1],q.setTextureUnits(S.state.textureUnits),st===!0&&It.setGlobalState(C.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?M=R[R.length-1]:M=null,F!==null&&F.renderEnd()};function ja(v,N,G,z){if(v.visible===!1)return;if(v.layers.test(N.layers)){if(v.isGroup)G=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(N);else if(v.isLightProbeGrid)S.pushLightProbeGrid(v);else if(v.isLight)S.pushLight(v),v.castShadow&&S.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(tt)){z&&Ut.setFromMatrixPosition(v.matrixWorld).applyMatrix4(at);let St=K.update(v),_t=v.material;_t.visible&&M.push(v,St,_t,G,Ut.z,null,N)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(tt))){let St=K.update(v),_t=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ut.copy(v.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Ut.copy(St.boundingSphere.center)),Ut.applyMatrix4(v.matrixWorld).applyMatrix4(at)),Array.isArray(_t)){let wt=St.groups;for(let Rt=0,Wt=wt.length;Rt<Wt;Rt++){let Jt=wt[Rt],Tt=_t[Jt.materialIndex];Tt&&Tt.visible&&M.push(v,St,Tt,G,Ut.z,Jt,N)}}else _t.visible&&M.push(v,St,_t,G,Ut.z,null,N)}}let yt=v.children;for(let St=0,_t=yt.length;St<_t;St++)ja(yt[St],N,G,z)}function Zl(v,N,G,z){let{opaque:H,transmissive:yt,transparent:St}=v;S.setupLightsView(G),st===!0&&It.setGlobalState(C.clippingPlanes,G),z&&x.viewport(et.copy(z)),H.length>0&&Er(H,N,G),yt.length>0&&Er(yt,N,G),St.length>0&&Er(St,N,G),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function $l(v,N,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[z.id]===void 0){let Tt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[z.id]=new Ve(1,1,{generateMipmaps:!0,type:Tt?mn:Ge,minFilter:si,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}let yt=S.state.transmissionRenderTarget[z.id],St=z.viewport||et;yt.setSize(St.z*C.transmissionResolutionScale,St.w*C.transmissionResolutionScale);let _t=C.getRenderTarget(),wt=C.getActiveCubeFace(),Rt=C.getActiveMipmapLevel();C.setRenderTarget(yt),C.getClearColor(te),Zt=C.getClearAlpha(),Zt<1&&C.setClearColor(16777215,.5),C.clear(),zt&&Gt.render(G);let Wt=C.toneMapping;C.toneMapping=dn;let Jt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),S.setupLightsView(z),st===!0&&It.setGlobalState(C.clippingPlanes,z),Er(v,G,z),q.updateMultisampleRenderTarget(yt),q.updateRenderTargetMipmap(yt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let ie=0,ye=N.length;ie<ye;ie++){let de=N[ie],{object:ce,geometry:Pe,material:Mt,group:Ue}=de;if(Mt.side===Qe&&ce.layers.test(z.layers)){let Qt=Mt.side;Mt.side=Be,Mt.needsUpdate=!0,Jl(ce,G,z,Pe,Mt,Ue),Mt.side=Qt,Mt.needsUpdate=!0,Tt=!0}}Tt===!0&&(q.updateMultisampleRenderTarget(yt),q.updateRenderTargetMipmap(yt))}C.setRenderTarget(_t,wt,Rt),C.setClearColor(te,Zt),Jt!==void 0&&(z.viewport=Jt),C.toneMapping=Wt}function Er(v,N,G){let z=N.isScene===!0?N.overrideMaterial:null;for(let H=0,yt=v.length;H<yt;H++){let St=v[H],{object:_t,geometry:wt,group:Rt}=St,Wt=St.material;Wt.allowOverride===!0&&z!==null&&(Wt=z),_t.layers.test(G.layers)&&Jl(_t,N,G,wt,Wt,Rt)}}function Jl(v,N,G,z,H,yt){F!==null&&H.isNodeMaterial&&F.setObject(v,H),v.onBeforeRender(C,N,G,z,H,yt),v.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(C,N,G,z,v,yt),H.transparent===!0&&H.side===Qe&&H.forceSinglePass===!1?(H.side=Be,H.needsUpdate=!0,C.renderBufferDirect(G,N,z,H,v,yt),H.side=ni,H.needsUpdate=!0,C.renderBufferDirect(G,N,z,H,v,yt),H.side=Qe):C.renderBufferDirect(G,N,z,H,v,yt),v.onAfterRender(C,N,G,z,H,yt)}function wr(v,N,G){N.isScene!==!0&&(N=Dt);let z=V.get(v),H=S.state.lights,yt=S.state.shadowsArray,St=H.state.version,_t=ut.getParameters(v,H.state,yt,N,G,S.state.lightProbeGridArray),wt=ut.getProgramCacheKey(_t),Rt=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;let Wt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=ct.get(v.envMap||z.environment,Wt),z.envMapRotation=z.environment!==null&&v.envMap===null?N.environmentRotation:v.envMapRotation,Rt===void 0&&(v.addEventListener("dispose",gn),Rt=new Map,z.programs=Rt);let Jt=Rt.get(wt);if(Jt!==void 0){if(z.currentProgram===Jt&&z.lightsStateVersion===St)return jl(v,_t),Jt}else _t.uniforms=ut.getUniforms(v),F!==null&&v.isNodeMaterial&&F.build(v,G,_t),v.onBeforeCompile(_t,C),Jt=ut.acquireProgram(_t,wt),Rt.set(wt,Jt),z.uniforms=_t.uniforms;let Tt=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Tt.clippingPlanes=It.uniform),jl(v,_t),z.needsLights=p1(v),z.lightsStateVersion=St,z.needsLights&&(Tt.ambientLightColor.value=H.state.ambient,Tt.lightProbe.value=H.state.probe,Tt.sunLights.value=H.state.sun,Tt.sunLightShadows.value=H.state.sunShadow,Tt.directionalLights.value=H.state.directional,Tt.directionalLightShadows.value=H.state.directionalShadow,Tt.spotLights.value=H.state.spot,Tt.spotLightShadows.value=H.state.spotShadow,Tt.rectAreaLights.value=H.state.rectArea,Tt.ltc_1.value=H.state.rectAreaLTC1,Tt.ltc_2.value=H.state.rectAreaLTC2,Tt.pointLights.value=H.state.point,Tt.pointLightShadows.value=H.state.pointShadow,Tt.hemisphereLights.value=H.state.hemi,Tt.sunShadowMatrix.value=H.state.sunShadowMatrix,Tt.sunShadowCascade.value=H.state.sunShadowCascade,Tt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Tt.spotLightMatrix.value=H.state.spotLightMatrix,Tt.spotLightMap.value=H.state.spotLightMap,Tt.pointShadowMatrix.value=H.state.pointShadowMatrix),z.lightProbeGrid=S.state.lightProbeGridArray.length>0,z.currentProgram=Jt,z.uniformsList=null,Jt}function Kl(v){if(v.uniformsList===null){let N=v.currentProgram.getUniforms();v.uniformsList=ms.seqWithValue(N.seq,v.uniforms)}return v.uniformsList}function jl(v,N){let G=V.get(v);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function u1(v,N){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;b.setFromMatrixPosition(N.matrixWorld);for(let G=0,z=v.length;G<z;G++){let H=v[G];if(H.texture!==null&&H.boundingBox.containsPoint(b))return H}return null}function d1(v,N,G,z,H){N.isScene!==!0&&(N=Dt),q.resetTextureUnits();let yt=N.fog,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,_t=nt===null?C.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Kt.workingColorSpace,wt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Rt=ct.get(z.envMap||St,wt),Wt=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Jt=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Tt=!!G.morphAttributes.position,ie=!!G.morphAttributes.normal,ye=!!G.morphAttributes.color,de=dn;z.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(de=C.toneMapping);let ce=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Pe=ce!==void 0?ce.length:0,Mt=V.get(z),Ue=S.state.lights;if(st===!0&&(rt===!0||v!==j)){let he=v===j&&z.id===Y;It.setState(z,v,he)}let Qt=!1;z.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Ue.state.version||Mt.outputColorSpace!==_t||H.isBatchedMesh&&Mt.batching===!1||!H.isBatchedMesh&&Mt.batching===!0||H.isBatchedMesh&&Mt.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&Mt.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&Mt.instancing===!1||!H.isInstancedMesh&&Mt.instancing===!0||H.isSkinnedMesh&&Mt.skinning===!1||!H.isSkinnedMesh&&Mt.skinning===!0||H.isInstancedMesh&&Mt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Mt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Mt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Mt.instancingMorph===!1&&H.morphTexture!==null||Mt.envMap!==Rt||z.fog===!0&&Mt.fog!==yt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==It.numPlanes||Mt.numIntersection!==It.numIntersection)||Mt.vertexAlphas!==Wt||Mt.vertexTangents!==Jt||Mt.morphTargets!==Tt||Mt.morphNormals!==ie||Mt.morphColors!==ye||Mt.toneMapping!==de||Mt.morphTargetsCount!==Pe||!!Mt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Qt=!0):(Qt=!0,Mt.__version=z.version);let tn=Mt.currentProgram;Qt===!0&&(tn=wr(z,N,H),F&&z.isNodeMaterial&&F.onUpdateProgram(z,tn,Mt));let xn=!1,zn=!1,Ai=!1,ae=tn.getUniforms(),xe=Mt.uniforms;if(x.useProgram(tn.program)&&(xn=!0,zn=!0,Ai=!0),z.id!==Y&&(Y=z.id,zn=!0),Mt.needsLights){let he=u1(S.state.lightProbeGridArray,H);Mt.lightProbeGrid!==he&&(Mt.lightProbeGrid=he,zn=!0)}if(xn||j!==v){x.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ae.setValue(I,"projectionMatrix",v.projectionMatrix),ae.setValue(I,"viewMatrix",v.matrixWorldInverse);let Vn=ae.map.cameraPosition;Vn!==void 0&&Vn.setValue(I,ht.setFromMatrixPosition(v.matrixWorld)),w.logarithmicDepthBuffer&&ae.setValue(I,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ae.setValue(I,"isOrthographic",v.isOrthographicCamera===!0),j!==v&&(j=v,zn=!0,Ai=!0)}if(Mt.needsLights&&(Ue.state.sunShadowMap.length>0&&ae.setValue(I,"sunShadowMap",Ue.state.sunShadowMap,q),Ue.state.directionalShadowMap.length>0&&ae.setValue(I,"directionalShadowMap",Ue.state.directionalShadowMap,q),Ue.state.spotShadowMap.length>0&&ae.setValue(I,"spotShadowMap",Ue.state.spotShadowMap,q),Ue.state.pointShadowMap.length>0&&ae.setValue(I,"pointShadowMap",Ue.state.pointShadowMap,q)),H.isSkinnedMesh){ae.setOptional(I,H,"bindMatrix"),ae.setOptional(I,H,"bindMatrixInverse");let he=H.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),ae.setValue(I,"boneTexture",he.boneTexture,q))}H.isBatchedMesh&&(ae.setOptional(I,H,"batchingTexture"),ae.setValue(I,"batchingTexture",H._matricesTexture,q),ae.setOptional(I,H,"batchingIdTexture"),ae.setValue(I,"batchingIdTexture",H._indirectTexture,q),ae.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&ae.setValue(I,"batchingColorTexture",H._colorsTexture,q));let Hn=G.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&U.update(H,G,tn),(zn||Mt.receiveShadow!==H.receiveShadow)&&(Mt.receiveShadow=H.receiveShadow,ae.setValue(I,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(xe.envMapIntensity.value=N.environmentIntensity),xe.dfgLUT!==void 0&&(xe.dfgLUT.value=Rm()),zn){if(ae.setValue(I,"toneMappingExposure",C.toneMappingExposure),Mt.needsLights&&f1(xe,Ai),yt&&z.fog===!0&&Pt.refreshFogUniforms(xe,yt),Pt.refreshMaterialUniforms(xe,z,Q,$,S.state.transmissionRenderTarget[v.id]),Mt.needsLights&&Mt.lightProbeGrid){let he=Mt.lightProbeGrid;xe.probesSH.value=he.texture,xe.probesMin.value.copy(he.boundingBox.min),xe.probesMax.value.copy(he.boundingBox.max),xe.probesResolution.value.copy(he.resolution)}ms.upload(I,Kl(Mt),xe,q)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ms.upload(I,Kl(Mt),xe,q),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ae.setValue(I,"center",H.center),ae.setValue(I,"modelViewMatrix",H.modelViewMatrix),ae.setValue(I,"normalMatrix",H.normalMatrix),ae.setValue(I,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){let he=z.uniformsGroups;for(let Vn=0,Ri=he.length;Vn<Ri;Vn++){let th=he[Vn];it.update(th,tn),it.bind(th,tn)}}return tn}function f1(v,N){v.ambientLightColor.needsUpdate=N,v.lightProbe.needsUpdate=N,v.sunLights.needsUpdate=N,v.sunLightShadows.needsUpdate=N,v.directionalLights.needsUpdate=N,v.directionalLightShadows.needsUpdate=N,v.pointLights.needsUpdate=N,v.pointLightShadows.needsUpdate=N,v.spotLights.needsUpdate=N,v.spotLightShadows.needsUpdate=N,v.rectAreaLights.needsUpdate=N,v.hemisphereLights.needsUpdate=N}function p1(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(v,N,G){let z=V.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(v.texture).__webglTexture=N,V.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,N){let G=V.get(v);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(v,N=0,G=0){nt=v,X=N,W=G;let z=null,H=!1,yt=!1;if(v){let _t=V.get(v);if(_t.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(I.FRAMEBUFFER,_t.__webglFramebuffer),et.copy(v.viewport),Ct.copy(v.scissor),Et=v.scissorTest,x.viewport(et),x.scissor(Ct),x.setScissorTest(Et),Y=-1;return}else if(_t.__webglFramebuffer===void 0)q.setupRenderTarget(v);else if(_t.__hasExternalTextures)q.rebindTextures(v,V.get(v.texture).__webglTexture,V.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Wt=v.depthTexture;if(_t.__boundDepthTexture!==Wt){if(Wt!==null&&V.has(Wt)&&(v.width!==Wt.image.width||v.height!==Wt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(v)}}let wt=v.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(yt=!0);let Rt=V.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Rt[N])?z=Rt[N][G]:z=Rt[N],H=!0):v.samples>0&&q.useMultisampledRTT(v)===!1?z=V.get(v).__webglMultisampledFramebuffer:Array.isArray(Rt)?z=Rt[G]:z=Rt,et.copy(v.viewport),Ct.copy(v.scissor),Et=v.scissorTest}else et.copy(bt).multiplyScalar(Q).floor(),Ct.copy(kt).multiplyScalar(Q).floor(),Et=re;if(G!==0&&(z=k),x.bindFramebuffer(I.FRAMEBUFFER,z)&&x.drawBuffers(v,z),x.viewport(et),x.scissor(Ct),x.setScissorTest(Et),H){let _t=V.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,_t.__webglTexture,G)}else if(yt){let _t=N;for(let wt=0;wt<v.textures.length;wt++){let Rt=V.get(v.textures[wt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+wt,Rt.__webglTexture,G,_t)}}else if(v!==null&&G!==0){let _t=V.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_t.__webglTexture,G)}Y=-1};function Ql(v){let N=V.get(v);return(N.__readFormat!==v.format||N.__readType!==v.type)&&(N.__readFormat=v.format,N.__readType=v.type,N.__formatReadable=w.textureFormatReadable(v.format),N.__typeReadable=w.textureTypeReadable(v.type)),N}this.readRenderTargetPixels=function(v,N,G,z,H,yt,St,_t=0){if(!(v&&v.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(wt=wt[St]),wt){x.bindFramebuffer(I.FRAMEBUFFER,wt);try{let Rt=v.textures[_t],Wt=Rt.format,Jt=Rt.type;v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_t);let Tt=Ql(Rt);if(Tt.__formatReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=v.width-z&&G>=0&&G<=v.height-H&&I.readPixels(N,G,z,H,pt.convert(Wt),pt.convert(Jt),yt)}finally{let Rt=nt!==null?V.get(nt).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(v,N,G,z,H,yt,St,_t=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(wt=wt[St]),wt)if(N>=0&&N<=v.width-z&&G>=0&&G<=v.height-H){x.bindFramebuffer(I.FRAMEBUFFER,wt);let Rt=v.textures[_t],Wt=Rt.format,Jt=Rt.type;v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_t);let Tt=Ql(Rt);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ie=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ie),I.bufferData(I.PIXEL_PACK_BUFFER,yt.byteLength,I.STREAM_READ),I.readPixels(N,G,z,H,pt.convert(Wt),pt.convert(Jt),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let ye=nt!==null?V.get(nt).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,ye);let de=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await vu(I,de,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ie),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,yt),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(ie),I.deleteSync(de),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,N=null,G=0){let z=Math.pow(2,-G),H=Math.floor(v.image.width*z),yt=Math.floor(v.image.height*z),St=N!==null?N.x:0,_t=N!==null?N.y:0;q.setTexture2D(v,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,St,_t,H,yt),x.unbindTexture()},this.copyTextureToTexture=function(v,N,G=null,z=null,H=0,yt=0){let St,_t,wt,Rt,Wt,Jt,Tt,ie,ye,de=v.isCompressedTexture?v.mipmaps[yt]:v.image;if(G!==null)St=G.max.x-G.min.x,_t=G.max.y-G.min.y,wt=G.isBox3?G.max.z-G.min.z:1,Rt=G.min.x,Wt=G.min.y,Jt=G.isBox3?G.min.z:0;else{let xe=Math.pow(2,-H);St=Math.floor(de.width*xe),_t=Math.floor(de.height*xe),v.isDataArrayTexture?wt=de.depth:v.isData3DTexture?wt=Math.floor(de.depth*xe):wt=1,Rt=0,Wt=0,Jt=0}z!==null?(Tt=z.x,ie=z.y,ye=z.z):(Tt=0,ie=0,ye=0);let ce=pt.convert(N.format),Pe=pt.convert(N.type),Mt;N.isData3DTexture?(q.setTexture3D(N,0),Mt=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(q.setTexture2DArray(N,0),Mt=I.TEXTURE_2D_ARRAY):(q.setTexture2D(N,0),Mt=I.TEXTURE_2D),x.activeTexture(I.TEXTURE0),x.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),x.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),x.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);let Ue=x.getParameter(I.UNPACK_ROW_LENGTH),Qt=x.getParameter(I.UNPACK_IMAGE_HEIGHT),tn=x.getParameter(I.UNPACK_SKIP_PIXELS),xn=x.getParameter(I.UNPACK_SKIP_ROWS),zn=x.getParameter(I.UNPACK_SKIP_IMAGES);x.pixelStorei(I.UNPACK_ROW_LENGTH,de.width),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,de.height),x.pixelStorei(I.UNPACK_SKIP_PIXELS,Rt),x.pixelStorei(I.UNPACK_SKIP_ROWS,Wt),x.pixelStorei(I.UNPACK_SKIP_IMAGES,Jt);let Ai=v.isDataArrayTexture||v.isData3DTexture,ae=N.isDataArrayTexture||N.isData3DTexture;if(v.isDepthTexture){let xe=V.get(v),Hn=V.get(N),he=V.get(xe.__renderTarget),Vn=V.get(Hn.__renderTarget);x.bindFramebuffer(I.READ_FRAMEBUFFER,he.__webglFramebuffer),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Ri=0;Ri<wt;Ri++)Ai&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(v).__webglTexture,H,Jt+Ri),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(N).__webglTexture,yt,ye+Ri)),I.blitFramebuffer(Rt,Wt,St,_t,Tt,ie,St,_t,I.DEPTH_BUFFER_BIT,I.NEAREST);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||V.has(v)){let xe=V.get(v),Hn=V.get(N);x.bindFramebuffer(I.READ_FRAMEBUFFER,D),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,B);for(let he=0;he<wt;he++)Ai?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,xe.__webglTexture,H,Jt+he):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,xe.__webglTexture,H),ae?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Hn.__webglTexture,yt,ye+he):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Hn.__webglTexture,yt),H!==0?I.blitFramebuffer(Rt,Wt,St,_t,Tt,ie,St,_t,I.COLOR_BUFFER_BIT,I.NEAREST):ae?I.copyTexSubImage3D(Mt,yt,Tt,ie,ye+he,Rt,Wt,St,_t):I.copyTexSubImage2D(Mt,yt,Tt,ie,Rt,Wt,St,_t);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ae?v.isDataTexture||v.isData3DTexture?I.texSubImage3D(Mt,yt,Tt,ie,ye,St,_t,wt,ce,Pe,de.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(Mt,yt,Tt,ie,ye,St,_t,wt,ce,de.data):I.texSubImage3D(Mt,yt,Tt,ie,ye,St,_t,wt,ce,Pe,de):v.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,yt,Tt,ie,St,_t,ce,Pe,de.data):v.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,yt,Tt,ie,de.width,de.height,ce,de.data):I.texSubImage2D(I.TEXTURE_2D,yt,Tt,ie,St,_t,ce,Pe,de);x.pixelStorei(I.UNPACK_ROW_LENGTH,Ue),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Qt),x.pixelStorei(I.UNPACK_SKIP_PIXELS,tn),x.pixelStorei(I.UNPACK_SKIP_ROWS,xn),x.pixelStorei(I.UNPACK_SKIP_IMAGES,zn),yt===0&&N.generateMipmaps&&I.generateMipmap(Mt),x.unbindTexture()},this.initRenderTarget=function(v){V.get(v).__webglFramebuffer===void 0&&q.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?q.setTextureCube(v,0):v.isData3DTexture?q.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?q.setTexture2DArray(v,0):q.setTexture2D(v,0),x.unbindTexture()},this.resetState=function(){X=0,W=0,nt=null,x.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}};var sd={type:"change"},Cl={type:"start"},od={type:"end"},Na=new $n,rd=new Ze,Pm=Math.cos(70*al.DEG2RAD),we=new L,We=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Rl=1e-6,Ua=class extends rr{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ti.ROTATE,MIDDLE:ti.DOLLY,RIGHT:ti.PAN},this.touches={ONE:ei.ROTATE,TWO:ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new $e,this._lastTargetPosition=new L,this._quat=new $e().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new cs,this._sphericalDelta=new cs,this._scale=1,this._panOffset=new L,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new L,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Lm.bind(this),this._onPointerDown=Im.bind(this),this._onPointerUp=Dm.bind(this),this._onContextMenu=zm.bind(this),this._onMouseWheel=Fm.bind(this),this._onKeyDown=Om.bind(this),this._onTouchStart=Bm.bind(this),this._onTouchMove=km.bind(this),this._onMouseDown=Nm.bind(this),this._onMouseMove=Um.bind(this),this._interceptControlDown=Hm.bind(this),this._interceptControlUp=Vm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=oe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sd),this.update(),this.state=oe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=We:n>Math.PI&&(n-=We),s<-Math.PI?s+=We:s>Math.PI&&(s-=We),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=we.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Na.origin.copy(this.object.position),Na.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Na.direction))<Pm?this.object.lookAt(this.target):(rd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Na.intersectPlane(rd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Rl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Rl||this._lastTargetPosition.distanceToSquared(this.target)>Rl?(this.dispatchEvent(sd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?We/60*this.autoRotateSpeed*t:We/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;we.copy(s).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-We*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Im(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Lm(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Dm(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(od),this.state=oe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Nm(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ti.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=oe.DOLLY;break;case ti.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}break;case ti.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Cl)}function Um(i){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Fm(i){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(i.preventDefault(),this.dispatchEvent(Cl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(od))}function Om(i){this.enabled!==!1&&this._handleKeyDown(i)}function Bm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ei.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=oe.TOUCH_ROTATE;break;case ei.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case ei.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=oe.TOUCH_DOLLY_PAN;break;case ei.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Cl)}function km(i){switch(this._trackPointer(i),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=oe.NONE}}function zm(i){this.enabled!==!1&&i.preventDefault()}function Hm(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vm(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Il(i,t,e){return Math.hypot(i,t,e)}function _r(i,t){return[i[0]-t[0],i[1]-t[1],i[2]-t[2]]}function Fa(i,t){return[i[0]+t[0],i[1]+t[1],i[2]+t[2]]}function Pl(i,t){return[i[0]*t,i[1]*t,i[2]*t]}function Oa(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function Ba(i){let t=Il(i[0],i[1],i[2]);return t<1e-9?[0,0,1]:[i[0]/t,i[1]/t,i[2]/t]}function xs(i){return[i.x,i.y,i.z]}function yr(i,t){let e=xs(i.point),n=xs(t.point),s=_r(n,e),r=Il(s[0],s[1],s[2]),o=Ba(xs(i.normal)),a=Ba(xs(t.normal)),c=Math.abs(Oa(o,a))>=.85,l=Math.abs(Oa(o,s));return{straight:r,face:l,parallel:c,primary:c?l:r}}function ad(i,t,e){return i[0]>=t[0]&&i[0]<=e[0]&&i[1]>=t[1]&&i[1]<=e[1]&&i[2]>=t[2]&&i[2]<=e[2]}function Gm(i,t,e,n,s=0){let r=[e[0]-s,e[1]-s,e[2]-s],o=[n[0]+s,n[1]+s,n[2]+s],a=_r(t,i),c=0,l=1;for(let h=0;h<3;h++){if(Math.abs(a[h])<1e-9){if(i[h]<r[h]||i[h]>o[h])return!1;continue}let d=(r[h]-i[h])/a[h],u=(o[h]-i[h])/a[h];if(d>u){let f=d;d=u,u=f}if(c=Math.max(c,d),l=Math.min(l,u),c>l)return!1}return!0}function Ll(i,t,e,n,s=6){let r=xs(i),o=xs(t),a=[(r[0]+o[0])/2,(r[1]+o[1])/2,(r[2]+o[2])/2],c=[(e[0]+n[0])/2,(e[1]+n[1])/2,(e[2]+n[2])/2],l=Ba(_r(o,r)),h=_r(a,c),d=Oa(h,l),u=_r(h,Pl(l,d));if(Il(u[0],u[1],u[2])<.001){let p=[[1,0,0],[0,1,0],[0,0,1]],T=p[0],A=2;for(let b of p){let M=Math.abs(Oa(b,l));M<A&&(A=M,T=b)}u=T}let f=Ba(u),m=Math.max(n[0]-e[0],n[1]-e[1],n[2]-e[2],s),y=s,g=Pl(f,y);for(let p=0;p<28;p++){g=Pl(f,y);let T=Fa(r,g),A=Fa(o,g);if(!ad(T,e,n)&&!ad(A,e,n)&&!Gm(T,A,e,n,2.2))return{shift:g,endA:T,endB:A};y+=Math.max(2,m/7)}return{shift:g,endA:Fa(r,g),endB:Fa(o,g)}}var cd="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js",Wm="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm",Dl=null;async function ld(){return Dl||(Dl=import(typeof window<"u"?cd:"manifold-3d").catch(()=>import(cd)).then(t=>(t.default||t)(typeof window<"u"?{locateFile:s=>s.endsWith(".wasm")?Wm:s}:{})).then(t=>(t.setup(),t))),Dl}function hd(i){for(let t of i)if(t&&typeof t.delete=="function")try{t.delete()}catch{}}function Xm(i,t,e,n,s){let r=Math.max(.05,Math.min(n,t/2-.05,e/2-.05)),o=i.square([Math.max(.2,t-2*r),Math.max(.2,e-2*r)],!0);s.push(o);let a=o.offset(r,"Round");return s.push(a),a}function ka(i,t,e,n,s,r,o){let c=Xm(i,t,e,s,o).extrude(n);return o.push(c),r&&(c=c.translate(0,0,r),o.push(c)),c}function ud(i){return{vertProperties:Float32Array.from(i.vertProperties),triVerts:Uint32Array.from(i.triVerts),numProp:i.numProp||3}}function za(i,t,e,n){let{Manifold:s,CrossSection:r}=i;typeof i.setCircularSegments=="function"&&i.setCircularSegments(n);let o=rn(t),a=ka(r,o.hookX,o.hookY,o.tipH,o.cornerR,0,e),c=a;if(o.rampRun>.45&&o.thickness-o.tipH>.4){let f=ka(r,o.hookX,o.coreY,o.thickness,o.cornerR,0,e);c=s.hull([f,a]),e.push(c)}else o.thickness-o.tipH>.2&&(c=ka(r,o.hookX,o.hookY,o.thickness,o.cornerR,0,e));let l=s.cylinder(o.totalZ,o.neckR,o.neckR,Math.max(24,n),!1);e.push(l);let h=ka(r,o.headX,o.headY,o.thickness,o.headR,o.thickness+o.throat,e),d=s.union([c,l,h]);e.push(d);let u=d.status?d.status():"NoError";if(u&&u!=="NoError")throw new Error(`Lock manifold error: ${u}`);return d}async function dd(i,{quality:t="preview"}={}){let e=await ld(),n=t==="export"?64:40,s=rn(i),r=[];try{let o=za(e,i,r,n),a=ud(o.getMesh()),c=o.volume(),l=typeof o.genus=="function"?o.genus():null;return{d:s,mesh:a,volume:c,genus:l,tris:a.triVerts.length/3}}finally{hd(r)}}async function fd(i){let t=await ld(),e=rn(i),n=[];try{let s=za(t,i,n,64),r=ud(s.getMesh()),o=s.volume();return{stl:Ym(r,"costco-bin-lock"),volume:o,mesh:r,d:e}}finally{hd(n)}}function Ym(i,t="mesh"){let{vertProperties:e,triVerts:n,numProp:s}=i,r=s||3,o=n.length/3,a=new Uint8Array(80),c=`costco-bin-lock ${t}`.slice(0,79);for(let u=0;u<c.length;u++)a[u]=c.charCodeAt(u);let l=new ArrayBuffer(84+o*50),h=new DataView(l);new Uint8Array(l,0,80).set(a),h.setUint32(80,o,!0);let d=84;for(let u=0;u<o;u++){let f=n[u*3]*r,m=n[u*3+1]*r,y=n[u*3+2]*r,g=e[f],p=e[f+1],T=e[f+2],A=e[m],b=e[m+1],M=e[m+2],S=e[y],R=e[y+1],_=e[y+2],E=A-g,C=b-p,P=M-T,F=S-g,k=R-p,D=_-T,B=C*D-P*k,X=P*F-E*D,W=E*k-C*F,nt=Math.hypot(B,X,W)||1;h.setFloat32(d,B/nt,!0),h.setFloat32(d+4,X/nt,!0),h.setFloat32(d+8,W/nt,!0),h.setFloat32(d+12,g,!0),h.setFloat32(d+16,p,!0),h.setFloat32(d+20,T,!0),h.setFloat32(d+24,A,!0),h.setFloat32(d+28,b,!0),h.setFloat32(d+32,M,!0),h.setFloat32(d+36,S,!0),h.setFloat32(d+40,R,!0),h.setFloat32(d+44,_,!0),h.setUint16(d+48,0,!0),d+=50}return l}function pd(i){let{vertProperties:t,triVerts:e,numProp:n}=i,s=n||3,r=new Float32Array(e.length*3),o=0;for(let a=0;a<e.length;a++){let c=e[a]*s;r[o++]=t[c],r[o++]=t[c+1],r[o++]=t[c+2]}return r}function md(i,t){let e=new Blob([t],{type:"model/stl"}),n=URL.createObjectURL(e),s=document.createElement("a");s.href=n,s.download=i,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),1500)}function gd(i){return i.byteLength<84?0:new DataView(i).getUint32(80,!0)}function qm(i){let t=new be;return t.setAttribute("position",new Oe(pd(i),3)),t.computeVertexNormals(),t}function Zm(i,t){let e=new _i,n=t/2,s=Math.max(.01,(i-t)/2);return e.absarc(s,0,n,Math.PI/2,-Math.PI/2,!0),e.absarc(-s,0,n,-Math.PI/2,Math.PI/2,!0),e}function $m(i,t,e){let n=new ns,s=i/2,r=t/2,o=Math.min(e,s-.05,r-.05);return n.moveTo(-s+o,-r),n.lineTo(s-o,-r),n.absarc(s-o,-r+o,o,-Math.PI/2,0,!1),n.lineTo(s,r-o),n.absarc(s-o,r-o,o,0,Math.PI/2,!1),n.lineTo(-s+o,r),n.absarc(-s+o,r-o,o,Math.PI/2,Math.PI,!1),n.lineTo(-s,-r+o),n.absarc(-s+o,-r+o,o,Math.PI,Math.PI*1.5,!1),n}function Jm(i){let e=i.p.slotLength+10.4,n=i.p.slotWidth+5.2*2,s=$m(e,n,4);s.holes.push(Zm(i.p.slotLength,i.p.slotWidth));let r=Math.min(2.4,Math.max(1.5,i.throat-1.3)),o=new Js(s,{depth:r,bevelEnabled:!1,curveSegments:24});return o.translate(0,0,i.thickness+(i.throat-r)/2),o}var Ha=class{constructor({canvas:t}){this.canvas=t,this.renderer=new Ia({canvas:t,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(14144200,1),this.scene=new Fs,this.camera=new De(38,1,.1,2e3),this.camera.up.set(0,0,1),this.camera.position.set(48,-58,42),this.controls=new Ua(this.camera,t),this.controls.enableDamping=!0,this.controls.target.set(0,0,6),this.scene.add(new nr(16777215,.78)),this.scene.add(new tr(16774884,12892324,.45));let e=new as(16777215,1.25);e.position.set(-40,-60,90),this.scene.add(e);let n=new as(16774358,.55);n.position.set(50,24,30),this.scene.add(n),this.grid=new sr(160,16,11577500,13222582),this.grid.rotation.x=Math.PI/2,this.grid.position.z=-.05,this.scene.add(this.grid),this.lockMat=new ss({color:16775923,roughness:.42,metalness:.02}),this.lidMat=new ss({color:15777812,roughness:.58,metalness:.02,side:Qe}),this.lockMesh=new Me(new be,this.lockMat),this.lidMesh=new Me(new be,this.lidMat),this.scene.add(this.lockMesh),this.scene.add(this.lidMesh),this.callout=new Nn,this.scene.add(this.callout),this.measureMode=!1,this.picks=[],this.onMeasure=null,this.raycaster=new ir,this._pointerDown=null,this._bubble=document.getElementById("measureBubble"),this._bubbleValue=document.getElementById("measureValue"),this._bubbleKind=document.getElementById("measureKind"),t.addEventListener("pointerdown",s=>{this._pointerDown={x:s.clientX,y:s.clientY,id:s.pointerId}}),t.addEventListener("pointerup",s=>this._onPointerUp(s)),this.fitted=!1,this.view="iso",this.running=!0,this._loop=this._loop.bind(this),requestAnimationFrame(this._loop),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t.parentElement||t),this.resize()}update(t){let{mesh:e,d:n}=t;this.d=n,this.lockMesh.geometry.dispose(),this.lockMesh.geometry=qm(e),this.lidMesh.geometry.dispose(),this.lidMesh.geometry=Jm(n),this.clearMeasure(),this.fitted||this.fit()}setMeasureMode(t){this.measureMode=!!t,this.canvas.parentElement?.classList.toggle("measuring",this.measureMode),this.measureMode||this.clearMeasure()}clearMeasure(){let t=this.picks.length>0;this.picks=[],this.measureReadout=null,this._calloutMid=null,this._clearCallout(),this._hideBubble(),t&&this.measureMode&&this.onMeasure?.({phase:"cleared"})}_clearCallout(){for(;this.callout.children.length;){let t=this.callout.children.pop();t.geometry?.dispose(),t.material?.dispose()}}_hideBubble(){this._bubble&&(this._bubble.hidden=!0)}_onPointerUp(t){if(!this.measureMode||!this._pointerDown||this._pointerDown.id!==t.pointerId)return;let e=Math.hypot(t.clientX-this._pointerDown.x,t.clientY-this._pointerDown.y);if(this._pointerDown=null,e>6)return;let n=this._hitAt(t.clientX,t.clientY);n&&(this.picks.length>=2&&this.clearMeasure(),this.picks.push(n),this._drawMeasure())}_hitAt(t,e){let n=this.canvas.getBoundingClientRect(),s=new ot((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);this.raycaster.setFromCamera(s,this.camera);let o=this.raycaster.intersectObjects([this.lockMesh,this.lidMesh],!1)[0];if(!o?.face)return null;let a=o.object.geometry.getAttribute("position"),c=o.face.normal.clone().transformDirection(o.object.matrixWorld).normalize();return{point:o.point.clone(),normal:c,part:o.object===this.lidMesh?"lid":"lock",verts:[o.face.a,o.face.b,o.face.c].map(l=>new L().fromBufferAttribute(a,l).applyMatrix4(o.object.matrixWorld))}}showPair(t,e){return this.measureMode=!0,this.canvas.parentElement?.classList.add("measuring"),this.picks=[{point:new L(t.point.x,t.point.y,t.point.z),normal:new L(t.normal.x,t.normal.y,t.normal.z)},{point:new L(e.point.x,e.point.y,e.point.z),normal:new L(e.normal.x,e.normal.y,e.normal.z)}],this._drawMeasure(),this.measureReadout}_drawMeasure(){this._clearCallout();let t=new Mn({color:10105874});for(let a of this.picks){if(a.verts){let l=new be,h=new Float32Array(9);a.verts.forEach((u,f)=>{let m=u.clone().addScaledVector(a.normal,.25);h[f*3]=m.x,h[f*3+1]=m.y,h[f*3+2]=m.z}),l.setAttribute("position",new Oe(h,3));let d=new Me(l,new Mn({color:12730636,side:Qe,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-4}));this.callout.add(d)}let c=new Me(new js(.7,14,10),t.clone());c.position.copy(a.point).addScaledVector(a.normal,.45),this.callout.add(c)}if(this.picks.length<2){this._hideBubble(),this.measureReadout=null,this.onMeasure?.({phase:"first"});return}let e=yr(this.picks[0],this.picks[1]),n=new un().setFromObject(this.lockMesh);n.union(new un().setFromObject(this.lidMesh));let s=Ll(this.picks[0].point,this.picks[1].point,n.min.toArray(),n.max.toArray(),7),r=new L(...s.endA),o=new L(...s.endB);this.callout.add(this._rod(this.picks[0].point,r,.28,10105874)),this.callout.add(this._rod(this.picks[1].point,o,.28,10105874)),this.callout.add(this._rod(r,o,.42,10105874)),this.callout.add(this._arrow(r,o)),this.callout.add(this._arrow(o,r)),this._calloutMid=r.clone().add(o).multiplyScalar(.5),this.measureReadout={phase:"pair",parallel:e.parallel,mm:e.primary,label:`${e.primary.toFixed(1)} mm`,picks:this.picks.map(a=>({point:{x:a.point.x,y:a.point.y,z:a.point.z},normal:a.normal?{x:a.normal.x,y:a.normal.y,z:a.normal.z}:null}))},this._placeBubble(),this.onMeasure?.(this.measureReadout)}_rod(t,e,n,s){let r=new L().subVectors(e,t),o=Math.max(.2,r.length()),a=new Me(new ts(n,n,o,8),new Mn({color:s}));return a.position.copy(t).add(e).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new L(0,1,0),r.normalize()),a}_arrow(t,e){let n=new L().subVectors(e,t).normalize(),s=2.6,r=new Me(new Vs(1.05,s,10),new Mn({color:10105874}));return r.quaternion.setFromUnitVectors(new L(0,1,0),n),r.position.copy(t).addScaledVector(n,s/2),r}_placeBubble(){let t=this._bubble;if(!t||!this._calloutMid||this.picks.length<2){this._hideBubble();return}let e=this._calloutMid.clone().project(this.camera);if(e.z>1){t.hidden=!0;return}let n=this.canvas.parentElement||this.canvas,s=n.clientWidth,r=n.clientHeight,o=Math.min(s-28,Math.max(28,(e.x*.5+.5)*s)),a=Math.min(r-18,Math.max(18,(-e.y*.5+.5)*r));t.hidden=!1,t.style.left=`${o}px`,t.style.top=`${a}px`,this._bubbleValue&&(this._bubbleValue.textContent=this.measureReadout.label),this._bubbleKind&&(this._bubbleKind.textContent=this.kindText||(this.measureReadout.parallel?"between those faces":"between the clicks"))}fit(){this.setNamedView(this.view||"iso"),this.fitted=!0}setNamedView(t){let e=this.d;if(this.view=t||"iso",!e)return;this.camera.up.set(0,0,1);let n=e.thickness+e.throat*.35,s=Math.max(e.hookY,e.p.slotLength+12,48);t==="top"?(this.camera.position.set(.15,-.2,s*1.15),this.controls.target.set(0,0,n)):t==="side"?(this.camera.position.set(s*1.25,0,n),this.controls.target.set(0,0,n)):t==="hook"?(this.camera.up.set(0,1,0),this.camera.position.set(s*.15,-s*.42,-s*.72),this.controls.target.set(0,0,e.thickness*.4)):(this.camera.position.set(s*.62,-s*.78,s*.34),this.controls.target.set(0,1.5,n)),this.controls.update()}resize(){let t=this.canvas.parentElement||this.canvas,e=Math.max(1,t.clientWidth),n=Math.max(1,t.clientHeight);this.renderer.setSize(e,n,!1),this.camera.aspect=e/n,this.camera.updateProjectionMatrix()}_loop(){this.running&&(this.controls.update(),this.picks.length===2&&this._placeBubble(),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this._loop))}};var vr="mathoose-public-playground:print-library";function xd(){return{favorites:[],activity:[],settings:{}}}function Va(){try{let i=JSON.parse(localStorage.getItem(vr));return!i||typeof i!="object"?xd():{favorites:Array.isArray(i.favorites)?i.favorites:[],activity:Array.isArray(i.activity)?i.activity:[],settings:i.settings&&typeof i.settings=="object"?i.settings:{}}}catch{return xd()}}function Nl(i){try{localStorage.setItem(vr,JSON.stringify(i))}catch{}}function Ul(i){try{return JSON.parse(JSON.stringify(i))}catch{return null}}function Fl(i,t){i.activity.unshift(t),i.activity=i.activity.slice(0,30)}function _d(){return new URLSearchParams(location.search).get("restore")==="1"?!0:location.hash==="#restore"||location.hash.includes("restore=1")}function yd(i){let t=Va().settings[i];return t?Ul(t):null}function vd(i){let t=Va(),e=t.activity[0];e&&e.id===i&&e.kind==="visit"&&Date.now()-e.at<12e4||(Fl(t,{id:i,kind:"visit",at:Date.now()}),Nl(t))}function br(i,t){let e=Va(),n=Ul(t);n&&(e.settings[i]=n),Fl(e,{id:i,kind:"save",at:Date.now()}),Nl(e)}function Ga(i,{filename:t,params:e}={}){let n=Va(),s=e==null?null:Ul(e);s&&(n.settings[i]=s),Fl(n,{id:i,kind:"export",filename:t||"",at:Date.now()}),Nl(n)}var bd="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js",Km="https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm",Md="test-export-style",jm=12,Qm=`
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
`,t4={0:"abcedf",1:"bc",2:"abged",3:"abgcd",4:"fgbc",5:"afgcd",6:"afgedc",7:"abc",8:"abcdefg",9:"abfgcd"},wd=3.15,Td=1.3,Ad=1.45,Ol=null;function kl(i,t=1){let e=Number(i);if(!Number.isFinite(e))return"0";let n=t>=1?0:t>=.1?1:2,s=10**n,r=Math.round(e*s)/s;return n===0?String(r):r.toFixed(n).replace(/(\.\d*?)0+$/,"$1").replace(/\.$/,"")}function e4(i,t){return i.map(e=>kl(t[e.key],e.step)).join(" ")}function n4(i){return i===" "?Td:i==="."?Ad:wd}function i4(i){let t=0;for(let e of String(i))t+=n4(e);return t}function s4(i,t,e,n){let c=n-.275,l={a:[2.5/2,4.1-.52/2,2.5,.52],b:[2.5-.52/2,4.1*.75,.52,4.1/2],c:[2.5-.52/2,4.1*.25,.52,4.1/2],d:[2.5/2,.52/2,2.5,.52],e:[.52/2,4.1*.25,.52,4.1/2],f:[.52/2,4.1*.75,.52,4.1/2],g:[2.5/2,4.1/2,2.5-.52,.52]};return[...t4[i]||""].map(h=>{let[d,u,f,m]=l[h];return{size:[f,m,.55],at:[t+d,e+u,c]}})}function Rd(){try{let i=JSON.parse(localStorage.getItem(vr));return!i||typeof i!="object"?{favorites:[],activity:[],settings:{}}:((!i.settings||typeof i.settings!="object")&&(i.settings={}),i)}catch{return{favorites:[],activity:[],settings:{}}}}function Wa(i){return`${i}-tests`}function Sd(i){let t=Rd().settings[Wa(i)];return Array.isArray(t)?t:[]}function r4(i,t){let e=Rd(),n=Array.isArray(e.settings[Wa(i)])?e.settings[Wa(i)]:[];n.unshift(t),e.settings[Wa(i)]=n.slice(0,jm);try{localStorage.setItem(vr,JSON.stringify(e))}catch{}}async function o4(){return Ol||(Ol=import(typeof window<"u"?bd:"manifold-3d").catch(()=>import(bd)).then(t=>(t.default||t)(typeof window<"u"?{locateFile:s=>s.endsWith(".wasm")?Km:s}:{})).then(t=>(t.setup(),t))),Ol}function a4(i){for(let t of i)if(t&&typeof t.delete=="function")try{t.delete()}catch{}}function zl(i,t){let e=i.status?i.status():"NoError";if(e&&e!=="NoError")throw new Error(`${t} manifold error: ${e}`);return i}function c4(i){return{vertProperties:Float32Array.from(i.vertProperties),triVerts:Uint32Array.from(i.triVerts),numProp:i.numProp||3}}function Xa(i,t,e,n){return n(i.cube(t,!0).translate(e))}function Bl(i,t,e){return zl(e(i.add(t)),"union")}function l4(i,t,e,n,s,r,o){let{Manifold:a}=i,c=n,l=null;for(let h of String(e)){if(h===" "){c+=Td;continue}if(h==="."){let d=Xa(a,[.62,.62,.55],[c+.72,s+.55,r-.275],o);l=l?Bl(l,d,o):d,c+=Ad;continue}for(let d of s4(h,c,s,r)){let u=Xa(a,d.size,d.at,o);l=l?Bl(l,u,o):u}c+=wd}return l?zl(o(t.subtract(l)),"Test marking"):t}function h4(i,t,e,n){let{Manifold:s}=i,r=t,o=r.boundingBox();(o.min[2]<-1e-4||o.min[2]>.001)&&(r=n(r.translate([0,0,-o.min[2]])),o=r.boundingBox());let a=String(e),c=i4(a),l=6.8,h=1.8,d=Math.max(c+2.4,10),u=.75,f=(o.min[0]+o.max[0])/2,m=o.min[1]+u,y=m-l,g=Xa(s,[d,l,h],[f,(y+m)/2,h/2],n),p=zl(n(r.add(g)),"Test piece");return p=l4(i,p,a,f-c/2,y+1.15,h,n),o=p.boundingBox(),o.min[2]<-1e-4&&(p=n(p.translate([0,0,-o.min[2]]))),p}function u4(i,t="test"){let{vertProperties:e,triVerts:n,numProp:s}=i,r=s||3,o=n.length/3,a=new Uint8Array(80),c=String(t).slice(0,79);for(let u=0;u<c.length;u++)a[u]=c.charCodeAt(u);let l=new ArrayBuffer(84+o*50),h=new DataView(l);new Uint8Array(l,0,80).set(a),h.setUint32(80,o,!0);let d=84;for(let u=0;u<o;u++){let f=n[u*3]*r,m=n[u*3+1]*r,y=n[u*3+2]*r,g=e[f],p=e[f+1],T=e[f+2],A=e[m],b=e[m+1],M=e[m+2],S=e[y],R=e[y+1],_=e[y+2],E=(b-p)*(_-T)-(M-T)*(R-p),C=(M-T)*(S-g)-(A-g)*(_-T),P=(A-g)*(R-p)-(b-p)*(S-g),F=Math.hypot(E,C,P)||1;h.setFloat32(d,E/F,!0),h.setFloat32(d+4,C/F,!0),h.setFloat32(d+8,P/F,!0),h.setFloat32(d+12,g,!0),h.setFloat32(d+16,p,!0),h.setFloat32(d+20,T,!0),h.setFloat32(d+24,A,!0),h.setFloat32(d+28,b,!0),h.setFloat32(d+32,M,!0),h.setFloat32(d+36,S,!0),h.setFloat32(d+40,R,!0),h.setFloat32(d+44,_,!0),h.setUint16(d+48,0,!0),d+=50}return l}function d4(i,t){let e=new Blob([t],{type:"model/stl"}),n=URL.createObjectURL(e),s=document.createElement("a");s.href=n,s.download=i,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),1500)}async function Cd({feature:i,label:t,stlName:e}){let n=await o4();typeof n.setCircularSegments=="function"&&n.setCircularSegments(48);let s=[],r=o=>(s.push(o),o);try{let o=i(n,r,s);if(!o)throw new Error("Test piece is empty");let a=h4(n,o,t,r),c=c4(a.getMesh()),l=a.volume();if(!(l>0))throw new Error("Test piece has no volume");return{stl:u4(c,e),mesh:c,volume:l,label:t}}finally{a4(s)}}function f4(){if(document.getElementById(Md))return;let i=document.createElement("style");i.id=Md,i.textContent=Qm,document.head.appendChild(i)}function p4(i,t){let e=Number(t);return Number.isFinite(e)||(e=Number(i.fallback??i.min??0)),Number.isFinite(i.min)&&(e=Math.max(i.min,e)),Number.isFinite(i.max)&&(e=Math.min(i.max,e)),e}function Ed(i,t){return i.map(e=>{let n=e.unit?` ${e.unit}`:"";return`${e.label} ${kl(t[e.key],e.step)}${n}`}).join(" \xB7 ")}function m4(i){return String(i).replace(/\s+/g,"-").replace(/\./g,"p")}function g4(i,t){if(!t.length){i.hidden=!0,i.innerHTML="";return}i.hidden=!1,i.innerHTML=t.map((e,n)=>`
        <li>
          <span>${e.summary||e.filename||"test"}</span>
          <button type="button" data-load-test="${n}">Load</button>
        </li>`).join("")}function x4(i,t,e){if(!i||typeof i.showModal!="function")return Promise.resolve(null);for(let n of t){let s=i.querySelector(`[name="${n.key}"]`);s&&(s.value=kl(e[n.key],n.step))}return i.showModal(),new Promise(n=>{let s=()=>{if(i.removeEventListener("close",s),i.returnValue!=="ok"){n(null);return}let r={};for(let o of t){let a=i.querySelector(`[name="${o.key}"]`);r[o.key]=p4(o,a?.value)}n(r)};i.addEventListener("close",s)})}function Pd({appId:i,actions:t,buttonLabel:e="Test export",buttonClass:n="wide",title:s="Test export settings",fields:r,getParams:o,setParams:a,build:c,fileStem:l,labelFor:h}){if(!t||!r?.length)return;f4();let d=document.createElement("button");d.type="button",d.id="dlTest",d.className=n,d.textContent=e,t.appendChild(d);let u=document.createElement("ul");u.className="test-log",u.id="testLog",u.hidden=!0,t.insertAdjacentElement("afterend",u);let f=document.createElement("p");f.id="testStatus",f.className="status",u.insertAdjacentElement("afterend",f);let m=document.createElement("dialog");m.id="testPrompt",m.className="test-prompt";let y=document.createElement("form");y.method="dialog";let g=document.createElement("h2");g.textContent=s;let p=document.createElement("p");p.textContent="These numbers are engraved on the test piece and saved so you can load this export again.",y.append(g,p);for(let E of r){let C=document.createElement("label");C.textContent=E.unit?`${E.label} (${E.unit})`:E.label;let P=document.createElement("input");P.name=E.key,P.type="number",P.inputMode="decimal",E.min!=null&&(P.min=String(E.min)),E.max!=null&&(P.max=String(E.max)),E.step!=null&&(P.step=String(E.step)),C.appendChild(P),y.appendChild(C)}let T=document.createElement("div");T.className="actions";let A=document.createElement("button");A.type="submit",A.value="ok",A.textContent="Export test";let b=document.createElement("button");b.type="submit",b.value="cancel",b.className="ghost",b.textContent="Cancel",T.append(A,b),y.appendChild(T),m.appendChild(y),document.body.appendChild(m);let M=(E,C="")=>{f.textContent=E,f.dataset.kind=C},S=()=>g4(u,Sd(i));async function R(){let E=await x4(m,r,o());if(!E){M("Test export canceled.");return}a({...o(),...E});let C=o(),P=h?h(C):e4(r,C);M("Building test\u2026"),d.disabled=!0;try{let F=await c(C,P),k=`${l}-test-${m4(P)}.stl`;d4(k,F.stl);let D=h?`${Ed(r,C)} \xB7 ${P}`:Ed(r,C);r4(i,{at:Date.now(),filename:k,summary:D,label:P,params:{...C}}),br(i,C),Ga(i,{filename:k,params:C}),S(),M(`Test \xB7 ${D} \xB7 engraved on the piece`)}catch(F){console.error(F),M(String(F?.message||F),"err")}finally{d.disabled=!1}}function _(E){let C=Sd(i)[E];C?.params&&(a(C.params),br(i,o()),M(`Loaded test ${C.summary||C.label||""}`.trim()))}d.addEventListener("click",()=>R()),u.addEventListener("click",E=>{let C=E.target.closest("[data-load-test]");C&&_(Number(C.getAttribute("data-load-test")))}),S()}var M6=Object.freeze({armHeight:26,armWidth:10});var E6=Object.freeze({ledDiameter:58.4,ledThickness:7.6,clearance:.6,cordDiameter:8,cordHeight:3.8,cordAngle:0}),w6=Object.freeze([{key:"ledDiameter",min:20,max:80,step:.1,unit:"mm"},{key:"ledThickness",min:2,max:30,step:.1,unit:"mm"},{key:"clearance",min:0,max:2,step:.1,unit:"mm"},{key:"cordDiameter",min:0,max:18,step:.5,unit:"mm"},{key:"cordHeight",min:1,max:24,step:.1,unit:"mm"},{key:"cordAngle",min:0,max:360,step:1,unit:"\xB0"}]),T6=Object.freeze([{id:"tealight",label:"40 mm tea light",ledDiameter:40,ledThickness:10,cordHeight:5},{id:"puck23",label:"2.3 in puck",ledDiameter:58.4,ledThickness:7.6,cordHeight:3.8},{id:"puck275",label:"2.75 in puck",ledDiameter:70,ledThickness:15,cordHeight:6}]);var R6=Object.freeze({bankL:143,bankW:68,bankH:16,bankR:8,clearXY:.4,clearZ:.35,taper:.4,sleeveLen:72,wall:2.2,wrapStick:7,wrapLane:17,wrapGap:12,wrapFlange:2.2,wrapInset:6,slotOn:0,slotH:9,cordD:3.6,clipOn:1});var ai=25.4;var k6=[{id:"4x6",name:"4 \xD7 6 in",w:4*ai,h:6*ai},{id:"5x7",name:"5 \xD7 7 in",w:5*ai,h:7*ai},{id:"8x10",name:"8 \xD7 10 in",w:8*ai,h:10*ai},{id:"wallet",name:"Wallet 2.5 \xD7 3.5 in",w:2.5*ai,h:3.5*ai}];var ci=25.4;var V6=[{id:"4x6",name:"4 \xD7 6 in",w:4*ci,h:6*ci},{id:"5x7",name:"5 \xD7 7 in",w:5*ci,h:7*ci},{id:"8x10",name:"8 \xD7 10 in",w:8*ci,h:10*ci},{id:"wallet",name:"Wallet 2.5 \xD7 3.5 in",w:2.5*ci,h:3.5*ci}];var Id=[[[11.309,40.129],[11.361,40.147],[11.412,40.169],[11.461,40.193],[11.509,40.22],[11.555,40.25],[11.599,40.282],[11.641,40.318],[11.681,40.356],[11.718,40.396],[11.752,40.439],[11.784,40.484],[11.813,40.531],[11.839,40.579],[11.864,40.628],[11.886,40.679],[11.907,40.729],[11.926,40.781],[11.944,40.833],[11.961,40.885],[11.977,40.938],[11.991,40.991],[12.004,41.044],[12.016,41.098],[12.026,41.152],[12.034,41.206],[12.04,41.261],[12.045,41.316],[12.049,41.371],[12.051,41.426],[12.051,41.481],[12.05,41.535],[12.048,41.59],[12.044,41.645],[12.039,41.7],[12.034,41.755],[12.028,41.809],[12.021,41.864],[12.014,41.918],[12.008,41.973],[12.001,42.028],[11.995,42.082],[11.989,42.137],[11.984,42.192],[11.979,42.246],[11.973,42.301],[11.967,42.356],[11.961,42.41],[11.953,42.465],[11.945,42.519],[11.936,42.573],[11.925,42.627],[11.913,42.681],[11.9,42.734],[11.886,42.787],[11.87,42.84],[11.853,42.892],[11.834,42.944],[11.812,42.994],[11.787,43.043],[11.759,43.09],[11.728,43.135],[11.692,43.177],[11.653,43.216],[11.61,43.25],[11.564,43.28],[11.516,43.306],[11.465,43.329],[11.414,43.348],[11.362,43.365],[11.309,43.379],[11.255,43.392],[11.201,43.403],[11.147,43.413],[11.093,43.422],[11.039,43.43],[10.984,43.438],[10.93,43.447],[10.876,43.455],[10.821,43.464],[10.767,43.473],[10.713,43.482],[10.659,43.492],[10.605,43.502],[10.551,43.512],[10.497,43.522],[10.443,43.532],[10.389,43.541],[10.334,43.55],[10.28,43.559],[10.226,43.566],[10.171,43.573],[10.116,43.579],[10.062,43.584],[10.007,43.588],[9.952,43.592],[9.897,43.595],[9.842,43.599],[9.787,43.602],[9.733,43.606],[9.678,43.61],[9.623,43.615],[9.568,43.621],[9.514,43.627],[9.459,43.634],[9.405,43.64],[9.35,43.647],[9.295,43.653],[9.241,43.659],[9.186,43.664],[9.131,43.668],[9.076,43.671],[9.021,43.673],[8.966,43.675],[8.912,43.676],[8.857,43.677],[8.802,43.678],[8.747,43.678],[8.692,43.679],[8.637,43.679],[8.582,43.679],[8.527,43.679],[8.472,43.679],[8.417,43.679],[8.362,43.679],[8.307,43.679],[8.252,43.679],[8.197,43.679],[8.142,43.679],[8.087,43.679],[8.032,43.679],[7.977,43.679],[7.922,43.679],[7.867,43.679],[7.812,43.679],[7.757,43.679],[7.702,43.679],[7.647,43.679],[7.592,43.679],[7.537,43.679],[7.482,43.679],[7.427,43.679],[7.372,43.679],[7.318,43.679],[7.263,43.679],[7.208,43.679],[7.153,43.679],[7.098,43.678],[7.043,43.678],[6.988,43.677],[6.933,43.676],[6.878,43.673],[6.823,43.67],[6.768,43.665],[6.714,43.657],[6.66,43.645],[6.608,43.629],[6.558,43.605],[6.515,43.572],[6.481,43.529],[6.459,43.478],[6.45,43.424],[6.451,43.37],[6.462,43.316],[6.48,43.264],[6.504,43.214],[6.533,43.168],[6.568,43.126],[6.607,43.087],[6.651,43.053],[6.697,43.024],[6.746,42.999],[6.797,42.978],[6.849,42.961],[6.902,42.946],[6.955,42.933],[7.009,42.921],[7.063,42.911],[7.117,42.902],[7.172,42.893],[7.226,42.886],[7.281,42.879],[7.335,42.874],[7.39,42.869],[7.445,42.865],[7.5,42.862],[7.555,42.86],[7.61,42.859],[7.665,42.857],[7.72,42.857],[7.775,42.856],[7.83,42.856],[7.884,42.855],[7.939,42.855],[7.994,42.854],[8.049,42.853],[8.104,42.851],[8.159,42.848],[8.214,42.844],[8.269,42.838],[8.323,42.829],[8.377,42.817],[8.429,42.801],[8.48,42.78],[8.527,42.752],[8.57,42.718],[8.609,42.679],[8.642,42.635],[8.669,42.588],[8.693,42.538],[8.712,42.487],[8.729,42.434],[8.744,42.381],[8.758,42.328],[8.771,42.275],[8.785,42.221],[8.798,42.168],[8.813,42.115],[8.829,42.063],[8.846,42.011],[8.865,41.959],[8.886,41.908],[8.908,41.858],[8.931,41.808],[8.956,41.759],[8.981,41.71],[9.007,41.662],[9.034,41.614],[9.062,41.566],[9.091,41.519],[9.12,41.472],[9.149,41.426],[9.179,41.38],[9.209,41.334],[9.24,41.288],[9.27,41.243],[9.302,41.197],[9.333,41.152],[9.365,41.107],[9.397,41.063],[9.429,41.018],[9.461,40.974],[9.494,40.93],[9.527,40.885],[9.56,40.841],[9.593,40.798],[9.626,40.754],[9.659,40.71],[9.693,40.667],[9.727,40.624],[9.762,40.581],[9.798,40.54],[9.835,40.499],[9.873,40.459],[9.912,40.421],[9.954,40.385],[9.997,40.35],[10.041,40.318],[10.088,40.289],[10.135,40.262],[10.184,40.237],[10.234,40.214],[10.285,40.193],[10.337,40.175],[10.389,40.157],[10.442,40.142],[10.495,40.128],[10.549,40.115],[10.603,40.104],[10.657,40.095],[10.711,40.087],[10.766,40.081],[10.82,40.076],[10.875,40.073],[10.93,40.072],[10.985,40.073],[11.04,40.076],[11.095,40.082],[11.149,40.09],[11.203,40.1],[11.257,40.113]],[[10.847,41.015],[10.793,41.005],[10.738,40.998],[10.683,40.995],[10.629,40.996],[10.574,41],[10.52,41.009],[10.466,41.021],[10.414,41.038],[10.363,41.058],[10.314,41.082],[10.266,41.109],[10.22,41.138],[10.175,41.17],[10.131,41.202],[10.088,41.237],[10.046,41.272],[10.005,41.309],[9.965,41.346],[9.926,41.385],[9.888,41.424],[9.851,41.465],[9.816,41.507],[9.781,41.55],[9.748,41.593],[9.716,41.638],[9.686,41.684],[9.657,41.73],[9.63,41.778],[9.604,41.827],[9.581,41.876],[9.559,41.926],[9.539,41.978],[9.521,42.029],[9.504,42.081],[9.488,42.134],[9.474,42.187],[9.462,42.24],[9.452,42.294],[9.445,42.349],[9.444,42.404],[9.45,42.458],[9.466,42.51],[9.495,42.557],[9.534,42.595],[9.581,42.624],[9.631,42.645],[9.684,42.659],[9.738,42.67],[9.792,42.677],[9.847,42.682],[9.902,42.685],[9.957,42.686],[10.012,42.687],[10.066,42.687],[10.121,42.686],[10.176,42.685],[10.231,42.683],[10.286,42.679],[10.34,42.675],[10.395,42.67],[10.45,42.665],[10.504,42.658],[10.558,42.652],[10.613,42.644],[10.667,42.637],[10.722,42.63],[10.776,42.622],[10.83,42.614],[10.884,42.605],[10.938,42.595],[10.992,42.583],[11.045,42.568],[11.096,42.55],[11.146,42.527],[11.193,42.5],[11.237,42.467],[11.277,42.429],[11.311,42.386],[11.341,42.34],[11.367,42.292],[11.389,42.241],[11.407,42.19],[11.422,42.137],[11.435,42.084],[11.445,42.03],[11.454,41.976],[11.459,41.921],[11.463,41.866],[11.464,41.811],[11.463,41.757],[11.458,41.702],[11.451,41.648],[11.441,41.594],[11.427,41.541],[11.41,41.489],[11.389,41.438],[11.364,41.389],[11.336,41.342],[11.304,41.297],[11.269,41.255],[11.231,41.216],[11.19,41.179],[11.146,41.146],[11.1,41.116],[11.053,41.089],[11.003,41.066],[10.952,41.046],[10.9,41.029]],[[-.025,38.793],[.029,38.802],[.082,38.816],[.135,38.831],[.187,38.848],[.24,38.864],[.292,38.881],[.345,38.896],[.398,38.911],[.451,38.925],[.504,38.939],[.557,38.952],[.61,38.966],[.664,38.979],[.717,38.993],[.77,39.007],[.823,39.022],[.876,39.036],[.929,39.051],[.981,39.066],[1.034,39.082],[1.087,39.097],[1.14,39.112],[1.193,39.127],[1.245,39.142],[1.298,39.157],[1.351,39.172],[1.404,39.187],[1.456,39.203],[1.509,39.219],[1.561,39.235],[1.614,39.251],[1.666,39.267],[1.719,39.284],[1.771,39.3],[1.824,39.316],[1.876,39.332],[1.929,39.348],[1.981,39.363],[2.034,39.378],[2.087,39.394],[2.14,39.409],[2.193,39.424],[2.245,39.439],[2.298,39.455],[2.351,39.47],[2.403,39.486],[2.455,39.503],[2.508,39.52],[2.56,39.538],[2.611,39.557],[2.662,39.578],[2.711,39.601],[2.76,39.628],[2.806,39.657],[2.85,39.69],[2.89,39.728],[2.925,39.769],[2.955,39.815],[2.978,39.865],[2.994,39.918],[3.003,39.972],[3.006,40.027],[3.005,40.081],[3.001,40.136],[2.995,40.191],[2.989,40.245],[2.984,40.3],[2.981,40.355],[2.979,40.41],[2.979,40.465],[2.98,40.52],[2.981,40.574],[2.983,40.629],[2.983,40.684],[2.983,40.739],[2.98,40.794],[2.976,40.849],[2.97,40.903],[2.961,40.957],[2.95,41.011],[2.937,41.065],[2.922,41.117],[2.904,41.169],[2.884,41.22],[2.862,41.271],[2.839,41.32],[2.813,41.369],[2.786,41.417],[2.757,41.464],[2.727,41.51],[2.697,41.555],[2.665,41.6],[2.632,41.644],[2.599,41.688],[2.565,41.731],[2.53,41.773],[2.495,41.815],[2.458,41.856],[2.421,41.897],[2.383,41.937],[2.344,41.975],[2.305,42.013],[2.264,42.05],[2.222,42.085],[2.179,42.12],[2.136,42.153],[2.091,42.185],[2.045,42.215],[1.999,42.244],[1.951,42.272],[1.903,42.298],[1.854,42.323],[1.804,42.346],[1.753,42.367],[1.702,42.388],[1.651,42.407],[1.599,42.425],[1.547,42.442],[1.494,42.458],[1.441,42.472],[1.388,42.487],[1.335,42.5],[1.282,42.512],[1.228,42.524],[1.174,42.535],[1.12,42.546],[1.066,42.556],[1.012,42.565],[.958,42.573],[.903,42.58],[.849,42.586],[.794,42.592],[.739,42.595],[.685,42.598],[.63,42.6],[.575,42.6],[.52,42.599],[.465,42.597],[.41,42.594],[.356,42.589],[.301,42.582],[.247,42.573],[.193,42.563],[.139,42.551],[.086,42.537],[.034,42.521],[-.018,42.502],[-.069,42.482],[-.119,42.461],[-.169,42.437],[-.218,42.412],[-.266,42.385],[-.313,42.356],[-.358,42.326],[-.403,42.294],[-.446,42.261],[-.488,42.225],[-.528,42.187],[-.566,42.147],[-.6,42.105],[-.632,42.06],[-.661,42.013],[-.686,41.964],[-.707,41.914],[-.725,41.862],[-.74,41.809],[-.751,41.755],[-.76,41.701],[-.767,41.647],[-.772,41.592],[-.775,41.537],[-.778,41.482],[-.779,41.427],[-.78,41.373],[-.781,41.318],[-.781,41.263],[-.781,41.208],[-.781,41.153],[-.78,41.098],[-.779,41.043],[-.778,40.988],[-.775,40.933],[-.772,40.879],[-.768,40.824],[-.763,40.769],[-.757,40.715],[-.749,40.66],[-.741,40.606],[-.73,40.552],[-.719,40.498],[-.706,40.445],[-.692,40.392],[-.678,40.339],[-.662,40.286],[-.645,40.234],[-.627,40.182],[-.609,40.13],[-.591,40.079],[-.572,40.027],[-.553,39.975],[-.535,39.924],[-.517,39.872],[-.5,39.82],[-.484,39.767],[-.47,39.714],[-.458,39.66],[-.449,39.606],[-.442,39.552],[-.437,39.497],[-.434,39.442],[-.432,39.387],[-.429,39.332],[-.426,39.278],[-.421,39.223],[-.413,39.169],[-.402,39.115],[-.387,39.062],[-.368,39.011],[-.343,38.962],[-.313,38.916],[-.276,38.875],[-.234,38.84],[-.186,38.813],[-.134,38.797],[-.08,38.79]],[[.89,40.017],[.835,40.011],[.781,40.006],[.726,40.005],[.671,40.006],[.616,40.011],[.562,40.02],[.509,40.033],[.457,40.051],[.407,40.073],[.359,40.1],[.313,40.13],[.271,40.165],[.23,40.202],[.193,40.242],[.158,40.285],[.127,40.329],[.097,40.376],[.071,40.424],[.046,40.473],[.024,40.523],[.004,40.574],[-.014,40.626],[-.03,40.678],[-.044,40.731],[-.056,40.785],[-.065,40.839],[-.073,40.893],[-.077,40.948],[-.079,41.003],[-.079,41.058],[-.076,41.112],[-.071,41.167],[-.064,41.221],[-.054,41.275],[-.041,41.329],[-.023,41.381],[-.002,41.431],[.024,41.479],[.055,41.525],[.09,41.567],[.129,41.605],[.171,41.641],[.215,41.673],[.261,41.703],[.309,41.73],[.358,41.754],[.409,41.775],[.46,41.794],[.513,41.81],[.566,41.823],[.62,41.834],[.674,41.843],[.728,41.85],[.783,41.855],[.838,41.858],[.893,41.86],[.947,41.861],[1.002,41.861],[1.057,41.859],[1.112,41.856],[1.167,41.852],[1.221,41.846],[1.275,41.839],[1.33,41.83],[1.383,41.819],[1.437,41.806],[1.489,41.792],[1.542,41.774],[1.593,41.755],[1.643,41.734],[1.693,41.71],[1.741,41.684],[1.788,41.656],[1.834,41.625],[1.878,41.592],[1.92,41.558],[1.961,41.521],[2,41.483],[2.038,41.443],[2.074,41.401],[2.108,41.359],[2.141,41.315],[2.172,41.27],[2.202,41.224],[2.231,41.177],[2.258,41.129],[2.283,41.08],[2.306,41.03],[2.326,40.979],[2.343,40.927],[2.355,40.874],[2.363,40.82],[2.364,40.765],[2.358,40.71],[2.345,40.657],[2.325,40.606],[2.298,40.558],[2.265,40.514],[2.228,40.475],[2.186,40.439],[2.142,40.407],[2.095,40.378],[2.047,40.352],[1.997,40.329],[1.946,40.308],[1.895,40.288],[1.843,40.27],[1.791,40.253],[1.739,40.237],[1.686,40.221],[1.633,40.206],[1.581,40.191],[1.528,40.176],[1.475,40.16],[1.423,40.145],[1.37,40.13],[1.317,40.115],[1.264,40.101],[1.211,40.086],[1.158,40.073],[1.105,40.06],[1.051,40.047],[.998,40.036],[.944,40.026]],[[-6.465,38.7],[-6.41,38.708],[-6.356,38.717],[-6.302,38.726],[-6.248,38.736],[-6.193,38.746],[-6.139,38.757],[-6.086,38.768],[-6.032,38.781],[-5.979,38.795],[-5.926,38.81],[-5.873,38.827],[-5.821,38.846],[-5.77,38.865],[-5.719,38.886],[-5.668,38.908],[-5.618,38.93],[-5.568,38.952],[-5.517,38.973],[-5.465,38.992],[-5.412,39.008],[-5.358,39.019],[-5.304,39.024],[-5.249,39.022],[-5.194,39.013],[-5.141,38.999],[-5.089,38.981],[-5.038,38.96],[-4.988,38.938],[-4.938,38.915],[-4.888,38.892],[-4.837,38.87],[-4.786,38.849],[-4.734,38.831],[-4.682,38.814],[-4.628,38.8],[-4.574,38.789],[-4.52,38.781],[-4.465,38.776],[-4.41,38.774],[-4.355,38.776],[-4.3,38.781],[-4.246,38.789],[-4.192,38.801],[-4.139,38.817],[-4.088,38.836],[-4.038,38.859],[-3.99,38.885],[-3.944,38.916],[-3.9,38.95],[-3.86,38.988],[-3.823,39.028],[-3.789,39.071],[-3.758,39.117],[-3.729,39.164],[-3.703,39.212],[-3.679,39.262],[-3.656,39.312],[-3.635,39.363],[-3.615,39.414],[-3.597,39.466],[-3.58,39.519],[-3.564,39.571],[-3.55,39.625],[-3.538,39.678],[-3.527,39.732],[-3.518,39.787],[-3.51,39.841],[-3.502,39.896],[-3.496,39.95],[-3.49,40.005],[-3.484,40.06],[-3.479,40.115],[-3.475,40.17],[-3.472,40.225],[-3.469,40.28],[-3.469,40.335],[-3.47,40.39],[-3.472,40.445],[-3.476,40.5],[-3.481,40.554],[-3.488,40.609],[-3.495,40.664],[-3.503,40.718],[-3.512,40.773],[-3.522,40.827],[-3.532,40.881],[-3.544,40.935],[-3.556,40.988],[-3.57,41.042],[-3.585,41.095],[-3.602,41.147],[-3.622,41.199],[-3.643,41.249],[-3.667,41.299],[-3.694,41.347],[-3.724,41.393],[-3.757,41.437],[-3.793,41.479],[-3.832,41.518],[-3.873,41.555],[-3.916,41.589],[-3.961,41.621],[-4.007,41.65],[-4.055,41.678],[-4.103,41.704],[-4.153,41.728],[-4.203,41.751],[-4.254,41.772],[-4.305,41.791],[-4.358,41.808],[-4.411,41.824],[-4.464,41.838],[-4.517,41.851],[-4.571,41.862],[-4.625,41.873],[-4.679,41.883],[-4.734,41.892],[-4.788,41.901],[-4.842,41.909],[-4.897,41.917],[-4.952,41.924],[-5.006,41.93],[-5.061,41.935],[-5.116,41.939],[-5.171,41.942],[-5.226,41.944],[-5.281,41.946],[-5.336,41.948],[-5.391,41.948],[-5.446,41.949],[-5.501,41.95],[-5.556,41.95],[-5.612,41.951],[-5.667,41.952],[-5.722,41.953],[-5.777,41.954],[-5.832,41.956],[-5.887,41.959],[-5.942,41.963],[-5.997,41.967],[-6.051,41.972],[-6.106,41.978],[-6.161,41.984],[-6.216,41.991],[-6.27,41.998],[-6.325,42.004],[-6.38,42.01],[-6.434,42.015],[-6.489,42.02],[-6.544,42.024],[-6.599,42.028],[-6.654,42.031],[-6.709,42.035],[-6.764,42.038],[-6.819,42.042],[-6.874,42.046],[-6.929,42.051],[-6.984,42.057],[-7.038,42.063],[-7.093,42.07],[-7.148,42.077],[-7.202,42.084],[-7.257,42.091],[-7.311,42.098],[-7.366,42.105],[-7.421,42.111],[-7.476,42.117],[-7.53,42.124],[-7.585,42.131],[-7.639,42.138],[-7.694,42.145],[-7.749,42.153],[-7.803,42.161],[-7.857,42.17],[-7.912,42.179],[-7.966,42.188],[-8.02,42.197],[-8.075,42.206],[-8.129,42.216],[-8.183,42.226],[-8.237,42.236],[-8.291,42.247],[-8.345,42.257],[-8.399,42.268],[-8.453,42.278],[-8.508,42.286],[-8.563,42.292],[-8.618,42.295],[-8.673,42.293],[-8.727,42.283],[-8.778,42.263],[-8.822,42.23],[-8.857,42.188],[-8.882,42.139],[-8.899,42.086],[-8.911,42.033],[-8.919,41.978],[-8.924,41.923],[-8.928,41.868],[-8.93,41.813],[-8.931,41.758],[-8.932,41.703],[-8.933,41.648],[-8.933,41.593],[-8.933,41.538],[-8.933,41.483],[-8.933,41.428],[-8.933,41.373],[-8.932,41.318],[-8.932,41.263],[-8.93,41.208],[-8.929,41.153],[-8.927,41.098],[-8.924,41.043],[-8.92,40.988],[-8.916,40.933],[-8.91,40.878],[-8.904,40.823],[-8.897,40.769],[-8.889,40.714],[-8.881,40.66],[-8.872,40.605],[-8.863,40.551],[-8.854,40.497],[-8.843,40.443],[-8.833,40.389],[-8.821,40.335],[-8.809,40.281],[-8.795,40.228],[-8.78,40.175],[-8.763,40.122],[-8.746,40.07],[-8.726,40.019],[-8.706,39.968],[-8.684,39.917],[-8.66,39.867],[-8.636,39.818],[-8.61,39.769],[-8.583,39.721],[-8.555,39.674],[-8.526,39.627],[-8.496,39.581],[-8.465,39.535],[-8.434,39.49],[-8.401,39.446],[-8.367,39.402],[-8.332,39.36],[-8.297,39.318],[-8.26,39.276],[-8.223,39.236],[-8.184,39.196],[-8.145,39.158],[-8.105,39.12],[-8.064,39.083],[-8.022,39.047],[-7.979,39.013],[-7.935,38.98],[-7.89,38.948],[-7.845,38.917],[-7.798,38.888],[-7.75,38.861],[-7.702,38.835],[-7.653,38.81],[-7.602,38.787],[-7.552,38.766],[-7.5,38.746],[-7.448,38.729],[-7.395,38.713],[-7.342,38.7],[-7.288,38.69],[-7.233,38.681],[-7.178,38.674],[-7.124,38.669],[-7.069,38.666],[-7.014,38.664],[-6.959,38.663],[-6.904,38.663],[-6.848,38.664],[-6.793,38.666],[-6.738,38.67],[-6.684,38.674],[-6.629,38.679],[-6.574,38.685],[-6.519,38.692]],[[-6.683,39.459],[-6.738,39.454],[-6.793,39.453],[-6.848,39.453],[-6.903,39.456],[-6.958,39.461],[-7.012,39.467],[-7.067,39.474],[-7.121,39.483],[-7.175,39.494],[-7.228,39.506],[-7.281,39.521],[-7.333,39.539],[-7.384,39.56],[-7.433,39.585],[-7.48,39.613],[-7.525,39.645],[-7.567,39.68],[-7.608,39.717],[-7.646,39.756],[-7.682,39.798],[-7.716,39.841],[-7.747,39.886],[-7.777,39.932],[-7.805,39.979],[-7.831,40.028],[-7.856,40.077],[-7.879,40.126],[-7.901,40.177],[-7.921,40.228],[-7.94,40.279],[-7.958,40.331],[-7.975,40.384],[-7.992,40.436],[-8.007,40.489],[-8.022,40.542],[-8.036,40.595],[-8.05,40.648],[-8.063,40.701],[-8.076,40.755],[-8.088,40.808],[-8.098,40.862],[-8.107,40.916],[-8.113,40.971],[-8.116,41.026],[-8.114,41.081],[-8.104,41.135],[-8.084,41.186],[-8.052,41.23],[-8.009,41.264],[-7.959,41.286],[-7.905,41.299],[-7.851,41.305],[-7.796,41.307],[-7.741,41.306],[-7.686,41.303],[-7.631,41.299],[-7.577,41.294],[-7.522,41.288],[-7.467,41.283],[-7.413,41.277],[-7.358,41.27],[-7.304,41.263],[-7.249,41.256],[-7.195,41.248],[-7.141,41.24],[-7.086,41.233],[-7.032,41.225],[-6.977,41.217],[-6.923,41.21],[-6.869,41.202],[-6.814,41.194],[-6.76,41.186],[-6.706,41.178],[-6.651,41.169],[-6.597,41.159],[-6.543,41.149],[-6.49,41.137],[-6.436,41.125],[-6.383,41.11],[-6.331,41.092],[-6.281,41.071],[-6.232,41.045],[-6.187,41.015],[-6.145,40.979],[-6.109,40.938],[-6.078,40.893],[-6.052,40.844],[-6.031,40.793],[-6.015,40.741],[-6.002,40.687],[-5.993,40.633],[-5.986,40.579],[-5.982,40.524],[-5.98,40.469],[-5.979,40.414],[-5.98,40.359],[-5.983,40.304],[-5.987,40.25],[-5.994,40.195],[-6.003,40.141],[-6.014,40.087],[-6.027,40.034],[-6.043,39.981],[-6.062,39.93],[-6.084,39.88],[-6.109,39.831],[-6.137,39.783],[-6.168,39.738],[-6.203,39.695],[-6.24,39.655],[-6.281,39.618],[-6.325,39.585],[-6.371,39.556],[-6.42,39.53],[-6.47,39.509],[-6.522,39.491],[-6.575,39.477],[-6.629,39.466]],[[-4.412,39.839],[-4.466,39.83],[-4.52,39.832],[-4.574,39.843],[-4.625,39.861],[-4.675,39.885],[-4.722,39.912],[-4.768,39.942],[-4.811,39.975],[-4.853,40.01],[-4.893,40.047],[-4.932,40.086],[-4.969,40.126],[-5.005,40.167],[-5.039,40.21],[-5.072,40.254],[-5.104,40.298],[-5.135,40.343],[-5.164,40.389],[-5.193,40.436],[-5.221,40.483],[-5.247,40.531],[-5.272,40.579],[-5.296,40.629],[-5.317,40.679],[-5.336,40.73],[-5.351,40.783],[-5.36,40.837],[-5.36,40.891],[-5.349,40.945],[-5.323,40.993],[-5.284,41.031],[-5.237,41.059],[-5.186,41.078],[-5.133,41.091],[-5.079,41.098],[-5.024,41.1],[-4.97,41.099],[-4.915,41.095],[-4.861,41.087],[-4.807,41.077],[-4.754,41.063],[-4.702,41.047],[-4.651,41.027],[-4.602,41.004],[-4.553,40.978],[-4.507,40.949],[-4.463,40.917],[-4.422,40.881],[-4.383,40.842],[-4.347,40.801],[-4.315,40.757],[-4.286,40.711],[-4.26,40.663],[-4.238,40.612],[-4.22,40.561],[-4.205,40.508],[-4.194,40.455],[-4.186,40.401],[-4.181,40.346],[-4.179,40.292],[-4.18,40.237],[-4.185,40.183],[-4.193,40.129],[-4.206,40.075],[-4.224,40.024],[-4.248,39.975],[-4.278,39.929],[-4.316,39.89],[-4.361,39.859]],[[12.078,38.305],[12.112,38.348],[12.135,38.397],[12.148,38.451],[12.152,38.505],[12.147,38.56],[12.135,38.614],[12.118,38.666],[12.095,38.716],[12.069,38.764],[12.04,38.81],[12.007,38.855],[11.972,38.897],[11.935,38.937],[11.895,38.975],[11.854,39.012],[11.811,39.046],[11.767,39.078],[11.721,39.109],[11.674,39.137],[11.627,39.164],[11.578,39.19],[11.529,39.214],[11.479,39.237],[11.428,39.258],[11.378,39.28],[11.327,39.3],[11.276,39.321],[11.225,39.342],[11.174,39.363],[11.124,39.385],[11.073,39.407],[11.023,39.429],[10.974,39.452],[10.924,39.476],[10.875,39.5],[10.826,39.525],[10.777,39.549],[10.728,39.575],[10.679,39.6],[10.631,39.626],[10.582,39.652],[10.534,39.678],[10.486,39.704],[10.437,39.73],[10.389,39.757],[10.341,39.783],[10.293,39.809],[10.244,39.835],[10.196,39.861],[10.148,39.888],[10.1,39.914],[10.052,39.941],[10.004,39.968],[9.956,39.995],[9.908,40.022],[9.86,40.048],[9.812,40.075],[9.764,40.101],[9.715,40.126],[9.666,40.151],[9.617,40.175],[9.567,40.198],[9.516,40.22],[9.466,40.241],[9.415,40.262],[9.364,40.282],[9.313,40.302],[9.262,40.322],[9.21,40.342],[9.159,40.362],[9.108,40.381],[9.057,40.401],[9.005,40.421],[8.954,40.44],[8.902,40.459],[8.851,40.478],[8.799,40.496],[8.747,40.514],[8.695,40.532],[8.643,40.55],[8.591,40.567],[8.539,40.584],[8.487,40.601],[8.434,40.618],[8.382,40.634],[8.33,40.65],[8.277,40.666],[8.224,40.682],[8.171,40.697],[8.119,40.712],[8.066,40.727],[8.013,40.742],[7.96,40.756],[7.907,40.771],[7.854,40.785],[7.801,40.798],[7.747,40.81],[7.693,40.82],[7.639,40.829],[7.584,40.834],[7.529,40.836],[7.474,40.833],[7.42,40.824],[7.367,40.809],[7.317,40.787],[7.271,40.758],[7.229,40.722],[7.191,40.682],[7.158,40.639],[7.128,40.593],[7.101,40.545],[7.076,40.496],[7.053,40.446],[7.031,40.396],[7.009,40.345],[6.988,40.295],[6.967,40.244],[6.947,40.193],[6.926,40.142],[6.906,40.091],[6.885,40.04],[6.865,39.989],[6.844,39.938],[6.824,39.887],[6.803,39.836],[6.783,39.785],[6.762,39.734],[6.742,39.683],[6.721,39.633],[6.7,39.582],[6.679,39.531],[6.659,39.48],[6.638,39.429],[6.617,39.378],[6.597,39.327],[6.578,39.276],[6.56,39.224],[6.543,39.172],[6.529,39.119],[6.518,39.065],[6.509,39.011],[6.505,38.956],[6.504,38.901],[6.507,38.846],[6.514,38.792],[6.526,38.738],[6.542,38.686],[6.562,38.634],[6.586,38.585],[6.613,38.538],[6.644,38.492],[6.679,38.45],[6.717,38.411],[6.76,38.376],[6.807,38.348],[6.86,38.332],[6.914,38.334],[6.964,38.357],[7.006,38.392],[7.041,38.434],[7.072,38.48],[7.1,38.527],[7.127,38.575],[7.153,38.623],[7.178,38.672],[7.203,38.721],[7.229,38.769],[7.254,38.818],[7.278,38.867],[7.303,38.916],[7.326,38.966],[7.35,39.016],[7.372,39.066],[7.394,39.116],[7.416,39.166],[7.438,39.217],[7.46,39.267],[7.483,39.317],[7.506,39.367],[7.53,39.416],[7.556,39.465],[7.582,39.513],[7.611,39.56],[7.641,39.605],[7.675,39.649],[7.713,39.689],[7.754,39.724],[7.801,39.754],[7.851,39.775],[7.904,39.789],[7.959,39.794],[8.014,39.793],[8.068,39.787],[8.122,39.777],[8.176,39.765],[8.229,39.751],[8.282,39.735],[8.334,39.719],[8.386,39.702],[8.439,39.685],[8.491,39.668],[8.543,39.65],[8.595,39.633],[8.647,39.615],[8.698,39.597],[8.75,39.578],[8.802,39.56],[8.853,39.541],[8.905,39.521],[8.956,39.502],[9.007,39.482],[9.058,39.462],[9.11,39.442],[9.161,39.422],[9.212,39.401],[9.263,39.381],[9.314,39.361],[9.365,39.34],[9.416,39.32],[9.466,39.299],[9.517,39.279],[9.568,39.258],[9.619,39.237],[9.67,39.216],[9.721,39.195],[9.771,39.174],[9.822,39.152],[9.872,39.131],[9.923,39.109],[9.973,39.087],[10.023,39.065],[10.074,39.043],[10.124,39.022],[10.175,39],[10.225,38.979],[10.276,38.957],[10.326,38.935],[10.376,38.913],[10.427,38.891],[10.476,38.868],[10.526,38.844],[10.576,38.821],[10.625,38.797],[10.675,38.773],[10.724,38.749],[10.773,38.724],[10.822,38.7],[10.871,38.675],[10.921,38.651],[10.97,38.626],[11.019,38.602],[11.068,38.577],[11.117,38.553],[11.166,38.528],[11.215,38.504],[11.264,38.479],[11.314,38.455],[11.363,38.43],[11.412,38.406],[11.462,38.382],[11.511,38.359],[11.561,38.336],[11.611,38.314],[11.662,38.293],[11.714,38.275],[11.767,38.259],[11.82,38.247],[11.875,38.24],[11.93,38.241],[11.983,38.251],[12.034,38.272]],[[4.323,35.766],[4.369,35.795],[4.41,35.833],[4.444,35.876],[4.473,35.923],[4.498,35.972],[4.519,36.023],[4.537,36.075],[4.552,36.128],[4.565,36.182],[4.576,36.236],[4.584,36.29],[4.59,36.345],[4.594,36.4],[4.596,36.455],[4.594,36.51],[4.591,36.565],[4.584,36.62],[4.575,36.674],[4.564,36.728],[4.551,36.781],[4.536,36.834],[4.519,36.887],[4.5,36.939],[4.48,36.99],[4.458,37.041],[4.435,37.091],[4.411,37.14],[4.385,37.189],[4.358,37.236],[4.328,37.283],[4.297,37.329],[4.264,37.373],[4.229,37.415],[4.192,37.456],[4.153,37.495],[4.113,37.532],[4.07,37.568],[4.027,37.601],[3.982,37.633],[3.936,37.664],[3.889,37.693],[3.842,37.721],[3.793,37.747],[3.745,37.773],[3.696,37.799],[3.647,37.824],[3.598,37.849],[3.55,37.876],[3.502,37.904],[3.456,37.934],[3.412,37.966],[3.37,38.002],[3.331,38.041],[3.295,38.083],[3.264,38.128],[3.235,38.176],[3.21,38.225],[3.188,38.275],[3.167,38.326],[3.147,38.377],[3.127,38.429],[3.106,38.48],[3.084,38.53],[3.061,38.58],[3.035,38.629],[3.006,38.676],[2.974,38.72],[2.938,38.762],[2.897,38.799],[2.85,38.827],[2.797,38.842],[2.743,38.836],[2.696,38.808],[2.658,38.768],[2.629,38.721],[2.604,38.672],[2.583,38.621],[2.562,38.57],[2.541,38.519],[2.518,38.469],[2.492,38.421],[2.462,38.374],[2.427,38.332],[2.386,38.294],[2.341,38.264],[2.291,38.24],[2.238,38.224],[2.184,38.215],[2.129,38.211],[2.074,38.211],[2.019,38.214],[1.964,38.219],[1.909,38.225],[1.855,38.233],[1.8,38.241],[1.746,38.249],[1.691,38.258],[1.637,38.266],[1.582,38.275],[1.528,38.283],[1.473,38.291],[1.419,38.298],[1.364,38.305],[1.309,38.311],[1.255,38.317],[1.2,38.323],[1.145,38.328],[1.09,38.333],[1.035,38.338],[.98,38.344],[.926,38.35],[.871,38.357],[.816,38.364],[.762,38.37],[.707,38.377],[.652,38.382],[.597,38.387],[.542,38.39],[.487,38.391],[.432,38.39],[.377,38.387],[.322,38.38],[.268,38.368],[.216,38.351],[.166,38.328],[.122,38.296],[.084,38.255],[.058,38.207],[.043,38.154],[.04,38.099],[.047,38.045],[.062,37.992],[.085,37.941],[.113,37.894],[.146,37.85],[.184,37.81],[.226,37.774],[.27,37.742],[.318,37.713],[.367,37.689],[.418,37.667],[.47,37.649],[.522,37.633],[.576,37.62],[.63,37.608],[.684,37.598],[.738,37.589],[.793,37.58],[.847,37.572],[.901,37.563],[.956,37.555],[1.01,37.547],[1.065,37.538],[1.119,37.529],[1.174,37.52],[1.228,37.511],[1.282,37.503],[1.337,37.494],[1.391,37.485],[1.445,37.475],[1.5,37.466],[1.554,37.457],[1.608,37.447],[1.662,37.436],[1.716,37.426],[1.77,37.414],[1.824,37.4],[1.876,37.384],[1.928,37.366],[1.979,37.344],[2.027,37.317],[2.072,37.285],[2.113,37.248],[2.148,37.206],[2.178,37.16],[2.202,37.11],[2.221,37.059],[2.236,37.006],[2.248,36.952],[2.258,36.898],[2.268,36.843],[2.277,36.789],[2.287,36.735],[2.299,36.681],[2.312,36.628],[2.329,36.575],[2.349,36.524],[2.372,36.474],[2.4,36.426],[2.431,36.381],[2.467,36.339],[2.507,36.302],[2.553,36.271],[2.604,36.25],[2.658,36.244],[2.712,36.257],[2.758,36.286],[2.797,36.325],[2.829,36.37],[2.857,36.417],[2.881,36.467],[2.903,36.517],[2.924,36.568],[2.944,36.62],[2.964,36.671],[2.985,36.722],[3.007,36.773],[3.03,36.822],[3.056,36.871],[3.086,36.917],[3.12,36.961],[3.159,36.999],[3.204,37.03],[3.255,37.051],[3.31,37.06],[3.365,37.058],[3.419,37.048],[3.471,37.031],[3.521,37.008],[3.57,36.982],[3.616,36.953],[3.661,36.92],[3.703,36.885],[3.744,36.847],[3.781,36.807],[3.815,36.764],[3.845,36.718],[3.871,36.669],[3.891,36.618],[3.905,36.564],[3.913,36.51],[3.916,36.455],[3.916,36.4],[3.915,36.345],[3.914,36.29],[3.914,36.235],[3.918,36.18],[3.927,36.125],[3.94,36.072],[3.958,36.02],[3.981,35.97],[4.008,35.922],[4.04,35.876],[4.076,35.835],[4.117,35.798],[4.163,35.769],[4.215,35.752],[4.27,35.75]],[[-4.618,34.935],[-4.581,34.976],[-4.553,35.023],[-4.533,35.074],[-4.519,35.127],[-4.508,35.181],[-4.501,35.236],[-4.496,35.29],[-4.493,35.345],[-4.491,35.4],[-4.489,35.455],[-4.488,35.51],[-4.488,35.565],[-4.487,35.62],[-4.487,35.675],[-4.486,35.73],[-4.485,35.785],[-4.484,35.84],[-4.483,35.895],[-4.48,35.95],[-4.477,36.005],[-4.472,36.059],[-4.467,36.114],[-4.459,36.169],[-4.451,36.223],[-4.44,36.277],[-4.429,36.331],[-4.417,36.384],[-4.404,36.438],[-4.391,36.491],[-4.379,36.545],[-4.368,36.599],[-4.359,36.653],[-4.351,36.707],[-4.346,36.762],[-4.343,36.817],[-4.343,36.872],[-4.345,36.927],[-4.351,36.981],[-4.36,37.036],[-4.374,37.089],[-4.392,37.141],[-4.415,37.191],[-4.443,37.238],[-4.477,37.281],[-4.515,37.321],[-4.557,37.356],[-4.603,37.387],[-4.651,37.413],[-4.701,37.436],[-4.752,37.456],[-4.805,37.473],[-4.857,37.487],[-4.911,37.5],[-4.965,37.512],[-5.018,37.524],[-5.072,37.535],[-5.126,37.547],[-5.179,37.559],[-5.233,37.571],[-5.286,37.584],[-5.34,37.598],[-5.393,37.612],[-5.446,37.627],[-5.499,37.642],[-5.551,37.657],[-5.604,37.673],[-5.656,37.69],[-5.709,37.706],[-5.761,37.723],[-5.813,37.74],[-5.866,37.757],[-5.918,37.774],[-5.97,37.791],[-6.023,37.808],[-6.075,37.825],[-6.127,37.841],[-6.18,37.857],[-6.233,37.873],[-6.285,37.89],[-6.338,37.906],[-6.39,37.922],[-6.443,37.938],[-6.495,37.954],[-6.548,37.97],[-6.6,37.987],[-6.653,38.003],[-6.706,38.018],[-6.758,38.034],[-6.811,38.048],[-6.865,38.062],[-6.918,38.076],[-6.971,38.089],[-7.025,38.102],[-7.078,38.115],[-7.132,38.127],[-7.185,38.14],[-7.238,38.154],[-7.292,38.167],[-7.345,38.181],[-7.398,38.196],[-7.451,38.211],[-7.503,38.226],[-7.556,38.242],[-7.609,38.258],[-7.661,38.274],[-7.714,38.291],[-7.766,38.307],[-7.819,38.323],[-7.871,38.339],[-7.924,38.354],[-7.977,38.369],[-8.03,38.384],[-8.083,38.397],[-8.137,38.41],[-8.191,38.422],[-8.245,38.432],[-8.299,38.441],[-8.353,38.447],[-8.408,38.45],[-8.463,38.45],[-8.518,38.446],[-8.572,38.435],[-8.624,38.418],[-8.674,38.394],[-8.719,38.363],[-8.759,38.325],[-8.793,38.283],[-8.824,38.237],[-8.85,38.189],[-8.873,38.139],[-8.894,38.088],[-8.913,38.036],[-8.931,37.984],[-8.947,37.932],[-8.962,37.879],[-8.976,37.826],[-8.989,37.772],[-9.001,37.719],[-9.012,37.665],[-9.022,37.611],[-9.032,37.557],[-9.042,37.503],[-9.051,37.448],[-9.06,37.394],[-9.069,37.34],[-9.078,37.286],[-9.087,37.231],[-9.096,37.177],[-9.105,37.123],[-9.116,37.069],[-9.127,37.015],[-9.138,36.962],[-9.15,36.908],[-9.162,36.854],[-9.174,36.8],[-9.184,36.746],[-9.191,36.692],[-9.195,36.637],[-9.194,36.582],[-9.188,36.528],[-9.176,36.474],[-9.158,36.422],[-9.133,36.373],[-9.103,36.328],[-9.066,36.286],[-9.024,36.251],[-8.977,36.223],[-8.926,36.204],[-8.871,36.196],[-8.817,36.2],[-8.764,36.215],[-8.716,36.242],[-8.674,36.277],[-8.638,36.319],[-8.607,36.364],[-8.58,36.412],[-8.557,36.462],[-8.537,36.513],[-8.52,36.565],[-8.504,36.618],[-8.489,36.671],[-8.475,36.724],[-8.46,36.777],[-8.446,36.83],[-8.431,36.883],[-8.414,36.935],[-8.395,36.987],[-8.373,37.037],[-8.347,37.086],[-8.316,37.131],[-8.28,37.172],[-8.238,37.208],[-8.191,37.236],[-8.14,37.258],[-8.087,37.271],[-8.033,37.279],[-7.978,37.281],[-7.923,37.28],[-7.868,37.276],[-7.813,37.27],[-7.759,37.263],[-7.705,37.255],[-7.65,37.245],[-7.596,37.235],[-7.543,37.224],[-7.489,37.211],[-7.436,37.196],[-7.384,37.179],[-7.333,37.158],[-7.284,37.133],[-7.239,37.102],[-7.199,37.064],[-7.167,37.02],[-7.144,36.97],[-7.131,36.916],[-7.124,36.862],[-7.123,36.807],[-7.124,36.752],[-7.128,36.697],[-7.132,36.642],[-7.136,36.587],[-7.139,36.532],[-7.14,36.478],[-7.141,36.423],[-7.139,36.368],[-7.135,36.313],[-7.129,36.258],[-7.122,36.204],[-7.112,36.15],[-7.101,36.096],[-7.087,36.043],[-7.071,35.99],[-7.052,35.938],[-7.029,35.889],[-7.001,35.841],[-6.968,35.797],[-6.928,35.76],[-6.881,35.731],[-6.829,35.715],[-6.774,35.712],[-6.72,35.721],[-6.669,35.742],[-6.623,35.771],[-6.581,35.807],[-6.545,35.848],[-6.513,35.893],[-6.487,35.941],[-6.464,35.992],[-6.446,36.043],[-6.43,36.096],[-6.418,36.15],[-6.407,36.204],[-6.399,36.258],[-6.392,36.312],[-6.385,36.367],[-6.379,36.422],[-6.372,36.476],[-6.363,36.53],[-6.352,36.584],[-6.337,36.637],[-6.317,36.688],[-6.29,36.736],[-6.255,36.779],[-6.213,36.814],[-6.165,36.839],[-6.112,36.856],[-6.058,36.865],[-6.003,36.868],[-5.948,36.866],[-5.894,36.861],[-5.839,36.854],[-5.785,36.843],[-5.732,36.83],[-5.679,36.815],[-5.628,36.796],[-5.578,36.772],[-5.531,36.744],[-5.487,36.711],[-5.448,36.673],[-5.413,36.63],[-5.384,36.583],[-5.36,36.534],[-5.341,36.482],[-5.325,36.429],[-5.313,36.376],[-5.303,36.322],[-5.295,36.267],[-5.289,36.213],[-5.283,36.158],[-5.278,36.103],[-5.274,36.049],[-5.269,35.994],[-5.264,35.939],[-5.259,35.884],[-5.254,35.83],[-5.249,35.775],[-5.245,35.72],[-5.24,35.665],[-5.235,35.611],[-5.229,35.556],[-5.223,35.501],[-5.216,35.447],[-5.207,35.392],[-5.196,35.339],[-5.182,35.286],[-5.164,35.233],[-5.143,35.183],[-5.117,35.134],[-5.087,35.088],[-5.052,35.046],[-5.014,35.006],[-4.972,34.971],[-4.926,34.94],[-4.877,34.915],[-4.826,34.897],[-4.772,34.888],[-4.717,34.89],[-4.664,34.906]],[[9.732,35.055],[9.78,35.082],[9.825,35.112],[9.869,35.146],[9.911,35.181],[9.951,35.219],[9.989,35.258],[10.026,35.299],[10.062,35.341],[10.097,35.383],[10.131,35.426],[10.164,35.469],[10.197,35.514],[10.229,35.559],[10.259,35.604],[10.287,35.651],[10.314,35.699],[10.339,35.748],[10.361,35.798],[10.381,35.85],[10.398,35.902],[10.414,35.954],[10.428,36.007],[10.44,36.061],[10.45,36.115],[10.459,36.169],[10.466,36.224],[10.472,36.278],[10.476,36.333],[10.478,36.388],[10.478,36.443],[10.476,36.498],[10.472,36.552],[10.466,36.607],[10.458,36.661],[10.447,36.715],[10.435,36.769],[10.421,36.822],[10.405,36.874],[10.387,36.926],[10.368,36.978],[10.347,37.028],[10.325,37.079],[10.301,37.128],[10.276,37.177],[10.251,37.226],[10.224,37.273],[10.195,37.321],[10.166,37.367],[10.136,37.413],[10.105,37.458],[10.073,37.503],[10.04,37.547],[10.006,37.59],[9.971,37.632],[9.935,37.673],[9.897,37.714],[9.859,37.753],[9.819,37.791],[9.779,37.828],[9.737,37.864],[9.694,37.898],[9.651,37.931],[9.606,37.963],[9.56,37.993],[9.513,38.022],[9.466,38.05],[9.418,38.077],[9.37,38.103],[9.321,38.128],[9.272,38.153],[9.222,38.176],[9.172,38.198],[9.121,38.219],[9.07,38.239],[9.019,38.258],[8.966,38.276],[8.914,38.292],[8.861,38.306],[8.808,38.319],[8.754,38.331],[8.7,38.342],[8.646,38.351],[8.592,38.359],[8.537,38.366],[8.482,38.37],[8.428,38.372],[8.373,38.372],[8.318,38.37],[8.263,38.366],[8.208,38.36],[8.154,38.353],[8.1,38.344],[8.046,38.335],[7.992,38.324],[7.938,38.312],[7.885,38.3],[7.831,38.287],[7.778,38.273],[7.726,38.258],[7.673,38.241],[7.621,38.224],[7.569,38.205],[7.518,38.185],[7.468,38.163],[7.418,38.14],[7.37,38.114],[7.322,38.087],[7.276,38.057],[7.231,38.026],[7.187,37.993],[7.145,37.958],[7.103,37.922],[7.062,37.885],[7.023,37.847],[6.984,37.808],[6.946,37.768],[6.909,37.728],[6.873,37.686],[6.838,37.644],[6.805,37.601],[6.772,37.556],[6.741,37.511],[6.711,37.465],[6.683,37.418],[6.656,37.37],[6.63,37.321],[6.606,37.272],[6.584,37.222],[6.563,37.171],[6.544,37.12],[6.526,37.068],[6.51,37.015],[6.496,36.962],[6.484,36.909],[6.473,36.855],[6.463,36.801],[6.455,36.747],[6.448,36.692],[6.442,36.637],[6.438,36.583],[6.436,36.528],[6.436,36.473],[6.439,36.418],[6.443,36.363],[6.45,36.309],[6.459,36.255],[6.47,36.201],[6.482,36.147],[6.495,36.094],[6.51,36.041],[6.526,35.989],[6.544,35.937],[6.562,35.885],[6.582,35.834],[6.603,35.783],[6.626,35.733],[6.651,35.684],[6.678,35.636],[6.707,35.59],[6.739,35.545],[6.774,35.503],[6.813,35.464],[6.856,35.43],[6.903,35.402],[6.955,35.383],[7.009,35.379],[7.061,35.395],[7.101,35.432],[7.126,35.481],[7.138,35.534],[7.142,35.589],[7.14,35.644],[7.136,35.699],[7.129,35.753],[7.122,35.808],[7.113,35.862],[7.105,35.916],[7.097,35.97],[7.09,36.025],[7.084,36.079],[7.079,36.134],[7.077,36.189],[7.076,36.244],[7.077,36.299],[7.081,36.354],[7.086,36.408],[7.092,36.463],[7.1,36.517],[7.109,36.571],[7.118,36.625],[7.129,36.679],[7.142,36.733],[7.156,36.786],[7.172,36.838],[7.191,36.89],[7.212,36.94],[7.236,36.99],[7.263,37.038],[7.292,37.085],[7.323,37.13],[7.356,37.173],[7.391,37.216],[7.427,37.257],[7.465,37.297],[7.504,37.336],[7.544,37.373],[7.585,37.41],[7.627,37.445],[7.67,37.479],[7.714,37.512],[7.76,37.542],[7.806,37.571],[7.855,37.597],[7.904,37.621],[7.955,37.642],[8.007,37.658],[8.061,37.67],[8.116,37.676],[8.17,37.675],[8.225,37.666],[8.277,37.649],[8.325,37.623],[8.367,37.588],[8.404,37.547],[8.434,37.501],[8.457,37.452],[8.476,37.4],[8.489,37.347],[8.499,37.293],[8.507,37.239],[8.512,37.184],[8.515,37.129],[8.518,37.074],[8.519,37.019],[8.52,36.964],[8.521,36.91],[8.521,36.855],[8.521,36.8],[8.522,36.745],[8.522,36.69],[8.522,36.635],[8.522,36.58],[8.522,36.525],[8.522,36.47],[8.522,36.415],[8.522,36.36],[8.522,36.306],[8.522,36.251],[8.522,36.196],[8.522,36.141],[8.522,36.086],[8.523,36.031],[8.523,35.976],[8.524,35.921],[8.526,35.866],[8.528,35.811],[8.532,35.757],[8.537,35.702],[8.544,35.648],[8.554,35.593],[8.566,35.54],[8.583,35.488],[8.603,35.436],[8.627,35.387],[8.655,35.34],[8.686,35.295],[8.722,35.253],[8.76,35.214],[8.801,35.177],[8.845,35.144],[8.89,35.114],[8.938,35.086],[8.987,35.062],[9.038,35.041],[9.09,35.023],[9.143,35.008],[9.196,34.996],[9.25,34.987],[9.305,34.98],[9.36,34.977],[9.415,34.977],[9.469,34.98],[9.524,34.987],[9.578,34.998],[9.631,35.013],[9.682,35.032]],[[9.578,35.96],[9.524,35.95],[9.47,35.957],[9.421,35.982],[9.383,36.022],[9.355,36.069],[9.337,36.121],[9.323,36.175],[9.314,36.229],[9.307,36.283],[9.301,36.338],[9.296,36.393],[9.292,36.448],[9.29,36.503],[9.29,36.558],[9.292,36.613],[9.299,36.668],[9.311,36.722],[9.332,36.773],[9.366,36.815],[9.416,36.837],[9.47,36.83],[9.518,36.804],[9.56,36.769],[9.598,36.728],[9.631,36.684],[9.66,36.637],[9.686,36.588],[9.708,36.538],[9.728,36.487],[9.744,36.434],[9.756,36.38],[9.763,36.326],[9.765,36.271],[9.761,36.216],[9.75,36.162],[9.732,36.11],[9.705,36.062],[9.67,36.019],[9.628,35.984]],[[3.003,33.302],[3.033,33.348],[3.055,33.398],[3.072,33.45],[3.086,33.503],[3.1,33.557],[3.114,33.61],[3.129,33.663],[3.147,33.714],[3.17,33.764],[3.198,33.812],[3.233,33.854],[3.275,33.89],[3.322,33.917],[3.374,33.936],[3.428,33.947],[3.482,33.951],[3.537,33.952],[3.592,33.949],[3.647,33.945],[3.702,33.938],[3.756,33.93],[3.81,33.922],[3.864,33.912],[3.919,33.903],[3.973,33.893],[4.027,33.883],[4.081,33.873],[4.135,33.864],[4.189,33.856],[4.244,33.848],[4.298,33.842],[4.353,33.839],[4.408,33.838],[4.463,33.841],[4.517,33.85],[4.57,33.866],[4.618,33.892],[4.657,33.93],[4.68,33.98],[4.684,34.034],[4.674,34.088],[4.652,34.138],[4.624,34.185],[4.59,34.229],[4.552,34.269],[4.511,34.305],[4.468,34.339],[4.422,34.369],[4.374,34.397],[4.326,34.422],[4.276,34.445],[4.225,34.466],[4.174,34.486],[4.122,34.504],[4.07,34.522],[4.017,34.538],[3.965,34.554],[3.912,34.569],[3.859,34.583],[3.805,34.597],[3.752,34.61],[3.699,34.623],[3.645,34.636],[3.592,34.649],[3.539,34.664],[3.486,34.68],[3.434,34.698],[3.383,34.718],[3.334,34.743],[3.288,34.772],[3.245,34.806],[3.206,34.845],[3.173,34.889],[3.146,34.937],[3.123,34.987],[3.104,35.038],[3.088,35.091],[3.073,35.144],[3.06,35.197],[3.047,35.25],[3.033,35.304],[3.019,35.357],[3.003,35.409],[2.986,35.462],[2.967,35.513],[2.945,35.564],[2.92,35.613],[2.891,35.66],[2.859,35.704],[2.82,35.743],[2.776,35.775],[2.725,35.795],[2.67,35.797],[2.618,35.78],[2.574,35.747],[2.539,35.705],[2.511,35.658],[2.489,35.608],[2.471,35.556],[2.456,35.503],[2.443,35.449],[2.431,35.396],[2.418,35.342],[2.404,35.289],[2.387,35.237],[2.365,35.187],[2.337,35.139],[2.301,35.097],[2.258,35.063],[2.21,35.038],[2.157,35.022],[2.103,35.012],[2.048,35.008],[1.993,35.008],[1.939,35.01],[1.884,35.014],[1.829,35.018],[1.774,35.022],[1.719,35.026],[1.664,35.03],[1.61,35.034],[1.555,35.038],[1.5,35.042],[1.445,35.047],[1.391,35.052],[1.336,35.058],[1.281,35.065],[1.227,35.073],[1.173,35.081],[1.118,35.089],[1.064,35.097],[1.01,35.106],[.955,35.115],[.901,35.123],[.847,35.132],[.792,35.141],[.738,35.149],[.684,35.158],[.629,35.165],[.575,35.173],[.52,35.18],[.466,35.187],[.411,35.193],[.357,35.199],[.302,35.205],[.247,35.21],[.193,35.215],[.138,35.22],[.083,35.223],[.028,35.224],[-.027,35.221],[-.081,35.214],[-.134,35.2],[-.184,35.177],[-.228,35.144],[-.261,35.1],[-.281,35.049],[-.29,34.995],[-.287,34.94],[-.276,34.887],[-.257,34.835],[-.232,34.786],[-.202,34.74],[-.167,34.697],[-.129,34.658],[-.087,34.623],[-.042,34.591],[.006,34.563],[.055,34.539],[.106,34.518],[.157,34.5],[.21,34.484],[.263,34.47],[.317,34.458],[.371,34.446],[.425,34.436],[.478,34.425],[.532,34.415],[.586,34.405],[.64,34.394],[.694,34.384],[.748,34.373],[.802,34.362],[.856,34.352],[.91,34.341],[.964,34.33],[1.018,34.319],[1.072,34.308],[1.126,34.297],[1.179,34.286],[1.233,34.275],[1.287,34.263],[1.341,34.252],[1.394,34.24],[1.448,34.227],[1.501,34.215],[1.555,34.203],[1.608,34.19],[1.662,34.178],[1.715,34.165],[1.769,34.152],[1.822,34.138],[1.875,34.124],[1.928,34.108],[1.98,34.09],[2.031,34.07],[2.081,34.047],[2.129,34.021],[2.175,33.991],[2.218,33.956],[2.258,33.919],[2.295,33.878],[2.328,33.834],[2.359,33.789],[2.388,33.742],[2.416,33.695],[2.442,33.647],[2.469,33.599],[2.497,33.551],[2.526,33.504],[2.556,33.459],[2.59,33.415],[2.626,33.374],[2.665,33.335],[2.708,33.301],[2.754,33.272],[2.805,33.25],[2.858,33.239],[2.913,33.242],[2.963,33.264]],[[6.747,31.585],[6.79,31.619],[6.83,31.657],[6.869,31.695],[6.91,31.732],[6.953,31.767],[6.999,31.797],[7.047,31.824],[7.098,31.845],[7.15,31.862],[7.204,31.875],[7.258,31.884],[7.312,31.892],[7.367,31.897],[7.422,31.901],[7.477,31.905],[7.532,31.908],[7.587,31.911],[7.641,31.915],[7.696,31.919],[7.751,31.924],[7.806,31.93],[7.861,31.936],[7.915,31.942],[7.97,31.949],[8.024,31.956],[8.079,31.962],[8.134,31.967],[8.189,31.972],[8.244,31.977],[8.298,31.98],[8.353,31.983],[8.408,31.986],[8.463,31.988],[8.518,31.991],[8.573,31.994],[8.628,31.997],[8.683,32.002],[8.738,32.006],[8.793,32.012],[8.847,32.018],[8.902,32.024],[8.957,32.03],[9.011,32.036],[9.066,32.041],[9.121,32.045],[9.176,32.048],[9.231,32.05],[9.286,32.051],[9.341,32.05],[9.396,32.05],[9.451,32.049],[9.506,32.048],[9.561,32.049],[9.616,32.051],[9.671,32.055],[9.726,32.062],[9.78,32.072],[9.833,32.085],[9.885,32.103],[9.934,32.128],[9.979,32.16],[10.014,32.201],[10.037,32.252],[10.045,32.306],[10.042,32.361],[10.034,32.415],[10.022,32.469],[10.009,32.522],[9.997,32.576],[9.986,32.63],[9.979,32.684],[9.974,32.739],[9.971,32.794],[9.971,32.849],[9.973,32.904],[9.976,32.959],[9.98,33.014],[9.984,33.069],[9.987,33.124],[9.989,33.179],[9.99,33.234],[9.989,33.289],[9.987,33.344],[9.982,33.399],[9.976,33.453],[9.968,33.508],[9.958,33.562],[9.946,33.616],[9.932,33.669],[9.916,33.721],[9.897,33.773],[9.877,33.824],[9.854,33.874],[9.83,33.924],[9.804,33.972],[9.776,34.02],[9.747,34.066],[9.716,34.112],[9.685,34.157],[9.652,34.201],[9.618,34.245],[9.583,34.287],[9.547,34.329],[9.51,34.369],[9.471,34.408],[9.431,34.446],[9.39,34.482],[9.347,34.517],[9.303,34.551],[9.258,34.582],[9.213,34.613],[9.166,34.641],[9.118,34.669],[9.069,34.694],[9.02,34.719],[8.97,34.741],[8.919,34.762],[8.867,34.782],[8.816,34.801],[8.763,34.818],[8.711,34.834],[8.658,34.85],[8.605,34.864],[8.552,34.878],[8.498,34.891],[8.445,34.904],[8.391,34.916],[8.337,34.929],[8.284,34.94],[8.23,34.952],[8.176,34.964],[8.122,34.975],[8.069,34.987],[8.015,34.999],[7.961,35.011],[7.907,35.022],[7.854,35.034],[7.8,35.045],[7.746,35.055],[7.691,35.065],[7.637,35.072],[7.582,35.078],[7.527,35.082],[7.472,35.084],[7.417,35.082],[7.362,35.079],[7.308,35.072],[7.254,35.063],[7.2,35.051],[7.147,35.036],[7.095,35.019],[7.043,35],[6.993,34.978],[6.943,34.954],[6.895,34.927],[6.848,34.899],[6.802,34.868],[6.758,34.836],[6.715,34.801],[6.673,34.765],[6.633,34.728],[6.594,34.689],[6.557,34.648],[6.522,34.606],[6.488,34.562],[6.457,34.517],[6.428,34.47],[6.401,34.422],[6.376,34.373],[6.354,34.323],[6.334,34.272],[6.316,34.22],[6.3,34.167],[6.285,34.114],[6.273,34.06],[6.262,34.006],[6.253,33.952],[6.246,33.898],[6.241,33.843],[6.237,33.788],[6.236,33.733],[6.237,33.678],[6.24,33.623],[6.244,33.568],[6.251,33.513],[6.26,33.459],[6.271,33.405],[6.283,33.352],[6.296,33.298],[6.311,33.245],[6.326,33.192],[6.342,33.14],[6.358,33.087],[6.374,33.034],[6.389,32.981],[6.402,32.928],[6.413,32.874],[6.421,32.82],[6.424,32.765],[6.42,32.71],[6.411,32.655],[6.397,32.602],[6.379,32.55],[6.359,32.499],[6.339,32.448],[6.319,32.397],[6.302,32.344],[6.288,32.291],[6.278,32.237],[6.274,32.182],[6.274,32.127],[6.28,32.073],[6.29,32.019],[6.305,31.966],[6.323,31.914],[6.345,31.863],[6.37,31.814],[6.398,31.767],[6.429,31.721],[6.464,31.678],[6.501,31.638],[6.543,31.603],[6.59,31.574],[6.643,31.558],[6.697,31.562]],[[8.948,32.791],[8.894,32.777],[8.84,32.765],[8.786,32.757],[8.731,32.751],[8.676,32.747],[8.621,32.745],[8.565,32.744],[8.51,32.743],[8.455,32.743],[8.4,32.743],[8.344,32.742],[8.289,32.741],[8.234,32.739],[8.179,32.738],[8.124,32.736],[8.068,32.735],[8.013,32.733],[7.958,32.732],[7.903,32.732],[7.848,32.732],[7.792,32.733],[7.737,32.734],[7.682,32.737],[7.627,32.74],[7.572,32.746],[7.517,32.753],[7.463,32.763],[7.409,32.775],[7.356,32.791],[7.304,32.811],[7.254,32.834],[7.206,32.861],[7.161,32.892],[7.118,32.927],[7.078,32.966],[7.042,33.007],[7.009,33.052],[6.98,33.099],[6.954,33.147],[6.931,33.198],[6.912,33.249],[6.896,33.302],[6.883,33.356],[6.874,33.41],[6.869,33.465],[6.87,33.52],[6.876,33.575],[6.89,33.629],[6.91,33.68],[6.937,33.728],[6.969,33.773],[7.006,33.815],[7.046,33.852],[7.089,33.887],[7.134,33.919],[7.181,33.948],[7.229,33.975],[7.278,34],[7.328,34.023],[7.379,34.045],[7.431,34.064],[7.483,34.082],[7.536,34.099],[7.589,34.114],[7.642,34.128],[7.696,34.141],[7.75,34.152],[7.804,34.163],[7.859,34.172],[7.913,34.179],[7.968,34.185],[8.023,34.189],[8.079,34.191],[8.134,34.191],[8.189,34.189],[8.244,34.185],[8.299,34.18],[8.354,34.172],[8.408,34.163],[8.462,34.152],[8.516,34.139],[8.569,34.125],[8.622,34.108],[8.674,34.09],[8.725,34.069],[8.776,34.047],[8.825,34.022],[8.873,33.994],[8.92,33.965],[8.965,33.933],[9.009,33.9],[9.052,33.865],[9.093,33.829],[9.134,33.791],[9.174,33.753],[9.212,33.713],[9.249,33.672],[9.284,33.63],[9.318,33.586],[9.349,33.54],[9.376,33.492],[9.398,33.441],[9.414,33.388],[9.423,33.334],[9.423,33.279],[9.414,33.224],[9.398,33.172],[9.374,33.122],[9.345,33.075],[9.312,33.031],[9.275,32.99],[9.235,32.952],[9.192,32.917],[9.147,32.885],[9.1,32.857],[9.05,32.831],[9,32.81]],[[-8.103,31.101],[-8.05,31.114],[-7.998,31.132],[-7.948,31.153],[-7.898,31.176],[-7.849,31.201],[-7.8,31.227],[-7.752,31.253],[-7.704,31.28],[-7.656,31.307],[-7.608,31.333],[-7.56,31.36],[-7.512,31.387],[-7.465,31.414],[-7.417,31.442],[-7.369,31.469],[-7.322,31.497],[-7.274,31.524],[-7.227,31.551],[-7.179,31.578],[-7.131,31.605],[-7.083,31.631],[-7.034,31.658],[-6.986,31.684],[-6.938,31.71],[-6.889,31.736],[-6.841,31.762],[-6.793,31.788],[-6.745,31.815],[-6.697,31.841],[-6.649,31.868],[-6.6,31.894],[-6.552,31.921],[-6.504,31.946],[-6.455,31.972],[-6.406,31.996],[-6.357,32.02],[-6.307,32.044],[-6.257,32.067],[-6.207,32.089],[-6.157,32.112],[-6.107,32.134],[-6.057,32.157],[-6.007,32.18],[-5.957,32.203],[-5.907,32.226],[-5.858,32.25],[-5.808,32.273],[-5.758,32.297],[-5.709,32.32],[-5.658,32.342],[-5.608,32.365],[-5.558,32.386],[-5.507,32.406],[-5.455,32.426],[-5.404,32.445],[-5.352,32.462],[-5.3,32.48],[-5.247,32.497],[-5.195,32.513],[-5.143,32.53],[-5.09,32.547],[-5.038,32.564],[-4.987,32.583],[-4.935,32.602],[-4.884,32.623],[-4.834,32.646],[-4.785,32.671],[-4.738,32.698],[-4.692,32.729],[-4.649,32.762],[-4.609,32.8],[-4.573,32.842],[-4.543,32.887],[-4.519,32.937],[-4.503,32.989],[-4.494,33.043],[-4.493,33.098],[-4.498,33.153],[-4.509,33.207],[-4.525,33.259],[-4.544,33.311],[-4.567,33.36],[-4.594,33.408],[-4.624,33.454],[-4.658,33.498],[-4.695,33.538],[-4.736,33.575],[-4.779,33.608],[-4.825,33.638],[-4.873,33.665],[-4.923,33.689],[-4.974,33.709],[-5.025,33.728],[-5.078,33.745],[-5.13,33.761],[-5.183,33.775],[-5.237,33.788],[-5.29,33.801],[-5.343,33.813],[-5.397,33.826],[-5.451,33.838],[-5.504,33.85],[-5.558,33.863],[-5.611,33.875],[-5.664,33.888],[-5.718,33.901],[-5.771,33.914],[-5.824,33.928],[-5.877,33.942],[-5.931,33.955],[-5.984,33.969],[-6.037,33.984],[-6.09,33.998],[-6.143,34.013],[-6.195,34.028],[-6.248,34.043],[-6.301,34.058],[-6.354,34.073],[-6.407,34.088],[-6.46,34.103],[-6.513,34.117],[-6.566,34.131],[-6.619,34.145],[-6.672,34.159],[-6.725,34.173],[-6.778,34.187],[-6.831,34.201],[-6.884,34.215],[-6.937,34.229],[-6.99,34.244],[-7.043,34.259],[-7.096,34.274],[-7.149,34.289],[-7.202,34.304],[-7.255,34.319],[-7.308,34.333],[-7.36,34.348],[-7.413,34.363],[-7.466,34.377],[-7.52,34.391],[-7.573,34.405],[-7.626,34.418],[-7.679,34.432],[-7.732,34.445],[-7.786,34.459],[-7.839,34.472],[-7.892,34.485],[-7.945,34.499],[-7.999,34.512],[-8.052,34.525],[-8.105,34.539],[-8.159,34.552],[-8.212,34.565],[-8.265,34.578],[-8.319,34.591],[-8.372,34.604],[-8.425,34.617],[-8.479,34.63],[-8.532,34.643],[-8.586,34.655],[-8.639,34.667],[-8.693,34.679],[-8.747,34.69],[-8.8,34.701],[-8.854,34.712],[-8.908,34.723],[-8.962,34.733],[-9.016,34.743],[-9.07,34.753],[-9.124,34.761],[-9.179,34.769],[-9.233,34.774],[-9.288,34.778],[-9.343,34.778],[-9.398,34.775],[-9.452,34.765],[-9.504,34.749],[-9.554,34.725],[-9.597,34.692],[-9.633,34.65],[-9.659,34.602],[-9.673,34.549],[-9.677,34.494],[-9.671,34.44],[-9.657,34.387],[-9.636,34.336],[-9.608,34.289],[-9.575,34.245],[-9.538,34.205],[-9.497,34.168],[-9.454,34.134],[-9.408,34.103],[-9.361,34.075],[-9.312,34.05],[-9.263,34.026],[-9.212,34.005],[-9.161,33.985],[-9.109,33.966],[-9.057,33.949],[-9.005,33.934],[-8.952,33.919],[-8.898,33.905],[-8.845,33.893],[-8.791,33.881],[-8.738,33.869],[-8.684,33.858],[-8.63,33.847],[-8.576,33.837],[-8.522,33.827],[-8.468,33.817],[-8.414,33.807],[-8.36,33.796],[-8.307,33.785],[-8.253,33.772],[-8.2,33.758],[-8.148,33.741],[-8.097,33.721],[-8.047,33.698],[-7.999,33.671],[-7.955,33.638],[-7.916,33.6],[-7.881,33.557],[-7.852,33.511],[-7.827,33.462],[-7.807,33.411],[-7.791,33.358],[-7.777,33.305],[-7.765,33.252],[-7.754,33.198],[-7.745,33.144],[-7.736,33.089],[-7.729,33.035],[-7.722,32.981],[-7.717,32.926],[-7.713,32.871],[-7.71,32.816],[-7.708,32.761],[-7.708,32.706],[-7.71,32.652],[-7.713,32.597],[-7.719,32.542],[-7.728,32.488],[-7.739,32.434],[-7.755,32.382],[-7.775,32.33],[-7.799,32.281],[-7.828,32.235],[-7.862,32.191],[-7.898,32.15],[-7.938,32.112],[-7.98,32.077],[-8.023,32.043],[-8.068,32.011],[-8.113,31.979],[-8.158,31.948],[-8.203,31.916],[-8.247,31.884],[-8.291,31.85],[-8.333,31.815],[-8.373,31.778],[-8.41,31.738],[-8.444,31.694],[-8.473,31.648],[-8.495,31.598],[-8.51,31.545],[-8.517,31.49],[-8.516,31.436],[-8.507,31.381],[-8.492,31.329],[-8.469,31.279],[-8.44,31.232],[-8.405,31.19],[-8.364,31.153],[-8.318,31.125],[-8.267,31.105],[-8.213,31.095],[-8.158,31.094]],[[-6.595,32.822],[-6.649,32.828],[-6.7,32.847],[-6.745,32.878],[-6.781,32.919],[-6.806,32.967],[-6.822,33.019],[-6.83,33.073],[-6.83,33.128],[-6.822,33.182],[-6.804,33.233],[-6.776,33.279],[-6.735,33.316],[-6.687,33.34],[-6.633,33.352],[-6.579,33.355],[-6.525,33.352],[-6.47,33.346],[-6.417,33.337],[-6.363,33.326],[-6.31,33.314],[-6.257,33.3],[-6.205,33.283],[-6.155,33.262],[-6.109,33.234],[-6.073,33.193],[-6.062,33.141],[-6.078,33.089],[-6.11,33.045],[-6.15,33.007],[-6.192,32.973],[-6.238,32.943],[-6.285,32.916],[-6.334,32.891],[-6.384,32.869],[-6.435,32.85],[-6.487,32.835],[-6.541,32.825]],[[.568,30.254],[.598,30.3],[.613,30.353],[.617,30.408],[.614,30.463],[.605,30.517],[.593,30.571],[.579,30.624],[.564,30.677],[.549,30.73],[.534,30.783],[.519,30.836],[.506,30.89],[.495,30.944],[.485,30.998],[.477,31.053],[.472,31.107],[.468,31.162],[.466,31.217],[.465,31.272],[.467,31.328],[.47,31.383],[.475,31.437],[.483,31.492],[.492,31.546],[.503,31.6],[.517,31.654],[.534,31.706],[.552,31.758],[.573,31.809],[.597,31.859],[.623,31.907],[.652,31.954],[.684,31.999],[.719,32.042],[.757,32.081],[.8,32.116],[.847,32.145],[.898,32.165],[.952,32.172],[1.007,32.166],[1.058,32.146],[1.104,32.116],[1.144,32.078],[1.179,32.035],[1.209,31.989],[1.235,31.941],[1.258,31.891],[1.278,31.839],[1.296,31.787],[1.313,31.735],[1.329,31.682],[1.345,31.629],[1.36,31.576],[1.375,31.523],[1.39,31.47],[1.405,31.417],[1.421,31.365],[1.438,31.312],[1.455,31.26],[1.472,31.207],[1.49,31.155],[1.509,31.104],[1.529,31.052],[1.551,31.001],[1.573,30.951],[1.597,30.902],[1.623,30.853],[1.65,30.805],[1.68,30.758],[1.711,30.713],[1.745,30.669],[1.78,30.628],[1.819,30.588],[1.859,30.551],[1.903,30.517],[1.949,30.486],[1.997,30.46],[2.048,30.439],[2.101,30.424],[2.155,30.415],[2.21,30.412],[2.265,30.416],[2.319,30.425],[2.372,30.44],[2.424,30.459],[2.474,30.482],[2.523,30.508],[2.57,30.537],[2.615,30.569],[2.658,30.603],[2.699,30.639],[2.738,30.678],[2.774,30.721],[2.806,30.765],[2.834,30.812],[2.859,30.862],[2.88,30.913],[2.898,30.965],[2.913,31.018],[2.926,31.071],[2.938,31.125],[2.948,31.179],[2.957,31.234],[2.965,31.288],[2.971,31.343],[2.976,31.398],[2.98,31.453],[2.982,31.508],[2.981,31.563],[2.979,31.618],[2.975,31.673],[2.97,31.728],[2.963,31.782],[2.954,31.837],[2.944,31.891],[2.933,31.945],[2.92,31.999],[2.906,32.052],[2.89,32.105],[2.873,32.157],[2.852,32.208],[2.83,32.258],[2.804,32.307],[2.776,32.354],[2.745,32.4],[2.713,32.444],[2.677,32.487],[2.64,32.528],[2.602,32.567],[2.562,32.605],[2.521,32.642],[2.478,32.677],[2.435,32.711],[2.392,32.745],[2.347,32.778],[2.303,32.81],[2.258,32.842],[2.213,32.874],[2.167,32.905],[2.122,32.936],[2.076,32.966],[2.029,32.995],[1.982,33.024],[1.934,33.051],[1.885,33.077],[1.835,33.1],[1.785,33.122],[1.733,33.141],[1.681,33.158],[1.628,33.173],[1.574,33.186],[1.52,33.198],[1.466,33.207],[1.411,33.215],[1.357,33.223],[1.302,33.229],[1.247,33.234],[1.192,33.238],[1.137,33.241],[1.082,33.243],[1.027,33.243],[.972,33.241],[.917,33.238],[.862,33.233],[.807,33.226],[.753,33.217],[.699,33.206],[.646,33.192],[.593,33.176],[.541,33.157],[.491,33.136],[.441,33.111],[.394,33.083],[.348,33.053],[.303,33.02],[.261,32.986],[.22,32.949],[.181,32.91],[.144,32.869],[.109,32.826],[.076,32.782],[.045,32.736],[.017,32.689],[-.008,32.64],[-.031,32.59],[-.051,32.539],[-.069,32.486],[-.084,32.434],[-.098,32.38],[-.109,32.326],[-.119,32.272],[-.129,32.218],[-.137,32.163],[-.146,32.109],[-.154,32.054],[-.161,32],[-.168,31.945],[-.175,31.89],[-.181,31.836],[-.185,31.781],[-.189,31.726],[-.191,31.671],[-.192,31.615],[-.19,31.56],[-.188,31.505],[-.184,31.45],[-.178,31.396],[-.171,31.341],[-.162,31.287],[-.153,31.232],[-.142,31.178],[-.13,31.124],[-.118,31.071],[-.105,31.017],[-.091,30.964],[-.077,30.91],[-.062,30.857],[-.047,30.805],[-.029,30.752],[-.011,30.7],[.01,30.649],[.032,30.599],[.057,30.55],[.085,30.502],[.116,30.457],[.149,30.413],[.186,30.371],[.225,30.333],[.267,30.298],[.313,30.266],[.361,30.241],[.413,30.223],[.468,30.216],[.522,30.225]],[[7.689,28.793],[7.74,28.811],[7.791,28.833],[7.84,28.858],[7.889,28.884],[7.936,28.912],[7.983,28.94],[8.029,28.97],[8.075,29],[8.121,29.032],[8.165,29.064],[8.209,29.097],[8.252,29.132],[8.293,29.168],[8.333,29.206],[8.371,29.246],[8.408,29.287],[8.443,29.329],[8.477,29.373],[8.508,29.418],[8.538,29.464],[8.566,29.512],[8.591,29.56],[8.615,29.61],[8.637,29.661],[8.656,29.712],[8.674,29.764],[8.69,29.817],[8.706,29.87],[8.72,29.923],[8.733,29.976],[8.746,30.03],[8.759,30.083],[8.773,30.136],[8.787,30.19],[8.802,30.242],[8.819,30.295],[8.839,30.346],[8.862,30.396],[8.888,30.445],[8.919,30.49],[8.955,30.531],[8.997,30.567],[9.044,30.596],[9.095,30.615],[9.15,30.623],[9.205,30.619],[9.257,30.603],[9.305,30.575],[9.346,30.54],[9.38,30.497],[9.407,30.449],[9.427,30.397],[9.439,30.344],[9.445,30.289],[9.446,30.234],[9.443,30.179],[9.437,30.124],[9.429,30.07],[9.421,30.015],[9.413,29.961],[9.406,29.906],[9.402,29.851],[9.401,29.796],[9.403,29.741],[9.41,29.687],[9.421,29.633],[9.437,29.58],[9.457,29.529],[9.482,29.48],[9.512,29.434],[9.547,29.392],[9.59,29.358],[9.64,29.334],[9.694,29.326],[9.748,29.334],[9.799,29.355],[9.844,29.386],[9.886,29.422],[9.923,29.463],[9.956,29.506],[9.986,29.552],[10.014,29.6],[10.039,29.649],[10.062,29.699],[10.084,29.75],[10.103,29.801],[10.121,29.853],[10.138,29.905],[10.153,29.958],[10.165,30.012],[10.176,30.066],[10.185,30.12],[10.19,30.175],[10.193,30.23],[10.194,30.285],[10.192,30.34],[10.188,30.395],[10.182,30.45],[10.174,30.504],[10.165,30.558],[10.154,30.612],[10.142,30.666],[10.127,30.719],[10.11,30.771],[10.091,30.823],[10.069,30.873],[10.045,30.923],[10.018,30.971],[9.989,31.018],[9.958,31.063],[9.925,31.107],[9.89,31.15],[9.854,31.191],[9.816,31.231],[9.777,31.27],[9.736,31.307],[9.694,31.342],[9.65,31.375],[9.605,31.407],[9.559,31.437],[9.511,31.464],[9.462,31.49],[9.413,31.514],[9.362,31.535],[9.31,31.554],[9.258,31.571],[9.205,31.584],[9.15,31.595],[9.096,31.601],[9.041,31.602],[8.986,31.598],[8.932,31.588],[8.879,31.571],[8.829,31.549],[8.781,31.522],[8.736,31.491],[8.692,31.457],[8.651,31.421],[8.61,31.384],[8.57,31.346],[8.531,31.307],[8.493,31.267],[8.456,31.226],[8.421,31.185],[8.387,31.141],[8.354,31.097],[8.323,31.051],[8.294,31.005],[8.266,30.957],[8.24,30.909],[8.215,30.86],[8.191,30.81],[8.168,30.76],[8.146,30.71],[8.124,30.66],[8.102,30.609],[8.08,30.559],[8.057,30.508],[8.035,30.458],[8.012,30.408],[7.988,30.359],[7.963,30.31],[7.937,30.261],[7.91,30.213],[7.881,30.166],[7.85,30.12],[7.818,30.076],[7.783,30.034],[7.744,29.994],[7.702,29.959],[7.656,29.93],[7.605,29.909],[7.55,29.901],[7.496,29.909],[7.446,29.932],[7.402,29.964],[7.365,30.005],[7.333,30.05],[7.306,30.098],[7.284,30.148],[7.267,30.2],[7.253,30.254],[7.243,30.308],[7.236,30.362],[7.231,30.417],[7.227,30.472],[7.224,30.527],[7.22,30.582],[7.215,30.637],[7.207,30.691],[7.196,30.745],[7.181,30.798],[7.162,30.849],[7.139,30.899],[7.111,30.947],[7.079,30.992],[7.042,31.032],[7,31.068],[6.952,31.094],[6.899,31.109],[6.844,31.108],[6.791,31.093],[6.743,31.066],[6.7,31.032],[6.662,30.993],[6.628,30.949],[6.598,30.903],[6.572,30.855],[6.549,30.805],[6.53,30.753],[6.513,30.701],[6.5,30.647],[6.49,30.593],[6.482,30.539],[6.477,30.484],[6.473,30.429],[6.471,30.374],[6.47,30.319],[6.471,30.264],[6.473,30.209],[6.476,30.154],[6.481,30.099],[6.487,30.044],[6.495,29.99],[6.504,29.936],[6.516,29.882],[6.529,29.829],[6.544,29.776],[6.56,29.723],[6.579,29.671],[6.599,29.62],[6.621,29.569],[6.644,29.52],[6.669,29.471],[6.695,29.422],[6.724,29.375],[6.754,29.329],[6.785,29.284],[6.818,29.24],[6.852,29.197],[6.888,29.155],[6.925,29.114],[6.963,29.074],[7.002,29.035],[7.042,28.997],[7.083,28.961],[7.126,28.926],[7.17,28.894],[7.216,28.863],[7.263,28.835],[7.313,28.811],[7.364,28.792],[7.417,28.777],[7.472,28.768],[7.527,28.765],[7.581,28.769],[7.636,28.778]],[[-8.282,26.765],[-8.232,26.788],[-8.186,26.817],[-8.142,26.85],[-8.1,26.886],[-8.06,26.924],[-8.022,26.964],[-7.985,27.005],[-7.949,27.046],[-7.913,27.088],[-7.878,27.13],[-7.843,27.172],[-7.807,27.214],[-7.772,27.256],[-7.736,27.298],[-7.701,27.34],[-7.666,27.382],[-7.63,27.424],[-7.595,27.467],[-7.56,27.509],[-7.525,27.551],[-7.49,27.594],[-7.455,27.636],[-7.42,27.678],[-7.385,27.721],[-7.349,27.763],[-7.314,27.805],[-7.278,27.847],[-7.243,27.889],[-7.207,27.931],[-7.172,27.973],[-7.136,28.015],[-7.1,28.056],[-7.063,28.097],[-7.025,28.136],[-6.985,28.174],[-6.943,28.21],[-6.898,28.241],[-6.85,28.267],[-6.798,28.284],[-6.743,28.289],[-6.689,28.283],[-6.636,28.267],[-6.586,28.244],[-6.538,28.217],[-6.492,28.188],[-6.446,28.158],[-6.4,28.127],[-6.354,28.097],[-6.308,28.067],[-6.261,28.039],[-6.212,28.013],[-6.164,27.987],[-6.114,27.964],[-6.063,27.943],[-6.012,27.923],[-5.96,27.904],[-5.908,27.888],[-5.855,27.872],[-5.802,27.859],[-5.748,27.846],[-5.694,27.835],[-5.64,27.826],[-5.586,27.818],[-5.531,27.812],[-5.476,27.808],[-5.421,27.805],[-5.366,27.805],[-5.311,27.806],[-5.257,27.81],[-5.202,27.817],[-5.148,27.826],[-5.094,27.838],[-5.042,27.855],[-4.99,27.874],[-4.941,27.898],[-4.893,27.925],[-4.848,27.956],[-4.805,27.991],[-4.765,28.029],[-4.728,28.069],[-4.693,28.112],[-4.661,28.156],[-4.632,28.203],[-4.604,28.25],[-4.579,28.299],[-4.555,28.348],[-4.532,28.399],[-4.511,28.449],[-4.491,28.5],[-4.471,28.552],[-4.452,28.603],[-4.434,28.655],[-4.416,28.707],[-4.398,28.759],[-4.381,28.812],[-4.365,28.864],[-4.348,28.916],[-4.333,28.969],[-4.319,29.022],[-4.305,29.076],[-4.293,29.129],[-4.283,29.183],[-4.275,29.238],[-4.268,29.292],[-4.264,29.347],[-4.262,29.402],[-4.263,29.457],[-4.266,29.512],[-4.271,29.567],[-4.28,29.621],[-4.291,29.675],[-4.305,29.728],[-4.321,29.78],[-4.34,29.832],[-4.36,29.883],[-4.383,29.933],[-4.407,29.982],[-4.433,30.031],[-4.459,30.079],[-4.486,30.127],[-4.514,30.174],[-4.543,30.221],[-4.573,30.267],[-4.604,30.313],[-4.636,30.357],[-4.67,30.4],[-4.707,30.442],[-4.746,30.48],[-4.789,30.514],[-4.836,30.543],[-4.885,30.567],[-4.938,30.584],[-4.991,30.595],[-5.046,30.6],[-5.101,30.602],[-5.156,30.6],[-5.211,30.595],[-5.265,30.589],[-5.32,30.582],[-5.374,30.574],[-5.428,30.565],[-5.483,30.555],[-5.537,30.544],[-5.59,30.533],[-5.644,30.522],[-5.698,30.51],[-5.752,30.498],[-5.805,30.486],[-5.859,30.474],[-5.912,30.462],[-5.966,30.451],[-6.02,30.439],[-6.074,30.428],[-6.128,30.417],[-6.181,30.406],[-6.235,30.395],[-6.289,30.384],[-6.343,30.373],[-6.397,30.362],[-6.451,30.351],[-6.505,30.34],[-6.558,30.328],[-6.612,30.317],[-6.666,30.305],[-6.719,30.293],[-6.773,30.28],[-6.826,30.267],[-6.88,30.254],[-6.933,30.24],[-6.986,30.226],[-7.039,30.211],[-7.092,30.197],[-7.145,30.182],[-7.198,30.168],[-7.251,30.154],[-7.305,30.14],[-7.358,30.127],[-7.411,30.113],[-7.465,30.1],[-7.518,30.087],[-7.572,30.075],[-7.625,30.062],[-7.678,30.048],[-7.732,30.035],[-7.785,30.022],[-7.838,30.008],[-7.892,29.995],[-7.945,29.982],[-7.999,29.97],[-8.052,29.958],[-8.106,29.947],[-8.16,29.937],[-8.214,29.927],[-8.268,29.917],[-8.323,29.907],[-8.377,29.897],[-8.431,29.887],[-8.484,29.876],[-8.538,29.864],[-8.591,29.85],[-8.644,29.834],[-8.695,29.814],[-8.744,29.789],[-8.789,29.757],[-8.827,29.717],[-8.857,29.671],[-8.877,29.62],[-8.888,29.567],[-8.892,29.512],[-8.889,29.457],[-8.881,29.403],[-8.866,29.35],[-8.846,29.299],[-8.82,29.25],[-8.787,29.206],[-8.749,29.167],[-8.705,29.134],[-8.656,29.109],[-8.604,29.091],[-8.55,29.08],[-8.496,29.074],[-8.441,29.074],[-8.386,29.077],[-8.331,29.083],[-8.277,29.091],[-8.222,29.1],[-8.168,29.11],[-8.114,29.119],[-8.06,29.127],[-8.005,29.133],[-7.95,29.137],[-7.895,29.137],[-7.841,29.132],[-7.787,29.119],[-7.737,29.096],[-7.694,29.062],[-7.665,29.016],[-7.651,28.963],[-7.651,28.908],[-7.661,28.854],[-7.677,28.802],[-7.699,28.751],[-7.724,28.703],[-7.752,28.655],[-7.781,28.608],[-7.812,28.563],[-7.843,28.518],[-7.875,28.473],[-7.907,28.428],[-7.939,28.384],[-7.971,28.339],[-8.002,28.293],[-8.033,28.248],[-8.063,28.202],[-8.093,28.156],[-8.123,28.11],[-8.153,28.064],[-8.184,28.018],[-8.215,27.973],[-8.246,27.928],[-8.278,27.883],[-8.311,27.839],[-8.344,27.795],[-8.378,27.752],[-8.413,27.709],[-8.448,27.667],[-8.484,27.625],[-8.519,27.583],[-8.554,27.54],[-8.588,27.497],[-8.621,27.453],[-8.652,27.408],[-8.681,27.361],[-8.706,27.312],[-8.726,27.261],[-8.74,27.208],[-8.748,27.154],[-8.747,27.099],[-8.738,27.045],[-8.721,26.992],[-8.697,26.943],[-8.667,26.897],[-8.632,26.855],[-8.591,26.817],[-8.546,26.786],[-8.497,26.762],[-8.444,26.747],[-8.389,26.743],[-8.335,26.749]],[[-5.61,28.858],[-5.665,28.861],[-5.72,28.869],[-5.774,28.881],[-5.828,28.896],[-5.88,28.915],[-5.931,28.937],[-5.98,28.961],[-6.029,28.988],[-6.076,29.017],[-6.122,29.048],[-6.166,29.082],[-6.207,29.119],[-6.244,29.161],[-6.274,29.207],[-6.294,29.258],[-6.297,29.313],[-6.28,29.366],[-6.247,29.41],[-6.205,29.446],[-6.158,29.475],[-6.108,29.499],[-6.056,29.52],[-6.004,29.537],[-5.951,29.553],[-5.897,29.567],[-5.843,29.579],[-5.789,29.591],[-5.734,29.602],[-5.68,29.611],[-5.625,29.62],[-5.57,29.627],[-5.515,29.631],[-5.459,29.633],[-5.404,29.63],[-5.349,29.621],[-5.296,29.605],[-5.247,29.581],[-5.203,29.546],[-5.168,29.503],[-5.144,29.454],[-5.128,29.401],[-5.122,29.346],[-5.123,29.29],[-5.131,29.236],[-5.145,29.182],[-5.164,29.13],[-5.19,29.081],[-5.221,29.035],[-5.257,28.993],[-5.299,28.957],[-5.345,28.926],[-5.394,28.901],[-5.446,28.882],[-5.5,28.868],[-5.555,28.86]],[[2.68,27],[2.732,27.019],[2.78,27.046],[2.825,27.078],[2.866,27.115],[2.904,27.155],[2.938,27.198],[2.97,27.243],[2.998,27.29],[3.024,27.339],[3.047,27.389],[3.067,27.44],[3.084,27.492],[3.098,27.546],[3.108,27.6],[3.115,27.654],[3.118,27.709],[3.118,27.765],[3.115,27.819],[3.108,27.874],[3.099,27.929],[3.087,27.982],[3.073,28.036],[3.057,28.088],[3.039,28.141],[3.02,28.192],[3,28.243],[2.978,28.294],[2.956,28.345],[2.934,28.395],[2.914,28.446],[2.896,28.499],[2.883,28.552],[2.876,28.607],[2.88,28.661],[2.897,28.714],[2.926,28.76],[2.963,28.801],[3.004,28.838],[3.046,28.873],[3.088,28.91],[3.126,28.95],[3.158,28.994],[3.183,29.043],[3.2,29.096],[3.209,29.15],[3.211,29.205],[3.208,29.26],[3.198,29.314],[3.183,29.367],[3.163,29.419],[3.138,29.467],[3.107,29.513],[3.071,29.554],[3.029,29.59],[2.983,29.62],[2.933,29.643],[2.88,29.659],[2.826,29.669],[2.771,29.674],[2.716,29.674],[2.661,29.671],[2.606,29.666],[2.551,29.66],[2.497,29.652],[2.442,29.644],[2.388,29.636],[2.333,29.628],[2.279,29.619],[2.224,29.611],[2.17,29.604],[2.115,29.596],[2.061,29.588],[2.006,29.58],[1.952,29.571],[1.897,29.562],[1.843,29.553],[1.789,29.543],[1.734,29.534],[1.68,29.524],[1.626,29.514],[1.572,29.504],[1.518,29.494],[1.463,29.485],[1.409,29.476],[1.354,29.469],[1.3,29.462],[1.245,29.457],[1.19,29.453],[1.135,29.45],[1.08,29.449],[1.024,29.449],[.969,29.451],[.914,29.454],[.859,29.459],[.805,29.464],[.75,29.47],[.695,29.477],[.64,29.483],[.586,29.489],[.531,29.494],[.476,29.499],[.421,29.502],[.366,29.503],[.311,29.503],[.256,29.501],[.201,29.496],[.146,29.487],[.093,29.474],[.041,29.455],[-.007,29.429],[-.05,29.395],[-.083,29.35],[-.103,29.299],[-.111,29.245],[-.108,29.19],[-.096,29.136],[-.079,29.084],[-.055,29.034],[-.028,28.986],[.004,28.941],[.039,28.899],[.079,28.861],[.122,28.826],[.168,28.797],[.217,28.772],[.268,28.751],[.321,28.735],[.375,28.723],[.429,28.714],[.484,28.707],[.539,28.703],[.594,28.699],[.649,28.697],[.704,28.696],[.759,28.695],[.814,28.694],[.869,28.694],[.924,28.693],[.979,28.692],[1.035,28.691],[1.09,28.689],[1.145,28.687],[1.2,28.684],[1.255,28.68],[1.309,28.674],[1.364,28.668],[1.419,28.66],[1.473,28.651],[1.527,28.64],[1.581,28.628],[1.634,28.614],[1.687,28.598],[1.739,28.58],[1.79,28.56],[1.841,28.538],[1.89,28.513],[1.938,28.485],[1.984,28.455],[2.027,28.422],[2.069,28.386],[2.108,28.347],[2.145,28.305],[2.178,28.262],[2.208,28.215],[2.235,28.167],[2.257,28.117],[2.276,28.065],[2.291,28.012],[2.301,27.958],[2.309,27.903],[2.312,27.848],[2.313,27.793],[2.312,27.738],[2.309,27.683],[2.305,27.628],[2.3,27.573],[2.297,27.518],[2.294,27.463],[2.294,27.408],[2.297,27.353],[2.303,27.298],[2.314,27.244],[2.331,27.192],[2.354,27.142],[2.385,27.096],[2.422,27.056],[2.467,27.024],[2.517,27.002],[2.571,26.991],[2.626,26.99]],[[8.69,25.064],[8.744,25.074],[8.797,25.089],[8.849,25.107],[8.9,25.127],[8.95,25.15],[8.999,25.175],[9.047,25.202],[9.094,25.23],[9.141,25.26],[9.186,25.292],[9.23,25.324],[9.273,25.358],[9.316,25.393],[9.357,25.43],[9.396,25.468],[9.433,25.509],[9.468,25.551],[9.501,25.596],[9.53,25.642],[9.556,25.691],[9.579,25.741],[9.598,25.792],[9.615,25.845],[9.629,25.898],[9.64,25.952],[9.649,26.006],[9.656,26.061],[9.661,26.115],[9.665,26.17],[9.668,26.225],[9.669,26.28],[9.67,26.335],[9.669,26.39],[9.668,26.445],[9.666,26.5],[9.662,26.555],[9.657,26.61],[9.65,26.664],[9.641,26.719],[9.631,26.773],[9.618,26.826],[9.602,26.879],[9.585,26.931],[9.566,26.983],[9.545,27.033],[9.523,27.084],[9.499,27.133],[9.474,27.182],[9.448,27.231],[9.421,27.279],[9.393,27.326],[9.364,27.373],[9.334,27.419],[9.303,27.465],[9.272,27.51],[9.239,27.554],[9.205,27.597],[9.17,27.64],[9.134,27.681],[9.096,27.721],[9.057,27.76],[9.016,27.797],[8.975,27.833],[8.932,27.867],[8.887,27.899],[8.842,27.93],[8.795,27.959],[8.747,27.986],[8.698,28.012],[8.649,28.036],[8.598,28.058],[8.547,28.079],[8.496,28.098],[8.443,28.115],[8.391,28.13],[8.337,28.144],[8.284,28.156],[8.23,28.166],[8.175,28.174],[8.121,28.181],[8.066,28.186],[8.011,28.19],[7.956,28.193],[7.901,28.195],[7.846,28.195],[7.791,28.195],[7.736,28.195],[7.681,28.193],[7.626,28.19],[7.571,28.187],[7.516,28.182],[7.462,28.176],[7.407,28.169],[7.353,28.16],[7.299,28.15],[7.245,28.138],[7.192,28.126],[7.138,28.111],[7.086,28.096],[7.033,28.078],[6.982,28.06],[6.931,28.039],[6.881,28.017],[6.831,27.992],[6.783,27.966],[6.736,27.938],[6.69,27.907],[6.646,27.874],[6.603,27.839],[6.563,27.802],[6.524,27.763],[6.487,27.723],[6.452,27.68],[6.419,27.636],[6.388,27.591],[6.359,27.544],[6.331,27.497],[6.305,27.448],[6.28,27.399],[6.257,27.349],[6.235,27.299],[6.215,27.247],[6.197,27.196],[6.18,27.143],[6.164,27.091],[6.15,27.037],[6.136,26.984],[6.124,26.93],[6.113,26.876],[6.103,26.822],[6.094,26.768],[6.087,26.714],[6.08,26.659],[6.075,26.604],[6.072,26.549],[6.071,26.494],[6.071,26.439],[6.073,26.384],[6.077,26.329],[6.083,26.275],[6.091,26.22],[6.1,26.166],[6.111,26.112],[6.123,26.059],[6.137,26.005],[6.152,25.953],[6.17,25.9],[6.189,25.849],[6.21,25.798],[6.233,25.748],[6.259,25.7],[6.289,25.654],[6.323,25.61],[6.362,25.572],[6.408,25.541],[6.46,25.527],[6.513,25.54],[6.553,25.577],[6.58,25.625],[6.598,25.677],[6.611,25.73],[6.622,25.784],[6.63,25.839],[6.638,25.893],[6.645,25.948],[6.653,26.002],[6.661,26.057],[6.67,26.111],[6.68,26.165],[6.69,26.219],[6.702,26.273],[6.715,26.326],[6.729,26.379],[6.745,26.432],[6.764,26.484],[6.784,26.535],[6.807,26.585],[6.832,26.634],[6.86,26.681],[6.89,26.727],[6.922,26.772],[6.956,26.815],[6.991,26.857],[7.028,26.899],[7.065,26.939],[7.104,26.978],[7.143,27.017],[7.183,27.054],[7.224,27.091],[7.267,27.126],[7.31,27.16],[7.355,27.191],[7.402,27.22],[7.45,27.246],[7.501,27.268],[7.553,27.285],[7.607,27.294],[7.662,27.296],[7.717,27.288],[7.768,27.27],[7.815,27.24],[7.854,27.202],[7.887,27.158],[7.913,27.11],[7.934,27.059],[7.951,27.007],[7.965,26.953],[7.977,26.9],[7.986,26.845],[7.994,26.791],[8.001,26.736],[8.007,26.682],[8.012,26.627],[8.016,26.572],[8.02,26.517],[8.023,26.462],[8.026,26.407],[8.028,26.352],[8.031,26.297],[8.035,26.242],[8.038,26.188],[8.043,26.133],[8.048,26.078],[8.054,26.023],[8.061,25.969],[8.068,25.914],[8.075,25.86],[8.083,25.805],[8.091,25.751],[8.1,25.696],[8.109,25.642],[8.119,25.588],[8.13,25.534],[8.143,25.481],[8.158,25.428],[8.176,25.376],[8.197,25.325],[8.223,25.277],[8.253,25.231],[8.288,25.188],[8.328,25.15],[8.372,25.118],[8.421,25.092],[8.472,25.073],[8.526,25.061],[8.581,25.056],[8.636,25.057]],[[8.716,25.871],[8.664,25.886],[8.621,25.919],[8.59,25.964],[8.569,26.015],[8.554,26.067],[8.544,26.121],[8.537,26.175],[8.533,26.23],[8.531,26.284],[8.53,26.339],[8.531,26.393],[8.534,26.448],[8.539,26.502],[8.546,26.557],[8.555,26.611],[8.568,26.664],[8.584,26.716],[8.605,26.766],[8.632,26.814],[8.664,26.858],[8.703,26.896],[8.748,26.927],[8.799,26.946],[8.853,26.953],[8.907,26.945],[8.958,26.925],[9.003,26.894],[9.041,26.855],[9.072,26.81],[9.098,26.762],[9.117,26.711],[9.131,26.658],[9.141,26.604],[9.146,26.55],[9.147,26.495],[9.144,26.44],[9.137,26.386],[9.127,26.333],[9.112,26.28],[9.094,26.229],[9.072,26.179],[9.046,26.13],[9.017,26.084],[8.985,26.04],[8.949,25.998],[8.91,25.96],[8.868,25.926],[8.821,25.897],[8.77,25.877]],[[3.383,21.699],[3.422,21.737],[3.453,21.782],[3.477,21.831],[3.496,21.883],[3.512,21.935],[3.527,21.988],[3.54,22.041],[3.552,22.095],[3.565,22.148],[3.578,22.202],[3.593,22.254],[3.61,22.307],[3.631,22.358],[3.655,22.407],[3.684,22.453],[3.719,22.496],[3.758,22.534],[3.802,22.567],[3.85,22.594],[3.9,22.616],[3.952,22.634],[4.005,22.648],[4.059,22.658],[4.113,22.667],[4.168,22.674],[4.222,22.679],[4.277,22.685],[4.332,22.69],[4.386,22.697],[4.44,22.706],[4.494,22.718],[4.546,22.735],[4.595,22.759],[4.638,22.793],[4.671,22.837],[4.69,22.888],[4.696,22.943],[4.692,22.997],[4.682,23.051],[4.666,23.104],[4.646,23.155],[4.622,23.204],[4.593,23.251],[4.56,23.295],[4.523,23.335],[4.482,23.372],[4.437,23.403],[4.389,23.429],[4.338,23.45],[4.285,23.466],[4.232,23.479],[4.178,23.489],[4.124,23.497],[4.069,23.503],[4.015,23.509],[3.96,23.516],[3.906,23.524],[3.852,23.534],[3.799,23.548],[3.747,23.566],[3.697,23.59],[3.651,23.62],[3.61,23.656],[3.574,23.697],[3.544,23.743],[3.519,23.792],[3.497,23.842],[3.478,23.894],[3.462,23.946],[3.447,23.999],[3.433,24.052],[3.419,24.105],[3.405,24.158],[3.39,24.211],[3.373,24.263],[3.354,24.315],[3.332,24.365],[3.306,24.414],[3.276,24.459],[3.24,24.501],[3.198,24.537],[3.152,24.566],[3.102,24.588],[3.049,24.602],[2.994,24.608],[2.939,24.606],[2.885,24.596],[2.833,24.579],[2.784,24.554],[2.741,24.521],[2.704,24.48],[2.676,24.433],[2.655,24.382],[2.642,24.329],[2.634,24.275],[2.631,24.22],[2.63,24.165],[2.631,24.11],[2.631,24.055],[2.631,24],[2.627,23.946],[2.619,23.891],[2.605,23.838],[2.584,23.788],[2.554,23.742],[2.515,23.703],[2.47,23.672],[2.421,23.648],[2.369,23.63],[2.315,23.618],[2.261,23.61],[2.206,23.605],[2.151,23.603],[2.097,23.603],[2.042,23.605],[1.987,23.609],[1.932,23.614],[1.878,23.62],[1.823,23.627],[1.769,23.636],[1.715,23.645],[1.661,23.654],[1.607,23.664],[1.553,23.674],[1.499,23.684],[1.445,23.694],[1.391,23.703],[1.336,23.713],[1.282,23.722],[1.228,23.73],[1.174,23.739],[1.119,23.746],[1.065,23.754],[1.011,23.762],[.956,23.769],[.902,23.777],[.848,23.785],[.793,23.792],[.739,23.799],[.684,23.806],[.63,23.812],[.575,23.817],[.52,23.821],[.465,23.824],[.41,23.825],[.356,23.825],[.301,23.823],[.246,23.818],[.192,23.81],[.138,23.797],[.087,23.779],[.039,23.752],[-.002,23.716],[-.032,23.67],[-.05,23.618],[-.055,23.563],[-.051,23.509],[-.039,23.455],[-.02,23.404],[.005,23.355],[.033,23.308],[.066,23.264],[.103,23.223],[.142,23.185],[.185,23.15],[.229,23.118],[.276,23.088],[.324,23.062],[.373,23.038],[.424,23.017],[.476,22.999],[.529,22.984],[.582,22.971],[.636,22.961],[.69,22.952],[.745,22.946],[.799,22.941],[.854,22.938],[.909,22.935],[.964,22.933],[1.019,22.932],[1.074,22.931],[1.129,22.931],[1.184,22.93],[1.238,22.93],[1.293,22.929],[1.348,22.928],[1.403,22.926],[1.458,22.924],[1.513,22.922],[1.568,22.918],[1.622,22.914],[1.677,22.909],[1.732,22.903],[1.786,22.897],[1.841,22.89],[1.895,22.884],[1.95,22.877],[2.004,22.871],[2.059,22.865],[2.114,22.859],[2.168,22.854],[2.223,22.848],[2.277,22.842],[2.332,22.834],[2.386,22.825],[2.439,22.812],[2.491,22.795],[2.541,22.772],[2.588,22.743],[2.629,22.707],[2.663,22.664],[2.691,22.617],[2.712,22.566],[2.728,22.514],[2.741,22.46],[2.752,22.406],[2.761,22.352],[2.771,22.298],[2.781,22.244],[2.792,22.191],[2.806,22.137],[2.823,22.085],[2.842,22.034],[2.865,21.984],[2.892,21.936],[2.922,21.89],[2.956,21.847],[2.993,21.806],[3.033,21.769],[3.077,21.735],[3.123,21.707],[3.173,21.683],[3.226,21.668],[3.28,21.664],[3.334,21.673]],[[-2.307,19.816],[-2.27,19.857],[-2.243,19.904],[-2.222,19.956],[-2.207,20.008],[-2.194,20.062],[-2.183,20.116],[-2.174,20.17],[-2.165,20.225],[-2.157,20.279],[-2.149,20.334],[-2.141,20.388],[-2.134,20.443],[-2.127,20.497],[-2.121,20.552],[-2.115,20.607],[-2.111,20.662],[-2.107,20.717],[-2.103,20.772],[-2.1,20.827],[-2.097,20.882],[-2.094,20.937],[-2.09,20.992],[-2.086,21.047],[-2.081,21.102],[-2.077,21.157],[-2.071,21.211],[-2.066,21.266],[-2.061,21.321],[-2.055,21.376],[-2.051,21.431],[-2.046,21.486],[-2.042,21.541],[-2.039,21.596],[-2.036,21.651],[-2.033,21.706],[-2.03,21.761],[-2.027,21.816],[-2.025,21.871],[-2.023,21.926],[-2.022,21.981],[-2.02,22.036],[-2.019,22.091],[-2.019,22.146],[-2.018,22.201],[-2.018,22.256],[-2.018,22.312],[-2.018,22.367],[-2.018,22.422],[-2.018,22.477],[-2.018,22.532],[-2.019,22.587],[-2.019,22.642],[-2.021,22.697],[-2.022,22.752],[-2.025,22.807],[-2.028,22.862],[-2.032,22.917],[-2.038,22.972],[-2.044,23.027],[-2.052,23.081],[-2.062,23.136],[-2.073,23.189],[-2.085,23.243],[-2.1,23.296],[-2.116,23.349],[-2.134,23.401],[-2.154,23.452],[-2.177,23.502],[-2.203,23.551],[-2.232,23.598],[-2.264,23.643],[-2.299,23.685],[-2.338,23.724],[-2.38,23.76],[-2.426,23.79],[-2.475,23.815],[-2.527,23.833],[-2.581,23.841],[-2.636,23.838],[-2.689,23.823],[-2.736,23.794],[-2.776,23.756],[-2.807,23.711],[-2.833,23.662],[-2.853,23.611],[-2.869,23.558],[-2.881,23.505],[-2.892,23.451],[-2.9,23.396],[-2.906,23.341],[-2.911,23.286],[-2.915,23.232],[-2.917,23.176],[-2.919,23.121],[-2.921,23.066],[-2.922,23.011],[-2.923,22.956],[-2.924,22.901],[-2.925,22.846],[-2.927,22.791],[-2.929,22.736],[-2.933,22.681],[-2.938,22.626],[-2.946,22.572],[-2.958,22.518],[-2.973,22.465],[-2.995,22.414],[-3.023,22.367],[-3.058,22.325],[-3.1,22.289],[-3.147,22.261],[-3.198,22.24],[-3.251,22.224],[-3.305,22.213],[-3.359,22.205],[-3.414,22.199],[-3.469,22.196],[-3.524,22.193],[-3.579,22.192],[-3.634,22.191],[-3.69,22.19],[-3.745,22.19],[-3.8,22.189],[-3.855,22.189],[-3.91,22.189],[-3.965,22.188],[-4.02,22.188],[-4.075,22.186],[-4.13,22.185],[-4.185,22.183],[-4.24,22.18],[-4.295,22.177],[-4.35,22.172],[-4.405,22.167],[-4.46,22.161],[-4.515,22.155],[-4.569,22.148],[-4.624,22.142],[-4.679,22.135],[-4.734,22.129],[-4.788,22.124],[-4.843,22.12],[-4.898,22.116],[-4.953,22.113],[-5.008,22.111],[-5.063,22.108],[-5.118,22.107],[-5.174,22.105],[-5.229,22.102],[-5.284,22.1],[-5.339,22.096],[-5.394,22.092],[-5.448,22.087],[-5.503,22.082],[-5.558,22.076],[-5.613,22.069],[-5.667,22.062],[-5.722,22.055],[-5.777,22.048],[-5.831,22.041],[-5.886,22.034],[-5.94,22.026],[-5.995,22.018],[-6.049,22.008],[-6.102,21.994],[-6.155,21.976],[-6.204,21.952],[-6.247,21.918],[-6.281,21.875],[-6.303,21.825],[-6.312,21.77],[-6.311,21.715],[-6.302,21.661],[-6.286,21.608],[-6.264,21.558],[-6.238,21.509],[-6.208,21.463],[-6.174,21.42],[-6.137,21.379],[-6.097,21.341],[-6.055,21.306],[-6.01,21.274],[-5.962,21.246],[-5.913,21.221],[-5.862,21.201],[-5.809,21.185],[-5.755,21.173],[-5.701,21.166],[-5.646,21.162],[-5.591,21.162],[-5.536,21.164],[-5.481,21.168],[-5.426,21.174],[-5.371,21.181],[-5.317,21.189],[-5.262,21.197],[-5.208,21.205],[-5.153,21.214],[-5.099,21.222],[-5.045,21.231],[-4.99,21.24],[-4.936,21.248],[-4.881,21.257],[-4.827,21.265],[-4.772,21.272],[-4.718,21.28],[-4.663,21.288],[-4.609,21.295],[-4.554,21.303],[-4.499,21.31],[-4.445,21.318],[-4.39,21.325],[-4.336,21.332],[-4.281,21.339],[-4.226,21.345],[-4.171,21.35],[-4.116,21.354],[-4.061,21.357],[-4.006,21.359],[-3.951,21.36],[-3.896,21.36],[-3.841,21.359],[-3.786,21.358],[-3.731,21.355],[-3.676,21.352],[-3.621,21.347],[-3.566,21.341],[-3.511,21.334],[-3.457,21.327],[-3.402,21.318],[-3.348,21.308],[-3.294,21.297],[-3.241,21.284],[-3.188,21.27],[-3.136,21.252],[-3.085,21.229],[-3.037,21.202],[-2.994,21.168],[-2.957,21.128],[-2.927,21.081],[-2.906,21.031],[-2.891,20.978],[-2.883,20.923],[-2.879,20.868],[-2.879,20.813],[-2.881,20.758],[-2.885,20.703],[-2.889,20.648],[-2.892,20.593],[-2.895,20.538],[-2.897,20.483],[-2.896,20.428],[-2.892,20.373],[-2.885,20.318],[-2.875,20.264],[-2.861,20.211],[-2.844,20.159],[-2.822,20.108],[-2.796,20.06],[-2.766,20.013],[-2.732,19.97],[-2.695,19.929],[-2.655,19.891],[-2.611,19.858],[-2.565,19.828],[-2.516,19.804],[-2.463,19.786],[-2.409,19.78],[-2.355,19.789]],[[2.836,17.96],[2.89,17.972],[2.943,17.986],[2.996,18.002],[3.048,18.02],[3.099,18.041],[3.149,18.064],[3.197,18.09],[3.244,18.12],[3.288,18.152],[3.33,18.187],[3.37,18.226],[3.407,18.266],[3.443,18.308],[3.476,18.352],[3.507,18.397],[3.537,18.444],[3.564,18.491],[3.59,18.54],[3.614,18.589],[3.636,18.64],[3.656,18.691],[3.673,18.744],[3.686,18.797],[3.697,18.851],[3.703,18.906],[3.706,18.961],[3.705,19.016],[3.7,19.07],[3.69,19.125],[3.677,19.178],[3.661,19.231],[3.641,19.282],[3.619,19.332],[3.594,19.381],[3.567,19.429],[3.538,19.476],[3.508,19.522],[3.477,19.568],[3.445,19.613],[3.412,19.657],[3.38,19.701],[3.347,19.746],[3.316,19.791],[3.286,19.837],[3.26,19.886],[3.239,19.936],[3.228,19.99],[3.232,20.045],[3.257,20.093],[3.298,20.131],[3.346,20.157],[3.398,20.175],[3.451,20.187],[3.506,20.196],[3.56,20.202],[3.615,20.206],[3.67,20.209],[3.725,20.211],[3.78,20.212],[3.835,20.212],[3.89,20.213],[3.946,20.213],[4.001,20.213],[4.056,20.213],[4.111,20.213],[4.166,20.213],[4.221,20.213],[4.276,20.213],[4.331,20.213],[4.386,20.213],[4.441,20.214],[4.496,20.214],[4.551,20.214],[4.606,20.214],[4.661,20.215],[4.716,20.217],[4.771,20.218],[4.826,20.221],[4.881,20.225],[4.936,20.231],[4.99,20.24],[5.044,20.251],[5.097,20.266],[5.148,20.286],[5.196,20.313],[5.239,20.347],[5.275,20.389],[5.301,20.437],[5.315,20.49],[5.317,20.545],[5.309,20.599],[5.292,20.652],[5.267,20.701],[5.236,20.746],[5.199,20.787],[5.159,20.824],[5.114,20.857],[5.068,20.886],[5.019,20.911],[4.968,20.933],[4.916,20.952],[4.864,20.968],[4.811,20.982],[4.757,20.993],[4.703,21.003],[4.648,21.011],[4.594,21.018],[4.539,21.023],[4.484,21.027],[4.429,21.03],[4.374,21.033],[4.319,21.035],[4.264,21.037],[4.209,21.039],[4.154,21.042],[4.099,21.044],[4.044,21.048],[3.989,21.052],[3.934,21.057],[3.88,21.062],[3.825,21.068],[3.77,21.075],[3.716,21.082],[3.661,21.088],[3.606,21.094],[3.551,21.1],[3.497,21.104],[3.442,21.108],[3.387,21.111],[3.332,21.114],[3.277,21.115],[3.222,21.117],[3.167,21.118],[3.112,21.118],[3.057,21.119],[3.002,21.119],[2.947,21.119],[2.891,21.119],[2.836,21.119],[2.781,21.119],[2.726,21.119],[2.671,21.119],[2.616,21.119],[2.561,21.119],[2.506,21.119],[2.451,21.119],[2.396,21.119],[2.341,21.12],[2.286,21.12],[2.231,21.121],[2.176,21.122],[2.121,21.124],[2.066,21.126],[2.011,21.129],[1.956,21.132],[1.901,21.137],[1.846,21.142],[1.792,21.148],[1.737,21.154],[1.682,21.161],[1.628,21.167],[1.573,21.174],[1.518,21.18],[1.463,21.185],[1.409,21.189],[1.354,21.192],[1.299,21.195],[1.244,21.197],[1.189,21.198],[1.134,21.199],[1.079,21.199],[1.024,21.198],[.969,21.196],[.914,21.193],[.859,21.189],[.804,21.182],[.75,21.172],[.697,21.157],[.646,21.136],[.6,21.106],[.563,21.066],[.536,21.018],[.523,20.965],[.521,20.91],[.528,20.855],[.542,20.802],[.562,20.751],[.587,20.702],[.616,20.655],[.648,20.611],[.684,20.569],[.723,20.53],[.764,20.494],[.808,20.46],[.854,20.43],[.902,20.404],[.952,20.38],[1.003,20.36],[1.056,20.343],[1.109,20.328],[1.162,20.315],[1.216,20.303],[1.27,20.293],[1.324,20.283],[1.378,20.273],[1.432,20.262],[1.486,20.251],[1.54,20.238],[1.593,20.224],[1.646,20.208],[1.698,20.191],[1.749,20.172],[1.8,20.151],[1.85,20.128],[1.9,20.104],[1.948,20.078],[1.996,20.051],[2.043,20.023],[2.09,19.993],[2.136,19.963],[2.181,19.932],[2.226,19.9],[2.271,19.867],[2.314,19.834],[2.357,19.8],[2.4,19.764],[2.441,19.728],[2.482,19.691],[2.522,19.653],[2.561,19.614],[2.599,19.574],[2.635,19.533],[2.67,19.491],[2.702,19.446],[2.732,19.4],[2.758,19.351],[2.778,19.3],[2.791,19.247],[2.795,19.192],[2.787,19.138],[2.768,19.086],[2.739,19.04],[2.702,18.999],[2.659,18.964],[2.613,18.934],[2.565,18.907],[2.516,18.883],[2.466,18.861],[2.415,18.84],[2.363,18.82],[2.312,18.801],[2.26,18.782],[2.208,18.764],[2.155,18.747],[2.103,18.732],[2.05,18.717],[1.996,18.704],[1.942,18.693],[1.888,18.683],[1.834,18.676],[1.779,18.67],[1.724,18.666],[1.669,18.664],[1.614,18.664],[1.559,18.665],[1.504,18.668],[1.449,18.672],[1.394,18.677],[1.339,18.682],[1.285,18.688],[1.23,18.694],[1.175,18.698],[1.12,18.702],[1.065,18.704],[1.01,18.703],[.955,18.7],[.901,18.692],[.847,18.68],[.795,18.663],[.745,18.639],[.7,18.607],[.662,18.568],[.633,18.521],[.616,18.469],[.61,18.414],[.614,18.36],[.628,18.306],[.649,18.256],[.676,18.208],[.708,18.163],[.745,18.122],[.785,18.084],[.829,18.051],[.875,18.021],[.924,17.996],[.975,17.974],[1.027,17.957],[1.08,17.943],[1.134,17.933],[1.189,17.925],[1.243,17.919],[1.298,17.915],[1.353,17.913],[1.408,17.911],[1.463,17.91],[1.518,17.909],[1.573,17.908],[1.628,17.908],[1.683,17.908],[1.738,17.908],[1.793,17.908],[1.848,17.908],[1.904,17.908],[1.959,17.908],[2.014,17.908],[2.069,17.908],[2.124,17.908],[2.179,17.909],[2.234,17.909],[2.289,17.91],[2.344,17.911],[2.399,17.912],[2.454,17.915],[2.509,17.918],[2.564,17.922],[2.619,17.927],[2.673,17.933],[2.728,17.941],[2.782,17.95]],[[11.695,19.404],[11.739,19.436],[11.776,19.477],[11.805,19.524],[11.823,19.575],[11.831,19.63],[11.829,19.684],[11.82,19.739],[11.803,19.791],[11.781,19.841],[11.753,19.888],[11.72,19.932],[11.683,19.973],[11.643,20.011],[11.6,20.045],[11.555,20.076],[11.507,20.103],[11.457,20.127],[11.407,20.148],[11.355,20.166],[11.302,20.181],[11.249,20.194],[11.195,20.206],[11.141,20.216],[11.087,20.226],[11.032,20.234],[10.978,20.243],[10.924,20.251],[10.869,20.259],[10.815,20.266],[10.76,20.273],[10.706,20.279],[10.651,20.285],[10.596,20.29],[10.541,20.295],[10.487,20.301],[10.432,20.306],[10.377,20.312],[10.323,20.318],[10.268,20.324],[10.214,20.331],[10.159,20.338],[10.104,20.345],[10.05,20.351],[9.995,20.357],[9.941,20.363],[9.886,20.368],[9.831,20.372],[9.776,20.377],[9.721,20.381],[9.667,20.385],[9.612,20.39],[9.557,20.395],[9.502,20.4],[9.448,20.407],[9.393,20.413],[9.339,20.42],[9.284,20.427],[9.23,20.433],[9.175,20.439],[9.12,20.445],[9.065,20.45],[9.011,20.454],[8.956,20.459],[8.901,20.463],[8.846,20.467],[8.792,20.472],[8.737,20.477],[8.682,20.482],[8.627,20.489],[8.573,20.495],[8.518,20.502],[8.464,20.51],[8.409,20.517],[8.355,20.523],[8.3,20.53],[8.246,20.537],[8.191,20.543],[8.136,20.549],[8.082,20.556],[8.027,20.563],[7.973,20.57],[7.918,20.578],[7.864,20.586],[7.81,20.594],[7.755,20.602],[7.701,20.611],[7.647,20.62],[7.592,20.628],[7.538,20.636],[7.484,20.643],[7.429,20.65],[7.374,20.655],[7.319,20.658],[7.264,20.658],[7.21,20.654],[7.156,20.642],[7.105,20.623],[7.059,20.592],[7.025,20.55],[7.005,20.499],[7,20.444],[7.006,20.389],[7.021,20.337],[7.043,20.286],[7.07,20.239],[7.103,20.194],[7.139,20.153],[7.179,20.116],[7.223,20.083],[7.27,20.054],[7.319,20.029],[7.37,20.008],[7.422,19.99],[7.475,19.975],[7.528,19.961],[7.581,19.949],[7.635,19.939],[7.689,19.928],[7.743,19.918],[7.798,19.909],[7.852,19.9],[7.906,19.891],[7.96,19.882],[8.014,19.873],[8.069,19.864],[8.123,19.854],[8.177,19.845],[8.231,19.836],[8.286,19.827],[8.34,19.818],[8.394,19.809],[8.448,19.8],[8.502,19.791],[8.557,19.782],[8.611,19.773],[8.665,19.764],[8.719,19.755],[8.774,19.746],[8.828,19.737],[8.882,19.728],[8.936,19.719],[8.99,19.71],[9.045,19.701],[9.099,19.692],[9.153,19.684],[9.208,19.675],[9.262,19.667],[9.316,19.659],[9.371,19.651],[9.425,19.643],[9.48,19.636],[9.534,19.628],[9.588,19.62],[9.643,19.612],[9.697,19.605],[9.752,19.597],[9.806,19.589],[9.86,19.581],[9.915,19.573],[9.969,19.565],[10.024,19.557],[10.078,19.55],[10.133,19.542],[10.187,19.534],[10.241,19.525],[10.295,19.516],[10.35,19.507],[10.404,19.497],[10.458,19.487],[10.512,19.476],[10.566,19.465],[10.619,19.454],[10.673,19.443],[10.727,19.431],[10.781,19.42],[10.834,19.408],[10.888,19.396],[10.942,19.384],[10.996,19.373],[11.05,19.363],[11.104,19.353],[11.158,19.345],[11.213,19.338],[11.267,19.333],[11.322,19.33],[11.377,19.33],[11.432,19.332],[11.487,19.337],[11.541,19.346],[11.594,19.36],[11.646,19.378]],[[-2.258,17.291],[-2.227,17.336],[-2.21,17.388],[-2.204,17.443],[-2.209,17.497],[-2.222,17.551],[-2.24,17.603],[-2.265,17.652],[-2.294,17.699],[-2.327,17.743],[-2.365,17.783],[-2.406,17.819],[-2.451,17.851],[-2.499,17.878],[-2.549,17.902],[-2.6,17.922],[-2.653,17.939],[-2.706,17.953],[-2.759,17.965],[-2.813,17.976],[-2.868,17.986],[-2.922,17.995],[-2.976,18.003],[-3.031,18.012],[-3.085,18.021],[-3.139,18.03],[-3.194,18.04],[-3.248,18.05],[-3.302,18.062],[-3.355,18.073],[-3.409,18.086],[-3.462,18.101],[-3.515,18.117],[-3.567,18.136],[-3.617,18.158],[-3.665,18.184],[-3.711,18.216],[-3.751,18.253],[-3.784,18.297],[-3.809,18.346],[-3.824,18.399],[-3.829,18.454],[-3.826,18.509],[-3.816,18.563],[-3.8,18.615],[-3.776,18.665],[-3.747,18.711],[-3.71,18.752],[-3.666,18.786],[-3.618,18.812],[-3.566,18.83],[-3.512,18.841],[-3.457,18.846],[-3.402,18.846],[-3.347,18.843],[-3.292,18.838],[-3.238,18.83],[-3.183,18.822],[-3.129,18.813],[-3.075,18.803],[-3.021,18.794],[-2.966,18.785],[-2.912,18.776],[-2.857,18.768],[-2.803,18.761],[-2.748,18.755],[-2.693,18.75],[-2.638,18.747],[-2.583,18.745],[-2.528,18.745],[-2.473,18.748],[-2.418,18.753],[-2.364,18.762],[-2.31,18.776],[-2.259,18.795],[-2.212,18.823],[-2.171,18.861],[-2.143,18.908],[-2.129,18.961],[-2.129,19.016],[-2.14,19.07],[-2.16,19.121],[-2.186,19.169],[-2.219,19.214],[-2.256,19.254],[-2.297,19.291],[-2.341,19.323],[-2.389,19.352],[-2.438,19.377],[-2.488,19.398],[-2.54,19.418],[-2.592,19.434],[-2.645,19.449],[-2.699,19.463],[-2.752,19.475],[-2.806,19.487],[-2.86,19.497],[-2.915,19.507],[-2.969,19.516],[-3.023,19.525],[-3.078,19.533],[-3.132,19.54],[-3.187,19.547],[-3.242,19.553],[-3.296,19.56],[-3.351,19.566],[-3.406,19.573],[-3.46,19.58],[-3.515,19.588],[-3.569,19.596],[-3.624,19.604],[-3.678,19.613],[-3.733,19.622],[-3.787,19.63],[-3.842,19.639],[-3.896,19.648],[-3.95,19.657],[-4.005,19.666],[-4.059,19.675],[-4.113,19.684],[-4.168,19.694],[-4.222,19.703],[-4.276,19.712],[-4.331,19.721],[-4.385,19.73],[-4.439,19.739],[-4.494,19.748],[-4.548,19.757],[-4.602,19.766],[-4.656,19.776],[-4.711,19.785],[-4.765,19.794],[-4.819,19.804],[-4.873,19.815],[-4.927,19.825],[-4.981,19.837],[-5.035,19.849],[-5.089,19.862],[-5.142,19.875],[-5.195,19.889],[-5.249,19.903],[-5.302,19.917],[-5.355,19.931],[-5.408,19.945],[-5.462,19.958],[-5.515,19.971],[-5.569,19.983],[-5.623,19.994],[-5.677,20.003],[-5.732,20.011],[-5.787,20.018],[-5.842,20.021],[-5.897,20.022],[-5.952,20.02],[-6.006,20.013],[-6.06,20],[-6.111,19.979],[-6.155,19.947],[-6.189,19.904],[-6.209,19.853],[-6.213,19.798],[-6.206,19.743],[-6.191,19.691],[-6.169,19.64],[-6.142,19.592],[-6.112,19.546],[-6.078,19.503],[-6.041,19.462],[-6.002,19.423],[-5.96,19.387],[-5.916,19.354],[-5.87,19.324],[-5.822,19.296],[-5.773,19.272],[-5.722,19.25],[-5.67,19.231],[-5.618,19.215],[-5.565,19.2],[-5.511,19.188],[-5.457,19.177],[-5.403,19.168],[-5.348,19.159],[-5.294,19.152],[-5.239,19.144],[-5.185,19.137],[-5.13,19.13],[-5.075,19.121],[-5.021,19.112],[-4.967,19.101],[-4.914,19.089],[-4.861,19.073],[-4.809,19.055],[-4.758,19.033],[-4.71,19.007],[-4.665,18.975],[-4.625,18.937],[-4.591,18.894],[-4.565,18.845],[-4.546,18.794],[-4.536,18.74],[-4.533,18.685],[-4.537,18.63],[-4.55,18.576],[-4.572,18.526],[-4.604,18.481],[-4.645,18.444],[-4.693,18.418],[-4.745,18.401],[-4.8,18.391],[-4.854,18.387],[-4.91,18.387],[-4.965,18.389],[-5.02,18.392],[-5.074,18.397],[-5.129,18.402],[-5.184,18.407],[-5.239,18.413],[-5.294,18.42],[-5.348,18.426],[-5.403,18.433],[-5.458,18.44],[-5.512,18.447],[-5.567,18.453],[-5.622,18.458],[-5.677,18.463],[-5.732,18.466],[-5.787,18.466],[-5.842,18.465],[-5.897,18.46],[-5.951,18.452],[-6.005,18.439],[-6.056,18.42],[-6.104,18.392],[-6.144,18.355],[-6.173,18.308],[-6.187,18.255],[-6.188,18.2],[-6.178,18.146],[-6.161,18.094],[-6.137,18.044],[-6.109,17.997],[-6.076,17.953],[-6.04,17.911],[-6,17.873],[-5.958,17.838],[-5.913,17.806],[-5.866,17.778],[-5.816,17.753],[-5.766,17.732],[-5.714,17.713],[-5.661,17.698],[-5.607,17.684],[-5.554,17.673],[-5.499,17.663],[-5.445,17.653],[-5.391,17.645],[-5.336,17.636],[-5.282,17.627],[-5.228,17.619],[-5.173,17.61],[-5.119,17.601],[-5.065,17.592],[-5.01,17.583],[-4.956,17.574],[-4.901,17.565],[-4.847,17.556],[-4.793,17.547],[-4.738,17.538],[-4.684,17.529],[-4.63,17.52],[-4.575,17.511],[-4.521,17.502],[-4.467,17.492],[-4.413,17.483],[-4.358,17.474],[-4.304,17.464],[-4.25,17.454],[-4.196,17.444],[-4.141,17.434],[-4.087,17.424],[-4.033,17.414],[-3.979,17.403],[-3.925,17.393],[-3.871,17.383],[-3.817,17.373],[-3.763,17.363],[-3.708,17.354],[-3.654,17.344],[-3.6,17.335],[-3.545,17.326],[-3.491,17.317],[-3.437,17.308],[-3.382,17.298],[-3.328,17.289],[-3.274,17.28],[-3.219,17.271],[-3.165,17.262],[-3.111,17.253],[-3.056,17.244],[-3.002,17.236],[-2.948,17.227],[-2.893,17.219],[-2.839,17.211],[-2.784,17.204],[-2.729,17.198],[-2.674,17.194],[-2.619,17.191],[-2.564,17.191],[-2.509,17.193],[-2.454,17.2],[-2.401,17.211],[-2.349,17.229],[-2.3,17.255]],[[-7.229,16.413],[-7.188,16.449],[-7.16,16.496],[-7.148,16.549],[-7.151,16.604],[-7.164,16.657],[-7.185,16.708],[-7.211,16.756],[-7.242,16.802],[-7.275,16.846],[-7.31,16.888],[-7.346,16.93],[-7.383,16.97],[-7.421,17.01],[-7.459,17.05],[-7.497,17.089],[-7.536,17.128],[-7.574,17.168],[-7.612,17.207],[-7.651,17.247],[-7.688,17.287],[-7.726,17.327],[-7.763,17.368],[-7.8,17.409],[-7.836,17.45],[-7.872,17.492],[-7.907,17.533],[-7.943,17.575],[-7.978,17.618],[-8.014,17.66],[-8.049,17.701],[-8.085,17.743],[-8.121,17.785],[-8.157,17.827],[-8.192,17.868],[-8.227,17.911],[-8.261,17.954],[-8.293,17.999],[-8.321,18.046],[-8.344,18.096],[-8.359,18.149],[-8.362,18.204],[-8.352,18.258],[-8.33,18.308],[-8.3,18.354],[-8.265,18.396],[-8.226,18.435],[-8.185,18.471],[-8.142,18.506],[-8.098,18.539],[-8.053,18.571],[-8.008,18.603],[-7.963,18.633],[-7.916,18.663],[-7.87,18.692],[-7.822,18.72],[-7.775,18.747],[-7.726,18.773],[-7.677,18.798],[-7.628,18.822],[-7.578,18.846],[-7.528,18.868],[-7.478,18.892],[-7.429,18.916],[-7.381,18.942],[-7.334,18.972],[-7.291,19.006],[-7.253,19.045],[-7.222,19.09],[-7.199,19.14],[-7.185,19.193],[-7.18,19.248],[-7.184,19.303],[-7.196,19.356],[-7.216,19.408],[-7.243,19.456],[-7.276,19.499],[-7.317,19.536],[-7.363,19.566],[-7.413,19.587],[-7.467,19.6],[-7.522,19.605],[-7.576,19.603],[-7.631,19.597],[-7.685,19.586],[-7.738,19.574],[-7.791,19.559],[-7.844,19.543],[-7.896,19.526],[-7.948,19.508],[-8,19.489],[-8.051,19.469],[-8.102,19.448],[-8.153,19.427],[-8.203,19.404],[-8.252,19.38],[-8.301,19.355],[-8.35,19.33],[-8.398,19.304],[-8.447,19.278],[-8.495,19.251],[-8.543,19.225],[-8.591,19.198],[-8.64,19.172],[-8.688,19.146],[-8.737,19.121],[-8.786,19.095],[-8.835,19.071],[-8.884,19.046],[-8.933,19.022],[-8.983,18.998],[-9.033,18.975],[-9.083,18.953],[-9.134,18.932],[-9.185,18.913],[-9.237,18.895],[-9.29,18.879],[-9.343,18.865],[-9.397,18.854],[-9.451,18.845],[-9.506,18.839],[-9.561,18.835],[-9.616,18.834],[-9.671,18.835],[-9.726,18.837],[-9.78,18.842],[-9.835,18.847],[-9.89,18.854],[-9.944,18.862],[-9.998,18.87],[-10.053,18.879],[-10.107,18.889],[-10.161,18.899],[-10.215,18.91],[-10.268,18.921],[-10.322,18.933],[-10.375,18.946],[-10.429,18.96],[-10.482,18.974],[-10.535,18.987],[-10.589,19.001],[-10.642,19.013],[-10.696,19.025],[-10.749,19.037],[-10.803,19.047],[-10.857,19.057],[-10.912,19.067],[-10.966,19.077],[-11.02,19.087],[-11.074,19.097],[-11.127,19.108],[-11.181,19.12],[-11.235,19.133],[-11.288,19.145],[-11.342,19.158],[-11.395,19.17],[-11.449,19.181],[-11.503,19.191],[-11.558,19.2],[-11.612,19.207],[-11.667,19.212],[-11.722,19.214],[-11.777,19.213],[-11.831,19.207],[-11.885,19.194],[-11.935,19.172],[-11.978,19.139],[-12.011,19.094],[-12.029,19.043],[-12.034,18.988],[-12.028,18.933],[-12.015,18.88],[-11.995,18.829],[-11.971,18.779],[-11.943,18.732],[-11.912,18.687],[-11.878,18.644],[-11.841,18.603],[-11.801,18.565],[-11.759,18.53],[-11.715,18.497],[-11.669,18.467],[-11.621,18.44],[-11.572,18.416],[-11.521,18.394],[-11.47,18.374],[-11.418,18.356],[-11.366,18.339],[-11.313,18.324],[-11.26,18.309],[-11.207,18.296],[-11.153,18.283],[-11.1,18.27],[-11.046,18.258],[-10.993,18.245],[-10.939,18.233],[-10.886,18.221],[-10.832,18.208],[-10.779,18.195],[-10.725,18.181],[-10.672,18.167],[-10.619,18.152],[-10.566,18.138],[-10.513,18.123],[-10.46,18.108],[-10.408,18.093],[-10.355,18.078],[-10.302,18.062],[-10.249,18.047],[-10.197,18.031],[-10.144,18.014],[-10.092,17.997],[-10.04,17.978],[-9.989,17.959],[-9.937,17.939],[-9.887,17.918],[-9.836,17.897],[-9.786,17.874],[-9.736,17.851],[-9.686,17.828],[-9.637,17.804],[-9.588,17.779],[-9.539,17.754],[-9.49,17.728],[-9.442,17.702],[-9.394,17.676],[-9.346,17.649],[-9.298,17.621],[-9.251,17.594],[-9.203,17.566],[-9.156,17.537],[-9.109,17.508],[-9.063,17.479],[-9.017,17.449],[-8.971,17.419],[-8.926,17.388],[-8.881,17.355],[-8.837,17.322],[-8.794,17.288],[-8.752,17.253],[-8.71,17.218],[-8.669,17.181],[-8.628,17.144],[-8.588,17.107],[-8.547,17.07],[-8.507,17.032],[-8.467,16.995],[-8.426,16.958],[-8.385,16.921],[-8.343,16.885],[-8.301,16.85],[-8.259,16.815],[-8.216,16.78],[-8.173,16.747],[-8.129,16.713],[-8.085,16.681],[-8.04,16.649],[-7.994,16.618],[-7.948,16.588],[-7.901,16.56],[-7.853,16.532],[-7.805,16.507],[-7.756,16.483],[-7.705,16.46],[-7.654,16.44],[-7.603,16.421],[-7.55,16.405],[-7.497,16.392],[-7.443,16.382],[-7.388,16.377],[-7.333,16.379],[-7.279,16.39]],[[8.301,16.518],[8.356,16.512],[8.411,16.508],[8.466,16.506],[8.521,16.505],[8.576,16.506],[8.631,16.506],[8.686,16.508],[8.741,16.509],[8.796,16.511],[8.851,16.514],[8.906,16.518],[8.961,16.523],[9.015,16.53],[9.07,16.538],[9.124,16.549],[9.177,16.562],[9.23,16.579],[9.281,16.598],[9.332,16.619],[9.381,16.644],[9.429,16.671],[9.475,16.701],[9.519,16.734],[9.561,16.77],[9.601,16.808],[9.638,16.849],[9.671,16.892],[9.701,16.939],[9.727,16.987],[9.75,17.037],[9.768,17.089],[9.784,17.142],[9.795,17.196],[9.804,17.25],[9.81,17.305],[9.813,17.36],[9.813,17.415],[9.81,17.47],[9.806,17.525],[9.799,17.579],[9.79,17.634],[9.779,17.688],[9.767,17.741],[9.752,17.794],[9.736,17.847],[9.717,17.899],[9.697,17.95],[9.674,18],[9.649,18.049],[9.621,18.097],[9.592,18.143],[9.56,18.188],[9.527,18.232],[9.492,18.274],[9.455,18.315],[9.418,18.355],[9.379,18.394],[9.339,18.432],[9.297,18.469],[9.255,18.504],[9.212,18.538],[9.167,18.57],[9.121,18.6],[9.074,18.628],[9.025,18.655],[8.976,18.679],[8.926,18.702],[8.875,18.722],[8.823,18.742],[8.771,18.759],[8.719,18.776],[8.666,18.791],[8.613,18.806],[8.559,18.819],[8.505,18.831],[8.452,18.842],[8.397,18.852],[8.343,18.861],[8.288,18.868],[8.234,18.873],[8.179,18.876],[8.124,18.878],[8.069,18.877],[8.014,18.873],[7.959,18.867],[7.905,18.857],[7.851,18.844],[7.799,18.827],[7.748,18.806],[7.699,18.781],[7.652,18.753],[7.606,18.722],[7.563,18.689],[7.521,18.653],[7.481,18.615],[7.443,18.575],[7.408,18.533],[7.374,18.489],[7.343,18.443],[7.316,18.396],[7.292,18.346],[7.271,18.295],[7.254,18.243],[7.24,18.19],[7.23,18.136],[7.222,18.081],[7.217,18.026],[7.214,17.971],[7.212,17.916],[7.212,17.861],[7.214,17.806],[7.217,17.751],[7.221,17.697],[7.228,17.642],[7.236,17.588],[7.247,17.534],[7.26,17.48],[7.276,17.427],[7.294,17.375],[7.315,17.324],[7.338,17.275],[7.364,17.226],[7.392,17.178],[7.422,17.132],[7.453,17.087],[7.487,17.043],[7.522,17.001],[7.558,16.96],[7.596,16.92],[7.635,16.881],[7.676,16.844],[7.717,16.807],[7.76,16.773],[7.804,16.739],[7.848,16.707],[7.894,16.677],[7.941,16.648],[7.99,16.622],[8.039,16.597],[8.089,16.575],[8.141,16.556],[8.193,16.54],[8.247,16.527]],[[8.853,17.233],[8.8,17.218],[8.747,17.208],[8.692,17.202],[8.638,17.2],[8.583,17.202],[8.529,17.208],[8.475,17.218],[8.423,17.232],[8.371,17.25],[8.321,17.272],[8.273,17.298],[8.226,17.326],[8.182,17.359],[8.141,17.394],[8.102,17.432],[8.066,17.474],[8.033,17.517],[8.005,17.564],[7.98,17.613],[7.961,17.664],[7.947,17.716],[7.941,17.771],[7.942,17.825],[7.952,17.879],[7.97,17.93],[7.996,17.978],[8.028,18.022],[8.067,18.061],[8.11,18.094],[8.157,18.122],[8.207,18.143],[8.259,18.159],[8.313,18.169],[8.368,18.172],[8.422,18.17],[8.476,18.162],[8.529,18.15],[8.581,18.133],[8.632,18.113],[8.681,18.09],[8.729,18.063],[8.775,18.034],[8.82,18.003],[8.862,17.968],[8.903,17.932],[8.941,17.893],[8.977,17.851],[9.009,17.807],[9.038,17.761],[9.062,17.712],[9.082,17.661],[9.095,17.608],[9.101,17.554],[9.098,17.499],[9.086,17.446],[9.064,17.396],[9.033,17.351],[8.995,17.312],[8.951,17.28],[8.903,17.254]],[[-9.353,14.348],[-9.3,14.364],[-9.249,14.383],[-9.197,14.403],[-9.147,14.426],[-9.098,14.451],[-9.051,14.478],[-9.004,14.508],[-8.959,14.539],[-8.915,14.573],[-8.874,14.609],[-8.834,14.647],[-8.796,14.687],[-8.76,14.729],[-8.727,14.773],[-8.697,14.819],[-8.669,14.866],[-8.644,14.915],[-8.622,14.965],[-8.602,15.017],[-8.586,15.069],[-8.572,15.123],[-8.562,15.177],[-8.555,15.231],[-8.551,15.286],[-8.55,15.341],[-8.552,15.396],[-8.557,15.451],[-8.564,15.506],[-8.574,15.56],[-8.586,15.614],[-8.6,15.667],[-8.617,15.719],[-8.634,15.771],[-8.654,15.823],[-8.675,15.874],[-8.697,15.924],[-8.72,15.974],[-8.745,16.023],[-8.77,16.072],[-8.797,16.12],[-8.824,16.168],[-8.851,16.216],[-8.879,16.263],[-8.908,16.31],[-8.937,16.357],[-8.967,16.403],[-8.998,16.449],[-9.029,16.494],[-9.062,16.538],[-9.096,16.581],[-9.132,16.624],[-9.169,16.664],[-9.207,16.704],[-9.247,16.742],[-9.287,16.779],[-9.329,16.815],[-9.372,16.849],[-9.415,16.883],[-9.459,16.916],[-9.504,16.948],[-9.55,16.979],[-9.596,17.009],[-9.643,17.037],[-9.691,17.064],[-9.74,17.09],[-9.79,17.113],[-9.84,17.136],[-9.891,17.156],[-9.943,17.175],[-9.995,17.193],[-10.047,17.21],[-10.1,17.225],[-10.153,17.24],[-10.207,17.253],[-10.26,17.265],[-10.314,17.276],[-10.368,17.286],[-10.423,17.295],[-10.477,17.302],[-10.532,17.307],[-10.587,17.31],[-10.642,17.311],[-10.697,17.309],[-10.752,17.305],[-10.807,17.299],[-10.861,17.29],[-10.915,17.278],[-10.968,17.263],[-11.02,17.245],[-11.071,17.224],[-11.12,17.201],[-11.169,17.175],[-11.216,17.146],[-11.261,17.115],[-11.304,17.081],[-11.346,17.045],[-11.386,17.006],[-11.423,16.966],[-11.459,16.924],[-11.493,16.881],[-11.524,16.836],[-11.554,16.79],[-11.582,16.742],[-11.608,16.693],[-11.631,16.644],[-11.652,16.593],[-11.67,16.541],[-11.686,16.488],[-11.699,16.435],[-11.71,16.381],[-11.719,16.326],[-11.727,16.272],[-11.732,16.217],[-11.737,16.162],[-11.739,16.107],[-11.74,16.052],[-11.74,15.997],[-11.737,15.942],[-11.731,15.887],[-11.724,15.833],[-11.714,15.779],[-11.701,15.725],[-11.687,15.672],[-11.67,15.62],[-11.651,15.568],[-11.63,15.517],[-11.607,15.467],[-11.582,15.418],[-11.557,15.369],[-11.529,15.322],[-11.501,15.275],[-11.471,15.228],[-11.439,15.183],[-11.407,15.139],[-11.373,15.095],[-11.337,15.053],[-11.301,15.012],[-11.262,14.973],[-11.223,14.934],[-11.182,14.897],[-11.141,14.861],[-11.098,14.827],[-11.055,14.793],[-11.011,14.76],[-10.966,14.728],[-10.92,14.697],[-10.874,14.666],[-10.828,14.637],[-10.78,14.61],[-10.732,14.583],[-10.683,14.558],[-10.634,14.533],[-10.583,14.511],[-10.533,14.489],[-10.482,14.468],[-10.431,14.448],[-10.379,14.43],[-10.327,14.412],[-10.274,14.395],[-10.222,14.379],[-10.169,14.364],[-10.115,14.35],[-10.062,14.338],[-10.008,14.327],[-9.953,14.318],[-9.899,14.311],[-9.844,14.306],[-9.789,14.302],[-9.734,14.301],[-9.679,14.301],[-9.624,14.304],[-9.569,14.308],[-9.515,14.315],[-9.46,14.324],[-9.406,14.335]],[[-9.739,15.109],[-9.794,15.101],[-9.849,15.098],[-9.904,15.101],[-9.959,15.107],[-10.013,15.118],[-10.067,15.131],[-10.119,15.147],[-10.171,15.165],[-10.222,15.186],[-10.273,15.209],[-10.322,15.234],[-10.37,15.261],[-10.417,15.29],[-10.462,15.322],[-10.506,15.355],[-10.548,15.39],[-10.59,15.427],[-10.629,15.465],[-10.667,15.505],[-10.704,15.546],[-10.739,15.589],[-10.771,15.634],[-10.801,15.681],[-10.827,15.729],[-10.849,15.78],[-10.865,15.832],[-10.876,15.887],[-10.878,15.942],[-10.873,15.996],[-10.859,16.05],[-10.836,16.1],[-10.807,16.146],[-10.771,16.188],[-10.73,16.225],[-10.685,16.257],[-10.637,16.284],[-10.586,16.306],[-10.534,16.324],[-10.48,16.337],[-10.426,16.345],[-10.371,16.35],[-10.316,16.35],[-10.261,16.346],[-10.206,16.338],[-10.152,16.326],[-10.099,16.312],[-10.047,16.295],[-9.995,16.275],[-9.944,16.253],[-9.895,16.23],[-9.846,16.204],[-9.798,16.176],[-9.751,16.147],[-9.706,16.116],[-9.661,16.083],[-9.618,16.049],[-9.576,16.013],[-9.536,15.975],[-9.497,15.936],[-9.46,15.896],[-9.425,15.853],[-9.392,15.808],[-9.363,15.761],[-9.339,15.712],[-9.32,15.66],[-9.309,15.606],[-9.306,15.551],[-9.313,15.497],[-9.328,15.444],[-9.351,15.393],[-9.38,15.346],[-9.413,15.303],[-9.451,15.263],[-9.493,15.226],[-9.537,15.194],[-9.584,15.165],[-9.634,15.141],[-9.686,15.122]],[[-5.625,14.187],[-5.571,14.193],[-5.516,14.201],[-5.462,14.211],[-5.409,14.222],[-5.355,14.234],[-5.302,14.247],[-5.248,14.26],[-5.195,14.272],[-5.142,14.285],[-5.088,14.298],[-5.035,14.31],[-4.981,14.322],[-4.928,14.334],[-4.874,14.346],[-4.82,14.357],[-4.767,14.369],[-4.713,14.38],[-4.659,14.391],[-4.605,14.401],[-4.551,14.412],[-4.498,14.423],[-4.444,14.434],[-4.39,14.445],[-4.336,14.456],[-4.283,14.468],[-4.229,14.479],[-4.175,14.491],[-4.122,14.503],[-4.068,14.516],[-4.015,14.528],[-3.962,14.541],[-3.908,14.554],[-3.855,14.567],[-3.802,14.58],[-3.748,14.594],[-3.695,14.607],[-3.642,14.62],[-3.589,14.633],[-3.535,14.647],[-3.482,14.66],[-3.429,14.673],[-3.375,14.686],[-3.322,14.699],[-3.269,14.711],[-3.215,14.724],[-3.162,14.736],[-3.108,14.748],[-3.054,14.76],[-3.001,14.771],[-2.947,14.783],[-2.894,14.795],[-2.84,14.807],[-2.786,14.819],[-2.733,14.832],[-2.68,14.845],[-2.627,14.859],[-2.574,14.874],[-2.522,14.891],[-2.47,14.91],[-2.42,14.931],[-2.371,14.956],[-2.325,14.986],[-2.283,15.022],[-2.249,15.065],[-2.226,15.114],[-2.215,15.168],[-2.216,15.223],[-2.227,15.276],[-2.244,15.329],[-2.267,15.379],[-2.293,15.427],[-2.323,15.473],[-2.356,15.517],[-2.391,15.559],[-2.428,15.599],[-2.468,15.637],[-2.509,15.674],[-2.551,15.708],[-2.595,15.741],[-2.641,15.772],[-2.687,15.802],[-2.733,15.831],[-2.78,15.859],[-2.828,15.887],[-2.875,15.915],[-2.923,15.942],[-2.97,15.97],[-3.018,15.997],[-3.065,16.025],[-3.113,16.052],[-3.16,16.079],[-3.208,16.106],[-3.256,16.133],[-3.305,16.159],[-3.353,16.185],[-3.402,16.21],[-3.45,16.235],[-3.499,16.26],[-3.548,16.285],[-3.597,16.31],[-3.646,16.334],[-3.695,16.359],[-3.744,16.384],[-3.794,16.408],[-3.843,16.432],[-3.892,16.457],[-3.941,16.481],[-3.991,16.505],[-4.04,16.528],[-4.09,16.552],[-4.14,16.575],[-4.19,16.598],[-4.24,16.62],[-4.29,16.643],[-4.34,16.665],[-4.39,16.688],[-4.44,16.711],[-4.489,16.735],[-4.538,16.759],[-4.587,16.784],[-4.636,16.81],[-4.684,16.836],[-4.732,16.862],[-4.78,16.889],[-4.828,16.915],[-4.876,16.942],[-4.925,16.968],[-4.973,16.994],[-5.022,17.019],[-5.07,17.044],[-5.119,17.069],[-5.168,17.094],[-5.218,17.118],[-5.267,17.141],[-5.317,17.164],[-5.368,17.185],[-5.419,17.205],[-5.471,17.222],[-5.524,17.236],[-5.578,17.246],[-5.633,17.25],[-5.688,17.248],[-5.742,17.238],[-5.793,17.219],[-5.84,17.191],[-5.881,17.155],[-5.913,17.11],[-5.934,17.06],[-5.943,17.006],[-5.941,16.951],[-5.928,16.898],[-5.906,16.848],[-5.877,16.801],[-5.843,16.758],[-5.805,16.719],[-5.764,16.682],[-5.721,16.647],[-5.677,16.615],[-5.632,16.584],[-5.586,16.553],[-5.54,16.523],[-5.494,16.493],[-5.448,16.463],[-5.403,16.432],[-5.358,16.4],[-5.315,16.366],[-5.274,16.33],[-5.235,16.291],[-5.2,16.249],[-5.169,16.204],[-5.143,16.156],[-5.121,16.105],[-5.105,16.053],[-5.093,15.999],[-5.084,15.945],[-5.077,15.891],[-5.073,15.836],[-5.071,15.781],[-5.07,15.726],[-5.071,15.671],[-5.073,15.616],[-5.077,15.562],[-5.083,15.507],[-5.091,15.453],[-5.103,15.399],[-5.119,15.347],[-5.139,15.296],[-5.164,15.247],[-5.195,15.202],[-5.231,15.16],[-5.271,15.123],[-5.315,15.09],[-5.361,15.061],[-5.41,15.035],[-5.46,15.013],[-5.511,14.992],[-5.562,14.973],[-5.613,14.953],[-5.665,14.934],[-5.715,14.912],[-5.764,14.888],[-5.812,14.86],[-5.856,14.827],[-5.896,14.79],[-5.93,14.747],[-5.958,14.7],[-5.979,14.649],[-5.994,14.596],[-6.001,14.542],[-6.001,14.487],[-5.994,14.433],[-5.979,14.38],[-5.957,14.33],[-5.926,14.285],[-5.887,14.247],[-5.84,14.218],[-5.789,14.199],[-5.735,14.188],[-5.68,14.185]],[[-4.127,15.356],[-4.182,15.366],[-4.233,15.389],[-4.277,15.423],[-4.31,15.468],[-4.329,15.521],[-4.332,15.577],[-4.318,15.631],[-4.286,15.676],[-4.238,15.704],[-4.183,15.713],[-4.127,15.709],[-4.073,15.695],[-4.021,15.675],[-3.971,15.649],[-3.924,15.618],[-3.882,15.581],[-3.85,15.536],[-3.841,15.481],[-3.867,15.432],[-3.911,15.398],[-3.962,15.376],[-4.016,15.361],[-4.071,15.354]],[[3.087,16.221],[3.141,16.228],[3.196,16.236],[3.251,16.243],[3.305,16.252],[3.36,16.26],[3.414,16.27],[3.468,16.282],[3.521,16.297],[3.573,16.316],[3.622,16.342],[3.665,16.376],[3.699,16.419],[3.721,16.47],[3.728,16.525],[3.722,16.58],[3.706,16.632],[3.682,16.682],[3.652,16.728],[3.616,16.771],[3.577,16.809],[3.534,16.844],[3.488,16.875],[3.44,16.902],[3.39,16.925],[3.338,16.945],[3.286,16.961],[3.232,16.975],[3.178,16.987],[3.124,16.998],[3.07,17.007],[3.015,17.016],[2.961,17.024],[2.906,17.033],[2.851,17.04],[2.797,17.048],[2.742,17.055],[2.687,17.061],[2.632,17.066],[2.577,17.071],[2.522,17.075],[2.467,17.078],[2.412,17.08],[2.356,17.081],[2.301,17.083],[2.246,17.083],[2.191,17.084],[2.136,17.084],[2.08,17.084],[2.025,17.084],[1.97,17.085],[1.915,17.085],[1.859,17.085],[1.804,17.085],[1.749,17.085],[1.694,17.085],[1.639,17.084],[1.583,17.084],[1.528,17.084],[1.473,17.084],[1.418,17.083],[1.362,17.082],[1.307,17.081],[1.252,17.079],[1.197,17.075],[1.142,17.07],[1.087,17.062],[1.033,17.052],[.98,17.036],[.929,17.014],[.883,16.984],[.846,16.944],[.821,16.895],[.81,16.841],[.812,16.786],[.824,16.732],[.842,16.68],[.866,16.63],[.895,16.583],[.927,16.538],[.963,16.496],[1.001,16.456],[1.042,16.419],[1.085,16.385],[1.131,16.353],[1.178,16.325],[1.227,16.299],[1.277,16.277],[1.329,16.257],[1.382,16.24],[1.435,16.226],[1.489,16.215],[1.543,16.206],[1.598,16.198],[1.653,16.193],[1.708,16.188],[1.763,16.185],[1.818,16.183],[1.874,16.182],[1.929,16.181],[1.984,16.18],[2.039,16.179],[2.095,16.179],[2.15,16.179],[2.205,16.179],[2.26,16.179],[2.315,16.179],[2.371,16.179],[2.426,16.18],[2.481,16.18],[2.536,16.181],[2.592,16.182],[2.647,16.183],[2.702,16.185],[2.757,16.188],[2.812,16.192],[2.867,16.196],[2.922,16.201],[2.977,16.207],[3.032,16.214]],[[5.271,15.82],[5.312,15.856],[5.345,15.9],[5.369,15.95],[5.384,16.003],[5.389,16.058],[5.386,16.113],[5.375,16.167],[5.357,16.22],[5.333,16.269],[5.304,16.316],[5.27,16.359],[5.231,16.399],[5.189,16.435],[5.143,16.465],[5.094,16.489],[5.041,16.507],[4.987,16.516],[4.932,16.516],[4.878,16.504],[4.828,16.481],[4.785,16.446],[4.752,16.402],[4.73,16.351],[4.719,16.297],[4.716,16.242],[4.722,16.187],[4.734,16.134],[4.752,16.081],[4.776,16.031],[4.804,15.984],[4.837,15.939],[4.873,15.898],[4.914,15.861],[4.959,15.829],[5.008,15.803],[5.06,15.785],[5.114,15.776],[5.169,15.779],[5.223,15.793]],[[9.165,13.872],[9.215,13.894],[9.264,13.919],[9.311,13.948],[9.356,13.979],[9.399,14.014],[9.439,14.051],[9.477,14.092],[9.512,14.134],[9.543,14.18],[9.57,14.227],[9.594,14.277],[9.614,14.328],[9.63,14.381],[9.642,14.435],[9.65,14.489],[9.656,14.544],[9.659,14.599],[9.659,14.654],[9.658,14.709],[9.654,14.764],[9.647,14.818],[9.638,14.873],[9.627,14.926],[9.614,14.98],[9.597,15.032],[9.579,15.084],[9.558,15.135],[9.535,15.185],[9.511,15.234],[9.485,15.283],[9.457,15.331],[9.429,15.378],[9.399,15.424],[9.368,15.469],[9.336,15.514],[9.303,15.558],[9.27,15.602],[9.235,15.645],[9.2,15.687],[9.163,15.728],[9.126,15.769],[9.088,15.809],[9.05,15.848],[9.011,15.887],[8.971,15.924],[8.93,15.961],[8.888,15.997],[8.846,16.032],[8.802,16.065],[8.757,16.097],[8.711,16.127],[8.663,16.155],[8.615,16.181],[8.565,16.205],[8.515,16.227],[8.464,16.247],[8.412,16.266],[8.36,16.283],[8.307,16.298],[8.253,16.311],[8.2,16.322],[8.145,16.331],[8.091,16.338],[8.036,16.342],[7.981,16.345],[7.926,16.345],[7.871,16.344],[7.816,16.342],[7.761,16.338],[7.706,16.334],[7.651,16.327],[7.597,16.318],[7.543,16.307],[7.49,16.292],[7.439,16.274],[7.389,16.251],[7.341,16.223],[7.297,16.19],[7.256,16.153],[7.22,16.112],[7.188,16.067],[7.16,16.02],[7.136,15.97],[7.115,15.919],[7.098,15.867],[7.084,15.814],[7.073,15.76],[7.064,15.706],[7.057,15.651],[7.053,15.596],[7.05,15.541],[7.049,15.486],[7.049,15.431],[7.051,15.376],[7.054,15.321],[7.059,15.266],[7.065,15.212],[7.073,15.157],[7.084,15.103],[7.096,15.05],[7.11,14.997],[7.126,14.944],[7.145,14.892],[7.166,14.841],[7.188,14.791],[7.214,14.742],[7.241,14.694],[7.27,14.648],[7.301,14.603],[7.334,14.558],[7.368,14.515],[7.404,14.473],[7.44,14.432],[7.478,14.392],[7.516,14.353],[7.556,14.314],[7.596,14.276],[7.636,14.239],[7.678,14.203],[7.72,14.168],[7.764,14.134],[7.808,14.102],[7.853,14.07],[7.899,14.041],[7.947,14.012],[7.994,13.985],[8.043,13.96],[8.093,13.935],[8.143,13.913],[8.194,13.892],[8.246,13.874],[8.298,13.857],[8.351,13.843],[8.405,13.831],[8.459,13.821],[8.514,13.813],[8.568,13.808],[8.623,13.804],[8.678,13.801],[8.733,13.801],[8.788,13.802],[8.843,13.805],[8.898,13.81],[8.953,13.817],[9.007,13.826],[9.06,13.838],[9.113,13.854]],[[8.777,14.451],[8.723,14.443],[8.669,14.44],[8.614,14.442],[8.56,14.448],[8.506,14.458],[8.453,14.471],[8.4,14.486],[8.348,14.502],[8.296,14.521],[8.245,14.541],[8.195,14.562],[8.146,14.586],[8.097,14.611],[8.05,14.639],[8.005,14.67],[7.962,14.703],[7.921,14.74],[7.883,14.779],[7.848,14.822],[7.818,14.867],[7.792,14.915],[7.771,14.966],[7.756,15.018],[7.745,15.072],[7.74,15.126],[7.741,15.181],[7.748,15.235],[7.762,15.288],[7.781,15.339],[7.808,15.387],[7.841,15.431],[7.88,15.469],[7.925,15.5],[7.973,15.526],[8.024,15.545],[8.077,15.558],[8.132,15.566],[8.186,15.569],[8.241,15.569],[8.295,15.565],[8.35,15.557],[8.403,15.547],[8.456,15.534],[8.509,15.518],[8.56,15.5],[8.611,15.479],[8.66,15.455],[8.708,15.428],[8.754,15.398],[8.797,15.366],[8.839,15.33],[8.878,15.291],[8.914,15.25],[8.947,15.207],[8.977,15.161],[9.004,15.114],[9.028,15.064],[9.048,15.013],[9.063,14.961],[9.074,14.907],[9.079,14.853],[9.078,14.798],[9.07,14.744],[9.055,14.691],[9.032,14.642],[9.003,14.595],[8.967,14.554],[8.926,14.518],[8.88,14.489],[8.83,14.467]],[[3.834,12.595],[3.884,12.616],[3.931,12.646],[3.972,12.682],[4.01,12.722],[4.043,12.766],[4.073,12.812],[4.101,12.859],[4.127,12.908],[4.151,12.957],[4.174,13.007],[4.195,13.058],[4.215,13.109],[4.233,13.161],[4.25,13.214],[4.265,13.267],[4.278,13.32],[4.288,13.374],[4.296,13.429],[4.301,13.483],[4.305,13.538],[4.306,13.593],[4.305,13.648],[4.302,13.703],[4.298,13.758],[4.291,13.813],[4.282,13.867],[4.272,13.921],[4.26,13.975],[4.246,14.028],[4.232,14.081],[4.216,14.134],[4.198,14.186],[4.18,14.238],[4.16,14.289],[4.139,14.34],[4.117,14.39],[4.092,14.44],[4.066,14.488],[4.038,14.535],[4.007,14.581],[3.975,14.625],[3.94,14.668],[3.903,14.708],[3.863,14.747],[3.822,14.783],[3.778,14.816],[3.732,14.847],[3.685,14.874],[3.635,14.897],[3.583,14.916],[3.53,14.931],[3.476,14.94],[3.421,14.944],[3.366,14.944],[3.311,14.938],[3.257,14.928],[3.204,14.913],[3.152,14.895],[3.102,14.873],[3.053,14.848],[3.006,14.819],[2.961,14.788],[2.918,14.754],[2.877,14.717],[2.837,14.679],[2.8,14.638],[2.765,14.596],[2.731,14.553],[2.698,14.508],[2.667,14.463],[2.636,14.418],[2.605,14.372],[2.575,14.326],[2.544,14.281],[2.513,14.235],[2.48,14.191],[2.447,14.147],[2.413,14.104],[2.377,14.062],[2.339,14.022],[2.3,13.983],[2.259,13.947],[2.216,13.913],[2.171,13.881],[2.124,13.853],[2.075,13.828],[2.023,13.808],[1.97,13.795],[1.915,13.788],[1.861,13.79],[1.807,13.801],[1.756,13.823],[1.711,13.853],[1.671,13.891],[1.638,13.935],[1.612,13.984],[1.593,14.035],[1.58,14.089],[1.572,14.143],[1.571,14.198],[1.576,14.253],[1.586,14.307],[1.601,14.36],[1.621,14.411],[1.645,14.461],[1.672,14.508],[1.702,14.554],[1.734,14.599],[1.768,14.643],[1.801,14.686],[1.835,14.73],[1.869,14.773],[1.9,14.818],[1.93,14.865],[1.955,14.914],[1.976,14.964],[1.991,15.017],[1.999,15.072],[2,15.127],[1.994,15.181],[1.983,15.235],[1.966,15.288],[1.944,15.338],[1.918,15.386],[1.888,15.432],[1.853,15.475],[1.814,15.514],[1.77,15.547],[1.723,15.575],[1.672,15.596],[1.618,15.609],[1.564,15.615],[1.509,15.614],[1.454,15.607],[1.401,15.595],[1.348,15.578],[1.298,15.557],[1.249,15.532],[1.202,15.503],[1.156,15.472],[1.113,15.438],[1.072,15.401],[1.033,15.362],[.997,15.321],[.963,15.278],[.931,15.233],[.902,15.186],[.875,15.138],[.851,15.089],[.83,15.038],[.81,14.986],[.793,14.934],[.778,14.881],[.765,14.828],[.753,14.774],[.743,14.72],[.736,14.666],[.73,14.611],[.726,14.556],[.725,14.501],[.725,14.446],[.728,14.391],[.733,14.336],[.74,14.282],[.749,14.227],[.759,14.173],[.772,14.12],[.785,14.066],[.8,14.013],[.817,13.961],[.835,13.909],[.855,13.858],[.876,13.807],[.898,13.757],[.923,13.707],[.948,13.658],[.975,13.61],[1.003,13.563],[1.032,13.516],[1.062,13.47],[1.093,13.425],[1.125,13.38],[1.159,13.337],[1.194,13.294],[1.23,13.253],[1.267,13.212],[1.306,13.174],[1.347,13.136],[1.389,13.101],[1.433,13.068],[1.479,13.038],[1.527,13.01],[1.576,12.986],[1.627,12.965],[1.679,12.947],[1.732,12.933],[1.786,12.922],[1.84,12.914],[1.895,12.91],[1.95,12.908],[2.005,12.91],[2.06,12.914],[2.115,12.92],[2.169,12.93],[2.222,12.942],[2.275,12.958],[2.327,12.976],[2.378,12.997],[2.428,13.02],[2.476,13.047],[2.523,13.076],[2.568,13.107],[2.612,13.14],[2.655,13.175],[2.696,13.211],[2.736,13.249],[2.775,13.287],[2.813,13.327],[2.851,13.367],[2.887,13.408],[2.923,13.45],[2.959,13.492],[2.993,13.535],[3.027,13.578],[3.061,13.622],[3.095,13.665],[3.129,13.708],[3.163,13.751],[3.198,13.794],[3.233,13.837],[3.269,13.878],[3.307,13.918],[3.347,13.955],[3.391,13.989],[3.438,14.017],[3.49,14.035],[3.545,14.035],[3.595,14.015],[3.635,13.977],[3.663,13.93],[3.681,13.878],[3.69,13.824],[3.694,13.769],[3.692,13.714],[3.686,13.659],[3.676,13.605],[3.664,13.551],[3.65,13.498],[3.634,13.446],[3.617,13.393],[3.6,13.341],[3.583,13.289],[3.566,13.236],[3.55,13.184],[3.536,13.13],[3.523,13.077],[3.512,13.023],[3.505,12.969],[3.501,12.914],[3.502,12.859],[3.51,12.804],[3.525,12.751],[3.549,12.702],[3.581,12.658],[3.623,12.622],[3.672,12.597],[3.725,12.584],[3.78,12.583]],[[-8.773,10.704],[-8.723,10.727],[-8.679,10.759],[-8.642,10.8],[-8.615,10.848],[-8.599,10.901],[-8.593,10.955],[-8.596,11.01],[-8.608,11.064],[-8.627,11.115],[-8.652,11.164],[-8.683,11.21],[-8.717,11.252],[-8.756,11.292],[-8.797,11.328],[-8.841,11.362],[-8.886,11.393],[-8.933,11.421],[-8.981,11.448],[-9.031,11.472],[-9.081,11.494],[-9.132,11.515],[-9.183,11.535],[-9.235,11.553],[-9.287,11.57],[-9.34,11.587],[-9.392,11.604],[-9.445,11.621],[-9.497,11.638],[-9.549,11.655],[-9.601,11.673],[-9.653,11.692],[-9.704,11.712],[-9.755,11.733],[-9.806,11.755],[-9.855,11.778],[-9.905,11.802],[-9.953,11.828],[-10.002,11.855],[-10.049,11.883],[-10.096,11.911],[-10.142,11.941],[-10.188,11.971],[-10.234,12.002],[-10.279,12.034],[-10.323,12.067],[-10.367,12.1],[-10.41,12.134],[-10.452,12.17],[-10.493,12.207],[-10.532,12.245],[-10.571,12.284],[-10.607,12.326],[-10.641,12.369],[-10.671,12.415],[-10.698,12.463],[-10.719,12.514],[-10.732,12.567],[-10.735,12.622],[-10.726,12.676],[-10.703,12.726],[-10.668,12.768],[-10.624,12.801],[-10.575,12.825],[-10.522,12.842],[-10.468,12.853],[-10.414,12.859],[-10.359,12.861],[-10.304,12.861],[-10.249,12.858],[-10.194,12.854],[-10.139,12.848],[-10.085,12.841],[-10.03,12.833],[-9.976,12.825],[-9.921,12.816],[-9.867,12.808],[-9.813,12.799],[-9.759,12.79],[-9.704,12.781],[-9.65,12.773],[-9.596,12.764],[-9.541,12.755],[-9.487,12.747],[-9.432,12.739],[-9.378,12.731],[-9.323,12.724],[-9.269,12.716],[-9.214,12.709],[-9.16,12.702],[-9.105,12.695],[-9.05,12.689],[-8.996,12.683],[-8.941,12.679],[-8.886,12.677],[-8.831,12.678],[-8.776,12.683],[-8.722,12.694],[-8.67,12.712],[-8.622,12.738],[-8.58,12.774],[-8.548,12.819],[-8.527,12.869],[-8.518,12.923],[-8.518,12.978],[-8.527,13.033],[-8.543,13.085],[-8.564,13.136],[-8.592,13.183],[-8.624,13.228],[-8.661,13.269],[-8.701,13.306],[-8.745,13.339],[-8.791,13.369],[-8.84,13.396],[-8.889,13.419],[-8.94,13.441],[-8.991,13.462],[-9.042,13.481],[-9.094,13.499],[-9.147,13.516],[-9.199,13.533],[-9.251,13.55],[-9.304,13.566],[-9.357,13.581],[-9.41,13.596],[-9.463,13.611],[-9.516,13.626],[-9.569,13.64],[-9.622,13.653],[-9.676,13.667],[-9.729,13.68],[-9.783,13.693],[-9.836,13.706],[-9.89,13.718],[-9.944,13.729],[-9.998,13.74],[-10.052,13.749],[-10.106,13.758],[-10.161,13.765],[-10.215,13.772],[-10.27,13.776],[-10.325,13.78],[-10.38,13.783],[-10.435,13.785],[-10.49,13.785],[-10.545,13.785],[-10.6,13.783],[-10.655,13.78],[-10.71,13.776],[-10.765,13.77],[-10.819,13.763],[-10.873,13.753],[-10.927,13.741],[-10.98,13.726],[-11.032,13.709],[-11.084,13.689],[-11.134,13.666],[-11.182,13.64],[-11.229,13.612],[-11.274,13.58],[-11.317,13.546],[-11.359,13.51],[-11.398,13.471],[-11.435,13.43],[-11.469,13.387],[-11.502,13.343],[-11.532,13.297],[-11.559,13.249],[-11.584,13.2],[-11.607,13.15],[-11.627,13.099],[-11.645,13.047],[-11.66,12.994],[-11.672,12.94],[-11.681,12.886],[-11.687,12.831],[-11.69,12.777],[-11.689,12.722],[-11.685,12.667],[-11.678,12.612],[-11.668,12.558],[-11.656,12.504],[-11.641,12.451],[-11.624,12.399],[-11.606,12.347],[-11.586,12.296],[-11.566,12.245],[-11.544,12.194],[-11.521,12.144],[-11.498,12.094],[-11.474,12.045],[-11.449,11.996],[-11.424,11.947],[-11.399,11.898],[-11.372,11.849],[-11.346,11.801],[-11.318,11.754],[-11.289,11.707],[-11.26,11.66],[-11.23,11.614],[-11.198,11.57],[-11.164,11.526],[-11.129,11.483],[-11.092,11.442],[-11.054,11.404],[-11.013,11.367],[-10.97,11.333],[-10.925,11.301],[-10.878,11.271],[-10.83,11.244],[-10.781,11.219],[-10.732,11.196],[-10.681,11.174],[-10.63,11.153],[-10.579,11.134],[-10.527,11.115],[-10.475,11.098],[-10.422,11.081],[-10.37,11.064],[-10.317,11.048],[-10.265,11.032],[-10.212,11.016],[-10.159,10.999],[-10.107,10.983],[-10.054,10.967],[-10.002,10.95],[-9.949,10.934],[-9.897,10.917],[-9.844,10.901],[-9.791,10.886],[-9.739,10.87],[-9.686,10.855],[-9.633,10.841],[-9.58,10.826],[-9.526,10.812],[-9.473,10.798],[-9.42,10.784],[-9.367,10.771],[-9.313,10.757],[-9.26,10.744],[-9.206,10.731],[-9.153,10.718],[-9.099,10.707],[-9.045,10.697],[-8.99,10.689],[-8.936,10.684],[-8.881,10.684],[-8.826,10.69]],[[-2.327,9.883],[-2.29,9.924],[-2.262,9.971],[-2.242,10.023],[-2.23,10.076],[-2.226,10.131],[-2.228,10.186],[-2.237,10.24],[-2.252,10.293],[-2.273,10.344],[-2.3,10.392],[-2.332,10.437],[-2.368,10.478],[-2.408,10.515],[-2.452,10.549],[-2.498,10.58],[-2.545,10.608],[-2.594,10.633],[-2.643,10.657],[-2.694,10.679],[-2.744,10.7],[-2.796,10.72],[-2.848,10.739],[-2.9,10.756],[-2.952,10.773],[-3.005,10.789],[-3.057,10.804],[-3.111,10.819],[-3.164,10.833],[-3.217,10.847],[-3.27,10.86],[-3.324,10.874],[-3.377,10.888],[-3.43,10.901],[-3.484,10.915],[-3.537,10.928],[-3.59,10.941],[-3.644,10.953],[-3.698,10.964],[-3.752,10.975],[-3.806,10.986],[-3.86,10.996],[-3.914,11.006],[-3.968,11.016],[-4.022,11.027],[-4.076,11.038],[-4.129,11.051],[-4.183,11.064],[-4.235,11.08],[-4.287,11.098],[-4.338,11.119],[-4.386,11.146],[-4.43,11.179],[-4.465,11.221],[-4.483,11.273],[-4.481,11.327],[-4.461,11.379],[-4.431,11.425],[-4.396,11.467],[-4.357,11.505],[-4.316,11.542],[-4.274,11.577],[-4.231,11.612],[-4.187,11.645],[-4.143,11.678],[-4.098,11.71],[-4.054,11.743],[-4.009,11.775],[-3.964,11.806],[-3.919,11.838],[-3.874,11.87],[-3.83,11.902],[-3.785,11.934],[-3.74,11.966],[-3.695,11.998],[-3.651,12.03],[-3.606,12.062],[-3.561,12.094],[-3.517,12.126],[-3.472,12.158],[-3.426,12.189],[-3.381,12.22],[-3.335,12.251],[-3.29,12.282],[-3.244,12.312],[-3.198,12.342],[-3.151,12.372],[-3.105,12.401],[-3.058,12.43],[-3.011,12.459],[-2.964,12.487],[-2.917,12.516],[-2.871,12.546],[-2.825,12.576],[-2.78,12.608],[-2.738,12.643],[-2.698,12.681],[-2.662,12.723],[-2.633,12.77],[-2.613,12.82],[-2.603,12.874],[-2.605,12.929],[-2.618,12.983],[-2.641,13.032],[-2.672,13.078],[-2.71,13.118],[-2.752,13.153],[-2.798,13.183],[-2.847,13.209],[-2.898,13.23],[-2.95,13.248],[-3.003,13.262],[-3.056,13.274],[-3.11,13.284],[-3.165,13.293],[-3.219,13.301],[-3.274,13.308],[-3.328,13.316],[-3.383,13.323],[-3.437,13.331],[-3.492,13.339],[-3.546,13.348],[-3.6,13.356],[-3.655,13.365],[-3.709,13.373],[-3.763,13.382],[-3.818,13.391],[-3.872,13.4],[-3.926,13.408],[-3.981,13.416],[-4.035,13.424],[-4.09,13.432],[-4.144,13.439],[-4.199,13.445],[-4.253,13.451],[-4.308,13.456],[-4.363,13.462],[-4.418,13.467],[-4.472,13.472],[-4.527,13.478],[-4.582,13.484],[-4.637,13.491],[-4.691,13.497],[-4.746,13.504],[-4.8,13.511],[-4.855,13.517],[-4.91,13.523],[-4.964,13.529],[-5.019,13.533],[-5.074,13.537],[-5.129,13.541],[-5.184,13.544],[-5.239,13.547],[-5.294,13.551],[-5.349,13.555],[-5.403,13.559],[-5.458,13.564],[-5.513,13.57],[-5.568,13.576],[-5.622,13.582],[-5.677,13.589],[-5.732,13.594],[-5.786,13.599],[-5.841,13.602],[-5.896,13.603],[-5.951,13.601],[-6.006,13.596],[-6.06,13.586],[-6.113,13.571],[-6.164,13.55],[-6.21,13.52],[-6.249,13.482],[-6.279,13.436],[-6.299,13.385],[-6.309,13.331],[-6.311,13.276],[-6.306,13.221],[-6.296,13.167],[-6.281,13.114],[-6.262,13.062],[-6.24,13.012],[-6.214,12.964],[-6.184,12.918],[-6.15,12.874],[-6.112,12.834],[-6.071,12.798],[-6.026,12.766],[-5.978,12.739],[-5.928,12.717],[-5.875,12.7],[-5.822,12.687],[-5.768,12.679],[-5.713,12.674],[-5.658,12.672],[-5.603,12.673],[-5.548,12.676],[-5.493,12.681],[-5.438,12.686],[-5.384,12.691],[-5.329,12.697],[-5.274,12.701],[-5.219,12.705],[-5.164,12.707],[-5.109,12.708],[-5.054,12.706],[-4.999,12.703],[-4.944,12.697],[-4.89,12.688],[-4.837,12.674],[-4.785,12.656],[-4.737,12.63],[-4.694,12.595],[-4.664,12.55],[-4.653,12.496],[-4.662,12.442],[-4.686,12.393],[-4.719,12.348],[-4.756,12.308],[-4.797,12.271],[-4.84,12.237],[-4.885,12.205],[-4.93,12.174],[-4.976,12.144],[-5.023,12.114],[-5.069,12.086],[-5.116,12.057],[-5.164,12.029],[-5.211,12.001],[-5.259,11.974],[-5.307,11.946],[-5.354,11.919],[-5.402,11.892],[-5.45,11.864],[-5.497,11.837],[-5.545,11.808],[-5.591,11.78],[-5.638,11.75],[-5.683,11.719],[-5.728,11.687],[-5.772,11.654],[-5.815,11.619],[-5.855,11.582],[-5.894,11.543],[-5.93,11.502],[-5.963,11.458],[-5.993,11.411],[-6.017,11.362],[-6.037,11.311],[-6.052,11.258],[-6.061,11.204],[-6.065,11.149],[-6.064,11.094],[-6.059,11.039],[-6.05,10.985],[-6.038,10.931],[-6.022,10.879],[-6.003,10.827],[-5.981,10.777],[-5.955,10.728],[-5.926,10.681],[-5.893,10.637],[-5.857,10.596],[-5.817,10.558],[-5.774,10.523],[-5.729,10.492],[-5.682,10.463],[-5.634,10.437],[-5.584,10.413],[-5.534,10.392],[-5.482,10.372],[-5.43,10.354],[-5.378,10.337],[-5.325,10.321],[-5.272,10.306],[-5.219,10.292],[-5.166,10.278],[-5.113,10.264],[-5.059,10.251],[-5.006,10.238],[-4.952,10.226],[-4.899,10.213],[-4.845,10.201],[-4.791,10.189],[-4.738,10.177],[-4.684,10.165],[-4.631,10.152],[-4.577,10.14],[-4.524,10.127],[-4.47,10.113],[-4.417,10.1],[-4.364,10.086],[-4.31,10.072],[-4.257,10.059],[-4.204,10.045],[-4.15,10.032],[-4.097,10.02],[-4.043,10.007],[-3.989,9.995],[-3.936,9.983],[-3.882,9.971],[-3.828,9.959],[-3.775,9.947],[-3.721,9.935],[-3.667,9.923],[-3.614,9.911],[-3.56,9.9],[-3.506,9.889],[-3.452,9.879],[-3.398,9.869],[-3.343,9.86],[-3.289,9.851],[-3.235,9.843],[-3.18,9.835],[-3.126,9.828],[-3.071,9.82],[-3.017,9.813],[-2.962,9.805],[-2.908,9.798],[-2.853,9.792],[-2.798,9.786],[-2.743,9.783],[-2.688,9.781],[-2.633,9.781],[-2.579,9.785],[-2.524,9.793],[-2.471,9.805],[-2.419,9.824],[-2.37,9.85]],[[10.938,9.99],[10.969,10.035],[10.984,10.088],[10.985,10.143],[10.977,10.197],[10.961,10.25],[10.94,10.3],[10.915,10.349],[10.887,10.396],[10.857,10.443],[10.826,10.488],[10.793,10.532],[10.76,10.576],[10.726,10.619],[10.691,10.662],[10.656,10.704],[10.621,10.746],[10.584,10.787],[10.548,10.828],[10.511,10.868],[10.473,10.908],[10.435,10.948],[10.397,10.988],[10.359,11.027],[10.32,11.066],[10.282,11.106],[10.245,11.146],[10.208,11.186],[10.171,11.228],[10.136,11.269],[10.101,11.312],[10.067,11.355],[10.034,11.399],[10.003,11.444],[9.974,11.491],[9.949,11.54],[9.93,11.591],[9.925,11.646],[9.941,11.698],[9.978,11.737],[10.026,11.763],[10.079,11.781],[10.132,11.792],[10.187,11.8],[10.241,11.806],[10.296,11.81],[10.351,11.813],[10.406,11.816],[10.461,11.818],[10.515,11.821],[10.57,11.825],[10.625,11.83],[10.68,11.836],[10.734,11.844],[10.788,11.854],[10.841,11.867],[10.894,11.883],[10.945,11.904],[10.993,11.93],[11.038,11.961],[11.075,12.001],[11.102,12.049],[11.115,12.102],[11.114,12.157],[11.1,12.21],[11.077,12.26],[11.047,12.306],[11.012,12.348],[10.972,12.386],[10.929,12.42],[10.883,12.449],[10.834,12.474],[10.783,12.495],[10.731,12.511],[10.677,12.524],[10.623,12.534],[10.569,12.541],[10.514,12.546],[10.459,12.55],[10.404,12.552],[10.349,12.554],[10.295,12.556],[10.24,12.557],[10.185,12.558],[10.13,12.56],[10.075,12.562],[10.02,12.565],[9.965,12.568],[9.911,12.572],[9.856,12.578],[9.801,12.584],[9.747,12.591],[9.693,12.6],[9.638,12.609],[9.584,12.618],[9.53,12.628],[9.476,12.639],[9.422,12.649],[9.369,12.661],[9.315,12.672],[9.261,12.684],[9.208,12.696],[9.154,12.708],[9.1,12.72],[9.047,12.732],[8.993,12.743],[8.939,12.754],[8.886,12.765],[8.832,12.776],[8.778,12.786],[8.724,12.796],[8.669,12.805],[8.615,12.814],[8.561,12.823],[8.507,12.831],[8.452,12.84],[8.398,12.848],[8.344,12.855],[8.289,12.862],[8.235,12.868],[8.18,12.873],[8.125,12.878],[8.07,12.882],[8.016,12.886],[7.961,12.891],[7.906,12.895],[7.852,12.901],[7.797,12.907],[7.742,12.913],[7.688,12.921],[7.634,12.929],[7.58,12.938],[7.525,12.948],[7.472,12.959],[7.418,12.97],[7.364,12.981],[7.311,12.994],[7.257,13.007],[7.204,13.02],[7.151,13.035],[7.098,13.049],[7.045,13.064],[6.992,13.079],[6.939,13.093],[6.886,13.106],[6.832,13.118],[6.778,13.127],[6.723,13.132],[6.668,13.131],[6.614,13.122],[6.564,13.102],[6.521,13.068],[6.492,13.022],[6.477,12.969],[6.476,12.914],[6.483,12.86],[6.498,12.807],[6.518,12.756],[6.543,12.707],[6.571,12.659],[6.603,12.615],[6.637,12.572],[6.675,12.532],[6.715,12.494],[6.758,12.46],[6.803,12.428],[6.849,12.399],[6.898,12.373],[6.947,12.349],[6.998,12.328],[7.05,12.309],[7.102,12.292],[7.155,12.277],[7.208,12.264],[7.261,12.251],[7.315,12.24],[7.369,12.229],[7.423,12.219],[7.477,12.209],[7.531,12.199],[7.585,12.189],[7.639,12.179],[7.693,12.168],[7.747,12.158],[7.801,12.147],[7.854,12.135],[7.908,12.123],[7.961,12.11],[8.014,12.095],[8.066,12.079],[8.118,12.06],[8.168,12.036],[8.214,12.007],[8.25,11.966],[8.265,11.914],[8.252,11.861],[8.224,11.813],[8.19,11.77],[8.153,11.73],[8.113,11.692],[8.073,11.654],[8.032,11.618],[7.99,11.583],[7.947,11.548],[7.904,11.514],[7.86,11.481],[7.816,11.448],[7.771,11.417],[7.726,11.386],[7.68,11.355],[7.634,11.325],[7.588,11.296],[7.541,11.266],[7.495,11.237],[7.449,11.207],[7.402,11.178],[7.356,11.148],[7.31,11.119],[7.263,11.089],[7.217,11.06],[7.17,11.031],[7.124,11.002],[7.077,10.973],[7.03,10.943],[6.984,10.914],[6.938,10.884],[6.893,10.853],[6.849,10.82],[6.806,10.786],[6.765,10.749],[6.726,10.71],[6.691,10.668],[6.661,10.622],[6.636,10.573],[6.616,10.522],[6.604,10.468],[6.599,10.414],[6.6,10.359],[6.608,10.305],[6.622,10.252],[6.643,10.201],[6.67,10.153],[6.704,10.11],[6.745,10.074],[6.792,10.046],[6.845,10.03],[6.9,10.026],[6.954,10.032],[7.007,10.044],[7.06,10.062],[7.11,10.083],[7.16,10.106],[7.209,10.13],[7.258,10.156],[7.307,10.181],[7.355,10.208],[7.403,10.235],[7.45,10.262],[7.498,10.289],[7.545,10.317],[7.592,10.345],[7.639,10.374],[7.686,10.403],[7.733,10.432],[7.779,10.462],[7.825,10.492],[7.87,10.523],[7.915,10.555],[7.959,10.587],[8.003,10.62],[8.046,10.654],[8.089,10.688],[8.132,10.723],[8.175,10.757],[8.218,10.792],[8.261,10.826],[8.304,10.86],[8.348,10.893],[8.392,10.926],[8.436,10.959],[8.48,10.991],[8.525,11.023],[8.569,11.055],[8.614,11.087],[8.659,11.119],[8.704,11.151],[8.749,11.181],[8.795,11.211],[8.843,11.239],[8.892,11.264],[8.943,11.284],[8.995,11.3],[9.049,11.308],[9.104,11.309],[9.159,11.301],[9.211,11.286],[9.262,11.265],[9.31,11.238],[9.355,11.207],[9.399,11.173],[9.44,11.137],[9.48,11.1],[9.519,11.061],[9.558,11.022],[9.597,10.984],[9.637,10.945],[9.676,10.908],[9.717,10.87],[9.757,10.833],[9.798,10.797],[9.839,10.76],[9.88,10.723],[9.921,10.687],[9.961,10.649],[10.001,10.612],[10.041,10.573],[10.08,10.535],[10.118,10.495],[10.156,10.455],[10.193,10.415],[10.23,10.374],[10.266,10.333],[10.303,10.292],[10.34,10.252],[10.378,10.212],[10.416,10.173],[10.456,10.135],[10.497,10.098],[10.54,10.064],[10.584,10.032],[10.631,10.003],[10.68,9.978],[10.732,9.959],[10.785,9.947],[10.84,9.946],[10.893,9.96]],[[-3.282,6.089],[-3.237,6.12],[-3.197,6.158],[-3.163,6.201],[-3.136,6.249],[-3.115,6.3],[-3.101,6.353],[-3.094,6.407],[-3.093,6.462],[-3.096,6.517],[-3.104,6.572],[-3.115,6.625],[-3.128,6.679],[-3.144,6.732],[-3.16,6.784],[-3.178,6.836],[-3.196,6.888],[-3.215,6.94],[-3.235,6.991],[-3.255,7.042],[-3.275,7.093],[-3.295,7.145],[-3.316,7.196],[-3.336,7.246],[-3.357,7.297],[-3.379,7.348],[-3.4,7.399],[-3.422,7.449],[-3.443,7.5],[-3.465,7.55],[-3.486,7.601],[-3.507,7.652],[-3.528,7.703],[-3.548,7.754],[-3.567,7.806],[-3.585,7.858],[-3.602,7.91],[-3.617,7.963],[-3.631,8.016],[-3.64,8.07],[-3.646,8.125],[-3.645,8.18],[-3.634,8.234],[-3.611,8.283],[-3.574,8.324],[-3.527,8.352],[-3.475,8.368],[-3.42,8.376],[-3.365,8.377],[-3.31,8.373],[-3.256,8.367],[-3.201,8.358],[-3.147,8.347],[-3.094,8.336],[-3.04,8.323],[-2.986,8.311],[-2.933,8.298],[-2.879,8.286],[-2.826,8.274],[-2.772,8.263],[-2.718,8.252],[-2.664,8.242],[-2.609,8.234],[-2.555,8.228],[-2.5,8.225],[-2.445,8.224],[-2.39,8.227],[-2.335,8.234],[-2.282,8.247],[-2.23,8.265],[-2.181,8.29],[-2.137,8.322],[-2.099,8.362],[-2.068,8.407],[-2.046,8.458],[-2.034,8.511],[-2.03,8.566],[-2.035,8.621],[-2.047,8.674],[-2.066,8.726],[-2.091,8.775],[-2.121,8.821],[-2.156,8.863],[-2.195,8.902],[-2.238,8.936],[-2.283,8.968],[-2.33,8.996],[-2.379,9.021],[-2.429,9.043],[-2.48,9.064],[-2.532,9.084],[-2.584,9.101],[-2.636,9.118],[-2.689,9.134],[-2.742,9.15],[-2.795,9.164],[-2.848,9.178],[-2.901,9.192],[-2.954,9.205],[-3.008,9.218],[-3.062,9.23],[-3.115,9.243],[-3.169,9.255],[-3.222,9.267],[-3.276,9.279],[-3.329,9.292],[-3.383,9.305],[-3.436,9.318],[-3.49,9.332],[-3.543,9.346],[-3.596,9.36],[-3.649,9.373],[-3.703,9.387],[-3.756,9.4],[-3.809,9.413],[-3.863,9.426],[-3.916,9.439],[-3.97,9.452],[-4.023,9.465],[-4.077,9.478],[-4.13,9.491],[-4.183,9.505],[-4.237,9.518],[-4.29,9.531],[-4.344,9.544],[-4.397,9.556],[-4.451,9.567],[-4.505,9.578],[-4.559,9.589],[-4.613,9.599],[-4.667,9.61],[-4.721,9.62],[-4.775,9.631],[-4.829,9.642],[-4.882,9.653],[-4.936,9.665],[-4.99,9.677],[-5.043,9.689],[-5.097,9.701],[-5.151,9.713],[-5.204,9.725],[-5.258,9.737],[-5.312,9.748],[-5.366,9.76],[-5.419,9.771],[-5.473,9.783],[-5.527,9.795],[-5.581,9.807],[-5.634,9.819],[-5.688,9.831],[-5.741,9.843],[-5.795,9.855],[-5.849,9.867],[-5.903,9.878],[-5.957,9.889],[-6.011,9.899],[-6.065,9.908],[-6.12,9.915],[-6.174,9.919],[-6.229,9.919],[-6.284,9.914],[-6.337,9.898],[-6.383,9.869],[-6.415,9.825],[-6.431,9.772],[-6.435,9.717],[-6.43,9.663],[-6.42,9.609],[-6.406,9.556],[-6.388,9.504],[-6.367,9.453],[-6.343,9.403],[-6.315,9.356],[-6.285,9.31],[-6.252,9.266],[-6.216,9.225],[-6.176,9.186],[-6.134,9.151],[-6.089,9.119],[-6.042,9.091],[-5.994,9.065],[-5.944,9.042],[-5.893,9.021],[-5.841,9.003],[-5.789,8.986],[-5.736,8.971],[-5.683,8.956],[-5.629,8.943],[-5.576,8.93],[-5.522,8.917],[-5.469,8.905],[-5.416,8.891],[-5.362,8.878],[-5.309,8.863],[-5.257,8.846],[-5.205,8.828],[-5.154,8.807],[-5.105,8.782],[-5.059,8.752],[-5.019,8.714],[-4.994,8.666],[-4.995,8.612],[-5.02,8.563],[-5.056,8.522],[-5.098,8.487],[-5.143,8.455],[-5.189,8.425],[-5.237,8.397],[-5.284,8.37],[-5.332,8.343],[-5.38,8.316],[-5.428,8.289],[-5.476,8.262],[-5.524,8.235],[-5.571,8.207],[-5.619,8.179],[-5.666,8.151],[-5.713,8.123],[-5.76,8.095],[-5.807,8.066],[-5.854,8.037],[-5.901,8.008],[-5.947,7.979],[-5.994,7.949],[-6.039,7.918],[-6.085,7.887],[-6.13,7.856],[-6.174,7.824],[-6.219,7.791],[-6.263,7.758],[-6.307,7.725],[-6.351,7.693],[-6.395,7.66],[-6.44,7.628],[-6.485,7.597],[-6.531,7.566],[-6.577,7.536],[-6.624,7.507],[-6.671,7.479],[-6.718,7.451],[-6.766,7.423],[-6.813,7.395],[-6.86,7.366],[-6.906,7.336],[-6.95,7.304],[-6.993,7.268],[-7.032,7.23],[-7.067,7.187],[-7.096,7.141],[-7.117,7.09],[-7.131,7.037],[-7.137,6.983],[-7.134,6.928],[-7.125,6.874],[-7.109,6.821],[-7.086,6.771],[-7.059,6.723],[-7.026,6.679],[-6.989,6.639],[-6.946,6.604],[-6.9,6.575],[-6.849,6.553],[-6.796,6.539],[-6.742,6.532],[-6.687,6.531],[-6.632,6.536],[-6.578,6.545],[-6.524,6.558],[-6.471,6.573],[-6.419,6.591],[-6.368,6.61],[-6.317,6.631],[-6.266,6.653],[-6.216,6.675],[-6.166,6.698],[-6.117,6.722],[-6.068,6.747],[-6.019,6.772],[-5.97,6.797],[-5.921,6.823],[-5.873,6.85],[-5.825,6.877],[-5.778,6.905],[-5.731,6.933],[-5.684,6.962],[-5.637,6.991],[-5.591,7.02],[-5.545,7.05],[-5.498,7.08],[-5.452,7.11],[-5.406,7.14],[-5.36,7.17],[-5.314,7.2],[-5.268,7.23],[-5.222,7.26],[-5.175,7.289],[-5.128,7.318],[-5.081,7.347],[-5.034,7.375],[-4.986,7.402],[-4.938,7.428],[-4.889,7.453],[-4.839,7.476],[-4.788,7.497],[-4.736,7.514],[-4.682,7.526],[-4.628,7.533],[-4.573,7.531],[-4.519,7.52],[-4.468,7.499],[-4.422,7.469],[-4.382,7.432],[-4.346,7.39],[-4.316,7.344],[-4.289,7.296],[-4.266,7.246],[-4.244,7.196],[-4.224,7.145],[-4.204,7.093],[-4.185,7.042],[-4.166,6.99],[-4.146,6.939],[-4.127,6.887],[-4.107,6.836],[-4.086,6.785],[-4.065,6.734],[-4.044,6.684],[-4.021,6.633],[-3.998,6.584],[-3.974,6.534],[-3.95,6.485],[-3.923,6.437],[-3.896,6.389],[-3.867,6.342],[-3.836,6.297],[-3.804,6.252],[-3.769,6.21],[-3.731,6.17],[-3.69,6.133],[-3.646,6.101],[-3.598,6.074],[-3.547,6.055],[-3.493,6.043],[-3.438,6.041],[-3.383,6.048],[-3.331,6.064]],[[-10.95,9.138],[-10.909,9.175],[-10.878,9.221],[-10.857,9.272],[-10.847,9.326],[-10.847,9.381],[-10.853,9.436],[-10.867,9.49],[-10.885,9.542],[-10.909,9.592],[-10.936,9.639],[-10.969,9.684],[-11.006,9.725],[-11.049,9.76],[-11.096,9.788],[-11.148,9.806],[-11.203,9.811],[-11.257,9.803],[-11.308,9.782],[-11.353,9.75],[-11.391,9.71],[-11.421,9.663],[-11.442,9.612],[-11.455,9.559],[-11.46,9.504],[-11.457,9.449],[-11.447,9.394],[-11.431,9.341],[-11.409,9.291],[-11.381,9.243],[-11.347,9.2],[-11.308,9.161],[-11.263,9.13],[-11.213,9.106],[-11.16,9.092],[-11.105,9.087],[-11.05,9.094],[-10.997,9.111]]];var q6=33.9/21.4,y4=42,v4=710,Z6=v4-y4;var $6=Object.freeze({height:55,hole:5,letterSize:100,letterShift:0,letterH:.8,thickness:2});function b4(){let i=1/0,t=1/0,e=-1/0,n=-1/0;for(let s of Id)for(let[r,o]of s)r<i&&(i=r),o<t&&(t=o),r>e&&(e=r),o>n&&(n=o);return{cx:(i+e)/2,cy:(t+n)/2}}var J6=b4();var j6=Object.freeze({clearance:.3,headLength:43,headWidth:23.5,capTopWidth:17.5,capDepth:4,headCornerR:3,bladeRelief:1.5,upperDepth:5.5,puckD:62,floor:2.4,pushHoleD:12,gripRibs:20,ribDepth:1.2,edgeRound:1.5,notchW:14,handleTailD:12.25,handleHeadD:9.75,gripLen:40,gripOD:24,gripClear:.1,gripFlutes:10});var M4={toggle:{style:"toggle",openingW:14,openingH:32},rocker:{style:"rocker",openingW:33.4,openingH:66.8}},t9=Object.freeze({...M4.toggle,depth:9.5,overhang:16,plateT:3.2});var Tn=Object.freeze({halfX:39.0870705,halfZ:50,pinX:22.86,pinZ:33.6,crestX:12,crestZ:10,yMin:-3.0112505,yMax:3.0112505}),S4=Tn.halfX-Tn.pinX,E4=Tn.halfZ-Tn.pinZ,n9=Tn.yMax-Tn.yMin,i9=Tn.crestX+S4,s9=Tn.crestZ+E4,r9=Object.freeze({width:Tn.halfX*2,height:Tn.halfZ*2,thickness:100});var w4=["plug1","plug2","plug3","plug4","plug5","plug6"],a9=Object.freeze({lipClear:.28,c8HoleD:8.5,usbHoleW:5,usbHoleH:7.6,usbPitch:10,innerWidth:70.8,innerLength:137.8,usbExtra:15,innerHeight:26.6,acExtra:22,wall:2.4,floor:2.2,cornerRadius:4,edgeFillet:1,usbCount:6,lidThickness:2.6,lipDepth:5,lipThick:1.6,beadR:.55,usbZCenter:13,c8ZCenter:13,beadLen:10,beadDrop:3,pocketExtra:.25,keeperW:5.4,keeperH:8,outerCornerAdd:0,lidNickR:5,lidNickDepth:2.2,spacerFit:.25,spacerSpine:1.6,stopH:4,plug1:11,plug2:11,plug3:11,plug4:11,plug5:11,plug6:11}),c9=[{key:"lipClear",min:.15,max:.6,step:.01,unit:"mm"},{key:"c8HoleD",min:5,max:25,absMax:28,step:.1,unit:"mm"},{key:"usbHoleW",min:3,max:12,absMax:14,step:.1,unit:"mm"},{key:"usbHoleH",min:4,max:18,absMax:20,step:.1,unit:"mm"},{key:"usbPitch",min:7,max:18,step:.1,unit:"mm"},{key:"innerWidth",min:50,max:120,step:.2,unit:"mm"},{key:"innerLength",min:110,max:260,step:.2,unit:"mm"},{key:"usbExtra",min:8,max:45,step:.5,unit:"mm"},{key:"innerHeight",min:20,max:50,step:.2,unit:"mm"},{key:"acExtra",min:10,max:55,step:.5,unit:"mm"},{key:"wall",min:1.6,max:4,step:.1,unit:"mm"},{key:"floor",min:1.2,max:4,step:.1,unit:"mm"},{key:"cornerRadius",min:0,max:12,step:.1,unit:"mm"},{key:"edgeFillet",min:0,max:2,step:.1,unit:"mm"},{key:"usbCount",min:1,max:6,step:1,unit:""},{key:"lidThickness",min:1.6,max:4,step:.1,unit:"mm"},{key:"lipDepth",min:3,max:10,step:.1,unit:"mm"},{key:"lipThick",min:1.2,max:2.4,step:.1,unit:"mm"},{key:"beadR",min:.3,max:1,step:.05,unit:"mm"},{key:"spacerFit",min:.1,max:.6,step:.05,unit:"mm"},{key:"stopH",min:0,max:8,step:.5,unit:"mm"},...w4.map(i=>({key:i,min:0,max:40,absMax:45,step:.5,unit:"mm"}))];var h9=Object.freeze({mode:"bag",bagWidth:72,bagHeight:90,bagDepth:34,phoneWidth:71.6,phoneHeight:147.6,phoneDepth:7.8,links:12,linkLength:44});var d9=(()=>{let i=new Uint32Array(256);for(let t=0;t<256;t++){let e=t;for(let n=0;n<8;n++)e=e&1?3988292384^e>>>1:e>>>1;i[t]=e>>>0}return i})();var v9=Object.freeze({rollD:30,rollLen:50,rollClear:.8,endClear:1.5,wall:1.8,floor:1.6,threadPitch:3,threadDepth:.9,threadLen:9,threadClear:.3,capWall:1.8,capTop:2,slotShape:"s",slotW:2.4,slotSweep:12,winD:14,winZ:30,winTeardrop:!0,squareW:6,rimNotches:2,notchW:2,notchD:2.5,tabAngle:100,tabZ:26,tabHole:5,tabRim:2.4,tabT:4,knurlStyle:"ribs",knurlCount:30,knurlDepth:.6});var M9=Object.freeze({ORIG_DEPTH:17.2,ORIG_WIDTH:85,CUT_Y:1,CUT_X:13,WALL:2,OUTER:[89,45.26,97.29],LIP_EXTRA:1.3,BACK_Y:8.5,FLOOR_Z:-2.5,LEAN_DEG:6,HOLE_SPACING:50});var S9=Object.freeze({base:"screw",depth:27,width:85,phoneT:12,phones:2,phoneW:81.5});function T4(i,t,e){return Cd({feature:i,label:t,stlName:e})}function Ld(i,t){return T4((e,n,s)=>za(e,i,s,48),t,"costco-lock-test")}var Dd="undo-history-style",A4=`
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
`,R4=new Set(["text","number","search","email","url","tel","password"]);function C4(i){return i?i.isContentEditable||i.tagName==="TEXTAREA"?!0:i.tagName==="INPUT"&&R4.has(i.type):!1}function P4({read:i,apply:t,limit:e=100,onChange:n=()=>{}}){let s=()=>JSON.stringify(i()),r=[s()],o=0,a={get canUndo(){return o>0},get canRedo(){return o<r.length-1},commit(){let l=s();return l===r[o]?!1:(r=r.slice(0,o+1),r.push(l),r.length>e&&r.shift(),o=r.length-1,n(a),!0)},undo(){return a.canUndo?(c(o-1),!0):!1},redo(){return a.canRedo?(c(o+1),!0):!1},clear(){r=[s()],o=0,n(a)}};function c(l){o=l,t(JSON.parse(r[o])),r[o]=s(),n(a)}return a}function Nd({panel:i,before:t,read:e,apply:n,limit:s}={}){if(!document.getElementById(Dd)){let m=document.createElement("style");m.id=Dd,m.textContent=A4,document.head.appendChild(m)}let r=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent),o=document.createElement("div");o.className="history-bar",o.setAttribute("role","toolbar"),o.setAttribute("aria-label","Undo history"),o.innerHTML=`
    <button type="button" data-history="undo" title="Undo (${r?"\u2318Z":"Ctrl+Z"})">\u21B6 Undo</button>
    <button type="button" data-history="redo" title="Redo (${r?"\u21E7\u2318Z":"Ctrl+Shift+Z"})">\u21B7 Redo</button>
    <span class="history-hint">${r?"\u2318Z \xB7 \u21E7\u2318Z":"Ctrl+Z \xB7 Ctrl+Shift+Z"}</span>
  `;let a=o.querySelector('[data-history="undo"]'),c=o.querySelector('[data-history="redo"]'),l=i||document.body,h=t||l.querySelector(".settings-group")||l.firstElementChild;h&&h.parentElement?h.parentElement.insertBefore(o,h):l.prepend(o);let d=()=>{let m=o.parentElement;for(;m&&m!==document.body&&!/(auto|scroll)/.test(getComputedStyle(m).overflowY);)m=m.parentElement;let y=m&&m!==document.body&&parseFloat(getComputedStyle(m).paddingTop)||0;o.style.top=`${-y}px`};d(),window.addEventListener("resize",d);let u=m=>{a.disabled=!m.canUndo,c.disabled=!m.canRedo},f=P4({read:e,limit:s,onChange:u,apply(m){let y=document.activeElement;y&&y!==document.body&&l.contains(y)&&y.blur&&y.blur(),n(m)}});return u(f),a.addEventListener("click",()=>f.undo()),c.addEventListener("click",()=>f.redo()),document.addEventListener("change",()=>f.commit()),document.addEventListener("click",m=>{m.target instanceof Element&&m.target.closest(".history-bar")||f.commit()}),document.addEventListener("keydown",m=>{if(!(m.metaKey||m.ctrlKey)||m.altKey)return;let y=m.key.toLowerCase(),g=y==="z"&&!m.shiftKey,p=y==="z"&&m.shiftKey||y==="y"&&m.ctrlKey&&!m.metaKey;!g&&!p||C4(m.target)||(m.preventDefault(),g?f.undo():f.redo())}),f}var Ud="slider-numbers-style",I4=`
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
`,Ya=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");function L4(i){let t=String(i);if(!t||t==="any")return 3;let e=t.indexOf(".");return e<0?0:t.length-e-1}function D4(i){let t=/^\s*(-?\d+(?:\.\d+)?)\s*(.*?)\s*$/.exec(i||"");return t?{numeric:!0,unit:t[2]}:{numeric:!1,unit:null}}function N4(i){let t=i.parentElement,e=t.querySelector("output"),n=t.querySelector(`label[for="${i.id}"]`)||t.querySelector("label"),s=document.createElement("span");s.className="num-field";let r=document.createElement("input");r.type="number",r.className="num-input",r.inputMode="decimal",r.step="any",i.id&&(r.id=`${i.id}-num`),n&&r.setAttribute("aria-label",n.textContent.trim());let o=document.createElement("span");o.className="num-unit",s.append(r,o),e?(e.replaceWith(s),s.append(e)):i.before(s);let a=i.dataset.unit??null,c=()=>{let h=D4(e?.textContent);h.numeric&&a==null&&(a=h.unit),o.textContent=a??"",e&&(e.hidden=h.numeric||!e.textContent.trim())},l=()=>{if(r.min=i.min,r.max=i.max,document.activeElement===r)return;let h=Number(Ya.get.call(i));r.value=Number.isFinite(h)?String(Number(h.toFixed(L4(i.step)))):""};return Object.defineProperty(i,"value",{configurable:!0,get(){return Ya.get.call(this)},set(h){Ya.set.call(this,h),l()}}),i.addEventListener("input",l),r.addEventListener("change",()=>{let h=parseFloat(r.value);if(!Number.isFinite(h)){l();return}let d=i.min===""?-1/0:Number(i.min),u=i.max===""?1/0:Number(i.max);Ya.set.call(i,String(Math.min(u,Math.max(d,h)))),r.blur(),l(),i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}),r.addEventListener("keydown",h=>{h.key==="Enter"&&r.blur()}),e&&new MutationObserver(c).observe(e,{childList:!0,characterData:!0,subtree:!0}),c(),l(),r}function Fd(i=document){if(!document.getElementById(Ud)){let e=document.createElement("style");e.id=Ud,e.textContent=I4,document.head.appendChild(e)}let t=[];for(let e of i.querySelectorAll('input[type="range"]'))e.dataset.noNumber!=null||e.dataset.numberPaired!=null||e.parentElement?.querySelector('input[type="number"]')||(e.dataset.numberPaired="",t.push(N4(e)));return t}var Od="designer-saves-style",U4=`
.designer-saves {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 0;
  flex: 1 1 160px;
  max-width: min(100%, 420px);
}
.designer-saves-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  width: 100%;
}
.designer-saves-row input[type="text"],
.designer-saves-row textarea {
  min-width: 0;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 10px;
  padding: 6px 10px;
  background: #fff;
  font-size: 0.82rem;
}
.designer-saves-name { flex: 1 1 120px; max-width: 180px; }
.designer-saves-note { flex: 2 1 140px; max-width: 220px; resize: none; height: 2.4em; }
.designer-saves-save {
  min-height: 36px;
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  background: var(--accent-2, #0f766e);
  color: #fff;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  touch-action: manipulation;
  white-space: nowrap;
}
.designer-saves-save:active { filter: brightness(0.95); }
.designer-saves-hint {
  margin: 0;
  width: 100%;
  text-align: right;
  font-size: 0.72rem;
  color: var(--muted, #78716c);
}
.designer-saves-hint[data-kind="err"] { color: var(--warn, #9a3412); }
.designer-saves-toggle {
  border: 1px solid var(--line, #ddd6cc);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  padding: 4px 10px;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 650;
  cursor: pointer;
  color: var(--ink, #1c1917);
}
.designer-saves-panel {
  width: 100%;
  max-height: 140px;
  overflow: auto;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 10px;
  background: rgba(255, 252, 247, 0.96);
}
.designer-saves-panel[hidden] { display: none !important; }
.designer-saves-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.designer-saves-table th,
.designer-saves-table td {
  padding: 6px 10px;
  text-align: left;
  border-bottom: 1px solid var(--line, #eee8df);
}
.designer-saves-table th {
  position: sticky;
  top: 0;
  background: #faf7f2;
  font-weight: 700;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted, #78716c);
}
.designer-saves-table tr:last-child td { border-bottom: none; }
.designer-saves-table button.load {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  font-weight: 650;
  color: var(--accent-2, #0f766e);
  cursor: pointer;
  text-align: left;
}
.designer-saves-table tr.active td { background: #ecfdf5; }
.designer-saves-empty {
  margin: 0;
  padding: 10px;
  color: var(--muted, #78716c);
  font-size: 0.78rem;
}
.panel-top-saves {
  margin: 0 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line, #ddd6cc);
}
.panel-top-saves .designer-saves { align-items: stretch; max-width: none; }
.panel-top-saves .designer-saves-row { justify-content: stretch; }
.panel-top-saves .designer-saves-hint { text-align: left; }
@media (max-width: 520px) {
  .designer-saves-note { flex: 1 1 100%; max-width: none; }
}
`;function Za(i){return`mathoose.public-playground.${i}.saves`}function Mr(i,t){return String(i??"").trim().slice(0,t)}function qa(i){return i.slice().sort((t,e)=>e.savedAt-t.savedAt||e.name.localeCompare(t.name))}function Bd(i,t){return(e,n)=>{let s=i(e),r=i(n);return t.every(o=>s[o]===r[o])}}function F4(i,t){if(!i||typeof i!="object")return null;let e=Mr(i.name,80);if(!e)return null;let n=Number(i.savedAt);return Number.isFinite(n)?{id:String(i.id||n),name:e,note:Mr(i.note,400),params:t(i.params),savedAt:n}:null}function kd(i,t,e){try{let n=JSON.parse(t(Za(i))||"[]");return Array.isArray(n)?qa(n.map(s=>F4(s,e)).filter(Boolean)):[]}catch{return[]}}function zd(i,t,e){t(Za(i),JSON.stringify(e))}function Hd(i,{name:t,note:e,params:n,mergeParams:s,now:r=Date.now()}){let o=Mr(t,80);if(!o)return{ok:!1,error:"Type a name for this save.",saves:qa(i)};let a=i.find(h=>h.name===o),c={id:a?a.id:`s${r}`,name:o,note:Mr(e,400),params:s(n),savedAt:r};return{ok:!0,saves:qa([c,...i.filter(h=>h.name!==o)]).slice(0,40),entry:c,replaced:!!a}}function O4(){if(document.getElementById(Od))return;let i=document.createElement("style");i.id=Od,i.textContent=U4,document.head.appendChild(i)}function B4(i){try{return new Date(i).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return""}}function Vd({appId:i,anchor:t,placement:e="header",mergeParams:n,sameParams:s,getParams:r,setParams:o,onLoad:a}){O4();let c=document.createElement("div");c.className=e==="panel"?"panel-top-saves":"designer-saves",c.innerHTML=`
    <div class="designer-saves-row">
      <input class="designer-saves-name" type="text" maxlength="80" autocomplete="off" placeholder="Save name" aria-label="Save name" />
      <textarea class="designer-saves-note" maxlength="400" placeholder="Note on this save" aria-label="Note on this save"></textarea>
      <button type="button" class="designer-saves-save">Save</button>
      <button type="button" class="designer-saves-toggle" aria-expanded="false">Saved versions</button>
    </div>
    <p class="designer-saves-hint" hidden></p>
    <div class="designer-saves-panel" hidden>
      <table class="designer-saves-table">
        <thead><tr><th>Name</th><th>Date</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `,e==="panel"?t.prepend(c):t.appendChild(c);let l=c.querySelector(".designer-saves-name"),h=c.querySelector(".designer-saves-note"),d=c.querySelector(".designer-saves-hint"),u=c.querySelector(".designer-saves-panel"),f=c.querySelector(".designer-saves-toggle"),m=c.querySelector("tbody"),y=[];function g(M,S=""){if(!M){d.hidden=!0,d.textContent="",d.dataset.kind="";return}d.hidden=!1,d.textContent=M,d.dataset.kind=S}function p(){m.replaceChildren();let M=r();if(!y.length){u.innerHTML='<p class="designer-saves-empty">No saves in this browser yet.</p>';return}u.querySelector("table")||(u.innerHTML=`
        <table class="designer-saves-table">
          <thead><tr><th>Name</th><th>Date</th></tr></thead>
          <tbody></tbody>
        </table>
      `);let S=u.querySelector("tbody");y.forEach((R,_)=>{let E=document.createElement("tr");s(R.params,M)&&E.classList.add("active");let C=document.createElement("td"),P=document.createElement("button");P.type="button",P.className="load",P.textContent=_===0?`${R.name} \xB7 Latest`:R.name,R.note&&(P.title=R.note),P.addEventListener("click",()=>A(R.id)),C.append(P);let F=document.createElement("td");F.textContent=B4(R.savedAt),R.note&&(F.title=R.note),E.append(C,F),S.append(E)})}function T(){let M=l.value.trim();if(!M){g("");return}let S=y.find(R=>R.name===M);g(S?`\u201C${M}\u201D is already saved. Saving again replaces it.`:"")}function A(M){let S=y.find(R=>R.id===M);S&&(o(S.params),l.value=S.name,h.value=S.note,g(`Loaded ${S.name}. Edit sliders, then save again.`),a?.(S),p())}function b(){let M=Hd(y,{name:l.value,note:h.value,params:r(),mergeParams:n});if(!M.ok){g(M.error,"err");return}y=M.saves;try{zd(i,(S,R)=>localStorage.setItem(S,R),y)}catch{g("This browser blocked saving. Nothing was uploaded.","err");return}l.value=M.entry.name,g(M.replaced?`Replaced ${M.entry.name}.`:`Saved ${M.entry.name}.`),p()}try{y=kd(i,M=>localStorage.getItem(M),n)}catch{y=[]}return c.querySelector(".designer-saves-save").addEventListener("click",b),l.addEventListener("input",T),l.addEventListener("keydown",M=>{M.key==="Enter"&&(M.preventDefault(),b())}),f.addEventListener("click",()=>{let M=u.hidden;u.hidden=!M,f.setAttribute("aria-expanded",M?"true":"false"),M&&p()}),p(),{renderList:p,get saves(){return y}}}var m7=Za("costco-bin-lock");var Gd=Bd(_n,An.map(i=>i.key));function Wd({preview:i,panel:t,measureBtn:e="measure",hintEl:n="hint",defaultHint:s="Drag to orbit \xB7 pinch or scroll to zoom",onPair:r,onReset:o}){let a=h=>typeof h=="string"?document.getElementById(h):h,c=a(e),l=a(n);c?.addEventListener("click",()=>{let h=!i.measureMode;i.setMeasureMode(h),c.classList.toggle("active",h),h||o?.(),l&&(l.textContent=h?"Click one face, then another":s)}),i.onMeasure=h=>{!l||!i.measureMode||(h.phase==="cleared"&&(l.textContent="Click one face, then another",o?.()),h.phase==="first"&&(l.textContent="Click the second face",o?.()),h.phase==="pair"&&(l.textContent=`${h.label} \xB7 drag still orbits`,r?.(h,t)))}}function k4(i,t){let e=t.x-i.x,n=t.y-i.y,s=t.z-i.z;return Math.hypot(e,n,s)}function Xd(i){let t=Math.abs(Number(i)||0);return t<3?Math.max(.35,t*.45):t<8?Math.max(.8,t*.22):Math.min(8,Math.max(2.4,t*.12))}function z4(i,t,e){if(!i.parts||!i.parts.length)return!0;if(i.pair){let n=[t.partId,e.partId];return n[0]===i.parts[0]&&n[1]===i.parts[1]||n[0]===i.parts[1]&&n[1]===i.parts[0]}return i.parts.includes(t.partId)&&i.parts.includes(e.partId)}function Yd(i,t,e){let n=k4(i.point,t.point),s=[];for(let r of e||[]){if(!z4(r,i,t)||r.when&&!r.when(i,t,n))continue;if(r.kind==="chord"){let f=r.tol??Xd(r.value);Math.abs(n-Number(r.value))<=f&&s.push(r);continue}if(!r.axis)continue;let o=i.point[r.axis],a=t.point[r.axis],c=Math.min(o,a),l=Math.max(o,a),h=Math.min(r.end0,r.end1),d=Math.max(r.end0,r.end1),u=r.tol??Xd(d-h);Math.abs(c-h)<=u&&Math.abs(l-d)<=u&&s.push(r)}return{distance:n,hits:s}}function H4(i){let t=[];for(let e of i||[])for(let n of e.params||[])t.includes(n)||t.push(n);return t}function qd(i){if(!i?.length)return{title:"Between the two clicks",detail:"No slider sets this distance.",params:[]};let t=H4(i),e=i.map(n=>{let s=Number(n.named);return Number.isFinite(s)?`${n.title} (${s.toFixed(1)} mm)`:n.title});return{title:i.map(n=>n.title).join(" \xB7 "),detail:t.length?e.join(" \xB7 "):`${e.join(" \xB7 ")}. No slider sets this distance.`,params:t}}function V4(i){let t=rn(i),e=n=>Math.min(8,Math.max(1.2,n*.08));return[{title:"Slot length",axis:"y",end0:-t.p.slotLength/2,end1:t.p.slotLength/2,params:["slotLength"],tol:e(t.p.slotLength)},{title:"Slot width",axis:"x",end0:-t.p.slotWidth/2,end1:t.p.slotWidth/2,params:["slotWidth"],tol:e(t.p.slotWidth)},{title:"Square end",axis:"x",end0:-t.headX/2,end1:t.headX/2,params:["squareEnd"],tol:e(t.headX)}]}function Zd(i,t,e){let{hits:n}=Yd({point:i.point,partId:i.partId},{point:t.point,partId:t.partId},V4(e));return qd(n)}function G4(i){let t=Math.hypot(i[0],i[1],i[2]);return t<1e-9?[0,0,1]:[i[0]/t,i[1]/t,i[2]/t]}var wi={x:0,y:1,z:2};function jd(i){let t=i.thickness+i.throat,e=i.headX/2,n=i.headY/2,s=i.hookX/2,r=i.hookY/2,o=5.2,a=Math.min(2.4,Math.max(1.5,i.throat-1.3)),c=i.thickness+(i.throat-a)/2,l=c+a,h=i.p.slotLength/2+o,d=i.p.slotWidth/2+o,u=i.p.slotLength/2,f=i.p.slotWidth/2,m=(y,g,p,T,A,b,M,S,R,_,E)=>({id:y,part:g,axis:p,side:T,plane:A,uAxis:b,u0:M,u1:S,vAxis:R,v0:_,v1:E});return[m("pad-x+","lock","x",1,e,"y",-n,n,"z",t,i.totalZ),m("pad-x-","lock","x",-1,-e,"y",-n,n,"z",t,i.totalZ),m("pad-y+","lock","y",1,n,"x",-e,e,"z",t,i.totalZ),m("pad-y-","lock","y",-1,-n,"x",-e,e,"z",t,i.totalZ),m("pad-z+","lock","z",1,i.totalZ,"x",-e,e,"y",-n,n),m("pad-z-","lock","z",-1,t,"x",-e,e,"y",-n,n),m("hook-x+","lock","x",1,s,"y",-r,r,"z",0,i.thickness),m("hook-x-","lock","x",-1,-s,"y",-r,r,"z",0,i.thickness),m("hook-y+","lock","y",1,r,"x",-s,s,"z",0,i.thickness),m("hook-y-","lock","y",-1,-r,"x",-s,s,"z",0,i.thickness),m("hook-z+","lock","z",1,i.thickness,"x",-s,s,"y",-i.coreY/2,i.coreY/2),m("hook-z-","lock","z",-1,0,"x",-s,s,"y",-r,r),m("lid-x+","lid","x",1,h,"y",-d,d,"z",c,l),m("lid-x-","lid","x",-1,-h,"y",-d,d,"z",c,l),m("lid-y+","lid","y",1,d,"x",-h,h,"z",c,l),m("lid-y-","lid","y",-1,-d,"x",-h,h,"z",c,l),m("lid-z+","lid","z",1,l,"x",-h,h,"y",-d,d),m("lid-z-","lid","z",-1,c,"x",-h,h,"y",-d,d),m("slot-y+","lid","y",1,f,"x",-(u-f),u-f,"z",c,l),m("slot-y-","lid","y",-1,-f,"x",-(u-f),u-f,"z",c,l),m("slot-x+","lid","x",1,u,"y",-f,f,"z",c,l),m("slot-x-","lid","x",-1,-u,"y",-f,f,"z",c,l)]}function $d(i){return[i.x,i.y,i.z]}function Hl(i,t,e,n){let s=$d(i),r=G4($d(t)),o=null;for(let a of jd(n)){if(a.part!==e)continue;let c=wi[a.axis],l=Math.abs(s[c]-a.plane),h=r[c]*a.side;if(h<.55||l>1.8)continue;let d=wi[a.uAxis],u=wi[a.vAxis],f=1.6;if(s[d]<a.u0-f||s[d]>a.u1+f||s[u]<a.v0-f||s[u]>a.v1+f)continue;let m=a.u1-a.u0||1,y=a.v1-a.v0||1,g=Ci((s[d]-a.u0)/m,0,1),p=Ci((s[u]-a.v0)/y,0,1),T=l+(1-h)*4;(!o||T<o.score)&&(o={id:a.id,u:g,v:p,score:T})}if(o)return{id:o.id,u:o.u,v:o.v};if(e==="lock"){let a=Math.hypot(s[0],s[1]),c=Math.hypot(r[0],r[1]);if(Math.abs(a-n.neckR)<1.5&&c>.7)return{id:"neck",u:Math.atan2(s[1],s[0]),v:Ci(s[2]/(n.totalZ||1),0,1)}}return null}function Jd(i,t){if(!i)return null;if(i.id==="neck"){let r=Math.cos(i.u),o=Math.sin(i.u);return{point:{x:t.neckR*r,y:t.neckR*o,z:i.v*t.totalZ},normal:{x:r,y:o,z:0}}}let e=jd(t).find(r=>r.id===i.id);if(!e)return null;let n=[0,0,0],s=[0,0,0];return n[wi[e.axis]]=e.plane,n[wi[e.uAxis]]=e.u0+i.u*(e.u1-e.u0),n[wi[e.vAxis]]=e.v0+i.v*(e.v1-e.v0),s[wi[e.axis]]=e.side,{point:{x:n[0],y:n[1],z:n[2]},normal:{x:s[0],y:s[1],z:s[2]}}}function Kd(i,t,e){if(!i||!t)return null;let n=rn(e),s=Jd(i,n),r=Jd(t,n);return!s||!r?null:yr(s,r).primary}function Qd(i,t,e,n=An){let s=Kd(t,e,i);if(s==null||!Number.isFinite(s))return[];let r=[];for(let o of n){let a=Number(i[o.key]),c=[a+o.step,a-o.step,o.min,o.max],l=!1;for(let h of c){let d=Ci(h,o.min,o.max);if(Math.abs(d-a)<1e-6)continue;let u=Kd(t,e,{...i,[o.key]:d});if(u!=null&&Math.abs(u-s)>.03){l=!0;break}}l&&r.push(o.key)}return r}var ys="costco-bin-lock",ze=i=>document.getElementById(i),t1=new URLSearchParams(location.search),Gl=t1.has("capture")||t1.has("shot"),_e=_n(!Gl&&_d()?yd(ys)||{}:{}),Ti=[],kn=!1,Ja="",ke,s1=null,e1=0,n1=0;function X4(i,t){let e=An.find(s=>s.key===i)?.step??.1,n=e>=1?0:e<.1?2:1;return`${Number(t).toFixed(n)} mm`}function _s(i){_e=_n(i);for(let t of An){let e=ze(t.key),n=ze(`${t.key}-out`);e&&(e.min=String(t.min),e.max=String(t.max),e.step=String(t.step),e.dataset.unit=t.unit,e.value=String(_e[t.key])),n&&(n.textContent=X4(t.key,_e[t.key]))}a1?.renderList()}function li(i,t=""){let e=ze("status");e&&(e.textContent=i,e.dataset.kind=t)}function r1(i){let t=i?.d||rn(_e),e=ih(t),n=ze("warnings");n&&(n.innerHTML=e.map(a=>`<p class="warn">${a}</p>`).join(""));let s=ze("readout");if(!s)return;let r=i?(i.volume/1e3*1.24).toFixed(1):"\u2014",o=i?Math.round(i.tris):"\u2014";s.innerHTML=`
    Slot <b>${Rn(t.p.slotLength)}</b> \xD7 <b>${Rn(t.p.slotWidth)}</b><br />
    Hook <b>${Rn(t.hookY)}</b> \xD7 <b>${Rn(t.hookX)}</b>,
    <b>${Rn(t.p.engagement)}</b> under each rim<br />
    Flat shelf left after a shift <b>${Rn(Math.max(0,t.seatLeft))}</b>
    \xB7 throat <b>${Rn(t.throat)}</b><br />
    Drop-in clearance along the slot <b>${Rn(t.insertGap)}</b><br />
    Square end <b>${t.headX.toFixed(1)} \xD7 ${t.headY.toFixed(1)} mm</b><br />
    Pad height <b>${t.totalZ.toFixed(1)} mm</b>
    \xB7 PLA ~<b>${r} g</b> \xB7 ${o} tris
  `}async function o1(){let i=++n1;li("Updating\u2026");try{let t=await dd(_e,{quality:"preview"});if(i!==n1)return;s1=t,ke.update(t),r1(t),li("Live")}catch(t){console.error(t),li(String(t.message||t),"err")}}function Sr(){r1(s1),window.clearTimeout(e1),e1=window.setTimeout(()=>{o1()},40)}var a1;function Y4(){let i=document.querySelector("header .header-saves");i&&(a1=Vd({appId:ys,anchor:i,mergeParams:_n,sameParams:Gd,getParams:()=>_e,setParams:t=>{_e=_n(t),_s(_e),Sr()}}))}function Vl(i){document.querySelectorAll("[data-view]").forEach(t=>{t.classList.toggle("active",t.getAttribute("data-view")===i)})}async function q4(){li("Building STL\u2026");try{let{stl:i,volume:t}=await fd(_e),e=(t/1e3*1.24).toFixed(1),n=`costco-bin-lock-${"v2"}.stl`;md(n,i),Gl||(br(ys,_e),Ga(ys,{filename:n,params:_e})),li(`STL \xB7 ${gd(i)} tris \xB7 ~${e} g PLA`)}catch(i){console.error(i),li(String(i.message||i),"err")}}function Z4(i){return document.querySelector(`label[for="${i}"]`)?.textContent?.trim()||i}function $4(){let i=Ja?`${Ja} \xB7 `:"";if(!Ti.length)return`${i}no slider changes this`;let t=Ti.map(Z4).join(", ");return kn?`${i}only ${t} \xB7 click for all`:`${i}${t} \xB7 click to show only these`}function Wl(){document.querySelectorAll(".panel .row").forEach(n=>{let s=n.querySelector('input[type="range"]')?.id,r=!!(s&&Ti.includes(s));n.classList.toggle("measure-hot",r),n.hidden=!!(kn&&s&&!r)}),document.querySelectorAll(".settings-group").forEach(n=>{let s=[...n.querySelectorAll(".row")];if(!s.length){n.hidden=!1;return}n.hidden=kn&&s.every(r=>r.hidden)});let i=ze("measureBubble");i?.classList.toggle("filtering",kn),i?.setAttribute("aria-pressed",kn?"true":"false");let t=Ti.length||ke?.picks?.length===2?$4():"";ke&&(ke.kindText=t);let e=ze("measureKind");e&&t&&(e.textContent=t)}function J4(){Ti=[],kn=!1,Ja="",Wl()}function K4(i){let t=ke.d,e=Hl(i[0].point,i[0].normal,i[0].part||"lock",t),n=Hl(i[1].point,i[1].normal,i[1].part||"lock",t);Ti=Qd(_e,e,n),kn=!1;let s=Zd(i[0],i[1],_e);Ja=s?.title&&s.title!=="Between the two clicks"?s.title:"",Wl(),document.querySelector(".panel .row.measure-hot")?.scrollIntoView({block:"nearest"})}function j4(){_s(_e);for(let{key:i}of An){let t=ze(i);t&&t.addEventListener("input",()=>{_e=_n({..._e,[i]:Number(t.value)}),_s(_e),Sr()})}ze("reset")?.addEventListener("click",()=>{_e=_n(vs),_s(_e),ke.fitted=!1,Sr()}),ze("resetView")?.addEventListener("click",()=>{ke.fitted=!1,ke.setNamedView("iso"),Vl("iso")}),document.querySelectorAll("[data-view]").forEach(i=>{i.addEventListener("click",()=>{let t=i.getAttribute("data-view");ke.setNamedView(t),Vl(t)})}),ze("download")?.addEventListener("click",()=>q4()),Pd({appId:ys,actions:ze("download")?.parentElement,buttonLabel:"Lock test",title:"Lock test settings",fields:[{key:"slotLength",label:"Slot length",min:18,max:70,step:.1,unit:"mm"},{key:"slotWidth",label:"Slot width",min:8,max:24,step:.1,unit:"mm"},{key:"clipThickness",label:"Clip thickness",min:2.8,max:7,step:.1,unit:"mm"},{key:"engagement",label:"Engagement",min:3,max:14,step:.1,unit:"mm"},{key:"squareEnd",label:"Square end",min:12,max:40,step:.1,unit:"mm"}],getParams:()=>_e,setParams:i=>{_s(i),Sr()},build:(i,t)=>Ld(i,t),fileStem:"costco-lock"}),Wd({preview:ke,panel:document.querySelector(".panel"),measureBtn:"measure",hintEl:"hint",defaultHint:"Drag to orbit \xB7 pinch or scroll to zoom",onReset:()=>J4(),onPair:()=>{ke.picks?.length===2&&K4(ke.picks)}}),ze("measureBubble")?.addEventListener("click",i=>{i.stopPropagation(),Ti.length&&(kn=!kn,Wl())})}var i1=ze("app-version");i1&&(i1.textContent=`${nh} v${eh}`);ke=new Ha({canvas:ze("view")});window.__lockPreview=ke;j4();Gl||vd(ys);Fd(document.querySelector(".panel"));Y4();window.__lockHistory=Nd({panel:document.querySelector(".panel"),read:()=>_e,apply:i=>{_s(i),Sr()}});li("Loading CAD\u2026");var $a=new URLSearchParams(location.search).get("shot");$a&&document.body.classList.add("capture");o1().then(()=>{$a&&(ke.setNamedView($a),Vl($a)),window.__lockReady=!0}).catch(i=>{li(String(i.message||i),"err")});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
