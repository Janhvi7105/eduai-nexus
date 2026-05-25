import React from 'react';

function CertificateTemplate({ certificate }) {
  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Default certificate data if not provided
  const certData = {
    studentName: certificate?.studentName || "New User",
    courseName: certificate?.courseName || "Asymptotic Notation",
    completionDate: certificate?.completionDate || "May 22, 2026",
    certificateId: certificate?.certificateId || "CEFT-1779473368798",
    instructorName: certificate?.instructorName || "Prof. Rahul Sharma",
    grade: certificate?.grade || "A+ (Distinction)",
    description: certificate?.description || "with dedication and outstanding performance, demonstrating proficiency in all required competencies and meeting the standards of excellence set forth by the institution."
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.certificate}>
        {/* Decorative Borders */}
        <div style={styles.outerBorder}></div>
        <div style={styles.innerBorder}></div>
        <div style={styles.goldBandTop}></div>
        <div style={styles.goldBandBottom}></div>
        
        {/* Corner ornaments */}
        <div style={{...styles.corner, ...styles.cornerTl}}></div>
        <div style={{...styles.corner, ...styles.cornerTr}}></div>
        <div style={{...styles.corner, ...styles.cornerBl}}></div>
        <div style={{...styles.corner, ...styles.cornerBr}}></div>

        {/* Official Seal */}
        <div style={styles.seal}>
          <div style={styles.sealContent}>
            <span>🏅</span>
            CERTIFIED
            <span>★</span>
          </div>
        </div>

        {/* Logo / Institution */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🎓</div>
          <div style={styles.institutionName}>EDUAI NEXUS</div>
          <div style={styles.institutionTagline}>CENTER FOR ADVANCED LEARNING</div>
        </div>

        {/* Title Block */}
        <div style={styles.titleSection}>
          <div style={styles.mainTitle}>CERTIFICATE</div>
          <div style={styles.subtitle}>OF COMPLETION</div>
        </div>

        {/* Elegant Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <div style={styles.dividerStar}>✦</div>
          <div style={styles.dividerLine}></div>
        </div>

        {/* Body Content */}
        <div style={styles.bodyText}>This is to certify that</div>
        
        <div style={styles.nameWrapper}>
          <div style={styles.studentName}>{certData.studentName}</div>
        </div>

        <div style={styles.bodyText}>has successfully completed</div>
        
        <div style={styles.courseName}>{certData.courseName}</div>

        <div style={styles.description}>
          {certData.description}
        </div>

        {/* Grade Section */}
        <div style={styles.gradeSection}>
          <span style={styles.gradeBadge}>🎖️ FINAL GRADE: {certData.grade}</span>
        </div>

        {/* Footer Area */}
        <div style={styles.footerArea}>
          <div style={styles.footerLeft}>
            <div style={styles.signatureLine}></div>
            <div style={styles.signatureName}>{certData.instructorName}</div>
            <div style={styles.signatureTitle}>INSTRUCTOR & PROGRAM DIRECTOR</div>
          </div>
          <div style={styles.footerCenter}>
            <div style={styles.verificationStamp}>✓ VERIFIED ✓</div>
            <div style={styles.sealText}>OFFICIAL SEAL</div>
          </div>
          <div style={styles.footerRight}>
            <div style={styles.dateText}>{formatDate(certData.completionDate)}</div>
            <div style={styles.signatureTitle}>COMPLETION DATE</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <div style={styles.certificateId}>
            Certificate ID: <span>{certData.certificateId}</span>
          </div>
          <div style={styles.verifyLink}>
            🔍 Verify at: eduainexus.com/verify
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#e2e8f0',
    minHeight: '100vh'
  },
  
  certificate: {
    position: 'relative',
    width: '1100px',
    background: '#ffffff',
    padding: '48px 56px 40px 56px',
    borderRadius: '4px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    fontFamily: "'Georgia', 'Times New Roman', 'Poppins', serif"
  },

  outerBorder: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    bottom: '20px',
    border: '1px solid #d4af37',
    pointerEvents: 'none',
    zIndex: 2
  },

  innerBorder: {
    position: 'absolute',
    top: '28px',
    left: '28px',
    right: '28px',
    bottom: '28px',
    border: '2px solid #e2c28b',
    pointerEvents: 'none',
    zIndex: 2
  },

  goldBandTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '12px',
    background: 'linear-gradient(90deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
    zIndex: 1
  },

  goldBandBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '12px',
    background: 'linear-gradient(90deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
    zIndex: 1
  },

  corner: {
    position: 'absolute',
    width: '45px',
    height: '45px',
    zIndex: 3
  },

  cornerTl: {
    top: '18px',
    left: '18px',
    borderTop: '3px solid #d4af37',
    borderLeft: '3px solid #d4af37'
  },

  cornerTr: {
    top: '18px',
    right: '18px',
    borderTop: '3px solid #d4af37',
    borderRight: '3px solid #d4af37'
  },

  cornerBl: {
    bottom: '18px',
    left: '18px',
    borderBottom: '3px solid #d4af37',
    borderLeft: '3px solid #d4af37'
  },

  cornerBr: {
    bottom: '18px',
    right: '18px',
    borderBottom: '3px solid #d4af37',
    borderRight: '3px solid #d4af37'
  },

  seal: {
    position: 'absolute',
    top: '70px',
    right: '70px',
    width: '95px',
    height: '95px',
    borderRadius: '50%',
    border: '2px solid #d4af37',
    background: 'rgba(212, 175, 55, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },

  sealContent: {
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#b8860b',
    lineHeight: '1.4'
  },

  logoSection: {
    textAlign: 'center',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 5
  },

  logoIcon: {
    fontSize: '44px',
    marginBottom: '6px'
  },

  institutionName: {
    fontSize: '26px',
    fontWeight: 700,
    letterSpacing: '5px',
    color: '#1a3c34',
    fontFamily: "'Poppins', sans-serif"
  },

  institutionTagline: {
    fontSize: '11px',
    letterSpacing: '3px',
    color: '#8b7355',
    textTransform: 'uppercase',
    marginTop: '4px'
  },

  titleSection: {
    textAlign: 'center',
    margin: '20px 0 10px',
    position: 'relative',
    zIndex: 5
  },

  mainTitle: {
    fontSize: '62px',
    fontWeight: 800,
    letterSpacing: '12px',
    color: '#1a3c34',
    fontFamily: "'Poppins', sans-serif",
    marginBottom: '6px'
  },

  subtitle: {
    fontSize: '28px',
    letterSpacing: '8px',
    color: '#d4af37',
    fontWeight: 500,
    marginBottom: '20px'
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '18px',
    marginBottom: '32px'
  },

  dividerLine: {
    width: '120px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #d4af37, transparent)'
  },

  dividerStar: {
    color: '#d4af37',
    fontSize: '18px'
  },

  bodyText: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#2c3e2f',
    fontFamily: "'Georgia', serif",
    marginBottom: '18px'
  },

  nameWrapper: {
    textAlign: 'center',
    margin: '10px 0'
  },

  studentName: {
    fontSize: '52px',
    fontWeight: 700,
    color: '#1a3c34',
    fontFamily: "'Poppins', sans-serif",
    margin: '12px 0',
    paddingBottom: '8px',
    borderBottom: '2px dotted #d4af37',
    display: 'inline-block',
    letterSpacing: '2px'
  },

  courseName: {
    textAlign: 'center',
    fontSize: '38px',
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
    margin: '20px 0 12px',
    background: 'linear-gradient(135deg, #1a3c34, #b8860b)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: '#1a3c34'
  },

  description: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#4a5b4c',
    lineHeight: '1.6',
    maxWidth: '85%',
    margin: '20px auto',
    fontStyle: 'italic'
  },

  gradeSection: {
    textAlign: 'center',
    margin: '12px 0'
  },

  gradeBadge: {
    background: '#fef5e7',
    display: 'inline-block',
    padding: '5px 20px',
    borderRadius: '30px',
    color: '#b8860b',
    fontWeight: 600,
    fontSize: '18px'
  },

  footerArea: {
    marginTop: '48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '1px solid #e2d5c0',
    paddingTop: '32px',
    position: 'relative',
    zIndex: 5
  },

  footerLeft: {
    textAlign: 'center',
    flex: 1
  },

  footerCenter: {
    textAlign: 'center',
    flex: 1
  },

  footerRight: {
    textAlign: 'center',
    flex: 1
  },

  signatureLine: {
    width: '220px',
    height: '2px',
    background: '#1a3c34',
    margin: '0 auto 8px auto'
  },

  signatureName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1a3c34',
    marginBottom: '6px'
  },

  signatureTitle: {
    fontSize: '12px',
    color: '#7a6a4b',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },

  verificationStamp: {
    background: '#faf6ed',
    border: '1.5px solid #d4af37',
    borderRadius: '30px',
    padding: '8px 24px',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#b8860b'
  },

  sealText: {
    marginTop: '12px',
    fontSize: '11px',
    color: '#b8860b'
  },

  dateText: {
    fontSize: '20px',
    fontWeight: 500,
    color: '#1a3c34',
    marginBottom: '6px'
  },

  bottomBar: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '18px',
    borderTop: '1px solid #f0ebe0',
    fontSize: '12px',
    color: '#8b8b6f',
    position: 'relative',
    zIndex: 5
  },

  certificateId: {
    fontFamily: 'monospace',
    fontSize: '12px',
    letterSpacing: '0.5px',
    color: '#8b8b6f'
  },

  verifyLink: {
    fontSize: '11px',
    letterSpacing: '1px',
    color: '#8b8b6f'
  }
};

export default CertificateTemplate;