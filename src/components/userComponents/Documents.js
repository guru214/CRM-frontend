import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Spinner, Card } from "react-bootstrap";
import instance from "../../services/endpoint";
import { toast } from "react-toastify";

const DocumentUpload = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDocumentChange = (e) => {
    setSelectedDocument(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  // Function to fetch the uploaded document from the server
  const fetchUploadedDocument = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/api/v1/userProof/getDocument");
      const documentData = response.data.Document;

      if (documentData) {
        setUploadedDocument({
          url: `data:image/png;base64,${documentData}`,
        });
      } else {
        setMessage("No document found.");
      }
    } catch (error) {
      setMessage("No Proof Found, Please upload the Proof to verify the KYC.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDocument || !file) {
      toast.info("Please select a document type and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append(selectedDocument, file);

    setLoading(true);
    try {
      const response = await instance.post("/api/v1/userProof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // setMessage(response.data.message);
      toast.success(response.data.message);
      fetchUploadedDocument();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadedDocument();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Upload Document</h2>

      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="documentType" className="mb-3">
            <Form.Label>Select Document Type</Form.Label>
            <Form.Control
              as="select"
              value={selectedDocument}
              onChange={handleDocumentChange}
            //   isInvalid={!selectedDocument}
            >
              <option value="">Select</option>
              <option value="AadhaarProof">Aadhaar Proof</option>
              <option value="DrivingLicenseProof">Driving License Proof</option>
              <option value="PassportProof">Passport Proof</option>
              <option value="OtherProof">Other Proof</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a document type.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="file" className="mb-3">
            <Form.Label>Upload Document</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileChange}
            //   isInvalid={!file}
            />
            <Form.Control.Feedback type="invalid">
              Please upload a document file.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" /> 
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Card>

      {message && (
        <Alert variant={message.includes("No document") ? "warning" : "success"} className="mt-3">
          {message}
        </Alert>
      )}

      {uploadedDocument && uploadedDocument.url && (
        <div className="mt-4">
          <h3>Uploaded Document</h3>
          <img
            src={uploadedDocument.url}
            alt="Uploaded Document"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
