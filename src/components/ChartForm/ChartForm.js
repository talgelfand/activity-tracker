import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'
import { ChartFormWrapper } from './ChartForm.style'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartForm = () => {
  const labels = ['26.04', '27.04', '28.04']
  const caloriesData = [300, 600, 500]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  const data = {
    labels,
    datasets: [
      {
        data: caloriesData,
        borderWidth: 6,
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
    ],
  }

  return (
    <ChartFormWrapper>
      <Line data={data} options={options} />
    </ChartFormWrapper>
  )
}

export default ChartForm
