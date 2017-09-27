<template>
  <div>
    <h2 class="title">我的粉丝</h2>
 
    <ul class="list-group overflower"  v-if="followers.length" >
  <li class="list-group-item" v-for="(follower,index) in followers">
    <span class="badge" >{{index}}</span>
     <router-link :to="{ name: 'User', params: { id: follower.id } }">用户昵称：{{ follower.get('username') }}</router-link>
  </li>
</ul>
    <span v-else>你没有粉丝</span>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {

  name: 'myFollower',

  data () {
    return {
      followers: [],
     
    };
  },
  computed: mapState(['user']),
  created(){
    this.getFollower();
  },
  methods:{
    getFollower(){
      const q = this.user.followerQuery();
      q.include('follower');
      q.find().then((followers) => {
        this.followers = followers;
        this.$Progress.finish()
      }).catch(console.log);
    }
  }


};
</script>

<style lang="css" scoped>
@import '~assets/global.css';

.overflower{
  background: #fff;
}
</style>