/* @jsx createElement */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { createElement } from "https://esm.sh/react@18.2.0";
import { createXMLRenderer } from "../mod.ts";
import { renderToString } from "https://esm.sh/react-dom@18.2.0/server";
import { React } from "./react.tsx";
import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";

Deno.test("React XML", () => {
  const expected =
    "<doc><title>React!</title><link>https://reactjs.org/</link><namespace:component></namespace:component></doc>";
  const renderXML = createXMLRenderer(renderToString);

  assertEquals(renderXML(<React />), expected);
});
