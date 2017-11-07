<template>
	<div class="wrap">
		<Loading class="loading" v-if="isLoading"></Loading>
		<div class="all">
            <img class="title" src="../../assets/all.png" alt="">
            
        </div>
		<div class="group-titlt">
            <i class="iconfont icon-biaoqian"></i>
            <span>套餐</span>
        </div>
	</div>
</template>

<script>
import Loading from '../common/Loading.vue'
import { postApi } from '../../axios'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
export default {
	name: 'List',
	data() {
		return {
			isLoading: false,
			sortData: [],
			sortUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3a1714f5b4c11978&redirect_uri=http://huoguo.cqjft.com/new.html&response_type=code&scope=snsapi_base&state=SORT&connect_redirect=1#wechat_redirect',
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
			let url = window.location.href
			let noncestr = "Wm3WZYTPz0wzccnW"
			
			let str = "jsapi_ticket="+ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
			let signature = sha1(str)
			let t = this
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
					title: "杨家酱小火锅商品详情",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: t.sortUrl,
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
					title: "杨家酱小火锅商品详情",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: t.sortUrl,
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
.wrap{
    
    height: 100%;
    background-color: #fff;
    .loading {
        position: absolute;
        top: 50%;
        margin-top: -35px;
       
    }
    
    .all{
        width: 100%;
        padding-top:8px;
        .title{
            width: 100%;
            height: 50px;
        }
    }
    .group-titlt{
        text-align: center;
        font-family: '微软雅黑';
        i{
            font-size: 20px;
            vertical-align: middle;
            color: #EE602E;
            font-weight: 600;
        }
        span{
            vertical-align: middle;
            font-size: 17px;
            font-weight: 600;
            color: #EE602E;
            letter-spacing: 1px;
            margin-left: 6px;
        }
    }
}


</style>