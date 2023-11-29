<template>
  <!-- 搜索顶部 -->

  <view class="searchTopModule" :style="{ paddingTop: safeAreaInsets.top + 'px' }">
    <view class="searchTop">
      <view class="searchSettings">
        <u-icon name="list" color="#cacacc" size="28" @click="showSearchPopup"></u-icon>
      </view>
      <view class="websiteTitle">
        <view class="t-icon t-icon-google2015logo test"></view>
      </view>
      <view class="account">
        <!-- <up-image src="../../static/image/default.png" width="30" height="30" shape="circle"></up-image> -->
      </view>
    </view>
    <!-- 弹出层的内容 -->
    <view class="searchSettings">
      <u-popup :show="show" mode="top" @close="close" round="30" :safeAreaInsetTop="true">
        <!-- <systemSettings></systemSettings> -->
        <changeApikey></changeApikey>
      </u-popup>
    </view>
    <categoryList></categoryList>
  </view>
</template>

<script setup>
import { ref } from 'vue';
const { safeAreaInsets } = uni.getSystemInfoSync();
const show = ref(false);
const showSearchPopup = () => {
  show.value = true;
}
const close = () => {
  show.value = false;
}
</script>

<style lang="scss" scoped>
.searchTopModule {
  width: 100vw;
  display: flex;
  flex-direction: column;
  height: 250rpx;
  // background-color: deepskyblue;
  background: linear-gradient(to bottom, #0D0C0C, #001F3F);
  border-radius: 0rpx 0rpx 30rpx 30rpx;
  position: fixed;
  top: 0;
  z-index: 999;

  .searchTop {
    padding: 25rpx 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .websiteTitle {
      .t-icon {
        width: 250rpx;
        height: 82.2rpx;

      }
    }
  }
}
</style>