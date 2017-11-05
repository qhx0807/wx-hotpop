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
				<van-steps :active="active" icon="logistics" icon-class="steps-success" title="等待商家发货">
					<van-step>买家已付款</van-step>
					<van-step>商家已发货</van-step>
					<van-step>交易完成</van-step>
				</van-steps>
			</van-pull-refresh>
		</div>
		<div class="order-footer"></div>
	</div>
</template>

<script>
import { Toast } from 'vant'
import { postApi } from '../axios'
export default {
	name: "orderInfo",
	data() {
		return {
			active: 0,
			isLoading: false,
		}
	},
	created() {

	},
	watch: {
		isLoading() {
			if (this.isLoading) {
				setTimeout(() => {
					Toast({
						duration:1000,
						message:'刷新成功',
					});
					this.isLoading = false;
				}, 500);
			}
		}
	},
	activated() {

	},
	deactivated() {

	},
	computed: {

	},
	methods: {

	},

};
</script>

<style lang="less" >
.orderInfo {
	height: 100%;
	width: 100%;
	.van-steps {
		.van-icon {
			color: rgb(6, 191, 4)!important;
		}
	}
	.order-content{
		height: 100%;
		padding-bottom: 50px;
	}
	.order-footer{
		
	}
}
</style>
