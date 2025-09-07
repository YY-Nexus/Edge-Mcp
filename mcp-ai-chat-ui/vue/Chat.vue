<template>
  <div class="chat-ui">
    <h2>🤖 AI 教学助手</h2>
    <textarea v-model="prompt" placeholder="请输入提示词..." rows="4"></textarea>
    <button @click="sendPrompt">发送</button>
    <div v-if="reply" class="response">
      <h3>AI 回复：</h3>
      <div v-html="reply"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const prompt = ref('')
const reply = ref('')

async function sendPrompt() {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt.value })
  })
  const data = await res.json()
  reply.value = data.reply || '未收到回复'
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
}
.response {
  margin-top: 20px;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 6px;
}
</style>
