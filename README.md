# libwps-js

Pure JavaScript reader for WPS Office OLE2 `.wps` files that store Word binary
streams (`WordDocument`, `0Table`/`1Table`, `Data`).

This implementation is intentionally fail-fast. Unsupported or malformed files
throw instead of silently returning partial content.

## Usage

```js
import { readWpsFile } from "libwps-js";

const document = await readWpsFile("ole2-full.wps");

console.log(document.text);
console.log(document.paragraphs);
```

## CLI

```sh
./bin/libwps-js.js ole2-full.wps text
./bin/libwps-js.js ole2-full.wps json
./bin/libwps-js.js ole2-full.wps raw
./bin/wps-to-docx.js ole2-full.wps converted.docx
```

The DOCX converter emits a minimal WordprocessingML document from extracted
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

Run validation with:

```sh
npm test
```
