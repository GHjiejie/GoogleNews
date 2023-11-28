// const usebrowsingHistoryStore=
import { defineStore } from 'pinia';
import { ref } from 'vue';
const usebrowsingHistoryStore = defineStore('browsingHistoryStore', () => {
    const browsingHistory = ref([]);
    // 添加浏览历史
    const addHistory = (date, news) => {
        // 将数据存储到内存里面
        if (uni.getStorageSync(date)) {
            // console.log('已经存在了');
            // 将news追加到已经存在的数组里面
            let temp = uni.getStorageSync(date);
            // 将新的数据追加到数组里面
            temp.unshift(news);
            // 添加的数据要在数组的最前面
            // temp.unshift(news);
            // 更新内存里面的数据
            uni.setStorageSync(date, temp);
        } else {
            // console.log('不存在');
            uni.setStorageSync(date, [news]);
        }
    }
    // 获取浏览历史
    const getHistory = () => {
        return browsingHistory.value;
    }
    // 清空浏览历史
    const clearHistory = () => {
        browsingHistory.value = [];
    }
    return {
        browsingHistory,
        addHistory,
        getHistory,
        clearHistory,
    }

},
    // 开启持久化存储
    {
        persist: true,
    }
);
export default usebrowsingHistoryStore;