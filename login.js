const { chromium } = require('playwright');

(async () => {
    // Launch the browser in non-headless mode with persistent context
    const browser = await chromium.launchPersistentContext('./user_data', {
        headless: false,
    });

    const page = await browser.newPage();

    try {
        console.log("Navigating to the login page...");
        await page.goto('https://box.streamboy.tv/app/dashboard/XXXX', {
            waitUntil: 'networkidle',
        });

        console.log("Browser launched in non-headless mode with persistent context.");
        console.log("Please log in manually. The session will be saved in ./user_data.");
        console.log("Press CTRL+C to exit once you have completed the login process.");

        // Keep the browser open for manual login
        await new Promise(() => {}); // Keeps the script running until manually terminated
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await browser.close();
        console.log("Browser closed.");
    }
})();
