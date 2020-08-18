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
      style={{
        position: 'absolute',
        zIndex: 2,
        top: '7px'
      }}>
      <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto float-left'
             style={{
               height: '100vh'
             }}>
          <NavLink to={routes.WORKING_DAYS_AND_HOURS}>
            <Nav.Link href='#working-days-and-hours'>
              Working Days and Hours
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.GROUPS_ADD}>
            <Nav.Link href='#groups'>
              Groups
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.TAGS_ADD}>
            <Nav.Link href='#tags'>
              Tags
            </Nav.Link>
          </NavLink>
          <NavDropdown title='Locations'
                       id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#locations/buildings'>
              <NavLink to={routes.BUILDINGS}>
                <Nav.Link href='#buildings'
                          style={{
                            color: 'black'
                          }}>
                  Buildings
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#locations/rooms'>
              <NavLink to={routes.ROOMS}>
                <Nav.Link href='#rooms'
                          style={{
                            color: 'black'
                          }}>
                  Rooms
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Statistics'
                       id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#statistics/statistics-of-lecturers'>
              <NavLink to={routes.STATISTICS_OF_LECTURERS}>
                <Nav.Link href='#statistics-of-lecturers'
                          style={{
                            color: 'black'
                          }}>
                  Statistics of Lecturers
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#statistics/statistics-of-subjects'>
              <NavLink to={routes.STATISTICS_OF_SUBJECTS}>
                <Nav.Link href='#statistics-of-subjects'
                          style={{
                            color: 'black'
                          }}>
                  Statistics of Subjects
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#statistics/statistics-of-students'>
              <NavLink to={routes.STATISTICS_OF_STUDENTS}>
                <Nav.Link href='#statistics-of-lecturers'
                          style={{
                            color: 'black'
                          }}>
                  Statistics of Students
                </Nav.Link>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
          <NavLink to={routes.ROOMS_UNAVAILABILITY}>
            <Nav.Link href='#rooms-unavailability'>
              Rooms Unavailability
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ADD_ROOMS}>
            <Nav.Link href='#add-rooms'>
              Add Rooms
            </Nav.Link>
          </NavLink>
          <NavLink to={routes.ASSIGN_ROOMS_FOR_SESSIONS}>
            <Nav.Link href='#assign-rooms-for-sessions'>
              Assign Rooms for Sessions
            </Nav.Link>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
