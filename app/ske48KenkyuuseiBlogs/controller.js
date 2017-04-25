const { getWriters, getPostList } = require('../db/index')
const { getPostContent } = require('../lib/index')

const postPage = async (ctx) => {
  const postId = ctx.params.id
  const writer = ctx.params.writer
  const writers7 = await getWriters(7)
  const writers8 = await getWriters(8)
  const postList = await getPostList(writer)
  const postContent = await getPostContent(postId)
  ctx.render('./ske48KenkyuuseiBlogs/post.pug', {
    title: `SKE48 BLOGS | ${postList.name}`,
    writers7,
    writers8,
    postList,
    postContent,
  })
}

const writerPage = async (ctx) => {
  const writer = ctx.params.writer
  const writers7 = await getWriters(7)
  const writers8 = await getWriters(8)
  const postList = await getPostList(writer)
  await ctx.render('./ske48KenkyuuseiBlogs/writer.pug', {
    title: `SKE48 BLOGS | ${postList.name}`,
    writers7,
    writers8,
    postList,
  })
}

const indexPage = async (ctx) => {
  const writers7 = await getWriters(7)
  const writers8 = await getWriters(8)
  await ctx.render('./ske48KenkyuuseiBlogs/ske48KenkyuuseiBlogs.pug', {
    title: 'SKE48 KENKYUUSEI BLOGS',
    writers7,
    writers8,
  })
}

module.exports = {
  postPage,
  writerPage,
  indexPage,
}
