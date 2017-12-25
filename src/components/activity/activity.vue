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
                let faid = localStorage.openid
				wx.onMenuShareTimeline({
					title: "圣诞元旦，惊喜不断！",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/share/share-act.html?r=ACT&actid=4DE30F20-A4A8-46A3-85BC-7AE28FCD29CF&faid='+faid,
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						alert("分享成功！");
					},
					cancel: function () {
					// alert("取消")
					}
				})
				wx.onMenuShareAppMessage({
					title: "圣诞元旦，惊喜不断！",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/share/share-act.html?r=ACT&actid=4DE30F20-A4A8-46A3-85BC-7AE28FCD29CF&faid='+faid,
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
