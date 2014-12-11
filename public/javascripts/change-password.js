/**
 * Created by LocNT on 7/28/2014 3:28 AM.
 */
$(function(){
    $("#changepasswordForm").validate({
        rules: {
            oldPassword:{
                required: true,
                minlength: 6
            },
            newPassword: {
                required: true,
                minlength: 6
            },
            reNewPassword: {
                required: true,
                minlength: 6,
                equalTo: "#newPassword"
            }
        },
        messages: {
            oldPassword: {
                required: "Please enter a old password",
                minlength: "Your old password must consist of at least 6 characters."
            },
            newPassword: {
                required: "Please provide a password.",
                minlength: "Your new password must be at least 6 characters long."
            },
            reNewPassword: {
                required: "Please provide a password.",
                minlength: "Your new password must be at least 6 characters long.",
                equalTo: "Please enter the same password as above."
            }
        }
    });

    $("#btnSavePassword").click(function(){
        var formValid = $("#changepasswordForm").valid();
        if(formValid){
            //$("#profileForm").submit();
            var oldPassword = $("#oldPassword").val();
            var newPassword = $("#newPassword").val();

            $.ajax({
                url : "changePassword",
                type: "Post",
                data : "oldPassword=" + oldPassword + "&newPassword=" + newPassword,
                success : function(response){
                    if(response.statusRes == "success"){
                        $("#modal-notification-changepassword .modal-body").html("Change password is successful");
                        $("#modal-notification-changepassword").modal("show");
                    }else{
                        var validate = $("#changepasswordForm").validate();
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

    $("#modal-notification-changepassword").on("hidden.bs.modal",function(){
        location.href = "dashboard";
    });
});