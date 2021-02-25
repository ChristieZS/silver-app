import React from "react";
import '../css/bootstrap.min.css';
import {Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


class Catchable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regions: ['kanto', 'johto']
        };
    }


    capitalize = (s) => {
        if (typeof s !== 'string') return 'error! not string!'
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    render() {


        const pagePadding = {
            paddingTop: '50px',
            paddingLeft: '50px',
            paddingRight: '50px',
        }

        const buttonStyle = {
            width: "200px",
            height: "150px",
            backgroundColor: "#6AADD7",
        }

        const buttonPlacement = {
            width: "400px",
            height: "200px",

        }
        
        return (
            <div style={pagePadding}>
                <div className="d-flex flex-wrap">
                    {this.state.regions.map((region, index) => (
                        <div style={buttonPlacement}>
                            <Link to={region} className="nav-link"><Button key={index} style={buttonStyle}> {this.capitalize(region)} </Button> </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Catchable;