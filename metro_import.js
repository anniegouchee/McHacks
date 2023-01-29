const puppeteer = require('puppeteer');

const items = [];
const prices = [];
function get_url(search_term) {
    var template;
    search_term = search_term.replace(" ", "+");
    template = "https://www.metro.ca/en/online-grocery/search?filter=" + search_term + "&freeText=true";
    return (template);
  }  


async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const [el] = await page.$x('/html/body/div[1]/div[3]/div[1]/div[2]/div[5]/div/div[1]/div/div/div[3]/div[2]/div[3]/div/div[1]/div[2]/div[1]/div[1]/a/div');
    const txt = await el.getProperty('textContent');
    const rawText = await txt.jsonValue();
    items.push(rawText);
    


    const [el2] = await page.$x('/html/body/div[1]/div[3]/div[1]/div[2]/div[5]/div/div[1]/div/div/div[3]/div[2]/div[3]/div/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/span[1]');
    const txt2 = await el2.getProperty('textContent');
    const rawText2 = await txt2.jsonValue();
  
    prices.push(rawText2);

    browser.close();

    console.log(items);
    console.log(prices); 
}
const ingr = require('./ingredients.json');

const index = Object.keys(ingr);
const value = Object.values(ingr);



for (let i = 0; i < value.length; i++) {
console.log(get_url(value[i]));

   scrapeProduct(get_url(value[i]));
  
}








