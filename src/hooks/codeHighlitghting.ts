import {cpp} from "@codemirror/lang-cpp"
import {go} from "@codemirror/lang-go"
import {html} from "@codemirror/lang-html"
import {java} from "@codemirror/lang-java"
import {javascript} from "@codemirror/lang-javascript"
import {markdown} from "@codemirror/lang-markdown"
import {php} from "@codemirror/lang-php"
import {python} from "@codemirror/lang-python"
import {rust} from "@codemirror/lang-rust"
import {sql} from "@codemirror/lang-sql"

export const languageOptions = [
  { value: 'plaintext', label: 'Plain Text' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'html', label: 'HTML' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
]

export function getLanguageLabel(value: string) {
  return languageOptions.find(lang => lang.value === value)?.label || "Plain Text"
}

export function getLanguageExtension(language: string) {
  switch (language) {
    case 'cpp':
      return cpp()
    case 'go':
      return go()
    case 'html':
      return html()
    case 'java':
      return java()
    case 'javascript':
      return javascript()
    case 'markdown':
      return markdown()
    case 'php':
      return php()
    case 'python':
      return python()
    case 'rust':
      return rust()
    case 'sql':
      return sql()
    default:
      return []
  }
}