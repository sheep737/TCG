
// 🔥 Firebase設定（自分のもの）
firebase.initializeApp({
  apiKey: "AIzaSyCzUHmyYcQlYkJmeXX5Cxp_fNFkonOSE3I",
  authDomain: "tcgtk-51f73.firebaseapp.com",
  databaseURL: "https://tcgtk-51f73-default-rtdb.firebaseio.com",
  projectId: "tcgtk-51f73",
  storageBucket: "tcgtk-51f73.firebasestorage.app",
  messagingSenderId: "379251900306",
  appId: "1:379251900306:web:beeb1989bedcca4dcbcb4b",
  measurementId: "G-HH57WGJM15
});
const db = firebase.database();

const roomId = location.hash.slice(1);
const roomRef = db.ref("rooms/"+roomId);
const me = Math.random()<0.5?"p1":"p2";
let selected = null;

// 初期化
roomRef.transaction(room=>{
  if(room) return room;
  const deck = JSON.parse(localStorage.getItem("deck"));
  return {
    turn:"p1",
    players:{
      p1:{hp:20,mana:1,maxMana:1},
      p2:{hp:20,mana:1,maxMana:1}
    },
    decks:{p1:shuffle(deck),p2:shuffle(deck)},
    hands:{p1:[],p2:[]},
    fields:{p1:[],p2:[]},
    result:{finished:false}
  };
});

// 描画・同期
roomRef.on("value",snap=>{
  const r=snap.val(); if(!r)return;
  if(r.result.finished){
    result.style.display="block";
    resultText.textContent = r.result.winner===me?"YOU WIN":"YOU LOSE";
  }
  hp.textContent=r.players[me].hp;
  mana.textContent=`${r.players[me].mana}/${r.players[me].maxMana}`;
  renderHand(r.hands[me],r.players[me].mana);
  renderField(r.fields[me],true);
  renderField(r.fields[me==="p1"?"p2":"p1"],false);
});
