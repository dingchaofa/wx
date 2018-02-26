//把database文件夹下的所有数据合并成一个数组格式的json文件

const fs = require('fs')

let files,
    chunk=[],
    cur_chunk={},
    name_chunk={},
    cur_num=0;
fs.readdir('./server/crawler/database/',(err,data)=>{
    if(err) throw err
    files = data
    //console.log(data)
    concatJson(files[cur_num])
})



function concatJson(file) {
    console.log('当前正在读取第'+cur_num+'个英雄'+file)
let path = './server/crawler/database/'+ file

fs.readFile(path,'utf8',(err,data)=> {
    if (err) throw err;
    cur_chunk = JSON.parse(data)
    
    //let _name = file.slice(0,-5)
    
    //name_chunk[_name] = cur_chunk
    //chunk = Object.assign({},chunk,name_chunk)
    chunk.push(cur_chunk)

    if(cur_num<files.length-1){
        cur_num ++
        concatJson(files[cur_num])
    }else{
        console.log('数据读完了，正在写入')

        fs.writeFile('./server/crawler/lol/heroArr.json', JSON.stringify(chunk), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
})

}