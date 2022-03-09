var z=Object.defineProperty;var w=Object.getOwnPropertySymbols;var Q=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var x=(t,e,s)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,f=(t,e)=>{for(var s in e||(e={}))Q.call(e,s)&&x(t,s,e[s]);if(w)for(var s of w(e))R.call(e,s)&&x(t,s,e[s]);return t};import{g as V,F as j,l as K}from"./vendor.cf13a3c0.js";const $=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}};$();const P=document.getElementById("drawer"),H=document.getElementById("hamburger-button"),B=document.getElementById("scrim");let p=!1;function W(t){t.preventDefault(),p||(P.classList.add("drawer--open"),B.classList.add("scrim--visible"),p=!0)}function S(){p&&(P.classList.remove("drawer--open"),B.classList.remove("scrim--visible"),p=!1)}function X(){window.matchMedia("(min-width: 1024px)").matches&&p&&S()}function U(){H.addEventListener("click",W),B.addEventListener("click",S)}const Z=document.getElementById("days-display"),Y=document.getElementById("days-next"),A=document.getElementById("days-current"),ee=document.getElementById("hours-display"),te=document.getElementById("hours-next"),D=document.getElementById("hours-current"),ne=document.getElementById("minutes-display"),se=document.getElementById("minutes-next"),k=document.getElementById("minutes-current"),oe=document.getElementById("seconds-display"),ae=document.getElementById("seconds-next"),C=document.getElementById("seconds-current"),re="2022-03-20T20:00:00";let u=0,d={},m=0,i={},L=!1;function ie(){const t=new Date(re).getTime(),e=Date.now();return Math.round((t-e)/1e3)}function T(t){const e={seconds:t};return e.days=Math.floor(e.seconds/86400),e.seconds%=86400,e.hours=Math.floor(e.seconds/3600),e.seconds%=3600,e.minutes=Math.floor(e.seconds/60),e.seconds%=60,Object.keys(e).forEach(s=>{e[s]=`0${e[s].toString()}`.slice(-2)}),e}function b(t,e,s,a){const n=document.createElement("div"),o=document.createElement("div"),r=document.createElement("div"),l=document.createElement("span"),c=document.createElement("span");n.classList.add("timer__pannel","timer__pannel--flip"),o.classList.add("timer__face","timer__face--front"),r.classList.add("timer__face","timer__face--back"),l.classList.add("timer__number","timer__number--bottom"),c.classList.add("timer__number","timer__number--top"),l.innerText=e,c.innerText=s,n.appendChild(o),o.appendChild(l),n.appendChild(r),r.appendChild(c),a.appendChild(n),V.to(".timer__pannel--flip",{rotationX:-180,duration:.5}),setTimeout(()=>{t.innerText=s,a.removeChild(n)},900)}function F(t=!1){(d.days!==i.days||t)&&(Y.innerText=i.days,A.innerText=d.days,t||b(A,d.days,i.days,Z)),(d.hours!==i.hours||t)&&(te.innerText=i.hours,D.innerText=d.hours,t||b(D,d.hours,i.hours,ee)),(d.minutes!==i.minutes||t)&&(se.innerText=i.minutes,k.innerText=d.minutes,t||b(k,d.minutes,i.minutes,ne)),ae.innerText=i.seconds,C.innerText=d.seconds,b(C,d.seconds,i.seconds,oe)}function de(){u=ie(),d=T(u),m=u-1,i=T(m),F(!0),L=setInterval(()=>{F(),u<=0?(clearInterval(L),L=!1):(u=m,d=i,m=m-1,i=T(m))},1e3)}const I=document.getElementById("floating-action-button"),M=200;let g=!1;function le(t){t.preventDefault(),window.scrollTo(0,0)}function ce(){g||(I.classList.add("floating-action-button--visible"),g=!0)}function N(){g&&(I.classList.remove("floating-action-button--visible"),g=!1)}function me(t,e){t>=M?t<e?ce():t>e&&N():t<=M&&N()}function ue(){I.addEventListener("click",le)}const J=document.getElementById("top-app-bar"),y=document.getElementsByClassName("top-app-bar__label"),q=document.getElementById("hamburger-button");let v=!1;function pe(){if(!v){J.classList.add("top-app-bar--dark");for(let t=0;t<y.length;t++)y[t].classList.add("top-app-bar__label--on-dark");q.classList.add("hamburger-button--on-dark"),v=!0}}function fe(){if(v){J.classList.remove("top-app-bar--dark");for(let t=0;t<y.length;t++)y[t].classList.remove("top-app-bar__label--on-dark");q.classList.remove("hamburger-button--on-dark"),v=!1}}function G(t){t>0?pe():t<=0&&fe()}var be="/Failygames/assets/gold-medal.58b7113e.svg",he="/Failygames/assets/silver-medal.99252518.svg",ge="/Failygames/assets/bronze-medal.2d5df046.svg";function ye(t){const e=document.createElement("img");switch(e.classList.add("leaderboard__medal"),t){case 1:e.setAttribute("src",be),e.setAttribute("alt","Gold medal illustration");break;case 2:e.setAttribute("src",he),e.setAttribute("alt","Silver medal illustration");break;case 3:e.setAttribute("src",ge),e.setAttribute("alt","Bronze medal illustration");break;default:throw new Error("The position is invalid")}return e}function _(t,e){e.hasChildNodes()&&(e.innerHTML=""),t.forEach(s=>{const a=document.createElement("tr");a.classList.add("leaderboard__row"),Object.values(s).forEach((n,o)=>{const r=document.createElement("td");if(o===0&&s.position<=3){const l=document.createElement("span"),c=ye(s.position);l.innerText=n,l.classList.add("leaderboard__position"),r.classList.add("leaderboard__data","leaderboard__data--with-medal"),r.appendChild(l),r.appendChild(c)}else r.innerText=n,r.classList.add("leaderboard__data");a.appendChild(r)}),e.appendChild(a)})}function ve(t,e,s,a){const n=t.target.value;if(n.length>0){const o=e.search(n).map(r=>r.item);_(o,a)}else _(s,a)}function Ee(t){let e=0,s=1;const a=[...t];return a.sort((n,o)=>o.points-n.points),a.map((n,o)=>o===0?(e=n.points,f({position:s},n)):n.points===e?f({position:s},n):(e=n.points,s+=1,f({position:s},n)))}function E(t,e,s){const a=document.getElementById(e),n=document.getElementById(s),o=Ee(t),r=new j(o,{keys:["team"]}),l=K.exports.debounce(ve,500);n.addEventListener("keyup",c=>l(c,r,o,a)),_(o,a)}var Le=[{team:"Lena Silvo",points:1e3},{team:"Quentin Cooper",points:600},{team:"Alexis Menpeur",points:800},{team:"Jenny Baker",points:400},{team:"Garry Green",points:900},{team:"Ada Jackson",points:300},{team:"Pamela Padilla",points:700},{team:"Clea Dawson",points:500},{team:"Elina Deau",points:300}],Te=[{team:"Garry Green",points:900},{team:"Lena Silvo",points:1e3},{team:"Alexis Menpeur",points:800}],_e=[{team:"Quentin Cooper",points:600},{team:"Pamela Padilla",points:700},{team:"Clea Dawson",points:500}],Be=[{team:"Elina Deau",points:300},{team:"Ada Jackson",points:300},{team:"Jenny Baker",points:400}];let O=0,h=0;function Ie(){h=window.scrollY,G(h),me(h,O),O=h}function we(){X()}function xe(){window.addEventListener("scroll",Ie),window.addEventListener("resize",we)}G(window.scrollY);xe();U();de();ue();E(Le,"leaderboard-global","search-bar-global");E(Te,"leaderboard-q1","search-bar-q1");E(_e,"leaderboard-q2","search-bar-q2");E(Be,"leaderboard-q3","search-bar-q3");window.addEventListener("load",()=>{document.body.classList.remove("preload")});