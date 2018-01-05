<template>
	<div class="auth">
		<div class="loading" v-if="isLoading">
			<div class="loading-div"></div>
			<p class="loading-text">玩命加载中...</p>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import { postApi } from '../../axios'
import { Dialog } from 'vant'
export default {
	name: "auth",
	data() {
		return {
			msg: "Welcome",
			isLoading:true,
		};
	},
	created () {
		this.getUserOpenid()
	},
	watch:{
        "$route":function(to, from){
            
        }
    },
	methods:{
		getAuth(){
			let code = this.getUrlParams('code')
			let state = this.getUrlParams('state')
			let d = {
				Type:'Login',
				code: code,
				FatherOpenID: sessionStorage.fatherid || '',
			}
			postApi(d, function(response){
					console.log(response)
					this.isLoading = false
					if(response.data.OpenID){
						localStorage.setItem("openid", response.data.OpenID)
						this.switchRouter(state)
					}else if(response.data.error){
						Dialog.alert({
							title: '提示',
							message: response.data.error
						})
					}
				}.bind(this),
				function(error){
					console.log(error)
					this.isLoading = false
				}.bind(this))
		},
		getUserOpenid(){
			let state = this.getUrlParams('state')
			let openid = localStorage.openid
			if(openid){
				this.switchRouter(state)
				this.isLoading = false
			}else{
				this.getAuth()
			}
		},
		getUrlParams(e){
			let url = window.location.href
			let a = url.split("?")[1]
			let b = a.split("#")[0].split("&")
			let code = b[0].split("=")[1]
			let state = b[1].split("=")[1]
			if(e==='code'){
				return code
			}else if(e==='state'){
				return state
			}else{
				return ''
			}
		},
		switchRouter(str){
			// switch (str) {
			// 	case 'STATE':
			// 		this.$router.replace({name: 'my'})
			// 		break;
			// 	case 'SORT':
			// 		this.$router.replace({name: 'sort'})
			// 		break;
			// 	default:
			// 		this.$router.replace({name: 'my'})
			// 		break;
			// }
			let group = str.split('_')[1]
			if(str == 'STATE'){
				this.$router.replace({name: 'my'})
			}else if(str == 'SORT'){
				this.$router.replace({name: 'sort'})
			}else if(group){
				this.$router.replace({name:'list', params:{id: group}})
			}else if(str == 'ORDER'){
				this.$router.replace({name:'allorder', params:{t: '0'}})
			}else if(str == 'MESSAGE'){
				this.$router.replace({name:'memo'})
			}else if(str == 'POPU'){
				this.$router.replace({name:'popucenter'})
			}else if(str == 'LIST'){
				this.$router.replace({name:'list', params:{id: 'c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b'}})
			}else if(str == 'ACT'){
				this.$router.replace({name:'activiity'})
			}else{
				this.$router.replace({name: 'my'})
			}
		},
		
	}
};
</script>

<style lang="less" scoped>
.auth {
	height: 100%;
	width: 100%;
	background-color: #f8f8f8;
	.loading{
		text-align: center;
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 50%;
		margin-top: -40px;
		.loading-text {
			font-size: 13px;
		}
		.loading-div {
			width: 25px;
			height: 25px;
			margin: 0 auto;
			background-color: #424242;
			-webkit-animation: sk-rotatePlane 1.2s infinite ease-in-out;
			animation: sk-rotatePlane 1.2s infinite ease-in-out;
		}
	}
	
}


@-webkit-keyframes sk-rotatePlane {
	0% {
		-webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	}
	50% {
		-webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	}
	100% {
		-webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	}
}

@keyframes sk-rotatePlane {
	0% {
		-webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	}
	50% {
		-webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	}
	100% {
		-webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	}
}
</style>
