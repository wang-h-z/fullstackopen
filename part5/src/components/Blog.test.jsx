import { render, screen } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'http://test.com',
  likes: 1,
  user: {
    username: 'test.user@test.com',
    name: 'Test User',
  },
};

const user = {
  username: 'user@user.com',
  name: 'User',
};

test('renders title and author, but not url and likes by default', () => {
    render(<Blog blog={blog} user={user} />);
    
    expect(screen.getAllByText(`${blog.title} ${blog.author}`)[0]).toBeInTheDocument();
    expect(screen.getByText(blog.url)).not.toBeVisible();
    expect(screen.getByText(`likes ${blog.likes}`)).not.toBeVisible();
  });