/* @jsx x */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://deno.land/x/nano_jsx@v0.0.32/mod.ts";
import { createXMLHandler, xml } from "../mod.ts";

const x = createXMLHandler(h);

export function NanoJSX() {
  return (
    <doc>
      <title>Nano JSX!</title>
      <link>https://nanojsx.io/</link>
      <namespaceComponent></namespaceComponent>
    </doc>
  );
}

xml(NanoJSX, { namespaceComponent: "namespace:component" });
