const Router = require('@koa/router');
const authenticate = require('../middleware/authenticate.js');
const MessageController = require('../controllers/messageController');
const ClientController = require('../controllers/clientController');
const router = new Router();

router.prefix('/public'); // Create route prefix for this file
router.get('/', MessageController.find);         // GET /api/client
router.post('/auth', authenticate); // POST /api/auth
router.get('/authThem', ClientController.authAll);

module.exports = router;
