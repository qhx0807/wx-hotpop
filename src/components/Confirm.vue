<template>
	<div class="confirm">
		<div class="van-contact-card van-contact-card--add">
			<div class="van-contact-card__content">
				<div class="addr-left">
					<van-icon name="location" class="location" style=""/>
				</div>
				<div class="addr-con">
					<p>
						<span class="man">收货人：戚桦星</span>
						<span class="tell">18716752483</span>
					</p>
					<p class="addr-text">重庆市城口县重庆市城口县重庆市城口县重庆市城口县重庆市城口县</p>
				</div>
			</div>
			<i class="van-contact-card__arrow van-icon van-icon-arrow"></i>
		</div>

		<van-card v-for="item in listData" :key="item.CommodityID" :title="item.Name" desc="商品描述商品描述商品描述商品描述商品描述商品描述商品描述" :num="item.num" :price="item.Price" thumb="http://os70o8m36.bkt.clouddn.com/share.bmp" centered>
		</van-card>
		<van-submit-bar :loading="isLoading" :price="price" button-text="提交订单" :tip="tips" @submit="onClickButton" />
		
	</div>
</template>

<script>
import { postApi } from '../axios'
import { Dialog } from 'vant'
import { mapState } from 'vuex'
export default {
	name: "confirm",
	data() {
		return {
			isLoading: false,
			price: 1000,
		};
	},
	created() {
		console.log(this.listData)
	},
	computed: {
		...mapState([
			'listData'
		]),
		tips() {
			if (this.listData.length >= 2) {
				return "您已享受两件包邮优惠"
			} else if (this.listData.length == 1) {
				return "再购买一件商品即可享受包邮"
			}
		}
	},
	methods: {
		getAuth() {
			let code = 1
			let d = {
				Type: 'Type',
				code: code,
			}

		},
		onClickButton() {
			this.isLoading = true
		}
	}
};
</script>

<style lang="less" scoped>
.confirm {
	height: 100%;
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
