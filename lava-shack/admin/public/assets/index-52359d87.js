import{r as i,j as c,a as e,B as d}from"./index-effbfb95.js";import{P as y,I as u}from"./index-dd9f9076.js";import{T as g}from"./trash-icon-abcb5140.js";const C=({metadata:l,setMetadata:n,heading:o="Metadata"})=>{const[t,m]=i.useState([]);i.useEffect(()=>{m(l)},[l]);const h=()=>{n([...l,{key:"",value:""}])},p=a=>s=>{const r=l;r[a]={key:s,value:r[a].value},n(r)},v=a=>s=>{const r=l;r[a]={key:r[a].key,value:s},n(r)},f=a=>()=>{n(l.filter((s,r)=>r!==a))};return c("div",{children:[e("span",{className:"inter-base-semibold",children:o}),c("div",{className:"flex flex-col mt-base gap-y-base",children:[t.map((a,s)=>e(b,{onDelete:f(s),children:e(x,{field:a,updateKey:p(s),updateValue:v(s)})},s)),e("div",{children:c(d,{variant:"secondary",size:"small",type:"button",className:"w-full",onClick:h,children:[e(y,{size:20}),"Add Metadata"]})})]})]})},x=({field:l,updateKey:n,updateValue:o})=>c("div",{className:"flex items-center w-full gap-x-xsmall",children:[e("div",{className:"maw-w-[200px]",children:e(u,{label:"Key",placeholder:"Some key",defaultValue:l.key,onChange:t=>{n(t.currentTarget.value)}})}),e("div",{className:"flex-grow",children:e(u,{label:"Value",placeholder:"Some value",defaultValue:l.value,onChange:t=>{o(t.currentTarget.value)}})})]}),b=({onDelete:l,children:n})=>c("div",{className:"flex items-end gap-x-xlarge",children:[e("div",{className:"flex-grow",children:n}),e(d,{variant:"ghost",size:"small",className:"text-grey-40 w-10 h-10",type:"button",onClick:l,children:e(g,{size:20})})]});export{C as M};