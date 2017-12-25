<template>
    <div class="my">
        <div class="head-img">
            <!-- <van-swipe :autoplay="3000" :showIndicators="false">
                <van-swipe-item>
                    <img src="../../assets/s2.png"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../assets/s3.jpg"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../assets/s4.jpg"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../assets/s1.jpg"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../assets/s5.jpg"/>
                </van-swipe-item>
            </van-swipe> -->
            <canvas id="canvasC"></canvas>
            <img class="logo" src="../../assets/yyy.jpg"/>
            <div class="head-tips">
                {{WeChatName}}，欢迎光临~
            </div>
        </div>
        <van-row>
            <van-col span="6" @click.native="goOrderList(1)">
                <van-icon name="pending-payment" />
                <p>待付款<span v-if="pendingPay>0">{{pendingPay}}</span></p>
            </van-col>
            <!-- <van-col span="6" @click.native="goOrderList(2)">
                <van-icon name="pending-orders" />
                <p>已付款<span>{{alreadyPay}}</span></p>
            </van-col> -->
            <van-col span="6" @click.native="goOrderList(3)">
                <van-icon name="pending-deliver" />
                <p>待发货<span v-if="pendingSend>0">{{pendingSend}}</span></p>
            </van-col>
            <van-col span="6" @click.native="goOrderList(4)">
                <van-icon name="logistics" />
                <p>已发货<span v-if="alreadySend>0">{{alreadySend}}</span></p>
            </van-col>
            <van-col span="6" @click.native="goOrderList(5)">
                <van-icon name="completed" />
                <p>已完成</p>
            </van-col>
        </van-row>

        <div class="my-links">
            <van-cell-group>
                <van-cell icon="records" @click.native="goOrderList(0)"  title="全部订单" is-link>
                </van-cell>
            </van-cell-group>

            <van-cell-group style="margin-top:10px">
                <!-- <van-cell  is-link @click="goMenu('sort')">
                    <template slot="title">
                        <i class="iconfont icon-leimupinleifenleileibie-- my-icon-sort"></i>
                        <span class="van-cell-text">商品分类</span>
                    </template>
                </van-cell> -->
                <!-- <van-cell title="我的购物车" icon="shopping-cart" is-link></van-cell> -->
                <van-cell is-link  @click.native="goMenu('activiity')" >
                    <template slot="title">
                        <img class="hot-img" src="../../assets/hot.gif" alt="">
                        <span class="van-cell-text">喜迎双旦</span>
                    </template>
                    <span class="active-slot">限时优惠</span>
                </van-cell>
                <van-cell title="推广员中心" @click.native="goPopu" icon="exchange-record" is-link></van-cell>
                <!-- <van-cell title="我的返现" icon="cash-back-record" is-link value=""></van-cell> -->
                <!-- <van-cell title="推广员中心" icon="exchange-record" is-link value=""></van-cell> -->
            </van-cell-group>

            <van-cell-group style="margin-top:10px">
                <van-cell title="我的积分" @click.native="goMenu('score')"  icon="exchange" is-link></van-cell>
                <!-- <van-cell title="我的优惠券" is-link value="">
                    <template slot="title">
                        <i class="iconfont icon-coupon my-icon"></i>
                        <span class="van-cell-text">我的优惠券</span>
                    </template>
                </van-cell> -->
                
                <van-cell title="收货地址" @click.native="goMenu('addr')" icon="location" is-link></van-cell>
            </van-cell-group>

            <van-cell-group style="margin-top:10px;">
                <van-cell title="留言反馈" @click.native="goMenu('memo')"  icon="chat" is-link></van-cell>
            </van-cell-group>
        </div>
        
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop" @click.native="goList">热销商品</van-tabbar-item>
            <van-tabbar-item icon="contact">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
