const upload = require('../middlewares/upload');
const controller = require("../controllers/alayon.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next();
  });

app.post(
  "/api/upload/merchant",
  [upload('image')],
  controller.uploadImage
);


}
