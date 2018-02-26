import axios from 'axios'

const baseUrl = ''
//const fetchUrl = 'http://rap2api.taobao.org/app/mock/5568/GET/v5/'

class Services {
    getWechatSignature(url) {
        console.log('baseUrl',baseUrl,'url',url)
        return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
        
    }

    fetchHero(){
        return axios.get(`${baseUrl}/heroData`)
    }

    fetchHeroDetail(id){
        return axios.get(`${baseUrl}/heroData`,{
            params: {
                id
            }
        })
    }
}

export default new Services()