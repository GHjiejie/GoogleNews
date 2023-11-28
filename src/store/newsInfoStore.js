import { defineStore } from "pinia";
import { ref } from "vue";
const useNewsInfoStore = defineStore('allNewsInfo', () => {
    // 存储所有新闻的分类
    const allNewsCategory = ref(["general", "business", "technology", "sports", "entertainment", "health", "science"]);
    //存储所有新闻的国家
    const allNewsCountry = ref(["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lu", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]
    );
    const filterCountry = ref([['ae', 'ar', 'at', 'au'], ['be', 'bg', 'br'], ['ca', 'ch', 'cn', 'co', 'cu', 'cz'], ['de'], ['eg'], ['fr'], ['gb', 'gr'], ['hk', 'hu'], ['id', 'ie', 'il', 'in', 'it'], ['jp'], ['kr'], ['lt', 'lu', 'lv'], ['ma', 'mx', 'my'], ['ng', 'nl', 'no', 'nz'], ['ph', 'pl', 'pt'], ['ro', 'rs', 'ru'], ['sa', 'se', 'sg', 'sk'], ['th', 'tr', 'tw'], ['ua', 'us'], ['ve'], ['za']]);
    const allSortBy = ref(["relevancy", "popularity", "publishedAt"]);
    // 存储所有新闻的语言
    const allNewsLanguage = ref(["en", "no", "it", "ar", "ud", "de", "pt", "es", "fr", "he", "ru", "sv", "nl", "zh"]
    );
    // 获取所有新闻的标识符
    const allNewsId = ref(['abc-news', 'abc-news-au', 'aftenposten', 'al-jazeera-english', 'ansa', 'argaam', 'ars-technica', 'ary-news', 'associated-press', 'australian-financial-review', 'axios', 'bbc-news', 'bbc-sport', 'bild', 'blasting-news-br', 'bleacher-report', 'bloomberg', 'breitbart-news', 'business-insider', 'business-insider-uk', 'buzzfeed', 'cbc-news', 'cbs-news', 'cnn', 'cnn-es', 'crypto-coins-news', 'der-tagesspiegel', 'die-zeit', 'el-mundo', 'engadget', 'entertainment-weekly', 'espn', 'espn-cric-info', 'financial-post', 'focus', 'football-italia', 'fortune', 'four-four-two', 'fox-news', 'fox-sports', 'globo', 'google-news', 'google-news-ar', 'google-news-au', 'google-news-br', 'google-news-ca', 'google-news-fr', 'google-news-in', 'google-news-is', 'google-news-it', 'google-news-ru', 'google-news-sa', 'google-news-uk', 'goteborgs-posten', 'gruenderszene', 'hacker-news', 'handelsblatt', 'ign', 'il-sole-24-ore', 'independent', 'infobae', 'info-money', 'la-gaceta', 'la-nacion', 'la-repubblica', 'le-monde', 'lenta', 'lequipe', 'les-echos', 'liberation', 'marca', 'mashable', 'medical-news-today', 'msnbc', 'mtv-news', 'mtv-news-uk', 'national-geographic', 'national-review', 'nbc-news', 'news24', 'new-scientist', 'news-com-au', 'newsweek', 'new-york-magazine', 'next-big-future', 'nfl-news', 'nhl-news', 'nrk', 'politico', 'polygon', 'rbc', 'recode', 'reddit-r-all', 'reuters', 'rt', 'rte', 'rtl-nieuws', 'sabq', 'spiegel-online', 'svenska-dagbladet', 't3n', 'talksport', 'techcrunch', 'techcrunch-cn', 'techradar', 'the-american-conservative', 'the-globe-and-mail', 'the-hill', 'the-hindu', 'the-huffington-post', 'the-irish-times', 'the-jerusalem-post', 'the-lad-bible', 'the-next-web', 'the-sport-bible', 'the-times-of-india', 'the-verge', 'the-wall-street-journal', 'the-washington-post', 'the-washington-times', 'time', 'usa-today', 'vice-news', 'wired', 'wired-de', 'wirtschafts-woche', 'xinhua-net', 'ynet']
    );




    // 注意,以下代码在app端存在json字符串解析失败问题，尚未解决，只可以出此下策
    // 获取所有新闻的资源信息
    // const getAllNewsSource = (async () => {
    //     const res = await uni.request({
    //         url: 'https://newsapi.org/v2/top-headlines/sources?apiKey=0455bea5d496450ea9cef3743c6cb95b',
    //     });
    //     console.log(res.data);
    //     newsCollection.value = res.data.sources;

    //     // 初始化allNewsCategory
    //     const localAllNewsCategory = uni.getStorageSync('allNewsCategory');
    //     if (localAllNewsCategory) {
    //         return res.data.sources;
    //     } else {
    //         allNewsCategory.value = [...new Set(res.data.sources.map(item => capitalizeFirstLetter(item.category)))];
    //         uni.setStorageSync('allNewsCategory', JSON.stringify(allNewsCategory.value));
    //     }

    //     // 初始化allNewsCountry
    //     const localAllNewsCountry = uni.getStorageSync('allNewsCountry');
    //     if (localAllNewsCountry) {
    //         return res.data.sources;
    //     } else {
    //         allNewsCountry.value = [...new Set(res.data.sources.map(item => item.country))];

    //         uni.setStorageSync('allNewsCountry', JSON.stringify(allNewsCountry.value));
    //     }

    //     // 初始化allNewsLanguage
    //     const localAllNewsLanguage = uni.getStorageSync('allNewsLanguage');
    //     if (localAllNewsLanguage) {
    //         return res.data.sources;
    //     }
    //     else {
    //         allNewsLanguage.value = [...new Set(res.data.sources.map(item => item.language))];

    //         uni.setStorageSync('allNewsLanguage', JSON.stringify(allNewsLanguage.value));
    //     }

    //     // 初始化allNewsId
    //     // 首先判断本地存储是否有allNewsId，如果有，就直接使用本地存储的allNewsId，如果没有，就使用res.data.sources生成allNewsId
    //     const localAllNewsId = uni.getStorageSync('allNewsId');
    //     if (localAllNewsId) {

    //         return res.data.sources;
    //     }
    //     else {

    //         allNewsId.value = [...new Set(res.data.sources.map(item => item.id))];

    //         uni.setStorageSync('allNewsId', JSON.stringify(allNewsId.value));
    //     }


    //     return res.data.sources;
    // });
    // 首字母大写
    // function capitalizeFirstLetter(str) {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // }
    // console.log(newsCollection.value);//注意，这里newsCollection.value是空数组，因为getAllNews是异步函数，还没执行完，所以这里是空数组
    // 我们可以在categoryList组件的onLoad钩子函数里面验证
    // const getAllNewsCategory = (() => {
    //     // return new Set(newsCollection.value.map((item) => item.category));
    //     return [...new Set(newsCollection.value.map((item) => item.category))];
    // });
    return {
        allNewsCategory,
        allSortBy,
        allNewsCountry,
        filterCountry,
        allNewsLanguage,
        allNewsId
    }
});
export default useNewsInfoStore;