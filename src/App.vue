<template>
  <div id="app">
     <vue-progress-bar></vue-progress-bar>
    <my-header></my-header>
   

  </div>
</template>

<script>
import MyHeader from '@/components/Header';
export default {
  name: 'app',
  mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
   // this.$router.afterEach((to, from) => {
      //this.$Progress.finish()
   //' })
  },
  components: {
    MyHeader
  }
}

</script>

<style>

#app{
  background: #ffffff;

}
</style>
