import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { lazy } from 'react'

const HomePage = lazy(() => import("@local/pages/Home.page.tsx"))
const PastePage = lazy(() => import("@local/pages/Paste.page.tsx"))

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/:id',
    element: <PastePage/>
  }
])

export function Router() {
  return <RouterProvider router={router}/>
}