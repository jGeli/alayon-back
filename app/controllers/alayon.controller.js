const { User } = require('../models/user.model');


const {
    validateSignupData,
    validateLoginData,
  } = require("../utils/Validators");







exports.signup = async (req, res) => {
    const { valid, errors } = validateSignupData(req.body);
    if (!valid) return res.status(400).json(errors);

 const user = new User(req.body);

    await user.save()
    .then(docs => {
        return res.cookie('authToken', docs.accessToken).status(200).json(docs)
    })
    .catch(err => {
        console.log(err)
        return res.status(422).json({errors:err})
    })

}


exports.signin = (req, res) => {

    const { valid, errors } = validateLoginData(req.body);
    if (!valid) return res.status(400).json(errors);


User.findOne({ 'email': req.body.email}, (err, user) => {
if (!user) {
 return res.status(404).json({ success: false, message: 'User email not found!' });
 } else {
 user.comparePassword(req.body.password, (err, isMatch) => {
 //isMatch is eaither true or false
 if (!isMatch) {
 return res.status(400).json({ success: false, message: 'Wrong Password!' });
} else {
 user.generateToken((err, user) => {
 if (err) {
 return res.status(400).send({ err });
} else {
 //saving token to cookie
 console.log(user.accessToken)
 res.cookie('authToken', user.accessToken).status(200).json(user)
}
});
}
});
 }
});
}


exports.uploadImage = (req, res) => {

    console.log(req)







return res.send({message: 'Success'})



    



}