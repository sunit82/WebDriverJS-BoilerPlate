import { GooglePage } from "../pages";
import { Browser } from "../lib";
import { Key } from "selenium-webdriver";
import { ensure } from "../lib/ensure";
import { assert, expect } from 'chai';
import { BrowserInstance } from './mocha-base'


describe('Google page test that fails',  () => {
    let goolePage: GooglePage;
    before(async () => {
        goolePage = new GooglePage(BrowserInstance);
    });
    
    it('Visit Azure Partner Portal', async () => {

        await goolePage.navigate();

        const searchButtonValue = await goolePage.searchButton.getValue();
        // This assert will fail as Google search page wont' have "Yahoo Search" button.
        assert(searchButtonValue === "Yahoo Search", "'Google Search' button not found.");
        
        // Below lines to do accessibility test. Commmented now as google page is failing the test.
        // const results = await page.accessibilityCheck();
        // assert.equal(results.violations.length, 0);
    });
});