import { mapState } from 'vuex'
// import BScroll from 'better-scroll'
export default {
    name: 'my',
    data() {
        return {
            msg: 'Welcome',
            images:['../../assets/y1.jpg'],
            active:1,
            WeChatName:'亲爱的小伙伴',
            userData:{},
            step:0,
            lines:[
                "rgba(255,65,1, 0.6)", 
                "rgba(255,65,1, 0.4)",
                "rgba(255,65,1, 0.1)", 
            ],
            
        }
    },
    created(){
        Toast.loading({
            duration: 0,
            forbidClick: true, 
        })
        this.getUserInfo()
        this.getTokenTicket()
    },
    activated(){
        this.loop()
        this.active = 1
        this.getOrderList()
        
    },
    deactivated(){
    },
    watch:{
       "$route":function(to, from){
           
        } 
    },
    mounted(){
		// const wrapper = document.querySelector('.my')
		// this.$nextTick(function(){
		// 	this.scroll = new BScroll(wrapper, {
        //         startX: 0,
        //         startY: 0,
        //         click:true,
        //         bounce: true,
        //     })
		// })
    },
    computed:{
        ...mapState([
			'order'
		]),
        pendingPay(){
            let num = 0
            this.order.forEach(item => {
                if(item.PaymentStatus === '未支付'){
                    num += 1
                }
            })
            return num
            
        },
        alreadyPay(){
            let num = 0
            this.order.forEach(item => {
                if(item.PaymentStatus === '已支付'){
                    num += 1
                }
            })
            return num
        },
        pendingSend(){
            let num = 0
            this.order.forEach(item => {
                if(item.PaymentStatus === '已支付' && item.LogisticsStatus === '未发货'){
                    num += 1
                }
            })
            return num
        },
        alreadySend(){
            let num = 0
            this.order.forEach(item => {
                if(item.PaymentStatus === '已支付' && item.LogisticsStatus === '已发货'){
                    num += 1
                }
            })
            return num
        },
        completed(){
            let num = 0
            this.order.forEach(item => {
                if(item.OrderState === '已签收'){
                    num += 1
                }
            })
            return num
        }
    },
    methods:{
        goList(){
            this.$router.push({name:'list', params:{id: 'c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b'}})
        },
        getUserInfo(){
            let d = {
                Type:'GetUser',
                OpenID: localStorage.openid,
            }
            postApi(d, function (response) {
                    //console.log(response)
                    this.userData = response.data
                   // localStorage.setItem("HeadImages", response.data.HeadImages)
                }.bind(this),function (error) {
                
                }.bind(this))
        },
        goMenu(e){
            this.$router.push({name: e})
        },
        goodsGroup(){
             this.$router.push({name:'list', params:{id: 'c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b'}})
        },
        goOrderList(e){
           this.$router.push({name:'allorder', params:{t: e}})
        },
        getOrderList(){
            let d = {
                Type:'OrderList',
                OpenID:localStorage.openid,
                OrderState:'',
                PageIndex:'1',
                PageSize:'100',
            }
            postApi(d, function (response) {
					//console.log(response)
                    Toast.clear()
					if(response.data[0].TotalRecord){
                        this.orderListData = response.data[0].OrderData
                        this.$store.commit('UPDATE_ORDER',response.data[0].OrderData)
					}else if(response.data.error){
						// Toast(response.data.error)
					}else{
						// Toast(response.data)
					}
                }.bind(this),function (error) {
					 Toast.clear()
                }.bind(this))
        },
        getTokenTicket(){
            let d = {
                Type:'Token'
            }
            postApi(d, function (response) {
					//console.log(response)
                    Toast.clear()
					if(response.data.ticket){
                        localStorage.setItem('ticket', response.data.ticket)
					}else if(response.data.error){
						//Toast(response.data.error)
					}else{
						//Toast(response.data)
					}
                }.bind(this),function (error) {
					 Toast.clear()
                }.bind(this))
        },
        goPopu(){
            if(this.userData.IsPopularize==1){
                this.$router.push({name: 'popucenter'})
            }else{
                this.$router.push({name: 'regpopu'})
            }
        },
        loop(){
			var canvas = document.getElementById('canvasC')
			var ctx = canvas.getContext('2d')
			var boHeight = canvas.height / 6
			var posHeight = canvas.height / 1.8
			ctx.clearRect(0,0,canvas.width,canvas.height); 
			var t = this;
			this.step ++
			for(var j = t.lines.length - 1; j >= 0; j--) { 
				ctx.fillStyle = t.lines[j]; 
				//每个矩形的角度都不同，每个之间相差45度 
				var angle = (t.step+j*70)*Math.PI/180; 
				var deltaHeight = Math.sin(angle) * boHeight;
				var deltaHeightRight = Math.cos(angle) * boHeight; 
				ctx.beginPath();
				ctx.moveTo(0, posHeight+deltaHeight); 
				ctx.bezierCurveTo(canvas.width/2, posHeight+deltaHeight-boHeight, canvas.width / 2, posHeight+deltaHeightRight-boHeight, canvas.width, posHeight+deltaHeightRight); 
				ctx.lineTo(canvas.width, canvas.height); 
				ctx.lineTo(0, canvas.height); 
				ctx.lineTo(0, posHeight+deltaHeight); 
				ctx.closePath(); 
				ctx.fill(); 
			}
			var requestAnimFrame = 	window.requestAnimationFrame  || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ 
						window.setTimeout(callback, 1000 / 60); 
					}; 
			requestAnimFrame(this.loop);
        },

    }
}
</script>

<style lang="less" scoped>
    .my{
        .head-img{
            height: 180px;
            width: 100%;
            background-color: #ffffff;
            position: relative;
            canvas{
                background-color: #FAB48B;
                height: 180px;
                width: 100%;
            }
            // img{
            //     height: 180px;
            //     width: 100%;
            // }
            .logo{
                height: 110px;
                width: 140px;
                position: absolute;
                top: 20px;
                left: 50%;
                margin-left: -70px;
                border-radius: 14px;
            }
            .head-tips{
                height: 30px;
                position: absolute;
                z-index: 9999;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0, 0, 0, .5);
                color: #fff;
                font-size: 14px;
                line-height: 30px;
                padding-left: 15px;
                letter-spacing: 1px;
            }
        }
        .my-icon{
            vertical-align: middle;
            height: 19px;
            line-height: 19px;
        }
        .my-icon-sort{
            vertical-align: middle;
            font-size: 14px;
            height: 18px;
            line-height: 18px;
            margin-right: 3px;
        }
        .van-col{
            background-color: white;
            text-align: center;
            padding: 20px 0 10px 0;
            i{
                font-size: 24px;
            }
            p{
                margin: 6px 0;
                padding: 0;
                font-size: 13px;
                display: block;
                position: relative;
                span{
                    display: block;
                    position: absolute;
                    top: -39px;
                    left: 55%;
                    height: 15px;
                    width: 20px;
                    line-height: 15px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 40%;
                    color: #fff;
                    background-color: #f60;
                }
            }
        }
        .van-tabbar-item--active {
            //color: red;
        }
        .my-links{
            padding-bottom: 50px;
        }
        .test{
            color: rgba(0,168,255, 0.6);
            color:  rgba(0,168,255, 0.4);
            color:  orangered 
        }
        .hot-img{
            vertical-align: middle;
        }
        .active-slot{
            font-size: 13px;
            color: #999;
        }
    }
</style>