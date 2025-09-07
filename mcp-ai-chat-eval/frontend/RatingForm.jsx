import React, { useState } from 'react';

export default function RatingForm({ prompt, reply, user = 'student01' }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState('');

  async function submitFeedback() {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, reply, rating, comment, user })
    });
    if (res.ok) setMsg('评分已提交！');
    else setMsg('提交失败');
  }

  return (
    <div className="rating-form">
      <h3>📝 请对 AI 回复进行评分</h3>
      <select value={rating} onChange={e => setRating(e.target.value)}>
        <option value="">请选择评分</option>
        {[1,2,3,4,5].map(n => (
          <option key={n} value={n}>{n} 星</option>
        ))}
      </select>
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="可选：写下你的评价..." rows={3} />
      <button onClick={submitFeedback}>提交评分</button>
      {msg && <div className="msg">{msg}</div>}
      <style>{`
        .rating-form { margin-top: 20px; background: #eef; padding: 10px; border-radius: 6px; }
        select, textarea { width: 100%; margin-bottom: 10px; }
        button { padding: 8px 16px; background: #42b983; color: white; border: none; }
        .msg { margin-top: 8px; color: #42b983; }
      `}</style>
    </div>
  );
}
