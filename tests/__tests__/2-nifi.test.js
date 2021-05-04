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

const url = config.NifiUrl
const template_path = config.NifiTemplatePath

//const utils = require('../lib/utils')

describe('Test the upload template feature of Apache Nifi service', () => {  
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
    it('should show the Nifi dashboard', async () => {
        // Go to the indicated page 
        await page.goto(url)
        // Check that the nifi logo appears
        await shouldExist(page, '#nifi-logo')
    })

    it('click the template uploader', async () => {
        // check that the Operate frame appears
        await shouldExist(page, '#operation-control')
        // click on the 'Upload Template' button
        await click(page, '#operate-template-upload')
    })

    it('select the template to upload', async () => {
        // check that the upload template dialog appears
        await shouldExist(page, '#upload-template-dialog')
        
        // select the approapriate template
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('#select-template-button'), // some button that triggers file selection
            ]);
        await fileChooser.accept([template_path]);
    })

    it('upload the chosen template', async () => {
        // click on the 'upload' button
        await page.click('#canvas-body > #upload-template-dialog > .dialog-buttons > .button:nth-child(1)')
    })
    //TODO verify the button "unable to upload" is enabled - see https://github.com/cetic/fadi/issues/125
    
    // Click on the upload button 
    it('confirm the upload of the template', async () => {
        // check if the success upload template dialog appears
        await shouldExist(page, "#nf-ok-dialog")

        // check that the success message appears
        const shownMessage = await page.evaluate(() => {
            const string = 'Success';
            const selector = '#canvas-body > #nf-ok-dialog > .dialog-header > .dialog-header-text';
            return document.querySelector(selector).innerText.includes(string);
        });
        expect(shownMessage).toBe(true);
    })
})

describe('Test instantiating template of Apache Nifi service', () => {
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
    it('should show the Nifi dashboard', async () => {
        // Go to the indicated page 
        await page.goto(url)
        // Check that the nifi logo appears
        await shouldExist(page, '#nifi-logo')
    })

    it('drag and drop a template', async () => {
        // Upload the template 

        // TODO choose the appropriate one - see https://github.com/cetic/fadi/issues/126
        await shouldExist(page, '#template-component')
        await dragAndDrop(page, '#template-component')
        await shouldExist(page, '#instantiate-template-dialog')
        await click(page, '#instantiate-template-dialog > .dialog-buttons > .button:nth-child(1) > span')
        await page.waitFor(5000)

        // Unselect the template to active the configure button
        // await page.mouse.down();
        // await page.mouse.up();
        await page.mouse.click(700, 200, {
            button : 'right'
        });
    })

    it('configure a template', async () => {
        // click on the configure button 
        await click(page, '#operate-configure')

        // click on Controller services
        await shouldExist(page,'.settings-container > div > #process-group-configuration-tabs > .tab-pane > .tab:nth-child(2)')
        await click(page, '.settings-container > div > #process-group-configuration-tabs > .tab-pane > .tab:nth-child(2)')


        // click on 'configure' button of DBCP controller
        await shouldExist(page,'.settings-container > #process-group-configuration-tabs-content > #process-group-controller-services-tab-content > #process-group-controller-services-table > .slick-viewport > .grid-canvas > .ui-widget-content:nth-child(2) > .l6 > .pointer:nth-child(1)')
        await click(page, '.settings-container > #process-group-configuration-tabs-content > #process-group-controller-services-tab-content > #process-group-controller-services-table > .slick-viewport > .grid-canvas > .ui-widget-content:nth-child(2) > .l6 > .pointer:nth-child(1)')

        // Click on Properties tab
        await shouldExist(page,'#controller-service-configuration > .controller-service-configuration-tab-container > #controller-service-configuration-tabs > .tab-pane > .tab:nth-child(2)')
        await click(page, '#controller-service-configuration > .controller-service-configuration-tab-container > #controller-service-configuration-tabs > .tab-pane > .tab:nth-child(2)')

        // Click on Password tab
        await shouldExist(page,'.slick-viewport > .grid-canvas > .ui-widget-content:nth-child(6) > .slick-cell > .unset')
        await click(page, '.slick-viewport > .grid-canvas > .ui-widget-content:nth-child(6) > .slick-cell > .unset')

        // Define the password
        await typeText(page, 'password1', '.slickgrid-nf-editor > .nf-editor > .CodeMirror > div > textarea')

        // Click Ok on the password tab
        await shouldExist(page,'#canvas-body > .slickgrid-nf-editor > div > .button')
        await click(page, '#canvas-body > .slickgrid-nf-editor > div > .button')

        // Click 'Apply' on the Configure Controller Service
        await shouldExist(page,'#canvas-body > #controller-service-configuration > .dialog-buttons > .button:nth-child(1) > span')
        await click(page, '#canvas-body > #controller-service-configuration > .dialog-buttons > .button:nth-child(1) > span')

        // Click on Enable icon of the first service controller
        await shouldExist(page,'.slick-viewport > .grid-canvas > .ui-widget-content:nth-child(1) > .l6 > .pointer:nth-child(2)')
        await click(page, '.slick-viewport > .grid-canvas > .ui-widget-content:nth-child(1) > .l6 > .pointer:nth-child(2)')

        // Click on Enable button of the first service controller
        await shouldExist(page,'#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button:nth-child(1)')
        await click(page, '#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button:nth-child(1)')

        // await page.waitForFunction(
        //     'document.querySelector("#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button > span").innerText.includes("Close")'
        //   );

        // Click on Close button of the first service controller
        await shouldExist(page,'#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button > span')
        await page.waitFor(5000)
        await click(page, '#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button > span')

        // Click on Enable icon of the second service controller
        await shouldExist(page,'.slick-viewport > .grid-canvas > .ui-widget-content:nth-child(1) > .l6 > .pointer:nth-child(2)')
        await click(page, '.slick-viewport > .grid-canvas > .ui-widget-content:nth-child(1) > .l6 > .pointer:nth-child(2)')

        // Click on Enable button of the second service controller
        await shouldExist(page,'#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button:nth-child(1)')
        await click(page, '#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button:nth-child(1)')

        // Click on Close button of the second service controller
        await shouldExist(page,'#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button > span')
        await page.waitFor(5000)
        await click(page, '#canvas-body > #enable-controller-service-dialog > .dialog-buttons > .button > span')

        // Close configuration window
        await shouldExist(page,'#shell-dialog > #shell-container > #shell-close-container > #shell-close-button > .fa')
        await click(page, '#shell-dialog > #shell-container > #shell-close-container > #shell-close-button > .fa')
    })

    it('start a template', async () => {
        // click on the start button 
        await click(page, '#operate-start')
    })
})