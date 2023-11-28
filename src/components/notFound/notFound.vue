<template>
  <view class="notFound">
    <text>404 Not Found</text>
  </view>
</template>

<script setup>
const props = defineProps();
</script>

<style lang="scss" scoped>
.notFound {

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 500rpx;
  width: 100vw;
  // background-color: red;


  text {
    font-size: 50rpx;
    font-weight: bolder;
    color: #000000;
    // margin: 0 10rpx;
  }
}
</style>