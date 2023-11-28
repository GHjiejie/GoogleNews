<template>
  <view class="newsDetail">
    <view>
      <u-notice-bar :text="toast" mode="closable" speed="150"></u-notice-bar>
    </view>
    <!-- 新闻标题 -->
    <view class="newsTitle"><a :href="currentNews.url">{{ currentNews.title }}</a></view>
    <!-- 新闻作者与发布时间 -->
    <view class="newsInfo">

      <template v-if="currentNews.author">
        <view class="authorInfo">

          <view class="newsSource"><text> {{ currentNews.author }}</text></view>
          <view class="follow">

            <template v-if="followStatus">
              <view class="followedBtn" @click="followed(currentNews.author)"><text>√ followed</text></view>
            </template>

            <template v-else>
              <view class="followBtn" @click="follow(currentNews.author)"><text>+ follow</text></view>
            </template>
          </view>

          <!-- <view class="publishAt">
          <text>{{ currentNews.publishedAt }}</text>
        </view> -->
        </view>

      </template>

      <view class="timeInfo"><text>{{ currentNews.publishedAt }}</text></view>
    </view>
    <!-- 新闻主要内容 -->
    <view class="newsContent">
      <text class="innerView">
        {{ currentNews.description }}
      </text>
      <view class="picture">
        <up-image :src="currentNews.urlToImage" width="100%" height="350rpx" shape="square" radius="10"
          @click="previewImg(currentNews.urlToImage)"></up-image>
      </view>
    </view>
    <!-- 新闻底部注意事项 -->
    <view class="newsFooter">
      <template v-if="currentNews.source.id">
        <view class="newsSource"><text>sourceId : {{ currentNews.source.id }}</text></view>
      </template>
      <view class="newsEditor"><text>Editor : Jie</text></view>
      <view class="contact"><text>E-mail : 3426571530@qq.com</text></view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import useDetailNewsStore from '../../store/currentNewsDetailStore'
import useUserStore from '../../store/userStore'
const useDetailNews = useDetailNewsStore();
const useUser = useUserStore();

const currentNews = ref({});
const toast = ref('接口尚未提供新闻的详细内容，请读者点击标题自行前往');
const followStatus = ref(false);



// 点击已经关注的按钮(取消关注)
const followed = (author) => {
  uni.showModal({
    title: 'prompt',
    content: 'Are you sure to unfollow?',
    showCancel: true,
    success: ({ confirm, cancel }) => {
      if (confirm) {
        useUser.removeConcerned(author);
        followStatus.value = false;
      }
    }
  });
}

// 点击关注
const follow = (author) => {
  useUser.addConcerned(author);
  followStatus.value = true;
  // console.log(author);

}

//页面初始化
onLoad(() => {
  currentNews.value = useDetailNews.currentNewsDetail;

  //检查是否已经关注了该作者
  isFollowed();
});

// 函数检查是否已经关注了该作者
const isFollowed = () => {
  const concernedList = useUser.concernedList;
  const author = currentNews.value.author;
  // 使用es6的includes方法来判断数组中是否包含某个元素
  if (concernedList.includes(author)) {
    followStatus.value = true;
  } else {
    followStatus.value = false;
  }
}

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
</script>

<style lang="scss" scoped>
.newsDetail {
  box-sizing: border-box;
  padding: 20rpx;
  width: 100vw;
  // background-color: red;
  display: flex;
  flex-direction: column;


  .newsTitle {
    display: flex;
    // justify-content: center;
    // background-color: yellow;
    padding: 20rpx 0;
    hyphens: auto;

    a {
      // 消除下划线
      text-decoration: none;
      color: #000000;
      font-size: 40rpx;
      font-weight: bolder;
      word-break: break-all;
    }
  }

  .newsInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f6f6f6;
    padding: 20rpx;
    border-radius: 20rpx;
    box-shadow: 2rpx 1rpx 4rpx 0 rgba(0, 0, 0, 0.25);
    // padding-bottom: 10rpx;

    .authorInfo {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rpx;
    }

    .follow {
      .followedBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #c0c0c0;
        padding: 10rpx;
        border-radius: 10rpx;

        text {
          font-size: 18rpx;
          color: #000000
        }
      }

      .followBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: blue;
        padding: 10rpx;
        border-radius: 10rpx;

        text {
          font-size: 18rpx;
          color: #e0d4d4
        }
      }
    }

    text {
      font-size: 20rpx;
      color: #c0c0c0
    }

  }

  .timeInfo {
    // margin-top: 15rpx;
    // padding-top: 15rpx;
    display: flex;
    justify-content: flex-end;

    text {
      font-size: 20rpx;
      color: #c0c0c0
    }
  }


  .newsContent {
    // background-color: pink;
    padding: 20rpx 0;
    text-indent: 2em;

    .innerView {

      font-size: 30rpx;
      font-weight: 550;

      hyphens: auto;
      word-break: break-all;
    }

    .picture {
      margin-top: 20rpx;
    }
  }

  .newsFooter {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20rpx;

    .newsSource {
      // background-color: red;

      text {
        font-size: 20rpx;
        font-weight: bolder;
        color: #000000
      }
    }

    .newsEditor {
      display: flex;
      justify-content: flex-end;

      // background-color: yellow;
      text {
        font-size: 20rpx;
        font-weight: bolder;
        color: #000000
      }
    }

    .contact {
      display: flex;
      justify-content: flex-end;

      text {
        font-size: 20rpx;
        font-weight: bolder;
        color: #000000
      }
    }


  }
}
</style>