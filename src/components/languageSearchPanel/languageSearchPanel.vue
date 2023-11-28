<template>
  <view class="languagePanel">
    <view class="title"><text>Language</text></view>
    <scroll-view class="languageList" scroll-y="true">
      <view v-for="item in allNewsLanguage" class="languageItem" hover-class="choose" @click="submitLanguage(item)">{{
        item }}</view>
    </scroll-view>
    <view class="feedBack">
      <view class="reset" @click="resetLanguage">Reset</view>
      <view class="submit" @click="closeLanguage">Submit</view>
    </view>
  </view>
</template>

<script setup>
import { defineEmits } from 'vue';
import useNewsInfoStore from '../../store/newsInfoStore';
import useSearchNewsStore from '../../store/searchNewsStore';

const useSearchNews = useSearchNewsStore();

const { allNewsLanguage } = useNewsInfoStore();

const emit = defineEmits(['closeLanguage']);

// 重置语言
const resetLanguage = () => {
  console.log('用户点击了重置语言');
  useSearchNews.language = '';
}

// 选择语言
const submitLanguage = (item) => {
  console.log('用户点击了提交语言', item);
  useSearchNews.language = item;
}
// 点击submit按钮
const closeLanguage = () => {
  console.log('用户点击了submit按钮,组件将数据传送给了父组件');
  emit('closeLanguage', false);
}
</script>

<style lang="scss" scoped>
.languagePanel {
  height: 50vh;
  // background-color: rgb(194, 175, 175);
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    // background-color: yellow;
    width: 100vw;
    padding: 20rpx;
    display: flex;
    justify-content: center;

    border-bottom: 2rpx solid #303030;

    text {
      font-size: 40rpx;
      font-weight: bolder;
    }

  }

  .languageList {
    // background-color: blue;
    width: 100vw;
    height: 35vh;

    .languageItem {
      padding: 40rpx;
      font-size: 25rpx;
      border-bottom: 1rpx solid #b9b5b590;
    }

    .languageItem:hover {
      background-color: #eae5e5;
    }
  }

  .feedBack {
    margin-top: 20rpx;
    width: 90vw;
    display: flex;

    view {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .reset {
      padding: 20rpx;
      color: white;
      width: 50%;
      background-color: #ffba01;
      border-radius: 30rpx 0 0 30rpx;
    }

    .submit {
      color: white;
      width: 50%;
      background-color: #fd720b;
      border-radius: 0 30rpx 30rpx 0;
    }
  }
}
</style>