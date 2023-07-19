const axios = require("axios");
const header = require('./Header.json');

function url_content_returner(url){
    return new Promise((resolve,reject)=>{ 
        let promise_returner = async function(url){
            axios.get(url,{
                headers:header
            }).then(
                res=>
                {
                    if(res.status == 200)
                        resolve(res.data);
                    else
                        promise_returner(url);
                }
            ).catch(
                rej=>
                {
                    if(rej?.response?.status == 404)
                        reject("Not Available");
                    else
                        promise_returner(url);
                }
            )
        }
        promise_returner(url);
    });
}
module.exports = url_content_returner;