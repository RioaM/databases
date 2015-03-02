var controllers = require('./controllers');
//var models = require('./models');
var router = require('express').Router();

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}

/*for (var route in models) {
  router.route("/" + route)
    .get(models[route].get)
    .post(models[route].post);
}*/


module.exports = router;

