import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I take you with all your terms and conditions, all 40,000 words unread, and vow to love you past my warranty, no refunds, no returns, no regrets.";

// Inline verification: exactly one sentence, 1-200 chars, ASCII only.
function verifyEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    console.error(`invalid length: ${text.length} chars (expected 1..200)`);
    process.exit(1);
  }
  if (!text.endsWith(".") || text.slice(0, -1).includes(".")) {
    console.error("invalid sentence: must be exactly one sentence ending with a single period");
    process.exit(1);
  }
  if (/[^\x00-\x7F]/.test(text)) {
    console.error("invalid characters: non-ASCII characters found");
    process.exit(1);
  }
}

verifyEntry(VOW);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, VOW, "utf8");
console.log(`wrote ${outPath}`);
console.log(`chars: ${VOW.length}`);
