const getLatestPostIdFromDB = require('./getLatestPostIdFromDB')
const getPrevPostId = require('./getPrevPostId')
const getPostDate = require('./getPostDate')
const getPostTitle = require('./getPostTitle')
const insertPostToDB = require('./insertPostToDB')
const postDistributorDB = require('./postDistributorDB')
const writers = require('./writers.json')

const updateBlogsInDB = async (mongodbUri) => {
  const collection = 'blogs'

  Object.keys(writers).forEach(async (group) => {
    let postId = await getLatestPostIdFromDB(mongodbUri, collection, group)
    while (postId) {
      postId = await getPrevPostId(postId)
      if (postId) {
        const postDate = await getPostDate(postId)
        const postTitle = await getPostTitle(postId)
        const post = { id: postId, date: postDate, title: postTitle }
        console.log(`The updated post: {id: ${post.id}, date: ${post.date}, title: ${post.title}}`)
        await insertPostToDB(mongodbUri, collection, group, '', 0, post)
        await postDistributorDB(mongodbUri, collection, group, post)
      }
    }
  })
}

module.exports = updateBlogsInDB
