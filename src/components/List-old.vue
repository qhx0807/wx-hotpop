<template>
	<div class="wrap" id="listWrap">
		<Loading class="loading" v-if="isLoading"></Loading>
		<div class="list">
			<ul class="list-ul">
				<li v-for="item in listData" :key="item.CommodityID" @click="seeHotDetail(item)">
					<div class="icon">
						<img src="http://os70o8m36.bkt.clouddn.com/share.bmp">
					</div>
					<div class="content">
						<h4>{{item.Name}}</h4>
						<p>内容内容内容容内容内容内容内容容内容内容内容内容容内容</p>
						<h3>￥{{item.Price}}</h3>
					</div>
					<span class="operator">
						<span v-show="item.num>0">
							<i class="iconfont icon-jian" @click.stop="subOfCar(item)"></i>
							<span class="num">{{item.num}}</span>
						</span>
						<i class="iconfont icon-add" @click.stop="addToCar(item,$event)"></i>
					</span>
				</li>

			</ul>
		</div>
		<div class="shopcart">
			<div class="content">
				<div class="content-left" @click="clickCarLeft">
					<div class="logo-wrapper">
						<div class="logo " id="tantan" :class="{highlight:carList.length>0}">
							<i class="icon-shopping_cart iconfont icon-gouwuche" id="car"></i>
						</div>
						<div class="num" v-show="buynum>0">{{buynum}}</div>
					</div>
					<div class="price highlight">￥{{fee}}</div>
					<div class="desc">满两件商品免邮</div>
				</div>
				<div class="content-right">
					<div class="pay not-enough" :class="{enough:carList.length>0}" @click="goPostBall">去结算</div>
				</div>
			</div>
			<div v-show="carlistShow" class="shopcart-list">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="clearCar">清空</span>
				</div>
				<div class="list-content">
					<ul>
						<li v-for="item in carList" :key="item.CommodityID" class="food">
							{{item.Name}}
							<span class="carlist-price">￥{{item.num*parseFloat(item.Price)}}</span>
							<span class="carlist-opt">
								<i class="iconfont icon-jian" @click="carReduceItem(item,$index)"></i>
								<span class="num">{{item.num}}</span>
								<i class="iconfont icon-add" @click="carAddItem(item)"></i>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-show="carlistShow" @click="carlistShow=false" class="list-mask" style=""></div>

		<div class="food" v-show="detailShow">
			<div class="food-content">
				<div class="image-header">
					<img src="http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750">
					<div class="back" @click="detailShow=false">
						<i class="iconfont icon-fanhui"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{detailData.Name}}</h1>
					<div class="detail">内容内容内容容内容内容内容内容容内容内容内容内容容内容</div>
					<div class="price">
						<span class="now">￥{{detailData.Price}}</span>
					</div>
					<span class="detail-opt">
						<span v-show="detailData.num>0">
							<i class="iconfont icon-jian" @click="subOfCar(detailData)"></i>
							<span class="num">{{detailData.num}}</span>
						</span>
						<i class="iconfont icon-add" @click="addToCar(detailData,$event)"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Loading from './common/Loading.vue'
