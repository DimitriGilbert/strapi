"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5576],{3637:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var i=t(3117),a=(t(7294),t(3905));const r={title:"Build",tags:["commands","admin","build"]},o=void 0,s={unversionedId:"docs/core/admin/commands/build",id:"docs/core/admin/commands/build",title:"Build",description:"How it works",source:"@site/docs/docs/01-core/admin/04-commands/01-build.md",sourceDirName:"docs/01-core/admin/04-commands",slug:"/docs/core/admin/commands/build",permalink:"/docs/core/admin/commands/build",draft:!1,editUrl:"https://github.com/strapi/strapi/tree/main/docs/docs/docs/01-core/admin/04-commands/01-build.md",tags:[{label:"commands",permalink:"/tags/commands"},{label:"admin",permalink:"/tags/admin"},{label:"build",permalink:"/tags/build"}],version:"current",sidebarPosition:1,frontMatter:{title:"Build",tags:["commands","admin","build"]},sidebar:"docs",previous:{title:"Overview",permalink:"/docs/core/admin/commands/overview"},next:{title:"Develop",permalink:"/docs/core/admin/commands/develop"}},l={},d=[{value:"How it works",id:"how-it-works",level:2},{value:"Dependencies",id:"dependencies",level:3},{value:"BuildContext",id:"buildcontext",level:3},{value:"Static Files",id:"static-files",level:3},{value:"Bundling",id:"bundling",level:3},{value:"CLI Usage",id:"cli-usage",level:2},{value:"Options",id:"options",level:3},{value:"Node Usage",id:"node-usage",level:2},{value:"Options",id:"options-1",level:3}],p={toc:d};function c(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"how-it-works"},"How it works"),(0,a.kt)("p",null,"The build process for the admin panel is designed to be bundler agnostic, this means we can easily experiment and perhaps transition to new bundlers as they become available in the ecosystem. This is facilitated by the use of a ",(0,a.kt)("a",{parentName:"p",href:"#buildcontext"},(0,a.kt)("inlineCode",{parentName:"a"},"BuildContext"))," that contains all the information needed to build the admin panel \u2013 if it's found more information is required this context can be tweaked to provide it."),(0,a.kt)("h3",{id:"dependencies"},"Dependencies"),(0,a.kt)("p",null,"The first step of running the build command is to check if the required dependencies are installed at the root of the project. This provides better DX for:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"miss-installed project"),(0,a.kt)("li",{parentName:"ul"},"monorepos"),(0,a.kt)("li",{parentName:"ul"},"incorrect/incompatible versions of packages for ",(0,a.kt)("em",{parentName:"li"},"certain")," packages like ",(0,a.kt)("inlineCode",{parentName:"li"},"styled-components")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"react"),".")),(0,a.kt)("p",null,"The list of packages we explicity check for are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"react")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"react-dom")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"styled-components")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"react-router-dom"))),(0,a.kt)("p",null,"This is because there should only be one instance of these packages installed and used by the project at any one time, failure to do so can and most likely will, lead to bugs. This also means an incompatible version of these packages could cause unintended side effects e.g. if ",(0,a.kt)("inlineCode",{parentName:"p"},"react@19")," was suddenly released but we had not tested it against the admin panel."),(0,a.kt)("p",null,"We run a prompt to encourage the user to install these deps \u2013 however, this functionality has not yet been built."),(0,a.kt)("h3",{id:"buildcontext"},"BuildContext"),(0,a.kt)("p",null,"The build context is the heart of how the admin builds, as said above it's agnostic, it doesn't care if we're using webpack or vite or parcel. It's an object of data that can be used to preapre any bundler. It's shape looks like:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"interface BuildContext {\n  /**\n   * The absolute path to the app directory defined by the Strapi instance\n   */\n  appDir: string;\n  /**\n   * If a user is deploying the project under a nested public path, we use\n   * this path so all asset paths will be rewritten accordingly\n   */\n  basePath: string;\n  /**\n   * The customisations defined by the user in their app.js file\n   */\n  customisations?: AppFile;\n  /**\n   * The current working directory\n   */\n  cwd: string;\n  /**\n   * The absolute path to the dist directory\n   */\n  distPath: string;\n  /**\n   * The relative path to the dist directory\n   */\n  distDir: string;\n  /**\n   * The absolute path to the entry file\n   */\n  entry: string;\n  /**\n   * The environment variables to be included in the JS bundle\n   */\n  env: Record<string, string>;\n  logger: CLIContext['logger'];\n  /**\n   * The build options\n   */\n  options: Pick<BuildOptions, 'minify' | 'sourcemaps' | 'stats'> & Pick<DevelopOptions, 'open'>;\n  /**\n   * The plugins to be included in the JS bundle\n   * incl. internal plugins, third party plugins & local plugins\n   */\n  plugins: Array<{\n    path: string;\n    name: string;\n    importName: string;\n  }>;\n  /**\n   * The absolute path to the runtime directory\n   */\n  runtimeDir: string;\n  /**\n   * The Strapi instance\n   */\n  strapi: Strapi;\n  /**\n   * The browserslist target either loaded from the user's workspace or falling back to the default\n   */\n  target: string[];\n  tsconfig?: CLIContext['tsconfig'];\n}\n")),(0,a.kt)("h3",{id:"static-files"},"Static Files"),(0,a.kt)("p",null,"The next step is to create a ",(0,a.kt)("inlineCode",{parentName:"p"},"runtime")," folder in the root of the strapi project, a generic name ",(0,a.kt)("inlineCode",{parentName:"p"},".strapi")," is used and the build specifically uses a subfolder called ",(0,a.kt)("inlineCode",{parentName:"p"},"client"),". This leaves more space for us to expand as and when we require it. We only generate two files for this \u2013 an ",(0,a.kt)("inlineCode",{parentName:"p"},"index.html")," which is a static rendered React Component from the ",(0,a.kt)("inlineCode",{parentName:"p"},"@strapi/admin")," package (DefaultDocument) & an ",(0,a.kt)("inlineCode",{parentName:"p"},"entry.js")," file which calls the ",(0,a.kt)("inlineCode",{parentName:"p"},"renderAdmin")," function & provides a mount point & plugin object."),(0,a.kt)("h3",{id:"bundling"},"Bundling"),(0,a.kt)("p",null,"We currently only support the ",(0,a.kt)("inlineCode",{parentName:"p"},"webpack")," bundler. Because there is no global ",(0,a.kt)("inlineCode",{parentName:"p"},"strapi.config")," file we don't have an already existing API to pass your own bundler. In the future we may decide to do this if there is a need. The current future plan is to add the ",(0,a.kt)("inlineCode",{parentName:"p"},"vite")," bundler as an option. Each bundler supplies a build function & a develop function. We don't need a serve function because they're expected to produce the same ",(0,a.kt)("inlineCode",{parentName:"p"},"index.html")," output defined by the static files step described above."),(0,a.kt)("h2",{id:"cli-usage"},"CLI Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"strapi build\n")),(0,a.kt)("h3",{id:"options"},"Options"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"Build the strapi admin app\n\nOptions:\n  -d, --debug        Enable debugging mode with verbose logs (default: false)\n  --minify           Minify the output (default: true)\n  --no-optimization  [deprecated]: use minify instead\n  --silent           Don't log anything (default: false)\n  --sourcemap        Produce sourcemaps (default: false)\n  --stats            Print build statistics to the console (default: false)\n  -h, --help         Display help for command\n")),(0,a.kt)("h2",{id:"node-usage"},"Node Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { build, BuildOptions } from '@strapi/admin/_internal';\n\nconst args: BuildOptions = {\n  // ...\n};\n\nawait build(args);\n")),(0,a.kt)("h3",{id:"options-1"},"Options"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"interface BuildOptions extends CLIContext {\n  /**\n   * The directory to build the command was ran from\n   */\n  cwd: string;\n  /**\n   * The logger to use.\n   */\n  logger: Logger;\n  /**\n   * Minify the output\n   *\n   * @default true\n   */\n  minify?: boolean;\n  /**\n   * Generate sourcemaps \u2013 useful for debugging bugs in the admin panel UI.\n   */\n  sourcemaps?: boolean;\n  /**\n   * Print stats for build\n   */\n  stats?: boolean;\n  /**\n   * The tsconfig to use for the build. If undefined, this is not a TS project.\n   */\n  tsconfig?: TsConfig;\n}\n\ninterface Logger {\n  warnings: number;\n  errors: number;\n  debug: (...args: unknown[]) => void;\n  info: (...args: unknown[]) => void;\n  warn: (...args: unknown[]) => void;\n  error: (...args: unknown[]) => void;\n  log: (...args: unknown[]) => void;\n  spinner: (text: string) => Pick<ora.Ora, 'succeed' | 'fail' | 'start' | 'text'>;\n}\n\ninterface TsConfig {\n  config: ts.ParsedCommandLine;\n  path: string;\n}\n")))}c.isMDXComponent=!0},3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var i=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=i.createContext({}),d=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=d(e.components);return i.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=d(t),m=a,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||r;return t?i.createElement(h,o(o({ref:n},p),{},{components:t})):i.createElement(h,o({ref:n},p))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,o=new Array(r);o[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var d=2;d<r;d++)o[d]=t[d];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);