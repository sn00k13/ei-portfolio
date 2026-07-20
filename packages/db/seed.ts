/**
 * One-time seed for content that used to live only as hardcoded JS objects
 * in eric-uzoukwu-FINAL.html (ASSESSMENTS, CASE_STUDIES, web/app product
 * cards, venture cards, "Tools Built" cards). Ported verbatim so every
 * section becomes admin-editable instead of baked into the static HTML.
 * Safe to re-run: each block only inserts if the table is still empty.
 */
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function seedProducts() {
  if ((await prisma.product.count()) > 0) return;
  const products = [
    { name: "Terbana", sector: "Social Commerce", status: "progress", description: "Trust-native social commerce — video discovery, escrow payments and real-world pickup verification for Africa.", techStack: ["Escrow", "Video", "Pickup Verify"], logoUrl: "/images/terbana-1.jpg", websiteUrl: "https://terbana.com.ng/", displayOrder: 1 },
    { name: "Fuel Alert", sector: "EnergyTech", status: "progress", description: "Real-time crowd-sourced fuel prices, GPS station discovery and fuel reservation for Nigerian motorists.", techStack: ["Geolocation", "Real-Time", "Ticketing"], logoUrl: null, websiteUrl: null, displayOrder: 2 },
    { name: "KANTEER", sector: "Business Management", status: "complete", description: "Modern POS, inventory and multi-branch management for retailers and supermarkets.", techStack: ["POS", "Inventory", "Multi-Branch"], logoUrl: "/images/kanteer-2.png", websiteUrl: "https://www.kanteer.com/", displayOrder: 3 },
    { name: "CusMap", sector: "Customer Management", status: "progress", description: "AI-driven CRM with automation, multi-channel communication and predictive customer intelligence.", techStack: ["CRM", "AI Analytics", "Multi-Channel"], logoUrl: null, websiteUrl: null, displayOrder: 4 },
    { name: "DIGIFY", sector: "Document Management", status: "progress", description: "Secure digital asset management with RBAC approval workflows, OCR search and version control.", techStack: ["OCR", "RBAC", "Version Control"], logoUrl: null, websiteUrl: null, displayOrder: 5 },
    { name: "StreetHub Ecosystem", sector: "Institutional", status: "progress", description: "All-in-one platform for academic and professional records with QR certificate verification.", techStack: ["QR Auth", "Cert Verify", "Digital ID"], logoUrl: "/images/streethub-3.jpg", websiteUrl: "https://streethubtechnologies.com/", displayOrder: 6 },
    { name: "Schooleer", sector: "EduTech", status: "complete", description: "School management giving each school its own branded ecosystem for academics, finance and communication.", techStack: ["School Mgmt", "Finance", "Branded"], logoUrl: "/images/schooleer-4.jpg", websiteUrl: "https://schooleer.com/", displayOrder: 7 },
    { name: "GoBuyMe", sector: "On-Demand Delivery", status: "complete", description: "Multi-service delivery covering food, groceries, pharmacy and errands with live tracking and rider management.", techStack: ["Live Tracking", "Rider Mgmt", "Multi-Vendor"], logoUrl: "/images/gobuyme-5.png", websiteUrl: "https://gobuyme.shop/home", displayOrder: 8 },
    { name: "All Skills", sector: "Service Marketplace", status: "progress", description: "GPS-powered booking connecting users with mechanics, plumbers, electricians and drivers.", techStack: ["GPS", "OTP Verify", "Referrals"], logoUrl: "/images/all-skills-6.jpg", websiteUrl: null, displayOrder: 9 },
    { name: "My Oga Landlord", sector: "PropTech", status: "progress", description: "Smart property management and rental marketplace with digital agreements and escrow payments.", techStack: ["Escrow", "Agreements", "Verify"], logoUrl: "/images/my-oga-landlord-7.jpg", websiteUrl: null, displayOrder: 10 },
    { name: "MedicSync", sector: "HealthTech", status: "progress", description: "Patient-driven interoperable medical records — store, manage and share across hospitals, labs and pharmacies.", techStack: ["Interoperability", "Medical ID", "HealthTech"], logoUrl: "/images/medicsync-8.jpg", websiteUrl: null, displayOrder: 11 },
    { name: "My Root Chain", sector: "Heritage / AI", status: "progress", description: "AI-powered family lineage platform with dynamic trees, oral history and DNA verification.", techStack: ["AI Genealogy", "Heritage", "Privacy"], logoUrl: null, websiteUrl: null, displayOrder: 12 },
    { name: "KeLife Agro Enterprises", sector: "Agribusiness · AgriTech", status: "progress", description: "Comprehensive agribusiness platform combining e-commerce, farm management, consultancy, training, and digital client services for farmers, investors, and agribusinesses.", techStack: ["E-Commerce", "Farm Management", "Consultancy", "AgriTech"], logoUrl: "/images/kelife-agro-9.jpg", websiteUrl: "https://kelifeagroenterprise.com", displayOrder: 13 },
    { name: "Parcel Tracker", sector: "Logistics", status: "complete", description: "Logistics management with parcel tracking, shipment visibility and delivery workflow management.", techStack: ["Parcel Tracking", "Delivery", "Workflows"], logoUrl: null, websiteUrl: null, displayOrder: 14 },
    { name: "Symbodied", sector: "AgriTech / Social", status: "complete", description: "Social marketplace for farmers with community engagement, blog and integrated shop.", techStack: ["AgriTech", "Social", "Community"], logoUrl: "/images/symbodied-10.jpg", websiteUrl: "https://symbodied.com/", displayOrder: 15 },
    { name: "The Odu Project", sector: "AgriTech / Learning", status: "complete", description: "Farmer-focused training platform with structured learning, blog content and skill development.", techStack: ["E-Learning", "Community", "AgriTech"], logoUrl: "/images/the-odu-project-11.jpg", websiteUrl: "https://theoduproject.com/", displayOrder: 16 },
    { name: "4FG Monitor", sector: "IoT / Hardware", status: "progress", description: "GSM-enabled, weight-based IoT device eliminating LPG gas shortage uncertainty for Nigerian households and businesses.", techStack: ["IoT", "GSM", "LPG Monitoring"], logoUrl: "/images/4fg-monitor-12.jpg", websiteUrl: null, displayOrder: 17 },
  ];
  await prisma.product.createMany({ data: products });
  console.log(`seeded ${products.length} products`);
}

