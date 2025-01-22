import React, { useEffect, useState } from "react";
import instance from "../../services/endpoint";
import { changeRole, deleteUser } from "../../services/apiService";
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap"; // Import Bootstrap Pagination component

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 5; // Items per page

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

  const handleRoleChange = (accountID, role) => {
    changeRole(accountID, role).then(() => toast.success("Role updated successfully"));
  };

  const handleDeleteUser = (accountID) => {
    deleteUser(accountID).then(() => toast.success("User deleted successfully"));
  };

  // Calculate total pages for users
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Paginated data for users
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>FullName</th>
            <th>Email</th>
            <th>IsVerified</th>
            <th>Role</th>
            <th>Total Investment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(paginatedUsers) && paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <tr key={user.AccountID}>
                <td>{user.AccountID}</td>
                <td>{user.FullName}</td>
                <td>{user.Email}</td>
                <td>{user.isEmailVerified ? "Verified" : "Not Verified"}</td>
                <td>{user.Role}</td>
                <td>₹{getTotalInvestment(user.AccountID)}</td>
                <td>
                  <button onClick={() => handleRoleChange(user.AccountID, "Admin")}>
                    Make Admin
                  </button>
                  <button onClick={() => handleDeleteUser(user.AccountID)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
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
    </div>
  );
};

export default UserManagement;
