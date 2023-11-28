<template>
  <view class="sortByPanel">
    <view class="title"><text>sortBy</text></view>
    <view class="sortByList">
      <view class="sortByItem" @click="submitSortBy('relevancy')">
        <view class="sortByName">relevancy</view>
        <view class="explain"><text>articles more closely related to what you input come first.</text></view>
      </view>
      <view class="sortByItem" @click="submitSortBy('popularity')">
        <view class="sortByName">popularity</view>
        <view class="explain"><text>articles from popular sources and publishers come first.</text></view>
      </view>
      <view class="sortByItem" @click="submitSortBy('publishedAt')">
        <view class="sortByName">publishedAt</view>
        <view class="explain"><text> newest articles come first.</text></view>
      </view>
    </view>
    <view class="feedBack">
      <view class="reset" @click="resetSortBy">Reset</view>
      <view class="submit" @click="closeSortBy">Submit</view>
    </view>
  </view>
</template>

<script setup>
import { defineEmits } from 'vue';
import useSearchNewsStore from '../../store/searchNewsStore';
const useSearchNews = useSearchNewsStore();

// 自定义事件
const emit = defineEmits(['closeSortBy']);

// 点击submit按钮
const closeSortBy = () => {
  console.log('用户点击了submit按钮,组件将数据传送给了父组件');
  emit('closeSortBy', false);
}
// 提交排序规则
const submitSortBy = (item) => {
  console.log('用户点击了提交sortBy', item);
  useSearchNews.sortBy = item;
}
// 重置排序规则
const resetSortBy = () => {
  console.log('用户点击了重置sortBy');
  useSearchNews.sortBy = 'publishedAt';
}

</script>

<style lang="scss" scoped>
.sortByPanel {
  padding: 20rpx;
  display: flex;
  flex-direction: column;


  .title {
    display: flex;
    justify-content: center;
    // background-color: red;
    // border-bottom: 1rpx solid #e5e5e5;

    text {
      padding: 20rpx;
      font-size: 40rpx;
      font-weight: bolder;
    }
  }

  .sortByList {
    display: flex;
    flex-direction: column;
    align-items: center;

    .sortByItem {
      width: 100%;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      // background-color: yellow;
      border-radius: 20rpx;
      box-shadow: 0 0 3rpx #c9c6c6;
      margin: 10rpx 0;

      .sortByName {
        margin: 15rpx;
        font-size: 25rpx;
        color: rgb(27, 27, 187);
        font-weight: bold;
      }

      .explain {
        font-size: 20rpx;
        color: #cacacc;
      }
    }

    .sortByItem:hover {
      background-color: #eae5e5;

    }

  }

  .feedBack {
    margin-top: 20rpx;
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