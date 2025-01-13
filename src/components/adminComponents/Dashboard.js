import React, { useState } from 'react';
import UserManagement from './UserManagement';
import KYCUpdates from './KYCUpdates';
import DepositRequests from './DepositManagement';
import WithdrawRequests from './WithdrawManagement';
import UserReturnManagement from './ReturnManagement';

import '../../styles/styles.css';
import '../../styles/animations.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'kyc':
        return <KYCUpdates />;
      case 'deposit':
        return <DepositRequests />;
      case 'withdraw':
        return <WithdrawRequests />;
      case 'Return':
        return <UserReturnManagement/>; 
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button
          className={activeTab === 'kyc' ? 'active' : ''}
          onClick={() => setActiveTab('kyc')}
        >
          KYC Updates
        </button>
        <button
          className={activeTab === 'deposit' ? 'active' : ''}
          onClick={() => setActiveTab('deposit')}
        >
          Deposit Requests
        </button>
        <button
          className={activeTab === 'withdraw' ? 'active' : ''}
          onClick={() => setActiveTab('withdraw')}
        >
          Withdraw Requests
        </button>
        <button
          className={activeTab === 'Return' ? 'active' : ''}
          onClick={() => setActiveTab('Return')}
        >
          Create Returns
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
