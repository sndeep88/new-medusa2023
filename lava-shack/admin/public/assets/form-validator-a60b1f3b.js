import{n}from"./index-84767cd7.js";const o={whiteSpaceRule:e=>({value:/^[^\s]+(?:$|.*[^\s]+$)/,message:`${e} cannot have leading or trailing spaces, or be an empty string.`}),nonNegativeNumberRule:e=>({value:0,message:`${e} cannot be negative.`}),minOneCharRule:e=>({value:1,message:`${e} must be at least 1 character.`}),min:(e,a)=>({value:a,message:`${e} must be greater than or equal to ${a}.`}),max:(e,a)=>({value:a,message:`${e} must be less than or equal to ${a}.`}),required:e=>({value:!0,message:`${e} is required.`}),minLength:(e,a)=>({value:a,message:`${e} must be at least ${a} characters.`}),maxInteger:(e,a)=>({value:t,message:`${e} must be less than or equal to ${s(a)}.`}),validateMaxInteger:(e,a,r)=>a<=t||`${e} must be less than or equal to ${s(r)}.`},t=2147483647,s=e=>(e?n(e,t):t).toLocaleString();export{o as F};
