<template>
  <view class="changeApikey">
    <!-- {{ inputText }} -->
    <view class="title">
      <text>Change api</text>
    </view>
    <input class="inputBox" v-model="inputText">
    <view class="submit" @click="submit">
      <text>Submit</text>
    </view>
    <a href="https://newsapi.org/account">How to apply for your own apikey</a>

  </view>
</template>

<script setup>
import { ref } from 'vue'
import useApiStore from '../../store/userApiStore'
const apiStore = useApiStore();

const inputText = ref(apiStore.apiKey);
const submit = async () => {
  apiStore.changeApiKey(inputText.value);
  const res = await uni.request({
    url: `https://newsapi.org/v2/top-headlines?country=us&category=sports&pageSize=1&page=1&apiKey=${inputText.value}`,
  });
  // console.log(res);
  if (res.data.status === 'error') {
    uni.showToast({
      title: 'Invalid apikey',
      icon: 'none',
      duration: 2000
    });
    // 清空输入框与缓存
    apiStore.apiKey = '';
    inputText.value = '';
  } else {
    uni.showToast({
      title: 'Success',
      icon: 'none',
      duration: 2000
    });
  }


}
</script>

<style lang="scss" scoped>
.changeApikey {
  height: 30vh;
  // background-color: red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .title {
    display: flex;
    justify-content: center;
    padding: 20rpx;

    text {
      font-size: 35rpx;
      font-weight: bold;
    }
  }

  .inputBox {
    box-sizing: border-box;
    width: 90vw;
    display: flex;
    padding-left: 20rpx;

    border: 1rpx solid #ccc;
    border-radius: 30rpx;
    height: 70rpx;
  }

  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: vw;
    width: 90vw;
    height: 70rpx;
    background-color: deepskyblue;
    border-radius: 30rpx;
    margin-top: 20rpx;

    text {
      font-size: 35rpx;
      font-weight: bold;
      color: rgb(0, 0, 0);
    }
  }

  a {
    font-size: 20rpx;
    margin-top: 20rpx;
    text-decoration: none;
  }
}
</style>