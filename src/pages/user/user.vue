<template>
    <view class="userBox" :style="{ paddingTop: safeAreaInsets.top + 'px', height: safeArea.height + 'px' }">
        <!-- <u-swiper :list="bgcList" :circular="true" interval="6000" duration="300" radius="60" imgMode="aspectFill"
            bgColor="white"></u-swiper> -->
        <!-- :style="{ paddingTop: safeAreaInsets.top + 'px', height: safeArea.height + 'px' }" -->
        <view class="user">
            <!-- 头部个人名片及相关信息 -->
            <view class="idCard">
                <view class="top">
                    <view class="top-left">
                        <up-image src="../../static/image/default.png" width="30" height="30" shape="circle"></up-image>
                        <text>巧克力色のjie</text>
                    </view>
                    <view class="top-right">
                        <u-icon name="arrow-right" color="#2979ff" size="25"></u-icon>
                    </view>
                </view>
                <view class="content">
                    <view class="content-top">
                        <view class="left"><text>Published</text></view>
                        <view class="interval"><text>|</text></view>
                        <view class="center" @click="goConcerned"><text>Concerned</text></view>
                        <view class="interval"><text>|</text></view>
                        <view class="right"><text>fans</text></view>
                    </view>
                    <view class="content-center">
                        <view class="aboutMe">
                            <view class="public">
                                <view class="t-icon t-icon-xiaoxi" id="message"></view><text>Message</text>
                            </view>
                            <view class="public">
                                <view class="t-icon t-icon-shoucang" id="collect"></view>
                                <text>Collect</text>
                            </view>
                            <view class="public">
                                <view class="t-icon t-icon-lishi1" id="history" @click="goHistoryPanel"></view>
                                <text>History</text>
                            </view>
                            <view class="public">
                                <view class="t-icon t-icon-dianzan" id="like"></view><text>Like</text>
                            </view>
                        </view>

                    </view>

                </view>
            </view>

            <!-- 其它的设置 -->
            <scroll-view scroll-y class="settings">
                <!-- 常用设置 -->
                <view class="commonSettings">
                    <view class="commonTitle"><text>common settings</text></view>
                    <view class="commonContent">
                        <view class="settingsPublic">
                            <view class="t-icon t-icon-yueliang" id="Nightmode" @click="changeMode"></view>
                            <text>Night mode</text>
                        </view>
                        <view class="settingsPublic">
                            <view class="t-icon t-icon-bangzhufankui" id="help" @click="changeMode"></view>
                            <text>help</text>
                        </view>
                        <view class="settingsPublic">
                            <view class="t-icon t-icon-yijianfankui" id="feedback" @click="changeMode"></view>
                            <text>feedback</text>
                        </view>
                        <view class="settingsPublic">
                            <view class="t-icon t-icon-anquanzhongxin11" id="securityCenter" @click="changeMode"></view>
                            <text>security center</text>
                        </view>
                        <view class="settingsPublic">
                            <view class="t-icon t-icon-yuyan" id="language" @click="changeLanguage"></view>
                            <text>language</text>
                        </view>
                        <view class="settingsPublic">
                            <view class="t-icon t-icon-gengduoshezhi" id="more" @click="goMoreSettings"></view>
                            <text>more settings</text>
                        </view>

                    </view>
                </view>
                <!-- 其它设置 -->
                <view class="otherSettings">
                    <!-- <view class="otherTtle"><text>other settings</text></view> -->
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
const { safeAreaInsets, safeArea } = uni.getSystemInfoSync()
// console.log(safeArea, safeAreaInsets);

// const bgcList = ref([
//     {
//         url: '../../static/image/bgc.png',
//     },
//     {
//         url: '../../static/image/bgc2.jpg',
//     },
//     {
//         url: '../../static/image/bgc3.jpg',
//     },
//     {
//         url: '../../static/image/bgc4.jpg',
//     },
//     {
//         url: '../../static/image/bgc5.jpg',
//     }

// ]);


const goMoreSettings = () => {
    // console.log('我要去更多设置面板了');
    uni.navigateTo({
        url: '/pages/moreSettings/moreSettings',
    });
}

//去我的关注面板
const goConcerned = () => {
    // console.log('我要去我的关注面板了');
    uni.navigateTo({
        url: '/pages/concernedPanel/concernedPanel',
    });
}

// 切换语言
const changeLanguage = () => {
    uni.showToast({
        title: 'Not yet open',
        icon: 'none',
        duration: 1000
    });
}

