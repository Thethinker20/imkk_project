// $(document).bind("contextmenu",function(e) {
//     e.preventDefault();
//    });
   
//    $(document).keydown(function(e){
//        if(e.which === 123){
//           return false;
//        }
//    });
   
$('#modal-container').click(function () {
    $(this).addClass('out');
    $('body').removeClass('modal-active');
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function () {
    readURL(this);
});

$("#lastname").change(function () {
    var name_u = $('#name').val();
    var lastname_u = $('#lastname').val();
    var username = $('#username');
    username.val("mae" + name_u.substring(0, 4).toLowerCase() + lastname_u.substring(lastname_u.length - 4).toLowerCase());
});

$("#password").change(function () {
    var password = $("#password").val();
    if (password.length <= 7) {
        $("#CheckPasswordMatch1")
            .html("E password mester ta mas ku 8 leter")
            .addClass("text-danger");
    } else {
        $("#CheckPasswordMatch1")
            .html("Password ta korekto.")
            .removeClass("text-danger")
            .addClass("text-primary");
    }
});

//Confirm password
$("#passwordC").change(function () {
    var password = $("#password").val();
    var confirmPassword = $("#passwordC").val();
    if (password != confirmPassword)
        $("#CheckPasswordMatch")
            .html("E password not ta korekto!")
            .addClass("text-danger");
    else
        $("#CheckPasswordMatch")
            .html("Password match.")
            .removeClass("text-danger")
            .addClass("text-primary");
});

//iglesia
$.ajax({
    url: "/json/iglesia.json",
    method: "get",
    success: function (response) {
        $.each(response.iglesia, function (index, value) {

            $("#iglesia").append(
                '<option rel="' +
                index +
                '" value="' +
                value.id +
                '">' +
                value.name +
                "</option>"
            );
        });
    },
    error: function (err) {
        alert("server error", err);
    },
});

const form = document.getElementById("maestro");
form.addEventListener("submit", add_maestro);

async function add_maestro(event) {
    const seliglesia = document.getElementById("iglesia");

    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordC = document.getElementById("passwordC").value;
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const address = document.getElementById("address").value;

    const iglesia = seliglesia.options[seliglesia.selectedIndex].text;

    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const mobile = document.getElementById("mobile").value;

    const result = await fetch("/imk/register_maestro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            passwordC,
            name,
            lastname,
            address,
            iglesia,
            email,
            age,
            mobile,
        }),
    }).then((res) => res.json());
    console.log("success")
    if (result.status == "202") {
        Swal.fire({
            icon: "success",
            title: result.data,
        });
        setTimeout(() => {
            window.location.replace("/imk/login");
        }, 3000);
    } else {
        Swal.fire({
            icon: "error",
            title: result.error,
        });
    }
}