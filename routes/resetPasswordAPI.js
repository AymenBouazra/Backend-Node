const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Token = require('../models/tokenSchema')
const Company = require('../models/CompanySchema');

router.post('/reset-passowrd', async (req, res) => {
  let passwordResetToken = await Token.findOne({ token: req.body.token });
  if (!passwordResetToken) {
    res.status(400).json({ message: "Invalid or expired password reset token" });
  } else {
    const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
    console.log(isValid);
    if (!isValid) {
      res.status(400).json({ message: "Invalid or expired password reset token" });
    } else {
      const bcryptSalt = process.env.BCRYPT_SALT;
      const hash = await bcrypt.hash(req.body.password, Number(bcryptSalt));
      await Company.updateOne(
        { _id: passwordResetToken.companyId },
        { $set: { password: hash } },
        { new: true }
      );
      const company = await Company.findById(passwordResetToken.companyId);

      await passwordResetToken.deleteOne();
      // console.log(passwordResetToken);
      // res.json({message : 'Successfully reseted'})
    }

  }

})

module.exports = router;