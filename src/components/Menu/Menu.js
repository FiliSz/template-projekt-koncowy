import React from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Menu.scss"

const Menu = () =>{
    return(
        <Navbar collapseOnSelect expand="xl" bg="light" variant="light" className="menuStyles">
            <Container fluid>
                <Navbar.Brand href="#home">
                    PlacesApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">O aplikacji</Nav.Link>
                        <Nav.Link href="#pricing">Instrukcja</Nav.Link>
                        <Nav.Link href="#deets">Mapa</Nav.Link>
                        <Nav.Link href="#memes"></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu