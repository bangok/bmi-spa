<template>
  <div class="home">
  	<div class="container">
  		<div class="row zcf-login-title">
	  		<h1>BMI计算器</h1>
	  	</div>
	    <div class="row">
	    	<div class="zcf-login-msg">
	    		{{msg}}
	    	</div>
	    	<div class="zcf-form" style="margin-bottom: 60px;">
	    		<div class="input-group" style="margin:30px auto;">
					  <span class="input-group-addon" id="basic-addon1" style="background-color: white;">
					  	<span class="glyphicon glyphicon-user zcf-form-span"></span>
					  </span>
					  <input type="text" class="form-control" v-model.trim="username" placeholder="请输入用户名" aria-describedby="basic-addon1" style="border-left: none;height: 45px;font-size: 18px;">
					</div>
					<div class="input-group" style="margin:30px auto;">
					  <span class="input-group-addon" id="basic-addon1" style="background-color: white;">
					  	<span class="glyphicon glyphicon-lock zcf-form-span"></span>
					  </span>
					  <input type="password" class="form-control" v-model.trim="password" placeholder="请输入密码" aria-describedby="basic-addon1" style="border-left: none;height: 45px;font-size: 18px;">
					</div>
	    	</div>
	    </div>  		
	  	<div class="row" style="margin-top: 80px;">
	  		<button @click="login()" style="color: whitesmoke; background: #00CCCC;width: 80%;border-radius: 4px;height: 43px;font-size: 23px;border: none;">登录</button>
	  		 <p style="margin-top: 20px; font-size: 16px;">没有账号？<router-link to="/register">去注册</router-link> </p>
	  	</div>
  	</div>
  </div>
</template>

<script>
import API from '../assets/api/API.js'

export default {
	
 data(){
 	return {
 		msg:"",
 		username:"",
 		password:""
 	}
 },
 mounted () {
 },
 methods: {
 	login(){
 		let reg = /^[a-zA-Z0-9]+$/;//英文、数字
 		//校验用户名
 		if(this.username==""){
 			this.msg = "用户名为空";
 			return;
 		}
 		if(this.username.length<3){
 			this.msg = "用户名长度至少三位";
 			return;
 		}
 		if(this.username.length>8){
 			this.msg = "用户名长度至多八位";
 			return;
 		}
 		if(!reg.test(this.username)){
 			this.msg = "用户名只允许英文、数字";
 			return;
 		}
 		//判断密码
 		if(this.password==""){
 			this.msg = "密码为空";
 			return;
 		}
 		if(this.password.length!=6){
 			this.msg = "请输入6位密码";
 			return;
 		}
 		if(!reg.test(this.password)){
 			this.msg = "密码只允许英文、数字";
 			return;
 		}
 		let param = {
 			username:this.username,
 			password:this.password
 		};
 		this.axios.post(API.login,param)
      .then(res => {
      	//请求成功
        //判断是否登陆失败
        if(res.data.status==0){
        	this.msg = res.data.err;
        	return;
        }
        //登录成功，保存用户id
        //将数据保存到localStorage中放置刷新数据丢失
  			window.sessionStorage.setItem("zcf-bmi-id",res.data.data.userid);
      	this.$router.push({name: 'homepage'});
      })
      .catch(function (err) {
        console.log(err)
      })
 	}
 	
  }
 
}
</script>

<style>
	.zcf-login-title{
		margin-top: 85px;
		margin-bottom: 85px;
	}
	.zcf-login-title h1{
		font-family: '微软雅黑';
		font-size: 45px;
		font-weight: 600;
		color: #2C3E50;
	}
	.zcf-form{
		margin: 0 auto;
		width: 80%;
	}
	.zcf-form-span{
		font-size: 25px;
		background: white;
	}
	.zcf-login-msg{
		color: red;
		font-family: "微软雅黑";
		font-size: 18px;
		font-weight: 600;
	}
</style>
