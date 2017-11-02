<template>
    <div class="my">
        <div class="head-img">
            <van-swipe :autoplay="3000" :showIndicators="false">
                <van-swipe-item>
                    <img src="../assets/s2.png"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../assets/s3.jpg"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../assets/s4.jpg"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../assets/s1.jpg"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../assets/s5.jpg"/>
                </van-swipe-item>
            </van-swipe>
            <div class="head-tips">
                {{userData.WeChatName}}，欢迎光临~
            </div>
        </div>
        <van-row>
            <van-col span="6">
                <van-icon  name="pending-payment" />
                <p>待付款</p>
            </van-col>
            <van-col span="6">
                <van-icon name="pending-orders" />
                <p>已付款</p>
            </van-col>
            <van-col span="6">
                <van-icon name="pending-deliver" />
                <p>待发货</p>
            </van-col>
            <van-col span="6">
                <van-icon name="logistics" />
                <p>已发货</p>
            </van-col>
        </van-row>

        <div class="my-links">
            <van-cell-group>
                <van-cell icon="records" @click.native="goMenu('allorder')"  title="全部订单" is-link>
                </van-cell>
            </van-cell-group>

            <van-cell-group style="margin-top:10px">
                <van-cell  is-link @click="goMenu('sort')">
                    <template slot="title">
                        <i class="iconfont icon-leimupinleifenleileibie-- my-icon-sort"></i>
                        <span class="van-cell-text">商品分类</span>
                    </template>
                </van-cell>
                <!-- <van-cell title="我的购物车" icon="shopping-cart" is-link></van-cell> -->
                <van-cell title="我的返现" icon="cash-back-record" is-link value=""></van-cell>
            </van-cell-group>

            <van-cell-group style="margin-top:10px">
                <van-cell title="我的积分" @click.native="goMenu('score')"  icon="exchange" is-link></van-cell>
                <van-cell title="我的优惠券" is-link value="">
                    <template slot="title">
                        <i class="iconfont icon-coupon my-icon"></i>
                        <span class="van-cell-text">我的优惠券</span>
                    </template>
                </van-cell>
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
import { postApi } from '../axios'
import { Toast } from 'vant'
export default {
    name: 'my',
    data() {
        return {
            msg: 'Welcome',
            images:['../assets/y1.jpg'],
            active:1,
            userData:{
                WeChatName:'亲爱的小伙伴'
            },
        }
    },
    created(){
        this.getUserInfo()
    },
    watch:{
        
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
                    //this.userData = response.data
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
            img{
                height: 180px;
                width: 100%;
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
            }
        }
        .van-tabbar-item--active {
            //color: red;
        }
        .my-links{
            padding-bottom: 50px;
        }
    }
</style>