import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import jsPDF from "jspdf";

import { toPng } from "html-to-image";

import {
  useParams,
} from "react-router-dom";

import Layout from "../components/common/Layout";

import CertificateTemplate from "../components/certificate/CertificateTemplate";


function Certificate() {

  const { courseId } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [certificate, setCertificate] =
    useState(null);


  // ================= FETCH CERTIFICATE =================
  useEffect(() => {

    const fetchCertificate =
      async () => {

        try {

          const token =
            localStorage.getItem("token");

          const res = await axios.post(
            "/api/certificate/generate",
            { courseId },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          setCertificate(
            res.data.certificate
          );

        } catch (err) {

          console.error(
            "CERTIFICATE ERROR:",
            err
          );

        } finally {

          setLoading(false);
        }
      };

    fetchCertificate();

  }, [courseId]);


  // ================= DOWNLOAD PDF =================
  const downloadPDF = async () => {
    try {
      const node = document.getElementById("certificate");

      if (!node) {
        alert("Certificate not found");
        return;
      }

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const pdf = new jsPDF(
        "landscape",
        "mm",
        "a4"
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save("EduAI-Certificate.pdf");

    } catch (err) {
      console.error(err);
      alert("PDF download failed");
    }
  };


  // ================= SHARE CERTIFICATE =================
  const shareCertificate =
    async () => {

      try {

        if (
          navigator.share
        ) {

          await navigator.share({

            title:
              "My Course Certificate",

            text:
              "🎉 I completed a course on EduAI Nexus!",

            url:
              window.location.href,
          });

        } else {

          alert(
            "Sharing not supported on this device ❌"
          );
        }

      } catch (err) {

        console.error(
          "SHARE ERROR:",
          err
        );
      }
    };


  // ================= LOADING =================
  if (loading) {

    return (

      <Layout>

        <div style={styles.loading}>
          ⏳ Generating Certificate...
        </div>

      </Layout>
    );
  }


  // ================= NO DATA =================
  if (!certificate) {

    return (

      <Layout>

        <div style={styles.loading}>
          ❌ Certificate not found
        </div>

      </Layout>
    );
  }


  return (

    <Layout>

      <div style={styles.page}>


        {/* TITLE */}
        <h1 style={styles.heading}>
          🎉 Congratulations!
        </h1>

        <p style={styles.subtext}>
          Your certificate is ready 🚀
        </p>


        {/* CERTIFICATE */}
        <div style={styles.certificateWrapper}>

          <CertificateTemplate
            certificate={certificate}
          />

        </div>


        {/* BUTTONS */}
        <div style={styles.btnContainer}>


          {/* DOWNLOAD */}
          <button
            style={styles.downloadBtn}
            onClick={downloadPDF}
          >
            📥 Download PDF
          </button>


          {/* SHARE */}
          <button
            style={styles.shareBtn}
            onClick={shareCertificate}
          >
            🔗 Share Certificate
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default Certificate;


// ================= STYLES =================
const styles = {

  page: {

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "30px",

    paddingBottom: "50px",
  },


  heading: {

    fontSize: "52px",

    fontWeight: "800",

    color: "#2563eb",

    marginTop: "20px",
  },


  subtext: {

    fontSize: "22px",

    color: "#94a3b8",

    marginTop: "-10px",
  },


  certificateWrapper: {

    overflowX: "auto",

    width: "100%",
  },


  btnContainer: {

    display: "flex",

    gap: "20px",

    flexWrap: "wrap",

    justifyContent: "center",
  },


  downloadBtn: {

    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "#fff",

    border: "none",

    padding: "16px 28px",

    borderRadius: "14px",

    fontSize: "18px",

    fontWeight: "700",

    cursor: "pointer",

    boxShadow:
      "0 10px 25px rgba(37,99,235,0.3)",
  },


  shareBtn: {

    background:
      "linear-gradient(135deg,#10b981,#059669)",

    color: "#fff",

    border: "none",

    padding: "16px 28px",

    borderRadius: "14px",

    fontSize: "18px",

    fontWeight: "700",

    cursor: "pointer",

    boxShadow:
      "0 10px 25px rgba(16,185,129,0.3)",
  },


  loading: {

    height: "70vh",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "28px",

    fontWeight: "700",
  },
};