(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59eb40cc"],{"0b73":function(t,e,n){"use strict";var r=n("3e8a"),a=r["a"].auth();e["a"]=a},"0fd9":function(t,e,n){"use strict";var r=n("ade3"),a=n("5530"),i=(n("caad"),n("2532"),n("99af"),n("b64b"),n("ac1f"),n("5319"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("159b"),n("4b85"),n("2b0e")),s=n("d9f7"),o=n("80d2"),c=["sm","md","lg","xl"],u=["start","end","center"];function l(t,e){return c.reduce((function(n,r){return n[t+Object(o["F"])(r)]=e(),n}),{})}var d=function(t){return[].concat(u,["baseline","stretch"]).includes(t)},f=l("align",(function(){return{type:String,default:null,validator:d}})),v=function(t){return[].concat(u,["space-between","space-around"]).includes(t)},p=l("justify",(function(){return{type:String,default:null,validator:v}})),h=function(t){return[].concat(u,["space-between","space-around","stretch"]).includes(t)},b=l("alignContent",(function(){return{type:String,default:null,validator:h}})),g={align:Object.keys(f),justify:Object.keys(p),alignContent:Object.keys(b)},m={align:"align",justify:"justify",alignContent:"align-content"};function w(t,e,n){var r=m[t];if(null!=n){if(e){var a=e.replace(t,"");r+="-".concat(a)}return r+="-".concat(n),r.toLowerCase()}}var j=new Map;e["a"]=i["a"].extend({name:"v-row",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},f),{},{justify:{type:String,default:null,validator:v}},p),{},{alignContent:{type:String,default:null,validator:h}},b),render:function(t,e){var n=e.props,a=e.data,i=e.children,o="";for(var c in n)o+=String(n[c]);var u=j.get(o);return u||function(){var t,e;for(e in u=[],g)g[e].forEach((function(t){var r=n[t],a=w(e,t,r);a&&u.push(a)}));u.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r["a"])(t,"align-".concat(n.align),n.align),Object(r["a"])(t,"justify-".concat(n.justify),n.justify),Object(r["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),j.set(o,u)}(),t(n.tag,Object(s["a"])(a,{staticClass:"row",class:u}),i)}})},"20f6":function(t,e,n){},"445c":function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Something went wrong",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return console.error({title:t,message:e}),Swal.fire(t,e,"error")}function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Swal.fire(t,e,"success")}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Data has been saved";return Swal.fire({position:"top-end",icon:"success",title:t,showConfirmButton:!1,timer:1500})}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return console.warn({title:t,message:e}),Swal.fire(t,e,"warning")}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Confirm it first!",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Are you sure?",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return Swal.fire({icon:"warning",text:e,title:t,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Confirm",allowOutsideClick:!1}).then((function(t){t.isConfirmed?(n&&n(),console.log("confirmed")):console.log("canceled")}))}n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"d",(function(){return i})),n.d(e,"e",(function(){return s})),n.d(e,"a",(function(){return o}))},"44f1":function(t,e,n){},"4a2c":function(t,e,n){"use strict";n("44f1")},"4b85":function(t,e,n){},"4bd4":function(t,e,n){"use strict";var r=n("5530"),a=(n("caad"),n("2532"),n("07ac"),n("4de4"),n("159b"),n("7db0"),n("58df")),i=n("7e2b"),s=n("3206");e["a"]=Object(a["a"])(i["a"],Object(s["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,n=function(t){return t.$watch("hasError",(function(n){e.$set(e.errorBag,t._uid,n)}),{immediate:!0})},r={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(r.valid=n(t)))})):r.valid=n(t),r},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var n=this.watchers.find((function(t){return t._uid===e._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(r["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"4ff6":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return a}));var r=[function(t){return!!t||"This field is required"}],a=[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+\..+/.test(t)||"E-mail must be valid"}]},"62ad":function(t,e,n){"use strict";var r=n("ade3"),a=n("5530"),i=(n("a9e3"),n("b64b"),n("ac1f"),n("5319"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("caad"),n("159b"),n("2ca0"),n("4b85"),n("2b0e")),s=n("d9f7"),o=n("80d2"),c=["sm","md","lg","xl"],u=function(){return c.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{})}(),l=function(){return c.reduce((function(t,e){return t["offset"+Object(o["F"])(e)]={type:[String,Number],default:null},t}),{})}(),d=function(){return c.reduce((function(t,e){return t["order"+Object(o["F"])(e)]={type:[String,Number],default:null},t}),{})}(),f={col:Object.keys(u),offset:Object.keys(l),order:Object.keys(d)};function v(t,e,n){var r=t;if(null!=n&&!1!==n){if(e){var a=e.replace(t,"");r+="-".concat(a)}return"col"!==t||""!==n&&!0!==n?(r+="-".concat(n),r.toLowerCase()):r.toLowerCase()}}var p=new Map;e["a"]=i["a"].extend({name:"v-col",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])(Object(a["a"])({cols:{type:[Boolean,String,Number],default:!1}},u),{},{offset:{type:[String,Number],default:null}},l),{},{order:{type:[String,Number],default:null}},d),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var n=e.props,a=e.data,i=e.children,o=(e.parent,"");for(var c in n)o+=String(n[c]);var u=p.get(o);return u||function(){var t,e;for(e in u=[],f)f[e].forEach((function(t){var r=n[t],a=v(e,t,r);a&&u.push(a)}));var a=u.some((function(t){return t.startsWith("col-")}));u.push((t={col:!a||!n.cols},Object(r["a"])(t,"col-".concat(n.cols),n.cols),Object(r["a"])(t,"offset-".concat(n.offset),n.offset),Object(r["a"])(t,"order-".concat(n.order),n.order),Object(r["a"])(t,"align-self-".concat(n.alignSelf),n.alignSelf),t)),p.set(o,u)}(),t(n.tag,Object(s["a"])(a,{class:u}),i)}})},"8ce9":function(t,e,n){},"9d26":function(t,e,n){"use strict";var r=n("132d");e["a"]=r["a"]},a523:function(t,e,n){"use strict";n("4de4"),n("b64b"),n("2ca0"),n("99af"),n("20f6"),n("4b85");var r=n("e8f2"),a=n("d9f7");e["a"]=Object(r["a"])("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,r=e.props,i=e.data,s=e.children,o=i.attrs;return o&&(i.attrs={},n=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),r.id&&(i.domProps=i.domProps||{},i.domProps.id=r.id),t(r.tag,Object(a["a"])(i,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(n||[])}),s)}})},a55b:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-row",{staticClass:"d-flex"},[n("v-col",{staticClass:"deep-purple",staticStyle:{height:"105vh"},attrs:{cols:"4",lg:"3"}},[n("router-link",{staticClass:"white--text pa-5 d-block",staticStyle:{"font-weight":"600","font-size":"1.2rem"},attrs:{to:"/"}},[t._v("WorkApp ")]),n("div",{staticClass:"d-flex flex- align-center pb-10",staticStyle:{height:"100%"}},[n("div",{staticClass:"\n            white--text\n            text-center\n            d-flex\n            flex-column\n            justify-center\n            align-center\n          ",staticStyle:{width:"100%"}},[n("div",{staticClass:"numberTitle",staticStyle:{"font-size":"3rem","font-weight":"600"}},[t._v(" 99% ")]),n("p",{staticClass:"px-2"},[t._v(" time saved and guaranteed better "),n("br"),t._v(" experience while working. ")])])])],1),n("v-col",{staticClass:"d-flex align-center justify-start",attrs:{cols:"8",lg:"9"}},[n("v-container",{staticClass:"mb-15"},[n("v-card",{attrs:{flat:"","max-width":"660px"}},[n("v-form",{on:{submit:function(e){return e.preventDefault(),t.signin.apply(null,arguments)}}},[n("div",{staticClass:"font-weight-bold mb-",staticStyle:{"font-size":"1.8rem"}},[t._v(" Login to your "),n("br"),t._v(" WFH account. ")]),n("v-text-field",{staticClass:"mb-4",attrs:{label:"Email",rules:t.emailRules},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),n("v-text-field",{attrs:{label:"Password",type:"password",rules:t.requiredRules},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),n("v-btn",{staticClass:"mt-4",attrs:{loading:t.loading,disabled:""===this.email.trim()||""===this.password,color:"deep-purple",type:"submit",dark:""}},[t._v("Continue ")]),n("v-divider",{staticClass:"ma-5"}),n("p",[t._v(" Issues logging in? "),n("a",{staticClass:"deep-purple--text",attrs:{href:"#"},on:{click:function(e){return t.reset()}}},[t._v("reset password "),n("i",{staticClass:"uil uil-unlock"})])])],1)],1)],1)],1)],1)],1)},a=[],i=n("1da1"),s=n("5530"),o=(n("498a"),n("96cf"),n("0b73")),c=n("445c"),u=n("4ff6"),l=n("2f62"),d=n("edfc"),f=n("3e8a"),v={data:function(){return{email:"",password:"",emailRules:u["a"],requiredRules:u["b"],disabled:!1}},computed:Object(l["c"])({user:"getUser",mailed:"getMailed",loading:"getLoading"}),created:function(){this.setRoles(),this.setWorkPositions(),this.setDepartments()},methods:Object(s["a"])(Object(s["a"])({},Object(l["b"])(["setUser","setMailVerified","setRoles","setDepartments","setWorkPositions","setLoading"])),{},{reset:function(){return Object(i["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Swal.fire({title:"Input email address",input:"email",inputLabel:"Your email address",inputPlaceholder:"Enter your email address"});case 2:e=t.sent,n=e.value,n&&o["a"].sendPasswordResetEmail(n).then((function(){Object(c["d"])("Email sent","Check your email : ".concat(n),"success")})).catch((function(t){Swal.fire("Error",t.message,"error")}));case 5:case"end":return t.stop()}}),t)})))()},signin:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.setLoading(),e.prev=1,e.next=4,o["a"].signInWithEmailAndPassword(t.email.trim(),t.password);case 4:return n=e.sent,e.next=7,d["a"].collection("users").doc(n.user.uid).get().then((function(t){var e=t.get("avatar")||"https://joeschmoe.io/api/v1/"+t.get("name");return Object(s["a"])(Object(s["a"])({},t.data()),{},{email:n.user.email,id:n.user.uid,avatar:e})}));case 7:if(r=e.sent,n.user.emailVerified){e.next=16;break}if(t.mailed){e.next=12;break}return e.next=12,n.user.sendEmailVerification().then((function(){return t.setMailVerified()}));case 12:Object(c["e"])("Please check your email for verification."),t.setLoading(),e.next=18;break;case 16:a={timestamp:f["a"].firestore.FieldValue.serverTimestamp(),userId:n.user.uid,type:"in"},d["a"].collection("logs").add(a).then(Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.setUser(r),Object(c["d"])("Login successful!"),t.setLoading(),e.next=5,t.$router.push({name:"home"});case 5:case"end":return e.stop()}}),e)}))));case 18:e.next=25;break;case 20:e.prev=20,e.t0=e["catch"](1),console.log(e.t0),t.setLoading(),Object(c["b"])("User credentials not found!");case 25:case"end":return e.stop()}}),e,null,[[1,20]])})))()}})},p=v,h=(n("4a2c"),n("0c7c")),b=n("6544"),g=n.n(b),m=n("8336"),w=n("b0af"),j=n("62ad"),y=n("a523"),O=n("ce7e"),C=n("4bd4"),x=n("0fd9"),S=n("8654"),k=Object(h["a"])(p,r,a,!1,null,"3f1c7b54",null);e["default"]=k.exports;g()(k,{VBtn:m["a"],VCard:w["a"],VCol:j["a"],VContainer:y["a"],VDivider:O["a"],VForm:C["a"],VRow:x["a"],VTextField:S["a"]})},ce7e:function(t,e,n){"use strict";var r=n("5530"),a=(n("8ce9"),n("7560"));e["a"]=a["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(r["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(r["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},dc22:function(t,e,n){"use strict";function r(t,e){var n=e.value,r=e.options||{passive:!0};window.addEventListener("resize",n,r),t._onResize={callback:n,options:r},e.modifiers&&e.modifiers.quiet||n()}function a(t){if(t._onResize){var e=t._onResize,n=e.callback,r=e.options;window.removeEventListener("resize",n,r),delete t._onResize}}var i={inserted:r,unbind:a};e["a"]=i},e8f2:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("498a"),n("99af"),n("4de4"),n("b64b"),n("2ca0"),n("a15b");var r=n("2b0e");function a(t){return r["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,n){var r=n.props,a=n.data,i=n.children;a.staticClass="".concat(t," ").concat(a.staticClass||"").trim();var s=a.attrs;if(s){a.attrs={};var o=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(a.staticClass+=" ".concat(o.join(" ")))}return r.id&&(a.domProps=a.domProps||{},a.domProps.id=r.id),e(r.tag,a,i)}})}}}]);
//# sourceMappingURL=chunk-59eb40cc.cc96ead4.js.map