"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[866],{8696:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var r=n(3117),o=(n(7294),n(3905));const s={title:"useAdminRoles",description:"API reference for the useAdminRoles hook",tags:["admin","hooks","roles"]},a=void 0,i={unversionedId:"docs/core/admin/features/hooks/use-admin-roles",id:"docs/core/admin/features/hooks/use-admin-roles",title:"useAdminRoles",description:"API reference for the useAdminRoles hook",source:"@site/docs/docs/01-core/admin/05-features/hooks/use-admin-roles.mdx",sourceDirName:"docs/01-core/admin/05-features/hooks",slug:"/docs/core/admin/features/hooks/use-admin-roles",permalink:"/docs/core/admin/features/hooks/use-admin-roles",draft:!1,editUrl:"https://github.com/strapi/strapi/tree/main/docs/docs/docs/01-core/admin/05-features/hooks/use-admin-roles.mdx",tags:[{label:"admin",permalink:"/tags/admin"},{label:"hooks",permalink:"/tags/hooks"},{label:"roles",permalink:"/tags/roles"}],version:"current",frontMatter:{title:"useAdminRoles",description:"API reference for the useAdminRoles hook",tags:["admin","hooks","roles"]},sidebar:"docs",previous:{title:"Authentication",permalink:"/docs/core/admin/features/authentication"},next:{title:"unstable_useDocument",permalink:"/docs/core/admin/features/hooks/use-document"}},l={},c=[{value:"Usage",id:"usage",level:2},{value:"Typescript",id:"typescript",level:2},{value:"Fetch all roles",id:"fetch-all-roles",level:3},{value:"Fetch one role",id:"fetch-one-role",level:3}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"An abstraction around ",(0,o.kt)("inlineCode",{parentName:"p"},"react-query"),"'s ",(0,o.kt)("inlineCode",{parentName:"p"},"useQuery")," hook. It can be used to fetch one ore more admin role."),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"The hooks can receive two optional parameters:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"query params: an object containing the query params to be sent to the API. They are going to be\nstringified by ",(0,o.kt)("inlineCode",{parentName:"li"},"qs"),". All params are equal except ",(0,o.kt)("inlineCode",{parentName:"li"},"id"),", which is used to fetch a single users, if\nit is passed."),(0,o.kt)("li",{parentName:"ol"},"options: an object containing the options to be passed to ",(0,o.kt)("inlineCode",{parentName:"li"},"useQuery"),".")),(0,o.kt)("p",null,"It returns an object containing some of the react-query attributes."),(0,o.kt)("h2",{id:"typescript"},"Typescript"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { UseQueryOptions } from 'react-query'\n\ntype Role = object;\n\nuseAdminRoles(queryParams: object, reactQueryOptions: UseQueryOptions): {\n    roles: Role[],\n    isLoading: boolean;\n    error: object;\n    isError: boolean;\n    refetch: () => Promise<void>;\n};\n")),(0,o.kt)("h3",{id:"fetch-all-roles"},"Fetch all roles"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { useAdminRoles } from 'path/to/hooks';\n\nconst MyComponent = ({ onMoveItem }) => {\n  const { roles, isLoading, refetch } = useAdminRoles();\n\n  return /* ... */;\n};\n")),(0,o.kt)("h3",{id:"fetch-one-role"},"Fetch one role"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"import { Box } from '@strapi/design-system';\n\nimport { useAdminRoles } from 'path/to/hooks';\n\nconst MyComponent = ({ onMoveItem }) => {\n  const {\n    users: [user],\n    isLoading,\n    refetch,\n  } = useAdminRoles({ id: 1 });\n\n  return /* ... */;\n};\n")))}p.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||s;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,a=new Array(s);a[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var c=2;c<s;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);