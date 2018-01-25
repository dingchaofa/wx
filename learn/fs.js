//import {resolve} from 'path'
const path = require('path')
const fs = require('fs')

const models = path.resolve(__dirname,'./nodemon.js')
const result = require(models)
console.log(models)
//fs.readdirSync(models)
console.log(result)
