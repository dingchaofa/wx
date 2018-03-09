<template lang='pug'>
    #detail(v-if='hero.length')
        .base-info
            img(:src='"http://ossweb-img.qq.com/images/lol/web201310/skin/big"+ hero[0].skins[0].id +".jpg"')
            div
                h4 {{hero[0].name}}
                h3 {{hero[0].title}}
                span {{tags(hero[0].tags[0])}}
                span {{tags(hero[0].tags[1])}}
                dl.hero-attr
                    dt 物理攻击
                    dd
                        i(:style="{background:'#ffdc33',width:hero[0].info.attack+'0%'}")
                    dt 魔法攻击
                    dd
                        i(:style="{background:'#155ad8',width:hero[0].info.magic+'0%'}")
                    dt 防御能力
                    dd
                        i(:style="{background:'#da09ca',width:hero[0].info.defense+'0%'}")
                    dt 上手难度
                    dd
                        i(:style="{background:'#44bbb6',width:hero[0].info.difficulty+'0%'}")
        .bg-story
            h3 背景故事
            p {{hero[0].lore}}
        .skill-info
            h3 技能介绍
            ul.skill-icon
                li(:class="{'cur-li-bg':cur_skill === hero[0].passive.name}")
                    img(@click='cur_skill = hero[0].passive.name' :src="'http://ossweb-img.qq.com/images/lol/img/passive/'+hero[0].passive.image.full")
                li(v-for='(item,index) in hero[0].spells'  :class="{'cur-li-bg':cur_skill === item.name}")
                    img(@click='cur_skill = item.name' :src='"http://ossweb-img.qq.com/images/lol/img/spell/"+ item.image.full')
            ul.skill-text
                li
                    div(v-show='cur_skill === hero[0].passive.name')
                        h6 {{hero[0].passive.name}}
                            span(class='hot-key') 被动技能
                        p {{hero[0].passive.description}}
                li(v-for='(item,index) in hero[0].spells')
                    div(v-show='cur_skill===item.name')
                        h6 {{item.name}}
                            span(class='hot-key') 快捷键：{{hotKey(index)}}
                        p {{item.description}}
                        p(v-html="item.tooltip")
                        dl
                            dt {{item.leveltip.label[0]}}：{{item.leveltip.effect[0]}}
                            dd {{item.leveltip.label[1]}}：{{item.leveltip.effect[1]}}

        .recommend-equip
            h3 推荐装备
            dl(v-for="(item,index) in hero[0].blocks[0].recommended" v-if="showEquip(item.type,item.showIfSummonerSpell)")
                dt {{showEquip(item.type,item.showIfSummonerSpell)}}
                
                dd(v-if="showEquip(item.type,item.showIfSummonerSpell)")
                    img(v-for="img in item.items" :src="'http://ossweb-img.qq.com/images/lol/img/item/'+img.id+'.png'")
        .operation-skill
            h3 使用技巧
            dl
                dt 当你使用暗裔剑魔
                dd
                    p -【杀意已决】状态可在一场战斗中贡献显著的战斗力，因此在魔井较空时要避免接战。
                    p - 出装方面，出一些生命偷取装和少量防御装可让亚托克斯变得更加能打，因为这么出会让他有更多时间来充分利用血涌效果。
                dt 敌人使用暗裔剑魔
                dd 
                    p - 亚托克斯在【杀意已决】状态下会变得更加强大，因此在他能够浇灌鲜血魔井时，就要谨慎地与他作战。
                    p - 亚托克斯的大部分伤害和生存能力都依赖于他的普通攻击，通过购买兰顿之兆或冰霜之心这类的减攻速装备可以帮助你极大的削减他的能力。

</template>


<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: this.$route.query.id
    };
  },
  data() {
    return {
      cur_skill: null
    };
  },
  beforeCreate() {
    this.$store.dispatch("fetchHeroDetail", this.$route.query.id);
  },
  created() {
    console.log("this.hero", this.hero);
  },
  mounted() {
    //this.cur_skill = this.hero[0].passive.name || null
    console.log(this)
  },
  computed: {
    ...mapState(["hero"])
  },
  watch: {
    hero(){
      this.cur_skill = this.hero[0].passive.name
    }
  },
  methods: {
    hotKey(index) {
      if (index === 0) {
        return "Q";
      } else if (index === 1) {
        return "W";
      } else if (index === 2) {
        return "E";
      } else if (index === 3) {
        return "R";
      }
    },
    showEquip(type, summoner) {
      if (type === "starting") {
        return "起始装备";
      } else if (type === "essential") {
        return "核心物品";
      } else if (type === "offensive") {
        if (!summoner) {
          return "进攻型物品";
        } else {
          return "";
        }
      } else if (type === "defensive") {
        if (!summoner) {
          return "防御型物品";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    tags(tag){
        if(tag==='Mage'){
            return '法师'
        }else if(tag==="Assassin"){
            return '刺客'
        }else if(tag==="Fighter"){
            return '战士'
        }else if(tag==="Tank"){
            return '坦克'
        }else if(tag==="Marksman"){
            return '射手'
        }else if(tag==="Support"){
            return '辅助'
        }
    }
  }
};
</script>

<style scoped lang='scss' src='../static/scss/detail.scss'></style>
