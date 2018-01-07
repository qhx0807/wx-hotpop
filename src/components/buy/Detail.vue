<template>
    <div class="detail" @scroll="watchScroll">
        <div class="detail-head" v-show="isHeadShow">
            <i class="iconfont icon-fanhui" @click="goBack"></i>
            <span class="name">{{detailObj.Name}} <span style="font-size:12px;">￥{{detailObj.Price}}</span></span>
            <span class="detail-opt-head">
                <span v-show="detailObj.num>0">
                    <i class="iconfont icon-jian" @click="subOfCarDetail(detailObj.CommodityID)"></i>
                    <span class="num">{{detailObj.num}}</span>
                </span>
                <i class="iconfont icon-add" @click="addToCarDetail(detailObj.CommodityID)"></i>
            </span>
        </div>
        <div class="food">
            <div class="food-content">
                <div class="image-header">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="(item, index) in homeImgs" :key="index">
                            <img class="swipe-img" :src="item"/>
                        </van-swipe-item>
                    </van-swipe>
                    <div class="back" v-show="!isHeadShow" @click="goBack">
                        <i class="iconfont icon-fanhui"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{detailObj.Name}}</h1>
                    <div class="detail">{{ decodeURIComponent(detailObj.Parameter) }}</div>
                    <div class="price">
                        <span class="now">￥{{detailObj.Price}}</span>
                    </div>
                    <span class="detail-opt">
                        <span v-show="detailObj.num>0">
                            <i class="iconfont icon-jian" @click="subOfCarDetail(detailObj.CommodityID)"></i>
                            <span class="num">{{detailObj.num}}</span>
                        </span>
                        <i class="iconfont icon-add" @click="addToCarDetail(detailObj.CommodityID)"></i>
                    </span>
                </div>
                <div class="food-info">
                    <p class="tit">商品信息</p>
                    <p class="con">{{ decodeURIComponent(detailObj.Contents) }}</p>
                </div>
                <div class="food-img">
                    <img v-for="(item, index) in conImgs" :key="index" :src="item" alt="">
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
// import BScroll from 'better-scroll'
export default {
    name: "detail",
    data() {
        return {
            host:'http://huoguo.cqjft.com',
            homeImgs:[],
            conImgs:[],
			isHeadShow:false,
			sortUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3a1714f5b4c11978&redirect_uri=http://huoguo.cqjft.com/new.html&response_type=code&scope=snsapi_base&state=SORT&connect_redirect=1#wechat_redirect',
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

        // const wrapper = document.querySelector('.food')
		// this.$nextTick(function(){
		// 	this.scroll = new BScroll(wrapper, {
        //         startX: 0,
        //         startY: 0,
        //         click:true,
        //         bounce: true,
        //     })
        //     console.log(this.scroll)
        //     this.scroll.hasVerticalScroll = true
		// })
    },
    deactivated(){

    },
    watch: {

    },
    mounted(){
		this.watchScroll()
		this.wxConfigFoo()
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
        addToCarDetail(id){
            this.$store.commit('ADD_LIST_ITEM', id)
        },
        subOfCarDetail(id){
            this.$store.commit('SUB_LIST_ITEM', id)
        },
        goBack(){
            this.$router.go(-1)
        },
        watchScroll(e){
            if(e.target.scrollTop>=480){
                this.isHeadShow = true
            }else{
                 this.isHeadShow = false
            }
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
					link: 'http://huoguo.cqjft.com/new-share.html?r=SORT',
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
					link: 'http://huoguo.cqjft.com/new-share.html?r=SORT',
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
    },
};
</script>

<style lang="less" scoped>
.detail{
    height: 100%;
	overflow: auto;

}
.detail-head{
    height: 45px;
    background-color: rgba(0, 0, 0, .7);
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 99;
    color: #fff;
    .icon-fanhui{
        height: 18px;
        width: 18px;
        position: absolute;
        top: 13px;
        left: 5px;
        font-weight: 600;
    }
    .name{
        margin-left: 40px;
        padding-top: 12px;
        font-size: 14px;
        display: inline-block;
    }
    .detail-opt-head{
        display: inline-block;
        float: right;
        margin-right: 10px;
        margin-top: 12px;
        i{
            font-size: 22px;
            margin: 0 12px;
        }
    }
}
.food {
    width: 100%;
	background: #f8f8f8;
}

.food-content {
    padding-bottom: 48px;
}

.food .image-header {
	width: 100%;
	height: 310px;
}

.swipe-img{
	width: 100%;
	height: 310px;
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
        font-size: 22px;
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
