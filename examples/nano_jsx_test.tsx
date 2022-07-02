/* @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.32/mod.ts";
import { createXMLRenderer } from "../mod.ts";
import { NanoJSX } from "./nano_jsx.tsx";
import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";

Deno.test("Nano JSX XML", () => {
  const expected =
    "<doc><title>Nano JSX!</title><link>https://nanojsx.io/</link><namespace:component></namespace:component></doc>";
  const renderXML = createXMLRenderer(renderSSR);

  assertEquals(renderXML(<NanoJSX />), expected);
});
