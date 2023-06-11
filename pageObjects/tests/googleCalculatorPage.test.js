const GoogleCalculatorPage = require('../googleCalculatorPage');

const jestTimeOutTime = 30000;
jest.setTimeout(jestTimeOutTime);

describe("clickButton() - unit tests", () => {

    let googleCalculatorPage;

    beforeEach(async () => {
        googleCalculatorPage = new GoogleCalculatorPage();
        await googleCalculatorPage.init();
    });

    afterEach(async () => {
        await googleCalculatorPage.quitWebDriver();
    });

    test("click on number", async () => {
        const num1Str = "7";
        await googleCalculatorPage.clickButton(num1Str);
        await googleCalculatorPage.clickButton("=");
        const result = await googleCalculatorPage.getResult();
        expect(parseInt(result)).toBe(parseInt(num1Str));
    })

    test("click on Pi", async () => { 
        await googleCalculatorPage.clickButton("Pi");
        await googleCalculatorPage.clickButton("=");
        const result = await googleCalculatorPage.getResult();
        const expectedResult = 3.14159265359;
        expect(parseFloat(result)).toBe(expectedResult);
    })

    test("invalid symbol", async () => { 
        try {
            await googleCalculatorPage.clickButton("invalid symbol");        }
        catch (err) {
            expect(err.message).toBe("Invalid symbol");
        }
    })

})

describe("getResult() - unit tests", () => {

    let googleCalculatorPage;

    beforeEach(async () => {
        googleCalculatorPage = new GoogleCalculatorPage();
        await googleCalculatorPage.init();
    });

    afterEach(async () => {
        await googleCalculatorPage.quitWebDriver();
    });

    test("empty result", async () => { 
        const result = await googleCalculatorPage.getResult();
        expect(result).toBe("0");
    })
})

describe("getTextOfAllCalculatorButtons() - unit tests", () => {

    let googleCalculatorPage;

    beforeEach(async () => {
        googleCalculatorPage = new GoogleCalculatorPage();
        await googleCalculatorPage.init();
    });

    afterEach(async () => {
        await googleCalculatorPage.quitWebDriver();
    });

    test("count number of buttons", async () => { 
        const allButtonsTextArr = googleCalculatorPage.getTextOfAllCalculatorButtons();
        expect(allButtonsTextArr.length).toBe(34);
    })
})

