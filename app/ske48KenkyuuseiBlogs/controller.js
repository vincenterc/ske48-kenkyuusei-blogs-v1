const { getWriters, getPostList } = require('../db/index')
const { getPostContent } = require('../lib/index')

// Post page
const postPage = async (ctx) => {
  const postId = ctx.params.id
  const writer = ctx.params.writer
  const writers7 = await getWriters(7)
  const writers8 = await getWriters(8)
  const postList = await getPostList(writer)

  // Get next/previous post id
  const postIds = postList.posts.map(post => post.id)
  const index = postIds.indexOf(postId)
  const nextPostId = postIds[index - 1]
  const previousPostId = postIds[index + 1]

  const postContent = await getPostContent(postId)
  ctx.render('./ske48KenkyuuseiBlogs/post.pug', {
    title: `SKE48 BLOGS | ${postList.name}`,
    writers7,
    writers8,
    postList,
    postContent,
    nextPostId,
    previousPostId,
  })
}

// Writer page
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

// Home page
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
