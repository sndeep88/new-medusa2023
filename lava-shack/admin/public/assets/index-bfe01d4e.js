import{u as H,a as e,af as G,r as _,j as r,F as C,d as O,B as y,i as V,aq as W,ar as P,C as Y,as as $,M as x,at as J,au as K,av as Q,S as U,R as X,b as I}from"./index-effbfb95.js";import{B as M}from"./body-card-d3fddb8c.js";import{T as Z}from"./index-a6859a1b.js";import{F as ee}from"./index-ec3b8ff9.js";import{I as g,T as ae,P as se}from"./index-dd9f9076.js";import{u as S}from"./use-toggle-state-9e07c572.js";import{b as le,C as ne,c as re,u as B}from"./index.esm-5a89640b.js";import{F as A}from"./focus-modal-d105ce27.js";import{A as F}from"./index-bf34ad3b.js";import{u as L}from"./use-notification-9f7c3c92.js";import{g as E}from"./error-messages-d2d0bb30.js";import{n as b}from"./nested-form-c66382a0.js";import"./index-e417090c.js";import{S as te}from"./index-dd953a8b.js";import{F as v}from"./form-validator-a60b1f3b.js";import{B as oe}from"./index-84767cd7.js";import{C as ce}from"./channels-icon-c5648122.js";import{S as k}from"./index-3d3c6d2a.js";import{B as ie}from"./index-67e6cb88.js";import{c as de}from"./countries-bbdb373c.js";import{A as me}from"./index-0d9858ea.js";import{E as ue}from"./edit-icon-8c1c10d1.js";import{T as he}from"./trash-icon-abcb5140.js";import{u as pe}from"./use-imperative-dialog-cb4e5fcf.js";import"./lodash-72dfe3e0.js";import"./chevron-down-6a69fe38.js";import"./index-e25e2e97.js";import"./index-1ec19c89.js";import"./react-select-creatable.esm-e43d0869.js";import"./react-select.esm-1ec1493a.js";import"./unsupportedIterableToArray-27301055.js";import"./toConsumableArray-6f61c395.js";import"./createSuper-ad9f6885.js";import"./_isIndex-6af6139d.js";import"./use-debounce-438a4ce8.js";import"./index-d33be3e8.js";function q(a){const l=H();return e(Z,{setActiveView:s=>{l(s==="inventory"?"/a/inventory":"/a/inventory/locations")},views:["inventory","locations"],activeView:a.activeView})}const fe=()=>e("div",{className:"flex flex-col h-full grow",children:e("div",{className:"flex flex-col w-full grow",children:e(M,{customHeader:e(q,{activeView:"inventory"}),className:"h-fit",children:e("h1",{children:"Inventory"})})})}),z=({form:a})=>{const{register:l,path:s,formState:{errors:n},control:t}=a,{regions:c}=G(),d=le({control:t,name:[s("company"),s("address_1"),s("address_2"),s("postal_code"),s("city"),s("country_code")]}).some(o=>!!o),[m,u]=_.useState(!1);_.useEffect(()=>{u(!!d)},[d]);const f=_.useMemo(()=>c?c.reduce((o,i)=>[...o,...i.countries],[]).map(o=>({label:o.display_name,value:o.iso_2})):[],[c]);return r(C,{children:[e("span",{className:"inter-base-semibold",children:"Address"}),r("div",{className:"grid grid-cols-1 gap-y-large gap-x-large",children:[e("div",{className:"grid grid-cols-2 gap-x-large",children:e(g,{label:"Company",placeholder:"Medusa",errors:n,...l(s("company"),{pattern:v.whiteSpaceRule("Company")})})}),r("div",{className:"grid grid-cols-2 gap-x-large",children:[e(g,{label:"Address 1",placeholder:"Address 1",errors:n,required:m,...l(s("address_1"),{pattern:v.whiteSpaceRule("Address 1"),required:m})}),e(g,{label:"Address 2",placeholder:"Address 2",errors:n,...l(s("address_2"),{pattern:v.whiteSpaceRule("Address 2")})})]}),r("div",{className:"grid grid-cols-2 gap-x-large",children:[e(g,{label:"Postal code",placeholder:"Postal code",errors:n,...l(s("postal_code"),{pattern:v.whiteSpaceRule("Postal code")})}),e(g,{label:"City",placeholder:"City",errors:n,...l(s("city"),{pattern:v.whiteSpaceRule("City")})})]}),e("div",{className:"grid grid-cols-2 gap-x-large",children:e(ne,{control:t,name:s("country_code"),rules:{required:m},render:({field:{value:o,onChange:i}})=>{let p=o;return typeof p=="string"&&(p=f.find(N=>N.value===p)),e(te,{label:"Country",required:m,value:p,options:f,onChange:i,name:s("country_code"),errors:n,isClearable:!m})}})})]})]})},D=({form:a})=>{const{register:l,path:s,formState:{errors:n}}=a;return e("div",{children:e("div",{className:"grid grid-cols-2 gap-x-large mb-small",children:e(g,{label:"Location name",placeholder:"Flagship store, warehouse",required:!0,...l(s("name"),{required:"Name is required",pattern:v.whiteSpaceRule("Location name")}),errors:n})})})},R=({children:a,variant:l,className:s,...n})=>e(oe,{variant:l??"default",className:O("flex items-center justify-center aspect-square w-[40px] h-[40px] border-2 border-white outline outline-1 outline-grey-20",s),...n,children:a}),T=({salesChannels:a,showMax:l=3})=>{const s=a.length>l;return r("div",{className:"flex items-center py-1",children:[e(R,{className:"mr-4",children:e(ce,{})}),a.slice(0,l).map((n,t,c)=>r("span",{className:"ml-1 inter-base-regular text-grey-90 first-of-type:ml-0",children:[n.name,t<c.length-1&&", "]})),s&&e(ae,{content:e(C,{children:a.slice(l).map(n=>e("div",{className:"inter-small-regular",children:n.name}))}),side:"top",children:r("span",{className:"ml-1 text-grey-50",children:["+ ",a.length-l," more"]})})]})},ye=({location:a,form:l})=>{const{state:s,close:n,open:t}=S(),{control:c,path:h}=l,{fields:d,replace:m}=re({control:c,name:h("channels"),keyName:"fieldId"}),u=()=>{n()},f=o=>m(o);return r(C,{children:[!(a!=null&&a.sales_channels)&&!d.length?e(y,{variant:"secondary",className:"w-full",size:"small",onClick:t,type:"button",children:"Add sales channels"}):r("div",{className:"flex items-center justify-between w-full",children:[e(T,{salesChannels:(a==null?void 0:a.sales_channels)||d,showMax:1}),e(y,{variant:"secondary",size:"small",type:"button",onClick:t,children:"Edit channels"})]}),e(k,{open:s,source:d,onClose:u,onSave:f})]})},ge=({onClose:a})=>{const l=B({defaultValues:{general:{name:""},address:void 0,salesChannels:{channels:[]}},reValidateMode:"onBlur",mode:"onBlur"}),{handleSubmit:s,formState:n}=l,t=L(),{isFeatureEnabled:c}=V(),{mutateAsync:h}=W(),{mutateAsync:d}=P(),m=(i,p)=>d({sales_channel_id:i,location_id:p}),u=()=>s(async i=>{const{locationPayload:p,salesChannelsPayload:N}=ve(i);try{const{stock_location:w}=await h(p);Promise.all(N.map(j=>m(j.id,w.id))).then(()=>{t("Success","Location added successfully","success")}).catch(()=>{t("Error","Location was created successfully, but there was an error associating sales channels","error")}).finally(()=>{a()})}catch(w){t("Error",E(w),"error")}}),{isDirty:f,isValid:o}=n;return e("form",{className:"w-full",children:r(A,{children:[e(A.Header,{children:r("div",{className:"flex justify-between w-full px-8 medium:w-8/12",children:[e(y,{size:"small",variant:"ghost",type:"button",onClick:a,children:e(Y,{size:20})}),e("div",{className:"flex gap-x-small",children:e(y,{size:"small",variant:"secondary",type:"button",disabled:!f||!o,onClick:u(),children:"Add location"})})]})}),e(A.Main,{className:"flex justify-center w-full no-scrollbar",children:r("div",{className:"medium:w-7/12 large:w-6/12 small:w-4/5 max-w-[700px] my-16",children:[e("h1",{className:"px-1 font-semibold mb-base text-grey-90 text-xlarge",children:"Add new location"}),r(F,{defaultValue:"general",type:"single",children:[r(F.Item,{value:"general",title:"General Information",required:!0,children:[e("p",{className:"inter-base-regular text-grey-50",children:"Specify the details about this location"}),r("div",{className:"flex flex-col mt-xlarge gap-y-xlarge",children:[e(D,{form:b(l,"general")}),e(z,{form:b(l,"address")})]})]}),c("sales_channels")&&r(F.Item,{value:"sales_channels",title:"Sales Channels",children:[e("p",{className:"inter-base-regular text-grey-50",children:"Specify which Sales Channels this location's items can be purchased through."}),e("div",{className:"flex mt-xlarge",children:e(ye,{location:null,form:b(l,"salesChannels")})})]})]})]})})]})})},ve=a=>{const{general:l,address:s}=a;let n;return s.address_1&&(n=s,n.country_code=s.country_code.value),{locationPayload:{name:l.name,address:n},salesChannelsPayload:a.salesChannels.channels}},xe=({onClose:a,location:l})=>{const s=B({defaultValues:{general:{name:l.name},address:l.address},reValidateMode:"onBlur",mode:"onBlur"}),n=L(),{mutate:t}=$(l.id),{handleSubmit:c,formState:h}=s,{isDirty:d,isValid:m}=h,u=c(async f=>{const o=be(f);t(o,{onSuccess:()=>{a(),n("Success","Location edited successfully","success")},onError:i=>{n("Error",E(i),"error")}})});return r(x,{handleClose:a,children:[r(x.Body,{className:"top-20",children:[e(x.Header,{handleClose:a,children:e("h1",{className:"text-xl font-semibold",children:"Edit Location Details"})}),e(x.Content,{children:e("form",{className:"w-full",children:r("div",{className:"flex flex-col mt-xlarge gap-y-xlarge",children:[e(D,{form:b(s,"general")}),e(z,{form:b(s,"address")})]})})})]}),e(x.Footer,{children:r("div",{className:"flex justify-end w-full space-x-2",children:[e(y,{size:"small",variant:"secondary",type:"button",onClick:a,children:"Cancel"}),e(y,{size:"small",variant:"primary",type:"button",disabled:!d||!m,onClick:u,children:"Save and close"})]})})]})},be=a=>{const{general:l,address:s}=a;return{name:l.name,address:{company:s.company,address_1:s.address_1,address_2:s.address_2,postal_code:s.postal_code,city:s.city,country_code:s.country_code.value||s.country_code}}},Ce=({location:a})=>{var d;const{state:l,close:s,open:n}=S(),{mutateAsync:t}=P(),{mutateAsync:c}=J(),h=async m=>{const u=a.sales_channels,f=(u==null?void 0:u.filter(i=>!m.some(p=>i.id===p.id)))??[],o=m.filter(i=>u&&!u.some(p=>p.id===i.id));Promise.all([...f.map(i=>c({sales_channel_id:i.id,location_id:a.id})),...o.map(i=>t({sales_channel_id:i.id,location_id:a.id}))])};return r(C,{children:[e(y,{variant:"secondary",size:"small",type:"button",onClick:n,children:(d=a.sales_channels)!=null&&d.length?"Edit channels":"Add channels"}),e(k,{open:l,source:a.sales_channels,onClose:s,onSave:h})]})},Se=({location:a})=>{var l;return e("div",{className:"py-base",children:r("div",{className:"flex items-center justify-between w-full",children:[(l=a.sales_channels)!=null&&l.length?e(T,{salesChannels:a.sales_channels}):e("span",{className:"inter-base-regular text-grey-40",children:"Not connected to any sales channels yet"}),e(Ce,{location:a})]})})},Ne=({location:a})=>{const{mutate:l}=K(a.id),s=pe(),n=L(),{isFeatureEnabled:t}=V(),{state:c,close:h,open:d}=S(),u=[{label:"Edit details",onClick:d,variant:"normal",icon:e(ue,{size:"20px"})},{label:"Delete",onClick:async()=>{await s({heading:"Delete Location",text:"Are you sure you want to delete this location",extraConfirmation:!0,entityName:a.name})&&l(void 0,{onSuccess:()=>{n("Success","Location deleted successfully","success")},onError:o=>{n("Error",E(o),"error")}})},variant:"danger",icon:e(he,{size:"20px"})}];return r("div",{className:"border my-base rounded-rounded bg-grey-0 border-grey-20",children:[r("div",{className:"flex items-center px-6 py-base",children:[e(R,{children:e(ie,{})}),r("div",{className:"flex flex-col ml-base",children:[e("span",{className:"font-semibold text-grey-90",children:a.name}),a.address&&r("div",{children:[a.address.city&&r("span",{children:[a.address.city,", "]}),e("span",{children:de(a.address.country_code)})]})]}),e("div",{className:"ml-auto",children:e(me,{actions:u,forceDropdown:!0})})]}),t("sales_channels")&&r("div",{className:"px-6 border-t border-solid py-base border-grey-20",children:[e("h2",{className:"text-gray-500 inter-small-semibold",children:"Connected sales channels"}),e(Se,{location:a})]}),c&&e(xe,{onClose:h,location:a})]})},we=()=>{const{state:a,close:l,open:s}=S(),n=r(y,{variant:"secondary",size:"small",onClick:s,children:[e(se,{size:20}),"Add location"]}),{stock_locations:t,isLoading:c}=Q({expand:"address,sales_channels"});return r(C,{children:[e("div",{className:"flex flex-col h-full grow",children:r("div",{className:"flex flex-col w-full grow",children:[e(M,{customHeader:e(q,{activeView:"locations"}),className:"min-h-[85px] h-[85px]",customActionable:n}),c?e("div",{className:"flex items-center justify-center w-full h-full",children:e(U,{variant:"secondary"})}):e("div",{children:t==null?void 0:t.map(h=>e(Ne,{location:h}))})]})}),e(ee,{isVisible:a,isFullScreen:!0,children:e(ge,{onClose:l})})]})},oa=()=>r(X,{children:[e(I,{index:!0,element:e(fe,{})}),e(I,{path:"/locations/*",element:e(we,{})})]});export{oa as default};