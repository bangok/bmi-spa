<template>
  <div class="home">
  	  <router-link to="/homepage">首页</router-link> |
      <router-link to="/statistics">统计</router-link> |
      <router-link to="/me">我的</router-link> 
    <h1>这里是首页</h1>
    <img src="../assets/logo.png"/>
    {{msg}}
    <button @click="login">登录</button><br>
    <button @click="getInfo">访问</button>
    <button @click="testPost">测试post请求</button>
  </div>
</template>

<script>
export default {
	
 data(){
 	return {
 		msg:"测试"
 		
 	}
 },
 mounted () {
 	console.log(this.$route.params);
 	//VueX的用法
  console.log("用户名为："+this.$store.state.username);
  console.log("身高为："+this.$store.state.height);
  let value = "180";
  //使用commit来提交修改VueX状态（全局变量），用下面的方式传值，多个值传递封装成JS对象川景区
  this.$store.commit("updateHeight",value);
  console.log("修改后身高为："+this.$store.state.height);
  },
  methods: {
  	//Get请求用法
    login () {
    	let param = {a:"zcf"};
      this.axios.get('http://localhost:85/user/login',{params:param})
      .then(res => {
        console.log(res.data);
        this.msg = res.data;
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getInfo () {
      this.axios.get('http://localhost:85/test/all')
      .then(res => {
      	this.msg = res.data;
        console.log(res.data)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    //POST请求用法。注意：axios默认Content-Type的属性值为application/json
    testPost () {
    	let param = {info:"曹尼玛"};
      this.axios.post('http://localhost:85/test/testPost',param)
      .then(res => {
      	this.msg = res.data;
        console.log(res.data)
      })
      .catch(function (err) {
        console.log(err);
      })
    }
    
  }
 
}
</script>
