<template>
    <div class="popu-user">
         <div class="tips">
            注册推广员
        </div>
         <van-cell-group>
             <van-field v-model="userInfo.PopularizeTrueName" label="推广员姓名" :error="errorItem==1"  placeholder="名字"> </van-field>
             <van-field v-model="userInfo.PopularizeMoblie" label="电话号码" :error="errorItem==2"  placeholder="电话"> </van-field>
         </van-cell-group>
         <div class="tips-div">
             <p @click="goTips">推广员小秘诀</p>
         </div>
         <div class="btn-wrap">
            <van-button type="primary" style="width:100%" :loading="submitLoading" @click="savePopuInfo" >保存</van-button>
            <van-button type="default" @click="goBack" style="margin-top:12px;width:100%" >返回</van-button>
        </div>
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
export default {
    name: "popuuser",
    data() {
        return {
            userInfo: {
                PopularizeTrueName:'',
                PopularizeMoblie:'',
            },
            errorItem:0,
            submitLoading:false,
        }
    },
    created(){

    },
    activated(){
        //Toast.loading()
        //this.getUserInfo()
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        savePopuInfo(){
            if(this.userInfo.PopularizeTrueName == '' || this.userInfo.PopularizeTrueName == null){
                this.errorItem = 1
                return false
            }else if(this.userInfo.PopularizeMoblie == '' || this.userInfo.PopularizeMoblie == null){
                this.errorItem = 2
                return false
            }
             this.errorItem = -1
            this.submitLoading = true
            let d = {
                Type:'Popularize',
                OpenID:localStorage.openid,
                Name: this.userInfo.PopularizeTrueName,
                Moblie: this.userInfo.PopularizeMoblie,
            }
            postApi(d, function (response) {
                //console.log(response)
                let t = this
                if(response.data.OK){
                    Toast({
                        message:'注册成功',
                        duration:2000,
                    })
                    setTimeout(function(){
                        t.$router.push({name: 'popucenter'})
                    },1000)
                }else if(response.data.error){
                     Toast(response.data.error)
                }else{
                    Toast(response.data)
                }
                this.submitLoading = false
            }.bind(this),function (error) {
                this.submitLoading = false
                Toast({
                    message:'网络出错',
                    duration:2000,
                })
            }.bind(this))

        },
        goTips(){
            this.$router.push({name: 'tips'})
        },
    }

};
</script>

<style lang="less" scoped>
.popu-user{
    .tips{
        padding: 15px;
        color: #666;
        font-size: 14px;
    }
    .btn-wrap{
        padding:35px 13px;
    }
    .tips-div{
        padding: 15px;
        font-size: 14px;
        p{
            margin: 0;
            color: blue;
            display: inline;
            text-decoration: underline;
        }
    }
}
</style>
