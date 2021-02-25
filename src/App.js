//   https://www.sitepoint.com/react-router-complete-guide/

import React from "react";
import {Link, Route, Switch } from "react-router-dom";
import './css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import Pokedex from "./components/pokedex";
import Catchable from "./components/catchable";
import logo from './images/silverlogo.jpg';
import Kanto from "./components/kanto";
import Johto from "./components/johto";
import Routes from "./components/routes";

export default function App() {

    const navbarColour = {backgroundColor: '#6AADD7'};
    const linkStyle = {color: 'black', fontSize: '25px', borderStyle: 'inset', borderRadius: '25px', borderWidth: 'thin', padding: '20px'};
    const titleStyle = {color: 'white', fontSize: '40px'};
    const verStyle = {color: 'black', fontSize: '15px', borderStyle: 'inset', borderRadius: '25px', borderWidth: 'thin', padding: '20px', height: '60px', width: '131px'};

  	return (
		<div>
			<Navbar style={navbarColour} expand="lg" className="navbar">
				<Navbar.Brand>
                    <img src={logo} width="200" height="100" className="d-inline-block" alt=""></img>
                    <span style={titleStyle}> &nbsp; Silver </span>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav"/>

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
                        <Link to="/" className="nav-link" style={linkStyle}>Pokédex</Link>
                        &nbsp; &nbsp; &nbsp;
                        <Link to="/catchable" className="nav-link" style={linkStyle}>Route Catchables</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Switch>
				<Route exact path="/"><Pokedex /></Route>
				<Route path="/catchable"><Catchable /></Route>
				<Route path="/johto"><Johto /></Route>
				<Route path="/kanto"><Kanto /></Route>
				<Route path="/routes"><Routes /></Route>
			</Switch>
		</div>
  	);
}