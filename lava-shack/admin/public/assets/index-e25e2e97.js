import{bW as N,r as e,bX as O,bY as w,b_ as x,b$ as p,c0 as A,c1 as I,bZ as M,cc as T}from"./index-effbfb95.js";const P="Collapsible",[D,W]=N(P),[S,C]=D(P),k=e.forwardRef((t,s)=>{const{__scopeCollapsible:c,open:a,defaultOpen:n,disabled:l,onOpenChange:r,...$}=t,[d=!1,i]=O({prop:a,defaultProp:n,onChange:r});return e.createElement(S,{scope:c,disabled:l,contentId:w(),open:d,onOpenToggle:e.useCallback(()=>i(b=>!b),[i])},e.createElement(x.div,p({"data-state":m(d),"data-disabled":l?"":void 0},$,{ref:s})))}),F="CollapsibleTrigger",L=e.forwardRef((t,s)=>{const{__scopeCollapsible:c,...a}=t,n=C(F,c);return e.createElement(x.button,p({type:"button","aria-controls":n.contentId,"aria-expanded":n.open||!1,"data-state":m(n.open),"data-disabled":n.disabled?"":void 0,disabled:n.disabled},a,{ref:s,onClick:A(t.onClick,n.onOpenToggle)}))}),y="CollapsibleContent",B=e.forwardRef((t,s)=>{const{forceMount:c,...a}=t,n=C(y,t.__scopeCollapsible);return e.createElement(I,{present:c||n.open},({present:l})=>e.createElement(G,p({},a,{ref:s,present:l})))}),G=e.forwardRef((t,s)=>{const{__scopeCollapsible:c,present:a,children:n,...l}=t,r=C(y,c),[$,d]=e.useState(a),i=e.useRef(null),b=M(s,i),g=e.useRef(0),_=g.current,h=e.useRef(0),R=h.current,u=r.open||$,E=e.useRef(u),f=e.useRef();return e.useEffect(()=>{const o=requestAnimationFrame(()=>E.current=!1);return()=>cancelAnimationFrame(o)},[]),T(()=>{const o=i.current;if(o){f.current=f.current||{transitionDuration:o.style.transitionDuration,animationName:o.style.animationName},o.style.transitionDuration="0s",o.style.animationName="none";const v=o.getBoundingClientRect();g.current=v.height,h.current=v.width,E.current||(o.style.transitionDuration=f.current.transitionDuration,o.style.animationName=f.current.animationName),d(a)}},[r.open,a]),e.createElement(x.div,p({"data-state":m(r.open),"data-disabled":r.disabled?"":void 0,id:r.contentId,hidden:!u},l,{ref:b,style:{"--radix-collapsible-content-height":_?`${_}px`:void 0,"--radix-collapsible-content-width":R?`${R}px`:void 0,...t.style}}),u&&n)});function m(t){return t?"open":"closed"}const X=k,Y=L,Z=B;export{X as $,Y as a,Z as b,W as c};
