<template lang="pug">
  section.container
    img(src="../static/img/logo.png" alt="Nuxt.js Logo")
    h1.title {{ error.statusCode }}

    h2.info {{ error.message }}
    nuxt-link.button(to="/" v-if="error.statusCode === 404") Homepage
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
