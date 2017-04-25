const MongoClient = require('mongodb').MongoClient
const mongodbUri = require('../config/index').mongodbUri

const collection = 'blogs'

/**
 *Get the writers by generation
 *
 *@param {Number} generation
 *@return {Array} results
 */
const getWriters = async (generation) => {
  const db = await MongoClient.connect(mongodbUri)
  const col = db.collection(collection)

  // writers = [{ writer: 'writer', name: 'name'}, ...]
  const writers = await col.find({ generation }, { _id: 0, generation: 0, posts: 0 })
                           .sort({ writer: 1 })
                           .toArray()

  db.close()
  // newWriters = [{ writer: '...', jpnName: '...', engName: '...' }]
  const newWriters = writers.map((value) => {
    value.jpnName = value.name
    delete value.name
    const tempEngName = value.writer.toUpperCase()
    const tempStringArray = tempEngName.split('_')
    value.engName = `${tempStringArray[1]} ${tempStringArray[0]}`
    return value
  })
  return newWriters
}

/**
 *Get titles of the post list by writer
 *
 *@param {String} writer
 *@return {Object} postList
 */
const getPostList = async (writer) => {
  const db = await MongoClient.connect(mongodbUri)
  const col = db.collection(collection)

  // postList = { writer: 'writer', name: 'name',
  //              posts: [{id: 'postId', date: 'postDate', title: 'postTitle' }, ...] }
  const results = await col.aggregate([
    { $match: { writer } },
    { $unwind: '$posts' },
    { $sort: { 'posts.id': -1 } },
    { $group: {
      _id: '$_id',
      writer: { $first: '$writer' },
      name: { $first: '$name' },
      posts: { $push: '$posts' },
    } },
  ]).toArray()
  const postList = results[0]
  db.close()
  return postList
}

module.exports = {
  getWriters,
  getPostList,
}
