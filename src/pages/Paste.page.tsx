import {AppShell} from "@mantine/core"
import {PasteMainContent} from "@local/components/PasteMainContent.tsx"
import {Footer} from "@local/components/Footer.tsx"

export default function PastePage() {
  return (
    <AppShell>
      <PasteMainContent />
      <Footer />
    </AppShell>
  )
}