<template>
    <div class="my-order">
        <van-pull-refresh v-model="isLoading">
			<ul class="list" v-if="listData.Data.length>0">
				<li v-for="(item, index) in listData.Data" :key="index">
					<img class="headimg" :src="item.HeadImages">
					<div class="content">
						<p style="margin-top:0">
							<span class="wechatname">{{item.WeChatName}}</span>
							<span class="tel">{{item.Mobile}}</span>
							<span>[{{item.FatherLevel}}]</span>
						</p>
						<p>订单编号：{{item.OrderNum}}</p>
						<p>付款时间：{{item.PaymentTime}}</p>
						<p>订单金额：&yen;{{item.OrderPrice}}</p>
					</div>
					<div style="clear:both"></div>
					<span class="my-sy">+ <i>{{item.PopularizePrice}}</i></span>
				</li>
			</ul>
        </van-pull-refresh>
		<div v-if="listData.Data.length>0" @click="goTX" class="van-address-list__add van-hairline--top van-cell van-hairline">
			<div class="van-cell__title">
				<i class="van-icon van-icon-gold-coin" style="font-weight: 800;"></i>
				<span class="van-cell__text">去提现我的收益</span>
			</div>
			<i class="van-cell__right-icon van-icon van-icon-arrow"></i>
		</div>
		<div class="none-div" v-show="listData.TotalRecord==0 && !isLoading">
			<h4>没有推广订单</h4>
			<p>去分享，得返现</p>
			<button @click="goShare">去推广</button>
		</div>
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
export default {
    name: "myorder",
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
        this.getOrderList()
    },
    watch: {
    	isLoading() {
			if (this.isLoading) {
				this.getOrderList()
			}
    	}
  	},
    methods:{
        getOrderList(){
            let d = {
                Type:'GetPopularizeFree',
                OpenID: localStorage.openid,
                PageIndex:1,
                PageSize:100,
            }
            postApi(d, function (response) {
					//console.log(response)
					Toast.clear()
                    if(response.data[0].TotalRecord){
						this.listData = response.data[0]
						if(this.isLoading){
							Toast({
                                duration:1000,
                                message:'刷新成功',
                            })
						}
						this.isLoading = false
                    }else{
						Toast(response.data.error)
						this.isLoading = false
					}
                }.bind(this),function (error) {
					Toast.clear()
					this.isLoading = false
                }.bind(this))
		},
		goShare(){
			this.$router.push({name: 'popushare'})
		},
		goTX(){
			this.$router.push({name: 'cashapply'})
		}
    }

};
</script>

<style lang="less" scoped>
.my-order{
	.tips{
        padding: 15px;
        color: #666;
        font-size: 14px;
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
					font-size: 12px;
					color:#666;
					.wechatname{
						color: black;
						font-size: 16px;
						margin-right: 8px;
					}
					.tel{
						color: black;
						font-size: 14px;
					}
				}
			}
			.my-sy{
				position: absolute;
				right: 15px;
				top: 42px;
				font-size: 14px;
				color: #f60;
				i{
					font-style: normal;
					font-weight: 600;
					font-size: 16px;
				}
			}
		}
	}
	.van-icon-gold-coin{
		color: #38f;
		
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
