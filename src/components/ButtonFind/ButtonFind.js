import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./ButtonFind.scss"

export const ButtonFind = () =>{
    return(
        <div className="d-grid gap-2">
            <Button className="dupa" variant="primary" size="lg">
                ZAMÓW
            </Button>
        </div>
    )
}

export default ButtonFind