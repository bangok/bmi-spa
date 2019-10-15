<template>
  <div class="home">
  	<!--内容区域开始-->
		<div class="container">
			<!--用户头像-->
			<div class="row" style="margin-top: 50px;">
				<img src="../assets/user.png"/>
				<div style="color: darkslategrey;font-size: 18px;font-family: '微软雅黑';">
						<center>用户名：<span>zcf</span></center>		
				</div>
		  </div>
		  <!--用户按钮列表-->
		  <div class="row" style="margin-top: 40px;">
		  	<div class="col-xs-12" style="border-bottom: 1px solid darkslategrey;border-top: 1px solid darkslategrey;">
		  		<!--修改身高-->
		  		<div>
		  			<div style="float: left;width: 60%;text-align: left;height: 50px;line-height: 50px;font-size: 17px;">
		  				我的身高：<span>180</span>cm
		  			</div>
		  			<div style="width: 40%;float: right;">
			  			<div style="border: 1px solid darkslategrey;margin-top: 10px;font-size: 17px;padding: 3px;">
			  				点击修改
			  			</div>
			  		</div>
		  		</div>
		  	</div>
		  </div>
		  <!--退出登录-->
	  	<div class="row" style="margin-top: 200px;">
	  		<button  style="color: whitesmoke; background: #00CCCC;width: 80%;border-radius: 3px;height: 38px;font-size: 20px;border: none;">退出登录</button>
	  	</div>
		</div>
		<!--内容区域结束-->
  	<!--底部TAB栏开始-->
    <div class="zcf-tab">
      	<div class="zcf-homepage-btngroup">
      		<div>
	       		<span class="glyphicon glyphicon-home" style="font-size: 25px;"></span>
	      		<p>首页</p>     			
      		</div>
      	</div>
      	<div class="zcf-homepage-btngroup">
      		<div>
      			<span class="glyphicon glyphicon-signal" style="font-size: 25px;"></span>
      			<p>统计</p>
      		</div>	
      	</div>
      	<div class="zcf-homepage-btngroup">
      		<div id="">
	       		<span class="glyphicon glyphicon-user" style="font-size: 25px;"></span>
	      		<p>我的</p>     			
      		</div>
      	</div>
    </div>
    <!--底部TAB栏结束-->
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
    
 }
 
}
</script>

<style>
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
