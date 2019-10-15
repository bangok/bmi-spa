<template>
  <div class="home">
		<!--内容区域开始-->
		<div class="container">
			<div class="row" style="margin-top: 60px;">
				<h3>近<span>7</span>天体重趋势图</h3>
			</div>
			<div class="row" style="background: green;height: 280px;">
				
			</div>
			<div class="row" style="margin-top: 35px;">
				<!--日期选择按钮-->
				<div class="zcf-sta-btngroup" style="width: 45%;">
					<button class="btn btn-default">2019-1-10</button>
				</div>
				<div class="zcf-sta-btngroup" style="width: 10%;">
					<span style="font-family: '微软雅黑';font-size: 20px;font-weight: 500;">至</span>
				</div>
				<div class="zcf-sta-btngroup" style="width: 45%;">
					<button class="btn btn-default">2019-10-11</button>
				</div>
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
	.zcf-sta-btngroup{
		float: left;
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
