 import React, { useState, useEffect } from 'react';
import { changeDepositStatus } from '../../services/apiService';
import { Pagination } from 'react-bootstrap';
import instance from '../../services/endpoint';
import { toast } from 'react-toastify';

const DepositRequests = () => {
  const [depositRequests, setDepositRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null); // State to manage modal image
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(depositRequests.length / itemsPerPage);

  useEffect(() => {
    const fetchDepositRequests = async () => {
      try {
        const response = await instance.get('/api/v1/deposit/getalldepositReq');
        setDepositRequests(response.data.depositRequests);
      } catch (err) {
        setError('Error fetching deposit requests');
        console.error(err);
      }
    };
    fetchDepositRequests();
  }, []);

  const handleDepositStatusChange = async (accountID, id, updatedStatus) => {
    if (!updatedStatus) {
      toast.info('Please select a status');
      return;
    }
    setLoading(true);
    try {
      await changeDepositStatus(accountID, id, updatedStatus);
      toast.success('Deposit status updated successfully');
    } catch (err) {
      toast.error('Error updating deposit status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, value) => {
    setDepositRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id ? { ...request, status: value } : request
      )
    );
  };

  const openModal = (image) => {
    setModalImage(image); // Set the image source for the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalImage(null); // Clear the image source
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = depositRequests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2>Deposit Requests</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Deposit Mode</th>
            <th>Image Proof</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((request) => (
            <tr key={request._id}>
              <td>{request.AccountID}</td>
              <td>{request.deposit_mode}</td>
              <td>
                {request.image_proof ? (
                  <img
                    src={`data:image/jpeg;base64,${request.image_proof}`}
                    alt="Deposit Proof"
                    className="zoom-image" // Add class for zoom effect
                    style={{ ...zoomImageStyle, maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }} // Apply zoom effect styles
                    onClick={() => openModal(request.image_proof)} // Open modal on click
                  />
                ) : (
                  'No Proof Uploaded'
                )}
              </td>
              <td>₹{request.amount}</td>
              <td>{request.status}</td>
              <td>
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(request._id, e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
                <button
                  onClick={() =>
                    handleDepositStatusChange(request.AccountID, request._id, request.status)
                  }
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Status'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
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

export default DepositRequests;
