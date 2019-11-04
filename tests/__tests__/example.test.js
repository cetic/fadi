const puppeteer = require('puppeteer')
const config = require('../lib/config')
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const shouldNotExist = require('../lib/helpers').shouldNotExist

// const generateID = require('../lib/utils').generateID
// const generateEmail = require('../lib/utils').generateEmail
// const generateNumbers = require('../lib/utils').generateNumbers
const utils = require('../lib/utils')

describe('My first puppeteer test', () => {
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
    it('My first test step', async () => {
        // TODO
        await page.goto('https://dev.to')
        //await page.goto(config.baseUrl)
        //await loadUrl(page, config.baseUrl)
        await page.screenshot({ path: 'example.png' })
        //await page.waitForSelector('#nav-search')
        await shouldExist(page, '#nav-search')
        const url = await page.url()
        const title = await page.title()
        expect(url).toContain('dev')
        expect(title).toContain('Community')
    })
    // it('browser reload', async () => {
    //     await page.reload()

    //     //await page.waitForSelector('#page-content')
    //     await shouldExist(page, '#page-content')

    //     await waitForText(page, 'body', 'WRITE A POST')
    //     const url = await page.url()
    //     const title = await page.title()

    //     await page.waitFor(3000) // Bad practice!!!!

    //     expect(url).to.contain('dev')
    //     expect(title).to.contains('Community')
    // })
    // it(' click method', async () => {
    //     //await page.goto('https://dev.to')
    //     await loadUrl(page, config.baseUrl)

    //     // the both following lines are replaced with the next line.
    //     // await page.waitForSelector('#write-link')
    //     // await page.click('#write-link')
    //     await click(page, '#write-link')

    //     //await page.waitForSelector('.registration-rainbow')
    //     await shouldExist(page, '.registration-rainbow')
    //     await page.screenshot({ path: 'example2.png' })
    // })

    // it('submit searchbox', async () => {
    //     //await page.goto('https://dev.to')
    //     await loadUrl(page, config.baseUrl)

    //     // await page.waitForSelector('#nav-search')
    //     // await page.type('#nav-search', 'Javascript')
    //     //await typeText(page, 'Javascript', '#nav-search')
    //     //await typeText(page, generateID(15), '#nav-search')
    //     //await typeText(page, generateEmail(), '#nav-search')
    //     await typeText(page, utils.generateNumbers(), '#nav-search')
    //     //await page.keyboard.press('Enter')
    //     await pressKey(page, 'Enter')
    //     //await page.waitForSelector('#articles-list')
    //     await shouldExist(page, '#articles-list')
    //     //await shouldNotExist(page,'#sidebar-nav')
    //     await page.waitFor(5000)
    //     await page.screenshot({ path: 'example3.png' })
    // })
})