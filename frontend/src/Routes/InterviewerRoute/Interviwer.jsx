import React from 'react'

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Feedbackpage from '../../Pages/Interviewer/Feedbackpage';
export default function Interviwer() {

  return (
    <>
    
    <Routes>
    <Route  path='/feedback' element={<Feedbackpage/>}/>
    </Routes>
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
