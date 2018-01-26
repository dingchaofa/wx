import getRawBody from 'raw-body'
import sha1 from 'sha1'
import * as util from './util'


export default function (opts,reply) {
    //console.log('router wechat-hear run2',reply)
    return async function wechatMiddle(ctx,next) {
       //console.log('router wechat-hear run2',ctx)
       //console.log('router wechat-hear run3',ctx.query) //自动绑定查询字符串
            //require('../wechat')
    
            const token = opts.token
            const {
                signature,
                nonce,
                timestamp,
                echostr
            } = ctx.query
            console.log('ctx',ctx.req)
            console.log('charset',ctx.charset)
            
            const str = [token,timestamp,nonce].sort().join('')
            const sha = sha1(str)

            if(ctx.method === "GET"){
                if(sha===signature){
                    ctx.body = echostr
                }else{
                    ctx.body = 'Failed method get from wechat-lib/middleware.js'
                }
            }else if(ctx.method === 'POST'){
                if(sha !==signature){
                    ctx.body = 'Failed method post from wechat-lib/middleware.js'
                    console.log('sha !==signature')
                    return false
                }

                const data =await getRawBody(ctx.req,{
                    length:ctx.length,
                    limit: '1mb',
                    encoding:ctx.charset || 'utf8' //ctx.charset 这里的值是undefined
                })
                console.log('data',data,typeof data)
                const content = await util.parseXML(data)
                //const message = util.formatMessage(content)
                console.log('content1',content)

                ctx.weixin = {} //message

                await reply.apply(ctx,[ctx,next])

                const replyBody = ctx.body
                const msg = ctx.weixin
                //const xml = util.tpl(replyBody,msg)
                const xml = `<xml>
                                <ToUserName><![CDATA[${content.xml.FromUserName[0]}]]></ToUserName> 
                                <FromUserName><![CDATA[${content.xml.ToUserName[0]}]]></FromUserName>
                                <CreateTime>${content.xml.CreateTime[0]}</CreateTime> 
                                <MsgType><![CDATA[text]]></MsgType>
                                <Content><![CDATA[${replyBody}]]></Content> 
                            </xml>`

                //console.log('replyBody1',replyBody)

                ctx.status = 200
                ctx.type = 'application/xml'
                ctx.body = xml
            }
    }
}
//console.log('wechat-lib/middlewares.js run')