import { postApi } from '../axios'
import { Toast } from 'vant'
export default {
	name: 'List',
	data() {
		return {
			msg: 'Welcome',
			count: 0,
			isLoading: true,
			listData: [],
			buynum: 0,
			fee: 0,
			carlistShow: false,
			carList: [],
			detailShow: false,
			detailData: {}
		}
	},
	components: {
		Loading
	},
	watch: {
		'carList.length': function(n, o) {
			if (n == 0) {
				this.carlistShow = false
			}
		}
	},
	created() {
		this.getCommodityList()
	},
	methods: {
		getCommodityList() {
			let d = {
				Type: 'GetCommodity',
				OpenID: localStorage.openid,
				GroupID: ''
			}
			postApi(
				d,
				function(response) {
					console.log(response)
					this.isLoading = false
					if (response.data.length >= 0) {
						response.data.forEach(function(item) {
							item.num = 0
						})
						this.listData = response.data
					} else if (response.data.error) {
						Toast(response.data.error)
						this.isLoading = false
					}
				}.bind(this),
				function(error) {
					this.isLoading = false
					console.log(error)
				}.bind(this)
			)
		},
		addToCar(item, e) {
			this.buynum += 1
			this.fee += parseFloat(item.Price)
			this.ball_fly(e)
			item.num += 1
			var i = this.carList.findIndex(function(li) {
				return li.CommodityID == item.CommodityID
			})
			if (i >= 0) {
			} else {
				this.carList.push(item)
			}
		},
		subOfCar(item) {
			item.num -= 1
			this.buynum -= 1
			this.fee -= parseFloat(item.Price)

			var i = this.carList.findIndex(function(e) {
				return e.CommodityID == item.CommodityID
			})
			if (i >= 0 && item.num == 0) {
				this.carList.splice(i, 1)
			}
		},
		clickCarLeft() {
			if (this.carList.length > 0) {
				this.carlistShow = !this.carlistShow
			} else {
				return false
			}
		},
		ball_fly(e) {
			// 被点元素位置
			var bound = e.target.getBoundingClientRect()
			var boundTop = bound.top // 点击top值
			var boundLeft = bound.left // 点击left值
			// 目标元素位置
			var target = document.getElementById('car')
			var targetData = target.getBoundingClientRect()
			var targetTop = targetData.top // 目标top值
			var targetLeft = targetData.left // 目标left值
			// 创建父球（父球横向运动）
			var father = document.createElement('div')
			father.className = 'father flyball'
			// 创建子球（子球垂直css3贝塞尔曲线运动，先上后下，得到抛球效果）
			var child = document.createElement('div')
			child.className = 'child inner'
			father.appendChild(child)
			// 设置父盒子生成的位置
			father.style.top = boundTop + 'px'
			father.style.left = boundLeft + 'px'
			// append小球到页面中
			document.getElementById('listWrap').appendChild(father)
			//document.body.appendChild(father);
			setTimeout(() => {
				// 目标left - 所点元素left + 目标元素宽度的一半（修正落点）
				father.style.transform =
					'translate3d(' +
					(targetLeft - boundLeft + targetData.width / 2) +
					'px, 0px, 0px)'
				child.style.cssText =
					'transform: translate3d(0px, ' + (targetTop - boundTop) + 'px, 0px);'
				// 运动结束后删掉小球
				setTimeout(() => {
					// 移除小球
					father.parentNode.removeChild(father)
				}, 500)
			}, 30)
		},
		carReduceItem(item, index) {
			this.buynum -= 1
			this.fee -= parseFloat(item.Price)
			if (item.num > 1) {
				item.num -= 1
			} else if (item.num == 1) {
				item.num -= 1
				this.carList.splice(index, 1)
			}
		},
		carAddItem(item) {
			this.buynum += 1
			item.num += 1
			this.fee += parseFloat(item.Price)
		},
		seeHotDetail(item) {
			this.detailShow = true
			this.detailData = item
		},
		clearCar() {
			this.carList = []
			this.listData.forEach(function(item) {
				item.num = 0
			})
			this.buynum = 0
			this.fee = 0
		},
		goPostBall() {
			this.$store.commit('UPDATE_LIST', this.carList)
			this.$router.push({ name: 'confirm' })
		}
	}
}
</script>

<style lang="less" scoped>
.wrap {
	margin: 0;
	padding: 0;
	background-color: #efeff4;
	height: 100%;
	width: 100%;
	position: relative;
}

.loading {
	position: absolute;
	top: 50%;
	margin-top: -35px;
}

.list {
	color: #6d6d72;
	font-size: 15px;
	padding-bottom: 50px;
}

.list-ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.list-ul li {
	background-color: white;
	height: 80px;
	padding: 18px;
	position: relative;
	margin-bottom: 1px;
}

.list-ul li .icon {
	height: 80px;
	width: 80px;
	float: left;
}

.list-ul li .icon img {
	height: 80px;
	width: 80px;
}

.list-ul li .content {
	padding-left: 18px;
	overflow: hidden;
}

