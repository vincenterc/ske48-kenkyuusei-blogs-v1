const { getWriters, getPostList } = require('../db/index')
const { getPostContent } = require('../lib/index')
const { pagination } = require('../lib/index')

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

  // set currentPage
  let currentPage = +ctx.query.page
  if (!ctx.query.page) currentPage = 1

  // pagination
  // (numOfData, numPerPage, currentPage) =>
  // {startIndex, endIndex, currentPage, previousPage,
  //  nextPage, firstPage, lastPage, numOfPages}
  const page = pagination(postList.posts.length, 20, currentPage)
  const posts = postList.posts.slice(page.startIndex, page.endIndex)

  // handel the error when currentPage is bigger than lastPage
  if (currentPage > page.lastPage) {
    return ctx.redirect(`/ske48_kenkyuusei_blogs/${writer}/?page=${page.lastPage}`)
  }

  await ctx.render('./ske48KenkyuuseiBlogs/writer.pug', {
    title: `SKE48 BLOGS | ${postList.name}`,
    writers7,
    writers8,
    postList,
    page,
    posts,
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
