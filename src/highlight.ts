import { ShikiTransformer } from "@shikijs/types";

export default function transformerFigcaption ():ShikiTransformer {
  return {
    postprocess(html, options) {
      return `
      <figure class="highlight">
      <figcaption data-lang=${options.lang}></figcaption>
      ${html}
      </figure>
      `
    },
  }
}