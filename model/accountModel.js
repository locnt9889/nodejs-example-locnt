/**
 * Created by LocNT on 7/25/2014 11:40 PM.
 */
var moment = require('moment');

function Account(fullname,email,username,password,role,datecreate,active){
    this.fullname = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.role = "CUSTOMER";
    this.datecreate = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.active = true;

    if(fullname != undefined){
        this.fullname = fullname;
    }

    if(email != undefined){
        this.email = email;
    }

    if(username != undefined){
        this.username = username;
    }

    if(password != undefined){
        this.password = password;
    }

    if(role != undefined){
        this.role = role;
    }

    if(datecreate != undefined){
        this.datecreate = datecreate;
    }

    if(active != undefined){
        this.active = active;
    }
}

exports.newAccount = function(fullname,email,username,password,role,datecreate,active){
    return new Account(fullname,email,username,password,role,datecreate,active);
};

/*account dto ajax*/
function AccountAjaxResponse(){
    this.errorsRes = [];
    this.statusRes = "success";
}

exports.newAccountAjaxResponse = function(){
    return new AccountAjaxResponse();
};