.content h4 {
	margin: 0;
	letter-spacing: 1px;
	margin-top: 4px;
}

.content h3 {
	margin: 0;
	letter-spacing: 1px;
	font-size: 16px;
	font-weight: normal;
	color: #f01414;
	/*margin-top: 5px;*/
}

.content p {
	margin: 0;
	height: 35px;
	line-height: 35px;
	font-size: 13px;
	/*margin-top: 5px;*/
	width: 100%;
	color: #bbb;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
}

.operator {
	position: absolute;
	z-index: 1;
	right: 26px;
	color: #00a0dc;
	bottom: 15px;
	font-size: 18px;
}

.iconfont {
	font-size: 24px;
	margin: 0 7px;
	vertical-align: middle;
}

.operator .num {
	vertical-align: middle;
	color: black;
	font-size: 12px;
	color: gray;
}

.shopcart {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 50;
	width: 100%;
	height: 48px;
}

.shopcart .content {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	background: #141d27;
	font-size: 0;
	color: hsla(0, 0%, 100%, 0.4);
	height: 48px;
}

.shopcart .content .content-left {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
}

.shopcart .content .content-right {
	-webkit-box-flex: 0;
	-ms-flex: 0 0 105px;
	flex: 0 0 105px;
	width: 105px;
}

.shopcart .content .content-left .logo-wrapper {
	display: inline-block;
	vertical-align: top;
	position: relative;
	top: -10px;
	margin: 0 12px;
	padding: 6px;
	width: 56px;
	height: 56px;
	box-sizing: border-box;
	border-radius: 50%;
	background: #141d27;
}

.content-left .logo-wrapper .logo {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	text-align: center;
	/* background: #2b343c; */
}

.shopcart .content .content-left .logo-wrapper .logo.highlight {
	background: #00a0dc;
}

.icon-shopping_cart {
	line-height: 44px;
	font-size: 24px;
	color: #fff;
}

.shopcart .content .content-left .logo-wrapper .num {
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
	height: 14px;
	line-height: 14px;
	text-align: center;
	border-radius: 15px;
	font-size: 9px;
	font-weight: 700;
	color: #fff;
	background: #f01414;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.shopcart .content .content-right .pay {
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 12px;
	font-weight: 700;
}

.shopcart .content .content-right .pay.not-enough {
	background: #2b333b;
}

.shopcart .content .content-left .price {
	display: inline-block;
	vertical-align: top;
	margin-top: 12px;
	line-height: 24px;
	padding-right: 12px;
	box-sizing: border-box;
	border-right: 1px solid hsla(0, 0%, 100%, 0.1);
	font-size: 16px;
	font-weight: 700;
}

.shopcart .content .content-left .price.highlight {
	color: #fff;
}

.shopcart .content .content-left .desc {
	display: inline-block;
	vertical-align: top;
	margin: 12px 0 0 12px;
	line-height: 24px;
	font-size: 10px;
}

.shopcart .shopcart-list {
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
	width: 100%;
	-webkit-transform: translate3d(0, -100%, 0);
	transform: translate3d(0, -100%, 0);
}

.shopcart .shopcart-list .list-header {
	height: 40px;
	line-height: 40px;
	padding: 0 18px;
	background: #f3f5f7;
	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.shopcart .content .content-left .logo-wrapper .logo.highlight {
	background: #00a0dc;
}

.shopcart .shopcart-list .list-header .title {
	float: left;
	font-size: 14px;
	color: #07111b;
	margin: 0;
}

.shopcart .content .content-right .pay.enough {
	background: #00b43c;
	color: #fff;
}

.shopcart .shopcart-list .list-header .empty {
	float: right;
	font-size: 12px;
	color: #00a0dc;
}

.shopcart .shopcart-list .list-content {
	padding: 0 18px;
	max-height: 217px;
	overflow: scroll;
	background: #fff;
	padding-bottom: 14px;
}

.shopcart .shopcart-list .list-content .food {
	padding: 12px 0;
	box-sizing: border-box;
	position: relative;
	font-size: 14px;
}

.list-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 40;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
	opacity: 1;
	background: rgba(7, 17, 27, 0.6);
}

