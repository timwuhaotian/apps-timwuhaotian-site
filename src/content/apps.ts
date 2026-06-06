export type AppStatus = "live" | "beta" | "in development";

export type AppPlatform = "iOS" | "iPadOS" | "Android" | "Web";

export type PolicyKind = "privacy" | "terms";

type ThirdParty = {
  name: string;
  description: string;
};

type PolicyProfile = {
  dataUse: string[];
  storage: string;
  sharing: string;
  permissions: string[];
  paidFeatures: string;
  termsUse: string;
  availability: string;
  thirdParties?: ThirdParty[];
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

const supportEmail = "gosingk@gmail.com";
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
    privacyUpdatedAt: "2026-05-14",
    termsUpdatedAt: "2026-05-12",
    icon: "/apps/echo-vault/icon.png",
    screenshots: [],
    accentColor: "#25745d",
    features: [
      "On-device speech recognition where supported.",
      "Local transcript search and session history.",
      "Reminder and calendar candidates with user confirmation.",
      "Optional audio replay for Pro users — recordings stay on this device.",
      "Optional Cloud Insights for Pro users — transcript text only, never audio.",
      "Pro subscription (monthly auto-renewing) via Apple In-App Purchase.",
    ],
    policyProfile: {
      dataUse: [
        "voice recordings (temporarily stored on-device during recording, deleted after processing unless saved as Pro audio replay)",
        "transcripts (generated on-device via Apple's on-device Speech framework or via Xiaomi MiMo cloud ASR when Cloud Insights is enabled; stored locally)",
        "locally extracted reminders and calendar candidates (generated on-device via rule-based processing, sent to Apple Reminders or Calendar only with your explicit confirmation)",
        "Pro subscription state and feature toggles (managed via Apple In-App Purchase)",
        "Cloud Insights audio and transcript text (only when a Pro user has accepted the in-app consent screen that names the third-party processor; the audio recording is transmitted to Xiaomi MiMo, a cloud AI service operated by Xiaomi Corporation in the People's Republic of China, for speech-to-text transcription — the resulting transcript is then used for on-device task extraction)",
      ],
      storage:
        "EchoVault is designed around local device storage. Audio recordings are stored temporarily on-device during recording. After transcription, raw audio is automatically deleted unless you choose to save it as a Pro audio replay feature. Transcripts and generated action candidates are stored in the app's private sandbox on your device. Saved audio remains on your device only and can be deleted at any time from within the app or via iOS settings. EchoVault does not sync session data to any cloud backup from the app side; standard iOS device backups may include app data depending on your device backup settings.",
       sharing:
        "Audio and transcripts are never sold. By default, all processing is on-device and nothing leaves your phone. Cloud Insights is opt-in and off by default for every user, including paying subscribers. The first time a Pro user enables Cloud Insights, the app shows an in-app consent screen that names the third-party processor (Xiaomi MiMo, operated by Xiaomi Corporation in the People's Republic of China), describes exactly what is sent (audio recording for speech-to-text transcription, and the resulting transcript for task extraction), and links to Xiaomi MiMo's privacy policy. No audio or transcript leaves the device until you accept that screen. Once accepted, the audio file is sent over HTTPS to apps.timwuhaotian.dev, which proxies it to Xiaomi MiMo for ASR; the resulting transcript is then used on-device for task extraction. Audio is not retained on the EchoVault proxy after the response is returned, and the request is sent to Xiaomi MiMo without any user account or device identifier. You can turn Cloud Insights off at any time in Settings; doing so stops all transmission immediately and returns the app to fully on-device processing. EchoVault does not use any third-party analytics, tracking SDKs, or advertising frameworks. See the Third Parties section below for details on the only external service that may receive data.",
      thirdParties: [
        {
          name: "Xiaomi MiMo (Xiaomi Corporation, People's Republic of China)",
          description:
            "Receives the audio recording and plain-text transcript of a session only when you (a) hold a Pro subscription, (b) have accepted the in-app Cloud Insights consent screen, and (c) explicitly record a session with cloud enabled. Purpose: run speech-to-text transcription (ASR) and optionally a large language model inference for task extraction. The audio file is sent over HTTPS to apps.timwuhaotian.dev, which proxies it to Xiaomi MiMo's ASR endpoint; the transcript is then used for on-device task extraction. Audio is not retained on the EchoVault proxy after the response is returned, and no account or device identifier is sent with the request. Because Xiaomi MiMo processes the request in China, audio and transcript data leave your country during processing. Xiaomi MiMo's privacy policy: https://privacy.mi.com/all/en_US/",
        },
      ],
      permissions: [
        "Microphone access records voice notes. Audio is captured locally and processed on-device by default.",
        "Speech recognition supports transcription using Apple's on-device SFSpeechRecognizer when available — no audio or transcript is transmitted during recognition.",
        "Calendar and reminders access is used only after you confirm individual action items.",
      ],
      paidFeatures:
        "EchoVault Pro is offered as a monthly or annual auto-renewing subscription, or as a one-time lifetime purchase. Subscriptions may include an introductory free trial; payment is charged to your Apple ID, renews automatically unless cancelled at least 24 hours before the end of the current period, and can be managed or cancelled in your Apple ID settings. Pro unlocks unlimited session history, semantic search across past sessions, optional audio replay, and the optional Cloud Insights toggle described in this privacy policy. Free features remain available without payment.",
      termsUse:
        "Use EchoVault for personal note taking, task capture, and meeting recall. You are responsible for recording only where you have permission. EchoVault is not intended for users under 13.",
      availability:
        "On-device speech recognition, calendar, reminders, audio replay, and Cloud Insights behavior can vary by device, OS version, region, network connectivity, and the permissions or toggles you have granted.",
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
    tagline: "A private photo + GPS memory for the things you put down.",
    summary:
      "Found saves a photo of an item with its GPS coordinate, on-device Vision labels, and OCR text so you can later search by name, tag, or anything that was written on the object.",
    platforms: ["iOS", "iPadOS"],
    status: "beta",
    bundleId: "com.gosingk.ios-found",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-05-15",
    termsUpdatedAt: "2026-05-15",
    icon: "/apps/found/icon.png",
    screenshots: [],
    accentColor: "#b46b20",
    features: [
      "Capture a photo, store it locally with GPS coordinates, timestamp, and accuracy.",
      "On-device Vision labels and OCR text make every saved item searchable.",
      "Tags, names, and last-place notes recall where each item was placed.",
      "Optional Object Capture, AR overlays, UWB precision finding, and NFC tag reading on supported hardware.",
    ],
    policyProfile: {
      dataUse: [
        "photos captured in the app (stored only in the app's private sandbox on your device)",
        "GPS coordinates with horizontal accuracy attached to each saved photo (stored on-device only)",
        "on-device Vision classifications and OCR text generated locally (stored on-device only)",
        "item names, tags, and last-place notes you enter",
        "Apple identifier for advertisers (IDFA), only if you grant the App Tracking Transparency prompt, used to request personalized banner ads from Google AdMob",
        "device-level identifiers and SKAdNetwork attribution signals sent by the iOS system to Google AdMob and its mediation networks for ad rendering and conversion measurement",
      ],
      storage:
        "Found stores all photos, GPS coordinates, Vision labels, OCR text, tags, and last-place notes in the app's private sandbox on your device. No Found account exists, no cloud backend processes your item data, and Found does not upload your photos or item list anywhere. Standard iOS device backups may include this data depending on your device backup settings.",
      sharing:
        "Found does not sell your item data. The only data that leaves your device is what Google AdMob and its iOS SDKs need to render banner advertisements: this includes IDFA when you have granted the App Tracking Transparency permission, otherwise a non-personalized ad request is made without IDFA. AdMob may also receive coarse signals from the iOS system such as approximate location (derived from IP), device type, OS version, and SKAdNetwork attribution postbacks. Your photos, GPS coordinates, Vision labels, OCR text, item names, tags, and last-place notes are never sent to Google AdMob or to any other Found backend. Found has no analytics SDK and no crash reporting beyond what AdMob's SDK includes for ad delivery.",
      thirdParties: [
        {
          name: "Google AdMob (Google LLC, United States)",
          description:
            "Renders banner ads at the top and bottom of the Found app. Receives Apple's identifier for advertisers (IDFA) only when you accept the App Tracking Transparency prompt; otherwise receives a non-personalized ad request. May also receive coarse signals provided by the iOS system: IP-derived approximate location, device type, OS version, time zone, and SKAdNetwork attribution postbacks for measuring ad conversions. Does not receive your photos, GPS coordinates, item names, tags, OCR text, or Vision labels. Google AdMob may share these signals with its mediation networks to serve ads. You can revoke the App Tracking Transparency permission at any time in iOS Settings > Privacy & Security > Tracking. AdMob privacy policy: https://policies.google.com/privacy",
        },
      ],
      permissions: [
        "Camera access is required to capture the photo of an item you want to remember.",
        "Location access (When in Use) attaches a GPS coordinate and horizontal accuracy to each saved photo. Coarse location only is sufficient; precise location is not required.",
        "Photo library access is only requested if you choose to import an existing image instead of taking a new photo.",
        "App Tracking Transparency prompts you once to allow Google AdMob to use your IDFA for personalized advertising. Denying still lets ads serve, but they will be non-personalized.",
        "Optional Nearby Interaction (UWB) and NFC permissions only activate on supported devices when you use the advanced precision finding or tag reading features. Neither is required for the core photo + GPS flow.",
      ],
      paidFeatures:
        "Found is free to use and supported by Google AdMob banner advertising. There are currently no in-app purchases or subscriptions.",
      termsUse:
        "Use Found for belongings and spaces you own or have permission to photograph, tag, and document. Do not use Found to capture or store images of other people without their consent.",
      availability:
        "The core photo + GPS memory works on any iPhone or iPad running the supported iOS version. Optional 3D Object Capture and ARKit overlays require an iPhone with LiDAR (iPhone 12 Pro or later). UWB precision finding requires an iPhone 11 or later. NFC tag reading requires an iPhone 7 or later.",
    },
  },
  {
    slug: "scholar-daily",
    name: "ScholarDaily",
    tagline: "Five top papers, summarized in sixty seconds.",
    summary:
      "ScholarDaily delivers a concise daily research briefing with plain-English summaries, archives, search, and premium access to deeper paper collections.",
    platforms: ["iOS"],
    status: "live",
    bundleId: "com.gosingk.scholardaily",
    appStoreUrl: "https://apps.apple.com/us/app/scholardaily/id6767979151",
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
    slug: "client-memory",
    name: "ClientMemory",
    tagline: "Local-first CRM with on-device AI for solo agents.",
    summary:
      "ClientMemory is a private CRM that lives entirely on your iPhone. It records each client's calls, viewings, messages, and deals, then uses Apple Intelligence on-device to summarise the relationship and draft the next follow-up. There is no account, no server, and no third-party LLM.",
    platforms: ["iOS"],
    status: "in development",
    bundleId: "com.gosingk.clientmemory",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-05-19",
    termsUpdatedAt: "2026-05-19",
    icon: "/apps/client-memory/icon.png",
    screenshots: [
      "/apps/client-memory/screenshot-1.png",
      "/apps/client-memory/screenshot-2.png",
      "/apps/client-memory/screenshot-3.png",
    ],
    accentColor: "#c04a1c",
    features: [
      "Today, Clients, Pipeline, Insights — designed around a solo agent's daily loop.",
      "Apple Intelligence (FoundationModels) generates client summaries, next-step suggestions, and follow-up drafts on-device.",
      "Private notes — a heuristic flags sensitive language and a single tap keeps that entry out of every future AI prompt.",
      "Optional iCloud Drive sync (Pro) into your own private container — opt-in, off by default, and never to our servers.",
      "Full English and Simplified Chinese localisation, including the home-screen icon label.",
    ],
    policyProfile: {
      dataUse: [
        "client records you create (names, contact details, tags, status, custom fields, timeline entries, deals) — stored only in the app's private sandbox on your device",
        "AI-generated summaries, next-step suggestions, and follow-up drafts produced on-device by Apple's FoundationModels framework — stored locally alongside the client they describe",
        "optional iCloud Drive backup blobs (Pro only, opt-in) saved as a single JSON snapshot inside your personal iCloud container",
        "Pro subscription state, daily AI generation count, and feature toggles managed via Apple In-App Purchase and iOS shared preferences",
      ],
      storage:
        "ClientMemory stores every client, timeline entry, pipeline deal, reminder, and AI output in a local SQLite database inside the app's private sandbox, protected by iOS Data Protection. There is no ClientMemory account and no backend that receives your data. If you turn on iCloud sync (Pro), a single JSON snapshot of the database is written to your own iCloud Drive container so other devices signed into the same Apple ID can read it; the snapshot lives in your iCloud, not ours, and toggling sync off stops further writes. Standard iOS device backups may include the local database depending on your device backup settings.",
      sharing:
        "Client records, timeline entries, deals, and AI outputs are never sold and never sent to any ClientMemory server. ClientMemory has no analytics SDK, no crash-reporting third party, and no advertising framework. All generative AI runs locally on your device via Apple's FoundationModels (Apple Intelligence) framework — prompts and outputs do not leave the device and are not seen by Apple, OpenAI, Anthropic, MiniMax, or any other third party. The only data path off-device is the optional iCloud Drive sync, which is opt-in, off by default, and routes through your own iCloud container under your Apple ID. Notes you have marked private are excluded from the context sent into the on-device model.",
      permissions: [
        "No microphone, camera, contacts, location, calendar, or photo library permissions are required to use ClientMemory.",
        "Network access is requested only if you enable iCloud Drive sync (Pro), and only to communicate with Apple's iCloud servers using the framework provided by iOS.",
        "App Tracking Transparency is not requested. ClientMemory does not use IDFA or any cross-app tracking identifier.",
      ],
      paidFeatures:
        "ClientMemory Pro is offered as a monthly or annual auto-renewing subscription, or as a one-time lifetime purchase. Subscriptions are charged to your Apple ID at confirmation, renew automatically unless cancelled at least 24 hours before the end of the current period, and can be managed or cancelled in your Apple ID settings. Pro unlocks unlimited daily AI generations (summaries, follow-up drafts, weekly insights), multi-device iCloud Drive sync, smart lists, custom fields, and CSV/JSON exports. Free features remain available without payment.",
      termsUse:
        "Use ClientMemory to manage relationships with people who have agreed to be your client. You are responsible for complying with local data-protection rules in the jurisdiction where you do business, including obtaining any consent your client needs to give before you record their personal details. ClientMemory is not intended for users under 13.",
      availability:
        "On-device generative features require an iPhone running iOS 26.0 or later that supports Apple Intelligence and has it enabled in Settings → Apple Intelligence & Siri. iCloud Drive sync requires that you are signed into iCloud and that iCloud Drive is enabled for ClientMemory. Daily AI generation limits, in-app purchase prices, and the availability of Pro plans can vary by region, App Store account state, and OS version.",
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
  const thirdPartiesSection = app.policyProfile.thirdParties?.length
    ? [
        {
          heading: "Third Parties We Share Data With",
          body: app.policyProfile.thirdParties
            .map((tp) => `${tp.name} — ${tp.description}`)
            .join(" "),
        },
      ]
    : [];

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
      ...thirdPartiesSection,
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
