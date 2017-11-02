import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	listData: [],
	detailObj:{},
}

export default new Vuex.Store({
	state,
	mutations: {
		UPDATE_LIST(state, data) {
			state.listData = data
		},

		ADD_LIST_ITEM(state, id) {
			let target = state.listData.find(function (item) {
				return item.CommodityID == id
			})
			target.num += 1
		},

		SUB_LIST_ITEM(state, id) {
			let target = state.listData.find(function (item) {
				return item.CommodityID == id
			})
			if (target.num > 0) target.num -= 1
			return false
		},

		UPDATE_dETAIL(state, obj){
			state.detailObj = obj
		}
	}
})