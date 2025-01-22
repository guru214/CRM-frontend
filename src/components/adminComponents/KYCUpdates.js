import React, { useState, useEffect } from 'react';
import { updateKYC } from '../../services/apiService';
import instance from '../../services/endpoint';
import { toast } from 'react-toastify';
import { Pagination } from 'react-bootstrap';

const KYCUpdates = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null); // State to manage modal image
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = users.slice(startIndex, startIndex + itemsPerPage);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from both APIs
        const [usersResponse, proofsResponse] = await Promise.all([
          instance.get('/api/v1/auth/getUsersAndAdmins'),
          instance.get('/api/v1/userProof/listProofs'),
        ]);

        // console.log('Users Response:', usersResponse.data);
        // console.log('Proofs Response:', proofsResponse.data);

        const usersData = usersResponse.data || [];
        const proofsData = proofsResponse.data?.proofs || [];

        // Merge data based on AccountID
        const mergedData = usersData.map((user) => {
          const proof = proofsData.find((p) => p.AccountID === user.AccountID);
          return {
            ...user,
            ProofDetails: proof?.DocumentProof || null, // Add proof details if available
            ExtractedDetails: proof?.ExtractedDetails || null, // Add extracted details if available
          };
        });

        setUsers(mergedData); // Set the merged data to state
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching users and proofs.');
      }
    };

    fetchData();
  }, []);


  const handleKYCUpdate = async (accountID, updatedStatus) => {
    if (!updatedStatus) {
      toast.info('Please select a KYC status.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateKYC(accountID, updatedStatus); // Call the updateKYC function
      toast.success('KYC status updated successfully');
    } catch (err) {
      toast.error('Error updating KYC status. Please try again.');
      // console.error('Error updating KYC:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e, accountID) => {
    const updatedUsers = users.map((user) => {
      if (user.AccountID === accountID) {
        return { ...user, KYC_Status: e.target.value }; // Update KYC status for this user
      }
      return user;
    });
    setUsers(updatedUsers); // Update the users state with the new KYC status
  };


  const openModal = (image) => {
    setModalImage(image); // Set the image source for the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalImage(null); // Clear the image source
  };

  return (
    <div>
      <h2>User List and KYC Updates</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>KYC Status</th>
            <th>Proof Details</th>
            <th>Extracted Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.AccountID}>
              <td>{user.AccountID}</td>
              <td>{user.Email}</td>
              <td>{user.Role}</td>
              <td>{user.KYC_Status || 'Not Updated'}</td>
              <td>
                {user.ProofDetails ? (
                  <img
                    src={`data:image/jpeg;base64,${user.ProofDetails}`}
                    alt="Proof"
                    className="zoom-image" // Add class for zoom effect
                    style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
                    onClick={() => openModal(user.ProofDetails)} // Open modal on click
                  />
                ) : (
                  'No Proof Uploaded'
                )}
              </td>
              <td>
                {user.ExtractedDetails ? (
                  <pre>{JSON.stringify(user.ExtractedDetails, null, 2)}</pre>
                ) : (
                  'No Extracted Details'
                )}
              </td>
              <td>
                <select
                  value={user.KYC_Status || ''}
                  onChange={(e) => handleStatusChange(e, user.AccountID)}
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button
                  onClick={() => handleKYCUpdate(user.AccountID, user.KYC_Status)}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update KYC'}
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

export default KYCUpdates;
