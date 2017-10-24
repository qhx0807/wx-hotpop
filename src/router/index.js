import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Auth = resolve => require(['@/components/auth'], resolve)


Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: HelloWorld
		},
		{
			path: '/auth',
			name: 'auth',
			component: Auth
		}
	]
})
