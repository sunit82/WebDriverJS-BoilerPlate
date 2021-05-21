import { WebElementPromise } from 'selenium-webdriver';

export class WebComponent {
  constructor(protected element: WebElementPromise, public selector: string) { }

  public async click() {
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

  public async isDisplayed() {
    try {
      return await this.element.isDisplayed();
    } catch (ex) {
      return false;
    }
  }

  public async getText() {
    return await this.element.getText();
  }
}

export class Button extends WebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public async isDisabled() {
    try {
      return await this.element.getAttribute('disabled') === 'disabled';
    } catch (ex) {
      return false;
    }
  }

  public async getValue() {
    return await (await this.element).getAttribute("value");
  }
}

export class TextInput extends WebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public enterText(text: string) {
    return this.element.sendKeys(text);
  }
}

export class Anchor extends WebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public async getHref() {
    return await (await this.element).getAttribute("href");
  }
}