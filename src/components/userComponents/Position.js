import React from 'react'
import { Container, Row, Col, Table, Button, Navbar,  } from 'react-bootstrap';

export default function Position() {
  return ( <div className="d-flex">
    {/* Sidebar */}
   

    {/* Main Content */}
    <div className="flex-grow-1">
      <Navbar bg="light" className="border-bottom px-3">
        <Navbar.Brand>Dashboard</Navbar.Brand>
      </Navbar>
      <Container fluid className="p-3">
        <Row className="mb-3">
          <Col>
            <h5>Positions (0)</h5>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mb-3">
          <Col>
            <div className="d-flex gap-2">
              <Button variant="secondary" size="sm">Cancel all order</Button>
              <Button variant="secondary" size="sm">Cancel limit order</Button>
              <Button variant="secondary" size="sm">Cancel stop order</Button>
              <Button variant="secondary" size="sm">Close all position</Button>
              <Button variant="secondary" size="sm">Close profitable position</Button>
              <Button variant="secondary" size="sm">Close losing position</Button>
            </div>
          </Col>
        </Row>

        {/* Table */}
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Symbol</th>
              <th>Order</th>
              <th>Lot</th>
              <th>Price</th>
              <th>Partial</th>
              <th>SL</th>
              <th>TP</th>
              <th>SWAP</th>
              <th>LTP</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="12" className="text-center">No Order(s) Found</td>
            </tr>
          </tbody>
        </Table>

        {/* Footer Info */}
        <Row>
          <Col className="text-end">
            <p className="mb-0">
              Balance: <strong>0.00</strong> | Equity: <strong>0.00</strong> | Used Margin: <strong>0.00</strong> | Free Margin: <strong>0.00</strong> | Margin Level: <strong>0.00%</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);
};



