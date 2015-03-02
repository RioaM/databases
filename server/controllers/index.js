var models = require('../models');
var bluebird = require('bluebird');
var dbindex = require('../db');



module.exports = {
  messages: {
    get: function (req, res) {
      //Connect to database
      var dbconnect = dbindex.dbConnection();
      dbconnect.connect();

      //Get the get data
      var order = req.query.order;
      var where  = req.query.where || "lobby";
      var max  = req.query.max || 100;
      
      var data = dbconnect.query('SELECT * FROM messages WHERE roomname ="' + 
        where + '" ORDER BY createdAt DESC LIMIT ' + max, function(err, results) {
           if(err) {console.log('get failed:' + err);}
           res.end(JSON.stringify(results));
      });
      dbconnect.end();


    }, // a function which handles a get request for all messages
    post: function (req, res) {

      var data = "";
  
      var username = req.body.username;
      var text = req.body.text;
      var roomname = req.body.roomname;

      //Create a database connection
      var dbconnect = dbindex.dbConnection();
      dbconnect.connect();
        
      dbconnect.query('INSERT INTO messages VALUES ("'+ username + '", "' + text + 
        '", "' + roomname + '", now())', function(err, result) {if(err){conole.log(err);}});
      dbconnect.end();
      res.status(200)
      res.writeHead(200);
      res.end(JSON.stringify({ObjectID: 1}));
    }
  },

  friends: {
    // Ditto as above
    get: function (req, res) {
      //Connect to database
      var dbconnect = dbindex.dbConnection();
      dbconnect.connect();
       
      //Get the get data
      var username = req.query.username;

      var data =  dbconnect.query('SELECT friend FROM friends WHERE username ="' + username + '"',
        function(err, results) {
           res.end(JSON.stringify(results));
      });
      dbconnect.end();

    },
    post: function (req, res) {
      //Get the data
      var username = req.body.username;
      var friend = req.body.friend;

       //Create a database connection
       var dbconnect = dbindex.dbConnection();
       dbconnect.connect();
       dbconnect.query('INSERT INTO friends VALUES ("'+ username + '", "' + friend + '")');
       dbconnect.end();
       res.status(200)
       res.writeHead(200);
       res.end(JSON.stringify({ObjectID: 1}));
    }
  }
};

