import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    listData: [{"Contents":"","CommodityID":"0e14f79b-9762-443a-9a00-30d2f39b43f3","Name":"嘴乐海鲜火锅","Parameter":"","Price":"41.80","ShelfTime":"2017-10-30 14:30:52","Stock":"1000000","HomeImage":"","TitleImage":"","ContentImage":"","num":1},{"Contents":"","CommodityID":"3885584e-b8c8-458b-8d52-08d22f96c0cc","Name":"卤家庄俏皮晶","Parameter":"","Price":"10.00","ShelfTime":"2017-10-30 14:36:29","Stock":"1000000","HomeImage":"","TitleImage":"","ContentImage":"","num":1},{"Contents":"","CommodityID":"8a055100-e78b-48ac-8ad9-75dda32df997","Name":"海鲜+素菜豪华套餐","Parameter":"","Price":"54.00","ShelfTime":"2017-10-30 14:32:48","Stock":"1000000","HomeImage":"","TitleImage":"","ContentImage":"","num":1}],
}

export default new Vuex.Store({
  	state,
 	mutations: {
	    UPDATE_LIST (state, data) {
	      	state.listData = data
	    }
  	},
  	actions: {
	    
	}
})