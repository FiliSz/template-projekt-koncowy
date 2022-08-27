import React from "react";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import "./Columns.scss"

const Columns= () =>{
    return(
        <Container fluid className="cont">
            <Row>
                <Col className="columnsImg">DUPA</Col>
                <Col className="columnsImg">DUPA</Col>
                <Col className="columnsImg">DUPA</Col>
            </Row>
        </Container>
    )
}

export default Columns