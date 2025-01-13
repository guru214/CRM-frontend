import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../../styles/Header.css';
import { Button } from 'react-bootstrap';
import { FaShareAlt, FaUser, FaBriefcase, FaDollarSign, FaCode, FaHome, FaHistory, FaBars } from "react-icons/fa";
import instance from '../../services/endpoint';
import img from '../Sign&Regs/image.png';
import { GoGraph } from 'react-icons/go';
import { toast } from 'react-toastify';


const Header = ({ page }) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [darkMode, setDarkMode] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // const toggleTheme = () => {
    //     setDarkMode(!darkMode);
    //     document.body.style.backgroundColor = darkMode ? '#f5f5f5' : '#1a1a1a';
    //     document.body.style.color = darkMode ? '#000' : '#fff';
    // };


    const [userData, setUserData] = useState({
        FullName: "",
        AccountID: "",
        amount: "",
    });

    const fetchUserData = async () => {
        try {
            const response = await instance.get("/api/v1/auth/profile");
            setUserData({
                FullName: response.data.FullName,
                AccountID: response.data.AccountID,
                amount: response.data.amount,
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await instance.post("/api/v1/auth/logout");
            toast.success("Logout successful");
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <header className={`header ${darkMode ? 'dark' : 'light'}`}>
                <div className="header-content">
                    <div className="logo" title="Richesse Solutions">
                        <img
                            src={img} // Replace with the path to your logo image
                            alt="Richesse "
                            className="logo-image"
                        />
                        <span className="logo-text">Richesse</span>
                    </div>

                    <div className="actions">
                        {page === 'register' || page === 'login' ? (
                            <div className="time">{currentTime}</div>
                        ) : page === 'dashboard' ? (
                            <div className="profile-menu">
                                <button
                                    className="profile-button"
                                    onClick={() => setShowDropdown(!showDropdown)}

                                >
                                    <FaBars /></button>
                                {showDropdown && (
                                    <div className="dropdown">
                                        <div className="text-center dropdown-main">
                                            <img
                                                src={img}
                                                alt="Richesse Logo"
                                            />
                                            <h5 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                                Hi, {userData.FullName}
                                            </h5>
                                            <div className="align-items-center text-center">
                                                <div className="mb-2 d-flex justify-content-center align-items-center">
                                                    <strong className="me-2">Live Account:</strong>
                                                    <p className="mb-0">{userData.AccountID}</p>
                                                </div>
                                                <div className="mb-3 d-flex justify-content-center align-items-center">
                                                    <strong className="me-2">Balance:</strong>
                                                    <p className="mb-0">₹{userData.amount.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center mb-3">
                                            <div
                                                className="text-center"
                                                style={{ margin: "10px", cursor: "pointer" }}
                                                onClick={() => navigate("/dashboard")}
                                            >
                                                <FaHome size={22} color="#4caf50" />
                                                <p style={{ fontSize: "10px", marginTop: "5px" }}>Dashboard</p>
                                            </div>
                                            <div
                                                className="text-center"
                                                style={{ margin: "10px", cursor: "pointer" }}
                                                onClick={() => navigate("/tradingwidget")}
                                            >
                                                <GoGraph size={22} color="#4caf50" />
                                                <p style={{ fontSize: "10px", marginTop: "5px" }}>Graph</p>
                                            </div>
                                            <div
                                                className="text-center"
                                                style={{ margin: "10px", cursor: "pointer" }}
                                                onClick={() => navigate("/history")}
                                            >
                                                <FaHistory size={22} color="#4caf50" />
                                                <p style={{ fontSize: "10px", marginTop: "5px" }}>History</p>
                                            </div>
                                            <div
                                                className="text-center"
                                                style={{ margin: "10px", cursor: "pointer" }}
                                                onClick={() => navigate("/bank")}
                                            >
                                                <FaDollarSign size={22} color="#4caf50" />
                                                <p style={{ fontSize: "10px", marginTop: "5px" }}>Funds</p>
                                            </div>
                                            <div
                                                className="text-center"
                                                style={{ margin: "10px", cursor: "pointer" }}
                                                onClick={() => navigate("/profile")}
                                            >
                                                <FaUser size={22} color="#2196f3" />
                                                <p style={{ fontSize: "10px", marginTop: "5px" }}>Settings</p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                style={{ fontSize: "13px" }}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : null}

                        <button
                            className="menu-toggle"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </header>
            <Footer darkMode={darkMode} />
        </>
    );
};

export default Header;