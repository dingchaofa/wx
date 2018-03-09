
import mongoose from 'mongoose'

import {resolve} from 'path'

import { controller, get, post } from '../decorator/router'


@controller('')
export class WechatController {
    @get('/heroData')
    async getHero(ctx,next){

        console.log('ctx',ctx.query)
        const HeroModel = mongoose.model('Hero')
        let heroData;
        if(ctx.query.id){
            heroData = await HeroModel
            .find({'id' : ctx.query.id})
            .exec()
        }else{
            heroData = await HeroModel
            .find({})
            .limit(5)
            .exec()
        }
        //console.log('heroData',heroData)

        if(!heroData.length){
            ctx.body = {
                state: 1,
                data: 'the hero is not exist'
            }
        }else{
            ctx.body = {
                state: 0,
                data: heroData
            }
        }

    }
}