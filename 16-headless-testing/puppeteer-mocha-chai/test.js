const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer options
const opts = {
    // headless: false,
    slowMo: 100,
    timeout: 10000
};

// expose variables
before(async function () {
    global.expect = expect;
    global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after(function () {
    browser.close();

    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});


describe('sample test', function () {
    let page;

    before(async function () {
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    after(async function () {
        await page.close();
    })


    // TESTS
    it('should work', async function () {
        console.log(await browser.version());

        expect(true).to.be.true;
    });

    it('should have the correct page title', async function () {
        expect(await page.title()).to.eql('Spotify Playlist Creator');
    });

    it('should have a heading', async function () {
        const HEADING_SELECTOR = 'h1';
        let heading;
        /*
        page.$eval takes two arguments - selector and pageFunction. 
        It runs a document.querySelector in the browser environment and passes the result to the pageFunction. 
        Finally, it resolves with the value returned by pageFunction. 
        In this case, we are just returning the text for h1 tag.
        */
        await page.waitForTimeout(HEADING_SELECTOR);
        heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

        expect(heading).to.eql('Spotify Playlist Creator');
    });

    it('should not display ErrorModal', async function () {
        const ERROR_MODAL_SELECTOR = '.ErrorModal';

        await page.waitForTimeout(ERROR_MODAL_SELECTOR);
        // The method runs document.querySelectorAll within the page. If no elements match the selector, the return value resolves to []
        expect(await page.$$(ERROR_MODAL_SELECTOR)).to.be.deep.equal([])
    });

    it('should be able to login', async function () {
        const ALL_BUTTONS_SELECTOR = 'button';
        let allButtons, loginBtn;

        await page.waitForTimeout(ALL_BUTTONS_SELECTOR);
        allButtons = await page.$$eval(ALL_BUTTONS_SELECTOR, buttons => {
            return buttons.map(btn => btn.textContent);
        });

        console.log(allButtons)

        loginBtn = allButtons.find(btn => btn.textContent === "LOGIN TO SPOTIFY")


        expect(loginBtn).to.exist();
    });


    /*
        it('should not display ErrorModal', async function () {
            const ERROR_MODAL_SELECTOR = '.ErrorModal';
    
            await page.waitForTimeout(ERROR_MODAL_SELECTOR);
    
            expect(await page.$$(ERROR_MODAL_SELECTOR)).to.have.lengthOf(1);
        });
    */
});