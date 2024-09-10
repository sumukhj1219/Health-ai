import React from 'react'
import ChartComponent from './components/dashboard-chart'
import DashboardCardComponent from './components/dashboard-cards-1'
import DashboardCardComponentTwo from './components/dashboard-cards-2'
import DailyTaksComponent from './components/dailyTasks'

const DashboardPage = () => {
  return (
    <div className='grid grid-cols-5 gap-2 m-2 md:grid-cols-10'>
      <div className='col-start-1 col-span-5 md:col-start-1 md:col-span-4'>
      <ChartComponent />
      </div>
      <div className='col-start-1 col-span-5 md:col-start-5 md:col-span-10'>
      <DailyTaksComponent/>
      </div>
    </div>
  )
}

export default DashboardPage
