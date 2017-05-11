const updateBlogsInDB = require('./updateBlogsInDB')

const updateBlogs = (mongodbUri) => {
  const time = new Date()
  console.log(time.toLocaleString())
  updateBlogsInDB(mongodbUri)
}

const updateBlogsAtIntervals = (mongodbUri, interval) => {
  updateBlogs(mongodbUri)
  setInterval(() => {
    updateBlogs(mongodbUri)
  }, interval * 1000)
}

module.exports = updateBlogsAtIntervals
