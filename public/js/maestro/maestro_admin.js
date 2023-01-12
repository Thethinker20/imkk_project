$(document).ready(function () {
    get_stud_name();
    get_maestro_name();

});


/* To Disable Inspect Element */
// $(document).bind("contextmenu", function (e) {
//     e.preventDefault();
// });

// $(document).keydown(function (e) {
//     if (e.which === 123) {
//         return false;
//     }
// });


var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};


function get_stud_name() {
    $.ajax({
        url: "/imk/get_students_pap",
        method: "get",
        success: function (response) {
            var len = response.length;
            $("#student_name").empty();
            $("#student_nameC").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['_id'];
                var name = response[i]['name_pap'];

                $("#student_name").append("<option value='" + id + "'>" + name + "</option>");
                $("#student_nameC").append("<option value='" + id + "'>" + name + "</option>");
            }
        },
        error: function (response) {
            alert("server error");
        },
    });
}

function get_maestro_name() {
    $.ajax({
        url: "/imk/get_maestro",
        method: "get",
        success: function (response) {
            var len = response.length;
            $("#maestro_add").empty();
            $("#maestro_addC").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['_id'];
                var name = response[i]['name'];

                $("#maestro_add").append("<option value='" + id + "'>" + name + "</option>");
                $("#maestro_addC").append("<option value='" + id + "'>" + name + "</option>");
                $("#students_maestro").append("<option value='" + id + "'>" + name + "</option>");
                $("#modal_maestro").append("<option value='" + id + "'>" + name + "</option>");
            }
            table = $("#maestro_tb").DataTable({
                responsive: true,
                data: response,
                columns: [
                    { data: "name" },
                    { data: "lastname" },
                    { data: "address" },
                    { data: "iglesia" },
                    { data: "email" },
                    { data: "mobile" },
                ],
                bLengthChange: false,
                bInfo: false,
                bAutoWidth: false,
                destroy: true,
            });
        },
        error: function (response) {
            alert("server error");
        },
    });
}

const form = document.getElementById("add_s_to_m");
form.addEventListener("submit", add_s_maestro);

async function add_s_maestro(event) {
    event.preventDefault();
    const stud_id = document.getElementById('student_name').value;
    const maestro_id = document.getElementById('maestro_add').value;
    
    const result = await fetch("/imk/add_student_to_maestro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            stud_id,
            maestro_id
        }),
    }).then((res) => res.json());
    if(result.status == "202"){
        Swal.fire({
            icon: "success",
            title: result.msg,
        });

        setTimeout(() => {
            location.reload();
        }, 2000);
    }else{
        Swal.fire({
            icon: "error",
            title: result.msg,
        });
    }
}

const form_m = document.getElementById("delete_mae_modal");
form_m.addEventListener("submit", delete_maestro_m);

async function delete_maestro_m(event) {
    event.preventDefault();
    const maestro_id_m = document.getElementById('modal_maestro').value;
    
    const result = await fetch("/imk/delete_maestro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            maestro_id_m
        }),
    }).then((res) => res.json());
    if(result.status == "202"){
        Swal.fire({
            icon: "success",
            title: result.msg,
        });
        setTimeout(() => {
            location.reload();
        }, 2000);
    }else{
        Swal.fire({
            icon: "error",
            title: result.msg,
        });
    }
}

// $("#student_nameC").change(function () {
//     const stud_id = document.getElementById('student_name').value;

//     const result = fetch("/imk/student_maestro", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             stud_id
//         }),
//     }).then((res) => res.json());
// });

$("#students_maestro").change(async function(){
    const mae_id = document.getElementById('students_maestro').value;

    const result = await fetch("/imk/students_of_maestro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mae_id
        }),
    }).then((res) => res.json());
    
    const data_students = result.data;
    var data_new = [{
        'student': ''
    }];

    for(var i in data_students){
        var obj = {'student' : result.data[i].name_pap}
        data_new.push(obj)
    }

    

    const table_s = document.querySelector('#students_maestro_tb');
    table_s.style.display = 'block';
    table = $("#students_maestro_tb").DataTable({
        responsive: true,
        data: data_new,
        columns: [
            { data: "student" }
        ],
        bLengthChange: false,
        bInfo: false,
        bAutoWidth: false,
        destroy: true,
        columnDefs: [
            { width: '12%', targets: 0 }
        ],
    });

});