import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import instance from '../../services/endpoint';
import { toast } from 'react-toastify';
import img from '../Sign&Regs/image.png'

const RegisterForm = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [value, setValue] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Phone: '',
    Account_Type: '',
    Address: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateFields = (fields) => {
    const errors = {};
    if (fields.includes('FullName') && !value.FullName) {
      errors.FullName = 'Full name is required.';
    }
    if (fields.includes('Email') && !value.Email) {
      errors.Email = 'Email is required.';
    }
    if (fields.includes('Password') && !value.Password) {
      errors.Password = 'Password is required.';
    }
    if (fields.includes('Phone') && !value.Phone) {
      errors.Phone = 'Phone number is required.';
    }
    if (fields.includes('Account_Type') && !value.Account_Type) {
      errors.Account_Type = 'Account type is required.';
    }
    if (fields.includes('Address') && !value.Address) {
      errors.Address = 'Address is required.';
    }
    return errors;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const errors = validateFields(['FullName', 'Email', 'Password', 'Phone']);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStep(2);
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields(['Account_Type', 'Address']);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await instance.post('/api/v1/auth/register', value);
      setIsLoading(false);
      setSuccess(true);
      toast.success('User registered successfully');
      navigate('/login');
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    if (success) {
      setSuccess(false);
    }
  }, [success]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#000' }}
    >
      <div
        style={{
          backgroundColor: '#000',
          padding: '30px',
          borderRadius: '8px',
          border: "1px solid gold",
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Row>
          <Col>
            <div className="text-center mb-4">
              <img src={img} alt="Richesse Logo" style={{ width: '150px', borderRadius: '230px' }} />
            </div>
            <Form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
              <h5 className="mb-4" style={{color:'#ffd700'}}>Register to Richesse</h5>

              {step === 1 && (
                <>
                  <Form.Group className="mb-3" controlId="formFullName">
                    <Form.Control
                      style={{backgroundColor:"#8b8b8b", color:"#fff"}}
                      type="text"
                      name="FullName"
                      placeholder="Enter your full name"
                      value={value.FullName}
                      onChange={(e) => setValue({ ...value, FullName: e.target.value })}
                    />
                    {fieldErrors.FullName && <small className="text-danger">{fieldErrors.FullName}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control
                      style={{backgroundColor:"#8b8b8b", color:"#fff"}}
                      type="email"
                      name="Email"
                      placeholder="Enter your email"
                      value={value.Email}
                      onChange={(e) => setValue({ ...value, Email: e.target.value })}
                    />
                    {fieldErrors.Email && <small className="text-danger">{fieldErrors.Email}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Control
                      style={{backgroundColor:"#8b8b8b", color:"#fff"}}
                      type="password"
                      name="Password"
                      placeholder="Enter your password"
                      value={value.Password}
                      onChange={(e) => setValue({ ...value, Password: e.target.value })}
                    />
                    {fieldErrors.Password && <small className="text-danger">{fieldErrors.Password}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Control
                      style={{backgroundColor:"#8b8b8b", color:"#fff"}}
                      type="tel"
                      name="Phone"
                      placeholder="Ex: +91"
                      value={value.Phone}
                      onChange={(e) => setValue({ ...value, Phone: e.target.value })}
                    />
                    {fieldErrors.Phone && <small className="text-danger">{fieldErrors.Phone}</small>}
                  </Form.Group>
                </>
              )}

              {step === 2 && (
                <>
                  <Form.Group className="mb-3" controlId="formAccountType">
                    <Form.Select
                      style={{backgroundColor:"#8b8b8b", color:"#fff"}}
                      name="Account_Type"
                      value={value.Account_Type}
                      onChange={(e) => setValue({ ...value, Account_Type: e.target.value })}
                    >
                      <option value="">Select Account Type</option>
                      <option value="Classic">Classic</option>
                      <option value="Premium">Premium</option>
                      <option value="Business">Business</option>
                      <option value="Enterprise">Enterprise</option>
                    </Form.Select>
                    {fieldErrors.Account_Type && <small className="text-danger">{fieldErrors.Account_Type}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Control
                      style={{backgroundColor:"#8b8b8b", color:"#fff"}}
                      type="text"
                      name="Address"
                      placeholder="Enter your address"
                      value={value.Address}
                      onChange={(e) => setValue({ ...value, Address: e.target.value })}
                    />
                    {fieldErrors.Address && <small className="text-danger">{fieldErrors.Address}</small>}
                  </Form.Group>

                  <Button variant="secondary" onClick={handlePreviousStep} className="w-100 mb-2">
                    Previous
                  </Button>
                </>
              )}

              {error && <p className="text-danger">{error}</p>}

              {isLoading ? (
                <Spinner animation="border" className="d-block mx-auto" />
              ) : (
                <Button variant="warning" type="submit" className="w-100">
                  {step === 1 ? 'Next' : 'Submit'}
                </Button>
              )}
            </Form>

            <div className="text-center mt-3">
              <Link to="/login" className="text-warning">
                Already have an account? Login
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RegisterForm;