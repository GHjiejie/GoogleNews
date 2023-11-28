<template>
  <scroll-view scroll-y class="recommendNews">


    <!-- <view class="recommendNews"> -->
    <view class="newsBox" v-for="(item, index) in newsList" @click="goDetail(item)">
      <view class="newsLeft">
        <view class="newsTitle">{{ item.title }}</view>
        <view class="newsInfo">
          <view v-if="item.source.id">
            <view class="newsSource">{{ item.source.id }}</view>
          </view>
          <view class="publishedAt">{{ item.publishedAt }}</view>
        </view>
      </view>
      <view v-if="item.urlToImage">
        <view class="newsRight">
          <view class="picture">
            <up-image :src="item.urlToImage" width="180rpx" height="180rpx" shape="square" radius="10"></up-image>
          </view>
        </view>
      </view>
      <!-- </view> -->
    </view>
  </scroll-view>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

import useDetailNewsStore from '../../store/currentNewsDetailStore'
import usebrowsingHistoryStore from '../../store/browsingHistoryStore'

const useDetailNews = useDetailNewsStore();
const usebrowsingHistory = usebrowsingHistoryStore();

const props = defineProps(
  {
    newsList: {
      type: Array,
      default: () => []
    }
  }
);

//点击新闻跳转到新闻详情页
const goDetail = async (item) => {
  // 将数据存储到状态管理中
  useDetailNews.currentNewsDetail = item;
  //将数据存储到浏览历史中
  usebrowsingHistory.addHistory(item);
  // 下面实现跳转到新闻详情页
  uni.navigateTo({
    url: `/pages/newsDetail/newsDetail`,
  });
}
</script>

<style lang="scss" scoped>
.recommendNews {
  display: flex;
  flex-direction: column;
  height: 50vh;

  .newsBox {
    display: flex;
    margin-bottom: 20rpx;
    border: 3rpx solid rgba(150, 149, 149, 0.644);
    // box-shadow: 0rpx 5rpx 5rpx #706d6d;
    border-radius: 40rpx;
    padding: 20rpx;
    // height: 180rpx;

    .newsLeft {
      // width: 65vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .newsTitle {
        font-size: 20rpx;
        font-weight: bold;
        color: rgb(174, 150, 150);
      }

      .newsInfo {
        display: flex;
        align-items: center;

        .newsSource {
          font-size: 20rpx;
          color: #999;
          margin-right: 20rpx;
        }

        .publishedAt {
          font-size: 17rpx;
          color: #999;
        }
      }
    }

    .newsRight {
      width: 35vw;
      display: flex;
      justify-content: center;
    }

  }
}
</style>