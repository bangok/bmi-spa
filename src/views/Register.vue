<template>
  <div class="home">
  	<div class="container">
  		<div class="row zcf-register-title">
	  		<h1>BMI计算器</h1>
	  	</div>
	    <div class="row">
	    	<div class="zcf-login-msg">
	    		{{msg}}
	    	</div>
	    	<div class="zcf-form">
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
					  <input type="password" class="form-control" v-model.trim="password" autocomplete="new-password" placeholder="请输入6位密码" aria-describedby="basic-addon1" style="border-left: none;height: 45px;font-size: 18px;">
					</div>
					<div class="input-group" style="margin:30px auto;">
					  <span class="input-group-addon" id="basic-addon1" style="background-color: white;">
					  	<span class="glyphicon glyphicon-lock zcf-form-span"></span>
					  </span>
					  <input type="password" class="form-control" v-model.trim="repassword" placeholder="请确认密码" aria-describedby="basic-addon1" style="border-left: none;height: 45px;font-size: 18px;">
					</div>
					<div class="input-group" style="margin:15px auto;">
					  <span class="input-group-addon" id="basic-addon1" style="background-color: white;">
					  	<span class="glyphicon glyphicon-indent-left zcf-form-span"></span>
					  </span>
					  <input type="text" class="form-control" v-model.trim="height" placeholder="请输入身高(cm)" aria-describedby="basic-addon1" style="border-left: none;height: 45px;font-size: 18px;">
					</div>
	    	</div>
	    </div>  	
	  	<div class="row" style="margin-top: 10px;">
	  		<button @click="register()" style="color: whitesmoke; background: #00CCCC;width: 80%;border-radius: 4px;height: 43px;font-size: 23px;border: none;">注册</button>
	  	  <p style="margin-top: 20px; font-size: 16px;">已有账号？<router-link to="/login">去登录</router-link> </p>
	  	</div>
  	</div>
  </div>
</template>

<script>
//引入API
import API from "../assets/api/API.js";

export default {
	
 data(){
 	return {
 		msg:"",
 		username:"",
 		password:"",
 		repassword:"",
 		height:""
 	}
 },
 mounted () {
  },
 methods: {
 	register(){
 		//var re=/^\d*\.{0,1}\d{0,1}$/; 体重校验
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
 		//确认密码
 		if(this.repassword==""){
 			this.msg = "请确认密码";
 			return;
 		}
 		if(this.repassword!=this.password){
 			this.msg = "两次输入的密码不一致";
 			return;
 		}
 		//校验身高
 		if(this.height==""){
 			this.msg = "身高为空";
 			return;
 		}
 		if(this.height==0){
 			this.msg = "身高不可以为0";
 			return;
 		}
 		reg = /^\d*\.{0}\d{0,1}$/; //整数，且不允许小数点
 		if(!reg.test(this.height)){
 			this.msg = "身高只允许正整数";
 			return;
 		}
 		//调用接口
 		let param = {
 			username:this.username,
 			password:this.password,
 			height:this.height
 		};
 		this.axios.post(API.register,param)
      .then(res => {
      	//请求成功
        //判断是否用户重名
        if(res.data.status==0){
        	this.msg = res.data.err;
        	return;
        }
        //注册成功，保存用户信息
        window.sessionStorage.setItem("zcf-bmi-id",res.data.data.userid);
        //3秒后进入首页
        this.tohome();
      })
      .catch(function (err) {
        console.log(err)
      })
 	},
  tohome(){
  	let that = this;
   	/**
   	 * 编程式路由和传参，注意：应该使用name 而不是path
   	 * 路由传参请参考：https://router.vuejs.org/zh/guide/essentials/navigation.html
   	 * */
   	let time = 3;
    that.msg = "注册成功，"+time+"秒后进入首面";
    var interval=setInterval(function(){
    	time --;
	    if(time==0){
		    clearInterval(interval);
		    that.$router.push({name: 'homepage'});
	    }
   	that.msg = "注册成功，"+time+"秒后进入首页";
    },1000);
   }
  
  }
 
}
</script>

<style>
	.zcf-register-title{
		margin-top: 30px;
		margin-bottom: 20px;
	}
	.zcf-register-title h1{
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
