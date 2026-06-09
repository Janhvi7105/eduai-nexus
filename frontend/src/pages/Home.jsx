import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <div style={styles.floatingBadge}>✨ AI-Powered Learning Platform</div>
            <h1 style={styles.title}>
              Transform Your Future with <br />
              <span style={styles.gradientText}>EduAI Nexus</span>
            </h1>
            <p style={styles.subtitle}>
              Join 10,000+ learners mastering skills with personalized AI tutors,<br />
              real-time exams, and industry-recognized certifications.
            </p>
            <div style={styles.buttons}>
              <Link to="/login">
                <button style={styles.btnPrimary}>
                  🚀 Get Started Now
                  <span style={styles.btnArrow}>→</span>
                </button>
              </Link>
              <Link to="/courses">
                <button style={styles.btnSecondary}>
                  📚 Explore Courses
                </button>
              </Link>
              <Link to="/become-instructor">
                <button style={styles.btnInstructor}>
                  👨‍🏫 Become Instructor
                </button>
              </Link>
            </div>
            <div style={styles.trustBadge}>
              <span>⭐ 4.9/5 Trustpilot Rating</span>
              <span>🏆 50,000+ Graduates</span>
              <span>🌍 120+ Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👨‍🏫</div>
            <h2 style={styles.statNumber}>250+</h2>
            <p style={styles.statLabel}>Expert Instructors</p>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📚</div>
            <h2 style={styles.statNumber}>500+</h2>
            <p style={styles.statLabel}>Premium Courses</p>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <h2 style={styles.statNumber}>50k+</h2>
            <p style={styles.statLabel}>Active Students</p>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎯</div>
            <h2 style={styles.statNumber}>94%</h2>
            <p style={styles.statLabel}>Career Success</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Why Choose Us</span>
          <h2 style={styles.sectionTitle}>Learning Reimagined with <span style={styles.highlight}>Artificial Intelligence</span></h2>
          <p style={styles.sectionSubtitle}>
            Experience a revolutionary approach to education that adapts to your unique learning style
          </p>
        </div>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIconBg}>
              <div style={styles.featureIcon}>🧠</div>
            </div>
            <h3>AI-Powered Personalization</h3>
            <p>Smart algorithms create custom learning paths based on your strengths and weaknesses.</p>
            <Link to="/courses" style={styles.featureLink}>Learn more →</Link>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIconBg}>
              <div style={styles.featureIcon}>📝</div>
            </div>
            <h3>Real-Time Exam Simulator</h3>
            <p>Practice with adaptive quizzes that mirror real certification exams.</p>
            <Link to="/courses" style={styles.featureLink}>Learn more →</Link>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIconBg}>
              <div style={styles.featureIcon}>📊</div>
            </div>
            <h3>Advanced Analytics Dashboard</h3>
            <p>Track progress, identify gaps, and celebrate milestones with detailed insights.</p>
            <Link to="/courses" style={styles.featureLink}>Learn more →</Link>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIconBg}>
              <div style={styles.featureIcon}>🎓</div>
            </div>
            <h3>Industry Certifications</h3>
            <p>Earn verifiable certificates recognized by top employers worldwide.</p>
            <Link to="/courses" style={styles.featureLink}>Learn more →</Link>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIconBg}>
              <div style={styles.featureIcon}>💬</div>
            </div>
            <h3>24/7 Mentor Support</h3>
            <p>Get real-time help from AI tutors and human mentors anytime.</p>
            <Link to="/courses" style={styles.featureLink}>Learn more →</Link>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIconBg}>
              <div style={styles.featureIcon}>🌍</div>
            </div>
            <h3>Global Community</h3>
            <p>Connect with learners from 120+ countries and grow together.</p>
            <Link to="/courses" style={styles.featureLink}>Learn more →</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.howItWorks}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Simple Process</span>
          <h2 style={styles.sectionTitle}>Your Learning Journey in <span style={styles.highlight}>4 Easy Steps</span></h2>
        </div>
        <div style={styles.stepsContainer}>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>01</div>
            <div style={styles.stepIcon}>📝</div>
            <h3>Create Account</h3>
            <p>Sign up in 30 seconds and set your learning goals</p>
          </div>
          <div style={styles.stepConnector}>→</div>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>02</div>
            <div style={styles.stepIcon}>🎯</div>
            <h3>Choose Path</h3>
            <p>Get AI-recommended courses based on your career goals</p>
          </div>
          <div style={styles.stepConnector}>→</div>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>03</div>
            <div style={styles.stepIcon}>🚀</div>
            <h3>Start Learning</h3>
            <p>Engage with interactive lessons and real-time quizzes</p>
          </div>
          <div style={styles.stepConnector}>→</div>
          <div style={styles.stepCard}>
            <div style={styles.stepNumber}>04</div>
            <div style={styles.stepIcon}>🏆</div>
            <h3>Get Certified</h3>
            <p>Earn your certificate and advance your career</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonials}>
        <div style={styles.testimonialBg}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadgeWhite}>Student Stories</span>
            <h2 style={styles.sectionTitleWhite}>Loved by <span style={styles.highlightWhite}>50,000+</span> Learners Worldwide</h2>
          </div>
          <div style={styles.testimonialsGrid}>
            <div style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p>"The AI-powered recommendations helped me land a job at Google. Best investment in my career!"</p>
              <div style={styles.testimonialAuthor}>
                <div style={styles.authorAvatar}>SJ</div>
                <div>
                  <strong>Sarah Johnson</strong>
                  <span>Software Engineer, Google</span>
                </div>
              </div>
            </div>
            <div style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p>"The real-time exam system is brilliant. It adapts to your level and really prepares you for certification."</p>
              <div style={styles.testimonialAuthor}>
                <div style={styles.authorAvatar}>MC</div>
                <div>
                  <strong>Michael Chen</strong>
                  <span>Data Analyst, Amazon</span>
                </div>
              </div>
            </div>
            <div style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p>"From beginner to professional in 6 months. The structured learning paths made all the difference."</p>
              <div style={styles.testimonialAuthor}>
                <div style={styles.authorAvatar}>PP</div>
                <div>
                  <strong>Priya Patel</strong>
                  <span>Frontend Lead, Microsoft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <h2>Ready to Accelerate Your Career?</h2>
          <p>Join 50,000+ professionals who are leveling up with EduAI Nexus</p>
          <div style={styles.ctaButtons}>
            <Link to="/login">
              <button style={styles.ctaButtonPrimary}>🚀 Get Started Now →</button>
            </Link>
            <Link to="/courses">
              <button style={styles.ctaButtonSecondary}>📚 Browse Courses</button>
            </Link>
          </div>
          <p style={styles.ctaNote}>✨ No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerLogo}>EduAI<span>Nexus</span></h3>
            <p>Empowering careers through AI-powered education</p>
            <div style={styles.socialIcons}>
              <span>📘</span>
              <span>🐦</span>
              <span>📷</span>
              <span>💼</span>
            </div>
          </div>
          <div style={styles.footerColumn}>
            <h4>Platform</h4>
            <Link to="/courses">Courses</Link>
            <Link to="/become-instructor">Become Instructor</Link>
            <Link to="#">Enterprise</Link>
            <Link to="#">Pricing</Link>
          </div>
          <div style={styles.footerColumn}>
            <h4>Resources</h4>
            <Link to="#">Blog</Link>
            <Link to="#">Community</Link>
            <Link to="#">Help Center</Link>
            <Link to="#">API Docs</Link>
          </div>
          <div style={styles.footerColumn}>
            <h4>Company</h4>
            <Link to="#">About Us</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Press Kit</Link>
            <Link to="#">Contact</Link>
          </div>
          <div style={styles.footerColumn}>
            <h4>Legal</h4>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookie Policy</Link>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2025 EduAI Nexus. All rights reserved. Crafted with ❤️ for global learners.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;

