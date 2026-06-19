# libwps-js — Pure JavaScript WPS Office `.wps` File Parser & DOCX Converter

[English](README.md) | [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)](package.json)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Format](https://img.shields.io/badge/format-.wps-orange.svg)](#supported-path)
[![Tests](https://img.shields.io/badge/tests-node--test-brightgreen.svg)](#tests)

A pure JavaScript (no native dependencies) reader and text extractor for **WPS
Office `.wps` files** that are stored as **OLE2 / CFB (Compound File Binary)**
containers holding **Word binary streams** (`WordDocument`, `0Table` / `1Table`,
`Data`). It parses the **Word FIB**, the **CLX / Pcdt piece table**, and both
**UTF-16LE** and **compressed single-byte** text pieces to recover body text,
paragraphs, headers, footnotes, and other Word subdocuments.

Includes a CLI plus a minimal **`.wps` → `.docx` (WordprocessingML) converter**.

## Features

- 100% JavaScript — no native addons, works on Node.js 18+ and modern browsers
- Reads OLE2 / CFB compound files: sectors, FAT, MiniFAT, directory, streams
- Parses the Word binary **FIB** and selects the correct table stream
- Walks the **CLX / Pcdt piece table** to extract text in the right order
- Decodes **UTF-16LE** and **compressed (single-byte)** text pieces
- Exposes body text, raw text, paragraphs, and **Word subdocument ranges**
- Ships a CLI (`libwps-js`) and a **`.wps` to `.docx`** converter

## Installation

```sh
npm install libwps-js
```

## Usage

```js
import { readWpsFile } from "libwps-js";

const document = await readWpsFile("ole2-full.wps");

console.log(document.text);
console.log(document.paragraphs);
```

## CLI

```sh
./bin/libwps-js.js ole2-full.wps text      # normalized body text
./bin/libwps-js.js ole2-full.wps json      # parsed document as JSON
./bin/libwps-js.js ole2-full.wps raw       # raw piece-table text
./bin/wps-to-docx.js ole2-full.wps out.docx  # convert .wps to .docx
```

The DOCX converter emits a minimal **WordprocessingML** document from extracted
body text and paragraph breaks. It does not yet recreate original page layout,
tables, headers, footers, fonts, or drawing objects.

## Returned document

`readWps` and `readWpsFile` return:

- `text`: normalized body text
- `rawText`: all text from the Word binary piece table, including subdocuments
- `bodyText`: raw main-document text
- `paragraphs`: normalized non-empty body paragraphs
- `subdocuments`: Word subdocument ranges for body, headers, footnotes, etc.
- `streams`: OLE2 stream names and sizes
- `fib`: parsed Word binary FIB details used for extraction

## Supported path

The current parser supports the WPS fixtures in this repository by reading:

1. OLE2 Compound File Binary sectors, FAT, MiniFAT, and streams.
2. Word binary FIB table-stream selection.
3. The CLX/Pcdt piece table.
4. UTF-16LE and compressed single-byte text pieces.

## Use cases

- Extract text from legacy **WPS Office `.wps`** documents
- Convert `.wps` files to `.docx` for modern Word / Office compatibility
- Index, search, or archive old WPS / Word binary format documents
- Build Node.js services that read `.wps` files without native dependencies
- Programmatically inspect OLE2 / CFB streams and the Word FIB

## Tests

```sh
npm test
```

## Topics / Keywords

`wps` · `wps-office` · `wps-file` · `.wps` · `ole2` · `cfb` ·
`compound-file-binary` · `word` · `word-binary` · `doc` · `docx` ·
`fib` · `clx` · `pcdt` · `piece-table` · `utf-16le` · `javascript` ·
`nodejs` · `parser` · `text-extraction` · `converter` · `wps-to-docx`

## License

[MIT](LICENSE) © devinhurry
