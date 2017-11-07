<template>
    <div class="popu-user">
         <div class="tips">
            推广员信息
        </div>
         <van-cell-group>
             <van-field v-model="userInfo.PopularizeTrueName" label="推广员姓名" :error="errorItem==1"  placeholder="名字"> </van-field>
             <van-field v-model="userInfo.PopularizeMoblie" label="电话号码" :error="errorItem==2"  placeholder="电话"> </van-field>
         </van-cell-group>
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
            userInfo: {},
            errorItem:0,
            submitLoading:false,
        }
    },
    created(){

    },
    activated(){
        Toast.loading()
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            let d = {
                Type:'GetUser',
                OpenID: localStorage.openid,
            }
            postApi(d, function (response) {
                    //console.log(response)
                    this.userInfo = response.data
                    Toast.clear()
                }.bind(this),function (error) {
                    Toast.clear()
                }.bind(this))
        },
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
                Address: this.userInfo.PopularizeAddress,
            }
            postApi(d, function (response) {
                //console.log(response)
                let t = this
                if(response.data.OK){
                    Toast({
                        message:'操作成功',
                        duration:2000,
                    })
                    setTimeout(function(){
                        t.$router.go(-1)
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
}
</style>
