import type { CSSProperties } from "react";

function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Cell = { char: string; opacity: number; delay: number; duration: number };

function buildGrid(cols: number, rows: number, seed: number): Cell[][] {
  const random = mulberry32(seed);
  const grid: Cell[][] = [];

  for (let y = 0; y < rows; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < cols; x++) {
      const progress = x / (cols - 1);
      // Abstract ascending trend line, like a growth chart rendered in ASCII.
      const lineY = (rows - 1) * (1 - progress * 0.82) - Math.sin(progress * 5) * 1.1;
      const distance = Math.abs(y - lineY);
      const onLine = distance < 1.05;
      const char = random() > 0.5 ? "1" : "0";

      let opacity = 0;
      if (onLine) {
        opacity = 0.14 + random() * 0.18;
      } else if (random() < 0.3) {
        opacity = 0.02 + random() * 0.04;
      }

      row.push({
        char,
        opacity,
        delay: random() * 5,
        duration: 3 + random() * 4,
      });
    }
    grid.push(row);
  }

  return grid;
}

function AsciiTile({ grid, cols, rows, tileId }: { grid: Cell[][]; cols: number; rows: number; tileId: string }) {
  return (
    <div
      className="ascii-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <span
            key={`${tileId}-${y}-${x}`}
            style={
              cell.opacity > 0
                ? ({
                    "--op": cell.opacity,
                    animationDelay: `${cell.delay.toFixed(2)}s`,
                    animationDuration: `${cell.duration.toFixed(2)}s`,
                  } as CSSProperties)
                : { opacity: 0 }
            }
          >
            {cell.char}
          </span>
        ))
      )}
    </div>
  );
}

export default function AsciiField({
  cols = 40,
  rows = 16,
  seed = 7,
}: {
  cols?: number;
  rows?: number;
  seed?: number;
}) {
  const grid = buildGrid(cols, rows, seed);

  return (
    <div className="ascii-track" aria-hidden="true">
      <AsciiTile grid={grid} cols={cols} rows={rows} tileId="a" />
      <AsciiTile grid={grid} cols={cols} rows={rows} tileId="b" />
    </div>
  );
}
