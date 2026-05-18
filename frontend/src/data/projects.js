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
    image: "/manga/project2.jpg",
    tags: ["TensorFlow", "FastAPI", "Python", "Android", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
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
    slug: "jarvishub",
    title: "JarvisHub",
    subtitle: "IoT Developer Automation Center",
    description: "Architected a centralized dashboard for developer environment home-lab monitoring. Integrates WebSockets, real-time telemetry, and containerized process tracking into a unified control interface.",
    image: "/manga/project1.jpg",
    tags: ["Node.js", "WebSockets", "Docker", "React", "Linux"],
    liveUrl: "#",
    githubUrl: "#",
    details: {
      overview: "Managing multiple localized developer instances, database servers, and smart automation pipelines can easily lead to console fatigue. JarvisHub consolidates telemetry metrics, service statuses, and webhook task execution into a premium, unified Command Center.",
      techStack: "Engineered with a Node.js + Express backend using Socket.io to pipe high-frequency CPU/Memory metrics. The client is a React interface displaying dynamic telemetry, and the agent mounts direct Docker API Unix sockets for container inspections.",
      architecture: "A background system daemon collects OS resource metrics and container health states. Every 500ms, the system relays delta updates over persistent WebSocket channels to the central React frontend, allowing developers to trigger actions instantly.",
      implementation: "Built custom script runners that capture server-side log tails and send them over WebSockets, as well as a container restart utility that calls the Docker API directly from Express backend routes.",
      challenges: "Managing stream backpressure and thread blocking when pushing concurrent resource-heavy terminal tail logs to the client. Resolved by debouncing chart refreshes and utilizing Node worker threads to isolate log parsing off the main event loop.",
      outcomes: "Consolidated 8 separate server command-lines into a single visual hub. Reduced dev environment troubleshooting time by 50% and locked down resource leaks instantly.",
      gallery: ["/manga/about-city.jpg", "/manga/about-code.jpg", "/manga/contact-city.jpg"]
    }
  },
  {
    id: 3,
    slug: "clipboard-sync",
    title: "Clipboard Sync System",
    subtitle: "Secure Multi-Device Sync Engine",
    description: "Designed and built an end-to-end encrypted multi-device clipboard synchronizer. Leverages WebSockets, secure key exchanges, and localized background agents to deliver instantaneous clipboard syncing.",
    image: "/manga/project3.jpg",
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
  }
]
