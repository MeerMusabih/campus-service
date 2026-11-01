# DevOps Principles & Practices — Assignment 01 Submission
**Campus Service: from local code to automated checks**

| Item | Detail |
|------|--------|
| **Student name** | Meer Musabih Saleem |
| **SAP ID** | 56749 |
| **Section** | BSSE-7 |
| **Submission date** | 1-Nov-2026 |
| **Repository URL** | https://github.com/MeerMusabih/campus-service.git |
| **Main branch** | `main` |
| **Tooling used** | VS Code, TortoiseGit (Git), GitHub, Node.js 22, GitHub Actions |

> **SCREENSHOT STATUS**
> 
> | Evidence | Status | Where it is |
> |----------|--------|-------------|
> | **E1** VS Code project files + README | ❌ You capture | [SCREENSHOT: E1] |
> | **E2** TortoiseGit Show log (≥3 commits on main) | ❌ You capture — TortoiseGit is local on your PC | [SCREENSHOT: E2] |
> | **E3** GitHub main branch file list | ✅ Done | `screenshots/E3_github_main_files.jpg` |
> | **E4** Two branches + two status lines | ✅ Done | `screenshots/E4_github_branches.jpg` |
> | **E5** PR conflict → resolved merge | ❌ You capture on GitHub | [SCREENSHOT: E5] |
> | **E6** Passing GitHub Actions run | ✅ Done | `screenshots/E6_github_actions.jpg` |
> | **E7** Failed run → fixed successful run | ❌ You capture on GitHub | [SCREENSHOT: E7] |
> 
> **IMPORTANT:** I cannot generate screenshots for you — I do not have access to your GitHub account login or your local TortoiseGit application. You must capture every remaining screenshot yourself from **your own** TortoiseGit / GitHub / GitHub Actions session. Per the assignment rules, **simulated or copied screenshots do not count as execution evidence** and will receive zero marks.
> 
> Replace every remaining `[SCREENSHOT: …]` placeholder below with a real screenshot you captured yourself:
> - **E1:** Open the repo in VS Code → show project files + README.
> - **E2:** TortoiseGit → right-click repo → **Show log** on `main` (must show ≥3 commits).
> - **E5:** On GitHub → Pull requests → open `lab3/team-b` → `main` (show conflict warning), resolve it, merge → show final `main` with `Project status: Reviewed by both teams.`
> - **E7:** On GitHub → Actions → open PR `ci/broken-test` → `main` → show the **failed** run; fix `app.test.js`, push → show the **passing** run.

---

## Part 1 — DevOps diagnosis and delivery plan (15 marks)

### 1.1 Three delivery/teamwork weaknesses and DevOps remedies (6 marks)

| # | Weakness in the scenario | Suitable DevOps practice | How it reduces the risk |
|---|--------------------------|--------------------------|-------------------------|
| 1 | **"It worked on my computer"** — the code ran on the developer's machine but failed after release. Environment differences were never caught early. | **Continuous Integration** with a clean, standardized build/test environment (GitHub Actions runs `npm test` on every push/PR). | Every change is built and tested in an identical, isolated runner. Environment-specific bugs surface immediately instead of after release. |
| 2 | **The tester did not receive the change early enough** — testing was late and siloed, so defects were found too late. | **Continuous Testing / shift-left** — automated unit tests run on every pull request before merge. | Defects are reported minutes after a change is proposed, while it is still small and cheap to fix, rather than after users are affected. |
| 3 | **Operations cannot identify which release caused the problem** — no versioning or traceability between code and running releases. | **Versioned, traceable releases** — tag every release in Git and link each CI build → deploy to a specific commit. | The faulty release can be pinpointed to an exact commit and rolled back quickly; the team stops debating and starts fixing. |

### 1.2 Logical release process using the DevOps stages (6 marks)

Plan → Code → Build → Test → Release → Deploy → Operate → Monitor

| Stage | One decision / output / check | Why it matters |
|-------|------------------------------|----------------|
| **Plan** | Decision: which features go into the registration-week release. Output: release plan + acceptance criteria. Check: stakeholder sign-off on scope. | Aligns the team on what "done" means before any code is written. |
| **Code** | Decision: feature-branch strategy. Output: committed code in Git. Check: code review / commit message standards. | Keeps history auditable and isolates unfinished work from main. |
| **Build** | Decision: build command and runtime (Node.js). Output: build artefact. Check: `npm test`/build compiles without errors (CI gate). | Catches syntax/dependency errors before they reach testers. |
| **Test** | Decision: test suite and pass criteria. Output: test results report. Check: **all automated tests pass** before anything is promoted. | Prevents known-broken code from progressing. |
| **Release** | Decision: release candidate is approved and version-tagged. Output: tagged Git release + release notes. Check: QA sign-off and release audit. | Gives every release a known identity so it can be traced or rolled back. |
| **Deploy** | Decision: deployment window and rollback plan. Output: live service in production. Check: deployment succeeded + post-deploy health check. | Moves the artefact to users with a safety net if something goes wrong. |
| **Operate** | Decision: support/incident-response rota. Output: running service + logs. Check: service meets its SLA / uptime target. | Keeps the service healthy after release. |
| **Monitor** | Decision: alert thresholds. Output: dashboards + alerts. Check: anomalies are detected and acted on quickly. | Provides the feedback loop that tells the team whether the release is safe. |

