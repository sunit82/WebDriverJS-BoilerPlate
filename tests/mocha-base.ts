import { Browser } from "../lib";
import config, { rootDir} from "../config"
const addContext = require('mochawesome/addContext');
const mkdirp = require('mkdirp');

var path = require('path');
const reportDir = rootDir + path.join('/mochawesome-report/');
export const BrowserInstance = Browser.getInstance(config.browser);
const driver = BrowserInstance.getDriver();
driver.manage().window().maximize();

afterEach(async function() {
    if (this.currentTest?.state === 'failed') {
        await mkdirp(reportDir);
        let screenshotFile = reportDir+ Date.now() + '.png';
        addContext(this, 'file:///' + screenshotFile);
        return BrowserInstance.saveScreenshot(screenshotFile)
            .then(() => {
                // any action if test fails.
            });
    }
    return ;
});

after(async () => {
    await (await BrowserInstance.getDriver()).close();
    // any action after all tests run.
});
