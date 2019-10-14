<template>
  <div class="home">
    <h1>登录页面</h1>
    <button @click="tohome">去主页</button>
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
