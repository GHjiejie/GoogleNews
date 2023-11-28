<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets.top + 'px' }">
    <view class="navbarTop">
      <view class="back">
        <u-icon name="arrow-left" color="#2979ff" size="28" @click="goBack"></u-icon>
      </view>
      <view class="search">
        <u-search :show-action="true" actionText="搜索" v-model="keyword" @search="search" @custom="search"
          @clickIcon="search"></u-search>
      </view>
    </view>
    <!-- 新闻数据的筛选 -->
    <view class="filterBox" :style="{ top: windowTop + 'px' }">
      <view class="filterItem">
        <view class="language" @click="openLanguagePanel"><text>language</text></view>
        <view class="sortBy" @click="openSortByPanel"><text>sortBy</text></view>
        <view class="time" @click="openTimePanel"><text>Time</text></view>
      </view>
    </view>
  </view>
  <!-- 显示查询错误页面 -->
  <template v-if="showNotFound">
    <notFound></notFound>
  </template>
  <!-- 新闻主要内容 -->
  <template v-else>
    <view class="newsBox" :style="{ marginTop: 235 + 'rpx' }">

      <!-- 新闻主要内容 -->
      <publicNewsPanel :newsList="newsList" @share="handleShare"></publicNewsPanel>

      <!-- 分享面板 -->
      <u-popup :show="showSharePanel" @close="closeSharePanel" mode="bottom" :round="30">
        <sharePanel @clickCancel="handleClickCancelShare"></sharePanel>
      </u-popup>

      <!-- 语言选择 -->
      <u-popup :show="showLanguagePanel" @close="closeLanguagePanel" mode="bottom" :round="30">
        <languageSearchPanel @closeLanguage="handleLCloseLanguage"></languageSearchPanel>
      </u-popup>

      <!-- 排序 -->
      <u-popup :show="showSortByPanel" @close="closeSortByPanel" mode="top" :round="30">
        <sortByPanel @closeSortBy="handleCloseSortBy"></sortByPanel>
      </u-popup>

      <!-- 时间 -->
      <uni-calendar ref="calendarRef" :insert="false" @confirm="confirmTime" :range="true" />

      <!-- 回到顶部 -->
      <up-back-top :scroll-top="scrollTop" :iconStyle="backToTopIconStyle" z-index="10086"></up-back-top>
    </view>
  </template>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom, onPageScroll, onShow } from '@dcloudio/uni-app';
import useSearchNewsStore from '../../store/searchNewsStore';
const useSearchNews = useSearchNewsStore();
// 获取系统的安全距离
const { safeAreaInsets, safeArea, windowTop } = uni.getSystemInfoSync();

const newsList = ref({});
const scrollTop = ref(0);
const showSharePanel = ref(false);
const showLanguagePanel = ref(false);
const showSortByPanel = ref(false);
const calendarRef = ref(null);
const keyword = ref('');
// const showNotFound = ref(false);

// 点击顶部的搜索框
const search = async () => {
  // console.log('用户按下了回车', keyword.value);
  const res = await useSearchNews.verifyInput(keyword.value);
  if (res === 0) {
    // console.log('输入的查询参数无效');
    uni.navigateTo({
      url: '/pages/NotFound/NotFound'
    });

    // showNotFound.value = true;
  } else {
    // console.log('输入的查询参数有效，接下来开始请求数据');
    // showNotFound.value = false;
    useSearchNews.q = keyword.value;
    updateRequestURL();
  }

  // updateRequestURL();
  keyword.value = '';
}
//返回上一页
const goBack = () => {
  uni.switchTab({
    url: '/pages/search/search'
  });


}
//更新请求路径
const updateRequestURL = () => {
  // console.log('在更新请求路径前查询用户的请求参数:', useSearchNews.q);
  useSearchNews.buildFinalRequest(useSearchNews.baseURL, useSearchNews.apiKey, useSearchNews.q, useSearchNews.language, useSearchNews.sortBy, useSearchNews.from, useSearchNews.to);
}
// 打开语言选择面板
const openLanguagePanel = () => {
  showLanguagePanel.value = true;
}
// 关闭语言选择面板
const closeLanguagePanel = () => {
  showLanguagePanel.value = false;
}

