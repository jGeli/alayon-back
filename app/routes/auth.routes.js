const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares/auth");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next();
  });


//POST

  app.post(
    "/api/auth/signin",
    controller.signin
  );


//GET
app.get(
  "/api/auth",
  [authJwt],
  controller.getAuth
)


}
