// Complete, preserved portfolio data for Sarvasva
// All original facts, projects, experience, education, skills, certifications,
// designs, speaking events, and contact information are strictly preserved.

export const PERSONAL_INFO = {
  name: "Sarvasva",
  handle: "scrxtch12418",
  operatorId: "SRX_12",
  title: "Cybersecurity Enthusiast & Full-Stack Software Engineer",
  tagline: "Pentester · Full Stack · Graphics Designer · Quiz Host · Public Speaker",
  quote: "I'M DEVELOPER, RICK! (rick and morty fan, yes)",
  subQuote: "Nothing belongs anywhere, one day everything ends, so come watch TV",
  mission: "Learn more, Build more, Help more :)",
  hobbies: ["Gaming", "Music", "Coding", "Debates", "Photography"],
  bio: `I am a cybersecurity enthusiast and full-stack software engineer pursuing my BE in Computer Science at NMAMIT. I specialize in penetration testing, building security tools, and automating tasks. Beyond code, I am a photographer, make attractive and flashy posters for club events, and design user interfaces for web applications. When I am not doing those, I host quizzes and flashmobs, join debates, and connect with my peers. Along with that I also enjoy playing video games, listening to music, and podcasts.`,
  profilePhoto: "/images/user_profile.png",
  pokeQuotes: [
    "STOP! STOP! DON'T TOUCH ME!",
    "OUCH! THAT HURTS!",
    "HEY! SECURE SHIELD BREACHED!",
    "PORTAL ERROR: DO NOT PROBE!",
    "SYSTEM OVERLOAD! STOP IT!",
    "WUBBA LUBBA DUB DUB!",
    "USER_INTERRUPT: POKE DETECTED!",
    "STOP! IT TICKLES!",
    "ACCESS DENIED! SYSTEM UNSTABLE!",
    "OUCH! MIND THE RESOLUTION!"
  ],
  contact: {
    email: "sarvasva5758@gmail.com",
    linkedin: "https://linkedin.com/in/sarvasva-s-4470562b4",
    github: "https://github.com/scrxtch12418",
    phone: "+91 861 897 1296",
    location: "Karnataka, India"
  }
};

export const EXPERIENCE = [
  {
    id: "torsecure",
    role: "DevSecOps Intern",
    company: "Torsecure Cyber LLP",
    period: "Jun 2026 – Aug 2026",
    focus: "Penetration Testing + Framework Development + Web Design",
    description: "Conducted security audits, vulnerability assessments, automated penetration test pipelines, and designed web security interfaces.",
    highlights: [
      "Penetration testing across internal client networks",
      "Automated custom vulnerability discovery workflows",
      "Built clean security documentation and interactive web reporting dashboards"
    ]
  },
  {
    id: "aic_nitte",
    role: "Software Dev Intern",
    company: "AIC NITTE Incubation Center",
    period: "Jun 2024 – Aug 2024",
    focus: "Hardware + Arduino + Prompt Engineering",
    description: "Developed asynchronous hardware microcontroller interfaces with Arduino and built LLM prompt engineering frameworks for incubated startups.",
    highlights: [
      "Integrated embedded Arduino systems with serial logging APIs",
      "Designed structured LLM prompt workflows and testing suites",
      "Collaborated with hardware and software engineering teams"
    ]
  }
];

export const EDUCATION = [
  {
    institution: "NMAM Institute of Technology (Nitte)",
    degree: "Bachelor of Engineering (BE) in Computer Science & Engineering",
    status: "Currently Pursuing",
    location: "Nitte, Karkala, Karnataka",
    details: "Focus on Computer Networks, Cybersecurity, Operating Systems, Algorithms, and Software Architecture."
  }
];

export const CERTIFICATIONS = [
  {
    id: "google-cyber",
    name: "Google: Cybersecurity Foundations",
    issuer: "Google",
    desc: "Google Cybersecurity Professional Certification. Network defense, incident response, SIEM tools, and Unix system logging.",
    icon: "shield"
  },
  {
    id: "tryhackme-101",
    name: "TryHackMe: Cybersecurity 101",
    issuer: "TryHackMe",
    desc: "Auditing web injection layers, active network reconnaissance, cryptanalysis, and Linux privilege escalation.",
    icon: "target"
  },
  {
    id: "zsecurity-eh",
    name: "ZSecurity: Ethical Hacking From Scratch",
    issuer: "ZSecurity",
    desc: "Ethical hacking course covering sockets, reverse proxies, trojans, network attacks, and MITM interception.",
    icon: "terminal"
  },
  {
    id: "ue5-blueprints",
    name: "Unreal Engine Blueprint Developer",
    issuer: "Epic Games / Udemy",
    desc: "Compiling virtual physics nodes, real-time 3D environments, state machines, and interactive game loops.",
    icon: "gamepad"
  }
];

