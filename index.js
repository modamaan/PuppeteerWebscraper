// import puppeteer from 'puppeteer';

// // Function to take a screenshot of a given URL
// async function takeScreenshot(url) {
//   // Launch the browser
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Set the viewport size
//   await page.setViewport({ width: 1080, height: 1024 });

//   // Navigate to the URL
//   await page.goto(url);

//   // Take a screenshot and save it to a file
//   await page.screenshot({ path: 'screenshot.png' });

//   // Close the browser
//   await browser.close();
// }

// // URL to take a screenshot of
// const url = 'https://ai-mock-interview-sigma.vercel.app/';

// // Call the function
// takeScreenshot(url).then(() => {
//   console.log('Screenshot taken and saved as screenshot.png');
// }).catch(error => {
//   console.error('Error taking screenshot:', error);
// });

import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import { URL } from 'url';

export async function evaluateWebsite(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the given URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Evaluate web design quality by checking the presence of a title
    const title = await page.title();
    const designQuality = title ? 'Good' : 'Poor';

    // Run Lighthouse for SEO and other evaluations
    const { lhr } = await lighthouse(url, {
        port: new URL(browser.wsEndpoint()).port,
        output: 'json',
        logLevel: 'info',
        onlyCategories: ['seo', 'performance', 'accessibility']
    });

    const seoScore = lhr.categories.seo.score * 100;
    const performanceScore = lhr.categories.performance.score * 100;
    const accessibilityScore = lhr.categories.accessibility.score * 100;

    // Close the browser
    await browser.close();

    // Determine overall quality based on scores
    const overallQuality = (seoScore > 80 && performanceScore > 80 && accessibilityScore > 80) ? 'Good' : 'Poor';

    return {
        url,
        designQuality,
        seoScore,
        performanceScore,
        accessibilityScore,
        overallQuality
    };
}

// // Example usage:
// const url = 'https://ai-mock-interview-sigma.vercel.app/';

// evaluateWebsite(url).then(result => {
//   console.log(`Evaluation result for ${url}:`);
//   console.log(`Design Quality: ${result.designQuality}`);
//   console.log(`SEO Score: ${result.seoScore}`);
//   console.log(`Performance Score: ${result.performanceScore}`);
//   console.log(`Accessibility Score: ${result.accessibilityScore}`);
//   console.log(`Overall Quality: ${result.overallQuality}`);
// }).catch(error => {
//   console.error('Error evaluating website:', error);
// });

