/* @jsx x */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { createElement } from "https://esm.sh/react@18.2.0"
import { createXMLHandler, xml } from "../mod.ts"

const x = createXMLHandler(createElement)

export function React () {
  return (
    <doc>
      <title>React!</title>
      <link>https://reactjs.org/</link>
      <namespaceComponent></namespaceComponent>
    </doc>
  )
}

xml(React, { namespaceComponent: "namespace:component" })
