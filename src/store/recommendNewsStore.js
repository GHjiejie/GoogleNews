import { defineStore } from 'pinia';
import { ref } from 'vue';
import useApiStore from './userApiStore.js'
const apiStore = useApiStore();
const { apiKey } = apiStore;
const recommendNewsStore = defineStore('recommendNews', () => {
    // const config = inject('$config');
    const pageSize = ref(20);
    const recommendCountry = ref('us');
    const recommendCategory = ref('general');
    const getRecommendNews = async (country, category) => {
        // console.log(country, category);
        try {
            const res = await uni.request({
                url: `https://newsapi.org/v2/top-headlines`,
                data: {
                    country: country,
                    category: category,
                    pageSize: pageSize.value,
                    apiKey: apiStore.apiKey,
                },
                timeout: 4000,
            });
            return res.data.articles;
        } catch (error) {
            uni.showToast({
                title: 'Please check your network connection',
                icon: 'none',
                duration: 2000,
            });
        }

    }
    return {
        getRecommendNews,
        recommendCountry,
        recommendCategory

    }
}, {
    persist: true,
});
export default recommendNewsStore;