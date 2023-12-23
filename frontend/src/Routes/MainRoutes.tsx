import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'

import Courses from '../Pages/Courses'
import SingleInterviewPage from '../Pages/SingleInterviewPage'


const MainRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
           <Route path="/interview" element={<Courses />} />
            <Route path="/interview/:id" element={<SingleInterviewPage />} />
          
        </Routes>
    </>
  )
}

export default MainRoutes