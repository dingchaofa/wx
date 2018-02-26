<template lang="pug">
  section#index.container
    h1 英雄联盟------人物角色
    div.character
      ul
        //- li
        //-   a(href="hero-detail?id=Aatrox")
        //-     img(src="http://ossweb-img.qq.com/images/lol/img/champion/Aatrox.png")
        //-     p 暗裔剑魔
        //- li
        //-   a(href="hero-detail?id=Ahri")
        //-     img(src="http://ossweb-img.qq.com/images/lol/img/champion/Ahri.png")
        //-     p 九尾妖狐
        
        li(v-for='item in hero' @click='heroDetail(item.id)')
          
            img(:src="'http://ossweb-img.qq.com/images/lol/img/champion/'+item.id+'.png'")
            p {{item.name}}
  
    transition(name="fade-turn")
      Loading(v-if="loading")
</template>

<script>
import Loading from '../components/Loading.vue'

import { mapState } from 'vuex'

export default {
  head(){
    return {
      title: '实力青铜v5'
    }
  },
  components: {
    Loading
  },
  data(){
    return {
      loading:false
    }
  },
  computed: {
    ...mapState([
      'hero'
    ])
  },
  methods:{
    heroDetail (id) {
      console.log(this)
      this.$router.push({
        path: '/hero-detail',
        query: {
          id
        }
      })
    }
  },
  beforeCreate(){
    this.$store.dispatch('fetchHero')
  },
  created(){
    console.log('this.hero',this.hero)
  }
}
</script>

<style scoped lang='scss' src='../static/scss/index.scss'></style>