async function seedVentures() {
  if ((await prisma.venture.count()) > 0) return;
  const ventures = [
    { name: "4First Technologies", type: "IoT / Hardware", role: "Co-Founder · COO & CTO", status: "Active · Fundraising", description: "Building the 4FG-Monitor — a GSM-enabled, weight-based IoT device that eliminates LPG gas shortage uncertainty for Nigerian households and businesses.", logoUrl: "/images/4first-14.jpg", accentColor: "teal", websiteUrl: "https://4fg-app.base44.app", displayOrder: 1 },
    { name: "Terbana Ltd", type: "Social Commerce", role: "Co-Founder · COO", status: "Active · In Development", description: "Next-generation social commerce platform — video-driven discovery, secure escrow payments, and real-world pickup verification. Trust is not assumed; it is verified.", logoUrl: "/images/terbana-15.jpg", accentColor: "red", websiteUrl: "https://terbana.com.ng/", displayOrder: 2 },
    { name: "E World Fortress LTD", type: "Cybersecurity", role: "Founder", status: "Active · Building", description: "Cybersecurity company delivering VAPT, audits, digital risk management, and advisory. Building infrastructure for a secure digital world.", logoUrl: "/images/e-world-fortress-ltd-16.jpg", accentColor: "blue", websiteUrl: "https://eworldfortress.com", displayOrder: 3 },
    { name: "eWorld Technologies", type: "Tech · Media · Innovation", role: "Founder", status: "Active · Tech. Media. Innovation.", description: "Sale of gadgets and electronic accessories; digital marketing, advertising, social media management, and brand promotion; media consultancy and content creation training; digital skills training and capacity building; development of technology-based platforms and digital products; fintech solutions and digital payment services.", logoUrl: "/images/eworld-technologies-17.jpg", accentColor: "gold", websiteUrl: "https://eworldtechnologies.com", displayOrder: 4 },
    { name: "GoBuyMe", type: "On-Demand Delivery", role: "Co-Founder · Product & QA Lead", status: "Active · In Development", description: "Multi-service on-demand delivery platform covering food, groceries, pharmacy, and personal errands. Built with live tracking, multi-payment support, rider management, and vendor rewards for the Nigerian market.", logoUrl: "/images/gobuyme-18.png", accentColor: "#e05c4a", websiteUrl: "https://gobuyme.shop/home", displayOrder: 5 },
    { name: "StreetHub Technologies & Academy", type: "Tech · Education", role: "Manager · Project Manager & QA Lead · Cybersecurity & Linux Instructor", status: "Active · Ongoing Partnership", description: "Technology partner building digital products across EduTech, PropTech, AgriTech, logistics, and service marketplaces. StreetHub Academy delivers cybersecurity, Linux, and tech education cohorts — with Eric leading curriculum, instruction, and management.", logoUrl: "/images/streethub-technologies-19.jpg", accentColor: "#4a9eff", websiteUrl: "https://streethubtechnologies.com/", displayOrder: 6 },
    { name: "Imo Cybersecurity Community", type: "Community", role: "Founder · Volunteer", status: "Active · Open to Members", description: "Volunteer community promoting cybersecurity awareness across Imo State. Workshops, webinars, mentorship, and collaborative security projects building local talent.", logoUrl: "/images/imo-state-cybersecurity-community-20.jpg", accentColor: "#34d399", websiteUrl: null, displayOrder: 7 },
  ];
  await prisma.venture.createMany({ data: ventures });
  console.log(`seeded ${ventures.length} ventures`);
}

