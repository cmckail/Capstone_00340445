(this["webpackJsonptadoo-client"]=this["webpackJsonptadoo-client"]||[]).push([[13],{120:function(e,t,n){"use strict";function o(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}n.d(t,"a",(function(){return o}))},138:function(e,t,n){"use strict";function o(e){if(e)try{return JSON.parse(e)}catch(t){console.log("error parsing image")}return{}}n.d(t,"a",(function(){return o}))},141:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n(117),i=n(0),c=n(332),a=n(330),r=n(3),s=i.forwardRef((function(e,t){return Object(r.jsx)(a.a,Object(o.a)({elevation:6,ref:t,variant:"filled"},e))}));function l(e){var t=e.open,n=e.setOpen,o=e.severity,i=void 0===o?"success":o,a=e.msg,l=void 0===a?"Default mssg":a,d=function(e,t){"clickaway"!==t&&n(!1)};return Object(r.jsx)(c.a,{open:t,autoHideDuration:6e3,onClose:d,children:Object(r.jsx)(s,{onClose:d,severity:i,sx:{width:"100%"},children:l})})}},235:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));n(0);var o=n(329),i=n(3);function c(e){var t=e.open,n=e.handleClose,c=e.children;return Object(i.jsx)(o.a,{open:t,onClose:n,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:c})}},239:function(e,t,n){"use strict";var o=n(113),i=n.n(o),c=n(120),a="https://tadoo-backend-p9hgk.ondigitalocean.app/api/";t.a={getUserAppointments:function(){return i.a.get("".concat(a,"appointments/user"),{headers:Object(c.a)()}).then((function(e){return e.data}))},getMerchantAppointments:function(){return i.a.get("".concat(a,"appointments/merchant"),{headers:Object(c.a)()}).then((function(e){return e.data}))},bookAppointment:function(e,t){return i.a.post("".concat(a,"appointments/book"),{booked:e,id:t},{headers:Object(c.a)()}).then((function(e){return e.data}))}}},253:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n(254);function i(e){if("string"!==typeof e)return e;var t=Object(o.a)(e),n=t[0],i=t.slice(1);return n.toUpperCase()+i.join("").toLowerCase()}},334:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return W}));var o=n(21),i=n(0),c=n(104),a=n(239),r=n(7),s=n(9),l=n(105),d=n(103),u=n(107),j=n(109),b=n(253),p=n(235),v=n(266),h=n(341),O=n(331),f=n(144),x=n.n(f),g=n(146),m=n.n(g),w=n(149),k=n.n(w),y=n(117),S=n(113),A=n.n(S),C=n(120),R="https://tadoo-backend-p9hgk.ondigitalocean.app/api/",D=function(e){return A.a.post("".concat(R,"reviews"),e,{headers:Object(C.a)()})},T=function(e){return A.a.put("".concat(R,"reviews"),Object(y.a)({},e),{headers:Object(C.a)()})},U=n(326),L=n(327),N=n(298),P=n.n(N),_=n(335),B=n(3),E={.5:"Bad",1:"Bad+",1.5:"Poor",2:"Poor+",2.5:"Ok",3:"Ok+",3.5:"Good",4:"Good+",4.5:"Excellent",5:"Excellent+"};function F(e){var t=e.setValue,n=e.value,c=e.readOnly,a=void 0!==c&&c,r=Object(i.useState)(-1),s=Object(o.a)(r,2),d=s[0],u=s[1];return Object(B.jsxs)(l.a,{sx:{width:200,display:"flex",alignItems:"center"},children:[Object(B.jsx)(_.a,{readOnly:a,name:"hover-feedback",value:n,precision:.5,onChange:function(e,n){t(n)},onChangeActive:function(e,t){u(t)},emptyIcon:Object(B.jsx)(P.a,{style:{opacity:.55},fontSize:"inherit"})}),null!==n&&Object(B.jsx)(l.a,{sx:{ml:2},children:E[-1!==d?d:n]})]})}var I={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"60%",height:"fit-content",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4,overflow:"scroll"};function J(e){var t=e.handleResult,n=(e.setOpen,e.appointment),c=e.review,a=void 0===c?null:c,r=Object(i.useState)(!1),s=Object(o.a)(r,2),d=s[0],u=s[1],j=Object(i.useState)(0),b=Object(o.a)(j,2),p=b[0],f=b[1],g=Object(i.useState)(""),w=Object(o.a)(g,2),y=w[0],S=w[1],A=Object(i.useState)(""),C=Object(o.a)(A,2),R=C[0],N=C[1],P=Object(i.useRef)(),_=Object(i.useRef)();Object(i.useEffect)((function(){a&&(f(null===a||void 0===a?void 0:a.rating),S(null===a||void 0===a?void 0:a.description))}),[]);return Object(B.jsxs)(l.a,{sx:I,container:!0,spacing:1,children:[Object(B.jsx)("h5",{children:"Leave a Review"}),Object(B.jsx)(x.a,{onSubmit:(null===a||void 0===a?void 0:a.id)?function(e){e.preventDefault(),P.current.validateAll(),(y.length>0||p>0)&&(N(""),T({rating:p,description:y,id:a.id}).then((function(){t("success","Successfully Updated Reviewed!")})).catch((function(e){t("error","Error Updating Review. Please Try Again Later!")})))}:function(e){var o,i,c,a;(e.preventDefault(),P.current.validateAll(),y.length>0||p>0)?(N(""),D({favourite_artist:d,rating:p,description:y,product_id:null===n||void 0===n||null===(o=n.transaction)||void 0===o||null===(i=o.product)||void 0===i?void 0:i.id,appointment_id:n.id,merchant_id:null===n||void 0===n||null===(c=n.transaction)||void 0===c||null===(a=c.product)||void 0===a?void 0:a.merchant_id}).then((function(){t("success","Successfully Reviewed!")})).catch((function(){t("error","Error Posting Review. Please Try Again Later!")}))):N("Description or rating must be completed")},ref:P,children:Object(B.jsxs)(v.a,{container:!0,children:[Object(B.jsxs)(v.a,{item:!0,sm:12,children:[Object(B.jsx)("label",{htmlFor:"rating",children:"Description"}),Object(B.jsx)(F,{setValue:f,value:p})]}),Object(B.jsx)(v.a,{item:!0,sm:12,children:Object(B.jsx)(h.a,{control:Object(B.jsx)(O.a,{icon:Object(B.jsx)(U.a,{}),checkedIcon:Object(B.jsx)(L.a,{}),onClick:function(){return u(!d)}}),label:"Favourite Artist?"})}),Object(B.jsxs)(v.a,{item:!0,sm:12,children:[Object(B.jsx)("label",{htmlFor:"description",children:"Description"}),Object(B.jsx)(k.a,{type:"text",placeholder:"Let Tadoo know how the experience was!",className:"form-control",name:"description",value:y,onChange:function(e){return S(e.target.value)}})]}),Object(B.jsxs)(v.a,{item:!0,xs:12,style:{textAlign:"right"},children:[Object(B.jsx)(m.a,{className:"btn btn-primary btn-block",ref:_,children:"Post"}),R&&Object(B.jsx)(v.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(B.jsx)("div",{className:"alert alert-danger",role:"alert",children:R})})]})]})})]})}var V=n(138),G=Object(s.a)(l.a)({display:"flex",marginBottom:"5px",border:"1px solid black"}),H=Object(s.a)(l.a)({backgroundColor:"white",padding:"10px",width:"100%",alignSelf:"center"}),M=Object(s.a)(l.a)({padding:"10px",width:"fit-content",textAlign:"right",border:"1px solid black"}),$=Object(s.a)(d.a)({display:"block",textAlign:"center",width:"100%",marginBottom:"5px"}),z=Object(s.a)(u.a)({position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"70%",backgroundColor:"white",border:"2px solid #000",padding:"10px",boxShadow:24,p:4}),q=Object(s.a)("img")({margin:"auto",width:"100%",height:"300px",objectFit:"contain"});function K(e){var t,n,c,a,s,l,d,u,v,h=e.appointment,O=e.updateToast,f=Object(i.useState)(!1),x=Object(o.a)(f,2),g=x[0],m=x[1],w=Object(i.useState)(!1),k=Object(o.a)(w,2),y=k[0],S=k[1],A=Object(r.g)(),C=(null===h||void 0===h?void 0:h.booked)?"Booked":"Not Booked",R=null===h||void 0===h||null===(t=h.transaction)||void 0===t?void 0:t.product,D=Object(V.a)(null===R||void 0===R?void 0:R.image),T=null===R||void 0===R?void 0:R.user,U=null===h||void 0===h?void 0:h.appointmentReview;return Object(B.jsxs)(G,{children:[Object(B.jsx)(p.a,{open:g,handleClose:function(){return m(!1)},children:Object(B.jsx)(J,{review:(null===U||void 0===U?void 0:U.id)?U:null,appointment:h,handleResult:function(e,t){O(e,t),m(!1)},setOpen:m})}),Object(B.jsx)(p.a,{open:y,handleClose:function(){return S(!1)},children:Object(B.jsxs)(z,{children:[Object(B.jsx)(q,{src:null===D||void 0===D?void 0:D.url}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Tattoo:"})," ".concat(null===h||void 0===h||null===(n=h.transaction)||void 0===n||null===(c=n.product)||void 0===c?void 0:c.name)]}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Deposit:"})," $".concat((null===h||void 0===h||null===(a=h.transaction)||void 0===a?void 0:a.amount)/100," CAD")]}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Purchase Date:"})," ".concat(Date(null===h||void 0===h||null===(s=h.transaction)||void 0===s?void 0:s.createdAt))]}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Rate:"})," $".concat(null===h||void 0===h||null===(l=h.transaction)||void 0===l||null===(d=l.product)||void 0===d?void 0:d.rate," per Hour")]}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Rate Last Updated:"})," ".concat(Date(null===h||void 0===h||null===(u=h.transaction)||void 0===u||null===(v=u.product)||void 0===v?void 0:v.updatedAt))]})]})}),Object(B.jsxs)(H,{children:[Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Status:"})," ",C]}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Tattoo:"})," ",null===R||void 0===R?void 0:R.name]}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:" Artist:"})," ","".concat(Object(b.a)(null===T||void 0===T?void 0:T.first_name)," ").concat(Object(b.a)(null===T||void 0===T?void 0:T.last_name))]}),Object(B.jsxs)(j.a,{children:[Object(B.jsx)("strong",{children:"Location:"})," ","".concat(Object(b.a)(null===T||void 0===T?void 0:T.city),", ").concat(null===T||void 0===T?void 0:T.province)]})]}),Object(B.jsxs)(M,{children:[Object(B.jsx)($,{variant:"contained",onClick:function(){return S(!0)},children:"View Order"}),Object(B.jsx)($,{variant:"contained",onClick:function(){return A.push("/profile/".concat(null===T||void 0===T?void 0:T.username))},children:"Contact Arist"}),((null===U||void 0===U?void 0:U.id)||(null===h||void 0===h?void 0:h.booked))&&Object(B.jsx)($,{variant:"contained",onClick:function(){return m(!0)},children:(null===U||void 0===U?void 0:U.id)?"Update Review":"Create Review"})]})]})}var Q=n(141);function W(){var e=Object(i.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],s=Object(i.useState)(!1),l=Object(o.a)(s,2),d=l[0],u=l[1],j=Object(i.useState)("success"),b=Object(o.a)(j,2),p=b[0],v=b[1],h=Object(i.useState)("default msg"),O=Object(o.a)(h,2),f=O[0],x=O[1],g=function(e,t){v(e),x(t),u(!0),a.a.getUserAppointments().then((function(e){r(e)})).catch((function(e){var t;console.log(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.data)}))};return Object(i.useEffect)((function(){a.a.getUserAppointments().then((function(e){r(e)})).catch((function(e){var t;console.log(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.data)}))}),[]),Object(B.jsxs)(c.a,{children:[Object(B.jsx)("h1",{children:" My Tattoo Appointments "}),n.length>=1?Object(B.jsx)(B.Fragment,{children:n.map((function(e){return Object(B.jsx)(K,{updateToast:g,appointment:e},null===e||void 0===e?void 0:e.id)}))}):Object(B.jsx)("p",{children:" No appointments "}),Object(B.jsx)(Q.a,{open:d,setOpen:u,severity:p,msg:f})]})}}}]);
//# sourceMappingURL=13.d83c0cf0.chunk.js.map