import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify"; // Import react-toastify
import instance from "../../services/endpoint";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false); // To handle the loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request is being sent

    try {
      const response = await instance.put("/api/v1/auth/changePassword", { oldPassword, newPassword });
      toast.success(response.data.message || "Password changed successfully!"); // Show success toast
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong"); // Show error toast
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Form onSubmit={handleSubmit} style={{ width: "400px" }}>
        <h5 className="text-center mb-4">Change Password 🔑</h5>
        
        <Form.Group controlId="formCurrentPassword" className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNewPassword" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            {loading ? <Spinner animation="border" size="sm" /> : "Change Password"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
