const { User } = require('../models/user.model')
const { UserType } = require('../models/userType.model');

const checkDuplicateMobile = (req, res, next) => {

  // Username
  User.findOne({
    phone: req.body.phone
  }).then(user => {
    if (user) {
      return res.status(400).json({ phone: "Failed! Mobile is already in use!" })
    } else {
      next();
    }
  })
    .catch(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    })

};

const checkDuplicateEmail = (req, res, next) => {

  // Username
  User.findOne({
    email: req.body.email
  })
    .then(usr => {
      if (usr) {
        return res.status(400).json({ email: "Failed! Email is already in use!" })
      } else {
        next();
      }
    })
    .catch(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    })

};

module.exports = { checkDuplicateMobile, checkDuplicateEmail }