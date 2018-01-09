const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new mongoose.Schema({
    name:String,
    token:String,
    expires_in:Number,
    meta:{
        createdAt:{
            type:Data,
            default:Data.now()
        },
        updatedAt:{
            type:Data,
            default:Date.now()
        }
    }
})

TokenSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.updatedAt = Data.now()
    }else{
        this.meta.updatedAt = Data.now()
    }
    next()
})

TokenSchema.statics = {
    async getAccessToken(){
        const token = await this.findOne({
            name:'access_token'
        }).exec()

        return token
    },

    async saveAccessToken(data){
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
