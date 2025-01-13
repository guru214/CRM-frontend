import React from 'react';
import { Container, Row, Col, Table, Button, Badge,Card} from 'react-bootstrap';
import { AiFillCloseCircle, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const DashboardPage = () => {
  return (
    <Container className="bg-light" style={{ minHeight: '100vh', padding: '20px' }}>
      <h4 className="mb-4">Welcome Sohail Shah</h4>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Account Status</Card.Title>
              <Badge bg="danger" className="mb-2">
                <AiFillCloseCircle /> KYC Not Verified
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>User Account</Card.Title>
              <Card.Text>N92QLMCH61</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Balance</Card.Title>
              <Card.Text>$0.00</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Free Margin</Card.Title>
              <Card.Text>$0.00</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h5 className="mb-3 text-primary">Copy Trading</h5>
      <Table bordered hover>
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
          <tr>
            <td>SM</td>
            <td>6</td>
            <td>-1.44</td>
            <td>0</td>
            <td>7</td>
            <td>0</td>
            <td>28989.92</td>
            <td>1</td>
            <td><Button variant="danger" size="sm"><AiOutlineDislike /> Unfollow</Button></td>
          </tr>
          <tr>
            <td>MuruganFX</td>
            <td>4</td>
            <td>-58.26</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0.00</td>
            <td>1</td>
            <td><Button variant="primary" size="sm"><AiOutlineLike /> Follow</Button></td>
          </tr>
          <tr>
            <td>Check</td>
            <td>15</td>
            <td>5279.68</td>
            <td>1</td>
            <td>18</td>
            <td>0</td>
            <td>463269.62</td>
            <td>1</td>
            <td><Button variant="primary" size="sm"><AiOutlineLike /> Follow</Button></td>
          </tr>
        </tbody>
      </Table>
      <div className="text-end">
        <Button variant="secondary">View All</Button>
      </div>
    </Container>
  );
};

export default DashboardPage;
