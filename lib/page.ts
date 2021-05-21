import { Browser, WaitCondition } from './';
const axeBuilder = require('axe-webdriverjs');


export interface NewablePage<T extends Page> {
  new(browser: Browser): T;
}

export abstract class Page {
  private url: string;

  protected setUrl(url: string) {
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

  public async accessibilityCheck(): Promise<any> {
    const driver = await this.browser.getDriver();
    return axeBuilder(driver).analyze();
  }

  public async dispose(): Promise<void>{
      this.browser.close();
  }
}
