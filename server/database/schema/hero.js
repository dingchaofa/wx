const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

const HeroSchema = new mongoose.Schema({
    id:String,
    name:String,
    allytips: [String],
    blocks:[
        {
            recommended: [
                {
                    items: [
                        {
                            id: String
                        }
                    ]
                }
            ]
        }
    ],
    blurb: String,
    enemytips: [String],
    image: {
        full: String
    },
    info: {
        "attack": String,
        "defense": String,
        "difficulty": String,
        "magic": String
    },
    lore:String,
    passive:{
        description: String,
        image: {
            full: String
        },
        name: String
    },
    skins:[
        {
            "chromas": Boolean,
            "id": String,
            "name": String,
            "num": Number
        }
    ],
    spells: [
        {
            "description": String,
            "id": String,
            "image": {
                "full": String,
            },
            "leveltip": {
                "effect": [
                    String
                ],
                "label": [
                    String
                ]
            },
            "name": String,
            "resource": String,
            "tooltip": String
        }
    ],
    "tags": [
        String
    ],
    "title": String,
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
