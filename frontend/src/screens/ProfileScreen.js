import React, { useState, useEffect } from 'react';
import * as actions from '../constants/userConstants';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  // const locationSearch = useLocation().search;
  // const redirect = locationSearch ? locationSearch.split('=')[1] : '/';
  let navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    console.log('user2');
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.first_name || success) {
        dispatch({ type: actions.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        console.log('user6');
        console.log(user);
        setName(user.first_name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage('');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile </h2>
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader></Loader>}
        {error && <Message variant='danger'> {error} </Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controllerId='name'>
            <Form.Label>Name</Form.Label>

            <Form.Control
              required
              type='name'
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controllerId='email'>
            <Form.Label>Email Address</Form.Label>

            <Form.Control
              required
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

          <Form.Group controllerId='passwordConfirm'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='mt-2' type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
