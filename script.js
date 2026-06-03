// ---------- Year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Sticky nav state ----------
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- Mobile menu ----------
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ---------- Hero rotating headline ----------
const phrases = [
  "Build your product.",
  "Code anywhere.",
  "From idea to production.",
  "Ship software peacefully.",
  "Your fastest path to production.",
];
const rotator = document.getElementById("rotator");
let pi = 0;
function rotate() {
  rotator.style.opacity = "0";
  rotator.style.transform = "translateY(8px)";
  setTimeout(() => {
    pi = (pi + 1) % phrases.length;
    rotator.textContent = phrases[pi];
    rotator.style.transition = "opacity .4s ease, transform .4s ease";
    rotator.style.opacity = "1";
    rotator.style.transform = "none";
  }, 380);
}
setInterval(rotate, 2800);

// ---------- Service cards ----------
const services = [
  {
    icon: "☁️",
    title: "Infrastructure & Cloud Operations",
    desc: "Design, deploy, manage and optimize infrastructure anywhere.",
    tags: ["AWS", "Azure", "GCP", "Oracle", "Multi-Cloud", "On-Prem", "Cost Optimization"],
  },
  {
    icon: "🖥️",
    title: "Managed Hosting",
    desc: "Fully managed hosting for businesses of all sizes.",
    tags: ["cPanel / WHM", "VPS", "Dedicated", "Docker", "Kubernetes", "WordPress", "SaaS"],
  },
  {
    icon: "🧱",
    title: "Platform Engineering",
    desc: "Internal platforms that let developers move faster.",
    tags: ["Internal Dev Platforms", "Self-Service Portals", "Golden Paths", "Automation"],
  },
  {
    icon: "🔁",
    title: "DevOps & Automation",
    desc: "Accelerate delivery with modern DevOps practices.",
    tags: ["CI/CD", "GitOps", "Terraform", "Helm", "ArgoCD", "Blue-Green", "Canary"],
  },
  {
    icon: "⛵",
    title: "Kubernetes Services",
    desc: "Enterprise-grade Kubernetes operations & management.",
    tags: ["EKS", "AKS", "GKE", "OpenShift", "K3s", "Hardening", "Multi-Cluster"],
  },
  {
    icon: "🛡️",
    title: "Security & DevSecOps",
    desc: "Secure your apps, infrastructure and cloud.",
    tags: ["DevSecOps", "Vulnerability Mgmt", "WAF", "Secrets", "Threat Detection", "Audits"],
  },
  {
    icon: "📋",
    title: "Compliance & Governance",
    desc: "Get audit-ready for regulatory requirements.",
    tags: ["PCI DSS", "HIPAA", "ISO 27001", "SOC 2", "GDPR", "NIST"],
  },
  {
    icon: "📈",
    title: "Observability & Monitoring",
    desc: "Complete visibility into your systems.",
    tags: ["Datadog", "Grafana", "Prometheus", "ELK", "OpenSearch", "Tracing", "Alerting"],
  },
  {
    icon: "🗄️",
    title: "Database Services",
    desc: "Professional database operations & administration.",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "DBA-as-a-Service"],
  },
  {
    icon: "⚙️",
    title: "Reliability Engineering (SRE)",
    desc: "Improve reliability and reduce downtime.",
    tags: ["SLA / SLO", "Error Budgets", "Incident Response", "On-Call", "Postmortems"],
  },
  {
    icon: "🚀",
    title: "Application Modernization",
    desc: "Modernize and optimize existing applications.",
    tags: ["Dockerization", "Microservices", "Refactoring", "Cloud Migration"],
  },
  {
    icon: "✉️",
    title: "Email & Collaboration",
    desc: "Managed business communication platforms.",
    tags: ["Google Workspace", "Microsoft 365", "Zoho", "Migration", "Deliverability"],
  },
  {
    icon: "💾",
    title: "Backup & Disaster Recovery",
    desc: "Protect against outages, failures and data loss.",
    tags: ["DR Planning", "DR Testing", "Multi-Region", "Failover", "RPO / RTO"],
  },
  {
    icon: "💡",
    title: "Consulting Services",
    desc: "Expert technology consulting from senior engineers.",
    tags: ["Cloud", "Security", "Architecture", "DevOps", "Kubernetes", "Cost"],
  },
  {
    icon: "🛟",
    title: "Managed Operations & 24/7 Support",
    desc: "Your dedicated operations team around the clock.",
    tags: ["L1 / L2 / L3", "24/7 NOC", "Incident Detection", "Proactive Maintenance"],
  },
];

const grid = document.getElementById("servicesGrid");
grid.innerHTML = services
  .map(
    (s) => `
    <article class="svc reveal">
      <div class="svc__icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p class="svc__desc">${s.desc}</p>
      <div class="svc__tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    </article>`
  )
  .join("");

// Pointer-follow glow on service cards
grid.querySelectorAll(".svc").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document
  .querySelectorAll(".section__head, .gap-card, .where, .svc, .pkg, .industries span, .cta__inner")
  .forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 8) * 40}ms`;
    io.observe(el);
  });
