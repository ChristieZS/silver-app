import React from "react";
import '../css/bootstrap.min.css';
import {Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

class Johto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsJohto: []
        };
    }

    componentDidMount() {
        const apiUrl = 'https://pokeapi.co/api/v2/region/2/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setState({locationsJohto: data.locations}))
    }

    locationReformat = (loc) => {
        let locationFormat = loc.replace(/\b\w/g, l => l.toUpperCase())
        return locationFormat.replaceAll("-", ' ');
    }

    locationList = () => {
        const flexContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }
    
        const boxStyle = {
            width: "150px",
            height: "150px",
            margin: "auto",
            textAlign: "center",
        }

        const locLis = this.state.locationsJohto.map((location, index) =>
        {if(index < 48 && location.name.includes("unknown") === false){
            return (
                <div style={flexContainer}>
                    <Link to={{pathname: "/routes", hash: `${location.url}`}} className="nav-link"> <Button key={index} className="btn btn-light" style={boxStyle} > {this.locationReformat(location.name)} </Button> </Link>
                </div>  
            ) 
        }})

        return locLis;
    }

    render() {
        const pagePadding = {
            paddingTop: '50px',
            paddingLeft: '50px',
            paddingRight: '50px',
        }
        
        return (
            <div className="container" style={pagePadding}>
                <h1>Johto Routes</h1>
                <br/>
                <div className="d-flex flex-wrap">
                    {this.locationList()}
                </div>
            </div>
        );
    }
}

export default Johto;