/**
 * Created by LocNT on 7/22/2014 1:11 AM.
 */

var express = require('express');
var router = express.Router();
var homeService = require('../services/homeService');
var accountModel = require('../model/accountModel');

/* GET login listing. */
router.get('/', function(req, res) {
    //check login
    if(typeof(req.session.username) != 'undefined'){
        res.redirect("/dashboard");
    }else {
        res.render('home/login', {title: "Login"});
    }
});

/*Login*/
router.post('/loginAuthen', function(req, res) {
    var username = req.body.username || 'Anonymous';
    var password = req.body.password || '';

    //account.id = undefined;
    homeService.loginAuthen({username:username,password:password},function(error){
        if(error){
            res.render('home/login', {title: "Login",errorLogin:error});
        }else{
            req.session.username = username;
            res.redirect("/dashboard")
        }
    });
});

router.get('/loginAuthen', function(req, res) {
    res.redirect("/");
});

/*Logout*/
router.get('/logout', function(req, res) {
    //check login
    if(typeof(req.session.username) != 'undefined'){
        delete req.session.username;
    }
    res.redirect("/");
});

/*Dashboard*/
router.get('/dashboard', function(req, res) {
    //check login
    if(typeof(req.session.username) != 'undefined'){
        res.render('dashboard/dashboard',{title:"Dashboard",username:req.session.username});
    }else{
        res.redirect("/");
    }
});

router.get('/register', function(req, res) {
    var account = accountModel.newAccount();
    res.render('home/profile',{title:"Register",account:account});
});

router.post('/saveAccount', function(req, res) {
    var fullname = req.param("fullname");
    var email = req.param("email");
    var username = req.param("username");
    var password = req.param("password");
    var role = "CUSTOMER";
    var active = true;
    var account = accountModel.newAccount(fullname,email,username,password,role,undefined,active);

    //account.id = undefined;
    homeService.addNewAccount(account,function(accountAjaxResponse){
        res.send(accountAjaxResponse, 200);
    });
});

router.get('/saveAccount', function(req, res) {
    res.redirect("/");
});

router.get('/change-password', function(req, res){
    var userCurrent = req.session.username;
    //check login
    if(userCurrent == undefined){
        res.redirect("/");
    }else{
        res.render('dashboard/change-password',{title:"Dashboard",username:req.session.username});
    }
});

router.post('/saveChangePassword', function(req, res) {
    var oldPassword = req.param("oldPassword");
    var newPassword = req.param("newPassword");
    var username = req.session.username;

    //account.id = undefined;
    homeService.saveChangePassword({username:username,oldPassword : oldPassword, newPassword:newPassword},function(accountAjaxResponse){
        res.send(accountAjaxResponse, 200);
    });
});

router.get('/saveChangePassword', function(req, res) {
   res.redirect("/");
});

router.get('/change-rule-user', function(req, res){
    var userCurrent = req.session.username;
    //check login
    if(userCurrent == undefined){
        res.redirect("/");
    }else{
       homeService.getAllUser(function(error,result){
            res.render('dashboard/change-rule-user',{title:"Dashboard",username:req.session.username,listuser : result});
        });

    }
});

module.exports = router;
