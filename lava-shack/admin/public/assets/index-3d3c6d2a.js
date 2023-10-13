import{e as v,r as g,a5 as k,a as e,bA as Q,j as m,F as _,M as R,B as f,d as $,a9 as G}from"./index-effbfb95.js";import{r as M,a as J,T as S}from"./index-0d9858ea.js";import{u as L}from"./use-debounce-438a4ce8.js";import{P as K}from"./index-dd9f9076.js";import{I as H}from"./index-d33be3e8.js";const F=v.createContext(null),B=()=>{const a=g.useContext(F);if(a===null)throw new Error("useSalesChannelsModal must be used within a SalesChannelsModalProvider");return a},I=15,U=()=>{const[a]=D(),[s,t]=g.useState(void 0),[l,c]=g.useState(0),p=L(s,500),{sales_channels:o,count:C,isLoading:b}=Q({q:p,limit:I,offset:l}),{source:r,onClose:w,onSave:u}=B(),x=v.useMemo(()=>{const h=r.map(d=>d.id)||[];return(o==null?void 0:o.filter(({id:d})=>!h.includes(d)))||[]},[o,r]),{pop:y,reset:i}=g.useContext(k),n=M.useTable({columns:a,data:x,manualPagination:!0,initialState:{pageIndex:Math.floor(l/I),pageSize:I},autoResetPage:!1,autoResetSelectedRows:!1,getRowId:h=>h.id,pageCount:Math.ceil((C||0)/I)},M.usePagination,M.useRowSelect),A=()=>{const h=[...r,...n.selectedFlatRows.map(d=>d.original)];u(h),i(),w()},z=()=>{const h=[...r,...n.selectedFlatRows.map(d=>d.original)];u(h),y()},T=g.useMemo(()=>n.selectedFlatRows.length===0,[n.selectedFlatRows.length]);return m(_,{children:[e(R.Content,{children:e(q,{isLoading:b,count:C||0,limit:I,offset:l,setOffset:c,setQuery:t,tableState:n})}),e(R.Footer,{children:m("div",{className:"flex justify-end w-full space-x-xsmall",children:[e(f,{variant:"secondary",size:"small",onClick:y,children:"Cancel"}),e(f,{variant:"primary",size:"small",onClick:z,disabled:T,children:"Save and go back"}),e(f,{variant:"primary",size:"small",onClick:A,disabled:T,children:"Save and close"})]})})]})},V=()=>{const{pop:a}=v.useContext(k);return{title:"Add Sales Channels",onBack:a,view:e(U,{})}},D=()=>[g.useMemo(()=>[{width:30,id:"selection",Header:({getToggleAllPageRowsSelectedProps:s})=>e("span",{className:"flex justify-center w-[30px]",children:e(H,{...s()})}),Cell:({row:s})=>e("span",{onClick:t=>t.stopPropagation(),className:"flex justify-center w-[30px]",children:e(H,{...s.getToggleRowSelectedProps()})})},{Header:"Title",accessor:"name"},{Header:"Description",accessor:"description"}],[])],q=({count:a,limit:s,offset:t,setOffset:l,setQuery:c,tableState:p,setSelectedRowIds:o,tableAction:C,isLoading:b})=>{const{getTableProps:r,getTableBodyProps:w,headerGroups:u,rows:x,prepareRow:y,canPreviousPage:i,canNextPage:n,pageCount:A,nextPage:z,previousPage:T,state:{pageIndex:h,...d}}=p;v.useEffect(()=>{o&&o(Object.keys(d.selectedRowIds))},[Object.keys(d.selectedRowIds).length]);const E=()=>{n&&(l(t+s),z())},O=()=>{i&&(l(Math.max(t-s,0)),T())};return e(J,{hasPagination:!0,pagingState:{count:a,offset:t,pageSize:t+x.length,title:"Sales Channels",currentPage:h+1,pageCount:A,nextPage:E,prevPage:O,hasNext:n,hasPrev:i},numberOfRows:s,isLoading:b,children:m(S,{...r(),enableSearch:!0,handleSearch:c,tableActions:C,children:[e(S.Head,{children:u==null?void 0:u.map(P=>e(S.HeadRow,{...P.getHeaderGroupProps(),children:P.headers.map(N=>e(S.HeadCell,{...N.getHeaderProps(),children:N.render("Header")}))}))}),e(S.Body,{...w(),children:x.map(P=>(y(P),e(S.Row,{color:"inherit",...P.getRowProps(),children:P.cells.map(N=>e(S.Cell,{...N.getCellProps(),children:N.render("Cell")}))})))})]})})},W=({numberOfSelectedRows:a,onDeselect:s,onRemove:t})=>{const l=V(),c=!!a,p={"translate-y-[-42px]":!c,"translate-y-[0px]":c},{push:o}=v.useContext(k);return e("div",{className:"flex space-x-xsmall h-[34px] overflow-hidden",children:m("div",{className:$("transition-all duration-200",p),children:[m("div",{className:"divide-x flex items-center h-[34px] mb-2",children:[m("span",{className:"mr-3 inter-small-regular text-grey-50",children:[a," selected"]}),m("div",{className:"flex space-x-xsmall pl-3",children:[e(f,{onClick:s,size:"small",variant:"ghost",className:"border border-grey-20",children:"Deselect"}),e(f,{onClick:t,size:"small",variant:"ghost",className:"border border-grey-20 text-rose-50",children:"Remove"})]})]}),e("div",{className:"flex justify-end h-[34px]",children:m(f,{size:"small",variant:"ghost",className:"border border-grey-20",onClick:()=>o(l),children:[e(K,{size:20})," Add Channels"]})})]})})},j=15,X=()=>{const{source:a,onSave:s}=B(),[t]=D(),[l,c]=g.useState(void 0),[p,o]=g.useState(0),[C,b]=g.useState([]),r=L(l,500),w=v.useMemo(()=>r?a==null?void 0:a.filter(({name:i,description:n})=>i.toLowerCase().includes(r.toLowerCase())||(n==null?void 0:n.toLowerCase().includes(r.toLowerCase()))):a,[a,r]),u=M.useTable({columns:t,data:w,manualPagination:!0,initialState:{pageIndex:Math.floor(p/j),pageSize:j},autoResetPage:!1,autoResetSelectedRows:!1,getRowId:i=>i.id,pageCount:Math.ceil(w.length/j)},M.usePagination,M.useRowSelect),x=()=>{b([]),u.toggleAllRowsSelected(!1)},y=()=>{const i=a.filter(n=>!C.includes(n.id));s(i),x()};return e(R.Content,{children:e(q,{count:a.length,tableAction:e(W,{numberOfSelectedRows:C.length,onRemove:y,onDeselect:x}),setSelectedRowIds:b,limit:15,offset:p,setOffset:o,setQuery:c,tableState:u})})},se=({open:a,source:s=[],onClose:t,onSave:l})=>{const c=v.useContext(k);return e(F.Provider,{value:{source:s,onClose:t,onSave:l},children:e(G,{open:a,handleClose:t,context:c,children:m(R.Body,{children:[e(R.Header,{handleClose:t,children:e("h1",{className:"inter-xlarge-semibold",children:"Current Sales Channels"})}),e(X,{}),e(R.Footer,{children:e("div",{className:"flex items-center justify-end w-full",children:e(f,{variant:"primary",size:"small",type:"button",onClick:t,children:"Close"})})})]})})})};export{se as S};