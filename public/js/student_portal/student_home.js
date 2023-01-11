const loader = document.querySelector('.piano_loader');
const main = document.querySelector('.main');

function animation_load(){
  setTimeout(() => {
    const piano = document.querySelector('.piano');
    piano.style.opacity = 1;
    piano.style.animation = "cube_roll 1.2s ease-in";
    piano.style.animation = "cubeOpen 0.8s ease-in";

  }, 2000);
  setTimeout(() => {
    const piano1 = document.querySelector('.piano span:nth-of-type(1)');
    const piano2 = document.querySelector('.piano span:nth-of-type(2)');
    const piano3 = document.querySelector('.piano span:nth-of-type(3)');
    const piano4 = document.querySelector('.piano span:nth-of-type(4)');
    const piano5 = document.querySelector('.piano span:nth-of-type(5)');
    const piano6 = document.querySelector('.piano span:nth-of-type(6)');
    const piano7 = document.querySelector('.piano span:nth-of-type(7)');
    piano1.style.opacity = 1;
    piano2.style.opacity = 1;
    piano3.style.opacity = 1;
    piano4.style.opacity = 1;
    piano5.style.opacity = 1;
    piano6.style.opacity = 1;
    piano7.style.opacity = 1;
    piano1.style.animation = "PianoTiles 0.5s ease-in";
    piano2.style.animation = "PianoTiles 0.6s ease-in";
    piano3.style.animation = "PianoTiles 0.7s ease-in";
    piano4.style.animation = "PianoTiles 0.8s ease-in";
    piano5.style.animation = "PianoTiles 0.9s ease-in";
    piano6.style.animation = "PianoTiles 1.0s ease-in";
    piano7.style.animation = "PianoTiles 1.1s ease-in";

  }, 3100);
  setTimeout(() => {
    const piano = document.querySelector('.piano');
    piano.style.opacity = 1;
    piano.style.animation = "cubeOpen 0.5s ease-in";

    const piano_text = document.querySelector('.piano_text');
    piano_text.style.opacity = 1;
    piano_text.style.animation = "fadeIn 2s ease-in";
  }, 4000);
}
animation_load();

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';

    main.style.display = 'block';
    setTimeout(() => main.style.opacity = 1, 100);
  }, 8000);
}

init();

$(document).bind("contextmenu",function(e) {
  e.preventDefault();
 });
 
 $(document).keydown(function(e){
     if(e.which === 123){
        return false;
     }
 });

var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};


var tokenStudent;
function getStudentInfo() {
  var tokenEncrypt = sessionStorage.getItem("token_pap");
  var base64Url = tokenEncrypt.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  tokenStudent = JSON.parse(jsonPayload);
  document.getElementById("stud_name").innerText = tokenStudent.name_pap + " "+tokenStudent.lastname_pap;
  //document.getElementById("navbarDropdown").innerText = tokenStudent.name_pap;
  document.getElementById("mi_nivel").innerText = tokenStudent.level;
  document.getElementById("stud_class").innerText = tokenStudent.level;
}
getStudentInfo();


$('#logout_stud').on('click', function(){
  sessionStorage.removeItem("token_pap");
  window.location.replace("/login");
});
