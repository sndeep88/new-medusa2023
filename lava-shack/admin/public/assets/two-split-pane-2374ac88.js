import{r as n,c8 as h,a as l,d as u}from"./index-effbfb95.js";const g=e=>{const t=n.useRef(null),s=n.useRef(0),{height:r}=h();return n.useLayoutEffect(()=>{if(t.current){let{top:i}=t.current.getBoundingClientRect();s.current=r-e-i}},[e,r]),{ref:t,height:s.current}},m=({threeCols:e,className:t,children:s})=>{const r=n.Children.count(s),{ref:i,height:o}=g(32),a=o?{gridTemplateRows:`${o}px`}:void 0;if(r>2)throw new Error("TwoSplitPane can only have two or less children");return l("div",{className:u("grid gap-xsmall grid-cols-1",t,{"medium:grid-cols-2":!e,"medium:grid-cols-3":e}),style:a,ref:i,children:n.Children.map(s,(d,c)=>l("div",{className:u("w-full h-full",{"col-span-2":e&&c===1}),children:d},c))})};export{m as T};