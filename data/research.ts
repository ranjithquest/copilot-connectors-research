// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type Priority = "HIGH" | "MEDIUM" | "LOW" | "INFO";

export interface Finding {
  id: string;
  title: string;
  description: string;
  fix: string;
  priority: Priority;
  themeSlug: string;
  customers?: string[];
}

export interface Stage {
  number: number;
  title: string;
  subtitle: string;
  findings: Finding[];
  quote: string;
  quoteAttribution: string;
}

export interface Theme {
  slug: string;
  title: string;
  subtitle: string;
  priority: Priority;
  affectedStages: number[];
  description: string;
  recommendedFix: string;
  adoUrl: string; // TODO: Replace with real ADO URL
  feedbackUrl: string; // TODO: Replace with real feedback URL
  findingIds: string[];
}

export interface ChartDataPoint {
  id: string;
  label: string;
  stage: number; // 1–5
  severity: "HIGH" | "MEDIUM";
  title: string;
}

// ─────────────────────────────────────────────
// JOURNEY STAGES
// ─────────────────────────────────────────────

export const stages: Stage[] = [
  {
    number: 1,
    title: "Discovering the Need for a Connector",
    subtitle: "Stage 1 of 5",
    findings: [
      {
        id: "H1",
        title: "Connectors break agent creation — months wasted before discovery",
        description:
          "Admins build agents in Copilot Studio, connectors fail mid-journey. Months lost before they discover connectors were the missing piece.",
        fix: "Surface connectors during agent creation + agent-based gallery recommendations",
        priority: "HIGH",
        themeSlug: "discoverability",
        customers: ["Alpha Bank"],
      },
      {
        id: "H2",
        title: "No demand signal — admins have no idea what to connect",
        description:
          "No analytics, no user request channel, no guidance on what data sources matter most. Admins are flying blind.",
        fix: "Usage analytics dashboard + end-user-to-admin demand channel",
        priority: "HIGH",
        themeSlug: "feedback-loop",
        customers: ["Alpha Bank"],
      },
      {
        id: "M1",
        title: "Connectors are hidden and misnamed in the gallery",
        description:
          "SharePoint connector buried. Keyword search fails because admins search by scenario (e.g. 'sync our intranet'), not product name.",
        fix: "Scenario-based search and improved gallery taxonomy",
        priority: "MEDIUM",
        themeSlug: "discoverability",
        customers: ["Alpha Bank"],
      },
      {
        id: "INFO1",
        title: "On-prem data is massive — early success is a forcing function",
        description:
          "Large orgs with huge on-prem repositories see connectors as their only migration path. One successful connector unlocks appetite for many more.",
        fix: "Simplify on-prem setup wizard and reduce time-to-first-success",
        priority: "INFO",
        themeSlug: "discoverability",
        customers: ["Alpha Bank"],
      },
    ],
    quote: "We haven't used that agent because it was a waste of time for us after so many months.",
    quoteAttribution: "Enterprise Admin, Alpha Bank",
  },
  {
    number: 2,
    title: "Evaluating Options and Planning the Integration",
    subtitle: "Stage 2 of 5",
    findings: [
      {
        id: "H3",
        title: "On-premises data migration setup is overly complex and undocumented",
        description:
          "The Graph Connector Agent setup for on-prem data requires deep networking and security knowledge not reflected in docs. Critical steps are missing.",
        fix: "Guided on-prem setup wizard with network/security pre-checks",
        priority: "HIGH",
        themeSlug: "documentation",
        customers: ["EY"],
      },
      {
        id: "H4",
        title: "ServiceNow connector requires roles on 15–20 tables — took EY weeks",
        description:
          "The number of ACL permissions and table roles needed for ServiceNow is undocumented and inconsistent. Major enterprise customers hit this wall hard.",
        fix: "Pre-built permission templates per connector, with step-by-step table role guide",
        priority: "HIGH",
        themeSlug: "auth-permissions",
        customers: ["EY"],
      },
      {
        id: "H5",
        title: "No centralized permission sync — federated users are a complete blocker",
        description:
          "Federated identity and Azure AD sync gaps cause ACL permission sync to fail silently. No tooling exists to diagnose these failures.",
        fix: "ACL sync validator with clear identity mapping diagnostics",
        priority: "HIGH",
        themeSlug: "auth-permissions",
        customers: ["EY"],
      },
      {
        id: "H6",
        title: "ADO needs one connector per org — unscalable across thousands of orgs",
        description:
          "Azure DevOps requires a separate connector instance per organization. Enterprises with hundreds of ADO orgs face an impossible management burden.",
        fix: "Multi-org ADO connector with centralized management",
        priority: "HIGH",
        themeSlug: "configuration-rigidity",
        customers: ["EY"],
      },
      {
        id: "M2",
        title: "Any config edit requires full teardown and rebuild from scratch",
        description:
          "Changing a single setting means deleting the connector and starting over, including another 3–4 day crawl. There is no incremental edit capability.",
        fix: "Inline editing for connector configuration without requiring rebuild",
        priority: "MEDIUM",
        themeSlug: "configuration-rigidity",
        customers: ["EY"],
      },
      {
        id: "M3",
        title: "No tooling to validate a proof-of-concept before full rollout",
        description:
          "Admins have no sandbox or limited scope mode. Every test is a full production crawl — time and risk are the same whether exploring or deploying.",
        fix: "Scoped POC mode: limit index to 100 items, validate before full crawl",
        priority: "MEDIUM",
        themeSlug: "observability",
        customers: ["EY"],
      },
    ],
    quote: "It took us probably a few weeks to get the ServiceNow connector set up.",
    quoteAttribution: "Enterprise Admin, EY",
  },
  {
    number: 3,
    title: "Setup",
    subtitle: "Stage 3 of 5",
    findings: [
      {
        id: "H7",
        title: "Unsupported method discovered only months after full deployment attempt",
        description:
          "Admins build agents using the wrong connector method — only to discover it's unsupported after months of effort. No upfront warning exists.",
        fix: "Compatibility check before connector creation; surface supported paths in agent builder",
        priority: "HIGH",
        themeSlug: "discoverability",
        customers: ["Alpha Bank"],
      },
      {
        id: "H8",
        title: "No checklist before kicking off a 3–4 day crawl that may fail completely",
        description:
          "Crawls can fail days in due to auth, network, or permission issues. No pre-flight validation exists to catch these before launch.",
        fix: "Mandatory pre-crawl validation checklist: auth, connectivity, permissions, ACL",
        priority: "HIGH",
        themeSlug: "observability",
        customers: ["Alpha Bank"],
      },
      {
        id: "H9",
        title: "Connector gallery buried behind 'More' button — categories unclear",
        description:
          "The admin center UI makes the connector gallery hard to find. Admins report stumbling on it by accident. Categories don't map to mental models.",
        fix: "Promote connector gallery to primary navigation; add scenario-based browsing",
        priority: "HIGH",
        themeSlug: "discoverability",
        customers: ["Alpha Bank"],
      },
      {
        id: "M4",
        title: "OIDC and MFA cause login loops — admins forced to disable MFA entirely",
        description:
          "Certain connectors do not support OIDC or MFA. Admins resort to disabling security features organization-wide as a workaround.",
        fix: "Full OIDC and MFA support for all connectors; migration guide for existing setups",
        priority: "MEDIUM",
        themeSlug: "auth-permissions",
        customers: ["Alpha Bank"],
      },
      {
        id: "M5",
        title: "Documentation is outdated, incorrect, and contradicts actual behavior",
        description:
          "Microsoft Learn articles describe UI steps that no longer exist or have moved. Screenshots are stale. Critical config parameters are undocumented.",
        fix: "Quarterly doc review cycle tied to product releases; in-product contextual help",
        priority: "MEDIUM",
        themeSlug: "documentation",
        customers: ["Alpha Bank"],
      },
    ],
    quote:
      "We lost a lot of time trying to debug... the way we created the agent was not the supported one.",
    quoteAttribution: "Enterprise Admin, Alpha Bank",
  },
  {
    number: 4,
    title: "Initial Validation and Testing",
    subtitle: "Stage 4 of 5",
    findings: [
      {
        id: "H10",
        title: "Crawl takes 3–4 days with zero progress visibility — no ETA or phase breakdown",
        description:
          "After triggering a crawl, admins see a spinner with no phase information, no estimated completion time, and no item count. The only way to know if it's working is to wait.",
        fix: "Real-time crawl status: phase (identity/content/ACL), % complete, ETA, items indexed",
        priority: "HIGH",
        themeSlug: "observability",
        customers: ["EY"],
      },
      {
        id: "H11",
        title: "Permission sync fails; returns zero search results after days of waiting",
        description:
          "ACL sync silently fails after a full crawl, resulting in zero search results for all users. Diagnosing the root cause requires a support ticket that takes weeks to resolve.",
        fix: "ACL sync health indicator + self-serve diagnostic tool with remediation guidance",
        priority: "HIGH",
        themeSlug: "auth-permissions",
        customers: ["EY"],
      },
      {
        id: "H12",
        title: "Edit button triggers errors — entire config must be rebuilt to fix",
        description:
          "Attempting to edit connector settings triggers a UI error state. The only recovery is to delete and recreate the connector from scratch, starting another multi-day crawl.",
        fix: "Fix edit flow; add config export/import to preserve settings across rebuilds",
        priority: "HIGH",
        themeSlug: "configuration-rigidity",
        customers: ["EY"],
      },
      {
        id: "M6",
        title: "No playground to test queries before launching full pilot rollout",
        description:
          "Admins have no way to test what search queries will return before rolling out to users. Early user feedback is the only signal — and it's already too late by then.",
        fix: "Search sandbox: test queries against indexed content before enablement",
        priority: "MEDIUM",
        themeSlug: "observability",
        customers: ["EY"],
      },
    ],
    quote: "It took many, many days to do the full crawl, like 3–4 days to crawl the 13,000 items.",
    quoteAttribution: "Enterprise Admin, EY",
  },
  {
    number: 5,
    title: "Maintenance and Ongoing Management",
    subtitle: "Stage 5 of 5",
    findings: [
      {
        id: "H13",
        title: "Connectors randomly disconnect and reconnect — 'refresh roulette'",
        description:
          "Live connectors drop their connection without warning and re-authenticate on random schedules. Admins describe this as 'refresh roulette' — they never know if it's working.",
        fix: "Stable OAuth token refresh + proactive re-auth alerts before expiry",
        priority: "HIGH",
        themeSlug: "observability",
      },
      {
        id: "H14",
        title: "No health dashboard — failures discovered only after user complaints",
        description:
          "There is no monitoring dashboard for connector health. Failed crawls, permission sync drops, and disconnected connectors go unnoticed until users report broken search results.",
        fix: "Connector health dashboard with status badges, last-sync time, error alerts",
        priority: "HIGH",
        themeSlug: "observability",
      },
      {
        id: "H15",
        title: "Every Graph Connector update requires manual reinstall and server reboot",
        description:
          "Updating the on-premises Graph Connector Agent is fully manual — download, uninstall, reinstall, reboot. No auto-update mechanism exists.",
        fix: "Auto-update for GCA with zero-downtime rolling deployment",
        priority: "HIGH",
        themeSlug: "configuration-rigidity",
      },
      {
        id: "H16",
        title: "Admins log in weekly to manually reconnect sync-failed connectors",
        description:
          "Several admins described a weekly ritual of logging in to check on and manually reconnect connectors that have dropped. This is pure maintenance overhead with no business value.",
        fix: "Auto-reconnect with smart retry logic + email/Teams alert when action is required",
        priority: "HIGH",
        themeSlug: "feedback-loop",
      },
      {
        id: "M7",
        title: "No analytics on what users search for or what is missing from index",
        description:
          "Zero visibility into what users are searching for, what returns no results, or what content gaps exist in the index. Community calls help but there is no in-portal engagement hub.",
        fix: "Usage analytics + in-portal community/feedback hub",
        priority: "MEDIUM",
        themeSlug: "feedback-loop",
      },
      {
        id: "INFO2",
        title: "Every Graph Connector update requires manual reinstall and server reboot",
        description:
          "Maintenance burden is unsustainable at scale. New sources cannot be added without a full rebuild — locking in the initial configuration forever.",
        fix: "Modular connector architecture allowing incremental source additions",
        priority: "INFO",
        themeSlug: "configuration-rigidity",
      },
    ],
    quote: "You refresh it once, it works. And all of a sudden it goes disconnect.",
    quoteAttribution: "Sabarinathan, Enterprise Admin",
  },
];

