"use strict";exports.id=939,exports.ids=[939],exports.modules={28559:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(62688).A)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},37590:(a,b,c)=>{c.d(b,{Ay:()=>I});var d,e=c(43210);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d,e=this||{},m=a.call?a(e.p):a;return((a,b,c,d,e)=>{var f,m,n,o;let p=l(a),q=k[p]||(k[p]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(p));if(!k[q]){let b=p!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[q]=j(e?{["@keyframes "+q]:b}:b,c?"":"."+q)}let r=c&&k.g?k.g:null;return c&&(k.g=k[q]),f=k[q],m=b,n=d,(o=r)?m.data=m.data.replace(o,f):-1===m.data.indexOf(f)&&(m.data=n?f+m.data:m.data+f),q})(m.unshift?m.raw?(b=[].slice.call(arguments,1),c=e.p,m.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):m.reduce((a,b)=>Object.assign(a,b&&b.call?b(e.p):b),{}):m,(d=e.target,"object"==typeof window?((d?d.querySelector("#_goober"):window._goober)||Object.assign((d||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:d||f),e.g,e.o,e.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(()=>{let a=0;return()=>(++a).toString()})(),u=(()=>{let a;return()=>a})(),v=(a,b)=>{switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,20)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:c}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===c.id),toast:c});case 3:let{toastId:d}=b;return{...a,toasts:a.toasts.map(a=>a.id===d||void 0===d?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let e=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+e}))}}},w=[],x={toasts:[],pausedAt:void 0},y=a=>{x=v(x,a),w.forEach(a=>{a(x)})},z=a=>(b,c)=>{let d=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return y({type:2,toast:d}),d.id},A=(a,b)=>z("blank")(a,b);A.error=z("error"),A.success=z("success"),A.loading=z("loading"),A.custom=z("custom"),A.dismiss=a=>{y({type:3,toastId:a})},A.remove=a=>y({type:4,toastId:a}),A.promise=(a,b,c)=>{let d=A.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?A.success(e,{id:d,...c,...null==c?void 0:c.success}):A.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?A.error(e,{id:d,...c,...null==c?void 0:c.error}):A.dismiss(d)}),a};var B=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,C=q`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,D=q`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`;r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${C} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;var E=q`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;r("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${E} 1s linear infinite;
`;var F=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=q`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`;r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,r("div")`
  position: absolute;
`,r("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;var H=q`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`;r("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${H} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,r("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,r("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,d=e.createElement,j.p=void 0,n=d,o=void 0,p=void 0,m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var I=A},80013:(a,b,c)=>{c.d(b,{J:()=>g});var d=c(60687);c(43210);var e=c(78148),f=c(4780);function g({className:a,...b}){return(0,d.jsx)(e.b,{"data-slot":"label",className:(0,f.cn)("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",a),...b})}},88360:(a,b,c)=>{c.d(b,{N:()=>j});var d=c(60687),e=c(27605),f=c(77618),g=c(89667),h=c(80013),i=c(43210);function j({initialData:a,onSubmit:b,onSuccess:c,onError:j,onCancel:k,loading:l=!1}){let m=(0,f.c3)("Customers"),{register:n,handleSubmit:o,formState:{errors:p}}=(0,e.mN)({defaultValues:a}),[q,r]=(0,i.useState)(!1),s=async a=>{r(!0);try{await b(a),c&&c()}catch(a){console.error("Form submission error:",a),j&&j(a instanceof Error?a.message:String(a))}finally{r(!1)}},t=!!a;return(0,d.jsxs)("form",{onSubmit:o(s),className:"space-y-4",children:[(0,d.jsxs)("div",{children:[(0,d.jsxs)(h.J,{htmlFor:"fullName",className:"text-black dark:text-white",children:[m("fullName")," *"]}),(0,d.jsx)(g.p,{id:"fullName",...n("fullName",{required:m("validation.required")})}),p.fullName&&(0,d.jsx)("p",{className:"text-sm text-red-500",children:p.fullName.message})]}),(0,d.jsxs)("div",{children:[(0,d.jsxs)(h.J,{htmlFor:"mobileNumber",className:"text-black dark:text-white",children:[m("mobileNumber")," *"]}),(0,d.jsx)(g.p,{id:"mobileNumber",...n("mobileNumber",{required:m("validation.required"),pattern:{value:/^[0-9]+$/,message:m("errors.invalidMobile")||"Invalid mobile number"}})}),p.mobileNumber&&(0,d.jsx)("p",{className:"text-sm text-red-500",children:p.mobileNumber.message})]}),(0,d.jsxs)("div",{children:[(0,d.jsxs)(h.J,{htmlFor:"userName",className:"text-black dark:text-white",children:[m("userName",{defaultValue:"Username"})," *"]}),(0,d.jsx)(g.p,{id:"userName",...n("userName",{required:m("validation.required")})}),p.userName&&(0,d.jsx)("p",{className:"text-sm text-red-500",children:p.userName.message})]}),(0,d.jsxs)("div",{children:[(0,d.jsxs)(h.J,{htmlFor:"password",className:"text-black dark:text-white",children:[m("password",{defaultValue:"Password"})," *"]}),(0,d.jsx)(g.p,{id:"password",type:"password",...n("password",{required:m("validation.required"),minLength:{value:8,message:m("errors.passwordMinLength")},validate:{hasLowercase:a=>/[a-z]/.test(a)||m("errors.passwordLowercase"),hasUppercase:a=>/[A-Z]/.test(a)||m("errors.passwordUppercase"),hasSpecial:a=>/[!@#$%^&*]/.test(a)||m("errors.passwordSpecial")}})}),p.password&&(0,d.jsx)("p",{className:"text-sm text-red-500",children:p.password.message})]}),(0,d.jsxs)("div",{children:[(0,d.jsxs)(h.J,{htmlFor:"masterMobileNumber",className:"text-black dark:text-white",children:[m("masterMobileNumber")," (",m("optional",{defaultValue:"Optional"}),")"]}),(0,d.jsx)(g.p,{id:"masterMobileNumber",...n("masterMobileNumber")})]}),(0,d.jsxs)("div",{className:"flex gap-2 mt-6 justify-end",children:[(0,d.jsx)("button",{type:"submit",className:"h-10 px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition flex items-center gap-2",disabled:q||l,title:t?m("update"):m("create"),children:q||l?m("submitting",{defaultValue:"Submitting..."}):t?m("update",{defaultValue:"Update"}):m("create",{defaultValue:"Create"})}),(0,d.jsx)("button",{type:"button",onClick:()=>k&&k(),className:"h-10 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200 font-semibold transition flex items-center gap-2",disabled:q||l,title:m("cancel"),children:m("cancel",{defaultValue:"Cancel"})})]})]})}}};