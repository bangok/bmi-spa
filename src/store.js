import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 *PS：由于JS语法的限制，vue没有办法直接修改全局变量，必须通过commit的方式来 提交更改
 * 
 * this.$store.state.username 来获取全局值
 * this.$store.commit("updateHeight",value); 来修改值
 * 在mutations中定义修改全局变量的方法
 */
export default new Vuex.Store({
  state: {
		username:"zcf",
		height:"175"
  },
  mutations: {
		updateHeight(state,value){
			state.height = value;
		}
  },
  actions: {

  }
})
