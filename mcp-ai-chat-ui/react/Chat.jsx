import React, { useState } from 'react';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');

  const sendPrompt = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setReply(data.reply || '未收到回复');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Segoe UI' }}>
      <h2>🤖 AI 教学助手</h2>
      <textarea
        rows="4"
        style={{ width: '100%', fontSize: 16 }}
        placeholder="请输入提示词..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        style={{ marginTop: 10, padding: '8px 16px', background: '#42b983', color: 'white', border: 'none' }}
        onClick={sendPrompt}
      >
        发送
      </button>
      {reply && (
        <div style={{ marginTop: 20, background: '#f9f9f9', padding: 10, borderRadius: 6 }}>
          <h3>AI 回复：</h3>
          <div dangerouslySetInnerHTML={{ __html: reply }} />
        </div>
      )}
    </div>
  );
}
