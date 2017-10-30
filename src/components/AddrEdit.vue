<template>
    <div class="addr-edit">
        <van-cell-group>
            <van-field v-model="addrData.name" label="收货人"  placeholder="名字"> </van-field>
            <van-field v-model="addrData.num"  label="联系电话"  placeholder="手机或固定电话"></van-field>
            <van-cell title="收件地区" @click.native="onClickSelectAddr" >重庆市 城口县</van-cell>
             <van-field v-model="addrData.addr"  label="详细地址"  placeholder="如街道、楼层、门牌号等"></van-field>
             <van-field v-model="addrData.zip"  label="邮政编码"  placeholder="邮政编码(选填)"></van-field>
        </van-cell-group>
        <div class="btn-wrap">
            <van-button type="primary" style="width:100%" >保存</van-button>
        </div>
        <van-popup v-model="showSelectAddr" position="bottom">
            <van-area :area-list="areaList" @confirm="confirmAddr"></van-area>
        </van-popup>
    </div>
</template>

<script>
import { postApi } from '../axios'
import { Toast } from 'vant'
import AreaList from '../assets/area.json';
export default {
    data() {
        return {
            areaList: AreaList,
            showSelectAddr:false,
            addrData:{

            },
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            let d = {
                Type: 'GetUser',
                OpenID: localStorage.openid,
            }
            postApi(d, function(response) {
                console.log(response)
                this.list.push({
                    id: 1,
                    name: response.data.ReceiverName,
                    tel: response.data.Mobile,
                    address: response.data.ProvinceName + response.data.Address + response.data.StreetName + ' ' + response.data.ZipCode,
                })
            }.bind(this), function(error) {

            }.bind(this))
        },
        onClickSelectAddr(){
            this.showSelectAddr = true
        },
        confirmAddr(e){
            console.log(e)
        }
    }
}
</script>

<style lang="less" scoped>
    .btn-wrap{
        padding:30px 10px;
    }
</style>
