<template>
  <view class="moreSettings">
    <view class="moreSettingsList">

      <!-- 用户手机账号绑定   -->
      <view class="title"><text>Account binding</text></view>

      <view class="settingsItem">
        <text>phone</text>
        <u-icon name="arrow-right" color="#999" size="30rpx"></u-icon>
      </view>

      <!-- app外观设置 -->
      <view class="title"><text>Appearance settings</text></view>

      <view class="settingsItem">
        <text>Theme</text>
        <u-icon name="arrow-right" color="#999" size="30rpx"></u-icon>
      </view>

      <view class="settingsItem">
        <text>Font size adjustment</text>
        <u-icon name="arrow-right" color="#999" size="30rpx"></u-icon>
      </view>

      <view class="settingsItem">
        <view class="textMode">text mode</view>
        <u-switch v-model="textSwitch" size="20"></u-switch>
      </view>


      <!-- 其他设置 -->
      <view class="title"><text>Other settings</text></view>

      <view class="settingsItem">
        <text>feedBack</text>
        <u-icon name="arrow-right" color="#999" size="30rpx"></u-icon>
      </view>

      <view class="settingsItem">
        <view class="clearHistory" @click="clearHistory">Clear browsing history</view>
      </view>

      <view class="settingsItem">
        <text @click="clearCache">clear cache</text>
      </view>

      <!-- 关于账号 -->
      <view class="title"><text>About account</text></view>

      <view class="settingsItem">
        <text>Cancel account</text>

      </view>
      <view class="settingsItem">
        <text>Sign out</text>

      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
const textSwitch = ref(false);

// const getBrowsingHistory = () => {
//   //获取本地存储的所有键名
//   const storageInfo = uni.getStorageInfoSync();
//   const keys = storageInfo.keys;
//   const dateKeys = keys.filter(key => key.startsWith("2023"));
//   // console.log(dateKeys);
//   dateKeys.forEach(key => {
//     uni.removeStorageSync(key);
//   });
// }

//清除缓存
const clearCache = () => {
  uni.showModal({
    title: 'Clear cache',
    content: 'Are you sure you want to clear the cache?',
    success: (res) => {
      if (res.confirm) {
        uni.clearStorage();
        uni.showToast({
          title: 'Clear browsing history successfully',
          icon: 'none',
          duration: 1000
        })
      } else if (res.cancel) {
        // console.log('用户点击取消');
      }
    }
  });
}

// 清除历史记录
const clearHistory = () => {
  uni.showModal({
    title: 'Clear browsing history',
    content: 'This function has data storage issues on the app side. We will replace this function with clearing the cache. Please operate with caution!',
    success: (res) => {
      if (res.confirm) {
        // getBrowsingHistory();
        uni.clearStorage();
        uni.showToast({
          title: 'Clear browsing history successfully',
          icon: 'none',
          duration: 1000
        })
      } else if (res.cancel) {
        // console.log('用户点击取消');
      }
    }
  });
}
</script>


<style lang="scss" scoped>
.moreSettings {
  display: flex;
  // width: 100vw;
  height: 100vh;
  justify-content: center;
  // background-color: red;
  background-color: #f6f6f6;

  .moreSettingsList {
    width: 90vw;
    display: flex;
    flex-direction: column;
    // background-color: red;
    background-color: #f6f6f6;
    border-radius: 30rpx;

    .title {
      padding: 20rpx;

      text {
        font-size: 30rpx;
        font-weight: bolder;
        color: #999;
        margin: 0 10rpx;
      }
    }

    .settingsItem {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      box-shadow: 0 2rpx 2rpx #555555;
      // border-radius: 50rpx;
      padding: 20rpx;

      text {
        font-size: 25rpx;
        font-weight: bolder;
        color: #000000;
      }

      .clearHistory {

        font-size: 25rpx;
        font-weight: bolder;
        color: #000000;
      }


      .textMode {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25rpx;
        font-weight: bolder;
        color: #000000;
      }
    }

    .settingsItem:active {
      background-color: #f5f5f5;
    }
  }

}
</style>