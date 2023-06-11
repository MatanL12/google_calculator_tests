
class GoogleCalculatorAggregator {
    #calculatorPage;

    constructor(calculatorPage) {
        this.#calculatorPage = calculatorPage;
    }

    async insertNumber(num) {
        if(typeof(num) !== 'number') {
            throw new Error("Not a number");
        }

        if(num === 0) {
            return;
        }

        if(num < 0) {
            await this.#calculatorPage.clickButton('-');
            num *= -1;
        }

        await this.insertNumber(Math.floor(num /10));
        let digit = num % 10;
        await this.#calculatorPage.clickButton(digit.toString());
    }

    async addTwoNumbers(num1, num2) {
        await this.insertNumber(num1);
        await this.#calculatorPage.clickButton('+');
        await this.insertNumber(num2);
        await this.#calculatorPage.clickButton('=');
        const result = await this.#calculatorPage.getResult();    
        return parseInt(result);
    }

    countAmountOfButtonsContainNumbers() {
        let numberButtonsCounter = 0;
        let allButtonsTextArr = this.#calculatorPage.getTextOfAllCalculatorButtons();
        allButtonsTextArr.forEach((buttonText) => {
            if(buttonText >= "0" && buttonText <= "9"){
                numberButtonsCounter++;
            }
        })
        return numberButtonsCounter;
    }

    getAmountOfButtons() {
        let allButtonsTextArr = this.#calculatorPage.getTextOfAllCalculatorButtons();
        return allButtonsTextArr.length;
    }
}

module.exports = GoogleCalculatorAggregator;




