import { defineStore } from 'pinia';
import { ref } from 'vue';
// import { inject } from 'vue';
import useApiStore from './userApiStore.js'
const apiStore = useApiStore();
const { apiKey } = apiStore;
const useGetNewsStore = defineStore('getNewsStore', () => {
    // const config = inject('$config');
    const newsList = ref({});
    const pageSize = ref(20);
    const page = ref(1);
    const totalResults = ref(1);
    // 设置加载状态，1还有数据可以加载，2为没有更多数据了
    const loadingStatus = ref(1);
    const getTopHeadlinesByCountryAndCategory = async (country, category, page) => {
        try {
            const res = await uni.request({
                url: `https://newsapi.org/v2/top-headlines`,
                data: {
                    country: country,
                    category: category,
                    pageSize: pageSize.value,
                    page: page,
                    apiKey: apiStore.apiKey,
                },
                timeout: 4000,
            });
            // console.log(res.data);
            if (res.data.articles.length === 0) {
                loadingStatus.value = 2;
                return {
                    loadingStatus: loadingStatus.value,
                    newsList: newsList.value,
                }
            }
            totalResults.value = res.data.totalResults;
            // 将里面的auhtor为null的数据过滤掉
            res.data.articles = res.data.articles.filter(item => item.title !== '[Removed]');
            // newsList数据初始化，否则空的数组的话是没有.value值的，会报错，其实也只需要初始化这么一次，因为我们开启了持久化数据存储
            if (newsList.value.length > 0) {
                newsList.value = [...newsList.value, ...res.data.articles];
            } else {
                newsList.value = res.data.articles;
            }
            return {
                newsList: newsList.value,
                loadingStatus: loadingStatus.value,

            }
        } catch (error) {
            uni.showToast({
                title: 'Please check your network connection',
                icon: 'none',
                duration: 2000,
            });
            return false
        }

    }
    const getTopHeadlinesBySources = async (sources) => {
        const res = await uni.request({
            url: `https://newsapi.org/v2/top-headlines`,
            data: {
                sources: sources,
                pageSize: pageSize.value,
                page: page.value,
                apiKey: apiStore.apiKey,
            }
        });
        if (res.data.articles.length === 0) {
            loadingStatus.value = 2;
            return {
                loadingStatus: loadingStatus.value,
                newsList: newsList.value,
            }
        }
        totalResults.value = res.data.totalResults;
        res.data.articles = res.data.articles.filter(item => item.author !== null && item.author.length < 30);
        if (newsList.value.length > 0) {

            newsList.value = [...newsList.value, ...res.data.articles];
        } else {
            newsList.value = res.data.articles;
        }
        return {
            newsList: newsList.value,
            loadingStatus: loadingStatus.value,
        };
    }

    return {
        getTopHeadlinesByCountryAndCategory,
        getTopHeadlinesBySources,
        newsList,
        pageSize,
        page,
        totalResults,
        loadingStatus
    }
}, {
    persist: {
        enabled: true,//开启持久化
        // 指定数据存储,我们可以直接看源码来确认所需要的方法
        paths: [
            'pageSize',
            'totalResults'
        ],

    }
});
export default useGetNewsStore;