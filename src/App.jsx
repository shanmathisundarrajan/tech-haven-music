import React from 'react'
import "./style.css"
import { RouterProvider } from 'react-router-dom'
import Myroutes from './Routes/Routes'
import { Toaster } from 'react-hot-toast'
import { FaRegFaceAngry } from 'react-icons/fa6'

const App = () => {
  return <>
  <Toaster/>
<RouterProvider router={Myroutes}>
    
</RouterProvider> </>
}

export default App
