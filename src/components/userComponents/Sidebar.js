import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button} from "react-bootstrap";
import {  FaUser, FaBriefcase, FaDollarSign, FaCrown, FaGraduationCap, FaHistory, FaCode, FaHome } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { MdBookmarkBorder } from "react-icons/md";
import { RiUserSharedFill } from "react-icons/ri";
import instance from "../../services/endpoint";
import img from "../Sign&Regs/image.png";

const Sidebar = () => {
  const menuItems = [
    { icon: <FaHome size={28} />, path: "/dashboard", isHome: true },
    { icon: <GoGraph size={28} />, path: "/tradingwidget" },
    { icon: <FaHistory size={28} />, path: "/history" },
    { icon: <FaDollarSign size={28} />, path: "/bank" },
    { icon: <FaUser size={28} />, path: "/profile" }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="vh-100 bg-black sidebar-container p-0 d-flex flex-column"
      style={{
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
        paddingTop: "20px",
      }}
    >
      {menuItems.map((item, index) => (
        <Row
          key={index}
          className="sidebar-item align-items-center justify-content-center m-0"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            cursor: "pointer",
            padding: "15px 0",
            // backgroundColor: hoveredIndex === index ? "#e9ecef" : "transparent",
            transition: "background-color 0.3s",
          }}
        >
          <Col className="text-center">
            <span
              style={{
                color: "gold",
                fontSize: "28px",
              }}
            >
              {item.isHome ? (
                <>
                  <Button
                    ref={target}
                    onClick={() => setShow(!show)}
                    style={{
                      border: "none",
                      color: 'gold',
                      background: "transparent",
                      padding: 0,
                    }}
                  >
                    {item.icon}
                  </Button>
                  
                </>
              ) : (
                <Col className="text-center" onClick={() => navigate(item.path)}>{item.icon}</Col>
              )}
            </span>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Sidebar;