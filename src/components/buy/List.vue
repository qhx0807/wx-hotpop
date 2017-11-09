<template>
	<div class="wrap">
		<Loading class="loading" v-if="isLoading"></Loading>
		<div class="list">
			<ul class="list-ul">
				<li v-for="item in listData" :key="item.CommodityID" @click="seeHotDetail(item)">
					<div class="icon">
						<img :src="titleImage(item.TitleImage)">
					</div>
					<div class="content">
						<h4>{{item.Name}}</h4>
						<p>{{ decodeURIComponent(item.Contents) }}</p>
						<h3>￥{{item.Price}}</h3>
					</div>
					<span class="operator">
						<span v-show="item.num>0">
							<i class="iconfont icon-jian" @click.stop="subOfCar(item.CommodityID)"></i>
							<span class="num">{{item.num}}</span>
						</span>
						<i class="iconfont icon-add" @click.stop="addToCar(item.CommodityID)"></i>
					</span>
				</li>
                <li class="none-li" v-if="listData.length==0 && !isLoading"> 暂无商品~</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Loading from '../common/Loading.vue'
import { postApi } from '../../axios'
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
	name: 'List',
	data() {
		return {
			msg: 'Welcome',
			count: 0,
			isLoading: true,
			buynum: 0,
			fee: 0,
			carlistShow: false,
		}
	},
	components: {
		Loading
    },
    
	created() {
        console.log(1)
        this.getCommodityList()
    },
    mounted(){
        console.log(2)
    },
    activated(){
       console.log(3)
    },
    deactivated(){
        console.log(4)
    },
    watch:{
        "$route":function(to, from){
			console.log(from.name)
			if(from.name=='sort' || from.name=='my' || from.name=='allorder' || from.name=='orderinfo'){
				this.getCommodityList()
			}
        }
    },
    computed:{
        ...mapState([
			'listData'
        ]),
    },
	methods: {
		getCommodityList() {
			let d = {
				Type: 'GetCommodity',
				OpenID: localStorage.openid,
				GroupID: this.$route.params.id,
			}
			postApi(d, function(response) {
					console.log(response)
					this.isLoading = false
					if (response.data.length >= 0) {
						response.data.forEach(function(item) {
							item.num = 0
						})
                        this.$store.commit('UPDATE_LIST', response.data)
					} else if (response.data.error) {
						Toast(response.data.error)
						this.isLoading = false
					}
				}.bind(this),
				function(error) {
					this.isLoading = false
					console.log(error)
				}.bind(this)
			)
		},
		addToCar(id) {
			this.$store.commit('ADD_LIST_ITEM', id)
		},
		subOfCar(id) {
			this.$store.commit('SUB_LIST_ITEM', id)
		},
        titleImage(str){
            return 'http://huoguo.cqjft.com'+str.split(',')[0]
        },
        seeHotDetail(item){
            this.$store.commit('UPDATE_dETAIL', item)
            this.$router.push({ name: 'detail'})
        }
	}
}
</script>

<style lang="less" scoped>
.wrap {
	margin: 0;
	padding: 0;
	background-color: #f8f8f8;
	width: 100%;
    position: relative;
    padding-bottom: 10px;
}

.loading {
	position: fixed;
	top: 50%;
    margin-top: -35px;
    background-color: #f8f8f8;
}

.list {
	color: #6d6d72;
	font-size: 15px;
	padding-bottom: 50px;
}

.list-ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.list-ul li {
	background-color: white;
	//height: 80px;
	padding: 18px;
	position: relative;
	border-bottom: 1px solid #f8f8f8;
}

.list-ul li .icon {
	height: 80px;
	width: 80px;
	float: left;
}

.list-ul li .icon img {
	height: 80px;
	width: 80px;
}

.list-ul li .content {
	padding-left: 18px;
	overflow: hidden;
}

.content h4 {
	margin: 0;
	letter-spacing: 1px;
	margin-top: 4px;
}

.content h3 {
	margin: 0;
	letter-spacing: 1px;
	font-size: 16px;
	font-weight: normal;
	color: #f01414;
	/*margin-top: 5px;*/
}

.content p {
	margin: 0;
	height: 35px;
	line-height: 35px;
	font-size: 13px;
	/*margin-top: 5px;*/
	width: 100%;
	color: #bbb;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
}

.operator {
	position: absolute;
	z-index: 1;
	right: 26px;
	color: #00a0dc;
	bottom: 15px;
	font-size: 18px;
}

.iconfont {
	font-size: 24px;
	margin: 0 7px;
	vertical-align: middle;
}

.operator .num {
	vertical-align: middle;
	color: black;
	font-size: 12px;
	color: gray;
}
.none-li{
    background-color: #f8f8f8!important;
    text-align: center;
    line-height: 80px;
}
</style>