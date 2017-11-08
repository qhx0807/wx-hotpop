<template>
    <div class="tips">
        <h4>亲爱的代理们:</h4>
        <p>这里有一些进行美食分享的小诀窍，希望能够帮助到你。</p>
        <h5>展示产品</h5>
        <ul>
            <li>1.	要求6宫格或9宫格展示或手机拍的小视频</li>
            <li>2.	产品清晰，并描述自己的感受</li>
            <li>3.	最后一张照片或小视频最后记的放上你的专属推广二维码</li>
        </ul>
        <h5>分享链接</h5>
        <ul>
            <li>1.	当你的朋友通过你分享的购买链接或推广二维码进行消费后，你能获得他们实际消费金额的百分之10作为提成</li>
            <li>2.	当你的朋友通过你也成为了推广员，他们获得推广提成时你还能再获得百分之2的奖励</li>
            <li>3.	所有收入都能在你的推广员界面里随时查看，也可以随时提取</li>
        </ul>
        <h5>简单介绍</h5>
        <p>欢迎成为美食推广员，请仔细阅读推广小诀窍，也可以随时向后台工作人员咨询。</p>
    </div>
</template>

<script>
export default {
    name: "tips",
    data() {
        return {
            msg: "Welcome"
        };
    }
};
</script>

<style lang="less" scoped>
.tips {
    height: 100%;
    background-color: #fff;
    font-family: '微软雅黑';
    padding: 12px;
    color: #494848;
    h4{
        margin: 12px 0;
        font-size: 15px;
        font-weight: 600;
    }
    p{
        margin: 10px 0;
        font-size: 14px;
        text-indent: 16px;
    }
    h5{
        margin: 12px 0;
        font-size: 14px;
        color: #666;
    }
    ul{
        padding: 0;
        li{
            font-size: 14px;
            margin-top: 8px;
        }
    }
}

</style>