export const SKILLS = {
  cyber: {
    category: "Cyber / Offense",
    skills: [
      { name: "Penetration Testing", level: "Ready", desc: "Network & application security vulnerability testing" },
      { name: "Red Teaming", level: "Ready", desc: "Adversary simulation and attack vector analysis" },
      { name: "Network Engineering", level: "Ready", desc: "Packet capture, protocol dissection, subnetting" },
      { name: "LLM Security", level: "Ready", desc: "Prompt injection mitigation, jailbreak defense, guardrails" },
      { name: "Vulnerability Analysis", level: "Ready", desc: "OWASP Top 10, CVE auditing, zero-day threat modeling" }
    ],
    tools: ["Metasploit", "Kali Linux", "Wireshark", "OSINT", "Burp Suite", "Nmap"]
  },
  languages: {
    category: "Languages",
    skills: [
      { name: "Python", level: "Advanced", desc: "Automation, security scripting, FastAPI, PyTorch/AI" },
      { name: "JavaScript / ES6+", level: "Advanced", desc: "Modern frontend logic, DOM, Node.js, asynchronous APIs" },
      { name: "Java", level: "Proficient", desc: "Object-oriented architecture, backend tools" },
      { name: "C", level: "Proficient", desc: "Low-level memory management, sockets, systems programming" },
      { name: "C#", level: "Proficient", desc: "Unity/Godot scripting, game logic, .NET basics" }
    ],
    tools: ["Bash", "PowerShell", "GDScript", "SQL", "Git"]
  },
  web: {
    category: "Web & Backend",
    skills: [
      { name: "React.js", level: "Ready", desc: "Component architecture, hooks, state management, modern UI" },
      { name: "FastAPI", level: "Ready", desc: "High-performance Python async REST APIs, Swagger docs" },
      { name: "REST API", level: "Ready", desc: "Clean endpoints, JSON payloads, authentication & security" },
      { name: "Node.js", level: "Ready", desc: "Server runtimes, CLI tools, script execution" }
    ],
    tools: ["Vite", "Express", "HTML5 Canvas", "CSS3 / Grid", "Ollama"]
  },
  design: {
    category: "Design & Creative",
    skills: [
      { name: "UI / UX Design", level: "Ready", desc: "Prototyping, web ergonomics, retro aesthetic systems" },
      { name: "Poster Designing", level: "Ready", desc: "High-impact visual identity packs for flagship fests" },
      { name: "Canva & Lightroom", level: "Ready", desc: "Color grading, photo enhancement, creative assets" },
      { name: "Typography & Content", level: "Ready", desc: "Display hierarchy, branding copy, event scripts" }
    ],
    tools: ["Canva", "Adobe Lightroom", "Figma", "Photoshop", "Grey Matter QDC"]
  }
};

