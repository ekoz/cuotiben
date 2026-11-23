import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import texmath from 'markdown-it-texmath'
import katex from 'katex'

const configDir = path.dirname(fileURLToPath(import.meta.url))
const notesDir = path.resolve(configDir, '../notes')
const SEMESTER_PATTERN = /^\d{4}-[春秋]$/

function listDirectories(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

function firstHeading(file: string): string | null {
  const text = fs.readFileSync(file, 'utf8')
  const match = text.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function encodePath(...segments: string[]): string {
  return '/' + segments.map((segment) => encodeURIComponent(segment)).join('/')
}

function tokenizeMixed(text: string): string[] {
  const latin = text.match(/[a-zA-Z0-9]+/g) ?? []
  const han = text.match(/[一-鿿]/g) ?? []
  return [...latin.map((token) => token.toLowerCase()), ...han]
}

type RenderRule = (tokens: unknown[], idx: number, options: unknown, env: unknown, self: unknown) => string

interface MarkdownRenderer {
  renderer: { rules: Record<string, RenderRule | undefined> }
}

// KaTeX 输出的是完整 HTML 片段；用 v-pre 让 Vue 跳过编译，SSG 才能把公式写进静态页面。
function wrapKatexOutput(md: MarkdownRenderer): void {
  const rules: [string, string][] = [
    ['math_inline', 'span'],
    ['math_inline_double', 'span'],
    ['math_block', 'div'],
    ['math_block_eqno', 'div']
  ]
  for (const [rule, tag] of rules) {
    const original = md.renderer.rules[rule]
    if (!original) {
      continue
    }
    md.renderer.rules[rule] = (tokens, idx, options, env, self) =>
      `<${tag} class="math-tex" v-pre>${original(tokens, idx, options, env, self)}</${tag}>`
  }
}

function buildSidebar(): { text: string; items: { text: string; items: { text: string; link: string }[] }[] }[] {
  return listDirectories(notesDir).map((subject) => {
    const subjectDir = path.join(notesDir, subject)
    const semesters = listDirectories(subjectDir).filter((name) => SEMESTER_PATTERN.test(name))
    const groups = semesters
      .map((semester) => {
        const semesterDir = path.join(subjectDir, semester)
        const notes = fs
          .readdirSync(semesterDir, { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md')
          .map((entry) => {
            const file = path.join(semesterDir, entry.name)
            return {
              text: firstHeading(file) ?? path.basename(entry.name, '.md'),
              link: encodePath(subject, semester, path.basename(entry.name, '.md')),
              fileName: entry.name
            }
          })
          .sort((a, b) => a.fileName.localeCompare(b.fileName))
          .map(({ text, link }) => ({ text, link }))
        return { text: semester, items: notes }
      })
      .filter((group) => group.items.length > 0)
    return { text: subject, items: groups }
  })
    .filter((group) => group.items.length > 0)
}

export default defineConfig({
  lang: 'zh-CN',
  title: '个人纠错本',
  description: '语文、数学、英语错题积累',
  base: process.env.VITEPRESS_BASE || '/',
  srcDir: 'notes',
  srcExclude: ['_templates/**'],
  themeConfig: {
    nav: listDirectories(notesDir).map((subject) => ({
      text: subject,
      link: encodePath(subject) + '/'
    })),
    sidebar: buildSidebar(),
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: tokenizeMixed
          },
          searchOptions: {
            prefix: true,
            fuzzy: 0.2
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一题',
      next: '下一题'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题'
  },
  markdown: {
    config: (md) => {
      md.use(texmath, {
        engine: katex,
        delimiters: 'dollars',
        katexOptions: { throwOnError: false }
      })
      wrapKatexOutput(md as unknown as MarkdownRenderer)
    }
  }
})
