const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }
]

const newBlog = {
    title: 'New Blog',
    author: 'Jane Doe',
    url: 'http://example.com/new',
    likes: 7
};

const blogWithoutLikes = {
    title: 'Default Likes Blog',
    author: 'John Doe',
    url: 'http://example.com/default'
};

const blogsMissingFields = [
    { author: 'John Doe', url: 'http://example.com', likes: 10 },  // missing title
    { title: 'Missing URL', author: 'Jane Doe', likes: 5 },         // missing url
];

const nonExistingId = async () => {
    const blog = new Blog({ title: 'Temp Blog', author: 'Temp Author', url: 'http://temp.com' });
    await blog.save();
    await blog.deleteOne(); 
    return blog._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    newBlog,
    blogWithoutLikes,
    blogsMissingFields,
    nonExistingId,
    usersInDb
}
