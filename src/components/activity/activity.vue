<template>
  <div class="act">
    <img class="hedimg" src="../../assets/ac1.jpg" alt="">
    <img class="hedimg" src="../../assets/ac2.jpg" alt="">
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
import { postApi } from '../../axios'
export default {
    data () {
        return {
            fatherid:'',
        }
    },
    created () {

    },
     activated(){
        this.fatherid = localStorage.openid
        this.wxConfigFoo()
        this.clickShare()
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
        clickShare(){
            let faid = sessionStorage.getItem('faid')
            let actid = sessionStorage.getItem('actid')
            let d = {
				Type:'ClickShare',
				OpenID: localStorage.openid,
                ShareOpenID: faid || '',
                ActivityID:'4DE30F20-A4A8-46A3-85BC-7AE28FCD29CF',
			}
            if(faid && actid){
                postApi(d, function(response){
					console.log(response)
					sessionStorage.removeItem('faid')
					sessionStorage.removeItem('actid')
				}.bind(this),
				function(error){
					console.log(error)
				}.bind(this))
            }
        }
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
