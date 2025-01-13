import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Forbidden</h1>
      <p style={styles.message}>You do not have permission to access this page.</p>
      <button style={styles.button} onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '48px',
    color: '#ff4d4f',
  },
  message: {
    fontSize: '20px',
    color: '#333',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Unauthorized;
