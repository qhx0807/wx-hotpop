<template>
    <div class="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="homeImgs[0]">
                <div class="back" @click="goBack">
                    <i class="iconfont icon-fanhui"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{detailObj.Name}}</h1>
                <div class="detail">内容内容内容容内容内容内容内容容内容内容内容内容容内容</div>
                <div class="price">
                    <span class="now">￥{{detailObj.Price}}</span>
                </div>
                <span class="detail-opt">
                    <span v-show="detailObj.num>0">
                        <i class="iconfont icon-jian" @click="subOfCar(detailObj)"></i>
                        <span class="num">{{detailObj.num}}</span>
                    </span>
                    <i class="iconfont icon-add" @click="addToCar(detailObj.CommodityID)"></i>
                </span>
            </div>
            <div class="food-info">
                <p class="tit">商品信息</p>
                <p class="con">内容内容内容容内容内容内容内容内容内容容内容内容内容内容容内容内容内容内容容内容内容内容内容容内容内容内容内容容内容</p>
            </div>
            <div class="food-img">
                <img :src="conImgs[0]" alt="">
            </div>
        </div>
        
    </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
    name: "detail",
    data() {
        return {
            host:'http://huoguo.cqjft.com',
            homeImgs:[],
            conImgs:[],
        }
    },
    created(){

    },
    activated(){
       if(!this.detailObj.Name){
            this.$router.replace({name:'list', params:{id: 'c6f8751a-8d69-4ab4-bdf6-620b5f90ec6b'}})
            return false
        }
        this.homeImgs = this.formatImgSrc(this.detailObj.HomeImage)
        this.conImgs = this.formatImgSrc(this.detailObj.ContentImage)
    },
    deactivated(){
        
    },
    watch:{
        "$route":function(to, from){
            // alert(2)
            // console.log(from)
        }
    },
    computed:{
        ...mapState([
			'detailObj'
        ]),
    },
    methods:{
        formatImgSrc(str){
            let arr = []
            str.split(',').forEach(item => {
                arr.push(this.host + item)
            })
            return arr
        },
        addToCar(id){
            this.$store.commit('ADD_LIST_ITEM', id)
        },
        goBack(){
            this.$router.go(-1)
        }
    },
};
</script>

<style lang="less" scoped>
.food {
	width: 100%;
	background: #f8f8f8;
	overflow: auto;
}

.food-content {
    overflow: scroll;
    padding-bottom: 50px;
}

.food .image-header {
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
}

.food .image-header img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.food .image-header .back {
	position: absolute;
	top: 10px;
	left: 5px;
	font-size: 24px;
	color: white;
	font-weight: 800;
}

.food .content {
	position: relative;
	padding: 18px;
	background-color: #fff;
}

.food .content .title {
	line-height: 14px;
	margin-bottom: 8px;
	font-size: 16px;
	font-weight: 700;
	color: #07111b;
	margin: 0;
	padding: 0;
}

.food .content .detail {
	margin-bottom: 18px;
	margin-top: 10px;
	/*line-height: 10px;
		    height: 10px;*/
	font-size: 12px;
}

.food .content .price {
	font-weight: 700;
	line-height: 24px;
}

.food .content .price .now {
	margin-right: 8px;
	font-size: 14px;
	color: #f01414;
}
.detail-opt {
	position: absolute;
	right: 10px;
	bottom: 20px;
	z-index: 10;
	height: 24px;
	line-height: 24px;
	padding: 0 12px;
	color: #00a0dc;
    font-size: 14px;
     span{
        margin: 0 6px;
    }
    i{
        font-size: 18px;
    }
}
.food-info{
    margin-top: 12px;
    padding: 18px;
    background-color: #fff;
    p{
        margin: 0;
        padding: 0;
        color: #666;
    }
    .tit{
        font-size: 16px;
    }
    .con{
        font-size: 13px;
        line-height: 25px;
        padding: 0 10px;
        color: #666;
        letter-spacing: 1px;
        margin-top: 5px;
    }
}
.food-img{
    width: 100%;
    img{
        height: 100%;
        width: 100%;
    }
}
</style>
