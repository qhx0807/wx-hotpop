import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    listData: [],
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