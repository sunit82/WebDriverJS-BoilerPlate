import { Browser, WaitCondition } from './';
import { AxeAnalysis } from './accessibility';
import { accessibilityViolations } from './mocha-base';
import { assert } from 'chai';

const axeBuilder = require('axe-webdriverjs');
const addContext = require('mochawesome/addContext');


export type NewablePage<T extends Page> = new(browser: Browser) => T;

export abstract class Page {
  private url: string;

  protected setUrl(url: string): void {
    this.url = url;
  }

  public async navigate(): Promise<void> {
    await this.browser.navigate(this.url);
    await this.browser.wait(this.loadCondition());
  }

  public abstract loadCondition(): WaitCondition;

  public constructor(protected browser: Browser) {
      this.url = "";
  }

  public async accessibilityCheck(): Promise<AxeAnalysis> {
    const driver = await this.browser.getDriver();
    return axeBuilder(driver).analyze()
    .then((result:AxeAnalysis) => {
      if (result.violations.length) {
        accessibilityViolations.push(...result.violations);
      }
      assert.equal(result.violations.length, 0);
    });
  }

  public async dispose(): Promise<void>{
    return this.browser.close();
  }
}
