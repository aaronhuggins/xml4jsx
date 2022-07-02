/* @jsx x */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://esm.sh/preact@10.8.1"
import { createXMLHandler, xml } from "../mod.ts"

const x = createXMLHandler(h)

export function Preact () {
  return (
    <doc>
      <title>Preact!</title>
      <link>https://preactjs.com/</link>
      <namespaceComponent></namespaceComponent>
    </doc>
  )
}

xml(Preact, { namespaceComponent: "namespace:component" })
