import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Pagination, Row, Col, Table } from "react-bootstrap";
import instance from '../../services/endpoint.js';
import { toast } from 'react-toastify';
// import axios from 'axios';

const DepositPage = () => {
  const [depositMode, setDepositMode] = useState("");
  const [amount, setAmount] = useState("");
  const [imageProof, setImageProof] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(depositHistory.length / itemsPerPage);

  const fetchDepositHistory = async () => {
    try {
      const response = await instance.get("/api/v1/deposit")
      // console.log("resp:",response.data)
      setDepositHistory(response.data); // Assuming the API returns an array of deposit objects
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching deposit history:", error);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, []);

  const handleDepositSubmit = async (event) => {
    event.preventDefault();

    if (!depositMode || !amount || !imageProof) {
      toast.info("Please fill all required fields and upload proof.");
      return;
    }

    const formData = new FormData();
    formData.append("deposit_mode", depositMode);
    formData.append("amount", amount);
    formData.append("image_proof", imageProof);

    setIsLoading(true);
    try {
      const response = await instance.post("/api/v1/deposit", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMessage(response.data.message);
      toast.success("Sent deposit request successfully")
      // Reset the form
      setDepositMode("");
      setAmount("");
      setImageProof(null);

      // Refresh deposit history
      fetchDepositHistory();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = depositHistory.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <h4>Deposit Payment</h4>
      <Form onSubmit={handleDepositSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Mode of Payment</Form.Label>
              <Form.Control
                as="select"
                name="depositMode"
                value={depositMode}
                onChange={(event) => setDepositMode(event.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Bank">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="BTC">BTC</option>
                <option value="Netteller">Netteller</option>
                <option value="ETH">ETH</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Enter Deposit Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter Deposit Amount"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Payment Proof</Form.Label>
          <Form.Control
            type="file"
            name="image_proof"
            onChange={(event) => setImageProof(event.target.files[0])}
            accept="image/*"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Form>

      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}

      <Container className="mt-4">
        <h4 className="text-center text-primary">Deposit History</h4>
        <Table striped bordered responsive className="text-center shadow-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th>S.No</th>
              <th>Mode</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((deposit, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{deposit.deposit_mode}</td>
                  <td>₹{deposit.amount.toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${deposit.status === 'Approved'
                          ? 'bg-success'
                          : deposit.status === 'Pending'
                            ? 'bg-warning text-dark'
                            : 'bg-danger'
                        }`}
                    >
                      {deposit.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No deposit history available.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <Pagination.Item
                key={pageIndex}
                active={currentPage === pageIndex + 1}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </Container>
    </Container>
  );
};

export default DepositPage;

// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
// import instance from '../../services/endpoint';

// const DepositPage = () => {
//   const [depositMode, setDepositMode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [imageProof, setImageProof] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDepositSubmit = async (event) => {
//     event.preventDefault();

//     if (!depositMode || !amount || !imageProof) {
//       setMessage("Please fill all required fields and upload proof.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("deposit_mode", depositMode);
//     formData.append("amount", amount);
//     formData.append("image_proof", imageProof);

//     setIsLoading(true);
//     try {
//       const response = await instance.post("/api/v1/deposit", formData, { headers: { 'Content-Type': 'multipart/form-data' }});
//       setMessage(response.data.message);

//       // Reset the form
//       setDepositMode("");
//       setAmount("");
//       setImageProof(null);
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Something went wrong.";
//       setMessage(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <h4>Deposit Payment</h4>
//       <Form onSubmit={handleDepositSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Mode of Payment</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="depositMode"
//                 value={depositMode}
//                 onChange={(event) => setDepositMode(event.target.value)}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option value="Bank">Bank Transfer</option>
//                 <option value="UPI">UPI</option>
//                 <option value="BTC">BTC</option>
//                 <option value="Netteller">Netteller</option>
//                 <option value="ETH">ETH</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Enter Deposit Amount (USD)</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="amount"
//                 value={amount}
//                 onChange={(event) => setAmount(event.target.value)}
//                 placeholder="Enter Deposit Amount"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group className="mb-3">
//           <Form.Label>Payment Proof</Form.Label>
//           <Form.Control
//             type="file"
//             name="image_proof"
//             onChange={(event) => setImageProof(event.target.files[0])}
//             accept="image/*"
//             required
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" disabled={isLoading}>
//           {isLoading ? "Submitting..." : "Submit"}
//         </Button>
//       </Form>

//       {message && (
//         <div className="alert alert-info mt-3" role="alert">
//           {message}
//         </div>
//       )}

//       <Container className="mt-4">
//         <h4 className="text-center">Deposit History</h4>
//         <Table striped bordered hover className="text-center">
//           <thead>
//             <tr>
//               <th>Mode</th>
//               <th>Amount</th>
//               <th>Proof</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Bank Transfer</td>
//               <td>1000</td>
//               <td>Proof</td>
//             </tr>
//           </tbody>
//         </Table>
//       </Container>
//     </Container>
//   );
// };

// export default DepositPage;
