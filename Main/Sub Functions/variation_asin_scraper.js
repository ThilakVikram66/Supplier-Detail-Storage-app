const puppeteer = require('puppeteer');

function starter(asin)
{
    return new Promise(
        (resolve,reject)=>
        {
            let Variation_array_sender = async function(asin){
                try{
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36");
                    await page.goto("https://www.amazon.com/dp/"+asin, {
                        waitUntil: "domcontentloaded",
                    });
                    let returnable_value = await page.evaluate(()=>{
                        return window.Twister.dimensionalSummaryModule.dimensionCombinationToASINMap;
                    })
                    await browser.close();
                    if(returnable_value){
                        return resolve(Object.values(returnable_value));
                    }
                    else{
                        return resolve([asin]);
                    }
                    
                }
                catch(err)
                {
                    console.log("Errored");
                    Variation_array_sender(asin);
                }
            }
            Variation_array_sender(asin);
        })
}

module.exports = starter;