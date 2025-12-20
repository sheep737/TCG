function createRoom(){
  const id = Math.random().toString(36).slice(2,7);
  location.href = `index.html#${id}`;
}
function joinRoom(){
  const id = roomId.value.trim();
  if(id) location.href = `index.html#${id}`;
}
