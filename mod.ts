// deno-lint-ignore-file no-explicit-any
export type XMLComponent<T = any> = T & { __isXML: boolean; __expr: [string, string][] }
export type Renderer = (...args: any[]) => string
export type JSXHandler = (...args: any[]) => any

const selfClosing = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]
const regex = `<(\\/{0,1})purexml(${selfClosing.join('|')})`

/** Mark a JSX function or class as XML, and optionally provide a map of tag expressions. */
export function xml<T = any> (component: T, tagExpressions?: Record<string, string>): XMLComponent<T> {
  (component as any).__isXML = true;
  (component as any).__expr = Object.entries(tagExpressions ?? {});

  return component as any
}

/** Create a handler for XML components, wrapping the passed `h` function. */
export function createXMLHandler<T extends JSXHandler> (h: T): T {
  const marker: JSXHandler = (...args: any[]): any => {
    const tagOrComponent = args[0]
    if (selfClosing.includes(tagOrComponent)) args[0] = `purexml${tagOrComponent}`

    return h(...args)
  }

  return marker as T
}

/** Create a server-side renderer with support for XML components. */
export function createXMLRenderer<T extends Renderer>(renderSSR: T, declaration?: string): T {
  const renderer: Renderer = (...args: any[]): string => {
    const component = args[0]
    if (component?.__isXML || component?.component?.__isXML) {
      const expressions: [string, string][] = component?.__expr ?? component?.component?.__expr ?? []
      let rendered = renderSSR(...args).replaceAll(new RegExp(regex, 'gu'), '<$1$2')
  
      for (const [tagName, replacement] of expressions) {
        rendered = rendered.replaceAll(new RegExp(`<(\\/{0,1})${tagName}`, 'gu'), `<$1${replacement}`)
      }

      return (declaration ?? '') + rendered
    }

    return renderSSR(...args)
  }

  return renderer as any
}
