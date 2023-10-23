const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);


// puppeteer options
const opts = {
    headless: false,
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
    // By default, Mocha tests have a 2 second timeout (which means that the test needs to be completed in 2 seconds).
    // You can increase it (in milliseconds) as follows:
    this.timeout(8000); // this test can take up to 8 seconds

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

    it('should have correct heading', async function () {
        const HEADING_SELECTOR = 'h1';
        let heading;

        page.waitForSelector(HEADING_SELECTOR)

        /*
        page.$eval takes two arguments - selector and pageFunction. 
        It runs a document.querySelector in the browser environment and passes the result to the pageFunction. 
        Finally, it resolves with the value returned by pageFunction. 
        In this case, we are just returning the text for h1 tag.
        */
        heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

        expect(heading).to.eql('Spotify Playlist Creator');
    });

    it('should not display ErrorModal', async function () {
        const ERROR_MODAL_SELECTOR = '.ErrorModal';

        page.waitForSelector(ERROR_MODAL_SELECTOR)

        // The method runs document.querySelectorAll within the page. If no elements match the selector, the return value resolves to []
        expect(await page.$$(ERROR_MODAL_SELECTOR)).to.be.deep.equal([])
    });

    it('should be displaying login button', async function () {
        const LOGIN_BUTTON_SELECTOR = 'button';
        let loginBtn;

        page.waitForSelector(LOGIN_BUTTON_SELECTOR);

        loginBtn = await page.$(LOGIN_BUTTON_SELECTOR)
        const btnText = await page.evaluate(loginBtn => loginBtn.textContent, loginBtn);

        expect(btnText).to.equal("Login to Spotify");
    });

    // DOES NOT WORK!!!
    it('should click login button', async function () {
        const LOGIN_BUTTON_SELECTOR = 'button';
        let loginBtn;

        page.waitForSelector(LOGIN_BUTTON_SELECTOR);

        loginBtn = await page.$(LOGIN_BUTTON_SELECTOR)

        await loginBtn.click();
        console.log(loginBtn, "button has been clicked")

        expect(page.url()).to.include("https://accounts.spotify.com/en/login?");
    });
})