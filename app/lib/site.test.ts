import assert from "node:assert/strict";
import { test } from "node:test";
import { pickLocale } from "./site";

test("pickLocale", () => {
  assert.equal(pickLocale("tr;q=0.8,en;q=0.4"), "tr");
  assert.equal(pickLocale("en-US,tr;q=0.9"), "en");
  assert.equal(pickLocale(""), "en");
  assert.equal(pickLocale(null), "en");
  assert.equal(pickLocale("tr;q=abc,en;q=0.5"), "en");
  assert.equal(pickLocale("*"), "en");
});
