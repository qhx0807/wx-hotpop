<template>
	<div class="orderInfo">
		<!-- <van-steps direction="vertical" :active="0" active-color="#f60">
	            <van-step>
	                <h3>【城市】物流状态1</h3>
	                <p>2016-07-12 12:40</p>
	            </van-step>
	            <van-step>
	                <h3>【城市】物流状态2</h3>
	                <p>2016-07-11 10:00</p>
	            </van-step>
	            <van-step>
	                <h3>快件已发货</h3>
	                <p>2016-07-10 09:30</p>
	            </van-step>
	        </van-steps> -->
		<div class="order-content">
			<van-pull-refresh v-model="isLoading">
				<van-steps :active="active" icon="logistics" icon-class="steps-success" :title="stepsTitle">
					<van-step>买家已付款</van-step>
					<van-step>商家已发货</van-step>
					<van-step>交易完成</van-step>
				</van-steps>
				<div class="van-contact-card van-contact-card--add" style="border-top:1px solid #f8f8f8;background:#f8f8f8;">
					<div class="van-contact-card__content">
						<div class="addr-left">
							<van-icon name="location" class="location" style=""/>
						</div>
						<div class="addr-con">
							<p>
								<span class="man">收货人： {{ orderDetail.TrueName }}</span>
								<span class="tell">{{ orderDetail.Mobile }}</span>
							</p>
							<p class="addr-text">{{ orderDetail.ProvinceName }}{{ orderDetail.CityName }}{{ orderDetail.AreaName }}{{ orderDetail.StreetName }}{{ orderDetail.Address }}</p>
						</div>
					</div>
					<i class="van-contact-card__arrow van-icon van-icon-arrow"></i>
				</div>
				
				<van-panel title="杨家酱小火锅" :status="orderDetail.PaymentStatus" style="margin-bottom:-1px;margin-top:8px" >
					<div class="content">
						<div class="goods-item" v-for="(n,index) in orderDetail.Data" :key="index">
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
						<span>共{{orderDetail.Data.length}}件商品 合计：<span class="totalFee">{{orderDetail.PaymentAmount}}</span></span>
					</div>
				</van-panel>
				<van-cell-group >
					<van-cell title="配送方式" >
						<div class="send-fs">
							<h4>{{psFs}}</h4>
							<p>普通快递</p>
						</div>
					</van-cell>
					<van-field v-model="remarks" type="textarea" label="买家留言" readonly autosize rows="1" ></van-field>
					<van-cell title="合计" >
						<span style="color:#f60">&yen;{{ orderDetail.OrderPrice }}</span>
					</van-cell>
				</van-cell-group>
				<div style="background:#f8f8f8;padding-top:8px;">
					<div class="ca-price">
						<ul>
							<li>
								<span>商品金额</span>
								<span class="money">&yen;{{orderDetail.OrderPrice}}</span>
							</li>
							<li>
								<span>运费</span>
								<span class="money">+&yen;{{sendFee}}</span>
							</li>
							<li>
								<span>优惠</span>
								<span class="money">-&yen;0.00</span>
							</li>
						</ul>
					</div>
					<van-cell-group >
						<van-cell title="付款方式" >
							<span>微信支付</span>
						</van-cell>
						<van-cell title="实付金额" >
							<span style="color:#f60">&yen;{{ orderDetail.PaymentAmount }}</span>
						</van-cell>
					</van-cell-group>
					<div class="order-time">
						<ul>
							<li>订单编号：{{ orderDetail.OrderNum }}</li>
							<li>创建时间：{{ orderDetail.OrderTime }}</li>
							<li>付款时间：{{ orderDetail.PaymentTime }}</li>
						</ul>
					</div>
				</div>
				
			</van-pull-refresh>
		</div>
		<div class="order-footer">
			<van-button size="mini" @click="oneMoreOrder">再来一单</van-button>
			<van-button size="mini" @click="shareOrder">我要晒订单</van-button>
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant'
import { postApi } from '../../axios'
export default {
	name: "orderInfo",
	data() {
		return {
			isLoading: false,
			orderDetail:{},
			remarks:'',
		}
	},
	created() {

	},
	watch: {
		isLoading() {
			if (this.isLoading) {
				this.getOrderDetails()
			}
		}
	},
	activated() {
		this.getOrderDetails()
		
	},
	deactivated() {

	},
	computed: {
		active(){
			if(this.orderDetail.PaymentStatus === '未支付'){
				return -1
			}else if(this.orderDetail.PaymentStatus === '已支付' && this.orderDetail.LogisticsStatus === '未发货'){
				return 0
			}else if(this.orderDetail.LogisticsStatus === '已发货' && this.orderDetail.OrderState === '未签收'){
				return 1
			}else if(this.orderDetail.OrderState === '已签收'){
				return 2
			}else{
				return -1
			}
		},
		stepsTitle(){
			if(this.orderDetail.PaymentStatus === '已关闭'){
				return '买家未付款（关闭订单）'
			}else if(this.orderDetail.PaymentStatus === '已支付' && this.orderDetail.LogisticsStatus === '未发货'){
				return '等待卖家发货'
			}else if(this.orderDetail.LogisticsStatus === '已发货' && this.orderDetail.OrderState === '未签收'){
				return '等待买家签收'
			}else if(this.orderDetail.OrderState === '已签收'){
				return '已签收'
			}else{
				return '买家未付款'
			}
		},
		sendFee(){
			if (this.orderDetail.Data.length >= 2) {
				return '0.00'
			} else if (this.orderDetail.Data.length == 1) {
				return "6.00"
			}
		},
		psFs(){
			if (this.orderDetail.Data.length >= 2) {
				return '免运费'
			} else if (this.orderDetail.Data.length == 1) {
				return "运费￥6.00"
			}
		},
	},
	methods: {
		getOrderDetails(){
			 let d = {
				Type:'SelectOrder',
				OrderID: this.$route.params.id,
                OpenID: localStorage.openid,
            }
            postApi(d, function (response) {
				console.log(response)
				if(response.data[0]){
					this.orderDetail = response.data[0]
					this.remarks = decodeURI(response.data[0].Remarks) || '无'
					if(this.isLoading){
						Toast({
							duration:1000,
							message:'刷新成功',
						});
					}
				}else if(response.data.error){
					Toast(response.data.error)
				}else{
					Toast(response.data)
				}
				this.isLoading = false;
			}.bind(this),function (error) {
				this.isLoading = false;
			}.bind(this))
		},
		titleImage(str){
            return 'http://huoguo.cqjft.com'+str.split(',')[0]
		},
		oneMoreOrder(){
			this.$router.push({name:'list', params:{id: 'c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b'}})
		},
		shareOrder(){
			
		}
	},

};
</script>

