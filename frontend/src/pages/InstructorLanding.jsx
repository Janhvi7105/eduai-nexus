// InstructorLanding.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function InstructorLanding() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }
      
      button {
        font-family: inherit;
      }
      
      .card-glow:hover {
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
      }
      
      @media (max-width: 768px) {
        .step-connector {
          display: none;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      document.head.removeChild(styleSheet);
      clearInterval(interval);
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Programming Instructor",
      quote: "I've earned over $50,000 in my first year teaching Python. The platform's tools make course creation a breeze!",
      rating: 5,
      initials: "SJ",
      achievement: "Top Instructor 2024"
    },
    {
      name: "Michael Chen",
      role: "Business Coach",
      quote: "The global reach is incredible. My students come from over 30 countries, and the support team is amazing.",
      rating: 5,
      initials: "MC",
      achievement: "10,000+ Students"
    },
    {
      name: "Emma Rodriguez",
      role: "Design Expert",
      quote: "Teaching here changed my life. I quit my 9-5 and now teach full-time, reaching thousands of students.",
      rating: 5,
      initials: "ER",
      achievement: "5-Star Rating"
    }
  ];

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
      
      {/* Floating Background Elements */}
      <div style={styles.floatingBg}>
        <div style={{ ...styles.floatingCircle, top: "10%", left: "5%", animationDelay: "0s" }}></div>
        <div style={{ ...styles.floatingCircle, top: "60%", right: "5%", width: "300px", height: "300px", animationDelay: "2s" }}></div>
        <div style={{ ...styles.floatingCircle, bottom: "20%", left: "15%", width: "150px", height: "150px", animationDelay: "4s" }}></div>
      </div>

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
        
        {/* Animated Particles */}
        <div style={styles.particles}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{ ...styles.particle, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}></div>
          ))}
        </div>
        
        <div style={styles.heroContent} className="fade-in-up">
          <div style={styles.heroBadge}>
            <span style={styles.badgeIcon}>🏆</span>
            #1 Platform for Educators • Trusted by 50,000+ instructors
          </div>
          <h1 style={styles.heroTitle}>
            Transform Your Knowledge <br />
            Into <span style={styles.gradientText}>Global Impact</span> 
            <span style={styles.waveEmoji}>🌍</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Join the revolution in online education. Create, publish, and profit from your expertise.
            Reach millions of students worldwide and build a thriving teaching career.
          </p>
          <div style={styles.heroButtons}>
            <button
              style={styles.ctaBtnPrimary}
              onClick={() => navigate("/teacher-register")}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Start Teaching Today <span style={styles.arrowIcon}>→</span>
            </button>
            <button
              style={styles.ctaBtnSecondary}
              onClick={() => {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Watch Demo 🎥
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
            <div style={styles.statItem}>
              <div style={styles.statNumber}>$100M+</div>
              <div style={styles.statLabel}>Paid to Instructors</div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div id="features" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Why Choose Us</span>
          <h2 style={styles.sectionTitle}>Everything you need to succeed</h2>
          <p style={styles.sectionSubtitle}>
            Powerful tools, global reach, and dedicated support — all in one platform
          </p>
        </div>

        <div style={styles.cards}>
          {[
            {
              icon: "💰",
              title: "Earn Money",
              description: "Earn up to 70% revenue share every time a student enrolls in your course. Get paid monthly via PayPal, Stripe, or bank transfer.",
              gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#667eea"
            },
            {
              icon: "💡",
              title: "Inspire Students",
              description: "Share your knowledge and help students learn new skills. Build a community of learners who look up to you.",
              gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "#f093fb"
            },
            {
              icon: "🌐",
              title: "Global Reach",
              description: "Reach millions of students across 190+ countries. Your classroom is open 24/7, accessible from anywhere.",
              gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "#4facfe"
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={styles.card}
              className="card-glow"
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
      <div style={{...styles.section, background: "linear-gradient(135deg, #667eea05 0%, #764ba205 100%)"}}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Simple Process</span>
          <h2 style={styles.sectionTitle}>Get started in 3 easy steps</h2>
          <p style={styles.sectionSubtitle}>
            From idea to income — your journey to becoming an instructor starts here
          </p>
        </div>

        <div style={styles.stepsContainer}>
          {[
            {
              step: "01",
              title: "Plan Your Course",
              description: "Outline your curriculum, define learning objectives, and structure your content for maximum impact.",
              icon: "📋",
              color: "#667eea",
              tips: "Use our course planning template"
            },
            {
              step: "02",
              title: "Record & Create",
              description: "Create high-quality video lessons using our production guidelines and professional tools.",
              icon: "🎥",
              color: "#f093fb",
              tips: "HD video recommended"
            },
            {
              step: "03",
              title: "Publish & Earn",
              description: "Launch your course, set your price, and start generating revenue from day one.",
              icon: "💰",
              color: "#4facfe",
              tips: "Start earning instantly"
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
              <div style={{...styles.stepTip, color: step.color}}>💡 {step.tips}</div>
              {index < 2 && <div style={styles.stepConnector}>→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL SECTION */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Success Stories</span>
          <h2 style={styles.sectionTitle}>Loved by instructors worldwide</h2>
          <p style={styles.sectionSubtitle}>
            Join thousands of successful educators who transformed their lives
          </p>
        </div>

        <div style={styles.testimonialsContainer}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                ...styles.testimonialCard,
                transform: activeTestimonial === index ? 'translateY(-10px)' : 'translateY(0)',
                boxShadow: activeTestimonial === index ? '0 20px 40px rgba(102, 126, 234, 0.2)' : '0 4px 20px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = activeTestimonial === index ? 'translateY(-10px)' : 'translateY(0)'}
            >
              <div style={styles.testimonialHeader}>
                <div style={styles.testimonialAvatar}>{testimonial.initials}</div>
                <div>
                  <h4 style={styles.testimonialName}>{testimonial.name}</h4>
                  <p style={styles.testimonialRole}>{testimonial.role}</p>
                </div>
                <div style={styles.testimonialBadge}>{testimonial.achievement}</div>
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
        
        <div style={styles.testimonialDots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.testimonialDot,
                background: activeTestimonial === index ? "#667eea" : "#cbd5e1",
                transform: activeTestimonial === index ? "scale(1.2)" : "scale(1)",
              }}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>
      </div>

      {/* PLATFORM BENEFITS */}
      <div style={{...styles.section, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", borderRadius: "0"}}>
        <div style={{...styles.sectionHeader, color: "#fff"}}>
          <span style={{...styles.sectionBadge, background: "rgba(255,255,255,0.2)", color: "#fff"}}>Platform Benefits</span>
          <h2 style={{...styles.sectionTitle, color: "#fff"}}>Why top instructors choose us</h2>
          <p style={{...styles.sectionSubtitle, color: "rgba(255,255,255,0.9)"}}>
            We provide everything you need to build a successful online teaching business
          </p>
        </div>

        <div style={styles.benefitsGrid}>
          {[
            { icon: "🎓", title: "Quality Education", description: "High production standards and quality assurance" },
            { icon: "🤝", title: "Community Support", description: "Connect with fellow instructors worldwide" },
            { icon: "📈", title: "Marketing Tools", description: "Promotional tools to reach more students" },
            { icon: "💬", title: "24/7 Support", description: "Dedicated support team always available" }
          ].map((benefit, index) => (
            <div key={index} style={styles.benefitCard}>
              <div style={styles.benefitIcon}>{benefit.icon}</div>
              <h4 style={styles.benefitTitle}>{benefit.title}</h4>
              <p style={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <div style={styles.footerCta}>
        <div style={styles.footerOverlay}></div>
        <div style={styles.footerContent}>
          <div style={styles.footerBadge}>
            <span style={styles.trophyIcon}>🚀</span>
            Limited Time Offer
          </div>
          <h2 style={styles.footerTitle}>Ready to start your journey?</h2>
          <p style={styles.footerSubtitle}>
            Join 50,000+ instructors already teaching on our platform. 
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
            <span style={styles.checkIcon}>✓</span> Free to join • Cancel anytime • 24/7 support
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
    position: "relative",
  },
  floatingBg: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 0,
    overflow: "hidden",
  },
  floatingCircle: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent)",
    animation: "float 6s ease-in-out infinite",
  },
  particles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  particle: {
    position: "absolute",
    bottom: "-10px",
    width: "4px",
    height: "4px",
    background: "rgba(255,255,255,0.5)",
    borderRadius: "50%",
    animation: "float 3s ease-in-out infinite",
  },
  hero: {
    position: "relative",
    minHeight: "100vh",
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
    background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15), transparent)",
  },
  heroContent: {
    position: "relative",
    maxWidth: "1100px",
    textAlign: "center",
    color: "#fff",
    zIndex: 2,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "10px 24px",
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
    fontSize: "clamp(2rem, 8vw, 4rem)",
    fontWeight: "800",
    marginBottom: "24px",
    lineHeight: "1.2",
  },
  gradientText: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  waveEmoji: {
    display: "inline-block",
    animation: "wave 2s infinite",
    marginLeft: "10px",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 4vw, 1.2rem)",
    marginBottom: "40px",
    opacity: 0.95,
    maxWidth: "750px",
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
    padding: "16px 36px",
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
  ctaBtnSecondary: {
    padding: "16px 36px",
    fontSize: "16px",
    fontWeight: "600",
    border: "2px solid rgba(255,255,255,0.5)",
    borderRadius: "50px",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  arrowIcon: {
    fontSize: "16px",
    transition: "transform 0.3s ease",
  },
  statsContainer: {
    display: "flex",
    gap: "50px",
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
    position: "relative",
    zIndex: 1,
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
    padding: "40px 32px",
    borderRadius: "24px",
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
    padding: "50px 20px 40px",
    background: "#fff",
    borderRadius: "24px",
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
    marginBottom: "12px",
  },
  stepTip: {
    fontSize: "12px",
    fontWeight: "500",
    marginTop: "8px",
  },
  stepConnector: {
    position: "absolute",
    top: "50%",
    right: "-30px",
    transform: "translateY(-50%)",
    fontSize: "28px",
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
    borderRadius: "24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    border: "1px solid #f0f0f0",
  },
  testimonialHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
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
  testimonialBadge: {
    fontSize: "11px",
    padding: "4px 10px",
    background: "#e0e7ff",
    color: "#667eea",
    borderRadius: "20px",
    fontWeight: "600",
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
  testimonialDots: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "40px",
  },
  testimonialDot: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginTop: "40px",
  },
  benefitCard: {
    textAlign: "center",
    padding: "32px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  },
  benefitIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  benefitTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "8px",
  },
  benefitDescription: {
    fontSize: "0.9rem",
    opacity: 0.9,
  },
  footerCta: {
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    margin: "40px 20px 60px",
    borderRadius: "40px",
    overflow: "hidden",
    zIndex: 1,
  },
  footerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15), transparent)",
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
    background: "rgba(255,255,255,0.15)",
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
    opacity: 0.95,
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
    opacity: 0.9,
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
    background: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "modalFadeIn 0.3s ease-out",
  },
  modalContent: {
    background: "#fff",
    borderRadius: "28px",
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
    borderRadius: "14px",
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
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};