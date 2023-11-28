<template>
  <view class="searchMoudle" :style="{ paddingTop: safeAreaInsets.top + 'px', height: safeArea.height + 'px' }">
    <view class="logo">
      <view class="t-icon t-icon-google2015logo test"></view>
    </view>
    <view class="searchBox">
      <u-search placeholder="Enter keywords" v-model="keyword" actionText="" :showAction="false" height="50"
        @search="searchNews"></u-search>
    </view>
    <view class="recommend">
      <view class="info">
        <u-icon :name="iconName" color="#999" size="30rpx" top="1rpx" @click="showNews"></u-icon>
        <text>Recommend news</text>
        <u-icon name="reload" color="#999" size="30rpx" top="1rpx" @click="reloadNews"></u-icon>
      </view>
      <template v-if="showNewsStatus">
        <secondaryNewsPanel :newsList="newsList"></secondaryNewsPanel>
      </template>
    </view>
  </view>
</template>
<script  setup>
import { ref, watch } from 'vue';
import recommendNewsStore from '../../store/recommendNewsStore';
import useNewsInfoStore from '../../store/newsInfoStore';
import useSearchNewsStore from '../../store/searchNewsStore';

// import newsSource from '../../static/js/newsSource';

const useRecommendNewsStore = recommendNewsStore();
const useNewsInfo = useNewsInfoStore();
const useSearchNews = useSearchNewsStore();

const { safeAreaInsets, safeArea } = uni.getSystemInfoSync();
const keyword = ref('');
const showNewsStatus = ref(false);
const iconName = ref('arrow-downward');
const newsList = ref([]);

// 显示与隐藏推荐新闻
const showNews = () => {
  showNewsStatus.value = !showNewsStatus.value;
  if (showNewsStatus.value) {
    iconName.value = 'arrow-upward';
  } else {
    iconName.value = 'arrow-downward';
  }

}

//搜索新闻
const searchNews = async () => {
  // console.log('用户按下了回车', keyword.value);
  // useSearchNews.newsList = [];
  useSearchNews.q = keyword.value;
  // const res = await useSearchNews.getEverythingNews(keyword.value);
  // console.log(res.newsList);

  const res = await useSearchNews.verifyInput(useSearchNews.q);
  if (res === 0) {
    uni.navigateTo({
      url: '/pages/NotFound/NotFound'
    })
  } else {
    uni.navigateTo({
      url: '/pages/searchNews/searchNews'
    })
  }
  keyword.value = '';

  // if (!res) {
  //   uni.showToast({
  //     title: 'There is no news in this area!',
  //     icon: 'none'
  //   });
  // } else {
  //   uni.navigateTo({
  //     url: '/pages/searchNews/searchNews'
  //   })
  // }
}

//换一批新闻
const reloadNews = () => {
  useRecommendNewsStore.recommendCountry = (useNewsInfo.allNewsCountry)[randomIndex(54)];
  useRecommendNewsStore.recommendCategory = (useNewsInfo.allNewsCategory)[randomIndex(7)];
  // console.log(useRecommendNewsStore.recommendCountry, useRecommendNewsStore.recommendCategory);
}

// 生成随机数
const randomIndex = (total) => {
  return Math.floor(Math.random() * total);
}

// 监听国家和类别的变化
watch(
  () => [useRecommendNewsStore.recommendCountry, useRecommendNewsStore.recommendCategory],
  async () => {
    uni.showLoading({
      title: '加载中',
    });
    const res = await useRecommendNewsStore.getRecommendNews(useRecommendNewsStore.recommendCountry, useRecommendNewsStore.recommendCategory);
    if (res) {
      newsList.value = [];
      newsList.value = res;
      uni.hideLoading();
    }
  }
  , {
    immediate: true
  }
)

</script>
<style lang="scss" scoped>
.searchMoudle {
  display: flex;
  flex-direction: column;
  align-items: center;

  align-items: center;
  // background: linear-gradient(to bottom, #4b13bb, rgb(4, 181, 240));
  background: linear-gradient(to bottom, #0D0C0C, #001F3F);
  // overflow: hidden;


  .logo {
    margin-top: 200rpx;
    display: flex;
    justify-content: center;

    .t-icon {
      width: 402rpx;
      height: 132rpx;
    }
  }

  .searchBox {
    margin-top: 100rpx;
    width: 90vw;
    // background-color: red;
    display: flex;
    justify-content: center;
  }

  .recommend {
    margin-top: 20rpx;
    width: 90vw;

    display: flex;
    flex-direction: column;

    .info {
      display: flex;
      justify-content: center;
      padding: 20rpx;
      // align-items: center;
      align-items: first baseline;

      text {
        font-size: 30rpx;
        font-weight: bolder;
        color: #999;
        margin: 0 10rpx;
      }
    }
  }
}
</style>