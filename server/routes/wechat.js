import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import {resolve} from 'path'

import { signature } from '../controller/wechat'
import { controller, get, post } from '../decorator/router'


@controller('')
export class WechatController {
    @get('/wechat-hear')
    async wechatHear(ctx,next){
        const middle = wechatMiddles(config.wechat,reply)
        const body = await middle(ctx,next)

        ctx.body = body
    }

    @post('/wechat-hear')
    async wechatPostHear(ctx,next){
        const middle = wechatMiddles(config.wechat,reply)
        const body = await middle(ctx,next)

        ctx.body = body
    }
    
    @get('/wechat-signature')
    async wechatSignature(ctx,next){
        console.log('signature')
        signature(ctx,next)
    }
}



/*
export const router = app=>{
    const router = new Router()

    //console.log('ready router wechat-hear')

    router.all('/wechat-hear',wechatMiddle(config.wechat,reply))
    
    

    //上传素材
    router.get('/upload',(ctx,next)=>{
        
        let Wechat = require('../wechat')
        let wechat = Wechat.getWechat()

        //wechat.handle('uploadMaterial','news')//获取图文消息

        //wechat.handle('uploadMaterial','image',resolve(__dirname,'../../static/img/logo.png'),true) //新增永久图片

        wechat.handle('getMaterial','AjsxwBRbryXLBaiuhGQ-_AVN4n7lMn50OD1R8mEKRYo',true,'binary').then((data)=>{
            fs.writeFileSync('./data3.png',data,'binary')
        }) //获取图片并写入本地

        //wechat.handle('getBatch','image') //批量获取图片

        //wechat.handle('getCount') //获取素材总量

        //wechat.handle('getUserInfo','or2TT1a0021PWrW4O50SmUzLb2XA') //获取用户信息


        //wechat.handle('createMenu',menu)
        //wechat.handle('getMenu')
        //wechat.handle('delMenu')
    })
    

    //router.get('/wechat-signature',signature)

    app.use(router.routes())
    app.use(router.allowedMethods())
}
*/