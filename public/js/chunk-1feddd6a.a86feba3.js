(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1feddd6a"],{"92c6":function(e,t,n){},e53d:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",["manager-role"===e.getUser.role?n("manager-meeting-home"):e._e(),"employee-role"===e.getUser.role?n("employee-meeting-home"):e._e()],1)},o=[],l=n("2f62"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("manager-base",{staticClass:"mainBody",attrs:{id:"call"}},[n("div",{staticClass:"pa-5"},[n("video-home")],1)])},s=[],c=n("90ed"),m=n("4a92"),i=n("13f9"),u={name:"ManagerMeetingHome",components:{ManagerBase:c["a"],MeetingComponent:m["a"],VideoHome:i["a"]},data:function(){return{peers:{},peer:null,socket:null,started:!1,ROOM_ID:"",myId:"",room:""}},computed:Object(l["c"])(["getUser"])},d=u,p=n("0c7c"),g=Object(p["a"])(d,r,s,!1,null,null,null),f=g.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("employee-base",{staticClass:"mainBody",attrs:{id:"call"}},[n("div",{staticClass:"pa-5"},[n("video-home")],1)])},y=[],h=(n("92c6"),n("6082")),v={name:"EmployeeMeetingHome",components:{EmployeeBase:h["a"],VideoHome:i["a"]},data:function(){return{peers:{},peer:null,socket:null,started:!1,myId:"",room:""}},computed:Object(l["c"])(["getUser"])},M=v,_=Object(p["a"])(M,b,y,!1,null,null,null),O=_.exports,j={name:"VideoCall",components:{EmployeeMeetingHome:O,ManagerMeetingHome:f},computed:Object(l["c"])(["getUser"])},w=j,C=Object(p["a"])(w,a,o,!1,null,"bb31376c",null);t["default"]=C.exports}}]);
//# sourceMappingURL=chunk-1feddd6a.a86feba3.js.map