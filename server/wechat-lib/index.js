import request from 'request-promise'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
    accessToken: base + 'token?grant_type=client_credential'
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
        //console.log('request from server/wechat-lib/index.js')
        options = Object.assign({}, options, { json: true })
        //console.log('options from server/wechat-lib/index.js', options)
        try {
            const response = await request(options)

            //console.log('response from server/wechat-lib/index.js', response)

            return response
        } catch (error) {
            console.error('error from server/wechat-lib/index.js', error)
        }
    }

    async fetchAccessToken() {
        let data = await this.getAccessToken()

        console.log('data1 from wechat-lib/index.js', data)

        if (!this.isValidAccessToken(data)) {
            data =  await this.updateAccessToken()
        }
        // if(isValid(data)){
        //     return await this.udpateAccessToken()
        // }
        console.log('data3 from server/wechat-lib/index.js', data)
        await this.saveAccessToken(data)

        return data
    }

    async updateAccessToken() {
        const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
        console.log('url1', url)
        const data = await this.request({ url:url })
        console.log('data2 from server/wechat-lib/index.js', data)
        const now = (Date.now())
        const expiresIn = now + (data.expires_in - 20) * 1000
        data.expires_in = expiresIn

        return data
    }

    isValidAccessToken(data) {
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
}

console.log('wechat-lib/index.js run')