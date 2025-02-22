import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {api} from "@local/hooks/api.ts"
import {Button, Container, Text} from "@mantine/core"
import {EditorView} from "@codemirror/view"
import ReactCodeMirror from "@uiw/react-codemirror"
import {getLanguageExtension, getLanguageLabel} from "@local/hooks/codeHighlitghting.ts"

interface PasteResponse {
  name: string
  paste: string
  language: string
  createdAt: Date
}

export function PasteMainContent() {
  const { id } = useParams()
  const [paste, setPaste] = useState<PasteResponse | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadPaste() {
      try {
        const response = await api.get<PasteResponse>(`/pastes/paste/${id}`)
        setPaste(response.data)
      } catch (error) {
        console.error('Failed to load paste:', error)
      }
    }
    void loadPaste()
  }, [id])

  return (
    <>
      <Container
        style={{ display: "flex", flexDirection: "column", width: '100%', height: '80%'}}
      >
        {paste ? (
          <>
            <Container
              style={{ display: "flex", flexDirection: "column", height: '80%', paddingTop: '4%'}}
            >
              <Text
                gradient={{ from: 'orange', to: 'grape', deg: 90 }} variant={'gradient'}
                fw={400} style={{ paddingTop: '3%', paddingBottom: '2.5%', fontSize: '2rem', textAlign: 'center' }}
                onClick={() => navigate("/")}
              >
                PasteIt
              </Text>
            </Container>

            <Text size="xl" fw={700} style={{ marginBottom: '.5rem' }}>
              Viewing Paste: {paste.name}
            </Text>

            <Text size="lg" fw={400}>
              Created on: {new Date(paste.createdAt).toLocaleString()}
            </Text>
            <Text size="lg" fw={400} style={{marginBottom: '1rem'}}>
              Marked as: {getLanguageLabel(paste.language)}
            </Text>
            <ReactCodeMirror
              value={paste.paste}
              height="32rem"
              editable={false}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
              }}
              theme="dark"
              style={{
                fontFamily: "Consolas, Monaco, Lucida Console, Liberation Mono, Courier New",
              }}
              extensions={[
                EditorView.lineWrapping,
                getLanguageExtension(paste.language)
              ]}
              contentEditable={false}
            />
            <Button
              style={{width: '9rem', marginTop: '.75rem', marginLeft: '.5rem'}}
              variant={'light'}
              fw={400}
              onClick={() => navigate("/")}
            >
              Back to home
            </Button>
          </>
        ) : (
          <>
            <Text size="xl" fw={700} style={{marginBottom: '.5rem'}}>Could not find paste with id {id}</Text>
            <Button
              variant={'light'}
              fw={400}
              onClick={() => navigate("/")}
              style={{width: '9rem'}}
            >
              Back to home
            </Button>
          </>
        )}
      </Container>
    </>
  )
}