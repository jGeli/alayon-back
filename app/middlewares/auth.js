const { User } = require('../models/user.model');
const { Entity } = require('../models/entity.model');

const authJwt = (req, res, next) => {
 let accessToken = req.cookies.authToken;

 if (
    req.headers.authorization
     && req.headers.authorization.startsWith('Bearer ')
  ) {
   let idToken = req.headers.authorization.split('Bearer ')[1];
    User.findByToken(idToken, async (err, user) => {
         if (err) throw err;
         if (!user) return res.status(400).json({ message: "Unauthorized!", isAuth: false, error: true })
         let ent = await Entity.findOne({ user: user._id });

        await User.populate(user, {path: "location"});
         req.token = idToken
         req.userId = user._id
         req.user = user;

         req.entityId = user.entity.length !== 0 ? user.entity[0]._id : null;
         return next();
        });


} else if(accessToken) {
    User.findByToken(accessToken, async (err, user) => {
         if (err) throw err;
         if (!user) return res.status(400).json({ message: "Unauthorized!", isAuth: false, error: true })
         let ent = await Entity.findOne({ user: user._id });
         await User.populate(user, {path: "location"});

         req.token = accessToken
         req.userId = user._id
         req.user = user;
        //  req.entityId = ent ? ent._id : null;
        req.entityId = user.entity.length !== 0 ? user.entity[0]._id : null;

         return next();
        });
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized' });
  }
}

module.exports = { authJwt }