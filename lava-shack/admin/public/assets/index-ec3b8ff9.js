import{r as e,a as u,d}from"./index-effbfb95.js";const m=({isVisible:s,start:o,end:c,classname:l,children:r,isFullScreen:n=!1})=>{const[a,t]=e.useState(!1);e.useEffect(()=>{a&&!s?setTimeout(()=>t(!1),100):t(s)});const f={[o||"scale-[0.98] opacity-0"]:!s,[c||"scale-100 opacity-100"]:s,"absolute inset-0":a&&n};return u("div",{className:d("transition-all duration-100 z-50",f,l),children:a?r:null})};export{m as F};