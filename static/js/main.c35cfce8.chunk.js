(this["webpackJsonpuse-record-mp3-example"]=this["webpackJsonpuse-record-mp3-example"]||[]).push([[0],{12:function(e,t,n){e.exports=n(24)},13:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);n(13);var r=n(0),a=n.n(r),c=n(8),o=n.n(c),u=n(4),i=n(2),l=n(9),s=n.n(l),b=n(11);var d=new Uint8Array(1048576),f=window.AudioContext||window.webkitAudioContext,p=function(e,t,n){var a=Object(r.useState)(!1),c=a[0],o=a[1],u=Object(r.useState)(!1),i=u[0],l=u[1],s=Object(r.useState)(null),p=s[0],h=s[1],m=Object(r.useState)(null),g=m[0],v=m[1],j=Object(r.useRef)(0),O=Object(r.useRef)([]),R=Object(r.useState)(null),y=R[0],w=R[1],k=Object(r.useRef)(null),x=e&&e.getAudioTracks(),S=(null===x||void 0===x?void 0:x.length)>0;if("object"===typeof e&&S&&!t.sampleRate){var E,A=x[0].getCapabilities();t.sampleRate=null===(E=A.sampleRate)||void 0===E?void 0:E.max}var C=function(e,t){var n=Object(r.useState)(null),a=n[0],c=n[1],o=Object(r.useState)(null),u=o[0],i=o[1],l=Object(r.useMemo)((function(){return Object(b.a)()}),[]);return Object(r.useEffect)((function(){e&&l.then((function(n){n.configure(t.bitrate?{sampleRate:t.sampleRate||48e3,channels:t.channels||1,bitrate:t.bitrate}:{sampleRate:t.sampleRate||48e3,channels:t.channels||1,vbrQuality:t.vbrQuality||2});for(var r=0,a=!0;;){var o=a?n.encode([e]):n.finalize();if(o.length+r>d.length){var u=new Uint8Array(o.length+r);u.set(d),d=u}if(d.set(o,r),r+=o.length,!a)break;a=!1}var l=new Uint8Array(d.buffer,0,r),s=new Blob([new Uint8Array(l).buffer],{type:"audio/mpeg"}),b=URL.createObjectURL(s);c(s),i(b)}))}),[e]),[u,a]}(y,t),U=C[0],M=C[1];return Object(r.useEffect)((function(){if(!1===c&&g&&p&&k.current){g&&g.disconnect(k.current.destination),p&&p.disconnect(g);var e=function(e,t){for(var n=new Float32Array(t),r=0,a=0;a<e.length;a++){var c=e[a];n.set(c,r),r+=c.length}return n}(O.current,j.current);null!==n&&void 0!==n&&n.post?w(n.post(e)):w(e)}}),[c]),{isRecording:c,isRecordingPaused:i,startRecording:function(){if(e){o(!0),i||(j.current=0,O.current=[]),l(!1),k.current=new f({sampleRate:t.sampleRate});var n,r=k.current;(n=r.createScriptProcessor?r.createScriptProcessor(2048,1,1):r.createJavaScriptNode(2048,1,1)).onaudioprocess=function(e){var t=new Float32Array(e.inputBuffer.getChannelData(0));O.current.push(t),j.current=j.current+2048},v(n);var a=r.createMediaStreamSource(e);h(a),a.connect(n),n.connect(r.destination)}},stopRecording:function(){o(!1),l(!1)},pauseRecording:function(){o(!1),l(!0)},blobUrl:U,blob:M,channelData:y}},h=n(5),m=n(10),g=n.n(m),v=function(e){return function(e){return e.reduce((function(e,t){return e+t}),0)}(e)/e.length},j=function(e){return function(e){for(var t=[],n=e.length;n>0;n--)if(t.push(Math.abs(e[n])),t.length>50&&t.shift(),v(t)>.01)return e.slice(0,n<e.length-6e3?n+6e3:e.length);return e}(function(e){for(var t=[],n=0;n<e.length;n++)if(t.push(Math.abs(e[n])),t.length>50&&t.shift(),v(t)>.02)return e.slice(n>6e3?n-6e3:0);return e}(e))};function O(){var e=Object(u.a)(["pt-4"]);return O=function(){return e},e}function R(){var e=Object(u.a)(["px-4 py-2 border border-black rounded text-lg"]);return R=function(){return e},e}function y(){var e=Object(u.a)(["px-4 mr-1 py-2 border border-black rounded text-lg"]);return y=function(){return e},e}function w(){var e=Object(u.a)(["px-4 mr-1 py-2 border border-black rounded text-lg"]);return w=function(){return e},e}function k(){var e=Object(u.a)(["p-6"]);return k=function(){return e},e}var x=function(){var e=Object(r.useState)({audio:!0}),t=Object(i.a)(e,1)[0],n=s()(t).stream,c=n&&n.getAudioTracks()[0].label,o=p(n,{sampleRate:48e3,channels:1,vbrQuality:2},{post:j}),u=o.isRecording,l=o.isRecordingPaused,b=o.startRecording,d=o.stopRecording,f=o.pauseRecording,m=o.blobUrl,v=o.channelData,x=(v?function(e){for(var t=Math.floor(e.length/1e3),n=[],r=0;r<1e3;r++){for(var a=t*r,c=0,o=0;o<t;o++)c+=Math.abs(e[a+o]);n.push(c/t)}return n}(v):[]).map((function(e,t){return a.a.createElement("div",{key:t,style:{width:"0.1%",height:"".concat(100*e,"%"),backgroundColor:"red"}})}));return a.a.createElement("div",{className:Object(h.a)(k())},a.a.createElement("button",{disabled:u,className:Object(h.a)(w()),onClick:b},"Record"),a.a.createElement("button",{disabled:!(u||!u&&l),className:Object(h.a)(y()),onClick:d},"Stop"),a.a.createElement("button",{disabled:!u&&!l,className:Object(h.a)(R()),onClick:l?b:f},"Pause"),m&&a.a.createElement("div",{className:Object(h.a)(O())},a.a.createElement("audio",{controls:!0,src:m}),a.a.createElement("div",{style:{display:"flex",alignItems:"center",width:"300px",height:"100px"}},x)),c,a.a.createElement(g.a,{color:"black",position:"right",href:"https://github.com/aaronshaf/use-record-mp3"},"GitHub repo"))};o.a.render(a.a.createElement(x,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.c35cfce8.chunk.js.map