<template>
  <div class="">
    <!--头部-->
    <el-row> 
     <nav class="navbar ">
  <p class="navbar-text navbar-left navbar-invers"> <img src="./img/back.gif" width="30px" height="30px">欢迎来到ZJ博客 <a href="#" class="navbar-link">（ZJ）</a></p>
     </nav>
    </el-row>
    <el-row >
      <el-col :span="24">
       
   <div class="dtl31 jumbotron ">
                          <h1 class="title">Hello， men!!</h1>
                            <div class="dtl">
                                <h3>Hold on（本站寄语）</h3>
                               <p class="text">Hey! Do not so miserable<br>
  pull yourself together<br>
  keep your chin up<br>
  it is not as bad as your think<br>
  it will be over soon<br>
  things will work out for the best<br></p>
                                <a class="btn btn-primary btn-lg" href="https://cn.vuejs.org/v2/guide/state-management.html" role="button">Learn more(关于数据库)</a>
                            </div>
                        </div>

      </el-col>
    </el-row>
    <!--导航栏-->
    <el-row>
  <el-col :span="24">
   
   <div class="grid-content bg-purple-dark ">
     <el-menu :router="true" :default-active="active" class="el-menu header" mode="horizontal" @select="handleSelect">
      <el-menu-item class="logo" index="/">ZJ</el-menu-item>
      <el-menu-item index="/article?type=all">
      <i class="fa fa-flag" aria-hidden="true"></i>查阅</el-menu-item>
     </el-menu>
    </div>
    </el-col>
  
</el-row>
<el-row>
    <!--左边导航栏-->
  <el-col :span="6">
    <el-menu default-active="active" :router="true" class="el-menu-vertical-demo"  theme="dark">
       <template v-if="user">
      <el-submenu index="1" class="down">
        <template slot="title"><span class="glyphicon glyphicon-user"></span>个人中心</template>
        <el-menu-item-group title="博文">
          <el-menu-item  index="/article?type=me">我的博文</el-menu-item>
          <el-menu-item  index="/article/create">发布博文</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="社交">
            <el-menu-item index="friend">朋友圈</el-menu-item>
          <el-menu-item index="/followee">我的关注</el-menu-item>
            <el-menu-item index="/follower">粉丝</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="me" :route="{ name:'User', params:{ id : user.id }}"><sapn class="glyphicon glyphicon-cloud"></sapn>&nbsp;&nbsp;我的动态</el-menu-item>
      <el-menu-item index="/message"><span class="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;消息</el-menu-item>
        <li class="el-menu-item" @click="heandleExit"><i class="fa fa-sign-out" aria-hidden="true"></i> 注销</li>
       </template>
    <template v-else>
        <el-menu-item index="/signUp" ><i class="fa fa-user-o" aria-hidden="true"></i> 注册</el-menu-item>
        <el-menu-item index="/signIn" ><i class="fa fa-key" aria-hidden="true"></i> 登陆</el-menu-item>
      </template>  
    </el-menu>
  </el-col>
  <!--右边内容-->
   <el-col :span="17" class="margin-left">
         <router-view></router-view>
   </el-col>

</el-row>    
 <el-row>
  <footer class="main-footer">
    <div>
        <el-row>
            <el-col :span="8">
                <div class="widget">
                    <h4 class="title">友情链接</h4>
                    <div class="content friend-links">
                        <a href="http://www.bootcss.com/" title="Bootstrap中文网" onclick="_hmt.push(['_trackEvent', 'link', 'click', 'Bootstrap中文网'])" target="_blank">Bootstrap中文网</a>
                        <a href="http://www.golaravel.com/" title="Laravel中文网" onclick="_hmt.push(['_trackEvent', 'link', 'click', 'Laravel中文网'])" target="_blank">Laravel中文网</a>
                    </div>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="widget">
                    <h4 class="title">我用到的技术</h4>
                    <div class="content tag-cloud">
                        <a href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css"  target="_blank">
                        图标</a>
                        <a href="https://leancloud.cn/docs/leanstorage_guide-js.html" target="_blank">数据库</a>
                    <a href="">wangEditor 富文本编辑器</a>
                       
                    </div>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="widget">
                    <h4 class="title">作者</h4>
                    <div class="content friend-links">
                       <h5>姓名：张洁</h5>
                       <h5>Tel:15320217685</h5>
                       <h5>QQ:1215509447</h5>
                        <h5>学习视屏：番薯</h5>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</footer>
 </el-row>
  </div>


</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {

  name: 'Header',
  data() {
    return {
      active: '/'
    };
  },
  created(){//防止路由高亮
    this.active = this.$route.path;
    this.$router.afterEach((to,from) => {
      this.active = to.path;
    });
  },
  computed: mapState(['user']),//mapState 是将 Vuex 里面的状态映射到组件上面去。
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
      ...mapActions(['exit']),
      heandleExit(){
      this.exit();
      this.$api.SDK.User.logOut() // SDK 的退出
      this.$message.success('成功退出');
    }
  }
};
</script>

<style lang="css" scoped>
@import './css/stylesCode.css';

  .container{
    padding: 0 10%;
    background:#CCCCCC;
  }

  .right{
    float: right;
  }

  .logo{
    margin-left: 0;
    font-size: 25px;
    font-weight: 100;
    background: #393c73;
    color: #fff;
  }

  .logo:hover{
    background: #20a0ff;
  }
  .header{
    text-align: center;
    background:#284469;
  }
    .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-menu-vertical-demo{
   background:#284469;
   height: 800px;
  }
  .margin-left{
    margin-left:20px;

  }
.main-footer{
  margin-top: 0px;
  background: #1f2d3d;
  color: #878585;
}
.jumbotron{
  background: url('./img/back1.gif') no-repeat ;
  margin-top: -20px;
  width: 100%;
  height:500px;
      /*设置背景图大小*/  
            /*background-size: x y;*/  
            background-size: 100% 100%;  
            background-size: 100% 100%;  
            background-size: 100% 100%;  
            background-size: 100%;

}
.grid-content{
  margin-top: -15px;
}
.title{
  color:white;
}
.text{
  color:white;
}
.friend-links,.tag-cloud{
  text-align: center;
}
</style>