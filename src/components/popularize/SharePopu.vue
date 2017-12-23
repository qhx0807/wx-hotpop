<template>
    <div class="share-popu">
        <p class="fx-title">1.点击右上角的按钮，选择“发送给朋友”或者“分享到朋友圈”。</p>
		<img class="fx-img" src="../../assets/wx-share.png">
		<p class="fx-title">2.打开微信扫描下方二维码即可购买。</p>
		<img class="qrcode" :src="codeUrl+qrcodeCon">
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
export default {
    name: "sharepopu",
    data() {
        return {
            codeUrl:'http://qrcode.shuogesha.com/qrcode?pixel=270_250&content=',
            qrcodeCon:'http://huoguo.cqjft.com/share/new-share.html?fatherid=',
            fatherid:'',
        }
    },
    created(){

    },
    activated(){
        this.fatherid = localStorage.openid
        this.qrcodeCon = 'http://huoguo.cqjft.com/share/new-share.html?fatherid='+ localStorage.openid
        this.wxConfigFoo()
    },
    methods:{
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
			})

			wx.ready(function(){
				wx.onMenuShareTimeline({
					title: "杨家酱小火锅",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/share/new-share.html?r=groupid_c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				})
				wx.onMenuShareAppMessage({
					title: "杨家酱小火锅",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/share/new-share.html?r=groupid_c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				})

			})
		},
    }

};
</script>

<style lang="less" scoped>
.share-popu{
    background-color: #fff;
    padding: 12px;
    color: #666;
    text-align: center;
    .fx-title{
		line-height: 30px;
		word-break: break-all;
		white-space: normal;
		text-align: left;
        margin-bottom: 0;
        margin-top: 4px;
        font-size: 14px;
	}
	.fx-img{
		width: 200px;
		height: 120px;
		margin: 0 auto;
	}
	code{
		/*background-color: #eee;*/
		padding: 12px 14px;
		text-align: left;

	}
	#pUrl{
		font-size: 14px;
		background-color: #eee;
		text-align: left;
		margin: 0 24px;
		padding: 12px 10px;
	}
}
</style>
