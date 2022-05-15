import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ChartFormWrapper } from './ActivitiesChart.style'
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
        display: true,
        text: 'Calories burnt on the following dates',
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
        pointBorderColor: 'rgb(120, 156, 106)',
        borderColor: 'rgba(120, 156, 106, 0.5)',
        backgroundColor: 'rgba(120, 156, 106, 0.5)',
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
