<template>
    <div class="order">
        <van-tabs class="tabs" :active="activeTab"  @click="onClickTab">
            <van-tab title="全部"></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab title="已付款"></van-tab>
            <van-tab title="未发货"></van-tab>
            <van-tab title="已发货"></van-tab>
            <van-tab title="已完成"></van-tab>
            <van-tab title="已关闭"></van-tab>
        </van-tabs>
        <div class="order-body">
            <van-pull-refresh class="con-list" v-model="isLoading">
            <van-panel v-for="item in list" :key="item.OrderID" :title="item.OrderNum" :status="item.PaymentStatus" style="margin-bottom:12px">
                <div class="content">
                   <div class="goods-item" @click="onClockOrder(item.OrderID)" v-for="(n,index) in item.Data" :key="index">
                       <img :src="titleImage(n.TitleImage)" alt="">
                        <div class="con-txt">
                            <h5>{{n.Commodity}}</h5>
                            <p>{{n.Contents}}</p>
                            <p class="price"></p>
                        </div>
                        <span class="one-price">￥{{n.Price}}</span>
                        <span class="one-num">x {{n.CommodityNum}}</span>
                   </div>
                </div>
                <div slot="footer" @click="onClockOrder(item.OrderID)" style="text-align:right">
                    <span>{{item.OrderTime}}&nbsp;&nbsp;&nbsp;共{{item.Data.length}}件商品 合计：<span class="totalFee">{{item.PaymentAmount}}</span><span>&nbsp;&nbsp;&nbsp;详情&gt;&gt;</span></span>
                </div>
            </van-panel>
            <div class="none-div" v-show="list.length==0">
                <h4>没有此类订单</h4>
                <p>好东西，手慢无</p>
                <button @click="goBuyList">去逛逛</button>
            </div>
            </van-pull-refresh>
        </div>

    </div>
</template>

<script>
import { Toast } from 'vant'
import { postApi } from '../axios'
export default {
    name: "order",
    data() {
        return {
            isLoading: false,
            orderListData:[],
            list:[],
            activeTab:0,
        };
    },
    created(){
        
    },
    activated(){
        Toast.loading({
            duration: 0,
            forbidClick: true, 
        })
        this.getOrderList()
        this.activeTab = this.$route.params.t
    },
    deactivated(){
        
    },
    watch: {
        isLoading() {
            if (this.isLoading) {
                this.getOrderList()
            }
        }
    },
    computed:{
        all() {
            let arr = [].concat(this.orderListData)
            return arr
        },
        pendingPay(){
            let arr = [].concat(this.orderListData)
            let res = arr.filter(item => {
                return item.PaymentStatus === '未支付'
            })
            return res
        },
    },
    methods:{
        onClickTab(e){
            this.activeTab = e
            this.getList(e)
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
					console.log(response)
                    Toast.clear()
                    
					if(response.data[0].TotalRecord){
                        this.orderListData = response.data[0].OrderData
                        this.$store.commit('UPDATE_ORDER',response.data[0].OrderData)
                        this.getList(this.activeTab)
                        if(this.isLoading){
                            Toast({
                                duration:1000,
                                message:'刷新成功',
                            });
                        }
                        this.isLoading = false
					}else if(response.data.error){
						Toast(response.data.error)
					}else{
						Toast(response.data)
					}
                }.bind(this),function (error) {
                     Toast.clear()
                     this.isLoading = false
                }.bind(this))
        },
        getList(e){
            let arr = [].concat(this.orderListData)
            switch (e) {
                case 0://全部
                    this.list = arr
                    break
                case 1://未支付
                    let res1 = arr.filter(item => {
                        return item.PaymentStatus === '未支付'
                    })
                    this.list = res1
                    break
                case 2://已支付
                    let res2 = arr.filter(item => {
                        return item.PaymentStatus === '已支付'
                    })
                    this.list = res2
                    break
                case 3://未发货
                    let res3 = arr.filter(item => {
                        return item.PaymentStatus === '已支付' && item.LogisticsStatus === '未发货'
                    })
                    this.list = res3
                    console.log(res3)
                    break
                case 4://已发货
                    let res4 = arr.filter(item => {
                        return item.PaymentStatus === '已支付' && item.LogisticsStatus === '已发货'
                    })
                    this.list = res4
                    break
                case 5://已发货
                    let res5 = arr.filter(item => {
                        return item.OrderState === '已签收'
                    })
                    this.list = res5
                    break
                case 6://已发货
                    let res6 = arr.filter(item => {
                        return item.PaymentStatus === '已关闭'
                    })
                    this.list = res6
                    break
                default:
                    this.list = arr
                    break
            }
        },
        goBuyList(){
            this.$router.push({name:'list', params:{id: 'c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b'}})
        },
        onClockOrder(id){
            this.$router.push({name:'orderinfo', params:{id: id}})
        },
        titleImage(str){
            return 'http://huoguo.cqjft.com'+str.split(',')[0]
        },
    }
};
</script>

<style lang="less" scoped>
.order {
    height: 100%;
    position: relative;
    .tabs{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        z-index: 99999;
        box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);
    }
    .order-body{
        padding-top: 50px;
    }
    .van-card {
        background-color: #ffffff;
    }
    .van-panel__content {
        .goods-item{
            margin-bottom: 10px;
            background-color: #f9f9f9;
            position: relative;
            .one-price{
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 13px;
            }
            .one-num{
                position: absolute;
                right: 10px;
                top: 30px;
                font-size: 12px;
                color: #666;
            }
        }
        padding: 12px!important;
        img{
            height: 80px;
            width: 100px;
            float: left;
        }
        .con-txt{
            padding-left: 110px;
            height: 80px;
            position: relative;
            h5{
                margin: 0;
                font-size: 16px;
                font-weight: normal;
                top: 10px;
                padding-top: 10px;
            }
            p{
                padding-top: 12px;
                margin: 0;
                color: #666;
                font-size: 13px;
                max-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                padding-right: 45px;
            }
            .price{
               // text-align: right;
            }
        }
    }
    .van-panel__footer{
        clear: both;
        text-align: right;
        span{
            margin: 0;
            color: #666;
            font-size: 13px;
            max-height: 20px;
        }
        .totalFee{
            font-size: 14px;
        }
        p{
            margin: 0;
        }
    }
    .none-div{
        padding-top: 20px;
        text-align: center;
        color: #666;
        h4{
            font-weight: normal;
            font-size: 16px;
            margin:12px 0;
        }
        p{
            font-size: 12px;
            margin-top: 20px;
            color: gray;
        }
        button{
            outline: none;
            border: 1px solid #FF6600;
            background-color: #f8f8f8;
            color: #f60;
            font-size: 14px;
            padding: 5px 28px;
            margin-top: 15px;
            border-radius: 4px;
        }
    }
}
</style>
