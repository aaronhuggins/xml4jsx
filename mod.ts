// deno-lint-ignore-file no-explicit-any
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [element: string]: any;
    }
  }
}

/** A Mix-in type for components marked as XML. */
export type XMLComponent<T = any> = T & {
  __isXML: boolean;
  __expr: [string, string][];
};
type Renderer = (...args: any[]) => string;
type JSXHandler = (...args: any[]) => any;

const selfClosing = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];
const regex = `<(\\/{0,1})purexml(${selfClosing.join("|")})`;

/** Mark a JSX function or class as XML, and optionally provide a map of tag expressions.
 * @param component - A JSX component to be marked as XML.
 * @param tagExpressions - An object map of tags within the component to their replacement tag; intended for xml namespace tags.
 */
export function xml<T = any>(
  component: T,
  tagExpressions?: Record<string, string>,
): XMLComponent<T> {
  (component as any).__isXML = true;
  (component as any).__expr = Object.entries(tagExpressions ?? {});

  return component as any;
}

/** Create a handler for XML components, wrapping the passed `h` function.
 * @param h - A JSX transform handler function, like `createElement` in React.
 */
export function createXMLHandler<T extends JSXHandler>(h: T): T {
  const marker: JSXHandler = (...args: any[]): any => {
    const tagOrComponent = args[0];
    if (selfClosing.includes(tagOrComponent)) {
      args[0] = `purexml${tagOrComponent}`;
    }

    return h(...args);
  };

  return marker as T;
}

/** Create a server-side renderer with support for XML components.
 * @param renderSSR - A JSX server renderer function, like Preact's `render-to-string`.
 * @param declaration - An optional XML declaration, e.g. `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>`.
 */
export function createXMLRenderer<T extends Renderer>(
  renderSSR: T,
  declaration?: string,
): T {
  const renderer: Renderer = (...args: any[]): string => {
    const component = args[0];
    if (
      component?.__isXML || component?.component?.__isXML ||
      component?.type?.__isXML
    ) {
      const expressions: [string, string][] = component?.__expr ??
        component?.component?.__expr ?? component?.type?.__expr ?? [];
      let rendered = renderSSR(...args).replaceAll(
        new RegExp(regex, "gu"),
        "<$1$2",
      );

      for (const [tagName, replacement] of expressions) {
        rendered = rendered.replaceAll(
          new RegExp(`<(\\/{0,1})${tagName}`, "gu"),
          `<$1${replacement}`,
        );
      }

      return (declaration ?? "") + rendered;
    }

    return renderSSR(...args);
  };

  return renderer as any;
}
