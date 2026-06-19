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
    slug: "kinvoice",
    name: "KinVoice",
    tagline: "Preserve a loved one's voice and hear their stories again.",
    summary:
      "KinVoice records a family member's voice with their consent, clones it with cloud AI, and lets you ask questions and hear stories told back in their voice. Recordings live in a private library on your device; audio is sent to the cloud AI provider only during voice cloning, transcription, and playback, and is not retained on our servers.",
    platforms: ["iOS"],
    status: "in development",
    bundleId: "com.kinvoice.kinvoice",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-06-18",
    termsUpdatedAt: "2026-06-18",
    icon: "/apps/kinvoice/icon.png",
    screenshots: [],
    accentColor: "#2F4A3A",
    features: [
      "Record guided voice memories of a family member with consent-first prompts.",
      "Clone their voice with cloud AI and chat — hear replies and stories told back in their voice.",
      "Speak your questions aloud (cloud speech-to-text) or type them.",
      "A private memory library of recordings and generated stories lives on your device.",
      "Sign in with Apple; in-app account deletion removes your server-side data.",
      "Free to start with one cloned voice; KinVoice Pro (auto-renewing) raises limits and allows up to five voices.",
    ],
    policyProfile: {
      dataUse: [
        "voice recordings of a family member, captured with their consent (the raw reference sample is stored only in the app's private storage on your device and re-sent to the cloud voice service on each synthesis — see Third Parties)",
        "the questions you speak during voice chat (transmitted to the cloud AI service for speech-to-text and not retained on our servers)",
        "your chat messages and the family member's name and relationship you provide as context (sent to the cloud AI service to generate replies and stories)",
        "your Apple account identifier and email address from Sign in with Apple (the email may be a private Apple relay address; used to create and identify your account)",
        "voice-profile metadata you create — family member name, title, generated voice label, and recording duration (stored on our server so your cloned voices list across devices)",
        "usage counters and subscription state — voice minutes, message and story counts, plan tier, and Apple transaction identifiers — managed through Apple In-App Purchase and stored on our server",
      ],
      storage:
        "KinVoice keeps your raw voice recordings — the reference audio used for cloning — in the app's private storage on your device. That on-device audio is the single source of truth: it is re-sent to the cloud voice service each time speech is generated, rather than stored on our servers. Our backend (a SQLite database on a private server) stores only your account (Apple user identifier, the email returned by Sign in with Apple, and an optional display name), voice-profile metadata (family member name, title, generated voice label, and duration), usage counters, and Apple subscription state. We do not retain raw or generated audio on our servers beyond the moment needed to relay a single request to the cloud voice provider. You can delete your account and all server-side data from within the app at any time, which removes your account, voice-profile metadata, usage, and subscription records from our server; deleting the app removes the on-device library. Standard iOS device backups may include the on-device library depending on your backup settings.",
      sharing:
        "KinVoice does not sell your data. Your recordings, voice library, and chat content are never used for advertising, and the app contains no analytics or tracking SDK. To clone a voice, transcribe what you say, generate a reply or story, and speak it back in the cloned voice, KinVoice transmits the relevant audio and text over HTTPS to Xiaomi MiMo, a cloud AI service operated by Xiaomi Corporation in the People's Republic of China; because this provider processes requests in China, that audio and text leave your country during processing. These requests carry only an opaque account identifier used for usage metering — your name, email, and Apple identifier are not sent with them. Subscription receipts are sent to Apple for validation. See the Third Parties section below for details.",
      thirdParties: [
        {
          name: "Xiaomi MiMo (Xiaomi Corporation, People's Republic of China)",
          description:
            "The cloud AI provider that powers voice cloning, speech-to-text, chat replies, and cloned-voice synthesis. It receives the reference voice sample (to clone a family member's voice), the audio you record during voice chat (for transcription), the text of your messages and the family member's name you provide (to generate a reply or story), and the reply text (to synthesize speech in the cloned voice). Audio and text are sent over HTTPS for each request and are not retained on KinVoice's own servers; no name, email, or Apple identifier accompanies these requests, only an opaque account identifier for metering. Because Xiaomi MiMo processes requests in China, this data leaves your country during processing. Xiaomi MiMo privacy policy: https://privacy.mi.com/all/en_US/",
        },
        {
          name: "Apple (Apple Inc., United States)",
          description:
            "Provides Sign in with Apple, which returns your Apple user identifier and, on first sign-in, your email address or a private Apple relay address, and validates In-App Purchase subscription receipts. You can manage or stop forwarding from a private relay address in your Apple ID settings. Apple privacy policy: https://www.apple.com/legal/privacy/",
        },
      ],
      permissions: [
        "Microphone access records the voice samples you capture and the questions you speak during voice chat.",
        "Sign in with Apple creates and identifies your account; the email may be a private relay address you can disable in your Apple ID settings.",
        "Network access is required to clone voices, transcribe speech, generate chat replies and stories, synthesize cloned-voice audio, and validate subscriptions.",
      ],
      paidFeatures:
        "KinVoice is free to start, including one cloned voice and a monthly allowance of voice minutes, chat messages, and stories. KinVoice Pro is an auto-renewing subscription (monthly or yearly) sold through Apple In-App Purchase that raises those allowances and allows up to five cloned voices. Payment is charged to your Apple ID at confirmation, renews automatically unless cancelled at least 24 hours before the end of the current period, and can be managed or cancelled in your Apple ID settings.",
      termsUse:
        "Use KinVoice only to record and clone the voice of a person who has given you explicit consent to do so; you are responsible for obtaining that consent. Do not use KinVoice to impersonate, defraud, or harm anyone, or to clone a voice without permission. AI-generated speech and responses are a synthetic recreation of a voice and may be imperfect or inaccurate. KinVoice is not intended for users under 13.",
      availability:
        "Voice cloning, transcription, chat, story generation, and cloned-voice playback require a network connection and depend on the availability of the Xiaomi MiMo cloud service. Behavior can vary by region, network connectivity, device, OS version, and your plan limits. Monthly allowances, cloned-voice counts, and in-app purchase prices can vary by region and App Store account state.",
    },
  },
  {
    slug: "echo-vault",
    name: "EchoVault",
    tagline: "Local-first voice notes that become searchable actions.",
    summary:
      "EchoVault records voice notes, transcribes them on device when available, and turns spoken tasks or meetings into local reminders and calendar-ready actions.",
    platforms: ["iOS"],
    status: "live",
    bundleId: "com.gosingk.echovault",
    appStoreUrl: "https://apps.apple.com/us/app/echovault-voice-note-recorder/id6767749169",
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
    status: "live",
    bundleId: "com.gosingk.ios-found",
    appStoreUrl: "https://apps.apple.com/us/app/found-photo-spot-find-car/id6767745845",
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
  {
    slug: "ai-quick-note",
    name: "AI Quick Note",
    tagline: "Brain dump → tidy note, 100% offline.",
    summary:
      "AI Quick Note turns messy thoughts into structured notes — automatically. Type anything and on-device AI classifies the type, gives it a title, and organizes it into a checklist, address, contact, hint, or journal entry. Everything stays on your device; there is no account and no server.",
    platforms: ["iOS"],
    status: "in development",
    bundleId: "com.gosingk.aiquicknote",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-06-07",
    termsUpdatedAt: "2026-06-07",
    icon: "/apps/ai-quick-note/icon.png",
    screenshots: [
      "/apps/ai-quick-note/01_write_messy_notes.png",
      "/apps/ai-quick-note/02_ai_organizes_instantly.png",
      "/apps/ai-quick-note/03_chaos_to_action.png",
      "/apps/ai-quick-note/04_find_anything_fast.png",
      "/apps/ai-quick-note/05_private_by_design.png",
    ],
    accentColor: "#E8603C",
    features: [
      "Dump any messy thought and get a structured note — automatically.",
      "On-device AI via Apple Intelligence (Foundation Models) on supported devices, with a built-in offline organizer when it is unavailable.",
      "Seven auto-detected note types: To-do, Shopping, Idea, Address, Contact, Password hint, Journal.",
      "Semantic search finds notes by meaning, not just keywords — search 'that dentist' and find 'Dr. Park on 5th'.",
      "One-tap call, directions, and email from contact and address notes.",
      "Free, supported by advertising placeholders (no real ad SDK shipped yet).",
    ],
    policyProfile: {
      dataUse: [
        "the notes, checklists, addresses, contacts, and other content you create (stored only in the app's private storage on your device via SharedPreferences)",
        "your app settings including theme, accent color, and ad density preference (stored on-device only)",
        "on-device AI analysis results — note type, title, structured content, keywords, and reminder suggestions produced locally by Apple's FoundationModels framework or the built-in offline organizer",
      ],
      storage:
        "AI Quick Note stores every note, checklist item, address, contact field, password hint, and journal entry in the app's private SharedPreferences storage on your device. There is no AI Quick Note account, no cloud backend, and no server that receives your data. On-device AI analysis runs locally using Apple's Foundation Models (Apple Intelligence) where available, or a deterministic offline fallback; the text you enter is never sent to any AI server operated by us. Standard iOS device backups may include this data depending on your device backup settings.",
      sharing:
        "AI Quick Note does not sell your data and does not send your notes, content, or analysis results to any backend. The app has no analytics SDK, no crash-reporting third party, and no advertising framework. No network requests are made at any time — the app works fully offline. Your notes never leave your device.",
      permissions: [
        "No microphone, camera, contacts, location, calendar, or photo library permissions are required to use AI Quick Note.",
        "No network access is requested or used. The app works fully offline.",
        "App Tracking Transparency is not requested. AI Quick Note does not use IDFA or any cross-app tracking identifier.",
      ],
      paidFeatures:
        "AI Quick Note is free to use. There are currently no in-app purchases or subscriptions. Advertising placeholders are present in the UI but no real ad SDK is shipped; if advertising is introduced in a future update, this policy will be revised accordingly.",
      termsUse:
        "Use AI Quick Note for personal note taking, task capture, and idea organization. The on-device AI organizes text you provide; it may be imperfect — review structured output before relying on it for important information such as addresses or passwords. AI Quick Note stores password hints only, never actual passwords. AI Quick Note is not intended for users under 13.",
      availability:
        "On-device AI note organization uses Apple's Foundation Models (Apple Intelligence) and requires an iPhone running iOS 26 or later that supports Apple Intelligence and has it enabled in Settings → Apple Intelligence & Siri. On other devices the app falls back to a deterministic offline organizer that works without AI. Semantic search, note types, and all core features work on any supported device without network access.",
    },
  },
  {
    slug: "ai-chinese-dict",
    name: "AI Chinese Dict",
    tagline: "An on-device AI Chinese dictionary for English speakers.",
    summary:
      "AI Chinese Dict turns any Chinese word, phrase, or sentence into pinyin, a clear English meaning, and natural example sentences using on-device Apple Intelligence — then files it into a spaced-review deck. Everything is generated and stored on your device; there is no account and no dictionary backend.",
    platforms: ["iOS", "iPadOS"],
    status: "in development",
    bundleId: "com.aidict.aiPersonalDict",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-06-07",
    termsUpdatedAt: "2026-06-07",
    icon: "/apps/ai-chinese-dict/icon.png",
    screenshots: [],
    accentColor: "#a86617",
    features: [
      "Capture any Chinese word, phrase, or sentence and get pinyin, an English meaning, and example sentences.",
      "On-device analysis via Apple Intelligence (Foundation Models) on supported devices, with an offline fallback editor when it is unavailable.",
      "Spaced-review deck with mastery progress and a daily streak.",
      "Built-in zh-CN text-to-speech reads the Chinese headword aloud, fully offline.",
      "Favorites, full manual editing, and categories — all stored locally on your device.",
      "Free, supported by Google AdMob advertising.",
    ],
    policyProfile: {
      dataUse: [
        "the Chinese words, phrases, and sentences you capture, together with the pinyin, English meanings, and example sentences generated for them (stored only in the app's private storage on your device)",
        "your review progress, favorites, categories, app settings, and daily streak (stored on-device only)",
        "Apple identifier for advertisers (IDFA), only if you grant the App Tracking Transparency prompt, used to request personalized ads from Google AdMob",
        "device-level identifiers and SKAdNetwork attribution signals sent by the iOS system to Google AdMob and its mediation networks for ad rendering and conversion measurement",
      ],
      storage:
        "AI Chinese Dict stores your saved words, pinyin, meanings, example sentences, review progress, favorites, categories, and settings in the app's private storage on your device. There is no AI Chinese Dict account and no dictionary backend that receives your data, and your word list is never uploaded anywhere. Word analysis runs on-device using Apple's Foundation Models (Apple Intelligence) framework where available, or an offline local fallback; the text you enter is not sent to any dictionary or AI server operated by us. Standard iOS device backups may include this data depending on your device backup settings.",
      sharing:
        "AI Chinese Dict does not sell your data and does not send your words, definitions, or review history to any backend. The only data that leaves your device is what Google AdMob and its iOS SDKs need to render advertisements: this includes the IDFA when you have granted the App Tracking Transparency permission, otherwise a non-personalized ad request is made without the IDFA. AdMob may also receive coarse signals from the iOS system such as approximate location (derived from IP address), device type, OS version, and SKAdNetwork attribution postbacks. For users in the European Economic Area, the United Kingdom, and Switzerland, a Google-certified consent message (via Google's User Messaging Platform) is shown before any personalized ad is requested. AI Chinese Dict has no analytics SDK and no crash reporting beyond what AdMob's SDK includes for ad delivery. You can turn ads off, or switch to non-personalized ads, at any time in the app's settings.",
      thirdParties: [
        {
          name: "Google AdMob (Google LLC, United States)",
          description:
            "Renders the native, banner, and optional rewarded advertisements shown in AI Chinese Dict. Receives Apple's identifier for advertisers (IDFA) only when you accept the App Tracking Transparency prompt; otherwise receives a non-personalized ad request without the IDFA. May also receive coarse signals provided by the iOS system: IP-derived approximate location, device type, OS version, time zone, and SKAdNetwork attribution postbacks for measuring ad conversions. Does not receive your saved words, pinyin, meanings, example sentences, categories, or review history. For users in the EEA, the UK, and Switzerland, Google's User Messaging Platform presents a consent form before personalized ads are served. You can revoke the App Tracking Transparency permission at any time in iOS Settings > Privacy & Security > Tracking, or disable ads inside the app. AdMob privacy policy: https://policies.google.com/privacy",
        },
      ],
      permissions: [
        "No microphone, camera, contacts, location, or photo library permissions are required to use AI Chinese Dict.",
        "Text-to-speech uses the device's built-in speech synthesizer to read the Chinese headword aloud; no audio is recorded or transmitted.",
        "App Tracking Transparency prompts you once to allow Google AdMob to use your IDFA for personalized advertising. Denying still lets ads serve, but they will be non-personalized.",
        "Network access is used only to load advertisements from Google AdMob and, in supported regions, the consent message; the dictionary itself works offline.",
      ],
      paidFeatures:
        "AI Chinese Dict is free to use and supported by Google AdMob advertising, including a native card, a banner, and an optional rewarded ad that unlocks deeper review analysis. There are currently no in-app purchases or subscriptions.",
      termsUse:
        "Use AI Chinese Dict for personal language learning. Word analysis is generated by on-device AI and may be imperfect — verify important translations against an authoritative source before relying on them. AI Chinese Dict is not intended for users under 13.",
      availability:
        "On-device AI word analysis uses Apple's Foundation Models (Apple Intelligence) and requires a supported iPhone or iPad running iOS 26 or later with Apple Intelligence enabled; on other devices the app falls back to an offline editor you complete yourself. Text-to-speech voices, advertising availability, the App Tracking Transparency prompt, and the regional consent message can vary by device, OS version, region, and network connectivity.",
    },
  },
  {
    slug: "the-pair",
    name: "The Pair",
    tagline: "Two AI agents cross-check each other's code.",
    summary:
      "The Pair is a free, open-source desktop app that runs two AI coding agents — a read-only Mentor that plans and reviews, and an Executor that writes code and runs commands — which cross-check each other's work to catch AI hallucinations before they reach your codebase. Model-agnostic: mix Claude Code, OpenAI Codex, Gemini CLI, and opencode in any combination.",
    platforms: ["Web"],
    status: "live",
    websiteUrl: "https://github.com/timwuhaotian/the-pair",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-06-19",
    termsUpdatedAt: "2026-06-19",
    icon: "/apps/the-pair/icon.png",
    screenshots: [],
    accentColor: "#6366f1",
    features: [
      "Dual-agent architecture — read-only Mentor + Executor cross-validate each other's output.",
      "Unified Pair Console with conversation, timeline, terminal events, and activity in one scrollable feed.",
      "Model-agnostic — mix Claude Code, Codex, Gemini CLI, opencode, or local models via Ollama.",
      "Smart Coordination with structured handoff prompts, quality gates, and smart-pause logic.",
      "Full Automation Mode — agents work autonomously with workspace-scoped permissions.",
      "Git change tracking with unified diff viewer, token usage monitoring, and session recovery.",
      "i18n — English, 简体中文, 日本語, 한국어.",
    ],
    policyProfile: {
      dataUse: [
        "project files and code in your local workspace (read and modified by the AI agents you configure)",
        "conversation history and agent session data (stored locally on your device)",
        "API keys for AI providers you configure (stored locally on your device, never transmitted to The Pair's developers)",
      ],
      storage:
        "The Pair stores all session data, conversation history, and configuration locally on your device. There is no account system, no cloud backend, and no server that receives your data. API keys for AI providers are stored in your local configuration and used only to communicate directly with the provider endpoints you specify.",
      sharing:
        "The Pair does not collect, transmit, or sell any user data. Your code, conversations, and agent sessions never leave your device except when sent directly to the AI provider endpoints you have configured (e.g., Anthropic, OpenAI, Google). The Pair has no analytics SDK, no telemetry, no crash reporting, and no tracking of any kind.",
      permissions: [
        "File system access reads and writes project files in your local workspace.",
        "Network access communicates only with AI provider API endpoints you configure.",
        "No microphone, camera, contacts, location, or photo library permissions are required.",
      ],
      paidFeatures:
        "The Pair is free and open-source under the Apache 2.0 license. There are no in-app purchases, subscriptions, or paid features. AI provider costs are billed directly by the providers you choose to use.",
      termsUse:
        "Use The Pair for software development on codebases you own or have permission to modify. You are responsible for reviewing AI-generated code before committing or deploying it. The Pair is a development aid — always verify agent output. The Pair is not intended for users under 13.",
      availability:
        "The Pair requires macOS, Windows, or Linux with sufficient resources to run your configured AI agents. AI provider availability, rate limits, and costs depend on the providers you configure. Some features such as local model support require additional setup (e.g., Ollama).",
    },
  },
  {
    slug: "harbor",
    name: "Harbor",
    tagline: "Turn your Mac or PC into a private exit node.",
    summary:
      "Harbor is a personal desktop app that bundles sing-box and cloudflared to turn your machine into a VLESS WebSocket exit node through Cloudflare Tunnel — no manual CLI setup required. Scan a QR code or copy a VLESS link to connect from any compatible client.",
    platforms: ["Web"],
    status: "live",
    websiteUrl: "https://github.com/timwuhaotian/harbor",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-06-19",
    termsUpdatedAt: "2026-06-19",
    icon: "/apps/harbor/icon.png",
    screenshots: [],
    accentColor: "#0ea5e9",
    features: [
      "Zero-config tunnel — bundled cloudflared and sing-box binaries, no manual installation.",
      "QR code and VLESS link — scan or copy to connect from V2Box, Surge, Shadowrocket, and more.",
      "System tray controls — start, stop, and manage from the menu bar; close-to-tray behavior.",
      "Auto-launch on login for persistent operation.",
      "Bilingual UI — English and 中文 with in-app language switcher.",
      "Built-in auto-update checker with changelog display and one-click download.",
      "Real-time logs with port conflict detection and dependency health checks.",
    ],
    policyProfile: {
      dataUse: [
        "tunnel configuration and credentials you create (stored locally on your device)",
        "Cloudflare Tunnel tokens and VLESS connection parameters (stored in the app's local config)",
        "runtime logs from sing-box and cloudflared processes (displayed in-app, stored locally)",
      ],
      storage:
        "Harbor stores all configuration, tunnel credentials, and logs locally on your device. There is no account system, no cloud backend, and no telemetry server. Tunnel tokens and VLESS parameters are written to the app's local configuration directory.",
      sharing:
        "Harbor does not collect, transmit, or sell any user data. The app has no analytics SDK, no telemetry, no crash reporting, and no tracking. Network traffic flows only through the Cloudflare Tunnel you configure. Harbor does not phone home to its developers.",
      permissions: [
        "Network access runs cloudflared and sing-box processes that create the local tunnel endpoint.",
        "File system access stores configuration and bundled binaries in the app's local directory.",
        "No microphone, camera, contacts, location, or photo library permissions are required.",
      ],
      paidFeatures:
        "Harbor is free and open-source under the Apache 2.0 license. There are no in-app purchases, subscriptions, or paid features. Cloudflare Tunnel usage is governed by Cloudflare's own terms and pricing.",
      termsUse:
        "Use Harbor only on machines you own or have permission to configure as network exit nodes. You are responsible for complying with local laws regarding proxy and tunnel services. Harbor is not intended for users under 13.",
      availability:
        "Harbor requires macOS or Windows with network access. The bundled cloudflared and sing-box binaries must be compatible with your OS and architecture. Cloudflare Tunnel availability depends on Cloudflare's service status.",
    },
  },
  {
    slug: "ai-bill",
    name: "AI Bill",
    tagline: "How much are you really burning on AI every month?",
    summary:
      "AI Bill is a single-page web app that lets you select your AI subscriptions — Claude, ChatGPT, Gemini, Kimi, MiniMax, and more — calculates your monthly total spend, and generates a shareable receipt card in three visual templates. Supports ¥/$ currency toggle and CN/EN bilingual UI.",
    platforms: ["Web"],
    status: "live",
    supportEmail,
    legalOwner,
    privacyUpdatedAt: "2026-06-19",
    termsUpdatedAt: "2026-06-19",
    icon: "/apps/ai-bill/icon.png",
    screenshots: [],
    accentColor: "#f97316",
    features: [
      "13+ AI service provider catalog with real pricing tiers, searchable by international and domestic providers.",
      "¥ / $ one-click currency toggle with live exchange rate conversion.",
      "CN / EN bilingual interface and shareable card output.",
      "Real-time bill calculation with animated counter, spending persona tier, and coffee-equivalent Easter egg.",
      "Three shareable card templates — thermal receipt, terminal console, and poster Wrapped style.",
      "QR code on each card linking back to the tool; copy to clipboard or download as PNG.",
      "Custom subscription entry for unlisted services like Midjourney, Suno, or API credits.",
    ],
    policyProfile: {
      dataUse: [
        "AI subscription selections and custom entries you enter (stored only in your browser's local storage)",
        "preferred currency and language settings (stored on-device only)",
      ],
      storage:
        "AI Bill is a fully client-side single-page application. All data — your subscription selections, custom entries, currency preference, and language setting — is stored in your browser's local storage. There is no backend, no account system, and no server that receives your data.",
      sharing:
        "AI Bill does not collect, transmit, or sell any user data. The app has no analytics SDK, no telemetry, no crash reporting, and no tracking. All processing happens entirely in your browser. Shareable receipt cards are generated client-side using html-to-image.",
      permissions: [
        "Network access is used only to load the web application and fetch exchange rate data.",
        "No microphone, camera, contacts, location, or photo library permissions are required.",
      ],
      paidFeatures:
        "AI Bill is completely free to use. There are no in-app purchases, subscriptions, or paid features.",
      termsUse:
        "Use AI Bill for personal budgeting and awareness of your AI subscription spending. Pricing data is sourced from public information and may not reflect the latest changes from each provider — verify current prices on provider websites before making financial decisions. AI Bill is not intended for users under 13.",
      availability:
        "AI Bill requires a modern web browser with JavaScript enabled. Exchange rates are fetched from a public API and may vary. Shareable card generation requires browser support for the Canvas API.",
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
