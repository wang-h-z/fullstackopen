const lodash = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const blog = blogs.reduce((favourite, current) =>
    favourite.likes > current.likes ? favourite : current
  )
  return { title: blog.title, author: blog.author, likes: blog.likes };
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = lodash.countBy(blogs, 'author')
  const topAuthor = lodash.maxBy(lodash.toPairs(authorCounts), pair => pair[1]);
  return { author: topAuthor[0], blogs: topAuthor[1] };
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const groupedByAuthor = lodash.groupBy(blogs, 'author');

  const likesByAuthor = lodash.map(groupedByAuthor, (blogs, author) => {
    const totalLikes = lodash.sumBy(blogs, 'likes');
    return { author, likes: totalLikes };
  });

  const topAuthor = lodash.maxBy(likesByAuthor, 'likes');

  return topAuthor;
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}