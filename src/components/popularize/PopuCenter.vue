<template>
    <div class="popucenter">
        <div v-show="userInfo.IsPopularize == '1'">
            <div class="memo-head">
                <canvas id="canvasC"></canvas>
                <img :src="userInfo.HeadImages" alt="">
                <div class="score-num">
                    <p>{{ userInfo.PopularizeTrueName }}</p>
                    <p style="margin-top:3px;">{{ userInfo.PopularizeMoblie }}</p>
                </div>
            </div>
            <van-row>
                <van-col class="all" span="12" style="">
                    <h4>{{ userInfo.PopularizeAllAmount }}</h4>
                    <p>推广总收益</p>
                </van-col>
                <van-col class="wtx" span="12">
                    <h4>{{ userInfo.PopularizeAmount }}</h4>
                    <p>未提现收益</p>
                </van-col>
            </van-row>
            <van-cell-group style="margin-top:10px">
                <van-cell title="我的信息"  @click.native="goMenu('popuuser')"  icon="contact" is-link></van-cell>
                <van-cell title="我的推广订单" @click.native="goMenu('myorder')" icon="records" is-link></van-cell>
            </van-cell-group>
            <van-cell-group style="margin-top:10px">
                <van-cell title="下级推广员" @click.native="goMenu('mysubuser')"  is-link>
                    <template slot="title">
                        <i class="iconfont icon-tuiguangyuan-zujiantuandui_icon"></i>
                        <span class="van-cell-text">下级推广员</span>
                    </template>
                </van-cell>
                <van-cell title="下级推广提成" @click.native="goMenu('mysubuserorder')" is-link>
                    <template slot="title">
                        <i class="iconfont icon-tuiguang"></i>
                        <span class="van-cell-text">下级推广提成</span>
                    </template>
                </van-cell>
                <van-cell title="提现记录" @click.native="goMenu('cashrecords')" icon="exchange" is-link ></van-cell>
                <van-cell title="分享链接" @click.native="goMenu('popushare')" is-link>
                    <template slot="title">
                        <i class="iconfont icon-iconjiudianzhuanqu37"></i>
                        <span class="van-cell-text">分享链接</span>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group style="margin-top:10px">
                <van-cell title="申请提现" @click.native="goMenu('cashapply')" icon="gold-coin" is-link>
                    <i class="iconfont icon-hot"></i>
                </van-cell>
            </van-cell-group>
        </div>
        <div v-show="userInfo.IsPopularize == '0'">
            您还未注册推广员
        </div>
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
export default {
    name: "popucenter",
    data() {
        return {
            userInfo: {},
            step:0,
            lines:[
                "rgba(0,168,255, 0.6)", 
                "rgba(0,168,255, 0.4)", 
                "rgba(0,168,255, 0.1)", 
            ],
        }
    },
    created(){
        
    },
    activated(){
        Toast.loading()
        this.getUserInfo()
        this.wxConfigFoo()
    },
    mounted(){
        
    },
    methods:{
        loop(){
			var canvas = document.getElementById('canvasC')
			var ctx = canvas.getContext('2d')
			var boHeight = canvas.height / 7
			var posHeight = canvas.height / 1.2
			ctx.clearRect(0,0,canvas.width,canvas.height); 
			var t = this;
			this.step ++
			for(var j = t.lines.length - 1; j >= 0; j--) { 
				ctx.fillStyle = t.lines[j]; 
				//每个矩形的角度都不同，每个之间相差45度 
				var angle = (t.step+j*70)*Math.PI/180; 
				var deltaHeight = Math.sin(angle) * boHeight;
				var deltaHeightRight = Math.cos(angle) * boHeight; 
				ctx.beginPath();
				ctx.moveTo(0, posHeight+deltaHeight); 
				ctx.bezierCurveTo(canvas.width/2, posHeight+deltaHeight-boHeight, canvas.width / 2, posHeight+deltaHeightRight-boHeight, canvas.width, posHeight+deltaHeightRight); 
				ctx.lineTo(canvas.width, canvas.height); 
				ctx.lineTo(0, canvas.height); 
				ctx.lineTo(0, posHeight+deltaHeight); 
				ctx.closePath(); 
				ctx.fill(); 
			}
			var requestAnimFrame = 	window.requestAnimationFrame  || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ 
						window.setTimeout(callback, 1000 / 60); 
					}; 
			requestAnimFrame(this.loop);
        },
        getUserInfo(){
            let d = {
                Type:'GetUser',
                OpenID: localStorage.openid,
            }
            postApi(d, function (response) {
                    //console.log(response)
                    this.userInfo = response.data
                    if(response.data.IsPopularize==1){
                        this.loop()
                    }
                    Toast.clear()
                }.bind(this),function (error) {
                    Toast.clear()
                }.bind(this))
        },
        goMenu(e){
            this.$router.push({name: e})
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
			})

			wx.ready(function(){
				wx.onMenuShareTimeline({
					title: "杨家酱小火锅",
					desc:"随时随地，和你品尝舌尖上的重庆！",
					link: 'http://huoguo.cqjft.com/share/new-share.html?r=groupid_c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b',
					imgUrl: 'http://huoguo.cqjft.com/images/shareimg.bmp', 
					success: function () { 
						//getInfo('Type','ShareRecord','ActivityID',GetActivity.ActivityID);
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
						//getInfo('Type','ShareRecord','ActivityID',GetActivity.ActivityID);
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
.popucenter{
    height: 100%;
    .memo-head {
		height: 140px;
        width: 100%;
        position: relative;
        img{
            position: absolute;
            top: 20px;
            height: 60px;
            width: 60px;
            left: 50%;
            margin-left: -30px;
            background-color: #ffffff;
            border-radius: 50%;
        }
        .score-num{
            position: absolute;
            top: 90px;
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: 13px;
            p{
                margin: 0;
            }
        }
        canvas{
            background-color: skyblue;
            height: 140px;
            width: 100%;
        }
    }
    .van-row{
        .van-col{
            height: 80px;
            background-color: #fff;
            text-align: center;
             h4{
                margin: 0;
                margin-top: 17px;
                font-size: 22px;
                font-weight: 600;
                text-shadow: 0px 1px 1px #dadada;
            }
            p{
                margin: 0;
                margin-top: 6px;
                font-size: 14px;
                color: #666;
            }
        }
        .all{
            border-right: 1px solid #e7e7e7;
            h4{
                color: #4cd964;
            }
        }
        .wtx{
            h4{
                color: #f0ad4e;
            }
        }
    }
    .icon-hot{
        color: #f0ad4e;
        font-size: 20px;
    }
    
    //background-color: #fff;
}
</style>
