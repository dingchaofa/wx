const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new mongoose.Schema({
    name:String,
    token:String,
    expires_in:Number,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
})

TokenSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.updatedAt = Date.now()
    }else{
        this.meta.updatedAt = Date.now()
    }
    next()
})

TokenSchema.statics = {
    async getAccessToken(){
        const token = await this.findOne({
            name:'access_token'
        }).exec()

        if(token && token.token){
            token.access_token = token.token
        }
        console.log('token from token.js',token)
        return token
    },

    async saveAccessToken(data){
        console.log('data4 from token.js',data)
        let token = await this.findOne({
            name:'access_token'
        }).exec()

        if(token){
            token.token = data.access_token
            token.expires_in = data.expires_in
        }else{
            token = new Token({
                name:'access_token',
                token:data.access_token,
                expires_in:data.expires_in
            })
        }
        await token.save()

        return data
    }
}

const Token = mongoose.model('Token',TokenSchema)
console.log('虽然导出的是空对象，目的是让这个模块执行token.js')