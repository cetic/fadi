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

const url = config.GrafanaUrl
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
        await shouldExist(page, '.login-content')

        // Login to the Grafana service
        await typeText(page, 'admin', '[name=user]')
        await typeText(page, 'password1', '[name=password]')
        await click(page, '[type=submit]')
        await shouldExist(page, '.sidemenu__logo')
    })

    it('should delete a configuration of data source', async () => {
        // Click on the configuration menu 
        await click(page, '.sidemenu__top > .sidemenu-item > .sidemenu-link > .icon-circle > .gicon-cog')

        // Select the postgresql data source
        await click(page, '.card-section > .card-list > .card-item-wrapper > .card-item > .card-item-body')

        // Click on the delete button
        await click(page, '.page-container > div > form > .gf-form-button-row > .btn-danger')

        // Confirm the delete
        await click(page, '.modal-body > .modal-content > .confirm-modal-buttons > .btn-danger')

    })

    it('should delete a Grafana dashboard ', async () => {

        // Click on Dashboard menu
        await click(page, '.sidemenu > .sidemenu__top > .sidemenu-item:nth-child(2) > .sidemenu-link > .icon-circle')

        // Click on Manage section
        await click(page, '.sidemenu__top > .sidemenu-item:nth-child(2) > .dropdown-menu > li:nth-child(4) > a')

        // Check the dashboard to delete
        await shouldExist(page, '.search-item > .center-vh > gf-form-checkbox > .gf-form-switch-container > .gf-form-checkbox > .gf-form-switch__checkbox')
        await click(page, '.search-item > .center-vh > gf-form-checkbox > .gf-form-switch-container > .gf-form-checkbox > .gf-form-switch__checkbox')

        // Click on the delete button
        await click(page, '.search-results > .search-results-filter-row > .search-results-filter-row__filters > .gf-form-button-row > .btn-danger')

        // Confirm the delete
        await click(page, '.modal-body > .modal-content > .confirm-modal-buttons > .btn-danger')

    })
})