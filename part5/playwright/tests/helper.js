const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const addDefaultTestBlog = async (page) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.locator('input#title-input').fill('Test Title');
    await page.locator('input#author-input').fill('Test Author');
    await page.locator('input#url-input').fill('http://testurl.com');
    await page.getByRole('button', { name: 'save' }).click()
}

const viewMostRecentlyAddedBlog = async (page) => {
    const viewButtons = await page.getByRole('button').all();
    const testButton = viewButtons[viewButtons.length - 1];
    await testButton.click();
}

const logOut = async (page) => {
    await page.getByRole('button', { name: 'logout'}).click()
}

const loginAndGetToken = async (request) => {
    const response = await request.post('http://localhost:3003/api/login', {
        data: {
            username: 'mluukkai',
            password: 'salainen'
        }
    });
    const responseBody = await response.json();
    return responseBody.token;
}

const populateBlogs = async (page, request, token) => {
    for (let i = 0; i < 5; i++) {
        await request.post('http://localhost:3003/api/blogs', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
            title: `testTitle${i}`,
            author: `testAuthor${i}`,
            url: `testURL${i}.com`,
            likes: i
            }
        })
        await page.reload()
        await page.getByText(`testTitle${i} testAuthor${i}`).waitFor()
    }
}

export { loginWith, addDefaultTestBlog, viewMostRecentlyAddedBlog, logOut, populateBlogs, loginAndGetToken }