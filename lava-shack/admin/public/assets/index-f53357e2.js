import{a as e,e as f,l as T,b8 as j,a1 as q,M as d,j as n,B as x}from"./index-effbfb95.js";import{h as B}from"./moment-fbc5633a.js";import{a as L}from"./display-total-6e4997b2.js";import{S as r}from"./index-04f3341e.js";import{u as F}from"./use-notification-9f7c3c92.js";import"./lodash-72dfe3e0.js";import"./index-dd9f9076.js";import{u as P}from"./use-debounce-438a4ce8.js";import{B as k}from"./index-84767cd7.js";import{S as N}from"./index-dd953a8b.js";const z=({status:a})=>{switch(a){case"captured":return e(r,{title:"Paid",variant:"success"});case"awaiting":return e(r,{title:"Awaiting payment",variant:"danger"});case"canceled":return e(r,{title:"Canceled",variant:"danger"});case"requires_action":return e(r,{title:"Requires Action",variant:"danger"});default:return null}},I=({status:a})=>{switch(a){case"shipped":return e(r,{title:"Shipped",variant:"success"});case"fulfilled":return e(r,{title:"Fulfilled",variant:"warning"});case"canceled":return e(r,{title:"Canceled",variant:"danger"});case"partially_fulfilled":return e(r,{title:"Partially fulfilled",variant:"warning"});case"requires_action":return e(r,{title:"Requires Action",variant:"danger"});case"not_fulfilled":return e(r,{title:"Awaiting fulfillment",variant:"danger"});default:return null}},W=({order:a,onDismiss:l})=>{var _,v,y,b;const[C,w]=f.useState(""),S=P(C,400),{customers:u}=T({q:S,has_account:!0,limit:30,offset:0}),m=F(),[c,O]=f.useState(null),{mutate:$,isLoading:h}=j(a.id),{customer:i,isLoading:p}=q((c==null?void 0:c.value)||""),M=async()=>{if(!(p||!i)){if(i.id===a.customer_id){m("Info","Customer is already the owner of the order","info"),l();return}$({customer_id:i==null?void 0:i.id,email:i.email},{onSuccess:()=>{m("Success","Successfully transferred order to different customer","success"),l()},onError:()=>{m("Error","Could not transfer order to different customer","error")}})}},g=s=>{if(!s)return;const o=t=>t.first_name&&t.last_name?`${t.first_name} ${t.last_name} - ${t.email}`:t.first_name?`${t.first_name} - ${t.email}`:t.last_name?`${t.last_name} - ${t.email}`:`${t.email}`;return{value:s.id,label:o(s)}},A=f.useMemo(()=>{const s=o=>!!o;return(u==null?void 0:u.map(o=>g(o)).filter(s))||[]},[u]);return e(d,{handleClose:l,children:n(d.Body,{children:[e(d.Header,{handleClose:l,children:e("h2",{className:"inter-xlarge-semibold",children:"Transfer order"})}),e(d.Content,{children:n("div",{className:"flex flex-col space-y-xlarge",children:[n("div",{className:"space-y-xsmall",children:[e("h3",{className:"inter-base-semibold",children:"Order"}),n("div",{className:"flex items-center justify-between border-grey-20 border rounded-rounded py-xsmall px-2.5",children:[e(k,{variant:"default",children:e("span",{className:"text-grey-60",children:`#${a.display_id}`})}),e("span",{className:"text-grey-50",children:B(new Date(a.created_at)).format("MMM D, H:mm A")}),e(z,{status:a.payment_status}),e(I,{status:a.fulfillment_status}),e(L,{currency:a.currency_code,totalAmount:a.total})]})]}),n("div",{className:"w-full grid grid-cols-2",children:[n("div",{className:"flex flex-col",children:[e("span",{className:"inter-base-semibold",children:"Current Owner"}),e("span",{className:"inter-base-regular",children:"The customer currently related to this order"})]}),e("div",{className:"flex items-center",children:e(N,{isDisabled:!0,value:g({id:a.customer_id,email:a.email,first_name:a.customer.first_name||((_=a.billing_address)==null?void 0:_.first_name)||((v=a.shipping_address)==null?void 0:v.first_name)||void 0,last_name:a.customer.last_name||((y=a.billing_address)==null?void 0:y.last_name)||((b=a.shipping_address)==null?void 0:b.last_name)||void 0})})})]}),n("div",{className:"w-full grid grid-cols-2",children:[n("div",{className:"flex flex-col",children:[e("span",{className:"inter-base-semibold",children:"New Owner"}),e("span",{className:"inter-base-regular",children:"The customer to transfer this order to"})]}),e("div",{className:"flex items-center",children:e(N,{value:c,onChange:s=>{O(s)},isMulti:!1,options:A,isSearchable:!0,onInputChange:s=>{w(s)},truncateOption:!0})})]})]})}),e(d.Footer,{children:e("div",{className:"flex w-full justify-end",children:n("div",{className:"flex gap-x-xsmall",children:[e(x,{onClick:l,size:"small",className:"border border-grey-20",variant:"ghost",children:"Cancel"}),e(x,{type:"submit",size:"small",variant:"primary",loading:h,disabled:h||!c||p||!i,onClick:M,children:"Confirm"})]})})})]})})};export{I as F,z as P,W as T};
