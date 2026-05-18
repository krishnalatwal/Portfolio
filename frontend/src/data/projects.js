/**
 * PROJECTS CONFIGURATION
 * ──────────────────────
 * Add new projects by appending an object to this array.
 * The UI (Projects.jsx, ProjectDetail.jsx) auto-renders from this data.
 *
 * Required fields:  id, slug, title, subtitle, description, image, tags
 * Optional fields:  liveUrl, githubUrl, details.*
 *
 * details.gallery  → array of image paths shown in the cinematic staggered grid
 * liveUrl / githubUrl → use "#" to hide the link button gracefully
 */
export const projectsData = [
  {
    id: 1,
    slug: "krishinetra",
    title: "KrishiNetra",
    subtitle: "AI-Powered Crop Diagnostics",
    description: "Built a real-time AI inference backend serving an Android application. Bridged MobileNetV2 with a scalable FastAPI architecture to deliver immediate crop disease diagnostics to users.",
    image: "/manga/project1.jpg",
    tags: ["TensorFlow", "FastAPI", "Python", "Android", "AWS"],
    liveUrl: "#",
    githubUrl: "https://github.com/krishnalatwal/KrishiNetra",
    details: {
      overview: "Farmers often struggle to identify crop diseases early enough to prevent significant yield loss. KrishiNetra was conceived to bring advanced diagnostic tools directly to the field via a mobile device. It uses deep learning to identify diseases from a simple smartphone photo.",
      techStack: "Leverages a custom MobileNetV2 TensorFlow classification model quantized into TFLite format for rapid server-side inference. The backend is engineered on FastAPI (Python) using asynchronous worker pools, and the client is a native Android application built with clean architecture pattern.",
      architecture: "Mobile clients upload high-resolution crop photos securely over SSL. The FastAPI backend receives the request, queues the image, and utilizes concurrent thread execution buffers to execute model classification in under 150ms. Inference metadata is routed to CloudWatch for continuous telemetry.",
      implementation: "The engine implements localized request buffering, model weight quantization to reduce memory footprint by 75%, and SQLite database fallbacks on the mobile device to cache historical scans.",
      challenges: "Optimizing classification accuracy in variable outdoor lighting conditions and matching high-speed responses under low-bandwidth rural networks. Resolved by integrating localized offline pre-processing filters on the client and custom JPEG downsampling pipelines before network payload transmissions.",
      outcomes: "Achieved a 94.2% diagnostic accuracy score across 14 leaf pathogen classifications, serving real-time assessments to users under 150ms network roundtrips.",
      gallery: ["/manga/about-focus.jpg", "/manga/about-code.jpg", "/manga/skills-tools.jpg"]
    }
  },
  {
    id: 2,
    slug: "clipboard-sync",
    title: "Clipboard Sync System",
    subtitle: "Secure Multi-Device Sync Engine",
    description: "Designed and built an end-to-end encrypted multi-device clipboard synchronizer. Leverages WebSockets, secure key exchanges, and localized background agents to deliver instantaneous clipboard syncing.",
    image: "/manga/project2.jpg",
    tags: ["Go", "WebSockets", "Redis", "AES-256", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    details: {
      overview: "Developers frequently switch between workstations, laptops, and remote servers. Clipboard Sync System is a lightweight, cross-platform productivity daemon that synchronizes copied code blocks, URLs, and text snippets securely in real-time.",
      techStack: "Crafted with a Go backend leveraging raw WebSockets for maximum speed and minimal memory footprint. Uses Redis Pub/Sub to scale socket message routing across nodes. Encrypted payloads use client-side AES-256 GCM.",
      architecture: "Local background agents running on client OS systems capture clipboard state events. Before transmission, snippets are encrypted on-device. The encrypted stream hits the Go gateway, which leverages Redis to broadcast updates to other authorized client daemons.",
      implementation: "Implements secure pairing using Diffie-Hellman key exchanges on device handshake registration and writes memory-safe clipboard event loop handlers directly in Go.",
      challenges: "Avoiding infinite clipboard sync feedback loops between paired devices and securing shared snippet contents from server exposure. Solved by appending origin device signatures to snippets and performing 100% of encryption client-side.",
      outcomes: "Synchronized text snippets across paired client devices in under 80ms globally, maintaining zero server-side exposure of plaintext data.",
      gallery: ["/manga/skills-tools.jpg", "/manga/about-focus.jpg", "/manga/about-code.jpg"]
    }
  },
  {
  id: 3,
  slug: "class-reminder",
  title: "Class Reminder",
  subtitle: "Smart Attendance & Schedule Assistant",
  description: "Built an Android-based class reminder application to help students manage schedules, attendance timings, and daily academic routines efficiently.",
  image: "/manga/project3.jpg",
  tags: ["Android", "Java", "Firebase", "Notifications"],
  liveUrl: "#",
  githubUrl: "https://github.com/krishnalatwal/class-reminder.git",
  details: {
    overview: "Students often miss classes or lose track of schedules during busy academic routines. Class Reminder was created to provide timely reminders and simplify daily timetable management.",
    techStack: "Built using Android Studio with Java, integrated local notifications and lightweight persistent storage for schedule management.",
    architecture: "The application stores user schedules locally and triggers background reminders based on configured class timings.",
    implementation: "Implemented reminder scheduling, notification handling, and timetable management screens with a clean mobile-first UI.",
    challenges: "Managing accurate notification triggering across different Android battery optimization settings.",
    outcomes: "Helped streamline daily class tracking and improved schedule consistency for students.",
    gallery: [
      "/manga/about-code.jpg",
      "/manga/about-focus.jpg"
    ]
  }
},

{
  id: 4,
  slug: "trackbits",
  title: "TrackBits",
  subtitle: "Personal Expense & Activity Tracker",
  description: "Developed a lightweight tracking application focused on organizing daily activities, expenses, and productivity records in a clean interface.",
  image: "/manga/project4.jpg",
  tags: ["Android", "Java", "SQLite", "UI/UX"],
  liveUrl: "#",
  githubUrl: "https://github.com/krishnalatwal/TrackBits.git",
  details: {
    overview: "TrackBits was designed to simplify personal tracking by allowing users to log and monitor important daily records from a single application.",
    techStack: "Built using Android and SQLite with a focus on responsive UI and smooth local data handling.",
    architecture: "Uses local database storage to maintain fast offline-first tracking performance without dependency on external services.",
    implementation: "Implemented categorized tracking modules, persistent storage, and optimized list rendering for smoother performance.",
    challenges: "Designing a flexible structure capable of handling multiple categories of tracked data efficiently.",
    outcomes: "Created a lightweight and fast productivity-focused tracking solution for everyday use.",
    gallery: [
      "/manga/skills-tools.jpg",
      "/manga/about-code.jpg"
    ]
  }
},

{
  id: 5,
  slug: "splitexpense",
  title: "SplitExpense",
  subtitle: "Collaborative Expense Splitting App",
  description: "Built a group expense management application that simplifies bill splitting, contribution tracking, and shared expense calculations among friends and teams.",
  image: "/manga/project5.jpg",
  tags: ["Android", "Java", "Firebase", "Realtime Database"],
  liveUrl: "#",
  githubUrl: "https://github.com/krishnalatwal/SplitExpense.git",
  details: {
    overview: "Managing shared expenses in trips, hostels, and friend groups often becomes confusing. SplitExpense helps users track shared payments and calculate balances easily.",
    techStack: "Developed with Android Studio using Firebase Realtime Database for synchronized group expense management.",
    architecture: "The system maintains group-wise expense records and dynamically calculates balances between members.",
    implementation: "Built shared expense modules, contribution logging, and automated balance calculation features.",
    challenges: "Handling accurate balance calculations across multiple users and avoiding duplicated transaction entries.",
    outcomes: "Simplified group expense management and reduced manual calculation effort during shared activities.",
    gallery: [
      "/manga/contact-city.jpg",
      "/manga/about-focus.jpg"
    ]
  }
}
]
