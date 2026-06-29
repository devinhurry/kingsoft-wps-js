#!/usr/bin/env node
import { convertWpsToDocxFile } from "../src/docx.js";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath || inputPath === "--help" || inputPath === "-h") {
  process.stderr.write("Usage: msdoc-wps-to-docx <input.doc/.wps> <output.docx>\n");
  process.exit(inputPath === "--help" || inputPath === "-h" ? 0 : 1);
}

const result = await convertWpsToDocxFile(inputPath, outputPath);
process.stdout.write(`Wrote ${result.outputPath} (${result.byteLength} bytes, ${result.paragraphCount} paragraphs)\n`);
