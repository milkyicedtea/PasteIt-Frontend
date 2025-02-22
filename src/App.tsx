import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { Router } from './Router.tsx'
import {theme} from "./theme.ts"

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme={'auto'}>
      <Router />
    </MantineProvider>
  )
}