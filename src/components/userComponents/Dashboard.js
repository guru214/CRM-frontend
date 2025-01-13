import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
import instance from '../../services/endpoint';
import { useSearchParams } from 'react-router-dom';

const Dashboard = () => {

    // useSelector((state) => state.auth.user);
    // console.log(user);
    // console.log(req.cookies.accessToken);
    const [userData, setuserData] = useState({
        FullName: "",
        AccountID: "",
        amount: "",
    });
    const [totalReturns, setTotalReturns] = useState(null); // State for total returns

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await instance.get('/api/v1/auth/profile');
                // console.log("check", response.data);
                setuserData({
                    FullName: response.data.FullName,
                    AccountID: response.data.AccountID,
                    amount: response.data.amount,
                    KYC_Status: response.data.KYC_Status
                })
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchReturnsData = async () => {
            try {
                const response = await instance.get("/api/v1/getReturns");
                setTotalReturns(response.data.data.totalReturns); // Set total returns
            } catch (error) {
                console.error("Error fetching returns data:", error);
            }
        };

        fetchReturnsData();
    }, []);
    return (
        <Container fluid className="p-4">
            {/* Header Section */}
            <Row className="mb-4">
                <Col md={4} className="text-center">
                    <div className="p-3 border rounded bg-light">
                        {(() => {
                            if (userData.KYC_Status === 'Pending') {
                                return <p className="text-danger fw-bold mb-0">❌ KYC Not Verified</p>;
                            } else if (userData.KYC_Status === 'Approved') {
                                return <p className="text-success fw-bold mb-0">✅ KYC Approved</p>;
                            } else if (userData.KYC_Status === 'Rejected') {
                                return (
                                    <div>
                                        <p className="text-warning fw-bold mb-0">❌ KYC Rejected</p>
                                        <p className="text-muted">Please re-upload a valid document.</p>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                </Col>
                <Col md={4} className="text-center">
                    <div className="p-3 border rounded bg-light">
                        <p><strong>User Account:</strong>  {userData.AccountID}</p>
                        <p><strong>Balance:</strong> ₹{userData.amount.toLocaleString()}</p>
                        <p><strong>Total Returns:</strong> ₹{totalReturns || 0} </p>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>

            {/* Welcome Section */}
            <h3 className="text-center mb-4">Welcome <strong> {userData.FullName}</strong> </h3>

            {/* Copy Trading Section */}
            <Row>
                <Col>
                    <div className="p-3 border rounded bg-light">
                        <h4>Copy Trading</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>RANK</th>
                                    <th>GROWTH</th>
                                    <th>WEEKS</th>
                                    <th>FOLLOWERS</th>
                                    <th>DRAWDOWN</th>
                                    <th>FUND</th>
                                    <th>RISK LEVEL</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SM</td>
                                    <td>6</td>
                                    <td>-1.44</td>
                                    <td>0</td>
                                    <td>6</td>
                                    <td>0</td>
                                    <td>28989.92</td>
                                    <td>1</td>
                                    <td>
                                        <Button variant="primary" size="sm">Follow 👍</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>MuruganFX</td>
                                    <td>4</td>
                                    <td>-58.26</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0.00</td>
                                    <td>1</td>
                                    <td>
                                        <Button variant="primary" size="sm">Follow 👍</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Check</td>
                                    <td>15</td>
                                    <td>5076.04</td>
                                    <td>1</td>
                                    <td>18</td>
                                    <td>0</td>
                                    <td>454798.64</td>
                                    <td>1</td>
                                    <td>
                                        <Button variant="primary" size="sm">Follow 👍</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
