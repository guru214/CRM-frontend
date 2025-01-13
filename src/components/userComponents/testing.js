import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const DepositRequestForm = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [modeOfTransfer, setModeOfTransfer] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("depositData", JSON.stringify({ amount: depositAmount, modeOfTransfer }));
    if (proofImage) {
      formData.append("proofImage", proofImage);
    }

    try {
      const response = await axios.post("http://localhost:4040/api/v1/deposit", formData );
    

      console.log("sdfsdgsdgfs",localStorage.getItem);

      setMessage(response.data.message);
      setDepositAmount("");
      setModeOfTransfer("");
      setProofImage(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Submit Deposit Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="depositAmount" className="form-label">
            Deposit Amount:
          </label>
          <input
            type="number"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter deposit amount"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="modeOfTransfer" className="form-label">
            Mode of Transfer:
          </label>
          <input
            type="text"
            id="modeOfTransfer"
            value={modeOfTransfer}
            onChange={(e) => setModeOfTransfer(e.target.value)}
            placeholder="Enter mode of transfer"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="proofImage" className="form-label">
            Proof of Transfer (Image):
          </label>
          <input
            type="file"
            id="proofImage"
            accept="image/*"
            onChange={(e) => setProofImage(e.target.files[0])}
            className="form-control"
          />
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-primary w-100">
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default DepositRequestForm;
