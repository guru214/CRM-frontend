import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../services/endpoint";
import '../../styles/clicktoverify.css';
import { toast } from "react-toastify";

const EmailVerify = () => {
  const { emailVerifyToken } = useParams(); // Get token from URL params
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);

  const handleVerify = async () => {
    if (emailVerifyToken) {
      setIsLoading(true);
      try {
        const response = await instance.post(
          `/api/v1/auth/verifyEmail/${emailVerifyToken}`,
          {},
          { withCredentials: true }
        );
        toast.success("Email Verified Successfully")
        setIsVerified(true);
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
      } catch (err) {
        setError(err.response?.data?.message || "Verification failed. Please try again.");
        toast.error(err.response?.data?.message || "Verification failed. Please try again.");
        setIsLoading(false);
      }
      setHasRequested(true); // Track if the user clicked the button
    }
  };

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
    }
  }, [isVerified, navigate]);

  return  (
    <div className="email-verification-container">
      <div className="email-verification-box">
        <h2 className="email-verification-title">Email Verification</h2>
        {!hasRequested ? (
          <button
            onClick={handleVerify}
            className="email-verification-button"
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5c100")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffd700")}
          >
            Verify Email
          </button>
        ) : (
          <>
            {isLoading && <p className="email-verification-status">Verifying your email, please wait...</p>}
            {isVerified && (
              <p className="email-verification-success">
                Your email has been verified successfully! Redirecting to login...
              </p>
            )}
            {error && <p className="email-verification-error">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
