import xml2js from 'xml2js'
import {template} from './tpl'

function parseXML (xml) {
    console.log('string',xml.toString())
    return new Promise((resolve,reject)=>{
        xml2js.parseString(xml,{trim:true},(err,content)=>{
            if(err) reject(err)
            else resolve(content)
        })
    })
}
function formatMessage(obj) { //只对key-value中的value是数组解析成字符串或者对象，返回一个value没有数组的对象
    let message = {}

    if(typeof obj === 'object'){
        const keys = Object.keys(obj)

        //console.log(keys)
        for(let i=0;i<keys.length;i++){
            let item = obj[keys[i]]
            let key = keys[i]

            if(!(item instanceof Array || item.length===0)){
                continue
            }

            if(item.length===1){
                let val = item[0]

                if(typeof val === 'object'){
                    message[key] = formatMessage(val)
                }else{
                    message[key] = (val || '').trim()
                }
            }else{
                message[key] = []

                for(let j=0;j<item.length;j++){
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    return message
}

function tpl(content,message){
    let type = 'text'

   if(Array.isArray(content)){
       type = 'news'
   }

   if(!content){
       content = 'Empty News'
   }

   if(content && content.type){
       type = content.type
   }

   let info = Object.assign({},{
      content:content,
      createTime: Date.now(),
      msgType: type,
      toUserName:message.FromUserName,
      fromUserName:message.ToUserName
   })

   return template(info)
}

export {
    parseXML,
    formatMessage,
    tpl
}