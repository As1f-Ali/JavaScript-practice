# Week 3 Practice Drills

Small functions to write, with a test suite that checks them for you. This is where the concepts actually stick.

## Getting started

You need **Node 20 or newer**. Check with:

```bash
node --version
```

Then, from inside this folder:

```bash
npm test
```

You'll see a lot of failures. **That's exactly right** — nothing is written yet. Your job is to fill in the `TODO`s, one function at a time, and watch the failures turn into passes.

## Running just one drill

Once you're working on a single file, run only its checks:

```bash
npm test -- --test-name-pattern="basics"
npm test -- --test-name-pattern="arrays"
npm test -- --test-name-pattern="functions"
npm test -- --test-name-pattern="objects"
npm test -- --test-name-pattern="async"
```

## The files

Do them **in order**. Each one builds on the one before.

| File                | What you'll practise                                                  | Roughly         |
| ------------------- | --------------------------------------------------------------------- | --------------- |
| `01-basics.js`    | template literals, destructuring, spread, rest, default parameters    | Monday          |
| `02-arrays.js`    | `map`, `filter`, `find`, `reduce`, `some`, `every`        | Tuesday         |
| `03-objects.js`   | immutable updates, optional chaining `?.`, nullish coalescing `??`    | Tuesday         |
| `04-functions.js` | higher-order functions, returning functions, closures                 | Wednesday       |
| `05-async.js`     | `async`/`await`, `try`/`catch`, `Promise.all`               | Thursday        |
| `06-stretch.js`   | **optional** extra challenges — no marks, just for fun         | if you're ahead |

## How to read a failing test

The checks try to be helpful. If a test fails, it will usually tell you what it expected and what it got:

```
✖ an empty list gives an average of null, not NaN
  expected: null
  actual:   NaN
```

That message is a hint, not a telling-off. Read it, adjust, run again.

## A few notes

- **Please don't edit the files in `tests/`.** They're the checks. If you think one of them is wrong, tell us — you might well be right, and we'd like to know.
- Each function has a comment above it with examples of what it should do. If a comment is unclear, **ask**. That's a problem with our explanation, not with you.
- Getting stuck for 30–45 minutes is normal. Getting stuck for three hours is not. Ask.

## Don't forget `NOTES.md`

Create a `NOTES.md` in this folder and answer the six questions from the assignment brief, in your own words. It's the best revision for Friday you can possibly do.
