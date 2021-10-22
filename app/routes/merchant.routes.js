const controller = require("../controllers/merchant.controller");
const { authJwt } = require("../middlewares/auth");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next();
  });



//POST
app.get(
  "/api/merchant/details",
  [authJwt],
  controller.handleMerchantDetails
)


}
