import{r as l}from"./analytics-1ab31609.js";import"./index-effbfb95.js";import"./index-ec3b8ff9.js";import"./index.esm-5a89640b.js";import"./use-debounce-438a4ce8.js";import"./axios-4a70c6fc.js";import"./a-0eba6a7f.js";import"./react-hotkeys-hook.esm-745ca041.js";import"./use-notification-9f7c3c92.js";import"./index-1ec19c89.js";import"./error-messages-d2d0bb30.js";import"./nested-form-c66382a0.js";import"./lodash-72dfe3e0.js";import"./index-dd9f9076.js";import"./focus-modal-d105ce27.js";import"./index-523daaeb.js";import"./index-903c1727.js";function p(t){var r=t;return!!(r.ctrlKey||r.shiftKey||r.metaKey||r.button&&r.button==1)}function d(t,r){return!!(t.target==="_blank"&&r)}function S(t,r,n,e){var f=this,u=[];return t?(t instanceof Element?u=[t]:"toArray"in t?u=t.toArray():u=t,u.forEach(function(i){i.addEventListener("click",function(o){var c,a,s=r instanceof Function?r(i):r,h=n instanceof Function?n(i):n,m=i.getAttribute("href")||i.getAttributeNS("http://www.w3.org/1999/xlink","href")||i.getAttribute("xlink:href")||((c=i.getElementsByTagName("a")[0])===null||c===void 0?void 0:c.getAttribute("href")),v=l(f.track(s,h,e??{}),(a=f.settings.timeout)!==null&&a!==void 0?a:500);!d(i,m)&&!p(o)&&m&&(o.preventDefault?o.preventDefault():o.returnValue=!1,v.catch(console.error).then(function(){window.location.href=m}).catch(console.error))},!1)}),this):this}function V(t,r,n,e){var f=this;if(!t)return this;t instanceof HTMLFormElement&&(t=[t]);var u=t;return u.forEach(function(i){if(!(i instanceof Element))throw new TypeError("Must pass HTMLElement to trackForm/trackSubmit.");var o=function(a){var s;a.preventDefault?a.preventDefault():a.returnValue=!1;var h=r instanceof Function?r(i):r,m=n instanceof Function?n(i):n,v=l(f.track(h,m,e??{}),(s=f.settings.timeout)!==null&&s!==void 0?s:500);v.catch(console.error).then(function(){i.submit()}).catch(console.error)},c=window.jQuery||window.Zepto;c?c(i).submit(o):i.addEventListener("submit",o,!1)}),this}export{V as form,S as link};