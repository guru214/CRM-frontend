import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../services/endpoint";

const PaymentRequest = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank");
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleRequestPayment = async () => {
    const payload = {
      withdraw_mode: paymentMethod,
      amount: withdrawAmount,
      status: "Pending", // Set default status to Pending
    };

    console.log("Request payment payload", payload);

    try {
      const response = await instance.post(
        "/api/v1/withdraw",
        payload,
      );

      toast.success("Payment Requested Successfully");
      console.log("Payment Requested Successfully", response);
      fetchWithdrawHistory(); // Refresh withdraw history after successful request
    } catch (error) {
      toast.error("Payment Request Failed");
      console.error("Payment Request Failed", error.response?.data || error.message);
    }
  };

  const fetchWithdrawHistory = async () => {
    try {
      const response = await instance.get(
        "/api/v1/withdraw",
      );
      setWithdrawHistory(response.data);
      setShowHistory(true);
      console.log("Withdraw History Fetched Successfully", response.data);
    } catch (error) {
      toast.error("Failed to fetch withdraw history");
      console.error("Failed to fetch withdraw history", error.response?.data || error.message);
    }
  };

  return (
    <Container className="mt-4">
      <ToastContainer autoClose={3000} />
      <Row className="justify-content-center">
        <Col md={6}>
          <h5 className="text-center">Request Payment</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mode of Payment</Form.Label>
              <Form.Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Bank">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="BTC">BTC Withdrawals</option>
                <option value="ETH">ETH Withdrawals</option>
                <option value="Neteller">Neteller Withdrawals</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Withdraw Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Withdrawal Amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" onClick={handleRequestPayment}>
                Request Payment
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="info" onClick={fetchWithdrawHistory}>
            Show Withdraw History
          </Button>
        </Col>
      </Row>

      {showHistory && (
        <Row className="mt-5">
          <Col>
            <h5 className="text-center">Payout History</h5>
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawHistory.map((withdraw, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>₹{withdraw.amount}</td>
                    <td>{withdraw.withdraw_mode}</td>
                    <td>{withdraw.status}</td> {/* Default to Pending if status is not provided */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default PaymentRequest;