// ─────────────────────────────────────────────
// CROSS-STAGE THEMES
// ─────────────────────────────────────────────

export const themes: Theme[] = [
  {
    slug: "discoverability",
    title: "Poor Connector Discoverability",
    subtitle: "Admins can't find connectors when they need them",
    priority: "HIGH",
    affectedStages: [1, 2, 3],
    description:
      "Connectors are buried in the admin center, hidden behind a 'More' button. The gallery uses keyword search only — but admins search by scenario ('sync our intranet'), not product name. More critically, when admins are building agents in Copilot Studio, connectors are never surfaced as the solution. Months of failed agent-building could be prevented by a single moment of discovery.",
    recommendedFix:
      "Surface connectors inline during Copilot Studio agent creation. Add scenario-based gallery search. Promote the connector gallery to primary navigation in the admin center.",
    adoUrl: "PLACEHOLDER_ADO_URL_DISCOVERABILITY", // TODO: Replace with real ADO URL
    feedbackUrl: "PLACEHOLDER_FEEDBACK_URL_DISCOVERABILITY", // TODO: Replace with feedback URL
    findingIds: ["H1", "H7", "H9", "M1"],
  },
  {
    slug: "observability",
    title: "Zero Observability",
    subtitle: "No visibility into crawls, health, or failures",
    priority: "HIGH",
    affectedStages: [2, 3, 4, 5],
    description:
      "Admins trigger a crawl and then go blind for 3–4 days. No phase indicator, no ETA, no item count. When the crawl finishes, they often discover failures through user complaints — not through any monitoring. There is no health dashboard, no connector status page, and no proactive alerting. This is the single biggest trust gap in the entire product.",
    recommendedFix:
      "Build a real-time crawl status page showing phase (identity/content/ACL), percentage complete, and ETA. Add a connector health dashboard with status badges, last-sync time, and failure alerts.",
    adoUrl: "PLACEHOLDER_ADO_URL_OBSERVABILITY", // TODO: Replace with real ADO URL
    feedbackUrl: "PLACEHOLDER_FEEDBACK_URL_OBSERVABILITY", // TODO: Replace with feedback URL
    findingIds: ["H8", "H10", "H13", "H14", "M3", "M6"],
  },
  {
    slug: "auth-permissions",
    title: "Auth & Permission Complexity",
    subtitle: "Authentication failures block progress at every stage",
    priority: "HIGH",
    affectedStages: [2, 3, 4],
    description:
      "Permission setup is the most opaque part of connector configuration. ServiceNow alone requires roles on 15–20 tables — undocumented, inconsistent, and discovered through trial and error. Federated identity causes ACL sync to fail silently. OIDC and MFA are unsupported in key connectors, forcing admins to choose between security and functionality. Post-crawl ACL sync failures return zero search results with no diagnostic tooling.",
    recommendedFix:
      "Pre-built permission templates per connector type. ACL sync validator with remediation guidance. Full OIDC/MFA support across all connectors.",
    adoUrl: "PLACEHOLDER_ADO_URL_AUTH_PERMISSIONS", // TODO: Replace with real ADO URL
    feedbackUrl: "PLACEHOLDER_FEEDBACK_URL_AUTH_PERMISSIONS", // TODO: Replace with feedback URL
    findingIds: ["H4", "H5", "H11", "M4"],
  },
  {
    slug: "feedback-loop",
    title: "No Admin-to-User Feedback Loop",
    subtitle: "Admins are disconnected from what users actually need",
    priority: "HIGH",
    affectedStages: [1, 5],
    description:
      "Admins have no channel to understand what end-users want connected. There are no analytics showing zero-result searches, no mechanism for users to request a connector, and no in-portal feedback hub. The result: admins make connector decisions based on instinct, not signal. When connectors do fail, users are the first to know — and admins are the last.",
    recommendedFix:
      "Usage analytics dashboard showing zero-result queries and search gaps. End-user-to-admin connector request channel. In-portal feedback hub integrated with the admin center.",
    adoUrl: "PLACEHOLDER_ADO_URL_FEEDBACK_LOOP", // TODO: Replace with real ADO URL
    feedbackUrl: "PLACEHOLDER_FEEDBACK_URL_FEEDBACK_LOOP", // TODO: Replace with feedback URL
    findingIds: ["H2", "H16", "M7"],
  },
  {
    slug: "configuration-rigidity",
    title: "Configuration Rigidity",
    subtitle: "Any edit requires a complete rebuild from scratch",
    priority: "MEDIUM",
    affectedStages: [2, 3, 4, 5],
    description:
      "Connector configuration is all-or-nothing. Changing a single setting means deleting the connector and rebuilding it from scratch — including another 3–4 day crawl. The edit button itself throws errors. ADO requires one connector per organization, making enterprise-scale deployment impossible to manage. Every on-prem Graph Connector Agent update is a manual reinstall.",
    recommendedFix:
      "Inline editing without rebuild. Multi-org ADO connector support. Auto-update for Graph Connector Agent. Config export/import for preserving settings.",
    adoUrl: "PLACEHOLDER_ADO_URL_CONFIG_RIGIDITY", // TODO: Replace with real ADO URL
    feedbackUrl: "PLACEHOLDER_FEEDBACK_URL_CONFIG_RIGIDITY", // TODO: Replace with feedback URL
    findingIds: ["H6", "H12", "H15", "M2"],
  },
  {
    slug: "documentation",
    title: "Outdated Documentation",
    subtitle: "Docs that describe a product that no longer exists",
    priority: "MEDIUM",
    affectedStages: [2, 3],
    description:
      "Microsoft Learn documentation for connectors describes UI steps that have moved, screenshots that are stale, and configuration parameters that are undocumented. On-prem setup is the worst affected area — critical networking and security prerequisites are simply absent. Admins spend weeks following incorrect docs before contacting support, which itself takes 2+ months to resolve critical issues.",
    recommendedFix:
      "Quarterly documentation review cycle tied to product releases. In-product contextual help at key setup steps. Verified setup guides for top connectors (ServiceNow, SharePoint, ADO).",
    adoUrl: "PLACEHOLDER_ADO_URL_DOCUMENTATION", // TODO: Replace with real ADO URL
    feedbackUrl: "PLACEHOLDER_FEEDBACK_URL_DOCUMENTATION", // TODO: Replace with feedback URL
    findingIds: ["H3", "M5"],
  },
];

