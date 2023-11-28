<template>
  <view class="newsBox" :style="{ marginTop: 250 + 'rpx', paddingTop: safeAreaInsets.top + 'px' }">

    <!-- 新闻主要内容 -->
    <publicNewsPanel :newsList="newsList" @share="handleShare"></publicNewsPanel>

    <!-- 分享面板 -->
    <u-popup :show="showSharePanel" @close="closeSharePanel" mode="bottom" :round="30">
      <sharePanel @clickCancel="handleClickCancel"></sharePanel>
    </u-popup>

    <!-- 回到顶部 -->
    <up-back-top :scroll-top="scrollTop" :iconStyle="backToTopIconStyle"></up-back-top>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom, onPageScroll } from '@dcloudio/uni-app';
import useAccurateSearchStore from '../../store/accurateSearchStore';
import useGetNewsStore from '../../store/getNewsStore';


const useGetNews = useGetNewsStore();
const useAccurateSearch = useAccurateSearchStore();


// 获取系统的安全距离
const { safeAreaInsets, safeArea } = uni.getSystemInfoSync();
// console.log('安全距离：', safeAreaInsets, safeArea);
const newsList = ref({});
const scrollTop = ref(0);
const showSharePanel = ref(false);


// 页面初始化
onLoad(async () => {
  newsList.value = [];
  // 下面的代码会触发监听器，实现对初始化数据的获取
  useGetNews.newsList = [];
  // 我们不需要下面的代码，因为监听器会自动监听到数据的变化，然后自动更新页面
  // 初始化页面数据
  uni.showLoading({
    title: '加载中',
  });
  if (useGetNews.loadingStatus === 2) {
    uni.showToast({
      title: '没有更多数据了',
      mask: true,
      icon: 'none', // 不显示图标
      duration: 2000 // 提示框显示的时长，单位为毫秒
    });
  } else {
    // console.log('国家：', selectedCountry, '类别：', selectedCategoryName);
    const res = await useGetNews.getTopHeadlinesByCountryAndCategory(useAccurateSearch.selectedCountry, useAccurateSearch.selectedCategoryName, useGetNews.page);
    // console.log(res.newsList);
    newsList.value = res.newsList;

  }
  uni.hideLoading();
});
//监听下拉刷新
onPullDownRefresh(async () => {
  // console.log('用户下拉页面');
  useGetNews.newsList = [];
  const res = await useGetNews.getTopHeadlinesByCountryAndCategory(useAccurateSearch.selectedCountry, useAccurateSearch.selectedCategoryName, 1);
  // console.log('输出刷新后的页面数据', res.newsList);
  if (res === false) {
    uni.stopPullDownRefresh();
  } else {
    uni.showToast({
      title: 'success',
      // mask: true,
      // icon: 'none',
      duration: 1000
    });
    newsList.value = res.newsList;
    uni.stopPullDownRefresh();
  }


})
// 监听页面滚动
onPageScroll((e) => {
  // console.log(e.scrollTop);
  scrollTop.value = e.scrollTop;
});

// 监听页面是否滑到底部
onReachBottom(async () => {
  // console.log('我划到底部了,准备请求新的数据');
  uni.showLoading({
    title: '加载中',
  });
  if (useGetNews.loadingStatus === 2) {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none', // 不显示图标
      duration: 2000 // 提示框显示的时长，单位为毫秒
    });
    return;
  } else {
    try {
      useGetNews.page = useGetNews.page + 1;
      const res = await useGetNews.getTopHeadlinesByCountryAndCategory(useAccurateSearch.selectedCountry, useAccurateSearch.selectedCategoryName, useGetNews.page);
      // console.log(res.newsList);
      newsList.value = res.newsList;
    } catch (error) {
      console.log(error);
    }

  }
  uni.hideLoading();

});

// 设置回到顶部图标的样式
const backToTopIconStyle = {
  fontSize: '32rpx',
  color: '#2979ff'
};


// 分享
const handleShare = () => {
  showSharePanel.value = true;
}
// 关闭分享面板
const closeSharePanel = () => {
  showSharePanel.value = false;
}

// 父组件子组件传递过来的数据
const handleClickCancel = (data) => {
  // console.log('父组件接收到了子组件传递过来的数据', data);
  showSharePanel.value = data;
}

// 监听索引值(新闻类型)的变化
watch(
  () => useAccurateSearch.selectedCategoryIndex,
  async (oldValue, newValue) => {
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
    useGetNews.newsList = [];
    // console.log('国家：', useAccurateSearch.selectedCountry, '类别：', useAccurateSearch.selectedCategoryName);
    uni.showLoading({
      title: '加载中',
    });
    if (useGetNews.loadingStatus === 2) {
      uni.showToast({
        title: '没有更多数据了',
        icon: 'none', // 不显示图标
        duration: 2000 // 提示框显示的时长，单位为毫秒
      });
      return;
    } else {
      const res = await useGetNews.getTopHeadlinesByCountryAndCategory(useAccurateSearch.selectedCountry, useAccurateSearch.selectedCategoryName, useGetNews.page);
      // console.log(res.newsList);
      newsList.value = res.newsList;
    }
    uni.hideLoading();
  },
);

// 监听国家的变化
watch(
  () => useAccurateSearch.selectedCountry,
  async (oldValue, newValue) => {
    // console.log('我监听到了selectedCountry的变化，我要去请求数据了');
    // console.log('首先清空原来的数据');
    useGetNews.newsList = [];
    // console.log('国家：', useAccurateSearch.selectedCountry, '类别：', useAccurateSearch.selectedCategoryName);
    uni.showLoading({
      title: '加载中',
    });
    if (useGetNews.loadingStatus === 2) {
      uni.showToast({
        title: '没有更多数据了',
        icon: 'none', // 不显示图标
        duration: 2000 // 提示框显示的时长，单位为毫秒
      });
      return;
    } else {
      const res = await useGetNews.getTopHeadlinesByCountryAndCategory(useAccurateSearch.selectedCountry, useAccurateSearch.selectedCategoryName, useGetNews.page);
      console.log(res.newsList);
      newsList.value = res.newsList;
    }
    uni.hideLoading();
  },
);

</script>

<style lang="scss" scoped>
.newsBox {
  position: relative;
  padding: 0 20rpx;
  margin-top: 0rpx;
  border-radius: 20rpx;
}
</style>