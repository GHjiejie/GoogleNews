import { defineStore } from 'pinia'
import { ref } from 'vue'
const useAccurateSearchStore = defineStore('accurateSearchSettings', () => {
    const q = ref('apple');
    const startTime = ref('');
    const endTime = ref('');
    const selectedCategoryIndex = ref(0);
    const selectedCategoryName = ref('general');
    const selectedNewsSourcesId = ref('');
    const selectedLanguage = ref('');
    const selectedCountry = ref('us');

    return {
        q,
        startTime,
        endTime,
        selectedCategoryIndex,
        selectedCategoryName,
        selectedNewsSourcesId,
        selectedLanguage,
        selectedCountry,
    }
}, {
    persist: {
        enabled: true,//开启持久化
        // 指定持久化的数据，可以是数组或者字符串
        // path: ['q', 'startTime', 'endTime', 'selectedLanguage', 'selectedCountry']
    }
});
export default useAccurateSearchStore;