import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export const router = app=>{
    const router = new Router()

    //console.log('ready router wechat-hear')

    router.all('/wechat-hear',wechatMiddle(config.wechat,reply))
    

    app.use(router.routes())
    app.use(router.allowedMethods())
}
//console.log('server/middlewares/router.js run')