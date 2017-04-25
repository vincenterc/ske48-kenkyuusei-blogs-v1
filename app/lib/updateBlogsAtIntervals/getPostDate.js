const simpleRequestPromise = require('../simpleRequestPromise')
const cheerio = require('cheerio')

const getPostDate = async (postId) => {
  const postUrl = `http://www2.ske48.co.jp/blog_pc/detail/id:${postId}/`
  const body = await simpleRequestPromise(postUrl)
  const $ = cheerio.load(body, { decodeEntities: false })
  const postDate = $('div.unitBlog > h3').html()
  return postDate
}

module.exports = getPostDate
