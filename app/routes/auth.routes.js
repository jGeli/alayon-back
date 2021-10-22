const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares/auth");
const upload = require('../middlewares/upload');


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

  app.post(
    "/api/auth/upload",
    [upload.single('file')],
    controller.uploadImage
  );
  



//GET
app.get(
  "/api/auth",
  [authJwt],
  controller.getAuth
)


}
