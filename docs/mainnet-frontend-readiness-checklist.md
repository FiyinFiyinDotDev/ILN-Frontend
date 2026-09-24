# ILN Frontend Mainnet Readiness Checklist

This checklist consolidates every category's closing artifact for the ILN frontend mainnet readiness sign-off, mirroring the structure and status legend of the smart-contract repository's [mainnet launch checklist](https://github.com/Invoice-Liquidity-Network/ILN-Smart-Contract/blob/dev/docs/mainnet-launch-checklist.md). A maintainer reviewing mainnet readiness should be able to reach both sides from either entry point — the backend-side cross-link is coordinated in [backend-checklist-cross-link-coordination.md](./backend-checklist-cross-link-coordination.md) (ILN-Frontend issue #956).

Status legend: `Not started`, `In progress`, `Blocked`, `Complete`.

## Accessibility

| Item | Description | Owner | Status | Link |
|------|-------------|-------|--------|------|
| Accessibility implementation | Screen-reader announcements for toasts and notification center; ARIA live region configuration verified. | Frontend lead | Complete | [Implementation Summary](accessibility-implementation-summary.md) |
| WCAG 2.1 AA conformance | Public-facing conformance target with verification summary and known limitations. | Frontend lead | Complete | [Conformance Statement](accessibility-conformance-statement.md) |
| Toast/notification audit | Audit notes for the toast and notification flows, including WCAG 2.1 SC 4.1.3 verification. | Frontend lead | Complete | [Toast Audit](accessibility-audit-toast-notifications.md) |
| Batch new-UI re-audit | jest-axe and manual ARIA re-audit of this batch's new surfaces: DelegationPanel real-data states, admin confirmation dialogs, admin status feedback. Issues found were fixed in the same change. | Frontend lead | Complete | [Batch Re-audit](../__tests__/accessibility/BatchNewUI.a11y.test.tsx) |
| Keyboard and screen-reader manual testing | Manual verification checklist for screen-reader and keyboard interaction. | Frontend lead | Complete | [Screen-Reader Testing Guide](screen-reader-testing-guide.md) |

## Performance and bundle size

| Item | Description | Owner | Status | Link |
|------|-------------|-------|--------|------|
| Bundle-size budget policy | 6.5 MB absolute budget, per-PR +50 KB delta gate, and CI workflow description. | Frontend lead | Complete | [Bundle Size Tracking](bundle-size.md) |
| Cumulative batch bundle check | Final cumulative re-check of the whole batch against the 6.5 MB budget using the CI-parity measurement script; verdict recorded in the doc. | Frontend lead | In progress | [Batch Cumulative Check](bundle-size.md#cumulative-batch-check--final-scfmainnet-frontend-readiness-sign-off-120) |
| Lighthouse CI budgets | Point-in-time Core Web Vitals budget enforcement and report review guidance. | Frontend lead | Complete | [Lighthouse CI](LIGHTHOUSE_CI.md) |
| Load testing | Load-test procedures and results for financial journeys. | Frontend lead | Complete | [Load Testing](load-testing.md) |
| Frontend SLOs | Service Level Objectives for performance, availability, and financial journeys with concrete monitoring signals. | Frontend lead | Complete | [SLOs](slos.md) |

## Operations and incident readiness

| Item | Description | Owner | Status | Link |
|------|-------------|-------|--------|------|
| Mainnet deployment runbook | Technical deployment details for the mainnet cutover. | Release lead | Complete | [Deployment Runbook](mainnet-deployment-runbook.md) |
| User-facing launch notes | Mainnet usage, honest change assessment, and feature-availability notes. | Release lead | Complete | [Launch Notes](mainnet-launch-notes.md) |
| Incident response | Escalation, kill-switch, and user-communication procedures for frontend incidents. | Frontend lead | Complete | [Incident Response](incident-response.md) |
| Status page runbook | Instatus status page update procedure and quarterly rehearsal checklist. | Comms lead | Complete | [Status Page Runbook](status-page-runbook.md) |
| Status page & incident tooling readiness | Consolidated status of status-page automation and incident tooling; automation items #934 to #938, #871, and #872 are still open. | Comms lead | In progress | [Readiness Report](status-page-incident-tooling-readiness-report.md) |
| Cross-repo incident coordination | Frontend ↔ smart-contract handoff protocol with acknowledgement targets and evidence retention. | Frontend lead | Complete | [Cross-Repo Coordination](cross-repo-incident-coordination.md) |
| Game-day exercise record | Structured multi-failure tabletop validating the incident runbooks. | Security lead | Complete | [Game-Day Report](game-day-exercise-report.md) |
| Monitoring runbook | Health checks, alerting, log retention, and on-call routing guidance. | Infrastructure lead | Complete | [Monitoring Runbook](monitoring-runbook.md) |
| Indexer downtime resilience | Audit and runbook for indexer unavailability and data-freshness handling. | Frontend lead | Complete | [Indexer Downtime](indexer-downtime.md) |
| Compromised dependency playbook | Supply-chain incident response for frontend dependencies. | Security lead | Complete | [Compromised Dependency Playbook](compromised-dependency-playbook.md) |
| Sentry integration | Error-monitoring integration for production triage. | Infrastructure lead | Complete | [Sentry Integration](sentry-integration.md) |

## Security

| Item | Description | Owner | Status | Link |
|------|-------------|-------|--------|------|
| Frontend security posture | Frontend-specific security controls and review notes. | Security lead | Complete | [Security](security.md) |
| localStorage sensitivity audit | Audit of browser storage usage for sensitive data exposure. | Security lead | Complete | [localStorage Audit](localstorage-sensitivity-audit.md) |
| PWA manifest audit | Production branding and manifest readiness review. | Frontend lead | Complete | [PWA Manifest Audit](pwa-manifest-audit.md) |

## Integration and contracts

| Item | Description | Owner | Status | Link |
|------|-------------|-------|--------|------|
| Contract integration status | Frontend ↔ contract interface source of truth and integration tracking. | Frontend lead | In progress | [Contract Integration Status](contract-integration-status.md) |
| Contract fixtures | Fixture and integration-test synchronization with the smart-contract repository. | QA lead | Complete | [Contract Fixtures](contract-fixtures.md) |
| Feature flags reference | Launch flag defaults, including features shipping dark. | Frontend lead | Complete | [Feature Flags](feature-flags.md) |

## Final sign-off

| Item | Description | Owner | Status | Link |
|------|-------------|-------|--------|------|
| Consolidated readiness checklist (this document) | Single top-level go/no-go view tying every category's closing artifact together. | Frontend lead | Complete | [#117](https://github.com/Invoice-Liquidity-Network/ILN-Frontend/issues/117) |
| Backend checklist cross-link | Backend launch checklist references this checklist so readiness is reviewable from either entry point; coordinated via a backend PR or issue. | Docs lead | In progress | [Coordination Record](backend-checklist-cross-link-coordination.md) |

## Maintainer Sign-off

Mainnet launch requires sign-off from frontend maintainers after all blocking items are complete.

| Maintainer | Area | Signed off | Date | Notes |
|------------|------|------------|------|-------|
| TBD | Accessibility | No | TBD | Pending batch re-audit merge. |
| TBD | Performance | No | TBD | Pending cumulative bundle-size CI verdict. |
| TBD | Operations | No | TBD | Pending runbook dry run at cutover. |
| TBD | Security | No | TBD | Pending final dependency scan. |

## Automation notes

Unlike the backend checklist, no automated workflow syncs this document's status cells today; statuses are maintained manually. Rows that carry GitHub issue links can be wired to a future sync workflow mirroring the backend's `mainnet-checklist-sync.yml` once this checklist becomes the primary go/no-go surface.
