const controller = require("../controllers/location.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next();
  });


//POST

  app.post(
    "/update-location",
    controller.updateLocation
  );


//GET
app.get(
  "/pusher/auth",
  controller.pusherAuth
)


}