export const PROJECTS = [
  {
    id: "llm-security",
    title: "LLM SECURITY FRAMEWORK",
    shortTitle: "LLM Security",
    rarity: "EPIC",
    rarityColor: "#bf00ff",
    githubUrl: "https://github.com/scrxtch12418/Projects/tree/main/Prompt%20Injection%20Checker",
    tags: ["Python", "Regex", "LLM Security", "CLI"],
    summary: "Red-teaming framework with input/output validation pipelines to detect prompt injection across 11 vulnerability categories.",
    description: `A comprehensive red-teaming security framework designed with robust input and output validation pipelines. The system actively detects prompt injection attacks across 11 distinct vulnerability categories—including API keys, SSNs, and JWT tokens. Features confidence scoring, severity classification, and a full command-line tool with an automated unit test suite.`,
    features: [
      "11 categories of injection detection (indirect injection, roleplay bypass, system prompt extraction, etc.)",
      "Sensitive data exfiltration filtering (API keys, SSNs, private cryptographic keys, JWT tokens)",
      "Dynamic confidence scoring and severity classification algorithm",
      "Full CLI interface with automated test runners and reproducible test vectors"
    ],
    role: "Lead Developer & Security Researcher",
    challenges: "Handling adversarial evasion techniques such as base64 encodings and leetspeak obfuscation while preserving low latency for API pipelines."
  },
  {
    id: "rat-research",
    title: "RAT — ETHICAL RESEARCH",
    shortTitle: "RAT Research",
    rarity: "RARE",
    rarityColor: "#00ffea",
    githubUrl: "https://github.com/scrxtch12418/rat-research",
    tags: ["Python", "Sockets", "Threat Modeling", "Networking"],
    summary: "Python Remote Access Trojan built strictly in a controlled lab for reverse shell telemetry and threat analysis.",
    description: `An ethical offensive security research project developing a Remote Access Trojan (RAT) in an isolated, controlled virtual lab environment. The software tests socket client connections, executes reverse shells, performs remote command execution, and demonstrates file exfiltration to understand endpoint defense mechanisms and craft counter-signatures.`,
    features: [
      "Multi-threaded reverse socket connection with heartbeat keep-alive",
      "Remote command execution dispatcher with standard stream capture",
      "Stealth file transfer protocol with encrypted chunking",
      "Documented threat-model analysis and detection blueprint for SOC analysts"
    ],
    role: "Offensive Security Researcher",
    challenges: "Building reliable socket reconnection logic and studying behavioral antivirus heuristics to improve blue team detection rules."
  },
  {
    id: "focus-extension",
    title: "ADHD FOCUS EXTENSION",
    shortTitle: "ADHD Focus",
    rarity: "UNCOMMON",
    rarityColor: "#d4ff00",
    githubUrl: "https://github.com/scrxtch12418/Projects/tree/main/Focus%20Extension",
    tags: ["HTML/CSS", "JavaScript", "Chrome API", "UX Design"],
    summary: "Published Chrome extension with persistent focus timers, tab limiting, and domain blockades designed for neurodivergent focus.",
    description: `A productivity extension built using modern Chrome Extensions API standards. Designed specifically to alleviate attention drift by implementing configurable focus timers, aggressive tab limits, customizable domain blockades, and non-intrusive micro-reminders with persistent local storage.`,
    features: [
      "Custom Pomodoro & deep-work focus timer cycles",
      "Real-time domain blocking with custom motivational interception screens",
      "Active tab cap prevention to prevent cognitive overload",
      "Local storage synchronization across browser sessions"
    ],
    role: "Frontend Engineer & UX Designer",
    challenges: "Crafting background service-worker listeners that maintain timer accuracy without draining laptop battery life."
  },
  {
    id: "stuck-in-space",
    title: "STUCK IN SPACE: ALIEN FARMER",
    shortTitle: "Stuck in Space",
    rarity: "RARE",
    rarityColor: "#00ffea",
    githubUrl: "https://github.com/scrxtch12418/stuck-in-space",
    tags: ["GODOT", "GDScript", "Pixel Art", "Game Loop"],
    summary: "Retro space-farming survival game created in Godot Engine for GMTK Game Jam with automated helper structures.",
    description: `A retro pixel-art survival and farming simulator developed in Godot Engine for the global GMTK Game Jam. The player must manage alien crop seeds, satisfy ruthless corporate credit quotas, blast incoming space meteors, and deploy auto-sprinklers, harvesting drones, and sentry towers to survive deep-space isolation.`,
    features: [
      "Dynamic 2D tile-based farming and automated irrigation systems",
      "Corporate quota countdown timer creating tense resource-management loops",
      "Deployable sentries and harvesting drone automated helpers",
      "Original pixel art sprites, retro sound effects, and custom GDScript physics"
    ],
    role: "Game Designer, Programmer & Pixel Artist",
    challenges: "Balancing the tight 48-hour Game Jam deadline with complete game feel, satisfying audio feedback, and balanced economic progression."
  },
  {
    id: "sales-agent",
    title: "AI SALES AGENT",
    shortTitle: "AI Sales Agent",
    rarity: "EPIC",
    rarityColor: "#bf00ff",
    githubUrl: "https://github.com/scrxtch12418/sales-agent",
    tags: ["FastAPI", "Python", "Ollama", "Agentic AI"],
    summary: "Local autonomous AI sales agent built with FastAPI, integrating Qwen3-sales model via Ollama with automated tool calling.",
    description: `An autonomous AI sales agent running entirely on local infrastructure. Built using Python and FastAPI, the agent integrates local LLM models (Qwen3-sales) via Ollama with automated function-calling registries. It executes system-level workflows, triggers personalized email clients, and queries local databases without sending confidential data to third-party cloud APIs.`,
    features: [
      "Autonomous tool-calling registry executing multi-step action plans",
      "FastAPI server hosting synchronous and streaming response endpoints",
      "Zero-cloud privacy architecture powered by local Ollama model hosting",
      "Context-aware customer objection handling and lead qualification scoring"
    ],
    role: "AI Systems Engineer & Backend Developer",
    challenges: "Ensuring deterministic function calling from smaller open-weights models through strict JSON schema validation and retry guards."
  }
];

