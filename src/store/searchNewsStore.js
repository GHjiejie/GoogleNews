import { defineStore } from 'pinia'
import { ref } from 'vue'
import { inject } from 'vue'
const useSearchNewsStore = defineStore('searchNewsStore', () => {
    const q = ref('');
    const config = inject('$config');
    const newsList = ref({});
    const pageSize = ref(20);
    const page = ref(1);
    const totalResults = ref(1);
    const loadingStatus = ref(1);
    const language = ref('');
    const sortBy = ref('publishedAt');
    const from = ref('');
    const to = ref('');
    const baseURL = ref('https://newsapi.org/v2/everything');
    const apiKey = ref(config.apiKey);
    const finalRequestURL = ref('');
    const searchStatus = ref(1);//0为搜索的结果为空，1为搜索的结果不为空

    //编辑请求参数
    const buildFinalRequest = (baseURL, apiKey, q, language, sortBy, from, to) => {
        let requestParams = {
            q: q,
            apiKey: apiKey,
            pageSize: pageSize.value,
        }
        if (language) {
            requestParams.language = language;
        }
        if (sortBy) {
            requestParams.sortBy = sortBy;
        }
        if (from) {
            requestParams.from = from;
        }
        if (to) {
            requestParams.to = to;
        }
        let paramsArray = [];
        for (let key in requestParams) {
            paramsArray.push(`${key}=${requestParams[key]}`);
        }
        let requestURL = `${baseURL}?${paramsArray.join('&')}`;
        finalRequestURL.value = requestURL;
        return requestURL;
    }
    // 获取过滤后的新闻
    const getFilterNews = async (requesturl) => {
        try {
            const res = await uni.request({
                url: requesturl,
                page: page.value,
                timeout: 4000,
            });
            // 如果搜索的新闻为空

            if (res.data.articles.length === 0) {
                searchStatus.value = 0;
                return {
                    status: searchStatus.value,
                }
            } else {
                totalResults.value = res.data.totalResults;
                res.data.articles = res.data.articles.filter(item => item.author !== null && item.author.length < 30);
                // 首先删除原来的值，不然会叠加
                newsList.value = [];
                newsList.value = res.data.articles;
                return {
                    newsList: newsList.value,
                    loadingStatus: loadingStatus.value,
                }
            }
        } catch (error) {
            uni.showToast({
                title: 'Please check your network connection',
                icon: 'none',
                duration: 2000,
            });
        }

    }
    //获取更多新闻(页面滚动事件)
    const getMoreNews = async () => {
        const res = await uni.request({
            url: finalRequestURL.value,
            data: {
                page: page.value,
            }
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
        res.data.articles = res.data.articles.filter(item => item.author !== null && item.author.length < 30);
        if (newsList.value.length > 0) {
            newsList.value = [...newsList.value, ...res.data.articles];
        } else {
            newsList.value = res.data.articles;
        }
        return {
            newsList: newsList.value,
            loadingStatus: loadingStatus.value,
        }
    }

    // 验证用户的输入是否有效
    const verifyInput = async (q) => {
        // console.log('开始验证用户输入的内容是否可以请求到数据');
        const res = await uni.request({
            url: `https://newsapi.org/v2/everything`,
            data: {
                q: q,
                apiKey: config.apiKey,
                pageSize: 1,
            },
            timeout: 4000,
        });
        if (res.data.totalResults === 0) {
            return 0;
        }
    }

    const getEverythingNews = async (q) => {
        const res = await uni.request({
            url: `https://newsapi.org/v2/everything`,
            data: {
                q: q,
                pageSize: pageSize.value,
                page: page.value,
                apiKey: config.apiKey,
            }
        });
        // console.log(res.data);
        if (res.data.articles.length === 0) {
            console.log('开始请求的新闻数据为空');
            return false;
        }
        totalResults.value = res.data.totalResults;
        res.data.articles = res.data.articles.filter(item => item.author !== null && item.author.length < 30);
        newsList.value = res.data.articles;
        return {
            newsList: newsList.value,
        }
    }

    return {
        q,
        newsList,
        page,
        totalResults,
        loadingStatus,
        language,
        sortBy,
        from,
        to,
        baseURL,
        apiKey,
        finalRequestURL,
        searchStatus,
        getEverythingNews,
        buildFinalRequest,
        getFilterNews,
        getMoreNews,
        verifyInput

    }
}
    // , {
    //     persist: true // uses localStorage under the hood
    // }

);

export default useSearchNewsStore;
