<template>
    <div class="cash-records">
        <van-pull-refresh v-model="isLoading">
            <ul class="list" v-if="listData.Data.length>0">
				<li v-for="(item, index) in listData.Data" :key="index">
					<img class="headimg" :src="item.HeadImages">
					<div class="content">
						<p style="margin-top:0">
							<span class="wechatname">{{item.PopularizeTrueName}}</span>
							<span class="tel">{{item.PopularizeMoblie}}</span>
						</p>
						<p>申请时间：{{item.CreateTime}}</p>
						<p>提现金额：<span class="tx-money">&yen;{{item.WithdrawCashPrice}}</span></p>
					</div>
					<div style="clear:both"></div>
					<span class="my-sy"><i>{{ txStatus(item.State)}}</i></span>
				</li>
			</ul>

            <div class="none-div" v-show="listData.TotalRecord==0 && !isLoading">
                <h4>没有下级推信息</h4>
                <p>去分享，得返现</p>
                <button @click="goShare">去推广</button>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
export default {
    name: "cashrecords",
    data() {
        return {
            listData: {
                Data:[],
            },
            isLoading:false,
        }
    },
    created(){

    },
    activated(){
        Toast.loading()
		this.getList()
    },
    watch: {
        isLoading() {
            if (this.isLoading) {
                this.getList()
            }
        }
    },
    methods:{
        getList(){
            let d = {
                Type:'GetWithdrawCash',
                OpenID: localStorage.openid,
                PageIndex:1,
                PageSize:100,
            }
            postApi(d, function (response) {
                console.log(response)
                this.listData = response.data[0]
                Toast.clear()
                if(this.isLoading){
                    Toast({
                        message:'刷新成功',
                        duration:500,
                    })
                    this.isLoading = false
                }else{
					
                }
               
            }.bind(this),function (error) {
                Toast.clear()
                this.isLoading = false
            }.bind(this))
        },
        goShare(){
			this.$router.push({name: 'popushare'})
        },
        txStatus(e){
            if(e==0){
                return '待审核'
            }else if(e==1){
                return '通过'
            }else if(e==2){
                return '驳回'
            }else{
                return e
            }
        }
    }

};
</script>

<style lang="less" scoped>
.cash-records{
    .tips{
        padding: 15px;
        color: #666;
        font-size: 13px;
        background-color: #fff;
    }
    .list{
		padding: 0;
		li{
			position: relative;
			padding: 12px;
			background-color: #fff;
			border-bottom: 1px solid #f8f8f8;
			.headimg{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				float: left;
			}
			.content{
				padding-left: 50px;
				p{
					margin: 3px 0;
					font-size: 13px;
					color:#666;
					.wechatname{
						color: black;
						font-size: 14px;
						margin-right: 8px;
					}
					.tel{
						color: black;
						font-size: 14px;
                    }
                    .tx-money{
                        font-size: 14px;
                        color: #f60;
                    }
				}
			}
			.my-sy{
				position: absolute;
				right: 15px;
				top: 12px;
				font-size: 14px;
				color: #f60;
				i{
					font-style: normal;
					font-weight: 600;
					font-size: 15px;
				}
			}
		}
	}
}
</style>
