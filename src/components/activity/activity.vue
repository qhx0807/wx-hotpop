<template>
  <div class="act">
    <!-- <img class="hedimg" src="../../assets/act1.png" alt=""> -->
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
export default {
    data () {
        return {
            codeUrl:'http://qrcode.shuogesha.com/qrcode?pixel=270_250&content=',
            qrcodeCon:'http://huoguo.cqjft.com/share/new-share.html?fatherid=',
            fatherid:'',
        }
    },
    created () {

    },
     activated(){
        this.fatherid = localStorage.openid
        this.qrcodeCon = 'http://huoguo.cqjft.com/share/new-share.html?fatherid='+ localStorage.openid
        this.wxConfigFoo()
    },
    methods: {
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
					title: "钱的事你不用担心",
					desc:"关注公众号，免费吃火锅",
					link: 'http://huoguo.cqjft.com/share/new-share.html?r=groupid_4DE30F20-A4A8-46A3-85BC-7AE28FCD29CF',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp',
					success: function () {
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				})
				wx.onMenuShareAppMessage({
					title: "钱的事你不用担心",
					desc:"关注公众号，免费吃火锅",
					link: 'http://huoguo.cqjft.com/share/new-share.html?r=groupid_4DE30F20-A4A8-46A3-85BC-7AE28FCD29CF',
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

}
</script>

<style lang="less" scoped>
.act{
    .hedimg{
        width: 100%;
    }
}
</style>
