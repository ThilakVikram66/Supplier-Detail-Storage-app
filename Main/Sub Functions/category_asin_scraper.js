const {JSDOM} = require('jsdom');
const url_content_returner = require("./URL_Content_Returner");

async function starter(url){
    let obj_to_return = {};
    let content = await url_content_returner(url);
    let document = new JSDOM(content).window.document;
            let temp = document.querySelector("._cDEzb_card_1L-Yx").querySelector(".p13n-desktop-grid").getAttribute("data-client-recs-list");
            if(temp){
                JSON.parse(temp).forEach(val => {
                obj_to_return[val.id] = {"Rank": val.metadataMap["render.zg.rank"]}
                });
                return obj_to_return;
}
}
module.exports = starter;