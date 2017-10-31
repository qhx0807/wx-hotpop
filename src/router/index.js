import Vue from 'vue'
import Router from 'vue-router'
const Auth = resolve => require(['@/components/Auth'], resolve)
const My = resolve => require(['@/components/My'], resolve)
const List = resolve => require(['@/components/List'], resolve)
const Addr = resolve => require(['@/components/Addr'], resolve)
const AddrEdit = resolve => require(['@/components/AddrEdit'], resolve)
const Confirm = resolve => require(['@/components/Confirm'], resolve)
const AllOrder = resolve => require(['@/components/AllOrder'], resolve)


Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Auth,
			children: [
				{
					path: '/my',
					name: 'my',
					component: My
				},
				{
					path: '/list',
					name: 'list',
					component: List
				},
				{
					path: '/addr',
					name: 'addr',
					component: Addr
				},
				{
					path: '/confirm',
					name: 'confirm',
					component: Confirm
				},
				{
					path: '/allorder',
					name: 'allorder',
					component: AllOrder
				},
			],
		}
	]
})