// ─────────────────────────────────────────────
// CHART DATA POINTS (H1-H16, M1-M7)
// ─────────────────────────────────────────────

export const chartPoints: ChartDataPoint[] = [
  { id: "H1", label: "H1", stage: 1, severity: "HIGH", title: "Agent creation uses unsupported connector path; months of work lost" },
  { id: "H2", label: "H2", stage: 1, severity: "HIGH", title: "No channel for end-users to surface connector requests to admins" },
  { id: "H3", label: "H3", stage: 2, severity: "HIGH", title: "On-premises data migration setup is overly complex and undocumented" },
  { id: "H4", label: "H4", stage: 2, severity: "HIGH", title: "ServiceNow connector requires roles on 15-20 tables; took EY weeks to set up" },
  { id: "H5", label: "H5", stage: 2, severity: "HIGH", title: "No centralized permission sync; federated users are a complete blocker" },
  { id: "H6", label: "H6", stage: 2, severity: "HIGH", title: "ADO needs one connector per org — unscalable across thousands of orgs" },
  { id: "H7", label: "H7", stage: 3, severity: "HIGH", title: "Unsupported method discovered only months after full deployment attempt" },
  { id: "H8", label: "H8", stage: 3, severity: "HIGH", title: "No checklist before kicking off a 3-4 day crawl that may fail completely" },
  { id: "H9", label: "H9", stage: 3, severity: "HIGH", title: "Connector gallery buried behind 'More' button; categories unclear" },
  { id: "H10", label: "H10", stage: 4, severity: "HIGH", title: "Crawl takes 3-4 days; zero progress visibility, no ETA or phase breakdown" },
  { id: "H11", label: "H11", stage: 4, severity: "HIGH", title: "Permission sync fails; returns zero search results after days of waiting" },
  { id: "H12", label: "H12", stage: 4, severity: "HIGH", title: "Edit button triggers errors; entire config must be rebuilt to fix" },
  { id: "H13", label: "H13", stage: 5, severity: "HIGH", title: "Connectors randomly disconnect and reconnect — 'refresh roulette'" },
  { id: "H14", label: "H14", stage: 5, severity: "HIGH", title: "No health dashboard; failures discovered only after user complaints" },
  { id: "H15", label: "H15", stage: 5, severity: "HIGH", title: "Every GC update requires manual reinstall and server reboot" },
  { id: "H16", label: "H16", stage: 5, severity: "HIGH", title: "Admins log in weekly to manually reconnect sync-failed connectors" },
  { id: "M1", label: "M1", stage: 1, severity: "MEDIUM", title: "Gallery supports keyword search only; not scenario or use-case based" },
  { id: "M2", label: "M2", stage: 2, severity: "MEDIUM", title: "Any config edit requires full teardown and rebuild from scratch" },
  { id: "M3", label: "M3", stage: 2, severity: "MEDIUM", title: "No tooling to validate a proof-of-concept before full rollout" },
  { id: "M4", label: "M4", stage: 3, severity: "MEDIUM", title: "OIDC and MFA cause login loops; admins forced to disable MFA entirely" },
  { id: "M5", label: "M5", stage: 3, severity: "MEDIUM", title: "Documentation is outdated, incorrect, and contradicts actual behavior" },
  { id: "M6", label: "M6", stage: 4, severity: "MEDIUM", title: "No playground to test queries before launching full pilot rollout" },
  { id: "M7", label: "M7", stage: 5, severity: "MEDIUM", title: "No analytics on what users search for or what is missing from index" },
];

