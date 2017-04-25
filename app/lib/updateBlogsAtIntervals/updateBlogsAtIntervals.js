const updateBlogsInDB = require('./updateBlogsInDB')

const updateBlogsAtIntervals = (mongodbUri, interval) => {
  setInterval(() => {
    const time = new Date()
    console.log(time.toLocaleString())
    updateBlogsInDB(mongodbUri)
  }, interval * 1000)
}

module.exports = updateBlogsAtIntervals
