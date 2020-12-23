const puppeteer = require('puppeteer');

async function scrapFields(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const publication = await page.$eval('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > span:nth-child(1)',data => data.textContent);
    const objectHead = await page.$eval('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > span:nth-child(4)',data=>data.textContent);
    const object = await page.$eval('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > p:nth-child(6)',data => data.textContent);
    const bidding = await page.$eval('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-nothing > span > span:nth-child(19)',data => data.textContent);
    const linksArray = await page.evaluate(()=>{
        let links = document.querySelectorAll('#block-views-block-view-noticia-pbh-block-5 > div > div > div > div > div > div.views-field.views-field-field-historico-da-licitacao > div > table > tbody > tr > td:nth-child(2) > div > div > div > a');
        return Array.from(links).map(data => data.getAttribute('href'));
    })
    console.log(publication);
    console.log(bidding);
    console.log(objectHead+" "+object);
    console.log(linksArray);

    await browser.close();

}

scrapFields('https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020');