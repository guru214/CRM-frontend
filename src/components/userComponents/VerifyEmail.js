import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import instance from '../../services/endpoint';
import "../../styles/emailverify.css";

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await instance.post('/api/v1/auth/sendVerificationLink');
      toast.success('Verification link sent to your email!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send verification link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='ver-box'>
    <div className="verification-container">
      <h1 className="verification-title">Why is Email Verification Necessary?</h1>
      <p className="verification-description">
        To ensure the security and integrity of our services, email verification is a critical step. By verifying your email address, we can:
      </p>
      <ul className="verification-list">
        <li>
          <strong>Confirm Your Identity</strong>: This helps us make sure that you are who you say you are, protecting your account from unauthorized access.
        </li>
        <li>
          <strong>Enhance Security</strong>: Verified email addresses reduce the risk of spam, phishing, and fraudulent activity, keeping your information safe.
        </li>
        <li>
          <strong>Ensure Effective Communication</strong>: By verifying your email, we can keep you informed about important updates, notifications, and any changes to our services.
        </li>
        <li>
          <strong>Improve Account Recovery</strong>: In case you forget your password or need to recover your account, a verified email ensures that we can help you swiftly and securely.
        </li>
      </ul>
      <form onSubmit={handleSubmit} className="verification-form">
        <button type="submit" className="verification-button" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Verification Link"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default VerifyEmail;
