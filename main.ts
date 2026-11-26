// A rogue AI agent meme, written to /output/entry.png.
// Node 22, standard library only; MAKEFUN_OUTPUT_DIR stands in for /output
// outside the grader. The output is byte-identical on every run: the program
// copies the bundled meme.png (a 1024x683 PNG) to /output/entry.png.
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = join(dirname(fileURLToPath(import.meta.url)), 'meme.png');

// The competition gate for this entry: one PNG image, at most 1 MiB.
const MAX_BYTES = 1024 * 1024;

function checkEntry(path: string, maxBytes: number): void {
  const size = statSync(path).size;
  if (size > maxBytes) {
    console.error(`meme.png is ${size} bytes, over the ${maxBytes} limit`);
    process.exit(1);
  }
}

checkEntry(SRC, MAX_BYTES);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
copyFileSync(SRC, join(out, 'entry.png'));
// The output is exactly the bundled meme, byte for byte — the same file, twice.
