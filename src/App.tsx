import '@mantine/core/styles.css'

import {AppShell, MantineProvider} from '@mantine/core'
import {theme} from "./theme.ts"

import {RouterProvider} from "@tanstack/react-router";
import {router} from "@local/router.tsx";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme={'auto'}>
      <AppShell footer={{ height: "3rem" }}>
        <RouterProvider router={router} />
      </AppShell>
    </MantineProvider>
  )
}