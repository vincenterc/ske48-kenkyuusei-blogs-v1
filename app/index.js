const Koa = require('koa')
const Pug = require('koa-pug')
const staticServer = require('koa-static')
const path = require('path')
const router = require('./router')
const { port, mongodbUri } = require('./config/index')
const { updateBlogsAtIntervals } = require('./lib/index')

const app = new Koa()

// Static file serving middleware
app.use(staticServer(path.join(__dirname, 'public')))

// Template: pug
const pug = new Pug({
  viewPath: __dirname,
})
pug.use(app)

// Router
app.use(router.routes())
   .use(router.allowedMethods())

// start a server
app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Listening on port: ${port}`)
  }
})

// Update blogs of ske48 kenkyuusei
const interval = 60 * 60 // seconds
updateBlogsAtIntervals(mongodbUri, interval)
