import { defineStore } from 'pinia'
import { ref } from 'vue'
const useApiStore = defineStore('apiStore', () => {
    const apiKey = ref('8a9395549041413d88344c916df289a0');
    const changeApiKey = (newApiKey) => {
        apiKey.value = newApiKey;
    }
    return {
        apiKey,
        changeApiKey
    }
},
    {
        // 存储数据的持久化
        persist: true,
    }
);
export default useApiStore;