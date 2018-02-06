//PhantomJS对Object对象的方法支持，不友好，通过这个方法，把json的一级对象格式，生成一级数组，其元素为对象的key。

const fs = require('fs')

fs.readFile('./server/crawler/lol/all_hero.json','utf8',(err,data)=> {
    if (err) throw err;
    let obj = JSON.parse(data)
    let arr = Object.keys(obj)
    let arr_json = JSON.stringify(arr)

    fs.writeFile('./server/crawler/lol/hero_arr.json', arr_json, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
})