import { CompoundFile } from "./cfb.js";
import {
  normalizeComparableText,
  normalizeWordText,
} from "./word-binary.js";

export { CompoundFile, normalizeComparableText, normalizeWordText };
export { readWps, readWpsFile } from "./wps.js";
export { convertWpsToDocxFile, wpsToDocxBuffer } from "./docx.js";
