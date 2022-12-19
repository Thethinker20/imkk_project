const loader = document.querySelector('.body1');
const main = document.querySelector('.main');

$(document).bind("contextmenu",function(e) {
    e.preventDefault();
   });
   
   $(document).keydown(function(e){
       if(e.which === 123){
          return false;
       }
   });

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';

    main.style.display = 'block';
    setTimeout(() => main.style.opacity = 1, 50);
  }, 2000);
}

init();

$(document).ready(function () {

    $.ajax({
        url: "/imk/get_students_neth",
        method: "get",
        success: function (response) {
             document.getElementById("num_neth").innerHTML = response["length"];
        },
        error: function (response) {
            alert("server error");
        },
    });

    $.ajax({
        url: "/imk/get_students_pap",
        method: "get",
        success: function (response) {
            document.getElementById("num_cur").innerHTML = response["length"];
        },
        error: function (response) {
            alert("server error");
        },
    });
    setInterval(function(){stud_total()},3000);
});

function stud_total(){
    const stu_total = parseInt(document.getElementById("num_cur").innerHTML) + parseInt(document.getElementById("num_neth").innerHTML);
    console.log(stu_total)
    document.getElementById("studentTotal").innerHTML = stu_total;
}


var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};
