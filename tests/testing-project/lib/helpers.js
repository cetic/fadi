module.exports={
    click: async function(page, selector){
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    dragAndDrop: async function(page, selector){
        try {
            const e = await page.$(selector);
            const box = await e.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.mouse.move(100, 200); // move to (100, 200) coordinates
            await page.mouse.up();
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    typeText: async function(page, text, selector){
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error(`Could not type text into selector: ${selector}`)
            
        }
    },

    loadUrl: async function(page, url){
        await page.goto(url, {waitUntil: 'networkidle0'})
    },
    getText: async function (page, selector){
        try {
            await page.waitForSelector(selector)
            return page.$eval(selector, e => e.innerHTML)
        } catch (error) {
            throw new Error(`Cannot get text from selector: ${selector}`)
        }
    }, 

    getCount: async function (page, selector){
        try {
            await page.waitForSelector(selector)
            return page.$$eval(selector, items => items.length)
        } catch (error) {
            throw new Error(`Cannot get count from selector: ${selector}`)
        }
    }, 
    waitForText: async function(page, selector, text){
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction(
                (selector, text ) =>
                    document.querySelector(selector).innerText.includes(text),
                {},
                selector,
                text
            )
        } catch (error) {
            throw new Error(`Text: ${text} not found for selector ${selector}`)
        }
    },
    pressKey: async function(page, key){
        try {
            await page.keyboard.press(key)
        } catch (error) {
            throw new Error(`Could not press key: ${key} on the keyboard`)
        }
    }, 
    shouldExist: async function(page, selector){
        try {
            await page.waitForSelector(selector, {visible: true})
        } catch (error) {
            throw new Error(`Selector ${selector} not exist`)
        }
    },
    shouldNotExist: async function(page, selector){
        try {
            await page.waitFor(() => !document.querySelector(selector))
        } catch (error) {
            throw new Error(`Selector: ${selector} is visible, but should not`)
        }
    }

}