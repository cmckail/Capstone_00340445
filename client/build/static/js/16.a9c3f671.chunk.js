(this["webpackJsonptadoo-client"]=this["webpackJsonptadoo-client"]||[]).push([[16],{120:function(t,e,n){"use strict";function c(){var t=JSON.parse(localStorage.getItem("user"));return t&&t.accessToken?{"x-access-token":t.accessToken}:{}}n.d(e,"a",(function(){return c}))},252:function(t,e,n){"use strict";var c=n(7);e.a=function(){return new URLSearchParams(Object(c.h)().search)}},338:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return h}));var c=n(21),s=n(0),a=n(104),r=n(113),i=n.n(r),o=n(120),u=function(t){return i.a.post("".concat("https://tadoo-backend-p9hgk.ondigitalocean.app/api/","transactions/check_transaction"),{session_id:t},{headers:Object(o.a)()}).then((function(t){return t.data}))},p=n(252),d=n(3);function h(){var t=Object(p.a)(),e=Object(s.useState)(""),n=Object(c.a)(e,2),r=n[0],i=n[1],o=Object(s.useState)(!1),h=Object(c.a)(o,2),j=h[0],l=h[1];return Object(s.useEffect)((function(){var e=t.get("session_id");e?u(e).then(l(!0)).catch((function(t){l(!0),i("Error processing transaction please contact support")})):i("Error No Session ID Pass. If this is a mistake please contact support")}),[]),j||r?Object(d.jsx)(a.a,{children:r?Object(d.jsxs)("div",{style:{margin:"auto",paddingTop:"20px",textAlign:"center"},children:[Object(d.jsx)("h1",{children:"Error"}),Object(d.jsx)("p",{children:r})]}):Object(d.jsxs)("div",{style:{margin:"auto",paddingTop:"20px",textAlign:"center"},children:[Object(d.jsx)("h1",{children:"Success"}),Object(d.jsx)("p",{children:"Please give the Artist 48 hours to respond."}),Object(d.jsx)("p",{children:"Navigate to appointments to see your invoice and appointment status!"})]})}):Object(d.jsx)(a.a,{children:Object(d.jsx)("div",{style:{margin:"auto",paddingTop:"20px",textAlign:"center"},children:Object(d.jsx)("h1",{children:"Processing..."})})})}}}]);
//# sourceMappingURL=16.a9c3f671.chunk.js.map