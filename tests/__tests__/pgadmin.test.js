const puppeteer = require('puppeteer')
//const jestpkg = require('jest')
const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const shouldNotExist = require('../lib/helpers').shouldNotExist

//const utils = require('../lib/utils')

describe('Test the Pgadmin service of the FADI platform', () => {  
    let browser
    let page

    beforeAll(async function () {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeout,
            args: ['--no-sandbox']
        })
        page = await browser.newPage()
        await page.setDefaultNavigationTimeout(config.waitingTimeout) //10 seconds is the industry standard
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
    })

    afterAll(async function () {
        await browser.close()
    })
    it('should show the login form', async () => {
        // Go to the indicated page 
        await page.goto('http://pgadmin.newtech4steel.cetic.be')
        // Check that the login_user_form exists
        await shouldExist(page, '[name=login_user_form]')
    })
    it('should login to the pgadmin service', async () => {
        // Check that the login_user_form exists
        await shouldExist(page, '[name=login_user_form]')
        // Enter the login 
        await typeText(page, 'pgadmin4@pgadmin.org', '[name=email]')
        // Enter the password
        await typeText(page, 'admin', '[name=password]')
        // Click on the login button 
        await click(page, "[value='Login']")
        // Check that the pgadmin logo exists
        await shouldExist(page, '.pgadmin_header_logo')
    })
})