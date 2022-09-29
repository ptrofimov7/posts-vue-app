import { ref, computed } from 'vue'

export default function useSortedAndFilteredPosts(sortedPosts) {
   const searchQuery = ref('')
   const sortedAndFilteredPosts = computed(() => (sortedPosts.value.filter((post) =>
   post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
 )))
   return { searchQuery, sortedAndFilteredPosts }
}