// ─────────────────────────────────────────────
// KEY STATS
// ─────────────────────────────────────────────

export const keyStats = [
  { value: "5", label: "Journey Stages", sub: "Discovery to Maintenance" },
  { value: "30+", label: "Research Hours", sub: "Across enterprise customers" },
  { value: "HIGH", label: "Urgency Level", sub: "16 high-severity findings" },
];

export const impactStats = [
  { value: "3–4", unit: "days", label: "per crawl with zero status updates" },
  { value: "2+", unit: "months", label: "support wait time for critical blockers" },
  { value: "15–20", unit: "tables", label: "to configure for ServiceNow alone" },
];

// ─────────────────────────────────────────────
// RECOMMENDED ACTIONS
// ─────────────────────────────────────────────

export const recommendedActions = [
  {
    number: 1,
    title: "Surface connectors in the agent creation flow — immediately",
    description:
      "The most impactful single change. Admins are already in Copilot Studio building agents. Meeting them where they are — and showing connectors as the enabler, not a separate product — collapses the discovery gap entirely.",
    themeSlug: "discoverability",
  },
  {
    number: 2,
    title: "Build a real-time crawl status page and connector health dashboard",
    description:
      "Observability is the single biggest trust driver. A status page showing phase (identity / content / ACL), percentage complete, and ETA would eliminate the most-cited pain point across both validation and maintenance stages.",
    themeSlug: "observability",
  },
  {
    number: 3,
    title: "Ship a pre-setup validation checklist and guided setup for top connectors",
    description:
      "ServiceNow, SharePoint, and ADO are the top three connectors by demand. A preflight checklist that validates auth, permissions, and connectivity before the first crawl would prevent the months-long debug cycles described in stages 3 and 4.",
    themeSlug: "auth-permissions",
  },
];

