const Router = require('koa-router')
const ske48KenkyuuseiBlogs = require('./ske48KenkyuuseiBlogs/index')

const router = new Router()

router.get('/', (ctx) => {
  ctx.redirect('/ske48_kenkyuusei_blogs')
})

router.use(ske48KenkyuuseiBlogs.routes())

module.exports = router
