import React, { useEffect, useState } from 'react';
import instance from '../../services/endpoint';
import { changeRole, deleteUser } from '../../services/apiService';
import { Form, Button, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserReturnManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [returns, setReturns] = useState([]);
  const [accountID, setAccountID] = useState('');
  const [date, setDate] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  const [returnPercentage, setReturnPercentage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const getUsersAndReturns = async () => {
      try {
        const response = await instance.get('/api/v1/auth/getUsersAndAdmins');
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Failed to fetch users');
      }
    };

    getUsersAndReturns();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchReturns = async () => {
        try {
          const response = await instance.get(`/api/v1/listReturns`);
          setReturns(response.data.data);
          console.log("returns", response.data.data[0])
        } catch (err) {
          console.error("Error fetching returns:", err);
          setError('Failed to fetch returns');
        }
      };

      fetchReturns();
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        AccountID: selectedUser.AccountID,
        date,
        returnAmount: returnAmount || undefined,
        returnPercentage: returnPercentage || undefined,
      };

      const response = await instance.post('/api/v1/createReturns', payload);
      toast.success('Return created successfully!');
    } catch (err) {
      toast.error('Failed to create return');
    }
  };
  const filteredReturns = returns.filter(returnItem => returnItem.AccountID === selectedUser?.AccountID);

  return (
    <div className="container mt-5">
      <h2>User and Return Management</h2>

      {/* User Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Email</th>
            <th>FullName</th>
            <th>Is Verified</th>
            <th>Balance</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.AccountID}>
                <td>{user.AccountID}</td>
                <td>{user.Email}</td>
                <td>{user.FullName}</td>
                <td>{user.isEmailVerified ? 'Verified' : 'Not Verified'}</td>
                <td>₹{user.amount}</td>
                <td>{user.Role}</td>
                <td>
                  <Button variant="primary" onClick={() => setSelectedUser(user)}>
                    View Returns
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Return Table and Creation Form */}
      {selectedUser && (
        <div className="mt-4">
          <h3>Manage Returns for {selectedUser.FullName} (ID: {selectedUser.AccountID})</h3>

          {/* Returns Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Return Amount</th>
                <th>Return Percentage</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.length > 0 ? (
                filteredReturns.map((returnItem) =>
                  returnItem.returns.map((returnItemDetail) => (
                    <tr key={returnItemDetail._id}>
                      <td>{new Date(returnItemDetail.date).toLocaleDateString()}</td>
                      <td>₹{returnItemDetail.returnAmount}</td>
                      <td>{returnItemDetail.returnPercentage}%</td>
                    </tr>
                  ))
                )
              ) : (
                <tr><td colSpan="3">No returns available</td></tr>
              )}
            </tbody>
          </Table>

          {/* Return Creation Form */}
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="accountID">
              <Form.Label>Account ID</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser.AccountID}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="returnAmount">
              <Form.Label>Return Amount</Form.Label>
              <Form.Control
                type="number"
                value={returnAmount}
                onChange={(e) => setReturnAmount(e.target.value)}
                placeholder="Optional"
              />
            </Form.Group>

            <Form.Group controlId="returnPercentage">
              <Form.Label>Return Percentage</Form.Label>
              <Form.Control
                type="number"
                value={returnPercentage}
                onChange={(e) => setReturnPercentage(e.target.value)}
                placeholder="Optional"
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Create Return
            </Button>
          </Form>

          {/* Error and Success Messages */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      )
      }
    </div >
  );
};

export default UserReturnManagement;
