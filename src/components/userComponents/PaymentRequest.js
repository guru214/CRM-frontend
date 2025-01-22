import React, { useEffect, useState } from "react";
import { Container, Row, Col, Pagination, Form, Button, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../services/endpoint";

const PaymentRequest = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank");
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleRequestPayment = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Please enter a valid withdrawal amount");
      return;
    }

    const payload = {
      withdraw_mode: paymentMethod,
      amount: withdrawAmount,
      status: "Pending",
    };

    try {
      const response = await instance.post("/api/v1/withdraw", payload);
      toast.success("Payment requested successfully");
      setWithdrawAmount("");
      fetchWithdrawHistory(); // Refresh withdraw history after successful request
    } catch (error) {
      toast.error("Payment request failed");
      console.error("Payment request failed:", error.response?.data || error.message);
    }
  };

  const fetchWithdrawHistory = async () => {
    try {
      const response = await instance.get("/api/v1/withdraw");
      setWithdrawHistory(response.data);
    } catch (error) {
      toast.error("Failed to fetch withdraw history");
      console.error("Failed to fetch withdraw history:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchWithdrawHistory();
  }, []);

  // Pagination logic
  const paginatedHistory = withdrawHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(withdrawHistory.length / itemsPerPage);

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
              {paginatedHistory.length > 0 ? (
                paginatedHistory.map((withdraw, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>₹{withdraw.amount}</td>
                    <td>{withdraw.withdraw_mode}</td>
                    <td>
                      <span
                        className={`badge ${withdraw.status === 'Approved'
                          ? 'bg-success'
                          : withdraw.status === 'Pending'
                            ? 'bg-warning text-dark'
                            : 'bg-danger'
                          }`}
                      >
                        {withdraw.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No payout history available.</td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <Pagination.Item
                    key={pageIndex}
                    active={currentPage === pageIndex + 1}
                    onClick={() => setCurrentPage(pageIndex + 1)}
                  >
                    {pageIndex + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentRequest;
