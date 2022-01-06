(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1021b002"],{"0051":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("manager-base",[i("component-profile")],1)},a=[],n=i("90ed"),r=i("14eb"),o={components:{ComponentProfile:r["a"],ManagerBase:n["a"]},name:"ManagerProfile"},c=o,l=i("0c7c"),u=Object(l["a"])(c,s,a,!1,null,null,null);e["a"]=u.exports},"0d57":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.user?i("div",[i("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-system-bar"),i("v-list",[i("v-list-item",[i("v-list-item-avatar",[t.user.avatar?i("v-img",{attrs:{src:t.user.avatar}}):i("v-img",{attrs:{src:"https://joeschmoe.io/api/v1/"+t.user.name}})],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-content",[i("v-list-item-subtitle"),i("v-list-item-title",{staticClass:"text-h6"}),i("v-list-item-subtitle",[t._v(t._s(t.user.email))]),i("span",{staticClass:"mt-1"},[t._v(" "+t._s(t.user.role_title)+" ")])],1)],1)],1),i("v-divider"),i("v-list",{attrs:{nav:"",dense:""}},[i("v-list-item-group",{attrs:{color:"primary"}},[t._l(t.items,(function(e,s){return i("v-list-item",{key:s,attrs:{exact:"",to:e.to}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:t._s(e.icon)}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)})),i("v-list-group",{attrs:{value:t.isUnderSetup(),"prepend-icon":"uil-setting"},scopedSlots:t._u([{key:"activator",fn:function(){return[i("v-list-item-title",[t._v("Setup")])]},proxy:!0}],null,!1,2223785952)},t._l(t.setups,(function(e,s){var a=e[0],n=e[1],r=e[2];return i("v-list-item",{key:s,attrs:{link:"",to:r}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:t._s(n)}})],1),i("v-list-item-title",{domProps:{textContent:t._s(a)}})],1)})),1),i("v-list-item",{on:{click:t.signout}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-logout")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("Sign out")])],1)],1)],2)],1)],1),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),i("v-toolbar-title",[t._t("head",(function(){return[t._v("Administrator Access")]}))],2)],1),i("v-main",[i("div",{staticClass:"pa-4"},[t._t("default",(function(){return[t._v("There is nothing to see here!")]}))],2)])],1):t._e()},a=[],n=i("1da1"),r=i("5530"),o=(i("96cf"),i("ac1f"),i("5319"),i("b0c0"),i("caad"),i("0b73")),c=i("2f62"),l=i("3e8a"),u=i("edfc"),d={name:"AdminBase",data:function(){return{drawer:null,items:[{text:"Home",icon:"uil-estate",to:{name:"home"}},{text:"Users",icon:"uil-users-alt",to:{name:"users"}},{text:"Profile",icon:"uil-user",to:{name:"profile"}}],setups:[["Roles","uil-house-user","roles"],["Work Positions","uil-briefcase-alt","work-positions"],["Departments","uil-channel","departments"]]}},methods:Object(r["a"])(Object(r["a"])({},Object(c["b"])(["setUser","setMailVerified","setWorkPositions","setUsers","setRoles","setDepartments","setLoading"])),{},{signout:function(){var t=this;this.setLoading();var e={timestamp:l["a"].firestore.FieldValue.serverTimestamp(),userId:this.user.id,type:"out"};u["a"].collection("logs").add(e).then(Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.setLoading(),e.next=3,o["a"].signOut();case 3:return t.setUser(null),e.next=6,t.$router.replace({name:"login"});case 6:case"end":return e.stop()}}),e)}))))},isUnderSetup:function(){var t=this.$route.name;return["work-positions","departments","roles"].includes(t)}}),computed:Object(c["c"])({user:"getUser",work_positions:"getWorkPositions"}),created:function(){this.setRoles(),this.setDepartments(),this.setWorkPositions(),this.setUsers()}},m=d,v=i("0c7c"),f=i("6544"),p=i.n(f),h=i("40dc"),g=i("5bc1"),b=i("ce7e"),_=i("132d"),y=i("adda"),w=i("8860"),x=i("56b0"),S=i("da13"),O=i("8270"),V=i("5d23"),C=i("1baa"),j=i("34c3"),k=i("f6c4"),I=i("f774"),P=i("afd9"),L=i("2a7f"),z=Object(v["a"])(m,s,a,!1,null,null,null);e["a"]=z.exports;p()(z,{VAppBar:h["a"],VAppBarNavIcon:g["a"],VDivider:b["a"],VIcon:_["a"],VImg:y["a"],VList:w["a"],VListGroup:x["a"],VListItem:S["a"],VListItemAvatar:O["a"],VListItemContent:V["a"],VListItemGroup:C["a"],VListItemIcon:j["a"],VListItemSubtitle:V["b"],VListItemTitle:V["c"],VMain:k["a"],VNavigationDrawer:I["a"],VSystemBar:P["a"],VToolbarTitle:L["b"]})},"0fd9":function(t,e,i){"use strict";var s=i("ade3"),a=i("5530"),n=(i("caad"),i("2532"),i("99af"),i("b64b"),i("ac1f"),i("5319"),i("4ec9"),i("d3b7"),i("3ca3"),i("ddb0"),i("159b"),i("4b85"),i("2b0e")),r=i("d9f7"),o=i("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function u(t,e){return c.reduce((function(i,s){return i[t+Object(o["F"])(s)]=e(),i}),{})}var d=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},m=u("align",(function(){return{type:String,default:null,validator:d}})),v=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},f=u("justify",(function(){return{type:String,default:null,validator:v}})),p=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},h=u("alignContent",(function(){return{type:String,default:null,validator:p}})),g={align:Object.keys(m),justify:Object.keys(f),alignContent:Object.keys(h)},b={align:"align",justify:"justify",alignContent:"align-content"};function _(t,e,i){var s=b[t];if(null!=i){if(e){var a=e.replace(t,"");s+="-".concat(a)}return s+="-".concat(i),s.toLowerCase()}}var y=new Map;e["a"]=n["a"].extend({name:"v-row",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},m),{},{justify:{type:String,default:null,validator:v}},f),{},{alignContent:{type:String,default:null,validator:p}},h),render:function(t,e){var i=e.props,a=e.data,n=e.children,o="";for(var c in i)o+=String(i[c]);var l=y.get(o);return l||function(){var t,e;for(e in l=[],g)g[e].forEach((function(t){var s=i[t],a=_(e,t,s);a&&l.push(a)}));l.push((t={"no-gutters":i.noGutters,"row--dense":i.dense},Object(s["a"])(t,"align-".concat(i.align),i.align),Object(s["a"])(t,"justify-".concat(i.justify),i.justify),Object(s["a"])(t,"align-content-".concat(i.alignContent),i.alignContent),t)),y.set(o,l)}(),t(i.tag,Object(r["a"])(a,{staticClass:"row",class:l}),n)}})},"14eb":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-row",[i("v-col",{attrs:{cols:"12",md:"4"}},[i("div",{staticClass:"d-flex flex-column pl-md-4 align-center align-md-start"},[i("v-avatar",{attrs:{color:"success",size:"228"},on:{click:function(e){t.dialog=!0}}},[i("img",{attrs:{src:t.user.avatar,alt:"Profile"}})]),i("div",{staticClass:"d-flex flex-column mt-8"},[i("div",{staticStyle:{"font-size":"1.5rem"}},[t._v(t._s(t.user.name))]),i("div",{staticStyle:{"font-size":"0.89rem"}},[t._v(t._s(t.user.email))])]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("ROLE")])]),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.role.toUpperCase()))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("EMPLOYEE ID")]),i("v-icon",{attrs:{color:"success",small:"",right:""}},[t._v("uil-postcard")])],1),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.count))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("DEPARTMENT")])]),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.department))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("WORK POSITION")]),i("v-icon",{attrs:{color:"success",small:"",right:""}},[t._v("uil-briefcase")])],1),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.work))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("LOCATION")]),i("v-icon",{attrs:{color:"success",small:""}},[t._v("uil-map-marker-info")])],1),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.address))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("CONTACT #")])]),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.contact_number))])],1),i("v-divider",{staticClass:"my-6"})],1),i("v-col",{attrs:{cols:"12",md:"8"}},[i("div",{staticClass:"pl-md-4"},[i("div",{staticClass:"success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("ABOUT ME")])]),i("div",{staticClass:"mt-2",staticStyle:{"font-size":"0.8rem"}},[t._v(" "+t._s(t.user.description||"No description yet.")+" ")]),i("v-divider",{staticClass:"my-6"}),i("div",{staticClass:"primary--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("UPDATE PROFILE")]),i("v-icon",{attrs:{right:"",color:"primary",small:""}},[t._v("uil-user")])],1),i("div",{staticClass:"mt-3"},[i("v-text-field",{attrs:{label:"Location"},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}}),i("v-text-field",{attrs:{type:"number",label:"Contact Number"},model:{value:t.form.contact_number,callback:function(e){t.$set(t.form,"contact_number",e)},expression:"form.contact_number"}}),i("v-textarea",{attrs:{label:"Description",rows:"2"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),i("v-btn",{attrs:{color:"success"},on:{click:t.save}},[t._v("save")]),i("v-divider",{staticClass:"my-6"}),i("div",{staticClass:"primary--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("UPDATE PASSWORD")]),i("v-icon",{attrs:{right:"",color:"primary"}},[t._v("uil-keyhole-circle")])],1),i("v-text-field",{attrs:{type:"password",label:"Current Password"},model:{value:t.passForm.current_password,callback:function(e){t.$set(t.passForm,"current_password",e)},expression:"passForm.current_password"}}),i("v-text-field",{attrs:{type:"password",label:"New Password"},model:{value:t.passForm.newPassword,callback:function(e){t.$set(t.passForm,"newPassword",e)},expression:"passForm.newPassword"}}),i("v-text-field",{attrs:{type:"password",label:"Confirm Password"},model:{value:t.passForm.confirmPassword,callback:function(e){t.$set(t.passForm,"confirmPassword",e)},expression:"passForm.confirmPassword"}}),i("v-btn",{attrs:{loading:t.loading,color:"primary"},on:{click:t.savePass}},[t._v("save "),i("v-icon",{attrs:{small:"",right:""}},[t._v("uil-lock")])],1)],1)],1)])],1),i("v-dialog",{attrs:{"max-width":"400px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",[t._v("Change Profile")]),i("v-card-text",[i("v-file-input",{attrs:{accept:"image/png, image/jpeg, image/bmp","prepend-icon":"uil-image",label:"Upload profile picture"},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}})],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"error",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Close ")]),i("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.saveProfile}},[t._v(" Continue ")])],1)],1)],1)],1)},a=[],n=i("5530"),r=(i("a4d3"),i("e01a"),i("b0c0"),i("498a"),i("99af"),i("2f62")),o=i("445c"),c=i("3e8a"),l=i("edfc"),u=i("0b73"),d={name:"ComponentProfile",computed:Object(r["c"])({user:"getUser",loading:"getLoading"}),data:function(){return{form:{address:"",contact_number:"",description:""},dialog:!1,passForm:{current_password:"",newPassword:"",confirmPassword:""},file:null}},created:function(){this.form.address=this.user.address,this.form.contact_number=this.user.contact_number,this.form.description=this.user.description||""},methods:Object(n["a"])(Object(n["a"])({},Object(r["b"])(["setLoading"])),{},{saveProfile:function(){var t=this,e=this.file,i=e.name;if(""===i.trim())return Object(o["e"])("Invalid Image!","Please upload a valid image.");this.setLoading(!0),c["a"].storage().ref().child("users/".concat(this.user.id,"/").concat(i)).put(e).then((function(e){e.ref.getDownloadURL().then((function(e){l["a"].collection("users").doc(t.user.id).update({avatar:e}).then((function(e){t.setLoading(!1),t.dialog=!1,Object(o["c"])("Alright!","Profile picture updated successfully, re-login to apply the changes.")})).catch((function(e){t.setLoading(!1),Object(o["b"])("Failed Updating!",e.message)}))})).catch((function(e){t.setLoading(!1),Object(o["b"])("Failed On Fetch!",e.message)}))})).catch((function(e){t.setLoading(!1),Object(o["b"])("Failed Uploading!",e.message)}))},savePass:function(){var t=this;this.passForm.newPassword.trim()&&this.passForm.current_password.trim()&&this.passForm.newPassword===this.passForm.confirmPassword?(this.setLoading(!0),u["a"].signInWithEmailAndPassword(this.user.email,this.passForm.current_password).then((function(e){e.user.updatePassword(t.passForm.newPassword).then((function(e){t.setLoading(!1),Object(o["c"])("Alright!","Password updated successfully!")})).catch((function(e){t.setLoading(!1),Object(o["b"])("Failed!",e.message)}))})).catch((function(e){t.setLoading(!1),Object(o["b"])("Invalid Credential!",e.message)}))):Object(o["e"])("Invalid Data!","Please fill out the required fields. Make sure the new password is the same as confirmed.")},save:function(){return this.form.address.trim()?this.form.contact_number.trim()?void l["a"].collection("users").doc(this.user.id).update(this.form).then((function(t){Object(o["c"])("Alright!","Please re-login your account to apply the changes.")})):Object(o["e"])("Invalid Data","Contact Number field is required."):Object(o["e"])("Invalid Data","Address field is required.")}})},m=d,v=i("0c7c"),f=i("6544"),p=i.n(f),h=i("8212"),g=i("8336"),b=i("b0af"),_=i("99d9"),y=i("62ad"),w=i("169a"),x=i("ce7e"),S=i("23a7"),O=i("132d"),V=i("0fd9"),C=i("2fa4"),j=i("8654"),k=i("a844"),I=Object(v["a"])(m,s,a,!1,null,"be7accd0",null);e["a"]=I.exports;p()(I,{VAvatar:h["a"],VBtn:g["a"],VCard:b["a"],VCardActions:_["a"],VCardText:_["c"],VCardTitle:_["d"],VCol:y["a"],VDialog:w["a"],VDivider:x["a"],VFileInput:S["a"],VIcon:O["a"],VRow:V["a"],VSpacer:C["a"],VTextField:j["a"],VTextarea:k["a"]})},1681:function(t,e,i){},"23a7":function(t,e,i){"use strict";var s=i("2909"),a=i("5530"),n=i("53ca"),r=(i("a9e3"),i("caad"),i("d81d"),i("b0c0"),i("99af"),i("a434"),i("159b"),i("fb6a"),i("5803"),i("2677")),o=i("cc20"),c=i("80d2"),l=i("d9bd"),u=i("d9f7");e["a"]=r["a"].extend({name:"v-file-input",model:{prop:"value",event:"change"},props:{chips:Boolean,clearable:{type:Boolean,default:!0},counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,multiple:Boolean,placeholder:String,prependIcon:{type:String,default:"$file"},readonly:{type:Boolean,default:!1},showSize:{type:[Boolean,Number],default:!1,validator:function(t){return"boolean"===typeof t||[1e3,1024].includes(t)}},smallChips:Boolean,truncateLength:{type:[Number,String],default:22},type:{type:String,default:"file"},value:{default:void 0,validator:function(t){return Object(c["G"])(t).every((function(t){return null!=t&&"object"===Object(n["a"])(t)}))}}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-file-input":!0})},computedCounterValue:function(){var t=this.multiple&&this.lazyValue?this.lazyValue.length:this.lazyValue instanceof File?1:0;if(!this.showSize)return this.$vuetify.lang.t(this.counterString,t);var e=this.internalArrayValue.reduce((function(t,e){var i=e.size,s=void 0===i?0:i;return t+s}),0);return this.$vuetify.lang.t(this.counterSizeString,t,Object(c["w"])(e,1024===this.base))},internalArrayValue:function(){return Object(c["G"])(this.internalValue)},internalValue:{get:function(){return this.lazyValue},set:function(t){this.lazyValue=t,this.$emit("change",this.lazyValue)}},isDirty:function(){return this.internalArrayValue.length>0},isLabelActive:function(){return this.isDirty},text:function(){var t=this;return this.isDirty||!this.persistentPlaceholder&&!this.isFocused&&this.hasLabel?this.internalArrayValue.map((function(e){var i=e.name,s=void 0===i?"":i,a=e.size,n=void 0===a?0:a,r=t.truncateText(s);return t.showSize?"".concat(r," (").concat(Object(c["w"])(n,1024===t.base),")"):r})):[this.placeholder]},base:function(){return"boolean"!==typeof this.showSize?this.showSize:void 0},hasChips:function(){return this.chips||this.smallChips}},watch:{readonly:{handler:function(t){!0===t&&Object(l["b"])("readonly is not supported on <v-file-input>",this)},immediate:!0},value:function(t){var e=this.multiple?t:t?[t]:[];Object(c["j"])(e,this.$refs.input.files)||(this.$refs.input.value="")}},methods:{clearableCallback:function(){this.internalValue=this.multiple?[]:null,this.$refs.input.value=""},genChips:function(){var t=this;return this.isDirty?this.text.map((function(e,i){return t.$createElement(o["a"],{props:{small:t.smallChips},on:{"click:close":function(){var e=t.internalValue;e.splice(i,1),t.internalValue=e}}},[e])})):[]},genControl:function(){var t=r["a"].options.methods.genControl.call(this);return this.hideInput&&(t.data.style=Object(u["c"])(t.data.style,{display:"none"})),t},genInput:function(){var t=r["a"].options.methods.genInput.call(this);return t.data.attrs.multiple=this.multiple,delete t.data.domProps.value,delete t.data.on.input,t.data.on.change=this.onInput,[this.genSelections(),t]},genPrependSlot:function(){var t=this;if(!this.prependIcon)return null;var e=this.genIcon("prepend",(function(){t.$refs.input.click()}));return this.genSlot("prepend","outer",[e])},genSelectionText:function(){var t=this.text.length;return t<2?this.text:this.showSize&&!this.counter?[this.computedCounterValue]:[this.$vuetify.lang.t(this.counterString,t)]},genSelections:function(){var t=this,e=[];return this.isDirty&&this.$scopedSlots.selection?this.internalArrayValue.forEach((function(i,s){t.$scopedSlots.selection&&e.push(t.$scopedSlots.selection({text:t.text[s],file:i,index:s}))})):e.push(this.hasChips&&this.isDirty?this.genChips():this.genSelectionText()),this.$createElement("div",{staticClass:"v-file-input__text",class:{"v-file-input__text--placeholder":this.placeholder&&!this.isDirty,"v-file-input__text--chips":this.hasChips&&!this.$scopedSlots.selection}},e)},genTextFieldSlot:function(){var t=this,e=r["a"].options.methods.genTextFieldSlot.call(this);return e.data.on=Object(a["a"])(Object(a["a"])({},e.data.on||{}),{},{click:function(){return t.$refs.input.click()}}),e},onInput:function(t){var e=Object(s["a"])(t.target.files||[]);this.internalValue=this.multiple?e:e[0],this.initialValue=this.internalValue},onKeyDown:function(t){this.$emit("keydown",t)},truncateText:function(t){if(t.length<Number(this.truncateLength))return t;var e=Math.floor((Number(this.truncateLength)-1)/2);return"".concat(t.slice(0,e),"…").concat(t.slice(t.length-e))}}})},2677:function(t,e,i){"use strict";var s=i("8654");e["a"]=s["a"]},"4b85":function(t,e,i){},5803:function(t,e,i){},6082:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-system-bar"),i("v-list",[i("v-list-item",[i("v-list-item-avatar",[t.user.avatar?i("v-img",{attrs:{src:t.user.avatar}}):i("v-img",{attrs:{src:"https://joeschmoe.io/api/v1/"+t.user.name}})],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-content",[i("v-list-item-subtitle",[t._v(t._s(t.work_positions.find((function(e){return e.id===t.user.work_position_id})).title))]),i("v-list-item-title",{staticClass:"text-h6"},[t._v(" "+t._s(t.user.name)+" ")]),i("v-list-item-subtitle",[t._v(t._s(t.user.email))]),i("span",{staticClass:"mt-1"},[t._v(" "+t._s(t.user.role_title)+" ")])],1)],1)],1),i("v-divider"),i("v-list",{attrs:{nav:"",dense:""}},[i("v-list-item-group",{attrs:{color:"primary"},model:{value:t.selectedItem,callback:function(e){t.selectedItem=e},expression:"selectedItem"}},[t._l(t.items,(function(e,s){return i("v-list-item",{key:s,attrs:{link:"",to:e.to}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:t._s(e.icon)}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)})),i("v-list-item",{on:{click:t.signout}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-logout")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("Sign out")])],1)],1)],2)],1)],1),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),i("v-toolbar-title",[t._v("Employee Base")])],1),i("v-main",[i("div",{staticClass:"pa-4"},[t._t("default",(function(){return[t._v("There is nothing to see here!")]}))],2)])],1)},a=[],n=i("1da1"),r=i("5530"),o=(i("96cf"),i("ac1f"),i("5319"),i("0b73")),c=i("2f62"),l=i("3e8a"),u=i("edfc"),d={name:"EmployeeBase",data:function(){return{drawer:null,selectedItem:0,items:[{text:"Issues",icon:"uil-exclamation-octagon",to:{name:"issue"}},{text:"Tasks",icon:"uil-clipboard-notes",to:{name:"tasks"}},{text:"Meeting",icon:"uil-video",to:{name:"call"}},{text:"Profile",icon:"uil-user",to:{name:"profile"}}]}},created:function(){this.setWorkPositions()},computed:Object(c["c"])({user:"getUser",work_positions:"getWorkPositions"}),methods:Object(r["a"])(Object(r["a"])({},Object(c["b"])(["setUser","setMailVerified","setWorkPositions","setLoading"])),{},{signout:function(){var t=this;this.setLoading();var e={timestamp:l["a"].firestore.FieldValue.serverTimestamp(),userId:this.user.id,type:"out"};u["a"].collection("logs").add(e).then(Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.setLoading(),e.next=3,o["a"].signOut();case 3:return t.setUser(null),e.next=6,t.$router.replace({name:"login"});case 6:case"end":return e.stop()}}),e)}))))}})},m=d,v=i("0c7c"),f=i("6544"),p=i.n(f),h=i("40dc"),g=i("5bc1"),b=i("ce7e"),_=i("132d"),y=i("adda"),w=i("8860"),x=i("da13"),S=i("8270"),O=i("5d23"),V=i("1baa"),C=i("34c3"),j=i("f6c4"),k=i("f774"),I=i("afd9"),P=i("2a7f"),L=Object(v["a"])(m,s,a,!1,null,null,null);e["a"]=L.exports;p()(L,{VAppBar:h["a"],VAppBarNavIcon:g["a"],VDivider:b["a"],VIcon:_["a"],VImg:y["a"],VList:w["a"],VListItem:x["a"],VListItemAvatar:S["a"],VListItemContent:O["a"],VListItemGroup:V["a"],VListItemIcon:C["a"],VListItemSubtitle:O["b"],VListItemTitle:O["c"],VMain:j["a"],VNavigationDrawer:k["a"],VSystemBar:I["a"],VToolbarTitle:P["b"]})},"62ad":function(t,e,i){"use strict";var s=i("ade3"),a=i("5530"),n=(i("a9e3"),i("b64b"),i("ac1f"),i("5319"),i("4ec9"),i("d3b7"),i("3ca3"),i("ddb0"),i("caad"),i("159b"),i("2ca0"),i("4b85"),i("2b0e")),r=i("d9f7"),o=i("80d2"),c=["sm","md","lg","xl"],l=function(){return c.reduce((function(t,e){return t[e]={type:[Boolean,String,Number],default:!1},t}),{})}(),u=function(){return c.reduce((function(t,e){return t["offset"+Object(o["F"])(e)]={type:[String,Number],default:null},t}),{})}(),d=function(){return c.reduce((function(t,e){return t["order"+Object(o["F"])(e)]={type:[String,Number],default:null},t}),{})}(),m={col:Object.keys(l),offset:Object.keys(u),order:Object.keys(d)};function v(t,e,i){var s=t;if(null!=i&&!1!==i){if(e){var a=e.replace(t,"");s+="-".concat(a)}return"col"!==t||""!==i&&!0!==i?(s+="-".concat(i),s.toLowerCase()):s.toLowerCase()}}var f=new Map;e["a"]=n["a"].extend({name:"v-col",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])(Object(a["a"])({cols:{type:[Boolean,String,Number],default:!1}},l),{},{offset:{type:[String,Number],default:null}},u),{},{order:{type:[String,Number],default:null}},d),{},{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,e){var i=e.props,a=e.data,n=e.children,o=(e.parent,"");for(var c in i)o+=String(i[c]);var l=f.get(o);return l||function(){var t,e;for(e in l=[],m)m[e].forEach((function(t){var s=i[t],a=v(e,t,s);a&&l.push(a)}));var a=l.some((function(t){return t.startsWith("col-")}));l.push((t={col:!a||!i.cols},Object(s["a"])(t,"col-".concat(i.cols),i.cols),Object(s["a"])(t,"offset-".concat(i.offset),i.offset),Object(s["a"])(t,"order-".concat(i.order),i.order),Object(s["a"])(t,"align-self-".concat(i.alignSelf),i.alignSelf),t)),f.set(o,l)}(),t(i.tag,Object(r["a"])(a,{class:l}),n)}})},"6e79":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("employee-base",[i("component-profile")],1)},a=[],n=i("0d57"),r=i("14eb"),o=i("6082"),c={name:"EmployeeProfile",components:{EmployeeBase:o["a"],ComponentProfile:r["a"],AdminBase:n["a"]}},l=c,u=i("0c7c"),d=Object(u["a"])(l,s,a,!1,null,"b345a1d0",null);e["a"]=d.exports},"90ed":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.user?i("div",[i("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-system-bar"),i("v-list",[i("v-list-item",[i("v-list-item-avatar",[t.user.avatar?i("v-img",{attrs:{src:t.user.avatar}}):i("v-img",{attrs:{src:"https://joeschmoe.io/api/v1/"+t.user.name}})],1)],1),i("v-list-item",{attrs:{link:""}},[i("v-list-item-content",[i("v-list-item-subtitle",[t._v(t._s(t.work_positions.find((function(e){return e.id===t.user.work_position_id})).title)+" ")]),i("v-list-item-title",{staticClass:"text-h6"},[t._v(" "+t._s(t.user.name)+" ")]),i("v-list-item-subtitle",[t._v(t._s(t.user.email))]),i("span",{staticClass:"mt-1"},[t._v(" "+t._s(t.user.role_title)+" ")])],1)],1)],1),i("v-divider"),i("v-list",{attrs:{nav:"",dense:""}},[i("v-list-item-group",{attrs:{color:"primary"}},[t._l(t.items,(function(e,s){return i("v-list-item",{key:s,attrs:{exact:"",to:e.to}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:t._s(e.icon)}})],1),i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)})),i("v-list-group",{attrs:{value:t.isUnderSetup(),"prepend-icon":"uil-setting"},scopedSlots:t._u([{key:"activator",fn:function(){return[i("v-list-item-title",[t._v("Setup")])]},proxy:!0}],null,!1,2223785952)},t._l(t.setups,(function(e,s){var a=e[0],n=e[1],r=e[2];return i("v-list-item",{key:s,attrs:{link:"",to:r}},[i("v-list-item-icon",[i("v-icon",{domProps:{textContent:t._s(n)}})],1),i("v-list-item-title",{domProps:{textContent:t._s(a)}})],1)})),1),i("v-list-item",{on:{click:t.signout}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-logout")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("Sign out")])],1)],1)],2)],1)],1),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),i("v-toolbar-title",[t._t("head",(function(){return[t._v("Manager")]}))],2)],1),i("v-main",[i("div",{staticClass:"pa-4"},[t._t("default",(function(){return[t._v("There is nothing to see here!")]}))],2)])],1):t._e()},a=[],n=i("1da1"),r=i("5530"),o=(i("96cf"),i("ac1f"),i("5319"),i("b0c0"),i("caad"),i("0b73")),c=i("2f62"),l=i("edfc"),u=(i("445c"),i("3e8a")),d={name:"ManagerBase",data:function(){return{drawer:null,items:[{text:"Issues",icon:"uil-exclamation-octagon",to:{name:"issue"}},{text:"Home",icon:"uil-estate",to:{name:"home"}},{text:"Meeting",icon:"uil-video",to:{name:"call"}},{text:"Employees",icon:"uil-users-alt",to:{name:"users"}},{text:"Tasks",icon:"uil-clipboard-notes",to:{name:"tasks"}},{text:"Profile",icon:"uil-user",to:{name:"profile"}}],setups:[["Departments","uil-channel","departments"]]}},methods:Object(r["a"])(Object(r["a"])({},Object(c["b"])(["setUser","setMailVerified","setWorkPositions","setLoading"])),{},{signout:function(){var t=this;this.setLoading();var e={timestamp:u["a"].firestore.FieldValue.serverTimestamp(),userId:this.user.id,type:"out"};l["a"].collection("logs").add(e).then(Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.setLoading(),e.next=3,o["a"].signOut();case 3:return t.setUser(null),e.next=6,t.$router.replace({name:"login"});case 6:case"end":return e.stop()}}),e)}))))},isUnderSetup:function(){var t=this.$route.name;return["work-positions","departments"].includes(t)}}),computed:Object(c["c"])({user:"getUser",work_positions:"getWorkPositions"}),created:function(){this.setWorkPositions()}},m=d,v=i("0c7c"),f=i("6544"),p=i.n(f),h=i("40dc"),g=i("5bc1"),b=i("ce7e"),_=i("132d"),y=i("adda"),w=i("8860"),x=i("56b0"),S=i("da13"),O=i("8270"),V=i("5d23"),C=i("1baa"),j=i("34c3"),k=i("f6c4"),I=i("f774"),P=i("afd9"),L=i("2a7f"),z=Object(v["a"])(m,s,a,!1,null,null,null);e["a"]=z.exports;p()(z,{VAppBar:h["a"],VAppBarNavIcon:g["a"],VDivider:b["a"],VIcon:_["a"],VImg:y["a"],VList:w["a"],VListGroup:x["a"],VListItem:S["a"],VListItemAvatar:O["a"],VListItemContent:V["a"],VListItemGroup:C["a"],VListItemIcon:j["a"],VListItemSubtitle:V["b"],VListItemTitle:V["c"],VMain:k["a"],VNavigationDrawer:I["a"],VSystemBar:P["a"],VToolbarTitle:L["b"]})},9126:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",["manager-role"===t.user.role?i("manager-profile-view"):"admin-role"===t.user.role?i("admin-profile-view"):t._e()],1)},a=[],n=i("2f62"),r=(i("0051"),i("fb30"),i("6e79"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("manager-base",[i("component-profile-view")],1)}),o=[],c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.user.id?i("v-row",[i("v-col",{attrs:{cols:"12",md:"4"}},[i("div",{staticClass:"d-flex flex-column pl-md-4 align-center align-md-start"},[i("v-avatar",{attrs:{color:"success",size:"228"}},[t.user.avatar?i("img",{attrs:{src:t.user.avatar,alt:"Profile"}}):i("img",{attrs:{src:"https://joeschmoe.io/api/v1/"+t.user.name,alt:"Profile"}})]),t.user.avatar?t._e():i("div",{staticClass:"d-flex flex-column mt-5 align-center align-md-start"},[t._v("No Avatar Yet")]),i("div",{staticClass:"d-flex flex-column mt-8"},[i("div",{staticStyle:{"font-size":"1.5rem"}},[t._v(t._s(t.user.name))]),i("div",{staticStyle:{"font-size":"0.89rem"}},[t._v(t._s(t.user.email))])]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("ROLE")])]),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.role.toUpperCase()))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("EMPLOYEE ID")]),i("v-icon",{attrs:{color:"success",small:"",right:""}},[t._v("uil-postcard")])],1),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.employee_id))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("DEPARTMENT")])]),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.department))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("WORK POSITION")]),i("v-icon",{attrs:{color:"success",small:"",right:""}},[t._v("uil-briefcase")])],1),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.work))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("LOCATION")]),i("v-icon",{attrs:{color:"success",small:""}},[t._v("uil-map-marker-info")])],1),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.address))]),i("div",{staticClass:"mt-5 success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("CONTACT #")])]),i("div",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.user.contact_number))])],1),i("v-divider",{staticClass:"my-6"})],1),i("v-col",{attrs:{cols:"12",md:"8"}},[i("div",{staticClass:"pl-md-4"},[i("div",{staticClass:"success--text",staticStyle:{"font-size":"1.1rem"}},[i("strong",[t._v("ABOUT ME")])]),i("div",{staticClass:"mt-2",staticStyle:{"font-size":"0.8rem"}},[t._v(" "+t._s(t.user.description||"No description yet.")+" ")])])])],1):t._e()},l=[],u=i("5530"),d=(i("7db0"),i("edfc")),m={name:"ComponentProfileView",data:function(){return{user:{}}},computed:Object(n["c"])({roles:"getRoles",work_positions:"getWorkPositions",departments:"getDepartments"}),created:function(){var t=this;console.log("oaky"),d["a"].collection("users").doc(this.$route.params.id).get().then((function(e){var i=e.data();i.role=t.roles.find((function(t){return t.id===i.role_id})).title,i.department=t.departments.find((function(t){return t.id===i.department_id})).title,i.work_position=t.work_positions.find((function(t){return t.id===i.work_position_id})).title,t.user=Object(u["a"])({id:e.id},i),console.log(i)}))}},v=m,f=i("0c7c"),p=i("6544"),h=i.n(p),g=i("8212"),b=i("62ad"),_=i("ce7e"),y=i("132d"),w=i("0fd9"),x=Object(f["a"])(v,c,l,!1,null,"10310a4c",null),S=x.exports;h()(x,{VAvatar:g["a"],VCol:b["a"],VDivider:_["a"],VIcon:y["a"],VRow:w["a"]});var O=i("90ed"),V={name:"ManagerProfileView",components:{ManagerBase:O["a"],ComponentProfileView:S}},C=V,j=Object(f["a"])(C,r,o,!1,null,"12b99203",null),k=j.exports,I=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("admin-base",[i("component-profile-view")],1)},P=[],L=i("0d57"),z={name:"AdminProfileView",components:{ComponentProfileView:S,AdminBase:L["a"]}},T=z,$=Object(f["a"])(T,I,P,!1,null,"629cab69",null),A=$.exports,E={components:{AdminProfileView:A,ManagerProfileView:k},computed:Object(n["c"])({user:"getUser"})},F=E,N=Object(f["a"])(F,s,a,!1,null,null,null);e["default"]=N.exports},a844:function(t,e,i){"use strict";var s=i("5530"),a=(i("a9e3"),i("1681"),i("8654")),n=i("58df"),r=Object(n["a"])(a["a"]);e["a"]=r.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(s["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},a["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){a["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},fb30:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("admin-base",[i("component-profile")],1)},a=[],n=i("0d57"),r=i("14eb"),o={name:"AdminProfile",components:{ComponentProfile:r["a"],AdminBase:n["a"]}},c=o,l=i("0c7c"),u=Object(l["a"])(c,s,a,!1,null,"14b76d90",null);e["a"]=u.exports}}]);
//# sourceMappingURL=chunk-1021b002.255b080b.js.map