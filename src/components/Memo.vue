<template>
    <div class="memo">
        <canvas class="memo-head" id="canvas"></canvas>
		<div class="memo-tips">
			<i class="iconfont icon-tips1"></i>在购买过程中有任何疑问您可以给我们留言，我们会尽快给您反馈。
		</div>
        <van-cell-group>
            <van-field
                v-model="msg.tel"
                type="tel"
                label="手机号"
                placeholder="请输入手机号"
                required
            >
            </van-field>
                <van-field
                v-model="msg.text"
                label="留言"
                type="textarea"
                placeholder="请输入留言"
                required
                autosize
                rows="1"
                >
            </van-field>
        </van-cell-group>
		<div class="memo-footer">
			<van-button size="large" :loading="submitLoading" @click="submitMemo" type="primary">提交</van-button>
		</div>
    </div>
</template>

<script>
import { postApi } from '../axios'
import { Toast } from 'vant'
export default {
  	name: 'memo',
	data() {
		return {
			msg: {
				tel: '',
				text: ''
			},
			submitLoading:false,
			step:0,
			lines:[
				"rgba(0,222,255, 0.2)", 
				"rgba(157,192,249, 0.2)", 
				"rgba(0,168,255, 0.2)"
			],
		}
	},
	created(){

	},
	mounted(){
		this.loop()
	},
	methods:{
		loop(){
			var canvas = document.getElementById('canvas')
			var ctx = canvas.getContext('2d')
			var boHeight = canvas.height / 2.2
			var posHeight = canvas.height / 2
			ctx.clearRect(0,0,canvas.width,canvas.height); 
			var t = this;
			this.step ++
			for(var j = t.lines.length - 1; j >= 0; j--) { 
				ctx.fillStyle = t.lines[j]; 
				//每个矩形的角度都不同，每个之间相差45度 
				var angle = (t.step+j*50)*Math.PI/180; 
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
		submitMemo(){
			if(this.msg.tel == '' || this.msg.tel == null){
				Toast('请输入手机号')
				return false
			}else if(this.msg.text == '' || this.msg.text == null){
				Toast('请输入留言内容')
				return false
			}
			this.submitLoading = true
			let d = {
				Type:'Message',
				Telephone: this.msg.tel,
				Message: this.msg.text,
			}
			var t = this;
			postApi(d, function(response){
					console.log(response)
					this.submitLoading = false
					
					if(response.data[0].OK){
						Toast.success("提交成功")
						setTimeout(function(){
							t.$router.replace({name: 'my'})
						},3000)
					}else if(response.data.error){
						Toast(response.data.error)
					}else{
						Toast(response.data)
					}
				}.bind(this),
				function(error){
					this.submitLoading = false
					Toast('网络出错')
				}.bind(this))
		},
	}
}
</script>

<style lang="less" scoped>
.memo {
  	height: 100%;
  	background-color: #fff;
		.memo-head {
		height: 150px;
		width: 100%;
		}
  	.memo-tips{
		color: rgba(69, 90, 100, 0.6);
		padding: 20px 15px;
		font-size: 14px;
		.icon-tips1{
			color: orange;
			font-size: 18px;
			margin-right: 4px;
		}
	}
	.memo-footer{
		padding: 12px;
		margin-top: 30px;
		.van-button--large{
			height: 40px;
			line-height: 38px;
		}
	}
	
}
</style>
