import {EditorView} from "@codemirror/view";
import ReactCodeMirror, {BasicSetupOptions} from "@uiw/react-codemirror";
import {getLanguageExtension} from "@local/hooks/codeHighlitghting.ts";
import {useMantineColorScheme} from "@mantine/core";
import {useEffect, useState} from "react";

interface Props {
  value: string
  onChange?: (value: string) => void
  language: string
  editable?: boolean
  height?: string
  placeholder?: string
  basicSetup?: boolean | BasicSetupOptions | undefined
}

function CodeEditor({ value, onChange, editable = true, language, height, placeholder, basicSetup }: Props) {
  const {colorScheme} = useMantineColorScheme()
  const [extension, setExtension] = useState<any>([])
  
  useEffect(() => {
    let cancelled = false

    async function loadExtension() {
      const ext = await getLanguageExtension(language)
      if (!cancelled) {
        setExtension(ext)
      }
    }

    void loadExtension()

    return () => {
      cancelled = true
    }
  }, [language])

  return (
    <ReactCodeMirror
      value={value}
      onChange={onChange}
      height={height}
      editable={editable}
      basicSetup={basicSetup}
      placeholder={placeholder}
      theme={
        colorScheme === "dark"
          ? "dark"
        : colorScheme === "light"
          ? "light"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      }
      style={{
        fontFamily: "Consolas, Monaco, Lucida Console, Liberation Mono, Courier New",
      }}
      extensions={[
        EditorView.lineWrapping,
        ...(Array.isArray(extension) ? extension : [extension])
      ]}
    />
  )
}

export default CodeEditor
