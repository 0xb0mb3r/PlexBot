const { chromium } = require('playwright');

(async () => {
    // Launch the browser with the saved persistent context
    const browser = await chromium.launchPersistentContext('./user_data', {
        headless: true, // Headless mode for automated operation
    });

    const page = await browser.newPage();

    try {
        console.log("Navigating to the dashboard...");
        await page.goto('https://box.streamboy.tv/app/dashboard/XXXX', {
            waitUntil: 'networkidle',
        });

        console.log("Page loaded. Looking for the restart button...");

        // Click the restart button
        const restartButtonSelector = 'button.font-medium.items-center.border.shadow-sm.rounded-md.relative.pl-10.bg-indigo-600.text-white.border-transparent.px-4.py-2.text-sm';
        await page.click(restartButtonSelector);
        console.log("Restart button clicked successfully!");
    } catch (error) {
        console.error("Error during automation:", error.message);
    } finally {
        await browser.close();
        console.log("Browser closed.");
    }
})();
