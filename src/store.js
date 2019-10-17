import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 *PS：由于JS语法的限制，vue没有办法直接修改全局变量，必须通过commit的方式来 提交更改
 * 
 * this.$store.state.username 来获取全局值
 * this.$store.commit("updateHeight",value); 来修改值
 * 在mutations中定义修改全局变量的方法
 * 注意：刷新会导致vue实例重新渲染，从而导致store丢失！
 */
export default new Vuex.Store({
  state: {
		username:"",
		height:"",
		userid:""
  },
  mutations: {
		updateHeight(state,value){
			state.height = value;
		},
		updateUsername(state,value){
			state.username = value;
		},
		updateUserid(state,value){
			state.userid = value;
		}
  },
  actions: {

  }
})
