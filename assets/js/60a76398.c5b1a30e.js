"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2887],{1632:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var r=n(3117),i=(n(7294),n(3905));const o={title:"useLicenseLimits",description:"API reference for the useLicenseLimits hook",tags:["admin","hooks","users","ee"]},s=void 0,a={unversionedId:"docs/core/admin/ee/hooks/use-license-limits",id:"docs/core/admin/ee/hooks/use-license-limits",title:"useLicenseLimits",description:"API reference for the useLicenseLimits hook",source:"@site/docs/docs/01-core/admin/01-ee/03-hooks/use-license-limits.mdx",sourceDirName:"docs/01-core/admin/01-ee/03-hooks",slug:"/docs/core/admin/ee/hooks/use-license-limits",permalink:"/docs/core/admin/ee/hooks/use-license-limits",draft:!1,editUrl:"https://github.com/strapi/strapi/tree/main/docs/docs/docs/01-core/admin/01-ee/03-hooks/use-license-limits.mdx",tags:[{label:"admin",permalink:"/tags/admin"},{label:"hooks",permalink:"/tags/hooks"},{label:"users",permalink:"/tags/users"},{label:"ee",permalink:"/tags/ee"}],version:"current",frontMatter:{title:"useLicenseLimits",description:"API reference for the useLicenseLimits hook",tags:["admin","hooks","users","ee"]},sidebar:"docs",previous:{title:"Audit Logs",permalink:"/docs/core/admin/ee/audit-logs"},next:{title:"Introduction",permalink:"/permissions"}},c={},l=[{value:"Usage",id:"usage",level:2},{value:"Options",id:"options",level:2},{value:"<code>enabled</code>",id:"enabled",level:3},{value:"Result",id:"result",level:2},{value:"<code>license</code>",id:"license",level:3},{value:"<code>getFeature(name: string)</code>",id:"getfeaturename-string",level:3},{value:"Usage",id:"usage-1",level:4},{value:"Typescript",id:"typescript",level:2}],u={toc:l};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"An abstraction around ",(0,i.kt)("inlineCode",{parentName:"p"},"react-query"),"'s ",(0,i.kt)("inlineCode",{parentName:"p"},"useQuery")," hook to fetch license limits for a project."),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const { license, getFeature, isError, isLoading } = useLicenseLimits(options);\n")),(0,i.kt)("h2",{id:"options"},"Options"),(0,i.kt)("h3",{id:"enabled"},(0,i.kt)("inlineCode",{parentName:"h3"},"enabled")),(0,i.kt)("p",null,"Boolean flag which is passed onto react-query indicating whether the license check should be performed. This\ncan be useful if e.g. other permissions need to be checked before."),(0,i.kt)("h2",{id:"result"},"Result"),(0,i.kt)("h3",{id:"license"},(0,i.kt)("inlineCode",{parentName:"h3"},"license")),(0,i.kt)("p",null,"An object that contains the raw admin API response."),(0,i.kt)("h3",{id:"getfeaturename-string"},(0,i.kt)("inlineCode",{parentName:"h3"},"getFeature(name: string)")),(0,i.kt)("p",null,"Returns options for a given feature. If the feature was not found, it returns an empty object. This is mostly a\nconvenience method, to avoid having to filter the features array on the license object every time."),(0,i.kt)("h4",{id:"usage-1"},"Usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"const { getFeature } = useLicenseLimits();\n\nconst reviewWorkflowOptions = getFeature('review-workflows');\n")),(0,i.kt)("h2",{id:"typescript"},"Typescript"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { UseQueryResult } from 'react-query';\n\n// Note: the list of attributes might be incomplete\ninterface License {\n  enforcementUserCount: number;\n  currentActiveUserCount: number;\n  permittedSeats: number;\n  shouldNotify: boolean;\n  shouldStopCreate: boolean;\n  licenseLimitStatus: 'OVER_LIMIT' | 'AT_LIMIT';\n  isHostedOnStrapiCloud: boolean;\n  features: LicenseFeature[];\n}\n\ninterface LicenseFeature {\n  name: string;\n  options?: object;\n}\n\ntype Options {\n  enabled?: boolean;\n}\n\ntype UseLicenseLimit = (options: Options) => Pick<UseQueryResult, 'isError' | 'isLoading'> & { license: License, getFeature: (name: string) => object }\n")))}p.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=l(n),m=i,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,s(s({ref:t},u),{},{components:n})):r.createElement(f,s({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=d;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var l=2;l<o;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);