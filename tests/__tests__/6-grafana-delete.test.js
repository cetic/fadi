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

//Specify the url using env
var env = require('node-env-file');
env('./.env');
const url = process.env.GRAFANA_URL

//const utils = require('../lib/utils')

describe('Test the authentification to the Grafana service', () => {
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
    it('should authentificate to the Grafana index page', async () => {
        // Go to the indicated page 
        await page.goto(url)
        await shouldExist(page, '#login-view')

        // Login to the Grafana service
        await typeText(page, 'admin', '[name=user]')
        await typeText(page, 'password1', '[name=password]')
        await click(page, '[aria-label="Login button"]')
        await shouldExist(page, '.sidemenu__logo')
    })

    it('should delete a configuration of data source', async () => {
        // Click on the configuration menu 
        await click(page, '.sidemenu__top > .sidemenu-item:nth-child(6)')

        // Select the postgresql data source
        await click(page, '.card-section > .card-list > .card-item-wrapper > .card-item > .card-item-body')

        // Click on the delete button
        await click(page, '.page-container > div > form > .gf-form-button-row > .btn-danger')

        // Confirm the delete
        await click(page, '.modal-body > .modal-content > .confirm-modal-buttons > .btn-danger')

    })

    it('should delete a Grafana dashboard ', async () => {

        // Click on dashboard menu
        await click(page, '.sidemenu__top > .sidemenu-item:nth-child(3)')

        //click on Manage dashboard
        await click(page, '.sidemenu__top > .sidemenu-item:nth-child(3) > .dropdown-menu > li:nth-child(4) > a')

        // Check the dashboard to delete
        await shouldExist(page, '.css-1ljbtbg > .css-1umfglk > .css-s44s3q > .css-12xei9w > .css-7483ua')
        await click(page, '.css-1ljbtbg > .css-1umfglk > .css-s44s3q > .css-12xei9w > .css-7483ua')

        // Click on the delete button
        await click(page, '.css-61y8vr > .css-1xw4p59 > .css-11vdkcj-button > .css-1beih13 > span:nth-child(2)')

        // Confirm the delete
        await click(page, '.css-ief6ig > .css-1nrg97p > .css-11eaers-button > .css-1beih13 > span')

    })
})