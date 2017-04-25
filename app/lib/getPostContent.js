const simpleRequestPromise = require('../lib/simpleRequestPromise')
const cheerio = require('cheerio')

const getPostContent = async (postId) => {
  const postUrl = `http://www2.ske48.co.jp/blog/detail/id:${postId}/`
  const body = await simpleRequestPromise(postUrl)
  const $ = cheerio.load(body, { decodeEntities: false })
  const postContent = $('div#blog_detail').html()

  return postContent
}

module.exports = getPostContent
