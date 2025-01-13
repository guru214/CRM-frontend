import React, { useState, useEffect } from 'react';
import { changeWithdrawStatus } from '../../services/apiService';
import instance from '../../services/endpoint';
import { Card } from 'react-bootstrap'; // Importing Card component from react-bootstrap for styling
import { toast } from 'react-toastify';

const WithdrawRequests = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statuses, setStatuses] = useState({}); // Store individual statuses
  const [users, setUsers] = useState([]);
  const [withdrawDetails, setWithdrawDetails] = useState([]); // Store withdraw details

  useEffect(() => {
    const getUsersAndReturns = async () => {
      try {
        const response = await instance.get('/api/v1/auth/getUsersAndAdmins');
        setUsers(response.data); // Assuming response.data contains user information
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Failed to fetch users');
      }
    };

    getUsersAndReturns();
  }, []);

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const response = await instance.get('/api/v1/withdraw/getallWithdrawalReq');
        setWithdrawRequests(response.data.withdrawRequests);
        // Initialize statuses with the current status of each request
        const initialStatuses = response.data.withdrawRequests.reduce((acc, request) => {
          acc[request._id] = request.status || '';
          return acc;
        }, {});
        setStatuses(initialStatuses);
      } catch (err) {
        setError('Error fetching withdrawal requests');
        console.error(err);
      }
    };
    fetchWithdrawRequests();
  }, []);

  // Fetch withdrawal details
  useEffect(() => {
    const fetchWithdrawDetails = async () => {
      try {
        const response = await instance.get('/api/v1/withdraw/listAllWithdrawModes');
        setWithdrawDetails(response.data.WithdrawData); // Store withdrawal details
      } catch (err) {
        setError('Error fetching withdrawal details');
        console.error(err);
      }
    };
    fetchWithdrawDetails();
  }, []);

  const handleWithdrawStatusChange = async (accountID, id, updatedStatus) => {
    if (!updatedStatus) {
      toast.info('Please select a status');
      return;
    }
    setLoading(true);
    try {
      await changeWithdrawStatus(accountID, id, updatedStatus);
      toast.success('Withdrawal status updated successfully');
      setStatuses((prev) => ({ ...prev, [id]: updatedStatus })); // Update the status locally
    } catch (err) {
      toast.error('Error updating withdrawal status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to find the user's balance by AccountID
  const getUserBalance = (accountID) => {
    const user = users.find(user => user.AccountID === accountID);
    return user ? `₹${user.amount}` : 'N/A'; // Return the user's balance or 'N/A' if not found
  };

  // Function to get withdrawal details for each request
  const getWithdrawDetails = (accountID) => {
    const details = withdrawDetails.find(detail => detail.AccountID === accountID);
    if (!details) return 'No details available'; // If no details found, return a message

    // Destructure the decryptedData for cleaner rendering
    const { account_holder_name, account_number, ifsc_code, bic_swift_code, branch, upi_address, btc_withdraw_address, bank_account_currency, eth_withdraw_address, netteller_address} = details.decryptedData;

    return (
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Text>
            <strong>Account Holder:</strong> {account_holder_name || 'N/A'}<br />
            <strong>Account Number:</strong> {account_number || 'N/A'}<br />
            <strong>IFSC Code:</strong> {ifsc_code || 'N/A'}<br />
            <strong>BIC/SWIFT Code:</strong> {bic_swift_code || 'N/A'}<br />
            <strong>Branch:</strong> {branch || 'N/A'}<br />
            <strong>Bank Currency:</strong> { bank_account_currency || 'N/A'}<br />
            <strong>ETH Address:</strong> {eth_withdraw_address || 'N/A'}<br />
            <strong>UPI Address:</strong> {upi_address || 'N/A'}<br />
            <strong>BTC Address:</strong> {btc_withdraw_address || 'N/A'}<br />
            <strong>Netteller Address:</strong> {netteller_address  || 'N/A'}<br />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <h2>Withdraw Requests</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Withdraw Mode</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Balance</th> {/* Add Balance column */}
            <th>Withdrawal Details</th> {/* Add Withdrawal Details column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.AccountID}</td>
              <td>{request.withdraw_mode}</td>
              <td>₹{request.amount}</td>
              <td>{request.status}</td>
              <td>{getUserBalance(request.AccountID)}</td> {/* Display user's balance */}
              <td>{getWithdrawDetails(request.AccountID)}</td> {/* Display withdrawal details */}
              <td>
                <select
                  value={statuses[request._id] || ''}
                  onChange={(e) =>
                    setStatuses((prev) => ({
                      ...prev,
                      [request._id]: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
                <button
                  onClick={() =>
                    handleWithdrawStatusChange(
                      request.AccountID,
                      request._id,
                      statuses[request._id]
                    )
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
    </div>
  );
};

export default WithdrawRequests;
