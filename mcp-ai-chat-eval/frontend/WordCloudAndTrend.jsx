import React, { useEffect, useState } from 'react';

export function WordCloud() {
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    fetch('/api/feedback/keywords').then(res => res.json()).then(data => setKeywords(data.keywords || []));
  }, []);
  return (
    <div style={{margin:'20px 0'}}>
      <h4>评论关键词云</h4>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {keywords.map(([word, count]) => (
          <span key={word} style={{fontSize:12+count*4,color:'#42b983'}}>{word}({count})</span>
        ))}
      </div>
    </div>
  );
}

export function RatingTrend() {
  const [trend, setTrend] = useState([]);
  useEffect(() => {
    fetch('/api/feedback').then(res => res.json()).then(data => {
      // 按日期分组统计评分均值
      const byDate = {};
      data.forEach(f => {
        const date = (f.timestamp||'').slice(0,10);
        if (!byDate[date]) byDate[date] = [];
        byDate[date].push(Number(f.rating));
      });
      setTrend(Object.entries(byDate).map(([date, arr]) => ({ date, avg: arr.reduce((a,b)=>a+b,0)/arr.length })));
    });
  }, []);
  useEffect(() => {
    if (!window.Chart) return;
    const ctx = document.getElementById('trendChart');
    if (!ctx || trend.length === 0) return;
    new window.Chart(ctx, {
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
    });
  }, [trend]);
  return <canvas id="trendChart" width={600} height={300} />;
}
