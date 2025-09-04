import { NightwatchTests } from 'nightwatch'
import { baseUrl } from './utils.ts'

const guestView: NightwatchTests = {
    before: () => {},
    'Creates an order': () => {
        browser.window.maximize()

        browser
            .url(baseUrl)
            .click('#order-now-button')
            .click('#user-login-checkbox')
            .click('#login-button')
            .waitForElementVisible('#store-button-0')
            .element.findAll('#store-button-0')
            .nth(1)
            .click()

        browser.element.findAll('#menu-item-row-0-item-2 button').nth(1).click()
        browser.assert.not.hasAttribute(
            '#add-to-cart-button',
            'disabled',
            'Item has been added, Checkout is available!'
        )
        browser
            .click('#add-to-cart-button')
            .click('#checkout-button')
            .assert.visible(
                '#order-code',
                'Order has been created, Order number is displayed!'
            )
    },
}

export default guestView
