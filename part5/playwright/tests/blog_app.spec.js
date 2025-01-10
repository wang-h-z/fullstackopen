const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addDefaultTestBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
            }
        })

        await page.goto('http://localhost:5173')
    })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong')

        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
        await addDefaultTestBlog(page)

        await expect(page.getByText('Test Title Test Author')).toBeVisible()
    })

    test('an existing blog can be liked', async ({ page }) => {
    await addDefaultTestBlog(page)
    await page.getByText('Test Title Test Author').waitFor()

    const viewButtons = await page.getByRole('button').all();
    const testButton = viewButtons[viewButtons.length - 1];
    await testButton.click();

    const likeButton = await page.getByRole('button', { name: 'like' });
    await expect(likeButton).toBeVisible();

    await likeButton.click();
    const likesElement = await page.getByText('likes 1');
    await expect(likesElement).toBeVisible();
    })
    
  })
})
