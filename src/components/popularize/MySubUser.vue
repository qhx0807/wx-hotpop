<template>
    <div class="sub-user">
        <van-pull-refresh v-model="isLoading">
            <div class="tips">
                共有{{listData.TotalRecord}}条记录
            </div>
            <van-cell-group>
                <van-cell v-for="(item, index) in listData.Data" :key="index" :title="item.WeChatName" :value="item.PopularizeTrueName">
                    <img class="head-img" :src="item.HeadImages" slot="icon" alt="">
                </van-cell>
            </van-cell-group>
            <div class="none-div" v-show="listData.TotalRecord==0 && !isLoading">
                <h4>没有下级推广员</h4>
                <p>去分享，得返现</p>
                <button @click="goShare">去推广</button>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
export default {
    name: "mysubuser",
    data() {
        return {
            listData: {
                Data:[],
            },
            isLoading:false,
        }
    },
    created(){

    },
    activated(){
        Toast.loading()
        this.getList()
    },
    watch: {
        isLoading() {
            if (this.isLoading) {
                this.getList()
            }
        }
    },
    methods:{
        getList(){
            let d = {
                Type:'GetUserListByFatherID',
                OpenID: localStorage.openid,
                PageIndex:1,
                PageSize:100,
                SelectType:'',
            }
            postApi(d, function (response) {
               // console.log(response)
                this.listData = response.data[0]
                Toast.clear()
                if(this.isLoading){
                    Toast({
                        message:'刷新成功',
                        duration:500,
                    })
                    this.isLoading = false
                }else{

                }
               
            }.bind(this),function (error) {
                Toast.clear()
                this.isLoading = false
            }.bind(this))
        },
        goShare(){
			this.$router.push({name: 'popushare'})
		},
    }

};
</script>

<style lang="less" scoped>
.sub-user{
    .tips{
        padding: 15px;
        color: #666;
        font-size: 13px;
        background-color: #fff;
    }
    .head-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
    }
    .none-div{
        padding-top: 20px;
        text-align: center;
        color: #666;
        h4{
            font-weight: normal;
            font-size: 16px;
            margin:12px 0;
        }
        p{
            font-size: 12px;
            margin-top: 20px;
            color: gray;
        }
        button{
            outline: none;
            border: 1px solid #FF6600;
            background-color: #f8f8f8;
            color: #f60;
            font-size: 14px;
            padding: 5px 28px;
            margin-top: 15px;
            border-radius: 4px;
        }
    }
}
</style>
