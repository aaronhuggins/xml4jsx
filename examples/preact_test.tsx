/* @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://esm.sh/preact@10.8.1"
import { createXMLRenderer } from "../mod.ts"
import { render } from "https://esm.sh/preact-render-to-string@5.2.0?deps=preact@10.8.1"
import { Preact } from "./preact.tsx";
import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts"

Deno.test("Preact XML", () => {
  const expected = '<doc><title>Preact!</title><link>https://preactjs.com/</link><namespace:component></namespace:component></doc>'
  const renderXML = createXMLRenderer(render)

  assertEquals(renderXML(<Preact />), expected)
})
