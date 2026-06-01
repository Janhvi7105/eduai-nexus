import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ Step A: Extract all user details from state
  const course = state?.course;
  const name = state?.name || "";
  const email = state?.email || "";
  const phone = state?.phone || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Step B: Initialize form fields with received data
  const [fullName, setFullName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone);

  const token = localStorage.getItem("token");

  // ✅ Step 2: Check if token exists
  console.log("TOKEN:", token);

  // ✅ Redirect if no course
  useEffect(() => {
    if (!course) navigate("/courses");
  }, [course, navigate]);

  if (!course) return null;

  const handlePayment = async () => {
    try {
      // ✅ VALIDATION
      if (!password || !confirmPassword) {
        Swal.fire({
          icon: "warning",
          title: "Password Required",
          text: "Please enter password.",
        });
        return;
      }

      if (password !== confirmPassword) {
        Swal.fire({
          icon: "warning",
          title: "Passwords Do Not Match",
          text: "Please enter matching passwords.",
        });
        return;
      }

      // ==========================
      // 1️⃣ CREATE ORDER
      // ==========================
      const { data } = await axios.post(
        "/api/payment/create-order",
        {
          amount: course.price,
          courseId: course._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ==========================
      // 2️⃣ RAZORPAY
      // ==========================
      const options = {
        key: "rzp_test_SGJDv8CpSvpMfO",
        amount: data.order.amount,
        currency: "INR",
        name: "EduAI Nexus",
        description: course.title,
        order_id: data.order.id,

        handler: async function () {
          try {
            // ==========================
            // 3️⃣ VERIFY PAYMENT
            // ==========================
            const res = await axios.post(
              "/api/payment/verify-payment",
              {
                courseId: course._id,
                password: password, // 🔥 important
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // ✅ Step 1: Add debug log for verify payment response
            console.log("VERIFY PAYMENT RESPONSE:", res.data);

            if (res.data.success) {
              await Swal.fire({
                icon: "success",
                title: "Enrollment Successful 🎉",
                text: "You have successfully enrolled in the course.",
                confirmButtonText: "Go To Dashboard",
                allowOutsideClick: false,
              });
              navigate("/student-dashboard");
            } else {
              // Log if success is false
              console.log("SUCCESS IS FALSE:", res.data);
              Swal.fire({
                icon: "error",
                title: "Enrollment Failed ❌",
                text: res.data.message || "Something went wrong.",
              });
            }
          } catch (err) {
            console.error("VERIFY PAYMENT ERROR:", err);
            console.error("ERROR RESPONSE DATA:", err.response?.data);
            Swal.fire({
              icon: "error",
              title: "Enrollment Failed ❌",
              text: err.response?.data?.message || "Something went wrong while enrolling.",
            });
          }
        },

        modal: {
          ondismiss: () => {
            Swal.fire({
              icon: "warning",
              title: "Payment Cancelled",
              text: "You cancelled the payment process.",
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
      console.error("PAYMENT INIT ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed ❌",
        text: "Unable to process payment.",
      });
    }
  };

  return (
    <div style={styles.container}>
      
      {/* LEFT */}
      <div style={styles.left}>
        <h2>🚀 EduAI Nexus</h2>
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div style={styles.details}>
          <p>📅 Start: 15 April 2026</p>
          <p>⏳ Duration: 8 Weeks</p>
          <p>📝 Last Date: 14 April 2026</p>
          <p>🎯 Level: Beginner → Advanced</p>
        </div>

        <div style={styles.badge}>
          🔥 Limited Seats Available
        </div>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <h3>Payment</h3>

        <h2>₹ {course.price}</h2>

        {/* ✅ Step C: Name input with fullName state */}
        <input 
          placeholder="Full Name" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={styles.input} 
        />

        {/* ✅ Email input with userEmail state */}
        <input
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          style={styles.input}
        />

        {/* ✅ Phone input with userPhone state */}
        <input 
          placeholder="Phone" 
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          style={styles.input} 
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.btn} onClick={handlePayment}>
          Pay Now →
        </button>
      </div>
    </div>
  );
}

export default Payment;

// 🎨 STYLES (YOUR ORIGINAL UI)
const styles = {
  container: { display: "flex", minHeight: "100vh" },

  left: {
    flex: 1,
    background: "#4f46e5",
    color: "white",
    padding: "40px",
  },

  right: {
    flex: 1,
    padding: "40px",
    background: "#f3f4f6",
  },

  details: {
    marginTop: "20px",
    lineHeight: "1.8",
  },

  badge: {
    marginTop: "20px",
    background: "orange",
    padding: "10px",
    borderRadius: "6px",
  },

  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
  },

  btn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "16px",
  },
};