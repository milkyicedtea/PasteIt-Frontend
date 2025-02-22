import {AppShell} from "@mantine/core"
import {HomeMainContent} from "@local/components/HomeMainContent.tsx"
import {Footer} from "@local/components/Footer.tsx"

export default function HomePage() {
  return (
    <AppShell>
      <HomeMainContent />
      <Footer />
    </AppShell>
  )
}