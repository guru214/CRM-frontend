import React from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';

const PammTable = () => {
  // Data for PAMM User List
  const pammUsers = [
    {
      name: 'Test_Only',
      rank: 99,
      growth: -4731232.42,
      weeks: 6,
      followers: 0,
      drawdown: 0,
      fund: 0.0,
      riskLevel: 1,
    },
  ];

  // Data for Following PAMM List (empty in this case)
  const followingUsers = [];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">PAMM Dashboard</h2>
      <Tabs defaultActiveKey="pammUsers" id="pamm-dashboard-tabs" className="mb-3">
        {/* PAMM User List Tab */}
        <Tab eventKey="pammUsers" title="PAMM User List">
          {pammUsers.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rank</th>
                  <th>Growth</th>
                  <th>Weeks</th>
                  <th>Followers</th>
                  <th>Drawdown</th>
                  <th>Fund</th>
                  <th>Risk Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pammUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.rank}</td>
                    <td>{user.growth}</td>
                    <td>{user.weeks}</td>
                    <td>{user.followers}</td>
                    <td>{user.drawdown}</td>
                    <td>{user.fund}</td>
                    <td>{user.riskLevel}</td>
                    <td>
                      <button className="btn btn-primary">Follow 👍</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No User Found</p>
          )}
        </Tab>

        {/* Following PAMM List Tab */}
        <Tab eventKey="followingUsers" title="Following PAMM List">
          {followingUsers.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rank</th>
                  <th>Growth</th>
                  <th>Weeks</th>
                  <th>Followers</th>
                  <th>Drawdown</th>
                  <th>Fund</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {followingUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.rank}</td>
                    <td>{user.growth}</td>
                    <td>{user.weeks}</td>
                    <td>{user.followers}</td>
                    <td>{user.drawdown}</td>
                    <td>{user.fund}</td>
                    <td>{user.riskLevel}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No User Found</p>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default PammTable;
