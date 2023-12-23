import React from 'react'
import { Routes,Route } from 'react-router-dom'


// import InterviewPage from '../Pages/InterviewPage'
import HomePage from '../Pages/HomePage'
import Dashboard from '../Pages/Dashboard'
import SingleInterviewPage from '../Pages/SingleInterviewPage'
import Courses from '../Pages/Courses'
// import ReportPage from '../Pages/InterviewPage'


const MainRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />          
           {/* <Route path='/report/:id' element={<ReportPage />}/> */}
           <Route path="/interview" element={<Courses />} />
            <Route path="/interview/:id" element={<SingleInterviewPage />} />
          
        </Routes>
    </>
  )
}

export default MainRoutes