<template>
  <view class="shareList">
    <view class="title">
      <view>Share</view>
    </view>
    <scroll-view scroll-x="true" class="scrollX">
      <view class="t-icon t-icon-facebook"></view>
      <view class="t-icon t-icon-twitter"></view>
      <view class="t-icon t-icon-youtube"></view>
      <view class="t-icon t-icon-weixin"></view>
      <view class="t-icon t-icon-tengxunQQ"></view>
      <view class="t-icon t-icon-bilibili"></view>
      <view class="t-icon t-icon-tiktok"></view>
    </scroll-view>
    <view class="cancel" @click="clickCancel">Cancel</view>
  </view>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['clickCancel']);
const clickCancel = () => {
  // console.log('用户点击了取消按钮');
  emit('clickCancel', false);
}
</script>

<style lang="scss" scoped>
.shareList {
  width: 100vw;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
    // padding: 20rpx;
    // background-color: red;
    // border-radius: 20rpx;

    view {
      display: flex;
      justify-content: center;
      width: 30vw;
      font-size: 40rpx;
      color: rgb(0, 0, 0);
      padding: 20rpx;
      font-weight: bolder;
      border-radius: 40rpx;
      // box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.2);
    }
  }


  .scrollX {
    margin-top: 20rpx;
    width: 100vw;
    // border: 5rpx solid #250303;
    white-space: nowrap;
    border: 2rpx solid #ffffff;
    // box-shadow: 5rpx 0rpx 10rpx 0 rgba(0, 0, 0, 0.2);


    view {
      display: inline-block;
      // padding: 20rpx;
      margin: 20rpx;
      // box-shadow: 0rpx 5rpx 1rpx 0 rgba(36, 36, 36, 0.2);
      // border-radius: 120rpx;
    }

    .t-icon {
      width: 100rpx;
      height: 100rpx;
    }

  }

  .cancel {
    width: 90vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx;
    background-color: #f8f8f8;
    box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.2);
    border-radius: 30rpx;
    margin-bottom: 10rpx;
  }

}
</style>