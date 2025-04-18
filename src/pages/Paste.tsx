import {AppShell} from "@mantine/core"
import {Footer} from "@local/components/Footer.tsx"
import {Header} from "@local/components/Header.tsx"
import {useNavigate, useParams} from "@tanstack/react-router"
import {lazy, useEffect, useState} from "react"
import {api} from "@local/hooks/api.ts"
import {Button, Container, Text} from "@mantine/core"
import {getLanguageLabel} from "@local/hooks/codeHighlitghting.ts"
import '@mantine/core/styles.css'

const CodeEditor = lazy(() => import("@local/components/CodeEditor.tsx"))

interface PasteResponse {
  name: string
  paste: string
  language: string
  createdAt: Date
}

export default function Paste() {
  const { id } = useParams({strict: false})
  const [paste, setPaste] = useState<PasteResponse | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadPaste() {
      try {
        const response = await api.get<PasteResponse>(
          `/pastes/paste/${id}`,
        )
        setPaste(response.data)
      } catch (error) {
        console.error('Failed to load paste:', error)
      }
    }
    void loadPaste()
  }, [id])

  return (
    <>
      <Header/>
      <AppShell.Main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 60px)",
          paddingBottom: '3rem',
          overflow: "auto", // Ensure the main content is scrollable
        }}
      >
        <Container style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
          {paste ? (
            <>
              <Text size="xl" fw={700} style={{ marginBottom: '.5rem', marginTop: '5%' }}>
                Viewing Paste: {paste.name}
              </Text>

              <Text size="lg" fw={400}>
                Created on: {new Date(paste.createdAt).toLocaleString()}
              </Text>

              <Text size="lg" fw={400} style={{marginBottom: '1rem'}}>
                Marked as: {getLanguageLabel(paste.language)}
              </Text>

              <CodeEditor
                value={paste.paste}
                language={paste.language}
                height="min(32rem, 70vh)"
                editable={false}
              />

              <Button
                style={{width: '9rem', marginTop: '.75rem', marginLeft: '.5rem', marginBottom: '.5rem'}}
                variant={'light'}
                fw={400}
                onClick={() => navigate({to: "/"})}
              >
                Back to home
              </Button>
            </>
          ) : (
            <>
              <Container style={{margin: 0, padding: 0, marginTop: "5%"}}>
                <Text size="xl" fw={700} style={{marginBottom: '.5rem'}}>Could not find paste with id {id}</Text>
                <Button
                  style={{width: '9rem', marginTop: '.75'}}
                  variant={'light'}
                  fw={400}
                  onClick={() => navigate({to: "/"})}
                >
                  Back to home
                </Button>
              </Container>
            </>
          )}
        </Container>
      </AppShell.Main>
      <Footer/>
    </>
  )
}
