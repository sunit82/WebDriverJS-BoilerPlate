import { GooglePage } from "../pages";
import { delay } from "../lib";
import { Key } from "selenium-webdriver";
import { ensure } from "../lib/ensure";
import { assert } from 'chai';
import { BrowserInstance } from './mocha-base'


describe('Google page test that pass',  () => {
    let goolePage: GooglePage;
    before(async () => {
        goolePage = new GooglePage(BrowserInstance);
    });

    it('Verify elements on googel.com page', async () => {
        await goolePage.navigate();

        const searchButtonValue = await goolePage.searchButton.getValue();
        assert(searchButtonValue === "Google Search", "'Google Search' button not found.");

        const feelingLuckyButtonValue = await goolePage.feelingLuckyButton.getValue();
        assert(feelingLuckyButtonValue === "I'm Feeling Lucky", "'Feeling Lucky' button not found.");

    });

    it('Google a string and verfiy on results page', async () => {
        await goolePage.navigate();
        await goolePage.searchTextBox.enterText('my search criteria' + Key.ENTER);

        await delay(2000);
        await Promise.all([
            ensure(goolePage.resultStats).isVisible()
        ]);

        // Verify a string on google results page.
        const resultStats = await goolePage.resultStats.getText();
        assert(resultStats.startsWith("About"), "Results page not found");
    });
});