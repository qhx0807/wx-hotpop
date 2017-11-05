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
const Group = resolve => require(['@/components/Group'], resolve)
const OrderInfo = resolve => require(['@/components/OrderInfo'], resolve)

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
					path: '/auth/my',
					name: 'my',
					component: My
				},
				{
					path: '/auth/addr',
					name: 'addr',
					component: Addr
				},
				{
					path: '/auth/addredit',
					name: 'addredit',
					component: AddrEdit
				},
				{
					path: '/auth/confirm',
					name: 'confirm',
					component: Confirm
				},
				{
					path: '/auth/allorder/:t',
					name: 'allorder',
					component: AllOrder
				},
				{
					path: '/auth/orderinfo/:id',
					name: 'orderinfo',
					component: OrderInfo
				},
				{
					path: '/auth/memo',
					name: 'memo',
					component: Memo
				},
				{
					path: '/auth/score',
					name: 'score',
					component: Score
				},
				{
					path: '/auth/sort',
					name: 'sort',
					component: Sort
				},
				{
					path: '/auth/group',
					name: 'group',
					component: Group
				},
				{
					path: '/auth/buy',
					component: Buy,
					children:[
						{
							path: '/auth/buy/list/:id',
							name: 'list',
							component: List
						},
						{
							path: '/auth/buy/detail',
							name: 'detail',
							component: Detail
						}
					]
				},
			]
		}
	]
})