async function seedCyberTools() {
  if ((await prisma.cyberTool.count()) > 0) return;
  const tools = [
    { name: "Advanced Keylogger Tool", category: "Prodigy InfoTech", description: "Python keylogger capturing keystrokes, clipboard, microphone, screenshots, browser history, and live DNS traffic. Encrypted exfiltration via email.", techStack: ["Python", "Cryptography", "DNS Monitoring"], githubUrl: "https://github.com/UzoukwuEricIyke", displayOrder: 1 },
    { name: "Network Packet Analyzer", category: "Prodigy InfoTech", description: "Real-time packet capture with protocol analysis (TCP/UDP/ICMP/HTTP/DNS), IP geolocation, session tracking, anomaly detection, CSV/JSON export.", techStack: ["Python", "Scapy", "GeoIP2", "NetworkX"], githubUrl: "https://github.com/UzoukwuEricIyke", displayOrder: 2 },
    { name: "Advanced Caesar Cipher Suite", category: "Prodigy InfoTech", description: "Hybrid encryption: Caesar Cipher + RSA key exchange, bcrypt authentication, audit logging, file encryption, key rotation, and full Tkinter GUI.", techStack: ["Python", "RSA", "bcrypt", "Tkinter"], githubUrl: "https://github.com/UzoukwuEricIyke", displayOrder: 3 },
    { name: "Image Encryption Tool", category: "Prodigy InfoTech", description: "Encryption/decryption with Fernet, AES, and RSA. Facial recognition for decryption access, Google Drive integration, steganography, dark mode GUI.", techStack: ["Python", "OpenCV", "AES/RSA", "Drive API"], githubUrl: "https://github.com/UzoukwuEricIyke", displayOrder: 4 },
    { name: "Password Strength Checker", category: "Prodigy InfoTech", description: "Real-time strength feedback with entropy calculation, time-to-breach estimation, 2FA suggestions, customisable policies, history tracking.", techStack: ["Python", "Tkinter", "Entropy Analysis"], githubUrl: "https://github.com/UzoukwuEricIyke", displayOrder: 5 },
  ];
  await prisma.cyberTool.createMany({ data: tools });
  console.log(`seeded ${tools.length} cyber tools`);
}

