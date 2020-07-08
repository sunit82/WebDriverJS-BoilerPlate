import { frameworkConfig } from '../lib/config';
import { Browser, Page, findBy, Button, TextInput, elementIsVisible, WebComponent, WaitCondition } from '../lib';

export class GooglePage extends Page {
    constructor(browser: Browser) {
      super(browser);
      this.setUrl(`${frameworkConfig.googleUrl}/`);
    }

    @findBy('[name=q]')
    public searchTextBox!: TextInput;

    @findBy('#result-stats')
    public resultStats!: WebComponent;

    public loadCondition(): WaitCondition {
        return elementIsVisible(() => this.searchTextBox);
    }

    @findBy('.gNO89b')
    public searchButton!: Button;

    @findBy('.RNmpXc')
    public feelingLuckyButton!: Button;
}