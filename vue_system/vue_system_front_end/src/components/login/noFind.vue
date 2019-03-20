<template>
    <div class='onfind_box'>
        页面不存在
        <!-- <img src="../../assets.404.png" alt=""> -->
    </div>
</template>

<script>
    export default {
        // mounted() {
        //     isHeight()
        // },
        // methods: {
        //     isHeight() {
        //         let height = document.documentElement.clientHeight;
		// 		let ele = document.getElementsByClassName('onfind_box')[0];
		// 		ele.style.height = height + 'px';
        //     }
        // }
    }
</script>

<style scoped lang='less'>
    .nofind_box {
        width: 100%;
        background: #ededf0;
        img {
            position: fixed;
            top:0;
            bottom:0;
            right:0;
            left:0;
            margin:auto;
            width: 400px;
            height: 300px;
        }
    }
</style>