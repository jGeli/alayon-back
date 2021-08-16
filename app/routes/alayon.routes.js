const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/alayon.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next();
  });


//POST
app.post(
  "/api/auth/signup",
    [verifySignUp.checkDuplicateEmail],
  controller.signup
);

  app.post(
    "/api/auth/signin",
    controller.signin
  );



}
