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
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
export default {
	name: 'List',
	data() {
		return {
			isLoading: false,
			sortData: [],
			sortUrl:'http://huoguo.cqjft.com/spxg.html?r=SORT',
		}
	},
	components: {
		Loading
	},
	created() {
		this.getSortData()
		this.wxConfigFoo()
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
		},
		wxConfigFoo(){
			let ticket = localStorage.ticket
			let timestamp = new Date().getTime().toString()
			let url = window.location.href.split('#')[0]
			let noncestr = "Wm3WZYTPz0wzccnW"
			
			let str = "jsapi_ticket="+ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
			let signature = sha1(str)
			wx.config({
				debug: false, 
				appId: 'wx3a1714f5b4c11978',
				timestamp: timestamp,
				nonceStr: noncestr,
				signature: signature,
				jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'],
			});

			wx.ready(function(){
				wx.onMenuShareTimeline({
					title: "杨家酱小火锅",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/new-share.html?r=SORT',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						//getInfo('Type','ShareRecord','ActivityID',GetActivity.ActivityID);
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				});
				wx.onMenuShareAppMessage({
					title: "杨家酱小火锅",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/new-share.html?r=SORT',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						//getInfo('Type','ShareRecord','ActivityID',GetActivity.ActivityID);
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				});

			});
		},
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