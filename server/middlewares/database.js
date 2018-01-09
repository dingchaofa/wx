import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import {resolve} from 'path'

const models = resolve(__dirname,'../database/schema')

fs.readdirSync(models)
.filters(file=> ~file.search(/^[^\.].*js$/))
.forEach(file=>require(resolve(models,file)))

export const database = app=>{
    mongoose.set('debug',true)
    mongoose.connect(config.db)
    mongoose.connection.on('disconnecetd',()=>{
        mongoose.connect(config.db)
    })
    mongoose.connection.on('error',err=>{
        console.error(err)
    })

    mongoose.connection.on('open',async ()=>{
        console.log('connect to mongodb',config.db)
    })
}