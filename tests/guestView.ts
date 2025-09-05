import { document, NightwatchAPI, NightwatchTests } from 'nightwatch'
import { baseUrl } from './utils.ts'

const guestView: NightwatchTests = {
    before: () => {},
    'Shows guest view': async () => {
        browser.window.maximize()
        await browser
            .url(baseUrl)
            .click('#browse-menu-button')
            .waitForElementVisible('#store-button-0')
            .assert.visible('#store-button-0', 'Store buttons are shown!')
            .element.findAll('#store-button-0')
            .nth(1)
            .click()
        browser.assert.visible(
            '#menu-item-row-0-item-0',
            'Menu items are shown!'
        )
    },
}

export default guestView
