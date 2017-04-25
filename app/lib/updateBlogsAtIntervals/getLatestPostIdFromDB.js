const MongoClient = require('mongodb').MongoClient

const getLatestPostIdFromDB = async (mongodbUri, collection, group) => {
  const db = await MongoClient.connect(mongodbUri)
  const col = db.collection(collection)
  const results = await col.aggregate([
    { $match: { writer: group } },
    { $unwind: '$posts' },
    { $sort: { 'posts.id': -1 } },
  ]).limit(1).toArray()
  db.close()
  const postId = results[0].posts.id
  return postId
}

module.exports = getLatestPostIdFromDB
