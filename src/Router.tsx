import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {HomePage} from "@local/pages/Home.page.tsx"
import {PastePage} from "@local/pages/Paste.page.tsx"

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