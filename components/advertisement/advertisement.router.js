const express = require('express');
const AdvertisementModule = require('./advertisement.module');
const {
  multerMiddleware,
  isAuthenticatedMiddleware
} = require('../../middlewares');
const router = express.Router();

router.get('/', isAuthenticatedMiddleware, async (req, res) => {
  try {
    const advertisements = await AdvertisementModule.find();
    return res.status(200).json({ data: advertisements, status: 'ok' });
  } catch (error) {
    console.log('GET /api/advertisements -> error ===>>>', error);
    return res.status(500).json({
      error,
      status: 'error'
    });
  }
});

router.post(
  '/',
  isAuthenticatedMiddleware,
  multerMiddleware.array('images'),
  async (req, res) => {
    const { tags, ...data } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];
    const result = {
      tags: tags.split(', '),
      ...data,
      images
    };
    try {
      const advertisement = await AdvertisementModule.create(result);
      return res.status(201).json(advertisement);
    } catch (error) {
      console.log('POST /api/advertisements -> error ===>>>', error);
      return res.status(500).json({
        error,
        status: 'error'
      });
    }
  }
);

router.get('/:advertisementId', async (req, res) => {
  try {
    const advertisement = await AdvertisementModule.findById(
      req.params.advertisementId
    );
    if (advertisement)
      return res.status(200).json({ data: advertisement, status: 'ok' });
    return res.status(404).json({ data: advertisement, status: 'ok' });
  } catch (error) {
    console.log('GET /api/advertisements -> error ===>>>', error);
    return res.status(500).json({
      error,
      status: 'error'
    });
  }
});

router.delete(
  '/:advertisementId',
  isAuthenticatedMiddleware,
  async (req, res) => {
    try {
      await AdvertisementModule.remove(req.params.advertisementId);
      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.log('GET /api/advertisements -> error ===>>>', error);
      return res.status(500).json({
        error,
        status: 'error'
      });
    }
  }
);

module.exports = router;
