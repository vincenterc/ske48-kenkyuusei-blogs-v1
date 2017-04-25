const simpleRequestPromise = require('../simpleRequestPromise')
const cheerio = require('cheerio')

const getPostTitle = async (postId) => {
  const postUrl = `http://www2.ske48.co.jp/blog_pc/detail/id:${postId}/`
  const body = await simpleRequestPromise(postUrl)
  const $ = cheerio.load(body, { decodeEntities: false })
  const postTitle = $('div.unitBlog > div > h3').html()
  return postTitle
}

module.exports = getPostTitle
