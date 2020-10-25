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

const dashboard_path = config.GrafanaDashboardPath 
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

    it('should create a configuration of data source', async () => {
        // Click on Configuration
        await click(page, '.sidemenu__top > .sidemenu-item:nth-child(6)')

        // Click on Data sources
        // await page.waitForSelector('.sidemenu__top > .sidemenu-item:nth-child(5) > .dropdown-menu > li:nth-child(2) > a')
        // await page.click('.sidemenu__top > .sidemenu-item:nth-child(5) > .dropdown-menu > li:nth-child(2) > a')

        //Click on Add data source
        await click(page, '[aria-label="Call to action button Add data source"]')
        //await page.waitFor(5000)

        // Click on Postgresql option
        await click(page, "[aria-label='Data source plugin item PostgreSQL']")
        //await page.waitFor(5000)

        // Insert the Host
        await typeText(page, 'fadi-postgresql:5432', "[placeholder='localhost:5432']")

        //Inser the database name
        await typeText(page, 'postgres', "[placeholder='database name']")

        //Insert the user name
        await typeText(page, 'admin', "[placeholder='user']")

        //Insert the password
        await typeText(page, 'password1', "[placeholder='Password']")

        // Disable SSL mode
        await click(page, 'ds-config-postgres > .gf-form-group > .gf-form > .max-width-15 > .gf-form-input')
        await page.select('ds-config-postgres > .gf-form-group > .gf-form > .max-width-15 > .gf-form-input', 'string:disable')

        // Choose the version
        await click(page, 'ds-config-postgres > .gf-form-group > .gf-form > .gf-form-select-wrapper > .gf-size-auto')
        await page.select('ds-config-postgres > .gf-form-group > .gf-form > .gf-form-select-wrapper > .gf-size-auto', 'number:1000')

        // Click on Save and test
        await click(page, '.page-container > div > form > .gf-form-button-row > .btn-primary')

    })

    it('import a Grafana dashboard on the Templates views ', async () => {

        // Click on dashboard menu
        await click(page, '.sidemenu__top > .sidemenu-item:nth-child(2)')

        //click on Manage dashboard
        await click(page, '.sidemenu__top > .sidemenu-item:nth-child(2) > .dropdown-menu > li:nth-child(4) > a')

        //Click on Import Dashboard
        await click(page, 'body > grafana-app > div > div > react-container > div > div > div.view > div > div.page-container.page-body > div:nth-child(1)')

        // select the approapriate template
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('.view > .page-scrollbar-content > .page-container > .css-lq6a48 > .css-1vlnne-button'), // some button that triggers file selection
        ]);
        await fileChooser.accept([dashboard_path]);

        // Confirm the Import
        await click(page, 'body > grafana-app > div > div > react-container > div > div > div.view > div > div.page-container.page-body > form > div.css-61y8vr > div:nth-child(1)')
        await page.waitFor(20000)

        await page.screenshot({
            path: './files/Grafana_screenshot.jpg',
            fullPage: true
        });
    })
})