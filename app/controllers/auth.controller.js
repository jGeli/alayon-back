const { User } = require('../models/user.model');
const { UserType } = require('../models/userType.model');


const {
    validateLoginData
  } = require("../utils/Validators");


exports.signin = async (req, res) => {
    const { valid, errors } = validateLoginData(req.body);
    if (!valid) return res.status(400).json(errors);
    let { id, type, loginType } = req.body;
    let usrType = await UserType.findOne({name: type});
    console.log(usrType)
    if(!usrType) return res.status(400).json({message: 'Something went wrong!'});
    let myUser = await User.findOne({ [loginType]: id}).populate('userType');
    if(!myUser){
        const user = new User({[loginType]: id, userType: usrType, ...req.body});
        await user.save()
        .then(docs => {
            return res.cookie('authToken', docs.accessToken).status(200).json(docs)
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({errors:err})
        })
    } else {
     myUser.generateToken((err, user) => {
            if (err) {
            return res.status(400).send({ err });
           } else {
            //saving token to cookie
            console.log(user.accessToken)
         return res.cookie('authToken', user.accessToken).status(200).json(user)
           }
        });
    }
}


exports.getAuth = async (req, res) => {
    
    console.log(req.user)
    return res.status(200).json(req.user);

}