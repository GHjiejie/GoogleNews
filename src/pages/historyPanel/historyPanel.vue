<template>
  <template v-if="dateKeys">
    <view class="history" :style="{ height: safeArea.height + 'px', paddingTop: safeAreaInsets.top + 'px' }">
      <view class="date">
        <u-sticky>
          <view class="datePanel">
            <text>{{ today }}</text>

          </view>
        </u-sticky>
        <view class="historyNewsList">
          <visitedNews :newsList="todayNewsList"></visitedNews>
        </view>
      </view>

      <template v-if="yesterdayNews">
        <view class="date">
          <u-sticky>
            <view class="datePanel">
              <text> {{ yesterday }}</text>
            </view>
          </u-sticky>
          <view class="historyNewsList">
            <visitedNews :newsList="yesterdayNewsList"></visitedNews>
          </view>
        </view>
      </template>


      <template v-if="filterDateKeys.length !== 0">
        <view class="date">
          <u-sticky>
            <view class="datePanel">
              <text>Earlier</text>
            </view>
          </u-sticky>
          <view class="historyNewsList">
            <visitedNews :newsList="earlierNewsList"></visitedNews>
          </view>
        </view>
      </template>
    </view>
  </template>
  <template v-else>
    <view class="empty">
      <text>You haven't read any news yet</text>
    </view>
  </template>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue'
import { onShow } from '@dcloudio/uni-app'
// const historyNews = ref({});
// const today = ref('');
const yesterday = ref('');
// const earlier = ref('');
const nowDate = new Date().toLocaleDateString();
const today = ref(nowDate);
// console.log(date.value);
yesterday.value = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString();
// console.log(yesterday.value);


const todayNewsList = ref([]);
const yesterdayNewsList = ref([]);
// const filterKeys = ref([]);
const earlierNewsList = ref([]);

//获取系统信息
const { safeAreaInsets, safeArea } = uni.getSystemInfoSync();

//获取本地存储的所有键名
const storageInfo = uni.getStorageInfoSync();
const keys = storageInfo.keys;


//获取昨日的新闻
const yesterdayNews = uni.getStorageSync(yesterday.value);
yesterdayNewsList.value = yesterdayNews;
// console.log(yesterdayNews);

//获取更早的新闻
const dateKeys = keys.filter(key => key.startsWith("2023"));
const filterDateKeys = dateKeys.filter(key => key !== today.value && key !== yesterday.value);

//将更早的新闻存储到earlierNewsList中
for (let i = 0; i < filterDateKeys.length; i++) {
  const storedData = uni.getStorageSync(filterDateKeys[i]);
  earlierNewsList.value.push(...storedData);
}
// console.log(earlierNewsList.value);

// 每次页面显示的时候，都会重新获取本地存储的数据(今日)
onShow(() => {
  // console.log('页面显示');
  const todayNews = uni.getStorageSync(today.value);
  todayNewsList.value = todayNews;
  // console.log(todayNews);
})
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  font-size: 30rpx;
  font-weight: bolder;
  color: #000000;
}

.history {
  width: 100vw;

  // background-color: black;
  // height: 100%;
  // height: 100vh;


  .date {
    display: flex;
    padding: 20rpx;
    flex-direction: column;
    // background-color: yellow;
    // align-items: center;
    justify-content: flex-start;
    // margin-bottom: 20rpx;

    .datePanel {
      padding: 20rpx;
      display: flex;
      border-radius: 10rpx;
      border: 1rpx solid #ada7a7;
      color: rgb(16, 16, 199);
      font-size: 25rpx;
      font-weight: bolder;
      background-color: rgb(219, 210, 210);
      box-shadow: 0 3rpx 5rpx #555555;
      margin-bottom: 10rpx;
      // position: fixed;

    }

    // .historyNewsList {
    //   // background-color: green;
    //   // padding: 20rpx;
    // }
  }

}
</style>