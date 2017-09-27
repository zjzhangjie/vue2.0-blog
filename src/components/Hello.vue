<template>
  <div class="hello">
    <h4 class="title">使用文档</h4>
  <el-steps :space="100" direction="vertical" >
  <el-step title="注册"></el-step>
  <el-step title="登录"></el-step>
  <el-step title="写博文"></el-step>
  <el-step title="发布博文（可以查看自己的博文，并进行删除修改）"></el-step>
  <el-step title="关注好友（可以取消关注，并发送私信）"></el-step>
  <el-step title="查看朋友圈动态（当好友发布博文时，动态会显示）"></el-step>
   <el-step title="消息（接受私信，可以进行回复）"></el-step>
    <el-step title="注销"></el-step>
</el-steps>
  </div>
</template>

<script>
export default {
  name: 'hello',
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~assets/global.css';x
    .hello{
      margin-left: -px;
      float: center;;
   background: ;}
</style>
