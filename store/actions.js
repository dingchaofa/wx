import Services from './services'

export default {
    getWechatSignature({ commit },url) {
        return Services.getWechatSignature(url)
    },

    async fetchHero({ commit }){
        const res = await Services.fetchHero()

        
        this.state.hero = res.data.data
        console.log('hero',res)
        return res
    },

    async fetchHeroDetail({ commit },hero){
        console.log('action hero',hero)
        const res = await Services.fetchHeroDetail(hero)

        
        this.state.hero = res.data.data
        console.log('hero',res)
        return res
    }
}