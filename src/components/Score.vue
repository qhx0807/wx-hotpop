<template>
    <div class="score">
        <div class="memo-head">
            <canvas id="canvas"></canvas>
            <img src="../assets/s2.png" alt="">
            <div class="score-num">可用积分： <span>120</span></div>
        </div>
        <div class="score-op">可用积分： 12</div>
        <!-- <div style="width:100%;height:100px;background:rgba(0,168,255, 1)"></div> -->
    </div>
</template>

<script>
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
		}
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
    .score-op{
        background-color: #fff;
    }
}
</style>
