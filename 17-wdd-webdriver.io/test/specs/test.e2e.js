/*import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!')
    })
})
*/


// My (first and so far only) contribution :-)

describe("User visits root", () => {
    describe("posting a message", () => {
        it("saves quote, attributed, source", async () => {
            const quote = "Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure.";
            const attributed = "Marianne Williamson";
            const source =
                "A Return to Love: Reflections on the Principles of A Course in Miracles";

            await browser.url("/");
            await $('#quote').setValue(quote)
            await $('#attributed').setValue(attributed)
            await $('#source').setValue(source)

            // $(selector).getText()
            const mainSection = await $('main')
            await expect(mainSection).toBeExisting()
            await expect(mainSection).toHaveTextContaining(quote)
            await expect(mainSection).toHaveTextContaining(attributed)
            await expect(mainSection).toHaveTextContaining(source)

        });
    });
});


