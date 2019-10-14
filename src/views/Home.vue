<template>
  <div class="home">
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
