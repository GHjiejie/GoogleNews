<template>
  <view class="category">
    <view class="main">
      <scroll-view scroll-x class="categoryList">
        <text v-for="(item, index) in newsCategoryList" :class="index === currentindex ? 'active' : ''" :key="index"
          @click="changeIndex(item, index)">{{
            item }}</text>
      </scroll-view>

      <view class="accurate">
        <u-icon name="list" color="#cacacc" size="28" @click="showPanel"></u-icon>
        <!-- 使用picker选择器来选择国家 -->
        <u-picker title="Country" :show="showCountryPanel" :columns="allNewsCountry" @cancel="cancelCountryPanel"
          :closeOnClickOverlay="true" @close="closeCountryPanel" @confirm="confirmCountry"></u-picker>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, watch, watchEffect, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import useNewsInfoStore from '../../store/newsInfoStore';
import useAccurateSearchStore from '../../store/accurateSearchStore';
import useGetNewsStore from '../../store/getNewsStore';

const useGetNews = useGetNewsStore();
const useAccurateSearch = useAccurateSearchStore();
const useNewsInfo = useNewsInfoStore();
const { safeAreaInsets } = uni.getSystemInfoSync();

const { selectedCategoryIndex, selectedCategoryName, selectedCountry } = useAccurateSearch;
const { allNewsCategory, filterCountry } = useNewsInfo;

const currentindex = ref(0);
const newsCategoryList = ref([]);
const showCountryPanel = ref(false);
const allNewsCountry = ref([
  ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lu", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]
]);
// const indexList = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'Z']);


const confirmCountry = (e) => {
  const selectedCountry = e.value[0];
  // console.log('我点击了按钮', e.value[0]);
  useGetNews.loadingStatus = 1;
  useAccurateSearch.selectedCountry = selectedCountry;
  showCountryPanel.value = false;
  // console.log(e);
}
//点击取消按钮
const cancelCountryPanel = () => {
  showCountryPanel.value = false;
}
//页面初始化
onLoad(() => {
  currentindex.value = selectedCategoryIndex;
  newsCategoryList.value = allNewsCategory;
})
// 切换新闻类别
const changeIndex = async (item, index) => {
  currentindex.value = index;
  // 首先要将原来的数据清空，否则不同类型的新闻会叠加在一起
  useGetNews.newsList = [];
  useGetNews.loadingStatus = 1;
  // 下面的代码会触发监听器，实现对初始化数据的获取
  useGetNews.page = 1;
  // 同步修改pinia里面的数据
  useAccurateSearch.selectedCategoryIndex = index;
  useAccurateSearch.selectedCategoryName = item;
  // 数据修改后，我们会通过监听器来监听数据的变化，然后再去请求数据,就不需要在此处请求数据了
}
// 通过字体图标打开面板
const showPanel = () => {
  console.log('我打开了面板');
  showCountryPanel.value = true;
}

// 关闭国家选择面板
const closeCountryPanel = () => {
  showCountryPanel.value = false;
}

</script>

<style lang="scss" scoped>
.category {
  box-sizing: border-box;
  width: 100vw;
  position: absolute;
  bottom: 0%;
  padding: 0rpx 20rpx;

  .main {
    // position: relative;
    display: flex;
    flex-direction: row;
    background-color: rgb(255, 255, 255);
    justify-content: space-evenly;
    padding: 20rpx 40rpx;
    align-items: center;
    border-radius: 50rpx;
    border: 5rpx solid rgb(3, 3, 3);

    .categoryList {

      flex: 1;
      display: flex;
      flex-direction: row;


      text {
        padding: 30rpx;
        color: #c9c9cb;
        font-weight: bold;
      }

      .active {
        // 设置字体样式
        font-family: 'Microsoft YaHei';
        font-weight: bolder;
        font-size: 35rpx;
        // 文字加粗
        color: #3e3e40,
          // 设置文字大小
      }
    }

    .accurate {
      // position: absolute;
      // right: 0;
      border-left: 1rpx solid #aaa2a247;
      background-color: rgb(255, 255, 255);
    }

  }

}

.countryBox {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
    border-bottom: 2px solid #423f3f47;

    text {
      font-size: 40rpx;
      font-weight: bolder;
    }
  }

  .countryList {
    .countryItem {
      width: 100vw;
      display: flex;
      // justify-content: center;
      flex-direction: column;
      // background-color: #978282;
      // box-shadow: 0 2rpx 5rpx 0 rgba(46, 43, 43, 0.555);
      border-bottom: 2rpx solid #423f3f47;
      border-radius: 30rpx;

      text {
        font-size: 40rpx;
        font-weight: bolder;
        // color: #fff;
        padding: 20rpx 40rpx;

      }

      .select {
        background-color: #b3b5ba;
      }
    }

  }

}
</style>