import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'python',
        'bash',
        'json',
        'css',
        'html',
        'markdown',
        'yaml',
        'sql',
        'php',
        'java',
        'go',
        'rust',
        'swift',
        'kotlin',
        'dart',
        'c',
        'cpp',
        'csharp',
        'ruby',
        'lua',
        'r',
        'scala',
        'clojure',
        'elixir',
        'haskell',
        'ocaml',
        'perl',
        'powershell',
        'shell',
        'diff',
        'dockerfile',
        'graphql',
        'prisma',
        'nginx',
        'apache',
        'xml',
        'vue',
        'svelte',
        'astro'
      ]
    })
  }
  return highlighter
}

export async function highlightCode(
  code: string, 
  lang: string = 'text',
  theme: 'light' | 'dark' = 'dark'
): Promise<string> {
  try {
    const highlighter = await getHighlighter()
    const themeName = theme === 'dark' ? 'github-dark' : 'github-light'
    
    return highlighter.codeToHtml(code, {
      lang,
      theme: themeName,
      transformers: [
        {
          pre(node) {
            this.addClassToHast(node, 'shiki-pre')
            node.properties.style = ''
            node.properties['data-theme'] = themeName
          },
          code(node) {
            this.addClassToHast(node, 'shiki-code')
          }
        }
      ]
    })
  } catch (error) {
    console.warn(`Failed to highlight code with language "${lang}":`, error)
    // Fallback to plain text
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}