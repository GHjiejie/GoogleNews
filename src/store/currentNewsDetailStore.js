import { defineStore } from 'pinia';
import { ref } from 'vue';
const useDetailNewsStore = defineStore('detailNewsStore', () => {
    const currentNewsDetail = ref({});
    return {
        currentNewsDetail,
    }
}, {
    persist: true,
});
export default useDetailNewsStore;