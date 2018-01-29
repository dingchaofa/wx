import getRawBody from 'raw-body'
import sha1 from 'sha1'
import * as util from './util'


export default function (opts,reply) {
    //console.log('router wechat-hear run2',reply)
    return async function wechatMiddle(ctx,next) {
       //console.log('ctx.weixin,ctx.body',ctx.weixin,ctx.body)
       //console.log('router wechat-hear run3',ctx.query) //自动绑定查询字符串
            //require('../wechat')
    
            const token = opts.token
            const {
                signature,
                nonce,
                timestamp,
                echostr
            } = ctx.query
            //console.log('ctx1',ctx)
            //console.log('ctx.req',ctx.req)
            
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

                const data =await getRawBody(ctx.req,{  //把http的请求体的内容解析成发送时的数据内容
                    length:ctx.length,
                    limit: '1mb',
                    encoding:ctx.charset || 'utf8' //ctx.charset 这里的值是undefined
                })
                //console.log('data1',data)
                const content = await util.parseXML(data)  //解析接收到xml格式的字符串的内容为对象
                const message = util.formatMessage(content.xml) //只对key-value中的value是数组解析成字符串或者对象，返回一个value没有数组的对象
                console.log('message',message)

                ctx.weixin = message

                await reply.apply(ctx,[ctx,next])

                const replyBody = ctx.body
                const msg = ctx.weixin
                const xml = util.tpl(replyBody,msg) //replyBody是回复的内容，msg是回复的数据的标识。合并参数，返回xml形式字符串。

                console.log('xml1',xml)

                ctx.status = 200
                ctx.type = 'application/xml'
                ctx.body = xml  //ctx.body 必须是一个xml格式的文本，满足微信xml回复消息的封装，才能回复消息。
                //console.log('ctx2',ctx)
            }
    }
}