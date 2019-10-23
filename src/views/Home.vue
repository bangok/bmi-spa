<template>
  <div class="home">
  	<!--内容区开始-->
  	<button @click="test">单元测试</button>
  	<div class="container" style="padding-bottom: 45px;border-bottom: 1px solid darkslategray;background: #CCFFFF;">
  		<!--当天日期-->
  		<div class="row zcf-home-toptime">
  			<div class="col-xs-12">
  				<div class="block">
				    <el-date-picker
				    	@change="changeDate"
				      v-model="currentDate"
				      format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
				      type="date"
				      :picker-options="pickerOptions"
				      placeholder="选择日期">
				    </el-date-picker>
				  </div>
  			</div>
  		</div>
  		<!--点击修改、今日体重圆圈-->
  		<div class="row" style="margin-top: 20px;">
  			<div class="col-xs-12">
  				<div class="zcf-home-circle">
  					<div style="margin-top: 40px;">
  						<div v-show="isHaveBmi">
  							<p>{{currentWeight}}Kg</p>
	  						<el-button type="text" @click="updateCurrentWeight">点击修改</el-button>
  						</div>
	  					<div v-show="!isHaveBmi">
	  						<p>今日未填写</p>
	  						<el-button type="text" @click="addCurrentWeight">点击填写</el-button>
	  					</div>					
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
	  						今日BMI<span>（{{bmiMsg}}）：</span>
	  					</div>
	  					<div class="zcf-bmi-right">
	  						{{bmi}}
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
					    	<th v-for="(item,index) in viewTableRecord">{{item.day}}</th>
					    </tr>
					    <tr class="zcf-home-table-value">
					    	<th v-for="(item,index) in viewTableRecord">{{item.tizhong}}</th>
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
import API from '../assets/api/API.js'	
	
