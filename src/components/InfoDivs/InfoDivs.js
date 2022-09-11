import React, {useEffect, useRef, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./InfoDivs.scss"
import {Form, FormSelect} from "react-bootstrap";
import "../MapsDiv/MapsDivs.scss"
import {GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsService} from "@react-google-maps/api";
import options from "../MapsDiv/MapsStyle";
import pict from "./mapmarker.png"
import heartPic from "./placeholder.png"
import Button from "react-bootstrap/Button";
const mapContainerStyle = {
    width: "100vh",
    height: "200px"
}


const InfoDivs = () => {
    const [leng, setLeng] = useState({
        lat: 10,
        lng: 10
    })
    const [apiPlaces, setApiPlaces] = useState([])
    const [lists, setLists] = useState([])
    const [typeOfPlace, setTypeOfPlace] = useState("7315")
    const [selected, setSelected] = useState(null)
    const [amountPlaces, setAmountPlaces] = useState("1")
    const [calculateDistance, setCalculateDistance] = useState({
        lat: 54.32355,
        lon: 12.32355
    })
    const [timeToTarget, setTimeToTarget] = useState([])
    const [trueTarget, setTrueTarget] = useState(false)
    const center ={
        lat:parseFloat(leng.lat),
        lng:parseFloat(leng.lng)
    }
    const [showResults, setShowResults] = useState(false)
    const [visibleFav, setVisibleFav] = useState(false)
    

        

    useEffect  ( () => {
          const apiTomTomKey = '&view=Unified&relatedPois=off&key=1jRPKMUu8jeXO2Cm2BAcDPLe5araYug6'
          async function getRequest(url){
             const res = await fetch(url + typeOfPlace + apiTomTomKey);
             if (res.ok){
                 return res.json();

             }else{
                 throw new Error("Bad response")
             }
         }
        async function getData(url){
             try{
                 const data = await getRequest(url);
                 setApiPlaces(data.results)
                 setLeng({lat: parseFloat(data.summary.geoBias.lat),
                     lng: parseFloat(data.summary.geoBias.lon)
                 })
             } catch(e){
                 console.log(e)
             }
         }
        const geo = navigator.geolocation
         if  (geo){
             geo.getCurrentPosition( async function (location){
               await getData('https://api.tomtom.com/search/2/nearbySearch/.json?lat=' + location.coords.latitude.toFixed(3) + '&lon=' + location.coords.longitude.toFixed(3) + '&limit=' + amountPlaces + '&radius=10000&categorySet=' )
             })
         }

     }, [amountPlaces, typeOfPlace]);
        
    useEffect(() => {
            if(trueTarget){
                async  function getRequest(url){
                    const res = await fetch(url);
                    if (res.ok){
                        return res.json();
       
                    }else{
                        throw new Error("Bad response")
                    }
                }
              async function getData(url){
                    try{
                        const data = await getRequest(url);
                        setTimeToTarget({
                            time:Math.floor(data.routes[0].summary.travelTimeInSeconds / 60),
                            distance:data.routes[0].summary.lengthInMeters
                        })
                
    
                    } catch(e){
                        console.log(e)
                    }
                }
               const geo = navigator.geolocation
                if  (geo){
                    geo.getCurrentPosition( async function (location){
                     await getData('https://api.tomtom.com/routing/1/calculateRoute/' + location.coords.latitude.toFixed(5) + ',' + location.coords.longitude.toFixed(5) + ':' + calculateDistance.lat + "," + calculateDistance.lon + "/json?instructionsType=text&language=pl-PL&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=pedestrian&vehicleMaxSpeed=5&vehicleCommercial=false&vehicleEngineType=combustion&key=1jRPKMUu8jeXO2Cm2BAcDPLe5araYug6")
                    })
                }
       
            }
        
        
      }, [calculateDistance])

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDW5JrwIlgMmRTEzTi2XHxoSxBC56QmruY",
    });


    if (loadError) return "Błąd wczytywania mapy";
    if (!isLoaded) return "Wczytywanie";


     const handleClick = async (element , index, nmb, latPos, lonPos) =>{
          if (lists.find(item=>item.element===element)){
              return;
          }
         await setLists([...lists, {element, index, nmb, latPos, lonPos}])
         await setVisibleFav(true) 
     }
     const handleClickv2 =  (e) =>{
         setLists(lists.filter((fav)=> fav !== e)
         )
     }

     const hideShowFav = (e) =>{
         setVisibleFav(current=> !current);
     }
     
    return(
        <>
            <FormSelect value={typeOfPlace}
                onChange={e => {
                setTypeOfPlace(e.target.value);
            }} 
                className="formPlaces">
                <option value={"7315"}>Restauracja</option>
                <option value={"9376"}>Kawiarnia & Pub</option>
                <option value={"9379"}>Nocne życie</option>
                <option value={"7332005"}>Sklep spożywczy</option>
                <option value={"9942"}>Przystanek autobusowy</option>
                <option value={"7380"}>Dworzec kolejowy</option>
            </FormSelect>
            <Form.Label><h1 className="rangeAmount">Liczba lokacji ({amountPlaces})</h1></Form.Label>
            <Form.Range value={amountPlaces} onChange={ e =>{
                setAmountPlaces(e.target.value)
            }} min="1" max="20" step="1"/>
            <Container className="cntClass" fluid>

                <Row xs="auto" className="singleRow"> 
                    {apiPlaces.map((element, index)=><Col key={index} className="singleDiv">
                        <Col  className="singleCol">
                            <h2>{element.poi.name}</h2>
                        </Col>
                        <Col  className="singleCol">
                            <h3>{element.address.streetName} {element.address.streetNumber}</h3>
                        </Col>
                        <Col  className="singleCol">
                            <h3 >{Math.floor(parseInt(element.dist))}m</h3>
                        </Col>
                        <Col className="singleCol">
                            <Button onClick={()=>setCalculateDistance({lon:element.position.lon, lat:element.position.lat}, setTrueTarget(true))}> Pokaż czas do celu </Button>
                        </Col>
                        <Col className="singleCol">
                            <svg onClick={()=>handleClick(element.poi.name, element.address.streetName, element.address.streetNumber, element.position.lat, element.position.lon)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="tomato"
                                 className="bi bi-heart" viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </Col>
                    </Col>)}
                </Row>
            </Container>
            
            {trueTarget ? (
            <>
            <Container fluid>
                <Col className="timeDistanceCol">
                <svg onClick={()=>setTrueTarget(false)} className="svgCloseIcon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="blue" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg> 
                    <h3>Czas do celu: {timeToTarget.time}min</h3>
                    <h3>Dystans: {timeToTarget.distance}m</h3>
                </Col>
                </Container>
            
            </>
            ): null}


            <Container fluid>
                <Row  >
                    <Col className="mapsDiv" >
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={center}
                            options={options}
                        >
                            <Marker position={center}></Marker>  
                            {apiPlaces.map((marker, index)=><Marker
                                icon={{
                                    url:pict,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                
                                }}
                                onClick={(element)=>{
                                setSelected(marker);
                                }
                            } key={index} position={{lat:parseFloat(marker.position.lat), lng:parseFloat(marker.position.lon)}}>
                             </Marker>)}
                             {lists.map((marker, index)=><Marker
                                icon={{
                                    url:heartPic,
                                    scaledSize: new window.google.maps.Size(35, 35),
                                    }}
                                 key={index} position={{lat:parseFloat(marker.latPos), lng:parseFloat(marker.lonPos)}}>
                             </Marker>)} 
                                
                            {selected ? (<InfoWindow
                                position={{
                                    lat:parseFloat(selected.position.lat),
                                    lng:parseFloat(selected.position.lon)}}
                                onCloseClick={()=>setSelected(null)}
                                options={{minWidth:"500px"}}
                                backgroundColor= "black"
                                >
                                <h3>{selected.poi.name}</h3>

                            </InfoWindow>) : null}


                        </GoogleMap>

                    </Col>
                </Row>
            </Container>
            <Container fluid>
            <h1 onClick={hideShowFav}>Ulubione ({lists.length})</h1>
            </Container>
            
            {visibleFav ? (
                <>
                <Container className="cntClass" fluid>
                    <Row className="singleRow" >
                    <ul>
                        {lists.map((e, index)=>
                         <li className="favElement" key={index}>
                            <svg onClick={()=>handleClickv2(e)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="yellow" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg> 
                            <h2>{e.element}</h2>
                            <h3>{e.index}</h3>
                            <h3>{e.nmb}</h3>
                        </li> )}
                    </ul>
                     </Row>
                </Container>
                </>
            ): null}
            
        </>


    )

 }







export default InfoDivs

