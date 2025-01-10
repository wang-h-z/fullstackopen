import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
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

    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeVisible();
 
    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull();
  });

test('url and likes are shown when view button is pressed', async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} user={user} addLike={mockHandler} deleteBlog={mockHandler} />)
  
    const userEventHandler = userEvent.setup()
  
    const viewButton = screen.getByText('view')
    expect(viewButton).toBeInTheDocument()
  
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument()
  
    await userEventHandler.click(viewButton)
  
    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
})
  