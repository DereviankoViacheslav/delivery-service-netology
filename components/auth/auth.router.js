const express = require('express');
const passport = require('passport');
const UserModule = require('../user/user.module');
const { hashHelper } = require('../../helpers');
const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log('POST /api/signup -> req.body ===>>>', req.body);
  const { password, ...userData } = req.body;
  const passwordHash = hashHelper.getHashedData(password);
  try {
    const user = await UserModule.create({ passwordHash, ...userData });
    const { passwordHash: _, ...data } = user.toObject();
    return res.status(200).json(data);
  } catch (error) {
    console.log('POST /api/signup -> error ===>>>', error);
    return res.status(400).json({
      error: 'email занят',
      status: 'error'
    });
  }
});

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  }),
  async (req, res) => {
    console.log('POST /api/signin -> req.body ===>>>', req.body);
    const { password, email } = req.body;
    const passwordHash = hashHelper.getHashedData(password);
    try {
      const user = await UserModule.findOne(email, passwordHash);
      if (user) return res.status(200).json(user);
      return res.status(404).json({
        error: 'Неверный логин или пароль',
        status: 'error'
      });
    } catch (error) {
      console.log('POST /api/signin -> error ===>>>', error);
      return res.status(500).json({
        error,
        status: 'error'
      });
    }
  }
);

module.exports = router;
