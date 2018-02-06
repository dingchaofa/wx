
const fs = require('fs');
const page = require('webpage').create();

const content = fs.read('./server/crawler/lol/hero_arr.json'); //string
const all_hero = JSON.parse(content) //一个所有英雄名字的数组

//let hero = Object.keys(all_hero) //不支持
//let hero = Object.getOwnPropertyNames(all_hero) //不支持

// for(let key in all_hero){ //不支持
//     console.log(key,all_hero[key]);
// }

//console.log('read data:', all_hero[0]);

//phantom.exit();

var cur_num = 0 //第多少个

getHero(all_hero[cur_num])
function getHero(hero) {
    console.log('开始爬第' + cur_num + '条数据')
    console.log(cur_num / all_hero.length + "%已完成")
    var path = './server/crawler/database/' + hero + '.json' //英雄数据写入的地址

    page.settings = {
        javascriptEnabled: true,
        loadImages: false,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
    };

    page.open("http://lol.qq.com/web201310/info-defail.shtml?id=" + hero, function (status) {

        if (status === "success") {
            setTimeout(function () {
                var result = page.evaluate(function () { //window

                    var hero = document.location.search.slice(4)
                    LOLherojs.champion[hero].data.blocks = null //把不需要的数据处理掉

                    return LOLherojs.champion[hero].data
                });
                //console.log(JSON.stringify(result))
                fs.write(path, JSON.stringify(result), 'w');

                //phantom.exit();

                setTimeout(function () {
                    console.log('已经爬完第' + cur_num + '条数据')

                    cur_num++

                    getHero(all_hero[cur_num])
                }, 500);

            }, 1000)
        } else {
            err_num++
            console.log("fail load page", err_num);
            phantom.exit();
        }
    });

}