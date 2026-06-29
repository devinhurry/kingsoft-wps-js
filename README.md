# msdoc-wps-parser — Pure JavaScript `.doc` / `.wps` File Parser & DOCX Converter

[English](README.md) | [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)](package.json)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Format](https://img.shields.io/badge/format-.doc%20|%20.wps-orange.svg)](#supported-path)
[![Tests](https://img.shields.io/badge/tests-node--test-brightgreen.svg)](#tests)

A pure JavaScript (no native dependencies) reader and text extractor for **`.doc` and
`.wps` files** — both Kingsoft/WPS Office Writer and Microsoft Word binary documents
that are stored as **OLE2 / CFB (Compound File Binary)** containers holding **Word
binary streams** (`WordDocument`, `0Table` / `1Table`, `Data`). It parses the **Word
FIB**, the **CLX / Pcdt piece table**, and both **UTF-16LE** and **compressed
single-byte** text pieces to recover body text, paragraphs, headers, footnotes, and
other Word subdocuments.

Includes a CLI plus a minimal **`.doc` / `.wps` → `.docx` (WordprocessingML) converter**.

## Features

- 100% JavaScript — no native addons, works on Node.js 18+ and modern browsers
- Reads OLE2 / CFB compound files: sectors, FAT, MiniFAT, directory, streams
- Parses the Word binary **FIB** and selects the correct table stream
- Walks the **CLX / Pcdt piece table** to extract text in the right order
- Decodes **UTF-16LE** and **compressed (single-byte)** text pieces
- Exposes body text, raw text, paragraphs, and **Word subdocument ranges**
- Ships a CLI (`msdoc-wps-parser`) and a **`.doc` / `.wps` → `.docx`** converter
- Works with both **`.doc`** (Microsoft Word Binary) and **`.wps`** (WPS Office) files — they share the same OLE2/Word binary format

## Installation

```sh
npm install msdoc-wps-parser
```

## Usage

```js
import { readWpsFile } from "msdoc-wps-parser";

// Works with both .doc and .wps files (same underlying Word binary format)
const document = await readWpsFile("document.doc");
// const document = await readWpsFile("document.wps");

console.log(document.text);
console.log(document.paragraphs);
```

## CLI

```sh
./bin/msdoc-wps-parser.js document.doc text     # normalized body text
./bin/msdoc-wps-parser.js document.doc json     # parsed document as JSON
./bin/msdoc-wps-parser.js document.doc raw      # raw piece-table text
./bin/msdoc-wps-to-docx.js document.doc out.docx  # convert .doc/.wps to .docx
```

The DOCX converter emits a **WordprocessingML** document from extracted text,
paragraph properties, run formatting, sections, and supported table structures.
Headers, footers, drawing objects, and unsupported legacy/native formats are
still out of scope.

> **Note:** `.doc` and `.wps` files share the same OLE2/CFB + Word binary format
> under the hood. The parser detects the `WordDocument` stream regardless of
> file extension, so one code path handles both.

## Returned document

`readWps` and `readWpsFile` return:

- `text`: normalized body text
- `rawText`: all text from the Word binary piece table, including subdocuments
- `bodyText`: raw main-document text
- `paragraphs`: normalized non-empty body paragraphs
- `paragraphProperties`: per-paragraph properties from PAPX pages, including `lineSpacing` and `styleId`
- `characterRuns` / `characterProperties`: run formatting from CHPX pages, including font size, width, and character spacing
- `fontTable`: FFN font records parsed from the table stream
- `styles`: style sheet entries parsed from STSH, each with `name`, `type`, `styleId`, `basedOn`, `lineSpacing`, and run properties
- `subdocuments`: Word subdocument ranges for body, headers, footnotes, etc.
- `streams`: OLE2 stream names and sizes
- `fib`: parsed Word binary FIB details used for extraction

## Binary format implementation notes

This section documents WPS-specific deviations from the Word binary format and
other implementation notes encountered during development. Standard MS-DOC
structures (STSH, PAPX, CHPX, FIB, CLX, etc.) are fully described in the
[MS-DOC-SPEC](MS-DOC-SPEC/) and are not repeated here.

### DOCX settings `w:rsids`

The `w:rsids` block in `word/settings.xml` is revision-management metadata. It is
not required for the current text extraction or DOCX content conversion path, so
the converter may omit it for now. Do not use it as a parser signal for document
structure.

### SPRM 0x6412 — WPS line spacing

> **WPS-specific** — not part of the MS-DOC standard.

WPS uses a non-standard SPRM `0x6412` for paragraph line spacing instead of the
standard `sprmPDyaLine` (`0x2409`). Its operand is a 2-byte **signed** integer in twips:

| Value | Meaning |
|-------|---------|
| negative | `exact` (固定值) — line height is exactly `|value|` twips |
| positive | `atLeast` (最小值) — line height is at least `value` twips |

Example: `-594` = 594 twips = 29.7 pt exact (固定值 29.7 磅).

This SPRM can appear both in direct paragraph PAPX and in style grpprl within the STSH.
The converter merges direct PAPX properties with the referenced style's properties.

## Supported path

The current parser supports the `.doc` / `.wps` fixtures in this repository by reading:

1. OLE2 Compound File Binary sectors, FAT, MiniFAT, and streams.
2. Word binary FIB table-stream selection.
3. The CLX/Pcdt piece table.
4. UTF-16LE and compressed single-byte text pieces.
5. STSH style sheet: style names, types, based-on relationships, and line spacing.
6. PAPX paragraph properties: per-paragraph style references and direct line spacing.
7. CHPX character properties: run-level font size, character width, and character spacing.
8. FFN font records from the table stream.
9. DOCX conversion emits `word/styles.xml`, `<w:pPr>` paragraph properties, paragraph-mark `<w:rPr>`, and split `<w:r>` runs.

## Use cases

- Extract text from legacy **WPS Office `.wps`** and **Microsoft Word `.doc`** documents
- Convert `.doc` / `.wps` files to `.docx` for modern Word / Office compatibility
- Index, search, or archive old Word / WPS binary format documents
- Build Node.js services that read `.doc` / `.wps` files without native dependencies
- Programmatically inspect OLE2 / CFB streams and the Word FIB

## Tests

```sh
npm test
```

## Topics / Keywords

`wps` · `wps-office` · `wps-file` · `.wps` · `ole2` · `cfb` ·
`compound-file-binary` · `word` · `word-binary` · `doc` · `docx` ·
`fib` · `clx` · `pcdt` · `piece-table` · `utf-16le` · `javascript` ·
`nodejs` · `parser` · `text-extraction` · `converter` · `msdoc-wps-to-docx`

## License

[MIT](LICENSE) © devinhurry