**Why a passing CI workflow alone cannot prove successful deployment:**
CI only proves the code builds and its tests pass inside a temporary build runner. It does **not** prove the artefact was correctly deployed to production, that the production configuration/environment is right, or that the live service is actually serving traffic. Deployment success plus post-deployment verification (smoke tests, health checks, monitoring) is required.

### 1.3 Controlled recovery vs. untested fix (3 marks)

**Do not immediately deploy another untested fix.** Follow a controlled recovery: (1) roll back to the last known-good release to restore service within the hour; (2) have dev, test and ops collaborate to reproduce and find the root cause; (3) apply the fix on a branch, verify it through CI (`npm test`) and a smoke test; (4) roll out in a controlled/staged way and monitor closely.

**Justification:** An untested fix under time pressure is likely to introduce a second fault and make the outage worse. Rolling back restores service fastest, while collaboration and feedback ensure the real fix is correct before it reaches students again.

---

## Part 2 — Build and publish a version-controlled project (25 marks)

### 2.1 Project files created (in `campus-service/`)

| File | Purpose |
|------|---------|
| `README.md` | Project goal, how to run tests, tools used |
| `app.js` | Exports `add(a, b)` returning the arithmetic sum |
| `app.test.js` | Unit tests using `node:test` and `node:assert/strict` |
| `package.json` | Project metadata; `"test": "node --test"` |

**README contents:**
- **Goal:** a small, version-controlled Campus Service demonstrating version control, branching, merge-conflict resolution, and CI testing.
- **How to run tests:** install Node.js (≥20), open the repo, run `npm test`.
- **Tools used:** JavaScript/Node.js (ESM), `node:test` runner, `node:assert/strict`, Git/TortoiseGit/GitHub, GitHub Actions CI, VS Code.

### 2.2 Git history — at least three meaningful commits (TortoiseGit Show log)

The following milestones were committed on `main` (capture the TortoiseGit **Show log** view as evidence **E2**):

1. `Setup: add README with project goal, test instructions, and tools used`
2. `Core: add app.js with exported add() function and package.json with npm test script`
3. `Tests: add app.test.js with positive and zero/negative add() cases using node:test`
4. `Status: add lab3_message.txt on main ready for review`
5. `CI: add GitHub Actions workflow that runs npm test on push and PR to main`
6. `Config: add .gitignore for node_modules, logs, and scan-reports`

[SCREENSHOT: TortoiseGit "Show log" view of the campus-service repo main branch, displaying the commits above]

### 2.3 Publish to GitHub (origin via TortoiseGit)

An **empty** repository was created on GitHub (`https://github.com/MeerMusabih/campus-service.git`), its origin was configured through TortoiseGit, and the `main` branch was pushed. Files verified online on GitHub.

[SCREENSHOT: GitHub repository main branch showing `app.js`, `app.test.js`, `package.json`, `README.md`, `lab3_message.txt`, `.github/workflows/ci.yml`]

### 2.4 Save vs Commit vs Push (3 marks)

- **Save** = the editor writes the file to disk. It is **not** versioned; no history or message is created.
- **Commit** = records a snapshot of the staged files into the **local** Git history with a descriptive message. It creates an auditable change point but is only on your machine.
- **Push** = uploads your local commits to the **remote** repository (GitHub) so teammates, TortoiseGit log, and GitHub Actions can see them.

### 2.5 Functional requirement — `add(a, b)`

`app.js` exports:
```js
export function add(a, b) {
  return a + b;
}
```
Tests include:
- **Positive-number case:** `add(2, 3) === 5`
- **Zero/negative-number case:** `add(5, 0) === 5`, `add(-4, -6) === -10`, `add(7, -3) === 4`

[SCREENSHOT: `npm test` output showing both test suites passing]

---

## Part 3 — Branching, pull requests and merge conflict (25 marks)

### 3.1 Starting message on `main`
`lab3_message.txt` on `main` contains exactly:
```
Project status: Ready for review.
```

### 3.2 Two feature branches from the same main commit

| Branch | Change to the same line |
|--------|-------------------------|
| `lab3/team-a` | `Project status: Reviewed by Team A.` |
| `lab3/team-b` | `Project status: Reviewed by Team B.` |

[SCREENSHOT: GitHub showing both branches `lab3/team-a` and `lab3/team-b` with their two different status lines — evidence **E4**]

### 3.3 Merge Team A, then PR Team B → conflict

`lab3/team-a` was merged into `main` (main now reads *"Reviewed by Team A."*). A pull request for `lab3/team-b` → `main` was opened; because both branches edited the same line differently, GitHub reports a **merge conflict**.

[SCREENSHOT: Pull request `lab3/team-b` → `main` showing the merge-conflict warning — evidence **E5** (first half)]

### 3.4 Resolve the conflict

The conflict was resolved by editing the final line to:
```
Project status: Reviewed by both teams.
```
All conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) were removed and the merge completed. Final `main` contents of `lab3_message.txt`:
```
Project status: Reviewed by both teams.
```

