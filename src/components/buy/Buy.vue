<template>
    <div class="buy">
        <div v-show="carlistShow" @click="carlistShow=false" class="list-mask" style=""></div>
        <keep-alive>
            <router-view class="list-wrap"></router-view>
        </keep-alive>
        <div class="shopcart">
			<div class="content">
				<div class="content-left" @click="clickCarLeft">
					<div class="logo-wrapper">
						<div class="logo " id="tantan" :class="{highlight:carList.length>0}">
							<i class="icon-shopping_cart iconfont icon-gouwuche" id="car"></i>
						</div>
						<div class="num" v-show="buynum>0">{{buynum}}</div>
					</div>
					<div class="price highlight">
						<span v-show="!isLoading">￥{{totalPrice}}</span>
						<van-loading  v-show="isLoading" type="circle" color="white"></van-loading>
					</div>
					<div class="desc">
						<span v-show="isFreeSendShow">已享受包邮</span>
					</div>
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
							<span class="carlist-price">￥{{ (item.num*parseFloat(item.Price)).toFixed(2)}}</span>
							<span class="carlist-opt">
								<i class="iconfont icon-jian" @click="carReduceItem(item.CommodityID)"></i>
								<span class="num">{{item.num}}</span>
								<i class="iconfont icon-add" @click="carAddItem(item.CommodityID)"></i>
							</span>
						</li>
					</ul>
				</div>
			</div>
            
		</div>
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { mapState } from 'vuex'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
export default {
    name: "buy",
    data() {
        return {
			carlistShow:false,
			isLoading:false,
			totalPrice:'0',
			isFreeSend:'',
        };
    },
    created(){

    },
    watch: {
		'carList.length':function(n, o){
			if(n == 0){
				this.carlistShow = false
				this.totalPrice = '0'
			}else{
				//console.log(1)
				
				
			}
		},
		'carList':'getOrderPrice',
        "$route":function(to, from){
           // console.log(from)
        }
	},
	activated(){
        this.wxConfigFoo()
		
    },
    computed:{
        ...mapState([
			'listData'
        ]),
        carList:function(){
            let arr = []
            this.listData.forEach(item => {
                if(item.num>0){
                    arr.push(item)
                }
            })
            return arr
        },
        fee:function(){
            let m = 0
            this.listData.forEach(item => {
                m += (parseFloat(item.Price)*item.num)
            })
            return m.toFixed(2)
        },
        buynum:function(){
            let n = 0
            this.listData.forEach(item => {
                n += item.num
            })
            return n
		},
		isFreeSendShow:function(){
			if(this.isFreeSend=='True' && this.carList.length>0){
				return true
			}else{
				return false
			}
		}
	},
    methods:{
        clickCarLeft() {
			if (this.carList.length > 0) {
				this.carlistShow = !this.carlistShow
			} else {
				return false
			}
		},
        clearCar(){
            this.listData.forEach(item => {
                item.num = 0
            })
        },
        carReduceItem(id){
            this.$store.commit('SUB_LIST_ITEM', id)
        },
        carAddItem(id){
            this.$store.commit('ADD_LIST_ITEM', id)
        },
        goPostBall(){
            if(this.carList.length==0){
                Toast('请选择要购买的商品')
                return false
            }
            this.$router.push({ name: 'confirm' })
		},
		wxConfigFoo(){
			let ticket = localStorage.ticket
			let timestamp = new Date().getTime().toString()
			let url = window.location.href.split('#')[0]
			let noncestr = "Wm3WZYTPz0wzccnW"
			
			let str = "jsapi_ticket="+ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
			let signature = sha1(str)
			wx.config({
				debug: false, 
				appId: 'wx3a1714f5b4c11978',
				timestamp: timestamp,
				nonceStr: noncestr,
				signature: signature,
				jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'],
			})

			wx.ready(function(){
				wx.onMenuShareTimeline({
					title: "杨家酱小火锅",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/share/new-share.html?r=groupid_c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						//getInfo('Type','ShareRecord','ActivityID',GetActivity.ActivityID);
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				})
				wx.onMenuShareAppMessage({
					title: "杨家酱小火锅",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/share/new-share.html?r=groupid_c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						//getInfo('Type','ShareRecord','ActivityID',GetActivity.ActivityID);
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				})

			})
		},
		getOrderPrice(){
			if(this.isLoading){
				return false
			}
			if(this.carList.length==0){
				this.totalPrice = '0'
				return false
			}
			let commids = ''
			this.isLoading = true
			this.carList.forEach(item => {
				commids += (item.CommodityID + ',' + item.num + ',')
			})
			let d = {
				Type: 'GetOrderPrice',
				OpenID: localStorage.openid,
				Commodity: commids,
				OrderType:0,
			}
			postApi(d, function (response) {
					console.log(response)
					this.isFreeSend = response.data[1].IsSend
					this.totalPrice = response.data[0].OrderPrice
					Toast.clear()
					this.isLoading = false
                }.bind(this),function (error) {
					Toast("网络出错")
					this.isLoading = false
                }.bind(this))
		},
		test(){
			alert(1)
		}
    }
};
</script>

<style lang="less" scoped>
.buy{
    margin: 0;
	padding: 0;
	background-color: #f8f8f8;
	height: 100%;
	width: 100%; 
	-webkit-overflow-scrolling: touch;
}
.list-wrap{
	height: 100%;
}
.shopcart {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 9999;
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
	padding: 0 10px;
	max-height: 260px;
	overflow: scroll;
	background: #fff;
	padding-bottom: 14px;
}

.shopcart .shopcart-list .list-content .food {
	padding: 14px 0;
	box-sizing: border-box;
	position: relative;
	font-size: 12px;
	border-bottom: 1px solid #f8f8f8;
}
.list-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
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
    span{
        margin: 0 5px;
    }
    i{
        font-size: 18px;
    }
}

.carlist-price {
	float: right;
	margin-right: 80px;
	color: #f01414;
}

</style>