//处理子组件传递给父组件的数据(关闭语言选择面板)
const handleLCloseLanguage = (data) => {
  console.log('父组件接收到了子组件传递过来的数据', data);
  showLanguagePanel.value = data;
  updateRequestURL();
}

// 打开排序面板
const openSortByPanel = () => {
  showSortByPanel.value = true;
}
// 关闭排序面板
const closeSortByPanel = () => {
  showSortByPanel.value = false;
  updateRequestURL();

}
// 处理子组件传递给父组件的数据(关闭排序面板)
const handleCloseSortBy = (data) => {
  console.log('父组件接收到了子组件传递过来的数据', data);
  showSortByPanel.value = data;
  updateRequestURL();
}

//确认时间
const confirmTime = (e) => {
  console.log(e);
  if (e.range.data.length === 1) {
    useSearchNews.from = e.range.data[0];
    useSearchNews.to = e.range.data[0];
  } else {
    useSearchNews.from = e.range.data[0];
    useSearchNews.to = e.range.data[e.range.data.length - 1];
  }
  updateRequestURL();

}
// 打开时间面板
const openTimePanel = () => {
  // console.log('我打开了时间面板');
  calendarRef.value.open();
}

// 页面初始化
onLoad(async () => {
  // 由于进入该组件直接证明用户输入的查询参数有效，所以直接请求数据
  updateRequestURL();
})

//监听下拉刷新
onPullDownRefresh(async () => {
  // console.log('用户下拉页面');
  useSearchNews.newsList = [];
  const res = await useSearchNews.getEverythingNews(useSearchNews.keyword);
  // console.log('输出刷新后的页面数据', res.newsList);
  newsList.value = res.newsList;
  uni.stopPullDownRefresh();
})
// 监听页面滚动
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});

// 监听页面是否滑到底部
onReachBottom(async () => {
  // console.log('我划到底部了,准备请求新的数据');

  if (useSearchNews.loadingStatus === 2) {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none', // 不显示图标
      duration: 2000 // 提示框显示的时长，单位为毫秒
    });
    return;
  } else {
    uni.showLoading({
      title: '加载中',
    });
    useSearchNews.page = useSearchNews.page + 1;
    const res = await useSearchNews.getMoreNews();
    console.log(res.newsList);
    newsList.value = [];
    newsList.value = res.newsList;
    uni.hideLoading();
  }
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

// 父组件子组件传递过来的数据(点击取消分享按钮)
const handleClickCancelShare = (data) => {
  console.log('父组件接收到了子组件传递过来的数据', data);
  showSharePanel.value = data;
}

//监听请求路径的变化
watch(
  () => useSearchNews.finalRequestURL,
  async () => {
    // console.log('旧的请求路径为：', oldValue);
    // console.log('新的请求路径为：', newValue);
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
    useSearchNews.page = 1;
    // useSearchNews.newsList = [];
    uni.showLoading({
      title: '加载中',
    });
    const res = await useSearchNews.getFilterNews(useSearchNews.finalRequestURL);
    if (res.status === 0) {
      uni.showToast({
        title: 'There is no news in this area!',
        icon: 'none'
      });
      // console.log('当前搜索的新闻为空');
      return;
    } else {
      // 首先重置页面数据
      newsList.value = [];
      newsList.value = res.newsList;
    }
    uni.hideLoading();

  }
);

</script>

<style lang="scss" scoped>
.navbar {
  width: 100vw;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 999;
  background: linear-gradient(to bottom, #0D0C0C, #001F3F);

  border-radius: 0 0 40rpx 40rpx;
  box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.2);
  height: 235rpx;

  .navbarTop {
    display: flex;

    .back {
      display: flex;
      align-items: center;
      padding-right: 10rpx;
    }

    .search {
      flex: 1;
    }
  }

  .filterBox {

    // box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.2);
    // background-color: #e2dfdf;
    border-radius: 20rpx;

    .filterItem {
      box-sizing: border-box;
      padding: 20rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;


      view {
        padding: 10rpx 30rpx;
        border-radius: 30rpx;
        box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.2);
        // background: red;

        text {
          font-size: 25rpx;
          font-weight: bolder;
          color: white;
        }

      }
    }

  }
}

.newsBox {
  padding: 0 20rpx;
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: linear-gradient(to bottom, #4b13bb, rgb(4, 181, 240));
  background: linear-gradient(to bottom, #0D0C0C, #001F3F);





}
</style>