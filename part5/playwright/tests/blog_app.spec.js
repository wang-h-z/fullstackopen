const { test, expect, beforeEach, describe } = require('@playwright/test')

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
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'Login' }).click() 

        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'Login' }).click() 

        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'Login' }).click() 
    })
  
    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.locator('input#title-input').fill('Test Title');

        await page.locator('input#author-input').fill('Test Author');

        await page.locator('input#url-input').fill('http://testurl.com');

        await page.getByRole('button', { name: 'save' }).click()
        await expect(page.getByText('Test Title Test Author')).toBeVisible()
    })
  })
})