import React from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Menu.scss"

const Menu = () =>{
    return(
        <Navbar expand="xl" bg="dark" variant="dark" className="menuStyles">
            <Container className="navBarPlacesApp" fluid>
                <Navbar.Brand  href="#home">
                    <h1 className="navBarPlacesApp">PlacesApp</h1>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Menu

