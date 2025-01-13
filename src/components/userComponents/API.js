import React from "react";

const ApiAccessPage = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h5>API ACCESS</h5>
          <p className="mb-0">Trade from anywhere.</p>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label fw-bold">Your API Secret:</label>
            <p className="form-control border-0 bg-light">N92QLMCH61</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Your API Link:</label>
            <input
              type="text"
              className="form-control bg-light"
              value="https://trade.richesse.co.uk/trade/placeorder.php?type="
              readOnly
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiAccessPage;
