import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ChartFormWrapper } from './ChartForm.style'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
  }

  const data = {
    labels,
    datasets: [
      {
        data: caloriesData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div>
      <ChartFormWrapper>
        <Bar data={data} options={options} />
      </ChartFormWrapper>
    </div>
  )
}

export default ChartForm
