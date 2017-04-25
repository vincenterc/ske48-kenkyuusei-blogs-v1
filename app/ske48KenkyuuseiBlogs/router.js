const Router = require('koa-router')
const controller = require('./controller')

const router = new Router({
  prefix: '/ske48_kenkyuusei_blogs',
})

router.get('/:writer/:id', controller.postPage)

router.get('/:writer', controller.writerPage)

router.get('/', controller.indexPage)

module.exports = router
