import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import { resolve } from 'path'

const models = resolve(__dirname,'../database/schema')

fs.readdirSync(models) //返回一个下一级的目录名或者文件名的数组
.filter(file=> ~file.search(/^[^\.].*\.js$/))
.forEach(file=>require(resolve(models,file))) // require('wx/server/database/schema/token.js')

let hero = require(resolve(__dirname,'../crawler/database/Aatrox.json'))

export const database = app=>{
    mongoose.set('debug',true)

    mongoose.connect(config.db, { useMongoClient: true })

    mongoose.Promise = global.Promise;

    mongoose.connection.on('disconnecetd',()=>{
        mongoose.connect(config.db, { useMongoClient: true })
    })
    mongoose.connection.on('error',err=>{
        console.error(err)
    })

    mongoose.connection.on('open',async ()=>{
        console.log('connect to mongodb',config.db)

        const HeroModel = mongoose.model('Hero')

        const heroData = await HeroModel.find({})
        // HeroModel.remove({})
        //console.log(heroData)
        if(!heroData.length) HeroModel.insertMany(hero)
        
        
    })
}

//console.log('server/middlewares/database.js run')