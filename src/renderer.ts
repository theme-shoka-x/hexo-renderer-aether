import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import { transformerMetaHighlight, transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight } from '@shikijs/transformers'
import { MarkdownItAsync } from 'markdown-it-async'
import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async'
import { codeToHtml } from 'shiki'
import type { StoreFunctionData } from 'hexo/dist/extend/renderer'

import markdownItAbbr from 'markdown-it-abbr'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItBracketedSpans from 'markdown-it-bracketed-spans'
import markdownItDeflist from 'markdown-it-deflist'
import { full as markdownItEmoji } from 'markdown-it-emoji'
import markdownItIns from 'markdown-it-ins'
import markdownItMark from 'markdown-it-mark'
import markdownItMultimdTable from 'markdown-it-multimd-table'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownItTaskCheckBox from 'markdown-it-task-checkbox'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor'
import markdownItSpoiler from './spoiler'
import container from './container'
import excerpt from './excerpt'
import katex from './katex'
import furigana from './furigana/index'

const md = new MarkdownItAsync({
  warnOnSyncRender: true,
  html: false,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: false,
  quotes: "“”‘’",
})

md.use(
  fromAsyncCodeToHtml(
    codeToHtml,
    {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
        transformerColorizedBrackets()
      ]
    },
  )
)

md.use(markdownItAbbr)
markdownItAttrs(md as any)
md.use(markdownItBracketedSpans)
md.use(markdownItDeflist)
md.use(markdownItEmoji)
md.use(markdownItIns)
md.use(markdownItMark)
md.use(markdownItMultimdTable, {
  multiline: true,
  rowspan: true,
  headerless: true
})
md.use(markdownItSub)
md.use(markdownItSup)
md.use(markdownItTaskCheckBox)
md.use(markdownItTocAndAnchor, {
  tocClassName: "toc",
  anchorClassName: "anchor"
})
md.use(markdownItSpoiler, {
  title: "你知道得太多了"
})
container(md)
md.use(excerpt)
md.use(katex)
furigana(md, {fallbackParens: "()"})


export default async function (data: StoreFunctionData) {
  if (!data.text) {
    return ''
  }
  return await md.renderAsync(data.text)
}