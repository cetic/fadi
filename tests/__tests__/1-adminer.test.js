const puppeteer = require('puppeteer')
const jestpkg = require('jest')
const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const shouldNotExist = require('../lib/helpers').shouldNotExist
const dragAndDrop = require('../lib/helpers').dragAndDrop
const Sequencer = require('@jest/test-sequencer').default

// 'http://adminer.newtech4steel.cetic.be'
const url = 'http://adminer.newtech4steel.cetic.be'
//const utils = require('../lib/utils')

describe('Test the authentification to the Adminer service', () => {
    /** @type {puppeteer.Browser} */
    let browser

    /** @type {puppeteer.Page} */
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
    it('should success the authentification process', async () => {
        // Go to the indicated page 
        await page.goto(url)

        // Click on the DBMS list
        await click(page, '.layout > tbody > tr > td > select')

        // Select the postgresql DBMS 
        await page.select('.layout > tbody > tr > td > select', 'pgsql')

        // Empty the server value content (usually 'db')
        await page.evaluate(() => document.querySelector(".layout > tbody > tr:nth-child(2) > td > input").value = "")

        // Insert the server name fadi-postgresql
        await typeText(page, 'fadi-postgresql', ".layout > tbody > tr:nth-child(2) > td > input")

        // Insert the user
        await typeText(page, 'admin', '.layout #username')

        // Insert password
        await typeText(page, 'password1', '.layout > tbody > tr:nth-child(4) > td > input')

        // insert the db name
        await typeText(page, 'postgres', '.layout > tbody > tr:nth-child(5) > td > input')

        // Click on the authentification 
        await click(page, '.ltr > #content > form > p > input')

        await page.waitFor(6000)

        // Check access to the authentification page
        const selector = await page.$('#content > h2')
        const text = await page.evaluate(selector => selector.textContent, selector);
        const result = text.includes('public')
        //console.log(text.includes('public'))
        expect(result).toBe(true)
    })

    it('should create a table', async () => {
        // Go to the indicated page 
        //await page.goto(url)

        // Click on SQL query button 
        await click(page, '.ltr > #menu > .links > a:nth-child(1)')

        // type the query
        await typeText(page, 'CREATE TABLE example_basic (measure_ts TIMESTAMP NOT NULL,temperature FLOAT (50));', '.ltr > #content > #form > p > .jush')

        // Execute the table creation query
        await click(page, '.ltr > #content > #form > p > input:nth-child(1)')

        // Check the creation of the table
        await shouldExist(page, '#content > p.message')
    })
})