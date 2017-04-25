const simpleRequestPromise = require('../simpleRequestPromise')
const cheerio = require('cheerio')

const getPrevPostId = async (postId) => {
  const postUrl = `http://www2.ske48.co.jp/blog_pc/detail/id:${postId}/`
  const body = await simpleRequestPromise(postUrl)
  const $ = cheerio.load(body, { decodeEntities: false })
  const prevPostId = $('a.prev').attr('href').slice(19, -1)
  return prevPostId
}

module.exports = getPrevPostId