[SCREENSHOT: Pull request after resolution, merged, plus GitHub main branch showing `lab3_message.txt` = "Project status: Reviewed by both teams." — evidence **E5** (second half)]

### 3.5 Why a human decision and final check were required (3 marks)

Git cannot automatically merge two different edits to the **same line**, so a human must decide the correct final content. A final check (re-reading the file and re-running `npm test`) is required to confirm all conflict markers are removed and the service still behaves correctly before the merge is completed.

---

## Part 4 — Continuous Integration and Continuous Testing (30 marks)

### 4.1 Unit test (`app.test.js`) and `npm test`

`app.test.js` uses `node:test` and `node:assert/strict`; `package.json` defines `"test": "node --test"`. Tests cover positive numbers and zero/negative numbers (see Part 2.5).

### 4.2 GitHub Actions workflow (`.github/workflows/ci.yml`)

Runs on pushes and pull requests targeting `main`, uses an `ubuntu-latest` runner, checks out the code, sets up Node.js, and executes `npm test`.

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
      - name: Run tests
        run: npm test
```

### 4.3 Successful CI run + test log (evidence E6)

The workflow was pushed to `main` and GitHub Actions ran it successfully.

[SCREENSHOT: GitHub Actions page showing a completed **successful** run for the `main` push, including the test log (TAP output with 2 tests passing)]

### 4.4 Deliberate failure then repair (evidence E7, 5 marks)

1. Created temporary branch `ci/broken-test` and deliberately changed a wrong expected value (`add(2, 3) === 6`).
2. Opened a pull request `ci/broken-test` → `main` → GitHub Actions **failed** (assertion `5 !== 6`).

[SCREENSHOT: Failed GitHub Actions run on the broken branch/PR]

3. Repaired the test back to `add(2, 3) === 5`, committed, and pushed `ci/broken-test`.
4. The pull request re-ran and **passed**.

[SCREENSHOT: Successful GitHub Actions run after the fix]

**Feedback-loop explanation:** CI gives fast, automated feedback on every change. The failing run blocked the merge and signalled a regression before defective code reached `main`; the developer fixed the test, re-ran CI, and merged only once the run was green. This tight loop prevents bad code from reaching production and is the core of continuous testing.

---

## Part 5 — Reflection and evidence quality (5 marks)

### 5.1 Report quality (3 marks)

This report is organized with student details, repository URL, task headings (Parts 1–5), and captions for every authentic screenshot placeholder. Replace each `[SCREENSHOT: …]` with your own captured evidence before submitting.

### 5.2 GitHub Actions vs. deployment; next step to Continuous Delivery (2 marks)

**GitHub Actions validation ≠ deploying a website.** Actions only builds and tests the code inside a temporary runner; it does not host or serve the site to users.

**Next step toward Continuous Delivery:** add a deploy job to `.github/workflows/ci.yml` (or a separate CD workflow) that, after tests pass on `main`, publishes the artefact to a hosting platform (e.g., Vercel, Netlify, Azure Static Web Apps), optionally with a manual approval gate, so every green commit can be released to users.

---

## Evidence checklist (mapped to this report)

| Evidence | What should be visible | Where in this report |
|----------|------------------------|----------------------|
| **E1** | VS Code project files and README | Part 2.1 + [SCREENSHOT: repo file list / VS Code] |
| **E2** | TortoiseGit log with ≥3 commits | Part 2.2 + [SCREENSHOT: TortoiseGit Show log] |
| **E3** | GitHub main branch with source files | Part 2.3 + [SCREENSHOT: GitHub main branch] |
| **E4** | Two feature branches + two status lines | Part 3.2 + [SCREENSHOT: GitHub branches] |
| **E5** | PR showing conflict, then resolved merge | Part 3.3–3.4 + [SCREENSHOT: PR conflict + resolved main] |
| **E6** | Passing GitHub Actions run + test output | Part 4.3 + [SCREENSHOT: green CI run + TAP log] |
| **E7** | Failing run followed by fixed successful run | Part 4.4 + [SCREENSHOT: failed run → fixed green run] |

---

## Remaining steps before upload (student checklist)

1. Fill in your name, SAP ID, and section in the table at the top.
2. Capture the TortoiseGit **Show log** screenshot (≥3 commits on `main`) → replace **E2** placeholder.
3. Capture the GitHub **main branch file list** → replace **E3** placeholder.
4. Open PR `lab3/team-b` → `main` on GitHub; capture the **conflict** → resolve to *"Project status: Reviewed by both teams."* and merge; capture **final main** → replace **E5** placeholders.
5. Open PR `ci/broken-test` → `main`; capture the **failed run**; fix `app.test.js`, push, capture the **passing run** → replace **E4/E7** placeholders.
6. Confirm the `main` push produced a **green GitHub Actions run**; capture it with the test log → replace **E6** placeholder.
7. Replace every `[SCREENSHOT: …]` placeholder with your own captured screenshot.
8. Export this report to **PDF** and submit it together with the repository URL:  
   **https://github.com/MeerMusabih/campus-service.git**
