import 'chromedriver';
import { Builder, ThenableWebDriver, By, WebElementPromise } from 'selenium-webdriver';
import { WaitCondition } from './';
import * as fs from 'fs';
const firefoxdriver = require('geckodriver');
const edge = require("@microsoft/edge-selenium-tools");

export class Browser {
  private driver: ThenableWebDriver;
  private static instance: Browser;

  private constructor(browserName: string) {
    if (browserName === "edge") {
      let options = new edge.Options().setEdgeChromium(true);
      this.driver = edge.Driver.createSession(options);
      return;
    }
    this.driver = new Builder().forBrowser(browserName).build();
  }

  public static getInstance(browserName = 'chrome') {
    if (!Browser.instance) {
      Browser.instance = new Browser(browserName);
    }
    return Browser.instance;
  }

  public getDriver() {
    return this.driver;
  }

  public async navigate(url: string): Promise<void> {
    await this.driver.navigate().to(url);
  }

  public findElement(selector: string): WebElementPromise {
    return this.driver.findElement(By.css(selector));
  }

  public async clearCookies(url?: string): Promise<void> {
    if (url) {
      const currentUrl = await this.driver.getCurrentUrl();
      await this.navigate(url);
      await this.driver.manage().deleteAllCookies();
      await this.navigate(currentUrl);
    } else {
      await this.driver.manage().deleteAllCookies();
    }
  }

  public async wait(condition: WaitCondition) {
    await this.waitAny(condition);
  }

  public async waitAny(conditions: WaitCondition | WaitCondition[]): Promise<void> {
    const all = (!(conditions instanceof Array)) ? [ conditions ] : conditions;

    await this.driver.wait(async () => {
      for (const condition of all) {
        try {
          if (await condition(this) === true) {
            return true;
          }
          continue;
        } catch (ex) {
          continue;
        }
      }
    });
  }

  public async close(): Promise<void> {
    await this.driver.quit();
  }

  public saveScreenshot(filename: string) {
    return this.driver.takeScreenshot().then((data) => {
      fs.writeFile(filename, data, 'base64', (err) => {
        if (err) {
          console.log("error", err)
        };
      });
    });
  }
}
