import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const OverviewChart = ({ data, period }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Destroy chart on unmount
  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  // Create or update chart when data or period changes
  useEffect(() => {
    if (!chartRef.current) return;
    
    // If we already have a chart, destroy it
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Penghasilan',
            data: data.earnings,
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#6366F1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: 'Proyek',
            data: data.projects,
            borderColor: '#EC4899',
            backgroundColor: 'rgba(236, 72, 153, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#EC4899',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              font: {
                family: "'Sora', sans-serif",
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            titleFont: {
              family: "'Outfit', sans-serif",
              size: 13,
              weight: 'bold',
            },
            bodyFont: {
              family: "'Sora', sans-serif",
              size: 12,
            },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  if (context.datasetIndex === 0) {
                    label += new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(context.parsed.y);
                  } else {
                    label += context.parsed.y;
                  }
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "'Sora', sans-serif",
                size: 11,
              },
            },
          },
          y: {
            grid: {
              borderDash: [2, 4],
              color: 'rgba(226, 232, 240, 0.8)',
            },
            ticks: {
              font: {
                family: "'Sora', sans-serif",
                size: 11,
              },
              callback: function(value) {
                return value >= 1000 ? value / 1000 + 'K' : value;
              }
            },
            beginAtZero: true,
          }
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
      }
    });
    
    setChartInstance(newChartInstance);
    
  }, [data, period]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Ikhtisar Pendapatan</h3>
        <div className="mt-3 sm:mt-0 flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button 
            className={`px-3 py-1 text-sm rounded-md transition ${period === 'week' ? 'bg-white shadow text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => {}}
          >
            Minggu
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition ${period === 'month' ? 'bg-white shadow text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => {}}
          >
            Bulan
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition ${period === 'year' ? 'bg-white shadow text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => {}}
          >
            Tahun
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="h-80">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default OverviewChart;
