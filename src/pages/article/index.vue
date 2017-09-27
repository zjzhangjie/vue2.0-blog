<template>
<div >
 
    
  <template v-if="article">
    <h2>{{ article.get('title') }}
    <span class="font1">（ author: {{ article.get('author').get('username') }}&nbsp;&nbsp;cate: {{ article.get('category').get('name') }}
    ）</span>
    </h2>
    <div class="oprator" v-if="uid == article.get('author').id">
      <router-link :to="{ name:'ArticleEdit', params: {id: article.id} }"  tag="el-button">修改</router-link >
        <el-button type="primary" icon="delete"  @click="destroy"></el-button>
    </div>
<br>
   
<el-card class="box-card">
    <div class="content" v-html="article.get('content')" ></div>
          
</el-card>
     
  </template>
  
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  name: 'index',

  data () {
    return {
      article: null
    };
  },
  created(){
    const id = this.$route.params.id;
    this.getArticle(id);
  },
  computed: {
    ...mapGetters(['uid'])
  },
  methods: {
    getArticle(id){
      const q = new this.$api.SDK.Query('Article');
      q.include('author');
      q.include('category');
      q.get(id).then((article) => {
        this.article = article;
        this.$Progress.finish();
      }).catch(console.log)
    },
    destroy(){
      this.article.destroy().then(() => {
        this.$message({type:'success', message: '删除成功'});
        this.$router.replace({path:'/article?type=all'});
      })
    }
  }
};
</script>

<style lang="css" scoped>
.font1{
    font-weight: 100;
    font-size:16px;
}
.box-card{
    height: 650px;
    overflow: scroll
}

</style>
