<template>
  <div class="dashboard">
    <WordCloud />
    <TrendChart />
  </div>
</template>
<script setup>
import WordCloud from './WordCloud.vue'
import TrendChart from './TrendChart.vue'
</script>
<style scoped>
.dashboard { padding: 20px; }
</style>
