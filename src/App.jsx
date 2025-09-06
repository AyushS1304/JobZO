
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Layouts/app-layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Onboarding from './pages/onboarding.jsx'
import JobListing from './pages/job-listing.jsx'
import JobPage from './pages/job.jsx'
import PostJob from './pages/post-job.jsx'
import SavedJob from './pages/saved-jobs.jsx'
import MyJobs from './pages/my-jobs.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'
import { Protect } from '@clerk/clerk-react'
import ProtectedRoute from './components/protected-route.jsx'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/Onboarding',
        element:(
        <ProtectedRoute>
         <Onboarding />
        </ProtectedRoute>),
      },
      {
        path: '/jobs',
        element:(
         <ProtectedRoute>
          <JobListing />
          </ProtectedRoute>),
      },
      {
        path: '/job/:id',
        element: (<ProtectedRoute><JobPage /></ProtectedRoute>),
      },
      {
        path: '/post-job',
        element: (<ProtectedRoute><PostJob /></ProtectedRoute>),
      },
      {
        path: '/saved-jobs',
        element:(<ProtectedRoute><SavedJob /></ProtectedRoute>),
      },
      {
        path: '/my-jobs',
        element: (<ProtectedRoute>
          <MyJobs />
          </ProtectedRoute>),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      
    </ThemeProvider>
  )
}

export default App
