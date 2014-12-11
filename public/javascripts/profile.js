/**
 * Created by LocNT on 7/22/2014 4:27 PM.
 */
$(function(){
    $("#btnSaveAccount").click(function(){
        var formValid = $("#profileForm").valid();
        if(formValid){
            //$("#profileForm").submit();
            var fullname = $("#fullname").val();
            var email = $("#email").val();
            var username = $("#username").val();
            var password = $("#password").val();

            $.ajax({
                url : "saveAccount",
                type: "Post",
                data : "fullname=" + fullname + "&email=" + email + "&username=" + username + "&password=" + password,
                success : function(response){
                    if(response.statusRes == "success"){
                        $("#modal-notification-profile .modal-body").html("Register new User is successful");
                        $("#modal-notification-profile").modal("show");
                    }else{
                        var validate = $("#profileForm").validate();
                        if(response.errorsRes.length > 0){
                            validate.showErrors(response.errorsRes[0]);
                        }else{
                            validate.showErrors({"common":"Have some errors when save data!"});
                        }
                    }
                },
                error : function(error){
                    alert("error :" + error);
                }

            });
        }
    });
    //config validate, auto valid when key up or submit
    $("#profileForm").validate({
        rules: {
            fullname: "required",
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                minlength: 6
            },
            repassword: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            }
        },
        messages: {
            fullname: "Please enter your lastname.",
            email: "Please enter a valid email address.",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 4 characters."
            },
            password: {
                required: "Please provide a password.",
                minlength: "Your password must be at least 6 characters long."
            },
            repassword: {
                required: "Please provide a password.",
                minlength: "Your password must be at least 6 characters long.",
                equalTo: "Please enter the same password as above."
            }
        }
    });

    $("#modal-notification-profile").on("hidden.bs.modal",function(){
        location.href = "/";
    });
});
