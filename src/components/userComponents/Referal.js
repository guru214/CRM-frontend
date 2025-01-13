import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const ReferAndEarn = () => {
  return (
    <Container className="mt-5">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h3>REFER & EARN</h3>
          <p>Earn commissions with our Affiliate Program!</p>
        </Col>
      </Row>

      {/* Referral Link and Bonus Section */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="p-3 border rounded">
            <h5>Your Referral Link</h5>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                value="https://trade.richessefx.co.uk/register/?ref=4N7E0E"
                readOnly
              />
              <Button variant="primary">Copy</Button>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="p-3 border rounded text-center">
            <h6>Your Referral Code</h6>
            <p><strong>4N7E0E</strong></p>
            <h6>Your Referral Bonus</h6>
            <p><strong>$0.00</strong></p>
            <Button variant="secondary">Withdraw</Button>
            <p className="mt-3">Referred Accounts: <strong>0</strong></p>
          </div>
        </Col>
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Number</th>
                <th>Email</th>
                <th>Date-Time</th>
                <th>Phone</th>
                <th>Commission</th>
                <th>Multi Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">No Data Found</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ReferAndEarn;
