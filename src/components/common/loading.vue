<template>
    <div class="auth">
        <div class="loading-div"></div>
        <p class="loading-text">玩命加载中...</p>
    </div>
</template>

<script>
export default {
    name: "loading",
    data() {
        return {
            msg: "Welcome"
        };
    }
};
</script>

<style lang="less" scoped>
.auth {
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .loading-text {
        font-size: 13px;
    }
    .loading-div {
        width: 30px;
        height: 30px;
        background-color: #424242;
        -webkit-animation: sk-rotatePlane 1.2s infinite ease-in-out;
        animation: sk-rotatePlane 1.2s infinite ease-in-out;
    }
}


@-webkit-keyframes sk-rotatePlane {
    0% {
        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
}

@keyframes sk-rotatePlane {
    0% {
        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
}
</style>
