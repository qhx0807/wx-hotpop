<template>
    <div class="order">
        <van-tabs class="tabs" @click="onClickTab">
            <van-tab title="全部"></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab title="已付款"></van-tab>
            <van-tab title="未发货"></van-tab>
            <van-tab title="已发货"></van-tab>
            <van-tab title="已完成"></van-tab>
        </van-tabs>
        <div class="order-body">
            <van-pull-refresh class="con-list" v-model="isLoading">
            <van-panel title="YJJHG20171031194509" status="状态" style="margin-bottom:12px">
                <div class="content">
                   <div class="goods-item">
                       <img src="http://os70o8m36.bkt.clouddn.com/share.bmp" alt="">
                        <div class="con-txt">
                            <h5>标题</h5>
                            <p>描述描述描述描述描述描述描述描述描述描述描述描描述</p>
                            <p class="price"></p>
                        </div>
                        <span class="one-price">￥34.00</span>
                        <span class="one-num">x 2</span>
                   </div>
                   <div  class="goods-item">
                       <img src="http://os70o8m36.bkt.clouddn.com/share.bmp" alt="">
                        <div class="con-txt">
                            <h5>标题</h5>
                            <p>描述描述描述描述描述描述描述描述描述描述描述描描述</p>
                            <p class="price"></p>
                        </div>
                        <span class="one-price">￥34.00</span>
                        <span class="one-num">x 2</span>
                   </div>
                   <div  class="goods-item">
                       <img src="http://os70o8m36.bkt.clouddn.com/share.bmp" alt="">
                        <div class="con-txt">
                            <h5>标题</h5>
                            <p>描述描述描述描述描述描述描述描述描述描述描述描描述</p>
                            <p class="price"></p>
                        </div>
                        <span class="one-price">￥34.00</span>
                        <span class="one-num">x 2</span>
                   </div>
                </div>
                <div slot="footer">
                    <span>2017-10-31 18:21  共2件商品 合计：100.00元</span>
                </div>
            </van-panel>
        </van-pull-refresh>
        </div>

    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    name: "order",
    data() {
        return {
            msg: "Welcome",
            isLoading: false,
            active:0,
        };
    },
    watch: {
        isLoading() {
            if (this.isLoading) {
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 500);
            }
        }
    },
    methods:{
        onClickTab(e){
            //alert(e)
        }
    }
};
</script>

<style lang="less" >
.order {
    height: 100%;
    position: relative;
    .tabs{
        position: absolute;
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
    }
}
</style>
