<template>
  <div v-if="current_user">
    <h3 class="title">昵称：{{ current_user.get('username') }}</h3>

    <hr>


      <div class="oprator" v-if="user">
        <el-button v-if="user.id != current_user.id" @click="toggleFollow">{{ followed? '取消关注':'关注' }}该用户</el-button>

        <el-button v-if="user.id != current_user.id" @click="dialogFormVisible = true">发送私信</el-button>
      </div>

      <el-dialog title="发送私信给该用户" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" label-width="80px" label-position="top" :rules="rules">
          <el-form-item label="私信内容" prop="msg">
            <el-input v-model="form.msg"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"  @click="sendMsg">确 定</el-button>
        </div>
      </el-dialog>
 <br>
    <el-card class="box-card overflower">
  <div v-for="article in articles" class="text item">
    <el-tooltip class="item" effect="dark" content="点击查看全文" placement="top-start">
        <router-link :to="{ name:'ArticleShow', params: { id: article.id }}"><span class="head el-icon-view ">博文主题:{{ article.get('title') }}</span></router-link>   
    </el-tooltip>
  </div>
</el-card>
    </div>

</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'user',

  data () {
    const id = this.$route.params.id;//当前用户的参数
    return {
      current_user: null,
      articles: null,
      followed: false,
      id,
      dialogFormVisible: false,
      form: {
        msg: ''
      },
      rules:{
        msg: [
          { required: true, message:'必填项', trigger: 'blur' },
        ]
      }
    };
  },
  computed: mapState(['user']),
  created(){
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser(){
      const id = this.id;
      let q = new this.$api.SDK.Query('_User');
      q.get(id).then((user) => {
        this.current_user = user;
        return user;
      }).then((user) => {
        this.getArticles(user);
        this.checkFollowed();
      }).catch(console.error);
    },
    getArticles(user){
      let q = new this.$api.SDK.Query('Article');
      q.equalTo('author', user);
      q.ascending('createdAt');
      q.find().then(articles => {
        this.articles = articles;
        this.$Progress.finish();
      }).catch(console.error)
    },
    toggleFollow(){
      const id = this.id;
      if(this.followed){
        // 取消关注
        this.user.unfollow(id).then(() => {
          this.followed = false;
          this.$message({type:'success', message: '取消关注成功'});
        }).catch(console.error);
      }else{
        // 关注
        this.user.follow(id).then(() => {
          this.followed = true;
          this.$message({type:'success', message: '关注成功'});
        }).catch(console.error);
      }
    },
    checkFollowed(){
      const id = this.id;
      const q = this.user.followeeQuery();
      q.include('followee');
      q.find().then(followee => {
        if (followee.length) {
          if (followee.some(f => f.id == id)) {
            this.followed = true;
          }
          return;
        }
      }).catch(console.error)

    },
    sendMsg(){
      if(!this.form.msg) {
        this.$message.error("信息不能为空");
        return;
      }
      const Status = this.$api.SDK.Status;
      const status = new Status(null,this.form.msg);
      status.set('from',this.user);
      status.set('to',this.current_user);
      Status.sendPrivateStatus(status,this.current_user.id).then((status) =>{
        if(status) {
          this.dialogFormVisible = false;
          this.$message({message:'发送私信成功', type:'success'});
        }

        },(err) =>{
        this.$message.error(err);
        })
    }
  },


};
</script>

<style lang="css" scoped>
.title{
  text-align: center;
  font-family: '华文行楷';
}
.overflower{
  height: 650px;
  overflow: scroll;
}
</style>
