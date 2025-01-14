// import React, { useEffect, useState } from 'react';
// import { changeRole, deleteUser } from '../../services/apiService';
// import instance from '../../services/endpoint';
// import { toast } from 'react-toastify';
// const UserManagement = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const getUsersAndAdmins = async () => {
//       try {
//         const response = await instance.get("/api/v1/auth/getUsersAndAdmins");
//         console.log(response.data)
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users and admins:", error);
//         throw error;
//       }
//     };
//     getUsersAndAdmins()
//   }, []);

//   const handleRoleChange = (accountID, role) => {
//     changeRole(accountID, role).then(() => toast.success('Role updated successfully'));
//   };

//   const handleDeleteUser = (accountID) => {
//     deleteUser(accountID).then(() => toast.success('User deleted successfully'));
//   };

//   return (
//     <div>
//       <h2>User Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Account ID</th>
//             <th>FullName</th>
//             <th>Email</th>
//             <th>IsVerified</th>
//             <th>Role</th>
//             <th>Balance</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(users) && users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.AccountID}>
//                 <td>{user.AccountID}</td>
//                 <td>{user.FullName}</td>
//                 <td>{user.Email}</td>
//                 <td>{user.isEmailVerified ? 'Verified' : 'Not Verified'}</td>
//                 <td>{user.Role}</td>
//                 <td>₹{user.amount}</td>
//                 <td>
//                   <button onClick={() => handleRoleChange(user.AccountID, 'Admin')}>Make Admin</button>
//                   <button onClick={() => handleDeleteUser(user.AccountID)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;
import React, { useEffect, useState } from "react";
import instance from "../../services/endpoint";
import { changeRole, deleteUser } from "../../services/apiService";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchUsersAndInvestments = async () => {
      try {
        // Fetch users
        const usersResponse = await instance.get("/api/v1/auth/getUsersAndAdmins");
        setUsers(usersResponse.data);

        // Fetch investments
        const investmentsResponse = await instance.get("/api/v1/deposit/getAllApprovedDepositReq");
        console.log(investmentsResponse.data)
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
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
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
    </div>
  );
};

export default UserManagement;
