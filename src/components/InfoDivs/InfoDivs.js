import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./InfoDivs.scss"
import axios from "axios";


const api = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=5000&type=restaurant&keyword=cruise&key=KEY'
const apiv2 = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=KEY'
/* const InfoDivs = () =>{
    const [restaurant, setRestaurant] = useState([]);
*/


   /* useEffect(() => {
        fetch(api, {mode:"no-cors"})
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => console.log(actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    */


const InfoDivs = () => {
    const [resta, setResta] = useState([])
    const latitude = 25.0756; // you can update it with user's latitude & Longitude
    const longitude = 55.1454;
    let radMetter = 2 * 1000; // Search withing 2 KM radius

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + 'KEY'
    console.log(url)
    useEffect(()=>{
        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=5000&type=restaurant&keyword=cruise&key=KEY',
            headers: { }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    })

}

   /* return(
        <Container fluid>
            <Row>
                <Col className="singleDiv">
                    <Row className="singleCol">
                        {restaurant?.map((dupa, index)=><col key={index}>{dupa.price_level}</col> )}
                    </Row>
                    <Row className="singleCol">
                        <Col>2</Col>
                    </Row>
                    <Row className="singleCol">
                        <Col>3</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="singleDiv">
                    <Row className="singleCol">
                        <Col>1</Col>
                    </Row>
                    <Row className="singleCol">
                        <Col>2</Col>
                    </Row >
                    <Row className="singleCol">
                        <Col>3</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="singleDiv">
                    <Row className="singleCol">
                        <Col>1</Col>
                    </Row>
                    <Row className="singleCol">
                        <Col>2</Col>
                    </Row>
                    <Row className="singleCol">
                        <Col>3</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}*/

export default InfoDivs