async function seedCaseStudies() {
  if ((await prisma.caseStudy.count()) > 0) return;
  const caseStudies = [
    {
      title: "Interbank Switching Facility — VA & Risk Mitigation",
      tag: "Penetration Testing",
      label: "Penetration Testing · University of Johannesburg · Oct–Nov 2024",
      challenge: "Comprehensive vulnerability assessment on live financial infrastructure with minimal operational disruption.",
      results: ["40% reduction in critical vulnerabilities", "5 high-severity RCEs identified and remediated", "Full remediation roadmap delivered"],
      techStack: ["Nessus", "Burp Suite", "Wireshark"],
      outcomes: [{ val: "40%", label: "Critical Vulns Reduced" }, { val: "5", label: "High-Severity RCEs" }, { val: "3", label: "Systems Assessed" }, { val: "100%", label: "Remediation Coverage" }],
      fullDetails:
        "<h2>Background</h2><p>The client operated an interbank switching facility — infrastructure routing electronic transactions between financial institutions. High-value target handling millions of transactions daily. Engagement required comprehensive vulnerability assessment with minimal operational disruption.</p>" +
        "<h2>Scope &amp; Methodology</h2><p>Assessment covered Apache 2.4.41/Drupal 9.0 web servers, Windows 7/10/11 workstations, internal network, WPA3 WiFi, and Active Directory. Combined automated scanning (Nessus, OpenVAS) with manual penetration testing (Burp Suite, custom scripts).</p>" +
        "<h2>Key Findings</h2><ul><li><strong>Critical — RCE:</strong> Legacy Windows 7 systems exposed to known RCE CVEs with no compensating controls.</li><li><strong>High — Web App Flaws:</strong> SQL injection and stored XSS on Apache/Drupal configuration.</li><li><strong>High — Active Directory:</strong> Excessive privilege assignments and weak password policies enabling lateral movement.</li><li><strong>Medium — Endpoint Gaps:</strong> Anti-malware absent or outdated on legacy systems. No EDR deployed.</li></ul>" +
        "<h2>Outcome</h2><p>Tiered remediation roadmap delivered. Critical vulnerabilities reduced by 40%. Client implemented immediate isolation of legacy systems and initiated OS modernisation. Web vulnerabilities patched within 72 hours of report delivery.</p>" +
        "<h2>Tools</h2><p>Nessus · Burp Suite · Wireshark · Nmap · OpenVAS · PowerShell · Custom VA scripts</p>",
      displayOrder: 1,
    },
    {
      title: "Omniverse Africa Summit 2026 — Dual Product Research Submission",
      tag: "Product Research",
      label: "Product Research & Presentation · Lagos, Nigeria · June 2026",
      challenge: "Develop and validate two distinct Africa-first technology products for simultaneous presentation at a premier continental summit.",
      results: ["Fully funded physical presentation slot secured", "GSM + weight-based detection", "IoT product validated for Nigerian market"],
      techStack: ["IoT", "GSM", "Identity API"],
      outcomes: [{ val: "2", label: "Products Submitted" }, { val: "160", label: "Survey Respondents" }, { val: "75%", label: "Purchase Intent" }, { val: "$300K", label: "Seed Target (4FG)" }],
      fullDetails:
        "<h2>Context</h2><p>The Omniverse Research Exchange is a competitive programme at the Omniverse Africa Summit 3.0 in Lagos — one of Africa's premier tech conferences. Eric secured a fully funded physical presentation slot for two independent product submissions.</p>" +
        "<h2>4FG-Monitor (4First Technologies)</h2><p>GSM-enabled, weight-based IoT device eliminating LPG gas shortage uncertainty. Real-time cylinder weight monitoring with proactive SMS/app refill alerts.</p><ul><li><strong>Validation:</strong> 160 households surveyed — 120 confirmed purchase intent (75%) at ₦30,000/unit</li><li><strong>Economics:</strong> ~50% gross margin. Break-even ~10,000 units</li><li><strong>TAM:</strong> 9.2M LPG households Nigeria · 60M Africa · 1B globally</li><li><strong>Seed raise:</strong> $300K in progress</li></ul>" +
        "<h2>Verix Platform (E World Fortress LTD)</h2><p>Dual-product trust infrastructure for Nigerian fintechs and SMEs.</p><ul><li><strong>Verix Verify:</strong> API-first identity verification using NIN/BVN/SIM data to produce a TrustScore for KYC/onboarding</li><li><strong>Verix Decide:</strong> Real-time transaction trust-scoring for SMEs via messaging and email integration</li></ul>" +
        "<h2>Outcome</h2><p>Both submissions accepted. Fully funded physical presentation slot secured. One of the first times both a hardware IoT product and cybersecurity SaaS platform have been presented by the same founder at a single summit session.</p>",
      displayOrder: 2,
    },
    {
      title: "QRadar SIEM — Insider Threat Investigation at Financial Company",
      tag: "SOC Investigation",
      label: "SOC Investigation · Blue Team Lab · QRadar SIEM",
      challenge: "Investigate a sophisticated multi-vector attack on a financial company with suspected insider involvement using only SIEM logs.",
      results: ["Full attack chain reconstructed end-to-end", "Insider threat actor identified and attributed", "MITRE ATT&CK framework mapped throughout"],
      techStack: ["QRadar", "MITRE ATT&CK", "Log Analysis"],
      outcomes: [{ val: "15", label: "Log Sources" }, { val: "6", label: "Attack Stages" }, { val: "2", label: "Actors Identified" }, { val: "100%", label: "Chain Mapped" }],
      fullDetails:
        "<h2>Scenario</h2><p>A financial company reported suspicious network activity and potential data exfiltration. Using IBM QRadar SIEM with 15 log sources including firewalls, Suricata IDS/IPS, and Windows Event Logs across the hackdefend.local domain, a full investigation was conducted.</p>" +
        "<h2>Attack Chain</h2><ul><li><strong>Initial Access (T1566):</strong> Malicious important_instructions.docx delivered to user nour</li><li><strong>Attacker IP:</strong> 192.20.80.25 — geolocated and threat-intelligence validated</li><li><strong>Lateral Movement (T1021):</strong> wmiexec.py used across domain. ICMP scan of 192.168.20.0/24</li><li><strong>Persistence (T1547.001):</strong> Registry Run key modified. New account rambo created as backdoor</li><li><strong>Process Injection (T1055):</strong> Code injected into PID 7384 via Sysmon correlation</li><li><strong>Exfiltration (T1041):</strong> sami.xlsx exfiltrated via curl to external C2</li></ul>" +
        "<h2>Insider Threat Discovery</h2><p>Cross-correlating HR access logs, financial records, and communication patterns revealed employee 'sami' had direct knowledge and financial motive — evidence indicated sami hired the external attacker. Both actors identified and documented.</p>" +
        "<h2>Deliverables</h2><p>Full incident timeline with timestamps · Complete MITRE ATT&amp;CK mapping (6 techniques, 5 tactics) · Evidence package for legal proceedings · Remediation recommendations: MFA enforcement, privileged access review, enhanced DLP, SIEM rule improvements</p>",
      displayOrder: 3,
    },
  ];
  await prisma.caseStudy.createMany({ data: caseStudies });
  console.log(`seeded ${caseStudies.length} case studies`);
}

