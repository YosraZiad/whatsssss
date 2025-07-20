(()=>{var a={};a.id=315,a.ids=[315],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3531:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>l});var d=c(60687),e=c(77618),f=c(86186),g=c(16189),h=c(28559),i=c(85814),j=c.n(i),k=c(43210);function l({params:a}){let b=(0,e.c3)("Customers"),c=(0,f.Ym)(),i=(0,g.useRouter)(),[l,m]=(0,k.useState)(null),[n,o]=(0,k.useState)(!0);return n?(0,d.jsx)("div",{children:"Loading..."}):l?(0,d.jsx)("div",{className:"flex justify-center items-center min-h-[80vh] bg-[#f9fafb] dark:bg-gray-950 px-2",children:(0,d.jsxs)("div",{className:"w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800",children:[(0,d.jsxs)("div",{className:"flex items-center mb-6 gap-2",children:[(0,d.jsx)(j(),{href:`/${c}/customers`,className:"text-[#2563eb] hover:text-[#1d4ed8] transition",children:(0,d.jsx)(h.A,{className:"h-5 w-5"})}),(0,d.jsx)("h1",{className:"text-2xl font-bold text-[#2563eb] dark:text-[#60a5fa]",children:b("customerDetails")})]}),(0,d.jsxs)("div",{className:"flex justify-between items-start mb-6",children:[(0,d.jsx)("h1",{className:"text-2xl font-bold",children:"Customer Details"}),(0,d.jsx)("button",{onClick:()=>i.push(`/${c}/customers/${a.id}/edit`),className:"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",children:"Edit"})]}),(0,d.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h2",{className:"text-lg font-semibold mb-2",children:"Personal Information"}),(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"text-sm text-gray-500",children:"Full Name"}),(0,d.jsx)("p",{children:l.fullName})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"text-sm text-gray-500",children:"Company"}),(0,d.jsx)("p",{children:l.companyName||"-"})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h2",{className:"text-lg font-semibold mb-2",children:"Contact Information"}),(0,d.jsxs)("div",{className:"space-y-4",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"text-sm text-gray-500",children:"Mobile Number"}),(0,d.jsx)("p",{children:l.mobileNumber})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("p",{className:"text-sm text-gray-500",children:"Master Mobile"}),(0,d.jsx)("p",{children:l.masterMobileNumber||"-"})]})]})]})]})]})}):(0,d.jsx)("div",{children:"Customer not found"})}c(86401),c(37590)},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},12412:a=>{"use strict";a.exports=require("assert")},13542:(a,b,c)=>{Promise.resolve().then(c.bind(c,3531))},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21820:a=>{"use strict";a.exports=require("os")},26713:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/is-bot")},27910:a=>{"use strict";a.exports=require("stream")},28354:a=>{"use strict";a.exports=require("util")},28559:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(62688).A)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},29021:a=>{"use strict";a.exports=require("fs")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:a=>{"use strict";a.exports=require("path")},37590:(a,b,c)=>{"use strict";c.d(b,{Ay:()=>I});var d,e=c(43210);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d,e=this||{},m=a.call?a(e.p):a;return((a,b,c,d,e)=>{var f,m,n,o;let p=l(a),q=k[p]||(k[p]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(p));if(!k[q]){let b=p!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[q]=j(e?{["@keyframes "+q]:b}:b,c?"":"."+q)}let r=c&&k.g?k.g:null;return c&&(k.g=k[q]),f=k[q],m=b,n=d,(o=r)?m.data=m.data.replace(o,f):-1===m.data.indexOf(f)&&(m.data=n?f+m.data:m.data+f),q})(m.unshift?m.raw?(b=[].slice.call(arguments,1),c=e.p,m.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):m.reduce((a,b)=>Object.assign(a,b&&b.call?b(e.p):b),{}):m,(d=e.target,"object"==typeof window?((d?d.querySelector("#_goober"):window._goober)||Object.assign((d||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:d||f),e.g,e.o,e.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(()=>{let a=0;return()=>(++a).toString()})(),u=(()=>{let a;return()=>a})(),v=(a,b)=>{switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,20)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:c}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===c.id),toast:c});case 3:let{toastId:d}=b;return{...a,toasts:a.toasts.map(a=>a.id===d||void 0===d?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let e=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+e}))}}},w=[],x={toasts:[],pausedAt:void 0},y=a=>{x=v(x,a),w.forEach(a=>{a(x)})},z=a=>(b,c)=>{let d=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return y({type:2,toast:d}),d.id},A=(a,b)=>z("blank")(a,b);A.error=z("error"),A.success=z("success"),A.loading=z("loading"),A.custom=z("custom"),A.dismiss=a=>{y({type:3,toastId:a})},A.remove=a=>y({type:4,toastId:a}),A.promise=(a,b,c)=>{let d=A.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?A.success(e,{id:d,...c,...null==c?void 0:c.success}):A.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?A.error(e,{id:d,...c,...null==c?void 0:c.error}):A.dismiss(d)}),a};var B=q`
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
`;var I=A},41025:a=>{"use strict";a.exports=require("next/dist/server/app-render/dynamic-access-async-storage.external.js")},55511:a=>{"use strict";a.exports=require("crypto")},55591:a=>{"use strict";a.exports=require("https")},59009:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>d});let d=(0,c(61369).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/runner/work/whatsssss/whatsssss/src/app/[locale]/customers/[id]/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/runner/work/whatsssss/whatsssss/src/app/[locale]/customers/[id]/page.tsx","default")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},73374:(a,b,c)=>{Promise.resolve().then(c.bind(c,59009))},74075:a=>{"use strict";a.exports=require("zlib")},79551:a=>{"use strict";a.exports=require("url")},81630:a=>{"use strict";a.exports=require("http")},83997:a=>{"use strict";a.exports=require("tty")},86401:(a,b,c)=>{"use strict";c.d(b,{FH:()=>h,uE:()=>f,xU:()=>i});var d=c(51060),e=c(63523);let f=(()=>{let a=d.A.create({baseURL:"/api",timeout:1e4,headers:{"Content-Type":"application/json"}});return a.interceptors.request.use(a=>{let b=e.u.getToken();return console.log("\uD83D\uDD0D Token retrieved:",b?"Found":"Not found",b?.substring(0,20)+"..."),b?(a.headers.Authorization=`Bearer ${b}`,console.log("✅ Authorization header set")):console.log("❌ No token found, Authorization header not set"),console.log("API Request:",{method:a.method?.toUpperCase(),url:a.url,headers:a.headers,data:a.data}),a},a=>(console.error("Request interceptor error:",a),Promise.reject(a))),a.interceptors.response.use(a=>(console.log("API Response:",{status:a.status,statusText:a.statusText,data:a.data}),a),a=>(console.error("Response interceptor error:",a),a.response?.status===401&&(console.log("Unauthorized access, logging out..."),e.u.logout()),Promise.reject(a))),a})(),g=d.A.create({baseURL:"https://neosending.com/api",timeout:15e3,headers:{"Content-Type":"application/json",Accept:"text/plain","User-Agent":"NeoSend-Client/1.0"}});g.interceptors.request.use(a=>{let b=e.u.getToken();return b&&(a.headers.Authorization=`Bearer ${b}`),console.log("NeoSend API Request:",{method:a.method?.toUpperCase(),url:a.url,headers:a.headers}),a},a=>(console.error("NeoSend request error:",a),Promise.reject(a))),g.interceptors.response.use(a=>(console.log("NeoSend API Response:",{status:a.status,statusText:a.statusText,data:a.data}),a),a=>(console.error("NeoSend response error:",a),Promise.reject(a)));let h={get:(a,b)=>f.get(a,b),post:(a,b,c)=>f.post(a,b,c),put:(a,b,c)=>f.put(a,b,c),delete:(a,b)=>f.delete(a,b),patch:(a,b,c)=>f.patch(a,b,c)},i={get:(a,b)=>g.get(a,b),post:(a,b,c)=>g.post(a,b,c),put:(a,b,c)=>g.put(a,b,c),delete:(a,b)=>g.delete(a,b)}},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},91781:(a,b,c)=>{"use strict";c.r(b),c.d(b,{GlobalError:()=>C.a,__next_app__:()=>I,handler:()=>K,pages:()=>H,routeModule:()=>J,tree:()=>G});var d=c(65239),e=c(48088),f=c(47220),g=c(81289),h=c(26191),i=c(14823),j=c(71998),k=c(92603),l=c(54649),m=c(32781),n=c(82602),o=c(61268),p=c(4853),q=c(261),r=c(5052),s=c(9977),t=c(26713),u=c(43365),v=c(71454),w=c(67778),x=c(46143),y=c(39105),z=c(38171),A=c(86439),B=c(16133),C=c.n(B),D=c(30893),E=c(52836),F={};for(let a in D)0>["default","tree","pages","GlobalError","__next_app__","routeModule","handler"].indexOf(a)&&(F[a]=()=>D[a]);c.d(b,F);let G={children:["",{children:["[locale]",{children:["customers",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(c.bind(c,59009)),"/home/runner/work/whatsssss/whatsssss/src/app/[locale]/customers/[id]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(c.bind(c,24206)),"/home/runner/work/whatsssss/whatsssss/src/app/[locale]/layout.tsx"],metadata:{icon:[async a=>(await Promise.resolve().then(c.bind(c,70440))).default(a)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(c.bind(c,94431)),"/home/runner/work/whatsssss/whatsssss/src/app/layout.tsx"],"global-error":[()=>Promise.resolve().then(c.t.bind(c,16133,23)),"next/dist/client/components/builtin/global-error.js"],"not-found":[()=>Promise.resolve().then(c.t.bind(c,80849,23)),"next/dist/client/components/builtin/not-found.js"],forbidden:[()=>Promise.resolve().then(c.t.bind(c,29868,23)),"next/dist/client/components/builtin/forbidden.js"],unauthorized:[()=>Promise.resolve().then(c.t.bind(c,79615,23)),"next/dist/client/components/builtin/unauthorized.js"],metadata:{icon:[async a=>(await Promise.resolve().then(c.bind(c,70440))).default(a)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,H=["/home/runner/work/whatsssss/whatsssss/src/app/[locale]/customers/[id]/page.tsx"],I={require:c,loadChunk:()=>Promise.resolve()},J=new d.AppPageRouteModule({definition:{kind:e.RouteKind.APP_PAGE,page:"/[locale]/customers/[id]/page",pathname:"/[locale]/customers/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:G},distDir:".next",projectDir:""});async function K(a,b,c){var d;let B="/[locale]/customers/[id]/page";"/index"===B&&(B="/");let F="false",L=(0,h.getRequestMeta)(a,"postponed"),M=(0,h.getRequestMeta)(a,"minimalMode"),N=await J.prepare(a,b,{srcPage:B,multiZoneDraftMode:F});if(!N)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:O,query:P,params:Q,parsedUrl:R,pageIsDynamic:S,buildManifest:U,nextFontManifest:V,reactLoadableManifest:W,serverActionsManifest:X,clientReferenceManifest:Y,subresourceIntegrityManifest:Z,prerenderManifest:$,isDraftMode:_,resolvedPathname:aa,revalidateOnlyGenerated:ab,routerServerContext:ac,nextConfig:ad}=N,ae=R.pathname||"/",af=(0,q.normalizeAppPath)(B),{isOnDemandRevalidate:ag}=N,ah=$.dynamicRoutes[af],ai=$.routes[aa],aj=!!(ah||ai||$.routes[af]),ak=a.headers["user-agent"]||"",al=(0,t.getBotType)(ak),am=(0,o.isHtmlBotRequest)(a),an=(0,h.getRequestMeta)(a,"isPrefetchRSCRequest")??!!a.headers[s.NEXT_ROUTER_PREFETCH_HEADER],ao=(0,h.getRequestMeta)(a,"isRSCRequest")??!!a.headers[s.RSC_HEADER],ap=(0,r.getIsPossibleServerAction)(a),aq=(0,l.checkIsAppPPREnabled)(ad.experimental.ppr)&&(null==(d=$.routes[af]??$.dynamicRoutes[af])?void 0:d.renderingMode)==="PARTIALLY_STATIC",ar=!1,as=!1,at=aq?L:void 0,au=aq&&ao&&!an,av=(0,h.getRequestMeta)(a,"segmentPrefetchRSCRequest"),aw=!ak||(0,o.shouldServeStreamingMetadata)(ak,ad.htmlLimitedBots);am&&aq&&(aj=!1,aw=!1);let ax=!0===J.isDev||!aj||"string"==typeof L||au,ay=am&&aq,az=null;_||!aj||ax||ap||at||au||(az=aa);let aA=az;!aA&&J.isDev&&(aA=aa);let aB={...D,tree:G,pages:H,GlobalError:C(),handler:K,routeModule:J,__next_app__:I};X&&Y&&(0,n.setReferenceManifestsSingleton)({page:B,clientReferenceManifest:Y,serverActionsManifest:X,serverModuleMap:(0,p.createServerModuleMap)({serverActionsManifest:X})});let aC=a.method||"GET",aD=(0,g.getTracer)(),aE=aD.getActiveScopeSpan();try{let d=async(c,d)=>{let e=new k.NodeNextRequest(a),f=new k.NodeNextResponse(b);return J.render(e,f,d).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=aD.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==i.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${aC} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${aC} ${a.url}`)})},f=async({span:e,postponed:f,fallbackRouteParams:g})=>{let i={query:P,params:Q,page:af,sharedContext:{buildId:O},serverComponentsHmrCache:(0,h.getRequestMeta)(a,"serverComponentsHmrCache"),fallbackRouteParams:g,renderOpts:{App:()=>null,Document:()=>null,pageConfig:{},ComponentMod:aB,Component:(0,j.T)(aB),params:Q,routeModule:J,page:B,postponed:f,shouldWaitOnAllReady:ay,serveStreamingMetadata:aw,supportsDynamicResponse:"string"==typeof f||ax,buildManifest:U,nextFontManifest:V,reactLoadableManifest:W,subresourceIntegrityManifest:Z,serverActionsManifest:X,clientReferenceManifest:Y,setIsrStatus:null==ac?void 0:ac.setIsrStatus,dir:J.projectDir,isDraftMode:_,isRevalidate:aj&&!f&&!au,botType:al,isOnDemandRevalidate:ag,isPossibleServerAction:ap,assetPrefix:ad.assetPrefix,nextConfigOutput:ad.output,crossOrigin:ad.crossOrigin,trailingSlash:ad.trailingSlash,previewProps:$.preview,deploymentId:ad.deploymentId,enableTainting:ad.experimental.taint,htmlLimitedBots:ad.htmlLimitedBots,devtoolSegmentExplorer:ad.experimental.devtoolSegmentExplorer,reactMaxHeadersLength:ad.reactMaxHeadersLength,multiZoneDraftMode:F,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:ad.experimental.cacheLife,basePath:ad.basePath,serverActions:ad.experimental.serverActions,...ar?{nextExport:!0,supportsDynamicResponse:!1,isStaticGeneration:!0,isRevalidate:!0,isDebugDynamicAccesses:ar}:{},experimental:{isRoutePPREnabled:aq,expireTime:ad.expireTime,staleTimes:ad.experimental.staleTimes,dynamicIO:!!ad.experimental.dynamicIO,clientSegmentCache:!!ad.experimental.clientSegmentCache,dynamicOnHover:!!ad.experimental.dynamicOnHover,inlineCss:!!ad.experimental.inlineCss,authInterrupts:!!ad.experimental.authInterrupts,clientTraceMetadata:ad.experimental.clientTraceMetadata||[]},waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:()=>{},onInstrumentationRequestError:(b,c,d)=>J.onRequestError(a,b,d,ac),err:(0,h.getRequestMeta)(a,"invokeError"),dev:J.isDev}},k=await d(e,i),{metadata:l}=k,{cacheControl:m,headers:n={},fetchTags:o}=l;if(o&&(n[x.NEXT_CACHE_TAGS_HEADER]=o),a.fetchMetrics=l.fetchMetrics,aj&&(null==m?void 0:m.revalidate)===0&&!J.isDev&&!aq){let a=l.staticBailoutInfo,b=Object.defineProperty(Error(`Page changed from static to dynamic at runtime ${aa}${(null==a?void 0:a.description)?`, reason: ${a.description}`:""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),"__NEXT_ERROR_CODE",{value:"E132",enumerable:!1,configurable:!0});if(null==a?void 0:a.stack){let c=a.stack;b.stack=b.message+c.substring(c.indexOf("\n"))}throw b}return{value:{kind:u.CachedRouteKind.APP_PAGE,html:k,headers:n,rscData:l.flightData,postponed:l.postponed,status:l.statusCode,segmentData:l.segmentData},cacheControl:m}},l=async({hasResolved:d,previousCacheEntry:g,isRevalidating:i,span:j})=>{let k,l=!1===J.isDev,n=d||b.writableEnded;if(ag&&ab&&!g&&!M)return(null==ac?void 0:ac.render404)?await ac.render404(a,b):(b.statusCode=404,b.end("This page could not be found")),null;if(ah&&(k=(0,v.parseFallbackField)(ah.fallback)),k===v.FallbackMode.PRERENDER&&(0,t.isBot)(ak)&&(k=v.FallbackMode.BLOCKING_STATIC_RENDER),(null==g?void 0:g.isStale)===-1&&(ag=!0),ag&&(k!==v.FallbackMode.NOT_FOUND||g)&&(k=v.FallbackMode.BLOCKING_STATIC_RENDER),!M&&k!==v.FallbackMode.BLOCKING_STATIC_RENDER&&aA&&!n&&!_&&S&&(l||!ai)){let b;if((l||ah)&&k===v.FallbackMode.NOT_FOUND)throw new A.NoFallbackError;if(aq&&!ao){if(b=await J.handleResponse({cacheKey:l?af:null,req:a,nextConfig:ad,routeKind:e.RouteKind.APP_PAGE,isFallback:!0,prerenderManifest:$,isRoutePPREnabled:aq,responseGenerator:async()=>f({span:j,postponed:void 0,fallbackRouteParams:l||as?(0,m.u)(af):null}),waitUntil:c.waitUntil}),null===b)return null;if(b)return delete b.cacheControl,b}}let o=ag||i||!at?void 0:at;if(ar&&void 0!==o)return{cacheControl:{revalidate:1,expire:void 0},value:{kind:u.CachedRouteKind.PAGES,html:w.default.fromStatic(""),pageData:{},headers:void 0,status:void 0}};let p=S&&aq&&((0,h.getRequestMeta)(a,"renderFallbackShell")||as)?(0,m.u)(ae):null;return f({span:j,postponed:o,fallbackRouteParams:p})},n=async d=>{var g,i,j,k,m;let n,o=await J.handleResponse({cacheKey:az,responseGenerator:a=>l({span:d,...a}),routeKind:e.RouteKind.APP_PAGE,isOnDemandRevalidate:ag,isRoutePPREnabled:aq,req:a,nextConfig:ad,prerenderManifest:$,waitUntil:c.waitUntil});if(_&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate"),J.isDev&&b.setHeader("Cache-Control","no-store, must-revalidate"),!o){if(az)throw Object.defineProperty(Error("invariant: cache entry required but not generated"),"__NEXT_ERROR_CODE",{value:"E62",enumerable:!1,configurable:!0});return null}if((null==(g=o.value)?void 0:g.kind)!==u.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null==(j=o.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E707",enumerable:!1,configurable:!0});let p="string"==typeof o.value.postponed;aj&&!au&&(!p||an)&&(M||b.setHeader("x-nextjs-cache",ag?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),b.setHeader(s.NEXT_IS_PRERENDER_HEADER,"1"));let{value:q}=o;if(at)n={revalidate:0,expire:void 0};else if(M&&ao&&!an&&aq)n={revalidate:0,expire:void 0};else if(!J.isDev)if(_)n={revalidate:0,expire:void 0};else if(aj){if(o.cacheControl)if("number"==typeof o.cacheControl.revalidate){if(o.cacheControl.revalidate<1)throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`),"__NEXT_ERROR_CODE",{value:"E22",enumerable:!1,configurable:!0});n={revalidate:o.cacheControl.revalidate,expire:(null==(k=o.cacheControl)?void 0:k.expire)??ad.expireTime}}else n={revalidate:x.CACHE_ONE_YEAR,expire:void 0}}else b.getHeader("Cache-Control")||(n={revalidate:0,expire:void 0});if(o.cacheControl=n,"string"==typeof av&&(null==q?void 0:q.kind)===u.CachedRouteKind.APP_PAGE&&q.segmentData){b.setHeader(s.NEXT_DID_POSTPONE_HEADER,"2");let c=null==(m=q.headers)?void 0:m[x.NEXT_CACHE_TAGS_HEADER];M&&aj&&c&&"string"==typeof c&&b.setHeader(x.NEXT_CACHE_TAGS_HEADER,c);let d=q.segmentData.get(av);return void 0!==d?(0,z.sendRenderResult)({req:a,res:b,type:"rsc",generateEtags:ad.generateEtags,poweredByHeader:ad.poweredByHeader,result:w.default.fromStatic(d),cacheControl:o.cacheControl}):(b.statusCode=204,(0,z.sendRenderResult)({req:a,res:b,type:"rsc",generateEtags:ad.generateEtags,poweredByHeader:ad.poweredByHeader,result:w.default.fromStatic(""),cacheControl:o.cacheControl}))}let r=(0,h.getRequestMeta)(a,"onCacheEntry");if(r&&await r({...o,value:{...o.value,kind:"PAGE"}},{url:(0,h.getRequestMeta)(a,"initURL")}))return null;if(p&&at)throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"),"__NEXT_ERROR_CODE",{value:"E396",enumerable:!1,configurable:!0});if(q.headers){let a={...q.headers};for(let[c,d]of(M&&aj||delete a[x.NEXT_CACHE_TAGS_HEADER],Object.entries(a)))if(void 0!==d)if(Array.isArray(d))for(let a of d)b.appendHeader(c,a);else"number"==typeof d&&(d=d.toString()),b.appendHeader(c,d)}let t=null==(i=q.headers)?void 0:i[x.NEXT_CACHE_TAGS_HEADER];if(M&&aj&&t&&"string"==typeof t&&b.setHeader(x.NEXT_CACHE_TAGS_HEADER,t),!q.status||ao&&aq||(b.statusCode=q.status),!M&&q.status&&E.RedirectStatusCode[q.status]&&ao&&(b.statusCode=200),p&&b.setHeader(s.NEXT_DID_POSTPONE_HEADER,"1"),ao&&!_){if(void 0===q.rscData){if(q.postponed)throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"),"__NEXT_ERROR_CODE",{value:"E372",enumerable:!1,configurable:!0});return(0,z.sendRenderResult)({req:a,res:b,type:"rsc",generateEtags:ad.generateEtags,poweredByHeader:ad.poweredByHeader,result:q.html,cacheControl:au?{revalidate:0,expire:void 0}:o.cacheControl})}return(0,z.sendRenderResult)({req:a,res:b,type:"rsc",generateEtags:ad.generateEtags,poweredByHeader:ad.poweredByHeader,result:w.default.fromStatic(q.rscData),cacheControl:o.cacheControl})}let v=q.html;if(!p||M)return(0,z.sendRenderResult)({req:a,res:b,type:"html",generateEtags:ad.generateEtags,poweredByHeader:ad.poweredByHeader,result:v,cacheControl:o.cacheControl});if(ar)return v.chain(new ReadableStream({start(a){a.enqueue(y.ENCODED_TAGS.CLOSED.BODY_AND_HTML),a.close()}})),(0,z.sendRenderResult)({req:a,res:b,type:"html",generateEtags:ad.generateEtags,poweredByHeader:ad.poweredByHeader,result:v,cacheControl:{revalidate:0,expire:void 0}});let A=new TransformStream;return v.chain(A.readable),f({span:d,postponed:q.postponed,fallbackRouteParams:null}).then(async a=>{var b,c;if(!a)throw Object.defineProperty(Error("Invariant: expected a result to be returned"),"__NEXT_ERROR_CODE",{value:"E463",enumerable:!1,configurable:!0});if((null==(b=a.value)?void 0:b.kind)!==u.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null==(c=a.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E305",enumerable:!1,configurable:!0});await a.value.html.pipeTo(A.writable)}).catch(a=>{A.writable.abort(a).catch(a=>{console.error("couldn't abort transformer",a)})}),(0,z.sendRenderResult)({req:a,res:b,type:"html",generateEtags:ad.generateEtags,poweredByHeader:ad.poweredByHeader,result:v,cacheControl:{revalidate:0,expire:void 0}})};if(!aE)return await aD.withPropagatedContext(a.headers,()=>aD.trace(i.BaseServerSpan.handleRequest,{spanName:`${aC} ${a.url}`,kind:g.SpanKind.SERVER,attributes:{"http.method":aC,"http.target":a.url}},n));await n(aE)}catch(b){throw aE||await J.onRequestError(a,b,{routerKind:"App Router",routePath:B,routeType:"render",revalidateReason:(0,f.c)({isRevalidate:aj,isOnDemandRevalidate:ag})},ac),b}}},94735:a=>{"use strict";a.exports=require("events")}};var b=require("../../../../webpack-runtime.js");b.C(a);var c=b.X(0,[985,301,872,911],()=>b(b.s=91781));module.exports=c})();