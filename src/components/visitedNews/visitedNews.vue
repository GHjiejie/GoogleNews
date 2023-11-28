<template>
  <view class="visitsToday">
    <view class="todayList">

      <view class="todayItem" v-for="(item, index) in newsList">
        <!-- <view class="time">{{ item.visitTime }}</view> -->
        <view class="mainInfo">
          <view class="title" @click="goDetail(date, item)">{{ item.title }}</view>
          <view class="more"><u-icon name="more-dot-fill" color="#999" size="18" @click="handleMore"></u-icon></view>
        </view>
        <view class="time"><text>Browse Time : {{ item.specificTime }}</text></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, ref } from 'vue'
// import { onShow } from '@dcloudio/uni-app';
import useDetailNewsStore from '../../store/currentNewsDetailStore'
import usebrowsingHistoryStore from '../../store/browsingHistoryStore'


const useDetailNews = useDetailNewsStore();
const usebrowsingHistory = usebrowsingHistoryStore();

const nowDate = new Date().toLocaleDateString();
const date = ref(nowDate);



// 接受父组件传递的数据
const props = defineProps(
  {
    newsList: {
      type: Array,
      default: () => []
    }
  }
);

// 点击更多操作按钮
const handleMore = () => {
  console.log('点击了更多');
}

//去详情页
const goDetail = (date, item) => {
  // console.log('输出当前的新闻数据', item);
  // console.log('当天时间', date);
  const now = new Date();
  const visitTime = `${now.getHours()}:${now.getMinutes()}`;
  const specificTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${visitTime}`;
  // console.log(visitTime);
  // console.log(specificTime);

  const newItem = {
    ...item,
    visitTime,
    specificTime
  }
  // console.log('newItem', newItem);
  // // 将数据存储到状态管理中
  useDetailNews.currentNewsDetail = newItem;
  // //将数据存储到浏览历史中
  usebrowsingHistory.addHistory(date, newItem);
  // // 下面实现跳转到新闻详情页
  uni.navigateTo({
    url: `/pages/newsDetail/newsDetail`,
  });
};
</script>

<style lang="scss" scoped>
.visitsToday {
  // background-color: rgb(237, 232, 232);
  border-radius: 20rpx;
  box-shadow: 0 5rpx 10rpx #555555;
  padding: 0 20rpx;
  // background-color: black;

  .todayList {
    display: flex;
    flex-direction: column;

    .todayItem {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      justify-content: flex-start;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 2rpx solid #e5e5e5;

      .mainInfo {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10rpx;

        .title {
          width: 100%;
          font-weight: bold;
          font-size: 20rpx;
          line-height: 2;
          color: rgb(0, 0, 0);
        }
      }

      .time {
        width: 100%;
        display: flex;
        // background-color: red;
        justify-content: flex-end;

        text {
          font-size: 18rpx;
          color: #bfa2a2;
        }
      }


    }
  }

}
</style>