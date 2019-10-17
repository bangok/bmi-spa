<template>
  <div class="home">
  	<!--内容区开始-->
  	<div class="container" style="padding-bottom: 45px;border-bottom: 1px solid darkslategray;background: #CCFFFF;">
  		<!--当天日期-->
  		<div class="row zcf-home-toptime">
  			<div class="col-xs-12">
  				<div>
  					<span style="color: darkslategray;font-family: '微软雅黑';font-size: 20px;">2019-10-12(点击切换)</span>
  					<div style="border: 1px solid darkslategrey;width:57%;margin: 0 auto;"></div>
  				</div>
  			</div>
  		</div>
  		<!--点击修改、今日体重圆圈-->
  		<div class="row" style="margin-top: 20px;">
  			<div class="col-xs-12">
  				<div class="zcf-home-circle">
  					<div style="margin-top: 40px;">
	  					<p>80Kg</p>
	  					<p>点击修改</p>						
  					</div>
  				</div>
  			</div>
  		</div>
  		<!--今日BMI-->
  		<div class="row" style="margin-top: 20px;">
  			<div class="col-xs-12">
  				<div style="border: 1px solid darkslategrey;height: 70px;background: white;">
  					<div style="margin-top: 20px;">
	   					<div class="zcf-bmi-left">
	  						今日BMI<span>（超重）：</span>
	  					</div>
	  					<div class="zcf-bmi-right">
	  						26.1
	  					</div> 						
  					</div>

  				</div>
  			</div>
  		</div>
  	</div>
  	<!--内容区结束-->
  	<!--近一周体重开始-->
  		<div class="container">
	  		<div class="row" style="margin-top: 20px;">
	  			<h4>近一周体重表（单位：Kg）</h4>	
	  			<div class="container">
	  				<div class="table-responsive">
					  <table class="table zcf-home-table">
					    <tr class="zcf-home-table-zhou">
					    	<th>周一</th>
					    	<th>周一</th>
					    	<th>周一</th>
					    	<th>周一</th>
					    	<th>周一</th>
					    	<th>周一</th>
					    	<th>周一</th>
					    </tr>
					    <tr class="zcf-home-table-value">
					    	<th>80.0</th>
					    	<th>80.0</th>
					    	<th>80.0</th>
					    	<th>80.0</th>
					    	<th>80.0</th>
					    	<th>80.0</th>
					    	<th>80.0</th>
					    </tr>
					  </table>
					</div>
	  			</div>
	  		</div>  			
  		</div>
  		<!--近一周体重结束-->
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
	this.isLogin();
  },
 methods: {
 	//判断是否登录
    isLogin(){
    	let id = window.sessionStorage.getItem("zcf-bmi-id");
    	if(!id){
    		//用户未登录
    		this.$router.push({ name: 'login', params: {}});
    	}else{
    		//用户已登录，获取用户信息
    		//TODO
    		console.log("用户已登录，获取用户信息");
    	}
    }
 }
 
}
</script>

<style>
	.zcf-bmi-left,.zcf-bmi-right{
		font-size: 18px;
		font-family: "微软雅黑";
	}
	.zcf-bmi-left{
		float: left;
		width: 65%;
	}
	.zcf-home-circle p{
		color: darkgreen;
		font-family: "微软雅黑";
		font-size: 17px;
	}
	.zcf-home-circle{
		border: 1px solid darkslategray;
		width: 140px;
    height: 140px;
    border-radius: 50%;
    margin: 0 auto;
    background: white;
	}
	.zcf-home-toptime{
		margin-top: 45px;
	}
	.zcf-home-table{
		border: 1px solid darkslategrey;
	}
	.zcf-home-table-zhou{
		border-bottom: 1px solid grey;
	}
	.zcf-home-table-zhou th{
		height: 30px;
	}
	.zcf-home-table-value th{
		height: 50px;
	}
	.zcf-home-table th{
		text-align: center;
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
