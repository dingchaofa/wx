import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import {resolve} from 'path'
import fs from 'fs'

export const router = app=>{
    const router = new Router()

    //console.log('ready router wechat-hear')

    router.all('/wechat-hear',wechatMiddle(config.wechat,reply))
    
    router.get('/upload',(ctx,next)=>{
        let Wechat = require('../wechat')
        let wechat = Wechat.getWechat()

        //wechat.handle('uploadMaterial','news')//获取图文消息

        //wechat.handle('uploadMaterial','image',resolve(__dirname,'../../static/img/logo.png'),true) //新增永久图片

        // wechat.handle('getMaterial','AjsxwBRbryXLBaiuhGQ-_AVN4n7lMn50OD1R8mEKRYo',true).then((data)=>{
        //     fs.writeFileSync('data.png',data,'binary')
        // }) //获取图片并写入本地

        //wechat.handle('getBatch','image')

        wechat.handle('getCount')
    })

    app.use(router.routes())
    app.use(router.allowedMethods())
}