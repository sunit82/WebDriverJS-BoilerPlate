import { GooglePage } from "../pages";
import { assert } from 'chai';
import { BrowserInstance } from './mocha-base'
import { runInThisContext } from "vm";

describe('Google page test that fails',  () => {
    let goolePage: GooglePage;
    before(() => {
        goolePage = new GooglePage(BrowserInstance);
    });

    it('Googe page find Yahoo button and do accessibility check', async () => {

        await goolePage.navigate();

        const searchButtonValue = await goolePage.searchButton.getValue();
        // This assert will fail as Google search page wont' have "Yahoo Search" button.
        assert(searchButtonValue === "Yahoo Search", "'Yahoo Search' button not found...");

        // Below lines to do accessibility test. Commmented now as google page is failing the test.
        // const results = await goolePage.accessibilityCheck();
    });
})