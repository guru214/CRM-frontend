import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
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

  const fetchDepositHistory = async () => {
    try {
      const response = await instance.get("/api/v1/deposit")
      // console.log("resp:",response.data)
      setDepositHistory(response.data); // Assuming the API returns an array of deposit objects
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
        <h4 className="text-center">Deposit History</h4>
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Mode</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {depositHistory.length > 0 ? (
              depositHistory.map((deposit, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{deposit.deposit_mode}</td>
                  <td>₹{deposit.amount}</td>
                  <td>{deposit.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No deposit history available.</td>
              </tr>
            )}
          </tbody>
        </Table>
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
