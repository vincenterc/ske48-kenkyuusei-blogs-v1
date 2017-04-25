const port = process.env.PORT || 3001
const dbUsername = process.env.MLAB_SKE48BLOGS_USERNAME
const dbPassword = process.env.MLAB_SKEB48LOGS_PASSWORD
const dbUrl = process.env.MLAB_SKE48BLOGS_URL || 'localhost:27017/ske48blogs'
const mongodbUri = dbUsername ? `mongodb://${dbUsername}:${dbPassword}@${dbUrl}`
                              : `mongodb://${dbUrl}`

module.exports = {
  port,
  mongodbUri,
}
