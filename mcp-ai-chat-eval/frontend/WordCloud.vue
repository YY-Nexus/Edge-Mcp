<template>
  <div class="wordcloud">
    <h4>评论关键词云</h4>
    <div class="cloud">
      <span v-for="([word, count], i) in keywords" :key="word" :style="{fontSize: 12+count*4+'px', color:'#42b983'}">{{ word }}({{ count }})</span>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const keywords = ref([])
onMounted(async () => {
  const res = await fetch('/api/feedback/keywords')
  const data = await res.json()
  keywords.value = data.keywords || []
})
</script>
<style scoped>
.cloud { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