// ─────────────────────────────────────────────
// ADO PLANNING ITEMS
// ─────────────────────────────────────────────

export const adoPlanningItems = [
  {
    id: "ado-1",
    label: "Overarching: Connector Admin Experience Sprint",
    description: "Top-level planning item covering all UX improvements across the connector admin journey",
    adoUrl: "PLACEHOLDER_ADO_URL_OVERARCHING", // TODO: Replace with real ADO URL
    priority: "HIGH" as Priority,
  },
  {
    id: "ado-2",
    label: "Discoverability: Connector Gallery & Agent Surface",
    description: "Surface connectors in Copilot Studio agent creation; improve gallery search and navigation",
    adoUrl: "PLACEHOLDER_ADO_URL_DISCOVERABILITY", // TODO: Replace with real ADO URL
    priority: "HIGH" as Priority,
  },
  {
    id: "ado-3",
    label: "Observability: Crawl Status & Health Dashboard",
    description: "Real-time crawl progress, phase indicators, connector health monitoring, and failure alerts",
    adoUrl: "PLACEHOLDER_ADO_URL_OBSERVABILITY", // TODO: Replace with real ADO URL
    priority: "HIGH" as Priority,
  },
  {
    id: "ado-4",
    label: "Auth & Permissions: Templates & ACL Diagnostics",
    description: "Pre-built permission templates, ACL sync validator, OIDC/MFA support improvements",
    adoUrl: "PLACEHOLDER_ADO_URL_AUTH", // TODO: Replace with real ADO URL
    priority: "HIGH" as Priority,
  },
  {
    id: "ado-5",
    label: "Feedback Loop: Analytics & Demand Channel",
    description: "Search usage analytics, zero-result query surfacing, user-to-admin connector request channel",
    adoUrl: "PLACEHOLDER_ADO_URL_FEEDBACK", // TODO: Replace with real ADO URL
    priority: "HIGH" as Priority,
  },
  {
    id: "ado-6",
    label: "Configuration: Inline Edit & Multi-Org Support",
    description: "Edit connectors without rebuild, multi-org ADO connector, GCA auto-update",
    adoUrl: "PLACEHOLDER_ADO_URL_CONFIG", // TODO: Replace with real ADO URL
    priority: "MEDIUM" as Priority,
  },
  {
    id: "ado-7",
    label: "Documentation: Quarterly Review & Contextual Help",
    description: "Quarterly doc refresh cycle, in-product contextual guidance at key setup steps",
    adoUrl: "PLACEHOLDER_ADO_URL_DOCS", // TODO: Replace with real ADO URL
    priority: "MEDIUM" as Priority,
  },
];

// ─────────────────────────────────────────────
// HELPER: get all findings for a theme
// ─────────────────────────────────────────────

export function findingsForTheme(themeSlug: string): Finding[] {
  return stages.flatMap((s) => s.findings).filter((f) => f.themeSlug === themeSlug);
}

export function getTheme(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug);
}

export function getStagesForTheme(theme: Theme): Stage[] {
  return stages.filter((s) => theme.affectedStages.includes(s.number));
}
