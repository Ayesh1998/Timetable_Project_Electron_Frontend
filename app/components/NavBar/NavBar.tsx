import React from 'react'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import routes from '../../constants/routes.json'

const NavBar: React.FC = () => {
  return (
    <Navbar
      collapseOnSelect
      expand={false}
      bg='dark'
      variant='dark'
      style={{position: 'absolute', zIndex: 2, top: '7px'}}
    >
      <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto float-left' style={{height: '100vh'}}>
          <NavLink to={routes.WORKING_DAYS_AND_HOURS}>
            <Nav.Link href='#features' className='mt-5'>
              Working Days and Hours
            </Nav.Link>
          </NavLink>
          <Nav.Link href='#pricing'>Pricing</Nav.Link>
          <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#action/3.4'>
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <NavLink to={routes.BUILDINGS}>
            <Nav.Link href='#buildings' className='mt-5'>
              Buildings
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ROOMS}>
            <Nav.Link href='#rooms' className='mt-5'>
              Rooms
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.STATISTICS_OF_LECTURERS}>
            <Nav.Link href='#statistics-of-lecturers' className='mt-5'>
              Statistics of Lecturers
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.STATISTICS_OF_SUBJECTS}>
            <Nav.Link href='#statistics-of-subjects' className='mt-5'>
              Statistics of Subjects
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.STATISTICS_OF_STUDENTS}>
            <Nav.Link href='#statistics-of-students' className='mt-5'>
              Statistics of Students
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ROOMS_UNAVAILABILITY}>
            <Nav.Link href='#rooms-unavailability' className='mt-5'>
              Rooms Unavailability
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ADD_ROOMS}>
            <Nav.Link href='#add-rooms' className='mt-5'>
              Add Rooms
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ASSIGN_ROOMS_FOR_SESSIONS}>
            <Nav.Link href='#assign-rooms-for-sessions' className='mt-5'>
              Assign Rooms for Sessions
            </Nav.Link>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
