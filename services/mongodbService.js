/**
 * Created by LocNT on 7/22/2014.
 */
var MongoClient = require('mongodb').MongoClient;

exports.initdb = function() {
    MongoClient.connect("mongodb://locnt:123456@ds063140.mongolab.com:63140/locnt9889-mongodb-nodejs", function(err, dbNew) {
        if(err) { return console.dir(err); }
        console.log("log connetct");
        db = dbNew;
        return dbNew;
    });

}

exports.getdb = function(){
    return db;
};

exports.db;