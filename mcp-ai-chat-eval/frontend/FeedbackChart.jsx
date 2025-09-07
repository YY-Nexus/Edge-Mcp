import React, { useEffect, useRef } from 'react';

export default function FeedbackChart() {
  const chartRef = useRef();
  useEffect(() => {
    let chart;
    import('chart.js/auto').then(() => {
      fetch('/api/feedback/stats')
        .then(res => res.json())
        .then(({ counts }) => {
          if (!chartRef.current) return;
          const Chart = window.Chart;
          chart = new Chart(chartRef.current, {
            type: 'bar',
            data: {
              labels: ['1星', '2星', '3星', '4星', '5星'],
              datasets: [{
                label: '评分分布',
                data: counts,
                backgroundColor: '#42b983'
              }]
            }
          });
        });
    });
    return () => { if (chart) chart.destroy(); };
  }, []);
  return <canvas ref={chartRef} width={600} height={300} />;
}
