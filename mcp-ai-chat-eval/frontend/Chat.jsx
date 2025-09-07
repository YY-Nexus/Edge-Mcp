import React, { useState } from 'react';
import RatingForm from './RatingForm';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [showRating, setShowRating] = useState(false);

  async function sendPrompt() {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setReply(data.reply || '未收到回复');
    setShowRating(true);
  }

  return (
    <div className="chat-ui">
      <h2>🤖 AI 教学助手</h2>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="请输入提示词..." rows={4} />
      <button onClick={sendPrompt}>发送</button>
      {reply && (
        <div className="response">
          <h3>AI 回复：</h3>
          <div>{reply}</div>
          {showRating && <RatingForm prompt={prompt} reply={reply} />}
        </div>
      )}
      <style>{`
        .chat-ui { max-width: 600px; margin: auto; padding: 20px; font-family: 'Segoe UI', sans-serif; }
        textarea { width: 100%; font-size: 16px; margin-bottom: 10px; }
        button { padding: 8px 16px; background: #42b983; color: white; border: none; cursor: pointer; margin-right: 8px; }
        .response { margin-top: 20px; background: #f9f9f9; padding: 10px; border-radius: 6px; }
      `}</style>
    </div>
  );
}
