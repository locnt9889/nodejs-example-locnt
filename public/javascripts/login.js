/**
 * Created by LocNT on 7/22/2014 4:27 PM.
 */
$(function(){
    //config validate, auto valid when key up or submit
    $("#loginForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 4 characters."
            },
            password: {
                required: "Please provide a password.",
                minlength: "Your password must be at least 6 characters long."
            }
        }
    });

    $("#modal-notification-profile").on("hidden.bs.modal",function(){
        location.href = "/";
    });
});
