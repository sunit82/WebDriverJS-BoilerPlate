import config from '../config';
import { Browser, Page, findBy, Button, TextInput, elementIsVisible, pageHasLoaded, WebComponent } from '../lib';

export class GooglePage extends Page {
    constructor(browser: Browser) {
      super(browser);
      this.setUrl(`${config.googleUrl}/`);
    }

    @findBy('[name=q]')
    public searchTextBox!: TextInput;

    @findBy('#result-stats')
    public resultStats!: WebComponent;

    public loadCondition() {
        return elementIsVisible(() => this.searchTextBox);
    }

    @findBy('.gNO89b')
    public searchButton!: Button;

    @findBy('.RNmpXc')
    public feelingLuckyButton!: Button;
}