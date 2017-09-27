<template>
  <div>
    <header>
      <h2 class="title">{{ title }}
      </h2>
    </header>
   
      <div class="overflower">
         <el-collapse  accordion>
      <article v-for="article in articles">
         
  <el-collapse-item >
     <template slot="title">
      <el-tooltip class="item" effect="dark" content="点击查看全文" placement="top-start">
        <router-link :to="{ name:'ArticleShow', params: { id: article.id }}"><span class="head">博文主题:{{ article.get('title') }}</span></router-link>   
    </el-tooltip>
     <el-tooltip class="item" effect="dark" content="查看博文列表！" placement="top-start">
       <router-link :to="{name: 'User', params: { id: article.get('author').id}}"><sapn class="head">(作者：{{ article.get('author').get('username') }})</sapn></router-link> 
    </el-tooltip>
    </template>
    <div v-html="article.get('content')"  ></div>
  </el-collapse-item>
 

      </article>
      </el-collapse>
      </div>
   

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'List',

  data () {
    return {
      title: '',
      articles: []
    };
  },
  created(){
      this.match();
  },
  watch: {
    ['$route.query']() {
      console.log('re render');
      this.articles = [];
      this.match();
    }
  },
  computed: mapState(['user']),
  methods: {
    match(){
      let flag = this.$route.query.type || this.$route.query.cid ;

      this.$Progress.start();

      switch(flag){
        case 'me':
          this.getMyArticles();
          break;
        case 'all':
          this.getAllArticles();
          break;
        default:
          this.getCategoryArticle(flag);
      }
    },
    query(){
      let q = new this.$api.SDK.Query('Article');
      q.include('category');
      q.include('author');
      q.descending('cratedAt'); // 新创建的在前面
      return q;
    },
    getCategoryObj(id){
      return this.$api.SDK.Object.createWithoutData('Category', id);
    },
    setArticles(q){
      q.find().then((articles) => {
          this.articles = articles;
          this.$Progress.finish();
      }).catch(this.fail);
    },
    fail(error){
      this.$message.error(error);
      this.$Progress.fail();
    },
    getAllArticles(){
      this.title = "所有博文";
      const q = this.query();
      this.setArticles(q);
    },
    getMyArticles(){
      this.title = "我的博文";
      const q = this.query();
      q.equalTo('author', this.user);
      this.setArticles(q);
    },
    // cid => category_id
    getCategoryArticle(cid){
      let cateObj = this.getCategoryObj(cid);
      const q = this.query();
      q.equalTo('category', cateObj);
      this.setArticles(q);
    }
  }
};
</script>

<style lang="css" scoped>
h2{
  text-align: center;
}

header{
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 5px;
  padding: 20px;
}
.title{
  text-align: center;
  font-family: '华文行楷';
}
.head{
    text-align: center;
  font-family: '华文行楷';
  color: black;
  font-size: 18px;
}
.overflower{
    height: 650px;
     overflow: scroll
}

</style>
