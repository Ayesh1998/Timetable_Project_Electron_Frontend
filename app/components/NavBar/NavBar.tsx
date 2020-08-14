import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import routes from '../../constants/routes.json';

const NavBar: React.FC = () => {
  return (
    <Navbar
      collapseOnSelect
      expand={false}
      bg="dark"
      variant="dark"
      style={{position: 'absolute', zIndex: 2, top: '7px'}}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto float-left" style={{height: '100vh'}}>
          <NavLink to={routes.WORKING_DAYS_AND_HOURS}>
            <Nav.Link href="#features" className="mt-5">
              Working Days and Hours
            </Nav.Link>
          </NavLink>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
