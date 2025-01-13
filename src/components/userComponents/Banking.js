import React from "react";
import { Container,  Nav, Tab } from "react-bootstrap";
import DepositPage from "../depositComponents/DepositPage";
import WithdrawPage from "../withdrawComponents/WithdrawPage";

const DepositWithdraw = () => (
  <Container className="mt-4">
    <Tab.Container defaultActiveKey="withdraw">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="deposit">💰 Deposit</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="withdraw">💸 Withdraw</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content className="mt-4">
        {/* Deposit Section */}
        <Tab.Pane eventKey="deposit">
          <DepositPage />
        </Tab.Pane>
        {/* Withdraw Section */}
        <Tab.Pane eventKey="withdraw">
          <WithdrawPage/>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  </Container>
);

export default DepositWithdraw;
