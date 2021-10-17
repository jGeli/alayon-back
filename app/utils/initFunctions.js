const { UserType } = require('../models/userType.model');


exports.initData = () => {
    const types = ['User', 'Rider', 'Admin', 'Merchant', 'Support'];
    types.forEach(a => {
        UserType.findOneAndUpdate({ name: a}, { name: a}, { upsert: true })
        .then(ab => {
            console.log(ab)
        })
        .catch(err => {
            console.log(err)
        })
    })
}