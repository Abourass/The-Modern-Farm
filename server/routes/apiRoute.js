const Router = require('@koa/router');
const MessageController = require('../controllers/messageController');

const router = new Router();

router.prefix('/api'); // Create route prefix for this file
router.post('/sms',  MessageController.sendSMS);
router.post('/email',  MessageController.sendEmail);
router.post('/confirmation', MessageController.sendConfirmation);
router.post('/forgot', MessageController.forgotPassword);
router.post('/twoFactor', MessageController.twoFactor);

module.exports = router;
