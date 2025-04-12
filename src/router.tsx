import {createRootRoute, createRoute, createRouter} from "@tanstack/react-router";
import { lazy } from 'react'
// import {default as HomePage} from '@local/pages/Home'
// import {default as PastePage} from '@local/pages/Paste'

const HomePage = lazy(() => import("@local/pages/Home.tsx"))
const PastePage = lazy(() => import("@local/pages/Paste.tsx"))

const rootRoute = createRootRoute()

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

const pageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$id",
  component: PastePage,
})

const routeTree = rootRoute.addChildren([homeRoute, pageRoute])
const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export {router}