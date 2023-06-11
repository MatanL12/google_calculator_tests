const {k_browser, k_calculatorURL, k_buttonsClassName, k_resultSpanName, k_seleniumRemoteURL, k_convertorForKeyboardCharsObj} = require("../utils/utils");
const {Builder, By} = require("selenium-webdriver");

class GoogleCalculatorPage {
    #webDriver = null;
    #visibleWebElementsMap;
    #resultSpan = null;

    constructor() {
        this.#visibleWebElementsMap = new Map();
    }

    async init() {
        this.#webDriver = await new Builder()
            .forBrowser(k_browser)
            .usingServer(k_seleniumRemoteURL)
            .build();
        await this.#webDriver.get(k_calculatorURL);

        const elements = await this.#webDriver.findElements(By.css(`.${k_buttonsClassName}[role="button"]:not([style*="display:none"]`));    
        for(const element of elements) {
            await this.#addElementToWebElementsMap(element);
        }

        this.#resultSpan = await this.#webDriver.findElement(By.css(k_resultSpanName));
    }

    async clickButton(symbol) {
        const button = this.#visibleWebElementsMap.get(symbol.toString());
        if(button === undefined) {
            throw new Error("Invalid symbol");
        }
        await button.click();
    }
    
    async getResult() {
        return this.#resultSpan.getText();
    }

    getTextOfAllCalculatorButtons() {
        return Array.from(this.#visibleWebElementsMap.keys());
    }

    async quitWebDriver() {
        await this.#webDriver.quit();
    }

    async #addElementToWebElementsMap(element) {
        let symbol = await element.getText();
        if(symbol in k_convertorForKeyboardCharsObj) { //
            symbol = k_convertorForKeyboardCharsObj[symbol];
        }
        this.#visibleWebElementsMap.set(symbol, element);
    }
}

module.exports = GoogleCalculatorPage;