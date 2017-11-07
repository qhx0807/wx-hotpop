<template>
    <div class="sub-user-order">
        
    </div>
</template>

<script>
import { postApi } from '../../axios'
import { Toast } from 'vant'
export default {
    name: "subuserorder",
    data() {
        return {
            userInfo: {},
        }
    },
    created(){

    },
    activated(){
        Toast.loading()
    },
    methods:{
        
    }

};
</script>

<style lang="less" scoped>
.sub-user-order{

}
</style>
