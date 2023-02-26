import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from '../home';
import Program from '../program';
import Course from '../courses';
import Curriculum from '../curriculum';

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
                {/* {navList.map((element) => {
                  // if(element)
                  console.log(element);
                  return (
                    <>
                      <Nav.Link onClick={() => selectionFunction(element)} key={element} active= {selectedNav === element ?"true" : "false"}>Home</Nav.Link>
                    </>
                  );
                })} */}
                  <Nav.Link as={Link} to={'/'} active="true">Home</Nav.Link>
                  <Nav.Link as={Link} to={'/program'} active="true">Programs</Nav.Link>
                  <Nav.Link as={Link} to={'/courses'} active="true">Courses</Nav.Link>
                  <NavDropdown title="Curriculum" id="basic-nav-dropdown" active="true">
                    <NavDropdown.Item as={Link} to={'/curriculum'}>Predefined</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={'/curriculum'}>
                      Assigning
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
            </Routes>
          </Container>
        </div>
      </Router>
    </>
  )
}

export default NavBar