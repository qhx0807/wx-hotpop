<template>
    <div class="score">
        <div class="memo-head">
            <canvas id="canvas"></canvas>
            <img :src="userInfo.HeadImages" alt="">
            <div class="score-num">可用积分： <span>{{userInfo.Integral}}</span></div>
        </div>
        <div class="score-re">积分记录</div>
        <div class="score-op">
            <ul>
                <li>
                    <i class="iconfont icon-yifukuan"></i>
                    购买
                    <span class="num">-220</span>
                    <p>2017-08-18 10:12:22</p>
                </li>
                <li> 
                    <i class="iconfont icon-yifukuan"></i>
                     购买
                    <span class="num">+120</span>
                    <p>2017-08-18 10:12:22</p>
                </li>
                <li> 
                    <i class="iconfont icon-yifukuan"></i>
                     购买
                    <span class="num">+120</span>
                    <p>2017-08-18 10:12:22</p>
                </li>
            </ul>
        </div>
        <!-- <div style="width:100%;height:100px;background:rgba(0,168,255, 1)"></div> -->
    </div>
</template>

<script>
import { postApi } from '../axios'
import { Toast } from 'vant'
export default {
  	name: 'score',
	data() {
        return {
            step:0,
			lines:[
                "rgba(0,168,255, 0.6)", 
                "rgba(0,168,255, 0.4)", 
                "rgba(0,168,255, 0.1)", 
            ],
            userInfo:{},
        }
	},
	created(){
         Toast.loading({
            duration: 0,
            forbidClick: true, 
        })
        this.getUserInfo()
	},
	mounted(){
		this.loop()
	},
	methods:{
		loop(){
			var canvas = document.getElementById('canvas')
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
                    console.log(response)
                    this.userInfo = response.data
                    Toast.clear()
                }.bind(this),function (error) {
                    Toast.clear()
                }.bind(this))
        },
	}
}
</script>

<style lang="less" scoped>
.score {
    height: 100%;
    //background-color: #fff;
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
            span{
                font-weight: 600;
                font-size: 18px;
            }
        }
        canvas{
            background-color: skyblue;
            height: 140px;
            width: 100%;
        }
    }
    .score-re{
        padding: 15px 14px;
        font-size: 14px;
        color: #666;
    }
    .score-op{
        background-color: #fff;
        color: #666;
        padding: 15px 0px;
        ul{
            list-style: none;
            padding-left: 55px;
            li{
                border-bottom: 1px solid #f8f8f8;
                height: 55px;
                position: relative;
                line-height: 55px;
                padding-left: 5px;
                .icon-yifukuan{
                    font-size: 33px;
                    position: absolute;
                    left: -40px;
                    top: 3px;
                    color: deepskyblue;
                }
                .num{
                    position: absolute;
                    color: black;
                    font-weight: 500;
                    font-size: 16px;
                    right: 18px;
                    top: -5px;
                }
                p{
                    position: absolute;
                    color:#666;
                    font-size: 12px;
                    right: 16px;
                    bottom: -30px;
                }
            }
        }
    }
}
</style>
