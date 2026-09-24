# Lighthouse CI Performance Budget Tests

This document explains how Lighthouse CI performance budget tests work in the ILN-Frontend project.

## Overview

Lighthouse CI automatically audits the application's performance on every push and pull request to the `main`, `dev` (the integration branch every PR targets), and `develop` branches. It measures Core Web Vitals and other performance metrics against defined budgets.

## Performance Budgets

Every budget in `.lighthouserc.json` is currently asserted at the **`warn`** level: a breach is reported in the job log and reports, but does not fail CI. Core Web Vitals budgets:

- **Largest Contentful Paint (LCP)**: ≤ 2.5s
- **Total Blocking Time (TBT)**, the lab proxy for input responsiveness: ≤ 100ms
- **Cumulative Layout Shift (CLS)**: ≤ 0.1
- **Total Byte Weight**: ≤ 200KB

Other tracked budgets:

- Time to Interactive: ≤ 3.8s
- First Contentful Paint: ≤ 1.8s
- Performance Score: ≥ 70
- Accessibility Score: ≥ 90
- Best Practices Score: ≥ 80
- SEO Score: ≥ 80

## Tested Pages

Lighthouse CI audits the following pages:

- `/` (home page)
- `/marketplace`
- `/lp`
- `/governance`

## How It Works

1. On each push/PR to `main`, `dev`, or `develop`, the GitHub Actions workflow runs
2. The Next.js app is built in production mode
3. Lighthouse CI runs 3 audits for each URL and averages the results
4. Results are compared against the budget thresholds
5. Reports are uploaded as GitHub Actions artifacts (retained for 30 days)

## Reviewing Lighthouse Reports

### Via GitHub Actions Artifacts

1. Go to the **Actions** tab in the GitHub repository
2. Click on the failed or successful workflow run
3. Scroll to the **Artifacts** section at the bottom
4. Download the `lighthouse-reports` artifact
5. Extract the ZIP file and open the HTML reports in your browser

### Via Local Testing

To run Lighthouse CI locally:

```bash
# Build the app
npm run build

# Start the production server
npm start

# In another terminal, run Lighthouse CI
npx @lhci/cli autorun
```

The reports will be saved in the `.lighthouseci/` directory.

### Understanding the Reports

Each HTML report shows:

- **Performance Score**: Overall performance rating (0-100)
- **Core Web Vitals**: LCP, FID, CLS with pass/fail status
- **Opportunities**: Suggestions to improve performance
- **Diagnostics**: Detailed metrics and resource analysis

## Troubleshooting Failed Budgets

If CI fails due to performance budget violations:

1. **Download the Lighthouse report** to identify which metric failed
2. **Check the Opportunities section** for specific improvement suggestions
3. **Common fixes**:
   - Optimize images (use WebP, lazy loading)
   - Reduce JavaScript bundle size (code splitting, tree shaking)
   - Minimize render-blocking resources
   - Improve server response times
4. **Test locally** before pushing to verify the fix

## Configuration

Lighthouse CI is configured in `.lighthouserc.json`:

- `ci.collect.url`: Pages to audit
- `ci.assert.assertions`: Budget thresholds and severity levels
- `ci.upload`: Report storage settings

The CI workflow is defined in `.github/workflows/lighthouse.yml`.

## Batch Regression Check — Final SCF/Mainnet Frontend Readiness Sign-off (#959)

The final readiness batch (#965, #966, #968, #970) added real-data fetching and new UI. It was checked for Core Web Vitals regressions by running this repository's own Lighthouse CI configuration (`.lighthouserc.json`, 3 runs per URL, desktop preset, simulated throttling) against:

- **Baseline:** `579706e`, the last `dev` commit before the batch. It does not type-check (an error the batch itself fixed), so it was built with type checking skipped. That changes no runtime output.
- **Candidate:** `dev` at `437c981` (all four batch PRs merged), plus the build fixes below.

Both were measured on the same machine back-to-back (Node 20.20.2, `@lhci/cli` 0.15.1, Chrome stable). Values are medians of 3 runs.

| Page           | Perf score |              LCP |       TBT |           CLS | Total byte weight |
| -------------- | ---------: | ---------------: | --------: | ------------: | ----------------: |
| `/`            |    85 → 82 | 2,046 → 2,343 ms |  5 → 2 ms | 0.131 → 0.140 |  5,460 → 5,494 KB |
| `/marketplace` |    96 → 97 | 1,044 → 1,033 ms | 16 → 0 ms | 0.085 → 0.070 |  2,191 → 2,207 KB |
| `/lp`          |    96 → 96 | 1,126 → 1,131 ms |  5 → 0 ms | 0.070 → 0.070 |  2,237 → 2,252 KB |
| `/governance`  |    97 → 94 |     930 → 957 ms |  0 → 0 ms | 0.070 → 0.070 |  2,059 → 2,073 KB |

**Verdict: no Core Web Vitals regression attributable to the batch.**

- `/marketplace`, `/lp`, and `/governance` are unchanged within run-to-run noise, and all remain within every CWV budget.
- `/` shows a higher median LCP, but the individual runs overlap heavily (baseline 1,650–2,051 ms; candidate 1,858–2,420 ms). The LCP element is the same hero image in every run, and the extra transfer is only ~34 KB. All candidate runs stay under the 2.5 s LCP budget.

**Regressions found and fixed in the same change:**

1. **`next build` failed on `dev`.** Two type errors from #965 (`UPDATE_LP_WHITELIST_SUPPORTED` inferred as the literal `false`, and a `Uint8Array` passed where the SDK's `scvBytes` expects a `Buffer`) stopped the production build. That blocks every Lighthouse run and any deploy.
2. **Lighthouse CI never ran on the batch.** The workflow only triggered on `main`/`develop`, but every PR targets `dev`. It now also triggers on `dev`, and `__tests__/lighthouse-config.test.ts` guards the trigger, the audited routes, and this doc's page list.

**Pre-existing budget breaches (not caused by the batch; accepted residual risk, recommended follow-ups):**

- **`/` CLS ≈ 0.13–0.14 (budget 0.1).** The shift is on the whole page container (`body > div.min-h-screen`), in the baseline as well.
- **Total byte weight on every page (budget 200 KB).** `/` transfers ~5.5 MB: mostly Horizon transaction-history fetches (~200 KB each) and the 1.1 MB Material Symbols icon font. The other pages transfer ~2.1–2.3 MB, dominated by the same font. Because every assertion is `warn`, CI does not fail on these; subsetting the icon font and paginating the home page's Horizon fetches are the largest wins.

## Real-User Monitoring (RUM)

Lighthouse CI covers **synthetic**, CI-time performance. It runs in a controlled
environment and cannot capture the effects of real device diversity, network
conditions, or RPC latency variance. Real-user performance is monitored
separately via Core Web Vitals RUM; see
[docs/performance-monitoring.md](./performance-monitoring.md) for the RUM setup,
its (more lenient) alerting thresholds, and how to review the field data.

## Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Core Web Vitals](https://web.dev/vitals/)
- [Web Performance Optimization](https://web.dev/fast/)
- [Real-User Performance Monitoring](./performance-monitoring.md)