<style lang="less" >
.orderInfo {
	height: 100%;
	width: 100%;
	background-color: #f8f8f8;
	.van-steps {
		padding-bottom: 6px;
		.van-icon {
			color: rgb(6, 191, 4)!important;
		}
	}
	.order-content{
		padding-bottom: 39px;
		.address{
			padding: 10px;
			background-color: #fff;
			border-top: 1px solid #f8f8f8;
		}
	}
	.order-footer{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 38px;
		background-color: #fff;
		text-align: right;
		line-height: 38px;
		padding-right: 20px;
		border-top: 1px solid #eee;
	}
}
.van-card{
	background-color: #f8f8f8;
}
.van-contact-card--add{
	position: relative;
}
.addr-left{
	float: left;
	width: 40px;
	text-align: center;
}
.location{
	position: absolute;
	left:12px;
	top: 11px;
	font-size: 21px;
	color: #666;
}
.addr-con{
	//float: left;
	padding-left: 30px;
	padding-right: 20px;
	p{
		margin: 0;
		font-weight: normal;
		line-height: 30px;
		.man{
			font-size: 14px;
			color: #000;
		}
		.tell{
			float: right;
			font-size: 14px;
			color: #000;
			margin-right: 2px;
		}
	}
	.addr-text{
		line-height: 20px;
		font-size: 13px;
		color: #666;
		word-break: break-all;
	}
}
 .van-panel__content {
        .goods-item{
            margin-top: 6px;
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
        img{
            height: 80px;
            width: 100px;
            float: left;
        }
        .con-txt{
            padding-left: 110px;
			height: 80px;
			padding-right: 4px;
            position: relative;
            h5{
                margin: 0;
                font-size: 15px;
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
.send-fs{
	h4{
		margin: 0;
		font-weight: normal;
		color: #666;
		font-size: 15px;
		height: 20px;
	}
	p{
		margin: 0;
		color: #666;
		font-size: 14px;
		height: 20px;
	}
}
.ca-price{
	padding: 12px;
	color: #666;
	background-color: #fff;
	font-size: 14px;
	ul{
		padding: 0;
		li{
			height: 26px;
			line-height: 26px;
		}
	}
	.money{
		display: inline-block;
		text-align: right;
		float: right;
	}
}
.order-time{
	margin-top: 8px;
	background-color: #fff;
	padding: 12px;
	font-size: 12px;
	ul{
		padding: 0;
		li{
			height: 20px;
			line-height: 20px;
		}
	}
}
.van-button--mini{
	padding: 0 10px;
	width: auto;
}
</style>
