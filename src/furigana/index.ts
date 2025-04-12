import { MarkdownItAsync } from "markdown-it-async"
import furigana from "./furigana"

export default function (md: MarkdownItAsync, options?) {
  md.inline.ruler.push('furigana', furigana(options))
}
