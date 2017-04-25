const getPostContent = require('../getPostContent')
const insertPostToDB = require('./insertPostToDB')
const writers = require('./writers.json')

/**
 *@param {String} group - which gruop to be distributed: ken7, ken81, ken82, ken83
 */
const distributor = async (mongodbUri, collection, group, post) => {
  let postTitle = post.title
  for (let i = 0; i < writers[group].length; i++) {
    for (let j = 0; j < writers[group][i].filter.length; j++) {
      // Use postContent to distribute if writer is 'yahagi_yukina' or 'fukai_negai',
      // otherwise, use postTitle
      if (writers[group][i].writer === 'yahagi_yukina'
          || writers[group][i].writer === 'fukai_negai') {
        const postContent = await getPostContent(post.id)
        if (postContent.indexOf(writers[group][i].filter[j]) !== -1) {
          await insertPostToDB(mongodbUri, collection, writers[group][i].writer,
                               writers[group][i].name, writers[group][i].generation, post)
          postTitle = ''
          break
        }
      } else if (postTitle.indexOf(writers[group][i].filter[j]) !== -1) {
        await insertPostToDB(mongodbUri, collection, writers[group][i].writer,
                             writers[group][i].name, writers[group][i].generation, post)
        postTitle = ''
        break
      }
    }
    if (!postTitle) {
      break
    }
  }
  if (postTitle) {
    await insertPostToDB(mongodbUri, collection, 'other', '', 0, post)
  }
}

module.exports = distributor
