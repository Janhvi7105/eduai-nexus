// InstructorLanding.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function InstructorLanding() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Add animation styles dynamically
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(20deg); }
        75% { transform: rotate(-20deg); }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes modalFadeIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }
      
      button {
        font-family: inherit;
      }
      
      @media (max-width: 768px) {
        .step-connector {
          display: none;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const featureDetails = {
    "Earn Money": {
      title: "💰 Earn Money",
      description: "Transform your knowledge into a sustainable income stream!",
      benefits: [
        "Earn up to 70% revenue share on every course sale",
        "Monthly payments via PayPal, Stripe, or bank transfer",
        "Passive income as your courses sell 24/7",
        "Bonus incentives for top-performing instructors",
        "Affiliate program to earn additional commissions"
      ],
      stats: "Average instructor earns $5,000+ per month",
      image: "💰"
    },
    "Inspire Students": {
      title: "💡 Inspire Students",
      description: "Make a real difference in students' lives through education!",
      benefits: [
        "Connect with thousands of eager learners worldwide",
        "Build a community of dedicated students",
        "Get real-time feedback and reviews",
        "Host live Q&A sessions and webinars",
        "Earn recognition as a subject matter expert"
      ],
      stats: "92% of students report career improvement",
      image: "💡"
    },
    "Global Reach": {
      title: "🌐 Global Reach",
      description: "Expand your influence across borders and time zones!",
      benefits: [
        "Access to 190+ countries worldwide",
        "Multi-language support for your courses",
        "24/7 automated teaching platform",
        "Marketing tools to promote globally",
        "Cultural insights and localization support"
      ],
      stats: "Courses available in 50+ languages",
      image: "🌐"
    }
  };

  const handleLearnMore = (featureTitle) => {
    setSelectedFeature(featureDetails[featureTitle]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFeature(null);
  };

  return (
    <div style={styles.container}>
      
      {/* MODAL POPUP */}
      {showModal && selectedFeature && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.modalIcon}>{selectedFeature.image}</span>
              <h2 style={styles.modalTitle}>{selectedFeature.title}</h2>
              <button style={styles.modalClose} onClick={closeModal}>✕</button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalDescription}>{selectedFeature.description}</p>
              
              <div style={styles.modalSection}>
                <h3 style={styles.modalSubtitle}>✨ Key Benefits</h3>
                <ul style={styles.modalList}>
                  {selectedFeature.benefits.map((benefit, idx) => (
                    <li key={idx} style={styles.modalListItem}>
                      <span style={styles.modalCheck}>✓</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.modalStats}>
                <span style={styles.modalStatIcon}>📊</span>
                <span style={styles.modalStatText}>{selectedFeature.stats}</span>
              </div>
              
              <button
                style={styles.modalButton}
                onClick={() => {
                  closeModal();
                  navigate("/teacher-register");
                }}
              >
                Start Your Journey → 
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent} className="fade-in-up">
          <div style={styles.heroBadge}>
            <span style={styles.badgeIcon}>🎓</span>
            Join 50,000+ instructors
          </div>
          <h1 style={styles.heroTitle}>
            Make a global impact <span style={styles.waveEmoji}>🌍</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Create online courses and earn money by teaching students 
            around the world. Share your expertise and build a thriving community.
          </p>
          <div style={styles.heroButtons}>
            <button
              style={styles.ctaBtnPrimary}
              onClick={() => navigate("/teacher-register")}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Become an Instructor <span style={styles.arrowIcon}>→</span>
            </button>
          </div>
          
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>50K+</div>
              <div style={styles.statLabel}>Active Instructors</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>2M+</div>
              <div style={styles.statLabel}>Students Enrolled</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>150+</div>
              <div style={styles.statLabel}>Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Why Choose Us</span>
          <h2 style={styles.sectionTitle}>Discover your potential</h2>
          <p style={styles.sectionSubtitle}>
            Everything you need to create, market, and sell your online courses
          </p>
        </div>

        <div style={styles.cards}>
          {[
            {
              icon: "💰",
              title: "Earn Money",
              description: "Earn up to 70% revenue share every time a student enrolls in your course. Get paid monthly via PayPal, Stripe, or bank transfer.",
              gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            },
            {
              icon: "💡",
              title: "Inspire Students",
              description: "Share your knowledge and help students learn new skills. Build a community of learners who look up to you.",
              gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            },
            {
              icon: "🌐",
              title: "Global Reach",
              description: "Reach millions of students across 190+ countries. Your classroom is open 24/7, accessible from anywhere.",
              gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{...styles.cardIcon, background: feature.gradient}}>
                <span style={styles.iconEmoji}>{feature.icon}</span>
              </div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDescription}>{feature.description}</p>
              <div 
                style={styles.cardLink}
                onClick={() => handleLearnMore(feature.title)}
              >
                Learn more <span style={styles.arrowIcon}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div style={{...styles.section, background: "#f8fafc"}}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Simple Process</span>
          <h2 style={styles.sectionTitle}>How to start in 3 easy steps</h2>
          <p style={styles.sectionSubtitle}>
            Get your course online and start earning in no time
          </p>
        </div>

        <div style={styles.stepsContainer}>
          {[
            {
              step: "01",
              title: "Plan your course",
              description: "Outline your curriculum, define learning objectives, and structure your content.",
              icon: "📋",
              color: "#667eea"
            },
            {
              step: "02",
              title: "Record your videos",
              description: "Create high-quality video lessons using our production guidelines and tools.",
              icon: "🎥",
              color: "#f093fb"
            },
            {
              step: "03",
              title: "Publish & earn",
              description: "Launch your course, set your price, and start generating revenue.",
              icon: "💰",
              color: "#4facfe"
            }
          ].map((step, index) => (
            <div
              key={index}
              style={styles.stepCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{...styles.stepNumber, background: step.color}}>{step.step}</div>
              <div style={styles.stepIcon}>{step.icon}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
              {index < 2 && <div style={styles.stepConnector}>→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL SECTION */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Success Stories</span>
          <h2 style={styles.sectionTitle}>Trusted by instructors worldwide</h2>
          <p style={styles.sectionSubtitle}>
            Join thousands of successful educators who changed their lives
          </p>
        </div>

        <div style={styles.testimonialsContainer}>
          {[
            {
              name: "Sarah Johnson",
              role: "Programming Instructor",
              quote: "I've earned over $50,000 in my first year teaching Python. The platform's tools make course creation a breeze!",
              rating: 5,
              initials: "SJ"
            },
            {
              name: "Michael Chen",
              role: "Business Coach",
              quote: "The global reach is incredible. My students come from over 30 countries, and the support team is amazing.",
              rating: 5,
              initials: "MC"
            },
            {
              name: "Emma Rodriguez",
              role: "Design Expert",
              quote: "Teaching here changed my life. I quit my 9-5 and now teach full-time, reaching thousands of students.",
              rating: 5,
              initials: "ER"
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              style={styles.testimonialCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.testimonialHeader}>
                <div style={styles.testimonialAvatar}>{testimonial.initials}</div>
                <div>
                  <h4 style={styles.testimonialName}>{testimonial.name}</h4>
                  <p style={styles.testimonialRole}>{testimonial.role}</p>
                </div>
              </div>
              <div style={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={styles.starIcon}>★</span>
                ))}
              </div>
              <p style={styles.testimonialQuote}>"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <div style={styles.footerCta}>
        <div style={styles.footerOverlay}></div>
        <div style={styles.footerContent}>
          <div style={styles.footerBadge}>
            <span style={styles.trophyIcon}>🏆</span>
            Join the revolution
          </div>
          <h2 style={styles.footerTitle}>Start teaching today 🚀</h2>
          <p style={styles.footerSubtitle}>
            Transform your knowledge into a thriving online business.
            No upfront costs, no risk — just pure potential.
          </p>
          <button
            style={styles.footerButton}
            onClick={() => navigate("/teacher-register")}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Get Started Now <span style={styles.arrowIcon}>→</span>
          </button>
          <p style={styles.footerNote}>
            <span style={styles.checkIcon}>✓</span>
            Free to join • Cancel anytime • 24/7 support
          </p>
        </div>
      </div>
    </div>
  );
}

export default InstructorLanding;

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflowX: "hidden",
  },
  hero: {
    position: "relative",
    minHeight: "90vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1), transparent)",
  },
  heroContent: {
    position: "relative",
    maxWidth: "1000px",
    textAlign: "center",
    color: "#fff",
    zIndex: 2,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    padding: "8px 20px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  badgeIcon: {
    fontSize: "16px",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
    fontWeight: "800",
    marginBottom: "24px",
    lineHeight: "1.2",
  },
  waveEmoji: {
    display: "inline-block",
    animation: "wave 2s infinite",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 4vw, 1.25rem)",
    marginBottom: "40px",
    opacity: 0.95,
    maxWidth: "700px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "60px",
  },
  ctaBtnPrimary: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "50px",
    background: "#fff",
    color: "#667eea",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  arrowIcon: {
    fontSize: "16px",
    transition: "transform 0.3s ease",
  },
  statsContainer: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "40px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "clamp(1.5rem, 5vw, 2rem)",
    fontWeight: "800",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "14px",
    opacity: 0.9,
  },
  section: {
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionBadge: {
    display: "inline-block",
    background: "#e0e7ff",
    color: "#667eea",
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "16px",
  },
  sectionSubtitle: {
    fontSize: "1.1rem",
    color: "#6b7280",
    maxWidth: "600px",
    margin: "0 auto",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginTop: "20px",
  },
  card: {
    padding: "32px",
    borderRadius: "20px",
    background: "#fff",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  cardIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  iconEmoji: {
    fontSize: "40px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#1f2937",
  },
  cardDescription: {
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  cardLink: {
    color: "#667eea",
    fontSize: "14px",
    fontWeight: "500",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  stepsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    position: "relative",
  },
  stepCard: {
    position: "relative",
    textAlign: "center",
    padding: "40px 20px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  stepNumber: {
    position: "absolute",
    top: "-15px",
    left: "20px",
    color: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
  },
  stepIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  stepTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#1f2937",
  },
  stepDescription: {
    color: "#6b7280",
    lineHeight: "1.6",
  },
  stepConnector: {
    position: "absolute",
    top: "50%",
    right: "-30px",
    transform: "translateY(-50%)",
    fontSize: "24px",
    color: "#cbd5e1",
  },
  testimonialsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    marginTop: "20px",
  },
  testimonialCard: {
    background: "#fff",
    padding: "28px",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    border: "1px solid #f0f0f0",
  },
  testimonialHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  testimonialAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "20px",
  },
  testimonialName: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "4px",
    color: "#1f2937",
  },
  testimonialRole: {
    fontSize: "0.9rem",
    color: "#6b7280",
  },
  testimonialRating: {
    marginBottom: "16px",
  },
  starIcon: {
    color: "#fbbf24",
    fontSize: "16px",
    marginRight: "2px",
  },
  testimonialQuote: {
    color: "#4b5563",
    lineHeight: "1.6",
    fontStyle: "italic",
  },
  footerCta: {
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    margin: "40px 20px 60px",
    borderRadius: "40px",
    overflow: "hidden",
  },
  footerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1), transparent)",
  },
  footerContent: {
    position: "relative",
    padding: "80px 40px",
    textAlign: "center",
    color: "#fff",
    maxWidth: "800px",
    margin: "0 auto",
  },
  footerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.1)",
    padding: "8px 20px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "30px",
  },
  trophyIcon: {
    fontSize: "16px",
  },
  footerTitle: {
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
    fontWeight: "800",
    marginBottom: "20px",
  },
  footerSubtitle: {
    fontSize: "1.1rem",
    marginBottom: "40px",
    opacity: 0.9,
    maxWidth: "600px",
    margin: "0 auto 40px",
  },
  footerButton: {
    padding: "16px 40px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "50px",
    background: "#fff",
    color: "#667eea",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  footerNote: {
    fontSize: "0.9rem",
    opacity: 0.8,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  checkIcon: {
    fontSize: "12px",
  },
  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "modalFadeIn 0.3s ease-out",
  },
  modalContent: {
    background: "#fff",
    borderRadius: "24px",
    maxWidth: "550px",
    width: "90%",
    maxHeight: "85vh",
    overflow: "auto",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    animation: "modalFadeIn 0.3s ease-out",
  },
  modalHeader: {
    padding: "24px 28px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },
  modalIcon: {
    fontSize: "32px",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
    flex: 1,
  },
  modalClose: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#9ca3af",
    padding: "4px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },
  modalBody: {
    padding: "28px",
  },
  modalDescription: {
    fontSize: "1rem",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  modalSection: {
    marginBottom: "24px",
  },
  modalSubtitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "12px",
  },
  modalList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  modalListItem: {
    padding: "8px 0",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.95rem",
  },
  modalCheck: {
    color: "#10b981",
    fontWeight: "bold",
    fontSize: "18px",
  },
  modalStats: {
    background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  modalStatIcon: {
    fontSize: "24px",
  },
  modalStatText: {
    fontSize: "0.95rem",
    color: "#4f46e5",
    fontWeight: "600",
  },
  modalButton: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};