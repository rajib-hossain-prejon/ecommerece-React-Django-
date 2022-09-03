import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormCointainer from '../components/FormCointainer';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const locationSearch = useLocation().search;
  const redirect = locationSearch ? locationSearch.split('=')[1] : '/';
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormCointainer>
      <h3>Sign In</h3>

      {loading && <Loader></Loader>}
      {error && <Message variant='danger'> {error} </Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controllerId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controllerId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className='mt-2' type='submit' variant='primary'>
          Sign in
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            {' '}
            Register
          </Link>
        </Col>
      </Row>
    </FormCointainer>
  );
};

export default LoginScreen;
