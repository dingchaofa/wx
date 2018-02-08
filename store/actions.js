import Services from './services'

export default {
    getWechatSignature({ commit },url) {
        return Services.getWechatSignature(url)
    },

    async fetchHero({ commit }){
        const res = await Services.fetchHero()

        
        this.state.hero = res.data.hero
        console.log('hero',res)
        return res
    }
}