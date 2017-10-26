<template>
    <div class="my">
        <div class="head-img">
            <van-swipe :autoplay="3000">
                <van-swipe-item>
                    <img src="../assets/y1.jpg"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../assets/s1.jpg"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <van-row>
            <van-col span="6">
                <van-icon  name="pending-payment" />
                <p>待付款</p>
            </van-col>
            <van-col span="6">
                <van-icon name="pending-orders" />
                <p>待接单</p>
            </van-col>
            <van-col span="6">
                <van-icon name="pending-deliver" />
                <p>已发货</p>
            </van-col>
            <van-col span="6">
                <van-icon name="logistics" />
                <p>已发货</p>
            </van-col>
        </van-row>

        <van-cell-group>
            <van-cell icon="records" title="全部订单" is-link>
               
            </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top:10px">
            <van-cell title="我的购物车" icon="shopping-cart" is-link></van-cell>
            <van-cell title="我的返现" icon="cash-back-record" is-link value="内容"></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top:10px">
            <van-cell title="我的积分" icon="exchange" is-link></van-cell>
            <van-cell title="我的优惠券" icon="coupon" is-link value="内容"></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'my',
    data() {
        return {
            msg: 'Welcome',
            images:['../assets/y1.jpg'],
        }
    }
}
</script>

<style lang="less" scoped>
    .my{
        .head-img{
            height: 240px;
            width: 100%;
            img{
                height: 240px;
                width: 100%;
            }
        }
        .van-col{
            background-color: white;
            text-align: center;
            padding: 10px 0;
            i{
                font-size: 24px;
            }
            p{
                margin: 6px 0;
                padding: 0;
                font-size: 13px;
            }
        }
    }
</style>