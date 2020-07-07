import { Browser } from "../lib";
import config, { rootDir } from "../config"
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { Result } from 'axe-core';

export const BrowserInstance = Browser.getInstance(config.env.browser);
export const accessibilityViolations: Result[] = [];

const addContext = require('mochawesome/addContext');
const reportDir = rootDir + path.join('/mochawesome-report/');
const driver = BrowserInstance.getDriver();

void driver.manage().window().maximize();

afterEach(async function() {
    if (this.currentTest?.state === 'failed') {
        await mkdirp(reportDir);
        const screenshotFile = `${reportDir + Date.now().toString()}.png`;
        accessibilityViolations.length && accessibilityViolations.map((violations, index) => {
            if (violations.description) {
                addContext(this, `Accessibility Violation [${(index+1)}]:${violations.description}`)
            }
        });
        accessibilityViolations.splice(0, accessibilityViolations.length);
        addContext(this, `file:///${screenshotFile}`);
        await BrowserInstance.saveScreenshot(screenshotFile)
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
