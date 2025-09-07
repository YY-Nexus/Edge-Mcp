<template>
  <div class="trend-chart">
    <h4>评分趋势图</h4>
    <canvas ref="trendChart" width="600" height="300"></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
let chart
const trendChart = ref(null)
onMounted(async () => {
  const res = await fetch('/api/feedback')
  const data = await res.json()
  const byDate = {}
  data.forEach(f => {
    const date = (f.timestamp||'').slice(0,10)
    if (!byDate[date]) byDate[date] = []
    byDate[date].push(Number(f.rating))
  })
  const trend = Object.entries(byDate).map(([date, arr]) => ({ date, avg: arr.reduce((a,b)=>a+b,0)/arr.length }))
  const Chart = (await import('chart.js/auto')).default
  chart = new Chart(trendChart.value, {
    type: 'line',
    data: {
      labels: trend.map(t=>t.date),
      datasets: [{
        label: '评分均值',
        data: trend.map(t=>t.avg),
        borderColor: '#42b983',
        fill: false
      }]
    }
  })
})
</script>
<style scoped>
.trend-chart { margin: 20px 0; }
</style>
