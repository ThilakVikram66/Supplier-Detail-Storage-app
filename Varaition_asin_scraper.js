const puppeteer = require('puppeteer');
let cur_time = 1;
(setInterval(() => {
  cur_time+1;
}, 1000));

let arr = ['B07MZZ53FP', 'B00J602DZA', 'B00NX0XMZY', 'B0BVZ7VDSL',
'B097YK8Q95'];
let all_prom = [];
let container = [];

handler();
async function handler(){
  let temp_time = cur_time;
  for(let asin of arr){
    all_prom.push(starter(asin).then(res=>{
      container.push(res);
    }));
  }
  await Promise.all(all_prom).then(
    res=>{
      console.log("Response_Received");
    }
  ).catch(err=>{
    if(err){
    console.log("errored")}
  });
  
  console.log("Container_Length "+container.length);
  console.log(cur_time-temp_time)
}


function starter(asin)
{
    return new Promise(
        (resolve,reject)=>
        {
            let Variation_array_sender = async function(asin){
                try{
                    const browser = await puppeteer.launch({headless: true});
                    const page = await browser.newPage();
                    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36");
                    await page.goto(`https://www.amazon.com/dp/${asin}`);
                    await page.waitForSelector("#twisterContainer",{timeout: 5000});
                    let variation_asins = await page.evaluate(() =>window.Twister.dimensionalSummaryModule.dimensionCombinationToASINMap);
                    await browser.close();
                    if(variation_asins)
                    {
                      console.log(Object.values(variation_asins));
                        resolve({
                          "parent":asin,
                          "var":Object.values(variation_asins)});
                    }
                    else
                    console.log([asin]);
                        resolve([asin]);
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