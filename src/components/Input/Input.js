import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./Input.scss"
const InputMaps = () =>{
    return(
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Podaj lokalizacje"
                    aria-label="Podaj lokalizacje"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Szukaj
                </Button>
            </InputGroup>
        </>
    )
}

export default InputMaps