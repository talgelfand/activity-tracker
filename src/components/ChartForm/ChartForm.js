import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ChartFormWrapper } from './ChartForm.style'
import fetchActivitiesFromDatabase from '../../firebase/utils/fetchActivitiesFromDatabase'
import { auth } from '../../firebase/config'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ChartForm = () => {
  const currentUser = auth.currentUser

  const [labels, setLabels] = useState([])
  const [caloriesData, setCaloriesData] = useState([])

  useEffect(() => {
    fetchActivitiesFromDatabase(currentUser.email).then((res) => {
      const chartData = {
        labels: [],
        calories: [],
      }

      res.activities.forEach((activity) => {
        chartData.calories.push(activity.calories)
        chartData.labels.push(activity.currentDate)
      })

      setLabels(chartData.labels)
      setCaloriesData(chartData.calories)
    })
  }, [])

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
        beginAtZero: true,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        data: caloriesData,
        borderWidth: 6,
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
