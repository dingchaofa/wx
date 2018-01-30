import request from 'request-promise'
import * as _ from 'lodash'
import fs from 'fs'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
    accessToken: base + 'token?grant_type=client_credential',
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

        this.fetchAccessToken()
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

    async fetchAccessToken() {
        let data = await this.getAccessToken()

        if (!this.isValidAccessToken(data)) {
            data =  await this.updateAccessToken()
        }
        await this.saveAccessToken(data)

        return data
    }

    async updateAccessToken() { //更新token，并保存到本地
        
        const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
        //console.log('url from server/wechat-lib/index.js', url)
        const data = await this.request({ url:url })

        console.log('data2 from server/wechat-lib/index.js', data)
        const now = (Date.now())
        const expiresIn = now + (data.expires_in - 20) * 1000
        data.expires_in = expiresIn

        return data
    }

    isValidAccessToken(data) { //判断token是否有效
        if (!data || !data.access_token || !data.expires_in) {
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
}