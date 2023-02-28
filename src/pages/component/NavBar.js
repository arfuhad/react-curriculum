import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from '../home';
import Program from '../program';
import Course from '../courses';
import Curriculum from '../curriculum';
import Predefined from '../curriculum/predefined';
import Assingned from '../curriculum/assigned';

const NavBar = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar bg="light">
            <Container>
              <Navbar.Brand as={Link} to={'/'} >Test Curriculum</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={'/'} active="true">Home</Nav.Link>
                  <Nav.Link as={Link} to={'/program'} active="true">Programs</Nav.Link>
                  <Nav.Link as={Link} to={'/courses'} active="true">Courses</Nav.Link>
                  <NavDropdown title="Curriculum" id="basic-nav-dropdown" as={Link} to={'/curriculum'} active="true">
                    <NavDropdown.Item as={Link} to={'/curriculum/predefined'}>Predefined/Builder</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={'/curriculum/assigning'}>
                      Assigning/Distribution
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/program" element={<Program/>}/>
              <Route path="/courses" element={<Course/>}/>
              <Route path="/curriculum" element={<Curriculum/>}/>
              <Route path="/curriculum/predefined" element={<Predefined/>}/>
              <Route path="/curriculum/assigning" element={<Assingned/>}/>
            </Routes>
          </Container>
        </div>
      </Router>
    </>
  )
}

export default NavBar