export default {
	
 data(){
 	return {
 		isHaveBmi:false, //用来控制提示输入
 		msg:"测试",
 		dateId:"", //当天体重记录id
 		id:"", //用户id
 		userInfo:{}, //用户信息
 		recordList:[], //七天内体重记录列表，后台请求到的数据
 		bmi:"-", //当天bmi，切换的时候变动
 		bmiMsg:"",//bmi提示数据
 		currentDate:"",//当天日期，用户随时切换，字符串类型
 		currentWeight:"-", //当天体重，用户随时变更
 		viewTableRecord:[],//体重表格数据，视图渲染使用的数据
 		pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
    }
 	}
 },
 mounted () {
	this.isLogin();
	//通过回调、函数嵌套来保持同步关系，代码稍微冗乱
	this.getPageInfo();
  },
 methods: {
 	//获取格式化字符串的当日，JS的坑，不要用默认的.getDate()
 	getFormatDay(d){
 		let day = d.getDate();
 		switch (day) {
			    case 1:
			        day=  "01";
			        break;
			    case 2:
			         day= "02";
			         break;
			    case 3:
			         day= "03";
			         break;
			    case 4:
			         day= "04";
			         break;
			    case 5:
			         day= "05";
			         break;
			    case 6:
			         day= "06";
			         break;
			    case 7:
			         day= "07";
			         break;
			    case 8:
			         day= "08";
			         break;
			    case 9:
			         day= "09";
			         break;
			}
 		return day;
 	},
 	test(){
 		let day1 = new Date("2019-10-01");
 		let fd = this.getFormatDay(day1);
 		console.log(fd);
 	},
 	 changeDate(){
 	 	if(!this.currentDate){
 	 		return;
 	 	}
 		let d = new Date(this.currentDate);
 		this.$message({
				            type: 'success',
				            message: '操作成功'
		});
		this.getWeightInfo(new Date(d));
 	 },
   addCurrentWeight(){
 	 			let that = this;
        this.$prompt('请输入体重', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /^\d+(?=\.{0,1}\d+$|$)/,
          inputErrorMessage: '体重只允许输入数字、小数'
        }).then(({ value }) => {
          this.axios.get(API.addRecord,{params:{userid:this.id,weight:value*10,record_date:this.currentDate}})
			      .then(res => {
			      	//是否请求成功
			        if(res.data.status==0){
			        	this.msg = res.data.err;
			        	return;
			        }
			        this.$message({
				            type: 'success',
				            message: '操作成功'
				      });
			        //window.location.reload()
			        this.getWeightInfo(new Date(this.currentDate));
			        
			      })
			      .catch(function (err) {
			        console.log(err)
			      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
     },
 	 updateCurrentWeight(){
 	 			let that = this;
        this.$prompt('请输入体重', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /^\d+(?=\.{0,1}\d+$|$)/,
          inputErrorMessage: '体重只允许输入数字、小数'
        }).then(({ value }) => {
          this.axios.get(API.updateWeightById,{params:{id:this.dateId,weight:value*10}})
			      .then(res => {
			      	//是否请求成功
			        if(res.data.status==0){
			        	this.msg = res.data.err;
			        	return;
			        }
			        this.$message({
				            type: 'success',
				            message: '操作成功'
				      });
			       // window.location.reload()
			       this.getWeightInfo(new Date(this.currentDate));
			      })
			      .catch(function (err) {
			        console.log(err)
			      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
     },
 		//判断是否登录
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
    	//第一层：获取用户信息
    	this.axios.get(API.getUserInfoById,{params:{id:this.id}})
      .then(res => {
      	//是否请求成功
        if(res.data.status==0){
        	this.msg = res.data.err;
        	return;
        }
        //重要：请求成功，全局保存用户信息
			this.userInfo = res.data.data;
				//第二层：获取七天之内的体重信息
				let currdate = new Date(); //今日日期
				//currdate.setTime(currdate.getTime()-24*60*60*1000);
				this.getWeightInfo(currdate);
				
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    getWeightInfo(currdate){ //日期（Date）类型
    	//获取传进来的时间
    	let d = currdate;
    	//获取结束日期，并且保存到全局为当天日期（重要）
    	var enddate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + this.getFormatDay(d);
    	this.currentDate = enddate;
    	//获取6天之前的时间，注意边界值
    	d.setTime(d.getTime()-6*24*60*60*1000);
    	//获取6天之前的日期
    	var startdate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + this.getFormatDay(d);
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
    },
    renderUserView(){
    	/**
    	 * 1：recordList按照日期列表排序，算法：选择排序
    	 * */
    	let len = this.recordList.length;
    	let minIndex,temp;
    	for(let i=0;i<len-1;i++){
    		minIndex = i;
    		for(let j =i+1;j<len;j++){
    			if(new Date(this.recordList[j].record_date)<new Date(this.recordList[minIndex].record_date)){
    				minIndex = j; 
    			}
    		}
    		temp = this.recordList[i];
	      this.recordList[i] = this.recordList[minIndex];
	      this.recordList[minIndex] = temp;
    	}
    	/**
    	 * 2：计算今日BMI体质指数，并且渲染。
    	 * 公式：（BMI）=体重（kg）÷身高^2（m）
    	 * EX：70kg÷（1.75×1.75）=22.86
    	 * */
    	console.log(this.currentDate);
    	console.log(this.recordList);
    	for(let i = 0;i<this.recordList.length;i++){
    		if((new Date(this.currentDate)).getTime() == (new Date(this.recordList[i].record_date)).getTime()){
    			this.dateId = this.recordList[i].id; //保存当天体重记录，后面更新体重要用id
    			this.currentWeight=this.recordList[i].weight/10;
    			this.bmi = ((this.recordList[i].weight/10)/((this.userInfo.height/100)*(this.userInfo.height/100))).toFixed(1);
    			this.isHaveBmi = true;
    			break;
    		}
    		//当执行到最后一个元素完毕，还没有找到，说明没有该日数据
    		if(i==this.recordList.length-1){
    			this.bmi = "-";
    			this.currentWeight = "-";
    			this.isHaveBmi = false;
    			this.dateId ="";
    		}
    	}
    	//处理空数组的情况
  		if(this.recordList.length==0){
    			this.bmi = "-";
    			this.currentWeight = "-";
    			this.isHaveBmi = false;
    			this.dateId ="";
  		}
			/**
    	 * 3：更新bmi提示信息
    	 * */
    	if(this.bmi=="-"){
    		this.bmiMsg = "-";
    	}else if(this.bmi<18.5){
				this.bmiMsg = "偏瘦";
			}else if(this.bmi<24.0){
				this.bmiMsg = "正常";
			}else if(this.bmi<27.0){
				this.bmiMsg = "偏胖";
			}else if(this.bmi<30.0){
				this.bmiMsg = "肥胖";
			}else{
				this.bmiMsg = "严重肥胖";
			}
			/**
    	 * 4：更新一周内的体重表格图，更新viewTableRecord的值，注意：比较日期的时候用全等于
    	 * */
    	let mockDate = new Date(this.currentDate);
    	let mockList = [];
    	for(let i=0;i<7;i++){
    		let day1 = mockDate.getFullYear()+"-" + (mockDate.getMonth()+1) + "-" + this.getFormatDay(mockDate);
    		let day2 = mockDate.getDay();
    		let mockRecord = {day:day2,tizhong:"-"};
    		for(let j=0;j<this.recordList.length;j++){
    			if(this.recordList[j].record_date===day1){
    				mockRecord = {day:day2,tizhong:this.recordList[j].weight/10};
    			}
    		}
    		mockList.push(mockRecord);
    		mockDate.setTime(mockDate.getTime()-24*60*60*1000);
    	}
    	//4.1：整理整理渲染数据，转换数字周次为中文，并且取反序
			mockList.reverse();
		
			for(let i =0;i<mockList.length;i++){
				if(mockList[i].day==0){
					mockList[i].day="周日";
					continue;
				}
				if(mockList[i].day==1){
					mockList[i].day="周一";
					continue;
				}
				if(mockList[i].day==2){
					mockList[i].day="周二";
					continue;
				}
				if(mockList[i].day==3){
					mockList[i].day="周三";
					continue;
				}
				if(mockList[i].day==4){
					mockList[i].day="周四";
					continue;
				}
				if(mockList[i].day==5){
					mockList[i].day="周五";
					continue;
				}
				if(mockList[i].day==6){
					mockList[i].day="周六";
					continue;
				}
			}
    	this.viewTableRecord = mockList;
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
