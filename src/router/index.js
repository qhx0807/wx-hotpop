import Vue from 'vue'
import Router from 'vue-router'
const Auth = resolve => require(['@/components/page/Auth'], resolve)
const My = resolve => require(['@/components/page/My'], resolve)
const Addr = resolve => require(['@/components/address/Addr'], resolve)
const AddrEdit = resolve => require(['@/components/address/AddrEdit'], resolve)
const Confirm = resolve => require(['@/components/buy/Confirm'], resolve)
const AllOrder = resolve => require(['@/components/order/AllOrder'], resolve)
const Memo = resolve => require(['@/components/message/Memo'], resolve)
const Score = resolve => require(['@/components/score/Score'], resolve)
const Sort = resolve => require(['@/components/buy/Sort'], resolve)
const List = resolve => require(['@/components/buy/List'], resolve)
const Buy = resolve => require(['@/components/buy/Buy'], resolve)
const Detail = resolve => require(['@/components/buy/Detail'], resolve)
const Group = resolve => require(['@/components/buy/Group'], resolve)
const OrderInfo = resolve => require(['@/components/order/OrderInfo'], resolve)
const PopuCenter = resolve => require(['@/components/popularize/PopuCenter'], resolve)
const PopuUser = resolve => require(['@/components/popularize/PopuUser'], resolve)
const MyOrder = resolve => require(['@/components/popularize/MyOrder'], resolve)
const MySubUser = resolve => require(['@/components/popularize/MySubUser'], resolve)
const CashRecords = resolve => require(['@/components/popularize/CashRecords'], resolve)
const CashApply = resolve => require(['@/components/popularize/CashApply'], resolve)
const SharePopu = resolve => require(['@/components/popularize/SharePopu'], resolve)
const MySubUserOrder = resolve => require(['@/components/popularize/MySubUserOrder'], resolve)

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
					path: '/auth/popucenter',
					name: 'popucenter',
					component: PopuCenter
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
				{
					path:'/auth/popuuser',
					name:'popuuser',
					component: PopuUser,
				},
				{
					path:'/auth/myorder',
					name:'myorder',
					component: MyOrder,
				},
				{
					path:'/auth/popumyorder',
					name:'popumyorder',
					component: MyOrder,
				},
				{
					path:'/auth/mysubuser',
					name:'mysubuser',
					component: MySubUser,
				},
				{
					path:'/auth/cashrecords',
					name:'cashrecords',
					component: CashRecords,
				},
				{
					path:'/auth/cashapply',
					name:'cashapply',
					component: CashApply,
				},
				{
					path:'/auth/mysubuserorder',
					name:'mysubuserorder',
					component: MySubUserOrder,
				},
				{
					path:'/auth/popushare',
					name:'popushare',
					component: SharePopu,
				},
			]
		}
	]
})
