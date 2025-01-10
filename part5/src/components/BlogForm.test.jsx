import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('creating a blog calls the the event handler and a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog}/>)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const saveButton = screen.getByText('save')

    await user.type(titleInput, 'testTitle')
    await user.type(authorInput, 'testAuthor')
    await user.type(urlInput, 'testURL.com')
    await user.click(saveButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testURL.com',
      });
})