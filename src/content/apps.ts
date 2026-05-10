export type AppStatus = "live" | "beta" | "in development";

export type AppPlatform = "iOS" | "iPadOS" | "Android" | "Web";

export type PolicyKind = "privacy" | "terms";

type PolicyProfile = {
  dataUse: string[];
  storage: string;
  sharing: string;
  permissions: string[];
  paidFeatures: string;
  termsUse: string;
  availability: string;
};

export type AppContent = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  platforms: AppPlatform[];
  status: AppStatus;
  bundleId?: string;
  appStoreUrl?: string;
  websiteUrl?: string;
  supportEmail: string;
  legalOwner: string;
  privacyUpdatedAt: string;
  termsUpdatedAt: string;
  icon: string;
  screenshots: string[];
  accentColor: string;
  features: string[];
  policyProfile: PolicyProfile;
};

const supportEmail = "timmy.wu@hotmail.com";
const legalOwner = "WU HAOTIAN";

export const apps = [
  {
    slug: "echo-vault",
    name: "EchoVault",
    tagline: "Local-first voice notes that become searchable actions.",
    summary:
      "EchoVault records voice notes, transcribes them on device when available, and turns spoken tasks or meetings into local reminders and calendar-ready actions.",
    platforms: ["iOS"],
    status: "in development",
    bundleId: "com.gosingk.echovault",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-05-10",
    termsUpdatedAt: "2026-05-10",
    icon: "/apps/echo-vault/icon.png",
    screenshots: [],
    accentColor: "#25745d",
    features: [
      "On-device speech recognition where supported.",
      "Local transcript search and session history.",
      "Reminder and calendar candidates with user confirmation.",
      "Optional audio replay for Pro users — recordings stay on this device.",
      "Optional Cloud Insights for Pro users — transcript text only, never audio.",
    ],
    policyProfile: {
      dataUse: [
        "voice recordings",
        "transcripts",
        "locally extracted reminders and calendar candidates",
        "Pro subscription state and feature toggles",
      ],
      storage:
        "EchoVault is designed around local device storage for recordings, transcripts, and generated action candidates. When you turn on \"Save voice for replay,\" recordings remain in app-private storage on this device until you delete the session. Audio is never uploaded.",
      sharing:
        "Audio and transcripts are not sold. Optional sharing only happens when you choose to export or send content from the app. If you opt in to Cloud Insights (off by default, Pro only), the transcript text from a session is sent to a third-party large language model provider to generate a richer formatted summary; the audio file itself is never sent. You can turn Cloud Insights off at any time in the app, after which all extraction returns to running fully on-device.",
      permissions: [
        "Microphone access records voice notes.",
        "Speech recognition supports transcription.",
        "Calendar and reminders access is used only after you confirm actions.",
      ],
      paidFeatures:
        "EchoVault Pro is offered as a monthly or annual auto-renewing subscription, or as a one-time lifetime purchase. Subscriptions may include an introductory free trial; payment is charged to your Apple ID, renews automatically unless cancelled at least 24 hours before the end of the current period, and can be managed or cancelled in your Apple ID settings. Pro unlocks unlimited session history, semantic search across past sessions, optional audio replay, and the optional Cloud Insights toggle described in the privacy policy. Free features remain available without payment.",
      termsUse:
        "Use EchoVault for personal note taking, task capture, and meeting recall. You are responsible for recording only where you have permission.",
      availability:
        "Speech recognition, calendar, reminders, audio replay, and Cloud Insights behavior can vary by device, OS version, region, network connectivity, and the permissions or toggles you have granted.",
    },
  },
  {
    slug: "duetshot",
    name: "DuetShot",
    tagline: "Front and back camera recording for creators.",
    summary:
      "DuetShot helps creators record split-screen videos with front and rear cameras, creator controls, beauty tuning, LUTs, watermark options, and crash recovery.",
    platforms: ["iOS"],
    status: "live",
    bundleId: "com.gosingk.dual-cam",
    appStoreUrl: "https://apps.apple.com/app/id6763319160",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-05-10",
    termsUpdatedAt: "2026-05-10",
    icon: "/apps/duetshot/icon.png",
    screenshots: [
      "/apps/duetshot/screenshot-1.png",
      "/apps/duetshot/screenshot-2.png",
      "/apps/duetshot/screenshot-3.png",
    ],
    accentColor: "#7559c9",
    features: [
      "Simultaneous front and back camera recording.",
      "Creator tools for layouts, LUTs, watermarking, and trim flow.",
      "Recovery paths for interrupted recordings.",
    ],
    policyProfile: {
      dataUse: [
        "camera and microphone recordings",
        "photo library saves",
        "creator settings such as layout, LUT, and watermark choices",
      ],
      storage:
        "DuetShot stores recordings and exports on your device or in your photo library when you save them.",
      sharing:
        "Videos are shared only when you use platform sharing, export, or save actions. DuetShot does not sell your recordings.",
      permissions: [
        "Camera access previews and records video.",
        "Microphone access records audio with videos.",
        "Photo library access saves completed recordings.",
      ],
      paidFeatures:
        "Paid features may unlock creator tools such as Pro capture options, watermark controls, or visual enhancements.",
      termsUse:
        "Use DuetShot only to record content you have the right to capture and share.",
      availability:
        "Multi-camera recording requires compatible iPhone hardware and may vary by device capability, battery, storage, and OS behavior.",
    },
  },
  {
    slug: "found",
    name: "Found",
    tagline: "A spatial memory for physical belongings.",
    summary:
      "Found indexes personal assets with spatial context, object capture workflows, NFC identity, and local-first search for where things were last seen.",
    platforms: ["iOS", "iPadOS"],
    status: "in development",
    bundleId: "com.gosingk.ios-found",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-05-10",
    termsUpdatedAt: "2026-05-10",
    icon: "/apps/found/icon.png",
    screenshots: [],
    accentColor: "#b46b20",
    features: [
      "Spatial asset records for rooms, containers, and layers.",
      "Object Capture and ARKit-oriented workflows.",
      "NFC tagging for physical item identity.",
    ],
    policyProfile: {
      dataUse: [
        "spatial asset records",
        "camera scans",
        "location proofs",
        "NFC tag identifiers",
      ],
      storage:
        "Found is designed to keep asset maps, spatial proofs, and scan records on your device unless you choose to export them.",
      sharing:
        "Asset records are not sold. Sharing is limited to exports or system actions you start.",
      permissions: [
        "Camera access supports scan and object capture workflows.",
        "Location access can attach last-known place context to assets.",
        "NFC access reads or writes tags that identify your belongings.",
      ],
      paidFeatures:
        "Paid features may expand asset limits, advanced spatial tools, or export workflows.",
      termsUse:
        "Use Found for belongings and spaces you own or have permission to scan, tag, and document.",
      availability:
        "Spatial mapping, Object Capture, NFC, and AR guidance depend on supported Apple hardware and OS capabilities.",
    },
  },
  {
    slug: "scholar-daily",
    name: "ScholarDaily",
    tagline: "Five top papers, summarized in sixty seconds.",
    summary:
      "ScholarDaily delivers a concise daily research briefing with plain-English summaries, archives, search, and premium access to deeper paper collections.",
    platforms: ["iOS"],
    status: "beta",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-05-10",
    termsUpdatedAt: "2026-05-10",
    icon: "/apps/scholar-daily/icon.png",
    screenshots: [],
    accentColor: "#2d65a3",
    features: [
      "Daily curated research briefings.",
      "Plain-English paper summaries.",
      "Archive and search for premium readers.",
    ],
    policyProfile: {
      dataUse: [
        "daily research briefings",
        "reading status",
        "search queries",
        "subscription status",
      ],
      storage:
        "ScholarDaily may store reading preferences, archive access state, and subscription state on your device and supporting backend services.",
      sharing:
        "Reader data is not sold. Payment processing and subscription status may be handled by platform services.",
      permissions: [
        "Network access fetches daily papers and archive data.",
        "In-app purchase access manages premium briefing access.",
      ],
      paidFeatures:
        "Paid features may unlock full archives, all daily papers, search access, and premium summaries.",
      termsUse:
        "Use ScholarDaily for personal learning and research discovery. Paper links and source material remain owned by their original publishers.",
      availability:
        "Briefing availability depends on source feeds, backend processing, network access, and subscription state.",
    },
  },
  {
    slug: "kodda",
    name: "Kodda",
    tagline: "AI support widget for product docs and FAQs.",
    summary:
      "Kodda turns product documentation, FAQs, and connected knowledge sources into a grounded AI support widget that can be shared by public link, website embed, or API.",
    platforms: ["Web"],
    status: "beta",
    websiteUrl: "https://kodda.dev",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-05-10",
    termsUpdatedAt: "2026-05-10",
    icon: "/apps/kodda/icon.png",
    screenshots: [],
    accentColor: "#0f766e",
    features: [
      "Upload documents, websites, and knowledge sources for indexing.",
      "Deploy a grounded support assistant by public link, embed, or API.",
      "Use plan-based quotas, integrations, analytics, and source-backed answers.",
    ],
    policyProfile: {
      dataUse: [
        "product documentation and FAQs",
        "workspace account details",
        "uploaded files, website content, and connected knowledge sources",
        "chat messages, source citations, analytics, and subscription state",
      ],
      storage:
        "Kodda stores workspace data, uploaded or connected knowledge sources, indexed chunks, vector search metadata, bot configuration, conversations, and billing entitlement state in supporting backend services.",
      sharing:
        "Workspace content and conversations are not sold. Kodda may send retrieved context and chat messages to configured AI model providers to generate answers, and may share billing or authentication data with the services needed to run account and subscription features.",
      permissions: [
        "Network access is required to use the web app, chat widget, public links, and API.",
        "Connected sources such as Google Drive or Notion are accessed only after you authorize them.",
        "Website embeds require allowed-domain configuration before they can serve visitor chats.",
      ],
      paidFeatures:
        "Paid plans may unlock higher usage limits, website embed, API access, integrations, custom rate limits, analytics, white-label options, and priority support. Billing and entitlement state are managed by the configured subscription provider.",
      termsUse:
        "Use Kodda to create support assistants from content you own, control, or have permission to process. You are responsible for the accuracy of your docs, bot configuration, allowed domains, and published answers.",
      availability:
        "Kodda availability depends on network access, browser behavior, configured AI and embedding providers, connected services, quota limits, and backend infrastructure health.",
    },
  },
] satisfies AppContent[];

