const GROUPS = [
  { label: "Offensive Security", pills: ["Kali Linux", "Metasploit", "Burp Suite", "Nmap", "Wireshark", "Nessus", "Nikto", "SQLMap"] },
  { label: "Defensive Security", pills: ["IBM QRadar", "Splunk", "SIEM", "SOC Operations", "Digital Forensics", "ISO 27001", "VAPT", "Incident Response"] },
  { label: "Development", pills: ["HTML / CSS", "JavaScript", "React", "Node.js", "Python", "Supabase", "PostgreSQL", "REST APIs"] },
  { label: "Product & Management", pills: ["Product Management", "Agile / Scrum", "QA Testing", "Jira", "Figma", "GitHub", "Netlify", "IoT / GSM"] },
];

export function Skills() {
  return (
    <section id="skills" className="section-alt">
      <div className="s-eyebrow">Technical Stack</div>
      <h2 className="s-title">Tools I work <em>with daily</em></h2>
      <div className="s-rule" />
      <div className="skills-grid">
        {GROUPS.map((g) => (
          <div key={g.label} className="skill-group">
            <div className="skill-group-label">{g.label}</div>
            <div className="skill-pills">
              {g.pills.map((p) => (
                <span key={p} className="skill-pill">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
