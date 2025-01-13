import instance from "./endpoint";

// Get All Users (for SuperAdmin and Admin roles)
export const getUsers = async () => {
  try {
    const response = await instance.get("/api/v1/auth/getUsers");
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get All Users and Admins (for SuperAdmin role only)
export const getUsersAndAdmins = async () => {
  try {
    const response = await instance.get("/api/v1/auth/getUsersAndAdmins");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching users and admins:", error);
    throw error;
  }
};

// Change User Role (for SuperAdmin role)
export const changeRole = async (accountID, role) => {
  try {
    const response = await instance.patch("/api/v1/auth//changeRole", {
      AccountID: accountID,
      Role: role,
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Error changing role:", error);
    throw error;
  }
};

// Update KYC Status (for SuperAdmin role)
export const updateKYC = async (accountID, kycStatus) => {
  try {
    const response = await instance.patch("/api/v1/auth/kyc", {
      AccountID: accountID,
      KYC_Status: kycStatus,
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Error updating KYC:", error);
    throw error;
  }
};

// Delete User (for SuperAdmin role)
export const deleteUser = async (accountID) => {
  try {
    const response = await instance.delete("/api/v1/auth/deleteUser", {
      data: {
        AccountID: accountID,
      }
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Change Withdraw Status (for SuperAdmin role)
export const changeWithdrawStatus = async (accountID, transactionID, status) => {
  try {
    const response = await instance.patch(`/api/v1/withdraw/changeStatus`, {
      AccountID: accountID,
      id: transactionID,
      status: status,
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Error changing withdraw status:", error);
    throw error;
  }
};

// Change Deposit Status (for SuperAdmin role)
export const changeDepositStatus = async (accountID, transactionID, status) => {
  try {
    const response = await instance.patch("/api/v1/deposit/changeStatus", {
      AccountID: accountID,
      id: transactionID,
      status: status,
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error("Error changing deposit status:", error);
    throw error;
  }
};
