<template>
  <view class="concernedPanel" :style="{ height: safeArea.height + 'px', paddingTop: safeAreaInsets.top + 'px' }">
    <template v-if="concernedList.length === 0">
      <view class="empty">
        <text>You are not following any authors yet</text>
      </view>
    </template>
    <template v-else>


      <view class="concernedList">


        <view class="concernedItem" v-for="(item, index) in concernedList" :key="index">

          <view class="author">{{ item }}</view>
          <view class="unfollow" @click="unfollow(item)"><text>x</text></view>

        </view>


      </view>


    </template>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import useUserStore from '../../store/userStore'
const useUser = useUserStore();
const concernedList = ref([]);

//获取系统信息
const { safeAreaInsets, safeArea } = uni.getSystemInfoSync();
//页面初始化
onLoad(() => {
  concernedList.value = useUser.concernedList;
});

const unfollow = (author) => {
  uni.showModal({
    title: 'prompt',
    content: 'Are you sure to unfollow?',
    showCancel: true,
    success: ({ confirm, cancel }) => {
      if (confirm) {
        useUser.removeConcerned(author);
        concernedList.value = useUser.concernedList;
      }
    }
  });
}
</script>

<style lang="scss" scoped>
.concernedPanel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-top: 20rpx;

  .empty {
    height: 60vh;

    text {
      font-size: 30rpx;
      color: #000000;
      font-weight: bolder;
    }
  }

  .concernedList {
    width: 90vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    // background-color: red;
    border-radius: 60rpx;
    padding: 20rpx;
    box-shadow: 0 5rpx 10rpx #a5a1a1;

    .concernedItem {
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
      border-bottom: 1rpx solid #e1dddda6;

      .author {
        display: flex;
        align-items: center;
        font-size: 20rpx;
        font-weight: bold;
      }

      .unfollow {
        display: flex;
        align-items: center;
        background-color: rgb(191, 168, 168);
        box-shadow: 0 0rpx 5rpx #555555 inset;
        border-radius: 50rpx;
        padding: 5rpx 10rpx;

        text {
          font-size: 20rpx;
          color: rgb(13, 13, 221);
        }
      }
    }
  }
}
</style>