//切换主题
const changeMode = () => {
    // console.log('我要切换模式了');
    uni.showToast({
        title: 'Not yet open',
        icon: 'none',
        duration: 1000
    });
}
const goHistoryPanel = () => {
    // console.log('我要去历史面板了');
    uni.navigateTo({
        url: '/pages/historyPanel/historyPanel',
    });
}
</script> 

<style lang="scss" scoped>
.userBox {
    width: 100vw;
    display: flex;
    flex-direction: column;
    // height: 100vh;
    // background: linear-gradient(to bottom, #ffffff6f, #0000005d);
    background-color: black;

    .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        // justify-content: space-around;
        // background: linear-gradient(to bottom, #0D0C0C, #001F3F);

        // background-color: #fff;

        // background: linear-gradient(45deg, #b730c4, #9c27a9, #811f8f, #681675, #60106e);
        // background: linear-gradient(to bottom, #ab0b0b, #1968b7);
        // background: linear-gradient(to bottom, #5e5757, #004284);

        // background: linear-gradient(225deg, #f97281, #7b589e, #171f85);

        .idCard {
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 20rpx;
            margin-bottom: 20rpx;
            // padding-top: 20rpx;
            width: 98vw;
            // background: linear-gradient(45deg, #b730c4, #9c27a9, #811f8f, #681675, #500e5c);
            // background-color: rgb(206, 87, 107);
            // background: linear-gradient(45deg, #b830c4dc, #9c27a9bf, #821f8fc7, #681675c3, #500e5cd4);
            background-color: rgb(147, 210, 236);
            // opacity: 0.5;
            height: 25vh;
            border-radius: 60rpx;
            box-shadow: 0rpx 5rpx 10rpx rgb(58, 57, 57);

            .top {
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                // background-color: red;
                padding: 30rpx 20rpx;
                margin-top: 10rpx;

                .top-left {
                    display: flex;
                    align-items: center;

                    text {
                        font-size: 25rpx;
                        color: #cb9797;
                        font-weight: bolder;
                        padding-left: 20rpx;
                    }
                }

            }

            .content {
                position: absolute;
                bottom: 0;
                box-sizing: border-box;
                flex-direction: column;
                // justify-content: space-around;
                align-items: center;
                background-color: rgba(255, 255, 255, 0.141);
                border-radius: 60rpx;
                padding: 10rpx 0;
                display: flex;

                .content-top {
                    width: 98vw;
                    display: flex;
                    justify-content: space-around;
                    // background-color: red;
                    margin-bottom: 10rpx;

                    .interval {
                        opacity: 0.2;
                    }

                    text {
                        font-size: 20rpx;
                        font-weight: bolder;
                    }
                }

                .content-center {

                    width: 98vw;

                    .aboutMe {
                        box-sizing: border-box;
                        padding: 20rpx;
                        width: 100%;
                        display: flex;
                        // background-color: red;
                        border-radius: 60rpx;
                        justify-content: space-around;

                        .public {
                            display: flex;
                            flex-direction: column;
                            // justify-content: center;
                            align-items: center;
                            ;

                            text {
                                font-size: 20rpx;
                                color: #cb9797;
                                font-weight: bolder;
                                padding-top: 10rpx;

                            }
                        }


                        .t-icon {
                            height: 50rpx;
                            width: 50rpx;
                        }


                    }
                }

            }

        }

        .settings {
            width: 90vw;
            margin-top: 20rpx;
            // height: 65vh;
            display: flex;
            flex-direction: column;
            // background-color: red;
            // background: linear-gradient(45deg, #f97282cb, #7b589e, #171f85);
            // background: linear-gradient(45deg, #341336, #5e2a55, #85406a, #ad5778);
            border-radius: 60rpx;
            box-shadow: 0 0 10px #FF0000,
                0 0 5px #00FF00,
                0 0 10px #0000FF,
                0 0 10px #FFFF00,
                0 0 10px #00FFFF;

            .commonSettings {
                background-color: rgba(255, 255, 255, 0.192);
                border-radius: 60rpx;
                display: flex;
                flex-direction: column;
                // margin-top: 100%;

                .commonTitle {
                    padding: 10rpx 20rpx;

                    text {
                        padding-left: 20rpx;
                        font-size: 20rpx;
                        font-weight: bolder;
                        color: #000000;
                    }
                }

                .commonContent {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;


                    .settingsPublic {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        flex-basis: 25%;
                        margin-bottom: 25rpx;
                        // flex: 1 0 200px;

                        .t-icon {
                            width: 60rpx;
                            height: 60rpx;
                        }

                        text {
                            font-size: 18rpx;
                            font-weight: bolder;
                            color: rgb(192, 162, 162);
                        }
                    }
                }

            }
        }
    }
}
</style>