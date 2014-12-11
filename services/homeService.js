/**
 * Created by LocNT on 7/22/2014 1:09 AM.
 */
require('./mongodbService').initdb();

var accountModel = require('../model/accountModel');

exports.addNewAccount = function(account,callback){
    console.log("Register");
    var db = require('./mongodbService').getdb();
    var hello = require('./mongodbService').db;
    var accountsTable = db.collection('accounts');
    var accountAjaxResponse = accountModel.newAccountAjaxResponse();
    var errorsRes = [];

    //check email exist
    accountsTable.findOne({email : account.email},function(error, result){
        if(error){
            errorsRes.push({"common" : error.message});
            accountAjaxResponse.errorsRes = errorsRes;
            accountAjaxResponse.statusRes = "fail";
            callback(accountAjaxResponse);
        }else {
            if (result) {
                errorsRes.push({"email" : "Email was existed"});
                accountAjaxResponse.errorsRes = errorsRes;
                accountAjaxResponse.statusRes = "fail";
                callback(accountAjaxResponse);
            } else {

                //email not exist, check username exist
                accountsTable.findOne({username: account.username}, function (error, result) {
                    if(error){
                        errorsRes.push({"common" : error.message});
                        accountAjaxResponse.errorsRes = errorsRes;
                        accountAjaxResponse.statusRes = "fail";
                        callback(accountAjaxResponse);
                    }else {
                        if (result) {
                            errorsRes.push({"username": "Username is exist"});
                            accountAjaxResponse.errorsRes = errorsRes;
                            accountAjaxResponse.statusRes = "fail";
                            callback(accountAjaxResponse);
                        } else {

                            //email and username not exist, insert
                            accountsTable.insert(account, {safe: true}, function (error, result){
                                if(error){
                                    errorsRes.push({"common" : error.message});
                                    accountAjaxResponse.errorsRes = errorsRes;
                                    accountAjaxResponse.statusRes = "fail";
                                }else {
                                    accountAjaxResponse.errorsRes = [];
                                    accountAjaxResponse.statusRes = "success";
                                    callback(accountAjaxResponse);
                                }
                            });
                        }
                    }
                })
            }
        }
    })
};

exports.loginAuthen = function(userAuthen,callback){
    console.log("login Authentication");
    var db = require('./mongodbService').getdb();
    var accountsTable = db.collection('accounts');

    //userAuthen
    accountsTable.findOne({username:userAuthen.username,password:userAuthen.password},function(error, result){
        if(error){
            callback(error.message);
        }
        if(!result){
            callback("Login fail,your username or password is incorrect!");
        }else{
            callback();
        }

    })
};

exports.getUserByUsername = function(userCurrent,callback){
    console.log("login Authentication");
    var db = require('./mongodbService').getdb();
    var accountsTable = db.collection('accounts');

    //userAuthen
    accountsTable.findOne({username:userCurrent},function(error, result){
        if(error){
            callback(error.message);
        }
        if(!result){
            callback();
        }else{
            //create user dto
            var email = result.username;
            var fullname = result.fullname;
            var datecreate = result.datecreate;
            var password = result.username;
            var role = result.role;
            var active = result.active;
            var accountResult = accountModel.newAccount(fullname,email,userCurrent,password,role,datecreate,active);
            callback(undefined, accountResult);
        }

    })
};

exports.saveChangePassword = function(accountPasswords,callback){
    console.log("Change password");
    var db = require('./mongodbService').getdb();
    var accountsTable = db.collection('accounts');
    var accountAjaxResponse = accountModel.newAccountAjaxResponse();
    var errorsRes = [];

    //check email exist
    accountsTable.findOne({username : accountPasswords.username, password: accountPasswords.oldPassword},function(error, result){
        if(error){
            errorsRes.push({"common" : error.message});
            accountAjaxResponse.errorsRes = errorsRes;
            accountAjaxResponse.statusRes = "fail";
            callback(accountAjaxResponse);
        }else {
            if (!result) {
                errorsRes.push({"oldPassword" : "Old Password is incorrect!"});
                accountAjaxResponse.errorsRes = errorsRes;
                accountAjaxResponse.statusRes = "fail";
                callback(accountAjaxResponse);
            } else {
                result.password = accountPasswords.newPassword;
                accountsTable.save(result,function(error,result){
                    if(error){
                        errorsRes.push({"common" : error.message});
                        accountAjaxResponse.errorsRes = errorsRes;
                        accountAjaxResponse.statusRes = "fail";
                        callback(accountAjaxResponse);
                    }else {
                        accountAjaxResponse.errorsRes = [];
                        accountAjaxResponse.statusRes = "success";
                        callback(accountAjaxResponse);
                    }
                });
            }
        }
    })
};

exports.getAllUser = function(callback){
    console.log("login Authentication");
    var db = require('./mongodbService').getdb();
    var accountsTable = db.collection('accounts');

    //userAuthen
    var list = accountsTable.find({active:true});
    console.log(list.length);
   accountsTable.find().toArray(function(err, docs) {
        callback(err,docs);
    });
};

