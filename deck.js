const MAX = 10;
const CARD_POOL = [
  {name:"Fire"},{name:"Heal"},{name:"Draw"},{name:"Soldier"}
];
let deck = JSON.parse(localStorage.getItem("deck"))||[];

function render(){
  count.textContent = deck.length;
  pool.innerHTML = "";
  CARD_POOL.forEach((c,i)=>{
    const d=document.createElement("div");
    d.className="card";
    d.textContent=c.name;
    d.onclick=()=>{ if(deck.length<MAX){deck.push(i);render();}};
    pool.appendChild(d);
  });
  deckDiv.innerHTML="";
  deck.forEach((i,idx)=>{
    const d=document.createElement("div");
    d.className="card";
    d.textContent=CARD_POOL[i].name;
    d.onclick=()=>{deck.splice(idx,1);render();}
    deckDiv.appendChild(d);
  });
}
function saveDeck(){
  if(deck.length!==MAX) return alert("10枚必要");
  localStorage.setItem("deck",JSON.stringify(deck));
  location.href="lobby.html";
}
render();
