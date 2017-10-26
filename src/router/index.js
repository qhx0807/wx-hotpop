import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Auth = resolve => require(['@/components/Auth'], resolve)
const My = resolve => require(['@/components/My'], resolve)
const List = resolve => require(['@/components/List'], resolve)


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
		},
		{
			path: '/my',
			name: 'my',
			component: My
		},
		{
			path: '/list',
			name: 'list',
			component: List
		}
	]
})
