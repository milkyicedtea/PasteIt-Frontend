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

export async function getLanguageExtension(language: string) {
  switch (language) {
    case 'cpp': {
      const mod = await import('@codemirror/lang-cpp')
      return mod.cpp()
    }
    case 'go': {
      const mod = await import('@codemirror/lang-go')
      return mod.go()
    }
    case 'html': {
      const mod = await import('@codemirror/lang-html')
      return mod.html()
    }
    case 'java': {
      const mod = await import('@codemirror/lang-java')
      return mod.java()
    }
    case 'javascript': {
      const mod = await import('@codemirror/lang-javascript')
      return mod.javascript()
    }
    case 'markdown': {
      const mod = await import('@codemirror/lang-markdown')
      return mod.markdown()
    }
    case 'php': {
      const mod = await import('@codemirror/lang-php')
      return mod.php()
    }
    case 'python': {
      const mod = await import('@codemirror/lang-python')
      return mod.python()
    }
    case 'rust': {
      const mod = await import('@codemirror/lang-rust')
      return mod.rust()
    }
    case 'sql': {
      const mod = await import('@codemirror/lang-sql')
      return mod.sql()
    }
    default:
      return []
  }
}