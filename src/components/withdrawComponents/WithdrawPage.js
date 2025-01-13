import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from '../../services/endpoint.js';
import PaymentRequest from "../userComponents/PaymentRequest";

const WithdrawPage = () => {
  const [withdrawData, setWithdrawData] = useState({
    account_holder_name: "" || null,
    account_number: "" || null,
    ifsc_code: "" || null,
    bic_swift_code: "" || null,
    branch: "" || null,
    bank_account_currency: "" || null,
    upi_address: "" || null,
    btc_withdraw_address: "" || null,
    eth_withdraw_address: "" || null,
    netteller_address: "" || null,
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // Fetch withdrawal details on component mount
  useEffect(() => {
    const fetchWithdrawDetails = async () => {
      try {
        const response = await instance.get("/api/v1/withdrawDetails");
        setWithdrawData(response.data.decryptedWithdrawData); // Assuming the API returns withdrawal details
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWithdrawDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawData({ ...withdrawData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setStatus("pending");

      // Prepare the request payload with withdrawData
      const payload = {
        withdrawData: {
          account_holder_name: withdrawData.account_holder_name,
          account_number: withdrawData.account_number,
          ifsc_code: withdrawData.ifsc_code,
          bic_swift_code: withdrawData.bic_swift_code,
          branch: withdrawData.branch,
          bank_account_currency: withdrawData.bank_account_currency,
          upi_address: withdrawData.upi_address,
          btc_withdraw_address: withdrawData.btc_withdraw_address,
          eth_withdraw_address: withdrawData.eth_withdraw_address,
          netteller_address: withdrawData.netteller_address,
        }
      };

      // Send the POST request with the withdrawData object
      const response = await instance.post("/api/v1/withdrawDetails", payload);
      setStatus("succeeded");
      toast.success(response.data.message || "Withdrawal request processed successfully!");
    } catch (err) {
      setStatus("failed");
      setError(err.message);
      toast.error("Failed to process withdrawal request.");
    }
  };

  return (
    <div className="container">
      <h4>Payment Details</h4>
      <form>
        <div className="mb-3">
          <label>Account Holder Name</label>
          <input
            type="text"
            name="account_holder_name"
            placeholder="Account Holder Name"
            value={withdrawData.account_holder_name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Account Number</label>
          <input
            type="text"
            name="account_number"
            placeholder="Account Number"
            value={withdrawData.account_number}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>IFSC Code</label>
          <input
            type="text"
            name="ifsc_code"
            placeholder="IFSC Code"
            value={withdrawData.ifsc_code}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>BIC/SWIFT Code</label>
          <input
            type="text"
            name="bic_swift_code"
            placeholder="BIC/SWIFT Code"
            value={withdrawData.bic_swift_code}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={withdrawData.branch}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Bank Account Currency</label>
          <input
            type="text"
            name="bank_account_currency"
            placeholder="Bank Account Currency"
            value={withdrawData.bank_account_currency}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>UPI Address</label>
          <input
            type="text"
            name="upi_address"
            placeholder="UPI Address"
            value={withdrawData.upi_address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>BTC Withdraw Address</label>
          <input
            type="text"
            name="btc_withdraw_address"
            placeholder="BTC Withdraw Address"
            value={withdrawData.btc_withdraw_address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>ETH Withdraw Address</label>
          <input
            type="text"
            name="eth_withdraw_address"
            placeholder="ETH Withdraw Address"
            value={withdrawData.eth_withdraw_address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Netteller Address</label>
          <input
            type="text"
            name="netteller_address"
            placeholder="Netteller Address"
            value={withdrawData.netteller_address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-primary me-2">
          Submit
        </button>
      </form>
      <PaymentRequest/>
    </div>
  );
};

export default WithdrawPage;
