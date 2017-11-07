<template>
    <div class="tx-sq">
        <div class="container" v-cloak>
            <div class="con-header">
                <div class="header-left">
                    <p>到账账户</p>
                </div>
                <div class="header-right">
                    <p class="zh">我的钱包-零钱</p>
                    <p  class="tip">提现到我的账户-零钱</p>
                </div>
                
            </div>
            <div class="con-body">
                <p class="tx">提现金额</p>
                <span class="rmb-sy">&yen;</span>
                <input class="money" readonly="" id="money" placeholder="" v-model="txMoney" type="text">
                <p class="con-body-tips" v-show="!overTipShow">可提现金额&yen;{{userData.PopularizeAmount}}
                <p class="con-body-tips" v-show="overTipShow" style="color: red">输入金额超过可提现金额</p>
            </div>
            <div class="con-footer">
                <van-button size="large" :loading="submitLoading" type="primary" @click="cashApply" :disabled="isDisabled">提现</van-button>
                <p class="con-footer-tip">2小时内到账</p>
            </div>
        </div>
    </div>

</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
export default {
    name: "cashapply",
    data() {
        return {
            isDisabled:false,
			txMoney:null,
			total:0,
			overTipShow:false,
            userData:{},
            submitLoading:false,
        }
    },
    created(){

    },
    activated(){
        Toast.loading()
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            let d = {
                Type:'GetUser',
                OpenID: localStorage.openid,
            }
            postApi(d, function (response) {
                    //console.log(response)
                    this.userData = response.data
                    this.txMoney = response.data.PopularizeAmount
                    if(parseFloat(response.data.PopularizeAmount)>0){
                        this.isDisabled = false
                    }else{
                        this.isDisabled = true
                    }
                    Toast.clear()
                }.bind(this),function (error) {
                    Toast.clear()
                }.bind(this))
        },
        cashApply(){
            if(parseFloat(this.userData.PopularizeAmount)==0){
                Toast('余额不足，无法提现')
                return false
            }
            this.submitLoading = true
            let d = {
                Type:'WithdrawCash',
                OpenID: localStorage.openid,
                Price:this.userData.PopularizeAmount,
            }
            let t = this
            postApi(d, 
                function (response) {
                    if(response.data.OK){
                        Toast('提现申请成功，等待后台处理')
                        this.$router.push({name: 'cashrecords'})
                    }else if(response.data.error){
                        Toast(response.data.error)
                        setTimeout(function(){
                            t.$router.push({name: 'cashrecords'})
                        },2000)
                    }else{
                        Toast(response.data)
                    }
                    this.submitLoading = false
                }.bind(this),function (error) {
                    this.submitLoading = false 
                }.bind(this))
        }
    }

};
</script>

<style lang="less" scoped>
.tx-sq{
    padding: 18px 10px 0 10px;
    p{
        margin: 0;
    }
    .container{
        height: 400px;
        background-color: white;
    }
    .con-header{
        background-color: #FBFBFB;
        width: 100%;
        padding: 15px 0 ;
        height: 47px;
    }
    .header-left{
        width: 37%;
        float: left;
    }
    .header-left p{
        font-size: 14px;
        margin-left: 20px;
    }
    .header-right{
        width: 63%;
        float: left;
    }
    .header-right .zh{
        color: #595C88;
        font-size: 14px;
    }
    .header-right .tip{
        font-size: 14px;
        margin-top: 5px;
        color: #999;
    }
    .con-body{
        clear: both;
        padding: 15px 0 ;
        position: relative;
        text-align: center;
    }
    .con-body .tx{
        font-size: 14px;
        margin-left: 20px;
        text-align: left;
    }
    .money{
        width: 76%;
        border: none;
        outline: none;
        border-bottom: 1px solid #e7e7e7;
        margin-top: 15px;
        font-size: 28px;
        font-weight: bolder;
        padding: 10px 10px 10px 20px;
        border-radius: 0;
    }
    .rmb-sy{
        position: absolute;
        top: 55px;
        font-size: 22px;
        left: 20px;
    }
    .con-body-tips{
        text-align: left;
        font-size: 13px;
        color: #999;
        margin-top: 13px;
        margin-left: 22px;
    }
    .tx-all{
        font-size: 13px;
        color: #595C88;
    }
    .con-footer{
        text-align:center;
        margin-top: 20px;
        padding: 0 15px;
    }
    .con-footer-tip{
        margin-top:12px;
        font-size: 13px;
        color: #999;
    }
    [v-cloak]{
        display: none;
    }
    .van-button--large{
        height: 46px;
        line-height: 44px;
    }
}

</style>