export const DESIGNS = [
  {
    id: "motley-crew",
    title: "THE MOTLEY CREW QUIZ",
    subtitle: "Poster Design · Grey Matter QDC",
    src: "/images/motley_crew_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Visual poster created for the flagship multi-genre Motley Crew Quiz night."
  },
  {
    id: "nutella-quiz",
    title: "THE NUTELLA QUIZ",
    subtitle: "Poster Design · Sweet Tooth Special",
    src: "/images/nutella_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Rich, decadent typography and visual composition for a culinary trivia event."
  },
  {
    id: "dia-de-muertos",
    title: "DÍA DE MUERTOS QUIZ",
    subtitle: "Poster Design · Cultural Festival",
    src: "/images/dia_de_muertos_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Vibrant Mexican cultural fest themed graphic exploring folklore, sugar skulls, and trivia."
  },
  {
    id: "starter-quiz",
    title: "THE STARTER QUIZ",
    subtitle: "Poster Design · Freshman Welcome",
    src: "/images/starter_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Introductory event graphic inviting newcomers to the college debating and quizzing club."
  },
  {
    id: "kbk-quiz",
    title: "KAUN BANEGA KHILADI?",
    subtitle: "Poster Design · Sports Trivia Night",
    src: "/images/kbk_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Sports arena inspired high-contrast poster celebrating athletic trivia and gaming culture."
  },
  {
    id: "rewind-quiz",
    title: "REWIND QUIZ",
    subtitle: "Poster Design · Retro Nostalgia",
    src: "/images/rewind_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Vintage cassette and retro aesthetic poster evoking 80s/90s nostalgia for pop-culture trivia."
  },
  {
    id: "studio-99",
    title: "STUDIO 99",
    subtitle: "Commercial Graphic Design",
    src: "/images/studio99.png",
    category: "Commercial Design",
    year: "2025",
    desc: "Modern sleek branding and promotional poster created for Studio 99."
  },
  {
    id: "videogames-quiz",
    title: "VIDEO GAMES QUIZ",
    subtitle: "Poster Design · Gaming Special",
    src: "/images/videogames_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Arcade and console gaming themed poster featuring retro controller graphics and pixel cues."
  },
  {
    id: "the-office-quiz",
    title: "THE OFFICE QUIZ",
    subtitle: "Poster Design · Sitcom Trivia",
    src: "/images/theoffice_quiz.png",
    category: "Poster Design",
    year: "2024",
    desc: "Dunder Mifflin themed poster with corporate-parody styling and iconic show references."
  },
  {
    id: "grey-matter-liquid",
    title: "GREY MATTER RECRUITMENT — LIQUID",
    subtitle: "Recruitment Campaign · Version A",
    src: "/images/join_us_liquid.png",
    category: "Club Campaign",
    year: "2025",
    desc: "Acid and liquid visual styling for club recruitment drives."
  },
  {
    id: "grey-matter-waves",
    title: "GREY MATTER RECRUITMENT — WAVES",
    subtitle: "Recruitment Campaign · Version B",
    src: "/images/join_us_waves.png",
    category: "Club Campaign",
    year: "2025",
    desc: "Abstract wave deformation and brutalist typography for club recruitment."
  }
];

export const SPEAKING_EVENTS = [
  {
    id: "grey-matter-qdc",
    title: "GREY MATTER QDC & HOSTING",
    type: "Quiz Master & Anchor",
    desc: "Hosted intra-college events and quizzes, along with participating in quite a few of them. Wrote questions, managed rounds, kept audience energy high, and coordinated live stage flows.",
    tags: ["Quiz Master", "Audience Mgmt", "Stage Presence"],
    photos: [
      { src: "/images/speaking_aikya.jpeg", caption: "Sarvasva hosting the cultural fest Aikya on the main stage" },
      { src: "/images/speaking_stage_laptop.jpeg", caption: "Configuring systems and stage cues from the host panel" }
    ]
  },
  {
    id: "debates-mun",
    title: "DEBATES & MODEL UNITED NATIONS",
    type: "Public Speaker & Delegate",
    desc: "Argued complex delegate briefs and policy resolutions at Model United Nations. Participated in Lok Sabhas, presenting various bills and drafting legislative amendments.",
    tags: ["Delegate", "MUN Debate", "Presentation", "Lok Sabha"],
    photos: [
      { src: "/images/speaking_lecture.jpeg", caption: "Delivering a technical presentation with a slide deck" },
      { src: "/images/speaking_mun_1.jpeg", caption: "Presenting critical delegate resolutions at KMC MUN" },
      { src: "/images/speaking_mun_2.jpeg", caption: "Addressing the delegate assembly floor during MUN rounds" }
    ]
  },
  {
    id: "flashmob-coordination",
    title: "FLASHMOB PERFORMANCE & CO-ORDINATION",
    type: "Anchor & Choreographer",
    desc: "Led and coordinated large-scale flashmob performances to promote flagship college festivals like Aikya and Incridea. Managed rehearsals, crowd engagement, and outdoor venue synchronization.",
    tags: ["Choreographer", "Team Coordination", "Fest Hype"],
    photos: [
      { src: "/images/speaking_sac_1.jpeg", caption: "Engaging a dynamic student crowd during an outdoor open-mic event" },
      { src: "/images/speaking_sac_2.jpeg", caption: "Addressing NMAMIT students during an outdoor SAC presentation" }
    ]
  }
];
