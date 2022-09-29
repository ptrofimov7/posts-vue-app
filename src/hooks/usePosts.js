import axios from 'axios'
import {ref, onMounted} from 'vue'

export default function usePosts(limit) {
      const posts = ref([])
      const totalPages = ref(0)
      const isPostsLoading = ref(true)
      // this.isPostsLoading = true;
      const fetching = async () => {
         try {
            const response = await axios.get(
              "http://jsonplaceholder.typicode.com/posts",
              {
                params: {
                  _page: 1,
                  _limit: limit,
                },
              }
            );
            posts.value = response.data;
            totalPages.value = Math.ceil(
              response.headers["x-total-count"] / limit
            );
          } catch (error) {
            console.log(error);
          } finally {
            isPostsLoading.value = false;
          }
      }

      onMounted(fetching)

      return {
         posts,
         isPostsLoading,
         totalPages
      }


}