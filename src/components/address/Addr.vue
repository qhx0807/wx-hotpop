<template>
	<div class="addr">
		<div class="title">收货地址列表</div>
		<van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" />
	</div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
export default {
	data() {
		return {
			chosenAddressId: 1,
			list: [],
		}
	},
	created(){
		this.getUserInfo();
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
						address: response.data.ProvinceName + response.data.Address + response.data.StreetName+' '+response.data.ZipCode,

					})
                }.bind(this),function (error) {
                
                }.bind(this))
        },
		onAdd() {
			Toast('新增收货地址');
		},
		onEdit(item, index) {
			this.$router.push({name: 'addredit'})
		}
	}
}
</script>

<style lang="less" scoped>
.addr{
	.title{
		height: 40px;
		line-height: 40px;
		padding-left: 1em;
		font-size: 14px;
		color: gray;
	}
}
</style>
