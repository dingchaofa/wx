
//这里是测试爬取动态页面，请看lol/crawler.js

//var fs = require('fs');
var page = require('webpage').create();

page.settings = {
    javascriptEnabled: true,
    loadImages: false,
    encoding:null,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
};

//phantom.outputEncoding="gb2312";
page.open("http://lol.qq.com/web201310/info-defail.shtml?id=Aatrox",function (status) {
    if (status === "success") {
        setTimeout(function() {
            var result = page.evaluate(function(data) {

                //return document.getElementById("DATAnametitle").innerText 没有用
                //let str = JSON.stringify(LOLherojs.champion['Aatrox'].data)
                
                return LOLherojs.champion['Aatrox'].data
            });
            
            console.log(JSON.stringify(result))
            phantom.exit();
        }, 1000);
    } else {
        console.log("fail load page");
        phantom.exit();
    }
});
// page.onConsoleMessage = function(msg) {
//     console.log('Page title is ' + msg);
// };
//page.close()