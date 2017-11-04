<template>
	<div class="wrap">
		<Loading class="loading" v-if="isLoading"></Loading>
		<div class="head-img">
			<img src="../assets/s1.jpg" alt="">
		</div>
		<div style="padding:0 30px;">
			<van-row gutter="30">
				<van-col span="12" v-for="(group,index) in sortData" :key="group.GroupID" class="group-item">
					<div class="item" @click="onClickGroup(group.GroupID)" :class="'item-'+(index+1)">
						<i></i>{{group.Name}}</div>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
import Loading from './common/Loading.vue'
import { postApi } from '../axios'
import { Toast } from 'vant'
export default {
	name: 'List',
	data() {
		return {
			isLoading: false,
			sortData: [{ "GroupID": "c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b", "Name": "全部商品" }, { "GroupID": "2f277ec0-7ca3-488a-b1aa-de5fa9638637", "Name": "套餐" }, { "GroupID": "41fe93f0-92c0-423a-91c1-739d87d562e8", "Name": "嘴乐火锅" }, { "GroupID": "032b3264-1a5a-4839-bb87-18041cb92659", "Name": "杨家酱火锅" }, { "GroupID": "bfc7b5bb-9a51-4b22-942b-eae42b2eb92d", "Name": "卤家庄零食" }],
		}
	},
	components: {
		Loading
	},
	created() {
		this.getSortData()
	},
	methods: {
		getSortData() {
			let d = {
				Type: 'GetGroup',
				OpenID: localStorage.openid,
			}
			postApi(d, function(response) {
				//console.log(response)
				this.isLoading = false
				if (response.data.length>0) {
					this.sortData = response.data
				} else if (response.data.error) {
					Toast(response.data.error)
				} else {
					Toast(response.data)
				}
			}.bind(this), function(error) {
				this.isLoading = false
			}.bind(this))
		},
		onClickGroup(groupid){
			this.$router.push({name:'list', params:{id: groupid}})
		}
	}
}
</script>

<style lang="less" scoped>
.wrap {
	margin: 0;
	padding: 0;
	background-color: #fff;
	height: 100%;
	width: 100%;
	position: relative;
	.head-img {
		height: 190px;
		width: 100%;
		img {
			height: 190px;
			width: 100%;
		}
	}
	.group-item {
		text-align: center;
		.item {
			height: 40px;
			margin-top: 30px;
			line-height: 38px;
			font-size: 14px;
			border: 1px solid #fff;
			position: relative;
			i {
				position: absolute;
				left: 0;
				top: 0;
				width: 0;
				height: 0;
				overflow: hidden;
				font-size: 0;
				line-height: 0;
				border-bottom: 7px dashed transparent;
				border-right: 7px dashed transparent;
			}
			&.item-1 {
				color: #39c4bb;
				border: 1px solid #39c4bb;
				i {
					border-top: 7px solid #37c4bb;
					border-left: 7px solid #37c4bb;
				}
			}
			&.item-2 {
				color: #e9b161;
				border: 1px solid #e9b161;
				i {
					border-top: 7px solid #e9b161;
					border-left: 7px solid #e9b161;
				}
			}
			&.item-3 {
				color: #b4ca6e;
				border: 1px solid #b4ca6e;
				i {
					border-top: 7px solid #b4ca6e;
					border-left: 7px solid #b4ca6e;
				}
			}
			&.item-4 {
				color: #559bd6;
				border: 1px solid #559bd6;
				i {
					border-top: 7px solid #559bd6;
					border-left: 7px solid #559bd6;
				}
			}
			&.item-5 {
				color: red;
				border: 1px solid red;
				i {
					border-top: 7px solid red;
					border-left: 7px solid red;
				}
			}
			&.item-6 {
				color: #d09879;
				border: 1px solid #d09879;
				i {
					border-top: 7px solid #d09879;
					border-left: 7px solid #d09879;
				}
			}
		}
	}
}

.loading {
	position: absolute;
	top: 50%;
	margin-top: -35px;
}

.list {
	color: #6d6d72;
	font-size: 15px;
	padding-bottom: 50px;
}
</style>