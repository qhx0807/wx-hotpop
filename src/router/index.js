import Vue from 'vue'
import Router from 'vue-router'
const Auth = resolve => require(['@/components/Auth'], resolve)
const My = resolve => require(['@/components/My'], resolve)
const Addr = resolve => require(['@/components/Addr'], resolve)
const AddrEdit = resolve => require(['@/components/AddrEdit'], resolve)
const Confirm = resolve => require(['@/components/Confirm'], resolve)
const AllOrder = resolve => require(['@/components/AllOrder'], resolve)
const Memo = resolve => require(['@/components/Memo'], resolve)
const Score = resolve => require(['@/components/Score'], resolve)
const Sort = resolve => require(['@/components/Sort'], resolve)
const List = resolve => require(['@/components/List'], resolve)
const Buy = resolve => require(['@/components/Buy'], resolve)
const Detail = resolve => require(['@/components/Detail'], resolve)

// import Auth from '@/components/Auth'
// import My from '@/components/My'
// import Buy from '@/components/Buy'
// import Detail from '@/components/Detail'
// import Addr from '@/components/Addr'
// import AddrEdit from '@/components/AddrEdit'
// import Confirm from '@/components/Confirm'
// import AllOrder from '@/components/AllOrder'
// import Memo from '@/components/Memo'
// import Score from '@/components/Score'
// import Sort from '@/components/Sort'
// import List from '@/components/List'


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
					path: '/addr',
					name: 'addr',
					component: Addr
				},
				{
					path: '/addredit',
					name: 'addredit',
					component: AddrEdit
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
				{
					path: '/memo',
					name: 'memo',
					component: Memo
				},
				{
					path: '/score',
					name: 'score',
					component: Score
				},
				{
					path: '/sort',
					name: 'sort',
					component: Sort
				},
				{
					path: '/buy',
					component: Buy,
					children:[
						{
							path: '/buy/list/:id',
							name: 'list',
							component: List
						},
						{
							path: '/buy/detail',
							name: 'detail',
							component: Detail
						}
					]
				},
			]
		}
	]
})
