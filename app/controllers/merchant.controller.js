const { Merchant } = require('../models/merchant.model');
 

const {
    validateSetupData
  } = require("../utils/Validators");



exports.handleMerchantDetails = async (req, res) => {

    const { valid, errors } = validateSetupData(req.body);
    if (!valid) return res.status(400).json(errors);

    Store.create(req.body).then(doc => {
        console.log(doc);

        return res.status(200).json(doc)
    })
    .catch(err => {
        return res.status(400).json(err)
    })

}
