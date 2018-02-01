import request from 'request-promise'
import * as _ from 'lodash'
import fs from 'fs'
import { sign } from './util'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
    accessToken: base + 'token?grant_type=client_credential',
    ticket: base + 'ticket/getticket?', //获得jsapi_ticket
    temporary: {
        upload: base + "media/upload?", //新增临时素材
        get: base + 'media/get?' //获取临时素材
    },
    permanent: {
        add_news: base + 'material/add_news?',//新增永久图文素材
        uploadimg: base + 'media/uploadimg?', //上传图文消息内的图片获取URL
        add_material: base + 'material/add_material?', //新增其他类型永久素材
        get_material: base + 'material/get_material?', //获取永久素材
        del_material: base + 'material/del_material?', //删除永久素材
        update_news: base + 'material/update_news?', //修改永久图文素材
        get_count: base + 'material/get_materialcount?', // 获取素材总数
        get_batch: base + 'material/batchget_material?' // 获取素材列表
    },
    tag: {
        createTag: base + 'tags/create?', //创建标签
        getTag: base + 'tags/get?', //获取公众号已创建的标签
        updataTag: base + 'tags/update?', //编辑标签
        delTag : base + 'tags/delete?', //删除标签
        getUserTag: base + 'user/tag/get?', //获取标签下粉丝列表
        batchTag: base + 'tags/members/batchtagging?', //批量为用户打标签
        batchUnTag: base + 'tags/members/batchuntagging?', // 批量为用户取消标签
        getUserTagList: base + 'tags/getidlist?', //获取用户身上的标签列表
        getBlackList: base + 'tags/members/getblacklist?', //获取公众号的黑名单列表
        batchBlackList: base + 'tags/members/batchblacklist?', //拉黑用户
        batchUnBlackList: base + 'tags/members/batchunblacklist?' //取消拉黑用户
    },
    user: {
        remark: base + 'user/info/updateremark?', //设置用户备注名
        getUserInfo: base + 'user/info?', //获取用户基本信息
        getBatchUserInfo: base + 'user/info/batchget?', //批量获取用户基本信息
        getUserList: base + 'user/get?', //获取用户列表

    },
    menu: {
        create: base + 'menu/create?', //自定义菜单创建接口
        get: base + 'menu/get?', //自定义菜单查询接口
        del: base + 'menu/delete?' //自定义菜单删除接口
    }
}

export default class Wechat {
    constructor(opts) {
        this.opts = Object.assign({}, opts)

        //console.log('opts',opts)

        this.appID = opts.appID
        this.appSecret = opts.appSecret
        this.getAccessToken = opts.getAccessToken
        this.saveAccessToken = opts.saveAccessToken
        this.getTicket = opts.getTicket
        this.saveTicket = opts.saveTicket

        this.fetchToken('token')
        this.fetchToken()
    }

    async request(options) {
        options = Object.assign({}, options, { json: true })
        try {
            const response = await request(options)
            
            return response
        } catch (error) {
            
            console.error('error from server/wechat-lib/index.js', error)
        }
    }

    // fetch 'token' || 'ticket'
    async fetchToken(token) {
        let data;
        if(token === 'token'){
             data = await this.getAccessToken()

            if (!this.isValidToken(data,'access_token')) {
                data =  await this.updateToken('token')
                await this.saveAccessToken(data)
            }
        }else{ //ticket
            data = await this.getTicket()

            if (!this.isValidToken(data,'ticket')) {
                data =  await this.updateToken() 
                await this.saveTicket(data)
            }
        }
        

        return data
    }

    async updateToken(token) { //更新token，并保存到本地
        let url;

        if(token === 'token'){
            url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
        }else{
            let token = await this.fetchToken('token')
            url = api.ticket + '&access_token=' + token.token + '&type=jsapi'
            console.log('url2',url)
        }
        
        const data = await this.request({ url:url })

        console.log('data2 from server/wechat-lib/index.js', data)
        const now = (Date.now())
        const expiresIn = now + (data.expires_in - 20) * 1000
        data.expires_in = expiresIn

        return data
    }

    isValidToken(data,name) { //判断token是否有效
        if (!data || !data[name] || !data.expires_in) {
            return false
        }

        const expiresIn = data.expires_in
        const now = (new Date().getTime())

        if (now < expiresIn) {
            return true
        } else {
            return false
        }
    }

    uploadMaterial(token,type,material,permanent){ //上传素材
        let form = {}
        let url = api.temporary.upload
        type = type ==='image' || type === 'voice' || type === 'video' || type === 'thumb'

        if(permanent){ //如果永久素材没有type，表示是“上传图文消息内的图片获取URL”
            url = api.permanent.uploadimg

            //_.extend(form,permanent)

            if(type){
                url = api.permanent.add_material
            }
    
            if(type ==='news'){ //新增永久图文素材
                url = api.permanent.add_news
                form = material
            }else{
                form.media = fs.createReadStream(material)
            }
        }

        let uploadUrl = url + 'access_token=' + token

        if(!permanent){
            uploadUrl += '&type=' + type
        }else{
            if(type){
                uploadUrl += '&type=' + type
            }
        }

        const options = {
            method: 'POST',
            url: uploadUrl,
            json: true
        }

        if(type === 'news'){
            options.body = form //https://www.npmjs.com/package/request-promise#post-data-to-a-json-rest-api
        }else{
            options.formData = form //构建form表单  https://www.npmjs.com/package/request-promise#post-like-html-forms-do
        }

        return options
    }

    async handle(operation,...args){
        const tokenData = await this.fetchAccessToken()
        
        const options = this[operation](tokenData.token,...args)
        console.log('options',options)
        const data = await this.request(options)
        console.log('data',data)
        return data
    }

    getMaterial(token,mediaId,permanent){ //获取素材
        let url = api.temporary.get

        if(permanent){
            url = api.permanent.get_material
        }

        const options = {
            method: 'POST',
            url: url + 'access_token=' + token,
            json:true
        }

        options.body = {
            media_id: mediaId
        }

        return options

    }

    getBatch(token,type,offset,count){ //获取永久素材的列表media_id
        offset = offset || 0
        count = count || 10
        type = type || 'image'

       let url = api.permanent.get_batch

        const options = {
            method: 'POST',
            url: url + 'access_token=' + token,
            json: true
        }

        options.body = {
            type,
            offset,
            count
        }

        return options
    }

    getCount(token){ //获取永久素材的总数
        let url = api.permanent.get_count

        const options = {
            method: 'POST',
            url: url + 'access_token=' + token,
            json: true
        }
        return options
    }

    getUserInfo(token,openid,lang){
        
        lang = lang || 'zh-CN'
        openid = openid || ''

        let url = api.user.getUserInfo + 'access_token=' + token + '&openid=' + openid + '&lang=' + lang

        return {url}
    }

    createMenu(token,menu){
        let url = api.menu.create + 'access_token=' + token

        return {
            method: 'POST',
            url,
            json:true,
            body:menu
        }
    }

    getMenu(token){
        let url = api.menu.get + 'access_token=' + token
        return {url}
    }

    delMenu(token){
        let url = api.menu.del + 'access_token=' + token
        return {url}
    }

    sign(ticket,url){
        return sign(ticket,url)
    }
}