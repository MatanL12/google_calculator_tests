const GoogleCalculatorAggregator = require('./calculatorAggregator/googleCalculatorAggregator');
const GoogleCalculatorPage = require('./pageObjects/googleCalculatorPage');

const jestTimeOutTime = 50000;
jest.setTimeout(jestTimeOutTime);

describe("Home Assignment Tests", () => {
    
    // NOTE - I prioritized test isolation over efficiency, so I recreated a new calculator page for each test instead of using the same one for all tests (with beforeAll and afterAll)

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

    test("Addition of two numbers", async () => {    
        const num1 = 10;
        const num2 = 5;
        const expectedSum = num1 + num2;
        const result = await googleCalculatorAggregator.addTwoNumbers(num1,num2);
        expect(result).toBe(expectedSum);
    })

    test("Count buttons that contain numbers", () => {
        const actualNumberButtonsCount = googleCalculatorAggregator.countAmountOfButtonsContainNumbers();
        const expectedNumberButtonsCount = 10;
        expect(actualNumberButtonsCount).toBe(expectedNumberButtonsCount);
    })

    test("Count total number of buttons", () => {
        const actualTotalNumberOfButtons = googleCalculatorAggregator.getAmountOfButtons();
        const expectedTotalNumberOfButtons = 34;
        expect(actualTotalNumberOfButtons).toBe(expectedTotalNumberOfButtons);
    })
})
