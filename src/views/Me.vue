<template>
  <div class="home">
  	<!--内容区域开始-->
		<div class="container">
			<!--用户头像-->
			<div class="row" style="margin-top: 50px;">
				<img src="../assets/user.png"/>
				<div style="color: darkslategrey;font-size: 18px;font-family: '微软雅黑';">
						<center>用户名：<span>{{currentUserName}}</span></center>
				</div>
		  </div>
		  <!--用户按钮列表-->
		  <div class="row" style="margin-top: 40px;">
		  	<div class="col-xs-12" style="border-bottom: 1px solid darkslategrey;border-top: 1px solid darkslategrey;">
		  		<!--修改身高-->
		  		<div>
		  			<div style="float: left;width: 60%;text-align: left;height: 50px;line-height: 50px;font-size: 17px;">
		  				我的身高：<span>{{currentHeight}}cm</span>
		  			</div>
		  			<div style="width: 40%;float: right; height: 50px">
			  			<div style="border: 1px solid darkslategrey;margin-top: 10px;font-size: 17px;height: 30px;line-height: 30px">
							<button class="zcf-me-btn-active" @click="updateCurrentHeight" style="background: rgba(0,0,0,0);margin-top: 0px;height: 30px;line-height: 30px;border: none;">点击修改</button>
			  			</div>
			  		</div>
		  		</div>
		  	</div>
		  </div>
		  <!--退出登录-->
	  	<div class="row" style="margin-top: 200px;">
	  		<button @click="loginOut" style="color: whitesmoke; background: #00CCCC;width: 80%;border-radius: 3px;height: 38px;font-size: 20px;border: none;">退出登录</button>
	  	</div>
		</div>
		<!--内容区域结束-->
  	<!--底部TAB栏开始-->
    <div class="zcf-tab">
      	<div class="zcf-homepage-btngroup">
      		<div>
      			<router-link to="/homepage" class="zcf-link"  active-class="zcf-active-btn">
	       		<span class="glyphicon glyphicon-home" style="font-size: 25px;"></span>
								<p>首页</p>
						</router-link>
      		</div>
      	</div>
      	<div class="zcf-homepage-btngroup">
      		<div>
      			<router-link to="/statistics" class="zcf-link"  active-class="zcf-active-btn">
      			<span class="glyphicon glyphicon-signal" style="font-size: 25px;"></span>
								<p>统计</p>
							</router-link>
      		</div>
      	</div>
      	<div class="zcf-homepage-btngroup">
      		<div id="">
      			<router-link to="/me" class="zcf-link"  active-class="zcf-active-btn">
	       		<span class="glyphicon glyphicon-user" style="font-size: 25px;"></span>
								<p>我的</p>
						</router-link>
      		</div>
      	</div>
    </div>
    <!--底部TAB栏结束-->
  </div>
</template>

<script>
import API from "../assets/api/API";

export default {

 data(){
 	return {
    currentHeight:"-", //身高，用户随时变更
    id:"", //用户id
		currentUserName:"-",
 	}
 },
 mounted () {
	this.isLogin();
 },
 methods: {
    isLogin(){
    	let id = window.sessionStorage.getItem("zcf-bmi-id");
    	if(!id){
    		//用户未登录
    		this.$router.push({ name: 'login', params: {}});
    	}else{
    		//用户已登录，获取用户信息
    		//TODO
            this.id = id;
    		console.log("用户已登录，获取信息");
    		this.getUserInfo();
    	}
    },
	 //获取用户信息
     getUserInfo(){
    this.axios.get(API.getUserInfoById,{params:{id:this.id}})
			.then(res =>{
                //是否请求成功
                if(res.data.status==0){
                    this.msg = res.data.err;
                    return;
                }
                this.currentHeight = res.data.data.height;
                this.currentUserName = res.data.data.username;

            })
     .catch(function (err) {
         console.log(err)
     })
     },
	 //更新单前身高
     updateCurrentHeight(){
         let that = this;
         this.$prompt('请输入身高', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             inputPattern:  /^\d+(?=\.{0,1}\d+$|$)/,
             inputErrorMessage: '身高只允许输入数字、小数'
         }).then(({ value }) => {
             that.axios.get(API.updateHeightById,{params:{id:that.id,height:value}})
                 .then(res => {
                     //是否请求成功
                     if(res.data.status==0){
                         that.msg = res.data.err;
                         return;
                     }
                   that.getUserInfo();
                 })
                 .catch(function (err) {
                     console.log(err)
                 })
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '取消输入'
             });
         });
     },
     loginOut(){
         console.log("用户退出登录");
         window.sessionStorage.setItem("zcf-bmi-id","");
         this.isLogin();
	 }
 }

}
</script>

<style>
	.zcf-me-btn-active:focus{
		outline: 0;
	}
	.zcf-tab{
		position: fixed;
		height: 55px;
		bottom: 0px;
		width: 100%;
		border-top: 1px solid black;
		padding-top: 5px;
		background: ghostwhite;
	}
	.zcf-homepage-btngroup{
		float: left;
		width: 33.3%;
		height: 100%;
		padding-left: 30px;
		padding-right: 30px;
	}
</style>
