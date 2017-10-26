<template>
    <van-cell-group>
        <van-cell title="单元格1" is-link></van-cell>
        <van-cell title="单元格2" is-link value="内容"></van-cell>
    </van-cell-group>
</template>

<script>
export default {
    name: 'List',
    data() {
        return {
            msg: 'Welcome'
        }
    }
}
</script>

<style lang="less" scoped>
    
</style>