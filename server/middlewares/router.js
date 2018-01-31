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

        //wechat.handle('getBatch','image') //批量获取图片

        //wechat.handle('getCount') //获取素材总量

        //wechat.handle('getUserInfo','or2TT1a0021PWrW4O50SmUzLb2XA') //获取用户信息

        let menu =   {
            "button":[
            {    
                 "name":"点",
                 'sub_button':[
                     {
                        type:'click',
                        name: '不要点我啊',
                        key: 'notClick'
                     },
                     {
                        type: 'view',
                        name: '我要去dingcf.top',
                        url: 'http://dingcf.top'
                     }
                 ]
             },
             {
                    name:"线",
                    sub_button: [
                    {    
                        type: "scancode_push",
                        name: "让我看看你扫的啥",
                        key: "scancode_push"
                   },
                   {
                        type:"scancode_waitmsg",
                        name:"扫码弹窗",
                        key:"scancode_waitmsg"
                   }]
              },
            {
                name: '面',
                sub_button: [
                    {    
                        type: "pic_sysphoto",
                        name: "拍照",
                        key: "pic_sysphoto"
                   },
                   {
                        type:"pic_photo_or_album",
                        name:"弹出拍照或者相册发图",
                        key:"pic_photo_or_album",
                        sub_button:[]
                   },
                   {
                        type:"pic_weixin",
                        name:"弹出微信相册发图器",
                        key:"pic_weixin"
                   },
                   {
                        type:"location_select",
                        name:"弹出地理位置选择器",
                        key:"location_select"
                   },
                   {
                        type:"media_id",
                        name:"看永久素材",
                        media_id:"AjsxwBRbryXLBaiuhGQ-_AVN4n7lMn50OD1R8mEKRYo"
                   }
                ]
            }]
        }
        wechat.handle('createMenu',menu)
        //wechat.handle('getMenu')
        //wechat.handle('delMenu')
    })

    app.use(router.routes())
    app.use(router.allowedMethods())
}