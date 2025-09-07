<template>
  <div class="chat-ui">
    <h2>🤖 AI 教学助手</h2>
    <textarea v-model="prompt" placeholder="请输入提示词..." rows="4"></textarea>
    <button @click="sendPrompt">发送</button>
    <div v-if="reply" class="response">
      <h3>AI 回复：</h3>
      <div v-html="reply"></div>
      <RatingComponent v-model:value="rating" />
      <div v-if="rating" class="rating-result">已评分：{{ rating }} 星</div>
      <textarea v-model="comment" placeholder="可选：对 AI 回复的评价..." rows="2"></textarea>
      <button @click="submitFeedback" :disabled="!rating">提交评分</button>
      <div v-if="feedbackMsg" class="feedback-msg">{{ feedbackMsg }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RatingComponent from './RatingComponent.vue'

const prompt = ref('')
const reply = ref('')
const rating = ref(0)
const comment = ref('')
const feedbackMsg = ref('')

async function sendPrompt() {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt.value })
  })
  const data = await res.json()
  reply.value = data.reply || '未收到回复'
  rating.value = 0
  comment.value = ''
  feedbackMsg.value = ''
}

async function submitFeedback() {
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt.value, reply: reply.value, rating: rating.value, comment: comment.value })
  })
  if (res.ok) feedbackMsg.value = '感谢您的评分！'
  else feedbackMsg.value = '评分提交失败，请重试。'
}
</script>

<style scoped>
.chat-ui {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}
textarea {
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
}
button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 8px;
}
.response {
  margin-top: 20px;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 6px;
}
.rating-result {
  margin: 8px 0;
  color: #f7b500;
}
.feedback-msg {
  margin-top: 8px;
  color: #42b983;
}
</style>
