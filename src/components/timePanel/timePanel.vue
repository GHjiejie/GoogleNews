<template>
  <!-- <uni-section :title="'日期范围用法：' + '[' + range + ']'" type="line"></uni-section> -->
  <view class="timePanel">
    <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
  </view>
</template>

<script setup>
import { ref } from 'vue';



</script>

<style lang="scss" scoped>
.timePanel {
  display: flex;
  width: 80vw;
  height: 30vh;
  background-color: red;
}
</style>