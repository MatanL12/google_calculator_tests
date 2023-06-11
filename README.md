
# Google Calculator Tests

## Prerequisites

Before running the project, make sure you have the following dependencies installed:

- Docker: To run the Chrome WebDriver in a standalone container.
- Node.js (v16.6 and above) and npm: To install and manage project dependencies.

## Installation

1. Unpack the project folder in your local machine.

2. Open a command prompt or terminal and navigate to the project folder.

3. Run the command `npm install` to install the project dependencies specified in the `package.json` file.

## Running the Tests

To run the automated tests, follow these steps:

1. Start the standalone Chrome WebDriver container by running the command:

   ```
   docker run -d -p 4444:4444 -p 7900:7900 selenium/standalone-chrome:114.0
   ```

   This will create a Docker container running the Chrome browser with the WebDriver.

2. Run the command `npm test` to execute the automated tests using Jest.

   The test results will be displayed in the command prompt or terminal.
   You can track the Chrome browser by accessing http://localhost:7900 in your web browser. Use the password 'secret' to log in.

   
