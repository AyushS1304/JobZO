import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header.jsx'  
import '../App.css'

const AppLayout = () => {
  return (
      <div>
        <div className="grid-background"></div>
        <main className="min-h-screen container pl-16 pr-16 ml-auto mr-auto " >
          <Header />
          <Outlet />
        </main>
        <div>
          <footer className=" p=10 text-center bg-gray-800 mt-10">Made by Ayush Sharma</footer>
        </div>
      </div>
  )
}

export default AppLayout