import{T as E,a as v,F as T,D as C,S}from"./scrim.a6557a32.js";import{g as u,S as f}from"./vendor.294cac20.js";var k=[{name:"Lena Silvo",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Quentin Cooper",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Alexis Menpeur",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Jenny Baker",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Garry Green",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Ada Jackson",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Pamela Padilla",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Clea Dawson",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},{name:"Elina Deau",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}];class D{constructor(e,i){this.teams=e,this.grid=document.getElementById(i),this.displayTeams()}getTeamLetters(e){return"ls"}getShortTeamDescription(e){return`${e.slice(0,37)}...`}displayTeams(){this.teams.forEach(e=>{const i=document.createElement("div"),n=document.createElement("div"),o=document.createElement("div"),a=document.createElement("div"),r=document.createElement("span"),c=document.createElement("h2"),d=document.createElement("p");i.classList.add("card"),n.classList.add("team-card"),o.classList.add("team-card__header"),a.classList.add("team-card__body"),r.classList.add("team-card__letters"),c.classList.add("team-card__title"),d.classList.add("team-card__description"),r.innerText=this.getTeamLetters(e.name),c.innerText=e.name,d.innerText=this.getShortTeamDescription(e.description),o.appendChild(r),a.appendChild(c),a.appendChild(d),n.appendChild(o),n.appendChild(a),i.appendChild(n),this.grid.appendChild(i)})}clearGrid(){this.grid.innerHTML=""}}u.registerPlugin(f);let s=0,p=0;const _=document.getElementById("hamburger-button"),g=new E,m=new v("theme-toggle-button","toggle-button--active"),h=new T("floating-action-button","floating-action-button--visible"),l=new C("drawer"),t=new S;new D(k,"team-cards");g.theme==="dark"&&m.activate();window.addEventListener("scroll",()=>{s=window.scrollY,h.showOnScroll(p,s),p=s});window.addEventListener("resize",()=>{window.matchMedia("(min-width: 1024px)").matches&&(l.close(),t.isMounted&&t.htmlElement.removeEventListener("click",L),t.unmount())});m.htmlElement.addEventListener("click",()=>{g.toggleTheme(),m.toggle()});h.htmlElement.addEventListener("click",()=>{u.to(window,{duration:.5,scrollTo:0})});function L(){t.unmount(),l.close()}_.addEventListener("click",()=>{l.open(s),t.mount(),t.htmlElement.addEventListener("click",L,{once:!0})});