<template>
  <div>
    <h2 class="title">我的关注</h2>
    <el-card class="box-card overflower"  v-if="followees.length">
  <div v-for="followee in followees" class="text item">
    <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
        <router-link :to="{ name: 'User', params: { id: followee.id } }">好友昵称：{{ followee.get('username') }}</router-link> 
    </el-tooltip>
  </div>
</el-card>
    <span v-else>你没有关注任何人</span>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {

  name: 'myFollowee',

  data () {
    return {
      followees: []
    };
  },
  computed: mapState(['user']),
  mounted(){
    this.getFollowee();
  },
  methods: {
    getFollowee(){
      const q = this.user.followeeQuery();
      q.include('followee');
      q.find().then((followees) => {
        this.followees = followees;
        this.$Progress.finish()
      }).catch((err) => {
        this.$message.error(err);
      })
    }
  }


};
</script>    

<style lang="css" scoped>
@import '~assets/global.css'
</style>