.list-content ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.carlist-opt {
	position: absolute;
	z-index: 1;
	right: 0px;
	top: 9px;
	color: #00a0dc;
	font-size: 14px;
}

.carlist-price {
	float: right;
	margin-right: 100px;
	color: #f01414;
}

.flyball {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	-webkit-transition: -webkit-transform 0.5s linear;
	transition: -webkit-transform 0.5s linear;
	transition: transform 0.5s linear;
	transition: transform 0.5s linear, -webkit-transform 0.5s linear;
}

.flyball .inner {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99999;
	background-color: #3190e8;
	border-radius: 50%;
}

.flyball,
.flyball .inner {
	will-change: transform;
	/* css3自带的开启GPU加速 */
	-webkit-transform: translateZ(0);
	transform: translateZ(0);
}

.flyball .inner {
	-webkit-transition: -webkit-transform 0.5s cubic-bezier(0.3, -0.2, 1, 0);
	transition: -webkit-transform 0.5s cubic-bezier(0.3, -0.2, 1, 0);
	transition: transform 0.5s cubic-bezier(0.3, -0.2, 1, 0);
	transition: transform 0.5s cubic-bezier(0.3, -0.2, 1, 0),
	-webkit-transform 0.5s cubic-bezier(0.3, -0.2, 1, 0);
}


/*
		.qiu{
		  width: .5rem;
		  height:.5rem;
		  border-radius: 50%;
		  background: #3190e8;
		  position: fixed;
		  z-index: 9;
		}
		*/
/* 父盒子的样式 */

.father {
	width: 20px;
	height: 20px;
	position: fixed;
	z-index: 99999;
}


/* 子盒子（小球）的样式 */

.child {
	width: 20px;
	height: 20px;
	background: #3190e8;
	position: absolute;
	z-index: 99999;
	top: 0;
	left: 0;
}

.food {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 48px;
	z-index: 30;
	width: 100%;
	background: #fff;
	-webkit-transform: translateZ(0);
	transform: translateZ(0); // background-color: #F3F5F7;
	overflow: auto;
	padding-bottom: 20px;
}

.food-content {
	transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	transition-duration: 0ms;
	transform: translate(0px, 0px) translateZ(0px);
}

.food .image-header {
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
}

.food .image-header img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.food .image-header .back {
	position: absolute;
	top: 10px;
	left: 5px;
	font-size: 24px;
	color: white;
	font-weight: 800;
}

.food .content {
	position: relative;
	padding: 18px;
	background-color: #fff;
}

.food .content .title {
	line-height: 14px;
	margin-bottom: 8px;
	font-size: 14px;
	font-weight: 700;
	color: #07111b;
	margin: 0;
	padding: 0;
}

.food .content .detail {
	margin-bottom: 18px;
	margin-top: 10px;
	/*line-height: 10px;
		    height: 10px;*/
	font-size: 12px;
}

.food .content .price {
	font-weight: 700;
	line-height: 24px;
}

.food .content .price .now {
	margin-right: 8px;
	font-size: 14px;
	color: #f01414;
}

.detail-opt {
	position: absolute;
	right: 10px;
	bottom: 20px;
	z-index: 10;
	height: 24px;
	line-height: 24px;
	padding: 0 12px;
	color: #00a0dc;
	font-size: 14px;
}

@-webkit-keyframes mymove {
	0% {
		-webkit-transform: scale(1);
	}
	25% {
		-webkit-transform: scale(0.8);
	}
	50% {
		-webkit-transform: scale(1.1);
	}
	75% {
		-webkit-transform: scale(0.9);
	}
	100% {
		-webkit-transform: scale(1);
	}
}

@keyframes mymove {
	0% {
		transform: scale(1);
	}
	25% {
		transform: scale(0.8);
	}
	50% {
		transform: scale(1.1);
	}
	75% {
		transform: scale(0.9);
	}
	100% {
		transform: scale(1);
	}
}


/* 购物车弹弹弹 */

.tantantan {
	-webkit-animation: mymove 1s;
	animation: mymove 1s;
}
</style>