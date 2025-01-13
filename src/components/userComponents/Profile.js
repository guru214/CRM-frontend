import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Tabs, Tab, Alert } from "react-bootstrap";
import ChangePassword from "./ChangePassword";
import instance from "../../services/endpoint"; // Axios instance for API requests
import DocumentUpload from "./Documents";

const ProfilePage = () => {
  const [key, setKey] = useState("profile");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState({
    FullName: "",
    Phone: "",
    Account_Type: "",
    Address: "",
    Email: "",
  });

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get("/api/v1/auth/profile");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  // Handle input change for profile form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting profile update with data:", userData);

    // Extract only editable fields
    const { FullName, Account_Type, Address } = userData;

    try {
      const response = await instance.put("/api/v1/auth/profile", {
        FullName,
        Account_Type,
        Address,
      });
      console.log("Profile update response:", response.data);

      // Update local state with updated fields
      setUserData((prevData) => ({
        ...prevData,
        ...response.data,
      }));

      setSuccessMessage("Profile updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setError("Failed to update profile. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Container fluid className="mt-4">
      <Tabs
        id="profile-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="profile" title="👤 Profile">
          <Row>
            <Col md={8} className="mx-auto">
              <h6 className="mt-4">Account Details 👤</h6>
              <Form onSubmit={handleProfileSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="FullName"
                    placeholder="Enter your name"
                    value={userData.FullName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    placeholder="Email"
                    value={userData.Email}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Phone"
                    placeholder="Mobile Number"
                    value={userData.Phone}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="Account_Type"
                    placeholder="Enter account type"
                    value={userData.Account_Type}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="Address"
                    placeholder="Enter address"
                    value={userData.Address}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {/* Error and success messages */}
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                <Button variant="primary" type="submit">
                  Save Details
                </Button>
              </Form>
            </Col>
          </Row>
          <ChangePassword />

        </Tab>

        <Tab eventKey="documents" title="📂 Documents">
          <DocumentUpload/>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProfilePage;




// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button, Tabs, Tab, Alert } from "react-bootstrap";
// import ChangePassword from "./ChangePassword";
// import { useDispatch, useSelector } from 'react-redux';
// // import { updateUserProfile } from '../redux/actions';  // Assuming you have this action
// import axios from "axios";
// import instance from "../services/endpoint";

// const ProfilePage = () => {
//   const [key, setKey] = useState("profile");
//   const dispatch = useDispatch();
//   // const user = useSelector((state) => state.user); // Assuming user data is stored under auth slice
  
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const [userData, setUserData] = useState({
//     FullName: "",
//     Account_Type: "",
//     Address: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await instance.get('/api/v1/auth/profile');
//         setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError("Failed to load user data.");
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await instance.put("/api/v1/auth/profile", userData);
//       setSuccessMessage("Profile updated successfully!");
//       setError("");
//       // dispatch(updateUserProfile(response.data)); // Dispatching updated profile to Redux store
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError("Failed to update profile. Please try again.");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <Container fluid className="mt-4">
//       <Tabs
//         id="profile-tabs"
//         activeKey={key}
//         onSelect={(k) => setKey(k)}
//         className="mb-4"
//       >
//         <Tab eventKey="profile" title="👤 Profile">
//           <Row>
//             <Col md={8} className="mx-auto">
//               <h6 className="mt-4">Account Details 👤</h6>
//               <Form onSubmit={handleProfileSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="FullName"
//                     placeholder="Enter your name"
//                     value={userData.FullName}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="Email"
//                     placeholder="Email"
//                     value={userData.Email}
//                     onChange={handleInputChange}
//                     disabled
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="Phone"
//                     placeholder="Mobile Number"
//                     value={userData.Phone}
//                     onChange={handleInputChange}
//                     disabled
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Account Type</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="Account_Type"
//                     placeholder="Enter account type"
//                     value={userData.Account_Type}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="Address"
//                     placeholder="Enter address"
//                     value={userData.Address}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>

//                 {error && <Alert variant="danger">{error}</Alert>}
//                 {successMessage && <Alert variant="success">{successMessage}</Alert>}

//                 <Button variant="primary" type="submit">
//                   Save Details
//                 </Button>

//                 <ChangePassword />
//               </Form>
//             </Col>
//           </Row>
//         </Tab>

//         <Tab eventKey="documents" title="📂 Documents">
//           <Row>
//             <Col md={8} className="mx-auto">
//               <h5>Account Status</h5>
//               <Alert variant="warning" className="d-inline-flex align-items-center">
//                 <span className="me-2">❌ KYC Not Verified</span>
//               </Alert>
//               <hr />
//               <h6>Upload Documents 📄</h6>
//               <Form>
//                 <Form.Group className="mb-4">
//                   <Form.Label>Address Proof (Front)</Form.Label>
//                   <Form.Control type="file" />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                   <Form.Label>Address Proof (Back)</Form.Label>
//                   <Form.Control type="file" />
//                 </Form.Group>
//               </Form>
//             </Col>
//           </Row>
//         </Tab>
//       </Tabs>
//     </Container>
//   );
// };

// export default ProfilePage;
