import{s as k,j as O}from"./analytics-1ab31609.js";import"./index-effbfb95.js";import"./index-ec3b8ff9.js";import"./index.esm-5a89640b.js";import"./use-debounce-438a4ce8.js";import"./axios-4a70c6fc.js";import"./a-0eba6a7f.js";import"./react-hotkeys-hook.esm-745ca041.js";import"./use-notification-9f7c3c92.js";import"./index-1ec19c89.js";import"./error-messages-d2d0bb30.js";import"./nested-form-c66382a0.js";import"./lodash-72dfe3e0.js";import"./index-dd9f9076.js";import"./focus-modal-d105ce27.js";import"./index-523daaeb.js";import"./index-903c1727.js";function v(i,e){return Object.keys(e).reduce(function(t,a){if(a.startsWith(i)){var r=a.substr(i.length);t[r]=e[a]}return t},{})}function K(i,e){var t=document.createElement("a");t.href=e;var a=t.search.slice(1),r=a.split("&").reduce(function(_,P){var d=P.split("="),b=d[0],S=d[1];return _[b]=k(S),_},{}),s=[],j=r.ajs_uid,f=r.ajs_event,c=r.ajs_aid,o=O(i.options.useQueryString)?i.options.useQueryString:{},p=o.aid,l=p===void 0?/.+/:p,n=o.uid,A=n===void 0?/.+/:n;if(c){var u=Array.isArray(r.ajs_aid)?r.ajs_aid[0]:r.ajs_aid;l.test(u)&&i.setAnonymousId(u)}if(j){var m=Array.isArray(r.ajs_uid)?r.ajs_uid[0]:r.ajs_uid;if(A.test(m)){var h=v("ajs_trait_",r);s.push(i.identify(m,h))}}if(f){var y=Array.isArray(r.ajs_event)?r.ajs_event[0]:r.ajs_event,g=v("ajs_prop_",r);s.push(i.track(y,g))}return Promise.all(s)}export{K as queryString};