export function getAppBySlug(slug: string) {
  return apps.find((app) => app.slug === slug);
}

export function getAppRoutes(app: AppContent) {
  return {
    intro: `/apps/${app.slug}`,
    privacy: `/apps/${app.slug}/privacy`,
    terms: `/apps/${app.slug}/terms`,
  };
}

export function getPolicyPage(app: AppContent, kind: PolicyKind) {
  if (kind === "privacy") {
    return getPrivacyPage(app);
  }

  return getTermsPage(app);
}

function getPrivacyPage(app: AppContent) {
  const dataUse = app.policyProfile.dataUse.join(", ");

  return {
    title: `${app.name} Privacy Policy`,
    updatedAt: app.privacyUpdatedAt,
    sections: [
      {
        heading: "Information Used",
        body: `${app.name} may use ${dataUse} to provide the app features described on this page.`,
      },
      {
        heading: "Storage",
        body: app.policyProfile.storage,
      },
      {
        heading: "Permissions",
        body: app.policyProfile.permissions.join(" "),
      },
      {
        heading: "Sharing",
        body: app.policyProfile.sharing,
      },
      {
        heading: "Support",
        body: `For privacy questions, contact ${app.supportEmail}. This policy is maintained by ${app.legalOwner}.`,
      },
    ],
  };
}

function getTermsPage(app: AppContent) {
  return {
    title: `${app.name} Terms of Use`,
    updatedAt: app.termsUpdatedAt,
    sections: [
      {
        heading: "Use of the App",
        body: app.policyProfile.termsUse,
      },
      {
        heading: "Paid Features",
        body: app.policyProfile.paidFeatures,
      },
      {
        heading: "Availability",
        body: app.policyProfile.availability,
      },
      {
        heading: "Support",
        body: `For product or account questions, contact ${app.supportEmail}. These terms are maintained by ${app.legalOwner}.`,
      },
    ],
  };
}
