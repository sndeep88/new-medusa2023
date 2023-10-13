import{bW as p,r as c,b_ as f,b$ as $,cb as v,cc as x,j as A,d as m,a as l,S as _}from"./index-effbfb95.js";const g="Avatar",[S,P]=p(g),[w,u]=S(g),L=c.forwardRef((e,o)=>{const{__scopeAvatar:n,...t}=e,[a,r]=c.useState("idle");return c.createElement(w,{scope:n,imageLoadingStatus:a,onImageLoadingStatusChange:r},c.createElement(f.span,$({},t,{ref:o})))}),h="AvatarImage",E=c.forwardRef((e,o)=>{const{__scopeAvatar:n,src:t,onLoadingStatusChange:a=()=>{},...r}=e,s=u(h,n),d=M(t),i=v(b=>{a(b),s.onImageLoadingStatusChange(b)});return x(()=>{d!=="idle"&&i(d)},[d,i]),d==="loaded"?c.createElement(f.img,$({},r,{ref:o,src:t})):null}),C="AvatarFallback",I=c.forwardRef((e,o)=>{const{__scopeAvatar:n,delayMs:t,...a}=e,r=u(C,n),[s,d]=c.useState(t===void 0);return c.useEffect(()=>{if(t!==void 0){const i=window.setTimeout(()=>d(!0),t);return()=>window.clearTimeout(i)}},[t]),s&&r.imageLoadingStatus!=="loaded"?c.createElement(f.span,$({},a,{ref:o})):null});function M(e){const[o,n]=c.useState("idle");return c.useEffect(()=>{if(!e){n("error");return}let t=!0;const a=new window.Image,r=s=>()=>{t&&n(s)};return n("loading"),a.onload=r("loaded"),a.onerror=r("error"),a.src=e,()=>{t=!1}},[e]),o}const j=L,y=E,N=I,T=({user:e,font:o="inter-small-semibold",color:n="bg-violet-60",isLoading:t=!1})=>{let a;return e!=null&&e.first_name&&(e!=null&&e.last_name)?a=e.first_name+" "+e.last_name:e!=null&&e.email?a=e.email:a="Medusa user",A(j,{className:m("w-full h-full items-center justify-center overflow-hidden select-none rounded-circle",n),children:[l(y,{src:e==null?void 0:e.img,alt:a,className:"object-cover w-full h-full rounded-circle"}),l(N,{className:m("w-full h-full flex items-center justify-center bg-inherit text-grey-0 rounded-circle",o),children:t?l(_,{size:"small",variant:"primary"}):a.slice(0,1).toUpperCase()})]})};export{T as A};
