
//这里无法爬取动态页面，请看lol/crawler.js
const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs')
const Iconv = require('iconv-lite');

var options = {
    uri: 'http://lol.qq.com/web201310/info-heros.shtml',
    transform: function (body) {
        //console.log('body',body)
        const html = Iconv.decode(body,'gb2312')
        fs.writeFileSync('./lol.html',html)
        //console.log('html',html)
        return cheerio.load(html);
    },
    encoding: null
};
 
request(options)
    .then(function ($) {
        // Process html like you would with jQuery...
       
        //fs.writeFileSync('./lol',$('.logo>a').text())
        const gbk = $('.logo>a').text()
        
        console.log(gbk);
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.error(err)
});