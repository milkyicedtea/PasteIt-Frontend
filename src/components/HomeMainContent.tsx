import {AppShell, Button, Container, Select, Text, TextInput, useMantineColorScheme} from "@mantine/core"
import { useState } from "react"
import {api} from "@local/hooks/api.ts"
import ReactCodeMirror from "@uiw/react-codemirror"
import {EditorView} from "@codemirror/view"
import {getLanguageExtension, languageOptions} from "@local/hooks/codeHighlitghting.ts"
import {useNavigate} from "react-router-dom"
import {InfoIcon} from "@primer/octicons-react"

const MAX_SIZE_MB = 1
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

declare global {
  interface Window {
    grecaptcha: any
  }
}

export function HomeMainContent() {
  const {colorScheme} = useMantineColorScheme()
  const [name, setName] = useState<string | null>(null)
  const [pasteValue, setPasteValue] = useState<string>('')
  const [language, setLanguage] = useState<string>('plaintext')
  const navigate = useNavigate()

  async function sendPaste() {
    try {
        // Use ready() as a callback
        const token = await new Promise((resolve, reject) => {
            window.grecaptcha.ready(async () => {
                try {
                    const token = await window.grecaptcha.execute(
                        '6Lc2kt8qAAAAAPkH_NEseMoH2pRVOfwShCABIJcU',
                        {action: 'submit'}
                    );
                    resolve(token);
                } catch (err) {
                    reject(err);
                }
            });
        });

        // console.log(token)

        const pasteSize = new Blob([pasteValue]).size;
        if (pasteSize > MAX_SIZE_BYTES) {
            alert(`Your paste is too large (${MAX_SIZE_BYTES / 1024 / 1024}MB)\nMaximum size is ${MAX_SIZE_MB}MB`);
            return;
        }

        // console.log("Sending data:", {
        //   name: name,
        //   paste: pasteValue,
        //   language: language,
        //   recaptchaToken: token,
        // });

        const response = await api.post('/pastes/paste', {
            name: name,
            paste: pasteValue,
            language: language,
            recaptchaToken: token,
        });

        if (response.status === 200) {
          // console.log('200')
            setPasteValue('');
            navigate(response.data.shortId);
        } else {
            alert(response.data.message || 'An error occurred');
        }
    } catch (error) {
        console.error("Error:", error);
        alert('An error occurred');
    }
  }

  return (
    <AppShell.Main>
      <Container
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Text
          gradient={{ from: 'orange', to: 'grape', deg: 90 }} variant={'gradient'}
          fw={400} style={{ paddingTop: '3%', paddingBottom: '2.5%', fontSize: '2rem', textAlign: 'center' }}
          onClick={() => navigate("/")}
        >
          PasteIt
        </Text>
      </Container>

      <Container style={{ display: "flex", flexDirection: "column", width: '100%', height: '80%' }}>
        <Select
          data={languageOptions}
          value={language}
          onChange={(value) => setLanguage(value || 'plaintext')}
          style={{ marginBottom: '.25rem', width: '10rem' }}
          placeholder="Select language"
        />

        <Container
          style={{
            margin: 0,
            display: "flex",
            padding: "16px",
            backgroundColor: "rgba(84,174,255,0.1)",
            borderLeft: "4px solid #54aeff",
            marginBottom: '.5rem',
            placeSelf: 'start',
          }}
        >

          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            {/*@ts-expect-error - style not getting detected but gets picked up..*/}
            <InfoIcon style={{color: "#54aeff"}}/>
            <Text>PasteIt snippets are currently limited to 1MB each, and users are rate limited to 5 snippets per day :)</Text>
          </div>
        </Container>


        <ReactCodeMirror
          value={pasteValue}
          onChange={(e) => setPasteValue(e)}
          height={"25.75rem"}
          placeholder="PasteIt here..."
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            foldGutter: true,
            bracketMatching: true,
            indentOnInput: true
          }}
          theme={colorScheme ? "dark" : "light"}
          style={{
            fontFamily: "Consolas, Monaco, Lucida Console, Liberation Mono, Courier New",
          }}
          extensions={[
            EditorView.lineWrapping,
            getLanguageExtension(language),
          ]}
        />

        <Text style={{marginTop: '1rem'}}>Paste Name:</Text>
        <TextInput
          value={name ? name : ""}
          placeholder={'New PasteIt..'}
          style={{marginTop: '.25rem', width: "8rem"}}
          onChange={(e) => setName(e.target.value)}
        />
        <Container style={{ display: "flex", flexDirection: "row", width: '100%', marginTop: '.5rem',
          gap: '.5rem', padding: 0, marginBottom: '4rem'
        }}>
          <Button variant={'light'}
            onClick={() => sendPaste()}>
            PasteIt!
          </Button>

          <Button variant={'light'}
            onClick={() => setPasteValue('')}>
            Clear
          </Button>
        </Container>
      </Container>
    </AppShell.Main>
  )
}
