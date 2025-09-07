import React, { useEffect, useState } from 'react';

export function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [clusters, setClusters] = useState({});
  const [sentiments, setSentiments] = useState([]);
  useEffect(() => {
    fetch('/api/feedback/topics').then(res => res.json()).then(setTopics);
    fetch('/api/feedback/clusters').then(res => res.json()).then(setClusters);
    fetch('/api/feedback/sentiment/fine').then(res => res.json()).then(setSentiments);
  }, []);
  return (
    <div style={{padding:20}}>
      <h3>评论主题 Top10</h3>
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        {topics.map(t => <span key={t.word} style={{fontSize:12+t.count*2,color:'#42b983'}}>{t.word}({t.count})</span>)}
      </div>
      <h3 style={{marginTop:24}}>评论聚类（按主题）</h3>
      <div style={{display:'flex',gap:32}}>
        {Object.entries(clusters).map(([center,comments]) => (
          <div key={center}>
            <div style={{fontWeight:'bold'}}>{center}</div>
            <ul>{comments.map((c,i)=><li key={i}>{c}</li>)}</ul>
          </div>
        ))}
      </div>
      <h3 style={{marginTop:24}}>评论情感细分</h3>
      <ul>
        {sentiments.map((s,i)=>(<li key={i}><b>{s.sentiment}</b>: {s.comment}</li>))}
      </ul>
    </div>
  );
}