async function seedAssessments() {
  if ((await prisma.assessment.count()) > 0) return;
  const assessments = [
    {
      title: "Interbank Switching Facility — VA & Risk Mitigation",
      tag: "Vulnerability Assessment & Penetration Testing",
      label: "University of Johannesburg · Academic Project · Oct–Nov 2024",
      overview:
        "<p>Conducted a comprehensive vulnerability assessment and penetration test on a live interbank switching facility — the infrastructure routing electronic financial transactions between banks in South Africa. The system processes millions of transactions daily and is a high-value target for advanced threat actors. The engagement required thorough assessment methodology while maintaining zero disruption to live financial operations.</p>" +
        "<h3>Scope &amp; Environment</h3><ul><li><strong>Web Servers:</strong> Apache 2.4.41 running Drupal 9.0 — production environment with live transaction APIs</li><li><strong>Endpoints:</strong> Windows 7 (legacy, unsupported), Windows 10, and Windows 11 workstations across 3 departments</li><li><strong>Network:</strong> Segmented internal LAN, WPA3 enterprise WiFi, external-facing DMZ</li><li><strong>Active Directory:</strong> Full AD environment with 200+ users, 15 admin accounts, multiple OUs</li><li><strong>Database:</strong> MySQL 5.7 backing the transaction processing application</li></ul>" +
        "<h3>Methodology</h3><p><strong>Phase 1 — Recon:</strong> OSINT and passive fingerprinting. <strong>Phase 2 — Scanning:</strong> Nessus and OpenVAS across all in-scope systems. <strong>Phase 3 — Manual Testing:</strong> Burp Suite web app testing, BloodHound for AD enumeration, Metasploit for exploitation. <strong>Phase 4 — Report:</strong> CVSS v3.1 scoring with tiered remediation roadmap.</p>",
      findings: [
        "Critical — RCE on legacy Windows 7 endpoints via unpatched EternalBlue-family vulnerabilities",
        "High — SQL Injection on the primary transaction form field",
        "High — Stored XSS on the Drupal admin portal",
        "High — Active Directory misconfiguration with Kerberoastable service accounts",
        "Medium — WPA3 WiFi using a predictable, crackable PSK",
        "Medium — No EDR deployed organisation-wide",
      ],
      outcome:
        "Immediate (0–30 days): isolated all Windows 7 systems, emergency patching for Critical/High CVEs, disabled stale AD accounts, patched Apache/Drupal. Strategic (30–120 days): EDR deployment, AD hardening, WAF implementation, WiFi PSK rotation, OS modernisation programme. Result: critical vulnerabilities reduced 40% within 30 days; web vulnerabilities patched within 72 hours of report delivery.",
      toolsUsed: ["Nessus", "OpenVAS", "Burp Suite Pro", "Metasploit", "BloodHound", "Nmap", "Wireshark", "Hashcat", "PowerShell"],
      metrics: { outcomes: [{ val: "40%", label: "Critical Vulns Reduced" }, { val: "5", label: "High-Severity Findings" }, { val: "3", label: "Systems Assessed" }, { val: "100%", label: "Remediation Coverage" }] },
      displayOrder: 1,
    },
    {
      title: "Ubuntu 22.04 — DISA STIG Compliance Audit",
      tag: "Compliance Audit · System Hardening",
      label: "TryCyber University · Security Lab · 2024",
      overview:
        "<p>Full DISA STIG compliance audit on an Ubuntu 22.04 LTS server in a simulated enterprise environment. Objective: identify all configuration deviations from DoD baseline security requirements, remediate all critical findings, and produce a before/after compliance report demonstrating full closure.</p>" +
        "<h3>Audit Scope</h3><ul><li>Authentication and password policy (PAM configuration, /etc/login.defs)</li><li>Filesystem permissions, world-writable files, SUID/SGID binaries</li><li>Audit logging via auditd for privileged command execution</li><li>SSH daemon hardening</li><li>Unnecessary services and open ports</li><li>Kernel security parameters via /etc/sysctl.conf</li></ul>",
      findings: [
        "Critical — Weak password encryption (MD5, not SHA-512) fixed via PAM/login.defs",
        "Critical — 7 world-writable files across /tmp, /var/tmp, /opt restored to correct permissions",
        "Critical — Audit logging gaps closed with comprehensive auditd watch rules",
        "High — SSH root login permitted; disabled and MaxAuthTries limited",
        "Medium — Unnecessary services (Telnet, FTP, rsh) purged",
      ],
      outcome: "Re-ran DISA STIG scan post-remediation using OpenSCAP with the Ubuntu 22.04 STIG profile. All 11 findings remediated. Full DISA STIG compliance achieved, documented in a before/after compliance report.",
      toolsUsed: ["DISA STIG Viewer", "OpenSCAP", "Lynis", "auditd", "PAM", "Bash scripting"],
      metrics: { outcomes: [{ val: "DISA", label: "STIG Compliant" }, { val: "3", label: "Critical Findings" }, { val: "11", label: "Total Findings" }, { val: "100%", label: "Remediated" }] },
      displayOrder: 2,
    },
    {
      title: "Forensic Analysis of Hard Drive — Company X",
      tag: "Digital Forensics · Incident Investigation",
      label: "University of Johannesburg · Academic Investigation · 2024",
      overview:
        "<p>Forensic investigation of a hard drive seized from a Company X workstation in a suspected insider threat case, conducted under South Africa's Cybercrime Act 2021. Objectives: recover deleted files, identify anti-forensic activity, uncover hidden accounts, and reconstruct a complete event timeline suitable for legal proceedings.</p>" +
        "<h3>Evidence Acquisition</h3><p>Created a bit-for-bit forensic image using dd with block-size optimisation. Generated MD5 and SHA-256 hashes of both the original drive and image to establish a verified chain of custody. All analysis performed exclusively on the image.</p>",
      findings: [
        "47 deleted documents recovered via Autopsy file carving, including 12 confidential financial records",
        "Anti-forensic activity detected: CCleaner execution, manual log deletion, timestomping on 6 files",
        "3 hidden shadow accounts with root-level privileges found outside normal HR/AD processes",
        "Full event timeline reconstructed showing deliberate evidence destruction beginning 3 days before resignation",
      ],
      outcome: "Evidence package structured to meet court admissibility standards under South Africa's Cybercrime Act 2021: chain of custody documentation, hash verification at each stage, tool validation records, and analyst methodology certification.",
      toolsUsed: ["Autopsy", "FTK Imager", "dd", "MD5/SHA-256 verification", "Sleuth Kit", "Volatility 3", "RegRipper"],
      metrics: { outcomes: [{ val: "100%", label: "Chain of Custody" }, { val: "47", label: "Files Recovered" }, { val: "3", label: "Hidden Accounts" }, { val: "SA Law", label: "Court-Ready Report" }] },
      displayOrder: 3,
    },
    {
      title: "Security Assessment — Simulated Corporate Network",
      tag: "Network Penetration Testing",
      label: "University of Johannesburg · Simulated Corporate Network · 2024",
      overview:
        "<p>Comprehensive black-box penetration test against a simulated corporate network modelled on a mid-sized financial services organisation. Objective: identify the maximum impact an unauthenticated external attacker could achieve against a realistic network topology including Active Directory, DMZ, web applications, and internal services.</p>",
      findings: [
        "Critical — Default credentials on phpMyAdmin, a network printer, and 2 switches",
        "Critical — Kerberoastable service accounts with weak, non-AES-enforced passwords",
        "Critical — LLMNR/NBT-NS enabled, allowing NTLMv2 hash capture within 60 seconds",
        "Critical — Unpatched legacy Windows XP/7 systems with no compensating controls",
        "High — 12 standard users with local admin rights on all workstations",
      ],
      outcome: "Full attack chain from external recon through phpMyAdmin default creds, Kerberoasting, pass-the-hash lateral movement, to a DCSync attack achieving Domain Admin. Tiered remediation roadmap delivered (week 1 / month 1 / quarter 1).",
      toolsUsed: ["Nmap", "Nikto", "Dirbuster", "Metasploit", "Responder", "Impacket", "BloodHound", "Mimikatz", "Hashcat", "Burp Suite", "CrackMapExec"],
      metrics: { outcomes: [{ val: "12", label: "Vulnerabilities Found" }, { val: "4", label: "Critical Findings" }, { val: "DA", label: "Domain Admin Achieved" }, { val: "100%", label: "Roadmap Delivered" }] },
      displayOrder: 4,
    },
    {
      title: "Apache Tomcat Web Server Compromise",
      tag: "SOC Investigation · PCAP Analysis",
      label: "Blue Team Lab · Attack Chain Reconstruction · 2024",
      overview:
        "<p>Blue team forensic investigation of a compromised Apache Tomcat server from a 4-hour network PCAP capture spanning the compromise window. Objective: reconstruct the complete attack chain from initial reconnaissance through persistent access, identify the attacker, and produce an evidence package suitable for disciplinary or legal action.</p>",
      findings: [
        "Stage 1 — Gobuster directory enumeration against /manager paths (T1595)",
        "Stage 2 — Credential brute-force via Hydra; default creds tomcat:tomcat succeeded (T1110)",
        "Stage 3 — Malicious WAR (JSP web shell) uploaded via Tomcat manager (T1505.003)",
        "Stage 4 — RCE via web shell, Meterpreter reverse shell to attacker C2 (T1059)",
        "Stage 5 — Persistence via cron job and new Tomcat admin account (T1547, T1136)",
        "Stage 6 — Attacker identified via DHCP/AD correlation to internal workstation WS-FINANCE-07",
      ],
      outcome: "Evidence package delivered: annotated PCAP timeline, extracted/decompiled WAR shell, attacker identification report, full MITRE ATT&CK mapping, and a remediation checklist (credential rotation, WAR removal, cron cleanup, account lockout).",
      toolsUsed: ["Wireshark", "NetworkMiner", "Tshark", "jd-gui", "CyberChef", "MITRE ATT&CK Navigator"],
      metrics: { outcomes: [{ val: "6", label: "Attack Stages Mapped" }, { val: "1", label: "Attacker Identified" }, { val: "PCAP", label: "Full Chain in Evidence" }, { val: "100%", label: "Chain Reconstructed" }] },
      displayOrder: 5,
    },
    {
      title: "Incident Response — Malicious IP Blocking",
      tag: "Incident Response · SOC Tier 1",
      label: "Blue Team · Threat Intelligence · SOC Operations · 2024",
      overview:
        "<p>Tier 1 SOC triage and response to a SIEM alert flagging a successful authentication from a geographically anomalous IP address. Alert triaged, threat intelligence gathered, session analysed for impact, remediation applied, and the full incident documented and escalated — all within 47 minutes of the initial alert firing.</p>",
      findings: [
        "AbuseIPDB: 100% malicious confidence, 847 abuse reports over 90 days",
        "Cisco Talos: IP blacklisted as a botnet C2 node",
        "VirusTotal: 14/80 vendors flagged the IP, linked to a Mirai botnet variant",
        "MaxMind GeoIP: IP resolves to a region with no organisational presence",
        "Session review: 3 read-only API calls only — no write operations, no exfiltration confirmed",
      ],
      outcome: "IP blocked at perimeter firewall/WAF within 8 minutes. Geo-blocking added for the offending ASN. Service account password rotated and MFA enforced on all service accounts. Incident escalated to Tier 2 for root cause analysis.",
      toolsUsed: ["SIEM", "AbuseIPDB", "Cisco Talos", "VirusTotal", "MaxMind GeoIP", "Firewall console", "PAM system"],
      metrics: { outcomes: [{ val: "100%", label: "IP Confirmed Malicious" }, { val: "<1hr", label: "Detection to Block" }, { val: "0", label: "Data Breach Confirmed" }, { val: "P1", label: "Incident Priority" }] },
      displayOrder: 6,
    },
    {
      title: "CVE-2017-11882 — Malicious RTF Document Analysis",
      tag: "Malware Analysis · CVE-2017-11882",
      label: "Blue Team · Static & Dynamic Analysis · 2024",
      overview:
        "<p>Static and dynamic malware analysis of a malicious RTF document exploiting CVE-2017-11882 — the Microsoft Equation Editor stack buffer overflow. The sample arrived as a suspected phishing attachment. Objective: fully reverse-engineer the exploit chain, identify the payload, extract all indicators of compromise, and write a YARA detection rule.</p>",
      findings: [
        "Static: rtfdump.py + OleTools identified an Equation.3 exploit object with XOR-encoded shellcode",
        "Decoded payload URL retrieved a Formbook infostealer (185.220.101.47/update.exe)",
        "Dynamic: sandbox detonation confirmed EQNEDT32.EXE spawning shellcode and cmd.exe on document open",
        "Persistence via HKCU Run key registry modification",
        "C2 beaconing every 60 seconds via base64-encoded HTTP POST",
      ],
      outcome: "YARA rule written to detect the exploit RTF by Equation Editor object signature and XOR-encoded URL pattern; deployed to endpoint detection tooling and email gateway scanning. C2 IP blocked at perimeter.",
      toolsUsed: ["VirusTotal", "Any.run sandbox", "rtfdump.py", "OleTools", "scdbg", "x64dbg", "Wireshark", "CyberChef", "YARA", "PEStudio"],
      metrics: { outcomes: [{ val: "CVE", label: "2017-11882 Confirmed" }, { val: "100%", label: "Payload Decoded" }, { val: "7", label: "IOCs Extracted" }, { val: "YARA", label: "Rule Written" }] },
      displayOrder: 7,
    },
    {
      title: "QRadar SIEM — Insider Threat Investigation",
      tag: "SIEM Investigation · Insider Threat",
      label: "Blue Team Lab · IBM QRadar · Financial Company · 2024",
      overview:
        "<p>Full threat hunting and incident investigation using IBM QRadar SIEM against a complex multi-stage attack on a financial company, correlating 15 active log sources including Suricata IDS/IPS, Windows Event Logs, Cisco ASA firewall, endpoint telemetry, and Active Directory audit logs. The investigation uncovered both an external threat actor and an insider accomplice.</p>",
      findings: [
        "T1566 phishing delivery of a malicious macro document, traced to a spoofed HR address",
        "T1021 lateral movement via wmiexec.py across 3 internal hosts",
        "T1547.001 persistence via a new local-admin backdoor account",
        "T1055 process injection into svchost.exe detected via Sysmon",
        "T1041 exfiltration of a sensitive spreadsheet via curl to an external C2",
        "Insider threat confirmed via cross-correlation of HR access logs and financial transaction anomalies",
      ],
      outcome: "Full 17.5-hour incident timeline produced with a complete MITRE ATT&CK Navigator layer, custom QRadar offense rules for the pattern, and an evidence package for HR and legal proceedings. Recommendations: enforce MFA, deploy DLP, implement UEBA, restrict wmiexec/PsExec via GPO.",
      toolsUsed: ["IBM QRadar SIEM", "Suricata IDS/IPS", "Windows Event Viewer", "Sysmon", "VirusTotal", "MaxMind", "MITRE ATT&CK Navigator"],
      metrics: { outcomes: [{ val: "15", label: "Log Sources Correlated" }, { val: "6", label: "ATT&CK Techniques" }, { val: "2", label: "Threat Actors Found" }, { val: "Full", label: "Chain Mapped" }] },
      displayOrder: 8,
    },
    {
      title: "ANZ — SOC Cyber Management Virtual Experience",
      tag: "Virtual Experience · SOC Analysis",
      label: "Forage · ANZ Australia · Feb 2024",
      overview:
        "<p>Completed ANZ Australia's SOC Cyber Management Virtual Experience programme on Forage, simulating the role of a Tier 1 SOC analyst across two core investigation tasks: email threat analysis and network forensics via live PCAP analysis.</p>",
      findings: [
        "Identified 3 phishing emails via sender domain spoofing and SPF/DKIM/DMARC misalignment",
        "Identified 2 business email compromise attempts via display-name/reply-to mismatch",
        "DNS tunnelling detected via abnormally long query strings (iodine tool signature)",
        "C2 beaconing detected via regular 60-second HTTP POST intervals with a mismatched User-Agent",
        "Cleartext credentials captured in an HTTP (non-HTTPS) login sequence",
      ],
      outcome: "Programme completed with all task submissions. Demonstrated Tier 1 SOC capability across email and network domains — phishing identification, BEC recognition, DNS tunnelling detection, C2 beaconing analysis, and structured IOC reporting.",
      toolsUsed: ["Wireshark", "NetworkMiner", "VirusTotal", "MXToolbox", "CyberChef", "DNS analysis tools"],
      metrics: { outcomes: [{ val: "2", label: "Investigation Tasks" }, { val: "5", label: "IoCs Identified" }, { val: "DNS", label: "Tunnelling Detected" }, { val: "100%", label: "Programme Completed" }] },
      displayOrder: 9,
    },
    {
      title: "PwC Switzerland — Cybersecurity Advisory Simulation",
      tag: "Virtual Experience · Cybersecurity Advisory",
      label: "Forage · PwC Switzerland · Dec 2023",
      overview:
        "<p>Completed PwC Switzerland's Cybersecurity Advisory virtual experience on Forage, simulating a cybersecurity consultant on a real advisory engagement: an integrated security risk assessment, network segmentation architecture design, zero-trust model development, and a board-level risk report with a 12-month implementation roadmap.</p>",
      findings: [
        "ISO 27001-aligned risk assessment across people, process, and technology domains (14 risks scored)",
        "3-tier network segmentation design: DMZ, corporate LAN, critical infrastructure",
        "Zero-trust architecture designed per NIST SP 800-207: identity-centric, least-privilege, micro-segmented",
      ],
      outcome: "Produced a 12-page board-level risk report: a 14-item RAG-rated risk register, remediation priority matrix, 12-month implementation roadmap, and an executive summary in business-impact language.",
      toolsUsed: ["ISO 27001", "NIST CSF", "NIST SP 800-207", "Risk matrix", "MITRE ATT&CK"],
      metrics: { outcomes: [{ val: "14", label: "Risks Identified" }, { val: "Zero", label: "Trust Architecture" }, { val: "3-Tier", label: "Network Designed" }, { val: "Full", label: "Executive Report" }] },
      displayOrder: 10,
    },
    {
      title: "Mastercard — Security Awareness Analyst",
      tag: "Virtual Experience · Security Awareness",
      label: "Forage · Mastercard · Dec 2023",
      overview:
        "<p>Completed Mastercard's Security Awareness Analyst virtual experience on Forage: designed phishing simulations, assessed security readiness across 5 business units, and developed targeted training programmes mapped to identified risk patterns.</p>",
      findings: [
        "Designed 3 phishing templates: IT support impersonation, invoice fraud, executive request spoofing",
        "Assessed 5 business units — click rates ranged from 8% (Technology) to 34% (Finance)",
        "Designed tiered training: mandatory modules for high-risk units, universal baseline for all staff",
      ],
      outcome: "Programme completed with all deliverables submitted, including a dashboard design to surface high-risk individuals for targeted follow-up training.",
      toolsUsed: ["Phishing simulation platform", "Risk assessment matrix", "KnowBe4 methodology", "Human risk quantification"],
      metrics: { outcomes: [{ val: "5", label: "Business Units Assessed" }, { val: "3", label: "Phishing Templates" }, { val: "23%", label: "Avg Click Rate" }, { val: "100%", label: "Programme Designed" }] },
      displayOrder: 11,
    },
    {
      title: "Reverse Engineering — Windows Binary (Flare-On)",
      tag: "Reverse Engineering · Binary Analysis",
      label: "Flare-On Challenge · Windows PE Analysis · 2024",
      overview:
        "<p>Reverse-engineered a Windows PE executable from the Flare-On malware analysis challenge. The binary implemented a custom Base64 encoding scheme using a non-standard character set to obscure a hidden flag. Used IDA Pro for static disassembly, x64dbg for dynamic analysis, and wrote a Python script implementing the custom decode algorithm.</p>",
      findings: [
        "Static analysis in IDA Pro extracted a 64-byte permuted Base64 lookup table from .rodata",
        "Anti-debug check (IsDebuggerPresent) identified and bypassed via NOP patch in x64dbg",
        "Dynamic analysis confirmed the decode routine and its comparison against a hardcoded encoded string",
        "Python script built a custom-to-standard Base64 translation table, recovering the flag in under 10 minutes of scripting",
      ],
      outcome: "Hidden flag successfully recovered after bypassing the anti-debugging check and reverse-engineering the custom encoding scheme.",
      toolsUsed: ["IDA Pro", "x64dbg", "PEStudio", "Detect-It-Easy", "Sysinternals Process Monitor", "CFF Explorer", "Python 3", "CyberChef"],
      metrics: { outcomes: [{ val: "IDA", label: "Pro Static Analysis" }, { val: "Custom", label: "Base64 Decoded" }, { val: "Flag", label: "Successfully Recovered" }, { val: "Anti", label: "Debug Bypass" }] },
      displayOrder: 12,
    },
  ];
  await prisma.assessment.createMany({ data: assessments });
  console.log(`seeded ${assessments.length} assessments`);
}

async function main() {
  await seedProducts();
  await seedVentures();
  await seedCyberTools();
  await seedCaseStudies();
  await seedAssessments();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
