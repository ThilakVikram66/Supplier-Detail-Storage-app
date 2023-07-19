// Function Importer
const category_asins = require('./Sub Functions/category_asin_scraper');
const variation_asins = require('./Sub Functions/variation_asin_scraper');

// Variables Declaration
let Main_Json = [];
let parent_asins = [];
let all_promise = [];
let checker_count = 1;
// url
let url = "https://www.amazon.com/gp/bestsellers/home-garden/10749171/ref=pd_zg_hrsr_home-garden";

// App Starter
initiator(url);
async function initiator(url){/*need to add parameter for url*/
    
    let temp_category_asin_obj = await category_asins(url);
    console.log("Temp_obj");
    console.log(temp_category_asin_obj);
    let parent_asin_arr = Object.keys(temp_category_asin_obj);
    for(let P_asin of parent_asin_arr)
    {
        checker_count+1;
        all_promise.push(variation_asins(P_asin).then(
            res=>{
                res.forEach(
                    V_asin=>{
                        Main_Json.push(
                            {
                                "Parent_asin":P_asin,
                                "Current_Asin":V_asin,
                                "Category_Url":url,
                                "Category_Rank":temp_category_asin_obj[P_asin]["Rank"]
                            }
                        )
                    }
                )
                console.log("Current_status "+temp_category_asin_obj[P_asin]["Rank"]);
                console.log(Main_Json.length);
            }
        ).catch(
            err=>{
                if(err)
                {
                    console.log(err);
                }
            }
        ));
            if(checker_count > 5)
            {
                checker_count = 1;
                await Promise.all(all_promise);
            }
        console.log("Current_status "+temp_category_asin_obj[P_asin]["Rank"]);
        console.log(Main_Json.length);
    }
    
}
