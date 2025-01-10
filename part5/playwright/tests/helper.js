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

export { loginWith, addDefaultTestBlog }