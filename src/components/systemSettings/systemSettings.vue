<template>
  <view class="settings">
    <view class="top">
      <view class="topContent">
        <view class="t-icon t-icon-guge" /><text>搜索设置</text>
      </view>
    </view>
    <view class="content">
      <view class="searchRecords" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont" color=""
          size="24" class="icon-lishi" /><text>搜索记录</text></view>
      <view class="myFollow" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont" color=""
          size="24" class="icon-guanzhu" /><text>我的关注</text></view>

      <view class="DarkTheme" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont" color=""
          size="24" class="icon-yueliang" /><text>深色主题</text>
      </view>
      <view class="moreSettings" hover-class="selected" hover-stay-time="50"><text>更多设置</text><uni-icons
          custom-prefix="iconfont" color="" size="24" class="icon-jiantou_liebiaoxiangyou" /></view>
    </view>
    <view class="footer">
      <view class="laguage" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont" color=""
          size="24" class="icon-yuyan" /><text>语言</text>
      </view>
      <view class="area" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont" color=""
          size="24" class="icon-tianjiaquyu" /><text>区域</text>
      </view>
      <view class="saved" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont" color=""
          size="24" class="icon-baocun" /><text>已保存</text>
      </view>
      <view clasa="feedBack" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont" color=""
          size="24" class="icon-fankui" /><text>反馈</text>
      </view>
      <view class="advancedSearch" hover-class="selected" hover-stay-time="50"><uni-icons custom-prefix="iconfont"
          color="" size="24" class="icon-gaojisousuo" /><text>高级搜索</text></view>
    </view>
    <view class="websiteStatement">
      <text>帮助·隐私保护·条款</text>
    </view>
  </view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.settings {
  // position: relative;
  // 这里不需要为他添加position: relative;，因为他是在弹出层中的，弹出层已经设置了position: relative;
  background-color: #ffffff8c;
  // width: 80%;
  // height: 100vh;
  width: 60vw;
  padding: 0rpx 40rpx;

  .top {
    // background-color: red;
    // width: 32vw;
    height: 100rpx;
    border-bottom: 2rpx solid #dadce0;
    padding: 10rpx 0;

    .topContent {
      display: flex;
      align-items: center;
      justify-content: center;

      .t-icon {
        width: 60rpx;
        height: 60rpx;
      }

      text {
        font-size: 40rpx;
        font-weight: bold;
        line-height: 100rpx;
        padding-left: 20rpx;
      }
    }


  }

  .content {
    display: flex;
    position: relative;
    flex-direction: column;
    // background-color: pink;
    border-bottom: 2rpx solid #dadce0;

    view {
      display: flex;
      align-items: center;
      // justify-content: center;
      padding: 30rpx 0;
      // background-color: red;

      text {
        font-size: 24rpx;
        padding-left: 20rpx;

      }

    }

  }

  .footer {
    display: flex;
    position: relative;
    flex-direction: column;
    // background-color: pink;
    border-bottom: 2rpx solid #dadce0;

    view {
      display: flex;
      align-items: center;
      // justify-content: center;
      padding: 30rpx 0;
      // background-color: red;

      text {
        font-size: 24rpx;
        padding-left: 20rpx;
      }

    }

  }

  .selected {
    background-color: rgba(238, 232, 232, 0.631);
  }

  .websiteStatement {
    width: inherit;
    padding-left: 20rpx;
    display: flex;
    align-items: center;
    // justify-content: center;
    position: absolute;
    bottom: 3%;
    font-size: 25rpx;
    color: #919399;
  }
}
</style>