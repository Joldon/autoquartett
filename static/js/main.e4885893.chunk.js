(this.webpackJsonpautoquartett=this.webpackJsonpautoquartett||[]).push([[0],{111:function(e,t,a){"use strict";a.r(t);var r=a(2),c=a.n(r),n=a(36),s=a.n(n),l=(a(44),a(3)),i=(a(45),a(46),a(8)),u=a(37),o=a(1);var p=function(e){var t=e.character,a=e.flipped,r=e.currentValue,c=e.setCurrentValue,n=e.playerCard,s={Height:Object(o.jsx)(i.a,{size:"2rem"}),Strength:Object(o.jsx)(i.c,{size:"2rem"}),Age:Object(o.jsx)(i.d,{size:"2rem"}),IQ:Object(o.jsx)(i.b,{size:"2rem"}),Funnyness:Object(o.jsx)(u.a,{size:"2rem"})},l=function(e){n&&(console.log(r===e.target.parentElement.getAttribute("stat")),r===e.target.parentElement.getAttribute("stat")||r===e.target.getAttribute("stat")?c(""):e.target.getAttribute("stat")?c(e.target.getAttribute("stat")):c(e.target.parentElement.getAttribute("stat")))};return a?Object(o.jsxs)("div",{className:"Character",children:[Object(o.jsx)("div",{className:"Character__name",children:t[0].fields.name}),Object(o.jsx)("img",{className:"Character__picture",src:"https:".concat(t[0].fields.picture.fields.file.url),width:"250",height:"250",alt:"characters"}),Object(o.jsx)("div",{className:"Character__attr-wrapper",children:["Height","Strength","Age","IQ","Funnyness"].map((function(e){return Object(o.jsxs)("div",{onClick:l,stat:e.toLowerCase(),className:"Character__attr ".concat(r===e.toLowerCase()?"Character__attr--active":null),children:[s[e]," ",Object(o.jsx)("p",{children:e}),t[0].fields[e.toLowerCase()]]})}))})]}):Object(o.jsx)("div",{className:"Character bgr--black"})},d=a(7),j=a(9);var b=function(e){var t=Object(r.useReducer)((function(e,t){switch(t.type){case"new game":return Object(j.a)(Object(j.a)({},e),{},{cards:{player:Object(d.a)(t.payload.cards[0]),computer:Object(d.a)(t.payload.cards[1])},currentCard:{player:t.payload.currentCards[0],computer:t.payload.currentCards[1]}});case"battle":return Object(j.a)(Object(j.a)({},e),{},{cards:{player:Object(d.a)(t.payload.newCards[0]),computer:Object(d.a)(t.payload.newCards[1])},playerWins:t.payload.playerWins});case"next card":return Object(j.a)(Object(j.a)({},e),{},{currentCard:{player:t.payload.newPlayerCard,computer:t.payload.newComputerCard}});default:return e}}),{cards:{player:[],computer:[]},currentCard:{player:"",computer:""}}),a=Object(l.a)(t,2),c=a[0],n=a[1],s=function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),r=[e[a],e[t]];e[t]=r[0],e[a]=r[1]}return e},i=function(e){var t=Math.ceil(e.length/2);return[e.splice(0,t),e.splice(-t)]},u=function(e,t){var a=s(e),r=s(t);return[a[0],r[0]]};return[c,function(){var t=e.map((function(e){return e.fields.name})),a=s(t),r=i(a),c=Object(l.a)(r,2),o=c[0],p=c[1],d=u(o,p),j=Object(l.a)(d,2),b=j[0],f=j[1];return n({type:"new game",payload:{cards:[o,p],currentCards:[b,f]}}),!0},function(t){var a=e.find((function(e){return e.fields.name===c.currentCard.player})),r=e.find((function(e){return e.fields.name===c.currentCard.computer}));if(a.fields[t]>r.fields[t]){var s=Object(d.a)(c.cards.player);s.push(c.currentCard.computer);var l=Object(d.a)(c.cards.computer).filter((function(e){return e!==c.currentCard.computer}));return n({type:"battle",payload:{newCards:[s,l]}}),console.log(a),"".concat(a.fields[t]," : ").concat(r.fields[t])}if(a.fields[t]<=r.fields[t]){var i=Object(d.a)(c.cards.player).filter((function(e){return e!==c.currentCard.player})),u=Object(d.a)(c.cards.computer);return u.push(c.currentCard.player),n({type:"battle",payload:{newCards:[i,u]}}),console.log(a),"".concat(a.fields[t]," : ").concat(r.fields[t])}},function(){var e=u(c.cards.player,c.cards.computer),t=Object(l.a)(e,2),a=t[0],r=t[1];n({type:"next card",payload:{newPlayerCard:a,newComputerCard:r}})}]},f=a(38).createClient({space:"rsl3g5fqvifg",accessToken:"aCS01Hy0NPwQOct5niDBpiJIcn27z-54h8SyBSxiIjQ"}),O=a.p+"static/media/Battle.79b54f9d.png",m=a(18),h=a.n(m),_=a.p+"static/media/8_bit_boss_battle_4_by_eliteferrex.c4298542.mp3",g=a.p+"static/media/super_street_fighter_2_turbo_8_bit_music_ryu_stage_4297822133384776681.81b293a9.mp3";var y=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),a=t[0],c=t[1];Object(r.useEffect)((function(){f.getEntries().then((function(e){return e.items})).then((function(e){c(e)})).catch(console.log("request failed"))}),[]);var n=b(a),s=Object(l.a)(n,4),u=s[0],d=s[1],j=s[2],m=s[3],y=Object(r.useState)(!1),C=Object(l.a)(y,2),v=C[0],x=C[1],A=Object(r.useState)(!1),N=Object(l.a)(A,2),w=N[0],S=N[1],L=Object(r.useState)(),P=Object(l.a)(L,2),E=P[0],I=P[1],k=Object(r.useState)("Start your epic battle"),z=Object(l.a)(k,2),Y=z[0],B=z[1],F=Object(r.useState)(!0),G=Object(l.a)(F,2),M=G[0],T=G[1],W=Object(r.useState)(!0),q=Object(l.a)(W,2),D=q[0],Q=q[1],U=Object(r.useState)(!1),V=Object(l.a)(U,2),H=V[0],J=V[1],R=Object(r.useState)(""),K=Object(l.a)(R,2),X=K[0],Z=K[1],$=Object(r.useState)("PLAYING"),ee=Object(l.a)($,2),te=ee[0],ae=ee[1];Object(r.useEffect)((function(){u.cards.player.length&&x(!0)}),[u.cards]),Object(r.useEffect)((function(){u.cards.player.length&&u.cards.computer.length||!v||(S(!0),Q(!0),u.cards.player.length||(Z("computer"),B("You lost this epic battle! What a bitter defeat. Try again.")),u.cards.computer.length||(Z("player"),B("You won this epic battle! What a glorious triumph!")))}),[u]);var re=[_,g];return Object(o.jsxs)("div",{className:"App__wrapper",children:[Object(o.jsx)("img",{src:O,className:"App__logo",alt:"Game Logo"}),Object(o.jsx)(h.a,{url:re[Math.floor(Math.random()*re.length)],playStatus:h.a.status[te],loop:!0,volume:30,autoLoad:!0}),Object(o.jsxs)("div",{className:"App_upperrightwrapper",children:[Object(o.jsx)("div",{className:"App__button--sound",onClick:function(){"PLAYING"===te&&ae("PAUSED"),"PAUSED"===te&&ae("PLAYING")},children:"PLAYING"===te?Object(o.jsx)(i.e,{size:"4.8rem"}):Object(o.jsx)(i.f,{size:"4.8rem"})}),Object(o.jsx)("button",{className:"App__button--new-game",onClick:function(){d(),T(!0),Q(!1),J(!1),S(!1),B("Select your weapons")},children:"New Game"})]}),Object(o.jsxs)("div",{className:"App__display-and-counter",children:[Object(o.jsx)("div",{className:"App__counter App__counter--player",children:v?u.cards.player.length:"0"}),Object(o.jsx)("div",{className:"App__display",children:Y}),Object(o.jsx)("div",{className:"App__counter App__counter--computer",children:v?u.cards.computer.length:"0"})]}),w?Object(o.jsx)("div",{className:"App__gameover",children:Object(o.jsx)("div",{className:"App__gameover__text",children:"computer"===X?"YOU LOST":"YOU WON"})}):"",Object(o.jsxs)("div",{className:"App__characters",children:[v?Object(o.jsx)(p,{playerCard:!0,character:a.filter((function(e){return e.fields.name===u.currentCard.player})),currentValue:E,setCurrentValue:I,flipped:!0}):Object(o.jsx)(p,{character:null,flipped:!1}),Object(o.jsx)("div",{className:"App__buttons",children:Object(o.jsx)("div",{children:Object(o.jsx)("button",{className:"App__button--battle",onClick:M?function(){if(v&&E){var e=j(E);B(e),T(!1),J(!0)}}:function(){if(v)return m(),T(!0),J(!1),B("Select your weapons"),void I("")},disabled:D,children:M?"Battle":"Next"})})}),v?Object(o.jsx)(p,{playerCard:!1,character:a.filter((function(e){return e.fields.name===u.currentCard.computer})),flipped:!!H}):Object(o.jsx)(p,{character:null,flipped:!1})]})]})},C=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,112)).then((function(t){var a=t.getCLS,r=t.getFID,c=t.getFCP,n=t.getLCP,s=t.getTTFB;a(e),r(e),c(e),n(e),s(e)}))};s.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(y,{})}),document.getElementById("root")),C()},17:function(e,t){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},76:function(e,t){}},[[111,1,2]]]);
//# sourceMappingURL=main.e4885893.chunk.js.map