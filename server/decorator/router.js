import Router from 'koa-router'
import glob from 'glob'
import { resolve } from 'path'
//import _ from 'lodash'

export let routersMap = new Map()

export const symbolPrefix = Symbol('prefix')

export const isArray = v => Array.isArray(v) ? v : [v]

export const normalizePath = path=>path.startsWith('/') ? path : `${path}`

export default class Route {
    constructor (app,apiPath){
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init (){
        console.log(glob.sync(resolve(this.apiPath, './*.js')))
       glob.sync(resolve(this.apiPath, './*.js')).forEach(require);

       for(let [conf,controller] of routersMap){
        //    console.log('----------')
        //    console.log(conf,controller)
            const controllers = isArray(controller)
            let prefixPath = conf.target[symbolPrefix]

            if(prefixPath) prefixPath = normalizePath(prefixPath)

            const routerPath = prefixPath + conf.path

            this.router[conf.method](routerPath,...controllers)

            this.app.use(this.router.routes())
            this.app.use(this.router.allowedMethods())
       }
    }
}
export const router = conf =>(target,key,desc)=>{
    // console.log(conf)
    // console.log(target,key,desc)
    conf.path = normalizePath(conf.path)

    routersMap.set({
        target,
        ...conf
    },target[key])
    // console.log(routersMap)
}

export const controller = path => target => target.prototype[symbolPrefix] = path

export const get = path =>router({
    method:'get',
    path:path
})

export const post = path =>router({
    method:'post',
    path:path
})

export const put = path =>router({
    method:'put',
    path:path
})

export const del = path =>router({
    method:'del',
    path:path
})