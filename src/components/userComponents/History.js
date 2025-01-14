import React, { useState, useEffect } from 'react';
import { Container, Button, Dropdown, DropdownButton, Tab, Tabs, Table } from 'react-bootstrap';
import { AiOutlineBook } from 'react-icons/ai'; // React icon for notebook
import instance from '../../services/endpoint'; // Assuming this is where your instance is imported

const OrderHistoryPage = () => {
  const [depositHistory, setDepositHistory] = useState([]);
  const [returnsData, setReturnsData] = useState([]);
  const [totalReturns, setTotalReturns] = useState(null); // State for total returns
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [loadingDeposits, setLoadingDeposits] = useState(false);
  const [loadingReturns, setLoadingReturns] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null); // State to manage modal image
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchDepositHistory = async () => {
      setLoadingDeposits(true);
      try {
        const response = await instance.get("/api/v1/deposit/getApprovedDepositRequests");
        setDepositHistory(response.data.deposits);
        setTotalInvestment(response.data.Investment);
      } catch (error) {
        console.error("Error fetching deposit history:", error);
        setError("Error fetching deposit history");
      } finally {
        setLoadingDeposits(false);
      }
    };

    const fetchReturnsData = async () => {
      setLoadingReturns(true);
      try {
        const response = await instance.get("/api/v1/getReturns");
        console.log(response.data.data)
        setReturnsData(response.data.data.returns);
        setTotalReturns(response.data.data.totalReturns); // Set total returns
      } catch (error) {
        // console.error("Error fetching returns data:", error);
        setError("Error fetching returns data");
      } finally {
        setLoadingReturns(false);
      }
    };

    fetchDepositHistory();
    fetchReturnsData();
  }, []);

  const openModal = (image) => {
    setModalImage(image); // Set the image source for the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalImage(null); // Clear the image source
  };

  
// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

// Add zoom effect styles
const zoomImageStyle = {
  transition: 'transform 0.3s ease', // Smooth zoom transition
};

  return (
    <Container fluid className="mt-4">
      <Tabs defaultActiveKey="investments" id="order-history-tabs">
        {/* Investments Tab */}
        <Tab eventKey="investments" title="Investments">
          {loadingDeposits ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
              <AiOutlineBook style={{ width: '80px', height: '80px', marginBottom: '20px', color: '#d3d3d3' }} />
              <p className="text-muted">Loading deposit history...</p>
            </div>
          ) : depositHistory.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '60vh' }}>
              <AiOutlineBook style={{ width: '80px', height: '80px', marginBottom: '20px', color: '#d3d3d3' }} />
              <p className="text-muted" style={{ marginBottom: '10px' }}>No deposits found.</p>
              <Button variant="primary">Get started</Button>
            </div>
          ) : (
           <div> <h5 className='mt-5' ><strong>Total Investment:</strong> ₹{totalInvestment.toLocaleString()}</h5>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Deposit Mode</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Proof</th>
                </tr>
              </thead>
              <tbody>
                {depositHistory.map((deposit, index) => (
                  <tr key={index}>
                    <td>{deposit.deposit_mode}</td>
                    <td>₹{deposit.amount.toLocaleString()}</td>
                    <td>{deposit.status}</td>
                    <td>
                      <img src={`data:image/png;base64,${deposit.image_proof}`} alt="proof" width="50" height="50" onClick={() => openModal(deposit.image_proof)}  />
                    </td>
                  </tr>
                ))}
              </tbody>
               {/* Modal for displaying the image */}
       {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <button style={modalStyles.closeButton} onClick={closeModal}>x</button>
            <img
              src={`data:image/jpeg;base64,${modalImage}`}
              alt="Modal Image"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}
            </Table>
            </div>
          )}
        </Tab>

        {/* Returns Tab */}
        <Tab eventKey="returns" title="Returns">
          {loadingReturns ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
              <AiOutlineBook style={{ width: '80px', height: '80px', marginBottom: '20px', color: '#d3d3d3' }} />
              <p className="text-muted">Loading returns data...</p>
            </div>
          ) : returnsData.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '60vh' }}>
              <AiOutlineBook style={{ width: '80px', height: '80px', marginBottom: '20px', color: '#d3d3d3' }} />
              <p className="text-muted" style={{ marginBottom: '10px' }}>No returns found.</p>
              <Button variant="primary">Get started</Button>
            </div>
          ) : (
            <>
              {/* Display Total Returns */}
              {totalReturns !== null && (
                <div className="mt-3">
                  <h3><strong>Total Returns:</strong> <strong>₹{totalReturns}</strong></h3>
                </div>
              )}

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Return Amount</th>
                    <th>Return Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {returnsData.map((returnData, index) => (
                    <tr key={index}>
                      <td>{new Date(returnData.date).toLocaleDateString()}</td>
                      <td>₹{returnData.returnAmount}</td>
                      <td>{returnData.returnPercentage.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default OrderHistoryPage;
