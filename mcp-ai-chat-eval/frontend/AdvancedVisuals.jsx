import React, { useEffect, useState } from 'react';

export function GroupedKeywordCloud() {
  const [grouped, setGrouped] = useState({});
  useEffect(() => {
    fetch('/api/feedback/keywords/grouped')
      .then(res => res.json())
      .then(data => setGrouped(data));
  }, []);
  return (
    <div style={{margin:'20px 0'}}>
      <h4>分组词云（按评分）</h4>
      <div style={{display:'flex',gap:32}}>
        {[1,2,3,4,5].map(rating => (
          <div key={rating}>
            <div style={{fontWeight:'bold'}}>{rating}星</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {(grouped[rating]||[]).map(([word,count]) => (
                <span key={word} style={{fontSize:12+count*4,color:'#42b983'}}>{word}({count})</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SentimentPieChart() {
  const [stats, setStats] = useState({ ratingStats: [], sentimentStats: {} });
  useEffect(() => {
    fetch('/api/feedback/stats/advanced')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);
  useEffect(() => {
    if (!window.Chart) return;
    const ctx = document.getElementById('sentimentPie');
    if (!ctx) return;
    new window.Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['正面', '负面', '中性'],
        datasets: [{
          data: [stats.sentimentStats.positive, stats.sentimentStats.negative, stats.sentimentStats.neutral],
          backgroundColor: ['#42b983','#e74c3c','#f7b500']
        }]
      }
    });
  }, [stats]);
  return <canvas id="sentimentPie" width={300} height={300} />;
}
