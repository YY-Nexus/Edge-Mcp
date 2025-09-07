<template>
  <div class="rating">
    <span v-for="n in 5" :key="n" @click="rate(n)" :class="{active: n <= value}">★</span>
    <span v-if="value">({{ value }}/5)</span>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({ value: Number })
const emit = defineEmits(['update:value'])
function rate(n) { emit('update:value', n) }
</script>
<style scoped>
.rating span { font-size: 2em; cursor: pointer; color: #ccc; }
.rating .active { color: #f7b500; }
</style>
