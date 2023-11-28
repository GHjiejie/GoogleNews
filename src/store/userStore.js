import { defineStore } from 'pinia'
import { ref } from 'vue'
const useUserStore = defineStore('user', () => {

    // 关注列表
    const concernedList = ref([]);

    // 发布的新闻
    const published = ref([]);

    // 我收到的消息
    const message = ref([]);

    // 我的收藏
    const myCollection = ref([]);

    // 我的评论
    const myComment = ref([]);

    // 我的点赞
    const myLike = ref([]);

    // 添加关注
    const addConcerned = (author) => {
        concernedList.value.unshift(author);
    }

    // 移除关注
    const removeConcerned = (author) => {
        // 在数组里面移除指定author的数据
        const index = concernedList.value.findIndex(item => item.id === author.id);
        concernedList.value.splice(index, 1);

    }

    // 删除已发布新闻
    const deleteNews = (news) => {

    }

    return {
        concernedList,
        published,
        message,
        myCollection,
        myComment,
        myLike,
        addConcerned,
        removeConcerned,
        deleteNews
    }

},
    {
        // 存储数据的持久化
        persist: true,
    });

export default useUserStore;