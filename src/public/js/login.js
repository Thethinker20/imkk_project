$(document).bind("contextmenu",function(e) {
  e.preventDefault();
 });
 
 $(document).keydown(function(e){
     if(e.which === 123){
        return false;
     }
 });

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

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});

var tokenEncrypt

const form = document.getElementById("loginForm");
form.addEventListener("submit", login);

async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username == "admin") {
    const result = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
    if (result.status === "ok") {
      window.location.replace("/portal_admin");
    } else {
      Swal.fire({
        icon: "error",
        title: result.error,
      });
    }
  } else if (username.substring(0, 4) == "stud") {
    const result = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
    if (result.status === "ok") {
      const resu = result.data;
      const paid = result.paid;
      if(paid == "true"){
        if (result.lang == "pap") {
          sessionStorage.setItem("token_pap", JSON.stringify(resu));
          window.location.replace("/student_home_pap");
          getStudentInfo();
        } else if (result.lang == "neth") {
          sessionStorage.setItem("token_neth", JSON.stringify(resu));
          window.location.replace("/student_home_neth");
        }
      }else {
        Swal.fire({
          icon: 'warning',
          title: "Please do payment, contact administrator for more information!",
        });
      }
    } else (
      Swal.fire({
        icon: "error",
        title: result.error,
      })
    )
  } else {
    Swal.fire({
      icon: "error",
      title: "Username does not exist!",
    });
  }
}
