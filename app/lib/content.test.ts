import assert from "node:assert/strict";
import { test } from "node:test";
import { versions } from "./content";

test("versions diff against the main line, not the branch", () => {
  const [v4, v3, v2, v1] = versions();
  assert.deepEqual([v4.n, v4.base?.n, v3.base?.n, v2.base?.n, v1.base], [4, 2, 2, 1, undefined]);
  assert.deepEqual(v4.kept, ["React", "TypeScript", "PostgreSQL", "Docker", "Git"]);
  assert.deepEqual(v4.dropped, ["Node.js", "Vite"]);
  assert.deepEqual(v4.added, ["NestJS", "Tailwind CSS", "Shadcn UI", "Redis", "Figma"]);
  assert.deepEqual(v3.kept, ["TypeScript"]);
  assert.deepEqual(v3.added, ["Next.js", "Tailwind CSS", "REST APIs"]);
  assert.deepEqual([v1.kept, v1.dropped, v1.added], [[], [], []]);
});
