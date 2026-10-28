const milestones = [
  'Authentication and role-based access',
  'Employee directory and administration',
  'Attendance and leave workflows',
  'Announcements, training and notifications',
  'Reports, testing and deployment readiness',
];

export default function App() {
  return (
    <main className="landing-shell">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3">
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold" href="/" aria-label="StaffSync home">
          <span className="brand-mark"><i className="bi bi-people-fill" /></span>
          <span>Staff<span className="brand-accent">Sync</span></span>
        </a>
        <span className="ms-auto small text-secondary">HR management, connected.</span>
      </nav>
      <section className="container py-5 py-lg-6">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <p className="eyebrow mb-3">MODERN HUMAN RESOURCE MANAGEMENT</p>
            <h1 className="display-4 fw-bold hero-title">People operations,<br /><span>made simpler.</span></h1>
            <p className="lead text-secondary mt-4 mb-4 hero-copy">
              StaffSync is being built as a secure, role-aware HR workspace for employee records,
              attendance, leave, announcements, training and reporting.
            </p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="tech-pill">React</span><span className="tech-pill">Express</span>
              <span className="tech-pill">MongoDB</span><span className="tech-pill">JWT</span>
            </div>
            <div className="status-note"><span className="status-dot" /> Project foundation initialized — feature workflows are added in subsequent phases.</div>
          </div>
          <div className="col-lg-5">
            <div className="roadmap-card shadow-sm">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div><p className="eyebrow mb-1">PLATFORM ROADMAP</p><h2 className="h5 fw-bold mb-0">What StaffSync brings together</h2></div>
                <span className="roadmap-icon"><i className="bi bi-grid-1x2-fill" /></span>
              </div>
              {milestones.map((item, index) => (
                <div className="roadmap-row" key={item}>
                  <span className="roadmap-number">0{index + 1}</span><span>{item}</span>
                </div>
              ))}
              <p className="small text-secondary mt-4 mb-0">This page is an initialization shell, not a feature-complete HRMS.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="container pb-4 small text-secondary d-flex flex-wrap justify-content-between gap-2">
        <span>© 2026 StaffSync</span><span>Built with a MERN architecture</span>
      </footer>
    </main>
  );
}
