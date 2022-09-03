import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { logout } from '../actions/userActions';

function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  console.log(userLogin);
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Collapse>
            <LinkContainer to='/'>
              <Navbar.Brand href='/'>E-Commerece</Navbar.Brand>
            </LinkContainer>{' '}
            <Nav className='mr-auto'>
              <LinkContainer to='cart'>
                <Nav.Link>
                  {' '}
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <DropdownButton
                  id='username'
                  title={
                    userInfo.first_name
                      ? userInfo.first_name
                      : 'No Name Provided'
                  }
                >
                  <LinkContainer to='profile'>
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>

                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </DropdownButton>
              ) : (
                <LinkContainer to='login'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user'></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
