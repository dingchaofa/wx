import mongoose from 'mongoose'
import config from '../config'
import Wechat from '../wechat-lib'

const Token = mongoose.model('Token')

console.log('wechat/index.js run')

const wechatConfig = {
    wechat:{
        appID:config.wechat.appID,
        appSecret:config.wechat.appSecret,
        token:config.wechat.token,
        getAccessToken: async ()=> await Token.getAccessToken(),
        saveAccessToken: async data=> await Token.saveAccessToken(data)
    }
}

const getWechat = ()=>{
    const wechatClient = new Wechat(wechatConfig.wechat)
    console.log('wechat/index.js wechatConfig.wechat',wechatConfig.wechat)
    return wechatClient
}
getWechat()

console.log('wechat/index.js run')