// 🎨 Ultra-Attractive Modern Styles
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#ffffff",
    color: "#1a1a2e",
    overflowX: "hidden",
  },

  hero: {
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },

  heroOverlay: {
    background: "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15), transparent)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  heroContent: {
    textAlign: "center",
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  floatingBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "8px 20px",
    borderRadius: "40px",
    fontSize: "14px",
    color: "#a78bfa",
    marginBottom: "30px",
    border: "1px solid rgba(167, 139, 250, 0.3)",
  },

  title: {
    fontSize: "64px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "white",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
  },

  gradientText: {
    background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "40px",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto 40px",
  },

  buttons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "50px",
  },

  btnPrimary: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
  },

  btnArrow: {
    transition: "transform 0.3s ease",
  },

  btnSecondary: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "12px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  btnInstructor: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)",
  },

  trustBadge: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    maxWidth: "500px",
    margin: "0 auto",
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)",
  },

  statsSection: {
    padding: "60px 20px",
    background: "white",
    borderBottom: "1px solid #e2e8f0",
  },

  statsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  statCard: {
    textAlign: "center",
    padding: "20px 40px",
    minWidth: "180px",
  },

  statIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  statNumber: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#4f46e5",
    marginBottom: "5px",
  },

  statLabel: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },

  statDivider: {
    width: "1px",
    height: "50px",
    background: "#e2e8f0",
  },

  features: {
    padding: "100px 20px",
    background: "#f8fafc",
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },

  sectionBadge: {
    display: "inline-block",
    padding: "6px 16px",
    background: "linear-gradient(135deg, #e0e7ff, #ede9fe)",
    color: "#4f46e5",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
  },

  sectionBadgeWhite: {
    display: "inline-block",
    padding: "6px 16px",
    background: "rgba(255,255,255,0.2)",
    color: "#c084fc",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
  },

  sectionTitle: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#0f172a",
  },

  sectionTitleWhite: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "white",
  },

  highlight: {
    background: "linear-gradient(135deg, #6366f1, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  highlightWhite: {
    background: "linear-gradient(135deg, #a78bfa, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  sectionSubtitle: {
    fontSize: "18px",
    color: "#64748b",
    maxWidth: "600px",
    margin: "0 auto",
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  featureCard: {
    background: "white",
    padding: "32px",
    borderRadius: "20px",
    textAlign: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },

  featureIconBg: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "70px",
    height: "70px",
    background: "linear-gradient(135deg, #e0e7ff, #ede9fe)",
    borderRadius: "20px",
    marginBottom: "20px",
  },

  featureIcon: {
    fontSize: "32px",
  },

  featureLink: {
    display: "inline-block",
    marginTop: "16px",
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "500",
  },

  howItWorks: {
    padding: "100px 20px",
    background: "white",
  },

  stepsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  stepCard: {
    textAlign: "center",
    flex: "1",
    minWidth: "200px",
    padding: "30px",
    position: "relative",
  },

  stepNumber: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6366f1",
    marginBottom: "16px",
  },

  stepIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },

  stepConnector: {
    fontSize: "32px",
    color: "#cbd5e1",
    fontWeight: "300",
  },

  testimonials: {
    padding: "100px 20px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
  },

  testimonialBg: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    marginTop: "40px",
  },

  testimonialCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: "28px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  testimonialStars: {
    fontSize: "18px",
    marginBottom: "16px",
  },

  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "20px",
  },

  authorAvatar: {
    width: "45px",
    height: "45px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "white",
  },

  cta: {
    padding: "100px 20px",
    background: "white",
  },

  ctaContent: {
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto",
    padding: "60px 40px",
    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
    borderRadius: "40px",
  },

  ctaButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "30px 0 20px",
  },

  ctaButtonPrimary: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    cursor: "pointer",
  },

  ctaButtonSecondary: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: "2px solid #6366f1",
    borderRadius: "12px",
    background: "transparent",
    color: "#6366f1",
    cursor: "pointer",
  },

  ctaNote: {
    fontSize: "14px",
    color: "#64748b",
  },

  footer: {
    background: "#0f172a",
    color: "#94a3b8",
    padding: "60px 20px 30px",
  },

  footerContent: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  footerLogo: {
    fontSize: "24px",
    marginBottom: "16px",
  },

  socialIcons: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    fontSize: "24px",
  },

  footerBottom: {
    textAlign: "center",
    paddingTop: "40px",
    marginTop: "40px",
    borderTop: "1px solid #1e293b",
  },
};