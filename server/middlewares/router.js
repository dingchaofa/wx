import sha1 from 'sha1'
import Router from 'koa-router'
import config from '../config'
export const router = app=>{
    const router = new Router()

    console.log('ready router wechat-hear')

    router.get('/wechat-hear',(ctx,next)=>{
        
        console.log('router wechat-hear run')
        require('../wechat')

        const token = config.wechat.token
        const {
            signature,
            nonce,
            timestamp,
            echostr
        } = ctx.query
        
        const str = [token,timestamp,nonce].sort().join('')
        const sha = sha1(str)

        if(sha===signature){
            ctx.body = echostr
        }else{
            ctx.body = 'Failed from router.js'
        }
    })

    


    // router.post('/wechat-hear',(ctx,next)=>{

    // })

    app.use(router.routes())
    app.use(router.allowedMethods())
}
console.log('server/middlewares/router.js run')