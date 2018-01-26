import xml2js from 'xml2js'
const util = require('util')

export function parseXML (xml) {
    return new Promise((resolve,reject)=>{
        xml2js.parseString(xml,{trim:true},(err,content)=>{
            if(err) reject(err)
            else resolve(content)
        })
    })
}
//console.log('wechat-lib/util.js run')