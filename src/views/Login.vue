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
					  <input type="text" class="form-control" placeholder="请输入账号" aria-describedby="basic-addon1" style="border-left: none;height: 45px;font-size: 18px;">
					</div>
					<div class="input-group" style="margin:30px auto;">
					  <span class="input-group-addon" id="basic-addon1" style="background-color: white;">
					  	<span class="glyphicon glyphicon-lock zcf-form-span"></span>
					  </span>
					  <input type="text" class="form-control" placeholder="请输入密码" aria-describedby="basic-addon1" style="border-left: none;height: 45px;font-size: 18px;">
					</div>
	    	</div>
	    </div>  		
	  	<div class="row" style="margin-top: 80px;">
	  		<button  style="color: whitesmoke; background: #00CCCC;width: 80%;border-radius: 4px;height: 43px;font-size: 23px;border: none;">登录</button>
	  		 <p style="margin-top: 20px; font-size: 16px;">没有账号？<router-link to="/register">去注册</router-link> </p>
	  	</div>
  	</div>
  </div>
</template>

<script>

export default {
	
 data(){
 	return {
 		msg:"密码错误"
 	}
 },
 mounted () {
  },
 methods: {
   tohome(){
   	/**
   	 * 编程式路由和传参，注意：应该使用name 而不是path
   	 * 路由传参请参考：https://router.vuejs.org/zh/guide/essentials/navigation.html
   	 * */
   	this.$router.push({
   		name: 'homepage',
   		params:{id:119114}
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
