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
export default {
	
 data(){
 	return {
 		msg:"统计",
 		userInfo:{}, //==>js obj
 		startdate:"",// ==>String
 		enddate:"",//==>String
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
    		this.id = id;
    		console.log("用户已登录，获取信息");
    	}
    },
    getPageInfo(){
    	this.axios.get(API.getUserInfoById,{params:{id:this.id}})
      .then(res => {
        if(res.data.status==0){
        	this.msg = res.data.err;
        	return;
        }
			this.userInfo = res.data.data;
				let currdate = new Date(); //今日日期
				this.getWeightInfo(currdate);
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getWeightInfo(currdate){ // (入参:Date)
    	let d = currdate;
    	var enddate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate();
    	this.enddate = enddate;
    	//获取6天之前的时间，注意边界值
    	d.setTime(d.getTime()-6*24*60*60*1000);
    	//获取6天之前的日期
    	var startdate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate();
			//拼装请求参数
			let param = {
				startdate:startdate,
				enddate:enddate,
				userid:this.userInfo.id
			};
			//发送请求，获取一周内的体重信息
			this.axios.get(API.getRecordbYTimeSlot,{params:param})
      .then(res => {
      	//是否请求成功
        if(res.data.status==0){
        	this.msg = res.data.err;
        	return;
        }
        //重要：请求成功，全局保存用户体重信息
			this.recordList = res.data.data;
				//第三层：组装数据，并且渲染视图
				this.renderUserView();
      })
      .catch(function (err) {
        console.log(err)
      })
    }
    
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
