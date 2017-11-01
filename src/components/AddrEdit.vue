<template>
    <div class="addr-edit">
        <div class="tips">
            编辑收货地址
        </div>
        <van-cell-group>
            <van-field v-model="addrData.ReceiverName" label="收货人" :error="errorItem==1"  placeholder="名字"> </van-field>
            <van-field v-model="addrData.Mobile"  label="联系电话" :error="errorItem==2"  placeholder="手机或固定电话"></van-field>
            <van-cell title="收件地区" @click.native="onClickSelectAddr" class="van-address-edit__area ">
                <span>{{prevArr[0].name}}</span>
                <span>{{prevArr[1].name}}</span>
                <span>{{prevArr[2].name}}</span>
            </van-cell>
            <van-field v-model="addrData.StreetName" label="街道信息" :error="errorItem==3"  placeholder="街道"> </van-field>
             <van-field v-model="addrData.Address" type="textarea" :error="errorItem==4" autosize  rows="1" label="详细地址"  placeholder="如楼层、门牌号等"></van-field>
             <van-field v-model="addrData.ZipCode"  label="邮政编码"  placeholder="邮政编码(选填)"></van-field>
        </van-cell-group>
        <div class="btn-wrap">
            <van-button type="default"  @click="goBack" style="width:100%" >返回</van-button>
            <van-button type="primary" style="margin-top:12px;width:100%" :loading="submitLoading" @click="saveAddr" >保存</van-button>
        </div>
        <van-popup v-model="showSelectAddr" position="bottom">
            <van-area :area-list="areaList" @confirm="confirmAddr" @cancel="showSelectAddr=false"></van-area>
        </van-popup>
    </div>
</template>

<script>
import { postApi } from '../axios'
import { Toast } from 'vant'
import AreaList from '../assets/area.json'
export default {
    data() {
        return {
            areaList: AreaList,
            showSelectAddr:false,
            addrData:{},
            prevArr:[
                {name:'选择省'},
                {name:'选择市'},
                {name:'选择区'},
            ],
            submitLoading:false,
            errorItem:-1,
        }
    },
    created() {
        Toast.loading({
            duration: 0,
            forbidClick: true, 
        })
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            let d = {
                Type: 'GetUser',
                OpenID: localStorage.openid,
            }
            postApi(d, function(response) {
                console.log(response)
                Toast.clear()
                this.addrData = response.data
                this.prevArr = [
                    {name: response.data.ProvinceName},
                    {name: response.data.CityName},
                    {name: response.data.AreaName}
                ]
            }.bind(this), function(error) {
                Toast.clear()
                Toast("请求出错！")
            }.bind(this))
        },
        onClickSelectAddr(){
            this.showSelectAddr = true
        },
        confirmAddr(e){
            this.prevArr = e 
            this.showSelectAddr = false
        },
        saveAddr(){
            if(this.addrData.ReceiverName=='' || this.addrData.ReceiverName==null){
                this.errorItem = 1
                Toast("请输入姓名")
                return false
            }else if(this.addrData.Mobile=='' || this.addrData.Mobile==null){
                this.errorItem = 2
                Toast("请输入电话")
                return false
            }
            else if(this.addrData.StreetName=='' || this.addrData.StreetName==null){
                this.errorItem = 3
                Toast("请输入详细地址")
                return false
            }
            this.errorItem = -1
            this.submitLoading = true
            let d = {
                Type: 'EditUser',
                OpenID: localStorage.openid,
                Mobile: this.addrData.Mobile,
                ProvinceName: this.prevArr[0].name,
                CityName: this.prevArr[1].name,
                AreaName: this.prevArr[2].name,
                StreetName:this.addrData.StreetName,
                Address:this.addrData.Address,
                ZipCode:this.addrData.ZipCode,
                ReceiverName:this.addrData.ReceiverName,
                DistributorAddress:'',
            }
            postApi(d, 
                function(response) {
                    this.submitLoading = false
                    if(response.data.OK){
                        Toast("修改成功！")
                    }else if(response.data.error){
                        Toast(response.data.error)
                    }
                }.bind(this), function(error) {
                    this.submitLoading = false
                }.bind(this))
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
    .tips{
        padding: 15px;
        color: #666;
        font-size: 14px;
    }
    .btn-wrap{
        padding:30px 10px;
    }
</style>
