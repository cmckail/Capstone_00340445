(this["webpackJsonptadoo-client"]=this["webpackJsonptadoo-client"]||[]).push([[18],{266:function(t,n,e){"use strict";var r=e(6),a=e(4),i=e(1),c=e(0),o=(e(11),e(5)),s=e(12),d=e(100),u=e(98),p=e(9),l=e(13);var g=c.createContext(),m=e(20),x=e(81),b=e(99);function f(t){return Object(x.a)("MuiGrid",t)}var v=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],j=Object(b.a)("MuiGrid",["root","container","item","zeroMinWidth"].concat(Object(m.a)([0,1,2,3,4,5,6,7,8,9,10].map((function(t){return"spacing-xs-".concat(t)}))),Object(m.a)(["column-reverse","column","row-reverse","row"].map((function(t){return"direction-xs-".concat(t)}))),Object(m.a)(["nowrap","wrap-reverse","wrap"].map((function(t){return"wrap-xs-".concat(t)}))),Object(m.a)(v.map((function(t){return"grid-xs-".concat(t)}))),Object(m.a)(v.map((function(t){return"grid-sm-".concat(t)}))),Object(m.a)(v.map((function(t){return"grid-md-".concat(t)}))),Object(m.a)(v.map((function(t){return"grid-lg-".concat(t)}))),Object(m.a)(v.map((function(t){return"grid-xl-".concat(t)}))))),h=e(3),w=["className","columns","columnSpacing","component","container","direction","item","lg","md","rowSpacing","sm","spacing","wrap","xl","xs","zeroMinWidth"];function S(t){var n=parseFloat(t);return"".concat(n).concat(String(t).replace(String(n),"")||"px")}var O=Object(p.a)("div",{name:"MuiGrid",slot:"Root",overridesResolver:function(t,n){var e=t.ownerState,r=e.container,a=e.direction,i=e.item,c=e.lg,o=e.md,s=e.sm,d=e.spacing,u=e.wrap,p=e.xl,l=e.xs,g=e.zeroMinWidth;return[n.root,r&&n.container,i&&n.item,g&&n.zeroMinWidth,r&&0!==d&&n["spacing-xs-".concat(String(d))],"row"!==a&&n["direction-xs-".concat(String(a))],"wrap"!==u&&n["wrap-xs-".concat(String(u))],!1!==l&&n["grid-xs-".concat(String(l))],!1!==s&&n["grid-sm-".concat(String(s))],!1!==o&&n["grid-md-".concat(String(o))],!1!==c&&n["grid-lg-".concat(String(c))],!1!==p&&n["grid-xl-".concat(String(p))]]}})((function(t){var n=t.ownerState;return Object(i.a)({boxSizing:"border-box"},n.container&&{display:"flex",flexWrap:"wrap",width:"100%"},n.item&&{margin:0},n.zeroMinWidth&&{minWidth:0},"nowrap"===n.wrap&&{flexWrap:"nowrap"},"reverse"===n.wrap&&{flexWrap:"wrap-reverse"})}),(function(t){var n=t.theme,e=t.ownerState,r=Object(s.d)({values:e.direction,breakpoints:n.breakpoints.values});return Object(s.b)({theme:n},r,(function(t){var n={flexDirection:t};return 0===t.indexOf("column")&&(n["& > .".concat(j.item)]={maxWidth:"none"}),n}))}),(function(t){var n=t.theme,e=t.ownerState,a=e.container,i=e.rowSpacing,c={};if(a&&0!==i){var o=Object(s.d)({values:i,breakpoints:n.breakpoints.values});c=Object(s.b)({theme:n},o,(function(t){var e=n.spacing(t);return"0px"!==e?Object(r.a)({marginTop:"-".concat(S(e))},"& > .".concat(j.item),{paddingTop:S(e)}):{}}))}return c}),(function(t){var n=t.theme,e=t.ownerState,a=e.container,i=e.columnSpacing,c={};if(a&&0!==i){var o=Object(s.d)({values:i,breakpoints:n.breakpoints.values});c=Object(s.b)({theme:n},o,(function(t){var e=n.spacing(t);return"0px"!==e?Object(r.a)({width:"calc(100% + ".concat(S(e),")"),marginLeft:"-".concat(S(e))},"& > .".concat(j.item),{paddingLeft:S(e)}):{}}))}return c}),(function(t){var n=t.theme,e=t.ownerState;return n.breakpoints.keys.reduce((function(t,r){return function(t,n,e,r){var a=r[e];if(a){var c={};if(!0===a)c={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===a)c={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{var o=Object(s.d)({values:r.columns,breakpoints:n.breakpoints.values}),d="object"===typeof o?o[e]:o,u="".concat(Math.round(a/d*1e8)/1e6,"%"),p={};if(r.container&&r.item&&0!==r.columnSpacing){var l=n.spacing(r.columnSpacing);if("0px"!==l){var g="calc(".concat(u," + ").concat(S(l),")");p={flexBasis:g,maxWidth:g}}}c=Object(i.a)({flexBasis:u,flexGrow:0,maxWidth:u},p)}0===n.breakpoints.values[e]?Object.assign(t,c):t[n.breakpoints.up(e)]=c}}(t,n,r,e),t}),{})})),k=c.forwardRef((function(t,n){var e,r=Object(l.a)({props:t,name:"MuiGrid"}),s=Object(d.a)(r),p=s.className,m=s.columns,x=s.columnSpacing,b=s.component,v=void 0===b?"div":b,j=s.container,S=void 0!==j&&j,k=s.direction,W=void 0===k?"row":k,M=s.item,z=void 0!==M&&M,G=s.lg,T=void 0!==G&&G,y=s.md,B=void 0!==y&&y,C=s.rowSpacing,R=s.sm,F=void 0!==R&&R,L=s.spacing,N=void 0===L?0:L,A=s.wrap,J=void 0===A?"wrap":A,P=s.xl,D=void 0!==P&&P,H=s.xs,I=void 0!==H&&H,q=s.zeroMinWidth,E=void 0!==q&&q,K=Object(a.a)(s,w),Q=C||N,U=x||N,V=c.useContext(g),X=m||V||12,Y=Object(i.a)({},s,{columns:X,container:S,direction:W,item:z,lg:T,md:B,sm:F,rowSpacing:Q,columnSpacing:U,wrap:J,xl:D,xs:I,zeroMinWidth:E}),Z=function(t){var n=t.classes,e=t.container,r=t.direction,a=t.item,i=t.lg,c=t.md,o=t.sm,s=t.spacing,d=t.wrap,p=t.xl,l=t.xs,g={root:["root",e&&"container",a&&"item",t.zeroMinWidth&&"zeroMinWidth",e&&0!==s&&"spacing-xs-".concat(String(s)),"row"!==r&&"direction-xs-".concat(String(r)),"wrap"!==d&&"wrap-xs-".concat(String(d)),!1!==l&&"grid-xs-".concat(String(l)),!1!==o&&"grid-sm-".concat(String(o)),!1!==c&&"grid-md-".concat(String(c)),!1!==i&&"grid-lg-".concat(String(i)),!1!==p&&"grid-xl-".concat(String(p))]};return Object(u.a)(g,f,n)}(Y);return e=Object(h.jsx)(O,Object(i.a)({ownerState:Y,className:Object(o.a)(Z.root,p),as:v,ref:n},K)),12!==X?Object(h.jsx)(g.Provider,{value:X,children:e}):e}));n.a=k},322:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return i}));e(0);var r=e(266),a=e(3);function i(){return Object(a.jsxs)(r.a,{container:!0,children:[Object(a.jsx)(r.a,{item:!0,xs:12,style:{alignSelf:"center",minHeight:"400px",backgroundImage:"url(https://i.ibb.co/3T5hs41/GLT-Tattoo-Flash-Wall.jpg)",backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",padding:"30px, 30px, 40px, 40px",textAlign:"center"}}),Object(a.jsxs)(r.a,{item:!0,xs:12,style:{alignSelf:"center",textAlign:"center"},children:[Object(a.jsx)("h1",{children:" Tadoo"}),Object(a.jsx)("h3",{children:" Flash Card Tattoo Marketplace"}),Object(a.jsx)("h5",{children:" Sell as a Merchant or Buy as a Client!"})]})]})}}}]);
//# sourceMappingURL=18.e9e96f6e.chunk.js.map