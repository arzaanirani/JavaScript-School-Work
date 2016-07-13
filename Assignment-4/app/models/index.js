//Defining database associations and syncing the tables
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

var DB_NAME = 'testDb';
var DB_USERNAME = 'arzaan'
var DB_PASSWORD = 'arzaan123'


var sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db/db.sqlite'
});


var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

db.Test.hasMany(db.Question);
db.Question.hasMany(db.Choice);
db.sequelize = sequelize;
db.Question.hasMany(db.Response);
db.Choice.hasMany(db.Response);
db.Users.hasMany(db.Response);

db.Question.hasMany(db.HintRequest);
db.Users.hasMany(db.HintRequest);
db.Choice.hasMany(db.HintRequest);

db.Users.sync();
db.Test.sync();
db.Question.sync();
db.Choice.sync();
db.Response.sync();
db.HintRequest.sync();

module.exports = db;
