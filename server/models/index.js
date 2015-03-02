var db = require('../db');
var bluebird = require('bluebird');

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");

//Establish database connection
 var sequelize = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  define:   {
    id:false,
    timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

//Create tables
var Messages = sequelize.define('messages', {
  text: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  roomname: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  }, 

});

var Friends = sequelize.define('friends', {
  username: {
    type: Sequelize.STRING
  },
  friend: {
    type: Sequelize.STRING
  }

});


module.exports = {
  messages: {
    get: function (req, res) {
      var order = req.query.order;
      var room = req.query.where || "lobby";
      var max = req.query.max || 10;

      Messages.findAll({limit: max, order: 'createdAt DESC', where: {roomname: room}}).then(function(messages) {
        res.end(JSON.stringify(messages));
      }); 
  }, // a function which produces all the messages
    post: function (req, res) {

      Messages.sync().then(function () {
        return Messages.create({
          username: req.body.username,
          text: req.body.text,
          roomname: req.body.roomname
        });
      });
      res.status(200);
      res.writeHead(200);
      res.end(JSON.stringify({ObjectID: 1}));
  
    } // a function which can be used to insert a message into the database
  },

  friends: {
    // Ditto as above.
    get: function (req, res) {
       
      Friends.findAll({where: {username: req.query.username}}).then(function(friends) {
        console.log('found friends:' + friends);
        res.end(JSON.stringify(friends));
      });

    },
    post: function (req, res) {
      
      Friends.sync().then(function () {
        return Friends.create({
        username: req.body.username,
        friend: req.body.friend
        });
        res.status(200);
        res.writeHead(200);
        res.end(JSON.stringify({ObjectID: 1}));
      });
    }
  }
};

