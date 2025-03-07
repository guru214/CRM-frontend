import React, { useEffect, useState } from 'react';
import instance from '../../services/endpoint';
import { Form, Button, Pagination, Table } from 'react-bootstrap';
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
  const [investments, setInvestments] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageReturns, setCurrentPageReturns] = useState(1);
  const itemsPerPage = 5; // Items per page for both tables

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


  const fetchReturns = async () => {
    if (selectedUser) {
      try {
        const response = await instance.get(`/api/v1/listReturns`);
        setReturns(response.data.data);
      } catch (err) {
        console.error("Error fetching returns:", err);
        setError('Failed to fetch returns');
      }
    }
  };

  useEffect(() => {
    fetchReturns();
  }, [selectedUser]);

  useEffect(() => {
    const fetchUsersAndInvestments = async () => {
      try {
        // Fetch users
        const usersResponse = await instance.get("/api/v1/auth/getUsersAndAdmins");
        setUsers(usersResponse.data);

        // Fetch investments
        const investmentsResponse = await instance.get("/api/v1/deposit/getAllApprovedDepositReq");
        setInvestments(investmentsResponse.data.userInvestments);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch user or investment data.");
      }
    };

    fetchUsersAndInvestments();
  }, []);

  // Get total investment for a user by AccountID
  const getTotalInvestment = (accountID) => {
    const userInvestment = investments.find(
      (investment) => investment.AccountID === accountID
    );
    return userInvestment ? userInvestment.total_investment : 0;
  };

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
      fetchReturns();
    } catch (err) {
      toast.error('Failed to create return');
    }
  };

  // Filtered and flattened returns for selected user
  const filteredReturns = returns.filter(returnItem => returnItem.AccountID === selectedUser?.AccountID);
  const flattenedReturns = filteredReturns.flatMap((returnItem) =>
    returnItem.returns.map((returnDetail) => ({
      ...returnDetail,
      AccountID: returnItem.AccountID, // Include the AccountID for reference
    }))
  );

  // Calculate total pages for users and returns
  const totalUserPages = Math.ceil(users.length / itemsPerPage);
  const totalReturnPages = Math.ceil(flattenedReturns.length / itemsPerPage);

  // Paginated data for users and returns
  const paginatedUsers = users.slice(
    (currentPageUsers - 1) * itemsPerPage,
    currentPageUsers * itemsPerPage
  );

  const paginatedReturns = flattenedReturns.slice(
    (currentPageReturns - 1) * itemsPerPage,
    currentPageReturns * itemsPerPage
  );

  const handleReturnPageChange = (page) => {
    setCurrentPageReturns(page);
  };

  const handleUserPageChange = (page) => {
    setCurrentPageUsers(page);
  };

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
            <th>Total Investment</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.AccountID}>
                <td>{user.AccountID}</td>
                <td>{user.Email}</td>
                <td>{user.FullName}</td>
                <td>{user.isEmailVerified ? 'Verified' : 'Not Verified'}</td>
                <td>₹{getTotalInvestment(user.AccountID)}</td>
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
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          {[...Array(totalUserPages)].map((_, pageIndex) => (
            <Pagination.Item
              key={pageIndex}
              active={currentPageUsers === pageIndex + 1}
              onClick={() => handleUserPageChange(pageIndex + 1)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

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
              {paginatedReturns.length > 0 ? (
                paginatedReturns.map((returnItem) => (
                  <tr key={returnItem._id}>
                    <td>{new Date(returnItem.date).toLocaleDateString()}</td>
                    <td>₹{returnItem.returnAmount}</td>
                    <td>{returnItem.returnPercentage}%</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3">No returns available</td></tr>
              )}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              {[...Array(totalReturnPages)].map((_, pageIndex) => (
                <Pagination.Item
                  key={pageIndex}
                  active={currentPageReturns === pageIndex + 1}
                  onClick={() => handleReturnPageChange(pageIndex + 1)}
                >
                  {pageIndex + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>

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
      )}
    </div>
  );
};

export default UserReturnManagement;
