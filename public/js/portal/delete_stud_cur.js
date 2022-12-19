$(document).ready(function () {
    get_table();
});

/* To Disable Inspect Element */
$(document).bind("contextmenu", function (e) {
    e.preventDefault();
});

$(document).keydown(function (e) {
    if (e.which === 123) {
        return false;
    }
});


var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};


function get_table() {
    $.ajax({
        url: "/imk/get_students_pap",
        method: "get",
        success: function (response) {
            table = $("#edit_cur_table").DataTable({
                responsive: true,
                data: response,
                pageLength: 10,
                columns: [
                    { data: "ken" },
                    { data: "name_pap" },
                    { data: "lastname_pap" },
                    { data: "address_pap" },
                    { data: "bario" },
                    { data: "konosementu" },
                    { data: "pastor" },
                    { data: "iglesia" },
                    { data: "email_pap" },
                    { data: "age_pap" },
                    { data: "paid" },
                ],
                bLengthChange: false,
                bInfo: false,
                bAutoWidth: false,
                order: [[2, "asc"]],
                columnDefs: [
                    { width: '12%', targets: 4 },
                    { width: '10%', targets: 7 }
                ],
                destroy: true,
            });

            var len = response.length;
            $("#student_name").empty();
            for (var i = 0; i < len; i++) {
                var id = response[i]['_id'];
                var name = response[i]['name_pap'];

                $("#student_name").append("<option value='" + id + "'>" + name + "</option>");
            }
        },
        error: function (response) {
            alert("server error");
        },
    });
}

const form = document.getElementById("ispaid_form");
form.addEventListener("submit", changeLevel);

async function changeLevel(event) {
    event.preventDefault();
    const stud_id = document.getElementById('student_name').value;
    const isPaid_stat = document.getElementById('isPaid_stat').value;
    
    const result = await fetch("/imk/is_paid_stud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            stud_id,
            isPaid_stat
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


// $('#update_btn').on('click', async function () {
//     const stud_id = document.getElementById('student_name').value;
//     const isPaid_stat = document.getElementById('isPaid_stat').value;

//     const result = await fetch("/is_paid_stud", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             stud_id,
//             isPaid_stat,
//             land: "Curacao"
//         }),
//     }).then((res) => res.json());
//     if(result.status == "202"){
//         Swal.fire({
//             icon: "success",
//             title: result.msg,
//         });
//     }else{
//         Swal.fire({
//             icon: "error",
//             title: result.msg,
//         });
//     }

// })