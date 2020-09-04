const itemBoard = document.getElementById('taba-baord');

itemBoard.addEventListener('click', ()=>{
    history.pushState(null,null,"index.html");
    window.location.reload();
    console.log("OKKKKK");
})