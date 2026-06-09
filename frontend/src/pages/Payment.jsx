import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const course = state?.course;
  const name = state?.name || "";
  const email = state?.email || "";
  const phone = state?.phone || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!course) navigate("/courses");
  }, [course, navigate]);

  if (!course) return null;

  const handlePayment = async () => {
    if (!password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Required",
        text: "Please create a password to complete enrollment.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords Do Not Match",
        text: "Please enter matching passwords.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // 1️⃣ CREATE ORDER
      const { data } = await axios.post(
        "/api/payment/create-order",
        {
          amount: course.price,
          courseId: course._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2️⃣ RAZORPAY
      const options = {
        key: "rzp_test_SGJDv8CpSvpMfO",
        amount: data.order.amount,
        currency: "INR",
        name: "EduAI Nexus",
        description: course.title,
        order_id: data.order.id,
        image: "/logo192.png",

        handler: async function (response) {
          try {
            const res = await axios.post(
              "/api/payment/verify-payment",
              {
                courseId: course._id,
                password: password,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (res.data.success) {
              await Swal.fire({
                icon: "success",
                title: "🎉 Enrollment Successful!",
                html: `You have successfully enrolled in <strong>${course.title}</strong><br/>Check your email for confirmation.`,
                confirmButtonColor: "#4f46e5",
                confirmButtonText: "Go to Dashboard",
                allowOutsideClick: false,
              });
              navigate("/my-courses");
            } else {
              Swal.fire({
                icon: "error",
                title: "Enrollment Failed",
                text: res.data.message || "Something went wrong. Please contact support.",
                confirmButtonColor: "#4f46e5",
              });
            }
          } catch (err) {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Enrollment Failed",
              text: err.response?.data?.message || "Payment verification failed.",
              confirmButtonColor: "#4f46e5",
            });
          }
        },

        modal: {
          ondismiss: () => {
            Swal.fire({
              icon: "info",
              title: "Payment Cancelled",
              text: "You cancelled the payment process. You can try again anytime.",
              confirmButtonColor: "#4f46e5",
            });
          },
        },

        prefill: {
          name: fullName,
          email: userEmail,
          contact: userPhone,
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Unable to initialize payment. Please try again.",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Side - Course Details */}
      <div style={styles.leftSide}>
        <div style={styles.logoSection}>
          <span style={styles.logoIcon}>🚀</span>
          <span style={styles.logoText}>EduAI Nexus</span>
        </div>

        <div style={styles.courseBadge}>Enrolling Now</div>
        
        <h1 style={styles.courseTitle}>{course.title}</h1>
        <p style={styles.courseDescription}>{course.description}</p>

        <div style={styles.courseDetails}>
          <div style={styles.detailItem}>
            <span style={styles.detailIcon}>📅</span>
            <div>
              <strong>Start Date</strong>
              <p>15 April 2026</p>
            </div>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailIcon}>⏳</span>
            <div>
              <strong>Duration</strong>
              <p>8 Weeks (Self-paced)</p>
            </div>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailIcon}>📝</span>
            <div>
              <strong>Last Date to Enroll</strong>
              <p>14 April 2026</p>
            </div>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailIcon}>🎯</span>
            <div>
              <strong>Skill Level</strong>
              <p>Beginner → Advanced</p>
            </div>
          </div>
        </div>

        <div style={styles.whatYouGet}>
          <h4>✨ What You'll Get:</h4>
          <ul>
            <li>✓ Lifetime access to course materials</li>
            <li>✓ Certificate of completion</li>
            <li>✓ 24/7 Doubt solving support</li>
            <li>✓ Practice exams & quizzes</li>
            <li>✓ Project-based learning</li>
          </ul>
        </div>

        <div style={styles.limitedBadge}>
          🔥 Limited Seats Available - Enroll Today!
        </div>
      </div>

      {/* Right Side - Payment Form */}
      <div style={styles.rightSide}>
        <div style={styles.paymentCard}>
          <div style={styles.priceSection}>
            <span style={styles.priceLabel}>Total Amount</span>
            <div>
              <span style={styles.currencySymbol}>₹</span>
              <span style={styles.priceAmount}>{course.price}</span>
            </div>
            <span style={styles.priceNote}>Inclusive of all taxes</span>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.formTitle}>Student Information</h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name *</label>
              <input 
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address *</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number *</label>
              <input 
                type="tel"
                placeholder="+91 9876543210"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.passwordSection}>
              <h3 style={styles.formTitle}>Create Account Password</h3>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password *</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button 
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                <span style={styles.passwordHint}>Minimum 6 characters</span>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password *</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button 
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
            </div>

            <div style={styles.paymentMethods}>
              <p style={styles.methodsTitle}>🔒 Secure Payment Options</p>
              <div style={styles.methodsIcons}>
                <span>💳 Credit/Debit Card</span>
                <span>🏦 NetBanking</span>
                <span>📱 UPI</span>
                <span>📱 Wallet</span>
              </div>
            </div>

            <button 
              style={styles.payBtn}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span style={styles.btnLoader}></span>
              ) : (
                <>💳 Pay Now ₹{course.price} →</>
              )}
            </button>

            <p style={styles.secureNote}>
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

// 🎨 Professional Styles
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: "#f0f2f5",
  },

  leftSide: {
    flex: 1,
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    color: "white",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "auto",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "40px",
  },

  logoIcon: {
    fontSize: "32px",
  },

  logoText: {
    fontSize: "24px",
    fontWeight: "700",
  },

  courseBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.2)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    width: "fit-content",
    marginBottom: "24px",
  },

  courseTitle: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "16px",
    lineHeight: "1.2",
  },

  courseDescription: {
    fontSize: "16px",
    lineHeight: "1.6",
    opacity: 0.95,
    marginBottom: "32px",
  },

  courseDetails: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
  },

  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },

  detailIcon: {
    fontSize: "24px",
    minWidth: "40px",
  },

  whatYouGet: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
  },

  limitedBadge: {
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    padding: "14px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "14px",
  },

  rightSide: {
    flex: 1,
    padding: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
  },

  paymentCard: {
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
    width: "100%",
    maxWidth: "500px",
  },

  priceSection: {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    color: "white",
    padding: "30px",
    textAlign: "center",
  },

  priceLabel: {
    fontSize: "14px",
    opacity: 0.8,
    display: "block",
    marginBottom: "8px",
  },

  currencySymbol: {
    fontSize: "24px",
    fontWeight: "600",
    marginRight: "4px",
  },

  priceAmount: {
    fontSize: "48px",
    fontWeight: "800",
  },

  priceNote: {
    fontSize: "12px",
    opacity: 0.7,
    display: "block",
    marginTop: "8px",
  },

  formSection: {
    padding: "30px",
  },

  formTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#1e293b",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#334155",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  passwordWrapper: {
    position: "relative",
  },

  eyeBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: 0,
  },

  passwordHint: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "6px",
    display: "block",
  },

  passwordSection: {
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },

  paymentMethods: {
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "12px",
    margin: "24px 0",
  },

  methodsTitle: {
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "12px",
    color: "#475569",
  },

  methodsIcons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    fontSize: "13px",
    color: "#64748b",
  },

  payBtn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  secureNote: {
    textAlign: "center",
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "16px",
  },

  btnLoader: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  button:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    .payment-container {
      flex-direction: column;
    }
  }
`;
document.head.appendChild(styleSheet);