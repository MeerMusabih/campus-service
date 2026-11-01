# Campus Service

Campus Service is a small JavaScript project that demonstrates how DevOps connects planning, source control, team collaboration, automated testing, and feedback.

## Goal
Provide a tiny, version-controlled service (`app.js`) exporting an `add(a, b)` function, backed by automated unit tests (`app.test.js`) and a GitHub Actions continuous integration workflow. It is the artefact for the DevOps Principles and Practices Assignment 01.

## How to run the tests

1. Install Node.js (v20 or newer).
2. Clone or open this repository.
3. Run the test suite:

```bash
npm test
```

This executes `node --test`, which runs `app.test.js` using the built-in `node:test` runner and `node:assert/strict` assertions.

## Tools used
- Language/runtime: JavaScript (Node.js, ESM)
- Test runner: `node:test` (built-in)
- Assertions: `node:assert/strict` (built-in)
- Version control: Git (TortoiseGit / GitHub)
- Continuous integration: GitHub Actions (`.github/workflows/ci.yml`)
- Editor: VS Code
