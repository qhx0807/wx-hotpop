<template>
	<div class="confirm">
		<div class="van-contact-card van-contact-card--add">
			<div class="van-contact-card__content" @click="goEditAddr">
				<div class="addr-left">
					<van-icon name="location" class="location" style=""/>
				</div>
				<div class="addr-con">
					<p>
						<span class="man">收货人：{{list[0] ? list[0].name : ''}}</span>
						<span class="tell">{{list[0] ? list[0].tel : ''}}</span>
					</p>
					<p class="addr-text">{{list[0] ? list[0].address : ''}}</p>
				</div>
			</div>
			<i class="van-contact-card__arrow van-icon van-icon-arrow"></i>
		</div>

		<van-card v-for="item in listData" :key="item.CommodityID" :title="item.Name" desc="商品描述商品描述商品描述商品描述商品描述商品描述商品描述" :num="item.num" :price="item.Price" thumb="http://os70o8m36.bkt.clouddn.com/share.bmp" centered>
		</van-card>
		
		<van-cell-group style="margin:10px 0;">
			<van-field v-model="remarks" type="textarea" label="买家留言" placeholder="选填:对本次交易的说明"></van-field>
		</van-cell-group>

		<van-submit-bar :loading="isLoading" :price="totalPrice" button-text="提交订单" :tip="tips" @submit="onClickAddOrder" />
		
	</div>
</template>

<script>
import { postApi } from '../axios'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
	name: "confirm",
	data() {
		return {
			isLoading: false,
			price: 1000,
			list:[],
			totalPrice:0,
			addrInfo:{},
			remarks:'',
		};
	},
	created() {
		if(this.listData.length==0){
			Toast("请选择商品")
			this.$router.replace({name:'list'})
			return false
		}
		Toast.loading({
            duration: 0,
            forbidClick: true, 
		})
		this.getUserInfo()
		this.getOrderPrice()
		
	},
	watch:{
		
	},
	computed: {
		...mapState([
			'listData'
		]),
		tips() {
			if (this.listData.length >= 2) {
				return "您已享受满两件包邮优惠"
			} else if (this.listData.length == 1) {
				return "再购买一件商品即可享受包邮"
			}
		},
		// totalPrice(){
		// 	let fee = 0
		// 	this.listData.forEach(item => {
		// 		fee += parseFloat(item.Price)
		// 	})
		// 	if(this.listData.length>=2){
		// 		return fee*100
		// 	}else{
		// 		return (fee+6)*100
		// 	}
		// }
	},
	methods: {
		getUserInfo(){
            let d = {
                Type:'GetUser',
                OpenID: localStorage.openid,
            }
            postApi(d, function (response) {
					console.log(response)
					this.list.push({
						id:1,
						name: response.data.ReceiverName,
						tel: response.data.Mobile,
						address: response.data.ProvinceName + response.data.CityName + response.data.AreaName+' '+response.data.StreetName +' '+ response.data.Address+ ' '+response.data.ZipCode,
					})
					this.addrInfo = response.data
                }.bind(this),function (error) {
                
                }.bind(this))
        },
		goEditAddr(){
			this.$router.push({name: 'addredit'})
		},
		getOrderPrice(){
			let commids = ''
			this.listData.forEach(item => {
				commids += (item.CommodityID + ',' + item.num + ',')
			})
			let d = {
				Type: 'GetOrderPrice',
				OpenID: localStorage.openid,
				Commodity: commids,
				OrderType:0,
			}
			postApi(d, function (response) {
					let p = parseFloat(response.data.OrderPrice)*100
					this.totalPrice = parseInt(p)
					Toast.clear()
                }.bind(this),function (error) {
					Toast("网络出错")
                }.bind(this))
		},
		onClickAddOrder() {
			this.isLoading = true
			let commids = ''
			this.listData.forEach(item => {
				commids += (item.CommodityID + ',' + item.num + ',')
			})
			let d = {
				Type:'AddOrder',
				OpenID:localStorage.openid,
				TrueName: this.addrInfo.ReceiverName,
				Mobile:this.addrInfo.Mobile,
				ProvinceName:this.addrInfo.ProvinceName,
				CityName:this.addrInfo.CityName,
				AreaName:this.addrInfo.AreaName,
				StreetName:this.addrInfo.StreetName,
				Address:this.addrInfo.Address,
				ZipCode:this.addrInfo.ZipCode,
				IntegralDeductible:'',
				IntegralPrice:'',
				Remarks: this.remarks,
				Commodity:commids,
				FatherOpenID:'',
				OrderType:0,
			}
			postApi(d, function (response) {
					console.log(response)
					this.isLoading = false
					if(response.data.OrderID){
						window.location.href="http://huoguo.cqjft.com/interface/paysub.aspx?totalfee="+this.totalPrice+"&deviceinfo=lishun&attach="+response.data.OrderID
						this.$store.commit('UPDATE_LIST', [])
					}else if(response.data.error){
						Toast(response.data.error)
					}else{
						Toast(response.data)
					}
                }.bind(this),function (error) {
					Toast("网络出错")
					this.isLoading = false
                }.bind(this))
		},
	}
};
</script>

<style lang="less" scoped>
.confirm {
	height: 100%;
	overflow: auto;
	padding-bottom: 88px;
	//background-color: #ffffff;
}
.van-card{
	background-color: #ffffff;
}

.van-card__thumb img {
	border: none;
	width: 100%;
	height: 100px;
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
	top: 50%;
	font-size: 24px;
	color: #38f;
	transform: translate3d(0,-50%,0);
}
.addr-con{
	//float: left;
	padding-left: 40px;
	padding-right: 20px;
	p{
		margin: 0;
		font-weight: normal;
		line-height: 30px;
		.tell{
			float: right;
			margin-right: 12px;
		}
	}
	.addr-text{
		margin-top: 2px;
		line-height: 20px;
		font-size: 13px;
	}
}
</style>
