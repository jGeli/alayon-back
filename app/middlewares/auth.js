const { User } = require('../models/user.model');

const authJwt = (req, res, next) => {
  

 let accessToken = req.headers.cookie.split('authToken=')[1];
 console.log(accessToken)
 if (
    req.headers.authorization
     && req.headers.authorization.startsWith('Bearer ')
  ) {
   let idToken = req.headers.authorization.split('Bearer ')[1];
    User.findByToken(idToken, async (err, user) => {
         if (err) throw err;
         if (!user) return res.status(400).json({ message: "Unauthorized!", isAuth: false, error: true })
         req.token = idToken
         req.userId = user._id
         req.user = user;
         return next();
        });


} else if(accessToken) {
    User.findByToken(accessToken, async (err, user) => {
         if (err) throw err;
         if (!user) return res.status(400).json({ message: "Unauthorized!", isAuth: false, error: true })

         req.token = accessToken
         req.userId = user._id
         req.user = user;
         return next();
        });
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized' });
  }
}

module.exports = { authJwt }