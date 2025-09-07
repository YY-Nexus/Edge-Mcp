import React, { useEffect, useState } from 'react';

export default function KeywordCloud() {
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    fetch('/api/feedback/keywords')
      .then(res => res.json())
      .then(data => setKeywords(data.keywords || []));
  }, []);
  return (
    <div style={{margin:'20px 0'}}>
      <h4>评论关键词高频词云</h4>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {keywords.map(([word, count]) => (
          <span key={word} style={{fontSize:12+count*4,color:'#42b983'}}>{word}({count})</span>
        ))}
      </div>
    </div>
  );
}
