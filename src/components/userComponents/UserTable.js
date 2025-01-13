import React, { useState } from 'react';
import {Table, Button, Tab,Tabs } from "react-bootstrap";

const UserTable = () => {
  const [key, setKey] = useState("mamUserList");

  return (
    <div className="container mt-4">
      <Tabs
        id="mam-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {/* Tab 1: MAM User List */}
        <Tab eventKey="mamUserList" title="MAM User List">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>NAME</th>
                <th>RANK</th>
                <th>GROWTH</th>
                <th>WEEKS</th>
                <th>FOLLOWERS</th>
                <th>DRAWDOWN</th>
                <th>FUND</th>
                <th>RISK LEVEL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Check</td>
                <td>3</td>
                <td>12.00</td>
                <td>14</td>
                <td>3</td>
                <td>0</td>
                <td>6000.00</td>
                <td>1</td>
                <td>
                  <Button variant="primary">
                    Follow <i className="bi bi-hand-thumbs-up"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tab>

        {/* Tab 2: Following MAM List */}
        <Tab eventKey="followingMamList" title="Following MAM List">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>NAME</th>
                <th>RANK</th>
                <th>FOLLOWERS</th>
                <th>DRAWDOWN</th>
                <th>FUND</th>
                <th>RISK LEVEL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>5</td>
                <td>10</td>
                <td>2%</td>
                <td>8000.00</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>2</td>
                <td>25</td>
                <td>1.5%</td>
                <td>10000.00</td>
                <td>1</td>
              </tr>
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserTable;
