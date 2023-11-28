<template>
  <view class="main" v-for="(item, index) in newsList" :key="index">
    <!-- 新闻头部 -->
    <template v-if="item.author">
      <view class="top">
        <view class="headSculpture">
          <!-- <up-image src="../../static/image/default.png" width="30" height="30" shape="circle"></up-image> -->
          <view v-if="item.author.length >= 50">
            <view class="author" :style="{ fontSize: 15 + 'rpx' }">{{ item.author }}</view>
          </view>
          <view v-else class="author">{{ item.author }}</view>
        </view>
        <!-- <view class="follow">
          <up-button text="Follow" shape="circle" type="primary" size="small" :plain="true" :hoverStayTime="50"
            @click="follow(item.author)">
          </up-button>
        </view> -->
      </view>
    </template>
    <!-- 新闻主要内容 -->
    <view class="content">
      <view class="title" @click="goDetail(date, item)"><text>{{ item.title }}</text></view>
      <view v-if="item.urlToImage">
        <view class="picture">
          <up-image :src="item.urlToImage" width="100%" height="350rpx" shape="square" radius="10"
            @click="previewImg(item.urlToImage)"></up-image>
        </view>
      </view>
    </view>
    <!-- 新闻底部 -->
    <view class="footer">
      <view v-if="item.hits">
        <view class="footLeft">
          <view><u-icon name="thumb-up" color="#c9c9cb" size="40rpx"></u-icon><text>666</text></view>
          <view><u-icon name="chat" color="#c9c9cb" size="40rpx"></u-icon><text>666</text></view>
          <view><u-icon name="share-square" color="#c9c9cb" size="40rpx"></u-icon><text>666</text></view>
        </view>
      </view>
      <view v-else class="footLeft">
        <view class="publishedTime">{{ item.publishedAt
        }}</view>
      </view>
      <view class="footRight">
        <u-icon name="more-dot-fill" color="#c9c9cb" size="40rpx" @click="share"></u-icon>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import useDetailNewsStore from '../../store/currentNewsDetailStore'
import usebrowsingHistoryStore from '../../store/browsingHistoryStore'
import useUserStore from '../../store/userStore'

const useDetailNews = useDetailNewsStore();
const usebrowsingHistory = usebrowsingHistoryStore();
const useUser = useUserStore();

const nowDate = new Date().toLocaleDateString();
const date = ref(nowDate);
// console.log(date.value);



// 接受父组件传递的数据
const props = defineProps(
  {
    newsList: {
      type: Array,
      default: () => []
    }
  }
);

// 向父组件发送数据
const emits = defineEmits(['share']);

//去详情页
const goDetail = (date, item) => {
  // console.log('当天时间', date);
  const now = new Date();
  const visitTime = `${now.getHours()}:${now.getMinutes()}`;
  const specificTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${visitTime}`;
  console.log(visitTime);
  console.log(specificTime);

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

//预览图片
const previewImg = (imgUrl) => {
  uni.previewImage({
    // current: imgUrl, // 当前显示图片的http链接
    urls: [imgUrl], // 需要预览的图片http链接列表
    longPressActions: {
      itemList: ['发送给朋友', '保存图片', '收藏'],
      success: function (data) {
        console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');

        if (data.tapIndex === 0 || data.tapIndex === 2) {
          uni.showToast({
            title: '接口未授权',
            icon: 'none',
          })
        } else {
          // 将图片存储到手机相册里面
          uni.saveImageToPhotosAlbum({
            filePath: imgUrl,
            success: function () {
              uni.showToast({
                title: '保存成功',
                icon: 'success'
              })
            },
            fail: function (err) {
              console.log(err.errMsg);
            }
          });
        }
      },
      fail: function (err) {
        console.log(err.errMsg);
      }
    }
  });

}

// 关注
// const follow = (author) => {
//   useUser.addConcerned(author);
//   uni.showToast({
//     icon: 'success'
//   })
// };
//分享
const share = () => {
  emits('share');
};
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  background-color: rgb(255, 255, 255);
  // background: linear-gradient(to bottom, #0D0C0C, #001F3F);
  border-radius: 30rpx;
  margin: 20rpx 0;
  box-shadow: 0rpx 5rpx 15rpx 0 rgba(37, 37, 37, 0.764);
  z-index: 5;


  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    // background-color: rgb(208, 43, 71);
    height: 100rpx;

    .headSculpture {
      display: flex;
      align-items: center;
      // background-color: #fff;

      .author {
        font-style: oblique;
        font-size: 20rpx;
        font-weight: bold;
        // padding-left: 10rpx;
        color: rgb(65, 27, 179);
      }

    }




  }

  .content {

    .title {
      padding: 15rpx 30rpx;
      // background-color: yellow;

      text {
        font-weight: bold;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        /* 这里是超出几行省略 */
        overflow: hidden;
      }
    }

    .picture {
      margin: 15rpx 0;
      padding: 0 30rpx;

    }
  }

  .footer {
    padding: 0 30rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    // background-color: rgb(208, 43, 71);
    height: 100rpx;

    .footLeft {
      height: 100%;
      width: 70%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // background-color: yellow;

      view {
        display: flex;
        flex-direction: row;
        align-items: center;

        // padding-left: 20rpx;
        text {
          padding-left: 5rpx;
          color: #c9c9cb;
          font-size: 30rpx;
        }
      }

      .publishedTime {
        color: #c9c9cb;
        font-size: 30rpx;
        font-size: 20rpx;
      }

    }

  }
}
</style>