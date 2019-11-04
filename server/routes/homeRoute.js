const Router = require('@koa/router');
const path = require('path');
const fs = require('fs-extra');
const router = new Router();

router.prefix('/'); // Create route prefix for this file
router.get('/', async(ctx, next) => {
  try {
    ctx.set('Content-type', 'text/html');
    const url = path.join(__dirname, '../', 'views', 'html', 'home.html');
    const html = fs.readFileSync(url);
    ctx.body = await html;
  } catch (err){
    console.error(err)
  }
}); // POST /api/auth
module.exports = router;
