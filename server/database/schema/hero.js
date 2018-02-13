const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

const HeroSchema = new mongoose.Schema({
    allytips: [String],
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
HeroSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.updatedAt = Date.now()
    }else{
        this.meta.updatedAt = Date.now()
    }
    next()
})


const Hero = mongoose.model('Hero',HeroSchema)

console.log('hero')