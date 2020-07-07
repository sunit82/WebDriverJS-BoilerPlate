import { WebElementPromise } from 'selenium-webdriver';

export class WebComponent {
  constructor(protected element: WebElementPromise, public selector: string) { }

  public async click(): Promise<void> {
    try {
      return await this.element.click();
    } catch (clickErr) {
      try {
        await this.element.getDriver().executeScript('arguments[0].click();', this.element);
      } catch (jsErr) {
        throw clickErr;
      }
    }
  }

  public async isDisplayed(): Promise<boolean> {
    try {
      return await this.element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  public async getText(): Promise<string> {
    return await this.element.getText();
  }
}

export class Button extends WebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public async isDisabled(): Promise<boolean> {
    try {
      return await this.element.getAttribute('disabled') === 'disabled';
    } catch (ex) {
      return false;
    }
  }

  public async getValue(): Promise<string> {
    return await (await this.element).getAttribute("value");
  }
}

export class TextInput extends WebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public enterText(text: string): Promise<void> {
    return this.element.sendKeys(text);
  }
}

export class Anchor extends WebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public async getHref(): Promise<string> {
    return await (await this.element).getAttribute("href");
  }
}