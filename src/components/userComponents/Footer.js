import React from 'react';
import '../../styles/Footer.css';



const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer bg-black py-2`}>
      <div className="container text-center">
        <p className="mb-0 text-white">© 2025 Richesse Solutions. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;