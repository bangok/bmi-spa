<template>
	<div class="home">
		<!--内容区域开始-->
		<div class="container">
			<!--<button @click="test">单元测试</button>-->
			<div class="row" style="margin-top: 60px;">
				<h3>近<span>7</span>天体重趋势图</h3>
			</div>
			<div class="row" style="">
				<div id="main" style="width: auto;height:350px;"></div>
			</div>
			<div class="row" style="margin-top: 35px;">
				<!--日期选择按钮-->
				<div class="zcf-sta-btngroup" style="width: 45%;">
  				<div class="block">
				    <el-date-picker
				    	:picker-options="pickerOptions"
				    	size="small"
				    	@change="changeStartDate"
				      v-model="startdate"
				      format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				  </div>
				</div>
				<div class="zcf-sta-btngroup" style="width: 10%;">
					<span style="font-family: '微软雅黑';font-size: 20px;font-weight: 500;">至</span>
				</div>
				<div class="zcf-sta-btngroup" style="width: 45%;">
  				<div class="block">
				    <el-date-picker
				    	:picker-options="pickerOptions"
				    	@change="changeEndDate"
				    	size="small"
				      v-model="enddate"
				      format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				  </div>
				</div>
			</div>
		</div>
		<!--内容区域结束-->
		<!--底部TAB栏开始-->
		<div class="zcf-tab">
			<div class="zcf-homepage-btngroup">
				<div>
					<router-link to="/homepage" class="zcf-link" active-class="zcf-active-btn">
						<span class="glyphicon glyphicon-home" style="font-size: 25px;"></span>
						<p>首页</p>
					</router-link>
				</div>
			</div>
			<div class="zcf-homepage-btngroup">
				<div>
					<router-link to="/statistics" class="zcf-link" active-class="zcf-active-btn">
						<span class="glyphicon glyphicon-signal" style="font-size: 25px;"></span>
						<p>统计</p>
					</router-link>
				</div>
			</div>
			<div class="zcf-homepage-btngroup">
				<div id="">
					<router-link to="/me" class="zcf-link" active-class="zcf-active-btn">
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

		data() {
			return {
		 		pickerOptions: {
		          disabledDate(time) {
		            return time.getTime() > Date.now();
		          }
		    },
				dateViewList: [],//==>Array<String> 折线图横坐标日期
				weightViewList: [],//==>Array<float>  折线图体重曲线数据
				bmiViewList: [],//==>Array<float>  折线图bmi值列表
				msg: "统计",
				userInfo: {}, //==>obj
				startdate: "", // ==>String 开始日期
				enddate: "", //==>String  结束日期
				recordList: [] //==>Array<obj>
			}
		},
		mounted() {
			this.isLogin();
			this.getPageInfo();
			this.initEcharts();
		},
		methods: {
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
			 		console.log(this.startdate);
					console.log(this.enddate);
			 	},
			changeStartDate(){
				if(this.startdate==null){
					return;
				}
				if(new Date(this.startdate)>new Date(this.enddate)){
					this.$message({
            type: 'error',
            message: '开始时间不能大于结束时间'
          }); 
          return;
				}
				this.$message({
            type: 'success',
            message: '操作成功'
        });
        let d1 = new Date(this.startdate);
        let d2 = new Date(this.enddate);
        this.getWeightInfo(d1,d2);
			},
			changeEndDate(){
				if(this.enddate==null){
					return;
				}
				if(new Date(this.startdate)>new Date(this.enddate)){
					this.$message({
            type: 'error',
            message: '开始时间不能大于结束时间'
          }); 
          return;
				}
				this.$message({
            type: 'success',
            message: '操作成功'
        }); 
        let d1 = new Date(this.startdate);
        let d2 = new Date(this.enddate);
        this.getWeightInfo(d1,d2);
			},
			initEcharts(dateViewList,weightViewList,bmiViewList){
				var myChart = this.$echarts.init(document.getElementById('main'));
				var option = {
					title: {
						text: ''
					},
					legend: {
                data:['BMI','体重']
         },
					xAxis: {
						type: 'category',
						data: dateViewList
					},
					tooltip: {
						trigger: 'axis',
						formatter(value) {
							var res = '日期：' + value[0].name + '<br/>';
							res += '体重：' + value[1].value + 'kg<br/>';
							res += 'BMI值：' + value[0].value + '<br/>';
							return res;
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name:'BMI',
							data: bmiViewList,
							type: 'line',
							color:'#FFA07A',
							label: {
								normal: {
									show: true,
									position: 'top', //头上显示数据
									color: 'black' //显示文字颜色
								}
							},
	
						}, {
							name:'体重',
							data: weightViewList,
							type: 'line',
							color:'#1E90FF',
							label: {
								normal: {
									show: true,
									position: 'top', //头上显示数据
									color: 'black' //显示文字颜色
								}
							},
						}
	
					]
				};
				myChart.setOption(option);
			},
			isLogin() {
				let id = window.sessionStorage.getItem("zcf-bmi-id");
				if(!id) {
					//用户未登录
					this.$router.push({
						name: 'login',
						params: {}
					});
				} else {
					//用户已登录，获取用户信息
					this.id = id;
					console.log("用户已登录，获取信息");
				}
			},
			getPageInfo() {
				this.axios.get(API.getUserInfoById, {
						params: {
							id: this.id
						}
					})
					.then(res => {
						if(res.data.status == 0) {
							this.msg = res.data.err;
							return;
						}
						this.userInfo = res.data.data;
						let d1 = new Date(); //开始时间，默认6天前
						let d2 = new Date(); //结束时间，默认今日
						d1.setTime(d1.getTime()-6*24*60*60*1000);
						this.getWeightInfo(d1,d2);
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			getWeightInfo(d1,d2) { //d1 ：开始时间（Date类型） d2 ：结束时间（Date类型）
				var enddate = d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + this.getFormatDay(d2);
				this.enddate = enddate;
				var startdate = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + this.getFormatDay(d1);
				this.startdate = startdate;
				//拼装请求参数
				let param = {
					startdate: startdate,
					enddate: enddate,
					userid: this.userInfo.id
				};
				//发送请求，获取一周内的体重信息
				this.axios.get(API.getRecordbYTimeSlot, {
						params: param
					})
					.then(res => {
						//是否请求成功
						if(res.data.status == 0) {
							this.msg = res.data.err;
							return;
						}
						//重要：请求成功，全局保存用户体重信息
						this.recordList = res.data.data;
						//第三层：组装数据，并且渲染视图
						this.renderUserView();
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			renderUserView() {
				/**
				 * 1：recordList按照日期列表排序，算法：选择排序
				 * */
				let len = this.recordList.length;
				let minIndex, temp;
				for(let i = 0; i < len - 1; i++) {
					minIndex = i;
					for(let j = i + 1; j < len; j++) {
						if(new Date(this.recordList[j].record_date) < new Date(this.recordList[minIndex].record_date)) {
							minIndex = j;
						}
					}
					temp = this.recordList[i];
					this.recordList[i] = this.recordList[minIndex];
					this.recordList[minIndex] = temp;
				}
				
				/**
				 * 2:组装折线图所需数据，并且渲染
				 * */
				//2.1：拼装横轴日期，并且保存全局
				let mockDateList = [];
				for(let i = 0;i<this.recordList.length;i++){
					mockDateList.push(this.recordList[i].record_date);
				}
				this.dateViewList = mockDateList;
				//2.2：拼装体重视图数据，并且保存全局
				let mockWeightList = [];
				for(let i = 0;i<this.recordList.length;i++){
					mockWeightList.push(this.recordList[i].weight/10);
				}
				this.weightViewList = mockWeightList;
				//2.2：拼装bmi视图数据，并且保存全局
				let mockBmiList = [];
				let h = this.userInfo.height/100;
				for(let i=0;i<mockWeightList.length;i++){
					let mockBmi = (mockWeightList[i]/(h*h)).toFixed(1);
					mockBmiList.push(mockBmi);
				}
				this.bmiViewList = mockBmiList;
				//2.3: 渲染折线图
				this.initEcharts(this.dateViewList,this.weightViewList,this.bmiViewList);
			}

		}

	}
</script>

<style>
	.zcf-sta-btngroup {
		float: left;
	}
	
	.zcf-tab {
		position: fixed;
		height: 55px;
		bottom: 0px;
		width: 100%;
		border-top: 1px solid black;
		padding-top: 5px;
		background: ghostwhite;
	}
	
	.zcf-homepage-btngroup {
		float: left;
		width: 33.3%;
		height: 100%;
		padding-left: 30px;
		padding-right: 30px;
	}
</style>