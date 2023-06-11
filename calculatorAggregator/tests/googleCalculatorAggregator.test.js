const GoogleCalculatorPage = require('../../pageObjects/googleCalculatorPage');
const GoogleCalculatorAggregator = require('../googleCalculatorAggregator');


const jestTimeOutTime = 30000;
jest.setTimeout(jestTimeOutTime);

describe("insertNumber() - unit tests", () => {

    let googleCalculatorPage;
    let googleCalculatorAggregator;

    beforeEach(async () => {
        googleCalculatorPage = new GoogleCalculatorPage();
        await googleCalculatorPage.init();
        googleCalculatorAggregator = new GoogleCalculatorAggregator(googleCalculatorPage);
    });

    afterEach(async () => {
        await googleCalculatorPage.quitWebDriver();
    });

    test("positive number", async () => {    
        const num1 = 71221312321;
        await googleCalculatorAggregator.insertNumber(num1);
        const result = await googleCalculatorPage.getResult();
        expect(parseInt(result)).toBe(num1);
    })

    test("negative number", async () => { 
        const num1 = -17;
        await googleCalculatorAggregator.insertNumber(num1);
        const result = await googleCalculatorPage.getResult();
        expect(parseInt(result)).toBe(num1);
    })

    test("invalid number", async () => { 
        try {
            await googleCalculatorAggregator.insertNumber("invalid number")
        }
        catch (err) {
            expect(err.message).toBe("Not a number");
        }
    })
})

describe("addTwoNumbers() - unit tests", () => {

    let googleCalculatorPage;
    let googleCalculatorAggregator;

    beforeEach(async () => {
        googleCalculatorPage = new GoogleCalculatorPage();
        await googleCalculatorPage.init();
        googleCalculatorAggregator = new GoogleCalculatorAggregator(googleCalculatorPage);
    });

    afterEach(async () => {
        await googleCalculatorPage.quitWebDriver();
    });

    test("addTwoNumbers() - Add two positive numbers", async () => { 
        const num1 = 17;
        const num2 = 100;
        const expectedSum = num1 + num2;
        const result = await googleCalculatorAggregator.addTwoNumbers(num1, num2);
        expect(result).toBe(expectedSum);
    })

    test("addTwoNumbers() - Add one positive one negative number", async () => { 
        const num1 = 17;
        const num2 = -100;
        const expectedSum = num1 + num2;
        const result = await googleCalculatorAggregator.addTwoNumbers(num1, num2);
        expect(result).toBe(expectedSum);
    })

    test("addTwoNumbers() - Add two negative numbers", async () => { 
        const num1 = -17;
        const num2 = -100;
        const expectedSum = num1 + num2;
        const result = await googleCalculatorAggregator.addTwoNumbers(num1, num2);
        expect(result).toBe(expectedSum);
    })
})
